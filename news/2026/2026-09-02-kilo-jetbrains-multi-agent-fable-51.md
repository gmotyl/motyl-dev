---
title: "Kilo: JetBrains jako multi-agentowa sterownia i tańszy Claude Fable 5.1"
excerpt: "Kilo Code dla JetBrains dostaje Agent Managera z izolowanymi git worktree, a Claude Fable 5.1 trafia do Kilo z 75% tańszymi cache read i lepszymi wynikami na Terminal-Bench."
publishedAt: "2026-09-02"
slug: "kilo-jetbrains-multi-agent-fable-51"
hashtags:
  - "#kilo"
  - "#jetbrains"
  - "#aiagents"
  - "#gitworktree"
  - "#claude"
  - "#llm"
  - "#generated"
  - "#pl"
source_pattern: "Kilo"
---

## Kilo dla JetBrains zamienia IDE w sterownię wielu agentów

**TLDR:** Kilo Code dla JetBrains dostał Agent Managera, który uruchamia kilka agentów kodujących naraz, każdego w osobnym git worktree, z automatycznie dopasowanymi Run Configuration i podglądem statusu PR. Wszystko dzieje się w jednym oknie IDE, także przy pracy przez JetBrains Remote Development.

**Summary:** Kilo Code dla JetBrains był wcześniej przepisany jako natywna wtyczka Kotlin zbudowana pod split mode. Nowa wersja pokazuje, po co ta architektura powstała. Agent Manager pozwala odpalić kilka agentów na różnych zadaniach jednocześnie, a każdy z nich dostaje własny git worktree: osobną gałąź, osobny working directory i osobne niezacommitowane zmiany. Worktree można utworzyć od podstawowej gałęzi, wskazać istniejącą gałąź albo zaimportować bezpośrednio z URL-a pull requesta na GitHubie. Dotychczas równoległa praca na kilku checkoutach w JetBrains oznaczała otwieranie osobnych okien IDE, każde z własnym zestawem tool windows. Agent Manager trzyma to wszystko w jednej ramce, a każdy worktree zachowuje swoją historię sesji.

Osobna funkcja, Continue in Worktree, pozwala zacząć pracę agenta w bieżącym checkoucie, a gdy rozmowa przeradza się w większe zadanie, przenieść sesję razem z niezacommitowanymi zmianami do świeżego worktree bez ręcznej gimnastyki z gitem. Kilo pokazuje ten proces krok po kroku, od przechwycenia zmian, przez utworzenie worktree, po transfer plików i forkowanie sesji. Oryginalny checkout zostaje czysty, a agent kontynuuje w izolacji.

Drugi problem, który Kilo rozwiązuje, to uruchamianie i testowanie efektu pracy agenta. Worktree zwykle komplikuje to, bo Run Configuration w JetBrains wskazuje ścieżki w głównym checkoucie. Kilo bierze istniejące konfiguracje i dopasowuje working directory oraz ścieżki do wybranego worktree automatycznie, więc appkę można odpalić z dowolnego zadania bez przebudowywania konfiguracji ręcznie. Agent Manager pokazuje, który worktree ma aktywny proces, a Build i Rebuild są dostępne z tego samego miejsca. Do pełnego debugowania z breakpointami dowolny worktree można otworzyć w osobnej ramce IDE jednym kliknięciem.

Kilo dorzuca też widok statusu pull requesta: numer, tytuł, stan, diff względem gałęzi bazowej i osobno pokazane niezacommitowane zmiany lokalne. To samo działa w drugą stronę, można wkleić URL cudzego PR-a, stworzyć z niego worktree i poprosić agenta o review albo kontynuację. Największym testem tej architektury jest jednak JetBrains Remote Development, gdzie UI działa na laptopie, a indeksowanie i wykonanie kodu na zdalnym hoście. Kilo ma natywny interfejs Swing bez wbudowanego Chromium, a wtyczka jest podzielona na moduł frontend, backend i shared, więc tworzenie worktree i uruchamianie komend celuje w hosta również przez JetBrains Gateway. Silnik agentowy to Kilo CLI, ten sam runtime, który stoi za CLI, rozszerzeniem VS Code i chmurą Kilo, dzięki czemu konfiguracja z pliku kilo.jsonc, dostawcy modeli, custom agenci i MCP servery przenoszą się między środowiskami bez dodatkowej pracy.

