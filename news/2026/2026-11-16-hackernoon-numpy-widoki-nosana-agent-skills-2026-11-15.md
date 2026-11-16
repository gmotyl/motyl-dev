---
title: 'NumPy: widoki i kopie, agent lokalny z GPU Nosana oraz zestaw 49 skilli dla agentów'
excerpt: 'HackerNoon: cicha zmiana danych przez widoki NumPy, hybrydowy agent AI z modelem na zdecentralizowanym GPU i kolekcja Awesome Agent Skills.'
publishedAt: '2026-11-15'
slug: 'hackernoon-numpy-widoki-nosana-agent-skills-2026-11-15'
hashtags: '#hackernoon #python #ml #agents #ai #devtools #generated #pl'
source_pattern: 'HackerNoon'
---

## Dlaczego tablica NumPy zmieniła się po preprocessingu

**TLDR:** Wycinek tablicy w NumPy jest widokiem, który współdzieli pamięć z oryginałem. Operacja w miejscu na takim widoku po cichu zmienia oryginalne dane.

**Summary:** Typowy scenariusz wygląda tak: wybierasz pierwsze kolumny zbioru danych, centrujesz je przez odjęcie średniej i dopiero później zauważasz, że oryginał też jest zmieniony. Podstawowe wycinanie nie kopiuje danych, tylko tworzy nowy obiekt wskazujący na tę samą pamięć. Operatory typu odejmowania w miejscu modyfikują więc obie tablice naraz.

Autor tłumaczy różnicę między indeksowaniem podstawowym, które zwraca widok, a zaawansowanym, czyli listą indeksów lub maską logiczną, które zwraca kopię. Reshape i ravel zwracają widok, gdy to możliwe, a flatten zawsze kopiuje. Do sprawdzania służy funkcja shares_memory, a sam atrybut base nie jest kompletnym testem.

Ważne rozróżnienie dotyczy wycieku danych. To osobny problem: zdarza się, gdy informacje ze zbioru testowego wpływają na trening, na przykład przez dopasowanie skalera przed podziałem. Współdzielenie pamięci to zwykły błąd, ale daje wyniki, które wyglądają poprawnie, a są złe. Wiele transformerów scikit-learn zwraca nowe tablice domyślnie, ale ręcznie pisany kod w NumPy nie ma takiej ochrony.

**Key takeaways:**
- Nowa zmienna nie oznacza nowej pamięci.
- Operacje w miejscu na widoku zmieniają oryginał.
- Kopiowanie wszystkiego kosztuje pamięć, więc lepiej wiedzieć, kiedy widok powstaje.

**Why do I care:** To nie jest mój główny obszar, ale ten sam mechanizm znamy z frontendu: mutacja współdzielonej referencji w obiekcie czy tablicy w stanie aplikacji. Artykułowi brakuje testu, który wyłapałby takie błędy automatycznie, bo sama checklista nie zadziała w zespole.

**Link:** [Why Your NumPy Array Changed After Preprocessing (Views vs Copies in ML)](https://hackernoon.com/why-your-numpy-array-changed-after-preprocessing-views-vs-copies-in-ml)

## Lokalny agent AI z wypożyczonym GPU z Nosana

**TLDR:** Autor rozszerzył lokalnego agenta zkzkAgent tak, aby model działał na zdecentralizowanym GPU Nosana, a wszystkie narzędzia i potwierdzenia zostały u niego.

**Summary:** Agent to graf w LangGraph z osobnymi węzłami do klasyfikacji żądań, odpowiadania, planowania i wykonywania narzędzi. Lokalnie działa mały model o dwóch miliardach parametrów, który szybko odpowiada, ale słabo planuje. Model o 27 miliardach parametrów nie mieści się w pamięci laptopa, więc autor wynajmuje go z sieci Nosana.

Zasada projektowa jest prosta: do Nosana trafiają tylko wywołania modelu. Graf, routing, bramki potwierdzeń i 25 narzędzi działają lokalnie. Zdalny model może zaproponować usunięcie pliku, ale wykona to tylko maszyna autora po wpisaniu zgody. Zmiana mieści się w jednym pliku konfiguracyjnym modeli, bo API Nosana używa formatu OpenAI.

W teście agent dostał zadanie stworzenia kalkulatora z backendem FastAPI i frontendem w HTML, CSS i JavaScript. Zaplanował dziewięć kroków, po akceptacji wykonał dziesięć wywołań narzędzi, a potem poprawnie zmienił nazwę projektu w trzech miejscach. Wszystkie 18 wywołań modelu poszło do Nosana. Autor sam przyznaje luki: polecenie uruchamiania komend powłoki nie ma bramki potwierdzeń, a to ważniejsze, gdy argumenty wybiera zdalny model.

**Key takeaways:**
- Rozdzielenie modelu od narzędzi pozwala zachować kontrolę lokalnie.
- Tryb hybrydowy może trzymać wrażliwe zapytania na lokalnym modelu.
- Brakuje benchmarku, więc na razie to wrażenia, nie liczby.

**Why do I care:** Podział na „mózg zdalny, ręce lokalne" to rozsądna architektura dla agentów. Ale autor odkłada na później dokładnie to, co powinno być pierwsze: ograniczenie uruchamiania dowolnych komend. Zdalny model plus nieograniczona powłoka to luka bezpieczeństwa, a nie funkcja.

**Link:** [My Local AI Agent Needed a Bigger Brain, So I Gave It a Decentralized GPU](https://hackernoon.com/my-local-ai-agent-needed-a-bigger-brain-so-i-gave-it-a-decentralized-gpu)

## Awesome Agent Skills: 49 procedur dla agentów kodujących

**TLDR:** Kolekcja zamienia powtarzalne zadania inżynierskie, takie jak przegląd kodu, debugowanie czy audyt, w wielokrotnego użytku procedury w plikach SKILL.md.

**Summary:** Każdy skill to folder z plikiem opisującym proces i oczekiwany wynik, na przykład zweryfikowaną poprawkę, priorytetyzowany audyt albo dokumentację opartą na kodzie. Kolekcja działa z Claude Code, Codex, Gemini CLI i Cursorem. Uzupełnia pliki AGENTS.md i CLAUDE.md: te trzymają stałe reguły projektu, a skill daje metodę na konkretną robotę.

Trzy założenia wyróżniają zestaw. Ustalenia muszą mieć dowód w kodzie lub wyniku komendy, śledztwo jest oddzielone od naprawy, a raport wskazuje, czego nie dało się sprawdzić. Autor porównuje zestaw z Superpowers, kolekcją Matta Pocka, ECC, zestawem Addy Osmaniego i Trail of Bits, uczciwie zaznaczając, że gwiazdki na GitHubie mówią o widoczności, a nie o jakości.

**Key takeaways:**
- Skille uzupełniają, a nie zastępują pliki z regułami projektu.
- Wartością są konkretne raporty z dowodami.
- Brak zweryfikowanego porównania skuteczności z innymi zestawami.

**Why do I care:** Warto wypróbować jeden skill na znanym fragmencie projektu i ocenić raport. Autor jest jednak twórcą kolekcji, więc to materiał promocyjny i trzeba czytać go ostrożnie. Brakuje też kosztu: ile kontekstu i tokenów pochłania 49 procedur.

**Link:** [Awesome Agent Skills: 49 Skills for Better AI-Assisted Coding](https://hackernoon.com/awesome-agent-skills-49-skills-for-better-ai-assisted-coding)
