---
title: "Agent do szukania klientów w ofertach pracy w Claude Project"
excerpt: "Poradnik budowy agenta, który czyta oferty pracy, wybiera firmy potrzebujące twojej usługi i zapisuje szkice wiadomości w Gmailu."
publishedAt: "2026-11-24"
slug: "ai-break-agent-ofert-pracy-claude-project"
hashtags: "#theaibreak #ai #agents #workflow #productivity #generated #pl"
source_pattern: "The AI Break"
---

## Agent, który znajduje kupujących w ofertach pracy

**TLDR:** Tutorial pokazuje, jak w Claude Project zbudować agenta czytającego oferty pracy i wyszukującego firmy, którym przydałaby się twoja usługa. Całość to trzy pliki wklejone w instrukcje i cztery zaplanowane zadania.

**Summary:** Punkt wyjścia jest prosty. Firma, która publikuje ofertę pracy, mówi całemu światu, czego potrzebuje właśnie teraz, a prawie nikt, kto coś sprzedaje, tych ofert nie czyta. Agent z poradnika czyta alerty z LinkedIn lub Indeed oraz wyniki wyszukiwania w sieci, szuka ogłoszeń wskazujących na potrzebę, którą zaspokajasz, na przykład księgowego w małej klinice, ustala, do kogo napisać, i przygotowuje krótką notkę nawiązującą do ogłoszenia.

Wymagania są skromne: aplikacja desktopowa Claude z projektami i zadaniami cyklicznymi, konto Gmail na alerty i szkice oraz darmowe alerty z serwisów pracy. Co godzinę agent oddaje krótki raport z podziałem na trzy stosy. Pierwszy to oferty, które spełniają wszystkie cztery warunki i mają znany kontakt, wraz ze szkicem wiadomości. Drugi to rzeczy do sprawdzenia ręcznie, na przykład gdy ogłoszenia nie dało się otworzyć. Trzeci to odrzucone z jednozdaniowym powodem.

Najciekawsza jest konstrukcja zasad. Oferta musi być na liście sygnałów, firma pasować do idealnego klienta, być świeża i pochodzić od prawdziwego pracodawcy, nie rekrutera, który ukrywa nazwę. O tym, do kogo pisać, decyduje wielkość firmy: w małej do założyciela, w średniej do szefa zespołu, a duże odpadają. Adres e-mail wolno brać tylko z publicznych stron firmy, nigdy ten do aplikowania. Notka ma mieć mniej niż sto słów, pomagać w rekrutacji, a nie przeciw niej, i zawierać tylko prawdziwe fakty. Brakujące dane agent oznacza jako pytanie do ciebie. Agent niczego nie wysyła, tylko zapisuje szkice.

Autor nie pyta, co z etyką i zgodnością takich zimnych wiadomości, na przykład z przepisami o marketingu bezpośrednim, ani jak często agent pomyli się w ocenie, kto jest w firmie decydentem.

**Key takeaways:**
- Oferta pracy jest jawnym sygnałem potrzeby firmy.
- Agent dzieli wyniki na trzy stosy i zawsze mówi, czego jest najmniej pewien.
- Szkice trafiają do Gmaila, wysyłka zostaje po stronie człowieka.
- Zasady kontaktu zależą od wielkości firmy.

**Why do I care:** To raczej historia dla sprzedaży i freelancerów niż dla architektów, ale wzorzec jest przenośny: krótkie, jawne reguły, trzy kategorie wyników i zakaz wysyłania bez człowieka. Taki sam szkielet sprawdza się w agentach do triage'u zgłoszeń czy code review.

**Link:** [Tutorial: Build an AI Agent That Finds Buyers in Job Posts All Day](https://theaibreak.com)
