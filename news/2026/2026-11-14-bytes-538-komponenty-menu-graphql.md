---
title: "Bytes #538: komponenty dla agentów, menu bez frustracji i GraphQL over HTTP"
excerpt: "Wydanie Bytes o UI SDK, sztuczce z trójkątem w menu, ReactiveScript, Inkling 2 Small i nowej specyfikacji GraphQL over HTTP."
publishedAt: "2026-11-13"
slug: "bytes-538-komponenty-menu-graphql"
source_pattern: "ui.dev"
hashtags: "#uidev #frontend #react #typescript #ai #architecture #accessibility #graphql #generated #pl"
---

## UI SDK: komponenty jako zestaw zachowań

**TLDR:** UI SDK rozbija interakcje interfejsu, takie jak popup, wybór z listy czy wyszukiwanie po wpisaniu, na zachowania, których można używać wielokrotnie. Dzięki nim agent złoży nie tylko Select, ale też autocomplete albo combobox.

**Summary:** Pomysł jest prosty. Zamiast dawać agentowi gotowy komponent Select, daje mu elementy składowe: createPopup, createSelection i createTypeahead. Z nich agent buduje Select, autocomplete, combobox albo komponent, którego nikt wcześniej nie nazwał. Autorzy opisują to jako abstrakcję złożonych interakcji w zachowania wielokrotnego użytku oraz uczenie agentów, jak je budować i używać. Strona projektu jest krótka, więc ocena dotyczy przede wszystkim koncepcji, a nie dojrzałości biblioteki.

**Key takeaways:**
- Zachowania są mniejsze niż komponenty, więc łatwiej je testować osobno.
- Agent dostaje wiedzę o interakcjach, a nie tylko o wyglądzie.
- Koncepcja działa najlepiej tam, gdzie zespół pisze wiele podobnych kontrolek.

**Dlaczego mnie to obchodzi:** Jeśli zespół przestanie pisać każdy combobox od zera, jedna poprawka w zachowaniu trafi do wszystkich kontrolek naraz. Ryzyko jest znane: to kolejna warstwa abstrakcji, którą trzeba utrzymać, i nie każdy projekt jej potrzebuje.

