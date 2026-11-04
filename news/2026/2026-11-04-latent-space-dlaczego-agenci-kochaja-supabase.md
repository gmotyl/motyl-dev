---
title: "Dlaczego agenci kochają Supabase: lokalny backend bez Dockera, schematy w Gicie i compute przy bazie"
excerpt: "Notatka do odcinka Latent Space z założycielami Supabase o tym, co w ich backendzie ułatwia pracę agentom, a co pomaga skalować od prototypu do petabajta."
publishedAt: "2026-11-04"
slug: "latent-space-dlaczego-agenci-kochaja-supabase"
hashtags: "#latent #ai #agents #database #postgresql #supabase #architecture #generated #pl"
source_pattern: "Latent Space"
---

## Dlaczego agenci kochają Supabase

**TLDR:** W odcinku z Paulem Copplestone'em i Antem Wilsonem gospodarz próbuje wyjaśnić, czemu modele frontier wybierają Supabase jako pierwszy backend dla aplikacji. Odpowiedź to kilka praktycznych usprawnień, które usuwają tarcie, a agenci to tarcie odczuwają wielokrotnie.

**Summary:** Gospodarz sprawdził swoim trackerem AEO, że od Astry po Fable i Muse niemal każdy model wskazuje Supabase jako pierwszy wybór dla backendu aplikacji. Sama znajomość modelu tego nie tłumaczy, bo trzeba jeszcze doprowadzić wygenerowaną aplikację do działania. Z konferencji Select zapamiętał trzy rzeczy. Alfa środowiska uruchamiającego Supabase lokalnie bez Dockera, deklaratywne schematy trzymane w Gicie i compute obok bazy.

Deklaratywny schemat porównuje do momentu Terraform dla bazy. Zamiast historii kolejnych migracji agent dostaje opis stanu docelowego w plikach, które może czytać, zmieniać i rozwidlać razem z aplikacją. Człowiek zyskuje to samo, bo backend da się zrozumieć bez odtwarzania całej historii. Supabase Compute, w prywatnej alfie, uruchamia kontenery blisko bazy do dzielenia dokumentów czy embeddingów, czyli tam, gdzie funkcje brzegowe nie wystarczają.

Założyciele mówią o około pięciu milionach nowych baz miesięcznie i o tym, co się stanie, gdy agenci pchną to w stronę miliardów aplikacji. Skalowanie wielu małych baz i jednej bardzo dużej to różne problemy, stąd OrioleDB, Multigres i przejęcie Turso. Ciekawa obserwacja jest taka, że aktywacja i konwersja wzrosły, bo agent prowadzi użytkownika od rejestracji do działającej konfiguracji w jednym przepływie.

**Key takeaways:**
- Lokalne uruchamianie bez Dockera i schematy deklaratywne w Gicie to usprawnienia przydatne także ludziom.
- Compute obok bazy zamyka lukę między startem aplikacji a jej utrzymaniem.
- Supabase deklaruje około pięciu milionów nowych baz miesięcznie.

**Why do I care:** Część tego to marketing własnej rozmowy, bo gospodarz opiera tezę na wynikach własnego trackera, bez metodologii. Wniosek dla architekta jest za to użyteczny. Jeśli narzędzie ma być wybierane przez agentów, jego konfiguracja musi leżeć w plikach w repo, a nie w klikaniu w panelu. Dotyczy to też naszych wewnętrznych platform.

**Link:** [Why Agents Love Supabase](https://www.latent.space/)
