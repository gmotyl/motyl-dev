---
title: "Next.js 16.3 udaje SPA, wojna o dark mode toggle i uczciwa lekcja o TanStack Router"
excerpt: "Next.js 16.3 chowa doświadczenie SPA za Cache Components, internet spiera się, czy przełącznik dark mode powinien mieć dwa czy trzy stany, TanStack Router uczy, jak nie duplikować query, a była architektka AWS demaskuje mit pracy entry-level w chmurze."
publishedAt: "2026-08-19"
slug: "nextjs-163-dark-mode-toggle-tanstack-router-cloud-jobs"
hashtags: "#dailydev #frontend #nextjs #react-query #performance #career #generated #pl"
source_pattern: "daily.dev"
---

## Jak Next.js 16.3 sprawia, że aplikacje renderowane na serwerze czują się jak SPA

**TLDR:** Next.js 16.3 rozszerza Cache Components tak, że działają w pełni w przeglądarce, nie tylko na stronach typu dokumentacja czy katalog produktów. W parze z Instant Navigations, Partial Prefetching, retry offline i View Transitions, aplikacja renderowana po stronie serwera zaczyna nawigować jak SPA, bez własnego routera klienckiego.

**Summary:** Dyrektywa `use cache` razem z `cacheTag` i `updateTag` przejmuje w Next.js 16.3 sporą część roboty, którą wcześniej robiła konfiguracja stale-time w SWR czy React Query. To nie jest kosmetyczna zmiana, tylko realne przesunięcie odpowiedzialności z biblioteki klienckiej do frameworka, bo cache'owanie i unieważnianie danych dzieje się teraz na tym samym poziomie co routing i renderowanie.

To nie oznacza, że SWR albo React Query stają się zbędne. Aplikacja demo Flow, którą Vercel pokazuje przy okazji tej wersji, dalej używa obu bibliotek tam, gdzie potrzeba prawdziwego fetchowania po stronie klienta, na przykład przy danych, które zmieniają się w reakcji na akcję użytkownika bez przeładowania trasy. Cache Components rozwiązują inny problem: unikanie zbędnych ponownych zapytań tam, gdzie dane i tak pochodzą z serwera.

Drugi filar tej wersji to pakiet funkcji odpowiadających za wrażenie płynności. Instant Navigations i Partial Prefetching przyspieszają subiektywne odczucie przejścia między stronami, retry offline łapie nieudane żądania przy słabym połączeniu, a View Transitions z Reacta dodają wizualny polish, który wcześniej wymagał osobnej biblioteki routera po stronie klienta. Wszystko to bez rezygnacji z domyślnego renderowania po stronie serwera.

**Key takeaways:**
- Cache Components w wersji 16.3 działają w pełni w przeglądarce, nie tylko na stronach statycznych
- `use cache` plus `cacheTag` i `updateTag` przejmują część roboty, którą wcześniej robiło stale-time w SWR/React Query
- SWR i React Query zostają potrzebne tam, gdzie chodzi o prawdziwe fetchowanie po stronie klienta
- Instant Navigations, Partial Prefetching, retry offline i View Transitions razem dają wrażenie SPA bez klienckiego routera

**Why do I care:** Od dwóch lat słyszę pytanie "czy w Next.js dalej potrzebujemy React Query", i do tej pory odpowiedź brzmiała "tak, bo caching frameworka jest zbyt prosty na realne przypadki". Ta wersja pierwszy raz przesuwa tę granicę na tyle, że warto usiąść i policzyć, ile z konfiguracji stale-time w naszym projekcie da się po prostu wyciąć. Nie usunąłbym całej biblioteki na starcie, ale przy nowym projekcie zacząłbym od wbudowanego cache'owania i dokładał React Query dopiero tam, gdzie faktycznie brakuje.

