---
title: "Pipeline danych w Pythonie to system, nie skrypt"
excerpt: "Autorka opisuje, jak pojedynczy skrypt ETL, który cichutko padał o drugiej w nocy, zamienił się w pipeline z izolowanymi etapami ekstrakcji, surowego storage'u, transformacji, walidacji, ładowania i orkiestracji w Airflow."
publishedAt: "2026-08-22"
slug: "hackernoon-python-data-pipeline-etl-airflow-pandera"
hashtags: "#HackerNoon #python #data #etl #airflow #architecture #engineering #generated #pl"
source_pattern: "HackerNoon"
---

## Jak zbudowałam pipeline danych od zera w Pythonie

**TLDR:** Pierwsza wersja pipeline'u autorki była jednym skryptem, który łączył się z API, parsował JSON i wstawiał wiersze do PostgreSQL, dopóki nie zaczęło się rate-limitowanie i schemat się nie zmienił, psując parser po cichu w środku nocy. Rozwiązaniem było rozbicie tego na sześć izolowanych etapów.

**Summary:** Kluczowa lekcja tego tekstu jest prosta: pipeline danych to nie skrypt, tylko system, w którym każdy etap musi dać się uruchomić ponownie bez dotykania poprzednich. Architektura, do której autorka doszła po iteracjach, wygląda tak: źródło, moduł ekstrakcji, surowe przechowywanie, moduł transformacji, zwalidowane dane, moduł ładowania, cel. Jeśli transformator się wywali, surowe dane są już zapisane. Jeśli loader padnie, nie trzeba wyciągać wszystkiego od nowa ze źródła.

Ekstraktor ma tylko jedno zadanie: pobrać dane i zapisać je bez żadnych transformacji, z retry logic na poziomie requests (backoff 1, 2, 4, 8, 16 sekund), żeby chwilowy problem z API nie zabijał całego przebiegu. Zanim jakakolwiek transformacja się wydarzy, dane trafiają jako surowy JSON do storage'u, co daje pełny ślad audytowy: jeśli ktoś zapyta, jakie dane były 14 marca, po prostu je masz, a jeśli bug w transformatorze coś zepsuje, odtwarzasz z surowych danych bez ponownego uderzania w źródło.

Transformacja to część, gdzie dzieje się prawdziwa robota: czyszczenie nulli, standaryzacja formatów dat, rzutowanie typów, deduplikacja, logika biznesowa, w większości na pandas, z pyarrow dla większych zbiorów, gdzie pamięć zaczyna być ograniczeniem. Warstwa walidacji z pandera łapie złe dane, zanim wylądują w produkcyjnej bazie, rzucając wyjątkiem przed zapisaniem choćby jednego wiersza, co jest zdecydowanie lepsze niż odkrycie zepsutych danych trzy tygodnie później w raporcie biznesowym. Loader z kolei musi decydować między upsert a append, wielkością batcha (chunksize=1000, żeby PostgreSQL nie dostał jednego gigantycznego INSERT-a) i zarządzaniem transakcjami. Na koniec orkiestracja, od prostego crona po Airflow z retry logic i zależnościami między zadaniami, plus structured logging i śledzenie liczby wierszy na każdym etapie, bo różnica między 50 000 wyekstrahowanych a 47 000 załadowanych rekordów to coś, o czym trzeba wiedzieć od razu, nie wtedy, gdy ktoś zgłosi problem z jakością danych.

**Key takeaways:**
- Rozdzielenie pipeline'u na izolowane etapy (ekstrakcja, surowe storage, transformacja, walidacja, ładowanie, orkiestracja) sprawia, że każdy etap da się debugować i odtworzyć osobno.
- Zapisywanie surowych danych przed transformacją daje pełny ślad audytowy i pozwala odtwarzać przebiegi bez ponownego odpytywania źródła.
- Walidacja z pandera przed etapem ładowania łapie złe dane, zanim trafią do produkcyjnej bazy.
- Śledzenie liczby wierszy na każdym etapie i structured logging to minimum, żeby nie latać pipeline'em na ślepo.

**Why do I care:** Ten tekst to solidne przypomnienie, że architektura pipeline'u danych rządzi się tymi samymi zasadami co dobra architektura backendu: separacja odpowiedzialności, idempotentność i obserwowalność. Frontend developer rzadko buduje pipeline'y ETL na co dzień, ale coraz częściej integruje się z danymi, które przez taki pipeline przeszły, i warto rozumieć, gdzie w łańcuchu mogły powstać niespójności, zanim zaczniesz debugować to po swojej stronie. Ten wzorzec "zapisz surowe dane, zanim je dotkniesz" to też dobra rada dla każdego, kto buduje integracje z zewnętrznymi API we własnej aplikacji, nie tylko dla ludzi od data engineeringu.

**Link:** [How I Built a Data Pipeline From Scratch Using Python](https://hackernoon.com/how-i-built-a-data-pipeline-from-scratch-using-python)
