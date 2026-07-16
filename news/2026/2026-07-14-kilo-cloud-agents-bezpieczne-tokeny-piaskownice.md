---
title: "Kilo Cloud Agents: jak bezpiecznie zarządzać tokenami w środowiskach piaskownic"
excerpt: "Kilo opisuje architekturę obsługi tokenów w Cloud Agents, która zapobiega wyciekom credentiali przez zastosowanie krótkoterminowych tokenów zdolnościowych i przechwytywania ruchu wychodzącego."
publishedAt: "2026-07-13"
slug: "kilo-cloud-agents-bezpieczne-tokeny-piaskownice"
hashtags: "#kilo #security #agents #cloud #sandbox #generated #pl"
source_pattern: "Kilo"
---

## Kilo Cloud Agents: tokeny poza zasięgiem piaskownicy

**TLDR:** Kilo Cloud Agents działają teraz z architekturą, w której prawdziwe tokeny GitHub i Kilo nigdy nie trafiają do kontenera z kodem agenta. Zamiast tego stosowane są krótkoterminowe tokeny zdolnościowe przechwytywane i walidowane przez warstwę pośrednią, zanim dotrą do zewnętrznych API.

Większość dostawców środowisk sandbox skupia się na izolacji kontenerów i to rzeczywiście ważne. Jednak izolacja odpowiada tylko na pytanie "czy coś może uciec z pudełka", nie zaś na pytanie, które tak naprawdę ma znaczenie: co się stanie, gdy agent uruchamiający arbitralny kod dostanie w swoje ręce token GitHub z szerokim zakresem uprawnień?

Kilo wskazuje na konkretny problem: token stworzony "do odczytu repozytorium i otwarcia PR" często posiada znacznie szersze uprawnienia. Jeśli taki token trafi do zmiennych środowiskowych kontenera lub na jego filesystem, to jeden błąd, jeden prompt injection lub jedna złośliwa zależność wystarczy, żeby wyciekł na zewnątrz. Klasyczne kontenery efemeryczne nie rozwiązują tego problemu, bo go w ogóle nie adresują na tym poziomie.

Rozwiązanie, które opisuje Kilo, opiera się na architekturze pośredniej warstwy credentiali. Prawdziwe tokeny GitHub i Kilo nigdy nie trafiają do piaskownicy. Na ich miejsce tworzony jest krótkoterminowy token zdolnościowy specyficzny dla danego sandboxa. Wygląda jak credential dla agenta, ale nie można z niego odtworzyć oryginalnego tokenu i działa wyłącznie w kontekście konkretnego kontenera.

Cały ruch wychodzący z sandboxa jest przechwytywany przez warstwę zbudowaną na Cloudflare. Każde żądanie przechodzi przez trzy walidacje: czy token pochodzi od Kilo (jest szyfrowanym blobem, więc fałszywe nie zdekodują się poprawnie), czy żądanie trafia w dozwolone miejsce (tokeny GitHub mogą kontaktować się tylko z API GitHub, tokeny Kilo tylko z API Kilo, wszystko inne jest blokowane), czy token pochodzi z sandboxa, do którego był przypisany (każdy token jest powiązany z jednym konkretnym kontenerem).

Dopiero po przejściu wszystkich trzech sprawdzeń następuje podmiana tokenu zdolnościowego na prawdziwy token na czas jednego żądania. Prawdziwy token pozostaje w control plane przez cały czas, nigdy nie ląduje w zmiennych środowiskowych, nie jest zapisywany na dysku i nie pojawia się w logach dostępnych dla agenta.

**Key takeaways:**
- Prawdziwe tokeny GitHub i Kilo nigdy nie dotykają piaskownicy z kodem agenta
- Każde żądanie wychodzące jest walidowane przez trzy warunki przed przekazaniem do docelowego API
- Token zdolnościowy jest powiązany z konkretnym kontenerem i ma ograniczony czas życia
- Architektura buduje bezpieczeństwo wokół obsługi credentiali, nie tylko wokół izolacji kontenera
- GitLab ma być obsługiwany jako kolejny dostawca na tej samej architekturze

**Why do I care:** Z perspektywy architekta pracującego z agentami AI to podejście rozwiązuje problem, który większość implementacji zamiatała pod dywan. W momencie gdy dajemy agentowi dostęp do repozytoriów i automatyzujemy operacje na kodzie, zakres uprawnień tokenów staje się realnym wektorem ataku, szczególnie przy prompt injection. Architektura z tokenami zdolnościowymi i przechwytywaniem ruchu to wzorzec, który ma sens i warto go obserwować jako potencjalny standard w toolingu agentowym. Nie każdy będzie budował własną kontrolę płaszczyzny, ale świadomość, że "izolowany kontener" nie wystarczy do bezpiecznego przekazywania credentiali agentom, to coś, co powinno być standardem przy projektowaniu takich systemów.

**Link:** [Kilo Cloud Agents: We Took the Keys Out of the Box](https://blog.kilo.ai/p/keys?publication_id=4363009&post_id=206895837&isFreemail=true&triedRedirect=true)
