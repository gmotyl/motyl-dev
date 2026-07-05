---
title: "Tailwind Weekly #221: poprawki v4.3.2, przepisany eslint-plugin, animacje CSS vs JS i CSS bez tajemnic"
excerpt: "Najnowsze poprawki Tailwind CSS, przepisany plugin ESLint pod v4, narzędzia od twórców Tailwind oraz solidne artykuły o animacjach, fontach i position: sticky."
publishedAt: "2026-07-05"
slug: "tailwind-weekly-221-v432-fixes-eslint-plugin-css-insights"
hashtags: "#tailwindweekly #tailwindcss #css #javascript #frontend #eslint #animation #performance #generated #pl"
source_pattern: "Tailwind Weekly"
---

## Tailwind CSS v4.3.2 – lista poprawek

**TLDR:** Nowa łatka usuwa kilkanaście błędów, w tym crashe watchera na Windows i Deno v2.8.x oraz błędne generowanie deklaracji CSS dla pewnych wartości spacing.

**Summary:**

Wersja 4.3.2 to klasyczna łatka stabilizacyjna. Naprawia crash `@tailwindcss/cli` w trybie watch na Windows, kiedy `@source` wskazuje na nieistniejący katalog. Podobny problem dotykał Deno v2.8.x, gdzie `context.parentURL` nie był poprawnym URL-em i crashował plugin Vite przy każdym uruchomieniu.

Jest tam jeden błąd, który w produkcji mógłby być naprawdę trudny do wyśledzenia. Użycie `text-[--spacing(...)]` generowało deklarację koloru zamiast rozmiaru czcionki. Wizualnie wyglądałoby to po prostu jak brak stylu, bez żadnego błędu w konsoli.

Nowe w tej wersji jest wsparcie dla `auto-rows-12` i `auto-cols-16` jako gołych wartości spacing bez owijania w nawiasy kwadratowe. Drobne, ale irytujące ograniczenie znika. Plugin PostCSS dostał poprawkę kompatybilności z nowszymi wersjami, a ekstrakcja class candidates z Template Toolkit i składni Maud działa teraz poprawnie.

**Key takeaways:**
- Watcher CLI na Windows i Deno v2.8.x nie crashuje już przy edge case'ach z URL-ami i nieistniejącymi katalogami
- `text-[--spacing(...)]` generuje teraz poprawnie deklarację `font-size`, nie `color`
- Bare spacing values jak `auto-rows-12` działają bez arbitrary value syntax

**Why do I care:** To łatka, więc nie ma tu rewolucji. Jeśli ktoś pracuje na Windows z watcher mode lub wdraża na Deno v2.8.x, ta aktualizacja jest obowiązkowa. Reszta to drobne usprawnienia, które z czasem się sumują i poprawiają DX bez fałszywych alarmów.

**Link:** [Release v4.3.2 · tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss/releases/tag/v4.3.2)

---

## eslint-plugin-tailwindcss przepisany pod v4

**TLDR:** Popularny plugin ESLint do Tailwind CSS, rozwijany od 2021 roku, doczekał się pełnego przepisania pod Tailwind v4 i ESLint v10. Siedem reguł gotowych, więcej w drodze.

**Summary:**

`eslint-plugin-tailwindcss` to jedno z tych narzędzi, które wielu traktuje jako obowiązkowy element konfiguracji projektu od pierwszego dnia. Plugin wymusza spójną kolejność klas bazując na kompilatorze Tailwind, wykrywa sprzeczne klasy, ostrzega przed niepotrzebnymi arbitrary values i kilka innych rzeczy. Od teraz jest w pełni kompatybilny z Tailwind v4 i ESLint v10 z flat config.

Konfiguracja zmieniła się znacząco w stosunku do v3. Zamiast pliku `tailwind.config.js` plugin wymaga teraz `cssConfigPath` wskazującego na plik `.css`. To logiczne następstwo zmiany w samym Tailwind v4, ale wymaga uwagi przy migracji. Ścieżka może być absolutna lub relatywna, plugin sam konwertuje ją do absolutnej.

