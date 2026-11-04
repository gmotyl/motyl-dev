---
title: "Legora: jak buduje się agentów dla prawników, ewaluacje bez dostępu do danych i koniec godzinowej stawki"
excerpt: "CTO Legora opowiada o ewaluacji agentów bez podglądu danych klientów, o wyborze modeli i o kilku prymitywach, z których powstaje cały produkt."
publishedAt: "2026-11-04"
slug: "latent-space-legora-agenci-dla-prawnikow"
hashtags: "#latent #ai #agents #llm #architecture #testing #generated #pl"
source_pattern: "Latent Space"
---

## Legora i agenci dla prawników

**TLDR:** Jacob Lauritzen, CTO Legora, tłumaczy, jak firma po rundzie 550 milionów dolarów przy wycenie 8,8 miliarda ewaluuje agentów bez dostępu do danych klientów. Produkt opiera się na kilku prymitywach, a nie na wielu funkcjach.

**Summary:** Legora przekroczyła 100 milionów dolarów ARR w kwietniu, mniej niż 18 miesięcy po starcie, i ma ponad 1800 klientów. Lauritzen pierwotnie uważał, że narzędzie przyspieszające prawników nie sprzeda się przy rozliczaniu godzinowym. Zmieniła to presja na firmy. W USA rutynowe zadania przechodzą na stałe stawki, a pieniądze przesuwają się do fuzji, sporów i pracy z klientem. Dobry junior jest według niego wart dziś więcej niż dwa lata temu.

Ewaluacja jest najtrudniejsza, bo nie wolno czytać śladów, a większość wgrywanych plików jest poufna. Trzech inżynierów i trzech prawników buduje środowiska RL, które odtwarzają pracę klientów, na przykład data room z 10 tysiącami plików do due diligence. Wyniki idą na mapę cieplną według praktyki i zadania, bo nowy model często poprawia jedne obszary i pogarsza inne. Na produkcji błędy klasyfikuje się do 10 do 20 znanych trybów i sprawdza tanimi testami LLM za feature flagami.

Modele radzą sobie z około 60 procentami pracy prawnej, więc tam liczy się koszt i opóźnienie. Złożona analiza milionowych tokenów nadal potrzebuje mądrzejszych modeli. Fable i Opus uważa za zbyt rozwlekłe przy redagowaniu, Astrę za zwięzłą. Każde zdanie agenta ma cytat z ramką w źródłowym PDF-ie. Produkt stoi na projektach z plikami, agencie, Tabular Review i listach z wyzwalaczami. Zespół urósł z planowanych 20 do 100 inżynierów.

**Key takeaways:**
- Ewaluacja opiera się na symulowanych środowiskach, bo śladów klientów nie wolno czytać.
- Błędy produkcyjne trafiają do 10 do 20 znanych trybów z tanimi testami LLM.
- Całość stoi na kilku prymitywach, w tym Tabular Review i listach.

**Why do I care:** Każdy zespół z poufnymi danymi ma ten sam problem i ten odcinek daje realny przepis. Autor nie opowiada jednak, ile kosztuje utrzymanie takiego zespołu ewaluacji i stu legal engineerów. To nie jest podejście dla firmy bez dwóch miliardów kapitalizacji.

**Link:** [Building AI for Lawyers, Jacob Lauritzen, CTO of Legora](https://www.latent.space/)
