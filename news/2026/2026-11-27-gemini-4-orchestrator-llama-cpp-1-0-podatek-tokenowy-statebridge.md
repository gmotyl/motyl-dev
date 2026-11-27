---
title: "Gemini 4 Hydrogen i Neon z Orchestratorem, llama.cpp 1.0, podatek tokenowy i StateBridge"
excerpt: "Google dzieli pracę agenta między modele, llama.cpp dochodzi do wersji 1.0, a języki o mniejszych zasobach płacą za tokeny nawet kilkanaście razy więcej."
publishedAt: "2026-11-27"
slug: "gemini-4-orchestrator-llama-cpp-1-0-podatek-tokenowy-statebridge"
hashtags: "#thebatch #ai #llm #agents #ml #devtools #open-source #generated #pl"
source_pattern: "The Batch"
---

## Gemini 4 Hydrogen, Neon i Orchestrator w Antigravity

**TLDR:** Google wypuścił dwa tańsze i szybsze modele Gemini 4 oraz tryb Orchestrator, w którym większy model planuje, a mniejszy wykonuje pracę. Neon według niezależnych testów przewyższa Carbon ogólną inteligencją i kosztuje mniej na zadanie.

**Summary:** Dwunastego listopada pojawił się Gemini 4 Hydrogen, model do zadań agentowych i kodowania, szybszy i tańszy od Carbon. Osiemnastego dołączył Neon, który dorównuje Carbon jakością przy pośredniej prędkości i cenie. Hydrogen kosztuje 1,50 dolara za milion tokenów wejściowych i 7,50 za wyjściowe, Neon odpowiednio 3 i 15 dolarów. Oba są własnościowe, a Google nie ujawnia liczby parametrów ani szczegółów adaptacji z Carbon.

Orchestrator w Antigravity, czyli odpowiedniku Codeksa i Claude Code od Google, dzieli zadanie na planistę i wykonawcę. Planista, czyli Carbon, Neon lub Argon, najpierw czyta kod bez zmieniania czegokolwiek i pisze plan. Potem Hydrogen zmienia kod, buduje go, testuje i sprawdza zgodność z planem. Gdy test padnie dwa razy albo interfejs zachowa się inaczej, niż zakładano, sterowanie wraca do planisty, który poprawia plan. Ważne, że to wciąż jeden agent w jednym oknie kontekstu, tylko z podmienianym modelem.

Liczby są ciekawe, ale nie jednoznaczne. Hydrogen na wysokim poziomie rozumowania dostał 51 punktów w Artificial Analysis, a w trybie xhigh 54, przy 3,16 dolara i prawie 15 minutach na zadanie. Neon w xhigh dostał 61, za 6,44 dolara i 25,8 minuty. Carbon na wysokim ustawieniu dostał 60, za 5,48 dolara i 32 minuty. Według Google para Carbon plus Hydrogen w Orchestratorze zbliża się do wyniku samego Carbon na Terminal-Bench, kończąc o 19 procent szybciej i zużywając o 24 procent mniej limitu tokenów. Tani model nie zawsze oznacza mniej tokenów: Hydrogen w trybie extra-high wygenerował 304 miliony tokenów wyjściowych na testach, a Carbon 205 milionów.

**Key takeaways:**
- Orchestrator zmienia model w obrębie jednego agenta i jednego kontekstu.
- Neon w testach niezależnych bije Carbon przy niższym koszcie zadania.
- Cena za token nie równa się cenie za zadanie.

**Why do I care:** Dla zespołów, które płacą za agenty kodujące, to najważniejszy wątek: liczy się koszt ukończonego zadania, a nie cennik za milion tokenów. Zwróć uwagę, że 19 procent szybciej i 24 procent mniej limitu to dane od Google, a wynik na Terminal-Bench to nie to samo co twoje repozytorium. Zanim przepniesz zespół na parę planista i wykonawca, zmierz to na własnych zadaniach.

