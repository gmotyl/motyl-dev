---
title: "ThinkRail od JetBrains, projekt dokumentu przed kodem i dwa agenty w jednym repo"
excerpt: "Cztery materiały o agentach kodujących: agentowe IDE JetBrains, wtyczka Google wymuszająca design doc, git worktree dla równoległych agentów i strumieniowy czat w Reakcie."
publishedAt: "2026-10-26"
slug: "dailydev-thinkrail-elephant-goldfish-git-worktree-streaming-react-chat"
hashtags: "#dailydev #agents #git #react #typescript #workflow #devtools #generated #pl"
source_pattern: "daily.dev"
---

## JetBrains ThinkRail

**TLDR:** ThinkRail to inkubacyjny projekt JetBrains: agentowe IDE zbudowane wokół agenta kodującego pi. Każdy agent dostaje własny workspace oparty na git worktree, a wiedza o projekcie żyje w grafie plików SPEC.md.

**Summary:** JetBrains pokazało ThinkRail jako eksperyment w ramach inkubatora. To aplikacja desktopowa na trzy systemy albo narzędzie CLI, które opakowuje agenta pi w bogatszy interfejs. Najważniejszy pomysł dotyczy izolacji. Każda sesja agenta pracuje w osobnym workspace z własną gałęzią, więc kilku agentów może działać równolegle i nie dotyka katalogu, w którym sam pracujesz.

Druga część układanki to pamięć projektu. Zamiast jednego wielkiego pliku z instrukcjami ThinkRail trzyma graf dokumentów SPEC.md, z których agent czerpie trwałą wiedzę o tym, co i dlaczego jest w kodzie. Do tego dochodzą serwery MCP, skille agentów i wiele równoległych rozmów z pi w jednym workspace. Interfejs jest napisany w Reakcie 19 z Zustandem i Tailwindem 4, a silnik działa na Bunie. Telemetria obejmuje podstawowe zdarzenia powiązane z losowym identyfikatorem instalacji, bez promptów i kodu.

Dyskusja pod postem jest raczej sceptyczna. Głównie narzekano na README i specyfikacje wyglądające na wygenerowane oraz na to, że JetBrains wypuszcza kolejne nakładające się produkty agentowe, czyli Air, Fleet i teraz Thinkrail. Autor materiału nie odpowiada na pytanie, po co kolejne IDE, skoro izolacja przez worktree i pliki ze specyfikacją działają także w zwykłym terminalu.

**Key takeaways:**
- Izolacja agentów przez git worktree staje się standardowym wzorcem pracy równoległej.
- Graf plików SPEC.md ma zastąpić jeden duży plik z instrukcjami.
- Pozycjonowanie ThinkRail wobec innych produktów JetBrains pozostaje niejasne.

**Why do I care:** Z perspektywy architekta ciekawsze od samego IDE jest to, że wszyscy zbiegają do tego samego układu: osobny worktree na agenta i trwała specyfikacja w repozytorium. To można zrobić dziś bez żadnego nowego narzędzia. Jako konsultant widziałbym tu raczej sygnał, żeby zacząć pisać SPEC.md w swoich projektach, a nie kolejny powód do zmiany edytora.

