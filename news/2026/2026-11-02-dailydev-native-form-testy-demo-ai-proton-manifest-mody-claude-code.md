---
title: "Native Form bez rejestrowania pól, testy dla demo AI, manifest CTO Protona i mody Claude Code"
excerpt: "Pięć materiałów z daily.dev: biblioteka formularzy dla Reacta bez rejestracji pól, plan testów po udanym demo AI, skille Stageshow, memo CTO Protona o pracy z LLM i bezpieczne mody w Claude Code."
publishedAt: "2026-11-02"
slug: "dailydev-native-form-testy-demo-ai-proton-manifest-mody-claude-code"
hashtags: "#dailydev #react #agents #testing #ai #llm #devtools #workflow #generated #pl"
source_pattern: "daily.dev"
---

## Native Form, czyli formularze w Reakcie bez rejestrowania pól

**TLDR:** Native Form to otwartoźródłowy runtime formularzy dla Reacta, który sam znajduje pola po atrybucie name. Naciśnięcie klawisza nie powoduje ponownego renderowania wirtualnego DOM-u.

**Summary:** Autor wychodzi od irytacji, którą zna każdy, kto pisał formularze w React Hook Form albo Formiku. Każde pole trzeba zarejestrować, podpiąć i pilnować, żeby stan nie wywoływał renderów przy każdym znaku. Native Form odwraca to podejście. Używa obserwatora mutacji, który sam wykrywa pola w drzewie DOM po ich atrybucie name, więc nie ma ręcznej rejestracji.

Walidacja idzie przez resolvery dla Zod, Valibot albo Yup, a każdy z nich dokłada poniżej pięciuset bajtów. Rdzeń nie ma zewnętrznych zależności i nie jest związany z Reactem, więc w teorii działa też w czystym JavaScripcie, Vue 3, Svelte i Angularze. Przy formularzach wieloetapowych pomaga ustawienie, które zachowuje wartości pól po odmontowaniu komponentu kroku, oraz hak do kreatorów. Wersja 0.1.2 dodała obsługę suwaków zakresu i natychmiastową rewalidację checkboxów i radio.

Wszystko brzmi dobrze, ale to wersja zerowa z jednego bloga. Autor nie pokazuje porównania z React Hook Form przy dużych formularzach ani tego, co dzieje się z polami kontrolowanymi, czyli z komponentami bibliotek UI, które nie renderują zwykłych inputów. Tam obserwator mutacji może nie wystarczyć.

**Key takeaways:**
- Pola są wykrywane automatycznie po atrybucie name.
- Pisanie w polu nie wywołuje renderów.
- Resolvery schematów dodają mniej niż 500 bajtów.
- Rdzeń nie zależy od Reacta.

**Why do I care:** Pomysł jest zdrowy, bo przeglądarka od zawsze umie robić formularze, a my odbudowujemy to w JavaScripcie. Ale zanim wymienię bibliotekę w projekcie, chcę zobaczyć test z komponentami z biblioteki UI i z dostępnością komunikatów o błędach. Na razie traktuję to jako ciekawy eksperyment.

