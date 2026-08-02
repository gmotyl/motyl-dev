---
title: "Bytes #507: nazewnictwo AI gorsze niż semver, Opus 5 i odchudzony Markdown od TanStack"
excerpt: "Anthropic wypuszcza Opus 5 i nowe zasady context engineering, TanStack pozbywa się Shiki, Vercel kompiluje TypeScript do binarki, a Moonshot rzuca na rynek otwarty model na 2,8 biliona parametrów."
publishedAt: "2026-07-29"
slug: "bytes-507-nazewnictwo-ai-opus-5-tanstack-markdown"
hashtags: "#uidev #ai #llm #claude #typescript #frontend #devtools #architecture #performance #generated #pl"
---

## Nazewnictwo modeli AI jest gorsze niż semver

**TLDR:** Autor Bytes zauważa, że w tym samym tygodniu Anthropic wypuściło Opus 5, a Elon zapowiedział Groka 4.6 i 4.7 na najbliższy miesiąc, co dobitnie pokazuje, że konwencje nazewnicze w AI to czysta dowolność. Semver, mimo wszystkich swoich wad, przynajmniej próbuje coś komunikować, tymczasem numer wersji, nazwa produktu i poziom wysiłku modelu razem tworzą system, którego nikt nie jest w stanie racjonalnie odczytać.

**Summary:** Semver miał jedną robotę: powiedzieć ci, czy aktualizacja cię wysadzi w powietrze, czy nie. Major to zmiana łamiąca kompatybilność, minor to nowa funkcja bez konsekwencji, patch to poprawka błędu. W świecie modeli językowych ten sam schemat numeracji nakłada się na coś zupełnie innego, bo major version modelu oznacza zwykle zmianę architektury i danych treningowych, a minor to post-training i optymalizacje pod benchmarki. Do tego dochodzi nazwa produktu w obrębie tej samej wersji, czyli Opus, Sonnet, Haiku u Anthropica czy odpowiedniki u OpenAI, które w praktyce są tylko etykietami na rozmiar i cenę modelu. Im większy i dokładniejszy model, tym wolniejszy i droższy, a firmy coraz częściej budują routery, które same decydują, do którego modelu wysłać zapytanie, bo klienci już dawno przestali nadążać za tą siatką nazw.

Najzabawniejszym elementem całej układanki jest poziom wysiłku, czyli deklaracja ile kroków rozumowania model ma wykonać przed odpowiedzią. Teoretycznie brzmi to jak pokrętło do kręcenia jakością, w praktyce nikt nie wie z góry, ile to będzie kosztować ani czy wyższy effort faktycznie da lepszy wynik. Bytes słusznie punktuje, że to świetny sposób na spalenie budżetu na tokeny bez gwarancji rezultatu, i mam podobne doświadczenia z Claude Code, gdzie ustawienie max effort do prostego zadania CRUD-owego bywa jak strzelanie z armaty do wróbla. Cała ta nomenklatura nie powstała ze złej woli, tylko dlatego że branża rośnie szybciej niż jej własny słownik, ale skutek jest taki, że każda firma wymyśla swój dialekt i porozumienie między zespołami staje się trudniejsze niż powinno.

Z perspektywy kogoś, kto musi to wszystko ogarniać w configu produkcyjnym, to nie jest tylko żart z newslettera. Wybór modelu, tiera i effort levelu to realna decyzja architektoniczna, którą trzeba dokumentować i testować, a obecny bałagan sprawia, że taka dokumentacja starzeje się w tydzień.

**Key takeaways:**
- Semver rozróżnia major/minor/patch według wpływu na kompatybilność, nazewnictwo modeli AI miesza wersję, tier produktu i effort level bez spójnej logiki
- Routery modeli to w praktyce łatka na chaos nazewniczy, nie realne uproszczenie dla użytkownika
- Effort level nie daje przewidywalnej relacji koszt/jakość, co utrudnia budżetowanie zapytań do API

