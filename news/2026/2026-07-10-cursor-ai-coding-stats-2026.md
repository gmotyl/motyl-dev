---
title: "Ciekawe statystyki AI z Cursora: jak naprawdę używamy modeli do kodowania"
excerpt: "Cursor opublikował raport oparty na dwóch latach zagregowanych danych użytkowania – i wynika z niego kilka zaskakujących rzeczy o tym, jak programiści faktycznie korzystają z asystentów AI."
publishedAt: "2026-07-10"
slug: "cursor-ai-coding-stats-2026"
hashtags: "#pragmaticengineer #ai #cursor #llm #devtools #agentai #tokenomics #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Ciekawe statystyki AI z Cursora: co naprawdę dzieje się pod maską

**TLDR:** Cursor opublikował raport z dwóch lat danych o użytkowaniu – mediana dewelopera generuje ~700 linii kodu tygodniowo, ale top 1% dochodzi do 30–40 tysięcy. Co ważniejsze: 90% zużycia tokenów to tokeny wejściowe, a prawie 40% programistów przestało ręcznie sprawdzać commity generowane przez AI.

**Summary:** Kiedy Cursor opublikował raport oparty na realnych danych użytkowania, spodziewałem się marketingowych liczb. Dostałem coś ciekawszego – trochę surowej statystyki, która nie zawsze pokazuje narzędzie w najlepszym świetle, a przy okazji rzuca nowe światło na to, jak modele językowe faktycznie działają w środowisku deweloperskim.

Zacznijmy od liczb, które robią wrażenie: mediana użytkownika Cursora generuje około 700 linii kodu tygodniowo. Dla top 10% to już 9000 linii, a dla top 1% – bagatela 30 do 40 tysięcy linii tygodniowo. To mniej więcej tyle, co 45 "medianych" deweloperów w tym samym czasie. Brzmi imponująco, ale tutaj od razu pojawia się pytanie, które raport woli przemilczeć: czy te linie faktycznie trafiają do produkcji? Czy ktoś to przegląda? Jaka jest jakość tego kodu i ile bugów generuje się proporcjonalnie do tej produktywności? Liczba wygenerowanych linii to metryka, która wygodnie omija odpowiedź na pytanie o wartość biznesową.

Zdecydowanie bardziej interesująca jest informacja o tokenach. Okazuje się, że 90% zużycia tokenów w Cursorze to tokeny wejściowe – czyli czytanie istniejącego kodu i dokumentacji, nie generowanie nowego. To ciekawe potwierdzenie starej obserwacji Roberta C. Martina z "Clean Code" – że stosunek czasu poświęconego na czytanie do pisania kodu wynosi co najmniej 10 do 1. AI replikuje wzorce ludzkie pracy, co powinno dać nam do myślenia przy projektowaniu własnych agentów i pipeline'ów.

Gdy doliczymy cache'owanie kontekstu, obraz staje się jeszcze ciekawszy. Faktyczne tokeny wyjściowe to zaledwie 0.6% całego zużycia. Reszta to cache read (90%), cache write (2.5%) i surowe tokeny wejściowe (7%). To pokazuje, że inteligentne cache'owanie jest absolutnie kluczowym elementem efektywności AI agentów – i że budując własny harness agentowy, trzeba ten problem potraktować poważnie, bo bez dobrego cache'u koszty wychodzą szybko spod kontroli.

Na froncie kosztów Cursor porównał modele i wyszło na to, że Opus 4.7 jest prawie 10 razy droższy niż ich własny Composer 2.5, mierzony kosztem jednego requestu agentowego. Gdy jednak spojrzeć na koszt na linię zaakceptowanego kodu, Opus 4.7 i GPT-5.5 wychodzą podobnie – inteligentniejszy model jest droższy za request, ale generuje kod, który częściej jest akceptowany. To bardziej uczciwa metryka. Ciekawe, że Gemini całkowicie zniknął z zestawień – bo według Cursora po prostu nikt go nie używa.

I wreszcie – dla mnie najciekawsza liczba z całego raportu: w marcu 2026 roku, w ciągu jednego miesiąca, odsetek deweloperów, którzy nie sprawdzają ręcznie commitów generowanych przez AI, wzrósł z 10% do 40%. Skok zbiegł się z premierami Opus 4.7 i GPT-5.5. Coś się wyraźnie zmieniło w zaufaniu deweloperów do tych modeli. Czy słusznie? To zależy od projektu, kontekstu i apetytu na ryzyko. Ale trend jest wyraźny i warto go odnotować.

**Key takeaways:**
- Mediana dewelopera w Cursorze generuje ~700 linii kodu tygodniowo, ale top 1% osiąga 30–40 tys. – pytanie o jakość i wartość biznesową pozostaje otwarte
- 90% zużycia tokenów to tokeny wejściowe (czytanie kodu), nie wyjściowe – AI replukuje ludzki wzorzec pracy "10:1 czytanie do pisania"
- Inteligentne cache'owanie kontekstu to kluczowy element efektywności agentów AI; tokeny wyjściowe to zaledwie 0.6% całości przy uwzględnieniu cache
- W marcu 2026 roku 40% deweloperów przestało ręcznie weryfikować commity AI – wzrost z 10% w ciągu jednego miesiąca
- Koszt-per-linię zaakceptowanego kodu to lepsza metryka niż koszt-per-request przy porównywaniu modeli

**Why do I care:** Jako osoba myśląca o architekturze frontendowych projektów, te dane są użyteczne z kilku powodów. Po pierwsze, pokazują, że jeśli budujesz własną integrację z AI – czy to wewnętrzny tooling, czy agentowe pipeline'y – nie możesz ignorować tematu cache'owania tokenów. Koszty mogą cię zaskoczyć. Po drugie, statystyka dotycząca braku ręcznego review commitów powinna wzbudzić zdrowy niepokój. Znam projekty, gdzie review kodu to ostatnia linia obrony przed regresją. Jeśli 40% deweloperów rezygnuje z tej linii, to albo testy są naprawdę dobre (oby!), albo rośnie ryzyko, które objawi się z opóźnieniem. Liczba linii wygenerowanego kodu to miła metryka do slajdów dla zarządu, ale nie mówi nic o maintainability, o długu technicznym, ani o tym, czy ktoś to kiedyś będzie w stanie zrozumieć.

**Link:** [The Pulse: Interesting AI coding stats from Cursor](https://newsletter.pragmaticengineer.com/p/the-pulse-interesting-ai-coding-stats)

---
