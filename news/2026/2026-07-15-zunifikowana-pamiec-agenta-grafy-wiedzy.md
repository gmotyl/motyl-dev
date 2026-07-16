---
title: "Jak zbudować zunifikowaną pamięć agenta od podstaw — przez grafy wiedzy"
excerpt: "Przewodnik po architekturze pamięci agentów AI: ontologie, ścieżki zapisu, wyszukiwanie grafowe i dylemat build vs buy."
publishedAt: "2026-07-15"
slug: "zunifikowana-pamiec-agenta-grafy-wiedzy"
hashtags: "#decodingai #ai #agents #llm #architecture #ml #prompt-engineering #generated #pl"
source_pattern: "Decoding AI"
---

## Jak zbudować zunifikowaną pamięć agenta od podstaw

**TLDR:** Nikt jeszcze nie rozwiązał problemu pamięci agentów AI w pełni. Ten artykuł pokazuje, jak zbudować własną zunifikowaną warstwę pamięci opartą na grafach wiedzy — z ontologią, pipelinami ingestion, wyszukiwaniem i serwowaniem przez MCP. To najtrudniejsza wersja, bo tylko rozumiejąc ją, można świadomie wybrać prostsze rozwiązanie.

**Summary:**

Rynek narzędzi do pamięci agentów AI — Graphiti, mem0, HydraDB, cognee — rośnie w zawrotnym tempie, co samo w sobie jest sygnałem, że nikt nie ma jeszcze dobrej odpowiedzi. Zanim wskoczysz w któreś z tych narzędzi, warto zrozumieć, co dzieje się pod spodem. Autor daje tu konkretny przykład: LangChain's MongoDBGraphStore, z pięciu dokumentów, wygenerował 17 typów węzłów i 34 typy relacji, gdzie "part_of", "Part Of" i "part of" były traktowane jako trzy różne relacje. To jest dokładnie ta klasa problemów, na którą trzeba być przygotowanym.

Architektura zaproponowana w artykule opiera się na MongoDB jako jednej bazie danych, która obsługuje jednocześnie wyszukiwanie tekstowe, wektorowe i grafowe w jednej kolekcji. Dwa trwałe pipeline'y — data pipeline i memory pipeline — normalizują dane źródłowe i produkują obiekty grafu wiedzy. Orchestrator (Prefect lub DBOS) zapewnia trwałość i skalowalność. Warstwa serwowania działa przez serwer FastMCP, który eksponuje agentom gotowe prymitywy (query, deep-search, ingest) zamiast surowych operacji bazodanowych. Co ważne: hak konwersacyjny sprawia, że każda sesja jest automatycznie ingekstowana z powrotem do pamięci, co autor nazywa "continual learning".

Najciekawszą częścią jest ontologia. Autor definiuje ją jako kontrakt między piszącym a czytającym — LLM ekstrahuje dane zgodnie z ontologią, a warstwa zapytań ją czyta. Ontologia bazuje na modelu POLE+O (Person, Object, Location, Event, Organization) — tym samym, którego używa analiza kryminalistyczna — i definiuje węzły, krawędzie oraz semantyczne typy relacji. Definicja w Pydantic, serializacja przez model_json_schema(), jeden artefakt dla dwóch konsumentów. Prosta zasada, duży efekt.

Pipeline zapisu ma siedem etapów: chunking dokumentu (512 tokenów, 64 overlap), ekstrakcja węzłów i krawędzi przez LLM, walidacja Pydantic, rozwiązywanie nazw, embeddingi, deduplikacja, upsert do MongoDB. Kluczowy szczegół: model widzi tylko jeden chunk i nic poza nim, nie dostaje ID ani wcześniejszego stanu. Deduplikacja działa na embeddingach całej zawartości węzła — powyżej 0.95 cosine następuje scalenie, poniżej 0.85 powstaje nowy węzeł, a w szarej strefie zapisywana jest krawędź same_as do ręcznej weryfikacji. Błędne scalenie jest jedyną nieodwracalną pomyłką w tym systemie, dlatego niepewne przypadki nie są scalane automatycznie.

Jeśli chodzi o decyzję build vs buy — autor proponuje trzy poziomy. Poziom pierwszy: budujesz wszystko sam. Poziom drugi: korzystasz z SDK (Graphiti, neo4j-labs/agent-memory, mem0) i skupiasz się na logice biznesowej. Poziom trzeci: używasz gotowego silnika jak cognee czy managed Zep. Rekomendacja? Poziom drugi, bo daje własność logiki przy rozsądnym koszcie inżynieryjnym. Autor przyznaje jednak szczerze, że osobiście nadal trzyma długoterminową pamięć w Obsidian, Readwise i Google Drive, a jako pamięć agenta generuje "LLM wiki" dla konkretnych projektów z plików Markdown. To działa dla użytku osobistego, ale nie dla produkcji.

**Key takeaways:**

- Nikt nie rozwiązał jeszcze problemu pamięci agentów — duże narzędzia robią to bardzo różnie, a gotowe rozwiązania bez konfiguracji generują chaotyczne grafy.
- Ontologia to fundament całego systemu — zdefiniowana raz jako Pydantic schema, używana zarówno przez pipeline zapisu jak i warstwa zapytań.
- Model POLE+O (Person, Object, Location, Event, Organization) daje solidny punkt startowy dla wiedzy ogólnego przeznaczenia.
- Deduplikacja węzłów grafu to operacja, która może być nieodwracalna — "szara strefa" (0.85–0.95 cosine) powinna trafić do ręcznej weryfikacji, nie automatycznego scalenia.
- Zamiana z MongoDB na Neo4j jest uzasadniona dopiero przy 4+ hopach, 100M–1B wektorów, lub gdy grafy są samą logiką biznesową — wcześniej MongoDB wystarczy.
- Append-only log daje wersjonowanie, ale potrafi pomnożyć RAM z ~10 GB do ~40 GB — warto dwa razy przemyśleć, czy naprawdę potrzebujesz pełnej historii.
- Poziom 2 (SDK + własna logika biznesowa) jest najlepszym kompromisem między elastycznością a kosztem inżynieryjnym.

**Why do I care:** Pamięć agentów to problem, który wróci do każdego, kto buduje cokolwiek poważniejszego niż demo. Fascynuje mnie tu kilka rzeczy jednocześnie. Po pierwsze, ontologia jako "kontrakt" to wzorzec, który znam z dobrych systemów typowania — i cieszę się, że trafia do AI engineering. Po drugie, artykuł uczciwie pokazuje granicę między tym, co warto zbudować samemu, a tym, co warto kupić — i rekomendacja poziomu drugiego (SDK + własna logika) brzmi rozsądnie dla większości projektów. Jest jednak coś, o czym autor nie mówi wprost: problem "kiedy zapomnieć" jest równie trudny jak problem "jak zapamiętać". Nieograniczone grafy pamięci z continual learning będą się degenerować w czasie — szczególnie przy złej jakości ekstrakcji lub driftujących ontologiach. To jest dług techniczny, który rośnie cicho. Dla każdego, kto planuje budować agenty operujące na własnym kontekście przez dłuższy czas, ta architektura to dobry punkt startowy — ale też ostrzeżenie, ile złożoności można nieświadomie zaimportować.

**Link:** [How to Implement a Unified Memory from Scratch](https://www.decodingai.com/p/how-to-implement-a-unified-memory-from-scratch)
