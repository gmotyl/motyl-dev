---
title: "Autoresearch i ludzka sprawczość: kto naprawdę prowadzi pętlę?"
excerpt: "Na AI Engineer World's Fair debatowano o tym, gdzie kończy się rola agenta, a zaczyna odpowiedzialność człowieka — od autoresearch po agentic sites."
publishedAt: "2026-07-02"
slug: "autoresearch-ludzka-sprawczosc-ai-engineer-world-fair"
hashtags: "#ai #llm #agents #engineering #autoresearch #agentic #ux #design #generated #pl"
source_pattern: "AINews"
---

## Autoresearch: agenci, którzy sami siebie ulepszają

**TLDR:** Na AI Engineer World's Fair środa upłynęła pod znakiem autoresearch — idei, w której agenci AI wchodzą w zewnętrzną pętlę zarządzania i samodoskonalenia systemu. Jednocześnie wielu mówców argumentowało, że to pętla zewnętrzna powinna pozostać w rękach ludzi.

**Summary:** Roland Gavrilescu z Introspection wyjaśnił ideę autoresearch bardzo konkretnie: chodzi o budowanie pętli, w których agenci pomagają utrzymywać sam system. To tak zwana "outer loop" — zewnętrzna warstwa, która obserwuje, ocenia i koryguje wewnętrzną pętlę operacyjną. Brzmi futurystycznie, ale w istocie to naturalny kierunek ewolucji systemów agentic, które coraz częściej potrafią nie tylko wykonywać zadania, ale też monitorować własną skuteczność.

Thariq Shihipar z Anthropic, który pracuje nad Claude Code, mówił o tej samej idei bez używania słowa autoresearch. "Modele są hodowane, nie budowane" — powiedział, sugerując, że cały proces to nieustanne odkrywanie i adaptacja razem z modelem, nie z góry zaplanowany inżynierski przepis.

Ale tu pojawia się napięcie, które zdominowało całą środę. Addy Osmani, były lider inżynieryjny Google, zaproponował odwrotną perspektywę: agenci mogą przejąć znacznie więcej wewnętrznej pętli wykonawczej, ale pętla zewnętrzna — decyzje o celach, jakości, kierunku — powinna pozostać ludzka. "Wewnętrzna pętla to zdolność. Zewnętrzna pętla to sprawczość" — podsumował Osmani. To zdanie dobrze definiuje spór, który toczy się w branży: gdzie kończy się automatyzacja, a gdzie zaczyna inżynierskie myślenie.

Geoffrey Litt z Notion, który mówił na ścieżce Design Engineering, poszedł jeszcze dalej. Jego teza była ostra i niekomfortowa: przyszłość będzie spolaryzowana. Ci, którzy rozumieją kod i decyzje techniczne, będą mieli następny wielki pomysł. Ci, którzy całkowicie delegują rozumienie do agenta, zostaną zastąpieni przez agenta. Rozumienie systemu to nie luksus — to warunek pozostania autorem, a nie wykonawcą cudzej wizji.

**Key takeaways:**
- Autoresearch to zewnętrzna pętla agentów, które zarządzają i ulepszają wewnętrzne systemy AI
- Spór o to, kto kontroluje "outer loop" — człowiek czy agent — jest realnym pytaniem projektowym, nie filozoficznym
- Zrozumienie kodu i decyzji technicznych to strategiczna przewaga, nie opcja
- Modele mają domyślną estetykę i domyślne zachowania — ktoś musi to definiować świadomie

**Why do I care:** Jako senior frontend developer i architekt, widzę tę debatę bardzo konkretnie. Jeśli budujesz system oparty o agentów — pipeline generujący kod, testy, dokumentację — i nie rozumiesz, co ten system produkuje, straciłeś kontrolę nad architekturą. Litt ma rację. Delegowanie zrozumienia to nie oszczędność czasu, to rezygnacja z autorstwa. Zewnętrzna pętla — definicja celów, ocena jakości, decyzje o kompromisach — musi być inżynierska, nie automatyczna.

