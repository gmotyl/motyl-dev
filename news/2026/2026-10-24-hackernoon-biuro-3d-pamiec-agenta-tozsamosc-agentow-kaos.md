---
title: "Trójwymiarowe biuro lokalnych agentów, pamięć agenta jako problem wyszukiwania i tożsamość agentów na Kubernetesie"
excerpt: "Lokalne agenty na jednym RTX 4090, benchmark pamięci agenta na jednej tabeli Postgresa i drugie podejście do tożsamości agentów w KAOS."
publishedAt: "2026-10-24"
slug: "hackernoon-biuro-3d-pamiec-agenta-tozsamosc-agentow-kaos"
hashtags: "#hackernoon #ai #agents #llm #postgresql #kubernetes #security #architecture #react #generated #pl"
source_pattern: "HackerNoon"
---

## I Built a 3D Office Where Local AI Agents Share One RTX 4090

**TLDR:** Autor zbudował izometryczne biuro 3D, w którym każdy pracownik to lokalny agent na jednej karcie RTX 4090. Trudniejsza od sceny okazała się walka z zmyślaniem faktów przez model.

**Summary:** Aplikacja działa w przeglądarce. Agenci przechodzą stały potok: plan, research, szkic i samosprawdzenie, a autor zatwierdza wynik albo odsyła go z komentarzem. Stos jest celowo mały: Next.js, React Three Fiber, Zustand, FastAPI, PostgreSQL, Ollama z modelem 27 miliardów parametrów i lokalna wyszukiwarka. Całość powstała w około trzy dni z pomocą Claude Code.

Najciekawsza decyzja architektoniczna to zasada, że jedynym źródłem prawdy jest baza. Scena 3D niczego nie decyduje, tylko renderuje stan. Pozycja figury to czysta funkcja stanu i czasu, więc po odświeżeniu albo w drugiej karcie każdy stoi w tym samym miejscu. Jedna karta to jedno zapytanie naraz, więc agenci stoją w kolejce. Autor ukrył to w kuchni: gdy czekanie na model przekracza 30 sekund, agent idzie do ekspresu do kawy. Kolejka do kawy jest kolejką do GPU, pokazaną jako miejsce.

Są też konkrety wydajnościowe. Instancjonowanie obniżyło liczbę wywołań rysowania z 893 do 117. Model zajmuje około 17 GB z 24 i generuje około 100 tokenów na sekundę. Spadek do 25–30 tokenów okazał się osieroconym procesem serwera modelu, który trzymał drugą kopię w pamięci. Model zmyślał też odległość między miastami i opisywał autora jako studiującego, choć ma dyplom. Pomogły data w prompcie systemowym, etap samosprawdzenia i dwie reguły zakazujące wymyślania faktów. Jedna zmyślona fraza i tak przeszła.

Narzędzia sieciowe są tylko do odczytu, a adres jest sprawdzany po rozwiązaniu DNS, by blokować sieci lokalne i prywatne. Pierwsze prawdziwe zadanie, szukanie ofert pracy, zwróciło 34 wakaty i żadnej rekomendacji, bo większość to kursy reklamowane jako praca. Pusta lista była poprawną odpowiedzią.

**Key takeaways:**
- Baza jako jedyne źródło prawdy sprawia, że widok 3D jest tylko renderem.
- Jeden GPU oznacza jedną kolejkę, a wizualizacja kolejki pomaga zrozumieć opóźnienia.
- Model zmyśla, więc ostatnia kontrola należy do człowieka.

**Why do I care:** Dla frontendowca to dobry przykład czystego przepływu danych: store jako migawka, scena jako funkcja stanu. Autor trafnie zauważa, że delegowanie idzie łatwiej, gdy widać pracę. Brakuje mi natomiast jednego: skoro ocena "gotowe" należy do niego, to skala tego podejścia kończy się na jednej osobie z jednym GPU.

