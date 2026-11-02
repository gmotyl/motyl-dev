---
title: "Cache w Pythonie liczy dwa razy i AI odtwarza oprogramowanie metodą inżynierii wstecznej"
excerpt: "Dlaczego GIL nie chroni cache'a przed wielokrotnym liczeniem tej samej wartości oraz co naprawdę pokazuje szum wokół REA i klonów aplikacji Adobe."
publishedAt: "2026-11-02"
slug: "hackernoon-cache-python-gil-race-condition-rea-inzynieria-wsteczna"
hashtags: "#HackerNoon #python #performance #ai #agents #security #open-source #generated #pl"
source_pattern: "HackerNoon"
---

## Cache w Pythonie, który nie cache'uje

**TLDR:** Cache chroniący drogą funkcję może ją wywołać wielokrotnie dla tego samego klucza, mimo GIL. Błąd siedzi w przerwie między sprawdzeniem a zapisem.

**Summary:** Autor pokazuje prosty przykład. Osiem wątków prosi o te same pięćdziesiąt kluczy, a droga funkcja wykonuje się około czterystu razy zamiast pięćdziesięciu. Każda zwrócona wartość jest poprawna, cache po prostu nie robi tego, do czego go dodano. Mechanizm nazywa się check-then-act. Wątek stwierdza, że klucza brakuje, wywołuje funkcję, która na przykład czeka na bazę, a w tym czasie inny wątek podejmuje tę samą decyzję na przestarzałych informacjach.

Najważniejsze zdanie tekstu brzmi, że GIL chroni interpreter, a nie twoją logikę. GIL pilnuje wewnętrznych struktur danych, ale nie sprawia, że dwukrokowa operacja jest atomowa. Autor pokazuje też wersję groźniejszą, w której ta sama sytuacja kończy się ujemnym saldem konta, bo pięć wątków przeszło sprawdzenie, zanim którykolwiek odjął kwotę. Ciekawa uwaga dotyczy klasycznego przykładu z licznikiem. Na jego maszynie z Pythonem 3.12.3 nie dał żadnych utraconych aktualizacji, więc czysty wynik nie jest gwarancją.

Naprawy są dwie. Jedna blokada wokół sprawdzenia i zapisu działa, ale wątki proszące o inne klucze też czekają. Blokada na klucz jest lepsza, pod warunkiem ponownego sprawdzenia po jej zdobyciu. Zaskoczeniem jest lru_cache. Dokumentacja mówi, że jest bezpieczny wątkowo, co znaczy tyle, że sam się nie uszkodzi. Nie obiecuje, że funkcja wykona się raz, i w teście wykonała się znów około czterystu razy. To samo dotyczy cached_property.

Autor nie uruchamiał przykładów na wersji bez GIL i sam to zaznacza. Python 3.14 uznaje ją za oficjalnie wspieraną, ale opcjonalną. Dodaje też, że blokada w procesie nie daje gwarancji dokładnie jednego wykonania. Przy płatnościach potrzebne są klucze idempotencji i trwała deduplikacja.

**Key takeaways:**
- GIL nie uatomawia dwukrokowych operacji.
- Blokada na klucz i ponowne sprawdzenie ograniczają zbędną pracę.
- lru_cache jest bezpieczny wątkowo, ale może wykonać funkcję wiele razy.
- Blokada w procesie nie zastępuje idempotencji.

**Why do I care:** Ten wzorzec pojawia się też w Node.js, tylko pod nazwą wyścigu między dwoma awaitami, i każdy kto cache'uje zapytania do API w jednym procesie, może go mieć. Pytanie kontrolne jest proste. Czy między sprawdzeniem a zapisem coś czeka? Jeśli tak, to masz problem, niezależnie od języka.

**Link:** [Why Your Python Cache Does the Same Work Twice (P.S: GIL Won't Save You)](https://hackernoon.com/why-your-python-cache-does-the-same-work-twice-ps-gil-wont-save-you)

## Czy oprogramowanie umarło? REA i inżynieria wsteczna z AI

**TLDR:** Projekt REA, czyli Reverse Engineer Anything, zdobył w tydzień ponad sto tysięcy gwiazdek. Autor sprawdza, ile w tym szumie, a ile realnej zmiany.

**Summary:** REA to otwartoźródłowy serwer MCP, który łączy agentów takich jak Claude Code czy Codex z profesjonalnymi narzędziami do inżynierii wstecznej, między innymi Ghidrą, IDA i Hopperem, oraz z Chrome DevTools. Opisujesz zadanie zwykłym językiem, agent bada program i raportuje dowody. Autor zwraca uwagę, że to nie nowa technologia. Podobne projekty łączyły AI z tymi narzędziami od roku, REA tylko obniżył próg wejścia. Własny README mówi, że nie odzyskuje kodu źródłowego i nie klonuje aplikacji automatycznie.

Głośny przykład to ArtCraft Brandona Thomasa, czyli darmowe rewrite'y aplikacji Adobe i pakietu biurowego w Ruście. Szczegóły są mniej efektowne niż nagłówki. Thomas twierdzi, że używał zwykłego Claude Code, a jego repozytoria zabraniają AI czytać kod oryginałów, wolno jej badać tylko zachowanie, publiczne specyfikacje formatów i wygląd. Projekty są w wersji alfa, tylko pięć z trzydziestu testów filtrów zgadzało się z Photoshopem, a autor wycofał się z obietnicy pełnej zgodności w miesiąc.

Plusy to szybsza analiza złośliwego oprogramowania, większa presja na ceny i blokadę dostawcy oraz łatwiejsza interoperacyjność. Minusy to piractwo i wezwania do usunięcia treści, mniej miejsc, w których można ukryć podatności, niejasna sytuacja prawna i zmiana umów, które zakazują inżynierii wstecznej wspomaganej AI. Najciekawsze pytanie prawne pozostaje bez odpowiedzi. Klasyczny clean room dzieli człowieka, który czyta oryginał, od człowieka, który pisze kopię, a model uczony na ogromnej ilości publicznego kodu nie jest oczywiście czysty. Autor sprawdził też wątek lobbingu regulacyjnego i nie znalazł dowodu, że firmy lobbują z powodu narzędzi takich jak REA.

Warto zauważyć, że sam test z MindStudio pokazał, że aplikację z Maca odtworzono i z REA, i z samych zrzutów ekranu, a ta druga wersja była gotowa szybciej. Zaglądanie do środka nie zawsze wygrywa.

**Key takeaways:**
- REA obniża próg wejścia, nie wprowadza nowej technologii.
- Klony ArtCraft są w alfie i mają wyraźne braki.
- Sytuacja prawna clean room przy modelach językowych jest nierozstrzygnięta.
- Przewagą staje się to, czego trudno skopiować, czyli dane, integracje i zaufanie.

**Why do I care:** Z perspektywy frontendu najważniejszy wniosek jest taki, że sam interfejs nie jest już fosą. Ekrany da się odtworzyć w dniach, ale dostępność, wydajność przy realnym użyciu i lata kompatybilności już nie. W zespole z agentami warto zapisać, na co agent może patrzeć, a na co nie. Wniosek "AI to zrobiła" nie jest obroną prawną.

**Link:** [Is Software Really Dead? The Rise of AI-Powered Reverse Engineering](https://hackernoon.com/is-software-really-dead-the-rise-of-ai-powered-reverse-engineering)
