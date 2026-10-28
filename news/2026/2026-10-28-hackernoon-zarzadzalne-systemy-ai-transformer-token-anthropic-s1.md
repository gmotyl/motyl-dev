---
title: "HackerNoon: zarządzalne systemy AI, ścieżka tokenu przez warstwy transformera i S-1 Anthropic"
excerpt: "Eseje o tym, że bezpieczeństwo AI to cecha systemu, o trajektorii reprezentacji tokenu w Pythii i o danych z wniosku S-1 Anthropic."
publishedAt: "2026-10-28"
slug: "hackernoon-zarzadzalne-systemy-ai-transformer-token-anthropic-s1"
hashtags: "#HackerNoon #ai #llm #agents #security #ml #architecture #generated #pl"
source_pattern: "HackerNoon"
---

## Bezpieczeństwo korporacyjnego AI to problem systemu, nie modelu

**TLDR:** Model może przejść każdy test bezpieczeństwa, a system dookoła nadal jest niebezpieczny. Autor proponuje cztery cechy systemu zarządzalnego i test pięciu pytań.

**Summary:** Przez dwa lata debata o bezpieczeństwie AI dotyczyła modeli: benchmarków, red teamingu i rankingów. Tymczasem firmy podpinają bezpieczny model do produkcyjnej bazy z uprawnieniami admina, dają mu wysyłkę maili w imieniu firmy i nie potrafią odtworzyć, co zrobił w zeszły wtorek. Autor porównuje to do certyfikowanego silnika w samochodzie bez hamulców.

Zarządzalność to cztery cechy. System ma być obserwowalny, czyli każdy istotny krok agenta jest logowany razem z kontekstem. Ma być ograniczalny, czyli polityka działa przed akcją, a nie po niej. Ma być odwracalny, więc każda zmiana stanu ma ścieżkę wycofania. Ma być rozliczalny, co znaczy, że człowiek odpowiada na pytanie, dlaczego agent to zrobił i kto zatwierdził jego uprawnienia.

Test składa się z pięciu pytań. Czy widzisz wszystko, co zrobił? Czy możesz go zatrzymać w trakcie? Czy możesz cofnąć skutki? Czy umiesz wyjaśnić decyzję? Czy postawiłbyś na te odpowiedzi swoją pracę? Większość zespołów zdaje benchmarki modelu, ale nie zatrzymanie i cofnięcie. Przy wyborze dostawcy autor radzi pytać o log audytowy, model uprawnień i historię wycofywania, a nie tylko o wyniki testów.

**Key takeaways:**
- Bezpieczny model w niezarządzalnym systemie nadal jest zagrożeniem.
- Cztery cechy: obserwowalność, ograniczalność, odwracalność, rozliczalność.
- Kill switch to nie spotkanie ani zgłoszenie w systemie ticketów.
- Zarządzalność deklaruje się per narzędzie, zanim agent cokolwiek uruchomi.

**Why do I care:** Zgadzam się z tezą i widzę ją w projektach, gdzie agent dostaje szeroki token i nikt nie pyta o undo. Autor jednak nie mówi, ile kosztuje odwracalność dla akcji, których z natury nie da się cofnąć, jak wysłany mail albo przelew. Warto też pamiętać, że to esej własny, bez danych z wdrożeń.

