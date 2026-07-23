---
title: "Dlaczego nie zobaczymy kolejnego momentu DeepSeek"
excerpt: "Nowe open-source'owe modele jak Kimi K3 robią wrażenie na benchmarkach, ale nie wywołają krachu giełdowego, bo problem nie leży w inteligencji modeli, lecz w dostępności mocy obliczeniowej."
publishedAt: "2026-07-21"
slug: "nie-bedzie-drugiego-momentu-deepseek"
hashtags: "#kilo #llm #ai #openweights #compute #generated #pl"
source_pattern: "Kilo"
---

## Dlaczego nie zobaczymy kolejnego momentu DeepSeek

**TLDR:** W styczniu 2025 DeepSeek wywrócił rynek do góry nogami, a NVIDIA straciła $600B wartości w jeden dzień. Dziś mamy nowe open-source'owe modele jak Kimi K3 i GLM-5.2, które osiągają podobny skok w możliwościach, ale tym razem rynek reaguje inaczej. Powód jest prosty: to nie inteligencja modelu jest niedoborowym zasobem, lecz moc obliczeniowa potrzebna do jego obsługi.

Kiedy DeepSeek trafił na rynek, narracja była prosta: open-source'owe modele zniszczą wartość klastrów obliczeniowych, bo po co płacić za ogromne GPU, skoro dobry model można zbudować tanio? Giełda uwierzyła w tę historię i wysłała akcje NVIDIA w dół o $600 miliardów w ciągu jednej sesji. To była spektakularna reakcja, ale oparta na błędnym założeniu. Kimi K3 od Moonshot AI jest tego najlepszym dowodem: model trafił na #8 w rankingu OpenRouter w ciągu kilku dni od premiery, przetwarzając ~155 miliardów tokenów dziennie, i na benchmarkach ustępuje jedynie Claude Fable 5 i GPT-5.6. Brzmi jak kolejny DeepSeek moment, prawda? A jednak Moonshot niemal natychmiast wstrzymał nowe subskrypcje.

Dlaczego? Bo obsłużenie takiego modelu pożera zasoby w tempie, którego infrastruktura nie nadążyła wchłonąć. Przepustowość spadła z 30 tokenów na sekundę do 13. Czas do pierwszego tokenu wzrósł powyżej 20 sekund. Uruchomienie kwantyzowanej wersji modelu K3 z 2,8 biliona parametrów to koszt od $500 tysięcy do $4 milionów w samym sprzęcie, a dostawcy neochmury podpisują kontrakty na 3-5 lat z poważnymi zaliczkami. Mniejszych klientów podobno odprawia się z kwitkiem. Open-source nie znaczy "darmowe do uruchomienia w produkcji".

Tu wchodzi paradoks Jevonsa, który Satya Nadella wymienił przy okazji DeepSeeka i który wciąż jest niedoceniany. Ceny fronterowych modeli spadły z około $60 za milion tokenów trzy lata temu do $15-30 dziś, czterokrotnie. W tym samym czasie popyt na inteligencję frontierową wzrósł o trzy rzędy wielkości, a mierzona zdolność modeli do samodzielnego wykonywania zadań poszła w górę 32-krotnie według METR. Tańsze tokeny nie zmniejszają rachunków, one rozszerzają zestaw zadań, które w ogóle warto zlecić AI, aż w końcu zużywamy więcej compute niż wcześniej. Tak działa każda technologia, która nagle staje się wystarczająco tania.

Praktyczny wniosek dla każdego, kto buduje produkty na bazie tych modeli, jest nieprzyjemny: capacity porusza się pod nogami bez ostrzeżenia. Jeden model może zwolnić z powodu własnego sukcesu. Inny, jak Claude Fable 5 najlepszy model do kodowania w tygodniu premiery, może zostać wycofany z powodu dyrektywy eksportowej rządu USA. GitHub Copilot wprowadził billing oparty na użyciu, zamieniając stały koszt miejsca w nieprzewidywalny rachunek. Nie masz kontroli nad tym, co dzieje się po stronie dostawcy. Jedyne, co możesz kontrolować, to to, czy jesteś uzależniony od jednego z nich.

**Key takeaways:**
- Open-source'owy model o fronterowej inteligencji nie zniszczy wartości compute, bo do jego obsługi w skali potrzeba dokładnie tyle samo potężnego sprzętu co wcześniej.
- Paradoks Jevonsa działa bezbłędnie: tańsze modele nie zmniejszają popytu na moc obliczeniową, lecz go zwielokrotniają.
- Dostępność modeli (capacity) jest zasobem niestabilnym i politycznym, niekoniecznie technicznym.
- Vendor lock-in w świecie LLM to realne ryzyko operacyjne, a routing między dostawcami przestaje być optymalizacją, a staje się koniecznością.

**Why do I care:** Z perspektywy architekta systemów frontendowych i fullstackowych, które coraz głębiej integrują AI, ta analiza to zimny prysznic. Myśleliśmy, że głównym ryzykiem jest koszt i jakość modelu. Okazuje się, że równie poważnym ryzykiem jest dostępność i zmienność warunków u dostawcy. Budowanie na jednym dostawcy LLM jest dziś podobnym błędem co budowanie całej infrastruktury na jednym providerce chmurowym bez planu B. Abstrakcja nad warstwą modeli przestała być luksusem architektonicznym.

**Link:** [Why we won't see another DeepSeek moment anytime soon](https://blog.kilo.ai/p/no-second-deekseek-moment?publication_id=4363009&post_id=207825839&isFreemail=true&triedRedirect=true)
