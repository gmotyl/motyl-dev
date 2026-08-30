---
title: "OpenAI odcina Cursora od swoich modeli: dlaczego wolność wyboru modelu to nie to samo co lista rozwijana"
excerpt: "Po decyzji OpenAI o wygaszeniu dostępu Cursora do swoich modeli, Kilo argumentuje, że prawdziwa wolność wyboru modelu wymaga niezależności narzędzia od producenta modelu, a nie tylko dłuższej listy w dropdownie."
publishedAt: "2026-08-30"
slug: "kilo-model-freedom-cursor-openai"
hashtags: "#kilo #ai #llm #devtools #cursor #generated #pl"
source_pattern: "Kilo"
---

## Twoje narzędzie do kodowania nie powinno wybierać za ciebie modelu

**TLDR:** OpenAI ogłosiło, że przestanie udostępniać swoje modele Cursorowi po zmianie kontroli nad firmą, z dostępem wygaszanym do 12 listopada 2026. Kilo wykorzystuje ten precedens, żeby postawić tezę: model dropdown to nie to samo co wolność wyboru modelu, bo prawdziwa niezależność wymaga, żeby firma budująca narzędzie nie budowała jednocześnie modelu w środku.

**Summary:** Autor od razu odcina się od kwestii, kto ma rację w sporze Cursor-OpenAI, i przechodzi do sedna: deweloperzy zbudowali swój codzienny workflow wokół konkretnego narzędzia i konkretnego modelu, a teraz mogą stracić możliwość korzystania z nich razem z powodu sporu, którego nie zainicjowali i nie kontrolują. To ryzyko wynajmowania swojego workflow od firm, których motywacje nie są twoimi motywacjami, i moim zdaniem to jest dokładnie ten rodzaj ryzyka, o którym większość zespołów myśli dopiero, kiedy już je dotknie.

Ciekawszy jest argument strukturalny, nie sam incydent. Kilo zauważa, że nawet narzędzie oferujące wiele modeli niekoniecznie daje wolność wyboru, jeśli firma za tym narzędziem sama buduje jeden z modeli. Taka firma ma wbudowaną motywację ekonomiczną, żeby faworyzować własny model: decyduje, które integracje są najgłębsze, które modele dostają nowe funkcje jako pierwsze, jak są wycenione i czy w ogóle zostają dostępne. Autor podkreśla, że żadna z tych decyzji nie musi wynikać ze złej woli, każda z osobna może być racjonalna z punktu widzenia firmy, i właśnie to czyni z tego problem strukturalny, a nie kwestię intencji konkretnych ludzi.

Z tego wynika konkretna checklista dla każdego, kto ocenia platformę do kodowania z AI: czy można podpiąć własny klucz API, czy ceny i ograniczenia modeli są przejrzyste, jak szybko nowe modele trafiają do narzędzia, czy konkurencyjne modele dostają pełnoprawne wsparcie czy tylko wpis w dropdownie, i czy prompty, reguły oraz kontekst przenoszą się bez strat przy zmianie modelu. Ostatnie pytanie, czy firma zarabia więcej, kiedy wybierasz najlepszy model dla siebie, czy kiedy wybierasz najlepszy model dla niej, jest tym, które faktycznie odróżnia niezależną platformę od takiej, która tylko sprawia takie wrażenie.

Warto zauważyć, że sam Kilo nie twierdzi, że jest odporny na te same ryzyka co Cursor, tylko że nie centralizuje ich wokół jednego dostawcy. Providerzy modeli nadal mogą zmienić warunki, ograniczyć dostęp albo podjąć decyzję biznesową, która wpłynie na dostępność, ale niezależna platforma nie robi z tego jednego providera centrum całego twojego workflow.

**Key takeaways:**
- OpenAI wygasza dostęp Cursora do swoich modeli do 12 listopada 2026 po zmianie kontroli nad firmą
- Model dropdown z wieloma opcjami nie oznacza automatycznie wolności wyboru, jeśli twórca narzędzia sam buduje jeden z modeli
- Kluczowe pytania przy wyborze platformy: własny klucz API, przejrzystość cen, szybkość dodawania nowych modeli, przenośność promptów i kontekstu
- Ryzyka providera (outage, limity, zmiana cen, wycofanie modelu) są realne niezależnie od tego, czy incydent trafia na pierwsze strony

**Why do I care:** Ten spór to konkretny argument za tym, żeby przy wyborze narzędzia do kodowania z AI patrzeć nie tylko na listę wspieranych modeli dzisiaj, tylko na strukturę zachęt firmy, która to narzędzie robi. Jako architekt doradziłbym każdemu zespołowi budującemu proces wokół jednego narzędzia i jednego modelu, żeby potraktował portowalność promptów i możliwość podpięcia własnego klucza API jako wymaganie produktowe, a nie miły dodatek, bo koszt migracji w środku pilnego sprintu jest dużo wyższy niż koszt sprawdzenia tego wcześniej.

**Link:** [Your Coding Tool Should Not Choose Your Model for You](https://blog.kilo.ai/p/your-coding-tool-should-not-choose)
