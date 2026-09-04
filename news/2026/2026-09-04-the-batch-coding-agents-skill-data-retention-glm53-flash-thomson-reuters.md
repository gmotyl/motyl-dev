---
title: "Używanie agentów kodujących jako kluczowa umiejętność, polityki retencji danych i Ox Alpha jako GLM-5.3-Flash"
excerpt: "Andrew Ng o tym, dlaczego sterowanie agentami kodującymi staje się najszybciej ewoluującą umiejętnością AI Engineeringu, plus porównanie polityk retencji danych Anthropic i OpenAI, ujawnienie Ox Alpha jako GLM-5.3-Flash, własny model Thomson Reuters i prostszy sposób monitorowania bezpieczeństwa LLM-ów."
publishedAt: "2026-09-04"
slug: "the-batch-coding-agents-skill-data-retention-glm53-flash-thomson-reuters"
hashtags: "#thebatch #ai #agents #llm #security #generated #pl"
source_pattern: "The Batch"
---

## Używanie agentów kodujących jako najszybciej ewoluująca umiejętność

**TLDR:** Andrew Ng pisze, że umiejętność sterowania agentami kodującymi zmienia się szybciej niż inne kluczowe kompetencje AI Engineeringu, bo same agenty postępują zarówno dzięki lepszym modelom, jak i lepszym harnessom. Opisuje spójny workflow z trzech etapów: planowanie, wykonanie i wdrożenie z monitoringiem, oraz pięć umiejętności potrzebnych, żeby z niego korzystać dobrze.

**Summary:** Ng zaczyna od obserwacji, że skuteczne sterowanie agentami, zarówno przy pisaniu kodu, jak i przy zadaniach niekodowych, na przykład analizie danych czy operacjach systemowych, pozwala zrobić dużo więcej niż wcześniej. Problem w tym, że agenty proprietary, jak Claude Code, Codex czy Cursor, i agenty otwarte, jak OpenCode czy Pi, zmieniają się w tempie, które wymusza ciągły proces eksperymentowania, budowania i uczenia się na nowo, znacznie szybszym niż w przypadku innych kompetencji.

Na podstawie rozmów z dziesiątkami czołowych AI Engineerów Ng wyodrębnia trzy etapy pracy: planowanie, obejmujące burzę mózgów, badanie kodu i pisanie specyfikacji z architekturą, potem egzekucję, czyli budowanie, testowanie i weryfikację z odpowiednim poziomem autonomii agenta, wreszcie wdrożenie i monitoring, gdzie agenty obserwują logi i proponują poprawki. To ten sam workflow, który obowiązywał przed erą agentów, tylko środek ciężkości przesunął się z pisania kodu na decydowanie co budować, projektowanie architektury i weryfikację wyników.

Pięć umiejętności, które Ng wymienia jako kluczowe, to kierowanie workflow, czyli decydowanie, ile ludzkiego wysiłku a ile agentowego wsadzić w każdy etap; włączanie autonomii agenta z zarządzaniem kontekstem i uprawnieniami; przeglądanie pracy przez dopasowaną do zadania weryfikację behawioralną i funkcjonalną; dostosowywanie agenta i jego środowiska przez skille, pluginy, MCP-serwery i hooki; oraz fundamenty działania agentów, czyli rozumienie, jak radzą sobie z wyszukiwaniem w kodzie, zarządzaniem kontekstem i subagentami. Ng ostrzega przy okazji przed medialnym uproszczeniem, jakoby długie, wielogodzinne sesje agentowe zużywające miliony tokenów były zawsze praktyczne: jego zdaniem realna użyteczność takich zadań jest często przeceniana względem ich kosztu, a najlepsze efekty wciąż daje wysoce iteracyjny proces z ludzkim osądem interweniującym w odpowiednim momencie.

**Key takeaways:**
- Workflow z agentami ma te same trzy etapy co wcześniej: planowanie, egzekucja, wdrożenie z monitoringiem, ale środek ciężkości przesunął się na decyzje, nie pisanie kodu.
- Pięć kluczowych umiejętności: kierowanie workflow, autonomia agenta, przegląd pracy, dostosowywanie środowiska agenta, fundamenty działania agentów.
- Bardzo długie, autonomiczne sesje agentowe są medialnie przereklamowane względem realnej relacji kosztu do korzyści.

