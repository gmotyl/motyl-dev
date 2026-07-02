---
title: "Gemini tokeny lokalnie i AI filmmaking - co naprawdę zajmuje czas"
excerpt: "Jak liczyć tokeny Gemini lokalnie i co odkryjesz, gdy zaczniesz poważnie tworzyć filmy z AI."
publishedAt: "2026-07-02"
slug: "hackernoon-gemini-tokeny-lokalnie-ai-filmmaking"
hashtags: "#hackernoon #programming #ai #engineering #gemini #llm #aifilmmaking #multimodal #generated #pl"
source_pattern: "HackerNoon"
---

## Jak liczyć tokeny Gemini lokalnie

**TLDR:** Google udostępniło lokalny tokenizer dla modeli Gemini, który pozwala liczyć tokeny bez połączenia z siecią. Artykuł tłumaczy, jak działają tokenizery tekstowe, obrazkowe i audio, i jak odczytywać dokładne dane z usage_metadata po stronie API.

**Summary:**

Zacznijmy od podstaw, bo artykuł porządnie je wyjaśnia. Modele językowe nie przetwarzają tekstu bezpośrednio - operują na tokenach, czyli skompresowanych jednostkach informacji. Tokenizacja to coś w rodzaju kodeka: wejście zamieniane jest na tokeny, model generuje tokeny wyjściowe, a potem te tokeny są dekodowane z powrotem do czytelnego formatu. To nie jest nic nowego, ale warto mieć to w głowie, gdy myślimy o kosztach i wydajności.

Słownik tokenizera Gemini jest stały po treningu - to po prostu tabela mapująca sekwencje tekstowe na identyfikatory. Ciekawostka: słowa o tym samym rdzeniu niekoniecznie tokenizują się tak samo. "passion" to jeden token, "passionate" to już dwa: "pass" i "ionate". Tokenizer myśli statystycznie, nie lingwistycznie. Gdy piszesz po angielsku, masz zazwyczaj lepszą "efektywność tokenową" niż w innych językach.

Nowa możliwość to LocalTokenizer - klasa z Google Gen AI Python SDK, która pobiera dane słownika przy pierwszym użyciu (około 30 MB) i zapisuje je lokalnie. Potem możesz liczyć tokeny całkowicie offline. Wyniki są identyczne jak z API count_tokens, ale bez opóźnienia sieciowego i bez zużywania limitów API. Dla Gemini 3.x tokenizer nosi wewnętrznie nazwę "gemma4" - te same wagi co otwarte modele Gemma.

Artykuł omawia też tokenizację multimodalną. Obrazy tokenizowane są w zależności od rozdzielczości: niskie to 280 tokenów maksymalnie na obraz, wysokie (domyślne) to 1120. Audio liczy się jako 25 tokenów na sekundę. Wideo łączy tokeny audio z tokenami klatek - domyślnie 1 klatka na sekundę, co przy 59-sekundowym filmie daje blisko 5400 tokenów łącznie. PDF jest traktowany przez tokenizer wizyjny - domyślnie medium, czyli około 532 tokenów na stronę.

Szczególnie przydatna jest sekcja o usage_metadata - to jest jedyne wiarygodne źródło prawdy o tym, ile tokenów naprawdę zużyła odpowiedź. API zwraca podział na modalności: tekst, obraz, wideo, audio, dokument. Warto z tego korzystać do monitorowania kosztów, bo niektóre konfiguracje dodają "ukryte" tokeny - historia konwersacji, system prompt, definicje narzędzi, schemat JSON - tego lokalny tokenizer sam nie policzy.

**Key takeaways:**
- LocalTokenizer działa offline po pierwszym pobraniu danych (~30 MB cache)
- Tokenizer tekstu dla Gemini 3.x to "gemma4" - identyczny jak w otwartych modelach Gemma
- Audio: 25 tokenów/sekundę; wideo: ~66 tokenów/klatkę przy domyślnej rozdzielczości + tokeny audio
- usage_metadata to jedyne wiarygodne źródło prawdy do rozliczeń
- Ukryte tokeny: system prompt, historia chatu, definicje narzędzi, schematy JSON - trzeba je uwzględnić

**Why do I care:** Z perspektywy architekta systemów budujących aplikacje na LLM, to jest dokładnie ten rodzaj wiedzy operacyjnej, który decyduje o tym, czy aplikacja jest skalowalna i przewidywalna kosztowo. Wielu programistów traktuje tokeny jak abstrakcję i budzi się zaskoczony rachunkiem. Lokalne liczenie tokenów przed wysłaniem requestu to dobra praktyka, szczególnie przy walidacji inputu i routingu requestów do różnych modeli. Mam tylko jedno zastrzeżenie: artykuł skupia się na Gemini i Vertex AI - jeśli używasz innego providera, logika jest podobna, ale szczegóły tokenizacji multimodalnej mogą się różnić.

