---
title: "Andrew Ng definiuje cztery umiejętności AI Engineeringu, a harness okazuje się ważniejszy niż model"
excerpt: "Latent Space rozkłada relaunch DeepLearning.AI wokół AI Engineeringu na cztery konkretne umiejętności zdefiniowane przez Andrew Nga, oraz zbiera dowody na to, że jakość harnessu agenta coraz częściej decyduje o realnej użyteczności modelu bardziej niż sam model."
publishedAt: "2026-08-25"
slug: "ainews-andrew-ng-ai-engineering-skills-agent-harnesses"
hashtags: "#AINews #ai #agents #llm #engineering #generated #pl"
source_pattern: "AINews"
---

## Andrew Ng definiuje AI Engineering na nowo: cztery umiejętności, nie jedna specjalizacja

**TLDR:** Andrew Ng, współzałożyciel Google Brain i Coursery, relaunchuje DeepLearning.AI wokół AI Engineeringu na bazie analizy ponad 10 tysięcy ofert pracy i dziesiątek wywiadów strukturalnych, definiując cztery umiejętności: budowanie i wdrażanie aplikacji AI, fundamenty inżynierii oprogramowania, efektywne korzystanie z agentów kodujących oraz kształtowanie samego procesu budowy produktu.

**Summary:** To, co odróżnia ten ruch od kolejnego kursu online, to metoda: analiza ponad 10 tysięcy ofert pracy, dziesiątki ustrukturyzowanych wywiadów z ekspertami AI, menedżerami rekrutacji i rekruterami, plus ankiety i dane online. Wniosek Nga jest taki, że "umiejętności AI Engineeringu" dotyczą znacznie szerszej grupy niż osoby z tytułem "AI Engineer" w wizytówce, co pokrywa się z tym, co obserwuje się w praktyce: granice między rolami rozmywają się szybciej, niż nadążają za tym opisy stanowisk.

Pierwsza umiejętność, budowanie i wdrażanie aplikacji AI, obejmuje rozumienie LLM-ów, context engineeringu, RAG i workflow agentowych, ale kluczowe jest tu użycie technik statystycznych do mierzenia, sterowania i nadzorowania zachowania systemów AI, czyli zdyscyplinowane pętle ewaluacji i analizy błędów, a nie tylko umiejętność wywołania API modelu. Druga, fundamenty inżynierii oprogramowania, jest argumentowana wprost jako obrona przed "vibe codingiem": zrozumienie kompromisów architektonicznych pozwala rozpoznać, kiedy agent kodujący podejmuje złe decyzje, bo nie dostał wystarczającego kontekstu, żeby podjąć dobre. Trzecia, efektywne korzystanie z agentów kodujących, to już nie opcjonalna umiejętność, tylko rdzeń pracy każdego developera: wiedzieć, kiedy interweniować, a kiedy zostawić agenta samemu sobie, jak orkiestrować wiele agentów jednocześnie i jak unikać scenariuszy, w których agent psuje bazę produkcyjną. Czwarta, kształtowanie samego buildu, to umiejętność produktowa: rozumienie kontekstu biznesowego na tyle, żeby wiedzieć, kiedy szybko zbudować MVP do testów z użytkownikami, a kiedy zwolnić i zbudować coś solidniejszego.

**Key takeaways:**
- Cztery umiejętności AI Engineeringu według Andrew Nga: budowanie i wdrażanie aplikacji AI, fundamenty inżynierii oprogramowania, efektywne korzystanie z agentów kodujących, kształtowanie buildu produktowego.
- Metodologia opiera się na analizie ponad 10 tysięcy ofert pracy oraz dziesiątkach wywiadów z ekspertami, menedżerami rekrutacji i rekruterami.
- Umiejętności te dotyczą znacznie szerszej grupy zawodowej niż tylko osób z tytułem "AI Engineer".
- Trzecia umiejętność (praca z agentami kodującymi) jest opisana jako rdzeń pracy każdego developera, nie dodatek.

**Why do I care:** Druga umiejętność, fundamenty inżynierii oprogramowania jako obrona przed złymi decyzjami agenta, to dokładnie to, co widzę w praktyce przy code review kodu wygenerowanego przez agentów: różnica między dobrym a słabym wynikiem rzadko leży w promptcie, prawie zawsze w tym, czy osoba prowadząca sesję rozumiała kompromisy architektoniczne na tyle, żeby zauważyć złą decyzję zanim trafiła do PR-a. To potwierdza coś, co powtarzam od dawna: agenci kodujący podnoszą sufit dla doświadczonych inżynierów bardziej, niż podnoszą podłogę dla początkujących, bo do skutecznego nadzorowania agenta i tak trzeba wiedzieć, jak wygląda dobry kod. Warto to potraktować jako argument w rozmowie o programach szkoleniowych w zespole: inwestycja w fundamenty inżynierskie nie traci na wartości w erze agentów, zyskuje na wartości.

