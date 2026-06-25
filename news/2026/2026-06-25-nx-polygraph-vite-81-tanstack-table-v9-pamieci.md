---
title: "Nx uruchamia Polygraph, Vite 8.1 z trybem bundle i pętla agentów według Armin Ronacher"
excerpt: "Wydanie Bytes #498: Nx tworzy narzędzie Polygraph do cross-repo AI, Vite 8.1 wprowadza eksperymentalny bundled dev mode, Armin Ronacher zastanawia się nad przyszłością harness loops, a TanStack Table v9 redukuje zużycie pamięci o 90%."
publishedAt: "2026-06-23"
slug: "nx-polygraph-vite-81-tanstack-table-v9-pamieci"
hashtags: "#uidev #nx #vite #tanstack #ai #agents #generated #pl"
source_pattern: "ui.dev"
---

## Nx uruchamia Polygraph: syntetyczny monorepo dla agentów AI

**TLDR:** Nx wypuścił Polygraph, narzędzie które łączy wiele repozytoriów w jeden wirtualny monorepo dostępny dla agentów AI. Rozwiązuje problem braku kontekstu między repozytoriami, a także problem utraty historii sesji przez agenty. Nx stawia na model "meta-harness", działający ponad istniejącymi narzędziami jak Claude Code czy GitHub Codex.

Jeśli byłeś kiedykolwiek na konferencji, wiesz jak wygląda pitch nowego produktu. Jeff Cross z Nx zna ten rytuał dobrze, bo od lat głosi ewangelię monorepo. Tym razem jednak chodzi o coś innego: o problem, który boli coraz bardziej w 2026 roku, czyli o agenty AI, które nie mogą pracować skutecznie z kodem rozrzuconym po dziesiątkach repozytoriów.

Polygraph podchodzi do tego problemu przez graf zależności. Po podłączeniu prywatnych i publicznych repozytoriów, narzędzie buduje mapę tego, jak projekty łączą się przez pakiety i API. Agent dostaje ten kontekst i może czytać, pisać oraz przeszukiwać kod jak gdyby wszystko leżało w jednym miejscu. Nie ma przeklejania ścieżek, nie ma ręcznego tłumaczenia kontekstu między sesjami.

To co mnie tu interesuje to nie sam graf, ale Session Memory. Polygraph rejestruje każdą sesję każdego developera w organizacji i buduje historię tego, jak praca ze sobą współgra. Każde zadanie można wznowić lub odwołać z każdej maszyny. To adresuje jeden z największych bólów przy pracy z agentem: ten typ amnezji, gdzie agent po zamknięciu sesji nie pamięta, co ustaliliście godzinę temu.

Sceptycznie podchodzę do produktów, które obiecują "transformację" środowisk enterprise, ale tutaj widzę konkretny problem i konkretne rozwiązanie. Grafy zależności między repozytoriami to coś, czego zawsze brakowało przy cross-repo refaktoryzacjach nawet bez AI. Pytanie, czy koszt tego poziomu integracji z infrastrukturą firmy jest opłacalny dla średnich zespołów.

**Key takeaways:**
- Polygraph buduje graf zależności między repozytoriami i udostępnia go agentom jako syntetyczny monorepo
- Session Memory zachowuje historię wszystkich sesji developerów w organizacji, eliminując utratę kontekstu
- Narzędzie działa jako meta-harness ponad istniejącymi agentami jak Claude Code, GitHub Copilot czy Codex
- Projekt pochodzi od twórców Nx, którzy od lat budują narzędzia do zarządzania monorepo

**Why do I care:** Dla większości firm kwestia cross-repo context w agentach AI jest dziś poważnym problemem produkcyjnym. Jeśli Polygraph faktycznie działa jak obiecuje, to skraca dystans między "agentami, które pomagają" a "agentami, które autonomicznie wykonują zadania w rozbudowanym środowisku". Warto obserwować, jak sprawdza się poza startupami z czystą architekturą.

