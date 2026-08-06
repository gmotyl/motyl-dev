---
title: "Wykresy bez D3, agenci bez sekwencji i React 19 w praktyce"
excerpt: "Przegląd pięciu tematów z daily.dev: nowa biblioteka wykresów TanStack Charts, walka z N+1 w NestJS, krytyka sekwencyjnych multi-agentów AI oraz dwa dogłębne teksty o useActionState i useOptimistic w React 19 i Next.js 16."
publishedAt: "2026-08-06"
slug: "wykresy-bez-d3-agenci-bez-sekwencji-react19"
hashtags: "#dailydev #TanStackCharts #NestJS #AIAgents #ReactHooks #generated #pl"
source_pattern: "daily.dev"
---

## TanStack Charts, czyli wykresy bez ciągnięcia D3 na pokładzie

**TLDR:** Zespół TanStack wypuścił własną bibliotekę do wykresów, framework-neutralną, bez zależności od D3, z rdzeniem poniżej 10 KiB po kompresji.

**Summary:** TanStack ma już swoje Query, Table, Router i Form, więc pojawienie się Charts było raczej kwestią czasu niż niespodzianką. Ciekawsze od samego faktu istnienia biblioteki jest podejście, jakie przyjęli jej autorzy. Zamiast owijać D3 kolejną warstwą abstrakcji, poszli w stronę gramatyki grafiki znanej z Observable Plot, ggplot2 i Vega-Lite, czyli budowania wykresu z osobnych warstw, znaczników i kanałów danych, a nie z gotowych komponentów typu LineChart czy BarChart. To podejście jest trudniejsze do ogarnięcia na pierwszy kontakt, ale w zamian daje kompozycyjność, której gotowe komponenty po prostu nie mają. Rdzeń biblioteki waży około 8 KiB po gzipie i nie ciągnie za sobą D3 ani InternMap, co dla mnie jest tu największym argumentem, bo połowa projektów, w których widziałem D3, używała go do renderowania trzech linii na wykresie liniowym. Warstwa renderująca jest oddzielona od rdzenia, więc integracja z Reactem dodaje jeszcze około 16 KiB, ale to już koszt konkretnej implementacji, nie fundamentu. Wsparcie dla współdzielonych systemów współrzędnych między wieloma znacznikami oraz customizacja przez zmienne CSS i własne renderery sugerują, że to narzędzie celuje w dashboardy i narzędzia analityczne, a nie w prosty wykres kołowy na landing page.

**Key takeaways:**
- Rdzeń biblioteki nie zależy od D3 ani InternMap i waży około 8 KiB po gzipie.
- API oparte na znacznikach i kanałach, wzorowane na Observable Plot, ggplot2 i Vega-Lite, zamiast gotowych komponentów typu LineChart.
- Wsparcie dla SVG i Canvas oraz współdzielonych układów współrzędnych między wieloma wykresami.
- Integracja z Reactem to osobna, tree-shakable warstwa, dodająca około 16 KiB.

**Why do I care:** Jako ktoś, kto regularnie odrzuca propozycje "wrzućmy tu D3, będzie elastyczne" tylko po to, żeby zobaczyć bundle spuchnięty o 200 KiB dla jednego wykresu słupkowego, traktuję to jako sensowną trzecią drogę między recharts, który szybko się kończy, gdy potrzebujesz czegoś nietypowego, a gołym D3, które wymaga tygodnia wdrożenia. Model gramatyki grafiki ma swoją krzywą uczenia, ale w projektach z wieloma powiązanymi wykresami to inwestycja, która się zwraca szybciej niż kolejny wrapper na bibliotekę, której i tak nie kontrolujesz.

