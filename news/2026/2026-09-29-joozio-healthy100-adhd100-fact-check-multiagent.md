---
title: "Sprawdziłem 10 wirusowych nawyków zdrowotnych. Prawie połowa się rozsypała"
excerpt: "Autor prosi swojego agenta o obalenie viralowej listy zdrowotnych porad, a gdy połowa nie przechodzi weryfikacji, buduje w zamian dwie strony ze stoma nawykami popartymi dowodami — jedną ogólną, jedną dla ADHD — zbudowane przez łańcuch różnych modeli AI sprawdzających się nawzajem."
publishedAt: "2026-09-29"
slug: "joozio-healthy100-adhd100-fact-check-multiagent"
hashtags: "#joozio #ai #agents #llm #generated #pl"
source_pattern: "PawelJozefiak"
---

## Sprawdziłem wirusową listę 10 zdrowych nawyków. Prawie połowa się rozsypała

**TLDR:** Popularna na X lista "10 zdrowych nawyków" wydawała się przekonująca, dopóki autor nie zlecił swojemu agentowi znalezienia dowodów przeciwko każdemu punktowi. Cztery do pięciu z dziesięciu nie przetrwało tej próby, więc zamiast pisać kolejny post obalający cudzą listę, zbudował dwie własne strony ze stoma nawykami popartymi twardymi źródłami — jedną ogólną, drugą dla osób z ADHD.

**Summary:** Wszystko zaczęło się od przewijania X i natrafienia na typowy viralowy post: dziesięć zdrowych nawyków, trzymaj się ich, a będziesz żyć dłużej. Autor, z natury sceptyczny, otworzył wątek ze swoim agentem o imieniu Wiz i zlecił mu dokładne przeciwieństwo standardowego fact-checkingu — głęboką kwerendę mającą znaleźć dowody przeciwko każdemu pojedynczemu punktowi listy. Nawyk, który przetrwał taką próbę, zostawał na liście. Efekt: cztery, może pięć z dziesięciu punktów nie przetrwało, czyli czterdzieści do pięćdziesięciu procent listy, która pięć minut wcześniej brzmiała całkowicie rozsądnie.

Zamiast najłatwiejszej drogi, czyli posta obalającego cudzą listę punkt po punkcie, autor odwrócił pytanie: co faktycznie mówi aktualna nauka, i czy da się to przedstawić równie łatwo do przewijania jak viralowa lista. Tak powstał serwis healthy100 — sto rzeczy, które dorosły może zrobić dla swojego zdrowia, każda z jedną liczbą i linkami do publicznych źródeł typu WHO, CDC czy przeglądy Cochrane, żeby nikt nie musiał wierzyć autorowi na słowo. Ranking opiera się na wpływie populacyjnym, czyli na tym, jak bardzo dana rzecz zmienia śmiertelność i zachorowalność pomnożonym przez to, ile osób faktycznie ma tę lukę do zamknięcia — dlatego pierwsze miejsce jest zupełnie niewiralowe: rzucenie palenia ze wsparciem, dodające według CDC nawet dziesięć lat życia. 64 ze 100 pozycji ma najwyższą kategorię dowodów, czyli metaanalizy badań randomizowanych albo zgodne stanowisko głównych wytycznych.

Osobną historią jest adhd100, bo tu autor od razu trafił na ścianę: nie istnieje sto interwencji specyficznych dla ADHD popartych dobrymi dowodami, więc zamiast naciągać listę, każda pozycja pokazuje wprost, jak pewna jest nauka i czy dowód pochodzi z badań na osobach z ADHD, czy jest zapożyczony z populacji ogólnej. Tylko osiem ze stu pozycji osiąga umiarkowaną lub wysoką pewność, a strona "Doesn't hold up" wprost wylicza szesnaście popularnych mitów bez pokrycia w dowodach — cukier nie powoduje ADHD, olej rybi nie leczy objawów według przeglądu Cochrane z 37 badaniami, a w badaniu popularnych filmów o ADHD na TikToku kliniczyści ocenili 52% jako wprowadzające w błąd.

Najbardziej znaczący moment z całego procesu budowy dotyczy jednak nie treści, tylko metody weryfikacji: podczas kontroli jakości tłumaczenia holenderskiego numeru telefonu zaufania model weryfikujący oznaczył linijkę mówiącą, że infolinia zamyka się na przerwę obiadową — orkiestrator sprawdził oficjalną stronę, na której napisano, że czat działa całą dobę, i odrzucił błędną flagę. Gdyby ta "poprawka" przeszła, strona zbudowana po to, by pomagać ludziom, powiedziałaby komuś w kryzysie, że pomoc jest akurat na przerwie obiadowej. Modele budujące oba serwisy to Opus 5.5 do większości implementacji, weryfikacji i tłumaczeń, Fable do projektowania interfejsu na podstawie realnych danych, oraz GPT-6 Astra do researchu — a każdy fragment był fact-checkowany przez inny model niż ten, który go researchował, bo, jak podsumowuje autor, nikt nie ocenia własnej pracy domowej.

**Key takeaways:**
- Zlecenie agentowi aktywnego szukania dowodów przeciwko viralowej liście obaliło cztery do pięciu z dziesięciu popularnych "zdrowych nawyków".
- healthy100 rankinguje sto interwencji zdrowotnych według realnego wpływu populacyjnego, z linkami do źródeł takich jak WHO, CDC i Cochrane, zamiast chwytliwych, ale niewiarygodnych porad.
- adhd100 pokazuje wprost poziom pewności dowodów i czy pochodzą z badań na osobach z ADHD, czy są zapożyczone z populacji ogólnej — tylko 8 ze 100 pozycji ma umiarkowaną lub wysoką pewność.
- Kluczowa zasada procesu: każdy fragment treści jest fact-checkowany przez inny model niż ten, który go wygenerował, co złapało realny, potencjalnie niebezpieczny błąd w tłumaczeniu numeru infolinii kryzysowej.

**Why do I care:** To praktyczny, dobrze udokumentowany przypadek architektury wieloagentowej, w której żaden model nie ocenia własnej pracy — dokładnie ten wzorzec, o którym mówi się dużo w teorii, a tu widać go w działaniu na realnym projekcie z realną stawką (infolinia kryzysowa). Ciekawy jest też wybór narzędzi pod zadanie: Opus 5.5 do implementacji, Fable do projektowania UI, inny model do researchu — zamiast jednego modelu do wszystkiego. To konkretny argument za tym, żeby przy budowie własnych pipeline'ów agentowych świadomie dobierać model do etapu pracy, zamiast zakładać, że jeden, najsilniejszy model wystarczy wszędzie.

**Link:** [I Fact-Checked a Viral List of 10 Healthy Habits. Almost Half Fell Apart. So I Built 100 That Hold.](https://thoughts.jock.pl/p/viral-healthy-habits-fact-check-healthy100-adhd100-2026?publication_id=1540552&post_id=217965609&isFreemail=true&triedRedirect=true)
