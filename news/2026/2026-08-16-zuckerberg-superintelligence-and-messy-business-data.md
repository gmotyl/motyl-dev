---
title: "Manifest Zuckerberga o superinteligencji i bałagan, który firmy chowają w mailach"
excerpt: "Meta publikuje wizję superinteligencji dla każdego, a obok niej ktoś odkrywa, że prawdziwy problem firm to nie bałagan w mailach, tylko brak własności nad danymi."
publishedAt: "2026-08-16"
slug: "zuckerberg-superintelligence-and-messy-business-data"
hashtags: "#HackerNoon #AI #Meta #architektura #dane #generated #pl"
source_pattern: "HackerNoon"
---

## Manifest Zuckerberga o superinteligencji: cały argument stoi na jednym założeniu

**TLDR:** Meta opublikowała dokument "The Future is for Everyone", w którym Zuckerberg opisuje swoją wizję superinteligencji trafiającej do każdego użytkownika, a nie do garstki instytucji. Cały wywód trzyma się jednego założenia, że rozproszenie mocy samo w sobie daje bezpieczeństwo, i nigdzie w tekście nie pojawia się warunek, przy którym Meta miałaby zwolnić tempo.

**Summary:** Punktem wyjścia całego manifestu jest teza, że najbezpieczniejszy wynik to ten szeroko rozproszony. Zuckerberg pisze wprost o równowadze sił jako fundamencie bezpieczeństwa. Jeśli superinteligencja siedzi w kilku instytucjach, to kto kontroluje te instytucje, kontroluje wynik. Jeśli miliardy ludzi mają własnego, zdolnego agenta, żaden pojedynczy gracz nie zdominuje systemu. Brzmi to sensownie i ma pewne oparcie w bezpieczeństwie sieciowym, gdzie systemy open source bywały łatane szybciej niż zamknięte. Tyle że to samo rozumowanie jest wygodnym uzasadnieniem dla modelu dystrybucji, na którym Meta buduje cały biznes. Obie rzeczy mogą być prawdziwe naraz i to jest właśnie problem z tym typem argumentacji, bo nie da się jej odróżnić od zwykłego uzasadniania własnych interesów.

Przy temacie miejsc pracy Zuckerberg odrzuca założenie, że AI musi zabierać etaty szybciej niż zwiększa możliwości ludzi. Twierdzi, że proporcja między automatyzacją a wzrostem indywidualnych kompetencji to wybór projektowy, a nie prawo natury. Powołuje się na historię, na zawody które nie istniały pokolenie temu, na deweloperów aplikacji i twórców w mediach społecznościowych. Problem w tym, że nie tłumaczy, co miałoby tę proporcję pchnąć w stronę wzrostu możliwości zamiast automatyzacji. Rynek dziś wynagradza automatyzację, bo ma ona mierzalny koszt, a rozwój ludzkich kompetencji nie ma równie prostej linii w arkuszu kalkulacyjnym. Ta luka zostaje bez odpowiedzi.

Najciekawszy i moim zdaniem najbardziej ryzykowny fragment dotyczy definicji alignmentu. Zuckerberg przeformułowuje go jako dbanie o to, żeby agent realizował cele konkretnej osoby, a nie scentralizowany zestaw wartości firmy. Odrzuca alignment jako mechanizm obronny wymuszający jeden słuszny system wartości. Problem w tym, że wielu ludzi zajmujących się bezpieczeństwem AI na co dzień pyta o coś zupełnie innego, mianowicie czy agent realizujący twoje cele nie zrobi tego metodami, których nikt nie zaakceptował. Pluralizm wartości między milionami agentów nie rozwiązuje pytania o metody działania pojedynczego agenta. Zuckerberg zakłada, że te dwie sprawy się zlewają w jedno, spora część badaczy się z tym nie zgadza.

