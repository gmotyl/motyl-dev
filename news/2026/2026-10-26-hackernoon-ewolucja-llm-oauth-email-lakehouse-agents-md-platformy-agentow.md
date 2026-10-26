---
title: "Ewolucja LLM, zaufanie do e-maila z OAuth, metadane lakehouse'ów i koszt zespołów agentów"
excerpt: "HackerNoon: cztery epoki treningu modeli, luka w weryfikacji e-maili przy OAuth, problem metadanych w lakehouse, nowy AGENTS.md, porównanie ośmiu platform agentowych i teza o hamowaniu AI."
publishedAt: "2026-10-25"
slug: "hackernoon-ewolucja-llm-oauth-email-lakehouse-agents-md-platformy-agentow"
hashtags: "#HackerNoon #ai #llm #agents #security #oauth #architecture #database #generated #pl"
source_pattern: "HackerNoon"
---

## Ewolucja LLM wyjaśniona tym, do czego je trenujemy

**TLDR:** Każdy skok w LLM-ach wziął się ze zmiany jednej rzeczy: celu treningu. Najpierw przewidywanie następnego tokena, potem bycie asystentem, następnie rozumowanie, a na końcu działanie narzędziami.

**Summary:** Autor porządkuje historię w cztery akty. W pierwszym, od GPT-1 do GPT-3, model uczy się przewidywać kolejne słowo i dzięki temu przyswaja gramatykę, fakty i znaczenie. Skala pokazuje, że z samego promptu można wykonać zadanie bez dostrajania. Problem polega na tym, że taki model wie, jak wygląda tekst, ale nie wie, jak ma odpowiadać, więc na pytanie o pieczenie chleba potrafi dopisać kolejne pytania.

W drugim akcie, w 2022 roku, przychodzi post-training: ludzie piszą wzorcowe odpowiedzi, oceniają odpowiedzi modelu, a model jest optymalizowany pod wyuczoną nagrodę. Rezultat jest zaskakujący, bo oceniający woleli InstructGPT z 1,3 miliarda parametrów od GPT-3 ze 175 miliardami. Trzeci akt to rozumowanie, wyrastające z tego, że w matematyce i kodzie odpowiedź da się sprawdzić automatycznie, co daje tanią nagrodę bez ludzi. Modele takie jak o1 uczą się pisać długie łańcuchy myśli, a DeepSeek-R1 pokazał otwarcie, że wystarczy sam trening ze wzmocnieniem. Czwarty akt przenosi rozumowanie do przestrzeni działań: model myśli, wykonuje akcję, obserwuje wynik i powtarza. Tak weszły agenty wyszukujące, kodujące i wreszcie ogólne.

Najciekawsza jest konkluzja, że prawdziwym motorem postępu są dane projektujące właściwy cel. Autor zauważa też otwarte problemy: niezawodność długich zadań, bo agent z 50 procentami skuteczności to demo, a z 95 to współpracownik, oraz brak pamięci między zadaniami. Pomija jednak koszty i energię oraz to, że wszystkie przytoczone wskaźniki pochodzą od samych laboratoriów.

**Key takeaways:**
- Każda epoka zmieniała cel treningu i zachowywała poprzednie.
- Weryfikowalne nagrody w kodzie i matematyce napędziły rozumowanie.
- Najważniejsze otwarte problemy to niezawodność i pamięć.

**Why do I care:** To dobra ściąga dla zespołu, który próbuje zrozumieć, dlaczego agent kodujący działa, a zwykły czat nie. Wniosek dla architekta: tam, gdzie wynik da się sprawdzić testem, agent będzie się szybko poprawiał, a tam, gdzie nie da się go zweryfikować, na przykład w ocenie UX, zachowaj nieufność.

