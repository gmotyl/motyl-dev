---
title: "Muse Spark 1.3 dogania frontier, Stanford resetuje program studiów o inżynierii agentów"
excerpt: "AINews: Meta wypuszcza Muse Spark 1.3 z zapowiedzią open weights i wynikami zbliżonymi do GPT-5.6-Sol i Opusa 5, Stanford wymienia 85% programu kursu o inżynierii oprogramowania pod agentów, a Google ogłasza Gemini 3.8 Flash Cyber."
publishedAt: "2026-09-03"
slug: "ainews-muse-spark-13-stanford-agent-engineering-gemini-cyber"
hashtags: "#AINews #ai #agents #ml #generated #pl"
source_pattern: "AINews"
---

## Muse Spark 1.3 dogania frontier, Stanford resetuje program studiów o inżynierii agentów

**TLDR:** Meta wypuściła Muse Spark 1.3 z wynikami porównywalnymi do GPT-5.6-Sol i Opusa 5 oraz zapowiedzią udostępnienia wag, co według AINews potwierdza Meta Superintelligence jako nowe laboratorium na poziomie frontier. Równolegle Stanford ogłasza dwa nowe kursy budujące inżynierię agentów AI jako osobną dyscyplinę, a Google prezentuje wyspecjalizowany model cyberbezpieczeństwa Gemini 3.8 Flash Cyber.

**Summary:** Mark Zuckerberg ogłosił na X wdrożenie Muse Spark 1.3 jako "największy skok, jaki do tej pory zrobiliśmy" w zadaniach kodowania i pracy agentowej, z zapowiedzią udostępnienia wag modelu w niedalekiej przyszłości. Według AAII model trafił na trzecie miejsce na świecie, z wynikami zbliżonymi do GPT-5.6-Sol i Opusa 5 w benchmarkach agentowych, długokontekstowych i kodowania. Ceny są ustawione tak, że opcja treningowa daje ponad 90% zniżki, a społeczność zwraca uwagę na nietypowo wysoki wynik MRCR na kontekście 512k do 1M tokenów, sięgający 98,1%, co część komentujących odczytuje jako sygnał, że problem "context rot" na milionowych kontekstach może być bliższy rozwiązania, niż się wydawało.

Na poziomie edukacyjnym Stanford formalizuje inżynierię oprogramowania natywną dla AI jako osobną dyscyplinę. Nowa edycja kursu The Modern Software Developer wymienia 85% materiału z jesieni 2025 na tematy takie jak umiejętności agentów, context engineering, portale MCP, projektowanie kodu gotowego pod agenty, agentowy code review, bezpieczeństwo oraz równoległe agenty działające w tle, przy współpracy z partnerami takimi jak Browserbase, OpenHands, Semgrep czy Vercel. Drugi kurs, CS329Z: Engineering AI Agents, koncentruje się na budowaniu agentów od podstaw, co razem sugeruje przesunięcie akademickiej narracji od promptowania w stronę systemowego myślenia o harnessach, ewaluacji, pamięci i orkiestracji.

W obszarze architektury modeli krążące plotki o rzekomo przełomowej architekturze "Astra" od OpenAI, opisywanej jako looped transformer, zostały ostudzone przez analizę pokazującą, że ponowne użycie warstw transformera to stosunkowo skromna modyfikacja architektoniczna, znana wcześniej z modeli takich jak Nanbeige 4.2-3B, gdzie 22-warstwowy stos jest używany dwukrotnie. Kompromis jest prosty: podobny ślad pamięciowy, około dwukrotnie większe zużycie obliczeń i tylko częściowe zachowanie efektywności tokenowej względem standardowego stosu warstw.

Na froncie infrastruktury Google zaprezentował Gemini 3.8 Flash Cyber, wyspecjalizowany model cyberbezpieczeństwa z deklarowaną wydajnością na poziomie modelu Flash, osiągający 86,2% na CyberGym i ponad 70% skuteczności w wewnętrznym benchmarku wykrywania podatności w dwudziestu językach programowania. Równolegle deweloperzy zgłaszają frustrację słabą ergonomią narzędziową Google wokół harnessów i integracji, a także ryzykiem agresywnych banów kont powiązanych z jednym identyfikatorem Google, co może objąć zarówno Gmaila, jak i powiązane konto Google Cloud.

**Key takeaways:**
- Muse Spark 1.3 od Meta osiąga wyniki zbliżone do GPT-5.6-Sol i Opusa 5, z zapowiedzią udostępnienia wag modelu.
- Stanford wymienia 85% programu flagowego kursu o inżynierii oprogramowania na tematy związane z budową i utrzymaniem agentów AI.
- Plotki o przełomowej architekturze "Astra" od OpenAI zostały zweryfikowane jako stosunkowo skromna technika ponownego użycia warstw, znana już z mniejszych modeli open weights.

**Why do I care:** Zmiana programu na Stanfordzie jest ciekawsza niż sam wynik Muse Spark, bo pokazuje, dokąd zmierza definicja "umiejętności programistycznych" za rok czy dwa: nie chodzi już o pisanie kodu, tylko o projektowanie harnessów, ewaluacji i granic bezpieczeństwa dla agentów, które ten kod piszą za nas. Zespoły planujące długoterminowe ścieżki rozwoju dla juniorów powinny już dziś uwzględniać, że "context engineering" i "agentowy code review" mogą stać się realnymi kompetencjami rekrutacyjnymi szybciej, niż większość firm jest na to gotowa.

**Link:** [AINews: Muse Spark 1.3 matches GPT-5.6-Sol, confirming Meta Superintelligence as the newest Frontier Lab](https://www.latent.space/p/ainews-muse-spark-13-matches-gpt)
