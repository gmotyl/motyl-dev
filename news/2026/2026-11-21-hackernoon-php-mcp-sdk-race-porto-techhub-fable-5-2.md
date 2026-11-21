---
title: "HackerNoon: wyścig w SDK MCP dla PHP, konferencja Porto TechHub i Claude Fable 5.2 w praktyce"
excerpt: "Trzy teksty: race condition w mcp/sdk 0.8.1 psujący równoległe wywołania narzędzi, relacja z Porto TechHub z Git 3 i frameworkami agentowymi dla Javy oraz opinia o kosztach trybów Fable 5.2."
publishedAt: "2026-11-20"
slug: "hackernoon-php-mcp-sdk-race-porto-techhub-fable-5-2"
hashtags: "#hackernoon #php #ai #agents #git #java #llm #generated #pl"
source_pattern: "HackerNoon"
---

## Race condition w SDK MCP dla PHP

**TLDR:** W mcp/sdk 0.8.1 równoległe wywołania narzędzi w jednej sesji potrafiły zwracać cudze odpowiedzi albo puste 202. Poprawka w 0.9.0 wyjęła odpowiedzi z sesji, a w 0.10.0 tryb bez sesji stał się domyślny.

**Summary:** Autor uruchomił serwer MCP na FrankenPHP i zauważył, że agent wysyłający sześć wywołań naraz dostawał część wyników pomieszanych. W trzydziestu rundach po sześć wywołań wyszło 137 poprawnych odpowiedzi, 21 cudzych i 22 puste pod FrankenPHP, a pod php-fpm 150, 17 i 13. W logach nic nie było, a te same wywołania pojedynczo nigdy nie zawodziły.

Przyczyna to utrata aktualizacji w sesji Streamable HTTP. SDK 0.8.1 odkładało odpowiedź na bieżące żądanie do kolejki zapisanej w sesji, a potem transport odczytywał tę kolejkę i opróżniał ją. Dwa procesy robocze wczytują sesję z pustą kolejką, każdy dopisuje swoją odpowiedź i zapisuje całość, więc drugi zapis kasuje pierwszy. Potem pierwszy transport pobiera cudzą odpowiedź, a drugi dostaje pustą kolejkę i odpowiada 202 bez treści. Dochodzi jeszcze wspólny plik tymczasowy przy zapisie sesji, przez który część żądań kończyła się błędem parsowania JSON.

Poprawkę wprowadziły trzy pull requesty w 0.9.0: odpowiedzi nie przechodzą już przez sesję, zapis sesji obejmuje tylko zmienione klucze, a opcjonalna blokada na sesję serializuje żądania. Blokada działa poprawnie, ale wolniej, bo sto rund trwało 8,9 sekundy zamiast 0,7. Wersja 0.10.0 domyślnie nie używa sesji, a specyfikacja MCP z 28 lipca 2026 usunęła sesje na poziomie protokołu. Autor pokazuje własny serwer narzędziowy bez sesji, który w tym samym teście dał 1000 poprawnych odpowiedzi na 1000.

**Key takeaways:**
- Serwer tylko z narzędziami nie potrzebuje sesji i nie powinien jej trzymać.
- Sesja jest potrzebna przy elicytacji, samplingu, subskrypcjach i wznawianiu strumieni, a wtedy włącz blokadę.
- Test równoległych wywołań na kilku procesach roboczych wychwytuje błąd, którego logi nie pokażą.

**Why do I care:** To dobra lekcja o stanie współdzielonym, niezależnie od PHP. Każdy, kto trzyma kolejkę wiadomości w sesji, którą może dotykać kilka żądań naraz, ma ten sam błąd. Autor słusznie zaleca test z dziesięcioma równoległymi wywołaniami. Pominął za to, jak wielu klientów w ogóle obsługuje nową, bezsesyjną specyfikację.

