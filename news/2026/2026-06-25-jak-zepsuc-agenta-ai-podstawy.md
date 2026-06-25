---
title: "Jak zepsuć własnego agenta AI – podstawy"
excerpt: "Paweł Józefiak opisuje sześć sposobów, w jakie agenty AI psują się w codziennym użyciu, od przebudowania i przeciążenia kontekstem po ciche awarie i brak fallbacku."
publishedAt: "2026-06-24"
slug: "jak-zepsuc-agenta-ai-podstawy"
hashtags: "#joozio #ai #agents #llm #architecturę #generated #pl"
source_pattern: "PawelJozefiak"
---

## Jak zepsuć własnego agenta AI – podstawy

**TLDR:** Paweł Józefiak buduje własnego agenta AI od miesięcy i zebrał listę sześciu sposobów, w jakie agenty psują się po wdrożeniu. To nie teoria – to pole minowe, na którym sam regularnie detonuje. Błędy dotyczą każdego agenta: czy to Claude Code, ChatGPT, Zapier, czy własny framework.

Paweł zaczyna od matematyki, której większość budowniczych agentów nie chce słyszeć. Agent działa w krokach. Każdy krok ma swoją stopę błędu. Jeśli każdy krok sprawdza się w 99% przypadków, dziesięć kroków z rzędu daje 90% szansy powodzenia. Sto kroków to już 37%. Tysiąc – praktycznie zero. Co gorsza, błędy nie są niezależne: jeden zły krok przesuwa następny w złą stronę. Każde rozszerzenie agenta – nowe narzędzia, więcej pamięci, więcej kroków – nie dodaje ryzyka liniowo, lecz je mnoży.

Pierwsza i według mnie najcięższa choroba to przebudowanie. Pawłowi przydarza się to regularnie. Badacze z Microsoftu opisali to jako "tool-space interference": gdy model dostaje zbyt wiele narzędzi, zaczyna wybierać nie to, co trzeba, spalać tokeny, albo wymyślać wywołania nieistniejących funkcji. Mierzone spadki dokładności w wyborze narzędzi wynoszą od 7 do 85% w miarę rozrastania się katalogu. OpenAI ogranicza liczbę narzędzi w jednym żądaniu do 128, ale Cursor ostrzega, że jakość spada długo przed osiągnięciem tej granicy. Do tego dochodzi "context rot": w badaniach na 18 frontowych modelach dokładność spadała o 30-50% w miarę zapychania okna kontekstowego, i to zanim okno było nawet pełne. Na modelach z milionem tokenów efekt zaczyna się ujawniać już przy 300-400 tysiącach. Rozwiązanie to aktywne przycinanie: mały indeks dostępnych narzędzi, ładowanie tylko tych potrzebnych do bieżącego zadania, regularne kompaktowanie historii.

Drugi błąd to jeden agent robiący wszystko. Jarvis jako idea romantyczna jest fajna, ale w praktyce monolityczny agent zachowuje się jak monolityczna baza kodu – im większy, tym trudniej go utrzymać. Anthropic zbudował wieloagentowy system badawczy, gdzie główny agent deleguje do wyspecjalizowanych subagentów: wyniki były ponad 90% lepsze na testach ewaluacyjnych. Cena: 15 razy więcej tokenów i gorsza jakość przy ściśle powiązanych zadaniach jak pisanie kodu. Cognition poszło w drugą stronę z artykułem "Don't Build Multi-Agents", argumentując, że rozdzielony kontekst prowadzi do sprzecznych decyzji. Oboje mają rację w różnych warunkach. Praktyczna zasada brzmi: trzymaj zadania w jednym agencie dopóki kontekst jest mały i wspólny. Gdy zadanie wymaga zaciągnięcia ogromnego, specyficznego kontekstu – oddziel je do subagenta zwracającego wynik, zamiast wrzucać wszystko do głównego okna.

