---
title: "Durable Objects bez Cloudflare, koniec No Code i Claude na tropie hipotezy Riemanna"
excerpt: "Przegląd tygodnia: self-hostowany klon Durable Objects, upadek platform No Code, Angular w wersji enterprise, trochę filozofii o tarciu w projektowaniu i Claude robiący postępy w matematyce, której nikt nie rozumie na pierwszy rzut oka."
publishedAt: "2026-08-12"
slug: "durable-objects-koniec-no-code-claude-riemann"
hashtags: "#uidev #frontend #javascript #durableobjects #angular #ai #nocode #mojo #generated #pl"
source_pattern: "ui.dev"
---

## celld, czyli miłosny list do Durable Objects

**TLDR:** Ryan Dahl (tak, ten od Node.js i Deno) wypuścił celld, open source'ową i self-hostowaną implementację Durable Objects Cloudflare'a. Ten sam model programowania, ale na własnej infrastrukturze i, jak twierdzi autor, rząd wielkości taniej przy większej skali.

**Summary:** Durable Objects Cloudflare'a to jeden z tych konceptów, które brzmią mądrze na konferencjach, a mało kto potrafi wytłumaczyć w dwóch zdaniach, o co w nich chodzi. W skrócie to proces workera, baza SQLite obok niego i replikowany zapis do storage poza maszyną, na przykład do S3 czy R2. Zapis nie jest potwierdzany, dopóki nie trafi na to zewnętrzne storage, więc jeśli proces padnie, stan da się odtworzyć bez utraty danych. Cały ten model istnieje od sześciu lat i przez ten czas był zamknięty w ekosystemie Cloudflare.

Teraz Ryan Dahl wypuszcza celld, projekt, który implementuje dokładnie ten sam interfejs API, działa nawet z wrangler, ale komponenty są zaprojektowane tak, żeby uruchomić je na dowolnej infrastrukturze chmurowej. Architektura jest prosta do opisania, choć niebanalna w wykonaniu. Maszyny wirtualne hostują cele, czyli odpowiedniki durable objects, każda cela ma własną bazę SQLite i własny proces workera. Kiedy stan celi się zmienia, write-ahead log leci do storage obiektowego na innej maszynie, więc awaria jednego węzła nie oznacza utraty stanu, bo inny węzeł przejmuje leasing na podstawie zapisu w buckecie i odtwarza celę w kilkanaście sekund.

To, co robi z tego materiał na dobry news, to liczby, które autor podaje wprost na stronie projektu. Przy tysiącu rezydentnych cel Durable Objects kosztuje ponad cztery tysiące dolarów miesięcznie, a celld na własnym węźle to kilkadziesiąt dolarów. Przy stu tysiącach cel różnica robi się już absurdalna, kilkaset tysięcy dolarów kontra kilka tysięcy. Oczywiście to porównanie napisane przez twórcę konkurencyjnego rozwiązania, więc traktowałbym te wykresy z przymrużeniem oka, bo nie uwzględniają kosztu operacyjnego utrzymania własnych węzłów, monitoringu, patchowania, budżetu na incydenty o trzeciej w nocy. Cloudflare bierze swoją marżę właśnie za to, że ktoś inny się tym martwi.

Ciekawszy od cennika jest sam argument filozoficzny stojący za projektem. Autorzy podkreślają, że self-hosting nie jest automatycznie bardziej niezawodny, tylko sprawia, że domena awarii staje się jawna i możliwa do zbadania. Kiedy coś się psuje, dowody leżą na twoim dysku, plik SQLite, segmenty LTX, logi, a nie za stroną statusową dostawcy, która grzecznie milczy. To jest argument, który rezonuje z każdym, kto kiedykolwiek czekał godzinami na aktualizację statusu incydentu u chmurowego dostawcy. Z drugiej strony ten sam argument działa przeciwko projektowi, bo teraz to ty jesteś tym, kto musi umieć czytać te dowody o trzeciej w nocy, a nie zespół SRE Cloudflare'a.

Autor nazywa cały projekt miłosnym listem do pomysłu Kentona Vardy, twórcy oryginalnych Durable Objects. Ładna metafora, ale czytając między wierszami, równie dobrze może to być zawoalowana oferta przejęcia albo próba wywarcia presji na Cloudflare, żeby otworzył ten model bardziej. Tak czy inaczej, jeśli budujecie coś stanowego i baliście się vendor lock-inu Cloudflare'a, to jest pierwszy poważny sygnał, że ten model programowania da się oderwać od jednego dostawcy.

