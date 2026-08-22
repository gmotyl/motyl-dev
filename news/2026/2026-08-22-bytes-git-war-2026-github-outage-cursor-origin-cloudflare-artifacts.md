---
title: "Wojna o Gita 2026: GitHub się sypie, a Cursor i Cloudflare budują własne forge"
excerpt: "Kolejna wielogodzinna awaria GitHuba przy 3 miliardach commitów miesięcznie skłoniła Cursor, Cloudflare i Pierre Computer Co. do wypuszczenia własnych rozwiązań do hostowania kodu, a przy okazji Bun 1.4, OXC ze wsparciem dla React Compilera i nowe query prefetching w TanStack Router."
publishedAt: "2026-08-22"
slug: "bytes-git-war-2026-github-outage-cursor-origin-cloudflare-artifacts"
hashtags: "#uidev #frontend #git #github #cursor #cloudflare #bun #react #vite #generated #pl"
source_pattern: "ui.dev"
---

## Wojna o Gita 2026

**TLDR:** Osiem godzin kolejnej awarii GitHuba, teraz przetwarzającego 3 miliardy commitów i 130 milionów PR-ów miesięcznie, wystarczyło, by Cursor, Cloudflare i Pierre Computer Co. wypuściły konkurencyjne rozwiązania do hostowania kodu w tym samym tygodniu.

**Summary:** GitHub od kilku tygodni ma serię awarii, wcześniej padły Actions, a teraz padło hostowanie kodu na osiem godzin. Skala, przy której to się dzieje, robi wrażenie: 3 miliardy commitów i 130 milionów mergowanych PR-ów miesięcznie, w dużej mierze napędzanych przez agenty piszące kod bez przerwy. Normalnie "nie skalujemy się wystarczająco szybko" to dobry sygnał biznesowy, ale kiedy deweloperzy nie mogą pracować, zaczynają rozglądać się za alternatywami, i trzech nowych graczy właśnie na to postawiło.

Cursor wypuścił Origin, po wcześniejszym podkupieniu jednego z architektów GitHuba, i zbudował nową architekturę hostowania Gita mającą być szybsza i bardziej niezawodna, choć na razie trzeba dostawić własne CI/CD. The Pierre Computer Co., zespół też złożony z byłych pracowników GitHuba, poszedł w stronę czystego API do przechowywania kodu, już używanego przez Lovable i Bolt, czyli rozwiązania dla firm, których użytkownicy generują kod, a nie piszą go ręcznie. Cloudflare Artifacts to z kolei "self-hostowany GitHub na Cloudflare", dający wersjonowane przechowywanie, pipeline'y, eventy i CI jako klocki pod agenty pracujące na pełnej mocy.

Żadne z tych rozwiązań w obecnej formie nie zastępuje GitHuba całkowicie, ale to i tak więcej konkurencji, z którą GitHub będzie musiał się zmierzyć, zanim skala agentów napisze mu kolejny problem ze skalowaniem.

**Key takeaways:**
- GitHub przetwarza teraz 3 miliardy commitów i 130 milionów PR-ów miesięcznie, głównie dzięki agentom piszącym kod.
- Cursor wypuścił Origin (BYO CI/CD), Pierre Computer Co. wypuścił API-only Code Storage używane przez Lovable i Bolt, a Cloudflare wypuścił Artifacts jako "self-hostowany GitHub".
- Żadne z trzech rozwiązań nie jest jeszcze pełnym zamiennikiem GitHuba w obecnej formie.
- Poza tym w tym numerze: Bun 1.4 z lepszą kompatybilnością z Node.js, wsparcie dla React Compilera w OXC, i nowe query prefetching w TanStack Router od TkDodo.

**Why do I care:** Skala, przy której GitHub zaczyna się sypać, to bezpośredni skutek tego, że agenty commitują więcej kodu niż ludzie kiedykolwiek commitowali, i to jest coś, co każdy zespół pracujący z agentami kodującymi powinien mieć z tyłu głowy przy planowaniu infrastruktury. Warto obserwować Origin i Artifacts nie dlatego, że trzeba migrować już teraz, tylko dlatego, że pokazują, jak dostawcy infrastruktury deweloperskiej myślą o świecie, w którym commit jest tani, a wolumen kodu rośnie o rząd wielkości. Przy okazji, wsparcie React Compilera w OXC to konkretna, praktyczna wiadomość dla każdego, kto chce mieć szybszy dev environment w Vite bez rezygnacji z kompilatora Reacta.

**Link:** [Bytes #514 - The Git War of 2026](https://bytes.dev/archives/514)