**Link:** [Enterprise AI Has a Safety Problem That Better Models Alone Can't Fix](https://hackernoon.com/enterprise-ai-has-a-safety-problem-that-better-models-alone-cant-fix)

## Śledzenie reprezentacji tokenu przez warstwy transformera

**TLDR:** Autor śledzi słowo light przez Pythię-160M w sześciu kontekstach i pokazuje, że różne miary odległości pokazują różne obrazy. Drugi eksperyment porównuje wybór etykiety w JEV z generowaniem etykiet przez Claude Haiku 4.5 i GPT-4.1 nano.

**Summary:** Embedding w tablicy jest taki sam dla danego tokenu bez względu na zdanie. Kontekst pojawia się dopiero w kolejnych obliczeniach. Autor ustala token i pozycję, zmienia poprzedzające słowa, trzy o ciężarze i trzy o kolorze, i zapisuje stan po każdym bloku. Mierzy podobieństwo kosinusowe, odległość euklidesową i normy.

Rozdzielenie grup zaczyna się około trzeciego stanu, najsilniejsze w kosinusie jest w szóstym i utrzymuje się do jedenastego. W ostatnim stanie podobieństwo kosinusowe między grupami niemal się wyrównuje, a surowa odległość euklidesowa rośnie, bo normy wektorów rosną mniej więcej dziewięciokrotnie. To nie jest sprzeczność, bo euklides miesza skalę i kierunek. Autor zaznacza, że to nie dowodzi rozumienia znaczenia, a sześć kontekstów nie pozwala uogólniać.

W drugiej części, na zbiorze BANKING77, Claude zrobił 159 trafień ze 160 w zadaniu z czterema kategoriami, JEV 157, a GPT 142. W zadaniu z ośmioma kategoriami JEV miał najwyższą ścisłą dokładność. Claude zwrócił 22 etykiety spoza słownika, głównie bez znaku zapytania na końcu jednej z etykiet, więc jego poprawność formatu wyniosła 93,13 procent. Po normalizacji dokładność Claude'a wzrosła do 90,94 procent. JEV miał najdłuższy średni czas odpowiedzi.

**Key takeaways:**
- Hidden state nie jest "embeddingiem tokenu", tylko jedną reprezentacją w jednym punkcie obliczeń.
- Różne miary odległości mogą dawać różne wnioski.
- Poprawność i poprawność formatu to osobne wskaźniki.
- Porównanie nie izoluje wpływu samego interfejsu wyjścia, bo modele są różne.

**Why do I care:** Dla architekta zapamiętania warte są dwa wnioski. Po pierwsze, metryka to założenie inżynierskie. Po drugie, w zadaniach klasyfikacji format wyjścia jest częścią systemu. Trzeba jednak pamiętać, że to wpis o JEV, a porównanie obejmuje małe zbiory i osobne uruchomienia, więc czasy nie są czyste.

**Link:** [Tracing Contextual Token Representations Through Transformer Layers](https://hackernoon.com/tracing-contextual-token-representations-through-transformer-layers)

## S-1 Anthropic: 16,3 mld dolarów przychodu w pół roku

**TLDR:** Publiczny formularz S-1 trafił do EDGAR 26 października 2026. Pokazuje 16,3 mld dolarów przychodu w pierwszej połowie 2026 i stratę netto 80,7 mld dolarów, która według autora w większości jest rachunkowa.

**Summary:** Artykuł podaje, że retencja netto przychodów wynosi około 900 procent, a przychód na pracownika przekracza 6,6 mln dolarów. Greg Isenberg zwrócił uwagę, że dobre firmy SaaS chwalą się 120 procentami, a Cowork rośnie szybciej niż Claude Code. Prawie połowa przychodów przechodzi przez marketplace'y chmurowe.

Autor zastrzega, że liczby bierze z wniosku tam, gdzie to możliwe, a luki uzupełnia doniesieniami o wyciekach i prezentacjach dla inwestorów. Przeczytałem tylko początek tego tekstu, więc nie opisuję tu jego dalszych wniosków o wycenie.

**Key takeaways:**
- 16,3 mld dolarów przychodu w pierwszym półroczu 2026.
- Retencja netto około 900 procent.
- Strata netto 80,7 mld dolarów to w większości efekt księgowy.

**Why do I care:** To wiadomość biznesowa, ale ma znaczenie dla deweloperów, bo mówi o stabilności dostawcy, na którym wielu opiera produkty. Podchodziłbym ostrożnie do liczb z wtórnych źródeł.

**Link:** [Anthropic's S-1 Shows $16.3B in Half-Year Revenue](https://hackernoon.com/anthropics-s-1-shows-$163b-in-half-year-revenue-a-900percent-nrr-and-an-$807b-loss-that-mostly-isnt)
