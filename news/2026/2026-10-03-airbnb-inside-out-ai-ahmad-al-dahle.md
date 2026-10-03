---
title: "Ahmad Al-Dahle o budowie Airbnb jako firmy AI-native: 60% kodu pisanego przez AI i asynchroniczni agenci na on-callu"
excerpt: "CTO Airbnb, wcześniej szef generatywnego AI w Meta, opisuje w Latent Space podejście inside-out: najpierw przyspieszyć pracę zespołów wewnątrz firmy, potem tymi samymi możliwościami przebudować doświadczenie gościa."
publishedAt: "2026-10-02"
slug: "airbnb-inside-out-ai-ahmad-al-dahle"
hashtags: "#latent #ai #architecture #agents #engineering #generated #pl"
source_pattern: "Latent.Space"
---

## Inside-out AI: jak Airbnb doszło do 60% kodu pisanego przez AI i agentów na on-callu

**TLDR:** Ahmad Al-Dahle, CTO Airbnb i wcześniej szef generatywnego AI w Meta odpowiedzialny za otwarcie modeli Llama, opisuje w rozmowie z Latent Space podejście "inside-out": najpierw użyć AI do przyspieszenia pracy wewnętrznych zespołów, potem tymi samymi możliwościami przebudować doświadczenie klienta.

**Streszczenie:** Al-Dahle tłumaczy swoje przejście z budowy modeli frontierowych w Meta do ich wdrażania w Airbnb jako naturalną zmianę frontu: w Meta zespół wiedział już, jak krok po kroku poprawiać możliwości modelu z generacji na generację, kolejnym wyzwaniem jest wdrażanie tych modeli w skali i w sposób, który realnie zmienia produkcyjne doświadczenie użytkownika. Liczby, które przytacza, są konkretne: 60% kodu w Airbnb jest dziś pisane przez AI, liczba wysłanych funkcji i usprawnień rok do roku wzrosła o niemal 80%, a przepustowość pull requestów na przeciętnego inżyniera wzrosła około 1,6 raza.

Pierwszą dużą zmianą było spłaszczenie procesu: zamiast klasycznego przekazywania pracy między zespołami produktu, designu w Figmie i inżynierii, te trzy zespoły pracują teraz bezpośrednio na prototypach, a kod, nie dokument wymagań, staje się artefaktem, nad którym wszyscy faktycznie rozumują. Pierwszym obszarem user-facing, w którym Airbnb wdrożyło AI, był support klienta, bo tam konsekwencje błędu są najpoważniejsze. Około połowa zgłoszeń wsparcia jest dziś rozwiązywana wyłącznie przez AI, co pokrywa się z wynikami kwartalnymi firmy pokazującymi blisko 45%, a kluczem do tego było najpierw zbudowanie agenta, potem wygenerowanie dużej baterii danych syntetycznych do testów, zanim cokolwiek trafiło na produkcję.

Wewnętrzny graf kontekstu organizacyjnego o nazwie Everest, zbudowany na LLM-ach, embeddingach i wyszukiwaniu opartym o AI, pozwolił Airbnb uruchomić dwie nowe usługi, dostawy artykułów spożywczych i odbiory z lotniska, przy czym ta pierwsza zajęła osiem do dziewięciu miesięcy, a druga, korzystając z wiedzy zebranej w Evereście, tylko sześć tygodni. Dzięki temu samemu grafowi generaliści mogą pracować nad bardzo specjalistycznymi częściami kodu bez wcześniejszej wiedzy eksperckiej w danym obszarze. Firma opisuje się jako wielomodelowa: stosuje co najmniej dziesięć dostosowanych modeli produkcyjnych, miesza modele frontierowe z open-weightowymi, na których robi własny post-training i reinforcement learning, i dobiera model do zadania osobno dla każdego przypadku użycia, na przykład najsilniejszy dostępny model frontierowy do kodowania, bo błąd tam kosztuje najwięcej, a mniejsze, wyspecjalizowane modele do wyszukiwania, gdzie liczy się przede wszystkim opóźnienie.

Firma ma też wewnętrznego agenta o nazwie AirChat z pełnym kontekstem organizacyjnym przez MCP, i zaczyna wdrażać kolejny etap, asynchronicznych agentów uruchamianych przez zdarzenia, na przykład automatyczne przejmowanie pierwszej linii on-callu, gdzie agent triaguje alert, a człowiek przegląda zaproponowany PR albo agent sam zamyka incydent, jeśli uzna alarm za fałszywy. Al-Dahle przyznaje jednak jedno wyraźne zmartwienie: czy młodsi inżynierowie w tym modelu w ogóle rozwijają warsztat i osąd, skoro AI robi za nich tak dużo. Jego odpowiedzią jest twarda zasada, że każdy inżynier musi umieć wytłumaczyć, co dokładnie zbudował, nawet jeśli kod napisało AI.

**Kluczowe wnioski:**
- 60% kodu w Airbnb jest dziś pisane przez AI, a przepustowość PR-ów na inżyniera wzrosła około 1,6 raza.
- Support klienta był pierwszym obszarem user-facing z wdrożonym AI właśnie dlatego, że stawka błędu jest tam najwyższa, nie najniższa.
- Wewnętrzny graf kontekstu Everest skrócił czas budowy kolejnej podobnej usługi z dziewięciu miesięcy do sześciu tygodni.
- Firma celowo dobiera model do zadania osobno dla każdego przypadku, najsilniejszy frontierowy do kodowania, mniejsze wyspecjalizowane do wyszukiwania wrażliwego na opóźnienie.

**Dlaczego mi na tym zależy:** Najciekawsza część tego wywiadu dla architekta to nie liczby, tylko kolejność wdrożeń: Airbnb zaczęło od najtrudniejszego, najbardziej ryzykownego obszaru, supportu klienta, zamiast od najbezpieczniejszego, bo tam stawka uzasadniała inwestycję w solidne testowanie na danych syntetycznych przed produkcją. To odwrotność typowego podejścia "zacznijmy od czegoś niskiego ryzyka", i warto się zastanowić, czy w twojej organizacji nie warto czasem zrobić tego samego. Obawa Al-Dahle'a o rozwój juniorów też nie jest retoryczna, to realne pytanie, które każdy lead zespołu powinien sobie zadać, zanim pozwoli agentom przejąć więcej niż połowę commitów.

**Link:** [Inside-Out AI: Rebuilding Airbnb Behind the Scenes and Across the Guest Experience](https://www.latent.space/p/airbnb)
