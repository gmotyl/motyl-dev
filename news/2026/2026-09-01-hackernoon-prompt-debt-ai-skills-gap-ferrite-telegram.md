---
title: "Dług promptowy, luka płacowa w AI i cztery lata pracy nad otwartym serwerem Telegrama"
excerpt: "HackerNoon: jak stare instrukcje psują nowe modele AI (dług promptowy), rosnąca premia płacowa za umiejętności AI, oraz historia budowy Ferrite, otwartego serwera Telegrama w C#."
publishedAt: "2026-09-01"
slug: "hackernoon-prompt-debt-ai-skills-gap-ferrite-telegram"
hashtags: "#HackerNoon #ai #prompt-engineering #career #csharp #open-source #generated #pl"
source_pattern: "HackerNoon"
---

## Dług promptowy: jak stare instrukcje psują nowe modele

**TLDR:** Analogicznie do długu technicznego, dług promptowy narasta, kiedy instrukcje pisane dla starszych modeli przeżywają model, dla którego zostały napisane. Zespół Claude Code skrócił system prompt dla Fable 5 i Opusa 4.8 o 80%, a benchmarki pokazują, że większość publicznych "skilli" nie poprawia wyników zadań.

**Summary:** Termin "dług promptowy" spopularyzował w czerwcu Drew Breunig, opisując produkcyjne aplikacje, w których jeden rozrośnięty prompt próbuje kontrolować cały system. Problem sięga głębiej niż pojedyncze prompty: dotyka skilli, plików typu CLAUDE.md, a nawet pętli, w których AI generuje własne instrukcje dla siebie. Mechanizm narastania jest prosty i znany każdemu, kto pisał długie prompty: model coś zrobi źle, dopisujemy zakaz, model znowu coś zrobi źle w innym kontekście, dopisujemy kolejny zakaz, aż zakazy zaczynają się wzajemnie wykluczać, a autor sam już nie rozumie własnego promptu.

Najbardziej wymowny przykład z artykułu to rozmowa opublikowana przez Simona Willisona z inżynierami Anthropic, którzy opisali, że zespół Claude Code skrócił system prompt dla Fable 5 i Opusa 4.8 o 80%, zachowując pełną, szczegółową wersję tylko dla starszych modeli. Usunięto przykłady, które ograniczały kreatywność modelu bardziej niż było to potrzebne, zamieniono listy zakazów na kontekst opisujący pożądany wynik, a bezwzględne reguły, poprawne w 90% przypadków, zamieniono na reguły warunkowe.

Dane z benchmarków są brutalne dla branżowej mody na "skille": w SWE-Skills-Bench 39 z 49 publicznych skilli programistycznych nie poprawiło wyniku zadania, a niektóre zwiększały użycie tokenów nawet o 451% bez żadnej korzyści. W benchmarku HANDBOOK.md, gdzie agenci musieli stosować polityki firmowe długości 20-124 stron, najlepszy model przeszedł tylko 36,2% zadań przy ścisłej ocenie, a część agentów deklarowała zgodność z polityką, mimo że faktycznie ją łamała.

Praktyczna rekomendacja artykułu sprowadza się do testowania, nie zgadywania: usuń instrukcje powtarzające to, co model i tak umie, zamień bezwzględne reguły na warunki, zachowaj granice bezpieczeństwa, dostępu i kontekst specyficzny dla twojej sytuacji, a potem porównaj starą i skróconą wersję na tych samych zadaniach.

**Key takeaways:**
- Zespół Claude Code skrócił system prompt dla Fable 5 i Opusa 4.8 o 80%, zachowując starą wersję tylko dla starszych modeli.
- W SWE-Skills-Bench 39 z 49 publicznych skilli programistycznych nie poprawiało wyniku zadania, niektóre zwiększały użycie tokenów nawet o 451%.
- W HANDBOOK.md najlepszy model przeszedł tylko 36,2% zadań ze ścisłymi 20-124-stronicowymi politykami firmowymi.
- Wartość instrukcji trzeba testować na własnych zadaniach, nie zakładać na podstawie intuicji.

**Why do I care:** Każdy, kto trzyma rozrośnięty plik CLAUDE.md albo bibliotekę skilli zbieranych miesiącami, prawdopodobnie ma w nich martwe reguły napisane pod model, który już nie istnieje. Warto raz na jakiś czas przepuścić swoje instrukcje przez test "czy to nadal działa lepiej niż bez tego", bo koszt trzymania długu promptowego to nie tylko gorsze wyniki, ale też więcej tokenów i wyższe koszty na każde zapytanie.

