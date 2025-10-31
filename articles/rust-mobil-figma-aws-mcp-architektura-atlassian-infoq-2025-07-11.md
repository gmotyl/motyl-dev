---
title: "Rust na mobilu, koszty chmury i decyzje architektoniczne — przegląd InfoQ (11 lipca 2025)"
excerpt: "Migracje kodu i infrastruktury, protokoły integracji agentów AI oraz praktyka architektoniczna — co warto wiedzieć i czego autorzy nie mówią wprost."
publishedAt: "2025-07-11"
slug: "rust-mobil-figma-aws-mcp-architektura-atlassian-infoq-2025-07-11"
hashtags: "#generated #pl #rust #ai #architecture #aws #azure #postgresql #frontend #react #typescript #cloud"
---

## From C to Rust: inside Meta’s Developer-Led Messaging Migration
**TLDR:** Meta stopniowo przepisuje krytyczną warstwę runtime swoich aplikacji mobilnych z C na Rust, szukając pamięciowej bezpieczeństwa i poprawy produktywności inżynierów. Projekt istniejacości wymagał dużego wysiłku onboardingu, ale przynosi lepsze narzędzia debugowania i pewność refaktorów.

**Summary:**
Meta opisuje przejście jako decyzję napędzaną nie tylko wydajnością, lecz przede wszystkim memory safety i komfortem deweloperów. Stara baza C miała funkcje rozciągnięte na setki linijek i ręczne zarządzanie pamięcią — scenariusz, który łatwo generował „spaghetti” i nawyk tolerowania bałaganu. Rust usuwa klasę błędów związanych z pamięcią dzięki ownership i daje natychmiastowe sprzężenie zwrotne z kompilatora oraz narzędzi takich jak rustfmt i rust-analyzer.

Zespół podkreśla praktyczne aspekty: lepsze symbolikowanie crash logów, możliwość stawiania breakpointów w mieszanym stacku C/Rust oraz poprawę komfortu przy refaktoringu. Większość inżynierów zaczynała bez doświadczenia w Rust — proces opierał się więc na indywidualnym tutoringu i cierpliwych review, a także na wewnętrznych grupach wsparcia. To pokazuje, że technologia to tylko fragment sukcesu — kultura i proces nauki są równie istotne.

Autorzy chwalą się rosnącym zainteresowaniem wewnątrz organizacji i odwołują się do doświadczeń Cloudflare, ale unikają twardych metryk. Brakuje konkretnych porównań kosztów (czas dewelopera vs. koszty buildów/rozmiarów binarek) i analizy długofalowych kosztów utrzymania ekosystemu Rust na mobilu — np. kompatybilności ABI, toolchainów dla różnych platform i kosztu szkolenia zespołu.

Dla architektów i zespołów: to dobre przypomnienie, że migracja do bezpieczniejszego języka to nie tylko kwestia codebase — to program adopcyjny: trening, code review, testy integracyjne i obserwowalność. Zespoły muszą zaplanować opokę interoperacyjności z legacy, strategię stopniowych cutoverów i metryki jakości kodu oraz produktywności.

**Key takeaways:**
- Rust znacząco redukuje klasy błędów związanych z pamięcią i poprawia komfort refaktoringu.
- Sukces wymaga dużego nakładu na onboarding i wewnętrzne wsparcie, nie tylko wyboru języka.
- Narzędzia (rustfmt, rust-analyzer) i lepsze crash logi poprawiają codzienną pracę inżyniera.

**Tradeoffs:**
- Gain bezpieczeństwo pamięci i developer velocity but sacrifice krzywą uczenia i konieczność inwestycji w toolchain oraz interoperacyjność z istniejącym C.
- Decision to adopt Rust means większa pewność refaktorów at the cost of krótkoterminowej wydajności zespołu i konieczności budowania wiedzy.

