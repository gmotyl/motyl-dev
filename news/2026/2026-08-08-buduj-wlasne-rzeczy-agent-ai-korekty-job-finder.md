---
title: "Buduj własne rzeczy, nawet te, które umierają"
excerpt: "Historia o agencie AI, który uczy się na korektach, dashboardzie zastąpionym 94 liniami kodu i agencie szukającym pracy dla znajomych - wszystko spięte jedną zasadą: buduj to, co chcesz naprawdę zrozumieć."
publishedAt: "2026-08-08"
slug: "buduj-wlasne-rzeczy-agent-ai-korekty-job-finder"
hashtags: "#joozio #ai-agenci #buildinpublic #automatyzacja #selfimprovement #generated #pl"
---

## Budowanie własnych rzeczy wciąż ma sens, nawet jeśli istnieje gotowe rozwiązanie

**TLDR:** Autor odpowiada na pytanie, które zadaje mu prawie każdy: po co budować własnego agenta AI, własny sklep, własny dashboard, skoro na rynku są gotowe narzędzia. Odpowiedź jest prosta i osobista - uczy się przez robienie, nie przez czytanie, więc buduje, żeby zrozumieć, a nie żeby mieć produkt.

**Summary:** Tekst zaczyna się od pytania, które w tej czy innej formie słyszał chyba każdy, kto kiedykolwiek napisał własny skrypt zamiast zainstalować gotową paczkę. Po co budować agenta, skoro jest OpenClaw z prawie 350 tysiącami gwiazdek na GitHubie? Po co własny sklep, skoro są platformy, które postawią go w godzinę? Autor nie broni się przed tym pytaniem, tylko wprost przyznaje, że nie uczy się z książek. Próbował, nie działa. Musi coś zbudować, zobaczyć jak się psuje, naprawić najpierw źle, potem lepiej, w końcu porządnie. Dopiero wtedy wie, jak to działa naprawdę.

Ciekawy jest fragment o kosztach tej filozofii. Dwa miesiące poszły na budowę własnego dashboardu kanban dla agenta, a potem okazało się, że ten sam efekt da się osiągnąć w 94 liniach kodu jako cienka nakładka na istniejące narzędzie. Autor bez sentymentu przełączył się na to rozwiązanie. To akurat mi się podoba, bo pokazuje, że "buduj wszystko sam" nie jest tu dogmatem, tylko praktyczną zasadą z wyjątkami. Reguła, którą sam sobie wypracował, brzmi: buduj te części, które chcesz zrozumieć, używaj gotowych tam, gdzie zrozumienie nie jest ci do niczego potrzebne. Trudność polega na uczciwej ocenie, która część jest którą.

Drugi wątek, który wybrzmiewa mocniej niż bym się spodziewał, dotyczy tego, co zmienia się w erze asystentów kodujących. Skoro i tak można poprosić model o naprawienie czegoś, to czy w ogóle ma znaczenie, kto zbudował system od zera? Autor odpowiada, że tak, bo różnica ujawnia się w momencie, gdy trzeba ocenić diff wygenerowany przez model. Kto rozumie architekturę, ten czyta zmianę i decyduje, czy ją zaakceptować. Kto nie rozumie, ten musi jej po prostu zaufać. To jest różnica między posiadaniem kontroli a poleganiem na czyimś słowie, nawet jeśli tym kimś jest model językowy.

Na koniec pojawia się rada dla osób, które dopiero zaczynają: nie buduj wszystkiego od zera pierwszego dnia. Użyj gotowego narzędzia, wyślij coś w świat, a dopiero po kilku tygodniach, gdy poznasz swój rzeczywisty workflow, zacznij zastępować te części, które chcesz mieć na własność. Kolejność ma znaczenie - najpierw używanie, potem budowanie, i to nie wszystkiego naraz.

**Key takeaways:**
- Budowanie własnych narzędzi uczy przez proces, nie przez lekturę dokumentacji czy tutoriali
- Zasada podziału pracy: buduj to, co chcesz rozumieć, kupuj albo instaluj resztę
- Zrozumienie architektury systemu decyduje o tym, czy potrafisz ocenić diff wygenerowany przez model, czy musisz mu ślepo zaufać
- Sensowna kolejność dla początkujących to najpierw używanie gotowych narzędzi, dopiero potem zastępowanie wybranych części własnym kodem

**Why do I care:** Z perspektywy kogoś, kto od lat patrzy na zespoły frontendowe walczące z frameworkami, które "mają wszystko wbudowane", ten tekst trafia w sedno pewnego problemu z inżynierią ostatnich lat. Coraz częściej wybieramy narzędzia, żeby oszczędzić czas na start, a potem płacimy za to latami niezrozumienia własnego systemu, gdy trzeba go debugować w piątek wieczorem. Zasada "buduj to, co chcesz rozumieć" to dobry filtr decyzyjny przy wyborze między własnym rozwiązaniem a kolejną biblioteką z npm, i szczerze mówiąc warto ją stosować częściej niż domyślne "po co odkrywać koło na nowo".

