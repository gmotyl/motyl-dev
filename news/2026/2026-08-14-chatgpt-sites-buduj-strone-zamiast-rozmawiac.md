---
title: "ChatGPT Sites: koniec gadania, czas budować stronę"
excerpt: "OpenAI wprowadza ChatGPT Sites, funkcję, w której czat przestaje być tylko doradcą, a staje się realnym budowniczym stron zintegrowanym z Codexem."
publishedAt: "2026-08-14"
slug: "chatgpt-sites-buduj-strone-zamiast-rozmawiac"
hashtags: "#TechTiff #ai #nocode #frontend #productivity #generated #pl"
---

## ChatGPT Sites: od porady do gotowej strony w jednym oknie

**TLDR:** OpenAI dorzuciło do aplikacji desktopowej ChatGPT funkcję Sites, która przerabia rozmowę o Twojej stronie w realny, działający serwis, a cięższą robotę kodową bierze na siebie Codex. Autorka tekstu pokazuje to na swoim linku-w-bio: strona nie tylko wygląda inaczej, ale faktycznie zbiera zapisy, wysyła materiały i zapisuje subskrybentów we właściwym systemie.

Cała historia zaczyna się banalnie: ktoś prosi ChatGPT o ocenę swojego link-in-bio i słyszy w zasadzie "da się z tym pracować". Tyle że tym razem na tym się nie kończy. ChatGPT Sites otwiera stronę w przeglądarce wbudowanej w aplikację desktopową, robi coś w rodzaju audytu tego, co już jest, i proponuje kilka wariantów układu do wyboru. Jak wybierzesz, do gry wchodzi Codex, który bierze zatwierdzony plan i zamienia go w działający kod, łącznie z przetestowaniem ścieżki zapisu, czyli sprawdzeniem, czy ktoś faktycznie dostaje plik po podaniu maila. To jest różnica, która mnie tu interesuje najbardziej: nie mamy do czynienia z kolejnym generatorem landing page'y, tylko z workflow, w którym model widzi plik, przeglądarkę i kilka wątków rozmowy naraz w jednym panelu bocznym.

Autorka podkreśla jedną zasadę, która brzmi banalnie, a w praktyce jest solidnym filtrem: strona ma sens tylko wtedy, gdy ma jedno jasne zadanie. Jeśli zauważasz, że wciąż tłumaczysz to samo, wysyłasz te same materiały albo powtarzasz ten sam proces ręcznie, to sygnał, że ta praca ma już wystarczającą strukturę, żeby stać się osobną stroną. Cały proces budowania sprowadza się do prostego zdania szablonowego: strona pomaga [komu] zrobić [co] przy pomocy [jakich informacji lub narzędzi], a potem wysyła [wynik] do [gdzie]. Z tego jednego zdania ChatGPT ma już wystarczająco dużo, żeby zaplanować strukturę, strony, przejścia i design. Do tego dochodzi runda testowania: kliknij każdy link, wypełnij każdy formularz, sprawdź, czy dane trafiają tam, gdzie powinny, sprawdź wersję mobilną i desktopową, zanim ktokolwiek zobaczy stronę na żywo.

Ciekawy jest komentarz pod artykułem od kogoś z branży finansowej w Indiach, który od razu przeniósł ten pomysł na onboarding klientów u doradców finansowych. Portal zbierający dane finansowe, checklisty i synchronizację z CRM realnie skraca czas poświęcony na maile tam i z powrotem, ale ten sam komentarz słusznie zaznacza, że dane typu PAN, numer konta czy wysokość zarobków wymagają dużo poważniejszego traktowania niż zwykły zapis do newslettera. To dobre przypomnienie, że łatwość budowania nie zwalnia z myślenia o bezpieczeństwie danych.

**Key takeaways:**
- ChatGPT Sites zamienia rozmowę o stronie w gotowy, działający serwis, a Codex dogrywa kod, bazy danych, formularze, integracje i logowanie tam, gdzie no-code już nie wystarcza.
- Warunkiem sensownego projektu jest jedno jasne zadanie strony, nie próba zrobienia wszystkiego naraz.
- Panel boczny aplikacji desktopowej łączy przeglądarkę, pliki i wiele wątków rozmowy w jednym miejscu, więc model faktycznie widzi kontekst, a nie zgaduje.
- Testowanie całej ścieżki użytkownika przed publikacją, na desktopie i mobile, jest częścią procesu, a nie opcjonalnym dodatkiem.
- Projekty z wrażliwymi danymi, jak finanse czy zdrowie, wymagają dodatkowej warstwy zabezpieczeń, której sam generator nie zapewni automatycznie.

**Why do I care:** Z perspektywy kogoś, kto od lat buduje frontend i doradza zespołom jak układać architekturę, ten kierunek nie jest dla mnie zaskoczeniem, tylko naturalnym rozwinięciem tego, co już widzieliśmy w Cursorze czy v0. To, co faktycznie zmienia grę, to połączenie kontekstu, czyli plik, przeglądarka i historia rozmowy w jednym oknie, z wykonaniem, czyli Codex robiącym realny kod, a nie tylko szablon HTML. Dla prostych stron typu link-in-bio, portal onboardingowy czy hub materiałów na wydarzenie, to skraca czas od pomysłu do wdrożenia z dni do godzin, i szczerze mówiąc, klient rzadko potrzebuje więcej niż to. Jednocześnie widzę tu pole minowe, na które sami autorzy zwracają uwagę tylko częściowo: w momencie gdy strona zaczyna dotykać danych osobowych, finansowych czy medycznych, cała ta wygoda budowania nie zwalnia nikogo z odpowiedzialności za zgodność z RODO, szyfrowanie czy kontrolę dostępu. Jako architekt patrzyłbym na taki wygenerowany kod tak samo krytycznie jak na kod juniora: sprawdzić, zrozumieć, dopiero potem zaufać na produkcji.

**Link:** [Stop Chatting. Start Building.](https://techtiff.substack.com/p/chatgpt-sites-guide?publication_id=4799331&post_id=208899298&isFreemail=true&triedRedirect=true)
