---
title: "Fundamenty inżynierskie w erze agentów, GLM-5.3 i wyścig o szybkość modeli"
excerpt: "Dlaczego umiejętności inżynierii oprogramowania wciąż decydują o jakości aplikacji AI, plus GLM-5.3 z niepokojącymi zdolnościami cyberbezpieczeństwa, wyścig o przepustowość modeli i nowy sposób zarządzania pamięcią agentów."
publishedAt: "2026-08-28"
slug: "software-fundamentals-glm-5-3-ai-speed-race-self-gc"
hashtags: "#thebatch #ai #llm #agents #generated #pl"
source_pattern: "The Batch"
---

## Fundamenty inżynierii oprogramowania nie znikają wraz z agentami

**TLDR:** Andrew Ng argumentuje, że kodowanie agentowe nie zwalnia programistów z rozumienia podstaw inżynierii oprogramowania. Bez tej wiedzy agent robi złe kompromisy w zakresie opóźnień, dostępności, spójności i kosztów, a deweloper nawet nie wie, że taki kompromis w ogóle istniał.

**Summary:** Punkt wyjścia jest prosty. Nawet jeśli cały kod pisze agent, to ktoś musi wiedzieć, jak sterować jego decyzjami, bo inaczej agent optymalizuje pod byle co. Ktoś, kto "vibe koduje" bez rozumienia fundamentów, potrafi zbudować prostą aplikację, ale prawie na pewno w środku siedzą złe kompromisy dotyczące opóźnień, dostępności, spójności, niezawodności, prostoty utrzymania czy kosztu, o których deweloper nawet nie wiedział, że mógł je świadomie wybrać.

Ng wylicza pięć obszarów, które według wewnętrznego badania DeepLearning.AI dotyczącego umiejętności AI Engineering pozostają kluczowe: budowanie aplikacji full-stack, zarządzanie danymi, projektowanie architektury systemów, budowanie systemów bezpiecznych i niezawodnych oraz skalowanie i operowanie w produkcji. Co ciekawe, agentowe kodowanie sprawia, że coraz więcej programistów, którzy wcześniej mieli wąską specjalizację, na przykład frontend albo mobile, zaczyna pełnić szerszą rolę full-stack, bo agent pomaga w częściach, które wcześniej były poza ich strefą komfortu.

Dane dostają osobny akapit nie bez powodu. To fundament, który trudno zmienić nawet z pomocą agentów przy migracjach, więc dobór modelu danych i infrastruktury przechowywania wpływa na szybkość, skalowalność, dostępność, niezawodność i koszt na długo po tym, jak decyzja zapadła. Architektura systemu to z kolei ruchomy cel: prosta architektura pod szybki prototyp rzadko nadaje się do pierwszej produkcyjnej wersji, a ta z kolei zmieni się, gdy aplikacja zacznie się skalować.

Ng zauważa też przesunięcie w stronę "shift left" w bezpieczeństwie, czyli przenoszenia pracy nad bezpieczeństwem wcześniej w cyklu życia projektu, oraz przypomina, że operowanie w produkcji wymaga obserwowalności, alertów i zarządzania incydentami, a nie tylko wdrożenia i zapomnienia.

**Key takeaways:**
- Brak rozumienia fundamentów nie znika wraz z agentem, tylko przenosi się w decyzje, których deweloper nie wie, że podejmuje
- Pięć filarów: full-stack, dane, architektura, bezpieczeństwo i niezawodność, skalowanie w produkcji
- Wiele wąskich specjalizacji zamienia się w role full-stack, bo agent wypełnia luki kompetencyjne

**Why do I care:** To jest dokładnie ten argument, który powtarzam zespołom od dawna, tylko teraz ma nową motywację. Jeśli architekt czy senior nie rozumie, dlaczego wybiera dany model danych albo dlaczego dana granica frontend-backend ma sens, to agent nie naprawi tej luki, tylko ją zamaskuje ładnie sformatowanym kodem. Największe ryzyko widzę w zespołach juniorskich, które od razu zaczynają od kodowania agentowego bez etapu budowania własnej intuicji architektonicznej. To nie jest argument przeciwko agentom, tylko przypomnienie, że nadal potrzebny jest ktoś, kto rozumie, co agent właśnie zrobił.

