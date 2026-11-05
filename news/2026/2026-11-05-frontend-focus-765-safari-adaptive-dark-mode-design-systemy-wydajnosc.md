---
title: "Frontend Focus #765: Safari przyciemni Twoją stronę, a design systemy są wolniejsze, niż myślisz"
excerpt: "Adaptive Dark Mode w Safari 27.3 beta oraz test wydajności dziesięciu design systemów, w którym lista krajów w Ionic otwiera się ponad sekundę."
publishedAt: "2026-11-05"
slug: "frontend-focus-765-safari-adaptive-dark-mode-design-systemy-wydajnosc"
hashtags: "#frontendfocus #css #html #webdev #performance #accessibility #stencil #generated #pl"
source_pattern: "Frontend Focus"
---

## Safari przyciemni Twoją stronę. Adaptive Dark Mode

**TLDR:** Safari 27.3 beta potrafi samo przerobić jasną stronę na ciemną, jeśli użytkownik włączy tę opcję. Strony z deklaracją color-scheme nie są ruszane.

**Summary:** WebKit podaje liczby, które tłumaczą po co to powstało. Prawie 40% wejść na strony pochodzi od użytkowników w trybie ciemnym, ale tylko 10% stron ma wersję ciemną. Adaptive Dark Mode ma tę lukę zasypać po stronie przeglądarki.

Mechanizm działa tak. Safari sprawdza, czy strona deklaruje obsługę ciemnego trybu przez meta color-scheme albo właściwość CSS. Jeśli tak, nic nie zmienia. Jeśli nie, szacuje, czy strona jest głównie jasna, i wtedy odwraca luminancję kolorów z zachowaniem barwy. Tekst dostaje kontrast zgodny z WCAG 4.5:1, jasne gradienty ciemnieją, a ikony i logo w SVG są analizowane i korygowane. Większość obrazów rastrowych zostaje bez zmian, poza prostymi czarno-białymi logo wykrywanymi histogramem pikseli. Zawartość canvas nie jest ruszana, a maski i mix-blend-mode bywają wyłączane.

Ważny jest aspekt prywatności. Strona nie może wykryć, że tryb jest aktywny. JavaScript zapytany o kolory CSS dostaje oryginalne wartości, a obrazy rysowane na canvas wracają w oryginale. WebKit chce w ten sposób uniknąć nowego źródła fingerprintingu.

Jeśli nie chcesz, żeby przeglądarka cokolwiek zmieniała, deklarujesz light only. W becie 1 słowo kluczowe only jeszcze nie działa. Najlepiej oczywiście zrobić własny ciemny motyw z light-dark(), prefers-color-scheme i zmiennymi CSS.

**Key takeaways:**
- Deklaracja color-scheme wyłącza automatyczne przyciemnianie.
- Bitmapowe logo na przezroczystym tle i SVG zamiast sprite'ów dają najlepszy efekt.
- Safari ukrywa przed skryptami fakt przetworzenia kolorów.
- Opcja light only jeszcze nie działa w becie 1.

**Why do I care:** To pierwsza przeglądarka, która traktuje brak ciemnego motywu jak błąd do naprawienia za Ciebie. Dla zespołów utrzymujących stare aplikacje to dobra i zła wiadomość, bo ktoś zobaczy Twój produkt w kolorach, których nigdy nie testowałeś. Dodałbym deklarację color-scheme do listy kontrolnej każdego projektu, nawet jeśli nie planujesz ciemnego motywu.

