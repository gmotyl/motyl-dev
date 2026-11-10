---
title: "daily.dev: WebSockety od środka, tłumacz z lokalnym LLM-em, animowany podpis w SVG i gra o DevOpsie"
excerpt: "Cztery teksty: wideo o WebSocketach w czatach na dużą skalę, rozszerzenie Sakutto tłumaczące strony lokalnym modelem, animacja podpisu w React z Motion i przeglądarkowa gra Opsville."
publishedAt: "2026-11-10"
slug: "dailydev-websockety-sakutto-svg-podpis-opsville"
hashtags: "#dailydev #frontend #webdev #react #animation #llm #devops #typescript #generated #pl"
source_pattern: "daily.dev"
---

## Jak naprawdę działają WebSockety

**TLDR:** Ponad trzygodzinne wideo pokazuje, co trzeba rozwiązać, żeby czat w czasie rzeczywistym przeżył zerwane połączenia i skalowanie na wiele serwerów. Porównuje krótkie i długie odpytywanie, Server-Sent Events i WebSockety.

**Summary:** Autor zaczyna od liczb. Ramka WebSocketa przenosi trzynastobajtową wiadomość w piętnastu bajtach, a odpytywanie HTTP dokłada do niej siedemset do ośmiuset bajtów nagłówków. To dobry argument, ale nie jedyny. Prawdziwy kłopot zaczyna się później, kiedy wiadomość musi trafić do właściwego serwera, a połączenie co jakiś czas pada.

Wideo omawia limity bezczynności, na przykład domyślne sześćdziesiąt sekund na load balancerach AWS, i pokazuje, po co są heartbeaty. Do wznawiania po zerwaniu służą numery sekwencyjne, dzięki którym klient prosi o to, czego nie dostał. Przy skalowaniu na wiele maszyn wiadomości rozchodzą się przez Redis pub/sub albo rejestr połączeń. Test obciążeniowy z filmu wycisnął z szesnastogigabajtowej maszyny około czterystu pięćdziesięciu tysięcy połączeń, a pierwsze serwery WhatsAppa obsługiwały około dwustu tysięcy każdy.

Brakuje mi tu kosztu operacyjnego. Stan połączeń jest po stronie serwera, więc każdy deploy to fala ponownych połączeń, i o tym łatwo zapomnieć, kiedy ogląda się czyste diagramy.

**Key takeaways:**
- Ramka WebSocketa jest o rzędy wielkości lżejsza niż nagłówki odpytywania.
- Heartbeaty i numery sekwencyjne są obowiązkowe, jeśli chcesz wznawiać bez gubienia wiadomości.
- Skalowanie poziome wymaga warstwy rozsyłającej, na przykład Redis pub/sub.

**Why do I care:** Jeśli budujesz czat, powiadomienia albo współdzielone edytory, to jest lista pytań, które ktoś zada ci na incydencie. Zanim wybierzesz WebSockety, zapytaj, czy Server-Sent Events nie wystarczą, bo będziesz utrzymywać mniej.