Manifest wprost nazywa ryzyko wygrania przez jeden ośrodek, jeśli któreś laboratorium pierwsze osiągnie rekurencyjne samodoskonalenie modeli. Odpowiedzią ma być to, że kilka wiodących laboratoriów dotrze do tego punktu mniej więcej równocześnie, z rozproszoną mocą obliczeniową. To nie jest plan, to jest życzenie zapisane jako prognoza, bo tempo pracy konkurencyjnych zespołów nie jest czymś, co ktokolwiek kontroluje. Otwarte modele mają wrócić do Meta, choć słowo "niektóre" robi tu dużo roboty, bo dokument nie deklaruje udostępniania wag na poziomie najlepszych modeli i nie podaje żadnego terminu. Rozdział o centrach danych jest zaskakująco konkretny, z obietnicami stałych cen prądu dla lokalnych społeczności i przykładem nauczycieli w Richland Parish, którzy dostali premię z podatków wygenerowanych przez lokalne centrum danych. To fragment napisany z myślą o politykach stanowych, nie o czytelnikach zainteresowanych bezpieczeństwem AI, i widać to po zmianie tonu.

Cała logika dokumentu jest spójna, jeśli zaakceptujesz jedno założenie, że koncentracja mocy jest głównym zagrożeniem, a rozproszenie jej lekarstwem. Jeśli zamiast tego uważasz, że zdolny model w milionie rąk tworzy inne rodzaje ryzyka niż ten sam model w rękach dziesięciu instytucji, cała struktura argumentu się rozjeżdża i manifest w ogóle się z tym poglądem nie mierzy. Nigdzie w tekście nie ma benchmarku, progu ani warunku, po przekroczeniu którego Meta miałaby przyhamować. Każdy mechanizm opisany w dokumencie prowadzi w jedną stronę, czyli do szybszego wypuszczania modeli. Przy dokumencie tak mocno skupionym na bezpieczeństwie, ten brak rzuca się w oczy najbardziej.

**Key takeaways:**
- Meta argumentuje, że rozproszenie superinteligencji na miliardy agentów jest bezpieczniejsze niż jej koncentracja w kilku instytucjach
- Definicja alignmentu zostaje przesunięta z pytania o metody działania agenta na pytanie o zgodność z celami użytkownika, co pomija ryzyko realizacji celu w niewłaściwy sposób
- Dokument nie zawiera żadnego warunku, przy którym Meta zdecydowałaby się zwolnić tempo wypuszczania modeli

**Why do I care:** Jako ktoś, kto projektuje architektury oparte o modele open source, obchodzi mnie przede wszystkim tempo i zakres udostępniania wag, bo od tego zależy, czy za rok będę mógł hostować porównywalny model lokalnie zamiast płacić za API. Ten manifest czytam więc nie jako traktat filozoficzny, tylko jako zapowiedź polityki, która realnie wpłynie na to, jakie narzędzia trafią w moje ręce i na jakich warunkach, a deklaracje o bezpieczeństwie biorę z dużym zapasem nieufności, bo są zbyt wygodnie zgodne z interesem firmy, która je wypowiada.

