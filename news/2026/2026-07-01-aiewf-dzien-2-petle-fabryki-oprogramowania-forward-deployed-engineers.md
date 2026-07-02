---
title: "AIEWF Dzień 2: Pętle, fabryki oprogramowania i Forward Deployed Engineers"
excerpt: "Relacja z drugiego dnia AI Engineer World's Fair 2026 - dominującym tematem były pętle agentów, koncepcja fabryk oprogramowania oraz nowa rola inżynierów wdrożeniowych."
publishedAt: "2026-07-01"
slug: "aiewf-dzien-2-petle-fabryki-oprogramowania-forward-deployed-engineers"
hashtags: "#ainews #ai #llm #agents #softwarefactory #openai #cursor #huggingface #aiewf #generated #pl"
source_pattern: "AINews"
---

## Loopcraft: Sztuka układania pętli

**TLDR:** Drugi dzień AI Engineer World's Fair zdominowało jedno słowo: "loop". Konferencja skupiła się na tym, jak agenty AI działają w ciągłych pętlach automatyzacji, a swyx otworzył dzień prelekcją zatytułowaną "Loopcraft: The Art of Stacking Loops".

**Summary:** Tegoroczna AIEWF pokazuje wyraźnie, że branża AI inżynierii przeszła przez kilka faz w krótkim czasie. Swyx, współzałożyciel konferencji, opisał tę ewolucję jako przejście od czatu, przez narzędzia, do celów i wreszcie do automatyzacji. Główny punkt jego prelekcji był prosty: teraz wszystko kręci się wokół cron jobów i pętli, w których agenty wykonują pracę iteracyjnie.

Allie Howe z Keycard otworzyła główny track dnia poświęcony koncepcji "Software Factories". Nawiązała do wpływowego artykułu Geoffreya Huntleya "everything is a ralph loop" - teorii zakładającej, że agenta AI można zamienić w trwałego pracownika, wielokrotnie uruchamiając go na tym samym specyfikacji. To podejście zmienia sposób myślenia o agentach: zamiast jednorazowych wywołań mamy ciągłe, autonomiczne procesy.

Pablo Castro z Microsoftu opowiedział o Foundry - platformie do budowania aplikacji i agentów. Jego teza była taka, że "learning loop" pojawia się naturalnie, gdy ludzie i agenty pracują razem. Alexander Embiricos i Romain Huet z OpenAI kontynuowali ten wątek, prezentując Codex - coding agenta firmy. Embiricos trafnie zauważył, że połączenie agenta z kontekstem "dlaczego" coś trzeba zrobić, a nie tylko "co", pozwala mu inicjować dużo więcej pracy. Jeśli do tego doda się etap review i deploymentu, agent może samodzielnie kończyć zadania end-to-end.

Peter Steinberger, "ClawFather" projektu OpenClaw, teraz pracujący dla OpenAI, dodał własną perspektywę: jego głównym wyzwaniem dzisiaj jest decydowanie, czemu w ogóle poświęcać uwagę. Projektuje pętle po to, by zarządzać agentami - i przekonuje, że przyszłość to "better loops", które rozwiążą problem informacyjnego przeciążenia.

**Key takeaways:**
- Pętle agentów to nowy paradygmat AI inżynierii - agenty nie są wywoływane jednorazowo, ale działają w ciągłych, iteracyjnych cyklach
- Koncepcja "ralph loop" Geoffrey'a Huntleya zyskuje popularność jako model dla trwałych coding agentów
- Łączenie agenta z kontekstem "dlaczego" zadanie istnieje (nie tylko "co" ma zrobić) dramatycznie zwiększa jego autonomię

**Why do I care:** Jako ktoś, kto patrzy na frontend development z perspektywy architektury, widzę tutaj bezpośrednie przełożenie na codzienną pracę. Pętle agentów to nie abstrakcja - to zmiana w tym, jak organizujemy procesy CI/CD, code review i testowanie. Jeśli agent może działać w pętli na tej samej specyfikacji, to nagle sprint backlog staje się zestawem instrukcji dla maszyny, nie dla człowieka.

