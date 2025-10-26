---
title: 'Postmortem On Nextjs Middleware Bypass Vercel You Should Know This Before Choosing Nextjs Introducing Clerkagent Toolkit'
excerpt: 'Przegląd 6 artykułów z ui.dev'
publishedAt: '2025-03-28'
slug: 'postmortem-on-nextjs-middleware-bypass-vercel-you-should-know-this-before-choosing-nextjs-introducing-clerkagent-toolkit'
hashtags: '#generated #pl #ai #css'
---

## Postmortem on Next.js Middleware bypass - Vercel

No to mamy tutaj prawdziwy szit show, ludzie. Vercel właśnie opublikował postmortem krytycznej luki bezpieczeństwa w Next.js, która pozwalała na ominięcie middleware'u. I słuchajcie, to nie jest jakiś drobny bug - to CVE z oceną krytyczną, która mogła pozwolić atakującym na kompletne ominięcie logiki autoryzacji.

Cała historia zaczęła się 27 lutego, gdy ktoś zgłosił lukę przez GitHub. Ale tu jest problem - początkowo myśleli, że dotyczy tylko starych wersji 12.x, więc dali temu niski priorytet. Dopiero kilka dni później okazało się, że problem dotyczy także nowszych wersji. Classic Vercel move, prawda?

Najciekawsze w tym wszystkim jest to, że sama Vercel była nienaruszona przez tę lukę. Dlaczego? Bo ich architektura rozdziela routing Next.js od reszty systemu. Ironiczne, że firma, która stworzyła framework z luką, jest jedyną, która nie jest przez nią dotknięta.

Luka polegała na możliwości przekazania specjalnego nagłówka x-middleware-subrequest, który pozwalał ominąć middleware. Naprawiono to przez dodanie walidacji tego nagłówka. Proste rozwiązanie, ale szkoda została już wyrządzona.

**Kluczowe wnioski:**
- Krytyczna luka pozwalała na ominięcie Next.js middleware
- Vercel był odporny na własną lukę przez architekturę
- Patch dostępny dla wersji 14.2.25 i 15.2.3
- Pokazuje problemy z priorytetyzacją zgłoszeń bezpieczeństwa

**Link**: https://vercel.com/blog/postmortem-on-next-js-middleware-bypass

Kluczowe wnioski:
- - Krytyczna luka pozwalała na ominięcie Next.js middleware
- Vercel był odporny na własną lukę przez architekturę
- Patch dostępny dla wersji 14.2.25 i 15.2.3
- Pokazuje problemy z priorytetyzacją zgłoszeń bezpieczeństwa

Link: 

## You should know this before choosing Next.js

Eduardo Bouças z Netlify napisał bardzo kontrowersyjny artykuł o tym, co powinieneś wiedzieć przed wyborem Next.js. I uwaga - facet pracuje w Netlify, więc może być stronniczy, ale jego argumenty są całkiem solidne.

Główny punkt to brak przejrzystości między Next.js jako open-source frameworkiem a Vercel jako firmą komercyjną. Eduardo twierdzi, że granice między tym, co jest częścią frameworka, a tym, co jest vendor lock-inem do Vercela, są bardzo rozmyte.

Problem polega na tym, że wiele funkcji Next.js jest optymalizowanych specjalnie pod Vercel, a inne platformy hostingowe muszą walczyć z implementacją pełnej funkcjonalności. To nie jest fair play w świecie open source.

Eduardo nie mówi "nie używajcie Next.js", ale apeluje o świadomość tego, na co się decydujecie. Jeśli planujesz hostować gdzie indziej niż na Vercelu, możesz mieć problemy z niektórymi funkcjami.

**Kluczowe wnioski:**
- Brak jasnych granic między Next.js a Vercel
- Niektóre funkcje mogą nie działać poza Vercel
- Potencjalny vendor lock-in
- Ważne jest świadome podejmowanie decyzji o stacku

**Link**: https://eduardoboucas.com/posts/2025-03-25-you-should-know-this-before-choosing-nextjs/

Kluczowe wnioski:
- - Brak jasnych granic między Next.js a Vercel
- Niektóre funkcje mogą nie działać poza Vercel
- Potencjalny vendor lock-in
- Ważne jest świadome podejmowanie decyzji o stacku

Link: 

## Introducing @clerk/agent-toolkit

Clerk wchodzi w świat AI Agents z nowym pakietem agent-toolkit. To jest naprawdę ciekawe podejście do integracji autentykacji z systemami AI.

Pakiet pozwala na łatwe zarządzanie użytkownikami, danymi użytkowników i organizacjami w kontekście AI agents. Wspiera Vercel AI SDK i LangChain, co oznacza, że możesz łatwo dodać kontekst użytkownika do swoich agentów.

Najciekawszą funkcją jest session context injection - możesz automatycznie wstrzykiwać informacje o sesji jak userId, sessionId czy orgId do system promptów. To oznacza, że twój agent wie, z kim rozmawia i może odpowiednio dostosować swoje odpowiedzi.

Mają też wsparcie dla MCP (Model Context Protocol) server, co pozwala na integrację z klientami takimi jak Claude Desktop. To pokazuje, że myślą o ekosystemie, nie tylko o własnych narzędziach.

**Kluczowe wnioski:**
- Integracja Clerk z AI Agents
- Wsparcie dla Vercel AI SDK i LangChain
- Automatyczne wstrzykiwanie kontekstu sesji
- Wsparcie dla MCP server
- Scoped helpers dla bezpieczeństwa

