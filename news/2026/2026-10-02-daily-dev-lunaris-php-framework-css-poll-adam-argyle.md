---
title: "Własny mikroframework PHP zamiast Laravela i CSS-owy sondaż z Adamem Argyle"
excerpt: "Backendowy developer opisuje, dlaczego zbudował sobie lżejszy framework PHP zamiast kolejny raz sięgać po Laravela, a Adam Argyle komentuje wyniki ankiety o ulubionych funkcjach CSS."
publishedAt: "2026-10-02"
slug: "daily-dev-lunaris-php-framework-css-poll-adam-argyle"
hashtags: "#dailydev #php #laravel #backend #css #frontend #generated #pl"
source_pattern: "daily.dev"
---

## Chciałem prostszy framework PHP, więc go zbudowałem

**TLDR:** Backendowy developer, który latami domyślnie sięgał po Laravela, opisuje powody, dla których zbudował własny mikroframework PHP o nazwie Lunaris. Projekt stawia na minimalną liczbę zależności, architekturę jedna akcja na jedną trasę zamiast klasycznego MVC i natywne szablony PHP bez silnika templatek.

**Streszczenie:** Autor nie ukrywa, że Laravel mu się po prostu rozrósł. Dla małych aplikacji dociąganie całego ekosystemu Eloquenta, kontenera serwisów i warstwy konfiguracji zaczęło wydawać się nieproporcjonalne do rozmiaru projektów, które faktycznie pisał. Lunaris odwraca tę logikę: jedna akcja obsługuje jedną trasę, więc nie ma rozbudowanych kontrolerów z dziesiątkami metod, a cała logika konkretnego endpointu mieszka w jednym pliku, który łatwo przeczytać od góry do dołu.

Zamiast silnika szablonów w stylu Blade, Lunaris korzysta z natywnych szablonów PHP. To mniej magii i mniej warstw do debugowania, kosztem rezygnacji z wygodnych skrótów składniowych. Projekt ma też własne narzędzie CLI, Lunar, wzorowane na Artisanie z Laravela, bo nawet minimalistyczny framework potrzebuje jakiegoś sposobu na generowanie boilerplate'u. Kod jest open source na Codebergu i autor wyraźnie zaznacza, że to wczesny etap, a nie gotowy zamiennik Laravela dla każdego projektu.

**Kluczowe wnioski:**
- Lunaris minimalizuje zależności zewnętrzne i rezygnuje z wzorca MVC na rzecz jednej akcji per trasa.
- Szablony są natywnym PHP, bez osobnego silnika templatek jak Blade.
- Narzędzie CLI o nazwie Lunar odwzorowuje rolę Artisana, ale w znacznie okrojonej formie.
- Projekt hostowany jest na Codebergu, nie na GitHubie, i wciąż jest we wczesnej fazie rozwoju.

**Dlaczego mi na tym zależy:** Laravel bywa świetnym wyborem, dopóki projekt faktycznie potrzebuje tego, co oferuje. Problem zaczyna się, gdy sięgasz po niego z przyzwyczajenia do prostego API czy wewnętrznego narzędzia, gdzie Eloquent i cała reszta ekosystemu to głównie koszt poznawczy. Lunaris sam w sobie pewnie nie zastąpi Laravela w większych projektach, ale przypomina, że czasem warto zapytać, czy framework, po który sięgasz, rozwiązuje twój problem, czy tylko go komplikuje.

**Link:** [I wanted a Simpler PHP Framework, So I Built One](https://daily.dev/posts/z8pMEWfLJ)

## Front-end fast money z Adamem Argyle

**TLDR:** Lekki, rozrywkowy segment z Adamem Argyle, w którym komentuje wyniki ankiety o ulubionych funkcjach CSS: Rebecca Purple wygrywa wśród nazwanych kolorów, OKLCH jest najpopularniejszym formatem koloru, a grid pozostaje składnią, którą ludzie zapamiętują najgorzej.

**Streszczenie:** To nie jest tekst do analizy, tylko zapis szybkiej rundy pytań i odpowiedzi o gusta społeczności frontendowej. Rebecca Purple, kolor nazwany na cześć córki jednego z twórców specyfikacji CSS, wygrywa w kategorii ulubionych nazwanych kolorów, co samo w sobie mówi coś o tym, jak mocno ta historia zapadła ludziom w pamięć. OKLCH wyprzedza starsze formaty zapisu koloru, co pasuje do tego, jak szybko ten format przebił się do praktyki w ostatnich latach. Wśród właściwości CSS display bije flex i overflow, a wśród jednostek rem wygrywa z jednostką znakową ch.

Najciekawszy wynik dotyczy składni, którą najtrudniej zapamiętać: grid wyprzedza gradienty i box-shadow. To zgadza się z intuicją każdego, kto kiedyś próbował z pamięci napisać grid-template-areas bez ściągawki obok.

**Kluczowe wnioski:**
- Rebecca Purple wygrywa jako ulubiony nazwany kolor CSS.
- OKLCH jest najczęściej wskazywanym formatem zapisu koloru.
- Grid Layout to składnia, którą respondenci najczęściej muszą sobie przypominać na nowo.

**Dlaczego mi na tym zależy:** To czysto rozrywkowy materiał, ale wynik z grid-em trafia w sedno realnego problemu dydaktycznego: grid ma dużo mocy, ale jego składnia nie trzyma się w głowie tak łatwo jak flexbox. Jeśli uczysz kogoś CSS-a albo wdrażasz juniora, to sygnał, żeby traktować grid jako temat wymagający ściągawki pod ręką, a nie coś, co wystarczy raz przerobić.

**Link:** [Front-end fast money with Adam Argyle](https://daily.dev/posts/yf9B58pww)