**Link:** [Introducing Adaptive Dark Mode](https://webkit.org/blog/18541/introducing-adaptive-dark-mode/)

## Design systemy powinny być szybkie domyślnie

**TLDR:** Denodell przetestował dziesięć popularnych design systemów na liście 249 krajów i zaznaczaniu 100 checkboxów. Wyniki różnią się o rząd wielkości i nie zależą wprost od frameworka.

**Summary:** Autor zaczyna od obserwacji, że zespoły design systemów dbają o dostępność, ale rzadko o wydajność. Testy komponentów zwykle używają kilku elementów, więc problemy wychodzą dopiero w prawdziwej aplikacji, gdzie zespół produktowy nie może ich naprawić.

Testował Mantine, Ant Design, Material UI, React Spectrum, Carbon, Fluent, Web Awesome, UI5, Spectrum Web Components i Ionic, w Chrome 155 z procesorem spowolnionym czterokrotnie. Otwarcie listy krajów trwało od 61 ms we Fluent i 63 ms w Carbon do 1266 ms w Ionic, czyli ponad pięć razy dłużej niż drugi od końca React Spectrum z 227 ms. Przy zaznaczaniu stu checkboxów najszybszy był Fluent z 29 ms, a najwolniejszy Ant Design z 421 ms, sześć razy wolniej niż Material UI, choć oba są w Reakcie.

Przyczyny są konkretne. W Ionic radio group nie używa shadow DOM, więc Stencil sam obsługuje sloty i przy każdym dodanym elemencie przegląda wszystkie poprzednie trzy razy. Czas rośnie więc szybciej niż liniowo. Stencil v5 ma włączyć to ustawienie domyślnie, więc problem może się rozlać na inne systemy. W UI5 połowę czasu zjada renderowanie, bo 249 opcji siedzi już w DOM w ukrytym popoverze i przeglądarka stylizuje około 1500 elementów naraz. Ant Design wirtualizuje listę i dlatego otwiera ją szybciej niż Material UI. React Spectrum, mimo wirtualizacji, ma layout thrashing w React Aria, bo dla każdej opcji sprawdza widoczność, czyści wysokość i mierzy rozmiar. W checkboxach Ant Design większość czasu to animacje kolorów tła i obramowania, a po ich wyłączeniu zaznaczanie trwa mniej niż jedną trzecią.

Autor proponuje testy wydajności w Playwright z budżetami, na przykład 300 ms na otwarcie i 100 ms na najdłuższą blokadę UI. Jego ulubiony test sprawdza, czy podwojenie liczby opcji nie więcej niż dwuipółkrotnie wydłuża czas. Dodatkowo radzi dokumentować, ile elementów komponent został przetestowany, oraz publikować w notatkach wydania pomiary przed i po.

Warto pamiętać, że to jeden sprzęt, jedna przeglądarka i dwa scenariusze. Autor sam to zastrzega i prosi, żeby nie traktować tego jako rankingu.

**Key takeaways:**
- Wydajność komponentu zależy od implementacji, nie od frameworka.
- Test skalowania, czyli czas dla N i 2N elementów, jest tani i niezależny od sprzętu.
- Wirtualizacja pomaga, ale wymaga uwagi na klawiaturę i czytniki ekranu.
- Animacje animowane na głównym wątku kosztują, gdy odpalają się setki naraz.

**Why do I care:** Jeśli utrzymujesz firmowy design system, to jest gotowy plan na jeden sprint. Wybór biblioteki komponentów też warto sprawdzać pomiarem na własnych danych, bo lista 500 opcji w Twojej aplikacji jest bardziej prawdopodobna niż demo z trzema. Autor omija jeszcze pytanie, jak często użytkownicy faktycznie trafiają na takie ekstremalne przypadki, ale koszt testu jest tak niski, że to nie jest wymówka.

**Link:** [Design Systems Should Be Fast by Default](https://denodell.com/blog/design-systems-should-be-fast-by-default)

## Pozostałe pozycje z numeru

**TLDR:** Reszta wydania to linki, które warto przejrzeć, ale bez własnego omówienia w tym artykule.

**Summary:** W numerze są jeszcze między innymi notatki do Chrome 158, natywny układ masonry z CSS grid lanes, rozważania Rachel Andrew o uogólnianiu funkcji w CSS, praktyczne presety dla @custom-media oraz kilka tekstów o bezpieczeństwie zewnętrznych skryptów, w tym o kradzieży 2,6 mln dolarów w kryptowalutach przy zbyt luźnym CSP Polymarketu. Nie omawiam ich szczegółowo, bo w tym przebiegu nie pobierałem ich treści.

**Key takeaways:**
- Natywny masonry w CSS grid lanes jest już opisywany w tutorialach.
- Polityka CSP i Subresource Integrity wracają jako temat bezpieczeństwa.

**Why do I care:** Z tej listy sprawdziłbym najpierw tekst o CSP, bo to jedyny temat, który może kosztować realne pieniądze. Resztę czytam, kiedy coś z tego trafi do projektu.

**Link:** [Safari will 'dark mode' your site for you](https://frontendfoc.us/issues/765)
