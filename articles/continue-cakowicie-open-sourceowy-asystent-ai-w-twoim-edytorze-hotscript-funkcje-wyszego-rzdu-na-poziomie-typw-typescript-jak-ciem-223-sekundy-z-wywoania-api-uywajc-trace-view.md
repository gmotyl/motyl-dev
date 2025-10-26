---
title: 'Continue Cakowicie Open Sourceowy Asystent Ai W Twoim Edytorze Hotscript Funkcje Wyszego Rzdu Na Poziomie Typw Typescript Jak Ciem 223 Sekundy Z Wywoania Api Uywajc Trace View'
excerpt: 'Przegląd 6 artykułów z ui.dev'
publishedAt: '2024-08-29'
slug: 'continue-cakowicie-open-sourceowy-asystent-ai-w-twoim-edytorze-hotscript-funkcje-wyszego-rzdu-na-poziomie-typw-typescript-jak-ciem-223-sekundy-z-wywoania-api-uywajc-trace-view'
hashtags: '#generated #pl #react #typescript #ai #backend'
---

## Continue - całkowicie open-source'owy asystent AI w twoim edytorze

Słuchajcie, w końcu ktoś zrobił to jak należy! Continue to open-source'owy asystent AI, który działa lokalnie na waszym laptopie. Żadnych subskrypcji, żadnego wysyłania kodu do chmury - wszystko u was.

Co jest fajne w tym rozwiązaniu? Możecie używać różnych modeli - Codestral 22B do autocompletowania i chatu, albo kombinację DeepSeek Coder 6.7B do autocompletowania z Llama 3 8B do chatu. A najlepsze? Wszystko integruje się z Ollama, więc setup jest banalnie prosty.

Mają też fajną funkcję "at codebase" - możecie zadawać pytania o całą waszą bazę kodu używając lokalnych embeddingów. To znaczy, że AI ma kontekst całego projektu, ale wszystko zostaje u was.

**Kluczowe punkty:**
- Całkowicie open-source i lokalne
- Integracja z VS Code i JetBrains
- Różne modele do wyboru (Codestral, DeepSeek, Llama)
- Funkcja przeszukiwania całej bazy kodu
- Brak kosztów subskrypcji

**Link:** https://marketplace.visualstudio.com/items?itemName=Continue.continue

## HotScript - funkcje wyższego rzędu na poziomie typów TypeScript

To jest absolutnie szalone! Ktoś stworzył bibliotekę, która pozwala robić transformacje typów TypeScript jak gdyby to były normalne funkcje. HotScript daje wam funkcje typu Map, Filter, Join na poziomie systemu typów.

Wyobraźcie sobie, że macie listę typów i chcecie każdy zwiększyć o 3, potem połączyć kropką, rozdzielić z powrotem i dodać prefix. Normalnie to byłby koszmar w TypeScript, ale z HotScript to jest jak pisanie normalnego kodu.

Mają też pattern matching z Match, operacje matematyczne na typach, i możliwość definiowania własnych "lambda" funkcji na poziomie typów. To jest jak Lodash, ale dla systemu typów TypeScript.

**Kluczowe punkty:**
- Funkcje wyższego rzędu na poziomie typów
- Pattern matching dla typów
- Operacje matematyczne na typach
- Własne funkcje lambda na poziomie typów
- Transformacje obiektów i list typów

**Link:** https://github.com/gvergnaud/hotscript

## Jak ściąłem 22.3 sekundy z wywołania API używając Trace View

Dan Mindru miał endpoint, który trwał prawie 45 sekund. To nie był zwykły CRUD - generowanie całej bazy kodu, repozytorium, content i deploy na Vercel. Prawdziwy boss final endpointów.

Zamiast robić architektoniczne backflipy z kolejkami i background jobami, Dan użył Sentry Trace View żeby zobaczyć gdzie jest bottleneck. Okazało się, że problem nie był tam gdzie myślał.

Trace View pokazuje waterfall wszystkich operacji - HTTP calle, file I/O, third-party API, database queries. Dan mógł dokładnie zobaczyć które operacje zajmują najwięcej czasu i skupić się na optymalizacji właściwych rzeczy.

Rezultat? 22.3 sekundy mniej. To jest różnica między użytkownikiem który czeka i użytkownikiem który odchodzi.

**Kluczowe punkty:**
- Trace View pokazuje waterfall operacji
- Pomaga znaleźć prawdziwe bottlenecki
- Lepsze niż zgadywanie gdzie jest problem
- Znacząca poprawa user experience
- Integracja z Sentry dla error monitoring

**Link:** https://blog.sentry.io/how-i-cut-22-3-seconds-off-an-api-call-using-trace-view/

## Code Hike 1.0 - od Markdown do interaktywnych doświadczeń

Code Hike to biblioteka, która łączy Markdown z React żeby tworzyć interaktywne dokumentacje i tutoriale. Wersja 1.0 wprowadza dwie kluczowe funkcje: fine-grained markdown i headless codeblocks.

Fine-grained markdown pozwala rozbić markdown na małe kawałki i renderować je jak chcecie w React. Zamiast mieć sztywny blok UI, macie pełną kontrolę nad tym jak każdy element wygląda.

Headless codeblocks to jeszcze lepsze - możecie budować własne komponenty dla bloków kodu. Tooltips, animacje, line numbers, diff view, copy buttons, collapse, fold - wszystko co wymyślicie. A potem dodajecie komentarze w kodzie żeby używać tych komponentów.

**Kluczowe punkty:**
- Łączy Markdown z React
- Fine-grained control nad renderowaniem
- Własne komponenty dla bloków kodu
- Type-safe markdown z Zod
- Idealne do dokumentacji i tutoriali

**Link:** https://codehike.org/blog/v1

## Tumblr przenosi pół miliarda blogów na WordPress

Automattic, właściciel WordPress.com, kupił Tumblr w 2019 za 3 miliony dolarów. Teraz robią coś co brzmi jak jedna z największych migracji technicznych w historii internetu - przenoszą backend Tumblr na WordPress.

Mówią, że Tumblr pozostanie Tumblr - nie zmieniają UI ani user experience. To tylko backend. Ale pomyślcie o skali - pół miliarda blogów do przeniesienia.

Celem jest współdzielenie narzędzi między platformami. Team będzie mógł budować features które działają na obu serwisach, a Tumblr będzie mógł korzystać z open source developmentu WordPress.

Czy to się uda? Historia pokazuje różne wyniki takich migracji. Twitter przepisywał swój backend, Slack też zmieniał architekturę. Myspace przeszło na Microsoft stack i... no właśnie.

**Kluczowe punkty:**
- Pół miliarda blogów do migracji
- Backend na WordPress, UI zostaje bez zmian
- Współdzielenie narzędzi między platformami
- Jedna z największych migracji w historii
- Brak timeframe dla projektu

**Link:** https://techcrunch.com/2024/08/28/tumblr-to-move-its-half-a-billion-blogs-to-wordpress/

## Material UI v6 oficjalnie dostępne

Material UI wypuścił wersję 6.0. Szczegóły są ograniczone w tym newsletterze, ale to major release jednej z najpopularniejszych bibliotek komponentów React.

Material UI to praktycznie standard w wielu projektach React, więc każdy major release to duża sprawa dla ekosystemu. Wersja 6 prawdopodobnie wprowadza breaking changes, więc jeśli używacie MUI, warto sprawdzić migration guide.

**Kluczowe punkty:**
- Major release Material UI
- Prawdopodobne breaking changes
- Ważne dla ekosystemu React
- Sprawdźcie migration guide przed upgradem

**Link:** https://mui.com/blog/material-ui-v6-is-out/