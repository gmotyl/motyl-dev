---
title: "This Week In React #301: TanStack Start 1.0, Next.js, Tamagui 3 i Deno w Cloudflare"
excerpt: "Stabilne TanStack Start, aktualizacje bezpieczeństwa Next.js, narzędzia React Native i przegląd nowości w przeglądarkach."
publishedAt: "2026-10-14"
slug: "this-week-in-react-301-tanstack-start-1-0-deno-cloudflare"
hashtags: "#thisweekinreact #react #reactnative #tanstack-router #nextjs #deno #cloudflare #typescript #generated #pl"
source_pattern: "This Week In React"
---

## TanStack Start 1.0 jest stabilne

**TLDR:** Tanner Linsley ogłasza wersję 1.0 TanStack Start i formalnie zobowiązuje się do stabilności API. Framework wyrósł z routera z pełnym typowaniem i nie przyjmuje serwerowej ideologii jako jedynej odpowiedzi.

**Summary:** Autor opisuje drogę od routera, który miał wiedzieć o ścieżkach, parametrach, parametrach wyszukiwania i danych loadera, aż do pełnego frameworka. Zachowuje znany model aplikacji: komponenty, trasy, zarządzanie stanem po stronie klienta i cache danych, a do tego dokłada renderowanie serwerowe, streaming i typowane funkcje serwerowe. Trasa może renderować się na serwerze, ładować dane bez renderowania komponentu albo działać wyłącznie na kliencie, a middleware przechodzi przez granicę klient-serwer z zachowaniem typów.

Wątek, który mnie interesuje najbardziej, to React Server Components. Autor przyznaje, że wsparcie dla RSC długo było traktowane jak pozycja do odhaczenia, a po własnych doświadczeniach zdecydował się wyłączyć je na tanstack.com, bo trudno było śledzić, co trafia na klienta, także agentom AI. Podkreśla, że integracja jest opcjonalna i nie narzuca modelu całej aplikacji. Wspomina też o około pięciokrotnym wzroście przepustowości renderowania po stronie serwera dzięki profilowaniu, o Vite i Nitro zamiast własnych adapterów wdrożeniowych oraz o skillach w pakietach npm, które uczą agentów dobrych praktyk.

**Key takeaways:**
- Jawne granice serwer-klient i silne typy pomagają zarówno ludziom, jak i agentom.
- RSC jest tu opcją, a nie fundamentem.
- Wdrożenia opierają się na Vite i Nitro.

**Why do I care:** Jeśli zaczynasz projekt React bez przywiązania do Next.js, Start staje się poważnym kandydatem, zwłaszcza dla aplikacji z dużą interaktywnością. Wpis jest jednak marketingowo ciepły i pomija słabe strony, jak młodszy ekosystem integracji i liczbę zapytań do wsparcia po 1.0.

