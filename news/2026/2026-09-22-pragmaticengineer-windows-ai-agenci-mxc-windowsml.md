---
title: "Pragmatic Engineer: jak Microsoft wbudowuje agentów AI w Windows, od tożsamości po sandboxing"
excerpt: "Windows dostaje natywną tożsamość dla agentów, centralny rejestr serwerów MCP, mechanizm izolacji o nazwie MXC oraz sprzętowo niezależną warstwę do uruchamiania modeli lokalnie, wszystko w odpowiedzi na malejącą popularność systemu wśród deweloperów."
publishedAt: "2026-09-22"
slug: "pragmaticengineer-windows-ai-agenci-mxc-windowsml"
hashtags: "#pragmaticengineer #ai #agents #architecture #security #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Windows chce być systemem operacyjnym dla agentów, nie tylko dla ludzi

**TLDR:** Microsoft buduje w Windows cztery nowe warstwy pod agentowe AI: natywną tożsamość agentów przez Entra ID, centralny rejestr serwerów MCP (On Device Agent Registry), mechanizm izolacji narzędzi o nazwie Microsoft Execution Containers oraz sprzętowo niezależną warstwę do uruchamiania modeli lokalnie, Windows ML. Wszystko to w tle spadającej popularności Windows wśród deweloperów, gdzie Linux i macOS coraz częściej wygrywają nieformalne ankiety.

**Summary:** Punktem wyjścia artykułu jest niewygodna dla Microsoftu obserwacja: Windows wciąż dominuje wśród zwykłych użytkowników komputerów z około 63% udziału rynkowego, ale wśród deweloperów jego pozycja słabnie. Ankieta Stack Overflow z zeszłego roku pokazała Windows jako pojedynczo najpopularniejszy system, ale z udziałem daleko poniżej szczytu z ery Windows XP. Nieformalna ankieta autorów na X i LinkedIn, obciążona co prawda profilem czytelników Pragmatic Engineer, postawiła Windows na trzecim miejscu za Linuksem, nawet licząc WSL osobno.

Na tym tle Microsoft przedstawił swoją wizję: agentowe AI ma być traktowane jako pierwszorzędny obywatel systemu operacyjnego, nie jako dodatek. Tożsamość agenta działa przez Entra ID i sprawia, że agent pojawia się w Menedżerze zadań jako osobny użytkownik obok człowieka, z pełną obserwowalnością, jaką dotąd mieli tylko ludzcy użytkownicy. Defender, antywirus Microsoftu, staje się „świadomy agentów" i skanuje system pod kątem znanej aktywności agentowej, tak jak dotąd skanował pod kątem wirusów, argument bezpieczeństwa brzmi: nierejestrujący się agent, podszywający się pod zwykłego użytkownika, działa strukturalnie tak jak wirus wykorzystujący legalne mechanizmy systemowe do nielegalnych celów.

Odkrywanie narzędzi przez agenty odbywa się przez On Device Agent Registry (ODR), centralny rejestr, w którym agenty znajdują dostępne serwery MCP, w tym wbudowane konektory do Eksploratora plików czy Ustawień systemowych. Niepotwierdzone przez Microsoft, ale zaobserwowane przez badaczy z Origin Technology, odkrycie jest takie, że ODR nie tylko pośredniczy w rejestracji, ale stawia się jako proxy między klientem a serwerem MCP, co pozwala inspekcjonować cały ruch i wykrywać podejrzane zachowania, choć sam Microsoft na razie tego nie potwierdza wprost.

Trzecim filarem jest izolacja: Microsoft Execution Containers (MXC) to technologia sandboxingu dla narzędzi agentowych, konfigurowana przez polityki JSON opisujące ograniczenia sieciowe, plikowe, UI i wykonawcze. Deweloperzy mogą wybrać poziom izolacji odpowiedni do wrażliwości operacji, od zwykłego procesu, przez sesję, WSL, lekki kontener Hyper-V, aż po pełną maszynę wirtualną, z jasnym kompromisem między szybkością startu a promieniem rażenia w razie problemu. MXC nie implementuje izolacji samodzielnie, tylko spina istniejące technologie kontenerowe, na Macu na przykład korzysta z `seatbelt`, co czyni ją teoretycznie przenośną między systemami.

Ostatnim elementem jest Windows ML, druga próba Microsoftu zbudowania sprzętowo niezależnej warstwy do uruchamiania modeli AI lokalnie, po wcześniejszym DirectML opartym na DirectX 12 i ograniczonym do GPU. Windows ML bazuje na formacie ONNX i pozwala uruchamiać modele na GPU, NPU i CPU od dowolnego producenta sprzętu, ładując dopiero w czasie działania odpowiedni Execution Provider dla konkretnego sprzętu użytkownika, zamiast czekać na aktualizacje sterowników, które przy DirectML potrafiły zająć pół roku, zanim faktycznie trafiły do większości użytkowników.

**Key takeaways:**
- Agent AI w Windows dostaje własną tożsamość przez Entra ID i pojawia się w Menedżerze zadań jako osobny użytkownik, z pełną obserwowalnością jak przy ludziach
- On Device Agent Registry centralizuje odkrywanie serwerów MCP i, według niepotwierdzonych badań, działa też jako proxy inspekcjonujący ruch między klientem a serwerem
- Microsoft Execution Containers dają deweloperom wybór poziomu izolacji, od procesu po pełną maszynę wirtualną, jako świadomy kompromis między szybkością a bezpieczeństwem
- Windows ML, oparte na ONNX, ma zastąpić DirectML jako sprzętowo niezależna warstwa do lokalnych modeli, bez czekania pół roku na aktualizacje sterowników przy nowych optymalizacjach

**Why do I care:** Jeśli budujesz narzędzia agentowe, które mają działać na desktopach klientów korporacyjnych, to warunki gry na Windows właśnie się zmieniają, tożsamość agenta, sandboxing przez MXC i centralny rejestr MCP to konkretne prymitywy, na których administratorzy będą chcieli oprzeć politykę bezpieczeństwa floty urządzeń przez Intune. Warto to śledzić teraz, zanim MXC stanie się wymogiem enterprise, a nie opcjonalnym dodatkiem, bo przepisywanie architektury izolacji narzędzi pod gotowy standard systemowy jest dużo tańsze niż robienie tego pod presją audytu bezpieczeństwa.

**Link:** [How will AI change operating systems? Part 2: Windows](https://newsletter.pragmaticengineer.com/p/windows-and-ai)