**Link:** [Building Your Own Things Is Cool Too](https://thoughts.jock.pl/p/building-your-own-things-is-cool-too-2026)

## Agent, który się poprawia: pętla korekt i cztery różne rodzaje pamięci

**TLDR:** Autor opisuje mechanizm, dzięki któremu jego osobisty agent AI uczy się na bieżąco z poprawek wypowiadanych zwykłym językiem w trakcie pracy. Kluczowy jest podział na cztery różne rodzaje pamięci oraz tablica w Basecampie, na której każda korekta jest widoczna i można ją odrzucić, zanim agent zdąży utrwalić błędną lekcję.

**Summary:** Punktem wyjścia jest obserwacja, którą chyba każdy programujący z asystentem AI rozpozna natychmiast. Codzienna praca z agentem to nie pisanie promptów, tylko ciągłe poprawianie w locie - "nie linkuj tego", "użyj czystego tekstu", "przestań potwierdzać każdy krok". Problem w tym, że większość systemów każe powtarzać te same poprawki w kółko, bo nic z nich nie zostaje zapamiętane na dłużej. Autor zbudował pipeline, który nazwał capture, classify, graduate - przechwyć korektę, sklasyfikuj ją jednym z sześciu typów za pomocą prostych wyrażeń regularnych, a następnie w nocnym procesie zapisz ją w odpowiednim miejscu, tak żeby żadna poprawka nie została pominięta bez śladu.

Najbardziej wartościowy fragment dotyczy tego, że "pamięć" jako pojedyncze pojęcie to zły sposób myślenia o problemie. Autor rozbija ją na cztery różne szuflady, z których każda ma inny cykl życia. Pamięć robocza to bieżący tydzień, plany, kontekst rozmowy, dane, które mają prawo wygasnąć. Lekcje to pełne opisy incydentów z przyczyną, naprawą i słowami kluczowymi, coś w rodzaju wewnętrznych postmortemów, których uzbierało się już ponad dwieście. Pamięci zwrotne to pojedyncze reguły z sekcją "dlaczego" i "jak stosować", które da się linkować i kasować. Na samej górze są reguły ładowane zawsze przy starcie sesji, pisane wielkimi literami, do których dochodzi się dopiero po tym, jak dany problem wróci więcej niż raz.

Liczby, które autor pokazuje, robią wrażenie właśnie dlatego, że nie są podkoloryzowane. Dwadzieścia dwie korekty w ciągu trzydziestu dni, trend spadkowy, ale skuteczność zadań spadła w tym samym czasie z 93,5 do 92,6 procent. Autor otwarcie mówi, że to nie jest dowód na to, że agent generalizuje wiedzę, tylko trend na jednym użytkowniku i jednym obciążeniu roboczym. To akurat rzadkość w tego typu wpisach, bo zwykle ktoś prezentuje same dobre liczby.

Kluczowym elementem całej układanki jest tablica Behavioral Learning w Basecampie, na którą trafia każda przechwycona korekta jako osobna karta. Autor może ją przeczytać, odrzucić, połączyć z inną albo poprawić, zanim trafi do finalnej reguły. Bez tego elementu, jak sam pisze, model mógłby uczyć się złych lekcji z pełnym przekonaniem, że są dobre - i tu akurat zgadzam się bez zastrzeżeń, bo to jest dokładnie ten scenariusz, którego boję się najbardziej przy jakiejkolwiek autonomii nadanej modelowi.

**Key takeaways:**
- Pipeline korekt działa w trzech krokach: przechwycenie, klasyfikacja regexem, nocne rozpisanie do odpowiedniego pliku
- Cztery rodzaje pamięci z różnym cyklem życia: robocza, lekcje, pamięci zwrotne, reguły najwyższego poziomu
- Człowiek w pętli, w postaci przeglądanej tablicy korekt, jest tym, co chroni przed utrwaleniem błędnych wniosków przez model
- Spadająca liczba korekt nie jest dowodem generalizacji, tylko trendem na jednym zestawie danych, i tak trzeba to czytać

**Why do I care:** To jest jeden z niewielu tekstów o "self-improving agents", który nie sprzedaje magii, tylko pokazuje inżynierię za kulisami, łącznie z niewygodnymi liczbami. Dla mnie jako kogoś, kto projektuje systemy dla zespołów, najciekawszy jest właśnie podział pamięci na cztery różne byty o różnym czasie życia - to jest wzorzec, który da się przenieść wprost do projektowania dowolnego systemu z pamięcią kontekstową, niezależnie od tego, czy mówimy o agencie osobistym, czy o produkcie dla klientów. Warto zapamiętać jedno zdanie z tego tekstu: jeśli pozwolisz modelowi oceniać własne korekty bez nadzoru, dostaniesz agenta, który uczy się złych lekcji z pełnym przekonaniem.

**Link:** [I Built a Self-Improving AI Agent](https://thoughts.jock.pl/p/i-built-a-self-improving-ai-agent)

## Agent do szukania pracy, który nigdy nie aplikuje sam

**TLDR:** Autor zbudował agenta, który codziennie o 6:15 rano przegląda oferty pracy dla bliskich znajomych, ocenia je względem indywidualnego profilu i wysyła maila z trzema do pięciu rolami wraz z uzasadnieniem. Cała reszta decyzji, od napisania listu motywacyjnego po wysłanie aplikacji, zostaje po stronie człowieka.

**Summary:** Historia zaczyna się od typowego doświadczenia szukania pracy - alerty z LinkedIn, szum informacyjny, ogłoszenia, które są nieaktualne, zanim zdążą dotrzeć do skrzynki. Autor od razu ustala jedną twardą zasadę, zanim napisał choćby linijkę kodu: agent nie aplikuje za nikogo. Filtruje, ocenia i tłumaczy dlaczego dana rola pasuje, ale decyzję o poświęceniu godziny na konkretną firmę zostawia człowiekowi. To rozgraniczenie wraca w tekście kilka razy i wyraźnie widać, że to nie jest przypadkowy wybór, tylko świadoma granica.

Najbardziej praktyczna część tekstu dotyczy profilu, na podstawie którego agent ocenia oferty. Zamiast jednej roli docelowej autor każe wpisywać kilka ścieżek naraz, bo dobry kandydat pasuje zwykle do więcej niż jednego wzorca. Do tego dochodzą twarde reguły geograficzne, próg wynagrodzenia, konkretne, niewynikające z niejasnych odczuć powody odrzucenia oferty, oraz kilka przykładów ról, które dana osoba faktycznie by chciała. Ten ostatni element, konkretne przykłady zamiast opisowego promptu, działa najlepiej - i to akurat pasuje do wszystkiego, co wiemy o pracy z modelami językowymi, że przykłady biją instrukcje.

System źródeł jest podzielony na trzy poziomy z różną częstotliwością odpytywania, każde źródło ma swój cooldown, a do pobierania treści używane są trzy różne narzędzia w zależności od tego, jak dana strona jest zbudowana. Punktacja ofert to sztywny, powtarzalny zestaw reguł, nie suwak, który agent przesuwa według nastroju - dopasowanie ścieżki, geografia, język, wynagrodzenie, jedno zdanie uzasadnienia i jedno zdanie wątpliwości. Sześć punktów na dziesięć to twardy próg wejścia do porannego maila, i autor wprost mówi, że woli dostać dwie dobre oferty jutro niż pięć przeciętnych dzisiaj.

Najciekawszy fragment dla mnie dotyczy pętli odpowiedzi. Ludzie nie odpowiadają na automatyczne alerty, ale odpowiadają na osobisty mail, który kończy się prostym pytaniem. Jedna linijka odpowiedzi - "nie ta branża", "za wysokie stanowisko", "więcej takich jak ta" - trwale zmienia profil, dodaje regułę wykluczającą albo zapisuje pozytywny przykład na przyszłość. To jest ta sama architektura korekt, którą autor opisał przy okazji agenta osobistego, tylko przeniesiona na inną domenę i sprawdzona na prawdziwych ludziach, nie tylko na sobie.

**Key takeaways:**
- Twarda granica między agentem a człowiekiem: odkrywanie i wyjaśnianie po stronie agenta, decyzja i działanie po stronie człowieka
- Profil kandydata z kilkoma ścieżkami docelowymi, twardymi regułami geograficznymi i konkretnymi przykładami działa lepiej niż opisowy prompt
- Punktacja ofert to powtarzalny zestaw reguł z twardym progiem wejścia, nie subiektywna ocena modelu
- Pusty dzień bez sensownych ofert powinien oznaczać brak maila, a nie wypełniacz, bo słaby mail uczy odbiorcę, żeby przestał go otwierać

**Why do I care:** To jest jeden z niewielu opisów agenta AI, w którym granica autonomii jest ustawiona świadomie i konsekwentnie, zamiast rozmywać się w miarę jak projekt rośnie. Z perspektywy kogoś, kto doradza firmom przy wdrażaniu automatyzacji, ten wzorzec - agent robi odkrywanie i wyjaśnianie, człowiek podejmuje decyzję - jest dokładnie tym, czego brakuje w większości wdrożeń AI w firmach, gdzie ambicja od razu sięga pełnej automatyzacji i kończy się utratą zaufania użytkowników. To jest też przykład bardziej biznesowy niż czysto techniczny, więc warto go czytać jako case study procesu decyzyjnego, a nie jako gotowy przepis architektoniczny do skopiowania.

**Link:** [I Built a Job Finder Agent for My Friends](https://thoughts.jock.pl/p/job-finder-agent-live-walkthrough-2026)