**Link:** [How to Count Gemini Tokens Locally](https://hackernoon.com/how-to-count-gemini-tokens-locally)

---

## Odbudowałem tę samą scenę trzy razy - generowanie było najtańszą częścią

**TLDR:** Twórca solowego projektu anime "Lost Garden" opisuje, jak trzy pełne przebudowy jednej czterdziestosekundowej sceny ujawniły prawdę o pracy z AI filmmaking: generowanie klipu to tylko 15% czasu. Reszta to selekcja, ciągłość i planowanie.

**Summary:**

Ten artykuł jest interesujący nie dlatego, że uczy nowej techniki, ale dlatego, że szczerze mierzy, gdzie naprawdę idzie czas. Autor buduje solo animowaną serię dark-fantasy z pomocą narzędzi AI i opisuje trzy pełne przebudowy jednej sceny - korytarza, przez który idzie główna bohaterka. Czterdzieści sekund gotowego materiału, sześć ujęć. Trzy tygodnie pracy.

Rozliczenie czasu jest cenne: generowanie klipu to 15% czasu. Selekcja i odrzucanie wariantów to 30%. Praca nad ciągłością - dlaczego ujęcie czwarte przeczy ujęciu drugiemu - to 35%. Planowanie, które powinno było być pierwsze, zajęło 20%. To nie jest przypadek ani problem tej konkretnej osoby. Autor cytuje dane z branży: od dwudziestu do pięćdziesięciu wariantów na jedno ujęcie przed akceptacją, i od osiemdziesięciu do stu pięćdziesięciu klipów na krótką produkcję.

Pierwsza wersja sceny upadła z banalnego powodu: każdy klip wyglądał świetnie osobno, ale razem nie tworzyły jednego miejsca. Włosy bohaterki zmieniały długość między ujęciami szerokimi a bliskimi. Korytarz raz był wąski, raz szeroki. Oczy przechodziły z bursztynowych na szare. Sześć pięknych pocztówek z sześciu różnych filmów.

Druga wersja naprawiła postać - autor użył Soul ID z Higgsfield, który pozwala wytrenować stabilną tożsamość wizualną na podstawie referencyjnych zdjęć. Twarz trzymała się przez wszystkie ujęcia. Ale problem przeniósł się na środowisko: korytarz wciąż dryfował, pochodnia skakała, paleta barwna się zmieniała. Jedno rozwiązane, trzy pozostałe.

Dopiero trzecia wersja zadziałała, i nie dlatego, że autor znalazł lepszy prompt czy lepszy model. Zadziałała dlatego, że zmienił kolejność: najpierw zablokował wszystkie stałe elementy, potem zaczął generować. Postać zamrożona z poprzedniej iteracji. Korytarz zablokowany - referencyjny kadr z dokładną szerokością, liczbą pochodni, teksturą kamienia. Paleta barw opisana pisemnie, nie zapamiętana w głowie. Gramatyka kamery - obiektyw, poziom oka, ruch - zdecydowana raz dla całej sceny. Dopiero po tym generowanie.

Artykuł kończy trafną obserwacją: w pipeline'ie AI jedyną rzeczą, która ma pamięć, jest pisemny plan. Modele nie pamiętają poprzedniego klipu. Każde ujęcie generowane jest od nowa, bez wiedzy o poprzednim. Ciągłość musi żyć gdzieś poza modelem - w dokumencie, bazie referencji, systemie produkcyjnym. Jeśli tego nie ma, żyje w głowie autora, dopóki trzy tygodnie później głowa tego nie zgubi.

**Key takeaways:**
- Generowanie klipu AI to około 15% realnego czasu pracy; selekcja, ciągłość i planowanie to 85%
- Ciągłość wizualna to dyscyplina zewnętrzna, nie funkcja modelu - model nie pamięta poprzedniego ujęcia
- Tożsamość postaci można stabilizować przez trening referencyjny (np. Soul ID w Higgsfield)
- Środowisko, paleta i gramatyka kamery muszą być zablokowane pisemnie przed generowaniem
- Discard rate 20-50 wariantów na ujęcie jest normą, nie błędem w pracy

**Why do I care:** Dla kogoś, kto dużo myśli o architekturze systemów i zarządzaniu stanem, ten artykuł czyta się jak opis dobrze znanych problemów w nowym kontekście. "Plan jako jedyne źródło prawdy" to architektura. "Model nie ma pamięci między wywołaniami" to bezstanowość API. "Ciągłość musi żyć poza modelem" to zewnętrzny stan aplikacji. Problem nie jest nowy - po prostu zmienił się domenę. Co autor pomija: skalowanie tego do dłuższych produkcji wymaga narzędzi do zarządzania tą "zewnętrzną pamięcią" i tu pojawia się faktyczna trudność inżynierska, której artykuł ledwo dotyka, bo autor sam dopiero buduje odpowiedź w postaci ScreenWeavera.

**Link:** [I Rebuilt One Lost Garden Scene Three Times - The Generating Was the Cheap Part](https://hackernoon.com/i-rebuilt-one-lost-garden-scene-three-times-the-generating-was-the-cheap-part)