**Link:** [TanStack Start 1.0 is Stable](https://tanstack.com/blog/tanstack-start-1-0)

## Next.js, React Compiler i narzędzia wokół Reacta

**TLDR:** Zespół Next.js zapowiada aktualizację bezpieczeństwa z poprawkami podatności z zależności, a w ekosystemie pojawiają się wydania React Aria, Base UI, styled-components i react-hook-form.

**Summary:** Sekcja główna przeglądu wskazuje zapowiedź październikowej aktualizacji bezpieczeństwa Next.js dotyczącej podatności odziedziczonych z zależności, a także prace nad zgodnością z ESLint 10 w eslint-config-next i pluginie React. Pojawia się propozycja RFC liczników pracy Reacta w produkcji oraz wtyczka MobX dla Reacta.

Z artykułów warto zauważyć tekst o tym, czy React Compiler naprawdę przyspiesza aplikacje, notatkę Matta Rothenberga o className jako potencjalnie szkodliwym, opis tego, jak dziewięciomegabajtowy moduł WebAssembly sprawić, by wydawał się szybszy bez zmniejszania go, oraz poradnik debugowania Suspense z nowym panelem. Wśród wydań: React Aria 1.22, Base UI 1.9, styled-components 6.6, react-hook-form 7.90, vinext 1.1 od Cloudflare i wtyczka Vitest dla RSC w Storybooku.

**Key takeaways:**
- Zaplanuj okno na aktualizację bezpieczeństwa Next.js.
- Przy ESLint 10 sprawdź kompatybilność konfiguracji frameworka i pluginów.
- Pomiary React Compilera warto powtórzyć na własnej aplikacji.

**Why do I care:** To typowy tydzień utrzymaniowy: mało rewolucji, dużo drobnych zmian w łańcuchu narzędzi, które psują build w piątek po południu. Newsletter wymienia je wszystkie, ale nie mówi, które z nich realnie zmieniają decyzje architektoniczne.

**Link:** [Upcoming Next.js Security Update for Upstream Vulnerabilities](https://nextjs.org/blog/upcoming-nextjs-security-update-october-2026)

## React Native: Tamagui 3, One, Expo i wydania bibliotek

**TLDR:** Tamagui 3 przynosi nowy natywny runtime i składnię w stylu Tailwinda, a w Expo rośnie wsparcie dla brownfield i obserwowalności. Do tego liczne wydania bibliotek.

**Summary:** Tamagui 3 obiecuje bardziej natywną kompilację, płaskie propsy stylów, React Strict DOM i składnię Tailwind dla jednej wspólnej bazy interfejsu. Obok pojawia się framework One, który reklamuje się jako "React Native, wszystko w jednym". Expo rozwija raportowanie awarii natywnych w usłudze Observability, a tekst o brownfield przekonuje, że nie trzeba przepisywać istniejącej aplikacji.

Lista wydań obejmuje react-native-skia, React Native Testing Library 14.1, Screens 4.29, Nano Icons 1.0, Hot Updater 1.0, sentry-react-native 8.30 i Rozenite 2.5. Wzmianka o dyskusji o utrzymaniu react-native-web oraz o MCP Maestro dla agentów AI kodujących pokazuje, że testy mobilne też stają się domeną agentów.

**Key takeaways:**
- Brownfield w Expo obniża koszt wejścia do React Native w istniejącej aplikacji.
- Hot Updater osiągnął 1.0, więc OTA bez EAS jest realną opcją.
- Przyszłość react-native-web zależy od decyzji o utrzymaniu.

**Why do I care:** Jeśli współdzielisz kod między Next.js a Expo, ważny jest tekst o wspólnej warstwie domeny w TypeScripcie. Przy takim nawale wydań trzeba uważać na zmęczenie zależnościami i aktualizować tylko to, co faktycznie rozwiązuje problem.

**Link:** [Tamagui 3](https://tamagui.dev/blog/version-three)

## Deno dołącza do Cloudflare, JPEG XL w Chrome i narzędzia

**TLDR:** Deno ogłasza przejście do Cloudflare, JPEG XL trafia do Chrome, a Playwright 1.64, Bun 1.4.3 i Partytown 1.0 dostają nowe wersje.

**Summary:** Najgłośniejsza wiadomość to przejęcie Deno przez Cloudflare. W przeglądarkach: JPEG XL w Chrome, Firefox 158, Safari Technology Preview 254 oraz integracja propozycji AsyncContext ze specyfikacją HTML. Lea Verou pisze o najlepszym sposobie używania ikon w interfejsach, a Alfy o ramkach iframe, które w końcu dopasowują rozmiar do zawartości.

W narzędziach: eksperymentalny port kompilatora TypeScript 7 do Rusta, wydanie Playwright 1.64 i Partytown 1.0. Nie ma wzmianki o tym, jak Cloudflare zamierza utrzymać niezależność Deno jako środowiska uruchomieniowego.

**Key takeaways:**
- Deno staje się częścią platformy Cloudflare.
- JPEG XL w Chrome otwiera drogę do realnego użycia tego formatu.
- AsyncContext zbliża się do standardu.

**Why do I care:** Dla zespołów na Deno to sygnał, żeby sprawdzić plan wsparcia i licencje. Dla reszty to kolejny dowód, że platformy edge konsolidują środowiska uruchomieniowe.

**Link:** [Deno is joining Cloudflare](https://deno.com/blog/cloudflare)
