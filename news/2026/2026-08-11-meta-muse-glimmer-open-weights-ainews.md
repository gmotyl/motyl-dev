---
title: "Meta wraca do open weights: Muse Glimmer, Spark 1.2 i wyścig agentowych modeli"
excerpt: "Meta ponownie stawia na modele open-weight z Muse Glimmer i zapowiedzią Spark 1.2, a przy tym Anthropic, OpenAI i cała infrastruktura agentowa przechodzą przez kolejny tydzień szybkich zmian."
publishedAt: "2026-08-11"
slug: "meta-muse-glimmer-open-weights-ainews"
hashtags: "#ai #ainews #llm #agents #open-source #architecture #performance #generated #pl"
source_pattern: "AINews"
---

## Meta wraca do open weights: Muse Glimmer i obietnica Spark 1.2

**TLDR:** Meta wydała Muse Glimmer, gęsty 30-miliardowy model multimodalny na licencji Apache 2.0, zoptymalizowany pod lokalne, stale działające agenty. Zuckerberg opublikował przy tym nowy manifest o personal superintelligence, a Alexandr Wang zapowiedział, że wkrótce trafi do sieci również otwarta wersja Spark 1.2.

**Summary:** Rok po pierwszym eseju Zuckerberga o personal superintelligence, Meta Superintelligence Labs wychodzi z długiego okresu ostrożnych, niewielkich ogłoszeń i wypuszcza coś, co faktycznie wygląda na model frontierowy w swojej klasie wagowej. Muse Glimmer to gęsty model na 30 miliardach parametrów, multimodalny, obsługujący ponad sto języków i przystosowany do pracy jako lokalny agent działający cały czas w tle. Model trafił na licencję Apache 2.0, co samo w sobie jest zwrotem w stosunku do ostatnich, bardziej zamkniętych posunięć firmy.

Warstwa techniczna jest tu równie ciekawa jak sam fakt wydania. Meta mówi o kwantyzacji sprowadzającej model poniżej 20 GB oraz o lekkim drafterze DFlash, który przyspiesza generowanie na urządzeniu przez spekulatywne dekodowanie. Społeczność szybko dorzuciła własne obserwacje: podobieństwa do hybrydowej uwagi w stylu Gemma 4, scale-free QK norm, głębsze warstwy wizyjne i dłuższe okna SWA. Co ważniejsze koncepcyjnie, Glimmer nie jest klasycznym modelem bazowym trenowanym najpierw ogólnie, a potem dostrajanym pod agentów. Został distillowany logitowo ze Spark i od początku trenowany na śladach agentowych, czyli na przykładach rzeczywistego wykonywania zadań, a nie tylko na tekście.

Niezależne testy Artificial Analysis stawiają Glimmer na poziomie 35 punktów w ich Intelligence Index, blisko Qwen3.6-27B (38) i Kimi K2.5 (36), a jednocześnie bardzo wysoko w indeksie otwartości. Praktycznie oznacza to model, który mieści się w 24 GB VRAM w wersji 4-bitowej, ma kontekst 128K i sprawdza się szczególnie dobrze w narzędziach typu Tau3-Banking, czyli w scenariuszach wywołań funkcji i pracy z zewnętrznymi API. Słabością jest kalibracja wiedzy i skłonność do halucynacji, a także słabszy wynik w zadaniach wymagających głębszej pracy z wiedzą ogólną w porównaniu do konkurencji.

Cały ten ruch trzeba czytać razem z esejem Zuckerberga, w którym Meta stawia się w opozycji do laboratoriów budujących AI głównie dla firm i instytucji. Autor przewiduje mniejsze firmy, ale więcej ich, przenoszenie władzy w stronę jednostek oraz konkretne, dość odważne propozycje polityczne, między innymi udostępnianie checkpointów treningowych rządom do wglądu jeszcze przed zakończeniem treningu. To już nie jest tylko techniczny release notes, to próba zdefiniowania narracji na kolejne lata wyścigu o superintelligence.

**Key takeaways:**
- Muse Glimmer to 30B, gęsty, multimodalny model open-weight na Apache 2.0, zoptymalizowany pod lokalne agenty działające stale w tle
- Model działa na konsumenckim sprzęcie, poniżej 20 GB w wersji skwantyzowanej, z kontekstem 128K
- Trenowany od zera na śladach agentowych, a nie doklejony post-treningowo do modelu bazowego
- Zapowiedziano otwartą wersję Spark 1.2, co sugeruje szerszą strategię powrotu do open weights
- Wyniki benchmarków stawiają go blisko Qwen3.6-27B i Kimi K2.5, z przewagą w otwartości, ale słabszą kalibracją wiedzy

