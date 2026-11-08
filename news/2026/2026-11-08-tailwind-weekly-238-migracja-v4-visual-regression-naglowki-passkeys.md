---
title: "Tailwind Weekly #238: migracja v3 na v4 pod lupą, matematyka nagłówków i jak naprawdę działają passkeys"
excerpt: "Pixel po pikselu o tym, co przeoczył upgrade do Tailwinda v4, skala modularna dla nagłówków h1 do h6 i krok po kroku przez WebAuthn."
publishedAt: "2026-11-08"
slug: "tailwind-weekly-238-migracja-v4-visual-regression-naglowki-passkeys"
hashtags: "#tailwindweekly #tailwindcss #css #testing #playwright #accessibility #auth #security #generated #pl"
source_pattern: "Tailwind Weekly"
---

## Wizualne testy regresji przy migracji Tailwinda v3 na v4

**TLDR:** Autor odpalił oficjalne narzędzie do upgrade'u na 12-stronicowym sklepie i porównał zrzuty ekranu pixelmatchem. Narzędzie przeoczyło trzy przestarzałe klasy przezroczystości, a domyślny próg porównania ukrył jedną realną regresję.

**Summary:** Igor Luchenkov zbudował niewielki sklep w zwykłym Tailwindzie v3, z własną paletą i kilkoma klasami przez apply. Zrobił zrzuty wszystkich dwunastu stron w Playwrighcie, uruchomił oficjalne narzędzie do aktualizacji do wersji 4.3.3, zbudował projekt ponownie i porównał każdą parę. W dokładnym porównaniu pikseli zmieniło się wszystkie dwanaście stron. To akurat nie dziwi, bo Tailwind v4 przeniósł całą domyślną paletę z rgb do oklch, więc nazwy kolorów zostają, a wartości się zmieniają. Nikt tego ręcznie nie pisał i nikt nie przejrzy tego linijka po linijce.

Ciekawsze jest to, co się dzieje przy domyślnym progu pixelmatcha. Przy wartości 0,1 różnica w palecie znika i oflagowane zostaje tylko pięć stron. Wygląda to na dobrze działające narzędzie, ale na stronie produktu oflagowano przesunięcie etykiety o osiem pikseli, a nie oflagowano ikony kurtki, która miała mieć osiemdziesiąt procent przezroczystości i po upgrade'ie jest w pełni biała. Różnica na piksel mieściła się poniżej progu. Próg mierzy, jak bardzo piksel się różni, a nie czy ktoś tę różnicę zamierzał.

Narzędzie do upgrade'u przepisało dziesiątki klas, a trzy stare utilities przezroczystości zostawiło w spokoju. W Tailwindzie v4 przestały generować jakikolwiek CSS, więc elementy wróciły do pełnego koloru. Najgłośniejszy skutek to tło modala usuwania sklepu, które z półprzezroczystej szarości zrobiło się litym granatem, a dwa pozostałe błędy ukryły się wśród dużych różnic palety. Proponowany proces ma sześć kroków. Najpierw baseline na starym systemie, potem stany takie jak otwarte modale, migracja małymi kawałkami z jedną przyczyną na pull request, sortowanie różnic na zmianę tokenów, reflow i awarię, hurtowa akceptacja zamierzonych zmian oraz zwykły grep po usuniętych klasach.

**Key takeaways:**
- Przy migracji zmienia się wszystko, więc luzowanie progu porównania, żeby testy były zielone, chowa realne błędy.
- Pokrywaj stany, nie tylko trasy. Najgorszy błąd siedział w modalu, do którego trzeba kliknąć.
- Jedna przyczyna na pull request sprawia, że każda różnica ma jedno wyjaśnienie.
- Grep po klasach usuniętych w nowej wersji jest tani i łapie to, czego codemod nie umie przepisać.

