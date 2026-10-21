---
title: "daily.dev: Cloudflare Workers zamiast Pages, stos dla agentów, TypeScript 7.1 Beta, C w sieci i podwójne liczenie AI"
excerpt: "Pięć tekstów: wybór między Pages a Workers, warstwy stosu agentowego, nowości w TypeScript 7.1, serwer w C i krytyka rachunku na produktywności AI."
publishedAt: "2026-10-21"
slug: "dailydev-cloudflare-workers-agentic-stack-typescript-7-1-c-w-sieci-podwojne-liczenie"
hashtags: "#dailydev #cloudflare #typescript #agents #architecture #security #productivity #generated #pl"
source_pattern: "daily.dev"
---

## Cloudflare Pages czy Workers

**TLDR:** Dla nowych projektów na Cloudflare autor radzi zaczynać od Workers ze statycznymi zasobami, bo tam trafiają nowe funkcje. Pages dalej działa, ale nie jest już głównym kierunkiem.

**Summary:** Oba produkty serwują pliki statyczne za darmo i bez limitu żądań. Różnica jest w żądaniach dynamicznych, które na darmowym planie współdzielą pulę 100 tysięcy dziennie i limit 10 milisekund czasu procesora. Pages Free daje 500 buildów miesięcznie, a Workers Builds Free 3000 minut budowania. To dwie różne miary: jedna liczy buildy, druga czas, więc krótki i długi build zużywają limit zupełnie inaczej. Funkcje Pages liczą się do rozliczeń Workers, więc przeniesienie frontendu na Pages nie daje osobnej puli mocy obliczeniowej.

Najciekawsza jest uwaga o autoryzacji. Sprawdzenie uprawnień chroni tylko żądania, które do niego docierają. Jeśli prywatny plik wrzucisz jako zasób statyczny, domyślne kierowanie "najpierw zasoby" może go oddać bez uruchamiania skryptu Workera. Trzeba więc celowo skonfigurować ścieżkę żądania i przetestować ją zapytaniem bez logowania wprost do pliku.

**Key takeaways:**
- Nowe projekty: Workers Static Assets.
- Limity buildów mierzą co innego, więc nie porównuj ich wprost.
- Prywatne pliki jako zasoby statyczne mogą ominąć twoją autoryzację.

**Why do I care:** Ostatni punkt to realne ryzyko wycieku, a nie ciekawostka. Przy migracji z Pages przetestuj każdą chronioną ścieżkę żądaniem bez tokena, zanim założysz, że middleware wszystko łapie.

