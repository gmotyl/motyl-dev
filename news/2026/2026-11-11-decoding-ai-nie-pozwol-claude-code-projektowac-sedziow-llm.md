---
title: "Decoding AI: nie pozwól, żeby Claude Code projektował twoich sędziów LLM"
excerpt: "Louis-François Bouchard o tym, jak zbudował ToneBench i dlaczego rubrykę, kalibrację i pomiar szumu sędziów musi robić człowiek."
publishedAt: "2026-11-10"
slug: "decoding-ai-nie-pozwol-claude-code-projektowac-sedziow-llm"
hashtags: "#decodingai #ai #llm #testing #agents #generated #pl"
source_pattern: "Decoding AI"
---

## Sędziowie LLM muszą mieć człowieka przy rubryce

**TLDR:** Autor zbudował z pomocą Claude Code i Codexa benchmark ToneBench oceniający pisanie modeli, ale wiarygodność wyników zależała od decyzji, których agent nigdy nie zaproponował. Rubrykę, kalibrację i kontrolę szumu trzeba robić samemu.

**Summary:** ToneBench sprawdza, czy model potrafi napisać skrypt brzmiący jak autor. Każdy model dostaje ten sam prompt, pisze pięć szkiców do jednego z dziesięciu skryptów, a czterech sędziów i kilka kontroli w kodzie ocenia je w dziewięciu metrykach. Przy 141 konfiguracjach daje to ponad siedem tysięcy szkiców i dwadzieścia osiem tysięcy ocen. Kod napisały agenty, ale rubryki były wręcz dziwne, a pierwsza wersja karała nawyki autora, więc 119 z 141 modeli wypadło lepiej od jego własnych skryptów w kategorii antyschematyczności. Przepisał większość metryk ręcznie.

Agent nigdy nie zaproponował dwóch sprawdzeń, którym autor ufa najbardziej: czy ten sam szkic dostaje tę samą ocenę dwa razy i jak sędziowie mają się do ocen ludzi. Szum dotyczy obu stron, bo model też ma rozrzut: Grok 4.7 zajmuje piąte miejsce na najlepszych szkicach, dwudzieste dziewiąte na średnich i sześćdziesiąte siódme na najgorszych. Gdy autor chciał dodać Gemini jako piątego sędziego, kalibracja pokazała, że ocenia niemal losowo, więc nie dodał go, co uratowało ranking przed przetasowaniem.

Z praktycznych wniosków: dwuetapowa ocena z cytatem dowodu, wyborem jednego z sześciu poziomów i dopiero potem liczbą działała lepiej niż skala binarna, a sędziowie dostają około szesnastu tysięcy słów kontekstu. Każdy sędzia faworyzuje własną rodzinę modeli, więc potrzebny jest panel z różnych laboratoriów. Ogólnie zmiana sędziego to nowy benchmark. Autor wspomina też o trzech tygodniach straconych na arenę do porównań ludzkich, zamiast zacząć od złotego zestawu dwustu czterdziestu fragmentów ocenionych przez ludzi.

**Key takeaways:**
- Rubryki i kryteria muszą pochodzić od człowieka, agent świetnie buduje, ale słabo decyduje, co mierzyć.
- Mierz szum modelu i szum sędziego, najlepiej ze złotym zestawem ocen ludzi.
- Przypinaj dokładny identyfikator modelu sędziego i sprawdzaj, kto faktycznie odpowiada.

**Why do I care:** Jeśli oceniasz jakość odpowiedzi agentów w swoim produkcie, zacznij od tego samego: dwie osoby oceniają kilkadziesiąt wyników na ślepo i sprawdzasz, czy sędzia LLM układa je w tej samej kolejności. Wynik tego testu mówi więcej niż kolejna iteracja promptu.

**Link:** [Don't Let Claude Code Design Your LLM Judges](https://www.decodingai.com/p/write-your-own-llm-judges)
