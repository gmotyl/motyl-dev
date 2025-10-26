---
title: 'How We Scored 1 On Terminal Bench 52 Angular Develop With Ai Prefer Gaps To Margins'
excerpt: 'Przegląd 3 artykułów z ui.dev'
publishedAt: '2025-06-27'
slug: 'how-we-scored-1-on-terminal-bench-52-angular-develop-with-ai-prefer-gaps-to-margins'
hashtags: '#generated #pl #ai #css'
---

## How we scored #1 on Terminal-Bench (52%)

No, nie żartują sobie. Warp właśnie rozwalił Terminal-Bench z wynikiem 52%, co stawia ich ponad 20% przed następnym konkurentem. To nie jest jakiś tam benchmark hello world - to są prawdziwe, złożone zadania terminala. Naprawianie zepsutych dependencji Pythona, usuwanie kluczy API z całego codebase'a, trenowanie modeli klasyfikacji tekstu na prawdziwych danych Yelp. Brzmi jak typowy dzień w pracy, prawda?

Co mnie fascynuje, to że ich agent osiąga około 65% powodzenia w ogólnych przebiegach, ale wyniki różnią się w zależności od konfiguracji. Użyli Claude Sonnet 4 jako główny model i Claude Opus 4 do planowania - inteligencja Opus do strategii wysokiego poziomu, a szybkość Sonnet do wykonania. To jest właśnie to, o czym mówiłem - nie ma jednego modelu do wszystkiego.

Kluczowe elementy ich sukcesu: optymalny łańcuch fallback modeli, kontrola nad długotrwałymi komendami i wymuszenie na agencie prowadzenia listy todo przez cały czas trwania zadania. Terminal-Bench to nie zabawa - to prawdziwy test tego, czy AI może radzić sobie w chaotycznym środowisku shell'a.

**Key takeaways:**
- Kombinacja różnych modeli AI może być bardziej efektywna niż pojedynczy model
- Strukturalne podejście z listami todo poprawia wydajność agentów
- Terminal-based AI agents stają się realną alternatywą dla tradycyjnego developmentu

**Link:** [link](https://www.warp.dev/blog/terminal-bench)

## Angular - Develop with AI

Angular właśnie opublikował coś, co powinno było powstać rok temu - oficjalne instrukcje systemowe dla LLM do generowania kodu Angular. W końcu! Ile razy widziałem kod generowany przez ChatGPT, który używał przestarzałych wzorców Angular z 2018 roku?

Te instrukcje to prawdziwa perła. Mówią LLM żeby używał standalone components zamiast NgModules - hallelujah! Żeby NIE ustawiał `standalone: true` w dekoratorach, bo to już default. Żeby używał signals do state management, implementował lazy loading, i co najważniejsze - żeby używał nowego control flow z `@if`, `@for`, `@switch` zamiast starych dyrektyw.

Najbardziej mi się podoba, że mówią "NIE używaj `ngClass`, używaj `class` bindings". I "NIE używaj `ngStyle`, używaj `style` bindings". To są te małe rzeczy, które pokazują, że ktoś naprawdę myśli o developer experience.

Ale prawdziwy game changer to instrukcje dla services - `inject()` function zamiast constructor injection. To jest przyszłość Angular, i w końcu LLM będą generować nowoczesny kod.

**Key takeaways:**
- Framework-specific prompts dla LLM stają się standardem
- Angular promuje standalone components jako domyślne podejście
- Nowe API Angular (signals, inject()) wymagają zaktualizowanych instrukcji dla AI

**Link:** [link](https://angular.dev/ai/develop-with-ai)

## Prefer Gaps To Margins

Kyle Shevlin napisał o czymś, co powinno być oczywiste, ale najwyraźniej nie jest - dlaczego CSS gap jest lepszy niż margin. I ma rację na 100%.

Spojrzcie na ten kod z marginami - musicie ręcznie dodawać klasy, pamiętać żeby nie dodać do ostatniego elementu, a jak chcecie dodać czy usunąć element, to musicie przepisywać klasy. A potem jeszcze ta logika `idx !== items.length - 1 ? "mb-4" : ""` - to jest kod, który nie powinien istnieć.

Porównajcie to z `flex flex-col gap-4` - jeden rodzic kontroluje layout wszystkich dzieci. Chcecie zmienić z kolumny na rząd? Zmieniajcie `flex-col` na `flex-row`. Koniec. Nie ma przepisywania dziesiątek klas na dzieciach.

Kyle trafia w sedno - to jest kwestia odpowiedzialności. Czy dziecko powinno wiedzieć o swoim layoutcie względem rodzeństwa, czy rodzic powinien kontrolować layout swoich dzieci? Odpowiedź jest oczywista - rodzic powinien mieć kontrolę.

Flexbox i Grid z gap to nie tylko czytelniejszy kod, to też bardziej maintainable code. Mniej kodu, mniej błędów, więcej semantyki.

**Key takeaways:**
- CSS Gap eliminuje potrzebę ręcznego zarządzania marginami między elementami
- Layout powinien być odpowiedzialnością rodzica, nie dzieci
- Flexbox/Grid z gap są bardziej maintainable niż margin-based layouts

**Link:** [link](https://kyleshevlin.com/prefer-gaps-to-margins/)