**Link**: https://go.clerk.com/JOhWPyl

Kluczowe wnioski:
- - Integracja Clerk z AI Agents
- Wsparcie dla Vercel AI SDK i LangChain
- Automatyczne wstrzykiwanie kontekstu sesji
- Wsparcie dla MCP server
- Scoped helpers dla bezpieczeństwa

Link: 

## CSS Mixins are ready for experimentation!

Holy shit, ludzie! CSS Mixins są już dostępne do eksperymentowania w Chrome Canary! To jest ogromny krok naprzód dla CSS.

Mixiny w CSS działają podobnie jak w Sassie - definiujesz chunk stylów, który możesz później wielokrotnie używać. Składnia wygląda tak: definiujesz mixin z at-rule @mixin, a potem używasz go z @apply.

To jest naprawdę potężne narzędzie, które pozwoli na lepszą organizację CSS bez potrzeby preprocessorów. Wyobraźcie sobie możliwość definiowania kompleksowych wzorców stylów bezpośrednio w natywnym CSS.

Żeby to przetestować, musisz uruchomić Chrome Canary z flagą CSSMixins. To wciąż wczesny prototyp, ale już można zacząć eksperymentować.

Adam Argyle wspomina też o funkcjach CSS, które również są w fazie eksperymentów. To może być przełomowy rok dla CSS - mixiny, funkcje, nowe selektory. Web platform naprawdę przyspiesza.

**Kluczowe wnioski:**
- CSS Mixins dostępne w Chrome Canary z flagą
- Składnia podobna do Sass mixinów
- Możliwość definiowania reużywalnych chunków CSS
- Część większego trendu nowych funkcji CSS
- Wciąż w fazie eksperymentalnej

**Link**: https://nerdy.dev/css-mixins-ready-for-experimentation

Kluczowe wnioski:
- - CSS Mixins dostępne w Chrome Canary z flagą
- Składnia podobna do Sass mixinów
- Możliwość definiowania reużywalnych chunków CSS
- Część większego trendu nowych funkcji CSS
- Wciąż w fazie eksperymentalnej

Link: 

## Cyanview: Coordinating Super Bowl's visual fidelity with Elixir

To jest fascynująca historia o tym, jak mały belgijski zespół trzech osób zbudował system, który koordynuje ponad 200 kamer podczas Super Bowl używając Elixira.

Cyanview zajmuje się camera shadingiem - procesem dopasowywania wszystkich kamer tak, żeby kolory, ekspozycja i inne aspekty wizualne były spójne. To krytyczne dla transmisji na żywo, gdzie nie ma drugiej szansy.

Dlaczego wybrali Elixir? Bo Erlang VM był zaprojektowany do komunikacji i koordynacji milionów urządzeń przez sieć w niezawodny sposób. To idealnie pasuje do ich potrzeb.

Najciekawsze jest to, że ten produkt rozprzestrzenił się w branży tylko dzięki funkcjonalności, bez żadnego marketingu. Teraz używają go na Olimpiadzie, Super Bowl, NBA, ESPN i Amazon. To pokazuje siłę dobrze zaprojektowanego narzędzia.

Broadcast to biznes, gdzie masz tylko jedną szansę - niezawodność jest królem. Elixir dał im best-in-class networking, odporność na błędy i ekosystem pozwalający na szybką iterację.

**Kluczowe wnioski:**
- Trzech programistów zbudowało system używany na Super Bowl
- Elixir idealny do koordynacji setek urządzeń
- Sukces oparty na funkcjonalności, nie marketingu
- Niezawodność krytyczna w branży broadcast
- IP-based approach zamiast proprietary protocols

**Link**: https://elixir-lang.org/blog/2025/03/25/cyanview-elixir-case/

Kluczowe wnioski:
- - Trzech programistów zbudowało system używany na Super Bowl
- Elixir idealny do koordynacji setek urządzeń
- Sukces oparty na funkcjonalności, nie marketingu
- Niezawodność krytyczna w branży broadcast
- IP-based approach zamiast proprietary protocols

Link: 

## UI algorithms: a tiny undo stack

Bardzo praktyczny artykuł o implementacji undo stack w UI. Autor pokazuje, jak zbudować prosty, ale kompletny system cofania operacji bez używania wskaźników do tablic.

Problem z większością implementacji undo stack to używanie indeksów do tablic, co prowadzi do błędów z undefined values i pomyłek z slice/splice. Autor proponuje elegantkie rozwiązanie bez indeksowania.

Jego API jest bardzo czytelne - przekazujesz funkcję do wykonania i funkcję do cofnięcia, a system zarządza resztą. Nie musisz martwić się o wskaźniki czy granice tablic.

To jest świetny przykład tego, jak przemyślenie API może znacznie uprościć implementację i zmniejszyć liczbę błędów. Czasami najlepsze rozwiązanie to unikanie problemu, a nie jego rozwiązywanie.

**Kluczowe wnioski:**
- Unikanie wskaźników do tablic w undo stack
- Czyste API z funkcjami do/undo
- Mniej błędów przez lepszy design
- Praktyczne rozwiązanie częstego problemu UI

**Link**: https://blog.julik.nl/2025/03/a-tiny-undo-stack

Kluczowe wnioski:
- - Unikanie wskaźników do tablic w undo stack
- Czyste API z funkcjami do/undo
- Mniej błędów przez lepszy design
- Praktyczne rozwiązanie częstego problemu UI

Link: