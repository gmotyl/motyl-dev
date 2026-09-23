---
title: "AINews: Claude Opus 5.5 ląduje, OpenAI odpowiada GPT-6 Sol i Luna, wszyscy tną ceny o 40-50%"
excerpt: "Anthropic wypuszcza Opus 5.5 na poziomie Fable 5.1 przy niższym koszcie, OpenAI odpowiada w ciągu godziny tańszymi Sol i Luna, a społeczność najbardziej komentuje poprawiony styl pisania modelu i zniknięcie pauz myślnika."
publishedAt: "2026-09-22"
slug: "ainews-claude-opus-55-gpt6-sol-luna-ceny"
hashtags: "#AINews #ai #llm #claude #generated #pl"
source_pattern: "AINews"
---

## Opus 5.5 przeciwko GPT-6 Sol i Luna: dzień, w którym oba laby jednocześnie postawiły na cenę

**TLDR:** Anthropic wypuścił Claude Opus 5.5 z deklarowaną wydajnością na poziomie Claude Fable 5.1 przy 40% niższym koszcie eksploatacji niż Opus 5, OpenAI odpowiedział w ciągu godziny modelami GPT-6 Sol i Luna, tańszymi o połowę od poprzedniej generacji. Niezależne pomiary Artificial Analysis pokazują, że realny koszt za zadanie dla Opus 5.5 przy maksymalnym wysiłku obliczeniowym jest zbliżony do Opus 5, bo model zużywa więcej tokenów, a deklarowana oszczędność 40% dotyczy głównie domyślnego, średniego poziomu wysiłku.

**Summary:** Ogłoszenie Opus 5.5 zebrało 17 milionów wyświetleń w kilka godzin, ale najbardziej dyskutowanym wątkiem wcale nie były benchmarki, tylko poprawiona jakość pisania modelu. Anthropic przyznaje wprost, że model „stawia najważniejszą informację na początku i trzyma się reguł pisania, które mu podasz", co czyni długie sesje łatwiejszymi do śledzenia, a społeczność z entuzjazmem odnotowała zniknięcie pauz myślnikowych z odpowiedzi modelu, co stało się najbardziej angażującym pojedynczym wątkiem całego dnia.

Liczby są jednak bardziej niejednoznaczne, niż sugeruje marketingowy nagłówek. Artificial Analysis rozkłada koszt zadania na czynniki: sam wzrost zużycia tokenów podniósłby koszt zadania o około 80% względem Opus 5, obniżka cennika bazowego o 20% sprowadza to z powrotem w dół, a tańsze odczyty z cache'a token przy ponownym użyciu kontekstu ostatecznie lądują na poziomie 5,98 dolara za zadanie z indeksu inteligencji, praktycznie tyle samo co 5,86 dolara dla Opus 5. Innymi słowy, przy maksymalnym wysiłku obliczeniowym oszczędność znika, a deklarowane 40% dotyczy domyślnego, średniego trybu.

Techniczna ciekawostka dnia to publikacja przez Anthropic wyników skalowania wielu agentów jednocześnie, aż do 100 równoległych agentów opisanych w karcie systemowej modelu, co komentatorzy nazywają pierwszym tak jawnym raportem tego typu w branży. Osobny wątek dotyczy jakości percepcji wizualnej: według pracowników Anthropic model zrobił „poważny krok naprzód" w rozumieniu przestrzeni 3D, co potwierdzają niezależne demo, jak generowanie scen Blendera z jednego promptu czy odtwarzanie historycznych widoków miast z map i archiwalnych fotografii, budowane wyłącznie proceduralnie, bez pobierania gotowych modeli czy tekstur.

Odpowiedź OpenAI przyszła niemal natychmiast: GPT-6 Sol i Luna dziedziczą większość ulepszeń GPT-6 Astra w kodowaniu, obsłudze komputera i wiarygodności faktograficznej, przy cenie niższej o około połowę od GPT-5.6. OpenAI skupiło komunikację nie na absolutnych wynikach benchmarków, tylko na relacji kosztu do wykonanego zadania, z przykładami takimi jak Sol przy najwyższym wysiłku obliczeniowym bijący Opus 5 na benchmarku AutomationBench za około 9% jego kosztu. Równolegle poprawiono cache'owanie i efektywność wnioskowania, z rabatem do 90% na odczyty z cache'a tokenów wejściowych oraz nowym panelem diagnostycznym do śledzenia, dlaczego cache się łamie, co ma bezpośrednie znaczenie dla długo działających agentów, gdzie przełączanie narzędzi czy poziomu rozumowania potrafiło dotąd niepotrzebnie unieważniać cache.

Reakcje społeczności są mieszane, ale zgodne co do jednego: to nie jest dzień jednoznacznego zwycięzcy. Część komentatorów chwali Anthropic za „zaskoczenie możliwościami", część chwali OpenAI za przystępność cenową i ergonomię wdrożenia, a inni zwracają uwagę na osobliwość w benchmarkach: wyższy poziom wysiłku obliczeniowego czasem daje niższy wynik niż średni, co tłumaczone jest tym, że benchmarki karzą za niepotrzebne zmiany, a wyższy wysiłek prowadzi do przesadnego, niepotrzebnego eksplorowania kodu.

**Key takeaways:**
- Deklarowana 40-procentowa oszczędność Opus 5.5 dotyczy domyślnego, średniego wysiłku obliczeniowego, przy maksymalnym wysiłku koszt za zadanie jest praktycznie identyczny jak w Opus 5, bo model zużywa więcej tokenów
- GPT-6 Sol i Luna kosztują o połowę mniej niż poprzednia generacja GPT-5.6, a OpenAI poprawiło jednocześnie cache'owanie tokenów z rabatem do 90% na odczyty, co ma znaczenie dla długich sesji agentowych
- Anthropic opublikował pierwszy w branży raport ze skalowania do 100 równoległych agentów w jednym systemie, a użytkownicy najgłośniej komentowali poprawiony styl pisania modelu, nie same wyniki benchmarków

**Why do I care:** Jeśli wybierasz model do agentowego kodowania na podstawie nagłówkowej ceny za token albo procentowej obniżki z ogłoszenia prasowego, ten dzień jest dobrym przypomnieniem, żeby zawsze sprawdzić realny koszt za ukończone zadanie przy poziomie wysiłku, którego faktycznie używasz, bo różnica między domyślnym a maksymalnym trybem potrafi całkowicie zmienić wynik porównania. Poprawki cache'owania po stronie OpenAI są też warte uwagi niezależnie od wyboru modelu, jeśli twoje agenty przełączają narzędzia albo poziom rozumowania w trakcie sesji, sprawdź nowy panel diagnostyczny cache'a zanim zaczniesz szukać przyczyny rosnących kosztów gdzie indziej.

**Link:** [[AINews] Claude Opus 5.5, the new default model for AINews — and everybody cuts prices 40-50%](https://www.latent.space/p/ainews-claude-opus-55-the-new-default)