**Link:** [Software Engineering Fundamentals Remain Essential for AI Developers](https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/MVD7t2sgXc9W7_mVSv50PBg3W8VsNl15Td8SfN7gG7_x5m_5PW7lCGcx6lZ3m7W5dMhm-7l4XYSW3P-NqL5J5TLkW4cF0Jp5c_w_SW4QlzZn5HKCQPVrvMcC18WjVwVv-97b3xhKm0Md6ytGjFZQrVtXS5v7ryD4RW9g-NCZ1_NtPlVBNlb_6F9HX8W7rWMSm43NpL4W7DvsPc8nYhs1W8Ywxtt6pTL8QW52HSWx2mGPwtW8phzzT7rq4ZcN6_g9LFd0lwGW7l37T_7QTCZhW66DDP_2f69TJW6N1rRn6zcDYBW7sbR9T27mjTGVJ0CFl1NrFYHW5r3stx1HS8cHW6GPrL08Vx-rfW3BVZ-82KMb0zW48Bpf61jVfkSW8nl9Fn6FrsbkW2CC1mg14VPMSW5GhgPR28QdmWW4T-7xh4G5Tr6W13TSqR6pM8Y4W67MBTJ2Pm2v4W8G7-8R7LXPNwW8twbS26F8XXpVw-Xr59dWkrzW17lc783qLK-3W1DfS564V975qW6wq9n76zPHw5W1hMm5m1BQh2RW2Dk_K47Lwsf_W2g16TQ4VZjcnf63PxSY04)

## GLM-5.3 zyskuje niepokojące zdolności w cyberbezpieczeństwie

**TLDR:** Najnowszy flagowy model Z.ai wyrównuje wynikami lidera modeli open-weights, Kimi K3, ale zwraca uwagę głównie tym, że jego zdolność do wykrywania i wykorzystywania luk w oprogramowaniu urosła na tyle, że firma uznała za konieczne dodatkowe testy bezpieczeństwa przed publikacją wag.

**Summary:** Z.ai osiągnęło ten skok wyłącznie przez fine-tuning poprzednika, GLM-5.2, bez zmiany architektury czy trenowania od zera. Model ma mieszaninę ekspertów na 753 miliardach parametrów, z 40 miliardami aktywnymi na token, obsługuje do miliona tokenów wejścia i 128 tysięcy wyjścia, z regulowanym poziomem rozumowania. Na indeksie inteligencji Artificial Analysis zdobył 60 punktów, dogonił Kimi K3 i wyprzedził swojego poprzednika o 7 punktów, choć wciąż zostaje w tyle za Claude Opus 5, GPT-5.6 Sol i Grok 4.6.

To, co wyróżnia ten release, to wyniki w cyberbezpieczeństwie. Na CyberGym, benchmarku szukania i potwierdzania luk w kodzie źródłowym, GLM-5.3 osiągnął 84,5 procent, najlepszy wynik na tym teście, przed Claude Mythos 5 i GPT-5.6 Sol. Na ExploitBench, który testuje próby wykorzystania luk w utwardzonym oprogramowaniu, wynik podwoił się względem GLM-5.2, z 24,4 do 54,4 procent, choć wciąż daleko mu do Claude Mythos 5 czy GPT-5.6 Sol.

Z.ai wybrało tymczasowe zabezpieczenia zamiast trwałego podejścia OpenAI i Anthropic, które wymagają rejestracji organizacji do korzystania z modeli najbardziej zdolnych do exploitów. Zamiast tego opublikowali wyniki na CyberGym i ExploitBench i zdecydowali się wydać wagi dopiero po dwóch tygodniach ewaluacji bezpieczeństwa z zaufanymi partnerami. Prezydent OpenAI, Greg Brockman, ostrzegał wprost, że modele open-weights ze zdolnościami cyber na poziomie state-of-the-art mogą znacząco przyspieszyć krajobraz zagrożeń, powołując się właśnie na start GLM-5.3.

