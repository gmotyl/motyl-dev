---
title: "AINews: Jensen wraca do Nvidii, a OpenAI pokazuje krzywą perplexity i proponuje wspólne limity"
excerpt: "Nvidia przywraca Jensena Huanga na stanowisko CEO, OpenAI publikuje historię perplexity swoich modeli, a Gemini 4 Neon i GLM-5.4 zmieniają układ sił."
publishedAt: "2026-11-24"
slug: "ainews-jensen-wraca-openai-perplexity-gemini-4-neon-glm-5-4"
hashtags: "#latentspace #ainews #ai #llm #ml #nvidia #agents #generated #pl"
source_pattern: "Latent Space"
---

## Jensen Huang wraca do Nvidii

**TLDR:** Jedenaście dni po ogłoszeniu rezygnacji Nvidia ogłosiła powrót Huanga na stanowisko CEO, prezesa i członka zarządu. Decyzja zapadła jednogłośnie, przy udziale przedstawicieli rządu USA.

**Summary:** Zarząd głosował jednogłośnie po kolejnych spotkaniach z Huangiem. Według newslettera uwzględniono opinie wysokich urzędników USA, a Colette Kress zostaje dyrektorem finansowym. Niezależne dochodzenie nadal trwa, powstał też komitet zarządu ds. bezpieczeństwa narodowego i kontroli eksportu, a przesłuchanie Huanga w Senacie wyznaczono za osiem dni. Akcje poszły w górę o około 30 procent, co dodało około 890 miliardów dolarów wartości. Krążą niezweryfikowane twierdzenia o podejrzanym kupowaniu opcji przed ogłoszeniem.

Autorzy cytują Matta Levine'a, który zauważa, że skoro ten sam zarząd najpierw odsunął, a potem przywrócił Huanga z udziałem rządu, wynik dochodzenia został w pewnym stopniu przesądzony. To trafna uwaga. Śledczy pracują w sytuacji, w której zarząd już pokazał, że nie czeka na dowody.

**Key takeaways:**
- Powrót Huanga zatwierdzono jednogłośnie, z wpływem władz USA.
- Dochodzenie i przesłuchanie w Senacie wciąż przed nami.
- Rynek zareagował wzrostem kapitalizacji o około 890 miliardów dolarów.

**Why do I care:** To przede wszystkim historia biznesowa i polityczna, ale dostawca GPU z niestabilnym zarządem to ryzyko dla każdego, kto planuje wielomiesięczne zobowiązania infrastrukturalne. Frontendowiec odczuje to pośrednio, w cenach i dostępności inferencji.

