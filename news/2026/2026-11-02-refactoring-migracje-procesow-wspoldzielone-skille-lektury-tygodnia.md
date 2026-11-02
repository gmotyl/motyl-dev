---
title: "Migracje procesów, współdzielone skille i tygodniowe lektury"
excerpt: "Migracja procesów jak migracja kodu według Willa Larsona, trzy poziomy skilli według Charliego Guo z OpenAI oraz trzy lektury tygodnia."
publishedAt: "2026-11-02"
slug: "refactoring-migracje-procesow-wspoldzielone-skille-lektury-tygodnia"
hashtags: "#Refactoring #ai #agents #management #teams #workflow #engineering #generated #pl"
source_pattern: "🌀 Refactoring"
---

## Migracje procesów i współdzielone skille

**TLDR:** Luca Rossi streszcza wystąpienie Willa Larsona o przejściu zespołu od ręcznych bramek, przez CI/CD, do pracy z agentami. Dodaje wywiad z Charliem Guo z OpenAI o tym, jak rozlać produktywność kilku osób na cały zespół.

**Summary:** Larson na konferencji LDX3 w Nowym Jorku opisał drogę swojego zespołu w Imprint jako kolejne migracje. Rossiemu spodobało się właśnie to ujęcie, bo o migracjach kodu wiemy sporo i ta wiedza przenosi się na procesy. Larson wymienia cztery zasady. Najpierw zrozumieć problemy ludzi, bo obecny sposób pracy ma powód, nawet jeśli wygląda na wadliwy. Potem zdobyć poparcie, a przy przejściu z Jiry na Linear zaczął od największych fanów Jiry, bo jeśli ich obawy da się rozwiązać, reszta pójdzie łatwiej. Trzecia zasada to twarde granice. Claude Code jest zalecanym agentem, można używać innego, ale bez wsparcia zespołu platformowego. Czwarta to dopracowanie szczegółów, bo każda migracja ma długi ogon drobnych poprawek.

Druga część to rozmowa z Charliem Guo o przejściu od pracy w pojedynkę do pracy zespołowej z agentami. Odpowiedzią są skille na trzech poziomach. Osobiste leżą w lokalnym katalogu i służą jednej osobie. Projektowe siedzą w repozytorium i są wspólne dla wszystkich pracujących nad projektem. Organizacyjne są w wewnętrznych repozytoriach zatwierdzonych przez IT i bezpieczeństwo, które każdy w firmie może przeglądać i klonować. Skille mają ten sam cykl życia co kod. Wersjonowanie, możliwość odkrycia, właściciel i proces aktualizacji.

Samo narzędzie nie wystarczy. Guo zna ludzi, którzy nie dzielą się trikami, bo nie chcą, żeby szef uznał, że idą na skróty, albo bo są oceniani w rankingu umiejętności AI i chcą zachować przewagę. Zaczynać trzeba więc od kultury i nagradzać dzielenie się dobrym workflow.

Wśród lektur tygodnia jest tekst Anthropic o Scion, systemie kontroli wersji dla agentów, który zastąpił Gita w całym monorepo w pięć miesięcy. Dalej Felix Rieseberg, który przestał prowadzić rozmowy kodowania, bo Claude jest w nich lepszy od kandydatów, oraz długi tekst Steve'a Yegge'a o tanich modelach na ścisłych szynach.

**Key takeaways:**
- Migracje procesów mają te same zasady co migracje kodu.
- Zaczynaj od największych sceptyków, nie od entuzjastów.
- Skille mają trzy poziomy i cykl życia jak kod.
- Dzielenie się workflow trzeba nagradzać.

**Why do I care:** Zasada twardych granic jest niedoceniana. Zespół platformowy nie utrzyma pięciu agentów naraz, więc wybranie jednego z oficjalnym wsparciem oszczędza czas, i trzeba o tym mówić wprost. Podział skilli na trzy poziomy od razu da się przenieść do repozytoriów, w których pracuję. Tekst jest przede wszystkim o zarządzaniu zespołem, ale konsekwencje dotykają architektury repozytoriów.

**Link:** [Process migrations, shared skills, and weekly readings!](https://refactoring.fm/p/process-migrations-shared-skills)