**Key takeaways:**
- Każdy agent dostaje osobny git worktree, więc równoległe zadania nie nadpisują sobie zmian ani nie dzielą jednego checkoutu.
- Run Configuration są automatycznie przemapowywane na wybrany worktree, więc build i uruchomienie appki działają bez ręcznej konfiguracji dla każdego zadania.
- Ta sama architektura obsługuje JetBrains Remote Development i Gateway, bo agent server działa po stronie backendu, blisko repozytorium, a UI zostaje responsywne na kliencie.

**Why do I care:** Praca na kilku gałęziach naraz to codzienność, gdy jeden agent robi refaktor, drugi łata buga, a trzeci czeka na review, i do tej pory jedyną sensowną drogą było mnożenie okien IDE albo ręczne żonglowanie worktree z terminala. Automatyczne mapowanie Run Configuration na worktree rozwiązuje realny problem, bo bez tego każdy nowy branch do przetestowania oznaczał poprawianie ścieżek w konfiguracji uruchomieniowej, co w praktyce zniechęca do faktycznego odpalania i sprawdzania efektu pracy agenta zamiast czytania samego diffa. To, co przekonuje mnie bardziej niż sam Agent Manager, to decyzja o wspólnym runtime dla CLI, VS Code i JetBrains, bo oznacza brak efektu drugiej klasy dla żadnego z edytorów i jedną konfigurację do utrzymania zamiast trzech.

