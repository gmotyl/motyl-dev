---
title: "Kilo nauczył się testować siebie — i to zmienia wszystko w pętli agenta"
excerpt: "Kilo AI opisuje, jak dali swojemu agentowi zdolność do uruchamiania i testowania własnego rozszerzenia VS Code oraz CLI end-to-end, zamykając pętlę między generowaniem kodu a jego weryfikacją."
publishedAt: "2026-07-21"
slug: "kilo-self-testing-agent-vs-code-extension"
hashtags: "#kilo #ai #llm #agents #testing #developer-tools #vs-code #computer-use #generated #pl"
source_pattern: "Kilo"
---

## Inside Kilo Speed: We Taught Kilo to Test Itself

**TLDR:** Kilo AI dał swojemu agentowi możliwość uruchamiania i testowania własnego rozszerzenia VS Code oraz CLI end-to-end. Agent może teraz nie tylko pisać kod, ale też go uruchomić, zobaczyć wynik i ocenić, czy rzeczywiście działa. To nie jest zwykłe automatyczne testowanie — to zamknięcie pętli między intencją a działającym rezultatem.

**Summary:**

Większość rozmów o AI i kodowaniu zatrzymuje się na generowaniu kodu. Agent czyta zgłoszenie, pisze diff, otwiera PR i na tym koniec. Kilo pokazuje, że ciekawa granica zaczyna się dopiero po tym kroku — gdy agent może uruchomić to, co właśnie zbudował, spojrzeć na rezultat i ocenić, czy faktycznie zadziałało. To nie jest małe przesunięcie, to fundamentalna zmiana w tym, czym jest agent kodzący.

Dla aplikacji webowych problem był już w dużej mierze rozwiązany: wystarczy podłączyć Playwright, nauczyć agenta logowania i może klikać przez prawdziwe przepływy użytkownika, robić screenshoty, potwierdzać działanie. Rozszerzenie VS Code to jednak zupełnie inna liga — zagnieżdżone iframes w iframes, UI który nie zachowuje się jak normalna strona, CLI sterowane przez terminal. Historycznie modele miały z tym duży problem. Zmiana przyszła z poprawą możliwości computer-use w nowszych modelach — agent jest teraz w stanie w miarę niezawodnie sterować rozszerzeniem jak prawdziwy użytkownik.

Najbardziej interesujący — i nieoczekiwany — element to benchmarkowanie. Agent może uruchomić własne profilowanie, zebrać baseline, wprowadzić zmianę i zmierzyć ponownie. To otwiera pętlę optymalizacji, której wcześniej po prostu nie było: "zoptymalizuj tę funkcję, powtarzaj aż będzie poniżej 50 milisekund." Jeden z inżynierów spędził dwa tygodnie, wskazując agentowi problemy wydajnościowe i pozwalając mu samodzielnie je redukować. To nie jest workflow, który istniał rok temu — i powiem wprost, że to brzmi jak zmiana, która realnie przesuwa wartość człowieka w procesie.

Autorzy artykułu słusznie rozróżniają self-testing od tradycyjnych testów automatycznych. Tradycyjny test suite koduje to, co człowiek zdecydował sprawdzić, raz, w przeszłości. Self-testing pozwala agentowi zdecydować, co sprawdzić teraz, dla tej konkretnej zmiany, i faktycznie to zweryfikować na żywo. Reviewer zamiast ręcznie klikać przez cztery PR-y od społeczności czyta kod, wskazuje interesujące przypadki brzegowe i zleca agentowi weryfikację. Człowiek zostaje dla sądu; agent obsługuje mechaniczną weryfikację. To ładny podział, choć zobaczymy, jak długo "sąd" pozostaje po ludzkiej stronie.

**Key takeaways:**
- Agent który widzi własny output produkuje dramatycznie wyższą jakość niż agent działający w ciemno i mający nadzieję, że diff był poprawny
- Zdolności computer-use w modelach poprawiły się na tyle, że nawet trudne cele jak rozszerzenia VS Code są teraz obsługiwane w miarę niezawodnie
- Pętla optymalizacji wydajnościowej (baseline → zmiana → benchmarkowanie → powtórz) stała się realnym workflow dzięki self-testing
- Różnica między self-testing a tradycyjnym test suite: agent decyduje co testować teraz, dla tej zmiany, zamiast wykonywać zakodowane przez człowieka sprawdzenia z przeszłości
- Długoterminowy kierunek: rola człowieka przesuwa się z pisania i weryfikacji do decydowania, co warto budować i jak wygląda "dobry wynik"

**Why do I care:** Z perspektywy architekta frontendowego ten artykuł dotyka czegoś, co od dawna mnie uwiera: większość narzędzi AI dla developerów żyje w bańce generowania, bez sprzężenia zwrotnego z rzeczywistością. Kilo zamknęło tę pętlę — i to dla najtrudniejszego przypadku, jakim jest rozszerzenie IDE. Jeśli computer-use będzie dalej poprawiać się w obecnym tempie, każde poważne narzędzie deweloperskie będzie musiało przemyśleć, gdzie kończy się rola agenta, a gdzie zaczyna się rola człowieka. Benchmark-driven optimization przez agenta brzmi jak coś, co powinno być domyślne w każdym projekcie za dwa lata. Pytanie, czy firmy zdążą zmienić procesy, zanim technologia im ucieknie.

**Link:** [Inside Kilo Speed: We Taught Kilo to Test Itself](https://blog.kilo.ai/p/inside-kilo-speed-we-taught-kilo?publication_id=4363009&post_id=207846072&isFreemail=true&triedRedirect=true)
