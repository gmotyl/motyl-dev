---
title: "Kilo: kolumbijscy plantatorzy kawy i uzależnienie od jednego modelu"
excerpt: "Historia odmiany Castillo i rdzy kawowej jako analogia do zespołów, które pracują na jednym modelu od jednego dostawcy."
publishedAt: "2026-11-07"
slug: "kilo-kolumbijska-kawa-uzaleznienie-od-modelu"
hashtags: "#kilo #ai #llm #agents #devtools #productivity #generated #pl"
source_pattern: "Kilo"
---

## Co plantatorzy kawy z Kolumbii mówią o uzależnieniu od jednego modelu

**TLDR:** Autor porównuje zespół pracujący na jednym modelu od jednego dostawcy do monokultury kawy. Działa dobrze do momentu, gdy przyjdzie zagrożenie, na przykład zmiana ceny albo limit zapytań. Wniosek prowadzi do produktu Kilo, który pozwala mieszać modele.

**Summary:** Punkt wyjścia to historia rdzy kawowej, grzyba, który w latach 2008 do 2011 obniżył produkcję w Kolumbii o około 31 procent. Około 60 procent upraw to były odmiany podatne, na przykład Caturra. Kraj odbił się dzięki temu, że instytut Cenicafé wypuścił w 2005 roku odporną odmianę Castillo, stworzoną z kilku linii genetycznych. Różnorodność była częścią projektu. Po kryzysie ponad 90 procent odnowionych upraw to było Castillo.

Autor przenosi to na zespoły deweloperskie. Sam wyczerpał kredyty na cały tydzień, próbując najnowszego Claude Fable 5.1, i jego praca stanęła do następnego cyklu tokenów. Dla poparcia podaje dane z OpenRouter. Mniej niż 4 procent użytkowników dowolnego dużego laboratorium używa tylko jego modeli, a klienci wydający co najmniej sto dolarów miesięcznie korzystają ze średnio sześciu rodzin modeli. Następnie następuje wprost reklama. Kilo ma ponad 500 modeli, własne klucze API, uruchamianie modeli otwartych lokalnie, wersję dla zespołów ze wspólnymi agentami i jednym rachunkiem oraz wersję enterprise z kontrolą dostępu, budżetami i SSO.

Praktyczna rada jest prosta. W tym tygodniu uruchom to samo prawdziwe zadanie kodowe na dwóch modelach i porównaj wynik, koszt i wysiłek przełączenia. Tu autor ma rację, bo takiego testu nikt zwykle nie robi, dopóki dostawca nie podniesie ceny.

**Key takeaways:**
- Różnorodność modeli działa jak odporność, a pojedynczy dostawca to pojedynczy punkt awarii.
- Lekkie albo darmowe modele nadają się do rutynowej pracy, a drogie zostawia się na trudne zadania.
- Prosty eksperyment z dwoma modelami na jednym zadaniu pokazuje koszt przełączenia.

**Why do I care:** To jest tekst sprzedażowy, więc analogię z kawą traktuję jako opakowanie. Sam wniosek jest jednak słuszny z architektonicznego punktu widzenia. Warstwa abstrakcji nad modelem powinna być u ciebie, a nie u dostawcy. Autor pomija koszt takiej elastyczności. Prompty i narzędzia często są dopasowane do jednego modelu, więc przełączenie bywa droższe, niż sugeruje tekst.

**Link:** [What Colombian Coffee Growers Can Teach Dev Teams About Model Lock-In](https://blog.kilo.ai/p/what-colombian-coffee-growers-can)
