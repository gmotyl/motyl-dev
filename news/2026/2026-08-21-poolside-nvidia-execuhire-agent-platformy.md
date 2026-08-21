---
title: "Poolside sprzedaje model factory NVIDII za 12 miliardów dolarów w odwróconym execuhire"
excerpt: "NVIDIA licencjonuje technologię Poolside za 6 miliardów dolarów i przejmuje 109 jej pracowników, płacąc założycielom miliard za zostanie, w bezprecedensowym odwróceniu klasycznego schematu execuhire, a w tle Anthropic i OpenAI dalej rozbudowują swoje platformy agentowe."
publishedAt: "2026-08-21"
slug: "poolside-nvidia-execuhire-agent-platformy"
hashtags: "#AINews #ai #agents #llm #openai #anthropic #nvidia #generated #pl"
source_pattern: "AINews"
---

## Poolside sprzedaje model factory NVIDII za 12 miliardów w odwróconym execuhire

**TLDR:** NVIDIA płaci Poolside 6 miliardów dolarów za niewyłączną licencję na ich technologię modelową i inwestuje miliard w spółkę przy wycenie 12 miliardów, przejmując przy tym 109 pracowników, ale to założyciele zostają, a pracownicy odchodzą, co odwraca klasyczny schemat execuhire.

**Summary:** Miesiąc wcześniej Poolside gościło na podcaście Latent Space, prezentując swój Model Factory z Eiso Kantem. Teraz Jensen Huang, który wcześniej był tylko inwestorem, podpisuje niewyłączną licencję za 6 miliardów dolarów i dokłada miliard inwestycji przy wycenie 12 miliardów przed inwestycją, przejmując jednocześnie 109 pracowników Poolside, czyli praktycznie całą techniczną kadrę firmy. Sami założyciele podkreślają, że to "nie jest akwizycja i nie jest acquihire", bo w typowych deals execuhire (Windsurf-Google, Character-Google, Scale-Meta, Instacart-OpenAI) to zarząd odchodzi z pieniędzmi, a pracownicy zostają ze spółką. Tutaj jest odwrotnie: pracownicy odchodzą do NVIDII, założyciele zostają z gotówką i wolną ręką na nowy kierunek.

Za tą decyzją stoi brutalna matematyka compute. Poolside przyznaje, że pod koniec zeszłego roku mieli sześć tygodni na zebranie 2 miliardów dolarów na sfinansowanie klastra 40 tysięcy GB300, który miał ruszyć w styczniu, i nie zdążyli, więc stracili ten klaster. Skala klastra potrzebnego, żeby konkurować z frontierem, rośnie szybciej niż tylko dostęp do kapitału, ograniczeniem staje się też fizyczna przestrzeń data center i skontraktowany compute. Spółka infrastrukturalna PIC, wydzielona w styczniu 2026, wciąż buduje 1,2 GW data center w Teksasie i dostała nowego CEO dwa miesiące temu, a CFO trzy dni temu, co sugeruje, że przyszłość Poolside to raczej infrastruktura i neocloud niż dalszy trening własnych modeli od zera.

W tym samym oknie czasowym OpenAI i Anthropic rozszerzały swoje platformy agentowe. OpenAI wypuściło wtyczkę do Apple Messages w ChatGPT na komputery Mac, wspólną edycję w ChatGPT Sites z Codexem zarządzającym gitem i CI, oraz przezroczyste tła w GPT-Image-2 w wersji preview. Anthropic ogłosiło ogólną dostępność computer use, browser tool, Skills API i Files API na platformie Claude, z limitem 500 zapytań na minutę i 1 TB na organizację w przypadku Files API. To pokazuje kierunek obu firm: przejście od modelu jako czatu do modelu jako warstwy koordynującej realne akcje na koncie użytkownika.

Osobny, mocny sygnał ekonomiczny dały dane z AT&T: 40 procent zużycia AI wśród pracowników już teraz kieruje się do modeli open-weight, z celem 60-70 procent, przy 56-procentowym spadku kosztów kodowania i tylko 2-procentowym spadku jakości, na skali 45 miliardów tokenów dziennie. To konkretna liczba, która pokazuje, że modele "wystarczająco dobre" zjadają środek rynku enterprise, a modele zamknięte, najdroższe, zostają zarezerwowane dla najtrudniejszych zadań.

**Key takeaways:**
- NVIDIA płaci 6 miliardów za licencję na technologię Poolside i przejmuje 109 pracowników, a założyciele zostają z miliardem inwestycji i nowym kierunkiem.
- Deal odwraca klasyczny schemat execuhire: pracownicy odchodzą do kupującego, założyciele zostają ze spółką i kapitałem.
- Powodem sprzedaży jest brak dostępu do wystarczająco dużego klastra compute, po utracie zamówienia na 40 tysięcy GB300.
- Anthropic i OpenAI rozszerzają platformy agentowe (Skills API, Files API, computer use, integracje desktopowe), przesuwając model od czatu do warstwy koordynującej akcje.
- AT&T kieruje 40 procent zużycia AI do modeli open-weight z celem 60-70 procent, redukując koszty kodowania o 56 procent przy spadku jakości o tylko 2 procent.

**Why do I care:** Deal Poolside-NVIDIA jest ciekawy głównie jako sygnał, że bariera wejścia w trenowanie własnych modeli frontier rośnie szybciej niż większość startupów może nadążyć kapitałem, nawet z dobrym zespołem i dobrym modelem. Dla mnie jako architekta ważniejszy praktycznie jest wątek AT&T: 56-procentowa redukcja kosztów kodowania przy 2-procentowym spadku jakości to konkretna liczba, którą można przynieść na rozmowę o budżecie, a nie tylko ogólne przeczucie, że "open-weight modele są już wystarczająco dobre". Jeśli enterprise w tej skali potrafi przekierować 40 procent zużycia na modele open, to jest to argument za projektowaniem swojej warstwy agentowej tak, żeby model był wymienny, a nie zaszyty na trwałe w jednym dostawcy.

**Link:** [AINews: Poolside gets $12B reverse-execuhire to NVIDIA](https://www.latent.space/p/ainews-poolside-gets-12b-reverse)
