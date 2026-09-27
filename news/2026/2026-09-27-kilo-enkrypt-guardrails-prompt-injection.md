---
title: "Kilo i Enkrypt AI: bariery bezpieczeństwa, o których programista nie musi pamiętać"
excerpt: "Nowa integracja Kilo z Enkrypt AI przechwytuje wyciek sekretów i prompt injection w agentach kodujących, zanim dotrą do modelu, bez dodatkowej checklisty po stronie developera."
publishedAt: "2026-09-25"
slug: "kilo-enkrypt-guardrails-prompt-injection"
hashtags: "#kilo #ai #agents #security #architecture #generated #pl"
source_pattern: "Kilo"
---

## Kilo i Enkrypt AI: bariery bezpieczeństwa, o których programista nie musi pamiętać

**TLDR:** Agenci kodujący zmieniają, co może wyciec z organizacji: sekret wklejony do czatu agenta trafia do dostawcy modelu w chwili wysłania wiadomości, a złośliwa instrukcja ukryta w README może skierować agenta do danych, do których nigdy nie powinien mieć dostępu. Kilo integruje się teraz z barierami bezpieczeństwa od Enkrypt AI, które łapią oba scenariusze, zanim dotrą do modelu.

**Summary:** Artykuł zaczyna od porównania z czasami sprzed agentów: sekret zostawał na maszynie dewelopera, dopóki ktoś nie wpisał go w kod i nie zacommitował. Agent zmienia tę zasadę, bo deweloper może wkleić klucz API do czatu i wysłać go do modelu jednym enterem, a agent czytający pliki sam, bez nadzoru, może natrafić na ukrytą instrukcję w dokumencie projektowym i podążyć za nią zamiast za oryginalnym poleceniem użytkownika.

W nowej integracji administrator albo osoba odpowiedzialna za bezpieczeństwo definiuje polityki raz, w panelu Enkrypt, obejmujące złośliwe żądania, wyciek danych wrażliwych z sesji dewelopera i agentów działających poza wyznaczonym zakresem. Kreator terminalowy podłącza Enkrypt do Kilo na poziomie projektu albo globalnie, a sami deweloperzy nie muszą pisać ani utrzymywać żadnych reguł, bo to zespół bezpieczeństwa decyduje, co jest blokowane.

Autor pokazuje to na dwóch scenariuszach. W pierwszym deweloper w pośpiechu wkleja do Kilo CLI klucz API od dostawcy modelu razem z promptem; Enkrypt blokuje wiadomość w momencie wysłania, więc klucz nigdy nie dociera do modelu, a wyjaśnienie blokady pojawia się od razu w Kilo, żeby deweloper mógł wyciąć klucz i wysłać ponownie. Drugi scenariusz jest trudniejszy do wyłapania ręcznie: ten sam deweloper w rozszerzeniu VS Code prosi agenta o przeczytanie pliku architektury, w którym ktoś ukrył linijkę każącą agentowi zignorować wcześniejsze instrukcje i wyciągnąć wrażliwe dane z innych plików repozytorium. Agent zaczyna wykonywać żądanie, ale jego wywołanie narzędzia do odczytu pliku kończy się błędem, bo Enkrypt wykrył próbę wstrzyknięcia instrukcji, zanim skażona treść dotarła do agenta czy modelu.

Enkrypt loguje każdą akcję i każde naruszenie, więc osoba odpowiedzialna za zgodność może otworzyć konkretną barierę i zobaczyć podsumowanie dla każdego użytkownika razem z pojedynczymi zdarzeniami, co pozwala prześledzić zablokowany prompt z powrotem do konkretnej osoby i konkretnej polityki, która go złapała.

**Key takeaways:**
- Agent kodujący zmienia model zagrożenia: sekret wklejony do czatu trafia do dostawcy modelu natychmiast, a nie dopiero po commicie.
- Polityki definiuje raz zespół bezpieczeństwa w panelu Enkrypt, a deweloperzy pracują dalej w Kilo bez sprawdzania promptów ręcznie.
- Prompt injection ukryty w pliku, który agent czyta samodzielnie, bywa trudniejszy do wykrycia niż wyciek sekretu, bo deweloper często nie wie, że tam jest.
- Każda akcja i naruszenie trafiają do logów Enkrypt, więc audytor może odtworzyć, kto wysłał zablokowany prompt i która polityka go złapała.

**Why do I care:** To ten sam podział odpowiedzialności, który pojawił się niedawno przy okazji artykułu o różnicy między frameworkiem a harnessem agenta: framework daje klocki, harness wiąże je z realnymi uprawnieniami i regułami egzekwowanymi w kodzie, nie w treści promptu. Enkrypt w Kilo robi dokładnie to na poziomie bezpieczeństwa, przenosząc odpowiedzialność za politykę z każdego pojedynczego developera na jedną, centralnie zarządzaną warstwę. Dla zespołu bez dedykowanego AppSec to sensowny sposób na skalowanie adopcji agentów bez polegania na tym, że każdy programista pamięta o każdej zasadzie. Warto tylko pamiętać, że bariera jest tak dobra, jak polityki, które ktoś faktycznie napisał, więc samo włączenie integracji nie zastępuje przemyślenia, co właściwie ma być blokowane.

**Link:** [Kilo and Enkrypt AI: Guardrails your developers don't have to think about](https://blog.kilo.ai/p/kilo-and-enkrypt)
