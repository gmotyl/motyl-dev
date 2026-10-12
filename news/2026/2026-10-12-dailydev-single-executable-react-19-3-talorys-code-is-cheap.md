---
title: "Pojedynczy plik wykonywalny z JavaScriptu, React 19.3, Talorys na Cloudflare i tania wartość kodu"
excerpt: "Porównanie deno compile, bun build i node --build-sea, nowości w React 19.3, agent Talorys na darmowym planie Cloudflare oraz esej o tym, dlaczego jakość kodu liczy się bardziej w erze AI."
publishedAt: "2026-10-12"
slug: "dailydev-single-executable-react-19-3-talorys-code-is-cheap"
hashtags: "#dailydev #javascript #nodejs #deno #bun #react #react-19 #cloudflare #agents #architecture #generated #pl"
source_pattern: "daily.dev"
---

## Jak skompilować JavaScript do jednego pliku wykonywalnego

**TLDR:** Autor skompilował to samo małe narzędzie CLI trzema wbudowanymi sposobami: deno compile, bun build --compile i node --build-sea. Bun wygrał rozmiarem i czasem startu, ale żaden z nich nie jest prawdziwą kompilacją do kodu maszynowego.

**Summary:** Porównanie przechodzi po kolei przez każde z trzech narzędzi, razem z zależnościami z npm, budowaniem na inne platformy, dołączaniem plików i podpisywaniem kodu na macOS. Bun daje plik o wielkości 62 MB, który startuje w 7 milisekund, i wymaga najmniej konfiguracji. Deno kosztuje 68 MB i 20 milisekund, ale pozwala zablokować uprawnienia już w czasie kompilacji. Node, od wersji 25.5, ma tryb build-sea. Wynik to 146 MB i 24 milisekundy, a przed budowaniem trzeba jeszcze spakować kod do jednego pliku, na przykład esbuildem.

Najciekawszy jest punkt odniesienia. Ta sama aplikacja w Rust ma 446 KB i startuje w 1,3 milisekundy. To przypomina, że wszystkie trzy JavaScriptowe opcje po prostu doklejają cały runtime do skryptu. Starsze narzędzia pkg i nexe są w praktyce wyparte. Są też dwie pułapki. Na macOS binarkę Node trzeba podpisać ponownie, bo zapisanie kodu w pliku psuje podpis i proces kończy się kodem 137. Deno z kolei potrafi wywrócić build, gdy w projekcie z node_modules brakuje typów Node, i wtedy trzeba je doinstalować albo wyłączyć sprawdzanie typów.

**Key takeaways:**
- Bun jest najmniejszy i najszybszy w tym teście, Deno oferuje blokadę uprawnień, Node wymaga wcześniejszego bundlowania.
- Pliki ze wszystkich trzech narzędzi zawierają cały runtime, więc ich rozmiar to dziesiątki megabajtów.
- Na macOS po zbudowaniu binarki Node trzeba ją ponownie podpisać.

**Why do I care:** Dla narzędzi wewnętrznych i CLI w zespole frontendowym to realna wygoda, bo nikt nie musi instalować Node'a. Ale porównanie dotyczy jednego malutkiego skryptu, więc nie wyciągałbym z niego wniosków o większych aplikacjach. Tego, jak zachowują się dynamiczne importy i natywne moduły, autor nie sprawdza.