**Link:** [I Built a 3D Office Where Local AI Agents Share One RTX 4090](https://hackernoon.com/i-built-a-3d-office-where-local-ai-agents-share-one-rtx-4090)

## Agent Memory Is a Search Problem, Not a Storage Problem

**TLDR:** Zespół zastąpił rozbudowane potoki pamięci agenta jedną tabelą w Postgresie i trzema narzędziami MCP. Na benchmarku LoCoMo uzyskał F1 równe 0,665 z Claude Sonnet.

**Summary:** Dominujące założenie brzmi: modelowi nie można ufać w szukaniu, więc system musi wcześniej przetworzyć rozmowę. Wyciąga się fakty, buduje grafy encji, streszcza sesje. Autorzy to przetestowali. Każda tura rozmowy to wiersz w tabeli, bez wywołań modelu przy zapisie, a agent sam decyduje, jak szukać: semantycznie, pełnotekstowo, wyrażeniem regularnym, po ścieżce drzewa i po zakresie czasu.

Z ponad 45 eksperymentów wynika kilka rzeczy. Agent szukający sam wygrywa ze stałym potokiem, 0,584 do 0,481 na rozmowie strojeniowej. Złożoność interfejsu narzędzia kosztuje: zamiana schematu z jednym parametrem na dziewięć obniżyła wynik o 0,09, bo agent tracił budżet na czytanie schematów. Zdjęcie limitu wywołań narzędzi dało plus 0,031. Wyciąganie faktów nie poprawiło wyniku, a wydłużyło zapis o połowę.

Najważniejsza uwaga dotyczy odrzucania pytań, na które nie ma odpowiedzi. Prawie każda zmiana poprawiająca odpowiedzi pogarszała odmowy, a wiele prac wyklucza te pytania z oceny. Autorzy uczciwie wypisują ograniczenia: porównują Claude z modelami GPT, nie zapisali wersji modeli, a zbiór jest mały i nie mówi nic o skali.

**Key takeaways:**
- Interfejs narzędzia jest ważniejszy niż potok przetwarzania.
- Mniej parametrów w narzędziu daje lepsze wyniki agenta.
- Ocenianie bez pytań adwersarialnych ukrywa koszt halucynacji.

**Why do I care:** To argument dla zespołów, które budują warstwy streszczeń i grafów przed pierwszym pomiarem. Zacząłbym od jednej tabeli i dobrze zaprojektowanych narzędzi. Pamiętam jednak o zastrzeżeniu: tekst pochodzi od firmy, która sprzedaje hosting Postgresa, a koszt zapytania (cztery–pięć tur modelu) przy dużym ruchu może przeważyć oszczędność przy zapisie.

**Link:** [Agent Memory Is a Search Problem, Not a Storage Problem](https://hackernoon.com/agent-memory-is-a-search-problem-not-a-storage-problem)

## Agent Security & Identity (Part 2)

**TLDR:** Autor wdraża na klastrze projekt tożsamości agentów w KAOS i sprawdza, czy zapewnia, że agent nie robi więcej niż użytkownik, w którego imieniu działa.

**Summary:** Przykład to dwoje użytkowników tej samej platformy: Alice z grupy badaczy i Bob z grupy wsparcia. Badane są cztery pytania: czy agent żądający narzędzia dla użytkownika z niewłaściwej grupy zostanie odrzucony, jak autoryzować wywołania agenta do własnych narzędzi i modeli, co dzieje się z agentem autonomicznym bez użytkownika oraz czy prośba o usługę zewnętrzną, jak GitHub, wychodzi jako Alice.

Centralnym pomysłem jest rozdzielenie dwóch tożsamości: podmiotu, czyli człowieka, dla którego praca jest wykonywana, i aktora, czyli agenta. Dostęp do zasobów egzekwuje się na aktorze, a to, co użytkownik osobiście delegował, na podmiocie. Dzięki temu uprawnienia zostają poprawne, gdy agenci wołają innych agentów. Wszystkie wywołania przechodzą przez jedną bramę, a polityka sieciowa blokuje obejścia. Przechowywaniem tokenów zewnętrznych zajmuje się osobny broker tożsamości, a Keycloak potwierdza, kim jest człowiek i do jakich grup należy.

Autor podkreśla, że najwięcej nauczył się z odrzuconych żądań. Zastrzega też, że na lokalnym klastrze GitHub jest atrapą, więc ekran zgody kończy się automatycznie, choć decyzje o tożsamości i dostępie są prawdziwe.

**Key takeaways:**
- Podmiot (człowiek) i aktor (agent) to dwie osobne tożsamości w każdym wywołaniu.
- Jedna brama na każdym skoku upraszcza egzekwowanie reguł.
- Token zewnętrzny pozwala wiedzieć, dla którego użytkownika agent działał, i cofnąć go tylko jemu.

**Why do I care:** Wspólny token API dla agenta to dziś najczęstszy skrót i najgorszy. Ten wzorzec pokazuje, jak wyglądałaby poprawna alternatywa. To tekst infrastrukturalny, więc dla czystego frontendowca jest wtórny, ale każdy, kto projektuje produkt z agentami wywołującymi cudze API, powinien rozumieć rozdział podmiotu i aktora. Nie widzę tu natomiast mowy o koszcie utrzymania tylu komponentów w małym zespole.

**Link:** [Agent Security & Identity (Part 2): Who Are You, Who's Your Agent, And What Should They Be Allowed?](https://hackernoon.com/agent-security-and-identity-part-2-who-are-you-whos-your-agent-and-what-should-they-be-allowed)

## I Compared 8 AI Agent Platforms. Here's What Running a Team Actually Costs

**TLDR:** Autor porównuje osiem platform agentów na dziesięciu zadaniach i pokazuje, jak lokalne modele mogą obniżyć koszt niemal do zera. Wymaga to jednak około 64 GB pamięci.

**Summary:** Punkt wyjścia to statystyka o wzroście ofert pracy dla orkiestratorów AI o 1294 procent w rok. Autor twierdzi, że umiejętność nie jest tak trudna, jak się wydaje: potrzeba dobrej znajomości Gita, średniej znajomości basha i wiedzy o dziedzinie zadania. Podstawowy układ jest zawsze ten sam: jeden agent prowadzący z planem i budżetem, kilku robotników w osobnych oknach kontekstu i jeden weryfikator.

Liczby kosztów pochodzą z opisu systemu badawczego Anthropic. Pojedynczy agent zużywa około czterokrotnie więcej tokenów niż zwykły czat, a system wieloagentowy około piętnastokrotnie, przy czym samo zużycie tokenów tłumaczyło około 80 procent różnicy wyników. Dlatego uczciwy start to budżet, a nie dziesięć agentów naraz. Tekst przechodzi platformy po kolei: Claude Code, Codex, Grok, Gemini, Copilot, OpenCode, Pi i DeepSeek, każdą na jednym zadaniu, a potem opisuje, kiedy zespół agentów się opłaca, a kiedy lepszy jest jeden.

Brakuje mi tu dowodów na tezę o kosztach bliskich zeru. Autor sam przyznaje, że jakość lokalnych modeli nie będzie optymalna, a sprzęt za 64 GB ma swoją cenę. Rachunek pomija też czas poświęcony na poprawianie słabszego wyniku.

**Key takeaways:**
- Wieloagentowy system zużywa wielokrotnie więcej tokenów niż pojedynczy agent.
- Budżet i podział ról (prowadzący, robotnicy, weryfikator) są ważniejsze niż liczba agentów.
- Lokalne modele zmniejszają koszt, ale kosztem jakości i sprzętu.

**Why do I care:** Jeśli planujesz wdrożyć agentów w zespole, najpierw policz tokeny i ustal budżet, a potem wybieraj platformę. Porównanie ośmiu narzędzi jest użyteczne jako lista, choć to jeden autor i jego zadania, nie niezależny benchmark.

**Link:** [I Compared 8 AI Agent Platforms. Here's What Running a Team Actually Costs](https://hackernoon.com/i-compared-8-ai-agent-platforms-heres-what-running-a-team-actually-costs)
