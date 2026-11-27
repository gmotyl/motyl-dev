---
title: "Deploy z telefonu przez Expo, Rust na wbudowanym GPU i tęsknota za rzemiosłem w erze agentów"
excerpt: "Poprawka błędu z poziomu czatu i aktualizacja OTA w Expo, kamera z Rustem na Jetsonie oraz esej o paradoksie produktywności AI."
publishedAt: "2026-11-27"
slug: "expo-deploy-z-telefonu-rust-jetson-paradoks-produktywnosci-ai"
hashtags: "#dailydev #frontend #webdev #expo #react-native #agents #mcp #rust #ai #career #productivity #generated #pl"
source_pattern: "daily.dev"
---

## Czy możesz bez stresu wypchnąć poprawkę na produkcję z telefonu?

**TLDR:** Zespół Expo pokazuje, jak z czatu na telefonie naprawić błąd w aplikacji i wypuścić go jako aktualizację over-the-air. Agent otwiera pull request, testuje na chmurowych iPhone'ach, a dopiero potem publikacja idzie na kanał produkcyjny.

**Summary:** Autor miał w swojej aplikacji z aparatem błąd z przyciętym przyciskiem. Zamiast siadać do laptopa, opisał problem agentowi w czacie. Agent otworzył pull request z testem regresji i dołączył dwa nagrania obok siebie, każde z innego chmurowego iPhone'a, jedno z głównej gałęzi, drugie z gałęzi z poprawką. To jest najciekawsza część, bo review opiera się na dowodzie, a nie na deklaracji, że wszystko działa.

Po zmergowaniu poprawka trafia najpierw na osobny kanał o nazwie verify. Tam ktoś, albo agent, ładuje aktualizację na chmurowym iPhonie w Expo Simulators i sprawdza, czy wydanie w ogóle się uruchamia. Dopiero gdy wszystko się zgadza, drugi workflow publikuje tę samą zmianę na kanał production, z którego korzysta wersja ze sklepu. Konfiguracja wymaga konektora Expo, połączenia z GitHubem, sposobu na otwieranie pull requestów i jednego promptu.

Autor uczciwie opisuje ograniczenia. Aktualizacja OTA obejmuje tylko JavaScript i zasoby. Każda zmiana zależności natywnych, uprawnień czy konfiguracji natywnej wciąż wymaga nowego builda i przejścia przez review w App Store. Aplikacja GitHuba w ChatGPT potrafi tylko czytać kod, więc pull requesty musi otwierać ktoś inny, na przykład Codex. Domyślne workflow dotyczą iOS, choć Android też jest wspierany.

**Key takeaways:**
- Dowodem poprawki są nagrania z dwóch urządzeń, a nie opis w pull requeście.
- Kanał verify przed production to tani sposób na sprawdzenie wydania.
- OTA nie zastąpi buildów natywnych i review sklepu.

**Why do I care:** Wzorzec z kanałem verify warto skopiować niezależnie od tego, czy kiedykolwiek wypchniesz cokolwiek z telefonu. Autor omija jednak pytanie, kto odpowiada za zmianę o drugiej w nocy, gdy agent dobrze wygląda na nagraniu, a w produkcji coś jest nie tak. Wygoda deployu rośnie, a procedura wycofania zmian w tekście w ogóle się nie pojawia.

**Link:** [Can you confidently ship to production from your phone?](https://app.daily.dev/posts/7UGVmbaSB)

## Jak uruchomić Rusta na wbudowanym GPU

**TLDR:** Film pokazuje domową kamerę bezpieczeństwa na Nvidia Jetson z 8 GB wspólnej pamięci. Model YOLO wykrywa ludzi, a własny kod w Ruscie sprawdza, czy ktoś stoi w strefie drzwi.

**Summary:** Kamera USB podaje klatki do wytrenowanego modelu YOLO 26 od Ultralytics, który rysuje ramkę wokół każdej wykrytej osoby. Wnioskowanie przyspiesza TensorRT, czyli coś w rodzaju kompilatora dla sieci neuronowych. Najciekawsza jest warstwa Rusta. Własny kod, napisany z użyciem CUDA oxide, bierze dolny środkowy punkt każdej ramki i sprawdza, czy mieści się w strefie drzwi, a każda wykryta osoba dostaje własny wątek GPU.

Autor opisuje dwa projekty, które przynoszą Rusta na platformę CUDA. Jeden idzie tradycyjnym stylem CUDA C++, drugi pracuje na kafelkach i sam ustawia wątki. W całym potoku wtyczka TensorRT uruchamia kernel napisany w Ruscie. Film kończy się reklamą programu mentoringowego twórcy.

**Key takeaways:**
- Rust na GPU jest możliwy bez wychodzenia z ekosystemu CUDA.
- Logika strefy to prosty test geometryczny, jeden wątek na osobę.
- Materiał jest demonstracją, nie benchmarkiem.

**Why do I care:** Dla frontendowca to ciekawostka z boku, ale pokazuje, jak daleko sięga język, który wiele zespołów już ma w toolchainie. Autor nie podaje żadnych liczb o opóźnieniu ani zużyciu pamięci, więc trudno ocenić, czy to rozwiązanie coś wygrywa z zwykłym Pythonem i gotową biblioteką.

**Link:** [How To Run Rust on an Embedded GPU](https://app.daily.dev/posts/6EE0DlbnE)

## Nostalgia i paradoks produktywności AI

**TLDR:** Daniel Balcarek używa agentów codziennie i nie zamierza przestać, ale tęskni za częścią pracy, która dawała najwięcej satysfakcji. Porównuje automatyzację kodu do automatycznego levelowania postaci w World of Warcraft.

**Summary:** Teza jest prosta. Agenci przejmują ten fragment tworzenia oprogramowania, który autor uważał za najprzyjemniejszy i z którego był najbardziej dumny. Metafora z grą działa dobrze: jeśli ktoś poziomuje twoją postać za ciebie, pomijasz mozolną naukę, która uczy cię klasy. Pada więc pytanie, czy programiści wciąż uczą się tych samych rzeczy i czy czują tę samą dumę z wyniku.

Autor nie wzywa do odwrotu. Pisze, że dostosowanie się nie wyklucza tęsknoty za przeszłością, a postęp ma swoją cenę. To esej osobisty, bez danych i bez badań.

**Key takeaways:**
- Skrócenie drogi do wyniku odbiera część nauki.
- Używanie agentów i żal po dawnym rzemiośle da się pogodzić.
- Tekst opiera się na osobistym doświadczeniu, nie na pomiarach.

**Why do I care:** Dla zespołów to realne pytanie o onboarding juniorów: skoro nikt nie przechodzi żmudnej ścieżki, skąd weźmie się osąd potrzebny przy review kodu od agenta? Autor tego nie rozstrzyga, a to jest właśnie ta część, o której dziś najtrudniej myśleć. Warto wyznaczać świadomie fragmenty pracy, które robi się ręcznie, żeby nie stracić umiejętności.

**Link:** [Nostalgia and the AI Productivity Paradox](https://app.daily.dev/posts/LVtzFu8dt)
