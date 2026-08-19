---
title: "Dlaczego LLM nie potrafią wykonać skoku myślowego, wielkie zapominanie i AI w fabryce chipów"
excerpt: "HackerNoon: pozycyjny paper DeepMind o granicach abdukcji w LLM, osobisty esej o cichej erozji ludzkich kompetencji poznawczych, i historia o tym, jak AI zaczyna inspekcjonować fabryki, które produkują chipy pod nią samą."
publishedAt: "2026-08-19"
slug: "llm-nie-skacza-wielkie-zapominanie-ai-w-fabryce-chipow"
hashtags: "#HackerNoon #ai #llm #ml #generated #pl"
source_pattern: "HackerNoon"
---

## LLM nie potrafią wykonać skoku myślowego i nie powinny musieć

**TLDR:** Pozycyjny paper badacza DeepMind Toma Zahavy'ego twierdzi, że modele językowe są dobre w indukcji i coraz lepsze w dedukcji, ale słabe w abdukcji, czyli zaproponowaniu zupełnie nowego wyjaśnienia zjawiska, bo nie mają ucieleśnionego doświadczenia fizycznego świata. Autor artykułu zgadza się z diagnozą, ale nie z wnioskiem: to nie znaczy, że LLM są bezużyteczne w nauce, tylko że rola, jaką powinny pełnić, jest inna niż "naukowiec w pudełku".

**Summary:** Argument papera jest precyzyjny. Abdukcja to ruch, w którym ktoś proponuje nieobserwowaną przyczynę, zarazki, dryf kontynentów, zakrzywioną czasoprzestrzeń, a model, który nigdy nie upadł, nie trzymał ciężaru, nie obserwował przyspieszającego obiektu, nie ma ugruntowanej intuicji, z której mógłby czerpać. Manipuluje symbolami opisującymi świat, nigdy w nim nie będąc.

Autor kontruje ten wniosek historią Einsteina, która w standardowej wersji brzmi jak izolowany błysk geniuszu, a w wersji historyków nauki, zwłaszcza Petera Galisona, jest dużo bardziej uziemiona. Od 1902 do 1909 roku Einstein pracował w Szwajcarskim Urzędzie Patentowym w Bernie, oceniając wnioski patentowe na urządzenia elektromechaniczne, w tym stały strumień patentów na synchronizację zegarów na odległość, żywy problem komercyjny epoki kolejowych rozkładów jazdy i sieci telegraficznych. Centralny eksperyment myślowy pracy z 1905 roku dotyczy tego, jak dwa odległe zegary mogą pokazywać ten sam czas. To był, dosłownie, jego etat. Skok był jego, ale materiał, z którego skoczył, był środowiskowy, nie wewnętrzny.

Z tego wynika inne zastosowanie technologii niż "naukowiec zastępujący naukowca". Wąskim gardłem wielu badań nie jest jakość niczyjego rozumowania, tylko to, że odpowiedni artykuł jest w dziedzinie, której nie czytasz, opublikowany jedenaście lat temu, inną terminologią opisujący ten sam mechanizm. Połączenia między dziedzinami nie powstają, bo nikt nie czyta poprzek domen naraz, a to jest dokładnie problem wyszukiwania i syntezy, w którym LLM są faktycznie dobre. Model może przeczytać biologię i materiałoznawstwo naraz, wyłapać sprzeczność między dwiema literaturami, które się nawzajem nie cytują, i postawić to napięcie przed osobą, która wie dość, żeby rozpoznać jego znaczenie.

Podział pracy, który z tego wynika, pasuje do trójdzielnego schematu z samego papera: indukcja należy do modelu, który czyta literaturę w objętości niedostępnej dla jednej osoby i wyławia anomalie oraz sprzeczności; abdukcja należy do człowieka, bo to krok zależny od fizycznej intuicji, gustu i wyczucia, które wyjaśnienia zwykle okazują się prawdziwe; dedukcja znów wraca do modelu, który formalizuje i sprawdza postawioną hipotezę, podobnie jak systemy typu AlphaProof. Autor kończy mocnym zdaniem: skok nigdy nie był wąskim gardłem. Większość naukowców traci swoje najlepsze lata nie na brak pomysłów, tylko na przegląd literatury, ślepe replikacje i mozolne przedzieranie się przez matematykę, i to jest robota faktycznie warta zautomatyzowania.

**Key takeaways:**
- Paper DeepMind twierdzi, że LLM są dobre w indukcji i dedukcji, ale słabe w abdukcji, bo brakuje im ucieleśnionego doświadczenia fizycznego
- Historia Einsteina w Urzędzie Patentowym pokazuje, że nawet ludzki skok myślowy opiera się na środowiskowym materiale, nie tylko na czystej intuicji
- LLM nadają się do wyszukiwania i syntezy między dziedzinami, wyłapując sprzeczności, których nikt jeszcze nie zauważył
- Podział pracy indukcja-model, abdukcja-człowiek, dedukcja-model jest bardziej produktywny niż budowanie modelu "naukowca w pudełku"

