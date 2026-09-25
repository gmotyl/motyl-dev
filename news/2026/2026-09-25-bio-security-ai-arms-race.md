---
title: "Bio-security to wyścig zbrojeń, nie jednorazowy problem do zamknięcia"
excerpt: "Eric Nguyen z Radical Numerics tłumaczy, dlaczego te same modele języka genomu, które podnoszą ryzyko biologiczne, są też jedynym sposobem, żeby obrona nie została w tyle."
publishedAt: "2026-09-23"
slug: "bio-security-ai-arms-race"
hashtags: "#latent #ai #llm #ml #security #science #generated #pl"
source_pattern: "Latent.Space"
---

## Bio-security to wyścig zbrojeń, nie jednorazowy problem do zamknięcia

**TLDR:** Eric Nguyen, współzałożyciel Radical Numerics i współtwórca modeli Evo oraz Evo 2, tłumaczy, dlaczego te same modele językowe genomu, które podnoszą ryzyko biologiczne, są też jedynym sposobem, żeby obrona nie została w tyle za możliwościami ataku. Rozmowa zahacza też o niedawny atak na infrastrukturę powiązaną z OpenAI i Hugging Face jako sygnał, że pytania o bio-bezpieczeństwo przestały być teoretyczne.

**Summary:** Punktem wyjścia rozmowy jest atak, który dotknął infrastrukturę powiązaną z OpenAI i Hugging Face i skłonił ludzi do pytania, czego jeszcze powinniśmy się obawiać. Filtry Anthropic od dawna oznaczają dwa obszary wysokiego ryzyka, cyberbezpieczeństwo i biologię. Clem Delangue z Hugging Face argumentował po ataku, że zdolności obronne w cyberbezpieczeństwie muszą być otwarte i nadążać za możliwościami ataku najlepszych modeli, bo bezpieczeństwa AI nie da się rozwiązać w tajemnicy przez jedną firmę. Eric Nguyen przenosi ten sam argument na biologię.

Zanim założył Radical Numerics, Nguyen na Stanfordzie długo nie mógł przebić się z ideą modeli językowych genomu, w skrócie GLM. Biolodzy nie wierzyli, że to zadziała, nie ufali weryfikowalności wyników i nie widzieli zastosowań wykraczających poza to, co już potrafili zrobić inaczej. Mimo to doprowadził do powstania modeli Evo i Evo 2 w Arc Institute, które osobny zespół wykorzystał później do wygenerowania całych genomów bakteriofagów zsyntetyzowanych następnie w funkcjonalne wirusy.

DNA różni się od języka naturalnego tym, że ma bardzo mały alfabet, złożony z czterech liter, A, C, T i G, ale bardzo długie sekwencje, sięgające miliardów znaków dla całego ludzkiego genomu. To innowacje w modelach z długim kontekstem, powstałe około trzech lat temu, na długo przed tym jak laby frontier zaczęły budować konteksty rzędu miliona tokenów, uczyniły takie modelowanie w ogóle wykonalnym. Modele Radical Numerics radzą sobie już nieźle z RNA i białkami, bo w sekwencji DNA istnieją wyraźne markery genów, co oznacza, że model generalizuje na kilka języków biologii, zanim jeszcze zacznie się trenować na strukturze 3D białek czy epigenetyce.

Nguyen opisuje eksperyment, w którym pokazano modelowi sekwencje aptamerów RNA o rosnącej jakości, ale celowo bez tych najlepszych, i poproszono go, żeby kontynuował ten trend samodzielnie. Model odtworzył część wyników lepszych niż wszystko, co wcześniej widział, w praktyce chain-of-thought realizowany w języku DNA zamiast w języku naturalnym. Dokładnie tak, jak długi kontekst, chain-of-thought i percepcja wielomodalna odblokowały bardziej zaawansowane rozumowanie w modelach językowych, te same zdolności w GLM-ach otwierają drogę do coraz bardziej zaawansowanej inteligencji biologicznej, a wraz z nią do większego ryzyka.

Według Nguyena obrona obecnie przegrywa ten wyścig, ale odpowiedzią Radical Numerics jest przesuwanie granicy możliwości jeszcze mocniej do przodu, a nie wycofywanie się z badań. Zespół, który stoi za firmą, wywodzi się w większości z Liquid AI i Stanfordu, co samo w sobie pokazuje, jak wąski jest krąg ludzi decydujących dziś o kierunku rozwoju tej technologii.

**Key takeaways:**
- Modele językowe genomu, GLM, mają ten sam wzorzec skalowania co modele językowe tekstu: długi kontekst, chain-of-thought i wielomodalność odblokowują coraz bardziej zaawansowane rozumowanie, tylko w języku DNA.
- Modele Evo i Evo 2 posłużyły już do wygenerowania całych genomów bakteriofagów zsyntetyzowanych w funkcjonalne wirusy, co pokazuje, że ryzyko nie jest teoretyczne.
- DNA ma mały alfabet, cztery litery, ale bardzo długie sekwencje, więc dopiero innowacje w długim kontekście sprzed około trzech lat uczyniły modelowanie genomu wykonalnym.
- Eksperyment z aptamerami RNA pokazał, że model potrafi ekstrapolować w kierunku lepszych wyników, których nigdy nie widział, odpowiednik chain-of-thought w języku biologii.
- Nguyen przyznaje, że obrona obecnie przegrywa z możliwościami ataku, a Radical Numerics odpowiada na to przesuwaniem granicy możliwości zamiast wycofywania się z badań.

**Why do I care:** Jako architekt na co dzień pracujący z systemami produkcyjnymi patrzę na to nie przez pryzmat biologii, tylko przez pryzmat znajomego mi kompromisu między bezpieczeństwem przez utajnienie a bezpieczeństwem przez jawność, tylko postawionego tu na maksymalną stawkę. Argument Delangue'a i Nguyena, że obrona musi być otwarta, żeby nadążać za atakiem, brzmi znajomo każdemu, kto pracował z open source w security, ale rzadko widzi się go rozciągniętym na obszar, gdzie błąd oznacza syntezę funkcjonalnego wirusa, a nie wyciek danych logowania. To nie jest news dla frontend developera na dziś, ale jest sygnałem, że regulacje wokół modeli fundamentalnych prędzej czy później dotkną też narzędzi, z których korzystamy na co dzień, jeśli infrastruktura AI zacznie być traktowana jak infrastruktura krytyczna.

**Link:** [Bio-security is an AI Arms Race — Eric Nguyen (CEO, Radical Numerics)](https://www.latent.space/p/bio-security-is-an-ai-arms-race-eric)
