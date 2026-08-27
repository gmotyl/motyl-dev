---
title: "ChatGPT loguje się na twoje konta, Claude wchodzi do Chrome, a Apple pokazuje krzem w dwóch nanometrach"
excerpt: "Agenty przestają tylko czytać internet i zaczynają się na nim logować, klikać oraz wypełniać formularze w twoim imieniu."
publishedAt: "2026-08-27"
slug: "chatgpt-loguje-sie-claude-w-chrome-apple-m6-2nm"
hashtags: "#theaibreak #ai #agents #security #llm #devtools #generated #pl"
source_pattern: "The AI Break"
---

## Agenty przeglądarkowe stają się standardem: ChatGPT loguje się na strony, Claude wchodzi do Chrome

**TLDR:** Wersja ChatGPT dla firm potrafi teraz zalogować się na stronę internetową i pozostać zalogowana, żeby dokończyć zadanie, przy czym twórcy zapewniają, że nigdy nie widzi ani nie przechowuje haseł. Równolegle Anthropic udostępnił Claude'a w Chrome wszystkim płatnym użytkownikom, z możliwością przeglądania, klikania i wypełniania formularzy.

**Summary:** Te dwie wiadomości ukazały się tego samego dnia i razem znaczą znacznie więcej niż osobno. Do tej pory agenty czytały internet, w najlepszym razie wypełniały jakiś formularz w piaskownicy. Teraz przekraczają granicę uwierzytelnienia. Model dostaje dostęp do sesji zalogowanego użytkownika i działa jako on, na jego uprawnieniach, w jego imieniu. To jest zupełnie inna klasa ryzyka i warto ją sobie nazwać, zanim wszyscy przyzwyczają się do wygody.

Deklaracja, że system nigdy nie widzi ani nie przechowuje haseł, jest technicznie sensowna. Prawdopodobnie polega na tym, że wprowadzanie danych logowania dzieje się poza kontekstem modelu, a agent dostaje już tylko ciasteczko sesyjne albo token. Tylko że to nie usuwa problemu, tylko go przesuwa. Sesja jest równie wartościowa jak hasło, a często bardziej, bo omija drugi składnik uwierzytelnienia. Jeśli agent działa w sesji twojego konta bankowego albo panelu administracyjnego, pytanie o hasła jest drugorzędne wobec pytania, co dokładnie może w tej sesji zrobić i kto to ograniczył.

Największym problemem tej klasy narzędzi jest wstrzykiwanie poleceń przez treść strony. Model czyta zawartość witryny i traktuje ją jako dane, ale granica między danymi a instrukcją w modelu językowym jest umowna. Wystarczy, że na stronie znajdzie się tekst udający polecenie od użytkownika, żeby agent wykonał coś, czego nikt nie prosił. Przy agencie czytającym publiczne strony to irytujące. Przy agencie zalogowanym na twoje konto to katastrofa. Żadna z tych zapowiedzi nie mówi, jak ten problem został rozwiązany, a podejrzewam, że nie został, bo nikt na świecie go jeszcze nie rozwiązał.

Reszta wiadomości z tego wydania dotyczy krzemu i jest sygnałem, dokąd zmierza infrastruktura. Apple pokazało układy w procesie dwunanometrowym oraz wariant złożony z czterech kości, obiecując do czterech i pół raza więcej mocy obliczeniowej dla sztucznej inteligencji działającej lokalnie na urządzeniu. OpenAI ogłosiło pierwsze wyniki własnego układu z opóźnieniem niższym nawet o trzy i sześć dziesiątych raza, z wdrożeniem w swoich centrach danych do końca roku. Google z kolei dodał do swojego asystenta głosowego automatyzacje wyzwalane głosem, mówione podsumowanie dnia i bezdotykową obsługę poczty.

Zwróćmy uwagę na wzorzec. Z jednej strony gigantyczne inwestycje w moc obliczeniową na urządzeniu, z drugiej wielkie inwestycje we własne układy w centrach danych. To nie jest sprzeczność, tylko podział pracy: małe modele lokalnie dla rzeczy prywatnych i szybkich, duże modele zdalnie dla wszystkiego innego. Dla nas oznacza to, że aplikacje będą musiały umieć działać w obu trybach, a to jest problem architektoniczny, którym mało kto się jeszcze zajmuje.

**Key takeaways:**
- Agenty przeglądarkowe przekroczyły granicę uwierzytelnienia i działają w sesji zalogowanego użytkownika
- Brak dostępu do haseł nie chroni przed nadużyciem samej sesji, która często omija drugi składnik uwierzytelnienia
- Wstrzykiwanie poleceń przez treść strony pozostaje nierozwiązane i przy zalogowanym agencie jest znacznie groźniejsze
- Apple stawia na moc obliczeniową lokalnie, OpenAI na własne układy w centrach danych
- Aplikacje będą musiały obsługiwać jednocześnie model lokalny i zdalny

**Why do I care:** Jako osoba odpowiedzialna za aplikacje webowe musisz od dziś zakładać, że część ruchu na twoim panelu to agenty działające w sesji prawdziwego użytkownika. To zmienia kilka rzeczy naraz. Wykrywanie botów przestaje działać, bo to legalna sesja. Ograniczanie liczby żądań trzeba przemyśleć, bo agent klika szybciej niż człowiek. Najważniejsze: destrukcyjne akcje potrzebują potwierdzenia, którego nie da się zaklikać automatycznie, i to nie jest paranoja, tylko nowy wymóg niefunkcjonalny. Jeśli twój interfejs pozwala jednym kliknięciem usunąć dane bez potwierdzenia, właśnie stał się znacznie bardziej niebezpieczny niż tydzień temu.

**Link:** [ChatGPT Can Now Log In and Do Your Work](https://theaibreak.substack.com/p/chatgpt-can-now-log-in-and-do-your)
