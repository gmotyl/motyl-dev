---
title: "Co się dzieje z odpowiedzią, którą ktoś zgadł tylko po to, żeby przejść dalej"
excerpt: "Dlaczego wymuszanie precyzyjnej odpowiedzi w formularzu, której użytkownik nie zna, produkuje dane wyglądające na pewne, choć takie nie są."
publishedAt: "2026-09-16"
slug: "unicorn-club-guessed-answers-approximate-dates-forms"
hashtags: "#unicornclub #ux #forms #accessibility #dx #generated #pl"
source_pattern: "Unicorn Club"
---

## Co się dzieje z odpowiedzią, którą ktoś zgadł tylko po to, żeby przejść dalej

**TLDR:** Artykuł o tym, co się dzieje z odpowiedzią w formularzu, którą ktoś podał tylko po to, żeby móc przejść dalej, mimo że tak naprawdę nie znał dokładnej wartości, i dlaczego warto pozwolić na przybliżone odpowiedzi zamiast wymuszać fałszywą precyzję.

**Summary:** Autor zaczyna od przykładu z wyceny ubezpieczenia domu: pytanie o wartość nieruchomości, na które ktoś wpisuje liczbę, mimo że nie wie, czy chodzi o cenę zakupu, czy o obecną wartość rynkową. Z badań Baymard wynika, że ludzie w takiej sytuacji zgadują i idą dalej, nawet jeśli ktoś inny później podejmie decyzję na podstawie tej liczby, nie wiedząc, że była zgadywana.

Drugi przykład dotyczy dat przybliżonych: kiedy zgubiłeś paszport. Jeśli formularz wymaga dnia, miesiąca i roku, a użytkownik pamięta tylko miesiąc, wpisuje pierwszy dzień miesiąca, żeby przejść dalej. Problem w tym, że ta zgadnięta wartość później wygląda identycznie jak dokładna data, zarówno na ekranie podsumowania, jak i w zapisanym rekordzie. Autor pokazuje na przykładzie brytyjskiego GOV.UK, jak formularz może zaakceptować sam miesiąc i rok, oznaczając wynik jako przybliżony zarówno dla użytkownika, jak i dla osoby, która później przegląda zgłoszenie.

Kluczowe pytanie brzmi: co właściwie potrzebuje wiedzieć system, żeby podjąć decyzję. Jeśli sprawdzasz, czy coś wydarzyło się przed konkretną datą graniczną, sam miesiąc czasem wystarczy, a czasem nie, bo zdarzenie mogło wypaść po obu stronach granicy. W tym drugim przypadku trzeba zostawić sprawę do ręcznej weryfikacji i jasno powiedzieć osobie, co dzieje się dalej, zamiast chować niepewność pod fałszywie dokładną datą.

**Key takeaways:**
- Wymuszanie precyzyjnej odpowiedzi tam, gdzie użytkownik jej nie zna, produkuje dane, które wyglądają na pewne, a takie nie są.
- Warto pozwolić na przybliżone odpowiedzi, na przykład sam miesiąc i rok, i zachować tę niepewność również w zapisanym rekordzie, nie tylko w interfejsie.
- Decyzja o tym, czy przybliżenie wystarczy, zależy od konkretnego progu decyzyjnego, a nie od ogólnej reguły.

**Why do I care:** To jeden z tych tekstów UX, które od razu przekładają się na projektowanie modelu danych, nie tylko formularza. Jeśli kolumna w bazie przechowuje tylko datę, a nie flagę "przybliżona", tracisz informację bezpowrotnie w momencie zapisu, i żadna kosmetyka interfejsu tego potem nie naprawi. Warto o tym pomyśleć na etapie projektowania schematu, a nie dopiero wtedy, gdy dział wsparcia zacznie pytać, dlaczego klienci podają dziwne daty.

**Link:** [What happens when people have to guess to finish your form?](https://unicornclub.dev/issues/2026-09-16-what-happens-when-people-have-to-guess-to-finish-your-form/)
