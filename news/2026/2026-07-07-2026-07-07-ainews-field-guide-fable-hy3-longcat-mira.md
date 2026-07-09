---
title: "Field Guide to Fable: jak odblokować nowy model Claude i co jeszcze dzieje się w AI"
excerpt: "Thariq z Kilo zebrał praktyczne techniki pracy z Claude Fable 5, w tym koncepcję odblokowania modelu przez zmianę harness'u. Plus: Tencent Hy3 na Apache 2.0, LongCat 2.0 z 1,6T parametrami i MIRA, grywalny world model Rocket League."
publishedAt: "2026-07-07"
slug: "2026-07-07-ainews-field-guide-fable-hy3-longcat-mira"
hashtags: "#ai #llm #agents #prompt-engineering #open-source #generated #pl"
source_pattern: "AINews"
---

## Field Guide to Fable: cztery techniki pracy z nowym Claude

**TLDR:** Thariq przygotował przewodnik po efektywnej pracy z Claude Fable 5, skupiający się na czterech obszarach: usunięciu ograniczeń harness'u, znajdowaniu nieznanych niewiadomych, przeżywaniu produktywnościowego przełomu i żądaniu wyników bez kompromisów.

Najbardziej interesującą koncepcją w przewodniku jest "unhobbling", czyli odblokowanie modelu. Argument jest taki: ograniczenia na zachowanie modelu często nie wynikają z jego rzeczywistych możliwości, lecz z harnessu, czyli instrukcji systemowych, promptów i struktury rozmowy, którą nałożyliśmy. Kiedy pojawia się nowa klasa modeli, pierwszym instynktem powinno być zadanie pytania: które z moich dotychczasowych założeń o tym, jak model reaguje na różne formaty wejściowe, są teraz nieaktualne?

Konkretny przykład: unreasonable effectiveness of HTML. Wielu użytkowników Claude zauważyło, że prośba o output w formacie HTML zamiast Markdown często daje znacznie lepsze, bardziej ustrukturyzowane wyniki. To nie jest oficjalna funkcja, to odkrycie przez eksperymentowanie. Jeśli używasz Claude Fable 5 z tymi samymi promptami co poprzednią generację, możliwe że celowo hamujesz model, który jest w stanie zrobić znacznie więcej.

Drugi obszar to znajdowanie nieznanych niewiadomych. Thariq proponuje kilka konkretnych technik: poproś Claude o "blindspot pass", żeby zidentyfikował co pominąłeś w swoim planie; poproś o "wildly different design directions", żeby wyjść poza pierwsze oczywiste rozwiązanie; używaj trybu "interview me" gdzie model zadaje Ci pytania wysokiego wpływu zamiast od razu odpowiadać; prowadź plik implementation-notes.md jako bieżący log niedookreślonych decyzji podjętych przez model w Twoim imieniu.

Trzecia sekcja dotyczy zmiany mentalnej w podejściu do produktywności. To co zajmowało tygodnie, teraz zajmuje godziny. Thariq traktuje to jak proces żałoby, do przepracowania, nie do ignorowania. Wreszcie, Thariq argumentuje za "being unreasonable", czyli żądaniem jednocześnie dobrego, szybkiego i taniego. Fable jest wystarczająco zdolny, żeby odrzucić dichotomię tradeoff'ów, które poprzednie modele wymuszały. Tradeoffs are not real. Building is easy, generating value is still hard.

**Key takeaways:**
- Unhobbling: zidentyfikuj, które harnesses i prompty celowo ograniczają Fable 5 w porównaniu do jego rzeczywistych możliwości
- HTML output zamiast Markdown często daje lepsze wyniki dzięki innej strukturze wyjścia
- Fable jest wystarczająco zdolny żeby odmówić banalnych kompromisów, żądaj więcej

**Why do I care:** Jako ktoś, kto intensywnie pracuje z Claude i buduje systemy oparte na Claude API, koncepcja unhobblingu jest naprawdę ważna. Mam skłonność do kopiowania sprawdzonych wzorców promptingu między modelami. Fable to inna klasa modelu i traktowanie go jak poprzedniej generacji prawdopodobnie zostawia dużo wartości na stole. Warto systematycznie testować assumption'y, które nabyłem przy poprzednich modelach.

