---
title: "Dlaczego agenty to nowy rodzaj oprogramowania, według Andrew Qu z Vercel"
excerpt: "Andrew Qu, Chief of Software w Vercel, tłumaczy czym są agenty, jak powstał framework eve i dlaczego sam Vercel staje się agentem."
publishedAt: "2026-07-03"
slug: "vercel-andrew-qu-agenty-nowy-rodzaj-oprogramowania"
hashtags: "#AINews #ai #vercel #agents #eve #MCP #frontend #generated #pl"
source_pattern: "AINews"
---

## Vercel buduje framework dla agentów i zmienia swój własny produkt w agenta

**TLDR:** Andrew Qu, Chief of Software w Vercel, opowiada o tym, jak doświadczenia przy budowaniu v0 doprowadziły do powstania eve, wewnętrznego frameworka dla agentów. Twierdzi, że agenty to nie kolejna forma aplikacji webowej, tylko fundamentalnie inny rodzaj oprogramowania.

**Summary:**

Andrew Qu pełni w Vercel dość specyficzną rolę, która łączy inżynierię wewnętrzną, eksperymenty z nowymi technologiami i pracę z CTO nad tym, co jest na froncie innowacji. Zbudował bibliotekę dla MCP, stworzył skills.sh i poprowadził prace nad frameworkiem eve. Zanim jednak powstał eve, Vercel musiał sam zmierzyć się z problemami, które dotykają każdego, kto dziś próbuje budować agenty.

Historia zaczyna się przy v0, czyli produkcie Vercel do generowania interfejsów przez AI. Przy jego budowie zespół natrafił na typowe bolączki: trudności ze zmianą modelu lub dostawcy, brak fallbacków, brak możliwości wznowienia przerwanego działania. Zamiast naprawić to tylko u siebie, Vercel zamienił rozwiązania w biblioteki wielokrotnego użytku. Z biegiem czasu tych prymitywów nazbierało się wystarczająco dużo, żeby złożyć je w spójny framework. Tak powstał eve.

Qu opisuje agenty jako nowy rodzaj oprogramowania, nie jako kolejną aplikację webową. Wskazuje, że infrastruktura może wyglądać podobnie, ale interakcje, interfejsy i wyniki są znacznie bardziej dynamiczne i nieprzewidywalne. Agenty wymagają innych prymitywów: zarządzania kontekstem, narzędzi, wznawiania działania i obsługi długich zadań. To nie jest opakowanie wokół API, to inny model myślenia o oprogramowaniu.

Wewnątrz Vercel agenty obsługują między innymi pierwsze przejrzenie umów prawnych, retrospektywy marketingowe i zapytania do baz danych. Qu zaznacza, że dobry kandydat do agentyzacji to zadanie powtarzalne, ale wymagające rozumowania kontekstu. Nie chodzi o stałą automatyzację, chodzi o sytuacje, gdzie system musi zinterpretować sytuację i podjąć decyzję.

Ważnym tematem rozmowy są skills. Qu tłumaczy ich wartość przez konkretny przykład: modele wciąż polecają Vercel Postgres, choć ta usługa została wycofana i zastąpiona przez marketplace. Skill może poinformować agenta o tym wycofaniu i nakierować go na obecne rozwiązanie. To forma korekty wiedzy modelu, zanim firmy zdążą zaktualizować całą swoją dokumentację i stare treści.

Równie interesujący jest wątek ruchu botów na stronach internetowych. Vercel opublikował dane pokazujące, że ruch od botów i agentów rośnie, podczas gdy ruch ludzki stoi w miejscu lub spada, nawet przy rosnącej liczbie wyświetleń. Odpowiedzią Vercel jest automatyczne wykrywanie requestów od agentów i serwowanie im Markdown zamiast HTML przeznaczonego dla przeglądarki. Dwa różne widoki tej samej treści, dla dwóch różnych rodzajów odbiorców.

Na końcu pojawia się wizja "multiplayer agent development". Qu zwraca uwagę, że w zespołach wiedza o tym, jak pracować z agentami, jest nierówno rozłożona. Jeden developer wie, jak za pierwszym razem uzyskać dobry interfejs, inny nie. Qu chce znaleźć sposób na dzielenie się tym kontekstem między członkami zespołu.

**Key takeaways:**
- eve to wewnętrzny framework Vercel dla agentów, zbudowany na bazie doświadczeń z v0
- Agenty to według Qu fundamentalnie inny rodzaj oprogramowania, nie tylko kolejna aplikacja webowa
- Skills są sposobem na korektę przestarzałej wiedzy modelu bez aktualizowania całej dokumentacji
- Vercel serwuje Markdown agentom zamiast HTML, bo strony muszą być dostępne nie tylko dla ludzi
- Ruch od botów i agentów rośnie, ruch ludzki stoi w miejscu
- Sam Vercel staje się agentem, zintegrowanym ze stroną, Slackiem i dashboardem
- "Multiplayer agent development" to następny problem do rozwiązania, czyli dzielenie kontekstu między developerami

**Why do I care:**

Z perspektywy frontend developera ta rozmowa jest ważna z kilku powodów. Po pierwsze, jeżeli Vercel wykrywa requesty od agentów i serwuje Markdown zamiast HTML, to znaczy, że za chwilę będziemy musieli projektować nie jeden widok strony, ale dwa. To poszerza zakres "frontend" o coś, czego jeszcze kilka lat temu nikt nie brał pod uwagę. Po drugie, sam pomysł skills jako mechanizmu korygowania modeli jest praktycznym narzędziem, który można wdrożyć już dziś, bez czekania na aktualizacje modeli. A kwestia "multiplayer agent development" to problem, który dobrze znam z codziennej pracy, gdzie wiedza o promptowaniu i sterowaniu agentami jest nierówno rozłożona w zespole. Brakuje tu konkretów, ale sam Qu przyznaje, że to dopiero kierunek. Warto obserwować, bo to będzie realne wyzwanie organizacyjne.

**Link:** [Vercel's Andrew Qu on why agents are a new kind of software](https://www.latent.space/p/vercel-agents-new-software?publication_id=1084089&post_id=204762364&isFreemail=true&triedRedirect=true)
