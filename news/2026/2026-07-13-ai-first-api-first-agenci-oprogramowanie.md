---
title: "AI-first to API-first: jak agenci zmieniają zasady zakupu oprogramowania"
excerpt: "Wbudowane funkcje AI w SaaS-ach to ślepy zaułek. Liczy się to, czy agenci mogą operować Twoim oprogramowaniem z zewnątrz przez API."
publishedAt: "2026-07-13"
slug: "ai-first-api-first-agenci-oprogramowanie"
hashtags: "#tech #ai #startup #saas #agents #mcp #generated #pl"
source_pattern: "TheCircuit"
---

## AI-first to API-first

**TLDR:** Wbudowane funkcje AI w oprogramowaniu SaaS to nie jest przewaga konkurencyjna, którą warto kupować. Liczy się to, czy Twoi agenci AI mogą operować danym narzędziem przez API tak sprawnie, jak robi to człowiek. Oprogramowanie ma dziś dwóch użytkowników: ludzi i agentów.

**Podsumowanie:**

W 2026 roku trudno otworzyć jakikolwiek produkt SaaS bez natknięcia się na ikonkę sparkle, przycisk "draft with AI" i pasek boczny czatu przyklejony do prawej krawędzi ekranu. Vendorzy budują swoje dema właśnie wokół tych funkcji. Tymczasem autor stawia tezę, która brzmi jak herezja: te funkcje będą deprecated w niedalekiej przyszłości. Nie dlatego, że są złe technicznie, ale dlatego, że są źle umiejscowione w architekturze przyszłości.

Dan Shipper, CEO Every, sformułował tę myśl dobitnie w podcaście Lenny'ego: praca migruje z indywidualnych aplikacji do środowisk natywnych dla agentów, takich jak Codex czy Claude Code. Każda "połowiczna AI" zamknięta w jednej aplikacji konkuruje z agentem pierwszej klasy siedzącym ponad wszystkimi aplikacjami i znającym pełny kontekst użytkownika. To nie jest fair fight. Wbudowana AI w CRM-ie nigdy nie pokona agenta, który wie, co masz w mejlach, kalendarzu i repozytorium kodu jednocześnie.

To zmienia fundamentalnie kryteria wyboru oprogramowania. Autor opisuje swój wybór CRM-a, Attio, jako przykład: kluczowym kryterium był oficjalny serwer MCP z pierwszą klasą wsparcia. Podobnie z oprogramowaniem księgowym, które jest API-first z założenia, co pozwala agentom ciągnąć transakcje, dopasowywać paragony i flagować niezgodności bez ręcznej interwencji. Vendorzy, którzy potrafią dostarczyć dobry konektor MCP, to zazwyczaj ci, którzy zbudowali swoje oprogramowanie API-first. Ci, którzy tego nie zrobili, mają głębszy problem: ich produkt nie ma warstwy, której agent może się uchwycić.

Ekrany nie znikają, ale zmienia się ich rola. Zamiast być warsztatem pracy, stają się centrum weryfikacji. Agent pracuje przez API, człowiek weryfikuje przez ekran. Interfejs pokazuje, co się zmieniło i dlaczego, z opcją zatwierdzenia lub cofnięcia. Bottleneck nie jest po stronie agentów, ale po stronie naszej zdolności do przetwarzania informacji i recenzowania wyników. Dobre projektowanie ekonomizuje na uwadze człowieka.

Autor proponuje trzy pytania do każdego narzędzia w stacku: czy agenci mogą robić pracę, którą chcę im oddać, a każda ważna akcja jest wystawiona przez API lub MCP? Czy mogę łatwo zweryfikować, co agent zrobił i jak pracował, widząc logi i ścieżkę audytu? I wreszcie: gdyby vendor nie dostarczył konektora, czy mój agent mógłby zbudować go samodzielnie? Z solidnym API to kwestia jednego popołudnia. Bez API żaden AI magic nie uratuje narzędzia.

**Key takeaways:**

- Wbudowane funkcje AI w SaaS są strategicznie nieistotne, bo agenci zewnętrzni z pełnym kontekstem je pokonają
- Kryterium zakupu oprogramowania powinno być: jak dobrze agenci mogą z nim operować przez API
- MCP (Model Context Protocol) to praktyczny test: vendor, który potrafi dostarczyć dobry serwer MCP, zbudował produkt API-first
- Ekrany przechodzą transformację: z warsztatu pracy do centrum weryfikacji i zatwierdzania
- Nie każdy workflow agentowy potrzebuje weryfikacji ludzkiej: praca o niskiej wartości to throughput i koszt, praca za którą odpowiadasz wymaga pętli z człowiekiem
- "Loop around the human" to dominujący wzorzec dla pracy wysokiej wartości: odpowiedzialna osoba w centrum, maszyny owijają się wokół jej osądu

**Why do I care:** Z perspektywy architekta frontendowego ta teza ma bezpośrednie przełożenie na to, co budujemy. Interfejsy użytkownika będą coraz częściej panelami weryfikacji, a nie panelami wejścia danych. To zmienia priorytety: historia operacji, audit trail, możliwość rollbacku, czytelna wizualizacja tego co agent zrobił i dlaczego. Jeśli projektujesz produkt na 2027 rok bez myślenia o tym, jak agent będzie go używał przez API, projektujesz dla połowy swojej przyszłej bazy użytkowników. To poważny błąd architektoniczny, który trudno naprawić post factum.

**Link:** [AI-first is API-first](https://metacircuits.substack.com/p/ai-first-is-api-first)