Trzeci punkt to zatruwanie własnej pamięci. Agent z pamięcią jest świetny, dopóki nie zapamiętał czegoś złego. Microsoft opisał pokrewne zjawisko jako "session context contamination", gdzie śmieci z jednego kontekstu przenikają do następnego i cicho deformują wyniki. Pawłowi regularnie odpala się ostrzeżenie o dryfcie, bo agent zapisał coś, co przestało odpowiadać rzeczywistości. Dobra pamięć wymaga dyscypliny jak kod: weryfikacja przed zapisem, linkowanie faktów do źródeł, data wygaśnięcia. Fakt bez źródła i daty wygaśnięcia to plotka, którą agent będzie powtarzać z pełnym przekonaniem w nieskończoność.

Czwarty błąd to brak fallbacku. Jeśli agent ma działać 24/7, model bazowy musi mieć zastępstwo. Paweł używa OpenRouter jako warstwy pośredniej od przepinania się między dostawcami. Z ważnym zastrzeżeniem: w sierpniu 2025 sam OpenRouter wyłożył się na 50 minut i zabrał swoje własne fallbacki ze sobą. Dlatego Paweł uruchamia też lokalny model 35B na Mac Mini jako ostatnią linię obrony. Fallback, którego nigdy nie testowałeś, nie jest fallbackiem. To druga rzecz, o której zakładasz, że działa.

Piąty problem to zbyt duże zaufanie bez weryfikacji. Najniebezpieczniejsze awarie są ciche. Agent mówi "done", zapisuje linię w logu, a praca nigdy się nie wydarzyła. Linia logu wygląda jak sukces i zazwyczaj jej wierzymy. Paweł zbudował watchdoga, którego jedynym zadaniem jest łapanie pętli logujących bez efektu. Jego zasada: sprawdzaj wynik, nie aktywność. Czy plik naprawdę się zmienił, czy wiadomość naprawdę dotarła, czy rekord naprawdę trafił do bazy. To samo dlatego traktuje commity jako punkty zapisu – namacalny, sprawdzalny ślad, nie "wrażenie że chyba zadziałało".

Szósty i ostatni to brak celowego testowania. Wrzucaj agentowi scenariusze, których nigdy nie widział: szybkie serie wiadomości, dziwne formaty, żądania bez oczywistego handlera. Microsoft po roku red-teamingu agentów doszedł do wniosku, że systemy przechodzące testy na poziomie modelu padają pod prawdziwym obciążeniem, bo awaria leży w systemie, nie w modelu. Pojawia się nowa dyscyplina: "harness engineering", czyli argument, że scaffolding wokół modelu – kontekst, narzędzia, pamięć, weryfikacja – decyduje o powodzeniu bardziej niż sam model. Regresja dla agenta to zestaw paskudnych przypadków uruchamianych po każdej zmianie architektury.

**Key takeaways:**
- Liczba kroków agenta mnoży ryzyko, nie sumuje go – każde rozszerzenie architektury ma cenę matematyczną
- "Tool-space interference" i "context rot" to zmierzone zjawiska, nie teorie – przycinanie katalogu narzędzi i okna kontekstowego to podstawowa konserwacja
- Fallback nieprzetestowany w praktyce jest iluzją bezpieczeństwa
- Ciche awarie są groźniejsze niż crashe – weryfikuj wyniki, nie aktywność
- Jeden agent z kontekstem dzielonym na wszystko szybko staje się monolitem; deleguj tam, gdzie konteksty są duże i specyficzne

**Why do I care:** Buduję narzędzia, które integrują się z agentami AI, i od miesięcy obserwuję ten sam wzorzec: architektury, które wyglądają świetnie w demo, rozpadają się w użyciu. Artykuł Pawła jest dobry nie dlatego, że opisuje coś odkrywczego, ale dlatego, że nadaje nazwy rzeczom, które większość z nas napotyka bez słownika. "Context rot", "tool-space interference", "session context contamination" – to konkretne problemy ze zmierzonymi skutkami, nie mgłe "AI bywa nieprzewidywalne". Jeśli budujesz cokolwiek na bazie modeli językowych i zakładasz, że to tylko jeden krok od gotowego produktu, ta lista jest dobrym sprawdzianem rzeczywistości.

**Link:** [How to Break Your AI Agent (Basics)](https://open.substack.com/pub/joozio/p/how-to-break-your-ai-agent-basics-2026)
