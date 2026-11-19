---
title: "Kilo: rozliczenia przez Claude Platform bez klucza API i lokalne duże modele na Dell Pro Precision z GB10"
excerpt: "Kilo pozwala podpiąć organizację Claude zamiast wklejać klucz API, a Kilo Desktop z Anacondą uruchamia duże otwarte modele lokalnie na maszynie z chipem GB10."
publishedAt: "2026-11-18"
slug: "kilo-linked-billing-claude-platform-lokalne-ai-gb10"
hashtags: "#kilo #ai #llm #agents #devtools #dx #python #generated #pl"
source_pattern: "Kilo"
---

## Linked billing: Claude w Kilo bez klucza API

**TLDR:** Administrator łączy organizację Claude Platform z Kilo raz, a Anthropic rozlicza użycie bezpośrednio na tej organizacji. Nikt nie wkleja, nie udostępnia ani nie rotuje klucza.

**Summary:** Do tej pory używanie Claude w Kilo oznaczało założenie klucza API, wklejenie go do narzędzia i pilnowanie go przy każdej zmianie w zespole. W becie linked billing admin raz łączy organizację Claude Platform z Kilo i zatwierdza połączenie. Od tej chwili Anthropic rozlicza użycie Claude API w Kilo na koncie organizacji, na dotychczasowych warunkach.

Kilo nie przechowuje wtedy żadnego klucza organizacji. Miesięczny limit wydatków ustawia się w konsoli Claude, a połączenie można w każdej chwili zerwać. Finanse widzą zużycie na rachunku od Anthropic, który firma już ma. Działa to dla organizacji rozliczanych bezpośrednio przez Anthropic i obejmuje Kilo Desktop, agentów w chmurze i CLI. Konfiguracja jest na stronie BYOK w organizacji Kilo, na karcie Claude z linked billing. Claude jest tam jednym z ponad pięciuset modeli, więc nadal można przełączać się na inny tam, gdzie lepiej wychodzi koszt.

**Key takeaways:**
- Koniec z kluczami API do Claude rozsyłanymi po zespole.
- Limit miesięczny ustawiany po stronie Anthropic, odpięcie w dowolnym momencie.
- Funkcja jest w becie i dotyczy tylko organizacji rozliczanych bezpośrednio przez Anthropic.

**Why do I care:** Wyciekły klucz API w repozytorium to nudna, ale częsta awaria. Podejście z jednorazowym połączeniem organizacji upraszcza onboarding i offboarding, bo odebranie dostępu nie wymaga rotacji. To bardziej sprawa platformy i bezpieczeństwa niż samego kodowania, ale dla lidera zespołu to realna oszczędność nerwów.

**Link:** [Kilo now supports linked billing with Claude Platform](https://blog.kilo.ai/p/kilo-now-supports-linked-billing)

## Duże modele, mały ślad: lokalne AI w Kilo Desktop

**TLDR:** Anaconda i Kilo Desktop dają kompletny stos do pracy z modelami lokalnymi na Dell Pro Precision z chipem NVIDIA GB10. Wszystko od środowisk conda po agenta w notebooku działa na jednym biurkowym urządzeniu.

**Summary:** GB10 łączy procesor Grace oparty na Arm z GPU Blackwell i wspólną pulą 128 GB pamięci, dzięki czemu na biurku mieści się model, który wcześniej wymagał serwerowni. Sprzęt to jednak połowa historii. Potrzebny jest jeszcze Python, paczki zbudowane pod architekturę Arm64 i miejsce, gdzie model można uruchomić. Anaconda buduje Pythona, condę i paczki takie jak NumPy, pandas, PyTorch czy scikit-learn natywnie dla Arm64 Linux.

Kilo Desktop pokazuje środowiska conda w interfejsie, pozwala je tworzyć, dodawać paczki albo importować plik environment.yml bez otwierania terminala. Ten sam plik odtwarza środowisko na laptopie kolegi albo na serwerze w chmurze. Aplikacja pobiera model otwartych wag i startuje lokalny serwer zgodny z API OpenAI, więc kod napisany pod model hostowany zmienia tylko adres bazowy. Agent do kodu i notebooków działa na tych lokalnych modelach, pisze i uruchamia komórki w wybranym środowisku. Dane wrażliwe nie opuszczają maszyny, a za tokeny nie płaci się osobno.

Autorzy pomijają koszt sprzętu i to, jak lokalne modele wypadają jakościowo na tle frontierowych. Tekst jest też wyraźnie komunikatem partnerskim, więc liczby wydajności trzeba dopiero sprawdzić samemu.

**Key takeaways:**
- Natywne paczki Arm64 usuwają typowy ból instalacji na GB10.
- Lokalny serwer modeli z API zgodnym z OpenAI ułatwia przepinanie istniejącego kodu.
- Dane wrażliwe mogą zostać na urządzeniu, ale jakość modeli otwartych trzeba ocenić na własnym zadaniu.

**Why do I care:** Dla mnie ważny jest wzorzec, nie konkretny sprzęt: model lokalny z interfejsem zgodnym z OpenAI to realna droga dla danych, których nie wolno wysłać do chmury. Dla frontendowca to jednak bardziej ciekawostka, bo ta oferta celuje w data science i zespoły ML.

**Link:** [Big Models, Small Footprint: Local AI with Kilo Desktop](https://blog.kilo.ai/p/big-models-small-footprint-local)
