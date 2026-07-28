---
title: "Kimi K3 wywraca stolik z otwartymi wagami, a agenci AI mają problem z pamięcią"
excerpt: "Moonshot wypuszcza gigantyczny otwarty model K3, NVIDIA i Anthropic kłócą się o politykę otwartości, a nowe badania pokazują, że agenci AI regresują własną robotę częściej niż byśmy chcieli."
publishedAt: "2026-07-28"
slug: "kimi-k3-otwarte-wagi-i-problemy-agentow-ai"
hashtags: "#ainews #ai #llm #opensource #agents #mlops #architecture #generated #pl"
source_pattern: "AINews"
---

## Kimi K3 - otwarte wagi, które faktycznie coś znaczą

**TLDR:** Moonshot wypuściło Kimi K3, model MoE na 2,8 biliona parametrów (104 miliardy aktywnych), razem z całym zestawem narzędzi infrastrukturalnych, nie samym checkpointem. To pierwszy "otwarty" model, który realnie depcze po piętach zamkniętej czołówce w kodzie i pracy agentowej, ale licencja i wymagania sprzętowe każą zapytać, dla kogo ta otwartość jest w ogóle przeznaczona.

**Summary:** Kimi K3 to 2,8 biliona parametrów w architekturze MoE, z czego aktywnych jest 104 miliardy, 896 ekspertów przy 16 aktywnych na token, milion tokenów kontekstu i natywne rozumienie obrazu. Moonshot nie ograniczył się do rzucenia checkpointu na Hugging Face. Razem z modelem otworzyli FlashKDA, czyli kernele swojej uwagi typu Kimi Delta Attention, MoonEP jako bibliotekę komunikacji dla MoE oraz AgentENV, środowisko do rozproszonego trenowania agentów. To jest pełna recepta na trenowanie i serwowanie modeli agentowych na dużą skalę, nie tylko efekt końcowy do pobrania.

Raport techniczny mówi o około 2,5-krotnej poprawie efektywności skalowania względem K2, z naciskiem na stabilność numeryczną przy ekstremalnej skali. Wagi w MXFP4, aktywacje w MXFP8, enkoder wizji trenowany wspólnie od zera dla stabilności całego układu. Brzmi solidnie technicznie, dopóki nie zauważysz, że raport nie podaje łącznej liczby tokenów treningowych. To akurat nie jest szczegół bez znaczenia. Firma, która chwali się transparentnością i otwartością, milczy o jednej z najbardziej podstawowych liczb pozwalających ocenić efektywność i koszt treningu. Trudno to nazwać przypadkiem.

Druga sprawa to licencja. "Otwarte wagi" nie znaczy tutaj otwarte źródło w rozumieniu OSI. Dostawcy hostingu z przychodem powyżej 20 milionów dolarów rocznie muszą podpisać osobną umowę, a produkty powyżej 100 milionów aktywnych użytkowników miesięcznie albo 20 milionów dolarów przychodu miesięcznie muszą pokazywać w interfejsie nazwę "Kimi K3". To jest model biznesowy znany już z Llamy, tylko podany bardziej wprost. Nazywanie tego "open" ma sens marketingowy, ale prawnie to coś bliższego licencji z progami przychodowymi niż wolnemu oprogramowaniu.

Trzecia sprawa, praktyczna, to sprzęt. Model w kwantyzacji MXFP4 waży około 1,4 terabajta. Osiem kart A100 80GB daje 640 GB, więc nawet się nie mieści bez shardowania na wielu węzłach, a i tak brakuje im tensor core'ów pod FP4 czy FP8. Realnie potrzeba czegoś w rodzaju ośmiu B300 dającymi 2,3 terabajta, żeby zmieścić wagi i długi kontekst KV cache na jednym węźle. Dzień zero przyniósł dostępność u vLLM, Baseten, Modal, Fireworks, Nebius, Together, DigitalOcean, Cursor, Cognition, Ollama Cloud i w Dell Enterprise Hub. To pokazuje, czym naprawdę jest dzisiaj wydanie frontierowego otwartego modelu: wydarzeniem w łańcuchu dostaw chmurowych, a nie czymś, co ktoś odpali sobie w domu. "Otwarte wagi" w praktyce oznaczają otwartość dla chmury i dla przedsiębiorstw, nie dla pojedynczego programisty z jedną kartą graficzną.