Plugin jest projektem open source utrzymywanym przez jedną osobę, Françoisa Massarta. Autor wprost prosi o wsparcie sponsorskie, bo projekt jest darmowy i wymaga dużo czasu. Siedem reguł to solidna baza, a roadmap sugeruje, że jest ambitny plan na kolejne.

**Key takeaways:**
- Wymaga podania `cssConfigPath` jako ścieżki do pliku `.css` (nie `.js` jak w v3)
- Wspiera ESLint v10 i flat config
- Reguły `classnames-order` i `no-contradicting-classname` są autonaprawialne przez `--fix`

**Why do I care:** Automatyczne sortowanie klas Tailwind redukuje szum w code review i sprawia, że diffy są czytelniejsze. Jeśli jeszcze nie masz tego pluginu, to dobry moment żeby go dodać. Migracja z v3 wymaga zmiany ścieżki konfiguracji, ale to dosłownie kilka minut roboty, po których projekt działa jak wcześniej.

**Link:** [GitHub - francoismassart/eslint-plugin-tailwindcss](https://github.com/francoismassart/eslint-plugin-tailwindcss)

---

## ui.sh – zestawy promptów od twórców Tailwind i Refactoring UI

**TLDR:** Twórcy Tailwind CSS i Refactoring UI udostępnili ui.sh, kolekcję gotowych workflow i promptów dla agentów AI skupionych na budowaniu interfejsów.

**Summary:**

ui.sh to nowy projekt wychodzący spod rąk Adama Wattera i Steve'a Schogera, czyli duetu odpowiedzialnego za Tailwind CSS i Refactoring UI. Zamiast kolejnego frameworka, oferują coś innego: zestawy zadaniowych promptów i workflow dla agentów AI skupionych na konkretnych problemach budowania interfejsów.

W ofercie są między innymi workflow do generowania nowych UI z perspektywy doświadczonego designera, porównywania alternatywnych kierunków wizualnych bezpośrednio w przeglądarce, generowania dark mode który wygląda jak rzeczywiście zaprojektowany a nie po prostu odwrócony kolorystycznie. Jest też konwersja screenshotów i makiet na semantyczny markup oraz Canonicalize Tailwind do sortowania, normalizacji i usuwania sprzecznych klas.

Projekt jest na etapie invite-only, więc dostępność jest ograniczona. Ciężko ocenić jakość bez dostępu. Koncepcja jest interesująca: zamiast próbować opisać "jak wyglądać ma dobry design" w jednym mega-prompcie, problem jest rozkładany na małe, konkretne zadania. To sensowniejsze podejście niż generyczne "help me design a UI".

**Key takeaways:**
- Dostępne na zaproszenie, stworzone przez twórców Tailwind CSS i Refactoring UI
- Workflow pokrywają design, dark mode, responsywność i refactoring kodu UI
- Osobny workflow do normalizacji i deduplicacji klas Tailwind

**Why do I care:** Sam pomysł rozkładania zadań UI na wyspecjalizowane workflow agentów ma sens. Widzę to jako potencjalnie przydatne dla konsultantów i agencji, które robią dużo prototypowania. Nie zastąpi to seniorów z wyczuciem designu, ale może przyspieszyć wczesne fazy pracy. Ciekaw jestem jak to wygląda w praktyce, bo premise jest obiecujące.

**Link:** [ui.sh — Agent skills for interface builders](https://ui.sh/)

---

## CSS vs. JavaScript w animacjach: co naprawdę wpływa na wydajność

**TLDR:** Josh W. Comeau rozkłada mit o tym, że CSS jest "szybszy" od JavaScriptu w animacjach. Różnica nie leży w liczeniu klatek, ale w tym, który wątek obsługuje animację.

**Summary:**

Przekonanie, że animacje CSS są wydajniejsze od JavaScript, jest powszechne. I jest w dużej mierze prawdziwe, ale z zupełnie innych powodów niż myśli większość deweloperów. To nie jest kwestia overhead obliczeń ani przekraczania jakiegoś mostu między JS a DOM. Nowoczesne silniki przeglądarek radzą sobie z tym bez wysiłku.

Prawdziwa różnica jest fundamentalna: animacje CSS i keyframe'y uruchamiają się na osobnym wątku, podczas gdy kod JavaScript działa na main thread razem z całą resztą aplikacji. Kiedy React aktualizuje drzewo DOM, kiedy przeglądarka parsuje odpowiedź z API, kiedy cokolwiek blokuje main thread, animacja JS zatrzymuje się razem z nim. Spinner freezuje, karuzela szarpie.

Comeau wprowadza ciekawą zmienną: bibliotekę Motion, dawniej Framer Motion. Mimo że to JavaScript, Motion używa wewnętrznie Web Animations API (WAAPI), które jest JavaScriptowym interfejsem do tego samego silnika co CSS animations. Dzięki temu animacje Motion działają na osobnym wątku i są odporne na blokady main thread. GSAP tego nie robi, bo wybiera inne kompromisy oferując znacznie większą kontrolę i możliwości. To nie jest zły wybór, to inny wybór.

Moral ze story jest prosty: jeśli potrzebujesz animacji odpornych na obciążenie main thread, sięgaj po CSS lub biblioteki oparte na WAAPI jak Motion. GSAP sprawdzi się tam, gdzie ważna jest precyzyjna kontrola sekwencji i możliwości, których CSS nie oferuje.

**Key takeaways:**
- Animacje CSS działają na osobnym wątku, JS na main thread
- Blokada main thread (React update, fetch parsing) zatrzymuje animacje JS, ale nie CSS
- Motion używa WAAPI i działa jak CSS pod maską, omijając problem main thread

**Why do I care:** To artykuł, który warto przesłać każdemu, kto pyta "czy mogę użyć JavaScript do animacji". Odpowiedź nie jest "nie", ale "to zależy od tego, co robisz i jakiej biblioteki używasz". WAAPI otwiera też interesujące możliwości dla własnych rozwiązań. Coraz rzadziej potrzebujemy pełnego GSAP do prostych interakcji.

**Link:** [CSS vs. JavaScript • Josh W. Comeau](https://www.joshwcomeau.com/animation/css-vs-javascript/)

---

## font-family nie fallbackuje tak, jak myślisz

**TLDR:** Harry Roberts z CSS Wizardry opisuje nieintuicyjne zachowanie `font-family`: każda deklaracja jest samodzielna i nie dziedziczy fallbacków od rodziców w DOM. Skutek to niezamierzone flashe Times New Roman i problemy z CLS.

**Summary:**

Jest w CSS jedna rzecz, którą większość deweloperów rozumie błędnie przez lata. `font-family` jest właściwością dziedziczoną, więc ustawiamy go raz na `body` i spokojnie zapominamy o problemach. Kłopot pojawia się, gdy na konkretnym elemencie nadpisujemy `font-family` pojedynczą wartością.

Kiedy na przykład piszemy `h1 { font-family: "Open Sans"; }`, intuicja podpowiada, że jeśli "Open Sans" nie jest jeszcze załadowany, przeglądarka cofnie się do deklaracji rodzica i użyje `system-ui, sans-serif`. Tak nie działa. Deklaracja `font-family` na elemencie jest autonomiczna. Przeglądarka bierze tylko to, co jest w tej konkretnej deklaracji, i jeśli font nie jest dostępny, nie szuka fallbacku w rodzicu. Zamiast tego sięga po domyślny font przeglądarki, a tym jest najczęściej Times lub Times New Roman.

Roberts pokazuje konkretny przykład z projektu klienta: dziesiątki zmiennych CSS zawierały same nazwy fontów bez żadnych fallbacków. To przepis na regularne flashe nieodpowiednich fontów i potencjalne problemy z Cumulative Layout Shift, bo metryki różnych krojów pisma znacznie się różnią. Poprawka jest trywialna: do każdej deklaracji `font-family` dodajemy pełny stos z fallbackami.

To jeden z tych błędów, które żyją w kodebazie latami, bo są wystarczająco mało widoczne żeby nie powodować zgłoszeń, a wystarczająco irytujące żeby psuć pierwsze wrażenie użytkownika.

**Key takeaways:**
- Każda deklaracja `font-family` jest samodzielna i nie dziedziczy fallbacków od przodków w DOM
- Brak fallbacków powoduje flash domyślnego fontu przeglądarki (często Times New Roman)
- Różne proporcje fallbacku i docelowego fontu generują CLS

**Why do I care:** Spotkałem ten błąd w nie jednym projekcie. Szczególnie niebezpieczny jest w design systemach, gdzie tokeny typograficzne są definiowane w jednym miejscu. Jeden zestaw zmiennych CSS bez fallbacków to problem powielany w każdym komponencie. Warto przejrzeć swój stack typografii pod tym kątem, zanim zrobi to zewnętrzny performance audit.

**Link:** [font-family Doesn't Fall Back the Way You Think – CSS Wizardry](https://csswizardry.com/2026/04/font-family-doesnt-fall-back-the-way-you-think/)

---

## Dziwne zachowanie position: sticky – diagnoza i leczenie

**TLDR:** Wyczerpujący artykuł na Frontend Masters tłumaczy, dlaczego `position: sticky` tak często nie działa. Winowajcą jest zawsze ten sam problem: element sticky nie może wyjść poza granice swojego kontenera.

**Summary:**

`position: sticky` ma reputację funkcji CSS, która "nie działa i nie wiadomo dlaczego". Googling "position sticky doesn't work" zwraca mnóstwo wyników, z których większość mówi to samo: sprawdź, czy gdzieś nie ma `overflow: hidden`. To prawda, ale zaledwie część prawdy.

Autor rozkłada problem na dwa scenariusze. Pierwszy: element sticky jest większy niż kontener scrollowania. Przeglądarka pozwala mu przykleić się tylko do momentu, gdy będzie musiała pokazać jego pozostałą część. Innymi słowy, element przykleił się, ale tylko tymczasowo, bo musi być widoczny w całości. W produkcji może to wyglądać jak losowo pojawiający się błąd, który trudno odtworzyć.

Drugi scenariusz jest subtelniejszy i dotyczy kontenerów flex i grid. Domyślnie dzieci flex mają `align-self: stretch`, co sprawia, że rosną do wysokości rodzica. Jeśli rodzic jest elementem flex w układzie pionowym, dziecko grid wewnątrz niego urośnie do pełnej wysokości kontenera scrollowania. Element sticky próbuje przykleić się, ale żeby to zrobić, musiałby "wyjść" poza swój kontener, a przeglądarka na to nie pozwoli.

Rozwiązanie jest eleganckie: dodanie `self-start` zarówno do kontenera grid/flex jak i do samego elementu sticky. To sprawia, że kontener rośnie do swojej naturalnej wysokości zamiast rozciągać się do rodzica, a element sticky ma wystarczająco dużo przestrzeni żeby faktycznie działać.

**Key takeaways:**
- Element sticky nie może być większy niż kontener scrollowania, żeby działał poprawnie
- Domyślny `align-self: stretch` w flex/grid powoduje, że kontener urasta do rozmiaru rodzica, blokując sticky
- `self-start` na kontenerze i elemencie sticky rozwiązuje większość przypadków flex/grid

**Why do I care:** Byłem w środku produkcyjnego debugowania tego dokładnie kilka miesięcy temu. Wiedziałem, że `overflow: hidden` nie jest winowajcą, i potrzebowałem czasu zanim doszedłem do `align-self`. Ten artykuł wyjaśnia mechanizm w sposób, który po przeczytaniu jest oczywisty. Warto przeczytać raz i zapamiętać, żeby nie wracać do Google'a przy kolejnym przypadku.

**Link:** [The Weird Parts of position: sticky;](https://frontendmasters.com/blog/the-weird-parts-of-position-sticky/)

---

## BlatUI – shadcn/ui przeniesione na stos BLAT

**TLDR:** BlatUI to port shadcn/ui na stos BLAT (Blade, Laravel, Alpine, Tailwind v4). 154 komponenty, 643 warianty, zero JavaScript runtime.

**Summary:**

Koncepcja jest prosta: to co shadcn/ui zrobiło dla ekosystemu React, BlatUI próbuje zrobić dla Laravel. Komponenty są kopiowane do projektu przez Artisan command i stają się własnością dewelopera, nie czarną skrzynką dependencji. Tailwind v4 jako warstwa stylowania, Alpine.js jako minimalna interaktywność. Żadnego npm runtime.

Projekt jest w wersji 1.14.1 z 154 komponentami i 64 gotowymi blokami. Dostępność jest traktowana poważnie: WAI-ARIA, pełna nawigacja klawiaturą, WCAG AA contrast. Theming przez zmienne CSS pozwala na przeformatowanie całego systemu w czasie rzeczywistym. Ciekawa jest też wzmianka o integracji "agent-ready" przez własny MCP server i plik `llms.txt`, żeby narzędzia AI mogły automatycznie instalować komponenty.

Dla deweloperów PHP/Laravel to sensowna alternatywa dla stosów z Reactem, jeśli chcą porządny UI bez przepisywania backendu.

**Key takeaways:**
- Port shadcn/ui na Blade + Alpine + Tailwind v4 dla projektów Laravel
- Komponenty kopiowane do projektu przez `php artisan blatui:add`
- Dostępność z pudełka: WAI-ARIA, WCAG AA, dark mode

**Why do I care:** Nie pracuję na co dzień w PHP, ale doceniam filozofię "ty posiadasz kod". To trafna odpowiedź na lock-in z komercyjnymi bibliotekami komponentów. Jeśli projekt jest na Laravel i nie chce migrować na SPA, BlatUI wygląda na profesjonalne rozwiązanie.

**Link:** [BlatUI — shadcn/ui for the BLAT stack](https://blatui.remix-it.com/)

---

## VibePHP – silnik PHP działający na wyczuciu

**TLDR:** VibePHP to satyryczny projekt, który zamiast interpretować PHP, podaje kod źródłowy do AI, które "odgrywa" jego działanie. Nie jest deterministyczny, nie jest tani, nie jest poprawny. Jest za to bardzo vibe.

**Summary:**

VibePHP to projekt humorystyczny, ale z bardzo konkretnym komentarzem do współczesnego trendu "vibe coding". Zamiast interpretatora czy kompilatora, każde żądanie HTTP powoduje przekazanie kodu PHP do modelu językowego. Model czyta kod, rozumie intencję, wymyśla brakujące dane (baza danych, czas systemowy, wyniki API) i zwraca odpowiedź HTTP, którą jego zdaniem kod by wygenerował.

Strona benchmarków jest szczególnie zabawna. VibePHP ma latencję p50 na poziomie 7 sekund i koszt około 0.0063 USD za żądanie, w porównaniu do ułamka milisekunda i praktycznie zerowych kosztów tradycyjnych runtimeów. Autor "uzasadnia" to badaniem Labour Illusion ze Harvard Business School, które wykazało, że ludzie wyżej cenią usługi gdy widzą, że te "pracują". VibePHP zwiększa zatem postrzeganą wartość strony o 700 000%, co kompensuje koszty.

Projekt jest zaimplementowany w Laravel i faktycznie działa. Strona demo serwuje hallucynowane posty blogowe, stronę about z uptime'm "który jest liczbą dobrze się czującą dla AI" i JSON endpoint z wymyślonymi metrykami serwera. Każde odświeżenie generuje inną stronę, bo dlaczego nie.

**Key takeaways:**
- Satyryczny komentarz do "vibe coding" i ślepego zaufania do modeli językowych
- Faktycznie działa: Laravel + GPT/Claude jako runtime PHP
- Każde żądanie kosztuje ~0.006 USD i trwa ~7 sekund

**Why do I care:** Śmieszne? Tak. Ale VibePHP zadaje poważne pytanie: ile logiki aplikacji jesteśmy gotowi powierzyć modelom językowym bez weryfikacji? Projekt jest żartem, ale w 2026 roku ten żart staje się coraz mniej odległy od rzeczywistości. Warto mieć to z tyłu głowy, kiedy ktoś proponuje "let the AI handle it".

**Link:** [GitHub - mnapoli/vibephp: A PHP engine that runs on vibes, not code.](https://github.com/mnapoli/vibephp)