**Link:** [AINews: The Field Guide to Fable](https://www.latent.space/p/ainews-the-field-guide-to-fable)

## Tencent Hy3 na Apache 2.0, LongCat 2.0 z 1,6T parametrów, MIRA gra w Rocket League

**TLDR:** Równolegle z Fable 5 od Anthropic, świat open-source LLM miał intensywny tydzień: Tencent Hy3 wyszedł jako pełny open-weight model, LongCat 2.0 od Meituan osiągnął 1,6 biliona parametrów na chińskich chipach, a General Intuition i Epic Games zaprezentowali grywalny world model dla Rocket League.

Tencent Hy3 na Apache 2.0 to konkretna wiadomość dla zespołów, które chcą uruchamiać modele lokalnie lub self-hosted. 295 miliardów parametrów całkowitych z 21 miliardami aktywnymi na token, architektura MoE z 192 ekspertami, top-8 routing, GQA i 256K kontekst. Co ważne, vLLM dodał wsparcie dla Hy3 w dniu wypuszczenia, z tool-calling parserami, speculative decoding MTP i zoptymalizowanymi kernelami FP8, które dają do 2,95x przyspieszenia na mixed-length decode.

LongCat 2.0 od Meituan to inna skala: 1,6 biliona parametrów całkowitych z około 48 miliardami aktywnymi, licencja MIT i, co ważne, model był trenowany na w pełni chińskich chipach. Pliki modelu zajmują 3,55TB w BF16 lub 2,05TB w FP8. To nie jest model dla większości usecase'ów, ale jako sygnał geopolityczny, że Chiny budują zdolności AI niezależne od hardware NVIDIA, jest znaczący.

Najciekawszą demonstracją tygodnia był jednak MIRA. General Intuition i Kyutai we współpracy z Epic Games stworzyli grywalny world model dla Rocket League, trenowany na 10 tysiącach godzin danych zebranych przez boty. Model 5B parametrów potrafi w czasie rzeczywistym, przy 20 fps, uruchamiać całe mecze 2 na 2 na pojedynczym NVIDIA B200. Nie ma fizyki, nie ma silnika renderującego, model bezpośrednio generuje każdą klatkę na podstawie stanu gry. To nie jest demo badawcze, to demonstracja, że interaktywne symulatory oparte na video world models są realnym kierunkiem.

W obszarze infrastruktury, Cloudflare wypuścił Workers Cache z regionalnie tierowanym cach'em, OpenAI dodało GPT-Realtime-2.1-mini z reasoning i tool use w mini realtime line przy tym samym cenniku co poprzednik, a John Carmack argumentował w interesującym wątku, że inference hardware mógłby efektywnie korzystać z tańszych warstw pamięci niż HBM dla dużych modeli.

**Key takeaways:**
- Hy3 (295B MoE, Apache 2.0) dostępny w vLLM od dnia wypuszczenia z pełnym wsparciem tool-calling i speculative decoding
- LongCat 2.0 (1,6T parametrów, MIT) trenowany na chińskich chipach sygnalizuje niezależność hardware'ową
- MIRA: grywalny world model Rocket League na 5B parametrach przy 20fps bez fizyki ani silnika graficznego

**Why do I care:** Tygodnie jak ten przekonują mnie, że "który model jest najlepszy" to coraz mniej użyteczne pytanie. Hy3 jest konkurencyjny z zamkniętymi flagowcami i działa self-hosted. LongCat 2.0 pokazuje, że ekosystem otwartych modeli rozwija się niezależnie od polityki eksportowej USA. MIRA pokazuje, że world models przesuwają się od nauki ku interaktywnym zastosowaniom. Jeśli Twoja architektura zakłada stały zestaw providerów lub klas modeli, warto zaprojektować abstrakcję, która umożliwia zamianę.

**Link:** [AINews: The Field Guide to Fable](https://www.latent.space/p/ainews-the-field-guide-to-fable)
