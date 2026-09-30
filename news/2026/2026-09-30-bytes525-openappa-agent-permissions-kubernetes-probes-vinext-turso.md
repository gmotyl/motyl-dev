---
title: "Bytes #525: algebra uprawnień dla agentów, sondy Kubernetesa i Vite pod Next.jsem"
excerpt: "Bytes tłumaczy, dlaczego drugi model osądzający ruchy agenta to za mało, i przedstawia OpenAPPA, deterministyczny silnik reguł do childproofingu coding agentów. Do tego wizualny przewodnik po sondach Kubernetesa, jevgrep do szukania kodu po opisie, Vinext od Cloudflare i Turso bez blokady jednego zapisu naraz."
publishedAt: "2026-09-30"
slug: "bytes525-openappa-agent-permissions-kubernetes-probes-vinext-turso"
hashtags: "#uidev #ai #agents #security #architecture #kubernetes #devtools #nextjs #vite #generated #pl"
source_pattern: "ui.dev"
---

## Algebra uprawnień dla agentów, czyli childproofing zamiast drugiego modelu na straży

**TLDR:** Standardowy sposób, w jaki coding agenty decydują, czy dana akcja jest bezpieczna, to oddanie decyzji drugiemu modelowi, który sam też może paść ofiarą prompt injection. OpenAPPA proponuje inne podejście: deterministyczny silnik reguł, który przed każdą akcją pyta wprost, czy te dane mogą trafić do tego miejsca docelowego.

**Summary:** Auto mode Claude Code, auto-review Codexa i podobne mechanizmy w innych agentach mają wspólną wadę: ryzykowne wywołanie narzędzia trafia do drugiego modelu, który ocenia, czy jest bezpieczne, zanim agent je wykona. OpenAI chwali się, że auto-review Codexa łapie 99,3% prompt injection w syntetycznych testach, ale ten wynik nic nie mówi o ryzykach, których benchmark w ogóle nie mierzy. Prawdziwy problem leży gdzie indziej: sędzia widzi tylko pojedyncze wywołanie, nie całą sekwencję zdarzeń. Agent może przeczytać zgłoszenie błędu z prawdziwym mailem klienta w środku, a trzy kroki później wkleić go do publicznego issue na GitHubie, bo każde pojedyncze wywołanie z osobna wyglądało niewinnie.

OpenAPPA, open-source'owy projekt od Archestra, próbuje to naprawić przez coś, co nazywa Agentic Permissions Policy Algebra. Kluczowe jest to, że silnik decyzyjny nie jest modelem, którego można podpromptować, tylko deterministycznym mechanizmem odpowiadającym na jedno pytanie przed każdą akcją: czy te konkretne dane wolno przesłać do tego konkretnego celu. Każda sesja dostaje etykiety bezpieczeństwa określające, kto może widzieć jej dane i jak bardzo można tym danym ufać, przy czym dostęp do prywatnego repozytorium zawęża grono odbiorców, a przeczytanie losowej strony internetowej obniża poziom zaufania. Raz zawężona sesja nigdy się nie rozluźnia z powrotem.

Do tego dochodzą kontrakty narzędzi, czyli deklaratywne reguły sprawdzane przed każdym wywołaniem i aktualizowane po nim, oraz plany naprawcze: gdy wywołanie zostaje zablokowane, agent dostaje czytelną dla maszyny listę dalszych kroków, na przykład zredagowanie danych osobowych albo poproszenie człowieka o zgodę na konkretne, pojedyncze działanie. Archestra twierdzi, że dzięki temu ich agenty kończą około 90% zadań, podczas gdy inne deterministyczne zabezpieczenia potrafią zbić tę liczbę do 37%, bo zamiast dawać agentowi sposób na obejście blokady po prostu go zatrzymują.

**Key takeaways:**
- Standardowe zabezpieczenie agentów (drugi model jako sędzia) samo może paść ofiarą prompt injection, bo widzi tylko pojedyncze wywołania, nie całe sekwencje
- OpenAPPA używa deterministycznego silnika reguł zamiast modelu do decyzji o każdej akcji
- Sesje dostają etykiety zaufania, które tylko się zawężają, nigdy nie rozluźniają z powrotem
- Zablokowana akcja zwraca agentowi konkretny plan naprawczy zamiast po prostu przerywać zadanie