**Link:** [JetBrains Thinkrail](https://daily.dev/posts/3FuhAxcl0)

## Elephant-Goldfish Model od Google

**TLDR:** Open source'owa wtyczka Google wymusza napisanie dokumentu projektowego, zanim agent zacznie pisać kod. Długa sesja "słonia" trzyma plan, a bezstanowe "złote rybki" recenzują go bez znajomości wcześniejszej rozmowy.

**Summary:** Pomysł opiera się na prostej obserwacji: agent, który sam wymyślił plan, ma wbudowane uprzedzenie wobec własnego rozumowania. Dlatego wtyczka dzieli pracę na trzy fazy. Najpierw burza mózgów, potem szkic dokumentu projektowego w Markdownie, a na końcu wieloetapowa recenzja. Recenzentami są świeże, bezstanowe subagenty, które widzą tylko dokument, a nie całą historię rozmowy, więc patrzą na plan z różnych stron i nie dziedziczą założeń autora.

Wtyczka na licencji Apache 2.0 integruje się najpierw z Antigravity, a materiał pokazuje też działanie z Claude Code i Codexem. Google zastrzega uczciwie, że przy drobnych poprawkach na jedno podejście to przerost formy. Narzut pisania i recenzowania dokumentu opłaca się dopiero przy większych funkcjach, gdzie zły plan kosztuje dużo cofania.

Czego brakuje? Nie ma żadnych danych, że recenzja przez bezstanowe rybki łapie więcej błędów niż zwykła recenzja przez człowieka albo drugi model z pełnym kontekstem. To przekonująca teoria, ale na razie bez pomiarów.

**Key takeaways:**
- Świeży recenzent bez historii rozmowy daje inną perspektywę niż autor planu.
- Design doc przed kodem ma sens tylko przy większych zadaniach.
- Wtyczka działa z kilkoma narzędziami, nie tylko z produktami Google.

**Why do I care:** To formalizacja czegoś, co dobry zespół robi przez design review. Dla frontendowca największy zysk jest przy refaktorach dotykających wielu modułów, gdzie zły plan wychodzi dopiero po tygodniu. Zanim jednak dodasz kolejną wtyczkę, spróbuj prostszej wersji: poproś drugą sesję o krytykę dokumentu bez pokazywania jej, jak do niego doszedłeś.

**Link:** [Google's Elephant-Goldfish Model: a design-first workflow for coding agents](https://daily.dev/posts/F1Cg5Pptd)

## Claude Code i Codex w jednym repo: pułapki git worktree

**TLDR:** Dwa agenty w jednym katalogu nadpisują sobie pliki. Rozwiązaniem jest osobny git worktree dla każdego, ale ma kilka pułapek, o których autor pisze konkretnie.

**Summary:** Autor opisuje przewidywalne awarie przy równoległej pracy Claude Code i Codexa na jednym repozytorium. Pierwsza to kolizja plików, którą rozwiązuje osobny worktree dla każdego agenta. Druga to ograniczenia gita: jedna gałąź nie może być wyciągnięta w dwóch worktree naraz, nowy worktree nie dziedziczy pliku .env ani node_modules, schowek jest współdzielony między wszystkimi worktree, a ręcznie usunięty katalog zostaje zarejestrowany, dopóki nie uruchomisz czyszczenia przez prune.

Ciekawsza jest część o recenzji krzyżowej. Niezatwierdzony diff trafia do innego modelu niż ten, który pisał kod, bo każdy model przeoczy inne błędy. Do tego osobne katalogi konfiguracyjne pozwalają trzymać dwa konta i przełączać się, gdy jedno wyczerpie limit, a plik HANDOFF.md pozwala następnej sesji podjąć pracę tam, gdzie skończyła poprzednia. Wszystko przetestowane na konkretnych wersjach git, Claude Code i Codex CLI.

Autor nie porusza kosztów. Dwa agenty to dwa razy więcej zużytych tokenów, a recenzja krzyżowa dokłada trzeci przebieg. Przy limitach, o których sam wspomina, to nie jest szczegół.

**Key takeaways:**
- Worktree na agenta rozwiązuje kolizje plików, ale wymaga ręcznego kopiowania .env i zależności.
- Recenzja diffa przez inny model łapie inne błędy niż recenzja przez ten sam.
- Plik HANDOFF.md to tani sposób na przekazanie kontekstu między sesjami.

**Why do I care:** To czysta praktyka dnia codziennego. Jeśli używasz agentów równolegle, zapisz sobie skrypt tworzący worktree razem z kopiowaniem .env i instalacją zależności, bo bez niego pierwsza próba kończy się frustracją. Wspólny schowek to pułapka, którą człowiek odkrywa dopiero po utracie zmian.

**Link:** [Running Claude Code and Codex at the same time on one repo: git worktree gotchas and cross-review](https://daily.dev/posts/eoNgX6nqT)

## Strumieniowy czat w Reakcie z Microsoft Foundry Responses

**TLDR:** Samo doklejanie surowych chunków do wiadomości nie wystarcza. Trzeba poskładać zdarzenia z trzech buforów i pilnować, żeby po anulowaniu nie pojawił się spóźniony tekst.

**Summary:** Strumień z Foundry może dostarczyć połowę zdarzenia JSON, kilka zdarzeń naraz albo przeciętą w połowie wielobajtową literę UTF-8. Autor proponuje trzy osobne bufory. Dekoder tekstu zachowuje niedokończone sekwencje bajtów, bufor linii czeka na znak nowej linii, a bufor danych trzyma zdarzenie, dopóki nie pojawi się pusta linia kończąca zdarzenie. Dopiero wtedy wolno parsować JSON.

Druga połowa dotyczy cyklu życia. Przerwanie żądania nie wystarcza, bo obietnica może się rozstrzygnąć po anulowaniu albo po zmianie zalogowanego użytkownika. Dlatego po każdym oczekiwaniu sprawdza się funkcję isCurrent, która porównuje stan przerwania i token z bieżącymi. Test hooka obejmuje 21 przypadków, między innymi pofragmentowany UTF-8, błędne ładunki i spóźnione wywołania zwrotne.

Autor milczy o wznawianiu po zerwaniu połączenia. W prawdziwym czacie to pierwszy problem, który zgłaszają użytkownicy na słabej sieci.

**Key takeaways:**
- Trzy bufory oddzielają bajty, linie i kompletne zdarzenia.
- Abort nie chroni przed spóźnionym wynikiem, potrzebna jest kontrola po każdym await.
- Warto testować fragmentację UTF-8 i anulowanie jawnie.

**Why do I care:** Każdy, kto buduje czat z odpowiedziami strumieniowymi, wpadnie w te pułapki, najczęściej przy polskich znakach i emoji. Ta kontrola aktualności po każdym await to wzorzec, który przenosi się na każdy asynchroniczny hook w Reakcie, nie tylko na czat.

**Link:** [Build a Streaming React Chat with Microsoft Foundry Responses](https://daily.dev/posts/iVNa1FO2F)
