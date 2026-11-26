---
title: "This Week In React #307: React2STEAL, luki w React Router, plan TanStack Query v6 i Reanimated 4.8"
excerpt: "Ricky Hanlon odchodzi z Meta, kampania React2STEAL wycieka sekrety z niezałatanych serwerów, a Reanimated stabilizuje Shared Element Transitions."
publishedAt: "2026-11-25"
slug: "this-week-in-react-307-react2steal-router-tanstack-query-v6"
hashtags: "#thisweekinreact #react #security #nextjs #react-query #react-native #expo #generated #pl"
source_pattern: "This Week In React"
---

## React, bezpieczeństwo i ekosystem w numerze 307

**TLDR:** Ricky Hanlon opuszcza Meta po ośmiu latach pracy nad Reactem. React Router załatał siedem luk, a automatyczna kampania React2STEAL wyciąga sekrety z niezałatanych serwerów. TanStack Query pokazał plan wersji 6, a Reanimated 4.8 uznał Shared Element Transitions za stabilne.

**Summary:** Najpoważniejszy wątek to bezpieczeństwo. React Router ogłosił cztery poważne i trzy umiarkowane zalecenia, a poprawki są w wersjach 7.18.6 i 8.5.2. Kampania React2STEAL wykorzystuje przejęte konta na GitHubie do atakowania serwerów podatnych na React2Shell, czyli Reacta od 19.0 do 19.2, albo na obejście middleware w Next.js. Co najmniej 1281 serwerów padło ofiarą, a ich zmienne środowiskowe, pliki .env i klucze API trafiły do publicznych repozytoriów. Kto jest na starej wersji, powinien zaktualizować ją i rotować sekrety. Osobny tekst zwraca uwagę, że świeża aplikacja Next.js raportuje zero podatności, choć 139 zależności zbundlowanych w next/dist/compiled ma trzy krytyczne i dziewiętnaście poważnych luk, których npm audit nie widzi.

Wśród zmian w ekosystemie: Ricky Hanlon odchodzi z Meta, większość zespołu rdzenia Reacta już tam nie pracuje, ale on sam ma dalej rozwijać Reacta w nowej firmie. Next.js eksperymentuje z Switchyard, serwerem w Go przed next start, który na razie tylko przekazuje żądania do Node, ale z czasem mógłby przejąć routing. TanStack Query v6 ma być małą wersją major: tylko ESM, minimum React 19, scheduler oparty na mikrozadaniach, usunięcie przestarzałych API, stabilne streamedQuery i rozważane usunięcie opcji enabled na rzecz skipToken. @ctrl/dom ma zastąpić jsdom w testach komponentów i przyspieszyć testy React Testing Library o 32 do 54 procent, ale wymaga Node 26 i Reacta 19.

W części mobilnej Reanimated 4.8 stabilizuje Shared Element Transitions, domyślnie włączone: dwa widoki z tym samym tagiem przechodzą jeden w drugi, także między zakładkami, a na iOS animacja podąża za palcem przy geście wstecz. Skia i WebGPU pobierają prebuilty podczas budowania, więc paczki npm nie zajmują już około gigabajta. Proponowany jest też RFC z rdzeniem React Native niezależnym od platformy. Poza Reactem: spotkanie TC39 w dniach 30 listopada do 3 grudnia może przesunąć Import Text do etapu 4, Node.js szykuje domyślną kompresję wskaźników z limitem sterty 4 GB, a Firefox 161 wprowadza random() w CSS. Pominąłem sponsorów, między innymi CodeRabbit, Sentry i Codemagic.

**Key takeaways:**
- Kampania React2STEAL wyciekła sekrety z co najmniej 1281 serwerów.
- Zaktualizuj React Router do 7.18.6 lub 8.5.2.
- TanStack Query v6 ma wymagać Reacta 19 i być tylko w ESM.
- Reanimated 4.8 ma stabilne Shared Element Transitions.
- Node.js planuje limit sterty 4 GB na wątek przy kompresji wskaźników.

**Why do I care:** Dwie rzeczy do zrobienia w tym tygodniu: sprawdzić wersje Reacta i Next.js w produkcji oraz rotować sekrety, jeśli była choćby wątpliwość. Informacja o ukrytych zależnościach przed npm audit pokazuje, że zielony raport nie jest dowodem bezpieczeństwa. Plan TanStack Query v6 z minimum Reacta 19 będzie bolał zespoły na starszych wersjach, więc warto planować migrację z wyprzedzeniem.

**Link:** [This Week In React #307](https://thisweekinreact.com)
