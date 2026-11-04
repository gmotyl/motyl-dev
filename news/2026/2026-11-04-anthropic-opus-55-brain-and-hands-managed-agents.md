---
title: "Jak Anthropic wypuszcza Opus 5.5: mózg oddzielony od rąk agenta"
excerpt: "Notatka do odcinka podcastu Latent Space z szefami inżynierii i produktu platformy Claude: premiera modelu jako premiera API, rozdzielenie harnessu od piaskownicy i agent, który pomaga innemu agentowi pamiętać."
publishedAt: "2026-10-27"
slug: "anthropic-opus-55-brain-and-hands-managed-agents"
hashtags: "#latent #ai #llm #agents #architecture #security #devtools #generated #pl"
source_pattern: "Latent Space"
---

## How Anthropic ships the #1 LLM in the world safely: separating the brain from the hands

**TLDR:** Latent Space rozmawia z Katelyn Lesse i Angelą Jiang, szefowymi inżynierii i produktu platformy Claude, o premierze Opus 5.5 i o architekturze Managed Agents. Najciekawszy jest podział na mózg, czyli sesję i harness, oraz ręce, czyli piaskownicę wykonującą kod.

**Summary:** Podstawą tego omówienia jest pisemne streszczenie odcinka, notatki i znaczniki czasu, a nie pełna transkrypcja, więc to, co poniżej, dotyczy tez z opisu, a nie szczegółów rozmowy. Autorzy zaczynają od prospektu emisyjnego Anthropic z poprzedniego dnia i od dwóch pętli, które firma wskazuje jako źródło efektywności, czyli pętli ulepszeń i inwestycji. Potem przechodzą do platformy dla programistów.

Pierwsza teza dotyczy tego, że premiera modelu jest zarazem premierą API. Opus 5.5 ma kosztować mniej niż poprzednik, choć dokładna oszczędność zależy od obciążenia i użycia kontekstu w cache, a wcześniejsze generacje Opusa krytykowano za gadatliwość. Mniej widoczna praca dotyczy integracji. Przykładem jest ochrona rozumowania modelu przed wydobyciem na potrzeby destylacji. Zachowywanie bloków myślenia między turami pomaga, ale nowy wymóg może zepsuć istniejący harness klienta. Programy wczesnego dostępu pozwalają klientom uruchamiać własne ewaluacje i zgłaszać nieoczekiwane zachowania, a wartością jest zobaczenie modelu w środowiskach, których własne produkty Anthropic nie obejmują.

Druga teza to rozdzielenie mózgu i rąk w Managed Agents. Dziennik sesji i harness są oddzielone od piaskownicy, w której wykonuje się kod. Harness może przetrwać, a środowisko wykonawcze jest tworzone na żądanie, więc awaria piaskownicy nie zabija całej sesji agenta. Daje to też właściwość bezpieczeństwa, bo jeśli wygenerowany kod działa w piaskownicy, która nigdy nie dostaje poświadczeń usługi, nie ma tam nic do odczytania. Poświadczenia trzymane są osobno i dołączane przez proxy, a ruch sieciowy z piaskownicy jest ograniczony. Goście mówią też, że wcześniejsze podejście, z całym agentem kodującym w piaskownicy za API, dodawało pracę przed pierwszą odpowiedzią i gubiło agenta razem z piaskownicą. Rozdzielenie pozwoliło poprawić opóźnienia i niezawodność.

Dalej jest pamięć. Funkcja nazwana dreaming to po prostu jeden agent przeglądający wcześniejszą pracę drugiego i zapisujący wspomnienia z powrotem, czyli wyższe zachowanie zbudowane z tych samych prymitywów. Opis planów jest ostrożny. Pamięć i uczenie pozostają ważne, ale zespół mówi, że więcej bieżącej uwagi poszło na bezpieczeństwo, bo premiery modeli stały się trudniejsze. Zaznaczono wprost, że wspomniane pomysły to plany, a nie obietnice. Na liście tematów w odcinku są też przepisanie API Messages w Rust, ograniczenia CPU przy skalowaniu, klasyfikatory bezpieczeństwa z routingiem modeli i walka z AI slop.

**Key takeaways:**

- Rozdzielenie harnessu od piaskownicy poprawia odporność na awarie, opóźnienia i bezpieczeństwo poświadczeń.
- Zmiany w API towarzyszące premierze modelu, takie jak zachowywanie bloków myślenia, mogą zepsuć istniejące integracje.
- Dreaming to agent czytający pracę innego agenta i zapisujący wnioski w pamięci.

**Why do I care:** Trzy pytania z tekstu można zastosować do każdego runtime'u agenta, także własnego. Co musi przetrwać, co wykonuje niezaufaną pracę i które sekrety w ogóle muszą być tam, gdzie działa kod. Moja uwaga jest krytyczna. To streszczenie jest napisane przez gospodarzy podcastu, którzy zachwycają się gośćmi, i nie ma w nim żadnej liczby o opóźnieniach ani niezawodności, więc "lepsze" jest tu deklaracją. Nie wiemy też, ile kosztuje utrzymanie proxy z poświadczeniami i osobnej piaskownicy w porównaniu z prostszym podejściem, a dla małego zespołu ta różnica może przesądzać o wyborze.

**Link:** [How Anthropic ships the #1 LLM in the World safely](https://lspace.beehiiv.com/p/opus55)
