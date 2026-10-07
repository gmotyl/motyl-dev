---
title: "Kilo Desktop łączy ponad 500 modeli AI w jednej aplikacji, a Dots, Instinct i Muse walczą o inną grupę klientów"
excerpt: "Kilo wprowadza desktopową aplikację do agentowego kodowania i analizy danych z natywnym dostępem do ponad 500 modeli i lokalnym uruchamianiem modeli open source, a osobny tekst zestawia trzy nowe, zawsze włączone agenty, OpenAI Dots, Instinct i Meta Muse, pokazując jak różnią się pozycjonowaniem na klienta biznesowego kontra prywatnego."
publishedAt: "2026-10-07"
slug: "kilo-desktop-dots-instinct-muse-zawsze-wlaczone-agenty"
hashtags: "#kilo #ai #agents #devtools #generated #pl"
source_pattern: "Kilo"
---

## Kilo Desktop: jedna aplikacja, ponad 500 modeli, workspace'y łączące wiele repozytoriów

**TLDR:** Kilo Desktop to nowa aplikacja do budowania z AI, łącząca agentowe kodowanie i analizę danych w jednym miejscu, z natywnym dostępem do ponad 500 modeli od różnych dostawców, lokalnym uruchamianiem modeli open source oraz workspace'ami grupującymi wiele folderów z różnych repozytoriów w jeden kontekst dla agenta.

**Summary:** Problem, który adresuje Kilo Desktop, jest znajomy każdemu, kto próbował wyjść poza jeden model czy jednego dostawcę: frontier laby jak OpenAI, Anthropic czy Google budują świetne modele, ale ich agenty wiążą użytkownika z własną rodziną modeli, próba modelu open source od NVIDIA, Moonshota, MiniMax czy Z AI oznacza zmianę całego setupu, a uruchamianie modelu lokalnie dokłada kolejne narzędzie do zarządzania. Kilo Desktop pakuje tę pracę w jedno miejsce: natywny dostęp do ponad 500 modeli, agentowe workflowy kodowania i analizy danych planujące przed budową, oraz wbudowane zarządzanie lokalnymi modelami i środowiskami conda.

Realne projekty rzadko mieszczą się w jednym folderze, frontend, API i analiza danych często żyją w osobnych repozytoriach, a większość narzędzi agentowych widzi tylko jedno z nich naraz. Workspace w Kilo Desktop to nazwana grupa folderów z dysku użytkownika, dzięki czemu agent może czytać przez cały projekt podczas budowy, na przykład wykorzystując wyniki analizy do napisania serwisu albo sprawdzając API podczas aktualizacji frontendu, bez ręcznego kopiowania plików między repozytoriami.

Aplikacja dostarcza cztery wbudowane agenty: Code pisze i edytuje pliki, Plan czyta projekt i zwraca krok-po-kroku plan implementacji bez dotykania kodu, a po zatwierdzeniu planu Code dzieli go na podzadania i uruchamia je równolegle przez subagentów. Ask odpowiada na pytania o kod bez wprowadzania zmian, pozwalając zrozumieć projekt przed zanurzeniem się w nim, a Debug znajduje i naprawia to, co się zepsuło. Użytkownicy mogą też budować własne, niestandardowe agenty i dzielić się nimi z zespołem. W notebookach agent edytuje komórki bezpośrednio, a użytkownik obserwuje kursor poruszający się przez komórkę w czasie rzeczywistym, zamiast kopiować kod do czatu i wklejać odpowiedzi z powrotem.

Środowiska conda są tworzone i zarządzane wewnątrz aplikacji, z dostępem do ponad 19 tysięcy zweryfikowanych pakietów z katalogu Anaconda, więc właściwe zależności są gotowe jeszcze przed pierwszym promptem. Interfejs organizuje czaty, notebooki, pliki, diffy i terminale jako zakładki układane dowolnie według potrzeb, z trybem karuzeli dla szerokich układów i możliwością wyciągnięcia dowolnej zakładki na drugi monitor. Jeśli użytkownik nie chce wybierać modelu ręcznie, autorouter Auto Efficient sprawdza żądanie względem wewnętrznego benchmarku Kilo Bench i wysyła je do najtańszego modelu, który udowodnił, że radzi sobie z tym typem zadania, więc płaci się dokładnie tyle, ile wymaga zadanie, nie więcej.