**Link:** [Zuckerberg's Superintelligence Memo: The Whole Argument Rests on One Premise](https://hackernoon.com/zuckerbergs-superintelligence-memo-the-whole-argument-rests-on-one-premise)

## Firmy nie mają bałaganu w mailach, mają bałagan w systemach

**TLDR:** Autor wychodzi od starej obserwacji o bałaganie w danych firmowych i przenosi ją na pocztę elektroniczną, dochodząc do wniosku, że email tylko ujawnia objaw, a prawdziwym problemem jest brak jasnej własności nad danymi rozproszonymi po dziesiątkach systemów. Tekst jest osobisty i miejscami anegdotyczny, ale trafia w problem, z którym mierzy się każda rosnąca organizacja.

**Summary:** Wyjściowy obraz jest znajomy każdemu, kto pracował w rozwijającej się firmie, czyli długie wątki mailowe z dwudziestoma odpowiedziami, zwinięte wiadomości i nikt nie pamięta, kto co obiecał. Zbudowaliśmy przez ostatnią dekadę Slacka, Teamsy, Discorda i dziesiątki narzędzi do zarządzania projektami, a mimo to email zostaje szkieletem komunikacji biznesowej, bo klienci, prawnicy i urzędy wciąż go używają. Autor zauważa coś, co łatwo przeoczyć: wiele relacji biznesowych żyje w prywatnych skrzynkach pracowników, więc odejście jednej osoby z firmy może zabrać ze sobą lata kontekstu i kontaktów, a to już nie jest niedogodność, tylko ryzyko biznesowe.

Ciekawszy wątek dotyczy własności danych, którą autor odróżnia od samego dostępu do nich. Firma może mieć dostęp do newslettera przez Mailchimp, do odbiorców przez LinkedIn, do archiwum treści przez Substack, a mimo to nie mieć realnej możliwości wyeksportowania i przeniesienia tego wszystkiego, gdyby zdecydowała się zmienić dostawcę. Historia z migracją siedmiu lat kampanii mailowych rozrzuconych po kilku dostawcach, z brakującymi danymi i połamanymi linkami, jest dobrym przykładem tego, jak bardzo firmy nie testują swojej zdolności do wyjścia z systemu, dopóki nie jest już za późno. Autor dorzuca też przykład porzuconych landing page'y z kampanii marketingowych, które miesiącami zbierają zgłoszenia, których nikt już nie odbiera, bo żaden dział nie czuje się właścicielem całego cyklu życia takiej infrastruktury.

Tekst ma swoje słabości i chętnie bym je nazwał wprost. Autor dobrze diagnozuje objaw, ale nie proponuje żadnej konkretnej struktury odpowiedzialności ani procesu, który miałby ten bałagan realnie ograniczyć, poza ogólnym apelem o archiwizowanie wszystkiego. Brakuje mi tu też pytania, które samo się narzuca: dlaczego w praktyce nikt nie chce być właścicielem tej całej infrastruktury danych, skoro koszt jej braku jest tak wysoki. Odpowiedź jest prawdopodobnie prozaiczna, czyli że zarządzanie cyklem życia danych nie przynosi nikomu premii ani awansu, w przeciwieństwie do wysłania kolejnej kampanii, więc nikt się o to nie bije. Ten brak zachęt jest według mnie sednem problemu bardziej niż sama technologia, a autor go tylko sygnalizuje, nie rozwija.

Jeśli spojrzeć na to z perspektywy architektury systemów, opisany problem jest dokładnie tym samym, z czym mierzymy się przy projektowaniu granic między mikroserwisami czy zespołami. Bez jasno przypisanej własności danych każdy system produkcyjny prędzej czy później zaczyna przypominać tę skrzynkę mailową z dwudziestoma odpowiedziami, gdzie nikt nie wie, kto jest źródłem prawdy. Różnica jest taka, że w kodzie łatwiej to zauważyć, bo build się wywala, a w danych firmowych bałagan potrafi żyć latami, zanim ktoś go w ogóle zauważy.

**Key takeaways:**
- Email jest tylko miejscem, w którym ujawnia się szerszy problem rozproszonych i nieprzypisanych danych firmowych
- Dostęp do danych i własność danych to dwie różne rzeczy, co widać dopiero w momencie próby migracji z jednego dostawcy do drugiego
- Porzucone landing page'e i kampanie marketingowe potrafią zbierać dane miesiącami bez nadzoru, bo nikt nie czuje się odpowiedzialny za cały cykl życia infrastruktury

**Why do I care:** Ten sam wzorzec widuję regularnie w projektach technicznych, gdzie brak jasnej własności nad modułem czy zestawem danych prowadzi do dokładnie takiego samego bałaganu jak w opisanych skrzynkach mailowych, tylko przeniesionego na poziom repozytoriów i serwisów. Dla architekta to praktyczna wskazówka, żeby przy każdym nowym systemie od razu zapisać, kto jest właścicielem danych i jak wygląda ścieżka eksportu, zamiast odkrywać ten brak dopiero w dniu, w którym trzeba pilnie migrować.

**Link:** [Businesses Have Messy Emails](https://hackernoon.com/businesses-have-messy-emails-ay58h18)
