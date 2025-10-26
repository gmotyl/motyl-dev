---
title: 'Symlinked Nodemodules Structure Od Pnpm Building An Interactive 3d Event Badge With React Three Fiber Vercel Coherence Conversational Surveys'
excerpt: 'Przegląd 4 artykułów z ui.dev'
publishedAt: '2024-04-18'
slug: 'symlinked-nodemodules-structure-od-pnpm-building-an-interactive-3d-event-badge-with-react-three-fiber-vercel-coherence-conversational-surveys'
hashtags: '#generated #pl #react #nodejs #pnpm #threejs #ai'
---

## Symlinked node_modules structure od pnpm

Yo, więc pnpm robi coś absolutnie genialnego z node_modules i większość ludzi nie ma pojęcia jak to działa. Zamiast kopiować wszystkie pliki jak npm czy yarn, pnpm używa hard linków i symlinków żeby stworzyć strukturę, która jest jednocześnie wydajna i logiczna.

Wszystkie pakiety lądują w folderze `.pnpm` gdzie każdy plik to hard link do content-addressable store. To znaczy, że jeśli masz ten sam pakiet w dziesięciu projektach, fizycznie na dysku jest tylko jedna kopia. Potem pnpm tworzy symlinki żeby zbudować właściwą strukturę zależności.

Najlepsze w tym jest to, że niezależnie od tego jak głęboki jest twój dependency graph, struktura folderów pozostaje płaska. Masz foo który zależy od bar, który zależy od qar? Nie problem - wszystko siedzi na tym samym poziomie w `.pnpm`, tylko symlinki robią magię żeby Node.js mógł wszystko znaleźć.

**Kluczowe wnioski:**
- Hard linki oszczędzają miejsce na dysku poprzez współdzielenie plików między projektami
- Symlinki tworzą logiczną strukturę zależności bez duplikowania
- Płaska struktura w `.pnpm` niezależnie od głębokości dependency graph
- Pakiety mogą importować same siebie dzięki specjalnej strukturze folderów

**Link:** https://pnpm.io/symlinked-node-modules-structure

Kluczowe wnioski:
- - Hard linki oszczędzają miejsce na dysku poprzez współdzielenie plików między projektami
- Symlinki tworzą logiczną strukturę zależności bez duplikowania
- Płaska struktura w `.pnpm` niezależnie od głębokości dependency graph
- Pakiety mogą importować same siebie dzięki specjalnej strukturze folderów
- https://pnpm.io/symlinked-node-modules-structure

Link: ** https://pnpm.io/symlinked-node-modules-structure

## Building an interactive 3D event badge with React Three Fiber - Vercel

Vercel zrobił coś absolutnie szalonego dla swojego Ship 2024 eventu - interaktywną 3D plakietkę która spada jak na sznurku. I nie, to nie jest jakiś ciężki engine czy WebGL napisany od zera. To React Three Fiber z kilkoma bibliotekami i jakieś 80 linijek kodu!

Stack jest przepiękny: Blender do przygotowania modeli, React Three Fiber jako renderer dla Three.js, Drei jako zestaw komponentów, react-three-rapier do fizyki i MeshLine do renderowania sznurka. Cała implementacja to głównie deklaratywny kod z odrobiną matematyki.

Najciekawsze jest jak oni połączyli fizykę z interakcją - używają rope joints żeby połączyć segmenty sznurka i spherical joint żeby przymocować plakietkę. Kiedy przeciągasz myszką, kod konwertuje pozycję kursora na współrzędne 3D i budzi wszystkie rigid bodies w fizyce. To jest właśnie ta magia React Three Fiber - skomplikowane rzeczy robisz deklaratywnie.

**Kluczowe wnioski:**
- React Three Fiber pozwala na tworzenie zaawansowanych 3D doświadczeń z minimalnym kodem
- Kombinacja physics engine z interakcją myszki daje realistyczne zachowanie
- Deklaratywne podejście do 3D jest o wiele prostsze niż imperatywne Three.js
- 80 linijek kodu wystarczy do stworzenia imponującego efektu wizualnego

**Link:** https://vercel.com/blog/building-an-interactive-3d-event-badge-with-react-three-fiber