**Link:** [How Next.js 16.3 Makes Server-Rendered Apps Feel Like SPAs](https://daily.dev/posts/4drQNsROd)

## Wojna o przełącznik dark mode, której nikt się nie spodziewał: dwa stany czy trzy

**TLDR:** Nie ma zgody w sprawie tego, czy przełącznik trybu ciemnego powinien mieć dwa stany, czy trzy jawne opcje z systemowym w środku. Dwustanowy toggle, który po cichu mapuje się na ustawienie systemowe, potrafi w praktyce kłamać na temat tego, co właściwie robi.

**Summary:** Pierwsza szkoła mówi: dwa stany wystarczą. Przy pierwszej wizycie strona bierze preferencję systemową, a każda decyzja użytkownika trafia potem do localStorage jako nadpisanie. Trzecia opcja "system" tylko dokłada obciążenie poznawcze bez realnej korzyści, bo i tak w praktyce ludzie wybierają jasny albo ciemny i o tym zapominają.

Druga szkoła wskazuje na konkretną wadę tego podejścia. Jeśli przełącznik dwustanowy w rzeczywistości mapuje jedną z wartości z powrotem na "system", to potrafi po cichu nadpisać świadomy wybór użytkownika. Ktoś przełącza na ciemny wieczorem, a rano system automatycznie przechodzi na jasny, więc przełącznik zaczyna podążać za systemem zamiast honorować decyzję, którą użytkownik podjął świadomie. To nie jest tylko brzydkie zachowanie, to przełącznik, który kłamie na temat własnego stanu.

Ciekawe w tej dyskusji jest to, że obie strony mają rację w innym kontekście. Jeśli aplikacja nigdy nie synchronizuje się z systemem po pierwszym wyborze, dwa stany są uczciwe. Problem pojawia się dopiero wtedy, gdy ktoś chce mieć zarówno "podążaj za systemem" jak i "twardo ustaw kolor", bo wtedy potrzeba trzeciej, jawnej opcji, żeby interfejs nie kłamał o tym, co robi.

**Key takeaways:**
- Dwustanowy toggle jest uczciwy, dopóki nie synchronizuje się po cichu z ustawieniem systemowym
- Trójstanowy toggle jest potrzebny tam, gdzie ma sens zarówno "podążaj za systemem", jak i twardy wybór
- Cichy powrót do stanu systemowego po dokonaniu świadomego wyboru to realny błąd UX, nie kosmetyka
- Wybór między dwoma a trzema stanami zależy od tego, czy aplikacja w ogóle resynchronizuje się z systemem

**Why do I care:** Budowałem kiedyś dwustanowy przełącznik motywu, który "dla uproszczenia" ignorował zmiany systemowe po pierwszym wyborze, i dostałem zgłoszenie od użytkownika, który był przekonany, że appka ma buga, bo w nocy robiła się ciemna sama z siebie. Okazało się, że to system, nie appka. Od tamtej pory traktuję to pytanie jako część specyfikacji, nie jako detal wizualny, bo błędna odpowiedź generuje realne zgłoszenia do supportu.

**Link:** [The dark mode toggle fight nobody saw coming: two states or three](https://daily.dev/posts/mApjKPwJQ)

## Niezawodny prefetching w TanStack Router

**TLDR:** Route loadery w TanStack Router świetnie nadają się do wczesnego pobierania danych, ale duplikują logikę zapytań używaną w komponentach, a nic nie pilnuje, żeby te dwie kopie się nie rozjechały. Rozwiązaniem jest przeniesienie wspólnych `queryOptions` do Route Context, żeby loader i komponent korzystały z dokładnie tych samych opcji.

**Summary:** Problem zaczyna się od czegoś pozornie niewinnego: ktoś udostępnia link z parametrem wyszukiwania, na przykład `asOf`, a loader trasy prefetchuje dane bez uwzględnienia tego parametru. Komponent później i tak odpala zapytanie z uwzględnieniem `asOf`, tworzy nowy klucz zapytania i zawiesza się ponownie, czekając na drugie fetchowanie. Użytkownik widzi migotanie i niepotrzebny ruch sieciowy, które nie miały prawa się zdarzyć.

Rozwiązanie polega na zdefiniowaniu `queryOptions` raz, wewnątrz funkcji kontekstu trasy, i konsumowaniu ich zarówno przez loader, przez `ensureQueryData`, jak i przez komponent, przez `useRouteContext`, zamiast trzymać dwie osobne definicje zapytania w dwóch miejscach. Dryf znika, bo oba miejsca odczytują z tego samego klucza kontekstu, a kontekst przelicza się tylko wtedy, gdy zmienią się parametry albo `loaderDeps`.

Ciekawy jest argument o wydajności, który od razu nasuwa się przy takim podejściu: czy trzymanie `queryOptions` w Route Context nie generuje dodatkowych renderów, skoro tworzy nowy obiekt przy każdym renderze? Nie generuje, bo funkcja kontekstu odpala się tylko przy zmianie parametrów albo `loaderDeps`, a nie przy każdym renderze komponentu. Zmiana niepowiązanego parametru wyszukiwania, na przykład flagi debugowania, nie wywoła ponownego przeliczenia kontekstu ani zbędnego rerenderu komponentów podpiętych przez `useRouteContext`.

**Key takeaways:**
- Duplikacja `queryOptions` między loaderem a komponentem prowadzi do rozjazdu i błędów typu podwójne fetchowanie po zmianie parametru URL
- Przeniesienie `queryOptions` do funkcji kontekstu trasy eliminuje tę duplikację u źródła
- Loader korzysta z `ensureQueryData`, komponent z `useRouteContext`, oba czytają z tego samego klucza
- Kontekst przelicza się tylko przy zmianie parametrów lub `loaderDeps`, więc podejście nie generuje zbędnych renderów

**Why do I care:** Ten wzorzec rozjazdu między loaderem a komponentem widziałem już w kilku projektach na różnych routerach, nie tylko TanStack, i zawsze wygląda tak samo: ktoś dodaje nowy parametr wyszukiwania miesiąc po tym, jak loader i komponent zostały napisane osobno, i nikt nie pamięta zaktualizować obu miejsc naraz. Reguła "jedno źródło prawdy dla opcji zapytania" powinna być domyślnym wzorcem przy każdym routerze z prefetchingiem po stronie loadera, nie tylko poradą na wypadek buga.

**Link:** [Reliable Query Prefetching with TanStack Router](https://daily.dev/posts/vXcwhwFpD)

## Największe kłamstwo o pracy "entry-level" w chmurze

**TLDR:** Była architektka rozwiązań w AWS twierdzi, że ogłoszenia o pracę na poziomie entry-level w chmurze od dawna wprowadzają w błąd, bo wymagają lat doświadczenia mimo etykiety "dla początkujących". Powołuje się na 30 tysięcy zwolnień w Amazonie i spadek zatrudnienia juniorów w technologii o 73 procent jako dowód, że AI eliminuje rutynowe, dające się skodyfikować zadania w chmurze, a nie całe stanowiska.

**Summary:** Teza jest prosta: większość firm nigdy nie zatrudniała juniorów do realnej pracy juniora. Etykieta "entry-level" opisywała stanowiska skupione na ręcznych zadaniach, jak obsługa ticketów, patchowanie czy przeglądanie logów, nie na strukturalnym budowaniu kompetencji. Tylko garstka dużych firm, w tym sam AWS, faktycznie inwestowała w realne programy szkoleniowe, podczas gdy większość pracodawców oferowała niewiele mentoringu mimo szumnej nazwy stanowiska.

Dane cytowane w materiale są konkretne: zatrudnienie juniorów w technologii spadło o 73 procent, podczas gdy ogólne zatrudnienie w branży spadło tylko o 7 procent. Goldman Sachs szacuje, że AI eliminuje około 25 tysięcy miejsc pracy w USA miesięcznie, tworząc jednocześnie około 9 tysięcy nowych, głównie w rolach związanych z agentami AI. Straty koncentrują się w rutynowych, dających się skodyfikować zadaniach w chmurze, nie w całych kategoriach stanowisk.

Rekomendacja praktyczna brzmi inaczej niż zwykłe "zdobywaj certyfikaty". Autorka radzi budować jeden albo dwa kompletne projekty end-to-end, od pomysłu po wdrożenie, i dokumentować, co poszło nie tak i czego się z tego nauczono, zamiast zbierać kolejne certyfikaty. AI potrafi dziś zdać egzamin certyfikacyjny w kilka sekund, więc wartość sygnalizacyjna samego papierka spada, a kandydaci, którzy potrafią szczegółowo opowiedzieć o prawdziwej architekturze i prawdziwych błędach, wypadają lepiej na rozmowach.

**Key takeaways:**
- Etykieta "entry-level" w chmurze od dawna opisywała ręczne zadania, nie strukturalne budowanie kompetencji juniora
- Zatrudnienie juniorów w technologii spadło o 73 procent wobec 7 procent spadku w całej branży
- AI eliminuje rutynowe zadania w chmurze, tworząc nowe role w obszarze agentów AI w mniejszej skali
- Jeden kompletny projekt end-to-end z udokumentowanymi błędami wypada lepiej niż kolejny certyfikat

**Why do I care:** Regularnie odpowiadam juniorom szukającym pierwszej pracy, i ten materiał trafia w coś, co obserwuję od dłuższego czasu: ogłoszenia "entry-level" w chmurze faktycznie od zawsze były zawoalowanym "potrzebujemy kogoś z dwuletnim doświadczeniem za pensję juniora". Rada o jednym solidnym projekcie zamiast kolejnego certyfikatu jest praktyczna i można ją wdrożyć od zaraz, ale warto dodać zastrzeżenie, że dane o eliminacji miejsc pracy pochodzą z szacunków Goldman Sachs, nie z twardego audytu, więc traktowałbym konkretne liczby jako orientacyjne, a sam kierunek zmiany jako wiarygodny.

**Link:** [The Biggest Lie About "Entry-Level" Cloud Jobs](https://daily.dev/posts/AmDYFYzy6)
