---
title: "Bezpieczeństwo łańcucha dostaw, WasmGC, kolejkowanie i React Native — wybrane z ui.dev (01.07.2024)"
excerpt: "Przegląd istotnych artykułów dotyczących bezpieczeństwa zależności front-endu, wydajności obliczeń w przeglądarce, strategii kolejkowania i rekomendacji dla React Native."
publishedAt: "2025-10-27"
slug: "bezpieczenstwo-lancucha-wasmgc-kolejkowanie-react-native"
hashtags: "#generated #pl #frontend #react #react-native #wasm #wasmgc #security #architecture #typescript #queueing #expo #polyfill #sansec"
---

## Bytes #302 - Where do OSS projects go when they die?
**TLDR:** Krótka, ostrożna refleksja nad tym, co dzieje się z porzuconymi projektami open source — przykład Polyfill.js pokazuje, że martwe projekty stają się wektorami złośliwych działań, co ma bezpośrednie implikacje dla front-endu i łańcucha dostaw. Autor przypomina, że brak aktywnego utrzymania to nie tylko strata funkcjonalna, ale też ryzyko bezpieczeństwa i reputacji.

**Summary:**
Bytes #302 zwraca uwagę na problem, który coraz częściej wraca w dyskusjach o infrastrukturze oprogramowania: porzucone projekty open source nie znikają — są przejmowane, wykorzystywane lub zamieniane w narzędzia ataku. W kontekście front-endu to szczególnie niebezpieczne, bo wiele stron ładuje zewnętrzne zasoby (skrypty, polyfille, CDN) bez pełnej kontroli nad ich zawartością w czasie. Przykład Polyfill.js pokazuje, że projekt, który utracił rację bytu technicznego (nowe przeglądarki stały się „evergreen”), może zostać zakupiony i wykorzystany do wstrzykiwania złośliwego kodu na setki tysięcy stron.

Autor rozbiera mechanikę takiego ataku: nabycie domeny i repozytorium, możliwość serwowania dynamicznego skryptu zależnego od nagłówków, wstrzyknięcie „fałszywych” skryptów analitycznych i przekierowań mobilnych. To nie jest zwykły defacement — to supply chain attack z dokładnością uruchamiania tylko na określonych urządzeniach i godzinach, z mechanizmami utrudniającymi analizę. Odpowiedź społeczności i dostawców sieci CDN była szybka — migracje i serwisy zastępcze od Cloudflare i Fastly, a także rekomendacja autora, by w ogóle przestać polegać na przestarzałych polyfillach — ale to działa jak plaster na objaw, nie na chorobę.

Z punktu widzenia inżyniera front-endu i architekta, historia przypomina, że zewnętrzne zależności to nie tylko API i bugi — to zaufanie, które daje się nadużyć. Trzeba myśleć o mechanizmach ograniczających zaufanie: Content Security Policy, Subresource Integrity tam, gdzie to możliwe, minimalizacja zewnętrznych hotlinków oraz procesy sprawdzania właścicieli i aktywności projektów, z których korzystamy. Długoterminowa praktyka powinna też uwzględniać plan awaryjny — alternatywne hostowanie, mirrory i politykę migracji.

Warto też zauważyć dodatkowy ekonomiczny aspekt: rynek „sponsorów” open source jest zróżnicowany i podatny na wykorzystywanie. Gdy firmy o wątpliwej reputacji mogą kupić projekt, by uzyskać rozproszone linki lub wstrzykiwać ruch, problem staje się systemowy. Ostateczny wniosek jest prosty — w świecie, gdzie kod z Internetu jest bezpośrednio wykonywany w przeglądarce użytkownika, porzucone projekty to aktywa o potencjalnie negatywnej wartości, jeżeli pozostawić je bez nadzoru.

**Key takeaways:**
- Porzucone projekty OSS mogą stać się wektorami supply-chain attack; aktywność utrzymująca ma wartość bezpieczeństwa.
- Front-endowcy powinni ograniczać zaufanie do zewnętrznych skryptów: CSP, SRI, i alternatywne hostowanie to podstawowe środki.
- Miej plan migracji i fallbacky dla krytycznych zasobów — nawet gdy wydają się wygodne, zewnętrzne CDN-y to ryzyko.

