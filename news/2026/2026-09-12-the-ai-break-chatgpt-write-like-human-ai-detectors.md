---
title: "Jak nauczyć ChatGPT pisać jak człowiek i przechodzić detektory AI"
excerpt: "Tutorial The AI Break pokazuje dwuetapowy prompt: najpierw każesz ChatGPT wyciągnąć pełną listę sygnałów AI-owego pisania z Wikipedii, potem zamieniasz ją w stały zestaw reguł wklejony do ustawień."
publishedAt: "2026-09-12"
slug: "the-ai-break-chatgpt-write-like-human-ai-detectors"
hashtags: "#theaibreak #ai #chatgpt #prompt-engineering #generated #pl"
source_pattern: "The AI Break"
---

## Tutorial: jak sprawić, by ChatGPT pisał jak człowiek i omijał detektory AI

**TLDR:** Zamiast zgadywać, co "brzmi jak AI", tutorial każe ChatGPT samodzielnie przeczytać wikipediową stronę "Signs of AI writing", wypisać wszystkie sygnały, a potem skompresować je w stały zestaw reguł wklejany raz do custom instructions i działający we wszystkich kolejnych rozmowach.

**Summary:** Punktem wyjścia jest publiczna, na bieżąco aktualizowana lista wszystkiego, co zdradza tekst pisany przez AI, zamiast intuicyjnie oceniać, co "brzmi sztucznie", tutorial każe modelowi po prostu ją przeczytać. Pierwszy prompt prosi ChatGPT o wejście na stronę Wikipedii "Wikipedia:Signs of AI writing" i wypisanie każdego sygnału bez skracania czy pomijania: interpunkcji (jak myślniki), przesadnie używanych słów i fraz, struktur zdań, tonu, przyzwyczajeń formatowania i typowych zastrzeżeń. Autorzy dodają praktyczną wskazówkę: jeśli model twierdzi, że nie może przeglądać internetu, trzeba włączyć Web Search z menu "+" i wysłać prompt ponownie, a jeśli lista wraca skrócona (np. tylko 10 punktów zamiast 30-50), trzeba go dopytać, żeby wrócił i wylistował wszystkie.

Drugi krok jest ważniejszy niż pierwszy, bo to on realnie zmienia output. Sama lista tego, co jest "AI-owe", to ciekawostka. Dopiero zamiana jej w twardy regulamin coś zmienia. Drugi prompt każe modelowi przekształcić każdy sygnał w bezwzględną komendę ("Nigdy nie...", "Zawsze..."), scalić powtarzające się reguły, dorzucić pięć zasad opisujących, co dobre ludzkie pisanie robi (zróżnicowana długość zdań, ściągnięcia, konkretne detale zamiast ogólników, proste słowa, wyraźna opinia), i skompresować całość do limitu 1400 znaków, bo pole custom instructions w ChatGPT ma limit 1500, a zostawienie zapasu na własne reguły ma sens. Cały wynik ma zacząć się od zdania "Follow these writing rules in every response, without exception", co samo w sobie jest dość bezpośrednim, "nie-AI-owym" poleceniem.

**Key takeaways:**
- Krok 1: każ ChatGPT przeczytać stronę Wikipedii o sygnałach pisania AI i wypisać je bez skrótów, pogrupowane w kategorie.
- Krok 2: zamień listę w skompresowany, bezwzględny regulamin (pod 1400 znaków) i wklej go raz do custom instructions.
- Reguła musi być wymuszona bezpośrednimi komendami ("Nigdy...", "Zawsze..."), bo sama świadomość sygnałów nic nie zmienia w praktyce.

**Why do I care:** To ciekawy hack pokazujący, że najskuteczniejszy prompt-engineering bywa meta: zamiast ręcznie wypisywać, czego nienawidzę w tekstach generowanych przez AI, każę modelowi samemu znaleźć tę listę i przestrzegać jej na stałe. Dla mnie jako kogoś, kto regularnie przegląda teksty pisane z pomocą AI (włącznie z tym newsletterem), to praktyczne przypomnienie, że "unslop" nie musi być ręczną, jednorazową korektą, można go zautomatyzować raz na poziomie ustawień asystenta, zamiast poprawiać efekty za każdym razem od nowa.

**Link:** [Tutorial: Make ChatGPT Write Like a Human (And Get Past AI Detectors)](https://theaibreak.substack.com/p/tutorial-make-chatgpt-write-like)
