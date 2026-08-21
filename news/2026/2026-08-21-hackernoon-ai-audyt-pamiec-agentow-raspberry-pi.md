---
title: "AI audyt bezpieczeństwa, pamięć agentów i lokalne modele na Raspberry Pi: przegląd HackerNoon"
excerpt: "Skrót najciekawszych historii z dziennego digestu HackerNoon: jak AI znalazło w minutach błąd, którego własny audytor Coinkite nie wykrył przez pięć lat, dlaczego większe okno kontekstu nie zastąpi dobrze zaprojektowanej pamięci agenta, i jak postawić lokalny model AI na Raspberry Pi 5."
publishedAt: "2026-08-20"
slug: "hackernoon-ai-audyt-pamiec-agentow-raspberry-pi"
hashtags: "#HackerNoon #ai #security #agents #raspberrypi #ollama #generated #pl"
source_pattern: "HackerNoon"
---

## AI znalazło w minutach błąd, który audytor Coinkite przegapił przez pięć lat

**TLDR:** Autor opisuje, jak przy pomocy AI trzykrotnie odtworzył wykrycie błędu w kodzie Coinkite, który kosztował 114 milionów dolarów w Bitcoinie i pozostawał niezauważony przez pięć lat, mimo że firma przeszła własny audyt AI.

**Summary:** Ten materiał to jeden z tych tekstów, gdzie sam nagłówek robi większość roboty: błąd wart 114 milionów dolarów siedział w kodzie pięć lat, a autor znalazł go z pomocą AI w kilka minut, i powtórzył to trzy razy z trzech, dla pewności, że to nie przypadek. Kluczowe jest to, że własny audyt bezpieczeństwa oparty na AI, który przeprowadził dostawca, tego błędu nie wykrył. Autor tłumaczy to nie jako porażkę samej technologii, ale jako efekt złego ukierunkowania audytu, czyli sprawdzania niewłaściwych rzeczy, niewłaściwym promptem, w niewłaściwym miejscu kodu.

Ten case pokazuje coś ważnego o audytach AI w bezpieczeństwie: sam fakt użycia modelu językowego do przeglądu kodu nic nie gwarantuje, jeśli zapytanie nie jest precyzyjnie wycelowane w klasę problemu, którego szukasz. To potwierdza intuicję, którą widać też w artykule o Domain-Driven Design z tego samego dnia: precyzja pytania decyduje o jakości odpowiedzi agenta znacznie bardziej niż sama moc modelu.

**Key takeaways:**
- Błąd kosztował 114 milionów dolarów w Bitcoinie i pozostawał niewykryty przez pięć lat.
- Autor odtworzył wykrycie trzy razy z trzech przy pomocy AI, w kilka minut każde.
- Wcześniejszy audyt bezpieczeństwa oparty na AI, przeprowadzony przez dostawcę, tego błędu nie wyłapał.

**Why do I care:** Ten tekst jest dla mnie przypomnieniem, że "zrobiliśmy audyt z AI" nie jest równoznaczne z "audyt był dobry". Jako architekt patrzę na to jako na argument za tym, żeby traktować wyniki audytów AI z tą samą podejrzliwością co wyniki automatycznych testów, czyli sprawdzać nie tylko czy narzędzie coś raportuje, ale czy w ogóle szuka tego, co powinno.

## Pamięć agenta to nie tylko większe okno kontekstu

**TLDR:** Artykuł argumentuje, że milion tokenów kontekstu powiększa magazyn, ale nie zastępuje mechanizmów decydujących, co trafia do pamięci, co z niej wraca, co się poprawia i co trzeba zapomnieć.

**Summary:** Autor rozbija problem pamięci agentów na system bram decyzyjnych, a nie na samą pojemność okna kontekstu. Większy magazyn zwiększa to, co można przechować, ale jakość pamięci zależy od tego, co faktycznie trafia na "stół roboczy" agenta w danym momencie. Systemy zawodzą w dwóch różnych miejscach, każde wymagające innego podejścia projektowego: jedno to dobór tego, co zapisać, drugie to dobór tego, co odzyskać i wykorzystać w danej chwili.

To jest dobre uzupełnienie coraz popularniejszej narracji "po prostu dajmy modelowi więcej kontekstu". Więcej miejsca w magazynie nie rozwiązuje problemu selekcji i to jest właśnie miejsce, gdzie większość realnych implementacji pamięci agentów się wywraca.

**Key takeaways:**
- Wielkość okna kontekstu i jakość pamięci agenta to dwa różne problemy inżynierskie.
- Systemy pamięci zawodzą albo przy doborze tego, co zapisać, albo przy doborze tego, co odzyskać.
- Rosnące okna kontekstu nie zastępują projektowania mechanizmów zapisu, odzyskania, korekty i zapominania.

**Why do I care:** To jest temat, który spotykam teraz w co drugiej rozmowie o architekturze agentów. Firmy chcą kupić większe okno kontekstu jako rozwiązanie problemu pamięci, a to jest trochę jak kupowanie większej szafy w nadziei, że rozwiąże to bałagan w domu. Warto to potraktować jako osobny problem projektowy, nie jako parametr modelu do podkręcenia.

## Lokalny AI na Raspberry Pi 5 bez chmury i bez rachunków

**TLDR:** Praktyczny przewodnik pokazuje, jak postawić prywatny, lokalny inference AI na Raspberry Pi 5 z ograniczoną pamięcią RAM, wraz z listą modeli, które faktycznie dają się uruchomić na architekturze ARM.

**Summary:** Autor opisuje krok po kroku, jak zainstalować Ollamę na Raspberry Pi 5, gdzie rejestruje się jako usługa systemd i startuje automatycznie, oraz jakie modele realnie działają w warunkach ograniczonego RAM-u na architekturze ARM. To jest dokładnie ten typ przewodnika, który różni się od teoretycznych porównań benchmarkowych, bo mówi wprost co działa, a co nie, na konkretnym, tanim sprzęcie.

**Key takeaways:**
- Ollama na Raspberry Pi 5 rejestruje się jako usługa systemd i startuje automatycznie po restarcie.
- Przewodnik skupia się na modelach realnie działających w warunkach ograniczonego RAM na ARM.
- To podejście daje prywatny, lokalny inference bez zależności od chmury i bez miesięcznych rachunków za API.

**Why do I care:** Coraz częściej rozmawiam z zespołami, które chcą przetestować lokalny inference zanim zdecydują się na kosztowną integrację z API dostawcy modelu. Tani sprzęt typu Raspberry Pi 5 to dobry poligon do takich testów, zwłaszcza dla zadań, które nie wymagają najmocniejszego modelu na rynku, tylko wystarczająco dobrego i w pełni pod twoją kontrolą.

**Link:** [8/20/2026 Newsletter](https://hackernoon.com/p/8-20-2026-newsletter)
