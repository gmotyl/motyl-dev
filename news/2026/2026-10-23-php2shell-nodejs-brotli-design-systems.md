---
title: "PHP2Shell, Node.js z dziurą w Brotli i przegląd open source'owych design systemów"
excerpt: "Dwie krytyczne luki w PHP, październikowa łatka Node.js i pytanie, skąd w ogóle wiemy, jakie wersje uruchamiamy, plus ranking design systemów."
publishedAt: "2026-10-23"
slug: "php2shell-nodejs-brotli-design-systems"
hashtags: "#dailydev #security #php #nodejs #devops #design-systems #shadcn #supply-chain #generated #pl"
source_pattern: "daily.dev"
---

## We Thought We Had No PHP. We Were Wrong.

**TLDR:** Zespół był przekonany, że nie ma u siebie PHP, a znalazł dwie maszyny podatne na krytyczne luki PHP2Shell. Błędy pozwalają zdalnie wykonać kod bez logowania.

**Summary:** Historia zaczyna się od zdania, które słyszałem w wielu firmach. Nie mamy PHP. Tutaj ktoś sprawdził to naprawdę, bo wyszły dwie luki, CVE-2026-109618 i CVE-2026-109619, obie krytyczne i obie dające zdalne wykonanie kodu bez uwierzytelnienia. Dotyczą każdego serwera, na którym handler PHP stoi na ścieżce żądania.

Okazało się, że na jednej maszynie PHP-FPM działało za Apachem, a na drugiej mod_php był załadowany wprost do procesu Apache. Nikt o tym nie pamiętał, bo to były pozostałości po starszych wdrożeniach. Zespół załatał PHP 8.3 i 8.1 backportami z dystrybucji i zrestartował usługi. Poprawione wersje upstreamowe to PHP 8.5.12, 8.4.27, 8.3.36 i 8.2.35.

Autor opisuje to jako lekcję o inwentaryzacji, i słusznie. Brakuje mi jednak jednego. Skoro nikt nie wiedział o tych maszynach, to skąd pewność, że to wszystkie? Dwa znalezione serwery to dolna granica, nie wynik końcowy.

**Key takeaways:**
- Luki PHP2Shell są krytyczne i nie wymagają logowania.
- Podatny może być serwer, o którym zespół myśli, że PHP na nim nie ma, na przykład przez mod_php w Apache.
- Poprawki to PHP 8.5.12, 8.4.27, 8.3.36, 8.2.35 albo backport od dostawcy dystrybucji.

**Why do I care:** Jako frontendowiec mam pokusę, żeby machnąć ręką, bo PHP to nie mój stos. Ale to właśnie ja często stawiam przed backendem WordPressa, stary panel admina albo landing na współdzielonym hostingu. Jeśli doradzam klientom architekturę, pierwsze pytanie powinno brzmieć, co faktycznie działa na ich serwerach, a nie co mają w diagramie.

