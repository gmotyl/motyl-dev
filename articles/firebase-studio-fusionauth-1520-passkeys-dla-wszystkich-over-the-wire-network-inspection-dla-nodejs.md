---
title: 'Firebase Studio Fusionauth 1520 Passkeys Dla Wszystkich Over The Wire Network Inspection Dla Nodejs'
excerpt: 'Przegląd 5 artykułów z ui.dev'
publishedAt: '2024-08-26'
slug: 'firebase-studio-fusionauth-1520-passkeys-dla-wszystkich-over-the-wire-network-inspection-dla-nodejs'
hashtags: '#generated #pl #react #nodejs #ai #performance #css'
---

## Firebase Studio

Okej, więc Google właśnie wypuścił Firebase Studio i muszę przyznać - to jest całkiem szalone. To nie jest zwykły update Firebase'a, to jest kompletnie nowa platforma do developmentu z AI agentami wbudowanymi w każdy krok procesu.

Wyobraźcie sobie - otwieracie przeglądarkę i w ciągu kilku minut, nie godzin, macie gotowy workspace. Możecie zaimportować repozytoria z GitHub'a, GitLab'a czy Bitbucket'a, albo po prostu użyć App Prototyping agenta, żeby stworzyć aplikację używając naturalnego języka. Tak, dobrze słyszycie - mówicie agentowi co chcecie zbudować i on to robi.

Ale to nie koniec. Gemini w Firebase pomaga wam z codingiem, debugowaniem, testowaniem, refaktoringiem - praktycznie wszystkim. To jest jak mieć seniora developera siedzącego obok was, tylko że ten senior nigdy nie ma złego dnia i nie pije całej kawy z kuchni.

Co mnie najbardziej kręci to fakt, że mają wbudowane Android emulatory i web preview, więc możecie testować aplikacje tak jak widzą je użytkownicy. Plus deployment jednym kliknięciem do Firebase App Hosting. To brzmi jak mokry sen każdego full-stack developera.

**Key takeaways:**
- AI-powered workspace z Gemini do wszystkich zadań developmentu
- Import z popularnych platform git plus App Prototyping agent
- Wbudowane testowanie i preview na różnych platformach
- One-click deployment z monitoringiem

