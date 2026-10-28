---
title: "daily.dev: wydajność frontendu, ciche awarie zdarzeń domenowych, serwer pocztowy do kosza, CSS i luki w Node.js"
excerpt: "Praktyczny przewodnik po wydajności frontendu, trzy tryby awarii domenowych zdarzeń, 1,2 GB RAM odzyskane po usunięciu serwera pocztowego, nowości CSS i poprawki bezpieczeństwa Node.js."
publishedAt: "2026-10-28"
slug: "dailydev-wydajnosc-frontendu-zdarzenia-domenowe-serwer-pocztowy-css-nodejs-cve"
hashtags: "#dailydev #frontend #performance #nodejs #css #security #architecture #generated #pl"
source_pattern: "daily.dev"
---

## Frontend Performance Optimization: praktyczny przewodnik po szybszych stronach

**TLDR:** Optymalizacja wydajności to ustalanie, co ładuje się najpierw, a nie przyspieszanie wszystkiego naraz. Przewodnik przechodzi przez obrazy, LCP, skrypty zewnętrzne, iframe'y, JavaScript i przesunięcia układu.

**Summary:** Autor zaczyna od pomiaru, a nie od optymalizacji. Lighthouse, ślady z Chrome DevTools i Core Web Vitals, czyli LCP, CLS i INP, mają dać punkt odniesienia. Co ciekawe, proponuje wrzucić te artefakty do narzędzia AI, żeby pomogło powiązać na przykład nieużywany JavaScript z konkretnym komponentem. Model mentalny jest prosty: przeglądarka ma ograniczoną uwagę, więc trzeba jej powiedzieć, co jest naprawdę ważne.

Największy nacisk idzie na obrazy. Atrybut loading mówi o czasie ładowania, a fetchPriority o ważności zasobu względem innych żądań. To dwie różne rzeczy i mieszanie ich kończy się wysokim priorytetem dla wszystkiego, czyli dla niczego. Obraz LCP trzeba najpierw znaleźć, a dopiero potem nadać mu priorytet. W karuzelach nie ładuje się chętnie każdego slajdu i nie wiąże się ładowania z aktywnym slajdem.

Dla skryptów zewnętrznych, na przykład widgetu czatu, autor poleca strategię hybrydową. SDK ładuje się dynamicznym importem po zdarzeniu load, w czasie bezczynności przeglądarki, z limitem około pięciu sekund. Jeśli użytkownik kliknie przycisk czatu wcześniej, widget ładuje się od razu. Podobnie z JavaScriptem: jeśli nic nie jest otwarte, nie wysyłaj kodu. Lightboxy i szuflady importuje się dynamicznie, a szkielety ładowania muszą mieć geometrię zgodną z finalną treścią, bo inaczej CLS i tak skoczy.

**Key takeaways:**
- Mierz przed optymalizacją i po niej.
- loading odpowiada za czas, fetchPriority za ważność. Wysoki priorytet wszędzie nic nie daje.
- Widgety zewnętrzne ładuj w czasie bezczynności, ale z natychmiastowym ładowaniem po kliknięciu.
- Szkielet ładowania ma mieć wymiary prawdziwej treści.

**Why do I care:** To jest lista kontrolna, którą każdy zespół frontendowy powinien mieć przy code review. Mnie najbardziej podoba się rozdzielenie czasu od ważności, bo w audytach widzę ciągle fetchPriority high na pół strony. Brakuje mi tylko liczb. Autor nie pokazuje, ile LCP zyskuje się z którego zabiegu, więc trudno zdecydować, od czego zacząć.

