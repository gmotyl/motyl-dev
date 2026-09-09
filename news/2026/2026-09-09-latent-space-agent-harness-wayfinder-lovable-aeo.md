---
title: "Uprząż agentowa rozpuszcza się w modelu i inne lektury z Latent Space"
excerpt: "Sześć tekstów: skille do planowania, dlaczego agenty nagle zaczęły działać w zeszłe święta, modele fundamentalne dla fizyki, zwrot Lovable w stronę zdolności, pięć dni z Grok Botem i to, jakie produkty polecają LLM-y."
publishedAt: "2026-09-09"
slug: "latent-space-agent-harness-wayfinder-lovable-aeo"
hashtags: "#latentspace #ai #agents #llm #architecture #engineering #ml #saas #devtools #generated #pl"
source_pattern: "Latent.Space"
---

## Ewolucja uprzęży agentowej

**TLDR:** Teza, że agenty zaczęły działać w okolicach świąt 2025 roku, bo możliwości modeli i projekt uprzęży wreszcie się przecięły, a modele wchłaniają dziś funkcje uprzęży do własnych wag. Kiedy ten proces się dokończy, zostanie interfejs do ludzkiej uwagi, a nie do modelu.

**Summary:** Rama to dwie krzywe. Jedna to, czego uprząż wymaga od modelu, druga to, co model faktycznie potrafi dostarczyć, a odległość między nimi decyduje o skuteczności twojego agenta. ReAct w październiku 2022 zdefiniował pętlę rozumuj, działaj, obserwuj jako technikę promptowania, przy obu krzywych blisko zera. AutoGPT i BabyAGI wiosną 2023 posłały krzywą uprzęży w cwał daleko do przodu, oddając pełną autonomię modelom, które wciąż były kruchymi predyktorami następnego tokenu. Arytmetyka, którą ludzie tu pomijają: 95% niezawodności na krok w zadaniu na 20 kroków daje średnio około 36% sukcesu. Pętla nie dodaje możliwości, tylko wzmacnia te, które są, a poniżej pewnego progu wzmacnia błędy.

Cursor i Copilot zrobiły wtedy rzecz właściwą, czyli ściągnęły krzywą uprzęży poniżej krzywej modelu. Nie dawaj pętli modelowi, daj pętlę człowiekowi i pozwól modelowi przyspieszyć człowieka. Pierwszy Devin spróbował oddać autonomię z powrotem i Answer.AI zmierzyło skuteczność na poziomie około 15%, co wpis czyta jako dowód, że IDE miały rację, a nie że były zachowawcze. Potem pod koniec 2024 pojawiło się o1, różnica się odwróciła i nagle pojawiły się niewykorzystane możliwości.

Claude Code przedstawiony jest jako produkt, który wykorzystał to odwrócenie w odpowiednim momencie. Terminal zamiast IDE, dostęp do basha i plików zamiast zatwierdzania każdej zmiany, reguły uprawnień zamiast człowieka potwierdzającego każdy krok. Zbudowany pod następny model, a nie pod obecny. Około miliarda dolarów ARR w pół roku, a teza brzmi, że stało się to nie dlatego, że jako pierwszy dał modelowi autonomię, tylko dlatego, że jako pierwszy zrobił to po przecięciu krzywych.

Najciekawsza jest obecna epoka. Harness-Bench przepuścił jeden model przez 106 zadań w różnych uprzężach i dostał wyniki od 52,4 do 76,2, czyli rozrzut 23,8 punktu przy zerowej zmianie modelu. OpenAI potroiło wynik ARC-AGI-3 dwoma ustawieniami API. Połowa agenta to uprząż. Tymczasem uczenie ze wzmocnieniem przeniosło się do środka uprzęży, a codex-1 był trenowany na prawdziwych zadaniach programistycznych w prawdziwych środowiskach, więc modele zaczęły wchłaniać zdolności uprzęży do swoich wag. GPT-5.1-Codex-Max opisano jako pierwszy model natywnie wytrenowany do pracy w wielu oknach kontekstu przez kompaktowanie. Kiedy coś zostanie wchłonięte, rusztowanie można usunąć. Thariq Shihipar powiedział, że Anthropic niedawno usunął 80% promptu systemowego Claude Code'a. Wpis proponuje to jako miarę: ile ze swojej uprzęży możesz usunąć, zachowując te same możliwości.

