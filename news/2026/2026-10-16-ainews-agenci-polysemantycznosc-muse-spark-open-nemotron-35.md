---
title: "AINews: sieci neuronowe są już czyste, Muse Spark Open i Nemotron 3.5"
excerpt: "Eseje Goodfire o tym, że większość neuronów jest czytelna, a obok premiera otwartego modelu Meta o 816 miliardach parametrów."
publishedAt: "2026-10-16"
slug: "ainews-agenci-polysemantycznosc-muse-spark-open-nemotron-35"
hashtags: "#ainews #latentspace #ai #llm #ml #agents #open-source #generated #pl"
source_pattern: "AINews"
---

## Agenci obalają polisemantyczność

**TLDR:** Nick Cammarata z Goodfire twierdzi, że wiele znanych przypadków polisemantyczności to błędna interpretacja. Według niego około 90 procent neuronów w Qwen-32B ma jedno zadanie.

**Summary:** Esej "Neural Networks Are Already Clean" pokazuje, że wiele przykładów splątanych neuronów ustępuje, gdy badacze zastosują dalszą analizę agentową. Nie trzeba wcześniej rozwijać sieci drugim modelem. Cammarata wspomina, że jego praca z 2023 roku w OpenAI znalazła czytelnych tylko około 2 procent neuronów, a teraz przekonuje, że ten wynik wynikał z błędów odczytu. Roon i Deedy Das nazywają to jednym z najważniejszych wyników w AI i zapowiadają niższe P(doom).

Nie wszyscy są przekonani. Neel Nanda mówi, że to nie zmienia jego kluczowych wątpliwości, nadal oczekuje superpozycji reprezentacji i uważa, że słabe aktywacje niosą zapamiętane fakty. Leo Gao chce oceniać wyjaśnienia przez symulację neuronu mierzoną przez KL, a Jake Mendel wskazuje zaniedbany ogon niemaksymalnych aktywacji. Pfau zauważa, że samej pracy jeszcze nie opublikowano, czyli twierdzenia opierają się na wątku, nie na tekście do sprawdzenia.

**Key takeaways:**
- Teza: większość neuronów, także w modelach z biliony parametrów, jest czytelna.
- Wcześniejsze wyniki OpenAI z 2023 roku wskazywały około 2 procent.
- Nanda i Gao zgłaszają merytoryczne zastrzeżenia.
- Pełna praca nie jest jeszcze opublikowana.

**Why do I care:** To zagadnienie badawcze, nie coś do wdrożenia w poniedziałek, ale jeśli się potwierdzi, zmieni rozmowę o tym, czy modeli można w ogóle pilnować. Entuzjazm w komentarzach wyprzedza dowody. Wstrzymałbym się z wnioskami do publikacji pracy.

**Link:** [Ainews Agents Disprove Polysemanticity](https://www.latent.space/p/ainews-agents-disprove-polysemanticity)

## Meta Muse Spark Open, najlepszy amerykański model open-weight

**TLDR:** Meta wydała Muse Spark Open, model MoE z 816 miliardami parametrów łącznie i 42 miliardami aktywnych, z kontekstem miliona tokenów. Artificial Analysis daje mu 39 punktów, czyli pierwsze miejsce wśród amerykańskich modeli open-weight.

**Summary:** Model przyjmuje tekst, obraz, wideo i audio. Licencja Muse wymaga napisu "Built with Muse Spark Open" i osobnej umowy dla firm sprzedających model jako usługę z przychodem powyżej 20 milionów dolarów rocznie, a Nathan Lambert nazwał ją okropną. Artificial Analysis stawia go za GLM-5.3 z wynikiem 45 i Kimi K3 z 44. Zużywa najmniej tokenów wyjściowych na zadanie wśród dziewięciu najlepszych modeli otwartych, ale jest ostatni w czterech testach agentowych, a cała sześciopunktowa przewaga GLM-5.3 bierze się właśnie z agentów.

Wagi w BF16 ważą około 1,6 TB. Wersja NVFP4 waży około 530 GB i działa na czterech kartach Blackwell Ultra, ośmiu H200 albo dwóch Mac Studio z 512 GB. Ceny startowe to 1,25 i 4,25 dolara za milion tokenów wejścia i wyjścia. Teortaxes określa model jako ponury przy tej liczbie parametrów, a Spark 1.3 jest wyraźnie mocniejszy.

W tym samym wydaniu pojawia się kilka innych premier. NVIDIA Nemotron 3.5 Super VL ma 120B parametrów i 12B aktywnych, a Artificial Analysis daje mu 26 punktów. Microsoft pokazał MAI-Base-2 z około 3 bilionami parametrów, a porównanie z DeepSeek-V4-Pro-Base opiera się na własnych danych walidacyjnych Microsoftu. Opus 5.5 w trybie szybkim jest dostępny bez listy oczekujących, z prędkością do 2,5 razy wyższą, a Claude Code Review jest dostępny dla planów Team i Enterprise. Perplexity udostępniło SPACE na licencji Apache 2.0, sandbox uruchamiający każdą akcję w mikro-VM Firecracker. W 108 próbach ucieczki z rootem wewnątrz nikt nie dotarł do hosta. Anthropic ma według Bloomberga mieć 16,8 miliarda dolarów przychodu w trzecim kwartale.

**Key takeaways:**
- 816B parametrów, 42B aktywnych, kontekst 1M tokenów, licencja niestandardowa.
- 39 punktów w Artificial Analysis, za GLM-5.3 i Kimi K3.
- Najsłabszy z czołówki w testach agentowych.
- SPACE od Perplexity jest otwartym sandboxem opartym na Firecracker.

**Why do I care:** Licencja z klauzulą o 20 milionach to coś, co powinien przeczytać dział prawny, zanim ktokolwiek wbuduje model w produkt. Dla zespołu bez klastra GPU model jest raczej ciekawostką niż wyborem. SPACE jest użyteczniejszy, jeśli budujesz własne środowiska wykonawcze dla agentów.

**Link:** [Ainews Agents Disprove Polysemanticity](https://www.latent.space/p/ainews-agents-disprove-polysemanticity)
