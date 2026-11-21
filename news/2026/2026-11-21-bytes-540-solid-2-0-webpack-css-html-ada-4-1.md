---
title: "Bytes #540: Solid 2.0 wychodzi z wersji RC, webpack dostaje wbudowane CSS i HTML"
excerpt: "Solid 2.0 jest już stabilny: bez SolidStart, z diagnostyką pisaną też z myślą o agentach, a do tego webpack, ada 4.1 i kilka narzędzi dla agentów."
publishedAt: "2026-11-20"
slug: "bytes-540-solid-2-0-webpack-css-html-ada-4-1"
hashtags: "#uidev #bytes #javascript #solidjs #webpack #nodejs #agents #generated #pl"
source_pattern: "ui.dev"
---

## Solid 2.0 jest gotowy

**TLDR:** Solid 2.0 trafił w tym tygodniu do stabilnej wersji po 23 kolejnych iteracjach od release candidate. Zespół porzucił meta-framework SolidStart, uprościł API i dołożył diagnostykę, którą może czytać agent.

**Summary:** Między wersją RC a finalną zwykle zmienia się niewiele, ale tu mówimy o frameworku, który po rozstaniu z Cursorem wyraźnie odzyskał tempo. Nowe funkcje asynchroniczne opisywał już numer 513 tego newslettera, więc tym razem nacisk idzie na to, co zmieniło się w strukturze projektu.

Najważniejsza i najmniej głośna zmiana to wygaszenie SolidStart. Funkcje serwerowe trafiły do rdzenia frameworka, a serwer deweloperski, renderowanie po stronie serwera i budowanie obsługuje wtyczka Vite dla Solida. Dzięki temu integracje, na przykład z Clerkiem czy Sentry, powinny być łatwiejsze do napisania i utrzymania. Zespół wyciął też sporo zbędnych API i zmniejszył powierzchnię frameworka.

Druga zmiana dotyczy komunikatów o błędach. Buildy deweloperskie zgłaszają błąd od razu, razem z miejscem jego wystąpienia i zalecaną poprawką, a do tego wskazują agentowi umiejętności, z których może skorzystać następnym razem. Obserwowalność dla agentów jest tu traktowana jak pełnoprawna cecha frameworka.

Są też dwa większe eksperymenty. ReactiveScript to nowy język kompilowany do Solida, który zamienia ostrzeżenia z czasu działania w błędy kompilacji. Reactive Server Components mają pojawić się w ciągu kilku tygodni i zamiast JSON-a wysyłają różnice w HTML-u.

**Key takeaways:**
- Solid 2.0 jest stabilny, a SolidStart został wygaszony na rzecz wtyczki Vite i funkcji serwerowych w rdzeniu.
- Błędy w trybie deweloperskim zawierają lokalizację, poprawkę i wskazówki dla agenta.
- Reactive Server Components mają wysyłać różnice HTML zamiast JSON-a.

**Why do I care:** Jeśli ktoś trzyma produkcję na SolidStarcie, to ta wiadomość wymaga planu migracji, a nie tylko entuzjazmu. Autor newslettera przemilcza koszt przejścia i to, ile bibliotek trzeciej strony zostanie w tyle. Podoba mi się za to pomysł, żeby komunikat błędu był projektowany także dla agenta. To wygląda na kierunek, który inne frameworki będą kopiować.

**Link:** [Solid 2.0: The Long Hold](https://www.solidjs.com/blog/solid-2-0-the-long-hold/)

## Cool Bits: webpack, ada 4.1 i narzędzia dla agentów

**TLDR:** Webpack ma teraz wbudowaną obsługę CSS i HTML. Do tego szybszy parser URL w Node.js, renderer Markdowna od zespołu Pierre i dwa narzędzia pilnujące reguł dla agentów.

**Summary:** Webpack dodał natywną obsługę CSS i HTML, co autor określa jako wiadomość, która byłaby świetna dziesięć lat temu. Lepiej późno niż wcale, ale dziś większość zespołów i tak siedzi na Vite albo na narzędziach opartych na Rust.

Zespół Pierre, świeżo po przejęciu przez OpenAI, wypuścił @pierre/words, strumieniowy renderer Markdowna, który ma być 17 razy szybszy od markdown-it. To ma sens przy czatach, gdzie tekst przychodzi kawałkami i trzeba go ciągle przerysowywać. Yagiz Nizipli wydał ada 4.1, parser URL używany w Node.js, który według autora jest dwa razy szybszy na prawdziwych adresach. Newsletter żartuje, że inne parsery pewnie testują się na wymyślonych.

shadcn opublikował linter Tailwinda zaprojektowany dla agentów, w którym zasady systemu projektowego zapisuje się tak, żeby agent mógł je sprawdzić. Vercel Labs pokazało emulator AI do CI i piaskownic offline, który odpowiada skryptowanymi, deterministycznymi, ale realistycznymi odpowiedziami. Wśród linków jest jeszcze tekst Willa Larsona o podejściu small-change do code review, tekst o tym, że wydajność jest częścią designu, i opis procesu rysowania ikon. Trzy pozycje na liście to materiały sponsorowane, więc je pomijam.

**Key takeaways:**
- Webpack ma wbudowane CSS i HTML.
- @pierre/words renderuje strumieniowy Markdown 17 razy szybciej niż markdown-it.
- ada 4.1 przyspiesza parsowanie prawdziwych URL-i dwukrotnie.

**Why do I care:** Dla frontendowca najciekawszy jest emulator AI i linter dla agentów, bo oba rozwiązują realny problem testowania aplikacji, w których odpowiedzi modelu są niedeterministyczne. Webpack bym zostawił w spokoju, chyba że macie stary projekt, w którym migracja nie ma sensu ekonomicznego.

**Link:** [Bytes #540](https://bytes.dev/archives/540)
