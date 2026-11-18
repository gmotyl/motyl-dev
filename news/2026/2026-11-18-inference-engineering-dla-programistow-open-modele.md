---
title: "Inference engineering dla programistów: jak przejść z API frontier labów na modele open"
excerpt: "Pragmatic Engineer opisuje, kiedy i jak przejść z API frontier labów na otwarte modele u dostawców inferencji takich jak Modal, Fireworks i Baseten."
publishedAt: "2026-11-17"
slug: "inference-engineering-dla-programistow-open-modele"
hashtags: "#pragmatic-engineer #ai #llm #architecture #performance #devops #engineering #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Inference engineering dla inżynierów oprogramowania

**TLDR:** Firmy tną koszty AI, przechodząc na otwarte modele: Uber obniżył koszt za token o około 50 procent, Pinterest o 90, a AT&T o 56. Artykuł opisuje, jak to zrobić, na podstawie rozmów z Modal, Fireworks AI i Baseten.

**Summary:** Są dwie drogi. Można kupić własne GPU, jak Revolut z 56 jednostkami B200, co wymaga dużo pracy, ale potem jest najtaniej. Większość firm woli dostawcę inferencji, który ma flotę GPU i hostuje modele open weight. Dostawcy nie trenują własnych modeli frontier, bo pojedynczy pretraining kosztuje miliony dolarów, a konkurują ceną, dedykowanym sprzętem, wydajnością i dostosowaniem. Modal stawia na programowalną infrastrukturę przez SDK i open source, Fireworks na specjalizowane wdrożenia z fine-tuningiem, a Baseten na kompletną platformę do budowania agentów. Fireworks pokazał też model Ember-1, doszkolony na Kimi K3, który zużywa o 40 procent mniej tokenów rozumowania.

Powody przejścia to koszt, kontrola i personalizacja. Najczęściej chodzi o koszt: droższy model bywa niepotrzebny dla prostych zapytań, więc inteligentny router wysyła je do tańszego. Dostawcy oferują API zgodne z OpenAI i Anthropic, więc zmiana to często podmiana adresu. Kontrola dotyczy opóźnień i dostępności, bo deklarowany uptime Anthropic to 99,5 procent, a OpenAI 99,97 dla API i 99,2 dla ChatGPT, daleko od czterech dziewiątek, których oczekuje się od chmury. Spadki wydajności nie liczą się jako przestój, a w modelu współdzielonym nie masz jak ich ominąć. Około 10 procent klientów Modala idzie dalej, w fine-tuning.

Przy wyborze modelu kluczowe są własne ewaluacje. Satya Nadella mówi w podcaście, że prywatne ewaluacje będą ważnym elementem własności intelektualnej firm. Według Artificial Analysis średni koszt zadania na Sonnet 5.5 to 5,46 dolara, a na Kimi K3 około dwóch dolarów, czyli około 60 procent taniej, ale liczy się koszt zadania, nie tokena. Dostawcy różnią się też długością kontekstu, kwantyzacją i domyślną temperaturą. Dalej artykuł opisuje dwa etapy: najpierw wymiana API na współdzielone, potem dedykowane GPU z doborem rozmiaru modelu, KV cache, failoverem i dekodowaniem spekulatywnym.

**Key takeaways:**
- Router dobierający model do zadania to najprostszy sposób na cięcie kosztów.
- Porównuj koszt zadania, nie koszt tokena.
- Bez własnego zestawu ewaluacji nie wiesz, czy tańszy model wystarcza.
- Dedykowane GPU opłacają się dopiero po przekroczeniu limitów współdzielonego API.

**Why do I care:** To temat, który z backendu wchodzi do pracy każdego, kto buduje funkcje na LLM-ach. Największy wniosek: bez eval setu nie podejmiecie decyzji, a prywatne ewaluacje to dziś realny zasób. Uwaga na to, że artykuł opiera się na trzech dostawcach, więc perspektywa jest nieco stronnicza w stronę zewnętrznej inferencji. O kosztach operacyjnych własnego zespołu infrastrukturalnego mówi niewiele.

**Link:** [Inference engineering for software engineers](https://newsletter.pragmaticengineer.com/p/inference-engineering-for-software-engineers)
