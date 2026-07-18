---
title: "Jak Bun przepisał 535 tysięcy linii Ziga na Rusta w 11 dni z pomocą 64 agentów AI"
excerpt: "Jarred Sumner, twórca Buna, opisał szczegółowo jak przy użyciu Claude'a i narzędzia Fable przepisał cały runtime z Ziga na Rusta w niecałe dwa tygodnie."
publishedAt: "2026-07-17"
slug: "bun-rewrite-zig-rust-ai-agents-11-days"
hashtags: "#pragmaticengineer #bun #rust #ai #agents #engineering #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Jak Bun przepisał 535 tysięcy linii Ziga na Rusta w 11 dni z pomocą 64 agentów AI

**TLDR:** Twórca Buna przepisał 535 496 linii kodu z Ziga na Rusta w 11 dni, używając 64 agentów Claude działających równolegle. Koszt: 165 000 dolarów w tokenach. Bez AI ten projekt trwałby rok pracy trzech inżynierów z pełną wiedzą o kodzie.

**Summary:**

Jarred Sumner opublikował szczegółowy opis migracji Buna z Ziga na Rusta. Powód zmiany był prozaiczny i bardzo ludzki: Jarred był zmęczony. Zmęczony błędami związanymi z zarządzaniem pamięcią, które pojawiały się bez końca. Use-after-free, double-free, wycieki pamięci w ścieżkach błędów. Zig nie jest językiem bezpiecznym pod kątem pamięci i przy tej skali projektu, 22 milionach pobrań miesięcznie i zależnościach takich jak Claude Code czy Vercel, każdy crash był prawdziwym problemem. W Ruście bezpiecznym te błędy to błędy kompilatora. Koniec tematu.

Samo założenie "przepiszmy wszystko od zera w Ruście" brzmiało jak szaleństwo jeszcze rok temu. Pełne przepisywanie zawsze było uważane za antywzorzec, który kosztuje fortunę i kończy się katastrofą. Tutaj jednak stało się coś innego. Trzy godziny intensywnej pracy z Claude zaowocowały dokumentem PORTING.md o ponad 600 liniach: zasady portowania, zakazy używania tokio, rayon, hyper, async-trait oraz std::fs czy std::net, bo Bun ma własną pętlę zdarzeń i syscalle. To był fundament, na którym można było budować.

Proces był zaskakująco systematyczny. Jarred zaczął od trzech plików testowych, przepisał je z Claude, a potem przeprowadził dwie niezależne sesje "adversarial review" z osobnymi instancjami Claude. Następnie podzielił całą pracę na 64 agenty działające równolegle. Szybko okazało się, że agenty wchodzą sobie w paradę, git stash jednego agenta, git stash pop drugiego i git reset HEAD --hard trzeciego potrafią razem zrobić chaos. Rozwiązanie: 4 oddzielne worktree, każde z 16 agentami. Po dwóch dniach równoległej pracy: 535 496 linii przepisanych. Potem 1600 błędów kompilatora do poprawienia w 12 godzin, pięć dni testów lokalnych i CI, i gotowe. 6500 commitów, 11 dni.

Koszt 165 tysięcy dolarów robi wrażenie, ale Mitchell Hashimoto od razu to osadził w realiach: żaden inżynier z taką pensją nie byłby w stanie osiągnąć tych samych wyników w 11 dni. Jarred szacuje, że ręcznie ten projekt wymagałby trzech inżynierów z pełnym kontekstem przez rok. Podczas tego roku Bun nie otrzymywałby poprawek błędów, ulepszeń kompatybilności z Node.js ani nowych funkcji. Nie byłoby takiej decyzji, bo nie ma firmy, która zamroziłaby trójkę kluższych inżynierów na rok dla samego refaktoru.

To nie jest historia o tym, że AI zastępuje inżynierów. To historia o tym, że pewne rzeczy, które wcześniej były nieopłacalne do zrobienia, teraz są opłacalne. Przepisywanie całego runtime'u językowo bezpieczną alternatywą brzmi jak projekt badawczy, nie produkcyjny. Tutaj stało się faktem w 11 dni. Ale trzeba też być uczciwym wobec wymagań: bardzo zmotywowany inżynier z głęboką znajomością kodu, ekstremalnie solidny zestaw testów i gotowość do wydania tej kwoty w tokenach. Bez tego żaden z tych elementów nie zadziała.

**Key takeaways:**
- Przepisanie 535 tys. linii z Ziga na Rusta zajęło 11 dni z 64 agentami AI i kosztowało 165 tys. dolarów w tokenach API
- Przygotowanie to nie jest opcjonalne: 3 godziny tworzenia precyzyjnej dokumentacji PORTING.md z Claude było warunkiem koniecznym powodzenia całości
- Równoległe agenty wymagają izolacji przez osobne worktree, bo współdzielony git to przepis na chaos
- Solidny zestaw testów to absolutna podstawa każdej migracji wspomaganej AI na tym poziomie
- Ekonomia się zmienia: projekty zbyt drogie dla ludzkiego zespołu zaczynają mieścić się w budżecie

**Why do I care:** Z perspektywy architekta i kogoś, kto śledzi jak narzędzia AI wchodzą do mainstreamu, ta historia jest istotna z jednego konkretnego powodu. Dotychczas mówiło się, że AI przyspiesza pisanie nowego kodu. Tu mówimy o czymś innym: AI jako narzędzie do wykonywania refaktorów i migracji, które z powodów ekonomicznych nigdy by się nie wydarzyły. To zmienia rachunek technического długu. Rzeczy, które zostawiałeś na "kiedyś bo za drogie", są teraz w zasięgu. Dla mnie, jako frontend architekta pracującego z dużymi codebases, pytanie nie brzmi już "czy migracja jest możliwa", tylko "czy mamy testy na tyle dobre, żeby ją przeprowadzić". I to jest zmiana, którą warto odnotować.

**Link:** [The Pulse: What can we learn from Bun's rapid Rust rewrite with AI?](https://newsletter.pragmaticengineer.com/p/the-pulse-what-can-we-learn-from-07f)
