---
title: "TanStack robi porządek z wykresami, Amazon płaci 860% więcej za agenta AI, a blog na Substacku sam się publikuje"
excerpt: "Przegląd z daily.dev: nowa biblioteka do wykresów od TanStack, prawdziwe dane o zatrudnieniu w Big Tech kontra narracja o AI, Bun jako natywny entrypoint na Vercel, przegląd bibliotek schedulerów w React oraz automatyzacja publikacji bloga przez n8n."
publishedAt: 2026-08-11
slug: "tanstack-charts-ai-koszty-automatyzacja-bloga"
hashtags: "#dailydev #frontend #webdev #react #performance #ai #architecture #typescript #generated #pl"
source_pattern: "daily.dev"
---

## TanStack Charts, czyli w końcu ktoś przemyślał wykresy od nowa

**TLDR:** TanStack wypuściło nową bibliotekę do wykresów oparta na podejściu grammar-of-graphics, znanym z ggplot2 w R. Zamiast gotowych typów wykresów dostajemy kompozycję znaczników, skal i mapowań, a do tego mniejszy bundle niż Chart.js i zdecydowanie mniejszy niż Recharts.

**Summary:** TanStack ma już na koncie router, query i table, więc kiedy ogłaszają kolejny projekt, warto się zatrzymać. Tym razem biorą na cel wykresy, temat, w którym ekosystem JS od lat radzi sobie średnio. Zamiast definiować z góry typ wykresu, czyli bar chart, line chart, pie chart jako odrębne komponenty z własnym API, TanStack Charts pozwala budować wizualizację z klocków: marks, scales i mappings. To dokładnie ten sam sposób myślenia, który stoi za ggplot2, tylko przeniesiony do TypeScriptu i przeglądarki.

W praktyce oznacza to, że biblioteka obsługuje około pięćdziesięciu pięciu typów znaczników, od zwykłych słupków i linii, przez sankey diagramy i tree mapy, po mapy świata i wykresy radarowe. Wszystko to bez pisania pięćdziesięciu pięciu osobnych komponentów. Rysowanie może iść przez SVG albo canvas, są animacje, tooltipy, interakcje w stylu brushing czy zoomowanie, a nawigacja klawiaturą jest wspierana od razu, nie jako dodatek na końcu roadmapy.

Ciekawy jest też system stylowania na trzech poziomach, czyli zmienne CSS, bloki tematyczne i właściwości per znacznik. To odpowiada na realny problem z bibliotekami wykresów, gdzie zmiana jednego koloru często wymaga przekopania się przez props na kilku poziomach zagnieżdżenia. Do tego API jest niezależne od frameworka, z osobnym adapterem do React, więc zespoły backendowe czy używające innego frontendu też mogą to wziąć pod uwagę.

Liczby na bundle mówią same za siebie: 36 do 43 KB u TanStacka, 45 do 58 KB u Chart.js i 153 do 168 KB u Recharts. Różnica między Recharts a TanStack Charts to nie jest kosmetyka, to realny wpływ na czas ładowania strony, zwłaszcza na słabszym połączeniu mobilnym.

**Key takeaways:**
- Podejście grammar-of-graphics zamiast gotowych typów wykresów daje większą elastyczność przy mniejszym API
- Bundle 36-43 KB stawia TanStack Charts wyraźnie przed Chart.js i Recharts
- Trzypoziomowy system stylowania (CSS variables, theme blocks, per-mark properties) rozwiązuje typowy ból ze stylowaniem wykresów
- Biblioteka jest framework-agnostic z dedykowanym adapterem React i pełnym typowaniem
- Autorzy deklarują, że API zaprojektowano tak, by dało się je używać bez czytania dokumentacji, także przez AI

**Why do I care:** Recharts od lat jest domyślnym wyborem w projektach React, bo "wszyscy go używają", a nikt nie pyta, ile faktycznie kosztuje w bundlu. 150+ KB na bibliotekę wykresów to potrafi być więcej niż cała reszta strony razem wzięta. Jeśli TanStack Charts dowiezie stabilność i ekosystem wtyczek na poziomie ich Query czy Table, to będzie pierwszy realny kandydat do wymiany Recharts w nowych projektach, a nie kolejna biblioteka, która ładnie wygląda na GitHubie i umiera po dwóch wydaniach.

