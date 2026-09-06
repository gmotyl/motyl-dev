---
title: "Tailwind Weekly #229: silnik cn, Anchor Positioning i pytanie o sens frontendowej edukacji"
excerpt: "Przegląd Tailwind Weekly #229: nowy silnik cn zastępujący tailwind-merge i clsx, natywne API do pozycjonowania względem kotwic, powrót do manifestu utility-first i głośny esej o tym, czy AI właśnie wysadziła frontend w powietrze."
publishedAt: "2026-09-06"
slug: "tailwind-weekly-229-cn-anchor-positioning-frontend-asteroid"
hashtags: "#tailwindweekly #tailwindcss #css #frontend #performance #architecture #generated #pl"
source_pattern: "Tailwind Weekly"
---

## cn: nowy silnik do łączenia klas Tailwind

**TLDR:** Duet aidenybai i twórcy shadcn/ui wypuścił `cn`, bibliotekę zastępującą jednocześnie `tailwind-merge` i `clsx`. Ten sam interfejs, pełna zgodność wyników, ale silnik liczący konflikty klas jest w typowym przypadku trzydzieści razy szybszy.

**Summary:** `cn` rozwiązuje dokładnie ten sam problem co para `clsx` plus `tailwind-merge`: łączy warunkowe klasy i usuwa konflikty, na przykład gdy `px-2` i `px-4` trafiają do tego samego wywołania. Różnica leży w środku. Autorzy przepisali silnik od zera, dodali cache oparty na identyczności argumentów (jeśli komponent renderuje się z tym samym zestawem klas co poprzednio, wynik wraca z pamięci bez ponownego liczenia) i twierdzą, że biblioteka nie ma ani jednej zależności. Działa wszędzie: w Reakcie, Vue, Svelte, Solidzie, Astro, zwykłych szablonach po stronie serwera, w przeglądarce, w Node, Bunie, Deno i na edge'u. Nie wymaga też shadcn/ui, mimo że to właśnie ten zespół ją utrzymuje.

Migracja jest zaprojektowana tak, żeby bolała jak najmniej: jedna komenda CLI (`npx shadcn@latest migrate cn`) podmienia importy w całym projekcie, a dla osób wolących zrobić to ręcznie autorzy podają dokładny diff dla `lib/utils.ts`. Zgodność z `tailwind-merge` nie jest deklaracją na wyrost. Zespół uruchomił 356 tysięcy testów różnicowych porównujących wyjście obu bibliotek na tych samych wejściach i twierdzi, że wyniki są identyczne. Do tego doszedł benchmark na korpusie z 58 publicznych repozytoriów i 144 265 realnych wywołań `cn()`, z geometryczną średnią przyspieszenia rzędu 37 razy względem starego zestawu. Najbardziej dramatyczna liczba dotyczy powtarzających się ciągów klas w dużym repo: tam różnica sięga 172 razy, bo cache identyczności po prostu pomija pracę przy powtórkach.

Konfiguracja niestandardowych motywów zachowuje ten sam kształt co `extendTailwindMerge` z `tailwind-merge`, więc przejście nie wymaga przepisywania reguł `classGroups`. Biblioteka wspiera Tailwind v4 z prefiksami (`createCn({ prefix: "tw" })`), a dla projektów wciąż na v3 autorzy wprost zalecają zostanie przy starszej wersji `tailwind-merge`. Cały pakiet waży 26 KB po minifikacji, a dla kogoś, komu i to za dużo, istnieje wariant `cn build` z tabelami kompilowanymi w czasie budowania.

**Key takeaways:**
- `cn` to drop-in replacement dla `clsx` + `tailwind-merge`, z jedną komendą migracyjną w CLI shadcn.
- Zero zależności, działa z dowolnym frameworkiem i środowiskiem uruchomieniowym.
- 356 000 testów różnicowych ma gwarantować identyczne wyniki z `tailwind-merge`.
- Realny zysk wydajnościowy pojawia się głównie tam, gdzie te same ciągi klas renderują się wielokrotnie (cache trafień).

