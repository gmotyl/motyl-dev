---
title: "CPU zaczyna brakować tak samo jak GPU"
excerpt: "Gergely Orosz opisuje, jak popyt napędzany przez agentów AI wywołał niedobór CPU w chmurze i dlaczego firmy muszą wrócić do planowania mocy obliczeniowej z rocznym wyprzedzeniem."
publishedAt: "2026-09-24"
slug: "cpu-shortage-trend-pulse"
hashtags: "#pragmaticengineer #ai #architecture #devops #aws #performance #generated #pl"
source_pattern: "Pragmatic engineer"
---

## CPU zaczyna brakować tak samo jak GPU

**TLDR:** Gergely Orosz relacjonuje rozmowy z CTO i szefami infrastruktury, z których wynika, że po kryzysie GPU i pamięci przyszła kolej na CPU. Ceny spot znikają, rezerwacje trzeba składać z miesięcznym, a nawet rocznym wyprzedzeniem, a winowajcą jest gwałtowny wzrost zapotrzebowania ze strony agentów AI.

**Summary:**
Podczas kolacji z grupą CTO i szefów infrastruktury Gergely usłyszał coś, co wcześniej kojarzyło się głównie z GPU. Firmy nie mogą dostać wystarczającej liczby procesorów. Zniknęły też tanie instancje spotowe, na których kiedyś można było zaoszczędzić nawet 90 procent ceny standardowej. Dostawcy chmury obniżali wtedy ceny za maszyny, które i tak stały bezczynnie. Teraz bezczynnych maszyn po prostu nie ma, bo popyt na CPU rośnie szybciej niż podaż, a rezerwacje konkretnych typów procesorów trzeba planować z wielomiesięcznym wyprzedzeniem, przy czym dostawca może i tak odmówić, jeśli brakuje mu odpowiedniego sprzętu.

Simon Eskildsen, CEO turbopuffer, firmy której produkt działa na CPU, a nie na GPU, potwierdza ten obraz i wskazuje na uczenie ze wzmocnieniem jako główny konsument mocy. Trenowanie modeli metodą RL wymaga ogromnej liczby procesorów, bo model musi nie tylko wykonywać kolejne kroki wyszukiwania, ale też realnie uruchamiać oprogramowanie, które trenujący każą mu obsłużyć. Poza treningiem dochodzi drugi front zapotrzebowania: agenci produkcyjni, którzy wykonują bardzo ogólne zadania właśnie na CPU. Skala popytu jest na tyle duża, że nawet największe firmy technologiczne rywalizują ze sobą o przydziały procesorów u dostawców chmury, mimo gotówki i chęci podpisania najdłuższych możliwych umów najmu.

Katelyn Lesse, szefowa inżynierii platformy w Claude Platform, tłumaczy mechanikę tego niedoboru na poziomie fabryk półprzewodników. W TSMC linie produkcyjne dzielą między siebie GPU, CPU oraz chipy dla Apple, Qualcomm i Broadcom, więc procesory ogólnego przeznaczenia przegrywają z bardziej rentownymi zamówieniami na GPU. Równolegle SK Hynix, Samsung i Micron kierują coraz więcej mocy produkcyjnej w stronę pamięci HBM zamiast zwykłego DRAM, od którego zależą CPU, co podnosi też ceny pamięci. AMD nie ma własnych fabryk i musi walczyć o przydział mocy produkcyjnej w TSMC, a Intel, mimo że fabryki ma, zmaga się z problemami wydajności produkcji i teraz ogranicza produkcję chipów do komputerów, żeby zwolnić moce dla chipów serwerowych. Według analityków sytuacja z podażą CPU ma się poprawić szybciej niż z pamięcią, ale wciąż mowa o odległości wielu kwartałów.

Skala zjawiska widoczna jest w danych, które Gergely przytacza od Ubera: liczba zapytań generowanych przez agentów wzrosła dziewięciokrotnie w ciągu ostatnich sześciu miesięcy. Agenci nie tylko generują kod, co jest zadaniem obciążającym GPU, ale też uruchamiają narzędzia, które ten kod kompilują, testują i lintują, a to zadania typowo obciążające CPU. W firmach takich jak Uber czy Ramp agenci przestali działać na lokalnej maszynie developera i przenieśli się na dedykowane instancje w chmurze, co samo w sobie zwiększa presję na rezerwację procesorów. Standardowa proporcja jednego CPU na osiem GPU w centrach danych AI zmieniła się już na jeden do czterech, a wygląda na to, że zmierza w stronę jeden do jednego.

Praktyczna rada Katelyn Lesse brzmi: większość zespołów nigdy nie planowała CPU z wyprzedzeniem, bo do tej pory autoskalowanie na żądanie wystarczało, o ile budżet na to pozwalał. Teraz zwykła moc obliczeniowa ogólnego przeznaczenia wymaga takiego samego prognozowania z rocznym wyprzedzeniem, jakiego kiedyś wymagały akceleratory GPU. Zamówienia na serwery realizują się w około sześć miesięcy zamiast jednego czy dwóch tygodni, a ceny wzrosły od 10 do 20 procent. Gergely dodaje, że część dostawców przyjmuje już dziś płatności za pojemność, która ruszy dopiero w grudniowych centrach danych, co brzmi na pierwszy rzut oka drapieżnie, ale przy takim popycie to po prostu sposób na przydzielanie ograniczonego zasobu.

**Key takeaways:**
- Ceny spot na CPU w dużych chmurach praktycznie zniknęły, bo nie ma już bezczynnych maszyn do wyprzedaży.
- Trening RL i produkcyjni agenci AI razem napędzają popyt na CPU niezależnie od siebie, więc problem nie zniknie wraz ze spowolnieniem trendu na GPU.
- CPU są ściskane z dwóch stron naraz: fabryki wolą produkować bardziej rentowne GPU, a producenci pamięci wolą produkować HBM zamiast DRAM.
- Proporcja CPU do GPU w centrach danych AI przesuwa się z 1:8 w stronę 1:1, częściowo dlatego, że agenci uruchamiają buildy, testy i lintery w chmurze zamiast na maszynie developera.
- Zamówienia na serwery trwają teraz około sześciu miesięcy zamiast jednego czy dwóch tygodni, a ceny są wyższe o 10-20 procent, więc capacity planning trzeba robić z rocznym wyprzedzeniem.

**Why do I care:** To głównie historia dla ludzi odpowiedzialnych za infrastrukturę i budżet chmurowy, ale każdy architekt powinien ją znać, bo decyzje o tym, gdzie i jak uruchamiać agentów CI/CD, przestają być tylko kwestią wygody, a stają się kwestią dostępności sprzętu. Jeśli twój zespół planuje przenieść pipeline'y budowania i testowania na dedykowane instancje w chmurze dla agentów kodujących, ten tekst to sygnał, żeby zacząć rozmowy z dostawcą chmury już teraz, a nie w momencie, gdy commitment będzie potrzebny na wczoraj. Warto też zrobić przegląd usług, które dziś marnują przydzielone CPU, bo w świecie, w którym zwykły procesor robi się towarem deficytowym, oszczędność na niewykorzystanych rdzeniach może być tańsza niż nowa rezerwacja.

**Link:** [The Pulse: a new trend of CPU shortages](https://newsletter.pragmaticengineer.com/p/the-pulse-a-new-trend-of-cpu-shortages?publication_id=458709&post_id=216108409&isFreemail=true&triedRedirect=true)
