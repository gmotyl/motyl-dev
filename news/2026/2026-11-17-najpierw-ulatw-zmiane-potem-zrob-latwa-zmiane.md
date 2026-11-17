---
title: "Najpierw ułatw zmianę, potem zrób łatwą zmianę"
excerpt: "Oskar Dudycz twierdzi, że problemem nie jest code review, tylko nasz proces dostarczania, i pokazuje, jak stosować radę Kenta Becka z agentami."
publishedAt: "2026-11-16"
slug: "najpierw-ulatw-zmiane-potem-zrob-latwa-zmiane"
hashtags: "#architectureweekly #architecture #refactoring #agents #git #workflow #generated #pl"
source_pattern: "OskarDudycz"
---

## Make the change easy, then make the easy change

**TLDR:** Autor nie zgadza się z tezą, że code review jest wąskim gardłem w erze agentów. Jego zdaniem słabością jest sam proces dostarczania i tym bardziej potrzebujemy małych, bezpiecznych zmian.

**Summary:** Dudycz zaczyna od cytatu Chestertona o płocie na drodze. Zanim coś usuniesz, zrozum, po co to tam stoi. Code review porównuje do termometru, który chcemy rozbić, bo pokazuje gorączkę. Przekonanie, że recenzje spowalniają, a po nich trzeba dostroić uprzęże agentów, uważa za próbę powrotu do pisania kodu zamiast do rzeczy, które się liczą. Jego zdaniem źle stawiamy pytanie. Chodzi nie o recenzje albo ich brak, tylko o to, że branża nigdy nie miała porządnego standardowego procesu dostarczania i teraz próbujemy przyspieszyć zły proces.

Opisuje typowe zespoły, w których nie ma dostępu do konfiguracji pipeline'ów, ludzie nie znają własnego procesu, drobne zmiany procesu wymagają zgody architekta, branże żyją długo, nikt nie umie zrobić rebase, a współpraca to długie spotkania, czaty i maile. Przywołuje radę Kenta Becka, żeby dla każdej zmiany najpierw ją ułatwić, co może być trudne, a potem wykonać łatwą zmianę.

Konkrety są dobre. Dla nowej funkcji zacznij od kilku linii kodu i testów, nie podpinaj ich nigdzie i zmerguj, jeśli przechodzą linter, build i pokrycie. Niepodpięty kod nie może niczego zepsuć, więc nie potrzebujesz skomplikowanych feature flag. Potem dodaj prosty przyrost, który coś daje, a jeśli się nie da, ukryj funkcję za konfiguracją i włączaj ją dla zaufanych klientów. Wspólna praca z agentem na wezwaniu to w jego ujęciu rodzaj code review, ale z małymi porcjami zamiast 20 tysięcy linii naraz.

Przy zmianach w istniejących funkcjach oddziel mechaniczne przygotowanie od właściwej zmiany. Autor opisuje analizę statyczną problemów z współbieżnością w dużej bazie kodu. Najpierw włączył ją jako ostrzeżenia, potem osobno naprawił oczywiste rzeczy, jak poprawne async/await i przekazywanie CancellationToken w .NET, a trudniejsze przypadki zostawił na kolejne zmiany. Zmian było więcej, ale każda łatwiej przechodziła przegląd. Czasem warto też owinąć istniejący przepływ w abstrakcję i trochę zduplikować kod, żeby uruchomić na nowym kodzie stare testy.

Wniosek jest taki, że agenci sprawiają, że przygotowawcze, żmudne kroki stają się tanie, ale tylko jeśli o nie poprosimy. Inaczej dostaniemy 20 tysięcy linii o mieszanej jakości, a recenzje staną się nie do zniesienia. Odpowiedź nie leży w szybszych recenzjach ani w ich porzuceniu.

Czego autor unika? Nie mówi, co zrobić w zespole, który nie ma zaufania ani wpływu na własny proces. Przyznaje, że bez zaufania są większe problemy, ale tu właśnie leży większość realnych przypadków.

**Key takeaways:**
- Code review nie jest problemem, problemem jest proces dostarczania.
- Zmerguj niepodpięty kod, który przechodzi podstawowe kontrole, zamiast trzymać długą gałąź.
- Oddzielaj mechaniczne przygotowanie od właściwej zmiany.
- Małe porcje pracy z agentem można traktować jako recenzję na żywo.

**Why do I care:** Dla frontendu to jest bardzo praktyczne. Przeniesienie komponentu na nowe API bez zmiany zachowania, a potem osobny PR ze zmianą, to coś, co robię od lat, i agenci to przyspieszają. Argument przeciw dużym PR-om od agentów jest też argumentem dla reguły, że jeden PR zawiera jedną decyzję.

**Link:** [Make the change easy, then make the easy change](https://www.architecture-weekly.com/p/make-the-change-easy-then-make-the)
