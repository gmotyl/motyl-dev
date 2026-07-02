---
title: "Kiedy Event Sourcing nie jest dobrym pomysłem"
excerpt: "Oskar Dudycz wraca do tematu Event Sourcingu i tym razem mówi wprost, kiedy go nie stosować. To ważniejsza lekcja niż większość poradników o tym, jak go wdrożyć."
publishedAt: '2026-06-29'
slug: kiedy-nie-uzywac-event-sourcing
hashtags:
  - '#ArchitectureWeekly'
  - '#EventSourcing'
  - '#DDD'
  - '#SoftwareArchitecture'
  - '#CQRS'
---

## Kiedy Event Sourcing nie jest dobrym pomysłem

**TLDR:** Oskar Dudycz, znany ze swojego entuzjazmu wobec Event Sourcingu, przyznaje tym razem, że przez lata równie często odwodził zespoły od jego wdrożenia, co namawiał do niego. Artykuł pokazuje konkretne sytuacje, w których Event Sourcing dodaje złożoność bez żadnej wartości biznesowej. Najważniejsza myśl: to decyzja na poziomie modułu, nie całego systemu.

Oskar pisze ten artykuł z wakacji, wyraźnie odpoczęty, i może właśnie dlatego wychodzi mu coś rzadkiego w technicznym świecie blogowym, szczerość. Zamiast kolejnego posta o tym, jak pięknie Event Sourcing sprawdza się w systemach finansowych albo przy modelowaniu agregatów DDD, dostajemy refleksję konsultanta, który równie często go odradzał. To mnie uderza, bo ta perspektywa jest w literaturze zdecydowanie niedoreprezentowana. Łatwiej pisać o wzorcu, gdy wszystko gra, trudniej gdy trzeba tłumaczyć klientowi, że to zły pomysł.

Podstawowy argument Oskara jest prosty, choć wymaga chwili zastanowienia: Event Sourcing ma sens tam, gdzie biznes naturalnie myśli zdarzeniami. Tam, gdzie można przeprowadzić Event Storming i wyjść z sensownymi "OrderPlaced", "PaymentProcessed" czy "InvoiceIssued", tam wzorzec pracuje razem z domeną, a nie przeciwko niej. Problem pojawia się, gdy próbujemy go nałożyć na systemy zasadniczo CRUD-owe, na przykład CMS, zarządzanie użytkownikami albo prosty panel konfiguracyjny. W takim kontekście zamiast naturalnych zdarzeń biznesowych dostajemy sztuczne "UserUpdated" czy "ConfigChanged", które nic nie mówią i nic nie wnoszą. Mam tu pewne zastrzeżenia wobec czystości tego podziału w praktyce, bo granica między "systemem CRUD" a "systemem z logiką biznesową" bywa rozmyta, ale co do zasady Oskar ma rację.

Ciekawa jest uwaga o kosztach po stronie zespołu. Event Sourcing wymaga zrozumienia bounded contexts, agregatów i zdarzeń domenowych, a to jest wiedza, która nie przychodzi za darmo. Bez solidnych podstaw DDD zespoły wpadają w pułapki, z których trudno wyjść, a naprawy są kosztowne, bo historii zdarzeń nie można po prostu "zmigować" tak jak schematu relacyjnej bazy. Do tego dochodzi kwestia odczytu: projekcje, eventual consistency i latencja to problemy, które znikają przy prostym SELECT-ie z bazy relacyjnej. Jeśli system wymaga spójności odczytu w czasie rzeczywistym, Event Sourcing z projekcjami to naprawdę zły wybór.

Najważniejszą myśl Oskar zostawia na koniec, a ona jest warta podkreślenia. Event Sourcing to nie architektura systemu, to decyzja na poziomie modułu. Można mieć rdzeń biznesowy oparty na zdarzeniach i EventStoreDB lub Marten, a obok niego moduły wspierające zbudowane tradycyjnie. To nie jest niespójność projektowa, to rozsądek. Wiele dyskusji architektonicznych utyka w pułapce "albo wszystko, albo nic", a Oskar przypomina, że dobre systemy są heterogeniczne. Przekonać do tego zamawiającego bywa trudniej niż do samego Event Sourcingu, ale to już temat na inny artykuł.

**Najważniejsze wnioski:** Event Sourcing sprawdza się tam, gdzie domenę można naturalnie opisać zdarzeniami i gdzie historia operacji ma wartość biznesową, nie tylko techniczną. W systemach CRUD-owych dodaje złożoność bez żadnego zwrotu. Brak doświadczenia z DDD w zespole to sygnał ostrzegawczy, bo podstawowe błędy w modelowaniu agregatów naprawia się z bólem. Wymagania na niską latencję odczytu i spójność natychmiastową są sprzeczne z naturą projekcji. I przede wszystkim: wdrożenie Event Sourcingu w module A nie oznacza, że moduł B też musi go używać. To jest dokładnie taka decyzja, która powinna być podejmowana lokalnie, na podstawie potrzeb konkretnego obszaru, a nie globalnie, na podstawie mody lub spójności stylistycznej całego systemu.

**Link:** [When not to use Event Sourcing?](https://architectureweekly.substack.com)
