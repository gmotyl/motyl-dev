---
title: "ChatGPT jako narzędzie do budowania stron internetowych: krok po kroku"
excerpt: "Substack The AI Break pokazuje, jak zbudować i opublikować działającą stronę internetową wyłącznie w ChatGPT, bez pisania kodu."
publishedAt: "2026-08-01"
slug: "chatgpt-buduje-strony-internetowe-tutorial"
hashtags: "#theaibreak #ai #chatgpt #chatgptsites #nocode #promptengineering #generated #pl"
---

## Jak zbudować i opublikować stronę wewnątrz ChatGPT

**TLDR:** The AI Break opisuje krok po kroku, jak zbudować kompletną stronę internetową, od briefu, przez design, aż po publikację, korzystając wyłącznie z funkcji ChatGPT Sites. Autorzy kładą nacisk na to, że jakość efektu zależy głównie od jakości briefu, nie od samego narzędzia.

**Summary:** Artykuł opisuje ChatGPT Sites, funkcję dostępną w trybie Work, przeznaczoną do tworzenia lekkich stron i aplikacji: landing page'y, portfolio, kalkulatorów, dashboardów czy wewnętrznych paneli projektowych. Uruchamia się ją komendą @sites w oknie czatu, po czym opisuje się swój pomysł na stronę zwykłym językiem. Brzmi banalnie, ale autorzy od razu zaznaczają, gdzie najczęściej ludzie się wykładają.

Największym błędem, jaki popełniają użytkownicy, jest wpisanie czegoś w stylu "zbuduj mi stronę" i oczekiwanie cudu. Taki prompt nie daje modelowi żadnego kierunku, więc efekt jest generyczny i przypadkowy. Zamiast tego, tekst proponuje najpierw wygenerować brief: zdefiniować odbiorcę strony, jej cel oraz jedną główną akcję, którą ma wykonać odwiedzający. Portfolio ma skłonić do obejrzenia prac, strona usługowa do umówienia rozmowy, landing page produktu do rozpoczęcia triala. To rozróżnienie wydaje mi się kluczowe i w praktyce często pomijane, także przy pracy z ludzkimi zespołami projektowymi, nie tylko z AI.

Do wygenerowania briefu autorzy dają gotowy prompt z rolą "website strategist and UX consultant", który każe modelowi rozpisać cel strony, odbiorcę, problem użytkownika, strukturę stron, potrzebne materiały i jedną sugerowaną funkcję interaktywną. Ciekawe jest zastrzeżenie w promptcie: "nie buduj jeszcze strony". To krok, który wymusza refleksję przed wygenerowaniem czegokolwiek, zamiast wpadania od razu w tryb "napisz mi kod". Po otrzymaniu briefu autorzy zalecają jego ręczną weryfikację, usunięcie sekcji, które nie są potrzebne, i dodanie tego, czego model nie uwzględnił. Mniejsza strona z jednym jasnym celem działa lepiej niż rozbudowana strona próbująca robić dziesięć rzeczy naraz, i to akurat pokrywa się z tym, co powtarzam klientom od lat, niezależnie od tego, czy stronę robi człowiek, czy model językowy.

Dopiero po zaakceptowaniu briefu artykuł przechodzi do właściwego budowania strony przez @Sites, z możliwością dołączenia logo, zdjęć produktów, wytycznych brandowych, istniejących treści czy linków do stron, które mają być inspiracją. Im więcej kontekstu, tym mniejsza szansa na wygenerowanie czegoś generycznego, co jest chyba najbardziej uniwersalną prawdą o pracy z każdym LLM. Materiał urywa się w momencie przekazywania drugiego promptu do właściwego budowania strony, więc nie poznajemy szczegółów dalszych kroków: poprawek designu, testowania i publikacji z żywym linkiem, choć autorzy zapowiadają je we wstępie.

**Key takeaways:**
- ChatGPT Sites (tryb Work, komenda @sites) służy do budowania lekkich stron i aplikacji bez pisania kodu.
- Zanim poprosisz model o zbudowanie strony, warto wygenerować osobny brief: cel, odbiorca, jedna główna akcja.
- Gotowy prompt z rolą "website strategist and UX consultant" wymusza refleksję przed wygenerowaniem czegokolwiek.
- Jedna jasno zdefiniowana ścieżka użytkownika działa lepiej niż strona próbująca zaspokoić wszystkie potrzeby naraz.
- Dołączenie realnych materiałów (logo, zdjęcia, brand guidelines, istniejące treści) wyraźnie podnosi jakość wygenerowanego efektu.

**Why do I care:** Sam nie buduję landing page'y na co dzień, ale ten sposób pracy z promptem, najpierw brief, potem dopiero realizacja, to dokładnie ten proces, który staram się wdrażać przy pracy z AI w code review czy przy generowaniu dokumentacji architektonicznej. Frontendowcy i architekci, którzy traktują ChatGPT jako "generator kodu na żądanie", tracą właśnie ten krok pośredni, w którym model dostaje jasny kontekst zamiast zdawkowego opisu. Nawet jeśli nigdy nie użyjecie ChatGPT Sites do produkcyjnego projektu, warto podpatrzeć tę strukturę promptu i przenieść ją do własnych narzędzi, na przykład przy generowaniu komponentów czy szkieletów stron w oparciu o design system.

**Link:** [Tutorial: Build and Publish a Website Inside ChatGPT](https://theaibreak.substack.com/p/tutorial-build-and-publish-a-website?publication_id=1842292&post_id=209231607&isFreemail=true&triedRedirect=true)
