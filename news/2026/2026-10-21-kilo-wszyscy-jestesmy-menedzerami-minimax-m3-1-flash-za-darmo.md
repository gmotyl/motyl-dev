---
title: "Kilo: wszyscy jesteśmy teraz menedżerami agentów i MiniMax M3.1 Flash za darmo"
excerpt: "Esej o tym, jak zmieniają się role dokumentacji i QA, oraz premiera taniego modelu flash dostępnego w Kilo bez opłat."
publishedAt: "2026-10-21"
slug: "kilo-wszyscy-jestesmy-menedzerami-minimax-m3-1-flash-za-darmo"
hashtags: "#kilo #ai #agents #management #testing #llm #generated #pl"
source_pattern: "Kilo"
---

## Wszyscy jesteśmy teraz menedżerami

**TLDR:** Gdy agenci robią więcej pracy taktycznej, zespoły dokumentacji i QA mają przejść od pisania stron i klikania testów do budowania systemu, w którym ta praca powstaje.

**Summary:** Autor wychodzi od tezy ze swojego wystąpienia w Budapeszcie: inżynier powinien odpowiadać za więcej, czyli kod, pierwszą wersję projektu, testy, dokumentację i zgłoszenia klientów. Jeśli inżynier jest menedżerem agentów, to jest nim w wielu funkcjach naraz, co zmniejsza liczbę przekazań.

W dokumentacji codzienny opis funkcji ma trafić do inżyniera, a zespół piszących zajmuje się architekturą informacji: co jest samouczkiem, co referencją, jak pomóc klientowi wybrać podejście. Dwadzieścia poprawnych stron funkcji może razem tworzyć niezrozumiałą całość. Zespół ma też budować prymitywy dla ludzi i agentów: szablony stron, konwencje dla przykładów i rozwiązywania problemów, instrukcje dla agentów oraz sprawdzanie zepsutych linków i nieprawidłowych przykładów. Ta "fabryka dokumentacji" potrzebuje pętli zwrotnej: gdzie klienci się gubią i jakie pytania wracają do supportu mimo istnienia strony.

QA podobnie: ma budować środowiska testowe, dane i powtarzalne sposoby sprawdzania typowych przepływów, a także zadawać pytania o interakcje funkcji i dane klientów przy aktualizacji. Autor zaznacza, że liderzy muszą zmienić oceny: nie można prosić o lepszy system i mierzyć tylko liczby napisanych stron albo ręcznych akceptacji. Zastrzeżenie: tekst pochodzi od firmy sprzedającej narzędzie agentowe i na początku zawiera ofertę dla klientów Cursor Enterprise, a nie przedstawia danych o skutkach takiej zmiany.

**Key takeaways:**
- Dokumentacja i QA przechodzą do projektowania systemu i jego zabezpieczeń.
- Samo generowanie szkiców przez inżynierów tworzy tylko dłuższą kolejkę do redakcji.
- Liderzy muszą zmienić kryteria oceny tych zespołów.

**Why do I care:** Dla frontendowca to zapowiedź, że testy własnych zmian i dokumentacja komponentów spadną na nas, a pomoc przyjdzie w postaci szablonów i sprawdzeń, nie ludzi do przekazania zadania. Autor nie rozstrzyga, co z jakością, gdy zespół QA się kurczy.

**Link:** [Everyone is a manager now](https://blog.kilo.ai/p/everyone-is-a-manager-now)

## MiniMax M3.1 Flash za darmo w Kilo

**TLDR:** Nowy model MiniMax jest wielomodalny, tani i przez ograniczony czas darmowy w Kilo. Wyniki są własne producenta i słabsze w części zadań kodowania.

**Summary:** M3.1 Flash to model mixture-of-experts z 428 miliardami parametrów łącznie i około 23 miliardami aktywnych, z rzadką uwagą, która przy kontekście miliona tokenów obniża koszt na token około 20 razy względem poprzedniej generacji. Wcześniej działał pod nazwą Space Bunny i przetworzył ponad 50 bilionów tokenów, zanim ujawniono, czym jest. Producent obiecuje 70 procent niższy koszt zadań agentowych, jedną trzecią ceny M3 i trzykrotnie większą szybkość. Cena to 0,15 dolara za milion tokenów wejścia i 0,60 za wyjście.

Wyniki własne: 62,2 w Automation-Bench, przed Opus 5 z 50,3, 73,7 w DeepSWE, ale tylko 38,1 w Terminal Bench 4.0. Niezależny Artificial Analysis daje indeks inteligencji 42,7 i dla Terminal-Bench tylko 25,8 procent, więc autor radzi ostrożność wobec liczb producenta. W porównaniu z Gemini 3.8 Flash, który ma 59 punktów i znacznie większą szybkość, M3.1 jest około pięć do sześciu razy tańszy, ale wolniejszy, około 82 tokenów na sekundę. Wniosek tekstu: flash staje się domyślną warstwą dla agentów działających stale, a konkurencja przesuwa się na koszt zadania i stabilność w długich pętlach narzędzi. To post producenta platformy, który zachęca do wypróbowania modelu.

**Key takeaways:**
- Model ma 428 miliardów parametrów, 23 miliardy aktywnych i okno miliona tokenów.
- Wyniki są samodzielnie raportowane, a niezależny pomiar Terminal-Bench jest wyraźnie niższy.
- Gemini 3.8 Flash jest mądrzejszy i szybszy, M3.1 Flash tańszy.

**Why do I care:** Do podagentów wykonujących proste, masowe zadania tani model ma sens, ale do planowania nie. Sprawdź go na własnych zadaniach, bo różnica między wynikiem producenta a niezależnym pomiarem to prawie 13 punktów procentowych.

**Link:** [MiniMax M3.1 Flash Is Free in Kilo for a Limited Time](https://blog.kilo.ai/p/minimax-m31-flash-is-free-in-kilo)
