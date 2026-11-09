---
title: "Latent Space: jak Stanford uczy inżynierii AI-native, Mihail Eric i agenci w Monaco"
excerpt: "Rozmowa o kursie CS146S, pracy domowej opartej na wkładzie do open source oraz zasadzie „kupuj, żeby się uczyć, buduj, żeby zatrzymać”."
publishedAt: "2026-11-09"
slug: "latent-space-stanford-ai-native-engineering-mihail-eric-monaco"
hashtags: "#latent #ai #agents #engineering #career #teams #devtools #generated #pl"
source_pattern: "Latent Space"
---

## Jak Stanford uczy inżynierii AI-native

**TLDR:** Mihail Eric prowadzi na Stanfordzie kurs The Modern Software Developer (CS146S) i kieruje AI w Monaco, gdzie agenci kodujący piszą kod i badają awarie. Rozmowa sprawdza, które elementy sylabusa przetrwały zderzenie z praktyką zespołu.

**Summary:** Pierwsza edycja miała dziewięć zadań i projekt końcowy. W jednym z nich studenci uruchamiali AI do przeglądu kodu na repozytorium i oceniali jego uwagi. W kolejnej edycji okazało się, że wiele ćwiczeń da się rozwiązać jednym promptem, a wszyscy ankietowani studenci drugiego i trzeciego roku już używali agenta. Dlatego część pracy domowej polega teraz na wkładzie do projektu open source, a łatkę recenzuje opiekun repozytorium. Prowadzący podkreśla, że agent zaimplementuje funkcję w popołudnie, ale i tak trzeba ustalić, czy opiekun jej chce, dlaczego kod działa tak, a nie inaczej, i co łatka może zepsuć. Taka rozmowa jest też sposobem, w jaki junior uczy się od seniora.

W odcinku pada ćwiczenie do przejęcia: umiejętność explain-diff Geoffreya Litta zamienia zmianę w wizualne omówienie, a potem odpytuje z niego. Warto ją wypróbować na łatce, którą właśnie napisał agent, i zobaczyć, na które pytanie trzeba wrócić do kodu.

**Key takeaways:**
- Zadania łatwe do rozwiązania jednym promptem przestają uczyć.
- Recenzja przez opiekuna repozytorium uczy kontekstu, nie tylko kodowania.
- Wizualne omówienie diffu z quizem pokazuje, czy naprawdę rozumiesz zmianę.

**Why do I care:** Pytanie, czego uczyć juniorów, dotyczy każdego zespołu. Odpowiedź z kursu jest praktyczna: ucz przez kontakt z ludźmi, którzy decydują, co trafia do projektu.

**Link:** [How Stanford Teaches AI-Native Engineering — Mihail Eric, Monaco](https://www.latent.space/)

## Monaco: kupuj, żeby się uczyć, buduj, żeby zatrzymać

**TLDR:** Monaco oceniło produkty do przeglądu kodu i zostało przy Devin, ale własne przestrzenie robocze dla agentów zbudowało samo. Zasada Mihaila: „Kupujesz, żeby się uczyć, a budujesz, żeby zatrzymać”.

**Summary:** Agent działający w tle potrzebuje miejsca, w którym uruchomi produkt, odtworzy błąd i przetestuje łatkę. Szczegóły zależą od konfiguracji chmury Monaco, więc zespół zbudował takie środowiska sam. Jednym z wyników jest Hal: inżynier prosi go o zbadanie awarii i otwarcie PR, a przedstawiciel handlowy pyta ten sam system, jak działa produkt. W pierwszym przypadku użyteczną odpowiedzią jest zmiana do przeglądu, w drugim wyjaśnienie dla klienta.

Prowadzący pyta, co dzieje się na drugim końcu PR. Agent widzi obecny kod, ale gdzie ma sprawdzić, dlaczego zespół odrzucił tę samą zmianę pół roku temu? Prowadzi to do Authority Map od Basis i do prognozy, że repozytoria open source staną się fabrykami oprogramowania prowadzonymi przez agentów. W notatkach pojawia się też badanie Faros: zespoły z wysoką adopcją AI scaliły o 98 procent więcej PR, a czas przeglądu wydłużył się o 91 procent. Ktoś nadal musi decydować, która zmiana należy do projektu.

**Key takeaways:**
- Agenci w tle potrzebują własnego środowiska do uruchamiania i testowania.
- Intencja i historia decyzji są dla agenta trudniejsze do znalezienia niż kod.
- Przegląd kodu staje się wąskim gardłem przy wysokiej adopcji AI.

**Why do I care:** Dane z badania Faros pasują do tego, co widać w zespołach: kod powstaje szybciej, a przegląd nie nadąża. Zanim kupisz kolejne narzędzie, zdecyduj, które środowisko agentów musisz mieć u siebie.

**Link:** [How Stanford Teaches AI-Native Engineering — Mihail Eric, Monaco](https://www.latent.space/)
