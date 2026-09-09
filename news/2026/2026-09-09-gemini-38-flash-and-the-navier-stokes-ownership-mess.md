---
title: "Gemini 3.8 Flash wszedł po cichu, a dowód matematyczny zrobił się niewygodny"
excerpt: "Google wypuściło model Flash na tyle szybki, że zmienia to, co warto puszczać w pętli, a dowód dla równań Naviera-Stokesa zamienił się w spór o to, kto jest właścicielem twoich nieopublikowanych szkiców."
publishedAt: "2026-09-09"
slug: "gemini-38-flash-and-the-navier-stokes-ownership-mess"
hashtags: "#kilo #ai #llm #agents #gemini #openai #engineering #devtools #generated #pl"
source_pattern: "Kilo"
---

## Gemini 3.8 Flash i cicha premiera, która miała znaczenie

**TLDR:** Google wypuściło Gemini 3.8 Flash wpisem na blogu, bez keynote'u, w tygodniu, w którym premiery flagowców robili Anthropic i Meta. Model pracuje z prędkością 352 tokenów wyjściowych na sekundę, czyli mniej więcej czterokrotnie szybciej niż GLM-5.3 i pięciokrotnie szybciej niż Grok 4.6 na tym samym poziomie inteligencji.

**Summary:** Liczby dotyczące inteligencji to najnudniejsza część i dokładnie o to chodzi. W Artificial Analysis Intelligence Index Grok 4.6 ma 61 punktów, GLM-5.3 ma 60, a Gemini 3.8 Flash 59. Dwa punkty na kompozycie z dziewięciu benchmarków to szum. Nikt nie wybiera między tą trójką na podstawie inteligencji, co oznacza, że wybór przeniósł się gdzie indziej.

Tym gdzie indziej jest przepustowość. Artificial Analysis mierzy Gemini 3.8 Flash na 352 tokeny wyjściowe na sekundę. GLM-5.3 wyciąga 80, a Grok 4.6 65. To nie jest przewaga, to inna kategoria doświadczenia. Pętla agentowa to dziesiątki wywołań modelu ułożonych jedno na drugim, z których każde czeka na poprzednie, więc prędkość na token kumuluje się przez cały przebieg. Przy 65 tokenach na sekundę zadanie na 40 kroków trwa na tyle długo, że można pójść zrobić kawę. Przy 352 po prostu się je przesiaduje.

Cennik to 0,75 dolara za milion tokenów wejściowych i 3,75 dolara za wyjściowe, promocyjnie do końca grudnia, potem stawki się podwajają do 1,50 i 7,50. Wejście z cache'u kosztuje 0,075. Okno kontekstu ma milion tokenów bez dopłaty za długi kontekst, a poziomy wysiłku są regulowane, więc przy szablonowej robocie da się zejść z kosztami. Zespół Kilo zmierzył 75,3% na własnym KiloBench, przed GPT-5.5 przy wyższym koszcie, a wyniki Google'a na DeepSWE v1.1 pokazują, że model domyka długodystansowe zadania inżynierskie od początku do końca lepiej niż większość większych modeli.

Zastrzeżenie, które wpis robi, a potem trochę je zamiata, jest tym, które realnie dotyczy twojego rachunku. Koszt na token to nie koszt na zadanie. Przy wyższych poziomach wysiłku 3.8 Flash wykonuje dodatkowe kroki rozumowania i wywołuje narzędzia bardziej iteracyjnie niż 3.7 Flash, więc na tej samej robocie potrafi spalić więcej tokenów. Twierdzenie, że ta dodatkowa staranność sama się spłaca, opiera się na wczesnych przebiegach, a nie na opublikowanych liczbach, i zanim w to uwierzę, wolałbym zobaczyć własne.

Google wypuściło też wariant wyłącznie dla obrońców o nazwie Gemini 3.8 Flash Cyber, dostrojony pod wyszukiwanie podatności i automatyczne łatanie, zamknięty za programem dla rządów, operatorów infrastruktury krytycznej i maintainerów oprogramowania. Zespół Chrome Security raportuje, że model wyprodukował 2,6 raza więcej poprawnych łatek na podatności niż znacznie większe modele komercyjne. To wąskie, weryfikowalne twierdzenie od zespołu, który nie ma powodu go podkręcać, i jest ciekawsze niż większość tabeli benchmarków.