**Link:** [Bytes #302 - Where do OSS projects go when they die?](https://bytes.dev/archives/302)

---

## Polyfill supply chain attack hits 100K+ sites
**TLDR:** Sansec opisuje, jak nabycie domeny cdn.polyfill.io doprowadziło do dystrybucji złośliwego, dynamicznie generowanego kodu na ponad 100 000 stron. Atak ilustruje zagrożenia związane z zewnętrznymi zależnościami i potrzebę natychmiastowej reakcji i audytu zasobów ładowanych przez strony.

**Summary:**
Raport Sansec to techniczny opis supply-chain attack na popularny hosting polyfilli. Mechanizm ataku opierał się na tym, że cdn.polyfill.io generował kod zależnie od nagłówka User-Agent, co dało napastnikowi precyzyjny sposób do wstrzykiwania różnych payloadów w zależności od urządzenia. Po zakupie domeny i repozytorium, autorzy zmian zaczęli usuwać zgłoszenia i wprowadzać mechanizmy ukrywające działanie złośliwego kodu — na przykład nie aktywując payloadu dla kont administratorów i opóźniając wykonanie, by ominąć proste kontrole analityczne.

Z technicznego punktu widzenia ciekawy jest sposób, w jaki atak był „warunkowy”: aktywacja jedynie na urządzeniach mobilnych, w określonych godzinach, z mechanizmami utrudniającymi debugowanie. To klasyczne podejście wyraźnie pokazuje, że supply chain attacks nie muszą być hałaśliwe — wręcz przeciwnie, cichsze, precyzyjne ataki są trudniejsze do wykrycia i bardziej zyskowne. Reakcja ekosystemu (Cloudflare, Fastly, Namecheap, Google) była szybka i skuteczna, ale wymagała koordynacji i ingerencji zewnętrznej.

Dla praktyków front-endu kluczowe wnioski to natychmiastowe usunięcie odwołań do cdn.polyfill.io, audyt używanych CDN-ów i narzędzi ładowanych z zewnętrznych źródeł oraz wdrożenie monitoringu CSP. Sansec radzi też aktualizację skanerów bezpieczeństwa i wykrywanie podobnych domen, które mogą być używane jako źródła złośliwych zasobów. Dodatkowo, trzeba myśleć o infrastrukturze: mirrory, self-hosting krytycznych skryptów i testy integracyjne wykrywające nieoczekiwane zmiany w zewnętrznych skryptach.

Na poziomie architektonicznym ta sprawa przypomina, że łańcuch zaufania w aplikacjach webowych jest rozproszony — od twórcy biblioteki, przez CDN, do operatora domeny. Każdy z tych elementów może być celem ataku. Z tego powodu decyzje projektowe — czy warto polegać na zewnętrznym CDNie dla rzeczy krytycznych — powinny uwzględniać nie tylko uptime i wydajność, ale też ryzyko przejęcia i możliwość szybkiego odcięcia się.

**Key takeaways:**
- Ataki na łańcuch dostaw mogą wykorzystywać dynamiczne treści CDN i warunkowe uruchamianie payloadów; są trudne do wykrycia.
- Natychmiast usuń odwołania do kompromitowanych domen, wprowadź monitoring CSP i rozważ self-hosting kluczowych zasobów.
- Projektuj systemy z planem awaryjnym: mirrory, alternatywne źródła i automatyczne testy wykrywające nieoczekiwane zmiany skryptów.

**Link:** [Polyfill supply chain attack hits 100K+ sites](https://sansec.io/research/polyfill-supply-chain-attack)

---

## Queueing – An interactive study of queueing strategies – Encore Blog
**TLDR:** Interaktywny przewodnik po strategiach kolejkowania wyjaśnia, dlaczego kolejki są kluczowe dla stabilności systemów rozproszonych i prezentuje praktyczne wzorce, które pomagają zarządzać przepływem żądań oraz priorytetami. To dobry materiał, by ugruntować mentalny model działania kolejek i ich wpływ na UX.

**Summary:**
Encore przygotowało przystępny, interaktywny artykuł, który prowadzi czytelnika od prostego klient–serwer do bardziej złożonych konfiguracji z kolejkami. Najpierw pokazuje problem: serwer, który może obsłużyć tylko jedno żądanie jednocześnie, powoduje utratę żądań przy nagłym wzroście ruchu. Wprowadzenie kolejki pozwala „wygładzić” obciążenie kosztem opóźnienia dla użytkownika, co często jest lepsze niż odrzucenie żądania.

Autorzy omawiają trzy podstawowe typy kolejek w praktycznym kontekście HTTP i przetwarzania: FIFO (first-in-first-out), oraz inne strategie (w artykule są porównywane różne podejścia i adaptacje), a także dodatkowe techniki, jak priorytetyzacja i ochrona przed odrzuceniem istotnych żądań. Interaktywne przykłady pokazują efekty kolejki przy różnych rozmiarach bufora i szybkościach serwera — to świetny sposób, by zrozumieć trade-off między pamięcią (buforowaniem) a UX (czasem oczekiwania).

W praktycznym wymiarze artykuł zwraca uwagę na typowe problemy: przeciążenie kolejki (i konieczność wyznaczania granicy długości), polityki drop/queue (czy odrzucać stare żądania, czy nowe), oraz znaczenie mechanizmów backpressure i throttlingu. Dodatkowo proponuje strategię, którą można zastosować do większości kolejek, by zapobiec utracie priorytetowych żądań — innymi słowy, systemy powinny rozróżniać krytyczne od mniej krytycznych operacji i odpowiednio traktować ich miejsce w kolejce.

Dla architektów to przypomnienie, że kolejki to nie tylko implementacja techniczna, ale sposób wyrażania polityki biznesowej w systemie: co warto opóźnić, a co należy obsłużyć natychmiast. Implementacja powinna iść w parze z metrykami: długości kolejek, czasu oczekiwania i współczynnika odrzuceń. Te metryki są niezbędne do świadomego doboru strategii kolejkującej w systemach front-end → backend i rozproszonych.

**Key takeaways:**
- Kolejki są prostym, skutecznym narzędziem do wygładzania obciążenia; koszt to opóźnienie zamiast odrzucenia żądań.
- Projektuj polityki kolejkowania z myślą o priorytetach biznesowych i monitoruj metryki (długość, czas oczekiwania, odrzucenia).
- Mechanizmy backpressure, throttling i limitowanie długości kolejki są krytyczne dla odporności systemu.

**Link:** [Queueing – An interactive study of queueing strategies – Encore Blog](https://encore.dev/blog/queueing)

---

## Use a framework to build React Native apps · React Native
**TLDR:** Oficjalne zalecenie: początkującym i większości zespołów lepiej zacząć z frameworkiem React Native, takim jak Expo, zamiast samodzielnie kompletować narzędzia. Frameworki upraszczają zarządzanie natywnymi zależnościami, aktualizacjami i procesami buildów, przyspieszając wejście aplikacji do produkcji.

**Summary:**
Zespół React Native zaktualizował swoje wytyczne i rekomenduje użycie pełnoprawnego frameworka dla nowych projektów — z Expo jako polecanym community frameworkiem. Argumentacja jest praktyczna: budowanie natywnej aplikacji to zbiór rutynowych, lecz trudnych problemów — od zgodności wersji React Native, przez konfigurację natywnych modułów, aż po procesy aktualizacji. Framework dostarcza gotowe narzędzia, automatyzuje te aspekty i pozwala skupić się na funkcjonalności aplikacji.

W tekście podkreślono, że wielkie firmy nadal mogą chcieć budować własne, wewnętrzne frameworki — to ma sens przy głębokiej integracji z istniejącym kodem i specyficznych wymaganiach. Dla większości zespołów jednak koszt utrzymania własnego stacku przewyższa korzyści. Expo zostało wskazane jako „best in class” — zapewnia wsparcie dla uaktualnień, narzędzia deweloperskie i ekosystem, chociaż niektóre zaawansowane potrzeby mogą wymagać dodatkowych natywnych rozwiązań.

Praktyczne implikacje: jeśli zaczynasz nowy projekt React Native, wybór Expo przyspieszy prototypowanie, ułatwi CI/CD i zmniejszy ryzyko utknięcia przy natywnych buildach. Jeżeli masz istniejącą aplikację, migracja jest możliwa — Expo udostępnia narzędzia migracyjne — ale wymaga planowania, szczególnie gdy projekt używa specyficznych natywnych modułów. Warto też planować budżet operacyjny: Expo jest open source, lecz usługi (EAS) oferują wygodę za opłatą.

Dla architektów jest to przypomnienie o wyborach platformowych: frameworki to nie tylko wygoda, to też polityka aktualizacji i kontroli jakości. Decyzja o użyciu frameworka powinna uwzględniać tempo zespołu, potrzebę kontroli nad natywnym kodem oraz koszty długoterminowego utrzymania. Expo dziś jest rekomendacją społeczności — warto poznać ograniczenia oraz plan migracji, jeżeli oczekujesz dużej elastyczności natywnej.

**Key takeaways:**
- Frameworki (np. Expo) znacząco redukują koszt uruchomienia i utrzymania aplikacji React Native; są zalecane dla większości zespołów.
- Duże organizacje z istniejącą infrastrukturą mogą nadal preferować własne frameworki, ale to kosztowny wybór.
- Przy migracji rozważ zależności natywne i planuj testy oraz CI/CD — framework ułatwia, ale nie eliminuje tych wyzwań.

**Link:** [Use a framework to build React Native apps · React Native](https://reactnative.dev/blog/2024/06/25/use-a-framework-to-build-react-native-apps)

---

## Why Google Sheets ported its calculation worker from JavaScript to WasmGC  |  web.dev
**TLDR:** Google przeniosło silnik kalkulacji Sheets z JavaScript do WebAssembly z WasmGC, by odzyskać wydajność porównywalną z JVM; WasmGC otwiera drogę do uruchamiania języków z garbage collection w przeglądarce przy znacznie lepszej przepustowości niż JS.

**Summary:**
Artykuł wyjaśnia, dlaczego zespół Google Sheets zdecydował się na WasmGC: historycznie silnik kalkulacji był w Javie na serwerze, potem został przeniesiony do przeglądarki jako JavaScript (przez GWT i później J2CL). Chociaż JIT-owane silniki JS zrobiły ogromne postępy, prace porównawcze wykazały, że JS jest wolniejszy od Javy w zadaniach intensywnie korzystających z typów i struktur pamięci — obliczenia dużych arkuszy mogły być nawet trzy razy wolniejsze.

WasmGC uzupełnia WebAssembly o prymitywy potrzebne do kompilacji języków zarządzanych (garbage-collected), takich jak Java. To oznacza, że można skompilować istniejący kod Java i uruchomić go w przeglądarce z zachowaniem semantyki GC, ale z blisko-natywną wydajnością. W przypadku Sheets to przekłada się na krótsze czasy kalkulacji i płynniejsze doświadczenie użytkownika przy dużych arkuszach. Google współpracował z zespołem Chrome przy standaryzacji i optymalizacji, co pokazuje, że WasmGC to poważny kierunek rozwoju platformy web.

Dla inżynierów front-endu i architektów to sygnał, że ciężkie obciążenia obliczeniowe mogą zostać przesunięte do klienta bez rezygnacji z wydajności. To zmienia rozkład odpowiedzialności: tam, gdzie wcześniej trzeba było przenosić ciężkie obliczenia na serwer, teraz możliwe są hybrydowe modele, w których logika utrzymywana jest blisko użytkownika, zmniejszając opóźnienia i koszty infrastruktury. Jednocześnie pojawiają się nowe wyzwania: debugowanie, bezpieczeństwo pamięci i model aktualizacji kodu Wasm.

W szerszym kontekście WasmGC jest impulsem do ponownego przemyślenia granicy między backendem a frontendem, zwłaszcza dla aplikacji wymagających intensywnych obliczeń, takich jak edycja grafiki, symulacje czy arkusze kalkulacyjne. To także zapowiedź, że języki silnie typowane i zarządzane (Java, C#) mogą mieć sensowne miejsce w przeglądarce przy zachowaniu wydajności, co wpłynie na wybór technologii i architekturę aplikacji w nadchodzących latach.

**Key takeaways:**
- WasmGC pozwala uruchamiać garbage-collected języki w przeglądarce z wysoką wydajnością — kluczowa zmiana dla aplikacji obliczeniowych.
- Migracja Google Sheets ilustruje korzyści: znacząco lepsza przepustowość obliczeń w porównaniu z JavaScript.
- Architekci powinni rozważyć WasmGC jako opcję dla ciężkich zadań klienta, ale pamiętać o nowych wyzwaniach związanych z debugowaniem i bezpieczeństwem.

**Link:** [Why Google Sheets ported its calculation worker from JavaScript to WasmGC  |  web.dev](https://web.dev/case-studies/google-sheets-wasmgc)