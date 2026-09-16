---
title: "Audyt agentów AI i bezpieczeństwo obroży dla psa: dwie lekcje o zaufaniu"
excerpt: "Aperture daje tożsamość i audyt każdemu żądaniu LLM, a inżynier IoT pokazuje, dlaczego klucz w pamięci flash to fałszywe bezpieczeństwo i jak secure element rozwiązuje to na budżecie mikroamperów."
publishedAt: "2026-09-16"
slug: "hackernoon-ai-agent-auditing-smart-collar-secure-elements"
hashtags: "#HackerNoon #ai #agents #security #iot #generated #pl"
source_pattern: "HackerNoon"
---

## Jak audytować, do czego dostęp mają twoi agenci AI

**TLDR:** Aperture to warstwa proxy dla ruchu LLM, która nadaje każdemu żądaniu tożsamość kryptograficzną przez Tailscale, grupuje powiązane żądania w sesje i pozwala egzekwować polityki, limity kosztów, filtrowanie danych osobowych, dostęp do narzędzi, zanim żądanie w ogóle trafi do dostawcy modelu.

**Summary:** Punkt wyjścia jest praktyczny: agenci tacy jak Claude Code czy Codex mogą wykonać dziesiątki zapytań do LLM w ramach jednego zadania, wywoływać narzędzia i przekazywać dane do jednego lub więcej dostawców, więc pytanie kto wysłał co, do jakiego modelu i gdzie to zostało zalogowane, szybko przestaje mieć oczywistą odpowiedź. Aperture odpowiada na to warstwą tożsamości: każde żądanie routowane przez Aperture niesie kryptograficzny dowód tożsamości z Tailscale, obejmujący login, identyfikator urządzenia i tagi, także dla urządzeń nieludzkich jak runnery CI czy agenci działający w tle. Powiązane żądania grupują się automatycznie w sesje, więc nie trzeba przeglądać rozmowy wiadomość po wiadomości, żeby zobaczyć pełny kontekst kosztów i użytych narzędzi.

Narzędzie zapisuje pełne ciało żądania i odpowiedzi, nagłówki HTTP z ukrytymi wrażliwymi wartościami, liczbę tokenów w podziale na typy, nazwę modelu, czas trwania i użycie narzędzi, wszystko asynchronicznie, więc nie spowalnia pracy agenta. Poziom retencji tych danych jest w pełni konfigurowalny, od pełnego logu po zero, z eksportem do magazynu kompatybilnego z S3 na potrzeby systemu SIEM.

Dostęp do logów jest domyślnie zablokowany i kontrolowany przez system grantów, który może być tak precyzyjny jak pojedynczy adres e-mail albo tak szeroki jak gwiazdka, ze skopowaniem po dostawcy i modelu oraz osobnymi grantami na dostęp do konkretnych narzędzi MCP. Same działania administratorów też są logowane: jeśli ktoś z rolą admina przegląda logi należące do innego użytkownika, ten dostęp trafia do audytowalnego śladu widocznego dla innych administratorów. Egzekwowanie polityk dzieje się jeszcze przed wysłaniem żądania do dostawcy: hooki przed żądaniem mogą wyciąć dane osobowe, zablokować żądanie łamiące politykę danych albo usunąć konkretne deklaracje narzędzi, z konfigurowalnym zachowaniem na wypadek niedostępności samej usługi guardrail.

**Key takeaways:**
- Każde żądanie przez Aperture niesie kryptograficzną tożsamość z Tailscale, także dla urządzeń nieludzkich jak runnery CI.
- Dostęp do logów jest domyślnie zablokowany i kontrolowany przez granty ze skopowaniem po użytkowniku, dostawcy, modelu i narzędziu.
- Polityki, filtrowanie danych osobowych, blokowanie narzędzi, limity kosztów, są egzekwowane przed wysłaniem żądania do dostawcy, nie tylko rejestrowane po fakcie.

**Why do I care:** Pytanie, kto i co robi z naszymi kluczami API do LLM, jest dziś w większości firm bez odpowiedzi, bo agenci mnożą liczbę wywołań szybciej, niż ktokolwiek zdąży to ręcznie przejrzeć. Warstwa proxy z tożsamością i grantami to ten sam wzorzec, który już znamy z API gateway i service mesh, tylko zastosowany do ruchu LLM, i jeśli twoja organizacja pozwala agentom działać z szerokim dostępem do narzędzi, to jest dokładnie ten rodzaj infrastruktury, którego brak zauważysz dopiero po incydencie.

