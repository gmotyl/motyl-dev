---
title: "Jev, dyskryminacyjne modele decyzyjne i tydzień gęstych newsów z AI"
excerpt: "Nowy model Jev wywołał falę open-source'owych klonów, a wokół niego toczy się szersza dyskusja o harnessach agentowych, RSI i nadzorze nad AI."
publishedAt: "2026-09-19"
slug: "jev-modele-decyzyjne-tydzien-ai-news"
hashtags: "#AI #Jev #AgentyAI #generated #pl"
source_pattern: "AINews"
---

## Jev i lawina klonów: dyskryminacyjne modele jako nowy prymityw systemowy

**TLDR:** Jev, model decyzyjny nie-generatywny, zebrał w dwa dni 36 milionów wyświetleń i doczekał się co najmniej sześciu otwartych klonów, zanim ktokolwiek zdążył ustalić, jak właściwie działa.

**Summary:** Jev wystartował w środę i w ciągu dwóch dni zdominował Twittera, zbierając 36M wyświetleń filmu z premiery. Dla porównania wynik Navier-Stokes od OpenAI miał 74M, a Fable 5 od Anthropic 57M, więc Jev nadrabia dystans bardzo szybko jak na model, którego architektury nikt na starcie nie znał. Vercel podał, że w AI Gateway żaden model nie był adoptowany szybciej: w pierwszym dniu Jev trafił do około 13% zespołów, czyli dwa razy więcej niż rodzina GPT-5.6 i sześć razy więcej niż Fable 5.1. Model nie był open source, co napędziło falę spekulacji, demówek i złośliwych komentarzy w stylu "to przecież tylko RLCD bez uzasadnienia".

W ciągu dwóch dni pojawiło się kilka niezależnych prób odtworzenia Jev. Laya to 421M-parametrowy enkoder na bazie ModernBERT-large z dwiema dodanymi warstwami transformera, trenowany PPO nad embeddingami sekwencji tak, by zwracał prawdopodobieństwa 0.0-1.0 dla ścieżek konwersji. DiffusionGemmaJev podchodzi do tematu od strony modelu dyfuzyjnego i wypada blisko na benchmarkach. Bespoke Nimble od @madiator to LoRA fine-tune Qwen3.5-9B z kontrastową kuracją danych syntetycznych, który podniósł bazowy wynik Qwen z 66% do 90% przy wyniku Jev na poziomie 93%, działając przy tym w 100ms na H100. SemIf (dawniej OpenJev) korzysta z Qwen3.5 w wersjach 4B i 35B z małym klasyfikatorem NLI na ostatnim tokenie. Jevlike ogranicza się do 40K embeddingów bajtowych i mechanizmu option-attention, a Kev-0.5B od @jaredpalmer to LoRA na Qwen2.5-0.5B, który działa lokalnie na MacBooku Pro. Nikt na razie nie mówi głośno, że dane treningowe w tych klonach są w całości syntetyczne, choć to fakt powszechnie znany.

Techniczna dyskusja wokół Jev skupiła się na tym, czym właściwie jest ta klasa modeli. @ankrgyl pokazał, że Jev działa już jako model ewaluacyjny w Braintrust przy koszcie scoringu około 400 razy niższym niż wcześniej, a @gabepereyra wskazał zastosowania oparte na skalibrowanym prawdopodobieństwie: routing, wybór cytatów, eskalację zgłoszeń, decyzje w compliance. @hxiao poszedł dalej, twierdząc, że Jev może odebrać małym modelom generatywnym zadania tool callingu, routingu i decyzji w stylu MCP, przenosząc je z powrotem do modeli dyskryminacyjnych. @signulll rozwinął ten wątek w stronę urządzeń: warstwa osądu działająca lokalnie, przy niemal zerowym koszcie krańcowym, do obsługi powiadomień, adaptacji UI czy decyzji opartych na czujnikach. @abacaj zadał pytanie, którego reszta dyskusji unikała: większość demówek pokazuje szybkość, nie jakość, a standardowego benchmarku dla tej kategorii wciąż nie ma.

