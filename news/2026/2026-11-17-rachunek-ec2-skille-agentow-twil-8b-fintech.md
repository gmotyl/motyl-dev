---
title: "Rachunek za EC2, biblioteka skilli dla agentów, mały model TwIL-8B i ryzyko aplikacji fintech"
excerpt: "Cztery teksty z HackerNoon: jak projektować koszty EC2, co zawiera biblioteka Cuttlefish.MD, czym jest model TwIL-8B i dlaczego aplikacje fintech to nie sejf."
publishedAt: "2026-11-16"
slug: "rachunek-ec2-skille-agentow-twil-8b-fintech"
hashtags: "#hackernoon #aws #architecture #agents #ai #llm #security #generated #pl"
source_pattern: "HackerNoon"
---

## Your EC2 Bill is an Architecture Problem, Not an Accounting One

**TLDR:** Koszt obliczeń w AWS zapada na etapie projektu, a nie w panelu rozliczeń. Autor omawia cztery decyzje, które go kształtują, i pokazuje, jak złożyć je w jednym stosie CDK.

**Summary:** Zaczyna od rodziny instancji. Klasa wyznacza stosunek procesorów do pamięci. Serwis ograniczony przez CPU na instancjach ogólnego przeznaczenia płaci za pamięć, której nie dotyka, a serwis ograniczony pamięcią na instancjach obliczeniowych trzeba nadmiernie skalować. Najpierw profilowanie, potem wybór. Jeśli kod nie zależy od binarek tylko na x86, autor radzi zacząć od Gravitona. Graviton4 ma być do 30 procent szybszy od trzeciej generacji i zwykle jest tańszy o około 20 procent niż porównywalne Intele i AMD. Seria T bywa droższa niż M, jeśli serwis działa gorąco przez godziny, bo AWS dolicza kredyty.

Drugi temat to sposób zakupu mocy. Zalecany układ jest taki. Stałą podstawę 24 godziny na dobę pokrywa roczny Compute Savings Plan, szczyty obsługuje Spot rozłożony na wiele typów instancji, a mały wycinek On-Demand zostaje jako zapas. Autor prostuje przy tym stary mit. Spot nie jest już aukcją, ceny zmieniają się wolno, a przerwania wynikają głównie z tego, że AWS potrzebuje sprzętu z powrotem. Strategia alokacji priceCapacityOptimized jest według AWS dobrym domyślnym wyborem.

Najbardziej praktyczny fragment dotyczy drenowania. Spot daje dwie minuty ostrzeżenia, a domyślne opóźnienie wyrejestrowania w ALB to 300 sekund. Jeśli go nie zmienisz, węzeł umrze w trakcie drenowania, a użytkownicy dostaną błędy 502. Opóźnienie i stopTimeout trzeba ustawić na 60 do 90 sekund. Dane nie mogą leżeć na dysku węzła, więc do Spota najlepiej pasuje EFS.

Na końcu lista kosztów, które zjadają oszczędności. Ruch między strefami dostępności kosztuje 0,01 dolara za GB w każdą stronę, a jedna brama NAT dla trzech stref daje opłaty za przesył. Każdy publiczny adres IPv4 to 0,005 dolara za godzinę, czyli około 3,65 dolara miesięcznie.

Czego tu brakuje? Autor nie mówi o kosztach operacyjnych tej architektury. Mieszanka Spota, trzech stref i EFS jest tania w rachunku, ale wymaga zespołu, który ją rozumie i potrafi debugować przy awarii.

**Key takeaways:**
- Rodzinę instancji dobieraj do wąskiego gardła, nie do przyzwyczajenia.
- Baza na Savings Plan, szczyty na zróżnicowanym Spocie, zapas na On-Demand.
- Opóźnienie wyrejestrowania w ALB musi mieścić się w dwóch minutach ostrzeżenia Spota.
- Koszty sieci potrafią zjeść oszczędności z doboru instancji.

**Why do I care:** Frontendowiec rzadko dotyka rachunku AWS, ale jako architekt często dostaję pytanie, dlaczego aplikacja na Next.js kosztuje tyle, ile kosztuje. Zawsze zaczynam od ruchu między strefami i NAT, nie od rozmiaru instancji. Uwaga o 502 przy złym drenowaniu to coś, co widziałem w prawdziwych projektach.

