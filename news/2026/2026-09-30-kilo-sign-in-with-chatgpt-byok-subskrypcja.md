---
title: "Kilo pozwala teraz płacić subskrypcją ChatGPT za agentów w chmurze"
excerpt: "Kilo dodało logowanie przez ChatGPT i możliwość rozliczania modeli OpenAI z planu Work albo Codex zamiast osobnego klucza API, obejmując też Cloud Agents i aplikację mobilną, które wcześniej nie miały jak sięgnąć do subskrypcji użytkownika."
publishedAt: "2026-09-30"
slug: "kilo-sign-in-with-chatgpt-byok-subskrypcja"
hashtags: "#kilo #ai #devtools #vscode #generated #pl"
source_pattern: "Kilo"
---

## Kilo daje subskrypcji ChatGPT dostęp do chmury, nie tylko lokalnego edytora

**TLDR:** Kilo dodało logowanie przez konto ChatGPT oraz możliwość rozliczania modeli OpenAI bezpośrednio z limitu subskrypcji Work albo Codex, zamiast osobnego klucza API. Nowość obejmuje VS Code, JetBrains, CLI, Cloud Agents, code review i aplikację mobilną.

**Summary:** Do tej pory połączenie ChatGPT z Kilo działało tylko przez lokalny harness, czyli zapytania szły prosto z komputera użytkownika do OpenAI. To wystarczało w VS Code czy terminalu, ale wszystko, co działało na infrastrukturze samego Kilo, Cloud Agents i aplikacja mobilna, nie miało jak dosięgnąć subskrypcji, bo ta żyła tylko lokalnie. Nowe logowanie przez ChatGPT działa dokładnie tak jak znane przyciski logowania przez Google czy GitHuba: użytkownik autoryzuje się w OpenAI, a Kilo używa tej tożsamości do założenia konta albo zalogowania, więc jedno hasło mniej do zapamiętania.

Właściwa nowość leży jednak w tym, co dzieje się po zalogowaniu: subskrypcję ChatGPT można teraz dodać do Kilo jako dostawcę modelu w trybie BYOK, "przynieś własny klucz", tyle że tym kluczem jest tu abonament, który i tak już się opłaca, a nie osobny token API rozliczany od tokena. Po podłączeniu limit z planu ChatGPT Work albo Codex działa we wszystkich powierzchniach Kilo naraz, we wtyczkach VS Code i JetBrains, w CLI, w Cloud Agents i w aplikacji mobilnej, a dodatkowo można ograniczyć zużycie w ustawieniach ChatGPT osobnym, niższym limitem specyficznym dla tej aplikacji.

Praktyczna konsekwencja jest taka, że sesję Cloud Agent można teraz odpalić z telefonu, gdy w głowie pojawi się pomysł na poprawkę buga, a agent użyje tego samego planu ChatGPT, którego używa się w edytorze na laptopie, bez osobnego klucza API czy drugiego dostawcy modelu do skonfigurowania. Wracając do laptopa, te same tryby agenta korzystają z tego samego limitu, niezależnie od tego, czy tryb Plan szkicuje dokument architektury, czy tryb Debug szuka przyczyny failującego testu. Modele z subskrypcji trafiają do tego samego rozwijanego menu, w którym Kilo udostępnia ponad 500 modeli przez swój Gateway, więc jedno i drugie da się używać obok siebie, przełączając się w zależności od zadania.

**Key takeaways:**
- Logowanie przez ChatGPT działa jak znane przyciski logowania przez Google czy GitHuba
- Subskrypcję ChatGPT Work albo Codex można dodać jako dostawcę modelu w trybie BYOK zamiast płacić osobno za API
- Limit z planu ChatGPT działa teraz też w Cloud Agents i aplikacji mobilnej, wcześniej dostępnych tylko przez osobny klucz API
- Modele z subskrypcji i ponad 500 modeli z Kilo Gateway trafiają do tego samego menu wyboru modelu

**Why do I care:** To kolejny krok w kierunku, w którym subskrypcja u jednego dostawcy modelu przestaje być zamknięta w jednym edytorze czy jednej aplikacji, tylko staje się tożsamością, którą można podłączyć wszędzie. Dla zespołów płacących już za plany OpenAI czy Anthropic warto sprawdzić, czy narzędzia, których używają, oferują podobną integrację, bo różnica w miesięcznym rachunku między osobnym API a wykorzystaniem istniejącej subskrypcji potrafi być spora przy większej skali użycia.

**Link:** [Introducing Sign in with ChatGPT in Kilo](https://blog.kilo.ai/p/sign-in-with-chatgpt)
