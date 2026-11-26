---
title: "Frontend Focus: co dziś potrafi przeglądarka, Nudeps, Firefox 161 i alfa Ladybirda"
excerpt: "Lista nowych możliwości przeglądarek, importy z npm bez bundlera, CSS random() w Firefoksie i dane o tym, że strony przestały tyć."
publishedAt: "2026-11-25"
slug: "frontend-focus-co-mozna-zrobic-w-przegladarce-nudeps-ladybird"
hashtags: "#frontendfocus #frontend #css #html #webdev #performance #open-source #generated #pl"
source_pattern: "Frontend Focus"
---

## Co można zrobić bezpośrednio w przeglądarce

**TLDR:** Numer zbiera możliwości przeglądarek, które łatwo przeoczyć, nowe narzędzie do importu paczek npm bez bundlera, premierę Firefoksa 161 z funkcją random() w CSS oraz alfę przeglądarki Ladybird. Do tego dane z HTTP Archive o tym, że ciężar stron przestał rosnąć.

**Summary:** Pierwszy temat to lista Luigiego De Rosy, kontynuacja popularnego zestawienia browser-2020. Pokazuje mniej znane funkcje przeglądarek, wśród nich HTML w canvasie, element model, HDR, AI uruchamiane na urządzeniu i API sprzętowe, a przy każdej jest tabela wsparcia. Drugi to Nudeps, nowe narzędzie Lei Verou i Dmitrija Sharabina. Pozwala zainstalować pakiety z npm i importować je po nazwie prosto w przeglądarce, bez bundlera. Opiera się na jej tekście o tym, że zależności webowe są zepsute.

Andy Bell w osobnym eseju podsumowuje rok, w którym bańka AI przemodelowała branżę. Argumentuje, że programiści to coś więcej niż „klepacze kodu", i zachęca do inwestowania w ludzi, budowania ręcznie i utrzymywania niezależnego publikowania. W skrócie: Firefox 161 dodaje funkcję random() w CSS, dołączając do Chrome i Safari, oraz Compression Dictionary Transport. Ladybird, próba zbudowania silnika od zera, jest w alfie na macOS i Linuksa, a Simon Willison nazywa go ogromnie ambitnym projektem. Mozilla pisze, że po trzech latach DMA nie otworzyło iOS na przeglądarki bez WebKit, a Komisja Europejska ma rozmawiać z Apple.

Wśród artykułów wyróżnia się analiza Sandera van Surksuma: mediana strony mobilnej urosła w ciągu roku tylko o 7 KB JavaScriptu, więc tempo tycia stron się wypłaszcza. Andy Clarke proponuje układy wykraczające poza dwanaście kolumn, a Chris Coyier opisuje, dlaczego zapytanie scroll-state() zapętla się w kurczącym się pasku bocznym. W narzędziach są między innymi Button Sounds od Josha Comeau, wllama 4.0 uruchamiająca modele GGUF w przeglądarce z podwojoną szybkością, relative-time 5.5 od GitHuba i Intro.js na licencji AGPL. Pominąłem sekcje sponsorowane Meticulous, Foxit i Tiger Data. Na koniec: arcade z szesnastoma grami na stronie 404 Kirupy.

**Key takeaways:**
- Nudeps pozwala importować paczki z npm po nazwie bez bundlera.
- Firefox 161 wprowadza random() w CSS, teraz we wszystkich głównych przeglądarkach.
- Ladybird jest w alfie na macOS i Linuksa.
- Mediana strony mobilnej dołożyła w rok tylko 7 KB JavaScriptu.
- wllama 4.0 podwaja szybkość modeli GGUF w przeglądarce.

**Why do I care:** Nudeps jest ciekawy jako eksperyment, ale dopóki nie ma historii z wersjonowaniem, lockfile'ami i bezpieczeństwem łańcucha dostaw, nie wprowadzę go do produkcji. Dane o wadze stron cieszą, lecz mediana ukrywa ogon, a ten bywa tragiczny. Przy okazji: random() w CSS znika z listy rzeczy, których nie można użyć, więc warto sprawdzić, co dziś robimy w JS dla losowych układów.

**Link:** [Frontend Focus: The things you can now do directly in the browser](https://github.com/luruke/browser-2020)
