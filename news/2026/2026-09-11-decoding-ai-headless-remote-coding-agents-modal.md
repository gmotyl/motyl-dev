---
title: "Decoding AI: przestań niańczyć swoje agenty kodujące, wyślij je w tło"
excerpt: "Jak zamienić agenta kodującego z TUI wymagającego twojej obecności w terminalu w headless proces uruchamiany zdalnie na Modal, wywoływany przez CLI, webhooka lub cron, i odpalający kilka niezależnych prób równolegle."
publishedAt: "2026-09-11"
slug: "decoding-ai-headless-remote-coding-agents-modal"
hashtags: "#decodingai #ai #agents #architecture #devops #generated #pl"
source_pattern: "Decoding AI"
---

## Przestań niańczyć swoje agenty kodujące

**TLDR:** Autor, budując automatyzacje dla własnego newslettera i asystenta osobistego, skończył z pięcioma równoległymi agentami kodującymi wymagającymi jego obecności w terminalu; prawdziwym problemem nie była liczba agentów, tylko konieczność ich niańczenia, więc przebudował własny harness na headless proces uruchamiany zdalnie.

**Summary:** Cel, który autor sobie stawia, to agenty działające w tle w pipeline CI/CD albo pobierające zgłoszenia z Linear w nocy, uruchamiające kilka równoległych prób i zostawiające najlepszy PR do porannego przeglądu, zamiast blokowania pracy za interfejsem TUI wymagającym ciągłej uwagi. Żeby to osiągnąć bez wyrzucania pieniędzy w gotowe usługi, przebudował własny harness (Decode) w trzech krokach: zamiana TUI na interfejs CLI, wdrożenie na Modal jako zadania serverless oraz dodanie obsługi równoległych sesji dla wielu projektów naraz.

Kluczowa decyzja architektoniczna to rozdzielenie warstwy aplikacji (pętli agenta) od warstwy serwującej (TUI kontra CLI), co pozwoliło dodać nowy tryb serwowania bez ruszania logiki agenta. W trybie headless wszystko domyślnie działa w trybie pomijania uprawnień, narzędzie pytania użytkownika staje się no-opem, a pełne ślady trafiają wyłącznie do platformy obserwowalności zamiast na stdout. To niemal dokładnie ten sam wzorzec co interfejs `claude -p "<cel>"` w Claude Code, tylko zbudowany od zera na własnej infrastrukturze.

Wdrożenie na Modal eliminuje najbardziej frustrujący problem lokalnego uruchamiania agentów: zamknięcie laptopa kończy sesję. Zamiast utrzymywać własny serwer, autor stworzył wyraźną granicę między tym, kto wywołuje harness (laptop, cron, webhook), a tym, gdzie się wykonuje (kontenery Modal bez kosztu przy bezczynności). Trzy sposoby wywołania, wszystkie wpięte w tę samą aplikację Modal, to bezpośrednie polecenie CLI, webhook POST z Slacka czy Telegrama oraz harmonogram cron podłączony do Linear albo Notion. Każda próba klonuje repozytorium do własnego sandboksa, implementuje zgłoszenie, commituje i wypycha branch `decode/<session-id>`, opcjonalnie otwierając PR, dzięki czemu przeglądasz gotową pracę, a nie obserwujesz agenta w trakcie działania. Ramp używa dokładnie tej strategii w produkcji z kolejką routingu i blokadami sesji, a mniej więcej połowa scalanych PR-ów tej firmy fintech powstaje w ten sposób.

Autor porównuje też koszt serverless z hyperscalerami: Modal wypada droższy od RunPod, ale tańszy od Lambda i zdecydowanie tańszy od AWS on-demand, a przy tym płacisz zero, kiedy nic się nie dzieje. Dla małych zespołów czy wczesnych projektów to zwykle lepszy start niż inwestowanie czasu we własną infrastrukturę GPU, którą i tak trzeba będzie monitorować i skalować ręcznie.

**Key takeaways:**
- Rozdzielenie warstwy aplikacji (pętla agenta) od warstwy serwującej (TUI/CLI) pozwala dodawać nowe tryby uruchamiania bez zmiany logiki agenta.
- Trzy triggery (CLI, webhook, cron) wpięte w jedną aplikację Modal obsługują ręczne uruchomienia, integracje czatowe i nocne przetwarzanie ticketów.
- Ramp scala około połowy swoich PR-ów przez podobną architekturę kolejki routingu z blokadami sesji.

**Why do I care:** To praktyczny przepis dla każdego architekta, który chce przejść od agenta wymagającego ciągłej uwagi w terminalu do rzeczywistego systemu produkcyjnego, bez kupowania gotowej platformy agentowej. Wzorzec rozdzielenia interfejsu od logiki agenta i budowy wokół niego wielu triggerów to dokładnie ten rodzaj decyzji projektowej, która zwraca się po kilku tygodniach, kiedy zespół przestaje pytać „kto akurat patrzy na terminal z agentem” i zaczyna po prostu przeglądać gotowe PR-y rano.

**Link:** [Stop Babysitting Your Coding Agents](https://www.decodingai.com/p/coding-agents-in-remote-headless)