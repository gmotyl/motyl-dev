---
title: "AINews: spadki na rynku AI, Vals CyberOffense i luki w RSA-1024, endpointy gorsze od wzorca"
excerpt: "Wydanie z 5 i 6 listopada o spadku wycen, wynikach agentów w atakach na sieci, słabościach starych kluczy RSA i jakości dostawców modeli."
publishedAt: "2026-11-07"
slug: "ainews-spadki-rynku-vals-cyberoffense-rsa-endpointy"
hashtags: "#ainews #latentspace #ai #llm #agents #security #generated #pl"
source_pattern: "Latent Space"
---

## Rynek AI i wycena Anthropic

**TLDR:** Rynek AI jest w korekcie, Nasdaq spadł o około 10 procent, a szacunki wartości Anthropic przed debiutem schodzą nawet do biliona dolarów. Run rate Anthropic wynosi według doniesień 80 miliardów, przy celu 100 miliardów na koniec roku.

**Summary:** Autorzy opisują dzień jako spokojny w wiadomościach, ale z pogłębiającym się spadkiem wycen. Skoro wszystko było wycenione na perfekcję, każda niespodzianka poniżej oczekiwań ściąga wartość w dół. Prawdopodobieństwo debiutu spadło według rynków przewidywań o 18 punktów, a część inwestorów kwestionuje wycenę 1,5 biliona dolarów. WSJ pisze, że run rate przekroczył 80 miliardów w październiku, a OpenAI miało zbliżyć się we wrześniu do 50 miliardów. Wydanie zapowiada drugi odcinek podcastu o dokumentach S-1 Anthropic, z Jaminem Ballem z Altimeter.

**Key takeaways:**
- Nasdaq stracił około 10 procent, jeszcze poza granicą bessy.
- Wycena Anthropic bywa szacowana od 1 do 1,5 biliona dolarów.
- Run rate 80 miliardów jest poniżej celu 100 miliardów na koniec roku.

**Why do I care:** To historia głównie dla biznesu, ale koszt i dostępność modeli, na których budujesz, zależą od tego, czy laboratoria zdobędą finansowanie. Planowanie na wypadek podwyżek cen ma sens.

