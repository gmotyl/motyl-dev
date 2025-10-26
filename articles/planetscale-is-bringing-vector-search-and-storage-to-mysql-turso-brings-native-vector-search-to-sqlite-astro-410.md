---
title: 'Planetscale Is Bringing Vector Search And Storage To Mysql Turso Brings Native Vector Search To Sqlite Astro 410'
excerpt: 'Przegląd 5 artykułów z ui.dev'
publishedAt: '2024-06-11'
slug: 'planetscale-is-bringing-vector-search-and-storage-to-mysql-turso-brings-native-vector-search-to-sqlite-astro-410'
hashtags: '#generated #pl #typescript #javascript #ai'
---

## PlanetScale is bringing vector search and storage to MySQL

No to się dzieje! PlanetScale właśnie ogłosił wsparcie dla wektorów w MySQL, co jest absolutnie szalone. Wszyscy wiemy, że AI to teraz hot topic, ale to co robi PlanetScale to coś więcej niż tylko marketing buzz.

Zasadniczo dodają natywne wsparcie dla typu danych wektorowych plus algorytm HNSW - Hierarchical Navigable Small World - który brzmi jak coś z science fiction, ale to naprawdę state-of-the-art do wyszukiwania podobieństwa wektorowego. Zamiast iterować przez każdy rekord w bazie jak jakiś junior developer, możesz teraz robić similarity search na embeddings w sposób, który nie zabije twojego serwera.

Wyobraźcie sobie - macie bazę dokumentów firmowych, każdy przetransformowany przez ML do wektora, i teraz możecie znajdować podobne dokumenty używając cosine similarity. To jest przyszłość, ludzie!

**Kluczowe punkty:**
- Natywne wsparcie dla wektorów w MySQL
- Algorytm HNSW dla wydajnego wyszukiwania
- Eliminuje potrzebę osobnej bazy wektorowej
- Embedding jako sposób na transformację dowolnych danych do wektorów

**Link:** https://planetscale.com/blog/planetscale-is-bringing-vector-search-and-storage-to-mysql

## Turso brings Native Vector Search to SQLite

A tutaj mamy Turso, które robi dokładnie to samo co PlanetScale, ale dla SQLite! To jest wojna baz danych, ale my jako developerzy wygrywamy.

Turso dodało natywne wsparcie dla wektorów do libSQL - ich forka SQLite. Nie potrzebujesz już żadnych rozszerzeń typu sqlite-vss, które były problematyczne w utrzymaniu. Teraz po prostu masz nowy typ kolumny - F32_BLOB - i możesz robić vector similarity search jak normalny człowiek.

Co jest naprawdę fajne, to że działa to wszędzie gdzie działa SQLite - na mobile, embedded, multi-tenant apps. Wyobraźcie sobie robienie AI inference bezpośrednio na telefonie bez wysyłania danych do chmury. To jest przyszłość prywatności w AI!

**Kluczowe punkty:**
- Natywne wektory w SQLite bez rozszerzeń
- Nowy typ danych F32_BLOB
- Funkcje vector_distance_cos dla similarity search
- Działa offline i na urządzeniach mobilnych

**Link:** https://turso.tech/blog/turso-brings-native-vector-search-to-sqlite

## Astro 4.10

Astro wypuściło 4.10 z eksperymentalnym modułem astro:env i to jest dokładnie to czego potrzebowaliśmy! Zarządzanie zmiennymi środowiskowymi to zawsze był nightmare - niektóre są sekretami, niektóre publiczne, niektóre potrzebne tylko na serwerze, inne na kliencie.

Teraz możecie zdefiniować schema w konfigu z typami - number, boolean - i określić czy to secret czy public, server czy client. Astro automatycznie obsługuje różne runtime'y jak Cloudflare czy Deno. Plus mają funkcję getSecret dla zmiennych które nie są w schema.

To jest właśnie ten typ developer experience który sprawia, że Astro jest tak dobre. Biorą realny problem i robią z tego przyjemność zamiast bólu głowy.

**Kluczowe punkty:**
- Schema-based environment variables
- Type safety dla env vars
- Automatyczne rozróżnienie server/client context
- Wsparcie dla różnych runtime'ów

**Link:** https://astro.build/blog/astro-4100/

## Morphing Arbitrary Paths in SVG

Ktoś w końcu rozwiązał problem morphingu dowolnych ścieżek SVG bez wielkich bibliotek JavaScript! Normalnie możecie morphować tylko ścieżki z identyczną liczbą punktów i tymi samymi komendami rysowania.

Autor pokazuje jak programmatycznie dopasować struktury dwóch dowolnych ścieżek, żeby mogły być animowane. Zamiast ręcznego dopasowywania w edytorze graficznym, co jest koszmarem, można to zautomatyzować i generować animacje z góry.

To jest świetne podejście - zamiast ładować ciężkie biblioteki w runtime, generujecie animacje podczas build time. Dla większości przypadków użycia, gdzie macie konkretne ścieżki które chcecie morphować, to jest o wiele lepsze rozwiązanie.

**Kluczowe punkty:**
- Automatyczne dopasowywanie struktur ścieżek SVG
- Generowanie animacji w build time zamiast runtime
- Eliminuje potrzebę ciężkich bibliotek JS
- Interaktywne demo do testowania własnych ścieżek

**Link:** https://minus-ze.ro/posts/morphing-arbitrary-paths-in-svg/

## Replit Desktop App

Replit wypuścił desktop app jako open source na GitHubie! Zbudowany w Electronie z TypeScript, co jest solidnym wyborem dla tego typu aplikacji.

Mają całkiem przyzwoitą architekturę z API versioning inspirowanym protobuf - nie usuwają istniejących API, nie modyfikują sygnatur, tylko dodają nowe funkcje. To jest właśnie jak należy robić backward compatibility.

Plus wsparcie dla deeplinków z protokołem replit:// - możecie otworzyć konkretne strony lub przepływy bezpośrednio z linka. To pokazuje, że myślą o developer experience nie tylko w edytorze, ale w całym ekosystemie.

**Kluczowe punkty:**
- Open source desktop app w Electronie
- Przemyślane API versioning
- Wsparcie dla deeplinków
- Dobra developer experience w developmencie

**Link:** https://github.com/replit/desktop