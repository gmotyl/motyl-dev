---
title: "AINews: Perplexity z miliardem dolarów rocznego przychodu, Qwen4-Max i audyty OpenAI"
excerpt: "Perplexity przekroczyło 1 mld dolarów run rate, Qwen4-Max trafił do użytku, a OpenAI wpuszcza zewnętrznych audytorów, choć na ograniczonych warunkach."
publishedAt: "2026-11-17"
slug: "ainews-perplexity-1-mld-run-rate-qwen4-max-audyty-openai"
hashtags: "#latent #ai #llm #agents #perplexity #qwen #safety #generated #pl"
source_pattern: "Latent Space"
---

## Perplexity przekracza miliard dolarów rocznego przychodu

**TLDR:** Szef Perplexity, Aravind Srinivas, powiedział na wydarzeniu Semafor, że firma przekroczyła 1 mld dolarów annual run rate. Na początku roku było to poniżej 250 mln, w sierpniu ponad 750 mln.

**Summary:** Wzrost czterokrotny w jeden rok to wynik, który trudno zbyć wzruszeniem ramion. Część napędza produkt Computer, który potrafi wracać do cyklicznych zadań, a od listopada ma też tak zwanych Teammates, czyli agentów przejmujących stałe obowiązki. Computer działa również w pełni lokalnie na wspieranych Macach. Do tego dochodzi Monitor API, które wysyła webhook, gdy obserwowana strona lub temat się zmienią, oraz nowe laboratorium Frontier Research z ponad 10 tysiącami GPU i planem publikowania prac, danych, modeli i kodu.

Autorzy newslettera przykładają do tego zwykłe mnożniki dla laboratoriów agentowych, bo Cognition też przekroczyło miliard, a Cursor ma 4,6 mld. Wychodzi wycena rzędu 30 do 50 mld dolarów, z istotnym zastrzeżeniem: jeśli ekonomia jednostkowa się broni. I właśnie tej części brakuje. Run rate to nie marża, a firmy żyjące na cudzych modelach płacą za każde zapytanie.

**Key takeaways:**
- Run rate Perplexity wzrósł z poniżej 250 mln do 1 mld dolarów w ciągu 2026 roku.
- Wzrost napędzają produkty agentowe: Computer, Teammates i Monitor API.
- Wycena rzędu 30 do 50 mld dolarów zakłada, że marże wytrzymają.

**Why do I care:** Jako architekt widzę tu sygnał, że rynek płaci za agentów wykonujących pracę w tle, a nie za kolejne okienko czatu. Jeśli budujecie produkt na API modeli, policzcie koszt jednego zadania, zanim zachwycicie się liczbą przychodu.

