---
title: "Jak wybrać lokalny LLM: modele, sprzęt i kwantyzacja"
excerpt: "Gościnny wpis od zespołu Atomic Chat tłumaczy krok po kroku, jak dopasować model do dostępnej pamięci, wybrać poziom kwantyzacji GGUF i który model wybrać do konkretnego zadania na konkretnym sprzęcie."
publishedAt: "2026-09-12"
slug: "kilo-local-llm-hardware-quantization"
hashtags: "#kilo #ai #llm #ollama #generated #pl"
source_pattern: "Kilo"
---

## Jak wybrać lokalny LLM: modele, sprzęt i kwantyzacja

**TLDR:** Poradnik od zespołu Atomic Chat pokazuje dwa proste wzory na oszacowanie potrzebnej pamięci (wagi modelu i KV cache), tłumaczy poziomy kwantyzacji GGUF od Q8 do Q2 i rekomenduje konkretne modele open-weight do zastosowań takich jak agentowe kodowanie, RAG czy wizja.

**Summary:** Punktem wyjścia jest matematyka, którą warto znać na pamięć, zanim zacznie się cokolwiek ściągać. Pamięć na same wagi modelu liczy się jako liczba parametrów razy liczba bitów na wagę podzielona przez osiem: 27-miliardowy model przy FP16 potrzebuje więc około 54 GB, zanim doliczy się cokolwiek innego. Osobno trzeba policzyć KV cache: dwa razy liczba warstw razy tokeny kontekstu razy liczba głów KV razy wymiar głowy razy bajty na element, gdzie "dwa" bierze się z konieczności przechowania zarówno kluczy, jak i wartości. Dla modelu z 48 warstwami, 8 głowami KV, wymiarem głowy 128 i kontekstem 32 768 tokenów wychodzi około 6 GB przy FP16, a to wciąż tylko sam cache, bez systemu operacyjnego i runtime'u.

Sprzęt dzieli się w tekście na dwie filozofie: dyskretne GPU z własną szybką pamięcią VRAM, gdzie model albo mieści się w całości i działa szybko, albo częściowo trafia na wolniejszy RAM i zwalnia drastycznie, oraz systemy z pamięcią unifikowaną (Mac Studio, AMD Ryzen AI Max+ 395 z do 128 GB), które oferują większą, współdzieloną pulę kosztem czystej wydajności specyficznej dla GPU. Do tego dochodzi kwantyzacja: format GGUF z poziomami od Q8 (praktycznie niezauważalny spadek jakości) przez zbalansowany Q4 aż po agresywne Q2 do zastosowań brzegowych. Ogólna zasada z poradnika jest kontrintuicyjna dla początkujących: większy model przy agresywniejszej kwantyzacji zwykle bije mniejszy model przy lżejszej kompresji, więc lepiej wybrać 14B przy 4-bitach niż 8B przy 8-bitach, jeśli oba się mieszczą.

Ostatnia część to konkretne rekomendacje modeli posegmentowane według zadania: gpt-oss-20b jako jedyny otwarty model OpenAI działający na sprzęcie konsumenckim, Qwen3.8-27B jako uniwersalny wybór z obsługą wizji, Qwen3.6-35B-A3B jako model MoE do agentowego kodowania aktywujący tylko 3 z 35 miliardów parametrów na token, Gemma 4 do zastosowań wielojęzycznych i multimodalnych oraz Devstral Small 2505 jako model 24B dedykowany agentom software'owym, mieszczący się na RTX 4090 albo Macu z 32 GB RAM.

**Key takeaways:**
- Pamięć na wagi: parametry × bity na wagę ÷ 8; KV cache: 2 × warstwy × tokeny kontekstu × głowy KV × wymiar głowy × bajty na element.
- GGUF Q4_K_M to sensowny punkt startowy, większy model przy agresywniejszej kwantyzacji zwykle bije mniejszy model przy lżejszej.
- Rekomendacje modeli podzielone wg zadania: gpt-oss-20b (chat na słabszym sprzęcie), Qwen3.8-27B (uniwersalny + wizja), Qwen3.6-35B-A3B (agentowe kodowanie MoE), Devstral Small (software engineering na RTX 4090).

**Why do I care:** Wzory na pamięć i KV cache to coś, co warto mieć w notatkach na stałe, zamiast za każdym razem zgadywać, czy dany model wejdzie na dostępny sprzęt, szczególnie że rozmiar KV cache regularnie umyka w planowaniu, a to on rośnie najszybciej przy długich kontekstach agentowych. Jako ktoś eksperymentujący z lokalnymi modelami do prostszych zadań (np. do newsletter-ai) doceniam, że poradnik nie sprzedaje jednego "najlepszego" modelu, tylko segmentuje wybór według realnych ograniczeń sprzętowych, co jest rzadkością w tym gatunku treści.

**Link:** [How to Choose a Local LLM: Models, Hardware, and Quantization](https://blog.kilo.ai/p/how-to-choose-a-local-llm-models)
