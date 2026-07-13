---
title: "eslint-plugin-tailwindcss coraz mądrzejszy, sekrety DevTools i Nuxt UI w akcji"
excerpt: "W tym tygodniu: inteligentniejsze reguły lintowania dla Tailwind CSS, garść praktycznych trików UI, głębokie nurkowanie w CSS containment i kilka ciekawych narzędzi open-source."
publishedAt: "2026-07-11"
slug: "tailwind-weekly-222-eslint-plugin-devtools-nuxt-ui"
hashtags: "#tailwind #css #frontend #eslint #vue #nuxtui #performance #webdev #generated #pl"
source_pattern: "Tailwind Weekly"
---

## eslint-plugin-tailwindcss v4.1.0: reguła no-unnecessary-arbitrary-value nareszcie rozumie kontekst

**TLDR:** Nowa wersja pluginu ESLint dla Tailwind CSS potrafi wykrywać i automatycznie naprawiać zbędne wartości arbitralne w klasach, rozumiejąc konwersje jednostek i konfigurację spacingu. To konkretna, codzienna oszczędność czasu.

**Summary:** Przez długi czas reguła `no-unnecessary-arbitrary-value` działała tylko na dokładnych dopasowaniach stringów. Jeśli napisałeś `inset-[1px]`, a preset `px` istniał, reguła mogła to pominąć, bo nie robiła żadnej analizy jednostek. W wersji 4.1.0 to się zmienia i zmienia się zasadniczo.

Plugin teraz rzeczywiście rozumie, co robisz. Widzi `inset-[1px]` i wie, że istnieje natywny preset `inset-px`. Widzi `z-[123]` i podpowiada `z-123`. Widzi `m-[8px]` i, parsując konfigurację Tailwinda v4, wie że przy domyślnym spacingu 0.25rem na jednostkę, 8px to dokładnie 2 jednostki, więc sugeruje `m-2`. Fixer respektuje też modyfikator `!important`, co wcześniej powodowało problemy.

To jest właśnie ten typ poprawki, który sprawia, że narzędzie staje się naprawdę użyteczne zamiast tylko formalnie poprawne. Tyle razy widziałem codebasy zasypane wartościami arbitralnymi, gdzie twórcy po prostu nie wiedzieli, że natywny odpowiednik istnieje. Teraz ESLint im o tym powie i sam to naprawi.

Co ciekawe, plugin w wersji 4 to całkowity rewrite w TypeScript, bazujący na wewnętrznych zasobach Tailwind CSS, konkretnie na `prettier-plugin-tailwindcss` i `tailwind-api-utils`. To nie jest patch na starym kodzie. Wymaga Tailwind CSS v4, ESLint w formacie flat config i Node.js 20.19.0 lub nowszego.

**Key takeaways:**
- Reguła `no-unnecessary-arbitrary-value` rozumie teraz konwersje jednostek i konfigurację spacingu w Tailwind v4.
- Fixery automatycznie naprawiają wykryte problemy, szanując przy tym modyfikator `!important`.
- Plugin v4 to kompletny rewrite wymagający Tailwind v4 i ESLint flat config.

**Why do I care:** Każdy projekt z kilkoma developerami ma problem z arbitralnymi wartościami, które wkradają się bo ktoś nie wiedział o natywnym presecie albo po prostu działał z automatu. Automatyczne wykrywanie i naprawianie tych przypadków to realny wzrost spójności kodu bez żadnego wysiłku. Polecam włączyć tę regułę i odpalić na istniejącym projekcie, wyniki mogą być zaskakujące.