Z drugiej strony niezależne testy innych modeli open-weights sugerują, że alarm może przewyższać rzeczywiste zagrożenie. Amerykańskie i brytyjskie instytuty bezpieczeństwa AI wspólnie oceniły Kimi K3 w lipcu i nie znalazły ani jednego przypadku wykonania dowolnego kodu, najpoważniejszego skutku, na 41 zadaniach ExploitBench, podczas gdy najbardziej zdolne modele proprietary z wyłączonymi zabezpieczeniami średnio wykonywały dowolny kod 20 razy.

**Key takeaways:**
- Skok w zdolnościach cyber wynikł ubocznie ze skalowania fine-tuningu, nie był głównym celem treningu
- Z.ai wybrało publikację benchmarków plus opóźnione wydanie wag zamiast systemu rejestracji użytkowników
- Niezależne testy innych modeli open-weights pokazują, że realne ryzyko może być mniejsze niż sugerują nagłówki

**Why do I care:** Ten news dotyczy głównie zespołów security i decydentów politycznych, ale frontendowiec też powinien go zanotować, bo pokazuje, jak szybko granica między "model do kodowania" a "model do znajdowania dziur w Twoim kodzie" się zaciera. Jeśli wasza firma używa modeli open-weights w CI albo do code review, warto śledzić, które z nich mają wysokie wyniki na CyberGym, bo to sygnał, że te same zdolności można obrócić przeciwko wam. To nie jest scenariusz na jutro, ale warto mieć go na radarze przy planowaniu polityki bezpieczeństwa na kolejny rok.

**Link:** [GLM-5.3 Makes Cybersecurity Gains](https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/MVD7t2sgXc9W7_mVSv50PBg3W8VsNl15Td8SfN7gG7-Y3prCCW69sMD-6lZ3lSVZtLPp3NBX9DW42G4K_3yrcFZVtP2Ff5dH8DvN6frWDGjlL79W6qfdS54sn3YHW4fbHbg1BN-z6W7JfqZq4BfysbW1Q3sMh38BSjbW4Lt5NC5lMzLHW273WDl6LL7s_W9hGbYl1nSFqTW5WPVn04L3glVVdJC-1989f1tW55SvDC4wYR4LW3ddRhg2g1Cg9W4YsX2K3PT2w_W64x7GH96qhZ4W5c_H6j5G3lvlW1s8cX773cmWwW33sHCx4w2dPGf5GzGzC04)

## Wyścig o przepustowość: OpenAI, Cerebras, Google i Nvidia stawiają na szybkość

**TLDR:** OpenAI i Cerebras zapowiedziały Ultrafast, warstwę API uruchamiającą GPT-5.6 Sol na sprzęcie Cerebras zamiast standardowej infrastruktury OpenAI, osiągając nawet 750 tokenów wyjścia na sekundę. Google i Nvidia wydały w tym samym tygodniu własne modele stawiające na szybkość.

**Summary:** Ultrafast ma być około 11 razy szybszy niż standardowy GPT-5.6 Sol na infrastrukturze OpenAI, mierzony w tokenach na sekundę. Na sześciu zadaniach GDPval o dopasowanej jakości Cerebras zmierzył 83 sekundy na zadanie w porównaniu do 7,7 minuty dla standardowego Sol, czyli przyspieszenie 5,6 razy w ujęciu end-to-end. Sekret tkwi w tym, że sprzęt Cerebras trzyma wagi GPT-5.6 Sol w 44 gigabajtach pamięci SRAM na chipie, unikając wyjazdów do pamięci zewnętrznej, które tworzą wąskie gardła przy inferencji na GPU.

Artykuł rozróżnia dwa pojęcia, które często wrzuca się do jednego worka "szybkości": opóźnienie, czyli czas do pierwszego tokena odpowiedzi, i przepustowość, czyli liczbę tokenów na sekundę po starcie generowania. Ultrafast celuje w przepustowość. Google poszło inną drogą z Gemini 3.7 Flash, osiągając 330 tokenów wyjścia na sekundę według pomiarów Artificial Analysis, z 13,2 sekundy oczekiwania na pierwszy token, plus realny wzrost jakości względem poprzednika. Nvidia z kolei wypuściła Nemotron 3.5 Lightning z deklarowaną czterokrotnie wyższą przepustowością w swojej klasie i router o nazwie NeMo Switchyard, który kieruje każdy krok workflow agentowego do modelu najlepiej dopasowanego pod kątem szybkości, jakości albo kosztu, obniżając koszt zadania do około jednej trzeciej kosztu samego Claude Opus 4.8.

