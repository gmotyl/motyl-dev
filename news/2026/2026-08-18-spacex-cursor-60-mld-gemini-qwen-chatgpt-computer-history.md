---
title: "SpaceX kupuje Cursor za 60 miliardów dolarów, a Google i Alibaba przycinają ceny modeli"
excerpt: "SpaceX zamyka gigantyczny wykup Anysphere, OpenAI chwali się szybkością GPT-5.6 Sol, Google i Alibaba obniżają ceny swoich modeli, a ChatGPT chce śledzić, co robisz na Macu."
publishedAt: "2026-08-18"
slug: "spacex-cursor-60-mld-gemini-qwen-chatgpt-computer-history"
hashtags: "#theaibreak #ai #llm #agents #performance #generated #pl"
source_pattern: "The AI Break"
---

## SpaceX zamyka wykup Cursora za 60 miliardów dolarów

**TLDR:** SpaceX sfinalizowało zakup Anysphere, firmy stojącej za Cursorem, za 60 miliardów dolarów i wciela narzędzie do nowej jednostki SpaceXAI. To jeden z największych transakcji w historii narzędzi programistycznych.

**Summary:** Sześćdziesiąt miliardów dolarów za edytor kodu z wtyczką AI to liczba, która jeszcze dwa lata temu brzmiałaby jak żart, a teraz jest realnym nagłówkiem. SpaceX nie kupuje Cursora, żeby mieć ładniejszy IDE dla swoich inżynierów, tylko żeby mieć własną, kontrolowaną warstwę narzędzi programistycznych wewnątrz firmy, która i tak pisze ogromne ilości kodu do systemów krytycznych. Powstanie SpaceXAI jako osobnej jednostki sugeruje, że Musk traktuje to jako coś więcej niż akwizycję defensywną, raczej jako fundament pod własny stos narzędzi AI, niezależny od Microsoftu, Google czy Anthropic.

Z perspektywy rynku narzędzi deweloperskich to sygnał, że kapitał, który do niedawna płynął głównie do laboratoriów budujących modele, teraz płynie też do warstwy produktowej, która te modele opakowuje w coś, z czym programista faktycznie pracuje codziennie. Cursor był już wcześniej wyceniany wysoko, ale skok do 60 miliardów w rękach firmy, która nie jest typowym inwestorem VC, zmienia dynamikę całej kategorii.

**Key takeaways:**
- SpaceX kupiło Anysphere (Cursor) za 60 miliardów dolarów
- Cursor trafia do nowej jednostki SpaceXAI, nie zostaje samodzielnym produktem
- To sygnał, że kapitał zaczyna płynąć też do warstwy produktowej narzędzi AI, nie tylko do laboratoriów modeli

**Why do I care:** Jako ktoś, kto codziennie pracuje w edytorze z wtyczką AI, zastanawiam się, co ta transakcja znaczy dla reszty rynku edytorów kodu, które nie mają za sobą firmy z budżetem SpaceX. Jeśli największe narzędzia deweloperskie zaczną być wykupywane przez firmy spoza tradycyjnego ekosystemu software'owego, to pytanie o neutralność i przenośność danych między edytorami staje się praktyczne, a nie teoretyczne. Warto już teraz sprawdzić, jak łatwo wyeksportować swoje ustawienia i historię pracy z Cursora, zanim integracja z SpaceXAI zacznie zamykać ten ekosystem.

