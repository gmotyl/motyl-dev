---
title: "Latent.Space: dynamiczne przepływy Anthropic, czyli Claude sam układa topologię agentów"
excerpt: "Na AI Engineer New York Anthropic pokazał dynamic workflows: Claude pisze program orkiestracji i sam decyduje, ilu agentów użyć."
publishedAt: "2026-10-12"
slug: "latent-space-anthropic-dynamic-workflows-orkiestracja-agentow"
hashtags: "#latentspace #ai #agents #llm #architecture #generated #pl"
source_pattern: "Latent.Space"
---

## Jak dynamiczne przepływy Anthropic koordynują agentów Claude

**TLDR:** Dynamic workflows, w skrócie flows, to nowy typ orkiestracji wieloagentowej w Claude Managed Agents. Główny agent tworzy plan, pisze program orkiestracji i sam decyduje o liczbie oraz układzie agentów, zamiast korzystać z ręcznie skonfigurowanej listy podagentów.

**Summary:** Prezentujący z Anthropic, CJ Avilla i Harrison Stall, zaczęli od analogii do systemów operacyjnych: od Unixa Kena Thompsona po Linuksa z warstwami zaufanych opiekunów. Wniosek jest taki, że duże projekty agentowe potrzebują podobnej organizacji. Ludzie nadzorujący wielu agentów stają się wąskim gardłem, bo muszą zatwierdzać mnóstwo pull requestów.

Wcześniej w Claude Managed Agents trzeba było skonfigurować koordynatora i zestaw podagentów. Teraz agent prowadzący planuje pracę, pisze program, który uruchamia agentów, zbiera wyniki i zarządza przepływem informacji. Można też podać wstępnie skonfigurowanych podagentów. Pokazowy przykład to skaner listy akcji: faza skanowania rozdziela spółki między agentów z izolowanymi kontekstami, a faza przeglądu sprawdza wyniki przed raportem.

W pytaniach z sali wyszły praktyczne ograniczenia. Liczbę agentów reguluje się ewaluacjami i niskimi domyślnymi ustawieniami. Model nie zna swojego budżetu w trakcie pracy, ale programista może ustawić budżet sesji. Do poprawy kosztów między uruchomieniami sugerowano funkcję dreaming, która w wersji badawczej przepisuje magazyn pamięci na podstawie dawnych sesji, scala duplikaty i zastępuje nieaktualne wpisy. Agenty współdzielą system plików, ale nie mogą wysyłać sobie wiadomości przez API. W konsoli widać graf z ładunkiem przekazanym przy każdym przejściu. Flows kosztują wyraźnie więcej niż pojedynczy agent, za to dokładniej znajdują szczegóły.

**Key takeaways:**
- Claude sam wybiera topologię agentów i pisze program orkiestracji.
- Budżet ustawia się na sesję, bo model go nie zna.
- Flows są droższe, ale mają być skuteczniejsze przy dużych zadaniach.

**Why do I care:** To dobry kierunek, ale cały tekst relacjonuje prezentację producenta. Nie ma żadnych liczb kosztu ani porównania skuteczności poza zdaniem o "znacznie droższych" przepływach. Największe ryzyko to nieprzewidywalność: skoro nie wiadomo, ile agentów powstanie, budżet sesji staje się jedynym hamulcem. Dla architekta ważny jest widok grafu i ładunków, bo bez niego nie da się audytować, co agent przekazał dalej.

**Link:** [How Anthropic's Dynamic Workflows Coordinate Claude Agents](https://www.latent.space/p/claude-dynamic-workflows)
