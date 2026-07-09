---
title: "Praca dla klienta kontra praca nad produktem — dwa światy, jeden zespół"
excerpt: "Luca Rossi opisuje napięcie typowe dla enterprise B2B SaaS: jak pogodzić roadmapę produktową z niespodziewanymi żądaniami klientów."
publishedAt: "2026-07-08"
slug: "customer-work-vs-product-work"
hashtags: "#refactoring #engineering #b2b #saas #productmanagement #generated #pl"
source_pattern: "🌀 Refactoring"
---

## Praca dla klienta kontra praca nad produktem

**TLDR:** W enterprise B2B SaaS każdy duży klient ma dość dźwigni, żeby wymusić pracę na zamówienie. Luca Rossi tłumaczy, dlaczego te dwa rodzaje pracy mają zupełnie inny kształt, i proponuje konkretne podejście do zarządzania nimi bez niszczenia roadmapy.

**Summary:**

Luca zaczyna od fundamentów: budujemy oprogramowanie po to, żeby rozwiązywać problemy klientów, którzy nam za to płacą. Praca, którą wykonujemy, leży na spektrum między pracą w pełni dedykowaną konkretnemu klientowi a pracą nad funkcjami użytecznymi dla wszystkich. Po jednej stronie mamy konsulting, gdzie IP należy do klienta i nic nie jest wielokrotnie używane. Po drugiej stronie mamy klasyczny produkt SaaS, gdzie każda nowa funkcja obsługuje tysiące użytkowników jednocześnie.

Problem zaczyna się wtedy, gdy klientów nie ma tysięcy, ale kilkudziesięciu, i każdy z nich odpowiada za kontrakt wart sto tysięcy dolarów rocznie. Nagle nawet absurdalna prośba takiego klienta wygląda inaczej. Klient ma realną siłę przetargową, a koszt jego pozyskania był wysoki. Luca nazywa to napięciem charakterystycznym dla enterprise B2B SaaS.

Te dwa rodzaje pracy różnią się pod każdym ważnym względem. Praca produktowa jest planowana, przewidywalna, porównywalna w skali, wpisuje się w przyjętą strategię. Praca dla konkretnego klienta spada z zewnątrz, jest pilna, często duża i niezwiązana z bieżącymi planami. Standardowy proces produktowy istnieje właśnie po to, żeby normalizować te czynniki. Praca kliencka je rozbija.

Luca proponuje kilka odpowiedzi na to napięcie. Po pierwsze, zanim w ogóle coś się zrobi na zamówienie, trzeba odpowiedzieć sobie na właściwe pytania: czy ta praca może kiedyś trafić do produktu dla wszystkich, czy to jednorazowy wyjątek? Po drugie, struktura zespołu powinna chronić roadmapę. Dedykowane role, jak solution engineers czy field delivery engineers, przyjmują żądania klientów na siebie, nie angażując przy tym głównych zespołów inżynieryjnych. Po trzecie, platforma technologiczna musi być na tyle dobra, żeby ci solution engineers mogli poruszać się szybko i budować rzeczy blisko kształtu produktu. Po czwarte, należy tworzyć ścieżki do stopniowego wchłaniania pracy klienckiej z powrotem do produktu. Praca kliencka to de facto zwalidowany sygnał produktowy.

To spojrzenie zmienia perspektywę. Praca na zamówienie przestaje być tylko kosztem, a staje się wejściem do systemu, z którego produkt może się uczyć.

**Key takeaways:**
- Praca kliencka i produktowa różnią się kształtem, skalą i pilnością, dlatego te same procesy do obu nie pasują.
- W enterprise B2B SaaS warto tworzyć dedykowane role (solution engineers, FDE) jako bufor między klientami a zespołami produktowymi.
- Praca na zamówienie to potencjalny sygnał produktowy, a nie wyłącznie koszt operacyjny.

**Why do I care:**

Z perspektywy architekta frontendowego pracującego przy platformach B2B, to napięcie między "zrób teraz dla tego klienta" a "zbuduj porządnie dla wszystkich" jest bardzo realne. Widziałem, jak roadmapy rozpadały się pod ciężarem pilnych customizacji, bo nie było żadnej struktury, która by to absorbowała. Podejście Luci do wydzielenia roli solution engineera i traktowania pracy klienckiej jako wejścia do produktu jest sensowne, bo nie udaje, że problem nie istnieje. Zamiast tego projektuje system, który z tym problemem żyje.

**Link:** [🏢 Customer work vs product work](https://refactoring.fm/p/customer-work-vs-product-work)