**Link:** [From C to Rust: inside Meta’s Developer-Led Messaging Migration](https://www.infoq.com/news/2025/07/meta-rust-messaging-migration)

---

## Great Architects Facilitate, Not Dictate Software Decisions
**TLDR:** Andrew Harmel-Law przypomina, że rola architekta to głównie facylitacja decyzji, nie ich narzucanie — architektura to suma decyzji, więc warto skupić się na ich praktycznym podejmowaniu. Książka i rozmowa koncentrują się na procesach decyzyjnych i praktykach, które pomagają organizacjom wybrać właściwe opcje.

**Summary:**
Rozmowa z Andrew Harmel-Law koncentruje się na istocie decyzji architektonicznych: czym są decyzje istotne, jak je identyfikować i jak prowadzić praktykę decyzyjną w organizacji. Autor podkreśla, że technologie i wzorce się zmieniają, ale praktyka podejmowania wyborów — eksploracja opcji, analiza kontekstu i świadome wybranie ścieżki — jest tym, co naprawdę konstytuuje architekturę.

Tekst przechodzi od teorii do praktyki: Harmel-Law opisuje techniki facylitacji, które zwiększają jakość wyborów i zaangażowanie zespołu. Zamiast dyrektyw, architekt ma prowadzić przez zdefiniowanie kryteriów, zebranie informacji i umożliwienie zespołom świadomego porównania opcji. To podejście sprzyja odpowiedzialności zespołowej i lepszej adaptacji decyzji w czasie.

Brakuje jednak głębszych przykładów twardych kryteriów decyzyjnych w realnych dylematach (np. modułowy monolit vs. mikroserwisy przy określonej skali i wymaganiach operacyjnych). Autor chętnie omawia proces, ale mniej mówi o sytuacjach, gdy czas i polityka firmy wymuszają szybsze, mniej inkluzywne decyzje — czyli o kompromisach między facylitacją a potrzebą decyzyjnej szybkości.

Dla architektów i zespołów: warto inwestować w warsztaty decyzyjne, jasne metryki i artefakty (decision records) oraz mechanizmy binding/non-binding decisions. To zmniejsza techniczny dług wynikający z nieświadomych, rozproszonych wyborów i uczy zespoły odpowiedzialności za konsekwencje.

**Key takeaways:**
- Architekt to przede wszystkim facylitator procesu decyzyjnego, nie centralny dyktator.
- Skupienie na praktyce podejmowania decyzji zmniejsza ryzyko nieprzemyślanych wyborów.
- Dokumentowanie i mierzenie kryteriów decyzji pomaga w przyszłych refaktoringach.

**Tradeoffs:**
- Facilitating decisions increases buy-in but sacrifice szybkość decyzji in high-pressure situations.

**Link:** [Great Architects Facilitate, Not Dictate Software Decisions](https://www.infoq.com/news/2025/07/great-architects-facilitate)

---

## Figma's $300,000 Daily AWS Bill Highlights Cloud Dependency Risks
**TLDR:** Z dokumentów IPO Figma wynika, że firma wydaje ~300 000 USD dziennie na AWS — to przypomnienie, że pełne poleganie na jednym dostawcy chmury tworzy zarówno koszty, jak i strategiczne ryzyka. Migracja poza chmurę lub do multi-cloud nie jest prosta z powodu głębokiej integracji usług.

**Summary:**
Figma ujawniła w S-1, że roczne wydatki na AWS wynoszą ~100 mln USD i że podpisała umowę z minimalnym zobowiązaniem ~545 mln USD na pięć lat. Artykuł pokazuje, że koszty chmury to nie tylko ceny maszyn — to także zależności projektowe: IAM, sieci, backup, monitoring, obrazy VM, kontenery zarządzane, event busy i mechanizmy DR, które są głęboko splecione z dostawcą.

Komentarze społecznościowe (np. Hacker News) dobrze to podsumowują: „przejście z chmury” to nie tylko przeniesienie VM-ów, lecz przepięcie całego ekosystemu. Autorzy artykułu i cytowani eksperci zwracają też uwagę na umowy SLA i ryzyko uzależnienia od polityk AWS — zmiana warunków lub przerwa w dostawie to realne zagrożenie dla ciągłości biznesu.

Czego brakuje w narracji: konkretnej analizy kosztów alternatywnych (on-prem, bare-metal, inna chmura) dla aplikacji o charakterze Figma, oraz planów na redukcję vendor lock-in poza generalnymi deklaracjami. Nie widać dyskusji o kosztach przeprojektowania systemów zależnych od funkcji specyficznych dla AWS ani o realnych scenariuszach przejścia.

Dla architektów i zespołów: jeśli twoja aplikacja rośnie do skali Figma, zaplanuj strategię minimalizującą lock-in (abstrakcje, interoperacyjne API, dane w formatach przenośnych) i inwestuj w kosztową widoczność. Negocjacje kontraktowe z chmurowym dostawcą oraz audyt punktów głębokiej integracji często zwraca inwestycję.

**Key takeaways:**
- Duże użycie chmury to zarówno koszt, jak i uzależnienie operacyjne.
- Migracja z chmury jest kosztowna i złożona ze względu na głębokie powiązania infrastruktury.
- Organizacje powinny audytować, które elementy systemu są trudne do przeniesienia i planować alternatywy.

**Tradeoffs:**
- Using AWS gives scalability and rich managed services but sacrifices control and increases vendor lock-in risk.

**Link:** [Figma's $300,000 Daily AWS Bill Highlights Cloud Dependency Risks](https://www.infoq.com/news/2025/07/figma-aws-costs)

---

## Azure AI Foundry Agent Service Gains Model Context Protocol Support in Preview
**TLDR:** Azure AI Foundry dodało wsparcie dla Model Context Protocol (MCP) w trybie preview, co ma upraszczać integracje agentów generatywnych z backendami poprzez „connect once, integrate anywhere”. MCP to krok ku interoperacyjności agentów AI.

**Summary:**
MCP (protokół zaproponowany przez Anthropic) to JSON-RPC-owy sposób publikowania narzędzi i kontekstu, które klient może odkrywać i wywoływać automatycznie. Azure Foundry jako klient MCP umożliwia import funkcji i zasobów z dowolnego serwera MCP i automatyczne ich udostępnianie agentom, opakowując wywołania w enterprise-grade security i logikę routingu.

To duże uproszczenie względem ręcznego tworzenia Azure Functions, OpenAPI czy indywidualnych wtyczek: programiści mogą podłączyć MCP server raz, a potem używać udostępnionych akcji i danych. Google i AWS też inwestują we wsparcie MCP, co sugeruje, że ten model integracji może stać się de‑facto standardem.

Krytycznie: MCP ułatwia integrację, ale też centralizuje powierzchnię ataku oraz zwiększa zależność od jakości opisu i zabezpieczeń serwerów MCP. Nie ma w tekście szczegółów o politykach autoryzacji, audytowalności wywołań czy latencjach przy routingu przez Foundry — aspekty kluczowe w systemach produkcyjnych.

Dla architektów i zespołów: MCP to okazja do szybkiego budowania agentów zdolnych korzystać z systemów firmowych, ale wdrożenie wymaga przemyślenia kontroli dostępu, limitów wywołań i wersjonowania narzędzi publikowanych przez serwery MCP. Warto przygotować plan testów bezpieczeństwa i obserwowalność invokacji.

**Key takeaways:**
- MCP upraszcza integrację agentów z backendami poprzez jednoformatowe publikowanie narzędzi i kontekstu.
- Azure Foundry jako MCP client przyspiesza development agentów enterprise.
- Należy zaprojektować polityki bezpieczeństwa i audytowania wywołań MCP.

**Tradeoffs:**
- Adopcja MCP enables rapid interoperability but sacrifices exposure control unless robust auth/audit safeguards are implemented.

**Link:** [Azure AI Foundry Agent Service Gains Model Context Protocol Support in Preview](https://www.infoq.com/news/2025/07/azure-foundry-mcp)

---

## Atlassian's 4 Million PostgreSQL Database Migration: When Standard Cloud Strategies Fail
**TLDR:** Atlassian przeniosło 4 miliony baz PostgreSQL (architektura "one database per tenant") do Amazon Aurora, co wymagało niestandardowych narzędzi i strategii z powodu skalowych ograniczeń zarządzanych usług. To studium przypadku, jak architektura danych determinuje złożoność migracji.

**Summary:**
Atlassian używa modelu „one database per tenant” dla Jira — podejścia, które daje izolację i możliwość horyzontalnego skalowania, ale przy olbrzymiej liczbie tenantów generuje miliony plików i unikalne wyzwania operacyjne. Konwersja instancji RDS PostgreSQL do Aurora zwykle jest prosta, lecz przy milionach plików i tysięcy baz na instancję napotkali limity Aurora (timeouty przy status check), co uczyniło standardowy cutover niewykonalnym.

Zespół zaprojektował strategię „draining” — stopniowe zmniejszanie liczby tenantów na instancjach i kontrola współbieżności, aby nie przeciążyć mechanizmów migracyjnych. Orkiestracja oparta na AWS Step Functions i feature flags pozwoliła ograniczyć downtime i zmienić endpointy tenantów dynamicznie. Projekt pokazał też, że architektoniczna decyzja sprzed lat (pojedyncza baza na tenant) ma bezpośrednie konsekwencje migracyjne i kosztowe dziś.

Artykuł dobrze opisuje techniczne wyzwania i pragmatykę, ale nie rozwija wątków kosztowych alternatyw architektury (np. multi-tenant schema per DB czy hybrydowe modele) ani kryteriów, kiedy przestać skłaniać się ku izolacji kosztem operacyjnej złożoności.

Dla architektów i zespołów: wybór modelu tenantów ma długoterminowe skutki — warto modelować operacyjną skrajność (cutovery, backupy, liczba plików) i uwzględniać je w decyzjach. Migracje na masową skalę wymagają własnych narzędzi orkiestracyjnych i strategii kontrolowania concurrency.

**Key takeaways:**
- Architektura „one DB per tenant” daje izolację, ale komplikuje migracje i operacje przy dużej skali.
- Standardowe mechanizmy chmurowe mogą napotkać limity; konieczne są niestandardowe procesy i narzędzia.
- Kontrola współbieżności i stopniowe drenaże to praktyczne strategie minimalizujące ryzyko.

**Tradeoffs:**
- One-database-per-tenant increases isolation and control but sacrifices migration simplicity and operational manageability at extreme scale.

**Link:** [Atlassian's 4 Million PostgreSQL Database Migration: When Standard Cloud Strategies Fail](https://www.infoq.com/news/2025/07/atlassian-postgresql-migration)

---

## Navigating Complexity, from AI Strategy to Resilient Architecture: InfoQ Dev Summit Munich 2025
**TLDR:** InfoQ Dev Summit Munich (15–16 października 2025) będzie skupiony na praktycznych, bezmarketingowych sesjach dotyczących AI zgodnego z regulacjami, bezpieczeństwa i budowy odpornych systemów. Program kładzie nacisk na konkretne wzorce i przypadki użycia.

**Summary:**
Konferencja stawia trzy główne osie: bezpieczna i suwerenna architektura w kontekście europejskich regulacji, przejście od AI-hype do realnych zastosowań biznesowych oraz budowanie odporności i wydajności systemów. W agendzie są tematy takie jak przygotowanie CI/CD pod kątem supply-chain security, prywatność w pipeline'ach ML, zastosowania graph neural networks w personalizacji oraz doświadczenia produkcyjne z systemami event-driven.

InfoQ podkreśla format peer-led i brak ukrytych pitchów produktowych — to sygnał, że sesje mają skupić się na praktyce. Mówcy z doświadczeniem korporacyjnym obiecują dzielić się zarówno sukcesami, jak i „bliznami” operacyjnymi — co jest wartościowe, bo pokazuje kompromisy, których nie ma w materiałach marketingowych.

Brakuje jednak szczegółów o konkretnych warsztatach technicznych dla frontendowych inżynierów (React/TypeScript) lub sesjach hands-on związanych z integracją agentów AI w aplikacjach webowych. Jeżeli twoim priorytetem jest frontend lub integracja LLM w produktach użytkowych, sprawdź agendę szczegółowo.

Dla architektów i liderów: wydarzenie to dobra okazja do skonfrontowania własnych praktyk z rynkowymi wzorcami, zebrania checklist bezpieczeństwa i poznania realnych trade-offów między suwerennością danych a wygodą chmurową.

**Key takeaways:**
- Konferencja skupia się na praktycznym zastosowaniu AI, bezpieczeństwie i odporności systemów.
- Peer-led format sprzyja wymianie prawdziwych doświadczeń i lekcji z produkcji.
- Dobry punkt startowy do zaktualizowania roadmap AI/bezpieczeństwa w firmie.

**Link:** [Navigating Complexity, from AI Strategy to Resilient Architecture: InfoQ Dev Summit Munich 2025](https://www.infoq.com/events/2025/dev-summit-munich)

---

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by gpt-5-mini LLM. While we strive for accuracy, please verify critical information independently.
