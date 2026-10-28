---
title: "Kilo: Speaker Arena zbudowana z Kilo, Jev i Enkrypt"
excerpt: "Jak powstała trójwymiarowa arena prelegentów konferencji All Day AI z modelem decyzyjnym Jev i guardrailami Enkrypt."
publishedAt: "2026-10-28"
slug: "kilo-speaker-arena-jev-enkrypt"
hashtags: "#kilo #ai #agents #security #llm #generated #pl"
source_pattern: "Kilo"
---

## Budowa Speaker Arena z Kilo, Jev i Enkrypt

**TLDR:** Autor zbudował w przeglądarce trójwymiarowy park z prelegentami konferencji All Day AI i asystentem sesji. Kilo pomogło napisać aplikację, Kilo Gateway obsługiwało modele w działaniu, a Enkrypt pilnował polityki i guardrailów.

**Summary:** All Day AI miało 12 313 rejestracji, 140 prelegentów i średni czas oglądania 500 minut na osobę. Zamiast przewijania kart prelegentów powstała Speaker Arena, czyli Three.js park z chodzącymi postaciami opartymi na portretach i czterema pawilonami. Pierwsza wersja była dwuwymiarowa, a po prośbie o pełnoekranowy świat 3D Kilo zastąpiło warstwę wizualną, zachowując backend czatu.

Zapytania przechodzą przez potok. Najpierw guardrail wejściowy Enkrypt, potem Jev, mały model decyzyjny, który zwraca strukturalny wybór: pytanie o rozmowę albo poza tematem. Pytania poza tematem dostają gotową odpowiedź przekierowującą i generowanie jest pomijane. Pozostałe trafiają do Gemini 2.5 Flash, a odpowiedź przechodzi jeszcze guardrail wyjściowy. Wszystko wymuszane jest po stronie serwera, więc oflagowane pytanie nigdy nie dociera do Jev ani Gemini.

Autor pisał politykę "All Day AI - Code of Conduct" i zamieniał ją w reguły, na przykład brak podszywania się pod prelegentów i brak zmyślania faktów o nich. Test live pokazał, że zbyt szeroki detektor danych osobowych flagował zwykłe nazwiska prelegentów, więc na czas prototypu go wyłączył i przetestował ponownie. Asystent odpowiada o prelegentach, a nie jako oni.

**Key takeaways:**
- Modele pomagające pisać aplikację to nie te same, które odpowiadają użytkownikom.
- Mały model decyzyjny odrzuca pytania poza tematem bez wywołania modelu generującego.
- Egzekwowanie guardrailów jest po stronie serwera i zatrzymuje potok przy błędzie.
- Zbyt szeroki detektor PII flagował publiczne nazwiska.

**Why do I care:** To wpis firmowy Kilo i Enkrypt, które mają wspólnego właściciela, więc czyta się go jak demonstrację produktu. Architektonicznie wzorzec jest jednak użyteczny: tani klasyfikator przed drogim modelem generującym i twarda kontrola na serwerze. Szkoda, że autor nie podaje kosztów ani opóźnień, a przyznaje, że narzut routingu istnieje.

**Link:** [Building a Speaker Arena With Kilo, Jev, and Enkrypt](https://blog.kilo.ai/p/building-a-speaker-arena-with-kilo?publication_id=4363009&post_id=222211820&isFreemail=true&triedRedirect=true)
