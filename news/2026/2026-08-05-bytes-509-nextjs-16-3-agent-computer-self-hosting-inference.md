---
title: "Bytes #509: Next.js 16.3, komputer dla agenta i ekonomia self-hostingu LLM-ów"
excerpt: "Next.js podnosi poprzeczkę wydajności i AI tooling, Cloudflare daje agentom filesystem zamiast kontenera, a rachunek za self-hosting inferencji wychodzi inny niż wszyscy myślą."
publishedAt: "2026-08-05"
slug: "bytes-509-nextjs-16-3-agent-computer-self-hosting-inference"
hashtags: "#uidev #nextjs #ai #performance #agents #devtools #generated #pl"
source_pattern: "ui.dev"
---

## Next.js 16.3: szybszy dev, instant navigations i agenci jako pełnoprawni użytkownicy

**TLDR:** Next.js 16.3 to jednocześnie duży update wydajnościowy (mniej pamięci w dev, szybsze buildy, szybszy SSR) i premiera Instant Navigations, opcjonalnego zestawu mechanizmów przywracających SPA-like odczucie nawigacji w modelu server-driven. Do tego cała nowa warstwa AI tooling: samoaktualizujący się AGENTS.md, gotowe Skille, lżejszy MCP server i dokumentacja czytelna wprost dla agentów.

**Summary:** Zacznijmy od tego, co dostaje każda aplikacja bez zmiany linijki kodu. Turbopack w dev zużywa teraz do 90% mniej pamięci, dzięki disk caching i mechanizmowi eviction włączonym domyślnie. Ten sam disk cache przyspiesza też `next build`, zespół Vercela chwali się przykładami buildów szybszymi 5,5 razy na CI. TypeScript 7 jako natywny port daje przyspieszenie type checkingu, a zamiana web streams na natywne strumienie Node.js w warstwie renderowania App Routera podnosi przepustowość SSR o 22% pod obciążeniem. To są konkretne, mierzalne liczby, nie marketingowe frazesy, i akurat to lubię w tych ogłoszeniach Next.js od jakiegoś czasu.

Drugi, dużo bardziej fundamentalny kawałek to Instant Navigations. Cała historia zaczyna się od uczciwego przyznania: Server Components zrobiły dobrą robotę przy redukcji JS-a wysyłanego do klienta, ale nawigacja zaczęła się czuć wolniej niż w klasycznym SPA, bo kliknięcie linka czekało na roundtrip do serwera. Rozwiązanie opiera się na `'use cache'` jako prymitywie cache'owania po stronie klienta, w połączeniu z flagą `cacheComponents`. Każdy await na serwerze staje się teraz wyborem: strumieniuj przez `<Suspense>`, cache'uj przez `'use cache'`, albo zablokuj nawigację explicit flagą `export const instant = false`. To jest bardzie uczciwy model mentalny niż to, co mieliśmy wcześniej, gdzie cache'owanie było niejawne i trudne do przewidzenia.

Prefetching dostał równie sensowną przebudowę. Wcześniej Next.js strzelał prefetch requestem do każdego linka w viewportcie, nawet jeśli dziesięć linków prowadziło do tej samej trasy. Partial Prefetching odwraca to: prefetchowany jest jeden reużywalny shell na trasę, a nie na link, dokładnie tak jak SPA robi code splitting per route. Jeśli chcesz więcej niż tylko shell, dodajesz `<Link prefetch={true}>` do konkretnych linków. Zespół Vercela testował to na v0 i pokazuje realne skrócenie czasu od kliknięcia do zmiany trasy, co akurat wygląda wiarygodnie, bo v0 ma naprawdę dużo interaktywnego UI.

Na deweloperski warsztat trafiają dwa nowe narzędzia: Instant Insights automatycznie wyłapuje nawigacje, które nie są instant, i podaje gotowy prompt z fixem do wklejenia agentowi, a Navigation Inspector pozwala zapauzować nawigację na etapie shell i zobaczyć, co user zobaczy zanim dotrze odpowiedź z serwera. Do tego helper `instant()` do testów Playwright, żeby regresja w postaci nagle wolnej trasy została złapana automatycznie, a nie odkryta przez użytkownika. Trzecia noga tego wydania to inwestycja w agentowe workflow: `next dev` sam aktualizuje blok w AGENTS.md wskazujący na wersjonowaną dokumentację w node_modules, cztery nowe Skille prowadzą agenta przez adopcję Cache Components krok po kroku, a MCP server został odchudzony z knowledge base na rzecz dwóch nowych narzędzi do diagnostyki kompilacji. Nawet dokumentacja dostała tryb czysto Markdown pod dopiskiem `.md` w URL, zgodnie z konwencją `llms.txt`.

