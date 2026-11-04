---
title: "Agent kodujący bez internetu: OpenCode, Ollama i Qwen3.5 9B na laptopie"
excerpt: "Gościnny tekst w Latent Space pokazuje, jak z wyłączonym Wi-Fi naprawić błąd w kodzie lokalnym agentem, i uczciwie mówi, czego ten jeden przykład nie dowodzi."
publishedAt: "2026-10-27"
slug: "agent-kodujacy-offline-opencode-ollama-qwen"
hashtags: "#latent #ai #llm #agents #devtools #ollama #open-source #generated #pl"
source_pattern: "Latent Space"
---

## Offline coding: agent kodujący na laptopie bez sieci

**TLDR:** Principal Engineer z Thomson Reuters, pracujący z podnóża Himalajów, uruchamia agenta OpenCode z modelem Qwen3.5 9B przez Ollamę na własnym laptopie. Po wyłączeniu Wi-Fi agent poprawia jednolinijkowy błąd i uruchamia testy, ale autor sam zaznacza, że to dopiero pierwszy, mały krok.

**Summary:** Punkt wyjścia jest życiowy. Autor od roku mieszka w miejscu, gdzie zdarzają się przerwy w sieci i prądzie, a agenci kodujący stali się codzienną częścią jego pracy. Chciał sprawdzić, ile z tego da się zrobić offline. Konstrukcja jest prosta. Ollama uruchamia model na tym samym komputerze, a OpenCode, agent działający w terminalu, czyta pliki, proponuje zmiany i uruchamia polecenia, wysyłając zapytania do lokalnej usługi. Konfiguracja projektu włącza tylko lokalnego dostawcę, blokuje narzędzia sieciowe i prosi o zgodę przed edycją plików czy komendą w powłoce. Ollama jest uruchamiana z wyłączonymi funkcjami chmurowymi.

Wybór modelu to Qwen3.5 9B, bo według karty modelu ma wyraźnie lepsze wyniki w kodowaniu i wywoływaniu funkcji niż wariant 4B, a pobranie zajmuje od 6,6 do 7,6 GB. Autor zaznacza, że rozmiar pobrania to nie wymaganie pamięci. Zewnętrzne źródło budżetuje 12 do 16 GB RAM dla takiego modelu, a konfiguracja z kontekstem 64 tysięcy tokenów może potrzebować więcej. Tabele benchmarków pochodzą z karty modelu, nie z pomiarów na laptopie. Dołożony jest też wynik preprintu, w którym OpenCode, Goose i OpenHands mają zbliżone wskaźniki zaliczenia na 50 zadaniach, z przedziałami ufności, które się mocno pokrywają, ale OpenCode zużywa około 40 razy więcej tokenów na rozwiązane zadanie niż Goose.

Eksperyment to kalkulator wydatków, który zamiast sumować, nadpisuje wynik w każdej iteracji, więc pięć wydatków daje 8,00 zamiast 25,50. Trzy z pięciu testów padają. Agent najpierw błędnie proponuje pytest, choć projekt używa wbudowanego unittest, i dopiero zgoda w oknie uprawnień pozwala to zauważyć. Po wyłączeniu Wi-Fi autor sprawdza, że lokalne API odpowiada, a zewnętrzny adres się nie rozwiązuje. Qwen proponuje jednoliniową zmianę, prosi o zgodę na edycję i uruchamia testy, a ręczne sprawdzenie potwierdza pięć zaliczonych testów i niezmieniony plik testów. Dwa kolejne ćwiczenia, raport CSV i analizator logów, są w repozytorium, ale autor jeszcze ich nie przeszedł z agentem.

**Key takeaways:**

- Cały cykl odczytu, edycji i testów działa lokalnie, jeśli model, zależności i narzędzia testowe są na dysku.
- Podanie agentowi dokładnego polecenia testowego zapobiega zbędnym objazdom.
- Jednolinijkowa poprawka nie mówi nic o dużych repozytoriach ani nieznanych frameworkach.

**Why do I care:** Najlepsze w tym tekście jest to, że autor opisuje błędny start agenta, a nie tylko sukces. Zasada, żeby zostawić oryginalne testy bez zmian i uruchomić je samemu, jest tym, co chciałbym widzieć w każdym przeglądzie pracy agenta. Moim zastrzeżeniem jest trudność zadania. Zamiana przypisania na dodawanie to zadanie, które przejdzie niemal każdy model, więc nie wiemy, gdzie ten zestaw się łamie. Dla frontendowca ciekawsze byłoby zadanie w komponencie Reacta z zależnościami z node_modules i testami w przeglądarce, bo to środowisko jest znacznie cięższe niż skrypt z biblioteką standardową. Przydatne jest też ostrzeżenie o pamięci, bo kontekst 64 tysięcy tokenów plus otwarta przeglądarka potrafią zjeść cały zapas.

**Link:** [Offline coding](https://lspace.beehiiv.com/p/offline-coding)
