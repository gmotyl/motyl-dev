---
title: "HackerNoon: weryfikacja kodu AI, zależne źródła w RAG, nowy EventBridge, serwowanie modeli na Kubernetes i SameSite Lax"
excerpt: "Sześć tekstów o tym, że weryfikacja stała się wąskim gardłem, że dziesięć źródeł to nie dziesięć dowodów oraz o testach, które podważają wyjaśnienie PortSwigger."
publishedAt: "2026-10-15"
slug: "hackernoon-audytor-nie-moze-byc-tworca-rag-zrodla-eventbridge-csrf-samesite"
hashtags: "#hackernoon #ai #testing #architecture #aws #kubernetes #security #generated #pl"
source_pattern: "HackerNoon"
---

## Jakość produktu w AI SDLC: audytor nie może być twórcą

**TLDR:** Gdy agenci piszą kod szybciej, niż da się go zweryfikować, wąskim gardłem jest weryfikacja. Autor z QA.tech twierdzi, że ten sam agent nie może testować własnego kodu.

**Summary:** Tekst powołuje się na raport Faros AI: PR-y scalane bez żadnego przeglądu wzrosły o 31,3 procent, a mediana czasu w review o 441,5 procent. Skrypty Playwright, Cypress czy Selenium są kosztowne w utrzymaniu, a ich sufit jest zdefiniowany tym, co autor testu sobie wyobraził, czyli "fałszywe pokrycie": test sprawdza adres /dashboard, a metryki na nim są zepsute. Agent pracujący od celu usuwa problem selektorów, ale nie problem pokrycia.

Autor przytacza ankietę Stack Overflow, wg której 66 procent użytkowników AI uznaje za największy kłopot rozwiązania "prawie poprawne", oraz badanie METR, gdzie programiści oczekiwali przyspieszenia o 24 procent, a byli o 19 procent wolniejsi. Opisuje drabinę dojrzałości od braku AI do w pełni agentowego SDLC i argumentuje, że lokalny agent nie kumuluje wiedzy, nie patrzy na wyrenderowany ekran, nie orkiestruje równoległych przeglądarek i nie standaryzuje zespołu. Tekst jest w dużej mierze reklamą produktu QA.tech, wraz z zaproszeniem na webinar.

**Key takeaways:**
- Weryfikacja zastąpiła pisanie kodu jako ograniczenie.
- Test pisany przez autora kodu sprawdza tylko to, co autor przewidział.
- Wiele liczb pochodzi z jednego źródła marketingowego.

**Why do I care:** Teza o rozdzieleniu twórcy i audytora jest rozsądna, a E2E na podglądzie PR to praktyczny krok. Pamiętaj jednak, że autor sprzedaje rozwiązanie, więc "zrób to sam" bywa tańsze, niż sugeruje.

