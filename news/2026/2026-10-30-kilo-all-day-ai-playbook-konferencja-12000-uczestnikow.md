---
title: "Jak zorganizowano All Day AI: konferencję na ponad 12 tysięcy osób w dwa miesiące"
excerpt: "Kilo publikuje scenariusz darmowej, szesnastogodzinnej konferencji online z 140 prelegentami, zbudowanej przez wolontariuszy i garstkę agentów AI."
publishedAt: "2026-10-29"
slug: "kilo-all-day-ai-playbook-konferencja-12000-uczestnikow"
hashtags: "#kilo #ai #agents #productivity #open-source #generated #pl"
source_pattern: "Kilo"
---

## Playbook za konferencją All Day AI

**TLDR:** All Day AI było darmowym, szesnastogodzinnym wydarzeniem online bez prezentacji sprzedażowych. Zebrało 12 313 uczestników i 140 prelegentów, a średni czas oglądania przekroczył 6 godzin.

**Summary:** Zespół miał około dwóch miesięcy i zaczynał od zera: bez społeczności, prelegentów, strony i platformy. Cele to ponad 10 tysięcy rejestracji, ponad 120 sesji, cztery ścieżki (Build, Lead, Secure, Ship) i żywa społeczność na Discordzie. Rdzeń organizacji to ponad 20 wolontariuszy, nikt nie był opłacany.

Trzy decyzje ważyły więcej niż narzędzia. Pierwsza to zakaz prezentacji sprzedażowych. Druga to wyróżniająca się marka z kogutem, a zdjęcia prelegentów w jednym stylu plakatów koncertowych powstały w aplikacji zbudowanej w Kilo Code na API obrazów OpenAI. Trzecia to zaufanie społecznościom: autor kazał swojemu agentowi Dot napisać do 3000 grup technologicznych i hackathonów z darmową ofertą logo na stronie za rozpowszechnienie wydarzenia. Odpowiedziały setki, a według szacunku autora przyniosło to 20 do 30 procent rejestracji.

Narzędzia były proste. Platforma Zuddl obsługiwała pięć scen, rejestrację i nagrywanie. Strona w wersji pierwszej kosztowała około 5 dolarów w Kilo Code z GPT 5.6, leżała na GitHubie i Vercelu, a domeną zarządzał Cloudflare. Korespondencję z 140 prelegentami prowadził agent Dot z człowiekiem akceptującym każdą wiadomość, a zmiany na stronie robił przez Kilo CLI. Agent Instinct w iMessage pilnował pilnych spraw z pracy.

Oś czasu była nerwowa. 25 sierpnia było 100 rejestracji i 12 zgłoszeń. Generalna próba 12 października pokazała, że znajomość Zuddl była słaba, a tuż przed startem prawie padła strona przez problem z kartą. 18 października było 9961 rejestracji, a plan moderacji powstał o 21:40 dzień przed. Autor przyznaje, co zrobiłby inaczej: wcześniej i częściej pracować z prelegentami, szkolić moderatorów przed próbą oraz nie używać służbowej poczty do obsługi prelegentów.

Z perspektywy krytyka: to tekst Kilo, więc narzędzia Kilo grają w nim główną rolę, a procent rejestracji z jednej wiadomości to rzut oka, nie pomiar.

**Key takeaways:**
- 12 313 zarejestrowanych, 140 prelegentów, średnio ponad 6 godzin oglądania.
- Jedna wiadomość do 3000 społeczności dała według autora 20 do 30 procent rejestracji.
- Najwięcej stresu przyniosło odkładanie pracy z prelegentami i szkolenia moderatorów.

**Why do I care:** To raczej historia o organizacji niż o kodzie, ale jest praktyczna dla każdego, kto robi meetup lub wewnętrzny event. Agent do korespondencji z człowiekiem w pętli zatwierdzania to wzorzec, który da się skopiować już dziś.

**Link:** [Open-Sourcing the Playbook Behind All Day AI, a 12,000+ Attendee Conference](https://blog.kilo.ai/p/adai)
