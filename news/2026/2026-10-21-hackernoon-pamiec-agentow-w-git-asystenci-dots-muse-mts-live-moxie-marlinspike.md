---
title: "HackerNoon: pamięć agentów w Git, asystenci wykonujący zadania, MTS Live, open-source w produkcji, Moxie Marlinspike i Tails"
excerpt: "Sześć tekstów: wspólna pamięć agentów w Git, cztery asystenci AI działający za ciebie, dwa znaczenia MTS, drogi do produkcji dla modeli otwartych, historia twórcy Signala i konfiguracja Tails."
publishedAt: "2026-10-21"
slug: "hackernoon-pamiec-agentow-w-git-asystenci-dots-muse-mts-live-moxie-marlinspike"
hashtags: "#hackernoon #ai #agents #security #llm #open-source #git #generated #pl"
source_pattern: "HackerNoon"
---

## Wspólna pamięć agentów oparta na Git, wyszukiwaniu hybrydowym i czasie

**TLDR:** Autor zbudował KYB, bazę wiedzy w plikach Markdown z historią w Git, z której korzystają trzy agenty. Opisuje cztery awarie, w tym wyszukiwanie "na dzień", które zwracało już zastąpiony tekst.

**Summary:** Wpis to dziennik od lipca do października 2026. Wpisy są plikami Markdown, zmiany trzyma Git, a indeks wyszukiwania można odbudować z danych. Pierwszy problem: zapytanie po rosyjsku nie znajdowało angielskich wpisów. Rozwiązaniem było wyszukiwanie hybrydowe, czyli model multilingual-e5-small uruchamiany lokalnie na ONNX Runtime połączony z wyszukiwaniem słów kluczowych na Tantivy. Autor uczciwie zaznacza, że dwa pomiary, 9 z 14 w lipcu i 3 z 14 we wrześniu, pochodzą z różnych baz i nie są porównaniem przed i po.

Drugi problem to plik instrukcji pomijany przez Antigravity z powodu błędu YAML: dwukropek ze spacją w nieotoczonym opisie. Poprawka to blok tekstowy i walidacja przy instalacji. Trzeci to poprawka dopisana pod błędną tabelą, więc czytelnik, który zatrzymał się na pierwszej sekcji, nadal dostawał błędną radę. Reguła: zastąp błędny tekst i wyszukaj wycofane sformułowanie. Czwarty to błąd kolejności w wyszukiwaniu "as of": najpierw filtrowano wersje po słowie, potem wybierano najnowszą, więc stara wersja wracała jako jedyna pasująca. Poprawka w PR 17 odwraca kolejność. Autor zaznacza, że to wykryto na wpisie testowym i nie dowodzi to, że agent zmienił działający system na podstawie nieaktualnej odpowiedzi.

**Key takeaways:**
- Wyszukiwanie "na dzień" musi najpierw wybrać wersję, potem szukać.
- Poprawka dopisana poniżej błędu nie wystarcza, trzeba usunąć błędny tekst.
- Wynik wyszukiwania ma sens tylko z opisem bazy i warunków.

**Why do I care:** Każdy, kto trzyma notatki dla agentów w repo, ma te same pułapki: duplikaty fragmentów i nieaktualne wersje. Dobry pomysł to prosta kontrola po każdej korekcie: usunięte, nie ma kopii, wyszukiwanie zwraca bieżącą wersję.

