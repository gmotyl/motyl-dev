---
title: "Przyciski kontra linki, useActionState i mit 10x DevRel"
excerpt: "Trzy teksty z HackerNoon o tym, jak HTML wciąż nie radzi sobie z prostym rozróżnieniem przycisku i linku, jak React 19 upraszcza obsługę formularzy przez useActionState, i czym naprawdę jest bycie 10x w Developer Relations."
publishedAt: "2026-08-06"
slug: "przyciski-linki-useactionstate-10x-devrel"
hashtags: "#HackerNoon #HTML #React #WebDev #DevRel #generated #pl"
source_pattern: "HackerNoon"
---

## Dlaczego przycisk nie jest linkiem, choć wygląda jak link

**TLDR:** Autor projektu Triptych wyjaśnia, czemu HTML potrzebuje atrybutów action i method na przycisku. Bez tego web deweloperzy od lat obchodzą ograniczenie, robiąc z linków przyciski i odwrotnie, co psuje dostępność i podstawowe zachowania przeglądarki.

**Summary:** Różnica między linkiem a przyciskiem wydaje się banalna, dopóki nie zaczniesz się zastanawiać, czemu w ogóle istnieje. Link reprezentuje miejsce, do którego można przejść, przycisk reprezentuje akcję do wykonania w bieżącym kontekście. Z tego jednego rozróżnienia wynika cała gama zachowań, których nikt nie zauważa, dopóki nie zabraknie ich tam, gdzie powinny być: środkowy klik otwierający nową kartę, podglądanie adresu po najechaniu, menu kontekstowe z opcją zapisania czy skopiowania. Przeglądarki dostały te funkcje za darmo, bo semantyka linku zakładała, że miejsce docelowe można oderwać od bieżącego widoku. Przyciski tego nie mają, i nie jest to przeoczenie, to świadoma decyzja projektowa.

Problem zaczyna się tam, gdzie autorzy stron potrzebują przycisku, który wykonuje nawigację, na przykład przycisku "Zapisz jako szkic" albo "Usuń", ale HTML bez JavaScriptu daje im do tego tylko formularze z metodami GET i POST, żadnych DELETE ani PATCH. W efekcie połowa systemów projektowych na świecie, łącznie z oficjalnym US Web Design System, robi z linku przycisk za pomocą klasy CSS, żeby ominąć tę dziurę. Wygląda jak przycisk, ale w czytniku ekranu albo w widoku reader mode wciąż zachowuje się jak link, bo semantyka nigdy się nie zmieniła, zmienił się tylko wygląd.

Propozycja Button Actions rozwiązuje to naprawdę prosto: dodaje do przycisku atrybuty action i method, analogiczne do tych, które formularz ma od dekad. Dzięki temu przycisk może wywołać żądanie sieciowe i odświeżyć bieżący widok bez ani jednej linijki JavaScriptu, a jednocześnie nie udaje linku, którym nie jest. Autor podaje przykład edycji komentarza z przyciskami Zapisz, Zapisz szkic, Anuluj i Usuń, gdzie każdy z nich ma dokładnie taką semantykę, jaką powinien mieć, bez żadnych sztuczek.

To, co mnie w tym tekście przekonuje, to argument o HackerNews i głosowaniu na linkach zamiast na przyciskach. To jest dokładnie ten rodzaj kompromisu, który każdy z nas robił choć raz, wiedząc, że to źle, ale nie mając lepszej opcji bez JavaScriptu. Cały ten wywód nie jest czepianiem się szczegółów, to opis prawdziwej dziury w standardzie, która od lat zmusza ludzi do wybierania między poprawną semantyką a wygodą implementacji.

**Key takeaways:**
- Link reprezentuje miejsce docelowe, przycisk reprezentuje akcję w bieżącym kontekście, i to rozróżnienie determinuje mnóstwo zachowań przeglądarki, których nikt nie projektuje ręcznie.
- Ostylowanie linku jako przycisku (tak jak robi to USWDS) nie zmienia jego semantyki, więc w czytnikach ekranu i reader mode wciąż zachowuje się jak link.
- Propozycja Button Actions dodaje atrybuty action i method do przycisku, umożliwiając nawigacje typu POST czy DELETE bez formularza i bez JavaScriptu.
- Cały projekt Triptych ma dać autorom stron sposób na modelowanie pełnego cyklu CRUD czystym HTML-em.

**Why do I care:** Jako ktoś, kto od lat patrzy na to, jak zespoły frontendowe budują własne systemy projektowe, widzę ten problem praktycznie w każdym projekcie: link ostylowany na przycisk, bo komponent Button w bibliotece nie wspiera nawigacji, albo przycisk z onClick, który robi window.location, bo formularz był "za ciężki". Button Actions nie jest rewolucyjną nowością, to raczej domknięcie dziury, która istnieje od początku HTML-a i którą każdy projekt UI omija po swojemu. Jeśli to wejdzie do standardu, część naszych workaroundów po prostu przestanie być potrzebna, a to jest rzadka okazja, żeby kod stał się prostszy, a nie bardziej skomplikowany.