**Why do I care:** Tekst ma wyraźny ton wpisu firmowego, bo kończy się reklamą narzędzia UI Verify, i to trzeba odjąć. Sama metoda działa jednak z samym skryptem i pixelmatchem. Brakuje mi liczby: ile takich migracji autor zrobił na realnym, brudnym kodzie, a nie na sklepie napisanym pod ten wpis. Mimo to rada o sortowaniu różnic według przyczyny jest dokładnie tym, co zrobiłbym przy każdej większej zmianie design systemu.

**Link:** [Visual regression testing for a design system migration](https://uiverify.ai/blog/design-system-migration-visual-regression)

## Matematyka w stylach nagłówków

**TLDR:** Craig Abbott buduje sześć poziomów nagłówków z jednej skali modularnej o współczynniku 1,5 i bazie 1,2 rem. Najpierw rozmiar, potem odstępy, na końcu waga fontu, a kolor i kursywa odpadają ze względu na dostępność.

**Summary:** Punkt wyjścia to dostępność. Samego koloru nie wolno używać do odróżniania nagłówków, bo w trybie wysokiego kontrastu i forced colors wszystkie kolory zamieniają się w jeden systemowy. Kursywa i wersaliki też odpadają, bo utrudniają czytanie osobom z dysleksją. Zostają rozmiar, odstęp i waga, i autor układa je w hierarchię od najsilniejszego sygnału do najsłabszego.

Rozmiary biorą się wprost ze skali. H1 do h3 dostają kolejne stopnie, a h5 i h6 lądują na rozmiarze tekstu, bo nagłówek nie powinien być mniejszy od akapitu, który wprowadza. Odstępy działają tak, że marginesy dodaje się tylko nad elementem, żeby się nie zwijały, a nad nagłówkami są większe niż nad akapitami. Pod nagłówkiem odstęp maleje, żeby treść wizualnie lgnęła do tytułu. Waga zmienia się tylko dla h6, który schodzi do 500.

Najciekawszy fragment dotyczy h4. Między h3 na około 28 pikseli a h4 na około 19 jest dziura i naiwne uśrednienie nie działa, bo skala jest multiplikatywna. Poprawnym środkiem jest średnia geometryczna, czyli baza razy pierwiastek ze współczynnika, a CSS umie to policzyć funkcją sqrt. Wychodzi około 23,5 piksela. Po publikacji czytelnik zaproponował czystszy zapis przez funkcję pow, gdzie połówka kroku to po prostu potęga 0,5.

**Key takeaways:**
- Jedna skala modularna daje rozmiary i odstępy, więc nic nie dobiera się na oko.
- Hierarchia sygnałów to rozmiar, odstęp, potem waga. Słabszy sygnał dostaje rzadziej używany poziom.
- Połowa kroku skali to średnia geometryczna, nie arytmetyczna.
- Funkcje sqrt i pow mają to samo wsparcie w przeglądarkach.

**Why do I care:** To jest porządny kawałek systemowego myślenia o typografii i jednocześnie powód, żeby przestać kopiować wartości z Figmy. Autor sam przyznaje, że nie jest to nowy pomysł, i dobrze. Zabrakło mi tylko jednej rzeczy, czyli jak ten system zachowuje się przy bardzo długich tytułach i w wąskich kolumnach, bo tam skala 1,5 szybko robi się za duża.

**Link:** [Using maths to balance your heading styles](https://www.craigabbott.co.uk/blog/2026/using-maths-to-balance-your-heading-styles/)

## Jak działają passkeys

**TLDR:** Interaktywne wyjaśnienie od Mystic Coders pokazuje rejestrację i logowanie przez WebAuthn od wyzwania serwera po podpis. Hasło wysyła sekret, passkey wysyła dowód, który serwer sprawdza zapisanym wcześniej kluczem publicznym.

**Summary:** Strona rozdziela trzy role. Serwer to relying party, który zarządza kontem i ocenia odpowiedzi. Przeglądarka łączy stronę z systemem passkeys przez WebAuthn i zna prawdziwy origin. Authenticator, czyli urządzenie, menedżer haseł albo klucz sprzętowy, tworzy i używa kluczy, a JavaScript strony nie dostaje dostępu do klucza prywatnego.

Rejestracja zaczyna się od unikalnego wyzwania, które serwer wiąże z próbą, a potem wywołania tworzenia poświadczenia po stronie przeglądarki. Urządzenie sprawdza lokalnie twarz, odcisk palca albo PIN, a serwer dostaje identyfikator poświadczenia i klucz publiczny. Przy logowaniu serwer wysyła świeże wyzwanie, authenticator podpisuje dane razem z hashem danych klienta, w których siedzi wyzwanie i origin, a serwer weryfikuje podpis, wyzwanie, origin i flagi. Dopiero potem tworzy zwykłą sesję. Podobna domena nie wyłudzi passkey, bo przeglądarka sprawdza prawdziwy origin, a nie logo na stronie.

Autorzy uczciwie wymieniają, czego passkeys nie chronią. Skompromitowane urządzenie, skradziony cookie sesji i słabe odzyskiwanie konta nadal działają. Serwer odpowiada za autoryzację dodawania passkey do istniejącego konta, za wygaszanie wyzwań i za odzyskiwanie.

**Key takeaways:**
- Serwer przechowuje tylko klucz publiczny, prywatny nigdy nie opuszcza authenticatora.
- Wyzwanie musi być losowe, jednorazowe i wygasać po stronie serwera, a limit czasu w przeglądarce nie wystarcza.
- Passkeys chronią wymianę logowania, ale nie sesję ani procedurę odzyskiwania konta.
- Biblioteka WebAuthn generuje opcje i weryfikuje odpowiedzi, reszta zostaje po stronie aplikacji.

**Why do I care:** Jeśli kiedyś wdrażałeś logowanie, wiesz, że trudne jest to, co leży wokół kryptografii: odzyskiwanie konta i sesje. Ta strona mówi to wprost i to jest jej największa zaleta. Wolałbym, żeby napisano więcej o tym, jak sensownie zostawić hasło jako plan awaryjny, bo większość produktów nie może sobie pozwolić na jego usunięcie od razu.

**Link:** [How do passkeys work](https://howdopasskeyswork.com/)

## Poprawki Tailwinda 4.3.4 i 4.3.5 oraz skrót reszty numeru

**TLDR:** Dwie łatki do Tailwinda i kilka drobnych narzędzi z reszty numeru.

**Summary:** Wersja 4.3.4 dodaje do changeloga loader dla Turbopacka w Next.js, naprawia obsługę wariantu scope, crash wtyczki Vite w trybie bundledDev oraz problem z samodzielnymi binarkami na macOS 27. Wersja 4.3.5 przyspiesza kanonikalizację przy dużych pluginach matchVariant, naprawia crash color-mix bez metody interpolacji, wieszanie się buildu WASM w WebContainers i psucie buildu przez komentarze HTML między regułami CSS. Z biblioteki komponentów shadcn pojawiły się nowe elementy w Aceternity UI, ReUI, beUI, assistant-ui, Kokonut UI i innych. W części z polecanymi narzędziami jest natywny podgląd Markdowna dla Maca Glance, komponent react-image-editor od Unlayer oraz darmowy Handy do zamiany mowy na tekst. Pozostałe linki to listy bibliotek i reklamy, więc je pomijam.

**Key takeaways:**
- Wersje 4.3.4 i 4.3.5 to same naprawy, bez zmian łamiących.
- Turbopack ma teraz oficjalny loader w ekosystemie Tailwinda.

**Why do I care:** Jeśli masz Tailwinda w projekcie na Next.js z Turbopackiem, zajrzyj do changeloga 4.3.4. Reszta to zwykła aktualizacja patchowa, którą wrzucam bez zastanowienia.

**Link:** [Tailwind CSS v4.3.5](https://github.com/tailwindlabs/tailwindcss/releases/tag/v4.3.5)
