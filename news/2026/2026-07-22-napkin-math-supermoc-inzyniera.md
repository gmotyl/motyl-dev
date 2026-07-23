---
title: "Napkin math jako supermoc inżyniera oprogramowania"
excerpt: "Jak Simon Eskildsen, współzałożyciel turbopuffer, używa prostych obliczeń do odkrywania ukrytych możliwości systemów i budowania produktów, które biją rynek cenowo o rząd wielkości."
publishedAt: "2026-07-22"
slug: "napkin-math-supermoc-inzyniera"
hashtags: "#pragmaticengineer #napkinmath #turbopuffer #startup #systemdesign #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Napkin math jako supermoc inżyniera oprogramowania

**TLDR:** Simon Eskildsen, współzałożyciel turbopuffer i wieloletni inżynier Shopify, opowiada o tym, jak "napkin math" — czyli szybkie obliczenia z pierwszych zasad — pozwala kwestionować drogie, nieefektywne systemy i budować tańsze alternatywy. Właśnie to podejście doprowadziło do powstania turbopuffer, który obniżył rachunki za wyszukiwanie Cursora z 80 tysięcy dolarów miesięcznie do czterech tysięcy.

Simon Eskildsen zaczął programować jako nastolatek w Danii, budując strony HTML w Microsoft FrontPage. Zanim trafił do Shopify, wziął udział w International Olympiad for Informatics, gdzie nauczył się czegoś znacznie cenniejszego niż konkretne algorytmy: jak nie wpadać w pułapkę własnego rozwiązania. Zamiast upierać się przy pierwszym pomyśle, lepiej wyrzucić kod, wziąć nową kartkę i zacząć od nowa. Ta lekcja — wcześnie identyfikuj ślepe zaułki — wraca do niego wielokrotnie w późniejszej karierze.

W Shopify Simon trafił na infrastrukturę w momencie, gdy firma rosła ponad 120 procent rocznie pod względem obciążenia. Przesiadka z jednej grupy maszyn na system shardowany odbywała się tydzień przed Black Friday. Zbudował toxiproxy, proxy do symulowania awarii sieciowych, bo chciał pisać testy sprawdzające, jak system zachowuje się przy częściowych awariach. Narzędzie zostało open-source'owane w 2014 roku i według Simona nadal działa w CI Shopify 12 lat później. To właśnie mi się w tym podoba: prostota, która przeżywa złożone RFC-drivne projekty pisane przez kilka teamów.

Napkin math to w praktyce tabela kilkudziesięciu liczb, którą Simon utrzymuje na GitHubie i na których uczy się jak fiszek. Ile kosztuje gigabajt pamięci RAM? Dwa dolary. Gigabajt S3? Dwa centy. Jaki jest przepustowość DRAM przy transferze danych? Około 100 GB na sekundę. Gdy recenzował cudze projekty w Shopify, te liczby pozwalały mu od razu wychwycić niespójności. Jeśli ktoś twierdził, że benchmark pokazuje 10 sekund na zapytanie, a napkin math sugeruje, że powinno to trwać 10 milisekund, to albo benchmark mierzy coś innego, albo w modelu jest błąd. Prawie zawsze był to błąd w benchmarku: zapytanie rozchodziło się na sto węzłów, a mierzono percentyl 99 bez uwzględnienia tego rozproszenia.

Ciekawy jest też wątek MySQL: Simon odkrył, że baza danych wykonuje pięć razy więcej operacji zapisu niż napkin math sugerował jako teoretyczne maksimum bazujące na fsync. Zamiast zamieść to pod dywan, zaczął drążyć. Okazało się, że MySQL grupuje transakcje i wykonuje inteligentne łączenie operacji fsync. To "first-principle gap" — różnica między tym, co obliczysz z pierwszych zasad, a tym, co system naprawdę robi — jest właśnie miejscem, gdzie kryją się możliwości optymalizacji albo błędy w modelu mentalnym. Simon zapamiętał tę lekcję o grupowaniu zapisów i zastosował ją później przy projektowaniu turbopuffer.

**Key takeaways:**
- Napkin math to nie wróżenie z fusów, ale systematyczne zapamiętywanie kilkudziesięciu kluczowych liczb opisujących hardware, które pozwalają błyskawicznie ocenić, czy system działa blisko swojego teoretycznego limitu.
- Długi staż w jednej firmie ma realną wartość: Simon spędził prawie dekadę w Shopify i twierdzi, że najważniejszą lekcją było pisanie kodu, który dobrze się starzeje — proste rozwiązania tygodniowe często przeżywają ambitne projekty wielozespołowe.
- Turbopuffer zdobył pierwszego klienta (Cursor) nie przez pitching, ale przez pomoc w rozwiązaniu ich bieżącego problemu z Postgresem; zaufanie zbudowane in-person okazało się ważniejsze niż jakikolwiek deck sprzedażowy.

**Why do I care:** Z perspektywy kogoś, kto spędza dużo czasu na przeglądaniu architektury frontendowej, napkin math jest czymś, czego nam brakuje po stronie klienta. Mamy własne "kluczowe liczby" — czas parsowania JavaScript, koszty renderowania, progi dla Core Web Vitals — ale rzadko traktujemy je z taką samą rzetelnością co inżynierowie systemów. Zbyt często decyzje o wyborze bundlera, frameworka czy strategii cachowania opierają się na benchmarkach wyrwanych z kontekstu, nie na policzeniu, ile bajtów ma przejść przez sieć i ile operacji DOM wykona przeglądarka. Metoda Simona uczy, żeby pytać "ile to powinno trwać z pierwszych zasad?" przed zaakceptowaniem jakiegokolwiek benchmarku jako ostatecznej odpowiedzi.

**Link:** [Pushing software engineering limits with "napkin math"](https://newsletter.pragmaticengineer.com/p/pushing-software-engineering-limits?publication_id=458709&post_id=207938613&isFreemail=true&triedRedirect=true)
