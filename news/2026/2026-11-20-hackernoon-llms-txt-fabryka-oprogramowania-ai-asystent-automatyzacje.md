---
title: "HackerNoon: dokumentacja czytelna dla AI, fabryka oprogramowania na 2027 i asystent, który zastępuje 2,3 etatu"
excerpt: "Trzy teksty z HackerNoon o llms.txt, wąskim gardle weryfikacji w fabryce agentów i o tym, ile naprawdę kosztuje 123 automatyzacje jednej firmy."
publishedAt: "2026-11-20"
slug: "hackernoon-llms-txt-fabryka-oprogramowania-ai-asystent-automatyzacje"
hashtags: "#hackernoon #ai #llm #agents #devtools #testing #productivity #generated #pl"
source_pattern: "HackerNoon"
---

## Jak zrobić dokumentację czytelną dla AI

**TLDR:** Dokumentacja ma dziś dwóch odbiorców, ludzi i agentów AI. Pliki llms.txt i llms-full.txt dają modelowi czystą wersję tekstową zamiast HTML-a z nawigacją i skryptami.

**Summary:** Programiści pytają asystenta o produkt, zanim otworzą dokumentację. Asystent mający do czynienia ze stroną pełną HTML-a, skryptów i stylów zgaduje, a dla nowego frameworka zgadnie wzorce z innego. Autorka sprawdziła swoją dokumentację fikcyjnego frameworka Refract narzędziem Agent Score i dostała ocenę F. Po poprawkach dostała B.

llms.txt to mapa, czyli opis strony i linki do ważnych stron z jednozdaniowymi opisami. llms-full.txt to cała dokumentacja w jednym pliku Markdown. Pierwszy jest mały i pasuje do agentów, którzy potrafią pobierać linki, drugi bywa rozmiaru megabajtów i może przekroczyć okno kontekstu. W Docusaurusie wystarczy wtyczka docusaurus-plugin-llms i pole description we frontmatterze każdej strony. Dla Markdoca autorka podaje skrypt, który przed każdym buildem generuje pliki i kopie .md stron.

**Key takeaways:**
- llms.txt to indeks, llms-full.txt to cała treść.
- Bez pola description wpis w indeksie to goły link.
- Generuj pliki w kroku prebuild, żeby się nie rozjeżdżały.

**Why do I care:** To tania zmiana, którą można zrobić w godzinę, a dla bibliotek open source ma realny skutek, bo agenci i tak czytają nasze dokumenty. Nie wiem, ile narzędzi faktycznie używa tych plików, i autorka tego nie pokazuje.

