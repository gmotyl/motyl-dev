---
title: "Czy AI napisze CAD, ESP32 jako API, naprawianie błędów z Claude, osiem platform agentów i hamulce laboratoriów AI"
excerpt: "Plan testu CAD generowanego przez LLM, mikrokontroler jako usługa REST, ścieżka QA do produkcji z agentem, koszty platform agentów i teza o regulacjach jako ochronie monopolu."
publishedAt: "2026-11-03"
slug: "hackernoon-cad-esp32-rest-bledy-z-ai-platformy-agentow-hamulce-ai"
hashtags: "#hackernoon #ai #agents #testing #llm #devtools #open-source #generated #pl"
source_pattern: "HackerNoon"
---

## Czy AI napisze CAD? Plan testu modeli generujących części 3D

**TLDR:** Student mechaniki publikuje metodę testu, zanim pokaże wyniki. Chce sprawdzić, czy kod CadQuery wygenerowany przez LLM daje część, którą da się wyprodukować. To część pierwsza, bez wyników.

**Summary:** Autor wychodzi od różnicy między skryptem, który się wykonuje, a częścią, która działa. Skrypt może przejść bez błędu i dać wspornik ze ścianką 0,3 milimetra albo koło zębate, które z niczym się nie zazębi. Dlatego opisuje trzy sposoby reprezentowania brył w CAD, czyli granice, drzewo operacji logicznych i powierzchnie NURBS, a potem prostą zasadę, że prawdziwa umiejętność to uchwycenie intencji projektowej, czyli które wymiary są wolne i co musi zostać prawdą po zmianie.

Metoda jest przemyślana. Pięć części rośnie w trudności, od wspornika z otworami po zespół śruby, nakrętki i płyty. Kryteria zaliczenia są ustalone przed testem, żeby nie dopasować ich do wyników. Skrypt ma się wykonać, dać jedną poprawną bryłę, mieścić się w tolerancji, zachować poprawność po zmianie parametrów o 25 procent i przejść reguły produkcji. Osobno liczy się pierwsza próba, wersja po trzech poprawkach i wersja poprawiona ręcznie, a tej ostatniej nie wolno liczyć jako sukcesu modelu.

Autor jest szczery co do ograniczeń: mała próba, jedna biblioteka, subiektywna ocena sensu inżynierskiego i produkcyjność oceniana cyfrowo, a nie przez druk. Hipoteza jest zachowawcza. AI napisze kod, czasem użyteczny, ale użyteczność zależy od człowieka, który rozumie geometrię i proces.

Brakuje na razie wszystkiego, co najciekawsze, czyli wyników i nazw testowanych modeli.

**Key takeaways:**
- Skrypt, który się wykonuje, nie dowodzi, że część jest poprawna.
- Kryteria ustalono przed testem, a ręczne poprawki liczone są osobno.
- Wyników jeszcze nie ma, to tylko metoda.

**Why do I care:** Ten sam wzorzec stosuje się do generowania kodu frontendowego. Zdefiniuj kryteria przed pierwszym promptem, mierz pierwszą próbę osobno od poprawionej i nie licz własnych poprawek jako sukcesu modelu. Warto go skopiować do własnych ocen narzędzi AI.

