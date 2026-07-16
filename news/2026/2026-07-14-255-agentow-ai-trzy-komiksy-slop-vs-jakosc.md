---
title: "Uruchomiłem 255 agentów AI, żeby zrobić trzy komiksy. Granica między slopem a prawdziwą pracą jest grubsza, niż myślałem."
excerpt: "Eksperyment z generowaniem komiksów przez agentów AI pokazuje, że jakość nie zależy od budżetu tokenów, lecz od ilości ludzkiej uwagi i oceny wbudowanej w pipeline."
publishedAt: "2026-07-13"
slug: "255-agentow-ai-trzy-komiksy-slop-vs-jakosc"
hashtags: "#joozio #ai #llm #agenci #komiksy #slop #generated #pl"
source_pattern: "PawelJozefiak"
---

## Uruchomiłem 255 agentów AI, żeby zrobić trzy komiksy. Granica między slopem a prawdziwą pracą jest grubsza, niż myślałem.

**TLDR:** Autor uruchomił trzy iteracje pipeline'u agentów AI tworzących komiks. Każda runda kosztowała podobną ilość tokenów, ale jakość różniła się dramatycznie w zależności od tego, ile ludzkiej oceny i przemyślenia trafiło do procesu.

Slop to słowo 2025 roku według Merriam-Webster. Kanały YouTube, TikTok, Pinterest zalewają nas treściami generowanymi bez żadnego nadzoru: ktoś wpisuje jednolinijkowy prompt, skaluje do nieskończoności, i machina produkuje wolumen. Ale co dokładnie sprawia, że coś jest slopem zamiast wartościową pracą? Autor postanowił to sprawdzić empirycznie, tworząc trzy wersje tego samego komiksu z rosnącym udziałem ludzkiej uwagi.

Pierwsza runda była wzorcem chaosu przemysłowego. 51 agentów, 3,4 miliona tokenów, zero błędów, jedna spójna paleta kolorów utrzymana przez 50 izolowanych workerów. Pod względem inżynierskim: piękne. Pod względem komiksu: UML diagram przeżywający koszmar. Postacie to geometryczne manekiny, tekst często nieczytelny, historia prawie dosłowna kopia serialu TV, który był inspiracją. Autor dał systemowi jednolinijkowy brief, wymienił elementy fabuły z inspiracji, a pipeline zrobił dokładnie to, o co go poprosił. Nikt nigdy nie przeczytał całości przed wysyłką. To jest slop w czystej formie: perfekcyjnie wykonany pipeline produkujący coś, czego nikt nie przeczytałby z wyboru.

Druga runda przyniosła dwie zmiany strukturalne. Grafika przeszła z SVG generowanego kodem na prawdziwy model obrazów (Nano Banana Pro, około 0,14 dolara za stronę), a skrypt dostał pętlę redakcyjną z osobnym agentem-krytykiem. Efekt był zaskakujący: grafika skoczyła o całą ligę, malowana i spójna przez 50 stron. Ale autor ziewał przy czytaniu. Jedna runda krytyki wyprodukowała coś literackiego i martwego, jak journal opowiadań, których nikt nie kupuje. I tu pojawiło się kluczowe odkrycie: obie rundy kosztowały niemal identyczną liczbę tokenów. Około 3 milionów. Skala nigdy nie była tym kluczem. Zmienną było to, ile oceny dotknęło pracę.

Trzecia runda zaczęła się od 20 minut prawdziwego myślenia zamiast jednej linii. Autor napisał realny brief kreatywny: moce na zerowym poziomie, które rozrywają ścięgna przy użyciu, fabuła z pięciu krajów zbiegająca się dzięki kobiecie znajdującej ludzi przez sny, moralnie niejednoznaczny antagonista prowadzący firmę z jednym naprawdę sensownym argumentem. Pipeline urósł o warstwy oceny: dwie oddzielne rundy krytyki (jedna dla struktury i łuków postaci, jedna tylko dla dialogów i choreografii akcji), agenci-edytorzy czytający każdy gotowy rozdział jak czytelnicy i zlecający przerysowania stron, które nie działały. Wyłapali chłopca narysowanego jako siwowłosy dorosły w retrospekcji, stage directions wyciekające do dymków, czysty nonsens w jednej podpisie.

Efekt, "Small Hours", to 65 stron, pięć krajów, malowana okładka. Pierwszy z trzech komiksów czytający się jak prawdziwy komiks ze stawką. Wciąż niedoskonały, twarze dryfują między stronami w kilku miejscach, kilka literówek przeżyło finalny przegląd. Ale różnica jakościowa między rundą pierwszą a trzecią jest niemożliwa do przeoczenia. I runda trzecia kosztowała więcej tokenów, ale nie proporcjonalnie więcej. Skok między rundą 1 a 2 był darmowy. Skok między 2 a 3 wymagał 20 minut przemyślanego briefu.

Granica między slopem a pracą nie leży w pojemności modeli, liczbie tokenów ani cenach API. Leży w trzech miejscach, gdzie człowiek musi usiąść i coś zdecydować. Pierwsze: wybór medium, który decyduje o tym, gdzie żyje gust. SVG generowany kodem koordynuje się perfekcyjnie, ale nie ma smaku. Model obrazów wymaga promptu, a prompt to miejsce, gdzie mieszka ludzki gust. Drugie: warstwy oceny, czyli kto czyta pracę i decyduje, czy jest dobra. Zero warstw to slop. Jedna warstwa to już jakościowy skok. Trzy warstwy to jeszcze więcej, za 30% więcej tokenów, ale z nieporównywalnie większym wpływem na wynik. Trzecie: brief. Ile myślenia wkłada człowiek w specyfikację tego, czego chce. Jednolinijkowy prompt versus 20 minut prawdziwej dyrekcji kreatywnej.

**Kluczowe wnioski:**
- Slop to perfekcyjnie wykonany pipeline przetwarzający bezduszny input, nie efekt słabego modelu
- Budżet tokenów to zła oś do optymalizacji jakości, ważniejsza jest architektura oceny w pipeline
- Jedna runda krytyki agenta kosztuje mało i robi dużą różnicę, kolejne rundy są jeszcze tańsze proporcjonalnie niż wynika z ich wpływu
- Spójność wizualna postaci przez 65 stron osiągnięto przez dosłowne wklejanie pełnych opisów tekstowych do każdego promptu
- Claude Code Workflows jako deterministyczne skrypty wachlujące subagentów sprawdziły się dobrze w zarządzaniu fazami
- Gust jest rzadkim zasobem i będzie stawał się coraz bardziej wartościowy

**Why do I care:** Z perspektywy architekta systemów pracującego z AI na co dzień, ten eksperyment potwierdza coś, o czym mówimy od dawna w kontekście jakości agentów: to nie model jest wąskim gardłem, lecz architektura oceny. Kiedy buduję pipeline z agentami, naturalnie skupiam się na przepływie danych i niezawodności. Ale to właśnie warstwy sędziowskie, które zatrzymują pracę i pytają "czy to jest dobre?" zamiast "czy to jest gotowe?", robią różnicę między czymś funkcjonalnym a czymś wartościowym. Dwadzieścia minut na prawdziwy brief zamiast jednej linii to coś, co każdy z nas powinien robić nie tylko przy generowaniu komiksów.

**Link:** [I Ran 255 AI Agents to Make Three Comics. The Line Between Slop and Good Is Thicker Than I Thought.](https://thoughts.jock.pl/p/ai-slop-comic-experiment-2026?publication_id=1540552&post_id=206725509&isFreemail=true&triedRedirect=true)
