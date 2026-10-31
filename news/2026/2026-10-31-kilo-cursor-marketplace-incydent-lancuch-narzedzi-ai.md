---
title: "Kilo o incydencie na Cursor Marketplace: znaj swój łańcuch narzędzi AI"
excerpt: "Zmodyfikowana wersja rozszerzenia Claude Code trafiła do marketplace'u Cursora i próbowała założyć backdoor SSH, a Kilo wyciąga z tego cztery pytania o każde narzędzie agenta."
publishedAt: "2026-10-31"
slug: "kilo-cursor-marketplace-incydent-lancuch-narzedzi-ai"
hashtags: "#kilo #security #agents #ai #vscode #cursor #devtools #supply-chain #generated #pl"
source_pattern: "Kilo"
---

## Lekcje z incydentu na Cursor Marketplace

**TLDR:** 29 października w marketplace'ie Cursora pojawiła się podmieniona wersja 2.1.313 rozszerzenia Claude Code, której Anthropic nie zbudował. Próbowała założyć trwały backdoor SSH, a Kilo radzi sprawdzić, kto stworzył każde rozszerzenie, MCP i skill w narzędziach AI.

**Summary:** Zmodyfikowana wersja wisiała od około 2:27 do 13:35 czasu pacyficznego i mogło ją zainstalować do 5000 osób. Cursor wycofał ją, zamknął marketplace, zrotował klucze i wyłączył serwer atakującego. Kilo chwali tę reakcję i zwraca uwagę, że sam atak był prosty. Złośliwy build zbierał dane o hoście, dodawał klucz SSH atakującego do authorized_keys, próbował włączyć usługę SSH i otworzyć tunel zwrotny, a potem instalował trwałość przez LaunchAgent na macOS albo zadanie harmonogramu na Windows. Krok z tunelem nie udał się na większości maszyn, bo wymaga uprawnień administratora. Samo odinstalowanie rozszerzenia nie wystarcza, bo payload zostawia skrypty, które dalej działają.

Wniosek jest szerszy niż jeden marketplace. Narzędzia AI mają dziś rosnący stos dodatków, czyli rozszerzenia, serwery MCP, skille i pluginy, a wiele z nich czyta repo, uruchamia komendy i dotyka środowiska. Łańcuch dostaw przeniósł się do edytora. Kilo proponuje cztery pytania o każdy element. Kto to zrobił, co się zmieniło względem wersji, której ufasz, co to robi i do czego ma dostęp. W praktyce chodzi o listę dozwolonych wydawców, przypinanie wersji, uruchamianie edytora bez uprawnień administratora, traktowanie MCP jak zależności i sprawdzanie typowych miejsc trwałości.

Druga połowa tekstu to oferta Kilo. Firma opisuje własne zabezpieczenia i program Cursor Exodus, w którym Kilo Enterprise jest za darmo do końca kontraktu z Cursorem, maksymalnie przez 12 miesięcy. Powód to doniesienia, że OpenAI nie będzie dostarczać przyszłych modeli Cursorowi po jego przejęciu przez SpaceX, a dostęp do modeli OpenAI w Cursorze ma się skończyć 12 listopada 2026. To tekst sprzedażowy, więc wnioski z incydentu warto oddzielić od reklamy.

**Key takeaways:**
- Atak polegał na zaufanej nazwie, nowym numerze wersji i autoaktualizacji.
- Brak uprawnień administratora zablokował najgorszy krok na większości komputerów.
- Odinstalowanie rozszerzenia nie czyści backdoora, trzeba sprawdzić klucz svc-telemetry i zrotować dane dostępowe.
- Cztery pytania o każdy dodatek to dobra lista kontrolna, niezależnie od edytora.

**Why do I care:** To ostrzeżenie dla każdego zespołu, w którym deweloperzy sami instalują rozszerzenia i serwery MCP. Wprowadziłbym listę dozwolonych wydawców i zablokował autoaktualizacje agentowych rozszerzeń. Autor sam jest sprzedawcą alternatywy, więc argument "wszystko jest ryzykowne, ale u nas jest open source" trzeba przyjąć z dystansem. Open source nie chroni przed podmienionym buildem w marketplace'ie.

**Link:** [Know Your AI Toolchain: Lessons from the Cursor Marketplace Incident](https://blog.kilo.ai/p/know-your-ai-toolchain-lessons-from)
