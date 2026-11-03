---
title: "gp-grid kontra AG Grid, skille do generowania mediów i instrukcje dla agentów, które tłumaczą powód"
excerpt: "Darmowa tabela danych w TypeScripcie, pakiet skilli Scenario dla agentów, słownik skrótów i18n oraz porada, jak pisać AGENTS.md."
publishedAt: "2026-11-03"
slug: "dailydev-gp-grid-scenario-skills-i18n-agents-md"
hashtags: "#dailydev #frontend #typescript #react #vue #angular #performance #agents #i18n #generated #pl"
source_pattern: "daily.dev"
---

## gp-grid: darmowa tabela danych dla Reacta, Vue i Angulara

**TLDR:** gp-grid to otwartoźródłowa tabela danych w TypeScripcie na licencji Apache 2.0, bez zależności uruchomieniowych. Grupowanie wierszy, tabele przestawne i wirtualne przewijanie dostajesz bez płatnego poziomu enterprise.

**Summary:** Autor opublikował bibliotekę, która ma być odpowiedzią na model, w którym najciekawsze funkcje tabel siedzą za licencją enterprise. Grupowanie wierszy, pivoty i wirtualizacja są tu w podstawowej wersji. Działa z Reactem, Vue i Angularem, a rdzeń nie ciągnie żadnych zależności.

Najwięcej uwagi poświęcono benchmarkowi na milionie wierszy. Autor podaje średnio 56,2 klatki na sekundę podczas przewijania, 652 milisekundy na sortowanie rosnące, 188 milisekund na filtrowanie tekstu i około 255 megabajtów pamięci. W porównaniu z AG Grid z lipca 2026 paczka gp-grid waży około 80 kilobajtów, a AG Grid około 307. Warto dodać, że test dotyczył wersji 0.19.0 pakietu dla Reacta, a nie nowszej wersji 1.0.

Tyle że to benchmark autora, na jego danych i jego sprzęcie. Nie wiemy, jak wygląda edycja komórek, dostępność z czytnikiem ekranu, kopiowanie zakresów czy eksport, czyli rzeczy, na których tabele zwykle się wykładają w prawdziwym projekcie. Porównanie rozmiaru paczki też jest wygodne, bo AG Grid robi po prostu więcej.

**Key takeaways:**
- Apache 2.0 i zero zależności uruchomieniowych.
- Grupowanie, pivoty i wirtualizacja bez płatnego poziomu.
- Wyniki pochodzą z benchmarku autora na wersji 0.19.0, nie na 1.0.

**Why do I care:** Tabela danych to zwykle komponent, którego nikt nie chce pisać samemu i którego wymiana boli najbardziej. Jeśli korzystasz z AG Grid tylko po to, żeby dostać grupowanie, ta biblioteka jest warta godziny na prototyp. Zanim ją wybierzesz do produkcji, sprawdź dostępność i edycję, bo tam kończą się mikrobenchmarki.