**Link:** [How a Race Condition in the PHP MCP SDK Broke Parallel Tool Calls](https://hackernoon.com/how-a-race-condition-in-the-php-mcp-sdk-broke-parallel-tool-calls)

## Porto TechHub 2026: AI, Java i Git

**TLDR:** Relacja z czterech wystąpień: Embabel, pętle agentowe, porównanie Spring AI, LangChain4j i Embabel oraz Git 3. Autor nie widzi w Embabel przewagi nad silnikami BPMN.

**Summary:** Embabel to framework agentowy dla JVM, który łączy planowanie oparte na celach z zwykłymi konstrukcjami programistycznymi. Kolejność kroków wynika z typów, więc metoda zwracająca typ X poprzedza metodę przyjmującą X. Autor lubi Springa i silne typowanie, ale nie widzi tu wartości, bo na JVM jest mnóstwo silników przepływów pracy, w tym Camunda zgodna z BPMN, i wystarczy zadanie wołające model językowy.

Wystąpienie o pętlach agentowych było według autora głównie pokazem tego, co prelegent zbudował z asystentami, bez niczego do zastosowania. Najlepiej oceniono porównanie trzech frameworków na przykładzie planera żywienia, prowadzone przez osoby z konkurencyjnych firm. Tabela pokazuje na przykład, że LangChain4j nie ma serwera HTTP dla MCP, a Spring AI w części agentowej jest eksperymentalny.

Wystąpienie o Git 3 opisuje cztery nowe domyślne ustawienia: SHA-256 zamiast SHA-1, reftable zamiast luźnych plików referencji, main jako pierwsza gałąź i bezpieczne domyślnie repozytoria bare. Repozytoria utworzone w Git 2 dalej działają, a migrować można krok po kroku. Największą przeszkodą jest według prelegenta brak wsparcia po stronie dostawców hostingu.

**Key takeaways:**
- Git 3 zmienia cztery domyślne ustawienia, ale stare repozytoria działają bez zmian.
- Spring AI, LangChain4j i Embabel różnią się dojrzałością, obsługą MCP i testowaniem.
- Embabel konkuruje z istniejącymi silnikami przepływów pracy, takimi jak Camunda.

**Why do I care:** Dla frontendowca najbardziej praktyczny jest Git 3, bo SHA-256 i reftable dotkną narzędzi, które parsują repozytoria, czyli CI, hooki i skrypty. Reszta to ekosystem Javy, ważny głównie dla backendu. Szkoda, że relacja nie mówi, kiedy Git 3 faktycznie wyjdzie.

**Link:** [Porto TechHub 2026: Key Takeaways From AI, Java, and Git Talks](https://hackernoon.com/porto-techhub-2026-key-takeaways-from-ai-java-and-git-talks)

## Claude Fable 5.2: dlaczego najdroższy model bywa najtańszy

**TLDR:** Autor przekonuje, że Fable 5.2 to system innej klasy, a koszt należy liczyć za wynik, nie za token. Tryb Max potrafi wypaść gorzej niż Medium i kosztować kilka razy więcej.

**Summary:** Fable 5.2 według autora trzyma długi cykl pracy, sam się sprawdza i uruchamia równoległe sesje. Powołuje się na przewodnik Anthropic, według którego na najwyższych poziomach wysiłku model używa podagentów do przeglądu własnej pracy, czego Fable 5.1 nie robił. Fable wywodzi się z rodziny Mythos, dostępnej tylko dla zatwierdzonych organizacji, którą zbudowano pod bezpieczeństwo i szukanie podatności. W lecie był blokowany przez rząd USA, a potem wrócił z ograniczeniami.

Główna teza dotyczy trybów. Ten sam model w niższym trybie może męczyć się trzy godziny i rozwiązać 30 procent zadania, a w innym zrobić wszystko w dziesięć minut. Tryb Max ma kosztować około trzech i pół razy więcej niż Medium, a według Anthropic większość zysku jest już na poziomie High. Wyższe poziomy bywają nierówne i chętniej delegują do podagentów. Cennik to 8 dolarów za milion tokenów wejściowych i 40 za wyjściowe, czyli o 20 procent mniej niż Fable 5.1 i dwa razy więcej niż Opus 5.5.

Praktyczne rady autora: przełączaj tryby, używaj Fable tam, gdzie potrzebny jest najlepiej zweryfikowany wynik, porównuj wyniki zamiast tokenów i nie ufaj porównaniom, także jego własnym. Dla rutynowej pracy wskazuje Opus 5.5. Tekst jest też mocno osobisty, z anegdotami i testem samooceny od 0 do 100.

**Key takeaways:**
- Koszt mierz za ukończone zadanie, a nie za token.
- Tryb Max nie zawsze daje lepszy wynik niż Medium.
- Do dużych ilości rutynowej automatyzacji autor poleca Opus 5.5, a nie Fable.

**Why do I care:** Zgadzam się z jednym: porównywanie modeli po tokenach i rankingach jest zawodne, bo zależy od zadania i trybu. Reszta to opinie prezentera podcastu poparte kilkoma historiami, bez żadnego powtarzalnego pomiaru, więc traktowałbym liczby jak anegdoty. Ciekawsza praktycznie jest rada, żeby zacząć od High i dopiero potem podnosić wysiłek.

**Link:** [Claude Fable 5.2: Why Anthropic's Most Expensive Model Can End Up the Cheapest](https://hackernoon.com/claude-fable-52-why-anthropics-most-expensive-model-can-end-up-the-cheapest)
