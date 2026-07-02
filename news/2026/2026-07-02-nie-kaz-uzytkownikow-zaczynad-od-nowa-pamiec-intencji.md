---
title: "Nie każ użytkownikom zaczynać od nowa — o pamięci intencji w produktach cyfrowych"
excerpt: "Produkty świetnie pamiętają tożsamość użytkownika, ale zupełnie zapominają o tym, co ten użytkownik próbował zrobić."
publishedAt: "2026-07-02"
slug: "nie-kaz-uzytkownikow-zaczynad-od-nowa-pamiec-intencji"
hashtags: "#unicorn-club #ux #product #state-management #autosave #generated #pl"
source_pattern: "Unicorn Club"
---

## Pamiętaj pracę, nie tylko użytkownika

**TLDR:** Produkty cyfrowe są coraz lepsze w rozpoznawaniu tożsamości użytkownika, ale kompletnie zawalają, gdy chodzi o pamiętanie jego intencji. Wracasz po dokument, zamykasz kartę, zmieniasz urządzenie — i zaczynasz od zera. To nie jest problem techniczny, to problem decyzji produktowej: co powinno przetrwać, a co nie.

**Summary:**

Masz otwartą aplikację. Wypełniłeś pięć z ośmiu kroków formularza, przesłałeś dokumenty, odpowiedziałeś na trudne pytania. Potrzebujesz czegoś od kogoś innego, więc zamykasz zakładkę. Wracasz następnego dnia. Produkt wita Cię ciepło: „Witaj z powrotem, Adamie." A potem mówi ci, żebyś zaczął od nowa.

To jest właśnie ta dziura. Unicorn Club opisuje ją precyzyjnie: pamiętanie tożsamości to nie to samo co pamiętanie intencji. Produkty świetnie nauczyły się rozpoznawać, kim jesteś — mają twój plan, ustawienia, preferencje, historię płatności. Ale to, co próbowałeś zrobić? Tego najczęściej nie ma. Sesja wygasła, stan przepadł, praca na marne.

I tu zaczyna się prawdziwe pytanie — nie techniczne, ale produktowe. Nie chodzi o to, czy możesz coś zapisać. Chodzi o to, czy zapisanie tego ma sens i co oznacza dla użytkownika powrót do tego miejsca. Czy ten stan jest nadal aktualny? Czy jest prywatny? Czy powinien podążać za użytkownikiem między urządzeniami? Czy powinien wygasnąć? Czy użytkownik powinien móc go wyczyścić i zacząć od nowa?

Autosave to nie rozwiązanie samo w sobie — to tylko jeden element układanki. Prawdziwy problem pojawia się w momencie powrotu: ekran powitalny powinien pokazywać nie tylko to, że ktoś tu był, ale co zdążył zrobić, co jest zablokowane i gdzie powinien teraz kontynuować. „Kontynuuj aplikację — 5 z 8 kroków ukończonych, dokument przesłany, wymagana zgoda menedżera" — to jest użyteczna pamięć. „Zaloguj się ponownie, żeby zacząć" — to nie jest.

Artykuł proponuje cztery pytania, które warto zadać przy każdym ważnym przepływie pracy: co użytkownik już zrobił i co byłoby bolesne do powtórzenia, gdzie powinien wylądować po powrocie, gdzie i jak długo powinna żyć ta pamięć, i co powinno zostać zapomniane, ukryte lub łatwe do wyczyszczenia. To nie są pytania dla inżynierów — to pytania dla całego zespołu produktowego, zanim w ogóle zaczniecie rozmawiać o implementacji.

**Key takeaways:**

- Zapamiętywanie tożsamości i zapamiętywanie intencji to dwa zupełnie różne problemy — większość produktów rozwiązała tylko pierwsze
- Ekran powrotu powinien pokazywać stan pracy, nie tylko powitanie
- Nie każdy stan warto zapisywać — stary filtr z zeszłego tygodnia na dashboardzie może sprawiać, że wszyscy myślą, że coś jest zepsute
- Pamięć potrzebuje reguł: zakres, czas życia, widoczność, kontrola użytkownika
- „Zapomnij" też powinno być świadomą decyzją, nie domyślnym zachowaniem

**Why do I care:** Z perspektywy architekta frontendowego, to jest jeden z tych problemów, które zawsze lądują po złej stronie granicy odpowiedzialności. Frontend mówi „stan jest w URL", backend mówi „drafty są w bazie", produkt mówi „to zrobi localStorage" — i nikt nie zadaje pytania o to, co te dane znaczą dla użytkownika, który wraca po tygodniu. Widziałem to wiele razy: zespoły implementują mechanizm zapisu, ale nie projektują powrotu. To jest subtelna, ale bardzo realna różnica. Artykuł celnie punktuje, że to jest decyzja produktowa przed decyzją inżynierską, i mam wrażenie, że w większości organizacji ta kolejność jest odwrócona.

Mam też jedno zastrzeżenie do tego artykułu: autor trochę za łatwo pomija kwestię złożoności współdzielonego stanu. W środowiskach B2B przepływy pracy często są wieloosobowe — jeden użytkownik zaczyna, inny zatwierdza, trzeci dopełnia. Pamięć intencji w takim kontekście to już nie tylko problem UX, ale zarządzanie stanem na poziomie biznesowym. Artykuł dotyka tego jednym zdaniem, ale temat zasługuje na osobną analizę.

**Link:** [Remember the work, not just the user](https://unicornclub.dev/issues/2026-07-01-remember-the-work-not-just-the-user/)