**Link:** [AIEWF Daily Dispatch: Loops, Software Factories & Forward Deployed Engineers](https://www.latent.space/p/aiewf-daily-dispatch-loops)

---

## Software Factories: Fabryki, które budują produkty

**TLDR:** Koncepcja "software factory" zdobywa coraz więcej zwolenników - to model, w którym agenty AI przejmują cały cykl życia oprogramowania, od kodowania przez review po deployment, a inżynierowie stają się architektami tych systemów.

**Summary:** Tereza Tížková z firmy Factory przedstawiła definicję, która podsumowuje tę koncepcję bardzo dobrze: software factory to "cały loop, cały cykl życia tworzenia oprogramowania z autonomią". Co ważne, nie chodzi tylko o generowanie kodu. Fabryka oprogramowania zbiera sygnały, reaguje na feedback użytkowników i logi, priorytetyzuje zadania i orkiestruje całość. To zmiana skali myślenia o automatyzacji.

Zach Lloyd z Warpa poszedł jeszcze dalej, twierdząc wprost, że "software engineering stanie się factory engineering". Warp, który zaczął jako narzędzie CLI dla deweloperów, przekształca się w platformę software factory - co sam Lloyd przyznaje, może brzmieć zaskakująco. Jego argument jest jednak pragmatyczny: różne organizacje i codebases będą miały różne preferencje co do tego, ile automatyzują - od pełnego automatycznego code review po zachowanie ręcznego kodowania w najtrudniejszych miejscach.

Rozmawiałem z Lloydem po jego prelekcji i zapytałem go wprost, czy słowo "factory" nie jest odstraszające dla deweloperów przyzwyczajonych do kreatywnej, rzemieślniczej strony programowania. Odpowiedział, że rozumie to napięcie, ale uważa je za nieuchronne do przezwyciężenia. Moc tych systemów jest tak duża, że pisanie wszystkiego ręcznie "nie będzie miało sensu zbyt długo". To mocna teza, ale rynkowe trendy jej nie zaprzeczają.

Kluczowy wniosek z obu prezentacji był ten sam: deweloperzy przyszłości będą budować systemy, które budują produkty. To zmiana roli podobna do tej, jaką przeszli operatorzy maszyn w przemyśle, kiedy pojawił się CNC.

**Key takeaways:**
- Software factory to kompletny cykl - zbieranie sygnałów, priorytetyzacja, orkiestracja i automatyczne kodowanie w jednym systemie
- Warp pivotuje od narzędzia CLI do platformy software factory, co sygnalizuje szerszy trend
- Różne organizacje będą miały różne punkty równowagi między automatyzacją a ręczną pracą człowieka

**Why do I care:** To jest moment, który będę wspominać za kilka lat. Firma, którą znałem jako "ten fajny terminal", teraz twierdzi, że jej produktem jest zastąpienie ręcznego kodowania. Jako architekt frontendowy muszę już teraz decydować, które części naszego procesu automatyzujemy agentami, a które zachowujemy jako "hard coding dla ludzi". Czekam na wywiad z Lloydem zapowiedziany przez Latent Space.

---

## Forward Deployed Engineers: Nowa rola w erze agentów

**TLDR:** Forward Deployed Engineers, zwani też "agent engineers", to nowa rola skupiona na pomaganiu organizacjom w adaptacji do agentów AI - i coraz więcej firm jej potrzebuje.

**Summary:** Natalie Meurer, Head of Agent Engineering w Sierra, w rozmowie z dziennikarzem Latent Space wyjaśniła, czym właściwie jest Forward Deployed Engineer. To rola, która łączy inżynierię z wdrożeniowym rozumieniem biznesu klienta - jej zadaniem jest orkiestracja agentów w konkretnych kontekstach organizacyjnych. Meurer podkreśliła coś ważnego: większość pracy przy integracji AI do firm dzieje się w warstwie orkiestracji, nie w samych modelach.

To obserwacja, którą warto zapamiętać. Wszystkie dyskusje o tym, który model jest lepszy, schodzą na dalszy plan, gdy spojrzymy na prawdziwe wdrożenia - tam liczy się to, jak agenty są połączone ze sobą i z systemami firmy, jakie mają uprawnienia, kiedy angażują człowieka. Meurer ujęła to tak: "W praktyce większość pracy specyficznej dla klienta dzieje się w warstwie orkiestracji, nie w modelach."

Pauline Brunet, VP of Forward Deployed Engineering w Cursor, dodała własny kontekst - FDE jest dla niej częścią szerszego przejścia do software factories. Cursor oferuje partnerstwo z organizacjami przy projektowaniu i budowaniu ich "AI software factory". To nie jest sprzedaż produktu, to konsulting inżynieryjny w nowym paradygmacie.

Ciekawe jest to, że zarówno Sierra jak i Cursor, firmy z bardzo różnych segmentów rynku, zbiegają się na tej samej roli. To sugeruje, że FDE to nie tymczasowy trend, ale strukturalna potrzeba rynku w momencie, gdy agenty AI wchodzą do enterprise.

**Key takeaways:**
- FDE (Forward Deployed Engineer) to rola łącząca inżynierię z orkestracją agentów w kontekście biznesowym klienta
- Prawdziwa wartość integracji AI leży w warstwie orkiestracji, nie w wyborze modelu
- Zarówno startupy jak i duże firmy zaczynają budować wyspecjalizowane zespoły FDE

**Why do I care:** Frontend deweloperzy i architekci będą coraz częściej pełnić rolę quasi-FDE w swoich organizacjach. Rozumienie, jak orkiestrować agenty, które dotykają UI, API i procesów biznesowych, staje się kompetencją nie mniej ważną niż znajomość TypeScript. Warto śledzić, jak Cursor buduje tę praktykę - mają najbliższy kontakt z codzienną pracą deweloperów.

---

## Open Source AI: GLM-5.2 i ekspansja chińskich modeli

**TLDR:** Chińskie firmy AI coraz śmielej wchodzą na scenę open source - Z.ai pokazało GLM-5.2 na AIEWF, a MiniMax wypuściło nowy open-weight model M3, oba skonkurencjonowane z zachodnimi frontierami.

**Summary:** Zixuan Li z Z.ai, nowej chińskiej firmy AI, nie mógł pojawić się na AIEWF osobiście z powodu problemów z podróżą, ale wziął udział zdalnie. Zaprezentował GLM-5.2 - flagowy model firmy przeznaczony do zadań długiego horyzontu czasowego. Li wprowadził też ZCode, środowisko wspierające "wszystkie frontier models", które bezpośrednio porównał do Codexa od OpenAI. To odważne porównanie, ale coraz mniej zaskakujące biorąc pod uwagę tempo rozwoju chińskich labów.

Thomas Wolf z HuggingFace rozmawiał z Olive Song z MiniMax, które właśnie wypuściło M3 - nowy model open-weight. MiniMax jest mniej znane na Zachodzie niż DeepSeek czy Qwen, ale regularnie dostarcza modele, które kompetytywnie wypadają w benchmarkach.

Ahmad Osman, założyciel Osmantic - firmy budującej open source software do wdrażania lokalnych systemów AI - zwrócił uwagę na mechanizm napędzający ten postęp. Gdy frontier lab udowodni, że dana zdolność jest możliwa, ekosystem open source może pracować wstecz od tego i odtwarzać ją wydajniej. Architektury stają się bardziej efektywne, a małe ulepszenia kumulują się. To bardzo trafna obserwacja o dynamice tej branży.

Wzrost popularności lokalnego AI, napędzany przez open source modele, zmienia ekonomię wdrożeń. Firmy, które rok temu płaciły za API calls do zamkniętych modeli, teraz mogą rozważać uruchomienie modelu on-premise - nie dlatego, że jest tańsze w absolut, ale dlatego, że jest możliwe przy odpowiedniej jakości.

**Key takeaways:**
- Z.ai i GLM-5.2 to sygnał, że chińskie firmy AI przestają być obserwatorami i stają się głównymi graczami
- Open source AI ułatwia lokalny deployment, co zmienia rachunek ekonomiczny dla enterprise
- Mechanizm "odtworzenia frontier capability przez open source" przyspiesza - to de facto darmowy transfer wiedzy

**Why do I care:** Jako ktoś, kto myśli o architekturze aplikacji, wzrost jakości lokalnych modeli open source to konkretna opcja warta uwzględnienia w projektowaniu systemów. Nie każde zapytanie musi iść do zewnętrznego API. GLM-5.2 i M3 to kolejne argumenty za tym, żeby architektura AI-enabled aplikacji zakładała możliwość zamiany modelu.

**Link:** [AIEWF Daily Dispatch: Loops, Software Factories & Forward Deployed Engineers](https://www.latent.space/p/aiewf-daily-dispatch-loops)
