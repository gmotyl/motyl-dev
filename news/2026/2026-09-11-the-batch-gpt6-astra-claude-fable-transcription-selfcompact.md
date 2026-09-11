---
title: "The Batch: GPT-6 Astra kontra Claude Fable 5.1, wyścig w transkrypcji mowy i narzędzie do samodzielnego zarządzania kontekstem agenta"
excerpt: "OpenAI i Anthropic remisują na szczycie rankingów po serii aktualizacji benchmarków, Google, Meta i Microsoft ścigają się w transkrypcji mowy, a badacze z Johns Hopkins i Apple uczą agenta samodzielnie decydować, kiedy skompresować własny kontekst."
publishedAt: "2026-09-11"
slug: "the-batch-gpt6-astra-claude-fable-transcription-selfcompact"
hashtags: "#thebatch #ai #llm #agents #generated #pl"
source_pattern: "The Batch"
---

## GPT-6 Astra jest gwiazdą, ale nie tanią

**TLDR:** OpenAI wypuściło GPT-6 Astra, model, który zajmuje czołowe miejsca w rankingach przy znacznie niższym koszcie tokenowym niż nieliczne modele, które go wyprzedzają, i jako pierwszy spełnia „krytyczny” poziom ryzyka cyberbezpieczeństwa we własnej klasyfikacji OpenAI.

**Summary:** Astra przyjmuje tekst i obrazy na wejściu (do 1,05 miliona tokenów) i zwraca tekst (do 128 tysięcy tokenów przy 71,3 tokena na sekundę), oferuje pięć poziomów wnioskowania od low do max oraz asynchroniczne wywołania narzędzi, dzięki którym model może kontynuować rozumowanie, podczas gdy aplikacja wykonuje w tle wywołane narzędzie. OpenAI trenowało model na ponad 100 tysiącach GPU, co jest ich największym dotychczasowym przebiegiem treningowym, a wcześniejsze modele OpenAI po raz pierwszy odegrały kluczową rolę w nadzorowaniu tego treningu.

Na ARC-AGI-3, teście środowisk interaktywnych wymagających odkrywania reguł gry przez eksplorację, Astra w standardowym harnessie ARC Prize osiągnął 62,7% przy koszcie 26 098 dolarów, znacznie poprawiając poprzedni rekord 30,2% należący do Claude Opus 5. Pod specjalnym adapterem dostawcy, gdzie ukryte rozumowanie modelu jest zachowywane między zapytaniami, ten sam model osiągnął niemal doskonałe 99,9%. Ta różnica sama w sobie jest ważniejszą wiadomością niż sam wynik, bo pokazuje, jak bardzo konfiguracja uruchomienia wpływa na porównywalność wyników między modelami. Na indeksie Vals AI, ważonym udziałem poszczególnych sektorów gospodarki w PKB USA, Astra wypada nieco słabiej niż Claude Fable 5.1 i Claude Opus 5, ale przy zauważalnie niższym koszcie i czasie wykonania zadania.

Model jest zabezpieczony klasyfikatorami, które analizują rozumowanie i działania modelu przy każdym wywołaniu narzędzia i mogą przerwać pracę uznaną za nieautoryzowaną, a w trybie API oznaczone zapytanie po prostu kończy się bez możliwości wznowienia. Astra odmawia też pisania kodu proof-of-concept dla exploitów, choć OpenAI zapowiada bardziej permisywne zabezpieczenia dla wybranych zespołów obronnych w ramach programu Daybreak.

**Key takeaways:**
- GPT-6 Astra ustawiony na wysokie wnioskowanie osiąga 99,9% na ARC-AGI-3 pod adapterem dostawcy, ale tylko 62,7% pod standardowym harnessem.
- Model trenowano na ponad 100 tysiącach GPU, z udziałem wcześniejszych modeli OpenAI w nadzorowaniu treningu.
- Wyższy poziom wnioskowania bywa tańszy niż niższy, bo model rozwiązuje zadanie w mniejszej liczbie kroków.

**Why do I care:** Cena za token dawno przestała być dobrym wskaźnikiem realnego kosztu uruchomienia modelu, a Astra pokazuje, że poziom wnioskowania staje się drugą taką pułapką. Zanim zaczniesz porównywać modele po cenniku, zmierz koszt na konkretnym zadaniu we własnym środowisku, bo pozornie drogi model z wysokim reasoning effort może wyjść taniej niż tańszy model przy niskim.