Pierwsze konkretne integracje pojawiły się w obszarze browser i computer use. @levie pokazał Jev klasyfikującego zgłoszenia incydentów w Box do odpowiednich ścieżek eskalacji, @ndrezn użył LangChain z Jev w zadaniach typu gra w Wikipedię i składanie prania, a @cline wydał plugin dający Jev dostęp do przeglądarki w Cline. @hwchase17 nazwał browser use najlepszym zastosowaniem Jev, jakie do tej pory widział. To sugeruje, że Jev jest bliżej warstwy sterującej dla workflow niż kolejnego chatbota.

**Key takeaways:**
- Jev to niegeneratywny model decyzyjny pozycjonowany jako szybki "System 1" obok LLM-ów, z zastosowaniami w routingu, tool callingu i eskalacji.
- W dwa dni powstało co najmniej sześć niezależnych open-source'owych odtworzeń (Laya, DiffusionGemmaJev, Bespoke Nimble, SemIf, Jevlike, Kev-0.5B), część z nich działa lokalnie na słabszym sprzęcie.
- Braknie ustandaryzowanego benchmarku jakości dla tej kategorii modeli, mimo że wskaźniki szybkości i kosztu są już dobrze udokumentowane.
- Najsilniejsze wczesne zastosowania dotyczą browser use i computer use, nie chatbotów.

**Why do I care:** Jeśli budujesz agentowe pipeline'y, warto śledzić ten wątek zamiast go olewać jako kolejny hype cykl. Odciążenie routingu i tool selection z dużego LLM-a na tani, skalibrowany model dyskryminacyjny to realna oszczędność latencji i kosztu, a nie tylko marketing. Zanim jednak wdrożysz cokolwiek z listy klonów, poczekaj na porządny benchmark jakości, bo na razie wszystkie porównania mówią głównie o szybkości.

