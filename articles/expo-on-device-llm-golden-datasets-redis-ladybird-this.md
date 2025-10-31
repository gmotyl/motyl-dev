---
title: "Expo, on‑device LLMs i nowe dylematy architektury frontendowej — przegląd ważnych zmian"
excerpt: "Przegląd: Expo SDK 53 i jego 'peer pressure', on‑device LLM w React Native, krytyka Golden Datasets w testowaniu promptów, powrót Redis do open source oraz techniczne śledztwo nad silnikiem Ladybird i zagadkami 'this' w JavaScript."
publishedAt: "2025-05-02"
slug: "expo-on-device-llm-golden-datasets-redis-ladybird-this"
hashtags: "#generated #pl #react #react-native #typescript #ai #llm #expo #nextjs #frontend #architecture #performance #webdev"
---

## Bytes #389 — Expo peer pressure
**TLDR:** Expo SDK 53 włącza New Architecture jako domyślną opcję i wprowadza edge-to-edge na Androidzie oraz nowe API do zadań w tle. Autor przestrzega przed ślepą presją „wszyscy tak robią”, ale docenia, że Expo ułatwia migrację do nowoczesnych rozwiązań.

**Summary:**
To krótki, lekki przegląd zmian i nastrojów: Expo 53 włącza New Architecture domyślnie (74.6% projektów SDK 52 już go używało na EAS Build) i robi to w sposób, który przypomina społeczny nacisk — „jeśli większość robi, robię i ja”. Autor dystansuje się do paranoi, ale też radzi, żeby nie aktualizować jedynie z powodu FOMO. Zauważa, że New Architecture otwiera drogę do funkcji takich jak Suspense w React Native i poprawia wydajność, ale jednocześnie wymaga sprawdzenia zgodności bibliotek z nowym modułem rozwiązywania pakietów (package.json:exports).

Wspomniane zmiany Androidowe (edge-to-edge) to odpowiedź na politykę Google w Android 16: Expo przygotowuje deweloperów, by ich UI naturalnie płynęło pod systemowe paski. Z technicznych nowości jest też expo-background-task, które zastępuje przestarzałe background-fetch i używa WorkManager/BGTaskScheduler, co ma lepsze zarządzanie baterią.

Autor jest krytyczny wobec społecznej presji, ale nie zapomina pochwalić wysiłku Expo w ułatwianiu migracji i oferowaniu opcji opt‑out. To zgrabne przypomnienie, że decyzja o migracji powinna być racjonalna, nie rytuałem.

Co autor pomija / czego unika: rzadko rozważa przypadki skomplikowanych monorepów lub bibliotek natywnych, które nigdy nie zostały przetestowane pod New Architecture — czyli rzeczywiste koszty migracji dla dużych zespołów. Brakuje też głębszej dyskusji o narzędziach do automatycznej weryfikacji kompatybilności pakietów ESM/CJS po włączeniu exports.

Dla architektów i zespołów: przygotujcie listę najważniejszych natywnych zależności, zróbcie testy E2E i plan opt‑out na czas migracji. Nowa architektura przynosi korzyści, ale migracja bez planu to ryzyko produkcyjne.

**Key takeaways:**
- Expo 53 domyślnie włącza New Architecture; opt‑out jest możliwy.
- Edge-to-edge staje się priorytetem na Androidzie z powodu zmian w Android 16.
- expo-background-task zastępuje przestarzałe rozwiązania dla zadań w tle.

**Tradeoffs:**
- Włączenie New Architecture means lepsza wydajność i dostęp do nowych funkcji but sacrifice możliwość natychmiastowego użycia niekompatybilnych bibliotek.

