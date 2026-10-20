---
title: "Darmowy internet jako pożyczka, skille pisane przez agentów, Zero-GC w .NET i koniec danych treningowych"
excerpt: "Eseje o enshittification, przeglądzie skilli agentów, Codex Cloud, programowaniu bez alokacji w .NET, kończących się danych treningowych, AGENTS.md i geometrii w AI."
publishedAt: "2026-10-20"
slug: "darmowy-internet-skille-agentow-zero-gc-dotnet-dane-treningowe"
hashtags: "#hackernoon #ai #agents #dotnet #performance #llm #security #architecture #generated #pl"
source_pattern: "HackerNoon"
---

## Darmowy internet był pożyczką, a Big Tech ją teraz ściąga

**TLDR:** Były bankier z Belgradu tłumaczy pogorszenie internetu skończeniem się taniego pieniądza. Platformy przeszły od zdobywania użytkowników do wyciągania renty.

**Summary:** Autor spędził ponad dwadzieścia lat w bankowości komercyjnej i patrzy na internet jak na bilans. Po kryzysie 2008 roku stopy były bliskie zera, a kapitał wpływał do funduszy venture z jednym poleceniem, zdobywać rynek za wszelką cenę. Przejazdy, zdjęcia w chmurze i streaming były subsydiowane, a my wzięliśmy dumping za innowację.

Pomaga mu pojęcie enshittification, które ukuł Cory Doctorow. Najpierw platforma obsypuje użytkowników, potem zwraca się do klientów biznesowych, na końcu wyciska obie strony. Google nie pogorszył indeksowania, tylko zauważył, że natychmiastowa odpowiedź nie generuje płatnych kliknięć. Amazon pobiera od sprzedawców opłaty za logistykę i reklamy, a Netflix po przyzwyczajeniu widzów podniósł ceny i dodał reklamy. Autor zestawia też ciemne wzorce z praktykami, które bankowe regulacje wyplenią od dawna.

Jego rady są proste. Zakładaj, że darmowe ma ukrytą ratę balonową, anuluj usługi z labiryntem rezygnacji i wybieraj otwarte, nudne narzędzia, na przykład RSS i lokalne pliki. To uczciwy esej, choć pomija jedno. Wielu z nas, deweloperów, te platformy sami budowało.

**Key takeaways:**
- Tani kapitał subsydiował usługi poniżej kosztu.
- Po zamknięciu rynku platformy przechodzą do wyciągania renty.
- Autor radzi audytować cyfrowe zależności jak portfel kredytowy.

**Why do I care:** To przede wszystkim opowieść o biznesie, ale dotyczy nas przy każdej decyzji o zależności od cudzego API. Darmowy tier jest ceną wejścia, nie umową. Przy architekturze zawsze pytam, ile kosztuje wyjście.