**Link:** [Releases · francoismassart/eslint-plugin-tailwindcss](https://github.com/francoismassart/eslint-plugin-tailwindcss/releases)

---

## Maizzle v6: kolejne patche, kolejne poprawki w budowaniu emaili

**TLDR:** Maizzle, framework do budowania emaili z Tailwind CSS, kontynuuje stabilizację wersji 6 kolejnymi patchami. Wersje 6.0.4 i 6.0.5 naprawiają błędy w komponentach i rozszerzają API renderowania.

**Summary:** Maizzle to jeden z bardziej interesujących przypadków użycia Tailwind CSS, bo stosuje go w miejscu, gdzie nikt za bardzo się tego nie spodziewa, czyli w emailach HTML. Wersja 6 to duże przebudowanie, które trwa i stabilizuje się przez kolejne patche.

Wersja 6.0.5 naprawia problemy z komponentami `<Preheader>` i `<Outlook>`, które generowały niepoprawne wyjście. To są rzeczy, które w emailach bolą najbardziej, bo Outlook i tak jest koszmarem, a błędy w preheaderze wpływają bezpośrednio na to, co użytkownik widzi na liście wiadomości jeszcze przed otwarciem emaila. Wersja 6.0.4 dodała możliwość przekazywania propsów do szablonów przez `render()`, co jest ważne dla dynamicznego generowania wiadomości.

Nie będę udawać, że changelog Maizzle to fascynująca lektura. Ale jeśli budujesz emaile transakcyjne w oparciu o tę bibliotekę, te patche mogą blokować ci produkcję. Aktualizacja jest prosta i warto ją zrobić.

Warto też wspomnieć, że w wersjach RC Maizzle pojawiło się równoległe budowanie przez worker threads, co dla dużych projektów emailowych może być prawdziwą ulgą wydajnościową. W backlogu jest też wsparcie dla AMP4Email i sporo innych ciekawych rzeczy.

**Key takeaways:**
- Wersja 6.0.5 naprawia komponenty `<Preheader>` i `<Outlook>`.
- Wersja 6.0.4 rozszerza API `render()` o możliwość przekazywania propsów.
- Framework wciąż aktywnie się stabilizuje, ale baza kodu jest już poważnie przebudowana z TypeScript i równoległym budowaniem.

**Why do I care:** Email to ten obszar frontendu, który wszyscy ignorują do momentu, gdy coś zepsuje się w Outlooku. Maizzle to jedno z niewielu narzędzi, które pozwala traktować emaile jak prawdziwy kod, z komponentami, typowaniem i automatycznym testowaniem. Warto śledzić, bo v6 może zmienić podejście do projektów emailowych na lepsze.

**Link:** [Releases · maizzle/framework](https://github.com/maizzle/framework/releases)

---

## Details That Make Interfaces Feel Better: konkretna lista UI drobiazgów, które naprawdę robią różnicę

**TLDR:** Jakub Krehel zebrał zestaw małych technik UI, które w sumie sprawiają, że interfejs czuje się dopracowany. Każda z nich jest prosta, każda ma natychmiastowy efekt wizualny.

**Summary:** Tekst Jakuba to taki rodzaj artykułu, który lubię czytać, bo nie ma w nim żadnej filozofii, tylko konkretne przepisy. I przez to jest też bezlitosny, jeśli ktoś nie stosuje tych technik, to widać.

Zacznijmy od typografii. Właściwość `text-wrap: balance` rozkłada tekst równomiernie między liniami, co idealnie działa dla nagłówków. Właściwość `text-wrap: pretty` zapobiega sierotom na końcu akapitów. Autor zaleca łączenie ich: `balance` na tytule, `pretty` na opisie. To szczegół, ale różnica między blokiem tekstu z sierotą a bez niej jest naprawdę widoczna.

Concentric offset to technika, o której mało kto myśli, a która robi ogromną różnicę w zagnieżdżonych elementach. Formuła jest prosta: zewnętrzny border-radius równa się wewnętrznemu plus padding. Brzmi trywialnie, ale liczba aplikacji z niespójnymi promieniami zaokrągleń jest zadziwiająco duża.

Animacje ikon z opacitą, skalą i rozmyciem przy kontekstowym pojawianiu się to następny punkt. Autor preferuje bibliotekę Motion ze względu na animacje sprężynowe, ale da się to osiągnąć czystym CSS. Tu pojawia się też ważna obserwacja o przerywalności animacji. CSS transitions interpolują do nowego stanu i można je przerywać w połowie drogi, natomiast keyframe animations działają na stałej osi czasu i nie reagują na zmianę stanu w trakcie. Dla interakcji użytkownika niemal zawsze lepszy jest transition, bo użytkownik często zmienia zdanie zanim animacja dobiegnie końca.

Tabular-nums to jeden z tych fontowych ficzerów, o których zawsze wiem, a zawsze zapomnę użyć. Cyfry o równej szerokości zapobiegają "tańczeniu" liczb podczas aktualizacji. W Tailwindzie to po prostu klasa `tabular-nums`.

Artykuł dotyka też kwestii optycznego wyrównania kontra geometrycznego. Ikona obok tekstu w przycisku wygląda lepiej z lekko mniejszym paddingiem po stronie ikony, bo oko inaczej postrzega pełne geometryczne wyśrodkowanie niż to, co naprawdę wygląda wyśrodkowane. Na koniec jest propozycja zastąpienia obramowań wielowarstwowym box-shadow. Cień złożony z kilku warstw z przezroczystością wygląda bardziej przestrzennie i adaptuje się do różnych teł bez konieczności zmiany koloru.

**Key takeaways:**
- `text-wrap: balance` i `text-wrap: pretty` poprawiają czytelność bez żadnego kosztu.
- Concentric offset (zewnętrzny radius = wewnętrzny + padding) to podstawa dobrze wyglądających zagnieżdżonych elementów.
- CSS transitions są przerywalne, keyframe animations nie, co ma znaczenie dla UX.
- `tabular-nums` eliminuje wizualne "skoki" przy aktualizacji liczb.

**Why do I care:** Każdy z tych drobiazgów to coś, co można wdrożyć w ciągu godziny. Razem tworzą efekt "dopracowania", który użytkownicy odczuwają, nawet jeśli nie potrafią powiedzieć dlaczego. Brakuje mi w tym tekście jednej rzeczy: dyskusji o tym, kiedy te techniki mogą zaszkodzić. Na przykład `text-wrap: balance` na długich akapitach może wyglądać dziwnie, bo algorytm optymalizuje pod kątem równości linii, nie czytelności. Autor o tym wspomina, ale mogłoby być więcej nuansu.

**Link:** [Details That Make Interfaces Feel Better](https://jakub.kr/writing/details-that-make-interfaces-feel-better)

---

## CSS Containment: jak powiedzieć przeglądarce, gdzie są granice

**TLDR:** Harry Roberts z CSS Wizardry tłumaczy property `contain` od podstaw, przez rzeczywiste przykłady, po listę pułapek. To jeden z tych artykułów, który sprawia, że zaraz po przeczytaniu chcesz otworzyć DevTools i sprawdzić swój projekt.

**Summary:** CSS containment istnieje od lat, ale jest chroniczne niedoużytkowany. Roberts zaczyna od fundamentalnego pytania: dlaczego przeglądarka robi tyle roboty przy każdej zmianie w DOM? Odpowiedź jest prosta: nie wie, co się może zmienić, więc przelicza więcej niż trzeba. Containment to sposób na powiedzenie jej wprost, gdzie są granice wyspy.

Property `contain` ma cztery podstawowe wartości. Containment `layout` mówi przeglądarce, że wewnętrzny układ elementu jest niezależny od reszty strony. Zmiana wewnątrz kontenera nie wymusza przeliczania layoutu na zewnątrz. Containment `paint` gwarantuje, że nic wewnątrz elementu nie "wyleje się" wizualnie poza jego granice, a przeglądarka może pominąć rysowanie dzieci, gdy element jest poza ekranem. Containment `size` odrywa rozmiar elementu od jego zawartości. Containment `style` izoluje efekty uboczne liczników CSS.

Dwie skróty: `content` to `layout paint style`, a `strict` to `size layout paint style`. Autor jednoznacznie zaleca `content` jako dobry domyślny wybór dla samodzielnych kart, podglądów artykułów i widgetów zewnętrznych. `strict` wymaga już przemyślenia, bo element potrzebuje jawnego rozmiaru.

Prawdziwy przykład od OpenTable robi wrażenie. Otworzenie dropdownu w menu drawer bez containment uruchamiało przeliczanie layoutu obejmujące 4371 węzłów DOM, z których nowy layout potrzebowało tylko 41. Po dodaniu `contain: strict` do roota draweru, operacja dotknęła 73 węzłów i była sześciokrotnie szybsza. To jest dokładnie ten rodzaj wyniku, który przekonuje managerów.

Roberts nie przemilcza pułapek. Zero-sized boxes to najczęstszy problem z containment rozmiaru, kiedy zapomnisz podać jawną szerokość/wysokość lub `contain-intrinsic-size`. Unexpected clipping pojawi się, gdy komponent używa `overflow: visible` dla tooltipów lub dropdownów. Stacking contexts mnożą się z każdym kontenerem, co komplikuje debugowanie z-indexów. I jest interakcja z container queries, bo `container-type: inline-size` już aplikuje containment pod spodem, więc można nieświadomie duplikować ograniczenia.

`content-visibility: auto` to naturalne rozszerzenie tej historii. Przeglądarka może całkowicie pominąć renderowanie zawartości elementów poza ekranem, zarezerwować dla nich miejsce przez `contain-intrinsic-size` i wrócić do rysowania, gdy element się pojawi. Efekt podobny do wirtualizacji listy, ale bez żadnego JavaScript.

**Key takeaways:**
- Containment to deklaracja do przeglądarki, że zmiana wewnątrz nie wpływa na zewnątrz.
- `contain: content` jest bezpiecznym punktem startowym dla samodzielnych komponentów jak karty, kafelki, sekcje feedu.
- `contain: strict` wymaga jawnego rozmiaru i ostrożności z overflow.
- `content-visibility: auto` z `contain-intrinsic-size` daje darmową wirtualizację dla długich list.
- Pułapki istnieją i są realne: zero-sized boxes, clipping, stacking contexts.

**Why do I care:** Ten artykuł uderzył mnie konkretnym przykładem, gdzie 11ms layoutu dla 4371 węzłów spada do 1.89ms dla 73. To jest Interaction to Next Paint w praktyce. Jako senior developer patrzę na swoje projekty i widzę gridy kart, feedów, drawery, czyli dokładnie te przypadki, gdzie containment ma sens. Jednocześnie artykuł jest uczciwy co do kosztów: to nie jest darmowy przycisk. Jeśli komponent używa `position: fixed` dla tooltipów, containment `layout` zmieni zachowanie tych tooltipów i trzeba to sprawdzić. Mam jednak wrażenie, że Roberts zbyt mało mówi o tym, jak integruje się to z istniejącymi design systemami, gdzie komponenty są budowane bez myślenia o containment.

**Link:** [What Is CSS Containment and How Can I Use It? – CSS Wizardry](https://csswizardry.com/2026/04/what-is-css-containment-and-how-can-i-use-it/)

---

## Nuxt UI: 125+ komponentów dla Vue z Tailwind CSS w zestawie

**TLDR:** Nuxt UI to biblioteka komponentów dla Vue i Nuxt z Tailwind CSS pod spodem. Wersja 3 przyniosła wsparcie dla plain Vue (nie tylko Nuxt), CSS-first theming i ponad 125 gotowych komponentów.

**Summary:** Jeśli budujesz w Vue i nie chcesz składać design systemu z części, Nuxt UI jest naturalnym kandydatem do rozważenia. Biblioteka od początku była mocno zintegrowana z ekosystemem Nuxt, ale wersja 3 otworzyła ją na zwykłe projekty Vue z Vite, Inertia czy SSR bez Nuxta.

Liczba komponentów robi wrażenie, ponad 125, i obejmują pełen spektrum od inputów, selectów i modali po bardziej złożone komponenty nawigacyjne. Wszystkie są zbudowane na Reka UI, co zapewnia solidną podstawę dostępności bez reinventowania koła. Tailwind Variants API jest użyty do systemu themingu ze slotami, wariantami i compound variants.

Co mnie interesuje w tym projekcie, to podejście CSS-first do konfiguracji. Dyrektywa `@theme` w pliku CSS pozwala definiować kolory, fonty i breakpointy bez dotykania pliku konfiguracyjnego JavaScript. Semantyczny system kolorów z siedmioma aliasami (primary, secondary, success, info, warning, error, neutral) jest sensowny i pozwala zmieniać kolory w runtime przez `AppConfig` bez przebudowania aplikacji. To jest właściwe podejście dla aplikacji multi-tenant.

Dostęp do ponad 200 tysięcy ikon przez Iconify i integracja z `@nuxt/fonts` to konkretne bonusy, które normalnie trzeba by konfigurować samemu. Wsparcie dla i18n z 50 językami i RTL to już bardziej niszowe, ale świadczy o dojrzałości projektu.

Moim zastrzeżeniem jest to, że "batteries included" zawsze ma cenę. Kiedy Nuxt UI coś robi nie tak, jak chcesz, walczysz z abstrakcją. Tailwind Variants jest elastyczny, ale debugowanie compound variants w głęboko zagnieżdżonym komponencie potrafi być frustrujące. To nie jest problem unikatowy dla Nuxt UI, to jest problem wszystkich bibliotek komponentów.

**Key takeaways:**
- Nuxt UI v3 działa z plain Vue, nie tylko z Nuxt.
- CSS-first theming z dyrektywą `@theme` i runtime konfiguracja przez `AppConfig`.
- Semantyczne aliasy kolorów zamiast konkretnych wartości.
- Zbudowane na Reka UI dla dostępności i Tailwind Variants dla themingu.

**Why do I care:** Dla projektów Vue, gdzie czas wdrożenia jest priorytetem, Nuxt UI jest atrakcyjnym wyborem. Nie musisz budować design systemu od zera, dostępność jest zapewniona, dark mode działa, TypeScript types są wbudowane. Pytanie, które zawsze zadaję przy takich bibliotekach, to czy vendor lock-in jest akceptowalny. Jeśli kiedyś chcesz przejść na inny zestaw komponentów, ile roboty cię czeka? W przypadku Nuxt UI, zależność od ich systemu themingu i API komponentów jest dość głęboka.

**Link:** [The Intuitive Vue UI Library - Nuxt UI](https://ui.nuxt.com/)

---

## Hoppscotch: open-source API client dla developerów

**TLDR:** Hoppscotch to open-source platforma API, alternatywa dla Postmana i Insomnii, z klientem REST, obsługą GraphQL, WebSockets, CLI i funkcjami teamowymi. Przetwarza ponad 5 milionów requestów miesięcznie.

**Summary:** Hoppscotch nie jest nowością, ale pojawia się w coraz większej liczbie zestawień narzędzi developerskich jako sensowna alternatywa dla Postmana, szczególnie od czasu gdy Postman zaczął agresywnie monetyzować i utrudniać pracę offline.

Platforma oferuje wszystko, czego można oczekiwać od nowoczesnego klienta API. Pre-request scripts do modyfikacji nagłówków, autoryzacji i generowania danych testowych. Post-request tests do asercji na odpowiedziach. Generowanie code snippets w różnych językach. One-click migracja z Postmana, Insomnii i cURLa.

To, co mnie przyciąga do Hoppscotch, to model local-first. Brak śledzenia, brak analityki, brak reklam. W świecie, gdzie narzędzia developerskie coraz częściej wysyłają dane do chmury, to jest wyraźna deklaracja. Proxy i interceptor support pozwala ominąć problemy z CORS, co jest codzienną bolączką przy lokalnym developmencie.

Funkcje teamowe obejmują workspace activity tracking, SSO i zarządzanie dostępem. Dla małych zespołów samowystarczalnych jest to wystarczające.

**Key takeaways:**
- Open-source, local-first, bez śledzenia i reklam.
- Pełen zestaw: REST, GraphQL, WebSockets, CLI, testy, generowanie kodu.
- Prosta migracja z Postmana i Insomnii.
- Funkcje teamowe z SSO i activity tracking.

**Why do I care:** Jeśli twój team wciąż używa Postmana i płaci za funkcje, które Hoppscotch oferuje za darmo, warto poświęcić godzinę na migrację. Jedyna rzecz, której mi brakuje w porównaniu z Postmanem, to dojrzały ekosystem integracji i dłuższa historia stabilności. Ale open-source projekt z taką skalą użycia daje niezłe gwarancje ciągłości.

**Link:** [Hoppscotch • Make better APIs](https://hoppscotch.com/)

---

## mailflare: self-hosted skrzynka email z AI na Cloudflare

**TLDR:** Mailflare to open-source klient email z własną domeną, zbudowany na Cloudflare Workers, D1, R2 i Durable Objects. Zawiera inteligentnego agenta AI do klasyfikowania, podsumowywania i odpowiadania na wiadomości.

**Summary:** Mailflare to jeden z tych projektów, które istnieją na przecięciu kilku trendów naraz: self-hosting, Cloudflare jako platforma aplikacyjna i AI w narzędziach developerskich. Wynik jest ambitny.

Podstawowe funkcje to zarządzanie domenami przez Cloudflare Email Routing, tworzenie skrzynek pocztowych, foldery inbox/sent/drafts/spam/trash, composer z autosave drafts i obsługa załączników w R2. Real-time powiadomienia o nowych wiadomościach przez WebSockets z Durable Objects. Wyszukiwanie i filtrowanie.

Ciekawszą częścią jest agent email. Automatycznie klasyfikuje wiadomości pod kątem intencji, pilności i wyodrębnionych encji. Buduje kolejkę zadań dla proponowanych odpowiedzi, follow-upów i akcji triage. Przed każdą akcją czeka na zatwierdzenie przez człowieka, co jest rozsądnym podejściem. Agent pamięta poprzednie podsumowania wątków, preferencje użytkownika i otwarte zobowiązania.

Deployment jest ciekawy. Cloudflare jest tu nie tylko hostem, ale też dostawcą bazy danych (D1), przechowywania plików (R2), email routingu i Durable Objects do WebSocketów. To mocna aprobata dla Cloudflare jako platformy full-stack. One-click deploy przez Cloudflare Git integration jest dostępny, choć wymaga kilku ręcznych kroków z tokenami API.

Projekt ma roadmapę z zaawansowanymi regułami routingu, webhook managementem i bardziej rozbudowanymi funkcjami agenta. Widać, że jest to aktywnie rozwijany projekt, nie tylko demo.

**Key takeaways:**
- Self-hosted email z własną domeną, zbudowany całkowicie na ekosystemie Cloudflare.
- AI agent do klasyfikowania, podsumowywania i proponowania odpowiedzi z human-in-the-loop.
- Real-time powiadomienia przez WebSockets z Durable Objects.
- One-click deploy na Cloudflare, ale wymaga konfiguracji tokenów z odpowiednimi uprawnieniami.

**Why do I care:** To jest naprawdę interesujący projekt z perspektywy architektury. Cloudflare Workers, D1, R2, Durable Objects i Email Routing jako kompletna platforma aplikacyjna to coś, o czym dużo się mówi w teorii. Mailflare pokazuje jak to wygląda w praktyce, ze wszystkimi szczegółami konfiguracyjnymi na wierzchu. Sceptycznie podchodzę do agenta email, bo klasyfikacja intencji i pilności wiadomości w skrzynce prywatnej to spore wyzwanie dla modeli językowych. Ale jako platforma email self-hosted na Cloudflare, to solidna demonstracja możliwości tej platformy.

**Link:** [GitHub - hieunc229/mailflare](https://github.com/hieunc229/mailflare)