**Link:** [We Thought We Had No PHP. We Were Wrong.](https://daily.dev/posts/3XPWrP8Ml)

## October 21, 2026: PHP, Node.js, GitLab, LiteLLM and a long list of other security incidents

**TLDR:** Zbiorcza strona z incydentami bezpieczeństwa z jednego dnia. Obok PHP i Node.js są tam GitLab z luką o ocenie 10.0 i złośliwa wersja LiteLLM.

**Summary:** To agregator, który zbiera około dwudziestu źródeł w jedno zestawienie. Dzień był gęsty. Oprócz PHP2Shell, o której wyżej, pojawiła się luka CVE-2026-110264 w GitLabie, zdalne wykonanie kodu bez uwierzytelnienia, z oceną CVSS 10.0. Podobno dotyczy wersji sięgających 7.0 z 2014 roku. Poprawki to 19.5.1, 19.4.3 i 19.3.6, a administratorzy instancji self-managed muszą je zainstalować sami.

Najbardziej niepokojąca jest historia LiteLLM. Wersja 1.107.0 trafiła na PyPI i do oficjalnych obrazów Docker, razem z często używanymi mutowalnymi tagami, i przez mniej więcej dwie godziny kradła klucze do chmur AWS, Azure i Google Cloud, klucze SSH, hasła z przeglądarek oraz tokeny AI. Wykonywała się już przy instalacji, bez importowania pakietu. Kto ją uruchomił, powinien odizolować maszynę, zbudować ją od nowa na 1.106.2 i zrotować wszystkie osiągalne poświadczenia.

W komentarzach, jak podaje podsumowanie, większość dyskusji dotyczy ogólnych skutków, czyli ataków napędzanych AI i tego, kto ponosi odpowiedzialność. Sam wątek o konkretnych incydentach jest cienki. Do tego długa pyskówka o brzydkim interfejsie samego trackera. To dość typowe. Łatwiej kłócić się o ciemny motyw niż przejrzeć własny lockfile.

**Key takeaways:**
- GitLab CVE-2026-110264 ma ocenę CVSS 10.0, poprawki to 19.5.1, 19.4.3 i 19.3.6.
- LiteLLM 1.107.0 kradła poświadczenia przez około dwie godziny i uruchamiała się przy samej instalacji.
- Po kontakcie z tą wersją trzeba zrotować wszystkie klucze, a nie tylko przeinstalować pakiet.

**Why do I care:** Mutowalne tagi Dockera i niezablokowane zależności to codzienność w projektach frontendowych z backendem pod spodem. Przypinanie wersji po digescie i skanowanie zależności w CI to nudna robota, ale ta historia pokazuje, że dwie godziny wystarczą. Pierwsze, co bym zrobił w poniedziałek, to sprawdzenie, czy jakikolwiek nasz pipeline ciągnie obraz po tagu latest.

**Link:** [October 21, 2026: PHP, Node.js, GitLab, LiteLLM and a long list of other security incidents](https://daily.dev/posts/BOE6qm91v)

## Node.js October 2026 Security Release: Finding Every Node You Actually Run

**TLDR:** Node.js wydał wersje 22.23.4, 24.22.1 i 26.12.1 z poprawką krytycznej luki w dekoderze Brotli. Trudniejsze od aktualizacji jest znalezienie wszystkich działających procesów Node.

**Summary:** Wydanie z 21 października naprawia CVE-2026-111497, zapis poza zakresem w dekoderze Brotli, który według ostrzeżenia pozwala na zdalne wykonanie kodu. Do tego dwa obejścia sprawdzania nazwy hosta w TLS i błąd w obcinaniu odpowiedzi DNS. Sama aktualizacja binarki jest prosta.

Prawdziwy problem zaczyna się potem. Autor pokazuje, że na jednej produkcyjnej maszynie po zmianie domyślnej wersji w nvm stare binarki dalej działały w wpisach pm2, w jednostce systemd, w procesach potomnych i w zadaniach cron na innych hostach. Na maszynie buildowej pgrep po nazwie znalazł zero z pięciu działających procesów Node. Obrazy Dockera oparte na Alpine spóźniły się z wydaniem o 12 do 13,5 godziny.

Do tekstu dołączony jest skrypt audytowy w Pythonie. Czyta prawdziwe binarki z /proc, stan pm2, crontaby i kontenery, bez zmieniania czegokolwiek. Są też kroki aktualizacji dla nvm, pm2 i systemd. Czego brakuje? Odpowiedzi na pytanie, dlaczego aktualizacja zależy od ręcznego polowania na procesy. To problem procesu wdrożeniowego, a nie jednej łatki.

**Key takeaways:**
- Poprawione wersje to 22.23.4, 24.22.1 i 26.12.1, a luka dotyczy dekodera Brotli.
- Zmiana domyślnej wersji w nvm nie restartuje procesów, które już działają.
- Obrazy Alpine spóźniły się o 12 do 13,5 godziny, więc na gotowy obraz nie ma co czekać.

**Why do I care:** Node siedzi nie tylko na serwerze aplikacji. Siedzi w buildach Next.js, w narzędziach CI, w lokalnych skryptach, w serwerach BFF. Każde z tych miejsc ma własną wersję. Jeśli prowadzę zespół, chcę mieć jedną listę, gdzie działa Node i w jakiej wersji, zanim ogłoszą kolejną krytyczną dziurę.

**Link:** [Node.js October 2026 Security Release: Finding Every Node You Actually Run](https://daily.dev/posts/jqMNMnwkd)

## 10 Best Open Source Design Systems for Developers in 2026

**TLDR:** Ranking dziesięciu open source'owych design systemów według gwiazdek na GitHubie, pobrań z npm, wsparcia frameworków, dostępności i licencji. Tekst jest przy okazji mocno reklamowy.

**Summary:** Na liście są shadcn/ui, Ant Design, Microsoft Fluent UI, Material Design 3, IBM Carbon, GitHub Primer, AWS Cloudscape, GOV.UK Design System, Gestalt z Pinteresta i PatternFly od Red Hata. Autor najpierw tłumaczy, czym prawdziwy design system różni się od zwykłej biblioteki komponentów. Potem zestawia model shadcn/ui, w którym kopiujesz kod do swojego repozytorium i jesteś jego właścicielem, z klasycznymi systemami aktualizowanymi centralnie.

Na końcu jest przewodnik wyboru według frameworka, wielkości zespołu i potrzeby dostosowywania. Rozsądny szkielet, tylko że wiele linków prowadzi do szablonów, generatora motywów i galerii wykresów samej witryny. Ranking opublikowała firma, która sprzedaje produkty oparte na shadcn, więc nie dziwi mnie, kto wygrywa w kategoriach, gdzie kryteria nie są twarde.

Porównanie po gwiazdkach i pobraniach mierzy popularność, a nie jakość. Autor pomija koszt utrzymania. Kopiowanie komponentów daje wolność, ale każdą łatkę dostępności musisz potem wciągać ręcznie. W systemie aktualizowanym centralnie robisz to jednym podniesieniem wersji.

**Key takeaways:**
- Design system to więcej niż biblioteka komponentów, bo obejmuje zasady, tokeny i dokumentację.
- shadcn/ui opiera się na własności kodu, a pozostałe systemy na aktualizacjach centralnych.
- Ranking jest zaangażowany, bo wydawca sprzedaje własne szablony shadcn.

**Why do I care:** Wybór design systemu to jedna z tych decyzji architektonicznych, których cofnięcie kosztuje miesiące. Z listy sięgnąłbym po wnioski o modelu własności kodu, a nie po samo miejsce w rankingu. Dla małego zespołu produktowego kopiowanie komponentów działa dobrze. Dla dużej organizacji z wieloma aplikacjami zwykle nie.

**Link:** [10 Best Open Source Design Systems for Developers in 2026](https://daily.dev/posts/J2V6FDHfk)
