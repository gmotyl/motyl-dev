---
title: "Next.js 15, Turbopack Dev, i nowe narzędzia dla deweloperów"
excerpt: "Przegląd najważniejszych nowości w Next.js 15, stabilizacji Turbopack Dev, oraz nowych narzędzi CLI dla frameworków JavaScript"
publishedAt: "2024-10-28"
slug: "nextjs-15-turbopack-dev-nowe-narzedzia-deweloperow"
hashtags: "#generated #pl #nextjs #react #typescript #frontend #turbopack #svelte #remix #architecture #performance #cli #git #monorepo #css #has-selector #mobile #session-replay"
---

## Next.js 15 - Największa aktualizacja od dawna

**TLDR:** Next.js 15 wprowadza wsparcie dla React 19, stabilny Turbopack Dev, nową semantykę cache'owania i asynchroniczne API żądań - wszystko to przy znacznie lepszej wydajności developmentu.

**Summary:**

Next.js 15 to prawdopodobnie najważniejsza aktualizacja frameworka od bardzo długiego czasu. Zespół Vercel w końcu ustabilizował Turbopack Dev, który obiecuje dramatyczne przyspieszenie developmentu - mówimy o 76% szybszym starcie serwera lokalnego i 96% szybszych aktualizacjach kodu z Fast Refresh. To nie są kosmetyczne poprawki, to fundamentalna zmiana w tym, jak szybko możesz iterować nad swoim kodem.

Największą zmianą architektoniczną jest wprowadzenie asynchronicznych API żądań. Headers, cookies, params - wszystko to teraz jest asynchroniczne. Brzmi jak breaking change dla breaking change, ale ma to głęboki sens. Serwer może teraz przygotowywać komponenty, które nie zależą od konkretnego żądania, zanim to żądanie w ogóle przyjdzie. To fundamentalna zmiana w modelu renderowania, która otwiera drogę do przyszłych optymalizacji.

Semantyka cache'owania również się zmieniła - fetch requesty, GET Route Handlers i nawet Client Router Cache nie są już domyślnie cache'owane. To może wydawać się krokiem wstecz, ale w praktyce eliminuje jeden z największych źródeł frustracji deweloperów z Next.js - nieprzewidywalne cache'owanie. Teraz masz pełną kontrolę nad tym, co i kiedy jest cache'owane.

React 19 support to oczywista ewolucja, ale co ciekawe, Next.js 15 wprowadza też eksperymentalne wsparcie dla React Compiler, który właśnie wszedł w fazę beta. Dla zespołów pracujących nad dużymi aplikacjami, React Compiler może automatycznie optymalizować re-rendery, co wcześniej wymagało ręcznego zarządzania memo i callback'ami.

**Key takeaways:**
- Turbopack Dev jest teraz stabilny i oferuje dramatyczne przyspieszenie developmentu
- Asynchroniczne API żądań to przygotowanie pod przyszłe optymalizacje renderowania
- Nowa semantyka cache'owania daje deweloperom więcej kontroli kosztem domyślnej "magii"

**Tradeoffs:**
- Zyskujesz przewidywalność cache'owania kosztem automatycznych optymalizacji
- Asynchroniczne API zwiększają wydajność ale wymagają refaktoringu istniejącego kodu

