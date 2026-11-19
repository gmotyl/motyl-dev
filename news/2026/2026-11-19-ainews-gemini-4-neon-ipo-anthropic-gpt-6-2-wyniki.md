---
title: "AINews: Gemini 4 Neon, IPO Anthropic po 83 dolary i GPT-6.2 w nowych testach"
excerpt: "Google DeepMind wypuścił Gemini 4 Neon, Anthropic wycenił IPO na 83 dolary za akcję, a Palo Alto Networks kupuje Applied Compute za 4,5 mld dolarów."
publishedAt: "2026-11-19"
slug: "ainews-gemini-4-neon-ipo-anthropic-gpt-6-2-wyniki"
hashtags: "#latentspace #ai #llm #agents #ml #architecture #generated #pl"
source_pattern: "Latent Space"
---

## Gemini 4 Neon

**TLDR:** Google DeepMind wydał czwarty model z rodziny Gemini 4 w około siedem tygodni. Neon kosztuje 3 dolary za milion tokenów wejścia i 15 za wyjście, ma kontekst 1M tokenów i zajmuje drugie miejsca w kilku rankingach.

**Summary:** Nazewnictwo jest mylące, ale logika jest taka, że nazwy to pierwiastki: Neon, model średniej klasy, jest szybszy i tańszy od Carbonu. Dzięki destylacji i RL Neon w niektórych miarach przewyższa większego Carbona. Model ma cztery poziomy wysiłku, trafia do płatnego Gemini API, AI Studio, Android Studio i Antigravity, a w aplikacji Gemini jest dostępny jako Deeper analysis. Od razu zintegrowały go Cursor, GitHub Copilot i LangChain.

Niezależne wyniki są solidne, ale nie rewolucyjne. Artificial Analysis podaje, że na wysokim wysiłku Neon równa Carbona na poziomie 60 w indeksie inteligencji za 3,74 dolara za zadanie. W Agent Arena debiutuje na drugim miejscu z 1336 punktami i medianą kosztu zadania 2,82 dolara. Vals daje mu drugie miejsce z 70,9%, około 0,4 punktu za Fable 5.2 przy mniej niż połowie kosztu zadania. CursorBench 4.1 pokazuje 63,7% wobec 57,3% u Hydrogenu. Testy praktyczne wskazują na dobre trzymanie się poleceń, bo model nie uruchamiał terminala, gdy o to poproszono, ale też 57 błędów braku mocy w 13 sesjach.

Warto zauważyć tempo: odstępy między kolejnymi modelami to 28, 15 i sześć dni. Pytanie, które pomija newsletter, brzmi, jak zespoły mają wybierać model przy takim tempie zmian i kto utrzymuje własne ewaluacje. Wyniki pochodzą z benchmarków zewnętrznych i osobistych sesji kilku osób, więc to nie jest rozstrzygnięcie.

**Key takeaways:**
- Neon jest tańszą alternatywą blisko czołówki w kilku rankingach.
- Cykl wydań Gemini 4 skrócił się do sześciu dni między ostatnimi modelami.
- Sesje praktyczne pokazują problemy z dostępnością mocy obliczeniowej.

**Why do I care:** Dla kogoś, kto wybiera model do codziennej pracy w edytorze, liczy się koszt zadania i trzymanie się instrukcji, a tu Neon wygląda dobrze. Ważniejsza lekcja jest taka, że bez własnego zestawu testów regresyjnych nie ma jak nadążyć za tempem zmian.

**Link:** [AINews: Gemini 4 Neon](https://www.latent.space/)

## Nowe wyniki GPT-6.2 i otwarte modele

**TLDR:** Astra i Sol od OpenAI zajęły dwa pierwsze miejsca w MathArena, a Tencent wypuścił wagi Hy4 Flash. vLLM 0.34.0 przyspiesza dekodowanie.

**Summary:** Astra rozwiązała 42 z 53 zadań ArXivLean, a Vals zgłasza pierwszą formalizację w Lean twierdzenia Smoktunowicz o luce. W Agent Arena Astra debiutuje szósta, a Sol jedenasty, przy medianie kosztu 0,90 dolara. OpenAI otworzyło betę zadań w tle dla GPT-6.2, które mogą czekać na pierwszą odpowiedź dwie lub osiem godzin, z rabatami 30 i 40% za token. Artificial Analysis zauważyło jednak, że po premierze odpowiedzi Astry stały się krótsze i model rzadziej przyznaje się do niepewności.

Hugging Face skorygował wczoraj podane wyniki adaptera Pi po znalezionej awarii tunelu: poprawiony wynik to 20 do 33 rozwiązanych zadań. Tencent wydał Hy4 Flash, multimodalny MoE o 224 mld parametrów, z czego 12 mld aktywnych na token, z kontekstem 1M. vLLM 0.34.0 włącza domyślnie rozszerzalny cache KV i podaje do 1,95x szybsze dekodowanie NVFP4 na GB200. Epoch szacuje, że pojemność inferencji dla stałego koszyka obciążeń agentowych urosła 4,6 razy między Q2 2025 a Q2 2026, a szczytowa moc 8-bitowa 2,6 razy.

**Key takeaways:**
- Rabaty za zadania w tle obniżają koszt pracy, która nie musi być natychmiastowa.
- Zmiany po premierze mogą pogorszyć zachowanie modelu względem pierwszych recenzji.
- Wydajność inferencji rośnie szybciej niż sama surowa moc chipów.

**Why do I care:** Zadania w tle ze zniżką pasują do nocnych przeglądów kodu i generowania testów. Uwaga o zmianach po premierze to dobry powód, żeby przypinać wersje modeli i ponawiać własne testy.

**Link:** [AINews: Gemini 4 Neon, GDM's Opus/Sol Contender](https://www.latent.space/)

## IPO Anthropic i przejęcie Applied Compute

**TLDR:** Anthropic wycenił ofertę na 83 dolary za akcję, a Palo Alto Networks kupuje Applied Compute za 4,5 mld dolarów w akcjach.

**Summary:** Oferta obejmuje 980 mln akcji, około 81,3 mld dolarów, z czego około 79,4 mld pochodzi z akcji sprzedawanych przez samą firmę przed opłatami. Notowania na Nasdaq pod symbolem ANT mają ruszyć 19 listopada. Palo Alto Networks za Applied Compute dostaje platformę do post-treningu i serwowania modeli otwartych wag, a transakcja ma się zamknąć w drugim kwartale fiskalnym 2027, po zgodach regulatorów. Do tego OpenAI informuje, że jego modele pomogły poprawić o 14% bloki układu AMD i że część zmian trafiła do projektu wysłanego do produkcji, a Genie 4 w Project Genie dostał natywny dźwięk.

**Key takeaways:**
- IPO Anthropic to największa oferta w tym numerze, ale to wydarzenie finansowe, nie techniczne.
- Przejęcie Applied Compute pokazuje, że bezpieczeństwo wchodzi w warstwę post-treningu.

**Why do I care:** To głównie historia biznesowa. Programistę dotyczy pośrednio: stabilność dostawcy i jego plany cenowe po wejściu na giełdę mogą wpłynąć na koszty narzędzi, na których opierasz pracę.

**Link:** [AINews: Anthropic IPO i Palo Alto Networks](https://www.latent.space/)
