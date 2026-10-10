---
title: "Study Sidekick: skill w Claude, który pomaga w lekcjach, ale nie odrabia ich za dziecko"
excerpt: "Tutorial z The AI Break pokazuje, jak zbudować skill homework-coach z profilem ucznia, mapą semestru i trybem sprawdzania pracy."
publishedAt: "2026-10-10"
slug: "study-sidekick-claude-skill-homework-coach"
hashtags: "#theaibreak #ai #agents #prompt-engineering #workflow #generated #pl"
source_pattern: "The AI Break"
---

## Zbuduj Homework Coach Skill

**TLDR:** Tutorial prowadzi krok po kroku do skilla Study Sidekick, który tłumaczy, podpowiada i sprawdza odpowiedzi dziecka, ale nigdy nie podaje gotowego rozwiązania. Całość opiera się na trzech promptach i jednym zapisanym pliku skilla.

**Summary:** Punkt wyjścia jest prosty. Dziecko utknęło na ułamkach, rodzic nie dzielił pisemnie od 1998 roku, a szkoła uczy dziś innej metody. Większość narzędzi AI chętnie poda wynik, co niczego nie uczy. Autorzy proponują skill uruchamiany przy dziecku, na koncie rodzica, bo konta Claude są dla osób dorosłych. Rodzic widzi każdą podpowiedź i każde wyjaśnienie, co wprost wymieniają jako zaletę takiego układu.

Pierwszy prompt prowadzi rozmowę z rodzicem w dziesięciu pytaniach zadawanych po jednym. Dotyczą wieku, systemu szkolnego, przedmiotów, mocnych i słabych stron, stylu uczenia się, reakcji na utknięcie, zainteresowań, specjalnych potrzeb, długości koncentracji i zasad rodzica. Wynikiem jest blok o nazwie LEARNER PROFILE, krótszy niż 220 słów. Autorzy zaznaczają, że najważniejsze jest pytanie szóste, o to, co dziecko robi, gdy utknie, bo inaczej trzeba prowadzić dziecko, które zgaduje, a inaczej to, które się zamyka.

Drugi prompt tworzy TERM MAP: listę tematów z bieżącego semestru, oczekiwanych umiejętności, metod używanych w szkole, dwóch typowych błędów na temat i oznaczenia tematów, które mogą być trudne dla tego konkretnego dziecka. Zdjęcia prawdziwych kart pracy bardzo tu pomagają, bo Claude potrafi z nich odczytać metodę nauczyciela. Trzeci prompt generuje właściwy skill zapisany jako homework-coach/SKILL.md, z pięcioma trybami: pomoc w zrozumieniu, sprawdzanie pracy, ćwiczenia, przygotowanie do sprawdzianu i tryb rodzica, który w dwie minuty tłumaczy, jak szkoła uczy danej umiejętności. Dochodzi tryb Check My Work, który wskazuje błąd, ale go nie poprawia, oraz tygodniowy raport dla rodzica.

**Key takeaways:**
- Profil ucznia i mapa semestru nadają skillowi kontekst, którego zwykły czat nie ma.
- Tryb sprawdzania pracy wskazuje błąd, nie podaje poprawki.
- Zdjęcia kart pracy pozwalają odtworzyć metodę, której uczy szkoła.

**Why do I care:** To jest ciekawy przykład, jak wygląda skill jako produkt dla niedeweloperów: kilka promptów, wyraźne ograniczenie zachowania i zapisany plik. Dla mnie wniosek jest bardziej techniczny. Ograniczenie "nigdy nie podawaj odpowiedzi" jest zapisane tylko w instrukcji, więc zadziała tak długo, jak model będzie jej przestrzegał, a sprytne dziecko prędzej czy później spróbuje to obejść. Autorzy tego nie badają. Brakuje też tematu prywatności: profil dziecka z diagnozami i zainteresowaniami ląduje w rozmowie z zewnętrzną usługą.

**Link:** [Tutorial: Build a Homework Coach Skill](https://theaibreak.substack.com/p/tutorial-build-a-homework-coach-skill)
