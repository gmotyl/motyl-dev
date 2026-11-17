---
title: "Merge do Core to jeszcze nie funkcja"
excerpt: "Zespół Kilo opisuje, jak wypuszcza zmiany przez jednego klienta, wiele razy w tygodniu, i dlaczego merge nie jest metą."
publishedAt: "2026-11-16"
slug: "merge-do-core-to-nie-funkcja"
hashtags: "#kilo #engineering #productivity #workflow #cicd #agents #generated #pl"
source_pattern: "Kilo"
---

## A Core Merge Is Not a Feature

**TLDR:** Kilo wypuszcza klientów kilka razy w tygodniu i zaczyna od jednego klienta, zamiast czekać na gotowość wszystkich. Merge, zamknięty ticket i dobre demo nie oznaczają, że użytkownik coś dostał.

**Summary:** Nikt nie używa Kilo Core bezpośrednio. Ludzie pracują w VS Code, JetBrains, CLI, Agent Managerze albo aplikacji desktopowej, a Core to wspólny kod pod nimi. Autor zaczyna więc od rozróżnienia, że scalenie kodu nie jest dostarczeniem wartości.

Zasady zespołu są proste. Każdy inżynier może wydać wersję, nie ma menedżera wydań ani pociągu, na który trzeba zdążyć. Klienci wychodzą kilka razy w tygodniu. Codziennie wychodziło za często, bo użytkownicy VS Code skarżyli się na powiadomienia o aktualizacjach, więc częstotliwość obniżono. Zachowanie buduje się w Core i wypuszcza przez jednego klienta, a pozostali dołączają później.

Przykład, który działa, to Kilo Swarm, czyli koordynacja agentów przez wspólną tablicę. Karty trafiły do VS Code 2 września, tożsamość agentów w Core 3 września, tablica stała się domyślna 14 września, a JetBrains dołączyło 17 września. Przez prawie dwa tygodnie użytkownicy już korzystali, i znaleziono błędy, na przykład taki, w którym agenci wysyłali wiadomości do siebie samych.

Przykład negatywny to Enhance Prompt. W VS Code pojawił się w marcu 2026, w JetBrains w czerwcu, w Agent Managerze w lipcu, a w aplikacji desktopowej nadal go nie ma. Autor mówi wprost, że to nie była kwestia trudności technicznych, bo funkcja była już w Core. Nikt nie potraktował pozostałych klientów jako jawnej pracy do wykonania. To problem procesu, nie technologii.

W ostatniej części są oczekiwania wobec inżynierów. Buduj wspólne zachowanie w Core, wybierz pierwszego klienta i wypuść go, ustal wprost, kto robi następnych klientów, sam wydaj wersję, jeśli praca jest gotowa, i mierz ukończenie wartością dla klienta. Autor krytykuje też nadużywanie zasady "idź wolno, żeby iść szybko", bo często służy jako wymówka do dalszego planowania.

Czego brakuje? Nie ma słowa o kosztach. Częste wydania wymagają dobrych testów i możliwości szybkiego cofnięcia, a tekst zakłada, że to już jest. Nie wiemy też, ilu użytkowników faktycznie miało dostęp do Swarma przez te dwa tygodnie.

**Key takeaways:**
- Wspólna logika w Core, pierwsza wersja w jednym kliencie.
- Pozostali klienci to jawna, przypisana praca, a nie coś, co zrobi się samo.
- Częstotliwość wydań ma wynikać z tego, co jest przydatne użytkownikom.
- Gotowe jest to, z czego ktoś może skorzystać, a nie to, co zmergowano.

**Why do I care:** Mamy ten sam problem w monorepo z kilkoma aplikacjami na wspólnej bibliotece komponentów. Funkcja trafia do jednej aplikacji, a pozostałe czekają miesiącami, bo nikt tego nie zapisał jako zadania. Prosty remedium to ticket dla każdego klienta w dniu pierwszego wydania.

**Link:** [A Core Merge Is Not a Feature](https://blog.kilo.ai/p/a-core-merge-is-not-a-feature)
