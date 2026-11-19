---
title: "Frontend Focus: State of HTML 2026, Modern Web Guidance i API Cross-Origin Storage"
excerpt: "Wyniki ankiety State of HTML 2026, test agentów AI z wytycznymi Chrome dla webu oraz propozycja współdzielenia dużych zasobów między witrynami."
publishedAt: "2026-11-18"
slug: "frontend-focus-state-of-html-2026-modern-web-guidance-cross-origin-storage"
hashtags: "#frontendfocus #frontend #html #css #webdev #accessibility #performance #ai #generated #pl"
source_pattern: "Frontend Focus"
---

## State of HTML 2026

**TLDR:** Ankieta pokazuje, że wygrywają funkcje deklaratywne, a formularze nadal są bolączką. Popover API jest już w około 40% użycia, bo działa we wszystkich głównych przeglądarkach.

**Summary:** Najczęściej używane elementy interaktywne to details i summary (72,5%) oraz dialog (67,8%). Popover API sięgnęło 40%, odkąd obsługują je wszystkie duże przeglądarki. Najtrudniejsze do ostylowania są select i pola dat, a konfigurowalny select to funkcja najbardziej hamowana przez wsparcie przeglądarek, bo Firefox jeszcze go nie wypuścił. Użycie datalist skoczyło z 30 do 44%, ale pozytywne nastawienie spadło z 44 do 34%, z powodu stylowania, dostępności i błędów. Na liście życzeń są natywne tabele z sortowaniem i filtrowaniem, przed zakładkami, comboboxami i przełącznikami.

Kilian Valkhof z Polypane widzi w podsumowaniu, że frustracja przesuwa się z różnic między przeglądarkami na to, że przeglądarki po prostu jeszcze nie nadążyły, zwłaszcza mobilne systemy. Kończy zdaniem, że branża może być w turbulencjach, ale fundament jest w dobrym stanie.

**Key takeaways:**
- Elementy deklaratywne wygrywają z własnym JavaScriptem.
- Formularze, szczególnie select i daty, wciąż są najgorsze do stylowania.
- Natywne tabele danych to najbardziej wyczekiwany element.

**Why do I care:** Wyniki ankiety to dobra ściągawka, na których natywnych elementach można dziś oprzeć komponenty bez biblioteki. Dialog i popover opłaca się brać natywnie, a przy selekcie i datalist liczyłbym się z kosztem obejść.

**Link:** [State of HTML 2026 (Devographics)](https://frontendfoc.us/)

## Najczęstsze błędy AI w web developmencie i Modern Web Guidance

**TLDR:** Zespół Chrome przetestował agentów kodujących. Bez wskazówek zdają około połowy kontroli dobrych praktyk, z zainstalowanym Modern Web Guidance około 90%.

**Summary:** Philip Walton z Google opisuje, że frontierowe agenty bez prowadzenia przechodzą tylko około 50% sprawdzeń dobrych praktyk webowych. Najczęściej mylą się w dostępności, wydajności i bezpieczeństwie. Po zainstalowaniu Modern Web Guidance wynik rośnie do około 90%. Obok pojawia się propozycja API Cross-Origin Storage od Thomasa Steinera z zespołu Chrome, które pozwoliłoby witrynom współdzielić duże zasoby, takie jak modele AI, fonty czy popularne biblioteki, tak że użytkownik pobiera je tylko raz.

Brakuje tu odpowiedzi na pytanie o prywatność. Współdzielony cache między domenami był wyłączony właśnie ze względu na wyciek informacji o odwiedzonych stronach, więc kluczowe są szczegóły zabezpieczeń propozycji. Wyniki 50 i 90% pochodzą z testów samego zespołu Chrome.

**Key takeaways:**
- Agenci AI nadal systematycznie gubią dostępność, wydajność i bezpieczeństwo.
- Wytyczne dostarczone agentowi podnoszą wynik testów o około 40 punktów procentowych.
- Cross-Origin Storage to na razie propozycja, nie wdrożona funkcja.

**Why do I care:** Jeśli agent generuje u ciebie komponenty, wytyczne w kontekście to tani sposób na mniej błędów a11y. Przy zasobach współdzielonych między witrynami poczekałbym na ocenę prywatności.

**Link:** [Top 10 things AI gets wrong in web development](https://frontendfoc.us/)

## W skrócie: jQuery 4.1, Chrome 158, Arc i przestrzenny CSS w WebKit

**TLDR:** Wyszły jQuery 4.1 i 3.8, Chrome 158 trafił na stabilny, a WebKit pokazał CSS do ustawiania obiektów 3D.

**Summary:** jQuery 3.8 jest ostatnim planowanym wydaniem funkcjonalnym linii 3.x, która dostaje już tylko krytyczne poprawki. Przewodnik You Don't Need jQuery dostał duży remont, w którym zamiast zapasowych rozwiązań dla IE są nowoczesne jednolinijkowce. Chrome 158 wprowadza element install, pseudoklasy stanu mediów jak playing i paused oraz początek etapowego usuwania XSLT. Przeglądarka Arc kończy działanie 22 grudnia. Zwraca też uwagę ostrzeżenie o skracaczach linków: stare linki Bitly zostały niedawno przejęte i przekierowują gdzie indziej.

Z narzędzi wartych uwagi są wykresy zbudowane tylko z HTML i CSS od Keitha Cirkela, które bez stylów zostają czytelnymi tabelami, tekst Sary Soueidan o właściwościach caret oraz opis Jen Simmons, co oznacza Safari na kwadratowym wyświetlaczu Apple HomeView. WebKit pokazał też wczesny podgląd przestrzennego CSS do układania obiektów 3D, tylko w Safari na visionOS za flagą.

**Key takeaways:**
- Linia jQuery 3.x przechodzi w tryb krytycznych poprawek.
- XSLT w Chrome wchodzi w fazę wygaszania.
- Skrócone linki to ryzyko, jeśli usługa zmieni właściciela.

**Why do I care:** Z tego zestawu zrobiłbym dwie rzeczy w praktyce: sprawdziłbym, czy ktoś u nas jeszcze używa XSLT, i przejrzał linki skrócone w materiałach publicznych.

**Link:** [Frontend Focus: What developers think of HTML right now](https://frontendfoc.us/)
