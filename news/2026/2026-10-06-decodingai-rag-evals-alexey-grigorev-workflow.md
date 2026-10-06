---
title: "Jak zbudować ewale do RAG-a, kiedy nigdy nie zapisywałeś żadnych śladów"
excerpt: "Alexey Grigorev z DataTalks.Club opowiada, jak zbudował kompletny proces ewaluacji dla swojego FAQ-bota na Slacku, zaczynając od zera śladów i proxy danych z historii commitów na GitHubie."
publishedAt: "2026-10-06"
slug: "decodingai-rag-evals-alexey-grigorev-workflow"
hashtags: "#decodingai #ai #llm #rag #testing #observability #generated #pl"
source_pattern: "Decoding AI"
---

## Pięć kroków do ewali RAG-a, kiedy zacząłeś bez żadnej obserwowalności

**TLDR:** Alexey Grigorev, twórca DataTalks.Club, opowiada, jak zbudował ewale dla swojego FAQ-bota na Slacku mimo tego, że od początku nie zapisywał żadnych śladów interakcji. Zamiast czekać na idealne dane, użył historii commitów na GitHubie jako proxy, a dziś cały proces (zbieranie danych, budowa eval setu, budowa ewaluatorów, uruchamianie, domykanie pętli) żyje w Opiku jako wersjonowany eksperyment.

**Summary:** Problem Grigorevа jest klasyczny: pierwsza wersja aplikacji zadziałała i o to chodziło, ale z czasem poprawki narosły w gigantyczny, szumiący prompt systemowy, którego bał się dotknąć, bo nie miał sposobu, żeby zmierzyć wpływ jakiejkolwiek zmiany. "Bez ewali jesteś ślepy", jak sam to ujął, ale kiedy w końcu zdecydował się dodać ewaluację, okazało się, że nie ma śladów, z których można by zbudować dataset. Rozwiązaniem były dane proxy: każdy wpis do FAQ-a to zgłoszenie na GitHubie, a każda poprawka to commit w pull requeście, więc zestawienie oryginalnego zgłoszenia z finalną, zaakceptowaną wersją dało mu komplet trójek input, wygenerowany output i oczekiwany output, których potrzebował.

Najciekawszym technicznym szczegółem jest leave-one-out przy replayowaniu starych przypadków: ponieważ baza FAQ zmieniła się od czasu, gdy dany incydent faktycznie się wydarzył, replay "na żywo" przeciwko aktualnej bazie dawałby fałszywy wynik (system poprawnie rozpozna duplikat, bo wpis już tam jest, ale z błędnego powodu). Grigorev usuwa testowany rekord z bazy przed każdym replayem z 200-rekordowego zbioru, odtwarzając dokładnie ten stan wiedzy, jaki system miał w momencie oryginalnego zgłoszenia. Ewaluatory są w większości deterministyczne, bez LLM-a, bo jego pipeline curacji zwraca ustrukturyzowaną decyzję (NEW, UPDATE, DUPLICATE, WRONG_COURSE), więc sprawdzenie zgodności decyzji i poprawnego umiejscowienia sekcji kosztuje grosze i trwa sekundy. Sędziego LLM zostawił wyłącznie tam, gdzie nie ma jednej poprawnej odpowiedzi tekstowej, czyli przy odpowiedziach bota na Slacku, i to dopiero po wyrównaniu go z własnymi etykietami na 10 do 15 przykładach.

**Key takeaways:**
- Brak zapisanych śladów od dnia zero nie musi blokować ewali: historia commitów i pull requestów może posłużyć jako dane proxy do pierwszego datasetu.
- Leave-one-out przy replayowaniu starych przypadków zapobiega fałszywym wynikom, gdy baza wiedzy zmieniła się od czasu oryginalnego incydentu.
- Ewaluatory deterministyczne (dopasowanie decyzji, dopasowanie sekcji) są tańsze i jednoznaczne, sędzia LLM zarezerwowany jest wyłącznie dla odpowiedzi bez jednej poprawnej formy tekstowej.

**Why do I care:** To praktyczny plan działania dla każdego zespołu, który ma działającą, ale niezmierzoną aplikację RAG czy agentową: zamiast czekać, aż ktoś "zacznie w końcu logować wszystko od zera", warto najpierw rozejrzeć się po istniejących śladach ludzkiej oceny, takich jak zaakceptowane albo poprawione PR-y, zgłoszenia supportowe czy kciuki w dół, bo to gotowy materiał na pierwszy eval set bez czekania na kolejny kwartał.

**Link:** [The Prompt You're Afraid to Touch](https://www.decodingai.com/p/rag-evals-change-prompts)
