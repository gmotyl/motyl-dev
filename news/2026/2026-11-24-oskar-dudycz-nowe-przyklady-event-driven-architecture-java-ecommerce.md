---
title: "Nowe przykłady Event-Driven Architecture: e-commerce w Javie z Event Sourcingiem"
excerpt: "Oskar Dudycz odświeżył swoje przykłady Event Sourcingu i EDA, a największy z nich to pełny przepływ e-commerce w Spring Boot."
publishedAt: "2026-11-23"
slug: "oskar-dudycz-nowe-przyklady-event-driven-architecture-java-ecommerce"
hashtags: "#oskardudycz #architecture #java #springboot #opentelemetry #testing #generated #pl"
source_pattern: "OskarDudycz"
---

## Nowe przykłady Event-Driven Architecture

**TLDR:** Przed otwartym warsztatem Oskar Dudycz zrobił duży remont swoich przykładów Event Sourcingu i EDA. Najważniejszy jest pokaz przepływu e-commerce w Javie, który trafi też do wersji dla .NET i Node.js.

**Summary:** Nowy przykład to kompletny przepływ zamówienia zbudowany w najnowszym Spring Boot. Pokazuje obsługę wyścigów i kompensacji, czyli problemów, które w systemach rozproszonych naprawdę bolą. Łączy automatyczne kroki z akcjami ręcznymi, a do tego jest prosty interfejs, po którym można klikać.

Sporo uwagi poświęcono jakości inżynierskiej. Obserwowalność z OpenTelemetry działa razem z Event Sourcingiem. Dokumentację dostarczają EventCatalog, AsyncAPI i oczywiście OpenAPI. Testowanie opiera się na BDD obejmującym API, komunikaty asynchroniczne i logikę biznesową, a do kontraktów użyto Strictland. Przykład rozróżnia zdarzenia wewnętrzne i zewnętrzne i koordynuje proces jawną sagą.

Autor zapowiada przeniesienie tego do repozytoriów EventSourcing.NetCore i EventSourcing.NodeJS. Zapisy na otwarte warsztaty są zamknięte, ale można zamówić zamknięty dla zespołu. Dodaje też, że kod można po prostu przejrzeć albo podać narzędziom LLM, i że chętnie przyjmie uwagi.

**Key takeaways:**
- Przykład obejmuje sagę, kompensację i obsługę wyścigów, nie tylko szczęśliwą ścieżkę.
- Dokumentacja i testy kontraktowe są częścią przykładu, nie dodatkiem.
- Wersje dla .NET i Node.js mają dostać ten sam przepływ.

**Why do I care:** Dla frontendowca i architekta to rzadka okazja, żeby zobaczyć całość, od zdarzeń po klikalny interfejs, w jednym repozytorium. Event Sourcing często wygląda na papierze lepiej niż w praktyce, więc działający przykład z obserwowalnością jest wart więcej niż kolejny artykuł. Zachowaj tylko zdrowy sceptycyzm: to dydaktyczna demonstracja, nie dowód, że takie podejście opłaca się w twoim produkcie.

**Link:** [EventSourcing.JVM, przykład e-commerce](https://github.com/oskardudycz/EventSourcing.JVM/tree/main/samples/e-commerce)