**Link:** [GPT-6 Astra Is a Star](https://openai.com)

## Claude Fable 5.1 broni pozycji lidera

**TLDR:** Chociaż premiera OpenAI zrobiła większy szum medialny, model Anthropic pozostaje na szczycie niezależnych rankingów Artificial Analysis i Vals AI, remisując z GPT-6 Astra po serii aktualizacji metodologii benchmarków w ciągu jednego tygodnia.

**Summary:** Fable i Mythos to dwa warianty tego samego modelu różniące się wyłącznie zabezpieczeniami: Fable 5.1 jest dostępny publicznie, a Mythos 5.1, z pełną zdolnością cybernetyczną bez ograniczeń, tylko dla wybranych przez Anthropic organizacji z sektora cyberbezpieczeństwa i nauk biologicznych w USA. Model czyta rozumowanie wcześniejszych modeli Claude, ale te wcześniejsze modele nie mogą odczytać jego rozumowania, a edycja wcześniejszej tury konwersacji unieważnia ją dla kont założonych po 31 sierpnia, co Anthropic opisuje jako usunięcie udokumentowanej metody wyciągania rozumowania modelu.

Zabezpieczenia cybernetyczne działają dwutorowo: sonda odczytuje aktywacje modelu, a nie jego tekst wyjściowy, i kieruje wszystko związane z cyberbezpieczeństwem do klasyfikatora LLM oceniającego, czy zablokować wymianę. W przeciwieństwie do Fable 5 poprzedniej generacji, Fable 5.1 może wykonywać czysto defensywną pracę związaną z cyberbezpieczeństwem, jak szukanie podatności w czytelnym dla człowieka kodzie źródłowym, ale nadal przełącza się na starsze modele Opus przy zadaniach uznanych za niebezpieczne, jak testy penetracyjne czy pisanie exploitów.

Na indeksie Intelligence Index v4.3 Artificial Analysis, Fable 5.1 z fallbackiem remisuje z Astrą (53 punkty), ale prowadzi w dwóch najtrudniejszych komponentach: AA-Briefcase, oceniającym wielotygodniowe projekty wiedzowe z tysiącami plików źródłowych, oraz GDPval-AA v2, adaptacji testu OpenAI mierzącego ekonomicznie użyteczne zadania w 44 zawodach. Anthropic przyznaje, że koszt na zadanie wzrósł o około 20% względem Fable 5 mimo obniżki ceny cache'owanego wejścia o 75%, a zasada 30-dniowego przechowywania danych nadal obowiązuje wszystkich poza wybranymi klientami enterprise.

**Key takeaways:**
- Fable 5.1 i Mythos 5.1 to ten sam model różniący się wyłącznie poziomem zabezpieczeń i dostępnością.
- Model prowadzi w zadaniach wymagających długiej pracy narzędziowej, ale przegrywa z Astrą w ogólnej wiedzy i pracy w terminalu.
- Koszt na zadanie wzrósł około 20% względem poprzedniej generacji mimo obniżki ceny cache'u.

**Why do I care:** Wyścig rankingów między Anthropic a OpenAI zmienia się z tygodnia na tydzień, bo same firmy oceniające (Artificial Analysis, Vals AI) aktualizują metodologię w reakcji na nasycenie testów. Jeśli podejmujesz decyzję architektoniczną o wyborze modelu na podstawie miejsca w rankingu, sprawdzaj datę publikacji tego rankingu, bo za tydzień kolejność może się odwrócić bez żadnej zmiany w samym modelu.

**Link:** [Fable Holds The Top Spot (For Now)](https://anthropic.com)

## Wyścig w transkrypcji mowy przyspiesza

**TLDR:** Google, Meta i Microsoft w odstępie kilku dni wypuściły nowe modele do transkrypcji mowy, każdy z error rate poniżej 4%, pokazując, że rozpoznawanie mowy, technologia często pomijana w cieniu modeli generatywnych, przeżywa właśnie swój moment.

**Summary:** Gemini 3.5 Transcribe od Google celuje w tworzenie czystego transkryptu gotowego do dalszego wykorzystania w szerszych przepływach AI, rozpoznaje ponad 85 języków, usuwa wypełniacze mowy i rozróżnia do ośmiu mówców. Muse Voice Transcribe od Mety działa jako warstwa nasłuchu w czasie rzeczywistym, dzieląc dźwięk na 80-milisekundowe fragmenty i decydując przy każdym z nich, czy wyemitować token tekstowy, czy poczekać na więcej kontekstu audio. Meta nazywa ten mechanizm „adaptacyjnym opóźnieniem”: model jest nagradzany za poprawną transkrypcję, ale karany za zbyt długie oczekiwanie na nią. MAI-Transcribe-2 od Microsoftu twierdzi, że jest szybszy i dokładniejszy niż jakikolwiek inny model na rynku, transkrybując godzinę nagrania w 10 sekund, pięciokrotnie szybciej niż model Google.

Pod względem czystej dokładności różnice są niewielkie: Muse Voice Transcribe ma najniższy error rate wśród modeli streamingowych, a MAI-Transcribe-2 wśród modeli nie-streamingowych. Ceny też są zbliżone, od około 0,10 do 0,18 dolara za godzinę nagrania, w zależności od dostawcy i trybu.

**Key takeaways:**
- Wszystkie trzy modele osiągają error rate poniżej 4%, konkurując głównie w niuansach jak liczba rozróżnianych mówców czy opóźnienie.
- Meta trenuje model do decydowania w locie, czy transkrybować od razu, czy poczekać na więcej kontekstu audio.
- Rozpoznawanie mowy jest bezwzględne kosztowo, bo wyszkoleni ludzie wciąż konkurują cenowo w wielu zastosowaniach głosowych.

**Why do I care:** Jeśli budujesz cokolwiek z komponentem głosowym, ten wyścig bezpośrednio obniża twoje koszty infrastruktury i podnosi jakość produktu bez dodatkowej pracy z twojej strony. Warto raz na kwartał sprawdzić aktualne rankingi word error rate zamiast trzymać się dostawcy wybranego rok temu, bo w tym segmencie zmiany przychodzą szybciej niż w większości innych warstw stosu AI.

**Link:** [Transcription Battles Heat Up](https://deeplearning.ai)

## Narzędzie, które samo decyduje, kiedy skompresować kontekst

**TLDR:** Badacze z Johns Hopkins i Apple opracowali SelfCompact, mechanizm dający modelowi narzędzie do kompresji własnego kontekstu wraz z regułą oceny, kiedy z niego skorzystać, bez żadnego douczania modelu.

**Summary:** Problem, który rozwiązuje SelfCompact, jest znany każdemu, kto budował długo działającego agenta: modele zwalniające miejsce w oknie kontekstu przez odrzucanie najstarszych fragmentów tracą przy okazji informacje kluczowe dla bieżącego zadania. Właściwy moment na kompresję zależy bardziej od tego, co agent akurat robi, niż od samej liczby zgromadzonych tokenów, dobrze wyczucia kompresja może odrzucić przestarzałe rozumowanie, a źle wyczucia odrzuci częściowe wyniki, których model wciąż potrzebuje.

SelfCompact dodaje do zestawu narzędzi agenta sondę, która co 16 tysięcy tokenów ocenia, czy podzadanie zostało zakończone lub agent robi wyraźne postępy w stronę konkretnego wyniku, i na tej podstawie decyduje, czy zezwolić na kompresję. Jeśli tak, wywoływane jest narzędzie podsumowujące, które kondensuje ślady liczące zwykle od 50 do 100 tysięcy tokenów do krótkiego podsumowania rzędu 1-3 tysięcy tokenów, po czym generowanie wznawia się na bazie tego podsumowania. W testach na sześciu benchmarkach, w tym IMO-Answerbench i BrowseComp-Plus, SelfCompact przebił zarówno kompresję w stałych odstępach, jak i całkowity brak kompresji. Co istotne, gdy badacze zastąpili regułę oceny prostym pytaniem do modelu „czy chcesz teraz skompresować kontekst”, wyniki spadły do poziomu kompresji w stałych odstępach, co dowodzi, że to sama reguła, a nie mechanizm kompresji jako taki, odpowiada za zysk.

**Key takeaways:**
- SelfCompact działa bez douczania modelu, opierając się wyłącznie na narzędziu i regule jego wywoływania.
- Na sześciu benchmarkach przebił zarówno kompresję w stałych odstępach, jak i brak kompresji w ogóle.
- Kluczem okazała się jakość reguły decyzyjnej, a nie sam mechanizm podsumowywania kontekstu.

**Why do I care:** Jeśli budujesz własny harness agentowy, zarządzanie kontekstem prędzej czy później stanie się jednym z twoich największych źródeł błędów, a nie tylko problemem kosztowym. Wzorzec „narzędzie plus jawna reguła jego użycia” jest dużo tańszy do wdrożenia niż fine-tuning i daje architektowi realną kontrolę nad tym, kiedy dokładnie agent traci pamięć krótkotrwałą, zamiast oddawać tę decyzję czarnej skrzynce.

**Link:** [A Tool for Better Context Management](https://deeplearning.ai)