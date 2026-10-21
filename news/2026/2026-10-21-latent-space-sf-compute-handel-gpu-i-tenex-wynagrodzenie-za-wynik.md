---
title: "Latent.Space: SF Compute i rynek mocy GPU oraz Tenex płacący inżynierom za wynik"
excerpt: "Dwa odcinki z AI Engineer NYC: fizyczne rozliczanie kontraktów na GPU i organizacja inżynierska, w której agenci zmieniają to, za co się płaci."
publishedAt: "2026-10-21"
slug: "latent-space-sf-compute-handel-gpu-i-tenex-wynagrodzenie-za-wynik"
hashtags: "#latent-space #ai #infrastructure #gpu #agents #engineering #generated #pl"
source_pattern: "Latent.Space"
---

## SF Compute: jak dostarczyć kontrakt na GPU

**TLDR:** Evan Conrad opowiada, że obrót mocą obliczeniową wymaga fizycznego rozliczenia, czyli prowadzenia całego "hotelu", a nie tylko wynajmu pokoju.

**Summary:** SF Compute zaczęło od podnajmu własnego klastra. Kolejne prośby klientów, jak sprzątanie, obsługa pokoju i ochrona, wymusiły budowę zdolności zbliżonych do chmury, by dostarczać moc handlowaną na rynku. Rozliczenie jest fizyczne: kupujący dostaje używalną moc, a nie tylko płatność względem indeksu. To wprowadza do rynku ograniczenia klastra: czy zadanie można przerwać, jak szybko odtwarza się z magazynu, jaką generację GPU, sieć i oprogramowanie wymaga.

Zamiast czekać, aż klastry staną się wymienne, firma dopasowuje zlecenia o różnych ograniczeniach, co rozprasza płynność na więcej wariantów. Rozmowa dotyczy też cen spot i terminowych, wnioskowania wsadowego i na żywo oraz tego, jak indeks może oderwać się od kosztu faktycznego zakupu. Conrad przekonuje, że operator rynku musi być niezależny, bo firmy z dużym biznesem sprzętowym lub inferencyjnym mają sprzeczne motywacje. Jako przykład inżynierii podaje podział sieci InfiniBand w locie. To rozmowa z szefem firmy, więc deklaracje o płynności są jego perspektywą.

**Key takeaways:**
- Dostarczenie kontraktu wymaga operowania infrastrukturą, nie tylko pośrednictwa.
- Płynność rozprasza się na warianty o różnych ograniczeniach.
- Niezależność operatora jest argumentem za osobnym rynkiem.

**Why do I care:** To raczej temat dla infrastruktury i budżetu niż frontendu, ale pokazuje, że cena GPU zależy od przerywalności i odtwarzania, co wpływa na to, jak projektujesz zadania wsadowe.

**Link:** [SF Compute: making compute tradeable](https://www.latent.space/p/sfcompute2)

## Tenex: płacenie inżynierom za wynik, gdy praca się zmienia

**TLDR:** Alex Lieberman i CJ Hess opisują, jak firma płacąca za dostarczoną pracę skaluje to do organizacji i co z pracą, której nie da się zapisać w zgłoszeniu.

**Summary:** Tenex nadal używa punktów historyjek jako ważnej części wynagrodzenia. Obawy o zawyżanie szacunków okazały się mniejszym problemem niż trudność nagradzania pracy poza zgłoszeniami: zrozumienia problemu klienta, projektu architektury i decyzji, co w ogóle budować. Firma ma 75 osób i klientów z Fortune 2000 oraz średniego rynku. CJ opisuje MetaHarness, czyli wspólny zestaw umiejętności, dokumentów projektu i CLI, w którym plany i decyzje są w Git obok kodu, więc agent wracający do zadania widzi, dlaczego coś zbudowano. Tenex sam zauważa, że taka struktura bywa przesadą dla małego zespołu.

Druga część to eksperyment Kill My SaaS: 72 zgłoszenia zastąpienia narzędzia do zarządzania prelegentami wycenionego na 43 tysiące dolarów rocznie. Zwycięzca według ludzkich sędziów zajął 19. miejsce w rankingu sędziego AI, co pokazuje różnicę między spełnieniem listy scenariuszy a oceną, czy ludzie chcą tego używać. Alex odpowiada, że im wyżej na rynku, tym ryzykowniej wymieniać system, a każde własne narzędzie trzeba utrzymywać. Jest też spór o AI branżowe: Alex jest sceptyczny wobec rozwiązań pionowych, a gospodarz wskazuje Harvey i OpenEvidence.

**Key takeaways:**
- Praca poza zgłoszeniami jest najtrudniejsza do wynagrodzenia.
- Plany i decyzje w repozytorium dają agentom kontekst "dlaczego".
- Ocena AI i ocena ludzi mogą się mocno rozjeżdżać.

**Why do I care:** Pomysł trzymania decyzji w repo obok kodu można wdrożyć od razu i jest tani. Rozmowa nie rozstrzyga, jak mierzyć wartość pracy, która nie kończy się zamkniętym zgłoszeniem.

**Link:** [Tenex: paying engineers for output](https://www.latent.space/p/tenex)
