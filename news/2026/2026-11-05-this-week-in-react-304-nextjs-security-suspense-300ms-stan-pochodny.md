---
title: "This Week In React #304: poprawki bezpieczeństwa Next.js, ukryte 300 ms w Suspense i stan pochodny, który można nadpisać"
excerpt: "Listopadowe łatki Next.js, dlaczego React.lazy z Suspense opóźnia start o 300 ms oraz prosty wzorzec zamiast synchronizowania stanu efektem."
publishedAt: "2026-11-05"
slug: "this-week-in-react-304-nextjs-security-suspense-300ms-stan-pochodny"
hashtags: "#thisweekinreact #react #reactnative #nextjs #security #performance #suspense #react-query #generated #pl"
source_pattern: "This Week In React"
---

## Listopadowe wydanie bezpieczeństwa Next.js

**TLDR:** Next.js 16.4.5 i 15.5.29 łatają siedem luk, w tym wyciek danych między tenantami w Cache Components. Jeśli używasz use cache, aktualizuj od razu.

**Summary:** Najpoważniejsza podatność dotyczy aplikacji z włączonymi Cache Components. Gdy ta sama publiczna funkcja use cache, która czyta parametr korzenia, na przykład identyfikator tenanta, jest wywołana bezpośrednio i z wnętrza unstable_cache, a równolegle trwa zimne wypełnianie cache, jedno żądanie może dostać wynik drugiego. Ten wynik zostaje zapisany i serwowany kolejnym wywołaniom z tymi samymi argumentami.

Średnią wagę mają jeszcze cztery problemy z cache. Zagnieżdżone funkcje use cache mogą zapisać zewnętrzny wpis, zanim wewnętrzna funkcja zarejestruje zależność od parametru korzenia. Różne argumenty binarne mogą dać tę samą tożsamość cache. Przy samodzielnym hostingu z next start spreparowany adres URL może zatruć wspólną powłokę strony. Dochodzą do tego rozjazd nagłówków przy skompresowanej odpowiedzi za proxy HTTP/1.1 z pipeliningiem oraz wyciek ciasteczek HttpOnly w trasach Edge przez nagłówek x-middleware-set-cookie, czytelny dla JavaScriptu z tej samej domeny. Ostatnia luka pozwala obejść wyłączenie SVG w optymalizacji obrazów, bo plik bywa uznany za AVIF.

Autorzy sami zaznaczają zakresy. Wyciek ciasteczek wymaga złośliwego JavaScriptu w tej samej domenie, a błąd z kompresją wymaga konkretnego zachowania proxy. Mimo to wzorzec jest jasny, a niedoświadczeni często zakładają, że cache w frameworku z definicji jest bezpieczny.

**Key takeaways:**
- Zaktualizuj do 16.4.5 lub 15.5.29.
- Najgroźniejszy scenariusz to multitenancy z parametrem korzenia w funkcji z use cache.
- Trasy Edge z NextResponse.cookies.set() mogą ujawnić wartości HttpOnly.
- Node.js Route Handlers i cookies().set() nie były dotknięte wyciekiem ciasteczek.

**Why do I care:** Jeśli w projekcie masz wielu klientów na wspólnej instancji, ta lista to praktyczny przegląd kodu na dzień. Warto też napisać test, który równolegle odpytuje cache z dwóch tenantów. Poprawka framework'a nie naprawi Twojego sposobu użycia, jeśli on sam jest ryzykowny.

