---
title: "Przeprowadź audyt plików konfiguracyjnych swojego agenta"
excerpt: "Konfiguracja agenta ma okres półtrwania, a badania pokazują, że spersonalizowane umiejętności i pliki kontekstowe pomagają znacznie mniej, niż wszyscy zakładają."
publishedAt: "2026-08-27"
slug: "audyt-plikow-konfiguracyjnych-agenta"
hashtags: "#AddyOsmani #agents #ai #devtools #dx #workflow #generated #pl"
source_pattern: "Addy Osmani"
---

## Przeprowadź audyt plików konfiguracyjnych swojego agenta

**TLDR:** Konfiguracja agenta kodującego ma okres półtrwania. Modele się poprawiają, narzędzia zyskują nowe możliwości, bazy kodu się zmieniają, a instrukcje napisane pod starszą wersję zostają. Świeże badania pokazują niespójną wartość spersonalizowanych umiejętności, a jedno z nich nie wykazało poprawy poprawności z plików kontekstowych w ogóle.

**Summary:** Autor zaczyna od czegoś, co widać w każdej dyskusji na ten temat: ludzie mają problem z utrzymaniem plików instrukcji dla agenta poniżej dwustu linii, mimo że taka jest oficjalna sugestia. Pliki puchną, koszt tokenów rośnie, a przestrzeganie reguł spada. Oficjalna rada brzmi: co kilka miesięcy skasuj wszystko i odbuduj tylko to, co ma znaczenie. I tu pojawia się realna bariera, którą autor nazywa uczciwie. Ludzie się boją. Nie wiedzą, czy jakość dramatycznie nie spadnie, nie mają łatwego sposobu na szybkie przywrócenie stanu i nie mają jak tego porządnie porównać przy tylu możliwych konfiguracjach.

Mechanizm gnicia jest prosty i każdy z nas go zna. Za każdym razem, gdy agent zrobi coś nie tak, dopisujesz regułę. Plik rośnie, przestrzeganie spada, więc dopisujesz kolejne reguły, a jakość spada dalej. Kończysz z pełną bazą wiedzy zamiast krótkiego przewodnika decyzyjnego, i to jest klasyczny błąd. Autor przyznaje, że sam ma pliki dłuższe niż dwieście linii, a jako typowe tryby awarii wymienia zbyt długie przykłady i treść powielającą to, co i tak jest w pliku readme albo w manifeście pakietu.

Liczby są konkretne i warto je zapamiętać. Badanie stu popularnych repozytoriów wykazało wyciek konfiguracji lintera w sześćdziesięciu dwóch procentach przypadków, przeładowanie kontekstu w czterdziestu dwóch i wyciek umiejętności w trzydziestu pięciu. Większość badanych plików miała przynajmniej jeden problem. Do tego dochodzi informacja od twórców jednego z popularnych narzędzi, że usunęli ponad osiemdziesiąt procent swojego promptu systemowego bez mierzalnej straty na wewnętrznych testach. Autor rozsądnie zaznacza, że to nie jest cel do naśladowania, bo testy nie są publiczne i dotyczy to konkretnych modeli w konkretnym narzędziu. Wniosek jest inny i lepszy: wartość instrukcji może wygasnąć, więc najpierw archiwizuj, a jeśli jakaś reguła musi obowiązywać zawsze, zakoduj ją w teście, haczyku albo uprawnieniu, a nie zostawiaj jako prozę, którą model może zgubić.

Najbardziej zaskakująca część dotyczy personalizacji. Praca badawcza próbowała zamienić historię interakcji dewelopera w wielokrotnego użytku umiejętność osobistą. Wynik: personalizacja niewiele pomogła. Umiejętność zbudowana z historii jednego dewelopera działała mniej więcej tak samo dobrze jak pożyczona od kogoś innego, a ogólna umiejętność zbudowana z danych wielu osób była użyteczniejsza. To uderza w intuicję, którą większość z nas ma, że własne preferencje w plikach agenta robią wielką różnicę. Autor dodaje ważne zastrzeżenie: personalizacja wyglądała lepiej, gdy ta sama preferencja powtarzała się w wielu podobnych zadaniach, a eksperymenty używały symulatora dewelopera opartego na modelu, więc to raczej obiecujący sygnał niż rozstrzygnięcie.

