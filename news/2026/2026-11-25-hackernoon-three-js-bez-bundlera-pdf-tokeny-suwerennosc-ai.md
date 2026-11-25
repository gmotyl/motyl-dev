---
title: "HackerNoon: multiplayer 3D w three.js bez bundlera, surowe PDF-y w LLM i słowa z angielskiego w kodzie"
excerpt: "Przegląd z zajawek HackerNoon z 24 listopada: gra w three.js bez bundlera, koszt tokenów przy surowych PDF-ach, suwerenność AI i 50 słów programistycznych."
publishedAt: "2026-11-24"
slug: "hackernoon-three-js-bez-bundlera-pdf-tokeny-suwerennosc-ai"
hashtags: "#hackernoon #javascript #webdev #ai #llm #engineering #generated #pl"
source_pattern: "HackerNoon"
---

## Wielosobowy świat 3D do jazdy w three.js bez bundlera

**TLDR:** Autor zbudował wieloosobowy świat do jazdy samochodem w three.js bez bundlera. Z zajawki wynika, że ma analityczny teren, arkadowy model auta, obsługę telefonów bez JIT i 250 aut naraz.

**Summary:** Mail zawiera tylko krótki opis tekstu, więc nie znam szczegółów implementacji. Z zajawki wynika, że projekt rezygnuje z bundlera i narzędzi budowania, a teren jest liczony analitycznie, czyli funkcją, a nie wczytywaną siatką. Wspomniane są też telefony bez kompilatora JIT, co zwykle oznacza ostre ograniczenia wydajności JavaScriptu, oraz skala 250 aut jednocześnie.

Warto zadać pytanie, którego zajawka nie rozstrzyga: czy brak bundlera to realna zaleta, czy po prostu ćwiczenie ze stylu. Dla małej gry z modułami ES i importmapą może to działać dobrze, ale przy większej bazie kodu ucierpi tree shaking i cache busting.

**Key takeaways:**
- Projekt działa bez bundlera, na natywnych modułach.
- Teren jest generowany analitycznie.
- Uwzględniono telefony bez JIT i dużą liczbę graczy.

**Why do I care:** Jako frontendowca interesuje mnie, ile dzisiejszych narzędzi budowania jest naprawdę potrzebnych. Ten przykład przypomina, że natywne moduły przeglądarki wystarczą dla małych projektów, ale przeczytałbym pełny tekst, zanim wyciągnę wnioski.

**Link:** [How I Built a Multiplayer 3D Driving World in three.js With No Bundler](https://hackernoon.com)

## Przestań marnować tokeny na surowe PDF-y

**TLDR:** Opłacony tekst o tym, że podawanie surowych PDF-ów do modelu językowego marnuje tokeny. Zajawka nie podaje liczb.

**Summary:** To historia promowana, więc traktuję ją ostrożnie. Teza jest jednak trafna technicznie: PDF to format prezentacji, nie struktury, więc podanie go bez wstępnej ekstrakcji zawiera szum i duplikaty, które model musi przeczytać za pieniądze. Lepiej wyciągnąć tekst i strukturę przed wywołaniem modelu.

Autor jest dostawcą narzędzia do przetwarzania dokumentów, więc nie powie, że zwykła biblioteka do ekstrakcji wystarczy. Brakuje porównania z darmowymi alternatywami.

**Key takeaways:**
- Surowy PDF zawiera więcej szumu niż użytecznej treści.
- Wstępna ekstrakcja obniża koszt tokenów.
- Tekst jest sponsorowany.

**Why do I care:** Jeśli budujesz RAG lub agenta czytającego dokumenty, zmierz, ile tokenów idzie na formatowanie. Ale zmierz to samodzielnie, a nie na podstawie materiału dostawcy.

**Link:** [You're Wasting Tokens: Stop Giving Raw PDFs to Your LLM](https://hackernoon.com)

## Co naprawdę oznacza suwerenność AI dla zespołów inżynierskich

**TLDR:** Sponsorowany tekst o suwerenności AI w zespołach inżynierskich. Mail podaje tylko tytuł.

**Summary:** W mailu nie ma opisu, więc nie opisuję treści. Temat dotyczy zwykle tego, gdzie działają modele, kto kontroluje dane i jak uniknąć uzależnienia od jednego dostawcy.

**Key takeaways:**
- Treść sponsorowana, bez dostępnych szczegółów.
- Temat dotyczy kontroli nad danymi i modelami.

**Why do I care:** Pytanie o przenośność między dostawcami warto zadać już na etapie architektury: warstwa abstrakcji nad modelem jest tańsza przed wdrożeniem niż po.

**Link:** [What AI Sovereignty Actually Means for Engineering Teams](https://hackernoon.com)

## Cookie zjadło biscuit: 50 słów, które kod wziął z angielskiego

**TLDR:** Zestawienie 50 słów z dwoma znaczeniami w programowaniu, uszeregowanych według odsłon Wikipedii. Pokazuje, które znaczenie wygrywa.

**Summary:** Lekki tekst na pograniczu językoznawstwa i informatyki. Zajawka porównuje popularność znaczenia programistycznego i potocznego, na przykład ciasteczka HTTP i herbatnika. Wartość merytoryczna jest niewielka, ale to przyjemna ciekawostka.

**Key takeaways:**
- Pięćdziesiąt słów ma dwa znaczenia.
- Ranking powstał z odsłon Wikipedii.

**Why do I care:** Mało praktyczne, ale przydaje się do rozmów o nazewnictwie w kodzie: dobre nazwy to te, które nie kolidują z potocznym znaczeniem.

**Link:** [HTTP Cookies Ate the Biscuit: 50 Programming Words Code Took From English](https://hackernoon.com)

## Claude Fable 5.2: dlaczego najdroższy model może wyjść najtaniej

**TLDR:** Tekst argumentuje, że najdroższy model Anthropic bywa ostatecznie najtańszy. Mail podaje tylko tytuł i tag.

**Summary:** Intuicja stojąca za takim twierdzeniem jest znana: jeśli droższy model kończy zadanie w mniejszej liczbie kroków i poprawek, koszt na zadanie może być niższy niż przy tańszym. Zgadza się to z danymi z innych źródeł, które pokazują, że koszt na zadanie różni się bardziej niż sam wynik. Bez treści nie oceniam metodologii.

**Key takeaways:**
- Cena za token nie jest ceną za zadanie.
- Liczy się liczba iteracji potrzebnych do poprawnego wyniku.

**Why do I care:** Mierz koszt na zakończone zadanie, a nie za milion tokenów. To jedyna miara, która ma sens przy wyborze modelu do agenta.

**Link:** [Claude Fable 5.2: Why Anthropic's Most Expensive Model Can End Up the Cheapest](https://hackernoon.com)