**Link:** [AI News for 8/22/2026-8/24/2026](https://www.latent.space/p/ainews-andrew-ng-gets-into-ai-engineering)

---

## Harness bije model: dlaczego ten sam Qwen3.8 raz zawodzi, a raz buduje działający renderer oceanu

**TLDR:** Kilka wątków z ostatnich dni zbiega się w jednym wniosku: jakość harnessu agenta, czyli narzędzi, pętli feedbacku i sposobu wykonania, coraz częściej decyduje o obserwowanej użyteczności modelu bardziej niż sam model, co potwierdza test NVIDII pokazujący brak korelacji między statycznymi kontrolami umiejętności agenta a oceną jakości (Spearman ρ = 0.14).

**Summary:** Najbardziej konkretną ilustracją tego zjawiska jest anegdota o Qwen3.8-27B próbującym wyrenderować scenę oceanu w C#/OpenGL. Pod VS Code Copilot model dał czarny ekran i porażkę. Pod alternatywnym harnessem z feedbackiem ze zrzutów ekranu ten sam model, ten sam prompt, wygenerował działający render z falami, niebem, słońcem i widokiem podwodnym w około godzinę na RTX 5090, przy okazji samodzielnie pisząc dekoder PNG, mimo że wsparcie dla obrazów nie było włączone. Autor oryginalnej krytyki Qwena publicznie przyznał, że wcześniejszy wniosek był błędny, i zaczął testować ponownie z lepszym harnessem.

Drugi wątek dotyczy portowania 39-tysięcy linii kodu C do pojedynczego pliku HTML z Three.js: Claude Code z Opus 5 dał "okej" wynik w 21 minut, podczas gdy lokalny Qwen3.8:27B przez różne harnesse potrzebował od 1 godziny 40 minut do ponad 4 godzin i dał wynik oceniony jako zły. Komentujący słusznie zwrócili uwagę, że bezpośrednie polecenie "przekonwertuj ten kod" skłania modele do reinterpretacji zachowania zamiast jego zachowania, i że bardziej niezawodny pipeline to najpierw wygenerować transpiler, potem iteracyjnie przepisywać funkcja po funkcji, porównując zachowanie na poziomie pikseli albo rejestrów. Do tego dochodzi formalny research NVIDII (Spearman ρ = 0.14 między statycznymi kontrolami "skilli" agenta a osądzoną jakością) proponujący metrykę "Skill Lift", czyli mierzenie różnicy wykonanej pracy z danym skillem i bez niego w identycznych warunkach, zamiast punktowania samej obecności umiejętności.

**Key takeaways:**
- Ten sam Qwen3.8-27B zawiódł pod VS Code Copilot, ale zbudował działający render 3D pod harnessem z feedbackiem ze zrzutów ekranu.
- Przy portowaniu 39k linii kodu C do HTML/Three.js Claude Code z Opus 5 wygrał czasowo i jakościowo z lokalnym Qwen3.8 pod kilkoma harnessami.
- Bezpośrednie "przekonwertuj ten kod" prowadzi modele do reinterpretacji zachowania; transpiler plus iteracyjne przepisywanie funkcja po funkcji z weryfikacją pikselową działa lepiej.
- NVIDIA proponuje metrykę Skill Lift (różnica wykonanej pracy z danym skillem i bez niego) zamiast statycznych kontroli obecności umiejętności, bo te korelują z jakością na poziomie zaledwie ρ = 0.14.

**Why do I care:** To jest praktyczna, sprawdzalna lekcja dla każdego, kto ocenia model na podstawie jednego nieudanego testu w domyślnym środowisku: zanim ogłosimy "ten model jest słaby", warto sprawdzić, czy problem nie leży w harnessie, a nie w modelu. W praktyce zespołowej to przekłada się na konkretną rekomendację: inwestycja w lepszą pętlę feedbacku dla agenta (zrzuty ekranu, testy behawioralne, iteracyjna weryfikacja) często daje większy zwrot niż zmiana dostawcy modelu na droższy. To też podważa sens prostych rankingów modeli bez podania harnessu, w jakim były testowane, bo jak pokazuje ten przykład, ten sam model w dwóch harnessach może wypaść jak dwa zupełnie różne narzędzia.

**Link:** [AI News for 8/22/2026-8/24/2026](https://www.latent.space/p/ainews-andrew-ng-gets-into-ai-engineering)
