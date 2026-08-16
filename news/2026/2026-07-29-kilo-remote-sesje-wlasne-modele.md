---
title: "Kilo pozwala teraz podpiąć własny model do zdalnej sesji CLI"
excerpt: "Od wersji 7.4.2 sesja Kilo CLI wystawiona przez /remote pokazuje w aplikacji mobilnej pełny katalog modeli z Twojej maszyny, nie tylko Kilo Gateway. Lokalny Ollama, LM Studio, subskrypcja ChatGPT Plus przez OAuth, czy własny endpoint, wszystko trafia do pickera na telefonie."
publishedAt: "2026-07-29"
slug: "kilo-remote-sesje-wlasne-modele"
hashtags: "#kilo #ai #coding-agents #cli #byok #devtools #llm #generated #pl"
---

## Kilo CLI 7.4.2: zdalna sesja z Twoim własnym modelem

**TLDR:** Kilo App od startu w lipcu obsługiwała zdalne sesje tylko na modelach z Kilo Gateway, co było głównym zgłaszanym ograniczeniem. Od CLI 7.4.2 sesja wystawiona przez `/remote` pokazuje w telefonie cały katalog modeli skonfigurowanych na Twojej maszynie, lokalne, subskrypcyjne i BYOK.

**Summary:** Historia tej funkcji jest dość pouczająca sama w sobie, bo pokazuje jak szybko feedback z pierwszego tygodnia po launchu potrafi przeorganizować roadmapę. Kilo App wystartowała z jednym wyraźnie zaznaczonym zastrzeżeniem: zdalne sesje na telefonie działają wyłącznie na modelach z Kilo Gateway. Okazało się, że to właśnie ten jeden szczegół wywołał najwięcej zgłoszeń, bo ludzie mieli już opłacone subskrypcje ChatGPT albo klucze do innych providerów i chcieli z nich korzystać także z poziomu telefonu, nie z jakiegoś oddzielnego, ograniczonego katalogu.

Rozwiązanie jest architektonicznie sensowne i warto się nad nim zatrzymać, bo to nie jest tylko kosmetyczna zmiana w UI. Sesja `/remote` nadal działa w Twoim terminalu albo edytorze, aplikacja mobilna jest jedynie kanałem sterującym. Wywołanie modelu odbywa się lokalnie, na Twoich poświadczeniach, więc żadne dane logowania nie muszą trafiać na serwery Kilo. To wyjaśnia od razu dlaczego Cloud Agenty działają inaczej: uruchamiają się na infrastrukturze Kilo, która fizycznie nie ma dostępu do configu providerów ani tokenów OAuth siedzących na Twoim laptopie, więc muszą zostać przy Gateway. Ładne rozdzielenie odpowiedzialności, choć trochę żal, że użytkownik musi sam pamiętać o tej granicy między "moja maszyna" a "chmura Kilo".

Ciekawszy jest kawałek o BYOK na poziomie Gateway. Możesz dodać klucz danego providera na koncie albo organizacji, i wtedy zapytania do modeli tego providera lecą przez Twój klucz zamiast klucza Kilo, a zużycie księguje się na Twoim koncie u providera. To dotyczy też modeli, które dostajesz w ramach planu subskrypcyjnego danego providera, nie tylko czystych kluczy API. Sensowne, bo pozwala Cloud Agentom korzystać z Twoich limitów bez ściągania sekretów z Twojej maszyny. Ale nie oszukujmy się, ten model ma wyraźną granicę: Ollama, LM Studio, cokolwiek stoi na Twojej sieci lokalnej, nigdy nie będzie dostępne dla Cloud Agenta, bo BYOK nie potrafi teleportować się do Twojego laptopa. Artykuł zresztą sam to podkreśla wprost, co akurat wypada docenić, bo wiele firm w takich ogłoszeniach woli to rozmywać.

Warto zwrócić uwagę na detale UX, które łatwo przeoczyć: kolejność modeli w pickerze jest spójna z kolejnością w CLI, więc przełączanie się między urządzeniami nie zaskakuje inną listą. Oznaczane są trzy rzeczy: modele darmowe, modele które mogą trenować się na Twoich promptach, i te z dostępnym kluczem BYOK. To ostatnie oznaczenie jest praktycznie najważniejsze z perspektywy kogoś, kto płaci za wiele providerów naraz i chce wiedzieć, które zapytanie faktycznie obciąży jego własny budżet. Jeśli masz starszą wersję CLI, picker po prostu spada do katalogu Gateway, a przy braku łączności pokazuje bieżący model jako wyłączony wiersz zamiast fałszywie sugerować wybór, którego nie da się zrealizować. Drobiazg, ale dobrze świadczy o tym, że ktoś pomyślał o degradacji funkcjonalności, a nie tylko o ścieżce szczęśliwej.

**Key takeaways:**
- Od Kilo CLI 7.4.2 sesja `/remote` udostępnia w aplikacji mobilnej cały lokalny katalog modeli, nie tylko Kilo Gateway
- Wywołanie modelu zawsze dzieje się na Twojej maszynie, na Twoich poświadczeniach, aplikacja jest tylko zdalnym sterowaniem
- Cloud Agenty nie mają dostępu do lokalnych providerów, ale mogą korzystać z BYOK skonfigurowanego na koncie lub organizacji
- Picker oznacza modele darmowe, te trenujące się na promptach oraz te z dostępnym kluczem BYOK

**Why do I care:** Dla kogoś, kto prowadzi zespół korzystający z kilku providerów LLM naraz, rozróżnienie między "moja maszyna" a "chmura vendora" to nie jest szczegół techniczny, tylko realny temat do polityki bezpieczeństwa i kosztów. Warto to mieć w głowie przy każdym narzędziu agentowym: pytać wprost, gdzie fizycznie leci klucz i gdzie wykonuje się model, zanim zacznie się je włączać zespołowo. Sam mechanizm BYOK na poziomie Gateway to zresztą wzorcowy przykład jak rozdzielić "kto płaci" od "kto wykonuje", coś co warto podpatrzeć projektując własne integracje z wieloma dostawcami modeli.

**Link:** [Use custom models on remote sessions](https://blog.kilo.ai/p/use-custom-models-on-remote-sessions?publication_id=4363009&post_id=208828650&isFreemail=true&triedRedirect=true)
