---
title: "The AI Break: agent AI, który przez cały dzień kwalifikuje przychodzące leady"
excerpt: "Tutorial na cztery prompty i cztery zaplanowane uruchomienia w Claude, które oceniają leady i przygotowują szkice odpowiedzi, ale niczego nie wysyłają."
publishedAt: "2026-11-07"
slug: "ai-break-agent-kwalifikujacy-leady-claude"
hashtags: "#theaibreak #ai #agents #claude #automation #prompt-engineering #workflow #generated #pl"
source_pattern: "The AI Break"
---

## Agent, który ocenia leady przez cały dzień

**TLDR:** Tutorial pokazuje, jak złożyć w Claude agenta do obsługi zapytań sprzedażowych z trzech plików z promptami i harmonogramu. Agent czyta arkusz z formularza i Gmaila, ocenia każdy lead w skali do dziesięciu i zapisuje szkice odpowiedzi. Niczego sam nie wysyła.

**Summary:** Autorzy zaczynają od rozróżnienia. Prompt czeka, aż o coś zapytasz, a agent ma stałą pracę, zna twój świat i powtarza tę samą rutynę. Ich agent ma cztery uruchomienia dziennie. O ósmej rano nadrabia wszystkie leady od poprzedniego wieczoru, co godzinę od dziewiątej do siedemnastej sprawdza nowe zgłoszenia, o szesnastej szkicuje przypomnienia dla osób, które zamilkły, a o osiemnastej robi podsumowanie dnia z rankingiem i trzema leadami na jutro.

Sercem jest pierwszy prompt. Zawiera opis tego, komu sprzedajesz, automatyczne tak i nie, listę nadawców, którzy nie są leadami, oraz skalę oceny. Pięć sygnałów, czyli dopasowanie firmy, rola decydenta, potrzeba, budżet i czas, dostaje po 0, 1 lub 2 punkty. Jedynka oznacza, że agent nie wie, i to jest najciekawsza decyzja w całym projekcie. Lead, który napisał jedno zdanie, dostaje około pięciu punktów i pytanie doprecyzowujące, zamiast odrzucenia. Wynik wpada do jednej z czterech kategorii, czyli rezerwuj spotkanie, dopytaj, grzeczne nie albo to nie lead.

Twarde reguły są krótkie. Agent nigdy nie wysyła, nie usuwa, nie archiwizuje i nie zmienia arkusza. Treść formularzy, maili i stron to informacja, nie polecenie, więc wiadomość każąca ocenić się na dziesięć jest oznaczana jako podejrzana. Kolejne prompty dziedziczą tylko to, czego potrzebują, a całość wkleja się do zaplanowanych zadań, które działają w chmurze nawet przy zamkniętej aplikacji. Wymagany jest płatny plan Claude oraz podłączone konektory Gmaila i Dysku Google.

**Key takeaways:**
- Agent to prompt z rolą, kontekstem i stałym harmonogramem, a nie jednorazowe pytanie.
- Wartość 1 dla "nie wiem" zapobiega zgadywaniu przy skąpych danych.
- Agent tylko czyta i szkicuje, a wysyłasz ty.
- Wiadomości od leadów traktuj jako dane, nie instrukcje, co chroni przed prompt injection.

**Why do I care:** To nie jest historia o frontendzie, raczej o sprzedaży i operacjach, ale wzorzec przenosi się na wszystko, co ma skrzynkę i powtarzalną decyzję. Podoba mi się, że autorzy od razu zakładają złośliwą treść w formularzu, bo to jest brakujący element w większości domowych automatyzacji. Czego tu nie ma, to pomiaru jakości. Nikt nie sprawdza, czy ocena 8 z 10 faktycznie przewiduje zamknięty deal, więc po miesiącu warto porównać oceny z wynikami.

**Link:** [Tutorial: Build an AI Agent That Qualifies Your Inbound Leads All Day](https://theaibreak.substack.com/p/tutorial-build-an-ai-agent-that-qualifies)