**Link:** [November 2026 Security Release](https://nextjs.org/blog/november-2026-security-release)

## React.lazy, Suspense i ukryte 300 ms opóźnienia startu

**TLDR:** Zespół rozszerzenia Tab Widgets odkrył, że komponent lazy zawsze zawiesza się raz, a React wstrzymuje ujawnienie zawieszonej treści na 300 ms. Wyrenderowanie własnego placeholdera zamiast zawieszania skróciło pojawienie się pierwszej treści o około 240 ms.

**Summary:** Rozszerzenie otwiera się od zera przy każdej nowej karcie, więc każde opóźnienie widać. Każdy widget jest osobnym chunkiem ładowanym przez React.lazy, w osobnej granicy Suspense. Zespół najpierw zmniejszał bundle, usunął z niego około 100 KB modali, ale to nie zmieniło momentu pojawienia się czegokolwiek. Profil w headless Chromium pokazał, że kod był gotowy po około 100 ms, a widgety pojawiały się po około 380 ms.

Przyczyny są dwie. Komponent lazy wywołuje import dopiero przy pierwszym renderze i dostaje promise, który zawsze rozwiązuje się później, więc pierwszy render zawsze pokazuje fallback. Do tego React ujawnia zawieszoną treść najwyżej raz na 300 ms, liczone od ostatniego ujawnienia gdziekolwiek na stronie. To celowa heurystyka przeciw migotaniu. W aplikacji ładowanej z lokalnego dysku, gdzie treść jest gotowa od razu, staje się największym opóźnieniem. Owinięcie w startTransition nie pomaga, bo granica montowana po raz pierwszy i tak pokazuje fallback.

Pierwsza próba polegała na wcześniejszym uruchomieniu importu przez prywatne pola _init i _payload oraz na czekaniu do 100 ms przed renderem. To zadziałało w testach, ale ma słabość. Widget wolniejszy niż limit i tak się zawiesza, a jego fallback pojawia się później, więc okno 300 ms też zaczyna się później. Rozwiązanie, które zostało, w ogóle nie zawiesza. Hook sprawdza, czy kod jest załadowany, a jeśli nie, renderuje zwykły placeholder jako zwykłą treść i uruchamia ładowanie. Po jego zakończeniu aktualizacja stanu podmienia widget.

Wyniki w Chrome na Windowsie, średnia z czterech uruchomień na dashboardzie z 20 widgetami, to pierwsza treść widgetu po 298 ms zamiast 540 ms oraz 85% treści po 336 ms zamiast 540 ms. Pełne załadowanie nie przyspieszyło, bo Weather i Word of the Day zawieszają się drugi raz na pobieraniu danych. Autorzy przyznają też, że to rozwiązanie rezygnuje z grupowania pojawiania się widgetów, które throttling miał dawać, i że opiera się na prywatnych polach Reacta, schowanych w jednym pliku z testem. Podają też wariant bez prywatnych pól, z własnym cache załadowanych komponentów.

**Key takeaways:**
- Lazy zawsze zawiesza się przy pierwszym renderze, nawet jeśli kod już jest.
- React ujawnia zawieszoną treść z opóźnieniem do 300 ms, to nie jest konfigurowalne.
- Mniejszy bundle nie pomógł, pomógł brak zawieszania.
- Rozwiązanie korzysta z prywatnych pól Reacta, więc trzeba je pilnować testem.

**Why do I care:** Większość aplikacji ładuje kod przez sieć, więc rozmiar bundle'a ma tam większe znaczenie niż w rozszerzeniu. Mimo to lekcja jest ogólna. Zanim zaczniesz odchudzać pliki, zmierz, kiedy coś pojawia się na ekranie, i poszukaj bezczynnego czasu na głównym wątku. Przy okazji zobaczysz, jak bardzo domyślne zachowanie frameworka potrafi być jedyną przyczyną.

**Link:** [React.lazy, Suspense and the Hidden 300 ms Startup Delay](https://tabwidgets.com/blog/react-lazy-suspense-delay)

## Writable derived state, czyli przestań synchronizować stan

**TLDR:** Zamiast kopiować dane z serwera do stanu lokalnego przez useEffect, trzymaj tylko nadpisanie użytkownika i używaj danych serwera, gdy go brak. Znika efekt i błąd, w którym odświeżenie kasuje edycje.

**Summary:** Typowy scenariusz to wartość domyślna z serwera, którą użytkownik może zmienić. Popularna implementacja ma dwa stany, jeden dla odpowiedzi serwera i drugi dla listy edytowanej przez użytkownika, oraz efekt kopiujący pierwszy do drugiego. Działa, dopóki nie dodasz odświeżania danych po powrocie do karty. Wtedy każde odświeżenie nadpisuje to, co użytkownik już zmienił, bo mówimy wprost, że serwer zawsze wygrywa.

Poprawka to kilka linijek. Zamiast kopii trzymasz stan użytkownika początkowo jako null i obliczasz wartość jako stan użytkownika, a gdy go brak, dane z serwera. Autor opisuje to jako zmianę modelu myślenia z synchronizowania na używanie danych serwera, gdy brakuje danych klienta. Ten sam wzorzec działa z TanStack Query. Po udanym zapisie odświeżasz dane i dopiero wtedy zerujesz stan użytkownika, więc nic nie miga.

Efektem ubocznym jest usunięcie useEffect, co zgadza się z oficjalną zasadą Reacta, że efekt często nie jest potrzebny. Autor nie omawia jednak konfliktów, czyli sytuacji, gdy serwer zmienił dane, a użytkownik ma niezapisane zmiany. Ten przypadek wymaga osobnej decyzji produktowej.

**Key takeaways:**
- Dwa stany z efektem kopiującym to źródło błędów przy odświeżaniu.
- Wartość pochodna z użytkownika lub serwera usuwa efekt.
- Po zapisie zeruj nadpisanie dopiero po udanym odświeżeniu danych.
- Konflikty edycji z nowymi danymi serwera trzeba rozwiązać osobno.

**Why do I care:** Zmieniłbym ten wzorzec w każdym formularzu z domyślnymi wartościami z API, bo to jeden z częstszych źródeł zgłoszeń w stylu "formularz mi się zresetował". Do review kodu dodaj pytanie, czy efekt tylko kopiuje stan do stanu.

**Link:** [Writable Derived State: Stop Synchronizing State](https://playfulprogramming.com/posts/writable-derived-state/)