Dla pracy, która nigdy nie powinna opuszczać maszyny użytkownika, dostępny jest lokalny serwer modeli uruchamiający modele open source bezpośrednio na sprzęcie, z osobnym ustawieniem decydującym, czy lokalne żądania dostają pełen zestaw narzędzi agentowych Kilo, czy działają w lżejszym, szybszym trybie bez nich. Marketplace Kilo oferuje skille, serwery MCP i niestandardowe agenty instalowalne dla jednego workspace'a albo wszystkich naraz, a przy pracy zespołowej administratorzy kontrolują, z jakich modeli, dostawców i geografii zespół może korzystać oraz co dany agent może robić.

**Key takeaways:**
- Natywny dostęp do ponad 500 modeli od różnych dostawców w jednej aplikacji, plus lokalne uruchamianie modeli open source
- Workspace grupuje wiele folderów z różnych repozytoriów w jeden kontekst, który agent widzi naraz
- Cztery wbudowane agenty (Code, Plan, Ask, Debug) plus możliwość budowy własnych i dzielenia się nimi z zespołem
- Autorouter Auto Efficient kieruje zadanie do najtańszego modelu zdolnego je wykonać, według wewnętrznego benchmarku Kilo Bench

**Why do I care:** Dla zespołów zmęczonych przełączaniem się między osobnymi narzędziami dla różnych dostawców modeli to konkretna propozycja konsolidacji, choć warto ocenić krytycznie, czy agentowe workflowy "planujące przed budową" faktycznie radzą sobie lepiej niż zwykłe, dobrze napisane prompty, zanim zdecyduje się przenieść tam cały zespołowy workflow.

