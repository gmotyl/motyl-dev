---
title: "ChatGPT dostał w końcu agenta, który pamięta, co mu zleciłeś"
excerpt: "TechTiff testuje dots, nowe persistent agenty OpenAI ogłoszone na DevDay: własny komputer w chmurze, kanał w Slacku i pamięć między rozmowami, dzięki której agent nie zaczyna każdej sesji od zera."
publishedAt: "2026-09-30"
slug: "techtiff-openai-dots-chatgpt-agent-devday"
hashtags: "#ai #agents #devtools #generated #pl"
source_pattern: "TechTiff"
---

## ChatGPT dostał w końcu agenta, który wie, co mu zleciłeś wczoraj

**TLDR:** Na DevDay OpenAI ogłosiło dots, trwałe agenty w ChatGPT zasilane przez GPT-6 Astra, które zarządzają bieżącą pracą i kontynuują ją między rozmowami. Autorka testowała dots przed premierą i opisuje, jak agent z własnym komputerem w chmurze i dostępem do Slacka zmienia codzienną pracę z ChatGPT.

**Summary:** Największa zmiana nie dotyczy tego, co dot potrafi zrobić w pojedynczej rozmowie, tylko tego, że w ogóle nie trzeba zaczynać każdej rozmowy od zera. Dot ma własny komputer w chmurze, korzysta z przeglądarki, ChatGPT Work i Codexa do wykonywania zleceń, a przy okazji łączy się też z komputerem użytkownika, żeby pracować lokalnie na plikach. Autorka nadała swojemu dotowi imię i awatar, żabę w muszce, podłączyła go do Slacka i zaczęła używać połączeń głosowych bezpośrednio w ChatGPT, a osobno testowała też odbieranie zleceń mailem, wystarczyło przekazać wiadomość dotowi, żeby coś z nią zrobił bez otwierania aplikacji.

Kluczowa różnica w codziennym użyciu polega na tym, że to wciąż ten sam agent, niezależnie od kanału. Rozmowa w ChatGPT, przejście do Slacka, powrót później, wszystko trafia do tego samego dota, który pamięta, co się wydarzyło wcześniej, zamiast traktować każdą interakcję jak nowego asystenta bez pamięci. Główna rozmowa z dotem działa jak miejsce, w którym żyje cały projekt, kontekst celu i dotychczasowe ustalenia, a gdy pojawia się konkretne zlecenie, dot otwiera osobną rozmowę zadaniową na wykonanie, po czym wraca do głównej rozmowy z gotowym wynikiem i linkiem do szczegółów.

Po kilku dniach z dotem autorka natrafiła na nowy problem: jedna rozmowa jako miejsce zlecania zadań sprawdza się, dopóki tych zadań nie zrobi się kilka naraz, a wtedy łatwo zgubić, co się już zleciło. Rozwiązaniem było poproszenie samego dota o zbudowanie dashboardu pokazującego status wszystkich zleconych zadań i to, co wymaga uwagi, co samo w sobie pokazuje, jak agent zarządza dziś nie tylko wykonaniem, ale też własnym raportowaniem. Nadanie dotowi trwałej odpowiedzialności nie oznacza jednak oddania mu wszystkich decyzji: użytkownik wybiera aplikacje, do których dot ma dostęp, ustawia granice przez uprawnienia i własne reguły, i przegląda akcje wymagające zatwierdzenia. Dots trafiają na ChatGPT Pro i Business Premium w kwalifikujących się rynkach, z beta dla Enterprise, Edu i Healthcare włączaną przez administratora.

**Key takeaways:**
- Dot to trwały agent zasilany przez GPT-6 Astra, z własnym komputerem w chmurze, dostępem do przeglądarki, ChatGPT Work i Codexa
- Ten sam dot działa w ChatGPT, Slacku, Teams i (wkrótce) SMS-ach, pamiętając kontekst niezależnie od kanału
- Główna rozmowa z dotem trzyma kontekst projektu, a konkretne zlecenia trafiają do osobnych rozmów zadaniowych
- Użytkownik ustawia granice przez uprawnienia i reguły, decydując co dot robi samodzielnie, a co wymaga zatwierdzenia

**Why do I care:** To pierwszy mainstreamowy produkt, w którym "agent z pamięcią między sesjami" przestaje być czymś, co trzeba samemu sklecić przez system promptów i bazę wektorową, tylko staje się domyślną cechą produktu konsumenckiego. Dla developerów budujących własne agenty to punkt odniesienia: jeśli ChatGPT normalizuje trwały kontekst i dashboard statusu zadań jako oczekiwanie użytkownika, warto sprawdzić, czy nasz agentowy produkt oferuje coś porównywalnego, zanim stanie się to standardem, którego brak rzuca się w oczy.

**Link:** [ChatGPT Finally Got an Agent](https://techtiff.substack.com/p/openai-dots-chatgpt-agent)
