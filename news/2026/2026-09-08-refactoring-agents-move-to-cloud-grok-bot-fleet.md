---
title: "Moje agenty przenoszą się do chmury: jak Luca Rossi zamienił jednego mega-agenta na flotę pięciu"
excerpt: "Comiesięczny wpis Luki Rossiego o rozwoju Tolarii: dlaczego lokalny Mac Mini przestaje wystarczać do pracy agentów, jak Grok Bot od zespołu Cursora ułatwił migrację do chmury, i jak jeden Chief of Staff zmienił się w zespół pięciu wyspecjalizowanych botów."
publishedAt: "2026-09-08"
slug: "refactoring-agents-move-to-cloud-grok-bot-fleet"
hashtags: "#refactoring #ai #agents #architecture #productivity #generated #pl"
source_pattern: "🌀 Refactoring"
---

## Agenty przenoszą się do chmury z tego samego powodu, co kiedyś aplikacje

**TLDR:** Luca Rossi opisuje, jak przeniósł większość pracy swoich agentów AI z lokalnego Mac Mini do chmury za pomocą Grok Bot, narzędzia od zespołu Cursora pozwalającego uruchamiać agenty na maszynach wirtualnych w Linuxie. Zamiast jednego agenta robiącego wszystko, ma teraz flotę pięciu wyspecjalizowanych botów.

**Summary:** Punktem wyjścia jest obserwacja, że lokalne uruchamianie agentów, na własnym Mac Mini czy laptopie, zaczyna przypominać hostowanie własnych serwerów pod biurkiem sprzed ery chmury obliczeniowej, czyli coś, co większość z nas dawno przestała robić dla zwykłych aplikacji. Autor przewiduje, że to samo stanie się z agentami AI: lokalne uruchomienie dobrego agenta na swoim własnym komputerze zawsze będzie miało sens, ale skalowanie do wielu agentów pracujących równolegle nieuchronnie przenosi się do chmury, z tych samych powodów co migracja aplikacji: łatwość replikacji, jednorazowość środowisk, wygodny dostęp mobilny i długi ogon usprawnień jakości życia. Decydującym impulsem był dla niego Grok Bot, środowisko od twórców Cursora, gdzie nowe agenty od razu startują na maszynach wirtualnych w Linuxie z dostępem do przeglądarki i możliwością instalowania czegokolwiek, bez ręcznego składania SSH, Tailscale, Termiusa i kontenerów za każdym razem. Rossi przeniósł tam całą pracę agentową poza samym kodowaniem, które zostawił lokalnie na Codexie.

Najciekawszą zmianą organizacyjną jest przejście od jednego agenta o imieniu Brian, będącego Chief of Staff dla całego jego życia zawodowego, do floty pięciu wyspecjalizowanych botów. Brian z czasem robił zbyt wiele naraz: zarządzanie produktem dla Tolarii, obsługę różnych zadań dla Refactoring i koordynację prywatnego kalendarza jednocześnie, więc Rossi rozdzielił te obowiązki. Brian zostaje Chief of Staff i codziennie przysyła brief poranny oraz podsumowanie wieczorne, zbierając dane z zadań, maila, kalendarza i Slacka. Kolejny agent przejął zarządzanie produktem dla Tolarii z dostępem do PostHog, Sentry, Githuba, Canny'ego i wzmianek w mediach społecznościowych, triażując i specyfikując zgłoszenia na tablicy kanban. Trzeci jest redaktorem naczelnym: pomaga w researchu przed pisaniem artykułów i daje feedback po napisaniu draftu, choć same teksty Rossi wciąż pisze ręcznie. Sponsy zajmuje się operacjami wokół sponsoringu newslettera, a najnowszy dodatek, Grow, śledzi metryki zdrowia newslettera (open rate, wzrost, click rate) i pomaga przy kampaniach reklamowych, w tym imporcie nowych subskrybentów z kampanii do Substacka.

Na poziomie produktowym Tolaria ma teraz działający prototyp na iPada zbudowany w React Native, uniwersalną aplikację działającą też na tabletach z Androidem w symulatorze, choć wciąż brakuje integracji z Gitem, co autor określa jako szczególnie trudny problem do rozwiązania w najbliższych tygodniach. Rozważa też wersję webową Tolarii, samohostowalną, ale też dostępną jako usługa zarządzana, co ułatwiłoby udostępnianie plików na wzór Google Docs i dostęp z dowolnego miejsca bez potrzeby aplikacji natywnej, a przy okazji mogłoby stać się osobnym modelem biznesowym.

**Key takeaways:**
- Grok Bot od zespołu Cursora pozwala uruchamiać agenty na maszynach wirtualnych w chmurze z dostępem do przeglądarki, bez ręcznej konfiguracji SSH czy Tailscale.
- Jeden agent (Brian, Chief of Staff) rozdzielony na pięć wyspecjalizowanych botów: Chief of Staff, product management, redakcja, sponsoring i metryki wzrostu newslettera.
- Prototyp Tolarii na iPada działa w React Native jako aplikacja uniwersalna, ale integracje z Gitem wciąż brakuje.
- Rozważana jest wersja webowa Tolarii, samohostowalna i jednocześnie dostępna jako usługa zarządzana.

**Why do I care:** Warto śledzić ten wzorzec niezależnie od tego, czy używacie akurat Grok Bota, bo przejście od jednego mega-agenta do zespołu wąsko wyspecjalizowanych botów to ten sam instynkt architektoniczny, który znamy z podziału monolitu na dobrze wyodrębnione serwisy, tylko zastosowany do własnego workflow. Jeśli dziś macie jednego asystenta AI robiącego wszystko naraz, od zarządzania zadaniami po pisanie kodu, warto zapytać, czy rozdzielenie go na kilka węższych ról z jasno przypisanym zakresem odpowiedzialności nie dałoby lepszych wyników, zamiast czekać, aż jeden agent zacznie się gubić pod nadmiarem kontekstu.

**Link:** [My agents are moving to the cloud ☁️](https://refactoring.fm/p/my-agents-are-moving-to-the-cloud)
