---
title: "daily.dev: Motion UI Gallery, TanStack Markdown, koniec Deno i TanStack Redact"
excerpt: "Galeria 3D w DOM, migracja z react-markdown, dwa spojrzenia na przejęcie Deno przez Cloudflare i alternatywny runtime Reacta od TanStack."
publishedAt: "2026-10-16"
slug: "dailydev-motion-ui-gallery-tanstack-markdown-deno-cloudflare-redact"
hashtags: "#dailydev #react #css #animation #nodejs #deno #cloudflare #tanstack #performance #generated #pl"
source_pattern: "daily.dev"
---

## Motion UI Gallery

**TLDR:** Motion wypuściło płatny komponent Gallery dla Reacta z ośmioma układami 2D i 3D. Wszystko renderuje się w DOM przez transformacje CSS, bez canvasa i WebGL.

**Summary:** Autorzy Motion dodali do pakietu Motion UI komponent do galerii obrazów i wideo. Ma osiem gotowych układów: listę, siatkę, układ barrel, coverflow, helisę, pierścień, sferę i stos. Sztuczka polega na tym, że nie ma tu canvasa ani WebGL. Każdy element to zwykły img albo video, przesuwany transformacjami CSS, więc dostępność, selekcja tekstu i SEO działają jak zawsze.

Przejścia między układami startują z aktualnej pozycji elementu, a nie z jakiegoś punktu zerowego. Przełączenie z sfery na siatkę w połowie animacji nie powoduje skoku. Widok szczegółowy działa na zasadzie shared element transition w DOM. Klikany element wylatuje ze swojej pozycji 3D i ląduje płasko w kontenerze, a reszta ustawia się w pasku obok. Przy najechaniu wskaźnikiem biblioteka wcześniej ładuje obraz w wysokiej rozdzielczości i podmienia go dopiero po zdekodowaniu, więc układ strony się nie przesuwa.

Podstawowy bundle waży 19,6 kB, a z widokiem szczegółowym 25,8 kB. Gesty obejmują przeciąganie, scroll i klawiaturę, a modyfikatory oparte na prędkości dodają przechył i falowanie. Można też zdefiniować własny układ. Komponent jest częścią dożywotniego członkostwa Motion+, czyli to produkt płatny.

**Key takeaways:**
- Osiem układów 2D i 3D, wszystko na transformacjach CSS w DOM.
- Bundle 19,6 kB, 25,8 kB z widokiem szczegółowym.
- Dostępność i SEO zostają, bo to prawdziwe elementy img i video.
- Komponent jest płatny, w ramach Motion+.

**Why do I care:** Galerie 3D zwykle kończą jako canvas, który psuje dostępność i trzeba go ręcznie ratować. Tu trade-off jest uczciwszy, bo DOM ma limity wydajności przy setkach elementów i o tym autorzy nie piszą ani słowa. Przed zakupem sprawdziłbym zachowanie przy dużej liczbie zdjęć na średnim telefonie, bo tam takie rozwiązania zwykle się wykładają.

