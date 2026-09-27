---
title: "Dreamforce 2026: kto właściwie uczy agenta, jak działa firma"
excerpt: "Relacja z Dreamforce pokazuje, że wdrożenie agentów AI w firmie rozbija się nie o technologię, tylko o brak spisanej wiedzy o tym, jak firma naprawdę działa."
publishedAt: "2026-09-26"
slug: "techtiff-dreamforce-2026-agent-knowledge-architects"
hashtags: "#TechTiff #ai #agents #architecture #management #generated #pl"
source_pattern: "TechTiff"
---

## Dreamforce 2026: kto właściwie uczy agenta, jak działa firma

**TLDR:** Rozmowy na Dreamforce krążyły wokół jednego pytania: co zmienia się w pracy, gdy firma zaczyna dawać agentom AI prawdziwe obowiązki. Odpowiedzi Salesforce, PwC i zespołu Slack pokazują, że najtrudniejszą częścią nie jest sam model, tylko nauczenie go kontekstu biznesowego i jasne rozdzielenie, co przygotowuje agent, a co wciąż decyduje człowiek.

**Summary:** Punktem wyjścia jest rozmowa z Michaelem Andrew, Chief Data Officer Salesforce, o tym, czego agent potrzebuje poza samymi danymi. Sprzedawcy w firmie od dawna rozumieją, co znaczy słowo "pipeline" w kontekście ich systemu, bo nauczyli się tego słownictwa i sposobu, w jaki biznes go używa. Agent tej wiedzy nie ma, dopóki ktoś jej wprost nie dostarczy, więc Salesforce tworzy rolę Knowledge Architekta, którego zadaniem jest formalizować firmowe słownictwo i spisywać praktyki operacyjne, które nigdy wcześniej nie istniały w spójnej, pisemnej formie. Jak ujął to Michael, "agent nie pozna twojego biznesu, jeśli go tego nie nauczysz".

Drugi wątek dotyczy granicy odpowiedzialności. Ian Kahn z PwC radzi, żeby zaczynać od wyniku, jaki firma chce osiągnąć, i cofać się przez proces od tego punktu, zamiast od razu przypisywać zadanie agentowi. Przypisanie zadania AI to co innego niż zaprojektowanie procesu wokół niego: jeśli agent przygotowuje informację, ktoś musi zdecydować, co dzieje się z nią dalej, jeśli człowiek ma sprawdzić wynik, proces musi zapewnić, że dostanie właściwy materiał, a jeśli potrzebna jest zgoda, ta decyzja też musi mieć przypisanego właściciela. Kristine Marlborough z Salesforce dodaje, że zanim firma zautomatyzuje proces, musi najpierw spisać, jak ten proces faktycznie działa dzisiaj, łącznie z krokami i praktykami, które pracownicy rozumieją, ale nigdy nie zapisali.

Ryan Gavin, CMO Slacka w Salesforce, opisuje konkretny przykład z własnego zespołu: pracownik odpowiedzialny za wyniki reklam w Europie potrzebował analizy, która wcześniej wymagała wsparcia analityka danych, a takich specjalistów było zbyt mało, żeby obsłużyć wszystkie zgłoszenia na czas. Zamiast czekać, pracownik zbudował sposób na uruchomienie tej analizy przez Slackbota. Zmieniło to miejsce, w którym praca się dzieje, ale nie usunęło specjalisty z procesu: po uruchomieniu analizy pracownik i tak zanosił wynik do analityka danych, żeby sprawdził go pod kątem błędów.

Podobny podział pojawił się przy trudniejszej decyzji, dotyczącej promocji pracownika. Agent zbierał informacje z wielu systemów i przygotowywał materiał dla menedżera, mógł też zakwestionować, czy dany pracownik faktycznie jest gotowy na awans, zanim sprawa trafiła dalej, ale ostateczna decyzja, po dyskusji, zostawała po stronie ludzi. W znacznie bardziej rutynowym przypadku, wystawianiu zaświadczenia o zatrudnieniu przez Slacka, agent musiał najpierw rozpoznać, kto pyta, i zastosować uprawnienia przypisane do tej osoby, zanim cokolwiek zwrócił, co oznacza, że ktoś wciąż musi utrzymywać reguły dostępu stojące za tą z pozoru prostą interakcją.

Odpowiedzialność nie kończy się na uruchomieniu agenta. Zespół danych Michaela obsługuje teraz kolejną grupę użytkowników, samych agentów, z których każdy, na przykład agent obsługi klienta, sprzedaży czy finansów, potrzebuje innego zestawu informacji z tych samych systemów źródłowych. Do tego dochodzi bieżące pilnowanie wydajności agentów i budżetów tokenów, bo firmowe dane, procesy i uprawnienia zmieniają się dalej, a agent potrzebuje aktualnej wiedzy, nie jednorazowego szkolenia sprzed premiery.

**Key takeaways:**
- Agenci potrzebują kontekstu biznesowego, nie tylko danych: zdefiniowanego wyniku, firmowego słownictwa i spisanego procesu.
- AI przesuwa odpowiedzialności w pracy: agent zbiera informacje i potrafi zakwestionować założenia, ale decyzje wciąż podejmują ludzie po dyskusji.
- Firmy muszą świadomie zdecydować, jak praca przepływa między AI a ludźmi: kto ją przygotowuje, kto sprawdza, kto zatwierdza.
- Uruchomienie agenta to dopiero początek: ktoś musi na bieżąco pilnować uprawnień, wydajności i budżetu tokenów.

**Why do I care:** Rola Knowledge Architekta formalizuje coś, co dobre zespoły robiły nieformalnie od lat, czyli zamianę wiedzy plemiennej w dokumentację, tylko teraz z realną presją czasową, bo bez tej dokumentacji agent po prostu nie zadziała poprawnie. Z perspektywy architekta to potwierdza coś, co widać w każdym wdrożeniu agentów, jakie prowadziłem: prawdziwym wąskim gardłem rzadko jest infrastruktura czy wybór modelu, tylko dług dokumentacyjny, czyli wiedza o procesach, która nigdy nie została spisana, bo do tej pory nikt jej od nikogo nie wymagał.

**Link:** [Dreamforce 2026: Skills Teams Need to Work With AI Agents](https://techtiff.substack.com/p/dreamforce-2026-ai-agents-work)
