---
title: "Co łączy upadek Firefoksa, Erlanga pod WhatsAppem i fizykę chaosu w modelach językowych"
excerpt: "Przegląd siedmiu tematów z HackerNoon: od architektury agentowego OpenClaw i setek realnych zastosowań modelu Jev, przez nonlinearną naukę stojącą za LLM-ami, po historię tego, jak Mozilla sama oddała wojnę przeglądarek."
publishedAt: "2026-10-04"
slug: "hackernoon-firefox-erlang-jev-openclaw-nonlinear-llm-2026"
hashtags: "#HackerNoon #ai #llm #architecture #agents #frontend #engineering #generated #pl"
source_pattern: "HackerNoon"
---

## LLM jako system operacyjny: transformery, ograniczenia i potrzeba adaptacji

**TLDR:** Artykuł tłumaczy architekturę transformerów od podstaw (encoder, decoder, mechanizm uwagi) i pokazuje, dlaczego modele ogólnego przeznaczenia trzeba adaptować do konkretnych zadań przez fine-tuning albo RAG, zamiast traktować je jak gotowe rozwiązanie na wszystko.

**Summary:** Autor prowadzi czytelnika od pierwszych modeli NLP opartych na regułach, przez LSTM i RNN, aż po architekturę transformera z 2017 roku, która dzięki mechanizmowi uwagi potrafi równolegle przetwarzać ogromne ilości danych i uczyć relacji między słowami w zdaniu. Kluczowe jest rozróżnienie modeli encoder-only, dobrych w klasyfikacji i rozpoznawaniu encji, od modeli decoder-only, czyli dzisiejszych GPT, Claude czy Llamy, które generują tekst autoregresywnie, token po tokenie.

Centralna metafora artykułu traktuje LLM-y jak system operacyjny: zamiast trenować osobny model do każdego zadania, jeden duży model potrafi generalizować na nieznane wcześniej zadania, uczyć się z kontekstu podanego w promptcie i transferować wiedzę do nowych dziedzin przez fine-tuning. To realnie obniżyło koszty utrzymania wielu wyspecjalizowanych mikroserwisów modelowych, które wcześniej trzeba było zarządzać osobno.

Druga połowa tekstu skupia się na ograniczeniach: modele ogólnego przeznaczenia mają płytką wiedzę w każdej dziedzinie, nie mają dostępu do prywatnych danych firmowych i są ograniczone datą odcięcia treningu. RAG rozwiązuje problem świeżości informacji, pozwalając modelowi sięgać po zewnętrzne źródła, ale nie rozwiązuje halucynacji, które autor nazywa największym nierozwiązanym problemem całej branży.

**Key takeaways:**
- Fine-tuning zmienia wagi modelu i nadaje mu nową charakterystykę, RAG dostarcza mu świeże i prywatne dane bez ruszania wag.
- Dla zastosowań wysokiego ryzyka, jak medycyna, autor rekomenduje łączenie obu technik, a nie wybór jednej.
- Halucynacje pozostają nierozwiązanym problemem, bo model z natury przewiduje kolejny token na podstawie rozkładu statystycznego, a nie faktów.

**Why do I care:** To solidne wprowadzenie dla zespołów frontendowych, które właśnie zaczynają integrować LLM-y do produktu i muszą zdecydować, czy potrzebują fine-tuningu, czy wystarczy im RAG nad własną dokumentacją. W praktyce dla większości aplikacji frontendowych RAG będzie tańszym i szybszym rozwiązaniem niż fine-tuning, ale warto znać różnicę, zanim ktoś zdecyduje inaczej z powodów wizerunkowych.

