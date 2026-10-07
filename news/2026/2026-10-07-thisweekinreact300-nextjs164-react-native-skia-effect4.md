---
title: "This Week In React #300: Next.js 16.4 dojrzewa, Shopify i Coinbase porzucają React Native, Effect 4.0 traci zależności"
excerpt: "Jubileuszowy, trzysetny numer This Week In React: Cache Components stają się domyślnym modelem w Next.js 16.4, React Foundation rusza z pierwszym dyrektorem społeczności i szczytem w Londynie, React Native Skia 3.0 przechodzi na backend Graphite mimo że Shopify i Coinbase odchodzą od React Native, a Effect 4.0 chwali się rdzeniem bez żadnych zależności."
publishedAt: "2026-10-07"
slug: "thisweekinreact300-nextjs164-react-native-skia-effect4"
hashtags: "#thisweekinreact #react #reactnative #nextjs #effect #generated #pl"
source_pattern: "This Week In React"
---

## Next.js 16.4: Cache Components stają się domyślnym modelem

**TLDR:** Next.js 16.4 ogłasza Cache Components jako dojrzałą funkcję, rekomendowaną teraz w każdej aplikacji i włączoną domyślnie w `create-next-app`, z zapowiedzią, że stanie się domyślnym modelem programowania w wersji 17. Towarzyszą jej gwarancje statyczności blokujące build przy wycieku dynamicznej treści oraz nowa kontrola prefetchingu.

**Summary:** Cache Components to nowy model programowania Next.jsa, w którym deweloper jawnie oznacza, co powinno być cache'owane, zamiast polegać na domyślnych, trudnych do przewidzenia zachowaniach renderowania. W wersji 16.4 ten model osiąga status rekomendowanego dla każdej aplikacji, jest domyślnie włączony przy tworzeniu nowego projektu komendą `create-next-app`, a Partial Prefetching (częściowe pobieranie danych z wyprzedzeniem) jest już oficjalnie częścią tego modelu, nie osobnym eksperymentem.

Wydanie dokłada też kilka twardszych gwarancji. Nowy `export const ensureStatic` pozwala jawnie zadeklarować, że dana trasa ma być statyczna, i failuje build, jeśli do środka wślizgnie się dynamiczna treść, zamiast cicho degradować wydajność na produkcji. Druga nowość to kontrola nad prefetchingiem przez `await navigation()`, pozwalająca wykluczyć konkretną treść z prefetchowania. Do tego dochodzą usprawnienia związane z agentowym upgrade'em projektów (agent-guided upgrades), React 19.3 ze stabilnymi View Transitions, Fragment Refs i API `browser()`, oraz szereg usprawnień w Turbopacku, rozmiarze bundli i React Compilerze.

**Key takeaways:**
- Cache Components są teraz rekomendowane dla każdej aplikacji Next.js i mają stać się domyślne w wersji 17
- `export const ensureStatic` failuje build, jeśli dynamiczna treść wycieknie do trasy deklarowanej jako statyczna
- `await navigation()` pozwala wykluczyć konkretną treść z prefetchingu
- React 19.3 wnosi stabilne View Transitions, Fragment Refs i API `browser()`

**Why do I care:** Jeśli twój zespół wciąż odkłada migrację na Cache Components, bo czekał na sygnał dojrzałości, to jest właśnie ten moment, skoro model staje się domyślny już w kolejnej wersji głównej. Warto zaplanować migrację teraz, zamiast robić ją pod presją po wydaniu Next.js 17, kiedy stary model przestanie być oczywistym wyborem.

