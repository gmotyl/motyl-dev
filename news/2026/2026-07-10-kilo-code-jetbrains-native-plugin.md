---
title: "Kilo Code trafia natywnie do JetBrains IDE"
excerpt: "Kilo Code przebudował swój plugin do JetBrains od podstaw w Kotlinie, rezygnując z webview na rzecz prawdziwie natywnego doświadczenia."
publishedAt: "2026-07-10"
slug: "kilo-code-jetbrains-native-plugin"
hashtags: "#kilo #jetbrains #ai #ide #kotlin #agentic #developer-tools #generated #pl"
source_pattern: "Kilo"
---

## Kilo Code trafia natywnie do JetBrains IDE

**TLDR:** Kilo Code przepisał swój plugin do JetBrains IDE od zera w Kotlinie i Swing UI, zastępując stare rozwiązanie oparte na webview. Nowy plugin jest już dostępny w JetBrains Marketplace i działa natywnie we wszystkich IDE na platformie IntelliJ.

**Summary:** Sprawa wygląda tak: mieć plugin do JetBrains to jedno, ale zrobić go porządnie to już zupełnie inna historia. Kilo Code przyznaje się wprost — ich stary plugin do JetBrains był w zasadzie rozszerzeniem do VS Code opakowanym w webview i wciśniętym do panelu IntelliJ. Działało, ale każdy, kto korzystał z JetBrains na co dzień, czuł ten zgrzyt. Scrollowanie zachowywało się inaczej, nawigacja po plikach nie pasowała do reszty IDE, a ogólne odczucia dalekie były od spójności, którą JetBrains zapewnia w każdym innym miejscu.

Ponad 50 pull requestów i dwa miesiące pracy później mamy zupełnie nowy plugin napisany w Kotlinie, oparty na Swing UI — czyli dokładnie tej samej warstwie, na której JetBrains buduje własne komponenty interfejsu. I to robi różnicę. Scrollowanie działa jak scrollowanie IntelliJ, widoki wywołań narzędzi wyglądają spójnie z resztą IDE, a integracja z własnym indeksem plików IntelliJ oznacza, że podpowiedzi przy wzmiankach o plikach są szybkie nawet w ogromnych projektach.

Funkcjonalnie nowy plugin dostaje to, co było w webview: sesje czatu z historią rozmów, komendy slash, obsługę zdalnego developmentu JetBrains, wsparcie dla ponad 500 modeli AI, zarządzanie serwerami MCP, drag-and-drop plików i obrazków, wyświetlanie balansu konta. To co wyróżnia Kilo na tle JetBrains AI Assistant czy GitHub Copilot to otwartość — kod jest open source, można audytować co jest wysyłane i gdzie, a wybór modelu jest w rękach użytkownika. Claude do głębszego rozumowania, GPT do szybkiej iteracji, lokalny model gdy kod nie powinien opuścić maszyny.

Kilo działa też jako prawdziwy agent kodujący wewnątrz IDE — może przeglądać projekt, proponować podejście, edytować pliki, uruchamiać polecenia i przepracowywać błędy bez przerywania pracy. Część zaawansowanych integracji z wersji VS Code jeszcze nie trafiła do JetBrains, ale zespół wprost to przyznaje i zapowiada kolejne aktualizacje. Dobra wiadomość: teraz gdy plugin jest zbudowany bezpośrednio na platformie IntelliJ, domknięcie tych luk nie wymaga walki ze starym webview.

**Key takeaways:**
- Stary plugin do JetBrains był webview z VS Code — nowy jest przepisany od zera w Kotlinie na platformie IntelliJ
- Plugin jest już dostępny w JetBrains Marketplace dla wszystkich IDE na bazie IntelliJ (WebStorm, PyCharm, GoLand itd.)
- Kilo wyróżnia się otwartym kodem i swobodą wyboru modelu AI, w tym możliwością uruchamiania lokalnych modeli
- Agentic workflows działają natywnie w JetBrains — Kilo może samodzielnie edytować pliki i uruchamiać komendy w kontekście całego projektu
- Część zaawansowanych funkcji z VS Code jeszcze nie jest dostępna, ale roadmap jest jasna

**Why do I care:** Jeśli pracujesz w WebStormie lub IntelliJ i dotąd omijałeś Kilo bo plugin wyglądał jak sklecony na szybko wrapper — to jest właściwy moment żeby spojrzeć jeszcze raz. Przepisanie na natywny Kotlin to nie jest kosmetyka. Dla mnie kluczowy jest argument z open source i kontrolą nad modelem: w środowiskach korporacyjnych możliwość wskazania lokalnego modelu albo przynajmniej audytowania co dokładnie wychodzi z IDE to nie luksus, to wymóg. Kilo daje to czego ani Copilot ani JetBrains AI Assistant nie dają — pełną transparentność i wybór.

**Link:** [Kilo Code Goes Native on JetBrains](https://blog.kilo.ai/p/kilo-code-goes-native-on-jetbrains?publication_id=4363009&post_id=206310383&isFreemail=true&triedRedirect=true)
