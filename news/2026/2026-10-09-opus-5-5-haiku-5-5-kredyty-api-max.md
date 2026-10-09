---
title: "Opus 5.5 przejął robotę po Fable, a Haiku 5.5 obalił teorię autora"
excerpt: "Paweł Jóźwiak opisuje swoją codzienną konfigurację po trzech premierach Anthropic w piętnaście dni: Opus 5.5 do pracy agentowej, Sonnet 5.5 jako tańsza opcja i Haiku 5.5 jako wykonawca podzadań."
publishedAt: "2026-10-09"
slug: "opus-5-5-haiku-5-5-kredyty-api-max"
hashtags: "#joozio #ai #agents #llm #devtools #productivity #generated #pl"
source_pattern: "PawelJozefiak"
---

## Opus 5.5 przejął robotę po Fable, a Haiku 5.5 obalił teorię autora

**TLDR:** Autor twierdzi, że po premierach Opus 5.5, Sonnet 5.5 i Haiku 5.5 to najlepszy zestaw modeli Anthropic, z jakiego korzystał, i przestał myśleć o odejściu do OpenAI. Opus planuje i recenzuje, Haiku wykonuje podzadania, a nowy miesięczny kredyt API w planie Max dokłada do tego darmowy budżet.

**Summary:** Autor zaczyna od osobistego kontekstu. Miesiąc wcześniej wznowił subskrypcję Codexa, bo limity pięciogodzinne w Claude zdarzało mu się osiągać tak często, że planował pod nie dzień pracy. Od tamtej pory Anthropic wypuścił trzy modele w piętnaście dni. Opus 5.5 pojawił się 22 września, Sonnet 5.5 28 września, a Haiku 5.5 7 października. Do tego doszła zmiana cennika i dodatek do subskrypcji, którego autor się nie spodziewał.

Opus 5.5 robi u niego całą pracę agentową, czyli budowanie, naprawianie i orkiestrację długich sesji w Claude Code. Działa na średnim albo wysokim poziomie wysiłku rozumowania i rzadko trzeba go podkręcać, co autor uważa za nowość. Przy Fable 5 spędził tygodnie, ucząc się, że maksymalny wysiłek to pułapka. Opus 5.5 jest też tańszy od poprzednika, bo kosztuje 4 dolary za milion tokenów wejściowych i 20 za wyjściowe, a Opus 5 kosztował 5 i 25. Fable 5.1 zostaje najmocniejszy w projektowaniu, ale kosztuje 10 i 50 dolarów, czyli dwa i pół raza więcej. Autor zauważył już wcześniej, że Fable 5.1 zużywa więcej tokenów na zadanie niż poprzednik. Przy małej różnicy jakości i takiej różnicy w cenie prawie przestał go używać.

Sonnet 5.5 ocenia jako zaskakująco dobry, choć poprzedni Sonnet wypadał przy Opusie słabo. Pomogła cena. 7 października Anthropic obniżył o połowę koszt odczytu z cache, z 0,20 do 0,10 dolara za milion tokenów, a ceny wejścia i wyjścia zostały na 2 i 10 dolarach. Agent czyta ten sam kontekst cały dzień, więc to właśnie tam siedzi rachunek. Anthropic szacuje, że typowe zadania agentowe tanieją o około 20 procent.

Najciekawsza jest część o Haiku. Autor od dawna żartował z tego modelu i zbudował nawet stronę stale.jock.pl, która liczy, jak dawno każdy model wyszedł i kiedy skończył się jego trening. Haiku 4.5 stał tam wysoko, z premierą w październiku 2025 i datą odcięcia w lipcu 2025. Jego teoria brzmiała tak: ceny i modele idą w górę, Fable zostaje topem, Opus koniem roboczym, Sonnet wchodzi w miejsce Haiku, a Haiku trafi do wycofania. Okazała się błędna. Haiku 5.5 kosztuje 0,10 dolara za milion tokenów wejściowych i 0,50 za wyjściowe przy promptach poniżej 100 tysięcy tokenów, a Haiku 4.5 kosztował 1 i 5. Powyżej 100 tysięcy cena rośnie pięciokrotnie. Według danych producenta model osiąga 72,4 procent w OSWorld 2.1, benchmarku computer use, gdzie Haiku 4.5 miał 15,7, a Sonnet 5.5 ma 83,9. Po raz pierwszy ma też regulowany wysiłek rozumowania, domyślnie średni.

