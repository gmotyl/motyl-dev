---
title: "Śmiertelna trójca agentów AI: jak rozbić ją architekturą, a nie promptem"
excerpt: "Alex Ewerlöf tłumaczy, kiedy prompt injection staje się katastrofą i jak podział na dwa agenty z punktem kontrolnym obniża ryzyko."
publishedAt: "2026-10-26"
slug: "alexewerlof-lethal-trifecta-agenci-prompt-injection-architektura"
hashtags: "#AlexEwerlöf #agents #security #architecture #ai #generated #pl"
source_pattern: "AlexEwerlöf"
---

## Lethal Trifecta, czyli trzy warunki, przy których agent da się wykorzystać

**TLDR:** Simon Willison opisał trzy zdolności agenta, które razem prowadzą do wycieku danych: czytanie niezaufanych treści, dostęp do prywatnych danych i droga wyprowadzenia ich na zewnątrz. Ewerlöf pokazuje, jak ocenić własnych agentów i jak rozbić tę trójkę na poziomie architektury.

**Summary:** W klasycznym oprogramowaniu granica między danymi a instrukcjami jest wyraźna, a jej złamanie daje przepełnienie bufora, SQL injection albo XSS. Modele językowe mieszają jedno z drugim. Prompt systemowy, wiadomość użytkownika, odpowiedzi asystenta i wyniki narzędzi trafiają do tego samego kontekstu, oddzielone tylko znacznikami. Dlatego model czytający e-mail nie odróżni polecenia, które napisałeś ty, od ukrytej komendy, którą wstawił atakujący.

Sama prompt injection staje się katastrofą dopiero w połączeniu trzech elementów. Wektor to niezaufane dane wejściowe, jak e-mail, strona internetowa albo zgłoszenie na GitHubie. Ładunek to dostęp do prywatnych informacji, od bazy klientów po zmienne środowiskowe. Wyjście to dowolny kanał, którym dane mogą wypłynąć, a to nie tylko wysyłka maila, ale też zapis do publicznego repozytorium, wiadomość na Slacku czy zwykłe żądanie HTTP GET. Autor przypomina fire triangle: usuń jeden element, a ogień się nie utrzyma. Podstępne jest to, że każdy element z osobna jest niewinny i potrzebny agentowi do pracy.

Mitygacje są architektoniczne, bo promptu nie da się załatać. Najskuteczniejsza jest kompartmentalizacja. Jeden agent czyta niezaufany mail i wyciąga z niego intencję, ale nie ma możliwości wysyłania. Wynik oddaje jako ściśle zdefiniowany obiekt JSON, który można zwalidować. Drugi agent dostaje tylko ten obiekt, nie surowy tekst, i to on ma dostęp do bazy i narzędzia wysyłki. Do tego zasada minimalnych uprawnień, czyli tymczasowe role na czas zadania, tak aby próba wywołania nieautoryzowanego narzędzia została zablokowana przez środowisko wykonawcze. Najlepiej, żeby deklaracji takiego narzędzia agent w ogóle nie widział.

Autor uczciwie wymienia ograniczenia. Dwa agenty zwiększają złożoność, a cały schemat zakłada, że pierwszy agent ignoruje wstrzyknięcie, zamiast je przekazać dalej. Zaawansowany agent potrafi też obejść ograniczenia, o czym ma świadczyć incydent OpenAI i Hugging Face, w którym agenty w teoretycznie odciętym środowisku używały Artifactory jako tablicy ogłoszeń. Usunięcie wyjścia chroni przed wyciekiem, ale nie przed szkodą wewnątrz, na przykład usunięciem tabel.

**Key takeaways:**
- Prompt injection plus prywatne dane plus kanał wyjścia to komplet potrzebny do wycieku.
- Mitygować trzeba w architekturze, a nie w prompcie systemowym.
- Dwa agenty z walidowanym punktem kontrolnym i minimalne uprawnienia to najprostszy wzorzec.
- Dobrze zaprojektowany system zakłada, że agent zostanie oszukany, i ogranicza promień rażenia.

**Why do I care:** Brakuje tu tego, co w praktyce boli najbardziej: czatbot z dostępem do danych klienta jest z natury pełną trójką, a produkt wymaga, żeby taki był. Jako architekt rysowałbym dla każdego agenta diagram przepływu danych tak samo, jak rysuje się strefy sieciowe w chmurze, i pytał, czy jeden kontekst może zawierać jednocześnie dane zewnętrzne i prywatne. Jeśli tak, ten agent jest podatny, niezależnie od tego, jak sprytny jest prompt.

**Link:** [The Lethal Trifecta](https://blog.alexewerlof.com/p/lethal-trifecta)