**Link:** [AI News for 11/05/2026-11/06/2026](https://www.latent.space/)

## Vals CyberOffense i luki w starych kluczach RSA

**TLDR:** Agenci AI autonomicznie włamali się do realistycznych sieci firmowych, a DeepMind razem z ekspertami znalazł dwie słabości w 1024-bitowym RSA. RSA-2048 jest bezpieczne.

**Summary:** W teście Vals CyberOffense model GPT-6 Sol, dostępny tylko w ograniczonym programie Daybreak od OpenAI, wykonał 80,8 procent celów. Otwarty DeepSeek V4.1 Flash wykonał 72,8 procent. W scenariuszu Lighthouse Daybreak zaliczył 27 z 31 celów w mniej niż trzy godziny, a DeepSeek 21 celów przy około jednej dziesiątej kosztu, poniżej trzech dolarów na przebieg wobec około 22. Najwięcej postępów DeepSeek robił po 100 milionach tokenów, więc krótkie testy zaniżają wyniki modeli otwartych.

DeepMind opisał dwie słabości w starszych kluczach RSA o długości 1024 bitów. Jedna omija starsze zabezpieczenia podpisów, druga pozwala na masowe faktoryzowanie starych kluczy. Daybreak oferuje zespołom obrony GPT-6 Sol i Luna, a zespołom ataku GPT-5.6 Cyber. OpenAI i Frontier Model Forum opublikowali ramy oceny wagi jailbreaków w cyberbezpieczeństwie.

**Key takeaways:**
- Otwarty model osiąga 72,8 procent celów przy dużo niższym koszcie niż zamknięty.
- Krótkie testy zaniżają wyniki modeli, które potrzebują długich przebiegów.
- Klucze RSA-1024 należy uznać za zagrożone, RSA-2048 nie jest dotknięty.

**Why do I care:** Jeśli gdziekolwiek zostały klucze 1024-bitowe, na przykład w starych integracjach albo podpisach, to jest sygnał do ich wymiany. Z danych o DeepSeek wynika też, że narzędzia ofensywne nie będą zarezerwowane dla laboratoriów z ograniczonym dostępem.

**Link:** [Vals CyberOffense](https://www.latent.space/)

## Jakość endpointów i inne wyniki niezależnych testów

**TLDR:** Prawie co czwarty z ponad 100 serwerowych endpointów modeli osiąga wynik poniżej wzorcowej instalacji. Artificial Analysis publikuje też wyniki nowej wersji indeksu i testu wizualnego rozumowania w naukach przyrodniczych.

**Summary:** Indeks Endpoint Accuracy v1.1 pokazuje, że różni dostawcy tego samego modelu dają różną jakość. Limity wyjścia około 32 tysięcy tokenów obcinają mniej więcej połowę odpowiedzi GLM-5.3 Flash w teście HLE, więc wynik to 22 do 29 procent wobec 55 procent we wzorcu. Dwa endpointy Muse Spark Open zwracają argumenty narzędzi tekstowych jako liczby. Pięć z sześciu endpointów GLM-5.3 w FP4 odpowiada wzorcowi FP8, a wszystkie 22 endpointy DeepSeek V4.1 Flash są zgodne.

W teście VIALS-AA prowadzi Gemini 4 Carbon z 64 procentami, przed GPT-6 Astra z 63 i Opus 5.5 z 61. Opus 5.5 kosztuje 1,64 dolara za zadanie, czyli około 29 razy więcej niż Sol, bo robi około 27 tur wobec około ośmiu. Kimi K3.1 Pro rozwiązuje 119 z 161 zadań co najmniej raz, ale tylko 73 przy trzykrotnym powtórzeniu. Stanford Collaborative Intelligence Benchmark z 240 zadaniami pokazuje, że przy sprzeciwie współpracownika modele osiągają najlepszą ugodę zespołową tylko w 14 procentach przypadków.

**Key takeaways:**
- Ten sam model u różnych dostawców może dawać wyraźnie różne wyniki.
- Cena za zadanie zależy od liczby tur, nie tylko od ceny za token.
- Spójność przy powtórzeniach bywa dużo niższa niż wynik z jednego przebiegu.

**Why do I care:** Jeśli wybierasz dostawcę modelu otwartego, przetestuj konkretny endpoint na własnych zadaniach, bo obcięcie wyjścia może zepsuć wyniki bez żadnego błędu w logach. Liczby o spójności przy powtórzeniach przypominają, że agent, który działa raz, jeszcze nie działa niezawodnie.

**Link:** [AA Endpoint Accuracy Index v1.1](https://www.latent.space/)

## Infrastruktura wnioskowania i nowe modele

**TLDR:** Kilka nowych modeli otwartych, ERNIE-5.5-Flash-Base, Tencent Hy4 i Muse z Active Memory, plus wyniki optymalizacji wnioskowania. GitHub podał, że nowa warstwa Git obsłużyła 5000 równoległych agentów.

**Summary:** Baidu wydał ERNIE-5.5-Flash-Base, bazowy model MoE z 280 miliardami parametrów, z których 14 miliardów jest aktywnych, trenowany na 33,5 biliona tokenów. Tylko 6 z 43 warstw ma pełny kontekst na poziomie tokenów, a reszta kompresuje każde 128 tokenów do jednego wpisu KV, co pozwala na kontekst do miliona. Licencja wyklucza UE, Wielką Brytanię i Koreę Południową. Meta ulepszyła Muse o Active Memory i Active Focus, z deklarowanym 2,4 raza mniejszym zapominaniem. GPT Image 2.6 zajmuje dwa pierwsze miejsca w testach obrazów, w tej samej cenie co wersja 2.5.

Po stronie infrastruktury GitHub zmierzył 7200 pushy na sekundę przy 5000 równoległych agentach. Vera Rubin ma według testów 5 razy większą przepustowość na GPU niż GB300 przy 260 tokenach na sekundę na agenta. Anthropic opisał proces konsolidacji pamięci Claude'a nazywany śnieniem. Twierdzenie, że niepubliczny model Anthropic udowodnił hipotezę Aaronsona i Ambainisa, pochodzi z jednego źródła i nie zostało niezależnie potwierdzone.

**Key takeaways:**
- ERNIE-5.5-Flash-Base to otwarty model bazowy z kontekstem do miliona tokenów, ale z ograniczeniami licencyjnymi.
- Repozytoria Git muszą obsługiwać setki pushy na sekundę od agentów.
- Jedno źródło mówi o dowodzie matematycznym przez niepubliczny model, bez niezależnego potwierdzenia.

**Why do I care:** Dla architekta liczba pushy na sekundę to przypomnienie, że infrastruktura deweloperska, Git, CI i rejestry, została zaprojektowana dla ludzi. Agenci zmieniają profil obciążenia i warto to uwzględnić przy planowaniu limitów.

**Link:** [AINews](https://www.latent.space/)
