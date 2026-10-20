---
title: "Jak zarządzać reklamami Google, Meta, Reddit i LinkedIn przez agenta w Kilo Desktop"
excerpt: "Relacja z repozytorium skryptów i skilli, które pozwalają agentowi prowadzić kampanie na czterech platformach reklamowych."
publishedAt: "2026-10-20"
slug: "kilo-desktop-reklamy-google-meta-reddit-linkedin"
hashtags: "#kilo #ai #agents #devtools #workflow #generated #pl"
source_pattern: "Kilo"
---

## Reklamy na czterech platformach z poziomu Kilo Desktop

**TLDR:** Autor od maja rozbudował repozytorium skryptów w Pythonie o Meta, Reddit i LinkedIn, a teraz pracuje w nim w Kilo Desktop. Najważniejsze są kontrole konta przed zapisem i uczciwe raportowanie niezgodnych liczb.

**Summary:** Repozytorium urosło wokół faktycznej pracy. Zawiera plik AGENTS.md z regułami, skille w katalogu .kilo, skrypty dla każdej platformy, konfigurację kont, dokumentację i raporty. Przejście na Desktop wynika z organizacji sesji, bo dla jednej kampanii na wielu platformach można mieć osobną sesję na każdą. CLI zostaje, bo tylko ono łączy się z aplikacją mobilną Kilo.

Najważniejsza zmiana to skrypty świadome konta. Przy jednym koncie wystarczył identyfikator w zmiennej środowiskowej, przy kilku reklamodawcach to prosty sposób na kosztowną pomyłkę. Przed zapisem agent musi wskazać platformę, reklamodawcę, połączenie i identyfikator konta. Starsze skrypty mogą mieć zaszyte identyfikatory, więc nie każdy plik jest narzędziem do wielokrotnego użytku. W kampanii na Reddit API wymagało pola start_time, którego dokumentacja nie wymieniała, a kampania w stanie wstrzymania już istniała. Zamiast uruchamiać wszystko od nowa, agent sprawdził stan konta i dokończył. Poprawka trafiła do skryptu.

Raportowanie ma zostawić widoczne niezgodności, a nie sklejać je w jedną sumę. Platformy przypisują sobie te same rejestracje, część rekordów nie ma źródła, a w UTM-ach bywa literalny makro-znacznik. Autor zaznacza też, że dry-run to nie to samo, co brak skutków, bo część podglądów odpytuje konta na żywo. Dobre kontrole należą do samego skryptu, który powinien odmówić działania na obcym koncie.

**Key takeaways:**
- Skrypty muszą wymagać jawnego wskazania konta przed zapisem.
- Kampanie tworzy się w stanie wstrzymania, aktywacja wymaga zgody.
- Raporty mają pokazywać niezgodności źródeł, nie je ukrywać.

**Why do I care:** Tekst wyszedł od Kilo i jest dobrą reklamą ich produktu, ale zasady nadają się do każdego agenta z dostępem do pieniędzy. Zabezpieczenie wewnątrz skryptu, a nie w prompcie, to ta sama lekcja co przy dostępie do produkcyjnej bazy.

**Link:** [How I manage Google, Meta, Reddit and LinkedIn ads with Kilo Desktop](https://blog.kilo.ai/p/how-i-manage-google-meta-reddit-and)
