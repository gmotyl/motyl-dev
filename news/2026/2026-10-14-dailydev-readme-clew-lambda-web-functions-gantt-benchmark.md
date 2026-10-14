---
title: "daily.dev: README Clew 2 z modelem Jev, AWS Lambda Web Functions i benchmark wykresów Gantta"
excerpt: "Narzędzie sprawdzające zgodność README z kodem, nowy typ funkcji Lambda z zwykłym serwerem HTTP oraz benchmark producenta biblioteki Gantta."
publishedAt: "2026-10-14"
slug: "dailydev-readme-clew-lambda-web-functions-gantt-benchmark"
hashtags: "#dailydev #frontend #webdev #ai #llm #agents #aws #serverless #nodejs #react #performance #generated #pl"
source_pattern: "daily.dev"
---

## README Clew 2: model Jev etykietuje, kod sprawdza, Haiku streszcza

**TLDR:** Samotny autor zbudował w pięć dni narzędzie, które porównuje README publicznego repozytorium JavaScript lub TypeScript z jego kodem. Model Jev tylko klasyfikuje twierdzenia, pięć deterministycznych checkerów rozstrzyga, czy są prawdziwe, a Claude Haiku pisze podsumowanie wyłącznie na podstawie liczb.

**Summary:** Projekt powstał na hackathon wokół Jev, małego modelu decyzyjnego firmy TypeSafe. Jev nie generuje tekstu. Wybiera jedną etykietę z ustalonego zbioru i zwraca pewność od zera do jedynki. W tym narzędziu rozpoznaje, jakiego rodzaju twierdzenie zawiera dana linia README, na przykład o zależności, zmiennej środowiskowej albo skrypcie.

Najciekawsza jest architektura. O prawdziwości twierdzenia nie decyduje żaden model, tylko zwykły kod, który sprawdza je w repozytorium. Model językowy dostaje na końcu same liczby i nazwy, nigdy surowe linie README. Dzięki temu wstrzyknięta w README instrukcja nie ma do kogo przemawiać, co jest rozsądną obroną przed prompt injection.

Autor opisuje też koszty: 474 testy, około 40 dolarów rachunku za agenta kodującego i kilka błędów, które agent wychwycił sam. Po pierwszym uruchomieniu na własnym starym repozytorium narzędzie pokazało trzy fałszywe alarmy, między innymi przez wykrywanie obszarów roboczych w monorepo i nazwy pakietów występujące tylko w prozie. Wszystkie stały się testami regresji, a przypadki nierozstrzygalne wpadają teraz w kategorię "niemożliwe do zweryfikowania", zamiast być oznaczane jako błędne.

**Key takeaways:**
- Rozdzielenie klasyfikacji, weryfikacji i streszczenia zawęża powierzchnię ataku prompt injection.
- Przy niepewności lepiej zwracać "nie wiem" niż fałszywy zarzut.
- Mały model decyzyjny wystarcza tam, gdzie zadanie to wybór etykiety, a nie pisanie prozy.

**Why do I care:** To porządny wzorzec dla każdego, kto wpina LLM w pipeline CI lub przegląd kodu: model nie powinien widzieć niezaufanego tekstu, który potem steruje decyzją. Autor jednak pomija pytanie o to, kto weryfikuje same checkery, bo pięć deterministycznych reguł też ma swoje luki, jak pokazały jego własne fałszywe alarmy.