Prawdziwą historią jest tu kadencja. Gemini 3.5 Flash w maju, potem 3.6, potem 3.7 trzy tygodnie temu, teraz 3.8. Nowy model Flash mniej więcej co miesiąc, każdy będący realnym krokiem w kodowaniu i pracy agentowej, a nie podbiciem numerka wersji. Inteligencja z pierwszej ligi stała się standardem, a konkurencja przeniosła się na koszt na zadanie, przepustowość i to, czy model utrzyma się na torze przez 40 wywołań narzędzi.

**Key takeaways:**
- Gemini 3.8 Flash, GLM-5.3 i Grok 4.6 mieszczą się w dwóch punktach od siebie w indeksie Artificial Analysis
- Realnym wyróżnikiem jest 352 tokeny wyjściowe na sekundę wobec 80 dla GLM-5.3 i 65 dla Grok 4.6
- 0,75 dolara za wejście i 3,75 za wyjście do grudnia, potem dwa razy tyle, przy wejściu z cache'u po 0,075
- Wyższe poziomy wysiłku spalają więcej tokenów na zadanie niż 3.7 Flash, więc koszt na token to nie koszt na zadanie

**Why do I care:** To jest model, na który kierujesz pętle działające w tle, a nie ten, którego używasz do rozmowy o architekturze. We frontendzie oznacza to generowanie testów, refaktory rozjeżdżające się po wielu plikach, przebiegi migracyjne i wszystko inne, co odpalasz i sprawdzasz później. Liczbą, która zmienia odczucie z pracy, jest te 352 tokeny na sekundę, bo 40-krokowy przebieg agenta przestaje być czymś, od czego przełączasz kontekst. Zanim przesuniesz tam realny budżet, zmierz koszt na zadanie zamiast kosztu na token, bo wpis sam przyznaje, że model pracuje więcej, a w styczniu cennik się podwaja.

