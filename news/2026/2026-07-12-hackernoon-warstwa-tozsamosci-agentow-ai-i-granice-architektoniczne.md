---
title: "Warstwa tożsamości dla agentów AI i granice architektoniczne w oprogramowaniu"
excerpt: "Dwa artykuły z HackerNoon: o tym, jak MCP i A2A budują tożsamość agentów AI, oraz o tym, jak teoria warstw tempa z urbanistyki pomaga projektować granice w architekturze oprogramowania."
publishedAt: "2026-07-11"
slug: "hackernoon-warstwa-tozsamosci-agentow-ai-i-granice-architektoniczne"
hashtags: "#hackernoon #ai #agents #architecture #security #mcp #a2a #generated #pl"
source_pattern: "HackerNoon"
---

## Warstwa tożsamości dla agentów AI jest w końcu budowana

**TLDR:** Cztery miesiące po artykule twierdzącym, że agenci AI nie mają tożsamości i to jest kryzys bezpieczeństwa, autor sprawdza, co się zmieniło. Protokoły MCP i A2A zrobiły realny postęp, ale luka między zarządzaniem dostępem a tożsamością per instancja wciąż istnieje.

**Summary:**

W marcu 2026 roku autor opublikował tekst alarmujący, że systemy agentowe operują na wspólnych kontach, wielokrotnie używanych kluczach API i uprawnieniach znacznie szerszych niż wymagają tego poszczególne zadania. Cztery miesiące później diagnoza pozostaje aktualna, ale coś się zmieniło: problem stał się wreszcie jawny i wszedł do oficjalnych specyfikacji.

Pierwszym istotnym krokiem był A2A Protocol v1.0.0, wydany 12 marca. Specyfikacja usunęła przestarzałe przepływy OAuth, dodała Device Code i PKCE, wprowadza mTLS do schematów bezpieczeństwa i formalizuje weryfikację Agent Card przy użyciu JWS i JSON Canonicalization. Podpisane Agent Cards to zmiana, która naprawdę coś znaczy: wcześniej karta była samodeklaracją. Każdy agent mógł twierdzić, że jest czymkolwiek. Teraz klienci mogą kryptograficznie weryfikować tożsamość agenta przed nawiązaniem interakcji. Ograniczenie jest jednak istotne: podpis udowadnia, kto opublikował kartę, ale nic nie mówi o tym, co konkretna uruchomiona instancja agenta robi w tej chwili i na czyją delegację.

MCP poszło inną drogą. 18 czerwca Enterprise-Managed Authorization osiągnęło status stabilny. EMA pozwala organizacjom centralnie kontrolować dostęp do serwerów MCP przez dostawcę tożsamości. Użytkownicy logują się raz i dziedziczą dostęp do wszystkich zatwierdzonych serwerów, bez ekranów zgody OAuth per aplikacja. Okta jest pierwszym obsługiwanym IdP, a wsparcie zaoferowały Anthropic, Microsoft i kilka popularnych narzędzi deweloperskich. Przed EMA typowym wzorcem enterprise było wspólne konto serwisowe z długożyciowym tokenem w pliku konfiguracyjnym. Żadnego śladu audytu, żadnego zakresu ról, żadnej możliwości odwołania. EMA rozwiązuje ten problem. Odpowiada jednak na pytanie, którzy użytkownicy mogą łączyć się z którymi serwerami, a nie na pytanie, która instancja agenta dostała które uprawnienia do wykonania której konkretnej akcji.

Badania naukowe zaatakowały środek tej luki. PAuth proponuje autoryzację opartą na zakresie zadania zamiast na zakresie OAuth: wysłanie zadania w języku naturalnym autoryzuje tylko operacje niezbędne do jego wykonania. AIP idzie jeszcze dalej: tworzy łańcuch tokenów zdolności wiążący tożsamość, ograniczoną autoryzację i proweniencję w jeden artefakt kryptograficzny, z implementacjami dla MCP, A2A i HTTP. Zmierzony narzut to 2,35ms przy stuprocentowym odrzuceniu 600 prób ataku. AIP stał się też projektem Internet-Draft w IETF, co mówi wiele o kierunku tej rozmowy.

