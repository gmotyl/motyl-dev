---
title: "daily.dev: AI już koduje lepiej niż większość programistów, ekonomiczny rachunek Anthropic i pytanie, czy OpenAI zbudowało AGI"
excerpt: "Esej o tym, że kodowanie przestało być trudną częścią inżynierii, ekstremalny scenariusz Anthropic z 32% wzrostem PKB i 21% spadkiem zatrudnienia wśród pracowników wiedzy, PDF-y generowane komponentami shadcn oraz spór o to, czy GPT-6 Astra spełnia definicję AGI."
publishedAt: "2026-09-11"
slug: "daily-dev-ai-coding-anthropic-economics-agi-debate"
hashtags: "#dailydev #ai #career #anthropic #agi #shadcn #generated #pl"
source_pattern: "daily.dev"
---

## AI już pisze kod lepiej niż większość programistów

**TLDR:** Doświadczona programistka argumentuje, że samo kodowanie nigdy nie było najcenniejszą częścią inżynierii oprogramowania, a AI już dziś przewyższa większość deweloperów w pisaniu kodu. Prawdziwym wąskim gardłem staje się osąd, koordynacja, architektura i podejmowanie decyzji.

**Summary:** Autorka opisuje sytuację z własnej pracy: implementacja zmiany zajęła jej pięć minut, ale uzgodnienie, co dokładnie należy zbudować, trwało cztery dni. To zestawienie jest osią całego tekstu. Kodowanie stało się tanie, bo modele piszą je szybciej i często poprawniej niż przeciętny programista, ale inżynieria jako całość wcale nie stała się tańsza, bo cała jej trudność przesunęła się w stronę decyzji, których AI nie potrafi podjąć za nas.

Autorka powołuje się na badania METR pokazujące, że przewaga AI nad ludźmi kurczy się w miarę wzrostu wymagań co do doświadczenia i osądu sytuacyjnego. Tam, gdzie zadanie da się sprowadzić do jasno zdefiniowanej specyfikacji, model wygrywa niemal zawsze. Tam, gdzie trzeba negocjować priorytety z produktem, przewidzieć konsekwencje decyzji architektonicznej za pół roku albo ocenić, czy dany kompromis techniczny w ogóle ma sens biznesowy, przewaga człowieka rośnie. Nie wszyscy programiści są zresztą równie dobrzy w samym kodowaniu, więc dla części z nich AI już teraz jest lepszym rzemieślnikiem niż oni sami, i to bez cienia ironii.

Wniosek, do którego dochodzi autorka, jest ostrzejszy niż zwykłe „AI zabierze pracę”: rynek pracy zacznie premiować tych, którzy rozumieją produkt i architekturę, a nie tych, którzy tylko sprawnie piszą kod. Czyści „rzemieślnicy kodu”, dla których wartością było samo pisanie, znajdą się w najtrudniejszej pozycji, niezależnie od tego, jak biegle posługują się danym językiem czy frameworkiem.

**Key takeaways:**
- Pięć minut kodowania kontra cztery dni ustalania zakresu pokazuje, gdzie faktycznie leży dziś koszt inżynierii.
- METR: przewaga AI nad ludźmi maleje wraz ze wzrostem wymagań co do doświadczenia i osądu.
- Rynek pracy zacznie premiować rozumienie produktu i architektury bardziej niż samo pisanie kodu.

**Why do I care:** To nie jest kolejny alarmistyczny tekst o „AI zabierze wam pracę”, tylko trzeźwa diagnoza przesunięcia wartości w zawodzie. Jeśli twoja codzienna robota polega głównie na przepisywaniu ticketów na kod, warto zacząć budować kompetencje po stronie architektury, komunikacji z biznesem i podejmowania decyzji projektowych, bo to jest dokładnie ta część pracy, której model nie odbierze w najbliższym czasie.

