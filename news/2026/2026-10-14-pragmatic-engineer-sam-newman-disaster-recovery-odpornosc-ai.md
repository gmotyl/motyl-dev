---
title: "Pragmatic Engineer: fragmenty książki Sama Newmana o disaster recovery i odporności systemów z AI"
excerpt: "Fragmenty z książki Building Resilient Distributed Systems o RPO, RTO, wzorcach DR i niepewności modeli."
publishedAt: "2026-10-14"
slug: "pragmatic-engineer-sam-newman-disaster-recovery-odpornosc-ai"
hashtags: "#pragmaticengineer #architecture #devops #observability #ai #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Disaster recovery i odporność systemów z AI według Sama Newmana

**TLDR:** Gergely Orosz publikuje za zgodą autora fragmenty dwóch rozdziałów książki Sama Newmana. Dotyczą planowania odtwarzania po katastrofie, wzorców DR, dostępności infrastruktury oraz odporności oprogramowania opartego na modelach.

**Summary:** Rozdział o disaster recovery zaczyna się od rozróżnienia awarii pojedynczych instancji od awarii całej lokalizacji: pożaru, powodzi czy błędu infrastruktury chmurowej. Newman używa słowa "site" na region chmury, centrum danych lub lokalizację, żeby wzorce dało się omawiać niezależnie od środowiska.

Podstawą są dwie mierzalne liczby. RPO to maksymalny czas od ostatniej kopii lub synchronizacji, czyli górna granica utraty danych. RTO to akceptowalny czas niedostępności, który obejmuje odzyskanie danych, uruchomienie zasobów i przekierowanie ruchu. Newman podkreśla, że nie da się mieć wszystkiego: im mniejsze wartości, tym większy koszt i złożoność. Omawia cztery wzorce: kopię zapasową z odtworzeniem, pilot light, warm failover i multisite active-active.

Nowość w porównaniu z klasyką to dwa wątki. Pierwszy to niedobory GPU i CPU, przez które nie można zakładać, że zasoby zawsze będą dostępne, więc trzeba znać ograniczenia dostawców i priorytetyzować krytyczne usługi. Drugi to odporność oprogramowania AI: zależność od dostawcy modelu, zmieniające się modele, potrzeba obserwowalności oraz taktyki jak wiele modeli i dostawców, przejrzyste koszty i regularna analiza dostawców.

**Key takeaways:**
- RPO i RTO zamieniają rozmowę o "niezawodności" w konkretne liczby.
- Wybór wzorca DR to kompromis między kosztem a czasem odzyskania.
- Zmiana modelu u dostawcy to nowy rodzaj ryzyka produkcyjnego.

**Why do I care:** Dla architekta frontendu to przypomnienie, że DR dotyczy też warstwy brzegowej i zależności od zewnętrznych API modeli. Autor słusznie wiąże rosnącą liczbę awarii z większą liczbą wdrożeń generowanych przez agentów, ale w wycinku nie widać, jak testować plan DR, a plan nieprzećwiczony jest tylko dokumentem.

**Link:** [Building Resilient Distributed Systems, Sam Newman (Pragmatic Engineer)](https://newsletter.pragmaticengineer.com/p/building-resilient-systems)
