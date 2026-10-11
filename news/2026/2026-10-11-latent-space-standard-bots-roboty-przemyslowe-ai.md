---
title: "Standard Bots: AI dla robotów przemysłowych i lekcje o niezawodnym wykonaniu"
excerpt: "Rozmowa z CEO i szefem AI Standard Bots o małych modelach, wnioskowaniu na miejscu i uczeniu się z poprawek na produkcji."
publishedAt: "2026-10-10"
slug: "latent-space-standard-bots-roboty-przemyslowe-ai"
hashtags: "#latentspace #ai #ml #robotics #generated #pl"
source_pattern: "Latent.Space"
---

## Roboty przemysłowe i AI, która ma działać bez niespodzianek

**TLDR:** Standard Bots, producent robotów przemysłowych wyceniany na miliard dolarów, trzyma model w roli wąskiej i uczy go na małych, dobrze dobranych danych. Wnioskowanie odbywa się lokalnie w fabryce, a nie w chmurze.

**Summary:** Firma zebrała 200 milionów dolarów w rundzie serii C, a jej klientami są NASA, Amazon i Lockheed Martin. Roboty to ramiona do obsługi maszyn, spawania i montażu, nie humanoidy. Współzałożyciel Evan Beard mówi, że największy model firmy ma niskie miliardy parametrów, czyli niewiele jak na standardy laboratoriów frontier.

Szef AI Leif Jentoft opisuje podział pracy. Model odpowiada za percepcję, czyli znalezienie i rozpoznanie części, a klasyczne programowanie za ruch i logikę stanowiska. Sieć bazową wytrenowano na ponad miliardzie obrazów, ale przy brzegowych przypadkach wystarcza kilkadziesiąt przykładów z interwencji na miejscu. Jego zdaniem jakość danych liczy się znacznie bardziej niż ich ilość.

Wnioskowanie działa w fabryce, bo tam często nie ma stabilnego internetu, a ciągłość pracy jest warunkiem akceptacji u klienta. Kamery na nadgarstku wysyłają obraz przez wewnętrzny gigabitowy Ethernet do GPU na brzegu, które generują porcje akcji dla sterowania niskiego poziomu. Część zadań, na przykład z cieczami, ssaniem czy cięciem elastycznych materiałów, trudno odtworzyć w symulatorze, więc firma uczy się też z demonstracji i poprawek człowieka. Klienci z sektora obronnego często pracują w środowiskach odciętych od sieci, więc stamtąd dane nie wracają.

Firma kontroluje cały stos, od ramienia i chwytaka po sterowanie i AI. Jentoft twierdzi, że żaden model nie jest dziś naprawdę niezależny od sprzętu. Platforma StandardOS udostępnia API i SDK, a zewnętrzni programiści mogą przynieść własne modele, na przykład NVIDIA Cosmos, ale integrację muszą napisać sami.

**Key takeaways:**
- Model ma wąską rolę, a ruch i logikę stanowiska zostawia się klasycznemu kodowi.
- Wnioskowanie działa lokalnie, bo fabryki często nie mają stabilnego internetu.
- Kilkadziesiąt przykładów z produkcji potrafi naprawić przypadek brzegowy.

**Why do I care:** Dla mnie to dobra lekcja dla agentów programistycznych. Wąska rola modelu, deterministyczny kod wokół niego i pętla poprawek z realnych wdrożeń to wzorzec, który działa też poza robotyką. Rozmowa pochodzi jednak od firmy, która sprzedaje swoje roboty, więc twierdzenie o braku modeli niezależnych od sprzętu to pozycja handlowa, a nie fakt. Brakuje też liczb o niezawodności, a to przecież temat tytułowy.

**Link:** [Building AI for Reliable Execution: Lessons From Industrial Robotics](https://www.latent.space/p/standard-bots)
