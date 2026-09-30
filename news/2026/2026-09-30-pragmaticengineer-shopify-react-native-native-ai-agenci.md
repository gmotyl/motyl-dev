---
title: "Dlaczego Shopify porzuca React Native po sześciu latach"
excerpt: "Pragmatic Engineer opisuje, jak Shopify przechodzi na natywny kod na iOS i Android, po tym jak agenty AI zniwelowały główną przewagę React Native: pisanie jednej wspólnej logiki zamiast dwóch. Shop app przeszedł na natywny kod w 12 tygodni."
publishedAt: "2026-09-30"
slug: "pragmaticengineer-shopify-react-native-native-ai-agenci"
hashtags: "#pragmaticengineer #react-native #mobile #architecture #ai #agents #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Shopify wraca do natywnego kodu, bo agenty zabrały React Native jego przewagę

**TLDR:** Shopify ogłosiło, że natywny kod jest teraz przyszłością mobilnej części firmy, sześć lat po głośnym przejściu na React Native. Powodem nie jest wydajność sama w sobie, tylko fakt, że agenty AI potrafią dziś pisać i utrzymywać dwa oddzielne natywne kodobazy na iOS i Android równie sprawnie, jak kiedyś jeden wspólny kod w React Native.

**Summary:** W 2020 roku Shopify przechodziło na React Native z bardzo konkretnego powodu: budowanie natywnych aplikacji na Androida trwało zbyt długo, a firma potrzebowała spójnych aplikacji na obu platformach jednocześnie. Historia Clubhouse z tego samego okresu pokazuje, jak wysoka była stawka takiego opóźnienia: aplikacja była dostępna tylko na iOS przez czternaście miesięcy, zanim wersja na Androida trafiła do sklepu, a do tego czasu popularność aplikacji już opadała. Pięć lat później Shopify migrowało sześć aplikacji do React Native i chwaliło się w podsumowaniu wynikami poniżej 500 milisekund do załadowania ekranu oraz ponad 99,9% sesji bez awarii, nazywając decyzję jednoznacznym sukcesem.

Zwrot przyszedł w tym miesiącu i zaskoczył całą społeczność mobilną niemal na taką samą skalę, jak oryginalna decyzja z 2020 roku. Szef mobilnego zespołu Shopify, Mustafa Ali, tłumaczy to wprost: modele kodujące stały się na tyle dobre, że pisanie tej samej funkcji w Swift i Kotlinie przestało kosztować tyle, ile kosztowało kiedyś. Koszt utrzymania dwóch kodobaz nie zniknął, ale agenty potrafią dziś portować feature z Androida na iOS i z powrotem, porównywać implementacje w czasie i wyłapywać rozjazdy między platformami przez testy równoległe. Shop app, najbardziej popularna z aplikacji Shopify, przeszedł na w pełni natywny kod w zaledwie 12 tygodni, a reszta aplikacji ma pójść w jego ślady.

Ciekawy jest tu mechanizm techniczny stojący za decyzją: Shopify zbudowało wspólny zestaw testów, który waliduje logikę biznesową zaimplementowaną osobno w Swift i Kotlinie, działający bezgłowo na desktopie, co daje agentom bardzo szybką pętlę zwrotną przy iterowaniu nad kodem. Jedną z ukrytych zalet React Native, brak potrzeby osobnych zespołów iOS i Android, też przestała być unikalna: jeden developer z pomocą agenta potrafi dziś pisać funkcję na obie platformy naraz, bo jak ujął to szef inżynierii Farhan Thawar, "React jako wspólny język został zastąpiony przez język angielski, dzięki LLM-om". Historia Airbnb, które przyjęło React Native w 2016 roku i wróciło do natywnego kodu dwa lata później z powodu wydajności, pokazuje, że ten ruch wahadła między cross-platform a natywnym kodem nie jest niczym nowym, tylko tym razem napędza go inny czynnik niż poprzednio.

**Key takeaways:**
- Shopify migruje wszystkie aplikacje z React Native do natywnego kodu na Swift i Kotlin, Shop app zrobił to w 12 tygodni
- Powodem nie jest wydajność, tylko fakt, że agenty AI zniwelowały koszt utrzymania dwóch osobnych kodobaz
- Wspólny, bezgłowy zestaw testów waliduje identyczną logikę biznesową w Swift i Kotlinie, dając agentom szybką pętlę zwrotną
- Historia Airbnb (2016 do React Native, 2018 z powrotem do natywnego kodu) pokazuje, że to wahadło już się kiedyś wychyliło, tylko z innego powodu

**Why do I care:** Ta decyzja jest ważniejsza niż zwykły spór "native kontra cross-platform", bo pokazuje, że agenty AI zmieniają kalkulację kosztów architektonicznych, które od lat traktowaliśmy jako stałe. Jeśli koszt utrzymania dwóch kodobaz faktycznie spada dzięki agentom, warto już teraz przemyśleć, czy uzasadnienie dla Reacta Native, Fluttera czy Kotlin Multiplatform w naszym projekcie wciąż się broni, czy trzymamy się go z przyzwyczajenia sprzed czterech lat.

**Link:** [Why has Shopify dropped React Native?](https://newsletter.pragmaticengineer.com/p/shopify-native-mobile)
