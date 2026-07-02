---
title: "Ahmad Osman o tym, dlaczego lokalne AI dogania chmurę"
excerpt: "Ahmad Osman, założyciel Osmantic, tłumaczy dlaczego lokalne modele AI stają się poważną alternatywą dla zamkniętych, chmurowych systemów i co hamuje ich powszechne przyjęcie."
publishedAt: "2026-06-30"
slug: "ahmad-osman-lokalne-ai-dogania-chmure"
hashtags: "#ainews #ai #llm #localai #opensource #llm #infra #generated #pl"
source_pattern: "AINews"
---

## Ahmad Osman o tym, dlaczego lokalne AI dogania chmurę

**TLDR:** Ahmad Osman, założyciel Osmantic i autor strony Open Source AI Must Win, przekonuje że open-source'owe modele językowe są już od czterech do ośmiu miesięcy za frontier modelami, a dystans ten stale się zmniejsza. Kluczowym problemem lokalnego AI nie jest sam model, ale brak kompletnej infrastruktury wokół niego — narzędzi, wyszukiwania, agentów i harnesów. Osmantic buduje open-source'owy stack, który ma zapewnić właśnie takie pełne doświadczenie.

**Summary:** Ahmad Osman od dawna argumentuje za uruchamianiem modeli lokalnie — na własnym komputerze, stacji roboczej albo dedykowanym sprzęcie — zanim lokalny AI stał się jednym z głównych tematów tegorocznego AI Engineer World's Fair. Na konferencji poprowadził dwuczęściowy warsztat, gdzie pokazał tzw. hardware arena: możliwość porównania DGX Spark, AMD Strix Halo i innych urządzeń bezpośrednio między sobą i z chmurą, mierząc wydajność, jakość outputu i latencję. Zainteresowanie było tak duże, że część uczestników musiała zostać odprawiona z kwitkiem.

Osman zwraca uwagę na powszechne nieporozumienie dotyczące tego, czym naprawdę jest lokalny AI. Kiedy ktoś mówi "uruchomię model u siebie", myśli tylko o samym modelu, podczas gdy produkty takie jak Claude Code dostarczają kompletną infrastrukturę: wyszukiwanie, narzędzia, pętle agentów i obsługę zewnętrznych serwisów. Podaje konkretny przykład: kolega kupił RTX 5090, uruchomił Qwen 3.5 i podpiął Claude Code do lokalnego modelu, ale zadanie zakończyło się niepowodzeniem. Ten sam prompt zadziałał na hostowanej wersji Claude Code, bo ta miała dostęp do aktualnego internetu i dokumentacji. Po dodaniu lokalnego endpointu do wyszukiwania problem zniknął. To właśnie tę warstwę — chat, ingestię dokumentów, agenty i narzędzia wbudowane w jeden system — buduje Osmantic jako oprogramowanie open-source.

Jeśli chodzi o sprzęt, Osman uspokaja: nie trzeba od razu kupować farmy GPU. Czterobiotowy model Qwen działa na MacBooku, a najnowsze smartfony potrafią uruchomić modele przewyższające to, co dwa lata temu wymagało chmury. Postęp idzie z dwóch stron jednocześnie: architektury modeli stają się coraz bardziej efektywne, a sprzęt pokroju RTX 3090 z 2020 roku radzi sobie dziś z zadaniami, które wcześniej wymagały znacznie droższych konfiguracji.

Osman spodziewa się, że hybrydowe podejście — połączenie lokalnych i chmurowych modeli — stanie się standardem, szczególnie w firmach. Przedsiębiorstwa zaczynają dostrzegać ryzyko uzależnienia od jednego dostawcy: zmiana cen, dostępności czy polityki może z dnia na dzień zachwiać całą architekturą. Dedykowany sprzęt, nawet kolocowany w centrum danych, daje kontrolę nad danymi, prywatnością i compliance. W dłuższej perspektywie Osman widzi przyszłość w mniejszych, wyspecjalizowanych modelach: firma zbiera trace'y i feedback, a potem fine-tunuje model na własnych danych, poprawiając jakość i obniżając koszty.

**Key takeaways:**
- Lokalne AI ma dziś cztery do ośmiu miesięcy opóźnienia za frontier modelami, ale gap stale się zmniejsza dzięki postępom open-source (Llama, Mistral, Qwen, DeepSeek, GLM, Kimi).
- Uruchamianie modelu lokalnie to za mało — pełne doświadczenie wymaga kompletnej infrastruktury: wyszukiwania, narzędzi, agentów i harnesów, których brak był największą słabością ekosystemu lokalnego AI.
- Przedsiębiorstwa zaczynają traktować lokalne AI jako strategiczne zabezpieczenie przed uzależnieniem od chmurowych dostawców i ich jednostronnych zmian polityki.

**Why do I care:** Z perspektywy architekta pracującego z narzędziami opartymi na LLM, ten wywiad stawia ważne pytanie: ile z tego co działa w Claude Code albo podobnych produktach to model, a ile to infrastruktura wokół niego? Jeśli lokalne modele zaczną realnie domykać lukę, to właśnie ta warstwa — orchestration, narzędzia, dostęp do danych w czasie rzeczywistym — stanie się głównym differentiatorem. Dla mnie to sygnał, żeby projektując systemy agentyczne nie zakładać z góry, że "cloud = better". Stack Osmantic jest open-source i warto go obserwować, bo kompletny, lokalny runtime agentów to coś, czego w ekosystemie naprawdę brakuje.

**Link:** [Ahmad Osman on why local AI is catching up](https://www.latent.space/p/ahmad-osman-local-ai?publication_id=1084089&post_id=204360411&isFreemail=true&triedRedirect=true)
