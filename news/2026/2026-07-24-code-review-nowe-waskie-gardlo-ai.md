---
title: "Code review jako nowe wąskie gardło: co robią firmy, gdy AI pisze więcej kodu niż da się sensownie sprawdzić"
excerpt: "Wraz z coraz lepszymi modelami AI piszącymi kod, wąskie gardło produkcji software'u przesunęło się z pisania na przeglądanie zmian, a branża gorączkowo szuka na to odpowiedzi."
publishedAt: "2026-07-23"
slug: "code-review-nowe-waskie-gardlo-ai"
hashtags: "#pragmaticengineer #codereview #ai #devtools #inzynieriaoprogramowania #generated #pl"
---

## TLDR
Gergely Orosz opisuje narastający problem w zespołach inżynieryjnych: odkąd modele takie jak Opus 4.5 czy GPT 5.4 zaczęły generować więcej i lepszego kodu, wąskim gardłem produkcji oprogramowania przestało być pisanie, a stało się przeglądanie zmian. W odpowiedzi powstała fala narzędzi do AI code review, od zewnętrznych produktów po rozwiązania budowane wewnętrznie przez duże firmy jak Uber, Cloudflare czy HubSpot. Problem jednak nie został rozwiązany, bo część zespołów po prostu przestała czytać kod z uwagą, gdy AI nie zgłasza uwag.

## Code review jako nowe wąskie gardło: co robią firmy, gdy AI pisze więcej kodu niż da się sensownie sprawdzić
**TLDR:** Wzrost jakości i ilości kodu generowanego przez modele AI przeniósł presję z etapu pisania na etap przeglądu, a firmy odpowiadają na to budując własne narzędzia do zarządzania kolejką review albo sięgając po gotowe produkty. Efekt uboczny to wypalenie recenzentów i coraz częstsze automatyczne klepanie zmian bez realnej weryfikacji.

**Podsumowanie:** Punktem wyjścia artykułu jest obserwacja, którą Orosz zaczął słyszeć od dyrektorów inżynierii mniej więcej w styczniu, gdy modele takie jak Opus 4.5 i GPT 5.4 zaczęły produkować kod na tyle dobry i w takiej ilości, że napisanie zmiany przestało być najwolniejszym elementem cyklu wytwórczego. Bottleneck przesunął się dalej, do fazy code review, bo ludzie po prostu nie nadążają czytać tego wszystkiego z taką samą uwagą co wcześniej.

Odpowiedzią rynku był gwałtowny wysyp narzędzi do automatycznego przeglądu kodu. Od lutego widać eksplozję zarówno eksperymentów, jak i faktycznych wdrożeń dedykowanych produktów typu CodeRabbit, Greptile, Qodo czy SonarQube, które po przejęciu Gitara rozszerzyło swoją ofertę. Do tego dochodzą recenzje wbudowane bezpośrednio w harnessy do kodowania, czyli Claude Code review, Cursor review czy GitHub Copilot review, a także narzędzia, które wcześniej nie zajmowały się przeglądem kodu, ale mają dostęp do kontekstu całej bazy kodu, jak Seer AI od Sentry czy funkcje code review w Linear.

Ciekawszym wątkiem jest to, że duże firmy nie zadowalają się gotowymi produktami i budują własne rozwiązania. Uber stworzył Code Inbox, narzędzie z inteligentnym przydzielaniem recenzentów oraz z tak zwanymi Risk Profiles, które próbują oszacować ryzyko danej zmiany i celowo kierować większą uwagę zespołu na te bardziej niebezpieczne commity. Podobną drogą poszły Cloudflare ze swoim AI Code Reviewer, Faire z narzędziem Fairey oraz HubSpot z Sidekickiem. Wspólnym mianownikiem tych projektów jest wniosek, że integracja gotowego narzędzia zewnętrznego wypadała gorzej niż dopasowane do własnej infrastruktury rozwiązanie in-house.

