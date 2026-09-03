---
title: "Jeśli zmienię tę wartość domyślną, co jeszcze się zmieni?"
excerpt: "Unicorn Club o tym, dlaczego pokazywanie samej wartości ustawienia nie wystarcza i czemu interfejs powinien ujawniać, skąd ta wartość pochodzi, zanim ktoś zmieni domyślne zachowanie na poziomie workspace'u."
publishedAt: "2026-09-02"
slug: "unicorn-club-if-i-change-this-default-what-else-changes"
hashtags: "#unicornclub #ux #product #dx #generated #pl"
source_pattern: "Unicorn Club"
---

## Jeśli zmienię tę wartość domyślną, co jeszcze się zmieni?

**TLDR:** Autor pokazuje na przykładzie przełącznika powiadomień w workspace, że sama wyświetlana wartość ustawienia to za mało. Bez informacji, skąd ta wartość pochodzi, użytkownik nie ma szans przewidzieć, co się stanie, gdy zmieni ustawienie nadrzędne.

**Summary:** Punktem wyjścia jest prosty scenariusz: zmieniasz domyślne powiadomienia w workspace z włączonych na wyłączone, a tydzień później okazuje się, że jeden projekt nadal je wysyła. Pierwsza reakcja to podejrzenie, że zmiana się nie zapisała. Prawda jest bardziej niepokojąca: jeden projekt mógł mieć własne ustawienie, inny mógł być włączony tylko dlatego, że dziedziczył wartość z workspace'u, a trzeci mógł być zablokowany przez politykę organizacji. Zmiana na poziomie workspace'u zadziałała dokładnie tak, jak zaprojektowano, a mimo to pierwszy projekt dalej robi swoje. Przed zmianą wszystkie trzy wyglądały identycznie, jako po prostu włączone, bez żadnego śladu tego, skąd ta wartość pochodzi.

Autor przywołuje znajomy z życia przykład uprawnień w Chrome dla kamery, mikrofonu czy powiadomień. Strona może mieć własne ustawienie nadpisujące domyślne zachowanie przeglądarki, a opcja „Zresetuj uprawnienia” nie ustawia wartości na to, co akurat mówi domyślne ustawienie przeglądarki, tylko usuwa wyjątek strony, żeby znowu zaczęła podążać za tym ustawieniem. To rozróżnienie jest kluczowe: wartość mówi, jak jest teraz, a źródło mówi, co się stanie, kiedy zmieni się rodzic.

Gdy źródło zostanie pokazane obok wartości, przycisk „Resetuj do workspace'u” zaczyna mieć sens, bo nie ustawia projektu na to, co workspace mówi dzisiaj, tylko usuwa wyjątek, żeby projekt znowu podążał za wartością nadrzędną. Azure SRE Agent robi to w mniejszej skali, oznaczając ustawienia jako odziedziczone albo niestandardowe. Autor idzie o krok dalej: jeśli wiersz jest zablokowany, nie wystarczy pokazać wyłączonego przełącznika, trzeba wskazać, gdzie faktycznie znajduje się kontrola, i dać sposób, żeby się tam dostać.

Ostatnia część proponuje podgląd zmiany przed jej zapisaniem: jeśli siedem projektów podąży za nową wartością, dwa mają własne ustawienie, a jeden jest kontrolowany przez politykę, warto pokazać to obok głównego przełącznika, zanim ktokolwiek kliknie zapisz. Autor zastrzega, że to nie jest rozwiązanie do stosowania przy każdym ustawieniu, bo łatwo w ten sposób przeładować interfejs. Chodzi o zasadę: gdy wartość może pochodzić skądinąd, z workspace'u, innego rodzica albo polityki, relacja powinna być widoczna, a niestandardowa wartość nie jest automatycznie błędem tylko dlatego, że różni się od rodzica.

**Key takeaways:**
- Sama wartość ustawienia to za mało, użytkownik potrzebuje wiedzieć, skąd ta wartość pochodzi, żeby przewidzieć skutki zmiany rodzica.
- „Resetuj do domyślnych” powinno usuwać wyjątek, a nie kopiować aktualną wartość rodzica, inaczej zamienia tymczasową regulację w trwałe przypięcie bez wyjścia.
- Podgląd „co się zmieni, co zostanie bez zmian” przed zapisaniem ustawienia na poziomie nadrzędnym pomaga uniknąć niespodzianek po fakcie.

**Why do I care:** Ten wzorzec pojawia się w praktycznie każdym systemie z ustawieniami wielopoziomowymi, od feature flagów po konfigurację CI, i regularnie widzę zespoły, które budują ekran ustawień skupiony wyłącznie na aktualnej wartości, zapominając o pochodzeniu. Kosztuje to później godziny debugowania „dlaczego to ustawienie się nie zmieniło”, a rozwiązanie jest relatywnie tanie: jedno dodatkowe pole w modelu danych i jeden dodatkowy element UI obok przełącznika.

**Link:** [If I change this default, what else is going to change?](https://unicornclub.dev/issues/2026-09-02-if-i-change-this-default-what-else-is-actually-going-to-change/)
