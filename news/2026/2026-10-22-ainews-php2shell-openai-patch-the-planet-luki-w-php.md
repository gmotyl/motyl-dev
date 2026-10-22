---
title: "AINews: PHP2Shell, czyli luki w rdzeniu PHP znalezione przez modele i dwumiesięczna skoordynowana reakcja"
excerpt: "OpenAI Patch the Planet i Wiz niezależnie odkryły luki w obsłudze błędów pamięci w PHP, a ekosystem odpowiedział poprawką, regułami WAF i ostrzeżeniami rządów."
publishedAt: "2026-10-22"
slug: "ainews-php2shell-openai-patch-the-planet-luki-w-php"
hashtags: "#ainews #latentspace #ai #security #php #llm #agents #generated #pl"
source_pattern: "AINews"
---

## PHP2Shell, luki w rdzeniu PHP odkryte przez modele

**TLDR:** Dwie grupy niezależnie znalazły krytyczne luki w rdzeniu PHP, jedna z programu OpenAI Patch the Planet przy użyciu GPT-5.6 Sol, druga w Wiz z Gemini 4 Argon. Reakcja trwała około dwóch miesięcy i objęła poprawkę silnika, reguły WAF i ostrzeżenia rządów.

**Summary:** Luki nazwano PHP2Shell i oznaczono jako CVE-2026-109618 oraz CVE-2026-109619. Leżą w wewnętrznej obsłudze braku pamięci i błędów krytycznych, a nie we wtyczce ani w logice uwierzytelniania aplikacji. Badacze pokazali pełne zdalne wykonanie kodu przed uwierzytelnieniem w WordPressie, Drupalu i Joomli, a także ujawnianie pamięci w stylu Heartbleed. Biuletyn podkreśla, że to wyniki zgłoszone przez badaczy i nie należy z nich wnioskować, że każda instalacja ma identyczną, natychmiast wykorzystywalną ścieżkę.

Oś czasu opiera się na relacjach uczestników. OpenAI mówi o około dwóch miesiącach koordynacji z poufnym powiadomieniem rządów i agencji. Cloudflare wdrożył wstępne reguły WAF dla wszystkich klientów, także darmowych, i otwarcie nazwał je rozwiązaniem tymczasowym, wskazując godzinę publikacji poprawki. Amerykańska NSA radziła przygotować się do aktualizacji i wyłączyć systemy, jeśli to niemożliwe. Pojawiły się też doniesienia, że szczegóły wyciekły przed poprawką, a wirusowa zbiórka mówi o 1,5 miliona serwerów bez poprawki i wyłączeniach serwisów w Europie. Autor biuletynu zaznacza, że żadnego z tych twierdzeń nie potwierdza pierwotny komunikat ani pomiar.

Warto zwrócić uwagę na dwie rzeczy. Pierwsza to brak pierwotnego źródła, czyli komunikatu PHP Foundation z macierzą wersji. Dlatego nie da się rzetelnie napisać "zaktualizuj do wersji X". Druga to spór o dostęp do modeli, bo część komentatorów chwali program Daybreak od OpenAI, a krytykuje restrykcje Anthropic. Autor odnotowuje, że sprawdzający zarzut "zero wartości" to jedna opinia, a nie dowód. OpenAI opublikowało też repozytorium z umiejętnością Codex do sprawdzania, czy strona jest dotknięta.

**Key takeaways:**
- Dwie niezależne grupy odkryły te same luki, z użyciem GPT-5.6 Sol i Gemini 4 Argon.
- Pełna skala szkód jest nieudokumentowana, a wiele liczb to doniesienia z drugiej ręki.
- WAF jest rozwiązaniem tymczasowym, a naprawa wymaga aktualizacji silnika PHP.

**Why do I care:** Jeśli twój backend lub CMS stoi na PHP, to pilna aktualizacja i weryfikacja z oficjalnych źródeł. Dla reszty z nas to sygnał, że modele wchodzą do audytów bezpieczeństwa na poważnie i przez najbliższy rok czekają nas kolejne duże zgłoszenia. Z tekstu brakuje mi tylko jednego, czyli mierzalnego wyniku, ile fałszywych alarmów te narzędzia produkują.

**Link:** [OpenAI's Patch the Planet program is 1 of 2 parties to discover PHP2Shell vulnerabilities](https://www.latent.space/p/ainews-openais-patch-the-planet-program)