Orosz zwraca też uwagę na alternatywne podejście, czyli przesunięcie ciężaru z przeglądu na weryfikację, głównie poprzez testy. Brzmi to prosto w teorii, bo dobrze przetestowany kod nie wymaga aż tak wnikliwego czytania przez człowieka. W praktyce pojawia się jednak cała seria pytań bez łatwej odpowiedzi: czym właściwie jest testowanie „dogłębne”, czy powinno obejmować testy integracyjne i end-to-end, co z fuzz testingiem albo metodami formalnymi, i jak zweryfikować, że nowe testy faktycznie sprawdzają to, co mają sprawdzać, a nie tylko podnoszą wskaźnik pokrycia. Do tego dochodzi pytanie o powiązanie tego wszystkiego z observability produkcyjnym.

Najbardziej niepokojący fragment tekstu dotyczy skutków ubocznych tej sytuacji dla ludzi. Zbyt dokładny, wymuszony code review wypala inżynierów i paradoksalnie prowadzi do gorszych, powierzchownych recenzji. Orosz relacjonuje, że coraz więcej deweloperów przestaje czytać kod z realną intencją, bo skoro narzędzie AI nie zgłosiło żadnych uwag, po prostu klikają approve. Jednocześnie ci, którzy nadal wkładają w recenzję tyle samo wysiłku co dawniej, czują się przytłoczeni falą PR-ów określanych jako „AI slop”, czyli technicznie poprawnych, ale niedopracowanych zmian generowanych masowo przez modele.

**Kluczowe wnioski:**
- Wąskie gardło w cyklu wytwórczym oprogramowania przesunęło się z pisania kodu na jego przeglądanie, odkąd modele takie jak Opus 4.5 i GPT 5.4 piszą więcej i lepiej.
- Rynek odpowiada dwutorowo: gotowymi narzędziami (CodeRabbit, Greptile, Qodo, SonarQube, wbudowane recenzje w Claude Code, Cursor, GitHub Copilot) oraz rozwiązaniami budowanymi wewnętrznie przez firmy takie jak Uber, Cloudflare, Faire czy HubSpot.
- Automatyzacja review niesie ryzyko wypalenia recenzentów i powierzchownego „automatycznego approve”, gdy narzędzie AI nie znajdzie uwag, podczas gdy sumienni recenzenci toną w liczbie PR-ów.
- Alternatywa w postaci przesunięcia ciężaru na testy i weryfikację zamiast przeglądu brzmi obiecująco, ale rodzi trudne pytania o zakres i jakość testowania, na które branża nie ma jeszcze gotowych odpowiedzi.

**Dlaczego mnie to obchodzi:** Ten problem widzę już teraz na własne oczy w projektach, w których uczestniczę, i szczerze mówiąc, martwi mnie bardziej niż sama jakość generowanego kodu. Przez lata code review był miejscem, w którym zespół faktycznie się uczył, dzielił kontekstem i łapał subtelne błędy logiczne, a nie tylko literówki czy złamane konwencje nazewnictwa. Jeśli recenzenci zaczynają traktować zielone światło od AI jako wystarczający sygnał do approve, tracimy dokładnie tę wartość, dla której code review w ogóle wprowadzono. Podejście Ubera z Risk Profiles wydaje mi się rozsądniejsze niż ślepe poleganie na botach, bo przynajmniej próbuje kierować ludzką uwagę tam, gdzie jest najbardziej potrzebna, zamiast udawać, że automatyzacja rozwiąże problem sama. Z drugiej strony obawiam się, że mniejsze zespoły i firmy bez zasobów Ubera czy Cloudflare po prostu kupią gotowe narzędzie, włączą je i uznają temat za zamknięty, co w dłuższej perspektywie może być gorsze niż brak jakiegokolwiek AI w procesie review.

**Link:** [The Pulse: New trend - concern about massive increase in code review load](https://newsletter.pragmaticengineer.com/p/the-pulse-new-trend-concern-about?publication_id=458709&post_id=208181406&isFreemail=true&triedRedirect=true)
