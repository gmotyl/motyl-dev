---
title: "Skill jako produkt: jak spakować i sprzedać swój workflow w Claude"
excerpt: "Anthropic otworzyło format Agent Skills jako standard, więc jeden dobrze napisany plik SKILL.md odpala się w dziesiątkach narzędzi AI naraz. To zmienia reguły gry dla każdego, kto dotąd sprzedawał tylko prompty w PDF-ie."
publishedAt: "2026-08-05"
slug: "skill-jako-produkt-jak-spakowac-i-sprzedac-workflow-w-claude"
hashtags: "#theaibreak #ai #agents #productivity #devtools #claude #generated #pl"
source_pattern: "The AI Break"
---

## Skill jako produkt: od workflow, który już masz, do listingu, który się sprzedaje

**TLDR:** Artykuł prowadzi krok po kroku przez zamianę workflow, który już wykonujesz ręcznie, w sprzedawalny Claude Skill: od selekcji, która czynność w ogóle nadaje się do spakowania, przez napisanie zgodnego ze specyfikacją SKILL.md, po wycenę i wypuszczenie listingu. Punktem wyjścia jest fakt, że Agent Skills to od grudnia 2025 otwarty standard, który czyta ponad 30 narzędzi AI, nie tylko Claude. To odróżnia ten format od zwykłych promptów, bo plik faktycznie żyje wewnątrz narzędzia klienta i odpala się sam, kiedy jest potrzebny.

**Summary:** Punkt wyjścia tego materiału jest prosty i trochę bolesny: większość ludzi próbujących sprzedać swoją wiedzę wybiera do spakowania workflow, z którego są najbardziej zadowoleni, a nie ten, w którym ktoś inny faktycznie się blokuje. Autor proponuje więc najpierw zrobić inwentaryzację powtarzalnych procesów, które już wykonujesz tym samym sposobem co tydzień, i ocenić każdy z nich w pięciu wymiarach: ile bólu to rozwiązuje u drugiej osoby, jak często się to zdarza, czy da się to zapisać jako instrukcje plus kilka plików referencyjnych bez custom kodu, czy koduje jakiś trudny do skopiowania osąd czy gust, i czy masz na to dowód w postaci realnych rezultatów. To jest w gruncie rzeczy rozmowa z modelem jako strategiem produktowym, nie z modelem jako generatorem treści, i to jest chyba najciekawszy element całego podejścia.

Drugi filar to sam format. Agent Skills opublikowano jako otwarty standard w grudniu 2025 i według artykułu do marca 2026 czyta go już około 32 narzędzi: Claude Code i aplikacje Claude, Codex CLI i ChatGPT od OpenAI, VS Code i GitHub Copilot od Microsoftu, Gemini CLI od Google, a do tego JetBrains, AWS, Sourcegraph, Databricks czy Mistral. Praktyczny wniosek jest brutalnie prosty: piszesz jeden plik, a on odpala się w większości narzędzi, za które twój klient już płaci abonament. To jest zupełnie inna propozycja wartości niż pakiet promptów w Notion, który i tak zostanie skopiowany do darmowego dokumentu w tydzień.

Sam plik SKILL.md ma być, jak to ujęto, ścisły w dokładnie dwóch miejscach i swobodny wszędzie indziej. Frontmatter musi przejść walidację we wszystkich klientach, więc to nie miejsce na eksperymenty. Opis musi być tak napisany, żeby skill odpalał się w dokładnie właściwym momencie, a nie za wcześnie albo w ogóle. Treść samej instrukcji ma być natomiast wystarczająco szczegółowa, żeby zupełnie nieznana osoba dostała twój rezultat bez doprecyzowywania kontekstu na czacie. Artykuł wyraźnie ostrzega przed dwiema pułapkami: jeśli coś jest w istocie jednym sprytnym promptem, to się nie sprzeda jako skill i trzeba to powiedzieć wprost, a jeśli coś wymaga żywego dostępu do API, bazy danych albo custom kodu, to jest już aplikacja, nie skill.

Dalsza część pipeline'u, opisana w skróconej formie, prowadzi od wyboru workflow przez pakowanie, aż do nazwania konkretnego kupującego jego własnymi słowami z historią przed i po, ustalenia trzech punktów cenowych z uzasadnieniem dla każdego, napisania opisu, który przetrwa dziesięciosekundowe skanowanie oczami, oraz zaplanowania dystrybucji i aktualizacji tak, żeby wersja druga pisała się sama. Autor szacuje cały proces na godzinę pracy i deklaruje, że po tym czasie masz realny plik i realny plan, nie tylko notatki. To jest format, który lubię: mniej filozofii, więcej konkretnego prompta do wklejenia i konkretnego kryterium decyzyjnego.

**Key takeaways:**
- Agent Skills to od grudnia 2025 otwarty standard czytany przez ponad 30 narzędzi AI, nie własność jednego dostawcy, co robi z pliku SKILL.md realny produkt cross-platformowy, a nie ciekawostkę dla jednej apki.
- Wybór, co spakować, wymaga oceny w pięciu wymiarach: ból, częstotliwość, łatwość spakowania, defensywność wobec kopiowania i dowód, że to działa, nie tylko intuicji, że dany workflow jest "dobry".
- Jeden sprytny prompt nie jest skillem i nie warto go tak sprzedawać, tak jak workflow wymagający żywego API czy bazy danych to już aplikacja, nie skill.
- Frontmatter SKILL.md musi przejść walidację wszędzie, a opis skilla decyduje, czy narzędzie odpali go w odpowiednim momencie, więc to jest miejsce, gdzie nie ma miejsca na lenistwo.
- Cena i listing mają wynikać z konkretnego kupującego opisanego jego własnymi słowami, nie z ogólnego "dla każdego, kto chce być produktywny".

**Why do I care:** Z perspektywy kogoś, kto od lat patrzy na frontend i architekturę przez pryzmat wielokrotnego użycia, ten artykuł trafia w coś, co ignorowałem przy pierwszym kontakcie ze skillami: to nie jest kolejny format promptu, to jest kontrakt dystrybucyjny. Skoro te same 30 klientów AI czyta ten sam plik, to SKILL.md zaczyna przypominać bardziej pakiet npm niż notatkę w Notion, ma swój interfejs (frontmatter), swoją dokumentację (description) i swoją logikę wykonania (body). Jako architekt lubię, kiedy ktoś traktuje wiedzę jak artefakt z wersją i planem update'u, a nie jak jednorazowy PDF, bo to jest dokładnie ten sam instynkt, który sprawia, że warto pisać reużywalne komponenty, a nie kopiować JSX między projektami. Sceptyczny jestem tylko wobec tego, jak szybko rynek zaleje się słabo napisanymi opisami skilli, które będą się odpalać w złym momencie, bo w artykule ta część jest właściwie jednym zdaniem, a to jest w praktyce najtrudniejszy inżynieryjny problem w całym pipeline.

**Link:** [Tutorial: How To Package and Sell a Claude Skill](https://theaibreak.substack.com/p/tutorial-how-to-package-and-sell)
