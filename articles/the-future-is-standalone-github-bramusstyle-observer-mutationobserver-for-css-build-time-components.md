---
title: 'The Future Is Standalone Github Bramusstyle Observer Mutationobserver For Css Build Time Components'
excerpt: 'Przegląd 3 artykułów z ui.dev'
publishedAt: '2025-10-26'
slug: 'the-future-is-standalone-github-bramusstyle-observer-mutationobserver-for-css-build-time-components'
hashtags: '#generated #pl #react #javascript #nodejs #performance #css'
---

## The future is standalone!

No dobra, Angular w końcu robi to co powinien był zrobić już dawno temu. W wersji 19 Angular domyślnie ustawia `standalone: true` dla komponentów, dyrektyw i pipe'ów. To jest gigantyczna zmiana, ale jednocześnie powinna była się stać już lata temu.

Przypomnijmy sobie - standalone zostało wprowadzone w v14 jako developer preview. Teraz, po kilku wersjach, Angular team w końcu przyznał, że NgModules to była pomyłka. Nie mówią tego wprost, ale każdy kto kiedykolwiek musiał się męczyć z tym systemem modułów wie, że to było piekło.

Najlepsze w tym wszystkim jest to, że nie musisz już pisać "standalone: true" w każdym komponencie. Po prostu tworzysz komponent i działa. Jeśli z jakiegoś powodu nadal chcesz używać NgModules - możesz, ale musisz explicite napisać `standalone: false`.

Angular team zapewnia też automatyczną migrację podczas `ng update` do v19. Usunie `standalone: true` z istniejących komponentów i doda `standalone: false` do tych które używają NgModules.

**Kluczowe punkty:**
- Angular v19 domyślnie ustawia `standalone: true`
- Koniec z pisaniem `standalone: true` w każdym komponencie
- Automatyczna migracja podczas update'u
- NgModules nadal wspierane ale trzeba explicite ustawić `standalone: false`

**Link**: https://blog.angular.dev/the-future-is-standalone-475d7edbc706

Link: 

## GitHub - bramus/style-observer: MutationObserver for CSS

Bramus stworzył coś co powinno istnieć w przeglądarce od lat - StyleObserver. To jest w zasadzie MutationObserver ale dla CSS. Możesz obserwować zmiany w computed values właściwości CSS, w tym CSS Custom Properties.

Problem który to rozwiązuje jest realny - MutationObserver potrafi trackować zmiany w DOM, ale nie potrafi trackować zmian w stylach. A czasami potrzebujesz wiedzieć kiedy wartość CSS custom property się zmieniła.

Biblioteka jest prosta w użyciu - tworzysz nowy StyleObserver, podajesz callback który zostanie wywołany gdy wartości się zmienią, oraz konfigurację z listą właściwości które chcesz obserwować. Możesz obserwować wiele elementów jednym observerem.

Co ciekawe, możesz konfigurować czy chcesz dostawać wszystkie właściwości czy tylko te które się zmieniły, oraz w jakim formacie - czy tylko wartości czy pełne obiekty z poprzednimi wartościami.

**Kluczowe punkty:**
- MutationObserver dla CSS properties
- Obserwacja CSS Custom Properties i innych właściwości
- Możliwość obserwowania wielu elementów
- Konfigurowalne formaty zwracanych danych

**Link**: https://github.com/bramus/style-observer

Link: 

## Build-time Components

Rodrigo Pombo napisał świetny artykuł o tym dlaczego React Server Components to przełom dla content-driven websites. Używa przykładu bloga w Markdown gdzie chce dodać hover cards z open graph images dla linków.

Pokazuje trzy podejścia do rozwiązania tego problemu. Pierwsze to fetch na kliencie - proste ale ma masę problemów jak loading states, błędy sieciowe, wolne ładowanie. Drugie to pre-processing podczas build time - lepsze ale nadal ma swoje ograniczenia.

Trzecie podejście to właśnie te build-time components z React Server Components. Możesz napisać komponent który wykonuje się podczas build time, ma dostęp do wszystkich Node.js APIs, może robić fetche, czytać pliki, łączyć się z bazami danych. A wynik tego wszystkiego to statyczny HTML.

To jest właśnie przyszłość - komponenty które wykonują się podczas build time ale wyglądają i zachowują się jak normalne React komponenty. Nie musisz myśleć o tym czy coś działa na serwerze czy kliencie, po prostu piszesz kod.

Artykuł bardzo dobrze pokazuje ewolucję od client-side fetching przez build-time processing do server components. To jest kierunek w którym idzie cały frontend.

**Kluczowe punkty:**
- React Server Components dla content-driven sites
- Build-time wykonywanie z dostępem do Node.js APIs
- Statyczny output bez JavaScript na kliencie
- Lepsze performance i UX niż client-side fetching

**Link**: https://codehike.org/blog/build-time-components

Link: