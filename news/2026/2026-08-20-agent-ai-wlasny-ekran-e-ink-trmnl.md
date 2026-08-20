---
title: "Mój agent AI dostał własny ekran e-ink i sam decyduje, co na nim pokazać"
excerpt: "Autor podłączył agenta AI do wyświetlacza e-ink TRMNL i pokazuje, dlaczego prosty, głupi ekran w połączeniu z inteligentnym oprogramowaniem to lepszy kierunek dla sprzętu niż upychanie AI w samym urządzeniu."
publishedAt: "2026-08-20"
slug: "agent-ai-wlasny-ekran-e-ink-trmnl"
hashtags: "#joozio #ai #agents #hardware #dx #productivity #open-source #generated #pl"
source_pattern: "PawelJozefiak"
---

## Mój agent AI dostał własny ekran na biurku. On decyduje, co widzę.

**TLDR:** Autor kupił wyświetlacz e-ink TRMNL i podłączył go do własnego agenta AI, który samodzielnie decyduje, co pokazać na ekranie w zależności od pory dnia. Zamiast kolejnej aplikacji na telefonie powstało spokojne, fizyczne miejsce, przez które agent komunikuje się z właścicielem, od kalendarza po licznik dni życia.

**Summary:** Na biurku autora stoi mały szary ekran, który pokazuje, że wykorzystał już 42,14% swojego życia. Zbudował to narzędzie z pomocą własnego agenta w jeden wieczór, opierając wyliczenie na wieku, średniej długości życia w swoim kraju i niewielkiej korekcie na postęp medycyny. Część założeń jest dyskusyjna, ale liczba i tak codziennie przyciąga jego wzrok. To jednak nie jest recenzja sprzętu, tylko opowieść o tym, jak zmienia się kategoria urządzeń łączących sprzęt z AI.

Autor od dawna buduje małe aplikacje i zawsze polegał na sieci, bo działa niemal wszędzie, od telefonu po lodówkę. Z pojawieniem się AI tworzenie prototypów stało się bardziej dostępne, choć wciąż nie proste. Zostawał jednak inny niedosyt: chęć majsterkowania przy sprzęcie na takich samych zasadach, na jakich majsterkuje się przy oprogramowaniu. Pierwszym doświadczeniem w tym kierunku był Flipper Zero, formalnie narzędzie do pentestów, w praktyce zabawka o otwartej architekturze, która pozwala robić rzeczy, których producent nigdy nie planował. Gdy autor zbudował własnego agenta i zanurzył się w agentowym AI, przyszła myśl, że wszystko, co robi agent, żyje wyłącznie na ekranie komputera, i że warto to rozszerzyć w stronę czegoś fizycznego.

Tak trafił na TRMNL, wyświetlacz e-ink bez dotyku i bez aplikacji do klikania, z kilkoma przyciskami, którego jedynym zadaniem jest pokazywanie informacji. Na platformie działa już ponad tysiąc gotowych wtyczek, od kalendarza po Hacker News, a panel do konfiguracji jest na tyle prosty, że nie wymaga umiejętności programowania. Bateria przy typowym odświeżaniu wytrzymuje do trzech miesięcy, co zupełnie zmienia sposób myślenia o tym, gdzie ekran można powiesić, bo nie musi stać przy gniazdku.

Najciekawsze zaczyna się, gdy autor podłączył urządzenie do swojego agenta. Wtyczka z pulpitem nie jest ustawiona na stałe, agent ma do niej dostęp i sam decyduje, co pokazać i kiedy. W godzinach pracy priorytet mają zadania i decyzje czekające na akceptację, po godzinach ekran się przełącza albo miesza treści, gdy coś naprawdę ważnego wymaga uwagi. Autor pisze, że ma ADHD i przez lata frustrowały go narzędzia z tymi samymi widgetami w tej samej kolejności każdego dnia. Tutaj po raz pierwszy to interfejs dopasowuje się do dnia, a nie on do interfejsu, bo cała inteligencja siedzi za ekranem, a sam ekran pozostaje głupi.

Z czasem doszły rzeczy, których nikt nie wypuściłby jako produkt, bo mają sens tylko dla jednej osoby. Wtyczka podpowiadająca jedno ćwiczenie na pięć minut, trzydzieści pompek albo dziesięć głębokich oddechów, zamiast scrollowania między spotkaniami. Wtyczka z pulpitem wzrostu bloga, licznikiem dni do końca roku i skrótem z Hacker News, po którym autor zauważył, że rzadziej wchodzi już na sam serwis, bo nagłówki i tak przewijają mu się przed oczami. I ta najbardziej osobista, z 42,14% życia, czasem przeliczanym na liczbę lat, w których syn jeszcze będzie chciał spędzać z nim czas. Autor nie ucieka od tego tematu, traktuje licznik jako spokojne przypomnienie, żeby mimo wszystko robić więcej ze swoim czasem, bez presji, że każdy dzień musi być najlepszy w życiu.

Firmware urządzenia jest otwartoźródłowy, a producent publikuje instrukcje pozwalające zbudować własne urządzenie i uruchomić na nim to samo oprogramowanie, część ludzi robi to nawet na starych, zjailbreakowanych Kindle'ach. Autor podkreśla, że szukał haczyka i go nie znalazł. Największym wnioskiem z całego tekstu jest to, że przez lata sprzęt dla zwykłych ludzi oznaczał funkcję na stałe zaszytą w urządzeniu, a gdy się z niej wyrastało, kupowało się kolejne urządzenie. Ostatnie dwa lata sprzętu z AI szły w stronę upychania inteligencji w samym urządzeniu. TRMNL idzie w przeciwną stronę: urządzenie zostaje proste i tanie, a cała inteligencja żyje w agencie i skryptach właściciela, które sięgają przez ten ekran do świata fizycznego.

**Key takeaways:**
- E-ink TRMNL kosztuje 139 dolarów, ma baterię na do trzech miesięcy i ponad tysiąc gotowych wtyczek, więc nie wymaga programowania, żeby dawać wartość.
- Podłączenie urządzenia do własnego agenta AI zmienia je z kolejnego pulpitu w interfejs, który sam dobiera treść do pory dnia i kontekstu, zamiast wyświetlać zawsze te same widgety.
- Firmware jest otwartoźródłowy, więc granica między kupieniem gotowego sprzętu a zbudowaniem własnego praktycznie zanika.

**Why do I care:** Jako architekt frontendu widzę w tym dokładnie ten sam wzorzec, który AI wprowadza do software'u: prosta, tania warstwa prezentacji i cała logika przeniesiona w głąb systemu, tylko że tym razem warstwą prezentacji jest fizyczny ekran, a nie komponent w przeglądarce. To przypomina mi debaty o cienkim kliencie i grubym backendzie, tylko przeniesione na sprzęt konsumencki. Dla zespołów budujących narzędzia wewnętrzne czy dashboardy to sygnał, żeby nie projektować interfejsu jako stałego układu widgetów, tylko jako powierzchnię, którą agent może wypełniać dynamicznie w zależności od kontekstu użytkownika. To głównie ciekawostka dla osób lubiących majsterkować, ale kierunek, w którym tania powierzchnia plus agent zastępują drogie, dedykowane urządzenia, wart jest obserwowania.

**Link:** [My AI Agent Got Its Own Screen on My Desk. It Decides What I See.](https://thoughts.jock.pl/p/trmnl-eink-ai-agent-physical-surface-2026?publication_id=1540552&post_id=211971744&isFreemail=true&triedRedirect=true)
