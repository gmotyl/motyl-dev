---
title: "Twój drugi mózg to cmentarz. Zamień go w pamięć agenta AI."
excerpt: "Jak zbudować warstwę pamięci LLM wiki między swoimi notatkami a agentami AI, żeby research naprawdę działał."
publishedAt: "2026-07-08"
slug: "drugi-mozg-llm-wiki-agent-memory"
hashtags: "#decodingai #ai #agents #llmwiki #research #memory #obsidian #claudecode #generated #pl"
source_pattern: "Decoding AI"
---

## Twój drugi mózg to cmentarz. Zamień go w pamięć agenta AI.

**TLDR:** Po 18 miesiącach budowania osobistej bazy wiedzy z prawie 11 000 notatek autor odkrył, że większość z nich jest martwa, bo żaden agent ich nie używa. Rozwiązaniem jest LLM wiki jako warstwa pamięci między notatkami a harnesami AI.

**Summary:**

Paul Iusztin przyznaje wprost: miał 10 994 notatek w Obsidianie, Readwise, Notion i Google Drive, a i tak przy każdym nowym artykule albo kodzie pracował od zera albo tracił godzinę na szukanie. Odruchowe sięganie po Codex lub NotebookLM nic nie zmieniało, bo te narzędzia siedzą nad twoją pracą jak nakładki. Kiedy sesja się kończy, kontekst znika. Wracasz do punktu wyjścia i znowu tłumaczysz agentowi, czym jest projekt, który opisywałeś już dziesiątki razy.

Odpowiedzią, którą Iusztin opracował razem z Louisem-Françoisem Bouchardiem z Towards AI, jest AI Research OS: warstwa pamięci działająca między twoim drugim mózgiem a dowolnym harnesem AI. Zamiast wrzucać do okna kontekstu te same linki i wyjaśnienia przy każdej sesji, system buduje LLM wiki, bazę wiedzy utrzymywaną przez model i dostępną dla agentów w każdej chwili. To nie RAG na produkcję, nie baza wektorów, nie knowledge graph wymagający infrastruktury. To zwykłe pliki Markdown ze strukturą indeksu, a całość mieści się w katalogu roboczym projektu.

System ewoluował przez trzy wersje. Pierwsza scrapowała publiczny internet przez wieloetapową pętlę zapytań z podagentami i produkowała statyczny plik research.md. Druga skierowała tę samą pętlę na własne źródła: Obsidian, Readwise, GitHub Stars, Google Drive. Była lepsza, ale wynik wciąż był zamrożony. Trzecia, inspirowana pomysłem Andreja Karpathy'ego z GitHuba, dodała żywą wiki, do której model przyrostowo dopisuje nowe koncepty, porównania, pytania i syntezę. Google niezależnie ogłosiło Open Knowledge Format, który formalizuje dokładnie ten sam wzorzec w otwartym standardzie, co utwierdza autorów w słuszności kierunku.

Architektura jest celowo prosta. Folder raw trzyma niezmienne dane źródłowe. Folder wiki trzyma pochodne generowane przez LLM: encje, koncepty, porównania, notatki tematyczne. Plik index.yaml jest warstwą retrieval, której agent czyta najpierw, bo zawiera skróty i metadane każdego źródła. Model zaczyna od skrótów i sięga głębiej tylko gdy musi, więc kontekst pozostaje mały. Wiki nie jest globalna, jest skopowana do projektu, bo przy tysiącach dokumentów prosta struktura plikowa przestaje wystarczać i to jest właśnie moment, gdy baza wektorów ma sens. W każdym projekcie referencjonujesz snapshot swojego drugiego mózgu przez pętlę deep research, a Obsidian renderuje z tego graf połączeń za darmo, bo to zwykły Markdown ze wewnętrznymi linkami.

Cały system trafia jako open-source plugin do Claude Code, z czterema umiejętnościami: /research buduje lub odpytuje wiki, /research-distill generuje streszczenie na konkretny artykuł, /research-lint sprawdza zdrowie bazy pod kątem osieroconych źródeł, przeterminowanych twierdzeń i sprzeczności, a /research-render tworzy slajdy lub brief. Autorzy pokazują trzy dema: research z brain dump o harnesach agentic, porównanie trzech repozytoriów GitHub pod kątem architektury, i ad-hoc ingestion linków z pytaniami na żywo. Największe słabości to słabo napisane pochodne LLM i drobne błędy przy dużych bazach, np. mieszanie opisu mechanizmów narzędzi w Claude Code i OpenCode do jednego wyjaśnienia. Stąd istnieje /research-lint, który regularnie czyści sprzeczności.

**Key takeaways:**

- Większy kontekst okna LLM nie rozwiązuje problemu, bo re-pastujesz te same źródła przy każdej sesji. Potrzebujesz trwałej warstwy pamięci, a nie większego bufora.
- LLM wiki budowana z plain files i indeksu YAML jest tańszą i prostszą alternatywą dla RAG z bazą wektorów na potrzeby osobistego research OS.
- Wiki jest żywa w trzech wymiarach: ingestujesz nowe źródła, uruchamiasz kolejną rundę deep research, albo model tworzy pochodne wyłącznie z pytań, które zadajesz.
- Skopowanie wiki do projektu, nie do całego drugiego mózgu, to decyzja zarówno bezpieczeństwa jak i wydajności. Przy tysiącach dokumentów pora na bazę wektorów.
- Google's Open Knowledge Format formalizuje ten sam wzorzec w otwartym standardzie, co potwierdza, że to nie eksperyment, a kierunek ekosystemu.

**Why do I care:**

Jako developer pracujący z Claude Code na co dzień widzę dokładnie ten problem: każda nowa sesja zaczynam od "okej, mamy projekt X, tech stack Y, oto kontekst". Pomysł, żeby wynieść tę wiedzę do trwałej wiki skopowanej do projektu i podpiąć ją jako plugin do Claude Code, jest konkretny i natychmiast wykonalny. Nie wymaga Dockera, bazy danych ani MLOps. Interesuje mnie szczególnie pattern index.yaml jako warstwa retrieval z progressive disclosure, bo to elegancko rozwiązuje problem kosztów tokenów bez uciekania się do embeddingów. Słabości z błędami LLM przy większych bazach są realne i warto brać je poważnie, ale /research-lint jako regularny health-check to uczciwa odpowiedź. Repozytorium jest otwarte, więc nie ma powodu, żeby nie sprawdzić tego na własnych notatkach.

**Link:** [Your Second Brain Is a Graveyard. Make It Agent Memory.](https://www.decodingai.com/p/llm-wiki-agent-memory)
