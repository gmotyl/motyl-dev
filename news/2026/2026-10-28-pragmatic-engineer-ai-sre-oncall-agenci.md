---
title: "Pragmatic Engineer: AI SRE, czyli jak agenci zmieniają dyżury on-call i czy to działa"
excerpt: "Przegląd narzędzi AI SRE od Rootly, incident.io i ResolveAI oraz rozwiązań własnych firm takich jak OpenAI, Stripe, Google i Monzo."
publishedAt: "2026-10-28"
slug: "pragmatic-engineer-ai-sre-oncall-agenci"
hashtags: "#pragmaticengineer #ai #agents #devops #observability #architecture #generated #pl"
source_pattern: "Pragmatic engineer"
---

## AI SRE: co to jest, jak zmieni on-call i czy działa

**TLDR:** Liczba deployów rośnie przez agentów AI, więc rośnie liczba incydentów i stron dla dyżurnych. Narzędzia AI SRE przyspieszają głównie fazę badania incydentu. W pełni autonomiczni agenci z konferencyjnych demo nadal nie istnieją.

**Summary:** Autor wraca do pokazu Azure SRE Agent z konferencji BUILD w 2025, w którym agent sam znajdował przyczynę i wdrażał poprawkę. Wtedy wydawało mu się to sztuczne. Teraz temat wraca, bo OpenAI zbudowało bota Sevbot, a ING pracuje nad własnym rozwiązaniem. Powód jest prosty i da się go zapisać prostą matematyką: wskaźnik incydentów to liczba zmian razy prawdopodobieństwo, że pojedyncza zmiana zepsuje system. Liczba PR-ów w większości firm podwoiła się w rok, a dane Rootly pokazują, że strony poza godzinami pracy prawie się podwoiły.

Nazwa AI SRE nie podoba się nikomu, także dostawcom, bo inżynier SRE robi znacznie więcej niż obsługa alertów. Narzędzia pomagają głównie po wystrzeleniu alertu: czytają szczegóły alertu, dashboardy, runbooki i logi. Orkiestrator incident.io działa jak dyżurny otwierający osiem kart naraz. Główny agent rozdziela pracę podagentom, a inżynierowie sterują nimi w Slacku lub Teams. Dobrze, gdy dyżurny dołącza do kanału około pięć minut po alercie i ma gotowe podsumowanie.

Dużo mówi się o zaufaniu. Agent potrzebuje dostępu do telemetrii, logów i repozytorium kodu, więc firmy średnie i większe często budują własne narzędzia. Autor jednak przewiduje, że wyspecjalizowani dostawcy będą lepsi, bo to ich jedyny produkt, a w dużej firmie to boczny projekt, z którego inżynierowie wychodzą po kilku miesiącach.

Ciekawa jest historia ResolveAI, które zbudowało trzy architektury w dwa lata. Najpierw był skryptowy pipeline, który nie radził sobie z incydentami spoza scenariusza. Potem pojedynczy agent z grafem wiedzy, który miał rozpad kontekstu, samopotwierdzanie pierwszej hipotezy i brak pamięci. Obecnie są trzy role: badacz, weryfikator niezależny strukturalnie od badaczy oraz komunikator. Dostawcy różnią się w kwestii poprawek kodu. incident.io przekazuje kontekst agentom programistów, ResolveAI pisze proste PR-y sam, a Rootly dąży do automatycznego scalania po ocenie przez drugiego agenta, przy czym dziś każdy PR wymaga akceptacji człowieka.

**Key takeaways:**
- Więcej zmian oznacza więcej incydentów, więc inwestycja w narzędzia on-call ma sens.
- Narzędzia skupiają się na badaniu incydentu, a decyzje zostają po stronie inżynierów.
- Niezależny weryfikator ogranicza samopotwierdzanie hipotez agenta.
- Warstwa kontekstu z grafem wiedzy, pamięcią i narzędziami to wspólny element wszystkich rozwiązań.
- Pełna autonomia jest wciąż pokazowa, za to agenci filtrujący strony są coraz częstsi.

**Why do I care:** To artykuł głównie dla zespołów platformowych i SRE, ale frontendowcy na dyżurach też dostaną więcej stron, skoro kod produkują agenci. Zauważyłem, że autor jest inwestorem w incident.io i sam to zaznacza, co warto pamiętać przy ocenie rankingów. Brakuje mi twardych danych o dokładności, bo przyznaje, że mierzenie jej jest trudne. Przy okazji ostrzega przed utratą umiejętności dyżurnych, więc symulacje incydentów brzmią rozsądnie.

**Link:** [AI SRE: what is it, how could it change on-call – and does it work?](https://newsletter.pragmaticengineer.com/p/ai-sre?publication_id=458709&post_id=222356349&isFreemail=true&triedRedirect=true)
