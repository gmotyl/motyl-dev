---
title: "Sam Newman o mikroserwisach jako rozwiązaniu ostatniej szansy i o tym, dlaczego LLM-y nie mają pojęcia o przyczynowości"
excerpt: "Twórca terminu 'mikroserwisy' tłumaczy, czemu traktuje je jako architekturę ostatniego wyboru, i dzieli się trzema regułami systemów rozproszonych oraz ostrzeżeniem przed poddaniem się AI."
publishedAt: "2026-10-08"
slug: "sam-newman-mikroserwisy-systemy-rozproszone-ai"
hashtags: "#pragmaticengineer #architecture #microservices #ai #engineering #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Sam Newman: mikroserwisy to architektura ostatniej szansy, a AI nie rozumie przyczynowości

**TLDR:** Sam Newman, autor książki "Building Microservices" i uczestnik spotkania, na którym ukuto tę nazwę, opowiada w podcaście The Pragmatic Engineer o tym, dlaczego uważa mikroserwisy za rozwiązanie ostatniego wyboru, a nie domyślny wybór architektoniczny. Przy okazji promocji nowej książki "Building Resilient Distributed Systems" tłumaczy trzy reguły systemów rozproszonych, cztery filary odporności i ostrzega, że wielu inżynierów poddaje AI zbyt wiele krytycznego myślenia.

**Summary:** Termin "mikroserwisy" powstał w 2011 roku na sympozjum architektonicznym w Lake District, kiedy James Lewis, kolega Newmana z Thoughtworks, zaproponował nazwę "micro apps" dla trendu budowania niezależnie wdrażanych usług. Ktoś inny w tym samym pokoju zasugerował "mikroserwisy", a rok później Lewis i Martin Fowler opisali ten wzorzec w artykule, który Newman rozwinął w książkę. Dziś, po trzynastu latach w Thoughtworks, trzech startupach i piętnastu latach pracy na własny rachunek, Newman definiuje mikroserwis na dwa sposoby. Twarda definicja mówi, że usługa jest mikroserwisem, jeśli można ją wdrożyć niezależnie od innych. Miękka definicja odwołuje się do granic wokół domeny biznesowej, a nie warstwy technicznej.

Najciekawszym fragmentem rozmowy jest uproszczenie ośmiu klasycznych "fallacies of distributed computing" do trzech reguł, które w praktyce odpowiadają za większość awarii. Informacja potrzebuje czasu, żeby dotrzeć z punktu A do punktu B, więc nic nie dzieje się natychmiast. System, z którym chcesz porozmawiać, czasem po prostu nie odpowiada. Zasoby, czyli CPU, pamięć czy przepustowość sieci, w końcu się kończą, i to właśnie trzecia reguła odpowiada w doświadczeniu Newmana za większość awarii systemów rozproszonych. Przy okazji idempotencji Newman opisuje dwa podejścia do tego problemu. Klucze idempotencji wymagają zmian po obu stronach, za to łatwo je czysto zaprojektować od zera. Odciski palca liczone z hashowanych pól serwer może dołożyć bez zmian po stronie klienta, ale ryzykuje odrzucenie poprawnych żądań jako duplikatów, co Newman ilustruje przykładem duńskiego systemu płatności, który blokował powtórne zakupy tej samej kwoty w pięciominutowym oknie.

Cztery filary odporności, które Newman zapożycza z terminologii wojskowej Davida Woodsa, to solidność czyli zdolność systemu do działania mimo awarii, powrót czyli szybkość regeneracji, rozciągliwość czyli radzenie sobie z niespodziankami oraz adaptowalność czyli zmianę systemu, by wspierał nowe funkcje nawet pomiędzy incydentami. Newman zwraca uwagę, że solidność ma swoją cenę: im więcej mechanizmów naprawczych, tym bardziej złożony system, a złożoność sama w sobie tworzy nowe sposoby na awarię.

Druga część rozmowy dotyczy AI, i tu Newman jest zaskakująco bezpośredni. Mówi wprost, że świat technologiczny jest naiwny w kwestii tego, czym naprawdę jest LLM. Model językowy nie ma pojęcia o przyczynowości, nie wie, że zrobienie A spowoduje B, bo nie jest modelem świata, tylko maszyną probabilistyczną przewidującą kolejne tokeny. To dlatego, jego zdaniem, żadne guardraile wokół LLM-ów nie będą długoterminowym rozwiązaniem, bo próbują łatać coś, czego model z definicji nie rozumie. Newman wspomina przy tym, że sam Opus 5.5 sformatował dysk twardy dewelopera, który uruchomił go z flagą pomijającą zabezpieczenia uprawnień, co traktuje jako potwierdzenie swojej tezy, a nie przypadek odosobniony. Przestrzega też przed "poddaniem kognitywnym" wobec AI: obietnica, że technologia uwolni nas od żmudnej pracy i da czas na myślenie krytyczne, w praktyce często kończy się dłuższymi godzinami pracy i większym przełączaniem kontekstu, a nie mniejszym.

**Key takeaways:**
- Mikroserwis to usługa, którą można wdrożyć niezależnie od innych, albo usługa podzielona według granic domeny biznesowej, a nie warstwy technicznej.
- Większość awarii systemów rozproszonych bierze się z wyczerpania zasobów, nie z opóźnień sieciowych czy niedostępności usług.
- Wybierając między kluczami idempotencji a odciskami palca żądań, trzeba świadomie zaakceptować kompromis między łatwością retrofitu a ryzykiem fałszywych duplikatów.
- LLM-y nie mają modelu przyczynowości, więc guardraile wokół nich leczą objawy, a nie przyczynę problemu.
- Warto zaczynać projektowanie systemu od granic modułów i pozwalać AI działać swobodnie, ale tylko wewnątrz tych granic.

**Why do I care:** Jako architekt frontendowy czy fullstackowy nie projektujesz na co dzień rozproszonych systemów bankowych, ale reguła "zasoby się kończą" dotyczy równie dobrze connection poola w Twoim backendzie dla frontendu, jak i limitu requestów do zewnętrznego API z poziomu przeglądarki. Ciekawsza jest jednak ta część o AI: jeśli w zespole normalizujecie branie sugestii agenta kodującego bez zastanowienia, bo "przecież to oszczędza czas", to właśnie ten typ poddania kognitywnego, przed którym ostrzega Newman. Rada, żeby najpierw zaprojektować granice modułów, a dopiero potem pozwolić agentowi działać swobodnie wewnątrz nich, to praktyczna recepta na to, jak w ogóle dać AI pracować nad kodem bez utraty kontroli nad architekturą.

**Link:** [Building resilient systems with Sam Newman](https://newsletter.pragmaticengineer.com/p/building-resilient-systems-with-sam)
