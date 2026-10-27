---
title: "Skan LiDAR do Three.js, TanStack Start kontra Next.js, wyciek Qwen 4, iframe bez znanej wysokości i mapa pracy za AI"
excerpt: "Pięć tekstów: pokoje z iPhone'a jako sceny Three.js, benchmark TanStack Start 1.0 przeciw Next.js 16.4, przeciek Qwen 4 27B, zmiana rozmiaru iframe z innej domeny oraz mapa pracowników etykietujących dane dla AI."
publishedAt: "2026-10-27"
slug: "dailydev-lidar-threejs-tanstack-start-nextjs-qwen-4-iframe-praca-za-ai"
hashtags: "#dailydev #frontend #threejs #tanstack #nextjs #performance #css #llm #ai #generated #pl"
source_pattern: "daily.dev"
---

## wesbos/3d-model-anything: skan pokoju z iPhone'a jako edytowalna scena Three.js

**TLDR:** Projekt Wesa Bosa zamienia skan LiDAR i zdjęcia pokoju w scenę Three.js, a pracę wykonuje agent kodujący. To iteracyjny proces, nie konwerter na jedno kliknięcie.

**Summary:** Repozytorium składa się z trzech części: aplikacji na iPhone'a do przechwytywania skanu i zdjęć, przeglądarkowego podglądu opartego na Three.js oraz umiejętności agenta o nazwie scan-to-threejs. Ta umiejętność prowadzi agenta przez pomiary, modelowanie i porównywanie widoku modelu z prawdziwym zdjęciem zrobionym z tej samej pozycji kamery.

Autor podkreśla, że to proces iteracyjny. Agent buduje geometrię pokoju, porównuje ją ze zdjęciem, poprawia i tak w kółko. Obecnie projekt radzi sobie z pomieszczeniami i wnętrzami, a nie z dowolnymi obiektami. W repozytorium jest demonstracyjne biuro, które można oglądać w kilku trybach: jako domek dla lalek, spacerując po wnętrzu, z góry, jako siatkę oraz w widoku układania przedmiotów obok siebie. Uruchomienie lokalnie wymaga Node.js w wersji 22.12 lub nowszej, a kod i umiejętność mają licencję MIT.

Najciekawsze jest tu nie samo 3D, tylko wzorzec: agent dostaje zadanie z mierzalnym kryterium, czyli zgodnością renderu ze zdjęciem, i może sam siebie sprawdzać w pętli.

**Key takeaways:**
- Skan LiDAR i zdjęcia dają edytowalną scenę Three.js, a nie surową chmurę punktów.
- Agent weryfikuje wynik, porównując render z fotografią z tej samej pozycji kamery.
- Na razie działa dla wnętrz, a licencja MIT pozwala użyć kodu i umiejętności.

**Why do I care:** Dla frontendowca to dobry przykład agenta z wbudowanym testem wizualnym, a ten wzorzec przenosi się na każdą pracę, gdzie da się porównać wynik z wzorcem. Autor jednak pomija koszt: ile iteracji i tokenów potrzeba na jeden pokój i jak wyglądają zniekształcenia na złożonych meblach. Bez tej liczby trudno ocenić, czy to narzędzie, czy efektowne demo.