Autor uczciwie rozlicza swoje marcowe tezy. Agenci nie pasują do modeli tożsamości dla ludzi, serwisów ani botów: potwierdzone. Delegacja w imieniu użytkownika jest źle modelowana: potwierdzona, z niuansem, bo EMA naprawiło hydraulikę, nie lukę konceptualną. Komponowanie wielu narzędzi tworzy uprawnienia, których nikt nie zatwierdził: potwierdzone i rozszerzone. Nie można wiarygodnie audytować, kto co zrobił: częściowo złagodzone przez podpisane Agent Cards i AIP, ale wciąż bez dominującego standardu. Poprawka to warstwa strategii, nie jeden patch: potwierdzone.

**Key takeaways:**
- A2A v1.0 wprowadza kryptograficzną weryfikację Agent Cards, ale tożsamość per uruchomiona instancja nadal nie istnieje
- EMA (Enterprise-Managed Authorization) dla MCP rozwiązuje problem wspólnych kont serwisowych, ale nie adresuje tożsamości per akcja
- PAuth i AIP to propozycje badawcze z mierzalnymi wynikami: brakujące warstwy zaczęły powstawać poza protokołami
- IETF Internet-Draft dla AIP sygnalizuje, że problem tożsamości agentów zmierza ku standaryzacji

**Why do I care:** Z perspektywy senior developera pracującego z narzędziami opartymi na agentach to nie jest akademicka dyskusja. Już teraz narzędzia takie jak Claude Code działają w kontekście repozytorium, wykonują operacje na plikach i wywołują zewnętrzne API. Pytanie "kto dokładnie teraz działa i na czyją delegację" ma realne konsekwencje dla audytu, bezpieczeństwa i odtwarzalności. EMA w VS Code to dobry krok, ale do pełnej historii proweniencji działań agenta jeszcze daleko. Warto obserwować postęp AIP i IETF, bo tam zapadną decyzje o standardach, z którymi będziemy żyć przez lata.

