---
title: "Skill engineering i argument przeciwko projektowaniu AI w jednym strzale"
excerpt: "Paul Bakaus z Impeccable tłumaczy, dlaczego agenty AI potrzebują precyzyjnego języka projektowego, a nie pełnej automatyzacji."
publishedAt: "2026-07-03"
slug: "skill-engineering-projektowanie-ai-impeccable-bakaus"
hashtags: "#AINews #ai #design #frontend #agentAI #skillEngineering #generated #pl"
source_pattern: "AINews"
---

## Skill engineering i argument przeciwko projektowaniu AI w jednym strzale

**TLDR:** Paul Bakaus, twórca open-source'owego systemu Impeccable, argumentuje, że agenty AI potrzebują precyzyjnie zdefiniowanego języka domenowego, a nie ogólnych poleceń. Zamiast prosić agenta o "przeprojektowanie strony", można powiedzieć mu, żeby zrobił sekcję "bardziej wyrazistą" lub "spokojniejszą" i wiedzieć, że agent rozumie, co to oznacza w praktyce.

**Summary:**

Paul Bakaus wystąpił na AI Engineer World's Fair z tezą, która wydaje mi się jedną z rozsądniejszych rzeczy wypowiedzianych publicznie o agentach AI w ostatnim czasie: zanim agent zrobi cokolwiek użytecznego, ktoś musi mu dać słownik. Nie instrukcję. Słownik.

Impeccable to system umiejętności projektowych dla agentów kodujących. Bakaus zaczął od stosunkowo prostego rozszerzenia umiejętności projektowania frontendu od Anthropic, ale projekt rozrósł się w wielokomponentowy system z własnymi workflow'ami. Zamiast kazać agentowi "przeprojektować całą stronę", użytkownik może poprosić o to, żeby dana sekcja była "bolder", "quieter", "denser" albo bardziej dopracowana. Za tymi pozornie prostymi poleceniami stoi precyzyjnie zdefiniowana semantyka.

I tu Bakaus dotyka czegoś ważnego. Niewyposażony w dodatkowy kontekst model, któremu każe się zrobić stronę "bardziej wyrazistą", sięga po gradienty, neony i szklane powierzchnie. Impeccable tłumaczy "boldness" przez hierarchię, skalę i zdecydowaną typografię, czyli zmiany, które przyciągają uwagę bez rozbijania istniejącego systemu projektowego. Jak Bakaus ujął to wprost: "przymiotnik bez niczego za nim to tylko ładny apostrof."

To obserwacja, którą łatwo przeoczyć, jeśli patrzy się na AI głównie przez pryzmat modeli i benchmarków. Bakaus zauważył, że między pracą designera i inżyniera korzystających z tego samego modelu istnieje przepaść, która nie wynika z jakości modelu, lecz z tego, że designer po prostu wie, jak wyartykułować, czego chce. Impeccable próbuje skompresować ten język specjalistyczny do postaci, którą może użyć ktoś bez designerskiego tła.

Bakaus mówi też o czymś, co nazywa "skill engineering" jako osobną dyscypliną. Budowanie umiejętności dla agentów wymaga uwzględnienia różnic między harnesami, bo Codex i Claude nie obsługują subagentów i uprawnień tak samo. Umiejętność zaprojektowana do pracy w Claude Code, Cursorze, GitHub Copilot i Codex nie może zakładać, że wszystkie środowiska oferują te same możliwości. Do tego Bakaus eksperymentuje z routingiem wewnątrz umiejętności, czyli czymś w rodzaju mixture-of-experts, gdzie system kieruje zadanie do odpowiednich instrukcji, oszczędzając tokeny i poprawiając skuteczność.

Warto też odnotować, że Impeccable ma tryb live, który łączy wizualne zaznaczanie elementów z agentem kodującym. Użytkownik może zaznaczyć sekcję w środowisku deweloperskim i poprosić o kilka wariantów layoutu, bez eksportowania mockupów z zewnętrznego narzędzia. System działa w obrębie istniejącego kodu i design systemu projektu.

