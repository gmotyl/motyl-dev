---
title: "Refactoring.fm: jak wychowywać juniorów w erze AI i dlaczego większość produktów AI wciąż tkwi w fazie czatu na pasku bocznym"
excerpt: "Luca Rossi o pętli feedbacku, która decyduje, czy junior faktycznie dorasta do seniora zamiast nadużywać AI bez nadzoru, oraz rozmowa z inżynierem OpenAI o trzech erach programowania wspieranego przez AI i dlaczego natywne produkty agentowe dopiero powstają."
publishedAt: "2026-09-21"
slug: "refactoring-fm-growing-juniors-native-ai-products"
hashtags: "#Refactoring #ai #agents #management #career #generated #pl"
source_pattern: "🌀 Refactoring"
---

## Pętla feedbacku, bez której junior nie dorośnie do seniora

**TLDR:** Autor twierdzi, że kluczową cechą juniora nie jest to, co potrafi dziś, tylko czy ma realną szansę stać się seniorem, a to nie dzieje się samo. Bez dwuwarstwowej pętli feedbacku, harnessu wymuszającego jakość i seniora pracującego blisko juniora, AI raczej przyspiesza drogę do złego scenariusza niż do dobrego.

**Summary:** Punktem wyjścia jest kontrast dwóch scenariuszy. W dobrym junior rośnie, zostaje seniorem i z czasem sam wypełnia lukę po odchodzących seniorach. W złym junior zostaje wrzucony w głęboką wodę, nadużywa AI w sposób, którego sam nie rozumie, nikt nie sprawdza jego pracy, a produkt z czasem sypie się pod naporem długu technicznego, którego nikt nie widział na czas. Autor twierdzi, że różnica między tymi scenariuszami nie bierze się z talentu juniora, tylko z tego, czy istnieje wystarczająco ciasna pętla feedbacku.

Ta pętla ma dwie funkcje naraz: utrzymuje jakość pracy na bieżąco i jednocześnie uczy juniora, dlaczego dana decyzja była dobra albo zła. Autor rozbija ją na dwa elementy. Pierwszy to inwestycja w porządny harness, czyli guardraile, reguły i bramki jakości zakodowane tak, żeby działały automatycznie, niezależnie od tego, czy kod piszę senior, junior czy sama AI. Drugi element to parowanie juniorów z seniorami, tak żeby młodsi mogli eksperymentować i działać szybko, ale senior pozostawał wystarczająco blisko, by dostarczać osąd i myślenie systemowe tam, gdzie sama automatyzacja reguł nie wystarczy.

Autor nie owija w bawełnę: AI w pewnym sensie utrudnia ścieżkę juniora, bo wymaga osądu dużo wcześniej w karierze niż kiedyś, kiedy dojrzewało się do trudnych decyzji latami prostszej, powtarzalnej pracy. To właśnie dlatego mrożenie zatrudniania juniorów uznaje za kruchy zakład: optymalizuje się bieżący output kosztem głodzenia rury, która za kilka lat miała dostarczyć kolejnych seniorów.

**Key takeaways:**
- Rozwój juniora do seniora nie dzieje się automatycznie, wymaga świadomie zaprojektowanej, ciasnej pętli feedbacku
- Ta pętla składa się z dwóch elementów: zautomatyzowanego harnessu z regułami i bramkami jakości oraz bliskiego parowania z seniorem dostarczającym osąd
- AI podnosi próg wymaganego osądu wcześniej w karierze juniora, więc mrożenie zatrudniania juniorów dziś oznacza brak seniorów za kilka lat

**Why do I care:** To bezpośredni argument przeciwko modnemu dziś podejściu "zatrudniajmy samych seniorów, bo AI robi robotę juniora". Jeśli twój zespół faktycznie przestał zatrudniać i mentorować juniorów, warto policzyć, kto za trzy, cztery lata przejmie odpowiedzialność architektoniczną po obecnych seniorach, bo AI nie zbuduje tego osądu za nikogo, a sama pętla feedbacku, harness plus bliskie parowanie, kosztuje dużo mniej niż odbudowanie utraconej ścieżki awansu.

**Link:** [Growing juniors, native AI products, and weekly readings!](https://refactoring.fm/p/growing-juniors-native-ai-products)

## Trzy ery programowania wspieranego przez AI, i dlaczego wciąż tkwimy w środkowej

**TLDR:** W rozmowie z Charliem Guo, inżynierem developer experience w OpenAI, autor opisuje trzy fazy narzędzi AI dla programistów: dopełnianie fragmentów kodu, edytory natywnie zintegrowane z modelem jak Cursor, oraz nadchodzącą trzecią fazę samodzielnych aplikacji orkiestrujących agentów, wykraczających poza edytor tekstu. Zdaniem Guo większość dzisiejszych produktów wciąż tkwi w niewygodnym środku tej transformacji.

**Summary:** Pierwsza era to modele dopełniające fragmenty kodu, które przerodziły się w narzędzia takie jak GitHub Copilot. Druga era to natywne edytory z AI wbudowaną w samo IDE, jak Cursor, gdzie model siedzi wewnątrz środowiska pracy, a nie obok niego. Trzecia era, dopiero się wyłaniająca, to samodzielne aplikacje orkiestrujące agentów, które wychodzą poza koncepcję edytora tekstu jako centrum pracy.

Guo porównuje obecny moment do wczesnych lat smartfonów: firmy brały strony desktopowe i wciskały je w pionowy układ telefonu, zamiast projektować coś natywnego dla nowego medium, a dopiero prawie dekadę później powstały produkty, które w ogóle nie mogłyby istnieć na desktopie, jak Uber czy DoorDash. Jego zdaniem większość dzisiejszych produktów AI robi dokładnie to samo: bierze istniejący produkt i doczepia czat z boku ekranu, zamiast projektować doświadczenie natywnie zbudowane wokół agenta. Sam pasek boczny z czatem nie jest z założenia zły, ale jest łatwym prowizorycznym rozwiązaniem, a nie docelowym kształtem tej kategorii produktów.

**Key takeaways:**
- Trzy ery narzędzi AI dla programistów to dopełnianie kodu, natywne edytory z wbudowanym modelem oraz nadchodzące samodzielne aplikacje orkiestrujące agentów
- Większość dzisiejszych produktów AI to prowizoryczny czat doczepiony z boku istniejącego interfejsu, analogicznie do wczesnych, po prostu przeskalowanych na pion stron desktopowych na smartfonach
- Prawdziwie natywne doświadczenia agentowe, porównywalne z Uberem czy DoorDashem dla smartfonów, dopiero powstają

**Why do I care:** Warto ten model trzech er trzymać w głowie przy każdej decyzji o tym, jak wpleść AI w produkt, nad którym pracujesz. Pasek boczny z czatem to często najszybszy sposób na pokazanie czegoś na demo, ale jeśli architektura produktu zakłada, że to tam skończy jego ewolucja, ryzykujesz, że konkurent zaprojektuje doświadczenie natywnie wokół agenta i zostawi twój retrofit daleko w tyle, dokładnie tak jak stało się z firmami, które zbyt długo trzymały się responsywnych wersji stron desktopowych zamiast aplikacji mobilnych.

**Link:** [Growing juniors, native AI products, and weekly readings!](https://refactoring.fm/p/growing-juniors-native-ai-products)