**Why do I care:** Dla mnie to sygnał, że lokalny, samohostowany agent przestaje być ciekawostką dla entuzjastów i staje się realną opcją architektoniczną. Jeśli 30B model z kontekstem 128K działa sensownie na 24 GB VRAM i jest trenowany pod agentowe pętle, a nie pod czatowanie, to zaczynam realnie rozważać scenariusze, w których część procesów developerskich albo firmowych agentów nie musi wychodzić poza sieć klienta. To zmienia rozmowy o kosztach i o compliance, bo nagle "self-hosted LLM" nie znaczy już automatycznie "gorszy model", tylko po prostu inny trade-off między kontrolą, prywatnością i surową mocą.

**Link:** [AINews: Muse Glimmer and Spark: Open Weights return Personal Superintelligence promise](https://www.latent.space/p/ainews-muse-glimmer-and-spark-open?publication_id=1084089&post_id=210704241&isFreemail=true&triedRedirect=true)

## Claude poprawia ograniczenie związane z hipotezą Riemanna, a Anthropic obniża ceny na stałe

**TLDR:** Nieopublikowany wariant badawczy Claude nie rozwiązał hipotezy Riemanna, ale poprawił dolne ograniczenie na udział zer funkcji zeta leżących na krytycznej linii, z 41,6% do 67,2%. Równolegle Anthropic ogłosił, że wprowadzeniowa cena Claude Sonnet 5 zostaje na stałe, czyli 2 dolary za milion tokenów wejściowych i 10 dolarów za milion wyjściowych.

**Summary:** Wynik matematyczny brzmi bardziej efektownie niż jest w rzeczywistości praktyczny, ale to nie znaczy, że jest nieistotny. Model dostał zadanie związane z hipotezą Riemanna i, jak podaje Anthropic, nie znalazł dowodu samej hipotezy, ale przesunął znany wcześniej dolny limit dotyczący liczby zer funkcji zeta leżących na krytycznej linii. Wzrost z 41,6% do 67,2% to konkretna, weryfikowalna poprawka istniejącego wyniku matematycznego, a nie efekt marketingowy. Jarred Sumner dodał kontekst techniczny: model korzystał z wielokrotnych powtórzeń i szerokiej eksploracji przestrzeni rozwiązań, generując w sumie 31 milionów tokenów wyjściowych, żeby dojść do finalnego wyniku.

Inżynierowie komentujący ten wynik trzeźwo odróżniają go od nagłówków w stylu "AI rozwiązało wielki problem matematyczny". To raczej dowód na to, że modele mogą być użyteczne w iteracyjnym przeszukiwaniu dowodów i w poprawianiu istniejących granic matematycznych, czyli w pracy, która wcześniej wymagała miesięcy pracy ludzkich matematyków nad wariantami tego samego podejścia. 31 milionów tokenów to też konkretna informacja o koszcie takiego eksperymentu, więc nie jest to coś, co da się odtworzyć na tani sposób w codziennej pracy.

Ta sama wiadomość niesie drugi, bardziej przyziemny temat. Anthropic ogłosił, że cena wprowadzeniowa Claude Sonnet 5 zostaje utrzymana na stałe, 2 dolary za milion tokenów wejściowych i 10 dolarów za milion wyjściowych. W kontekście silnej presji cenowej ze strony otwartych i częściowo otwartych modeli, takich jak właśnie Muse Glimmer czy DeepSeek V4 Flash, to czytelny sygnał, że Anthropic traktuje cenę jako broń konkurencyjną, a nie tylko chwilową promocję.

**Key takeaways:**
- Nieopublikowany model badawczy Claude poprawił dolny limit dla zer funkcji zeta na krytycznej linii, z 41,6% do 67,2%
- Wynik osiągnięto przez wielokrotne powtórzenia i eksplorację, przy koszcie około 31 milionów tokenów wyjściowych
- To poprawka istniejącego ograniczenia matematycznego, nie rozwiązanie hipotezy Riemanna
- Anthropic uczynił promocyjną cenę Claude Sonnet 5 (2 USD wejście, 10 USD wyjście) ceną stałą
- Decyzja cenowa jest odpowiedzią na presję konkurencyjną z modeli open-weight

**Why do I care:** Wynik matematyczny to dla mnie ciekawostka na wieczór, ale cena Claude Sonnet 5 to informacja, którą wpisuję do arkusza kosztów projektu. Kiedy laboratorium decyduje się zamrozić cenę wprowadzeniową na stałe, to zwykle znaczy, że koszty inferencji faktycznie spadają szybciej niż presja rynkowa, a nie że robią gest dobrej woli. Jako architekt planujący budżet na agentów produkcyjnych wolę takie sygnały niż same benchmarki, bo mówią mi, ile realnie będzie kosztować utrzymanie systemu za rok, a nie tylko dziś.

**Link:** [AINews: Muse Glimmer and Spark: Open Weights return Personal Superintelligence promise](https://www.latent.space/p/ainews-muse-glimmer-and-spark-open?publication_id=1084089&post_id=210704241&isFreemail=true&triedRedirect=true)

## OpenAI wypuszcza GPT-5.6-Cyber z dostępem ograniczonym do zatwierdzonych obrońców

**TLDR:** OpenAI zapowiedziało GPT-5.6-Cyber jako rozszerzenie inicjatywy Daybreak, model skierowany do autoryzowanej pracy defensywnej w cyberbezpieczeństwie. Dostęp jest ograniczony do zatwierdzonych zespołów obronnych, z dodatkowym monitoringiem zadań wysokiego ryzyka.

**Summary:** GPT-5.6-Cyber wpisuje się w narastający trend modeli specjalizowanych, budowanych nie pod ogólne zastosowania, a pod bardzo konkretną, wąską niszę zawodową, w tym przypadku ofensywno-defensywne badania bezpieczeństwa. OpenAI twierdzi, że model już był używany w realnych badaniach nad podatnościami, w tym do znajdowania wcześniej nieznanych błędów w otwartym oprogramowaniu, a nawet w szczegółach Chrome V8. To nie jest zapowiedź teoretycznej możliwości, a raport z użycia produkcyjnego, choć oczywiście podany przez samego producenta modelu, więc warto traktować go z odpowiednią rezerwą.

Dostęp do modelu jest jednak celowo zawężony. OpenAI mówi o "zatwierdzonych obrońcach" i dodatkowych mechanizmach kontroli oraz monitoringu przy zadaniach o wyższym ryzyku. To rozwiązanie próbujące pogodzić dwa sprzeczne interesy: model, który realnie znajduje podatności w kodzie, jest z definicji tym samym modelem, który mógłby te podatności wykorzystać ofensywnie. Ograniczenie dostępu do wyselekcjonowanej grupy to najprostszy sposób na zmniejszenie ryzyka, choć nie eliminuje go całkowicie, bo dostęp i tak trafia do ludzi.

Ten ruch trzeba czytać w kontekście szerszej debaty o modelach zdolnych do autonomicznej eksploatacji podatności, którą komentowali między innymi badacze śledzący politykę bezpieczeństwa AI. Rośnie napięcie między korzyściami z automatyzacji defensywnego hardeningu infrastruktury a ryzykiem, że te same zdolności trafią w niepowołane ręce, legalnie lub przez wyciek.

**Key takeaways:**
- GPT-5.6-Cyber to rozszerzenie inicjatywy Daybreak, skierowane do autoryzowanej pracy defensywnej
- Model już znalazł nieznane wcześniej podatności w otwartym oprogramowaniu i w szczegółach Chrome V8
- Dostęp jest ograniczony do zatwierdzonych zespołów obronnych, z dodatkowym monitoringiem
- Wydanie odbywa się w kontekście szerszej debaty o autonomicznej eksploatacji podatności przez AI

**Why do I care:** Jako ktoś, kto odpowiada za bezpieczeństwo aplikacji frontendowych i całych łańcuchów CI/CD, widzę w tym dwie strony jednej monety. Z jednej strony narzędzie, które automatycznie znajduje podatności w moim kodzie, to coś, co chciałbym mieć w pipeline jak najszybciej. Z drugiej, jeśli model potrafi znaleźć nieznaną podatność w V8, to ten sam typ modelu, mniej ostrożnie udostępniony, będzie w rękach kogoś, kto atakuje moją produkcję. Ograniczony dostęp brzmi rozsądnie na papierze, ale historia pokazuje, że takie bariery trzymają się dokładnie do momentu pierwszego wycieku dostępu albo pierwszego modelu-klona o podobnych zdolnościach wydanego bez żadnych ograniczeń.

**Link:** [AINews: Muse Glimmer and Spark: Open Weights return Personal Superintelligence promise](https://www.latent.space/p/ainews-muse-glimmer-and-spark-open?publication_id=1084089&post_id=210704241&isFreemail=true&triedRedirect=true)

## Silnik agentowy zaczyna liczyć się bardziej niż sam model

**TLDR:** Testy porównawcze Composio pokazały, że jakość harnessu agentowego, czyli warstwy pośredniczącej między modelem a narzędziami, może decydować o wyniku bardziej niż sam model bazowy. Do tego dochodzi rosnące poparcie dla programistycznego wywoływania narzędzi jako typowanych funkcji w kodzie, zamiast klasycznych schematów JSON.

**Summary:** Composio przepuściło DeepSeek V4 Flash przez cztery różne harnessy agentowe na trzydziestu zadaniach i okazało się, że Pi Agent był jednocześnie najtańszy i najlepszy w tym zestawieniu, mimo że model bazowy był wszędzie identyczny. To ważna obserwacja dla każdego, kto ocenia modele wyłącznie na podstawie benchmarków publikowanych przez producentów, bo w praktyce ten sam model potrafi dawać zupełnie inne rezultaty w zależności od tego, jak zbudowana jest wokół niego pętla planowania, wywoływania narzędzi i obsługi błędów. Shashwat Goel podobnie chwalił Prime-agent jako solidny, ogólny harness do zadań długoterminowych, co wzmacnia ten sam wniosek z innej strony.

Drugi wątek dotyczy samego interfejsu do narzędzi. Analiza podsumowana przez dair_ai argumentuje, że programistyczne wywoływanie narzędzi, czyli typowane funkcje w Pythonie wykonywane bezpośrednio w kodzie, dorównuje albo przewyższa klasyczne wywołania w formacie JSON w jedenastu z czternastu testowanych modeli. Rodzina GPT-5.6 zyskała aż 10,6% względem baseline'u JSON w teście BFCL v4. Intuicja stojąca za tym wynikiem jest prosta: modele stają się coraz lepsze w pisaniu i rozumieniu kodu, więc traktowanie narzędzi jako obiektów kodu, a nie jako oddzielnych schematów do sparsowania, zaczyna wygrywać, szczególnie przy dużej liczbie równoległych wywołań i przy degradacji kontekstu.

Trzeci wątek to czysta inżynieria kosztów. Teknium opisał usprawnienia narzędzi do odczytu w Hermes Agent oraz redukcję zużycia tokenów o około 60% w automatyzacji przeglądarki, osiągniętą przez połączenie wielu akcji przeglądarkowych w jeden interfejs CLI. Podobny kierunek widać w Browser Use i Stagehand v4, które idą w stronę cieńszych, bardziej natywnych dla przeglądarki abstrakcji. Osobno, SDK od Pi pokazuje, że agent kodujący może być zaskakująco skuteczny mając tylko cztery podstawowe operacje: odczyt, bash, edycję i zapis, co jest dobrym argumentem za tym, że prostota interfejsu bywa ważniejsza niż jego bogactwo.

**Key takeaways:**
- Ten sam model bazowy (DeepSeek V4 Flash) dawał bardzo różne wyniki w zależności od użytego harnessu agentowego
- Pi Agent wypadł najlepiej i najtaniej w teście Composio na trzydziestu zadaniach
- Programistyczne wywoływanie narzędzi jako typowanych funkcji w kodzie wygrywa z JSON-em w 11 z 14 modeli
- GPT-5.6 zyskał 10,6% w BFCL v4 dzięki programistycznemu podejściu do narzędzi
- Konsolidacja wielu akcji przeglądarkowych w jeden interfejs CLI dała około 60% redukcji tokenów

**Why do I care:** To jest dokładnie ten temat, o którym powtarzam zespołom od dłuższego czasu: wybór modelu to może 30% sukcesu projektu agentowego, a resztę robi architektura wokół niego. Widziałem zespoły, które wydały tydzień na porównywanie modeli w arkuszu, a potem wdrożyły najgorszy z nich w najlepiej zaprojektowanym harnessie i wygrały z konkurencją używającą "lepszego" modelu w byle jakiej pętli. Programistyczne wywołania narzędzi to też coś, co powinno zainteresować każdego frontendowca piszącego integracje z LLM-ami, bo typowane funkcje w kodzie to po prostu lepszy kontrakt niż swobodny JSON, łatwiejszy do testowania i do code review.

**Link:** [AINews: Muse Glimmer and Spark: Open Weights return Personal Superintelligence promise](https://www.latent.space/p/ainews-muse-glimmer-and-spark-open?publication_id=1084089&post_id=210704241&isFreemail=true&triedRedirect=true)

## Spekulatywne dekodowanie robi się produkcyjne: DSpark kontra DFlash

**TLDR:** Szeroko udostępniony wątek techniczny porównał metody spekulatywnego dekodowania DSpark i DFlash na modelu Qwen3-4B w vLLM. DSpark osiągnął 2,45 do 2,55 razy większy throughput względem baseline'u, DFlash 1,96 do 2,09 razy, co pokazuje, że wybór drafterskiej strategii ma realny wpływ na koszty inferencji.

**Summary:** Spekulatywne dekodowanie od dawna jest jednym z najbardziej obiecujących sposobów na przyspieszenie generowania tekstu przez duże modele, ale dopiero teraz zaczyna trafiać do produkcyjnych stosów w sposób, który da się bezpośrednio porównać liczbami. Wątek podsumowany przez ZhihuFrontier zestawił dwa podejścia, DSpark i DFlash, uruchomione na tym samym modelu Qwen3-4B w vLLM. DSpark okazał się szybszy, z przewagą 2,45 do 2,55 razy nad baseline'em bez spekulacji, wobec 1,96 do 2,09 razy dla DFlash. Różnica wynika ze struktury semi-autoregresyjnej DSparka połączonej ze świadomym sprzętowo schedulerem prefiksów, który unika zbędnej weryfikacji tokenów wygenerowanych przez model docelowy.

To akurat spójne z tym, co Meta robi w Muse Glimmer, gdzie wykorzystano właśnie drafter typu DFlash do przyspieszenia lokalnej odpowiedzi agenta. Widać więc dwa równoległe podejścia do tego samego problemu, jedno stawiające na maksymalną przepustowość w środowisku serwerowym, drugie na responsywność w środowisku lokalnym z ograniczonymi zasobami. Nie ma tu jednego zwycięzcy uniwersalnego, jest raczej zestaw trade-offów zależnych od tego, gdzie i jak model jest serwowany.

Drugi wątek dotyczy alternatywnych architektur inferencji. SemiAnalysis opisał TileRT i InferenceX na kartach NVIDIA jako próbę odtworzenia charakterystyk wysokiej interaktywności, które zwykle kojarzy się z dostawcami specjalizowanego sprzętu, takimi jak Cerebras, Groq czy SambaNova. Chodzi konkretnie o obsługę batch size równego jeden, rozdzielone serwowanie oraz separację faz prefill i decode. To sygnał, że różnica między "ogólnym" GPU a specjalizowanym akceleratorem coraz bardziej rozmywa się na poziomie software'u serwującego, nie samego krzemu.

Trzeci element to po prostu przypomnienie, że "ten sam model" nie oznacza tego samego doświadczenia użytkownika. Artificial Analysis zapowiedziało analizę tego, dlaczego szybkość generowania tokenów może różnić się nawet piętnastokrotnie między dostawcami tego samego modelu, a QuixiAI zaraportowało konkretne liczby dla DeepSeek V4 Flash na czterech kartach A100 z SlimServe: 175 tokenów na sekundę dla pojedynczego zapytania i 1000 tokenów na sekundę przy 64 równoległych zapytaniach.

**Key takeaways:**
- DSpark daje 2,45 do 2,55 razy większy throughput niż baseline, DFlash 1,96 do 2,09 razy, na tym samym modelu i tej samej infrastrukturze
- Przewaga DSparka wynika ze struktury semi-autoregresyjnej i schedulera świadomego sprzętowo
- TileRT i InferenceX próbują odtworzyć charakterystyki specjalizowanych akceleratorów na standardowych kartach NVIDIA
- Szybkość generowania tokenów może różnić się nawet piętnastokrotnie między dostawcami tego samego modelu
- SlimServe na DeepSeek V4 Flash osiągnął 175 tok/s dla jednego zapytania i 1000 tok/s przy 64 równoległych

**Why do I care:** Dla architekta systemów to przypomnienie, że wybór dostawcy inferencji jest osobną decyzją od wyboru modelu i potrafi zmienić koszty i latencję bardziej niż sam wybór modelu. Jeśli różnica między dostawcami sięga piętnastu razy, to oznacza, że zespół, który podpisał kontrakt z pierwszym lepszym providerem bez benchmarków własnego ruchu, płaci realną cenę tej decyzji każdego miesiąca. Warto traktować warstwę serwowania modelu jako pełnoprawny element architektury, a nie szczegół implementacyjny, który "po prostu działa" tak samo u każdego.

**Link:** [AINews: Muse Glimmer and Spark: Open Weights return Personal Superintelligence promise](https://www.latent.space/p/ainews-muse-glimmer-and-spark-open?publication_id=1084089&post_id=210704241&isFreemail=true&triedRedirect=true)

## Wideo open-weight nabiera tempa wokół MiniMax H3

**TLDR:** MiniMax H3 utrzymuje silny rozwój ekosystemu wokół otwartego modelu wideo, z nowymi optymalizacjami kwantyzacji, wsparciem LoRA, implementacją Metal od antireza i integracjami w ComfyUI oraz MLX. Google i fal rozwijają równolegle własne narzędzia do generowania i edycji wideo z wielu ujęć.

**Summary:** Otwarty model wideo MiniMax H3 działa jako case study tego, co dzieje się, kiedy społeczność dostaje realny dostęp do wag modelu, a nie tylko do API. Firma pokazała nowe prace nad kwantyzacją, odciążaniem pamięci, technikami Context-IR i wdrożeniem na konsumenckich kartach graficznych w ramach livestreamu poświęconego ComfyUI. To, co jednak najbardziej rzuca się w oczy, to tempo reakcji społeczności: wsparcie dla LoRA, implementacja pod MLX i optymalizacje pod ComfyUI powstały szybko i niezależnie od samego producenta modelu. Osobnym, ale znaczącym epizodem jest szybka implementacja w Metal napisana przez antireza, którą sama MiniMax pochwaliła publicznie jako przykład bezpośredniej korzyści z otwartych wag.

Równolegle rozwija się szerszy ekosystem narzędzi kreatywnych. Google zaprezentował zastosowania Gemini Omni Flash do generowania i edycji wideo z wielu ujęć kamery, a fal dodał zarówno trening LoRA dla MiniMax H3, jak i endpointy dla Seedance 2.5. To, co łączy te ogłoszenia, to postępująca kompozycyjność stosu kreatywnego: obrazy referencyjne, audio, kontrola pierwszej i ostatniej ramki oraz fine-tuning LoRA są teraz traktowane jako standardowe cegiełki, a nie jako specjalne demo na konferencję.

Na marginesie tego samego dnia pojawił się też Dyna-2 od Dyna Robotics, model świata i akcji trenowany na milionie godzin ludzkiego wideo, z twierdzeniem o nowych prawach skalowania: uczenie na ludzkim wideo przenosi się na dane robotyczne, których model wcześniej nie widział, a wybór funkcji celu ma znaczenie dla transferu między różnymi typami ciał robotów. Sakana AI z kolei rozszerzyła swoje RSI Lab wokół tematu "Physical AI" i modeli świata dla agentów działających w realnym świecie. To wątki bardziej odległe od codziennej pracy frontendowej, ale pokazują, że ten sam wzorzec, otwarte wagi plus szybka reakcja społeczności, powtarza się teraz również poza samym tekstem i obrazem.

**Key takeaways:**
- MiniMax H3 zyskuje szybkie wsparcie społeczności: LoRA, MLX, optymalizacje ComfyUI i implementacja Metal od antireza
- Ekosystem narzędzi kreatywnych wokół wideo staje się coraz bardziej kompozycyjny: referencje, audio, kontrola ramek i LoRA jako standardowe elementy
- Google rozwija Gemini Omni Flash pod kątem generowania i edycji wideo z wielu ujęć
- Dyna-2 od Dyna Robotics trenowany na milionie godzin ludzkiego wideo pokazuje transfer wiedzy na dane robotyczne

**Why do I care:** To akurat obszar, który dotyka mnie mniej zawodowo niż warstwa agentowa czy inferencyjna, ale warto śledzić go z jednego powodu: tempo, w jakim społeczność dorzuca LoRA, implementacje pod inny sprzęt i integracje w narzędziach typu ComfyUI, jest dokładnie tym samym wzorcem, który za rok czy dwa zobaczymy w narzędziach do generowania interfejsów albo kodu frontendowego z otwartych wag. Kto teraz obserwuje, jak szybko otwarty model wideo dostaje community-driven ulepszenia, ten będzie wiedział, czego się spodziewać, kiedy podobny model trafi do jego własnej niszy.

**Link:** [AINews: Muse Glimmer and Spark: Open Weights return Personal Superintelligence promise](https://www.latent.space/p/ainews-muse-glimmer-and-spark-open?publication_id=1084089&post_id=210704241&isFreemail=true&triedRedirect=true)
