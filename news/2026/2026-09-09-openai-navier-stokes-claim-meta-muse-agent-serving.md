---
title: "10 000 agentów, roszczenie do Nagrody Milenijnej i nikt nie pokazuje dowodu"
excerpt: "OpenAI twierdzi, że rój agentów rozgryzł równania Naviera-Stokesa, Meta wypuściła osobistego agenta z realnym projektem bezpieczeństwa, a liczby z infrastruktury serwowania są po cichu najlepszą częścią."
publishedAt: "2026-09-09"
slug: "openai-navier-stokes-claim-meta-muse-agent-serving"
hashtags: "#AINews #ai #llm #agents #openai #meta #infrastructure #performance #security #generated #pl"
source_pattern: "AINews"
---

## Roszczenie wobec Naviera-Stokesa i co właściwie ujawniono

**TLDR:** OpenAI podało, że grupa agentów korzystających z niewydanego modelu wyprodukowała rozwiązanie problemu milenijnego Naviera-Stokesa. Publiczne deklaracje obejmują mniej więcej 10 000 agentów i około roku wieloagentowego uczenia ze wzmocnieniem. Brakuje treści twierdzenia, preprintu, szkicu dowodu i jakiegokolwiek artefaktu weryfikacyjnego.

**Summary:** Najbardziej konkretna publiczna deklaracja padła od Ethana Knighta, który powiedział, że wynik powstał ze współpracy około 10 000 agentów, że OpenAI spędziło ostatni rok na trenowaniu modeli do współpracy przez wieloagentowe uczenie ze wzmocnieniem oraz że trudne problemy mogą ustępować pod naporem dużych ilości nieustrukturyzowanej, równoległej mocy obliczeniowej w czasie testu, przy czym modele same decydują, jak się zorganizować. To opis systemowy. Nie jest matematyczny i właśnie ta różnica jest tu całą historią.

Tekst AINews robi coś, czego życzyłbym sobie po większej liczbie relacji, czyli oddziela to, co ustalają tweety, od tego, co ludzie sobie ekstrapolowali. Ustalone: powiązana z OpenAI deklaracja o mniej więcej 10 000 agentów, roku wieloagentowego RL i nacisku na równoległą moc obliczeniową w czasie testu zamiast jednej długiej próby dowodu. Nieustalone: treść jakiegokolwiek twierdzenia, zakres dowodu, to, czy dotyczy standardowej globalnej regularności dla trójwymiarowego przypadku nieściśliwego, czy jakiegoś wariantu, oraz jaka część pracy była ludzka. Współpraca 10 000 agentów nie mówi ci, czy ludzie rozłożyli przeszukiwanie na czynniki, wyselekcjonowali lematy, zweryfikowali kroki, czy tylko uruchomili infrastrukturę. Szeroko powtarzana liczba 88 godzin pojawia się w tym zestawie wyłącznie w poście satyrycznym, co nie przeszkodziło jej stać się wszędzie liczbą z nagłówka.

Słowo "rozwiązanie" też odwala tu sporo nieoznaczonej roboty. W matematyce może oznaczać kompletny dowód, strategię dowodu, kandydata na kontrprzykład, sformalizowane wyprowadzenie albo trop badawczy. Navier-Stokes to zły problem na to, żeby być nieprecyzyjnym, bo twierdzenie, że osobliwości w skończonym czasie mogą wystąpić, implikuje negatywną odpowiedź na pytanie o globalną regularność w odpowiednim sformułowaniu, a to wymaga nadzwyczajnej precyzji.

