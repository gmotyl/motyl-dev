---
title: "Appwrite łączy Console z witryną, Cypress przyspiesza dzięki HTTP/2, a minifikacja CSS wciąż nie ma sensu"
excerpt: "Appwrite zespala stronę i konsolę w jedną aplikację na TanStack Start, Cypress 16 przycina czas testów HTTP/2, Hunk daje terminalowy podgląd zmian od agentów AI, w Apple ster przejmuje John Ternus, a stary tekst o CSS wraca z przypomnieniem, że minifikacja to głównie rytuał."
publishedAt: "2026-09-02"
slug: "appwrite-console-iv-cypress-16-hunk-apple-ternus-minifikacja-css"
hashtags: ["#dailydev", "#react", "#css", "#testing", "#cypress", "#ai", "#generated", "#pl"]
source_pattern: "daily.dev"
---

## Console IV: Appwrite łączy stronę i konsolę w jedną aplikację

**TLDR:** Appwrite przebudował swoją witrynę i panel administracyjny, tworząc jedną aplikację o nazwie Console IV, opartą na TanStack Start zamiast SvelteKit. Dokumentacja otwiera się teraz w bocznym panelu wewnątrz konsoli, doszedł Command Center do szybkich akcji oraz przeglądarkowy terminal z CLI i Explorer do testowania zapytań REST na żywo.

**Summary:** Appwrite od dawna utrzymywał dwa osobne produkty: publiczną stronę z dokumentacją i panel Console do zarządzania projektami. W Console IV te dwa światy się łączą. Dokumentacja przestaje być osobną zakładką w przeglądarce i pojawia się jako boczny panel bezpośrednio w konsoli, więc programista nie traci kontekstu, przełączając się między czytaniem instrukcji a klikaniem w interfejs.

Za tą zmianą stoi też przesiadka technologiczna. Appwrite porzucił SvelteKit na rzecz TanStack Start i tłumaczy to dojrzałością ekosystemu komponentów w React, gdzie dostępne są ShadCN, Radix czy TanStack Query i Router. Zespół dorzuca do tego argument, który w 2026 roku brzmi znajomo coraz częściej: agenty kodujące po prostu piszą lepszy kod w React niż w Svelte, więc utrzymanie jednego frameworka ułatwia pracę zarówno ludziom, jak i botom.

Nowy Command Center działa jak paleta poleceń, oferując skróty w kontekście konta, organizacji, projektu i dokumentacji jednocześnie. Do tego doszedł przeglądarkowy Terminal uruchamiający CLI Appwrite bez lokalnej instalacji oraz Explorer, czyli narzędzie do wysyłania zapytań REST na żywo i sprawdzania odpowiedzi API bez opuszczania konsoli. Ujednolicony kodebase ma też skończyć z sytuacją, w której strona z dokumentacją i sama konsola zaczynały wizualnie się rozjeżdżać.

Console IV wystartował razem z Appwrite 2.0 podczas tygodnia Init, a wsparcie dla self-hostingu w Community Edition ma pojawić się wkrótce potem.

**Key takeaways:**
- Appwrite połączył witrynę i Console w jedną aplikację na TanStack Start, rezygnując z SvelteKit.
- Dokumentacja otwiera się teraz w bocznym panelu w konsoli, a nie jako osobna strona.
- Doszły trzy nowe narzędzia: Command Center, przeglądarkowy Terminal z CLI i Explorer do zapytań REST.

**Why do I care:** Przesiadka na React "bo agenty piszą w nim lepszy kod" to zdanie, które za pięć lat będzie cytowane jako moment, w którym wybór frameworka przestał być wyborem zespołu, a stał się wyborem pod maszynę. Rozumiem argument biznesowo, bigger talent pool i mniej driftu między dokumentacją a produktem to realne korzyści, ale jest w tym coś niepokojącego: firmy zaczynają optymalizować architekturę pod czytelność dla LLM-a, a nie pod ludzi, którzy będą to utrzymywać za dwa lata. Sam interfejs, dokumentacja w panelu bocznym i live Explorer do REST, to akurat dobre, praktyczne rzeczy i szkoda, że nie są standardem w każdym narzędziu deweloperskim od lat.

