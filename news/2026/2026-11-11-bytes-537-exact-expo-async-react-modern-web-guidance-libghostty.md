---
title: "Bytes: Exact od Expo, asynchroniczny React z formularzami, Modern Web Guidance 1.0 i libghostty"
excerpt: "Agentowy framework UI od Expo, wzorzec formularzy działających przed JavaScriptem, stabilne Modern Web Guidance od Chrome oraz libghostty 1.0 ze stabilnym ABI."
publishedAt: "2026-11-10"
slug: "bytes-537-exact-expo-async-react-modern-web-guidance-libghostty"
hashtags: "#uidev #frontend #react #ai #agents #expo #performance #generated #pl"
source_pattern: "ui.dev"
---

## Exact: aplikacja pisana raz, uruchamiana natywnie, obsługiwana przez agenta

**TLDR:** Expo pokazuje Exact, wczesny runtime do aplikacji na web, macOS, iOS i Linux. Interfejs opisuje się w małym deklaratywnym języku Contract, a agent AI ma sam budować, uruchamiać i testować aplikację na każdej platformie.

**Summary:** Exact opiera się na trzech założeniach. Po pierwsze, kod w dużej mierze piszą agenci, więc narzędzia mają mówić do maszyn: dziesięć operacji, takich jak drzewo widoku, zrzut ekranu, dotknięcie, wpisanie tekstu czy stan, działa tak samo na każdym hoście. Zegar należy do agenta, więc zamiast czekać na koniec animacji, agent przesuwa czas i czyta wynik, bez losowych błędów od opóźnień. Po drugie, liczy się szybkość: celem jest start do pierwszej klatki w sto milisekund, a przebudowa po edycji też w około stu. Po trzecie, piszesz słownictwem CSS, a to, czego nie powiesz, dorzuca platforma, czyli natywne kontrolki UIKit i AppKit, a nie webview.

Logika danych idzie w TypeScripcie albo Ruście, a interfejs w Contract, który celowo nie ma pętli w akcjach, wyjątków ani dostępu do I/O. Cały program mieści się w oknie kontekstu agenta, a kompilator zwraca błędy z identyfikatorami i zakresami w kodzie. W teście z benchmarkiem RealWorld runtime na webie miał 26 KB kodu przeciw 81 KB Reacta. To wszystko autorzy mierzą sami, a projekt jest przed wersją 1.0, bez gwarancji kompatybilności i bez przewodnika migracji. Nie ma też warstwy Reacta ani JSX, więc nie przeniesiesz tu istniejących komponentów.

**Key takeaways:**
- Jeden opis interfejsu, cztery hosty, bez webview i bez mostu JavaScript w UI.
- Narzędzia agenta ograniczono do dziesięciu operacji, żeby API nie puchło.
- Projekt jest przed 1.0 i zmienia się codziennie, bez gwarancji stabilności.

**Why do I care:** To ciekawy eksperyment, co się stanie, gdy projektujesz framework pod agenta, a nie pod człowieka. Ograniczenia języka są świadome, i to jest lekcja dla twórców własnych design systemów: im mniej swobody, tym łatwiej agentowi nie narobić szkód. Do produkcji bym tego jeszcze nie brał.

