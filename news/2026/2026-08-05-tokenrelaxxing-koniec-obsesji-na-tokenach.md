---
title: "Tokenrelaxxing: koniec obsesji na tokenach w kodowaniu z AI"
excerpt: "Kilo opisuje nowy trend w pracy z modelami: tokenrelaxxing. Zamiast ręcznie liczyć tokeny, oddajemy wybór modelu automatycznemu routingowi i wracamy do pisania kodu."
publishedAt: "2026-08-05"
slug: "tokenrelaxxing-koniec-obsesji-na-tokenach"
hashtags: "#kilo #ai #agents #devtools #llm #productivity #generated #pl"
source_pattern: "Kilo"
---

## Tokenrelaxxing: koniec obsesji na tokenach w kodowaniu z AI

**TLDR:** Kilo opisuje nowy etap w pracy z modelami językowymi, który nazywa tokenrelaxxingiem. Po fazie tokenmaxxingu, czyli wpychania do promptu wszystkiego co się da, i tokenminimizingu, czyli obsesyjnego przycinania każdego znaku, programiści zaczynają po prostu oddawać wybór modelu automatycznemu routingowi i wracać do pisania kodu.

**Summary:** Na konferencji Stanford AI Summit Chief People Officer OpenAI zadał publiczności dwa pytania. Ile osób czuje, że AI zwiększyło ich produktywność? Prawie każda ręka w sali. Ile osób pracuje przez to mniej? Kilka rąk. Ten kontrast dobrze streszcza moment, w którym jesteśmy: firmy z każdego sektora, od fintechu po ochronę zdrowia, realnie odnotowują zwrot z inwestycji w AI, ale koszt psychiczny ciągłego nadzorowania tego procesu rośnie równie szybko jak korzyści.

Do niedawna byliśmy zawieszeni między dwiema skrajnościami. Z jednej strony tokenmaxxing, czyli wpychanie do kontekstu każdego możliwego fragmentu historii, wyniku RAG-a i dokumentacji, żeby model niczego nie przegapił. Z drugiej strony tokenminimizing, czyli wycinanie każdej samogłoski z promptu i obsesyjne liczenie ułamków centa. Obie postawy pochłaniają czas, który miał być zaoszczędzony przez samo użycie AI. Tokenrelaxxing to reakcja na tę absurdalność: skoro modele stają się jednocześnie tańsze i mocniejsze, ręczne mikrozarządzanie tokenami przestaje mieć sens ekonomiczny.

Mechanizm, który to umożliwia, nazywa się w Kilo Auto Model. Zamiast ręcznie wybierać endpoint i model do każdego zadania, system klasyfikuje intencję sesji w czasie rzeczywistym i kieruje zapytanie tam, gdzie stosunek jakości do kosztu i szybkości jest najlepszy. Artykuł podaje konkretne liczby: w porównaniu do wcześniejszego podejścia opisanego w poprzednim wpisie Kilo o tokenmaxxingu, sama zmiana strategii routingu modeli daje dodatkowe 40 do 50 procent oszczędności. To nie jest efekt magii, to efekt tego, że rynek modeli zmienił się drastycznie w ciągu paru tygodni. Kimi K3, Grok 4.5 i najnowsza generacja Qwen redefiniują relację ceny do wydajności, a autorzy testowali je pod kątem konkretnego zadania, budowy tej samej bazy danych, którą Claude Opus 5 wykonał za 25-krotnie wyższą cenę.

Ciekawym elementem jest podział na warstwy routingu: Auto Efficient, który według danych Kilo dostarcza 71 procent wydajności modeli frontierowych za 72 procent niższą cenę, Frontier dla zadań wymagających maksymalnych możliwości, Balanced jako rozsądny środek na codzień, oraz Free, kierujący do dostępnych darmowych modeli. To nie jest jeden model do wszystkiego, to system decyzyjny, który sam ocenia, kiedy warto zapłacić więcej, a kiedy nie ma to żadnego sensu. Artykuł kończy się dość mocną tezą: czas poświęcony na przycinanie pięćdziesięciu tokenów w prompcie to czas odebrany budowaniu funkcji, na które czekają użytkownicy. Trudno się z tym nie zgodzić, choć warto pamiętać, że to też narracja sprzedażowa producenta takiego routingu.

**Key takeaways:**
- Tokenrelaxxing to odejście od dwóch skrajności, tokenmaxxingu i tokenminimizingu, w stronę oddania wyboru modelu automatycznemu routingowi.
- Auto Model w Kilo klasyfikuje intencję sesji i wybiera model według formuły jakość razy szybkość razy koszt.
- Nowe modele, takie jak Kimi K3 czy Grok 4.5, potrafią wykonać to samo zadanie za ułamek ceny modeli frontierowych, co zmienia kalkulację kosztów w projektach.
- Warstwa Auto Efficient ma dawać około 71 procent wydajności modeli frontierowych przy około 72 procent niższym koszcie.
- Zmiana strategii routingu, a nie tylko przycinanie promptów, dała w tym przypadku dodatkowe 40 do 50 procent oszczędności.

**Why do I care:** Jako ktoś, kto od lat patrzy na koszty infrastruktury z perspektywy architektury frontendu, dobrze rozumiem pokusę ręcznego tuningu każdego zapytania, bo dokładnie tak samo optymalizowaliśmy bundle size czy liczbę requestów do API. Problem jest ten sam co wtedy: w pewnym momencie krzywa kosztów robi się płaska, a czas zespołu wart jest więcej niż kolejny procent oszczędności. Automatyczny routing modeli to naturalny krok, podobny do tego, co CDN-y i cache zrobiły z ręcznym zarządzaniem statycznymi assetami, po prostu przestajemy myśleć o czymś, co maszyna robi lepiej i szybciej niż człowiek. Zachowałbym jednak zdrową rezerwę wobec liczb podanych przez samego dostawcę takiego routingu, bo porównania kosztowe między dostawcami modeli zmieniają się z tygodnia na tydzień, a marketing lubi wybierać najkorzystniejsze momenty do publikacji. Mimo to kierunek wydaje mi się słuszny: w architekturze systemów z AI w pętli, ręczne mikrozarządzanie promptami będzie coraz częściej wyglądać tak, jak dziś wygląda ręczne pisanie CSS-a bez żadnego build toola.

**Link:** [The Subtle Art of Tokenrelaxxing](https://blog.kilo.ai/p/the-subtle-art-of-tokenrelaxxing)
