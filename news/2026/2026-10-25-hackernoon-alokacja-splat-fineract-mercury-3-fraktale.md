---
title: "Gdzie trafia 100 euro spłaty kredytu, Mercury 3 kontra szybkie modele i generator fraktali w przeglądarce"
excerpt: "Alokacja spłat w Apache Fineract jako problem inżynierii produktów finansowych, test szybkości i kosztu dyfuzyjnego modelu Mercury 3 oraz mały generator fraktali w jednym pliku HTML."
publishedAt: "2026-10-25"
slug: "hackernoon-alokacja-splat-fineract-mercury-3-fraktale"
hashtags: "#hackernoon #architecture #ai #llm #performance #testing #javascript #generated #pl"
source_pattern: "HackerNoon"
---

## Pożyczkobiorca płaci 100 euro. Gdzie idą pieniądze?

**TLDR:** Autor, współtwórca Advanced Payment Allocation w Apache Fineract, pokazuje, że kolejność zaliczania wpłaty na raty, odsetki, opłaty i kary to polityka finansowa zakodowana w oprogramowaniu. Nazywa to inżynierią produktów finansowych.

**Summary:** Pytanie brzmi niewinnie: klient wpłaca sto euro, co zmniejszyć najpierw? Zaległy kapitał, odsetki, opłatę, karę, bieżącą ratę, a może przyszłe? Każdy kredytodawca odpowie inaczej, a system musi tę odpowiedź zamienić na deterministyczne zachowanie. Dawniej takie reguły siedziały na sztywno w predefiniowanych strategiach spłat, więc każda nowa kolejność oznaczała nowy kod. Advanced Payment Allocation z Fineract 1.9.0 pozwala je konfigurować osobno dla typu transakcji.

Autor zwraca uwagę, że konfigurowalność nie może oznaczać mglistości. Trzeba rozróżnić, do której raty trafiają pieniądze, i do którego składnika. Trzeba też rozstrzygnąć, czy najpierw w całości spłacamy najstarszą ratę, czy najpierw wszystkie kary z wszystkich rat. Nadpłata może iść na następną ratę, ostatnią albo być rozłożona na przyszłe. To nie są kosmetyczne wybory, bo dają różne wyniki finansowe.

Druga ważna myśl to chronologia. Gdyby system przeliczał pożyczkę od nowa i wpłata z 10 stycznia zachowywała się tak, jakby opłata z 15 stycznia już istniała, przepisałby historię finansową. Dlatego transakcje i opłaty przetwarza się w kolejności czasowej. Pożyczka jest więc maszyną stanów, a nie polem z saldem. Zmiana reguł na poziomie produktu dotyczy nowych kont, a istniejące zachowują stare zasady, co robi z konfiguracji problem wersjonowania.

**Key takeaways:**
- Kolejność alokacji spłat to polityka finansowa, nie szczegół techniczny.
- Konfigurowalność w finansach wymaga ścisłego słownika, nie nieograniczonej elastyczności.
- Przetwarzanie w porządku chronologicznym chroni historię przy korektach i cofnięciach.
- Testy powinny opisywać cykl życia pożyczki, a nie pojedyncze wyliczenie.

**Why do I care:** Dla frontendowca to opowieść o tym, że pole "kolejność" w panelu administracyjnym bywa najdroższym polem w systemie. Jeśli budujesz UI do takiej konfiguracji, musisz pokazać użytkownikowi skutek przykładowej wpłaty, a nie tylko listę priorytetów. Tekst jest też trochę własną reklamą nowej dyscypliny i autor nie pokazuje, ile razy reguły naprawdę się zmieniły w produkcji, więc "ewolucja" zostaje deklaracją.

