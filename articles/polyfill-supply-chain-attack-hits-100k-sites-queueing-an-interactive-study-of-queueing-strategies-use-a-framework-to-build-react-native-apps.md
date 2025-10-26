---
title: 'Polyfill Supply Chain Attack Hits 100k Sites Queueing An Interactive Study Of Queueing Strategies Use A Framework To Build React Native Apps'
excerpt: 'Przegląd 7 artykułów z ui.dev'
publishedAt: '2025-10-26'
slug: 'polyfill-supply-chain-attack-hits-100k-sites-queueing-an-interactive-study-of-queueing-strategies-use-a-framework-to-build-react-native-apps'
hashtags: '#generated #pl #react #ai #testing #performance'
---

## Polyfill supply chain attack hits 100K+ sites

Okej, to jest dokładnie ten rodzaj rzeczy, która powinna was wszystkich przestraszyć. Chińska firma kupiła domenę cdn.polyfill.io i konto GitHub w lutym tego roku, a od tego czasu wstrzykuje malware na ponad sto tysięcy stron internetowych. To klasyczny supply chain attack - używacie popularnej biblioteki, a ktoś podmienia wam ją pod spodem.

Najgorsze w tym wszystkim jest to, że ten malware był sprytnie zaprojektowany. Aktywował się tylko na mobilnych urządzeniach, w określonych godzinach, nie działał gdy wykrył administratora, i opóźniał wykonanie gdy znajdował narzędzia analityczne. Przekierowywał użytkowników na strony z zakładami sportowymi przez fałszywą domenę Google Analytics.

Oryginalny autor polyfill mówi jasno - w ogóle nie używajcie tego już, nowoczesne przeglądarki tego nie potrzebują. Cloudflare i Fastly mają bezpieczne alternatywy jeśli absolutnie musicie.

**Kluczowe wnioski:**
- Supply chain attacks są realne i niebezpieczne
- Zawsze sprawdzajcie kto kontroluje wasze zależności
- Nowoczesne przeglądarki nie potrzebują polyfill
- Używajcie CSP monitoring do kontroli ładowanego kodu

**Link:** https://sansec.io/research/polyfill-supply-chain-attack

Kluczowe wnioski:
- - Supply chain attacks są realne i niebezpieczne
- Zawsze sprawdzajcie kto kontroluje wasze zależności
- Nowoczesne przeglądarki nie potrzebują polyfill
- Używajcie CSP monitoring do kontroli ładowanego kodu
- https://sansec.io/research/polyfill-supply-chain-attack

Link: ** https://sansec.io/research/polyfill-supply-chain-attack

## Queueing – An interactive study of queueing strategies

Encore stworzył genialną interaktywną lekcję o strategiach kolejkowania. To nie jest suchy materiał teoretyczny - możecie faktycznie klikać i obserwować jak różne typy kolejek radzą sobie z ruchem.

Zaczynają od podstaw - jeden klient, jeden serwer, i pokazują jak bez kolejki requesty się gubią. Potem wprowadzają FIFO - first in, first out - gdzie requesty są obsługiwane w kolejności nadejścia. To wygładza przepływ, ale czasem nie jest optymalne.

Następnie mamy LIFO - last in, first out - gdzie najnowsze requesty są obsługiwane pierwsze. Brzmi dziwnie, ale w niektórych przypadkach ma sens, szczególnie gdy starsze requesty mogą być już nieaktualne.

Wreszcie priority queues - gdzie niektóre requesty mają wyższy priorytet. To jest kluczowe w systemach produkcyjnych gdzie nie wszystkie requesty są równie ważne.

**Kluczowe wnioski:**
- Kolejki są wszędzie w systemach rozproszonych
- FIFO to nie zawsze najlepsza strategia
- Priority queues pozwalają na lepsze zarządzanie zasobami
- Interaktywne nauka to przyszłość edukacji technicznej

**Link:** https://encore.dev/blog/queueing

Kluczowe wnioski:
- - Kolejki są wszędzie w systemach rozproszonych
- FIFO to nie zawsze najlepsza strategia
- Priority queues pozwalają na lepsze zarządzanie zasobami
- Interaktywne nauka to przyszłość edukacji technicznej
- https://encore.dev/blog/queueing

