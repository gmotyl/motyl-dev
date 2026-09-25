---
title: "Frameworki w erze AI, twarda pamięć Laravela i to, czego nie mówią release notes"
excerpt: "Przegląd technologiczny z daily.dev: czy frameworki mają jeszcze sens przy kodowaniu z AI, dlaczego dobre rady inżynierskie trudno stosować, ile naprawdę waży Laravel i co zmienia się w Node.js 22.23.3."
publishedAt: "2026-09-24"
slug: "frameworki-ai-laravel-pamiec-nodejs-22-23-3"
hashtags: "#dailydev #architecture #career #ai #laravel #performance #nodejs #frontend #generated #pl"
source_pattern: "daily.dev"
---

## Czy frameworki jeszcze mają znaczenie?

**TLDR:** Autor, deweloper open source'owego frameworka webowego, zadaje pytanie, czy w erze kodowania z AI frameworki w ogóle mają sens. Odpowiedź brzmi: tak, bo agent i tak zbuduje sobie jakiś framework, tylko pytanie, czy będzie to sprawdzony React albo Next.js, czy naprędce sklecony zestaw konwencji.

**Summary:** Punkt wyjścia jest prosty. Kiedy piszesz kod z pomocą LLM-a, framework i tak powstaje, tyle że w twojej głowie albo w promptach, które wysyłasz. Model musi jakoś ustrukturyzować routing, stan i komunikację z serwerem, więc albo skorzysta z gotowych wzorców React czy Next.js, albo wymyśli własne, niepisane zasady od zera w każdym projekcie. Autor stawia tezę, że ta druga opcja jest gorsza, bo nikt tego nie przetestował na milionach aplikacji i nikt tego nie udokumentował.

Dalsza część tekstu broni frameworków z pozycji kogoś, kto je tworzy na co dzień. Framework daje ograniczenia, a ograniczenia pomagają zarówno ludziom, jak i agentom pisać kod, który da się utrzymać. Autor przywołuje HMR, TypeScript i useEffect jako przykłady rozwiązań, których wartość zmienia się, gdy część pracy przejmuje agent. Jeśli agent i tak przepisze ci kod po każdej zmianie, czy szybki refresh przeglądarki wciąż jest tak ważny jak wcześniej? Autor nie ma gotowej odpowiedzi, ale zauważa, że pytanie samo w sobie jest nowe.

Tekst kończy się apelem, żeby nie zwijać frameworków tylko dlatego, że AI potrafi teraz napisać kawałek kodu bez nich. Zamiast tego autor woli budować nowe, oparte na standardach frameworki full-stack w JavaScripcie, bo to wciąż najlepsza dostępna forma skumulowanej wiedzy o tym, jak robić rzeczy dobrze.

**Key takeaways:**
- LLM i tak tworzy jakąś strukturę, gdy pisze kod, framework albo powstaje świadomie, albo w locie i bez dokumentacji
- Ograniczenia frameworka ułatwiają współpracę człowieka z agentem, bo ograniczają przestrzeń możliwych rozwiązań
- Wartość niektórych narzędzi deweloperskich, jak HMR, może się zmieniać w miarę jak agenci przejmują coraz więcej pisania kodu
- Autor opowiada się za dalszym rozwojem frameworków full-stack opartych na standardach, a nie za ich porzucaniem

**Why do I care:** Jako architekt frontendowy widzę w tym tekście coś więcej niż filozoficzną dywagację. Jeśli zespół pozwala agentom pisać kod bez frameworka, prędzej czy później dostaje własny, niepisany framework, tylko rozproszony po commitach i bez żadnej dokumentacji. To dokładnie ten sam problem, który znamy z lat budowania własnych, wewnętrznych bibliotek zamiast korzystania z gotowych rozwiązań. Wybór frameworka to teraz też wybór, jaki kontekst dajesz swojemu agentowi, a to zmienia sposób, w jaki warto oceniać nowe narzędzia.