**Link:** [How WebSockets Work: Build Real-Time Apps Like a Senior Engineer](https://daily.dev/posts/Pt9pzZmo1)

## Sakutto: tłumaczenie stron lokalnym modelem

**TLDR:** Sakutto to darmowe rozszerzenie do Chrome i Firefoksa, które tłumaczy strony na urządzeniu modelem PLaMo 3 Translate. Nic nie wysyła do żadnego serwera tłumaczeń.

**Summary:** Model obsługuje pięćdziesiąt trzy języki w obie strony i działa przez przypięty build wllama, czyli w przeglądarce. Na Chrome rozszerzenie dokłada wbudowane Translator API dla jedenastu języków, których PLaMo nie zna. Firefox używa wyłącznie PLaMo. Rozszerzenie tłumaczy też tekst w trakcie pisania i ma osobną stronę do wpisywania tekstu.

Kod jest na licencji MIT, ale sam model na PLaMo Community License, więc przed użyciem komercyjnym trzeba przeczytać warunki. Autor nie podaje, ile pamięci i czasu zajmuje tłumaczenie długiej strony na słabszym laptopie, a to decyduje, czy ktoś tego naprawdę użyje.

**Key takeaways:**
- Tłumaczenie odbywa się lokalnie, bez konta i bez wysyłania treści stron.
- Chrome łączy PLaMo z wbudowanym Translator API.
- Kod ma licencję MIT, model ma osobną, ograniczającą licencję.

**Why do I care:** To dobry przykład tego, że model w przeglądarce przestał być demem. Dla aplikacji z danymi wrażliwymi, gdzie tłumaczenie po stronie serwera jest problemem prawnym, ten wzorzec jest wart sprawdzenia.

**Link:** [Open-source Chrome extension translates pages using a local LLM, no account needed](https://daily.dev/posts/x7PvNLg9J)

## Animowany podpis w SVG z użyciem Motion

**TLDR:** Siedmiokrokowy tutorial pokazuje, jak zbudować efekt odręcznego podpisu w React przy użyciu biblioteki Motion, dawniej Framer Motion.

**Summary:** Zaczyna się od prześledzenia zdjęcia podpisu jako pojedynczych linii środkowych w edytorze wektorowym, potem eksportu i czyszczenia ścieżek SVG. Komponent animuje długość ścieżki dla każdego pociągnięcia osobno, a czas każdego pociągnięcia zależy od jego zmierzonej długości, dzięki czemu pióro wydaje się poruszać ze stałą prędkością. Autor testuje też ustawienie prefers-reduced-motion, co zasługuje na uwagę, bo większość takich poradników pomija dostępność.

Jest sekcja z typowymi błędami, jak podwójne linie czy migające pełne plamy. Tekst kończy się reklamą szablonu Portfoly, który ma ten efekt gotowy, więc to trochę lejek sprzedażowy, ale technika jest rzetelnie opisana.

**Key takeaways:**
- Podpis trzeba narysować jako linie środkowe, a nie obrys.
- Czas każdego pociągnięcia powinien wynikać z jego długości.
- Obsługa prefers-reduced-motion jest częścią zadania.

**Why do I care:** Drobny efekt, ale dobrze pokazuje, jak animować ścieżki SVG bez ciężkich bibliotek. W projekcie z designem premium przyda się od ręki.

**Link:** [How to Build SVG Signature Animation in React (Motion)](https://daily.dev/posts/xD1kIwOob)

## Opsville: DevOps jako gra pixel-art

**TLDR:** Opsville to darmowa przeglądarkowa gra, w której naprawia się osiem zepsutych dzielnic miasta, każda poświęcona innemu tematowi DevOps.

**Summary:** Dzielnice to Linux, Docker, Git, CI/CD, Kubernetes, obserwowalność, bezpieczeństwo i dane. W sumie jest trzydzieści cztery zadania, a każde łączy wyzwanie w symulatorze z quizem z trzech pytań. Technicznie to Phaser 3, TypeScript i Vite, mapa leży w jednym pliku tekstowym, a całość jest statyczną stroną na Cloudflare Pages.

Najciekawsza jest część serwerowa. Punkty doświadczenia są walidowane po stronie serwera, każde zadanie liczy się graczowi raz, jest dzienny limit dwudziestu czterech zadań, a dane siedzą w istniejącej bazie Neon. Ktoś pomyślał o oszukiwaniu, co jest rzadkie w projektach hobbystycznych.

**Key takeaways:**
- Trzydzieści cztery zadania w ośmiu dzielnicach, z quizem po każdym.
- Stack to Phaser 3, TypeScript i Vite na Cloudflare Pages.
- XP jest walidowane na serwerze z limitem dziennym.

**Why do I care:** Do onboardingu juniorów to ciekawa alternatywa dla kolejnego kursu wideo. Dla mnie bardziej wartościowy jest sam przepis na tanią grę edukacyjną z walidacją po stronie serwera.

**Link:** [Opsville: A Free Pixel-Art DevOps Town in Your Browser](https://daily.dev/posts/7JebZpMUr)