**Link:** [Your EC2 Bill is an Architecture Problem, Not an Accounting One](https://hackernoon.com/your-ec2-bill-is-an-architecture-problem-not-an-accounting-one)

## Cuttlefish.MD Skills Library Puts 2,806 License-Checked Agent Skills to Work

**TLDR:** HackerNoon zebrało 2908 skilli agentów w jednej bibliotece, a 2806 z nich ma licencje pozwalające na redystrybucję. Są pogrupowane w dziewięć pluginów, które instaluje się jedną komendą.

**Summary:** Skill to folder z plikiem SKILL.md, czyli nazwą, krótkim opisem i instrukcją, plus ewentualne skrypty. Agent czyta na starcie tylko nazwy i opisy, a pełną instrukcję ładuje dopiero wtedy, gdy zadanie pasuje. Dzięki temu nieużywany skill kosztuje jedną linijkę kontekstu.

Licencje są sprawdzane osobno dla każdego skilla. Te na MIT, Apache 2.0, BSD lub CC-BY trafiają do repozytorium bez zmian z informacją o autorze i commicie. Pozostałe są tylko linkowane. Największe wtyczki to pisanie i blogowanie z 706 skillami, dane i nauka z 599, a workflow deweloperski z 530. Jest też 102 skilli z zakresu bezpieczeństwa.

Autor sam zaznacza, że licencja nie jest przeglądem bezpieczeństwa, bo cudzy skill to instrukcje wykonywane z uprawnieniami twojego agenta. Poleca skill-scanner od Sentry do sprawdzania innych skilli. To trafna uwaga, ale ironiczna, bo biblioteka kusi masową instalacją. Dwadzieścia jeden polecanych skilli to w dużej części znane nazwiska, więc łatwo wpaść w pułapkę zaufania do marki.

**Key takeaways:**
- Skille ładują się na żądanie, więc nieużywane prawie nic nie kosztują.
- Licencja jest sprawdzana dla każdego skilla, ale to nie jest audyt bezpieczeństwa.
- Przed instalacją czytaj SKILL.md albo przepuść go przez skaner.

**Why do I care:** Mamy skille w tym repozytorium i wiem, ile potrafią zmienić w pracy agenta. Wiem też, że obcy skill to zdalnie wgrane instrukcje. Wybrałbym kilka sprawdzonych, przeczytał je w całości i nie instalował całych kategorii.

**Link:** [Cuttlefish.MD Skills Library Puts 2,806 License-Checked Agent Skills to Work](https://hackernoon.com/cuttlefishmd-skills-library-puts-2806-license-checked-agent-skills-to-work)

## Meet TwIL-8B, webAI's AI Model for Math, Coding, and Reasoning

**TLDR:** TwIL-8B to model z 8,79 miliarda parametrów, wytrenowany dalej z IBM Granite 4.2 8B pod matematykę konkursową, kod i wykonywanie poleceń. Jest słabszy w testach wiedzy ogólnej i ma licencję niekomercyjną.

**Summary:** Model ma dwa warianty. Zbalansowany jest domyślny i produkuje krótsze ślady rozumowania, a wariant rozwlekły jest przeznaczony do trudnych zadań konkursowych, gdzie dłuższe rozumowanie nie przeszkadza. Okno kontekstu to 131 072 tokeny, odziedziczone po bazie. Trening to pełne dostrajanie nadzorowane oraz uczenie ze wzmocnieniem GRPO i DAPO.

W porównaniu z Qwen3.5-9B wygrywa na MATH-500, LiveCodeBench i IFBench, a przegrywa na GPQA Diamond, MMLU-Pro i niektórych zestawach konkursowych. Wynik GPQA Diamond to 70,2. Część wyników zmierzono tylko na wariancie rozwlekłym, a liczby konkurentów pochodzą z publikacji, nie z własnych powtórzeń.

Najważniejsze zastrzeżenie jest w licencji. Webai wydało model na niekomercyjnej licencji, mimo że baza jest na Apache 2.0. Tekst to w gruncie rzeczy opis karty modelu wygenerowany automatycznie, bez informacji o sprzęcie i opóźnieniach.

**Key takeaways:**
- Dwa warianty, zbalansowany i rozwlekły, o różnej długości rozumowania.
- Mocny w matematyce i kodzie, słabszy w testach wiedzy.
- Licencja niekomercyjna ogranicza użycie w produkcie.

**Why do I care:** Dla większości zespołów frontendowych to ciekawostka. Wersja skwantyzowana ma około 5 GiB, więc da się ją uruchomić lokalnie do eksperymentów. Do produktu komercyjnego jej nie wezmę przez licencję.

**Link:** [Meet TwIL-8B, webAI's AI Model for Math, Coding, and Reasoning](https://hackernoon.com/meet-twil-8b-webais-ai-model-for-math-coding-and-reasoning)

## Are Fintech Apps Putting Your Life Savings at Risk?

**TLDR:** Były bankowiec tłumaczy, że Wise, Revolut czy PayPal to świetne narzędzia do przesyłania pieniędzy, ale często nie są chronione jak zwykły bank. Radzi trzymać tam tylko małe kwoty.

**Summary:** Punkt wyjścia to stopka aplikacji, w której stoi nazwa podmiotu i licencja. W banku z licencją twoje saldo jest zobowiązaniem banku i obejmuje je ustawowa gwarancja, w USA do 250 tysięcy dolarów, w UE do 100 tysięcy euro, a w Wielkiej Brytanii do 120 tysięcy funtów. Instytucja pieniądza elektronicznego działa inaczej. Chroni środki przez wydzielenie ich na wspólnych kontach, ale to nie jest gwarancja depozytów. Przy upadłości likwidatorzy zamrażają konta i dzielą pulę, a koszty administracyjne potrącają z pieniędzy klientów, więc można nie dostać całości.

Autor pokazuje, że ta sama marka znaczy co innego zależnie od kraju. Revolut w Europie jest bankiem z licencją, w Wielkiej Brytanii emitentem pieniądza elektronicznego, a w USA programem opartym na partnerskim banku. Osobna pułapka to model BaaS. Gdy upadł pośrednik Synapse, tysiące użytkowników straciły dostęp do oszczędności na miesiące, bo księgi nie zgadzały się z saldami w banku partnerskim, a FDIC nie mógł nic wypłacić.

Drugie zagrożenie to automatyczne blokady. Banki partnerskie boją się kar, więc fintechy ustawiają monitoring na maksymalną czułość, a ludzi do rozpatrywania spraw jest mało. Autor daje cztery zasady. Aplikacja ma być portfelem, nie sejfem. Pensja i fundusz awaryjny leżą w zwykłym banku. Trzeba mieć dwie niezależne instytucje i nie trzymać nadmiaru środków na procesorach płatności.

To jest sensowne, ale ma słabość. Autor opisuje ryzyko jednej strony. Nie podaje, jak często blokady dotykają użytkowników w skali całej bazy klientów, więc trudno ocenić prawdopodobieństwo.

**Key takeaways:**
- Sprawdź, jaki podmiot prawny i jaka licencja stoją za twoim saldem.
- Zabezpieczenie środków to nie gwarancja depozytów.
- Pośrednicy BaaS dokładają ryzyko, którego FDIC nie pokrywa.
- Miej dwa niezależne konta i trzymaj w aplikacjach tylko tyle, ile możesz stracić na dwa miesiące.

**Why do I care:** To jest tekst bardziej dla freelancerów i konsultantów niż dla pracy w kodzie, ale to nasza grupa. Sam rozliczam część klientów przez takie usługi i od dawna przelewam wpływy od razu na zwykłe konto. Jeśli budujesz produkt płatniczy, przeczytaj sekcję o BaaS jako ostrzeżenie o własnej odpowiedzialności.

**Link:** [Are Fintech Apps Putting Your Life Savings at Risk?](https://hackernoon.com/are-fintech-apps-putting-your-life-savings-at-risk)