**Link:** [Introducing Kilo Desktop](https://blog.kilo.ai/p/desktop)

## Dots, Instinct i Muse to ta sama kategoria agentów, ale dla innych klientów

**TLDR:** OpenAI Dots, startupowy Instinct i Meta Muse należą do tej samej kategorii "zawsze włączonych agentów" spopularyzowanej przez OpenClaw, ale są zbudowane dla różnych odbiorców: Dots celuje w zastosowania profesjonalne przez ChatGPT, Slacka i Teams, a Instinct i Muse w codzienną logistykę życia prywatnego przez iMessage, WhatsApp i dedykowaną aplikację.

**Summary:** Wszystkie trzy produkty rozumieją, nad czym pracuje użytkownik, zapamiętują kontekst i podejmują działania w jego imieniu bez konieczności kierowania każdym krokiem z osobna. OpenClaw, który wystartował w listopadzie 2025, spopularyzował tę kategorię jako pierwszy, pokazując jak może wyglądać agent działający w sposób ciągły i dostępny przez aplikacje komunikacyjne, których ludzie już używają. Największa różnica między trzema nowymi produktami to to, dla kogo zostały zbudowane: OpenAI demonstruje Dots naprawiającego oprogramowanie, aktualizującego materiały launchowe, przechodzącego przez research i przygotowującego oferty sprzedażowe, podczas gdy Instinct pokazuje rezerwację przejazdu na lotnisko, znalezienie fachowca czy śledzenie porzuconych wątków rozmów, a Muse od Mety jest pozycjonowane podobnie, jako agent osobisty.

Ta różnica w pozycjonowaniu ma sens biznesowy: OpenAI buduje biznes enterprise, więc naturalnie prezentuje swojego agenta jako coś, czemu można delegować pracę zawodową, podczas gdy Meta jest firmą konsumencką, więc Muse pokazuje się jako pomoc w codziennym życiu. Widać to też w sposobie interakcji: z Dots rozmawia się przez ChatGPT, z dodatkowymi kanałami Slack i Teams, z Instinct przez iMessage lub WhatsApp, a Muse ma własną aplikację, dostępną też przez WhatsApp. To ma znaczenie praktyczne, bo miejsce, w którym żyje agent, wpływa na to, co w ogóle przyjdzie użytkownikowi do głowy mu zlecić: w Slacku naturalnie wciąga się agenta w rozmowy robocze, a w wiadomościach tekstowych łatwiej napisać do niego, gdy człowiek przypomni sobie, że trzeba coś zarezerwować na jutro.

Druga oś porównania dotyczy danych uwierzytelniających i prywatności. OpenAI deklaruje, że wspierane, bezpieczne formularze logowania chronią hasła przed ujawnieniem modelowi, choć ta ochrona nie obejmuje haseł wklejonych bezpośrednio do czatu czy dokumentu. Polityka treningowa zależy od typu konta: dane z planów Business, Enterprise i Edu nie są domyślnie używane do treningu, a na planach osobistych decyduje ustawienie poprawy modelu. Dots jest oferowany na planach bez reklam, ale to osobna deklaracja od jawnego zobowiązania do rozdzielenia danych agenta od systemów reklamowych.

Instinct jawnie zakłada, że użytkownik poda loginy i hasła, żeby agent mógł logować się do kont w jego imieniu, ale autor nie znalazł publicznego, technicznego wyjaśnienia, jak te dane uwierzytelniające są odseparowane od modelu, co pozostawia otwarte pytanie o implementację. Dane z Google Workspace API dostają dodatkową ochronę: Instinct deklaruje, że nie są używane do treningu ani reklam, co jest specyficznym zobowiązaniem, różnym od ogólnej polityki obejmującej wszystko inne, czym użytkownik dzieli się z asystentem. Meta jest tu najbardziej wyraźna architektonicznie: hasła i tokeny uwierzytelniające są przechowywane osobno od agenta, który może z nich korzystać bez widzenia rzeczywistych danych logowania, a rozmowy i dane w wirtualnej maszynie Muse nie są współdzielone z systemami reklamowymi Mety, choć odwiedzenie strony sprzedawcy czy wykonanie akcji na innym serwisie może i tak wpłynąć na reklamy, które użytkownik potem widzi. Dane sanitarne z interakcji są używane do treningu, chyba że użytkownik się wypisze.

Autor podsumowuje, że te różnice w danych i prywatności są ważne, ale to opublikowane deklaracje firm, nie niezależnie zweryfikowane zabezpieczenia techniczne. Rozróżnienie profesjonalny-kontra-prywatny jest przydatne na dziś, ale z czasem te zastosowania będą się coraz bardziej przenikać, bo podróż służbowa łączy pracę z logistyką prywatną, a skrzynka mailowa miesza obowiązki zawodowe z rzeczami do załatwienia w domu.

**Key takeaways:**
- Dots, Instinct i Muse należą do tej samej kategorii "zawsze włączonych agentów", ale różnią się odbiorcą: profesjonalny kontra prywatny
- Miejsce interakcji (Slack/Teams dla Dots, iMessage/WhatsApp dla Instinct i Muse) wpływa na to, do czego użytkownicy naturalnie używają agenta
- Instinct jawnie zakłada podawanie haseł do kont, ale brakuje publicznego wyjaśnienia technicznej separacji tych danych od modelu
- Meta deklaruje architektoniczne rozdzielenie haseł i tokenów od agenta jako najbardziej wyraźne spośród trzech produktów

**Why do I care:** Zanim ktokolwiek w zespole zacznie podłączać firmowe konta do takich agentów, warto potraktować te deklaracje prywatności jako punkt wyjścia do własnego due diligence, nie jako gotową odpowiedź, bo różnica między "deklarowaną architekturą" a "niezależnie zweryfikowaną implementacją" jest tu wyjątkowo istotna przy agentach mających dostęp do prawdziwych haseł i kont.

**Link:** [Dots, Instinct, and Muse: The Same Category, Different Customers](https://blog.kilo.ai/p/dots-instinct-and-muse-the-same-category)