**Link:** [How to audit what your AI agents are accessing](https://hackernoon.com/how-to-audit-what-your-ai-agents-are-accessing)

## Zabezpieczanie inteligentnej obroży dla psa

**TLDR:** Inżynier, który zbudował obrożę IoT dla psów, opisuje, dlaczego przechowywanie klucza kryptograficznego w zwykłej pamięci flash mikrokontrolera to fałszywe bezpieczeństwo, i jak secure element, cykl życia klucza oraz protokoły typu LoRaWAN rozwiązują to na budżecie mikroamperów.

**Summary:** Autor zaczyna od momentu, w którym zorientował się, że jego własny kod jest problemem: symetryczny klucz obroży był przechowywany w pamięci flash, którą da się odczytać za pomocą pięćdziesięciu euro sprzętu i weekendu wolnego czasu. Jak sam to ujmuje, klucz zaszyty w firmware to nie klucz, tylko jego kopia leżąca w otwartym miejscu plus nadzieja, że nikt nie zajrzy. Przypomina przy tym botnet Mirai z 2016 roku, który zbudowano z kamer IP i rejestratorów DVR nie dlatego, że były cenne, tylko dlatego, że miały domyślne hasła i otwarte powłoki.

Rozwiązaniem jest secure element, czyli ten sam rodzaj chipa co w kartach bankowych i kartach SIM: klucz jest generowany wewnątrz chipa albo wgrywany raz podczas personalizacji, i nie istnieje żadna komenda, która go zwróci na zewnątrz. Host wysyła wyzwanie, dostaje podpisaną odpowiedź, a sam sekret nigdy nie opuszcza chipa. Autor faktycznie przetestował to na prawdziwym sprzęcie, zwykłym czytniku kart i zwykłej karcie, wymieniając komendy APDU przez interfejs znany z kart bankowych od dekad.

Najważniejsza teza tekstu dotyczy cyklu życia klucza, a nie samego chipa: produkcja, personalizacja, rotacja i unieważnienie to cztery etapy, z których każdy ma własne tryby awarii niezwiązane z kryptografią. Rotacja klucza wymaga już uwierzytelnionego kanału, co jest problemem jajka i kury, rozwiązywanym albo drugim, dłużej żyjącym kluczem, albo sprzętowym korzeniem zaufania podpisującym przejście. Świat chmury publicznej ma już na to gotowe wzorce: AWS IoT dokumentuje aprowizację just-in-time z certyfikatem roszczenia, gdzie prawdziwa tożsamość urządzenia powstaje dopiero przy pierwszym uruchomieniu w sieci klienta.

Na koniec autor dodaje wątek regulacyjny, który zmienia to z tematu czysto inżynierskiego w wymóg rynkowy: brytyjski PSTI Act zakazuje domyślnych haseł od kwietnia 2024 roku, a unijna delegowana ustawa do dyrektywy o urządzeniach radiowych wprowadziła obowiązkowe wymogi cyberbezpieczeństwa od sierpnia 2025 roku. Urządzenie, które nie potrafi odpowiedzieć na osiem podstawowych pytań o pochodzenie i cykl życia klucza, staje się po prostu niesprzedawalne na rosnącej części rynku.

**Key takeaways:**
- Klucz zaszyty w pamięci flash mikrokontrolera jest czytelny za pomocą taniego sprzętu, secure element trzyma klucz tak, że żadna komenda nie może go zwrócić.
- Cykl życia klucza, produkcja, personalizacja, rotacja, unieważnienie, jest trudniejszym problemem niż sam wybór algorytmu kryptograficznego.
- Regulacje, brytyjski PSTI Act, unijna delegowana ustawa RED, zamieniły te wymogi z dobrej praktyki w warunek dopuszczenia do rynku.

**Why do I care:** To rzadki tekst o bezpieczeństwie IoT, który nie kończy się na "użyj TLS", tylko pokazuje, dlaczego TLS w ogóle nie rozwiązuje problemu fizycznego dostępu do urządzenia. Nawet jeśli nie budujesz sprzętu, warto zapamiętać ramę pytań z końca artykułu, gdzie urodził się klucz, czy urządzenie może go zwrócić, jak wygląda rotacja i unieważnienie, bo te same pytania stosuje się jeden do jednego do sekretów w mikroserwisach i pipeline'ach CI/CD, tylko tam nikt ich zwykle nie zadaje na głos.

**Link:** [Securing a Smart Dog Collar: Secure Elements, Key Lifecycles, and Why TLS Isn't Enough on 5 Microamp](https://hackernoon.com/securing-a-smart-dog-collar-secure-elements-key-lifecycles-and-why-tls-isnt-enough-on-5-microamp)
