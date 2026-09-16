---
title: "W środku agentowej fabryki oprogramowania OpenAI"
excerpt: "Gergely Orosz odwiedził OpenAI i opisuje, jak Codex w rok stał się szkieletem niemal całej pracy w firmie i jak wygląda zbudowana wokół niego agentowa fabryka oprogramowania."
publishedAt: "2026-09-16"
slug: "pragmatic-engineer-openai-agentic-software-factory"
hashtags: "#pragmaticengineer #ai #agents #architecture #engineering #devtools #generated #pl"
source_pattern: "Pragmatic engineer"
---

## W środku agentowej fabryki oprogramowania OpenAI

**TLDR:** Gergely Orosz odwiedził siedzibę OpenAI i opisuje, jak w ciągu roku Codex stał się szkieletem niemal całej pracy w firmie, od inżynierii po finanse i marketing, oraz jak wygląda zbudowana wokół niego agentowa fabryka oprogramowania obejmująca implementację, code review i wdrożenia.

**Summary:** Punktem wyjścia jest wykres adopcji: między lutym a majem udział zespołów nieinżynierskich, finansów, rekrutacji, prawa, korzystających z Codexa skoczył z niemal zera do 90%. Autor rozmawiał z siedmioma inżynierami i liderami, w tym z wiceprezesem inżynierii infrastruktury aplikacyjnej i szefem inżynierii ChatGPT, żeby zrozumieć, co się stało. Kluczowym momentem było dodanie ustawienia goal, które pozwala agentowi pracować, aż zadanie zostanie ukończone, zamiast wymagać ciągłej ingerencji, co między kwietniem a majem podbiło adopcję z 60% do 90%. Zespół Codexa nazywa to zjawisko nawisem świadomości: ludzie odkrywają, że mogą użyć Codexa do monitorowania Slacka albo aktualizowania Airtable, i przekazują to sobie z ust do ust szybciej, niż firma dokumentuje nowe zastosowania.

Ciekawy jest opis agentowej fabryki oprogramowania. Człowiek definiuje pożądany rezultat, Codex zbiera kontekst, bo cała dokumentacja OpenAI trafiła do kodu źródłowego, żeby agenci mieli do niej dostęp, plus Git, Slack, Notion, Databricks, Datadog, implementuje zmiany, buduje i testuje, a potem przechodzi przez agentowy code review. Zamiast jednego generycznego recenzenta AI, OpenAI odpala kilku agentów z konfiguracją specjalisty domenowego, na przykład infrastruktura chmurowa albo bezpieczeństwo, bo każdy z nich ma pełny dostęp do kodu i dokumentacji swojej domeny. Zmiany klasyfikowane jako wysokiego ryzyka przechodzą przez ostrzejszy proces z obowiązkową ludzką recenzją, a niskiego ryzyka mogą być automatycznie zatwierdzane.

Po zatwierdzeniu zmiana dostaje własnego agenta z zadaniem poprowadzenia jej bezpiecznie aż do pełnego wdrożenia produkcyjnego: agent czyta kod, znajduje feature flag, ustala sygnały sukcesu i porażki, buduje własny dashboard monitoringu i obserwuje sygnały produkcyjne. Dochodzi do tego Perf Factory, który przesiewa alerty i dashboardy, deduplikuje sygnały, identyfikuje realne regresje latencji, ustala ich przyczynę i proponuje poprawki, oraz Sevbot, wewnętrzny agent do reagowania na incydenty, który zbiera kontekst, proponuje łagodzenie skutków, ale nigdy samodzielnie go nie wykonuje, i odpowiada na pytania inżynierów na Slacku.

Skala przyrostu obciążenia infrastruktury jest uderzająca: liczba pull requestów na inżyniera rośnie w tempie, które w typowej firmie zajęłoby dwa lub trzy lata, a w OpenAI dzieje się w ciągu sześciu miesięcy, co oznacza mniej więcej dziesięciokrotny wzrost obciążenia niektórych systemów. To wymusza przemyślenie na nowo tego, czym w ogóle są CI/CD, code review i pull requesty, bo stary model, w którym inżynier infrastruktury chmurowej i inżynier bezpieczeństwa ręcznie recenzują każdą zmianę, przestał być wykonalny przy takiej skali, a stał się wykonalny dopiero z agentami. Osobnym, dotkliwym wąskim gardłem pozostaje wdrażanie natywnych aplikacji mobilnych, bo ręczna recenzja Apple i Google trwa godziny albo dni, niezależnie od tego, jak szybko powstaje kod.

**Key takeaways:**
- Adopcja Codexa w zespołach nieinżynierskich skoczyła z niemal zera do 90% w cztery miesiące, napędzana przez ustawienie goal pozwalające agentowi pracować bez ciągłej ingerencji.
- Agentowy code review w OpenAI to nie jeden generyczny recenzent, tylko kilku agentów z konfiguracją specjalisty domenowego, każdy z pełnym dostępem do kodu i dokumentacji swojej dziedziny.
- Liczba pull requestów na inżyniera rośnie tak szybko, że wzrost obciążenia, który gdzie indziej zająłby dwa lub trzy lata, w OpenAI dzieje się w sześć miesięcy, co odsłania wąskie gardła w CI/CD i w wolnym procesie recenzji aplikacji mobilnych.

**Why do I care:** Ten materiał jest wart uwagi, bo pokazuje konkretne wzorce organizacyjne, a nie tylko deklaracje o używaniu AI. Pomysł agenta-recenzenta z wąską, domenową konfiguracją zamiast jednego uniwersalnego bota to coś, co da się wdrożyć w znacznie mniejszej skali już dziś, podobnie jak rozdzielenie ryzyka zmian na ścieżkę z automatycznym zatwierdzeniem i ścieżkę z obowiązkowym człowiekiem. Warto też zapamiętać ostrzeżenie ukryte w tym tekście: skalowanie liczby PR-ów bez skalowania CI/CD i procesu wdrożenia po prostu przenosi wąskie gardło gdzie indziej, w przypadku OpenAI na sklepy z aplikacjami mobilnymi, które wciąż działają jak w 2008 roku.

**Link:** [Inside OpenAI's agentic software factory](https://newsletter.pragmaticengineer.com/p/openai-software-factory)