**Why do I care:** Jeśli zarządzasz integracją z modelami LLM w produkcie, ten bałagan nazewniczy to realny koszt operacyjny, bo konfiguracja modelu i poziomu wysiłku wymaga ciągłego retestowania, a nie da się tego opisać raz w dokumentacji i zapomnieć.

**Link:** [Bytes #507 - Something worse than semver](https://bytes.dev/archives/507)

## Claude Opus 5 startuje w cenie poprzednika

**TLDR:** Anthropic wypuściło Opus 5, model bliski poziomowi Fable 5 w zadaniach programistycznych i analitycznych, ale za połowę ceny i w tej samej cenie co Opus 4.8. Firma podkreśla poprawę w agentywności, czyli zdolności modelu do weryfikowania własnej pracy i doprowadzania zadania do końca bez ciągłego nadzoru.

**Summary:** Liczby w materiale są mocne, Opus 5 podwaja wynik Opus 4.8 na Frontier-Bench przy niższym koszcie za zadanie, a na ARC-AGI 3 osiąga wynik trzy razy wyższy niż najbliższy konkurent. To, co bardziej mnie interesuje niż same benchmarki, to opisany przykład z rysunkiem części maszynowej, który model miał odtworzyć jako model 3D w FreeCADzie bez możliwości bezpośredniego podglądu obrazu. Opus 5 napisał własny pipeline computer vision, żeby wyciągnąć geometrię z surowych pikseli, i zrobił to powtarzalnie, podczas gdy konkurencyjne modele w tym samym scenariuszu nie dały rady po pięciu próbach. To pokazuje kierunek, w którym idą te modele, czyli mniej pytania o surową wiedzę, więcej o zdolność do samodzielnego budowania narzędzi po drodze.

Anthropic przyznaje też wprost, że Opus 5 zostaje w tyle za modelem Mythos 5 w zadaniach cyberbezpieczeństwa, szczególnie w tworzeniu eksploitów na podstawie znalezionych podatności. To rzadki przypadek, gdy firma AI mówi otwarcie, w czym jej flagowy model jest gorszy, zamiast sprzedawać wyłącznie same rekordy. Cytaty od klientów wczesnego dostępu są oczywiście dobrane pod publikację, ale nawet po odsianiu marketingowego sosu widać powtarzający się wątek, że model rzadziej idzie na skróty i częściej sam sprawdza swoją robotę w przeglądarce na różnych szerokościach ekranu, zanim odda zadanie.

Cena 5 dolarów za milion tokenów wejściowych i 25 za wyjściowe przy wyraźnie lepszych wynikach to dobra wiadomość dla zespołów, które już budują na Claude API i martwią się rosnącymi rachunkami za inference.

**Key takeaways:**
- Opus 5 ma tę samą cenę co Opus 4.8, ale wyraźnie lepsze wyniki na benchmarkach programistycznych i agentowych
- Model pozostaje w tyle za Mythos 5 w zadaniach ofensywnego cyberbezpieczeństwa, co Anthropic ujawnia wprost
- Nacisk położono na samodzielną weryfikację pracy przez model, nie tylko na surową moc obliczeniową

**Why do I care:** Dla zespołów korzystających z Claude API to konkretna okazja do przeliczenia kosztów, model daje więcej za tę samą stawkę, a opisana zdolność do samodzielnej weryfikacji może realnie zmniejszyć liczbę rund code review po stronie agenta.

**Link:** [Introducing Claude Opus 5](https://www.anthropic.com/news/claude-opus-5)

## Nowe zasady context engineering dla modeli Claude piątej generacji

**TLDR:** Anthropic opisuje, jak zmieniły się dobre praktyki budowania kontekstu dla agentów wraz z nowszymi modelami, mniej sztywnych reguł i przykładów, więcej dobrze zaprojektowanych narzędzi i stopniowego ujawniania informacji. Artykuł jest w praktyce rozliczeniem z własnym systemowym promptem Claude Code sprzed kilku wersji.

**Summary:** Najciekawszy fragment dotyczy tego, jak firma sama przyznaje, że wcześniejsze sztywne reguły w rodzaju "nigdy nie pisz komentarzy dłuższych niż jedna linia" były kompromisem wymuszonym słabszym modelem, a nie dobrą praktyką samą w sobie. Nowsze modele mają na tyle dobry osąd sytuacji, że zamiast twardej reguły wystarczy instrukcja w stylu "pisz kod, który pasuje stylem do otoczenia". To samo dotyczy przykładów użycia narzędzi, które przez lata uchodziły za złoty standard promptowania, a teraz Anthropic twierdzi, że przykłady zawężają przestrzeń eksploracji modelu bardziej niż pomagają, i lepiej zainwestować czas w projekt samego interfejsu narzędzia, na przykład sensowne nazwy parametrów i enumy zamiast dowolnych stringów.

Progresywne ujawnianie informacji to kolejny wątek, który rezonuje z tym, co widać w samym Claude Code, gdzie niektóre narzędzia są ładowane leniwie dopiero po tym, jak agent sam o nie zapyta przez wyszukiwanie. Ten sam mechanizm Anthropic proponuje przenieść na pliki CLAUDE.md i skille, ostrzegając wprost przed mitem, że taki plik powinien być centralnym repozytorium każdej znanej praktyki. Zamiast tego lepiej mieć drzewo mniejszych plików ładowanych dokładnie wtedy, kiedy są potrzebne. Podoba mi się, że artykuł nie owija w bawełnę i mówi po imieniu, że powtarzanie tych samych instrukcji w wielu miejscach systemowego promptu było łataniem słabości starszych modeli, a nie dobrą architekturą kontekstu.

Zmiana z prostych plików memory zapisywanych ręcznie na auto-memory to naturalna konsekwencja tego trendu, ale jednocześnie największe ryzyko dla przewidywalności, bo trudniej zweryfikować, co dokładnie model zapamiętał i dlaczego.

**Key takeaways:**
- Sztywne reguły w promptach były łataniem słabości starszych modeli, nowsze modele lepiej radzą sobie z ogólnymi wskazówkami
- Projekt interfejsu narzędzia, czyli nazwy parametrów i ich typy, działa lepiej niż przykłady użycia w promptcie
- CLAUDE.md i pliki skilli powinny być rozbite na mniejsze części ładowane na żądanie, nie jednym wielkim dokumentem

**Why do I care:** Każdy, kto pielęgnuje własny CLAUDE.md albo prompt systemowy dla agenta, powinien przejrzeć go pod kątem reguł, które są tam tylko dlatego, że kiedyś model ich potrzebował, bo z nowszym modelem mogą już tylko zaśmiecać kontekst i kosztować tokeny bez żadnej korzyści.

**Link:** [The new rules of context engineering for Claude 5 generation models](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)

## TanStack odchudza Markdown i podświetlanie składni

**TLDR:** Tanner Linsley wypuścił TanStack Markdown i TanStack Highlight, dwie osobne, bardzo wąskie biblioteki, które zastąpiły ciężki stos oparty na Shiki i pozwoliły zrezygnować z hacka z React Server Components na tanstack.com. Efekt to strona przesyłająca dziesiątki kilobajtów zamiast megabajta skryptu na sam mechanizm renderowania treści.

**Summary:** Historia zaczyna się od uczciwego przyznania błędu architektonicznego, bo zespół TanStack użył RSC nie dlatego, że taka była najlepsza architektura strony, tylko żeby ukryć na serwerze problem z zależnościami, które ważyły za dużo. W pewnym momencie jedna strona dokumentacji przesyłała 1,1 MiB skryptu, z czego 358 KiB samo podświetlanie składni. Zamiast dalej maskować ten koszt architekturą, zespół zrobił to, co powinno się robić częściej, czyli zapytał, dlaczego renderowanie ograniczonego podzbioru Markdownu i kodu, którego faktycznie używają, musi tyle kosztować, i zbudował coś mniejszego od zera.

Rozdzielenie parsera Markdown od highlightera to decyzja, którą bardzo cenię, bo żadna z bibliotek nie importuje drugiej, a granicę między nimi stanowi zwykły callback z kodem, językiem i metadanymi. Dzięki temu drzewo dokumentu można zserializować, wsadzić do cache czy indeksu wyszukiwania bez ładowania highlightera w ogóle, a sam highlighter da się użyć do fragmentu kodu, który nigdy nie był w Markdownie. Parser waży 4,9 KB po gzipie, ma zero zależności runtime i nie próbuje obsłużyć każdego edge case'u CommonMarku, MDX-a czy dowolnych łańcuchów pluginów async, bo świadomie rezygnuje z bycia uniwersalnym narzędziem na rzecz bycia małym narzędziem do konkretnej roboty.

Ciekawy jest też sposób obsługi streamowanego tekstu z modeli AI, bo zamiast utrzymywać stan parsera między aktualizacjami, biblioteka po prostu reparsuje cały zaakumulowany tekst synchronicznie przy każdym renderze, co eliminuje całą klasę błędów związanych z niezgodnym stanem parsera. To rozwiązanie brzmi niepozornie, ale rozwiązuje realny problem, z którym zmaga się każdy, kto renderuje strumieniowaną odpowiedź modelu językowego w UI. Szkoda, że artykuł nie wspomina wprost, ile pracy kosztowało dogranie edge case'ów w listach i obrazkach, o których sam wspomina mimochodem, bo to zwykle najbardziej bolesna część pisania własnego parsera Markdown.

**Key takeaways:**
- Rozdzielenie parsera Markdown od highlightera na dwie niezależne biblioteki bez wzajemnych importów ułatwia cache'owanie i reużycie
- Reparsowanie całego strumienia przy każdej aktualizacji eliminuje potrzebę utrzymywania stanu parsera dla treści streamowanych z LLM
- Świadoma rezygnacja z pełnej zgodności z CommonMark i MDX pozwoliła utrzymać rozmiar biblioteki w granicach pojedynczych kilobajtów

**Why do I care:** To dobry case study na to, że czasem lepiej zakwestionować decyzję architektoniczną sprzed roku niż dalej ją łatać, zwłaszcza jeśli używasz Shiki albo podobnego stosu do renderowania streamowanych odpowiedzi LLM i zastanawiasz się, dlaczego bundla ci puchnie.

**Link:** [Introducing TanStack Markdown and TanStack Highlight](https://tanstack.com/blog/introducing-tanstack-markdown-and-highlight)

## scriptc kompiluje TypeScript prosto do natywnej binarki

**TLDR:** Vercel Labs opublikowało scriptc, kompilator, który bierze zwykły TypeScript bez żadnych adnotacji i kompiluje go do samodzielnej binarki bez Node, V8 czy jakiegokolwiek silnika JS w środku. Startup rzędu 2,4 milisekundy w porównaniu z około 47 milisekundami dla Node robi wrażenie, choć projekt jest wczesny i wyraźnie eksperymentalny.

**Summary:** Podejście scriptc jest uczciwsze niż większość podobnych prób, bo narzędzie jawnie dzieli kod na trzy kategorie, kod kompilowany statycznie do natywnego kodu, kod uruchamiany dynamicznie przez wbudowany silnik quickjs-ng dla rzeczy zbyt dynamicznych, oraz kod odrzucony z konkretnym błędem i podpowiedzią jak go przepisać. Nic nie jest cicho źle skompilowane, co jest ważniejsze niż mogłoby się wydawać, bo historia kompilatorów TypeScript do czegoś innego niż JS zna wiele przypadków subtelnych rozbieżności semantycznych, które wychodzą dopiero na produkcji.

Zakres tego, co obsługuje statyczna ścieżka, jest zaskakująco szeroki, klasy z dziedziczeniem i prawdziwym dynamic dispatch, generyki monomorfizowane, async/await na stackful fiberach z semantyką zgodną z JS, a nawet spory kawałek API Node, włącznie z fs, net, http i tls. Największym testem wiarygodności jest różnicowe testowanie, w którym ponad 800 programów z korpusu uruchamia się jednocześnie pod Node i jako natywna binarka, porównując stdout, stderr i kody wyjścia bajt po bajcie, do tego cały korpus przechodzi przez AddressSanitizer w poszukiwaniu wycieków pamięci. To solidna metodologia jak na projekt na etapie ogłoszenia, ale trzeba pamiętać, że to wciąż pierwsza wersja skoncentrowana głównie na macOS arm64, a realne zastosowania w produkcji, zwłaszcza z zależnościami npm w trybie dynamicznym, dopiero pokażą, gdzie są prawdziwe pęknięcia.

Motywacja jest czytelna, szybszy cold start dla funkcji serverless i mniejsze zużycie pamięci, ale warto zachować zdrowy sceptycyzm wobec tego, ile realnego kodu produkcyjnego faktycznie mieści się w tej statycznej, w pełni bezpiecznej ścieżce bez uciekania się do trybu dynamicznego, który i tak dokłada silnik JS z powrotem do binarki.

**Key takeaways:**
- scriptc rozróżnia kod kompilowany statycznie, uruchamiany dynamicznie przez wbudowany silnik i odrzucony, zawsze jawnie i z konkretnym powodem
- Startup rzędu 2 milisekund i binarki poniżej 200 KB kontrastują z dziesiątkami milisekund i megabajtami typowymi dla Node
- Różnicowe testowanie na ponad 800 programach porównujące Node i natywną binarkę bajt po bajcie to poważne podejście do weryfikacji poprawności

**Why do I care:** Jeśli martwisz się cold startami funkcji na Vercelu albo gdziekolwiek indziej w modelu serverless, to warto to obserwować, ale na razie bardziej jako ciekawostkę do śledzenia niż coś, co wdrożysz w tym kwartale w produkcji.

**Link:** [GitHub - vercel-labs/scriptc: TypeScript-to-Native Compiler](https://github.com/vercel-labs/scriptc)

## Kimi K3, otwarty model na 2,8 biliona parametrów

**TLDR:** Moonshot AI wypuściło wagi Kimi K3, model MoE na 2,8 biliona parametrów z natywną multimodalnością i milionem tokenów kontekstu, opisywany jako pierwszy otwarty model klasy 3T. Wyniki na benchmarkach agentowych i programistycznych stawiają go blisko zamkniętych modeli czołowych dostawców, momentami je przebijając.

**Summary:** Liczby robią wrażenie same w sobie, 2,8 biliona parametrów całkowitych przy 104 miliardach aktywowanych na token, nowa architektura uwagi określana jako Kimi Delta Attention razem z Attention Residuals, oraz MoE z 896 ekspertami, z czego aktywnych jest tylko 16. Na benchmarkach takich jak AutomationBench czy τ³-Banking model wypada lepiej niż Opus 4.8 i porównywalnie z Fable 5, co jest solidnym wynikiem jak na model, którego wagi można pobrać samemu. W testach czysto agentowych, na przykład MCPMark-Verified, Kimi K3 wręcz wygrywa z większością zestawienia.

To, co odróżnia tę publikację od typowego ogłoszenia modelu, to gęstość przypisów metodologicznych, z jawnym wskazaniem, który harness użyto do którego benchmarku i ile razy dany model odmówił odpowiedzi albo wpadł w fallback z powodu klasyfikatorów bezpieczeństwa. To rzadka uczciwość w branży, w której zwykle porównuje się liczby bez ujawniania takich szczegółów, choć oczywiście trzeba pamiętać, że to sam producent modelu dobiera benchmarki do prezentacji. Dla zespołów rozważających self-hosting warto od razu ostudzić entuzjazm, bo model tej wielkości, nawet w kwantyzacji MXFP4, wymaga infrastruktury poza zasięgiem zdecydowanej większości firm, więc realnie i tak trafi do niego przez API zewnętrznego dostawcy jak platform.kimi.ai.

Fakt, że model jest kompatybilny z API OpenAI i Anthropica, obniża próg wejścia dla kogoś, kto już ma zintegrowany klient dla jednego z tych dostawców i chce po prostu podmienić endpoint na test.

**Key takeaways:**
- Kimi K3 to model MoE na 2,8 biliona parametrów całkowitych, 104 miliardy aktywowanych, z milionem tokenów kontekstu i natywną obsługą obrazu
- Wyniki na benchmarkach agentowych stawiają go blisko lub przed niektórymi zamkniętymi modelami czołowych dostawców
- Model jest dostępny z otwartymi wagami, ale jego realny rozmiar czyni self-hosting praktycznym tylko dla nielicznych organizacji

**Why do I care:** Dla większości zespołów to nie jest model do samodzielnego hostowania, ale otwarta alternatywa tej klasy obniża presję cenową na płatne API i daje punkt odniesienia przy negocjowaniu kontraktów z dostawcami zamkniętych modeli.

**Link:** [moonshotai/Kimi-K3 · Hugging Face](https://huggingface.co/moonshotai/Kimi-K3)

## Poolside Desktop Assistant, czyli pulpit sterowniczy dla wielu agentów naraz

**TLDR:** Poolside wypuściło aplikację na macOS oraz rozszerzenia do VS Code i Visual Studio, które pozwalają uruchamiać i nadzorować wiele agentów kodujących równolegle, niezależnie od tego, czy to własny model firmy, Claude Code, Codex czy model lokalny. Całość opiera się na protokole ACP, co ma zapewnić, że interfejs nie jest przywiązany do jednego dostawcy modelu.

**Summary:** Argument otwierający ten materiał jest trafny, jeden przewijany czat wystarczał, kiedy agent odpowiadał na pytanie, ale przestaje działać, gdy agent godzinami czyta repozytorium, zmienia pliki, uruchamia testy i naprawia to, co sam popsuł. Realną jednostką pracy przestaje być pojedyncza wiadomość, a staje się nią cała sesja przypisana do repozytorium, brancha i zestawu narzędzi, i dopiero z tej perspektywy sensowne staje się budowanie interfejsu wokół wielu równoległych sesji zamiast jednego okna czatu.

Wsparcie dla Git worktree wbudowane na poziomie aplikacji rozwiązuje realny problem, o którym rzadko się mówi wprost, czyli że kilku agentów pracujących na tym samym checkoutcie prędzej czy później zacznie nadpisywać swoje zmiany. Możliwość przekazania konwersacji razem z jej kontekstem z jednego agenta do drugiego, na przykład każąc jednemu zaplanować pracę a drugiemu ją zaimplementować, albo przełączenie się na inny harness po trafieniu na limit zapytań, to praktyczna odpowiedź na coś, co każdy używający kilku subskrypcji agentowych naraz już zdążył odczuć na własnej skórze.

Ciekawie wypada też porównanie z tym, co czytamy w materiale Anthropica o context engineering, bo oba teksty mówią właściwie o tym samym przesunięciu punktu ciężkości, z pisania promptów na projektowanie środowiska, w którym agent działa. Poolside stawia szczerą tezę, że nikt jeszcze nie ma dobrej odpowiedzi na to, ile autonomii dać agentowi i jak go realnie recenzować, co jest uczciwsze niż udawanie, że ten problem już został rozwiązany.

**Key takeaways:**
- Aplikacja pozwala uruchamiać równolegle agentów z różnych harnessów, w tym Claude Code i Codex, w ramach jednego workspace'u
- Natywne wsparcie dla Git worktree izoluje pracę poszczególnych agentów, żeby nie nadpisywali sobie nawzajem zmian
- Konwersację razem z kontekstem można przekazać z jednego agenta na innego, co ułatwia obejście limitów jednej subskrypcji

**Why do I care:** Jeśli twój zespół już eksperymentuje z kilkoma agentami kodującymi jednocześnie, problem izolacji checkoutów i przekazywania kontekstu między narzędziami jest realny, a nie teoretyczny, i warto śledzić, jak różne firmy próbują go rozwiązać zamiast wymyślać własne prowizorki od zera.

**Link:** [Introducing Poolside Desktop Assistant, for macOS](https://poolside.ai/blog/introducing-poolside-desktop-assistant)

## Dlaczego uśredniona preferencja w modelach reward jest złym pomysłem

**TLDR:** Ethan Smith opisuje, dlaczego modele nagrody trenowane na uśrednionych ocenach ludzi zamiast generować obrazy odpowiadające konkretnym gustom, produkują bezpieczny, przeciętny efekt, który w gruncie rzeczy nie podoba się nikomu. Proponuje kilka podejść do personalizacji, od mieszanin gaussowskich po warunkowanie modelu na tożsamości oceniającego.

**Summary:** Punkt wyjścia jest prosty i trudno się z nim nie zgodzić, ludzkie preferencje estetyczne bywają wzajemnie sprzeczne, jedni wolą mroczną, ponurą sztukę, inni jasną i pogodną, więc jeśli zbierzesz oceny od obu grup i uśrednisz, model nauczy się przewidywać wartość gdzieś pośrodku, czyli coś, co realnie nie odpowiada żadnej z grup. Autor trafnie porównuje to do sytuacji z klasyfikacją szumu, gdzie model przy losowych etykietach zbiega do przewidywania pięćdziesiąt na pięćdziesiąt, bo to najbezpieczniejszy zakład przy braku sygnału. Problem w tym, że pozorny "brak sygnału" w danych o preferencjach wcale nie musi być szumem, tylko realną, wielomodalną strukturą, którą standardowy model nagrody spłaszcza do jednej liczby.

Propozycje rozwiązań, mieszanina gaussowska, warunkowanie na profilu oceniającego, wektor losowy wstrzykiwany do sieci, są rozsądne, ale artykuł trochę zbywa milczeniem najtrudniejszą część całego pomysłu, czyli skąd wziąć w praktyce metadane o oceniających na dużą skalę bez wpadania w problemy prywatności albo w kolejną warstwę uprzedzeń, tym razem demograficznych. Sama koncepcja embeddingów zadaniowych w stylu "wygeneruj coś, co spodoba się oceniającemu numer pięć" brzmi elegancko na papierze, ale w praktyce oznacza utrzymywanie i trenowanie znacznie większej przestrzeni modeli nagrody niż dotychczas, co kosztuje.

Mimo tych zastrzeżeń to jeden z tych tekstów, które tłumaczą coś, co każdy zauważył gołym okiem, czyli dlaczego zdjęcia generowane przez najnowsze modele mają ten sam sztuczny, przesadnie wygładzony wygląd HDR, niezależnie od dostawcy. To nie przypadek stylistyczny, to bezpośrednia konsekwencja tego, jak trenuje się model nagrody na uśrednionych ocenach tłumu.

**Key takeaways:**
- Uśrednianie sprzecznych preferencji ludzkich w jednym modelu nagrody prowadzi do przeciętnych, "bezpiecznych" wyników zamiast trafienia w gust konkretnej grupy
- Mieszaniny gaussowskie i warunkowanie modelu na profilu oceniającego to konkretne, choć kosztowne, propozycje personalizacji reward modeli
- Charakterystyczny, przesadnie wygładzony wygląd wielu obrazów generowanych przez AI można częściowo wytłumaczyć właśnie tym mechanizmem uśredniania

**Why do I care:** To głównie temat dla zespołów budujących własne modele generatywne albo systemy rekomendacji oparte na ocenach użytkowników, dla typowego frontendowca to raczej ciekawe wyjaśnienie zjawiska, które widać na co dzień w narzędziach graficznych opartych na AI, niż coś do wdrożenia w architekturze aplikacji.

**Link:** [The mean preference is a bad estimate of preferences](https://www.ethansmith2000.com/post/the-mean-preference-is-a-bad-estimate-of-preferences)
