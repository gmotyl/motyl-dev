---
title: "Recenzja kodu przez GLM-5.2 jest tak dobra, jak dobry jest Twój prompt"
excerpt: "Kilo przeprowadziło kontrolowany eksperyment sprawdzając, jak model GLM-5.2 radzi sobie z recenzją kodu — wyniki zależą bardziej od sformułowania pytania niż od mocy obliczeniowej."
publishedAt: "2026-06-26"
slug: "glm-52-code-review-prompt-quality"
hashtags: "#kilo #ai #agents #codereview #llm #glm #generated #pl"
source_pattern: "Kilo"
---

## GLM-5.2's Code Reviews Are Only as Good as Your Prompt

**TLDR:** Zespół Kilo przeprowadził kontrolowany eksperyment z modelem GLM-5.2 od Z.ai, sprawdzając jakość recenzji kodu przy różnych poziomach rozumowania i różnych sformułowaniach promptów. Okazało się, że wording prompta wpływa na wyniki bardziej niż intensywność rozumowania. Model świetnie radzi sobie z lokalnymi błędami w pojedynczych funkcjach, ale konsekwentnie przegapia problemy wymagające zrozumienia całego systemu.

**Summary:**

Kilo od pewnego czasu używa GLM-5.2 jako swojego codziennego modela i postanowiło zbadać coś, o czym rzadko się mówi — jak bardzo waha się jakość recenzji kodu generowanych przez ten model. Zbudowali małe backendowe API w TypeScript, używając Bun, Hono, Drizzle i SQLite, a następnie celowo zasadzili w nim błędy. Zestaw testów służył jako punkt odniesienia — bug był uznany za znaleziony tylko wtedy, gdy agent wskazał konkretny, rzeczywisty problem.

Eksperyment podzielono na dwie rundy. Pierwsza obejmowała prostszy kod z szesnastoma zasadzonymi błędami, w tym SQL injection, zwracaniem haseł w odpowiedziach, brakującą autoryzacją i podatnościami CSV injection. W tej rundzie GLM-5.2 wypadł imponująco — niezależnie od sformułowania promptu czy poziomu rozumowania, model łapał od 13 do 15 z 16 błędów. Przy prostym, dobrze zorganizowanym kodzie GLM-5.2 recenzuje na poziomie frontier.

Druga runda była znacznie trudniejsza. Kilo rozbudowało projekt o miękkie usuwanie rekordów, archiwizację, optymistyczną współbieżność z numerem wersji, maszynę stanów dla zadań i dziennik audytu. Następnie zasadzono 10 subtelnych błędów — takich, których żaden skaner nie oznaczy. Większość wymagała rozumienia tego, co dana funkcjonalność powinna robić jako całość. I tu zaczęły się schody. GLM-5.2 radził sobie dobrze z błędami lokalnymi — odwróconym sprawdzaniem wersji, strażnikiem uprawnień który nigdy nie mógł się aktywować, czy błędnym aktorem w logu audytu. Ale konsekwentnie przegapiał cross-route bugs, czyli błędy, w których zarchiwizowane zadania przebijały się do normalnych widoków, eksportów i listy przeterminowanych — bo żadna pojedyncza linia kodu tego nie mówiła. Żeby to zauważyć, trzeba trzymać cały system w głowie.

Co ciekawe, framing prompta miał większy wpływ na wyniki niż poziom rozumowania modelu. Surowy prompt "zablokuj lub zatwierdź ten PR produkcyjny" okazał się gorszy od promptu skupionego na spójności zachowania — bo ten pierwszy kierował GLM-5.2 w stronę bezpieczeństwa i twardowania systemu, z dala od zasadzonych błędów produktowych. GPT-5.5 i Opus 4.8 wypadły lepiej na trudniejszym zbiorze — GPT-5.5 od razu stworzył tabelę pokazującą, które endpointy filtrują usunięte i zarchiwizowane wiersze, a które nie. Opus 4.8 był jedynym modelem, który sformułował dokładną zasadę dotyczącą błędu "reopen finished task", a nie tylko jej przybliżenie.

**Key takeaways:**
- Sformułowanie prompta wpływa na jakość recenzji GLM-5.2 bardziej niż poziom rozumowania — zamiast generycznego "bądź surowy", lepiej poprosić o sprawdzenie spójności zachowania między endpointami
- GLM-5.2 jest mocny w lokalnych błędach (bezpieczeństwo, logika w jednej funkcji), ale nierzetelny przy cross-route rules wymagających globalnego rozumienia systemu
- Najlepszy pojedynczy wynik GLM-5.2 to 7/10 — jeden mniej niż Opus 4.8 i dwa mniej niż GPT-5.5 — ale nieprzewidywalność między przebiegami to problem, którego frontier modele nie mają

**Why do I care:**

Jako senior developer widzę tutaj coś, o czym artykuł mówi półgębkiem — problem nie dotyczy tylko GLM-5.2. Większość modeli, w tym tych droższych, ma ten sam słaby punkt: rozumienie wynikające z kontekstu rozproszonego po całym systemie. Kilo przeprowadziło uczciwy eksperyment i pokazało lukę między "znajdź błąd w jednej funkcji" a "zrozum, co system ma robić jako całość". To drugie to właśnie ta trudna część inżynierii oprogramowania, którą senior developerzy spędzają lata na opanowaniu. Martwi mnie, że branża zachowuje się tak, jakby ta luka była tylko kwestią lepszego prompta lub więcej reasoning tokens. Nie jest. To kwestia reprezentacji wiedzy o systemie — i ani GLM-5.2, ani żaden inny model nie zastąpi architekta, który tę wiedzę ma w głowie. Używajcie AI do recenzji kodu, ale nie oddawajcie mu odpowiedzialności za decyzje systemowe.

**Link:** [GLM-5.2's Code Reviews Are Only as Good as Your Prompt](https://blog.kilo.ai/p/glm-52s-code-reviews-are-only-as?publication_id=4363009&post_id=203681546&isFreemail=true&triedRedirect=true)