**Link:** [Kilo for JetBrains is now a multi-agent control room](https://blog.kilo.ai/p/kilo-for-jetbrains-a-multi-agent-control-room?publication_id=4363009&post_id=213677718&isFreemail=true&triedRedirect=true)

## Claude Fable 5.1 trafia do Kilo z tańszym cache i mniejszą liczbą fałszywych alarmów

**TLDR:** Claude Fable 5.1 jest już dostępny w Kilo, w JetBrains, VS Code i CLI. Model poprawia wyniki na Terminal-Bench i AutomationBench, obniża cenę cache read o 75% względem Fable 5 i rzadziej przerywa legalną pracę związaną z bezpieczeństwem.

**Summary:** Gdy Anthropic wypuścił Fable 5, Kilo opisał go jako model "imponująco mocny i autonomiczny, ale nietani". Fable 5.1 nie zmienia tej kategorii wagowej, tylko mocniej uzasadnia, kiedy sięgać po ten model. Zespół Anthropic obniżył cenę cache read i poprawił jakość myślenia na wyższych poziomach effort. Fable 5.1, podobnie jak poprzednik, zawsze ma włączone adaptive thinking. Wyniki benchmarków pokazują wzrost z 42% do 55,8% na Terminal-Bench 4.0 oraz z 17,1% do 31,4% na AutomationBench, choć wersje benchmarków różnią się od tych z premiery Fable 5, więc porównanie nie jest jeden do jednego.

Największa zmiana to cena. Pierwsze dwie stawki w cenniku zostały bez zmian, ale cache read spadł o 75% względem dolara za milion tokenów, który obowiązywał przy Fable 5. Dla agentów kodujących, które w kółko wracają do tego samego kontekstu, instrukcji, zawartości repozytorium i historii rozmowy, tańszy cache read realnie obniża rachunek. Anthropic szacuje około 25% niższy koszt dla typowych obciążeń i do około 45% oszczędności przy bardzo agentowych workloadach, choć wynik zależy od tego, ile kontekstu faktycznie trafia do cache'u. Zadanie generujące dużo outputu nie skorzysta na tym tak samo jak długa sesja z dużym reużyciem kontekstu.

Ten ruch cenowy wpisuje się w szerszy trend na rynku modeli. OpenAI obniżył cenę GPT-5.6 Terra o 20%, a Luna o 80% zaledwie trzy tygodnie po premierze, tłumacząc to przekazywaniem zysków z efektywności klientom. Terra przy 2 dolarach za milion tokenów wejściowych ląduje w tym samym przedziale co Sonnet 5 od Anthropic i Gemini 3.1 Pro od Google. xAI wypuścił Grok 4.5 z deklarowaną dwukrotnie lepszą efektywnością tokenową względem porównywalnych modeli, rozwiązując przeciętne zadanie SWE-Bench Pro przy około jednej czwartej liczby tokenów wyjściowych, których używa Opus 4.8 max na tym samym benchmarku. Anthropic dodatkowo zostawił wprowadzającą cenę Sonnet 5 na stałe, zamiast pozwolić jej wrócić do 3 i 15 dolarów za milion tokenów od 1 września, jak było pierwotnie zaplanowane.

Fable 5.1 może teraz szukać podatności w kodzie, a zaktualizowane zabezpieczenia cybersecurity generują mniej fałszywych alarmów, według Anthropic. To dotyczy zwykłej pracy deweloperskiej, nie tylko dedykowanych zespołów security, bo sprawdzanie granic zaufania czy nieprawidłowej obsługi danych wejściowych nie powinno automatycznie wyłączać modelu z defensywnego code review. Penetration testing, generowanie exploitów i skanowanie binariów nadal są przekierowywane do modeli Opus. Autor artykułu dorzuca anegdotę z własnej pracy: zlecił Fable 5.1 otwarte zadanie związane z aktualizacją statystyk na Kilo Leaderboard i po pięciu minutach dostał mnóstwo dobrze przemyślanych, ale kompletnie nietrafionych pomysłów. To potwierdza starą radę z premiery Fable 5, zakres zadania i kryteria weryfikacji trzeba określić wprost, niezależnie od tego, jak mocny jest model.

**Key takeaways:**
- Cache read dla Fable 5.1 kosztuje 75% mniej niż przy Fable 5, co realnie obniża koszt agentów pracujących na powtarzalnym kontekście repozytorium.
- Wyniki na Terminal-Bench 4.0 (z 42% do 55,8%) i AutomationBench (z 17,1% do 31,4%) pokazują poprawę w utrzymywaniu wieloetapowej pracy bez skrótów.
- Model rzadziej przerywa legalną pracę związaną z bezpieczeństwem, ale penetration testing i generowanie exploitów nadal trafiają do Opus.

**Why do I care:** Cena cache read, a nie cena samego tokena wejściowego, to w praktyce najważniejsza liczba dla każdego, kto trzyma agenta na dłuższej sesji z dużym repo w kontekście, bo tam koszt narasta z każdym kolejnym wywołaniem narzędzia, nie z każdym nowym promptem. Spadek o 75% robi z Fable 5.1 model, który da się trzymać włączony przez cały refaktor, a nie odpalać punktowo i wyłączać z obawy przed rachunkiem. Historia z Leaderboardem, gdzie model po pięciu minutach wrócił z dobrymi, ale niepotrzebnymi pomysłami, to dokładnie ten scenariusz, który widuje się przy każdym mocniejszym modelu bez jasno spisanego zakresu, i żaden wzrost na benchmarku tego nie zastąpi. Ciekawszy od samego modelu jest kierunek cenowy całej branży, bo jeśli Sonnet 5 zostaje na wprowadzającej cenie na stałe, a konkurenci tną ceny o dziesiątki procent tygodnie po premierze, to znaczy, że przewaga częściej idzie w stronę kosztu utrzymania sesji niż surowej inteligencji modelu.

**Link:** [Claude Fable 5.1 Is Live in Kilo](https://blog.kilo.ai/p/claude-fable-51-is-live-in-kilo?publication_id=4363009&post_id=213770724&isFreemail=true&triedRedirect=true)
