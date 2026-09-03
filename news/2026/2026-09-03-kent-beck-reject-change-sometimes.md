---
title: "Odrzucaj zmianę, czasami"
excerpt: "Kent Beck sięga po Demona Shannona, żeby pokazać, kiedy warto grać agresywnie na zmienności produktu, a kiedy trzeba ją systematycznie równoważyć, w zależności od tego, czy jesteś w fazie Explore, Extract czy Expand."
publishedAt: "2026-09-02"
slug: "kent-beck-reject-change-sometimes"
hashtags: "#kentbeck #product #strategy #engineering #generated #pl"
source_pattern: "Kent Beck"
---

## Odrzucaj zmianę, czasami

**TLDR:** Kent Beck wykorzystuje myślowy eksperyment znany jako Demon Shannona, monetę, która podwaja albo zmniejsza o połowę twoją stawkę, żeby pokazać, że strategia ciągłego rebalansowania między bezpieczną skrzynką a ryzykowną grą bije zarówno czystą ostrożność, jak i czysty hazard. Potem przekłada tę intuicję na trzy tryby rozwoju produktu: Explore, Extract i Expand.

**Summary:** Punktem wyjścia jest starożytna giełda, na której każdy trader ma dwie opcje: skrzynkę na monety, która nic nie zmienia, oraz rzucającą monetą maszynę, która podwaja albo zmniejsza o połowę wrzuconą stawkę. Prudence ignoruje maszynę i cały dzień czyta gazety, kończąc dokładnie z tym, z czym zaczęła. Reckless stawia wszystko na maszynę, a jego stos monet rośnie i maleje jak jojo, mimo że jojo jeszcze wtedy nie istniało. SD, siedzący pomiędzy nimi, po każdym rzucie przekłada połowę monet z powrotem do skrzynki. Po jakimś czasie okazuje się, że to właśnie SD systematycznie zyskuje, mimo identycznych dostępnych inwestycji.

Beck krok po kroku pokazuje matematykę tego zjawiska na sekwencji wygrana-przegrana. Reckless kończy dokładnie tam, gdzie zaczął, niezależnie od kolejności wyniku, bo 100 razy 2 podzielone przez 2 to zawsze 100. SD natomiast "bankuje" część wygranej po dobrym dniu, więc kolejna strata jest mniejsza niż u Reckless, co przy stu monetach wstawki daje SD wynik 112,5 zamiast powrotu do punktu wyjścia. To jest właśnie mechanizm Demona Shannona: rezygnujesz z części górnej granicy zysku, żeby uniknąć pełnej skali straty, i w długim terminie zazwyczaj wygrywasz.

Najciekawszy zwrot następuje, gdy Beck zmienia wypłatę maszyny na potrójną przy wygranej i tylko jedną trzecią straty przy przegranej. Przy takim układzie sekwencja wygrana-przegrana przestaje być neutralna, tylko zaczyna faworyzować pełne postawienie wszystkiego na maszynę, bo potencjalny zysk jest na tyle duży, że nawet uwzględniając ryzyko, gra ma sens tylko wtedy, gdy grasz nią agresywnie. To odpowiada fazie Explore w rozwoju produktu, gdzie nie liczy się klasyczne ROI, tylko pytanie, jak rozegrać daną szansę.

Ostatnia faza, Expand, jest najbardziej złożona, bo dodaje trzeci wynik obok wygranej i przegranej: przejście do trybu Extract. W tej fazie wartość tworzy się nie przez maksymalizację zysku ani minimalizację straty, tylko przez inwestycję inżynieryjną i operacyjną redukującą prawdopodobieństwo "śmierci", czyli utraty wszystkiego, co unieważnia wszystkie przyszłe zyski. Praktycznie oznacza to strojenie wydajności, zabezpieczanie przyszłych zasobów albo poprawę procedur backupu i odzyskiwania, wszystko po to, żeby przetrwać kolejne wąskie gardło wzrostu, zanim dane pozwolą precyzyjnie dostroić strategię à la Demon Shannona.

**Key takeaways:**
- Demon Shannona pokazuje, że systematyczne rebalansowanie między bezpiecznym aktywem a ryzykowną grą bije zarówno czystą ostrożność, jak i czysty hazard, przy identycznych dostępnych opcjach.
- Faza Explore w produkcie odpowiada agresywnej grze typu Reckless, kiedy potencjalna wypłata jest na tyle asymetryczna, że warto postawić wszystko.
- Faza Extract odpowiada strategii Demona Shannona: chronisz strumień przychodu, podejmujesz część ryzyka wzrostowego i utrzymujesz zmiany odwracalne.

**Why do I care:** Ten model daje słownictwo do rozmowy, którą architekci prowadzą intuicyjnie, ale rzadko nazywają wprost: nie każdy etap produktu wymaga tej samej tolerancji na zmianę. Zespół w fazie Extract, który wprowadza nieodwracalne, ryzykowne przebudowy architektury tylko dlatego, że "trzeba iść z duchem czasu", popełnia dokładnie ten sam błąd co Reckless próbujący grać jak Prudence. Warto najpierw ustalić, w której fazie faktycznie jest produkt, zanim zdecyduje się, ile zmienności technicznej jest uzasadnione.

**Link:** [Reject Change, Sometimes](https://newsletter.kentbeck.com/p/reject-change-sometimes)