**Link:** [Bytes #389](https://bytes.dev/archives/389)

---

## Expo SDK 53 — oficjalny changelog
**TLDR:** SDK 53 formalizuje New Architecture jako domyślną, ujednolica edge-to-edge dla Androida oraz wprowadza expo-background-task. Dokumentacja podpowiada jak opt‑outować i gdzie zgłaszać problemy.

**Summary:**
Changelog to bardziej praktyczny niż narracyjny dokument: wyjaśnia, że New Architecture jest teraz domyślna w projektach Expo Go i nowych projektach, a istniejącym projektom daje ścieżki opt‑in/opt‑out. Ważne: Metro teraz domyślnie uwzględnia package.json:exports, co zbliża RN do współczesnych standardów ESM, ale jednocześnie ujawnia potencjalne problemy z dual package hazard, kiedy biblioteki dystrybuują ESM i CommonJS.

Edge-to-edge na Androidzie jest wprowadzane stopniowo: Expo przygotowuje się do tego, że Android 16 nie pozwoli na opt‑out. To dobra decyzja z punktu widzenia UI consistency, ale wymusza aktualizacje layoutów i uwagę przy bezpiecznych obszarach (insets).

expo-background-task używa nowoczesnych API (WorkManager, BGTaskScheduler) i projektuje zadania tła jako deferrable — co jest lepsze dla baterii niż stare mechanizmy. Dokumentacja pokazuje przykładowy flow aktualizacji aplikacji w tle, co ma praktyczne zastosowanie przy automatycznych aktualizacjach i synchronizacji.

Co brakuje: szczegółowej listy niekompatybilności z popularnymi bibliotekami oraz narzędzi do masowej automatycznej weryfikacji paczek w monorepo. Changelog wspomina opt‑out i zachęca do zgłaszania problemów, ale nie przedstawia strategii dla dużych organizacji, które nie mogą iterować tak szybko.

Dla architektów: traktujcie SDK upgrade jako projekt migracyjny — wypiszcie zależności natywne, testy regresji UI pod edge-to-edge, plan rollbacku i harmonogram komunikacji z biznesem.

**Key takeaways:**
- New Architecture domyślnie, ale z opt‑outem dla płynnej migracji.
- Metro włącza package.json:exports — sprawdźcie dual package hazards.
- Expo zastępuje background-fetch nową, energooszczędną biblioteką.

**Tradeoffs:**
- Edge-to-edge improves UX consistency but sacrifice the need to rework UI safe-area handling across devices.

**Link:** [Expo SDK 53 changelog](https://expo.dev/changelog/sdk-53)

---

## AI prompt evaluations beyond golden datasets — QA Wolf (webinar)
**TLDR:** Golden Datasets są zbyt "czyste" dla generatywnych projektów AI; QA Wolf proponuje losowe próbkowanie i testy na danych produkcyjnych, aby uchwycić rzeczywistą zmienność i zapobiegać overfittingowi promptów.

**Summary:**
Webinar tłumaczy podstawowe rozróżnienie: prompt składa się z zmiennych (input) i zadania (task). W praktyce drobne modyfikacje promptu potrafią znacząco zmienić wynik, a LLM-y są z natury probabilistyczne, więc testowanie jest konieczne. Golden Datasets — starannie oczyszczone i oznakowane — były wygodne do porównywania modeli, ale nie oddają "brudu" produkcyjnych danych. To prowadzi do overfittingu i dryfu oraz do fałszywego poczucia bezpieczeństwa.

Proponowane podejście to random sampling z produkcji: losowe wyciąganie i testowanie promptów na danych rzeczywistych, wykorzystanie narzędzi automatyzujących regresję i obciążenie promptów (np. Helicone do monitoringu). To proces bliższy realnym scenariuszom użycia, lepiej ujawnia edge cases i pozwala reagować na drift modelu.

Autorzy mówią też o konieczności ciągłej ewaluacji promptów i systemów oceny, bo AI zmienia się dynamicznie: statyczny benchmark szybko traci wartość. Pokazano praktyki: testy A/B promptów, losowe próbkowanie produkcyjnych inputów, automatyczne metryki jakości i kosztu.

Czego autorzy unikają: trudność etycznego i prywatnościowego dostępu do produkcyjnych danych do losowego próbkowania nie jest omawiana głęboko. Również skala i koszt częstego testowania na produkcji oraz ryzyko wycieku danych przez logowanie promptów wymaga solidnych procedur, które webinar traktuje pobieżnie.

Dla zespołów i architektów: uwzględnijcie testy promptów w CI/CD, ale zaplanujcie politykę anonimizacji i sampling na poziomie danych. Automatyczne regresje promptów powinny być mierzalne — niech metryki łączą UX, koszt i bezpieczeństwo.

**Key takeaways:**
- Golden Datasets łatwo prowadzą do overfittingu w generatywnych systemach.
- Random sampling produkcyjnych danych ujawnia realne błędy i drift.
- Testowanie promptów musi być stałym procesem, z automatyzacją i metrykami.

**Tradeoffs:**
- Random sampling increases real-world robustness but sacrifice the simplicity and reproducibility of controlled benchmarks.

**Link:** [QA Wolf — AI prompt evaluations beyond golden datasets](https://www.qawolf.com/webinars/ai-prompt-evaluations-beyond-golden-datasets)

---

## callstackincubator/ai — on‑device LLM execution in React Native
**TLDR:** Biblioteka udostępnia primitives do uruchamiania modeli AI na urządzeniu w React Native, kompatybilna z Vercel AI SDK i wspierająca Apple on‑device oraz eksperymentalnie MLC dla on‑device LLM.

**Summary:**
Repozytorium koncentruje się na dwóch podejściach: integracji z natywnymi, systemowymi modelami (Apple Intelligence) oraz uruchamianiu open‑source LLM lokalnie za pomocą MLC. Zyski z on‑device to prywatność, niskie opóźnienia i brak kosztów serwerowych. Autorzy zapewniają API spójne z Vercel AI SDK, co ułatwia migrację istniejących implementacji.

Dla Apple: dostępne są generacja tekstu, embeddings, transkrypcja i synteza mowy korzystające z Foundation Models i NLContextualEmbedding. Dla MLC: listowane są modele (Llama-3.2-3B, Mistral‑7B, itp.), ale wymagania pamięciowe i konieczność pobrania modeli czynią to podejście ograniczonym do mocniejszych urządzeń. Instalacja jest prosta przez npm i autolinking na iOS, lecz MLC wymaga dodatkowych ustawień Xcode.

Autorzy podkreślają ograniczenia: dostępność funkcji zależna od wersji iOS i zasobów urządzenia, a dowolne większe modele (7B+) znacząco obciążają pamięć i energię. MLC jest eksperymentalne i wymaga ostrożności.

Czego repo nie analizuje wystarczająco: koszt dystrybucji modeli (aplikacja z dużymi binariami), politykę aktualizacji modeli, bezpieczeństwo modeli pobieranych dynamicznie oraz konsekwencje prywatnościowe związane z lokalnym przechowywaniem danych treningowych czy cache. Brakuje też przewodnika o fallbackach — jak aplikacja powinna degradawać UX, gdy on‑device model jest niedostępny.

Dla architektów i zespołów: on‑device AI to ważny trend, ale wymaga strategii hybrydowej — lokalne modele tam, gdzie prywatność i szybkość są krytyczne, i serwerowe modele tam, gdzie skala i aktualność są ważniejsze. Zaplanujcie rozmiary binariów, mechanizmy pobierania modeli oraz politykę aktualizacji.

**Key takeaways:**
- On‑device AI w React Native daje prywatność i niskie opóźnienia.
- Apple zapewnia stabilne API on‑device; MLC pozwala na LLM‑y, ale jest eksperymentalne i zasobożerne.
- Kompatybilność z Vercel AI SDK ułatwia adopcję.

**Tradeoffs:**
- On‑device models improve latency and privacy but sacrifice binary size and device battery/memory.

**Link:** [callstackincubator/ai on GitHub](https://github.com/callstackincubator/ai)

---

## Redis is open source again — antirez
**TLDR:** antirez ogłasza, że Redis ponownie przechodzi na AGPLv3, autor jest zadowolony z powrotu do otwartości i zapowiada dalsze prace nad funkcją Vector Sets oraz innymi ulepszeniami w Redis 8.

**Summary:**
To osobisty wpis Silvio „antirez” Salvaniego o powrocie Redis do bardziej akceptowanej przez społeczność licencji AGPL. Autor opisuje wewnętrzną debatę licencyjną (SSPL vs AGPL), własne starania i motywacje, a także radość z możliwości publikowania nowych funkcji jako open source. Z technicznych akcentów wspomina Vector Sets — nowy typ danych — oraz wydanie Redis 8 z ulepszeniami wydajności.

Z punktu widzenia architektury, powrót do AGPL to sygnał dla społeczności i klientów: projekt chce ponownie angażować społeczność oraz ułatwić współpracę i przyjmowanie wkładu. Dla zespołów używających Redis oznacza to mniejsze ryzyko prawne związane z nieklasycznymi licencjami i lepszą zgodność z ekosystemem open source.

Co autor może przemilczeć: przejście na AGPL stawia też pytania biznesowe — jak będzie wyglądać model komercyjny firmy wokół projektu? AGPL jest restrykcyjna i może zniechęcać niektóre zastosowania komercyjne bez odpowiednich umów. Autor mówi o wartości wspólnoty, ale unika dogłębnej dyskusji o wpływie licencji na firmy hostujące usługi zarządzane oraz na ecosystem dostawców chmurowych.

Dla architektów: decyzja licencyjna może wymagać rewizji polityk użycia oprogramowania w firmie. Skontrolujcie zgodność z licencją AGPL w kontekście ofert SaaS/managed i planów dystrybucji.

**Key takeaways:**
- Redis przeszedł na AGPLv3 — sygnał powrotu do otwartości.
- Redis 8 GA zawiera nowe funkcje, w tym Vector Sets i optymalizacje.
- Licencja wpływa nie tylko na społeczność, ale i na zastosowania komercyjne.

**Tradeoffs:**
- Powrót do AGPL fosters community contribution but sacrifice potential commercial friendliness for some SaaS providers.

**Link:** [Redis — antirez post](https://antirez.com/news/151)

---

## Pwning the Ladybird browser — analiza fuzzingu LibJS
**TLDR:** Autorka użyła Fuzzilli do testowania LibJS (silnik JS Ladybird) i odkryła kilka poważnych błędów, w tym użycie po zwolnieniu i inne awarie; opisuje proces, trudności i ograniczenia eksploatacji niektórych błędów.

**Summary:**
To techniczne studium przypadku: Ladybird (pochodzący z SerenityOS) ma silnik LibJS z interpreterem, bez warstwy kompilacji. Autorka uruchomiła Fuzzilli, napotkała problemy budowania środowiska, skonfigurowała fuzzing i po 10 dniach znalazła 10 unikatowych crashów — od weryfikacji i OOM po bardziej krytyczne: heap buffer overflow, freelist corruption i UAF. Tylko UAF w malloc heap był możliwy do reprodukcji poza Fuzzilli.

Szczegółowo opisano ścieżkę do bugu: UAF w buforze argumentów wywołania wynikający z użycia proxied function jako konstruktora z złośliwym handlerem [[Get]]. Autorka krok po kroku przechodzi przez architekturę LibJS, fuzzing, raporty i ograniczenia związane z weryfikacją bugów.

Co jest cenne to praktyczne spojrzenie na proces: fuzzing znajdzie problemy, ale od błędu do exploitu jest długa droga; wiele błędów nie reprodukowało się poza generatorem testów. To przypomnienie, że inżynieria bezpieczeństwa to iteracja narzędzi i determinacji.

Czego autorka unika: nie ma szerokiej dyskusji o procesach CI/CD bezpieczeństwa dla projektów przeglądarkowych ani o strategicznych decyzjach dotyczących włączenia LibJS do mainstreamu. Brakuje też analizy wpływu takich błędów na ekosystem (extensiony, sandboxing, policy).

Dla architektów i zespołów: fuzzing to konieczność dla silników JS i innych krytycznych komponentów. Zaplanujcie regularne fuzzowanie, reproducibility pipelines i bug‑bounty / disclosure paths. Przy projektowaniu interpreterów warto inwestować w obfite testy korpusowe i invariants checking.

**Key takeaways:**
- Fuzzilli skutecznie wykrył krytyczne błędy w LibJS, w tym UAF.
- Reprodukcja i eksploatacja błędów to często najtrudniejsza część pracy.
- Regularne fuzzowanie i mechanizmy weryfikacji są kluczowe dla bezpieczeństwa silników.

**Tradeoffs:**
- Intensywne fuzzing testing increases defect discovery but sacrifice immediate developer productivity due to noisy false positives and engineering overhead.

**Link:** [Pwning the Ladybird browser](https://jessieu.cafe/posts/pwning-ladybirds-libjs/)

---

## JavaScript, when is this? — długie rozważania o wartościach this
**TLDR:** Artykuł tłumaczy, że klucz do zrozumienia this leży w „kiedy” — wartość this zależy od momentu wywołania funkcji, a nie od miejsca deklaracji; autor rozbija koncepcję na wykonawcze konteksty i stos wywołań.

**Summary:**
To przystępne, refleksyjne wyjaśnienie jednego z najbardziej frustrujących konceptów JS. Autor zaczyna od osobistych doświadczeń, potem przechodzi do esencji: this odnosi się do obiektu powiązanego z funkcją i jest ustalane w momencie wywołania. Artykuł tłumaczy model wykonania JS, stos wywołań i dlaczego „kiedy” jest ważniejsze niż „gdzie”. Przybliża przypadki, które mylą deweloperów — metody obiektowe, call/apply, bind, oraz funkcje strzałkowe, które leksykalnie wiążą this.

Tekst jest praktyczny: pomaga zmienić mentalny model z „piszę funkcję” na „myślę o tym, jak funkcyjnie zostanie wywołana”. To poprawia diagnozowanie bugów i projektowanie API.

Czego brakuje: choć artykuł rozkłada mechanikę na elementy, brak tu bardziej zaawansowanych przykładów z asynchronicznym kodem, proxy czy metaprogramowaniem, gdzie this zachowuje się jeszcze bardziej zaskakująco. Również nie ma dyskusji o wpływie TypeScript (np. this-typing) na bezpieczeństwo typów i dokumentowanie kontraktów wywołań.

Dla zespołów: stosujcie jasne konwencje — unikajcie używania this w funkcjach helpers poza metodami obiektowymi, preferujcie eksplicytne parametry lub closures, a w TypeScript definiujcie typy this tam, gdzie to pomaga.

**Key takeaways:**
- this jest ustalane w momencie wywołania — to „kiedy” decyduje.
- Przyjmij inny mentalny model: projektuj funkcje pod kątem ich wywołań.
- TypeScript może pomóc, ale nie zastąpi zrozumienia wykonawczego kontekstu.

**Tradeoffs:**
- Using lexical arrow functions simplifies binding but sacrifice flexibility when dynamic this binding is required.

**Link:** [JavaScript, when is this?](https://piccalil.li/blog/javascript-when-is-this/)



---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by gpt-5-mini LLM. While we strive for accuracy, please verify critical information independently.
