---
title: "Kilo: modele open weights są gotowe na produkcję, ale czy Twój stos jest gotowy?"
excerpt: "Panel z Anaconda, MiniMax i Friendli AI: myśl systemowo, mierz na własnym obciążeniu i buduj ewaluacje od pierwszego dnia."
publishedAt: "2026-10-15"
slug: "kilo-open-weights-produkcja-system-nie-model"
hashtags: "#kilo #ai #llm #agents #architecture #observability #generated #pl"
source_pattern: "Kilo"
---

## Open weights na produkcji

**TLDR:** Z panelu wynika, że banki, fintechy i biotechnologia zaczęły używać modeli open weights w produkcji, a powodem jest już nie koszt, tylko wydajność i kontrola. Kluczowa rada brzmi: myśl systemowo, nie modelowo.

**Summary:** Ari Messer z Anaconda mówi, że dopiero w ostatnich miesiącach klienci od biotechu po duże banki zaczęli faktycznie wdrażać takie modele. Początkowo liczył się koszt, teraz wydajność i kontrola. Victor Su-Ortiz z MiniMax dodaje, że liczy się jakość w jednej dziedzinie, na przykład prawa czy zdrowia, więc rośnie liczba dostrajanych modeli. Szybkie, tanie modele typu Flash dominują w publicznych danych o użyciu z OpenRouter i OpenCode.

Yunmo Koo z Friendli AI opisuje główną zmianę jako przejście od myślenia modelem do myślenia systemem. Endpoint o niezawodności 95 procent spada do około 60 procent w łańcuchu dziesięciu kroków agenta, więc sukces trzeba definiować dla całego przepływu. Okna kontekstu na milion tokenów stają się normą, a użytkownicy zapełniają je do 70 lub 80 procent, co wymusza rzadkie architektury i własne optymalizacje KV-cache. Zysk z nowej architektury nie zawsze przekłada się na realną prędkość: liniowa uwaga bez dopasowanego silnika potrafi spowolnić wnioskowanie.

Kontrola oznacza też odpowiedzialność: testy bezpieczeństwa i red teaming obejmują zarówno model, jak i zachowanie agenta. Anaconda robi to z Enkrypt AI. Hybrydowe użycie lokalnego i chmurowego AI to na razie wizja, a nie ustalony wzorzec. Ostatnia rada dotyczy ludzi: zespoły powinny dzielić się porażkami, jak błędy wywołań narzędzi, a nie ukrywać je jako własne.

**Key takeaways:**
- Mierz niezawodność, opóźnienie i koszt dla całego przepływu.
- Testuj na własnym obciążeniu, nie tylko na publicznych benchmarkach.
- Wbuduj ewaluacje i observability w każdy krok agenta.

**Why do I care:** Liczba 95 do 60 procent to świetny argument w rozmowie o agentach w produkcji. Tekst to jednak relacja z wydarzenia współorganizowanego przez uczestniczące firmy, więc brakuje danych o realnych kosztach i błędach.

**Link:** [Open Weights Are Ready for Production. Is Your Stack?](https://blog.kilo.ai/p/open-weights-are-ready-for-production)
