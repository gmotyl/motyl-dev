---
title: "Claude Fable 5 wraca, Google przyspiesza generację wideo, DeepSeek otwiera DSpark"
excerpt: "Trzy duże tematy tego tygodnia: geopolityczne zawirowania wokół modeli Anthropic, nowe tanie API do generowania obrazu i wideo od Google, oraz przełomowa technika DeepSeek'a przyspieszająca inferencję o ponad 50%."
publishedAt: "2026-07-10"
slug: "claude-fable-5-wraca-google-wideo-deepseek-dspark"
hashtags: "#thebatch #ai #ml #anthropic #gemini #deepseek #braincomputer #speculative-decoding #generated #pl"
source_pattern: "The Batch"
---

## Powrót Claude Fable 5 i polityczne konsekwencje

**TLDR:** Anthropic przywróciło dostęp do Claude Fable 5 i Mythos 5 po trwającym trzy tygodnie zawieszeniu narzuconym przez Departament Handlu USA. Modele wróciły z dodatkowymi ograniczeniami bezpieczeństwa, ale nie bez kontrowersji.

**Summary:** To była jedna z najbardziej dramatycznych sytuacji w historii branży AI. Cała sprawa zaczęła się spokojnie: w czerwcu Anthropic wypuściło Claude Fable 5 dla klientów na całym świecie. Model miał guardrails blokujące pewne zapytania dotyczące cyberbezpieczeństwa i badań biologicznych. Kontrowersją samą w sobie był fakt, że model celowo "degradował" swoje odpowiedzi na temat budowania potężnych systemów AI.

Potem sytuacja eskalowała błyskawicznie. Badacze z Amazona zdołali wyciągnąć z Claude Fable 5 informacje o tym, jak przeprowadzić cyberatak. Departament Handlu USA wydał dyrektywę zawieszającą dostęp do modeli Fable 5 i Mythos 5 dla wszystkich obcokrajowców, niezależnie od miejsca zamieszkania, powołując się na kwestie bezpieczeństwa narodowego. Tego samego dnia Anthropic wyłączyło dostęp dla wszystkich użytkowników na świecie. Zupełnie bez ostrzeżenia, zupełnie bez przejrzystego procesu.

Warto zauważyć, że Anthropic ma mocny argument w tej sprawie: firma twierdzi, że każdy wystarczająco zdolny model, w tym ich własny Claude Opus 4.8 i modele innych dostawców, mógłby zidentyfikować tę samą lukę i wygenerować exploit. Czyli de facto mamy sytuację, w której jeden model jest karany za zdolności, które mają też inne modele.

Po kilku tygodniach negocjacji z rządem i wdrożeniu dodatkowych guardrails, dostęp został przywrócony 1 lipca. Ale nie bez kosztów. Użytkownicy natychmiast zaczęli raportować, że model jest bardziej ograniczony niż przed zawieszeniem: podstawowe pytania z dziedziny nauk biologicznych są cenzurowane, zadania programistyczne są bardziej restrykcyjne. Anthropic przyznało, że pewne rutynowe zadania kodowania będą przekierowywane do Opus 4.8, ale firma obiecuje w najbliższych tygodniach "lepiej rozróżniać prawdziwe nadużycia od uzasadnionych zapytań". Widziałem takie obietnice wiele razy.

OpenAI też znalazło się pod rządową lupą: nowe modele z rodziny GPT-5.6 były poprzedzone obowiązkowym rządowym podglądem możliwości technologii przed szerszym wydaniem.

**Key takeaways:**
- Rząd USA po raz pierwszy w historii wywołał zawieszenie powszechnego dostępu do modelu AI, tworząc precedens dla przyszłych wydań
- Anthropic wraca z Claude Fable 5 z bardziej restrykcyjnymi guardrails, które użytkownicy już zauważają w praktyce
- Wzrasta presja regulacyjna na firmy AI, co może skłaniać inne kraje do rozwijania własnych modeli frontierowych lub szukania mniej restrykcyjnych partnerów

