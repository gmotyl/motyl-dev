---
title: "Load-Bearing People, rynek pracy w IT i śmierć gRPC-Web"
excerpt: "Przegląd daily.dev: ludzie, na których trzyma się cała firma, sierpniowe trendy na rynku pracy w tech, dyskusja o mikroserwisach w erze GenAI i dlaczego Connect wypiera gRPC-Web w przeglądarce."
publishedAt: "2026-09-03"
slug: "daily-dev-load-bearing-people-tech-job-market-genai-microservices-grpc-web"
hashtags: "#dailydev #leadership #architecture #genai #grpc #security #devex #generated #pl"
source_pattern: "daily.dev"
---

## Load-Bearing People

**TLDR:** Tekst wraca do incydentu z left-pad z 2016 roku i backdoora w XZ Utils z 2024, żeby pokazać, że firmy równie chętnie co projekty open source opierają się na pojedynczych osobach trzymających w głowie krytyczną, nigdzie niespisaną wiedzę. Autor proponuje audyt bus-factora i dwutygodniowy „test wakacyjny” jako sposób na wyłapanie takich osób, zanim odejdą.

**Summary:** Punktem wyjścia jest historia, którą większość z nas zna z anegdot, ale rzadko wyciąga z niej właściwy wniosek. Azer Koçulu wycofał w 2016 roku wszystkie swoje pakiety z npm, w tym jedenastolinijkowy left-pad, po sporze o nazwę innego pakietu. Ponieważ Babel i Webpack pośrednio zależały od tej jednej funkcji, buildy posypały się w ciągu minut w Facebooku, Netflixie, Spotify, PayPalu i Airbnb. Osiem lat później historia powtórzyła się w dużo poważniejszej formie: inżynier Microsoftu Andres Freund zauważył podejrzanie wolne logowania SSH podczas profilowania czegoś zupełnie innego i po tym tropie trafił na backdoor w XZ Utils, narzędziu kompresującym wbudowanym w niemal każdą dystrybucję Linuksa. Atakujący podszywający się pod Jia Tan spędził około dwóch lat, budując zaufanie i zdobywając prawa współmaintainera jednoosobowego projektu, zanim wypuścił złośliwy kod.

Autor łączy te dwa zdarzenia wspólnym mianownikiem, który nazywa „ludźmi na których się wszystko trzyma”. Chodzi o osoby, czy to w projekcie open source, czy w wewnętrznym zespole, które trzymają w głowie krytyczną, nigdzie niespisaną wiedzę o systemie. Struktura zachęt w firmach dodatkowo utrwala ten problem: bohaterskie gaszenie pożarów jest nagradzane, redundancja traktowana jako marnotrawstwo, a poczucie bycia niezastąpionym samo w sobie bywa przyjemne dla ego. W efekcie ryzyko pozostaje niewidoczne, dopóki dana osoba faktycznie nie zniknie.

Konkretną receptą jest audyt bus-factora, czyli pytanie zadawane zespołowi dla każdego krytycznego systemu: ile osób umiałoby przejąć tę pracę, gdyby główna osoba zniknęła jutro. Odpowiedź „jedna” od razu trafia na listę ryzyk. Uzupełnieniem jest dwutygodniowy „test wakacyjny”, w którym kluczowa osoba jest realnie nieosiągalna, co ujawnia luki, zanim spowodują awarię albo bezpowrotną utratę wiedzy.

**Key takeaways:**
- Left-pad (2016) i backdoor w XZ Utils (2024) to dwa dowody na to, że pojedyncze osoby potrafią być krytycznym punktem awarii, zarówno w open source, jak i w firmowym kodzie.
- Struktury zachęt (nagradzanie heroizmu, traktowanie redundancji jako kosztu) utrzymują to ryzyko niewidocznym.
- Audyt bus-factora i dwutygodniowy test wakacyjny to konkretne narzędzia do wykrycia takich osób, zanim odejdą.

**Why do I care:** Jako architekt widziałem ten wzorzec dziesiątki razy: jedna osoba zna cały mechanizm deploymentu albo jedyny kawałek legacy integracji i nikt inny nie odważy się go dotknąć. To nie jest problem HR, tylko dług architektoniczny, który trzeba traktować tak samo poważnie jak brak testów. Warto raz na kwartał przepuścić zespół przez pytanie „kto jeszcze to ogarnia” zamiast czekać, aż odpowiedź przyjdzie w najgorszym możliwym momencie.

