---
title: "The Batch: Atlas od World Labs trafia do deweloperów, a MEMCON uczy agenta zarządzać pamięcią"
excerpt: "World Labs otwiera model świata Atlas z cennikiem i eksportem do siatek 3D, a badacze pokazują lekki kontroler, który uczy agenta, kiedy sięgać do pamięci."
publishedAt: "2026-11-20"
slug: "the-batch-world-labs-atlas-memcon-pamiec-agentow"
hashtags: "#thebatch #ai #ml #agents #llm #generated #pl"
source_pattern: "The Batch"
---

## Atlas od World Labs: model świata z cennikiem i przyciskiem eksportu

**TLDR:** World Labs otworzyło Atlas dla wszystkich i dało samoobsługowe API, które zamienia tekst albo zdjęcia w sceny 3D i wideo ze sterowaną kamerą. Wyniki można wyeksportować jako splaty i siatki, więc trafiają do silników gier i Blendera.

**Summary:** Po wrześniowej zapowiedzi model stał się publiczny 12 listopada. Są narzędzia webowe, w tym Viewfinder, który buduje scenę ze zdjęć, i Chisel, który robi to z obrazów referencyjnych lub opisu. Dochodzą dwa mniejsze, Relight i Splats to Mesh. Deweloperzy dostają płatne API z przedpłaconymi kredytami, a na start po 10 dolarów na API i na aplikacje. Dokumentacja zawiera gotowy prompt, który prowadzi asystenta kodującego przez konfigurację.

Pod spodem to multimodalny autoregresyjny transformer dyfuzyjny, trenowany od zera na tekście, obrazach, wideo i danych 3D. Każdy obraz i mapa głębi jest powiązana z pozycją kamery, dzięki czemu scenę można renderować spójnie z różnych punktów. Pierwsza klatka kosztuje 0,04 dolara, każda następna 0,008 w rozdzielczości 720p, a zamiana widoków na rafinowane splaty 5 dolarów. Z jednego zdjęcia model dopowiada, co jest poza kadrem. Z nakładających się zdjęć, do 64 w Viewfinderze, odtwarza lokację.

Wyniki są obiecujące, ale głównie z własnych testów. Na leaderboardzie Rapidata Atlas wygrał 76,7 procent bezpośrednich porównań w wykonywaniu poleceń ruchu kamery. W rekonstrukcji 3D ma średnio około 12 procent mniejszy błąd niż Pi3X, choć nie na każdym zbiorze. World Labs nie opublikowało karty modelu ani artykułu i nikt niezależny nie odtworzył tych liczb. W tle jest przejęcie firmy przez AMD za około 8,2 miliarda dolarów, zamknięte 16 listopada, z Fei-Fei Li jako głównym naukowcem AMD. Żaden komunikat nie mówi, co stanie się z produktami.

**Key takeaways:**
- Atlas ma cennik, eksport splatów i siatek oraz API dla agentów kodujących.
- Darmowe wyniki nie mogą być używane komercyjnie.
- Dokładność opiera się głównie na testach własnych World Labs.

**Why do I care:** Z perspektywy frontendu najciekawszy jest eksport do formatów, które da się wrzucić do three.js albo Blendera. Modele strumieniujące piksele dają tylko wideo, a tutaj dostaję geometrię. Pytanie o los produktu po przejęciu przez AMD to realne ryzyko dla kogoś, kto chce na tym budować.

**Link:** [The Batch, wydanie z 20 listopada 2026](https://info.deeplearning.ai/jensen-huangs-nvidia-legacy-claude-fable-5.2-and-anthropics-ipo-world-labs-releases-atlas-to-developers-1)

## MEMCON: adaptacyjne zarządzanie pamięcią agenta

**TLDR:** Badacze z UCLA, Uniwersytetu Waszyngtońskiego i Northwestern pokazali kontroler, który uczy się per zadanie, kiedy szukać w pamięci, kiedy przeformułować zapytanie, a kiedy kasować wpisy. Działa na istniejącym backendzie pamięci.

**Summary:** Większość agentów zapisuje doświadczenia jako tekst i przeszukuje je ustawieniami, które programista dobrał ręcznie, na przykład liczbą pobieranych wspomnień. Autorzy zauważyli, że najlepsze ustawienie zmienia się w miarę zbierania doświadczeń. Na początku wspomnień jest mało i są luźno podobne, więc wyszukiwanie po podobieństwie może bardziej mylić model niż pomagać. Później przeformułowane zapytanie potrafi znaleźć coś nowego, a przy dużym magazynie warto usuwać wpisy, bo konkurują o ograniczoną liczbę miejsc w wyniku.

MEMCON prowadzi tabelę ocen dla par sytuacja i operacja. Przed każdym pobraniem wyciąga zwięzły opis stanu, czyli rodzaj celu, to czy agent powtarza akcję, przybliżony rozmiar magazynu i to, czy istnieje udany przebieg z podobnego zadania. Wybiera spośród sześciu operacji, w tym szukania, szukania ponownie, pobrania udanego przebiegu, scalania duplikatów, usuwania i pominięcia wyszukiwania. Po zadaniu ocenia wynik i liczbę kroków, a decyzje bliżej końca dostają większą nagrodę lub karę niż wczesne.

Na sześciu benchmarkach MEMCON wypadał lepiej od konkurencji przy mniejszym zużyciu tokenów. W ALFWorld z GPT-4.1-mini miał 67,9 procent sukcesu wobec 59,7 dla G-Memory i zużywał 39 tysięcy tokenów wejściowych zamiast 45 tysięcy. W GAIA wygrał 22,4 do 21,2 procent, czyli niewiele. Zyski wzięły się głównie stąd, że kontroler nauczył się pomijać wyszukiwanie, kiedy nic nie daje.

**Key takeaways:**
- Prosty kontroler z tabelą ocen zamiast trenowania modelu.
- Oszczędność tokenów o około 13 procent w ALFWorld.
- Przewaga w GAIA jest mała, więc wniosek wymaga ostrożności.

**Why do I care:** Kto buduje agentów z pamięcią, zwykle wybiera top-k raz i zapomina o tym. Pomysł, że rezygnacja z wyszukiwania bywa najlepszym ruchem, jest tani do przetestowania u siebie. Warto jednak pamiętać, że testy robiono na starszych, małych modelach.

**Link:** [The Batch, wydanie z 20 listopada 2026](https://info.deeplearning.ai/jensen-huangs-nvidia-legacy-claude-fable-5.2-and-anthropics-ipo-world-labs-releases-atlas-to-developers-1)
