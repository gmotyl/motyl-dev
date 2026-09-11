---
title: "Remix Jam 2026: agent experience, unbundling i \"The Remix Way\" w Toronto"
excerpt: "Zespół Remixa ogłosił harmonogram dorocznej konferencji w Toronto (2 października), z naciskiem na Remix 3 budowany dla ludzi i ich agentów kodujących, serwer bez etapu bundlowania i lekcje z roku pracy agentów AI nad kodem frameworka."
publishedAt: "2026-09-11"
slug: "remix-jam-2026-toronto-agent-experience-unbundling"
hashtags: "#remixrun #react #webdev #ai #generated #pl"
source_pattern: "Remix newsletter"
---

## Remix Jam 2026 wraca do Toronto z naciskiem na agenty

**TLDR:** Doroczna konferencja zespołu Remixa odbędzie się 2 października w Toronto, a jej oś stanowi Remix 3, framework opisywany jako budowany „dla ciebie i twoich agentów”, z osobnym wystąpieniem poświęconym temu, jak agenty kodujące faktycznie korzystają z Remixa po ponad roku testów.

**Summary:** Harmonogram otwiera Michael Jackson, współtwórca Remixa i React Routera, wystąpieniem o samym Remix 3: framework przebudowany tak, żeby każdy element, od serwera po przeglądarkę, był szybszy, mniejszy i łatwiejszy w użyciu, przy założeniu, że coraz większą część kodu piszą agenty, a nie ludzie. Po sesji pytań i odpowiedzi Mark Dalgleish, współtwórca CSS Modules i Vanilla Extract, opowie o „Remix Unbundled”, czyli serwerze zasobów kompilującym TypeScript, JSX, CSS i pliki statyczne na żądanie, bez etapu bundlowania przed startem produkcyjnego serwera, ale bez rezygnacji z doświadczenia dewelopera, do którego przyzwyczaiło nas nowoczesne tooling.

Najciekawiej zapowiada się wystąpienie Brooksa Lybranda, szefa developer relations dla Remixa w Shopify, zatytułowane „How Do Agents Experience Remix?”. Punktem wyjścia jest zasada „Model-First Development”, najbardziej kontrowersyjna z zasad ogłoszonych przy starcie Remix 3: framework ma być łatwy do zrozumienia nie tylko dla ludzi, ale też do generowania, nawigowania i modyfikowania przez duże modele językowe. Po ponad roku używania agentów kodujących w realnych projektach Remixa, od budowy Remix Store po migrację remix.run z Reacta, Lybrand pokaże, gdzie te wzorce i abstrakcje pomagają agentom, a gdzie im przeszkadzają, i jak te obserwacje realnie wpływają na kształt frameworka.

Popołudniowa część programu rozszerza ten wątek: Matt Brophy opowie o tym, jak Remix wychodzi poza granicę serwera dzięki frames (przyrostowa nawigacja i granularne aktualizacje regionów należących do konkretnej trasy) oraz pakietowi SPA uruchamiającemu trasy Remixa całkowicie po stronie klienta, a Sergio Xalambrí pokaże, jak filozofia Remixa rozrosła mu się w cały stack, od i18n po e-mail i komponenty UI, zbudowany wokół platformy webowej. Dzień zamyka Josh Sanger pytaniem, co przeglądarka powinna właściwie robić sama, opowiadając o tym, jak kolejne edycje Shopify systematycznie przenoszą odpowiedzialność z przeglądarki gdzie indziej.

**Key takeaways:**
- Remix 3 jest budowany wokół zasady „Model-First Development”, czyli optymalizacji frameworka pod zrozumiałość dla agentów AI, nie tylko dla ludzi.
- „Remix Unbundled” eliminuje etap bundlowania przed startem produkcyjnym, kompilując zasoby na żądanie.
- Ponad rok realnego użycia agentów kodujących w projektach Remixa (Remix Store, migracja remix.run) już wpływa na decyzje projektowe we frameworku.

**Why do I care:** Zasada „Model-First Development” to konkretna odpowiedź na pytanie, które coraz częściej pojawia się w zespołach frontendowych: czy warto projektować API i strukturę projektu pod kątem czytelności dla agentów kodujących, a nie tylko dla ludzi. Wystąpienie Lybranda o realnych obserwacjach z ponad roku pracy agentów nad kodem Remixa to rzadka okazja zobaczyć twarde dane zamiast spekulacji na ten temat, warto śledzić nagranie ze streamu, nawet jeśli nie wybierasz się do Toronto.

**Link:** [Remix Jam 2026](https://remix.run/jam/2026)