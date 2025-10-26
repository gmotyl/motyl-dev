---
title: 'Release V200 Vitest Devvitest Release V450 Honojshono Intent To Ship Css Interpolate Size Property And Calc Size Function'
excerpt: 'Przegląd 6 artykułów z ui.dev'
publishedAt: '2024-07-18'
slug: 'release-v200-vitest-devvitest-release-v450-honojshono-intent-to-ship-css-interpolate-size-property-and-calc-size-function'
hashtags: '#generated #pl #react #typescript #javascript #ai #css'
---

## Release v2.0.0 · vitest-dev/vitest

No i mamy to! Vitest 2.0 wylądował i jak to zwykle bywa z major releaseami - breaking changes leci na lewo i prawo. Ale nie panikujmy, bo większość zmian to sensowne decyzje.

Największa zmiana? Domyślnie teraz używamy forks pool zamiast threads pool. Dlaczego? Bo threads miały problemy z segfaultami i ogólnie były mniej stabilne. Tak, może być trochę wolniej, ale stabilność to podstawa.

Kolejna wielka rzecz - Chai został zaktualizowany do wersji 5, co może sprawić, że wasze testy będą się sypać jak domek z kart. Coverage reporting też został poprawiony i teraz jest bardziej precyzyjny, więc nie dziwcie się, że wasze pokrycie spadło o kilka procent.

Ciekawa rzecz z promise-based assertions - Vitest już nie będzie automatycznie unwrapował promisów w spy.mock.returns. Jeśli macie async funkcje, to teraz będziecie dostawać Promise w rezultatach. Na szczęście dodali spy.mock.settledResults i nowy matcher toHaveResolved().

**Key takeaways:**
- Domyślnie używa forks pool zamiast threads (może być wolniej, ale stabilniej)
- Chai 5.0 - sprawdźcie swoje testy
- Bardziej precyzyjne coverage reporting
- Nowe API dla promise assertions
- Wsparcie dla concurrent suites

