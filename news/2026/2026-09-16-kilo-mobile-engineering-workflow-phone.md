---
title: "Kilo Mobile: cały workflow inżynierski z telefonu"
excerpt: "Aktualizacja aplikacji mobilnej Kilo pozwala uruchamiać sesje agentów zdalnie, recenzować pull requesty i zarządzać bezpieczeństwem organizacji bez laptopa."
publishedAt: "2026-09-16"
slug: "kilo-mobile-engineering-workflow-phone"
hashtags: "#kilo #agents #devtools #mobile #generated #pl"
source_pattern: "Kilo"
---

## Kilo Mobile: cały workflow inżynierski z telefonu

**TLDR:** Aktualizacja aplikacji mobilnej Kilo pozwala uruchamiać sesje agentów na zdalnych maszynach albo w chmurze, recenzować pull requesty, zarządzać agentem bezpieczeństwa i przeglądać audyty organizacji bezpośrednio z telefonu.

**Summary:** Typowa pętla pracy agentowej wygląda tak: dajesz agentowi zadanie, czekasz na pull request, recenzujesz, mergujesz, powtarzasz, i żaden z tych kroków nie powinien wymagać siedzenia przy biurku. Aplikacja pozwala uruchomić sesję na podłączonej zdalnej maszynie albo odpalić Cloud Agenta bezpośrednio z telefonu, z wyborem instalacji GitHub, repozytorium i brancha, albo wskazaniem konkretnego folderu roboczego dla sesji zdalnej. Istniejące sesje można kontynuować albo sklonować na inne miejsce docelowe, a aplikacja pamięta wybrany model i poziom rozumowania, w tym niestandardowe wybory modeli, oraz pozwala przeszukiwać poprzednie sesje po repozytorium, branchu, tytule PR-a czy jego numerze.

Wejście głosowe transkrybuje polecenie na bieżąco w trakcie mówienia, z wyborem języka rozpoznawania i modelu transkrypcji. Aplikacja działa w 87 językach z układami od prawej do lewej i lokalizowanymi powiadomieniami, a nawet podsumowania narzędzi mogą być tłumaczone na wybrany język. Można recenzować własne pull requesty i te od zespołu bez sięgania po laptopa, śledzić trwające recenzje, dodawać komentarze i ponawiać nieudane komentarze bez utraty szkicu, a przeglądarka diffów pozwala odpalić ręczną sesję Code Reviewera przed mergem wprost z aplikacji.

Ekran główny został przebudowany, żeby oddzielić żywe sesje od historii i pokazywać, czy zadanie jest aktywne, wstrzymane, zablokowane czy zakończone, z możliwością wstrzymania lub wznowienia celu i zmiany auto-approve dla pojedynczej sesji. Na iPhonie Live Activities pokazują aktualizacje agenta na ekranie blokady i w Dynamic Island, a na Androidzie podobną widoczność daje widżet ekranu głównego. Praca organizacyjna i bezpieczeństwo też są dostępne z telefonu: można zarządzać organizacją i Agentem Bezpieczeństwa, przeglądać raporty audytu i historię remediacji oraz zatwierdzać proponowane poprawki.

**Key takeaways:**
- Aplikacja pozwala uruchamiać sesje na zdalnych maszynach albo w chmurze bezpośrednio z telefonu, bez konieczności otwierania IDE.
- Recenzja pull requestów, w tym uruchamianie ręcznej sesji Code Reviewera, jest w pełni dostępna z poziomu telefonu.
- Kilo jest open source, a aplikacja mobilna startuje na Product Hunt.

**Why do I care:** To kolejny sygnał, że praca z agentami przestaje wymagać obecności przy komputerze w takim samym stopniu, jak recenzja kodu już od dawna nie wymagała siedzenia przy tym samym biurku co autor. Możliwość zatwierdzenia poprawki bezpieczeństwa albo odesłania agenta do naprawy z telefonu w trakcie oczekiwania na coś innego to realna zmiana w tym, jak wygląda czas reakcji w zespole korzystającym z agentów, niezależnie od tego, czy akurat używasz Kilo.

**Link:** [Kilo Mobile update: run your engineering workflow from your phone](https://blog.kilo.ai/p/kilo-mobile-update-run-your-engineering)
