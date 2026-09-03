---
title: "Jak open source zabezpiecza przed technokracją San Francisco"
excerpt: "Kilo o serii wyłączeń dostępu do modeli AI w ostatnim roku, od zerwania kontraktu OpenAI z Cursorem po dyrektywę BIS wobec Anthropic, i o tym, dlaczego wagi open weights są jedynym zabezpieczeniem, którego nikt nie może cofnąć."
publishedAt: "2026-09-02"
slug: "kilo-open-source-hedge-against-sf-technocracy"
hashtags: "#kilo #ai #opensource #architecture #generated #pl"
source_pattern: "Kilo"
---

## Jak open source zabezpiecza przed technokracją San Francisco

**TLDR:** 29 sierpnia OpenAI ogłosiło, że 12 listopada odetnie Cursora od swoich modeli, bo nie ufa firmom Elona Muska po przejęciu Cursora przez SpaceX za 60 miliardów dolarów. Autor pokazuje, że to szósty czy siódmy taki incydent w ciągu roku, i dowodzi, że jedyną rzeczą, której nie da się cofnąć decyzją biznesową ani rządową dyrektywą, są wagi modelu leżące na twoim własnym dysku.

**Summary:** Historia zaczyna się od sporu, w którym nikt z zaangażowanych stron nie był deweloperem korzystającym z narzędzia. Jeśli ktoś miał GPT-5.6 wpięte w bota do code review w Cursorze, generator dokumentacji albo hook CI działający bez nadzoru człowieka, ma około dziesięciu tygodni na przebudowanie workflow z innym dostawcą. Autor wylicza serię podobnych zdarzeń z ostatnich dwunastu miesięcy: w czerwcu 2025 Anthropic z pięciodniowym wyprzedzeniem odciął Claude'a 3.x od Windsurfa zaraz po ujawnieniu przejęcia Windsurfa przez OpenAI za 3 miliardy dolarów, co zmusiło Windsurfa do dotowania Gemini 2.5 Pro. W sierpniu 2026 osobiste konta ChatGPT straciły możliwość tworzenia nowych Custom GPT, a Assistants API zostało wyłączone bez automatycznej ścieżki migracji, przez co Zapier musiał wygasić swoje integracje tego samego dnia.

Najbardziej niepokojący przykład dotyczy nie kontraktu biznesowego, tylko decyzji administracyjnej. W czerwcu 2026 amerykański Bureau of Industry and Security wydał Anthropic dyrektywę eksportową nakazującą zawieszenie dostępu do Claude Fable 5 i Mythos 5 dla każdego obcokrajowca na świecie, włącznie z zagranicznymi pracownikami samej Anthropic. Ponieważ nie da się w czasie rzeczywistym weryfikować obywatelstwa setek milionów kont, jedynym zgodnym z przepisami ruchem było wyłączenie obu modeli dla wszystkich. Modele wróciły po osiemnastu dniach, gdy Anthropic wytrenowało klasyfikator blokujący technikę wykorzystaną w demonstracji podatności. Wniosek autora jest taki, że BIS ma i jest gotowe użyć doraźnej władzy nadzwyczajnej nad dostępem do modeli, bez wcześniejszego ostrzeżenia, a to precedens dużo poważniejszy niż sama kontrola eksportu.

Kontrastem dla tych wszystkich wyłączeń jest to, że żaden model open weights nigdy nie został w ten sposób wycofany, z prostego powodu: nie da się cofnąć checkpointu, który leży już na dziesięciu milionach dysków, jest zmirrorowany na Hugging Face i rozsiany po torrentach. Wagi nie mają klauzul zmiany kontroli. Autor przypomina, jak szybko doganiały jakościowo modele open weights, od DeepSeeka R1 w styczniu 2025, przez gpt-oss OpenAI wydane pod Apache 2.0 kilka miesięcy później, po DeepSeeka V4 Pro w kwietniu 2026 z licencją MIT i ceną rzędu jednej dziesiątej frontierowego API. Najbardziej wymowny jest przykład Cursora, który przetrwał odcięcie od OpenAI, bo wcześniej zbudował własny model Composer 2.5 na bazie open weights Kimi K2.5 od Moonshota, inwestując 85% mocy obliczeniowej w dodatkowy trening na tej bazie.

Wniosek autora jest pragmatyczny, nie ideologiczny: otwartość w tym rynku to ruch strategiczny, nie manifest. OpenAI wydało gpt-oss, bo DeepSeek zmusił ich do tego, a Cursor zbudował się na Kimi K2.5, bo potrzebował fundamentu, którego nikt nie może odebrać. Praktyczna rada, jaką z tego wyciąga, brzmi bez ozdobników: trzymaj swoje prompty i ewaluacje w miejscu, które możesz przepiąć w ciągu popołudnia, i zakładaj, że każde hostowane API agenta kiedyś trzeba będzie zastąpić.

**Key takeaways:**
- W ciągu ostatniego roku doszło do co najmniej sześciu głośnych wyłączeń dostępu do modeli AI, od kontraktów biznesowych po dyrektywę administracyjną BIS wobec Anthropic.
- Żaden model open weights nigdy nie został wycofany w ten sposób, bo nie istnieje mechanizm prawny pozwalający cofnąć plik leżący na milionach dysków.
- Cursor przetrwał odcięcie od OpenAI, bo wcześniej zbudował własny model na bazie open weights Kimi K2.5, co autor nazywa zarządzaniem ryzykiem, a nie ideologią.

**Why do I care:** Jeśli twoja firma ma jakikolwiek krytyczny proces oparty wyłącznie na jednym hostowanym API modelu, ten tekst jest dobrym powodem, żeby sprawdzić, ile czasu zajęłoby przepięcie się na innego dostawcę. Nie chodzi o to, żeby od razu hostować własne wagi, tylko o to, żeby prompty, ewaluacje i logika biznesowa nie były zaszyte w jednym vendorze na tyle mocno, że dziesięciotygodniowe wypowiedzenie kontraktu stanie się egzystencjalnym problemem dla produktu.

**Link:** [How Open Source Hedges Against the SF Technocracy](https://blog.kilo.ai/p/how-open-source-hedges-against-the)