**Link:** [SpaceX Just Bought Cursor for $60 Billion](https://theaibreak.substack.com/p/spacex-just-bought-cursor-for-60-541?publication_id=1842292&post_id=211417852&isFreemail=true&triedRedirect=true)

## OpenAI chwali się Ultrafast mode dla GPT-5.6 Sol

**TLDR:** OpenAI zaprezentowało tryb Ultrafast dla GPT-5.6 Sol, osiągający 750 tokenów na sekundę i działający do czternastu razy szybciej na chipach Cerebras. To kolejny krok w wyścigu o czas odpowiedzi modeli, nie o ich jakość.

**Summary:** Siedemset pięćdziesiąt tokenów na sekundę to poziom, przy którym model generuje tekst szybciej, niż większość ludzi go czyta, co zmienia charakter interakcji z asystentem z "poczekaj na odpowiedź" na "odpowiedź już jest, zanim zdążysz przeczytać pytanie". Wykorzystanie chipów Cerebras, a nie tylko standardowych GPU, pokazuje, że OpenAI szuka przewagi prędkości na poziomie sprzętu, nie tylko optymalizacji samego modelu czy inferencji.

Ten rodzaj wyścigu ma sens biznesowy przede wszystkim tam, gdzie opóźnienie odpowiedzi jest realnym kosztem, w agentach działających w pętli, w narzędziach głosowych czy w systemach, gdzie model musi zdążyć z decyzją, zanim kontekst się zmieni. Dla zwykłego czatu różnica między sekundą i trzema sekundami rzadko decyduje o czymkolwiek, ale dla agenta wykonującego setki wywołań w ciągu minuty, prędkość zaczyna się liczyć jak przepustowość w architekturze rozproszonej.

**Key takeaways:**
- GPT-5.6 Sol w trybie Ultrafast generuje 750 tokenów na sekundę
- Tryb działa do czternastu razy szybciej na chipach Cerebras niż standardowa konfiguracja
- Zysk z prędkości ma największe znaczenie dla agentów działających w pętli, nie dla pojedynczego czatu

**Why do I care:** Prędkość generowania rzadko trafia na pierwsze strony, ale w praktyce architektonicznej to ona decyduje, czy dany model da się użyć w pętli agentowej z rozsądnym budżetem czasowym, czy trzeba projektować cały system wokół opóźnień. Jeśli 750 tokenów na sekundę stanie się standardem, a nie ekskluzywną opcją, to zmieni się kalkulacja kosztu i sensowności budowania wielu małych wywołań modelu zamiast jednego dużego, co jest dokładnie tym typem decyzji architektonicznej, którą podejmuję przy projektowaniu agentów dla klientów.

**Link:** [SpaceX Just Bought Cursor for $60 Billion](https://theaibreak.substack.com/p/spacex-just-bought-cursor-for-60-541?publication_id=1842292&post_id=211417852&isFreemail=true&triedRedirect=true)

## Google obniża cenę Gemini 3.7 Flash o połowę

**TLDR:** Google wypuściło Gemini 3.7 Flash z zauważalnym skokiem w zadaniach programistycznych i ceną o połowę niższą niż Gemini 3.6 Flash, obowiązującą do końca roku. To kolejny ruch w wojnie cenowej modeli klasy Flash.

**Summary:** Model klasy Flash od zawsze był odpowiedzią Google na potrzebę szybkich, tanich wywołań na dużą skalę, a nie na benchmarki wymagające najwyższej jakości rozumowania. Wersja 3.7 dodaje realny skok w zadaniach kodowych, co jest ciekawe, bo zwykle to właśnie kodowanie wymaga większych, droższych modeli. Połączenie lepszej jakości i ceny w połowie poprzedniej stawki, przynajmniej do końca roku, sugeruje, że Google traktuje segment Flash jako pole bitwy o wolumen, nie o marżę.

Dla zespołów budujących produkty na wywołaniach modelowych ta decyzja ma bardzo konkretne konsekwencje kosztowe, bo Flash często obsługuje najbardziej wolumenowe części systemu, jak klasyfikacja, ekstrakcja czy proste transformacje tekstu. Obniżka o połowę w takim miejscu potrafi zmienić rachunek ekonomiczny całego produktu bardziej niż premierowy model klasy flagowej, którego mało kto woła milion razy dziennie.

**Key takeaways:**
- Gemini 3.7 Flash oferuje zauważalny skok jakości w zadaniach kodowych
- Cena spada o połowę względem Gemini 3.6 Flash, przynajmniej do końca roku
- Segment modeli Flash staje się głównym polem konkurencji cenowej, nie flagowe modele

**Why do I care:** Modele klasy Flash rzadko trafiają na czołówki newsów, ale to one realnie decydują o rachunku ekonomicznym większości produktów AI, bo obsługują wolumen, nie prestiżowe demo. Jeśli cena spada o połowę przy jednoczesnym wzroście jakości w kodowaniu, to warto zrewidować, gdzie w swoim stosie wciąż używa się droższego modelu flagowego z przyzwyczajenia, a nie z realnej potrzeby, bo to jest właśnie ten moment, kiedy taka migracja zaczyna się opłacać.

**Link:** [SpaceX Just Bought Cursor for $60 Billion](https://theaibreak.substack.com/p/spacex-just-bought-cursor-for-60-541?publication_id=1842292&post_id=211417852&isFreemail=true&triedRedirect=true)

## Alibaba wypuszcza Qwen3.8-27B na otwartej licencji

**TLDR:** Alibaba udostępniło Qwen3.8-27B, multimodalny model na licencji Apache 2.0 z kontekstem 262K tokenów, działający na lokalnym sprzęcie. To kolejny krok w domykaniu dystansu między modelami frontierowymi i lokalnymi.

**Summary:** Model 27B, który działa lokalnie i ma otwartą licencję Apache 2.0, to zupełnie inna kategoria niż modele frontierowe dostępne wyłącznie przez API dużych laboratoriów. Kontekst 262K tokenów jest na tyle duży, że pozwala wgrać całe repozytorium średniej wielkości albo długi dokument bez agresywnego dzielenia na fragmenty, co wcześniej było domeną wyłącznie modeli hostowanych w chmurze. Multimodalność dodaje kolejny wymiar, bo model nie ogranicza się do samego tekstu.

Otwarta licencja i możliwość odpalenia lokalnie mają realne znaczenie dla firm, które z powodów regulacyjnych albo kosztowych nie chcą wysyłać danych do zewnętrznego API. To nie jest jeszcze model, który pobije najlepsze modele frontierowe we wszystkich zadaniach, ale dystans między tym, co można uruchomić na własnym sprzęcie, a tym, co trzeba wywoływać przez API, systematycznie się skraca z każdą kolejną generacją.

**Key takeaways:**
- Qwen3.8-27B jest dostępny na licencji Apache 2.0 i działa na lokalnym sprzęcie
- Kontekst 262K tokenów pozwala pracować z dużymi repozytoriami i dokumentami bez agresywnego dzielenia
- Model jest multimodalny, nie ogranicza się do samego tekstu
- Dystans między lokalnymi i frontierowymi modelami skraca się z każdą kolejną generacją Qwen

**Why do I care:** Dla projektów, gdzie dane nie mogą wyjść poza infrastrukturę klienta, otwarty model z dużym kontekstem i licencją Apache 2.0 jest realną alternatywą, nie tylko ciekawostką z Reddita. Jeśli jakość Qwen3.8-27B faktycznie zbliża się do modeli, za które trzeba płacić per token przez API, to dla części klientów lokalny model przestaje być kompromisem, a staje się rozsądną domyślną opcją, zwłaszcza tam, gdzie zgodność z RODO albo kontrakty z sektorem publicznym i tak wymuszają trzymanie danych na miejscu.

**Link:** [SpaceX Just Bought Cursor for $60 Billion](https://theaibreak.substack.com/p/spacex-just-bought-cursor-for-60-541?publication_id=1842292&post_id=211417852&isFreemail=true&triedRedirect=true)

## ChatGPT chce zapamiętywać, co robisz na Macu

**TLDR:** ChatGPT wprowadza opcjonalną funkcję Computer History, która loguje kliknięcia i przełączanie aplikacji na Macu, żeby asystent mógł kontynuować pracę od miejsca, w którym użytkownik ją przerwał. Funkcja jest opt-in.

**Summary:** Idea kontynuowania pracy od tego samego miejsca jest atrakcyjna, bo każdy, kto wraca do laptopa po przerwie, zna ten moment odtwarzania kontekstu w głowie, co właściwie robiłem i gdzie skończyłem. Computer History próbuje zdjąć ten ciężar z użytkownika, zapisując ślad aktywności na poziomie systemu, nie tylko historii rozmów z modelem. To realny krok w stronę asystenta, który rozumie kontekst pracy szerzej niż tylko to, co napisano w oknie czatu.

Sam fakt, że funkcja jest opt-in, nie zamyka dyskusji o tym, co dokładnie zbiera taki log i jak długo jest przechowywany, zwłaszcza że "kliknięcia i przełączanie aplikacji" to potencjalnie bardzo szczegółowy zapis codziennej pracy, w tym momentów, kiedy ktoś otwiera coś, co niekoniecznie chciałby mieć w logu firmy trzeciej.

**Key takeaways:**
- Computer History loguje kliknięcia i przełączanie aplikacji na Macu, żeby ChatGPT mógł kontynuować pracę
- Funkcja jest opcjonalna (opt-in), nie włączona domyślnie
- Poziom szczegółowości takiego logu rodzi pytania o retencję danych i prywatność, niezależnie od dobrowolności

**Why do I care:** Z perspektywy architekta systemów firmowych, każda funkcja typu "asystent widzi, co robisz na komputerze" wymaga jasnej polityki, zanim ktokolwiek w zespole ją włączy, bo w praktyce oznacza to zgodę na przesyłanie śladu całej aktywności na urządzeniu do zewnętrznego dostawcy. To jest przede wszystkim temat dla działów compliance i bezpieczeństwa, a nie tylko wygody indywidualnego użytkownika, i warto o tym pomyśleć zanim funkcja stanie się domyślna w kolejnej aktualizacji.

**Link:** [SpaceX Just Bought Cursor for $60 Billion](https://theaibreak.substack.com/p/spacex-just-bought-cursor-for-60-541?publication_id=1842292&post_id=211417852&isFreemail=true&triedRedirect=true)
