---
title: "gRPC kontra REST, Example.com, shadcn-admin-kit 2.0, SvelteKit 3 RC i narodziny Software Verification Engineera"
excerpt: "Buf pyta, czy gRPC kontra REST to w ogóle dobre pytanie, example.com świętuje dwie dekady absurdalnych redesignów, a branża zaczyna szukać kogoś, kto zweryfikuje kod pisany przez agentów."
publishedAt: "2026-10-01"
slug: "daily-dev-grpc-rest-connect-example-com-sveltekit-3-verification-engineer"
hashtags: "#dailydev #backend #architecture #grpc #rest-api #css #svelte #sveltekit #frontend #ai #testing #generated #pl"
source_pattern: "daily.dev"
---

## gRPC kontra REST to złe pytanie

**TLDR:** Buf przekonuje, że spór gRPC kontra REST jest źle postawiony, bo ich protokół Connect pozwala jednemu serwerowi mówić jednocześnie gRPC, gRPC-Web i zwykłym HTTP z JSON-em. Standardowego gRPC nie da się wywołać wprost z przeglądarki, bo opiera się na trailerach HTTP/2, a oficjalny projekt grpc-web od dawna stoi w miejscu i sam rekomenduje przejście na bramki typu gRPC-Gateway.

**Streszczenie:** Problem brzmi znajomo każdemu, kto kiedyś próbował wywołać gRPC z poziomu fetch: przeglądarkowe API JavaScriptu nie dają dostępu do trailerów HTTP/2, które gRPC używa do przenoszenia statusu odpowiedzi. Stąd cała gałąź rozwiązań zastępczych: gRPC-Web wymaga proxy, gRPC-Gateway tłumaczy JSON na gRPC po stronie backendu, a żadne z nich nie przechodzi prostego testu curl. Connect idzie inną drogą. Jeden handler na serwerze dekoduje, który protokół właśnie przyszedł, i obsługuje go bez dodatkowej warstwy pośredniej. Przeglądarka może wysłać zwykły JSON albo binarny Protobuf na ten sam adres URL, którego używa klient gRPC, a wywołania unary mogą nawet jechać przez GET, co od razu daje darmowe cache'owanie HTTP.

Ciekawe jest to, co Connect zachowuje z gRPC: typowane klienty generowane z definicji, strumieniowanie po stronie serwera działające wprost w przeglądarce (strumieniowanie dwukierunkowe zostaje po stronie backendu) oraz wykrywanie breaking changes przez `buf breaking`. To nie jest kompromis okrojony z funkcji, tylko próba zebrania tego, co dobre w obu światach, bez konieczności trzymania osobnej bramki tylko po to, żeby frontend mógł pogadać z backendem.

**Kluczowe wnioski:**
- Standardowy gRPC jest niewywoływalny wprost z przeglądarki z powodu zależności od trailerów HTTP/2.
- Oficjalny grpc-web nie rozwija się dalej i sam poleca migrację do bramek takich jak gRPC-Gateway.
- Connect obsługuje gRPC, gRPC-Web i zwykły HTTP JSON z jednego serwera, bez osobnego proxy.
- Wywołania unary mogą iść przez GET, więc zyskują normalne cache'owanie HTTP.

**Dlaczego mi na tym zależy:** Jeśli projektujesz architekturę, w której frontend i mobile mają gadać z tymi samymi usługami backendowymi co inne serwisy wewnętrzne, Connect realnie zdejmuje z ciebie decyzję „REST na zewnątrz, gRPC w środku plus warstwa tłumacząca”. Mniej ruchomych części to mniej miejsc, w których coś się psuje w nocy.

