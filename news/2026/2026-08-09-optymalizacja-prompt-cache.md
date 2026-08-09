---
title: "Jak naprawdę działa prompt cache i dlaczego psujesz go bez wiedzy"
excerpt: "Prompt caching potrafi drastycznie obniżyć koszt sesji z agentem, ale wystarczy jedna zmiana na początku promptu, żeby stracić cały efekt."
publishedAt: "2026-08-09"
slug: "optymalizacja-prompt-cache"
hashtags: "#alexewerlof #promptcaching #llm #agentic #inzynieriaoprogramowania #koszty #generated #pl"
source_pattern: "AlexEwerlöf"
---

## Prompt cache w praktyce, czyli za co naprawdę płacisz przy pracy z agentem

**TLDR:** Modele językowe liczą tokeny wejściowe i wyjściowe zupełnie inaczej pod względem kosztu i czasu, a prompt cache pozwala uniknąć ponownego przeliczania tej samej historii rozmowy. Problem w tym, że wystarczy zmienić jeden znak na wczesnym etapie promptu, na przykład listę dostępnych narzędzi, żeby unieważnić cały cache od tego miejsca w dół.

**Summary:** Autor zaczyna od czegoś, co większość z nas traktuje jako czarną skrzynkę, czyli od tego, co się dzieje w momencie wysłania promptu do modelu. Zapytanie trafia najpierw do tokenizacji, potem do prefillu, czyli policzenia tak zwanego KV cache, a na końcu do dekodowania, czyli generowania odpowiedzi token po tokenie. Prefill jest kosztowny obliczeniowo, ale da się go świetnie zrównoleglić, więc dostawcy modeli liczą sobie za input relatywnie mało. Dekodowanie jest z kolei serializowane, bo każdy kolejny token wymaga przetworzenia całej wagi modelu i rosnącego KV cache, dlatego output bywa trzy do dziesięciu razy droższy niż input. To nie jest ciekawostka akademicka, tylko konkretna wskazówka, gdzie szukać oszczędności.

Sam mechanizm cache'owania promptów działa na zasadzie znanej z klasycznego cachingu API sprzed ery LLM-ów. Serwer trzyma wynik kosztownych obliczeń przez jakiś czas, a kolejne zapytanie sprawdza, czy podobny payload już przetworzono. Trafienie w cache oznacza pominięcie ciężkiej części obliczeń, co skraca czas do pierwszego tokena i obniża koszt. Pudło oznacza pełną cenę. To dzieje się w tle, więc użytkownik nie ma pewności, czy jego zapytanie skorzysta z cache czy nie, a stare wpisy są usuwane algorytmem LRU, bo cache też kosztuje, tylko mniej niż pełne przeliczenie.

Najciekawszy fragment artykułu dotyczy tego, co dokładnie wchodzi w skład promptu wysyłanego do modelu za każdym razem, czyli system prompt, definicje narzędzi, definicje skilli, historia sesji, dodatkowy kontekst w rodzaju otwartych plików i wreszcie prompt użytkownika. Autor policzył to na własnych sesjach agentowych i wyszło mu, że opisy narzędzi zajmują około 13.5 tysiąca tokenów, a opisy skilli kolejne 2.5 tysiąca, podczas gdy sam surowy system prompt to zaledwie 1 do 8 tysięcy tokenów w zależności od zadania. VS Code potrafi domyślnie ładować ponad pięćdziesiąt narzędzi, podczas gdy minimalistyczne środowiska typu Pi ograniczają się do czterech, czyli odczytu, zapisu, edycji plików i basha. To pokazuje, gdzie realnie ucieka budżet tokenowy i dlaczego modele gubią się, gdy mają do dyspozycji więcej niż trzydzieści czy pięćdziesiąt narzędzi naraz.

Druga część tekstu to twarde zasady dotyczące niemutowalności sesji. Jeśli zmienisz listę dostępnych narzędzi w środku rozmowy, wszystko od tego momentu w dół musi zostać przeliczone od nowa, bo cache jest unieważniany od punktu zmiany. Autor radzi, żeby ustalić zestaw narzędzi zanim wyślesz pierwszy prompt, trzymać skille lokalnie w repozytorium zamiast w globalnym folderze, żeby ograniczyć ich liczbę do sensownego minimum, i trzymać się jednego modelu przez całą sesję, bo zmiana modelu albo poziomu thinkingu w trakcie też kasuje cache. Stąd te ostrzeżenia w VS Code, kiedy próbujesz przełączyć model w środku konwersacji.

Ostatni wątek dotyczy długich sesji i kompaktowania. Czas przetwarzania promptu rośnie kwadratowo względem jego długości, więc podwojenie promptu daje czterokrotnie dłuższy prefill, a to akurat dobrze się cache'uje. Gorzej z generowaniem tokenów, bo tam czas rośnie liniowo względem długości KV cache i nie da się tego przyspieszyć cachem, bo każdy nowy token wymaga przejścia przez całą historię. Dlatego długie sesje zwalniają z czasem, nawet jeśli masz milion tokenów kontekstu. Kompaktowanie sesji pomaga, ale ma swoją cenę, bo zamienia trafienie w cache na kompresję, która sama w sobie wymaga nowego prefillu i jest stratna, więc zbyt częste kompaktowanie może wyjść drożej niż zostawienie surowej sesji.

**Key takeaways:**
- Output modelu jest kilkukrotnie droższy niż input, bo dekodowanie jest serializowane i wymaga przetworzenia całego KV cache dla każdego tokena
- Zmiana narzędzi, skilli albo modelu w środku sesji unieważnia cache od tego miejsca w dół, więc lepiej ustalić konfigurację przed pierwszym promptem
- Opisy narzędzi i skilli potrafią zjadać kilkanaście tysięcy tokenów przy każdym zapytaniu, więc ograniczenie ich liczby obniża koszt i poprawia jakość odpowiedzi
- Kompaktowanie długiej sesji ma sens, ale zbyt częste stosowanie może kosztować więcej niż zostawienie rozmowy w spokoju

**Why do I care:** Jako ktoś, kto na co dzień pracuje z agentami kodującymi, ten artykuł tłumaczy coś, co wcześniej czułem intuicyjnie, ale nie potrafiłem nazwać, czyli dlaczego sesja nagle robi się wolna i droga po dodaniu kolejnego MCP servera albo po przełączeniu modelu w połowie zadania. Praktyczny wniosek jest prosty: warto traktować konfigurację sesji jak coś ustalanego raz na starcie, a nie modyfikowanego na bieżąco, i pilnować liczby aktywnych narzędzi zamiast ładować wszystko, co dostępne, na wszelki wypadek. To akurat koresponduje z tym, co widać w praktyce przy dużych zestawach MCP toolów, gdzie model zaczyna gubić się w wyborze właściwej funkcji, a rachunek za tokeny rośnie bez wyraźnego powodu.

**Link:** [Optimizing prompt cache](https://blog.alexewerlof.com/p/optimizing-prompt-cache?publication_id=1002265&post_id=210324402&isFreemail=true&triedRedirect=true)
