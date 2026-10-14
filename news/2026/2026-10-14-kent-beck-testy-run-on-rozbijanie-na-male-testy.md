---
title: "Kent Beck: testy run-on i jak rozbić je na małe, dobrze nazwane testy"
excerpt: "Długie testy z wieloma asercjami utrudniają diagnozę; Beck pokazuje prosty sposób ich dekompozycji bez utraty pokrycia."
publishedAt: "2026-10-14"
slug: "kent-beck-testy-run-on-rozbijanie-na-male-testy"
hashtags: "#kentbeck #testing #refactoring #architecture #generated #pl"
source_pattern: "Kent Beck"
---

## Testy run-on: jeden test, wiele operacji, żadnej diagnozy

**TLDR:** Test run-on to taki, który po przygotowaniu środowiska na przemian wykonuje operacje i asercje. Gdy pada późna asercja, nie wiadomo, czy winna jest ostatnia operacja, czy wcześniejsza, która zostawiła świat w złym stanie.

**Summary:** Beck wraca do tekstu z 2013 roku, w którym nazywa tak testy przynoszone przez studenta. Problem dotyczy właściwości "konkretności" z Test Desiderata: nieudany test powinien wskazywać, co jest nie tak. Autor przyznaje, że sam pisze takie testy w trybie odkrywania, gdy dodaje kolejną operację do obiektu i dopisuje następną asercję na końcu największego istniejącego testu.

Kuracja jest prosta. Najpierw kopiujesz test i zostawiasz tylko pierwszą asercję, nadając mu nazwę, którą chciałbyś zobaczyć po awarii, czyli dłuższą i opisującą, co mogło pójść źle. Potem kopiujesz ponownie i zostawiasz dwie asercje, usuwając zbędne przygotowanie. Powtarzasz to do ostatniej asercji, notujesz nowe ścieżki, które trzeba pokryć, i usuwasz oryginał. Pokrycie jest identyczne, o ile uruchamiasz razem wszystkie testy.

**Key takeaways:**
- Nazwa testu to jedyny kontekst, jaki zobaczysz w raporcie awarii.
- Kod z odkrywania nie powinien zostawać jako relikt niewiedzy.
- Po rozbiciu można wynieść wspólne przygotowanie do metody setUp.

**Why do I care:** Dla frontendowca z długimi testami komponentów, w których klikasz pięć razy i asertujesz po drodze, to gotowy przepis na szybsze debugowanie. Beck milczy o testach end-to-end, gdzie rozbicie kosztuje czas uruchomienia, więc tam kompromis wygląda inaczej.

**Link:** [Run-On Tests (Kent Beck)](https://newsletter.kentbeck.com/p/decompose-run-on-tests)
