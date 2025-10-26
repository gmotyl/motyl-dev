---
title: 'State Of Html 2023 Content State Of Html 2023 Accessibility Old Dogs New Css Tricks'
excerpt: 'Przegląd 5 artykułów z ui.dev'
publishedAt: '2024-05-30'
slug: 'state-of-html-2023-content-state-of-html-2023-accessibility-old-dogs-new-css-tricks'
hashtags: '#generated #pl #react #ai #performance #css'
---

## State of HTML 2023: Content

**Tak więc, mamy tutaj State of HTML 2023 i co się okazuje? SVG to kompletny bałagan!** Mimo że 96% respondentów używa elementu SVG, implementacje w przeglądarkach są historycznie zaniedbywane. To jest po prostu szalone - mamy technologię, której wszyscy używają, ale przeglądarki traktują ją jak pasierba.

Badanie pokazuje też ciekawe rzeczy o innych elementach HTML. Element `time` używa tylko 23% deweloperów, a `data` jeszcze mniej. Ludzie w dalszym ciągu nie wiedzą, jak robić machine-readable data w HTML-u. A internacjonalizacja? Większość używa tylko atrybutu `lang`, ale o `dir` czy elementach `ruby` już zapomina.

**Kluczowe wnioski:**
• SVG to największy pain point w HTML mimo powszechnego użycia
• Elementy semantyczne jak `time` i `data` są niedoceniane
• Internacjonalizacja ogranicza się głównie do atrybutu `lang`
• Zarządzanie obrazami i ich wymiarami to ciągły problem

**Link**: https://2023.stateofhtml.com/en-US/features/content/

Kluczowe wnioski:
- • SVG to największy pain point w HTML mimo powszechnego użycia
- Elementy semantyczne jak `time` i `data` są niedoceniane
- Internacjonalizacja ogranicza się głównie do atrybutu `lang`
- Zarządzanie obrazami i ich wymiarami to ciągły problem

Link: 

## State of HTML 2023: Accessibility

**A teraz accessibility - i tutaj jest prawdziwy dramat.** Ludzie się przejmują dostępnością, ale kompletnie nie potrafią jej implementować. Brakuje im wsparcia technicznego, edukacyjnego i organizacyjnego. To jest klasyczny przypadek "chcemy, ale nie wiemy jak".

82% respondentów myśli o użytkownikach z problemami wzroku, ale tylko 18% testuje z prawdziwymi screen readerami. Większość używa Chrome DevTools do testowania accessibility - co jest jak testowanie samochodu na symulatorze zamiast na drodze.

Największe problemy? Brak priorytetów, brak najlepszych praktyk i brak wiedzy. Czyli wszystko, co mogło pójść nie tak, poszło nie tak.

**Kluczowe wnioski:**
• Deweloperzy chcą robić accessibility, ale nie wiedzą jak
• Testowanie ogranicza się głównie do dev tools
• Brak wsparcia organizacyjnego to główna bariera
• Alt text i hierarchia informacji to podstawy, ale nie wszystkie są stosowane

**Link**: https://2023.stateofhtml.com/en-US/features/accessibility/

Kluczowe wnioski:
- • Deweloperzy chcą robić accessibility, ale nie wiedzą jak
- Testowanie ogranicza się głównie do dev tools
- Brak wsparcia organizacyjnego to główna bariera
- Alt text i hierarchia informacji to podstawy, ale nie wszystkie są stosowane

Link: 

## Old Dogs, new CSS Tricks

**Mxb.dev porusza temat, który mnie wkurza - dlaczego nie używamy nowych funkcji CSS?** Mamy Container Queries, CSS Layers, Subgrid, native nesting, i co? Nikt tego nie używa! Autor przyznaje, że sam używał tylko jednej z tych funkcji w produkcji.

Problem nie leży w support browserów - większość tych rzeczy już działa. Problem leży w naszych głowach. Mamy "new feature fatigue" i wymówki typu "muszę wspierać stare przeglądarki". 

Kiedyś border-radius był rewolucją, bo zastąpił Photoshopa i 9-slice obrazy. Teraz nowe funkcje są "niewidzialne" - poprawiają architekturę kodu, ale efekt nie jest tak oczywisty.

**Kluczowe wnioski:**
• Adopcja nowych funkcji CSS jest wolna mimo dobrego wsparcia
• Problem leży w naszym myśleniu, nie w technologii
• "Niewidzialne" ulepszenia są trudniejsze do zaakceptowania
• Progressive enhancement nie zawsze jest możliwe

**Link**: https://mxb.dev/blog/old-dogs-new-css-tricks/

Kluczowe wnioski:
- • Adopcja nowych funkcji CSS jest wolna mimo dobrego wsparcia
- Problem leży w naszym myśleniu, nie w technologii
- "Niewidzialne" ulepszenia są trudniejsze do zaakceptowania
- Progressive enhancement nie zawsze jest możliwe

Link: 

## SpeedCurve Performance Budgets

**SpeedCurve to narzędzie, które powinien używać każdy, kto się przejmuje performance.** Ich performance budgets pozwalają łamać buildy, gdy metryki przekroczą próg. To jest właśnie to, czego potrzebujemy - automatyczne blokowanie deployów, które psują wydajność.

Integrują się z CI/CD, wysyłają alerty przez email lub webhook, i mają dashboard pokazujący status wszystkich budgetów. Mogą ustawiać progi absolutne i rate-of-change - czyli nie tylko "nie więcej niż X", ale też "nie więcej niż Y% wzrostu".

Testimoniale są świetne - Unsplash używa ich do łapania regresji po nowych featurach, Financial Times ma ustawione automatyczne alerty, Walmart łapał problemy z third-party skryptami.

**Kluczowe wnioski:**
• Performance budgets mogą łamać buildy i blokować deploye
• Integracja z CI/CD jest kluczowa dla utrzymania wydajności
• Rate-of-change budgets łapią nagłe pogorszenia
• Automatyzacja jest lepsza niż manualne sprawdzanie

**Link**: https://www.speedcurve.com/features/performance-budgets/

Kluczowe wnioski:
- • Performance budgets mogą łamać buildy i blokować deploye
- Integracja z CI/CD jest kluczowa dla utrzymania wydajności
- Rate-of-change budgets łapią nagłe pogorszenia
- Automatyzacja jest lepsza niż manualne sprawdzanie

Link: 

## Astro 4.9

**Astro 4.9 wprowadza Container API - w końcu!** To pozwala renderować komponenty Astro poza aplikacją Astro, podobnie jak react-dom/server dla Reacta. Główny use case to testowanie z frameworkami jak Vitest.

Dodali też wsparcie dla React 19 RC, co oznacza, że można używać nowych form actions z Astro Actions. Plus ustabilizowali kilka eksperymentalnych funkcji.

Container API jest jeszcze eksperymentalne, ale pokazuje kierunek, w którym idzie Astro - lepsze developer experience, szczególnie w testowaniu. Mają nawet nowy template dla Vitest integration.

**Kluczowe wnioski:**
• Container API umożliwia renderowanie komponentów poza aplikacją
• Główny focus na integracji z narzędziami do testowania
• React 19 support już gotowy
• Astro dalej stawia na DX i tooling

**Link**: https://astro.build/blog/astro-490/

Kluczowe wnioski:
- • Container API umożliwia renderowanie komponentów poza aplikacją
- Główny focus na integracji z narzędziami do testowania
- React 19 support już gotowy
- Astro dalej stawia na DX i tooling

Link: