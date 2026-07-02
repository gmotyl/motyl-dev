---
title: "Autoresearch: pętla zwrotna za samoudoskonalającymi się agentami"
excerpt: "Roland Gavrilescu z Introspection wyjaśnia, jak budować zewnętrzne pętle (outer loops), w których agenty AI pomagają utrzymywać i ulepszać samych siebie, wprowadzając koncepcje agent recipes i autoresearch w środowiskach produkcyjnych."
publishedAt: "2026-07-02"
slug: "autoresearch-petla-zwrotna-samoudoskonalajace-sie-agenty"
hashtags: "#ai #llm #agents #engineering #autoresearch #agentrecipes #softwarefactory #introspection #generated #pl"
source_pattern: "AINews"
---

## Autoresearch: pętla zwrotna za samoudoskonalającymi się agentami

**TLDR:** Roland Gavrilescu, współzałożyciel startupu Introspection, przedstawia koncepcję autoresearch na AI Engineer World's Fair. Chodzi o budowanie zewnętrznej pętli, gdzie agenty AI pomagają utrzymywać i ulepszać sam system główny przy użyciu sygnałów zwrotnych, ewaluacji i ludzkiego wkładu. To kolejny krok po erze modeli i harnessy agentowych.

**Summary:**

Przez ostatnie lata w świecie AI mówiliśmy o modelach, potem o harnesach agentowych, a teraz przyszedł czas na loops, czyli pętle. Roland Gavrilescu, który wcześniej pracował nad infrastrukturą agentową w xAI, gdzie poznał swojego współzałożyciela Juliana Brighta, postanowił skupić się na tym, co jego zdaniem stanowi nowy format agentów. Tak powstała firma Introspection, budująca infrastrukturę do wdrażania samoudoskonalających się systemów.

Kluczowy pomysł jest prosty do opisania, ale trudny do zrealizowania w praktyce: zamiast ręcznie poprawiać agenta po każdej iteracji, budujesz zewnętrzną pętlę, która robi to za ciebie. Mamy więc dwa poziomy. Wewnętrzna pętla (inner loop) to system, który faktycznie wykonuje pracę i wchodzi w interakcję z użytkownikami. Zewnętrzna pętla (outer loop) obserwuje tę wewnętrzną, analizuje jej błędy, zbiera sygnały i stopniowo ulepsza cały mechanizm. To właśnie jest autoresearch.

Gavrilescu proponuje trzy wzorce, które jego zdaniem tworzą nową architekturę dla takich systemów. Po pierwsze: pętla jest produktem. Nie model, nie harness, ale właśnie pętla z właściwie zaprojektowanymi mechanizmami zwrotnymi. Po drugie: agenty muszą coś produkować i musi być sposób na śledzenie tego w czasie. Stąd pomysł na agent recipe, czyli przepis agentowy. Po trzecie: system musi stawać się coraz lepszy i coraz tańszy, stopniowo dystylując możliwości wielkich modeli frontierowych do systemów, które firma kontroluje i dostosowuje pod swoje potrzeby.

Koncepcja agent recipe jest bodaj najciekawszym elementem tego podejścia. Przepis to coś w rodzaju żywej dokumentacji procesu doskonalenia agenta. Opisuje, jak harness współpracuje z różnymi modelami, jakich ewaluacji się używa, jakich sędziów (judges) się powołało, jaką wiedzę ekspercką przechwycono od ludzi i jakie błędy zainspirowały kolejne ewaluacje. Gavrilescu porównuje to do tego, jakbyś nagle dostał dostęp do kodu Devina, ale bez historii decyzji, porażek i iteracji, które doprowadziły do obecnego kształtu systemu. Kod bez kontekstu ma ograniczoną wartość. Przepis ten kontekst przechwytuje.

Framework Pi jest w tej architekturze odpowiednikiem Linuksa dla harnesów agentowych. Podobnie jak Linux nie jest przeznaczony do działania w waniliowej formie, Pi oddziela pętlę agentową od jej rozszerzeń i konfiguracji, co sprawia, że agenty są przenośne. Możesz uruchomić kilku różnych agentów, ładując różne pliki do runtime'u. Introspection widzi siebie w roli czegoś na kształt Red Hat, łącząc tę rozszerzalność z przepisami i otwartymi komponentami.

**Key takeaways:**
- Autoresearch to zewnętrzna pętla (outer loop), która utrzymuje i ulepsza wewnętrzną pętlę (inner loop) systemu agentowego
- Agent recipe to przenośny format opisujący historię doskonalenia agenta: harness, ewaluacje, judges, wiedzę ekspercką i popełnione błędy
- Pi to framework agentowy na wzór Linuksa: modularny, rozszerzalny, przenośny
- Człowiek pozostaje częścią systemu, zwłaszcza na początku, kiedy agent zbiera wiedzę tacit knowledge od ludzi przez narzędzie "ask a human"
- Droga do fabryki oprogramowania (software factory) wiedzie przez orkiestrę z ludzkim dyrygentem, a nie przez próbę natychmiastowej pełnej autonomii
- Dla inżynierów chcących zacząć z autoresearch: najpierw zainwestuj w sygnały, potem zadbaj o kontrolę kosztów, na końcu śledź badania

**Why do I care:**

Z perspektywy architekta frontendowego i generalnie kogoś, kto buduje produkty inżynierskie, ta rozmowa dotyka czegoś, co widzę na własne oczy: agenty zaczynają działać naprawdę, ale ich utrzymanie w dobrej formie to oddzielny i trudny problem. Idea, że sam agent może pomagać utrzymywać system, który go napędza, jest atrakcyjna, ale wymaga zaakceptowania sporego poziomu złożoności. Agent recipes to szczególnie interesująca propozycja, bo rozwiązuje problem, który znam z codziennej pracy: jak przekazać komuś kontekst historycznych decyzji bez sadzania go na tygodniowy onboarding. Jeśli da się zautomatyzować przechwytywanie tej wiedzy, mamy naprawdę coś wartościowego. Warto też zwrócić uwagę na nastawienie Gavrilescu do autonomii: nie buduj fabryki od razu, zacznij od orkiestry. To zdroworozsądkowe podejście, które widzę zbyt rzadko w hype'ie wokół agentów.

**Link:** [Autoresearch: The feedback loop behind self-improving agents](https://www.latent.space/p/autoresearch-introspection?publication_id=1084089&post_id=204548385&isFreemail=true&triedRedirect=true)