**Link:** [GitHub - wesbos/3d-model-anything](https://daily.dev/posts/Jyfy9wrXV)

## TanStack Start kontra Next.js (2026): ta sama aplikacja pod benchmarkiem

**TLDR:** TanStack Start 1.0 trafił do stabilnej wersji 13 października 2026. W teście małego sklepu obsłużył wielokrotnie więcej żądań niż Next.js 16.4, ale przegrał na stronie prerenderowanej.

**Summary:** Autor zbudował ten sam sklep w obu frameworkach i zmierzył ich wydajność. TanStack Start obsłużył 2,9 raza więcej stron list renderowanych po stronie serwera na sekundę, 4,6 raza więcej stron produktów i 8,6 raza więcej wywołań API zwracających JSON. Wysłał też o dwadzieścia procent mniej JavaScriptu do przeglądarki, czyli 109 kilobajtów po kompresji wobec 135, a budowanie trwało 1,26 sekundy zamiast 4,86. W spoczynku zajmował 60 megabajtów pamięci, a Next.js 94.

Jedyny punkt dla Next.js to strona prerenderowana, gdzie padło 3220 żądań na sekundę wobec 2920. Powód jest prosty: Next.js serwuje gotowy statyczny HTML, a Start renderuje stronę przy każdym żądaniu.

Warto jednak zadać pytanie, czego ten test nie mówi. To mała aplikacja, jeden autor i jedna maszyna. Nie ma tu bazy danych pod obciążeniem, nie ma cache na krawędzi, nie ma rzeczywistego ruchu. Mnożniki rzędu ośmiu razy wyglądają imponująco, ale w prawdziwym sklepie czas zwykle zjadają zapytania do danych, a nie narzut frameworka.

**Key takeaways:**
- Start wygrywa w renderowaniu na żądanie, w rozmiarze paczki, czasie budowania i pamięci.
- Next.js wygrywa tam, gdzie serwuje wcześniej wygenerowany HTML.
- Wynik pochodzi z jednej małej aplikacji, więc nie przekłada się wprost na produkcję.

**Why do I care:** Jako architekt przeczytałbym to jako sygnał, że Start jest poważną alternatywą dla nowych projektów z dużą ilością dynamicznego SSR. Nie ruszałbym jednak istniejącego Next.js tylko z powodu tych liczb. Koszt migracji i ekosystem ważą więcej niż osiem razy lepszy wynik w syntetycznym teście.

**Link:** [TanStack Start vs Next.js (2026): Same App Benchmarked](https://daily.dev/posts/vp7SaQacB)

## Wyciek kodu Qwen 4 27B i model Nanbeige 4.3, który ma bić Qwen 3.8

**TLDR:** Z przecieku na GitHubie wynika, że Qwen 4 27B jest gęstym modelem, a nie mixture-of-experts. Tymczasem 33-miliardowy Nanbeige 4.3 ma przebijać Qwen 3.8 w teście terminal-bench.

**Summary:** Wideo opisuje wyciek z pull requesta, według którego nadchodzący Qwen 4 27B od Alibaby jest modelem gęstym, z wymiarem ukrytym 5120 i długością robocza predykcji wielu tokenów równą cztery. Spekuluje się, że premiera może pojawić się na konferencji Apsara, która ma odbyć się 29 października 2026 w Amsterdamie.

Druga część dotyczy modelu Nanbeige 4.3 o 33 miliardach parametrów. Według autora uzyskał 80,9 procent w terminal-bench 2.1, przy 73 procentach dla Qwen 3.8 27B i 47,2 procent dla Gemma 4 31B. Wersja czterobitowa w formacie MLX na Mac Mini z 64 gigabajtami pamięci zunifikowanej miała osiągać 350 tokenów na sekundę przy wstępnym przetwarzaniu i 14,4 przy generowaniu, zajmując szczytowo 19,3 gigabajta.

Zwróć uwagę na słowo „reportedly". Wszystkie te liczby pochodzą z jednego filmu, bez niezależnego potwierdzenia, a wyciek jest nieoficjalny. To raczej ciekawostka niż podstawa do decyzji.

**Key takeaways:**
- Qwen 4 27B ma być modelem gęstym, a termin premiery pozostaje spekulacją.
- Nanbeige 4.3 deklaruje 80,9 procent w terminal-bench 2.1.
- Czterobitowy model mieści się w około 19 gigabajtach, więc działa na wysokiej klasy Macu.

**Why do I care:** Dla kogoś, kto buduje narzędzia deweloperskie z lokalnymi modelami, liczy się to, że dobry model do pracy w terminalu mieści się już na biurkowym sprzęcie. Brakuje tu jednak testów na realnych zadaniach, bo benchmark nie mówi, jak model zachowuje się w twoim repozytorium.

**Link:** [Qwen 4 27B GitHub Code LEAKED!](https://daily.dev/posts/gNgGG2crD)

## Zmiana rozmiaru iframe z innej domeny do wysokości jego treści

**TLDR:** Strona nie może odczytać wysokości iframe z cudzej domeny. Są trzy podejścia: stała wysokość, postMessage i nowa właściwość CSS frame-sizing, wspierana tylko w Chromium.

**Summary:** Typowy przykład to widżet z opiniami klientów osadzony w sklepie. Strona hosta nie widzi, co jest w środku, więc nie wie, jak wysoki ma być ramka. Pierwsze rozwiązanie to stała wysokość, czyli przewijany pudełkowy fragment. Drugie to wysyłanie wysokości przez postMessage z wnętrza widżetu. Wymaga to sprawdzania źródła zdarzenia, żeby nie pomylić kilku widżetów na jednej stronie, a czystszy uścisk dłoni daje MessageChannel.

Trzecie podejście to właściwość CSS frame-sizing, w której przeglądarka sama mierzy ramkę, ale obie strony muszą się na to zgodzić. W Chrome ma błędy związane ze zmianą szerokości i minimalną wysokością, a Firefox i Safari w ogóle jej nie wspierają.

Autor przyznaje, że zmiana rozmiaru powoduje przesunięcia układu, które pogarszają wynik Cumulative Layout Shift. Argumentuje jednak, że to mniejsza strata niż trzymanie opinii w małym przewijanym okienku. Brakuje mi tu liczb: jak duże jest to pogorszenie CLS w porównaniu z korzyścią w konwersji.

**Key takeaways:**
- Przeglądarka blokuje odczyt zawartości ramki z innej domeny, stąd cały problem.
- postMessage działa wszędzie, ale wymaga współpracy autora widżetu.
- frame-sizing jest czystsze, ale na razie tylko w Chromium i z błędami.

**Why do I care:** To codzienność przy widżetach płatności, czatów i opinii. Moja rada: postMessage z weryfikacją źródła jako rozwiązanie podstawowe, a frame-sizing jako progresywne ulepszenie tam, gdzie można zaakceptować brak wsparcia.

**Link:** [Resizing a Cross-Origin Iframe to Fit Its Content](https://daily.dev/posts/CL1IcUgHp)

## Studentka Brown University mapuje ukrytą pracę, która napędza AI

**TLDR:** Cunyan Ma zbudowała darmową interaktywną mapę pracowników na całym świecie, którzy etykietują dane do trenowania AI. Dyskusja pod tekstem skupia się głównie na samym określeniu „kolonializm AI".

**Summary:** Mapa łączy firmy technologiczne i ich pośredników z ludźmi, często z globalnego Południa, którzy opisują obiekty na zdjęciach, transkrybują mowę, oceniają odpowiedzi chatbotów i zaznaczają granice guzów na skanach medycznych. Autorka połączyła istniejące bazy danych, własne zbieranie danych i doniesienia prasowe. Celem jest pokazanie skali, której pojedyncze reportaże nie oddają. Część tej pracy wystawia ludzi na drastyczne treści, bo muszą pomagać systemom je filtrować.

Komentarze są ostro podzielone. Większość wątku to spór, czy „kolonializm AI" to trafne określenie, czy przeciążone hasło grające na emocjach. Drugi wątek pyta, czy etykietowanie danych jest krzywdzące, czy to po prostu przyzwoita praca, lepsza od alternatyw. Sam tekst nie rozstrzyga, ile ci ludzie zarabiają w porównaniu z lokalnymi stawkami, a to kluczowy brak.

**Key takeaways:**
- Mapa łączy firmy, pośredników i pracowników danych w jednym narzędziu.
- Praca obejmuje etykietowanie, transkrypcję, ocenianie odpowiedzi i oznaczanie obrazów medycznych.
- Dyskusja dotyczy bardziej języka opisu niż samych danych.

**Why do I care:** To tekst bardziej etyczny niż techniczny, ale każdy, kto buduje produkty na modelach, jest ogniwem tego łańcucha. Warto wiedzieć, skąd pochodzą dane, na których opiera się twój produkt.

**Link:** [Brown student maps the hidden global labor powering AI](https://daily.dev/posts/MLyU3J8tP)