**Why do I care:** Zespoły wdrażające agenty produkcyjnie prędzej czy później trafią na dokładnie ten scenariusz, gdzie dane z jednego kontekstu wyciekają do drugiego przez trzy pozornie niewinne kroki. Warto już teraz sprawdzić, czy stos, na którym budujemy agentów, ma cokolwiek poza "zapytaj model, czy to bezpieczne", bo to zabezpieczenie, które psuje się dokładnie wtedy, gdy najbardziej go potrzeba.

**Link:** [The Main Thing: Threatening my AI with some Permissions Policy Algebra](https://bytes.dev/archives/525)

## Kubernetesowa kolonoskopia, jevgrep i Vite pod maską Next.jsa

**TLDR:** Sekcja z ciekawostkami tego wydania: wizualny przewodnik po działaniu sond Kubernetesa, jevgrep do szukania kodu po opisie w naturalnym języku, XState ze wsparciem Effect.ts, wersja 1.0 vinextu od Cloudflare, nowy szybki menedżer pakietów upm i Turso 0.8.0 bez blokady jednego zapisu naraz.

**Summary:** Sam Rose napisał wizualny przewodnik tłumaczący, jak działają sondy Kubernetesa, czyli mechanizmy sprawdzające, czy kontener żyje i jest gotowy przyjmować ruch. To temat, który większość developerów konfiguruje raz, kopiując wartości z dokumentacji, więc przewodnik pokazujący co faktycznie dzieje się pod spodem, z jaką częstotliwością i po jakim czasie kontener trafia do rotacji albo zostaje zrestartowany, jest wart zapamiętania na następny raz, gdy coś się posypie na produkcji o trzeciej w nocy.

David Zhang stworzył jevgrep, CLI dla coding agentów, które pozwala szukać kodu, opisując słowami to, co robi, zamiast wpisywać dokładny wzorzec tekstowy. To kolejne narzędzie z rosnącej rodziny projektów opartych na Jev, modelu do szybkiej klasyfikacji i strukturyzowanych odpowiedzi, który w ostatnich tygodniach pojawiał się już jako silnik pod różnymi benchmarkami i integracjami. Osobno XState dodało wsparcie dla Effect.ts, pozwalając łączyć maszyny stanów sterowane zdarzeniami z serwisami Effect, włącznie z obsługą anulowania i testowania w jednym miejscu.

Cloudflare wypuściło wersję 1.0 vinextu, projektu pozwalającego uruchamiać aplikacje Next.js na Vite zamiast na domyślnym Webpacku czy Turbopacku. To kolejny krok w trwającej od dłuższego czasu rywalizacji między ekosystemem Vite a zespołem Next.jsa o to, kto kontroluje warstwę budowania. Obok tego Pooya Parsa wypuścił upm, szybki i mały menedżer pakietów dla rejestru npm, a zespół VoidZero, wciąż aktywny po przejęciu, wydał Vite+ 1.0, łączące Vite, Vitest, Oxlint, Oxfmt, Rolldown, tsdown i Vite Task w jeden pakiet. Turso 0.8.0 ominęło z kolei klasyczne ograniczenie SQLite do jednego zapisu naraz, dodając wsparcie dla współbieżnych zapisów.

**Key takeaways:**
- jevgrep pozwala szukać kodu opisem w naturalnym języku zamiast dokładnym wzorcem tekstowym
- vinext 1.0 od Cloudflare uruchamia aplikacje Next.js na silniku budowania Vite
- Vite+ 1.0 łączy Vite, Vitest, Oxlint, Oxfmt, Rolldown, tsdown i Vite Task w jeden pakiet
- Turso 0.8.0 dodaje współbieżne zapisy, omijając klasyczne ograniczenie SQLite do jednego zapisu naraz

**Why do I care:** Warto śledzić tempo, w jakim narzędzia budowane wokół Vite (vinext, Vite+) zjadają terytorium, które jeszcze rok temu było zarezerwowane dla oficjalnego tooling'u Next.jsa czy Webpacka. Dla zespołów frontendowych to sygnał, żeby traktować wybór build toola jako decyzję do rewizji co kilka kwartałów, nie jednorazowy wybór na start projektu.

**Link:** [Bytes #525 - Childproofing the ungovernable](https://bytes.dev/archives/525)