[Firebase Studio](https://idx.google.com/)


Link: 

## FusionAuth 1.52.0 - Passkeys dla Wszystkich

To jest ruch, którego się nie spodziewałem. FusionAuth właśnie wypuścił wersję 1.52.0 i wiecie co zrobili? Rozdają passkeys za darmo w Community plan. TAK, ZA DARMO.

Ich reasoning jest prosty - dwadzieścia cztery miliardy skompromitowanych haseł w ciągu jednego roku. Era haseł się kończy i oni chcą przyspieszyć ten proces. Passkeys oferują bezpieczniejszą, bezhasłową metodę autentyfikacji, która redukuje ryzyko breachów i poprawia user experience.

Żeby było jasne - to nie jest jakiś ograniczony trial. Wasza darmowa licencja jest ważna na zawsze i będzie pozostawać aktywna gdy będą dodawać więcej features do Community plan.

Aktywacja passkeys jest banalna - po prostu przełączacie switch w FusionAuth UI. Mają całą dokumentację o Authentication z WebAuthn i Passkeys.

Szczerze mówiąc, to jest genialny ruch marketingowy. Dają high-value feature za darmo, co sprawia że więcej firm adoptuje lepsze praktyki bezpieczeństwa, a jednocześnie budują swoją bazę użytkowników.

**Key takeaways:**
- Passkeys teraz dostępne w darmowym Community plan
- 24 miliardy skompromitowanych haseł rocznie - czas na zmianę
- Darmowa licencja ważna na zawsze
- Prosta aktywacja przez toggle w UI

[FusionAuth 1.52.0](https://fusionauth.io/blog/announcing-fusionauth-1-52)


Link: 

## Over-the-Wire - Network Inspection dla Node.js

Ktoś stworzył bibliotekę do manipulacji pakietów sieciowych w Node.js i to jest całkiem hardcore. Over-the-wire obsługuje packet crafting, parsing, capturing network traffic i nawet tworzenie custom socket instances.

Najciekawszą częścią jest to że możecie zaimplementować traceroute używając tylko Node.js standard library i tej biblioteki. To pokazuje jak potężne są te abstrakcje.

Biblioteka wymaga libpcap, WinPcap albo Npcap - jeśli macie zainstalowanego Wiresharka, jesteście gotowi. Plus Node.js 16.10.0 lub wyższy i kompilator C++ jeśli nie ma prebuilt bindings dla waszego systemu.

Przykład pokazuje jak odkryć active default gateway, craftować i wysyłać ICMP Echo packets hop-by-hop, i capture całą wymianę do pcap/pcapng file. To jest dosyć niche, ale dla network programowania w Node.js może być game changerem.

**Key takeaways:**
- Packet manipulation library dla Node.js
- Wymaga libpcap/WinPcap/Npcap (Wireshark wystarczy)
- Obsługuje crafting, parsing, capturing i custom sockets
- Przykład implementacji traceroute w czystym Node.js

[Over-the-Wire GitHub](https://github.com/vaguue/over-the-wire)


Link: 

## Toasts są Złym UX

Max Schmitt napisał artykuł, który powinien być obowiązkową lekturą dla każdego frontend developera. Twierdzi że toasts są złym UX i ma cholernie dobre argumenty.

Główny problem z toastami to to że zawsze pojawiają się daleko od miejsca gdzie user ma swoją uwagę. Przykład z YouTube jest perfektny - klikacie "Save" po prawej stronie, modal pojawia się w środku ekranu, a toast w lewym dolnym rogu. To jest jarring experience.

Dodatkowo, toast jest opóźniony bez loading indicatora, jeśli klikacie checkbox w modalu, musicie czekać kilka sekund żeby poprzedni toast zniknął zanim dostaniecie potwierdzenie dla najnowszej akcji. A "Undo" button w toaście jest niepotrzebny bo user może po prostu kliknąć checkbox ponownie.

Max proponuje proste rozwiązanie - pokazywać playlisty bezpośrednio pod buttonem zamiast w modalu, używać loading indicatorów, a gdy indicator znika, to implikuje że akcja się zakończyła. Żadnego toasta nie potrzeba.

Jego przykłady są spot-on. Gmail pokazuje toast gdy archivujecie email, ale email znika z listy co już implikuje sukces. Copy to clipboard toast gdy button już ma confirmation. To wszystko jest redundantne.

**Key takeaways:**
- Toasts pojawiają się daleko od user attention
- Często są redundantne - akcja już daje feedback
- Lepsze rozwiązania: inline feedback, loading indicators, smart UI states
- Toast lepszy niż brak feedbacku, ale to nie usprawiedliwienie

[Toasts are Bad UX](https://maxschmitt.me/posts/toasts-bad-ux)


Link: 

## React Email 3.0

React Email właśnie wypuścił wersję 3.0 i to jest massive update. Mają teraz dwieście siedemdziesiąt tysięcy tygodniowych downloadów na npm - to jest wzrost o sto trzydzieści sześć procent od ostatniego major release siedem miesięcy temu.

Największą nowością jest brand new component library. Inspirowali się Tailwind UI i shadcn/ui - chcą zapewnić to samo experience z React Email. Stworzyli pięćdziesiąt cztery komponenty do tworzenia pięknych emaili.

Process jest prosty - idziecie na react.email/components, znajdziecie komponent który wam się podoba, widzicie preview na desktop i mobile, kopiujecie kod. Macie dwie opcje - Inline CSS albo Tailwind CSS.

Ale prawdziwy game changer to performance improvement. Zrobili benchmark starej wersji 2.1.6 przeciwko nowej 3.0.0 i wyniki są massive. P99 dla starej wersji to jedenaście tysięcy trzysta trzydzieści jeden milisekund, nowa wersja to dziewięćset siedemdziesiąt pięć milisekund. To jest jedenaście razy szybsze!

Plus support dla React 19 RC i deprecation renderAsync. Przygotowują się na przyszłość React z async rendering, Suspense i Server Components.

**Key takeaways:**
- 54 nowe komponenty inspirowane Tailwind UI/shadcn/ui
- 11x performance improvement (11331ms → 975ms P99)
- Support dla React 19 RC
- 270k tygodniowych downloadów, wzrost o 136%

[React Email 3.0](https://resend.com/blog/react-email-3)


Link: