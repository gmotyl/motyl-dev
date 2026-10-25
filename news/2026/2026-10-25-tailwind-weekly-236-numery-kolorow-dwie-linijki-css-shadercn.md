---
title: "Tailwind Weekly #236: co znaczy 500 w blue-500, dwie linijki CSS za 80 klatek i shadery jako komponenty"
excerpt: "Numery odcieni w paletach kolorów znaczą co innego w każdym systemie, dwie linijki CSS potrafią uratować animację w Firefoksie, a shadercn dostarcza shadery WebGPU przez shadcn."
publishedAt: "2026-10-25"
slug: "tailwind-weekly-236-numery-kolorow-dwie-linijki-css-shadercn"
hashtags: "#tailwindweekly #tailwindcss #css #accessibility #performance #animation #shadcn #react #generated #pl"
source_pattern: "Tailwind Weekly"
---

## Co naprawdę znaczy 500 w blue-500

**TLDR:** Autor porównuje, jak różne systemy designu numerują odcienie kolorów, i pokazuje, że ten sam numer w Tailwindzie daje różny kontrast w różnych barwach. Tylko część palet daje gwarancję, że numer coś mówi o czytelności.

**Summary:** Punkt wyjścia jest prosty. Biały tekst na przycisku w kolorze blue-600 ma w Tailwindzie 3 kontrast 5,17 do 1 i przechodzi poziom AA z WCAG. Taki sam przycisk sukcesu na green-600 ma 3,30 do 1 i pada. Oba używają odcienia 600, a wynik jest zupełnie inny. Autor tłumaczy, że numer w skali znaczy zależnie od palety jedną z czterech rzeczy: pozycję w rampie, gwarantowaną różnicę kontrastu, zmierzoną jasność albo rolę koloru.

Material Design z 2014 roku i Tailwind, który skalę od niego pożyczył, numerują po pozycji. Powód jest techniczny. Rampy budowane krokami jasności w HSL niosą ze sobą różnicę w postrzeganej jasności, bo żółty i niebieski mają w HSL tę samą jasność, a oko widzi je zupełnie inaczej. W Tailwindzie 3 odcienie 500 mają jasność OKLCH od 0,585 dla indygo do 0,795 dla żółtego. W efekcie tekst w odcieniu 200 na tle 700 przechodzi AA w fiolecie, a w dwunastu z siedemnastu rodzin kolorów nie przechodzi.

Carbon od IBM, USWDS, paleta Stripe'a i Material 3 robią inaczej. W Carbonie różnica 50 między dwoma stopniami gwarantuje kontrast co najmniej 4,5 do 1, w Material 3 działa to samo na poziomie tonu, a w USWDS nazywa się to magiczną liczbą. Radix idzie jeszcze dalej i numeruje dwanaście kroków według roli, więc wybierasz krok dwunasty na tekst, a nie liczbę do sprawdzenia. Cena takiej spójności to ciemny, oliwkowy żółty na środku skali, bo jasny żółty po prostu nie mieści się na tej jasności.

Autor wspomina też o kontraście. Wzór WCAG 2 jest symetryczny, więc szary tekst na bieli i na czerni daje podobny wynik, a APCA ocenia drugi układ o ponad połowę gorzej. WCAG 3 nie ma jeszcze rozstrzygnięcia, a APCA wypadło z roboczej wersji w lipcu 2023. Na koniec jest wątek o Tailwindzie 4. Zmiana palety na OKLCH zachowała jasność w 220 z 242 odcieni, więc kontrast prawie się nie zmienił, a numery nadal opisują pozycję, nie jasność.

**Key takeaways:**
- Ten sam numer odcienia w Tailwindzie nie gwarantuje tego samego kontrastu w różnych barwach.
- Carbon, USWDS i Material 3 pozwalają zapisać regułę kontrastu raz dla całej palety.
- Radix numeruje po roli, więc nie trzeba sprawdzać par.
- Przejście Tailwinda 4 na OKLCH prawie nie ruszyło kontrastu.

