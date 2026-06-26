---
title: "Chip Jalapeño od OpenAI, computer use w Gemini 3.5 Flash i okulary Meta za $299"
excerpt: "OpenAI i Broadcom zaprezentowali niestandardowy chip o nazwie Jalapeño, Google dodało obsługę computer use do Gemini 3.5 Flash, a Meta wypuściło okulary AI w cenie $299."
publishedAt: "2026-06-25"
slug: "openai-jalapeno-chip-gemini-computer-use-meta-glasses"
hashtags: "#theaibreak #ai #chips #silicon #agents #computer-use #hardware #llm #generated #pl"
source_pattern: "The AI Break"
---

## OpenAI i Broadcom prezentują Jalapeño, pierwszy niestandardowy chip do inferencji stworzony przez OpenAI

**TLDR:** OpenAI i Broadcom ujawniły Jalapeño, pierwszy autorski chip do inferencji opracowany przez OpenAI. Układ ten oferuje znacznie lepszą wydajność w przeliczeniu na wat w porównaniu z dostępnymi na rynku opcjami GPU. To bezpośredni ruch mający na celu zmniejszenie zależności od Nvidia i przejęcie kontroli nad większą częścią stosu inferencji.

**Podsumowanie:** Przez lata OpenAI był jednym z największych nabywców sprzętu Nvidia, wydając ogromne sumy na utrzymanie ChatGPT działającego w skali. Jalapeño zmienia te kalkulacje. Niestandardowy chip zaprojektowany specjalnie pod kątem obciążeń inferencji, stworzony we współpracy z Broadcom, oznacza, że OpenAI może dostosowywać układ do własnych architektur modeli zamiast obchodzić ograniczenia ogólnego GPU. Deklarowane wzrosty wydajności dotyczą nie tylko surowej prędkości, ale przede wszystkim kosztów. Inferencja w skali OpenAI pochłania największe środki, a obniżenie kosztu o ułamki centa za token w miliardach dziennych zapytań przekłada się na setki milionów dolarów oszczędności.

Partnerstwo z Broadcom jest równie interesujące. Broadcom po cichu stał się jednym z najważniejszych projektantów niestandardowych chipów w branży, obsługując między innymi TPU dla Google. Dołączenie OpenAI do tego grona sygnalizuje dojrzewanie sposobu, w jaki czołowe laboratoria AI myślą o swojej infrastrukturze. To nie jest już problem oprogramowania z hardware'em jako dodatkiem. Chip jest produktem.

Warto obserwować, co stanie się z siłą negocjacyjną Nvidia w kwestii cen. W momencie, gdy kilka dużych laboratoriów AI dysponuje wiarygodnymi alternatywami, nawet jako zabezpieczeniem, pozycja Nvidia słabnie. Tę presję rynek mógł już wycenić, ale Jalapeño nadaje jej konkretny kształt. OpenAI ma teraz drogę do dyktowania Nvidia własnych warunków cenowych, zamiast płacić tyle, ile firma zażąda.

W ogłoszeniu brakuje jednak jednego elementu. Nie wiemy niemal nic o procesie produkcyjnym, zaangażowaniu TSMC ani o tym, na jaki węzeł technologiczny ten chip jest skierowany. Te szczegóły będą miały ogromne znaczenie dla oceny, czy Jalapeño stanowi realne zagrożenie dla dominacji Nvidia H100 i B200, czy też jest długoterminowym zakładem, który przez lata nie osiągnie porównywalnej wydajności.

**Najważniejsze wnioski:**
- OpenAI i Broadcom ujawniły Jalapeño, pierwszy niestandardowy chip do inferencji OpenAI, celujący w wydajność przewyższającą dostępne GPU.
- Daje to OpenAI narzędzie do zmniejszenia zależności od Nvidia i obniżenia kosztu uruchamiania modeli w dużej skali per token.
- Ruch ten naśladuje to, co Google zrobiło z TPU, sugerując, że niestandardowy silicon staje się standardową praktyką czołowych laboratoriów AI.

