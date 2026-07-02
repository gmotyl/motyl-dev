---
title: "Agenty w chmurze: wrażenia z wizyt w OpenAI, Anthropic i Cursor"
excerpt: "Gergely Orosz odwiedził biura OpenAI, Anthropic i Cursor w San Francisco i opisuje nadchodzący mega-trend: agenty AI działające w chmurze zamiast na lokalnych maszynach."
publishedAt: "2026-06-30"
slug: "agenty-w-chmurze-openai-anthropic-cursor"
hashtags: "#engineering #architecture #AI #agents #cloudagents #LLM #pragmaticengineer #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Impressions from visiting OpenAI, Anthropic, & Cursor

**TLDR:** Gergely Orosz odwiedził w San Francisco biura OpenAI, Anthropic i Cursor i zauważył spójny trend: wszystkie trzy firmy mocno stawiają na agenty AI działające w chmurze. To zmiana paradygmatu, która może wkrótce dotknąć całą branżę software.

**Summary:**

Artykuł zaczyna się od obserwacji Andreja Karpathy'ego, który opisał Claude Tag w Slacku jako "nowy paradygmat" pracy z AI. Wiele osób skrytykowało to stwierdzenie jako przesadzone, bo przecież to tylko integracja Slacka z Claudem. Autor myślał podobnie, dopóki nie porozmawiał z Davidem Hersheyem z jednostki Applied AI w Anthropic. Okazuje się, że kluczowe nie jest samo to, że Claude działa w Slacku, ale to, że działa w chmurze, bez potrzeby jakiegokolwiek lokalnego setupu. Nie trzeba konfigurować MCP, skills ani utrzymywać połączenia z lokalną maszyną. Wystarczy jedno polecenie i agent rusza.

Anthropic zainwestował ponad pół roku pracy w projekt Claude Managed Agents, czyli hostowaną usługę do uruchamiania długo działających agentów na różnych dostawcach chmurowych. W tym samym czasie Peter Steinberger, niezależnie od Anthropic, zbudował Crabbox, narzędzie do uruchamiania agentów OpenClaw w chmurze, bo miał dość tego, że lokalne procesy nagrzewają jego laptopa i spowalniają pracę. Ten sam problem, to samo rozwiązanie, dwa osobne miejsca.

OpenAI poszło o krok dalej i przejęło Ona, czyli dawnego Gitpoda, lidera w obszarze Cloud Development Environments. Uzasadnienie jest proste: Codex działa coraz dłużej, zadania trwają godziny lub dni, a nie minuty. Trzymanie użytkownika przy konkretnej maszynie przez cały ten czas nie ma sensu. Ona dostarcza izolowanych, trwałych środowisk, w których agenty mogą operować asynchronicznie z własnym dostępem do narzędzi i zasobów. OpenAI aktywnie rekrutuje inżynierów do zespołu Cloud Agents.

Cursor uruchomił Cloud Agents już pod koniec poprzedniego roku i teraz intensywnie inwestuje w ten obszar. CPO Sualeh Asif opisał konkretne wyzwania inżynierskie, które pojawiły się po drodze. Agent działający lokalnie może "poskarżyć się" na błąd czy ostrzeżenie bezpośrednio użytkownikowi. W chmurze ten feedback loop nie istnieje. Cursor rozwiązał to przez mechanizm "confession", czyli regularne interwały, w których model zgłasza problemy do zespołu infrastruktury. Dochodzą do tego pytania o resilience: co się dzieje, gdy węzeł się zakończy w połowie zadania i jak przenieść egzekucję na inny węzeł. 29 czerwca Cursor wypuścił dodatkowo aplikację iOS opartą właśnie na cloud agentach, która pozwala budować oprogramowanie z telefonu.

Dlaczego to dzieje się teraz? Według autora zbiegło się kilka czynników naraz. Modele kodowania w końcu osiągnęły wystarczającą jakość, żeby działać autonomicznie przez dłuższy czas. Infrastruktura dla agentów dojrzała, MCP i skills stały się powszechne. Okna kontekstu wzrosły do miliona tokenów, co pozwala na bardziej złożone, długotrwałe zadania. I wreszcie dostawcy chmurowi zbudowali wystarczająco dużo pojemności GPU, żeby to wszystko obsłużyć.

**Key takeaways:**
- Agenty AI w chmurze eliminują potrzebę lokalnego setupu i pozwalają na długotrwałe, asynchroniczne zadania bez utrzymywania otwartego laptopa
- OpenAI, Anthropic i Cursor niezależnie od siebie doszły do tego samego wniosku i aktywnie budują infrastrukturę cloud agentów
- Długo działające agenty w chmurze wiążą się z nowymi wyzwaniami inżynierskimi: resilience węzłów, brak bezpośredniego feedback loopu z agentem, izolacja środowisk

**Why do I care:** Z perspektywy architekta frontendowego to jest zmiana, której nie można zignorować. Cursor iOS oparty na cloud agentach to tylko początek. Za rok lub dwa narzędzia do code review, testowania, monitorowania regresji i wdrożeń mogą działać jako autonomiczne, długo żyjące agenty w chmurze, bez żadnej interakcji z lokalną maszyną programisty. To zmienia pytanie z "jak dobrze skonfigurujesz swoje środowisko lokalnie" na "jak dobrze zaprojektujesz środowisko dla agentów". Inżynierowie, którzy rozumieją MCP, narzędzia do orkiestracji agentów i architekturę systemów rozproszonych, będą mieć tu ogromną przewagę. Ja sam zaczynam patrzeć na swój stos narzędzi z myślą o tym, co mogę wypchnąć do chmury i zapomnieć.

**Link:** [Impressions from visiting OpenAI, Anthropic, & Cursor](https://newsletter.pragmaticengineer.com/p/impressions-from-visiting-openai?publication_id=458709&post_id=204308793&isFreemail=true&triedRedirect=true)
