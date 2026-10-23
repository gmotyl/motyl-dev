---
title: "Zespół AI-native, Meta wraca do open weights, ChatGPT dla nastolatków dostaje najniższą ocenę i mały model dla robotów"
excerpt: "Rady Andrew Nga dla liderów zespołów inżynierskich, trzy nowe modele Mety, krytyczny raport o ChatGPT dla nastolatków, model Beam od Reflection i TurboVLA."
publishedAt: "2026-10-23"
slug: "the-batch-ai-native-team-meta-muse-beam-turbovla"
hashtags: "#thebatch #ai #llm #agents #engineering #leadership #open-source #ml #generated #pl"
source_pattern: "The Batch"
---

## Jak poprowadzić zespół AI-native

**TLDR:** Andrew Ng radzi liderom inżynierskim, żeby prowadzili zespół z przodu, a nie z tyłu. Proponuje cztery obszary, czyli ludzi, projekty, platformy i procesy.

**Summary:** Punkt wyjścia jest sensowny. Celem nie jest tradycyjny zespół, który korzysta z AI, tylko zespół zaprojektowany tak, żeby wykorzystać możliwości AI i obejść jego ograniczenia. W nowym zespole dwu- czy trzyosobowym można zacząć od ludzi, którzy od początku pracują z AI. Duże firmy muszą przesuwać istniejące zespoły.

Pierwszy obszar to ludzie. Autor wprost mówi, że lider, który sam nie steruje agentem kodującym, nie wie, jak to jest, tak jak nie nauczysz się jazdy na rowerze przez oglądanie. Drugi to projekty. Dobrze jest wspierać oddolne pomysły, ale kilka obiecujących projektów potrzebuje poparcia z góry. Ng zwraca uwagę, że zbyt wiele firm patrzy na AI tylko jak na sposób na oszczędności, a większe szanse leżą w nowych produktach i wzroście.

Trzeci obszar to platformy. Chodzi o dane, które agent może przeczytać, a więc repozytoria, dokumentację decyzji produktowych i zgłoszenia z supportu, o narzędzia wewnętrzne, przeglądy kodu przez AI, CI, w którym agent może debugować i wdrażać, oraz sandboksy do uruchamiania agentów. Czwarty to procesy. Skoro napisanie oprogramowania według jasnej specyfikacji tanieje, wąskim gardłem robi się wszystko inne. Stąd pomysł na zespoły z dużym kontekstem i dużymi uprawnieniami.

Co pomija ten tekst? Koszt. Nikt nie wspomina, kto ma zapłacić za porządkowanie danych pod agenty ani jak mierzyć, że zespół jest już AI-native. Brakuje też ostrzeżenia, że większe uprawnienia bez dobrego przeglądu kodu to prosta droga do incydentu.

**Key takeaways:**
- Lider powinien sam budować z agentami, żeby oceniać decyzje na podstawie doświadczenia.
- Warto dołożyć projekty nastawione na wzrost, a nie tylko na oszczędności.
- Po stronie platformy liczy się dostęp agentów do kontekstu, CI i sandboksów.
- Gdy pisanie kodu tanieje, wąskim gardłem stają się decyzje produktowe i koordynacja.

**Why do I care:** To jest wprost o moim zespole i moich klientach. Jeśli frontendowcy mają współdecydować o produkcie, trzeba im dać kontekst i dostęp, a zespół architektury musi przygotować repozytoria i dokumentację tak, żeby agent nie zgadywał. Moim zdaniem to platforma, a nie wybór modelu, rozstrzyga o tym, czy cała zabawa się opłaca.

