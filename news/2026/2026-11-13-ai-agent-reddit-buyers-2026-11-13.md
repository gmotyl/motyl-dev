---
title: 'Agent AI wyszukujący potencjalnych klientów na Reddit'
excerpt: 'The AI Break pokazuje prototyp agenta, który monitoruje Reddit, wybiera pasujące wątki i przygotowuje odpowiedzi do ręcznego zatwierdzenia.'
publishedAt: '2026-11-13'
slug: 'ai-agent-reddit-buyers-2026-11-13'
hashtags: '#theaibreak #ai #agents'
---

## TLDR

Przewodnik opisuje agenta uruchomionego w Claude Project. Ma cyklicznie szukać na Reddit wątków pasujących do oferty, przygotować pomocną odpowiedź i dostarczyć szkic do Gmaila. Autor zakłada, że człowiek sprawdzi tekst przed publikacją.

## Monitoring zamiast automatycznego spamu

Konfiguracja korzysta z trzech plików instrukcji i czterech zaplanowanych zadań. Agent sprawdza nowe wątki w ciągu dnia, śledzi odpowiedzi i przygotowuje wieczorne podsumowanie. Ważny szczegół: szkice mają pomagać bez nachalnej oferty, linków i automatycznego publikowania.

Taki przepływ może skrócić czas wyszukiwania sygnałów od potencjalnych klientów. Jakość zależy jednak od doboru słów kluczowych i od tego, czy model rozumie kontekst rozmowy. Ręczne zatwierdzenie jest tu rozsądnym bezpiecznikiem.

**Link:** [Build an AI Agent That Finds You Buyers on Reddit](https://theaibreak.substack.com/p/tutorial-build-an-ai-agent-that-finds?publication_id=1842292&post_id=224746877&isFreemail=true&triedRedirect=true)

## Dlaczego mnie to obchodzi

To konkretny przykład agenta działającego według harmonogramu, ale bez prawa do samodzielnej publikacji. Automatyzacja wyszukiwania jest mniej ryzykowna niż automatyzacja kontaktu. Warto zachować ten podział, zwłaszcza gdy system pisze w imieniu firmy.