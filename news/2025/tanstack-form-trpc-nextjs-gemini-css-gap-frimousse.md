---
title: "TanStack Form, tRPC v11, luka w middleware Next.js, Gemini 2.5 i nowe pomysły na CSS — przegląd techniczny"
excerpt: "Przegląd najważniejszych wiadomości frontendowych: TanStack Form v1, tRPC v11, exploit w Next.js middleware, Google Gemini 2.5, propozycja gap decorations w CSS i lekki emoji picker."
publishedAt: "2025-03-25"
slug: "tanstack-form-trpc-nextjs-gemini-css-gap-frimousse"
hashtags: "#generated #pl #react #typescript #frontend #tanstack #trpc #nextjs #css #ai #architecture #performance"
---

## Bytes #378 — TanStack nourishes its children
**TLDR:** Krótki felieton o premierze TanStack Form i o tym, dlaczego kolejna biblioteka formularzy ma sens. Autor chwali typowanie, reactivity i uniwersalność, jednocześnie ironizując nad tym, że formularze to nudny, ale ważny problem.

**Summary:**
To krótkie, osobiste omówienie zapowiedzi TanStack Form v1 pokazuje, dlaczego autor uznał projekt za wart przestudiowania — przede wszystkim ze względu na podejście do TypeScript, reaktywność API i headless design. W tekście powtarza się teza: istniejące biblioteki formularzy nie nadążają za nowoczesnym ekosystemem JS i potrzeba czegoś bardziej zunifikowanego. Autor podkreśla atrakcyjność TanStack jako ekosystemu, który ujednolica wzorce między frameworkami.

Jednocześnie felieton ma ton zachwytu, a nie dogłębnej analizy technicznej — więcej tu sentencji i osobistych anegdot niż konkretnych przykładów migracji czy ograniczeń. Autor sugeruje, że TanStack Form daje autouzupełnianie i silne typowanie, reaktywne aktualizacje i brak zależności, co brzmi atrakcyjnie dla zespołów walczących z dużymi, rozbudowanymi formularzami.

Co autor pomija lub umniejsza? Mało tu krytycznej dyskusji o kosztach API surface: koncepcje "type-safe" i "granularly reactive" brzmią świetnie, ale nie widzimy omówienia przyjętej ergonomii ani konsekwencji migracji z React Hook Form czy Formik. Nie poruszono też problemów interoperacyjności z istniejącymi komponentami UI, ładowaniem schematów walidacji z backendu czy wpływem na bundle size w realnych aplikacjach.

Dla zespołów i architektów: jeśli rozważacie konsolidację rozwiązań formularzowych w dużym projekcie, TanStack Form jest żywym kandydatem — zwłaszcza jeśli cenicie zunifikowane typowanie między modelami danych a komponentami. Zanim jednak przystąpicie do migracji, zróbcie prototyp krytycznych formularzy: wielostronicowe, dynamiczne pola, walidacje asynchroniczne i integracje z istniejącymi kontrolkami UI. To właśnie tam często wychodzą brudy implementacji.

**Key takeaways:**
- TanStack Form v1 stawia na ekstremalne TypeScript-owe bezpieczeństwo i granularną reaktywność.
- Headless, framework-agnostic podejście ułatwia ponowne użycie i integrację w różnych tech stackach.
- Brakuje jeszcze szerokich case study migracyjnych i dyskusji o kompromisach w ergonomii i utrzymaniu.

**Tradeoffs:**
- Gain: silne typowanie i wydajność przez granularne aktualizacje; but sacrifice: konieczność nauki nowego API i potencjalne koszty migracji z istniejących bibliotek.

