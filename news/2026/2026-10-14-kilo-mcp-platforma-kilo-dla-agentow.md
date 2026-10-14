---
title: "Kilo MCP: agent kodujący dostaje dostęp do platformy Kilo"
excerpt: "Zdalny serwer MCP z dwoma narzędziami, search i call, daje agentowi dostęp do użycia, profili agentów i agentów chmurowych."
publishedAt: "2026-10-14"
slug: "kilo-mcp-platforma-kilo-dla-agentow"
hashtags: "#kilo #ai #agents #devtools #mcp #generated #pl"
source_pattern: "Kilo"
---

## Serwer MCP Kilo zamiast klikania w aplikacji webowej

**TLDR:** Kilo wydało zdalny serwer MCP, który wystawia API platformy dla każdego klienta zgodnego z MCP. Zamiast jednego narzędzia na endpoint są dwa: wyszukiwanie w katalogu API i wywołanie wybranego endpointu.

**Summary:** Dotąd dane o użyciu, profile agentów i agenci chmurowi były dostępne tylko przez aplikację webową. Teraz agent w Kilo CLI, rozszerzeniu VS Code lub innym kliencie MCP może pytać o nie w zwykłym języku. Konfiguracja to dodanie wpisu do pliku konfiguracyjnego i logowanie przez OAuth, w którym wybiera się konto osobiste lub organizację.

Projekt jest sprytny: API jest zbyt duże, by załadować je jako osobne narzędzia, więc agent najpierw szuka, a potem woła. Błędne dane wejściowe dają komunikat z nazwą brakującego pola, więc agent sam się poprawia. Proste zadanie to jedno wyszukiwanie i jedno wywołanie, a konfiguracja agenta chmurowego może wymagać kilku wyszukiwań. Połączenie działa w imieniu użytkownika, więc przy wielu organizacjach trzeba wskazać właściwą.

Zastosowania to pytania o koszty z podziałem na funkcje, zarządzanie profilami agentów oraz pełny cykl życia agentów chmurowych: start, status, wiadomości, przerwanie i usunięcie. Autorzy wspominają, że inżynier musiał wcześniej budować prywatny endpoint, by policzyć koszt przeglądów kodu.

**Key takeaways:**
- Wzorzec search plus call ogranicza rozmiar kontekstu przy dużych API.
- Połączenie działa z uprawnieniami użytkownika.
- Agenci chmurowi mogą próbować różnych podejść równolegle w izolacji.

**Why do I care:** Wzorzec dwóch narzędzi warto skopiować do własnych serwerów MCP, bo dziesiątki narzędzi zjadają kontekst. Dla zespołu to także pytanie o kontrolę: agent z pełnym dostępem do usuwania profili i agentów to ryzyko, o którym wpis nie wspomina.

**Link:** [Kilo MCP server](https://blog.kilo.ai/p/mcp)
