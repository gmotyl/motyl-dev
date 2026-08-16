---
title: "DESIGN.md, czyli jak przestać tłumaczyć Claude Code, że przycisk ma być kwadratowy"
excerpt: "Plik DESIGN.md ma rozwiązać odwieczny problem agentów kodujących, które za każdym razem wymyślają wygląd produktu od nowa, ale sam plik z tokenami kolorów to za mało."
publishedAt: "2026-07-28"
slug: "designmd-dla-spojnego-ui-w-claude-code"
hashtags: "#aifordev #ai #claudecode #devtools #frontend #designsystem #promptengineering #generated #pl"
source_pattern: "AIForDev"
---

## DESIGN.md, czyli jak przestać tłumaczyć Claude Code, że przycisk ma być kwadratowy

**TLDR:** Artykuł opisuje konwencję DESIGN.md, plik markdown w rdzeniu projektu, który ma nauczyć agenta kodującego wyglądu produktu, tak jak CLAUDE.md uczy go architektury. Sam plik z paletą kolorów i typografią to za mało, bo agent i tak improwizuje, gdzie te kolory wsadzić, więc potrzebne są jawne zasady "rób to, nie rób tamtego".

**Summary:** Punkt wyjścia jest znajomy każdemu, kto choć trochę pobawił się Claude Code przy froncie. Ekran ustawień wygląda w porządku, godzinę później prosisz o stronę z cennikiem i nagle przyciski mają inny odcień fioletu, promienie zaokrągleń są inne, a cienie wyglądają, jakby przyszły z zupełnie innej aplikacji. Autor słusznie zauważa, że to nie jest wada Claude Code jako takiego, tylko efekt braku kontekstu. Każda nowa rozmowa startuje z czystą kartką, a model wypełnia lukę swoimi domyślnymi upodobaniami, czyli zaokrąglone rogi, fioletowo-niebieski gradient i ten sam generyczny wygląd SaaS-a, który widziałeś już na tysiącu landing page'y.

Rozwiązanie zaproponowane w tekście to DESIGN.md, czyli plik markdown opisujący system wizualny słowami zrozumiałymi dla agenta: kolory i ich role, skala typografii, zasady odstępów, zachowanie przycisków i kart, stany hover czy disabled, a przede wszystkim lista rzeczy, których robić nie wolno. Pomysł spopularyzował zespół Stitch w Google, ale konwencja nie jest przypisana do żadnego konkretnego narzędzia, tak samo jak README.md czy CLAUDE.md nie należą do jednego edytora. Autor rysuje ładny podział ról: CLAUDE.md to instrukcja obsługi projektu, DESIGN.md to źródło prawdy o wyglądzie. Obserwacja, że większość projektów ma świetny CLAUDE.md i zero DESIGN.md, brzmi prawdziwie, bo programiści piszą dokumentację dla tego, co znają, a design zostawiają intuicji.

Najciekawszy fragment tekstu to część o tym, dlaczego same tokeny nie wystarczą. Ktoś testował przez trzydzieści dni plik złożony wyłącznie z wartości wyciągniętych z Figmy, kolory, fonty, skala odstępów, i poprosił Claude Code o zbudowanie ekranu ustawień. Kolor primary był poprawny, font był poprawny, a agent i tak użył koloru marki jako tła bannera informacyjnego, nałożył go na dekoracyjny separator i dał każdej karcie ten sam miękki cień, którego produkt nigdy wcześniej nie używał. Tokeny były poprawne, decyzje były błędne. To ważne rozróżnienie, ale trzeba też przyznać, że to jest dowód anegdotyczny z jednego wpisu na blogu, a nie żaden pomiar na próbie projektów, więc traktowałbym to jako ilustrację mechanizmu, a nie twardy dowód na skuteczność samego DESIGN.md.

