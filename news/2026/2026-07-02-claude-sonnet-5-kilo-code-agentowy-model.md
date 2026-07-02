---
title: "Claude Sonnet 5 w Kilo Code: tańszy model z agentowym DNA"
excerpt: "Anthropic wypuszcza Claude Sonnet 5 — model średniego poziomu z możliwościami orkiestracji sub-agentów, który zmienia rachunek ekonomiczny AI-assisted coding."
publishedAt: "2026-07-02"
slug: "claude-sonnet-5-kilo-code-agentowy-model"
hashtags: "#agents #ai #engineering #devtools #claude #anthropic #kilo #llm #generated #pl"
source_pattern: "Kilo"
---

## Claude Sonnet 5 jest dostępny w Kilo Code

**TLDR:** Anthropic wypuściło Claude Sonnet 5 — model z segmentu mid-tier, który osiąga wyniki zbliżone do Opus 4.8 na zadaniach agentowych przy około jednej trzeciej ceny. Dostępny jest w Kilo Code przez OpenRouter oraz bezpośrednie API. Brzmi jak prosty wybór, ale diabeł tkwi w szczegółach — całkowity koszt zadania może być wyższy niż per-token sugeruje.

**Summary:**

Sonnet 5 to 63,2% na SWE-bench Pro, co przekłada się na realny skok względem Sonnet 4.6 (57,6%). Opus 4.8 wciąż prowadzi z 69,2%, ale jest trzy razy droższy. Do tego milion tokenów kontekstu bez żadnych beta-flag, górny limit outputu na poziomie 128k — użyteczny przy dużych refaktorach — i wynik na GDPval-AA v2 nieznacznie wyższy niż Opus na zadaniach wymagających podtrzymanej pracy agentowej. To nie jest typowy "szybszy tańszy Sonnet", to model z inną architekturą zachowania.

Najbardziej interesująca obserwacja pochodzi od Theo z t3dotgg, który jako jeden z pierwszych przetestował model w dniu premiery. W odróżnieniu od Opus 4.8 — który przy identycznym zadaniu "zrebuildowania gry od podstaw" nie uruchomił żadnego sub-agenta — Sonnet 5 spontanicznie powołał do życia kilka agentów: jedne badały stary kod, inne pisały plan, kolejne go analizowały, a jeszcze inne implementowały. Bez żadnej zachęty. Do tego zadawał pytania o zakres pracy na początku sesji, gdzie Opus nie pytał o nic. To, zdaniem Theo, jest prawdziwy powód dla którego model nosi suffix "5", a nie "4.8".

Cena wywoławcza do 31 sierpnia to 2 dolary za milion tokenów wejściowych i 10 za wyjściowe. Dla porównania: Opus 4.8 to 15/75, GPT-5.5 to 5/30, Gemini 3.1 Pro to 2/12. Sonnet 5 wygląda tu jak oczywisty lider cenowy, ale jest jeden haczyk: nowy tokenizer generuje 1,0–1,35x więcej tokenów niż Sonnet 4.6 dla tego samego tekstu. Efektywny wzrost kosztów jest nieco wyższy niż sugeruje sama cena za token.

Jednak to nie tokenizer jest głównym problemem. Theo w swoich testach odkrył coś kontrointuicyjnego: Sonnet 5 może ostatecznie kosztować więcej per zadanie niż Opus 4.8. Na jego wewnętrznym benchmarku "skatebench" Sonnet 5 Max kosztował średnio 15 centów za pytanie — niektóre sięgały dolara — i okazał się droższy niż jakikolwiek model w jego testach, w tym modele dedykowane dla pro. Artificial Analysis ocenił go jako najdroższy model do przejścia przez ich pełny zestaw zadań. Przyczyna jest w sposobie dostrajania: model "idzie do przodu" aż znajdzie odpowiedź, ale nie zawsze robi to efektywnie. Na trudniejszych zadaniach wchodzi w pętle — powołuje sub-agenty, wraca do re-reasoningu zamiast skapitulować. Junior za 20 dolarów za godzinę jest tańszy od seniora za 100 tylko wtedy, gdy zadanie jest w jego zasięgu.

Dla użytkowników Kilo warto odnotować zmianę kalibracji poziomów wysiłku. "Medium" w Sonnet 5 odpowiada mniej więcej "high" z Sonnet 4.6. Jest też nowy poziom "xhigh" powyżej wszystkiego poprzedniego, a adaptacyjne myślenie jest domyślnie włączone — model sam decyduje, ile rozumowania wymaga dane zadanie. Anthropic w beta testuje też wzorzec "advisor strategy": Sonnet 5 jako executor, a Opus 4.8 jako planer i korektor kursu. To dokładnie to, co Kilo już robi w swoim Auto Model routing.

**Key takeaways:**

- Sonnet 5 dostępny natychmiast w Kilo Code jako `anthropic/claude-sonnet-5` lub `claude-sonnet-5` w bezpośrednim API
- 63,2% SWE-bench Pro, 1M tokenów kontekstu, 128k output ceiling
- Cena $2/$10 per milion tokenów do 31 sierpnia, potem $3/$15
- Nowy tokenizer produkuje 1,0–1,35x więcej tokenów — uwzględnij to przy budżetowaniu
- Na zadaniach w zasięgu modelu: wyraźna oszczędność. Na trudnych zadaniach otwartych: może być droższy niż Opus
- "Medium" effort ≈ stary "high", nowy "xhigh" to nowy sufit
- Najlepiej sprawdza się jako executor w rękach smarter planera (Opus, Fable/Mythos)
- Fable 5 był niedostępny przez 19 dni po decyzji Departamentu Handlu USA — single-model dependency to single-point-of-failure

**Why do I care:**

Z perspektywy architekta frontendowego pracującego z narzędziami AI — Sonnet 5 jest interesujący nie jako "tańszy Opus", ale jako pierwszy mid-tier model, który naprawdę rozumie orkiestrację. To zmienia rachunek decyzyjny: do tej pory pytanie brzmiało "czy używać AI do tego zadania". Teraz brzmi "którym modelem orkiestrować które podzadanie". Kilo Code z routingiem i dostępem do 500+ modeli jest w tej nowej rzeczywistości lepiej ustawionym narzędziem niż monokulturowe wrappery. Historia z Fable 5 i 19-dniowym blackoutem jest z kolei doskonałym argumentem do rozmów z klientami o tym, dlaczego vendor lock-in w AI toolingu to realny problem biznesowy, nie akademickie dywagacje.

**Link:** [Claude Sonnet 5 Is Available in Kilo Code](https://blog.kilo.ai/p/claude-sonnet-5-is-available-in-kilo)