**Link:** [Next.js 15](https://nextjs.org/blog/next-15)

## Turbopack Dev - Koniec z wolnym webpack'iem

**TLDR:** Po latach pracy, Turbopack Dev jest wreszcie stabilny i oferuje do 96% szybsze aktualizacje kodu oraz 76% szybszy start serwera w porównaniu do webpack'a.

**Summary:**

To jest moment, na który społeczność Next.js czekała od lat. Webpack, który służył jako fundament bundlingu w Next.js przez 8 lat, po prostu nie nadążał za potrzebami nowoczesnego developmentu. Zespół Vercel próbował optymalizować webpack, ale w pewnym momencie osiągnęli punkt, gdzie dalsze poprawki nie dawały znaczących rezultatów.

Turbopack został napisany od zera w Rust'cie z bardzo konkretnymi wymaganiami: minimalne breaking changes, wsparcie dla App Router i Pages Router, szybsze kompilacje dla projektów każdej wielkości, oraz builds developmentowe, które dokładnie odzwierciedlają produkcję. To nie była decyzja podjęta lekkomyślnie - zespół przeanalizował wszystkie istniejące rozwiązania i stwierdził, że żadne nie spełnia ich wymagań.

Rezultaty są imponujące. Vercel testował Turbopack na swoich własnych aplikacjach, włączając vercel.com - dużą aplikację Next.js. Wyniki mówią same za siebie: 76.7% szybszy start serwera lokalnego, 96.3% szybsze aktualizacje kodu z Fast Refresh, i 45.8% szybsza kompilacja początkowej trasy bez cache'owania.

Co istotne, Turbopack nie ma jeszcze disk cache'ingu, więc te liczby prawdopodobnie będą jeszcze lepsze w przyszłości. Dla zespołów pracujących nad dużymi aplikacjami, to może być różnica między frustrującym doświadczeniem developmentowym a płynną iteracją.

Jednak to dopiero początek. Obecna wersja skupia się na doświadczeniu developmentowym. Production builds nadal używają webpack'a, ale zespół Vercel już pracuje nad Turbopack dla produkcji.

**Key takeaways:**
- Turbopack napisany w Rust'cie oferuje dramatyczne przyspieszenie w porównaniu do webpack'a
- Największe korzyści widoczne są w dużych projektach Next.js
- To dopiero początek - production builds nadal czekają na Turbopack

**Tradeoffs:**
- Zyskujesz znaczną poprawę wydajności developmentu ale nadal musisz używać webpack'a do production builds
- Nowa architektura może wprowadzić nowe edge case'y nieobecne w webpack'ie

**Link:** [Turbopack Dev is Now Stable](https://nextjs.org/blog/turbopack-for-development-stable)

## Jak zmniejszyliśmy repozytorium JavaScript o 94%

**TLDR:** Microsoft zmniejszył swoje monorepo JavaScript z 178GB do kilku GB poprzez identyfikację i naprawę problemów z git tree objects oraz implementację automatycznego czyszczenia plików zmian.

**Summary:**

To jedna z tych historii, które pokazują, jak pozornie niewielkie decyzje architektoniczne mogą prowadzić do katastrofalnych konsekwencji w skali. Microsoft pracuje nad gigantycznym monorepo JavaScript zwanym 1JS - 1000 aktywnych użytkowników miesięcznie, 2500 pakietów, 20 milionów linii kodu. I 178GB przy klonowaniu. To tyle, że deweloperzy w Europie nie mogli nawet sklonować repo z powodu jego rozmiaru.

Pierwszym problemem były pliki zmian Beachball (odpowiednik Changesets), które nie były usuwane po użyciu. W pewnym momencie mieli 40,000 plików w jednym folderze. Okazuje się, że Git tworzy duży tree object za każdym razem, gdy dodajesz plik do folderu zawierającego tysiące innych plików. To pierwsza lekcja: nie trzymaj tysięcy rzeczy w jednym folderze.

Ale to był dopiero początek. Prawdziwy problem tkwił w ich workflow'ie wersjonowania. Mają branch'a mirror głównego branch'a zwanego "versioned", który przechowuje aktualne wersje pakietów. Jedyne commity, które tam trafiały, to aktualizacje CHANGELOG.md i CHANGELOG.json. Wydawało się niewinnie.

Problem w tym, że Git przechowuje snapshoty całego stanu repozytorium przy każdym commicie. Kiedy masz tysiące plików CHANGELOG, które są modyfikowane przy każdym release'ie, Git musi przechować nowy snapshot każdego z tych plików. Pomnóż to przez setki release'ów i masz przepis na katastrofę.

Rozwiązanie było eleganckie: zamiast modyfikować tysiące istniejących plików, zaczęli tworzyć nowe pliki dla każdego release'u. Git jest zoptymalizowany pod dodawanie nowych plików, nie pod modyfikowanie tysięcy istniejących. Rezultat? Redukcja o 94%.

To pokazuje, jak ważne jest zrozumienie nie tylko narzędzi, których używasz, ale także ich wewnętrznych mechanizmów. Git nie jest magią - ma swoje optymalizacje i założenia, a jeśli pracujesz przeciwko nim, zapłacisz cenę.

**Key takeaways:**
- Git tworzy duże tree objects przy dodawaniu plików do folderów zawierających tysiące elementów
- Modyfikowanie tysięcy plików przy każdym commicie prowadzi do eksplozji rozmiaru repozytorium
- Dodawanie nowych plików jest bardziej efektywne niż modyfikowanie istniejących w kontekście Git'a

**Tradeoffs:**
- Zyskujesz dramatyczną redukcję rozmiaru repo kosztem bardziej skomplikowanej struktury plików changelog
- Nowa architektura wymaga przeprojektowania workflow'ów CI/CD do obsługi nowej struktury

**Link:** [How we shrunk our Javascript monorepo git size by 94%](https://www.jonathancreamer.com/how-we-shrunk-our-git-repo-size-by-94-percent/)

## Nowe Svelte CLI - Wszystko czego potrzebujesz w jednym miejscu

**TLDR:** Svelte wprowadza nowe CLI "sv" które unifikuje tworzenie projektów, dodawanie add-onów jak Tailwind czy auth, oraz migracje - wszystko w jednym narzędziu.

**Summary:**

Svelte właśnie rozwiązał jeden z najbardziej irytujących problemów w ekosystemie JavaScript - fragmentację narzędzi CLI. Dotychczas, żeby skonfigurować nowy projekt Svelte z Tailwind, musiałeś przejść przez osiem kroków zgodnie z dokumentacją. Community stworzyło svelte-add, ale niewiele osób o nim wiedziało.

Teraz masz npx sv create i wszystko w jednym miejscu. Nie tylko Tailwind - masz wbudowane add-ony dla formatowania, lintingu, testowania, baz danych, auth, i18n i więcej. To nie jest tylko kosmetyczna zmiana - to fundamentalna poprawa developer experience.

Co więcej, sv unifikuje wszystkie narzędzia Svelte pod jednym dachem. svelte-check, svelte-migrate - wszystko teraz dostępne przez sv. Zamiast zapamiętywać nazwy różnych pakietów, masz jeden punkt wejścia. sv migrate svelte-5 żeby upgradować z Svelte 4 do 5, sv add żeby dodać funkcjonalność do istniejącego projektu.

To pokazuje dojrzałość ekosystemu Svelte. Zamiast zostawić społeczność z fragmentarycznymi narzędziami, zespół Svelte przejął odpowiedzialność za całe doświadczenie developera. Manuel i Adrian, którzy prowadzili svelte-add, zostali oficjalnymi maintainerami Svelte, co pokazuje, jak community-driven development może ewoluować w oficjalne wsparcie.

Dla architektów i zespołów, to oznacza mniej friction przy onboardingu nowych deweloperów i mniej czasu spędzonego na konfigurowaniu toolingu. Kiedy developer experience jest smooth, zespoły mogą skupić się na biznesowych problemach zamiast walczyć z narzędziami.

**Key takeaways:**
- Jedno CLI zastępuje fragmentaryczne narzędzia i upraszcza setup nowych projektów
- Wbudowane add-ony eliminują potrzebę ręcznej konfiguracji popularnych narzędzi
- Unifikacja narzędzi pod jednym CLI poprawia developer experience

**Link:** [Introducing the new Svelte CLI](https://svelte.dev/blog/sv-the-svelte-cli)

## CSS :has(), Grid i Quantity Queries - Content-aware komponenty

**TLDR:** Nowoczesny CSS pozwala tworzyć komponenty, które automatycznie adaptują swój layout w zależności od ilości zawartości, używając :has(), quantity queries i CSS Grid.

**Summary:**

To jest doskonały przykład tego, jak nowoczesny CSS eliminuje potrzebę JavaScript'u do rozwiązywania problemów layoutu. Autor opisuje pracę nad komponentem "Simple List" w design systemie, gdzie każdy element ma sloty na tytuł, opis, cenę i akcje, plus opcjonalne zdjęcie i badge'y.

Problem pojawia się, gdy masz długi tytuł z wieloma badge'ami - layout się psuje. Tradycyjnie rozwiązałbyś to JavaScript'em, liczącym badge'y i warunkowo zmieniającym layout. Ale to jest 2024, i CSS ma lepsze rozwiązania.

Quantity queries, technika stworzona przez Heydona Pickeringa w 2015, pozwalają na warunkowe stylowanie w zależności od liczby elementów tego samego typu. `.simple-list-item-badge:last-child:nth-child(-n + 3)` - to wybiera badge'y tylko jeśli jest ich 3 lub mniej.

Ale prawdziwa magia dzieje się z `:has()`. Zamiast stylować tylko badge'y, możesz stylować parent container w zależności od tego, co zawiera. `.simple-list-item:has(.simple-list-item-badge:last-child:nth-child(-n + 3))` - to pozwala zmienić cały grid layout, jeśli jest 3 lub mniej badge'ów.

To jest piękne rozwiązanie, bo CSS jest bardziej fault-tolerant niż JavaScript. Jeśli CSS się nie załaduje, content nadal będzie czytelny. Jeśli JavaScript się wywali, możesz stracić całą funkcjonalność.

Dla zespołów pracujących nad design systemami, to oznacza mniej edge case'ów do obsłużenia w JavaScript, bardziej niezawodne komponenty, i lepsze performance. CSS jest szybszy niż JavaScript do tego typu logiki layoutu.

**Key takeaways:**
- Quantity queries pozwalają na warunkowe stylowanie w zależności od liczby elementów
- :has() umożliwia stylowanie parent'ów w zależności od ich zawartości
- CSS jest bardziej fault-tolerant niż JavaScript do problemów layoutu

**Tradeoffs:**
- Zyskujesz lepsze performance i niezawodność kosztem wsparcia dla starszych przeglądarek
- CSS-only rozwiązania są mniej elastyczne niż JavaScript ale bardziej wydajne

**Link:** [Making content-aware components using CSS :has(), grid, and quantity queries](https://piccalil.li/blog/making-content-aware-components-using-css-has-grid-and-quantity-queries/)

## Mobile Session Replay - Dlaczego to było tak trudne

**TLDR:** PostHog w końcu wypuścił mobile session replay po latach pracy, bo w przeciwieństwie do web'a, mobile nie ma standardów jak rrweb i wymaga osobnych SDK dla każdej platformy.

**Summary:**

To fascynująca historia o tym, dlaczego mobile session replay był tak długo problemem w branży. PostHog miał web session replay od 2020, ale mobile bety pojawiły się dopiero w kwietniu 2024. Dlaczego tak długo?

Po pierwsze, web session replay w dużej mierze opiera się na jednej open-source bibliotece: rrweb. Ona robi całą ciężką robotę - nagrywanie interakcji, strukturyzowanie danych sesji, playback. Dla mobile takiej biblioteki po prostu nie ma. Musisz zbudować wszystko od zera, dla każdej platformy osobno - iOS, Android, React Native, Flutter.

Ale to dopiero początek problemów. Performance na mobile jest krytyczny. Telefony są znacznie mniej wydajne niż desktopy, i nie każdy ma najnowszego iPhone'a. Jeśli kiedykolwiek próbowałeś nagrywać ekran na starszym telefonie, wiesz jaki to ma wpływ na performance. Aplikacje ładują się wolniej, animacje stają się choppy, telefon się grzeje.

Privacy to kolejny nightmare. Na web'ie masz DOM - hierarchiczną strukturę, która jednoznacznie identyfikuje elementy. Masz też standardowe elementy jak `<input type="password">`. Na mobile nie ma standardowych struktur ani elementów. Accessibility identifiers są implementowane niekonsekwentnie.

PostHog musiał rozwiązać wszystkie te problemy osobno dla każdej platformy. Jetpack Compose używa compositional model, który różni się od tradycyjnego view-based modelu Androida. iOS ma podobny problem z SwiftUI vs UIKit. To nie jest jeden problem do rozwiązania, to dziesiątki problemów dla każdej kombinacji platformy i UI framework'a.

Dla zespołów rozważających implementację mobile analytics, to pokazuje, dlaczego istniejące rozwiązania były drogie albo miały kiepską performance. To po prostu trudny problem techniczny, który wymaga masywnych inwestycji w R&D.

**Key takeaways:**
- Mobile session replay wymaga osobnych SDK dla każdej platformy, w przeciwieństwie do web'a
- Performance na mobile jest krytyczny ze względu na ograniczoną moc obliczeniową urządzeń
- Brak standardowych struktur UI na mobile komplikuje identyfikację i maskowanie wrażliwych danych

**Link:** [How we built mobile replay (and why it took so long) - PostHog](https://posthog.com/blog/mobile-session-replay?utm_campaign=bytes&utm_source=bytes)

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by claude-sonnet-4-20250514 LLM. While we strive for accuracy, please verify critical information independently.