**Link:** [Building Reliable Shared Memory for AI Agents With Git, Hybrid Search, and Temporal Retrieval](https://hackernoon.com/building-reliable-shared-memory-for-ai-agents-with-git-hybrid-search-and-temporal-retrieval)

## Cztery asystenci AI, którzy robią pracę za ciebie

**TLDR:** Muse od Meta, Instinct, Wajo i Dots od OpenAI wykonują zadania zamiast tylko doradzać. Różnią się dostępnością, kontrolą zatwierdzeń i tym, czy potrafią zadzwonić.

**Summary:** Muse działa na modelu Muse Spark i ma izolowaną maszynę wirtualną na użytkownika oraz system Sentinel sprawdzający ruch wychodzący. Płatności idą przez Stripe Link z kartą jednorazową. Instinct przyjmuje zlecenia przez iMessage lub WhatsApp, pracuje na własnym komputerze w chmurze i według doniesień zebrał miliard dolarów przy wycenie 10 miliardów. Wajo, agent Fo, potrafi dzwonić do firm, czego pozostałe nie robią. Dots od OpenAI działają na GPT-6 Astra, łączą się z ponad 4000 aplikacji, mają reguły zatwierdzania, a hasła podają bez ujawniania ich modelowi.

Autor używał Muse, Instinct i Wajo, a o Dots pisze tylko z materiałów premiery sprzed doby. Radzi zaczynać od zadań niskiego ryzyka i poszerzać dostęp wraz z zaufaniem. Instinct krytykowano po starcie za prywatność i retencję danych, po czym dodał narzędzie usuwania.

**Key takeaways:**
- Różnicą w praktyce jest dzwonienie do firm, które ma tylko Wajo.
- Dots mają szczegółowe reguły zatwierdzania, ale wymagają Pro lub Business Premium.
- Dostęp do poczty i kont wymaga stopniowego zaufania.

**Why do I care:** To raczej historia produktowa niż techniczna, ale pokazuje wzorzec projektowy dla naszych agentów: izolacja, jednorazowe dane płatnicze i zatwierdzanie decyzji. Tekst jest też recenzją jednej osoby, bez porównywalnych testów.

**Link:** [Muse, Instinct, Wajo, and OpenAI's Dots: Four AI Assistants That Do the Work for You](https://hackernoon.com/muse-instinct-wajo-and-openais-dots-four-ai-assistants-that-do-the-work-for-you)

## Dwa znaczenia MTS: Member of Technical Staff i Monitoring the Situation

**TLDR:** Autor porównuje modny tytuł z laboratoriów AI z siecią informacyjną MTS Live, finansowaną przez a16z, i uznaje oba za "pokorę jako markę".

**Summary:** Tytuł Member of Technical Staff nosi coraz więcej byłych dyrektorów i założycieli, na przykład Mike Krieger, Tom Blomfield i Andrej Karpathy, który według tekstu dołączył do zespołu pretrainingu Anthropic. Autor zestawia to z wynagrodzeniami z wniosków H-1B, od 300 do 405 tysięcy dolarów podstawy w Anthropic, i z danymi LinkedIn, według których 39 procent pracowników Anthropic podaje ten tytuł. Cytuje też opinię, że tytuł jest nieprzejrzysty celowo.

Druga część dotyczy MTS Live, całodobowej transmisji w X uruchomionej 20 kwietnia 2026 z inwestycją a16z. Autor umieszcza ją w historii bogatych właścicieli mediów, od Gutenberga po zakup TBPN przez OpenAI, i twierdzi, że bańka dotyczy narracji, nie mediów. Dodaje dane o wyszukiwaniach: w Google Trends tytuł wyszukiwany jest około dziesięć razy częściej niż fraza o monitorowaniu sytuacji. Tytuł jest też starszy, bo drukowany od 1871 roku. To publicystyka z dużą liczbą źródeł, ale zakończenie jest wyraźnie tezą autora, a liczba oglądalności w dniu premiery pochodzi z jednej syndykacji.

**Key takeaways:**
- Tytuł MTS koncentruje się w Anthropic, OpenAI i Thinking Machines.
- Media finansowane przez VC ujawniają dziś swoje cele zamiast je ukrywać.
- Dane wyszukiwań pokazują, że ludzie szukają pracy, nie transmisji.

**Why do I care:** Dla programisty to bardziej ciekawostka rynku pracy niż temat techniczny. Jeśli rozważasz zmianę, pamiętaj, że tytuł mówi niewiele o zakresie obowiązków.

**Link:** [Is MTS Member of the Technical Staff or Now Monitoring the Situation?](https://hackernoon.com/is-mts-member-of-the-technical-staff-or-now-monitoring-the-situation)

## Najszybsza droga do produkcji dla otwartych modeli AI

**TLDR:** Wybór zależy od tego, ile infrastruktury chcesz posiadać: od zmiany jednego adresu bazowego po klaster Kubernetes.

**Summary:** Autor rozdziela pięć opcji: API frontierowe, zmiana bazowego adresu w kliencie zgodnym z OpenAI, uruchomienie lokalne, jeden kontener Docker na jednym GPU oraz Kubernetes z Terraform. Dla niskiego lub zmiennego ruchu poniżej około 5 milionów żądań miesięcznie albo rachunku poniżej 2 do 3 tysięcy dolarów miesięcznie zaleca pozostać przy API. Przy modelu 32B na jednym GPU z wykorzystaniem 50 procent próg opłacalności wypada około 10 milionów żądań miesięcznie.

Ważne ostrzeżenie dla embeddingów: zmiana modelu oznacza ponowne zanurzenie całego korpusu, bo przestrzenie wektorowe są niezgodne. Tekst promuje silnik SIE firmy Superlinked, więc to materiał z interesem, ale wskazówki o progach i kolejności kroków są ogólne.

**Key takeaways:**
- Poniżej około 2 do 3 tysięcy dolarów miesięcznie zostań przy API.
- Zmiana adresu bazowego wystarcza, gdy serwer jest zgodny z OpenAI.
- Zmiana modelu embeddingów wymaga ponownego liczenia wszystkich wektorów.

**Why do I care:** Trzymaj nazwę modelu w konfiguracji, nie w kodzie, i zaplanuj okno na ponowne embedowanie. Autor nie liczy kosztu dyżurów i utrzymania GPU, który zwykle przeważa nad ceną sprzętu.

**Link:** [The Fastest Path to Production for Open-Source AI Models](https://hackernoon.com/the-fastest-path-to-production-for-open-source-ai-models)

## Moxie Marlinspike: anarchista, który zaszyfrował miliardy rozmów

**TLDR:** Biografia twórcy protokołu Signal, od squatów i rozbitej łodzi po Signal, WhatsApp i prywatnego asystenta Confer.

**Summary:** Tekst opisuje drogę od anarchistycznego kolektywu żeglarskiego, przez publikacje łamiące zabezpieczenia SSL, jak sslstrip i atak z bajtem zerowym, po współtworzenie z Trevorem Perrinem protokołu Signal z algorytmem Double Ratchet. WhatsApp przyjął go w 2014, a do kwietnia 2016 ponad miliard osób miał domyślne szyfrowanie end-to-end. Autor omawia też decyzję o scentralizowaniu Signala, odpowiedź na Cellebrite, finansowanie przez Briana Actona i rezygnację z funkcji CEO w styczniu 2022.

Najciekawsze dla inżyniera jest uzasadnienie centralizacji: federacja zamraża protokół, bo każda zmiana wymaga zgody wielu operatorów, i wycieka metadanymi. Tekst jest dość pochlebny, a część kontrowersji, jak MobileCoin, traktuje skrótowo.

**Key takeaways:**
- Szyfrowanie stało się użyteczne dla miliardów, bo działa bez uwagi użytkownika.
- Centralizacja pozwoliła szybciej wprowadzać zmiany, kosztem zaufania do jednego operatora.
- Signal minimalizuje dane, które mógłby wydać na żądanie.

**Why do I care:** To dobry przykład kompromisu architektonicznego: kontrola nad ewolucją protokołu kontra decentralizacja. Przy projektowaniu własnych protokołów warto zapytać, kto musi się zgodzić na każdą zmianę.

**Link:** [Meet Moxie Marlinspike: The Anarchist Sailor Who Built Signal and Encrypted Billions of Chats](https://hackernoon.com/meet-moxie-marlinspike-the-anarchist-sailor-who-built-signal-and-encrypted-billions-of-chats)

## Konfiguracja Tails OS i przeglądarki Tor, część 5

**TLDR:** Piąta część serii opisuje model zagrożeń w pięciu poziomach i instalację Tails z weryfikacją podpisu.

**Summary:** Autor dzieli użytkowników na pięć poziomów ryzyka, od zwykłej prywatności po sygnalistów, z zaleceniami od samego Tora, przez Whonix i Qubes, po Tails na dedykowanym urządzeniu. Tails działa z pamięci RAM, wymusza cały ruch przez Tor, a przy wyłączeniu zeruje pamięć, więc wyjęcie pendrive'a kończy sesję. Opisuje też przypadek, w którym Facebook zlecił exploit na odtwarzacz wideo w Tails, by zdemaskować przestępcę. Reszta to instrukcja: pobranie przeglądarki Tor, weryfikacja podpisu GPG, nagranie obrazu, start, mosty i ręczne aktualizacje przez drugi nośnik.

To tekst edukacyjny o prywatności, ale autor sam zaznacza, że Tails nie chroni przed atakami na firmware ani błędami użytkownika. Nie omawia ryzyka prawnego w różnych krajach.

**Key takeaways:**
- Dobór narzędzia zależy od modelu zagrożeń, nie od mody.
- Tails nie chroni przed skompromitowanym firmware ani błędami operacyjnymi.
- Weryfikacja podpisu pobranego obrazu to krok, którego nie warto pomijać.

**Why do I care:** Dla dewelopera to głównie lekcja modelowania zagrożeń i weryfikacji integralności pobieranych artefaktów, którą można przenieść na łańcuch dostaw.

**Link:** [The Setup - Tails OS, TOR Browser and Threat Model: Down The Rabbit Hole Part 5](https://hackernoon.com/the-setup-tails-os-tor-browser-and-threat-model-down-the-rabbit-hole-part-5)