**Link:** [Bytes #378 — TanStack nourishes its children](https://bytes.dev/archives/378)

---

## Announcing TanStack Form v1 | TanStack Blog
**TLDR:** TanStack Form v1 to stabilne wydanie biblioteki formularzy z adapterami dla React, Vue, Angular, Solid i Lit. Kluczowe argumenty to ekstremalne type-safety, granularna reactivity i podejście headless.

**Summary:**
TanStack Form wchodzi na scenę z ambicją zastąpić wiele odrębnych rozwiązań form handlingu. Autorzy wyeksponowali typowanie jako pierwszy obywatel: biblioteka ma pozwalać TypeScriptowi wyłapywać błędy pól już na etapie kompilacji, w tym także strukturę errorów z walidatorów. Drugi filar to API reaktywne na poziomie pól — only relevant components update — co ma minimalizować nakład renderów i dawać lepszą responsywność UI.

Kolejnym elementem jest wieloplatformowość: oficjalne adaptery na pięć frameworków mają ułatwić adoptowanie jednego modelu po stronie biznesowej niezależnie od warstwy widoku. Autorzy podkreślają też, że Form jest headless, co oznacza, że nie narzuca stylów ani komponentów — to daje dużą elastyczność, ale przenosi odpowiedzialność za DX (developer experience) do konsumenta biblioteki.

Brakuje jednak w artykule głębszej dyskusji o rzeczywistych przypadkach użycia, gdzie projekty dotąd korzystały z Formik, React Hook Form czy własnych implementacji. Nie ma też szczegółów dotyczących kosztów utrzymania dużych formularzy, integracji z zewnętrznymi walidatorami, czy jak biblioteka radzi sobie z serwisowymi edge-case’ami: walidacją cross-field w asynchronicznym środowisku, partial updates, optimistic UI, czy server-side rendering.

Dla zespołów i architektów: TanStack Form ma potencjał do standaryzacji modelu formularzy w organizacji, zwłaszcza tam gdzie typowanie end-to-end jest cenione. Zalecam zrobienie proof-of-concept dla najbardziej krytycznych formularzy: wielostronicowe przepływy płatności, edycja złożonych obiektów i formularze z dużą liczbą zależności między polami — tam weryfikuje się prawdziwe korzyści reaktywności i typów.

**Key takeaways:**
- TanStack Form v1: stabilna, wieloplatformowa biblioteka z mocnym naciskiem na TypeScript.
- Headless design daje elastyczność, ale wymaga pracy przy komponowaniu UI.
- Konieczne są testy migracyjne i realne POC-y przed masową adopcją.

**Tradeoffs:**
- Decision to standardize on TanStack Form means unified developer contracts and type-safety at the cost of initial migration effort and learning curve.

**Link:** [Announcing TanStack Form v1 | TanStack Blog](https://tanstack.com/blog/announcing-tanstack-form-v1)

---

## Announcing tRPC v11 | tRPC
**TLDR:** tRPC v11 wychodzi oficjalnie jako stabilna wersja. Najważniejsze zmiany to wsparcie dla TanStack Query v5, lepsza obsługa nie-JSONowych content types (FormData, Blob, Uint8Array) oraz poprawki integracji z React Server Components i Next.js App Router.

**Summary:**
tRPC v11 to ewolucja, która zachowuje dużą kompatybilność z v10, ale wprowadza funkcje ważne dla aplikacji typu fullstack w TypeScript. Integracja z TanStack Query v5 oznacza lepsze wsparcie dla React Suspense i nowych mechanik cache'owania — ważne dla aplikacji, które wykorzystują edge rendering i wymagają spójnego podejścia do fetchowania danych. Drugim głośnym dodatkiem jest możliwość przesyłania FormData i binarnych payloadów, co otwiera drogę dla uploadów plików i hybrydowych API bez konieczności odpalenia osobnego endpointu REST.

W artykule pojawiają się przykłady użycia FormData i octet parsers, co pokazuje, że tRPC zaczyna wychodzić poza czysto JSON-owe ograniczenia RPC. To naturalny krok, ale przy okazji zwiększa odpowiedzialność twórców aplikacji za obsługę strumieni, limitów rozmiaru i scenariuszy błędów.

Czego zabrakło? Brakuje dogłębnej dyskusji o konsekwencjach bezpieczeństwa i observability przy obsłudze binarnych danych przez RPC: czy logi nie wyciekną, jak ustawić limity, jak kontrolować backpressure, i jakie są best practices w deployach na edge—zwłaszcza gdy endpoints są wywoływane z przeglądarki. Również migracja z v10, chociaż opisana, nie ma wystarczająco szczegółowych porad dla dużych monorepo z niestandardowymi adapterami.

Dla zespołów i architektów: tRPC v11 ułatwia łączenie client-server przy zachowaniu silnych typów — dobre dla organizacji, które chcą maksymalnie zintegrować stack TypeScript. Jeśli planujecie przesyłać pliki przez tRPC, przygotujcie plan testów obciążeniowych, strategie limitowania rozmiarów i polityki obsługi błędów. Również przetestujcie integrację z TanStack Query v5 w HTTPS/Suspense scenariuszach.

**Key takeaways:**
- v11: oficjalne wsparcie TanStack Query v5 oraz obsługa FormData i binarnych content types.
- Umożliwia łatwiejsze uploady i lepszą integrację ze nowymi mechanikami React.
- Wymaga dodatkowych przemyśleń dotyczących bezpieczeństwa, limitów i observability.

**Tradeoffs:**
- Gain: prostsze przesyłanie plików i pełna integracja z nowymi mechanizmami query; but sacrifice: większa odpowiedzialność za bezpieczne parsowanie binarnych danych i zarządzanie obserwowalnością.

**Link:** [Announcing tRPC v11 | tRPC](https://trpc.io/blog/announcing-trpc-v11)

---

## Next.js and the corrupt middleware: the authorizing artifact
**TLDR:** Badacze odkryli poważną słabość w mechanice middleware Next.js: mechanizm wykrywania subrequestów (x-middleware-subrequest) może zostać wykorzystany, co umożliwia bypass autoryzacji i inne ataki bez specjalnych warunków.

**Summary:**
Artykuł techniczny opisuje szczegółowo, jak Next.js middleware działa i gdzie leży problem: funkcja runMiddleware sprawdza nagłówek x-middleware-subrequest, co w pewnych wersjach pozwala omijać mechanizmy autoryzacyjne. Autorzy zademonstrowali sposoby, w jakie to zachowanie prowadzi do rewrite/authorization bypass, obejść CSP oraz do ataku typu cache-poisoning prowadzącego do DoS. Co istotne — błąd dotyczy wielu wersji frameworka i nie wymaga skomplikowanych pre-kondycji.

Tekst idzie głębiej: pokazuje szczegółowy przebieg wykonywania middleware, temat nazewnictwa middlewareInfo.name, a także jak recursion depth czy nieprawidłowa kolejność wykonania mogą zostać wykorzystane. Autorzy udostępniają techniczne przykłady exploitów i kończą wyraźnym zaleceniem bezpieczeństwa oraz CVE.

Krytyka i braki: analiza jest techniczna i rzetelna, ale brakuje dyskusji o odpowiednich środkach łagodzących na poziomie aplikacji — np. propozycji wzorców defensywnych do walidacji nagłówków, podpisywania żądań wewnętrznych, czy wskazówek dla CI/CD (skanery, testy fuzzingowe). Jest też mało omówionej strategii komunikacji i migracji dla dużych projektów, które muszą szybko zareagować na łatanie middleware.

Dla architektów i zespołów bezpieczeństwa: ten raport to sygnał alarmowy. Middleware jest atrakcyjnym miejscem do centralizacji autoryzacji, ale równocześnie powiększa powierzchnię ataku. Rekomenduję audyt wszystkich middleware’ów w aplikacji, testy fuzzingowe wejść nagłówków, oraz dodanie mechanizmów redundancji auth (np. potwierdzanie sesji po stronie serwera zamiast polegania tylko na middleware). Dodatkowo warto rozważyć ograniczenie zaufania do niezweryfikowanych nagłówków i wprowadzić kontrolę upstreamów, które mogą modyfikować requesty.

**Key takeaways:**
- Next.js middleware ma lukę związaną z x-middleware-subrequest, pozwalającą na bypass autoryzacji i inne ataki.
- Problem dotyczy wielu wersji i nie wymaga szczególnych warunków pre-eksploitu.
- Organizacje powinny przeprowadzić pilny audyt middleware i wdrożyć defensywne wzorce.

**Tradeoffs:**
- Gain: stosowanie centralnego middleware do auth upraszcza logikę; but sacrifice: centralizacja zwiększa ryzyko poważnych błędów bezpieczeństwa, które uderzają globalnie.

**Link:** [Next.js and the corrupt middleware: the authorizing artifact](https://zhero-web-sec.github.io/research-and-things/nextjs-and-the-corrupt-middleware)

---

## Gemini 2.5: Our most intelligent AI model (Google DeepMind)
**TLDR:** Google wprowadza Gemini 2.5, model klasy "thinking" z lepszymi zdolnościami rozumowania i silnymi wynikami w benchmarkach kodowania, matematyki i rozumienia wielozmianowego kontekstu.

**Summary:**
Gemini 2.5 przedstawiany jest jako kolejny krok w kierunku modeli, które "myślą" — czyli potrafią prowadzić wewnętrzne rozumowania, chain-of-thought i lepiej integrować kontekst. Google podkreśla miejsce Gemini 2.5 na czele rankingów LMArena i moc w benchmarkach typu GPQA czy AIME. Wersje Pro oferują silniejsze możliwości kodowania i rozwiązywania zadań wymagających złożonego wnioskowania.

Z perspektywy praktycznej, dużą zmianą jest deklaracja, że takie myślenie (thinking models) będzie wbudowywane szerzej w kolejne modele. To zmienia oczekiwania co do jakości odpowiedzi i pozwala budować bardziej złożone systemy asystujące programistom i analitykom. Dla developerów oznacza to lepsze narzędzia wspomagające kodowanie, refaktoryzację i rozumienie kodu.

Autorzy jednak nie zajmują się wystarczająco szeroko kilkoma ważnymi kwestiami: jakie techniki post-training zastosowano, jakie są granice "reasoning" versus overfitting na testy, jaka jest transparentność danych treningowych i czy istnieje ryzyko powielania błędów lub uprzedzeń. Brakuje też praktycznych porad dotyczących integracji modelu w produkcji — opisy SLA, ograniczeń kosztowych, polityk prywatności danych wejściowych czy przyjętych środków bezpieczeństwa.

Dla architektów i zespołów produktowych: Gemini 2.5 zapowiada się jako potężne narzędzie wspomagające pracę developerów i automatyzację zadań wymagających rozumienia kontekstu. Jeśli planujecie integrację LLM do workflowów developerskich, przygotujcie się na: walidację wyników (AI-in-the-loop, humans review), metryki oceny jakości generowanej logiki oraz polityki prywatności i retencji danych. Traktujcie model jako asystenta, nie autorytet — szczególnie w krytycznych decyzjach architektonicznych.

**Key takeaways:**
- Gemini 2.5: znaczący skok w benchmarkach rozumowania i kodowania.
- "Thinking models" stają się kierunkiem rozwoju, ale wymagają ostrożnej integracji.
- Brakuje jawności treningowej i wytycznych wdrożeniowych dla firm.

**Tradeoffs:**
- Gain: lepsze automatyczne rozumowanie i wsparcie w zadaniach złożonych; but sacrifice: ryzyko nadmiernego zaufania do modelu i brak jasnych gwarancji dotyczących poprawności i prywatności.

**Link:** [Gemini 2.5: Our most intelligent AI model](https://blog.google/technology/google-deepmind/gemini-model-thinking-updates-march-2025/)

---

## Minding the gaps: A new way to draw separators in CSS
**TLDR:** Propozycja "gap decorations" w CSS ma na celu oferowanie natywnego mechanizmu rysowania separatorów między elementami układu, zamiast stosowania borderów lub pseudo-elementów — dzięki temu prostsze, bardziej przewidywalne separatory w Grid i Flexbox.

**Summary:**
Autor opisuje powszechny problem: rysowanie linii separujących elementy w layoutach — zwłaszcza w layoutach flexbox/grid z wrapowaniem lub w elementach responsywnych — jest kłopotliwe przy użyciu borderów i pseudo-elementów. Proponowane gap decorations mają umożliwić dekorowanie przestrzeni między elementami (gaps) niezależnie od samych elementów, co rozwiązuje problemy z rozmiarem elementów, koniecznością specjalnego traktowania pierwszego/ostatniego elementu, czy separatorami rozciągającymi się przez linie wrapu.

Propozycja techniczna zakłada mechanizm, który pozwala przypinać style do przestrzeni gap, a nie do elementów — daje to większą elastyczność przy rysowaniu linii, gradientów czy innych dekoracji. Autor omawia też praktyczne subtelności: jak radzić sobie z paddingami, wirtualizacją list (gdzie padding/dimensions są dynamiczne) oraz jak unikać layout shiftów przy nawigacji klawiaturowej.

Brakuje jednak sporo szczegółów implementacyjnych: wpływu na silnik renderujący (performance), interoperacyjności z istniejącymi właściwościami (box-sizing, transform), a także kwestii dostępności (a11y) — jak czytniki ekranu interpretują elementy "gap-decorations" i jak utrzymać semantykę treści. Nie omówiono też zachowań w przeglądarkach, które nie wspierają tej propozycji.

Dla zespołów front-endowych: gap decorations to ciekawa, ergonomiczna zmiana, która może uprościć CSS komponentów w bibliotekach UI. Do czasu szerokiego wsparcia warto mieć warstwę fallbacku: prosty border albo pseudo-element z dobrze przemyślanym box model. Przy wdrażaniu nowego rozwiązania testujcie zarówno scenariusze responsywne, jak i nawigację klawiaturową, aby uniknąć skoków i problemów z fokusowaniem.

**Key takeaways:**
- gap decorations upraszczają rysowanie separatorów między elementami, zwłaszcza w Grid/Flex z wrapowaniem.
- Rozwiązanie zmniejsza potrzebę skomplikowanych pseudo-elementów i specjalnych przypadków pierwszego/ostatniego elementu.
- Trzeba przemyśleć fallbacky, performance i dostępność przed masowym użyciem.

**Tradeoffs:**
- Gain: prostszy, bardziej deklaratywny sposób rysowania separatorów; but sacrifice: zależność od wsparcia przeglądarek i potencjalne koszty implementacyjne w silnikach renderujących.

**Link:** [Minding the gaps: A new way to draw separators in CSS](https://blogs.windows.com/msedgedev/2025/03/19/minding-the-gaps-a-new-way-to-draw-separators-in-css/)

---

## Frimousse — An emoji picker for React
**TLDR:** Frimousse to lekki, unstyled i komponowalny emoji picker dla React — headless, z wirtualizowanym listowaniem i opcją integracji z shadcn/ui.

**Summary:**
Frimousse reklamuje się jako mały zestaw części, które pozwalają zbudować emoji picker bez narzucania stylów. Zamiast pełnego "gotowca" dostajemy zestaw elementów do komponowania, co daje elastyczność: możesz użyć Tailwind, CSS-in-JS czy zwykłych klas. Biblioteka wspiera dynamikę wymiarów i wirtualizację listy, co jest kluczowe przy dużej liczbie emoji, i oferuje triki do radzenia sobie z paddingiem i wymiarami w wirtualizowanych listach.

Autorzy zwracają uwagę na szczegóły UX: zachowanie rozmiarów w wierszach, scroll-margin dla nawigacji klawiaturowej, oraz techniki kolorowania aktywnych przycisków. Dla użytkowników shadcn/ui jest gotowy prebuilt adapter, co ułatwia integrację.

Brakuje natomiast omówienia aspektów accessibility poza krótkimi wskazówkami; emoji pickery muszą być przemyślane pod kątem czytników ekranu, focus managementu i obsługi klawiatury. Podobnie nie ma rozbudowanej dyskusji o internacjonalizacji (różne zestawy emoji, lokalne nazwy) czy wydajności na słabszych urządzeniach mobilnych.

Dla zespołów UI: Frimousse jest dobrym wyborem, gdy chcecie mieć kontrolę nad wyglądem i zachowaniami emoji pickera, a nie chcecie dużego, opinotwórczego komponentu. Przy integracji zwróćcie uwagę na kompletne testy a11y i na scenariusze z dużą liczbą emoji — wirtualizacja pomoże, ale musicie też testować UX keyboard navigation.

**Key takeaways:**
- Frimousse to headless, komponowalny i wirtualizowany emoji picker dla React.
- Daje pełną kontrolę nad stylami i integruje się z shadcn/ui.
- Konieczne testy accessibility i wydajności przy dużej skali.

**Link:** [Frimousse — An emoji picker for React](https://frimousse.liveblocks.io/)

---

Koniec przeglądu. Jeśli chcesz, mogę nagrać skrypt audio na podstawie tych podsumowań (wersja do odczytania na głos), skrócić treści do „quick highlights” lub przygotować checklistę migracyjną dla TanStack Form / tRPC / Next.js. Co wolisz?

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by gpt-5-mini LLM. While we strive for accuracy, please verify critical information independently.
