---
title: "Debata o pętlach na AI Engineer World's Fair i stan inżynierii AI w 2026"
excerpt: "Konferencja AIEWF zakończyła się debatą o autonomicznych pętlach agentów, wynikami badania stanu inżynierii AI i prognozami dotyczącymi fabryk oprogramowania."
publishedAt: "2026-07-03"
slug: "aiewf-debata-o-petlach-stan-inzynierii-ai-2026"
hashtags: "#AINews #ai #aiewf #agenci #softwarefactory #generated #pl"
source_pattern: "AINews"
---

## Debata o pętlach: czy autonomiczne agenty już działają w praktyce?

**TLDR:** Na ostatnim dniu AI Engineer World's Fair odbyła się debata o tzw. "loops" czyli autonomicznych pętlach agentów. Zwolennicy twierdzą, że to już rzeczywistość, sceptycy ostrzegają, że dyscyplina inżynieryjna nie nadąża za hype'em.

**Summary:** Debata była moderowana przez Allie Howe z Keycard i od razu wyostrzyła napięcie, które towarzyszyło całej konferencji: czy autonomiczne fabryki oprogramowania są już gotowe, czy to wciąż wizja przyszłości zamiast działająca rzeczywistość?

Po stronie optymistów stanęli Geoffrey Huntley, twórca Ralph Loop, i Ian Livingstone, CEO Keycard. Huntley bez owijania w bawełnę powiedział, że pętle już są i nie ma odwrotu. Nie widzi siebie piszącego kod ręcznie. Livingstone dodał, że pętle to nie nowość w programowaniu, bo iteracja "próbuję, uczę się, stosuję" zawsze była sednem pracy inżyniera. Chodzi tylko o to, żeby ten cykl przyspieszyć.

Sceptyczną stronę reprezentowali Dex Horthy z HumanLayer i Greg Pstrucha z Subroutine. Horthy zaznaczył, że nie jest przeciw pętlom jako takim, ale wskazał na kluczową różnicę: Kubernetes działa na deterministycznych pętlach, a obecne pętle agentów deterministyczne nie są. Jego zdaniem hype wyprzedza dyscyplinę. Pstrucha uderzył w ekonomię: nie możesz "zorkiestrować swoich problemów kupując więcej tokenów". Wskazał też na model, który mi się osobiście podoba, bo jest uczciwy, choć niepopularny: "jesteśmy teraz jak inżynierowie lokomotyw, naszą pracą jest utrzymanie lokomotywy na torach."

Huntley ironicznie użył tego samego obrazu jako argumentu za pętlami. A pod koniec debaty, przy próbie policzenia głosów publiczności, okazało się, że reflektory na scenie były za jasne i nikt z uczestników nie widział podniesionych rąk. Gdyby agent był odpowiedzialny za ściemnienie świateł...

**Key takeaways:**
- Zwolennicy pętli: technologia jest tu i teraz, niepowrót do ręcznego kodowania
- Sceptycy: problem nie leży w samych pętlach, ale w braku deterministyczności i dyscypliny kontroli
- Ekonomia agentów jest wciąż kwestionowana, tokeny to nie remedium na każdy problem
- Obraz inżyniera-maszynisty utrzymującego lokomotywę na torach jako trafna metafora obecnego stanu

**Why do I care:** Ta debata to świetne odzwierciedlenie tego, co sam obserwuję u klientów. Mam wrażenie, że część firm wpada w pułapkę "wrzucimy agenta i wszystko się samo zrobi", podczas gdy rola inżyniera nie znika, tylko się przesuwa. Horthy ma rację, że potrzebujemy zejść na niższy poziom abstrakcji zanim pójdziemy wyżej. Zanim poczuję się bezpiecznie z autonomicznym agentem piszącym kod produkcyjny, chcę mieć deterministyczny control plane i jasny model odpowiedzialności. Bez tego to po prostu drogi autocompletecorpo.

