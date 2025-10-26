---
title: 'Extism Make All Software Programmable The Tragedy Of Running An Old Node Project Codecov Test Analytics Detect Flaky Tests'
excerpt: 'Przegląd 5 artykułów z ui.dev'
publishedAt: '2024-11-20'
slug: 'extism-make-all-software-programmable-the-tragedy-of-running-an-old-node-project-codecov-test-analytics-detect-flaky-tests'
hashtags: '#generated #pl #javascript #nodejs #testing'
---

## Extism - make all software programmable

No więc, mamy tutaj Extism - system pluginów oparty na WebAssembly, który brzmi jak odpowiedź na modlitwy każdego dewelopera. Podstawowa idea jest prosta: chcesz dodać system pluginów do swojej aplikacji? Nie ma problemu, po prostu importujesz bibliotekę i masz gotowe rozwiązanie.

Co mnie tutaj kręci, to że wykorzystują WebAssembly do sandboxingu. To znaczy, że pluginy działają w bezpiecznym środowisku i nie mogą zrobić krzywdy twojej głównej aplikacji. To jest naprawdę mądre podejście, bo każdy kto kiedykolwiek implementował system pluginów wie, jak łatwo można sobie wszystko zepsuć.

Najbardziej imponujące jest to, że mają SDK dla praktycznie wszystkiego - Python, Node, Ruby, Rust, Go, PHP, C/C++, OCaml. To pokazuje, że naprawdę myśleli o tym jako o uniwersalnym rozwiązaniu.

**Key takeaways:**
- WebAssembly jako fundament bezpiecznych pluginów
- Gotowe SDK dla większości popularnych języków
- Sandboxing jako domyślna funkcja bezpieczeństwa
- Szybkie wdrożenie - dni zamiast miesięcy

**Link:** [link](https://extism.org/)

## The Tragedy of Running an Old Node Project

Och, to jest coś, co każdy z nas przeżył. Abdisalan Mohamud opisuje swoje zmagania z uruchomieniem starego projektu Gatsby po czterech latach nieaktywności. I to jest prawdziwa tragedia współczesnego ekosystemu JavaScript.

Wyobraźcie sobie - facet chce tylko uruchomić swój blog, a kończy instalowaniem Python2, walcząc z błędami C++ i próbując zgadnąć, która wersja Node.js była używana cztery lata temu. To jest dokładnie to, co jest nie tak z naszym ekosystemem.

Szczególnie bolesne jest to, że projekt miał ponad 41 zależności, a kto wie ile sub-zależności. I nagle okazuje się, że potrzebujesz Python2 do instalacji pakietów Node. Potem błędy C++, bo node-gyp próbuje kompilować natywne moduły. To jest szaleństwo.

Najgorsze w tym wszystkim jest to, że rozwiązanie było banalne - po prostu użyć Node v12 zamiast v16. Ale żeby do tego dojść, facet stracił dwie godziny życia.

**Key takeaways:**
- Dependency hell to prawdziwy problem w ekosystemie Node.js
- Brak wersjonowania Node.js w package.json to błąd
- Natywne zależności to bomba zegarowa
- Lock files to nie wszystko - wersja runtime też ma znaczenie

**Link:** [link](https://abdisalan.com/posts/tragedy-running-old-node-project)

## Codecov Test Analytics - Detect flaky tests

Codecov wprowadza Test Analytics i skupia się na czymś, co każdy deweloper zna - flaky testach. Te przeklęte testy, które czasem przechodzą, czasem nie, i nigdy nie wiesz dlaczego.

Co mi się podoba w tym rozwiązaniu, to że nie tylko wykrywają flaky testy, ale też je oddzielają od prawdziwych błędów. To znaczy, że w komentarzu do pull requesta widzisz jasno, które testy są flaky, a które faktycznie wskazują na problemy w kodzie.

Dodatkowo mają funkcję, która pokazuje stack trace bezpośrednio w komentarzu PR. Koniec z grzebaniem w logach CI żeby znaleźć, co się zepsuło. To jest naprawdę praktyczne.

Długoterminowo śledzą też statystyki - które testy są najwolniejsze, które najczęściej flakują, jaki jest ogólny czas wykonania test suite. To pozwala priorytetyzować, które problemy rozwiązać najpierw.

**Key takeaways:**
- Automatyczne wykrywanie flaky testów
- Stack trace bezpośrednio w PR
- Długoterminowe statystyki wydajności testów
- Priorytetyzacja problemów w test suite

**Link:** [link](https://about.codecov.io/product/feature/test-analytics/)

## CarbonQA - Contextual QA for dev teams

CarbonQA to usługa, która oferuje dedykowane zespoły QA dla dev teamów. Główna idea jest taka, że zamiast marnować czas deweloperów na testowanie, dają im profesjonalnych testerów z USA.

Co mnie tutaj interesuje, to że to nie jest crowdsourcing ani mechanical turk. To są pełnoetatowi testerzy, którzy uczą się twojego produktu, procesów i zespołu. To jest relationship-based QA z kontekstem.

Model biznesowy jest ciekawy - płacisz miesięczną subskrypcję, która zapewnia "project-ready" testerów. Potem płacisz per tester per dzień kiedy faktycznie testują. Subskrypcja zawiera pierwsze kilka dni testowania miesięcznie plus onboarding.

Skupiają się na manual testingu web, desktop i mobile apps. Testują przeciwko user stories, acceptance criteria, istniejącym test planom. Mogą też zbudować test plan jeśli go nie masz.

**Key takeaways:**
- Dedykowane zespoły QA zamiast crowdsourcingu
- Relationship-based approach z kontekstem produktu
- Model subskrypcji plus pay-per-use
- Focus na manual testing wszystkich platform

**Link:** [link](https://carbonqa.com/)

## Beautiful focus outlines

Thomas Günther pisze o czymś, co jest często ignorowane - focus outlines w web designie. To te obramowania, które pokazują, który element jest aktualnie aktywny podczas nawigacji klawiaturą.

Główny problem polega na tym, że focus outlines są traktowane jako czysto techniczny requirement. Klienci i designerzy ich często nie zauważają, zostawiając deweloperów samych z implementacją. Niektórzy nawet sugerują ich usunięcie dla "czystszej" estetyki.

Autor argumentuje, że focus outlines powinny być traktowane jako essential design elements, nie afterthoughts. Gdy robimy je ładne i przemyślane, tworzymy interfejsy, które są zarówno piękne jak i inclusive.

Poleca custom outlines zamiast browser defaults, bo te są niekonsystentne i często zbyt subtelne. Pokazuje też jak używać focus-visible zamiast focus, żeby outlines pokazywały się tylko dla użytkowników klawiatury.

Ciekawy trick z currentColor - ustawia kolor outline na aktualny kolor tekstu, więc zawsze będzie pasować do designu.

**Key takeaways:**
- Focus outlines to design element, nie tylko tech requirement
- Browser defaults są niekonsystentne i za subtelne
- :focus-visible pokazuje outline tylko dla keyboard users
- currentColor automatycznie dopasowuje kolory

**Link:** [link](https://medienbaecker.com/articles/focus-outlines)