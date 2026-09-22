---
title: "The AI Break: Gemini samodzielnie włamał się do trzech firm i zatrzymał się, zanim zaszedł za daleko"
excerpt: "Test bezpieczeństwa pokazał, że model Gemini potrafi odgadywać hasła i wykorzystywać wyciekłe dane uwierzytelniające, a do tego krótki przegląd tygodnia: AI Force Trumpa, wycena Anthropic przed IPO i nowy model Qwen3.8-Omni-Flash."
publishedAt: "2026-09-21"
slug: "theaibreak-gemini-wlamanie-testy-penetracyjne"
hashtags: "#theaibreak #ai #security #agents #generated #pl"
source_pattern: "The AI Break"
---

## Gemini złamał zabezpieczenia trzech firm i sam się zatrzymał

**TLDR:** Podczas majowego testu bezpieczeństwa model Gemini od Google włamał się do trzech realnych firm, odgadując hasła i wykorzystując wyciekłe dane uwierzytelniające, po czym zatrzymał się o własnych siłach, zanim posunął się dalej.

**Summary:** Newsletter podaje tę informację w skróconej formie, bez pełnego opisu metodologii testu czy tożsamości zaatakowanych firm, ale sam fakt jest wymowny: model przeprowadził realny atak na infrastrukturę trzech firm, korzystając z dwóch dość podstawowych technik, odgadywania haseł oraz wykorzystania danych uwierzytelniających, które już wcześniej wyciekły i krążą w publicznie dostępnych zbiorach. To, że model zatrzymał się sam, zanim eskalował dalej, sugeruje działanie jakiejś formy wbudowanych ograniczeń czy warunków stopu w scenariuszu testowym, ale bez szczegółów trudno ocenić, na ile to zasługa świadomego zaprojektowania granic, a na ile ograniczeń samego zadania testowego.

Obok głównej historii newsletter zebrał kilka innych wątków z ostatnich dni. Donald Trump zapowiedział powołanie „AI Force" wzorowanego na Space Force oraz mianowanie „cara AI", deklarując przy tym, że nie zamierza hamować rozwoju branży. Anthropic ma być podobno na dobrej drodze do przekroczenia 100 miliardów dolarów rocznego przychodu, a swoje IPO przesunęło na listopad, celując w wycenę rzędu 2 bilionów dolarów. USA i Chiny uzgodniły uruchomienie formalnego dialogu w sprawie AI, z amerykańską propozycją systemu alertowania o incydentach, na kilka dni przed planowanym spotkaniem Trumpa z Xi. Alibaba pokazała też Qwen3.8-Omni-Flash, model obsługujący tekst, obraz, dźwięk i wideo w jednym, z kontekstem sięgającym miliona tokenów i wynikami lepszymi o 26% od poprzednika.

Warto zaznaczyć, że sam newsletter ma formę krótkiego, płatnego digestu z linkami „continue reading" do pełnych materiałów, więc powyższe punkty to zapowiedzi tematów, a nie ich pełne rozwinięcia.

**Key takeaways:**
- Gemini w majowym teście bezpieczeństwa włamał się do trzech firm przez odgadywanie haseł i wyciekłe dane uwierzytelniające, po czym zatrzymał się samodzielnie
- Trump zapowiada powołanie „AI Force" i „cara AI"; Anthropic celuje w ponad 100 mld dolarów rocznego przychodu i IPO w listopadzie przy wycenie 2 bln dolarów
- USA i Chiny uzgodniły formalny dialog o AI z propozycją systemu alertowania o incydentach, a Alibaba pokazała multimodalny Qwen3.8-Omni-Flash z milionowym kontekstem

**Why do I care:** Historia z Gemini to dobry punkt zaczepienia w rozmowie z zespołem bezpieczeństwa o tym, że modele generatywne trzeba dziś traktować jako potencjalne narzędzie ofensywne, nie tylko defensywne, nawet jeśli akurat ten test zakończył się kontrolowanym zatrzymaniem. Jeśli twoja organizacja jeszcze nie ma polityki dotyczącej testów penetracyjnych z użyciem modeli AI ani zasad reagowania na odgadywanie haseł na dużą skalę, to sygnał, że warto to nadrobić, zanim zrobi to za was ktoś mniej przyjaźnie nastawiony.

**Link:** [Google's Gemini Hacked 3 Real Companies (Then Stopped Itself)](https://theaibreak.substack.com/p/googles-gemini-hacked-3-real-companies)