**Link:** [AIEWF Daily Dispatch: Autoresearch and the tension between AI and human agency](https://www.latent.space/p/aiewf-daily-dispatch-agency)

---

## "Nie ma trybu auto i nie będzie" — Paul Bakaus o projektowaniu z agentami

**TLDR:** Twórca narzędzia Impeccable, Paul Bakaus, odrzuca zarówno projektowanie w pełni ręczne, jak i pełną automatyzację. Jego produkt celowo nie ma trybu "one-shot" — człowiek musi uczestniczyć w procesie na każdym etapie.

**Summary:** Paul Bakaus zaprojektował Impeccable z konkretną filozofią: agenci mogą obsłużyć żmudne pierwsze 80% pracy projektowej, ale ostatnie 20% — to, co nadaje produktowi unikalny charakter, smak i punkt widzenia twórcy — musi należeć do człowieka. To nie jest ograniczenie technologiczne. To świadoma decyzja produktowa wynikająca z rozumienia, czym jest autorstwo.

"Ludzie potrzebują celu i chcą mieć rolę w tym, co tworzą" — powiedział Bakaus. Jeśli agent generuje coś od A do Z bez zaangażowania użytkownika, produkt nie należy do nikogo. Traci się poczucie odpowiedzialności i własnościowego stosunku do wyniku. To jest problem nie tylko estetyczny, ale też biznesowy — jeśli nie rozumiesz decyzji w produkcie, nie możesz ich obronić, rozwijać ani naprawiać.

Jego zdanie "There is no auto, and there will be no auto" to nie marketing — to deklaracja architektoniczna. Impeccable nigdy nie wygeneruje gotowego rozwiązania bez interakcji użytkownika. System jest zaprojektowany tak, żeby wymuszać udział człowieka jako sterującego, nie tylko akceptującego.

**Key takeaways:**
- Agenci mogą obsłużyć 80% pracy projektowej, ale ostatnie 20% wymaga ludzkiego sądu i smaku
- Autorstwo i poczucie własności nad produktem to realne wartości, nie sentymenty
- Architektura produktu może wymuszać zaangażowanie człowieka jako świadoma decyzja designerska
- "Loop-maxing" — pełna automatyzacja — to ekstremum, które Bakaus wprost odrzuca

**Why do I care:** To rezonuje ze mną jako architektem. Kiedy budujesz system, który podejmuje decyzje bez twojego rozumienia, tracisz zdolność do jego ewolucji. Bakaus mówi o designie, ale zasada jest ta sama dla architektury systemów frontendowych. Jeśli agent wygenerował strukturę komponentów i nie wiesz dlaczego tak, a nie inaczej — przy pierwszym większym refactoringu będziesz bezradny.

**Link:** [AIEWF Daily Dispatch: Autoresearch and the tension between AI and human agency](https://www.latent.space/p/aiewf-daily-dispatch-agency)

---

## Generatywne media i problem domyślnej estetyki modelu

**TLDR:** Podczas panelu o generatywnych mediach w Google padło pytanie, kto tak naprawdę definiuje estetykę generowanych treści. Odpowiedź była niekomfortowa: to zazwyczaj team modelowania, nie artyści.

**Summary:** Nicole Brichtova z Google pracuje nad generatywnymi produktami multimedialnymi, w tym Nano Banana. Postawiła ważne pytanie: kiedy model generuje obraz, wideo czy audio, czyja estetyka wygrywa? Modele mają domyślne preferencje, które wbudowane są w dane treningowe i decyzje projektowe. "Kończy się na nas" — powiedziała Brichtova, mając na myśli zespoły modelowania. Artyści, reżyserzy artystyczni, ludzie z wykształconym gustem — są zazwyczaj poza tym procesem.

To jest napięcie, które będzie narastać. Im więcej treści generują modele, tym bardziej ich domyślna estetyka staje się dominującą estetyką mediów. Shane Gu poszerzył tę myśl: nawet jeśli model potrafi coraz lepiej oceniać i poprawiać własne wyjście, człowiek musi zachować wrażliwość na to, co jest złe, generyczne albo niewystarczające. "Nigdy nie bądź zadowolony z tego, że AI generuje treść" — powiedział Gu. Zawsze szukaj swojej wrażliwości.

**Key takeaways:**
- Modele generatywne mają domyślną estetykę — ktoś ją definiuje, zazwyczaj nie artysta
- Wrażliwość na jakość i niegeneryckość to umiejętność, którą człowiek musi aktywnie rozwijać
- Twórcy modeli powinni ściślej współpracować z ludźmi o wykształconym guście artystycznym
- "Nigdy nie bądź zadowolony" to zasada, która powinna być wbudowana w każdy proces z AI

**Why do I care:** Jako ktoś, kto buduje interfejsy, widzę analogię do UI generowanego przez agentów. Każdy framework, każdy model językowy ma domyślny styl komponentów, domyślne decyzje layoutowe. Jeśli nie masz świadomego point-of-view na design systemu, agent wypełni tę lukę swoją domyślną estetyką. A potem pytasz, czemu wszystko wygląda tak samo.

**Link:** [AIEWF Daily Dispatch: Autoresearch and the tension between AI and human agency](https://www.latent.space/p/aiewf-daily-dispatch-agency)

---

## Agentic sites: kiedy strona internetowa składa się sama w czasie rzeczywistym

**TLDR:** Carlos Sanchez z Adobe pokazał strony, które w czasie rzeczywistym personalizują się na podstawie intencji odwiedzającego. Jednocześnie ostrzegł: łatwo zbudować, trudno wiedzieć co budować.

**Summary:** Adobe principal scientist Carlos Sanchez zaprezentował koncepcję "agentic sites" — stron, które agent składa i personalizuje dynamicznie na podstawie tego, czego szuka konkretny użytkownik. Technologia jest dostępna już teraz i będzie coraz tańsza i szybsza. To brzmi jak rewolucja w web developmencie.

Ale Sanchez sam zaznaczył problem, który zna każdy, kto pracował z AI w produkcji: "Z AI łatwo budować rzeczy, ale trudno wiedzieć, co budować." Gdy agent generuje doświadczenia w imieniu marki, ryzyko polega na tym, że rezultat może wyjść poza wytyczne marki. "Nie możesz po prostu wygenerować całej strony" — powiedział.

To sprowadza dyskusję z powrotem do autoresearch i do centralnego pytania całej środy: agenci mogą obserwować, oceniać i ulepszać innych agentów, ale człowiek musi definiować cele, oceniać wyniki i brać odpowiedzialność za to, co pętla produkuje.

**Key takeaways:**
- Agentic sites to realna technologia dostępna już teraz, nie science fiction
- Problem nie jest techniczny, ale strategiczny: co generować i w jakich granicach
- Brand guidelines i editorial control muszą być wbudowane w system, nie sprawdzane po fakcie
- Każda warstwa automatyzacji wymaga warstwy ludzkiego nadzoru definiującego granice

**Why do I care:** Agentic sites to następny poziom po server-side rendering i edge computing. Dla frontend architecta to oznacza, że musisz projektować nie tylko komponenty i layouty, ale też reguły, które agent stosuje przy ich składaniu. To jest zupełnie nowa warstwa abstrakcji — i najciekawsza technicznie ze wszystkich rzeczy, które pojawiły się na tym evencie.

**Link:** [AIEWF Daily Dispatch: Autoresearch and the tension between AI and human agency](https://www.latent.space/p/aiewf-daily-dispatch-agency)