**Link:** [TanStack Charts](https://daily.dev/posts/h2X7lJrT7)

## Zabijanie N+1 w NestJS, dzień dziewiąty z trzydziestu

**TLDR:** Kolejny odcinek serii o wydajności backendu w NestJS pokazuje, jak jedno niewinne query na liście zamówień potrafi wygenerować sto jeden zapytań do bazy, i co konkretnie z tym robić.

**Summary:** Przykład z artykułu jest prosty do bólu: endpoint zwraca sto zamówień, a każde z nich osobno dociąga dane klienta, więc z jednego żądania robi się sto jeden zapytań SQL. To klasyczny N+1, ale wciąż jeden z najczęściej odtwarzanych błędów w kodzie, bo ORM-y skutecznie maskują problem. Kod wygląda niewinnie, order.customer w pętli, i nic w składni nie krzyczy "to jest operacja O(n) na bazie danych". Autor rozkłada trzy podejścia do naprawy: joiny w zapytaniu, które ściągają powiązane dane jednym strzałem, świadome ładowanie relacji zamiast domyślnego lazy loading, oraz batchowanie zapytań w stylu SELECT z klauzulą IN, znane każdemu, kto kiedyś pisał własny DataLoader. Żadna z tych technik nie jest odkryciem, ale sposób, w jaki artykuł łączy je z konkretnym stackiem NestJS plus TypeORM, czyni to praktycznym przewodnikiem, a nie kolejnym teoretycznym wykładem o ORM-ach. Najbardziej wartościowa rada nie dotyczy nawet samej naprawy, tylko wykrywania: włącz logowanie faktycznej liczby zapytań i dodaj test integracyjny, który sprawdza, że ta liczba nie rośnie liniowo z rozmiarem danych. Bez tego można naprawić N+1 raz, a potem ktoś doda kolejne pole relacyjne i problem wróci niezauważony.

**Key takeaways:**
- Sto rekordów zwróconych z listy może w praktyce oznaczać sto jeden zapytań SQL, jeśli relacje są ładowane leniwie w pętli.
- Trzy realne rozwiązania: joiny w zapytaniu, świadome ładowanie relacji i batchowanie przez SELECT z IN.
- Eager loading w relacjach jeden-do-wielu trzeba stosować ostrożnie, bo mnoży wiersze i psuje paginację.
- Testy integracyjne liczące zapytania są skuteczniejszym zabezpieczeniem niż jednorazowa naprawa.

**Why do I care:** N+1 to jeden z tych bugów, które nigdy nie giną, bo są niewidoczne na małym zbiorze testowym i eksplodują dopiero na produkcji, gdy klient ma tysiąc zamówień. Widziałem to w projektach z Prismą, TypeORM i Hibernate, więc problem jest niezależny od technologii, jest strukturalny wobec sposobu myślenia o relacjach jako o zwykłych polach obiektu. Rada o testach sprawdzających liczbę zapytań powinna być standardem w każdym zespole backendowym, a nie ciekawostką z bloga.

**Link:** [Day 9/30 — Kill the N+1 Query](https://daily.dev/posts/FFCsnZgIb)

## Agentowy waterfall, czyli jak multi-agentowe AI odtworzyło najgorsze wzorce z lat dziewięćdziesiątych

**TLDR:** Artykuł krytykuje popularny wzorzec sztywnych, sekwencyjnych workflow w systemach multi-agentowych AI i proponuje architekturę zdarzeniową, gdzie agenci działają współbieżnie i synchronizują się tylko wtedy, gdy to naprawdę potrzebne.

**Summary:** Teza jest prowokacyjna, ale trudno się z nią nie zgodzić po przeczytaniu kilku wdrożeń agentowych w praktyce: większość frameworków do orkiestracji agentów AI odtwarza model waterfall, który branża oprogramowania odrzuciła dwie dekady temu na rzecz Agile. Agenci są zamknięci w z góry ustalonych zależnościach i przekazaniach zadań, a nawet gałęzie, które teoretycznie mogłyby działać równolegle, blokują się w punktach synchronizacji. Efekt jest taki, że system z wieloma agentami, który miał być szybszy niż jeden duży model, w praktyce spędza większość czasu na czekaniu. Propozycja autorów idzie w stronę modelu znanego z systemów operacyjnych, gdzie agenci są niezależnymi procesami reagującymi na zdarzenia, a nie węzłami w grafie przepływu pracy. Zamiast centralnego schedulera, który trzyma w pamięci stan każdego workflow i koordynuje retry, kompensację i observability, mamy zdecentralizowaną koordynację przez zdarzenia. Autorzy budują pod tę ideę runtime o nazwie Mozaik, napisany w TypeScript, i sami przyznają najtrudniejszy punkt całego podejścia: równoległość wygląda świetnie na diagramie, dopóki agenci nie muszą scalić swojej pracy, bo tam właśnie ucieka cała złożoność, którą wcześniej chowaliśmy w sztywnym porządku wykonania.

**Key takeaways:**
- Wiele frameworków agentowych odtwarza sekwencyjny model waterfall nawet w miejscach, gdzie równoległość byłaby możliwa.
- Centralny scheduler trzymający stan każdego workflow w pamięci skaluje się dobrze do około stu przepływów, a przy tysiącu się załamuje.
- Proponowana architektura traktuje agentów jak niezależne procesy reagujące na zdarzenia, zamiast węzłów w z góry zdefiniowanym grafie.
- Największym realnym wyzwaniem współbieżnych agentów nie jest samo równoległe wykonanie, a scalanie ich wyników w punktach synchronizacji.

**Why do I care:** Ten tekst nazywa problem, który czułem intuicyjnie przy każdym wdrożeniu multi-agentowego pipeline'u, ale nie miałem dla niego dobrej etykiety: budujemy nowe technologie na starych, źle przemyślanych wzorcach organizacyjnych, tylko przeniesionych z ludzi na kod. Sceptycznie podchodzę do kolejnego frameworka obiecującego rozwiązanie koordynacji przez zdarzenia, bo to jest dokładnie ten sam problem, który mieliśmy przy przechodzeniu z monolitów na mikroserwisy, tylko teraz z agentami LLM w roli serwisów. Kto już parzył się na event sourcingu i eventual consistency, wie, że "synchronizacja tylko gdy potrzebna" to piękne zdanie na slajdzie i bardzo trudna rzecz w produkcyjnym kodzie.

**Link:** [Concurrent AI Agents: The Antidote to the Agentic Waterfall Anti-Pattern](https://daily.dev/posts/jozoSaDzj)

## useActionState w React 19, czyli koniec ręcznego składania formularzy

**TLDR:** Dogłębny przewodnik po useActionState pokazuje, jak hook zastępuje ręcznie pisane state'y dla submitowania, ładowania i błędów formularza, oraz jakie błędy produkcyjne najczęściej z nim popełniamy.

**Summary:** Autor zaczyna od uczciwego pytania: dlaczego niby forma z jednym polem email zawsze potrzebowała trzech osobnych zmiennych stanu, error, isSubmitting i wyniku, plus try/catch/finally, które ktoś prędzej czy później zapomni domknąć. useActionState wiąże funkcję akcji bezpośrednio z atrybutem action formularza albo formAction przycisku i oddaje z powrotem stan, flagę isPending oraz opakowaną akcję, wszystko zsynchronizowane w jednej transition. Działa z każdą funkcją, nie tylko z Server Actions, więc jest przydatny nawet w czysto klienckiej aplikacji React bez żadnego frameworka. Najciekawszy fragment tekstu opisuje najczęstszy błąd produkcyjny: programiści migrujący ze starego wzorca onSubmit zachowują odruch blokowania przycisku przez własny lokalny stan, zamiast ufać isPending, a to lokalny stan może się rozsynchronizować z rzeczywistym czasem trwania żądania, zwłaszcza na słabym połączeniu. React kolejkuje wywołania dispatch, więc kilka szybkich kliknięć nie powoduje wyścigu do bazy danych, ale każde kliknięcie w kolejce nadal się wykonuje po kolei, co oznacza, że użytkownik klikający "dodaj do koszyka" pięć razy dostanie pięć dodanych pozycji, tylko w kolejności, nie naraz. Osobny akapit poświęcony jest brakowi wbudowanej funkcji resetu, co zaskakuje przy pierwszym kontakcie z hookiem i wymaga albo obsłużenia sygnału resetu w samej funkcji akcji, albo zmiany propsa key, żeby wymusić remount komponentu.

**Key takeaways:**
- useActionState zastępuje ręcznie pisane state'y submitowania, ładowania i błędu jedną synchronizowaną transition.
- Blokowanie przycisku przez własny lokalny stan zamiast isPending nie chroni realnie przed wielokrotnym submitem na słabym połączeniu.
- Podpis funkcji akcji to zawsze (previousState, formData), pomylenie kolejności argumentów to częsty błąd po migracji z onSubmit.
- Hook nie ma wbudowanego resetu stanu, trzeba go obsłużyć samodzielnie przez sygnał w akcji albo zmianę propsa key.
- Nie nadaje się do fetchowania danych przy montowaniu, pollingu ani do wielostopniowych, w pełni kontrolowanych formularzy typu wizard.

**Why do I care:** Trzy zmienne stanu na formularz to był mój codzienny boilerplate od lat, więc widzę w useActionState realne zmniejszenie liczby miejsc, w których można popełnić literówkę w finally. Ostrzeżenie o lokalnym flagowaniu pending zamiast isPending trafia bardzo konkretnie, bo to właśnie ten rodzaj buga, który przechodzi code review bez komentarza, a wychodzi tylko na słabym 3G u jednego klienta i kończy się zgłoszeniem "system dodał mi produkt trzy razy". Brak wbudowanego resetu jest moim jedynym prawdziwym zarzutem do tego API, bo to akurat coś, co React mógł rozwiązać za nas, a zostawił jako domowe zadanie.

**Link:** [React 19 useActionState Explained](https://daily.dev/posts/2QpJzq3rq)

## Optymistyczne aktualizacje w Next.js 16, czyli lista błędów, które i tak popełnisz

**TLDR:** Praktyczny rozbiór wdrażania useOptimistic w Next.js 16 na przykładzie checkboxa listy zadań, z konkretnymi błędami: wywołaniem poza transition, wyścigiem przy szybkich kliknięciach i niepotrzebnym ręcznym rollbackiem.

**Summary:** Punktem wyjścia jest scena, którą każdy frontendowiec rozpoznaje z testów na wolnym połączeniu: kliknięcie checkboxa, pół sekundy ciszy, drugie kliknięcie z frustracji, i finalnie migający stan, gdy oba żądania wracają naraz. Spinner nie rozwiązuje tego problemu, tylko go narratuje, więc autor sięga po useOptimistic, żeby zmienić UI natychmiast po kliknięciu i wycofać zmianę tylko, jeśli żądanie faktycznie się nie powiedzie. Pierwsza wersja kodu w artykule od razu łapie typowy błąd: wywołanie funkcji ustawiającej stan optymistyczny poza startTransition daje ostrzeżenie w konsoli i, co ważniejsze, zrywa gwarancję, na której opiera się automatyczny rollback. Drugi błąd to szybkie klikanie, pięć kliknięć przed odpowiedzią serwera odpala pięć równoległych żądań ścigających się do bazy, a UI przez cały czas wygląda spokojnie, co jest najgorszym możliwym sygnałem awarii. Rozwiązaniem nie jest nic specyficznego dla useOptimistic, tylko śledzenie, który konkretny wiersz ma żądanie w toku, i blokowanie go per wiersz, nie globalnie dla całej listy. Najbardziej pouczający fragment dotyczy jednak trzeciego, subtelnego błędu: prawie każdy tutorial w internecie uczy ręcznego rollbacku przez ponowne wywołanie funkcji ustawiającej stan w bloku catch, mimo że stan optymistyczny sam wraca do wartości bazowej, gdy transition się rozstrzygnie, o ile bazowy stan faktycznie nie zmienił się w międzyczasie. Ręczny rollback jest więc potrzebny tylko wtedy, gdy reducer zależy od czegoś, czego nie da się odtworzyć z samego stanu bazowego, na przykład tymczasowego identyfikatora nowo dodanego komentarza. Artykuł zamyka porządna tabela porównująca revalidatePath, revalidateTag i updateTag, bo wybór między nimi to pytanie o to, kto ma zobaczyć zmianę i jak szybko, nie o przyzwyczajenie z poprzedniego projektu.

**Key takeaways:**
- Funkcję ustawiającą stan z useOptimistic trzeba wywoływać wewnątrz startTransition, inaczej znika gwarancja stojąca za automatycznym rollbackiem.
- Blokada kontrolki musi być per element listy, a nie globalna, inaczej szybkie kliknięcia wywołują nakładające się żądania.
- Ręczny rollback w bloku catch jest zwykle niepotrzebny, bo stan optymistyczny sam wraca do bazowego po rozstrzygnięciu transition.
- updateTag daje natychmiastowe read-your-own-writes na aktualnej stronie, revalidateTag odświeża wszystkie miejsca z danym tagiem w tle, revalidatePath jest wyjściem, gdy tagi nie są jeszcze wdrożone.
- Od Next.js 16.2 error boundary powinien sięgać po unstable_retry, nie po reset, jeśli błąd wynikał z nieudanego fetchowania danych.

**Why do I care:** Ta lista błędów jest właściwie inwentarzem wszystkiego, co widziałem w code review przy pierwszym wdrożeniu optymistycznych aktualizacji w zespole, łącznie z tym samym ostrzeżeniem w konsoli, które ktoś ignorował, bo "działa". Najbardziej cenię fragment o niepotrzebnym ręcznym rollbacku, bo pokazuje coś szerszego niż sam hook: warto zrozumieć mechanizm, zanim zacznie się go obchodzić własnym kodem, bo połowa "poprawek" na produkcji to walka z zabezpieczeniem, które framework już miał wbudowane. Tabela revalidatePath kontra revalidateTag kontra updateTag powinna wisieć nad biurkiem każdego, kto pisze Server Actions w Next.js 16, bo pomylenie tych trzech to gwarancja, że ktoś zobaczy stare dane po własnej mutacji.

**Link:** [I Added Optimistic Updates to a Next.js 16 App. Here's Every Rollback Bug I Hit.](https://daily.dev/posts/6znvsSxyA)