**Link:** [The LLM Operating System: Transformers, Limitations, and the Need for Adaptation](https://hackernoon.com/the-llm-operating-system-transformers-limitations-and-the-need-for-adaptation)

## OpenClaw: architektura Gateway, Agent Runtime i system wielu agentów

**TLDR:** OpenClaw to otwartoźródłowa platforma agentowa z architekturą hub-and-spoke, gdzie jeden proces Gateway zarządza wszystkimi połączeniami z komunikatorami i klientami, a osobny Agent Runtime odpowiada za wywołania modeli, narzędzia i pamięć sesji każdego agenta z osobna.

**Summary:** Centralnym elementem jest Gateway, długo żyjący proces, który jako jedyny rozmawia z komunikatorami takimi jak Slack, WhatsApp czy Telegram i wystawia typowane API po WebSocketach. Każdy klient, czy to interfejs webowy, aplikacja na macOS, czy automatyzacja, łączy się z Gateway tym samym protokołem trzech typów ramek: request, response i event, co czyni system prosty do rozszerzania bez łamania kompatybilności.

Parowanie urządzeń jest zbudowane na kryptograficznym uzgodnieniu kluczy Ed25519, gdzie identyfikator urządzenia wynika wprost z klucza publicznego, a nie jest nadawany przez serwer. Po udanym handshake'u Gateway stosuje jedną z czterech reguł zaufania: cichą akceptację połączeń lokalnych, zaufane zakresy adresów IP, weryfikację przez SSH albo ręczną akceptację operatora, co w praktyce daje elastyczny, ale kontrolowalny model bezpieczeństwa.

Najciekawsza część dotyczy Agent Runtime i izolacji wielu agentów w jednym Gateway. Każdy agent ma własny katalog roboczy z plikami bootstrapowymi (AGENTS.md, SOUL.md, IDENTITY.md), własną bazę SQLite na sesje i własną politykę narzędzi zdefiniowaną przez allow i deny listy. Routing wiadomości do konkretnego agenta odbywa się przez bindingi dopasowujące nadawcę do najbardziej szczegółowej reguły, co pozwala uruchomić w jednym procesie, na przykład, osobnego agenta do spraw prywatnych i osobnego do pracy, z różnymi modelami i różnym dostępem do narzędzi.

**Key takeaways:**
- Gateway jako jedyny punkt kontaktu z komunikatorami upraszcza integrację, ale czyni go pojedynczym punktem awarii, który trzeba skalować horyzontalnie przez sticky sessions.
- Izolacja agentów (osobny workspace, osobna baza sesji, osobna polityka narzędzi) domyślnie blokuje komunikację międzyagentową, chyba że jawnie się ją włączy.
- Coding harnessy jak Claude Code czy Codex CLI integruje się przez narzędzie typu exec, bo nie mają natywnego wsparcia WebSocket, w przeciwieństwie do OpenCode.

**Why do I care:** Dla architektów budujących własne systemy agentowe to konkretny wzorzec do skopiowania: oddzielenie warstwy transportowej (Gateway) od warstwy wykonawczej (Agent Runtime) jest dokładnie tym, czego brakuje wielu doraźnym integracjom LLM w firmowych produktach. Jeśli planujecie więcej niż jednego agenta w systemie, ten artykuł pokazuje, jak nie zderzyć ich sesji i uprawnień ze sobą od pierwszego dnia.

**Link:** [Understanding OpenClaw's Gateway, Agent Runtime, and Multi-Agent Architecture](https://hackernoon.com/understanding-openclaws-gateway-agent-runtime-and-multi-agent-architecture)

## Firefox nie przegrał wojny przeglądarek, Mozilla ją oddała

**TLDR:** Osobista historia stopniowego porzucania Firefoksa na rzecz Brave'a staje się pretekstem do rozliczenia z dekadą decyzji Mozilli: spóźnione wydania, złamana kompatybilność rozszerzeń, afera z cichą instalacją dodatku Mr. Robot, eksperyment Cliqz i kontrowersyjne Terms of Use z 2025 roku.

**Summary:** Autor zaczyna od mechanizmu, który uważa za kluczowy dla zrozumienia upadku Firefoksa: użytkownicy nie odchodzą trzaskając drzwiami, tylko stopniowo zaczynają otwierać zapasową przeglądarkę częściej, aż zapasowa staje się domyślną. Firefox miał kiedyś blisko jedną trzecią globalnego rynku, dziś to około 5,3 procent udziału na desktopie. Chrome wygrał nie tylko jako przeglądarka, tylko jako brama do całego ekosystemu Google, podczas gdy Mozilla przez lata nadrabiała zaległości technologiczne, zamiast wyprzedzać konkurencję.

Najbardziej bolesnym przykładem jest przejście na WebExtensions w Firefoksie 57, które z dnia na dzień wyłączyło stare rozszerzenia, niszcząc warsztaty pracy właśnie tych power userów, którzy rekomendowali Firefoksa znajomym i zgłaszali błędy. Decyzja była technicznie uzasadniona, bo stare API utrudniało bezpieczny model wieloprocesowy, ale efektowo oznaczała utratę unikalności bez zdobycia żadnej z przewag Chrome'a, takich jak domyślna pozycja na Androidzie czy integracja z usługami Google.

Druga oś tekstu to seria wpadek wizerunkowych: ciche zainstalowanie promocyjnego rozszerzenia Looking Glass przy okazji serialu Mr. Robot, eksperyment Cliqz wysyłający odwiedzane adresy URL do zewnętrznej firmy, kontrowersyjne sformułowania w Terms of Use z lutego 2025 dające Mozilli szeroką licencję na dane wpisywane w przeglądarce. Każda z tych spraw osobno miała swoje techniczne wytłumaczenie, ale razem zbudowały wrażenie organizacji, która nie rozumie, że dla jej użytkowników zaufanie jest emocjonalną relacją, a nie białą księgą inżynierską.

Autor kończy bilansem: Firefox wciąż ma ponad 200 milionów użytkowników, niezależny silnik Gecko i pełne wsparcie dla klasycznego uBlock Origin, którego Chrome już nie obsługuje po Manifest V3. Ale przetrwanie nie jest tym samym co znaczenie, a Mozilla musi odbudować zaufanie, zamiast zakładać, że misja otwartego internetu wystarczy, by ludzie zostali.

**Key takeaways:**
- Firefox spóźnił się o lata z architekturą wieloprocesową (e10s dopiero w 2016, Chrome miał to od 2008).
- Złamanie legacy extensions w Firefoksie 57 kosztowało Mozillę lojalność właśnie najbardziej wpływowych użytkowników.
- Mozilla finansowo zależy od jednego klienta (najpewniej Google) na poziomie 86 procent przychodów z kontraktów, co stawia pod znakiem zapytania jej niezależność.

**Why do I care:** Jako ktoś, kto testuje produkcyjne strony na wielu silnikach, czuję ten tekst bardziej jako ostrzeżenie biznesowe niż technologiczne: utrata udziału w rynku przez Firefoksa oznacza mniej testowania stron pod Gecko, czyli więcej bugów specyficznych dla tej przeglądarki, czyli jeszcze mniej powodów, by ją testować. To błędne koło dotyka każdego, komu zależy na różnorodności silników przeglądarkowych, bo monokultura Chromium realnie zwiększa władzę jednej firmy nad tym, co stanie się następnym standardem webowym.

**Link:** [Firefox Didn't Just Lose the Browser War. Mozilla Slowly Gave It Away](https://hackernoon.com/firefox-didnt-just-lose-the-browser-war-mozilla-slowly-gave-it-away)

## 101 realnych zastosowań modelu decyzyjnego Jev

**TLDR:** Jev od TypeSafe AI to wąski, ultraszybki model do typowanych decyzji (wybór, ocena, tak/nie) zamiast generowania tekstu, raportowany jako nawet 200 razy szybszy i 400 razy tańszy niż LLM przy zadaniach klasyfikacyjnych. Artykuł zbiera 101 projektów, które zastąpiły nim wolniejsze wywołania dużych modeli językowych.

**Summary:** Pomysł jest prosty: zamiast prosić LLM o odpowiedź w formie tekstu, który potem trzeba sparsować, Jev od razu zwraca typowaną odpowiedź z liczbą ufności, w milisekundach. Projekty zebrane w artykule są pogrupowane według typu decyzji: routing i klasyfikacja (na przykład wybór najtańszego modelu zdolnego obsłużyć dane zadanie w jev-router), weryfikacja i guardrails (wykrywanie złośliwego kodu w is-malicious, bramki pre-commit skanujące sekrety w jev-git), scoring i ranking, decyzje agentowe (przycinanie historii konwersacji bez utraty kontekstu w yoshi), aż po gry, symulacje i finanse.

Powtarzający się wzorzec jest taki, że Jev wygrywa tam, gdzie decyzja jest ograniczona, częsta i wrażliwa na opóźnienie: routing requestów, bramki uprawnień wywoływane przy każdym kroku agenta, klasyfikacja elementów DOM do blokowania reklam. Autor jest przy tym uczciwy co do ograniczeń: w bezpośrednim porównaniu jako reranker wyszukiwania Jev przegrywa z dobrym rankerem opartym na embeddingach, chyba że zostanie dołożony na wierzch kandydatów z wyszukiwania semantycznego, gdzie dodaje realny zysk przy bardzo niskim koszcie.

Warto też zaznaczyć ostrzeżenie z końca tekstu: ekosystem wokół Jev ma zaledwie kilka tygodni, wiele repozytoriów współdzieli ten sam szkielet i bywa bardziej opisem w README niż działającym kodem, więc listę należy traktować jako inspirację, a nie rekomendację gotowych narzędzi do wdrożenia.

**Key takeaways:**
- Jev zastępuje LLM tam, gdzie decyzja jest typowana i wymaga niskiego opóźnienia, nie tam, gdzie potrzebna jest głęboka analiza albo proza.
- Narzędzia typu jevcal dopasowują próg ufności do docelowej dokładności na własnych danych i failują w CI, gdy aktualizacja modelu łamie ten próg.
- Standalone Jev jako reranker wyszukiwania przegrywa z embeddingami, ale dołożony na wierzch semantycznych kandydatów dodaje realny zysk NDCG.

**Why do I care:** Dla zespołów, które płacą rachunki za wywołania LLM wyłącznie po to, żeby dostać odpowiedź tak/nie albo wybór jednej z kilku opcji, to konkretny sygnał, żeby sprawdzić, czy naprawdę potrzebują pełnego modelu językowego do tej konkretnej decyzji. Routing requestów czy bramki permisji w agentach kodujących to dokładnie ten rodzaj miejsca, gdzie tańszy, wyspecjalizowany model decyzyjny obniży rachunek bez utraty jakości.

**Link:** [101 Real-World Examples of How to Use Jev](https://hackernoon.com/101-real-world-examples-of-how-to-use-jev)

## Dziwny język, który pomógł zbudować WhatsAppa

**TLDR:** Narracyjny tekst opowiedziany z perspektywy Joego Armstronga, współtwórcy Erlanga, prowadzi od laboratorium Ericssona w latach 80., przez zakaz używania języka w firmie w 1998 roku, aż po moment, w którym pięćdziesięcioosobowy zespół WhatsAppa obsłużył miliardy wiadomości dziennie dzięki tej samej filozofii "let it crash".

**Summary:** Erlang powstał w połowie lat 80. w laboratorium Ericssona, żeby rozwiązać bardzo konkretny problem: centrale telefoniczne muszą działać bez przerwy, znosić awarie sprzętu i przyjmować aktualizacje kodu bez zrywania trwających połączeń. Kluczowym pomysłem było potraktowanie wszystkiego jako izolowany proces, który komunikuje się wyłącznie przez wiadomości i nie dzieli pamięci z innymi, więc śmierć jednego procesu nie psuje reszty systemu. To dało hot code loading, czyli podmianę działającego kodu bez przerywania połączeń, co język potrafił robić już w latach 90., podczas gdy większość języków nie potrafi tego do dziś.

Przełomem był przełącznik AXD301 z końca lat 90., zbudowany w Erlangu po tym, jak konwencjonalny projekt następcy centrali załamał się finansowo. System osiągnął w jednej z sieci British Telecom legendarne "dziewięć dziewiątek" dostępności. Mimo tego sukcesu Ericsson formalnie zakazał używania Erlanga do nowych produktów w 1998 roku, bo język był zbyt niszowy, by firma mogła go bezpiecznie zlecać na zewnątrz albo łatwo rekrutować pod niego ludzi. Zespół twórców odszedł, założył firmę Bluetail, a Ericsson wypuścił Erlanga i OTP jako open source, żeby utrzymać dobre relacje ze społecznością, która się już wokół niego zebrała.

Punktem kulminacyjnym historii jest 2009 rok, gdy Jan Koum zadał pytanie na liście mailingowej projektu ejabberd, otwartoźródłowego serwera czatu napisanego w Erlangu. WhatsApp zbudowany na tej bazie osiągnął w 2012 roku 2,8 miliona jednoczesnych połączeń na jednej maszynie, każdy użytkownik dostawał własny proces Erlanga, dokładnie tak jak każda rozmowa telefoniczna dostawała go w centrali z lat 80. Facebook, który wcześniej sam zbudował czat na Erlangu i go porzucił na rzecz C++, zapłacił w 2014 roku 19 miliardów dolarów za firmę, która postawiła na przeciwną strategię.

**Key takeaways:**
- Filozofia "let it crash" zakłada, że proces powinien umierać natychmiast po napotkaniu błędu, a nie próbować go obsłużyć, bo czysta śmierć nie psuje reszty systemu.
- Nadzorcy (supervisors) restartujące martwe procesy to mechanizm, który w praktyce zastępuje większość defensywnego programowania.
- Elixir i Gleam, języki zbudowane na tej samej maszynie wirtualnej BEAM, pokazują, że dobra runtime przeżywa wiele niewygodnych składni na wierzchu.

**Why do I care:** To przypomnienie, że "let it crash" i nadzorowane restarty to wzorzec dużo starszy i lepiej sprawdzony niż większość dzisiejszych rozwiązań do obsługi błędów w mikroserwisach frontendowych czy edge functions. Przy projektowaniu systemów, które muszą przetrwać częściowe awarie bez przestoju, warto sięgnąć po tę trzydziestoletnią filozofię zamiast wymyślać własny mechanizm retry od zera.

**Link:** [The Strange Programming Language That Helped Build WhatsApp](https://hackernoon.com/the-strange-programming-language-that-helped-build-whatsapp)

## Nieliniowa nauka stojąca za dużymi modelami językowymi

**TLDR:** Autor przekonuje, że LLM-y przestają być zagadką, jeśli spojrzeć na nie jak na nieliniowe systemy dynamiczne: nagłe skoki zdolności to przejścia fazowe znane z fizyki, plateau w uczeniu to rywalizacja wewnętrznych obwodów, a wrażliwość długich łańcuchów rozumowania to klasyczny efekt motyla.

**Summary:** Punktem wyjścia jest prawo skalowania z 2020 roku od OpenAI: strata maleje jako funkcja potęgowa liczby parametrów, ilości danych i mocy obliczeniowej, co pozwala przewidzieć jakość modelu, zanim się go w pełni wytrenuje. Chinchilla od DeepMind poprawiła tę receptę, pokazując, że model 70 miliardów parametrów trenowany na 1,4 biliona tokenów bije model 280 miliardów parametrów przy czterokrotnie mniejszym koszcie, po prostu dzięki lepszej proporcji danych do parametrów, mniej więcej 20 tokenów na parametr.

Najciekawszy fragment dotyczy zdolności, które nie pojawiają się płynnie, tylko skokowo: arytmetyka wielocyfrowa pojawiła się w okolicach 13 miliardów parametrów, chain-of-thought zaczął realnie pomagać dopiero przy 60 do 100 miliardach. Badacze z Anthropic znaleźli jeszcze bardziej uderzający przykład: in-context learning, czyli zdolność uczenia się z przykładów podanych w promptcie, pojawia się nagle po przetworzeniu 2,5 do 5 miliardów tokenów treningowych, niemal niezależnie od rozmiaru modelu. To próg mierzony w czasie, nie w rozmiarze, co sugeruje, że za progiem stoi konkretny mechanizm wewnętrzny (tak zwane induction heads), a nie magiczna skala.

Autor łączy to z eksperymentem "grokking", w którym mały model trenowany na arytmetyce modularnej najpierw zapamiętuje przykłady, potem wpada w długie plateau, a następnie nagle zaczyna generalizować, bo prostszy algorytm wewnętrzny wygrywa rywalizację z kosztowną tablicą przeglądową. Druga połowa tekstu pokazuje, że architektoniczne sztuczki transformerów, normalizacja, połączenia rezydualne, dobór wariancji inicjalizacji, to w istocie mechanizmy utrzymujące sieć na granicy chaosu, bo tylko tam informacja może swobodnie propagować się przez głębokie warstwy bez zanikania ani eksplozji.

**Key takeaways:**
- Prawo skalowania Chinchilli (20 tokenów na parametr) wciąż jest lepszym punktem odniesienia niż sama liczba parametrów przy ocenie modelu.
- Zdolności takie jak in-context learning pojawiają się przy progu liczby tokenów treningowych niemal niezależnym od rozmiaru modelu.
- Normalizacja i połączenia rezydualne w transformerach to w praktyce mechanizmy utrzymujące sieć na granicy chaosu, a nie tylko techniczne usprawnienia.

**Why do I care:** Dla kogoś, kto ocenia dostawców modeli albo decyduje, czy mniejszy model wystarczy do danego zadania, to praktyczna wskazówka: licz się bardziej z pretraining loss i liczbą tokenów treningowych niż z samą liczbą parametrów na karcie modelu, bo dwa modele tej samej wielkości mogą leżeć po różnych stronach tego samego progu zdolności. To też wyjaśnia, dlaczego mniejsze modele z 2026 roku potrafią przebić giganty sprzed czterech lat, bez żadnej magii, tylko dzięki lepszym danym.

**Link:** [The Nonlinear Science Behind Large Language Models](https://hackernoon.com/the-nonlinear-science-behind-large-language-models)

## Podziel opis skilla na trzy zdania, bo agent nie przeczyta całości

**TLDR:** Porada dla twórców skilli dla agentów AI: opis skilla powinien mieścić się w trzech zdaniach, odpowiadających kolejno na pytania kiedy go czytać, kiedy go użyć i co dokładnie robi, bo agent skanujący setki dostępnych skilli nie ma czasu otwierać każdego z osobna.

**Summary:** Autor punktuje częsty błąd: opis skilla pisany jako jeden długi akapit wymieniający każdą funkcję, każdy parametr i każdy przypadek brzegowy. Problem jest ten sam, co przy funkcjach, które rosną bez kontroli, aż nikt nie pamięta ich pierwotnego celu, tylko przeniesiony na poziom metadanych: agent skanujący opisy nie potrafi w locie ocenić, czy dany skill pasuje do zadania, więc albo go pomija na rzecz czegoś z ostrzejszym wyzwalaczem, albo musi otworzyć cały plik, żeby to sprawdzić, co i tak zjada ten kontekst, który progressive disclosure miało oszczędzić.

Proponowana struktura to nazwa skilla odpowiadająca momentowi, w którym ktoś po niego sięga, pierwsze zdanie powtarzające ten sam moment wyzwalający, drugie zdanie nazywające konkretną sytuację, trzecie zdanie mówiące, co skill faktycznie robi. Autor podaje przykład złego opisu dla fikcyjnego "pdf-toolkit", który wymienia osiem osobnych funkcji, i dobrego, który w czterech krótkich zdaniach mówi, kiedy po niego sięgnąć i co obiecuje. Trzy zdania to cel, nie sztywna reguła: czwarte zdanie jest w porządku, jeśli dodaje realne ograniczenie, ale pięć zdań zwykle oznacza powrót do starego, rozwleczonego wzorca.

Autor jest przy tym świadomy ograniczeń własnej rady: ostry trigger w opisie nic nie pomoże, jeśli sam plik skilla jest źle zorganizowany w środku, a różne silniki agentowe parsują i ważą opisy inaczej, więc coś dostrojonego pod jeden runtime może wymagać retuningu pod inny. Zaznacza też wprost, że artykuł będzie oznaczony przez detektory jako wygenerowany przez AI, bo sztywny format i checklisty to dokładnie ten wzorzec, który te narzędzia wyłapują, mimo że pisze tak od dekad, zanim AI w ogóle istniało.

**Key takeaways:**
- Opis skilla ma funkcję routera, a nie dokumentacji, więc jego jedynym zadaniem jest decyzja, czy otworzyć plik.
- Trzy zdania (kiedy czytać, kiedy użyć, co robi) to dobry punkt startowy, ale czwarte zdanie jest akceptowalne, jeśli wnosi realne ograniczenie.
- Skill pokrywający kilka niezwiązanych ze sobą wyzwalaczy prawdopodobnie powinien zostać podzielony na dwa osobne pliki.

**Why do I care:** To bezpośrednio przekłada się na pracę z własnymi skillami w Claude Code czy podobnych narzędziach: im więcej skilli gromadzi zespół, tym bardziej opis frontmatter staje się realnym wąskim gardłem, a nie kosmetyką. Warto przejrzeć istniejące pliki SKILL.md pod kątem tej reguły trzech zdań, zanim liczba skilli w projekcie urośnie do punktu, w którym router zaczyna gubić właściwe dopasowania.

**Link:** [AI Coding Tip 035 - Split Every Skill Description Into Three Sentences](https://hackernoon.com/ai-coding-tip-035-split-every-skill-description-into-three-sentences)