**Link:** [The Free Internet Was Just a Subsidized Loan, and Now Big Tech Is Collecting](https://hackernoon.com/the-free-internet-was-just-a-subsidized-loan-and-now-big-tech-is-collecting)

## Twój agent pisze własne skille. Kto je czyta?

**TLDR:** Skille agentów to pliki tekstowe, które zmieniają zachowanie wszystkich przyszłych uruchomień. Autorzy proponują traktować folder ze skillami jak repozytorium z przeglądem zmian.

**Summary:** Skill to katalog z plikiem SKILL.md, w którym są metadane i instrukcje w markdownie. OpenClaw ładuje skille z warstw, od przestrzeni roboczej po wbudowane, i odświeża je w trakcie sesji. Hermes sam wyciąga skill z rozwiązanego zadania i dalej go poprawia. W obu przypadkach to zwykłe pliki, co ułatwia diffy, ale też ułatwia ciche zmiany.

Autorzy wymieniają sześć wzorców psucia się skilli. To nadmierne dopasowanie do jednego zadania, nieaktualne założenia, sprzeczności między skillami, rosnące uprawnienia, ciche przesłanianie i rozdęty kontekst. Proponowana rutyna to wersjonowanie folderu w gicie ze znacznikiem znanego dobrego stanu, czytanie diffów, lista kontrolna, linter frontmattera i sekretów oraz zestaw promptów odtwarzanych na stagingu. Skille mają przechodzić przez stany robocze, zatwierdzone i wycofane.

Warto zachować dystans. Tekst kończy się reklamą hostingu Cloudways z kodem promocyjnym, a autorzy przyznają, że niezależnych dowodów na długofalowe zyski z samodoskonalenia skilli jest mało. Sama rutyna przeglądu jest jednak rozsądna.

**Key takeaways:**
- Skill to stałe polecenie dla agenta, więc jego zmiana wpływa na każde kolejne uruchomienie.
- Folder ze skillami warto wersjonować i przeglądać jak kod.
- Trzeba mierzyć, które skille faktycznie się uruchamiają.

**Why do I care:** Mamy już pull requesty do kodu, a skille agentów żyją poza nimi. Jeśli zespół używa agentów, folder ze skillami powinien być w repozytorium i przechodzić code review. To dziesięć minut konfiguracji, które oszczędza wieczór debugowania dziwnych wyników.

**Link:** [Your Agent Is Writing Its Own Skills. Who Is Reading Them?](https://hackernoon.com/your-agent-is-writing-its-own-skills-who-is-reading-them)

## Jak używać Codex Cloud, od GitHuba do pierwszego pull requesta

**TLDR:** Instrukcja krok po kroku, jak przygotować środowisko w chmurze, zlecić agentowi zadanie i przejrzeć wynik. Nacisk jest na weryfikację, a nie na zaufanie.

**Summary:** Codex Cloud pozwala oddać zadanie agentowi pracującemu w zdalnym środowisku. Przepływ to przygotowanie środowiska, publikacja i uruchomienie zadania. Publikacja zapisuje punkt startowy dla nowych zadań, nie wdraża aplikacji. Zalecenie jest rozsądne. Zacznij od repozytorium, które rozumiesz, i przeczytaj raport z konfiguracji, bo brakująca baza albo prywatny rejestr pakietów wymagają osobnej uwagi.

Autor każe najpierw poprosić o wyjaśnienie projektu, a dopiero potem o konkretną poprawkę z jasnym zakresem, na przykład o błąd w granicach wyszukiwania binarnego z testami dla pustej tablicy i brakującego celu. Po zadaniu czytasz diff, uruchamiasz testy samodzielnie i prosisz o pull request. Zmiany z chmury nie pojawiają się lokalnie, więc trzeba je pobrać z brancha. Środowiska chmurowe nie mają obecnie przeglądarki ani dostępu do twojego VPN, więc zmiany w interfejsie sprawdzasz lokalnie.

**Key takeaways:**
- Środowisko publikujesz raz i używasz jako punkt startowy zadań.
- Zakres zadania powinien być wąski, z konkretnymi testami.
- Wynik zawsze czytasz i uruchamiasz samodzielnie.

**Why do I care:** To dobry opis procesu, ale ma jedną lukę. Nie mówi, co zrobić, gdy agent pasuje testy do własnej poprawki. Dlatego zawsze patrzę, czy testy regresyjne rzeczywiście padały przed zmianą.

**Link:** [How to Use Codex Cloud: From GitHub Setup to Your First Pull Request](https://hackernoon.com/how-to-use-codex-cloud-from-github-setup-to-your-first-pull-request)

## Zero-GC w .NET z jawną własnością pamięci

**TLDR:** Długi przewodnik po ścieżkach krytycznych bez alokacji zarządzanych w .NET, od Span i stackalloc po areny i Unity. Główna rada to mierzyć, zanim zaczniesz usuwać alokacje.

**Summary:** Zero-GC nie oznacza wyłączenia garbage collectora. Chodzi o to, by ścieżki krytyczne nie tworzyły nowych obiektów na stercie zarządzanej. Architektura jest prosta. Alokujesz przy starcie, wielokrotnie używasz pamięci w trakcie pracy i zwalniasz przy zamknięciu. Autor rozróżnia trzy pojęcia, które często się mieszają, czyli wykonanie bez alokacji, pamięć niezarządzaną i region bez GC. Zero alokacji w jednej metodzie nie gwarantuje braku pauz GC w całym procesie.

W przykładach pojawia się formatowanie tekstu do bufora na stosie, symulacja cząsteczek w ciągłym bloku pamięci natywnej, binarny kodek telemetrii z 12 bajtami na wiadomość i pula tablic w endpoincie ASP.NET Core. Ten ostatni autor uczciwie nazywa przyjaznym alokacjom, a nie w pełni wolnym od GC. Jest też prosty alokator arenowy z ostrzeżeniem, że reset unieważnia wszystkie wcześniejsze przydziały. Druga połowa dotyczy Unity, z zapytaniami fizyki bez alokacji, pulą obiektów i zadaniami z Burst.

Najlepsze zdanie tekstu brzmi tak. Dobrze zaprojektowana tablica zarządzana potrafi wygrać ze źle zaprojektowaną pamięcią natywną. Artykuł jest długi i dość podręcznikowy, ale poprawny.

**Key takeaways:**
- Alokuj raz, używaj wielokrotnie, zwalniaj na końcu.
- Mierz alokacje, pauzy GC i opóźnienia ogonowe, nie tylko średnią.
- Pamięć niezarządzana dodaje ryzyka, takie jak use-after-free.

**Why do I care:** To temat dla backendowców .NET i twórców gier, a nie dla przeciętnego frontendowca. Warto go znać jako wzorzec. Najpierw profil, potem optymalizacja, a pamięć natywną zostaw na koniec.

**Link:** [Designing Zero-GC Hot Paths in .NET With Explicit Memory Ownership](https://hackernoon.com/designing-zero-gc-hot-paths-in-net-with-explicit-memory-ownership)

## Prawdziwy powód, dla którego firmy AI zwalniają, to nie bezpieczeństwo

**TLDR:** Autor twierdzi, że branży kończą się oryginalne dane tekstowe, a sieć zalewa treść syntetyczna. Znaki wodne mają chronić własne scrapery, a nie powstrzymywać oszustów.

**Summary:** Teza zaczyna się od ostrzeżenia Epoch AI, że publiczne ludzkie teksty wysokiej jakości wyczerpią się między 2026 a 2028 rokiem. Nowa treść w sieci jest coraz częściej generowana maszynowo, więc kolejne modele uczyłyby się na wyjściach poprzednich. Autor powołuje się na badania z Oksfordu i Cambridge o zapaści modeli, w której rekurencyjne trenowanie gubi rzadkie ogony rozkładu.

Ciekawy jest argument o znakach wodnych. Są łatwe do usunięcia, więc nie służą wykrywaniu oszustw. Służą temu, by laboratoria mogły odfiltrować własne wyniki z danych treningowych. Konsekwencje według autora to zamykanie otwartej sieci, syntetyczne dane tylko tam, gdzie jest weryfikowalna prawda, jak kod w piaskownicy, oraz wzrost wartości ludzkiej pracy twórczej.

Tekst przedstawia to jako pewnik, ale to hipoteza. Autor nie podaje, ile treści w rzeczywistości jest syntetyczne, a część wniosków opiera się na anegdotach o znajomych. Jeśli ktoś mówi, że branża milczy o problemie, to dobrze sprawdzić, czy sam nie milczy o liczbach.

**Key takeaways:**
- Wyczerpywanie publicznych danych tekstowych to realne ryzyko.
- Znaki wodne mogą służyć głównie filtrowaniu danych treningowych.
- Syntetyczne dane działają tam, gdzie jest weryfikator, na przykład kompilator.

**Why do I care:** Dla programisty ważny jest wniosek o kodzie. Tam syntetyczne dane mają weryfikator i dlatego modele kodujące będą się poprawiać szybciej niż te od prozy. Reszta to dobry powód, by nie wyrzucać własnych archiwów i dokumentacji.

**Link:** [The Real Reason AI Companies Are Tapping the Brakes (Hint: It's Not Safety)](https://hackernoon.com/the-real-reason-ai-companys-are-tapping-the-brakes-hint-its-not-safety)

## Uniwersalny AGENTS.md dla dowolnego agenta i stosu

**TLDR:** Autor odtworzył najlepsze pomysły z popularnych repozytoriów z instrukcjami dla agentów i zebrał je w jednym pliku AGENTS.md, niezależnym od stosu.

**Summary:** Rdzeń mieści się w mniej niż 200 liniach i 32 KiB, a CI pilnuje obu limitów. Obejmuje zrozumienie zadania, małe zmiany, dane wrażliwe, debugowanie i weryfikację. Agent nie ma kasować plików, przepisywać historii gita, robić force-push ani osłabiać testów, żeby przeszły. Zamiast commita proponuje komunikat.

Bardziej specjalistyczne zasady leżą w osobnych modułach, każdy z opisem, kiedy go czytać, na przykład dla baz danych, płatności czy cache. Przed zadeklarowaniem sukcesu agent ma uruchomić odpowiedni test, przeczytać wynik i zgłosić go. Autor słusznie zaznacza, że zakazy w pliku to tylko instrukcje, a rzeczy, które mają być zablokowane bezwzględnie, wymagają uprawnień, hooków albo CI.

**Key takeaways:**
- Rdzeń ma limit 200 linii i 32 KiB.
- Moduły ładują się tylko wtedy, gdy zadanie ich wymaga.
- Zakazy w pliku nie zastępują twardych uprawnień.

**Why do I care:** Limit rozmiaru to najlepszy pomysł. Pytanie przy każdej nowej regule, czy agent źle by to zrobił bez niej, wyrzuca większość tego, co ludzie wpisują do swoich plików z instrukcjami.

**Link:** [Awesome AGENTS.md That Can Be Used on Any Agent and Any Stack](https://hackernoon.com/awesome-agentsmd-that-can-be-used-on-any-agent-and-any-stack)

## Osiem platform agentowych i ile kosztuje zespół agentów

**TLDR:** Długi przewodnik porównuje osiem platform, od Claude Code po DeepSeek, na dziesięciu zadaniach. Autor proponuje lokalne modele jako sposób na wyzerowanie kosztów tokenów.

**Summary:** Przeczytałem początek i spis treści, nie cały tekst. Autor zaczyna od statystyki, że ogłoszenia dla orkiestratorów AI wzrosły o 1294 procent w rok, i twierdzi, że umiejętności są prostsze, niż się wydaje. Wymienia znajomość gita, podstawy basha i wiedzę dziedzinową. Powołuje się na dane Anthropic, według których pojedynczy agent zużywa około czterokrotnie więcej tokenów niż zwykła rozmowa, a system wieloagentowy około piętnastokrotnie.

Struktura przewodnika obejmuje po jednym scenariuszu na platformę, na przykład równoległe pokrywanie testami w Codex przez git worktrees, migrację dwunastu pakietów w Copilot i całonocną migrację 200 plików w DeepSeek. Na końcu są lokalne modele na 64 GB pamięci i lista darmowych kursów. Sama zasada podziału na lidera, robotników i weryfikatora jest zdrowa. Teza, że lokalne modele wyzerują koszt, pomija sprzęt i gorszą jakość, o której autor sam wspomina.

**Key takeaways:**
- Wieloagentowość kosztuje kilkanaście razy więcej tokenów niż czat.
- Rola lidera, robotników i weryfikatora powtarza się na każdej platformie.
- Lokalne modele obniżają koszt tokenów kosztem jakości.

**Why do I care:** Mam zastrzeżenie do całej narracji. Przewodnik sprzedaje orkiestrację jako umiejętność do opanowania w miesiąc, a największy problem, czyli weryfikacja wyników, dostaje najmniej miejsca. Zacząłbym od jednego agenta i dobrych testów.

**Link:** [I Compared 8 AI Agent Platforms. Here's What Running a Team Actually Costs](https://hackernoon.com/i-compared-8-ai-agent-platforms-heres-what-running-a-team-actually-costs)

## Matematyka, która obala mity o AI

**TLDR:** Autor twierdzi, że część problemów AI wynika z wyboru złej przestrzeni matematycznej, a nie z braku skali. Pokazuje pięć mitów z geometrią i symetrią.

**Summary:** Pierwszy mit mówi, że więcej przykładów oznacza więcej wiedzy. Jeśli obrót nie zmienia tożsamości obiektu, to wszystkie obroty tworzą jedną orbitę, którą można traktować jako jeden przypadek. Autor nazywa koszt ignorowania tego długiem niezmienniczości. Drugi mit dotyczy okna kontekstu. Widzieć dawną wypowiedź to nie to samo, co pamiętać, jak wpłynęła na stan, i tu pojawia się holonomia.

Trzeci mit twierdzi, że kolejność w prompcie nie ma znaczenia. Autor sugeruje, że część efektów kolejności można opisać torsją, ale sam ostrzega, że to hipoteza. Czwarty mit to więcej wymiarów daje lepszą reprezentację. Struktury drzewiaste lepiej pasują do przestrzeni hiperbolicznej, bo rośnie wykładniczo jak drzewo. Piąty mit mówi, że AI nie zna tego, czego nie widziała. Znając regułę obrotu, nie trzeba pokazywać każdego kąta.

Tekst jest w dużej części reklamą własnej platformy z animacjami i wymaga przyjęcia kilku pojęć na słowo. Kierunek, czyli wbudowywanie symetrii w modele, jest realny i badany.

**Key takeaways:**
- Znana symetria pozwala nie uczyć się tego samego wielokrotnie.
- Przestrzeń hiperboliczna lepiej reprezentuje hierarchie.
- Część tez to hipotezy, nie wyniki.

**Why do I care:** To nie wpłynie na twoją pracę w tym kwartale. Dobrze jednak wiedzieć, że pytanie, czy skala jest jedyną drogą, nadal jest otwarte, zwłaszcza gdy ktoś sprzedaje ci kolejny klaster GPU.

**Link:** [The Mathematics That Breaks the Biggest Myths About AI](https://hackernoon.com/the-mathematics-that-breaks-the-biggest-myths-about-ai)