Kluczowe wnioski:
- - React Three Fiber pozwala na tworzenie zaawansowanych 3D doświadczeń z minimalnym kodem
- Kombinacja physics engine z interakcją myszki daje realistyczne zachowanie
- Deklaratywne podejście do 3D jest o wiele prostsze niż imperatywne Three.js
- 80 linijek kodu wystarczy do stworzenia imponującego efektu wizualnego
- https://vercel.com/blog/building-an-interactive-3d-event-badge-with-react-three-fiber

Link: ** https://vercel.com/blog/building-an-interactive-3d-event-badge-with-react-three-fiber

## Coherence — Conversational Surveys

Ktoś w końcu pomyślał "a co jeśli ankiety nie będą ssać?" i stworzył Coherence. To jest AI-powered platforma do prowadzenia ankiet, ale zamiast tych okropnych checkboxów i pytań wielokrotnego wyboru, masz prawdziwą rozmowę z AI.

Fajne jest to, że AI dostosowuje pytania dynamicznie - jak prawdziwy interviewer. Zadaje follow-up questions, drąży głębiej jeśli coś jest interesujące, i ma guardrails żeby nie zjechać na manowce. Możesz ustawić personalność - od friendly interviewer po professional researcher.

Najlepsze jest to, że AI analizuje odpowiedzi w czasie rzeczywistym, wyciąga kluczowe cytaty, tematy i sentiment. Potem możesz zapytać "jakie były główne tematy?" i dostajesz natychmiastowe insights. To jest właśnie przyszłość research - zamiast męczyć ludzi sztywnym formularzem, dajesz im możliwość normalnej rozmowy.

**Kluczowe wnioski:**
- AI-driven conversations dają głębsze odpowiedzi niż tradycyjne ankiety
- Dynamiczne follow-up questions odkrywają insights niedostępne w sztywnych formularzach
- Real-time analiza i ekstraktowanie tematów oszczędza godziny pracy
- Customizable personality AI dopasowuje się do brandu i stylu badania

**Link:** https://www.withcoherence.com/

Kluczowe wnioski:
- - AI-driven conversations dają głębsze odpowiedzi niż tradycyjne ankiety
- Dynamiczne follow-up questions odkrywają insights niedostępne w sztywnych formularzach
- Real-time analiza i ekstraktowanie tematów oszczędza godziny pracy
- Customizable personality AI dopasowuje się do brandu i stylu badania
- https://www.withcoherence.com/

Link: ** https://www.withcoherence.com/

## CarbonQA - Contextual QA for dev teams

CarbonQA to w zasadzie "testing as a service" ale zrobiony dobrze. Zamiast crowdsource czy mechanical turk, masz dedykowany zespół US-based testerów którzy uczą się twojego produktu, procesów i zespołu. To jest relationship-based QA, nie jednorazowe zlecenie.

Model biznesowy jest przemyślany - płacisz miesięczną subskrypcję która zapewnia "project-ready" testerów, czyli ludzi już wytrenowanych na twoim projekcie. Potem płacisz per tester per day kiedy faktycznie ich używasz. Subskrypcja pokrywa pierwsze kilka dni testowania miesięcznie plus onboarding.

Testują web, desktop, mobile - głównie manual testing przeciwko user stories, acceptance criteria, albo po prostu common sense. Jeśli nie masz test planu, zbudują ci go. Komunikują się przez Slack bezpośrednio z devami, co skraca feedback loop i pomaga szybko znaleźć problemy.

**Kluczowe wnioski:**
- Dedicated team model vs crowdsourcing daje lepszą jakość i kontekst
- Subscription + per-day billing model optymalizuje koszty
- Direct communication z devami przez Slack przyspiesza rozwiązywanie problemów
- Focus na manual testing uzupełnia automated testing teams

**Link:** https://carbonqa.com/

Kluczowe wnioski:
- - Dedicated team model vs crowdsourcing daje lepszą jakość i kontekst
- Subscription + per-day billing model optymalizuje koszty
- Direct communication z devami przez Slack przyspiesza rozwiązywanie problemów
- Focus na manual testing uzupełnia automated testing teams
- https://carbonqa.com/

Link: ** https://carbonqa.com/