**Link:** [Announcing Console IV: The website and Console as one app](https://daily.dev/posts/HPhp4t0No)

## Czy minifikacja CSS w ogóle ma sens (tekst z 2023)

**TLDR:** Stary, ale wciąż aktualny tekst sprawdza, ile faktycznie daje minifikacja CSS przy włączonej kompresji gzip. Odpowiedź brzmi: prawie nic, bo dla Bootstrapa minifikacja daje dodatkowe 2 KB oszczędności po gzipowaniu, a różnice w czasie parsowania mieszczą się w pojedynczych milisekundach nawet przy dziesiątkach tysięcy reguł.

**Summary:** Autor wziął dane z CSS-Tricks i policzył, ile waży CSS dużej biblioteki jak Bootstrap w trzech wariantach: surowym, po samym gzipie i po minifikacji plus gzipie. Sam gzip ściska 147 KB do 22 KB. Minifikacja przed gzipowaniem zbija to jeszcze do 20 KB, czyli o 2 KB mniej. Przy realnych rozmiarach strony to różnica, której użytkownik fizycznie nie odczuje.

Drugi eksperyment dotyczył czasu parsowania CSS przez przeglądarkę. Autor wygenerował arkusze z 10 000 i 100 000 bloków deklaracji i zmierzył różnicę między wersją z białymi znakami a bez nich. Przy 10 000 blokach różnica wyniosła 9-10 milisekund, przy 100 000 bloków 95-105 milisekund. Dla typowego arkusza z 1000 blokami różnicy w ogóle nie dało się zmierzyć, bo parsowanie kończyło się zanim stoper zdążył cokolwiek złapać.

Trzeci test poszedł dalej i sprawdził realny wpływ na wczytywanie strony przez WebPageTest, porównując duże i małe pliki CSS, z komentarzami i bez, minifikowane i surowe. Najgorszy zmierzony przypadek to 54 milisekundy różnicy, i to na wolnym, słabym urządzeniu, gdzie każdy dodatkowy krok obciąża wynik bardziej niż na nowoczesnym telefonie.

Wniosek autora jest prosty: gzip albo Brotli same w sobie wystarczają dla niemal każdej strony, a minifikacja CSS w większości przypadków tylko psuje czytelność kodu w zamian za oszczędności, których nikt nie zauważy.

**Key takeaways:**
- Minifikacja CSS Bootstrapa daje dodatkowe 2 KB oszczędności ponad to, co i tak daje gzip.
- Parsowanie arkusza ze 100 000 blokami deklaracji różni się o 95-105 ms zależnie od obecności białych znaków, a dla typowych stylesheetów różnicy nie da się zmierzyć.
- Najgorszy zmierzony w WebPageTest scenariusz to 54 ms różnicy na wolnym urządzeniu.

**Why do I care:** To dokładnie ten typ tekstu, który powinien wisieć na ścianie każdego zespołu frontendowego, który spiera się o kolejny krok w pipeline budowania, zamiast zmierzyć, ile on realnie daje. Mam wrażenie, że część narzędzi w naszym ekosystemie przetrwała nie dlatego, że działają, tylko dlatego, że nikt nie sprawdził, czy w ogóle robią różnicę. Jeśli twój build trwa dłużej przez krok, który oszczędza 2 KB po gzipie, to nie optymalizujesz wydajności, tylko rytuał.

**Link:** [Is Minifying CSS Necessary? (2023)](https://daily.dev/posts/rkdZeFgF1)

## Hunk, terminalowy podgląd diffów zrobiony z myślą o kodzie od agentów AI

**TLDR:** Hunk to open source'owe narzędzie terminalowe do przeglądania zmian w kodzie, zaprojektowane specjalnie pod code review commitów wygenerowanych przez agenty AI. Ma wielo-plikowy widok z nawigacją w bocznym panelu, adnotacje od agenta wprost w diffie, tryby split i stacked oraz watch mode, który sam odświeża widok przy kolejnych zmianach.

**Summary:** Hunk powstał jako odpowiedź na sytuację, która coraz częściej pojawia się w codziennej pracy: agent AI napisał kilkanaście zmian w kilku plikach naraz, a programista musi to szybko zweryfikować, zanim zatwierdzi commit. Standardowe narzędzia do diffów, jak delta czy difftastic, nie były projektowane pod ten scenariusz, więc Hunk dokłada rzeczy, których tamtym brakuje.

Kluczowa jest tu warstwa adnotacji. Agent może zostawić w diffie własny komentarz, np. dlaczego zmienił dany fragment albo na co zwrócić uwagę, a Hunk pokazuje to inline, obok samego kodu. Do tego dochodzi responsywny układ, który sam przełącza się między widokiem split (dwie kolumny obok siebie) a stacked (jedna pod drugą) zależnie od szerokości terminala i liczby zmienionych plików.

Narzędzie integruje się jako pager Gita, więc można go użyć zamiast domyślnego `git diff`, i wspiera nie tylko Gita, ale też Jujutsu i Sapling, czyli nowsze systemy kontroli wersji zyskujące popularność w niektórych zespołach. Instalacja idzie przez npm lub Homebrew, a workflow z agentami obsługuje mechanizm skill file, czyli plik opisujący agentowi, jak korzystać z Hunka w danym repozytorium.

Tabela porównawcza w repozytorium zestawia Hunka z delta, difftastic i diff-so-fancy i pokazuje, że inline'owe adnotacje od agenta oraz responsywny auto-layout to funkcje, których żadne z tamtych narzędzi nie ma.

**Key takeaways:**
- Hunk to terminalowy diff viewer zaprojektowany pod przeglądanie zmian wygenerowanych przez agenty AI.
- Wspiera Git, Jujutsu i Sapling, i można go podpiąć jako pager Gita.
- Wyróżnia go inline'owe pokazywanie adnotacji agenta w diffie oraz automatyczne przełączanie między widokiem split i stacked.

**Why do I care:** To narzędzie, które nie powstałoby rok temu, bo problem, który rozwiązuje, jeszcze nie istniał w tej skali. Kiedy agent potrafi napisać PR z dwudziestoma zmienionymi plikami w pięć minut, wąskim gardłem przestaje być pisanie kodu, a staje się jego zrozumienie przez człowieka, który go podpisuje. Adnotacje agenta wprost w diffie to dobry kierunek, pod warunkiem że nie zaczniemy im ślepo ufać i traktować jako zamiennik faktycznego czytania kodu, bo wtedy code review stanie się fikcją z ładniejszym interfejsem.

**Link:** [A review-first terminal diff viewer for agent-authored changesets](https://daily.dev/posts/JQPrHnl2p)

## Zaczyna się era Johna Ternusa w Apple

**TLDR:** Tim Cook zszedł ze stanowiska CEO Apple 1 września po piętnastu latach, w trakcie których wartość firmy urosła z 350 miliardów do ponad 4,5 biliona dolarów, i objął stanowisko przewodniczącego rady. Nowym CEO został szef działu sprzętu, John Ternus, który dostaje w spadku strategię AI, opóźnione poprawki Siri, nieudany start Vision Pro i konieczność ograniczenia zależności produkcji od Chin.

**Summary:** Zmiana na fotelu CEO Apple to nie jest zaskoczenie, o którym plotkowano od miesięcy, ale sam fakt jej wykonania zamyka jeden z dłuższych rozdziałów w historii firmy. Tim Cook przez piętnaście lat prowadził Apple przez okres, w którym wartość rynkowa firmy wzrosła ponad dwunastokrotnie, z 350 miliardów do przeszło 4,5 biliona dolarów. Teraz przechodzi na stanowisko przewodniczącego rady nadzorczej, zachowując wpływ, ale oddając operacyjne stery.

John Ternus, dotychczasowy szef działu sprzętu, obejmuje CEO w momencie, w którym lista otwartych problemów jest długa. Strategia AI Apple wciąż nie ma jasnego kształtu na tle konkurencji, poprawki do Siri opóźniają się od dobrych paru kwartałów, a Vision Pro, produkt, który miał być następnym wielkim krokiem po iPhonie, nie zdobył rynku w sposób, jaki firma zakładała.

Do tego dochodzi temat, który dotyczy nie tyle produktu, co łańcucha dostaw: Apple próbuje zmniejszyć zależność produkcji od Chin, rozbudowując linie w Indiach i Wietnamie. To proces rozciągnięty na lata i wymagający zupełnie innych kompetencji niż projektowanie sprzętu, w którym Ternus się wyrobił.

**Key takeaways:**
- Tim Cook odchodzi z fotela CEO 1 września po 15 latach, obejmując rolę przewodniczącego rady.
- Nowym CEO zostaje John Ternus, dotychczasowy szef działu sprzętu w Apple.
- Ternus dziedziczy niedokończoną strategię AI, opóźnione poprawki Siri, słaby start Vision Pro i przenoszenie produkcji z Chin do Indii i Wietnamu.

**Why do I care:** Ciekawe będzie patrzeć, czy inżynier sprzętu na czele Apple da firmie coś, czego brakowało jej ostatnio najbardziej, czyli dowiezionego produktu zamiast zapowiedzi. Cook był świetnym operacyjnym menedżerem łańcucha dostaw, ale to za jego kadencji Apple przespało kilka fal AI i wypuściło Vision Pro, które teraz cytuje się jako przykład dobrego inżynieringu bez jasnego pomysłu na produkt. Dla nas, ludzi budujących software, zmiana na szczycie Apple ma znaczenie o tyle, że kierunek, jaki obierze firma w AI, wpłynie na to, jakie API i narzędzia dostaniemy jako deweloperzy w iOS i macOS w najbliższych latach.

**Link:** [The John Ternus era begins at Apple](https://daily.dev/posts/Y8a5Z5rPl)

## Cypress 16 przyspiesza testy dzięki wsparciu dla HTTP/2

**TLDR:** Cypress 16 atakuje kilka źródeł powolnych i niestabilnych testów end-to-end naraz. Domyślnie włączone HTTP/2 w przeglądarkach opartych na Chromium skraca czas ładowania stron z wieloma zasobami niemal trzykrotnie, a do tego dochodzą szybsze sprawdzanie widoczności elementów, zerowe opóźnienie wpisywania tekstu i stabilne zarządzanie pamięcią przeglądarki.

**Summary:** Największa zmiana to domyślne włączenie HTTP/2 w przeglądarkach opartych na Chromium, czyli Chrome, Chromium i Edge. Dzięki temu strony z wieloma żądaniami ładują zasoby równolegle zamiast ustawiać je w kolejce. W benchmarku ze stroną ładującą 1000 obrazków czas spadł z 3896 ms przy HTTP/1.1 do 1362 ms przy HTTP/2. Warto pamiętać, że Electron, Firefox i WebKit wciąż korzystają z HTTP/1.1, więc przyspieszenie dotyczy głównie testów uruchamianych w Chrome.

Drugi obszar zmian to szybkość wykonywania komend. Domyślne opóźnienie przy `cy.type()` spadło z 10 ms symulujących ludzkie wpisywanie do 0 ms, co realnie skraca testy formularzy z wieloma polami. Legacy algorytm sprawdzania widoczności elementów, który przechodził po drzewie przodków i sprawdzał style CSS, zastąpiono szybszą kombinacją natywnego sprawdzenia przeglądarki i próbkowania punktów, co ogranicza narzut na dużych, głęboko zagnieżdżonych aplikacjach. Oba zachowania da się cofnąć przez opcje `keystrokeDelay` i `visibilityStrategy: 'legacy'`, jeśli coś się posypie.

Trzecia grupa zmian dotyczy stabilności. Komendy odczytujące ciasteczka i storage teraz automatycznie ponawiają się jak zapytania, co ma ograniczyć losowe faile testów. Zarządzanie pamięcią przeglądarki (`manageBrowserMemory`) stało się stabilne i włączone domyślnie, więc długie przebiegi testów przestają zawieszać renderer przez wyciek pamięci.

Cypress 16 podnosi też wersje pod spodem: Node.js do 24, Electron do 41, Chromium do 146. Usunięto `Cypress.env()` na rzecz `cy.env()` i `Cypress.expose()`, bo poprzednie rozwiązanie wstrzykiwało wszystkie zmienne środowiskowe do przeglądarki, wystawiając sekrety na aplikację, skrypty firm trzecich i konteksty cross-origin. Zniknęły też `cy.exec()`, `cy.end()`, wsparcie dla CoffeeScript oraz starsze wersje Angulara, Vite i Next.js w component testing, a przeglądarka Electron trafiła na listę deprecated. Do migracji dołączono przewodnik z gotowym promptem pod asystenta AI.

**Key takeaways:**
- HTTP/2 domyślnie włączone w przeglądarkach Chromium skraca ładowanie strony z 1000 obrazkami z 3896 ms do 1362 ms.
- `Cypress.env()` zniknął z powodów bezpieczeństwa, zastąpiony przez `cy.env()` i `Cypress.expose()`.
- `manageBrowserMemory` jest teraz stabilne i domyślnie włączone, co ma zapobiegać zawieszaniu się renderera przy długich przebiegach testów.

**Why do I care:** Usunięcie `Cypress.env()` to ten rodzaj breaking change, który wygląda na uciążliwy w changelogu, a w praktyce naprawia coś, co powinno zostać naprawione lata temu, bo wstrzykiwanie wszystkich zmiennych środowiskowych do przeglądarki to dziura bezpieczeństwa czekająca na odkrycie przez kogoś złośliwego. HTTP/2 jako domyślny transport w testach to z kolei przypomnienie, że infrastruktura testowa potrafi latami ciągnąć za sobą stare założenia protokołowe, których nikt nie kwestionuje, dopóki ktoś nie zmierzy różnicy w milisekundach i nie pokaże, ile realnie tracimy.

**Link:** [Cypress 16: faster tests, starting with HTTP/2 support](https://daily.dev/posts/wnAxuP61o)