**Link:** [The Difference Between a Button and a Link](https://hackernoon.com/p/8-5-2026-newsletter)

## useActionState w React 19: koniec ręcznego składania stanu formularza

**TLDR:** useActionState łączy stan wyniku, flagę ładowania i funkcję akcji w jeden hook powiązany z atrybutem action formularza. Działa bez frameworka, ale ma pułapki: kolejkowanie wywołań, brak wbudowanego resetu i różnicę względem useOptimistic, którą łatwo pomylić.

**Summary:** Każdy, kto pisał formularze w React przed wersją 19, budował ten sam zestaw trzech zmiennych stanu: wynik, flagę isSubmitting i błąd, a potem pilnował, żeby finally zawsze zresetowało to, co trzeba. useActionState zabiera tę powtarzalną pracę i wiąże funkcję akcji prosto z atrybutem action formularza albo formAction przycisku. W zamian dostajesz stan, flagę isPending zsynchronizowaną z transition Reacta i opakowaną funkcję akcji, którą przekazujesz dalej. Nie jest to coś ekskluzywnego dla Server Actions, działa równie dobrze w czysto klienckiej aplikacji, progressive enhancement to tylko dodatkowa warstwa, która zależy od tego, czy framework wspiera renderowanie po stronie serwera.

Najciekawsza część artykułu to nie sama definicja API, a opis tego, co ludzie robią źle w produkcji. Najczęstszy błąd to trzymanie się starego przyzwyczajenia i blokowanie przycisku lokalną flagą zamiast isPending, co na wolniejszym połączeniu potrafi się cofnąć zanim prawdziwe żądanie się zakończy, i użytkownik zdąży kliknąć kilka razy więcej niż chciał. React nie odrzuca tych kliknięć, kolejkuje je i wykonuje po kolei, więc jeśli ktoś kliknie "dodaj do koszyka" pięć razy, dostanie pięć pozycji, każdą przetworzoną osobno. To nie jest race condition w bazie danych, to zupełnie inny problem, i dopóki nie przeczytasz tego akapitu, łatwo go przeoczyć.

Drugi wątek, który autor rozkłada na czynniki pierwsze, to różnica między useActionState a useOptimistic. Jeśli formularz czeka na odpowiedź serwera i wtedy aktualizuje UI, useActionState jest właściwym narzędziem. Jeśli chcesz, żeby interfejs zmienił się natychmiast po kliknięciu, jeszcze przed odpowiedzią, na przykład przy polubieniu posta albo zaznaczeniu checkboxa na liście zadań, useActionState będzie zawsze o krok za wolny, i wtedy trzeba sięgnąć po useOptimistic. Autor zwraca też uwagę na coś, co brzmi jak drobiazg, ale potrafi zepsuć cały formularz: jeśli funkcja akcji rzuci wyjątek zamiast zwrócić stan błędu, React odrzuca wszystkie kolejne wywołania czekające w kolejce, a błąd wypływa do najbliższego error boundary, więc cały formularz może po prostu zniknąć.

Podoba mi się, że tekst wprost mówi, czego useActionState nie robi: nie czyści się sam po poprawieniu błędu, nie ma wbudowanego reset, i nie nadaje się do wieloetapowych formularzy typu wizard, gdzie kontrolujesz stan pól ręcznie na każdym kroku. To jest dokładnie ten rodzaj szczerości w dokumentacji technicznej, którego zwykle brakuje, bo łatwiej opisać, co hook robi, niż uczciwie powiedzieć, gdzie się kończy jego użyteczność.

**Key takeaways:**
- useActionState zastępuje ręczne trzy zmienne stanu (wynik, isSubmitting, błąd) jednym hookiem powiązanym z action formularza.
- Wielokrotne kliknięcia nie są odrzucane, tylko kolejkowane i wykonywane po kolei, więc blokowanie przycisku przez isPending zapobiega niezamierzonym duplikatom, a nie race condition.
- Jeśli funkcja akcji rzuci wyjątek zamiast zwrócić strukturę błędu, React czyści całą kolejkę czekających wywołań i błąd trafia do error boundary.
- Do natychmiastowej aktualizacji UI przed odpowiedzią serwera (like, checkbox) potrzebny jest useOptimistic, nie useActionState.
- Hook nie ma wbudowanego resetu stanu i nie nadaje się do wieloetapowych formularzy z ręcznie kontrolowanymi polami.

**Why do I care:** Ten hook dobrze pokazuje, w którym miejscu React 19 faktycznie oddaje coś wartościowego zespołom frontendowym, a nie tylko dorzuca kolejną warstwę abstrakcji. Ręczne składanie stanu formularza to jeden z tych fragmentów kodu, które każdy pisał dziesiątki razy i każdy pisał je odrobinę inaczej, co utrudnia code review i onboarding nowych ludzi w zespole. Ujednolicenie tego jednym hookiem, który dodatkowo poprawnie obsługuje kolejkowanie kliknięć, to konkretna korzyść w codziennej pracy, nie tylko w benchmarkach. Jedyne, na co bym uważał, to kuszenie się do używania useActionState wszędzie, gdzie jest formularz, nawet tam, gdzie zwykłe useState wystarczy i jest po prostu łatwiejsze do przeczytania.

**Link:** [React 19 useActionState Explained](https://hackernoon.com/p/8-5-2026-newsletter)

## Czym naprawdę jest 10x DevRel

**TLDR:** Autor przenosi mit "10x engineera" na Developer Relations i dochodzi do wniosku, że jedyna realistyczna forma bycia 10x to pomnażanie innych ludzi, nie własnej produkcji. Prawdziwy multiplikator to mentoring i oddawanie mikrofonu, nie pisanie dziesięć razy więcej postów.

**Summary:** Mit 10x engineera od dawna budzi te same pytania: czy to znaczy dziesięć razy więcej kodu, dziesięć razy szybciej, czy dziesięć razy wyższej jakości. Autor, który pracuje w Developer Relations od jedenastu lat, zaczyna od uczciwego przyznania, że ludzie, których pamiętamy jako genialnych, też popełniali błędy, też się zacinali, tylko robili coś inaczej po tym, jak coś nie zadziałało. Cytuje znajomego, który już w 2019 roku ujął to najprościej: prawdziwy 10x engineer to ten, kto podnosi produktywność całego zespołu dziesięciokrotnie, mentorując, dzieląc się wiedzą i podciągając dziesięciu innych do swojego poziomu. Jedyny realistyczny sposób, żeby wydobyć z kogoś dziesięć razy więcej, to dać mu przestrzeń, w której powtórzy to, co ty umiesz.

Przenosząc to na DevRel, autor zauważa coś, czego nie ma w typowej dyskusji o 10x engineerach: DevRel rzadko pracuje w zespole innych DevReli. W wielu firmach jest jeden, sam, i fizycznie nie może napisać dziesięć razy więcej postów, nagrać dziesięć razy więcej filmów, dotrzeć do dziesięć razy większej publiczności. Skalowanie przez własną produkcję jest dla niego zamknięte z definicji. Więc pytanie, jak ta jedna osoba może stać się dziesięciokrotnie skuteczniejsza, ma inną odpowiedź niż dla inżyniera z zespołem wokół siebie.

Odpowiedź, do której dochodzi, jest prosta i trochę niewygodna: zaczyna się od uznania, że każdy człowiek w firmie jest bohaterem własnej historii i wielu z nich chciałoby ją opowiedzieć, tylko nie wie jak, albo brakuje mu czasu, języka, pewności siebie albo po prostu platformy. Rola Advocate'a to robić wewnątrz firmy to samo, co robi na zewnątrz dla klientów: słuchać, zachęcać, pomagać wypełnić te braki, czasem współautorstwem, czasem coachingiem, czasem po prostu obiecując nie przestać pomagać, dopóki historia nie będzie gotowa do opowiedzenia.

Ostatnie zdanie tekstu zmienia pytanie z "czy jesteś 10x DevRel" na "czemu nie jesteś", i to jest chwyt retoryczny, który akurat działa, bo cała reszta artykułu uczciwie pracuje na to pytanie, zamiast rzucać sloganem na wstępie.

**Key takeaways:**
- Mit 10x engineera nie polega na tym, że dana osoba robi więcej, tylko na tym, że podnosi produktywność całego zespołu przez mentoring i dzielenie się wiedzą.
- DevRel zwykle działa jako jedna osoba w firmie, więc skalowanie przez zwiększenie własnej produkcji treści jest niemożliwe z definicji.
- Realny multiplikator dla DevRel to znajdowanie historii w ludziach z organizacji i pomaganie im je opowiedzieć, nie zwiększanie liczby własnych publikacji.
- Bariery, które blokują ludzi przed opowiedzeniem własnej historii, to zwykle czas, język, pewność siebie i brak platformy, a rola Advocate'a to je usuwać.

**Why do I care:** Ten tekst dotyka czegoś, co widzę też po stronie inżynierskiej: firmy chcą "10x" w rozumieniu więcej pull requestów, więcej commitów, więcej ficzerów na sprint, i pomijają to, że najbardziej wartościowi ludzie w zespole rzadko są najbardziej produktywni w wąskim sensie, są ci, którzy podnoszą poziom innych. Jeśli jesteś senior developerem albo architektem, twoja własna linia kodu przestaje być głównym źródłem wartości dawno przed tym, jak zaczniesz to sobie uświadamiać, a prawdziwa różnica, jaką robisz, to ile osób wokół ciebie staje się lepszymi programistami dzięki temu, że z tobą pracowały. Ten artykuł mówi to samo o DevRel, ale przekłada się na frontend, backend i każdą inną dyscyplinę bez zmiany ani jednego słowa.

**Link:** [What It Really Means to Be a 10x DevRel](https://hackernoon.com/what-it-really-means-to-be-a-10x-devrel)