Link: ** https://encore.dev/blog/queueing

## Use a framework to build React Native apps

React Native team oficjalnie zmienił rekomendacje. Teraz mówią jasno - używajcie frameworka, a konkretnie Expo. To koniec ery "react-native init" jako domyślnego sposobu startowania projektów.

Dlaczego? Bo każdy tak czy inaczej buduje własny framework. Potrzebujecie routingu, nawigacji, zarządzania stanem, narzędzi do buildowania, deployment - to wszystko trzeba skonfigurować. Expo to wszystko ma out of the box.

Meta i Microsoft budują własne frameworki wewnętrznie, bo mają specyficzne potrzeby i zasoby. Ale dla większości z nas Expo jest lepszym wyborem niż reinventing the wheel.

Expo framework jest darmowy i open source. Płatne są tylko dodatkowe usługi jak EAS. Jeśli nie używaliście Expo ostatnio, to sprawdźcie co potrafią w 2024 - to już nie jest ta ograniczona platforma sprzed lat.

**Kluczowe wnioski:**
- Expo jest teraz oficjalnie rekomendowane przez React Native team
- Frameworki oszczędzają czas na konfiguracji
- Albo używasz frameworka, albo budujesz własny
- Expo znacznie się rozwinęło w ostatnich latach

**Link:** https://reactnative.dev/blog/2024/06/25/use-a-framework-to-build-react-native-apps

Kluczowe wnioski:
- - Expo jest teraz oficjalnie rekomendowane przez React Native team
- Frameworki oszczędzają czas na konfiguracji
- Albo używasz frameworka, albo budujesz własny
- Expo znacznie się rozwinęło w ostatnich latach
- https://reactnative.dev/blog/2024/06/25/use-a-framework-to-build-react-native-apps

Link: ** https://reactnative.dev/blog/2024/06/25/use-a-framework-to-build-react-native-apps

## How to monitor AI applications built with NVIDIA NIM

New Relic i NVIDIA połączyły siły żeby dać wam full-stack observability dla aplikacji AI. NVIDIA NIM to microservisy z zoptymalizowanymi modelami w kontenerach - Llama 3, Mistral, Mixtral i inne.

Problem z aplikacjami AI jest taki, że to nie są zwykłe aplikacje webowe. Macie do czynienia z modelami, które są black boxami, kosztownymi w uruchamianiu, i nieprzewidywalnymi w performance. Potrzebujecie specjalistycznego monitoringu.

New Relic AI Monitoring integruje się z NIM i daje wam wgląd w całą stack - od requestów HTTP przez API calls do samych modeli. Możecie śledzić performance, koszty, jakość odpowiedzi, i debugować problemy.

NIM rozwiązuje problem deploymentu AI - zamiast samemu optymalizować modele na różnej infrastrukturze, dostajecie gotowe, zoptymalizowane kontenery. Plus security i wsparcie w produkcji.

**Kluczowe wnioski:**
- AI aplikacje potrzebują specjalistycznego monitoringu
- NVIDIA NIM upraszcza deployment modeli AI
- Full-stack observability jest kluczowa dla AI w produkcji
- Koszty i performance to główne wyzwania w AI

**Link:** https://newrelic.com/blog/how-to-relic/ai-monitoring-for-nvidia-nim

Kluczowe wnioski:
- - AI aplikacje potrzebują specjalistycznego monitoringu
- NVIDIA NIM upraszcza deployment modeli AI
- Full-stack observability jest kluczowa dla AI w produkcji
- Koszty i performance to główne wyzwania w AI
- https://newrelic.com/blog/how-to-relic/ai-monitoring-for-nvidia-nim

Link: ** https://newrelic.com/blog/how-to-relic/ai-monitoring-for-nvidia-nim

## The true story of the origin of Mosaic and Netscape

Marc Andreessen opowiada prawdziwą historię powstania Mosaic i Netscape. To audio content, więc nie ma za dużo szczegółów do przeczytania, ale sam fakt że Andreessen dzieli się tą historią jest fascynujący.

Mosaic był pierwszą popularną przeglądarką internetową, a Netscape zrewolucjonizował web. Bez tych projektów internet wyglądałby zupełnie inaczej. Andreessen był jednym z kluczowych twórców obu projektów, więc to historia z pierwszej ręki.