**Link:** [A Borrower Pays €100. Where Does the Money Go?](https://hackernoon.com/a-borrower-pays-euro100-where-does-the-money-go)

## Model, który obiecał pokonać GPT-6, ma zaskakującą słabość

**TLDR:** Test Mercury 3 od Inception Labs na 637 zadaniach z kodu i agencie SQL pokazuje, że jest szybszy od szybkich modeli dużych firm, ale nie najszybszy i nie najtańszy za poprawną odpowiedź. Na wyższych ustawieniach rozumowania potrafi myśleć bez końca.

**Summary:** Mercury 3 to dyfuzyjny model językowy, który zamiast pisać token po tokenie rafinuje wiele tokenów równolegle. Autor wydał około 34 dolarów na ponad 48 tysięcy wywołań i porównał go z Claude Haiku 5.5, GPT-6 Luna, Gemini 3.5 Flash-Lite oraz gpt-oss-120b na układach Cerebras jako grupą kontrolną.

W generowaniu kodu Mercury 3 na ustawieniu low zdaje 86 procent zadań przy medianie 0,83 sekundy, co remisuje z Haiku bez myślenia. Jednak gpt-oss na Cerebras daje 84,9 procent w 0,34 sekundy i streamuje około 2,7 raza szybciej. Wniosek autora: mierzy się produkt, czyli model razem z infrastrukturą, a nie samą architekturę dyfuzyjną.

W agencie SQL Mercury kończy zadanie w około dwie sekundy, szybciej niż Haiku, Gemini i Luna. Haiku jest wolniejszy na wywołanie, ale potrzebuje mniej tur, około 3,2 wobec 5,1, więc różnica na zadaniu jest mniejsza. Koszt za poprawną odpowiedź też wypada gorzej, niż sugeruje cena za token, a najtańsza jest Luna bez rozumowania. Najdziwniejsze odkrycie to ustawienia medium i high, gdzie w 7,5 do 8,6 procent wywołań model rozumuje po cichu aż do limitu 32 768 tokenów i nie zwraca nic. Te przebiegi pochłonęły 61 procent wszystkich tokenów wyjściowych.

**Key takeaways:**
- Mercury 3 jest wyraźnie szybszy od szybkich modeli Anthropic, Google i OpenAI, ale nie od gpt-oss na Cerebras.
- W agentach liczy się liczba tur, nie tylko czas jednego wywołania.
- Wyższe ustawienia rozumowania pogarszają wynik kodu, od 86,0 do 81,4 procent.
- Tryb ścisłego JSON-a psuł format w 6 na 150 zadań.

**Why do I care:** Jeśli wybierasz model do pętli agenta w produkcie, rób benchmark na własnym zadaniu i mierz czas całego zadania oraz koszt poprawnej odpowiedzi. Praktyczna rada autora, czyli low albo instant, jest rozsądna. Uwaga krytyczna: jedna maszyna, jeden region, jeden dzień i 150 pytań SQL z błędem rzędu 7 do 8 punktów. Autor sam to przyznaje, więc nie koronowałbym nikogo w agencie.

**Link:** [The AI Model That Promised to Crush GPT-6 Has a Surprising Weakness](https://hackernoon.com/the-ai-model-that-promised-to-crush-gpt-6-has-a-surprising-weakness)

## Wpisz wzór, zobacz sztukę: generator fraktali w przeglądarce

**TLDR:** Jednoplikowa aplikacja HTML pozwala wpisać wzór na funkcję zespoloną, wybrać zbiór Mandelbrota lub Julii, wyrenderować obraz na canvasie i pobrać go jako PNG albo SVG.

**Summary:** Aplikacja korzysta z biblioteki math.js, która kompiluje wpisany wzór, na przykład kwadrat z plus c. Dla każdego piksela iteruje funkcję, aż wartość ucieknie poza promień, a liczba iteracji wybiera kolor z jednej z czterech palet. Kliknięcie w obraz powiększa go dwukrotnie wokół wybranego punktu.

Warto zauważyć, że eksport do SVG to tylko osadzony obraz PNG w znaczniku SVG, więc nie jest to grafika wektorowa. Obliczenia idą w głównym wątku, piksel po pikselu, z oceną wyrażenia przez math.js za każdym razem, co przy większych obrazach będzie wolne.

**Key takeaways:**
- Zbiory Mandelbrota i Julii z dowolnym wzorem w jednym pliku HTML.
- Eksport SVG nie jest wektorowy.
- Render w głównym wątku ogranicza rozmiar obrazu.

**Why do I care:** To zabawka, ale dobry temat na przeniesienie obliczeń do Web Workera albo shadera, jeśli ktoś chce zrobić z tego coś więcej. Autor nie mówi o wydajności ani o dostępności, a przycisk z "SVG" bez wektorów trochę wprowadza w błąd.

**Link:** [Type a Formula, Render Art: Build an Interactive Fractal Generator in 2026](https://hackernoon.com/type-a-formula-render-art-build-an-interactive-fractal-generator-in-2026)