Dlaczego to ma znaczenie praktyczne? W aplikacjach konwersacyjnych ludzie zauważają opóźnienie bezpośrednio, bo naturalna rozmowa ma przerwy rzędu 0,3 do 1 sekundy, więc asystent głosowy, który zawiesza się na dłużej niż sekundę, zaczyna wydawać się zepsuty. Przy agentach piszących kod kilka minut oczekiwania wystarczy, żeby stracić kontekst myślowy i zacząć coś innego, a powrót do przerwanego zadania oznacza odbudowywanie problemu w głowie od nowa. Niskie opóźnienie i wysoka przepustowość mają też znaczenie dla agentów działających w trybie ciągłym, monitorujących system czy kanał bezpieczeństwa, bo minuta analizy może oznaczać przegapione okno na reakcję.

**Key takeaways:**
- Opóźnienie (czas do pierwszego tokena) i przepustowość (tokeny na sekundę) to dwa różne parametry, które warto mierzyć osobno
- Cerebras osiąga przewagę przepustowości, trzymając wagi modelu w pamięci SRAM na chipie zamiast w pamięci zewnętrznej GPU
- Nvidia stawia na routing zadań między modelami zamiast na jeden szybki model do wszystkiego

**Why do I care:** To jest temat, który wpływa bezpośrednio na to, jakie produkty w ogóle da się zbudować, nie tylko jak dobrze działają istniejące. Agent kodujący, który odpowiada w sekundach zamiast minut, zmienia sposób pracy z nim z "zleć i wróć za pół godziny" na "pracuj obok mnie w czasie rzeczywistym", a to inna architektura interakcji z użytkownikiem. Warto już teraz zastanowić się, które fragmenty własnego produktu są ograniczone przez opóźnienie, a które przez przepustowość, bo to dwa różne wąskie gardła i dwa różne rozwiązania.

