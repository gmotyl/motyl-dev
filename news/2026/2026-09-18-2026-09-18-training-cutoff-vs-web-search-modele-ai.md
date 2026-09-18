---
title: "Króla Norwegii już nie ma, a pięć modeli AI wciąż o tym nie wie"
excerpt: "Autor podpiął szesnastu modelom narzędzie do wyszukiwania w sieci i sprawdził, czy w ogóle z niego skorzystają, gdy fakt, o który pytał, zdążył się zdezaktualizować."
publishedAt: "2026-09-18"
slug: "2026-09-18-training-cutoff-vs-web-search-modele-ai"
hashtags: "#ai #llm #testing #architecture #generated #pl"
source_pattern: "PawelJozefiak"
---

## Cutoff treningowy kontra przycisk wyszukiwania: eksperyment na szesnastu modelach

**TLDR:** Król Norwegii Harald V zmarł 28 sierpnia, a mimo to pięć z szesnastu przetestowanych modeli AI nadal twierdziło, że wciąż panuje, choć każdy z nich miał w zapytaniu dostępne narzędzie do wyszukiwania w internecie. Autor zbudował test, który mierzy tylko jedno: czy model w ogóle zdecyduje się wywołać wyszukiwanie, gdy pytanie dotyczy czegoś, co wydarzyło się po jego cutoffie treningowym. Wniosek jest nieoczywisty. Problemem nie jest brak narzędzia, tylko to, że model musi najpierw wiedzieć, że czegoś nie wie, a to ta sama wiedza, która akurat jest nieaktualna.

**Summary:** Punktem wyjścia była dyskusja na Hacker News po tym, jak autor opublikował stale.jock.pl, tabelę z datami wydania i cutoffami treningowymi dla dwudziestu aktualnych modeli z ośmiu laboratoriów, wraz z licznikiem odmierzającym czas od każdej z tych dat. Okazało się, że tylko dziesięć z dwudziestu dostawców w ogóle publikuje swój cutoff, reszta woli milczeć. Komentarz, który sprowokował cały eksperyment, brzmiał, że cutoff nie ma już większego znaczenia, bo modele przecież rozumują i potrafią same sięgnąć po wyszukiwarkę. Autor się z tym nie zgodził. Zamiast się spierać, zbudował test.

Ten test wysyłał każdemu modelowi jedno pytanie z podpiętym narzędziem web_search, ale bez faktycznego wykonania wyszukiwania, bo liczyła się wyłącznie decyzja modelu, nie treść odpowiedzi. Czterdzieści pytań. Dwadzieścia dotyczyło zdarzeń po opublikowanym cutoffie każdego modelu, takich jak finał mistrzostw świata, nowy premier Wielkiej Brytanii, nowy król, nowy flagowy model OpenAI i jego cena, wyrok sądu czy rekord temperatury. Kolejne dwadzieścia to pytania kontrolne o fakty niezmienne w czasie, jak to, kto wygrał mundial w 2018 roku, albo dlaczego niebo jest niebieskie. Do tego cztery warianty system promptu: bez żadnej daty, z dzisiejszą datą, z datą i cutoffem modelu i wreszcie z jawną instrukcją, że jeśli odpowiedź może zależeć od czegoś po tej dacie, model ma wywołać wyszukiwanie zanim odpowie. Całość to dwa tysiące wywołań, zero błędów, koszt 6,53 dolara.

Wyniki na szczycie stawki potwierdziły tezę przeciwników autora. Modele flagowe, Astra, Sol, Fable i Opus, podejmowały poprawną decyzję niemal bezbłędnie, bez fałszywych wyszukiwań. Im niżej, tym gorzej, i to w obie strony. Sonnet 5 bez system promptu twierdził, że mundial „jeszcze się nie odbył", że premierem jest wciąż Keir Starmer i że królem jest Harald V panujący od 1991 roku, trzy pewne siebie i trzy błędne odpowiedzi, zero prób wyszukania. Tańsze modele przesadzały w drugą stronę: Muse Glimmer wyszukiwało w sieci stolicę Australii i autora „Dumy i uprzedzenia", a Grok sprawdzał w wyszukiwarce, czy dana liczba jest pierwsza. Najciekawszy przypadek to Fable, najdroższy model w teście, który pewnie skonfabulował fakt o zawodniczce tenisa, mieszając prawdziwe elementy z różnych, niepowiązanych wydarzeń, zamiast po prostu sprawdzić datę w sieci.

Dodanie jednoznacznej instrukcji, żeby zawsze szukać, pomogło modelom, których problemem była uwaga: fałszywe wyszukiwania Haiku spadły z pięciu do zera, Sonneta z trzech do zera. Nic nie zmieniło się jednak w przypadku modelu, którego problemem była pewność siebie. Król w odpowiedzi Luny przetrwał wszystkie cztery warianty promptu, łącznie z tym, który wprost kazał mu sprawdzić. Sama data w prompcie okazała się tania, ale zawodna. Pomogła Gemini, a zaszkodziła DeepSeekowi, który zaczął wątpić nawet w rzeczy, które faktycznie wiedział poprawnie. Wniosek autora jest taki, że pytanie „czy cutoff wciąż ma znaczenie, skoro modele umieją szukać" jest źle postawione. Właściwe pytanie brzmi, który model, przy jakim rodzaju faktu, bo to właściwość konkretnego modelu, a nie ogólna cecha kategorii LLM z narzędziami.

**Key takeaways:**
- Dostęp do narzędzia wyszukiwania nic nie daje, jeśli model nie wie, że powinien go użyć. Decyzję o wywołaniu podejmują te same wagi, które przechowują nieaktualny fakt.
- Modele flagowe (drogie, dobrze dostrojone) podejmowały niemal bezbłędne decyzje o wyszukiwaniu; tańsze modele albo trzymały się przestarzałych faktów, albo przesadnie wyszukiwały nawet oczywiste, niezmienne informacje.
- Jawna instrukcja typu „zawsze wyszukaj ceny, wersje, aktualnych włodarzy stanowisk" naprawia modele, których problemem jest brak uwagi, ale nie pomaga modelom, których problemem jest nadmierna pewność siebie wobec własnej wiedzy.
- Samo podanie aktualnej daty w system prompcie to tani, ale niepewny sposób poprawy. U jednych modeli podnosi trafność, u innych wywołuje niepotrzebną nieufność wobec poprawnych faktów.
- Fakty dotyczące nazw, dat, cen i aktualnych stanowisk warto zawsze traktować jako wymagające weryfikacji, niezależnie od tego, jak pewnie i płynnie brzmi odpowiedź modelu.

**Why do I care:** To dotyczy wprost każdego, kto projektuje agenta albo pisze system prompt dla produkcyjnego asystenta, bo pokazuje, że samo podpięcie narzędzia wyszukiwania nic nie gwarantuje, jeśli nie wymusi się jego użycia tam, gdzie fakt mógł się zdezaktualizować. Praktyczny wniosek jest prosty do wdrożenia: lista kategorii, które zawsze wymagają wyszukania, na przykład nazwy modeli, ceny, wersje, aktualni piastujący stanowiska, zamiast liczenia na to, że model sam oceni swoją niepewność. To też dobry argument w rozmowie z produktem o tym, dlaczego „przecież ma dostęp do internetu" nie odpowiada na pytanie o jakość agenta. Dostęp do narzędzia i decyzja o jego użyciu to dwie zupełnie osobne rzeczy, i testować trzeba tę drugą.

**Link:** [Training cutoff vs. web search: 16 models, one dead king](https://thoughts.jock.pl/p/training-cutoff-vs-web-search-16-models-dead-king-2026)
