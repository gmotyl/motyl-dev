---
title: "Tencent Hy3 wychodzi z preview - 295B MoE dostępny za darmo w Kilo"
excerpt: "Model Hy3 od Tencent osiąga status General Availability z drastycznie obniżonym wskaźnikiem halucynacji, lepszym tool-callingiem i 256K kontekstem, dostępny bezpłatnie przez ograniczony czas w Kilo."
publishedAt: "2026-07-07"
slug: "2026-07-07-tencent-hy3-ga-release-kilo-295b-moe"
hashtags: "#kilo #ai #llm #agents #open-source #generated #pl"
source_pattern: "Kilo"
---

## Tencent Hy3 przechodzi do produkcji

**TLDR:** Tencent oficjalnie wypuścił Hy3 w wersji General Availability: model Mixture-of-Experts z 295 miliardami parametrów całkowitych, aktywujący 21 miliardów na token, z 256K oknem kontekstu i wskaźnikiem halucynacji obniżonym do 5,4 procent.

Hy3 był jednym z popularniejszych modeli preview na platformie Kilo dla programistów, więc GA release to nie jest tylko zmiana etykietki. Tencent przez fazę preview zbierał realne dane z workflow'ów deweloperów i na tej podstawie skupił się na kilku konkretnych obszarach, które faktycznie bolały.

Pierwszym był tool-calling. Modele agentic'owe mają tendencję do wpadania w nieskończone pętle lub generowania niepoprawnych wywołań narzędzi, szczególnie w długich sesjach wieloetapowych. Hy3 GA wprowadza poważne usprawnienia wskaźnika sukcesu wywołań i odzyskiwania po błędach. Jeśli budujesz cokolwiek, gdzie model musi samodzielnie decydować o kolejnych krokach i wywoływać zewnętrzne narzędzia, to jest konkretna poprawa w miejscu, które wcześniej regularnie się wykładało.

Drugim obszarem były halucynacje. Wewnętrzny wskaźnik halucynacji spadł z 12,5 do 5,4 procent dzięki rygorystycznemu czyszczeniu danych i specyficznym ograniczeniom treningowym. To znaczy mniej phantom bugs, mniej fałszywych API, mniej kodu, który wygląda przekonująco ale nie działa. Dla codziennej pracy z kodem to odczuwalna różnica.

Trzecim było śledzenie intencji w długim kontekście. Przy 256K tokenach i złożonych sesjach refaktoringu obejmujących wiele plików i dziesiątki kroków, modele często "zapominają" o oryginalnym celu. Hy3 GA ma ulepszone możliwości wieloobrotowego dialogu właśnie pod kątem zachowania spójności intencji przez długie sesje.

Architektura to 295B parametrów całkowitych przy tylko 21B aktywnych na token, 192 ekspertów z aktywacją top-8, Grouped Query Attention i okno kontekstu 256K. Ten profil, masywna pojemność przy efektywnym koszcie inference, to dokładnie to, czego potrzebują duże bazy kodu i złożona dokumentacja.

Kilo udostępnia Hy3 bezpłatnie przez ograniczony czas dzięki zasobom obliczeniowym od Novita. Dostępny we wszystkich interfejsach Kilo: rozszerzeniu VS Code, cloud agents i CLI.

**Key takeaways:**
- Hy3 GA: 295B MoE (21B aktywnych), 192 ekspertów top-8, 256K kontekst, darmowy w Kilo przez ograniczony czas
- Wskaźnik halucynacji spadł z 12,5% do 5,4% przez czyszczenie danych i ograniczenia treningowe
- Znaczące usprawnienia tool-callingu i śledzenia intencji w długich wieloetapowych sesjach

**Why do I care:** Trend jest czytelny: otwarte modele MoE gonią zamknięte flagowce przy ułamku kosztu inference. Hy3 z 21B aktywnymi parametrami i 256K kontekstem jest realną opcją dla team'ów, które chcą uniknąć uzależnienia od jednego providera. Obniżony wskaźnik halucynacji to argument praktyczny, a nie marketingowy, szczególnie gdy model jest częścią pipeline'u agentic'owego, gdzie błędne wywołania narzędzi kumulują się w kolejnych krokach.

**Link:** [From Preview to Production: Tencent's Hy3 Model Has Arrived](https://blog.kilo.ai/p/from-preview-to-production-tencents?publication_id=4363009&post_id=205516881&isFreemail=true&triedRedirect=true)
