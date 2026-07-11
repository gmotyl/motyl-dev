---
title: "Przejmij kontrolę nad zewnętrzną pętlą — inżynieria agentowa na poważnie"
excerpt: "Addy Osmani tłumaczy, dlaczego w erze agentów AI inżynierowie muszą przejąć odpowiedzialność za zewnętrzną pętlę systemu, a nie tylko delegować pracę maszynom."
publishedAt: "2026-07-10"
slug: "przejmij-kontrole-nad-zewnetrzna-petla"
hashtags: "#AddyOsmani #AI #agentic #engineering #softwareengineering #accountability #frontend #generated #pl"
source_pattern: "Addy Osmani"
---

## Przejmij kontrolę nad zewnętrzną pętlą

**TLDR:** W świecie, gdzie agenty AI generują coraz więcej kodu, prawdziwą wartością inżyniera staje się nie umiejętność pisania kodu, lecz zdolność do weryfikacji, odpowiedzialności i podejmowania decyzji na granicach systemu. Osmani wprowadza trzy kluczowe pojęcia: Jakość, Werdykt i Rozliczalność — i przekonuje, że tylko ludzie mogą "posiadać" zewnętrzną pętlę.

**Summary:** Przez ostatni rok branża dyskutuje o harnesach, pętlach, flotach agentów i fabrykach oprogramowania. Osmani ma do powiedzenia jedno: to wszystko ładne słowa, ale ktoś musi za to odpowiadać. I ten ktoś to inżynier — nie model, nie framework, nie organizacja in abstracto. Konkretna osoba, która może powiedzieć "wiem, co zmieniłem, dlaczego to bezpieczne i co zrobię, kiedy się mylę".

Trzy pojęcia strukturyzują ten argument. Pierwsze to Jakość — wszystkie mechanizmy weryfikacji, które instalujemy zanim wpuścimy system na produkcję. Testy, type-checking, limity sandboxów, logi audytowe. Zwykłe narzędzia inżynierskie, które generują sygnały, a te sygnały dają nam "back pressure" — coś w rodzaju oporu hydraulicznego, który kontroluje przepływ pracy agenta. Drugie pojęcie to Werdykt — decyzja produkcyjna: czy shipujemy, blokujemy, zawężamy, dodajemy guardrail, czy odrzucamy. Model może napisać linię kodu, ale Werdykt należy do człowieka. Trzecie pojęcie to Rozliczalność — gwarancja, że jeśli ktoś zapyta, potrafię wyjaśnić dlaczego. To nie jest miła opcja. To warunek konieczny skalowalnej inżynierii agentowej.

Co mnie tu uderza, to diagnoza luki zaufania. Sonar w raporcie z 2026 roku podaje, że 42% commitowanego kodu jest generowane lub istotnie wspomagane przez AI, i ten udział ma rosnąć. Jednocześnie GitLab pokazuje, że governance często dzieje się PO stworzeniu kodu — czyli po tym, jak ryzyko już zostało zaakceptowane i kontrola utracona. Innymi słowy: przyspieszyliśmy generowanie szybciej niż przyspieszyliśmy weryfikację. To nie jest dobre miejsce, w którym chcemy się znajdować.

Osmani opisuje trzy ukryte koszty, które mnie osobiście najbardziej interesują. Pierwszym jest "kognitywna kapitulacja" — ślepe akceptowanie wyników AI. Badanie Wharton School pokazuje, że gdy AI się myli, prawie trzy czwarte ludzi i tak to przyjmuje, i to z większą pewnością siebie niż bez AI. Drugi koszt to "dług kognitywny" — erozja rozumienia. Badanie Anthropic w kontrolowanej próbie wykazało, że inżynierowie, którzy polegają na AI przy pisaniu kodu, wypadają o 17 punktów procentowych gorzej na testach rozumienia kodu niż ci, którzy piszą go samodzielnie. Trzeci koszt to "podatek orkiestracyjny" — łatwo uruchomić wiele agentów, ale twoja zdolność poznawcza nie zrównoleglenia się tak samo jak oni.

Najbardziej subtelna część artykułu dotyczy systemów brownfield — czyli tego, co większość z nas ma na co dzień. Stary, ożywiony przez kolejne pokolenia zespołów, pełen milczących założeń kod. Osmani mówi wprost: zachowanie systemu, które musisz zaudytować, nie żyje w kodzie. Żyje w bliznach. I to jest dokładnie to, czego agenty nie rozumieją — kontekstu historycznego, decyzji pominięcia, tymczasowych rozwiązań, które stały się permanentne. Stewardship brownfield wymaga zamiany wiedzy implicytnej na explicytne ograniczenia, co jest pracą, której nie można zautomatyzować.

**Key takeaways:**
- Ludzie powinni posiadać zewnętrzną pętlę (werdykt, rozliczalność, właściwość) — agenty działają wewnątrz pętli (implementacja, weryfikacja, raportowanie)
- 42% kodu jest już AI-generowane lub wspomagane, ale procesy weryfikacji nie nadążają — mamy lukę zaufania
- Kognitywna kapitulacja i dług kognitywny to realne, mierzalne zagrożenia, nie filozoficzne obawy
- Back pressure — mechanizmy kontrolujące tempo i zakres działania agentów — to warunek konieczny bezpiecznej skali
- Systemy brownfield są szczególnie ryzykowne, bo wiedza systemu żyje w bliznach, nie w kodzie

**Why do I care:** Ten artykuł trafia w coś, co od jakiegoś czasu mi przeszkadza w dyskusji o AI w inżynierii. Wszyscy rozmawiają o produktywności — ile linii kodu więcej można wygenerować, jak szybko agent ukończy zadanie. Nikt nie pyta, kto to przejrzy, kto to zrozumie i kto odpowie, kiedy coś się posypie na produkcji o 3 w nocy. Osmani daje tu konkretny model mentalny: wewnętrzna pętla należy do agenta, zewnętrzna do inżyniera. To proste rozróżnienie, ale niesie ogromne konsekwencje dla tego, jak projektujemy procesy review, jak konfigurujemy uprawnienia agentów i jak myślimy o odpowiedzialności w zespole. Szczególnie blisko serca leży mi punkt o brownfield — bo właśnie tam pracuje zdecydowana większość z nas, i właśnie tam automatyzacja bez odpowiedniego back pressure jest najbardziej niebezpieczna.

**Link:** [Own The Outer Loop](https://addyo.substack.com/p/own-the-outer-loop)