**Link:** [gp-grid: A Free, Open-Source TypeScript Data Grid for React, Vue, and Angular (No Paywalled Features)](https://daily.dev/posts/CvSWpawvH)

## Scenario skills: ponad 70 skilli do generowania obrazów, wideo, audio i 3D

**TLDR:** Repozytorium Scenario pakuje skille, które uczą agentów kodujących, takich jak Claude Code, Cursor, Codex czy Copilot, generować zasoby graficzne przez serwer MCP Scenario. Są też osobne narzędzia do programów DCC i silników gier.

**Summary:** Skille obejmują obrazy, wideo, audio, grafikę do gier, 3D oraz spójność postaci i marek. Są też przewodniki dla konkretnych modeli, jak GPT Image, Veo czy Kling. Pomysł jest taki, że agent sam dobiera model, pokazuje cenę przed wydaniem pieniędzy i pilnuje, żeby postać wyglądała tak samo w kolejnych ujęciach.

Druga część to tak zwane narzędzia eksperckie, które sterują ZBrush 2026, Blenderem 5.2, Mayą 2027, Unreal Engine 5.8, Unity 6.3 LTS i Godotem 4.7. Powstały na bazie tutoriali i dokumentacji. Instalacja to jedno polecenie dla skilli i jedno dodanie serwera MCP.

Nie dowiadujemy się, jak to działa w praktyce. Opis repozytorium nie mówi, jak często agent wybiera zły model, ani ile kosztuje błąd, zanim zadziała mechanizm wyceny z góry.

**Key takeaways:**
- Ponad 70 skilli dla obrazów, wideo, audio i 3D.
- Osobne narzędzia sterujące Blenderem, Unreal Engine, Unity i innymi.
- Działa przez serwer MCP Scenario, więc zależysz od zewnętrznej usługi.

**Why do I care:** Dla frontendowca to głównie pokaz, że skille stają się normalnym sposobem dystrybucji wiedzy o narzędziach. Jeśli robisz landing page i potrzebujesz spójnych grafik, możesz to sprawdzić. Jeśli nie, zapamiętaj sam wzorzec: skill plus MCP zamiast własnych skryptów.

**Link:** [GitHub - scenario-labs/skills](https://daily.dev/posts/K81cGIyAL)

## Lokalizacja bez magii: t9n, l10n, i18n i g11n

**TLDR:** Cztery skróty opisują różne części tego samego problemu. Tłumaczenie, lokalizacja, internacjonalizacja i globalizacja to nie synonimy.

**Summary:** Tłumaczenie zamienia tekst z jednego języka na drugi. Lokalizacja dopasowuje produkt do konkretnego rynku i może iść w modelu kaskadowym, zwinnym albo ciągłym. Internacjonalizacja to praca programistów, która w ogóle umożliwia lokalizację. Chodzi o rozrastanie się tekstu, waluty, formaty dat, kodowanie znaków i języki pisane od prawej do lewej. Globalizacja to strategia biznesowa sprzedaży oprogramowania za granicą.

Tekst kończy się reklamą Tolgee, otwartoźródłowej platformy do i18n, więc traktuj go jako wprowadzenie i nie jako przegląd narzędzi.

Autor pomija najtrudniejsze rzeczy. Liczby mnogie w językach takich jak polski, rodzaj gramatyczny w interfejsach i teksty sklejane z fragmentów to miejsca, w których i18n naprawdę boli.

**Key takeaways:**
- t9n to tłumaczenie, l10n to dopasowanie do rynku, i18n to przygotowanie kodu, g11n to strategia.
- Internacjonalizacja należy do programistów i trzeba ją zrobić przed lokalizacją.
- Tekst jest podstawowy i częściowo promuje Tolgee.

**Why do I care:** Jeśli pracujesz nad produktem, który ma trafić na kilka rynków, to dobra ściąga do rozmowy z product managerem. Rozmowa o i18n bez tych rozróżnień kończy się zwykle tym, że ktoś kupuje tłumaczenia, a kod dalej ma na sztywno wpisane formaty dat.

**Link:** [Localization basics: What are t9n, l10n, i18n, g11n?](https://daily.dev/posts/wVdOTEoIU)

## Instrukcje dla agentów powinny tłumaczyć decyzję

**TLDR:** Flavio Copes przekonuje, że pliki AGENTS.md działają lepiej, gdy wyjaśniają powód reguły, a nie tylko ją podają. Reguły, które da się sprawdzić maszynowo, powinny siedzieć w narzędziach i CI.

**Summary:** Punkt wyjścia to reguła, która straciła kontekst. Agent widzi zakaz i nie wie, czego on broni, więc stosuje go zbyt szeroko albo wcale. Autor radzi opisać, co aplikacja chroni, gdzie zmiana powinna trafić, jak ją zweryfikować i które działania wymagają zgody człowieka. Instrukcje trzeba trzymać blisko ich właściciela i poprawiać powód po prawdziwej porażce, zamiast dopisywać kolejne sprzeczne ostrzeżenia.

Druga teza dotyczy twardych reguł. Zdanie "nie commituj sekretów" niczego nie blokuje. Robi to skaner sekretów, ograniczenie zakresu poświadczeń i ich rotacja. Formatowanie i podobne rzeczy należą do CI i ochrony gałęzi, a plik z instrukcjami zostaje na decyzje, które wymagają uzasadnienia.

Trzecia dotyczy zgody. Cisza ani upływ czasu nie są zgodą. Przed migracją produkcyjną agent pokazuje dokładną migrację i środowisko docelowe, a potem czeka. Jeśli czas minął, zatrzymuje się i zgłasza brak decyzji.

Nie zgadzam się z jednym. Autor zakłada, że agent czyta i rozumie uzasadnienie. W praktyce długie pliki są ucinane albo ignorowane, więc krótszy plik z kilkoma dobrze napisanymi powodami wygrywa z obszernym.

**Key takeaways:**
- Reguła z powodem jest stosowana trafniej niż sama reguła.
- Co da się sprawdzić maszynowo, egzekwuj narzędziem.
- Brak odpowiedzi człowieka oznacza pauzę, nie zgodę.

**Why do I care:** Każdy zespół, który wdraża agentów kodujących, pisze teraz taki plik i prawie każdy robi z niego wysypisko ostrzeżeń. Warto przejrzeć własny AGENTS.md i przy każdej regule zapytać, czy da się ją przenieść do lintera lub CI. To, co zostanie, dopisz z powodem.

**Link:** [Write agent instructions that explain the decision](https://daily.dev/posts/5Djfm6D1d)