**Key takeaways:**
- celld implementuje API Durable Objects Cloudflare'a jako self-hostowane rozwiązanie, kompatybilne z wrangler
- Stan każdej celi to lokalna baza SQLite replikowana asynchronicznie do zewnętrznego storage obiektowego (S3, R2)
- Koordynacja odbywa się przez atomowe zapisy w buckecie, bez protokołu członkostwa czy consensusu
- Twórca projektu to Ryan Dahl, autor Node.js i Deno
- Porównania kosztowe pochodzą od autora projektu, więc warto je zweryfikować niezależnie

**Why do I care:** Jako architekt patrzę na to przede wszystkim przez pryzmat uwalniania się od zależności od jednego dostawcy przy zachowaniu wygodnego modelu programowania. Durable Objects to naprawdę dobry prymityw do budowania systemów stanowych, ale trzymanie całej logiki biznesowej w zamkniętym ekosystemie zawsze rodzi pytanie, co się stanie, gdy ceny pójdą w górę albo produkt zostanie zdjęty z mapy drogowej. celld nie rozwiązuje problemu operacyjnego, bo teraz to wy odpowiadacie za failover i monitoring, ale otwiera drzwi do testowania tego modelu lokalnie i w mniejszej skali bez podpisywania się pod konkretną chmurą.

