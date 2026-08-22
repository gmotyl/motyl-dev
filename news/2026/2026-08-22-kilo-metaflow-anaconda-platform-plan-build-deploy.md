---
title: "Kilo planuje kod, Anaconda Platform go wdraża"
excerpt: "Po wejściu Kilo do Anaconda, tryby Plan, Code, Debug i Review mapują się jeden do jednego na strukturę Metaflow, więc pipeline danych da się zaplanować, zbudować i wdrożyć bez zmiany narzędzia po drodze."
publishedAt: "2026-08-22"
slug: "kilo-metaflow-anaconda-platform-plan-build-deploy"
hashtags: "#kilo #python #dataengineering #mlops #agents #kubernetes #generated #pl"
source_pattern: "Kilo"
---

## Nowy Meta(flow): planuj i buduj w Kilo, wdrażaj na Anaconda Platform

**TLDR:** Dla większości zespołów Pythonowych droga od pomysłu na pipeline do działającej produkcji wciąż liczy się w dniach. Po wejściu Kilo do Anaconda ta droga ma być krótsza, bo Kilo zajmuje się planowaniem i budową, a Anaconda Platform uruchomieniem i wdrożeniem.

**Summary:** Metaflow, open-source'owy framework leżący u podstaw Anaconda Platform, strukturyzuje pracę jako graf kroków: piszesz zwykły Python, dekorujesz funkcje @step, a Metaflow zajmuje się wersjonowaniem, skalowaniem i orkiestracją pod spodem. Tryby agenta w Kilo mapują się na dokładnie ten sam kształt: Plan to miejsce, gdzie agent szkicuje graf, zanim napisze linijkę kodu, Code implementuje każdy krok, Debug łapie zepsuty artefakt albo źle sformatowany input do foreach, a Review zamyka pętlę, zanim cokolwiek trafi do produkcji.

Przykład z artykułu: chcesz zbudować coś, co skanuje każde repo w organizacji, sprawdza zależności i serwuje wyniki jako żywy raport. W Kilo planujesz kroki (lista repo, skanowanie równoległe, agregacja, dashboard), Code mode pisze klasę FlowSpec i funkcje @step z fan-outem przez foreach, a Debug mode łapie parser, który dławi się na dziwnym formacie pliku, zanim zmarnujesz cały cloud run na odkrycie tego na własną rękę. Kiedy flow działa lokalnie, ten sam kod uruchamia się w skali przez --with kubernetes, a dekorator @app_deploy zamienia gotowy artefakt w żywy serwis FastAPI, używając dokładnie tego samego obrazu i pakietu kodu, na którym działał flow. Deployments API Anaconda Platform sprawia, że ten sam artefakt, który został zwersjonowany podczas przebiegu flow, jest tym, co faktycznie serwuje ruch produkcyjny, z pełną linią rodowodu z powrotem do przebiegu, który go wyprodukował.

**Key takeaways:**
- Tryby Plan, Code, Debug i Review w Kilo mapują się jeden do jednego na strukturę kroków Metaflow.
- Dekorator @app_deploy zamienia gotowy artefakt Metaflow w serwis FastAPI używający tego samego obrazu, na którym działał flow.
- Deployments API zapewnia pełną linię rodowodu między wdrożonym artefaktem a przebiegiem flow, który go wyprodukował.
- Kilo wciąż daje dostęp do ponad 500 modeli do wyboru w każdym trybie agenta.

**Why do I care:** To materiał promocyjny Kilo, ale rozwiązuje realny problem, który znam z własnego doświadczenia: przeskok mentalny między prototypowaniem w notebooku a wdrażaniem w produkcyjnej infrastrukturze zwykle wymaga przepisania połowy logiki i zbudowania osobnego pipeline'u deploymentu. Jeśli faktycznie ten sam obraz i pakiet kodu, który biegł podczas planowania w Kilo, ląduje w produkcji bez dodatkowej warstwy tłumaczenia, to eliminuje klasę błędów typu "u mnie działało inaczej niż na produkcji", które regularnie zjadają czas zespołów danych i ML. Dla architekta warto zwrócić uwagę na sam wzorzec: agent planujący graf kroków, który następnie faktycznie odpowiada strukturze wdrożeniowej, to coś, czego można szukać też w innych narzędziach, niekoniecznie w ekosystemie Anacondy.

**Link:** [The New Meta(flow): Plan and Build in Kilo, Deploy on the Anaconda Platform](https://blog.kilo.ai/p/the-new-metaflow)