**Link:** [Cloudflare Pages vs Workers: which should you choose?](https://daily.dev/posts/js6QzTT4f)

## Jak zbudować stos technologiczny dla agentów

**TLDR:** Autor rozkłada stos agentowy na warstwy: modele, orkiestrację, narzędzia przez MCP, pamięć, zabezpieczenia, obserwowalność i testy. Testy mają być niezależne od agenta, który pisał kod.

**Summary:** Tekst pochodzi od firmy mabl i na końcu pozycjonuje jej produkt jako warstwę weryfikacji, więc warto czytać go z tą świadomością. Samą listę warstw da się jednak obronić. Orkiestrację opisuje przez LangGraph, który trzyma stan przepływu, CrewAI z ustrukturyzowanymi przepływami i AutoGen, który koordynuje agentów przez zdarzenia. Obserwowalność to OpenTelemetry jako neutralny standard oraz LangSmith, Braintrust i Phoenix do śledzenia i ewaluacji.

Najmocniejszy argument dotyczy testów: system, który pisze kod, nie powinien go sam weryfikować, bo jego kontekst ogranicza się zwykle do bieżącego zadania lub diffu. Lokalne testy mogą przechodzić, a przepływ płatności albo kontrakt API zepsuć się gdzie indziej. Na koniec jest lista kontrolna przed produkcją: dopasowanie modelu, uprawnienia, granice pamięci i ludzka akceptacja zmian wysokiego ryzyka.

**Key takeaways:**
- Stos agentowy to siedem warstw, a model jest tylko jedną z nich.
- Weryfikacja powinna być oddzielona od autora kodu.
- Zmiany wysokiego ryzyka wymagają zatwierdzenia przez człowieka.

**Why do I care:** Autor nie pyta, czy każda warstwa jest potrzebna w małym zespole. Większość zespołów zacznie od tracingu i niezależnych testów, a resztę dołoży, gdy coś zaboli.

**Link:** [How to Build an Agentic Development Tech Stack](https://daily.dev/posts/pzO9N81y2)

## TypeScript 7.1 Beta

**TLDR:** Wersja 7.1 Beta przyspiesza sprawdzanie typów o 1,2 do 1,9 razy i obniża zużycie pamięci. Dodaje atrybuty importu w deklaracjach modułów i nowe API dla narzędzi.

**Summary:** Na kodzie mui-docs czas sprawdzania typów spadł z 22,2 do 11,9 sekundy, a pamięć z 8093 do 4079 MiB, czyli o niecałe 50 procent. Inne bazy kodu, jak vscode czy sentry, zyskały mniej, około 1,2 do 1,3 raza. To pomiary autorów kompilatora na wybranych projektach, więc własny wynik może być inny.

Z nowości języka: deklaracje modułów mogą być ograniczone do atrybutu importu, na przykład dla plików CSS, tekstowych czy bajtowych, co zastępuje wzorce w stylu gwiazdka kropka css. Pojawiły się importy w fazie źródłowej, stabilny cel es2026 i nowe metody biblioteczne, między innymi Promise.allKeyed i Iterator.zip. Nowe modularne API pozwala narzędziom budować na migawkach i tak zwanych content mapperach, które tworzą wirtualną reprezentację plików nietypescriptowych, na przykład z Vue. Uruchamia się je z osobną flagą, bo wykonują dowolny kod.

**Key takeaways:**
- Sprawdzanie typów szybsze o 1,2 do 1,9 raza w benchmarkach zespołu.
- Importy z atrybutami dostają poprawne typy zamiast wzorców rozszerzeń.
- Content mappery wymagają flagi, bo uruchamiają zewnętrzny kod.

**Why do I care:** Dla dużego monorepo połowa pamięci w CI to konkretne pieniądze. Przed aktualizacją zmierz własny projekt, bo rozstęp między 1,2 a 1,9 raza jest duży.

**Link:** [Announcing TypeScript 7.1 Beta](https://daily.dev/posts/noBq810Sa)

## Pisanie w C dla sieci w 2026

**TLDR:** Produkt komercyjny zbudowany w C jako jeden statyczny plik z SQLite i CGI służy autorowi za punkt wyjścia do pytania, czy minimalne stosy znów mają sens.

**Summary:** Przykładem jest marketyour.games: konta, płatności Stripe i maile transakcyjne w jednym binarium na OpenBSD, z trzema bibliotekami, wdrażane przez podmianę pliku. Argumentów jest trzy. Duże grafy zależności to powierzchnia ataku łańcucha dostaw. Generowanie kodu przez AI jest prawie darmowe, więc wąskim gardłem staje się zrozumienie i weryfikacja przez człowieka. A warstwy serwerów, kontenerów i orkiestratorów to narzut, którego minimalny stos unika.

Autor przyznaje wady: brak bezpieczeństwa pamięci w C, konieczność pisania routingu i walidacji od zera, a także to, że podejście nie skaluje się na duże zespoły ani szybkie prototypy. Komentarze dodają, że zależności nie znikają, tylko przesuwają się do mniejszej liczby dokładniej sprawdzanych dostawców, jak SQLite czy TLS. Podmiana binarium przestaje też być prostym wdrożeniem, gdy zmienia się schemat bazy.

**Key takeaways:**
- Prostota jest tu argumentem bezpieczeństwa i zrozumiałości, nie nostalgią.
- Zmiany schematu bazy psują prosty model wdrożenia przez podmianę pliku.
- Wzór "mieści się w głowie" działa dla jednej osoby, nie dla zespołu.

**Why do I care:** Nie przepiszesz produktu w C, ale pytanie o liczbę zależności jest dobre do przeglądu architektury. Autor pomija koszt zatrudnienia i utrzymania zespołu, który zna C i pisze w nim bezpiecznie.

**Link:** [Writing C for the Web in 2026 Isn't Insane. It Might Be the Future](https://daily.dev/posts/KroUopNCV)

## Podwójnie policzona przyszłość

**TLDR:** Firmy liczą zyski z AI dwa razy: raz jako oszczędność na etatach, drugi raz jako wyższe oczekiwania wobec reszty zespołu.

**Summary:** Yusuf Aytas bierze organizację z tysiącem inżynierów. AI daje jej 25 procent produktywności, więc tnie 20 procent etatów do 800 osób, a potem oczekuje 40 procent więcej wyników. To wymagałoby pracy 1400 inżynierów. Do tego dochodzą koszty reorganizacji, mniej uwagi menedżerów i odejścia seniorów, które zjadają część rzekomych zysków.

Autor sądzi, że może minąć dwa do trzech lat, jak po nadmiernych zatrudnieniach z okresu pandemii, zanim firmy zauważą, że budują rzeczy, których klienci nie chcą. To przykład liczbowy, nie badanie, więc służy jako model rozumowania, a nie dowód.

**Key takeaways:**
- Oszczędność na etatach i wzrost oczekiwań nie mogą pochodzić z tego samego zysku.
- Reorganizacje i odejścia seniorów mają realny koszt.
- Korekta rynku może przyjść dopiero po dwóch, trzech latach.

**Why do I care:** Gdy ktoś w firmie mówi "AI da nam 25 procent", zapytaj, czy ten sam procent ma pokryć zwolnienia i nowe cele. Artykuł pomija, że część zespołów faktycznie zyskuje więcej niż 25 procent.

**Link:** [The Double-Counted Future](https://daily.dev/posts/5ZFlQQXxX)