**Link:** [Frontend Performance Optimization: A Practical Guide to Faster Web Pages](https://daily.dev/posts/Zg7YBkclv)

## Domain Events Are Easy. Until One Fails Silently.

**TLDR:** Zdarzenia domenowe rozwiązują problem funkcji znającej cztery niezwiązane efekty uboczne, ale tutoriale pomijają trzy tryby awarii. Wszystkie kończą się ciszą albo utraconymi zdarzeniami.

**Summary:** Pierwszy problem dotyczy wbudowanego EventEmittera w Node. Od wersji 15 odrzucony asynchroniczny handler zabija proces. Własna szyna z Promise.allSettled temu zapobiega, ale połyka błędy, jeśli nie zalogujesz każdego odrzucenia. Cicha awaria jest gorsza od głośnej, bo nikt nie wie, że email potwierdzający nie wyszedł.

Drugi problem to zdarzenia wysyłane w środku transakcji. Możesz ogłosić fakt, który za chwilę zostanie wycofany. Trzeci to crash procesu tuż po commicie, który gubi zdarzenia całkowicie. Lekarstwem jest transakcyjny outbox albo zadanie dodane do kolejki w tej samej transakcji. Do tego dochodzi kompromis. Czekanie na handlery dokłada ich opóźnienie do żądania, a odpal-i-zapomnij poszerza okno, w którym crash gubi zdarzenia.

**Key takeaways:**
- Odrzucony handler w EventEmitterze zabija proces od Node 15.
- Promise.allSettled bez logowania to ciche połykanie błędów.
- Zdarzenia w trakcie transakcji mogą ogłosić fakty, które zostaną wycofane.
- Outbox w tej samej transakcji chroni przed utratą zdarzeń.

**Why do I care:** Widziałem ten wzorzec w kilku backendach i prawie nigdzie nie było outboxa. Autor ma rację, ale nie mówi, kiedy outbox jest przesadą. Dla wysyłki maila po rejestracji prawdopodobnie jest, dla zdarzeń finansowych na pewno nie.

**Link:** [Domain Events Are Easy. Until One Fails Silently.](https://daily.dev/posts/366Sh3nHC)

## Usunąłem serwer pocztowy z VPS i odzyskałem 1,2 GB RAM

**TLDR:** Programista usunął samodzielnie hostowany serwer pocztowy z VPS-a swojej aplikacji w Django i przeszedł na przekaźnik SMTP smtpfa.st. Zużycie RAM spadło z 5537 MB do 4322 MB.

**Summary:** Stary docker-mailserver uruchamiał Postfix, Dovecot, rspamd, ClamAV i fail2ban. Razem brał 1,14 GiB RAM-u, żeby wysyłać maile z resetem hasła i weryfikacją. Po migracji transakcyjnej poczty autor zbudował jeszcze system newslettera z webhookami i zdarzeniami podpisanymi HMAC.

Chwali dostawcę za szybkie poprawki błędów, bo zgłoszenia na GitHubie zamykano w ciągu godzin. Dodaje też uczciwą uwagę, że pierwsza kampania miała 3,9 procent odbić, bo na liście były stare, nieaktualne zapisy.

**Key takeaways:**
- Stos pocztowy zjadał 1,14 GiB RAM dla kilku maili transakcyjnych.
- RAM spadł z 5537 MB do 4322 MB.
- Pierwsza kampania miała 3,9 procent odbić przez stare adresy.

**Why do I care:** To historia głównie dla właścicieli małych VPS-ów, ale ma morał dla architektów: nie hostuj własnej poczty, jeśli ona nie jest Twoim produktem. Pominięto za to koszt, czyli uzależnienie od jednego małego dostawcy SMTP. Artykuł jest wpisem autora o jego własnym wdrożeniu, więc potraktowałbym go jako anegdotę, nie benchmark.

**Link:** [I deleted the mail server from my VPS and got 1.2 GB of RAM back](https://daily.dev/posts/jlCjY6F1Q)

## What's !important #19: efekty refrakcji w CSS, zapytania scroll-state i @custom-media

**TLDR:** Przegląd CSS-Tricks po przerwie w publikacjach. Są efekty refrakcji tła, zapytania scroll-state, @custom-media jako zapasowa ścieżka dla container queries i nowości z Firefoksa, Safari i Chrome.

**Summary:** Wśród tematów jest budowanie komponentów na zapytaniach o styl kontenera i attr(), a także scroll-state z wartościami scrollable, scrolled, snapped i stuck. Przydatne na przykład do stylowania przyklejonego nagłówka bez JavaScriptu. Animowanie siatek CSS przez anchor positioning nie działa w Firefoksie, możliwe że przez błąd.

Z wydań przeglądarek: Firefox 155 i Safari 27 wprowadzają alpha(), progress() i rozszerzone attr() jako Baseline. Safari 27 dodaje też revert-rule i wartości light-dark() dla obrazów. Chrome 153 i 154 dostają scroll-axis-lock i text-decoration-inset. Jest też mała perełka: touch-action manipulation wyłącza podwójne dotknięcie powiększające na przyciskach i warto mieć to w resecie CSS.

**Key takeaways:**
- scroll-state pozwala stylować elementy zależnie od przewinięcia, także sticky.
- alpha(), progress() i rozszerzone attr() są już Baseline.
- touch-action manipulation to tani sposób na wyłączenie zoomu przy podwójnym tapnięciu.

**Why do I care:** To jest typowy tydzień na froncie, w którym połowa rzeczy jest użyteczna dopiero za rok. Zacząłbym od scroll-state, bo zastępuje obserwatory przewijania, które i tak źle się starzeją. Sprawdzaj Baseline, zanim cokolwiek wrzucisz do produkcji.

**Link:** [What's !important #19](https://daily.dev/posts/eadL0Z3kI)

## Poprawki bezpieczeństwa Node.js: błąd z bajtem zerowym w DNS i problemy TLS

**TLDR:** Wydania 22.23.4, 24.22.1 i 26.12.1 z 21 października 2026 naprawiają luki w DNS i TLS. Najgroźniejsza jest o wysokiej wadze: obcinanie nazwy hosta na bajcie zerowym w dns.resolve.

**Summary:** Funkcje dns.resolve i dns.reverse po cichu obcinały nazwę hosta na bajcie zerowym. Nazwa w rodzaju attacker.example, bajt zerowy, trusted.example przechodziła sprawdzenie sufiksu zaufanej domeny, a rozwiązywana była jako attacker.example. Poprawka dodaje walidację bajtu zerowego.

Linia 22 LTS dostaje poprawki sześciu CVE, 24 LTS siedmiu, a 26 Current dziewięciu. Dotyczą też obsługi niekanonicznych adresów IP w TLS, strażników agenta HTTP, resetów cache losowości w crypto, cache nagłówków zlib i modelu uprawnień. Zanim zaktualizujesz, stosuj dokładne listy dozwolonych hostów zamiast sprawdzania sufiksu i odrzucaj nazwy z bajtem zerowym.

**Key takeaways:**
- Sprawdzanie sufiksu nazwy hosta to dokładnie to, co obchodzi ten błąd.
- Aktualizuj do 22.23.4, 24.22.1 albo 26.12.1.
- Dokładne dopasowanie hosta i odrzucanie bajtu zerowego działa jako tymczasowa ochrona.

**Why do I care:** Jeśli twój backend lub BFF w Node waliduje domeny przez endsWith, to jest twoja luka do sprawdzenia dzisiaj. To głównie temat bezpieczeństwa, ale dotyka frontendowców z serwerem na Next.js lub podobnym. Aktualizacja jest tania, a sufiksowe walidacje i tak są złym nawykiem.

**Link:** [Node.js security releases fix a DNS null-byte bug and several TLS issues](https://daily.dev/posts/SxxQ0nqce)