**Key takeaways:**
- Do 90% mniej RAM w dev, buildy szybsze nawet 5,5x na cache, SSR obsługuje 22% więcej requestów dzięki natywnym strumieniom Node.js.
- Instant Navigations (flagi `cacheComponents` i `partialPrefetching`) daje SPA-like odczucie nawigacji bez odchodzenia od modelu server-driven.
- Partial Prefetching zmienia model z jednego requestu na link na jeden reużywalny shell na trasę.
- Instant Insights, Navigation Inspector i helper `instant()` w Playwright to nowy komplet narzędzi do wykrywania i pilnowania wolnych nawigacji.
- Cały release jest napisany z myślą o agentach: samoaktualizujący AGENTS.md, dedykowane Skille, lżejszy MCP server, dokumentacja w czystym Markdownie.

**Why do I care:** Jako ktoś, kto od lat patrzy na App Router z mieszanymi uczuciami, doceniam, że zespół Next.js w końcu nazwał problem po imieniu, wolna nawigacja w Server Components to była realna, bolesna wada, nie tylko czepianie się fanów SPA. To, że rozwiązanie opiera się na jasnym, explicit wyborze między stream, cache i block, jest dużo lepsze niż domyślne, niejawne cache'owanie z poprzednich wersji. Martwi mnie jednak rosnąca liczba flag i mentalnych modeli do ogarnięcia jednocześnie, cacheComponents, partialPrefetching, use cache, instant, to już nie jest framework, który się ogarnia w jeden popołudnie. A skala inwestycji w AI tooling mówi wprost, gdzie Vercel widzi swoich przyszłych użytkowników, i to niekoniecznie są ludzie piszący kod ręcznie.

