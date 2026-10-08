---
title: "Twórcy Kubernetesa budują 'cloud-native harness' dla agentów kodujących"
excerpt: "Stacklok, założony przez twórców Kubernetesa Craiga McLuckiego i Joego Bedę, przenosi pętlę agenta do chmury, oddzielając ją od lokalnego wykonywania narzędzi i stanu sesji."
publishedAt: "2026-10-08"
slug: "stacklok-mecatl-cloud-native-agent-harness"
hashtags: "#latent #ai #agents #architecture #kubernetes #generated #pl"
source_pattern: "Latent.Space"
---

## Twórcy Kubernetesa przenoszą agenty kodujące do chmury

**TLDR:** Craig McLuckie i Joe Beda, współtwórcy Kubernetesa, budują w Stacklok otwartoźródłowy "cloud-native harness" o nazwie Mecatl, który oddziela pętlę agenta od lokalnego wykonywania narzędzi i przechowywania stanu sesji. Firma, znana wcześniej z platformy ToolHive do zarządzania serwerami MCP, celuje w duże organizacje, które chcą zarządzać agentami kodującymi tak, jak zarządzają pocztą firmową, zamiast polegać na harnessach zaprojektowanych do pracy na pojedynczym laptopie.

**Summary:** Podstawowa architektura agenta kodującego jest prosta: model językowy wywołuje narzędzia w pętli, niosąc przy tym kontekst. Ponieważ najłatwiej zaimplementować to lokalnie, większość agentów kodujących zaczynała jako narzędzia terminalowe, a potem aplikacje desktopowe, Claude Code słynnie zaczynał jako CLI. Problem w tym, że harness zbudowany do działania na jednym procesie na jednym laptopie trudno skalować na zespół inżynieryjny liczący tysiące osób. Zarówno OpenAI, jak i Anthropic próbują od 2025 roku przenosić swoje harnessy bardziej w stronę chmury, z różnym skutkiem, a wyzwania obejmują utrzymanie niezawodności sesji, izolację wykonywania narzędzi i zachowanie kontekstu.

McLuckie i Beda widzą w tym paralelę do orkiestracji kontenerów sprzed dekady, z której wyłonił się Kubernetes jako dominujący system open source do wdrażania aplikacji w chmurze na dużą skalę. Kubernetes używa pętli kontrolnych, żeby utrzymywać aplikacje przy życiu, odzyskiwać się po awariach i skalować w razie potrzeby, więc postawili pytanie, czy agenty kodujące dałoby się zarządzać w ten sam sposób. Stacklok, który zebrał 17,5 miliona dolarów rundy Series A w 2023 roku z Accel, Madrony i Bain Capital, pierwotnie skupiał się na bezpieczeństwie łańcucha dostaw oprogramowania, zanim przestawił się na rozwiązania agentowe oparte na Kubernetesie. Najciekawszym produktem jest Mecatl, projekt open source rozpoczęty w czerwcu, którego nazwa to azteckie słowo oznaczające linę, nawiązujące do koncepcji "cattle vs pets" znanej z kultury Kubernetesa.

Beda tłumaczy różnicę wobec istniejących harnessów w ten sposób: w rozwiązaniach zaprojektowanych do pracy na desktopie pętla agenta, lokalne wykonywanie i stan sesji zaczynają się zwykle w tym samym procesie. Nawet jeśli taki harness ma możliwość podmiany komponentów, cała architektura wciąż jest jednym procesem albo ciasno powiązanym zestawem procesów zbudowanym do działania lokalnie. Próba przeniesienia tego do chmury przez proste umieszczenie w maszynach wirtualnych czy kontenerach tworzy problemy z cyklem życia agenta i możliwością bezpiecznego wstrzymania go w oczekiwaniu na input człowieka. Mecatl zamiast tego trzyma pętlę agenta niezależną od klienta, dostawcy modelu, miejsca przechowywania stanu i środowiska wykonywania, co pozwala oddzielić zarządzanie sesją i pamięcią od zwykłych plików JSONL na dysku i przenieść je do systemów, którymi da się zarządzać centralnie.

Po pivocie w stronę infrastruktury agentowej Stacklok zbudował ToolHive, platformę open source do uruchamiania i zarządzania serwerami MCP, która zaczynała jako sposób na zarządzanie serwerami MCP w kontenerach Docker na desktopie, a rozrosła się do bramy opartej na Kubernetesie z rejestrem i operatorem pomagającym w uwierzytelnianiu i autoryzacji wejścia-wyjścia. Kolejnym krokiem jest AI Gateway, jedyny główny produkt, którego Stacklok jeszcze nie otworzył, skupiony na kontroli dostępu, budżetach, raportowaniu i routingu do dostawców modeli, a nie na dynamicznym wyborze modelu do zadania jak u konkurencyjnego Gleana. Większość klientów to banki, firmy półprzewodnikowe i telekomy, czyli branże regulowane, dla których kontrola kosztów i dostępu jest priorytetem ważniejszym niż inteligentny routing. Model biznesowy opiera się na "enterprise spine", czyli płaszczyźnie kontrolnej spinającej otwartoźródłowe komponenty wspólną tożsamością, autoryzacją, polityką i audytem.

**Key takeaways:**
- Mecatl oddziela pętlę agenta od klienta, dostawcy modelu, przechowywania stanu i środowiska wykonywania, co ma umożliwić zarządzanie na poziomie klastra zamiast pojedynczego procesu.
- Większość istniejących harnessów, mimo pluggable architektury, wciąż zakłada jeden proces lub ciasno powiązany zestaw procesów zaprojektowany do pracy lokalnej.
- ToolHive, wcześniejszy produkt Stacklok, ewoluował z lokalnego narzędzia do zarządzania serwerami MCP w kontenerach Docker do bramy opartej na Kubernetesie z rejestrem i operatorem.
- Głównymi klientami są organizacje regulowane, takie jak banki czy telekomy, dla których kontrola dostępu i budżetu do modeli jest ważniejsza niż automatyczny wybór najlepszego modelu.
- Model biznesowy Stacklok to otwartoźródłowe komponenty plus komercyjna warstwa tożsamości, autoryzacji i audytu spinająca je razem.

**Why do I care:** Jeśli Twoja firma już teraz zmaga się z tym, jak dać dziesiątkom czy setkom inżynierów dostęp do agentów kodujących bez utraty kontroli nad tym, co te agenty robią z firmowym kodem i danymi, to dokładnie ten problem próbuje rozwiązać Stacklok. Warto śledzić Mecatl i ToolHive, zanim zdecydujesz się budować własne rozwiązanie do zarządzania agentami na poziomie organizacji, bo konsolidacja wokół Kubernetesa jako warstwy zarządzania agentami wydaje się naturalnym kierunkiem dla zespołów platformowych, które i tak już operują na tym stosie.

**Link:** [Can a Cloud-Native Harness Make Agents Reliable Beyond the Desktop?](https://www.latent.space/p/stacklok)