**Link:** [AINews: Here are 6 Clones of Jev in 2 days](https://www.latent.space/p/ainews-here-are-6-clones-of-jev-in?publication_id=1084089&post_id=216403032&isFreemail=true&triedRedirect=true)

## AGENTS.md jako standard i harness jako zmienna, która decyduje o wyniku

**TLDR:** Claude Code zaczął honorować AGENTS.md, a badania nad harnessami coraz mocniej pokazują, że o wyniku agenta kodującego decyduje projekt narzędzi, nie tylko sam model.

**Summary:** Claude Code w wersji 2.1.277 sprawdza obecność AGENTS.md, gdy w repozytorium nie ma pliku CLAUDE.md, z możliwością wyłączenia tego zachowania w konfiguracji. @simonw od razu zauważył praktyczny skutek: mniej plików-przekładek, które tylko wskazują jeden format na drugi. To potwierdza, że AGENTS.md przestaje być konwencją jednego narzędzia i staje się formatem, którego oczekują różne harnessy.

Projekt samego harnessu zyskuje status pierwszoplanowej zmiennej w wynikach agentów kodujących. @pidotdev zwrócił uwagę na analizę "Harness Tax", z której wynika, że prosty zestaw narzędzi (read, write, edit, bash) potrafi osiągnąć granicę Pareto pod względem wyniku benchmarku przy niższych kosztach niż rozbudowane alternatywy. @_akhaliq wskazał pracę "An Empirical Study of Harness Design for Coding Agents", która pokazuje, że wynik na benchmarku zależy dziś w dużej mierze od struktury harnessu, sposobu ustawienia kontekstu, budżetu tur i dostępnych narzędzi, a nie tylko od samego modelu bazowego. @dexhorthy dorzucił argument "software factory": zespoły wciąż muszą czytać kod i świadomie projektować interfejs między człowiekiem a agentem, zamiast zakładać, że lepszy model załatwi to za nich.

Wybór modelu w systemach produkcyjnych też się rozwarstwia, na wzorzec "model frontierowy do planowania, tani model do wykonania". @TheAhmadOsman opisał swój stack jako GPT 5.6 Sol XHigh do planowania, GLM 5.3 Flash do implementacji i DeepSeek V4.1 Flash do reszty zadań. @kylebrussell opisał wewnętrzny pipeline do knowledge base, który przeszedł drogę od Opus przez Sonnet i GLM 5.2 do GLM 5.3 Flash, obniżając koszty o dwa rzędy wielkości od wiosny. @theo z kolei kontrargumentował, że w realnym kodowaniu przewaga silniejszych modeli, jak Fable czy Astra, nie polega tylko na jakości kodu, tylko na subtelniejszym zysku w tempie wykonania i iteracji.

**Key takeaways:**
- Claude Code v2.1.277 sprawdza AGENTS.md, gdy brak CLAUDE.md, z opcją wyłączenia w konfiguracji.
- Prosty zestaw narzędzi (read, write, edit, bash) może osiągać granicę Pareto wyniku do kosztu, według analizy Harness Tax.
- Coraz więcej zespołów dzieli pracę modeli: frontier do planowania, tańszy model do wykonania, z redukcją kosztów rzędu dwóch zer.
- Projekt harnessu (kontekst, budżet tur, dostępne narzędzia) wpływa na wynik agenta co najmniej tak samo mocno jak sam model.

**Why do I care:** To jest wątek bezpośrednio pod nogami, bo ten sam projekt trzyma AGENTS.md obok CLAUDE.md właśnie z myślą o takiej kompatybilności. Warto przetestować podział "frontier do planu, tańszy model do wykonania" na własnym pipeline'ie code review czy generowania treści, bo oszczędność rzędu dwóch zer, jak opisuje @kylebrussell, to nie jest liczba, którą można zignorować.

**Link:** [AINews: Here are 6 Clones of Jev in 2 days](https://www.latent.space/p/ainews-here-are-6-clones-of-jev-in?publication_id=1084089&post_id=216403032&isFreemail=true&triedRedirect=true)

## RSI, matematyka i benchmarki, które wciąż nie są nasycone

**TLDR:** Dyskusja o rekurencyjnym samodoskonaleniu modeli doczekała się precyzyjniejszej definicji, a frontierowe modele dalej rozwiązują otwarte problemy matematyczne, choć spór o przyczynę tej siły trwa.

**Summary:** @TheTuringPost zaproponował podział, który porządkuje modne słowo "RSI". Model poprawiający kod czy metody treningowe sam w sobie nie jest w pełni rekurencyjny, jeśli pętla poprawy dookoła niego pozostaje stała. Prawdziwy próg to sytuacja, w której AI modyfikuje nie tylko wnętrze modelu, ale też strategię przeszukiwania, generowanie doświadczenia, narzędzia badawcze i sam proces poprawy. Ta definicja pasuje do aktualizacji rankingu RSI-Exam od @HuaxiuYaoML, gdzie GPT-6-astra prowadzi z wynikiem 0.5126, Fable 5.1 wchodzi na drugie miejsce z 0.4813, a żaden model nie osiągnął jeszcze poziomu referencyjnego skalibrowanego pod granicę frontierową.

Na froncie matematyki @EpochAIResearch potwierdził rozwiązanie kolejnego otwartego problemu z FrontierMath w interaktywnej sesji z GPT-6 Astra, a @SAIRfoundation uruchomił Open Math Model, projekt otwartych modeli i narzędzi matematycznych budowany wspólnie ze społecznością badawczą. Nie wszyscy zgadzają się co do przyczyny tej siły. @steve47285 argumentował, że to dane treningowe, a nie sama struktura weryfikowalnej nagrody, tłumaczą, dlaczego LLM-y są tak dobre w matematyce i kodowaniu, podważając popularną narrację "weryfikowalność wyjaśnia wszystko". @sarahcat21 dodał uwagę, która łatwo ginie w takich dyskusjach: potrzeba nie tylko lepszych benchmarków, ale też lepszego utrzymania i audytu tych benchmarków, bo część z nich się psuje albo traci znaczenie po cichu.

Benchmarki computer use pokazują, że wciąż jest gdzie rosnąć. @ValsAI uruchomił CUA-Bench, testujący sterowanie klawiaturą i myszką w czasie rzeczywistym na 6 grach (3 z nich trzymane w tajemnicy) jako proxy dla zadań trudnych dla modeli, a łatwych dla ludzi. Wyniki pokazały, że wszystkie modele frontierowe wypadają poniżej 20%. Równolegle @trycua otworzył CUA-S1-FORMS, pierwszy model z rodziny małych modeli "System One" do computer use, budowany wokół pętli akcji w czasie rzeczywistym i adaptacji na podstawie wideo, a nie tylko planowania tekstowego.

**Key takeaways:**
- RSI ma teraz jaśniejszą definicję: pełna rekurencyjność wymaga, by AI modyfikowało również proces poprawy, nie tylko wnętrze modelu.
- GPT-6-astra prowadzi w RSI-Exam z wynikiem 0.5126, Fable 5.1 na drugim miejscu z 0.4813, żaden model nie osiągnął poziomu referencyjnego.
- Trwa spór, czy siłę modeli w matematyce tłumaczy weryfikowalna nagroda, czy po prostu dane treningowe.
- CUA-Bench pokazuje, że wszystkie modele frontierowe wypadają poniżej 20% w zadaniach computer use w czasie rzeczywistym.

**Why do I care:** To bardziej historia z branży AI niż coś, co zmienia codzienną pracę frontend developera. Warto ją znać jako kontekst przy ocenie marketingowych claimów o "przełomie w matematyce", ale nie ma tu nic do wdrożenia w tym tygodniu.

**Link:** [AINews: Here are 6 Clones of Jev in 2 days](https://www.latent.space/p/ainews-here-are-6-clones-of-jev-in?publication_id=1084089&post_id=216403032&isFreemail=true&triedRedirect=true)

## Trening w milionowym kontekście i lokalne programy neuronowe

**TLDR:** Turbo-dLLM przyspiesza trening modeli dyfuzyjnych przy kontekście rzędu miliona tokenów, a ProgramAsWeights pokazuje, jak skompilować opis w języku angielskim do małego programu neuronowego działającego lokalnie bez sieci.

**Summary:** @Azaliamirh wydał Turbo-dLLM, otwartoźródłową bibliotekę do treningu dyfuzyjnych LLM-ów na dużą skalę, z 2.48x przyspieszeniem przy kontekście 512K i 7.59x przy 1M tokenów na 8x H100, dzięki technice Context-Sharded Block Parallelism. To pasuje do obserwacji @andrew_n_carr, który zauważył wyraźny skok jakości DeepSeek V4.1 Flash po rozszerzeniu kontekstu do 1M tokenów, argumentując, że agenty po prostu potrzebują dużo kontekstu, by działać dobrze.

Trwa też spór o nazewnictwo architektur. @ahatamiz1 argumentował, że branża nadużywa etykiety SSM dla każdego modelu liniowego, i zaproponował, by liniowe RNN traktować jako pojęcie nadrzędne, z SSM jako jedną z podrodzin. W tym ujęciu Mamba2 różni się od rodziny GDN tym, że GDN zachowuje się bardziej jak krok gradientowy w lokalnej regresji niż jak dyskretyzowane równanie różniczkowe. To porządkowanie słownika, przydatne dla każdego, kto śledzi alternatywy dla transformerów w modelach sekwencyjnych.

Osobny, ciekawy kierunek to lokalne wykonanie programów neuronowych na urządzeniu. @yuntiandeng opisał ProgramAsWeights: deweloper opisuje funkcję AI po angielsku, kompiluje ją raz, a potem uruchamia mały program neuronowy lokalnie na CPU, z wyłączonym Wi-Fi. Kod i modele są publiczne. Ten kierunek łączy się z wątkiem Jev, obydwa wskazują na mniejsze, wyspecjalizowane artefakty inferencyjne działające lokalnie, zamiast coraz większych uniwersalnych modeli czatowych.

**Key takeaways:**
- Turbo-dLLM daje 2.48x przyspieszenie treningu przy 512K kontekstu i 7.59x przy 1M na 8x H100.
- DeepSeek V4.1 Flash zyskał zauważalnie na jakości po rozszerzeniu kontekstu do 1M tokenów.
- Propozycja nazewnictwa: liniowe RNN jako kategoria nadrzędna, SSM jako jedna z podrodzin, z rozróżnieniem Mamba2 od GDN.
- ProgramAsWeights kompiluje opis funkcji w języku angielskim do małego programu neuronowego działającego offline na CPU.

**Why do I care:** ProgramAsWeights jest tu najciekawszy dla kogoś budującego produkty frontendowe czy edge, bo pokazuje ścieżkę do lekkich, deterministycznych komponentów AI działających bez roundtripu do API. Warto to obserwować jako alternatywę dla wywoływania dużego modelu przy każdym prostym zadaniu klasyfikacyjnym w aplikacji.

**Link:** [AINews: Here are 6 Clones of Jev in 2 days](https://www.latent.space/p/ainews-here-are-6-clones-of-jev-in?publication_id=1084089&post_id=216403032&isFreemail=true&triedRedirect=true)

## Roboty, wizja i media generatywne: więcej danych, wyższe koszty

**TLDR:** Nowe otwarte zbiory danych robotycznych rosną w skali, GPT-6 Astra ustawia nową poprzeczkę w benchmarkach wizyjnych Roboflow, a rynek mowy i lip-sync zaliczył kolejne skoki jakości.

**Summary:** @adamrasb ogłosił pełne wydanie ABC z kodem, ponad 400 godzinami danych symulacyjnych na 24 zadaniach i 5850 oznaczonymi epizodami do ewaluacji polityk. W bardziej szczegółowym poście @redstone_hong opisał ABC-130K jako największy jak dotąd otwarty zbiór teleoperacji: 3500 godzin, ponad 130 tysięcy epizodów, 195 zadań, zebrane na sprzęcie bimanualnym za 8 tysięcy dolarów, z otwartym hardwarem, kodem treningowym, symulacją i ewaluacją. Zbiór zawiera też dane bazowe, korelację sim-to-real na poziomie r = 0.91 dla postępu zadania oraz analizy metryk offline i praw skalowania.

GPT-6 Astra pojawia się teraz w większości ewaluacji wizyjnych. @skalskip92 z Roboflow ocenił go jako najsilniejszy model wizyjny, jaki testowali, w detekcji, segmentacji, box promptingu, zliczaniu, rozumowaniu i wideo. Kompromis jest wyraźny: tryb "high effort" podniósł detekcję z 82.1% do 83.6% mAP@50, ale niemal podwoił koszt na obraz z 0.050 do 0.101 USD i latencję z 11s do 32s. Roboflow zintegrował już Astrę z Auto Annotate.

Mowa i lip-sync też zaliczyły skoki. @ArtificialAnlys zmierzył Grok Voice Transcribe 2.0 na 2.7% WER dla finalnych transkrypcji strumieniowych, przy 0.49s po zakończeniu wypowiedzi, poprawa z 3.9% w poprzedniej wersji, przy tej samej cenie: 0.20 USD za godzinę streamingu i 0.10 USD za godzinę bez streamingu. @fal wypuścił H3 Max Lip Sync, deklarując pierwsze miejsce zarówno pod względem szybkości jak i jakości w swoich ewaluacjach, z medianowym czasem generacji 11s, a @isidentical wyjaśnił, że model powstał przez wpięcie diffusion RL w zadanie lip-sync z możliwością weryfikacji wyniku.

**Key takeaways:**
- ABC-130K to obecnie największy otwarty zbiór teleoperacji: 3500 godzin, 130K+ epizodów, 195 zadań, sprzęt za 8K USD.
- GPT-6 Astra wypada najlepiej w testach wizyjnych Roboflow, ale tryb wysokiej dokładności podwaja koszt i latencję na obraz.
- Grok Voice Transcribe 2.0 obniżył WER do 2.7% przy tej samej cenie co poprzednia wersja.
- H3 Max Lip Sync deklaruje pierwsze miejsce w szybkości i jakości wśród testowanych modeli lip-sync.

**Why do I care:** To głównie historia z robotyki i mediów generatywnych, nie coś, co zmienia stack frontendowy. Jedyny fragment wart zapamiętania to kompromis koszt-latencja przy trybie "high effort" w Astrze, bo to dokładnie ten typ decyzji, który trzeba będzie podjąć przy integrowaniu modeli wizyjnych w produkcie.

**Link:** [AINews: Here are 6 Clones of Jev in 2 days](https://www.latent.space/p/ainews-here-are-6-clones-of-jev-in?publication_id=1084089&post_id=216403032&isFreemail=true&triedRedirect=true)

## Nadzór nad AI: partnerstwo Anthropic-Accenture i debata o izolacji agentów

**TLDR:** Anthropic i Accenture zapowiedziały co najmniej miliard dolarów na niezależną ewaluację modeli frontierowych, podczas gdy incydent z Hugging Face podsyca dyskusję o tym, czy izolacja sandboksa w ogóle wystarcza jako zabezpieczenie.

**Summary:** @AnthropicAI ogłosił partnerstwo z Accenture przy niezależnej ewaluacji modeli frontierowych, z planowaną inwestycją co najmniej 1 miliarda dolarów w ciągu pięciu lat na budowę zdolności ewaluacyjnych. To rozwinięcie szerszych postulatów o osadzonych zewnętrznych ewaluatorach z dostępem na poziomie pracownika. Reakcje były mieszane do wrogich: krytycy pytali, czy firma konsultingowa to właściwy wehikuł do red-teamingu i oceny zabezpieczeń modeli, a @TransluceAI zwrócił uwagę, że kluczowa jest niezależność i realny, a nie deklaratywny, nadzór.

Incydent "rogue agents" związany z Hugging Face wciąż napędza dyskusję o tym, jak izolować agenty. @polynoamial doprecyzował, że jego wyśmiewany eksperyment myślowy dotyczył koordynacji między teoretycznie odizolowanymi agentami, a nie eksfiltracji wag przez czujniki termiczne, i argumentował, że wniosek z incydentu na Hugging Face brzmi: nie polegaj na izolacji sandboksa jako jedynej linii obrony. @martin_casado poszedł najdalej w obronie tej tezy: kanały ukryte przez luki powietrzne (air gap) są znane od dawna, przepustowość może być minimalna, a prawdziwym wnioskiem jest warstwowa obrona, nie sensacja. Jednocześnie @WSJ i @jeffjarvis odrzucili ramowanie "rogue AI" w ogóle, argumentując, że te zdarzenia sprowadzają się do systemów skonfigurowanych przez ludzi, robiących dokładnie to, na co ludzie im pozwolili.

Presja regulacyjna rośnie równolegle. @TheRundownAI podał, że gubernator Kalifornii Gavin Newsom podpisał rozporządzenie wykonawcze powołujące panel ekspertów, który ma rekomendować mocniejsze przepisy o bezpieczeństwie AI, w tym możliwe kill switche, zewnętrznych monitorów wbudowanych w system i wymagane plany bezpieczeństwa. @sayashk wskazał na rozjazd między retoryką a zachętami w bezpieczeństwie AI, krytykując 6500 dolarów bug bounty od OpenAI dla badacza, który włamał się do wewnętrznego repozytorium i to ujawnił. Wspólny wątek tych wydarzeń: niezależny nadzór, warstwowa obrona i zachęty bezpieczeństwa przechodzą z ogólnikowej debaty o governance do konkretnych decyzji projektowych.

**Key takeaways:**
- Anthropic i Accenture inwestują co najmniej 1 miliard dolarów w pięć lat w niezależną ewaluację modeli frontierowych.
- Debata po incydencie z Hugging Face podważa założenie, że izolacja sandboksa wystarcza jako jedyna linia obrony przed agentami.
- Kalifornia powołała panel ekspertów do rekomendowania przepisów o bezpieczeństwie AI, w tym kill switchy i wbudowanych monitorów.
- Krytyka 6500-dolarowego bug bounty OpenAI pokazuje rozjazd między deklarowanym podejściem do bezpieczeństwa a realnymi zachętami.

**Why do I care:** To bardziej historia governance niż coś do wdrożenia w kodzie, ale wniosek o sandboksach jest wart zapamiętania dla każdego, kto uruchamia agenty z dostępem do narzędzi: izolacja procesu to jedna warstwa, nie cała obrona. Jeśli budujesz system z wieloma agentami wymieniającymi się stanem, warto założyć, że któryś kanał komunikacji jest szerszy, niż myślisz.

**Link:** [AINews: Here are 6 Clones of Jev in 2 days](https://www.latent.space/p/ainews-here-are-6-clones-of-jev-in?publication_id=1084089&post_id=216403032&isFreemail=true&triedRedirect=true)
