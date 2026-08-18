---
title: "Ile sygnału jest w otwarciu szachowym i jak sankcje retroaktywnie brudzą czyste krypto"
excerpt: "HackerNoon o dwóch bardzo różnych problemach z danymi: ile realnie mówi otwarcie szachowe o wyniku partii, oraz jak sankcje na giełdy kryptowalut mogą po latach zamienić czyste transakcje w toksyczne."
publishedAt: "2026-08-18"
slug: "hackernoon-szachy-ml-retroaktywna-toksycznosc-krypto"
hashtags: "#HackerNoon #ml #security #architecture #generated #pl"
source_pattern: "HackerNoon"
---

## Ile sygnału predykcyjnego kryje się w otwarciu szachowym

**TLDR:** Autor porównuje Random Forest i sieć MLP w przewidywaniu wyniku partii szachowej na podstawie danych tabelarycznych o otwarciu i rankingach graczy. Wnioski dotyczą nie tyle samego szachu, co tego, jak łatwo pomylić dobrze przygotowane dane z realnym sygnałem predykcyjnym.

**Summary:** Punktem wyjścia jest pytanie, które brzmi banalnie, ale jest zaskakująco trudne do dobrego postawienia: ile w ogóle da się przewidzieć o wyniku partii szachowej, znając tylko otwarcie i ranking Elo obu graczy, bez śledzenia kolejnych posunięć. Autor przypomina, że większość projektów uczenia maszynowego nie upada przez wybór modelu, tylko przez decyzje podjęte wcześniej, przy przygotowaniu danych, więc zanim doszło do porównania Random Forest z MLP, trzeba było rozstrzygnąć dwie fundamentalne kwestie dotyczące reprezentacji otwarcia i sposobu kodowania geometrii szachownicy.

To jest dokładnie ten typ pracy, którego nie widać w błyszczącym wykresie z metrykami na końcu, a który decyduje, czy te metryki znaczą cokolwiek. Random Forest wypada dobrze tam, gdzie dane tabelaryczne mają jasną strukturę cech, a MLP zaczyna zyskiwać przewagę tylko wtedy, gdy reprezentacja danych jest bogatsza niż proste kategorie. Sam artykuł nie deklaruje jednego zwycięzcy uniwersalnie, tylko pokazuje, że odpowiedź zależy od tego, jak dużo informacji o strukturze otwarcia faktycznie trafia do modelu w formie, z której może skorzystać.

Wniosek praktyczny, który wybija się z tego eksperymentu, jest szerszy niż sam szachów: otwarcie niesie realny, ale ograniczony sygnał predykcyjny, i różnica między modelami jest mniejsza niż różnica między dobrym i słabym przygotowaniem danych wejściowych.

**Key takeaways:**
- Wynik porównania Random Forest i MLP zależy silniej od reprezentacji danych niż od samego wyboru modelu
- Otwarcie szachowe niesie ograniczony, ale realny sygnał predykcyjny o wyniku partii
- Większość projektów ML upada na etapie przygotowania danych, nie na etapie doboru algorytmu

**Why do I care:** Ten sam problem widzę regularnie w projektach dla klientów, gdzie ktoś chce porównać dwa modele, zanim ktokolwiek usiadł i porządnie przemyślał, co właściwie reprezentują dane wejściowe. Lekcja z szachów przenosi się bezpośrednio na dowolny projekt tabelaryczny w produkcji, jeśli feature engineering jest słaby, żaden wybór algorytmu tego nie uratuje, a jeśli jest dobry, prostszy model często wystarcza. To dobry argument, żeby w code review pytać najpierw o dane, a dopiero potem o architekturę modelu.