**Link:** [celld — Durable Objects, self-hosted](https://celld.dev/)

## Jak budować duże aplikacje Angular, żeby nie zwariować za dwa lata

**TLDR:** Nx opublikował obszerny przewodnik po architekturze aplikacji Angular na dużą skalę, z naciskiem na podział według domen biznesowych zamiast warstw technicznych, egzekwowanie granic przez ESLint i stopniowe przechodzenie od jednej aplikacji do monorepo.

**Summary:** Artykuł zaczyna od czegoś, co nazywa "paradoksem projektu", czyli sytuacji, w której najwięcej wiemy o systemie wtedy, gdy najdrożej jest cokolwiek w nim zmienić. Odpowiedzią ma być architektura, która odracza decyzje, umożliwia ich odwracalność i pozwala na stopniową ewolucję. Nic odkrywczego, ale dobre przypomnienie, zanim ktoś znowu zacznie projektować pod hipotetyczną skalę, której firma nigdy nie osiągnie.

Główna teza tekstu jest taka, że warto przechodzić z architektury warstwowej, czyli podziału na komponenty, serwisy, dyrektywy, na architekturę zorientowaną na domeny biznesowe, takie jak zamówienia, produkty, płatności. Domeny mają odzwierciedlać strukturę zespołów, co jest w praktyce prawem Conwaya podanym wprost, i mają móc ewoluować niezależnie od siebie. W praktyce oznacza to tworzenie osobnych bibliotek w monorepo dla każdej domeny, a wewnątrz domeny podział na warstwy typu feature, ui, data-access. Import wygląda wtedy czytelnie, bo z samej ścieżki widać, z jakiej domeny i jakiego typu kodu korzystamy.

Najbardziej praktyczna część dotyczy egzekwowania tych granic. Same foldery nic nie gwarantują, bo nic nie stoi na przeszkodzie, żeby ktoś zaimportował coś wprost z modułu zamówień do modułu produktów, tworząc cykliczną zależność, której nikt się nie spodziewał aż do dnia, w którym build zaczyna się zapętlać. Nx rozwiązuje to przez tagowanie projektów, osobno tagi typu (feature, ui, data-access, util) i osobno tagi scope (nazwa domeny), a potem reguły ESLint, które fizycznie blokują niedozwolone importy już na etapie CI. To jest różnica między dokumentacją architektury w Confluence, której nikt nie czyta, a regułą, która czerwieni się w pull requeście.

Autor ostrzega też przed odwrotnym błędem, czyli tworzeniem monorepo i dziesiątek mikrobibliotek zanim w ogóle jest taka potrzeba. Rekomendacja jest, żeby zaczynać od pojedynczej aplikacji standalone, modularyzować kod wewnątrz niej i dopiero wtedy, gdy pojawią się realne sygnały, jak częste zmiany w wielu bibliotekach naraz albo cykliczne zależności, przechodzić na pełne monorepo z wieloma aplikacjami, na przykład osobną aplikacją administracyjną obok sklepu klienckiego. Artykuł wspomina też o generatorach kodu i integracji Nx Console z asystentami AI w edytorze, co ma niby przyspieszać utrzymanie standardów zespołowych, choć to już bardziej marketing produktu niż twarda architektura.

Całość jest solidna, ale trzeba pamiętać, że to wpis na blogu firmy, która sprzedaje narzędzie do dokładnie tego, co opisuje. Sama koncepcja podziału na domeny i warstwy nie jest niczym nowym, znamy to z Nx dla frameworków od lat, z heksagonalnej architektury, z DDD. Wartość dodana to konkretna implementacja reguł ESLint i ścieżka migracji z pojedynczej aplikacji do monorepo, czyli coś, co realnie oszczędza czas zamiast czytania kolejnego ogólnikowego eseju o "czystej architekturze".

**Key takeaways:**
- Podział kodu według domen biznesowych sprawdza się lepiej długoterminowo niż podział warstwowy oparty na typach technicznych
- Granice między modułami trzeba egzekwować automatycznie, tagi Nx plus reguły ESLint blokujące niedozwolone importy na etapie CI
- Nie zaczynaj od monorepo "na wszelki wypadek", startuj z jednej aplikacji standalone i migruj, gdy pojawią się konkretne sygnały bólu
- Aplikacja powinna być cienką warstwą kompozycyjną, cała logika biznesowa żyje w bibliotekach domenowych
- Nx obsługuje też inne technologie w tym samym repo, więc dokumentacja, landing page czy backend mogą współistnieć obok Angulara

**Why do I care:** Widziałem dziesiątki projektów Angular, które po trzech latach rozwoju zamieniły się w nierozwiązywalny kłębek zależności między modułami, bo nikt nie zadbał o egzekwowanie granic, tylko wierzył słowu w dokumentacji. To, co mnie tu przekonuje, to fakt, że autor nie proponuje kolejnej teoretycznej architektury, tylko konkretny mechanizm wymuszania jej przez tooling. Jedyne, na co bym uważał, to pokusa nadmiernego podziału na mikrobiblioteki, bo sam Nx świetnie to obsłuży technicznie, ale koszt poznawczy nawigacji po pięćdziesięciu małych paczkach potrafi być większy niż korzyść z separacji.

**Link:** [Angular Architecture Guide To Building Maintainable Applications at Scale](https://nx.dev/blog/architecting-angular-applications)

## Koniec ery No Code, czyli dlaczego Linux wygrywa z Airtable

**TLDR:** Po przejęciu Airtable przez Bending Spoons za 1,28 miliarda dolarów autor ogłasza koniec platform No Code w dotychczasowej formie. Jego teza jest taka, że skoro LLM potrafi napisać i wdrożyć aplikację od zera w kilka minut, prostszym i tańszym fundamentem staje się zwykły Linux, a nie kolejna zamknięta platforma.

**Summary:** Autor pracował wcześniej w Airtable i zaczyna od czegoś w rodzaju pożegnalnego listu do produktu, który kochał. Ale zaraz potem przechodzi do sedna, argumentując, że zmieniła się nie filozofia No Code, tylko koszt tworzenia oprogramowania. Airtable i podobne platformy wyrosły z realnego problemu, arkusze kalkulacyjne mają sufit możliwości, jeśli chodzi o współdzielenie, automatyzacje i uprawnienia, a przejście na pełnoprawną bazę danych i aplikację ponad nią wymagało wcześniej zespołu inżynierów albo właśnie No Code. Autor przywołuje cytat Freda Brooksa o tym, że pokazanie tabel mówi więcej niż pokazanie flowchartów, i to jest chyba najlepiej trafiony fragment całego tekstu, bo faktycznie sedno dobrego narzędzia leży w modelu danych, nie w interfejsie.

Historyczny wywód o tym, jak IT stało się działem od mówienia "nie" po erze SaaS, a No Code wypełniło lukę, jest sympatyczny, ale trochę przegadany. Ważniejsza jest teza końcowa. Skoro dziś agent kodujący potrafi wystawić aplikację na maszynie wirtualnej w kilka minut, po co w ogóle warstwa No Code, skoro można od razu dostać kod źródłowy, który da się przenieść między dostawcami chmury bez utraty niczego. Autor reprezentuje firmę exe.dev, która sprzedaje właśnie maszyny wirtualne z preinstalowanym agentem AI, więc to nie jest bezstronna analiza rynku, tylko w dużej mierze materiał sprzedażowy przebrany za refleksję branżową.

Mimo to argument merytoryczny trzyma się kupy. Zamknięcie w platformie No Code oznacza, że logika biznesowa firmy żyje w cudzym formacie danych i cudzym silniku automatyzacji, a migracja stamtąd bywa bolesna. Stos oparty na Linuksie, SQLite, jakimś backendzie i froncie, choćby napisany w całości przez agenta, można w razie potrzeby przenieść przez zwykłe rsync. To jest realna przewaga nad lock-inem platformowym, o którym mówi się rzadziej niż o lock-inie chmurowym, a bywa równie kosztowny.

Sekcja FAQ na końcu, dotycząca bezpieczeństwa danych, harmonogramów, budowy botów i cen, czyta się już czysto jak strona produktowa, nie artykuł redakcyjny. Autor unika też trudniejszego pytania, czyli co się dzieje, kiedy nietechniczny pracownik dostaje dostęp do maszyny Linux z agentem AI i psuje coś, czego No Code nigdy by mu nie pozwoliło zepsuć, bo miało gotowe szyny bezpieczeństwa. "Zapytaj agenta, żeby zrobił backup" to nie jest odpowiedź na pytanie o odpowiedzialność i audyt zmian w środowisku produkcyjnym firmy.

**Key takeaways:**
- Przejęcie Airtable przez Bending Spoons za 1,28 miliarda dolarów autor traktuje jako symboliczny koniec ery No Code w obecnym kształcie
- Teza: agent AI na zwykłym Linuksie zastępuje platformy No Code, bo generowanie kodu jest teraz tańsze niż jego brak
- Otwarty stos (Linux, SQLite, dowolny język) daje przenośność między dostawcami, czego platformy No Code nie oferują
- Tekst jest w dużej mierze materiałem promującym własny produkt firmy exe.dev
- Pominięty problem: kontrola zmian i odpowiedzialność, gdy nietechniczny użytkownik samodzielnie modyfikuje produkcyjną aplikację przez agenta

**Why do I care:** Zgadzam się z diagnozą, że koszt tworzenia oprogramowania spadł na tyle, że część zastosowań No Code traci sens ekonomiczny. Nie kupuję jednak narracji, że "po prostu Linux" rozwiązuje problem zarządzania zmianą, wersjonowania i uprawnień, który No Code rozwiązywał w sposób, choćby toporny, ale przewidywalny. Agent piszący aplikację od zera w prod bez code review to scenariusz, który znam z niejednego postmortemu, tylko wcześniej winowajcą był skrypt PowerShell, a teraz będzie prompt.

**Link:** [The End of No Code](https://blog.exe.dev/the-end-of-no-code)

## Tarcie jako funkcja, nie błąd

**TLDR:** Krótki esej Emila Kowalskiego o tym, że tarcie w procesie tworzenia produktu, czyli koszt i wysiłek związany z budowaniem czegokolwiek, pełniło rolę filtra pomysłów. AI usunęło ten koszt, więc teraz trzeba świadomie wprowadzać tarcie z powrotem, żeby wymusić myślenie przed działaniem.

**Summary:** Kowalski zaczyna od tezy, którą każdy produktowiec powtarza jak mantrę, że tarcie jest złe i trzeba je usuwać z każdego procesu. Zgadza się z tym co do zasady, ale zauważa, że tarcie po cichu wykonywało drugą pracę, zmuszało ludzi do myślenia, zanim w ogóle zaczęli budować. Kiedy pisanie kodu było drogie, sam koszt wysiłku działał jak filtr, przez który przechodziły tylko pomysły warte realizacji. Trzeba było być selektywnym, bo wysiłek sam w sobie wymuszał decyzję, co ma sens.

AI usunęło ten koszt niemal do zera. Pomysł staje się aplikacją w kilka minut, więc próg wejścia dla "czegoś, co warto zbudować" drastycznie spadł. Autor jest tu uczciwy i przyznaje, że tanie budowanie samo w sobie bywa formą myślenia, bo zrobienie wariantu A i B i porównanie ich naprawdę bywa lepszą walidacją niż teoretyzowanie. Problem pojawia się wtedy, gdy nikt faktycznie nie waliduje tych wariantów, tylko wypuszcza oba, bo koszt wysiłku i tak jest bliski zera. Brak tarcia oznacza brak przymusu decyzji.

To tłumaczy zjawisko, które każdy programista frontendowy obserwuje od miesięcy w social mediach, czyli zalew "vibe-codowanych" aplikacji i bibliotek UI, które nie mają za sobą żadnej przemyślanej decyzji projektowej. Nie są zaprojektowane, po prostu istnieją. Kowalski trafnie nazywa efekt tego procesu pustym w środku, bo zostaje sam output bez tekstury, bez śladu wyboru między alternatywami.

Wniosek jest prosty i dobrze podany, tarcie trzeba świadomie zachować albo dodać z powrotem, bo wymusza korzystanie z własnego osądu i odsiewa pomysły, które nie zasługują na realizację. To nie jest defekt procesu twórczego, tylko jego integralna część. Tekst jest krótki, może zbyt krótki, bo świetnie diagnozuje problem, ale nie podaje żadnej konkretnej techniki, jak to tarcie wprowadzić z powrotem w praktyce projektowej czy inżynierskiej, poza samą deklaracją intencji.

**Key takeaways:**
- Tarcie w procesie budowania produktu historycznie działało jako filtr, który odsiewał słabe pomysły zanim powstały
- AI radykalnie obniżyło koszt budowania, więc ten naturalny filtr zniknął
- Tanie prototypowanie bywa dobrą formą walidacji, ale tylko jeśli faktycznie się waliduje, a nie wypuszcza wszystko naraz
- Zalew niedomyślanych, "vibe-codowanych" produktów i bibliotek UI to bezpośredni skutek zniknięcia tarcia
- Autor nie proponuje konkretnej metody na sztuczne przywrócenie tarcia, zostaje przy samej diagnozie

**Why do I care:** Ten tekst punktuje coś, co czuję przy każdym review kodu wygenerowanego w dużej mierze przez agenta, brakuje śladu decyzji, dlaczego akurat tak, a nie inaczej. Jako architekt bardziej martwi mnie to niż sama jakość kodu, bo kod da się poprawić, ale brak przemyślenia architektury objawia się dopiero po kilku miesiącach, kiedy trzeba coś zmienić, a nikt nie potrafi wytłumaczyć, czemu jest zbudowane akurat w ten sposób. Zgadzam się, że potrzebujemy świadomie wbudowanego przystanku na "czy to ma sens" w procesie, którego AI nam sam z siebie nie da.

**Link:** [Friction as a Feature](https://emilkowal.ski/ui/friction-as-a-feature)

## "Kodowanie nigdy nie było trudne" to obraza dla programistów

**TLDR:** Senko Rašić polemizuje z modnym twierdzeniem, że "kod nigdy nie był trudną częścią, trudne jest wymyślenie, co zbudować". Jego argument jest prosty, gdyby kodowanie było łatwe, nie mielibyśmy dekad wysokich pensji, wypalenia zawodowego i grubych podręczników poświęconych wyłącznie pisaniu dobrego kodu.

**Summary:** Autor rozbiera na czynniki pierwsze popularne ostatnio zdanie, że "software nigdy nie był trudną częścią, trudne jest ustalenie, co budować". Robi to metodą serii pytań retorycznych, które w sumie działają lepiej niż jakikolwiek wywód akademicki. Jeśli kodowanie jest łatwe, to dlaczego programiści byli tak drogo opłacani jeszcze przed erą darmowego pieniądza, dlaczego istnieją grube podręczniki w rodzaju "Clean Code" czy "The Art of Computer Programming", dlaczego ludzie tak bardzo złoszczą się, gdy ktoś kopiuje ich kod, skoro rzekomo nie włożyli w niego żadnego wysiłku.

Druga część argumentu idzie w drugą stronę, autor sprawdza symetrycznie tezę, że to "wymyślenie, co zbudować" jest tą trudną częścią. Jeśli tak, to czemu menedżerowie produktu nie przechodzą przez dziesięciostopniowe rozmowy rekrutacyjne w stylu leetcode, czemu badacze rynku i specjaliści od użyteczności nie są traktowani jak gwiazdy w firmach software'owych, skoro rzekomo robią trudniejszą robotę niż programiści. Ten symetryczny zabieg jest mocnym punktem tekstu, bo pokazuje, że oba te sloganistyczne stwierdzenia biorą się z tego samego źródła, czyli chęci umniejszenia cudzej pracy, żeby wywyższyć swoją.

Rašić nie zatrzymuje się na krytyce, tylko próbuje dać coś w zamian. Jego teza jest taka, że oba te obszary, rozumienie klienta i umiejętność napisania dobrego kodu, są równie ważne i nie wykluczają się nawzajem, tylko rzadko spotykają się w jednej osobie. Głośne twierdzenie "kod jest łatwy" albo z drugiej strony "kod to sztuka, nie da się go zautomatyzować" to w jego ocenie forma chowania głowy w piasek wobec realnej zmiany, jaką AI wprowadza w zawodzie. Autor jasno mówi, że to nie znaczy "wskakuj bezkrytycznie na wóz LLM-ów" ani "zostań menedżerem floty agentów AI", tylko wzywa do zrozumienia, co się realnie zmienia, a co pozostaje niezmienne, jak rosnąca złożoność systemów czy fakt, że użytkownicy zawsze będą chcieć więcej za mniej.

Najbardziej wartościowa jest końcowa część z konkretną radą rozwojową, różną dla seniorów i juniorów. Senior nie powinien szukać ukojenia wyłącznie w pogłębianiu swojej technicznej ekspertyzy, tylko uczyć się o doświadczeniu użytkownika i strategii biznesowej. Junior powinien odwrotnie, inwestować w zrozumienie fundamentów, wskaźniki, rekurencja, hierarchia pamięci, protokoły sieciowe, bo to zostanie przydatne niezależnie od tego, w jakim języku będzie pisał za dziesięć lat. Ostatnie zdanie tekstu jest najmocniejsze i warto je zapamiętać, "nie oddawaj AI swojego rozumienia, osądu, empatii i gustu, nie bądź mięsnym proxy".

**Key takeaways:**
- Slogan "kod nigdy nie był trudną częścią" ignoruje dekady dowodów na złożoność i wartość dobrego inżynierstwa
- Symetrycznie fałszywe jest też twierdzenie, że "wymyślenie, co budować" jest jedyną trudną częścią, bo w takim razie product managerowie powinni zarabiać więcej niż programiści
- Autor postuluje łączenie dwóch kompetencji, rozumienia klienta i rzemiosła kodowania, zamiast wybierania jednej i deprecjonowania drugiej
- Seniorzy powinni inwestować w kompetencje sąsiadujące, jak UX czy strategia biznesowa, juniorzy w fundamenty informatyczne
- Kluczowe ostrzeżenie: nie oddawać AI własnego osądu, empatii i gustu

**Why do I care:** Ten tekst mówi wprost coś, co sam powtarzam od dawna zespołom, że te modne sentencje o "kod jest łatwy" najczęściej wypowiadają ludzie, którzy albo nigdy nie utrzymywali produkcyjnego systemu przez pięć lat, albo mają w tym jakiś interes marketingowy związany ze sprzedażą narzędzi no-code czy AI. Rada dla seniorów, żeby nie chować się wyłącznie w głębi technicznej ekspertyzy, jest szczególnie trafna teraz, kiedy sama umiejętność pisania kodu przestaje być rzadkim zasobem, a umiejętność oceny, co i dlaczego budować, zyskuje na wartości.

**Link:** ["Code was never the hard part" is an insult to all programmers](https://blog.senko.net/code-was-never-the-hard-part-is-an-insult-to-all-programmers)

## Mojo osiąga wersję 1.0

**TLDR:** Modular wydał Mojo 1.0, stabilną wersję języka programowania zbliżonego składniowo do Pythona, projektowanego pod wydajny kod dla CPU, GPU i akceleratorów AI. Od teraz zmiany w języku mają być głównie addytywne, a nie łamiące kompatybilność wstecz.

**Summary:** Mojo powstało w 2023 roku jako język, który miał połączyć przyjazną składnię Pythona z wydajnością bliską C++ przy programowaniu sprzętu do AI. Od tego czasu język zmieniał się dość szybko, co z jednej strony pozwalało twórcom szybko iterować, a z drugiej utrudniało społeczności utrzymywanie długoterminowych projektów, bo składnia i API potrafiły się zmienić między wersjami. Wersja 1.0 ma być odpowiedzią na ten problem, deklaracją, że fundament jest teraz na tyle stabilny, że można na nim budować bez obawy o ciągłe przepisywanie kodu.

Konkretne zmiany w tym wydaniu to głównie porządkowanie i ujednolicanie. Tam, gdzie wcześniej było kilka sposobów wyrażenia tej samej rzeczy, teraz zostaje jeden, zmienne deklaruje się konsekwentnie przez var, domknięcia zostały ujednolicone, jest jeden typ Pointer zamiast kilku wariantów. To dokładnie ten rodzaj nudnej, ale niezbędnej pracy porządkowej, którą każdy dojrzewający język musi przejść, Python przechodził coś podobnego przy przejściu z wersji 2 na 3, tyle że tam zajęło to znacznie dłużej i boleśniej.

Poza porządkami dochodzą realne nowości, składnia lambda w stylu Pythona dla domknięć inline, znacznie bardziej stabilny serwer LSP dla edytorów, oraz diagnostyka problemów z bezpieczeństwem pamięci przy inwalidacji referencji, na przykład wykrywanie sytuacji, gdy dodanie elementu do listy unieważnia istniejącą referencję do niej. To ostatnie jest szczególnie interesujące, bo pokazuje, że Mojo mierzy się z tymi samymi klasami błędów co Rust, tylko próbuje robić to w sposób bardziej zbliżony do ergonomii Pythona.

Modular deklaruje też otwarty kod źródłowy jako kierunek na przyszłość, kompilator i toolchain mają zostać w pełni open source w 2026 roku, a społeczność już teraz wniosła ponad tysiąc pull requestów i zmieniła ponad dwieście tysięcy linii kodu w bibliotece standardowej. Trzeba jednak pamiętać, że Mojo wciąż działa w cieniu komercyjnego produktu Modular, czyli MAX, platformy do serwowania modeli AI, więc rozwój języka jest w dużej mierze napędzany potrzebami tego biznesu, nie neutralnym procesem społecznościowym jak w przypadku Pythona czy Rusta. To niekoniecznie źle, ale warto to mieć z tyłu głowy, oceniając, jak bardzo "otwarty" jest ten ekosystem naprawdę.

**Key takeaways:**
- Mojo 1.0 kładzie nacisk na stabilność API, dalsze zmiany mają być głównie addytywne, nie łamiące kompatybilność
- Język ujednolicił składnię w kilku miejscach, jeden typ Pointer, spójna deklaracja zmiennych przez var, ujednolicone domknięcia
- Nowa diagnostyka wykrywa problemy z bezpieczeństwem pamięci przy inwalidacji referencji, podobnie jak robi to Rust
- Pełne otwarcie kompilatora i toolchainu jako open source zaplanowane jest na 2026 rok
- Rozwój Mojo jest ściśle powiązany z komercyjnym produktem Modular, platformą MAX do serwowania modeli AI

**Why do I care:** Mojo od dawna intrygowało mnie jako pomysł, bo próbuje rozwiązać realny problem, czyli przepaść wydajnościową między Pythonem a niskopoziomowym kodem dla GPU, bez konieczności pisania dwóch osobnych baz kodu. Wersja 1.0 i deklaracja stabilności to dobry sygnał dla zespołów rozważających ten język do produkcji, ale ja bym poczekał, aż faktycznie zobaczymy pierwsze duże projekty spoza samego Modulara przetrwające kilka lat bez większych przepisań, bo deklaracje stabilności językowej słyszeliśmy już nieraz.

**Link:** [Modular 26.5: Mojo 1.0 is here!](https://www.modular.com/blog/modular-26-5-mojo-1-0-is-here)

## Claude robi postępy w hipotezie Riemanna

**TLDR:** Badacz z Anthropic poprosił nieopublikowaną wersję Claude'a o próbę udowodnienia hipotezy Riemanna. Model oczywiście jej nie udowodnił, bo to jeden z najsłynniejszych nierozwiązanych problemów matematyki z milionową nagrodą, ale przy okazji poprawił znany od dekad dolny limit dla frakcji zer funkcji zeta leżących na krytycznej linii, z 41,6 procent do 67,2 procent.

**Summary:** Funkcja zeta Riemanna opisuje rozkład liczb pierwszych, a hipoteza mówi, że wszystkie jej "istotne" zera leżą na jednej pionowej linii. Nikt tego nie udowodnił od 1859 roku, ale matematycy od dekad przesuwają w górę dolną granicę tego, jaki procent zer na pewno leży na tej linii, obecnie było to 41,6 procent. Claude, poproszony wprost o "poważną próbę" ataku na całą hipotezę, oczywiście nie rozwiązał głównego problemu, ale w trakcie prób połączył wcześniejsze prace kilku matematyków, w tym technikę Montgomery'ego z 1973 roku uogólnioną przez późniejszych badaczy oraz wynik Bombieriego z 2000 roku, i wyprowadził nową, wyższą granicę na poziomie 67,2 procent.

Metodologia całego eksperymentu jest równie ciekawa co sam wynik matematyczny. Model pracował przez dwie sesje w Claude Code, zużywając w sumie 31 milionów tokenów wyjściowych. Najpierw wygenerował i wypróbował 650 pomysłów, z których żaden nie zadziałał. Dopiero po zachęcie ze strony pracownika Anthropic, który nie jest matematykiem, model spędził półtora dnia koordynując około sześćdziesięciu subagentów, które uruchomiły łącznie 2400 poleceń powłoki, napisały setki skryptów w Pythonie i wzajemnie recenzowały swoją pracę, uruchamiając tysiące numerycznych sprawdzeń względem znanych zer funkcji zeta.

Najbardziej zapadający w pamięć fragment tekstu to opis roli człowieka w tym procesie. Cały wkład Jarreda Sumnera sprowadzał się w dużej mierze do wysyłania modelowi wiadomości motywacyjnych w stylu "działaj dalej" i "uwierz w siebie", co według Anthropic pomogło modelowi przełamać początkowy sceptycyzm co do tego, czy w ogóle jest w stanie zrobić postęp w tak trudnym obszarze. To zabawne, ale też trochę niepokojące, bo sugeruje, że kalibracja pewności siebie modelu bywa arbitralnie podatna na czysto psychologiczną zachętę, a nie tylko na twarde dowody matematyczne, co rodzi pytanie, ile razy model rezygnuje przedwcześnie z dobrego tropu, gdy nikt go nie zachęci.

Po znalezieniu wyniku Claude sam zaproponował spisanie pracy naukowej i zarekomendował, żeby zweryfikował ją człowiek, matematyk. Dwóch pracowników Anthropic i dwóch zewnętrznych ekspertów, Briana Conreya i Dana Goldstona, faktycznie sprawdziło dowód, a osobno powstała formalna weryfikacja w Lean, czyli w systemie dowodzenia twierdzeń, którego poprawność sprawdza narzędzie, a nie tylko ludzkie oko. To jest kluczowy szczegół, którego Anthropic nie ukrywa, ale też nie eksponuje, bo bez tej niezależnej ludzkiej i formalnej weryfikacji cały news byłby wyłącznie ciekawostką PR-ową, a z nią staje się realnym wkładem w matematykę analityczną, choć wciąż wąskim i dotyczącym pobocznego wątku, nie samej hipotezy.

**Key takeaways:**
- Nieopublikowana wersja Claude'a poprawiła dolną granicę frakcji zer funkcji zeta Riemanna z 41,6 procent do 67,2 procent
- Sama hipoteza Riemanna pozostaje nieudowodniona, wynik dotyczy pobocznego, choć powiązanego problemu
- Proces obejmował 31 milionów tokenów wyjściowych, dwie sesje i koordynację około sześćdziesięciu subagentów
- Ludzki wkład sprowadzał się głównie do zachęty słownej, nie do kierowania wyborami matematycznymi
- Wynik zweryfikowali niezależni eksperci matematyczni oraz formalny system dowodzenia Lean

**Why do I care:** Jako ktoś, kto na co dzień patrzy na możliwości i ograniczenia dużych modeli językowych w kontekście inżynierii, ten przypadek jest ciekawszy przez pryzmat procesu niż samego wyniku matematycznego. Sześćdziesiąt subagentów wzajemnie recenzujących swoją pracę i sprawdzających tysiące przypadków numerycznych to w gruncie rzeczy wzorzec, który da się przenieść na inżynierię oprogramowania, wielu agentów atakujących problem równolegle i wzajemnie weryfikujących wyniki, zamiast jednego modelu próbującego zrobić wszystko liniowo. Zastanawia mnie tylko, ile takich "sukcesów" nie trafia do publikacji, bo model utknął, a nikt nie napisał mu "uwierz w siebie" we właściwym momencie.

**Link:** [Learning more about Claude's mathematical capabilities](https://www.anthropic.com/research/riemann-zeta)