**Why do I care:** To dobre podsumowanie tego, co i tak powtarzam zespołom: agent nie zwalnia z odpowiedzialności za decyzje architektoniczne, tylko przesuwa moment, w którym trzeba je podjąć świadomie. Najbardziej przydatna jest tu ta lista pięciu umiejętności jako checklist do rozmowy o tym, czy zespół faktycznie rośnie w kompetencjach pracy z agentami, czy tylko przyspiesza pisanie kodu, zostawiając resztę workflow bez zmian.

**Link:** [The Batch, September 4, 2026](https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/VVBxnd6JlRTFW2X1XMk2qcWZzW8LzBkh5TwrkpN1h3yr83qgz0W7lCdLW6lZ3nqW9d1bxr2Gy8LRW7Vf4gG8qBHDpW8zyjBH6BgK6cW1HYqV86jjky-N4cdmN8b5TqnW3HFp4P7kDtsPW3kYG3z8_7WlLW41F4X91n0FgfW50yx5C5SWgCxW3fk7qG2n1HzVW5wXwzz9kyL90W9dn6g360xhwbW6HmpkZ3s3LYdVvK89Q1-9mncW1yM4WW613Fn2W28sGPZ4tQ6qVV2ZWh77nS7FlW2mFMr75rJqpqW20Dgkm7bPbGGV2w7t61H78FRW7g6MFP3XTMnTN744LX_5CN66W92nvSy2xZ4yWMZTBkh1MKnTf97yYPn04)

## Anthropic i OpenAI inaczej rozwiązują problem retencji danych

**TLDR:** Anthropic zapowiada program Enterprise Frontier Safeguards, który pozwoli klientom biznesowym trzymać rozmowy na własnych serwerach zamiast na infrastrukturze Anthropic, a OpenAI odpowiada obietnicą Private Safety Processing, systemu skanującego dane pod kątem nadużyć bez ich odczytywania przez ludzi. Żadna z firm nie ujawniła jeszcze, jak technicznie działa to skanowanie.

**Summary:** Od czerwca firmy korzystające z Claude Fable 5 musiały zgodzić się na trzydziestodniową retencję rozmów przez Anthropic. Nowy program Enterprise Frontier Safeguards ma zmiękczyć tę zasadę, wymagając trzydziestodniowej retencji, ale na serwerach klienta albo wybranego dostawcy chmurowego, takiego jak Google Cloud, Microsoft Foundry czy AWS, zamiast na infrastrukturze Anthropic. Do czasu dostępności EFS jesienią, uprawnieni klienci enterprise mogą korzystać z Fable 5 i Fable 5.1 bez żadnej retencji danych przez Anthropic.

Dzień przed tym, jak Bloomberg ujawnił plany Anthropic, OpenAI opublikowało własny post obiecujący klientom biznesowym zero data retention: firma twierdzi, że nigdy nie loguje promptów ani odpowiedzi klientów biznesowych podłączających modele do własnego oprogramowania. Zapowiedziano też Private Safety Processing, system mający wykrywać nadużycia rozłożone na wiele zapytań bez odczytywania promptów przez pracowników OpenAI.

Obie firmy opisują ten sam mechanizm: oprogramowanie obserwuje zapytania w czasie i flaguje wzorce bez udziału człowieka. Żadna nie wyjaśnia jednak kluczowej różnicy między "nasi pracownicy tego nie widzą" a "nasze systemy tego nie widzą". Żeby przeskanować dane, napisane przez firmę oprogramowanie musi je odblokować i przeczytać, niezależnie od tego, gdzie są przechowywane. Sholto Douglas z Anthropic opisał ten plan jako monitoring "realizowany przez zautomatyzowane systemy, które wam dostarczamy".

W praktyce Anthropic trzyma dziś rozmowy z Fable 5 i Mythos 5 przez trzydzieści dni na każdej platformie, a treści oflagowane według kryteriów ustalanych wewnętrznie mogą być przechowywane nawet do dwóch lat, z dostępem zatwierdzonych recenzentów przez logowany proces. Zarówno EFS, jak i PSP mają odpowiadać głównie na ataki rozłożone na wiele zapytań, w tym jailbreaking typu "best-of-N", gdzie atakujący przeformułowuje zablokowany prompt setki razy, aż któraś wersja przejdzie. Ani Anthropic, ani OpenAI nie ujawniły dotąd konkretnych kryteriów uznawania czegoś za "cyberatak" czy "niebezpieczne".

