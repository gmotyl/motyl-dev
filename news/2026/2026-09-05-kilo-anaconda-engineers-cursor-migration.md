---
title: "Co znaleźli inżynierowie Anacondy, kiedy przenieśli się z Cursora do Kilo"
excerpt: "Anaconda przejęła Kilo w lipcu, jeszcze zanim OpenAI publicznie odciął Cursora od swoich modeli. Dwoje inżynierów porównuje, co zmieniło się po migracji: przejrzysty koszt za sesję, portowalne skille i reguły, oraz edytor zbudowany jako zwykłe rozszerzenie VS Code zamiast forka."
publishedAt: "2026-09-05"
slug: "kilo-anaconda-engineers-cursor-migration"
hashtags: "#kilo #ai #devtools #cursor #vscode #generated #pl"
source_pattern: "Kilo"
---

## Migracja z Cursora do Kilo: co przetrwało, a co trzeba było przepisać ręcznie

**TLDR:** Po przejęciu Kilo przez Anacondę w lipcu, jeszcze przed publicznym ogłoszeniem zerwania OpenAI z Cursorem, dwoje inżynierów Anacondy porównało notatki z migracji. Kilo pokazuje koszt każdej sesji agentowej na bieżąco, w przeciwieństwie do ryczałtowej subskrypcji Cursora, a większość konfiguracji, w tym globalne skille i cloud agenty, przeniosła się bez zmian. Jedynym elementem wymagającym ręcznej pracy były reguły `.cursor/rules`, które inżynierowie przepisali, każąc samemu Cursorowi wypisać, co warto zachować.

**Summary:** OpenAI potwierdziło całkowite odcięcie Cursora od swoich modeli, z terminem do 12 listopada, obejmującym też przyszłe modele, w tym Astrę wypuszczoną w tym samym tygodniu. Kilo od dawna mówi o kruchości dostępu do modeli jako realnym ryzyku biznesowym, a ten przypadek jest kolejnym potwierdzeniem tej tezy. Anaconda przeniosła swój zespół inżynierski z Cursora do Kilo jeszcze przed tym, jak sprawa stała się publiczna, co dało dwójce inżynierów, Anilowi i Caitlyn, okazję do porównania obu narzędzi bez presji nagłej migracji pod przymusem.

Największa różnica dotyczy widoczności kosztu. Subskrypcja Cursora pakuje zużycie modelu w stałą opłatę miesięczną, więc realny koszt konkretnej sesji poznaje się dopiero na rachunku albo po trafieniu w limit. Kilo rozlicza się per token według cennika dostawcy modelu i pokazuje koszt każdej sesji czatu na bieżąco, razem z rozbiciem, które modele zostały użyte. Dla inżynierów prowadzących złożoną, wieloetapową pracę agentową ta widoczność ma realną wartość: łatwiej ocenić, czy dane zadanie w ogóle warto zlecać agentowi, i lepiej rozumie się jego zachowanie kosztowe w praktyce.

Obawa przy każdej migracji narzędzia to utrata miesięcy zbieranej konfiguracji, rozszerzeń i wyćwiczonych nawyków. W tym przypadku strata okazała się dużo mniejsza niż oczekiwano. Oba narzędzia czytają skille z tego samego katalogu `~/.agents/skills`, więc globalne skille Anila i Caitlyn zadziałały w Kilo od razu, a cloud agenty działały identycznie w obu narzędziach, więc ich setup z wieloma worktree'ami przeniósł się bez zmian. Zaskoczeniem był sam edytor: skoro Kilo działa jako standardowe rozszerzenie VS Code, a nie fork jak Cursor, zespół zyskał pełny dostęp do oficjalnego marketplace'u rozszerzeń VS Code, którego fork Cursora nie wspiera w pełni. Jedynym elementem wymagającym ręcznej pracy były reguły `.cursor/rules`: rozwiązaniem było poproszenie samego Cursora o wypisanie, co z konfiguracji warto zachować, a potem przekazanie tej listy Kilo jako podstawy nowej reguły, co zajęło jedną rozmowę z każdym narzędziem.

Anil zauważył, że Composer, własny model Cursora, w niektórych zadaniach wciąż radził sobie lepiej niż początkowe modele wypróbowane w Kilo. Zastępstwem stał się Auto-Efficient, router modeli Kilo, który dopasowuje model do promptu na podstawie własnego benchmarku kodowania, żeby wybrać najtańszy model zdolny wykonać zadanie. Router nie dogonił jeszcze pułapu jakości Composera, ale daje coś, czego Composer nigdy nie dawał: jasną informację, który model faktycznie obsłużył dane zadanie i ile to kosztowało, zamiast nieprzejrzystych kredytów i limitów zapytań. Migracja objęła też kilka podorganizacji Anacondy naraz: jedna wymaga, żeby wszystkie wywołania modelu zostały w Europie, inna chce pełnego dostępu do katalogu modeli, a Kilo pozwala ustawiać te reguły per zespół z jednego panelu, zamiast pisać jedną politykę na całą firmę.

**Key takeaways:**
- Kilo pokazuje koszt każdej sesji w czasie rzeczywistym z rozbiciem na modele, w przeciwieństwie do ryczałtowej subskrypcji Cursora ukrywającej realny koszt do momentu rachunku.
- Skille z `~/.agents/skills` i konfiguracja cloud agentów przeniosły się bez zmian; jedyną ręczną pracą było przepisanie `.cursor/rules`, wykonane przy pomocy samego Cursora.
- Kilo jako standardowe rozszerzenie VS Code (nie fork) daje pełny dostęp do oficjalnego marketplace'u rozszerzeń, czego Cursor w pełni nie wspiera.
- Auto-Efficient, router modeli Kilo oparty o własny benchmark kodowania, zastępuje Composer przejrzystością kosztu, choć na razie nie dorównuje mu pułapem jakości.

**Why do I care:** Historia Anacondy to konkretny dowód na tezę, którą łatwo zbyć jako marketing dostawcy: model dropdown w narzędziu do kodowania to nie to samo co niezależność od jednego dostawcy modeli, i różnicę poznaje się dopiero w dniu, w którym ktoś zamyka wam dostęp z zewnątrz. Warto potraktować to jako listę kontrolną przed wyborem narzędzia agentowego: czy skille i reguły trzymacie w formacie przenośnym między narzędziami, i czy macie realną widoczność kosztu per zadanie, zanim rachunek za miesiąc was zaskoczy.

**Link:** [What Anaconda's Engineers Found When They Left Cursor for Kilo](https://blog.kilo.ai/p/what-anacondas-engineers-found-when)