**Link:** [The Quiet Launch of Gemini 3.8 Flash](https://blog.kilo.ai/p/the-quiet-launch-of-gemini-38-flash)

## Do kogo należą szkice z twojej sesji z agentem

**TLDR:** Trzech matematyków opublikowało zweryfikowane w Leanie dowody na wybuch w skończonym czasie dla wymuszonych równań Naviera-Stokesa, po roku pracy prowadzonej w sesjach Codeksa. Kilka dni później OpenAI wyprodukowało dowód tą samą wąską drogą, a autor nie zdołał się dowiedzieć, czy wykorzystano jego własne nieopublikowane szkice.

**Summary:** Najpierw matematyka, bo ta jest prawdziwa. 8 września Tristan Buckmaster, Levent Alpoge i Matei Coiculescu opublikowali dowody pokazujące, że kilka blisko spokrewnionych równań, w tym trójwymiarowe nieściśliwe równanie Eulera, może wybuchnąć w skończonym czasie pod wpływem gładkiej siły zewnętrznej. Wybuch oznacza, że pewna wielkość w rozwiązaniu ucieka do nieskończoności po skończonym czasie, zamiast pozostać ograniczona na zawsze, a to dokładnie to zachowanie, o które pyta wart milion dolarów problem milenijny Instytutu Claya. Dowody zweryfikowali w Leanie, więc argument jest sprawdzony maszynowo, a nie oparty na lekturze recenzenta, a Terence Tao opisał je na swoim blogu. Ten ostatni szczegół to najbliższa rzecz sygnałowi od całej dziedziny, jaką dostaje się przed formalną recenzją.

Praca zajęła około roku i przez większość czasu szła wolno. Według relacji Buckmastera przełom przyszedł 15 sierpnia, a Lean potwierdził go 22 sierpnia. Płacili z własnej kieszeni i korzystali po drodze z kilku modeli: Claude'a, Codeksa z GPT-5.6 Sol, a ostatnio Astry do redakcji tekstu i audytu. Każdy szkic w tym projekcie przeszedł przez ich sesje Codeksa.

Potem oś czasu robi się niewygodna. Buckmaster mówi, że 3 września napisał prywatnie do OpenAI, usłyszawszy, że jego praca dotarła do firmy, w nadziei na uniknięcie kolizji. 6 września rozmawiał dwukrotnie z Sebastienem Bubeckiem, który kieruje zespołem matematycznym OpenAI, i usłyszał, że wewnętrzny model wyprodukował około stustronicowy dowód wybuchu w skończonym czasie dla wymuszonych równań Naviera-Stokesa, z gładkim wymuszeniem, w wariantach c i d sformułowania Feffermana. To ta sama wąska droga, którą wybrali Buckmaster i Alpoge. Nie jest to trasa, na którą wpada się w kilka dni, podając modelowi treść problemu.

Najbardziej warta uważnej lektury jest relacja z tego, jak historia zmieniła się w trakcie jednej rozmowy telefonicznej. Najpierw usłyszał, że model dostał bardzo niewiele danych wejściowych od ludzi. Do końca tej samej rozmowy opis urósł do całego zespołu pracującego nad problemem, modelu rozgrzewanego najpierw na łatwiejszych równaniach i promptu, który sam został napisany przez promptowanie Codeksa. Zapytał, kiedy poszedł pierwszy prompt, i odpowiedź, ostatecznie, brzmiała: w ostatnich kilku dniach, po tym jak informacja o jego pracy dotarła do OpenAI. Zapytał, czy wewnętrzny model był trenowany na sesjach Codeksa zawierających wszystkie szkice albo czy miał do nich dostęp. Usłyszał, że model nie sięga po dane użytkowników. Kiedy dopytał konkretnie o trenowanie, nie dostał nic.

Obie strony są w wypowiedziach publicznych ostrożne i wpis Kilo też o tym pamięta. Bubeck nazywa krążące zarzuty fałszywymi i podburzającymi, twierdzi, że trzymał się norm akademickich, i zapowiedział pełniejszą odpowiedź. Buckmaster deklaruje, że nie widział dowodu OpenAI, nie wie, czy jego dane zostały wykorzystane, i nikogo o nic nie oskarża. Te zastrzeżenia robią realną robotę, a większość komentarzy je wyrzuciła.

Trwały wniosek nie ma nic wspólnego z tym, kto był niemiły przez telefon. Dwoje ludzi spędziło rok nad niszowym programem badawczym, a kiedy potrzebowali wiedzieć, co się stało z ich własnymi nieopublikowanymi szkicami, musieli zapytać dostawcę i liczyć na szczerą odpowiedź. Nie było loga do przeczytania ani sposobu na odtworzenie tego, co opuściło ich maszyny. Nikt nie podpisuje dokumentu zrzekającego się własności swojej pracy. Ona się po prostu odkłada. Decyzja architektoniczna ląduje w czacie, bo tam akurat myślałeś, model czyta całe repozytorium, żeby odpowiedzieć na pytanie o jedną funkcję, i miesiąc pracy projektowej nad niewydaną funkcjonalnością kończy jako historia rozmów w produkcie należącym do firmy, która za kwartał może być twoją konkurencją.

Rekomendacje na końcu to miejsce, w którym widać sprzedażowy interes, i warto to nazwać. Kilo robi router, więc "rozłóż pracę między dostawców" i "używaj narzędzi, których źródła możesz przeczytać" to wygodnie także opis ich produktu. To nie znaczy, że rada jest zła. Rozróżnienie, które wprowadza, jest naprawdę użyteczne: Buckmaster i Alpoge odpytywali co najmniej trzy rodziny modeli i to ich nie ochroniło, bo projekt i tak odkładał się w sesjach jednego produktu. Używanie kilku modeli to nie to samo co rozłożenie pracy. Liczy się to, gdzie ląduje stan roboczy.

**Key takeaways:**
- Dowody są zweryfikowane w Leanie i opisał je Terence Tao, więc to nie matematyka jest tu sporna
- Wewnętrzna próba OpenAI poszła tą samą wąską drogą, w wariantach c i d sformułowania Feffermana
- Relacja o udziale ludzi zmieniła się w trakcie jednej rozmowy telefonicznej, z bardzo niewielkiego wkładu na cały zespół
- Buckmaster nie dostał odpowiedzi na pytanie, czy wewnętrzny model był trenowany na jego sesjach Codeksa
- Odpytywanie wielu rodzin modeli nie pomaga, jeśli wszystkie szkice i tak odkładają się w historii sesji jednego produktu

**Why do I care:** Większość z nas nigdy nie znajdzie się w wyścigu, w którym trzy grupy na świecie gonią ten sam wynik, a ekspozycja i tak jest realna, jeśli twoją przewagą jest konkretne podejście, a nie istniejący biznes. Konkretne pytanie brzmi nie "jakiego modelu używasz", tylko "gdzie mieszka twój stan roboczy", a dla większości zespołów uczciwa odpowiedź brzmi: pojedynczy dostawca trzyma pełną historię projektową wszystkiego, co niewydane. Sprawdź, gdzie obecnie leży twoja nieopublikowana praca, i policz, ile firm widzi całość naraz. To ćwiczenie na dziesięć minut i podejrzewam, że odpowiedź cię zirytuje.

**Link:** [Mathematicians, OpenAI, and a $1m Problem](https://blog.kilo.ai/p/math-problem)
