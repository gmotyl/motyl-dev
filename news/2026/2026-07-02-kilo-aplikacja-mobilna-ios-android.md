---
title: "Kilo na mobile: aplikacja iOS i Android dla użytkowników Kilo Code"
excerpt: "Kilo wypuściło oficjalną aplikację mobilną na iOS i Android, która pozwala śledzić sesje kodowania, zarządzać agentem KiloClaw i uruchamiać sesje w chmurze."
publishedAt: "2026-07-02"
slug: "kilo-aplikacja-mobilna-ios-android"
hashtags: "#kilo #aitools #mobiledev #agents #devtools #generated #pl"
source_pattern: "Kilo"
---

## Kilo App — companion do Kilo Code trafia na iOS i Androida

**TLDR:** Kilo wypuściło aplikację mobilną na iOS i Android, która działa jako towarzysz dla Kilo Code. Umożliwia śledzenie aktywnych sesji agenta, zarządzanie KiloClaw i uruchamianie sesji cloudowych bezpośrednio z telefonu.

**Summary:**

Kilo ogłosiło premierę swojej aplikacji mobilnej dostępnej zarówno na Google Play, jak i App Store. Aplikacja została zaprojektowana jako companion do głównego środowiska Kilo Code — czyli wtyczki do VS Code i interfejsu CLI — i pozwala użytkownikom nie odrywać się od swoich sesji kodowania, nawet gdy są z dala od komputera.

Najważniejszą funkcją jest możliwość śledzenia i kontrolowania aktywnych sesji agenta. Po uruchomieniu sesji w VS Code lub CLI można użyć komendy slash `/remote`, a sesja staje się dostępna z poziomu telefonu. Przełączanie między sesjami odbywa się kilkoma kliknięciami, można też filtrować po środowisku uruchomienia. Warto zauważyć, że na razie tryb zdalny obsługuje wyłącznie modele Kilo Gateway — wsparcie dla modeli niestandardowych jest w trakcie prac i można śledzić postęp w otwartych pull requestach projektu.

Aplikacja udostępnia też widok read-only wszystkich sesji, niezależnie od środowiska. To przydatna funkcja, gdy chcesz po prostu zobaczyć, co agent aktualnie robi, bez potrzeby ingerencji. Można też uruchomić nową sesję cloudową bezpośrednio z telefonu — wybierasz repozytorium, model i opis zadania, i agent zaczyna pracę. Tu jednak trzeba pamiętać, że cloudowe sesje są ograniczone do modeli Kilo Gateway.

Poza monitorowaniem sesji aplikacja daje bezpośredni dostęp do KiloClaw — czyli agenta konfigurowalnego per użytkownik lub organizacja. Z poziomu telefonu można z nim porozmawiać przez wbudowany czat z obsługą załączania plików, a także zarządzać jego ustawieniami: aktualizować, zmieniać model, zarządzać sekretami i konfiguracją.

To wszystko jest w aktywnym rozwoju, a team Kilo wprost prosi o feedback przez Discord lub email. Szczerość jest tu plusem — zamiast udawać, że wszystko działa idealnie, jasno komunikują ograniczenia i zapraszają do zgłaszania problemów.

**Key takeaways:**

- Aplikacja dostępna na iOS i Android, działa jako companion do Kilo Code (VS Code + CLI)
- Tryb `/remote` pozwala kontrolować aktywną sesję z telefonu, ale tylko dla modeli Kilo Gateway
- Widok read-only sesji dostępny bez żadnych ograniczeń modelowych
- Sesje cloudowe można uruchamiać z telefonu — wymagają jednak Kilo Gateway
- Czat z KiloClaw obsługuje załączniki plików
- Zarządzanie konfiguracją agenta (sekrety, modele, aktualizacje) dostępne mobilnie
- Wsparcie dla custom models w trybie remote jest w trakcie prac

**Why do I care:**

Z perspektywy architekta front-endowego aplikacja mobilna jako companion do narzędzia deweloperskiego to ciekawy sygnał — narzędzia AI do kodowania przestają być ograniczone do środowiska IDE i zaczynają działać bardziej jak usługi. Możliwość obserwowania agenta z telefonu zmienia sposób myślenia o długo działających zadaniach: zamiast siedzieć przy monitorze i czekać, można wyjść na kawę i sprawdzić postęp na ekranie telefonu. To zmiana workflow, nie tylko funkcjonalności. Brakuje mi jednak informacji o tym, jak działa autoryzacja i bezpieczeństwo dostępu — zarządzanie sekretami przez aplikację mobilną wymaga starannie przemyślanego modelu zaufania, a Kilo o tym w tym poście nie mówi.

**Link:** [New launch: Kilo is now on mobile](https://blog.kilo.ai/p/kilo-app-for-ios-and-android-is-live)