To przypomina jak ważne są decyzje architektoniczne w kluczowych momentach rozwoju technologii. Wybory które wtedy podjęli, wciąż wpływają na to jak działa web dzisiaj.

**Kluczowe wnioski:**
- Historia technologii to często historia ludzi i ich decyzji
- Wczesne wybory architektoniczne mają długotrwały wpływ
- Web mógł wyglądać zupełnie inaczej
- Wartość historii z pierwszej ręki

**Link:** https://pmarca.substack.com/p/the-true-story-as-best-i-can-remember

Kluczowe wnioski:
- - Historia technologii to często historia ludzi i ich decyzji
- Wczesne wybory architektoniczne mają długotrwały wpływ
- Web mógł wyglądać zupełnie inaczej
- Wartość historii z pierwszej ręki
- https://pmarca.substack.com/p/the-true-story-as-best-i-can-remember

Link: ** https://pmarca.substack.com/p/the-true-story-as-best-i-can-remember

## Contextual QA for dev teams

CarbonQA to usługa która daje wam dedykowany team testerów z USA. Idea jest prosta - przestańcie marnować czas developerów na testowanie, dajcie im robić to co robią najlepiej - pisać kod.

To nie jest crowd-sourced testing ani mechanical turk. To relationship-based QA gdzie team uczy się waszego produktu, procesów, i co najważniejsze - waszego teamu. Dostajecie zaufanego partnera który rozumie kontekst.

Model biznesowy jest oparty na subskrypcji która zapewnia "project-ready" testerów - ludzi którzy już znają wasz projekt i są gotowi do pracy gdy ich potrzebujecie. Płacicie per tester per day gdy faktycznie testują.

Testują web, desktop, mobile, mają device lab, komunikują się przez Slack bezpośrednio z developerami. To skraca feedback loop i pomaga szybko identyfikować problemy.

**Kluczowe wnioski:**
- Outsourcing QA może uwolnić developerów do ważniejszych zadań
- Relationship-based QA jest lepsze niż crowd-sourced
- Context i znajomość produktu są kluczowe w testowaniu
- Szybki feedback loop między testerami a developerami

**Link:** https://carbonqa.com

Kluczowe wnioski:
- - Outsourcing QA może uwolnić developerów do ważniejszych zadań
- Relationship-based QA jest lepsze niż crowd-sourced
- Context i znajomość produktu są kluczowe w testowaniu
- Szybki feedback loop między testerami a developerami
- https://carbonqa.com

Link: ** https://carbonqa.com

## Flipdisc Display Build and Software Guide

Ktoś zbudował interaktywną ścianę z flipdisc displays - to te stare wyświetlacze które używają impulsów elektromagnetycznych żeby przerzucać małe dyski między dwoma kolorami. Technologia sprzed 80 lat, ale wciąż fascynująca.

Użyli 9 paneli Alfazeta w układzie 3x3, łącznie 84x42 dyski. Każdy panel ma ATMEGA128, setki diod MELF w układzie charlieplex, i przełączniki DIP do ustawiania adresu i baud rate.

Najtrudniejsze jest zdobycie komponentów - flipdisc są głównie dla biznesu, szczególnie transport publiczny. Zasilanie to 24V 1A per panel, więc potrzebowali 10A power supply. Rama z profili aluminiowych 80/20.

Najfajniejsze jest to że flipdisc robią dźwięk jak deszcz na oknie gdy się przerzucają. Plus nie świecą jak LED, więc lepsze do wall art. Mogą osiągnąć 25-60fps i mają długą żywotność.

**Kluczowe wnioski:**
- Stare technologie mogą być inspirujące dla nowych projektów
- Flipdisc to ciekawa alternatywa dla LED displays
- Sourcing komponentów to często największe wyzwanie
- Hardware hacking z partnerem to świetna zabawa

**Link:** https://flipdisc.io/

Kluczowe wnioski:
- - Stare technologie mogą być inspirujące dla nowych projektów
- Flipdisc to ciekawa alternatywa dla LED displays
- Sourcing komponentów to często największe wyzwanie
- Hardware hacking z partnerem to świetna zabawa
- https://flipdisc.io/

Link: ** https://flipdisc.io/