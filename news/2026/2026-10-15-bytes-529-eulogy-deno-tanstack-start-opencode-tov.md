---
title: "Bytes #529: nekrolog Deno, TanStack Start 1.0, OpenCode 2.0 i język Tov"
excerpt: "Humorystyczne pożegnanie Deno po przejęciu przez Cloudflare i skrót nowości: Mise, React Aria, Base UI 1.9.0, OpenCode 2.0 oraz TanStack Start 1.0."
publishedAt: "2026-10-15"
slug: "bytes-529-eulogy-deno-tanstack-start-opencode-tov"
hashtags: "#uidev #javascript #deno #cloudflare #tanstack #react #generated #pl"
source_pattern: "ui.dev"
---

## Nekrolog Deno

**TLDR:** Bytes żegna Deno po ogłoszeniu, że zespół dołącza do Cloudflare i zakończy rozwój runtime po roku. Wspomina trzy rzeczy, które Deno zostawiło w ekosystemie.

**Summary:** Tekst jest utrzymany w formie żartobliwego przemówienia pogrzebowego. Autor przypomina, że Deno było głównym tematem pierwszego numeru Bytes i jeszcze dwunastu kolejnych. Według niego runtime z czasem upodobnił się do Node, ulegając pokusie adopcji i udziału w rynku.

Dziedzictwo to trzy elementy. Po pierwsze, model uprawnień, który zainspirował opt-in permission model w Node, ustabilizowany w 2025. Po drugie, API przeglądarkowe po stronie serwera, jak fetch i Web Streams, oraz rola w tworzeniu WinterCG, co poprawiło współpracę między runtime'ami. Po trzecie, uruchamianie TypeScriptu bez osobnej konfiguracji budowania, czego dziś oczekuje się też od Bun i Node. Wzmianka o sporze z Oracle dotyczącym znaku towarowego jest tu żartem na marginesie.

**Key takeaways:**
- Deno zakończy rozwój własnego runtime po roku od przejęcia.
- Model uprawnień i Web APIs na serwerze przetrwają w innych runtime'ach.
- Tekst jest satyrą, więc fakty trzeba sprawdzić w ogłoszeniu Deno.

**Why do I care:** Jeśli masz produkcyjne zależności od Deno Deploy albo runtime, zaplanuj migrację zawczasu. Dla większości zespołów realna zmiana jest niewielka, bo nacisk na standardy już się przeniósł do Node i Bun.

**Link:** [Bytes #529 - A Eulogy for Deno](https://bytes.dev/archives/529)

## Cool Bits

**TLDR:** Krótki przegląd narzędzi i premier tygodnia, w tym TanStack Start 1.0.

**Summary:** Mise potrafi teraz automatycznie aktualizować całe środowisko narzędzi do najnowszych wydań. React Aria dodała komponent sheet z animacjami zsynchronizowanymi z gestami, punktami przyciągania i stackowaniem. Base UI wydało wersję 1.9.0, która naprawia drobiazgi niewidoczne dla agenta, a widoczne dla użytkowników. Anomaly wypuściło OpenCode 2.0 z nowym API i SDK, trybem Code Mode, zadaniami w tle i wtyczkami. Richie McIlroy stworzył Tov, język podobny do TypeScriptu, zaprojektowany pod agentów kodujących i kompilowany do natywnych binarek, które rzekomo są szybsze niż Rust. Najważniejsza wiadomość: TanStack Start jest stabilny w wersji 1.0.

Pominąłem materiały oznaczone jako sponsorowane, w tym przewodnik Oracle o REST API dla AI i wpis Sentry o MCP.

**Key takeaways:**
- TanStack Start 1.0 jest stabilny.
- OpenCode 2.0 dodaje Code Mode i wtyczki.
- Tov to eksperyment, a deklaracje o szybkości trzeba traktować ostrożnie.

**Why do I care:** Słowo "allegedly" przy Tov mówi wszystko. Obserwuj, ale nie wdrażaj bez własnych pomiarów. Realnie ważne dla frontendu są TanStack Start 1.0 i React Aria sheet.

**Link:** [Bytes #529 - A Eulogy for Deno](https://bytes.dev/archives/529)
