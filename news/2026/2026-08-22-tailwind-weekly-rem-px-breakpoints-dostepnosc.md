---
title: "Domyślne breakpointy Tailwinda w rem: dostępność, którą wybrałeś, czy dostępność, którą odziedziczyłeś"
excerpt: "Tailwind od wersji 3.2 liczy breakpointy w rem, nie w px, co wiąże twój layout z ustawieniem domyślnego rozmiaru czcionki w przeglądarce użytkownika, a nie tylko z zoomem strony."
publishedAt: "2026-08-22"
slug: "tailwind-rem-px-breakpoints-dostepnosc-czcionka"
hashtags: "#tailwindweekly #tailwindcss #css #accessibility #responsive #frontend #generated #pl"
source_pattern: "Tailwind Weekly"
---

## Breakpointy w rem: dostępność, o której nikt cię nie uprzedził

**TLDR:** Od Tailwinda 3.2 breakpointy sm, md, lg, xl i 2xl są zdefiniowane w rem, nie w px, i ta jednostka nie reaguje na `html { font-size }` w twoim CSS, tylko na ustawienie domyślnego rozmiaru czcionki w przeglądarce użytkownika. To realny wybór dostępnościowy, ale ma koszt: layout, który testowałeś przy 16px, może się przełamać przy innej wartości, o której nawet nie wiesz, że użytkownik ją zmienił.

**Summary:** Punktem wyjścia jest historia z produkcji: layout łamał się u jednego użytkownika w sposób niemożliwy do odtworzenia, mimo identycznego viewportu co w testach. Winowajcą było ustawienie domyślnego rozmiaru czcionki w przeglądarce, zmienione na coś innego niż 16px, przez co breakpointy Tailwinda przesunęły się względem szerokości ekranu. Kluczowa pułapka jest subtelna. Instynkt mówi, że rem w media query zależy od `html { font-size }` w arkuszu stylów, tak jak rem w tekście. To nieprawda. Specyfikacja Media Queries Level 4 mówi wyraźnie, że jednostki względne w warunkach media query liczą się od wartości początkowej, ignorując deklaracje autora strony. Twój CSS nie ma tu żadnej władzy.

Druga część, ta, o której mało kto pisze, jest ciekawsza. Wartość początkowa nie jest zahardkodowanym 16px na zawsze, to wartość, od której startuje agent użytkownika, a użytkownik ma na nią wpływ przez ustawienie domyślnego rozmiaru czcionki w przeglądarce (Chrome: `chrome://settings/fonts`, Firefox: `about:preferences` w sekcji czcionek). Ta zmiana faktycznie przesuwa breakpointy w rem i em. Page zoom robi to samo, ale w dodatku skaluje też breakpointy w px, bo działa na poziomie renderowania całej strony, nie samych jednostek. Autor CSS nie ma nad tym kontroli w żadnym z tych przypadków, gdy mówimy o breakpointach. To trzy różne gesty użytkownika z trzema różnymi konsekwencjami, i warto znać tę tabelkę na pamięć, jeśli w ogóle debatujesz o rem kontra px.

Konsekwencja praktyczna: przy rem breakpointach użytkownik, który zwiększa domyślną czcionkę do 24px, bo 16px jest dla niego nieczytelne, dostaje layout, który przesuwa się razem z tym tekstem, dając więcej miejsca na większe litery. Przy px breakpointach ten sam użytkownik ma większy tekst wciśnięty w kolumny zaprojektowane pod 16px, co często wygląda jak zepsuty layout, bo w praktyce jest zepsuty. Ale odwrotna strona medalu też jest realna: komponent z wąskimi wewnętrznymi breakpointami może zmienić układ w połowie przewijania u kogoś z inną czcionką domyślną, a ty nigdy tego nie zobaczysz na swoim ekranie, bo nikt w zespole nie testuje pod zmienione ustawienia czcionki przeglądarki.

Autor jest precyzyjny co do standardów: WCAG 1.4.4 wymaga możliwości powiększenia tekstu do 200%, i page zoom jest wystarczającą techniką w oczach W3C, więc px breakpointy nie łamią standardu, mimo że nie honorują ustawienia domyślnej czcionki. Wybór rem to decyzja, by pójść dalej niż wymaga standard, nie decyzja, by go w ogóle spełnić. Dla kogoś, kto chce przełączyć się na px w Tailwind v4, wystarczy nadpisać zmienne w `@theme` (`--breakpoint-sm: 640px` itd.), w v3 to `screens` w konfiguracji.

**Key takeaways:**
- Rem i em w media queries liczą się od wartości początkowej ustawionej przez przeglądarkę, nie od `html { font-size }` w twoim CSS.
- Zmiana domyślnego rozmiaru czcionki w przeglądarce przesuwa breakpointy w rem/em, ale nie w px. Page zoom przesuwa oba typy breakpointów.
- Rem breakpointy dają więcej miejsca użytkownikom z większą domyślną czcionką, ale przy nieprzetestowanych layoutach mogą łamać design w nieoczekiwanych szerokościach.
- Px breakpointy spełniają WCAG 1.4.4 dzięki page zoom, więc wybór rem to decyzja, by przekroczyć standard, nie żeby go dopełnić.

**Why do I care:** To jest ten rodzaj domyślnego ustawienia, które kopiujesz z template do template przez lata, bez zastanowienia, i które nagle zaczyna boleć w produkcji w sposób trudny do zreprodukowania, bo źródło problemu leży w ustawieniach systemowych jednego użytkownika. Jako architekt frontendu wolę rem breakpointy zostawić jako domyślne, ale świadomie, i dopisać do checklisty testowej: przetestuj layout przy zwiększonym domyślnym rozmiarze czcionki w przeglądarce, nie tylko przy zoomie. To pięć minut w DevTools, a ratuje przed zgłoszeniem od użytkownika, którego nie umiesz odtworzyć tydzień później, bo zapomniałeś zapytać o jedno ustawienie, o którym większość zespołu nawet nie wie, że istnieje.

**Link:** [Can we make default tailwind a more accessible choice?](https://spatie.be/blog/can-we-make-default-tailwind-a-more-accessible-choice)