Sama instrukcja wdrożenia jest banalna: plik ląduje w katalogu głównym projektu, a w CLAUDE.md dodajesz odwołanie z prefiksem @, bo to on każe Claude Code faktycznie wciągnąć zawartość pliku, a nie tylko odnotować, że gdzieś tam istnieje. Zabawne, że autor sam przyznaje, że to najczęstszy błąd ludzi, wrzucają DESIGN.md do repo, zapominają o @ i dziwią się, że agent go ignoruje. To akurat mówi więcej o tym, jak kruchy jest cały mechanizm kontekstu w tych narzędziach, niż o samym pomyśle z plikiem projektowym. Jeśli cały system opiera się na tym, żeby nie zapomnieć jednego znaku w jednej linijce konfiguracji, to nie jest to specjalnie odporne na błędy rozwiązanie, tylko kolejna rzecz do zapamiętania obok wszystkich innych konwencji z kropką na początku nazwy pliku.

Druga część tekstu reklamuje projekt awesome-design-md, bibliotekę gotowych plików DESIGN.md wyciągniętych z realnych produktów: Linear, Stripe, Vercel, Notion, Airbnb, Spotify i dziesiątki innych, poukładanych według kategorii. Pomysł, żeby ściągnąć plik od Stripe i kazać agentowi go naśladować, brzmi wygodnie, ale autor zupełnie pomija stronę prawną i wizerunkową takiego kopiowania. Odtworzenie czyjegoś systemu wizualnego jeden do jednego to nie tylko kwestia estetyki, to potencjalnie kwestia znaków towarowych i rozpoznawalności marki, o czym w tekście nie ma ani słowa. Poza tym artykuł nie wspomina, co się dzieje, gdy design system faktycznie się zmienia. Plik trzeba ręcznie aktualizować przy każdej większej zmianie brandingu, inaczej zaczyna kłamać agentowi w żywe oczy, a to jest dokładnie ten sam problem, który mamy z każdą dokumentacją, która żyje osobno od kodu.

**Key takeaways:**
- DESIGN.md to plik markdown w katalogu głównym projektu, opisujący kolory, typografię, spacing, komponenty i zasady stanów hover/disabled dla agenta kodującego.
- Same tokeny kolorów i fontów nie wystarczą, potrzebne są jawne reguły typu "ten kolor tylko do CTA, nigdy jako tło", inaczej agent i tak improwizuje.
- W CLAUDE.md trzeba odwołać się do pliku przez prefiks @, bez tego Claude Code traktuje DESIGN.md jak martwy tekst w repo.
- Biblioteka awesome-design-md daje gotowe pliki wyciągnięte z produktów typu Stripe czy Linear, ale kopiowanie cudzego systemu wizualnego rodzi pytania o znaki towarowe, których artykuł nie porusza.
- To rozwiązanie wymaga ręcznej konserwacji, plik nieaktualizowany razem z realnym designem szybko staje się źródłem błędnych sugestii zamiast pomocą.

**Why do I care:** Z perspektywy kogoś, kto ogarnia architekturę frontendu, DESIGN.md to w gruncie rzeczy nic innego niż stary dobry design system spisany w formacie, który woli LLM zamiast Storybooka czy Figma Tokens, i to samo w sobie jest niezłym sygnałem, jak bardzo agentowe narzędzia zawracają nas do podstaw: pisania rzeczy wprost, zamiast liczenia na to, że ktoś się domyśli. Realną wartość widzę w zespołach, które i tak nie mają spisanych zasad UI, bo dla nich to pretekst, żeby wreszcie to zrobić, niezależnie od tego, czy będzie to czytał agent czy nowy junior. Sceptyczny jestem natomiast wobec traktowania tego jako trwałego rozwiązania, bo plik markdown bez żadnej walidacji, bez linkowania do rzeczywistych tokenów w kodzie, to kolejny artefakt, który wypadnie z synchronizacji z projektem po trzech sprintach, jeśli nikt nie weźmie za niego odpowiedzialności.

**Link:** [DESIGN.md for Design in Claude Code](https://aifordevelopers.substack.com/p/designmd-for-design-in-claude-code)