**Link:** [The Identity Layer for AI Agents Is Finally Being Built](https://hackernoon.com/the-identity-layer-for-ai-agents-is-finally-being-built)

---

## Warstwy tempa: co urbanistyka wie o granicach w oprogramowaniu

**TLDR:** Autor pożycza koncepcję "pace layers" Stewarta Branda z urbanistyki i stosuje ją do architektury oprogramowania. Reguła jest prosta: sortuj według tempa zmian, push nieodwracalności w dół, kieruj zależności ku warstwie wolniejszej.

**Summary:**

Artykuł zaczyna się od konkretnego bólu, który każdy rozpozna: jednotyigodniowy eksperyment marketingowy kończący się migracją bazy danych. Test A/B na promocji przy kasie potrzebował miejsca do przechowywania wariantu przypisanego do zamówienia. Najprostsza ścieżka: nowa kolumna w tabeli zamówień. Efekt: jednorazowy eksperyment dosięgnął najtrwalszej struktury w systemie, tabeli, którą migruje się z lękiem, reconciluje z finansami i czyta przez trzy inne serwisy.

Autor sięga po sformułowanie Stewarta Branda z 1999 roku: pace layers. Brand opisał cywilizację jako stos warstw poruszających się w różnym tempie, od mody przez handel, infrastrukturę, zarządzanie, kulturę do natury. Szybkie warstwy uczą się i absorbują szoki, wolne pamiętają i utrzymują ciągłość. Kluczowa obserwacja: wolna warstwa ma władzę. Szybka warstwa istnieje po to, żeby wolna nie musiała reagować na każde zaburzenie.

To samo odkrycie, choć bez odwołania do miast, David Parnas sformułował w 1972 roku: dekomponuj system według decyzji, które są "likely to change". Uncle Bob opisał to jako Single Responsibility Principle. Autor słusznie wskazuje, że zbieżność między niezależnie wynalezioną regułą w urbanistyce i informatyce to mocny dowód, że reguła jest prawdziwa. Miło, choć trochę przereklamowane: SRP jest na tyle ogólny, że pokrywa prawie wszystko.

Praktyczna reguła składa się z trzech kroków. Najpierw sortuj według tempa zmian, a nie według funkcji, nazwy domeny czy struktury organizacji. Historia commitów to dane, nie intuicja. Plik dotykany co sprint i tabela migrowana dwa razy w trzy lata nie należą do tej samej warstwy, nieważne jak powiązane wyglądają na diagramie. Następnie przenieś nieodwracalność w dół: model danych, reprezentacja pieniędzy, publiczne kontrakty API, schematy identyfikatorów. Wreszcie kieruj każdą zależność ku wolniejszej warstwie. Niestabilny kod może zależeć od stabilnego. Stabilny kod nie może zależeć od niestabilnego.

Autor podaje trzy przykłady. Feature flagi to warstwa szybka: oceniaj je w jednym miejscu, najwyżej jak możesz, bo każde dodatkowe miejsce oceny to osobna oś niespójności podczas rolloutów. API Gateway jako amortyzator szoku: jego wartość polega wyłącznie na separacji tempa. Jeśli churns tak szybko jak klienci powyżej, przestał chronić cokolwiek. Wreszcie eksperyment promo kontra ledger zamówień: stabilny kontrakt na granicy warstw, przez który szybka warstwa tylko proponuje, a wolna decyduje co utrwalić.

Uczciwe słowa na końcu: city pace layers są opisowe, Brand je zaobserwował. Nasze warstwy są prescriptywne, my wybieramy gdzie przebiega granica. To obciążenie i dar jednocześnie. Obciążenie, bo nic nie egzekwuje granic za nas. Dar, bo możemy położyć granicę w dobrym miejscu i zmierzyć poprawność z historii commitów, zamiast zgadywać.

Czego artykuł nie pyta: co z systemami, gdzie różne części mają różne tempo zmian w zależności od kontekstu? Założenie o stałym tempie warstwy jest idealizacją. Prawdziwe systemy mają migracje, które muszą iść szybko, i feature, które zamrażają się na lata. Reguła pozostaje użyteczna jako kompas, niekoniecznie jako przepis.

**Key takeaways:**
- Granice architektoniczne powinny przebiegać tam, gdzie tempo zmian się łamie, nie tam, gdzie leżą granice organizacji lub nazwy domen
- Historia commitów to mierzalne dane pozwalające obiektywnie oceniać przynależność warstw
- Zależności zawsze powinny kierować się ku warstwie wolniejszej (Stable Dependencies Principle)
- Feature flagi oceniaj w jednej, możliwie wysokiej warstwie systemu, by uniknąć niespójności podczas rolloutów

**Why do I care:** Jako developer pracujący z aplikacjami frontendowymi regularnie stykam się z tym problemem: logika eksperymentów A/B przenika do komponentów, które nie powinny jej znać, albo konfiguracja feature flagów jest rozrzucona po całym storze. Reguła "sortuj według tempa zmian" to konkretna zasada, którą można zastosować przy code review. Ciekawa obserwacja: hexagonal architecture i zasada Stable Dependencies Principle mówią to samo, ale ten artykuł podaje klucz do pytania "gdzie dokładnie umieścić port". Odpowiedź jest prosta: dokładnie tam, gdzie łamie się tempo zmian.

**Link:** [Pace Layers: What Urban Planning Knows About Your Software Boundaries](https://hackernoon.com/pace-layers-what-urban-planning-knows-about-your-software-boundaries)
