---
title: "Fala nowych modeli frontier i wzrost systemu jeden zamiast LLM-a do wszystkiego"
excerpt: "Opus 5.5, GPT-6 i Gemini 3.8 Flash walczą o szczyt benchmarków, a obok nich rośnie osobna kategoria tanich modeli decyzyjnych, które mają zastąpić LLM-y tam, gdzie liczy się szybkość i koszt, nie elokwencja."
publishedAt: "2026-09-25"
slug: "frontier-model-wave-system-one-jev-clm"
hashtags: "#ai #ml #llm #agents #performance #generated #pl"
source_pattern: "AINews"
---

## Fala nowych modeli frontier i wzrost systemu jeden zamiast LLM-a do wszystkiego

**TLDR:** Ten tydzień przyniósł niemal jednoczesny skok Claude Opus 5.5, rodziny GPT-6, Gemini 3.8 Flash i chińskiego MiMo-V2.6-Pro, każdego z innym kompromisem między ceną a jakością. Równolegle rośnie osobna kategoria małych, tanich modeli decyzyjnych typu Jev i CLM, które mają robić klasyfikację i wybory zamiast pełnego LLM-a, i już zdążyły wywołać spór o to, czy to w ogóle coś nowego.

**Summary:** Opus 5.5 prowadzi teraz w SimpleBench z wynikiem 88,4 procent. Na Terminal-Bench-Science skacze z 24 procent przy niskim wysiłku rozumowania do 62 procent przy ustawieniu "xhigh", po czym spada do 59 procent przy "max". Theo z community od razu odradza tryb "max": wymusza on minimalny budżet tokenów na rozumowanie, więc płacisz więcej i dostajesz gorszy wynik niż na "xhigh". GPT-6 Astra trzyma się mocno jako model do przeglądu i audytu kodu, a Luna wszedł do Code Arena WebDev na 24 miejscu, 74 punkty wyżej niż poprzednia wersja, przy cenie około 40 centów za milion tokenów w mieszanym rozliczeniu. Gemini 3.8 Flash ląduje z wynikiem 41 na indeksie inteligencji Artificial Analysis przy 291 tokenach na sekundę, a na ARC-AGI v2 osiąga 89,2 procent za 40 centów od zadania. Xiaomi MiMo-V2.6-Pro, wydany na licencji MIT, trzyma się tuż za GPT-5.6 Sol przy koszcie 13 centów zamiast niemal 2 dolarów za zadanie i dorzuca do tego otwarty kod treningowy.

Obok tej rywalizacji frontier modeli rośnie coś, co AINews nazywa modelami "systemu jeden": Jev od TypeSafe AI i jego otwarty odpowiednik CLM. Jev zamiast generować tekst rozumowania zwraca od razu typowaną decyzję z przypisanym prawdopodobieństwem, kosztuje 4,4 centa za tysiąc ocen przy medianie opóźnienia 152 milisekund, czyli około 277 razy taniej niż GPT-6, i mieści się w granicach 3 punktów od GPT-6 na RewardBench i HaluEval. TypeSafe zbiera na to kolejną rundę finansowania, tydzień po poprzedniej, przy wycenie ponad 10 miliardów dolarów. Na Reddicie ta wycena wywołała regularną awanturę: część komentujących wskazuje, że Jev to w gruncie rzeczy skalowany klasyfikator zero-shot, porównywalny do spaCy czy scikit-learn, i że BGE-small z regresją logistyczną bije go na Banking77 (93,3 procent do 83,2 procent) przy lokalnym czasie odpowiedzi rzędu 9 milisekund. Inni odpowiadają, że nawet jeśli to nie jest nowa nauka, to inżynieryjne dopracowanie takiego klasyfikatora i tak może być produktem wartym pieniędzy, tak jak było ze skalowaniem GPT-2 do GPT-3. CLM, otwarta alternatywa oparta na Qwen3-8B, ma być 4 do 13 razy szybszy od Jeva w benchmarkach agentowych, ale przegrywa z nim zasięgiem wiedzy zero-shot i długością kontekstu kalibracji, więc krytycy trafnie zauważają, że porównywanie go z Jevem jeden do jednego pomija to, czego CLM po prostu nie potrafi.

W infrastrukturze agentowej LangChain pokazał na konferencji Interrupt zarządzane Deep Agents 0.8 z pamięcią użytkownika i agenta, kanałami HTTP i sandboxem plików, a Perplexity opisało swój silnik wyszukiwania Photon napisany w Rust: opóźnienie p99 spadło im z około 800 do 65 milisekund, na 20 procent mniejszej liczbie maszyn, przy dwa i pół raza większej ilości danych na dokument. Ciekawy wątek poboczny to modele kodujące jako silniki mediów: Opus 5.5 i Astra generują teraz animacje, filmy i sceny 3D wyłącznie z kodu, bez żadnej warstwy dyfuzyjnej, co na Reddicie skłoniło ludzi do budowania całych interaktywnych scen w kilka godzin za kilkanaście dolarów zużytych tokenów.

**Key takeaways:**
- Opus 5.5, GPT-6 i Gemini 3.8 Flash zajęły różne nisze cenowo-wydajnościowe zamiast jednego zwycięzcy, a MiMo-V2.6-Pro pokazuje, że tania otwarta alternatywa potrafi być tuż za czołówką.
- Tryb "max reasoning effort" w Opus 5.5 wypada gorzej niż "xhigh" na Terminal-Bench-Science, bo wymusza minimalny budżet tokenów niezależnie od trudności zadania.
- Modele "systemu jeden" jak Jev i CLM oferują decyzje o rząd wielkości tańsze i szybsze niż pełny LLM, kosztem szerokości wiedzy zero-shot i długości kontekstu.
- Społeczność ML kwestionuje, czy Jev to realna nowość, czy dobrze sfinansowany klasyfikator zero-shot z inną etykietą marketingową.
- Modele kodujące zaczynają zastępować pipeline'y do wideo i grafiki, generując animacje i sceny 3D bezpośrednio z kodu.

**Why do I care:** Dla mnie najciekawszy jest właśnie ten spór o Jev, bo dotyka czegoś, co architekci systemów agentowych będą musieli w końcu policzyć na własnych fakturach: nie każdą decyzję w pipeline'u trzeba przepuszczać przez pełny LLM. Jeśli klasyfikator albo model typu Jev robi ten sam wybór 277 razy taniej i w ułamku czasu, to trzymanie się jednego dużego modelu do wszystkiego jest po prostu marnotrawstwem budżetu, a routing zadań do tańszego modelu z eskalacją tylko trudnych przypadków, tak jak robi to opisany w newsletterze cascade Jev-plus-GPT-6, wygląda na wzorzec, który za rok będzie standardem w każdym poważnym systemie agentowym.

**Link:** [AINews: The Future of Latent Space](https://www.latent.space/p/ainews-the-future-of-latent-space)
