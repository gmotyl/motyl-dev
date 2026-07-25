---
title: "OpenRouter, Opus 5 i koniec zamkniętych ogrodów AI"
excerpt: "Premiera Claude Opus 5, plotki o przejęciu OpenRouter przez Stripe za 10 miliardów dolarów i wspólny front NVIDII oraz Anthropic pokazują, że przyszłość programowania z AI to wolny wybór modeli, a nie lojalność wobec jednego dostawcy."
publishedAt: "2026-07-25"
slug: "openrouter-opus-5-era-wolnosci-modeli"
hashtags: "#kilo #ai #llm #openrouter #generated #pl"
---

## OpenRouter, Opus 5 i koniec zamkniętych ogrodów AI

**TLDR:** Anthropic wypuściło Opus 5 w cenie o połowę niższej niż Fable 5, przy porównywalnych możliwościach w kodowaniu i pracy agentowej. Równolegle pojawiły się doniesienia o możliwym przejęciu OpenRouter przez Stripe za 10 miliardów dolarów, a NVIDIA i Anthropic publicznie opowiedziały się za ekosystemem, w którym modele otwarte i zamknięte współistnieją. Zdaniem Kilo to koniec narracji „open kontra closed” i początek ery, w której liczy się routing, czyli umiejętność dobierania modelu do konkretnego zadania.

**Podsumowanie:** Dzień, w którym ukazał się ten artykuł, zebrał kilka wydarzeń, które osobno wyglądałyby na ciekawostki, a razem układają się w spójny obraz zmiany rynku. Anthropic wypuściło Claude Opus 5 z ceną 5 dolarów za milion tokenów wejściowych i 25 dolarów za milion wyjściowych, z oknem kontekstu na poziomie miliona tokenów oraz trybem Fast działającym około 2,5 raza szybciej za podwójną stawkę. To wciąż ta sama cena co poprzedni Opus, ale przy wyraźnie wyższych możliwościach, zbliżonych do flagowego Fable 5, tyle że za połowę jego kosztu. Kilo donosi, że model od razu trafił do ich platformy i spodziewają się popytu podobnego do tego, jaki wygenerował GPT 5.6 Sol, obecnie najczęściej wybierany płatny model w Kilo.

Drugim wątkiem są doniesienia o możliwym przejęciu OpenRouter przez Stripe za około 10 miliardów dolarów. OpenRouter nie tworzy własnych modeli, tylko udostępnia jedno API do routingu zapytań po setkach różnych LLM-ów. Jeśli te plotki się potwierdzą, będzie to sygnał, że warstwa infrastruktury łączącej laby AI z firmami wdrażającymi te technologie staje się dziś jednym z najcenniejszych aktywów w branży, swego rodzaju punktem poboru opłat między dostawcami modeli a ich odbiorcami. Kilo podkreśla, że sami generują ponad 8 bilionów tokenów miesięcznie właśnie przez OpenRouter, korzystając z bardzo szerokiej puli modeli, więc trudno się dziwić, że popierają ten kierunek.

Trzeci element to deklaracje polityczne. Jensen Huang w swoim pierwszym wpisie na X podzielił się listem podpisanym przez koalicję 25 firm, w tym NVIDIA, broniącym ekosystemu modeli otwartych, argumentując, że wzmacniają one bezpieczeństwo, przyspieszają innowacje i umożliwiają suwerenność technologiczną poszczególnym krajom. Tego samego dnia Anthropic przekazało dodatkowe 20 milionów dolarów organizacji Public First Action na edukację w zakresie polityki AI. Obie firmy, mimo że jedna reprezentuje głównie otwarte modele sprzętowo wspierane, a druga zamknięte API, mówią właściwie to samo: rynek potrzebuje obu typów modeli obok siebie, a nie wojny między nimi.

Z perspektywy Kilo to wszystko potwierdza obserwację, którą robią na co dzień patrząc na swój leaderboard: ponad połowa najczęściej używanych modeli w trybie agentowym, przy planowaniu i kodowaniu, to modele open-weight, takie jak NVIDIA Nemotron czy MoonshotAI, obok zamkniętych rozwiązań od xAI, OpenAI czy Anthropic. Pytanie „czy AI jest już wystarczająco mądre, żeby napisać ten kod” przestało mieć sens, bo odpowiedź brzmi tak niemal zawsze. Prawdziwym pytaniem stało się to, który model najlepiej pasuje do konkretnego zadania i ile to będzie kosztować przy codziennym użyciu. To przesuwa ciężar pracy developera z pisania promptów na orkiestrację, czyli decydowanie, co przekazać modelowi frontierowemu do złożonego rozumowania architektonicznego, a co odesłać do tańszej, szybszej alternatywy przy prostych, powtarzalnych zadaniach.

**Kluczowe wnioski:**
- Opus 5 zachowuje cenę poprzednika (5 USD za milion tokenów wejściowych, 25 USD za wyjściowe), ale oferuje możliwości zbliżone do Fable 5 za połowę jego kosztu, z oknem kontekstu miliona tokenów i trybem Fast przy podwójnej stawce.
- Plotki o przejęciu OpenRouter przez Stripe za 10 miliardów dolarów pokazują, że warstwa routingu między modelami a aplikacjami staje się osobnym, bardzo wartościowym segmentem rynku.
- NVIDIA (list 25 firm broniący modeli otwartych) i Anthropic (donacja na edukację polityczną w AI) w tym samym dniu opowiedziały się za koegzystencją modeli otwartych i zamkniętych, zamiast rywalizacji między nimi.
- Na leaderboardzie Kilo ponad połowa najpopularniejszych modeli w zadaniach agentowych to modele open-weight, co podważa tezę o dominacji wyłącznie zamkniętych API.
- Opus 5 jest dostępny na AWS Bedrock już w dniu premiery, co wcześniej wymagało tygodni oczekiwania, a to kolejny dowód na dojrzewanie infrastruktury dystrybucji modeli.

**Dlaczego mnie to obchodzi:** Jako ktoś, kto od dawna doradza zespołom przy architekturze rozwiązań opartych o AI, widzę w tym potwierdzenie czegoś, co powtarzam klientom od miesięcy: warto projektować systemy pod routing modeli, a nie pod jeden konkretny model czy dostawcę. Firma, która dziś zaszywa się na sztywno w jednym API, za pół roku będzie płacić za to podwójnie, raz w postaci utraconej elastyczności cenowej, a raz w postaci kosztu migracji, gdy okaże się, że tańszy lub lepszy model czeka tuż obok w tym samym OpenRouterze. To, że Stripe rozważa wejście w tę przestrzeń, a nie kolejny lab modelowy, mówi mi więcej o dojrzałości rynku niż sama premiera Opus 5. Warstwa pośrednicząca, nie sam model, staje się miejscem, gdzie faktycznie da się zbudować trwałą przewagę biznesową.

**Link:** [OpenRouter, Opus 5, and the Era of Model Freedom](https://blog.kilo.ai/p/openrouter-opus-5-and-the-era-of?publication_id=4363009&post_id=208389016&isFreemail=true&triedRedirect=true)