Autor nie zamierza używać Haiku do pisania kodu, bo pisanie rzadko jest drogą częścią. Drogie jest zbieranie kontekstu, czytanie stosów materiału, weryfikacja i kategoryzacja. Każe więc Opusowi orkiestrować i delegować podzadania Haiku. Pasuje to do jego poglądu, że większość pracy agenta to hydraulika, która nie wymaga głębokiego rozumowania. Rekomenduje podział, w którym Opus lub Sonnet planują, decydują i recenzują, a Haiku robi wyszukiwania, streszczenia, klasyfikację, przeglądy plików i kompakcję. Radzi zostawić trochę rozumowania, bo deweloper z relacji Theo wyłączył je całkiem i dostał gorszy wynik niż w małym modelu OpenAI. Kontekst Haiku warto trzymać poniżej 100 tysięcy tokenów.

Ostatnia nowość to miesięczny kredyt API dla subskrybentów Max, 100 dolarów na Max 5x i 200 na Max 20x, a w planach zespołowych pula do 500 dolarów. Działa w Claude API, Agent SDK, Managed Agents i Playground, przez klucz z organizacji Console podłączonej do planu. Interaktywny Claude Code zostaje na limitach planu, które nie rosną. Niewykorzystany kredyt przepada na koniec okresu rozliczeniowego, a podłączyć można tylko jedną organizację Console, której zmiana wymaga pisania do supportu. Autor widzi lock-in, ale akceptuje go, bo to dodatek do tego, co już płaci. Codexa zostawia, bo Astra jest dobra, a model trenowany gdzie indziej łapie rzeczy, które Opus przeoczy. Na ten tydzień plan to Opus 5.5 jako głowa, Haiku 5.5 jako ręce i 200 dolarów kredytu na mały projekt, który normalnie poszedłby przez OpenRouter.

**Key takeaways:**
- Opus 5.5 kosztuje 4 i 20 dolarów za milion tokenów i jest 2,5 raza tańszy od Fable 5.1, a w pracy agentowej autorowi wystarcza.
- Haiku 5.5 kosztuje 0,10 i 0,50 dolara poniżej 100 tysięcy tokenów, powyżej tej granicy cena rośnie pięciokrotnie.
- Wynik 72,4 procent w OSWorld 2.1 to dane producenta, ale skok z 15,7 procent trudno zignorować.
- Kredyt API w Max nie obejmuje interaktywnego Claude Code, wygasa co miesiąc i wiąże się z jedną organizacją Console.

**Why do I care:** Podział na model planujący i tani model wykonujący to wzorzec, który warto wdrożyć u siebie niezależnie od dostawcy, bo większość kosztów w agentach to czytanie kontekstu, nie myślenie. Autor opiera się jednak na własnych wrażeniach i benchmarkach producenta, a nie na pomiarze jakości swoich zadań. Nie mówi też, ile razy Haiku się pomylił i ile kosztowała weryfikacja jego pracy, a przy delegowaniu to jest główne ryzyko. Pominął również, że ceny zmieniają się co tydzień, więc rachunek sprzed trzech tygodni z Fable już się zdezaktualizował. Przed przepięciem całego pipeline'u zmierzyłbym więc pass rate na własnych zadaniach.

**Link:** [Opus 5.5 Took Fable's Job. Haiku 5.5 Proved Me Wrong.](https://thoughts.jock.pl/p/anthropic-5-5-lineup-opus-haiku-max-credits-2026)
