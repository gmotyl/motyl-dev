---
title: "daily.dev: bank w Go na żywo, mały model webAI, plan na świat bez programistów i łatki Next.js"
excerpt: "Strumień o budowie banku w Go, ośmiomiliardowy model open-weight webAI, esej o tym, co po AI zostaje programistom, i siedem poprawek bezpieczeństwa w Next.js."
publishedAt: "2026-11-05"
slug: "dailydev-bank-w-go-webai-model-plan-na-ai-nextjs-poprawki"
hashtags: "#dailydev #frontend #golang #ai #llm #open-source #career #nextjs #security #generated #pl"
source_pattern: "daily.dev"
---

## Build Your Own Bank In Go

**TLDR:** Autor streamuje na Twitchu budowę oprogramowania bankowego od zera w Go i wrzuca nagrania za darmo. Pierwszy odcinek już jest, kolejne zależą od zainteresowania.

**Summary:** To nowa seria z cyklu PayEng Playbook. Autor pracuje publicznie, więc widać wszystko, czyli myślenie na głos, objazdy, refaktoryzacje, pomyłki i zaglądanie do dokumentacji. Właśnie to jest tu wartością, bo większość materiałów o systemach finansowych pokazuje wynik, a nie drogę do niego.

W samej notce nie ma szczegółów architektury, więc trudno ocenić, jak głęboko autor wejdzie w księgowanie podwójne, idempotentność przelewów czy spójność. To są rzeczy, na których banki naprawdę się wykładają, i warto sprawdzić, czy pierwszy odcinek ich dotyka, czy zostaje przy ładnym CRUD-zie.

**Key takeaways:**
- Seria powstaje na żywo na Twitchu, nagrania są niepublikowane na liście, ale darmowe.
- Pokazuje błędy i refaktoryzacje, nie tylko gotowy kod.
- Kolejne odcinki zależą od zainteresowania widzów.

**Why do I care:** Dla frontendowca to raczej ciekawostka, ale dobrze czasem zobaczyć, jak ktoś modeluje domenę, w której pomyłka kosztuje pieniądze. Takie oglądanie uczy więcej o granicach agregatów i transakcji niż kolejny kurs. Czekam jednak na dowód, że to będzie poważny bank, a nie zabawka.

