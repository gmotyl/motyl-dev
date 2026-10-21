---
title: "AINews: DeepSeek DeepInfer na licencji open source i ekonomia tokenów z cache"
excerpt: "DeepSeek otworzył silnik inferencji za V4.1 Flash, a społeczność liczy marże i sprawdza, co z deklaracji da się powtórzyć."
publishedAt: "2026-10-21"
slug: "ainews-deepseek-deepinfer-open-source-ekonomia-cache"
hashtags: "#ainews #latent-space #ai #llm #inference #open-source #generated #pl"
source_pattern: "AINews"
---

## DeepInfer: produkcyjna inferencja, granice otwartości i ekonomia tokenów z cache

**TLDR:** DeepSeek udostępnił DeepInfer, silnik za modelem V4.1 Flash, wraz z danymi produkcyjnymi. Liczby są imponujące, ale dotyczą usługi silnie opartej na cache i pochodzą od samego DeepSeeka.

**Summary:** Silnik obsługuje inferencję rozproszoną, spekulacyjne dekodowanie, tak zwany SWA Bounded Replay i ustrukturyzowane wyjście na platformach NVIDIA i Huawei Ascend. Raport podaje 155 bilionów tokenów dziennie z jednego klastra, 96 procent trafień cache wejścia, 400 milisekund do pierwszego tokenu i 230 tokenów na sekundę generowania. Przychód to 38 dolarów na akcelerator na godzinę przy cenach poza szczytem. Przy kosztach 5 do 8 dolarów na kartę newsletter liczy ponad 80 procent marży, ale to rachunek tylko sprzętu.

"W pełni otwarty" nie oznacza, że całą usługę da się odtworzyć: zarządzanie cache KV i równoważenie obciążenia nie są jeszcze wydane, bo są sprzężone z wewnętrzną infrastrukturą. Cache trwały leży w osobnym klastrze 3FS o około 100 PiB, z retencją trzy dni dla agentów i siedem dla czatu. Dlatego 155 bilionów tokenów dziennie to nie 155 bilionów nowo wygenerowanych. Stan okna przesuwnego jest odtwarzany z ostatnich 128 tokenów, co prawie o połowę zmniejsza obliczenia prefill, ale jest przybliżeniem zależnym od modelu.

vLLM odpowiada, że przy zgodnej konfiguracji na GB200 jego przepustowość dekodowania jest w granicach 6 procent wyniku DeepInfer. To parytet dekodowania, nie odtworzenie całej usługi, i to samoopisany wynik konkurenta. Autorzy dokładnie rozdzielają szacunki: pierwszy popularny rachunek dawał 87 do 97 procent marży, ale został poprawiony do 84 do 96 procent po uwzględnieniu, że produkcja osiąga około 80 procent wyniku benchmarku. Inne obliczenia dla 5 do 10 dolarów za godzinę dają 74 do 87 procent. Wszystkie pomijają dyski, sieć, awarie i koszty inżynierii. Ekstrapolacje o miliardowym przychodzie to scenariusze, nie ujawnione dane.

**Key takeaways:**
- 96 procent trafień cache jest kluczowym kontekstem dla nagłówkowych liczb.
- Otwarty jest silnik, a orkiestracja i cache pozostają zadaniem wdrażającego.
- Marże dla samego sprzętu wahają się od 74 do 96 procent zależnie od założeń.

**Why do I care:** Dla agentów ponownie wysyłających rosnący kontekst trwały cache zmienia rachunek bardziej niż sama cena tokena. Przed porównaniem dostawców pytaj, jaka część rachunku to trafienia cache, a jaka świeże obliczenia.

**Link:** [AINews: DeepSeek DeepInfer open source](https://www.latent.space/p/ainews-deepseek-deepinfer-open-source)