Drugie badanie pyta wprost, czy pliki kontekstowe w repozytorium pomagają. Na dwustu osiemdziesięciu ośmiu przebiegach po siedemnastu prawdziwych zadaniach nie było wyraźnej różnicy w poprawności. Zmienił się natomiast sposób pracy agenta. W jednym repozytorium przewodnik ostrzegał, że pełny zestaw testów jest bardzo wolny, więc agent uruchamiał testy bardziej celowane i marnował mniej czasu. Nie stał się lepszy w implementowaniu funkcji, ale sprawniej podążał za konwencją repozytorium. To rozróżnienie jest kluczowe i autor wyciąga z niego właściwy wniosek: plik kontekstowy może powiedzieć agentowi o kosztownych poleceniach, plikach generowanych, granicach architektonicznych i regułach bezpieczeństwa, ale nie nauczy go subtelnej decyzji projektowej. Powiązane badanie mówi to samo z innej strony: streszczenia prozą odpowiedziały na cztery z czterdziestu pięciu pytań o zachowanie kodu, a sam kod źródłowy na dwadzieścia siedem, bo streszczenia wygładzają drobiazgi, które mają znaczenie.

Część o własnym audycie jest najbardziej ludzka. Autor uruchomił polecenie diagnostyczne i był zszokowany tym, co u niego zostało. Kilka miesięcy wcześniej testował różne umiejętności do pisania i kompletnie zapomniał, ile ich zainstalował. Nie miał pojęcia, czy uruchamiają się razem, czy jedna ma pierwszeństwo, czy wszystkie są ignorowane. Przytacza czyjś wpis o zejściu z dwustu pięćdziesięciu umiejętności do dwudziestu pięciu i sam komentuje z niedowierzaniem, jak można dojść do dwustu pięćdziesięciu. Odpowiedź jest prosta: eksperymentując, kumulują się same. Zdanie, które z tego zapamiętam, brzmi: zainstalowanie użytecznej umiejętności i zachowanie jej na zawsze to dwie osobne decyzje.

**Key takeaways:**
- Konfiguracja agenta gnije, bo dopisujesz regułę po każdym błędzie i nigdy nic nie usuwasz
- W stu badanych repozytoriach wyciek konfiguracji lintera wystąpił w sześćdziesięciu dwóch procentach, przeładowanie kontekstu w czterdziestu dwóch
- Reguła, która musi obowiązywać zawsze, powinna być testem, haczykiem albo uprawnieniem, a nie prozą
- Spersonalizowane umiejętności działały nie lepiej niż pożyczone, a ogólne były użyteczniejsze
- Pliki kontekstowe nie poprawiły poprawności, ale zmieniły sposób pracy agenta na sprawniejszy
- Streszczenia prozą odpowiadają na znacznie mniej pytań o kod niż sam kod
- Instalowanie umiejętności i trzymanie jej na zawsze to dwie osobne decyzje

**Why do I care:** Najmocniejszy wniosek dla mnie jest taki, że plik instrukcji dla agenta powinien zawierać wyłącznie rzeczy, których model nie wyczyta z kodu. Jak uruchomić właściwe sprawdzenia, które operacje są drogie, czego nie wolno ruszać, gdzie mieszkają nietypowe konwencje projektu. Wszystko, co brzmi jak ogólna porada o pisaniu czystego kodu, jest marnowaniem tokenów w każdej sesji. Druga rzecz: sugestia, żeby raz na jakiś czas kazać agentowi pracować bez żadnych lokalnych umiejętności i sprawdzić, czy to w ogóle robi różnicę. Podejrzewam, że wielu z nas trzyma te pliki jako kulę u nogi z lęku, a nie z dowodu. I ostatnia, najbardziej praktyczna: reguła, która naprawdę musi obowiązywać, ma być testem. Proza jest sugestią, test jest faktem.

**Link:** [Audit your Agent files](https://addyo.substack.com/p/audit-your-agent-files)
