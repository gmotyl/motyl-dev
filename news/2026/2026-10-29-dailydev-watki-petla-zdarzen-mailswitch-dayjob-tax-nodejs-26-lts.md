---
title: "Wątki kontra pętla zdarzeń, mailswitch na Cloudflare Workers, benchmark AI w podatkach i Node.js 26 LTS"
excerpt: "Jak serwery obsługują żądania, biblioteka do przełączania dostawców maili, 10,8 procent skuteczności agentów w zadaniach podatkowych i Node.js 26 wchodzi w LTS."
publishedAt: "2026-10-29"
slug: "dailydev-watki-petla-zdarzen-mailswitch-dayjob-tax-nodejs-26-lts"
hashtags: "#dailydev #nodejs #architecture #cloudflare #ai #agents #javascript #performance #generated #pl"
source_pattern: "daily.dev"
---

## How Servers Handle Requests: Threads vs Event Loop Explained

**TLDR:** Godzinny film prześledził jedno żądanie logowania w Node, Pythonie, Go i Javie. Wszystkie cztery kończą na tych samych wywołaniach jądra, a różni je to, jak czekają na I/O.

**Summary:** Autor bierze jedno zwykłe żądanie logowania i pokazuje, co dzieje się pod spodem. Niezależnie od języka, serwer przechodzi przez te same wywołania systemowe, czyli utworzenie gniazda, przypisanie adresu, nasłuchiwanie, przyjęcie połączenia i odczyt. Dopiero potem zaczynają się różnice w tym, jak każdy runtime radzi sobie z czekaniem.

Node używa jednego wątku i pętli zdarzeń opartej na epoll, której nigdy nie wolno zablokować. Do operacji na plikach i DNS ma osobną pulę czterech wątków roboczych. Python ma GIL, więc w danej chwili bajtkod wykonuje tylko jeden wątek. Produkcyjne serwery rozwiązują to wieloma procesami albo asynchronicznym I/O, na przykład przez Uvicorna. Go daje każdemu połączeniu goroutine ze stosem około dwóch kilobajtów i wywłaszcza te, które działają dłużej niż dziesięć milisekund.

Java 21 ma wątki wirtualne, które oddają wątek systemowy, kiedy czekają na I/O. Zostaje problem przypinania, który według filmu położył kiedyś usługę w Netflixie. Ciekawa liczba dotyczy kosztu wątku. Rezerwuje on osiem megabajtów przestrzeni adresowej, ale w stanie bezczynności dotyka około ośmiu kilobajtów. Według Rona Presslera, projektanta wątków wirtualnych, optymalizacja przełączania zadań daje może pięć procent przepustowości.

**Key takeaways:**
- Wszystkie cztery runtime'y korzystają z tych samych wywołań jądra, więc różnica leży w modelu czekania.
- Node nie może blokować pętli zdarzeń, a pula czterech wątków obsługuje tylko pliki i DNS.
- Wątek systemowy kosztuje mało pamięci fizycznej, a przełączanie zadań to wąskie gardło tylko w około pięciu procentach.

**Why do I care:** Dobrze, że ktoś rozbija mit, że wątki są drogie, bo ośmiu megabajtów nikt realnie nie zużywa. Ja jednak zadałbym pytanie, którego film unika. Skoro przełączanie daje pięć procent, to dlaczego dyskusje o architekturze wciąż kręcą się wokół modelu współbieżności, a nie wokół tego, na co serwer faktycznie czeka, czyli na bazę i sieć. Dla frontendowca to wiedza przydatna głównie przy BFF w Node, gdzie jedna synchroniczna operacja potrafi zatrzymać wszystkich użytkowników.

