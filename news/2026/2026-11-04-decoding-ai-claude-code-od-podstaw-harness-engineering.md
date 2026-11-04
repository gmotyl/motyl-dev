---
title: "Claude Code od zera: darmowy kurs inżynierii harnessu w ośmiu krokach"
excerpt: "Decoding AI zebrało osiem lekcji budowy agenta kodującego w Pythonie, od pętli agenta po odtwarzanie nieudanych uruchomień."
publishedAt: "2026-11-04"
slug: "decoding-ai-claude-code-od-podstaw-harness-engineering"
hashtags: "#decodingai #ai #agents #llm #python #architecture #testing #generated #pl"
source_pattern: "Decoding AI"
---

## Claude Code od zera, czyli kurs harness engineeringu

**TLDR:** Open-source'owy kurs prowadzi przez budowę agenta Decode w ośmiu lekcjach, z sześcioma filmami i jednym repozytorium. Teza brzmi, że o jakości agenta decyduje otoczka wokół modelu, nie sam model.

**Summary:** Autor zaczyna od liczb. LangChain zmienił tylko harness i ich agent kodujący skoczył z 53 do 67 procent w Terminal-Bench, czyli z poza trzydziestki do piątki. Ramp ma według niego około połowy zmergowanych PR-ów z własnego harnessu. Kurs ma już ponad tysiąc gwiazdek na GitHubie.

Pierwsza lekcja to projekt. Sam agent to około dwudziestu linii kodu z Pydantic AI, a resztę stanowi harness, czyli sześć modułów, trzy interfejsy i warstwa ewaluacji. Druga buduje pętlę ReAct z dziewięcioma narzędziami i kolejką sterującą w terminalu. Trzecia to piaskownica w Dockerze lub na Modalu, bo agent kiedyś skasował autorowi połowę notatek. Czwarta uczy czterech technik zarządzania kontekstem, czyli pamięci, skilli, narzędzia LSP i kompakcji.

Piąta traktuje subagentów jako technikę kontekstową, bo sześciu równoległych badaczy zastąpiło jedną sesję czytającą dwieście plików. Szósta uruchamia agenta bez terminala, na Modalu, z wyzwalaczem przez CLI, webhook lub nocny cron. Siódma to własny benchmark. Autor porównał model 35B z 120B i mniejszy dostał 95 procent skuteczności, a większy 53. Ósma odtwarza nieudane uruchomienia w Kitaru po incydencie, w którym agent znalazł w pamięci klucz do Gemini i spalił tokeny przez noc.

W środku tekstu jest płatna wstawka sponsora, Inngest, którą pominąłem. Kurs trwa 4 do 8 godzin i działa bez GPU.

**Key takeaways:**
- Harness to sześć modułów, trzy interfejsy i warstwa ewaluacji pod spodem.
- Własny benchmark pokazał, że model 35B pokonał 120B wynikiem 95 do 53 procent.
- Regresje warto budować z nieudanych uruchomień produkcyjnych.

**Why do I care:** To ten sam wynik 95 do 53, który już opisywałem jako przykład w jednym z wcześniejszych numerów, więc autor chętnie cytuje samego siebie. Czysto praktycznie kurs jest dobrym materiałem dla architekta, który ma decyzję, czy kupować gotowego agenta, czy składać własnego. Brakuje tu kosztu utrzymania takiego harnessu w zespole i tego, kiedy gotowe narzędzie po prostu wystarczy.

**Link:** [Harness Engineering Roadmap: Claude Code From First Principles](https://www.decodingai.com/p/claude-code-from-scratch-harness-engineering-roadmap)