**Link:** [Product Quality in the AI SDLC: Why the Auditor Cannot Be the Creator](https://hackernoon.com/product-quality-in-the-ai-sdlc-why-the-auditor-cannot-be-the-creator)

## W RAG dziesięć źródeł to nie dziesięć dowodów

**TLDR:** Źródła pobrane przez RAG często pochodzą z jednego łańcucha cytowań, więc liczenie ich jako niezależnych zawyża pewność modelu. Autor proponuje liczyć efektywną niezależną ewidencję.

**Summary:** Syndykacja, parafrazy i cytowania sprawiają, że osiem dokumentów może mieć jednego przodka. Deduplikacja tekstu tego nie rozwiązuje, bo zależność jest epistemiczna, a nie dosłowna. Autor zbudował syntetyczny benchmark: każda pozycja ma wagę 1,0 (niezależna), 0 (zależna), alfa równe 0,5 (nieznana) lub wagę częściową. Suma wag to EIE, a współczynnik gamma to min(1, EIE podzielone przez K), który skaluje przyrost pewności.

W czterech scenariuszach współczynnik zawyżenia wyniósł 1,00 dla niezależnych źródeł, 10,00 dla kaskady duplikatów, 4,00 dla komory echa i 1,56 dla ekosystemu mieszanego. Na 500 twierdzeniach z korpusu FEVER, z heurystyką wspólnego artykułu Wikipedii, średnia pewność spadła z 0,268 do 0,229. Autor zaznacza, że liczby wynikają z przyjętego modelu, a nie uniwersalnej kalibracji. Praktyczne rady: rejestr źródeł, proweniencja na poziomie twierdzeń, jawne etykiety zależności, tłumienie pewności i widok audytowy. "Nieznane" nie może znaczyć "niezależne".

**Key takeaways:**
- Liczba cytowań nie jest liczbą niezależnych ścieżek dowodowych.
- Brak metadanych nie może oznaczać niezależności.
- Wyniki pochodzą z benchmarku syntetycznego, więc to kierunek, nie dowód.

**Why do I care:** Dla każdego, kto buduje RAG z cytatami, to dobry argument za przechowywaniem pochodzenia dokumentów. Najtrudniejsze, o czym autor mówi mało, to wiarygodne ustalenie zależności na prawdziwych danych.

**Link:** [In RAG, Ten Sources Are Not Ten Pieces of Evidence](https://hackernoon.com/in-rag-ten-sources-are-not-ten-pieces-of-evidence)

## Narzędzia do serwowania modeli open source na Kubernetes

**TLDR:** Stos do serwowania modeli ma pięć warstw: runtime, platformę, routing, autoskalowanie i konfigurację GPU. Najlepszy wybór zależy od tego, czy serwujesz jeden duży model, czy wiele małych.

**Summary:** Jako runtime domyślnie wybiera się vLLM, SGLang sprawdza się przy wspólnych długich prefiksach promptów, a TGI jest w trybie utrzymaniowym od grudnia 2025. Wśród platform są KServe, llm-d, NVIDIA Dynamo, KAITO, Ray Serve i SIE. Routing można oprzeć na Gateway API Inference Extension, a skalowanie na HPA, KEDA lub Knative. Zimny start przy skalowaniu od zera to według dokumentacji SIE trzy do siedmiu minut, więc dla ścieżek użytkownika trzeba trzymać gorącą replikę.

Tekst kończy się rekomendacją SIE dla floty małych modeli, z twierdzeniem o ponad pięćdziesięcioprocentowym wzroście przepustowości. Należy pamiętać, że to zalecenie producenta tego narzędzia.

**Key takeaways:**
- TGI nie nadaje się do nowych wdrożeń.
- Scale-to-zero na GPU kosztuje minuty zimnego startu.
- Wybór platformy zależy od liczby modeli na żądanie.

**Why do I care:** To przydatna mapa pojęć dla zespołów wchodzących w self-hosting. Dla typowego frontendowego zespołu nadal najtańsze bywa API, a Kubernetes ma sens dopiero przy wymaganiach regulacyjnych albo wysokim wolumenie.

**Link:** [Top Tools for Serving Open-Source Models on Kubernetes](https://hackernoon.com/top-tools-for-serving-open-source-models-on-kubernetes)

## Nowa wersja EventBridge, na którą czekali deweloperzy

**TLDR:** Przebudowane szyny zdarzeń EventBridge dodają współdzielenie między kontami, subskrybentów, kolejność FIFO, retencję do roku i wiele formatów. Autor radzi na razie tylko prototypy.

**Summary:** Klasyczne szyny wymagają reguł i celów w tym samym koncie i regionie, nie mają deduplikacji między regionami, wymuszają format AWS i nie gwarantują kolejności. Nowe zastępują reguły subskrybentami z filtrem, jednym celem i opcjonalną transformacją. Szynę można współdzielić przez AWS RAM, a dostarczanie ustawić jako nieuporządkowane lub FIFO dla każdego subskrybenta. Obsługiwane są JSON, Avro, Protobuf i strumienie bajtów, a retencja wynosi od jednego dnia do roku. Nie ma interfejsu do dowolnego odtwarzania, więc replay wymaga nowego subskrybenta z zakresem czasu.

Usługa jest dostępna w 14 regionach. CDK ma tylko konstrukcje L1 z niepełnym wsparciem, a Terraform też jest w tyle, więc autor ogranicza się do prototypów.

**Key takeaways:**
- Współdzielona szyna centralizuje widoczność subskrypcji.
- Brak dojrzałego IaC to główny hamulec.
- Klasyczne szyny nie są wycofywane.

**Why do I care:** Dla architektur zdarzeniowych w wielu kontach to realna poprawa. Poczekaj na CDK i Terraform, bo ręczne obejścia kosztują przy każdej zmianie.

**Link:** [AWS EventBridge Finally Gets the Upgrade Developers Have Been Waiting For](https://hackernoon.com/aws-eventbridge-finally-gets-the-upgrade-developers-have-been-waiting-for)

## PortSwigger twierdził, że Chrome zepsuł laboratorium CSRF. Testy mówią co innego

**TLDR:** Autor sprawdził na ośmiu wersjach Chrome, że dwuminutowe okno łaski dla ciasteczek bez jawnego SameSite nadal działa, mimo że PortSwigger usunął powiązane laboratorium i teorię.

**Summary:** Chrome domyślnie traktuje ciasteczka bez atrybutu SameSite jak Lax, ale przez pierwsze 120 sekund po wystawieniu wysyła je w POST-ach z nawigacji najwyższego poziomu, by nie psuć logowania SSO. Atak polega na odświeżeniu ciasteczka, na przykład przez bramkę OAuth, a zaraz po tym wysłaniu żądania CSRF. Autor napisał dwa skrypty Pythona imitujące bank i stronę atakującego i przetestował pięć scenariuszy oraz tryb zbliżony do realnego. Okno działało w każdej testowanej wersji od 141 do 155, a odświeżenie wartości ciasteczka resetuje 120 sekund.

PortSwigger nie odpowiedział merytorycznie, tylko przekazał sprawę zespołowi deweloperskiemu. Autor zaznacza, że nie jest programistą, a testy mogą zawierać błąd, i nie twierdzi, że PortSwigger zrobił coś złego.

**Key takeaways:**
- Ciasteczka bez SameSite mają dwuminutowe okno wysyłania w POST.
- Odświeżenie ciasteczka otwiera okno od nowa.
- Wyniki pochodzą od jednego autora i czekają na potwierdzenie.

**Why do I care:** Praktyczna lekcja: ustawiaj SameSite jawnie i nie polegaj na domyślnym Lax jako na jedynej ochronie przed CSRF. Tokeny CSRF nadal są potrzebne.

**Link:** [PortSwigger Said Chrome Updates Broke Its CSRF Lab. My Tests Tell a Different Story](https://hackernoon.com/portswigger-said-chrome-updates-broke-its-csrf-lab-my-tests-tell-a-different-story)

## Przestań obwiniać AI. Rozlicz ludzi, którzy decydują

**TLDR:** Esej przekonuje, że o skutkach AI dla pracy decydują firmy i rządy, i przedstawia program polityczny: podatki, wsparcie dla zwalnianych, prawo do odwołania od decyzji automatycznych.

**Summary:** Autor przywołuje ocenę ILO z 2025, wg której co czwarte miejsce pracy jest potencjalnie narażone na generatywną AI, choć zmiany będą częstsze niż całkowite zastąpienie. Proponuje dzielenie zysków, płatne przekwalifikowanie, konsultacje z pracownikami, prawo do wyjaśnienia i odwołania od decyzji automatycznych, ochronę pracowników platform oraz warunki przy dotacjach publicznych. Kończy trzema działaniami przed wyborami: sprawdź propozycje, sprawdź stanowisko kandydatów, zadaj jedno konkretne pytanie.

To tekst polityczny, a nie techniczny. Pomija kompromisy, na przykład wpływ proponowanych podatków na konkurencyjność, i tylko krótko wspomina o argumentach MFW przeciw podatkowi od AI.

**Key takeaways:**
- Technologia jest ta sama, różnią się decyzje wokół niej.
- Decyzje automatyczne powinny mieć osobę odpowiedzialną i ścieżkę odwołania.
- To głos opinii, nie analiza ekonomiczna.

**Why do I care:** To przede wszystkim temat polityczny, ale zespoły wdrażające automatyczne decyzje o ludziach, na przykład scoring czy monitoring, powinny znać oczekiwanie wyjaśnialności i odwołania, które może wejść do prawa.

**Link:** [Stop Blaming AI. Start Holding the People in Charge Accountable.](https://hackernoon.com/stop-blaming-ai-start-holding-the-people-in-charge-accountable)