**Link:** [README Clew 2: Built with AdaL. Labeled by Jev. Judged by Code. Explained by Haiku.](https://daily.dev/posts/4xQTDYdUH)

## AWS Lambda Web Functions: zwykły serwer HTTP bez adapterów

**TLDR:** AWS dodał do Lambdy nowy typ funkcji, w którym kod nasłuchuje na porcie i obsługuje żądania HTTP bezpośrednio. Express, Hono, Fastify czy Next.js działają bez adapterów i przepisywania na handlery zdarzeń.

**Summary:** Dotychczasowe funkcje Lambda zostały przemianowane na Lambda Event Functions, co jest wyłącznie zmianą nazwy. Web Functions obsługują do 128 równoległych żądań w jednym środowisku, natywny streaming HTTP i łączność z VPC, a działają na Node.js 24 i architekturze Arm64. To zmienia model mentalny: zamiast jednej funkcji na jedno zdarzenie masz zwykły proces serwerowy.

Rozliczanie opiera się na aktywnym czasie procesora, a nie na całkowitym czasie wykonania. Okresy oczekiwania na bazę czy sieć kosztują więc niewiele, co pasuje do typowych serwerów HTTP, które większość czasu czekają na I/O. CloudFront może też użyć takiej funkcji jako źródła, z terminacją TLS, cache i własnymi domenami, a Origin Access Control pozwala wystawić ją tylko przez CloudFront.

Reakcje społeczności są podzielone. Część widzi bezpośrednią odpowiedź na Cloudflare Workers, Vercel Fluid Compute i Cloud Run, a część od lat powtarza, że architektura FaaS wnosi więcej złożoności operacyjnej niż kontenery lub zwykłe maszyny.

**Key takeaways:**
- Ten sam serwer HTTP da się uruchomić lokalnie, w kontenerze i w Lambdzie.
- Rozliczanie po aktywnym CPU premiuje aplikacje z dużą ilością oczekiwania na I/O.
- CloudFront jako front z ograniczeniem dostępu upraszcza ochronę przed atakami na warstwie sieci.

**Why do I care:** Dla zespołów z aplikacjami Next.js lub Hono to realne zmniejszenie vendor lock-in, bo kod przestaje być pisany pod format zdarzeń Lambdy. Trzeba jednak liczyć koszty po nowemu i sprawdzić zimne starty oraz limit współbieżności, zanim ktoś ogłosi, że to koniec kontenerów.

**Link:** [AWS Lambda Web Functions run standard HTTP servers without event handlers](https://daily.dev/posts/gFnlpPGXo)

## Benchmark wykresów Gantta przy 100 tysiącach zadań

**TLDR:** Syncfusion porównał swój React Gantt Chart z Bryntum i DHTMLX. Wyszło mu, że jest najszybszy w większości scenariuszy, ale to benchmark producenta na danych syntetycznych i jednej maszynie.

**Summary:** W teście obciążeniowym ze 100 tysiącami zadań i dziesięcioma poziomami hierarchii Syncfusion potrzebował 44,4 sekundy, DHTMLX 122,2 sekundy, a Bryntum nie zdołał wyrenderować tak dużego zbioru. DHTMLX był najszybszy przy usuwaniu zadań. Największy koszt we wszystkich bibliotekach miało przeliczanie zależności, co sugeruje, że duże sieci powiązań są trudne niezależnie od dostawcy.

Przy rozwijaniu i zwijaniu hierarchii z 50 tysiącami zadań różnice są ogromne: Bryntum potrzebował ponad sześciu sekund na rozwinięcie, a Syncfusion kilkudziesięciu milisekund. Autorzy publikują surowe wyniki i generatory danych na GitHubie i sami zalecają powtórzenie testów na własnym sprzęcie i danych.

**Key takeaways:**
- Dane syntetyczne i jedna maszyna Windows ograniczają wartość wniosków.
- Przeliczanie zależności to wąskie gardło niezależne od biblioteki.
- Warto zmierzyć własną topologię zadań przed wyborem komponentu.

**Why do I care:** Benchmark napisany przez sprzedawcę jednej z porównywanych bibliotek traktuję jako materiał do powtórzenia, nie do cytowania w uzasadnieniu decyzji. Prawdziwe pytanie, czy użytkownik naprawdę ogląda 100 tysięcy wierszy, w ogóle się tu nie pojawia, a zwykle lepszym rozwiązaniem jest wirtualizacja i paginacja po stronie serwera.

**Link:** [React Gantt Chart Performance: Which Library Handles 100,000 Tasks?](https://daily.dev/posts/S1YsJMUsD)