**Link:** [GitHub - expo/exact](https://github.com/expo/exact)

## Asynchroniczny React i progresywne akcje serwerowe

**TLDR:** Ebey z zespołu React Router tłumaczy, jak połączyć nowe hooki asynchroniczne Reacta z formularzami, które działają jeszcze przed załadowaniem JavaScriptu. Reguła jest jedna: akcja serwerowa musi trafić do formularza jako jego akcja.

**Summary:** Autor wychodzi od swojego motta: ma działać przed JavaScriptem, a zachwycać po nim. React pozwala dziś podać akcję serwerową bezpośrednio formularzowi, a bundler załatwia wysłanie prawdziwego żądania POST. To przenosi do modelu komponentów coś, co wcześniej wymagało obsługi w warstwie serwera, jak Express czy Hono.

Dalej autor porządkuje hooki. Przejście służy odpowiedzi na pytanie, czy trwa praca asynchroniczna. Stan akcji to w istocie asynchroniczny reducer. Hook optymistyczny aktualizuje interfejs na czas trwania tej pracy. W wersji serwerowej wszystko wygląda podobnie, ale łatwo zepsuć działanie przed JavaScriptem: wystarczy opakować akcję serwerową własną funkcją klienta, bo formularz nie wie wtedy, jak wysłać się sam. Przy aktualizacji optymistycznej pomaga hook sprawdzający, czy strona jest już uwodniona, i do czasu uwodnienia przekazuje formularzowi zwykłą akcję serwerową.

Tekst jest rzeczowy, lecz pomija koszt: dyrektywa "use server" nie wszystkim się podoba, a ten wzorzec zakłada, że całe wysyłanie formularza ma sens po stronie serwera. Dla aplikacji bardziej klienckich to niekoniecznie dobry punkt wyjścia.

**Key takeaways:**
- Akcja serwerowa przekazana wprost do formularza działa przed JavaScriptem.
- Opakowanie jej funkcją klienta psuje to zachowanie.
- Przy aktualizacjach optymistycznych potrzebny jest sygnał uwodnienia.

**Why do I care:** Jeśli budujesz formularze w React Router albo Next, to krótki test do zrobienia w projekcie: wyłącz JavaScript i sprawdź, czy kluczowe formularze nadal wysyłają dane. Często okaże się, że nie, i wiadomo wtedy, gdzie leży dług.

**Link:** [Async React & Progressive Server Actions](https://ebey.dev/blog/3myyseusgd22h)

## Modern Web Guidance 1.0: wiedza o platformie dla agenta kodującego

**TLDR:** Chrome wydał stabilną wersję zestawu umiejętności, który wkłada do agenta kodującego wiedzę o platformie webowej, dane o zgodności przeglądarek i przepływ modernizacji istniejącego kodu. Do projektu dołączają Firefox i Edge.

**Summary:** Argument Chrome jest prosty. Modele potrafią napisać działający kod, ale ekspert zawsze znajdzie w nim coś, co można zrobić szybciej, dostępniej albo bezpieczniej. Eval-e pokazują luki w dostępności, jak zarządzanie fokusem i obsługa ograniczonego ruchu, w UX przy gestach i przejściach okien dialogowych, w wydajności przy planowaniu zadań w głównym wątku oraz w bezpieczeństwie przy sanityzacji HTML i politykach CSP. Wersja 1.0 dodaje skanowanie istniejącego kodu pod kątem tego, co da się bezpiecznie zastąpić nowszymi funkcjami platformy, na razie przez analizę statyczną ograniczonej listy wzorców.

Najmocniejsza część to studia przypadków, choć pochodzą od samego Google i jego klientów. Note raportuje wzrost wyników testów nowoczesnych praktyk z 61 do 94 procent w stu osiemdziesięciu przebiegach, bo agenci sięgają po natywny HTML i CSS zamiast własnego JavaScriptu. MetaMask uruchomił bota recenzującego pull requesty: w pięć tygodni skomentował 64 z około 480 zmian, a inżynierowie poprawili 43 uwagi, głównie z dostępności i semantyki. Warto zauważyć, że autorzy zalecają użycie razem z Chrome DevTools dla agentów, bo wiedza bez weryfikacji w działającej przeglądarce niewiele daje.

**Key takeaways:**
- Zestaw instaluje się jednym poleceniem i działa z głównymi agentami.
- Wersja 1.0 dodaje przepływ modernizacji istniejącej bazy kodu.
- Liczby pochodzą od autorów i ich partnerów, ale pomysł bota recenzenta jest łatwy do własnego sprawdzenia.

**Why do I care:** Podpięcie tego do recenzji pull requestów to tani eksperyment. Łapie dokładnie te rzeczy, których lintery nie widzą, jak zły ARIA czy brak priorytetu dla obrazu LCP. Zespoły, które piszą kod z agentem, powinny to mieć w repozytorium.

**Link:** [Modern Web Guidance 1.0: The web platform expertise your coding agent is missing](https://developer.chrome.com/blog/modern-web-guidance-v1)

## libghostty 1.0: terminal jako biblioteka ze stabilnym ABI

**TLDR:** Mitchell Hashimoto ogłasza wersję 1.0 libghostty-vt, przenośnej biblioteki C do emulacji terminala. Stabilne jest zarówno API, jak i ABI, a biblioteka już napędza terminal w IDE JetBrains.

**Summary:** Rok po zapowiedzi biblioteka jest kompletnym emulatorem terminala dostępnym przez API w C. Używa jej terminal w produktach JetBrains, co według autora daje ponad 12,5 miliona aktywnych użytkowników, a do tego Neovim ma zatwierdzony pull request zastępujący libvterm, który zamyka dziesięcioletni błąd z zawijaniem historii przy zmianie rozmiaru. Korzystają z niej też Turborepo, OrbStack i cała fala terminali dla narzędzi agentowych. Powstały wiązania do Rusta, Go, Pythona i wielu innych języków.

Wersja 1.0 oznacza semantyczne wersjonowanie i egzekwowane w CI reguły zgodności ABI: obiekty są nieprzezroczystymi uchwytami, a nowsze nagłówki z starszą biblioteką zwracają kod braku wsparcia zamiast awarii. Dochodzi pakowanie dla dystrybucji, licencja MIT, brak zależności copyleft i budowanie bez libc, gdy wyłączy się SIMD. Autor testował dziesięć tysięcy żywych terminali na czterordzeniowym serwerze z ośmioma gigabajtami RAM. Przypis zaznacza, że tekst napisano ręcznie, bez pomocy AI.

**Key takeaways:**
- Stabilne API i ABI plus oficjalne pakowanie dla głównych systemów.
- Już działa w IDE JetBrains i trafi do Neovima po wydaniu z tagiem.
- Biblioteka nie tworzy wątków i pozwala podmienić alokator.

**Why do I care:** Jeśli budujesz narzędzie z wbudowanym terminalem w Electronie albo przeglądarce, wersja WASM z interfejsem zbliżonym do Xterm.js jest warta sprawdzenia. To też przykład, jak wygląda dojrzała biblioteka: ABI jako obietnica, nie przypadek.

**Link:** [Libghostty 1.0](https://mitchellh.com/writing/libghostty-1-0)

## Conductor Skills: jak nauczyć agenta budować workflow

**TLDR:** Zespół Orkes opisuje paczkę wiedzy w Markdownie, która uczy agentów kodujących tworzyć i monitorować workflow w Conductorze. Ten sam tekst ładuje się do Claude Code, Cursora, Copilota i innych.

**Summary:** Problem jest znany: agent bez dokumentacji wymyśla flagi, których nie ma, albo zgaduje schemat JSON. Skill rozwiązuje to plikiem z regułami, procedurą pierwszej konfiguracji i referencją poleceń, do tego trzy dokumenty pomocnicze i przykłady. Są twarde reguły, jak niewypisywanie tokenów w logach, i zakres narzędzi, które agent może używać. Skrypty instalacyjne wykrywają zainstalowanych agentów i kładą pliki w odpowiednich katalogach, a Claude Code dostaje prawdziwą wtyczkę z manifestem.

Jest tu jedna dobra obserwacja: skill to w większości zwykły tekst, który agent czyta, więc ta sama treść obsłuży wielu klientów. Brakuje za to opisu, jak sprawdzić, czy skill faktycznie poprawia wyniki, bo to jest tekst marketingowy producenta, bez żadnego pomiaru.

**Key takeaways:**
- Skill to ustrukturyzowany Markdown z regułami, procedurą i przykładami.
- Jedna treść obsługuje wielu agentów dzięki skryptom instalacyjnym.
- Brak pomiaru skuteczności po stronie autorów.

**Why do I care:** Jeśli twoja firma ma produkt z API albo CLI, to jest szablon, jak napisać dla niego skill. Zacznij od reguł bezpieczeństwa i fallbacków, a nie od listy wszystkich funkcji.

**Link:** [How We Taught Claude, Cursor, and Copilot to Build Agentic Workflows](https://orkes.io/blog/how-conductor-skills-teaches-ai-agents-to-build-workflows)
