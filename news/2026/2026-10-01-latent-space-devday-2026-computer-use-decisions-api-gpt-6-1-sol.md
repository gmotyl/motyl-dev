---
title: "OpenAI DevDay 2026: dlaczego Computer Use jest 180 stopni inne niż rok temu, i jak powstał konkurent Jev w tydzień"
excerpt: "Ari Weinstein z zespołu Computer Use i Nikunj Handa z zespołu API opowiadają, co zmieniło agentów operujących komputerem z scrolluj-i-zgadnij na coś bliskiego nadludzkiej szybkości, oraz jak Decisions API powstało jako szybki odpowiednik TypeSafe's Jev."
publishedAt: "2026-09-30"
slug: "latent-space-devday-2026-computer-use-decisions-api-gpt-6-1-sol"
hashtags: "#latent #ai #agents #openai #api #generated #pl"
source_pattern: "Latent.Space"
---

## OpenAI DevDay 2026: Computer Use, Dots, i dlaczego agenci przestali tylko scrollować i zgadywać

**TLDR:** Trzy miesiące po tym, jak Dwarkesh Patel publicznie pytał, czemu postęp w Computer Use jest tak wolny mimo łatwej weryfikowalności tego zadania, Ari Weinstein (współzałożyciel Sky, dziś lider Computer Use w OpenAI) twierdzi, że dziedzina zmieniła się o 180 stopni, głównie dzięki łączeniu zrzutów ekranu z drzewem dostępności, DOM-em, Playwrightem i generowanym kodem.

**Streszczenie:** Największa zmiana według Weinsteina nie leży w samym modelu, tylko w tym, że agent przestał działać w pętli zrzut ekranu, próba, kolejny zrzut ekranu. Zamiast tego model może zobaczyć całą stronę czy aplikację naraz przez reprezentację dostępnościową i DOM, a potem napisać kod wykonujący wiele kroków jednocześnie, zamiast klikać pojedynczo. To ta sama technologia zbudowana pierwotnie dla czytników ekranu dla osób z niepełnosprawnościami wzroku, teraz działająca równie dobrze dla LLM-ów. Konkretny przykład: zamawianie posiłku w serwisie z bardzo drobiazgową personalizacją (gramy kurczaka, gramy ryżu) zwykle zajmowało Weinsteinowi dwie godziny, a Computer Use zrobiło to w piętnaście minut, ośmiokrotnie szybciej niż człowiek. Najbardziej czasochłonnym elementem w benchmarkach bywa dziś nie myślenie modelu, tylko fizyczne oczekiwanie, aż załaduje się strona, co otwiera osobny problem: jak maksymalnie skrócić opóźnienie między końcem ładowania a wyzwoleniem kolejnej akcji modelu, w praktyce samo w sobie stając się problemem statystycznym.

Zespół mierzy postęp na wielu wariantach harnessu naraz, ale niezależnie od metody widzi konsekwentne zyski, częściowo z harnessu, częściowo z modelu. GPT-6.1 Sol jest particularly opłacalny do Computer Use: według prezentacji kosztuje piątą część Astry ogólnie, a siódmą część przy zadaniach Computer Use konkretnie. Na pytanie, dokąd to zmierza w ciągu dwóch lat, Weinstein mówi wprost: dziś Computer Use jest już szybsze niż przeciętny człowiek w większości zadań, a następny krok to dosłownie nadludzka wydajność, szybsza niż ekspercki użytkownik komputera, co obniży próg wejścia na tyle, że zaczniemy domyślnie delegować agentom rzeczy, które dziś robimy ręcznie z przyzwyczajenia.

W drugiej części rozmowy Nikunj Handa z zespołu API OpenAI rozkłada nowy stack deweloperski: asynchroniczne wywołania narzędzi (model nie musi przerywać rozumowania, czekając na narzędzie), sterowanie w trakcie tury (mid-turn steering), WebSockety, UltraFast inference, oraz Decisions API, model decyzyjny zwracający klasyfikację z prawdopodobieństwem zamiast tekstu, do zadań jak routing żądań czy klasyfikacja treści przy niskiej latencji. Handa przyznaje wprost, że na razie to "wrapper na Lunę", ale zespół jest wystarczająco pozbawiony ego, żeby otwarcie klonować wzorce, które uznaje za dobre, w tym przypadku najwyraźniej inspirowane TypeSafe's Jev, które wylądowało na rynku dwa tygodnie wcześniej. Rozmowa dotyka też dłuższego cache'owania promptów, cache pre-warmingu, kompaktowania kontekstu po stronie serwera zamiast ręcznego, i pytania, co w ogóle powinno żyć wewnątrz Agents API, a co powinno zostać własnym harnessem dewelopera.

**Kluczowe wnioski:**
- Łączenie zrzutów ekranu z drzewem dostępności, DOM-em i Playwrightem pozwala agentowi zobaczyć całą stronę naraz i wykonać wiele kroków jednym fragmentem wygenerowanego kodu, zamiast scrollować krok po kroku.
- GPT-6.1 Sol kosztuje podobno piątą część ceny Astry ogólnie, a siódmą część przy zadaniach Computer Use konkretnie.
- Fizyczne oczekiwanie na załadowanie strony jest dziś większym wąskim gardłem w Computer Use niż myślenie modelu.
- Decisions API to tani, szybki model zwracający decyzję z prawdopodobieństwem, zbudowany w krótkim sprincie jako odpowiednik TypeSafe's Jev.

**Dlaczego mi na tym zależy:** Jeśli budujesz cokolwiek opartego o automatyzację przeglądarki czy RPA, warto zwrócić uwagę na przesunięcie z "zrzut ekranu plus klik" na "reprezentacja dostępnościowa plus wygenerowany kod wykonujący wiele kroków", bo to zmienia, jakie zadania w ogóle opłaca się dziś delegować agentowi zamiast pisać dedykowaną integrację API. Decisions API jako tania alternatywa dla pełnego wywołania LLM przy prostych klasyfikacjach to też wzorzec architektoniczny wart rozważenia niezależnie od dostawcy, zwłaszcza przy rzeczach w rodzaju lintowania treści czy routingu żądań, gdzie nie potrzeba pełnego rozumowania modelu.

**Link:** [Devday 2026](https://www.latent.space/p/devday-2026)