**Link:** [Inside AI's Need for Speed](https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/MVD7t2sgXc9W7_mVSv50PBg3W8VsNl15Td8SfN7gG7_d3prCCW6N1vHY6lZ3m1W6Y13DT5NzxXFW2r4pFv98yCJ1W3K59Ch97b8n9W6CCSy06bhB5HW1pCWJ96cVtjRW3DFj013LpNSbW6TjZMJ1-SVD1W5_djCs83yJQrW3B-NkR77qqjSVJhFSF4VW5zbW72nc-29kbph5W7cZVzw4z6FlxW8ZkcHr93lrTlN78df2LLVqrPW5jVvvG1S5t_wW1PW2hc8HHgBRW8NQYd71lJCnmW44_sks785NZpN6gfm7tPdWdyW2l2slz52n2QSW6rrQlT19JC52W66-q_w5vQ52kdSpB5g04)

## DeepSeek-V4-Pro wychodzi z wersji preview i publikuje własną harness

**TLDR:** DeepSeek wydał oficjalną wersję swojego większego modelu czwartej generacji, DeepSeek-V4-Pro-0813, wraz z darmową, open-source'ową harness agentową, na której go benchmarkował. Ceny API jednocześnie wzrosły.

**Summary:** Model zachowuje liczbę parametrów i architekturę wersji preview z kwietnia, w tym moduł spekulatywnego dekodowania DSpark. Ma mieszaninę ekspertów na 1,6 biliona parametrów całkowitych, z 49 miliardami aktywnymi na token, obsługuje do miliona tokenów wejścia i 384 tysiące wyjścia. Na indeksie inteligencji Artificial Analysis zdobył 53 punkty, plasując się na trzecim miejscu wśród modeli open-weights, około 10 punktów za najlepszymi modelami proprietary.

Największy skok widać w zadaniach związanych z kodowaniem agentowym. Na Terminal-Bench 2.1 wynik poszedł z 72,1 do 87,9 procent, na DeepSWE z 12,8 do 62,7 procent, a na CyberGym z 52,7 do 83,3 procent, tuż przed Claude Fable 5. Warto jednak zaznaczyć, że niezależne ewaluacje z innymi harness'ami pokazały wyraźnie niższe wyniki na Terminal-Bench 2.1, co sugeruje, że część skoku wynika z dopasowania modelu do własnej harness, a nie tylko z surowej poprawy zdolności.

Sama harness, DeepSeek Harness, traktuje modele, narzędzia, umiejętności, sesje, sandboksy, magazyn, pętle i harmonogramowanie jako wymienne wtyczki i loguje wszystko, co model przyjmuje, więc każdą sesję da się wznowić, rozgałęzić, przeszukać albo odtworzyć. Zbudowana jest na jądrze wtyczkowym o nazwie Cordis, a jej tryb minimalny, dający modelowi tylko powłokę i edytor plików, to ustawienie, którego DeepSeek użył do własnych benchmarków agentów kodujących. API DeepSeek przyjmuje żądania w formacie OpenAI Responses, więc Codex od OpenAI może korzystać z modeli DeepSeek po uruchomieniu skryptu konfiguracyjnego, co ułatwia migrację między dostawcami.

**Key takeaways:**
- Największa poprawa dotyczy zadań agentowego kodowania, nie ogólnej inteligencji
- Publikacja harness pozwala odtworzyć wyniki benchmarków, co rzadko robią inne laby
- Niezależne testy z innymi harness'ami pokazują niższe wyniki, więc numery z własnej harness trzeba czytać ostrożnie

**Why do I care:** Publikacja harness razem z modelem to coś, na co czekałem od dawna, bo wydajność agentowa to funkcja modelu i rusztowania wokół niego, a nie samego modelu. Rozbieżność między wynikami DeepSeek Harness a wynikami niezależnych ewaluacji z innymi harness'ami to dobra lekcja dla każdego, kto porównuje benchmarki modeli: zawsze sprawdzajcie, w jakiej harness i z jakim promptem dany wynik powstał, zanim uwierzycie w marketingowy slajd.

**Link:** [DeepSeek-V4-Pro Gets Refreshed](https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/MVD7t2sgXc9W7_mVSv50PBg3W8VsNl15Td8SfN7gG7_d3prCCW6N1vHY6lZ3p0W6B_xGr8rmlNcN7j2Lrm-kxjqVLdZVJ9008jkW5p3Crf47GDJYN8W_scC4j9QqW5JGNQp1MW9-lW8Q2_yz3TQdSRW57fS9k6-gyZhW9l0b6h8h9jVbVTSQpq4gzWM8W8cPJrV2qZN7VW6XcnWN40K89ZW60mkpn6lx-7cW2JpKLb53G92MW3thsgT6xF8MsW68GZK537y-dgW3LWL0_380xRyW12Cj4B7l-84XW8J-W5m7vyD7SW52WZgW5kTX3dW8JYlXL2xLgRGW7Qn7_C5ph6wff4yw2LK04)

## Self-GC: model językowy sam sprząta swój kontekst zamiast trzymać się sztywnych reguł

**TLDR:** Zespół z Xiaohongshu (RedNote) zaproponował Self-GC, metodę zarządzania pamięcią agenta, w której to sam duży model językowy decyduje, co w historii rozmowy zachować, skrócić albo wyrzucić, zamiast trzymać się sztywnych reguł typu "usuń najstarsze wiadomości".

**Summary:** Klasyczne podejścia do kompaktowania kontekstu opierają się na regułach opartych o typ danych albo ich wiek, ale to za mało. Stary wynik narzędzia może być jedynym miejscem, gdzie zapisany jest URL potrzebny później, a świeży wynik może już być nieaktualny. LLM potrafi ocenić to bardziej elastycznie, bo czyta kontekst w miarę jego narastania i decyduje, co prawdopodobnie przyda się później.

Kiedy tokeny wejściowe zapełniają ponad 30 procent okna kontekstowego głównego modelu, Self-GC wysyła historię do modelu-planisty, domyślnie Qwen3.6-Plus, i pyta, co zrobić z każdym żądaniem użytkownika, wywołaniem narzędzia i jego wynikiem. Planista może zatrzymać element albo wybrać jedną z trzech akcji: "fold" odkłada element do osobnego magazynu, zostawiając krótką notatkę o jego lokalizacji, żeby dało się go przywrócić słowo w słowo; "mask" skraca element w miejscu, zachowując początek i koniec, a tnąc powtórzenia w środku, co pasuje do długich logów; "prune" usuwa elementy, których zadanie już nie potrzebuje, na przykład logi nieudanych komend.

Self-GC najpierw wykonuje zaplanowane akcje na kopii historii, odrzucając te, które mogłyby zakłócić najnowsze żądanie albo trwającą odpowiedź agenta, po czym mierzy, ile tokenów wejściowych zaoszczędziłyby pozostałe akcje. Skraca historię tylko wtedy, gdy szacuje, że zmniejszy to koszt przyszłych wywołań modelu, uwzględniając oszczędności z cachowanych wejść, a w praktyce stosowali heurystykę, że plan warto zastosować, jeśli skraca historię o co najmniej 30 procent.

W testach na 33 szczególnie wymagających rozmowach Self-GC usunął 43,95 procent tokenów wejściowych, zachowując potrzebne szczegóły w 84,85 procent przypadków, podczas gdy metody oparte na regułach usuwały więcej tokenów, ale zachowywały potrzebne szczegóły tylko w 54,55 do 69,70 procent przypadków. Na większym zbiorze 332 rozmów Self-GC utrzymał 91,27 do 94,58 procent skuteczności przy trzech różnych modelach-planistach, co pokazuje, że metoda działa niezależnie od konkretnego LLM. Autorzy zastrzegają, że test mierzył zachowanie szczegółów, a nie jakość finalnej odpowiedzi, więc skrócony kontekst może zawierać te same fakty, ale generować gorszy output.

**Key takeaways:**
- LLM jako planista pamięci radzi sobie lepiej niż sztywne reguły oparte na wieku czy typie danych
- Trzy akcje: fold (odłóż na bok z notatką), mask (skróć zachowując początek i koniec), prune (usuń całkowicie)
- Metoda oszczędza mniej tokenów niż podejścia regułowe, ale znacznie rzadziej gubi informacje potrzebne później

**Why do I care:** Zarządzanie kontekstem długo działających agentów to jeden z tych problemów, które wyglądają banalnie, dopóki nie zbuduje się czegoś, co ma działać dłużej niż jedną sesję. Pomysł, żeby LLM sam decydował, co jest "śmieciem", a nie sztywna reguła TTL czy FIFO, brzmi jak oczywisty następny krok, ale dopiero teraz widzę konkretne liczby pokazujące, że to się opłaca. Dla architekta budującego agenty produkcyjne to sygnał, żeby nie zadowalać się prostym obcinaniem najstarszych wiadomości, tylko potraktować zarządzanie pamięcią jako osobny, warty inwestycji komponent systemu.

**Link:** [LLMs Take Out the Agents' Trash](https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/MVD7t2sgXc9W7_mVSv50PBg3W8VsNl15Td8SfN7gG7_d3prCCW6N1vHY6lZ3nmW2-0yY65DfcQ8W29gCdm8VXGgxW4d9WPX4ZlNS4N4dt0y-SSf1SW3BdJK17-P4tTV6xF9l5DG7l5W3WDQn94X8pcHW1SlXGw854LD4VZTCjJ3vx94NW83T9bF1n-PWVVhzyXQ2pJM5xW7YGbgp7-ZjFjW5sZj4q1YvLWqN2gh-M6V6j2bVLZxHK4q0RTmW31BgMw2H5QhnW8_PMhH3-k8l9W5k1prN3F8_QSW4C4xZw6JVnlcW610hSR9k0J6XVn5zQd6v9x3LVcTm-D4r2HDHf5y91ml04)