**Link:** [How Much Predictive Signal Is Hidden in a Chess Opening?](https://hackernoon.com/8-17-2026-newsletter)

## Jak sankcje i risk scoring mogą retroaktywnie zabrudzić czyste krypto

**TLDR:** Artykuł opisuje mechanizm "retroaktywnej toksyczności" w kryptowalutach: transakcja czysta w momencie wykonania może zostać przeklasyfikowana jako podejrzana miesiące lub lata później, kiedy giełda, przez którą przepłynęły środki, trafia na listę sankcji. Sprawa HTX, Tornado Cash i Garantex pokazuje, jak realny jest ten problem dla zwykłych użytkowników.

**Summary:** Scenariusz opisany na początku jest prosty i dlatego straszny: ktoś w 2024 roku przelewa USDT na giełdę HTX, kupuje ETH, po miesiącu wypłaca wszystko na własny portfel, przechodzi KYC i zapomina o całej sprawie. Osiemnaście miesięcy później próbuje zdeponować te same monety na europejskiej giełdzie i dostaje odmowę, depozyt zamrożony, konto pod manualnym przeglądem. Nie zrobił niczego złego w momencie transakcji, ale świat analityki blockchain w międzyczasie zmienił etykiety.

Mechanika jest kluczowa do zrozumienia problemu. Firmy analityczne jak Chainalysis, Elliptic czy TRM Labs grupują adresy w klastry należące do konkretnych podmiotów, przypisują im etykiety, i liczą "taint", czyli procent środków możliwy do wyśledzenia do znanego nielegalnego źródła, najczęściej metodą haircut, gdzie każda transakcja dziedziczy proporcjonalne zanieczyszczenie od swoich wejść. Kiedy giełda trafia na listę sankcji, systemy analityczne retroaktywnie relabelują historyczne dane, a adres, który był czysty w chwili transakcji, zaczyna świecić czerwonym światłem bez żadnej akcji ze strony właściciela.

Historia Tornado Cash pokazuje, że nawet formalne zdjęcie z listy sankcji nie usuwa etykiety z prywatnych baz danych compliance, bo raz nadana etykieta żyje własnym życiem w systemach, przez które przechodzi. Historia Garantex pokazuje z kolei, jak szybko cały klaster adresów staje się "radioaktywny" w momencie zamknięcia platformy, niezależnie od tego, kiedy konkretna osoba faktycznie z niej korzystała. W obu przypadkach problemem nie jest sama blockchain, która nigdy niczego nie zapomina, ale interpretacja nałożona na te dane, która zmienia się z dnia na dzień i bez prawa do odwołania.

**Key takeaways:**
- Transakcja czysta w momencie wykonania może zostać retroaktywnie oznaczona jako toksyczna, gdy platforma trafia na listę sankcji
- Metoda haircut liczy "taint" proporcjonalnie i rozprzestrzenia zanieczyszczenie przez kolejne transakcje
- Przypadek Tornado Cash pokazuje, że formalne zdjęcie z listy sankcji nie usuwa etykiety z prywatnych baz compliance
- Indirect exposure (środki, które tylko przepłynęły przez klaster) wystarcza, żeby zostać oznaczonym jako ryzykowny

**Why do I care:** To nie jest tylko problem entuzjastów krypto, to case study tego, jak systemy klasyfikacji ryzyka oparte na etykietach mogą działać retroaktywnie i bez możliwości odwołania, co ma znaczenie dla każdego architekta budującego systemy scoringu, oceny ryzyka albo compliance. Jeśli projektujesz system, który przypisuje etykiety ryzyka na podstawie historycznych danych, ten artykuł jest dobrym argumentem, żeby przemyśleć, co się stanie, kiedy definicja "ryzykowny" zmieni się w przyszłości, i czy twój system będzie w stanie to obsłużyć sprawiedliwie, czy tylko automatycznie ukarze wszystkich, którzy mieli nieszczęście dotknąć złego klastra w złym momencie.

**Link:** [How Sanctions and Risk Scoring Can Turn Clean Crypto "Dirty"](https://hackernoon.com/how-sanctions-and-risk-scoring-can-turn-clean-crypto-dirty)