**Link:** [Carbon, Hydrogen, Neon, Oh My!](https://www.deeplearning.ai/the-batch/)

## llama.cpp w końcu oficjalnie

**TLDR:** llama.cpp osiągnął wersję 1.0 po ponad trzech latach rozwoju, razem z biblioteką ggml. Nowa wersja dodaje między innymi syntezę mowy w wbudowanym serwerze i przeprojektowany interfejs czatu.

**Summary:** Georgi Gerganov zaczął projekt w marcu 2023, tydzień po wycieku pierwszego modelu LLaMA od Mety. Napisał go jako zwykły program w C i C++, bez zależności od Pythona, PyTorcha i CUDA, więc działał na MacBooku i dowolnym sprzęcie. Do dziś napędza narzędzia takie jak Ollama i LM Studio.

Projekt ładuje modele w formacie GGUF, mocno korzysta z kwantyzacji, czyli zapisu wag z niższą precyzją, na przykład na 4 bitach zamiast 32. Biblioteka ggml rozmawia ze sprzętem przez osobne backendy: CUDA dla Nvidii, Metal dla Apple, Vulkan oraz zwykłe procesory. Dołączony serwer przyjmuje zapytania w formatach wzorowanych na API OpenAI i Anthropica, więc wiele aplikacji napisanych dla chmury da się przepiąć na model lokalny. Zespół Hugging Face, do którego ggml dołączył w lutym 2026, zapewnia projektowi długoterminowe zasoby, a sprzęt do testów dostarczają między innymi Nvidia, AMD, Qualcomm, Arm, IBM i Intel.

**Key takeaways:**
- Wersja 1.0 pojawiła się dziewięć dni po 0.9.0, więc tempo rozwoju jest wysokie.
- Serwer z API w stylu OpenAI ułatwia przepięcie istniejących aplikacji.
- Projekt ma zaplecze Hugging Face i producentów sprzętu.

**Why do I care:** Jeśli budujesz funkcje AI z danymi, których nie wolno wysłać do chmury, llama.cpp jest dziś rozsądnym punktem wyjścia. Producenci twierdzą jednak, że zgodność z specyfikacją OpenAI jest tylko częściowa, więc testuj konkretne wywołania narzędzi i streaming, zamiast zakładać wymienność.

**Link:** [llama.cpp Makes It Official](https://www.deeplearning.ai/the-batch/)

## Jak „podatek tokenowy” uderza w użytkowników nie-angielskich

**TLDR:** Badanie CLEAR obejmujące ponad 200 języków pokazuje, że identyczna treść potrafi kosztować do 17 razy więcej tokenów w najgorzej obsługiwanych językach niż w najlepiej. Wiele popularnych tokenizerów dostaje ocenę F.

**Summary:** Tokenizery dzielą tekst na podstawie częstotliwości ciągów znaków w danych treningowych, więc języki słabo reprezentowane są cięte na drobniejsze kawałki. Przykład z GPT-5: to samo zdanie kosztuje 13 tokenów po angielsku, 26 po malajalam i 78 po amharsku, mimo że liczba znaków jest podobna. Koszt rośnie proporcjonalnie.

Badacze ocenili tokenizery na zbiorze FLORES-200, dając ocenę A za stosunek najgorszego do najlepszego języka do trzech razy, a F powyżej dwunastu. GPT-5 i Llama 3.3 dostały F, a najlepszą ocenę B zdobyła rodzina Gemini i Gemma. Nowsze modele nie zawsze są lepsze: Qwen 3.6 ma stosunek 13,1 razy, a starszy Qwen 3 10,5 razy. Wcześniejsze prace z 2023 roku wykazały podobne różnice, a badanie z 2024 roku pokazało, że tokenizer GPT-4o zawiera długie chińskie tokeny pochodzące w dużej części ze spamu i treści hazardowych.

**Key takeaways:**
- Różnica kosztów dla tej samej treści sięga 17 razy.
- Nowsza wersja modelu nie gwarantuje lepszego tokenizera.
- Problem dotyczy też szybkości, nie tylko ceny.

**Why do I care:** Jeśli twój produkt obsługuje użytkowników w różnych językach, koszt na sesję trzeba liczyć per język, bo budżet z angielskich testów będzie fałszywie optymistyczny. Polski jest w lepszej sytuacji niż amharski, ale też płaci więcej niż angielski. To argument za mierzeniem tokenów w CI, a nie za wiarą w cennik.

**Link:** [How the "Token Tax" Hurts Non-English Users](https://www.deeplearning.ai/the-batch/)

## StateBridge: agenci rozmawiają stanami ukrytymi

**TLDR:** Badacze z Uniwersytetu w Sheffield pokazali metodę, w której agenci oparci na tym samym LLM przekazują sobie stany ukryte zamiast tekstu, bez dodatkowego trenowania. Wyniki są lepsze o 2,4 do 2,9 punktu procentowego niż najlepsza alternatywa.

**Summary:** Token wysłany jako tekst niesie mniej informacji niż stan ukryty modelu, który zawiera na przykład pewność i ślady odrzuconych alternatyw. Problem w tym, że odbiorca został wytrenowany na embeddingach tokenów, więc stanów ukrytych nie rozumie. StateBridge obraca więc stany w stronę przestrzeni embeddingów, skaluje je do właściwej wielkości i a następnie miesza je w proporcji 70 do 30 z najbliższym embeddingiem, co zbliża je do tego, co odbiorca widział w pretreningu. Sześćdziesiąt cztery ostatnie stany ukryte wiadomości dołącza się na początku promptu odbiorcy.

Test objął modele Qwen3 w rozmiarach 4, 8 i 32 miliardy parametrów oraz OLMo3-7B-Think, z czterema rolami: planista, krytyk, rewizor i sędzia. Na GPQA-Diamond Qwen3-8B z StateBridge rozwiązał 52,5 procent pytań, wobec 45,5 dla LatentMAS i 39,9 dla pojedynczego agenta. Kod jest dostępny na licencji Apache 2.0.

**Key takeaways:**
- Metoda działa tylko, gdy agenci używają tego samego modelu.
- Nie wymaga dodatkowego trenowania.
- Poprawa jest widoczna, ale umiarkowana.

**Why do I care:** To raczej sygnał kierunku niż coś do wdrożenia: komunikacja agentów poza tekstem utrudnia audyt, bo nie przeczytasz, co sobie przekazali. Dla architekta, który ceni logi i możliwość odtworzenia decyzji, jest to poważny koszt, o którym w tekście nie ma ani słowa.

**Link:** [Communicating Agents' Thoughts](https://www.deeplearning.ai/the-batch/)
