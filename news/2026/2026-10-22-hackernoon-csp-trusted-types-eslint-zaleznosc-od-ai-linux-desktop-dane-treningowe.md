---
title: "HackerNoon: CSP i Trusted Types w ESLint, zależność od AI, desktop Linuksa i koniec danych treningowych"
excerpt: "Jak wymusić politykę bezpieczeństwa przeglądarki regułami ESLint, esej o komplecie umiejętności tracących się przez AI, krytyka desktopu Linuksa i argument, że hamowanie AI wynika z braku danych."
publishedAt: "2026-10-22"
slug: "hackernoon-csp-trusted-types-eslint-zaleznosc-od-ai-linux-desktop-dane-treningowe"
hashtags: "#hackernoon #security #javascript #eslint #ai #llm #agents #generated #pl"
source_pattern: "HackerNoon"
---

## Egzekwowanie Content Security Policy i Trusted Types przez ESLint

**TLDR:** Przeglądarka blokuje kod łamiący CSP dopiero wtedy, gdy ten kod się uruchomi. Autor pokazuje, jak wychwycić takie przypadki wcześniej, regułami ESLint.

**Summary:** Problem jest prosty. Naruszenia polityki ujawniają się tylko na ścieżkach, które ktoś faktycznie przeszedł w testach. Raportowanie w trybie Report-Only pomaga na produkcji, ale autor pyta, czy da się zatrzymać taki kod jeszcze przed testami. Ma to dziś dodatkowe znaczenie, bo duża część kodu pochodzi od modeli, a deterministyczna kontrola jest lepsza niż prośba w prompcie.

Zaczyna od eval i jego kuzynów. Wbudowane reguły ESLint blokują wywołanie eval, konstruktor Function i setTimeout z tekstem, a wiele zespołów już je włącza ze względów ogólnych. Dla inline'owych procedur zdarzeń można zabronić atrybutów zaczynających się od "on" w HTML i wywołań setAttribute z takim argumentem w JavaScripcie. Dla stylów inline trzeba rozróżniać atrybut style i cssText, które CSP blokuje, od ustawiania pojedynczej właściwości, które jest dozwolone. Podobnie elementy object, embed i base można zabronić regułami tagów.

Trusted Types to trudniejszy przypadek. Przypisanie literału do innerHTML łatwo wykryć składniowo, ale gdy wartość pochodzi ze zmiennej, trzeba reguły świadomej typów. Podobnie w Permissions Policy, gdzie wywołanie getUserMedia trzeba analizować z argumentami, bo kamera i mikrofon mają osobne dyrektywy. Ciekawy jest też pomysł architektoniczny. Zamiast sprawdzać każdy adres w fetch, można zabronić zaszytych adresów zewnętrznych i ograniczyć fetch do jednej warstwy sieciowej.

**Key takeaways:**
- Wiele naruszeń CSP da się wykryć składniowo.
- Reguły świadome typów potrzebne są przy Trusted Types.
- To uzupełnia, a nie zastępuje Report-Only i testy E2E.

**Why do I care:** To praktyczne podejście, które można wdrożyć w jedno popołudnie. Autor sam zaznacza, że część polityk, jak frame-ancestors, nie przełoży się na kod. Przy okazji przypomina, że przeglądarka pozostaje źródłem prawdy, a lint to tylko tańsza pierwsza linia.