**Link:** [Build Your Own Bank In Go](https://daily.dev/posts/Qdb3zXK2C)

## Model open-weight webAI z 8,8 mld parametrów

**TLDR:** webAI opublikowało na Hugging Face model, który ma osiągać 93% wyników czołowych modeli w kodowaniu. Społeczność jest podzielona i sceptyczna wobec benchmarków.

**Summary:** Model ma 8,8 miliarda parametrów, więc działa na lokalnym sprzęcie. Według producenta osiąga 93% wydajności modeli z czołówki w kodowaniu i 92% w wykonywaniu instrukcji. Jeden z recenzentów zmierzył osobno około 90% na zadaniach z matematyki konkursowej.

Reakcje pod postem są ostrożne. Około 45% komentujących jest sceptycznych, 35% mieszanych, a tylko 20% pozytywnych. Wątpliwości dotyczą głównie wyniku w wariancie z rozbudowanym wnioskowaniem, bo benchmark kodowania rzadko przypomina wieloplikowe, wieloetapowe zadania z prawdziwego repozytorium.

Autor notki nie wspomina o tym, ile tokenów model zużywa, żeby dojść do tych wyników. Przy małych modelach to często ukryty koszt, bo wysoki wynik bywa okupiony długim myśleniem.

**Key takeaways:**
- Wagi są otwarte i leżą na Hugging Face.
- 93% w kodowaniu to deklaracja producenta, nie niezależny pomiar.
- Największe wątpliwości dotyczą przełożenia benchmarku na realną pracę w repozytorium.

**Why do I care:** Lokalny model, który robi większość roboty za prawie darmo, byłby dla zespołów świetną wiadomością, szczególnie tam, gdzie kod nie może wychodzić na zewnątrz. Zanim cokolwiek wdrożę, odpalę go na własnym, brzydkim zadaniu z naszego monorepo. Benchmark z reklamy nic mi nie powie.

**Link:** [webAI's 8.8B open-weight model claims 93% of frontier coding performance](https://daily.dev/posts/gDlTrnG6P)

## We're Building AI to Replace Ourselves. What's the Plan?

**TLDR:** Autorka pyta, czemu przy rosnącej produktywności dzięki agentom nikt nie pracuje mniej. Proponuje trzydniowy tydzień pracy za tę samą pensję i przypomina, że rynek juniorów był przesycony jeszcze przed AI.

**Summary:** Agenci kodujący są już powszechni, także w firmach o rygorystycznych zasadach bezpieczeństwa. Proste funkcje i debugowanie starych aplikacji są dużo łatwiejsze. Autorka zauważa jednak, że programiści nie pracują mniej. Oczekiwania rosną razem z możliwościami, a koordynacja, spotkania i decyzje architektoniczne zostają po ludzkiej stronie.

Niepokoi ją też moment, w którym agenci zaczną uruchamiać własnych podagentów. Zamiast odpowiedzi proponuje hipotezę, że moglibyśmy wreszcie pracować krócej, na przykład trzy dni w tygodniu bez obniżki wynagrodzenia.

Osobny wątek to juniorzy. Dekadę temu firmy zatrudniały prawie każdego, kto umiał napisać prosty kod, nawet prowadziły bootcampy. Rynek przesycił się, zanim pojawiło się AI, a AI dołożyło presji na wierzch.

Tekst kończy się otwartym pytaniem do czytelników, więc planu, o który pyta tytuł, tak naprawdę nie ma. Autorka też nie wspomina, kto miałby wynegocjować krótszy tydzień, skoro pracodawcy mają wszelkie powody, żeby wziąć zysk z produktywności dla siebie.

**Key takeaways:**
- Produktywność wzrosła, a obciążenie pracą nie spadło.
- Rynek juniorów był przesycony wcześniej, AI tylko to pogłębia.
- Trzydniowy tydzień to pomysł, nie plan.

**Why do I care:** Jako konsultant widzę dokładnie ten mechanizm. Zespół z agentami dostaje więcej zadań, a nie więcej wolnego. Dyskusja o skróconym tygodniu jest sympatyczna, ale bez zmiany sposobu, w jaki mierzymy wartość pracy, skończy się na tekście na dev.to.

**Link:** [We're Building AI to Replace Ourselves. What's the Plan?](https://daily.dev/posts/3brb2iLdH)

## Next.js: siedem poprawek i łatanie to połowa pracy

**TLDR:** Wersje 16.4.5 i 15.5.29 łatają siedem luk. Najpoważniejsza to wyciek cache między tenantami przy łączeniu unstable_cache z use cache. Po aktualizacji trzeba jeszcze przejrzeć własny kod.

**Summary:** Najgroźniejsza luka ma wysoką wagę. Jeśli funkcja czytająca parametr korzenia, na przykład identyfikator tenanta, jest wywoływana zarówno bezpośrednio, jak i przez unstable_cache, a w tym czasie trwa zimne wypełnianie cache, wynik jednego żądania może trafić do drugiego. W aplikacji wielotenantowej oznacza to dane jednego klienta w odpowiedzi dla innego.

Autor posta radzi, żeby po aktualizacji przeszukać kod pod kątem funkcji mieszających parametry korzenia z unstable_cache lub use cache. Trzeba też sprawdzić trasy Edge, które ustawiają ciasteczka, bo wartość może wyciec przez nagłówek x-middleware-set-cookie, oraz przejrzeć przekazywanie odpowiedzi, jeśli hostujesz samodzielnie za proxy HTTP/1.1 z pipeliningiem.

W tym samym wydaniu wspomniano o Node2Shell, czyli błędzie zdalnego wykonania kodu w dekoderze Brotli. Node.js i Bun wydały osobne poprawki, więc łatka jednego nie chroni drugiego, jeśli dekodujesz niezaufane dane.

**Key takeaways:**
- Aktualizuj do Next.js 16.4.5 albo 15.5.29.
- Przejrzyj własne użycie unstable_cache i use cache z parametrami korzenia.
- Sprawdź cookies w trasach Edge i konfigurację proxy, jeśli hostujesz sam.
- Node.js i Bun wymagają osobnych łatek na Node2Shell.

**Why do I care:** Cache Components kuszą wydajnością, ale to dokładnie ten rodzaj mechanizmu, w którym błąd w jednym miejscu miesza dane klientów. Przy multitenancy w moich projektach dopisałbym testy, które wywołują ten sam cache z dwóch tenantów równolegle. Sama aktualizacja nie wystarczy, bo wzorzec ryzykownego kodu zostaje u Ciebie.

**Link:** [Next.js ships seven fixes and patching is only half the job](https://daily.dev/posts/QmkaHQrhA)
