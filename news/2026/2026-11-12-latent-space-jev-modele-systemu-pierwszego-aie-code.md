---
title: "Latent Space: rewolucja Jev i modele systemu pierwszego na AIE Code"
excerpt: "Diogo Almeida z TypeSafe AI przekonuje, że szybkie modele decyzyjne należy rozsypać po kodzie aplikacji, a Glean, UiPath i Workday pokazują, jak z nich korzystają."
publishedAt: "2026-11-12"
slug: "latent-space-jev-modele-systemu-pierwszego-aie-code"
hashtags: "#latent #ai #llm #agents #architecture #generated #pl"
source_pattern: "Latent Space"
---

## Modele systemu pierwszego w kodzie aplikacji

**TLDR:** Motywem przewodnim AIE Code były modele systemu pierwszego, czyli niegeneratywne modele zwracające wybór, wynik lub prawdopodobieństwo. Są szybsze i tańsze niż modele rozumujące.

**Summary:** Diogo Almeida, współzałożyciel i CEO TypeSafe AI, jest głównym twórcą Jev, produktu z września, który zapoczątkował ten trend. Wcześniejszy odcinek podcastu z jego udziałem stał się najpopularniejszym odcinkiem roku. Problem, który opisuje, to niezawodność. Według niego dostajesz Einsteina w 95 procentach przypadków i Mr. Beana w pozostałych pięciu, a skoro nie wiesz którego, nic nie zautomatyzujesz. Teza z keynote'u mówi, że kod jest językiem automatyzacji, więc modele systemu pierwszego trzeba z kodem zintegrować. swyx tłumaczy to jako wołanie o rozsypywanie wywołań takich modeli wewnątrz aplikacji, zamiast sklejania ciągów znaków i liczenia na szczęście.

Chinmay Goyal z Glean mówi, że Jev daje elastyczność bez douczania, gdy zmienia się taksonomia decyzji, a użytkownik nie musi wiedzieć, czy pracuje model decyzyjny, czy duży LLM. UiPath pokazał turniej fragmentów dokumentów, w którym Jev wybiera najtrafniejsze z małych grup, a zwycięzcy przechodzą dalej. Całość z tysiącami wywołań zajęła poniżej sekundy. Scott Roberts z Workday pokazał prototyp, w którym formularz urlopu wypełnia się, zanim użytkownik skończy pisać, czyli przejście od przewidywania, co chcesz powiedzieć, do przewidywania, co chcesz zrobić. Almeida porównuje obecny moment do wczesnego internetu.

**Key takeaways:**
- Modele systemu pierwszego zwracają decyzje, nie tekst, i są dużo szybsze.
- Mają być częścią kodu, a nie osobną warstwą rozmowy.
- Strategie takie jak turnieje potrafią podnieść jakość ponad możliwości pojedynczego wywołania.

**Why do I care:** Relacja pochodzi od organizatora konferencji, a mówcą jest szef firmy sprzedającej produkt, więc entuzjazm bierzemy z odpowiednim współczynnikiem. Samo zastosowanie jest jednak praktyczne. Klasyfikacja intencji, routing i walidacja to miejsca, gdzie dziś często wołamy duży model za wiele pieniędzy. Pytanie bez odpowiedzi w tekście dotyczy kalibracji, bo obietnica niezawodności musi się opierać na mierzalnej pewności odpowiedzi.

**Link:** [The Jev Revolution: What Engineers Are Already Building with System One Models](https://www.latent.space/)
