---
title: "Kilo dodaje inline feedback do agentów chmurowych i podsumowuje DevDay OpenAI"
excerpt: "Cloud Agents w Kilo zyskują podgląd diffów z komentarzami wracającymi prosto do czatu, a szef Builder Velocity opisuje, dlaczego Sign in with ChatGPT z DevDay to dla niego najważniejsza zapowiedź tygodnia."
publishedAt: "2026-10-01"
slug: "kilo-cloud-agents-inline-feedback-building-for-builders"
hashtags: "#kilo #ai #agents #devtools #openai #generated #pl"
source_pattern: "Kilo"
---

## Agenty chmurowe w Kilo przyjmują teraz komentarze wprost w diffie

**TLDR:** Kilo rozszerza Cloud Agents o kilka funkcji ułatwiających review pracy agenta: kilka czatów może teraz działać na tej samej gałęzi równolegle, każda sesja dostaje wbudowany viewer diffów z możliwością komentowania konkretnych linii, a panel pokazuje, czy dany sandbox faktycznie coś robi, czy tylko czeka.

**Streszczenie:** Największa zmiana dotyczy tego, jak feedback trafia z powrotem do agenta. Zamiast opisywać problem słownie, w stylu „popraw logikę autoryzacji”, można teraz zakomentować konkretne linie w viewerze diffów, a ten komentarz trafia do czatu jako gotowa karta z odniesieniem do pliku i liczby komentarzy. Agent widzi dokładnie tę linię, którą zaznaczyłeś, zamiast zgadywać, o co chodziło w ogólnej uwadze. Dla kogoś, kto używa Cloud Agents do przeprowadzania review własnych PR-ów, to domyka pętlę: widzisz zmianę, zaznaczasz problem, wysyłasz z powrotem, bez kopiowania numerów linii ręcznie do czatu.

Równolegle Kilo dodało możliwość prowadzenia kilku czatów na tej samej gałęzi czy checkout gita jednocześnie, każdy z osobnym kontekstem, ale pracujący na wspólnym kodzie: jeden planuje architekturę, drugi implementuje, trzeci naprawia wąski fragment, wszystkie równolegle, bez nadpisywania swojego stanu. Nowy przycisk statusu pokazuje, czy sandbox danej sesji śpi czy jest aktywny, razem z jego specyfikacją: dostawcą, typem sandboxa, liczbą vCPU i pamięci, co odpowiada na pytanie, które sesje z wielu otwartych faktycznie coś robią. Sesje da się też grupować w kolorowe foldery, żeby lista nie zamieniła się w nieprzeszukiwalny bałagan przy pracy z wieloma PR-ami naraz.

**Kluczowe wnioski:**
- Komentarze bezpośrednio w viewerze diffów trafiają do czatu agenta jako gotowa karta z odniesieniem do konkretnej linii.
- Kilka czatów może pracować równolegle na tej samej gałęzi, każdy z osobnym kontekstem, bez nadpisywania swojego stanu.
- Status sandboxa pokazuje aktywność, dostawcę, typ i zasoby sesji, co ułatwia ogarnięcie wielu równoległych agentów.
- Sesje można organizować w kolorowe foldery, przydatne przy pracy z wieloma PR-ami lub kątami review naraz.

**Dlaczego mi na tym zależy:** Komentowanie wprost w diffie to drobna, ale realna zmiana w tym, jak precyzyjny feedback można dać agentowi bez tracenia czasu na opisywanie kontekstu słowami. Jeśli używasz agentów chmurowych do review własnego kodu, to naturalny kolejny krok po tym, co już oferują narzędzia do code review oparte o LLM, tylko tutaj komentarz od razu zamienia się w konkretne działanie agenta, nie tylko sugestię do przeczytania.

**Link:** [Cloud Agents Can Now Take Inline Feedback](https://blog.kilo.ai/p/cloud-agents-can-now-take-inline)

## Budowanie dla budowniczych, czyli DevDay okiem szefa Builder Velocity

**TLDR:** Szef zespołu Builder Velocity w Kilo (częścią Anaconda) opisuje swoje wrażenia z DevDay OpenAI 2026 i tłumaczy, dlaczego Sign in with ChatGPT, pozwalające używać istniejącej subskrypcji ChatGPT wprost w Kilo, było dla niego najważniejszą zapowiedzią dnia, ważniejszą niż Dots czy Spaces.

**Streszczenie:** Autor opisuje filozofię swojego zespołu wprost w nazwie: Builder Velocity, nie Developer Experience, bo chce, żeby ludzie, dla których budują narzędzia, byli nazwani wprost przy każdej rozmowie o priorytetach. To przesunięcie nazewnictwa odzwierciedla szerszą zmianę w devtoolach: narzędzia programistyczne przestały być tylko dla osób, które codziennie piszą kod i identyfikują się jako developerzy, bo LLM-y otworzyły budowanie oprogramowania dla znacznie szerszej grupy ludzi.

Sign in with ChatGPT pozwala użyć już opłaconej subskrypcji ChatGPT wprost w narzędziach kodujących Kilo, co autor opisuje jako bardzo konkretny sposób na to, żeby wydatek na AI poszedł dalej, bo subskrypcja, za którą już płacisz, zyskuje dodatkowe zastosowanie zamiast kolejnej osobnej opłaty za dostęp do tych samych modeli. Osobistym akcentem tekstu jest moment zobaczenia Kilo na ekranie za plecami Sama Altmana podczas keynote, co autor opisuje bez większego tłumaczenia, bo mówi samo za siebie po miesiącach pracy zespołu nad integracją.

**Kluczowe wnioski:**
- Sign in with ChatGPT pozwala użyć istniejącej subskrypcji ChatGPT wprost w narzędziach kodujących Kilo.
- Zespół autora nazywa się Builder Velocity, nie Developer Experience, by podkreślić, że grupa docelowa devtooli wykracza poza tradycyjnych developerów.
- Kilo pojawiło się na ekranie za Samem Altmanem podczas keynote DevDay 2026.

**Dlaczego mi na tym zależy:** Sign in with ChatGPT to konkretny przykład tego, jak integracje z istniejącymi subskrypcjami realnie zmieniają kalkulację kosztów narzędzi AI dla zespołów, nie tylko dla pojedynczych użytkowników. Jeśli wybierasz narzędzia kodujące dla zespołu, warto sprawdzać, czy dana platforma pozwala wykorzystać już opłacony dostęp do modeli, zamiast automatycznie dokładać kolejną linię w budżecie na AI.

**Link:** [Building for builders](https://blog.kilo.ai/p/building-for-builders)