**Why do I care:** W code review nadal widzę zdania w stylu "tekst 200 na tle 700" i nikt nie sprawdza, że w żółtym to nie działa. Jeśli budujesz design system na Tailwindzie, tokeny semantyczne z własnym testem kontrastu są obowiązkowe, a nie opcjonalne. Autor milczy o jednej rzeczy: większość zespołów i tak nie przepisze palety, więc praktyczna rada brzmi "dodaj test kontrastu do CI", a tego w tekście zabrakło.

**Link:** [What the 500 in Blue-500 Means](https://www.hipuku.dev/writing/what-the-500-in-blue-500-means)

## Dwie linijki CSS, które zabiły wydajność animacji

**TLDR:** Animacja kropkowanej maski na tle strony działała płynnie w Chrome, ale w Firefoksie spadała z 120 do 40 klatek. Naprawiło to zamienienie animacji pozycji maski na przesuwanie całego elementu.

**Summary:** Autor zbudował tło ze skośnie płynącymi kolorowymi kropkami. Siatka kropek to maska nałożona na gradient, a animacja przesuwała pozycję tej maski. W Chrome wyglądało to dobrze, ale licznik malowania pokazywał ponad tysiąc operacji paint w kilka sekund. W Firefoksie to samo było tak ciężkie, że autor wyłączył animację.

Wyjaśnienie opiera się na potoku renderowania: layout, paint i composite. Właściwości takie jak translate i opacity potrafią ominąć dwa pierwsze etapy i pójść na GPU, a pozycja maski nie. Autor uczciwie zaznacza, że w Firefoksie nie miał jak zmierzyć liczby malowań, więc teoria o niegrupowaniu masek jest jego domysłem.

Poprawka polega na tym, żeby nie animować maski, tylko przesuwać cały element o rozmiar jednej kropki. Po zmianie element maluje się dwa razy zamiast ponad tysiąca. Skutek uboczny to pusty pasek na brzegu, który zamyka się przez powiększenie kontenera o rozmiar maski.

**Key takeaways:**
- Animuj transform i opacity, a nie właściwości wymagające malowania.
- Licznik paint w narzędziach przeglądarki szybko pokazuje źródło problemu.
- Dla efektu powtarzalnego wzoru wystarczy przesunięcie o jeden okres.

**Why do I care:** To podręcznikowy przykład, że "działa w Chrome" nie znaczy "jest wydajne". Tekst jest z 2024 roku, więc ten przypadek jest stary, ale mechanizm się nie zmienił. Autor nie sprawdza, czy we współczesnym Firefoksie problem nadal występuje, i tego mi brakuje, zanim zacznę przepisywać własne tła.

**Link:** [The Two Lines of CSS That Tanked Performance (120fps to 40fps)](https://component-odyssey.com/articles/13-improving-performance-by-changing-two-lines-of-css)

## shadercn: komponenty shaderów WebGPU dla Reacta

**TLDR:** Biblioteka dostarcza komponenty shaderów w WGSL dla Reacta, zbudowane na vgpu i TypeGPU i instalowane przez rejestr shadcn.

**Summary:** Strona jest krótka. Instalacja jednym poleceniem dodaje komponent, na przykład orb, w stylu znanym z shadcn, czyli kod trafia do projektu. Shadery działają na WebGPU, więc zakres przeglądarek jest węższy niż przy WebGL. Strona oferuje też indeks llms.txt i opis umiejętności dla agentów.

**Key takeaways:**
- Shadery jako komponenty kopiowane do repozytorium, a nie zależność z pakietu.
- Wymagają obsługi WebGPU po stronie użytkownika.

**Why do I care:** Efekty w tle to klasyczne miejsce, gdzie ląduje kilkaset kilobajtów JavaScriptu bez mierzenia. Model shadcn pozwala przynajmniej zajrzeć w kod. Zanim to wdrożysz, sprawdź zachowanie na słabszym GPU i fallback bez WebGPU, bo strona o tym nic nie mówi.

**Link:** [shadercn](https://www.shadercn.run/)
