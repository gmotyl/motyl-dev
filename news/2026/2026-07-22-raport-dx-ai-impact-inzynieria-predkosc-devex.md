---
title: "Raport DX: AI przyspiesza kod, ale rozjeżdża developer experience"
excerpt: "Najnowszy kwartalny raport DX na próbie ponad 500 zespołów pokazuje, że AI napędza wzrost przepustowości PR-ów, ale developer experience i zaufanie do jakości kodu spadają."
publishedAt: "2026-07-22"
slug: "raport-dx-ai-impact-inzynieria-predkosc-devex"
hashtags: "#ai #dx #devex #productivity #code-review #dlug-techniczny #metryki #inzynieria #generated #pl"
source_pattern: "Refactoring"
---

## Raport DX: AI przyspiesza kod, ale rozjeżdża developer experience

**TLDR:** Kwartalny raport DX o wpływie AI na inżynierię, oparty na ponad 500 zespołach, pokazuje, że ponad połowa kodu powstaje dziś z udziałem AI, a mediana przepustowości PR-ów wzrosła o 37% w cztery kwartały. Jednocześnie wskaźnik developer experience spadł z 67 do 65, rozmiar PR-ów niemal się podwoił, a budżety na AI urosły 28-krotnie przy płaskim wskaźniku innowacyjności. Firma DX razem z autorem Refactoring komentują to jako przejście dyskusji z „czy wdrażamy AI” na „co ta AI faktycznie nam daje”.

Artykuł powstał we współpracy z Justinem Reockiem, zastępcą CTO w DX, firmie, która od kilku kwartałów regularnie bada, jak AI zmienia pracę zespołów inżynierskich. To, co odróżnia ich serię raportów od typowych ankiet branżowych, to konsekwencja pytań zadawanych z kwartału na kwartał, dzięki czemu widać nie tylko zdjęcie sytuacji, ale trend. Autor zauważa, że raporty DX przesunęły ciężar z tematu adopcji na temat wpływu, bo adopcja AI w zespołach programistycznych przestała być pytaniem otwartym. Dziś liderzy inżynierii nie muszą już nikogo przekonywać do używania AI, muszą uzasadnić przed zarządem rosnące budżety na te narzędzia konkretnymi liczbami.

Liczby na start są imponujące. Ponad połowa kodu w badanych zespołach powstaje dziś z udziałem AI, w porównaniu do 34% jeszcze kwartał wcześniej, czyli w ciągu trzech miesięcy odsetek wzrósł o kilkanaście punktów procentowych. Mediana tygodniowej przepustowości wzrosła o 37% w cztery kwartały, z 1,42 do 1,94 PR-a na inżyniera tygodniowo, a częstotliwość wdrożeń rośnie dwucyfrowo w większości segmentów. Problem w tym, że te zyski nie rozkładają się równo. Koncentrują się w małych organizacjach, poniżej stu inżynierów, oraz w firmach z sektora technologicznego, podczas gdy większe organizacje i firmy spoza tech odstają coraz bardziej. To nie jest nowe zjawisko, bo podobny wzorzec pojawiał się już w innych badaniach z tego roku, ale skala rozjazdu robi się coraz trudniejsza do zignorowania.

Druga część raportu jest mniej optymistyczna. Wskaźnik developer experience, który DX liczy jako swój własny indeks DXI, spadł średnio z 67 do 65 w cztery kwartały. To spadek niewielki liczbowo, ale znaczący, bo dzieje się równolegle ze wzrostem prędkości, a nie mimo niej. AI poprawia część doświadczenia programistów, jakość dokumentacji, łatwiejsze wdrażanie nowych osób, ogólną utrzymywalność kodu, ale jednocześnie pogarsza inne elementy: PR-y robią się większe, przeglądy kodu wolniejsze, a dostarczanie mniej inkrementalne. Mediana rozmiaru PR-a niemal się podwoiła w tym samym okresie, a to akurat metryka, którą inżynierowie od dawna traktują jako wczesny sygnał ostrzegawczy przed długiem technicznym, większą liczbą błędów i frustracją na code review. Do tego dochodzi kwestia budżetów: wydatki na AI wzrosły 28-krotnie, a wskaźnik innowacyjności organizacji pozostał praktycznie płaski. Innymi słowy, firmy płacą coraz więcej za narzędzia, które przyspieszają pisanie kodu, ale niekoniecznie przekładają się na więcej realnej wartości biznesowej.

Najciekawszy fragment to jednak diagnoza, a nie same liczby. Autor stawia tezę, że dotąd AI było w większości doklejane do istniejących etapów procesu wytwarzania oprogramowania, bez zmiany samego procesu. Dla części kroków to działa nieźle, dla innych, jak code review, kompletnie się nie sprawdza. Trudno się z tym nie zgodzić: jeśli AI potrafi realnie potroić tempo pisania kodu, to zakładanie, że każdą linijkę nadal będzie ręcznie czytał człowiek w tym samym tempie co wcześniej, jest po prostu naiwne. Problem w tym, że sam raport (przynajmniej we fragmencie, który mamy) opisuje ten rozjazd, ale nie mówi wprost, kto i jak powinien przeprojektować proces review, żeby nadążył za tempem generowania kodu. To zostawia czytelnika z diagnozą bez recepty, co samo w sobie jest dość wymowne dla stanu branży na ten moment.

**Key takeaways:**
- Ponad 50% kodu w badanych zespołach powstaje dziś z udziałem AI, wzrost z 34% w poprzednim kwartale
- Mediana przepustowości PR-ów wzrosła o 37% w cztery kwartały (z 1,42 do 1,94 PR-a na inżyniera tygodniowo), ale zyski koncentrują się w małych i technologicznych organizacjach
- Wskaźnik developer experience (DXI) spadł z 67 do 65 mimo rosnącej prędkości, głównie przez większe PR-y i wolniejsze review
- Mediana rozmiaru PR-a niemal się podwoiła, co jest klasycznym wczesnym sygnałem narastającego długu technicznego
- Budżety na AI wzrosły 28-krotnie przy praktycznie płaskim wskaźniku innowacyjności organizacji

**Why do I care:** Ten raport trafia w coś, co widzę na własne oczy w codziennej pracy: prędkość pisania kodu poszła mocno w górę, ale review i utrzymanie jakości zostały w tyle, bo nikt jeszcze nie przeprojektował tych procesów pod nowe tempo. Dla architektów to sygnał, żeby przestać traktować AI jako dodatek do istniejącego workflow i zacząć pytać, które etapy w ogóle powinny zniknąć albo zmienić formę, code review na pewno jest pierwszym kandydatem. Dla liderów zespołów rosnący rozdźwięk między małymi, zwinnymi organizacjami a większymi firmami to ostrzeżenie, że samo kupienie licencji na narzędzia AI nie wystarczy, licząc się bez zmiany procesu i kultury pracy zespół tylko odstaje bardziej. A rosnące 28-krotnie budżety przy płaskiej innowacyjności to argument, który każdy CTO prędzej czy później usłyszy od finansów, więc lepiej mieć na niego odpowiedź, zanim padnie pytanie.

**Link:** [The State of AI Impact in Engineering](https://refactoring.fm/p/the-state-of-ai-impact-in-engineering?publication_id=64099&post_id=207414394&isFreemail=true&triedRedirect=true)
