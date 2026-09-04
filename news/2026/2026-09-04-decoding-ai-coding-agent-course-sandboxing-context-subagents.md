---
title: "Pętla agenta to była łatwa część: sandboxing, context engineering i subagenty"
excerpt: "Decoding AI publikuje trzy nowe lekcje kursu o budowie agenta kodującego od zera: izolację narzędzi w sandboksie, inżynierię okna kontekstu i delegowanie pracy do subagentów, których kontekst nie sięga do agenta głównego."
publishedAt: "2026-09-04"
slug: "decoding-ai-coding-agent-course-sandboxing-context-subagents"
hashtags: "#decodingai #ai #agents #architecture #generated #pl"
source_pattern: "Decoding AI"
---

## Pętla agenta to była łatwa część

**TLDR:** Paul Iusztin publikuje trzy nowe lekcje kursu "Building a Coding Agent From Scratch": izolację narzędzi agenta w sandboksie, inżynierię okna kontekstu i subagentów jako sposób na oddelegowanie pracy bez przenoszenia jej kontekstu do agenta głównego.

**Summary:** Punktem wyjścia dla lekcji o sandboksingu jest osobiste doświadczenie autora: Claude Code skasował mu połowę notatek, a wnioskiem nie jest ściślejszy nadzór, tylko granica wykonania. Interfejs executora podmienia lokalny runner na Dockera albo Modal, przy czym Modal uruchamia gVisor w sandboksach startujących w mniej niż 500 milisekund. Realny rozstrzygający wybór architektoniczny to nie "czy używać sandboksa", tylko czy izolować cały harness, czy tylko narzędzia, które uruchamia.

Lekcja o inżynierii kontekstu opisuje cztery dźwignie kontrolujące to, co zostaje w oknie kontekstu. AGENTS.md jest trzymany poniżej 300 linii, a automatycznie ekstraktowany .decode/MEMORY.md ograniczony do 200 linii. Skille są ujawniane w trzech warstwach, a narzędzie o nazwie ty odpowiada na zapytania o symbole przez JSON-RPC zamiast zmuszać agenta do zgadywania. Mikrokompaktowanie uruchamia się przy zapełnieniu 60% okna, pełne kompaktowanie przy 80%: kompaktowanie jest tu granicą, którą się projektuje, nie ścianą, w którą się uderza.

Trzecia lekcja przedstawia subagentów jako formę inżynierii kontekstu, nie jako "mądrzejszy model": to drugi kontekst okna, którego nie trzeba czytać. Jedno wywołanie agent() rozgałęzia się na N dzieci, cztery działające naraz pod asyncio.Semaphore(4), z których każde zwraca jeden raport ograniczony do współdzielonego limitu 16 tysięcy bajtów. Agent nadrzędny otrzymuje raporty, nie pełne transkrypty, co jest właśnie mechanizmem oszczędzania kontekstu.

Do tego dochodzi materiał wideo pokazujący całą architekturę harnessu end-to-end, zbudowaną na miesiącach researchu nad tym, jak działają Claude Code, OpenCode i Pi pod maską: pętla agenta, pięć modułów harnessu wokół niej i dwa tryby interfejsu na wierzchu. Autor zapowiada, że w kolejnych tygodniach dokończy ostatnie trzy lekcje kursu, obejmujące tryb zdalny bez interfejsu graficznego i ewaluacje, plus dwie kolejne lekcje wideo i nowy case study dla Opika.

**Key takeaways:**
- Sandboksing: kluczowy wybór architektoniczny to izolacja całego harnessu versus izolacja tylko narzędzi, które on uruchamia.
- Zarządzanie kontekstem opiera się na czterech dźwigniach: limitach AGENTS.md i MEMORY.md, warstwowym ujawnianiu skilli, JSON-RPC do lookupu symboli i progach mikro/pełnego kompaktowania (60%/80%).
- Subagenci to mechanizm inżynierii kontekstu: agent nadrzędny widzi tylko skondensowane raporty, nie pełne transkrypty pracy dzieci.

**Why do I care:** Te trzy tematy to dokładnie te elementy architektury agenta, które najczęściej pomija się w pierwszej wersji, a które decydują o tym, czy agent nadaje się do produkcji, czy tylko do dema. Konkretne liczby progów (300 linii AGENTS.md, kompaktowanie przy 60/80%, limit 16 kB na raport subagenta) są na tyle precyzyjne, że warto je potraktować jako punkt startowy do kalibracji własnego systemu, zamiast projektować te limity metodą prób i błędów od zera.

**Link:** [Lesson 3: From a Raw Shell to a Sandboxed Coding Agent](https://substack.com/redirect/1238479c-7412-435f-a4a1-abad4aed95b1?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)
