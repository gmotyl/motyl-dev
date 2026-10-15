---
title: "daily.dev: TanStack Start 1.0, wirtualizacja mimo Fiber i Lanes oraz Secure by Design w oprogramowaniu płatniczym"
excerpt: "TanStack Start jest stabilny, React nadal potrzebuje wirtualizacji dużych list, a mockowanie HTTP w PHP i wzorzec entity relay porządkują testy i domenę."
publishedAt: "2026-10-15"
slug: "dailydev-tanstack-start-stable-fiber-virtualizacja-secure-by-design"
hashtags: "#dailydev #frontend #react #performance #architecture #testing #php #generated #pl"
source_pattern: "daily.dev"
---

## TanStack Start jest stabilny i działa na Appwrite Sites

**TLDR:** TanStack Start osiągnął wersję 1.0 13 października 2026, więc zespół zobowiązuje się do stabilnego API. Appwrite Sites od razu go obsługuje.

**Summary:** Wersja 1.0 oznacza obietnicę stabilności interfejsów w produkcji. Framework oferuje typowane routowanie, tryb renderowania ustawiany osobno dla każdej trasy i typowane funkcje serwerowe. Według własnych benchmarków zespołu przepustowość SSR jest około pięć i pół raza wyższa.

Appwrite Sites buduje aplikacje przez Vite 8 i serwuje z jednego wdrożenia trasy renderowane po stronie serwera, funkcje serwerowe i trasy API. Tekst opisuje wdrożenie z repozytorium albo ze startera oraz aktualizację istniejącej aplikacji. Przy aktualizacji trzeba uważać na przejście na Vite 8 i zmianę nazwy metody walidatora, bo stara jest oznaczona jako przestarzała.

**Key takeaways:**
- Wersja 1.0 daje gwarancję stabilności API.
- Deployment z Vite 8 obejmuje SSR, funkcje serwerowe i API w jednym miejscu.
- Migracja wymaga zmiany nazwy metody walidatora.

**Why do I care:** Dla zespołów, które czekały z TanStack Start na etykietę "stable", to sygnał, że można go rozważać poważnie. Liczby o szybkości SSR pochodzą od autorów, więc warto je zmierzyć na własnej aplikacji przed decyzją.

**Link:** [TanStack Start is stable and it runs on Appwrite Sites](https://daily.dev/posts/nibA009sm)

## Jeśli React ma Fiber i Lanes, po co nam wirtualizacja?

**TLDR:** Fiber, Lanes i Scheduler decydują, kiedy React wykonuje pracę w JavaScript, ale nie zmniejszają liczby węzłów DOM. Dlatego długie listy nadal trzeba wirtualizować.

**Summary:** Lista z pięćdziesięcioma tysiącami wierszy tworzy pięćdziesiąt tysięcy prawdziwych węzłów. Koszt montowania, layoutu, malowania, pamięci i przewijania rośnie z ich liczbą, niezależnie od tego, jak uprzejmie praca jest zaplanowana. Biblioteki takie jak react-window i @tanstack/react-virtual trzymają zamontowany tylko mały wycinek wierszy, zwykle od dwudziestu do pięćdziesięciu.

Autor wspomina też CSS-ową właściwość content-visibility z wartością auto. Pomija ona layout i malowanie elementów poza ekranem, ale nie zmniejsza kosztu montowania ani pamięci, więc to lżejsza opcja dla średnio długich list. Wniosek tekstu: współbieżne renderowanie i wirtualizacja się uzupełniają. Wirtualizacja zmniejsza problem, a Lanes planują resztę pracy. Nawet przy wirtualizacji filtrowanie dużego zbioru nadal kosztuje procesor, więc przejście przez startTransition zachowuje responsywność pola wyszukiwania.

**Key takeaways:**
- Scheduler nie zmniejsza liczby węzłów DOM.
- Wirtualizacja obcina koszt montowania, pamięci i layoutu naraz.
- content-visibility to półśrodek, a startTransition nadal się przydaje.

**Why do I care:** To zdrowa korekta mitu, że React 18 i nowsze "załatwiają" wydajność list. Brakuje tu liczb: kiedy wirtualizacja zaczyna się opłacać, a kiedy psuje dostępność i wyszukiwanie w przeglądarce. Przy tabelach z komórkami o zmiennej wysokości koszt pomiarów bywa większy niż zysk.

**Link:** [If React Already Has Fiber and Lanes, Why Do We Still Need Virtualization?](https://daily.dev/posts/9KMniE7Eg)

## Secure by Design w oprogramowaniu do pieniędzy

**TLDR:** Inżynier płatności czerpie z książki Secure by Design dwa wzorce: entity relay i unikanie typów prymitywnych dla wartości domenowych.

**Summary:** Autor nie zgadza się z tezą, że bezpieczeństwo da się wbudować w większość oprogramowania bez kosztu. Uważa jednak, że wzorce z książki pasują do systemów finansowych, które nie mogą być "prawie poprawne". Entity relay modeluje encję jako ciąg osobnych klas, po jednej na fazę cyklu życia, zamiast jednej klasy ze zmiennym statusem. Gdy faza się kończy, instancja jest zastępowana następnym typem, co eliminuje rozsiane instrukcje warunkowe po polu statusu. Działa najlepiej przy wielu jednokierunkowych stanach bez pętli.

Drugi pomysł to rezygnacja z gołych typów wbudowanych dla identyfikatorów. Jeśli identyfikator auta i kierowcy to oba int, zamiana argumentów kompiluje się i przechodzi code review niezauważona. Osobne typy sprawiają, że łapie to kompilator.

**Key takeaways:**
- Każda faza życia encji to osobny typ.
- Identyfikatory domenowe zasługują na własne typy.
- Wzorzec nie pasuje do encji z cyklami stanów.

**Why do I care:** W TypeScripcie to samo osiągniemy branded types, a to tania ochrona przed błędami argumentów. Autor pomija koszt: więcej typów i konwersji na granicach systemu, które w dużych zespołach często kończą się obejściami.

**Link:** [How to Apply Secure By Design Practices To Money Software](https://daily.dev/posts/F1AHRXvwa)

## Mockowanie żądań HTTP w testach PHP

**TLDR:** Poradnik omawia MockHandler w Guzzle oraz Http::fake w Laravelu i radzi owinąć zewnętrzne klienty HTTP własnym interfejsem.

**Summary:** Testy zależne od sieci są niestabilne, więc tekst pokazuje, jak symulować odpowiedzi, timeouty i błędy 500. Dla czystego Guzzle służą MockHandler, HandlerStack i middleware z historią żądań. W Laravelu są helpery Http::fake, Http::sequence i Http::assertSent. Szczególnie przydatna jest funkcja preventStrayRequests, która zatrzymuje przypadkowe wywołania na żywo.

Najtrwalszą radą jest własny interfejs nad klientem HTTP, żeby testy nie były sprzężone z konkretną biblioteką.

**Key takeaways:**
- Włącz preventStrayRequests jako siatkę bezpieczeństwa.
- Symuluj awarie, nie tylko ścieżkę szczęśliwą.
- Własny interfejs oddziela testy od biblioteki.

**Why do I care:** To ogólna zasada, nie tylko PHP: granica z zewnętrznym światem powinna być Twoim kontraktem. Dla frontendu to samo robi warstwa nad fetch albo MSW.

**Link:** [How to Mock HTTP Requests in PHP Tests](https://daily.dev/posts/6bIpMM5Wp)