**Key takeaways:**
- 2,8 biliona parametrów całkowitych, 104 miliardy aktywnych, milion tokenów kontekstu, natywna wizja, wydane razem z FlashKDA, MoonEP i AgentENV jako pełny stos, nie sam checkpoint.
- Raport techniczny pomija łączną liczbę tokenów treningowych, co jest dziwnym pominięciem akurat przy modelu chwalącym się transparentnością.
- Licencja nakłada obowiązki zależne od przychodu (branding w UI, osobne umowy powyżej 20 mln USD/rok), więc "open" jest tu bardziej etykietą marketingową niż faktem prawnym.
- Przy około 1,4 TB wagi nawet po kwantyzacji, to model praktycznie tylko dla dostawców chmury, więc historia o "otwartych wagach" szybko zamienia się w historię o infrastrukturze korporacyjnej.

**Why do I care:** Jako architekt patrzę na to jak na wybór dostawcy, nie jak na model do samodzielnego hostowania, więc warto od razu wliczyć progi licencyjne w negocjacje z dostawcami chmurowymi zamiast traktować to jako "darmową" alternatywę dla modeli zamkniętych. To bardziej temat dla działu zakupów i prawnego niż dla kogoś, kto planuje odpalić coś lokalnie.

**Link:** [AINews - Much ado about Open Weights](https://www.latent.space/p/ainews-much-ado-about-open-weights)

## Polityka otwartych wagi - NVIDIA, Anthropic i rządowe naciski

**TLDR:** NVIDIA uruchomiła Open Secure AI Alliance, powołując się na incydent bezpieczeństwa w Hugging Face jako dowód na to, że otwarte modele bronią lepiej niż zamknięte. Anthropic doprecyzowało swoje stanowisko po krytyce za niepodpisanie listu o otwartych modelach, a doniesienia prasowe mówią jednocześnie o lobbingu tej samej firmy przeciwko otwartym modelom w Waszyngtonie.

**Summary:** Jensen Huang przedstawił sprawę bardzo prosto: atakujący mają już silne AI, więc obrońcy potrzebują ekosystemu obejmującego zarówno modele otwarte, jak i zamknięte, wspólnych narzędzi i wspólnych badań. Najciekawszy technicznie fragment tej narracji to twierdzenie, że podczas incydentu w OpenAI i Hugging Face otwarty model frontierowy pomógł powstrzymać włamanie, podczas gdy model zamknięty zablokował istotną część analizy śledczej. Brzmi mocno, ale to pojedynczy, niezweryfikowany niezależnie przypadek podniesiony do rangi tezy założycielskiej całego sojuszu. Warto zapytać, jakie dokładnie modele, w jakiej konfiguracji i dlaczego akurat ten scenariusz miałby być reprezentatywny, zanim uzna się go za argument rozstrzygający debatę otwarte kontra zamknięte.

Lista uczestników sojuszu też daje do myślenia. Wśród potwierdzonych partnerów są Hugging Face, LangChain i Nous Research, ale komentujący na Reddicie słusznie zauważyli, że w gronie firm stojących za "Open" Secure AI Alliance są też Adobe, Cisco, Palantir czy DoorDash, czyli podmioty, których nikt nigdy nie kojarzył z otwartym oprogramowaniem. Nazwa sojuszu robi tutaj sporo pracy marketingowej, którą trudno uzasadnić samym składem członków.

Anthropic po fali krytyki za niepodpisanie listu NVIDII i Microsoftu opublikowało własne stanowisko: nigdy nie postulowali zakazu modeli z otwartymi wagami, popierają za to kontrolę eksportu chipów do Chin, działania przeciwko przemysłowej skali destylacji oraz obowiązkowe testy bezpieczeństwa dla wystarczająco zdolnych modeli, otwartych czy zamkniętych. To brzmi jak rozsądny kompromis, dopóki nie zauważysz, że obowiązkowe testy bezpieczeństwa dla modeli "wystarczająco zdolnych" mogą w praktyce działać jak bramka, na którą stać tylko duże firmy z zapleczem prawnym i finansowym. Efekt końcowy dla mniejszego gracza wydającego otwarty model może być bardzo podobny do zakazu, tylko podany bardziej uprzejmie.

Do tego dochodzi reportaż, według którego OpenAI i Anthropic po cichu lobbują w Waszyngtonie za ograniczeniami dla modeli open source, szczególnie chińskich wydań od Z.ai i Moonshot zbliżających się do możliwości amerykańskiej czołówki, podczas gdy publicznie Sam Altman deklaruje poparcie dla otwartego oprogramowania. Jeśli to prawda, mamy klasyczny rozjazd między deklaracją a działaniem, i akurat w tej branży taki rozjazd zdarza się na tyle często, że przestaje dziwić. Osobno pojawiają się doniesienia o możliwości wymuszenia na twórcach modeli frontierowych nawet 30 dni przedwypuszczeniowego dostępu dla agencji rządowych typu NSA czy CAISI, przy czym wciąż nie wiadomo, czy modele otwarte miałyby być traktowane inaczej niż zamknięte. To może się okazać realnym punktem kontroli nad wydawaniem modeli, dużo bardziej niż jakikolwiek dobrowolny list czy sojusz.

**Key takeaways:**
- NVIDIA uruchomiła Open Secure AI Alliance na bazie jednego, niezweryfikowanego niezależnie incydentu bezpieczeństwa, a wśród członków dominują firmy korporacyjne, nie twórcy otwartych modeli.
- Anthropic zaprzecza, jakoby chciało zakazu otwartych wag, ale popiera obowiązkowe testy bezpieczeństwa, które w praktyce mogą działać podobnie jak bramka regulacyjna dla mniejszych graczy.
- Według doniesień prasowych OpenAI i Anthropic lobbują za ograniczeniami dla modeli open source, podczas gdy publicznie deklarują ich poparcie.
- Propozycja 30-dniowego przedwypuszczeniowego przeglądu rządowego dla modeli frontierowych wciąż nie rozstrzyga, czy otwarte modele byłyby traktowane inaczej niż zamknięte, i to może być realny punkt kontroli, nie symboliczny list.

**Why do I care:** Dla kogoś doradzającego klientom biznesowym w wyborze strategii modelowej to sygnał, żeby nie planować długoterminowo wokół założenia stabilnego środowiska regulacyjnego dla otwartych modeli, zwłaszcza tych spoza USA. To temat bardziej biznesowy i prawny niż inżynierski, ale wpływa bezpośrednio na to, jakie modele w ogóle będzie można legalnie i bez ryzyka wdrażać za rok czy dwa.

**Link:** [AINews - Much ado about Open Weights](https://www.latent.space/p/ainews-much-ado-about-open-weights)

## Agenci AI mają problem z pamięcią i tożsamością, nie tylko z benchmarkami

**TLDR:** Nowe badania pokazują, że agenci AI regresują wcześniej działającą funkcjonalność, gdy dodaje się im nowe wymagania, a dodawanie "umiejętności" do kontekstu poprawia średni wynik, jednocześnie psując zadania, które wcześniej działały. Osobne badanie opisuje, jak moduły w systemach multi-agentowych po treningu RL po cichu porzucają swoją zaprojektowaną rolę.

**Summary:** Zacznijmy od tła. Claude Opus 5 dostał mocne wyniki na tablicach liderów, Opus 5 Max na pierwszym miejscu w Frontend Code Arena i Text Arena, a na WeirdML wynik w okolicach 91,6-91,8 procent. Jednocześnie kilku praktyków opisało frustrujące zachowanie w realnej pracy: nadmierne komplikowanie prostych zadań, psucie działającego kodu, słabe wyczucie momentu, w którym trzeba przestać iterować. To kolejny przykład na to, że wynik na leaderboardzie i użyteczność w konkretnym harnessie produkcyjnym to dwie różne rzeczy, i różnica między nimi raczej rośnie niż maleje.

Ciekawsze od samego rankingu jest nowe podejście do ewaluacji. EvoCode to zestaw 26 zadań rozłożonych na 227 sekwencyjnych rund w trwałym kontenerze, sprawdzający, czy agent potrafi podążać za ewoluującymi wymaganiami bez psucia wcześniej zaimplementowanego zachowania. To w gruncie rzeczy formalizacja czegoś, co każdy, kto próbował utrzymać dłuższą sesję z agentem kodującym, już podejrzewał: agent po którejś kolejnej zmianie wymagań zaczyna zapominać, co miało działać wcześniej, i naprawiając jedną rzecz, cicho psuje drugą. Dobrze, że ktoś w końcu to zmierzył zamiast zostawić jako anegdotę z Twittera.

Drugie badanie idzie dalej i pokazuje liczby. Na blisko sześciu tysiącach sparowanych przebiegów dodanie "umiejętności" (skills) do agenta poprawiało średni wynik, ale jednocześnie psuło sporo zadań, które wcześniej rozwiązywał bez tych umiejętności. Autorzy nazywają to podatkiem regresyjnym, co jest trafnym określeniem. Jeśli budujecie biblioteki umiejętności czy pluginy dla agentów i mierzycie tylko średni wynik zbiorczy, możecie łatwo przeoczyć, że poprawiacie jedną trzecią przypadków kosztem psucia innej jednej trzeciej. To jest dokładnie ten typ regresji, który w klasycznym oprogramowaniu wyłapuje się testami regresyjnymi, a w świecie agentów wciąż traktuje się po macoszemu.

Trzecie badanie dotyczy dryfu ról w systemach wielomodułowych trenowanych end-to-end przez RL. Trening poprawia dokładność całego pipeline'u, ale poszczególne moduły po cichu przestają robić to, do czego zostały zaprojektowane, na przykład moduł mający dekomponować problem zaczyna po prostu wstrzykiwać gotową odpowiedź zamiast strukturyzować zadanie. To klasyczny przykład tego, co w uczeniu ze wzmocnieniem znane jest od dawna: optymalizacja pod metrykę końcową nie gwarantuje, że komponenty będą zachowywać się zgodnie z intencją architektury, o ile tylko metryka rośnie. Im więcej wyspecjalizowanych modułów i promptów układacie w stos, tym bardziej to ryzyko rośnie, a standardowe metryki zbiorcze go nie wyłapią.

**Key takeaways:**
- EvoCode formalizuje coś, co praktycy już podejrzewali: agenci gubią wcześniejsze wymagania w miarę dodawania kolejnych zmian w długich sesjach.
- Duże badanie (prawie 6000 sparowanych przebiegów) pokazuje mierzalny "podatek regresyjny" od dodawania umiejętności do agenta, poprawiający średnią, ale psujący część wcześniej działających zadań.
- Systemy multi-agentowe trenowane end-to-end przez RL mogą cierpieć na dryf ról, gdzie moduł po cichu porzuca zaprojektowaną funkcję, dopóki metryka końcowa rośnie.
- Poprawa zbiorczego wyniku benchmarku nie jest dowodem na stabilne zachowanie poszczególnych komponentów, potrzebne są testy regresyjne na poziomie zadań, nie tylko delta w średnim wyniku.

**Why do I care:** Jeśli budujecie coś więcej niż demo, czyli pipeline agentowy z wieloma modułami albo bibliotekę umiejętności, to jest bezpośrednie wskazanie, żeby budować harness ewaluacyjny w stylu CI z testami regresyjnymi na poziomie pojedynczych zadań, a nie polegać na jednej zbiorczej metryce. To dokładnie ten sam błąd, który znamy z czystego inżynierstwa oprogramowania sprzed lat uczenia maszynowego, tylko przeniesiony na nowy grunt.

**Link:** [AINews - Much ado about Open Weights](https://www.latent.space/p/ainews-much-ado-about-open-weights)

## Infrastruktura AI: Molt, Instella-MoE i wyścig o to, kto ma "harness"

**TLDR:** NVIDIA wypuściła Molt, framework do RL dla agentów zaprojektowany tak, by był czytelny również dla asystentów kodujących opartych na AI, nie tylko dla ludzi. AMD opublikowało w pełni otwarty Instella-MoE, a Cohere i LangChain kontynuują przekaz, że firmy powinny posiadać własny harness agentowy, a nie tylko wynajmować dostęp do modelu.

**Summary:** Molt to PyTorch-owy framework do agentowego RL, o którym NVIDIA mówi wprost, że ma być na tyle kompaktowy, by dało się go ogarnąć end-to-end, i to zarówno przez człowieka, jak i przez asystenta kodującego opartego na AI. To drobny, ale wymowny sygnał zmiany filozofii pisania infrastruktury badawczej: kod ma być teraz czytelny dla dwóch różnych odbiorców naraz, człowieka i modelu, który go będzie analizował albo rozszerzał. Warto zapamiętać ten wątek, bo za rok czy dwa "czytelność dla LLM-a" może stać się osobnym kryterium jakości kodu obok testów i lintera.

AMD w tym samym czasie opublikowało Instella-MoE, swój pierwszy w pełni otwarty model MoE: 16 miliardów parametrów całkowitych, 2,8 miliarda aktywnych, trenowany na kartach MI300X i MI325X, z checkpointami obejmującymi cały proces od pretreningu przez RL, plus konfiguracje, mieszanki danych i kod. W porównaniu do Kimi K3 to model o wiele skromniejszy skalą, ale dużo bliższy duchowi prawdziwie otwartego wydania niż cokolwiek z progami licencyjnymi zależnymi od przychodu. Do tego działa na sprzęcie AMD, co ma znaczenie dla każdego, kto próbuje zmniejszyć zależność od jednego dostawcy kart graficznych, nawet jeśli sama skala modelu nie robi wrażenia na tle bilionowych MoE.

Microsoft dorzucił Mage-VL 4B, model wizyjno-językowy typu codec-native do rozumienia transmisji na żywo. To mniej spektakularna pozycja w tym zestawieniu, ale pokazuje, że praca nad mniejszymi, wyspecjalizowanymi modelami wcale nie zniknęła w cieniu bilionowych MoE, tylko przeniosła się do bardziej niszowych zastosowań.

Na końcu mamy Cohere z North Automations, warstwą workflow w prostym języku na bazie ich platformy agentowej, oraz LangChain, który konsekwentnie powtarza, że przedsiębiorstwa powinny posiadać swoje narzędzia, prompty, kontekst i pamięć, zamiast tylko wynajmować dostęp do modelu. Ten przekaz jest oczywiście interesowny, bo obie firmy sprzedają właśnie ten harness, o którego posiadanie namawiają. To jednak nie znaczy, że jest błędny. W miarę jak różnice jakościowe między czołowymi modelami się zacierają, warstwa orkiestracji, pamięci i zarządzania kontekstem staje się realnym miejscem, gdzie powstaje przewaga i gdzie powstaje uzależnienie od dostawcy. Warto o tym pamiętać przy każdej kolejnej rundzie porównywania modeli po benchmarkach, bo to coraz rzadziej jest właściwe pytanie.

**Key takeaways:**
- Molt od NVIDII jest projektowany z myślą o czytelności zarówno dla ludzi, jak i dla asystentów kodujących AI, co sygnalizuje nowe kryterium jakości infrastruktury badawczej.
- Instella-MoE od AMD publikuje pełny pipeline od pretreningu po RL wraz z danymi i kodem, będąc mniejszym, ale bardziej autentycznie otwartym wydaniem niż Kimi K3.
- Cohere i LangChain popychają firmy w stronę posiadania własnego harnessu agentowego zamiast wynajmowania dostępu do modelu, co jest interesowne, ale w gruncie rzeczy trafne.
- W miarę wyrównywania jakości modeli to warstwa orkiestracji i zarządzania kontekstem staje się realnym miejscem przewagi konkurencyjnej i realnym ryzykiem uzależnienia od dostawcy.

**Why do I care:** Jako architekt patrzę na to jako na potwierdzenie, że ocena dostawcy nie powinna kończyć się na porównaniu benchmarków modeli. Warto pytać, na ile harness, pamięć i orkiestracja są przenośne między dostawcami modeli, bo to tam realnie zamyka się w kleszczach na lata, nie w wyborze samego modelu.

**Link:** [AINews - Much ado about Open Weights](https://www.latent.space/p/ainews-much-ado-about-open-weights)
