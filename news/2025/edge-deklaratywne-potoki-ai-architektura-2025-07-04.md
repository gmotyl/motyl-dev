---
title: "Edge, deklaratywne potoki danych i AI w architekturze — przegląd InfoQ 2025-07-04"
excerpt: "Omówienie najważniejszych doniesień: Spark Declarative Pipelines od Databricks, użycie AI przez architektów, Cloudflare Containers, natywne Avro/Protobuf w AWS Lambda, oraz nowości Jakarta EE i MicroProfile."
publishedAt: "2025-07-04"
slug: "edge-deklaratywne-potoki-ai-architektura-2025-07-04"
hashtags: "#generated #pl #ai #architecture #cloudflare #aws #spark #kafka #java #serverless #observability #performance #microservices"
---

## Databricks Contributes Spark Declarative Pipelines to Apache Spark
**TLDR:** Databricks przekazuje technologię Delta Live Tables do Apache Spark jako Spark Declarative Pipelines — pozwoli to opisywać potoki strumieniowe deklaratywnie (SQL lub prosty Python SDK), automatycznie budując graf zależności i plany wykonania. To upraszcza pisanie pipeline’ów, ale nie eliminuje potrzeby rozumienia runtime’u i debugowania wydajności.

**Summary:**
Databricks zaproponował podejście deklaratywne do budowy potoków w Spark — zamiast pisać imperatywne transformacje i ręcznie orkiestrując zadania, deweloper opisuje źródła strumieni, tabele i relacje między nimi (np. CREATE STREAMING TABLE, materialized views, sprawdzenia jakości danych). System tłumaczy zapytania na graf zależności i zoptymalizowany plan wykonania, a materializowane widoki są automatycznie aktualizowane wraz z napływem danych.

To duże ułatwienie dla zespołów ETL/ELT: szybciej zbudujesz pipeline, łatwiej wprowadzisz reguły jakości (CONSTRAINT … EXPECT … ON VIOLATION) i zmniejszysz konieczność pisania kodu orkiestratorów. W praktyce oznacza to mniejszą ilość kotłowni kodu, powtarzalnych wzorców i potencjalnie krótszy czas wdrożenia dla standardowych scenariuszy.

Trzeba jednak podkreślić ograniczenia: deklaratywność zamaskuje części złożoności runtime’u Spark. Wciąż trzeba rozumieć zachowanie systemu przy awariach, backpressure, state management, checkpointingu, oraz optymalizacjach pamięci/IO. Autorzy mówią o mniejszej potrzebie zewnętrznych orkiestratorów, ale nie omawiają wystarczająco jak narzędzie radzi sobie z retry, wersjonowaniem schematów, migracjami transformacji czy bezpieczeństwem danych.

Dla architektów: Spark Declarative Pipelines to narzędzie, które może znacząco przyspieszyć prototypowanie i ujednolicić ETL. Jednak decyzja o przyjęciu podejścia deklaratywnego powinna iść w parze z planem obserwowalności, testów integracyjnych (symulacja danych, opóźnień) i procedur debugowania planów wykonania. Zespół operacyjny musi zachować widoczność na plany wykonania i metryki, inaczej łatwo stracić kontrolę nad kosztami i wydajnością.

**Key takeaways:**
- Deklaratywne opisy potoków (SQL/Python SDK) redukują czas tworzenia i utrzymania pipeline’ów.
- Automatyczne materializowane widoki i wbudowane reguły jakości danych upraszczają podstawowe przypadki użycia.
- Nadal niezbędne są kompetencje w zakresie działania Spark: troubleshooting, optymalizacja i zarządzanie stanem.

**Tradeoffs:**
- Uproszczenie pisania potoków means szybsze wdrożenia but sacrifice ukrycie runtime’owej złożoności, co utrudnia debugowanie i optymalizację.

