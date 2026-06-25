---
title: "Twój produkt zostawia użytkowników w ciemności podczas oczekiwania"
excerpt: "Statusy takie jak 'W trakcie importu' czy 'W trakcie weryfikacji' mogą być technicznie poprawne, ale zupełnie bezużyteczne dla użytkownika, który nie wie, co może teraz bezpiecznie zrobić."
publishedAt: "2026-06-24"
slug: "twoj-produkt-zostawia-uzytkownikow-w-ciemnosci"
hashtags: "#unicornclub #ux #productdesign #ui #generated #pl"
source_pattern: "Unicorn Club"
---

## Twój produkt zostawia użytkowników w ciemności podczas oczekiwania

**TLDR:** Statusy oczekiwania takie jak "Importing customers.csv" czy "Under review" są technicznie prawdziwe, ale praktycznie bezużyteczne. Użytkownik nie potrzebuje znać stanu backendu, potrzebuje wiedzieć, co może teraz zrobić. Ten artykuł rozkłada ten problem na czynniki pierwsze.

Każdy produkt ma gdzieś zakurzone statusy, które wyglądają jak poprawna informacja, a tak naprawdę są ścianą milczenia. Ktoś importuje CSV, czeka na weryfikację konta albo sprawdza zgłoszenie do supportu. Produkt wyświetla: "Importing customers.csv", "Under review", "Estimated ready 14:32", "This has been escalated". Wszystko to jest technicznie prawdą. I właśnie dlatego te statusy przeżywają tyle lat, nikt ich nie rusza, bo wyglądają niewinnie.

Problem polega na tym, że użytkownik nie przyszedł podziwiać stan wewnętrzny systemu. On chce wiedzieć, co może teraz bezpiecznie zrobić. Czy może zamknąć kartę? Czy ma czekać, czy pójść do supportu? Czy to działa, stoi, czy coś się popsuło? Produkt nazywa stan, w którym się znajduje, ale nie tłumaczy, co ten stan oznacza dla człowieka, który w nim utknął.

Adam Marsden, autor newslettera Unicorn Club, identyfikuje cztery wzorce, które sprawiają, że stany oczekiwania są bezużyteczne. Pierwszy to "nieświeży" status, który mówi "Importing", ale nie podaje żadnego etapu ani bezpiecznego kolejnego kroku. Drugi to status "bez właściciela", jak "Under review", gdzie nie wiadomo, kto to w ogóle trzyma. Trzeci to "fałszywa precyzja" w stylu dokładnego czasu zakończenia przy zadaniu, które jest zmienne i kolejkowe. Czwarty to brak "fallbacku", czyli brak informacji o tym, co zrobić, jeśli nic się nie zmieni.

To co mnie w tym ujęciu przekonuje, to uznanie stanu oczekiwania za część workflow, nie za ozdobnik interfejsu. Kiedy ktoś rozpoczyna import pliku, zadaje sobie nie tylko pytanie "czy to przetwarza?", ale też "czy mogę zamknąć kartę?", "czy mogę teraz zająć się czymś innym?". To jest pytanie o przepływ pracy, zanim jeszcze stanie się pytaniem o copywriting. Pod tym kątem "Under review" może oznaczać pięć zupełnie różnych rzeczy: czekanie na automatyczną kontrolę, siedzenie u team ryzyka, zablokowanie przez brakujące dane, oczekiwanie w kolejce ręcznego przeglądu, albo już podjętą decyzję, której nikt nie wpisał do UI. To są fundamentalnie różne stany, o których użytkownik powinien wiedzieć.

Marsden proponuje sześć pytań, które powinny odpowiadać użyteczne statusy oczekiwania. Jakie jest bieżące działanie? Kiedy to było ostatnio sprawdzone? Skąd pochodzi ta informacja? Czy to jest dokładne, szacunkowe, czy wciąż ustalane? Co użytkownik powinien teraz zrobić? Co się stanie, jeśli to się nie zmieni? Kluczowa obserwacja jest taka, że w większości przypadków jeden brakujący element wyrządza całą szkodę, nie trzeba odpowiadać na wszystkie sześć w każdym statusie.

**Key takeaways:**
- Status oczekiwania jest częścią workflow, nie tylko stanem backendu, dlatego musi odpowiadać na pytanie "co mogę teraz bezpiecznie zrobić?"
- Cztery patologiczne wzorce to: nieświeżość, brak właściciela, fałszywa precyzja i brak fallbacku
- Sześć pytań (stan, świeżość, źródło, pewność, następny krok, fallback) pomaga znaleźć jeden brakujący element, który psuje doświadczenie
- Uczciwe przyznanie się do niepewności jest lepsze niż udawanie precyzji, której produkt nie ma

**Why do I care:** Jako frontend developer widze ten problem codziennie i zazwyczaj jest on zbywany jako "problem UX writerów" albo "backlog PM-a". A tymczasem to najczęściej my, programiści, piszemy te stany jako stringi w Redux czy Zustandzie, renderujemy je bezpośrednio w komponentach i nie zadajemy sobie pytania, co użytkownik ma z tym zrobić. Podejście Marsdena jest konkretne operacyjnie, sześć pytań to coś, co można podczepić do code review albo checklist designu zanim feature trafi na produkcję.

**Link:** [Your product is making people wait in the dark](https://unicornclub.dev/issues/2026-06-23-your-product-is-making-people-wait-in-the-dark/)
