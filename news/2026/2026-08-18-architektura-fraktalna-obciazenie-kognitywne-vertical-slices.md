---
title: "Architektura fraktalna jako odpowiedź na obciążenie kognitywne w vertical slices"
excerpt: "Oskar Dudycz wraca do tematu vertical slices i pokazuje, jak koncepcja architektury fraktalnej pomaga zarządzać zależnościami między modułami bez powrotu do sztywnych warstw technicznych."
publishedAt: "2026-08-18"
slug: "architektura-fraktalna-obciazenie-kognitywne-vertical-slices"
hashtags: "#OskarDudycz #architecture #engineering #generated #pl"
source_pattern: "OskarDudycz"
---

## Architektura fraktalna, obciążenie kognitywne i granice vertical slices

**TLDR:** Odpowiadając na pytanie czytelnika, Oskar Dudycz łączy koncepcję Cognitive Load Johna Swellera z historią wahadła między architekturą warstwową i vertical slices, i proponuje architekturę fraktalną jako sposób na uniknięcie skrajności obu podejść. Kluczem jest jawne definiowanie zależności i możliwości na każdym poziomie kompozycji, od pojedynczej funkcji do całego systemu.

**Summary:** Tekst zaczyna się od cytatu Johna Swellera z 1988 roku o tym, że pamięć operacyjna człowieka jest ograniczona i metody nauczania powinny unikać jej przeciążania. Autor przekłada to na historię ewolucji architektury oprogramowania: kiedy branża zaczęła skalować pracę, przeszliśmy od wąskich zespołów pracujących blisko biznesu do podziału na warstwy techniczne, gdzie jedna osoba robi UI, druga integracje, a trzecia domenę. To pozwoliło skalować pracę organizacyjnie, ale kosztem cognitive load, bo dodanie jednego endpointu wymagało przejścia przez prezentację, aplikację, domenę i storage, każdą traktowaną jako osobny, sterylny kontekst.

Odpowiedzią na ten problem były vertical slices, czyli krojenie systemu wyłącznie wedle cech biznesowych, bez warstw. Problem w tym, że idea uległa semantycznej dyfuzji, z "wróćmy do myślenia o biznesie" zrobiło się "żadnych warstw, tylko pionowe funkcje", co w praktyce prowadzi do gigantycznego backlogu w Jirze, gdzie nikt nie rozumie zależności między zadaniami, i gdzie feature-by-feature dostawa produkuje coraz niższą jakość, bo każdy slice jest projektowany w izolacji od reszty. Autor cytuje Deminga: bad system will beat a good person every time, i to jest sedno, złe podejście architektoniczne psuje wyniki niezależnie od tego, jak dobrzy są ludzie w zespole.

Rozwiązaniem proponowanym w tekście jest architektura fraktalna, gdzie ten sam wzorzec, jawne zależności na wejściu i jawne możliwości (capabilities) na wyjściu, powtarza się na każdym poziomie: pojedynczej funkcji, modułu, całego systemu e-commerce, a nawet całego ERP złożonego z wielu systemów. To nie jest brak granic, jak w skrajnym feature-slicing, ale też nie sztywny podział na warstwy techniczne. Każdy poziom deklaruje, czego potrzebuje z zewnątrz i co udostępnia innym, podobnie jak robi to model C4, choć C4 ma sztywny limit czterech poziomów, co samo w sobie jest sensownym ograniczeniem, bo fraktal zbyt głęboki też przestaje być czytelny.

**Key takeaways:**
- Cognitive Load Swellera wyjaśnia, czemu zarówno czysta architektura warstwowa, jak i czyste vertical slices bez granic, w praktyce zawodzą
- Semantyczna dyfuzja przekształciła ideę vertical slices w "brak jakichkolwiek granic", co produkuje maze zależności i duplikację
- Architektura fraktalna powtarza wzorzec jawnych zależności i możliwości na każdym poziomie kompozycji, od funkcji do całego systemu
- Model C4 jest przykładem podobnego myślenia, ale ze sztywnym limitem czterech poziomów, żeby fraktal nie zrobił się zbyt głęboki

**Why do I care:** Ten tekst trafia w dokładnie ten dylemat, który widzę w większości projektów, gdzie zespół albo trzyma się warstw tak sztywno, że zmiana jednej reguły biznesowej wymaga przejścia przez pięć plików w pięciu różnych katalogach, albo idzie w drugą stronę i produkuje sto slice'ów bez żadnej wspólnej struktury, gdzie ten sam kod jest kopiowany trzy razy, bo nikt nie wie, gdzie go bezpiecznie umieścić. Fraktalne myślenie o zależnościach i możliwościach jest praktyczną heurystyką do code review: jeśli moduł nie da się opisać w dwóch zdaniach, czego potrzebuje i co udostępnia, to sygnał, że granice są źle poprowadzone, niezależnie od tego, czy nazwiemy to warstwą, slice'em czy modułem.

**Link:** [Fractal Architecture, Cognitive Load, Vertical Slices and other terms that do(n't) fit your head](https://www.architecture-weekly.com/p/fractal-architecture-cognitive-load?publication_id=579466&post_id=211555373&isFreemail=true&triedRedirect=true)