**Dlaczego mnie to dotyczy:** Z perspektywy architektonicznej ma to znaczenie, ponieważ koszty inferencji bezpośrednio kształtują ceny API dla deweloperów. Kiedy OpenAI obniży koszty obliczeniowe, oszczędności mogą ostatecznie przełożyć się na niższe ceny API lub wyższe limity zapytań. Sygnalizuje to też pionową konsolidację warstwy infrastruktury AI. Jeśli budujesz na API OpenAI, twoja struktura kosztów jest coraz bardziej powiązana z decyzjami podejmowanymi na poziomie krzemowym. Zrozumienie tej zależności jest częścią projektowania odpornych systemów.

**Link:** [OpenAI Built Its Own Chip, and It's Called Jalapeño](https://theaibreak.substack.com/p/openai-built-its-own-chip-and-its?publication_id=1842292&post_id=203527187&isFreemail=true&triedRedirect=true)

---

## Google dodaje computer use do Gemini 3.5 Flash

**TLDR:** Google wbudowało możliwości computer use bezpośrednio w Gemini 3.5 Flash, swój tani i szybki model. Deweloperzy mogą teraz budować agentów kontrolujących przeglądarki i aplikacje desktopowe bez potrzeby osobnej warstwy orkiestracji. Stawiając praktycznych agentów sterujących komputerem w zasięgu większej liczby projektów.

**Podsumowanie:** Computer use, czyli zdolność modelu AI do obserwowania ekranu i obsługi klawiatury oraz myszy, był wcześniej kojarzony albo z Claude od Anthropic, albo z niszowymi demonstracjami badawczymi. Wbudowanie tej funkcji przez Google w Gemini 3.5 Flash zmienia równanie dostępności. Flash jest tani i szybki, co ma ogromne znaczenie przy projektowaniu agenta, który może potrzebować dziesiątek kroków w przepływie pracy w przeglądarce. Każdy krok kosztuje rundę do modelu, więc cena inferencji bezpośrednio ogranicza ambicje agenta.

Google sprawia, że automatyzacja przeglądarki i desktopa staje się standardową możliwością dla deweloperów, a nie niszowym problemem badawczym. Poprzednia generacja automatyzacji przeglądarki opierała się na jawnych selektorach i strukturyzowanych API. Computer use odwraca tę logikę. Model po prostu patrzy na ekran jak człowiek i sam określa, gdzie kliknąć. Ta solidność odbywa się kosztem szybkości i niezawodności w porównaniu z dobrze ustrukturyzowanym API, ale odblokowuje automatyzację dla ogromnej przestrzeni oprogramowania, które nigdy nie było projektowane z myślą o programowej automatyzacji.

Warto zadać pytanie, które większość relacji pomija. Computer use działa dobrze w demonstracjach i kontrolowanych środowiskach. W produkcji dryft UI jest bezlitosny. Przycisk się przesuwa, pojawia się nieoczekiwany modal i agent się gubi. Prawdziwym wyzwaniem dla zespołów budujących na tej technologii nie jest początkowa demonstracja, lecz długi ogon przypadków brzegowych, gdy automatyzowane oprogramowanie aktualizuje swój interfejs. Google niewiele powiedziało o tym, jak Gemini 3.5 Flash radzi sobie z odzyskiwaniem po nieoczekiwanych stanach, a właśnie tam tkwi ciężka praca inżynierska.

**Najważniejsze wnioski:**
- Google wbudowało computer use natywnie w Gemini 3.5 Flash, pozwalając agentom kontrolować przeglądarki i aplikacje desktopowe.
- Niski koszt i szybkość Flash sprawiają, że jest praktyczny w wieloetapowych przepływach pracy agentów, gdzie każdy krok wymaga wywołania modelu.
- Głównym nierozwiązanym wyzwaniem inżynierskim pozostaje graceful recovery, gdy UI docelowego oprogramowania zmienia się nieoczekiwanie.

**Dlaczego mnie to dotyczy:** Jako deweloper budujący narzędzia i wewnętrzną automatyzację, computer use w tanim i szybkim modelu jest naprawdę użyteczny. Oznacza możliwość tworzenia agentów, którzy wchodzą w interakcję ze starszymi produktami SaaS bez API lub automatyzowania przepływów pracy w przeglądarce, które dwa lata temu wymagałyby pełnej platformy RPA. Praktyczną kwestią jest stabilność w pipeline'ach CI/CD. Jeśli budujesz agenta, który uruchamia Gemini 3.5 Flash do sterowania przeglądarką, potrzebujesz solidnej strategii obsługi regresji UI w docelowej aplikacji. To nie jest problem Gemini, to problem projektowania produktu dla każdego, kto dostarcza agentów zależnych od wizualnych interfejsów.

**Link:** [OpenAI Built Its Own Chip, and It's Called Jalapeño](https://theaibreak.substack.com/p/openai-built-its-own-chip-and-its?publication_id=1842292&post_id=203527187&isFreemail=true&triedRedirect=true)

---

## Perplexity wprowadza Computer for Counsel, korporacyjnego agenta AI dla sektora prawnego

**TLDR:** Perplexity wydało Computer for Counsel, korporacyjnego agenta AI klasy enterprise dla sektora prawnego, który uruchamia jednocześnie ponad 20 modeli i integruje się z Microsoft 365 oraz bazami danych orzecznictwa. Produkt jest skierowany do zespołów prawnych potrzebujących AI zdolnego do rozumowania na wielu źródłach, a nie tylko wyszukiwania. To bezpośrednia ekspansja na rynek, gdzie dokładność i możliwość śledzenia źródeł są absolutnie konieczne.

**Podsumowanie:** Prawo to jedna z niewielu dziedzin, gdzie AI może być jednocześnie naprawdę transformacyjne i naprawdę niebezpieczne. Halucynowane cytowania spraw już przyniosły prawdziwą kompromitację prawnikom, którzy ufali AI bez weryfikacji. Podejście Perplexity w Computer for Counsel jest godne uwagi, bo uruchomienie ponad 20 modeli równolegle z bezpośrednią integracją z bazami orzecznictwa sugeruje, że produkt jest zaprojektowany wokół dokładności wyszukiwania, a nie tylko płynności generowania.

Integracja z Microsoft 365 to inteligentne pozycjonowanie. Zespoły prawne żyją w Outlook, Teams i Word. Jeśli agent może działać wewnątrz tych narzędzi i wciągać kontekst prawny do dokumentu bez konieczności osobnego przepływu pracy, bariera adopcji znacznie spada. Niemniej jednak korporacyjne oprogramowanie prawne ma notoryczne długie cykle sprzedaży i głęboko ugruntowanych graczy, takich jak LexisNexis i Westlaw. Perplexity zakłada, że jego podejście nastawione na wyszukiwanie przekłada się na badania prawne lepiej niż u incumbentów, którzy retrofitują AI na dziesięcioletnie produkty.

W ogłoszeniu brakuje szczegółów dotyczących sposobu weryfikacji cytowań przez system i komunikowania niepewności użytkownikom. Dla produktu skierowanego do prawników to nie są miłe dodatki, lecz elementy kluczowe dla odpowiedzialności zawodowej. Jeśli Computer for Counsel halucynuje sprawę, a prawnik złoży pozew się na niej opierając, to człowiek wciąż odpowiada przed izbą adwokacką. Produkt musi zdobywać zaufanie stopniowo, jedno zweryfikowane cytowanie na raz.

**Najważniejsze wnioski:**
- Perplexity uruchomiło Computer for Counsel, agenta AI dla sektora prawnego uruchamiającego ponad 20 modeli z integracjami orzecznictwa i Microsoft 365.
- Produkt kierowany jest do korporacyjnych zespołów prawnych potrzebujących dokładnych, możliwych do śledzenia badań, a nie ogólnego czatu AI.
- Największym nierozwiązanym pytaniem pozostaje sposób obsługi weryfikacji cytowań i komunikowania własnej niepewności profesjonalnym użytkownikom.

**Dlaczego mnie to dotyczy:** Narzędzia prawne są bliższe narzędziom deweloperskim, niż się wydaje. Umowy, dokumentacja compliance, polityki prywatności i warunki korzystania z usług to artefakty prawne, z którymi regularnie stykają się zespoły inżynierskie. Agent AI potrafiący dokładnie rozumować na podstawie orzecznictwa i dokumentów firmowych mógłby naprawdę zaoszczędzić godziny w cyklach przeglądu compliance. Chciałbym zobaczyć, jak radzi sobie z pytaniami specyficznymi dla jurysdykcji i czy wyświetla poziomy pewności, zanim zaufałbym mu w kontekście profesjonalnym.

**Link:** [OpenAI Built Its Own Chip, and It's Called Jalapeño](https://theaibreak.substack.com/p/openai-built-its-own-chip-and-its?publication_id=1842292&post_id=203527187&isFreemail=true&triedRedirect=true)

---

## Meta i EssilorLuxottica wprowadzają okulary Meta za $299 z modelem AI Muse Spark

**TLDR:** Meta i EssilorLuxottica wypuściły okulary Meta w cenie od $299, wyposażone w nowy model AI Muse Spark. Okulary są zaprojektowane jako wearable towarzysz AI, a nie pełnoprawny wyświetlacz AR. W tej cenie mogą być pierwszym urządzeniem AI do noszenia, które osiągnie znaczącą skalę konsumencką.

**Podsumowanie:** Poprzednia generacja Meta Ray-Ban była dowodem słuszności koncepcji. Były interesujące, trochę gadżeciarskie i sprzedawały się wystarczająco dobrze, by uzasadnić sequel. Te nowe okulary z Muse Spark reprezentują coś bardziej przemyślanego. Dołączenie specjalnie zaprojektowanego modelu AI do okularów za $299 to konkretna teza produktowa: że ambientowe AI na twarzy, dostępne bez wyjmowania telefonu, jest warte zapłaty i codziennego noszenia.

Fakt, że Muse Spark to niestandardowy model, ma znaczenie. Meta nie kieruje po prostu zapytań do Llamy przez połączenie Bluetooth z telefonem. Model jest prawdopodobnie zoptymalizowany pod kątem ograniczonego środowiska obliczeniowego wearable, zapewniając niskie opóźnienia, nastawienie na konwersację i dostosowanie do rodzaju pytań, jakie zadajesz, gdy patrzysz na coś w realnym świecie, a nie siedzisz przy biurku. Ta specyficzność odróżnia użyteczny produkt od demonstracji.

Partnerstwo z EssilorLuxottica zasługuje na więcej uznania niż zwykle otrzymuje. Soczewki korekcyjne, dystrybucja przez optyki i wiarygodność designerska to rzeczy, których firma technologiczna nie zbuduje z dnia na dzień. Meta dysponuje łańcuchem dostaw i relacjami detalicznymi, których żadna inna firma technologiczna nie ma dla tego form factoru. Apple Vision Pro to niezwykły sprzęt, który w tej cenie niemal nikt nie kupi. Meta idzie w przeciwnym kierunku i $299 z rozpoznawalnym designem oprawek Luxottica to poważna próba masowej dystrybucji.

Pytanie, do którego wciąż wracam, dotyczy czasu pracy na baterii i społecznej akceptacji. Można wbudować najbardziej użyteczne AI w okulary i tak poniesie porażkę, jeśli ludzie będą czuć się nieswojo nosząc je publicznie lub jeśli wyczerpią się po trzech godzinach użytkowania. Meta nie opublikowała prominentnie specyfikacji czasu pracy, co jest albo przeoczeniem, albo czymś, o czym wolałaby, żebyś nie myślał przed zakupem.

**Najważniejsze wnioski:**
- Meta i EssilorLuxottica wprowadziły okulary Meta za $299, zasilane nowym modelem AI Muse Spark zaprojektowanym specjalnie do tego urządzenia.
- Cena $299 i partnerstwo designerskie z Luxottica pozycjonują je jako poważną próbę masowej adopcji wearable AI.
- Czas pracy na baterii i społeczna akceptacja w przestrzeniach publicznych pozostają dwoma barierami, których żadna specyfikacja techniczna nie może w pełni odpowiedzieć przed rzeczywistym użytkowaniem.

**Dlaczego mnie to dotyczy:** Wearable AI potrafiące obserwować kontekst i odpowiadać na pytania bez ekranu to zupełnie inny model interakcji. Jako osoba myśląca o narzędziach deweloperskich i interfejsach, interesuje mnie, co się stanie, gdy AI przeniesie się poza ekran do ambient computingu. Jeśli te okulary dotrą do milionów użytkowników, pojawi się zapotrzebowanie na integracje, interfejsy voice-first i API, które nie zakładają klawiatury. To nowa powierzchnia, którą deweloperzy będą musieli projektować, i warto zwrócić na to uwagę teraz, zamiast nadrabiać zaległości później.

**Link:** [OpenAI Built Its Own Chip, and It's Called Jalapeño](https://theaibreak.substack.com/p/openai-built-its-own-chip-and-its?publication_id=1842292&post_id=203527187&isFreemail=true&triedRedirect=true)

---

## ByteDance prezentuje Seedance 2.5: natywne 30-sekundowe filmy 4K AI z jednego promptu

**TLDR:** ByteDance ujawnił Seedance 2.5, model generowania wideo produkujący natywne 30-sekundowe klipy 4K z jednego promptu tekstowego, bez sklejania między segmentami. Model przyjmuje do 50 obrazów referencyjnych jako wejście. To znaczący krok poza 5-10 sekundowe klipy, które typowo generują obecne modele video AI.

**Podsumowanie:** Generowanie wideo AI przez jakiś czas tkwiło w problemie krótkich klipów. Większość modeli osiąga maksymalnie pięć do dziesięciu sekund spójnego wyjścia, zanim spójność ruchu się degraduje lub model traci ślad tego, co robił. Trzydzieści sekund natywnego, niezlejanego contentu 4K z jednego promptu, jeśli twierdzenia sprawdzą się w rzeczywistym użyciu, to prawdziwy skok w spójności czasowej.

Input 50 obrazów referencyjnych to funkcja, którą uważam za najbardziej praktycznie interesującą. Generowanie wideo utrzymujące spójność wizualną z konkretną postacią, produktem lub sceną przez 30-sekundowy klip to miejsce, gdzie żyją komercyjne przypadki użycia. Zastępowanie materiału stockowego, filmy demo produktów i tworzenie contentu w mediach społecznościowych wymagają spójności, której wcześniejsze modele nie mogły dostarczyć bez rozbudowanej post-produkcji. Pięćdziesiąt obrazów referencyjnych to dużo kontekstu do pracy.

Strategiczne uzasadnienie dla ByteDance do zbudowania tego jest oczywiste. Silnik contentu TikToka opiera się na krótkim wideo, a model zdolny generować profesjonalnej jakości klipy dla twórców byłby jednocześnie rowem obronnym i centrum kosztów. Pytanie brzmi, czy stanie się narzędziem twórcy, z którego TikTok korzysta wewnętrznie, samodzielnym produktem, czy API dostępnym dla zewnętrznych deweloperów. Historia ByteDance z produktami AI sugeruje, że nie będzie nieśmiały w kwestii dystrybucji, jeśli model dobrze działa.

W branży ciągnie się niewygodna rozmowa na temat wideo AI tej jakości, którą wciąż się odsuwa. Kiedy 30-sekundowe klipy 4K są nie do odróżnienia od prawdziwych nagrań, proweniencja i weryfikacja stają się problemami infrastrukturalnymi. ByteDance działa w środowisku regulacyjnym, gdzie ta rozmowa jest szczególnie skomplikowana. Osiągnięcie techniczne jest tutaj realne. Co się z nim stanie, to osobne i trudniejsze pytanie.

**Najważniejsze wnioski:**
- ByteDance ujawnił Seedance 2.5, generujący niezszyty natywny 30-sekundowy film 4K z jednego promptu przy do 50 wejściach referencyjnych.
- Skok od 5-10 sekundowych klipów do 30 sekund spójnego wyjścia oznacza istotny postęp w spójności czasowej video AI.
- Komercyjne przypadki użycia, takie jak dema produktów i narzędzia twórcy, stają się opłacalne, gdy spójność obrazów referencyjnych działa w skali, ale wyzwania związane z proweniencją i weryfikacją rosną równolegle z tą możliwością.

**Dlaczego mnie to dotyczy:** Generowanie wideo na tym poziomie wierności zmienia to, co małe zespoły mogą dostarczyć. Dwuosobowy startup lub samodzielny deweloper może teraz tworzyć wideo marketingowe, treści demo lub materiały wyjaśniające bez budżetu produkcyjnego. Dla każdego budującego narzędzia deweloperskie lub produkty wymagające contentu wizualnego obniża to barierę dla dopracowanej prezentacji. Odwrotną stroną jest to, że uwaga na autentyczność w treściach technicznych ma teraz jeszcze większe znaczenie. Kiedy każdy może wygenerować przekonujące wideo demo, te pokazujące prawdziwy produkt faktycznie działający będą się wyróżniać.

**Link:** [OpenAI Built Its Own Chip, and It's Called Jalapeño](https://theaibreak.substack.com/p/openai-built-its-own-chip-and-its?publication_id=1842292&post_id=203527187&isFreemail=true&triedRedirect=true)

---

## Qualcomm przejmuje Modular za $3,92 mld, by rzucić wyzwanie uzależnieniu od CUDA Nvidia

**TLDR:** Qualcomm przejął startup AI Modular za około $3,92 mld w transakcji all-stock. Modular buduje infrastrukturę pozwalającą obciążeniom AI działać na chipach Nvidia, AMD i Qualcomm bez przywiązania do SDK jednego dostawcy. Przejęcie to bezpośrednia próba erozji przewagi ekosystemu CUDA Nvidia.

**Podsumowanie:** Lock-in CUDA to prawdziwy rów obronny Nvidia, nie tylko hardware. Gdy pipeline'y trenowania i inferencji AI firmy są napisane przeciwko CUDA, przejście na silicon AMD lub Qualcomm wymaga przepisania oprogramowania, rewalidacji wyników i przeszkolenia zespołów. Główny produkt Modular, platforma MAX i język programowania Mojo, był wyraźnie zaprojektowany, by zerwać tę zależność poprzez dostarczenie ujednoliconej warstwy abstrakcji ponad dostawcami sprzętu.

Kupno Modular przez Qualcomm to przyznanie, że wygranie rynku chipów wymaga wygrania ekosystemu oprogramowania. Qualcomm ma już konkurencyjny sprzęt AI, zwłaszcza do inferencji edge na urządzeniach mobilnych i linii Snapdragon. Czego brakowało mu, to narracja dla deweloperów, którzy chcą pisać raz i wdrażać na różnych celach sprzętowych. Modular daje im tę narrację wraz z inżynierami, którzy ją zbudowali.

Cena $3,92 mld jest znacząca dla firmy, która nie osiągnęła jeszcze masowej adopcji wśród deweloperów. Qualcomm płaci nie za bieżące przychody, ale za potencjał wykorzystania abstrakcji Modular do utowarowienia warstwy oprogramowania, którą Nvidia aktualnie posiada. Czy to zadziała, zależy od tego, czy główne laboratoria AI i dostawcy chmury poważnie przyjmą stos Modular, co wymaga przesunięcia zaufania i inercji.

Chris Lattner, założyciel Modular i twórca infrastruktury kompilatora LLVM oraz Swift, to zasób, który nie pojawia się w bilansie. Utrata go przez Modular lub zatrzymanie w Qualcomm zdecyduje, czy to przejęcie przyniesie wyniki, czy tylko powiększy zatrudnienie.

**Najważniejsze wnioski:**
- Qualcomm przejął Modular za $3,92 mld, by pozyskać wieloplatformową warstwę oprogramowania AI celującą w chipy Nvidia, AMD i Qualcomm.
- Umowa dotyczy strategii ekosystemu oprogramowania nie mniej niż sprzętu, dążąc do osłabienia wpływu CUDA na przepływy pracy deweloperów AI.
- Prawdziwy zakład polega na tym, czy warstwa abstrakcji Modular osiągnie wystarczającą adopcję, by silicon Qualcomm stał się naprawdę konkurencyjną alternatywą w produkcyjnych wdrożeniach AI.

**Dlaczego mnie to dotyczy:** Dla deweloperów ma to znaczenie, bo fragmentacja toolchainów to realny koszt. Jeśli podejście Modular zyska trakję, wybór sprzętu do inferencji stanie się mniej istotny dla pisanego oprogramowania, co jest dobre dla przenośności i negocjacji z dostawcami. Język Mojo i silnik inferencji MAX warto obserwować bezpośrednio, niezależnie od strategii Qualcomm. Jeśli spełnią obietnicę kompatybilnych z Pythonem wydajnych kerneli AI, zmieni to sposób, w jaki zespoły optymalizują pipeline'y inferencji bez potrzeby wiedzy z zakresu CUDA.

**Link:** [OpenAI Built Its Own Chip, and It's Called Jalapeño](https://theaibreak.substack.com/p/openai-built-its-own-chip-and-its?publication_id=1842292&post_id=203527187&isFreemail=true&triedRedirect=true)