Reakcje rozłożyły się przewidywalnie. Theo Jensen nazwał to momentem, w którym świat nauki orientuje się, że AI naprawdę potrafi kodować. Hrishikesh ujął to jako dowód na reżim wysokiej mocy obliczeniowej i kazał ludziom skorygować plany. Ktoś powiązał ostrzeżenia o opóźnieniach ChatGPT z przekierowaniem mocy na ten przebieg, co było czystym domysłem. Neutralny odczyt to ten, którego bym się trzymał. Nawet jeśli twierdzenie nie przetrwa recenzji, system generujący matematycznie nietrywialne ścieżki kandydujące dla problemu tego kalibru to realny kamień milowy zdolności, a architektura wieloagentowego RL plus równoległej mocy w czasie testu może mieć większe znaczenie jako metoda badawcza niż jako wynik.

Warto wypisać to, czego w ujawnieniu naprawdę brakuje, bo to właśnie tego potrzebowałby recenzent. Żadnego opisu integracji z systemem dowodzenia twierdzeń, żadnej weryfikacji formalnej, żadnego stosu z asystentem dowodu, żadnego rozmiaru modelu, żadnego budżetu obliczeniowego, żadnej ablacji względem punktu odniesienia z jednym agentem, żadnego wskaźnika skuteczności sprawdzania dowodu. Osobne oświadczenie OpenAI, że nie sięgnięto po żadne konkretne dane użytkowników, z zastrzeżeniem o możliwej zanonimizowanej poprawie pochodnej, stało się własnym punktem zapalnym z powodów oczywistych dla każdego, kto zna drugą stronę tej historii.

**Key takeaways:**
- Ujawnione fakty są na poziomie systemowym: mniej więcej 10 000 agentów, około roku wieloagentowego RL, dużo równoległej mocy w czasie testu
- Wraz z deklaracją nie pojawiła się treść twierdzenia, preprint, szkic dowodu ani artefakt weryfikacyjny
- Liczba 88 godzin, która rozeszła się wszędzie, pochodzi z posta satyrycznego, a nie z OpenAI
- Pochodzenie wyniku ma tu znaczenie techniczne, bo to, kto sformułował hipotezę i kto zweryfikował kroki, zmienia charakter artefaktu
- Architektura może być trwalszym wkładem, nawet jeśli konkretny dowód się nie obroni

**Why do I care:** Do własnej pracy warto zabrać przesunięcie od większego pojedynczego modelu w stronę skoordynowanych zespołów z mocą wydawaną w momencie rozwiązywania. Jeśli ten kierunek się utrzyma, ciekawa inżynieria przenosi się na dekompozycję zadań, komunikację między agentami i wybór kandydatów, czyli zwykłe problemy systemów rozproszonych, a nie uczenia maszynowego. To zestaw umiejętności, który starszy inżynier już ma. Ramę z Nagrodą Milenijną traktuj jak marketing, dopóki nie pojawi się dowód, który da się przeczytać.

