---
title: "Tolaria Alliance i letnia strategia barbell w AI coding workflow"
excerpt: "Miesięczny przegląd pokazuje, jak stack CodeScene, Codacy, Unblocked i CircleCI finansuje rozwój otwartoźródłowej Tolarii, a produkt rośnie równolegle w dwóch kierunkach: solidnych podstawach edytora i odważnym moonshocie z blokami HTML zasilanymi danymi z notatek."
publishedAt: "2026-08-05"
slug: "tolaria-alliance-barbell-strategy-ai-coding"
hashtags: "#refactoring #ai #agents #devtools #architecture #opensource #generated #pl"
source_pattern: "🌀 Refactoring"
---

## Tolaria Alliance i letnia strategia barbell w AI coding workflow

**TLDR:** Autor opisuje kolejny miesiąc pracy nad Tolarią, otwartoźródłowym edytorem notatek, budowanym z pomocą agentów AI i stałego stacku narzędzi (CodeScene, Codacy, Unblocked, CircleCI), który nazywa Tolaria Alliance. Produktowo miesiąc przebiegł według strategii barbell, czyli równoległej pracy nad podstawami edytora i jednym odważnym moonshotem, blokami HTML odczytującymi dane z notatek w czasie rzeczywistym.

**Summary:** Ten wpis jest kolejną odsłoną cyklicznego dziennika budowy Tolarii, narzędzia typu PKM rozwijanego w dużej mierze rękami agentów AI, ale pod stałym nadzorem człowieka. Ciekawy jest sam model finansowania takiego projektu open source. Cztery firmy, CodeScene, Codacy, Unblocked i CircleCI, tworzą coś nazwane Tolaria Alliance i w zamian za widoczność dostarczają realną infrastrukturę produkcyjną. CodeScene pilnuje zdrowia kodu, Codacy jakości i bezpieczeństwa, Unblocked daje agentom (i autorowi) dostęp do kontekstu rozsianego po ADR-ach, issues na GitHubie i historii commitów, a CircleCI właśnie w tym miesiącu przejęło rolę zdalnego CI zamiast lokalnej walidacji. To nie jest lista sponsorów wrzucona na końcu newslettera, to realny łańcuch narzędzi, bez którego cały workflow agentowy najpewniej by się rozjechał.

Na poziomie produktu autor stosuje coś, co sam nazywa strategią barbell, czyli świadome rozciąganie wysiłku między dwa ekstrema, zamiast rozmywania go po środku. Jeden koniec to Basics, twarda robota nad wydajnością i doświadczeniem codziennego użytkownika, bo to wciąż najważniejszy element całego produktu. W tym miesiącu wylądowały drobne, ale odczuwalne rzeczy: zaznaczanie i nawigacja blokami w stylu Notion, zwijanie nagłówków i elementów list na wzór Bear, otwieranie vaultów w osobnych oknach, więcej narzędzi MCP i bardziej granularna kontrola nad tym, co agentom AI wolno robić w edytorze. Autor sam przyznaje, że część tych funkcji po prostu "pożycza" z innych aplikacji, które mu się podobają, z tym zastrzeżeniem, że przynajmniej oddaje kredyt tam, gdzie się należy.

Drugi koniec sztangi to Moonshoty, czyli pomysły, które mogą się nie przyjąć, ale są warte próby. Tym razem to możliwość tworzenia bloków HTML wewnątrz notatek, które mogą odwoływać się do właściwości (properties) dowolnej innej notatki i renderować je przez prosty system formuł, listy, formatowanie wartości i inne przekształcenia. Sama koncepcja HTML w notatce nie byłaby niczym szczególnym, gdyby nie fakt, że opiera się na już istniejącym mechanizmie, który pozwalał arkuszom kalkulacyjnym w Tolarii czytać właściwości notatek na żywo. Rozszerzenie tego mechanizmu na dowolne bloki HTML zmienia charakter narzędzia, bo otwiera drogę do budowania mini-aplikacji, które czerpią dane bezpośrednio z bazy notatek, bez eksportu, bez synchronizacji, bez pośredniego kroku.

Wpis kończy się zapowiedzią rozdziału o wydajności i o forkowaniu open source, który autor traktuje jako coś na tyle ważnego, że wydzielił go do osobnej, płatnej części newslettera, więc szczegółów na temat tego, jak dokładnie pracował nad performance, czy jak wygląda plan forkowania kodu, ten darmowy fragment nie ujawnia. To dobrze ilustruje, jak dziś wygląda monetyzacja treści technicznych, darmowy recap budzi zainteresowanie procesem, a mięso analityczne trafia za paywall.

**Key takeaways:**
- Tolaria Alliance (CodeScene, Codacy, Unblocked, CircleCI) to konkretny, płatny stack narzędzi finansujący rozwój open source, nie tylko logo sponsorów.
- Unblocked pełni rolę warstwy kontekstu dla agentów, łączącej kod, ADR-y, issues i historię commitów w jedno źródło prawdy.
- Strategia barbell (Basics kontra Moonshoty) to sposób na jednoczesne domykanie długu produktowego i testowanie ryzykownych pomysłów bez rozmywania fokusu zespołu.
- Nowe bloki HTML z odwołaniami do właściwości notatek zamieniają edytor w platformę do budowy mini-aplikacji na własnych danych, w czasie rzeczywistym.
- Granularna kontrola nad uprawnieniami agentów AI w edytorze pokazuje, że nawet produkty konsumenckie muszą teraz projektować UX pod kątem nadzoru nad agentami, nie tylko pod kątem człowieka.

**Why do I care:** Jako ktoś, kto ogarnia architekturę na styku produktu i inżynierii, najbardziej łapię tu dwie rzeczy. Pierwsza, Tolaria Alliance to model, który podpatrzę w innych projektach, bo płacenie za CodeScene czy Codacy z własnej kieszeni w małym projekcie open source rzadko się kalkuluje, a partnerstwo barterowe rozwiązuje to sprytnie i uczciwie dla obu stron. Druga, mechanizm HTML-block-czytający-properties to dokładnie ten typ rozszerzalności, który lubię widzieć w narzędziach dla programistów i power userów, jedna prymitywna, dobrze przemyślana abstrakcja (odczyt właściwości notatki przez formułę) recyklowana do dwóch zupełnie różnych feature'ów (arkusze i HTML). To jest dobra architektura w praktyce, nie dodawanie kolejnej warstwy, tylko wyciśnięcie więcej z tej, która już istnieje. Szkoda tylko, że najbardziej mięsiste tematy, wydajność i forkowanie kodu pod presją społeczności, poszły za paywall, bo to właśnie tam zwykle się dowiaduje, jak dany zespół radzi sobie z prawdziwymi problemami, a nie tylko z ich marketingową wersją.

**Link:** [Summer AI Coding Updates ☀️](https://refactoring.fm/p/summer-ai-coding-updates)