**Link:** [Next.js 16.4](https://nextjs.org/blog/next-16-4)

## React Foundation rusza z realną aktywnością: dyrektor społeczności i szczyt w Londynie

**TLDR:** Po cichym okresie od uruchomienia strony w czerwcu, React Foundation ogłasza Barbarę Markiewicz (wcześniej w Callstack) jako dyrektorkę społeczności oraz dwa wydarzenia: Contributors Summit 10-12 listopada w biurze Mety w Londynie i pierwszą oficjalnie organizowaną przez fundację konferencję, React Conf Ghana, 4-5 listopada w Akrze.

**Summary:** React Foundation istniała dotąd głównie jako strona internetowa bez wyraźnych oznak aktywności, co autorzy newslettera odnotowywali z pewnym sceptycyzmem w poprzednich numerach. Dołączenie Barbary Markiewicz, wcześniej organizującej wydarzenia takie jak React Conf i React Universe Conf w Callstack, na stanowisko dyrektorki społeczności, jest pierwszym konkretnym sygnałem, że fundacja zaczyna budować realną infrastrukturę organizacyjną, a nie tylko istnieć formalnie.

Contributors Summit w listopadzie w biurze Mety przy King's Cross w Londynie jest wydarzeniem typu invite-only, ale kontrybutorzy ekosystemu mogą zgłosić się samodzielnie. React Conf Ghana w Akrze to, zgodnie z wiedzą autorów newslettera, pierwsza konferencja oficjalnie organizowana bezpośrednio przez React Foundation, co czyni ją ważnym testem tego, jak fundacja planuje angażować się w wydarzenia społecznościowe poza USA i Europą.

**Key takeaways:**
- Barbara Markiewicz, wcześniej w Callstack, dołącza do React Foundation jako dyrektorka społeczności
- Contributors Summit odbędzie się 10-12 listopada w biurze Mety w Londynie, invite-only z możliwością samodzielnego zgłoszenia
- React Conf Ghana w Akrze (4-5 listopada) to pierwsza konferencja organizowana bezpośrednio przez fundację

**Why do I care:** Dla osób zaangażowanych w ekosystem Reacta to sygnał, że warto zacząć traktować React Foundation jako realny, aktywny byt organizacyjny, a nie symboliczny szyld, co może mieć znaczenie przy planowaniu własnego zaangażowania w konferencje, RFC czy kontrybucje do samego Reacta.

**Link:** [React Foundation Contributors Summit](https://www.react.foundation/summit)

## React Native Skia 3.0 i exodus wielkich firm: Shopify i Coinbase odchodzą od React Native

**TLDR:** React Native Skia 3.0 przechodzi na nowy backend Graphite, naprawiając problemy ze stabilnością starego podejścia opartego na OpenGL i umożliwiając współdzielenie instancji WebGPU z resztą ekosystemu webowego. Jednocześnie Coinbase dołącza do Shopify w ogłoszeniu migracji aplikacji z React Native na natywne stosy, mimo że Shopify deklaruje dalsze sponsorowanie projektu Skia do końca roku.

**Summary:** Wersja 3.0 React Native Skia, największe wydanie w historii projektu według jego twórcy Williama Candillona, przebudowuje bibliotekę na Skia Graphite, nowy backend zaprojektowany pod nowoczesne API GPU. Stary, oparty na OpenGL-u design miał problemy ze stabilnością i wydajnością, a dzięki symetrii architektonicznej z WebGPU, React Native Skia i React Native WebGPU mogą teraz współdzielić tę samą instancję WebGPU na tym samym GPU. Nowości obejmują domyślne multi-threading (rysunek Skia może powstać na dowolnym dedykowanym wątku, tylko prezentacja wyniku działa na wątku UI), zero-copy interoperacyjność z Three.js, import wideo i obrazu z kamery bezpośrednio do Skia bez kopiowania danych (co oszczędza baterię), oraz eksperymentalne wsparcie dla widoku Canvas na Androidzie (API 29+).

Ta techniczna dojrzałość zbiega się z niepokojącym trendem biznesowym dla samego React Native. Tydzień po ogłoszeniu Shopify o odchodzeniu od platformy, Coinbase ogłasza to samo, migrując w stronę dwóch osobnych natywnych aplikacji. Autorzy newslettera zauważają, że to może być trend wart obserwowania, bo kilku deweloperów już zgłasza, że utrzymywanie dwóch natywnych aplikacji synchronicznie staje się dziś łatwiejsze niż kiedyś, prawdopodobnie dzięki agentom kodującym radzącym sobie coraz lepiej z natywnym Swift czy Kotlin. Osobny artykuł z Pragmatic Engineer analizuje dokładniej, dlaczego decyzja Shopify zapadła mimo wcześniejszej migracji do New Architecture, która miała rozwiązać właśnie tego typu problemy.

Mimo tego exodusu, Shopify deklaruje dalsze sponsorowanie Skia do końca roku, co autorzy newslettera komentują z lekkim zdziwieniem: firma inwestuje w infrastrukturę platformy, z której jednocześnie odchodzi.

**Key takeaways:**
- React Native Skia 3.0 przechodzi na backend Graphite, dzieląc instancję WebGPU z resztą ekosystemu webowego
- Nowy backend przynosi domyślne multi-threading, zero-copy interoperacyjność z Three.js oraz import wideo i kamery bez kopiowania danych
- Coinbase dołącza do Shopify w migracji z React Native na natywne stosy, mimo wcześniejszej migracji Shopify do New Architecture
- Shopify deklaruje dalsze sponsorowanie Skia do końca roku mimo odchodzenia od samego React Native

**Why do I care:** Dla zespołów mobilnych na React Native to sygnał, żeby obserwować ten trend uważnie, zamiast go ignorować jako pojedynczy przypadek: jeśli dwie duże, technicznie dojrzałe firmy niezależnie dochodzą do tego samego wniosku, warto zrozumieć konkretne przyczyny (opisane w analizie Pragmatic Engineer), zanim podejmie się decyzję o własnej architekturze mobilnej na kolejne lata.

**Link:** [React Native Skia 3.0 - Hello Graphite](https://www.youtube.com/watch?v=L-PNQi1nBSA)

## Effect 4.0: przebudowany, zależny tylko od samego siebie rdzeń

**TLDR:** Effect 4.0 to pełna przebudowa biblioteki z zerowymi zależnościami zewnętrznymi w rdzeniu, oferująca bundle nawet pięciokrotnie mniejsze niż wcześniej, co czyni ją bardziej atrakcyjną także dla kodu działającego po stronie klienta. Towarzyszą jej oficjalne bindingi Effect Atom React do zarządzania stanem.

**Summary:** Effect zyskuje rozpęd jako sposób na uodpornienie kodu TypeScript, dodając dodatkowe gwarancje zarówno dla ludzi, jak i dla agentów AI piszących kod. Wersja 4.0 to długoterminowo wspierana, przebudowana od podstaw wersja biblioteki, z rdzeniem niemającym żadnych zależności zewnętrznych, co w praktyce oznacza bundle nawet pięciokrotnie mniejsze niż w poprzednich wersjach. Ta redukcja rozmiaru czyni Effect realną opcją nie tylko dla backendu, gdzie był dotychczas popularniejszy, ale też dla kodu klienckiego, gdzie rozmiar bundla ma bezpośredni wpływ na wydajność ładowania strony.

Równolegle z główną biblioteką pojawiają się teraz oficjalne bindingi Effect Atom React, łączące model zarządzania stanem Effect z Reactem w sposób wspierany oficjalnie przez zespół, zamiast polegania na rozwiązaniach społecznościowych.

**Key takeaways:**
- Effect 4.0 to pełna przebudowa z zerowymi zależnościami zewnętrznymi w rdzeniu
- Bundle są nawet pięciokrotnie mniejsze niż w poprzednich wersjach
- Mniejszy rozmiar otwiera Effect na zastosowania po stronie klienta, nie tylko backendu
- Oficjalne bindingi Effect Atom React łączą model Effect z zarządzaniem stanem w Reakcie

**Why do I care:** Dla zespołów, które rozważały Effect wcześniej, ale odrzuciły go ze względu na rozmiar bundla w kodzie klienckim, to konkretny powód, żeby przyjrzeć się bibliotece ponownie, szczególnie w kontekście pracy z agentami kodującymi, gdzie dodatkowe gwarancje typów i obsługi błędów realnie zmniejszają liczbę subtelnych bugów wprowadzanych przez wygenerowany kod.

**Link:** [Effect 4.0](https://effect.website/blog/releases/effect/40)
