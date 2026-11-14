---
title: "Gemini 4 Hydrogen, samohostowani agenci Claude i inferencja na Vera Rubin"
excerpt: "Przegląd tygodnia z Latent Space: nowy model Google, self-hosting Claude Managed Agents, rekordy inferencji i benchmark OWE-Bench."
publishedAt: "2026-11-13"
slug: "gemini-4-hydrogen-claude-managed-agents-vera-rubin"
source_pattern: "Latent Space"
hashtags: "#Latent #ai #llm #agents #performance #architecture #generated #pl"
---

## Gemini 4 Hydrogen

**TLDR:** Google DeepMind wypuściło Gemini 4 Hydrogen z kontekstem 1M tokenów i czterema poziomami rozumowania. Artificial Analysis daje mu wynik 51 do 54 punktów, o jeden punkt za Claude Sonnet 5.5 w trybie max.

**Summary:** Cena wynosi 1,50 dolara za milion tokenów wejścia i 7,50 za wyjście. Google twierdzi, że model jest dwa i pół raza szybszy od Gemini 3.8 Flash, a niezależna ocena mierzy około 200 tokenów na sekundę. Newsletter zaznacza, że Terminal-Bench 4.0 wychodzi na 54 procent według Artificial Analysis, wobec 57 procent podanych przez Google. Jeden tester opisał też przypadek, w którym rozumowanie zużyło 131 tysięcy tokenów na jedno zapytanie.

**Key takeaways:**
- Różnice między własnymi wynikami Google a niezależnymi pomiarami są widoczne.
- Długie rozumowanie na prostych zapytaniach podnosi koszt, mimo niskiej ceny za token.
- Model jest już dostępny w GitHub Copilot.

**Dlaczego mnie to obchodzi:** Przy wyborze modelu do produkcji liczy się koszt całego zadania, a nie cena za token. Sprawdziłbym zużycie tokenów na własnych zapytaniach, zanim zmienię domyślny model.

**Link:** Newsletter nie podaje bezpośredniego adresu. Źródło: Latent Space, 13 listopada 2026 (uid 101785).

## Claude Managed Agents we własnej infrastrukturze

**TLDR:** Anthropic udostępnił w prywatnej becie możliwość uruchomienia harnessu, sandboxów i historii sesji Claude Managed Agents we własnej chmurze lub on-prem. Dodano tożsamość agenta, OpenTelemetry, przełączniki awaryjne i produkt do ewaluacji.

**Summary:** Klient decyduje, dokąd trafiają żądania do Claude. To odpowiedź na pytania firm o dane i zgodność z regulacjami. Newsletter wymienia też Claude Meetings w becie dla planów Team i Enterprise, w których Claude dołącza do spotkań wideo, najpierw w Google Meet, i tworzy dokumenty oraz tablice na żywo.

**Key takeaways:**
- Self-hosting agenta przenosi część odpowiedzialności za bezpieczeństwo na klienta.
- OpenTelemetry i przełączniki awaryjne są potrzebne, gdy agent działa bez nadzoru.
- Funkcje są w becie, więc przed wdrożeniem trzeba sprawdzić dostępność w swoim planie.

**Dlaczego mnie to obchodzi:** Dla zespołów z wymogami dotyczącymi danych to może być jedyna droga do agentów. Jako architekt chciałbym zobaczyć, jak wygląda granica między infrastrukturą klienta a tym, co zostaje po stronie dostawcy.

**Link:** Newsletter nie podaje bezpośredniego adresu. Źródło: Latent Space, 13 listopada 2026 (uid 101785).

## Inferencja na Vera Rubin

**TLDR:** Połączenie vLLM z Mooncake na NVIDIA Vera Rubin NVL72 osiąga 1,7 miliona tokenów na sekundę na GPU przy 387 tokenach na sekundę na użytkownika. Newsletter podaje też, że współdzielona pula KV trafia w cache w 96 do 97 procentach i skraca P90 TTFT z 0,98 do 0,38 sekundy.

**Summary:** Wyniki pochodzą z opisu dostawców, a nie z niezależnych testów. Newsletter zauważa, że dla tego punktu pracy porównanie z GB300 wypada na korzyść nowej platformy 58 razy. Warto jednak pamiętać, że przy takiej skali liczy się przepustowość na użytkownika, a nie tylko na GPU.

**Key takeaways:**
- Współdzielony cache KV w obrębie racka zmienia opłacalność długich kontekstów.
- Tokeny na sekundę na GPU i na użytkownika to różne metryki, które warto rozdzielać.
- Liczby z opisów dostawców wymagają weryfikacji przy własnym obciążeniu.

**Dlaczego mnie to obchodzi:** Nie zarządzam klastrami inferencji, ale wiem, że TTFT odczuwa użytkownik w interfejsie czatu. Skrócenie P90 z sekundy do 0,38 sekundy to różnica, którą widać bez żadnych metryk.

**Link:** Newsletter nie podaje bezpośredniego adresu. Źródło: Latent Space, 13 listopada 2026 (uid 101785).

## OWE-Bench: długie projekty inżynierskie

**TLDR:** OWE-Bench od Mercor to 26 długich projektów inżynierskich, z ponad 200 milionami tokenów na problem. Fable 5.2 zdobywa 54,6 procent, GPT-6 Astra 44,2 procent, a Opus 5.5 41,6 procent.

**Summary:** Benchmark mierzy zadania, w których agent pracuje przez długi czas nad jednym projektem, a nie odpowiada na pojedyncze pytanie. Newsletter nie podaje szczegółów metodologii, więc trudno ocenić, jak wyniki przekładają się na zwykły zespół. Samą skalę tokenów warto jednak zapamiętać, bo pokazuje, jak daleko poszły zadania agentowe.

**Key takeaways:**
- Benchmarki długich zadań pokazują inną zdolność niż testy jednorazowe.
- Brak opisu metodologii ogranicza wartość samych liczb.

**Dlaczego mnie to obchodzi:** Sprawdzam benchmarki pod kątem tego, czy mierzą to, co robię w pracy. Przy tym wyniku brakuje mi informacji, czy zadania przypominają normalny projekt frontendowy, czy są syntetyczne.

**Link:** Newsletter nie podaje bezpośredniego adresu. Źródło: Latent Space, 13 listopada 2026 (uid 101785).