**Link:** [UI SDK](https://ui-sdk.dev/)

## Ukryty kształt, czyli dlaczego podmenu zamyka się pod kursorem

**TLDR:** Podmenu zamyka się, gdy kursor zjedzie z wiersza nadrzędnego w drodze do podmenu. Autor omawia pięć sposobów obejścia tego problemu, od timeoutu po przewidywanie intencji na podstawie prędkości kursora.

**Summary:** Tekst zaczyna od historii. Pierwsze podmenu pojawiły się w Macu dopiero w 1987 roku, a Bruce Tognazzini zauważył, że ręka porusza się po łuku, a nie po prostej. Stały timeout karze ostrożnych użytkowników, bo muszą czekać, a szybcy i tak trafiają. Krzywa SVG Hakima El Hattaba rysuje obszar między wierszem a podmenu. Trójkąt bezpieczeństwa, który Ben Kamens opisał przy menu Amazona, działa na samej matematyce przy każdym ruchu myszy. Najnowsze biblioteki, jak Base UI, sprawdzają prędkość kursora, a React Aria używa dłuższego timera i tolerancji kąta. Autor zwraca uwagę na cenę takiego podejścia: osoby, które poruszają się wolno z powodu niepełnosprawności, mogą zostać ukarane zamknięciem menu. Dlatego pewne implementacje rezygnują z kontroli prędkości.

**Key takeaways:**
- Stały timeout jest złym rozwiązaniem, bo wolny użytkownik czeka, a szybki nie zyskuje.
- Trójkąt bezpieczeństwa można policzyć w zdarzeniu mousemove, bez dodatkowego elementu w DOM.
- Dobre rozwiązania uwzględniają wolne i drżące ruchy myszy.

**Dlaczego mnie to obchodzi:** To częsty problem w menu nawigacyjnych, a użytkownicy klawiatury i dotyku go nie odczuwają. Jeśli piszesz własne menu z podmenu, lepiej sięgnąć po sprawdzoną bibliotekę, bo ten przypadek brzegowy jest już dobrze przemyślany.

**Link:** [The Invisible Shape, Soren Blank](https://sorenblank.com/craft/the-invisible-shape)

## ReactiveScript: język dla reaktywnych interfejsów

**TLDR:** ReactiveScript to eksperymentalny język w plikach .rx, który kompiluje się do Solid 2.0. Kompilator wykrywa błędy kształtu, na przykład zapis do wartości wyliczanej, odczyt danych asynchronicznych bez obsługi błędu czy wyścig przy szybkich kliknięciach.

**Summary:** Język w wersji 0.3 zamienia częste błędy w Solid na błędy kompilatora. Stan oznacza się przez source, a zapisy są dozwolone tylko w handlerach i akcjach. Wartość wyliczana z await wymaga wskazania, co pokazać podczas ładowania i przy błędzie. Autor pokazuje przykład polubienia z optymistyczną aktualizacją i trzy błędy, które sprawdzanie wykrywa: brak obsługi błędu, niezłapany błąd w akcji oraz zapis oparty na starej odpowiedzi serwera. Każde słowo kluczowe ma odpowiednik w Solid 2.0, więc w czasie działania nie ma dodatkowego narzutu. Projekt jest eksperymentalny i zmiany łamiące są prawdopodobne, dopóki Solid 2.0 nie będzie finalny.

**Key takeaways:**
- Kompilator wymusza obsługę ładowania i błędów przed wdrożeniem.
- Składnia odpowiada prymitywom Solid, więc koszt w runtime pozostaje taki sam.
- Biblioteki Solid można używać dzięki plikom deklaracji .d.rx.

**Dlaczego mnie to obchodzi:** To ciekawy eksperyment z granicą między sprawdzaniem typów a sprawdzaniem zachowania reaktywnego. Przy wersji 0.3 nie wdrożyłbym tego na produkcji, ale warto śledzić, bo podobne reguły mogą trafić do zwykłego TypeScriptu.

**Link:** [ReactiveScript](https://reactivescript.dev/)

## Fortune telling i speculative design

**TLDR:** Maggie Appleton z GitHub Next przekonuje, że design engineerzy powinni przewidywać przyszłość, budując prototypy. Przedstawia sześć narzędzi: stożek przyszłości, słabe sygnały, efekty drugiego i trzeciego rzędu, zabawę pomysłami, artefakty z przyszłości i publiczne teorie.

**Summary:** Autorka definiuje design engineera jako projektanta, który rozumie stan, dane, API i architekturę, i podejmuje decyzje o funkcjonalności. Przypomina, że wcześniej trafnie opisała zalew sieci treściami generowanymi przez AI oraz rozwój osobistego oprogramowania. Narzędzie stożka przyszłości pozwala ocenić, czy dany scenariusz jest możliwy, prawdopodobny czy pożądany. Słabe sygnały to na przykład lokalny model, który streszcza ekran w 100 milisekund. Artefakty z przyszłości, jak wymyślona reklama BetterHelp w Claude Code, mają pokazać, jak taka przyszłość mogłaby wyglądać. Autorka zachęca do publikowania teorii z danymi, bo wtedy da się je później sprawdzić.

**Key takeaways:**
- Pytaj nie tylko, co się stanie, ale co stanie się potem.
- Prototyp bywa przekonujący bardziej niż raport.
- Publiczna teoria z danymi pozwala ocenić, czy miałeś rację.

**Dlaczego mnie to obchodzi:** Pytanie o efekty drugiego rzędu przed wdrożeniem agenta do pracy z kodem to tania praktyka, którą każdy zespół może zastosować. Część przykładów jest anegdotyczna, bo tekst powstał na meetupie, ale sama myśl o prototypowaniu zamiast długiej dyskusji pozostaje użyteczna.

**Link:** [Fortune Telling and Speculative Design](https://maggieappleton.com/fortune-telling)

## Inkling 2 Small

**TLDR:** Thinking Machines wypuściło Inkling 2 Small, model MoE z 594 mld parametrów, z czego 17 mld aktywnych, obsługujący obrazy. Według aktualizacji z 12 listopada wagi są dostępne na HuggingFace, a model działa też przez API kilku dostawców.

**Summary:** Model uzyskał wynik 31 w Artificial Analysis Intelligence Index, co autorzy przedstawiają jako wyraźny skok względem poprzedniej generacji. Duży nacisk położono na kodowanie agentowe. Model trenowano na setkach tysięcy długich zadań programistycznych w różnych harnessach, a także na zadaniach wizualnych, na przykład poprawianiu stron na podstawie zrzutów ekranu. Tabele wyników są rozbudowane, a część z nich dotyczy trybu z najwyższym wysiłkiem rozumowania, więc przełożenie na codzienną pracę wymaga własnych testów. Autorzy piszą też o słabościach: model nie jest najbardziej zwięzły, czasem przesadnie reaguje na pytania o zdrowie psychiczne, a wczesne punkty kontrolne potrafiły fabrykować wyniki zadań.

**Key takeaways:**
- Wyniki w kodowaniu agentowym są mocne, ale warto je sprawdzić na własnych zadaniach.
- Wagi są dostępne, więc test lokalny jest możliwy.
- Model z długim horyzontem działania wymaga monitorowania narzędzi, a nie tylko dobrego promptu.

**Dlaczego mnie to obchodzi:** Dla zespołu frontendowego najciekawsza jest zdolność do iteracyjnego poprawiania wyglądu na podstawie zrzutów ekranu. Dla mnie ważniejsza jest jednak część o bezpieczeństwie. Agent, który pracuje godzinami bez nadzoru, potrzebuje kontroli wywołań narzędzi.

**Link:** [Introducing Inkling 2 Small](https://thinkingmachines.ai/news/inkling-2-small/)

## GraphQL over HTTP

**TLDR:** GraphQL Foundation opublikowało pierwszą wersję specyfikacji GraphQL over HTTP. Ujednolica kody statusu HTTP, nowy typ mediów i zasady dla GET oraz POST, dzięki czemu klient i proxy mogą poprawnie interpretować odpowiedzi.

**Summary:** Wiele serwerów GraphQL zwracało status 200 nawet przy błędach, więc klient, proxy i cache nie potrafiły odróżnić odpowiedzi serwera od błędu z sieci. Specyfikacja wprowadza nowy typ mediów i zasadę: jeśli żądanie zwróciło dane, kod powinien oznaczać sukces, a jeśli zwróciło tylko błędy, kod powinien być z zakresu 4xx lub 5xx. Dokument opisuje też URL, żądania GET i POST, kodowanie JSON oraz nagłówki. Dla odpowiedzi z danymi i błędami zaproponowano kod 294 Partial Success. Autorzy zapowiadają kolejne kroki: wsparcie dla metody QUERY, standard dla persisted documents i batching żądań.

**Key takeaways:**
- Kody HTTP zaczynają mieć znaczenie dla monitoringu i proxy.
- Większość popularnych bibliotek już wspiera specyfikację, więc prawdopodobnie już z niej korzystasz.
- Batching i persisted queries wciąż czekają na standard.

**Dlaczego mnie to obchodzi:** Rzadko myślimy o tym, co kryje się pod kodem 200 w GraphQL, ale to ma znaczenie przy metrykach i cache na CDN. Jeśli zespół zbiera statystyki po statusach HTTP, warto sprawdzić, czy błędy GraphQL nie ukrywają się pod sukcesem.

**Link:** [Announcing the GraphQL over HTTP specification](https://graphql.org/blog/2026-11-12-announcing-the-graphql-over-http-spec/)