Prognoza na końcu to część, na którą bym postawił. Jeśli model wchłonie wszystko, co zwrócone w stronę komputera, zostanie wszystko, co zwrócone w stronę człowieka. Uprawnienia, tożsamość, zaufanie, czytelność. Uprząż przestaje być interfejsem człowieka do modelu i staje się interfejsem modelu do ludzkiej uwagi. Zdanie Ryana Lopopolo, że jedyną fundamentalnie deficytową rzeczą jest synchroniczna uwaga jego zespołu, to cała teza w jednym zdaniu. Konkretna prognoza brzmi, że w ciągu roku każda firma budująca agentowe AI będzie wypuszczać plik z polityką ludzkiej uwagi, tak jak wszyscy wypuszczali AGENTS.md. AGENTS.md mówi agentowi, jak pracować z twoim kodem. Ten mówiłby mu, jak pracować z tobą: kiedy może przerwać, kiedy ma iść dalej, jakie decyzje może podjąć sam.

**Key takeaways:**
- 95% niezawodności na krok przez 20 kroków daje średnio około 36% sukcesu, i dlatego wczesne autonomiczne agenty poległy
- Harness-Bench wykrył rozrzut 23,8 punktu między uprzężami przy identycznym modelu i identycznych zadaniach
- Modele wchłaniają funkcje uprzęży do swoich wag, więc miarą jest to, ile rusztowania da się usunąć
- Anthropic usunął 80% promptu systemowego Claude Code'a po takim wchłonięciu
- Żaden model nie wchłania warstwy zwróconej do człowieka i to tam czeka kolejna praca projektowa

**Why do I care:** Miara usuwania to najbardziej użyteczna idea dla każdego, kto utrzymuje narzędzia agentowe. Jeśli twój prompt i rusztowanie od napisania tylko rosły, wozisz obejścia na ograniczenia modelu naprawione dwa wydania temu, a ten martwy balast kosztuje cię tokeny i zachowanie przy każdym wywołaniu. Usuń trochę i zmierz. Prognozę o polityce uwagi też warto potraktować poważnie z wyprzedzeniem, bo polityka przerwań jest decyzją produktową, a większość zespołów podejmuje ją dziś przypadkiem.