**Why do I care:** Jeśli projekt renderuje tysiące komponentów na stronę i `tailwind-merge` faktycznie pojawia się w profilerze, migracja jest tania i odwracalna, więc nie ma powodu na nią czekać. Ale bądźmy szczerzy: dla większości aplikacji `clsx` + `tailwind-merge` nigdy nie było wąskim gardłem, więc realna wartość tej zmiany to bardziej mniejszy bundle i jedna zależność mniej niż namacalny skok wydajności w typowej aplikacji CRUD. Migrować warto, ale nie z powodu paniki wydajnościowej.

**Link:** [GitHub - shadcn-ui/cn](https://github.com/shadcn-ui/cn)

## Anchor Positioning: koniec ręcznego liczenia pozycji tooltipów

**TLDR:** Josh Comeau tłumaczy Anchor Positioning API, natywny sposób przypinania jednego elementu do drugiego (tooltip, dropdown, popover) bez JavaScriptu liczącego kolizje z krawędzią viewportu.

**Summary:** Problem jest stary jak UI w przeglądarce: tooltip ma pływać nad przyciskiem, ale gdy przycisk stoi tuż przy górnej krawędzi ekranu, tooltip wychodzi poza widoczny obszar. Historycznie rozwiązywało się to JavaScriptem liczącym pozycję w locie, kod, który z czasem robi się coraz bardziej pokracznie. Anchor Positioning API przenosi tę logikę do CSS. Element kotwiczący dostaje nazwę przez `anchor-name`, element docelowy wskazuje tę kotwicę przez `position-anchor`, a `position-area` opisuje, w którym z dziewięciu pól siatki 3x3 wokół kotwicy ma się znaleźć, na przykład `top center` dla tooltipa nad przyciskiem.

Najciekawszy fragment dotyczy przepełnienia. Gdy przeglądarka wykryje, że element docelowy wychodzi poza kontener podczas przewijania, sprawdza listę zapasowych pozycji z `position-try-fallbacks` i automatycznie przełącza na tę, która się mieści, na przykład z `top` na `bottom`. Słowo kluczowe `flip-block` upraszcza to jeszcze bardziej: odwraca stronę w osi blokowej i przy okazji odwraca też inne kierunkowe właściwości, więc `margin-bottom` samo zamienia się w `margin-top`, gdy dojdzie do przełączenia. Comeau przyznaje, że dopiero druga wersja tego API rozwiązuje realny problem, czyli stylowanie w zależności od tego, która pozycja zapasowa aktualnie działa. Rozwiązaniem jest nowy typ zapytania kontenera: element kotwiczący staje się "zakotwiczonym" kontenerem, a `@container anchored(fallback: bottom)` pozwala inaczej wystylować element podrzędny, gdy dojdzie do przełączenia, na przykład żeby dziubek tooltipa wskazywał we właściwą stronę.

Wersja druga działa na razie tylko w przeglądarkach opartych o Chromium, ale API jest częścią porozumienia Interop 2026 między dostawcami przeglądarek, więc reszta ma nadgonić do końca roku. Dla starszych przeglądarek Comeau poleca polyfill od Oddbird (bez wsparcia dla zapytań kontenerowych z drugiej wersji) albo zapytania funkcjonalne w stylu `@supports (position-area: top)`, które degradują do prostszego doświadczenia bez wskaźnika kierunku.

**Key takeaways:**
- Anchor Positioning zastępuje ręczne liczenie kolizji JS-em natywnym mechanizmem CSS opartym o `anchor-name`, `position-anchor` i `position-area`.
- `position-try-fallbacks` i `flip-block` automatycznie przełączają pozycję, gdy element wychodzi poza kontener.
- Zapytania kontenerowe z wersji drugiej pozwalają stylować element inaczej po przełączeniu pozycji, ale na razie tylko w Chromium.
- Dla starszych przeglądarek dostępny jest polyfill od Oddbird albo degradacja przez `@supports`.

**Why do I care:** To jeden z tych rzadkich przypadków, gdzie przeglądarka zabiera pracę bibliotece JS bez utraty elastyczności, warto już teraz sprawdzić, czy `Popover`, `Floating UI` czy własny hook do tooltipów da się częściowo zastąpić czystym CSS, zwłaszcza w projektach celujących wyłącznie w nowsze Chromium (np. wewnętrzne narzędzia firmowe). Dla publicznych produktów z realnym wsparciem dla Safari i Firefoksa to jeszcze nie czas na pełne zastąpienie, ale warto śledzić Interop 2026 i mieć plan migracji gotowy na moment, gdy pokrycie przeglądarek się domknie.

**Link:** [Getting Started with Anchor Positioning • Josh W. Comeau](https://www.joshwcomeau.com/css/anchor-positioning/)

## Manifest sprzed lat, który wciąż tłumaczy, dlaczego Tailwind wygląda jak wygląda

**TLDR:** Numer przypomina oryginalny tekst Adama Wathana "CSS Utility Classes and Separation of Concerns", historyczny wpis, w którym twórca Tailwinda opisał, jak doszedł od klasycznego CSS przez BEM aż do podejścia utility-first, zanim jeszcze Tailwind istniał jako produkt.

**Summary:** Wathan prowadzi czytelnika przez pięć faz własnej ewolucji. Faza pierwsza to klasyczne "separation of concerns": nazwy klas oparte na treści (`.author-bio`), a cała logika wizualna w CSS. Problem pojawia się szybko, bo CSS zaczyna być lustrzanym odbiciem struktury HTML, więc separacja jest iluzoryczna. Faza druga, BEM, obniża specyficzność i odrywa CSS od struktury DOM, ale rodzi nowy dylemat: dwa komponenty wyglądające identycznie (`.author-bio` i `.article-preview`) zmuszają do wyboru między duplikacją stylów, ryzykownym `@extend` albo złamaniem czystej semantyki nazw.

Faza trzecia to komponenty niezależne od treści, nazwane po tym, co robią wizualnie (`.card`, `.btn--primary`), a nie po tym, czym są semantycznie. Wathan pokazuje, jak kompozycja takich klocków ogranicza duplikację, ale generuje kolejny problem: modyfikatory typu `.actions-list--left` istnieją wyłącznie po to, żeby przypisać jedną właściwość CSS, więc udawanie, że są "semantyczne", nikogo nie oszukuje. Stąd faza czwarta, utility classes do drobnych, jednorazowych poprawek jak wyrównanie czy odstęp, i piąta, docelowa: utility-first, czyli budowanie całych komponentów z gotowych klasek i wyciąganie komponentu CSS dopiero wtedy, gdy powtarzalność stanie się bolesna, a nie z góry.

Najmocniejszy argument w tekście dotyczy spójności na dużą skalę. Wathan cytuje audyty dużych stylesheetów: GitLab z 402 unikalnymi kolorami tekstu, HelpScout ze 198, Stripe ze 189. Każdy nowy kawałek CSS to czysta karta, na której nic nie powstrzymuje przed wpisaniem koloru o jeden odcień innego niż gdzie indziej. Utility classes zamieniają tę czystą kartę w ograniczoną paletę wyborów, więc zamiast 380 kolorów tekstu projekt kończy z dziesięcioma czy dwunastoma. Wathan zastrzega przy tym wyraźnie, że nie postuluje budowania wszystkiego z samych utility'ek: tam, gdzie kombinacja klas powtarza się regularnie, warto wyciągnąć komponent, najlepiej przez szablony (Vue, komponent Reactowy), a nie przez CSS.

**Key takeaways:**
- Tekst opisuje pięć faz przejścia od semantycznego CSS przez BEM do utility-first, jeszcze zanim Tailwind istniał.
- Kluczowy argument to nie estetyka klas w HTML-u, tylko kierunek zależności między CSS a HTML.
- Audyty dużych repozytoriów (GitLab, Stripe, HelpScout) pokazują, jak klasyczny CSS eksploduje liczbą prawie identycznych wartości.
- Autor wprost odradza budowanie wszystkiego z gołych utility'ek, komponent nadal ma sens tam, gdzie się powtarza.

**Why do I care:** Ten tekst wart jest podesłania każdemu nowemu w zespole, kto przychodzi z uprzedzeniem "utility classes to inline styles z innej nazwy", bo odpowiada na ten zarzut wprost i konkretnie, nie sloganem. Ale dla kogoś, kto pracuje z Tailwindem od lat, prawdziwa wartość tego numeru leży gdzie indziej: to przypomnienie, że decyzja architektoniczna sprzed dekady wciąż determinuje, jak dziś wygląda dyskusja code review o tym, czy dany fragment JSX-a to już "zbyt dużo klas".

**Link:** [CSS Utility Classes and "Separation of Concerns"](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/)

## Nawrócony hejter Tailwinda, czyli druga strona tej samej monety

**TLDR:** Yannick Kouakou opisuje, jak pięć lat ideologicznego oporu wobec Tailwinda (i wcześniej Bootstrapa) rozpadło się po przeprowadzce do Francji i codziennej pracy z frameworkiem, którego wcześniej odrzucał bez sprawdzenia.

**Summary:** Historia zaczyna się od mentora, który w porę zablokował czternastoletniemu wtedy autorowi skrót do Bootstrapa, każąc najpierw nauczyć się CSS-a porządnie. Ta lekcja utrwaliła w nim jednocześnie solidne fundamenty i głęboką niechęć do wszystkiego, co przypomina framework CSS, niechęć, która później przeniosła się z wygasającego Bootstrapa na rosnący Tailwind. Przez ponad pięć lat autor odrzucał temat bez dyskusji, co miało konkretny koszt: po drodze przegapił narzędzia takie jak shadcn/ui, które dziś ocenia jako naprawdę dobre.

Punktem zwrotnym była przeprowadzka na studia we Francji, gdzie Tailwind był domyślnym wyborem w projektach akademickich i na praktykach. Codzienny kontakt zamienił opór w ciekawość, a research doprowadził go z powrotem do tekstu Adama Wathana o separation of concerns, czyli tego samego manifestu, który numer przypomina osobno. Dwa argumenty przekonały go ostatecznie: rozmiar CSS-u nie rośnie liniowo z projektem, bo silnik generuje tylko faktycznie użyte klasy, oraz koniec wojen o specyficzność i nazewnictwo, bo jedna klasa odpowiada jednej właściwości, bez efektu motyla przy zmianie stylu w jednym miejscu. Zarzut o werbozę rozwiązał dopiero w praktyce: jednostką faktoryzacji nie jest klasa, tylko komponent, więc stos klas istnieje raz, w definicji `<Button>`, a nie czterdzieści razy w kodzie wywołującym.

Dziś Tailwind napędza jego własne projekty: Intrivio, generator CV i listów motywacyjnych pod ATS, oraz Rigma, platforma do zarządzania pentestami, o której zresztą wspomina też jako sponsora tego numeru newslettera. Autor kończy refleksją, że prawdziwym błędem nie było wcześniejsze trzymanie wysokich standardów wobec CSS-a, tylko przeniesienie tego samego rygoru na ludzi, którzy wybrali inne narzędzie.

**Key takeaways:**
- Autor odrzucał Tailwind (i wcześniej Bootstrapa) przez ponad pięć lat bez rzeczywistego sprawdzenia narzędzia.
- Przełomem była codzienna praca z Tailwindem na studiach we Francji, nie żaden nowy argument teoretyczny.
- Kluczowe punkty przekonania: rozmiar CSS nie rośnie z projektem, koniec wojen o specyficzność, werboza rozwiązana na poziomie komponentu.
- Autor promuje przy okazji dwa własne produkty zbudowane na Tailwindzie, Intrivio i Rigma.

**Why do I care:** Ten wpis warto czytać razem z tekstem Wathana z tego samego numeru, bo pokazuje, jak manifest sprzed dekady wciąż nawraca ludzi jeden po jednym, tylko teraz przez pryzmat osobistej historii, a nie suchego argumentu. Trzeba jednak zauważyć, że to też częściowo autopromocja: dwa produkty autora są wymienione wprost, więc entuzjazm wobec Tailwinda ma tu też komponent marketingowy, nie tylko techniczny.

**Link:** [I used to hate Tailwind CSS. Here's what changed my mind](https://yannickkouakou.com/blog/why-i-hated-tailwind-css/)

## Asteroida, która właśnie uderzyła w edukację frontendową

**TLDR:** Nolan Lawson pisze o tym, jak znani edukatorzy frontendowi (Josh Comeau, Kent C. Dodds, Addy Osmani i inni) wycofują się z tematu albo przestawiają na AI, i zastanawia się, co to oznacza dla przyszłości tej dziedziny.

**Summary:** Punktem wyjścia jest obserwacja: ludzie, których Lawson podziwiał za tłumaczenie frontendu, albo się wycofują, albo zmienili temat na AI. Zadał więc Claude'owi pytanie, które sam uważa za dobry test wiedzy o wydajności przeglądarki: co sprawdzić, gdy trace w Chrome pokazuje wysoki koszt "Style" przy niskim koszcie "Layout". Odpowiedź modelu była, jego zdaniem, w pełni poprawna: złożoność i liczba selektorów, zakres unieważnienia stylu przy przełączeniu klasy wysoko w drzewie DOM, częstotliwość wywoływania przeliczeń w pętli czy animacji, propagacja odziedziczonych właściwości i zmiennych CSS, oraz granice Shadow DOM przy komponentach. To pytanie, na którym potykali się nawet doświadczeni deweloperzy frontendowi, model rozwiązał bez wyszukiwania w internecie.

Z tej pojedynczej obserwacji Lawson wyciąga szerszy wniosek o kierunku, w którym zmierza cała dziedzina. Kod frontendowy jest, jego zdaniem, mniej ryzykowny do oddania agentowi niż na przykład migracja bazy danych, bo błąd w komponencie React rzadko blokuje cały system, więc deweloperzy chętniej wrzucają wygenerowany kod prosto na produkcję bez pełnego code review. Drugi trend to malejące znaczenie developer experience względem outcome: Cursor i Viget przenieśli swoje kody z Solid i Lit z powrotem do Reacta, mimo że te frameworki są bardziej wydajne i mniej rozwlekłe, bo, jak przyznaje wprost zespół Cursora, "agenci znają Reacta". React jest nadreprezentowany w danych treningowych modeli, więc "agent experience" zaczyna liczyć się bardziej niż wygoda człowieka piszącego kod. Trzeci trend to malejące znaczenie nowych standardów webowych poprawiających samą ergonomikę pisania kodu (nowe skróty CSS, krótsza składnia JS), bo dla agenta napisanie trzech linijek zamiast jednej nie kosztuje nic, a nauczenie go nowszej, rzadszej składni bywa wręcz trudniejsze niż zostawienie starej.

Lawson nie kończy na czystym pesymizmie i podaje trzy kierunki, w które może pójść edukacja frontendowa. Po pierwsze, agenci wciąż muszą być uczeni myślenia architektonicznego, na przykład kiedy wybrać framework MPA jak Astro zamiast ciągnąć całą SPA z powodu przyzwyczajenia agenta do Reacta. Po drugie, budowanie stron przyjaznych agentom (jak inicjatywa Vercela `is-agentic`) to w gruncie rzeczy powrót do fundamentów, czyli renderowania po stronie serwera, dostępności i szybkości strony, tylko teraz sprzedawanych pod hasłem AI. Po trzecie, gdzieś w tle rośnie rynek na konsulting naprawiający "vibe-codowane" bagno, choć sam autor przyznaje, że to najsłabszy z jego trzech argumentów, bo kolejna generacja "samonaprawiających się" aplikacji webowych może to zamknąć już za rok czy dwa.

**Key takeaways:**
- Znani edukatorzy frontendowi wycofują się z tematu albo przestawiają na AI, co Lawson traktuje jako sygnał ostrzegawczy dla całej dziedziny.
- Frontendowy kod trafia na produkcję z mniejszą kontrolą, bo uważany jest za tańszy w naprawie niż backend czy migracje danych.
- "Agent experience" (to, co model zna z danych treningowych) zaczyna przeważać nad developer experience przy wyborze frameworka.
- Autor widzi trzy możliwe kierunki dla edukacji frontendowej: uczenie agentów architektury, budowanie stron przyjaznych agentom, konsulting naprawiający kod wygenerowany bez nadzoru.

**Why do I care:** Ten esej trafia w czuły punkt każdego, kto buduje karierę na eksperckiej wiedzy o przeglądarce, i mimo trzeźwego tonu Lawsona chce się z nim posprzeczać w jednym miejscu: argument o "agent experience" tłumaczy, dlaczego zespoły wracają do Reacta dzisiaj, ale nie tłumaczy, co się stanie, gdy modele zaczną równie dobrze rozumieć Solid czy Svelte, bo dane treningowe to nie stała fizyczna, tylko chwilowy stan rynku. To, co faktycznie wynika z tego tekstu dla architekta, to konkretna rekomendacja: inwestować czas zespołu w rzeczy, które agent i tak musi znać niezależnie od mody (dostępność, wydajność renderowania po stronie serwera, granice bezpieczeństwa), a nie w kolejną wewnętrzną konwencję nazewnictwa, którą i tak za rok zastąpi coś innego.

**Link:** [The asteroid currently hitting frontend web development](https://nolanlawson.com/2026/08/23/the-asteroid-currently-hitting-frontend-web-development/)

## monowind: terminalowe UI zbudowane z klas Tailwinda

**TLDR:** monowind renderuje zwykły HTML ostylowany Tailwindem jako siatkę znaków w stylu terminala, z ramkami rysowanymi znakami ASCII, zachowując przy tym w pełni działające linki, przyciski, formularze i dostępność.

**Summary:** Pomysł jest prosty do opisania i trudny do wykonania: pisze się zwykły HTML z klasami flex, grid czy padding, owija w znacznik `<mono-wind>`, a silnik renderuje go jako siatkę o stałych rozmiarach komórek, z obramowaniami rysowanymi znakami box-drawing i czcionką monospace wszędzie. Pod spodem cała semantyka zostaje: linki są linkami, przyciski da się kliknąć klawiaturą, formularze wysyłają dane, czytniki ekranu dostają normalny, dostępny DOM. Projekt obsługuje już layout blokowy, flex, grid (łącznie z subgrid i nazwanymi obszarami), układ wielokolumnowy z balansowaniem kolumn, tabele z obramowaniami renderowanymi jako współdzielone kraty ASCII, zawijanie tekstu, marginesy i przewijanie z natywną fizyką kontenera oraz paskiem przewijania narysowanym przez silnik.

Najciekawszy szczegół dotyczy stanów wskaźnika myszy. W domyślnym trybie zaznaczania siatki elementy niebędące interaktywnymi normalnie przepuszczają zdarzenia wskaźnika dalej, żeby zaznaczanie przeciągnięciem działało, co w typowym div-ie zabiłoby `:hover` i `:active`. monowind syntetyzuje oba zachowania naraz: silnik testuje trafienie wskaźnika względem układu komórek, a warianty Tailwinda `hover:` i `active:` (razem z `group-*` i `peer-*`) działają jak zwykle, z zachowaniem możliwości zaznaczania. Do tego dochodzą dodatki: `<mono-ascii>` renderuje bannery w stylu FIGlet z zachowanym semantycznym tekstem dla czytników ekranu, a `<mono-qr>` pakuje treść elementu jako skanowalny kod QR bezpośrednio w siatce znaków. Osobny pakiet z motywami odtwarza palety realnych systemów (DOS, Commodore 64, zielony fosfor, bursztyn, teletyp, BBS), z okresowo poprawnymi fontami i znakami obramowań.

Projekt jest oznaczony jako wczesna faza rozwoju, ale monorepo z Storybookiem, playgroundem do edycji HTML na żywo i przykładowymi aplikacjami dla Reacta, Solida i zwykłego Vite sugeruje, że to coś więcej niż weekendowy eksperyment.

**Key takeaways:**
- monowind renderuje zwykły HTML z klasami Tailwinda jako siatkę znaków w estetyce terminala, zachowując interaktywność i dostępność.
- Obsługuje flex, grid, subgrid, tabele, wielokolumnowy layout i przewijanie z natywną fizyką.
- Dodatkowe pakiety dorzucają bannery ASCII, kody QR w siatce znaków i motywy retro (DOS, C64, zielony fosfor).
- Projekt jest we wczesnej fazie, ale ma już Storybooka, playground i przykłady integracji z React, Solid i Vite.

**Why do I care:** To narzędzie niszowe z definicji, ale ma konkretne zastosowania: panele admina czy dashboardy CLI-first, strony produktów dla narzędzi deweloperskich, które chcą sprzedać estetykę terminala bez pisania prawdziwego terminala, albo po prostu efektowna strona portfolio. Warto śledzić, bo pokazuje ciekawy wzorzec technicznie: da się zbudować kompletnie inny system renderowania na bazie zwykłego DOM-u i utility classes, nie tracąc przy tym dostępności, co dla wielu "kreatywnych" projektów bywa pierwszą rzeczą poświęconą w imię efektu.

**Link:** [GitHub - benface/monowind](https://github.com/benface/monowind)

## Kolejna fala bibliotek komponentów spod znaku "kopiuj-wklej"

**TLDR:** Numer linkuje siedem stron z gotowymi komponentami UI w stylu shadcn: reactbits.dev, Magic UI, reui.io, Intent UI, blocks.so, beUI i spectrum-ui, wszystkie oferujące animowane bloki do wklejenia bezpośrednio w projekt.

**Summary:** Wspólny mianownik tych siedmiu stron to model, który spopularyzował shadcn/ui: zamiast instalować pakiet npm, kopiuje się kod komponentu prosto do repozytorium i modyfikuje go jak własny. reactbits.dev i Magic UI koncentrują się na animowanych efektach wizualnych, tła, przejścia, mikrointerakcje, myślane głównie pod landing page'e i strony marketingowe. reui.io i Intent UI idą w stronę bardziej klasycznych zestawów komponentów aplikacyjnych, zbliżonych funkcjonalnie do samego shadcn/ui, ale z własnym designem bazowym. blocks.so oferuje gotowe sekcje strony (hero, pricing, cennik, stopki) do składania w całe layouty bez pisania CSS od zera. beUI specjalizuje się w animowanych komponentach dla Reacta i Next.js. spectrum-ui idzie o krok dalej i po prostu agreguje komponenty z Aceternity UI, Magic UI i ShadCN UI w jedną kolekcję do wklejenia.

Rynek komponentów "kopiuj-wklej" zrobił się w ostatnim roku wyraźnie zatłoczony, a każda z tych bibliotek próbuje się wyróżnić inną kombinacją animacji, designu bazowego i zakresu (od pojedynczych przycisków po całe sekcje strony). Żadna z nich nie rozwiązuje jednak podstawowego kompromisu tego modelu dystrybucji: kod wklejony do repozytorium przestaje dostawać aktualizacje z góry, więc poprawki bezpieczeństwa czy dostępności w oryginalnej bibliotece nie trafią automatycznie do już wklejonych komponentów.

**Key takeaways:**
- Siedem nowych bibliotek komponentów UI, wszystkie w modelu "kopiuj-wklej" spopularyzowanym przez shadcn/ui.
- Różnią się głównie zakresem (pojedyncze komponenty vs. całe sekcje strony) i naciskiem na animacje kontra klasyczne komponenty aplikacyjne.
- spectrum-ui agreguje komponenty z kilku innych bibliotek (Aceternity, Magic UI, ShadCN) w jedną kolekcję.

**Why do I care:** Zanim ktoś w zespole wklei pierwszy komponent z którejkolwiek z tych stron, warto zadać pytanie o cykl życia: kto będzie aktualizował te komponenty za rok, gdy oryginalna biblioteka wypuści poprawkę dostępności, której nikt już nie zobaczy, bo kod dawno żyje własnym życiem w repozytorium projektu. Dla prototypu czy strony marketingowej to nieistotne, dla długożyjącej aplikacji produkcyjnej to dług techniczny odłożony na później, tylko incognito.

**Link:** [reactbits.dev](https://reactbits.dev/) · [Magic UI](https://magicui.design/) · [reui.io](https://reui.io/) · [Intent UI](https://intentui.com/) · [blocks.so](https://blocks.so/) · [beUI](https://beui.dev/) · [spectrum-ui](https://github.com/arihantcodes/spectrum-ui)