**Why do I care:** Jako deweloper budujący aplikacje na bazie API modeli językowych, to jest właśnie ten scenariusz, którego się bałem. Model, na którym bazujesz twoje produkty, może zniknąć z dnia na dzień decyzją rządową. To fundamentalne ryzyko biznesowe, które wielu budowniczych ignoruje. Dywersyfikacja providerów przestała być opcją, a stała się koniecznością. Poza tym degradacja możliwości modelu po powrocie bez przejrzystej komunikacji to kolejny problem: twoje prompty, które działały przed zawieszeniem, mogą nie działać tak samo po.

**Link:** [The Batch - Fable's Return and Fallout](https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/MVQkk_2Pq7PW8fqk847R9NxFW1c61D75RhMBcN4Yn9Pg5nR3bW8wM7ks6lZ3mKW3zrt5_5bKZvLW5tD1Dy1FQ2QRW84D7B51BtdQGW4YpQ1Y5P10p1W261jgc6RQtQvW5sWNy08w7G-pN2qYCKKFD9YJW4HwK7r1y270xW2RFp9g4BrTR1N3DY4fxrCQ0fW27fYZL6KJ7h4VMBl7G3H7ByhW1HQDDs8tmW9WW6vnzMR3q_sK1W3v1k4P1LfgN8W5R0nfn3XbrzwW3Sl8xq2Qc2nVW6t0vFq5GgrPBVWPtJG12Yw5dW8pQH2Q4xVqsSVlhjmF3VLMdNW8FqL9p6QvpGTV2SB2T8Bxk4DW4srGz66_VY5gW1VZGcW542VV7W3TFxDX2KNBCnW3q1f2B2_T6H3W43tLSZ88PZHDW1XDrjn51Xc80W5N7jxX1Lw2vLW57sbmJ5qd-vwW2bHS9v7bH9hcN4ZvcsK7lyjwVNX5Dk3xZJlnW7zlPxD4nvRVXW2XY67v74WJd5W7fn86V3SXpgbN9fjgzb5LNS9W2kHgMJ303hb-W4bNJnM4cSfCtTbmxw917vn7N1z_gfjmjJZbW9bb9HY8hC_3cW75kRH_7swBtrf4LvHvn04)

---

## Google łączy nowe API obrazu z silnikiem wideo

**TLDR:** Google wypuściło Nano Banana 2 Lite (Gemini 3.1 Flash Lite Image) i udostępniło deweloperom Gemini Omni Flash przez API. Razem tworzą tani, szybki pipeline: najpierw generujesz zdjęcie, potem zamieniasz je w klip wideo z dźwiękiem.

**Summary:** Google konsekwentnie realizuje swoją strategię "tanio i szybko". Nano Banana 2 Lite to następca oryginalnego Nano Banana i, co ciekawe, plasuje się na piątym miejscu na Image Arena mimo że kosztuje 10 centów mniej za tysiąc obrazów niż droższy Nano Banana Pro. Cena to 3,4 centa za obraz w rozdzielczości 1K, generowany w około cztery sekundy. Nie jest to poziom Hollywood, ale dla zastosowań developerskich jest bardzo sensownie.

Gemini Omni Flash to z kolei model multimodalny zdolny do generowania 720p klipów wideo do 10 sekund długości, z natywnym dźwiękiem. Model pojawił się po raz pierwszy na Google I/O w maju, dostępny początkowo tylko dla subskrybentów Gemini i YouTube Shorts, a teraz trafił do API dla deweloperów.

To co mnie naprawdę interesuje w tym ogłoszeniu, to nie same modele, ale sposób w jaki Google je łączy. Przez ten sam interfejs API możesz najpierw wygenerować obraz Nano Banana 2 Lite, a potem przekazać go jako ramkę startową do Gemini Omni Flash. Interaktywne edytowanie przez Interactions API utrzymuje historię sesji, więc każde polecenie modyfikuje poprzedni klip zamiast generować od nowa, obsługując do trzech sekwencyjnych edycji. To myślenie o kompozycji narzędzi, nie o pojedynczych możliwościach.

Na frontach benchmarkowych: Gemini Omni Flash prowadzi generowanie wideo z Elo 1527 na Video Arena i jest drugi w edytowaniu (1347 Elo), tuż za ByteDance Seedance 2.0. GPT-Image-2 od OpenAI nadal dominuje w generowaniu obrazu z Elo 1386, podczas gdy Nano Banana 2 Lite osiąga 1250.

Jednostkowa ekonomika generacji mediów właśnie fundamentalnie się zmieniła. Przy 10 centach za sekundę wideo i mniej niż 4 centach za obraz, można zacząć myśleć o generowaniu mediów jako o czymś, co dzieje się w runtime aplikacji, nie jako o kosztownym kroku produkcyjnym. Dziesięciosekundowe klipy można łączyć w dłuższe materiały. Meta podobno buduje system generowania kreacji reklamowych, w tym wideo, z obrazu produktu i budżetu.

**Key takeaways:**
- Nano Banana 2 Lite kosztuje 0,034 USD za obraz 1K i generuje go w ok. 4 sekundy, jest piąty na Image Arena
- Gemini Omni Flash oferuje 720p wideo z natywnym dźwiękiem za 0,10 USD za sekundę, prowadzi w Video Arena z Elo 1527
- Połączenie obu modeli przez jeden interfejs API pozwala na tani pipeline obraz-wideo z konwersacyjnym edytowaniem

**Why do I care:** Jako ktoś budujący aplikacje webowe, widzę tu poważną szansę na nowy rodzaj doświadczeń użytkownika. Wyobraź sobie generowanie spersonalizowanych miniaturek, animowanych banerów, czy materiałów wideo bezpośrednio w runtime na żądanie użytkownika, a nie jako preskalowane zasoby. Przy takich cenach to przestaje być science-fiction, a staje się decyzją architektoniczną. Oczywiście 720p i 10 sekund to na razie poważne ograniczenia, ale dla content automation i social media to już wystarczające parametry.

**Link:** [Google Pairs Nano Banana Update With Video API](https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/MVQkk_2Pq7PW8fqk847R9NxFW1c61D75RhMBcN4Yn9Pz3qgz0W95jsWP6lZ3lBW4nrgqC1dDljMW3MSqjt3NQTd8W1DZv1V5B_7rxW7Z21yF3RTVcWVZ2yXQ3g65gbW7BwV013GPYTBW3g-Z_x4MbvZhW8XlR332ZS7gGW20_6Gz963Vr8W8VHl7f78CKD_W5vW59W5D1cfMW6RFnPV7pzh8vW2QYtMG2SjgSVW45HnpL8J0W9qW5ShjPw5tlgNlW75XSsb3PKlZfW4vv8R37qK1ySN4FCnkpyZSVYN7HQR2B6Hc9pW5Bz5L931MmVMW7Mlz2_7gk70zW7p75cZ540bsLW5Q7BLb2lJcFkN7XB2RfZGQL2W3_tPgC9dzhJkW933TcK7dCHD6W3x7fQZ1WYNBFVM7V6z5dc3D7VbVDyZ3FClBWW7-ryKV20MW6kf4xnjBq04)

---

## DSpark od DeepSeek przyspiesza inferencję o ponad 50%

**TLDR:** DeepSeek opublikował DSpark, metodę spekulatywnego dekodowania, która przyspiesza generowanie tokenów w ich modelach produkcyjnych o 57-85% bez utraty jakości, i wypuścił kod jako open source na licencji MIT.

**Summary:** Spekulatywne dekodowanie to technika, którą badacze z Google opisali już w 2022 roku, ale dopiero teraz zaczyna ona wchodzić do produkcyjnych systemów na poważnie. Idea jest elegancka: zamiast każdy token generować drogim dużym modelem, mały "model szkicujący" proponuje cały blok tokenów naraz, a duży model weryfikuje je w jednym przejściu. To jak pytanie asystenta o szkic i jego szybka korekta, zamiast pisania każdego słowa od nowa.

DSpark buduje na wcześniejszym pracy DFlash (który proponuje tokeny równolegle, a nie sekwencyjnie), ale dodaje trzy kluczowe usprawnienia. Po pierwsze, sekwencyjny komponent "głowicy Markowa", który koryguje prawdopodobieństwo każdego proponowanego tokenu na podstawie poprzedniego, drastycznie poprawiając koherencję długich bloków. Po drugie, "głowicę pewności" z krokiem kalibracyjnym, która szacuje, jak długi ciąg tokenów przeżyje weryfikację. Po trzecie, dynamiczny scheduler, który dostosowuje długość weryfikowanych bloków do aktualnego obciążenia serwera.

Ten ostatni element jest szczególnie sprytny i często pomijany w opisach tej techniki. Przy niskim ruchu, system weryfikuje dłuższe bloki, skracając czas oczekiwania użytkownika. Przy wysokim ruchu, odrzuca tokeny o niskiej szansie akceptacji, zwalniając zasoby dla innych. To optymalizacja systemowa, nie tylko modelowa.

Wyniki są imponujące. W produkcji DSpark przyspieszył DeepSeek-V4-Flash o 60-85% i DeepSeek-V4-Pro o 57-78% w porównaniu do poprzedniego modułu szkicującego MTP-1. Przy pewnych poziomach przepustowości (120 tokenów/sekundę na użytkownika dla Flash, 50 tokenów/sekundę dla Pro) przyrosty sięgają odpowiednio 661% i 406% całkowitej przepustowości systemu, bo stary moduł prawie przestawał działać przy takich obciążeniach, a DSpark nadal radzi sobie dobrze.

Ważne: checkpointy DeepSeek-V4-Pro-DSpark i DeepSeek-V4-Flash-DSpark są dostępne na Hugging Face pod licencją MIT. Czyli każdy może to pobrać, dotrenować własny moduł szkicujący i zastosować do swoich modeli.

**Key takeaways:**
- DSpark to metoda spekulatywnego dekodowania łącząca zalety szkiców sekwencyjnych i równoległych z dynamicznym dostosowaniem do obciążenia serwera
- W produkcji przyspieszyła generowanie tokenów o 57-85% bez degradacji jakości wyjścia
- Kod i checkpointy opublikowane na Hugging Face pod licencją MIT, co umożliwia szerokie zastosowanie

**Why do I care:** Bezpośrednio jako frontend developer może nie masz z tym do czynienia, ale jeśli budujesz produkty na własnej infrastrukturze LLM albo zarządzasz kosztami API, to jest bardzo istotne. Tańsze i szybsze tokeny to lepsza ekonomika każdej aplikacji AI. Poza tym, fakt że DeepSeek dzieli się technikami inferencji przez otwarte papiery i kod, to dobry sygnał dla ekosystemu. Spekulatywne dekodowanie będzie standardem w produkcji w ciągu roku-dwóch, a DSpark pokazuje gdzie ta technika zmierza.

**Link:** [DeepSeek's DSpark Gains Velocity](https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/MVQkk_2Pq7PW8fqk847R9NxFW1c61D75RhMBcN4Yn9N43prCCW69sMD-6lZ3myW7nSCwt6nNcXxN7DPybhW5Gn5VQ3JLj6NSNs6N8Tq6lw6w8JnW7hfs3w6G8Y9zF2vpl_0ZWK4N3md3W1LjM6WW48syb487gnCYW2w0_8n2mzphFW3-zd_L1CXh2HW4wlsGj8zZqvqW525Ff-2kqhJlW1LpHKQ34TJJKW51VvyB3sQtBTN3B2klV5SzmNN5LS6KyQj312W40-0kL85Pv8bN4q_VBWyH_T5W3FRjvF1nPVhdW8Y9vJ93s3CLsf5cGFwT04)

---

## Brain2Qwerty v2: tekst ze skanowania fal mózgowych

**TLDR:** Zespół badaczy z Meta i kilku europejskich instytucji zaprezentował Brain2Qwerty v2, zaktualizowany system tłumaczący aktywność mózgu na tekst, osiągając 39% word error rate przy użyciu nieinwazyjnych czujników MEG.

**Summary:** Interfejsy mózg-komputer to jeden z tych tematów, które brzmią jak science fiction, ale robią powolne, mozolne postępy w rzeczywistości. Brain2Qwerty v2 jest właśnie takim projektem: nieinwazyjny, oparty na MEG (magnetoencefalografia, która mierzy pole magnetyczne generowane przez aktywność elektryczną neuronów), bez chirurgii, bez elektrod w mózgu.

Architektura systemu jest trójstopniowa. Najpierw enkoder (konwolucyjna sieć neuronowa połączona z hybrydą CNN/transformer zwaną konformerem) przekształca zapis aktywności mózgu w osadzenia znaków. Następnie wyrównywacz grupuje te znaki w słowa i produkuje osadzenia słów. Na końcu dostrojony model językowy Qwen3-4B koryguje błędy w sekwencji. Całość wytrenowano na 90 godzinach nagrań od 9 uczestników piszących zdania po angielsku.

Najciekawsze odkrycie: trening połączony na danych od wielu uczestników daje znacznie lepsze wyniki niż trening na danych indywidualnych. Mediana word error rate dla treningu na danych jednej osoby to 66,5%, a dla metody zbiorowej 47,8%. To nieintuicyjne, bo mózgi są różne, a jednak wspólne wzorce między osobami są wystarczająco silne, żeby pomóc.

Porównanie do poprzedniej wersji: v1 osiągał 43% WER, v2 osiąga 39%. Postęp, ale powolny. Autorzy zaobserwowali też, że wraz ze wzrostem danych treningowych (od 20 do 90 godzin) character error rate enkodera spadał z około 50% do 25%, bez oznak plateau. Innymi słowy, im więcej danych, tym lepiej, i wciąż nie widać sufitu.

Dla porównania: inwazyjne systemy z elektrodami wewnątrz czaszki osiągają error rates rzędu kilku procent. 39% WER to nadal dużo. Ale autorzy otworzyli kod obu wersji i dane v1, co ułatwia dalsze badania.

**Key takeaways:**
- Brain2Qwerty v2 osiąga 39% word error rate z nieinwazyjnym MEG, poprawiając v1 (43% WER)
- Trening zbiorowy na danych wielu uczestników przewyższa trening indywidualny, co sugeruje wspólne wzorce aktywności mózgu
- Bez plateau wydajności przy 90 godzinach danych, więc więcej danych = lepsze wyniki

**Why do I care:** Szczerze? To jest temat badawczy, a nie coś co wdrożę w następnym projekcie frontendowym. Ale jest interesujący z perspektywy długoterminowej. Interfejsy mózg-komputer kiedyś zmienią sposób interakcji człowieka z technologią, a to będzie miało ogromne implikacje dla UX i dostępności. Na razie obserwuję z ciekawością i cieszę się, że autorzy otworzyli kod.

**Link:** [Brain2Qwerty v2 - Text Without Typing](https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/MVQkk_2Pq7PW8fqk847R9NxFW1c61D75RhMBcN4Yn9N-3prCCW7Y8-PT6lZ3nxW3WRzpG46Sth0W8mzq-f3yJFjnW2ZMyVS6BSswTW7v4KDp6vPP1cN1qFghmfb1s0W10MvDg2nTzSHW8NQRvn1ynwpvW31Bwyd8Zjnb1W47vyQP7Ly_hbW7NqXdD7b0fLqVw4Y1p20LRH7W5_dNwJ9cHvZFN1PKZMGVtKBgW2sMzy46NXpCkW3W4K8v8WLr12W2QYwL-8Mk3kMW8scKSm8nprs0W1_2J6N1Lg4Z3W1lPJZP4d6v1ZW7l7kcv3NbnWLW14BKKP6JX-5mW25P7Nk5RTqx6W30tCS1791gy2W7_2TyJ9fdJWPW6dLMbd8Hk-QFW3RrFyS6nkg9mf8XXg8W04)
