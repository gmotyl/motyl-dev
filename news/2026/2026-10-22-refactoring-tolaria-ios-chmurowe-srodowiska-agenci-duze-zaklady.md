---
title: "Refactoring: Tolaria na iOS, chmurowe środowiska dla agentów i mniej drobnych poprawek, więcej dużych zakładów"
excerpt: "Miesięczna aktualizacja o rozwoju Tolarii. Aplikacja na iPhone'a i iPada, przeniesienie agentów do chmury, CI szybszy o około cztery razy i zmiana sposobu pracy twórcy."
publishedAt: "2026-10-22"
slug: "refactoring-tolaria-ios-chmurowe-srodowiska-agenci-duze-zaklady"
hashtags: "#refactoring #agents #mobile #ios #devtools #cicd #workflow #generated #pl"
source_pattern: "🌀 Refactoring"
---

## Tolaria na iOS i zmiana sposobu pracy nad projektem

**TLDR:** Autor wydał aplikację Tolaria na iPhone'a i iPada, przyznając, że jest jeszcze szorstka. Wcześniej przez kilka miesięcy wydania zwolniły, bo rozproszył uwagę na drobiazgach.

**Summary:** Odcinek zaczyna się od osobistej uwagi. Wydania Tolarii były wolniejsze, bo po intensywnych pierwszych miesiącach autor zrobił przerwę i zobaczył, że największym błędem było rozpraszanie uwagi na lawinę drobnych zgłoszeń zamiast kilku dużych zakładów. Projekt działa na kilku systemach, z kilkoma hostami agentów, plikami, git i wiersz poleceń, więc powierzchnia drobnych błędów jest ogromna. Można nią wypełnić cały czas i jednocześnie się wypalić.

Nowy plan to dwa tory. Po pierwsze, większość czasu na kilka obszarów wymagających ludzkiego smaku, czyli mobile, wersję webową i współpracę z agentami. Po drugie, dobry przepływ dla codziennych poprawek, żeby produkt się poprawiał, a nie degradował. Efektem jest aplikacja na iOS z edytorem Markdown z poleceniami ukośnikowymi i trybem źródła, prawdziwym push i pull z gitem z automatycznym commitem oraz dwukierunkową synchronizacją z folderem iCloud lub Pliki. Autor uczciwie pisze, że część rzeczy jest brzydka albo nie działa.

Dalej omawia przeniesienie agentów z lokalnych maszyn do chmurowych środowisk programistycznych, rodzinę botów pomagających prowadzić projekt oraz przeniesienie głównego potoku CI, który stał się około cztery razy szybszy. Zapowiada wersję webową i integrację z agentami.

**Key takeaways:**
- Wersja iOS działa na iPadzie i iPhonie, ale jest wczesna.
- Przejście na kilka dużych zakładów zamiast tysiąca drobiazgów.
- Potok CI po migracji jest około cztery razy szybszy.

**Why do I care:** Najcenniejsza jest część osobista, bo opisuje pułapkę, w którą wpada każdy opiekun projektu, że zgłoszenia wyglądają na produktywność. Szkoda, że autor nie podaje, jak mierzy, które zakłady są "duże". Bez tego zasada brzmi jak intuicja, nie jak metoda.

**Link:** [Introducing Tolaria Mobile](https://refactoring.fm/p/introducing-tolaria-mobile)
