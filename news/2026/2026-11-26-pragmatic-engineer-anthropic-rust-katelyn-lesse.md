---
title: "Jak Anthropic buduje oprogramowanie w 2026: przepisanie API na Rust i agenci w code review"
excerpt: "Katelyn Lesse opowiada o migracji API Claude z Pythona do Rusta w pięć miesięcy, agentowym review, dyżurach i rezygnacji z rozmów kodowania."
publishedAt: "2026-11-25"
slug: "pragmatic-engineer-anthropic-rust-katelyn-lesse"
hashtags: "#pragmaticengineer #engineering #rust #ai #agents #devops #management #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Jak Anthropic buduje oprogramowanie w 2026 z Katelyn Lesse

**TLDR:** Szefowa platformy w Anthropic opowiada, jak zespół przepisał API obsługujące każdy token Claude z Pythona na Rust w około pięć miesięcy, bez eksperta od Rusta. Mówi też o agencie przeglądającym pull requesty, o dyżurach i o rezygnacji z klasycznych rozmów kodowania.

**Summary:** Katelyn Lesse kieruje inżynierią platformy w Anthropic, wcześniej pracowała w Stripe. Jej zespół odpowiada za Messages API, przez które przechodzą wszystkie tokeny Claude, także te z Claude Code i Claude Desktop. Serwis robi uwierzytelnianie, tokenizację, rozliczenia i kontrole bezpieczeństwa, a potem woła stos GPU. Był monolitem w Pythonie, bo w 2023 roku Anthropic dopiero zakładał API, zespół był mały i blisko badaczy, którzy piszą w Pythonie. Narzut procesora stał się problemem, więc po próbach optymalizacji zdecydowano się na Rust. Podobną drogę przeszło wcześniej OpenAI.

Najciekawszy jest sposób weryfikacji. Zespół nie robił rygorystycznych code review, a według Lesse inżynierowie przyglądali się z bliska może jednej piątej wygenerowanego kodu. Zamiast tego stare API w Pythonie posłużyło jako wzorcowy zestaw testów: nowe API działało w cieniu na prawdziwym ruchu, a prace trwały, aż odpowiedzi były identyczne. Jej zdanie brzmi mniej więcej tak: jeśli coś da się sprowadzić do weryfikowalnej postaci, nie trzeba czytać każdej linii. Rok wcześniej ten sam zespół wybrał Go, bo wszyscy umieli go czytać, a w 2026 uznał, że Claude jest już wystarczająco dobry w Ruście.

Dalej opisuje codzienność. Na każdym pull requeście działa klasyfikator Claude, który decyduje, czy potrzebny jest człowiek, ilu ludzi i z którego zespołu. Zmiany mechaniczne, jak podbicie wersji SDK czy naprawa flaky testu, mogą przejść bez człowieka. Na dyżurze API agent dostaje alert przed człowiekiem i rozróżnia prawdziwy problem od szumu, choć do samodzielnej obsługi incydentów jeszcze daleko. Nowi pracownicy zamiast kolegi z diagramami pytają Claude. Plan i uzgodnienia zajmują tyle samo czasu co dawniej, zespoły wciąż mają pięć do ośmiu osób, a inżynierowie spędzają więcej czasu na budowaniu własnych narzędzi. Zespół zrezygnował też z klasycznej rozmowy kodowania, bo silni kandydaci zaczęli ją oblewać, skoro nie piszą już kodu ręcznie, i testuje ćwiczenia z agentem. Przy awansach liczy się wpływ, na przykład zaoszczędzony procesor, mniejsze opóźnienia i uniknięte incydenty.

Warto zauważyć, że wywiad pochodzi z pierwszego tygodnia po debiucie giełdowym firmy i opowiada ją od dobrej strony. Nie ma tu mowy o kosztach błędów, które przeszły przez 80 procent nieprzeczytanego kodu, ani o tym, ile pracy kosztowało zbudowanie testu cienia.

**Key takeaways:**
- Przepisanie Messages API na Rust zajęło kilka osób i około pięciu miesięcy.
- Stare API pełniło rolę wyroczni testowej dzięki ruchowi w cieniu.
- Claude klasyfikuje pull requesty i decyduje o liczbie przeglądających.
- Agent kategoryzuje alerty dyżurne przed człowiekiem.
- Rozmowy kodowania są zastępowane ćwiczeniami z agentem.

**Why do I care:** Wzorzec przepisania z ruchem w cieniu jest do skopiowania w każdej migracji, także bez AI: kiedy masz wyrocznię, kod można generować bez czytania każdej linii. To przesuwa pracę seniora z review na projektowanie weryfikacji. Zastrzeżenie: Anthropic ma bardzo dobry test harness i własny model, a większość firm ma monolit bez pokrycia testami, więc ich wynik nie przenosi się jeden do jednego.

**Link:** [How Anthropic builds software in 2026 with Katelyn Lesse](https://newsletter.pragmaticengineer.com/p/how-anthropic-builds-software-in)
