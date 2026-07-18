---
title: "Jeden agent na model: jak kontrolować, które umiejętności ładuje Kilo"
excerpt: "Kilo nie ma wbudowanego przełącznika umiejętności per model, ale custom agents dają ten sam efekt jednym kliknięciem."
publishedAt: "2026-07-17"
slug: "jeden-agent-na-model-kilo-custom-agents"
hashtags: "#kilo #ai #llm #developer-tools #agents #pl"
source_pattern: "Kilo"
---

## Jeden agent na model: kontroluj, które umiejętności ładuje Kilo

**TLDR:** Kilo nie posiada natywnego przełącznika umiejętności per model, ale custom agents rozwiązują ten problem. Tworzysz jeden profil agenta na model, każdy z własną polityką umiejętności, i przełączasz się między nimi jednym ruchem.

**Summary:**

Pytanie z Discorda Kilo brzmiało prosto: czy można automatycznie włączać i wyłączać umiejętności w zależności od używanego modelu? Problem jest jak najbardziej realny. Dla modeli open-weight, takich jak GLM5 czy DeepSeek v4, umiejętność taka jak superpowers dodaje prawdziwą strukturę do wieloetapowych zadań. Dla modeli frontier pokroju GPT-5.6 czy Fable 5 ładowanie tej samej umiejętności to wyrzucanie tokenów kontekstu w błoto i niepotrzebne spowolnienie.

Kilo dziś nie ma per-model skill toggle. Umiejętności trafiają do wspólnej puli, a agent sam decyduje, której użyć na podstawie opisu. Ale jest konfiguracja, która daje ten sam efekt jednym naciśnięciem klawisza: custom agents. Agent to profil łączący model, system prompt i uprawnienia do narzędzi. Tworzysz agenta per model, dajesz każdemu własną politykę umiejętności, i zmiana agenta zmienia wszystko naraz.

Mechanika działa tak: przy starcie sesji Kilo skanuje katalogi z umiejętnościami i odczytuje wyłącznie metadane każdej z nich, czyli nazwę, opis i ścieżkę. Te metadane trafiają do system promptu, co jest tanie, bo to kilka linii na umiejętność. Dopiero kiedy agent uzna, że zadanie pasuje do opisu danej umiejętności, wywołuje narzędzie skill, które ładuje pełne SKILL.md do kontekstu. To jest ta droga część, którą chcesz kontrolować per model.

Masz dwie dźwignie. Pierwsza to prompt agenta, który może instruować model, kiedy sięgać po umiejętność, a kiedy ją pominąć. Druga to uprawnienia, bo narzędzie skill podlega tym samym regułom allow/ask/deny co bash czy edit. Ustawisz deny i pełna umiejętność nie załaduje się bez względu na to, co postanowi model. Autorzy proponują dwa przykładowe agenty: deep-work przypięty do GLM 5.2 z instrukcją do korzystania z superpowers przy złożonych zadaniach, oraz fable-lean przypisany do Fable 5 z blokadą tej umiejętności na poziomie uprawnień.

Jeden uczciwy caveat, który autorzy sami przyznają: zablokowanie umiejętności nie usuwa jej metadanych z system promptu. Nazwa i opis nadal się pojawiają, co to kilka linii, nie tysiące tokenów z pliku instrukcji. Jeśli chcesz całkowicie wyciągnąć umiejętność z promptu, musisz trzymać ją poza wspólnymi katalogami i ładować przez skills.paths w kilo.jsonc tylko dla projektów, które jej potrzebują. To przełącznik per projekt, nie per model, ale składa się z konfiguracją agentów.

**Key takeaways:**

- Custom agents w Kilo łączą model, system prompt i uprawnienia w jeden profil
- Przełączenie agenta to jedno działanie w VS Code lub Tab w CLI
- Umiejętności mają dwie dźwignie kontroli: prompt (doradczy) i uprawnienia (egzekwujące)
- Reguła deny blokuje ładowanie pełnego pliku umiejętności, ale jej metadane nadal trafiają do system promptu
- Pliki agentów to markdown z YAML frontmatter, przechowywane w .kilo/agent/ dla projektu lub ~/.config/kilo/agent/ globalnie
- Reguły uprawnień działają według zasady last-match-wins, więc fallback "*" powinien być pierwszy

**Why do I care:**

To jest dokładnie ten typ funkcji, który sprawia, że narzędzia dla developerów stają się użyteczne w praktyce, a nie tylko na demo. Każdy, kto pracuje z kilkoma modelami równolegle, wie, że ich możliwości i słabości są różne. Ładowanie tych samych instrukcji do modelu frontier, który i tak ignoruje rusztowania, bo po prostu nie potrzebuje, to marnotrawstwo kontekstu i pieniędzy. Podoba mi się, że Kilo daje tu dwie dźwignie, prompt i uprawnienia, bo to uczciwe rozróżnienie między "proszę nie rób" a "nie możesz tego zrobić". Szkoda tylko, że nie da się w prosty sposób wyciągnąć metadanych umiejętności z systemu promptu dla konkretnego agenta, bo to luka w tej konfiguracji. Ale całe podejście jest przemyślane i warte zastosowania od razu, jeśli używasz Kilo z więcej niż jednym modelem.

**Link:** [One agent per model: control which skills load in Kilo](https://blog.kilo.ai/p/match-skills-to-models-with-custom)