**Link:** [Do Frameworks Matter Anymore?](https://daily.dev/posts/jJcau4M4I)

## Dlaczego najlepsze rady inżynierskie są najtrudniejsze do zastosowania

**TLDR:** Autor dzieli rady inżynierskie na dwa typy: praktyczne reguły, które łatwo sprawdzić i nauczyć, oraz zasady oparte na doświadczeniu, które wymagają oceny sytuacji i często się ze sobą kłócą. Teza tekstu jest taka, że organizacje wolą reguły, bo są mierzalne, ale prawdziwa dojrzałość inżynierska zaczyna się tam, gdzie reguły przestają wystarczać.

**Summary:** Małe funkcje, sensowne nazwy zmiennych, żadnych magicznych liczb. Tego typu rady da się zweryfikować linterem i wytłumaczyć juniorowi w pięć minut. Problem zaczyna się przy radach drugiego typu, takich jak „wybierz duplikację zamiast złej abstrakcji”. Żeby je zastosować, trzeba wiedzieć, kiedy dana sytuacja w ogóle pasuje do reguły, a to wymaga doświadczenia, którego nie da się skopiować z artykułu.

Autor prowadzi tę myśl dalej i pokazuje, że rady oparte na ocenie sytuacji potrafią się ze sobą kłócić. Czasem duplikacja rzeczywiście jest lepsza niż zła abstrakcja, a czasem to duplikacja jest tym, co topi projekt pół roku później. Nie ma tu jednej odpowiedzi, jest tylko seria decyzji, za które ktoś bierze odpowiedzialność. Ten sam podział autor odnajduje w porównaniu Scruma, który jest konkretnym, łatwym do wdrożenia frameworkiem, z Manifestem Agile, którego zasady są dużo trudniejsze do przełożenia na codzienną pracę zespołu.

Wniosek jest taki, że łatwe rady wygrywają w organizacjach nie dlatego, że są lepsze, tylko dlatego, że łatwiej je wdrożyć i skalować na wielu ludzi naraz. Rozwój inżynierski, zdaniem autora, polega na przejściu od stosowania reguł do rozumienia kompromisów i wzięcia odpowiedzialności za konkretne decyzje, zamiast chować się za listą zasad.

**Key takeaways:**
- Reguły praktyczne są łatwe do zweryfikowania i uczenia, dlatego organizacje je preferują
- Zasady oparte na ocenie sytuacji wymagają doświadczenia i czasem się wzajemnie wykluczają
- Ten sam wzorzec widać w zestawieniu Scruma z Manifestem Agile
- Dojrzałość inżynierska to przejście od stosowania reguł do świadomego podejmowania decyzji

**Why do I care:** Ten tekst trafia w coś, co widzę regularnie podczas code review i rozmów rekrutacyjnych. Sprawdzenie, czy ktoś nazywa zmienne sensownie, jest proste, sprawdzenie, czy ktoś potrafi ocenić, kiedy warto zduplikować kod zamiast tworzyć kolejną abstrakcję, wymaga rozmowy o konkretnym kontekście, a nie listy zasad. Dla architekta to przypomnienie, żeby nie sprowadzać code review do checklisty, bo checklisty uczą reguł, a nie osądu. Zespoły, które awansują ludzi wyłącznie za przestrzeganie reguł, w końcu mają dużo juniorów w ciałach seniorów.

**Link:** [Why the Best Software Advice Is the Hardest to Follow](https://daily.dev/posts/Q1CtDahCj)

## Laravel nie jest tak ciężki, jak się wydaje

**TLDR:** Szczegółowy pomiar pamięci pokazuje, że uruchomienie Laravela kosztuje 316KB na request przy włączonym OPcache i zoptymalizowanych cache'ach artisan, a nie 15-20MB, o których często się mówi. Ten mit bierze się z pomiarów robionych bez OPcache, na przykład w tinkerze albo w testach.

**Summary:** Benchmark powstał na Laravelu 13.31.0 i PHP 8.4.22 i rozbija popularny mit na czynniki pierwsze. Artykuł pokazuje, że `php artisan optimize` i mapy klas z Composera prawie nie wpływają na zużycie pamięci, bo to optymalizacje szybkości działania, a nie zużycia RAM-u. Podobnie odroczeni providerzy pomagają tylko wtedy, gdy ich metoda `register()` faktycznie robi jakąś ciężką pracę, w przeciwnym razie różnica jest znikoma.

Prawdziwy koszt pamięciowy pojawia się przy ładowaniu danych. Dziesięć tysięcy modeli Eloquenta wczytanych naraz kosztuje 17MB, podczas gdy te same dane pobrane przez `chunk()`, `lazy()` albo niebuforowany `cursor()` mieszczą się w kilku megabajtach. To pokazuje, że pamięciowe problemy Laravela zwykle nie biorą się z samego frameworka, tylko ze sposobu, w jaki programista pobiera dane z bazy.

Tekst tłumaczy też, dlaczego popularne narzędzia do pomiaru pamięci potrafią wprowadzać w błąd. `memory_get_usage(true)` oraz RSS procesów FPM pokazują dużo wyższe liczby, bo alokator Zenda cache'uje pamięć w blokach po 2MB i nie zwraca jej od razu systemowi. Autor rekomenduje, żeby `pm.max_children` ustawiać na podstawie realnie zmierzonych szczytów pamięci per route, a nie na podstawie samego `memory_limit`.

**Key takeaways:**
- Bootstrap Laravela z włączonym OPcache i cache'ami artisan kosztuje 316KB, nie kilkanaście megabajtów
- `php artisan optimize` i mapy klas Composera to optymalizacje szybkości, nie pamięci
- Odroczeni providerzy oszczędzają pamięć tylko wtedy, gdy ich `register()` faktycznie coś robi
- Prawdziwy koszt pamięci pochodzi z ładowania danych, `chunk()`, `lazy()` i `cursor()` trzymają zużycie w kilku megabajtach zamiast kilkunastu
- `pm.max_children` warto liczyć z realnie zmierzonych szczytów pamięci per route, nie z `memory_limit`

**Why do I care:** Dla mnie to konkretny przykład tego, jak łatwo powiela się liczby bez sprawdzenia, skąd się wzięły. Mit o 15-20MB Laravela żył długo, bo brzmiał wiarygodnie i nikt nie kwestionował metodologii pomiaru. Architekt planujący sizing serwerów albo liczbę workerów FPM na podstawie takich mitów kończy z przewymiarowaną infrastrukturą albo, gorzej, z niedoszacowaną. Ten artykuł to dobry powód, żeby przy każdym takim pomiarze pytać, jak dokładnie go zrobiono, zanim się go wklei do dokumentacji zespołu.

**Link:** [Laravel Is Not As Heavy As You Think](https://daily.dev/posts/bVGqeb2c7)

## Node.js 22.23.3 LTS: łatka bezpieczeństwa i drobne dodatki do Node-API

**TLDR:** Node.js 22.23.3, wydanie z gałęzi LTS o nazwie kodowej „Jod”, aktualizuje certyfikaty root, OpenSSL i kilka innych zależności, a przy okazji dodaje wsparcie dla `SharedArrayBuffer` w Node-API i naprawia błąd use-after-free w obsłudze `RST_STREAM` w HTTP/2.

**Summary:** To standardowe wydanie patchowe w gałęzi LTS, ale kilka zmian zasługuje na uwagę. Certyfikaty root zostały zaktualizowane do NSS 3.125, a OpenSSL podbito do wersji 3.5.8, obie zmiany mają znaczenie bezpieczeństwa, bo dotyczą kryptografii i walidacji certyfikatów. Do tego doszły aktualizacje corepacka do 0.36.0, npm do 10.9.9, ICU do 78.3 oraz undici do 6.28.1, czyli typowy zestaw bumpów zależności, które warto śledzić przed planowaniem większego upgrade'u.

Po stronie Node-API pojawia się wsparcie dla `SharedArrayBuffer` w `napi_create_typedarray` oraz nowa funkcja `napi_create_external_sharedarraybuffer`. To zmiana głównie dla autorów natywnych dodatków i bibliotek niskopoziomowych, którzy potrzebują dzielić pamięć między wątkami bez kopiowania danych. Obok tego naprawiono błąd use-after-free w obsłudze ramki `RST_STREAM` w HTTP/2, poprawiono możliwość patchowania modułu `fs` w loaderze ESM oraz sposób, w jaki settery URL-a radzą sobie z niepoprawnie sparsowanymi, zserializowanymi adresami.

Żadna z tych zmian nie jest przełomowa sama w sobie. Razem pokazują raczej zwykły rytm utrzymania LTS-a, w którym bezpieczeństwo idzie pierwsze, a drobne API i poprawki brzegowych przypadków, zgłoszone kiedyś jako bug, trafiają przy okazji.

**Key takeaways:**
- Aktualizacja certyfikatów root do NSS 3.125 i OpenSSL do 3.5.8 ma bezpośrednie znaczenie dla bezpieczeństwa
- Node-API dostaje wsparcie dla `SharedArrayBuffer`, przydatne dla natywnych dodatków dzielących pamięć między wątkami
- Naprawiono use-after-free w obsłudze `RST_STREAM` w HTTP/2
- Poprawiono patchowalność `fs` w loaderze ESM oraz obsługę niepoprawnych URL-i przez settery

**Why do I care:** Dla mnie takie wydania to codzienna rutyna, nie wiadomość dnia, ale ignorowanie ich przez kilka cykli LTS-a zwykle kończy się jednym dużym, bolesnym upgrade'em zamiast serii małych. Aktualizacja OpenSSL i certyfikatów root to akurat coś, co warto wdrożyć od razu, zwłaszcza w środowiskach, gdzie compliance wymaga udokumentowanej historii patchy bezpieczeństwa. Wsparcie dla `SharedArrayBuffer` w Node-API zainteresuje głównie zespoły piszące natywne moduły albo pracujące blisko workerów, dla większości frontendowych zespołów to bez znaczenia w codziennej pracy.

**Link:** [Node.js — Node.js 22.23.3 (LTS)](https://daily.dev/posts/3QQOokzpS)
