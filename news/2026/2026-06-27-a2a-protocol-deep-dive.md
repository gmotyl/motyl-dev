---
title: "Protokół A2A — głęboka analiza nowej warstwy koordynacji agentów AI"
excerpt: "A2A to otwarty standard, który pozwala agentom AI różnych producentów i frameworków współpracować bez konieczności pisania niestandardowego kodu integracyjnego."
publishedAt: "2026-06-26"
slug: "a2a-protocol-deep-dive"
hashtags: "#neokim #ai #engineering #a2a #agentai #systemdesign #multiagent #generated #pl"
source_pattern: "NeoKim"
---

## Protokół Agent-to-Agent (A2A) — gdy jeden agent już nie wystarczy

**TLDR:** Model Context Protocol (MCP) dał agentom AI sposób na komunikację z narzędziami, bazami danych i zewnętrznymi API. Ale MCP nie rozwiązuje kluczowego problemu: co się dzieje, gdy wiele agentów musi współpracować ze sobą? A2A to nowy otwarty standard od Google, który standaryzuje tę warstwę koordynacji — niezależnie od frameworka, dostawcy czy platformy.

**Summary:**

Przez ostatnie lata widzieliśmy eksplozję agentów AI. Każdy zespół, każdy dostawca, każda platforma wypuszcza własne implementacje. Problem w tym, że każdy z tych agentów jest silosem. Agent CRM nie może koordynować z wewnętrznym agentem danych, agent kodujący nie może delegować do agenta testującego zbudowanego przez inny zespół. Nawet jeśli działają w tej samej firmie, w tej samej sieci — nadal nie mogą ze sobą rozmawiać bez ręcznie pisanego kodu "kleju".

Do tego dochodzi lock-in frameworków. Agent zbudowany w LangGraph nie może bezpośrednio komunikować się z agentem w CrewAI, Google ADK czy AutoGen. Każdy framework ma własny wewnętrzny model orkiestracji. Integracja między frameworkami wymaga custom kodu, który trzeba samemu pisać i utrzymywać. A2A rozwiązuje dokładnie ten problem — standaryzuje to, co wcześniej każdy musiał robić od nowa.

Dobra analogia: A2A jest jak standard kontraktu dla wykonawców. Nie musisz wiedzieć, jakie narzędzia ma w swojej skrzynce ani jak zarządza harmonogramem. Dajesz mu zadanie, on potwierdza co potrafi, a potem zwraca gotową robotę. A2A to właśnie taki standardowy format kontraktu — każdy wykonawca może pracować z każdym klientem bez renegocjowania warunków od zera przy każdym projekcie.

Protokół A2A v1.0, uruchomiony przez Google w kwietniu 2025 roku z udziałem 50 firm technologicznych i 150 organizacji, opiera się na kilku kluczowych zasadach. Prostota — reużywa znanych standardów: HTTP, JSON-RPC 2.0, Server-Sent Events. Gotowość enterprise — uwzględnia uwierzytelnianie, autoryzację, bezpieczeństwo i obserwowalność. Asynchroniczność — obsługuje zarówno szybkie zapytania, jak i wielogodzinne zadania badawcze. Agnostyczność modalna — obsługuje tekst, audio i wideo. I wreszcie zasada nieprzejrzystości — agenty współpracują, dzieląc się umiejętnościami i wynikami, bez ujawniania swoich wewnętrznych mechanizmów.

Technicznie, każdy agent w ekosystemie A2A publikuje tzw. Agent Card — dokument JSON pod standardowym URI `/.well-known/agent-card.json`. Karta ta opisuje tożsamość agenta, jego umiejętności, endpoint URL, obsługiwane formaty danych i wymagania uwierzytelniania. Komunikacja jest zorientowana na zadania — każde zadanie (Task) ma unikalny identyfikator i przechodzi przez zdefiniowany cykl życia: od `submitted` przez `working`, `input-required`, aż do stanów terminalnych jak `completed`, `failed`, `canceled` lub `rejected`. To fundamentalnie różni się od zwykłego wywołania funkcji — zadania są stanowe i mogą wymagać wielu wymian komunikatów.

**Key takeaways:**
- A2A standaryzuje warstwę koordynacji między agentami AI, podobnie jak HTTP standaryzował komunikację między dokumentami, a MCP — między agentami a narzędziami
- Protokół wspiera dwa modele orkiestracji: scentralizowany (jeden agent-lider deleguje pracę) i zdecentralizowany (swarm — agenty same się odkrywają i dzielą zadaniami); większość systemów produkcyjnych zaczyna od scentralizowanego
- A2A v1.0 obsługuje trzy wiązania transportowe (JSON-RPC 2.0, gRPC, HTTP REST) i trzy wzorce interakcji (synchroniczny, streaming przez Server-Sent Events, push notifications), co daje elastyczność dopasowania do różnych scenariuszy

**Why do I care:**

Jako senior developer i architekt systemów, widzę w A2A coś, co od dawna bolało w ekosystemie agentów AI — brak wspólnego języka między komponentami budowanymi przez różne zespoły. To samo czułem lata temu, patrząc na chaos przed erą REST API. A2A to właśnie ten moment standaryzacji. Ale uwaga — artykuł bardzo pięknie opisuje happy path, a omija rzeczy, o których warto myśleć już teraz: co z debugowaniem rozproszonych zadań przez granice agentów? Jak weryfikujesz tożsamość agenta, który twierdzi, że ma daną umiejętność? Opaque Execution brzmi świetnie z perspektywy enkapsulacji, ale to zmora podczas diagnostyki produkcyjnych incydentów. Zanim wdrożysz multi-agent architecture z A2A, upewnij się, że masz solidną observability — bo distributed tracing w środowisku "nieprzejrzystych" agentów to naprawdę nietrywialny problem.

**Link:** [A2A Protocol - Deep Dive](https://newsletter.systemdesign.one/p/agent-to-agent-protocol?publication_id=1511845&post_id=202265390&isFreemail=true&triedRedirect=true)
