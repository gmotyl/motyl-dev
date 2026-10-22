---
title: "Latent.Space: Claude Mods i interfejs uwagi, czyli harness skierowany na człowieka"
excerpt: "Opis Claude Mods, wtyczek zmieniających zachowanie i wygląd Claude Code, oraz teza, że harness agenta staje się interfejsem do ludzkiej uwagi."
publishedAt: "2026-10-22"
slug: "latent-space-claude-mods-interfejs-uwagi-harness-agenta"
hashtags: "#latentspace #agents #ai #devtools #claude #dx #generated #pl"
source_pattern: "Latent.Space"
---

## Claude Mods i interfejs uwagi

**TLDR:** Mod to wtyczka Claude Code napisana w TypeScript lub JavaScript, która reaguje na zdarzenia, jak prompt, wywołanie narzędzia czy renderowanie interfejsu. Autor twierdzi, że to wczesna wersja "interfejsu uwagi", warstwy decydującej, kiedy agent cię przerywa i co ci pokazuje.

**Summary:** Punkt wyjścia to wcześniejszy tekst autora o ewolucji harnessu agenta. Skoro modele wchłaniają coraz więcej logiki do wag, to część, która zostaje, zwraca się ku człowiekowi. Mods działają jak oprogramowanie pośredniczące, mogą obserwować zdarzenie, zmienić sposób jego wyświetlania albo przejąć obsługę zamiast domyślnego zachowania. Claude ma wbudowaną umiejętność tworzenia modów, więc można opisać wymaganą zmianę zwykłym językiem.

Anthropic dostarcza sześć wbudowanych modów, widocznych w menu wtyczek. Jest agents-md ładujący plik z instrukcjami projektu, diff przejmujący panel różnic, plugin-authoring, sec-default pilnujący tego, czym zarządza organizacja, telemetria oraz you-should-know, który jest domyślnie wyłączony. Autor włączył ostatni. To pomocniczy agent obserwujący główny i pokazujący notatkę nad promptem, gdy znajdzie coś, co mogło ci umknąć. W jego przykładzie ostrzegł, że edytowany plik miał już niezatwierdzone zmiany, tak jak około 45 innych plików, więc odrzucenie edycji demonstracyjnych skasowałoby też wcześniejszą pracę. Drugi opisany mod to Next Steps Supervisor, uruchamiany po turze, która edytowała pliki, wykonała polecenia lub wykonała co najmniej osiem wywołań narzędzi.

Teza końcowa jest odważna. Harness ma stać się platformą, na której inne firmy budują interfejsy między ludźmi a agentami, tak jak przeglądarka stała się platformą aplikacji webowych. To zakład, a nie fakt, i autor podaje go jako zakład.

**Key takeaways:**
- Mod to wtyczka reagująca na zdarzenia i modyfikująca renderowanie.
- Sześć wbudowanych modów, z którego you-should-know jest wyłączony domyślnie.
- Główna teza to harness jako platforma dla interfejsu człowiek–agent.

**Why do I care:** Jeśli prowadzisz zespół pracujący z agentami, ciekawsze od samych modów jest pytanie, kto decyduje, co agent ci pokazuje. To już nie jest szczegół interfejsu, tylko część procesu review. Zastrzegam, że autor opisuje własne ulubione narzędzie i nie pokazuje, jak mod radzi sobie przy fałszywych alarmach, które szybko uczą ignorowania powiadomień.

**Link:** [Claude Mods](https://www.latent.space/p/claude-mods)