**Link:** [The Evolution of LLMs, Explained Through What We Train Them to Do](https://hackernoon.com/the-evolution-of-llms-explained-through-what-we-train-them-to-do)

## Nie ufaj e-mailowi z OAuth

**TLDR:** Jeśli aplikacja uznaje adres e-mail od dostawcy OAuth za zweryfikowany bez sprawdzenia flagi weryfikacji, atakujący może przejąć konto. Autor nazywa tę klasę błędów niedopasowaniem zaufania przy weryfikacji OAuth.

**Summary:** Badacz zauważył, że rejestracja przez Google nie wymagała kodu z e-maila, który zwykła rejestracja wymagała. Postawił pytanie, co się stanie, gdy dostawca pozwala założyć konto z niezweryfikowanym adresem, a aplikacja przejmuje jego przekonanie o weryfikacji. Do testów użył Discorda, który pozwala korzystać z OAuth po potwierdzeniu numeru telefonu zamiast adresu e-mail. Aplikacje reagowały na cztery sposoby: odmową z komunikatem, odmową bez wyjaśnienia, akceptacją z kontem oznaczonym jako niezweryfikowane oraz akceptacją z pominięciem weryfikacji, czyli właśnie lukę.

Skutki to zmiana głównego adresu przez linkowanie OAuth, nieautoryzowane łączenie kont, przejęcie konta przed rejestracją ofiary, ślepe linkowanie do istniejącego zweryfikowanego konta oraz eskalacja uprawnień, gdy istnieją konta typu admin lub support albo uprawnienia nadawane na podstawie domeny. Przykłady z życia to CVE-2026-41574 w Nhost, gdzie adapter uznawał e-mail za zweryfikowany, jeśli pole nie było puste, oraz CVE-2026-53516 w Better Auth, gdzie automatyczne łączenie nie wymagało zweryfikowanego lokalnego konta. Autor dodaje listę kontrolną dla pentesterów i pięć zaleceń dla programistów: czytaj dokumentację dostawcy, sprawdzaj status weryfikacji, nie łącz kont tylko z powodu zgodnego e-maila i oddziel weryfikację OAuth od weryfikacji konta lokalnego.

Warto pamiętać, że autor zastrzega, iż jego odkrycia na nienazwanych celach są niemożliwe do sprawdzenia, a część wniosków to ostrożne spekulacje, na przykład o ataku 2FA bypass.

**Key takeaways:**
- Sprawdzaj flagę weryfikacji e-maila zwróconą przez dostawcę, a nie samą obecność adresu.
- Nie łącz kont automatycznie tylko dlatego, że adresy są zgodne.
- Wymagaj zweryfikowanego adresu także po stronie konta lokalnego.
- Dostawca OAuth może sam opierać się na innym dostawcy z własnymi lukami.

**Why do I care:** Jeśli twój frontend lub backend implementuje logowanie społecznościowe, a robisz to często przez bibliotekę, sprawdź, jak mapuje pole email_verified. To jedna linijka, która potrafi być różnicą między bezpiecznym logowaniem a przejęciem konta administratora.

**Link:** [Stop Trusting the OAuth Email: How One Missing Check Enables Account Takeover in 2026](https://hackernoon.com/stop-trusting-the-oauth-email-how-one-missing-check-enables-account-takeover-in-2026)

## Dlaczego lakehouse'y zawodzą na dużą skalę: problem metadanych

**TLDR:** Wydajność lakehouse'a zależy coraz bardziej od architektury metadanych, utrzymania i organizacji danych pod obciążenie, a nie od pojemności magazynu obiektów.

**Summary:** Formaty takie jak Iceberg, Delta Lake i Hudi dały transakcje, ewolucję schematu i dostęp oparty na metadanych. Mimo to zapytania zwalniają, planowanie się wydłuża, a małe pliki się kumulują. Autor wskazuje, że skalowalność magazynu to nie to samo co skalowalność zapytań, bo te same terabajty rozłożone na setki tysięcy małych plików mają zupełnie inny koszt planowania i skanowania.

Małe pliki wynikają z ciągłego ingestu i zbyt drobnego partycjonowania, a kompaktowanie samo zużywa moc i I/O, więc jest decyzją ekonomiczną, a nie sprzątaniem. Metadane, czyli manifesty Iceberga albo log transakcji Delty, trzeba traktować jak infrastrukturę krytyczną dla wydajności. Autor proponuje workload-aware maintenance oparte na pięciu sygnałach, od rozkładu rozmiarów plików po koszt utrzymania, i test porównujący brak optymalizacji, harmonogram stały i podejście zależne od obciążenia. Zastrzega, że to propozycja inżynierska, a nie udowodniony algorytm. Brakuje więc właśnie wyników, a sama formuła wartości netto jest bardzo uproszczona.

**Key takeaways:**
- Rozmiar danych to nie jedyny czynnik wydajności lakehouse'a, liczy się liczba plików i metadane.
- Kompaktowanie kosztuje, więc trzeba je uzasadniać.
- Zbyt drobne partycjonowanie może kosztować więcej, niż daje.

**Why do I care:** To temat głównie dla inżynierów danych. Frontendowiec zobaczy skutki, gdy panel analityczny zaczyna ładować się minutę, i warto wtedy zapytać zespół danych o liczbę plików, a nie o większy klaster.

**Link:** [Why Modern Data Lakehouses Fail at Scale: The Metadata Problem Nobody Talks About](https://hackernoon.com/why-modern-data-lakehouses-fail-at-scale-the-metadata-problem-nobody-talks-about)

## Uniwersalny AGENTS.md dla każdego agenta i stosu

**TLDR:** Autor wyodrębnił z popularnych repozytoriów instrukcji dla agentów jeden AGENTS.md niezależny od stosu, z rdzeniem poniżej 200 linii i modułami czytanymi tylko wtedy, gdy zadanie ich wymaga.

**Summary:** Rdzeń obejmuje zrozumienie zadania, małe zmiany, dane wrażliwe, debugowanie i weryfikację. Wyznacza też granice: bez wyraźnej prośby agent nie usuwa plików, nie przepisuje historii gita, nie robi force-push i nie osłabia testu, żeby przeszedł. Zamiast commitować, proponuje komunikat. Autor zastrzega, że to instrukcje, a rzeczy, które muszą być zablokowane, wymagają uprawnień, hooków lub CI.

Weryfikacja jest kluczowa: przed stwierdzeniem, że zadanie jest zrobione, agent ma uruchomić odpowiednie sprawdzenie, przeczytać wynik i go zgłosić. Moduły w katalogu rules mają warunek "czytaj, gdy", więc zadanie bez płatności nie ładuje do kontekstu reguł płatności. CI pilnuje limitów rdzenia. Instrukcje ładowania różnią się między Claude Code, Gemini CLI, Codexem i Cursorem. Reguła, że agent kończy odpowiedź stałym podpisem, jest sprytnym testem, czy instrukcje w ogóle dotarły do sesji.

**Key takeaways:**
- Krótki rdzeń i moduły ładowane na żądanie oszczędzają kontekst.
- Granice w instrukcjach nie zastępują uprawnień i hooków.
- Weryfikacja przed deklaracją sukcesu to najważniejsza reguła.

**Why do I care:** Jeśli utrzymujesz własny CLAUDE.md lub AGENTS.md, to dobry punkt odniesienia, co wyciąć. Zasada, że każda reguła musi odpowiadać na pytanie, czy agent by to zepsuł bez niej, to świetny filtr na rozrastające się pliki instrukcji.

**Link:** [Awesome AGENTS.md That Can Be Used on Any Agent and Any Stack](https://hackernoon.com/awesome-agentsmd-that-can-be-used-on-any-agent-and-any-stack)

## Osiem platform agentowych i realny koszt zespołu agentów

**TLDR:** Autor przetestował osiem platform na dziesięciu zadaniach i policzył rachunki, które wyszły od około 1,20 do 8 dolarów, a lokalne LLM-y na komputerze z 64 GB pamięci obniżają koszt do groszy.

**Summary:** Punkt wyjścia to liczby Anthropic: pojedynczy agent zużywa około czterokrotnie więcej tokenów niż zwykła rozmowa, a system wieloagentowy około piętnaście razy więcej. Dlatego pierwszy krok orkiestracji to budżet, a nie liczba agentów. Struktura jest zawsze ta sama: jeden agent prowadzący planuje, kilku wykonawców pracuje równolegle we własnych kontekstach, a weryfikator, człowiek lub drugi agent, sprawdza wynik.

Zadania obejmowały budowę funkcji full-stack w Claude Code za około 5 dolarów, równoległe pokrycie testami w Codexie, trzy prototypy stron w Grok Build, mapowanie monorepo w Antigravity, aktualizację dwunastu pakietów w Copilocie, dokumentację API w OpenCode, lokalizację w Pi i migrację typów w 200 plikach przez DeepSeek poza szczytem. Ranking autora stawia na czele Claude Code, potem Codex CLI, OpenCode, Copilot CLI i Pi. Zasada kciuka: zaczynaj od jednego agenta i dodaj drugiego dopiero wtedy, gdy potrafisz nazwać powód, czyli izolację, równoległość lub niezależną recenzję. Zespołu nie warto używać przy ściśle powiązanych zmianach, małych zadaniach, braku taniej weryfikacji i wrażliwym kodzie.

Rachunki to szacunki jednego autora na jego zadaniach, więc nie ma tu powtarzalności ani wariancji. Twierdzenie, że orkiestracji można się nauczyć w miesiąc, jest raczej opinią niż danymi.

**Key takeaways:**
- Mnożniki kosztu to około 4x dla agenta, 7x dla zespołu i 15x dla systemu wieloagentowego.
- Zaczynaj od jednego agenta i dodawaj kolejnych z konkretnego powodu.
- Weryfikuj innym modelem, testami lub człowiekiem.

**Why do I care:** Dla zespołu frontendowego najcenniejszy jest podział, kiedy zespół agentów się opłaca: równoległe, niezależne zadania jak migracje czy testy, a nie ściśle powiązane zmiany w komponentach. Mnożniki kosztu warto mieć przed oczami przy każdym planie limitów.

**Link:** [I Compared 8 AI Agent Platforms. Here's What Running a Team Actually Costs](https://hackernoon.com/i-compared-8-ai-agent-platforms-heres-what-running-a-team-actually-costs)

## Dlaczego laboratoria AI naprawdę naciskają na hamulec

**TLDR:** Autor odwołuje wcześniejszą tezę o ścianie danych. Twierdzi, że zamykane laboratoria wspierają regulacje, aby utrudnić życie otwartym modelom.

**Summary:** Punktem wyjścia jest wyciek z Google z 2023 roku zatytułowany "We Have No Moat", według którego otwarta społeczność dostarczała 90 procent możliwości za 1 procent kosztów. Autor argumentuje, że laboratoria, które wydają dziesiątki miliardów dolarów na obliczenia, muszą pobierać wysokie opłaty za API, a otwarte wagi te marże niszczą. Rozwiązanie to regulacje: progi mocy obliczeniowej wymagające rejestracji i audytów, odpowiedzialność producenta modelu za nadużycia osób trzecich oraz obowiązkowe wyłączniki zdalne, których nie da się zaimplementować w modelu działającym lokalnie.

To jednak teza, a nie dowód. Autor nie pokazuje żadnych dokumentów ani wypowiedzi, które potwierdzałyby, że motywem jest zniszczenie open source, a nie realne obawy bezpieczeństwa. Obie rzeczy mogą być prawdziwe jednocześnie. Warto też zauważyć, że wspomniany projekt SB 1047 ostatecznie nie stał się ustawą w pierwotnej formie, a argument o malejących marżach zakłada, że otwarte modele faktycznie dorównują czołowym.

**Key takeaways:**
- Autor widzi w regulacjach narzędzie obrony przed otwartymi modelami.
- Odpowiedzialność za użycie wag przez osoby trzecie uderza głównie w twórców open source.
- Argumentacja opiera się na motywach, a nie na udokumentowanych faktach.

**Why do I care:** To temat bardziej biznesowy i polityczny niż techniczny, ale ma konsekwencje dla wyboru stosu. Jeśli budujesz produkt na otwartych wagach, śledź przepisy o odpowiedzialności, bo mogą zmienić dostępność modeli szybciej niż jakakolwiek zmiana techniczna.

**Link:** [Why I Was Wrong About AI Companies Pumping the Brakes: It Wasn't About Data](https://hackernoon.com/why-i-was-wrong-about-ai-companies-pumping-the-brakes-it-wasnt-about-data)