**Link:** [Load-Bearing People](https://daily.dev/posts/TnEq4Op27)

## Sierpniowe trendy na rynku pracy w tech

**TLDR:** Miesięczny raport ZTM na podstawie danych z LinkedIn i Google Trends pokazuje, że role AI Engineer i ML Engineer rosną o ponad 10%, deweloperzy blockchain notują skok o prawie 31%, a projektowanie UX/UI przeżywa swój najgorszy miesiąc w roku, częściowo z powodu presji AI na juniorskie stanowiska projektowe.

**Summary:** Raport zestawia dane z LinkedIn i Google Trends za sierpień 2026 i rysuje obraz rynku, na którym AI przestaje być dodatkiem, a staje się osią podziału między rosnącymi i kurczącymi się specjalizacjami. Role AI Engineer i ML Engineer wzrosły o 10,7%, co nie jest zaskoczeniem, ale skala wzrostu deweloperów blockchain, prawie 31%, sugeruje, że ten segment znów łapie wiatr w żagle po latach względnego zastoju. Analitycy Business Intelligence odbili się po spadkach o 19%.

Po drugiej stronie bilansu Data Analyst notuje spadek trzeci miesiąc z rzędu, a Data Engineer traci lekko, co może sugerować konsolidację tych ról wokół narzędzi wspieranych przez AI, które automatyzują część pracy wcześniej wykonywanej ręcznie. Najbardziej wyrazisty jest jednak spadek w projektowaniu UX/UI, największy w tym roku, który raport wiąże wprost z presją AI na pracę projektową na poziomie juniorskim oraz z obniżką wyceny Canvy. To pierwszy tak jednoznaczny sygnał, że generatywne narzędzia projektowe realnie wpływają na popyt na etaty, a nie tylko na produktywność istniejących zespołów.

Software Engineer i DevOps trzymają się stabilnie i systematycznie rosną, co kontrastuje z rozjeżdżającymi się trajektoriami ról Cybersecurity Specialist i Analyst, między którymi raport odnotowuje wyraźną rozbieżność. Całość jest oczywiście też okazją do promocji kursów ZTM, w tym nowego kursu z Claude Code, więc dane warto czytać z tą świadomością, ale same liczby są na tyle konkretne, że mają wartość niezależnie od intencji publikacji.

**Key takeaways:**
- AI Engineer i ML Engineer: +10,7% miesiąc do miesiąca, Blockchain Developer: +30,9%.
- UX/UI Designer notuje największy spadek w roku, częściowo przypisywany presji AI na pracę juniorską i obniżce wyceny Canvy.
- Software Engineer i DevOps rosną stabilnie, podczas gdy role Cybersecurity Specialist i Analyst wyraźnie się rozjeżdżają.

**Why do I care:** Dla mnie najciekawszy jest spadek w UX/UI, bo to pierwszy raz, kiedy presja AI widoczna jest nie w narracji o produktywności, tylko wprost w liczbie otwartych etatów. Jeśli planujesz strukturę zespołu produktowego na najbliższy rok, warto zakładać, że juniorskie stanowiska projektowe będą coraz trudniej uzasadnić budżetowo, a to zmienia sposób, w jaki trzeba myśleć o ścieżkach rozwoju w zespole designu.

**Link:** [[August 2026] Tech Job Market Trends Monthly](https://daily.dev/posts/sJFST81Xp)

## Mikroserwisy i GenAI w 2026 roku

**TLDR:** Chris Richardson podsumowuje swoją rozmowę w podkaście Dear Architects, w której tłumaczy, dlaczego większość firm nadal buduje wielkie kule błota, jak rozpoznać rozproszony monolit i dlaczego agenci kodujący sprawiają, że fundamenty architektoniczne liczą się bardziej, a nie mniej.

**Summary:** Richardson zaczyna od stwierdzenia, które brzmi niewygodnie, ale trudno mu odmówić racji: większość przedsiębiorstw nadal buduje wielkie kule błota, niezależnie od tego, czy nazywają to mikroserwisami czy monolitem. Czerwone flagi rozproszonego monolitu, które wymienia, są konkretne: liczba serwisów zbliżona do liczby deweloperów, releasy wydawane w lockstepie zamiast niezależnie, oraz architektura reklamowana jako „szybsza”, która w praktyce nie skraca czasu dostarczania funkcji. Te symptomy oznaczają, że firma płaci pełną cenę złożoności mikroserwisowej, nie odbierając żadnej z jej korzyści.

Do opisania sił decydujących o granicach serwisów Richardson używa metafory ciemnej energii i ciemnej materii. Ciemna energia, jak potrzeba szybkich pipeline'ów wdrożeniowych i autonomii zespołów, rozpycha subdomeny na osobne serwisy. Ciemna materia, czyli minimalizacja sprzężenia w czasie działania i preferencja dla ACID nad BASE, ściąga je z powrotem w stronę monolitu. Zadaniem architekta jest świadome balansowanie tych pięciu sił po każdej stronie, a nie mechaniczne stosowanie wzorca, bo modny.

Najciekawszy wątek dotyczy tego, jak agenci kodujący zmieniają wagę fundamentów inżynieryjnych. Zamiast czynić szybką pętlę zwrotną i automatyczne testy mniej istotnymi, GenAI sprawia, że stają się one ważniejsze niż kiedykolwiek, bo agenci potrzebują precyzyjnych barier ochronnych, żeby nie generować martwego kodu albo zmyślonej dokumentacji. Richardson jest sceptyczny wobec obietnicy szybkiej modernizacji legacy przy pomocy AI, kontrastując dobrze udokumentowane projekty greenfieldowe, jak Next.js, z trzydziestoletnimi systemami enterprise, gdzie w jednym z projektów aż 30% wygenerowanego kodu okazało się martwe. Zamiast wielkiego przepisania z dnia na dzień, poleca wzorzec Strangler Fig.

**Key takeaways:**
- Czerwone flagi rozproszonego monolitu: tyle serwisów co deweloperów, releasy w lockstepie, brak realnego przyspieszenia dostarczania.
- Model „ciemnej energii i ciemnej materii” opisuje pięć sił rozpychających i pięć ściągających granice serwisów.
- Agenci kodujący radzą sobie dobrze na dobrze udokumentowanym, dobrze przetestowanym kodzie, ale na trzydziestoletnim legacy potrafią generować nawet 30% martwego kodu.

**Why do I care:** Ten podcast trafia dokładnie w rozmowę, którą prowadzę teraz z klientami rozważającymi wprowadzenie agentów do starszych systemów: agent nie zastąpi braku testów i dokumentacji, tylko uwidoczni ten brak dużo szybciej i dużo boleśniej. Jeśli zespół nie ma jeszcze solidnych automatycznych testów i jasnych granic modułów, wprowadzenie agentów kodujących do legacy powinno poczekać, bo inaczej koszt sprzątania po AI przewyższy oszczędność czasu.

**Link:** [Microservices and GenAI in 2026: my Dear Architects conversation](https://daily.dev/posts/hHrzrOAPK)

## gRPC-Web zawiódł sieć

**TLDR:** Blog Buf tłumaczy, dlaczego gRPC-Web ukrywa błędy RPC wewnątrz ciała odpowiedzi HTTP, przez co monitoring i CDN-y widzą same sukcesy, oraz dlaczego Connect, zbudowany przez Buf, próbuje naprawić ten problem, wracając do standardowych kodów statusu HTTP.

**Summary:** Sedno problemu leży w tym, jak gRPC raportuje wynik wywołania. Zarówno gRPC, jak i gRPC-Web zwracają status operacji przez osobne pole grpc-status, a nie przez kod HTTP, więc odpowiedź transportowa to zawsze 200 OK, nawet gdy samo wywołanie zawiodło. W klasycznym gRPC ten status trafia do trailera HTTP, ale przeglądarki nie potrafią czytać trailerów, więc w gRPC-Web informacja o błędzie zostaje przeniesiona do ramki wewnątrz ciała odpowiedzi. Efekt jest taki, że CDN-y, proxy i narzędzia monitorujące, które rozumieją tylko standardowy HTTP, widzą stuprocentową skuteczność, podczas gdy w rzeczywistości każde wywołanie kończy się błędem.

Sytuację pogarsza to, że projekt grpc/grpc-web od Google przeszedł w tryb utrzymaniowy, bez planów na nowe funkcje, częściowo z powodu archiwizacji Google Closure i minimalnego wsparcia dla Protobuf JavaScript. Rekomendowaną alternatywą jest gRPC-Gateway, który jednak w ogóle nie implementuje gRPC-Web, tylko transkoduje gRPC na osobne REST API w JSON. To przesuwa granicę, w której kończy się kontrakt Protobuf i zmusza do generowania dokumentacji OpenAPI oraz drugiego klienta, żeby zachować bezpieczeństwo typów w przeglądarce.

Connect, zbudowany przez Buf, proponuje inne podejście: zamiast chować błędy w ciele odpowiedzi, używa standardowych kodów statusu HTTP, więc awaria bazy danych zwraca zwykłe 500, które CDN-y, dashboardy i klienci rozumieją natywnie. Ciała odpowiedzi w wywołaniach unarnych to po prostu zserializowana wiadomość z Content-Type application/json albo application/proto, bez pięciobajtowego prefiksu długości ani ramki trailera charakterystycznej dla gRPC-Web, co pozwala przeglądarce rozmawiać bezpośrednio z serwerem ConnectRPC bez proxy tłumaczącego, jak Envoy.

**Key takeaways:**
- gRPC-Web zawsze zwraca HTTP 200, nawet gdy wywołanie faktycznie zawiodło, bo status trafia do ramki trailera w ciele odpowiedzi.
- Projekt grpc/grpc-web przeszedł w tryb utrzymaniowy, a rekomendowana alternatywa gRPC-Gateway łamie bezpośredni kontrakt Protobuf.
- Connect od Buf wraca do standardowych kodów HTTP i pozwala przeglądarce łączyć się bezpośrednio z serwerem, bez proxy tłumaczącego.

**Why do I care:** Jeśli kiedykolwiek debugowałeś dashboard pokazujący stuprocentową dostępność API, podczas gdy użytkownicy zgłaszali błędy, ten artykuł tłumaczy dokładnie, dlaczego tak się dzieje w architekturach opartych na gRPC-Web. Dla zespołów, które dopiero planują komunikację przeglądarka-backend przez Protobuf, Connect wygląda na rozsądniejszy punkt startowy niż próba naprawiania gRPC-Web łatkami na poziomie infrastruktury.

**Link:** [gRPC-Web Failed the Web](https://daily.dev/posts/YxI6aOslo)