**Link:** [Can AI Write CAD? Testing LLM-Generated 3D Models for Manufacturability](https://hackernoon.com/can-ai-write-cad-testing-llm-generated-3d-models-for-manufacturability)

## Mikrokontroler za 5 dolarów jako API do monitorowania sieci

**TLDR:** Druga część serii przerabia ESP32-C3 z wyświetlaczem na lekką usługę REST. Autor omawia schemat JSON, nagłówki CORS, wykrywanie przez mDNS i pułapkę z poleceniem curl w PowerShellu.

**Summary:** Urządzenie zwraca migawkę stanu sieci pod jednym adresem, z nazwą sieci, adresem IP, maską, bramą, DNS, siłą sygnału i statusem internetu. Serwer na ESP32 jest jednowątkowy i oparty na odpytywaniu, więc obsługa klienta musi być wywoływana w każdej iteracji głównej pętli, inaczej połączenia będą gubione.

CORS to klasyczny problem, który frontendowiec zna z innej strony. Zapytanie z wiersza poleceń działa, a to samo z aplikacji na localhost w przeglądarce jest blokowane, dopóki urządzenie samo nie doda nagłówków zezwalających. Autor ustawia zezwolenie dla każdego źródła, co jest w porządku w sieci domowej, ale warto pamiętać o konsekwencjach.

Wykrywanie przez mDNS pozwala używać nazwy z końcówką local zamiast adresu IP, który zmienia się po restarcie routera. Najciekawszy akapit dotyczy Windows PowerShell 5.1, gdzie curl jest aliasem Invoke-WebRequest. Ten korzysta ze starszego stosu .NET, który omija nowoczesny resolver mDNS, więc nazwa się nie rozwiązuje, mimo że ping działa. Wystarczy wywołać curl.exe.

Dobrze, że autor od razu mówi o ograniczeniach pamięci, ale pomija bezpieczeństwo. Otwarty endpoint bez uwierzytelniania i z dowolnym źródłem to dane o sieci dla każdego w LAN.

**Key takeaways:**
- Serwer REST na ESP32 wymaga wołania obsługi klienta w każdej iteracji pętli.
- CORS trzeba obsłużyć w samym firmware.
- W PowerShellu curl to alias, a mDNS wymaga prawdziwego curl.exe.

**Why do I care:** To bardzo przystępny przykład tego, że CORS i mDNS nie są tajemnicą frontendu. Jeśli budujesz dashboard do sprzętu, dobrze wiedzieć, że blokada w przeglądarce to nie błąd urządzenia. Trzecia część ma pokazać dashboard w Blazorze.

**Link:** [Turning a $5 Microcontroller Into a Network Monitoring API](https://hackernoon.com/turning-a-$5-microcontroller-into-a-network-monitoring-api)

## Od zgłoszenia błędu do produkcji: jak QA naprawia błędy z Claude

**TLDR:** Inżynier QA z inDrive opisuje trzy poziomy pracy z agentem, od zgłoszenia z gotową analizą, przez priorytetyzację na danych z logów, po samodzielne wdrożenie poprawki. Wysyła średnio trzy do pięciu drobnych poprawek tygodniowo.

**Summary:** Poziom pierwszy to zgłoszenie, od którego deweloper może zacząć naprawę. Agent śledzi przepływ danych i proponuje przyczynę, a autor sprawdza każdy wniosek w repozytorium. Zgłoszenie ma sześć części, od problemu i warunków, przez proponowaną poprawkę i kryteria akceptacji, po ryzyka i odnośniki do plików. Przykład to usługa zamówień, w której trzy opcje przejazdu czytały to samo pole, więc kierowca mógł nie zobaczyć prośby o auto dla wózka.

Poziom drugi to dane produkcyjne. Autor znalazł około 1,86 miliona błędów 500 w tygodniu na 13 klastrach, z czego około 96,6 procent wynikało z tego, że klient anulował żądanie, a usługa zamieniała to na błąd serwera. Mediana trwania nieudanego wywołania to 7,5 milisekundy, więc wolne odpowiedzi nie były przyczyną. Autor oddziela obserwację z logów, hipotezę o przyczynie i oczekiwany efekt poprawki, i słusznie mówi, że to nie jest wdrożony wynik.

Poziom trzeci to własna poprawka. Klucz idempotentności był rezerwowany przed walidacją, więc nieudane żądanie blokowało ponowną próbę. Po zmianie kolejności błędy duplikatów spadły o około 30 procent, bez zmian w czasach odpowiedzi. Autor nie deleguje czterech decyzji: co jest potwierdzone, jak szeroka ma być zmiana, jakie testy są potrzebne i czy poprawka jest gotowa.

Brakuje tu liczby poprawek, które się nie udały, i kosztu czasu recenzentów, którzy każdą taką zmianę sprawdzają.

**Key takeaways:**
- W zgłoszeniu rozdzielaj to, co odtworzone, od tego, co znalezione przez czytanie kodu.
- Sprawdzaj okres, klastry, definicję błędu i mianownik, zanim wpiszesz procent.
- Zgłoszenie z potwierdzoną analizą daje deweloperowi punkt startu.

**Why do I care:** Dla lidera zespołu to wzorzec, jak rozszerzyć rolę QA bez oddawania odpowiedzialności agentowi. Dla każdego dewelopera to lista pytań do zadania agentowi przy analizie logów. Przykład błędów 500 z anulowanych żądań to coś, co pewnie ma też twój monitoring.

**Link:** [From Bug Report to Production: How I Fix Bugs with AI](https://hackernoon.com/from-bug-report-to-production-how-i-fix-bugs-with-ai)

## Osiem platform agentów, dziesięć zadań i ile naprawdę kosztuje zespół agentów

**TLDR:** Bardzo długi przewodnik porównuje osiem platform do orkiestracji agentów, od Claude Code po DeepSeek, i przekonuje, że lokalne modele na 64 GB pamięci zerują koszt wnioskowania. Dla czytelnika wersja skrócona opiera się na pierwszych rozdziałach.

**Summary:** Autor zaczyna od liczby, że ogłoszenia dla orkiestratorów AI wzrosły o 1294 procent między lutym 2025 a lutym 2026. Argumentuje, że to nie wymaga głębokiej wiedzy, bo najważniejsze są Git, podstawy Basha i znajomość dziedziny zadania. Jeden agent zużywa około czterokrotnie więcej tokenów niż zwykła rozmowa, a system wieloagentowy około piętnastokrotnie więcej, według własnych pomiarów Anthropic, a samo zużycie tokenów tłumaczyło około 80 procent różnicy w wynikach ich oceny przeglądania.

Orkiestracja to jeden agent prowadzący, kilku pracujących równolegle w osobnych oknach kontekstu i jeden weryfikator, agent albo człowiek. Spis treści obejmuje przykłady dla Claude Code, Codex, Groka, Gemini, Copilota, OpenCode, Pi i DeepSeek, kiedy używać wielu agentów, kiedy nie, oraz listę modeli lokalnych na 64 GB. Przeczytałem początek tekstu, a nie całość, która ma ponad 80 tysięcy znaków.

Teza o zerowym koszcie jest wygodna, ale autor sam przyznaje, że jakość lokalnych modeli, jak Gemma 4 czy Qwen 3.8, nie będzie optymalna. Sprzęt z 64 GB pamięci też nie jest darmowy, a rachunek za prąd i czas się nie liczy.

**Key takeaways:**
- System wieloagentowy zużywa około piętnaście razy więcej tokenów niż rozmowa.
- Orkiestracja to prowadzący, równolegli pracownicy i weryfikator.
- Modele lokalne obniżają koszt, ale kosztem jakości.

**Why do I care:** Zanim kupisz drugą subskrypcję, ustal budżet i wartość każdego agenta. Wniosek o piętnastokrotnym zużyciu tokenów warto pokazać każdemu, kto chce puścić dziesięciu agentów na jedno zadanie. Reszty przewodnika użyj jako katalogu, a nie jako dowodu.

**Link:** [I Compared 8 AI Agent Platforms. Here's What Running a Team Actually Costs](https://hackernoon.com/i-compared-8-ai-agent-platforms-heres-what-running-a-team-actually-costs)

## Dlaczego myliłem się co do hamulców laboratoriów AI

**TLDR:** Autor wycofuje własną tezę o murze danych. Twierdzi teraz, że zamknięte laboratoria wzywają do ostrożności, aby przepisami zdusić otwarte modele i obronić marże API.

**Summary:** Pierwotnie autor pisał, że laboratoria zwalniają, bo zabrakło czystych danych. Teraz uważa, że miał rację w fizyce, ale pomylił się w strategii. Punktem wyjścia jest wyciek z Google z 2023 roku, w którym stwierdzono, że ani Google, ani OpenAI nie mają fosy, bo otwarte modele dają 90 procent możliwości za 1 procent kosztu.

Trzy mechanizmy mają dławić otwarte wagi. Pierwszy to progi mocy obliczeniowej jako granica obowiązków, które zostawiają trening modeli granicznych firmom z wielomiliardowymi bilansami. Drugi to odpowiedzialność deweloperów za użycie modelu przez osoby trzecie, co dla autora otwartych wag jest nieubezpieczalne. Trzeci to obowiązkowy zdalny wyłącznik, którego model uruchomiony offline nie może mieć.

Autor porównuje to do kampanii przeciwko Linuksowi na przełomie wieków i kończy tezą, że chodzi o monopol.

Słaby punkt jest widoczny. Cała teza opiera się na przypisywaniu motywów, a nie na dowodach. Autor nie pokazuje wypowiedzi ani lobbingu konkretnej firmy, a zdanie, że ostrożność nie dotyczy bezpieczeństwa, jest zbyt pewne. Mogą być jednocześnie prawdziwe obawy o bezpieczeństwo i interes biznesowy.

**Key takeaways:**
- Autor porzuca tezę o murze danych na rzecz tezy o ochronie marż.
- Wskazuje progi mocy, odpowiedzialność za użycie i wyłączniki jako narzędzia przeciw otwartym wagom.
- Motywy zostały przypisane, a nie udowodnione.

**Why do I care:** To tekst opiniotwórczy, ale dotyka decyzji architektonicznej. Jeśli budujesz produkt na modelach z API jednego dostawcy, regulacje i ceny mogą się zmienić. Utrzymanie możliwości przejścia na model otwarty to rozsądna polisa niezależnie od tego, czy teza autora jest prawdziwa.

**Link:** [Why I Was Wrong About AI Companies Pumping the Brakes: It Wasn't About Data](https://hackernoon.com/why-i-was-wrong-about-ai-companies-pumping-the-brakes-it-wasnt-about-data)
