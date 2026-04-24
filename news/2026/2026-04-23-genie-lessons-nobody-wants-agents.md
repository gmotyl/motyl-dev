---
title: "Genie Lessons: Nobody Wants Agents"
excerpt: "Autor eksperymentuje z multi-agent AI coding tools i dochodzi do wniosku: nikt nie chce agentów — ludzie chcą rezultatów, nie problemów koordynacji."
publishedAt: "2026-04-23"
slug: "genie-lessons-nobody-wants-agents"
hashtags: "#ai #agents #coding-tools #productivity #generated #pl"
source_pattern: "Substac"
---

## Genie Lessons: Nobody Wants Agents

**TLDR:** Autor używał Intent od Augment Code — multi-agent system z coordinator, implementer i verifier. Po sesji doszedł do wniosku: nikt nie chce agentów. Ludzie chcą outcomes, nie koordynacji. Zamiast "how do I prompt engineer my way to answer" ludzie chcą powiedzieć "oto wynik który chcę osiągnąć" i dostać odpowiedź czy to jest osiągalne.

**Summary:** W tej Genie Session autor pracował z Intent od Augment Code — system multi-agent z trzema komponentami: coordinator, implementer i verifier. Nazwał to "Freudian architecture": id (implementer) pędzi do przodu, superego (verifier) składa ręce, ego (coordinator) negocjuje. Trochę działa. Ale podczas obserwacji swarm'u, zauważył coś kluczowego: zarządzał nim. Sprawdzał który agent co robi, zastanawiał się kiedy przerwać, trzymał w głowie stan który system powinien trzymać za niego. Powiedział że chce czytelnego kodu, a w zamian dostał problem koordynacji. Mismatch jest taki: gdy pracował nad performance, chciał wiedzieć jak szybko można to zrobić, ile by to kosztowało, ile by to wymagało. Rezultaty. Nie chce prompt-engineerować swoją drogę do odpowiedzi. Chce opisać rezultat który chce osiągnąć i mieć genie powiedzieć czy to jest osiągalne i co by wymagało. "Nigdy nie udało mi się zmusić dwóch agentów do pracy na tym samym codebase w tym samym czasie bez eksplozji mojej głowy. Więc nie jestem przekonany że swarm jest odpowiedzią."

Multi-agent to feature. Outcome-orientation to to, co ten feature ma dostarczać. Ciągle mylimy te dwie rzeczy.

Inny front, nad którym nikt jeszcze nie pracuje: multiplayer. W tej chwili pięciu agentów może pracować na tym codebase jednocześnie. Pięć osób nie może. To jest na opak. Osoba która wymyśli real-time collaborative augmented development — gdzie wiele osób faktycznie razem steruje, nie tylko ogląda — ta osoba rozwiązuje prawdziwy problem. Nikt nie wie jak to wygląda. Ale autor jest pewny że to nie jest coordinator z finger guns.

**Key takeaways:**
- Multi-agent = feature, outcome-orientation = to co feature ma dostarczać
- Zarządzanie agentami to overhead — "to co chcę to rezultat, nie koordynacja"
- Pięciu agentów może, pięć osób nie może — to jest problem do rozwiązania
- Ktoś musi wymyślić real-time collaborative augmented development

**Why do I care:** To jest jedna z tych perspektyw, która rezonuje z moim doświadczeniem. Używam Cursor codziennie i zauważam ten sam pattern: im więcej agentów próbuje robić, tym więcej mental overhead mam jako developer. Chcę powiedzieć "zrób to" i dostać wynik, nie zarządzać trzema agentami którzy gubią kontekst. Co do multi-player augmentation — to jest głębokie. Rzeczywiście, pięć osób w VS Code na tym samym pliku to chaos, ale pięć agentów jakoś działa. Dlaczego? Bo agenci nie mają ego, nie kłócą się o styl, nie robią passive-aggressive comments. Rozwiązanie real-time collab nie będzie coordinatorem z finger guns — to na pewno. Pytanie brzmi: co to będzie?

**Link:** [Genie Lessons: Nobody Wants Agents](https://tidyfirst.substack.com/p/genie-lessons-nobody-wants-agents?publication_id=256838&post_id=194532436&play_audio=true&triedRedirect=true)