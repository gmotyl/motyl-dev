---
title: "Dlaczego większość alertów o podatnościach w zależnościach to szum"
excerpt: "Ponad 90% ostrzeżeń z Dependabota dotyczy kodu, który nigdy nie zostanie wykonany w twojej aplikacji - narzędzia oparte na analizie osiągalności kodu mogą dramatycznie ograniczyć czas spędzany na fikcyjnym triażu."
publishedAt: "2026-06-24"
slug: "dlaczego-wiekszosc-alertow-dependabot-to-szum"
hashtags: "#kilo #security #dependabot #sca #soc2 #generated #pl"
source_pattern: "Kilo"
---

## Dlaczego większość alertów o podatnościach w zależnościach to szum

**TLDR:** Raport Endor Labs z 2024 roku pokazuje, że mniej niż 9,5% wykrytych podatności w zależnościach jest w ogóle osiągalnych - oznacza to, że ponad 90% alertów generowanych przez narzędzia SCA to fałszywe alarmy. Badania Coana mówią nawet o 95% false positives. Rozwiązaniem jest analiza osiągalności: sprawdzenie, czy twój kod faktycznie wywołuje podatną funkcję, a nie tylko czy dany pakiet pojawia się w lockfile.

Jeden z inżynierów spędził czterdzieści pięć minut na sprawdzaniu krytycznego alertu Dependabota dotyczącego podatności na command injection w lodash. Prześledził ścieżki wywołań, przeczytał advisory, zweryfikował importy. Funkcja była nieosiągalna. Czterdzieści pięć minut zmarnowane na jeden z setek alertów. Brzmi znajomo? Bo to standardowy los każdego zespołu, który włączył Dependabota i "bierze bezpieczeństwo poważnie".

Problem jest strukturalny. GitHub potrafi ci powiedzieć, że CVE-2024-XXXXX istnieje w wersji 4.17.20 lodash. Czego nie powie, to czy twój kod w ogóle dotyka podatnej funkcji. Alert jest technicznie poprawny jako informacja o metadanych pakietu, ale bezużyteczny z perspektywy priorytetyzacji. Mamy do czynienia z alert fatigue - gdy programiści uczą się, że większość alertów jest nieistotna, przestają traktować którekolwiek z nich poważnie. W ten sposób realne problemy gubią się w szumie.

Koncepcja analizy osiągalności jest prosta: zanim oznaczysz podatność jako wymagającą działania, sprawdź, czy twój kod ma ścieżkę wywołań do konkretnej funkcji, która jest podatna. Nie tylko czy pakiet jest w lockfile, ale czy twoja aplikacja może w ogóle dotrzeć do problematycznego kodu. Narzędzia takie jak Snyk czy Endor Labs mają to wbudowane, ale zazwyczaj oznacza to migrację do całej ich platformy i opłaty enterprise za coś, co w istocie jest filtrem na dane, które GitHub już ci dostarcza za darmo.

Kilo opisuje swoje własne doświadczenie z budowaniem narzędzia Security Agent podczas procesu certyfikacji SOC2. Narzędzie synchronizuje alerty Dependabota z podłączonych repozytoriów, a następnie używa analizy statycznej opartej na AI do określenia, czy każda podatność jest exploitowalna w konkretnym kodzie. Proces składa się z czterech kroków dla każdego znaleziska: identyfikacja podatnego pakietu w lockfile, odczytanie szczegółów CVE, przeskanowanie codebase pod kątem importów i ścieżek wywołań, a na końcu konkluzja o osiągalności. Co ważne, każdy z tych kroków jest widoczny dla użytkownika - nie ma magicznej czarnej skrzynki. Dla znalezisk osiągalnych narzędzie może otworzyć PR z poprawką wersji i aktualizacją testów.

Wyniki z własnych repozytoriów Kilo potwierdzają dane branżowe: zdecydowana większość alertów Dependabota okazała się nieosiągalna. Warto zwrócić uwagę na jedno obserwowane zjawisko - transparentność rozumowania zmienia zachowanie. Gdy narzędzie pokazuje czterokrokowy łańcuch myślenia zamiast tylko powiedzieć "odrzucono - nieosiągalne", weryfikacja zajmuje sekundy zamiast dziesiątek minut. Obecne ograniczenia są uczciwie opisane: Security Agent działa tylko z Dependabotem (nie Snyk, nie Renovate), wymaga kredytów Kilo Cloud do analizy AI i nie zastępuje przeglądu bezpieczeństwa kodu własnego.

**Key takeaways:**
- Ponad 90% alertów z narzędzi SCA dotyczy nieosiągalnego kodu - analiza osiągalności ścieżek wywołań redukuje ten szum do minimum
- Alert fatigue jest realnym ryzykiem: ignorowane ostrzeżenia sprawią, że realne podatności utopią się w morzu fałszywych alarmów
- Przy procesach compliance (SOC2, audyty klientów) potrzebne jest nie tylko włączenie Dependabota, ale dowód na terminowy triage i remediację z audytowalnym uzasadnieniem
- Transparentność rozumowania narzędzia AI jest kluczowa dla zaufania - widoczna czterokrokowa analiza buduje więcej zaufania niż automat bez wyjaśnień
- Auto-remediacja wymaga konfigurowalnych progów: warto automatyzować niskie/średnie ryzyko z wysoką pewnością, a krytyczne zostawiać do ręcznego przeglądu

**Why do I care:** Sam problem jest realny i niedoceniany. Każdy team, który włączył Dependabota i nie wdrożył procesu triażu, ma rosnący stos alertów, który staje się zarówno technicznym, jak i regulacyjnym długiem. Analiza osiągalności to właściwy kierunek - zamiast sprawdzać "czy pakiet ma CVE", pytamy "czy nasz kod może wywołać podatną funkcję". To fundamentalna zmiana perspektywy. Co do samego narzędzia Kilo Security Agent, to oczywiście artykuł jest pisany przez twórców produktu, więc należy go czytać z odpowiednim dystansem. Niemniej opisywana funkcjonalność analizy osiągalności z transparentnym rozumowaniem to coś, co każdy poważny projekt powinien mieć - czy to przez Kilo, Snyk, Endor Labs, czy własne narzędzia.

**Link:** [Why Most Dependency Alerts Don't Matter](https://blog.kilo.ai/p/why-most-dependency-alerts-dont-matter?publication_id=4363009&post_id=202742018&isFreemail=true&triedRedirect=true)
