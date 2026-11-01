---
title: "Dlaczego konwerter szesnastkowy kłamie: uzupełnienie do dwóch, bariera 53 bitów i system o podstawie 36"
excerpt: "Tekst z HackerNoon o tym, jak zamiana systemów liczbowych łączy się ze znakiem liczby w rejestrze, przesunięciami bitowymi i utratą precyzji w JavaScripcie."
publishedAt: "2026-11-01"
slug: "hackernoon-konwerter-szesnastkowy-uzupelnienie-do-dwoch-bariera-53-bitow"
hashtags: "#hackernoon #javascript #typescript #engineering #generated #pl"
source_pattern: "HackerNoon"
---

## Dlaczego konwerter szesnastkowy kłamie

**TLDR:** Autor tłumaczy, skąd bierze się 0xFF dla ujemnej jedynki, czym różni się przesunięcie arytmetyczne od logicznego i dlaczego JavaScript po cichu psuje liczby większe niż 2 do potęgi 53. Rozwiązaniem dla dużych identyfikatorów jest BigInt.

**Summary:** Punktem wyjścia jest znana scena z debugowania: ośmiobitowa minus jedynka pokazuje się jako 0xFF, a po rozszerzeniu do rejestru 32-bitowego jako 0xFFFFFFFF. Powód to uzupełnienie do dwóch. Najstarszy bit ma w nim ujemną wagę, a rozszerzenie do szerszego typu kopiuje ten bit na wszystkie nowe pozycje. Gdyby procesor dopełniał zerami, wartość zmieniłaby się po cichu na plus 255. Autor podaje przy okazji prostą regułę przy czytaniu zrzutów pamięci: jeśli szesnastkowa liczba zaczyna się od cyfry od 8 do F, w kontekście ze znakiem jest ujemna.

Drugi wątek to przesunięcia bitowe w JavaScripcie. Przesunięcie arytmetyczne zachowuje bit znaku, a logiczne zawsze dopełnia zerami, więc minus 42 przesunięte o jeden daje raz minus 21, a raz ponad dwa miliardy. W telemetrii, haszowaniu i deserializacji protokołów pomyłka między tymi operatorami przechodzi testy jednostkowe, jeśli używają małych liczb dodatnich.

Trzeci wątek to bariera 53 bitów. Number w JavaScripcie to liczba zmiennoprzecinkowa podwójnej precyzji, więc każda liczba całkowita powyżej największej bezpiecznej wartości jest zaokrąglana do najbliższej możliwej. Identyfikator 64-bitowy, taki jak snowflake, przepuszczony przez zwykłą konwersję traci najmłodsze bity bez żadnego błędu. Autor wskazuje BigInt jako lekarstwo, a na koniec chwali system o podstawie 36 jako zwarty, niewrażliwy na wielkość liter i bezpieczny w adresach URL, w odróżnieniu od base64.

**Key takeaways:**
- 0xFF to 255 bez znaku i minus 1 w rejestrze ze znakiem, więc zawsze sprawdzaj typ.
- W JavaScripcie operatory bitowe działają na 32-bitowych liczbach ze znakiem.
- Identyfikatorów 64-bitowych nie parsuj przez parseInt ani Number, tylko przez BigInt albo jako tekst.

**Why do I care:** Problem z 53 bitami widziałem w prawdziwych API, gdzie identyfikator przychodził jako liczba w JSON i kończył jako inny rekord. Rozwiązanie jest nudne: identyfikatory przesyłaj jako stringi i nigdy jako liczby. Tekst jest poprawny technicznie, ale autor pomija najczęstszy w praktyce scenariusz, czyli parsowanie JSON, w którym sam JSON.parse robi tę szkodę, zanim dotkniesz BigInt. Na końcu jest też reklama własnego narzędzia, którą traktuję jako tło.

**Link:** [Why Your Hex Converter Lies to You: Two's Complement, the 53-Bit Wall, and Radix Magic](https://hackernoon.com/why-your-hex-converter-lies-to-you-twos-complement-the-53-bit-wall-and-radix-magic)
