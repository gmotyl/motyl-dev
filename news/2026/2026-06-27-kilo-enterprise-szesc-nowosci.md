---
title: "Kilo dla enterprise: sześć rzeczy, które wysłaliśmy w tym tygodniu"
excerpt: "Kilo AI opublikowało sześć nowych funkcji dla zespołów i przedsiębiorstw: sandboxing agentów, zarządzanie sub-organizacjami, integrację z Atlassian oraz inteligentny router modeli Auto Efficient."
publishedAt: "2026-06-26"
slug: "kilo-enterprise-szesc-nowosci"
hashtags: "#kilo #ai #agents #enterprise #sandbox #atlassian #generated #pl"
source_pattern: "Kilo"
---

## Kilo dla enterprise: sześć rzeczy, które wysłaliśmy w tym tygodniu

**TLDR:** Kilo AI podczas swojego Focus Week dostarczyło sześć istotnych ulepszeń dla klientów enterprise: monitorowanie adopcji funkcji, sandboxing agentów na poziomie systemu operacyjnego, zarządzanie sub-organizacjami, integrację z Bitbucket i Jira, inteligentny router modeli Auto Efficient oraz publiczną dokumentację OpenAPI dla analityki użytkowania.

**Summary:**

Wyobraź sobie, że prowadzisz duży zespół deweloperski i płacisz co miesiąc za tokeny AI, ale nie masz pojęcia, co właściwie dostałeś w zamian. To nie jest hipotetyczny problem — to codzienność wielu firm, które wdrożyły narzędzia AI, ale nie mają narzędzi do zarządzania nimi. Kilo postanowiło zaadresować ten problem frontalnie, wydając sześć funkcji naraz podczas specjalnego tygodnia skupionego na potrzebach enterprise.

Najbardziej interesującą i potencjalnie najważniejszą z perspektywy bezpieczeństwa nowością jest sandboxing agentów. Do tej pory tryb auto-approve — gdzie agent wykonuje polecenia bez potwierdzenia — był ryzykownym kompromisem między wygodą a bezpieczeństwem. Stary mechanizm Gatekeeper polegał na tym, że jeden model AI pytał drugi, czy dane polecenie jest bezpieczne. To brzmi absurdalnie, bo jest absurdalne — model AI nie jest systemem bezpieczeństwa. Nowy sandbox działa na poziomie systemu operacyjnego: używa Bubblewrap na Linuksie i natywnego Seatbelt na macOS, ograniczając dostęp do systemu plików wyłącznie do katalogu roboczego agenta i umożliwiając blokowanie połączeń sieciowych. To fundamentalna zmiana podejścia — od "pytamy AI, czy to bezpieczne" do "system operacyjny po prostu nie pozwoli na niebezpieczną operację".

Na froncie kosztów i zarządzania modelami pojawił się Auto Efficient — nowy router dołączający do Auto Frontier, Auto Balanced i Auto Free. Zamiast zawsze sięgać po najdroższy dostępny model, Auto Efficient analizuje kontekst sesji i wybiera najtańszy model, który według danych z KiloBench poradzi sobie z danym zadaniem. Co ważne, może zmieniać decyzję w trakcie sesji, w miarę jak zadania stają się bardziej lub mniej złożone. Dane benchmarkowe są publiczne na kilo.ai/kilobench, co jest rzadką i godną pochwały transparentnością w świecie, gdzie większość firm ukrywa takie dane za marketingowym bełkotem.

Dwie pozostałe funkcje adresują potrzeby operacyjne. Zarządzanie sub-organizacjami pozwala enterprise klientom tworzyć hierarchię organizacji z oddzielnymi budżetami i członkami, a jednocześnie patrzeć na całość z lotu ptaka w panelu analitycznym. Integracja z Bitbucket i Jira otwiera Kilo na ekosystem Atlassian, który dominuje w wielu dużych korporacjach, gdzie GitHub czy GitLab po prostu nie wchodzą w grę ze względu na istniejące umowy i infrastrukturę. Wreszcie publiczna dokumentacja OpenAPI dla endpointów analitycznych usuwa barierę, która stała na drodze inżynierów próbujących zintegrować dane o użyciu Kilo z własnymi systemami raportowania finansowego.

**Key takeaways:**
- Sandboxing agentów oparty na mechanizmach OS (Bubblewrap/Seatbelt) zastępuje nieskuteczny model-based Gatekeeper i czyni auto-approve bezpiecznym w szerszym zakresie zastosowań
- Auto Efficient wybiera najtańszy model zdolny do wykonania zadania na podstawie publicznie dostępnych danych benchmarkowych KiloBench, co może znacząco obniżyć koszty operacyjne
- Integracja z Bitbucket i Jira otwiera Kilo na duże organizacje mocno osadzone w ekosystemie Atlassian

**Why do I care:** Jako senior deweloper i architekt patrzę na tę listę z mieszanymi uczuciami. Sandboxing to krok w dobrą stronę i cieszę się, że ktoś wreszcie powiedział wprost: "model AI nie jest systemem bezpieczeństwa, potrzebujemy prawdziwej izolacji na poziomie systemu operacyjnego." Jednak nadal jest to funkcja eksperymentalna, dostępna tylko na Linux i macOS, bez wsparcia dla Windows — co wyklucza znaczną część enterprise środowisk. Auto Efficient brzmi świetnie w teorii, ale zastanawiam się, jak dobrze KiloBench odzwierciedla realne zadania w moim projekcie — benchmark to zawsze uproszczenie rzeczywistości. Adopcja sub-organizacji i integracja z Atlassian to pragmatyczne decyzje biznesowe, które odzwierciedlają rzeczywistość enterprise IT, nie romantyczną wizję "każda firma używa GitHub". To, czego mi brakuje w tym wydaniu, to głębsza historia o tym, co dzieje się z danymi — Kilo jest open source i source-available, ale ile enterprise klientów faktycznie audytuje kod przed produkcyjnym wdrożeniem? Transparentność to za mało, jeśli nikt nie korzysta z możliwości jej weryfikacji.

**Link:** [What's new for enterprise: six things we shipped this week](https://blog.kilo.ai/p/whats-new-for-enterprise-six-things?publication_id=4363009&post_id=203605004&isFreemail=true&triedRedirect=true)
