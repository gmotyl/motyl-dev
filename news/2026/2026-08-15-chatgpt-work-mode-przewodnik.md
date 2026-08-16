---
title: "ChatGPT Work: kompletny przewodnik po nowym trybie, który nie odpowiada, tylko wykonuje zadania"
excerpt: "OpenAI zastąpiło tryb Agent nowym trybem Work, który zamienia ChatGPT z rozmówcy w wykonawcę projektów, planującego zadania, budującego strony i tworzącego gotowe dokumenty w chmurze."
publishedAt: "2026-08-15"
slug: "chatgpt-work-mode-przewodnik"
hashtags: "#theaibreak #ai #chatgpt #openai #aiagents #automatyzacja #generated #pl"
source_pattern: "The AI Break"
---

## ChatGPT Work: gdy AI przestaje odpowiadać, a zaczyna wykonywać

**TLDR:** OpenAI wprowadziło tryb Work w ChatGPT, który zastąpił dotychczasowy tryb Agent i działa na modelach z rodziny GPT-5.6. Zamiast prowadzić rozmowę, Work przyjmuje opis celu, sam układa plan, wykonuje kolejne kroki w chmurze OpenAI i oddaje gotowy dokument, arkusz, prezentację, stronę internetową albo raport badawczy.

**Podsumowanie:** Różnica między zwykłym czatem a trybem Work jest w praktyce dość prosta do wyjaśnienia, choć jej konsekwencje są spore. Chat odpowiada na pytania. Work wykonuje zadania. Dostajesz od niego nie odpowiedź, tylko produkt: plik ze sformatowanym dokumentem, arkusz z działającymi formułami, deck slajdów zbudowany z konspektu albo, co ciekawsze, żywą stronę internetową hostowaną gdzieś w infrastrukturze OpenAI. Praca dzieje się po stronie serwera, więc zamykasz laptopa i zadanie dalej się wykonuje, czasem godzinami.

Mechanika działania jest zaskakująco rozbudowana jak na coś, co wygląda z zewnątrz jak zwykłe okno czatu. Po wysłaniu opisu celu otwiera się panel z planem wieloetapowym, który aktualizuje się na żywo w miarę wykonywania kroków. Przy większych zadaniach Work uruchamia coś w rodzaju podagentów, jeden zajmuje się researchem, inny projektowaniem, jeszcze inny sprawdzaniem wyników, i te elementy przekazują sobie zadania nawzajem. Dla stron i innych deliverabli wizualnych dochodzi podgląd na żywo w przeglądarce w chmurze, więc można zajrzeć w trakcie budowy bez przerywania procesu. Przed wrażliwymi akcjami, publikowaniem czegoś publicznie albo dostępem do konta, system zatrzymuje się i pyta o zgodę, co jest jednym z niewielu miejsc, gdzie zachowana jest realna kontrola użytkownika.

Autor tekstu kładzie duży nacisk na jedną rzecz: trzeba samemu wybrać narzędzie przed wysłaniem wiadomości, bo Work zgaduje na podstawie treści polecenia i czasem zgaduje źle. Napisanie "zbuduj mi stronę" bez wybranego narzędzia Sites potrafi skończyć się zwykłym plikiem HTML albo archiwum zip zamiast działającej, hostowanej witryny. Drugi filar dobrego użycia to jakość samego briefu. Zamiast jednozdaniowego polecenia, model potrzebuje kontekstu: kim jesteś, co dokładnie ma powstać wraz z twardymi wymaganiami, i jak wygląda dobry rezultat w twoich oczach. Przykład z przewodnika, biznes od mycia samochodów na miejscu u klienta, pokazuje to dość dobrze: opis person, listę usług, formularz kontaktowy i konkretny opis stylistyki wizualnej w jednym poleceniu.

Najbardziej wartościowy fragment tekstu to jednak ostrzeżenie, a nie instrukcja. Work potrafi zgłosić zadanie jako ukończone, mimo że jeden z elementów nie działa. Wygładzony, dopracowany wizualnie arkusz z błędną formułą jest bardziej niebezpieczny niż surowy szkic, właśnie dlatego że estetyka usypia czujność i skłania do pominięcia weryfikacji. Rekomendacja z artykułu, żeby kazać modelowi samemu przetestować formularz i pokazać dowód działania, jest sensowna, ale też pokazuje, że odpowiedzialność za jakość końcowego produktu wciąż spoczywa na człowieku, niezależnie od tego, jak dużo pracy wykonał za niego system.

**Kluczowe wnioski:**
- Tryb Work zastąpił tryb Agent w ChatGPT i działa na modelach GPT-5.6, wykonując zadania w chmurze OpenAI zamiast prowadzić rozmowę.
- Ręczny wybór narzędzia (dokument, arkusz, slajdy, strona, research) przed wysłaniem polecenia eliminuje najczęstszy błąd, czyli otrzymanie złego typu pliku wynikowego.
- Jakość briefu decyduje o jakości rezultatu bardziej niż w zwykłym czacie, bo model podejmuje setki drobnych decyzji bez dodatkowych pytań.
- Work potrafi zgłosić zadanie jako gotowe, mimo że fragment nie działa poprawnie, więc każdy formularz, link i formułę trzeba sprawdzić ręcznie przed przekazaniem dalej.

**Dlaczego mnie to obchodzi:** Z perspektywy kogoś, kto na co dzień odpowiada za jakość kodu i architekturę, ten model delegowania budzi mieszane uczucia. Z jednej strony podoba mi się pomysł na plan, który można zatwierdzić przed wykonaniem, to jest dokładnie ten sam instynkt, który mamy przy code review, tylko przesunięty na etap przed napisaniem kodu. Z drugiej strony ostrzeżenie o polerowanym, ale błędnym rezultacie brzmi znajomo z każdego projektu, w którym ktoś wdrożył wygenerowany kod bez przeczytania go w całości. Strona zbudowana w Sites czy arkusz z formułami wygenerowany przez Work to w praktyce czarna skrzynka produkcyjna, którą ktoś kiedyś będzie musiał utrzymać, i podejrzewam, że wielu ludzi zignoruje etap testowania właśnie dlatego, że wynik wygląda gotowo. Mechanizm zgód przed wrażliwymi akcjami to dobry kierunek, ale to za mało, jeśli firmy zaczną traktować takie narzędzia jako zamiennik dla realnego procesu QA, a nie jako pierwszy szkic do przejrzenia.

**Link:** [☕🤖 Tutorial: How to Use ChatGPT's New Work Mode (The Complete Beginner's Guide)](https://theaibreak.substack.com/p/tutorial-how-to-use-chatgpts-new?publication_id=1842292&post_id=211163073&isFreemail=true&triedRedirect=true)