**Link:** [Bytes #498 - What's next for Nx](https://bytes.dev/archives/498)

---

## Vite 8.1: eksperymentalny bundled dev mode i inne nowości

**TLDR:** Vite 8.1 wprowadza eksperymentalny "Bundled Dev Mode", który przyspiesza start dużych aplikacji nawet 15x i redukuje liczbę requestów sieciowych o 10x. Oprócz tego pojawiły się: obsługa Wasm ESM integration, eksperymentalne chunk import maps oraz przybliżenie do Lightning CSS jako domyślnego procesora CSS.

Vite zbudowało swoją reputację na podejściu unbundled: każdy moduł serwowany osobno, bez procesu budowania w dev. To było odkrywcze kilka lat temu. Ale każde podejście ma swój sufit, i dla dużych aplikacji ładujących dziesiątki tysięcy modułów ten sufit zaczął boleć. Bundled Dev Mode to przyznanie, że dla pewnej klasy projektów bundling w trybie deweloperskim ma sens.

Liczby są imponujące na papierze: 15x szybszy cold start dla aplikacji z 10 000 komponentami React, 10x mniej requestów sieciowych, a HMR nadal działa natychmiastowo. Zespół Linear widział 3x szybsze renderowanie cold start i 40x mniej requestów. Oczywiście są to optymistyczne case studies, ale nawet przy 30% tych wyników to spora różnica dla dużych projektów.

Chunk import maps to bardziej niszowa, ale technicznie ciekawa zmiana. Problem kaskadowego rehashowania chunków jest stary jak bundlery: zmiana jednego pliku powoduje zmianę hasza wszystkich plików, które go importują, co demoluje cache przeglądarki. Import maps zrywają ten łańcuch, przechowując mapowanie hash->plik zewnętrznie. Dla aplikacji z częstymi deployami to może oznaczać realnie lepszy cache hit rate u użytkowników.

Wasm ESM integration to z kolei coś, na co czekałem. Natywny import pliku `.wasm` i używanie eksportowanych funkcji bezpośrednio, bez owijania w `fetch` i `WebAssembly.instantiate`. Standard był w przygotowaniu od dawna, fajnie że trafia do mainstreamu przez Vite.

**Key takeaways:**
- Bundled Dev Mode (experimental) przyspiesza starty dużych aplikacji nawet 15x, kosztem złożoności konfiguracji pluginów
- Chunk Import Maps rozwiązują problem kaskadowego rehashowania w celu lepszego cache przeglądarki
- Wasm ESM integration pozwala na bezpośredni import plików `.wasm` jak zwykłych modułów ES
- Lightning CSS zbliża się do zostania domyślnym procesorem CSS, wersja 8.1 wypełnia ostatnie braki

**Why do I care:** Bundled Dev Mode jest opisany jako experimental, więc nie spieszę się z wdrożeniem. Ale kierunek jest dobry: Vite powinno wiedzieć kiedy bundlować, a kiedy nie, i dać developerowi wybór zamiast wymuszać jedno podejście. Import maps to z kolei prosta zmiana o dużym praktycznym wpływie na cache strategię w produkcji.

**Link:** [Vite 8.1 is out!](https://vite.dev/blog/announcing-vite8-1)

---

## Armin Ronacher o pętlach agentów: czy możemy to kontrolować?

**TLDR:** Armin Ronacher, twórca Flasku i Jinja2, opisuje rosnący trend "harness loops" w inżynierii AI: systemów, gdzie agent pracuje autonomicznie w pętli zarządzanej przez zewnętrzny harness, bez udziału człowieka. Ma mieszane odczucia: podziwia szybkość, ale niepokoi go jakość kodu i utrata rozumienia systemu przez zespół.

Armin pisze to z pozycji człowieka, który rozumie narzędzia głębiej niż większość: twórca kluczowych projektów open source, osoba, która zna różnicę między kodem "działającym" a kodem "dobrym". I właśnie z tej perspektywy jego obawy brzmią inaczej niż typowe narzekania na AI.

Jego główna teza: modele LLM produkują kod defensywny, zbyt lokalny w rozumowaniu, unikający silnych niezmienników na rzecz fallbacków. Zamiast sprawić, że nieprawidłowy stan jest niemożliwy, dodają warstwy obsługi błędów na każdy przypadek. To znany problem, Karpathy mówił o "śmiertelnym strachu przed wyjątkami". Ale Armin idzie dalej: gdy taki kod trafia do pętli harness, gdzie każda iteracja dodaje kolejną warstwę defensywną, system staje się coraz mniej zrozumiały przy pozorach coraz większej solidności.

Uczciwie przyznaje, gdzie pętle działają dobrze: portowanie kodu między językami, eksperymenty z wydajnością, security scanning. Mają jedną wspólną cechę: albo transformują istniejący kod mechanicznie (i można to zweryfikować testem), albo produkują artefakty bez długiego "shelf life". Pętle jako narzędzie eksploracji i pomiaru, nie jako fabryka kodu produkcyjnego, to sensowna granica.

Najtrudniejsza część artykułu dotyczy niemożności rezygnacji. Nawet jeśli nie używasz pętli do budowania softu, atakujący będą używać pętli przeciwko tobie. Już teraz maintainerzy jak Daniel Stenberg (curl) są zalewani AI-generowanymi raportami. To presja systemowa, która może zmusić do odpowiedzi w naturze, żeby nadążyć.

**Key takeaways:**
- Harness loops (pętle agentów zarządzane zewnętrznie) działają dobrze dla portowania kodu, eksperymentów i research, ale słabiej dla budowania trwałego kodu produkcyjnego
- LLM-y bez nadzoru produkują kod zbyt defensywny i zbyt lokalny w rozumowaniu, co eskaluje w pętlach
- Nieuchronność nadejścia loops nie oznacza braku agencji: kluczowe jest zachowanie nadzoru i zrozumienia systemu
- Ryzyko zależności od modeli to nie tylko koszt, ale też utrata zdolności do utrzymania kodu bez wsparcia AI

**Why do I care:** To jeden z rzadkich artykułów, który stawia pytanie "co tracimy" zamiast "ile zyskujemy". Zgadzam się z diagnozą: code review modeli jest dziś za słabe, żeby ufać pętlom przy tworzeniu trwałego kodu architektonicznie. Ale zgadzam się też z pragmatyzmem Armina: adaptacja jest nieuchronna, warto więc myśleć o kontroli, a nie o rezygnacji.

**Link:** [The Coming Loop](https://lucumr.pocoo.org/2026/6/23/the-coming-loop/)

---

## cnfast: drop-in replacement dla cn/tailwind-merge, 3.8x szybszy

**TLDR:** Aiden Bai wypuścił cnfast, bibliotekę kompatybilną API z tailwind-merge i clsx, która działa średnio 3.8x szybciej. Różnica jest największa przy re-renderach komponentów, gdzie te same zestawy klas powtarzają się wielokrotnie. Migracja z istniejących projektów to jedno polecenie.

Szczerze: przez większość projektów codziennie wywołujemy `cn()` tysiące razy i nigdy nie zastanawiamy się nad kosztem. Dla strony statycznej to bez znaczenia. Dla data grids, wirtualizowanych tabel i dashboardów, gdzie `cn()` jest wywoływane w renderze każdego wiersza, szybkość ma realne przełożenie na płynność interfejsu.

Kluczowa innowacja techniczna to użycie prototypów i cachowania po tożsamości call-site. Forma tagged template `cn\`px-2 px-4 ${isActive && "bg-blue-500"}\`` jest szczególnie szybka przy ponownych wywołaniach: ta sama lokalizacja w kodzie jest rozpoznawana i skip-owana bez pełnego przetwarzania. Na V8 to 4.3x szybciej niż tailwind-merge dla stabilnych call sites.

Wyniki byte-identical z tailwind-merge według benchmarków na 113 291 rzeczywistych zestawach klas. To ważne: zmiana biblioteki, która cicho zmienia klasy wynikowe, byłaby katastrofą w dużym projekcie shadcn/ui. Biblioteka eksportuje też `clsx`, `twMerge` i `twJoin` dla tych, którzy korzystają z tych API bezpośrednio.

Migracja przez `npx cnfast migrate` lub, dla projektów shadcn/ui, przez `npx shadcn@latest add aidenybai/cnfast/cn`. Bundle jest nieznacznie większy (9.43 KB gzip vs 8.45 KB baseline), więc nie ma darmowego obiadu, ale kompromis wydaje się rozsądny.

**Key takeaways:**
- cnfast jest 3.8x szybszy średnio i do 4.4x szybszy przy re-renderach z tymi samymi zestawami klas
- Wyniki są byte-identical z tailwind-merge, co zweryfikowano na ponad 113 000 rzeczywistych zestawach klas
- Migracja z clsx/classnames/tailwind-merge to jedno polecenie CLI
- Dla projektów shadcn/ui dostępna jest automatyczna integracja przez rejestr shadcn

**Why do I care:** To drop-in i bezpieczna zmiana. Projekty z wirtualizowanymi listami lub dużymi tabelami mogą zyskać mierzalnie. Dla reszty to kosmetyczna poprawa, ale skoro API jest identyczne, trudno znaleźć powód żeby nie zmigrować.

**Link:** [GitHub - aidenybai/cnfast](https://github.com/aidenybai/cnfast)

---

## TanStack Table v9: 90% mniej pamięci dzięki współdzielonym prototypom

**TLDR:** Kevin Van Cott opisuje jak TanStack Table v9 redukuje zużycie pamięci o 90% dla dużych tabel. Zmiana to jeden refaktoring: zamiast tworzyć metody jako funkcje strzałkowe na każdej instancji obiektu, metody trafiają raz na współdzielony prototyp. Przy milionach wierszy różnica między v8 a v9 wynosi ponad 2.4 GB retained JS heap.

To jeden z tych artykułów, który zmienia sposób patrzenia na codzienne wzorce JavaScriptu. Problem był prosty: TanStack Table v8 przy tworzeniu obiektów wiersza (row), kolumny (column) i komórki (cell) przypisywał metody jako arrow functions bezpośrednio do każdej instancji. Każda strzałka to zamknięcie, każde zamknięcie trzyma referencje do kontekstu fabryki. Przy milionie wierszy to milion kopii tych samych funkcji z milionem osobnych closures.

Rozwiązanie jest eleganckie: metody trafiają raz na prototyp obiektu przez `Object.setPrototypeOf`, a `this` zastępuje zamknięcia jako sposób na dostęp do konkretnego wiersza. Benchmark mówi sam za siebie: 100 000 wierszy x 8 kolumn to w v8 272 MB, w v9 to 27 MB. Przy milionie wierszy: 2710 MB vs 257 MB.

Dlaczego nie klasy? Tutaj autorzy mają dobry argument: system funkcjonalności TanStack Table jest dynamicznie komponowalny. `row.getVisibleCells()` powinno istnieć tylko gdy zarejestrowano feature column visibility, `column.toggleSorting()` tylko gdy zarejestrowano row sorting. Klasy JavaScript mają pojedyncze dziedziczenie, a dynamiczne komponowanie dowolnych kombinacji 8+ features przez dziedziczenie klas to przepis na chaos. Ręczne prototypy dają to samo co klasy (metody na prototypie) przy zachowaniu dynamiczności systemu features.

Jest jeden breaking change: destrukturyzacja metod `const { getValue } = row` przestaje działać, bo metoda na prototypie traci `this` przy wyjęciu z kontekstu. To był świadomy wybód odłożony do v9. Wywołanie `row.getValue()` działa dalej bez zmian.

**Key takeaways:**
- Zamiana arrow functions na prototyp-based methods redukuje zużycie pamięci o 90% dla tabel z setkami tysięcy wierszy
- Kluczowy insight: każda arrow function w factory loop tworzy osobne zamknięcie z własnymi referencjami, co eskaluje do gigabajtów przy skali
- Klasy nie rozwiązują problemu dynamicznego składania features, dlatego wybrano ręczne manipulowanie prototypami
- Jedyną ofiarą jest destrukturyzacja metod `const { getValue } = row`, które przestają działać przez utratę `this`

**Why do I care:** Ten pattern, tworzenie metod "in-place" w factory loops, jest powszechny w bibliotekach frontendowych. Chętnie sprawdzę go w następnym code review. Artykuł dobrze pokazuje, że optymalizacje na poziomie architektury (jeden refaktoring w jednym miejscu) mogą przynosić efekty, których żadna seria mikro-optymalizacji nie osiągnie.

**Link:** [How an Underrated Refactor Saved 90% Memory Usage](https://tanstack.com/blog/tanstack-table-v9-memory-performance)
