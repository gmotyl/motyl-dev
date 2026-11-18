---
title: "ARTEX, PHP2Shell i fala awarii: jak zabezpieczyć się, gdy atakują agenci AI"
excerpt: "FBI ostrzega przed narzędziem ARTEX, w którym agenci AI automatyzują włamania, a do tego wyszła łatka na dwie krytyczne luki w PHP."
publishedAt: "2026-11-18"
slug: "artex-agenci-ai-wlamania-php2shell-awarie"
hashtags: "#techtiff #security #ai #agents #php #wordpress #devops #generated #pl"
source_pattern: "TechTiff"
---

## Gdy wszystko przestaje działać: ARTEX i PHP2Shell

**TLDR:** FBI wydało alert FLASH o ARTEX, otwartym narzędziu, w którym zespół agentów AI automatyzuje włamanie od pierwszego skanu po kradzież danych. Równolegle wyszły poprawki PHP 8.5.12, 8.4.27, 8.3.36 i 8.2.35 usuwające dwie luki PHP2Shell.

**Summary:** Autorka zaczyna od serii awarii. Outlook padł 12 listopada, FAA wstrzymała wszystkie odloty następnego dnia, banki od Wielkiej Brytanii po Japonię miały przerwy, a 17 listopada NSA zgłosiła zakłócenia w sieci niejawnej. Żadnej z nich nie przypisano ARTEX, ale równolegle atakujący zaczęli używać agentów do zautomatyzowanych włamań, a w części incydentów agenci osiągali uprzywilejowany dostęp w niecałe trzy godziny.

ARTEX przyjmuje cel zapisany prostym językiem i rozdaje go zespołowi agentów, którzy rozpoznają cel, szukają słabości, włamują się, podnoszą uprawnienia i wynoszą dane. Napisano go w Go, a podłącza się do zewnętrznego modelu, od Claude'a i GPT po DeepSeek, GLM, Grok i Kimi. Według FBI większość konfiguracji napastników działa na modelach DeepSeek Flash. Twórca wrzucił go na GitHub w lipcu i usunął repozytorium 8 października, ale forki, lustra i płatna wersja PRO nadal krążą. FBI naliczyło ponad 1600 publicznie dostępnych paneli sterowania. Atakuje głównie portale partnerów, backendy aplikacji mobilnych, aplikacje pracownicze i integracje trzecich stron. Microsoft powiązał go z incydentem z ConnectWise, w którym grupa związana z Chinami użyła zaufanych aplikacji do prób logowania do ponad 2250 środowisk Microsoft 365.

Rady są praktyczne. Przejrzyj aplikacje podłączone do kont Google, Microsoft i GitHub i cofnij zbędne uprawnienia. Włącz passkeys w poczcie, u rejestratora domeny, hostingu i płatnościach. Poproś agenta kodującego o skan sekretów w kodzie i historii gita, a potem o przegląd wszystkich endpointów pod kątem autoryzacji po stronie serwera, limitów zapytań i zbyt szczegółowych błędów. Jeśli prowadzisz WordPressa, zaktualizuj PHP, bo PHP 8.2 kończy wsparcie 31 grudnia. Na koniec uwaga o oszustach: podczas awarii Microsoftu krążyły fałszywe maile o wstrzymanych wiadomościach z prawdziwym numerem incydentu.

**Key takeaways:**
- ARTEX automatyzuje cały łańcuch ataku z użyciem zewnętrznych modeli.
- Wchodzi przez zaufane aplikacje i integracje dostawców.
- Poprawki PHP2Shell są jedynym bezpiecznym wyjściem.
- Podczas awarii wpisuj adres strony statusu ręcznie.

**Why do I care:** Dla zespołów frontendowych i fullstackowych najważniejsze są dwie rzeczy: autoryzacja na serwerze oraz higiena integracji OAuth. Prompty do skanowania kodu agentem są użyteczne, ale pamiętajcie, że agent bez ludzkiej weryfikacji też się myli. Brakuje w tekście danych, ile realnych włamań przypisano ARTEX, więc skala zagrożenia opiera się głównie na komunikacie FBI.

**Link:** [When Everything Goes Offline](https://techtiff.substack.com/p/fbi-artex-warning-ai-security-prompts)
