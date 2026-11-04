---
title: "Miks modeli rośnie i przenosi się na własny sprzęt: OpenRouter, Kilo i Revolut"
excerpt: "Dane z OpenRouter i dashboardu Kilo pokazują, że programiści używają coraz więcej modeli naraz, a Revolut zastąpił płatne narzędzia własnym GLM 5.3."
publishedAt: "2026-11-04"
slug: "kilo-miks-modeli-rosnie-i-przenosi-sie-do-firmy"
hashtags: "#kilo #ai #llm #agents #devtools #productivity #open-source #generated #pl"
source_pattern: "Kilo"
---

## Miks modeli rośnie i przenosi się na własny sprzęt

**TLDR:** Mediana liczby rodzin modeli u klientów OpenRouter wydających co najmniej sto dolarów miesięcznie podwoiła się w rok do 6. Revolut pokazał z kolei, że własny, otwarty model może być domyślnym narzędziem dla dwóch tysięcy inżynierów.

**Summary:** Kilo zebrało trzy źródła danych, które wskazują ten sam kierunek. OpenRouter podał 2 listopada, że ta mediana wzrosła z 3 do 6 rodzin modeli, a w październiku średnia wyniosła rekordowe 7,3. Po drodze był dołek w czerwcu 2025, kiedy liczba spadła do 3,8, więc trend się odwrócił. Im większy wydatek, tym szerszy wybór. Klienci wydający powyżej dziesięciu tysięcy dolarów korzystają z dwunastu laboratoriów, a poniżej tysiąca z pięciu.

Dashboard samego Kilo pokazuje podział ról. Żaden model nie ma więcej niż 30 procent żadnej z nich. W kodowaniu, planowaniu i debugowaniu prowadzą modele Nvidii z rodziny Nemotron. W review pojawiają się za to modele frontier, Claude Opus z 11,5 procent użycia i GPT z 14,4 procent. Wygląda to tak, że tanie modele piszą i poprawiają kod, a drogi płaci się dopiero tam, gdzie wyłapuje się błędy.

Najciekawszy jest przykład Revolutu. David Abitbol opowiadał na AI Engineer NYC, że część inżynierów wydawała od tysiąca do dziesięciu tysięcy dolarów miesięcznie na narzędzia frontier bez dużego zwrotu. Bank zaczął hostować GLM 5.1 w kwietniu, a teraz uruchamia GLM 5.3 na około 56 kartach B200, po około 30 centów za milion tokenów. Rachunek to według niego jedna dziesiąta dawnych kosztów. Zmierzono też 70 procent krótszy lead time i 60 procent krótszy czas kodowania. Wyjaśnienie jest proste, stała opłata sprawiła, że ludzie przestali oszczędzać tokeny.

Kilo kończy instrukcją, jak ustawić model per agent, podłączyć lokalny model w aplikacji desktopowej i włączyć routing Auto Efficient. Warto pamiętać, że to tekst producenta narzędzia, któremu opłaca się wielomodelowość.

**Key takeaways:**
- Mediana rodzin modeli u klientów OpenRouter wzrosła z 3 do 6 w ciągu roku.
- W review dominują modele frontier, w kodzie tańsze i otwarte.
- Revolut deklaruje koszt jedną dziesiątą dawnego rachunku i 70 procent krótszy lead time.

**Why do I care:** Autor omija pytanie o koszt utrzymania 56 kart B200 i zespołu, który je obsługuje, bo blended cost 30 centów to nie jest cena dla firmy bez takiej floty. Selekcja próby w OpenRouter też jest oczywista, bo kto wchodzi do routera, chce używać wielu modeli. Mimo to wniosek dla zespołu jest praktyczny. Przestań traktować wybór modelu jak decyzję raz na rok i zacznij przypisywać go do kroku pracy, zwłaszcza do review.

**Link:** [The Model Mix Is Growing, and Moving In-House](https://blog.kilo.ai/p/the-model-mix-is-growing-and-moving)
