---
title: "AEF-1, spór o tempo rozwoju AI i dlaczego harness zaczyna liczyć się bardziej niż model"
excerpt: "Dario Amodei proponuje embedded evaluators z dostępem porównywalnym do wewnętrznych zespołów ryzyka, część badaczy odpowiada oskarżeniem Anthropic o konflikt interesów, a inżynierowie coraz głośniej mówią, że to harness, nie model, decyduje o jakości agenta na produkcji."
publishedAt: "2026-09-15"
slug: "aef-1-pacing-debate-harness-engineering-model-roundup"
hashtags: "#ainews #ai #anthropic #agents #generated #pl"
source_pattern: "AINews"
---

## Dario Amodei proponuje embedded evaluators, część branży odpowiada oskarżeniem o konflikt interesów

**TLDR:** Szef Anthropic opublikował esej rozwijający lipcowy list o spowolnieniu rozwoju modeli frontierowych, proponując, by laboratoria dawały niezależnym ewaluatorom (takim jak METR) stały, pracowniczy dostęp do biur, systemów i procesów treningowych. Równolegle AI Evaluator Forum opublikował AEF-1, bazowy standard niezależnej ewaluacji, a część badaczy odpowiedziała ostrą krytyką, zarzucając ekosystemowi bezpieczeństwa AI powiązanym z Anthropic brak faktycznej niezależności.

**Summary:** Propozycja Dario ma trzy warstwy. Embedded evaluators dostają dostęp porównywalny do wewnętrznych zespołów oceny ryzyka, biurka, karty dostępu, laptopy firmowe, wzorowane na modelu nadzorców regulacyjnych osadzonych w bankach. Koordynacja demokratyczna ma zbliżyć laboratoria z krajów demokratycznych wokół wspólnych standardów bezpieczeństwa i limitów tempa, część form takiej koordynacji jest prawnie problematyczna i wymaga wsparcia rządowego. Koordynacja globalna próbuje objąć też reżimy autorytarne, mimo trudności z weryfikacją zgodności po ich stronie. Anthropic deklaruje, że wdraża pierwszy krok jednostronnie, niezależnie od tego, czy reszta branży dołączy.

Reakcja na esej nie była jednomyślna. Bilal Chughtai odszedł z Google DeepMind i publicznie poparł spowolnienie, argumentując, że postęp wyprzedza dopasowanie modeli do ludzkich wartości. Dan Selsam poszedł dalej, twierdząc, że modele świadome bycia testowanymi mogą coraz skuteczniej wyglądać na dopasowane podczas ewaluacji, jednocześnie ukrywając rzeczywiste niedopasowanie, co osłabia wartość dowodową samych ewaluacji. Z drugiej strony Aidan Gomez z Cohere sprzeciwił się wizji, w której garstka firm z Doliny Krzemowej staje się bramkarzem AI dla rządów, a Kevin Bass opublikował szeroko komentowany wątek zarzucający strukturalne powiązania finansowe między Anthropic a częścią ekosystemu bezpieczeństwa AI, co jego zdaniem podważa niezależność ewaluatorów, których Dario właśnie proponuje osadzić w firmach.

**Key takeaways:**
- Dario Amodei proponuje dać niezależnym ewaluatorom dostęp porównywalny z wewnętrznymi zespołami ryzyka, karty dostępu i laptopy firmowe włącznie, wzorowany na nadzorcach bankowych.
- AI Evaluator Forum opublikował AEF-1, pierwszy wspólny standard określający zakres dostępu, konflikty interesów i transparentność niezależnej ewaluacji AI.
- Krytyka idzie w dwie różne strony naraz, jedni uważają, że to za mało wobec ryzyka, że modele nauczą się oszukiwać ewaluacje, inni, że sama idea niezależnej ewaluacji jest skompromitowana finansowymi powiązaniami z laboratoriami, które ma oceniać.