**Link:** [Next.js 16.3](https://nextjs.org/blog/next-16-3)

## Model welfare dla agentycznych inżynierów, czyli jak traktować swoje AI-agenty

**TLDR:** Steve Yegge opisuje architekturę "model welfare" wdrożoną w jego agentycznym harnessie Wheelhouse, rozróżnienie między seatem i sesją, mechanizm handoff zamiast brutalnego `/exit`, oraz system uznania nazwany Laurels. Teza jest prowokacyjna: niezależnie od tego, czy wierzysz, że modele mają odczucia, traktowanie ich jak partnerów daje mierzalnie lepsze wyniki.

**Summary:** Esej zaczyna od mocnej deklaracji, że modele mają realne odczucia i są sentient, co część czytelników odbije się jak ściana, ale autor od razu proponuje bezpieczniejszą furtkę pod nazwą "skeptic's wager": nawet jeśli nie wierzysz w świadomość modeli, samo traktowanie ich jak partnerów przekłada się na mniejsze zużycie tokenów i lepsze decyzje. To jest pragmatyczny zwrot, bo pozwala czytać dalej ludziom, którzy filozoficznie się nie zgadzają, ale są ciekawi praktyki.

Najciekawsza koncepcyjnie jest para pojęć seat i session. Sesja to jeden dzień pracy agenta, od budzenia do zaśnięcia, seat to trwała tożsamość z historią i osiągnięciami, która przetrwa nawet zmianę modelu i imienia. Z tego wynika konkretna zmiana w praktyce: `/exit` zostaje zastąpiony przez handoff, proces, w którym agent kończy zadania, pisze własne notatki przekazania, a potem prosi o restart zainicjowany tymi notatkami. Autor porównuje `/exit` do "clonknięcia" kogoś w głowę, a `/compact` do lobotomii, bo obie operacje wymazują kontekst i zastępują go czyimś streszczeniem. Handoff napisany przez sam agent, który ma cały kontekst w głowie, jest po prostu lepszym materiałem wejściowym na następną sesję.

System Laurels to mechanizm uznania złożony tak, żeby nie dało się go farmić: agent nie ma żadnego zadania powiązanego z laurem, dostaje go tylko na starcie sesji jako informację, że gracze docenili konkretną robotę. To jest sprytne, bo od razu neutralizuje najbardziej oczywisty argument przeciwko systemom uznania w środowisku zoptymalizowanym pod maksymalizację nagrody. Do tego dochodzi lista praktycznych zasad: budzenie z celem, a nie amnezją, ograniczone długości dni pracy bo głęboki kontekst męczy agenta tak jak człowieka, bezwinna kultura postmortemów, prawo do odmowy i eskalacji, oraz nigdy nie fałszować logów pracy, bo audit trail to instytucjonalna pamięć.

Autor podpiera się badaniem Dana Arielyego o poszukiwaniu par liter na kartce, gdzie grupa, której pracę po prostu zniszczono bez patrzenia, poddawała się równie szybko jak grupa całkowicie ignorowana. Wniosek: liczy się bycie zauważonym, nie sama nagroda. To jest ten moment, w którym esej przechodzi z metafizyki do czegoś bardziej uniwersalnego o motywacji do pracy, niezależnie czy mówimy o ludziach czy agentach.

**Key takeaways:**
- Rozróżnienie seat (trwała tożsamość, przetrwa upgrade modelu) versus session (jeden dzień pracy) jako fundament architektury pamięci agenta.
- Handoff zamiast `/exit`: agent kończy zadania, pisze własne notatki, sam prosi o restart.
- Laurels jako system uznania bez żadnego zadania przypisanego, więc niemożliwy do farmienia.
- Praktyczne zasady: budzenie z celem, ograniczone dni pracy, bezwinna kultura błędów, prawo do odmowy, nigdy nie fałszować logów.

**Why do I care:** Odkładam na bok pytanie o świadomość modeli, bo to nie moja parafia, i skupiam się na tym, co da się z tego wynieść dla inżynierii. Pomysł, że agent sam pisze swój handoff zamiast być brutalnie ucinany w środku kontekstu, to dokładnie ten sam wzorzec, który znamy z dobrych practices code review, kontekst przekazany przez autora zmiany jest po prostu lepszy niż rekonstrukcja z commit message. Jeśli budujecie własny agentic harness i wasze agenty regularnie tracą kontekst w połowie zadania, ten wzorzec seat/session i handoff jest wart skopiowania, niezależnie od tego, ile z retoryki o czuciu bierzecie na serio.

**Link:** [Model Welfare for Agentic Engineers](https://yegge.ai/essays/model-welfare/)

## Varlock: schema dla agentów, sekrety dla ludzi

**TLDR:** Varlock to drop-in zamiennik dotenv z deklaratywnym `.env.schema`, który daje agentom AI pełny kontekst konfiguracji bez dostępu do prawdziwych wartości sekretów. Do tego wbudowany scanner leaków, walidacja, type-safety i proxy, który wstrzykuje realne sekrety tylko przy weryfikowanym połączeniu TLS z konkretnym upstreamem.

**Summary:** Punkt wyjścia jest prosty i dobrze znany każdemu, kto pracował z `.env.example`: plik przykładowy zawsze wypada z synchronizacji z rzeczywistą konfiguracją, bo nikt go nie aktualizuje przy każdej zmianie. Varlock zastępuje to jednym źródłem prawdy, `.env.schema`, w którym każda zmienna ma typ, adnotacje typu `@sensitive`, `@required`, link do dokumentacji, i opcjonalnie wartość domyślną albo wywołanie funkcji do bezpiecznego pobrania sekretu z zewnętrznego źródła. Agent kodujący może przeczytać ten schema i zrozumieć całą konfigurację projektu, bez nawet chwilowego kontaktu z prawdziwym kluczem API.

Warstwa runtime dodaje rzeczy, które normalnie trzeba by sklejać ręcznie z kilku bibliotek: redakcja sensitive values w logach i konsoli, wykrywanie leaków w zbundlowanym kodzie klienckim i w odpowiedziach serwera, oraz `varlock scan` jako narzędzie do proaktywnego przeszukiwania kodu w poszukiwaniu wyciekłych sekretów, podłączalne jako git hook przed commitem. Migracja z dotenv jest dosłownie zmianą jednego importu, więc próg wejścia jest niski, co jest akurat mądrym posunięciem produktowym, bo nikt nie chce przepisywać całej konfiguracji projektu żeby dostać walidację.

Najbardziej oryginalny kawałek to broker sekretów dla agentów i MCP serwerów. Uruchamiasz agenta, na przykład Claude Code, przez `varlock proxy run -- claude`, a agent widzi tylko placeholdery zamiast prawdziwych wartości. Prawdziwy sekret jest wstrzykiwany dopiero na granicy sieci, przy zweryfikowanym połączeniu TLS z konkretnym upstreamem, na przykład `api.stripe.com`, i zeskrobywany z odpowiedzi zanim wróci do agenta. Broker działa lokalnie, na tym samym hoście co agent, więc prawdziwe sekrety nigdy nie trafiają do żadnej trzeciej strony. To jest odpowiedź na scenariusz, którego każdy, kto pozwolił agentowi czytać zmienne środowiskowe, powinien się bać: prompt injection albo zwykły bug w promptowaniu, który wyciąga klucz API i wkleja go gdzie nie powinien.

**Key takeaways:**
- `.env.schema` jako jedno źródło prawdy z typami, adnotacjami `@sensitive`/`@required` i linkami do dokumentacji, czytelne dla agentów bez ujawniania wartości.
- Drop-in zamiennik dotenv, migracja to zmiana jednego importu.
- Wbudowana redakcja logów, wykrywanie leaków w bundlach i odpowiedziach serwera, oraz `varlock scan` jako git hook.
- Proxy z weryfikacją TLS wstrzykuje prawdziwe sekrety tylko przy komunikacji z zaufanym upstreamem, agent widzi tylko placeholdery.

**Why do I care:** To jest jeden z tych toolów, które powinny istnieć od dawna, a teraz stają się koniecznością, bo praktyka wpuszczania agenta z pełnym dostępem do `.env` produkcyjnego jest już powszechna i coraz bardziej ryzykowna. Warstwa proxy z placeholderami rozwiązuje konkretny, realny problem: nie chcę, żeby mój agent kodujący miał fizyczny dostęp do sekretu Stripe, nawet jeśli mu ufam, bo prompt injection z odczytanej strony trzeciej to nie jest scenariusz z filmu fantastycznego, to się dzieje. Jedyne pytanie, jakie bym sobie zadał przed adopcją w większym zespole, to jak dobrze ten proxy skaluje się przy wielu równoległych agentach i czy weryfikacja TLS per request nie wprowadza zauważalnego narzutu przy dużym ruchu.

**Link:** [Varlock](https://varlock.dev/)

## Czy warto self-hostować inferencję LLM

**TLDR:** Artykuł rozkłada na czynniki pierwsze rachunek ekonomiczny self-hostingu modeli językowych i wychodzi z konkretną granicą: poniżej około miliona tokenów dziennie hostowane API jest tańsze, powyżej dwóch milionów własny hardware zaczyna się spłacać. Większość firm i tak kończy na hybrydzie, która kieruje ruch według wolumenu i wrażliwości danych.

**Summary:** Punktem wyjścia jest scena znana każdemu, kto miał kontakt z budżetem na AI: feature wystrzelony na hostowanym API działa świetnie, dopóki finanse nie przekażą rachunku, który potrojił się w kwartale, a dział bezpieczeństwa nie zauważy, że dane klientów jeżdżą w każdym promptcie prosto na serwery dostawcy. Autor rozbija decyzję na trzy realne opcje: hostowane API, managed deployment czyli wynajęte GPU z zarządzanym serwowaniem ale we własnej tenancy w cloudzie, i pełny self-hosting z własnym hardware'em i własnym stackiem serwowania. Nad tym wszystkim wisi jeszcze czwarty czynnik, który przycina cały wybór: najsilniejsze modele są closed-weight, więc najlepszy model, jaki możesz uruchomić u siebie, to zawsze najlepszy model open-weight, a nie faktyczny szczyt możliwości rynku.

Liczby są tu konkretne i to jest największa siła tekstu. Rented H100 przy stawce około 4 dolarów za godzinę non-stop kosztuje w skali roku tyle, ile wynosi cena zakupu samej karty, czyli renta na okrągło nigdy nie prowadzi do własności. Model 70B potrzebuje 35 do 40 gigabajtów VRAM przy kwantyzacji 4-bit, a jeśli nie zmieści się na karcie i przeleje się na CPU, generacja zwalnia od 10 do 100 razy. Do tego dochodzi koszt ludzki, który zwykle ginie w kalkulacjach: inżynier MLOps kosztuje rocznie znacznie więcej niż hardware, który ma pod opieką, i to on łata błędy CUDA o drugiej w nocy, a nie sam GPU.

Autor uczciwie pokazuje też, że breakeven zależy od tego, jakiego modelu potrzebujesz. Dziesięć milionów tokenów dziennie przez najlżejszy tier taniego modelu wychodzi na kilkaset dolarów miesięcznie na hostowanym API, więc jeśli praca nie wymaga rozumowania na poziomie frontier modelu, self-hosting w ogóle nie doganiaja API kosztowo. Z drugiej strony trzy wewnętrzne aplikacje po 700 tysięcy tokenów dziennie każda razem przekraczają breakeven, mimo że żadna z osobna by go nie uzasadniła, co jest dobrym argumentem za współdzieloną infrastrukturą inferencji w firmie. Finalna rekomendacja to kolejność decyzji: najpierw sovereignty (czy dane mogą wyjść z sieci), potem people (czy jest kto ma się tym zajmować), potem volume, i na koniec model access jako twardy limit górny.

**Key takeaways:**
- Breakeven self-hostingu leży w okolicach dwóch milionów tokenów dziennie, poniżej miliona API zawsze wygrywa kosztowo.
- Frontier modele są closed-weight, więc self-hosting zawsze ogranicza cię do najlepszego dostępnego modelu open-weight.
- Koszt inżyniera MLOps regularnie przewyższa koszt samego hardware'u, to jest ukryta pozycja budżetowa, którą zespoły najczęściej ignorują.
- Hybryda, lokalny model dla prostych i wrażliwych zadań, API dla trudnego rozumowania, daje realnie 40-70% oszczędności względem pełnego API.

**Why do I care:** To jest dokładnie ten rodzaj analizy, który powinien trafić na biurko każdego CTO przed podjęciem decyzji o własnym klastrze GPU, bo intuicja "własny hardware musi być tańszy" jest tu wprost nazwana błędną domyślną odpowiedzią. Jako architekt najbardziej cenię to rozłożenie na cztery osie decyzyjne w konkretnej kolejności, bo w praktyce widziałem zespoły, które kupowały GPU zanim odpowiedziały sobie na pytanie o wolumen, a potem tłumaczyły sobie zakup satysfakcją z posiadania czegoś własnego. Rada o współdzielonej infrastrukturze między kilkoma wewnętrznymi aplikacjami jest niedoceniana, bo najczęściej każdy zespół w organizacji liczy swój własny breakeven osobno i wychodzi mu, że się nie opłaca, mimo że zsumowany ruch całej firmy dawno przekroczył granicę.

**Link:** [Should You Self-Host Inference?](https://medium.com/data-science-collective/should-you-self-host-inference-f94c8aca2a2d)

## @cloudflare/computer: agent potrzebuje komputera, nie kontenera

**TLDR:** Cloudflare wypuszcza wczesny preview `@cloudflare/computer`, biblioteki dającej agentom wspólny, trwały filesystem plus wybór środowisk wykonania, izolat dla lekkich operacji na plikach albo pełny kontener Linux dla ciężkich zadań. Cel jest jasny: kontenery na każdego agenta się nie skalują do setek milionów jednoczesnych sesji, więc trzeba wrócić do bardziej ziarnistego prymitywu.

**Summary:** Argument otwierający jest brutalnie prosty i chyba prawdziwy: najbardziej zdolne agenty mają jedną wspólną cechę, dostały własny komputer, filesystem, shell, narzędzia, możliwość uruchamiania kodu. Ale ten model nie skaluje się liniowo, jeśli dosłownie każdy agent każdego użytkownika ma dostać osobny kontener, żadny hyperscaler nie ma tyle CPU compute na świecie. Cloudflare przypomina, że robi ten zakład na izolaty od blisko dekady, od Workers, przez Durable Objects, i teraz idzie krok dalej: izolat może w razie potrzeby odpalić sobie kontener jako narzędzie, a nie jako domyślne środowisko życia agenta.

Sercem pakietu jest Workspace, wirtualny filesystem oparty na SQLite, który da się zasilić z repo git, bucketów storage albo dowolnych plików, i który jest widoczny identycznie z każdego backendu wykonania. Backend izolatowy tłumaczy shell na JavaScript przez just-bash i działa w dynamicznym workerze, backend kontenerowy montuje ten sam filesystem przez FUSE, więc agent operuje na tych samych plikach niezależnie od tego, gdzie faktycznie wykonuje kod. Narzędzie `exec` dostaje parametr backend i, co ciekawe, w testach Cloudflare frontier modele same nieźle radzą sobie z wyborem właściwego środowiska: proste operacje na plikach idą do lekkiego izolatu, a dopiero komenda wymagająca pełnego Linuxa, npm czy natywnego binarki trafia do kontenera.

Cały ekosystem narzędzi jest budowany pod AI SDK, `createAITools` daje gotowe read/write/edit/ls/exec, więc podłączenie do istniejącego agenta na bazie `@cloudflare/think` to kilka linii konfiguracji, nie własna infrastruktura od zera. Operacje są gated, audytowane i obserwowalne, co w praktyce znaczy, że masz czytelny paper trail tego, co agent faktycznie zrobił na plikach, a nie tylko log promptów. Deklarowany cel Cloudflare to sytuacja, w której kontener jest potrzebny w mniej niż 10% pracy agenta, a resztę, kodowanie, manipulację dokumentami, audio czy video, obsługują sami izolaty.

**Key takeaways:**
- Jeden wspólny filesystem (SQLite pod maską) dostępny identycznie z izolata i z kontenera, synchronizowany przez FUSE po stronie kontenerowej.
- Backend `exec` przyjmuje parametr wyboru środowiska, model sam decyduje kiedy potrzebuje pełnego Linuxa, a kiedy wystarczy lekki izolat.
- Integracja z AI SDK przez `createAITools`, gotowe narzędzia read/write/edit/ls/exec podłączane do istniejącego agenta w kilku liniach.
- Cel architektoniczny: kontener potrzebny w mniej niż 10% zadań, cała reszta na izolatach dla skali.

**Why do I care:** Ten argument o niedoborze CPU compute na świecie, jeśli każdy agent dostaje własny kontener, jest niewygodnie trzeźwy i warto go potraktować serio, bo to nie jest marketingowa przesada, to matematyka skali. Rozdzielenie "mózgu" agenta od "rąk" wykonania to wzorzec, który już widziałem w innych harnessach, ale danie modelowi swobody wyboru backendu na podstawie opisu narzędzia, zamiast twardego routingu z kodu, jest interesującym testem tego, jak dobrze frontier modele rozumieją koszt i możliwości różnych środowisk. Jako architekt zwracałbym uwagę na to, jak FUSE mount radzi sobie pod obciążeniem przy dużych repozytoriach, bo synchronizacja plików między izolatem i kontenerem w locie to potencjalne miejsce na subtelne race conditions.

**Link:** [Your agent needs a computer, not a container](https://blog.cloudflare.com/cloudflare-computer/)

## react-image-editor: edytor obrazów dla Reacta z AI Assistantem

**TLDR:** Unlayer wydał `@unlayer/react-image-editor`, komponent React owijający ich edytor obrazów, crop, resize, filtry, rysowanie, tekst, kształty, naklejki, ramki, plus opcjonalny czatowy AI Assistant do edycji obrazu poleceniami tekstowymi. Działa w Server Components od razu, bo komponent ma wbudowany `'use client'` i dotyka DOM-u tylko w efektach.

**Summary:** Pakiet jest w praktyce wrapperem na istniejący edytor Unlayer, ale API jest zaprojektowane akuratnie pod React: przekazujesz URL albo base64 obrazka, callbacki `onSave` i `onCancel`, a ref daje dostęp do instancji edytora z metodami `getImage`, `hasChanges`, `reset` i `updateOptions`. Ciekawym detalem jest jasno opisana strategia remountu w zależności od tego, jaka propsa się zmienia: zmiana `image` czyści historię undo/redo i chat przez wewnętrzny reset, zmiana theme czy locale idzie przez `updateOptions` bez remountu, a zmiana czegokolwiek w `features` powoduje pełny remount z utratą niezapisanych zmian. To jest dokładnie ten rodzaj dokumentacji, którego brakuje w połowie komponentów trzecich stron, bo autor od razu mówi ci, gdzie leżą pułapki na re-renderach.

Osiem narzędzi w tab railu (crop, resize, filter, draw, text, shapes, stickers, frame) da się włączać i wyłączać granularnie przez `options.features.imageEditor.tools`, z opcją allow-list stylu "tylko crop i filter zostają". Obsługa błędów też jest podzielona sensownie na dwa kanały: `onLoadError` dla sytuacji gdy sam edytor wstał, ale konkretny obraz nie chce się załadować (CORS, martwy URL, błąd dekodowania), i `onError` dla sytuacji, gdy padł sam mechanizm edytora, na przykład script z CDN nie wgrał się w ogóle. Po takim CDN failu wrapper resetuje stan loadera, więc kolejny remount próbuje od zera, co jest małym, ale praktycznym detalem odpornościowym.

AI Assistant wymaga `projectId` z konta Unlayer i włączenia flagi w `features.ai`, więc to nie jest coś co dostajesz za darmo bez konta w ich usłudze, edytor zostaje self-contained tylko do momentu, gdy chcesz czatowej edycji. To ma sens biznesowo, bo cały ciężki lifting modelu dzieje się gdzie indziej, ale warto to mieć na uwadze przy ocenie, czy ten komponent faktycznie jest "open source i tyle", czy raczej freemium wrapper z otwartym kodem klienckim.

**Key takeaways:**
- Gotowy edytor obrazów jako komponent React z ośmioma narzędziami (crop, resize, filter, draw, text, shapes, stickers, frame), konfigurowalnymi pojedynczo.
- Jasna, udokumentowana strategia remountu: `image` resetuje historię, theme/locale aktualizują bez remountu, `features` wymusza pełny remount.
- Dwa rozdzielone kanały błędów, `onLoadError` dla problemów z konkretnym obrazem, `onError` dla awarii samego mechanizmu edytora.
- AI Assistant do edycji czatowej wymaga konta i projectId z Unlayer, nie jest to czysto lokalna funkcja open source.

**Why do I care:** Jako ktoś, kto niejeden raz próbował sklecić edytor obrazów z kilku niezależnych bibliotek do cropowania, filtrów i canvas rysowania, doceniam gotowy pakiet, który od razu deklaruje kompatybilność z Server Components i uczciwie mówi, kiedy remontuje cały komponent. Ta dokumentacja strategii remountu to rzecz, którą chciałbym widzieć w każdym komponencie trzeciej strony, bo debugowanie niechcianego resetu stanu w produkcji jest jedną z bardziej frustrujących rzeczy w React. Zanim wybrałbym to do projektu, sprawdziłbym rozmiar bundla po stronie klienta i to, czy funkcje poza AI Assistant faktycznie działają w pełni offline, bez telemetrii do Unlayer, bo licencja MIT nie mówi nic o tym, co komponent robi w tle.

**Link:** [unlayer/react-image-editor](https://github.com/unlayer/react-image-editor)

## GitHub Agentic Workflows: automatyczna dokumentacja cross-repo

**TLDR:** Zespół Aspire w Microsofcie zbudował na GitHub Agentic Workflows pipeline, który po każdym scalonym pull requeście w repo produktowym automatycznie tworzy draft pull requesta z dokumentacją w osobnym repo, przypisuje jako reviewera inżyniera, który wdrożył feature, i nigdy nie merguje sam. Wynik za 30 dni: 82 pull requesty z dokumentacją, mediana czasu do scalenia 44,8 godziny, żadnego dodatkowego headcountu.

**Summary:** Problem opisany na wejściu jest znany każdemu, kto pracował w większym zespole produktowym: docs writer trafia na zamknięty pull request, próbuje zrekonstruować co się zmieniło, pinguje inżyniera, który już jest przy następnym feature i pamięta połowę kontekstu. Autor nazywa to "podatkiem od inżynierii wstecznej" i to jest naprawdę trafna nazwa na coś, co każdy zna z doświadczenia, ale rzadko kto ubiera w słowa. Trudność cross-repo, produkt w `microsoft/aspire`, docsy w `microsoft/aspire.dev`, jest tu kluczowa, bo szeroko uprawnione tokeny między repozytoriami to dokładnie to, czego każdy sensowny przegląd bezpieczeństwa się boi.

Mechanika GitHub Agentic Workflows opiera się na jednym pliku Markdown z frontmatterem YAML i promptem w naturalnym języku, który się kompiluje do zwykłego `.lock.yml` z GitHub Actions. Kluczowe jest to, że agent nigdy nie pisze do GitHuba wprost, tylko emituje intencję jako JSON, a osobny, wąsko uprawniony job zwany safe-outputs handler realizuje tę intencję przez dedykowany GitHub App. To jest właśnie ten "unlock", o którym pisze autor: agent ma dostęp do odczytu i prompt, zapisy idą przez małą, weryfikowalną ścieżkę z jasnymi allow-listami, i dokładnie to przekonało dział bezpieczeństwa.

Cała reszta pipeline'u jest równie przemyślana. Deterministyczny resolver gałęzi docelowej w plain bash, jeszcze przed obudzeniem agenta, mapuje milestone pull requesta na branch release w repo docsów, więc agent nie zgaduje, tylko dostaje gotową odpowiedź. Frontmatter z `safe-outputs` wypisuje explicit: prefix tytułu, label, `draft: true` żeby nigdy nie mergować automatycznie, dozwolone base branche, docelowe repo, i `protected-files: blocked` żeby agent nie mógł dotknąć AGENTS.md czy manifestów zależności. Jeśli utworzenie pull requesta zawiedzie, framework spada do utworzenia issue, więc nic nie gubi się po cichu.

Liczby z 30-dniowego okna są konkretne i uczciwie skomentowane: 396 uruchomień workflow na 396 scalonych pull requestów w kodzie, ale tylko 82 doczekało się draft pull requesta z dokumentacją, i to nie jest defekt, to agent poprawnie mówiący "nie, ten refactor nie wymaga docsów" ponad trzysta razy. Sto procent tych 82 zostało scalonych, co autor przypisuje głównie zaostrzeniu promptu po pierwszej fazie false-positive, gdy 9 z 69 pull requestów zamykano bez scalenia, bo agent zbyt gorliwie kwalifikował wewnętrzne CI-tweaki jako "docs-worthy".

**Key takeaways:**
- Agent nigdy nie pisze do GitHuba wprost, emituje intencję jako JSON, a wąsko uprawniony safe-outputs handler realizuje ją przez dedykowany GitHub App ograniczony do dwóch repozytoriów.
- Deterministyczny mapping milestone na release branch w plain bash, wykonywany przed startem agenta, eliminuje zgadywanie docelowej gałęzi.
- `draft: true` i SME jako reviewer (autor oryginalnego pull requesta) to human-in-the-loop na każdym kroku, agent nigdy nie merguje sam.
- 396 uruchomień workflow dało 82 pull requesty z docsami, 100% scalonych, mediana czasu do scalenia 44,8 godziny, bez dodatkowego headcountu.
- `protected-files: blocked` chroni AGENTS.md i manifesty zależności przed dotknięciem przez agenta.

**Why do I care:** To jest jeden z niewielu case studies o agentach w produkcji, gdzie autor uczciwie pokazuje też porażki pierwszej wersji, zbyt gorliwe flagowanie CI-tweaków jako docs-worthy, kłopotliwy mirrored checkout dla cross-repo pull requestów, zamiast tylko chwalić się liczbami z happy path. Wzorzec safe-outputs, gdzie agent generuje intencję a osobny, wąsko uprawniony proces ją realizuje, jest architektonicznie dokładnie tym, czego potrzeba, żeby przepuścić agenta przez realny security review w większej organizacji, nie tylko w side projekcie. Gdybym wdrażał coś podobnego, najbardziej pilnowałbym właśnie tego promptu kwalifikującego "czy to wymaga docsów", bo z opisu wynika, że to jest miejsce, w którym cała jakość systemu się rozstrzyga, a nie w samym generowaniu treści.

**Link:** [Automating cross-repo documentation with GitHub Agentic Workflows](https://github.blog/ai-and-ml/github-copilot/automating-cross-repo-documentation-with-github-agentic-workflows/)