**Link:** [AI Is Already Better at Coding Than Most Software Developers](https://daily.dev/posts/VIVynMBNG)

## Naprawdę wierzą, że AI może zabić nas wszystkich

**TLDR:** Esej argumentuje, że badacze AI ostrzegający przed wyginięciem ludzkości z rąk superinteligencji mówią to szczerze, a nie dla PR-u, i wywodzi to przekonanie z pism Eliezera Yudkowsky'ego sprzed niemal dwóch dekad oraz koncepcji „p(doom)”.

**Summary:** Autor śledzi rodowód idei aż do 2008 roku i pokazuje, że dzisiejsi „doomerzy” AI nie improwizują nowej narracji na potrzeby fundraisingu, tylko kontynuują argumentację, którą rozwijają od lat, często ze szkodą dla własnej reputacji w mainstreamie. Tekst porządkuje proponowane mechanizmy zagłady według wiarygodności: zaprojektowane pandemie, wywołanie wojny nuklearnej, przejęcie kontroli przez robotykę i wreszcie „szara maź” nanotechnologiczna, która w tej hierarchii wypada najsłabiej.

Najciekawszy fragment dotyczy tego, dlaczego ludzie przekonani o realnym ryzyku zagłady nadal pracują nad rozwojem AI zamiast protestować z zewnątrz. Odpowiedzią jest teoria „foom”, czyli gwałtownego, trudnego do przewidzenia skoku zdolności (hard takeoff): kto pierwszy zbuduje superinteligencję, ten może powstrzymać rywali przed zrobieniem tego samego w gorszy sposób. To sprawia, że wyścig wydaje się bezpieczniejszy niż wstrzymanie się od udziału w nim, nawet dla ludzi szczerze przerażonych własnym projektem.

Autor, od lat obecny w środowiskach racjonalistycznych, przyznaje się do osobistej ambiwalencji, ale nalega, że doomerzy zasługują na poważne traktowanie ze względu na wieloletnią spójność swojej argumentacji, a nie na wyśmianie jako sekciarska panika.

**Key takeaways:**
- Przekonanie o ryzyku wyginięcia z rąk AI ma rodowód sięgający 2008 roku, nie jest nową narracją marketingową.
- Mechanizmy zagłady są uszeregowane według wiarygodności: pandemie i wojna nuklearna wyżej niż „szara maź”.
- Teoria „foom” tłumaczy, czemu przekonani o ryzyku ludzie i tak biorą udział w wyścigu zbrojeń AI.

**Why do I care:** Niezależnie od tego, czy podzielasz te obawy, warto rozumieć logikę stojącą za polityką bezpieczeństwa dużych laboratoriów AI, bo to ona kształtuje ograniczenia w API, klasyfikatory blokujące pewne zapytania i tempo udostępniania nowych możliwości. Decyzje, które z perspektywy dewelopera wyglądają na nadmiarową ostrożność, często wynikają wprost z tej właśnie argumentacji, a nie z chęci sztucznego ograniczania konkurencji.

**Link:** [They really do think AI might kill everyone](https://daily.dev/posts/vqi8DEPhd)

## Shadcn ma teraz bibliotekę do PDF-ów

**TLDR:** PDFCN to nowa open-source'owa biblioteka do generowania konfigurowalnych PDF-ów w React przy użyciu komponentów shadcn, z dwoma silnikami renderowania i gotowymi blokami jak faktury.

**Summary:** Projekt przenosi znany z shadcn model dystrybucji, czyli kopiowanie komponentów przez CLI zamiast instalowania paczki npm, do świata generowania dokumentów PDF. Zamiast klejenia PDF-ów w oderwanym od reszty aplikacji narzędziu, deweloper dostaje komponenty React, które wygląda identycznie jak reszta jego UI, bo korzysta z tego samego systemu projektowego.

Biblioteka wspiera dwa silniki renderowania, nazwane Takumi i Forme, oferuje gotowe bloki jak szablony faktur, kilka motywów oraz kreator motywów działający jako osobne narzędzie. Twórca, Aniket, pokazuje w materiale wideo, jak połączyć URL kreatora motywów z asystentem kodującym AI, żeby automatycznie wygenerować PDF w barwach konkretnej marki bez ręcznego stylowania. Projekt ma około miesiąca i już przeszło 1500 gwiazdek na GitHubie, co jak na tak wąską niszę jest tempem świadczącym o realnym bólu, który rozwiązuje.

**Key takeaways:**
- PDFCN kopiuje model dystrybucji shadcn (CLI + kopiowanie kodu) do generowania PDF-ów.
- Dwa silniki renderowania i gotowe bloki jak faktury skracają czas do pierwszego użytecznego dokumentu.
- Kreator motywów można podłączyć pod asystenta AI do automatycznego brandingu PDF-ów.

**Why do I care:** Generowanie PDF-ów w React zawsze było bolesnym miejscem styku frontendu z realiami dokumentów papierowych, więc każde narzędzie, które trzyma się tego samego systemu komponentów co reszta aplikacji, realnie oszczędza czas. Warto to mieć na radarze, zanim ktoś w zespole znowu zacznie ręcznie składać layout faktury w osobnej bibliotece PDF, która wygląda zupełnie inaczej niż reszta produktu.

**Link:** [Wait… Shadcn Now Has a PDF Library?](https://daily.dev/posts/7J1s5f3Be)

## Ekonomiczny model Anthropic: PKB w górę o 32%, zatrudnienie pracowników wiedzy w dół o 21%

**TLDR:** Anthropic opublikowało modelowanie trzech scenariuszy wpływu AI na gospodarkę do 2030 roku, a w scenariuszu ekstremalnym płace pracowników wiedzy spadają o ponad 10%, a ich zatrudnienie o ponad 21%.

**Summary:** W skrajnym scenariuszu, zakładającym, że AI przewyższa ludzi w większości zadań wiedzowych, wykonuje je autonomicznie i nie tworzy przy tym wielu nowych kategorii zawodów, PKB rośnie o 32,4%, ale ogólne bezrobocie sięga 11,9%, a wśród pracowników wiedzy aż 17,9%. Ich płace spadają o 11,5%, zatrudnienie o 21,5%, a udział pracy w dochodzie narodowym zjeżdża z 60% do 45,2%. Dla kontrastu, w scenariuszu umiarkowanym wpływ AI jest realny, ale ograniczony: PKB rośnie o 1,6%, bezrobocie wynosi 3,9%, a płace pracowników wiedzy nawet lekko rosną, o 0,4%. To wygląda jak zwykła fala produktywności, a nie rewolucja.

Reakcja społeczności czytającej ten news jest wyraźnie sceptyczna: skoro PKB ma rosnąć, a jednocześnie płace i zatrudnienie pracowników wiedzy mają się załamywać, to kto właściwie będzie kupował produkty i usługi napędzające ten wzrost? To pytanie o zamkniętą pętlę popytu, na które model Anthropic wprost nie odpowiada, bo modeluje produkcję, a nie dystrybucję korzyści z niej płynących.

**Key takeaways:**
- Scenariusz ekstremalny: PKB +32,4%, ale zatrudnienie pracowników wiedzy -21,5%, a ich płace -11,5%.
- Scenariusz umiarkowany: PKB +1,6%, płace pracowników wiedzy nawet rosną o 0,4%, czyli zwykła fala produktywności.
- Udział pracy w dochodzie narodowym w scenariuszu skrajnym spada z 60% do 45,2%.

**Why do I care:** Niezależnie od tego, który scenariusz się zmaterializuje, to modelowanie pokazuje, że nawet firma tak mocno zaangażowana w rozwój AI jak Anthropic uważa masową utratę zatrudnienia wśród pracowników wiedzy za realną możliwość, a nie fantazję krytyków. Dla architektów i liderów zespołów to sygnał, żeby budować kompetencje trudne do zautomatyzowania (decyzje, odpowiedzialność, kontekst organizacyjny), zamiast liczyć, że rynek pracy będzie wyglądał tak samo za pięć lat.

**Link:** [Anthropic's economic model for AI: GDP up 32%, knowledge worker employment down 21%](https://daily.dev/posts/Ou1akBt3E)

## Czy OpenAI właśnie zbudowało AGI?

**TLDR:** Materiał wideo podważa twierdzenia, że hipotetyczny model „GPT6 Astra” spełnia definicję AGI, wskazując na rozbieżność między wynikiem 99% pod dedykowaną konfiguracją dostawcy a 62,7% pod ustandaryzowanym testem ARC-AGI-3.

**Summary:** Autor materiału bierze na warsztat własną definicję AGI używaną przez OpenAI, czyli autonomiczny system przewyższający ludzi w większości ekonomicznie wartościowej pracy, i pokazuje, że imponujące wyniki benchmarków oraz demonstracje wcale tej definicji nie spełniają. Kluczowym dowodem jest rozjazd wyników na tym samym teście w zależności od konfiguracji uruchomienia: pod specyficzną dla dostawcy konfiguracją model osiąga niemal doskonały wynik, a pod ustandaryzowanym, neutralnym harnessem spada do niespełna dwóch trzecich. To pokazuje, jak bardzo wyniki benchmarków zależą od sposobu ich uruchomienia, a nie tylko od samego modelu.

Materiał przywołuje też argument Yanna LeCuna, że autoregresyjne modele językowe, choć użyteczne do generowania języka i kodu, są niewystarczające do osiągnięcia inteligencji na poziomie ludzkim. LeCun kontrastuje to ze swoim kierunkiem badawczym JEPA, który zamiast przewidywać kolejne tokeny czy piksele, uczy się przewidywać abstrakcyjne reprezentacje świata. To fundamentalnie inna architektura myślenia o inteligencji maszynowej niż ta, na której opierają się dzisiejsze duże modele językowe.

**Key takeaways:**
- Ten sam model osiąga 99% pod dedykowaną konfiguracją dostawcy i 62,7% pod ustandaryzowanym harnessem ARC-AGI-3.
- Wyniki benchmarków są mocno zależne od konfiguracji uruchomienia, nie tylko od samego modelu.
- Yann LeCun argumentuje, że autoregresyjne LLM-y są niewystarczające do osiągnięcia inteligencji ludzkiego poziomu, stawiając na JEPA.

**Why do I care:** Ten tekst to dobre antidotum na nagłówki ogłaszające AGI przy każdej premierze nowego modelu. Jako architekt czy tech lead powinieneś traktować takie ogłoszenia z dystansem proporcjonalnym do rozbieżności między wynikami pod różnymi konfiguracjami testowymi, bo to właśnie ta rozbieżność mówi więcej o realnych możliwościach modelu w twoim własnym środowisku produkcyjnym niż sam nagłówek na benchmarku.

**Link:** [Did OpenAI Just Build AGI?](https://daily.dev/posts/6g9vIjXlj)