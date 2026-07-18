---
title: "Jak nauczyć Claude'a swojego stylu raz na zawsze: Founder Skill Pack"
excerpt: "Praktyczny tutorial pokazujący, jak zbudować zestaw 5 trwałych umiejętności dla Claude'a, które ładują się automatycznie i eliminują konieczność ponownego tłumaczenia kontekstu przy każdej sesji."
publishedAt: "2026-07-17"
slug: "founder-skill-pack-claude-skills-tutorial"
hashtags: "#theaibreak #ai #claude #aitools #productivity #pl"
source_pattern: "The AI Break"
---

## Founder Skill Pack: 5 umiejętności Claude'a, które instalujesz raz i używasz co tydzień

**TLDR:** Tutorial opisuje budowę zestawu 5 trwałych "skills" w Claude, które automatycznie ładują kontekst o tobie i twoim biznesie w każdej nowej sesji. Koniec z ponownym tłumaczeniem tego samego na początku każdej rozmowy.

**Summary:**

Każdy, kto regularnie korzysta z Claude'a, zna ten problem. Spędzasz chwilę na nauczeniu modelu swojego stylu pisania, on doskonale go odtwarza, a następnie otwierasz nową rozmowę i zaczynasz od zera. Model nie pamięta nic. Ten cykl frustruje i marnuje czas.

Newsletter opisuje koncepcję "skills" w Claude jako rozwiązanie. Skill to folder z jednym plikiem tekstowym o nazwie SKILL.md. W środku: nazwa, opis i instrukcje. Mechanizm działa w taki sposób, że Claude przy każdej sesji odczytuje nazwy i opisy wszystkich skills. To prawie nic nie kosztuje pod względem tokenów. Gdy twoje zapytanie pasuje do opisu konkretnej umiejętności, Claude ładuje pełne instrukcje i działa. Różnica między zwykłym promptem a skillem jest zasadnicza: prompt to coś, co musisz pamiętać i nakładać, skill to coś, co samo się pojawia w odpowiednim momencie.

Founder Skill Pack obejmuje pięć narzędzi. Pierwszym jest Voice Twin, który generuje teksty w twoim własnym stylu, a nie w generycznym tonie AI. Drugi to Reply Desk odpowiadający klientom w twoim języku. Trzeci to De-Slop, czyli filtr eliminujący charakterystyczne sygnały "napisane przez AI". Czwarty to Brief Machine przekształcający dowolne pytanie w udokumentowany, jednostronicowy raport. Piąty to Weekly Review, który prowadzi cię przez poniedziałkowy przegląd tygodnia w kwadrans.

Instalacja jest prosta. Wklejasz blok ze skillem do Claude i piszesz: "Create this as a skill." Tyle. Claude tworzy plik, nadaje mu nazwę i aktywuje go. W Claude Code można dodać "for all my projects", żeby skill trafił do katalogu ~/.claude/skills/ i był dostępny w każdym projekcie. Bez tej frazy skill działa tylko w bieżącym projekcie.

Tutorial kładzie duży nacisk na stworzenie "Founder Profile" jako fundamentu wszystkich pięciu skills. Chodzi o zebranie faktów o biznesie w zwartą formę pod 200 słów, bez przymiotników niemożliwych do obrony danymi. Profil zawiera: opis biznesu, klienta docelowego, ofertę, najczęstsze pytania klientów, rzeczy których nigdy nie twierdzisz, i słowa zakazane w komunikacji. Oddzielny prompt buduje "Voice Card", czyli mapę twojego stylu pisania opartą na forensycznej analizie lingwistycznej rzeczy, które już napisałeś. Autor sugeruje, żeby analizować teksty pisane gdy byłeś lekko zirytowany, bo wtedy znika korporacyjny lakier.

Artykuł jest skierowany do założycieli startupów i soloprzedsiębiorców, jednak mechanizm skills ma znacznie szersze zastosowanie. Każdy specjalista powtarzający ten sam kontekst w sesjach z Claude'em skorzysta na takim podejściu.

**Key takeaways:**
- Skills w Claude różnią się od zwykłych promptów tym, że ładują się automatycznie gdy kontekst pasuje, nie wymagają ręcznego nakładania
- Founder Profile to trwały zapis faktów o biznesie w formie skondensowanego bloku pod 200 słów, który zasila wszystkie umiejętności
- Voice Card to wynik forensycznej analizy twoich własnych tekstów, konkretne reguły stylu, nie ogólna "vibe"
- W Claude Code skills można instalować globalnie (~/.claude/skills/) lub lokalnie per projekt
- De-Slop skill eliminuje charakterystyczne markery generowanego tekstu, co jest realnym problemem w komunikacji biznesowej

**Why do I care:**

Z perspektywy architekta i developera widzę tu coś wartościowego, ale też kilka niedomówień. Mechanizm skills to w istocie kontekstowe pre-prompty z automatycznym wyzwalaniem. Dla mnie fascynujące jest, że koszt tokenów na odczytanie nazw i opisów wszystkich skills jest znikomy, ale autor nie mówi, jak działa selekcja gdy wiele skills pasuje do zapytania jednocześnie. To nie jest detal. W złożonych przypadkach użycia może to prowadzić do konfliktów i nieoczekiwanego zachowania. Tutorial jest też mocno zorientowany na właścicieli firm, co oznacza, że brakuje mu przykładów dla przypadków technicznych: code review, architektura, documentation. Koncepcja jest solidna i warta wdrożenia. Tylko nie sprzedawaj mi tego jako magii, to po prostu dobra organizacja promptów z automatycznym ładowaniem.

**Link:** [Tutorial: Build Your Founder Skill Pack (5 Claude Skills You Install Once and Use Every Week)](https://theaibreak.substack.com/p/tutorial-build-your-founder-skill)
