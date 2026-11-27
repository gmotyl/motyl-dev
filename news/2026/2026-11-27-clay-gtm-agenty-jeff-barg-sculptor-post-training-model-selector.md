---
title: "Jak Clay buduje agentów GTM: Sculptor, post-training i model selector, którego nikt nie lubi"
excerpt: "Jeff Barg, Head of AI w Clay, o przebudowie agenta na coding agenta, kosztach kwalifikowania 40 milionów firm i agentach, które wciąż nie potrafią debugować innych agentów."
publishedAt: "2026-11-26"
slug: "clay-gtm-agenty-jeff-barg-sculptor-post-training-model-selector"
hashtags: "#latentspace #ai #agents #llm #architecture #engineering #generated #pl"
source_pattern: "Latent Space"
---

## Jak Clay buduje agentów GTM, rozmowa z Jeffem Bargiem

**TLDR:** Clay chce, żeby wyniki były podobne niezależnie od tego, czy klient używa ich własnego agenta, czy podpina Claude Code do Claya. Użycie dzieli się już mniej więcej pół na pół. Odcinek pokazuje, co zadziałało, co zawiodło i gdzie agenci wciąż są naiwni.

**Summary:** Jeff dołączył do Claya, gdy firma przejęła Avenue, startup od alertów operacyjnych, który współzałożył. Wtedy Clay miał około pięćdziesięciu osób, a Avenue pięć. Od tamtej pory firma urosła około dziesięć razy, do mniej więcej sześciuset osób, a we wrześniu zebrała 115 milionów dolarów przy wycenie 7,1 miliarda. Pierwszy agent, Sculptor, ruszył we wrześniu 2025 i był pętlą narzędzi z dopracowanym promptem systemowym. Świetnie dodawał kolumny, ale fatalnie radził sobie z umówieniem dziesięciu kwalifikowanych spotkań. Ewaluacje nie wychwytywały problemu, bo LLM oceniał tylko, które narzędzia agent wywołał, a pomijały to, co ludzie faktycznie z nim robili, na przykład analizę tabel z milionami wierszy.

Wnioski były trzy: agenci kodujący są bardzo dobrzy w Bashu i Pythonie, narzędzia Sculptora były zbyt ograniczone do łączenia, a agent nie widział danych z CRM ani wyników kampanii. Dlatego Clay przebudował agenta jako coding agenta na harnessie Pi, z CLI Claya w chmurowym sandboxie i nową warstwą danych Audiences, która łączy rekordy z CRM i Gonga. O post-trainingu Jeff mówi, że większość firm zaczyna zbyt wcześnie. Opłaca się dopiero przy wydatkach na inferencję rzędu od 10 do 100 milionów dolarów, a próba przebicia modeli frontowych w jednej domenie wciąż jest bardzo trudna.

Najbardziej konkretna liczba to koszt kwalifikacji całej bazy. Przy 40 milionach firm, około tysiącu tokenów na stronę LinkedIn i pięciuset na profil idealnego klienta, klasyfikator pokroju Jev od TypeSafe przeliczyłby wszystkie za około 1500 dolarów. Dziś klienci kwalifikują zwykle listy po kilkanaście tysięcy firm. Jeff uważa, że kwalifikacja jest prawie rozwiązana, bo modele zdają ewaluacje Claya od około roku, a frontowe modele są potrzebne do głębokiego researchu i orkiestracji.

Stos infrastrukturalny jest zaskakująco prosty. Clay używa BullMQ, bez Temporala i LangGraph, do tego Postgresa, ClickHouse i Snowflake. Trudność pojawiła się przy skali, bo ludzie uruchamiają agenta na wiersz, więc tabela z 50 tysiącami firm tworzy nagły skok zapotrzebowania. Zespół dodał LangSmith, throttling oraz pauzę i wznawianie przy awarii dostawcy, a najtrudniejsza okazała się sprawiedliwość: ktoś uruchamiający workflow dla dziesięciu osób nie może czekać, aż enterprise wzbogaci milion wierszy.

Są też dwie historie o zmianie planów. Clay był partnerem startowym aplikacji ChatGPT i przeznaczył na integrację około ćwierć inżynierów na miesiąc. Dwa dni przed premierą OpenAI przełożyło ją bezterminowo, a po trzech czy czterech dniach zmieniło zdanie. Z kolei Workflows na początku zdenerwowały klientów, którzy chcieli swojego arkusza, a dziś większość workflowów buduje agent albo CLI. Na koniec Jeff przyznaje, że agenci wciąż nie potrafią czytać długich śladów innych agentów: zwykle wskazują krok, który trwał długo, nawet gdy błąd był gdzie indziej, więc wiele umiejętności Clay nadal pisze ręcznie.

**Key takeaways:**
- Przebudowa na coding agenta z CLI w sandboxie dała więcej niż strojenie promptu i zestawu narzędzi.
- Post-training ma sens dopiero przy bardzo dużych wydatkach na inferencję.
- Klienci nie chcą wybierać modelu, więc Clay wprowadza automatyczny router, zostawiając selektor dla zaawansowanych.
- Debugowanie śladów agentów przez agentów wciąż nie działa.

**Why do I care:** Dla architekta najcenniejsza jest uwaga, że agent ma działać dobrze także z zewnętrznego harnessu, więc API i CLI są pełnoprawnym produktem, a nie dodatkiem. Rozmowa pomija jednak koszt utrzymania ręcznie pisanych umiejętności i to, jak mierzyć jakość, skoro ewaluacje oparte na sędzi LLM już raz nie wychwyciły prawdziwego użycia. Liczba 1500 dolarów dotyczy samego klasyfikatora na tokenach, bez pozyskania i odświeżania danych, więc to dolna granica, nie cena całej usługi.

**Link:** [How Clay Builds GTM Agents, Jeff Barg, Head of AI](https://lspace.beehiiv.com/podcast/s/latent_space_the_ai_engineer_podcast/how_clay_builds_gtm_agents_jeff_barg_head_of_ai)
