---
title: "Silnik rekomendacji dla traderów surowców i presja, żeby inżynier AI był całym zespołem"
excerpt: "Rozmowa z założycielką Moshi o przetwarzaniu strumienia danych rynkowych, zaufanych źródłach i własnych modelach do dokumentów."
publishedAt: "2026-10-22"
slug: "latent-space-moshi-recommendation-engine-commodity-traders"
hashtags: "#latent #ai #llm #ml #startup #agents #engineering #generated #pl"
source_pattern: "Latent.Space"
---

## You are the Team, Anekha Sokhal, Moshi

**TLDR:** Anekha Sokhal, była traderka instrumentów pochodnych na energię, buduje Moshi, narzędzie, które dopasowuje informacje rynkowe do portfela tradera. W rozmowie pojawia się też wątek presji na inżynierów AI, którym mówi się, że są całym zespołem.

**Summary:** Moshi opisuje się jako coś, co powstałoby, gdyby Bloomberg, Claude i Netflix miały dziecko. Dane rynkowe, interfejs do pracy z nimi i rekomendacje dopasowane do tradera. Założycielka mówi, że w czasie, w którym ona wypowiada jedno zdanie, system uczy się trzystu nowych rzeczy. Przetwarza dane ustrukturyzowane, czyli szeregi czasowe kontraktów i wskaźniki techniczne, oraz nieustrukturyzowane, czyli wiadomości, X, podcasty, a także prywatne dane użytkownika, na przykład własnego analityka liczącego tankowce w cieśninie Ormuz.

Najciekawsza część dotyczy zaufanych źródeł. Traderzy mają własne głosy w branży i nie chcą, żeby narzędzie je zastępowało, więc Moshi pokazuje wynik z oceną pewności i zaznacza, gdy źródła się różnią. Zdaniem rozmówczyni rozbieżność między Reutersem, Bloombergiem i Wall Street Journal sama jest informacją. Do dokumentów PDF zespół zbudował własny model wizyjno-językowy, bo nie chce wysyłać danych klientów do zewnętrznych dostawców, a zespół ma do tego kompetencje. Dodaje, że bez zespołu inżynierów gotowe rozwiązanie takie jak Reducto jest rozsądne.

Druga, bardziej ogólna rzecz to teza, że skoro każdy może dziś zbudować własny dashboard w Claude, problemem jest już nie budowanie, tylko to, żeby ktoś go użył. Moshi traktuje interfejs i system rekomendacji jako jeden problem, bo platformy, które wciągają, same pchają dane do użytkownika. Inżynierowie AI, z którymi rozmawiała na konferencji, opowiadali o presji, że mają zbudować sami system, który normalnie robi dziesięć osób, a po wdrożeniu nikt w niego nie klika.

Tu muszę być krytyczny. Rozmowa jest w dużej części rozmową o konferencji i o sobie, a liczba trzystu rzeczy w cztery sekundy nie mówi nic o jakości. Brakuje przykładu, w którym rekomendacja się pomyliła, i danych o tym, jak często trader z niej korzysta. Pada też zdanie, że zespół traktuje poufność poważnie, ale nie ma wzmianki o audycie czy gwarancjach.

**Key takeaways:**
- Moshi łączy dane publiczne i prywatne w grafie powiązań i pokazuje rekomendacje dla portfela.
- Przy rozbieżnych źródłach system pokazuje ocenę pewności, a rozbieżność traktuje jako sygnał.
- Własny model do dokumentów ma sens, gdy firma ma zespół i nie może wysyłać danych na zewnątrz.
- Inżynierowie AI odczuwają presję, że mają zastąpić cały zespół.

**Why do I care:** Dla frontendowca ważna jest teza, że po ułatwieniu budowania oprogramowania trudność przesuwa się w stronę tego, żeby ktoś z niego korzystał. To problem interfejsu i dystrybucji. Jeśli budujemy wewnętrzne narzędzie z agentem, pytanie, czy użytkownik sam do niego wejdzie, trzeba zadać przed pierwszą linijką kodu.

**Link:** [You are the Team, Anekha Sokhal, Moshi](https://swyx.substack.com/p/moshi)