**Link:** [Databricks Contributes Spark Declarative Pipelines to Apache Spark](https://links.infoq.com/ls/click?upn=u001.CFzvRNOd1UPapbMxiSttbIiWIRIGk0N9yygGxpJKie8-2BFL-2FbZqQAfL2xfVpSd899RqPTnMKp4zVNOUkMqtL97V4V3unFnIagkQ8ve1P-2BzCv7tTCgQZpJUSKwtouDsBFvdR1KJVqDGIhaW3dhU9IRanjCnFdp36F2wCng2cus9Do1tdEAsqjzH8zfhoXLKB0Q6-2FJVYV0jOWtbu7BUOgJSSH6xOk0BHAyS8Yq3-2FgA5iNRKjLfQNRn4faYIxi6N-2B-2Bs2ncpSMZa7KIl2QYHI1sWJ-2BRTYwjCJneO98-2BdnSwrpVW165xv-2FjTBxRkF-2FjcPygUa9WnyenelwUQiO-2BilWeJlYVZU1Pb4nDIrJnLtJOw8k-2BaZbPJDK3lwY76k5gSRTWnN3FGF69voGF4eyRbmwf2Ey1jEeLF3JO-2Fb4PcmfBn5Wf94-3DxCFi_ZhmJpwS0jR0p1vnp21MpkX0DvucC5GWqqu3nFeprlSof43-2FZdpLw0JkswA-2Bk27SOdw2SEidgbhrMydHwU1vaz9nySAeZmnpRBqD5b-2B5SZF4ey2j245bslwijJpPShYCTH1dU2sFAYN84gBvaVWLssuaC10enTVZENeDj5TQXB8MqKrs3okwIBSBdfv49-2B6UzlMODYc5k6J71SLunwI5QltU3xxhgzhV7Lw9zmGF2dF0zlscfPNawj5ykHePfmiN6WOwSUOdRSXIj-2BOMoIJzWHQ-3D-3D

---

## Experiences from Using AI as a Software Architect
**TLDR:** AI służy świetnie do eksploracji kompromisów i dopracowywania języka w dokumentacji, ale nie zastąpi ludzkiej intuicji kontekstualnej, Theory of Mind ani umiejętności czytania sytuacji organizacyjnej. Architekt, który umie wykorzystać AI i jednocześnie krytycznie oceni jego output, ma przewagę.

**Summary:**
Avraham Poupko opisuje praktyczne użycie LLM i generatywnej AI w pracy architekta: głównie jako narzędzie do analizowania kompromisów technicznych i poprawiania precyzji języka w dokumentach. LLM świetnie agreguje i formułuje tekst, może zaproponować alternatywne sformułowania i zestawienia opcji architektonicznych, ale często brakuje mu niuansów kontekstowych i „emocjonalnej inteligencji”, którą ludzie wykorzystują przy negocjacjach i podejmowaniu decyzji.

Autor słusznie zauważa, że architekci nie zostaną zastąpieni — ale zostaną zastąpieni przez tych, którzy nauczą się współpracować z AI. Trzeba też umieć powiedzieć "nie" narzędziu: LLM może wprowadzać subtelne zmiany (słowo "yet" w cytowanym przykładzie), które zmieniają ton lub obietnicę. Krytyczne myślenie i weryfikacja wyników pozostają kluczowe.

Czego autor nie rozwija wystarczająco: ryzyka bezpieczeństwa i prywatności przy korzystaniu z modeli, zarządzania promptami i wersjonowania generowanych artefaktów, oraz metod testowania decyzji wygenerowanych przez AI w kontekście architektonicznym. Nie ma też głębokiej dyskusji o hallucinations i konieczności jawnego definiowania granic odpowiedzialności.

Dla zespołów i architektów: praktyczny wzorzec użycia — stosuj AI do szybkich przeglądów opcji, generowania szkiców komunikatów i sprawdzania spójności dokumentacji. Równolegle wprowadź proces walidacji: peer review, eksperymenty prototypowe i polityki bezpieczeństwa danych. Szkolenie dotyczące "jak nie używać AI" jest równie ważne jak szkolenie "jak używać AI".

**Key takeaways:**
- AI jest świetna do formułowania języka i eksploracji kompromisów, ale nie zastąpi kontekstualnej inteligencji ludzkiej.
- Architektami przyszłości będą ci, którzy potrafią współpracować z AI i krytycznie weryfikować jego output.
- Trzeba wprowadzić praktyki walidacji, polityki prywatności i wersjonowanie generowanych artefaktów.

**Tradeoffs:**
- Wykorzystanie AI improves documentation speed but sacrifice pełnej kontroli nad semantyką i intencją, wymagając dodatkowej weryfikacji.

**Link:** [Experiences from Using AI as a Software Architect](https://links.infoq.com/ls/click?upn=u001.CFzvRNOd1UPapbMxiSttbIiWIRIGk0N9yygGxpJKie8-2BFL-2FbZqQAfL2xfVpSd899jxx65U4oGB5zTOO05hu3BL88W3u1ISt4ikR2wOc-2F09bv6KjeI6SayWJ1yKczgI6IOV-2FoEk078wW1DHjZR-2BxadV1LYU5mfaXU-2FgJlotBmpUuQ8Fs6T3CCF3w6lEyuJ68bDgweeJRntXjd1BAdC-2FteZImrUhb7gZSq4n1w159RQqRxJmHZ42WbJb3xrn21h5-2BzB5NoB82-2BH7dm8mFEa5d1sPpC48yUHrl-2Bnus4OuVD8ETBNc0KBHgI3fId3MnTiVvsbnaZYO5T5fDMjI5fKGdRZ2vrD3ZY668vmVsifxc5MjHMDXAMMhsODgYXkTVaw0-2FcfJSB_ZhmJpwS0jR0p1vnp21MpkX0DvucC5GWqqu3nFeprlSof43-2FZdpLw0JkswA-2Bk27SOMAK3RIcLKm2UtomnLRFBspjXXjnl2XbU8KxG-2FkkUm4Y0Hslr1A-2F-2BIRWxHG-2BwiJ4e6wn3M9Sb9SQa9oNjwQoz7rq6yuwQDltKgqsf5v5qjLy8-2BHBRrINFibry6IJHqsrIDct2sHlwbj8tqpqyCCjOmJ1tWugYLY9IlBzGY2KPata7Hk9KAydpDWbRxAFO4Tl-2FdMwFOci6pUbv767nJGOR-2BA-3D-3D)

---

## Cloudflare Launches Containers in Public Beta
**TLDR:** Cloudflare udostępnia publiczną betę Containers — możliwość uruchamiania Dockerowych obrazów na globalnej sieci, blisko użytkownika, integrowana z Workers i Durable Objects. To nowy krok łączenia kontenerów z architekturą edge, ale beta ma ograniczenia (brak global autoscaling, ograniczenia zasobów).

**Summary:**
Cloudflare Containers to próba połączenia dwóch światów: elastyczności i kompatybilności kontenerów z geograficzną dystrybucją i programowalnością Workers. Każdy container jest obsługiwany przez Durable Objects, które pełnią rolę programowalnego sidecara: proxy, lifecycle manager i punktu integracji z routingiem Workers. Dzięki temu można wdrożyć aplikacje wymagające pełnego systemu plików, wielowątkowości, czy specyficznych runtime’ów na ponad 300 lokalizacjach.

Technicznie to atrakcyjne: migracja istniejących aplikacji do rozproszonej, globalnej tkanki bez konieczności przepisywania wszystkiego na serverless Workers. Scenariusze: przetwarzanie mediów przy edge, bramki API, komponenty service-mesh, a także uruchamianie CLI i narzędzi, których Workers nie obsłuży.

Public beta ma limity: maksymalnie 40 GiB pamięci i 40 vCPU dla równoczesnych instancji, brak global autoscaling i routingu uwzględniającego latencję. Autorzy zapowiadają kolejne sposoby komunikacji między Workers a containerami (exec, handlers). Społeczność testuje to z entuzjazmem, ale podkreśla, że koszt i model skalowania będą krytyczne dla przyjęcia.

Dla zespołów i architektów: Cloudflare Containers warto rozważyć tam, gdzie potrzebujecie geograficznej bliskości i kompatybilności kontenerów bez pełnej orkiestracji kube. Trzeba jednak z góry zaplanować kwestie: monitoring i obserwowalność rozproszonych instancji, polityki aktualizacji obrazów, limitów zasobów i scenariuszy awaryjnych (failover, lokalne przeciążenia). Uważajcie też na lock-in w warstwie routing/lifecycle Durable Objects.

**Key takeaways:**
- Containers na edge dają możliwość uruchamiania bardziej złożonych, stateful lub zależnych od systemu plików aplikacji blisko użytkownika.
- Integracja z Workers i Durable Objects oferuje programowalny routing i lifecycle, ale beta ma istotne ograniczenia skalowania.
- Przyjęcie wymaga planu obserwowalności, strategii aktualizacji obrazów i przemyślenia ewentualnego vendor lock-in.

**Tradeoffs:**
- Globalna dystrybucja i prostota deploy’u means niskie opóźnienia dla użytkowników but sacrifice kontrolę nad zaawansowaną orkiestracją i możliwe większe koszty/lock-in.

**Link:** [Cloudflare Launches Containers in Public Beta](https://links.infoq.com/ls/click?upn=u001.CFzvRNOd1UPapbMxiSttbIiWIRIGk0N9yygGxpJKie8-2BFL-2FbZqQAfL2xfVpSd899XJwHLkjuIX5VfQEaj6v-2FWahh-2FLmunqEt6OhYDu6Ny-2FEpD45VSNosQinstKokwabKOCYlbjWM5G2dltEIKeMxrzLmdxr-2B6kiClsrZxc5Jqnj5ykZGIut4GTkNA6tO7yAnd9jOqO-2FzqxdSTpAeAk74bEXKUrBlre4e-2Fcdgz0KjKmcpsQXhNDdGQEqhdbFwKPQG-2Fhcat3zT64O6uDCzF-2BTlVzq7p4iE9a7zO99rz0PukvFSEj2MUsDtwwXz9rBPLHxORVanCilvf2Az-2Bpusnbmpd2hA5grCGQhJtU3HDuYTgwWebKkHBh7WUjYRGfkqdxtY9UNN_ZhmJpwS0jR0p1vnp21MpkX0DvucC5GWqqu3nFeprlSof43-2FZdpLw0JkswA-2Bk27SOoYWtxza9o9YSWTATDJNZ4RAcv9QyFVF7jKewKnVp1e8T27tExvc1-2BcT9R56pIyNMVSRpdX8B9YKqgG2yMUr5U-2FyHoL58HCpnCf4vJMYLHpq6SwJbZ8D8YCmkxqJc-2FfFcTiNygXUR-2FQrLvytRMwNlFAd7qJ2ICY9kCJp0tgSAJ3FpssjRlYxnhRLa-2Fs2gZfWNY77kPNd-2BOf03ZRYM-2BbKJCA-3D-3D

---

## AWS Lambda Gains Native Avro and Protobuf Support for Kafka Events with Schema Registry Integration
**TLDR:** AWS Lambda w Kafka Event Source Mapping (ESM) w trybie Provisioned Mode obsługuje natywnie Avro i Protobuf oraz integrację z registry (AWS Glue, Confluent itp.), przenosząc deserializację i walidację na warstwę zarządzaną. To ułatwia konsumpcję kompaktowych binarnych formatów i pozwala filtrować zdarzenia przed uruchomieniem funkcji.

**Summary:**
AWS dodało natywne wsparcie dla Avro i Protobuf w Lambda, współpracujące z rejestrami schematów. Do tej pory deweloperzy musieli we własnym kodzie pobierać schematy, deserializować wiadomości i walidować je. Teraz ESM może zrobić to przed wywołaniem funkcji: pobrać schemat, zwalidować i dostarczyć deweloperowi już rozkodowany, czysty JSON lub typowe obiekty wygenerowane z Avro/Protobuf.

Główne korzyści to prostszy kod funkcji, możliwość filtrowania zdarzeń na poziomie ESM (mniej niepotrzebnych invokacji i niższe koszty) oraz centralizacja schematów. Integracja dotyczy Amazon MSK, Confluent Cloud i self-managed Kafka, ale wymaga włączenia Provisioned Mode dla Kafka ESM i skonfigurowania registry (endpoint, auth).

Ryzyka i braki: zależność od registry jako komponentu krytycznego — opóźnienia lub błąd w registry może wpłynąć na przetwarzanie zdarzeń. Wymuszanie Provisioned Mode to dodatkowy wymóg operacyjny i kosztowy. Nie ma szerokiej dyskusji o testowaniu kompatybilności schematów, politykach ewolucji (backward/forward compatibility) ani mechanizmach failover, gdy schematy się nie zgadzają.

Dla architektów: to dobry krok do ujednolicenia przetwarzania zdarzeń i redukcji boilerplate. Przy projektowaniu pamiętajcie o: politykach zgodności schematów, testach end-to-end z rzeczywistymi rejestrami, monitoringu opóźnień registry i planie awaryjnym (co jeśli ESM nie może pobrać schematu?). Przekazanie deserializacji do serwisu upraszcza deweloperów, ale zwiększa powierzchnię operacyjną po stronie platformy.

**Key takeaways:**
- Natywna obsługa Avro/Protobuf upraszcza funkcje Lambda i redukuje kod deserializujący.
- Event filtering na poziomie ESM może obniżyć koszty przez zmniejszenie niepotrzebnych wywołań.
- Konfiguracja wymaga Provisioned Mode i integracji z registry; warto zaplanować testy kompatybilności schematów.

**Tradeoffs:**
- Centralizacja deserializacji improves developer productivity but sacrifice niezależność aplikacji i wprowadza operacyjną zależność od schema registry.

**Link:** [AWS Lambda Gains Native Avro and Protobuf Support for Kafka Events with Schema Registry Integration](https://links.infoq.com/ls/click?upn=u001.CFzvRNOd1UPapbMxiSttbIiWIRIGk0N9yygGxpJKie8-2BFL-2FbZqQAfL2xfVpSd8996iX0gceF2P-2BaLBLAHNvRnu5McFnwDwtDSNGXX1iHvceNLiENOPKB0Jw8eDBO-2FjastYsZ8FlfmqZLWnq3hks6CRLyPVc-2FjncYplYqAOLVBM-2BJ7VFSOG90huYWNgMpDXzvvmnYERMepLhDRtcV7VZnT0U2SB01z-2FsVtfmVwlkdQR0dNYzKj4hqo5iFsTDaGjiPTl6q-2B8qAPWLcMwhxWTMmsTR9rp-2FvCOWbJfIfv9AMIDIKFpVk7AmrpXI2MC57DtMdW40otgqYjDfOHqmtcdwiVgxTysAU9Sr6TwnwLdCo6SBBZa5lQEu-2FnYDRWrDk4KcACd4O_ZhmJpwS0jR0p1vnp21MpkX0DvucC5GWqqu3nFeprlSof43-2FZdpLw0JkswA-2Bk27SOGQXWbRVfXwPWBxJQNQsqyy6fLvASm-2BWb1lP1FA3OoLzO78VQXG-2FWmgS4zWss9VhcMjl6NF9MOCQYEubW3Sc8XQbn9janEX4Zz83B7wD1R42hfVQSDSJ8-2FCGnzLr4LCHtfLN-2FwYEj9lT7JcPjcmz-2B2GbxjpxtxP52k-2B2fZzBUyiTvm8quRP-2BO3611jZeckk5FL0D5eYMBbuI525nqTbS-2BlA-3D-3D

---

## Jakarta EE 11 Delivers One New Specification, 16 Updated Specifications and Modernized TCK
**TLDR:** Eclipse Foundation wydała Jakarta EE 11 Platform po długim procesie, w którym zaktualizowano 16 specyfikacji i zmodernizowano TCK (migracja Ant→Maven, TestHarness→Arquillian). Celem było ułatwienie testowania kompatybilności i obniżenie bariery dodawania testów.

**Summary:**
Jakarta EE 11 to zamknięcie procesu, który trwał dłużej niż planowano, głównie przez konieczność gruntownego odświeżenia Technology Compatibility Kit. Przebudowa TCK — migration buildów i testów do nowoczesnych narzędzi (Maven, Arquillian) z użyciem OpenRewrite — jest znaczącą, choć niewdzięczną robotą infrastrukturalną, która ma długoterminowe korzyści: łatwiejsze dodawanie testów, lepsza kompatybilność i niższa bariera wejścia dla nowych implementacji.

Platforma dostarcza pełen zbiór specyfikacji dla aplikacji enterprise; Web Profile i Core Profile dają subsety dla aplikacji webowych i mniejszych runtime’ów (Core profile zoptymalizowany pod microservices i AOT). W Jakarta EE 11 pojawiła się też Jakarta Data 1.0 jako nowa specyfikacja.

Co brakuje w relacji: mniej miejsca poświęcono integracji z nowymi paradygmatami cloud-native poza deklaracją Core Profile i AOT. Brakuje praktycznych przypadków migracji aplikacji monolitycznych do Core/Web Profile, oraz szerszej dyskusji o tym, jak nowe TCK i narzędzia pomogą w CI/CD i automatycznym testowaniu kompatybilności w pipeline’ach.

Dla architektów: Jakarta EE 11 daje solidną drogę kompatybilności i narzędzia testowe, które powinny ułatwić certyfikację implementacji. Jeśli budujecie aplikacje enterprise w Javie, to dobry moment by sprawdzić, czy Web/Core Profile odpowiadają waszym potrzebom i czy możecie skorzystać z Jakarta Data. Przy planowaniu migracji uwzględnijcie koszty przebudowy testów i integrację TCK z waszym CI.

**Key takeaways:**
- Jakarta EE 11 zawiera modernizację TCK i aktualizacje 16 specyfikacji, co poprawia procesy kompatybilności.
- Core Profile pozostaje ukierunkowany na mniejsze runtime’y i AOT, Web Profile dla aplikacji webowych.
- Nowa Jakarta Data 1.0 i zmiany nazewnictwa (Validation, Pages) to istotne zmiany semantyczne.

**Tradeoffs:**
- Modernizacja TCK improves long-term testability but sacrifice short-term release velocity (opóźnienia w publikacji).

**Link:** [Jakarta EE 11 Delivers One New Specification, 16 Updated Specifications and Modernized TCK](https://links.infoq.com/ls/click?upn=u001.CFzvRNOd1UPapbMxiSttbIiWIRIGk0N9yygGxpJKie8-2BFL-2FbZqQAfL2xfVpSd899iaJNK3JeORYMKcf55a5I5x8rA3CGhb5lXR8A4IKWCr64YCG4owHJ0CYOF7K6KJzejd7DUEfILhAmgKAkBGeIas1SNByJ7vDVMKiL7d5zEmqS-2FFJFfnf3zSW6JiisER2OiUT5cAvKID0sg1OwBcFTGeNseeps4rfC3v8E1O0cYJUYB995dVUQB9RyOxk9XuJF4nlfEHHQpn0F7BxZGN9Mv2X1xYzWdqvyOguzVC8QpVYaIkUG-2FZy7b7-2FNKIZfaXBvY2Cp2CzMNQOtCL-2B5tlg5I6O22TAH2e-2BdS75pHQ68Xn4-3DEYxP_ZhmJpwS0jR0p1vnp21MpkX0DvucC5GWqqu3nFeprlSof43-2FZdpLw0JkswA-2Bk27SOG1CFYk1Zi1Sn60vK6WqxUbi28vNkknDgkO-2FugJfWDrc2Qzyw4D7pSDHct1gNQ-2BT7M-2FwgC38EbjS6gKSBQjEOt4cPRXPUtyifWetGCOoOzDjsddKC8LMsFnITVYTH6SG-2FP8sOsK3ApatBI6ucIyF5h4VJaOzlItbHo2WxllNOsuvttoHrd-2BsRkmfrPlDm-2FmLZqN1x-2FAy-2BHq0SITWZtYt2Rg-3D-3D

---

## MicroProfile 7.1 Delivers Updates to Their Telemetry and Open API Specifications
**TLDR:** MicroProfile 7.1 aktualizuje MicroProfile Telemetry do wersji 2.1 (zgodność z OpenTelemetry) i MicroProfile Open API do 4.1, wprowadzając drobne ulepszenia i zgodność z Jakarta EE 10. To kontynuacja drogi MicroProfile jako lekkiej warstwy dla microservices w ekosystemie Jakarta EE.

**Summary:**
MicroProfile 7.1 to kolejny krok w integracji z OpenTelemetry i wzmocnieniu wsparcia dla mniejszych runtime’ów. Telemetry 2.1 poprawia zależności (Awaitility dla JDK 23) i metryki, a Open API 4.1 dodaje obsługę jsonSchemaDialect() i drobne udoskonalenia API. MicroProfile pozostaje zestawem specyfikacji ułatwiających budowanie microservices zgodnych z Jakarta EE.

Dla zespołów, które używają JVM w mikroserwisach, to dobra wiadomość: łatwiejsze włączenie obserwowalności (tracing, metrics) i spójne deklarowanie API w aplikacjach. Jednak materiały nie rozwijają szczegółów dotyczących domyślnej polityki próbkowania, kosztów telemetrycznych ani integracji z rozproszonym tracingiem na produkcji.

Rekomendacja dla architektów: przyjmijcie MicroProfile jako bazę dla lekkich serwisów, ale zaplanujcie polityki samplingowe, limity metryk i strategię przechowywania trace’ów. Testujcie automatycznie w CI integrację telemetryczną, bo nadmiar danych obserwowalności może szybko zwiększyć koszty i złożoność.

**Key takeaways:**
- MicroProfile 7.1 wzmacnia integrację z OpenTelemetry i poprawia API OpenAPI.
- Aktualizacje ułatwiają uruchamianie microservices na mniejszych runtime’ach zgodnych z Jakarta EE.
- Trzeba świadomie zaprojektować strategię obserwowalności i kontrolę kosztów telemetrycznych.

**Link:** [MicroProfile 7.1 Delivers Updates to Their Telemetry and Open API Specifications](https://links.infoq.com/ls/click?upn=u001.CFzvRNOd1UPapbMxiSttbIiWIRIGk0N9yygGxpJKie8-2BFL-2FbZqQAfL2xfVpSd8991U-2F3LUiRyA9ZMRCcbHL64aC8ikx1g0hqXZESzYgoq23glZgnakM-2FOzGW9UuvZfBRB8etv4qjzil3cQUN1W4Lm1zoyvmJTfaeZ0I1ZEihFmtWulwwIOtcjIeKAUxnti-2B6jsIVO36H01gmUHXDdz1cTWEjMuLuUJ9IP88umLdTU1eecF-2FWkDfQz1kmPoUZOkrtqBVzt6hyBZh8m-2BKj0rM25op2iOi3-2FirrKtLCrdlrfManXg3jX7-2FWSlx0Z-2FJR-2F6UQrsu751Ng4HUxLimYzDCWr7f0WzvCiBKkyPK8DXqKXNFS5iG-2BXYBxm-2B9-2BiOCU-2FEWfeYJr_ZhmJpwS0jR0p1vnp21MpkX0DvucC5GWqqu3nFeprlSof43-2FZdpLw0JkswA-2Bk27SOXWNDVm8q8sw46P8YK4dSI0s35BXnQk59wgaGO-2BBucallLgzWzrFcj7s-2BQFvytxyzohOi0wQlU-2Fitjrc-2B78XRC6XvmQ1JJfz8qLI7wZopigH9ujS5atG6bUcSWbNFH3haXsLTElucBc5-2F2Yr4J1KUnLCd2CgwJD-2BB-2FF0P5Url1hLR1Ms5QHtBsWobwJ8QT95ofqU-2BvPj-2BFL0G0mQ7enSsJQ-3D-3D

---

Koniec podsumowania. Jeśli chcesz, przygotuję skrypt audio w formie wypowiedzi (ok. 6–8 minut) bazujący na tych streszczeniach — gotowe do nagrania.

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by gpt-5-mini LLM. While we strive for accuracy, please verify critical information independently.
