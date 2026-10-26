---
title: "Governance jako płot na placu zabaw i rowerowe przerzutki bez nazw"
excerpt: "Poniedziałkowe pomysły Refactoring: dlaczego dobre zasady governance przyspieszają adopcję AI i czemu etykiety trybów w produkcie szkodzą użytkownikom."
publishedAt: "2026-10-26"
slug: "refactoring-governance-ai-plot-malleable-software-przerzutki"
hashtags: "#Refactoring #ai #agents #management #ux #product #generated #pl"
source_pattern: "🌀 Refactoring"
---

## Governance jako przyspieszacz i przerzutki, które uczą

**TLDR:** Luca twierdzi, że dobre zasady governance dla AI działają jak płot na placu zabaw: dzięki wyraźnym granicom ludzie śmielej robią więcej. Druga myśl dotyczy projektowania produktów, w których ukryty model uniemożliwia ludziom naukę.

**Summary:** Wiele zespołów traktuje governance dla AI jak hamulec w chwili, gdy wszyscy oczekują przyspieszenia. Autor proponuje odwrotne spojrzenie. Przywołuje badanie Petera Summerlina z 2006 roku, w którym dzieci na placu zabaw bez ogrodzenia trzymały się blisko nauczycielki, a na placu z płotem zajmowały dużo więcej przestrzeni. Wyraźne granice dają poczucie bezpieczeństwa, więc ludzie eksplorują. Z agentami jest tak samo: ścisłe zabezpieczenia pozwalają mu powierzać agentom szersze zadania i pozwalać im więcej wdrażać. Jako dane przytacza badanie Google Cloud i CSA z końca 2025 roku. Przy pełnym governance adopcja agentowej AI wynosiła 46 procent, przy częściowym 25, a tam, gdzie governance było dopiero w przygotowaniu, 12.

Autor sam zaznacza, że korelacja to nie przyczynowość. Ja dodałbym, że kierunek zależności może być odwrotny: organizacje, które już dobrze radzą sobie z AI, mają też więcej powodów i zasobów na governance. Brakuje też definicji, co znaczy pełne governance i kto je oceniał.

Druga część to rozmowa z Geoffreyem Littem z Notion o oprogramowaniu podatnym na modyfikacje. Litt opowiada przypowieść o rowerze, którego przerzutki są opisane trybami, takimi jak "szuter" albo "pod górę", zamiast numerami. Brzmi przyjaźnie, ale co zrobić pod górę na szutrze? Ukrywając model pod etykietami, odbieramy ludziom model mentalny, którego potrzebują w nowych sytuacjach. Lepszy jest mały zestaw prymitywów, które da się składać, plus dobre nauczenie ich użytkowników. W Notion każdy akapit, nagłówek i obraz to blok, który można przeciągać i zagnieżdżać, a agenci używają tych samych klocków, więc instrukcje agenta to po prostu strony Notiona.

Na koniec trzy polecane lektury. Steve Huynh, prawie dwadzieścia lat w Amazonie, twierdzi, że kultura pisania memo nie przetrwała AI, bo dokument nie jest już dowodem przemyślenia problemu. Karri Saarinen pisze, że dobre produkty noszą ślad ludzi, którzy je zrobili, a wiele dzisiejszych jest chaotycznych, bo dodawanie funkcji jest łatwiejsze niż przemyślenie istniejących. Felix Rieseberg z zespołu Claude opisuje ambicję w pracy z AI jako wysokość, głębokość i zasięg, na przykładzie przejścia od naprawiania pojedynczych crashy do polecenia utrzymania aplikacji wolnej od crashy.

**Key takeaways:**
- Governance bywa akceleratorem, jeśli granice są jasne i dobrze pomyślane.
- Dane o adopcji sugerują związek, ale nie dowodzą przyczyny.
- Etykiety trybów zamiast prymitywów odbierają użytkownikom możliwość nauki.
- Dokument nie jest już dowodem myślenia, bo AI potrafi go napisać.

**Why do I care:** Dla zespołu frontendowego wniosek jest praktyczny: zanim dasz agentom więcej swobody, zbuduj płot, czyli testy, lint, ograniczone uprawnienia i recenzję. Z kolei opowieść o przerzutkach to dobry argument przeciwko design systemom, które chowają wszystko za jednym propem variant. Wolałbym, żeby użytkownik poznał kilka klocków, niż żeby dostał dziesięć nazwanych trybów.

**Link:** [Bicycle gears, governance fences, and weekly readings!](https://refactoring.fm/p/bicycle-gears-governance-fences-and)
