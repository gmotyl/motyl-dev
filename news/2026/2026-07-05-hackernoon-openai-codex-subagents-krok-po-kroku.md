---
title: "HackerNoon: Jak używać subagentów OpenAI Codex krok po kroku"
excerpt: "Praktyczny przewodnik po konfiguracji i uruchamianiu niestandardowych subagentów w OpenAI Codex, z przykładami plików TOML i pułapkami, których warto unikać."
publishedAt: "2026-07-05"
slug: "hackernoon-openai-codex-subagents-krok-po-kroku"
hashtags: "#HackerNoon #ai #agents #engineering #dx #generated #pl"
source_pattern: "HackerNoon"
---

## Jak używać subagentów OpenAI Codex krok po kroku

**TLDR:** Zamiast ładować wszystkie zadania do jednej sesji Codex, można podzielić pracę między wyspecjalizowane subagenty działające równolegle. Artykuł pokazuje, jak skonfigurować własnych agentów przez pliki TOML i jak nimi zarządzać.

**Summary:**

Codex, jak każdy model z dużym oknem kontekstu, radzi sobie gorzej, kiedy wrzuca się mu zbyt wiele różnych zadań naraz. Kontekst się zapycha, model zaczyna tracić wątek, a jakość odpowiedzi spada. Subagenty to odpowiedź na ten problem: zamiast jednego przeciążonego asystenta, uruchamiasz kilku wyspecjalizowanych, działających równolegle.

Codex ma trzy wbudowane agenty. Domyślny do zadań ogólnych, Worker skupiony na implementacji i naprawianiu błędów, oraz Explorer do czytania i przeszukiwania istniejącej bazy kodu. Na tym się nie kończy, bo można tworzyć własnych agentów przez pliki TOML przechowywane w katalogu `.codex/agents/`. Każdy plik opisuje: nazwę, opis tego kiedy powinien być użyty, instrukcje zachowania, opcjonalnie model i jego wysiłek rozumowania, tryb piaskownicy (read-only lub workspace-write) oraz etykiety wyświetlane w interfejsie.

Konfiguracja globalna w `config.toml` pozwala ustawić `max_threads`, czyli ile wątków agentów może działać jednocześnie, i `max_depth` kontrolujące jak głęboko agent może tworzyć kolejnych subagentów. Wartość `max_depth = 1` to rozsądny default, bo zapobiega rekurencyjnemu fan-outowi, który szybko staje się drogi i trudny do śledzenia.

Subagenci nie uruchamiają się automatycznie. Trzeba ich wywołać explicite w prompcie, podając nazwę agenta i konkretne zadanie. Można też wywołać kilku jednocześnie, na przykład jeden do code review, drugi do security auditu, trzeci do generowania testów. Autor ostrzega przed jedną pułapką: domyślnie subagenci nie tworzą osobnych gałęzi git i wprowadzają zmiany bezpośrednio. Warto o tym pamiętać i prosić ich explicite o stworzenie gałęzi przed rozpoczęciem pracy.

Artykuł wymienia też bibliotekę 36 gotowych plików agentów dostępną na GitHub, więc nie trzeba zaczynać od zera.

**Key takeaways:**
- Subagenci w Codex definiowani są jako pliki TOML w `.codex/agents/`, można je commitować do repo
- `max_depth = 1` zapobiega kosztownemu rekurencyjnemu tworzeniu kolejnych agentów
- Subagenci nie tworzą gałęzi git automatycznie, warto to uwzględnić w prompcie
- Dla review i security auditu warto ustawiać mocniejszy model i wyższy reasoning effort

**Why do I care:** Wzorzec "manager + wyspecjalizowane agenty" to coś, co widzę coraz częściej w praktyce i ma sens. To co mnie interesuje najbardziej to kombinacja agenta read-only do auditu z agentem workspace-write do implementacji, gdzie człowiek akceptuje ustalenia pierwszego zanim drugi zacznie działać. Artykuł jest praktyczny i konkretny, choć model używany w przykładach to "gpt-5.4", więc część szczegółów może się różnić w zależności od tego, z jakiego providera korzystasz.

**Link:** [How to Use OpenAI Codex Subagents Step by Step | HackerNoon](https://hackernoon.com/how-to-use-openai-codex-subagents-step-by-step)
