---
title: "Pragmatic Engineer: skalowanie Slacka i GitHuba z Maude Lemaire"
excerpt: "Osiem obserwacji z rozmowy o thundering herds, testach obciążeniowych 500 tysięcy połączeń WebSocket, Active Record na GitHubie i rotacji inżynierów platformowych."
publishedAt: "2026-11-06"
slug: "pragmatic-engineer-skalowanie-slacka-github-maude-lemaire"
hashtags: "#pragmaticengineer #architecture #performance #backend #engineering #database #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Skalowanie Slacka i GitHuba z Maude Lemaire

**TLDR:** Gergely Orosz rozmawia z Maude Lemaire, autorką książki o refaktoryzacji na dużą skalę, która osiem lat skalowała backend Slacka, potem GitHuba, a ostatnio Cursora. Wypunktowano osiem ciekawostek, od limitu 23 emoji po 16 shardów.

**Summary:** Lemaire zaczyna od historii z Rent the Runway, gdzie strona główna ładowała się do dziesięciu sekund przez ogromne zdjęcie. Powiedziano jej, że to nieważne, bo nie ma konkurencji. Zrobiła to po godzinach i bez pytania, bo uznała, że najlepszą konkurencją jest ta z samym sobą.

Slack ogranicza własne emoji do 23, żeby uniknąć thundering herd. Gdy dyrektor napisze na kanale ze 100 tysiącami osób, że wszyscy mają wolny piątek, ludzie zalewają kanał własnymi emoji. Każde trzeba rozesłać do wszystkich, więc 100 emoji daje 10 milionów rozesłań. Powiązany problem to event flood po stronie klienta, gdzie osoba zalogowana na wielu ruchliwych kanałach dostaje wszystko naraz przez jedno połączenie WebSocket, bez deduplikacji.

Najlepsza historia dotyczy testów obciążeniowych. Nowy klient miał 500 tysięcy użytkowników. Uruchomienie headless Chrome dla każdego kosztowałoby około 150 tysięcy dolarów na jeden bieg. Lemaire napisała więc w Go narzędzie Koi Pond, które symuluje odchudzone klienty Slacka i trzyma połączenia WebSocket.

Na GitHubie spotkała monolit Rails z Active Record. Strona główna przy większości odświeżeń pobierała dane na żywo i potrafiła wywołać 100 zapytań SQL do trzech klastrów. Co gorsza, GitHub nie mógł dodać więcej niż 16 shardów, bo wiele zapytań nie miało klucza shardowania i trzeba je było rozsyłać do wszystkich. Im więcej shardów, tym wolniejsze takie zapytania.

Podejście do AI jest rozsądne. Przy pracy fundamentalnej Lemaire sprawdza wszystko, co zwraca model, bo ambitne konstrukcje stoją na stabilnych fundamentach. Przy reszcie jest luźniejsza. Na koniec radzi rotować inżynierów między platformą a produktem, bo najlepsi platformowcy to byli produktowcy zmęczeni powtarzaniem tej samej roboty.

Czego brakuje? Odcinek jest rozmową, więc nie ma twardych liczb o zyskach z Koi Pond ani o tym, ile kosztowała migracja z shardów. Rotacja brzmi dobrze, ale nie ma słowa o koszcie wdrożenia nowej osoby w zespole.

**Key takeaways:**
- Limit 23 emoji w Slacku to obrona przed thundering herd.
- Koi Pond w Go zastąpił headless Chrome i oszczędził około 150 tysięcy dolarów na bieg.
- Active Record ukrywa koszt zapytań i uniemożliwił dodanie więcej niż 16 shardów.
- Rotacja platforma i produkt chroni przed oderwaniem od użytkownika.

**Why do I care:** Dla frontendowca ta rozmowa to lista rzeczy, które dzieją się po drugiej stronie WebSocketu. Każda funkcja typu reakcje czy typing indicator ma koszt rozesłania. Przy projektowaniu realtime zadaj pytanie, ile razy to zdarzenie zostanie powielone, zanim dodasz kolejny typ eventu.

**Link:** [Scaling Slack and GitHub with Maude Lemaire](https://newsletter.pragmaticengineer.com/p/scaling-slack-and-github-with-maude)