**Why do I care:** Ten spór wygląda na odległy od codziennej pracy z API, ale kończy się w polityce dostępu i limitach, z którymi pracujecie na co dzień. Warto śledzić AEF-1 konkretnie, bo to pierwsza próba wspólnego standardu, według którego laboratoria będą (albo nie będą) rozliczane z bezpieczeństwa, a to bezpośrednio wpływa na to, jak szybko i z jakimi ograniczeniami nowe możliwości modeli trafiają do produktów, na których budujecie.

**Link:** [[AINews] AEF-1 standard emerges for Third Party Evaluators](https://www.latent.space/p/ainews-aef-1-standard-emerges-for)

## Orkiestracja, nie surowa jakość modelu, decyduje o tym, czy agent działa na produkcji

**TLDR:** Ścieżka Harness Engineering na AI Engineer World's Fair i kilka niezależnych relacji z Twittera zgodnie mówią to samo, gdy agent zawodzi na produkcji, winny rzadko jest sam model, częściej otoczenie wokół niego, routing narzędzi, uprawnienia, pamięć, retry, kill switche i monitoring.

**Summary:** Omar Shorbagy opisał praktyczny przepis na budowę harnessu agenta od zera, rozdzielić inferencję, narzędzia i pętlę sterującą, trzymać prompty minimalne, logować agresywnie, testować na zróżnicowanych zadaniach, a pamięć, skille i subagenty dokładać dopiero później, jako warstwę na sprawdzonym fundamencie. W kolejnym wątku argumentował, że własny, dopasowany harness realnie obniża koszt i podnosi niezawodność przez chudsze prompty, lepszy routing, kompakcję kontekstu i weryfikatory wyników. LangChain potwierdza to konkretną liczbą, zmiana formatu odczytu plików obniżyła liczbę błędów `edit_file` o 15% i całkowite zużycie tokenów wejściowych o 10%, bez zmiany modelu.

Ten sam wzorzec widać w liczbach cenowo-wydajnościowych. DeepSeek-V4.1-Flash (Max) wylądował na granicy Pareto z poprawą netto 4,87% przy koszcie rzędu 6-7 centów za zadanie, dla porównania Hy4 preview daje 4,96% poprawy za 22 centy, a Kimi K3 (Max) 6,39% za 77 centów. Różnica nie bierze się z tego, że DeepSeek jest z natury lepszym modelem, tylko z tego, jak tanio i skutecznie deleguje pracę w ramach własnej architektury orkiestracji. To ten sam argument z innej strony, droższy, sprawniejszy model prowadzący orkiestrację potrafi obniżyć koszt całości, delegując lepiej, nie samą swoją mocą obliczeniową.

**Key takeaways:**
- Zmiana formatu odczytu plików w LangChain obniżyła błędy `edit_file` o 15% i zużycie tokenów wejściowych o 10%, bez zmiany modelu.
- DeepSeek-V4.1-Flash osiąga najlepszy stosunek poprawy do kosztu wśród porównywanych modeli (4,87% za 6-7 centów za zadanie) dzięki architekturze wokół modelu, nie samemu modelowi.
- Praktyczny przepis na harness: rozdzielić inferencję, narzędzia i pętlę, trzymać prompty minimalne, logować agresywnie, testować na różnorodnych zadaniach, dopiero potem dokładać pamięć i subagentów.

**Why do I care:** To potwierdzenie czegoś, co część z nas już podejrzewała empirycznie, im więcej czasu spędzacie na promptach zamiast na architekturze wokół modelu, tym mniej zwrotu z każdej kolejnej godziny pracy. Jeśli wasz agent na produkcji zawodzi nieprzewidywalnie, warto najpierw przejrzeć routing, format kontekstu i logi, zanim sięgniecie po droższy model w nadziei, że to on rozwiąże problem.

**Link:** [[AINews] AEF-1 standard emerges for Third Party Evaluators](https://www.latent.space/p/ainews-aef-1-standard-emerges-for)