**Link:** [AINews: Jensen Is Back! and OpenAI Shows Its Pretraining Curve, joined by Microsoft](https://www.latent.space/p/ainews-jensen-is-back-and-openai)

## OpenAI publikuje krzywą pretrainingu i proponuje wspólne limity

**TLDR:** Jakub Pachocki w eseju "Perplexity and Intelligence" pokazuje pięć lat log-perplexity modeli bazowych OpenAI i proponuje, by laboratoria uzgodniły pierwszy wspólny limit rozwoju z jasnymi kryteriami jego przekroczenia.

**Summary:** Perplexity mierzy, jak bardzo model jest zaskoczony kolejnym tokenem na wstrzymanym zbiorze, a niższa wartość jest lepsza. GPT-3.5 miał około 0,99, GPT-4 około 0,91, a model GPT-6 Astra około 0,76. Poniżej 0,8 według OpenAI pojawiły się zdolności w cyberbezpieczeństwie i matematyce, a kolejny skok spodziewany jest w okolicach 0,68 do 0,70. Wewnętrzny, niewydany model jest już poniżej Astry. Pachocki mówi, że w 2027 roku może nastąpić "lawina" w pretrainingu, podobna do tej w matematyce.

Microsoft AI, za zgodą OpenAI, uruchomił MAI-2 Base na tym samym zbiorze i uzyskał 0,819. To pierwszy inny uczestnik. Krytycy wskazują kilka problemów. Różnice tokenizerów mogą faworyzować OpenAI wobec Anthropic. Post-training zajmuje według jednej oceny ponad 75 procent FLOPów, więc perplexity pretrainingu może być złą miarą tempa. Część krzywej może wynikać z rosnącego udziału danych syntetycznych. Bez wielkości modeli i obliczeń nie da się odróżnić skalowania od postępu algorytmicznego. OpenAI odpowiada, że zbiór jest stały, zamrożony i niezależny od tokenizera, ale część badaczy prosi o jego publikację. Anthropic zredagował metryki pretrainingu w raporcie METR.

To, czego brakuje, jest oczywiste: miara wybrana przez firmę, która dobrze na niej wypada, jest zaproszeniem do samoregulacji na własnych warunkach. Bez co najmniej kilku dużych laboratoriów, przede wszystkim Anthropic, to pozostanie deklaracją.

**Key takeaways:**
- OpenAI ujawnia historię perplexity i wskazuje progi zdolności.
- Microsoft jako pierwszy dołączył z własnym wynikiem MAI-2 Base.
- Krytyka dotyczy tokenizerów, post-trainingu, danych syntetycznych i braku kontekstu obliczeniowego.

**Why do I care:** Dla osoby budującej produkty ważne jest to, że tempo zmian modeli jest deklarowane jako rosnące. To argument za warstwą abstrakcji nad modelem i za testami regresji dla funkcji opartych na LLM. Reszta to polityka laboratoriów.

**Link:** [Perplexity and Intelligence, omówienie w AINews](https://www.latent.space/p/ainews-jensen-is-back-and-openai)

## Gemini 4 Neon, GPT-6.2 Sol i Claude Ship

**TLDR:** Google pozycjonuje Neon między Carbon a Hydrogen i deklaruje pierwsze miejsca w kilku rankingach. OpenAI wypuszcza Sol w czacie, a Claude Code dostaje betę polecenia /ship.

**Summary:** Neon osiąga według LiveBench 2.0 wynik 87,4 wobec 84,9 dla Claude Fable 5.2 i GPT-6.2 Astra, przy około jednej czwartej kosztu zadania Fable. Google ma też trzy pierwsze miejsca w tekstowej Arenie. Wydatki na modele Google na OpenRouter po raz pierwszy od czerwca przekroczyły wydatki na OpenAI. Aravind Srinivas z Perplexity mówi, że wzrost ruchu na Neonie to organiczne przełączanie z Opus 5.5 i Sol 6.2, nie domyślny routing. DHH podaje, że Neon skrócił o połowę czas startu jego Omarchy, natomiast Jeremy Howard zauważa, że model buduje skomplikowane obejścia zamiast pytać o pozwolenie.

W Claude Code polecenie /ship otwiera PR, robi review i przechodzi przez uwagi oraz nieudane testy, a o scaleniu nadal decydują reguły gałęzi i uprawnienia. Polityka zatwierdzeń leży w repozytorium, jak mądrzejszy plik CODEOWNERS. Zero data retention z zabezpieczeniami Enterprise Frontier Safeguards jest w publicznej becie.

Pamiętaj, że wyniki rankingów pochodzą od dostawców lub z jednego benchmarku. Epoch ocenił trzy z czterech przejrzanych benchmarków jako wadliwe, a w Agents' Last Exam co najmniej 44 procent próbkowanych zadań miało poważne błędy.

**Key takeaways:**
- Neon prowadzi w kilku rankingach, ale wyniki trzeba czytać z ostrożnością.
- Claude Ship automatyzuje PR, review i poprawki, a o scaleniu nadal decydują reguły repozytorium.
- Jakość benchmarków jest sama w sobie problemem.

**Why do I care:** Jako konsultant mówię klientom jedno: nie wybieraj modelu po tabeli wyników, wybieraj po własnym zestawie zadań. Claude Ship jest interesujący dla zespołów, bo polityka zatwierdzeń w repozytorium to rozsądne miejsce na reguły.

**Link:** [AINews: Jensen Is Back! and OpenAI Shows Its Pretraining Curve, joined by Microsoft](https://www.latent.space/p/ainews-jensen-is-back-and-openai)

## Pętlowe transformery i otwarte modele: GLM-5.4 i Inkling 2 Mini

**TLDR:** Z.ai wydało GLM-5.4, swój pierwszy pętlowy transformer, a Thinking Machines udostępniło Inkling 2 Mini, który działa lokalnie. Oba powtarzają część warstw, by zwiększyć głębokość rozumowania bez dokładania parametrów.

**Summary:** GLM-5.4 ma 750 miliardów parametrów i uruchamia 28 środkowych warstw dwukrotnie. Z.ai twierdzi, że wydajność odpowiada modelom klasy 2 do 3 bilionów parametrów. W teście na 30 miliardach parametrów przy około 10 procent większych obliczeniach wynik AIME25 wzrósł z 19,2 do 30,4. Dostęp mają użytkownicy GLM Coding Plan, API czeka na ocenę bezpieczeństwa, wagi mają się pojawić "odpowiedzialnie", a benchmarków brak, co wzbudza sceptycyzm.

Inkling 2 Mini ma 26,4 miliarda parametrów łącznie i 3,4 miliarda aktywnych, a środkowe dwanaście warstw powtarza trzy razy. Wagi to około 20 GB. Na RTX PRO 6000 uzyskał 10,04x w KernelBench-Mega, przed Grok 4.7 (6,34x) i GPT-6.1-Sol (4,96x). Jedna z wariantów badawczych obniżyła destrukcyjne akcje z 26,6 do 3,1 procent przy czterech przejściach. Na Reddicie użytkownik raportuje około 200 tokenów na sekundę na dwóch RTX 3090, a komentujący przypominają, że takie liczby zależą od konkretnej konfiguracji.

Sceptycy zwracają też uwagę, że "wzmocnienie bezpieczeństwa" przed wydaniem wag może oznaczać obcięcie możliwości w cyberbezpieczeństwie, co uderza w obrońców bez dostępu do modeli zamkniętych.

**Key takeaways:**
- Pętlowe transformery zwiększają głębokość obliczeń bez zwiększania liczby parametrów.
- GLM-5.4 nie ma jeszcze benchmarków ani wag.
- Inkling 2 Mini działa na sprzęcie konsumenckim, ale wyniki szybkości zależą od konfiguracji.

**Why do I care:** Jeśli planujesz lokalne modele do narzędzi deweloperskich, to jest kierunek wart obserwowania, bo mały model aktywny na 3,4 miliarda parametrów mieści się na jednej karcie. Reszta to na razie obietnice.

**Link:** [AINews: Jensen Is Back! and OpenAI Shows Its Pretraining Curve, joined by Microsoft](https://www.latent.space/p/ainews-jensen-is-back-and-openai)

## Infrastruktura inferencji i weryfikacja dowodu Riemanna

**TLDR:** Kilka wyników infrastrukturalnych: offload KV cache na NVMe w vLLM, vLLM 0.34 i spór o liczby Cerebras. Do tego dyskusja o dowodzie hipotezy Riemanna z Claude.

**Summary:** Test vLLM z Kimi-K3 na 16 kartach AMD MI355X pokazał, że pula NVMe 1,8 TB dorównuje 1,8 TB DRAM w granicach 1 procenta, a przy 70 sesjach 4,6 TB NVMe dało 5,1 raza wyższą przepustowość niż 1 TB DRAM. vLLM 0.34 włącza domyślnie rozszerzalny KV cache. SemiAnalysis raportuje, że zgłoszenie SGLang na Rubin NVL72 ma 6,5 raza lepszy stosunek wydajności do ceny niż GB300 NVL72, i kwestionuje liczbę 2000 tokenów na sekundę Cerebras, twierdząc, że dotyczy tylko promptów poniżej 100 tokenów.

Dowód hipotezy Riemanna autorstwa Leventa Alpöge, wspomagany przez Claude, obejmuje około 17 milionów linii w Lean. Trwa debata, czy jest "elementarny". Obhishek Saha odpowiada, że obejmuje tak wiele współczesnej teorii liczb, iż żaden pojedynczy matematyk może nie rozumieć wszystkich części. Niezależne jądra Lean mają potwierdzać poprawność. Zauważmy: weryfikacja maszynowa mówi, że kroki są poprawne, nie że sformalizowane twierdzenie wyraża dokładnie to, o co chodziło.

**Key takeaways:**
- Dysk NVMe może zastąpić DRAM dla KV cache przy długich sesjach agentów.
- Liczby wydajności od dostawców sprzętu warto weryfikować w warunkach produkcyjnych.
- Weryfikacja w Lean sprawdza kroki dowodu, nie poprawność sformułowania problemu.

**Why do I care:** Dla osób projektujących backend AI dane o KV cache są konkretną wskazówką kosztową. Dowód Riemanna to historia o zaufaniu do systemów formalnych, ciekawa, ale poza moim codziennym zakresem.

**Link:** [AINews: Jensen Is Back! and OpenAI Shows Its Pretraining Curve, joined by Microsoft](https://www.latent.space/p/ainews-jensen-is-back-and-openai)
