---
title: "TechTiff: GPT-6 Astra przejmuje prowadzenie projektu, nie tylko wykonuje polecenia"
excerpt: "GPT-6 Astra łączy dłuższą pracę nad zadaniem z rozszerzonym computer use, kończąc niemal trzy czwarte testowanych zadań w połowie czasu poprzednika, co zmienia sposób, w jaki trzeba pisać mu instrukcje."
publishedAt: "2026-09-07"
slug: "techtiff-gpt6-astra-computer-use-agent-project-management"
hashtags: "#techtiff #ai #agents #openai #generated #pl"
source_pattern: "TechTiff"
---

## GPT-6 Astra: od wykonawcy polecenia do prowadzącego projekt

**TLDR:** GPT-6 Astra dostaje pliki, materiały badawcze i dostęp do narzędzi, a następnie samodzielnie prowadzi zadanie przez dłuższy czas, akceptując po drodze zmiany wymagań. Rozszerzony computer use pozwala mu wypełniać formularze, przeglądać strony i pracować w edytorach dokumentów, kończąc 72,6% testowanych zadań w porównaniu do 65,7% poprzednika, w czasie skróconym z około 75 do 40 minut.

**Summary:** Główna zmiana nie dotyczy pojedynczej odpowiedzi, tylko trwałości pracy nad zadaniem. Zamiast dostawać jedno polecenie i zwracać jeden wynik, Astra ma dostawać pliki, materiały badawcze, dostęp do narzędzi, i pracować przez dłuższy odcinek czasu, podczas gdy użytkownik po drodze zmienia wymagania, dodaje kontekst, koryguje kierunek albo zadaje pytania poboczne. Astra ma trzymać się zadania mimo tych zmian, zamiast zaczynać od zera przy każdej modyfikacji. Computer use, czyli zdolność do faktycznego korzystania z komputera, obejmuje wypełnianie formularzy, aktualizowanie kalendarzy i rekordów CRM, przeszukiwanie stron internetowych, redagowanie treści w edytorach dokumentów i e-mail, oraz instalowanie, testowanie i obsługę oprogramowania.

Liczby z testów są konkretne: Astra ukończyła 72,6% zadań typu computer-use w porównaniu do 65,7% dla poprzednika, GPT-5.6 Sol, a ten sam rodzaj pracy zajmował około czterdziestu minut zamiast siedemdziesięciu pięciu. Na benchmarku Agents' Last Exam, testującym agentów na złożonych zadaniach zawodowych wykonywanych wewnątrz aplikacji, Astra osiągnęła wynik 59,3%, przy czym jej wynik po zaledwie piętnastu minutach pracy już przewyższał najlepszy wynik Sola. Astra i Sol dzielą to samo okno kontekstu, 1,05 miliona tokenów, więc różnica w wynikach nie bierze się z większej pamięci, tylko z tego, jak agent prowadzi dłuższy, wieloetapowy projekt.

Druga część tekstu to instrukcja obsługi, nie tylko opis możliwości. Skoro agent faktycznie klika, wypełnia i wysyła rzeczy w realnych systemach, potrzebuje jasno zdefiniowanej roboty, a nie otwartego polecenia typu "zajmij się moją skrzynką". Autorka proponuje strukturę pierwszej wiadomości przypominającą opis stanowiska: wynik końcowy, materiały do wykorzystania, zakres badania, narzędzia i strony do użycia, wymagania i kryteria oceny, oraz punkt kontrolny, w którym agent ma się zatrzymać i zapytać, zanim pójdzie dalej. Do tego dochodzą twarde ograniczenia: nigdy nie usuwać plików, tylko przenosić je do archiwum; nie wysyłać ani nie publikować niczego bez zgody; nie mieszać danych osobowych spoza folderu projektu do wyniku; zatrzymać się przed kupnem, rezerwacją, usunięciem, zmianą dostępu czy udostępnieniem czegokolwiek na zewnątrz. W projektach folderowych zaleca się trzymanie tych reguł na stałe w pliku AGENTS.md, żeby nie trzeba było ich powtarzać przy każdym nowym zadaniu.

Ostatni element to sposób odbierania wyniku: zamiast po prostu zaakceptować gotową pracę, autorka poleca poprosić agenta o zestawienie każdego wymagania jako spełnionego, częściowego lub zablokowanego, z dowodami i linkami do plików czy rekordów, oraz o wskazanie, czego nie zdążył zweryfikować, bez wprowadzania żadnych zmian podczas tego przeglądu. Dopiero potem warto samemu sprawdzić: daty i strefy czasowe w kalendarzu, sumy w arkuszu względem danych źródłowych, linki badawcze pod kątem tego, czy faktycznie potwierdzają przywołane twierdzenia.

**Key takeaways:**
- GPT-6 Astra ukończyła 72,6% zadań computer-use wobec 65,7% dla GPT-5.6 Sol, w czasie skróconym z ~75 do ~40 minut.
- Oba modele dzielą to samo okno kontekstu 1,05 mln tokenów, więc przewaga Astry bierze się z prowadzenia dłuższego, wieloetapowego zadania, nie z większej pamięci.
- Pierwsza wiadomość do agenta powinna definiować wynik, materiały, zakres badania, narzędzia, wymagania i punkt kontrolny zatrzymania.
- Reguły ograniczające agenta (bez usuwania, bez wysyłki bez zgody, bez zmiany dostępu) warto trzymać na stałe w pliku AGENTS.md zamiast powtarzać w każdym poleceniu.

**Why do I care:** Struktura "opisu stanowiska" dla agenta to praktyczna wersja czegoś, co i tak trzeba robić przy każdej integracji z narzędziem AI mającym realny dostęp do systemów produkcyjnych: jasno zdefiniowane granice działania i punkty kontrolne nie są opcjonalnym dodatkiem, tylko warunkiem, żeby w ogóle bezpiecznie dać agentowi computer use. Rada, żeby żądać od agenta tabeli ze statusem każdego wymagania zamiast ufać samemu podsumowaniu, jest wprost przenaszalna na code review generowanego kodu: agent, który sam ocenia własną pracę bez ustrukturyzowanego formatu odpowiedzi, będzie skłonny zaokrąglać w swoją korzyść, więc wymuszenie konkretnego formatu odpowiedzi (spełnione / częściowe / zablokowane, z dowodami) jest tańsze niż ręczne przeszukiwanie długiego podsumowania w poszukiwaniu tego, co zostało pominięte.

**Link:** [ChatGPT Started Running the Project](https://techtiff.substack.com/p/gpt-6-astra)
