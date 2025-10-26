---
title: 'Release V460 Honojshono The Webs Clipboard And How It Stores Data Of Different Types Mdx In Nextjs On Space Jelly'
excerpt: 'Przegląd 5 artykułów z ui.dev'
publishedAt: '2024-09-16'
slug: 'release-v460-honojshono-the-webs-clipboard-and-how-it-stores-data-of-different-types-mdx-in-nextjs-on-space-jelly'
hashtags: '#generated #pl #react #ai #css'
---

## Release v4.6.0 · honojs/hono

Dobra, więc Hono właśnie wypuściło wersję 4.6.0 i to jest naprawdę spoko. Największą nowością jest Context Storage Middleware, o którym ludzie pytali od dawna. W końcu możemy używać AsyncLocalStorage żeby dostać się do contextu Hono poza handlerami.

Wyobraźcie sobie - wcześniej jak chcieliście dostać się do zmiennych z contextu czy do bindingów Cloudflare Workers, to musieliście przekazywać context przez każdą funkcję. Teraz możecie po prostu zaimportować getContext i mieć dostęp do wszystkiego z każdego miejsca w kodzie. To jest game changer dla większych aplikacji.

Dodatkowo dodali wsparcie dla Permissions-Policy header w secure headers middleware, możliwość dostępu do eventContext w Cloudflare Pages, generics w WSContext dla WebSocketów i kilka innych fajnych rzeczy. Hono naprawdę się rozwija w dobrym kierunku.

**Kluczowe punkty:**
- Context Storage Middleware używa AsyncLocalStorage
- Dostęp do contextu i bindingów poza handlerami
- Nowe headery bezpieczeństwa i ulepszenia WebSocket
- Lepsze wsparcie dla Cloudflare Workers i Pages

**Link:** [link](https://github.com/honojs/hono/releases/tag/v4.6.0)

## The web's clipboard, and how it stores data of different types

Alex Harri napisał świetny artykuł o tym jak działa clipboard w przeglądarce. Większość z nas używa kopiuj-wklej codziennie, ale nie zastanawia się jak to działa pod spodem.

Clipboard może przechowywać różne typy danych jednocześnie - plain text, HTML, obrazy PNG. Gdy kopiujecie coś z strony i wklejacie do Google Docs, zachowuje formatowanie bo czyta reprezentację HTML. Gdy wklejacie do VS Code, dostajecie tylko tekst bo VS Code czyta reprezentację plain text.

Async Clipboard API jest całkiem proste w użyciu. Możecie czytać różne typy danych, sprawdzać co jest dostępne i zapisywać własne dane w różnych formatach. ClipboardItem przyjmuje key-value store co jest eleganckim rozwiązaniem.

Artykuł omawia też ograniczenia - tylko trzy typy MIME są wymagane przez spec, ale są propozycje jak Web Custom Formats żeby to rozszerzyć. Niektóre firmy już obchodzą te ograniczenia w kreatywny sposób.

**Kluczowe punkty:**
- Clipboard przechowuje dane w wielu reprezentacjach z MIME types
- Async Clipboard API wspiera text/plain, text/html i image/png
- ClipboardItem używa key-value store dla różnych typów danych
- Web Custom Formats może rozszerzyć możliwości w przyszłości

**Link:** [link](https://alexharri.com/blog/clipboard)

## MDX in Next.js on Space Jelly

Colby Fayock pokazuje jak skonfigurować MDX w Next.js App Router. MDX to kombinacja Markdown z JSX - możecie pisać content w Markdown i używać React componentów jednocześnie.

Problem w tym, że Next.js nie wspiera MDX out-of-the-box. Musicie zainstalować @next/mdx, @mdx-js/loader i @mdx-js/react, potem skonfigurować next.config.js żeby obsługiwał dodatkowe rozszerzenia plików i wrap'ować config w withMDX.

Trzeba też stworzyć plik mdx-components.tsx z boilerplate funkcją useMDXComponents. To pozwala na konfigurację custom componentów później.

Haczyk jest taki, że z oficjalnym packagem Next.js, wasze MDX pliki muszą być w app directory. To może być ograniczające jeśli chcecie trzymać content gdzie indziej. Colby wspomina o alternatywnych rozwiązaniach dla bardziej złożonych przypadków użycia.

**Kluczowe punkty:**
- MDX łączy Markdown z JSX dla bogatego contentu
- Wymaga konfiguracji @next/mdx i dodatkowych packageów
- Pliki MDX muszą być w app directory z oficjalnym rozwiązaniem
- mdx-components.tsx pozwala na custom komponenty

**Link:** [link](https://spacejelly.dev/posts/mdx-in-nextjs)

## CSS display contents

Ishadeed wyjaśnia CSS display contents - właściwość którą wielu nie rozumie ale która może być bardzo przydatna.

Display contents sprawia, że element znika z drzewa renderowania ale jego dzieci pozostają. To brzmi dziwnie ale ma praktyczne zastosowania.

Przykład - macie header z tytułem i linkiem w flexbox, plus opis pod spodem. Chcecie żeby link był pod opisem ale HTML struktura tego nie pozwala. Z display contents możecie "spłaszczyć" layout - usunąć wrapper element z renderowania tak żeby jego dzieci stały się bezpośrednimi dziećmi rodzica.

To pozwala na reorganizację layoutu bez zmiany HTML. Możecie użyć CSS order żeby przemieścić elementy. To eleganckie rozwiązanie problemu który wcześniej wymagał position absolute lub zmiany markup.

Display contents ma swoje ograniczenia - usuwa wszystkie style z elementu (background, border, padding). Ale w odpowiednich przypadkach to potężne narzędzie.

**Kluczowe punkty:**
- Display contents usuwa element z renderowania ale zachowuje dzieci
- Pozwala na "spłaszczenie" layoutu bez zmiany HTML
- Przydatne do reorganizacji flexbox/grid layoutów
- Usuwa wszystkie style z elementu (background, border, padding)

**Link:** [link](https://ishadeed.com/article/display-contents/)

## Learning to reason with LLMs

OpenAI opublikowało artykuł o tym jak uczyć LLM rozumowania. To fascynujący wgląd w to jak modele językowe mogą rozwiązywać złożone problemy krok po kroku.

Przykład pokazuje jak model dekoduje zaszyfrowaną wiadomość. Dostaje przykład "oyfjdnisdr rtqwainr acxz mynzbhhx" -> "Think step by step" i musi użyć tego żeby zdekodować inną wiadomość.

Model zaczyna od analizy - liczy litery, szuka wzorców, testuje hipotezy. Zauważa że słowa w szyfrogramie są dokładnie dwa razy dłuższe niż w tekście jawnym. To prowadzi do teorii że może trzeba brać co drugą literę.

To pokazuje jak LLM może "myśleć" - rozbijać problem na części, testować hipotezy, budować na poprzednich obserwacjach. To nie jest tylko pattern matching, to strukturalne podejście do rozwiązywania problemów.

Dla nas jako developerów to ważne bo pokazuje jak możemy lepiej promptować modele - dawać im przestrzeń na rozumowanie, prosić o krok po kroku analizę, pozwalać na testowanie hipotez.

**Kluczowe punkty:**
- LLM mogą uczyć się strukturalnego rozumowania
- Rozbijanie problemów na części i testowanie hipotez
- Ważność dawania modelom przestrzeni na "myślenie"
- Lepsze promptowanie przez prośbę o krok po kroku analizę

**Link:** [link](https://openai.com/index/learning-to-reason-with-llms/)