**Link:** [Stop Registering Inputs in React: Introducing Native Form](https://daily.dev/posts/IDB6iNMlL)

## Demo AI zadziałało. Co testować dalej?

**TLDR:** Udane demo asystenta AI mówi mało o tym, jak zadziała na prawdziwych danych. Autor proponuje mały arkusz oceny zbudowany z realnych zadań.

**Summary:** Demo prawie zawsze używa czystych i znajomych danych. Brudne pliki, niejednoznaczne prośby i dokumenty, które sobie przeczą, wychodzą dopiero po wdrożeniu. Dlatego tekst radzi zebrać kilka prawdziwych zadań. Prosta prośba, niejednoznaczna, pytanie bez odpowiedzi w źródłach i nieaktualny dokument. Do każdego zadania spisuje się oczekiwany wynik.

Recenzenci oceniają osobno poprawność, dowody, kompletność i następne kroki, a nie jedną ogólną notę. Pewnie brzmiąca odpowiedź może nie mieć oparcia w źródle, a link może prowadzić gdzieś, gdzie twierdzenia nie ma. Trzeba też sprawdzić granice dostępu, czyli kto widzi jakie materiały, zanim asystent dostanie szerokie uprawnienia. Błędy zapisuje się tak, żeby dało się je naprawić, a ktoś musi odpowiadać za odświeżanie zestawu testów, gdy dokumenty się zmieniają.

Najsłabszy punkt to brak liczb. Nie ma progu, po którym wypuszczamy asystenta, ani sugestii, ile zadań wystarczy. Decyzja o wydaniu jest nazwana jako osobny krok, ale zostawiona intuicji.

**Key takeaways:**
- Oceniaj poprawność i prezentację osobno.
- Dołącz pytanie bez odpowiedzi i nieaktualny dokument.
- Sprawdź uprawnienia do materiałów przed szerokim dostępem.
- Ktoś musi odświeżać zestaw testów.

**Why do I care:** To jest zwykłe testowanie, tylko z danymi z życia, i dokładnie tak powinno wyglądać w zespołach, które wdrażają asystentów. Dodałbym do tego automatyczne uruchamianie arkusza przy każdej zmianie modelu lub promptu, bo inaczej testy zestarzeją się szybciej niż dokumenty.

**Link:** [An AI demo worked. What should your team test next?](https://daily.dev/posts/KXY4r5CWw)

## Stageshow, skille do makiet interfejsu i animacji

**TLDR:** Repozytorium benjitaylor/skills zawiera skille dla agentów kodujących, zorientowane na design i ruch. Najważniejszy z nich to Stageshow.

**Summary:** Stageshow pozwala agentowi generować w Reakcie fałszywe interfejsy produktu. Chodzi o statyczne ujęcia, karty funkcji, demonstracje kursora i układy bento. W paczce są wskazówki o kompozycji i animacji, zestaw startowy, przykłady oraz narzędzia, które nagrywają wynik. Dzięki temu agent może sam sprawdzić, jak wyszła jego praca.

Ta ostatnia część jest najciekawsza. Agent, który widzi nagranie własnego wyniku, ma szansę wyłapać nałożone elementy albo źle ustawioną animację bez człowieka. Opis nie mówi jednak, jak dobrze to działa w praktyce. Nie ma przykładów porażek ani informacji, ile iteracji potrzeba.

**Key takeaways:**
- Skill generuje makiety interfejsu w Reakcie.
- Narzędzia nagrywają wynik do samodzielnej weryfikacji agenta.
- Instalacja jedną komendą przez npx skills.

**Why do I care:** Dla osób robiących strony produktowe i materiały marketingowe to oszczędność czasu. Dla architekta to głównie przypomnienie, że pętla zwrotna, czyli agent widzi swój wynik, daje lepsze rezultaty niż sama dłuższa instrukcja.

**Link:** [GitHub - benjitaylor/skills: Skills for AI coding agents](https://daily.dev/posts/0YzxmcoVy)

## Manifest AI CTO Protona

**TLDR:** Bart Butler, CTO Protona, napisał wewnętrzne memo, według którego praca inżyniera przesuwa się z pisania kodu na kierowanie modelami, które go piszą. Proton jest jego zdaniem dopiero w fazie pierwszej.

**Summary:** Butler dzieli drogę na dwie fazy. W pierwszej LLM-y przyspieszają istniejące procesy, a firma właśnie tam utknęła. W drugiej trzeba przemyśleć cały cykl wytwarzania oprogramowania, w tym CI i przeglądy kodu. Przewiduje, że większość ludzkiego code review z czasem zniknie, a dawne kompromisy dotyczące testów się zmienią, bo AI robi testy tanimi.

Tekst jest napisany pod presją. Autor powołuje się na ponad milion zwolnień w branży i sześćdziesiąt tysięcy odejść za odprawami w Microsofcie, co ma pokazać, że czasu jest mało. To dobry przykład rozumowania przez strach. Liczby zwolnień nie dowodzą, że przeglądy kodu przestaną być potrzebne.

Brakuje też odpowiedzi na najtrudniejsze pytanie. Kto odpowiada za błąd w produkcie szyfrującym dane, skoro nikt tego kodu nie przeczytał? Dla firmy sprzedającej prywatność to nie jest szczegół.

**Key takeaways:**
- Rola inżyniera zmienia się z pisania na kierowanie modelem.
- Proton uważa, że jest w fazie pierwszej, czyli przyspieszania starych procesów.
- Przewidywany koniec większości ludzkiego code review.
- Argumentacja opiera się na danych o zwolnieniach, nie na jakości kodu.

**Why do I care:** Gdy CTO publicznie mówi, że przeglądy znikną, to wiem, że ta dyskusja trafi do mojego zespołu. Przygotowałbym konkretne kryteria, kiedy człowiek dalej czyta zmianę, na przykład kod związany z autoryzacją, płatnościami i kryptografią. Reszta to dopiero temat do pomiarów.

**Link:** [LLMs are not here to help you write better code faster. Your job is to help the LLM write better code faster - Proton CTO](https://daily.dev/posts/MDGNZlY1l)

## Mody w Claude Code i pętla agenta

**TLDR:** Mody Claude Code to procedury w JavaScripcie lub TypeScripcie, które mogą przechwycić, zmienić albo zablokować zdarzenie w sesji. Autor buduje mod pytający o zgodę przed każdym wywołaniem Basha.

**Summary:** W odróżnieniu od zwykłych hooków z ustawień, mod rejestruje funkcje bezpośrednio w Claude Code. Handlery tworzą łańcuch. Wywołanie funkcji next puszcza zdarzenie dalej, przekazanie zmienionego zdarzenia je przepisuje, a zwrócenie obiektu odmowy je blokuje. Mod z przykładu zatrzymuje każde wywołanie Basha i pyta użytkownika, czy uruchomić je raz, czy anulować.

Najważniejsza uwaga dotyczy błędów. Domyślnie hook, który rzuci wyjątek przed wywołaniem next, jest pomijany, a reszta łańcucha działa dalej. Strażnik, który przepuszcza polecenie po własnej awarii, jest gorszy niż brak strażnika. Dlatego trzeba dodać obsługę błędów, która sprawdza, czy next został wywołany, a jeśli nie, zwraca odmowę. Do tego dochodzi plik z ośmioma testami Node, który sprawdza gałęzie odmowy, zgody i awarii po next, bez uruchamiania prawdziwych poleceń.

Autor uczciwie zaznacza, że mod nie jest piaskownicą. Ma dostęp do plików, procesów, sieci i sekretów, a tekstowy podgląd polecenia nie opisuje w pełni jego skutków.

**Key takeaways:**
- Mody mogą zatrzymać, zmienić lub zablokować zdarzenie.
- Awaria strażnika musi kończyć się odmową, nie przepuszczeniem.
- Testy da się napisać bez wykonywania prawdziwych komend.
- Mod nie izoluje agenta od plików ani sekretów.

**Why do I care:** Zasada fail closed jest tu wartością samą w sobie i dotyczy każdego guardrail, nie tylko Claude Code. Zespoły, które piszą własne ograniczenia dla agentów, powinny mieć test na przypadek, w którym sam strażnik się wywraca. I nie mylić zatwierdzania poleceń z bezpieczeństwem, bo prawdziwą ochroną jest dopiero izolacja.

**Link:** [How Claude Code mods change the agent loop](https://daily.dev/posts/DoQr1tzdO)