Bakaus ma wyraźne zdanie na temat kierunku, w którym zmierza branża. Widzi dwa obozy: tych, którzy chcą zachować tradycyjny workflow z Figmą w centrum, i tych po drugiej stronie, którzy promują "loopmaxxing", czyli maksymalne ograniczenie udziału człowieka w pracy agenta. Jego odpowiedź: prawda leży gdzieś pośrodku. AI ma dostarczać pierwsze 80% szybko, czyli kompetentny layout i podstawową implementację. Człowiek wchodzi do gry przy ostatnich 20%, gdzie liczy się smak, kontekst i punkt widzenia.

Użytkownicy regularnie proszą go o dodanie trybu automatycznego, gdzie system sam dobiera polecenia. Odmawia. "There is no auto, and there will be no auto." Jego stosunek do retoryki software factory i wizji usuwania ludzi z procesu inżynieryjnego jest jednoznaczny: jest temu przeciwny.

Ciekawa jest też obserwacja dotycząca odbiorców Impeccable. Bakaus spodziewał się, że narzędzie przyciągnie głównie inżynierów, a designerzy będą się go wystrzegać. Tymczasem designerzy stanowią dziś co najmniej połowę użytkowników, bo Impeccable komunikuje się ich językiem i służy im jako pomost do kodu, zamiast zmuszać ich do bezpośredniego wejścia w implementację bez żadnego wsparcia.

Bakaus dostrzega też szerszy trend: granice między designem, inżynierią i product managementem zacierają się. Inżynierowie, którzy głównie tłumaczą projekty z Figmy na kod, mają przed sobą rosnącą presję automatyzacji. Designerzy, których praca ogranicza się do poprawiania estetyki gotowego interfejsu, stoją przed podobnym wyzwaniem. Jego prognoza: designerzy muszą przesunąć się o warstwę wyżej, myśleć bardziej o "co", a rola product managera i designera będzie się zbliżać.

**Key takeaways:**
- Agenty AI potrzebują precyzyjnie zdefiniowanego słownika domenowego, a nie ogólnych poleceń, by produkować użyteczne rezultaty projektowe
- "Skill engineering" to wyłaniająca się dyscyplina, która wymaga uwzględnienia różnic między środowiskami uruchomieniowymi agentów
- Impeccable tłumaczy terminy designerskie takie jak "bolder" czy "quieter" na konkretne operacje projektowe, zamiast pozostawiać ich interpretację modelowi
- Model AI z dostępem do tej samej wiedzy produkuje lepsze wyniki w rękach designera, bo designer wie, jak precyzyjnie opisać cel
- Optymalny podział pracy: AI dostarcza pierwsze 80%, człowiek odpowiada za końcowe 20% z uwagi na smak i kontekst
- Granice między rolą designera, inżyniera i PM-a zacierają się, inżynierowie "tłumacze z Figmy" i designerzy "poprawiacze estetyki" są najbardziej narażeni na automatyzację
- Designerzy szybciej niż oczekiwano zaakceptowali narzędzia działające w kodzie, traktując je jako pomost, a nie zagrożenie

**Why do I care:**

Z perspektywy senior frontend developera argument Bakause'a o "skill engineering" jest praktycznie użyteczny, ale też otwiera kilka pytań, których nie można zignorować. Zgadzam się, że agent bez kontekstu domenowego produkuje generyczne śmieci, i widzę to na co dzień przy pracy z narzędziami opartymi na AI. Natomiast warto zauważyć, że budowanie precyzyjnych systemów umiejętności to inwestycja, która wymaga czasu i wiedzy eksperckiej, a więc przenosi ciężar pracy z "promptowania" na "inżynierię umiejętności". To nie jest uproszczenie, to zmiana charakteru pracy. Interesuje mnie praktycznie, czy Impeccable sprawdza się w projektach z dojrzałymi design systemami, czy poza Anthropic's frontend skill ma szersze zastosowanie. Obserwacja o zacieraniu granic między rolami jest trafna i już widoczna w zespołach, w których pracowałem. Frontend developer, który rozumie design, i designer, który rozumie kod, mają dziś wyraźną przewagę. To nie jest nowe, ale AI przyspiesza ten trend w sposób, który część osób odbierze jako zagrożenie.

**Link:** [Skill engineering and the case against one-shot AI design](https://www.latent.space/p/skill-engineering-design?publication_id=1084089&post_id=204688240&isFreemail=true&triedRedirect=true)
