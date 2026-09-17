---
title: "Jev: model, który tylko decyduje, ale 100-200 razy szybciej niż LLM-y ogólnego przeznaczenia"
excerpt: "AINews: TypeSafe pokazuje Jev, wąski model do klasyfikacji i routingu bez generowania tekstu, a Periodic Labs bije Astrę w analizie danych materiałowych dzięki RL sprzężonemu z prawdziwym laboratorium."
publishedAt: "2026-09-17"
slug: "jev-system-one-model-periodic-labs-neon-gemini-live"
hashtags: "#ainews #ai #llm #agents #ml #generated #pl"
source_pattern: "AINews"
---

## Jev: model bez generowania tekstu, wyspecjalizowany tylko w decyzjach

**TLDR:** Startup TypeSafe, założony przez współtwórcę ChatGPT Diogo Almeidę, pokazał Jev, model treningowany metodą RLCD (kalibrowane decyzje), który nie pisze tekstu ani nie "rozumuje" w sensie łańcucha myśli, tylko klasyfikuje, ocenia i kieruje ruchem, za to od 20 do 200 razy szybciej i od 40 do 400 razy taniej niż małe modele frontierowe.

**Summary:** Almeida opisuje dwa lata pracy nad pytaniem, dlaczego nadludzkie modele czatowe nie doprowadziły jeszcze do AGI, a odpowiedzią jest Jev jako uzupełnienie wolniejszych modeli "systemu drugiego": zamiast generować ciągi tekstu, model daje próbkowanie równoległe, brak halucynacji przy z góry ustalonym formacie wyjścia i kalibrację pewności odpowiedzi. Społeczność szybko ostudziła najbardziej entuzjastyczne odczytania: to nie jest ogólny model językowy, tylko coś bliższego ograniczonemu modelowi dyfuzyjnemu, który wymaga predefiniowanych formatów wyjścia i nie potrafi wygenerować swobodnego tekstu. Najbardziej trafnym porównaniem, jakie pojawiło się w dyskusji, jest DSPy i typowane sygnatury predykcji: przyszły stos, w którym drogie wywołania dużego LLM-a kompiluje się do wielu mniejszych, wyspecjalizowanych funkcji AI zamiast trzymać wszystko w jednym uniwersalnym modelu.

**Key takeaways:**
- Jev jest 20-200x szybszy i 40-400x tańszy niż małe modele frontierowe, ale nie generuje swobodnego tekstu, tylko klasyfikuje/ocenia/kieruje w z góry zdefiniowanym formacie
- Trenowany metodą RLCD (Reinforcement Learning from Calibrated Decisions), nastawioną na kalibrowaną pewność decyzji, nie na jakość generowanego tekstu
- Najbardziej realistyczne zastosowanie to zamiana LLM-ów w roli klasyfikatorów, sędziów i polityk routingu w systemach produkcyjnych, gdzie autoregresywne generowanie to zbędny narzut

**Why do I care:** To dobry przykład na to, że nie każdy problem w systemie agentowym wymaga pełnego modelu językowego. Jeśli budujesz pipeline z routingiem, klasyfikacją intencji czy scoringiem, warto sprawdzić, czy naprawdę potrzebujesz tam kosztownego wywołania LLM-a, czy wystarczy dużo tańszy, wyspecjalizowany model decyzyjny w tym miejscu.

**Link:** [Jev: a "System One Model" that only decides/classifies/routes/scores](https://www.latent.space/p/ainews-jev-a-system-one-model-that?publication_id=1084089&post_id=215966039&isFreemail=true&triedRedirect=true)

## Periodic Labs bije Astrę w analizie danych materiałowych dzięki RL sprzężonemu z prawdziwym laboratorium

**TLDR:** Periodic Labs pokazało Neon, model trenowany w ścisłej pętli między laboratoriami fizycznymi a uczeniem maszynowym, skupiony na nadprzewodnikach, magnesach i półprzewodnikach. Model bazujący na Kimi K2.6 podniósł wynik na wewnętrznym benchmarku FrontierXRD z 2,7% do 55,3%, bijąc GPT-6 Astrę i Claude Fable 5.1 przy niższym koszcie inferencji.

**Summary:** Kluczowa różnica wobec typowych benchmarków AI-dla-nauki polega na tym, że Neon trenowano na danych z rzeczywiście działających, ciągle uruchamianych eksperymentów fizycznych, a nie na statycznych zbiorach danych. Zespół użył 1300 kart H200, miesięcy własnych danych eksperymentalnych oraz mid-treningu i RL na otwartoźródłowym modelu bazowym. Komentatorzy zwracają uwagę, że to konkretny szablon na przyszłość: firmy z dostępem do unikalnych, prywatnych danych eksperymentalnych będą powtarzać ten wzorzec, przesuwając wąskie gardło w stronę przepustowości uruchamiania RL, mocy obliczeniowej weryfikatorów i synchronizacji wag modelu.

**Key takeaways:**
- Neon podniósł wynik na FrontierXRD z 2,7% do 55,3%, bijąc GPT-6 Astrę i Claude Fable 5.1 przy niższym koszcie inferencji
- Model trenowano w pętli sprzężonej z rzeczywistymi, ciągle działającymi laboratoriami fizycznymi, nie na statycznych danych
- Wzorzec "prywatne dane eksperymentalne + RL infrastruktura" prawdopodobnie powtórzy każda firma z realnym dostępem do unikalnych danych domenowych

**Why do I care:** To mocny argument za tym, że przewaga konkurencyjna w wąskich, wartościowych domenach naukowych i przemysłowych będzie wynikać z dostępu do prywatnych danych i infrastruktury RL, nie z samej wielkości modelu ogólnego przeznaczenia. Dla zespołów spoza nauk ścisłych to sygnał, żeby patrzeć na "dane domenowe plus RL" jako wzorzec do rozważenia wszędzie tam, gdzie firma ma unikalny dostęp do danych, których model frontierowy nigdy nie widział.

**Link:** [Periodic Labs' Neon: Lab-Grounded RL for Materials Science](https://www.latent.space/p/ainews-jev-a-system-one-model-that?publication_id=1084089&post_id=215966039&isFreemail=true&triedRedirect=true)
