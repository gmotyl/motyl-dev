---
title: "Kilo: OpenAI zostało złamane przez mądrzejszy model, nie przez nową dziurę"
excerpt: "Ten sam błąd w bibliotece do obsługi obrazów, nad którym badacze bezpieczeństwa spędzili godziny bez efektu, dał pełny exploit w trzy godziny tego samego wieczoru, gdy Anthropic wypuściło Claude Opus 5."
publishedAt: "2026-09-22"
slug: "kilo-openai-wlamanie-przez-opus-5"
hashtags: "#kilo #ai #security #architecture #generated #pl"
source_pattern: "Kilo"
---

## Ten sam błąd, ten sam zespół, jedna różnica: nowszy model

**TLDR:** Zespół badawczy Hacktron spędził 24 lipca godziny, próbując zamienić znany błąd w starej bibliotece do przetwarzania obrazów w działający exploit przeciwko forum pomocy OpenAI, bezskutecznie. Tego samego wieczoru Anthropic wypuściło Claude Opus 5, a skierowanie nowego modelu na ten sam problem dało działający exploit w trzy godziny i pełne zdalne wykonanie kodu następnego ranka.

**Summary:** Nic w błędzie, zespole ani celu nie zmieniło się między nieudaną a udaną próbą, zmienił się wyłącznie model, którego użyto do analizy. Po zdobyciu zdalnego wykonania kodu na forum OpenAI, zespół Hacktron wykorzystał ten dostęp, by dotrzeć do konta ChatGPT i Codex jednego z pracowników, a następnie otworzył pull requesta wewnątrz wewnętrznego repozytorium kodu OpenAI, żeby udowodnić skalę problemu. OpenAI naprawiło błąd w ciągu doby i wypłaciło 6500 dolarów nagrody za zgłoszenie.

Najbardziej niepokojący szczegół dotyczy historii samej luki: błąd w bibliotece obsługującej obrazy został faktycznie naprawiony ponad rok wcześniej, cicho, bez oznaczenia jako problem bezpieczeństwa. Nikt w OpenAI ani w Discourse go nie szukał, bo nic nie sugerowało, że warto. Skaner sprawdzający pakiety względem listy publicznie zgłoszonych podatności nigdy by tego nie złapał, bo ta konkretna zmiana nigdy na taką listę nie trafiła, wykrycie wymagało czegoś, co czyta kod i rozumie, co on robi.

Autorzy artykułu, twórcy narzędzia Kilo, wyciągają z tego wniosek architektoniczny: skok możliwości modeli działa symetrycznie, przyspiesza zarówno atakujących, jak i narzędzia broniące kodu, pod warunkiem że te narzędzia rzeczywiście działają na najnowszym dostępnym modelu, a nie na tym zatwierdzonym w zeszłym kwartale. Stąd decyzja, by Kilo było niezależne od konkretnego dostawcy modelu: tryb Auto Frontier automatycznie rotuje między najlepszymi dostępnymi modelami wszystkich dostawców, więc zespół korzystający z Code Reviewera Kilo mógłby dostać możliwości Opus 5 tego samego wieczoru, kiedy zrobił to Hacktron, bez dotykania jakiejkolwiek konfiguracji. Tryb Auto Efficient działa odwrotnie: uruchamia ten sam test względem własnego benchmarku Kilo Bench i wybiera najtańszy model, który wciąż radzi sobie z zadaniem.

Druga część rozwiązania dotyczy tego, gdzie w ogóle szukać takich luk. Fix, który miał znaczenie w przypadku Hacktron, był ukryty warstwę niżej, w pakiecie, którego większość inżynierów nigdy ręcznie nie otwiera. Funkcja Codebase Indexing w Kilo ma temu zaradzić: to semantyczne przeszukiwanie repozytorium, które znajduje, gdzie zależność jest faktycznie używana, a nie tylko gdzie jej nazwa pojawia się w pliku, co przy repozytorium wielkości Discourse pozwala wyłapać każde miejsce, gdzie stara biblioteka obrazów została kiedyś dociągnięta i o której nikt już nie pamięta.

**Key takeaways:**
- Ten sam błąd i ten sam cel dały różny wynik zależnie wyłącznie od modelu: Opus 5 zamienił nieudaną próbę w pełny exploit z RCE w niecałą dobę
- Podatna zmiana w bibliotece obrazów nigdy nie trafiła na żadną listę zgłoszonych CVE, więc klasyczne skanery porównujące pakiety z listą znanych błędów nie miały jak jej wykryć
- Kilo stawia na niezależność od dostawcy modelu (Auto Frontier rotuje między najlepszymi dostępnymi modelami, Auto Efficient dobiera najtańszy wystarczający) oraz na semantyczne indeksowanie repozytorium zamiast wyszukiwania po nazwie zależności

**Why do I care:** Większość zespołów bezpieczeństwa planuje pod kątem stopniowo rosnących możliwości atakujących, a nie pod kątem tego, jak krótkie może być okno między premierą nowego modelu a kimś, kto tego samego wieczoru skieruje go na waszą infrastrukturę. Jeśli wasze narzędzia do przeglądu kodu i skanowania zależności są ręcznie zatwierdzane do konkretnej wersji modelu raz na kwartał, ten przypadek jest konkretnym argumentem za tym, żeby przynajmniej rozważyć automatyczną rotację do najnowszych modeli, zanim zrobi to za was ktoś inny.

**Link:** [OpenAI was breached by a smarter model, not a new bug](https://blog.kilo.ai/p/openai-was-breached-by-a-smarter)
