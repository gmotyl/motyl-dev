---
title: "AI w korporacjach: adopcja to przeszłość, teraz liczy się kontrola kosztów"
excerpt: "Z konferencji Gartner wynika jasno: enterprise przeszedł od eksperymentowania z AI do zarządzania infrastrukturą tokenową — i rachunki zaczynają boleć."
publishedAt: "2026-06-30"
slug: "enterprise-ai-koszty-gartner-kilo"
hashtags: "#kilo #ai #agents #enterprise #tokens #modelrouting #llmcosts #generated #pl"
source_pattern: "Kilo"
---

## For Enterprise, AI Adoption Is So Last Year

**TLDR:** Na szczycie Gartner Application Innovation & Business Solutions Summit dominował jeden temat: koszty AI wymykają się spod kontroli. Firmy przestały pytać "jak zacząć z AI" i zaczęły pytać "jak nie zbankrutować na tokenach". GitHub przeszedł na rozliczenia per token od 1 czerwca 2026, Uber przepalił cały roczny budżet do kwietnia, a Gartner przewiduje, że do 2028 roku koszty narzędzi AI coding przekroczą średnią pensję dewelopera.

**Summary:** Zespół Kilo wrócił z konferencji Gartner z jednym mocnym wnioskiem: rozmowy w enterprise o AI coding zmieniły swój charakter w ciągu ostatnich sześciu miesięcy. Jeszcze pół roku temu dominowało pytanie "jak przekonać deweloperów do spróbowania tego narzędzia?" Dziś padają pytania zupełnie innego rodzaju: kto używa AI, jakie modele wybiera, ile to kosztuje i co z tego wynika dla biznesu.

To nie jest akademicka dyskusja. Jeden deweloper z którym rozmawiali przepalił 8% miesięcznego limitu Copilot w dwie godziny. Inny wydał ponad 6 dolarów na jedną zmianę w kodzie i przyznał, że nie ma pojęcia jak przewidywać zużycie. GitHub od 1 czerwca 2026 zmienił model rozliczeń na oparty o tokeny wejściowe, wyjściowe i cache. Wszystko co agentic — chat, wieloetapowe sesje, wywołania narzędzi — jest teraz mierzone i fakturowane. Flat-rate przestał istnieć.

Uber był pierwszym głośnym przypadkiem — przepalił cały budżet 2026 na narzędzia AI coding do kwietnia i musiał wprowadzić cap 1500 dolarów miesięcznie na pracownika. Używali Claude Code i Cursor, nie Copilota. To pokazuje, że problem nie jest specyficzny dla jednego dostawcy, lecz wynika z charakteru agentic workflows, które spalają tokeny szybciej niż jakikolwiek flat-rate był w stanie wytrzymać. Gartner opublikował właśnie prognozę: do 2028 roku koszty AI coding tools przekroczą średnią pensję dewelopera. Kilo twierdzi, że widzieli to rok temu — fronierowe modele mają transparentne ceny w API od dawna, po prostu warstwa ukrytych subsydiów właśnie się załamuje.

Widoczność to dopiero pierwszy krok. Dashboard pokazujący 3000 dolarów rachunku po zakończeniu miesiąca wyjaśnia co się stało, ale nie zapobiega temu w przyszłości. Firmy potrzebują governance w czasie rzeczywistym: burn rate w trakcie sesji, alerty przy skokach, dane które oddzielają to co zostało precyzyjnie zmierzone od tego co jest tylko estymacją. A do tego dochodzi kwestia model flexibility: ta sama operacja może kosztować 1,30 dolara na frontierowym modelu i 0,07 dolara na dobrym modelu open-weight. Kiedy Anthropic wycofał Claude Fable 5 przez regulacje eksportowe USA dni po premierze, płacący enterprise klienci stracili dostęp z dnia na dzień. To już nie jest preferencja deweloperów, to zarządzanie ryzykiem.

Kilo promuje w tym kontekście swoje narzędzia: KiloBench testujący modele przez rzeczywisty agent harness na Terminal Bench 2.0, gdzie top 6 modeli na SWE-bench dzieli zaledwie 1,3 punktu, ale na Terminal Bench rozstrzał przekracza 20 punktów. Oraz Auto Efficient — klasyfikator który w czasie rzeczywistym analizuje sesję, ocenia typ i trudność zadania, i routuje je dynamicznie do modelu optymalnego pod kątem ceny i jakości. To ma sens: nie chcemy żeby każdy deweloper ręcznie liczył ekonomikę tokenów przed każdym promptem.

**Key takeaways:**
- Enterprise przeszedł od adopcji AI do zarządzania infrastrukturą tokenową — pytania brzmią teraz "ile to kosztuje i co z tego wynika", nie "jak zacząć"
- GitHub zmienił rozliczenia na per-token od 1 czerwca 2026, Uber przepalił roczny budżet do kwietnia, Gartner przewiduje że koszty AI przekroczą pensję dewelopera do 2028 roku
- Widoczność zużycia i governance w czasie rzeczywistym stają się wymaganiem enterprise, a model flexibility i automatic routing to odpowiedź na rosnące koszty i ryzyko vendor lock-in

**Why do I care:** Z perspektywy architekta frontend: to co widzę w enterprise dopiero zaczyna docierać do projektów w których pracuję. Jeśli twój team wdraża agentic workflows — Claude Code, Cursor, Copilot agent mode — bez jakiegokolwiek monitoringu zużycia tokenów, to nie masz jeszcze problemu, ale go będziesz miał. Flat-rate przestał maskować rzeczywiste koszty. Konieczność myślenia o model routing, o tym które zadania warto oddać tańszemu modelowi, a które wymagają frontier — to nowa kompetencja inżynierska, nie opcjonalna. Artykuł jest oczywiście materiałem marketingowym Kilo, ale obserwacje dotyczące rynku są trafne i warto je traktować poważnie.

**Link:** [For Enterprise, AI Adoption Is So Last Year](https://blog.kilo.ai/p/gartner-summit-roundup?publication_id=4363009&post_id=203374096&isFreemail=true&triedRedirect=true)
