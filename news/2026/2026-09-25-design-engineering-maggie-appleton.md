---
title: "Design engineering według Maggie Appleton"
excerpt: "Gergely Orosz rozmawia z Maggie Appleton z GitHub Next o tym, jak projektowanie zmienia się pod wpływem AI i dlaczego notatnik wciąż wygrywa z promptem."
publishedAt: "2026-09-23"
slug: "design-engineering-maggie-appleton"
hashtags: "#pragmaticengineer #design #ai #dx #figma #product #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Design engineering według Maggie Appleton

**TLDR:** Maggie Appleton, staff research engineer w GitHub Next, opowiada Gergely'emu Oroszowi, czym różni się design engineering od klasycznego projektowania i jak zmienia się warsztat projektanta w czasach agentów AI. Najciekawszy wątek: papier i długopis wciąż biją prompt, a modele potrafią zwieść nas swoją pozorną kompetencją.

**Summary:**
Maggie Appleton trafiła do technologii okrężną drogą. Studiowała antropologię kulturową i przez chwilę rozważała pracę przy projektowaniu technik przesłuchań dla armii USA, zanim zdecydowała, że wolałaby robić coś innego. Frontend poznała nie na kursie programowania, tylko przy tablecie graficznym. Przez cztery lata ilustrowała materiały edukacyjne dla Egghead, w tym animowane wyjaśnienia do kursu Dana Abramova Just JavaScript, i żeby narysować, jak działa useEffect, musiała najpierw zrozumieć, jak działa useEffect. Potem została pierwszą projektantką w startupie AI Elicit, pracowała w Normally, a dziś jest w GitHub Next, gdzie buduje prototypy pokazujące, jak inżynierowie mogliby współpracować z AI.

Jedno z ciekawszych spostrzeżeń z rozmowy dotyczy tego, co Maggie uznaje za dobry interfejs. W 2021 roku, jeszcze przed premierą ChatGPT, jej zespół w Elicit spędził miesiące na budowaniu nowego interfejsu do wspomagania badań naukowych za pomocą LLM, z nieskończonym płótnem, kartami i dokumentami przypominającymi Notion. Naukowcy nie chcieli tego. Chcieli zwykłych tabel, do których byli przyzwyczajeni. Dla Maggie to lekcja, że nawet przy prawdziwej innowacji lepiej zacząć od znajomego elementu interfejsu niż od efektownego, ale obcego.

Warsztat pracy Maggie też odbiega od tego, czego można by się spodziewać po kimś budującym prototypy AI. Ona zaczyna od notatnika i długopisu, bo szkicowanie ręką jest szybsze niż tłumaczenie pomysłu narzędziu w rodzaju Claude Code, a fizyczna kartka zostaje w notatniku na jutro, podczas gdy pomysł wrzucony do promptu potrafi zniknąć po kilkudziesięciu kolejnych poleceniach. Kiedy pomysł dojrzeje, buduje sobie własne narzędzie, które nazywa "jigiem", od nazwy stolarskiego przyrządu pomocniczego. Prosi agenta o prototyp z suwakami i selektorami kolorów, żeby móc dostroić parametry w czasie rzeczywistym, jakby miała prywatną Figmę. Co ciekawe, przy tworzeniu prototypów w ogóle nie zagląda już do wygenerowanego kodu: zamiast tego pisze szczegółową specyfikację z opisem, jak agent ma zweryfikować własną pracę.

W rozmowie pojawia się też termin, który Maggie ukuła: "capability gaslighting". To sytuacja, w której model przez jakiś czas imponuje jakością odpowiedzi, buduje w użytkowniku przekonanie o swojej ekspertyzie, a potem nagle zawala prostsze zadanie następnego dnia. Zjawisko dotyczy też agentów planujących pracę. Maggie zauważa, że rozmowa z agentem, który zasypuje pytaniami w stylu "wybierz A, B czy C", po dwudziestym pytaniu zamienia się w automatyczne klikanie rekomendowanej opcji, bo mózg po prostu się męczy podejmowaniem tylu decyzji naraz.

Największym wyzwaniem, jakie widzi Maggie, jest brak wspólnego języka między światem agentów, w którym żyją wagi modeli, skille i MCP, a światem człowieka, w którym liczą się fizyczność, faktura i światło. Potrzebne są nowe artefakty, które pozwolą tym dwóm porządkom się spotkać, bo na razie agent nie potrafi zajrzeć jej przez ramię do notatnika i zrozumieć, co właśnie rysuje. Na koniec rozmowy pada rada dla inżynierów: warto traktować agenta AI jak cierpliwego nauczyciela projektowania, bo model bez trudu wytłumaczy, kiedy zmienić odstępy między wierszami albo ile znaków zmieścić w jednym wierszu tekstu, czyli rzeczy, których zdobycie kiedyś wymagało lat praktyki.

**Key takeaways:**
- Design engineering to projektowanie i inżynieria połączone przez wspólny rdzeń: rozwiązywanie problemów, tylko na innym materiale.
- Notatnik i długopis wciąż wygrywają z narzędziami AI, bo szkic fizyczny zostaje, a pomysł wpisany w prompt łatwo się gubi.
- "Jigi" to personalne prototypy budowane przez agenta, z suwakami i kolorami do dostrajania w czasie rzeczywistym.
- "Capability gaslighting" opisuje moment, w którym model przekonuje nas o swojej kompetencji, a potem zawala proste zadanie.
- Zbyt długie sesje planowania z agentem prowadzą do zmęczenia decyzyjnego i bezmyślnego klikania rekomendowanych opcji.

**Why do I care:** Dla architekta i konsultanta pracującego głównie po stronie frontendu to nie jest tekst o rysowaniu makiet, tylko o granicach delegowania decyzji agentom, zarówno projektowych, jak i architektonicznych. "Capability gaslighting" to dokładnie to, co widuję przy przeglądach kodu generowanego przez AI: model potrafi tydzień wyglądać jak senior, a potem popełnić błąd, którego junior by się wstydził, więc zaufanie do niego trzeba budować na podstawie wyników, a nie wrażenia z ostatniej sesji. Praktyka "jigów" to też konkretna wskazówka dla zespołów produktowych: zamiast opisywać UI słowami w tickecie, szybciej i taniej jest wygenerować klikalny prototyp i dyskutować nad nim, niż nad specyfikacją w Jirze.

**Link:** [Design Engineering with Maggie Appleton](https://newsletter.pragmaticengineer.com/p/design-engineering-with-maggie-appleton?publication_id=458709&post_id=216793339&play_audio=true&triedRedirect=true)
