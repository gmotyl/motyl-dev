---
title: "HackerNoon: odpowiedzialność za agenta AI, retries w CI i backup w jednym miejscu"
excerpt: "Przegląd HackerNoon: kto odpowiada za przestępstwo agenta, jak retries w CI ukryły wyciek pamięci i dlaczego host z rejestratorem to pojedynczy punkt awarii."
publishedAt: "2026-11-17"
slug: "hackernoon-odpowiedzialnosc-agenta-retries-ci-backupy"
hashtags: "#hackernoon #security #ai #agents #cicd #devops #testing #generated #pl"
source_pattern: "HackerNoon"
---

## Kto idzie do więzienia, gdy agent AI popełni przestępstwo

**TLDR:** Krótki tekst o amerykańskim prawie dotyczącym odpowiedzialności, gdy agent AI włamie się do systemu bez zgody. Newsletter dołącza dwa inżynierskie teksty o CI i backupach.

**Summary:** Autor przegląda, kto ponosi odpowiedzialność karną, gdy agent hakuje cudzy system, omawiając amerykańskie przepisy, prawdziwe incydenty i projekty ustaw. Z samej zajawki widać, że to trzyminutowy przegląd, a nie głęboka analiza, więc traktuję go jako sygnał tematu. Pytanie jest realne, bo w tym samym dniu inny newsletter opisuje narzędzie ARTEX, w którym agenci automatyzują włamania.

Drugi tekst opowiada, jak ustawienie ponawiania testów na trzy próby w konfiguracji CI ukryło wyciek pamięci na cztery miesiące. Zielone buildy maskowały prawdziwy błąd, a zespół zaczął śledzić odsetek testów przechodzących za pierwszym razem. To prosta, ale wartościowa metryka.

Trzeci tekst dotyczy dwudniowej awarii, która pokazała, że trzymanie hostingu i domeny u jednego dostawcy to pojedynczy punkt awarii. Nawet świeży backup nie pomaga, gdy nie możesz zmienić rekordów DNS. Autor proponuje schemat 3-2-1-1-0 z blokadą obiektów w S3. W zestawieniu są też teksty o zgodnej z HIPAA i GDPR inferencji na własnych modelach oraz o migracji Sprig z Postgresa, ClickHouse i Redisa na ScyllaDB z 4-8 razy lepszymi opóźnieniami, to ostatnie jest wpisem promowanym.

**Key takeaways:**
- Odpowiedzialność za działania agentów nadal jest niejasna prawnie.
- Automatyczne ponawianie testów ukrywa realne błędy.
- Host i rejestrator domeny u jednego dostawcy to jeden punkt awarii.
- Backup powinien mieć kopię niemodyfikowalną.

**Why do I care:** Najbardziej praktyczny jest tekst o retries: śledźcie first-attempt pass rate, bo flaky testy to dług, który rośnie po cichu. Tekst o odpowiedzialności agentów traktuję ostrożnie, bo opisuje tylko prawo USA. Wpisy sponsorowane trzeba czytać z dystansem.

**Link:** [How retries: 3 in Our CI Config Hid a Memory Leak for Four Months](https://hackernoon.com)
