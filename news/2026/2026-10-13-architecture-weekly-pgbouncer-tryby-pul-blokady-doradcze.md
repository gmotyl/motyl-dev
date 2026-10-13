---
title: "Architecture Weekly: tryby puli PgBouncer w praktyce i pułapki blokad doradczych"
excerpt: "Tryb transakcyjny PgBouncera zwiększa przepustowość, ale blokady sesyjne przestają działać; Oskar pokazuje to na elekcji lidera i procesorach w Emmett."
publishedAt: "2026-10-12"
slug: "architecture-weekly-pgbouncer-tryby-pul-blokady-doradcze"
hashtags: "#oskardudycz #architecture #postgresql #database #performance #generated #pl"
source_pattern: "OskarDudycz"
---

## Sharing is (not always) caring: tryby puli PgBouncer w praktyce

**TLDR:** Tryb sesyjny i transakcyjny PgBouncera różnią się tym, kiedy połączenie z bazą trafia do innego klienta. W trybie transakcyjnym blokady doradcze na poziomie sesji mogą mieć dwóch właścicieli, a przejęcie roli lidera po awarii może nie nastąpić.

**Summary:** Problem zaczyna się przy dużym ruchu, gdy baza wyczerpuje połączenia, bo każda instancja aplikacji trzyma własną pulę. PgBouncer stoi przed bazą i dzieli małą liczbę prawdziwych połączeń między wielu klientów. Trzeba jednak wybrać tryb. W sesyjnym klient dostaje połączenie, dopóki się nie rozłączy, a PgBouncer czyści je potem komendą resetującą. W transakcyjnym połączenie wraca do puli po każdej transakcji.

Autor sprawdził to prostym testem. Przy dziesięciu połączeniach serwerowych i stu klientach tryb sesyjny obsłużył dziesięciu, a reszta czekała. Tryb transakcyjny obsłużył wszystkich stu, otwierając trzy lub cztery połączenia. Przepustowość w pgbench była zbliżona, więc tryb transakcyjny nie przyspiesza bazy, tylko pozwala korzystać z niej uczciwie wszystkim klientom. Przy otwieraniu nowego połączenia na każdą transakcję PgBouncer w jego konfiguracji wypadł wolniej niż połączenie bezpośrednie, prawdopodobnie przez uwierzytelnianie SCRAM. Autor zaznacza, że to wskazówka, a nie diagnoza.

Cena trybu transakcyjnego to utrata stanu sesji. Ustawienia, nasłuchiwanie, tabele tymczasowe i blokady doradcze na poziomie sesji przechodzą do następnego klienta, który dostanie to samo połączenie, i nie ma żadnego błędu. Na przykładzie elekcji lidera: dwie instancje dostają jednocześnie sukces, odblokowanie może trafić do połączenia, które blokady nie trzyma, a gdy lider ginie, połączenie z blokadą żyje dalej w puli, więc żaden zastępca jej nie przejmie. W eksperymencie z dwudziestoma połączeniami nakładanie się liderów zdarzało się w każdym uruchomieniu. Blokady na poziomie transakcji działają poprawnie, ale chronią tylko jedną transakcję.

Autor omawia też inne rozwiązania. AWS RDS Proxy przypina klienta do połączenia, gdy wykryje stan sesji, ale przy masowym przypinaniu zamienia się to w tryb sesyjny. Inne podejście to odrzucanie takich poleceń. Na koniec pokazuje, jak ten problem wyszedł w Emmett, gdzie wyłączność procesora wynika z wiersza dzierżawy w tabeli, a nie z samej blokady. Planuje bicie serca, zatrzymywanie procesora po utracie dzierżawy i ponawianie prób przez instancje oczekujące.

**Key takeaways:**
- Tryb transakcyjny zwiększa liczbę obsłużonych klientów, a nie szybkość pojedynczych zapytań.
- Blokady sesyjne i tryb transakcyjny się wykluczają, a błędu nie zobaczysz.
- Tryb można ustawić osobno dla aliasu bazy i dla użytkownika.
- Wyłączność lepiej opierać na dzierżawie z biciem serca niż na długo żyjącej blokadzie.

**Why do I care:** To jest tekst dla każdego, kto stawia pooler przed Postgresem po fakcie. Prawdziwa lekcja jest taka, że zmiana trybu to zmiana semantyki, a nie parametr wydajności. Zanim to włączycie, wyszukajcie w kodzie i w bibliotekach blokady doradcze, LISTEN i SET. Słabość tekstu to skala pomiarów: jeden laptop i Docker, co autor sam przyznaje. Wniosek jakościowy to jednak nie zmienia.

**Link:** [Sharing is (not always) caring. PgBouncer pooling modes in practice](https://www.architecture-weekly.com/p/sharing-is-not-always-caring-pgbouncer)