**Link:** [TanStack Did It Again... They Fixed Charts](https://daily.dev/posts/4AiM3Ew4s)

---

## Big Tech zwalnia i zatrudnia jednocześnie, a agent AI kosztował Amazon 1,8 miliona dolarów

**TLDR:** Google i Meta ogłaszały głośne redukcje etatów, ale w tym samym czasie ich całkowite zatrudnienie wzrosło, odpowiednio o 16 tysięcy i ponad 8 tysięcy osób w ciągu trzech lat. Wewnętrzny projekt AI w Amazonie przekroczył budżet o 860%, generując 1,8 mln dolarów kosztów, zanim ktokolwiek to zauważył.

**Summary:** Narracja "AI zabiera ludziom pracę" jest wygodna medialnie, ale dane z artykułu pokazują coś innego. Google, Meta i Amazon owszem, zwalniały konkretne zespoły i projekty, ale w tym samym czasie intensywnie zatrudniały w AI, infrastrukturze cloud i cyberbezpieczeństwie. Efekt netto to wzrost, nie spadek zatrudnienia. Autor stawia tezę, że duża część tych zwolnień to korekta po przesadnym rekrutowaniu w czasie pandemii, tylko przepakowana w narrację o transformacji AI, bo tak lepiej wygląda w komunikacji do inwestorów.

Najciekawszy fragment dotyczy jednak nie samych liczb zatrudnienia, a konkretnego case study z Amazona. Wewnętrzny projekt agentowy oparty na Claude Sonnet miał dopasowywać autorów do listingów produktów. Projekt nigdy nie wystartował produkcyjnie, działał pięć miesięcy bez wykrycia, i w tym czasie zdążył wygenerować 1,8 mln dolarów kosztów, czyli 860% ponad zaplanowany budżet. To nie jest literówka, to jest mechanizm typowy dla systemów agentowych: każdy błąd logiczny w łańcuchu decyzyjnym odpala retry, kolejne wywołania narzędzi i dodatkowe zapytania do modelu, a wszystko to jest rozliczane per token.

Artykuł zwraca uwagę, że do tego konkretnego zadania prawdopodobnie wystarczyłby klasyczny model ML, dużo tańszy i dużo bardziej przewidywalny w kosztach. Duża część wydatków na enterprise AI to eksperymentowanie z pozycji strachu, że "trzeba coś zrobić z AI", a nie zweryfikowany wzrost produktywności. Case study z Toyoty z 2014 roku, przywołane w tekście, ilustruje inny, starszy problem: automatyzacja procesu, w którym ludzie się uczą, może wyciąć samą zdolność organizacji do uczenia się.

Wniosek autora jest trzeźwy: firmy zaczynają na nowo doceniać ludzi, w tym pracowników juniorskich, do nadzorowania i wdrażania systemów AI. Nie dlatego, że AI zawiodło jako technologia, ale dlatego, że bez ludzkiego nadzoru koszty i błędy potrafią eksplodować w tempie, którego żaden dashboard nie złapie na czas.

**Key takeaways:**
- Google zwiększył zatrudnienie netto o 16 tys. osób w ciągu trzech lat, mimo głośnych zwolnień
- Meta w tym samym okresie dodała ponad 8 tys. pracowników netto
- Projekt agentowy w Amazonie przekroczył budżet o 860%, generując 1,8 mln dolarów kosztów w pięć miesięcy niezauważony
- Systemy agentowe kumulują koszty przez retry i dodatkowe wywołania modelu przy każdym błędzie logicznym
- Case study Toyoty z 2014 roku pokazuje ryzyko automatyzacji procesu, w którym ludzie się uczą

**Why do I care:** To jest dokładnie ten typ artykułu, który powinien wisieć na tablicy w każdym zespole planującym "wdrożenie agentów AI do produkcji". 860% przekroczenia budżetu bez wykrycia przez pięć miesięcy to nie jest awaria, to jest brak monitoringu kosztów na poziomie, na jakim traktujemy błędy w logach czy zużycie pamięci. Jeśli traktujesz wywołania LLM jak zwykłe API call, to prędzej czy później dostaniesz taki właśnie rachunek, bo agent, który sam decyduje kiedy powtórzyć zapytanie, jest z definicji nieprzewidywalny kosztowo. Warto to potraktować jako argument za twardymi limitami budżetowymi i alertami na poziomie infrastruktury, a nie za rezygnacją z AI w ogóle.

**Link:** [Tech companies are quietly hiring again](https://daily.dev/posts/tD9B5onHs)

---

## Bun.serve() jako natywny entrypoint na Vercel Functions

**TLDR:** Vercel dodał wsparcie dla Bun.serve() jako bezpośredniego entrypointu dla Vercel Functions, włącznie z natywnym WebSocketem. Wystarczy plik server.ts w katalogu głównym projektu i flaga bunVersion w vercel.json, bez owijania kodu w żaden framework.

**Summary:** Do teraz uruchomienie serwera Bun na Vercel zwykle oznaczało przechodzenie przez jakąś warstwę frameworka albo adapter, nawet jeśli chciało się po prostu wystawić routing zdefiniowany w Bun.serve(). Ta zmiana usuwa ten narzut. Deklarujesz server.ts z routes-based serwerem, ustawiasz "bunVersion": "1.x" w vercel.json, i Vercel deployuje to dokładnie tak, jak napisałeś, bez transformacji pod frameworka.

Ciekawszy jest fragment o WebSocketach, bo to pokazuje, jak Vercel liczy koszty dla połączeń długożyciowych. Handler WebSocket jest wspierany natywnie przez property websocket i server.upgrade(), a całość działa na Fluid compute z rozliczeniem Active CPU. W praktyce oznacza to, że płacisz za czas przetwarzania wiadomości, nie za czas, w którym połączenie po prostu wisi otwarte i nic się nie dzieje. To jest istotna różnica względem modeli rozliczania, gdzie utrzymywanie długiego połączenia kosztuje tyle samo, ile aktywna praca.

Jest jednak ograniczenie, o którym trzeba pamiętać: jedna instancja funkcji obsługuje wiele równoczesnych połączeń, ale połączenie jest przypięte do konkretnej instancji na całą jego długość życia. Jeśli potrzebujesz koordynować wiadomości między instancjami, na przykład w scenariuszu broadcastu do wszystkich klientów niezależnie od tego, do której instancji trafili, musisz dodać zewnętrzny data store, coś w rodzaju Redis czy podobnego mechanizmu pub/sub.

To jest kolejny krok w kierunku traktowania serverless jako realnej platformy dla long-lived connections, a nie tylko dla request-response. Wcześniej WebSockety na serverless były trochę oksymoronem, teraz z modelem rozliczania per aktywność, a nie per czas życia połączenia, zaczyna to mieć sens ekonomiczny.

**Key takeaways:**
- Bun.serve() można teraz deployować na Vercel Functions bez owijania w framework
- Flaga "bunVersion": "1.x" w vercel.json włącza runtime Bun
- WebSockety są wspierane natywnie przez property websocket i server.upgrade()
- Rozliczenie idzie przez Fluid compute z Active CPU, czyli płacisz za przetwarzanie, nie za czas trwania połączenia
- Koordynacja między instancjami wymaga zewnętrznego data store, bo połączenie jest przypięte do jednej instancji

**Why do I care:** Model rozliczania Active CPU dla WebSocketów to jest rzecz, na którą warto zwrócić uwagę niezależnie od tego, czy używasz Bun. To pokazuje, że serverless w końcu dogania realne przypadki użycia typu chat, live updates czy collaborative editing, gdzie do teraz trzeba było uciekać do dedykowanego serwera albo do usług typu Pusher czy Ably tylko dlatego, że rachunek za utrzymywanie otwartych połączeń na klasycznym serverless był nieprzewidywalny. Zanim jednak przeniesiesz produkcyjny WebSocket na Vercel, sprawdź realny koszt koordynacji między instancjami, bo to jest miejsce, gdzie architektura "prosta na papierze" zaczyna wymagać Redisa i dodatkowej warstwy stanu, którą i tak trzeba było zaprojektować.

**Link:** [Bun runtime for Vercel Functions now accepts Bun.serve as an entrypoint](https://daily.dev/posts/qBxln0JBo)

---

## Który scheduler w React wybrać, zanim zapłacisz za licencję

**TLDR:** Przegląd porównuje jedenaście bibliotek komponentów scheduler/kalendarz dla React, od darmowych jak FullCalendar i react-big-calendar, po komercyjne jak KendoReact, Syncfusion, DHTMLX i Bryntum. Artykuł zwraca też uwagę na Schedule-X, gdzie drag-and-drop przeniesiono z darmowej wersji do płatnego Premium w wersji 4.

**Summary:** Temat wygląda niewinnie, "potrzebuję kalendarza w React", ale w praktyce jest to jedna z tych decyzji architektonicznych, które ciężko odwrócić później, bo scheduler zwykle zżera się głęboko w model danych aplikacji. Artykuł systematyzuje wybór według konkretnych kryteriów: wolumen eventów, wsparcie dla powtarzających się wydarzeń, obsługa strefy czasowej, edycja przez drag-and-drop, model licencjonowania i wymagania cross-framework.

Dla prostego, darmowego kalendarza eventów autor wskazuje FullCalendar i react-big-calendar jako najsilniejsze opcje. Obie są na licencji MIT, obie mają aktywną społeczność, a FullCalendar dodatkowo działa też z Vue i Angular, co ma znaczenie, jeśli firma trzyma więcej niż jeden framework w portfolio produktów. Po drugiej stronie spektrum stoi enterprise resource planning, gdzie DHTMLX Scheduler wygrywa dzięki modelowi jednorazowej licencji komercyjnej, w kontrze do subskrypcji, na której oparte są KendoReact, Syncfusion i Bryntum.

Najbardziej pikantny fragment dotyczy Schedule-X. W wersji 4 biblioteki drag-and-drop i resizing eventów przeniesiono z darmowego core do płatnego tier Premium, mimo że w starszych wersjach te funkcje były dostępne bezpłatnie. To jest dokładnie ten scenariusz, przed którym warto ostrzegać zespoły, bo aktualizacja minor czy major w zależności open source, która wygląda niewinnie w changelogu, może po cichu wyciąć funkcję, na której oparta jest cała interakcja użytkownika w produkcie.

Cała reszta przeglądu, czyli DayPilot, CalendarKit, Planby, MUI X Scheduler, ma swoje nisze, ale generalny wniosek jest prosty: przed wyborem scheduler component library trzeba usiąść i realnie zmapować wymagania biznesowe na model licencjonowania, a nie tylko na listę features w dokumentacji marketingowej.

**Key takeaways:**
- FullCalendar i react-big-calendar to najsilniejsze darmowe opcje na licencji MIT dla ogólnych kalendarzy eventów
- DHTMLX Scheduler wyróżnia się jednorazową licencją komercyjną, w przeciwieństwie do modeli subskrypcyjnych konkurencji
- Od wersji 4 Schedule-X przeniósł drag-and-drop i resizing do płatnego tieru Premium
- Kryteria wyboru powinny obejmować wolumen eventów, powtarzające się wydarzenia, strefy czasowe i wymagania cross-framework
- KendoReact, Syncfusion i Bryntum kierują ofertę do enterprise z modelem subskrypcyjnym

**Why do I care:** Scheduler to jeden z tych komponentów, które ludzie próbują napisać sami "bo to tylko kalendarz", a potem odkrywają, że recurring events z regułami RRULE i obsługa stref czasowych to osobny mały projekt badawczy. Jeśli już decydujesz się na bibliotekę zewnętrzną, historia ze Schedule-X powinna być przypomnieniem, żeby przy każdym większym upgrade dependency sprawdzać changelog linia po linii, a nie tylko bumpować wersję w CI i liczyć, że testy złapią regresję. Testy nie złapią zmiany w modelu licencjonowania.

**Link:** [Best React scheduler component libraries](https://daily.dev/posts/qN8yOYFfu)

---

## Blog, który sam publikuje treści z Substacka przez n8n

**TLDR:** Autor przebudował swój blog tak, żeby automatycznie synchronizował treści z Substacka przez RSS, eliminując ręczne publikowanie w dwóch miejscach. Stack to n8n do pollingu RSS i zapisu metadanych do MySQL, PHP jako API i React jako frontend, przy czym cały pipeline automatyzacji jest niewidoczny dla przeglądarki.

**Summary:** Problem, od którego wszystko się zaczęło, jest bardzo prosty i bardzo częsty: pisanie na Substacku i ręczne kopiowanie tego samego artykułu na własny blog. Autor rozwiązał to, budując most między dwoma platformami, gdzie n8n odgrywa rolę silnika automatyzacji działającego w tle na harmonogramie. Workflow odpytuje RSS feed Substacka, wyciąga metadane, czyli tytuł, fragment, URL obrazka i GUID, i wykonuje upsert do MySQL.

Decyzja, która mi się szczególnie podoba, to radykalne uproszczenie starego modelu danych. Stary schemat trzymał pełną treść artykułu, głosowanie, śledzenie wyświetleń i renderowanie Markdown, czyli sporo funkcji, które w praktyce dublowały to, co i tak robi Substack. Nowy schemat trzyma tylko metadane, bo pełna treść i tak żyje na Substacku, a blog działa jako ładna wizytówka i punkt wejścia, nie jako drugi system CMS do utrzymania.

Techniczny detal, który zapobiega duplikatom, to pole source_guid z feedu RSS użyte jako klucz przy upsertach. To jest prosty, ale skuteczny mechanizm idempotencji, częsty w integracjach event-driven, gdzie ten sam webhook czy poll może przylecieć więcej niż raz. Drugi krok w n8n automatycznie oznacza najnowszy artykuł jako featured, więc nawet ten mały fragment "co jest teraz na topie" na stronie głównej nie wymaga ręcznej interwencji.

Architektonicznie ciekawe jest też odizolowanie n8n od przeglądarki. React rozmawia wyłącznie z PHP API, n8n działa w tle jako osobny proces integracyjny, którego frontend w ogóle nie widzi i nie musi wiedzieć, że istnieje. To jest wzorzec, który dobrze się skaluje, bo pipeline integracyjny można wymienić, zatrzymać albo rozbudować bez dotykania warstwy prezentacji.

**Key takeaways:**
- n8n odpytuje RSS feed Substacka na harmonogramie i wykonuje upsert metadanych do MySQL
- Stary schemat z pełną treścią, głosowaniem i renderowaniem Markdown zastąpiono lekkim modelem metadanych
- source_guid z RSS feedu działa jako klucz idempotencji, zapobiegając duplikatom przy powtórnym pollingu
- Drugi krok automatyzacji sam oznacza najnowszy artykuł jako featured, bez ręcznej interwencji
- React komunikuje się wyłącznie z PHP API, a n8n jest całkowicie niewidoczny dla warstwy frontendowej

**Why do I care:** To jest dobry przykład na to, że nie każdy problem integracyjny wymaga własnego kodu do parsowania RSS i harmonogramowania joba cron. n8n czy podobne narzędzie no-code/low-code w tej roli to rozsądny wybór, bo problem jest generyczny, "syncuj feed do bazy na harmonogramie", a nie specyficzny dla domeny aplikacji. Bardziej mi się jednak podoba decyzja o wycięciu duplikowanej funkcjonalności, czyli głosów, widoków, renderowania treści, tylko dlatego, że Substack już to robi. Ludzie zbyt często budują drugi system tam, gdzie wystarczy dobry proxy z metadanymi, a każda linijka logiki, którą nie musisz utrzymywać, jest linijką, która nigdy nie wywoła incydentu o trzeciej w nocy.

**Link:** [I rebuilt my blog so I never have to manually republish my Substack articles again.](https://daily.dev/posts/WljNhiErT)
