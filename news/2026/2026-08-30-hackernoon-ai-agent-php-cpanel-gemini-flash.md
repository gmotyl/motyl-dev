---
title: "Agent AI za 0 zł miesięcznie: PHP, cPanel i Gemini Flash zamiast Pythona i Dockera"
excerpt: "Tutorial pokazuje, jak zbudować działającego agenta AI z pętlą narzędzi i pamięcią konwersacji na zwykłym współdzielonym hostingu, bez Pythona, Dockera czy bazy wektorowej."
publishedAt: "2026-08-30"
slug: "hackernoon-ai-agent-php-cpanel-gemini-flash"
hashtags: "#hackernoon #php #ai #agents #mysql #backend #generated #pl"
source_pattern: "HackerNoon"
---

## Agent AI na zwykłym hostingu: PHP, MySQL i Gemini Flash zamiast całego stosu do orkiestracji

**TLDR:** Autor buduje agenta AI, który potrafi wywoływać narzędzia, pamiętać konwersację i działać w produkcji, korzystając wyłącznie z PHP, MySQL, Gemini Flash i zwykłego cPanela, bez Pythona, Dockera, Redisa czy bazy wektorowej.

**Summary:** Większość tutoriali o agentach AI zakłada, że zaczynasz od nowoczesnego stosu: Python, Docker, workery w tle, baza wektorowa i infrastruktura chmurowa gotowa pod orkiestrację. Ten artykuł idzie w drugą stronę i pokazuje, że pętlę agentową da się złożyć z pięciu prostych elementów: publicznego endpointu w PHP, który odbiera żądanie, pętli agenta wysyłającej konwersację do Gemini Flash, rejestru narzędzi opisującego dostępne funkcje, samych narzędzi w PHP wykonujących akcje takie jak zapisanie notatki czy wysłanie e-maila, oraz MySQL trzymającego historię, żeby agent pamiętał, o czym była mowa wcześniej.

Mechanika jest prosta do zrozumienia, ale wymaga dyscypliny w implementacji. Gemini nie wykonuje kodu PHP samodzielnie, tylko zwraca nazwę funkcji i argumenty, a cała odpowiedzialność za walidację i uruchomienie leży po stronie aplikacji. Autor konsekwentnie pilnuje tej granicy: każde narzędzie sprawdza swoje argumenty od nowa, nawet jeśli opis w rejestrze narzędzi już je opisuje, bo rejestr to tylko podpowiedź dla modelu, a nie substytut walidacji po stronie serwera. Historia konwersacji jest ładowana z MySQL przed każdym żądaniem i zapisywana z powrotem po nim, co w praktyce oznacza, że sesja agenta przeżywa restart serwera PHP-FPM czy nawet cały redeploy.

Pętla agenta ma limit pięciu kroków, co jest szczegółem łatwym do przeoczenia, a w praktyce ratującym budżet na API, kiedy model zapętli się w wywoływaniu narzędzi bez dojścia do finalnej odpowiedzi. Cała reszta to typowa dla PHP higiena: prepared statements przeciw SQL injection, plik .htaccess blokujący bezpośredni dostęp do folderu z narzędziami, i osobna tabela na notatki użytkownika oddzielona od surowej historii konwersacji.

Sekcja o hardeningu produkcyjnym jest równie ważna jak sam tutorial, bo autor otwarcie mówi, że wersja z artykułu nie ma autoryzacji, więc każdy, kto odkryje adres endpointu, może używać twoich narzędzi i twojego konta Gemini. Dopiero dodanie tokenu API, rate limitingu po sesji albo adresie IP i logowania wywołań narzędzi robi z tego coś, co nadaje się do prawdziwego ruchu.

**Key takeaways:**
- Agenta AI z pętlą narzędzi i pamięcią da się złożyć z samego PHP, MySQL i zwykłego cPanela, bez Pythona czy Dockera
- Gemini zwraca tylko nazwę funkcji i argumenty, walidacja i wykonanie zawsze zostają po stronie aplikacji
- Limit kroków pętli agenta chroni budżet na API, gdy model nie dochodzi do finalnej odpowiedzi
- Wersja z tutoriala nie ma autoryzacji ani rate limitingu, więc bez tego nie nadaje się do produkcji

**Why do I care:** Ten artykuł jest dobrym przypomnieniem, że "agent AI" to architektura, a nie konkretny framework czy chmura, i że każdy backend, który potrafi zrobić HTTP request i zapisać coś do bazy, może udźwignąć pętlę narzędzi. Dla zespołów utrzymujących starsze aplikacje PHP czy Laravel to konkretna, tania ścieżka do dodania funkcji agentowych bez migracji całego stosu, o ile ktoś potem faktycznie doda autoryzację i rate limiting, których w wersji tutorialowej celowo brakuje.

**Link:** [How to Build a Production-Ready AI Agent for $0/Month Using PHP, cPanel, and Gemini Flash](https://www.freecodecamp.org/news/how-to-build-a-production-ready-ai-agent-for-0-month-using-php-cpanel-and-gemini-flash/)