**Link:** [Introducing Motion UI Gallery](https://daily.dev/posts/y9l0jnR2E)

## Z react-markdown na TanStack Markdown

**TLDR:** Autor bloga zamienił łańcuch unified, remark i rehype na jedną bibliotekę TanStack Markdown. Ścieżka Reacta skurczyła się z 36,8 kB do 7,2 kB.

**Summary:** React-markdown składa się z kilku warstw. Tekst przechodzi przez parser do drzewa mdast, potem do hast, a dopiero na końcu do elementów Reacta. Każda warstwa ma własne wtyczki. TanStack Markdown ma własny parser i własny renderer Reacta, a całość opiera się na jednym modelu dokumentu.

Autor opisuje, jak zastąpił wtyczki remark rozszerzeniami z API TanStack. Dotyczy to dyrektyw, automatycznych linków i rozwiązywania adresów URL w surowym HTML. Dodaje tabelę porównawczą obu stosów oraz praktyczne uwagi o identyfikatorach nagłówków, bezpieczeństwie surowego HTML i podświetlaniu kodu. Różnica rozmiaru jest spora, ale dotyczy jednego bloga, więc trzeba uważać z uogólnianiem.

**Key takeaways:**
- Jeden parser i jeden renderer zamiast łańcucha mdast, hast i React.
- 7,2 kB zamiast 36,8 kB na ścieżce Reacta.
- Wtyczki remark trzeba przepisać na rozszerzenia TanStack.
- Surowy HTML i identyfikatory nagłówków wymagają osobnej uwagi.

**Why do I care:** Jeśli renderujesz markdown po stronie klienta, 30 kB mniej to realna oszczędność. Ekosystem remark i rehype ma jednak setki wtyczek, a nowa biblioteka dopiero je zbiera. Przy prostym blogu migracja się opłaca. Przy systemie dokumentacji z kilkunastoma niestandardowymi wtyczkami policzyłbym koszt przepisywania, zanim ktokolwiek poda liczby z bundla.

**Link:** [Moving from react-markdown to TanStack Markdown](https://daily.dev/posts/UHjTbRYLA)

## Cloudflare kupiło Deno i daje mu rok

**TLDR:** Dwa materiały wideo opisują przejęcie Deno przez Cloudflare. Runtime dostanie jeszcze rok poprawek błędów, a Deno Deploy zniknie po pół roku.

**Summary:** Pierwszy materiał to śledztwo oparte na danych z repozytorium. Liczba commitów spadła o ponad 90 procent między czerwcem a wrześniem 2026, a większość pracy robiły dwie osoby, i to na długo przed ogłoszeniem z 9 października. Autor przypomina niezgłoszone zwolnienia połowy zespołu w 2025 roku i kurczące się limity darmowego planu. Komunikat Cloudflare skupia się głównie na nowym, samodzielnie hostowalnym projekcie. Niejasne zostają ceny, znak towarowy, Deno KV i pomoc w migracji dla użytkowników bez płatnego planu. Autor zauważa, że to jedyne takie przejęcie z twardą datą końca przejętego runtime. Anthropic kupiło Bun, a Cloudflare kupiło Void Zero, twórców Vite, i w żadnym z tych przypadków nie ogłoszono końca produktu. Deno pozostaje na licencji MIT, więc ktoś może go rozwidlić.

Drugi materiał opowiada tę samą historię od strony technicznej. Deno ogłoszono w 2018 roku, potem były rundy finansowania i spór z Oracle o znak towarowy JavaScript. Momentum słabło, bo Node dorobił się fetch, modelu uprawnień i natywnego TypeScriptu. Zespół zbudował Cell D, samodzielnie hostowalną wersję Durable Objects z Cloudflare, wydaną w sierpniu. Cloudflare od lat chciało takiej wersji i nie potrafiło jej zrobić samo, więc kupiło firmę. Ryan Dahl i Bert Belder wcielą Cell D do otwartego runtime Workers, z naciskiem na infrastrukturę agentów AI. Po tej transakcji Node zostaje jedynym dużym runtime, którego nie posiada firma chmurowa.

Obie narracje różnią się akcentem. Jedna mówi o tym, że Deno wygaszano po cichu, druga o tym, że Cell D był prawdziwą wartością. Nie wykluczają się, a pierwsza jest lepiej poparta liczbami.

**Key takeaways:**
- Jeden rok poprawek błędów dla Deno, Deploy kończy się po około sześciu miesiącach.
- Aktywność w repozytorium spadła o ponad 90 procent przed ogłoszeniem.
- Cloudflare chciało Cell D, czyli samodzielnie hostowalne Durable Objects.
- Licencja MIT pozwala na fork, ale nikt go jeszcze nie zapowiedział.

**Why do I care:** Jeśli masz cokolwiek na Deno Deploy, masz pół roku na plan B i warto zacząć od inwentaryzacji, a nie od czekania na szczegóły. Szersza lekcja jest nieprzyjemna. Runtime kontrolowany przez jedną firmę to ryzyko dostawcy, nawet gdy kod jest otwarty. Autorzy wideo omijają pytanie, kto zapłaci za utrzymanie forka, a to decyduje, czy MIT cokolwiek tu znaczy.

**Link:** [Why Did Cloudflare Buy Deno Just to Shut It Down?](https://daily.dev/posts/h9xm7XXBJ)

**Link:** [The runtime wars are over... and Node won](https://daily.dev/posts/2jBhdGYN7)

## TanStack Redact, czyli React bez współbieżności

**TLDR:** Redact to zgodny z Reactem 19.3 runtime od TanStack, który rezygnuje z współbieżnego planowania na rzecz renderowania synchronicznego. Podmienia się go jedną wtyczką Vite, a gzip jest mniejszy o 60 do 66 procent.

**Summary:** Redact zachowuje importy z Reacta, więc kod aplikacji się nie zmienia. Zamiast tego wtyczka Vite podmienia implementację pod spodem. Projekt twierdzi, że ma pełną zgodność API z Reactem 19.3.0. Mediany czasów są w większości mikrobenchmarków lepsze.

Autorzy nie ukrywają minusów. Ponowne próby Suspense są wolniejsze o 124,8 procent, a hydratacja o 21,4 procent. Repozytorium zawiera tabele zgodności, flagi do wyłączania opcjonalnych zachowań, opis metodyki benchmarków i wyniki integracji na tanstack.com oraz tannerlinsley.com. To są dwie strony autorów, więc nie jest to niezależny test.

**Key takeaways:**
- Synchroniczne renderowanie zamiast współbieżnego planowania.
- Jedna wtyczka Vite, importy z Reacta bez zmian.
- Gzip mniejszy o 60 do 66 procent.
- Wolniejsze Suspense (plus 124,8 procent) i hydratacja (plus 21,4 procent).

**Why do I care:** Mniejszy bundle brzmi świetnie, ale hydratacja jest dokładnie tym miejscem, gdzie SSR-owe aplikacje ją czują. Zrezygnowanie ze współbieżności oznacza też, że przejścia i transitions mogą zachowywać się inaczej niż ten React, który znasz. Przetestowałbym to na aplikacji z dużą liczbą Suspense, zanim ktokolwiek zadeklaruje zgodność w produkcji.

**Link:** [GitHub - TanStack/redact](https://daily.dev/posts/Co9kGNsjG)
