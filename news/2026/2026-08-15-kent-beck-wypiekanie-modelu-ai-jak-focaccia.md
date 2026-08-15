---
title: "Kent Beck o wypiekaniu modelu: pre-training i post-training jak ciasto na focaccię"
excerpt: "Kent Beck opisuje proces tworzenia modeli AI przez analogię do pieczenia focacci, gdzie pre-training to długie leżakowanie ciasta, a post-training to jego formowanie i wypiek."
publishedAt: 2026-08-15
slug: kent-beck-wypiekanie-modelu-ai-jak-focaccia
hashtags:
  - "#kentbeck"
  - "#ai"
  - "#llm"
  - "#machinelearning"
  - "#softwareengineering"
  - "#generated"
  - "#pl"
---

## Kent Beck o wypiekaniu modelu: pre-training i post-training jak ciasto na focaccię

**TLDR:** Kent Beck próbuje zrozumieć, jak powstają modele AI, i sięga po analogię do pieczenia chleba. Pre-training porównuje do zimnego wyrastania ciasta na focaccię, czyli długiego, kosztownego procesu, którego nie da się kontrolować w trakcie. Post-training to z kolei formowanie i wypiek, czyli setki małych, iteracyjnych poprawek nakładanych na surowy model.

**Podsumowanie:** Beck zaczyna od wspomnienia z liceum, gdy wpatrywał się w instrukcję procesora Motorola 6800, nie rozumiejąc jej w pełni, ale czując fascynację samym mechanizmem. Ten sam rodzaj ciekawości towarzyszy mu dziś przy modelach językowych. Nie twierdzi, że rozumie szczegóły matematyczne, za to interesuje go coś innego: jak w ogóle powstaje taki model, jaka jest maszyneria stojąca za jego budową. To pytanie techniczne, ale zadane przez kogoś, kto od dekad zajmuje się procesami tworzenia oprogramowania, więc naturalnie szuka analogii do znanych sobie rzeczy, w tym przypadku do pieczenia.

Punktem wyjścia jest rozróżnienie na interfejs użytkownika i właściwy model. Interfejs to konwencjonalny kod, obsługa formatowania danych wejściowych i wyjściowych, autentykacja, cała infrastruktura wokół. Model właściwy to, jak pisze Beck, po prostu worek liczb. Te liczby nie powstają przez ręczne zaprogramowanie, tylko przez trening, a trening dzieli się na fazy o zupełnie innym charakterze. Pre-training to jeden ogromny zakład: cały zespół ustawia dane wejściowe i pusty model, po czym puszcza ten proces na wiele tygodni czy miesięcy, robiąc zrzuty stanu na wypadek awarii i pilnując, żeby trening nie zboczył na manowce. To kosztuje setki milionów dolarów i sporo czasu, a w trakcie nie da się nic poprawić na bieżąco, można tylko czekać na wynik.

Tu pojawia się analogia z zimnym wyrastaniem ciasta. Beck akurat eksperymentuje z tą techniką przy pieczeniu focacci: mieszasz składniki, odstawiasz do lodówki na noc i nie masz już żadnego wpływu na to, co się dzieje w środku. Drożdże robią swoje, a ty czekasz. Podobnie jest z pre-trainingiem: ustawiasz warunki początkowe, a potem obserwujesz z boku, bo ingerencja w trakcie jest praktycznie niemożliwa. Rezultat sam w sobie nie nadaje się jeszcze do użycia, ale jest niezbędnym punktem wyjścia do dalszej pracy.

Post-training to zupełnie inna bajka, według Becka to etap formowania i pieczenia, czyli setki małych partii pracy zamiast jednego wielkiego zakładu. Ludzie nazywani badaczami, choć Beck sam żartuje, że nazwałby ich raczej inżynierami modeli, wyszukują konkretne słabości surowego modelu i testują poprawki, które mogą je zniwelować. Przetrwałe eksperymenty składają się na warstwy kodu i danych nakładane na istniejący już model. Dopiero suma tych poprawek sprawia, że model połączony z interfejsem i mocą obliczeniową potrafi sensownie odpowiedzieć na proste pytanie o pomysły na dodatki do focacci. Beck sam przyznaje, że analogia ma swoje granice, bo nie oddaje iteracyjnego i odwracalnego charakteru post-trainingu, w przeciwieństwie do pieczenia, gdzie przypalonej focacci nie cofniesz.

**Kluczowe wnioski:**
- Model językowy dzieli się na interfejs użytkownika budowany konwencjonalnymi metodami programistycznymi oraz sam model, czyli zbiór wag powstały w procesie treningu.
- Pre-training to jednorazowy, kosztowny i długotrwały zakład bez możliwości bieżącej korekty, podobny do zimnego wyrastania ciasta.
- Post-training to seria drobnych, iteracyjnych poprawek nakładanych na surowy model, bliższa formowaniu i wypiekowi niż jednorazowemu aktowi tworzenia.
- Terminologia branżowa wciąż się kształtuje, sam Beck przyznaje, że nie do końca rozumie, czym jest mid-training, i liczy na to, że słownictwo z czasem się ustabilizuje.

**Dlaczego mnie to obchodzi:** Jako ktoś, kto na co dzień siedzi bliżej frontendu i architektury aplikacji niż treningu modeli, cenię sobie takie teksty właśnie dlatego, że nie udają eksperckiej wiedzy tam, gdzie jej nie ma. Beck otwarcie mówi, że nie rozumie wszystkiego, i to czyni ten wpis bardziej wiarygodnym niż niejeden materiał pisany przez ludzi, którzy rzekomo wiedzą wszystko o AI. Analogia z pieczeniem trafia w sedno problemu, z którym mierzy się każdy zespół integrujący modele językowe w swoich produktach: łatwo pomylić fazę, w której model dopiero powstaje, z fazą, w której go dostrajamy do konkretnego zastosowania, a te dwie rzeczy rządzą się zupełnie innymi regułami inżynierskimi. Dla mnie płynie z tego prosty wniosek dla pracy z LLM-ami w aplikacjach: post-training i fine-tuning to jedyne miejsce, gdzie mamy realny wpływ jako zespoły produktowe, więc warto rozumieć, gdzie kończy się praca dostawcy modelu, a zaczyna nasza.

**Link:** [Baking a Model](https://newsletter.kentbeck.com/p/baking-a-model?publication_id=256838&post_id=208706172&isFreemail=true&triedRedirect=true)