**Link:** [link](https://github.com/vitest-dev/vitest/releases/tag/v2.0.0)

## Release v4.5.0 · honojs/hono

Hono właśnie wypuściło wersję 4.5.0 i ludzie, to jest szaleństwo! Teraz mają już 20 built-in middleware. Dwadzieścia! To jest właśnie to, co nazywam batteries-included framework.

Nowe middleware to IP Restriction - możecie ograniczać dostęp na podstawie adresu IP. Combine Middleware pozwala łączyć kilka middleware w jedno, co jest świetne do tworzenia złożonych kontroli dostępu. Request ID Middleware generuje unikalne ID dla każdego requestu.

Ale prawdziwa perełka to Service Worker adapter. Teraz możecie uruchamiać aplikacje Hono jako Service Workers bezpośrednio w przeglądarce! To otwiera zupełnie nowe możliwości.

Cloudflare Pages też dostało upgrade - teraz możecie używać Hono middleware jako Cloudflare Pages middleware. Chcecie basic auth? Nie ma problemu, używacie built-in middleware i działa.

**Key takeaways:**
- 20 built-in middleware w jednym frameworku
- IP Restriction dla kontroli dostępu
- Service Worker adapter - Hono w przeglądarce
- Lepsze wsparcie dla Cloudflare Pages
- React 19 compatibility

**Link:** [link](https://github.com/honojs/hono/releases/tag/v4.5.0)

## Intent to Ship: CSS interpolate-size property and calc-size() function

Chrome szykuje się do wprowadzenia czegoś, na co czekaliśmy latami - animacje dla CSS intrinsic sizing keywords! Wiecie, te wszystkie auto, min-content, fit-content - w końcu będziemy mogli je animować.

Mamy dwie nowe rzeczy: interpolate-size property, które pozwala opt-in do animacji tych keywordów, oraz calc-size() function, która działa podobnie do calc(), ale obsługuje te magiczne wartości.

Dlaczego to jest wielkie? Bo dotychczas nie mogliście zrobić smooth transition z height: 0 do height: auto. Musieliście hackować z max-height albo JavaScript. Teraz będzie to możliwe natywnie w CSS.

TAG review miało kilka zastrzeżeń, głównie że woleli by to było częścią calc() zamiast osobnej funkcji, ale zespół Chrome ma swoje argumenty i idą do przodu.

**Key takeaways:**
- Animacje dla auto, min-content, fit-content i innych
- Dwie nowe właściwości: interpolate-size i calc-size()
- Koniec z hackami dla height: auto transitions
- Wkrótce w Chrome

**Link:** [link](https://groups.google.com/a/chromium.org/g/blink-dev/c/FjyMSSaSPEg/m/yzlLscFKBQAJ)

## Eldora UI

Kolejna biblioteka komponentów UI, ale ta ma coś w sobie. 150+ darmowych i open-source animowanych komponentów zbudowanych z React, TypeScript, Tailwind CSS i Motion. Perfect companion dla shadcn/ui, jak sami mówią.

Co mnie kręci w Eldora UI, to że skupiają się na animacjach i efektach. Mamy komponenty do multifactor authentication, animated frameworks showcase, testimonials slider. Wszystko gotowe do wrzucenia na landing page.

Universal compatibility brzmi dobrze - działa z Next.js, React, HTML i praktycznie wszędzie. Komponenty wyglądają naprawdę ładnie i są dobrze wykonane.

Ale szczerze mówiąc, rynek bibliotek UI jest już bardzo zatłoczony. Eldora UI musi się wyróżnić czymś więcej niż tylko ładnymi animacjami, żeby przetrwać.

**Key takeaways:**
- 150+ animowanych komponentów
- Zbudowane na React, TypeScript, Tailwind
- Kompatybilne z shadcn/ui
- Fokus na landing pages i animacje
- Darmowe i open-source

**Link:** [link](https://www.eldoraui.site/)

## Configure Cron Jobs at Runtime

Convex pokazuje, jak zbudować user space crons - czyli cron jobs, które możecie rejestrować w runtime, a nie tylko statycznie w konfiguracji.

Normalnie w Convex crony definiuje się w pliku crons.ts, ale co jeśli chcecie dodawać nowe joby dynamicznie? Autor zbudował Cronvex - demo aplikację, która pokazuje, jak to zrobić.

Kluczowe jest przechowywanie state'u dla każdego crona - functionName, argumenty, schedule (interval lub cronspec). Potem trzeba zbudować scheduler, który będzie sprawdzał, które joby mają się uruchomić.

To świetny przykład filozofii Convex - jeśli feature nie istnieje, możecie go zbudować sami na platformie. I honestly, to jest właśnie to, co sprawia, że Convex jest ciekawy.

**Key takeaways:**
- User space crony w Convex
- Runtime registration zamiast statycznej konfiguracji
- Cronvex jako working demo
- Pokazuje siłę platform approach
- Darmowa alternatywa dla EasyCron

**Link:** [link](https://stack.convex.dev/cron-jobs?ref=bytes)

## Fine-grained Markdown

Code Hike pokazuje ciekawe podejście do Markdown - fine-grained parsing, który daje wam type-safe dostęp do poszczególnych części contentu.

Zamiast renderować cały Markdown jako jeden blok HTML, Code Hike pozwala wam wyciągnąć poszczególne sekcje, nagłówki, paragrafy jako osobne React komponenty. To oznacza, że możecie zrobić z nimi co chcecie - różne layouty, animacje, interaktywne elementy.

Przykład: scrollycoding layout, gdzie kod i tekst są zsynchronizowane podczas scrollowania. Albo spotlight layout, gdzie poszczególne sekcje są podświetlane.

To rozwiązuje prawdziwy problem - Markdown jest świetny do pisania, ale czasami chcecie bardziej strukturalną prezentację. Code Hike daje wam to flexibility bez rezygnowania z prostoty Markdown.

**Key takeaways:**
- Fine-grained parsing Markdown w React
- Type-safe dostęp do poszczególnych elementów
- Możliwość tworzenia custom layoutów
- Scrollycoding i spotlight examples
- Zachowuje prostotę pisania w Markdown

**Link:** [link](https://v1.codehike.org/blog/fine-grained-markdown)