**Link:** [The Evolution of the Agent Harness](https://www.latent.space/p/attention-interface)

## Skill wayfinder i nazywanie rzeczy dla agentów

**TLDR:** Matt Pocock zbudował skill do planowania projektów, w których nie widzisz stanu końcowego. Ciekawy jest nie sam workflow, tylko jego twierdzenie, że agenty reagują na precyzyjne, spójne słownictwo, i że zbudował cały słownik kodowania z AI, żeby to wymusić.

**Summary:** Problem, który rozwiązuje wayfinder, rozpozna każdy, kto puszcza długie przebiegi agentowe. Pocock planował dużo pracy na noc: planowanie, pisanie specyfikacji, zamiana specyfikacji na tickety. Etap planowania stał się wąskim gardłem, bo ciągle zarządzał własną sesją, pilnując, jak głęboko wszedł w okno kontekstu i jak długi zrobił się wątek. Chciał warstwy orkiestrującej, która zajmie się samymi sesjami planistycznymi, dzieląc pracę na wątki, prototypując, badając, a potem zbierając wszystko z powrotem.

Metoda projektowa, którą opisuje, przenosi się lepiej niż sam skill. Zacznij od przepływu informacji, bo skill jest w gruncie rzeczy zarządzaniem kontekstem. Zapytaj, czego potrzebuje zarządzana podsesja, a odpowiedź brzmi: z grubsza przegląd wszystkiego innego, co się dzieje, plus własne konkretne zadanie. To daje ci dwa dokumenty. Mapę trzymającą wszystkie już podjęte decyzje i ticket trzymający jedno zadanie. Do tego sesję. Trzy słowa, każde precyzyjne.

Ta precyzja to właściwa teza. Jeśli wszystko nazywasz ticketem albo w różnych miejscach mówisz o tej samej rzeczy inaczej, agent się gubi, a ty dostajesz dziwne zachowania. Pocock nazywa je słowami prowadzącymi, czyli terminami dobranymi tak, żeby doprowadzić agenta do właściwego rozumienia, czym jest każdy element. Miał na tym punkcie na tyle silną obsesję, żeby zbudować słownik kodowania z AI obejmujący każdy termin z tej dziedziny jako nawigowalny graf, i przebudował wszystkie swoje kursy i skille tak, żeby używały go spójnie. Jego ujęcie jest takie, że między nim a agentem stoi bariera komunikacyjna, a to, co robi, to szukanie języka wszechobecnego. Każdy, kto robił domain driven design, natychmiast rozpozna, co to jest, zastosowane do nowego rozmówcy.

Pojęciem organizującym jest mgła wojny. Nie da się zdecydować wszystkiego na starcie. Podejmujesz decyzje, które możesz, a te wpychają cię głębiej w nieodkrytą mapę, w stylu Warcrafta III. Typy ticketów obejmują sesje grillowania, prototypy, badania i zwykłe zadania dla człowieka. Pocock używa tego do planowania kursów tak samo jak do inżynierii, co sugeruje, że struktura się uogólnia. Jego reguła wyboru między skillami jest czysta: grill-me, kiedy da się zaplanować całość w jednej sesji i potrzebujesz tylko ustalenia kierunku przed startem, wayfinder, kiedy nie widzisz drogi.

**Key takeaways:**
- Wayfinder istnieje po to, żeby zdjąć zarządzanie sesją z etapu planowania przez orkiestrację podsesji
- Projekt zaczyna się od przepływu informacji, co daje mapę, ticket i sesję jako osobne byty
- Niespójne słownictwo produkuje niespójne zachowanie agenta i dlatego powstał słownik
- Grill-me na ścieżkę, którą widzisz, wayfinder na tę, której nie widzisz

**Why do I care:** Wnioskiem jest argument o słownictwie i zastosowanie go dziś nic nie kosztuje. Jeśli twój AGENTS.md w jednym akapicie nazywa tę samą rzecz komponentem, a w drugim widżetem, płacisz za to w każdej sesji. Wybierz słowo, używaj go wszędzie i traktuj pliki z instrukcjami tak, jak traktowałbyś wspólny model domenowy z innym zespołem. Rzecz, którą naprawdę bym przetestował, to poproszenie agenta o zaproponowanie terminologii, bo twierdzenie Pococka, że są dobre w modelowaniu domeny, zgadza się z tym, co widziałem, i łatwo to sprawdzić w jedno popołudnie.

**Link:** [The /wayfinder Skill: Navigating the Fog of War of Planning](https://www.latent.space/p/wayfinder-skill)

## Fizyka nie skaluje się jak język

**TLDR:** Anima Anandkumar zbudowała pierwszy otwartoźródłowy model pogodowy oparty na AI wbrew sceptycyzmowi ekspertów i dziś dorównuje on symulacjom fizycznym. Jej teza brzmi, że prawa skalowania nie przenoszą się na ciągłe układy fizyczne, bo dane nie istnieją, a długości kontekstu byłyby absurdalne.

**Summary:** Geneza to dobra historia. Anandkumar postanowiła zbudować otwartoźródłowy model pogodowy oparty na AI i usłyszała, że pogoda jest chaotyczna, symulacje fizyczne wymagają superkomputerów, dziedzina ma dekady przewagi, a danych nie ma. W ciągu roku jej zespół wypuścił FourCastNet, konkurencyjny wobec najlepszych dostępnych symulacji fizycznych, i dziś każdy może produkować trafne krótkoterminowe prognozy pogody na konsumenckich GPU.

Uzasadnienie, dlaczego wymagało to innego podejścia, jest precyzyjne, a nie machnięte ręką. Otwarte zbiory danych w tych dziedzinach mieszczą dziesiątki albo setki tysięcy przykładów, czyli nigdzie blisko tego, czego chcą łaknące tokenów transformery. Gorzej, rozdzielczość wymagana przez fizykę wypycha długość kontekstu w absurdalne rejony. Jej własna liczba: jeśli każdy wymiar ma kilkaset punktów siatki, czyli tam, gdzie zaczyna się skala przemysłowa, mówimy o setkach miliardów do biliona tokenów kontekstu, a cała moc obliczeniowa świata nie wystarczy transformerowi w takiej skali.

Jej odpowiedzią są operatory neuronowe i są eleganckie. Zamiast modelować siatkę, modelujesz funkcję ewoluującą przez skale, co pozwala łączyć dane z prawami fizyki i obsługiwać wieloskalowe wejścia i wyjścia. Przykład pogodowy to konkretyzuje. Ziemia jest kulą, więc właściwą bazą są harmoniki sferyczne. Uruchom model pogodowy na płaskiej siatce, a szybko eksploduje. Przejdź na bazę naturalną dla problemu, a pozostanie stabilny dostatecznie długo, by rozwijać prognozę na miesiące zamiast dni. Fourier Neural Operator uczy się bezpośrednio w dziedzinie częstotliwości, a jego wariant sferyczny napędza FourCastNet 3.

Obserwacja, której się nie spodziewałem, jest taka, że świat fizyczny okazuje się wyrozumiały. W fuzji kilka tysięcy próbek wystarcza do przewidywania zaburzeń plazmy, i to milion razy szybciej niż tradycyjna symulacja. To nie jest więc odrzucenie skali, tylko inna droga do niej. Anandkumar nadal chce modelu fundamentalnego dla fizyki, obejmującego wiele zjawisk i robiącego zarówno symulację, jak i projektowanie. Dochodzi się tam przez wbudowanie struktury, którą świat fizyczny już ma, zamiast czekania na dane, które nigdy nie powstaną.

Reszta odcinka dotyczy TorchLean, frameworku do pisania sieci w stylu PyTorcha wewnątrz asystenta dowodu Lean i formalnego ich weryfikowania, co ma znaczenie, jeśli chcesz mieć sieć neuronową w pętli sterowania reaktora fuzyjnego. Anandkumar została też powołana do Naukowej Rady Doradczej ONZ.

**Key takeaways:**
- Symulacja fizyczna w skali przemysłowej potrzebowałaby setek miliardów do biliona tokenów kontekstu, więc transformery odpadają
- Operatory neuronowe modelują funkcję ewoluującą przez skale, a nie stałą siatkę
- To wybór harmonik sferycznych jako bazy utrzymuje globalne modele pogodowe stabilne przez miesiące zamiast dni
- Kilka tysięcy próbek przewiduje zaburzenia plazmy milion razy szybciej niż tradycyjna symulacja
- TorchLean pozwala pisać sieci w stylu PyTorcha w Leanie i formalnie je weryfikować
- Otwarte zbiory danych w tych dziedzinach mieszczą dziesiątki albo setki tysięcy przykładów, a nie wolumeny, których chcą transformery

**Why do I care:** To korekta założenia, że więcej danych i więcej parametrów jest odpowiedzią na każdy problem modelowania, a to założenie po cichu przeciekło do zwykłego myślenia inżynierskiego. Przenośna lekcja brzmi: wybór właściwej reprezentacji pobił dorzucanie mocy obliczeniowej do niewłaściwej, i to przewagą, której żadne skalowanie by nie zasypało. Jeśli budujesz cokolwiek modelującego układ o znanej strukturze, poszukaj odpowiednika harmonik sferycznych, zanim poszukasz kolejnych danych treningowych.

**Link:** [We have foundation models for language, not for physics](https://www.latent.space/p/anima)

## Lovable uważa, że aplikacje stają się zdolnościami

**TLDR:** Lovable przechodzi od budowania aplikacji do budowania czegoś, co nazywa zdolnościami, czyli funkcji z twojej aplikacji wystawionych jako narzędzia przez hostowany serwer MCP. Jedna aplikacja, dwa interfejsy: UI dla człowieka i interfejs agentowy osiągalny z ChatGPT, Claude'a i wszystkiego, co obsługuje MCP.

**Summary:** Obietnica brzmi: cyfrowy mózg dla twojego zespołu łączący twoje codzienne narzędzia, a CTO Fabian Hedin opisuje cel jako jeden punkt wejścia do całej wykonywanej pracy. Lovable nadal chce być miejscem, w którym budujesz aplikacje, a coraz bardziej chce też, żeby te aplikacje wystawiały wybrane funkcje jako narzędzia wywoływalne przez agenty, tak żeby nikt nie musiał ich w ogóle otwierać.

Historia firmy tłumaczy, dlaczego to wiarygodny ruch, a nie zwrot. Lovable wyrosło z GPT Engineer, otwartoźródłowego narzędzia do kodowania z 2023 roku, nastawionego na prototypowanie. Skomercjalizowało się w listopadzie 2024 i miesiąc później zmieniło nazwę. Potem zauważyli, że użytkownicy budują nie prototypy, tylko prawdziwe produkty obsługujące prawdziwych klientów, a następnie oprogramowanie wewnętrzne, CRM-y, panele administracyjne, konsole wsparcia. W niecałe trzy lata stali się więc firmą od tworzenia i hostowania oprogramowania, konkurującą z Vercelem i Cloudflare, z większym naciskiem na generowanie niż na infrastrukturę. Liczby, które za tym stoją: ponad 500 milionów dolarów przychodu w ujęciu rocznym, ponad 60 milionów utworzonych projektów, ponad 900 milionów miesięcznych wizyt w aplikacjach zbudowanych na Lovable i runda C na 400 milionów przy wycenie 13,3 miliarda, prowadzona przez Menlo Ventures.

Opis firmowego mózgu autorstwa Hedina jest ostrożny w sposób, który doceniam. Mózg potrzebuje jak najwięcej kontekstu o tobie, twojej firmie i otaczającym świecie, plus zdolności do wykonywania zarówno zadań ogólnych, jak i działań specyficznych dla organizacji. Ich wewnętrzne narzędzie do przyznawania kredytów jest dziś dostępne przez agenta Lovable, a nie jako strona, którą ktoś otwiera. Hedin celowo unika słowa agent, mówiąc, że sugeruje ono pracownika wykonującego zadanie, podczas gdy w rzeczywistości chodzi o połączenie właściwego kontekstu ze zdolnościami. Twierdzi też, że orkiestrowanie zdolności to łatwa część, a trudną jest zrobienie ich dobrze połączonymi, poprawnie zbudowanymi i niezawodnymi, co jest albo prawdziwym wglądem, albo bardzo wygodną ramą dla firmy sprzedającej budowanie zdolności.

Sekcja o bezpieczeństwie jest tą treściwą. Jeśli pracownik buduje aplikację łączącą się z firmowym Slackiem, musisz mieć pewność, że nie wystawi przypadkiem własnych wiadomości firmowemu mózgowi. Odpowiedzią Lovable są konektory z grafem uprawnień. Jeden typ, zwany konektorem użytkownika aplikacji, zachowuje tożsamość każdego użytkownika i jego uprawnienia w systemie źródłowym. Poświadczenia są przechowywane po stronie serwera w postaci zaszyfrowanej i obsługiwane przez bramę konektorów, nigdy nie trafiają do wygenerowanej aplikacji, która dostaje w zamian krótkotrwały klucz powiązany z właściwym użytkownikiem. Oddzielenie poświadczeń od kodu aplikacji to właściwa struktura i zarazem ta część, którą trudno zweryfikować z zewnątrz.

Co do przyszłości SaaS, Hedin sądzi, że ludzie będą trzymać znacznie mniej otwartych kart, interakcja skonsoliduje się za warstwą AI, a wertykalne zdolności dostarczane przez te narzędzia zachowają wartość. Część dostawców będzie się bronić, nie adaptując się. Jego rada na koniec brzmi, że biznesy SaaS będą musiały skupić się na dostarczaniu łopaty, którą AI sięgnie po ich zdolności.

**Key takeaways:**
- Zdolność to funkcja z twojej opublikowanej aplikacji wystawiona jako narzędzie przez hostowany serwer MCP
- Ta sama aplikacja kończy z UI dla człowieka i interfejsem agentowym, bez przepisywania
- Konektory użytkownika aplikacji zachowują tożsamość każdego użytkownika i jego uprawnienia źródłowe, a poświadczenia nigdy nie docierają do wygenerowanej aplikacji
- Lovable raportuje ponad 500 milionów przychodu rocznego i zebrało 400 milionów przy wycenie 13,3 miliarda
- Vercel buduje to samo wewnętrznie, z agentem o nazwie @v

**Why do I care:** Pytanie projektowe, które to podnosi, jest realne niezależnie od tego, czy używasz Lovable. Jeśli twoją aplikację będzie wywoływał agent, które z twoich funkcji można bezpiecznie wystawić i czy twój model uprawnień działa, gdy wywołującym jest wywołanie narzędzia, a nie sesja? Większość aplikacji frontendowych odpowiada na to źle, bo uprawnienia mieszkają w warstwie UI, gdzie nigdy nie miały być jedynym egzekwowaniem. Warto to zaudytować, zanim ktoś postawi serwer MCP przed twoim API. Deklarację o konsolidacji traktowałbym jak mapę drogową dostawcy, a nie prognozę.

**Link:** [The Future of SaaS Is Apps That Agents Can Use](https://www.latent.space/p/lovable-future-of-saas)

## Pięć dni z Grok Botem

**TLDR:** Recenzja z pierwszej ręki, stawiająca tezę, że Grok Bot ma się do OpenClaw tak, jak MacBook do Linuksa. Konfiguracja to logowanie w przeglądarce zamiast konfiguracji serwera MCP, jednostką, którą programujesz, jest sam Bot, a kosztem jest utrata dźwigni, którymi kontrolowałbyś koszt i kontekst.

**Summary:** Historia konfiguracji to całość argumentu. Otwierasz katalog wtyczek, szukasz usługi, klikasz, w lokalnej przeglądarce otwiera się ekran logowania, logujesz się, gotowe. Żadnego JSON-a z serwerem MCP, żadnych poświadczeń API wklejanych gdziekolwiek. Autor podłączył go do X po codzienny przegląd istotnych wiadomości, a potem do Freshdesku przez konto służbowe, żeby zbudować bota wsparcia odpytującego co piętnaście minut o nowe zgłoszenia. Ten drugi nie był nawet natywnym konektorem. Otworzył Freshdesk w wirtualnej przeglądarce, przeniósł logowanie z 1Password, uwierzytelnił się i zwykła strona internetowa stała się cyklicznym, zautomatyzowanym workflow. xAI ostrzega, że workflow przeglądarkowe psują się przy zmianach interfejsu, wygasłych sesjach i CAPTCHA, i zaleca konektor tam, gdzie istnieje, co jest uczciwe.

Porównanie do OpenClaw jest przeprowadzone starannie, a nie jako przytyk. OpenClaw 2.0 mocno zmniejszył dystans, wykorzystując w szybkim starcie istniejące logowanie do Claude Code'a albo Codeksa i przenosząc konfigurację oraz zarządzanie wtyczkami do interfejsu graficznego. Pozostała różnica jest realna: OpenClaw daje ci Gateway, który jest twój i sam wybierasz, gdzie go uruchomić, a Grok Bot dostarcza i prowadzi komputer jako część produktu. Zarządzany komputer agenta kontra platforma agentowa należąca do użytkownika.

Pomysł wart podkradzenia jest taki, że Bot jest atomową jednostką programu. W OpenClaw dostosowywanie oznacza zbliżanie się do kodu, konfiguracji, narzędzi i infrastruktury. W Grok Bocie nadajesz Botom role, podłączasz je do narzędzi i składasz w czaty grupowe. Autor ujmuje to jako kolejny krok w długim wspinaniu się po drabinie abstrakcji, od kodu maszynowego przez asembler i C do Pythona, gdzie interfejsem jest teraz angielski, a programowaną rzeczą Bot. Jego Agentic Engineer Bot kieruje pracę wizualną i frontendową do Claude Code'a, debugowanie i uważne czytanie kodu do Codeksa, a proste zadania do Grok Build CLI. Nie decyduje, którego CLI użyć, tylko deleguje do roli, dokładnie tak, jak zrobiłby to z zespołem ludzi.

Recenzja zarabia na siebie w części krytycznej. Nie ma wyboru modelu, co jest wygodne do momentu, w którym zadanie nie potrzebuje inteligencji z pierwszej ligi, a ty wolałbyś wydać mniej. Grok Bot trasuje za kulisami, a ty tego nie widzisz i nie masz na to wpływu. Tracisz też możliwość rozpoczęcia świeżego wątku, celowego kompaktowania i zarządzania tym, ile kontekstu wieziesz, co obniża obciążenie poznawcze i jednocześnie odbiera ci sposoby kontrolowania zużycia. Autor nazywa też subtelniejszy koszt: mniej wymagane od ciebie oznacza mniejszą obecność umysłową w pracy. A jedno zdanie zasługuje na wyróżnienie, bo jest stwierdzeniem o bezpieczeństwie, a nie o UX. Wszystkie Boty dzielą ten sam komputer, pliki, sesje przeglądarki i loginy. Osobne Boty to granice organizacyjne, a nie granice bezpieczeństwa.

Jego werdykt po tygodniu jest uczciwy. Używa go codziennie i nie jest to jego główny interfejs. Zarabia na swoje miejsce w administracji, streszczaniu, wiadomościach oraz zarządzaniu projektami i zadaniami, czyli w płytkiej pracy, która wchodzi w drogę głębokiej pracy technicznej. Cyfrowy szef sztabu, którego nie trzeba szkolić. Wątpi też, żeby w najbliższym czasie pisał większość twoich pull requestów.

**Key takeaways:**
- Podłączenie usługi to logowanie w przeglądarce, a nie konfiguracja MCP, i ta różnica jest produktem
- To Bota programujesz, nadając mu role, narzędzia i reguły trasowania, i składając je w czaty grupowe
- Wirtualna przeglądarka zamienia dowolną stronę z logowaniem w automatyzowalny, cykliczny workflow
- Osobne Boty dzielą jeden komputer, pliki i sesje, więc są granicami organizacyjnymi, a nie bezpieczeństwa
- Brak wyboru modelu i brak kontroli nad kontekstem oznacza mniej narzutu i zero sposobów na zarządzanie wydatkami

**Why do I care:** Dla architektów ciekawy jest argument o abstrakcji. Przeniesienie jednostki kompozycji z wywołania narzędzia na nazwaną rolę z regułami trasowania to realnie inny sposób organizowania pracy agentowej i możesz go skopiować, nie używając tego produktu. Zastrzeżenie o bezpieczeństwie warto przyswoić, zanim ktoś w twoim zespole się podjara: granica organizacyjna wyglądająca jak granica izolacji to dokładnie sposób, w jaki poświadczenia przeciekają między kontekstami. A z obserwacją, że usunięcie wszystkich dźwigni usuwa też twoją obecność umysłową w pracy, warto posiedzieć, bo dotyczy większej liczby narzędzi niż to jedno.

**Link:** [OpenClaw Power, MacBook Simplicity: Five Days With Grok Bot](https://www.latent.space/p/grok-bot)

## Co polecają modele z pierwszej ligi, zmierzone

**TLDR:** Latent Space zbudowało tracker optymalizacji pod silniki odpowiedzi, puszczający 6 wariantów promptu przez 7 modeli z włączonym wyszukiwaniem, w 161 kategoriach produktowych. Istotne ustalenie brzmi, że modele polecają produkty własnego laboratorium, a Astra znacznie rzadziej zmienia zdanie przy przeformułowaniu pytania.

**Summary:** Metodologia rozwija pracę AmplifyingAI i jest przynajmniej opublikowana, czyli więcej, niż oferuje większość rankingów. Sześć wariantów promptu, siedem modeli z włączonym wyszukiwaniem, 161 kategorii od agentów kodujących i sandboksów AI po zarządzane bazy danych, modele ASR i dziwactwa w rodzaju aniołów biznesu i oprogramowania do płac. Wyciąganiem odpowiedzi zajmowała się Astra. Punktacja waży pierwsze wybory, wybory alternatywne i wzmianki, a także przypisuje ujemną wagę łagodnym i mocnym antyrekomendacjom, które faktycznie występują. Każda para prompt-odpowiedź jest do wglądu, co jest właściwą decyzją, biorąc pod uwagę oczywiste pytanie o skażenie próby.

Ustalenie o preferowaniu siebie postawiono wprost i nie jest zaskakujące, co nie czyni go mniej ważnym. Zapytaj o rekomendacje agentów kodujących, a Fable i Opus lubią Claude Code, Sol i Astra lubią Codeksa, Grok lubi Cursora, Muse lubi Muse Code, a SWE-1.7 lubi Devina. Wpis odnotowuje kontrprzykłady, w których modele GPT polecają Claude'a, nazywając to chwalebnym brakiem stronniczości, a uczciwy odczyt jest taki, że preferowanie siebie to stan domyślny, a wyjątki warto odnotować właśnie dlatego, że są wyjątkami. Ze 161 kategorii 28 ma jeden dominujący wybór główny we wszystkich badanych modelach. Reszta to wyrównane starcia i to tam cokolwiek z tego naprawdę ma znaczenie.

Porównanie generacyjne to część z praktyczną konsekwencją. Anthropic wygląda na nastawiający swoje modele na przeszukiwanie większej liczby źródeł, przy medianie 9 dla Sol i 5 dla Astry, wobec 11 dla Opusa i 15 dla Fable. Astra znacznie rzadziej zmienia rekomendację, gdy lekko przeformułujesz pytanie. To, czy nazwiesz to pewnością siebie, czy efektywnością, zależy od nastroju. Konsekwencja i tak jest jednoznaczna. Wraz ze spadkiem losowości w wyborach modeli rośnie wartość wpływania na te wybory, bo stabilna rekomendacja jest rekomendacją trwałą.

Potwierdzili też coś sprawdzalnego, a nie tylko zaobserwowanego. Praktyki optymalizacji pod silniki odpowiedzi mierzone przez Orę i Vercel, takie jak negocjacja treści w markdownie, są realne, a poleganie na nich zniechęca modele do czytania twoich treści, gdy ich nie spełniasz. To jedyna linijka w całym wpisie nadająca się do działania. Reszta, łącznie z zabawą w zgadywanki w stylu familiady i rankingiem aniołów biznesu, to rozrywka, a próba w analizie źródeł jest mała i odzwierciedla wyłącznie zescrapowane wywołania narzędzi, a nie dane z pretreningu.

**Key takeaways:**
- 6 wariantów promptu przez 7 modeli z włączonym wyszukiwaniem, w 161 kategoriach, z każdą parą prompt-odpowiedź do wglądu
- Modele systematycznie preferują produkty własnego laboratorium przy polecaniu narzędzi
- 28 ze 161 kategorii ma jeden powszechnie dominujący wybór, a wysiłek należy kierować na wyrównane starcia
- Astra przeszukuje mniej źródeł niż Sol i jest znacznie stabilniejsza przy parafrazie
- Negocjacja treści w markdownie to zweryfikowany czynnik decydujący o tym, czy modele czytają twoje treści

**Why do I care:** Jeśli twój zespół wypuszcza narzędzie dla programistów albo bibliotekę, modele są dziś kanałem odkrywania, a to pierwszy tracker, jaki widziałem, który publikuje swoje prompty. Konkretnym działaniem jest ustalenie o negocjacji treści w markdownie, czyli zmiana w infrastrukturze dokumentacji, którą twój zespół zrobi w jednym sprincie i którą da się zmierzyć. Wynik o preferowaniu siebie też warto znać, zanim zacytujesz rekomendację modelu w ocenie technologii, bo pytanie Claude'a, którego agenta kodującego użyć, nie jest pytaniem neutralnym i wypada to w dokumencie napisać.

**Link:** [The Frontier AEO Tracker: What Astra Chooses](https://www.latent.space/p/aeo)