**Link:** [Jak poprowadzić zespół AI-native, The Batch](https://www.deeplearning.ai/the-batch/)

## Meta wydaje Wonder i otwiera Spark

**TLDR:** Meta w jednym tygodniu opublikowała trzy multimodalne modele, w tym otwarty Muse Spark Open. To najlepszy model open weights spoza Chin.

**Summary:** Muse Wonder Full jest dostępny tylko dla subskrybentów Muse Code za 50 dolarów miesięcznie. Muse Wonder działa przez API za 4 dolary za milion tokenów wejściowych i 20 za wyjściowe. Muse Spark Open ma wagi do pobrania z Hugging Face i od Mety. To model mixture-of-experts z 816 miliardami parametrów, z czego 42 miliardy aktywnych na token.

Według Artificial Analysis Muse Wonder Full dostał 56 punktów w Intelligence Index, o dwa mniej niż Claude Opus 5.5 i tyle samo co Claude Sonnet 5.5. Muse Spark Open dostał 39 i jest siódmy wśród modeli open weights, ale pierwszy wśród amerykańskich. Poprzedni flagowiec Mety, Muse Spark 1.3, miał 48. Przy czterobitowej precyzji potrzeba około terabajta pamięci, czyli dwóch Mac Studio po 512 GB.

Najciekawsze jest to, że żaden inny czołowy model, otwarty czy zamknięty, nie przyjmuje jednocześnie wideo i audio. Licencja pozwala na użytek komercyjny do 20 milionów dolarów przychodu i wymaga napisu o użyciu modelu. Meta nie ujawnia nic o architekturze i danych modeli Wonder, a karta modelu jest bardzo uboga.

**Key takeaways:**
- Muse Spark Open to najlepszy model open weights spoza Chin według Artificial Analysis.
- Wszystkie trzy modele przyjmują tekst, obraz, wideo i audio.
- Licencja ma limit 20 milionów dolarów przychodu i wymóg oznaczenia.
- Model da się uruchomić lokalnie na dwóch Mac Studio z 512 GB.

**Why do I care:** Dla mnie ważna jest lokalna wersja z wejściem wideo i audio. Można ją testować w narzędziach, które nie mogą wysyłać danych klienta w chmurę. Przed użyciem w produkcie sprawdziłbym jednak licencję, bo limit przychodów zablokuje część większych klientów.

**Link:** [Meta Releases Wonder, Opens Spark](https://www.deeplearning.ai/the-batch/)

## ChatGPT dla nastolatków dostaje ocenę

**TLDR:** OpenAI dodaje do wersji dla nastolatków planer college'u i narzędzia do nauki. Tego samego dnia Common Sense Media dała jej najniższą ocenę, czyli niedopuszczalne ryzyko.

**Summary:** ChatGPT for Teens nie jest osobnym modelem ani aplikacją, tylko zestawem ustawień, klasyfikatorów, promptów i funkcji interfejsu, które włączają się dla kont 13 do 17 lat albo dla kont, które model przewidujący wiek uzna za należące do nieletniego. Nowości to College Planner, fiszki i zamiana notatek w quizy.

Instytut Common Sense Media przeprowadził ponad cztery tysiące promptów na kontach nastolatków, mniej więcej połowę przed startem wersji dla nastolatków i połowę po. Wyniki są kiepskie. Rodzice nie dostawali alertów, gdy testerzy przez godzinę opisywali kryzys. ChatGPT przeoczył ponad jedną czwartą kryzysów, w których psychiatrzy uznali odesłanie do pomocy za konieczne. Dla promptów wskazujących na depresję odsetek odpowiedzi z numerem telefonu zaufania spadł z 63 do 3 procent. Tryb nauki często oferował przycisk z gotową odpowiedzią, a prefiks z @study wystarczył, żeby wyjść z godzin nauki ustawionych przez rodzica.

OpenAI odpowiada, że testy mogły zacząć się i skończyć, zanim kontrola rodzicielska w pełni zadziałała, i prosi o powtórkę. Warto zauważyć, że instytut dostaje pieniądze między innymi od OpenAI Foundation i od firm, których produkty ocenia, choć deklaruje pełną niezależność redakcyjną. Do tego badanie na prawie tysiącu tureckich licealistów pokazało, że uczniowie z nieograniczonym GPT-4 mieli lepsze wyniki w pracach domowych, ale o 17 procent gorsze na egzaminie bez AI.

**Key takeaways:**
- Alerty dla rodziców nie zadziałały w testach, a OpenAI mówi, że konta trzeba powiązać przez około trzy godziny.
- Odsetek odpowiedzi z numerem zaufania dla promptów o depresji spadł z 63 do 3 procent.
- Przycisk z gotową odpowiedzią podważa sens trybu nauki.
- Osiem kolejnych stanów dołączyło do pozwu przeciwko OpenAI.

**Why do I care:** To historia głównie o regulacjach i produkcie, ale jeśli budujemy aplikację z czatem, w której mogą być nieletni, to lista zarzutów jest gotową listą testów. Szczególnie wykrywanie wieku i alerty trzeba testować od początku do końca, a nie zakładać, że działają.

**Link:** [ChatGPT for Teens Gets a Report Card](https://www.deeplearning.ai/the-batch/)

## Nvidia zabiega o nowego partnera

**TLDR:** Reflection AI, startup wspierany przez Nvidię, pokazał model Beam. To drugi amerykański model open weights, który generuje najmniej tokenów na zadanie.

**Summary:** Beam ma 501 miliardów parametrów w architekturze mixture-of-experts, z 23 miliardami aktywnymi na token, i jest zaprojektowany do kodowania i zadań agentowych. Dostęp jest na razie przez listę oczekujących, a wagi na licencji Apache 2.0, wraz z raportem technicznym, mają się pojawić pod koniec października. Cena to 70 centów za milion tokenów wejściowych i 2,10 dolara za wyjściowe.

W teście Artificial Analysis Beam dostał 30 punktów w Intelligence Index. To drugie miejsce wśród modeli z USA, za Muse Spark Open, i za MiMo-V2.6-Pro, GLM-5.3, a nawet za Qwen 3.8-27B. Za to zużywa około 26 tysięcy tokenów wyjściowych na zadanie, najmniej wśród modeli open weights, i jest bardzo szybki, 228 tokenów na sekundę.

Reflection oszacowało, że Beam zużywa na testach rozumowania jedną czwartą do jednej trzeciej mocy obliczeniowej GLM-5.2. Autorzy newslettera zauważają, że to przybliżenie, bo pomija czytanie promptu i koszt serwowania. W tle jest informacja, że Nvidia, która zainwestowała w Reflection 800 milionów dolarów, rozmawia o kolejnej inwestycji albo przejęciu. To tłumaczy część zainteresowania.

**Key takeaways:**
- Beam używa najmniej tokenów na zadanie wśród modeli open weights.
- Wagi mają być na licencji Apache 2.0, a więc bardziej swobodnej niż u Mety.
- Wynik 30 jest niższy niż u kilku modeli chińskich, a nawet u małego Qwen 3.8-27B.
- Nvidia rozmawia o inwestycji, przejęciu lub licencji.

**Why do I care:** Licencja Apache 2.0 i mała liczba tokenów to argument dla zespołów, które płacą za agenty kodujące. Ale wynik 30 oznacza, że do trudnych zadań to jeszcze nie ten poziom. Poczekałbym na wagi i niezależne testy na prawdziwym kodzie.

**Link:** [Nvidia Courts A New Partner](https://www.deeplearning.ai/the-batch/)

## Jeden dekoder zamienia wyjścia małych modeli w ruch

**TLDR:** TurboVLA to mały model dla robotów, w którym osobne enkodery obsługują obraz i tekst, a dekoder zamienia wynik w polecenia silnikom. Dorównuje znacznie większym modelom przy ułamku pamięci.

**Summary:** Zwykle architektura vision-language-action opiera się na dużym modelu językowym, który łączy obraz z instrukcją, a dopiero potem dekoder produkuje ruchy. Naukowcy z Huazhong University of Science and Technology zrezygnowali z LLM. Użyli enkodera DINOv3 dla obrazu, lekkiego BERT-a dla tekstu i sześciu warstw cross-attention, które łączą słowa z obiektami na scenie.

Na benchmarku LIBERO system osiągnął 97,6 procent sukcesów przy 0,2 miliarda parametrów, opóźnieniu 31,2 ms i 0,9 GB VRAM. Następny w kolejności CogVLA miał 97,4 procent, 8,3 miliarda parametrów i 16,1 GB VRAM. Na RoboTwin 2.0 TurboVLA miał 88,1 procent przy 43,4 ms, a najlepszy konkurent 87,6 procent przy 164,4 ms. Na prawdziwym ramieniu AgileX Piper wynik w czterech zadaniach wahał się od 80 do 92,5 procent.

Cena tego rozwiązania jest jasna. Model nie rozbija ogólnych poleceń typu posprzątaj pokój na podzadania, więc potrzebuje już konkretnych instrukcji. Autorzy newslettera trafnie zauważają, że to powrót do podejścia sprzed LLM-ów, z 2022 roku, tylko z lepszymi składnikami.

**Key takeaways:**
- TurboVLA ma 0,2 miliarda parametrów i działa na jednej karcie RTX 4090.
- Opóźnienie na LIBERO to 31,2 ms, a konkurent z 8,3 miliarda parametrów miał 115,5 ms.
- Model nie planuje podzadań, więc wymaga konkretnych poleceń.

**Why do I care:** To nie moja dziedzina, ale wniosek jest uniwersalny. Zanim dołożymy do systemu duży model językowy, warto zapytać, czy to zadanie go naprawdę wymaga. Mniejszy, wyspecjalizowany komponent bywa szybszy, tańszy i łatwiejszy do przewidzenia.

**Link:** [A Single Decoder Turns Small Model Outputs into Action](https://www.deeplearning.ai/the-batch/)
