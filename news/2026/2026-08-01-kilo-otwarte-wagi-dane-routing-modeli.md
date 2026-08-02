---
title: "Kilo publikuje dane: otwarte modele przejęły codzienne kodowanie z AI"
excerpt: "Firma routująca zapytania do modeli językowych pokazuje liczby, z których wynika, że otwarte wagi obsługują już cztery piąte ruchu w narzędziach do kodowania."
publishedAt: "2026-08-01"
slug: "kilo-otwarte-wagi-dane-routing-modeli"
hashtags: "#kilo #openweights #llm #devtools #routing #generated #pl"
---

## Open Weights Is All You Need

**TLDR:** Kilo, firma routująca zapytania kodowe do różnych modeli językowych, opublikowała dane pokazujące, że w tygodniu 20 lipca 2026 otwarte modele odpowiadały za 79,1% zużycia tokenów na ich platformie, a modele zamknięte za resztę. Tekst wpisuje się w dyskusję wokół listu ponad 230 organizacji do Waszyngtonu w sprawie ochrony ekosystemu otwartych modeli, ale co ciekawe, przynosi konkretne liczby zamiast samych deklaracji.

**Summary:** Zacznijmy od tego, czym w ogóle jest Kilo, bo bez tego trudno ocenić wiarygodność danych. To nie jest laboratorium modeli. To warstwa routingu, czyli coś w rodzaju inteligentnej skrzynki rozdzielczej, która bierze zadanie programistyczne i wysyła je do wybranego dostawcy inferencji, zgodnie z politykami danej organizacji. Firma sama podkreśla, że nie trenuje na danych klientów i nie ma interesu w promowaniu jednego modelu kosztem innego, bo po prostu żadnego nie posiada. To ważne zastrzeżenie, bo gdy OpenAI albo Anthropic publikują statystyki użycia własnych modeli, trudno oddzielić marketing od rzeczywistości. Tutaj mamy stronę trzecią, która patrzy na ruch z zewnątrz.

Liczba, którą przywołują, jest spora: 79,1% tokenów na platformie idzie do modeli open-weight, reszta do zamkniętych. Rok wcześniej proporcje wyglądały zupełnie inaczej, otwarte modele były wtedy marginesem. Autorzy artykułu przyznają przy tym coś, co często się pomija w takich dyskusjach: modele zamknięte wciąż wygrywają przy najtrudniejszych zadaniach. Nie ma tu więc tezy w stylu "open source pokonał wszystko", tylko bardziej trzeźwe stwierdzenie, że dla większości codziennej pracy programistycznej otwarte wagi wystarczają, a przy okazji wychodzą taniej i dają większą kontrolę nad tym, gdzie faktycznie działają.

To, co mnie w tym tekście najbardziej przekonuje, to lista modeli pojawiających się co tydzień: Nemotron, Qwen, GLM, MiniMax, Kimi, Mistral. Jeszcze rok temu wybór modelu do zadania programistycznego był krótką rozmową, dziś to osobna dyscyplina. I właśnie dlatego routing staje się osobną kategorią produktową, a nie dodatkiem do API. Kilo argumentuje, że warstwa routingu należąca do dostawcy modeli nigdy nie będzie neutralna, bo taki dostawca ma naturalny powód, żeby kierować ruch do siebie. To brzmi jak oczywistość, ale mało kto to głośno mówi, bo większość dużych graczy na rynku LLM-ów jednocześnie sprzedaje własne modele i buduje narzędzia, które mają je promować.

Artykuł przywołuje też konkretny test: Kimi K3, model otwarty, zbudował tę samą bazę danych co model zamknięty klasy frontier, przy porównywalnym rezultacie, ale wyraźnie niższym koszcie. Nie mam dostępu do metodologii tego benchmarku poza tym, co podaje sam Kilo, więc traktowałbym to jako sygnał, a nie dowód rozstrzygający. Ciekawszy jest kontekst biznesowy: Kilo ma teraz za sobą Anaconda jako firmę macierzystą, a partnerstwo ma dawać coś w rodzaju gwarancji zgodności dla przedsiębiorstw, czyli możliwość zatwierdzania konkretnych modeli i dostawców bez rezygnacji z wyboru. To model podobny do tego, co Anaconda od lat robi na poziomie pakietów Pythona: otwartość plus zarządzanie, a nie otwartość zamiast zarządzania.

Wśród sygnatariuszy listu o otwartych wagach wymienieni są partnerzy Kilo z każdej warstwy stosu: NVIDIA i Amazon po stronie sprzętu i chmury, Mistral, OpenAI i Arcee jako laboratoria modeli, FriendliAI i Morph przy serwowaniu inferencji, Ollama przy uruchamianiu modeli lokalnie, Vercel przy warstwie deploymentu i frontendu. To całkiem spójna mapa tego, jak dziś wygląda stos narzędzi do budowania z LLM-ami, i widać, że firma nie mówi o tym w oderwaniu od własnego biznesu, tylko opisuje ekosystem, w którym faktycznie zarabia.

**Key takeaways:**
- Kilo, jako niezależna warstwa routingu zapytań kodowych, raportuje 79,1% udziału otwartych modeli w zużyciu tokenów w tygodniu 20 lipca 2026, wobec 20,9% dla modeli zamkniętych.
- Modele zamknięte wciąż dominują przy najtrudniejszych zadaniach, otwarte wygrywają na koszcie, prywatności i możliwości uruchamiania na własnej infrastrukturze.
- Tempo pojawiania się nowych modeli open-weight (Nemotron, Qwen, GLM, MiniMax, Kimi, Mistral) sprawia, że wybór modelu do zadania staje się osobnym problemem inżynierskim.
- Routing zapytań do modeli zaczyna być traktowany jako osobna, strategiczna warstwa infrastruktury, szczególnie gdy nie jest kontrolowana przez samego dostawcę modeli.
- List ponad 230 organizacji (w tym NVIDIA, Amazon, Mistral, Vercel, Ollama) w sprawie ochrony ekosystemu otwartych wag pokazuje, jak szeroko rozciąga się dziś ta debata poza same laboratoria AI.

**Why do I care:** Dla kogoś, kto na co dzień decyduje, jakie narzędzia AI wchodzą do procesu wytwarzania oprogramowania w firmie, ten tekst jest bardziej praktyczny niż większość ogłoszeń o nowych modelach. Nie chodzi o to, żeby wierzyć liczbom jednej firmy bez zastrzeżeń, tylko o to, żeby zauważyć kierunek: decyzja o modelu przestaje być jednorazowym wyborem dostawcy, a staje się bieżącym zarządzaniem portfelem modeli, kosztów i wymagań co do danych. Jako architekt frontendowy rzadko sam wybieram model do inferencji, ale coraz częściej to ja odpowiadam za to, żeby narzędzia deweloperskie w zespole dało się łatwo przełączyć między dostawcami, bez przepisywania integracji od zera. Warstwa routingu, o której pisze Kilo, to dokładnie ten problem, i warto go rozumieć zanim ktoś zbuduje cały pipeline wokół jednego, zamkniętego API.

**Link:** [Open Weights Is All You Need](https://blog.kilo.ai/p/open-weights-is-all-you-need?publication_id=4363009&post_id=209252004&isFreemail=true&triedRedirect=true)
