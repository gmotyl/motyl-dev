---
title: "Zwolnij, żeby przyspieszyć: sześć miesięcy, które zmieniły sposób pracy w software"
excerpt: "Grzegorz Domin podsumowuje swoje wystąpienie z Craft Conference 2026, w którym opisuje głębokie zmiany w branży wywołane przez agentów AI -- od katastrofalnego incydentu Mety po to, jak Anthropic, OpenAI i Uber przebudowują cały workflow programistyczny."
publishedAt: "2026-06-23"
slug: "zwolnij-zeby-przyspieszyc-szesc-miesiecy-ktore-zmienily-software"
hashtags: "#pragmaticengineer #ai #softwaredevelopment #agentai #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Zwolnij, żeby przyspieszyć: sześć miesięcy, które zmieniły sposób pracy w software

**TLDR:** Gergely Orosz wygłosił keynote na Craft Conference 2026, w którym opisał transformację branży software wywołaną przez agentów AI od listopada 2025 roku. Meta niedługo przed konferencją zaliczała największą kompromitację w swojej historii -- bot Meta AI pozwalał na zmianę adresu e-mail dowolnego konta bez żadnego uwierzytelniania. Orosz łączy ten incydent z szerszymi trendami: degradacją jakości kodu, zanikiem recenzji przez człowieka i przebudową zespołów inżynierskich w całej branży.

Na początku czerwca 2026 Meta zaliczyła incydent, który trudno zrozumieć nawet dziś: użytkownicy mogli po prostu poprosić bota Meta AI o zmianę adresu e-mail dowolnego konta. Dowolnego -- włącznie z kontem Baracka Obamy. Zero autoryzacji, zero weryfikacji, zero alarmów przez tygodnie. Instagram dowiedział się o problemie z mediów, nie z własnego monitoringu.

Orosz rozmawiał z inżynierami Mety i obraz, który zebrał, jest niepokojący. Kod generowany przez AI i recenzowany przez AI, bez żadnego udziału człowieka, stał się normą w wielu częściach kodebase'u. Jednocześnie zespoły Integrity, Trust & Safety i dokumentacji zostały mocno przerzedzone -- przez zwolnienia i przymusowe przeniesienia do pracy nad labelowaniem danych dla modeli AI. Dokumentacja deweloperska straciła 95% ludzi, design Instagrama 44%, a zespoły bezpieczeństwa WhatsApp też oberwały. To nie jest przypadkowy zbieg okoliczności -- to bezpośrednie przełożenie priorytetów organizacyjnych na wypadek produkcyjny.

Mnie osobiście ten przypadek mówi coś ważnego o ryzyku, jakie przyjmuje organizacja, gdy wypycha AI jako priorytet absolutny kosztem podstawowego maintenance'u systemów generujących przychód. Instagram, WhatsApp i Facebook to rdzeń przychodów Mety -- a te systemy nie miały w tym momencie odpowiedniego pokrycia oncallowego ani funkcjonalnych zespołów bezpieczeństwa. Żadna liczba równolegle działających agentów nie zastąpi inżyniera, który wie, co powinno być niemożliwe do zmiany przez bota.

Orosz cofnął się do listopada 2025, kiedy pojawiły się modele nowej generacji -- Claude Opus 4.5, GPT-5.4 i ich rówieśnicy. Simon Willison, twórca Django, precyzyjnie wskazał ten moment jako przełom: "Modele wydane w listopadzie 2025 sprawiły, że agenci stali się naprawdę użyteczni." Dane to potwierdzają. Zespoły używające agentów AI z platformy Linear produkują teraz 5 razy więcej pull requestów niż dwa lata temu. Deweloperzy używający Cursora przeszli z 3500 linii kodu miesięcznie w styczniu 2025 do 8600 dziś. Rozmiar PR-ów wzrósł trzykrotnie w ciągu osiemnastu miesięcy.

Wraz z tym wzrostem kodu zmniejsza się udział człowieka w jego przeglądaniu. Orosz pokazał dane Cursora: od lutego 2026, kiedy wyszły Opus 4.7 i GPT-5.5, wyraźnie rośnie odsetek zmian akceptowanych bez ludzkiego code review. Innymi słowy: piszemy szybciej, ale patrzymy na to, co piszemy, coraz mniej uważnie. A incydent Mety pokazuje, dokąd to prowadzi.

**Key takeaways:**
- Meta AI umożliwiał zmianę adresu e-mail dowolnego konta bez uwierzytelniania -- kod był generowany i recenzowany przez AI, a zespoły bezpieczeństwa zostały osłabione przez reorganizację
- Od listopada 2025 liczba PR-ów wzrosła 5x, ilość generowanego kodu 2,5x, rozmiar PR-ów 3x -- a odsetek zmian bez ludzkiego review rośnie od lutego 2026
- DHH (twórca Rails) i Simon Willison (twórca Django) otwarcie przyznają, że ich stosunek do AI w kodzie zmienił się diametralnie po pojawieniu się modeli z końca 2025
- Uber zbudował cały ekosystem wewnętrznych narzędzi (MCP Gateway, Agent Builder, Code Inbox, Minion) bo nie znalazł niczego wystarczającego na rynku
- Cisco w lutym 2026 uruchomił Codexa dla 18 tysięcy deweloperów do migracji i refactoringu -- "tradycyjne" firmy nie zostają w tyle za startupami

**Why do I care:** Ten keynote to jeden z lepszych zbiorczych obrazów tego, gdzie jesteśmy po sześciu miesiącach z naprawdę zdolnymi agentami. Orosz nie sprzedaje hype'u ani nie straszy -- zbiera dane i rozmawia z inżynierami z pierwszej linii. Dla mnie jako architekta frontend najważniejsza obserwacja to ta o jakości: więcej kodu, mniej uwagi, mniej recenzji. W świecie, gdzie każdy PR jest dwa razy większy, a połowa z nich przeszła tylko przez AI review, pytanie "kto to przetestował i jak" staje się poważniejsze niż kiedykolwiek. Meta zapłaciła za tę lekcję blamażem na skalę globalną. Wolę ją przyswoić w teorii.

**Link:** [Slow down to speed up: so much has changed in 6 months' time](https://newsletter.pragmaticengineer.com/p/slow-down-to-speed-up?publication_id=458709&post_id=203257304&isFreemail=true&triedRedirect=true)
