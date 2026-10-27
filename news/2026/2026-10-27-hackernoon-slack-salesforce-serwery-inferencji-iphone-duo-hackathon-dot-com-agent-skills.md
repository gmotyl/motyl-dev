---
title: "Slack po sprzedaży Salesforce, serwery inferencji, iPhone Duo, hackathon 13-latka, domena dot.com i 49 umiejętności agentów"
excerpt: "Sześć tekstów: kulisy sprzedaży Slacka za 27,7 mld dolarów, przegląd serwerów inferencji, adaptacja aplikacji do iPhone'a Duo, hackathon dla nastolatków, spór o domeny wokół Dots i zbiór umiejętności dla agentów."
publishedAt: "2026-10-27"
slug: "hackernoon-slack-salesforce-serwery-inferencji-iphone-duo-hackathon-dot-com-agent-skills"
hashtags: "#hackernoon #ai #agents #mobile #devtools #llm #architecture #career #generated #pl"
source_pattern: "HackerNoon"
---

## Pierwsi pracownicy Slacka opisują kulisy sprzedaży Salesforce za 27,7 mld dolarów

**TLDR:** Dwoje z ośmiu pierwszych pracowników Slacka prowadzi blog o historii firmy, a najnowszy wpis opisuje lata po przejęciu. Pokazuje to historię sprzedaży widzianą od środka, ale tylko po stronie Slacka.

**Summary:** Projekt Building Slack prowadzą Ali Rayl i Johnny Rodgers. Wpis „Salesforce, część druga" ukazał się 23 października 2026. Rodgers, dawny główny inżynier, odszedł wiosną 2023 po jedenastu latach, a Rayl była pierwszą osobą od wsparcia klientów. Nie zarabiają na blogu, bo nie ma tam reklam ani stałego harmonogramu.

Z wpisu wynika kilka szczegółów. Zanim Slack został kupiony, Butterfield proponował Bretowi Taylorowi sprzedaż Quipa Slackowi, a Taylor odwrócił ten pomysł późnym latem 2020. Założyciele sądzili, że nikt nie ma dość pieniędzy, żeby ich kupić, a oferta oznaczała około 28 razy przychód przy akcjach w okolicach 22 dolarów. Po przejęciu Butterfield krytykował wydatki, na przykład gwiazdy na wydarzeniach przy cięciu podróży między biurami. Sprzedawcy Salesforce prawie nie używali Slacka i sprzedawali to, co rozumieli, więc cross-sell, czyli sedno tezy przejęcia, nie wypalił. Butterfield jako punkt przełomowy wskazuje panel z will.i.am w Davos. Taylor ogłosił swoje odejście dzień przed Butterfieldem, który nie został uprzedzony.

Autor tekstu w HackerNoon sam zastrzega trzy ograniczenia: założyciele recenzowali notatki, więc współtworzyli własną opowieść, nie ma głosu Salesforce, a od odejścia minęły ponad trzy lata, co ułatwia szczerość i wygładza wspomnienia. Dodaje też wycenę: przy około trzech miliardach przychodu Slack mógłby być wart od 13 do 27 miliardów w zależności od mnożnika. Argument, że rynek treningu agentów wycenia go wyżej, jest spekulacją, a parytet 27,7 miliarda w 2026 nie jest zwrotem, bo przy 8 do 10 procentach rocznie próg wynosi 41 do 45 miliardów.

**Key takeaways:**
- To relacja jednej strony, zrecenzowana przez założycieli.
- Cross-sell do bazy Salesforce nie zadziałał, bo handlowcy nie mieli bodźca.
- Wartość Slacka zależy od mnożnika, a argument o treningu agentów jest hipotezą.

**Why do I care:** Dla lidera technicznego to lekcja o kulturze po przejęciu: produkt zostaje, ludzie odchodzą, a kupujący adoptuje narzędzie bez nawyków, które czynią je użytecznym. Ocenę „Slack wart więcej niż cena" traktuję ostrożnie, bo opiera się na wyborze wygodnych mnożników.