**Link:** [OpenAI reports Navier-Stokes singularity find using Astra-next](https://www.latent.space/p/ainews-openai-reports-navier-stokes)

## Meta Muse i osobisty agent z realnym projektem bezpieczeństwa

**TLDR:** Meta uruchomiła Muse, stale działającego osobistego agenta z konektorami do aplikacji i dostępem do przeglądarki, dystrybuowanego przez własne serwisy Mety. Każdy Muse działa we własnej izolowanej maszynie wirtualnej z Linuksem, osobny komponent o nazwie Sentinel pośredniczy w akcjach, sekrety nigdy nie trafiają do agenta, a bug bounty sięga 300 tysięcy dolarów.

**Summary:** Kształt produktu jest już znajomy. Trwałe maszyny wirtualne, korzystanie z przeglądarki, interfejs na WhatsAppie, konektory do Gmaila, Kalendarza, Outlooka, Plaid, OpenTable, Dokumentów, Spotify i Pelotona, plus natywne konektory Mety do Instagrama, Messengera, Facebooka i Marketplace'u. Meta twierdzi, że użycie pierwszego dnia wypadło dziesięciokrotnie powyżej wewnętrznych prognoz, czyli podaje liczbę, jaką zawsze produkuje wpis premierowy i której nikt nie może sprawdzić.

Architektura bezpieczeństwa to element, który Meta wypchnęła najmocniej, i to dlatego praktycy zareagowali dobrze. Każdy Muse dostaje własną izolowaną maszynę wirtualną. W akcjach pośredniczy osobny komponent, zamiast żeby wykonywał je bezpośrednio agent. Sekrety nigdy nie trafiają do modelu. Wrażliwe akcje wymagają zatwierdzenia. Jest publiczny bug bounty z pułapem 300 tysięcy dolarów, co jest realnym zobowiązaniem, a nie slajdem. Handel obsługuje Stripe Link z agentową ochroną płatności i gwarancją zwrotu, a Shop Pay jest w drodze.

To przyjęcie jest ciekawym sygnałem. Cytowani ludzie chwalili konkretnie zarządzanie uprawnieniami i sekretami, a nie jakość modelu, co sugeruje, że Muse może być jednym z pierwszych produktów z osobistym agentem, gdzie wąskim gardłem jest kontekst i dostęp, a nie surowa inteligencja. To jest prawdą już od jakiegoś czasu, a większość premier zachowywała się, jakby nie było.

Meta udostępniła też Muse Spark 1.3 w narzędziach zewnętrznych, w tym w Cursorze, niemal natychmiast, a benchmarki w stylu areny ustawiły Muse Spark 1.3 Max jako konkurencyjny cenowo i wydajnościowo w zadaniach kodowania webowego. Wypuszczenie konsumenckiego agenta i modelu dostępnego dla programistów w tym samym tygodniu to ruch dystrybucyjny bardziej niż techniczny, a Meta dystrybucję ma.

**Key takeaways:**
- Każdy Muse działa we własnej izolowanej maszynie wirtualnej z Linuksem, z osobnym pośrednikiem między agentem a każdą akcją
- Sekrety zostają całkowicie poza zasięgiem agenta, a wrażliwe akcje wymagają zatwierdzenia
- Bug bounty sięga 300 tysięcy dolarów, co jest mocniejszym sygnałem niż diagram architektury
- Muse Spark 1.3 wylądował w Cursorze natychmiast i wypadł konkurencyjnie w benchmarkach kodowania webowego

**Why do I care:** Do podkradzenia jest projekt uprawnień i sekretów, bezpośrednio przydatny, jeśli budujesz cokolwiek agentowego dla zespołu produktowego. Trzymanie poświadczeń poza kontekstem modelu i wstawienie pośrednika między intencją a wykonaniem nie jest nowatorskie i wciąż jest tym, co większość wewnętrznych projektów agentowych pomija, bo spowalnia demo. To, że Meta zrobiła to publicznie, daje ci coś, na co możesz wskazać podczas przeglądu projektu. Reszta to historia o dystrybucji, która i tak nie wpływa na twoją architekturę.

**Link:** [Meta Muse launch coverage in AINews](https://www.latent.space/p/ainews-openai-reports-navier-stokes)

## Uprzęże agentowe, post-training i liczby, które mają znaczenie

**TLDR:** Harvey i Baseten opublikowały najczytelniejszy jak dotąd argument, że uprząż i post-training znaczą tyle samo co model. Przejście ze standardowej pętli narzędziowej na uprząż rekurencyjną podniosło średni wskaźnik zaliczeń rubryki z 23% do 62%. Uczenie ze wzmocnieniem na wierzchu przeniosło jeden model z 30% na 63%.

**Summary:** Scenerią jest prawnicze due diligence na korpusach sięgających 80 milionów tokenów. Agent główny przeszukuje data room, deleguje przegląd dokumentów do subagentów i agreguje ustalenia. Na syntetycznym benchmarku LAB Diligence zamiana standardowej pętli narzędziowej na tę rekurencyjną strukturę podniosła średni wskaźnik zaliczeń rubryki z 23% do 62% w różnych modelach. To większa różnica, niż produkuje większość podmian modelu, osiągnięta bez zmiany modelu.

Potem post-training to zwielokrotnił. Samodystylowane nadzorowane dostrajanie GLM-5.2 przesunęło wskaźnik zaliczeń z 46% na 60%. GRPO na Qwen3.5-122B-A10B przeniosło go z 30% na 63% na odłożonych data roomach i poprawiło pokrycie dokumentów z 62% do 96%. To liczba pokrycia jest tą, którą warto zauważyć, bo przegląd prawny pomijający jedną trzecią dokumentów jest gorszy niż bezużyteczny, niezależnie od jakości ustaleń.

Wniosek wyciągany przez oba zespoły jest taki, że benchmarki agentowe muszą traktować orkiestrację i post-training jako część systemu, a nie jako klej wokół niego. Jest to spójne z wynikiem ARC-AGI-3 opublikowanym przez OpenAI, gdzie dwa ustawienia API potroiły wynik bez zmiany modelu, oraz z Harness-Bench, gdzie rozrzut między uprzężami na identycznych zadaniach i przy identycznym modelu wyniósł 23,8 punktu. Trzy niezależne wyniki wskazujące w tę samą stronę to wystarczająco dużo, żeby działać.

LangChain wypuścił elementy wspierające w deepagents: forkowanie subagentów przekazujące w dół kontekst nadzorcy oraz zarządzane połączenia abstrahujące przepływy OAuth, tokenów i zgód, zarówno dla tożsamości należących do agenta, jak i do użytkownika. Nieefektowna hydraulika i dokładnie to, czego długodystansowej pracy agentowej brakowało.

**Key takeaways:**
- Uprząż rekurencyjna podniosła średni wskaźnik zaliczeń rubryki z 23% do 62% bez zmiany modelu
- GRPO na Qwen3.5-122B-A10B podniosło wskaźnik zaliczeń z 30% do 63%, a pokrycie dokumentów z 62% do 96%
- Harness-Bench zmierzył rozrzut 23,8 punktu między uprzężami na tych samych 106 zadaniach i tym samym modelu
- Benchmarki agentowe trzymające uprząż na stałe mierzą niewłaściwą rzecz
- deepagents dorzuciło forkowanie subagentów z dziedziczonym kontekstem nadzorcy i zarządzane połączenia w stylu OAuth

**Why do I care:** Jeśli doszedłeś do wniosku, że agenty nie poradzą sobie z jakimś zadaniem w twoim produkcie, uczciwym kolejnym krokiem jest sprawdzenie, czy testowałeś model, czy własną pętlę wokół niego. Skok z 23 na 62 punkty z samej przebudowy orkiestracji oznacza, że większość wewnętrznych ewaluacji mierzy własną hydraulikę. Dla architektów zmienia to całkowicie ramę decyzji o budowie. Zyski siedzą w dekompozycji, delegowaniu i agregacji, nad którymi twój zespół może iterować co tydzień, a nie w czekaniu na kolejny model.

**Link:** [Harvey and Baseten harness results in AINews](https://www.latent.space/p/ainews-openai-reports-navier-stokes)

## Prawdziwe liczby są w infrastrukturze serwowania

**TLDR:** vLLM opublikowało odciążanie rzadkiej uwagi, które podniosło utrzymywaną współbieżność z 5-6 żądań do 19-25 przy milionie tokenów kontekstu na jednym węźle. Okazało się też, że trasowanie z przypięciem sesji bije naiwne równoważenie obciążenia w ruchu agentowym, bo ciepły cache znaczy więcej niż równa kolejka.

**Summary:** Nagłówkiem jest praca nad długim kontekstem. Hybrid HiSparse od vLLM trzyma cache KV na GPU, dopóki się da, odciąża zimne strony do pamięci hosta i utrzymuje gorący bufor dla indeksera. Przy GLM 5.3 z milionem tokenów kontekstu na węźle osiem razy H200 i skonfigurowanej współbieżności 32 zwykłe odciążanie utrzymywało 5-6 żądań, a Hybrid HiSparse 19-25. To trzy-, czterokrotna poprawa liczby żądań z długim kontekstem, które jeden węzeł realnie obsłuży, i przekłada się wprost na przebiegi uczenia ze wzmocnieniem, gdzie dekodowanie jest ograniczone przez VRAM.

Przebieg optymalizacji całego stosu jest bardziej zaskakujący i bardziej użyteczny. Zmierzone na prawdziwym ruchu agentowym, zrównoleglenie potokowe pomaga przy zimnych długich promptach i przegrywa przy ciepłych krótkich turach, więc właściwa konfiguracja zależy od twojego miksu ruchu, a nie od ogólnej reguły. Zrównoleglenie kontekstu przy dekodowaniu mocno zależy od konstrukcji uwagi w modelu. A trasowanie z przypięciem sesji bije naiwne równoważenie obciążenia, bo w obciążeniach agentowych z szybkimi turami ciepły cache KV jest wart więcej niż równo rozłożona kolejka. To ostatnie ustalenie przeczy domyślnemu ustawieniu, z którym większość ludzi wypuszcza systemy, i jest dokładnie tym, czego uczy tylko ruch o produkcyjnym kształcie.

Cohere wydało otwartoźródłowy stos serwujący zbudowany wokół megakernela dekodującego, deklarując do 1,58 raza szybsze działanie niż vLLM na North Mini Code i 1,25 do 1,41 raza end to end przy większych rozmiarach wsadu. Baseten osobno raportuje, że przebiegi RL z pierwszej ligi otrzymują dziś nowe wagi polityki globalnie w mniej niż 40 sekund, przy 6-sekundowej pauzie. Złóż to razem, a kierunek jest jasny. Infrastruktura serwowania jest przebudowywana pod ciągły post-training i odświeżanie przebiegów, a nie pod statyczne serwowanie modeli, a to inny zestaw ograniczeń niż ten, którego się uczyliśmy.

**Key takeaways:**
- Hybrid HiSparse podniósł utrzymywaną współbieżność z 5-6 do 19-25 przy milionie tokenów na węźle osiem razy H200
- Trasowanie z przypięciem sesji bije naiwne równoważenie obciążenia w ruchu agentowym, bo ciepłe cache KV znaczą więcej niż równa kolejka
- Zrównoleglenie potokowe pomaga przy zimnych długich promptach i szkodzi przy ciepłych krótkich turach, więc odpowiedź zależy od twojego ruchu
- Megakernel dekodujący Cohere deklaruje do 1,58 raza szybsze działanie niż vLLM na jednym obciążeniu
- Baseten raportuje nowe wagi polityki dostępne globalnie w mniej niż 40 sekund, przy 6-sekundowej pauzie

**Why do I care:** To nie jest praca frontendowa, a jedno ustalenie i tak przenosi się wprost. Trasowanie z przypięciem sesji bijące równe rozłożenie obciążenia to ta sama intuicja co sticky sessions przed stanową warstwą webową, i jeśli stawiasz load balancer przed własnym hostowanym wnioskowaniem, prawdopodobnie wypuszczasz dziś złe ustawienie domyślne. Szerzej: jeśli twój produkt zależy od modeli hostowanych u siebie, te liczby mówią, że koszt wnioskowania jest bardziej problemem konfiguracji serwowania niż budżetu na sprzęt, a to znacznie tańsza rzecz do naprawienia.

**Link:** [vLLM and Cohere serving results in AINews](https://www.latent.space/p/ainews-openai-reports-navier-stokes)

## Images 2.5, wdrożenie Astry i reszta zatłoczonego dnia

**TLDR:** OpenAI wypuściło ChatGPT Images 2.5 z opóźnieniem niższym nawet o 50% i lepszą spójnością edycji oraz zakończyło wdrażanie Astry dla planów Plus, Pro, Business i Enterprise. Cognition zebrało ponad 2 miliardy dolarów przy wycenie 48 miliardów. Badacz odszedł z Anthropic z powodów związanych z bezpieczeństwem.

**Summary:** Images 2.5 zostało przyćmione, a jest solidnym wydaniem. Opóźnienie niższe nawet o 50% wobec Images 2.0, lepszy realizm, spójność edycji utrzymująca się przez kolejne poprawki, zlokalizowane zmiany na podstawie komentarzy, przezroczyste tła i narzędzie Sketch do prowadzonej generacji. Wyszły dwa warianty API: Flare do szybkości i Sunburst do pracy nad detalem o wyższej precyzji. Wyniki z areny deklarowały pierwsze i drugie miejsce w kategoriach tekst na obraz, edycja obrazu i edycja wielu obrazów, przy czym największe zyski przypadły na edycję wielu obrazów. Integracje wylądowały w fal, Higgsfield, Manus i Hermes Agent jeszcze tego samego dnia.

Dostępność Astry rozszerzono na wszystkich użytkowników Plus, Pro, Business i Enterprise w Codeksie oraz ChatGPT Work. Dwa demo od społeczności są warte wartości anegdotycznej. Theo raportował, że Astra skompilowała i uruchomiła Super Smash Bros. Melee na macOS w 120 FPS po mniej więcej sześciogodzinnej pętli. Vals raportował, że niemal wysyciła niewydaną ewaluację obsługi komputera, budując w Minecrafcie portal do Netheru w niecałe trzy godziny, bez wyspecjalizowanej uprzęży. Oba przypadki są wyselekcjonowane i oba są zadaniami, które rok temu byłyby niemożliwe.

Wiadomości o finansowaniu i kadrach to część z konsekwencjami. Cognition zebrało ponad 2 miliardy dolarów przy wycenie 48 miliardów, podając, że przychód w ujęciu rocznym wzrósł od maja z 492 milionów do prawie 900 milionów. Osobno Jacob Hilton odszedł z Anthropic, argumentując, że zarówno Anthropic, jak i OpenAI pędzą nieodpowiedzialnie w stronę samodoskonalącej się superinteligencji i że ludzie wewnątrz prywatnie traktują ryzyko wyginięcia jako realne. Dwie rundy dekakornów, Cognition i 24 miliardy Mistrala, wylądowały tego samego dnia co cała reszta i nie trafiły na nagłówek, co pokazuje, ile dziś kosztuje przebicie się przez cykl informacyjny.

**Key takeaways:**
- Images 2.5 tnie opóźnienie nawet o 50% i dokłada spójność przy kolejnych edycjach oraz narzędzie Sketch
- Flare i Sunburst to warianty API nastawione odpowiednio na szybkość i precyzję
- Astra jest już w pełni wdrożona dla Plus, Pro, Business i Enterprise w Codeksie i ChatGPT Work
- Cognition zebrało ponad 2 miliardy przy wycenie 48 miliardów, raportując wzrost przychodu rocznego z 492 milionów do prawie 900 milionów od maja
- Jacob Hilton odszedł z Anthropic, wskazując na nieodpowiedzialny wyścig w stronę systemów samodoskonalących się
- Runda Mistrala na 24 miliardy wylądowała tego samego dnia i nie trafiła na nagłówek

**Why do I care:** Bezpośrednie zastosowanie produktowe ma spójność edycji w Images 2.5, bo utrzymanie stabilnego obiektu przez kolejne poprawki to dokładnie to, co się sypie, gdy próbujesz wygenerować zestaw powiązanych assetów do design systemu albo strony marketingowej. Jeśli oceniałeś generowanie obrazów pod tym kątem i odpuściłeś, warto spojrzeć drugi raz. Cała reszta to kontekst do rozmów planistycznych, a nie do kodu, a rezygnację Hiltona warto przeczytać w całości, jeśli podejmujesz decyzje zakupowe, bo to relacja z pierwszej ręki, a nie komentarz.

**Link:** [AINews for 9/8/2026](https://www.latent.space/p/ainews-openai-reports-navier-stokes)
