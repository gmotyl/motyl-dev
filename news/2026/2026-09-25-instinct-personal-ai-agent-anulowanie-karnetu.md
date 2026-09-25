---
title: "Osobisty agent AI, który naprawdę załatwia sprawy: przypadek Instinct"
excerpt: "Autor testuje osobistego agenta AI Instinct, zlecając mu odwołanie rodzinnego karnetu na siłownię, i na tym drobnym przykładzie pokazuje różnicę między czatbotem a agentem, który kończy sprawę."
publishedAt: "2026-09-23"
slug: "instinct-personal-ai-agent-anulowanie-karnetu"
hashtags: "#kilo #agents #ai #llm #productivity #generated #pl"
source_pattern: "Kilo"
---

## Osobisty agent AI, który naprawdę załatwia sprawy: przypadek Instinct

**TLDR:** Autor bloga Kilo opisuje, jak zlecił osobistemu agentowi AI Instinct odwołanie rodzinnego karnetu na siłownię YMCA, pisząc do niego zwykłą wiadomość na iMessage. Agent sam przeszedł przez logowanie, kod weryfikacyjny i awarię strony YMCA, po czym zapytał o ostateczną zgodę przed anulowaniem subskrypcji. Tekst używa tego drobnego zadania jako pretekstu do szerszej rozmowy o różnicy między chatbotem, który doradza, a agentem, który faktycznie kończy sprawę.

**Summary:** Wiadomość brzmiała prosto: chcę anulować karnet na YMCA. Autor wysłał ją z telefonu, bez laptopa, bez przygotowania, w momencie gdy temat akurat przypomniał mu się o ósmej rano. Odbiorcą był Instinct, osobisty agent AI działający przez iMessage, jeden z trzech obecnie testowanych podejść do tego samego problemu. OpenClaw idzie w stronę pełnej kontroli: agent podłączony do kont i komputera użytkownika, otwarty kod, elastyczność okupiona koniecznością samodzielnej konfiguracji i utrzymania. Muse od Mety celuje w masowego odbiorcę, z agentem obsługującym przeglądarkę i połączone aplikacje, który działa dalej nawet po zamknięciu aplikacji. Instinct stawia na dostępność: agent ma być równie łatwy do zagadnięcia jak każda inna osoba w wiadomościach.

Różnica, o którą tu chodzi, brzmi banalnie, dopóki nie zestawi się jej z realnym zachowaniem. Chatbot potrafi wytłumaczyć, jak anulować karnet. Wykonanie zostaje po stronie człowieka. Agent ma tę różnicę znieść: przyjąć zadanie i wrócić dopiero wtedy, gdy potrzebuje decyzji. W praktyce wyglądało to tak, że Instinct dopytał, do którego oddziału należy członkostwo, poprosił o adres e-mail, bo numer telefonu nie był powiązany z kontem, i poprosił o przekazanie kodu logowania. Znalazł członkostwo rodzinne i wrócił z konkretami: rezygnacja kończy dostęp rodziny 30 września i zatrzymuje obciążenie 60 dolarów zaplanowane na 1 października, bez zaległości, opłat za rezygnację czy dodatkowych programów do rozliczenia. Dopiero wtedy zapytał, czy kontynuować.

Strona YMCA zerwała połączenie w trakcie logowania. Agent nie zgłosił fałszywego sukcesu, tylko poinformował, że nic nie zostało anulowane, i poprosił o nowy kod. Po drugiej próbie połączenie przeszło, a autor dostał mailowe potwierdzenie rezygnacji. Do 11:30 Instinct pisał już z pytaniem, co jeszcze warto załatwić. Autor przyznaje, że nie potrafi wskazać dokładnego momentu zakończenia procesu, bo cały czas obecności w tej sprawie sprowadzał się do kilku krótkich odpowiedzi i przekazywania kodów, bez siadania przy komputerze.

To prowadzi do sedna tekstu: liczenie oszczędności w minutach jest tu złą matematyką. Karnet nie był aktywny z braku piętnastu minut w tygodniu, tylko dlatego, że te piętnaście minut musiało wypaść przy komputerze, z odpowiednim logowaniem, cierpliwością do przejścia przez proces strony i uwagą, by sprawdzić, czy rezygnacja faktycznie zaszła. Takich zadań w gospodarstwie domowym jest mnóstwo, bo każde z osobna wydaje się zbyt małe, by je zaplanować, i zbyt irytujące, by zająć się nim od razu.

Autor łączy to z szerszym wzorcem w AI: świętujemy szybkość pierwszego kroku, ignorując wszystko, co dzieje się po nim. Generowanie kodu jest szybkie, przegląd i scalenie może zająć dni. Napisanie maila jest szybkie, decyzja co napisać i kto ma to wysłać zostaje przy człowieku. Agenci osobiści mają ten sam problem, a prawdziwy test to nie wypełnienie formularza w demie, tylko sytuacja, w której konto jest zarejestrowane na inny e-mail, strona się wywraca, w grę wchodzi członkostwo rodzinne i zbliża się obciążenie karty. Instinct zdał ten test w opisanym przypadku, informując o stanie sprawy na bieżąco, prosząc o zgodę przed decyzją nieodwracalną i dostarczając potwierdzenie na końcu. Autor zaznacza, że nie chodziło o wyłączenie człowieka z procesu, tylko o zdjęcie z niego odpowiedzialności za każdy krok pomiędzy prośbą a wynikiem.

**Key takeaways:**
- Instinct, OpenClaw i Meta Muse reprezentują trzy różne podejścia do osobistego agenta AI: pełna kontrola i otwarty kod, masowy odbiorca z przeglądarką, oraz dostępność przez zwykłe wiadomości.
- Kluczowa różnica między chatbotem a agentem to nie jakość odpowiedzi, tylko zdolność do doprowadzenia zadania do końca bez ciągłego nadzoru człowieka.
- Prawdziwym testem agenta jest zachowanie w warunkach awaryjnych: inne dane logowania, zrywające się połączenie, konieczność prośby o zgodę przed nieodwracalną decyzją.
- Wartość takich narzędzi bierze się z odciążenia uwagi na drobne, rozproszone zadania, a nie z oszczędności liczonej w minutach.
- Użyteczność agenta rośnie razem z zakresem dostępu do kont i danych, co czyni pytanie o zaufanie coraz mniej teoretycznym.

**Why do I care:** Z perspektywy architekta częściej projektuję systemy, które integrują się z kontami i procesami użytkownika, niż same modele, więc ten tekst czytam jako opis kompromisu, przed którym stają wszyscy budujący agentów: im więcej dostępu dajemy agentowi, tym więcej może za nas załatwić, ale też tym więcej może popsuć bez natychmiastowej kontroli. To bardziej historia produktowa i konsumencka niż inżynierska, ale programiści powinni ją znać, bo dokładnie te same pytania: czy agent wie, gdzie jest w procesie, czy przyznaje się do braku postępu, czy pyta przed decyzją nieodwracalną, wracają w każdym projekcie agentowym budowanym dla klientów biznesowych. Anegdota z YMCA nie dowodzi niczego na temat niezawodności Instinct w skali, ale dobrze pokazuje kryteria, według których warto oceniać każdego agenta, zanim odda się mu dostęp do czegokolwiek ważniejszego niż karnet na siłownię.

**Link:** [I canceled my YMCA membership by sending a text to Instinct](https://blog.kilo.ai/p/i-canceled-my-ymca-membership-by?publication_id=4363009&post_id=217111189&action=share&triggerShare=true&isFreemail=true&triedRedirect=true)
