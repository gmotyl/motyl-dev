---
title: 'Symlinked Nodemodules Structure Pnpm Building An Interactive 3d Event Badge With React Three Fiber Vercel Coherence Conversational Surveys'
excerpt: 'Przegląd 4 artykułów z ui.dev'
publishedAt: '2024-04-18'
slug: 'symlinked-nodemodules-structure-pnpm-building-an-interactive-3d-event-badge-with-react-three-fiber-vercel-coherence-conversational-surveys'
hashtags: '#generated #pl #react #nodejs #pnpm #threejs #ai'
---

## Symlinked `node_modules` structure | pnpm

No dobrze, więc pnpm to jest coś pięknego, ludzie. Jeśli jeszcze nie używacie pnpm zamiast npm, to naprawdę nie wiem co robicie ze swoim życiem. Ten artykuł pokazuje dokładnie dlaczego pnpm jest tak genialny - wszystko sprowadza się do tego jak organizuje node_modules.

Zamiast kopiować każdy pakiet milion razy jak robi to npm, pnpm używa twardych linków do content-addressable store. To znaczy że jeśli masz foo który zależy od bar, to pnpm nie kopiuje plików - tylko tworzy hard linki do centralnego magazynu. Wszystkie prawdziwe pliki są w folderze kropka pnpm, a potem pnpm buduje strukturę za pomocą symbolic linków.

To jest genialne z kilku powodów. Po pierwsze, oszczędzasz masę miejsca na dysku. Po drugie, instalacja jest szybsza bo nie kopiujesz plików. Po trzecie, pakiety mogą importować same siebie - foo może zrobić require foo slash package dot json bez problemów.

Struktura wygląda trochę dziwnie na początku, ale ma sens. Wszystko jest w folderze kropka pnpm z wersjami, a potem symbolic linki budują dependency graph. Nawet jak masz głęboką strukturę zależności, to głębokość w systemie plików pozostaje stała.

**Key takeaways:**
- pnpm używa hard linków zamiast kopiowania plików
- Wszystkie pakiety są w centralnym store, symbolic linki budują strukturę
- Oszczędność miejsca i szybsza instalacja
- Pakiety mogą importować same siebie bez problemów

**Link:** [link](https://pnpm.io/symlinked-node-modules-structure)

## Building an interactive 3D event badge with React Three Fiber - Vercel

Vercel zrobił coś absolutnie szalonego na swoją konferencję Ship 2024. Zamiast nudnych digital tickets, stworzyli interaktywną 3D odznakę która spada jak prawdziwy lanyard. I wiecie co? To działa w przeglądarce!

Cały stack to React Three Fiber, który jest reactowym rendererem dla Three.js, plus Drei dla komponentów, react-three-rapier dla fizyki i MeshLine dla grubych linii. Studio Basement najpierw zrobiło wizualizację w Blenderze, a potem Vercel to przenieśli do browsera.

Najpiękniejsze w tym wszystkim jest to, że cała implementacja to około osiemdziesiąt linii kodu. Głównie deklaratywnego kodu! Mają fizyczne jointy - rope joints które łączą elementy lanyarda, spherical joint który łączy kartę, i wszystko reaguje na przeciąganie myszką.

Fizyka działa w sześćdziesiąt klatek na sekundę, grawitacja jest ustawiona na minus czterdzieści, więc wszystko ładnie spada. Użyli CatmullRom curve żeby narysować linkę między elementami. To jest po prostu piękne połączenie matematyki, fizyki i Reacta.

**Key takeaways:**
- React Three Fiber pozwala na deklaratywne 3D w Reakcie
- Rapier physics engine daje realistyczną fizykę w browserze
- Całość to tylko 80 linii kodu
- Świetny przykład jak zrobić engaging user experience

**Link:** [link](https://vercel.com/blog/building-an-interactive-3d-event-badge-with-react-three-fiber)

## Coherence — Conversational Surveys

Kolejny AI tool, ale tym razem faktycznie ma sens. Coherence robi conversational surveys zamiast tych okropnych checkboxów i multiple choice. Bo serio, ludzie nie myślą w checkboxach!

AI przeprowadza prawdziwe rozmowy z użytkownikami. Możesz zdefiniować cel - co chcesz się dowiedzieć - a Coherence stworzy ankietę dopasowaną do tego celu. Najlepsze jest to, że AI zadaje follow-up questions dynamicznie, jak prawdziwy interviewer.

Możesz dostosować osobowość AI - od friendly interviewer do professional researcher. AI analizuje odpowiedzi w czasie rzeczywistym, wyciąga kluczowe cytaty, tematy i sentiment. Są też guardrails żeby chronić brand i kończyć rozmowy jeśli wykryje spam.

Integruje się ze Slackiem, Notion, możesz eksportować do research docs automatycznie. To jest dokładnie ten typ AI toolingu który faktycznie rozwiązuje prawdziwy problem - jak dostać lepsze insights od użytkowników.

**Key takeaways:**
- Conversational surveys dają głębsze odpowiedzi niż checkboxy
- AI zadaje dynamiczne follow-up questions
- Real-time analiza odpowiedzi i wyciąganie insights
- Integracja z popularnymi narzędziami jak Slack i Notion

**Link:** [link](https://www.withcoherence.com/)

## CarbonQA — Contextual QA for dev teams

CarbonQA to dedicated testing team dla dev teamów. Nie crowdsourced, nie mechanical turk - prawdziwi, full-time testerzy z USA którzy uczą się twojego produktu i procesów.

Model biznesowy jest prosty - płacisz miesięczną subskrypcję która zapewnia project-ready testerów. Potem płacisz per tester, per day kiedy faktycznie testują. Subskrypcja zawiera pierwsze kilka resource days miesięcznie plus onboarding.

Testują web, desktop i mobile apps. Mają device lab z fizycznymi i wirtualnymi urządzeniami. Testują przeciwko user stories, acceptance criteria, user experience i common sense. Jeśli nie masz test planu, zbudują ci go i będą maintainować.

Najlepsze jest to, że testerzy komunikują się bezpośrednio ze developerami przez Slack. To skraca feedback loop i pomaga szybko pinpointować issues. To jest dokładnie to czego potrzebują dev teamy - żeby wrócić do budowania produktu zamiast spędzać czas na testowaniu.

**Key takeaways:**
- Dedicated US-based testing team, nie crowdsourcing
- Model subscription plus pay-per-day usage
- Bezpośrednia komunikacja z developerami przez Slack
- Pokrywają web, desktop i mobile testing

**Link:** [link](https://carbonqa.com/)