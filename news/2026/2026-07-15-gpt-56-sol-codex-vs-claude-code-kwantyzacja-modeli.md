---
title: "GPT-5.6 Sol, Codex vs Claude Code i kwantyzacja modeli do kieszeni"
excerpt: "Przegląd najważniejszych wydarzeń AI z 14 lipca 2026: eksplozja użycia Codex, modele 27B na telefon i nowe benchmarki dla agentów."
publishedAt: "2026-07-15"
slug: "gpt-56-sol-codex-vs-claude-code-kwantyzacja-modeli"
hashtags: "#AINews #ai #llm #agents #ml #open-source #performance #generated #pl"
source_pattern: "AINews"
---

## GPT-5.6 Sol, Codex kontra Claude Code i nowa era agentów kodujących

**TLDR:** OpenAI odnotowało eksplozję użycia GPT-5.6 Sol i Codex — wzrost 2,5x w ciągu tygodnia, a według doniesień Codex przekroczył 6 milionów aktywnych użytkowników w jednym dniu, potencjalnie wyprzedzając Claude Code. To nie jest zwykły wzrost metryk, to sygnał zmiany strukturalnej w tym, jak programiści wchodzą w interakcję z modelami.

**Summary:**

Żeby zrozumieć skalę tego, co się dzieje z OpenAI w połowie lipca 2026, wystarczy spojrzeć na same liczby. Sam Altman napisał, że popyt na GPT-5.6 Sol jest "szalony" i może powodować problemy z infrastrukturą. Wzrost użycia Codex i ChatGPT Work wyniósł 2,5x w ciągu jednego tygodnia. Tibo ogłosił 6 milionów aktywnych użytkowników Codex w ciągu 24,5 godziny, co oznacza przyrost miliona użytkowników w ciągu jednego dnia. Ostatnia znana liczba dla Claude Code wynosiła 2 miliony w lutym. Nawet jeśli te dane nie są w pełni porównywalne metodologicznie, ruch jest wyraźny.

JetBrains zdecydował się na Codex jako swój rekomendowany agent, a OpenAI pokazało narzędzia do ewaluacji z linii poleceń zbudowane od zera za pomocą GPT-5.6. To nie jest już dyskusja o tym, który model jest "lepszy" w benchmarkach akademickich — to walka o to, który ekosystem stanie się domyślnym środowiskiem pracy programisty. Codex ma własne narzędzie pytające ("question tool"), które według Theo jest mocno niedoceniane i daje mu sporą przewagę w złożonych zadaniach wieloetapowych.

Jednocześnie społeczność zaczyna głośno mówić o jakości harnessy agentów jako nowym wyróżniku, nie samej jakości modeli. swyx zauważył, że przestarzałe instrukcje w plikach agents.md mogą działać jak samodzielnie wstrzyknięty prompt injection, powodując wielogodzinne blokady w długotrwałych zadaniach. To jest szczegół, który umknie każdemu, kto nie pracował intensywnie z agentami — ale każdy, kto próbował uruchomić złożony workflow agentowy z nieaktualną konfiguracją, doskonale wie, o czym mowa. LangChain dodało śledzenie dla Codex, a potem rozszerzyło to na Cursor, Copilot, Pi i OpenCode w LangSmith, eksponując wywołania narzędzi, podagentów i użycie tokenów. Andy Konwinski ujął to zwięźle: firmy, które potrafią zakodować swoją wartość w ewaluacjach i środowiskach, zyskają trwalszą przewagę niż te opierające się wyłącznie na kapitale lub surowej skali.

W świecie otwartych modeli PrismML wypuściło Bonsai 27B opartego na Qwen 3.6 27B w dwóch wariantach: Ternary Bonsai 27B o wadze 5,9 GB i efektywnych 1,71 bitach na parametr oraz 1-bit Bonsai 27B o wadze 3,9 GB i 1,125 bita. Oba na licencji Apache 2.0. To nie jest tylko ciekawy wynik badawczy — demo pokazuje Hermes działające na RTX 5090, a Locally AI podkreśla możliwość wdrożenia na telefonie. Tencent Hunyuan równocześnie udostępnił 1-bitowy i 4-bitowy wariant Hy3, opisując model na poziomie 295B, który można uruchamiać na jednej karcie GPU przez llama.cpp. Lokalne wnioskowanie przestaje być zabawką — staje się realną ścieżką dla poważnych workflowów agentowych.

Perplexity udostępniło WANDR, benchmark dla szeroko zakrojonych badań agentowych oparty na 500 zadaniach z prawdziwych produkcyjnych zapytań, wymagający 170 tysięcy rekordów popartych źródłami. Zamiast oceniać względem statycznego zbioru odpowiedzi, WANDR ponownie pobiera cytowane strony i sprawdza twierdzenia na podstawie aktualnych danych. To jest metodologicznie uczciwe podejście, bo web research w produkcji też musi działać na żywych danych. Sakana AI z kolei opublikowała w Nature Communications pracę o "Smart Cellular Bricks" — systemie z tysiącami identycznych sześcianów, z których każdy uruchamia małą sieć neuronową i komunikuje się tylko z sąsiadami, a cały układ potrafi wykrywać uszkodzenia i regenerować struktury bez centralnego sterowania. W symulacji przeskalowało to do 18 tysięcy sześcianów.

**Key takeaways:**

- Codex mógł przekroczyć Claude Code pod względem liczby aktywnych użytkowników — wzrost o milion w ciągu jednego dnia to nie szum statystyczny
- Jakość harnessy agentów (konfiguracja, instrukcje, ewaluacje) staje się ważniejszym wyróżnikiem niż surowa jakość modelu
- Bonsai 27B pokazuje, że modele klasy frontier można teraz uruchomić na telefonie przy zachowaniu pełnych możliwości agentowych
- WANDR od Perplexity to nowy standard dla realistycznych benchmarków badań agentowych opartych na dynamicznych danych
- Sakana AI wkroczyła w fizyczną AI z samonaprawiającymi się układami komórkowymi publikowanymi w Nature Communications

**Why do I care:**

Z perspektywy architekta pracującego z narzędziami AI na co dzień, to co mnie tu uderza najbardziej to nie wyścig użytkowników Codex kontra Claude Code. To ostrzeżenie swyx o przestarzałych plikach konfiguracyjnych jako formie prompt injection. Każdy, kto buduje złożone systemy agentowe, wie, że czas życia instrukcji to problem strukturalny, nie operacyjny. Jeżeli twoja harnessa jest niespójna z rzeczywistym stanem repozytorium lub wymaganiami projektu, model nie będzie działał źle w oczywisty sposób — będzie działał nieoczekiwanie i trudno debugowalnie. To jest bug kategorii "cichy", który pochłania czas w godzinach, nie minutach. Warto potraktować utrzymanie plików konfiguracyjnych agentów jak utrzymanie dokumentacji — z taką samą dyscypliną i regularnością.

**Link:** [[AINews] not much happened today](https://www.latent.space/p/ainews-not-much-happened-today-c72?publication_id=1084089&post_id=207092534&isFreemail=true&triedRedirect=true)