**Link:** [Perplexity hits a $1B revenue run rate](https://lspace.beehiiv.com/p/ainews-perplexity-hits-a-1b-revenue-run-rate-up-4x-in-2026)

## Qwen4-Max trafia do użytku

**TLDR:** Podglądowy model Alibaby jest już dostępny. Na najwyższym poziomie rozumowania ma 43 punkty w Intelligence Index, a średni koszt zadania spadł z 10,02 do 3,27 dolara.

**Summary:** Alibaba zostawiła łączną liczbę parametrów na poziomie 2,4 biliona, ale zmniejszyła liczbę aktywnych na token o jedną czwartą, do 71 miliardów. Model przyjmuje obrazy i tekst, ma okno kontekstu na milion tokenów, a cena wyjścia spadła z 6 do 4,5 dolara za milion tokenów. Do tego generuje około 39 procent mniej tokenów. Mniejsze modele open-weight z rodziny Qwen4 dopiero mają się pojawić.

Wyniki są nierówne. Arena stawia go na 14. miejscu w Agent Arena jako najlepszy model chiński i na 6. w Code Arena WebDev. Z drugiej strony w benchmarku prawniczym HLAB trafia 95,7 procent pozycji z listy kontrolnej, ale zalicza tylko 21,3 procent zadań, a liczba tokenów wyjściowych rośnie 3,6 raza. Roboflow nazywa jego wizję rozczarowującą wobec Google, OpenAI i Anthropic. Kimi K3.1 Pro wypada w Terminal-Bench 4.0 lepiej, 67 do 48 procent. Pojedynczy indeks ukrywa to, że model jest dobry w jednych zadaniach i słaby w innych.

**Key takeaways:**
- Tańszy i szybszy niż poprzednik, ale z dużą rozpiętością wyników w zależności od zadania.
- Jedna liczba w indeksie nie mówi, czy model przejdzie Twoje zadanie od początku do końca.
- Małe wersje open-weight dopiero nadejdą.

**Why do I care:** Zanim przepniecie produkcję na tańszy model, odpalcie własny zestaw testów. Wynik 95,7 procent pozycji przy 21,3 procent zaliczonych zadań to dokładnie ten rodzaj różnicy, który wychodzi dopiero u klienta.

**Link:** [Artificial Analysis o Qwen4-Max](https://x.com/ArtificialAnlys/status/2122161629592953032)

## OpenAI wpuszcza audytorów, ale na krótkiej smyczy

**TLDR:** OpenAI daje Apollo, METR, Transluce i Goodfire wewnętrzny dostęp do modeli i systemów. Krytycy wskazują luki w tym dostępie.

**Summary:** Apollo deleguje sześciu oceniających na cztery miesiące na miejscu. METR przegląda największy przebieg uczenia ze wzmocnieniem, z dostępem do transkryptów, zapisów monitorów i migawek checkpointów. Transluce robi sześciotygodniowy audyt ewaluacji dopasowania po treningu, a Goodfire osadza badaczy interpretowalności, którzy obserwują treningi.

Jest jednak druga strona. METR sam mówi, że zakres wyklucza ujawnione przez OpenAI incydenty niedopasowania i jest węższy, niż proponował. Neel Nanda i Alex Mallen wskazują, że oceniający nie mają dostępu do Slacka, OpenAI wybiera, z którymi pracownikami rozmawiają, nie ma dostępu do wag ani treningowego wydobywania zdolności. Były pracownik Mikita Balesni dodaje, że nie można cytować pracowników nawet anonimowo. To trochę inne „employee-like access”, niż obiecywał Sam Altman. Przy okazji The Information pisze, że OpenAI rozważało kupno Goodfire za ponad 5 mld dolarów, a Anthropic skraca okno ujawniania poważnych podatności z 90 do 30 dni.

**Key takeaways:**
- Cztery zewnętrzne organizacje dostają realny, ale ograniczony wgląd w OpenAI.
- Brak wag, Slacka i swobody doboru rozmówców to poważne ograniczenia.
- Anthropic skraca coordinated disclosure do 30 dni dla podatności o wysokiej i krytycznej wadze.

**Why do I care:** To przede wszystkim historia o zaufaniu i zgodności, nie o kodzie. Dla zespołów wdrażających modele w firmach oznacza to, że „audytowane przez zewnętrznych” trzeba czytać razem z zakresem audytu.

**Link:** [OpenAI o embedded assessments](https://x.com/OpenAI/status/2122359930628063248)

## Infrastruktura inferencji: agenci optymalizują agentów

**TLDR:** Together porzuca ręcznie strojone megajądra na rzecz agentów szukających operacji GPU do połączenia, a benchmarki nowych układów pokazują skoki o dziesiątki razy.

**Summary:** Together zgłasza o 28 procent wyższą przepustowość Llamy 3.2 1B na B200. Pierwszy projekt megajądra trafił do produkcji tylko dla jednego klienta, więc przejście na automatyczne wyszukiwanie ma sens. vLLM z Dynamo pokazuje na DeepSeek V4.1 Flash i Vera Rubin 63,4 raza większą przepustowość na układ niż GB300 NVL72 przy 400 tokenach na sekundę na użytkownika.

Praktyczniejsza uwaga pochodzi od Ollamy: pojedynczy znacznik czasu w prompcie systemowym albo zmiana poziomu rozumowania potrafi wyczyścić cache prefiksów. Simon Willison opisuje też wzorzec uruchamiania agentów na Macu z wykonywaniem ich kodu w piaskownicach WebAssembly, QEMU lub Apple Container, z proxy z allow-listą i podmianą poświadczeń. Hugging Face Inference Providers działa teraz na OpenRouter z tym samym endpointem i tokenem.

**Key takeaways:**
- Agenci coraz częściej sami optymalizują jądra GPU.
- Znacznik czasu w prompcie systemowym może zabić cache prefiksów.
- Kod agentów warto wykonywać w izolowanych piaskownicach z podmianą poświadczeń.

**Why do I care:** Z tego wyniosłbym jedną rzecz do codziennej pracy: trzymajcie początek promptu stabilny. Dynamiczne wstawki na końcu, nie na początku, a rachunek i opóźnienia spadną bez żadnej magii.

**Link:** [Road to Together Compiler](https://www.together.ai/blog/road-to-together-compiler)

## Modele naukowe i narzędzia dla programistów

**TLDR:** DeepMind pokazuje Gemini 4 Carbon w pracach naukowych, OpenAI otwiera darmowy dostęp dla do 200 tysięcy naukowców, a Claude Code dostał testowanie układów na symulowanym składanym iPhonie.

**Summary:** DeepMind twierdzi, że Carbon napędzał agentów AlphaProof Code weryfikujących kryptograficzny kod Signala, wychwytywał błędy w pracy laboratoryjnej i znalazł 40 razy więcej pokrewnych sekwencji białek. Google daje darmowy dostęp 10 tysiącom naukowców przez Antigravity i podwoiło okno kontekstu dla Argon, Carbon i Hydrogen. OpenAI odpowiada programem dla 200 tysięcy naukowców, z wnioskami od 23 listopada, i badaniem, w którym 1800 uczestników mniej więcej podwoiło produktywność.

Dla programistów ciekawsze jest to, że aplikacja desktopowa Claude Code uruchamia iPhone Duo w symulatorze iOS i potrafi go składać oraz rozkładać, żeby sprawdzić układy. Zespół opisał też, jak tanie testy, benchmarki i przebiegi end-to-end pozwalają Claude'owi weryfikować własną pracę. Liczby produktywności pochodzą od samego OpenAI, więc traktowałbym je jako deklarację, nie niezależny pomiar.

**Key takeaways:**
- Duzi dostawcy walczą o naukowców darmowym dostępem.
- Claude Code testuje układy na składanych urządzeniach w symulatorze.
- Weryfikacja własnej pracy przez agenta opiera się na tanich, szybkich testach.

**Why do I care:** Dla frontendowca najbardziej użyteczny jest wątek weryfikacji: agent, który może sam odpalić test i zobaczyć ekran, produkuje mniej śmieci do przeglądu. Składane ekrany to też przypomnienie, że responsywność przestaje kończyć się na trzech breakpointach.

**Link:** [ClaudeDevs o weryfikacji pracy Claude'a](https://x.com/ClaudeDevs/status/2122457608963395586)

## Pieniądze i adopcja

**TLDR:** S-1 Anthropic pokazuje 16,3 mld dolarów przychodu w pierwszym półroczu 2026, a Databricks widzi wzrost udziału modeli otwartych z 7,3 do 30,9 procent tokenów.

**Summary:** Według The Batch koszty obliczeń Anthropic spadły z 251 do 48 procent przychodu, co tłumaczy, czemu firma w ogóle może myśleć o giełdzie. Databricks raportuje, że udział otwartych modeli w tokenach wzrósł z 7,3 do 30,9 procent w 3,5 miesiąca. Do tego rundy: Noeri 110 mln dolarów, Corma 125 mln przy wycenie miliard, a zespół World Labs przechodzi do AMD.

Wzrost udziału modeli otwartych dotyczy klientów jednej platformy, więc nie wolno go uogólniać na cały rynek. Mimo to kierunek jest czytelny: kto płaci rachunek za tokeny, szuka tańszej alternatywy.

**Key takeaways:**
- Koszty obliczeń Anthropic spadły do 48 procent przychodu.
- Modele otwarte zdobywają udział u klientów Databricks.
- Dane pochodzą z dokumentów i raportów samych firm.

**Why do I care:** Strategia „jeden dostawca modeli na zawsze” wygląda coraz słabiej. Warstwa abstrakcji nad dostawcami to dziś rozsądne ubezpieczenie, nie przerost formy.

**Link:** [Anthropic S-1 według The Batch](https://x.com/DeepLearningAI/status/2122363904881819677)