**Link:** [Enforcing Content Security Policy and Trusted Types With ESLint](https://hackernoon.com/enforcing-content-security-policy-and-trusted-types-with-eslint)

## Co się stanie, gdy AI przestanie działać, a my zapomnimy, jak pracować bez niego

**TLDR:** Autor ostrzega przed "długiem zrozumienia" i zależnością od modeli. Jego zdaniem prawdziwe zagrożenie to nie zastąpienie pracy, tylko utrata umiejętności jej wykonywania.

**Summary:** Autor jest inżynierem infrastruktury i zaczyna od tego, że infrastruktura jest deterministyczna i widoczna dla użytkowników, więc w przeciwieństwie do kodu wewnętrznego musi po prostu działać. Zarządzanie produkcją wyłącznie przez agenta kończy się historiami o skasowanej bazie razem z kopiami albo przepisanej aplikacji przez agenta z dostępem roota. Mówi też o długu zrozumienia. Pół godziny pisania promptu, żeby oszczędzić pół godziny pisania kodu, może oznaczać utratę umiejętności napisania tego kodu.

Odwołuje się do idei egzoszkieletu i "odwróconego centaura" Cory'ego Doctorowa, w którym ludzie pracują dla maszyn. Jego własne doświadczenie jest takie, że modele mają skłonność do nadmiernej komplikacji, więc zysk z AI zależy od tego, czy zostajesz zaangażowany w kod. Wątek finałowy dotyczy ciągłości działania. Planować trzeba dzień, w którym AI przestaje działać. Autor wskazuje, że firmy już odkrywają, że abonament za 30 dolarów na osobę stał się rozliczeniem za użycie i prognozowane koszty rosną setki razy.

**Key takeaways:**
- Dług zrozumienia narasta, gdy człowiek jest tylko autorem promptów.
- Infrastruktura potrzebuje doświadczonych ludzi, bo koszt błędu jest widoczny.
- Warto mieć plan na wypadek wzrostu cen albo awarii dostawcy.

**Why do I care:** Zgadzam się z częścią o planie awaryjnym i nie zgadzam z tym, że to problem nowy. Każda zależność od dostawcy ma tę samą naturę. Autor nie podaje jednak danych o cenach, tylko anegdotę o "firmach", a argument o utracie umiejętności warto zweryfikować w zespole, a nie przyjmować na wiarę.

**Link:** [What Happens When AI Stops Working and We've Forgotten How to?](https://hackernoon.com/what-happens-when-ai-stops-working-and-weve-forgotten-how-to)

## Linux wygrał rynek serwerów, ale desktop to nadal loteria

**TLDR:** Autor, zdeklarowany użytkownik Linuksa, twierdzi, że komponenty są świetne, ale produkt desktopowy zawodzi na zwykłych rzeczach. Brakuje właściciela integracji.

**Summary:** Punkt wyjścia to Windows 11 z wymaganym kontem Microsoft i rekomendacjami w menu Start. Autor stawia tezę, że Linux powinien zamieniać tę nieufność w trwałe przejścia, ale zbyt często doświadczenie zależy od tego, czy użytkownik wie, które warunki mają znaczenie. Dla Wayland uznaje kierunek za słuszny, ale przejście wciąż kosztowne. Ułamkowe skalowanie wymaga współpracy kompozytora, toolkitu, silnika i aplikacji, a aplikacja przez XWayland bywa rozmyta.

Udostępnianie ekranu przechodzi przez portale, PipeWire i backend specyficzny dla środowiska, więc jeden przycisk "udostępnij" zależy od kilku warstw. Z usypianiem laptopa jest podobnie. Wiele maszyn ma tylko tryb s2idle, więc zamknięcie klapy nie gwarantuje niskiego poboru nocą. Do tego dochodzą dekodowanie wideo sprzętowo, konflikty formatów pakietów i rozszerzenia GNOME, które psują się przy aktualizacjach.

Wniosek jest organizacyjny. Autor chce publikowanych konfiguracji referencyjnych, testów całych ścieżek użytkownika na fizycznym sprzęcie, jawnych kontraktów zgodności i finansowanej własności integracji. Przyznaje, że część ograniczeń to patenty i zamknięte oprogramowanie sprzętowe.

**Key takeaways:**
- Komponenty są dobre, integracja zawodzi.
- Usypianie, skalowanie, udostępnianie ekranu i pakiety to główne punkty tarcia.
- Potrzebna jest odpowiedzialność za gotowe kombinacje, a nie jeden obowiązkowy desktop.

**Why do I care:** To raczej esej dla użytkowników niż dla frontendowców, ale ma jedną ciekawą lekcję. Produkt to nie suma dobrych komponentów, a ktoś musi odpowiadać za całą ścieżkę. W zespołach z platformą wewnętrzną widzę dokładnie ten sam problem.

**Link:** [Linux Won the Server Market. Why Is Its Desktop Still a Gamble?](https://hackernoon.com/linux-won-the-server-market-why-is-its-desktop-still-a-gamble)

## Prawdziwy powód, dla którego firmy AI hamują, i nie jest to bezpieczeństwo

**TLDR:** Autor twierdzi, że branża kończy się z oryginalnymi danymi, a internet zalewa syntetyczny szum. Stąd zainteresowanie znakowaniem wodnym.

**Summary:** Według Epoch AI zasób wysokiej jakości tekstu stworzonego przez ludzi wyczerpie się między 2026 a 2028 rokiem. Jednocześnie coraz większa część sieci to treść generowana maszynowo, więc roboty zbierające dane do kolejnych modeli wciągają wyniki poprzednich. Autor powołuje się na badania z Oxfordu i Cambridge o zapadaniu się modeli trenowanych rekurencyjnie, bo model traci rzadkie ogony rozkładu, czyli idiomy i wiedzę niszową.

Z tego wyprowadza ciekawą interpretację znakowania wodnego. Nie chroni ono przed zdeterminowanym oszustem, ale ma chronić własne skrypty zbierające dane przed zatruciem. Dalsze prognozy to zamykanie prywatnych archiwów, trening na danych syntetycznych tylko tam, gdzie istnieje obiektywna weryfikacja, jak wykonanie kodu, oraz rosnąca wartość ludzkiej pracy twórczej.

Mam tu zastrzeżenia. Teza o prawdziwym powodzie hamowania jest pewna siebie, a nie ma w tekście żadnego źródła na to, że to dane, a nie koszty czy regulacje, napędzają decyzje firm. Autor pomija też techniki filtrowania i kuracji danych, które wiele laboratoriów już stosuje.

**Key takeaways:**
- Dane publiczne się kończą, a udział treści syntetycznej rośnie.
- Znakowanie wodne może służyć do filtrowania danych treningowych.
- Syntetyczne dane działają tam, gdzie jest weryfikator, na przykład kompilator.

**Why do I care:** Dla frontendowca to tło, nie decyzja. Jeśli jednak budujesz produkt na własnych danych użytkowników, warto pamiętać, że ich wartość rośnie, a nie maleje.

**Link:** [The Real Reason AI Companies Are Tapping the Brakes](https://hackernoon.com/the-real-reason-ai-companys-are-tapping-the-brakes-hint-its-not-safety)