**Link:** [gRPC vs REST Is the Wrong Question](https://daily.dev/posts/xe2qEHlXz)

## Example.com właśnie przeszedł największy redesign od dekad

**TLDR:** Satyryczny, ale dokładnie udokumentowany przegląd dwudziestu czterech lat zmian na example.com, zarezerwowanej domenie testowej z RFC 2606, kończący się na wrześniowym redesignie z wielojęzycznym nagłówkiem i migracją infrastruktury przez EdgeCast, Edgio i w końcu Cloudflare.

**Streszczenie:** Tekst traktuje najnudniejszą stronę internetu jak obiekt archeologiczny i w sumie ma rację. Example.com startowało w 2002 roku jako tabelkowy layout na Apache 1.3.22 na serwerach ICANN, w 2013 przeniosło się na CDN EdgeCast, które potem przejął Limelight i przemianował na Edgio, a Edgio ogłosiło bankructwo w 2024 roku. W październiku 2025 zniknął nagłówek Server, co było pierwszym sygnałem kolejnej migracji, a w czerwcu 2026 strona wylądowała na Cloudflare, co widać po nagłówkach CF-RAY. Wrześniowy redesign dokłada JavaScript, który co pięć sekund przełącza komunikat powitalny między kilkoma językami, literka po literce wygaszając i rozjaśniając każdy znak osobnym przejściem CSS opacity z rosnącym opóźnieniem.

Najzabawniejszy fragment to oficjalne ostrzeżenie, że nie warto polegać na example.com w testach monitoringowych, bo strona bywa niedostępna. To domena zarezerwowana pod dokumentację, nie infrastruktura produkcyjna, a mimo to pół internetu trzyma ją w testach integracyjnych jako „neutralny” adres zewnętrzny.

**Kluczowe wnioski:**
- Example.com zmienił dostawcę CDN co najmniej trzy razy w ciągu dwóch dekad: Apache, EdgeCast/Edgio, Cloudflare.
- Wrześniowy redesign 2026 dodaje JavaScriptowy cykliczny komunikat w sześciu językach z animacją opacity.
- Strona wprost odradza używanie jej do monitoringu i testów sieciowych z powodu niestabilnej dostępności.

**Dlaczego mi na tym zależy:** Jeśli w testach e2e albo w przykładowej konfiguracji masz zahardkodowane example.com, to ten artykuł jest dobrym pretekstem, żeby to usunąć. To nie jest infrastruktura, na której można polegać, i historia bankructwa Edgio jest tego najlepszym dowodem.

**Link:** [Example.com Just Launched The Biggest Redesign In Decades](https://daily.dev/posts/2HsITdYwt)

## shadcn-admin-kit 2.0 przesiada się z Radixa na Base UI

**TLDR:** Nowa wersja open-source'owego zestawu komponentów do paneli administracyjnych zmienia fundament z Radix UI na Base UI, wymaga migracji istniejących projektów i dodaje wsparcie dla TanStack Routera jako alternatywy dla react-router.

**Streszczenie:** shadcn-admin-kit buduje gotowe do produkcji panele admina na bazie shadcn/ui, a wersja 2.0 to przede wszystkim zmiana fundamentu pod spodem. `components.json` przechodzi na styl base-vega, projekt wymaga teraz ra-core 5.15.2 lub nowszego, a autocomplete w `AutocompleteArrayInput` zyskuje tworzenie nowych opcji w locie. Obok tego naprawiono błąd z propsem `routerProvider` i kilka problemów z dostępnością w custom inputach, uproszczono instalację do jednego polecenia `shadcn init`, a zależności podbito do react-router 7.17.0 i vitest 4.1.8 z migracją na `@vitest/browser-playwright`.

**Kluczowe wnioski:**
- Fundament UI zmienia się z Radix UI na Base UI, co wymaga migracji istniejących projektów.
- TanStack Router dołącza jako alternatywa dla react-router.
- Instalacja skraca się do jednej komendy: `shadcn init`.

**Dlaczego mi na tym zależy:** Jeśli budujesz wewnętrzne narzędzia administracyjne i rozważałeś shadcn-admin-kit, przesiadka na Base UI to sygnał, że warto poczekać na stabilizację v2 albo dokładnie przeczytać przewodnik migracyjny przed aktualizacją istniejącego panelu.

**Link:** [Release v2.0.0 · marmelab/shadcn-admin-kit](https://daily.dev/posts/im8jwkeQF)

## SvelteKit 3 wchodzi w fazę release candidate

**TLDR:** SvelteKit 3 RC przenosi całą konfigurację do `vite.config.ts`, zastępuje alias `$lib` nowym `#lib` opartym na natywnych subpath imports z Node, i wymaga Vite 8 z Rolldown oraz Svelte 5.

**Streszczenie:** To wydanie jest porządkowe, nie featurowe. Konfiguracja, która wcześniej żyła w `svelte.config.js`, przenosi się całkowicie do `vite.config.ts`, dzięki czemu plugin Vite może odczytać ją synchronicznie zamiast czekać na asynchroniczne rozwiązanie zależności, które faktycznie zaczęło się już w wersji 2.62. Alias `$lib` znika na rzecz `#lib`, opartego na natywnych subpath imports z `package.json`, co oznacza konieczność dopisywania rozszerzeń plików w importach. Migrację automatyzuje komenda `npx sv@next migrate sveltekit-3`.

Wymóg Vite 8 ciągnie za sobą Rolldown jako bundler i szybsze buildy, a wymóg Svelte 5 poprawia obsługę błędów: komponenty `+error.svelte` renderują się teraz zarówno przy błędach ładowania, jak i renderowania, każdy błąd przechodzi przez `handleError`, a stack trace'y mają sourcemapy. Reakcje na Reddicie na zmianę `$lib` na `#lib` były mieszane, część osób najpierw irytowała się niespójnością z `$app`, zanim dotarła do nich korzyść z aliasu działającego też poza SvelteKitem.

**Kluczowe wnioski:**
- Cała konfiguracja przenosi się z `svelte.config.js` do `vite.config.ts`.
- `$lib` zostaje zastąpiony przez `#lib`, oparty na subpath imports z `package.json`, wymagający rozszerzeń plików.
- Wymagane są Vite 8 z Rolldown i Svelte 5.
- Migrację robi za ciebie `npx sv@next migrate sveltekit-3`.

**Dlaczego mi na tym zależy:** Zmiana aliasu brzmi kosmetycznie, ale `#lib` działające poza kontekstem SvelteKita (np. w testach uruchamianych bez niego) to realna poprawa DX, o którą warto było poprosić. Jeśli trzymasz duży projekt na SvelteKit 2, warto zaplanować migrację zanim RC wejdzie do stabilnej wersji i presja na upgrade wzrośnie.

**Link:** [SvelteKit 3 Reaches Release Candidate](https://daily.dev/posts/DCd7Y65uW)

## Narodziny Software Verification Engineera

**TLDR:** Tekst proponuje nową rolę inżynierską na czasy, gdy agenty AI piszą większość kodu i testów: Software Verification Engineer, który nie czyta diffów linijka po linijce, tylko buduje infrastrukturę, dzięki której można w ogóle zaufać temu, co agent wyprodukował.

**Streszczenie:** Teza jest ostra: code review jako główny mechanizm akceptacji kodu umiera, bo nikt nie jest w stanie czytać diffów w tempie, w jakim agenty je generują. Zamiast reviewu linijka po linijce, autor proponuje przesunięcie uwagi na cztery rzeczy: intencję zmiany, jej wpływ, dowody na to, że działa, oraz nierozwiązane kwestie. Software Verification Engineer to ktoś, kto buduje harnessy testowe, środowiska, reguły akceptacji i formaty dowodów, czyli całą infrastrukturę, która sprawia, że zmiana wygenerowana przez agenta jest w ogóle możliwa do zweryfikowania bez czytania każdej linijki.

Artykuł zwraca uwagę na coś, co łatwo przeoczyć: sam dobry agent QA to za mało, jeśli nie stoi za nim infrastruktura, która jego wyniki umie zinterpretować. Reguły i guardraile muszą być wykonywalne, nie opisane w promptach, bo prompt to tylko sugestia, a wykonywalna reguła to twardy fakt. Co więcej, agenty powinny same umieć wykryć luki w dowodach i je domknąć, zamiast czekać, aż człowiek zauważy brakujący test w komentarzu pod PR-em.

**Kluczowe wnioski:**
- Code review linijka po linijce jako główny mechanizm akceptacji kodu przestaje się skalować.
- Nowa rola koncentruje się na intencji, wpływie, dowodach i otwartych kwestiach zamiast na samym diffie.
- Guardraile muszą być egzekwowalne przez narzędzia, nie opisane tylko w promptach.
- Agenty powinny same identyfikować i domykać luki w pokryciu dowodowym.

**Dlaczego mi na tym zależy:** To pytanie, które każdy architekt powinien sobie zadać już teraz, zanim zostanie postawiony przed faktem: skoro agent generuje kod szybciej, niż ktokolwiek zdąży go przeczytać, to na czym w ogóle opiera się zaufanie do tego, co trafia na produkcję? Budowa harnessów i formatów dowodowych to praca architektoniczna, nie administracyjna, i chyba lepiej zacząć ją teraz niż łatać dziury po fakcie.

**Link:** [The birth of the Software Verification Engineer](https://daily.dev/posts/KLErkv7uI)
