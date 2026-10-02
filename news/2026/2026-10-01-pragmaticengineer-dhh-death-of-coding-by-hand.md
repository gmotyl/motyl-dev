---
title: "DHH ogłasza koniec pisania kodu ręcznie, a branża mierzy się z cenami tego przejścia"
excerpt: "Twórca Ruby on Rails mówi, że przestał być programistą, Uber Eats wysyła na produkcję trzy oczywiste błędy naraz, a Gergely Orosz zestawia to z rosnącą liczbą PR-ów mergowanych bez żadnego review."
publishedAt: "2026-10-01"
slug: "pragmaticengineer-dhh-death-of-coding-by-hand"
hashtags: "#pragmaticengineer #ai #architecture #engineering #ruby #rails #generated #pl"
source_pattern: "Pragmatic engineer"
---

## DHH: przeszedłem na emeryturę jako programista

**TLDR:** David Heinemeier Hansson, twórca Ruby on Rails, ogłosił na keynote Rails World, że w 37signals pisanie kodu ręcznie stało się stanem wyjątkowym, nie normą, a on sam od kilku miesięcy nie myśli o sobie jako o zawodowym programiście. Gergely Orosz zestawia tę deklarację z danymi pokazującymi, że liczba PR-ów mergowanych bez jakiegokolwiek review wzrosła o 31,3 procent rok do roku.

**Streszczenie:** DHH porównał moment premiery Opusa 4.5, 24 listopada 2025 roku, do wynalezienia aparatu Kodak Brownie, czyli chwili, w której nowa technologia stała się dostępna wystarczająco szerokiej grupie ludzi, by zmienić całą dziedzinę. W 37signals to przełożyło się na konkretne decyzje architektoniczne: firma, od lat znana z niechęci do natywnych aplikacji mobilnych na rzecz wersji webowych, zaczyna budować natywne aplikacje, bo agenty potrafią je teraz tworzyć małym zespołem. Część usług backendowych przenosi się z Ruby do Rusta, nie z powodów sentymentalnych, tylko dlatego, że agenty piszą wystarczająco dobry kod w Ruście, a wydajność na tym zyskuje. Rails zostaje dla aplikacji webowych, ale głównie dlatego, że jego podejście konwencja-zamiast-konfiguracji ułatwia agentom pracę z tym kodem.

Najbardziej uderzające jest zdanie o abstrakcjach: skoro cena powtórzenia kodu spadła niemal do zera, bo agent i tak napisze go za chwilę od nowa, to klasyczne argumenty za DRY i abstrakcją tracą część sensu. Orosz zestawia ten entuzjazm z realiami z innych firm. Anonimowy inżynier z dużej firmy technologicznej opisał atmosferę, w której nikt nie czyta kodu, specyfikacji ani PR-ów, bo wszystko generuje Claude Code, a presja na samo wysyłanie kodu rośnie szybciej niż zdolność kogokolwiek, by go zweryfikować. Uber Eats wysłało w tym tygodniu funkcję wyboru dodatków do zamówienia z trzema oczywistymi błędami naraz, licznikiem pozwalającym wybrać maksymalnie sześć z deklarowanych 999 sztuków, przełamaniem tekstu w tłumaczeniu na holenderski i brakiem możliwości zamówienia miski bez żadnej bazy. Orosz łączy to wszystko w jeden wniosek: zmiana nie zmniejsza pracy inżynierów, tylko ją przesuwa, z pisania kodu na budowanie systemów, które sprawdzają, czy wygenerowany kod rzeczywiście działa.

**Kluczowe wnioski:**
- 37signals przestawia część nowych projektów na natywne aplikacje mobilne i backend w Ruście, bo agenty to teraz potrafią zrobić małym zespołem.
- DHH deklaruje, że przestał być zawodowym programistą, bo pisanie kodu ręcznie stało się u niego wyjątkiem, nie regułą.
- Liczba PR-ów mergowanych bez żadnego review wzrosła o 31,3 procent rok do roku, a mediana czasu review wzrosła o 441,5 procent.
- Uber Eats wysłało funkcję z trzema widocznymi błędami naraz, co Orosz czyta jako dowód na zanikającą kulturę QA przy kodzie generowanym przez agenty.
- Orosz przewiduje, że rosnąć będą nowe kategorie narzędzi: deterministyczny kod generowany przez LLM-y zamiast kosztownego review przez LLM-y przy każdym PR-ze.

**Dlaczego mi na tym zależy:** Deklaracja DHH brzmi efektownie, ale ciekawszy jest drugi wątek: dane o rosnącym czasie review przy jednoczesnym spadku liczby PR-ów faktycznie recenzowanych pokazują realny koszt tego przejścia, nie tylko jego obietnicę. Jeśli odpowiadasz za jakość kodu w zespole korzystającym z agentów, warto już teraz budować deterministyczne bramki, linterów i testy zamiast liczyć na to, że ktoś przeczyta diff, zanim trafi on na produkcję.

**Link:** [The Pulse: RoR creator sparks new "death of coding by hand" debate](https://newsletter.pragmaticengineer.com/p/the-pulse-ror-creator-sparks-new)
