---
title: "Warstwa harness jest już towarem. Zbuduj warstwę kontekstu."
excerpt: "Decoding AI podsumowuje czerwiec: teardown harnessu agentów w Claude Code, OpenCode i pi, strategia przenośnej pamięci agentów i Evaluation-Driven Development dla AI."
publishedAt: "2026-07-03"
slug: "harness-agentow-warstwa-kontekstu-edd-czerwiec-2026"
hashtags: "#decodingai #ai #agents #claudecode #edd #generated #pl"
source_pattern: "Decoding AI"
---

## Harness agenta jest już zestandaryzowany. Twoja wartość jest w warstwie kontekstu.

**TLDR:** Paul Iusztin z Decoding AI twierdzi, że większość harnessu, na którym działają agenty, jest już skompletowana i taka sama w każdym narzędziu. Część, którą wciąż warto budować samemu, to warstwa kontekstu.

**Summary:** Iusztin przeprowadził szczegółowy teardown harnessu agentów na przykładzie trzech narzędzi: Claude Code, OpenCode i pi. Dla każdego komponentu zadał pytanie nie "build versus buy", ale bardziej precyzyjne: budujesz to, konfigurujesz, czy używasz as-is. I wniosek jest taki, że zdecydowaną większość komponentów po prostu bierzesz gotową.

To jest ważne rozróżnienie, bo wielu inżynierów wciąż próbuje budować cały stos od zera, traktując harness jak źródło przewagi. Iusztin argumentuje, że ta bitwa jest już przegrana, harness stał się towarem. Prawdziwa przewaga tkwi w tym 20% komponentów, które definiują jak agent rozumie Twój specyficzny kontekst: jakie dane ma do dyspozycji, jak je pobiera, jak je łączy, jak zapamiętuje co zrobił wcześniej.

Jeśli Twój agent działa identycznie jak każdy inny, bo korzystasz z tego samego harnessu i nie zbudowałeś nic własnego na warstwie kontekstu, to nie masz żadnej przewagi. Masz tylko koszty.

**Key takeaways:**
- Harness agenta jest zdominowany przez narzędzia i standardy, które już istnieją
- Warstwa kontekstu to jedyne miejsce, gdzie budujesz realną przewagę
- Pytanie nie brzmi "build or buy", ale "build, configure, lub use as-is"
- Claude Code, OpenCode i pi mają podobną architekturę, różnią się szczegółami konfiguracji

**Why do I care:** To jest teza, z którą się zgadzam i którą obserwuję w projektach. Firmy tracą miesiące budując własny harness, zamiast skupić się na tym, co rzeczywiście robi różnicę, czyli na wiedzy domenowej zainkorporowanej w kontekst agenta. Dobry harness nie jest wyróżnikiem. Dobry kontekst jest.

**Link:** [Agentic Harness System Design: Build, Configure, Use](https://substack.com/redirect/77e883f4-a19a-42f0-8e48-5308a56d1f01)

---

## Przenośna pamięć agenta: jeden store, wiele narzędzi

**TLDR:** Strategia utrzymania danych i logiki agenta w jednym przenośnym store, który działa niezależnie od harnessu, zamiana harnessu sprowadza się do zmiany jednej linii konfiguracji.

**Summary:** Iusztin przedstawia konkretną architekturę: ujednolicony store łączący wyszukiwanie tekstowe, wektorowe i grafowe, wystawiony przez serwer MCP lub skills. Dzięki temu możesz zmienić harness na górze, nie ruszając danych i logiki.

To podejście rozwiązuje problem, który obserwuję coraz częściej: lock-in na konkretne narzędzie agentowe nie dlatego, że harness jest trudny do zastąpienia, ale dlatego, że dane i kontekst są wplecione w specyfikę narzędzia. Gdy pojawia się lepszy harness, migracja jest kosztowna i ryzykowna.

Idea "carry your context" jest praktycznie atrakcyjna, szczególnie jeśli widzisz jak szybko ewoluuje przestrzeń harnessy. Claude Code dziś, coś innego za rok. Twoje dane i kontekst powinny przeżyć tę zmianę bez wysiłku.

**Key takeaways:**
- Context store powinien być niezależny od harnessu i przenośny
- Ujednolicone przeszukiwanie tekstu, wektorów i grafu w jednym miejscu
- MCP server lub skills jako interfejs między store'em a harnesem
- Zmiana harnessu to jedna linia konfiguracji, nie migracja danych

**Why do I care:** Z perspektywy frontend developera wchodzącego głębiej w AI, ta zasada przypomina mi separację store'u od widoku w React. Twój state nie powinien zależeć od frameworka UI, a kontekst agenta nie powinien zależeć od harnessu. Zasada jednej odpowiedzialności stosowana do architektury AI. Podoba mi się.

**Link:** [Own Your Context Layer: Portable AI Agent Memory](https://substack.com/redirect/64825e5e-f0d2-410a-a7de-eeceb7c76e29)

---

## Evaluation-Driven Development: jak nie bać się zmian w agentach

**TLDR:** Alejandro Aboy opisuje EDD, podejście do iteracji na agentach, które łapie ciche regresje zanim trafią na produkcję: symuluj input, oceniaj z Opik, porównuj przed i po.

**Summary:** Iusztin przywołuje artykuł Alejandro Aboya o tym, jak bezpiecznie wysyłać zmiany w agentach. Problem, który rozwiązuje EDD, jest realny i niedoceniany: najgroźniejsze błędy w agentach to nie te, które wyrzucają exception. To te, gdzie agent działa, nie erroruje, ale coś, co wcześniej działało, jest cicho zepsute.

Evaluation-Driven Development odpowiada na to przez zautomatyzowane porównywanie zachowania agenta przed i po każdej zmianie. Wchodzi Opik jako narzędzie do oceny, symulowane inputy jako dane testowe i mechanizm porównywania outputów. Zamiast ufać, że zmiana w prompcie lub kontekście nic nie popsuła, weryfikujesz to empirycznie.

To bliższe testom regresyjnym niż klasycznym testom jednostkowym, bo oceniasz zachowanie, nie deterministyczny output. Model może odpowiedzieć inaczej i wciąż być poprawny. Lub odpowiedzieć tak samo i być błędny. Potrzebujesz ewaluatora, który to rozumie.

**Key takeaways:**
- Ciche regresje są groźniejsze niż jawne błędy w agentach
- EDD: symuluj inputy, oceniaj z Opik, porównuj zachowanie przed i po zmianie
- Automatyczna ewaluacja powinna blokować merge jeśli wykryje regresję
- Opik jako narzędzie do LLM-as-judge w procesie CI/CD dla agentów

**Why do I care:** To jest gap, który widzę w prawie każdym projekcie agentowym. Ludzie testują "czy odpowiada", nie "czy odpowiada dobrze i konsekwentnie". EDD to inżynierskie podejście do problemu, który inaczej rozwiązujesz nadzieją. Jako ktoś, kto lubi mieć pewność przed deployem, cieszy mnie, że ta dziedzina dojrzewa.

**Link:** [How Evaluation-Driven Development (EDD) Works for AI Agents](https://substack.com/redirect/3f9106b6-a0d6-4c22-86f3-49d571ba6196)
