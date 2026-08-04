---
title: "Qwen 3.8 Max otwiera wagi, ale liczy się harness, nie tylko model"
excerpt: "Alibaba pokazuje 2,4-bilionowy model Qwen 3.8 Max i mniejszą 27B wersję na otwartych wagach, a przy tym cały ekosystem open source w Chinach przyspiesza. Do tego licencje, które nie są tak otwarte jak się wydaje, i coraz głośniejszy temat harnessów agentowych."
publishedAt: "2026-08-04"
slug: "qwen-38-max-otwarte-wagi-i-wyscig-modeli-ai"
hashtags: "#AINews #Qwen #OpenWeights #LLM #AgentHarness #generated #pl"
source_pattern: "AINews"
---

## Qwen 3.8 Max i Qwen 3.8-27B: otwarte wagi od Alibaby, tylko sprawdź licencję

**TLDR:** Alibaba ogłosiła Qwen 3.8 Max, model na 2,4 biliona parametrów, i zapowiedziała otwarcie jego wag razem z mniejszą wersją 27B. Wyniki w benchmarkach są bardzo dobre, cena API spadła, ale sprawa licencji w USA, UE, Wielkiej Brytanii i Korei psuje trochę ten obraz.

**Summary:** Qwen 3.8 Max to nowy flagowiec Alibaby, model mixture-of-experts na 2,4 biliona parametrów całkowitych, z czego aktywuje się tylko około 95 miliardów na token, czyli jakieś 4 procent. Firma zapowiedziała, że w kolejnym tygodniu wypuści wagi tego modelu na licencji open, a razem z nim mniejszą wersję Qwen 3.8-27B. Cena w API spadła do 2 dolarów za milion tokenów wejściowych i 6 dolarów za wyjściowe, z tokenami z cache po 25 centów, co przy modelach tej wielkości robi realną różnicę w kosztach agentów pracujących na dużych kontekstach. Kontekst sięga miliona tokenów, a wyjście do 128 tysięcy, więc to model myślany pod pracę na całych repozytoriach i długich transkryptach, nie pod pojedyncze pytania w czacie.

Wyniki w niezależnych rankingach są konkretne, nie tylko marketingowe. Arena umieściła Qwen 3.8 Max na czwartym miejscu w Frontend Code Arena z wynikiem 1668 Elo, za Claude Opus 5 i Kimi K3, a w Vision Arena na drugim miejscu. Vals AI podało 87,3 procent na SWE-bench i 66,1 na własnym indeksie, czyli tyle samo co Claude Opus 4.7, przy koszcie testu ponad dwa razy niższym. To nie są liczby, które można zignorować, zwłaszcza że poprzednia wersja, Qwen 3.7 Max, miała 57,5 punktu, więc skok o 8,6 punktu w dwa i pół miesiąca jest wyraźny.

Jest jednak druga strona tej historii. Jamin Ball słusznie zauważył, że porównywanie samej ceny za token ignoruje to, jak ogromne są te modele infrastrukturalnie. Model na ponad 2 biliony parametrów to nie coś, co postawisz na jednym GPU, tu mówimy o klastrach kilku, ośmiu i więcej akceleratorów klasy H100 czy B200. Do tego dołącza się problem licencji: OstrisAI odczytał warunki jako zakaz pobierania i używania modelu w USA, UE, Wielkiej Brytanii i Korei. Alibaba nie skomentowała tego w cytowanych źródłach, więc sprawa wisi w powietrzu. Podobny spór toczy się wokół MiniMax H3, więc to nie jest odosobniony przypadek, a raczej wzorzec w tej fali chińskich wydań.

Ciekawszy dla mnie jest wątek Qwen 3.8-27B. Flagowiec buduje reputację i pozycję w rankingach, ale to właśnie mniejszy model ma szansę trafić realnie na maszyny deweloperów i do lokalnych wdrożeń. TeortaxesTex zauważył, że 27B może być dystylowaną wersją możliwości flagowca, co byłoby sensownym kierunkiem, jeśli chce się mieć coś użyteczne poza laboratoriami z serwerowniami pełnymi GPU.

**Key takeaways:**
- Qwen 3.8 Max ma 2,4 biliona parametrów całkowitych, aktywuje około 4 procent na token, i według Alibaby zostanie udostępniony na otwartych wagach razem z mniejszym Qwen 3.8-27B.
- Benchmarki są mocne: czwarte miejsce w Frontend Code Arena, 87,3 procent na SWE-bench, wynik porównywalny z Claude Opus 4.7 przy niższym koszcie.
- Licencja może ograniczać użycie w USA, UE, Wielkiej Brytanii i Korei, a Alibaba tego nie wyjaśniła, więc "open weights" nie znaczy tu automatycznie "open source" w sensie prawnym.