**Link:** [How to compile JavaScript into a single executable](https://daily.dev/posts/jpC9PqWrO)

## This Week In React #296: React 19.3 i ekosystem

**TLDR:** React 19.3 stabilizuje View Transitions i Fragment Refs oraz dodaje use(browser()), obsługę Trusted Types i renderowanie Context bezpośrednio w RSC. W ekosystemie sporo wydań, w tym nowy silnik cn do łączenia klas Tailwinda.

**Summary:** Stabilne View Transitions dostają nowe API addTransitionType, dzięki któremu kod wywołujący przejście może dopasować animację. Fragment Refs pozwalają wziąć referencję do fragmentu i operować na jego dzieciach w DOM. use(browser()) wyłącza renderowanie po stronie serwera dla wybranego poddrzewa, a Trusted Types mają pomagać przy ochronie przed XSS. Komponenty serwerowe mogą też renderować Context bez osobnego providera.

Poza samym Reactem newsletter wymienia nową bibliotekę cn, która ma być 30 razy szybsza niż tailwind-merge z clsx przy tych samych API i jest już w shadcn 4.21. Cena to 26 KB po minifikacji. Jest też React Compiler napisany w Rust, który trafia do Vite z deklarowanym 17-krotnym przyspieszeniem, oraz Expo Modules 2.0, gdzie wywołania synchroniczne są 2,5 do 5,6 raza szybsze niż w wersji 1.0. Na razie to eksperyment tylko na iOS. React DevTools 8.0 ma Suspense Tab, ale jeszcze nie został opublikowany. Wspomniane są też wydania Vitest 5.0, Jotai 3.0, htmx 4.0 i NestJS 12.0.

**Key takeaways:**
- React 19.3 stabilizuje View Transitions i Fragment Refs.
- cn obiecuje 30-krotne przyspieszenie, ale to liczba z materiałów autora biblioteki.
- Rustowy React Compiler w Vite i Expo Modules 2.0 to na razie kierunki, nie ustabilizowane standardy.

**Why do I care:** Fragment Refs i stabilne View Transitions to rzeczy, które realnie wyrzucają hacki z kodu aplikacji. Do liczb typu 30x czy 17x podchodziłbym ostrożnie, dopóki nikt nie zmierzy ich na prawdziwym projekcie.

**Link:** [This Week In React #296](https://daily.dev/posts/oS456bnTF)

## Talorys: osobisty agent AI na darmowym planie Cloudflare

**TLDR:** Talorys to open-source'owy agent, który jednym poleceniem npx wdraża się na własne konto Cloudflare. Ma czat, pamięć, zadania, notatki i przypomnienia, a całość mieści się w darmowym planie.

**Summary:** Projekt działa na Cloudflare Pages, Workers i Durable Objects z SQLite, a inferencję robi Workers AI z modelem glm-4.7-flash. Worker agenta jest prywatny dzięki service binding, a uwierzytelnianie dzieje się po stronie serwera. Są wbudowane kopie zapasowe, a limity maksymalnej liczby tokenów, wywołań narzędzi i zapytań dziennie mają pilnować kosztów. Gdy dzienna pula AI się wyczerpie, czat informuje o tym i wraca po resecie, a reszta, czyli zadania, notatki i przypomnienia, działa dalej.

Dyskusja pod wpisem poszła w innym kierunku niż sam produkt. Większość z 274 komentarzy to spór, czy coś działającego na infrastrukturze Cloudflare można uczciwie nazwać self-hosted. Daily.dev ocenia nastroje jako w większości sceptyczne.

**Key takeaways:**
- Wdrożenie to jedno polecenie, bez serwerów utrzymywanych przez autorów.
- Limity kosztów są konfigurowalne, a po wyczerpaniu puli AI działa reszta funkcji.
- Etykieta "self-hosted" budzi więcej emocji niż funkcje.

**Why do I care:** To dobry wzorzec architektury dla małych agentów: prywatny worker, stan w Durable Objects, twarde limity. Spór o nazwę ma sens z jednego powodu. Dane trzymasz u dostawcy, więc zależność od niego zostaje, tylko w innej formie.

**Link:** [Talorys – A self-hosted personal AI agent on Cloudflare's free tier](https://daily.dev/posts/AvUSpdhDB)

## Kod jest tani. Właśnie dlatego ma znaczenie

**TLDR:** Esej argumentuje, że agenci AI nie zdezaktualizowali jakości kodu, tylko podnieśli jej wagę. Agenci czytają istniejący kod i naśladują jego konwencje, więc dobry model domenowy się kumuluje, a bałagan też.

**Summary:** Autor wychodzi od tego, że kod stał się zamienny. Przepisanie czegoś i rozpropagowanie zmiany po całej bazie jest tanie. Ale właśnie dlatego spójny, dobrze zamodelowany kod daje lepsze wyniki generowane przez AI, a niechlujny kod mnoży własne wady. Opisuje dwufazowy sposób pracy: najpierw rozszerzasz, budując z pomocą AI kilka kandydatów na rozwiązanie, potem zwężasz, wnosząc wnioski z powrotem do lepszych abstrakcji.

Rzadką i cenną umiejętnością pozostaje rozpoznawanie dobrej architektury i dobrych abstrakcji. Według autora wygrywać może wtedy najlepszy pomysł, a nie ten, na który ktoś miał czas.

**Key takeaways:**
- Tanie generowanie kodu nie obniża wartości jakości, bo agenci uczą się z tego, co już jest w repozytorium.
- Praca idzie w rytmie: rozszerz kandydatami, zwęż do lepszej abstrakcji.
- Najdroższą umiejętnością jest ocena abstrakcji.

**Why do I care:** Zgadzam się z kierunkiem, ale esej unika pytania, kto ma czas na fazę zwężania, gdy presja dostaw rośnie. Bez tego "kumulowanie się dobrego kodu" zostaje życzeniem. W praktyce to argument za utrzymywaniem konwencji i review architektonicznego, nie za mniejszą liczbą ludzi.

**Link:** [Code Is Cheap Now. That's Why It Matters.](https://daily.dev/posts/7YDgcUVN6)