**Link:** [AIEWF Daily Dispatch: The great loops debate and the state of AI engineering](https://www.latent.space/p/aiewf-daily-dispatch-locomotives)

---

## Claude Tag: model Anthropic przeznaczony do delegowania zadań

**TLDR:** Mike Krieger, Head of Labs w Anthropic i współzałożyciel Instagrama, opowiedział o Claude Tag, nowym wewnętrznym modelu Anthropic zorientowanym na asynchroniczne i proaktywne delegowanie zadań. To wczesna wersja tego, jak może wyglądać "fabryka oprogramowania" w praktyce.

**Summary:** Krieger opisał zmianę sposobu pracy swojego zespołu po wdrożeniu Claude Tag. Model jest bardziej delegacyjny niż standardowy Claude, asynchroniczny i z założenia proaktywny. Zamiast "napraw ten bug", instrukcja brzmi: "jesteś teraz odpowiedzialny za tę część codebase'u, monitoruj ten kanał feedbacku i proaktywnie bierz zadania."

To interesujące, bo Tag nie zastępuje zespołu. To raczej wieloosobowy, asynchroniczny system, gdzie każda osoba oddelegowuje odpowiedzialność do modelu. Krieger przyznał też, że zmiana ta ma swoje koszty: zespół stał się "wąskim gardłem na code review" i na "ludzką zdolność do pełnego zrozumienia tego, co się robi." Autentycznie ważne ostrzeżenie, bo to nie jest zdanie PR-owe.

**Key takeaways:**
- Claude Tag to model Anthropic wyspecjalizowany w delegowaniu i proaktywnym działaniu na kanałach
- Fabryka oprogramowania to nie zastępowanie ludzi, to wieloosobowe delegowanie do systemu
- Wąskie gardło przesuwa się z "pisania kodu" na "review i konceptualizację" tego, co zostało wyprodukowane

**Why do I care:** Koncepcja "multiplayer, async, proactive" jest warta śledzenia, bo to inny model interakcji niż to, do czego przywykliśmy z klasycznych asystentów AI. Ale to ostrzeżenie Kriegera jest tym, co zapamiętam najbardziej: kiedy AI zaczyna produkować szybciej, niż jesteś w stanie zrozumieć co produkuje, masz problem z długiem poznawczym, nie technicznym.

---

## Badanie stanu inżynierii AI w 2026: agenty piszą do systemów, koszty ograniczają ambicje

**TLDR:** Barr Yaron z Amplify przedstawiła roczne badanie stanu inżynierii AI. 95% respondentów używa agentów, 89% z nich deklaruje, że agenty modyfikują dane, a 59% obawia się długoterminowych zobowiązań z powodu kodu generowanego przez AI.

**Summary:** Liczby są jednoznaczne: agenty to już mainstream. W ubiegłym roku używała ich połowa respondentów, teraz niemal wszyscy. I co ważniejsze, zmienił się charakter ich pracy. Rok temu czytały i streszczały, teraz piszą do systemów i podejmują działania. To fundamentalna zmiana poziomu ryzyka.

Natomiast kontrola nad agentami pozostaje prymitywna. Ludzkie zatwierdzenia i uprawnienia to główne zabezpieczenia, a poza tym rozrzucona kolekcja technik dekompozycji zadań, retrieval, pamięci i sandboxingu. "Nikt nie ustalił warstwy kontroli dla agentów" podsumowała Yaron. To zdanie mnie niepokoi, bo agenty są w produkcji, a my nie mamy standardów.

Koszty też boli. Czterdzieści procent respondentów mówi, że koszty AI regularnie ograniczają to, jak ambitnie używają technologii. Kolejne 36% mówi, że czasem. Użycie tokenów jest teraz drugim monitorowanym wskaźnikiem produkcyjnym po jakości.

I wreszcie centralna sprzeczność konferencji: AI ułatwia eksperymenty i pozwala produkować więcej oprogramowania, ale 59% boi się, że generowany kod tworzy długoterminowe zobowiązania techniczne.

**Key takeaways:**
- 95% zespołów inżynierskich używa agentów, a 89% z nich pozwala agentom modyfikować dane
- Warstwa kontrolna jest wciąż nierozwiązana i niestandardowa
- Koszty tokenów są realnym ograniczeniem dla 76% respondentów (regularnie lub czasem)
- Ponad połowa badanych obawia się długu technicznego z AI-generated code

**Why do I care:** Te liczby są ważne, bo potwierdzają coś, co intuicyjnie czuję: pęd na agenty wyprzedza zdolność ich kontrolowania. 59% obaw o długoterminowe zobowiązania to nie panika, to realistyczna ocena sytuacji. Kod generowany przez AI jest trudny do audytu, trudny do testowania i łatwo tworzy ukryte założenia. To nie powód, żeby nie używać AI, ale żeby robić to z głową i mieć strategię dla tego długu.

**Link:** [AIEWF Daily Dispatch: The great loops debate and the state of AI engineering](https://www.latent.space/p/aiewf-daily-dispatch-locomotives)

---

## Keynoty zamykające: "co kiedyś było startupem, teraz jest projektem pobocznym"

**TLDR:** Theo Browne i Garry Tan zamknęli konferencję optymistycznymi wizjami: skala możliwości indywidualnego dewelopera rośnie, a firmy które wygrają to te traktujące AI jako siłę roboczą, nie autocompletecorpo.

**Summary:** Theo Browne zaprezentował kilka projektów, które buduje z AI, i postawił tezę, którą trudno odrzucić: skala tego, czego indywidualny deweloper może się realistycznie podjąć, zmieniła się diametralnie. "Co kiedyś było startupem, teraz jest projektem pobocznym." Projekty, które wcześniej odrzucał jako "za duże", zaczynają być w zasięgu.

Garry Tan z Y Combinator dodał perspektywę organizacyjną. Najszybciej rosnący założyciele YC nie traktują AI jak autocomplete, traktują to jak siłę roboczą. Jego recepta była prosta: "Buduj AI-native company, nie firmę, która po prostu używa AI."

**Key takeaways:**
- Skala projektów dostępnych dla indywidualnego dewelopera rośnie szybciej niż kiedykolwiek
- Firmy traktujące AI jako siłę roboczą rosną szybciej niż te traktujące je jak narzędzie
- AI-native to nie kwestia technologii, to kwestia mentalności i procesów organizacyjnych

**Why do I care:** Browne ma rację i sam to czuję przy własnych projektach. Jestem w stanie zrealizować rzeczy, które rok temu wymagałyby zespołu. Ale Tan's "AI as workforce" jest delikatnie niepokojące, bo workforce to coś, czym zarządzasz, nie coś, czemu ślepo ufasz. Pytanie o governance pozostaje bez odpowiedzi na tej konferencji, podobnie jak na innych.

**Link:** [AIEWF Daily Dispatch: The great loops debate and the state of AI engineering](https://www.latent.space/p/aiewf-daily-dispatch-locomotives)