**Link:** [Slack's Original Employees Blog the Inside Story of the $27.7B Salesforce Sale](https://hackernoon.com/slacks-original-employees-blog-the-inside-story-of-the-$277b-salesforce-sale)

## Najlepsze serwery inferencji do modeli open source w produkcji

**TLDR:** Uruchomienie modelu zajmuje pół godziny, ale produkcja przy dziesięciu tysiącach żądań dziennie to inna historia. Wybór zależy od tego, czy obsługujesz jeden duży model, czy flotę małych.

**Summary:** Autor wylicza kryteria produkcyjne dla obciążeń agentowych: API zgodne z OpenAI, wywoływanie narzędzi i ustrukturyzowane wyjście, cache prefiksów, metryki w Prometheusie, autoskalowanie, obsługa wielu adapterów LoRA i szeroki zakres sprzętu.

Dla jednego dużego modelu przy wysokiej współbieżności domyślnym wyborem jest vLLM, dzięki PagedAttention i ciągłemu batchowaniu. SGLang wyróżnia się mechanizmem RadixAttention, który ponownie wykorzystuje obliczenia dla tych samych początków promptów, co pasuje do agentów wysyłających za każdym razem ten sam prompt systemowy. TensorRT-LLM to rozwiązanie wyłącznie dla NVIDII, a jego endpoint metryk jest wciąż w becie. LMDeploy sprawdza się przy kwantyzacji na mniejszych kartach, a serwer llama.cpp na CPU, Apple Silicon i urządzeniach brzegowych, ale przy małej liczbie jednoczesnych użytkowników.

Dla małych modeli wokół agenta, czyli embeddingów, rerankingu i ekstrakcji, autor wskazuje TEI od Hugging Face dla jednego modelu lub SIE od Superlinked dla wielu. I tu trzeba uważać: tekst jest w dużej mierze reklamą SIE. Liczby o wzroście przepustowości o ponad 50 procent i efektywności GPU z 51 do 92 procent pochodzą od samej firmy i są opisane jako ilustracyjny model. Lista kontrolna przed startem jest natomiast solidna: test obciążeniowy przy dwukrotności szczytu, sprawdzenie wywoływania narzędzi na twoim modelu i szablonie czatu, alerty, przypięte wersje, pomiar zimnego startu i zapasowa replika.

**Key takeaways:**
- Najpierw zdefiniuj, co znaczy produkcja, potem wybieraj serwer.
- vLLM to bezpieczny domyślny wybór, SGLang pasuje do agentów z powtarzanym kontekstem.
- Fragment o SIE jest promocyjny, a jego liczby pochodzą od producenta.

**Why do I care:** Jeśli wystawiasz własne modele za agentem, ta tabela oszczędza tydzień researchu. Czytaj jednak ostatnią część jak reklamę i zmierz własny miks modeli, zanim cokolwiek dołożysz do stosu.

**Link:** [Best Inference Servers for Running Open-Source Models in Production](https://hackernoon.com/best-inference-servers-for-running-open-source-models-in-production)

## Nie ignoruj zgięcia: aplikacja na iPhone'a Duo przed kwietniem 2027

**TLDR:** Od kwietnia 2027 każdy upload do App Store Connect musi używać SDK iOS 27, a aplikacje budowane z SDK 27.1 muszą mieć zrzuty ekranu dla Duo. Autor opisuje, jak w dwa tygodnie przystosował swoją aplikację.

**Summary:** Rozróżnienie wersji SDK jest ważne. Starsze niż iOS 27 działają w oknie wielkości telefonu, z czarnymi polami na wewnętrznym ekranie. SDK 27.0 rozciąga aplikację, ale nie zna pionowego paska narzędzi, a pełną obsługę Duo daje dopiero 27.1 z Xcode 27.1.

Apple udostępnia kilka nowych elementów. Reserved Regions opisuje obszary zarezerwowane przez sprzęt: wycięcie na kamerę i zgięcie dzielące treść. Arrangement View układa dwa widoki obok siebie lub nałożone, jak odpowiednik split view. Pionowy pasek narzędzi przenosi kontrolki na prawą krawędź, a typy związane z zawiasem pozwalają reagować na składanie i rozkładanie urządzenia. Zgięcie ma na symulatorze 40 punktów szerokości, a ekran wewnętrzny 951 na 669 punktów.

Autor nie użył Arrangement View, bo komórki list rozciągały się zbyt mocno, i zrobił własny układ śledzący zgięcie. Znalazł kilka nieoczywistych błędów. Wykrywanie orientacji po proporcjach widoku zawodzi, gdy klawiatura skraca widok, więc kierunek trzeba czytać z prostokąta zgięcia. Zmiana układu w trakcie pisania gubi fokus, więc trzeba go zachować. Odczyt zgięcia na żywo psuje gest przesunięcia wstecz, więc wartości zapisuje się dla stanu spoczynku. Wreszcie domyślne chowanie przycisków podczas przewijania ukrywało Save i Close.

Zastrzeżenie: wszystko zmierzono na symulatorze, a autor sam przyznaje, że nie spodziewa się różnic na prawdziwym urządzeniu. Promuje też własne narzędzie do zrzutów ekranu.

**Key takeaways:**
- Pełne wsparcie Duo wymaga SDK 27.1, a termin zmian w App Store to kwiecień 2027.
- Orientację czytaj ze zgięcia, nie z proporcji widoku.
- Testuj wszystkie kombinacje kształtów urządzenia i stanów ekranu, w tym pisanie podczas rozkładania.

**Why do I care:** Dla zespołów mobilnych to konkretny harmonogram z terminem, a dla frontendowców webowych ciekawy sygnał, że składane ekrany wracają do głównego nurtu. Te same problemy, czyli zmiana układu w trakcie interakcji i utrata fokusu, znamy z responsywnego webu.

**Link:** [Stop Ignoring the Crease: Ship Your iOS App for iPhone Duo Before the April 2027 Deadline](https://hackernoon.com/stop-ignoring-the-crease-ship-your-ios-app-for-iphone-duo-before-the-april-2027-deadline)

## Mam 13 lat i zorganizowałem globalny hackathon dla nastolatków prawie bez budżetu

**TLDR:** Autor z Hanoi zorganizował Checkpoint, darmowy hackathon online dla osób w wieku 13 do 18 lat, z około 50 zapisanymi z 15 krajów. Dzieli się tym, co zadziałało, a co nie.

**Summary:** Pierwsza edycja, poświęcona grom z pozytywnym przekazem, odbędzie się online od 8 do 10 stycznia 2027. Jest zaprojektowana dla początkujących: start o 19:00 czasu Hanoi, nagrody w naturze, a zgłoszenie można wysłać nawet bez ukończonej gry.

Najciekawsze są nieefektowne lekcje. Sponsorzy chcą rozmawiać z organizacją, więc projekt działa pod parasolem Hack Foundation, a nie jako własna organizacja. Zasady bezpieczeństwa, czyli kodeks postępowania, zgoda rodziców i zakaz prywatnych wiadomości od jurorów, to pierwsza rzecz, o którą pytają nauczyciele i poważni sponsorzy. Działały prośby o rzeczy, które nic nie kosztują firmę, jak domeny, licencje i hosting, a nie gotówka.

Autor przyznaje błędy: podanie wartości nagród w dolarach przyciągnęło niewłaściwych uczestników, zbyt sprytne zasady wieku wymagały ręcznych decyzji, a strona twierdziła, że większość nie skończyła wcześniej gry, choć naprawdę było to 45 procent. Pomogły wiadomości prywatne, nie ogłoszenia w dużych społecznościach. Warto zauważyć, że to relacja organizatora o własnym wydarzeniu, z zastrzeżeniem o konflikcie interesów, a liczba 47 zapisanych jest niewielka, więc wnioski o skuteczności metod to anegdoty.

**Key takeaways:**
- Parasol fiskalny rozwiązuje problem statusu prawnego nieletniego organizatora.
- Zasady bezpieczeństwa napisz, zanim zapytają o nie dorośli.
- Prywatne wiadomości zadziałały lepiej niż duże ogłoszenia, ale trzeba pilnować dalszych kroków.

**Why do I care:** To raczej historia o organizowaniu społeczności niż o technologii, ale każdy, kto prowadzi meetup lub wewnętrzny hackathon, znajdzie tu praktyczne rady: sprawdzaj liczby przed publikacją i nie rób wszystkiego sam.

**Link:** [i'm 13 and i built a global hackathon for teens with almost no budget. here's how.](https://hackernoon.com/im-13-and-i-built-a-global-hackathon-for-teens-with-almost-no-budget-heres-how)

## Czy Elon Musk kupił dot.com, żeby zakpić z agenta Dots od OpenAI?

**TLDR:** Dot.com przekierowuje do Grok Bot od SpaceXAI, a dots.com należy do sklepu odzieżowego. Zmiana właściciela domeny nastąpiła 28 lipca, na dwa miesiące przed premierą Dots.

**Summary:** OpenAI zapowiedziało Dots, czyli stale działających agentów, którzy pracują dalej po zakończeniu rozmowy. Okazało się, że ani dot.com, ani dots.com nie należą do OpenAI. Wiadomo, że SpaceXAI przejęło dot.com, że domena przekierowuje do Grok Bot, i że stało się to przed ogłoszeniem Dots. Krążąca kwota 20 milionów dolarów nie ma publicznego potwierdzenia, a motyw pozostaje nieudowodniony.

Autor dodaje kontekst: Chat.com kupiono za 15,5 miliona dolarów, a AI.com za 70 milionów. Najciekawszy fragment jest w końcówce, gdzie przesuwa się z żartów na istotę zmiany: jeśli chatbot działa przez sekundy, a agent ma pracować bez końca, to miara postępu przestaje być wynikiem w benchmarku, a staje się liczbą godzin użytecznej pracy bez udziału człowieka, odsetkiem porażek i kosztem inferencji. To zaczyna przypominać ekonomię pracy.

Tekst jest w dużej mierze felietonem i miejscami dość wulgarnym, a sporo twierdzeń opiera na doniesieniach mediów, nie na dokumentach.

**Key takeaways:**
- Potwierdzono zmianę właściciela dot.com i przekierowanie do Grok Bot, kwoty nie potwierdzono.
- Dots i Grok Bot należą do tej samej kategorii agentów działających stale.
- Nowa miara to godziny pracy bez nadzoru, nie wynik benchmarku.

**Why do I care:** Dla większości z nas to anegdota, ale przypomina, że nazwa i domena produktu to element architektury marki, który warto rozstrzygnąć przed premierą. Ciekawsza jest teza o miarach: pytanie, ilu agentów jedna osoba potrafi nadzorować, będzie wkrótce ważniejsze od pytania o wynik w teście.

**Link:** [Did Elon Musk Buy Dot.com Just to Troll OpenAI's New AI Agent Dots?](https://hackernoon.com/did-elon-musk-buy-dotcom-just-to-troll-openais-new-ai-agent-dots)

## Awesome Agent Skills: 49 umiejętności dla lepszego kodowania z AI

**TLDR:** Zbiór 49 procedur w plikach SKILL.md obejmuje przegląd kodu, debugowanie, testy, architekturę, bezpieczeństwo i dokumentację. Autor porównuje go z popularnymi alternatywami.

**Summary:** Każda umiejętność leży w folderze z plikiem SKILL.md i opisuje proces oraz oczekiwany wynik, na przykład zweryfikowaną poprawkę, audyt z priorytetami albo dokumentację opartą na kodzie. Nie ma tu skryptów, bo procedury korzystają z narzędzi agenta. Uzupełniają pliki AGENTS.md i CLAUDE.md: te zawierają stałe zasady projektu, a umiejętność daje metodę na konkretne zadanie.

Trzy założenia wyróżniają kolekcję. Ustalenia muszą mieć dowód w kodzie, ścieżce wykonania lub wyniku polecenia. Badanie i naprawa są rozdzielone, więc audyt daje raport przed jakąkolwiek zmianą. Raporty wprost wymieniają, czego nie sprawdzono. Autor porównuje zbiór z Superpowers, kolekcjami Matta Pococka i Addy'ego Osmaniego, ECC, wshobson i Trail of Bits, a liczby gwiazdek na GitHubie podaje z dnia 17 października.

Warto pamiętać, że autor jest twórcą tej kolekcji, więc porównanie nie jest neutralne, choć uczciwie przyznaje, że nie ma wyniku bezpośredniego starcia i że gwiazdki nie mierzą jakości. Zaleca przetestować jedną umiejętność na znanym fragmencie projektu i ocenić dowody, przydatność oraz koszt kontekstu.

**Key takeaways:**
- Umiejętność opisuje metodę pracy, a pliki AGENTS.md i CLAUDE.md stałe zasady.
- Raporty z dowodami i jawnymi ograniczeniami łatwiej ocenić.
- Brak wyniku porównawczego, więc wartość trzeba sprawdzić samemu.

**Why do I care:** Jeśli utrzymujesz istniejący produkt, audyt z raportem przed zmianami to rozsądniejsza praktyka niż prośba „sprawdź wszystko". Zanim zainstalujesz 49 umiejętności, wybierz dwie lub trzy, bo każda zjada kontekst agenta.

**Link:** [Awesome Agent Skills: 49 Skills for Better AI-Assisted Coding](https://hackernoon.com/awesome-agent-skills-49-skills-for-better-ai-assisted-coding)