**Why do I care:** Ten tekst jest dobrą korektą dla popularnej narracji "AGI odkryje fizykę za nas", bo pokazuje konkretny, techniczny powód, dla którego to nieprawdopodobne w obecnej architekturze modeli, zamiast zbywać temat ogólnym sceptycyzmem. Dla zespołów budujących narzędzia dla badaczy czy R&D to konkretna wskazówka produktowa: buduj narzędzia do agregacji literatury i weryfikacji hipotez, nie próbuj sprzedawać modelu jako zastępstwa dla naukowca stawiającego hipotezy, bo to obiecuje coś, czego architektura po prostu nie dowozi.

**Link:** [LLMs Can't Jump and They Shouldn't Have To](https://hackernoon.com/llms-cant-jump-and-they-shouldnt-have-to)

## Wielkie zapominanie: jak AI po cichu wymazuje ludzkie archiwum

**TLDR:** Osobisty, mocno subiektywny esej twierdzi, że najważniejszą historią technologiczną 2026 roku nie jest to, co potrafi AI, tylko to, co odbiera ludziom, którzy z niej korzystają. Autor opisuje "kognitywny prekariat": ludzi zatrudnionych i produktywnych, ale wydrążonych z kompetencji, których używanie zostało zdelegowane do modeli.

**Summary:** Punktem wyjścia jest pozorny paradoks. GitHub odnotował w 2025 roku miliard commitów, wzrost o 25 procent rok do roku, i 43 miliony pull requestów miesięcznie. Na papierze produktywność nigdy nie była wyższa. Problem w tym, że coraz większa część tych commitów jest pisana, przeglądana i mergowana przez maszyny, a Copilot, piszący w niektórych plikach 35-40 procent kodu, nie uczynił deweloperów o tyle lepszymi, tylko o tyle mniej potrzebnymi do mechanicznego aktu pisania kodu, który nigdy nie był wyłącznie mechaniczny, tylko formą strukturalnego rozumowania.

Najciekawszy fragment dotyczy tego, czego nikt nie mierzy: pracownika wiedzy, który zachowuje pracę, bo AI go "wspomaga", ale po trzech latach delegowania coraz większej części zadań traci zdolność wykonania ich od zera. Prawnik, który używa AI do szkiców umów, ale wciąż je "sprawdza", czy naprawdę zauważyłby subtelny błąd, którego model konsekwentnie nie wychwytuje, bo nie było go w danych treningowych? Autor nazywa to erozją profesjonalnego osądu bez odpowiadającego jej sygnału bezrobocia, bo osoba formalnie pracuje, więc nikt nie mierzy tego, co faktycznie znika.

Techniczna część eseju jest równie mocna. Autor twierdzi, że projektowe metryki produktów AI, jak "czas do wykonania zadania" czy "satysfakcja użytkownika", są idealnie dopasowane do atrofii poznawczej, bo nikt nie mierzy "zapamiętania wiedzy dziedzinowej sześć miesięcy później". Struktura poznawcza nauki wymaga produktywnej trudności, walki o przypomnienie sobie informacji, nawigacji w niejednoznaczności, syntezy sprzecznych źródeł, a systemy AI są zoptymalizowane właśnie pod eliminację tej walki. Im bardziej czytelny jest output modelu, tym mniej mózg jest zmuszony przetwarzać informację samodzielnie.

Autor kończy trzema scenariuszami na 2030 rok z przypisanym prawdopodobieństwem: "zarządzany upadek" (60 procent), gdzie zapominanie trwa dalej, zarządzane, ale nieodwrócone; "wielkie rozliczenie" (25 procent), po katastrofalnej awarii systemu AI-człowiek, gdzie nikt już nie rozumie narzędzia, od którego zależy; i "zamierzony renesans" (15 procent), gdzie koalicja edukatorów i technologów projektuje AI wokół rozwoju człowieka, nie jego zastąpienia, z oceną wpływu poznawczego jako wymogiem przy każdym wdrożeniu.

**Key takeaways:**
- Wzrost produktywności mierzony liczbą commitów maskuje spadek liczby ludzi faktycznie potrzebnych do mechanicznego pisania kodu
- "Kognitywny prekariat" to ludzie formalnie zatrudnieni i produktywni, ale z wydrążonymi kompetencjami, których nikt nie mierzy
- Metryki produktów AI (czas do zadania, satysfakcja) są dopasowane do atrofii poznawczej, nie do zachowania wiedzy
- Autor proponuje trzy scenariusze na 2030 rok: zarządzany upadek, wielkie rozliczenie, zamierzony renesans

**Why do I care:** To eseistyczny, mocno osobisty tekst, nie badanie naukowe, więc cytowane statystyki (73 procent zaufania do treści AI, 300 milionów zastąpionych etatów od Goldman Sachs) warto traktować jako punkt wyjścia do dyskusji, nie twardy dowód. Mimo to pytanie, które autor stawia wprost, "co robisz sam, zanim delegujesz to AI bez zastanowienia", jest praktyczne dla każdego zespołu inżynierskiego wdrażającego agentów kodujących: warto świadomie zostawiać sobie zadania do zrobienia samodzielnie, nie z nostalgii, tylko żeby nie stracić zdolności rozpoznania, kiedy agent się myli.

**Link:** [The Great Forgetting: How AI Is Quietly Erasing the Human Archive—and What Comes After](https://hackernoon.com/the-great-forgetting-how-ai-is-quietly-erasing-the-human-archiveand-what-comes-after)

## Czy AI staje się częścią własnego łańcucha dostaw

**TLDR:** AI pomaga już budować kolejne generacje modeli AI, ale schodzi też niżej w stosie, do maszyn produkujących chipy, na których te modele działają. TSMC i Samsung używają wizji komputerowej i cyfrowych bliźniaków do wykrywania defektów i przewidywania awarii w fabrykach półprzewodników.

**Summary:** TSMC korzysta z platformy Metropolis NVIDII i TAO Toolkit do automatycznej inspekcji defektów, a system poprawia wykrywanie defektów w skali nanometrów wśród setek tysięcy parametrów procesu na tysiącach kroków produkcyjnych. Samsung idzie krok dalej, budując pełne cyfrowe bliźniaki swoich fabryk półprzewodników w NVIDIA Omniverse, żeby identyfikować anomalie i testować zmiany, zanim trafią do prawdziwej fabryki, przesuwając pytanie z "co poszło nie tak" na "co może pójść nie tak dalej".

Najciekawszy fragment artykułu dotyczy tego, że wykrycie defektu to dopiero połowa problemu, bo nie każdy defekt jest równie niebezpieczny. Eksperyment producenta optyki OPTOMAN razem z inspekcyjną firmą DIOPTIC na mikroskopijnych defektach w optyce laserowej dużej mocy pokazał, że największy widoczny defekt wcale nie musi być tym, który powoduje uszkodzenie. Zidentyfikowano trzy miejsca uszkodzeń, jedno związane z relatywnie dużym defektem około 5 mikronów, ale pozostałe dwa wiązały się z mniejszymi defektami, które akurat leżały w punktach najwyższej absorpcji. Jeden defekt o wysokiej absorpcji obniżył próg uszkodzenia laserowego o ponad 40 procent, mimo że był ledwo widoczny gołym okiem.

To tworzy realny problem dla automatycznej inspekcji opartej na samej wielkości defektu, i nie jest to problem ograniczony do optyki laserowej. Im więcej AI używa się do inspekcji przemysłowej, tym ważniejsze staje się rozróżnienie między czymś, co wygląda nietypowo, a czymś, co faktycznie prawdopodobnie zawiedzie. Trudność w tym, że AI potrzebuje przykładów prawdziwych awarii, żeby się tego nauczyć, a producenci robią wszystko, żeby awarie się nie zdarzały, więc rzadkie, drogie albo trudne do odtworzenia awarie oznaczają mało danych treningowych. Artykuł kończy się obserwacją, że pętla zwrotna robi się coraz trudniejsza do zignorowania: technologia budująca kolejną generację AI jest coraz częściej udoskonalana przez AI samą w sobie, choć to jeszcze nie znaczy, że AI dosłownie buduje samą siebie.

**Key takeaways:**
- TSMC i Samsung używają AI i cyfrowych bliźniaków do wykrywania defektów i przewidywania awarii w fabrykach chipów
- Eksperyment OPTOMAN/DIOPTIC pokazał, że największy widoczny defekt nie zawsze jest najbardziej niebezpieczny
- Jeden defekt o wysokiej absorpcji obniżył próg uszkodzenia laserowego o ponad 40 procent mimo małego rozmiaru
- Rzadkość i wysoki koszt prawdziwych awarii ogranicza ilość danych treningowych dla predykcyjnej konserwacji AI

**Why do I care:** To dobry przykład na to, że "AI buduje AI" w praktyce oznacza coś dużo bardziej przyziemnego niż samo-replikującą się sztuczną inteligencję: chodzi o inspekcję przemysłową i predykcyjną konserwację, czyli klasyczne zastosowania uczenia maszynowego, tylko zastosowane w coraz bardziej krytycznym ogniwie łańcucha dostaw. Dla każdego, kto projektuje systemy inspekcji czy monitoringu oparte na AI, wniosek o defektach z eksperymentu optycznego jest uniwersalny: sama wielkość anomalii to słaby proxy dla jej realnego ryzyka, więc warto łączyć wykrywanie wzorców z pomiarem fizycznych konsekwencji, nie polegać wyłącznie na tym, co "wygląda groźnie".

**Link:** [Is AI Becoming Part of Its Own Supply Chain?](https://hackernoon.com/is-ai-becoming-part-of-its-own-supply-chain)
