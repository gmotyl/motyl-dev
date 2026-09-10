---
title: "Jak powstaje Codex: rozmowa z Tibo Sottiaux o Rust, otwartym kodzie i harnessie, który zawsze wyprzedza model"
excerpt: "Tibo Sottiaux, jeden z twórców Codexa i szef Core Products & Platform w OpenAI, opowiada o wyborze Rusta, decyzji o otwarciu kodu, wsparciu dla wielu dostawców modeli i o tym, jak AI zmienia koszt utrzymania i re-architektury kodu."
publishedAt: "2026-09-10"
slug: "pragmatic-engineer-building-codex-tibo-sottiaux"
hashtags: "#pragmaticengineer #ai #agents #rust #opensource #architecture #codereview #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Jak buduje się Codex: Rust, otwarty kod i harness, który zawsze wyprzedza model

**TLDR:** Tibo Sottiaux, jeden z inżynierów, którzy stworzyli Codexa, a dziś szef Core Products & Platform w OpenAI, opowiada w podcaście Pragmatic Engineer o decyzjach architektonicznych stojących za narzędziem: dlaczego CLI napisano w Rust mimo słabszego wsparcia modeli dla tego języka, dlaczego kod jest otwarty, choć konkurencyjny Claude Code nie jest, i jak zmienia się koszt utrzymania oraz re-architektury kodu w erze agentów.

**Summary:** Decyzja o napisaniu Codexa w Ruście zapadła, zanim modele AI radziły sobie z tym językiem dobrze, bo zespół od początku zakładał, że instancje Codexa będą działać na milionach maszyn w chmurze, a wydajność, bezpieczeństwo i efektywność inżynierska musiały być priorytetem numer jeden, nie wygoda pisania kodu w danym momencie. To decyzja architektoniczna typu "wybierz wydajny język od razu, żeby uniknąć przepisywania później", którą łatwo docenić z perspektywy czasu, dużo trudniej podjąć w momencie, gdy modele piszą w tym języku gorzej niż w Pythonie czy TypeScripcie. Otwarty kod to z kolei świadomy wybór z plusami i minusami: zaufanie i energia społeczności kontrybutorów działają na korzyść projektu, ale praca zespołu bywa kopiowana i wydawana w innych narzędziach, zanim sam Codex zdąży to zrobić. Otwartość ma też praktyczną konsekwencję, o której Sottiaux mówi wprost: skoro harness jest jawny, każdy może go zforkować i podpiąć inny model, dlatego Codex świadomie wspiera wiele modeli różnych dostawców zamiast zamykać się w ekosystemie jednego laboratorium.

Najciekawszy fragment rozmowy dotyczy tego, jak zmienia się praca inżynierska pod wpływem agentów. Sottiaux opisuje harness Codexa jako zestaw "kul", zabezpieczeń, ograniczeń bezpieczeństwa i kontekstu wstrzykiwanego na starcie każdej tury, które istnieją, bo model sam sobie jeszcze nie radzi z pewnymi rzeczami; w miarę jak modele się poprawiają, część tych kul znika, a harness się kurczy, więc harness zawsze jest o krok przed najnowszym modelem OpenAI, nigdy dokładnie w tym samym miejscu. Zadania utrzymaniowe, jak aktualizacje zależności, agent potrafi dziś przejść przez cały kodebase w kilka godzin, a re-architektura pod nowe kompromisy, która kiedyś zajmowała lata, teraz zajmuje najwyżej kilka dni, choć Sottiaux zastrzega, że jakość kodu, dobre abstrakcje i solidne testy wciąż decydują o tym, jak łatwo taką zmianę w ogóle przeprowadzić. Zmienia się też code review: dyskusja o intencji kodu nie musi już odbywać się przy okazji review, które i tak było głównie o poprawności i wymianie informacji, tylko powinna dziać się wcześniej, zanim kod w ogóle powstanie, bo weryfikację poprawności i przeglądy bezpieczeństwa coraz częściej przejmuje AI.

**Key takeaways:**
- Codex napisano w Rust od pierwszego dnia, mimo słabszego wsparcia modeli dla tego języka, bo zespół projektował pod skalę milionów instancji w chmurze.
- Otwarty kod Codexa oznacza, że każdy może zforkować harness i podpiąć inny model, dlatego Codex świadomie wspiera wiele dostawców, w odróżnieniu od zamkniętego Claude Code.
- Harness Codexa kurczy się wraz z poprawą modeli, bo część zabezpieczeń i kontekstu wstrzykiwanego na starcie tury przestaje być potrzebna.

**Why do I care:** Fragment o code review jest wart zapamiętania niezależnie od tego, czy używacie Codexa, bo opisuje realny przesuw punktu ciężkości: jeśli AI przejmuje weryfikację poprawności, rozmowa o intencji i architekturze musi przenieść się przed napisanie kodu, a nie zostać po stronie pull requesta. Warto też zapamiętać argument o Rust jako wyborze pod wydajność z góry, bo to konkretny kontrargument dla podejścia "wybierzmy język, w którym AI dziś pisze najlepiej", które w wielu zespołach staje się domyślnym kryterium wyboru stacku.

**Link:** [Building Codex with Tibo Sottiaux](https://newsletter.pragmaticengineer.com/p/building-codex-with-tibo-sottiaux)
