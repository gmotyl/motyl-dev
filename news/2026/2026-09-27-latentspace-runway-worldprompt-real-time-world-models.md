---
title: "WorldPrompt: jak Runway steruje generowanym w czasie rzeczywistym światem"
excerpt: "Latent.Space rozkłada na czynniki pierwsze WorldPrompt, nowy format sterowania generowanym w czasie rzeczywistym wideo i dźwiękiem w GWM Worlds 2 od Runway."
publishedAt: "2026-09-25"
slug: "latentspace-runway-worldprompt-real-time-world-models"
hashtags: "#latent #ai #ml #architecture #generated #pl"
source_pattern: "Latent.Space"
---

## WorldPrompt: jak sterować światem generowanym w czasie rzeczywistym

**TLDR:** Runway pokazało GWM Worlds 2, model zamieniający generowanie wideo i dźwięku w interaktywną symulację w czasie rzeczywistym, oraz WorldPrompt, format pozwalający sterować postaciami, kamerą i otoczeniem przez sekwencję zdarzeń z osią czasu. Latent.Space rozmawia z CTO Runway Kamilem Sindim i główną badaczką Robin Kahlow o tym, jak daleko sięga ta kontrola i gdzie leżą jej realne granice.

**Summary:** GWM Worlds 2 streamuje ciągłe wideo w rozdzielczości 720p przy 24 klatkach na sekundę razem z dźwiękiem próbkowanym na 48 kHz, generowane autoregresywnie, czyli klatka po klatce w miarę oglądania, a nie jako gotowy klip wypuszczony za jednym razem. To odróżnia Runway od konkurencyjnych projektów, jak Genie 3 od Google DeepMind, Odyssey-2 Pro czy RTFM od World Labs, z których każdy mierzy się z tym samym ograniczeniem: Google wprost przyznaje, że Genie 3 utrzymuje spójność przez kilka minut ciągłej interakcji, nie godziny.

WorldPrompt jest warstwą kontroli, nie językiem programowania. W przeciwieństwie do Minecrafta czy Robloxa nie oferuje skryptowania ani zarządzania stanem gry, tylko pozwala opisać, co ma się wydarzyć w scenie, na przykład że postać niezależna podejdzie i coś powie, podobnie jak w prawdziwej grze komputerowej, tylko bez jawnego kodu za tym stojącego. Kahlow przyznaje wprost, że niezawodność zależy od trudności żądanej akcji: ruch działa dość wiarygodnie, ale bardziej złożone reguły, jak wymuszenie konkretnego prawa fizyki czy zdolności postaci, wciąż bywają zawodne, bo to dopiero research preview.

Droga do czasu rzeczywistego prowadzi przez destylację: model bazowy generuje wideo dwukierunkowo, cały klip naraz, a post-trening zamienia go w wersję autoregresywną, generującą klatkę po klatce. Współzałożyciel i współprezes Runway Anastasis Germanidis opisał w osobnym podcaście dwa sposoby przyspieszenia tego procesu: destylację dużego modelu do mniejszego albo redukcję liczby kroków odszumiania, na przykład z pięćdziesięciu do czterech, kosztem pewnej utraty jakości. Największym problemem takiego podejścia jest kumulacja błędów: wygenerowane klatki wracają na wejście modelu, żeby wygenerować kolejne, więc każdy drobny błąd nakłada się na poprzednie w miarę upływu czasu. Osobnym, wciąż otwartym problemem badawczym jest pamięć długoterminowa modelu oraz decyzja, co z kontekstu zachować, a co odrzucić, żeby nie zapchać pamięci GPU przy generowaniu "w nieskończoność".

**Key takeaways:**
- GWM Worlds 2 generuje wideo i dźwięk autoregresywnie, klatka po klatce w czasie rzeczywistym, zamiast całego klipu naraz.
- WorldPrompt to warstwa kontroli nad postaciami, kamerą i otoczeniem przez zdarzenia z osią czasu, nie język skryptowy jak w silnikach gier.
- Destylacja z 50 do około 4 kroków odszumiania umożliwia czas rzeczywisty kosztem jakości, ale kumulacja błędów w generowaniu autoregresywnym pozostaje głównym problemem technicznym.
- Konkurencyjne modele, w tym Genie 3 od Google DeepMind, mierzą się z tym samym ograniczeniem: spójna interakcja trwa minuty, nie godziny.

**Why do I care:** To ten sam wzorzec co przy agentach kodujących: prawdziwym wąskim gardłem nie jest sama zdolność modelu, tylko inżynieria wokół niego, tutaj zarządzanie kontekstem i destylacja pod kątem opóźnień zamiast surowej jakości generacji. Warto śledzić ten temat, jeśli interesuje cię multimodalna AI na granicy z gamedevem, ale bez złudzeń: to wciąż research preview z koherencją liczoną w minutach, więc pełnoprawne, samodzielnie generowane gry to jeszcze odległa perspektywa, nie produkt na najbliższy rok.

**Link:** [Runway's WorldPrompt and the Engineering of Real-Time Worlds](https://www.latent.space/p/runway)
