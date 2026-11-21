---
title: "The AI Break: agent wsparcia klienta w projekcie Claude, trzy pliki i cztery zadania cykliczne"
excerpt: "Poradnik budowy agenta, który co godzinę czyta skrzynkę supportu, szkicuje odpowiedzi w Gmailu i wskazuje maile wymagające człowieka."
publishedAt: "2026-11-20"
slug: "ai-break-agent-wsparcia-klienta-claude-project"
hashtags: "#theaibreak #ai #agents #llm #productivity #workflow #generated #pl"
source_pattern: "The AI Break"
---

## Agent obsługi klienta w Claude Project

**TLDR:** Poradnik pokazuje, jak w jednym projekcie Claude zbudować agenta, który czyta skrzynkę supportu, szkicuje odpowiedzi na podstawie waszych notatek pomocy i oddaje człowiekowi sprawy o pieniądzach, prawie i złość. Całość to trzy pliki wklejone do instrukcji i cztery zadania cykliczne.

**Summary:** Punkt wyjścia jest prosty. Te same pytania klientów wracają cały dzień, a każda wolna albo różna odpowiedź kosztuje trochę zaufania. Autor odróżnia prompt, który czeka na polecenie, od agenta, który ma zadanie, zna otoczenie i za każdym razem robi to samo. Wasz agent czyta każdego maila, pisze szkice odpowiedzi tam, gdzie pokrywają je wasze notatki, a wszystko, co dotyczy pieniędzy, kwestii prawnych albo wściekłego klienta, kładzie od razu przed wami.

Do uruchomienia potrzeba płatnego planu Claude z aplikacją desktopową, Gmaila albo Google Workspace oraz dziesięciu najczęstszych pytań z waszymi gotowymi odpowiedziami, które najłatwiej wyciągnąć z folderu wysłanych. Po każdym cyklicznym sprawdzeniu agent oddaje raport podzielony na cztery grupy: wymaga ciebie, gotowe, sprawdź najpierw oraz bez odpowiedzi. Na końcu jest lista pytań do właściciela, na przykład czy wysyłacie do Norwegii, oraz informacja, w którym mailu agent jest najmniej pewny. W przykładzie klient, któremu według śledzenia paczka została dostarczona, może potrzebować wysyłki zastępczej, a nie linku do śledzenia.

Konfiguracja zaczyna się od projektu o nazwie Support Agent. Pierwszy plik to brief, czyli opis stanowiska: jak agent sortuje maila, jak pisze odpowiedź i czego nigdy nie robi. Zasady są konkretne. Agent czyta cały wątek, a nie tylko ostatnią wiadomość, i działa według czterech zadań cyklicznych albo poleceń typu uruchom część N. Liczby w nawiasach kwadratowych w briefie to domyślne wartości, które można zmienić.

**Key takeaways:**
- Agent to prompt z rolą, kontekstem i stałą rutyną, a nie jednorazowe pytanie.
- Sprawy o pieniądzach, prawie i złości trafiają do człowieka, a reszta dostaje szkic w Gmailu.
- Raport z każdej godziny ma stałą strukturę i wskazuje, w czym agent jest najmniej pewny.

**Why do I care:** To nie jest materiał o frontendzie, tylko o wzorcu, który da się przenieść: stała rola, jawne reguły eskalacji i raport z poziomem pewności. Autor nie mówi, co się stanie, gdy agent pomyli kategorię i szkic z błędną obietnicą trafi do klienta, a to jest główne ryzyko. Wersja ze szkicami w Gmailu, bez automatycznej wysyłki, jest rozsądnym kompromisem.

**Link:** [Tutorial: build an AI agent that handles customer support](https://theaibreak.substack.com/p/tutorial-build-an-ai-agent-that-handles)