**Why do I care:** Jako ktoś, kto ogląda Frontend Code Arena z zainteresowaniem, czwarte miejsce Qwena zaraz za Opusem i Kimi to sygnał, że jakość generowanego frontendu z modeli open weight realnie się poprawia, nie tylko w testach syntetycznych. Ale przy wyborze modelu do produkcyjnego pipeline'u ja i tak najpierw sprawdzam licencję, a nie tabelkę z Elo, bo firma nie chce się tłumaczyć prawnikom z tego, że model, na którym stoi feature, ma niejasny status w UE. Do tego dochodzi kwestia hostingu: 2,4 biliona parametrów to nie coś, co wdrożysz sam, więc w praktyce i tak jesteś zależny od czyjegoś API, co trochę psuje narrację o "otwartości".

**Link:** [AINews: Qwen 3.8 Max(2.4T) and 27B, new open weights models for Coding and Cowork](https://www.latent.space/p/ainews-qwen-38-max24t-and-27b-new)

## Harness robi więcej niż model: Cloudflare, Cursor, LangChain i Cline

**TLDR:** Kilka firm niezależnie podkreśliło, że o wynikach agentów decyduje coraz częściej nie sam model, a runtime i harness wokół niego. Cloudflare wypuściło nowy runtime dla agentów, Cursor zgłosił 20 do 30 procent lepszą efektywność tokenową, a LangChain przenosi Deep Agents do publicznej bety.

**Summary:** Cloudflare ogłosiło @cloudflare/computer, runtime dla agentów, który dynamicznie przełącza się między lekkimi izolatami a pełnymi kontenerami Linux, w zależności od tego, czego dany agent w danym momencie potrzebuje. Cursor podał, że jego agenci w chmurze są teraz 20 do 30 procent bardziej efektywni tokenowo, a przy zadaniach typu computer-use nawet 80 procent, i przy tym dodał wtyczki do Google Workspace, więc agent może teraz sięgać po Gmaila, Dysk, Kalendarz, Docsy i Sheets. LangChain zapowiedział, że Managed Deep Agents wchodzi do publicznej bety, z wbudowanymi ewaluacjami, pamięcią, OAuth i sandboxingiem.

Najbardziej konkretną obserwację podał Cline. Ich zespół zauważył, że wiele modeli open weight jest trenowanych z RL w taki sposób, że model chce wydawać dodatkowe tokeny na weryfikację, czyli powtórne odpalanie testów, sprawdzanie buildów, ponowne czytanie diffów. Kiedy harness pozwala modelowi robić to naturalnie, zamiast go ograniczać, Cline zgłasza około 20 procent lepsze wyniki wyłącznie z tej zmiany, bez zmiany samego modelu. To jest dokładnie odwrotność podejścia "jeden dobry prompt i gotowe", które wciąż krąży w wielu zespołach.

Ten sam wątek wraca w kontekście Qwen 3.8 Max i innych gigantycznych modeli MoE. ZhihuFrontier opisało to jako przesunięcie punktu kontroli od prompt engineeringu w stronę runtime harnessów, które zarządzają pamięcią, planowaniem, weryfikacją i odzyskiwaniem po błędach. Osobny artykuł podzielił porażki agentów na 41 kategorii według tego, która relacja w systemie zawiodła, model, użytkownik, harness, narzędzia, pamięć czy środowisko, z automatyczną klasyfikacją zgadzającą się z ludzkimi ocenami na poziomie kappa 0,76.

**Key takeaways:**
- Cloudflare, Cursor i LangChain w tym samym momencie inwestują w infrastrukturę uruchamiania agentów, nie w same modele.
- Cline zgłasza około 20 procent lepsze wyniki tylko z tego, że harness pozwala modelowi wydawać więcej tokenów na weryfikację, zamiast to ograniczać.
- Analizy porażek agentowych coraz częściej rozkładają błąd na relacje w systemie, a nie na samą "głupotę modelu".

**Why do I care:** To jest temat, który dotyka mnie bezpośrednio, bo od pewnego czasu buduję agentowe flow w projektach frontendowych i widzę tę samą lekcję na własnej skórze: dwa różne harnessy na tym samym modelu dają zauważalnie różne rezultaty. Obserwacja Cline o pozwalaniu modelowi na weryfikację zamiast jej wycinania dla "szybkości" to konkretna, praktyczna rada, którą można od razu przetestować w swoim pipeline. Dla architekta to sygnał, żeby traktować harness jako pełnoprawny element systemu, z własnymi testami i wersjonowaniem, a nie jako doklejony skrypt wokół wywołania API.

**Link:** [AINews: Qwen 3.8 Max(2.4T) and 27B, new open weights models for Coding and Cowork](https://www.latent.space/p/ainews-qwen-38-max24t-and-27b-new)

## MiniMax H3 i powtarzający się spór o to, co znaczy "open"

**TLDR:** MiniMax H3, otwarty model wideo na 33B parametrów, objął pierwsze miejsce w Video Arena wśród modeli open, ale znowu wraca temat licencji ograniczających użycie w kilku krajach, tak jak przy Qwen 3.8 Max.

**Summary:** MiniMax H3 to model generujący wideo z tekstu, obrazu, wideo i audio w jednym kontekście, z klipami do 15 sekund, który da się odpalić na jednej karcie RTX 5090 przy użyciu stosu ComfyUI, zajmując około 40GB i generując pięciosekundowy klip w około pięć i pół minuty w wczesnych testach. Arena dała mu pierwsze miejsce w Video Arena wśród modeli open, z przewagą 280 punktów nad następnym w rankingu, a w zadaniu image-to-video model wyrównał z najlepszymi rozwiązaniami zamkniętymi. MiniMax twierdzi, że to obecnie najlepszy otwarty model wideo według Areny i Artificial Analysis.

Problem jest ten sam co przy Qwen: OstrisAI odczytał licencję jako zakaz użycia w USA, UE, Wielkiej Brytanii i Korei, co szybko rozpaliło dyskusję. Później VictorSuOrtiz sprostował, że w tych regionach wymagany jest formalny proces autoryzacji, a nie całkowity zakaz, co jest istotną różnicą dla zespołu, który ocenia, czy w ogóle może wdrożyć taki model. Podobnie jak przy Qwenie, kimmonismus podsumował to zgrabnie: otwarte wagi, mocny potencjał lokalny, ale nie w pełni otwarty stos, bo część funkcji jak regeneracja w 2K albo sparse attention zostaje po stronie serwera.

**Key takeaways:**
- MiniMax H3 to 33B model wideo, numer jeden w Video Arena wśród modeli open, z działającym lokalnym wdrożeniem na jednej karcie RTX 5090.
- Licencja wywołała ten sam spór co przy Qwen: pierwotny odczyt mówił o zakazie w USA, UE, Wielkiej Brytanii i Korei, później sprostowany do procesu autoryzacji.
- "Open weights" u chińskich labów regularnie oznacza coś innego niż pełne open source, a granica między jednym a drugim wciąż nie jest ustandaryzowana.

**Why do I care:** To bardziej historia biznesowo-prawna niż coś, co zmienia moją codzienną pracę frontendową, bo model wideo generatywnego nie trafia jeszcze do typowego stacku produktowego, w którym siedzę. Zapisuję sobie jednak ten wzorzec licencyjny jako powtarzający się sygnał ostrzegawczy: zanim ktokolwiek w zespole zapisze w architekturze "używamy modelu open weight X", ja sprawdzam warunki licencji osobiście, bo powtarzalność tego problemu u kilku różnych chińskich labów w tym samym miesiącu to już nie przypadek, to standardowa praktyka, z którą trzeba się liczyć.

**Link:** [AINews: Qwen 3.8 Max(2.4T) and 27B, new open weights models for Coding and Cowork](https://www.latent.space/p/ainews-qwen-38-max24t-and-27b-new)

## DeepSeek V4 Flash i wyścig cenowy wśród chińskich modeli otwartych

**TLDR:** DeepSeek V4 Flash wypadł jako najbardziej opłacalny model powyżej progu 60 punktów w Vals Index, aż 35 razy tańszy od kolejnego modelu na tym poziomie wyniku. To kolejny dowód, że przewaga chińskich labów w modelach open coraz mniej opiera się na samym pretrenowaniu, a coraz bardziej na koszcie i harnessach.

**Summary:** DeepSeek V4 Flash, konkretnie checkpoint 0731, uzyskał według Vals AI status najtańszego modelu w indeksie powyżej 60 punktów, przy koszcie aż 35 razy niższym od następnego modelu z podobnym wynikiem. Większość tej przewagi kosztowej pochodzi z zadań kodowania i agentowych, nie z ogólnej rozmowy. htihle zgłosił 57,1 i 63,0 procent na WeirdML dla wariantów high i max, argumentując, że sam harness testowy może nie doceniać rzeczywistych możliwości modelu. Together AI od razu zaproponowało ten model jako produkcyjny endpoint pod długo działające agenty.

W tym samym czasie krążą sygnały, że GLM-5.3 jest blisko wydania, a GLM-5.2 Max już teraz zajmuje drugie miejsce ogólnie i pierwsze wśród modeli open w Frontend Code Arena. Kimi K3 z kolei pokazał, jak duży wpływ na wynik ma dostawca infrastruktury: jeden endpoint dawał gorsze, zapętlające się zachowanie, a endpoint Modala dał najlepszy wynik na CEO-Bench. To potwierdza ten sam wątek co w sekcji o harnessach: sam model to dziś tylko część równania, druga część to to, kto go serwuje i jak.

**Key takeaways:**
- DeepSeek V4 Flash 0731 jest według Vals AI 35 razy tańszy od najbliższego konkurenta powyżej 60 punktów w ich indeksie, głównie dzięki zadaniom kodowania i agentowym.
- GLM-5.3 jest zapowiadane, a GLM-5.2 Max już teraz zajmuje pierwsze miejsce wśród modeli open w Frontend Code Arena.
- Wybór dostawcy infrastruktury dla tego samego modelu, jak w przypadku Kimi K3, może zmienić wynik benchmarku z najgorszego na najlepszy.

**Why do I care:** Z perspektywy kosztów w projekcie to jest dla mnie najbardziej praktyczna wiadomość z całego zestawu. Jeśli buduję funkcję z LLM w tle, która ma skalować się do tysięcy użytkowników, różnica rzędu kilkudziesięciu razy w koszcie tokena robi większą różnicę dla budżetu niż dwa punkty procentowe w jakimś benchmarku. Zapamiętuję też lekcję z Kimi K3: przed podjęciem decyzji o modelu warto przetestować kilku dostawców tego samego modelu, bo wynik może się różnić drastycznie w zależności od tego, kto go hostuje, a nie tylko od tego, jaki model wybraliśmy.

**Link:** [AINews: Qwen 3.8 Max(2.4T) and 27B, new open weights models for Coding and Cowork](https://www.latent.space/p/ainews-qwen-38-max24t-and-27b-new)

## OpenAI: nowa architektura głosowa i tani wynik matematyczny

**TLDR:** OpenAI opisało nową architekturę realtime voice pod nazwą GPT-Live, z oddzielną szybką ścieżką audio i wolniejszym, asynchronicznym wnioskowaniem, oraz skróciło czas startu sesji z sześciu zapytań sieciowych do jednego. Do tego firma ogłosiła, że wewnętrzna wersja kolejnego modelu znalazła 10 nowych wyników w otwartych problemach matematycznych za około 2000 dolarów w tokenach.

**Summary:** GPT-Live rozdziela ścieżkę audio od ścieżki rozumowania, dzięki czemu model może słuchać i mówić jednocześnie, a nie tylko odpowiadać na skończone wypowiedzi w kolejce. OpenAI dodało też asynchroniczną kompresję długiego kontekstu w sesjach głosowych i skróciło uruchomienie sesji z sześciu rund komunikacji sieciowej do jednej, co ma bezpośredni wpływ na odczuwane opóźnienie w rozmowie głosowej.

Drugi ogłoszony wynik jest inny w charakterze, ale trafia w podobny temat kosztu i skali: wewnętrzna, jeszcze niewydana wersja kolejnego modelu OpenAI znalazła dziesięć nowych wyników w długo nierozwiązanych problemach z matematyki i teorii złożoności, za sumę około 2000 dolarów w kosztach tokenów licząc po cenach GPT-5.6 Sol. Reakcje były podzielone, część osób podkreślała, że to bardzo mało pieniędzy za realne wyniki naukowe, część zwracała uwagę, że licząc tylko koszt udanych prób, a nie wszystkich prób łącznie, łatwo zaniżyć rzeczywisty koszt takiego eksperymentu.

**Key takeaways:**
- GPT-Live rozdziela szybką ścieżkę audio od wolniejszego wnioskowania i skraca start sesji z sześciu rund sieciowych do jednej.
- Wewnętrzna wersja kolejnego modelu OpenAI znalazła 10 nowych wyników matematycznych za około 2000 dolarów w tokenach, choć część komentatorów kwestionuje sposób liczenia tego kosztu.
- Obie wiadomości pokazują ten sam trend, że OpenAI inwestuje równolegle w infrastrukturę czasu rzeczywistego i w automatyzację badań naukowych.

**Why do I care:** Wynik matematyczny to czysto badawcza sprawa, nie ma tu dla mnie żadnej bezpośredniej użyteczności frontendowej, więc mówię to jasno: to news z innej branży, ciekawy, ale nie wpływa na moją pracę. Architektura GPT-Live jest już bliższa mojemu światu, bo każdy, kto budował UI z rozmową głosową w czasie rzeczywistym, wie, jak bolesne jest opóźnienie przy starcie sesji i jak trudno zrobić naturalne "przerywanie" modelu w trakcie odpowiedzi. Skrócenie startu z sześciu rund do jednej to konkretna poprawa UX, którą będę chciał sprawdzić w praktyce, jeśli kiedyś trafi do publicznego API, a nie tylko do opisu technicznego.

**Link:** [AINews: Qwen 3.8 Max(2.4T) and 27B, new open weights models for Coding and Cowork](https://www.latent.space/p/ainews-qwen-38-max24t-and-27b-new)
