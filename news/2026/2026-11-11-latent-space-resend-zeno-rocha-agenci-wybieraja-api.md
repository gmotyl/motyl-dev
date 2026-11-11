---
title: "Latent Space: dlaczego agenty wybierają Resend, rozmowa z Zeno Rocha"
excerpt: "Podcast o tym, jak projektować produkt dla agentów: dokumentacja w Markdownie, serwer MCP z ponad osiemdziesięcioma narzędziami i dystrybucja przez React Email."
publishedAt: "2026-11-10"
slug: "latent-space-resend-zeno-rocha-agenci-wybieraja-api"
hashtags: "#latent-space #ai #agents #mcp #dx #startup #generated #pl"
source_pattern: "Latent Space"
---

## Dlaczego agenty kodujące wybierają Resend

**TLDR:** Zeno Rocha, współzałożyciel i CEO Resend, tłumaczy, dlaczego w badaniach rekomendacji Claude Code wskazywał jego usługę do wysyłania maili częściej niż większych rywali. Odpowiedź to dystrybucja przez programistów i produkt czytelny dla maszyn.

**Summary:** Punkt wyjścia to badanie, w którym Claude Code wybrał Resend jako pierwszą rekomendację w 64 z 102 możliwych do odczytania odpowiedzi. SendGrid wygrał siedem razy, a pojawiał się jako alternatywa pięćdziesiąt pięć razy. Nowsze, szersze badanie wypadło bardziej konkurencyjnie, bo w nim w większości modeli prowadzi Postmark. Resend miał w chwili nagrania 4,3 miliona użytkowników i 120 tysięcy płacących klientów.

Dystrybucja zaczęła się od React Email, szablonów, których można było użyć z innym dostawcą, więc kod Resend był w repozytorium, zanim ktokolwiek zmienił usługę. Dla agentów zespół zmienił też sposób publikowania informacji: strona z cennikiem ma suwak dla ludzi, a po dopisaniu rozszerzenia Markdown do adresu agent dostaje tabelę do odczytania jednym żądaniem. Serwer MCP urósł z około dwudziestu narzędzi do ponad osiemdziesięciu, bo Zeno chce, żeby w czacie dało się zrobić to, co w panelu, od zaproszenia osoby po zarządzanie rozliczeniami. Prowadzący zestawiają to z podejściem Cloudflare, który ekspozycję API zamyka w dwóch narzędziach, wyszukiwaniu i wykonaniu.

Ciekawy jest też wątek reputacji dostarczania: domyślne śledzenie kliknięć przez wspólną domenę może zaszkodzić uczciwym klientom, gdy inny klient użyje jej do phishingu, więc Resend wprowadził własne domeny śledzenia. Warto pamiętać, że rozmowa to promocja własnej firmy, a wnioski z badań rekomendacji dotyczą wersji modeli, które szybko się zmieniają. Pytania o to, czy stronniczość agentów wobec jednego dostawcy jest dla rynku zdrowa, w notatce nie padają.

**Key takeaways:**
- Dystrybucja przez bibliotekę, której programiści już używają, wyprzedza wybór agenta.
- Strony czytelne dla maszyn, na przykład cennik w Markdownie, pomagają w rekomendacjach.
- Liczba narzędzi w serwerze MCP to kompromis, a rozmiar wyniku może być większym problemem niż ich liczba.

**Why do I care:** Jeśli twój produkt ma API, sprawdź, co agent o nim wie i czy potrafi odpowiedzieć na pytanie klienta z twojej dokumentacji. Rozwiń wynik wywołania narzędzia, którego używasz codziennie, i zobacz, ile z tego model faktycznie potrzebuje.

**Link:** [Why Coding Agents Keep Picking Resend — Zeno Rocha, Resend](https://www.latent.space/)