**Link:** [How Servers Handle Requests: Threads vs Event Loop Explained](https://daily.dev/posts/1spSr8LjX)

## Mailswitch, czyli transakcyjne maile na Cloudflare Workers bez przywiązania do dostawcy

**TLDR:** Biblioteka pozwala zmienić dostawcę maili bez zmiany kodu i bez ponownego wdrożenia. Obsługuje Resend, Postmark, Amazon SES, SMTP, Mailgun i SendGrid przez jedno API.

**Summary:** Mailswitch to biblioteka do wysyłania maili transakcyjnych z Cloudflare Workers. Jej główny pomysł jest taki, że dostawcę konfiguruje się w ustawieniach, a nie w kodzie. Administrator może więc podłączyć własnego dostawcę w ekranie ustawień, który biblioteka pomaga zbudować, bez udziału programisty.

Najciekawszy jest sposób raportowania wyników. Każda wysyłka zwraca jeden z trzech statusów, czyli wysłano, nie wysłano albo nieznany. Biblioteka nigdy nie ponawia automatycznie wysyłki przez zapasowego dostawcę, jeśli wynik jest nieznany. To rozsądne, bo inaczej użytkownik dostałby dwa maile z resetem hasła. Dane uwierzytelniające są szyfrowane algorytmem AES-256-GCM, a limity zapytań trzymane w D1 albo w Durable Objects. Paczka do stu wiadomości z kluczami i D1 robi około czterech zapytań do bazy, więc mieści się w jednym wywołaniu Workera na darmowym planie.

**Key takeaways:**
- Jedno API dla wielu dostawców, a wybór dostawcy to konfiguracja.
- Status nieznany nie uruchamia zapasowego dostawcy, żeby uniknąć duplikatów.
- Poświadczenia są szyfrowane, a limity trzymane w D1 lub Durable Objects.

**Why do I care:** Podoba mi się decyzja o trzecim statusie, bo większość bibliotek udaje, że sieć daje tylko sukces albo błąd. Brakuje mi jednak informacji, jak biblioteka zachowuje się przy częściowo udanej paczce i kto ma uprzątać wiadomości w stanie nieznanym. Dla zespołów na Cloudflare to praktyczne rozwiązanie, bo uwalnia od vendor locku w jednym z najnudniejszych, a najbardziej bolesnych miejsc w systemie.

**Link:** [mailswitch](https://daily.dev/posts/OvTQifvZD)

## DAYJOB Tax, czyli agenci AI na pięćdziesięciu prawdziwych zadaniach podatkowych

**TLDR:** Benchmark Surge AI pokazuje, że najlepszy agent zdaje zaledwie 10,8 procent zadań. Prowadzi Claude Sonnet 5.5, przed Fable 5.1 i Opus 5.5.

**Summary:** DAYJOB Tax to zestaw pięćdziesięciu realistycznych zleceń z ośmiu obszarów praktyki podatkowej, między innymi podatki osób fizycznych, spółek osobowych, spadków i podatki międzynarodowe. Agent dostaje 1789 plików roboczych, w tym PDF-y, arkusze Excela i odręczne paragony. Wynik liczony jest jako pass@1 przy progu rubryki 95 procent, a to bardzo wysoki próg.

Sonnet 5.5 ma 10,8 procent, Fable 5.1 ma 9,6 procent, a Opus 5.5 ma 9,2 procent. Najciekawsze są przykłady porażek. W jednym zadaniu Astra przez pięć prób ani razu nie zauważyła terminu, który mógł kosztować sprzedającego dom utratę ulgi, a Opus zauważał go za każdym razem. W innym Opus za każdym razem założył, że para nie jest po ślubie, choć w dokumentach były dowody małżeństwa, a Astra w czterech próbach na pięć uznała, że trzeba to sprawdzić.

Dyskusja pod wpisem szybko odeszła od samego benchmarku. Ludzie opowiadali, jak LLM-y wyłapywały błędy księgowych, a potem popełniały własne, poważne. Pojawił się też zarzut, że agent bez narzędzi dobranych do zadania niewiele mówi o realnym użyciu.

**Key takeaways:**
- Najlepszy wynik to 10,8 procent przy progu 95 procent rubryki.
- Agenci zawodzą na niezweryfikowanych założeniach i terminach, o które nikt nie pytał.
- Modele różnią się tym, które pułapki łapią, więc nie ma jednego zwycięzcy w każdej kategorii.

**Why do I care:** To jest historia głównie biznesowa i o zaufaniu do agentów, ale każdy, kto buduje funkcje oparte na LLM, powinien ją znać. Autorzy nie mówią, ile z tych porażek to brak narzędzi, a ile naprawdę brak rozumowania, a to zmienia wnioski. Dla mnie wniosek jest prosty. Przy zadaniach, gdzie cena błędu jest wysoka, agent musi pytać o brakujące fakty, zanim zacznie liczyć.

**Link:** [Dayjob: Tax – evaluating AI agents on 50 professional tax assignments](https://daily.dev/posts/TKNyNvr2R)

## Node.js 26 wchodzi w LTS jako Lithium

**TLDR:** Wersja 26.13.0 rozpoczęła Active LTS 28 października 2026 i będzie wspierana do końca kwietnia 2029. Temporal jest domyślnie włączony, a stare API zniknęły.

**Summary:** Node.js 26 dostał kryptonim Lithium i status długoterminowego wsparcia. W wydaniach z tej linii pojawiły się V8 14.6 i Undici 8.0, a największą zmianą dla kodu aplikacyjnego jest Temporal włączony domyślnie. Zastępuje on niezręczny obiekt Date niezmiennymi typami, które znają strefy czasowe.

Trzeba sprawdzić kilka zmian niezgodnych wstecz. Usunięto metodę writeHeader z prototypu serwera HTTP oraz moduły o nazwach zaczynających się od _stream_. Budowanie ze źródeł wymaga GCC w wersji co najmniej 13.2. Od Node 25 oficjalne binaria dla Linuksa są też zlinkowane z libatomic, które na niektórych dystrybucjach trzeba doinstalować osobno.

**Key takeaways:**
- Wsparcie LTS trwa do końca kwietnia 2029.
- Temporal jest domyślnie dostępny, więc można zacząć migrować kod z Date.
- Przed aktualizacją sprawdź usunięte API i wymagania kompilatora.

**Why do I care:** Dla większości zespołów to sygnał, że można zaplanować migrację z Node 22 lub 24 na linię, która przetrwa trzy lata. Temporal domyślnie w runtime to dobra wiadomość, ale przeglądarki i narzędzia do testów wciąż potrafią się rozjeżdżać z serwerem, więc przed przepisywaniem dat sprawdź, co faktycznie wspiera cała twoja pipeline.

**Link:** [Node.js 26 enters LTS as 'Lithium' with Temporal enabled and old APIs removed](https://daily.dev/posts/VMtcGvlgl)