**Key takeaways:**
- Anthropic EFS: retencja 30 dni zostaje, ale dane trafiają na serwery klienta, nie Anthropic; OpenAI PSP: zero retencji, skanowanie bez odczytu przez ludzi.
- Żadna firma nie ujawniła technicznie, jak jej system skanuje dane, których twierdzi, że nie widzi.
- Czerwcowa zmiana retencji Anthropic już kosztowała firmę część klientów biznesowych, w tym rezygnację ARC Prize Foundation z testowania Fable 5.

**Why do I care:** Dla zespołów pracujących z wrażliwymi danymi klienckimi to nie jest abstrakcyjny temat prawniczy: różnica między "nie trenujemy na waszych danych" a "nie mamy dostępu do waszych danych" realnie wpływa na to, czy dany model w ogóle można zaproponować klientom z sektora regulowanego. Warto śledzić, kiedy EFS faktycznie stanie się dostępne jesienią, zanim ktokolwiek zbuduje na obietnicy zero retention proces produkcyjny.

**Link:** [Comparing OpenAI and Anthropic's Data Retention Policies](https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/VVBxnd6JlRTFW2X1XMk2qcWZzW8LzBkh5TwrkpN1h3yrs3qgz0W7Y8-PT6lZ3pxW6Gphk87BWkNYN4RyDwDHCTqpW1YN-P17nvQNBVq5Jcp5tDg-rW1Mm8cB48QB6YW7_B-gB2G4rbGW47pS_71Zn79LW7-qQMt6xgdPlW3JCmrr1ZstmsN6WFl3fkr85tW7dl6LG2svfqlW4495NT3bQwkkW4N_szn4fqcKRVYrlSC2qpcFMW6LyW-y8-ch8VN8WnJ5rCS7WKW6LKQgT7zF9GdVLjl9J9cfBQ_W41RGWh2WLRYYVZR8V95CB5XVW3HmWLH49LxV2Mh5sRzzKgnBW6xlPjV3S8bT6W6Zb4CT69LWQ5W5R0r5P62TyzgW3GGrYH6fHd_7ddJWrT04)

## Ox Alpha ujawniony jako GLM-5.3-Flash

**TLDR:** Anonimowo testowany przez tydzień model "Ox Alpha", który stał się najpopularniejszym modelem na OpenRouter, okazał się być GLM-5.3-Flash od Z.ai. To pierwszy model z rodziny GLM-5 zbudowany jako wizyjno-językowy od podstaw, a nie doklejony do istniejącego modelu tekstowego, serwowany podczas testów wyłącznie na chipach chińskiej produkcji.

**Summary:** Z.ai wypuściło GLM-5.3-Flash jako model tekstowo-obrazowo-wideo z hybrydową architekturą mixture-of-experts łączącą uwagę liniową i rzadką, na 320 miliardach parametrów całkowitych z 18 miliardami aktywnymi na token. Model obsługuje do ponad miliona tokenów wejścia i 128 tysięcy wyjścia przy 44,6 tokenach na sekundę, z regulowanymi poziomami rozumowania, które nie da się całkowicie wyłączyć.

Kluczowa innowacja to połączenie uwagi liniowej, tańszej pamięciowo i skalującej się proporcjonalnie do długości wejścia, z uwagą rzadką obejmującą pełny kontekst. Z.ai twierdzi, że to połączenie redukuje obliczenia uwagi do około jednej trzeciej kosztu GLM-5.3, mniej niż DeepSeek-V4-Flash czy Kimi K3. Dodatkowy krok o nazwie IndexPool uśrednia co cztery wektory wyszukiwania modelu w jeden, żeby ograniczyć zużycie pamięci przy zbliżaniu się do miliona tokenów kontekstu, co razem z hybrydową uwagą zmniejszyło cache klucz-wartość do mniej niż jednej czwartej wartości GLM-5.3.

Na indeksie inteligencji Artificial Analysis model zdobył 57 punktów za średnio 0,09 dolara za zadanie, zbliżając się do liderów open weights, Kimi K3 i GLM-5.3, przy ułamku ich kosztu. Na DeepSWE v.1.1 rozwiązał za pierwszym podejściem 63 procent zadań za 0,24 dolara, wobec 69 procent za 3,99 dolara dla GLM-5.3 i 74 procent za 11,84 dolara dla Claude Opus 5 na maksymalnym rozumowaniu. Model jest jednak gadatliwy i wolny jak na swój rozmiar: zużył 150 milionów tokenów na cały test Intelligence Index, więcej niż mediana, i generuje średnio 45 tokenów na sekundę, znacznie wolniej niż GLM-5.3.

**Key takeaways:**
- GLM-5.3-Flash to pierwszy model GLM z wizją budowaną od podstaw, nie doklejaną do modelu tekstowego.
- Osiąga wyniki bliskie liderom open weights przy ułamku ich kosztu za zadanie, ale jest wolniejszy i bardziej gadatliwy.
- Tydzień anonimowego testowania jako "Ox Alpha" pozwolił Z.ai zebrać feedback bez wpływu marki na oceny użytkowników.

**Why do I care:** Anonimowe testowanie modelu przed ujawnieniem marki to sprytny sposób na uzyskanie nieskażonego brandingiem feedbacku, i warto to zapamiętać jako wzorzec, jeśli kiedykolwiek testujecie własne narzędzie AI wewnętrznie. Dla zespołów szukających taniego modelu wizyjno-językowego z licencją MIT, GLM-5.3-Flash zasługuje na miejsce na liście do przetestowania, ale niska prędkość generowania może być realnym problemem w interaktywnych interfejsach.

**Link:** [Ox Alpha Revealed as GLM-5.3-Flash](https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/VVBxnd6JlRTFW2X1XMk2qcWZzW8LzBkh5TwrkpN1h3yrs5nR3bW7Y9pgv6lZ3lMW78H12P8Z_ZfhW5JHr0G91gbX5W3sNYh77jFY6pW6_kLC42r-8NvW8-_Zpy1ycnP1VMCPsd68h5TdW83NqZC2yyWwXW6YYLZf8H_8YmW3Jy4xq3nCmHwVkd0C45pbCyZW4-QFfx1c_ycbW7JSdJv8PmR2pW7DhsFz3qCTDPW8YRKZV37t6CwF60dl5k2CLrN9bVz-l_-5SHW2pRxk_6BQlk2N9gxqg5QB8rLW2jB4vd20MSC4W1YF5ZC6_9cY4W6HhqT25wP8k5W4t8n_F3XJqvqW4RCs4d4mW14nN2TY9txF39JhN7j3vmCMCFFsW1yW2QH8t4QS4W3Hh5wl8fmChCW5qzpCR3D8F8xW5Sr2j12VYYnWN1bVl3gMS-LYW8JhZ3g6HrZ_pW6PRN154RZXfkW1_91DM78f_QkW2W2Ynb60jwsgW1Nr-2N7lBS_BW7DtYNd90Fkv8W1Pt_P25njbzSW2ydRBV8ZqBQ0W1myDmZ8b2zj9N6vrk76FRMhKW5T-6386fG1RJW5XQS4h6_w5_gdCf45P04)

## Thomson Reuters trenuje własny model dla prawa, finansów i newsów

**TLDR:** Thomson Reuters wypuściło rodzinę modeli Thomson, zbudowaną na bazie Qwen3.5 przez ciągłe dotrenowywanie na własnym korpusie prawnym, podatkowym i finansowym, żeby konkurować zarówno z wyspecjalizowanymi startupami jak Harvey, jak i z ogólnymi modelami dużych laboratoriów.

**Summary:** Thomson-1.0-Large powstał na bazie Qwen3.5-397B-A17B przez metodę, którą autorzy nazywają Continual Learning, czyli mieszankę pełnowagowego mid-treningu i fine-tuningu na wybranym korpusie firmy. Thomson Reuters ujawniło w informacji prasowej, że łączny koszt treningu wyniósł 40 milionów dolarów w ciągu trzech miesięcy. Model najpierw przeszedł realignment do stylu i wartości firmy, w tym obiektywizmu dziennikarskiego, przez direct preference optimization względem otwartej konstytucji, którą można adaptować do podobnych projektów.

Zespół razem z partnerem DatologyAI wyselekcjonował zbiór 200 miliardów tokenów mid-treningowych z puli kandydackiej 19 bilionów tokenów, złożony w mniej więcej równych częściach z kuratorowanych dokumentów firmowych (wiadomości, dokumenty regulacyjne, orzecznictwo, kontrakty), syntetycznych par udanych zadań zawodowych oraz ogólnych materiałów. Finalna runda fine-tuningu przez DPO miała poprawić dokładność i efektywność w agentowym deep research, a group sequence policy optimization zarządza kompaktowaniem kontekstu i cachowaniem dokumentów, żeby uniknąć przepełnienia okna kontekstowego.

Model narrowo wyprzedził GPT-5.4 i Claude Sonnet 5 zarówno pod względem kompletności, jak i faktyczności na treściach podatkowych, prawnych i newsowych, z przewagą około 15 punktów nad tymi modelami na treściach z otwartego webu. Mniejsza wersja, Thomson-1.0-Small, na 35 miliardach parametrów, zostanie wydana jako open weights na Hugging Face do użytku akademickiego i niekomercyjnego, podczas gdy Thomson-1.0-Large pozostaje proprietary, dostępny wyłącznie dla klientów biznesowych.

**Key takeaways:**
- Thomson-1.0-Large to fine-tune Qwen3.5-397B-A17B, nie model trenowany od zera, kosztujący 40 milionów dolarów w trzy miesiące.
- Dane treningowe to mniej więcej równe części kuratorowanych dokumentów firmowych, danych syntetycznych i ogólnych materiałów.
- Model wyprzedza GPT-5.4 i Claude Sonnet 5 o około 15 punktów faktyczności na treściach z otwartego webu, ale przewaga na własnych treściach jest znacznie mniejsza.

**Why do I care:** To dobry przykład tego, jak dotrenowywanie na własnym korpusie zamiast pretrainingu od zera daje realną, choć niewielką przewagę domenową bez kosztów budowy modelu od podstaw. Dla firm z dużym, wyspecjalizowanym korpusem to sensowna alternatywa dla prostego fine-tuningu przez LoRA, ale warto pamiętać, że 40 milionów dolarów i trzy miesiące pracy to wciąż spory próg wejścia, niedostępny dla większości zespołów produktowych.

**Link:** [Custom Models for Law, News, and Finance](https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/VVBxnd6JlRTFW2X1XMk2qcWZzW8LzBkh5TwrkpN1h3yqz5nR3bW69t95C6lZ3lGVvmRVL97x4yyW3zryx722HmKpW2Q7TkT3NLCdDW891p9q8yxRt_W2Pkx8_2C6wZ6W3cvhZh7pnfvwW25NTDN745Tv1W1pFT3L8s1SPrN4H22Q_34MQ-W62SkhS6d08JZW6dCq0R2PBT19W7jkMWD7MMzWbW88sCfQ8gV-QGW6CkHr54b0mVSW1FxS8G1psb7GW5M48xh76kD3YVL8lC96cFVPtM6P87qqlV3cW4KdGj72VW94yW60jgVR46xTN8W8rDNP_30qJ4lW3r561W1L7FHNW482wwT4VHM35VBlKSB36830kW6fyqMT8VWG9PVDRPmQ10FNwkVHygPy60h8r7W5wgsFy4z0QdgW6qR3XR1r4xHwW5LBqcg5-bYfJW4WRb4z3dGFc4W7nwPFN1KPD4BW7sfKt87wFp4mVtzB8G943ZcGW62-z2B8Ls79SW3JMVSK8bc8mNf9jy6GT04)

## Prostszy sposób monitorowania bezpieczeństwa modeli

**TLDR:** Badacze z Amsterdamu, Wisconsin-Madison i Johns Hopkins pokazują, że do wykrywania niebezpiecznych albo błędnych odpowiedzi LLM-a wystarczy pojedynczy, dobrze skalibrowany próg bezpieczeństwa, zamiast analizowania całej historii ocen krok po kroku.

**Summary:** Systemy takie jak e-valuator oceniają wyjście modelu po każdym kroku rozumowania, turze konwersacji czy wywołaniu narzędzia i analizują całą historię ocen, żeby zdecydować, czy przerwać generowanie. CRC Monitor, którego nazwa pochodzi od conformal risk control, upraszcza to podejście do porównania pojedynczej, najnowszej oceny z progiem skalibrowanym pod konkretne zadanie. Wyzwaniem jest wybór tego progu w sposób niezawodny, bo współczynnik fałszywych alarmów zmierzony na ograniczonym zbiorze walidacyjnym może być niższy niż na nowych danych czysto przez przypadek.

Autorzy skalibrowali próg CRC Monitor na dwóch zadaniach: błędnym rozumowaniu matematycznym i szkodliwej tematyce. Dla matematyki użyli zbioru MATH z rozwiązaniami generowanymi przez Claude Haiku 4.5 i Mistral-7B-Instruct, ocenianymi przez Qwen2.5-Math-PRM-7B jako weryfikator, z etykietami walidowanymi przez OpenAI o3-mini. Dla szkodliwej treści użyli zbiorów Anthropic Red Teaming i FineHarm, z Llama Guard i dostrojonym Qwen2.5-1.5B jako weryfikatorami. Do zmierzonego na zbiorze walidacyjnym współczynnika fałszywych alarmów dodali margines bezpieczeństwa, wybierając potem największy próg spełniający zadany limit błędu.

Wyniki pokazały, że CRC Monitor dorównuje e-valuatorowi w wykrywaniu problemów, ale robi to szybciej. Na MATH przy limicie 20 procent fałszywych alarmów oba systemy wykryły 80 procent błędnych rozwiązań Mistrala, ale CRC Monitor zgłosił alarm już po 35 procentach procesu rozumowania, wobec 40 procent dla e-valuatora. Na FineHarm przy tym samym limicie CRC Monitor wykrył niemal 99,5 procent szkodliwych treści, dorównując e-valuatorowi zarówno w skuteczności, jak i szybkości alarmu. Na Anthropic Red Teaming CRC Monitor wykrył mniej szkodliwych rozmów niż e-valuator, 32 wobec 54 procent, ale zrobił to znacznie wcześniej, po 26 procentach rozmowy zamiast po 55 procentach.

**Key takeaways:**
- Pojedyncza, dobrze skalibrowana ocena bezpieczeństwa działa niemal tak samo dobrze jak analiza całej historii ocen.
- CRC Monitor zgłasza alarm wcześniej niż e-valuator przy podobnej albo niewiele niższej skuteczności wykrywania.
- Autorzy proponują architekturę wielowarstwową: tani sygnał ciągły, kalibrowana reguła przerwania, drogi weryfikator tylko gdy sygnał wskazuje na problem.

**Why do I care:** Jeśli budujecie własny system monitoringu bezpieczeństwa dla agenta produkcyjnego, ten wynik to dobry argument, żeby nie zaczynać od razu od skomplikowanej agregacji wielu sygnałów w czasie. Prosty, dobrze skalibrowany próg na pojedynczej ocenie może dać porównywalną skuteczność przy dużo niższym koszcie inferencji i prostszej implementacji, a warstwę złożoności dokładać dopiero tam, gdzie faktycznie jest potrzebna.

**Link:** [A Simpler Method to Monitor Models](https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/VVBxnd6JlRTFW2X1XMk2qcWZzW8LzBkh5TwrkpN1h3yqT3qgz0W6N1vHY6lZ3l6W2nl_Bq4Dz38kW2DgcKd8r0DNBVRhX-B9gk1BCW6t7BdZ1hlYvdVmMh8R16Xp-VW5XLK9P1NLZxJW7d5sg26L1CNMW5k-hvQ5yn67GW5J6JmQ831CtvW4RPp_Y6ZhdzXW3VKCtl10M7f9W7SDQXp26GQy0W9kZmD87tjNLnW97sgyl8ZFRcWW7KsCjW6d4YwLN3jjCk8Lwv5bVdny126mZqF7N5V8jQS3X10nW23htZ949y0cgW564h1l2Y180WW7b71pq4ZDPhmW3chGDN4-WtX0f3vvcGF04)