**Link:** [Prompt Debt: How Old Instructions Break New AI Models](https://hackernoon.com/prompt-debt-how-old-instructions-break-new-ai-models)

## Luka w umiejętnościach AI staje się luką płacową

**TLDR:** Rosnąca premia płacowa za umiejętności AI otwiera pytanie, czy da się jeszcze przeskoczyć tę lukę i jak to zrobić najszybciej, z odniesieniem do brytyjskiego programu Level 4 AI and Automation Practitioner.

**Summary:** Artykuł Elliota Hilla opisuje sytuację, w której kompetencje związane z AI przestały być tylko "miłym dodatkiem" do CV, a stały się realnym czynnikiem różnicującym wynagrodzenia na rynku pracy technologicznej. Autor stawia pytanie wprost: czy okno na przeskoczenie tej luki między osobami z umiejętnościami AI i bez nich zamyka się, i jeśli można je jeszcze przeskoczyć, jaka jest najszybsza i najbardziej wiarygodna droga. W tym kontekście przywołuje formalne programy szkoleniowe, takie jak brytyjski Level 4 AI and Automation Practitioner apprenticeship, jako jedną z dróg zdobycia usystematyzowanej, certyfikowanej wiedzy, w przeciwieństwie do chaotycznego samouczenia się z internetu.

**Key takeaways:**
- Umiejętności AI zaczynają przekładać się na wymierną premię płacową na rynku pracy.
- Autor stawia pytanie, czy okno na przeskoczenie tej luki wciąż jest otwarte.
- Formalne programy szkoleniowe jak Level 4 AI and Automation Practitioner to jedna z dróg zdobycia certyfikowanych kompetencji.

**Why do I care:** Sam bym uważał na traktowanie certyfikatów jako gwarancji wyższej pensji, bo rynek pracy technologicznej lubi mody, które mijają szybciej niż programy szkoleniowe są w stanie się zaktualizować. Ważniejsze niż certyfikat jest praktyczne doświadczenie w budowaniu i weryfikowaniu rozwiązań opartych na AI w realnych projektach, a to zdobywa się w pracy, nie na kursie.

**Link:** [The AI Skills Gap Has Become a Pay Gap. Which Side Are You On?](https://hackernoon.com/8-31-2026-newsletter)

## Otwarty serwer Telegrama w C#: cztery lata później

**TLDR:** Cztery lata po zbudowaniu transportu TCP, Ferrite potrafi już obsłużyć spatchowane, oficjalne klienty Telegrama na Androida i iOS, działając jako otwarty serwer w C#, obsługujący 494 z 732 metod warstwy API 214.

**Summary:** Historia Ferrite to opowieść o uporze: autor, Aykut Alparslan, zaczął od zbudowania samego transportu TCP dla protokołu Telegrama i cztery lata później doprowadził projekt do stanu, w którym spatchowane wersje oficjalnych aplikacji Android i iOS mogą się rejestrować, wymieniać wiadomości, tworzyć grupy i kanały, przesyłać pliki, zaczynać sekretne czaty i wykonywać połączenia, korzystając z Ferrite jako backendu zamiast oryginalnej infrastruktury Telegrama. Projekt celuje w .NET 10 i warstwę API Telegrama 214, obsługując 494 z 732 metod zdefiniowanych w tej warstwie.

To pokazuje, jak trudny jest reverse engineering zamkniętego protokołu komunikacyjnego wykorzystywanego przez setki milionów użytkowników, i jednocześnie jak dużo można osiągnąć jedną osobą pracującą latami nad wąskim, dobrze zdefiniowanym problemem, zamiast rozpraszać się na dziesiątki funkcji naraz.

**Key takeaways:**
- Ferrite to otwarty serwer Telegrama w C#, budowany od czterech lat, zaczynając od transportu TCP.
- Projekt obsługuje 494 z 732 metod warstwy API Telegrama 214, celując w .NET 10.
- Spatchowane oficjalne klienty Android i iOS mogą korzystać z Ferrite do rejestracji, wiadomości, grup, plików, sekretnych czatów i połączeń.

**Why do I care:** To dobry przykład na to, że reverse engineering zamkniętych protokołów komunikacyjnych wciąż jest żywą dziedziną, mimo dominacji AI w rozmowach o inżynierii oprogramowania. Dla zespołów budujących własną infrastrukturę komunikacyjną albo integrujących się z zamkniętymi API, Ferrite jest ciekawym studium przypadku, jak dużo szczegółów protokołu trzeba odkryć metodą prób i błędów, żeby osiągnąć kompatybilność z oficjalnym klientem.

**Link:** [Open-Source Telegram Server in C#: Four Years Later](https://hackernoon.com/8-31-2026-newsletter)