**Link:** [How To Make Your Docs AI Readable and Accessible](https://hackernoon.com/how-to-make-your-docs-ai-readable-and-accessible)

## Elementy fabryki oprogramowania AI na 2027

**TLDR:** Agenci kodujący otwierają więcej PR-ów dziennie, niż zespół przejrzy w tydzień, więc wąskim gardłem jest weryfikacja. Autor opisuje osiem klocków fabryki i przekonuje, że potrzebny jest niezależny test działającej aplikacji.

**Summary:** Fabryka według definicji Addy'ego Osmaniego to wiele pętli agentów z uprzężą, czyli piaskownicą, narzędziami, pamięcią i regułami zakończenia, nadzorowanych przez ludzi. Skala Dana Shapiro ma poziomy od autouzupełniania po "ciemną fabrykę", w której nikt nie czyta kodu. Osiem klocków to kolejka specyfikacji, agenci, wspólny kontekst jak AGENTS.md, wdrożenia podglądowe dla każdego PR, testy kodu, weryfikacja działającej aplikacji, bramka przeglądu zależna od ryzyka oraz rollback i sygnały z produkcji.

Przykład autora to przeprojektowany checkout, w którym testy i bot przeglądowy przechodzą, ale nowy układ chowa wybór zapisanej karty pod lepką belką. Diff wygląda dobrze, a klienci wracający nie zapłacą. Tę lukę ma zamykać QA.tech, platforma, której agenci dostają cel użytkownika i klikają w żywą aplikację. Tekst jest jednak w dużej mierze reklamą tego produktu, co trzeba przy czytaniu odliczyć. Sama diagnoza, że generowanie kodu skaluje się z mocą obliczeniową, a weryfikacja nie, jest rozsądna. Osmani ostrzega przed długiem zrozumienia, czyli rosnącą różnicą między ilością kodu a tym, ile z niego ktoś rozumie.

**Key takeaways:**
- Weryfikuj działającą aplikację na każdym PR, niezależnym weryfikatorem.
- Dla starych lub regulowanych systemów lepsza jest lekka fabryka z ludźmi w pętli.
- Zwiększaj autonomię agentów tylko tak szybko, jak rośnie weryfikacja.

**Why do I care:** Najbardziej zgadzam się z tym, że bot przeglądowy czyta diff, ale nie otwiera aplikacji. Autor przemilcza koszt i flaky testy takich agentów QA, a tego bym się obawiał najbardziej. Zacząłbym od wdrożeń podglądowych na każdy PR, bo to wartość niezależna od dostawcy.

**Link:** [AI Software Factory Building Blocks for 2027](https://hackernoon.com/ai-software-factory-building-blocks-for-2027)

## Asystent AI za 464 euro miesięcznie, który zastępuje 2,3 osoby

**TLDR:** Założyciel opisuje 123 zaplanowane automatyzacje kosztujące 464 euro miesięcznie, które według jego szacunków oszczędzają 361 godzin. Opowiada też o dniu, w którym 70 procent z nich zrobiło się czerwone.

**Summary:** Autor szacuje oszczędność na około 14,4 tysiąca euro miesięcznie, czyli 173 tysiące euro rocznie, przy kosztach 5,6 tysiąca. Z 361 godzin 176 to praca, na którą inaczej zatrudniłby SDR-a lub asystenta wirtualnego. Liczby to głównie szacunki godzin. Zmierzony wolumen mają tylko trzy zadania. Do rachunku nie wchodzi czas budowy, czyli weekend na dashboard i miesiąc na dopracowanie logiki.

Najciekawsza jest część o awariach. Jedno zadanie raportowało sukces przez 48 dni, mimo że jego klucz był odrzucany. Inne wysłało wiadomości na LinkedIn w niedzielę przez przesunięcie harmonogramu o jeden dzień. Czerwony dzień wynikał z jednej przyczyny, bo większość zadań działała na lokalnym komputerze, który nie był podłączony do prądu. Teraz zadania chodzą w chmurze, a lokalne na odnowionym MacBooku Pro. Strażnik w chmurze oczekuje od każdego zadania sygnału życia i milczenie traktuje jak awarię. AI może samo naprawiać zadania, ale nie ruszy nadawców wiadomości, finansów i logowań, a limit to pięć napraw dziennie i jedna na zadanie na siedem dni.

Autor zatrzymał ludzką asystentkę, bo trzyma go w ryzach i znajduje dokumenty, których AI nie znajduje. Zwolnił grafika, którego stawka to 1000 koron za godzinę. Lista rzeczy na przyszłość jest prosta. Rejestruj zadanie przed pierwszym uruchomieniem, alarmuj na ciszę i napisz niszę, klienta idealnego i KPI przed automatyzacją, a nie osiem miesięcy po. Obecnie tylko trzy zadania z 150 spełniają jego własny standard testów.

**Key takeaways:**
- Alert musi pochodzić z ciszy, bo wyłączony komputer nie zgłosi błędu.
- Sklasyfikuj awarie na naprawiane samodzielnie, po zatwierdzeniu i tylko przez człowieka.
- Najpierw kontekst biznesowy napisany ludzkim językiem, potem automatyzacja.

**Why do I care:** Liczby oszczędności to szacunki autora i traktowałbym je jak marketing. Wartościowa jest część o niezawodności, bo każdy, kto ma kilka cronów i agentów, zna problem cichych porażek. Obie historie, o kluczu odrzucanym przez 48 dni i o niepodłączonym komputerze, są bardziej przekonujące niż tabela ROI.

**Link:** [How I Built an AI Executive Assistant That Does the Work of 2.3 People](https://hackernoon.com/how-i-built-an-ai-executive-assistant-that-does-the-work-of-23-people)
