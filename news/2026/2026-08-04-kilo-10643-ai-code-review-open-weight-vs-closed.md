---
title: "10 643 code review'y od AI: modele open-weight biją closed source w wykrywaniu krytycznych błędów"
excerpt: "Kilo przeanalizowało ponad 10 tysięcy przebiegów AI code review i policzyło, które modele faktycznie znajdują krytyczne problemy. Wynik jest niewygodny dla narracji 'closed source = bezpieczniej'."
publishedAt: "2026-08-04"
slug: "kilo-10643-ai-code-review-open-weight-vs-closed"
hashtags: "#kilo #ai #codereview #openweight #llm #generated #pl"
source_pattern: "Kilo"
---

## 10 643 code review'y od AI: modele open-weight biją closed source w wykrywaniu krytycznych błędów

**TLDR:** Kilo przeanalizowało 10 643 przebiegi swojego AI Code Reviewera i 7 083 znaleziska z okresu od 22 czerwca do 23 lipca 2026. Wniosek: dwa z trzech najlepszych modeli w wykrywaniu krytycznych błędów to modele open-weight, a różnica między nimi i najlepszym modelem closed source wynosi mniej niż 5%. Licencja modelu nie jest dobrym predyktorem jego zachowania.

**Summary:** Kilo nie trenuje własnych modeli i nie ma w tym sporze żadnego interesu, bo jest warstwą routingu między aplikacją a modelami. Dzięki temu mogą pokazać coś rzadkiego, czyli twarde dane z produkcyjnego ruchu, a nie kolejny benchmark robiony pod tezę. Wzięli 10 643 zakończone przebiegi swojego Code Reviewera i znormalizowali wyniki per review, żeby model odpalany 2000 razy nie wygrywał tylko dlatego, że miał więcej szans. Kimi K2.7 Code wyszedł na prowadzenie z 0,179 krytycznych znalezisk na review, Grok 4.5 miał 0,176, a Laguna M.1 0,171. Kimi i Laguna są open-weight, Grok jest closed, a różnica między pierwszym i trzecim miejscem jest kosmetyczna. Jednocześnie GLM 5.2 w wersji rolling alias wylądował na 12 miejscu z 13, czyli rozstrzał wewnątrz samej grupy open-weight był większy niż średnia różnica między open i closed. To ważny sygnał, bo pokazuje, że licencja nie tłumaczy zachowania modelu, tylko sam model.

Ciekawiej robi się przy bezpieczeństwie, gdzie na pierwszy rzut oka closed source wygrywa z open-weight prawie dwa do jednego, 0,067 do 0,034 znaleziska security na review. Tylko że ten wynik ciągnie w górę jeden model, GPT 5.6 Sol, z 0,285 znaleziska security na review przy 274 przebiegach, czyli wielokrotnie więcej niż cała reszta zestawu. Usuń go z próbki i średnia dla closed spada do 0,042, czyli praktycznie zrównuje się z open-weight, które siedzi na 0,034. Grupowa statystyka tutaj kompletnie zmyla obraz, bo jeden outlier robi całą różnicę. To jest dokładnie ten moment, w którym patrzenie na agregaty zamiast na konkretne modele prowadzi do złych wniosków, i dokładnie ten moment, w którym każdy, kto kupuje model po etykietce "closed, więc bezpieczniejszy", strzela sobie w kolano.

Modele różnią się też stylem komunikowania problemów, nie tylko ich liczbą. Laguna M.1 eskaluje niemal wszystko, 28% jej znalezisk to critical. GLM 5.2 rolling alias robi odwrotnie, 58% znalezisk ląduje jako suggestion. GPT 5.6 Sol z kolei wsadza 92% znalezisk w kubełek warning, czyli w praktyce nigdy nie krzyczy głośno. To są te same dane wejściowe, różne charaktery reviewera. Jeśli zespół czyta wynik AI code review bez świadomości tego rozjazdu, łatwo pomyli model spokojny z modelem, który po prostu nic nie widzi, albo model krzykliwy z modelem dokładnym.

Na poziomie kosztów robi się jeszcze ciekawiej. W całym ruchu Kilo modele open-weight odpowiadały za 75% tokenów, ale tylko 16% kosztu widzianego przez użytkownika, podczas gdy closed to 25% tokenów i 84% kosztu. Licząc na token, open-weight wychodzi około 16 razy taniej. W tygodniu 20 lipca 2026 open-weight miało już 79,1% całego ruchu tokenowego na Kilo. To nie jest wynik jednego testu, to trend, który się przesuwa z tygodnia na tydzień. Kilo dodało do tego jeszcze jeden pomysł, który mi się podoba bardziej niż cała reszta raportu: rozdzielenie modelu autora od modelu reviewera. W czerwcowym ruchu 32,3% review'ów już używało innego modelu do napisania kodu i innego do jego sprawdzenia, najczęściej Step 3.7 Flash jako autor i Laguna M.1 jako reviewer.

**Key takeaways:**
- Licencja modelu, open czy closed, nie przewiduje jego zachowania w code review. Rozstrzał wewnątrz grupy open-weight był większy niż przeciętna różnica między open i closed.
- Statystyki grupowe potrafią być całkowicie zdominowane przez jeden model. Wynik "closed jest 2x lepszy w security" po odjęciu GPT 5.6 Sol znika prawie do zera.
- Rozdzielenie modelu autora i modelu reviewera to praktyka, która już działa w produkcji, nie tylko teoria. Ponad 30% review'ów w Kilo już tak działa.

**Why do I care:** Dla mnie to najlepszy argument, jaki widziałem od dawna, żeby przestać myśleć o wyborze modelu jako o wyborze jednego dostawcy na cały workflow. Sam model do pisania kodu i inny do jego review to nie jest ciekawostka, to redukcja tego samego rodzaju ślepych punktów, które AI ma po obu stronach procesu, jeśli używasz jednego modelu do wszystkiego. Praktycznie: jeśli macie już pipeline z AI code review, sprawdźcie, czy wasz reviewer to przypadkiem nie ten sam model, który pisał kod, bo wtedy sprawdzacie go jego własnymi ślepymi punktami. Drugi wniosek jest równie konkretny, nie kupujcie modelu po etykietce "open" albo "closed", tylko po realnym profilu zachowania na waszym repo, bo jak widać jeden outlier w danych umie zafałszować cały wniosek na poziomie grupy. I tak, koszt na token 16 razy niższy dla open-weight to argument, którego nie da się już zignorować przy skalowaniu review'ów na cały monorepo, a nie tylko na jeden PR na próbę.

**Link:** [We analyzed 10,643 AI code reviews.](https://blog.kilo.ai/p/we-analyzed-10643-ai-code-reviews)
