---
title: 'Astro 50 Beta Release Content Layer A Deep Dive V40 Date Fns Z Obsug Stref Czasowych'
excerpt: 'Przegląd 5 artykułów z ui.dev'
publishedAt: '2024-09-19'
slug: 'astro-50-beta-release-content-layer-a-deep-dive-v40-date-fns-z-obsug-stref-czasowych'
hashtags: '#generated #pl #typescript #ai #performance'
---

## Astro 5.0 Beta Release

No więc, Astro właśnie wypuściło pierwszą betę wersji 5.0 i muszę przyznać, że to całkiem solidne wydanie. Najważniejszą rzeczą tutaj jest stabilny Content Layer - nowy sposób zarządzania treścią w projektach Astro. To jest coś, na co czekałem, bo w końcu możemy pożegnać się z ograniczeniami lokalnych plików Markdown.

Content Layer to w zasadzie system loaderów, które pozwalają ci pobierać dane z dowolnego źródła - czy to z Notion, czy z jakiegoś API, czy z Cloudinary. Wszystko jest type-safe i masz jeden zunifikowany interfejs do wszystkiego. To znaczy, że możesz mieć jedną kolekcję z lokalnych plików Markdown, drugą z API, a trzecią z CMS-a i wszystko działa tak samo.

Druga wielka rzecz to Server Islands - nowa primitywka, która pozwala odroczyć renderowanie dynamicznej treści do momentu po załadowaniu strony. To brzmi jak partial hydration done right.

Dodatkowo scalili static i hybrid output modes i ustabilizowali astro:env. Całość wygląda na solidny krok naprzód.

**Kluczowe punkty:**
- Content Layer z loaderami umożliwia pobieranie treści z dowolnych źródeł
- Server Islands dla lepszego zarządzania dynamiczną treścią
- Scalenie trybów output i stabilne astro:env
- Zachowana kompatybilność wsteczna

**Link:** [link](https://astro.build/blog/astro-5-beta/)

## Content Layer: A Deep Dive

Astro poszło dalej i zrobiło deep dive w Content Layer API. To jest właściwie odpowiedź na problemy skalowalności, które mieli z Content Collections. Ludzie budowali strony z dziesiątkami tysięcy stron i API po prostu się sypało pod względem pamięci i czasu buildów.

Content Layer to ewolucja Content Collections, ale teraz możesz ładować dane z dowolnego miejsca. Jeden collection może być z lokalnych plików, drugi z API, trzeci z filesystem'u gdzie indziej. Używasz tych samych funkcji getEntry i getCollection co wcześniej, ale teraz Astro cache'uje dane lokalnie między buildami, więc updates są szybkie i minimalizujesz API calls.

Najlepsze w tym wszystkim jest to, że jeśli już używałeś content collections, to praktycznie nic się nie zmienia w sposobie używania. Zmienia się tylko to, skąd pobierasz dane. To jest dobry design - nie łamiesz istniejącego API, tylko je rozszerzasz.

**Kluczowe punkty:**
- Rozwiązuje problemy skalowalności poprzednich Content Collections
- Cache'owanie danych między buildami dla lepszej wydajności
- Zachowana kompatybilność z istniejącym API
- Type-safety dla wszystkich źródeł danych

**Link:** [link](https://astro.build/blog/content-layer-deep-dive/)

## v4.0 date-fns z obsługą stref czasowych

Sasha Koss w końcu wypuścił date-fns v4.0 z first-class time zones support. To było długo wyczekiwane, ale rozumiem dlaczego czekał tak długo. Time zones to jeden z tych obszarów, gdzie łatwo narobić więcej problemów niż rozwiązać.

Rozwiązanie jest eleganckie - zewnętrzny pakiet @date-fns/tz z TZDate, który działa ze wszystkimi funkcjami date-fns. Nie musisz zmieniać swojego kodu, po prostu używasz TZDate zamiast Date i wszystko działa.

Co fajne, to że w v4 wszystkie funkcje normalizują argumenty do pierwszego object argument, więc możesz mieszać różne typy dat bez ryzyka błędnych kalkulacji. Wcześniej mieszanie UTCDate z Date mogło dać nieprzewidywalne rezultaty.

Sasha miał rację co do statystyk - tylko około 15% użytkowników potrzebuje time zones support, więc trzymanie tego w zewnętrznym pakiecie ma sens.

**Kluczowe punkty:**
- Zewnętrzny pakiet @date-fns/tz z TZDate
- Kompatybilność ze wszystkimi istniejącymi funkcjami
- Normalizacja argumentów zapobiega błędom w kalkulacjach
- Brak breaking changes w core library

**Link:** [link](https://blog.date-fns.org/v4.0-with-time-zone-support/)

## HTTP QUERY Method

IETF pracuje nad nową metodą HTTP - QUERY. To ma być safe, idempotent request method, która może zawierać request body. W zasadzie to odpowiedź na problem z GET requests, które nie mogą mieć body, ale czasami potrzebujesz wysłać complex query parameters.

QUERY ma być alternatywą dla tych sytuacji, gdzie musisz robić POST żeby wysłać complex search criteria, ale semantycznie to jest query operation, nie mutation. To ma sens - ile razy robiłeś POST do search endpoint'u, bo GET nie wystarczał?

Metoda ma być safe i idempotent jak GET, ale z możliwością wysyłania body. Dodatkowo wprowadzają Accept-Query header field, żeby server mógł zadeklarować, że obsługuje QUERY method.

To jest wciąż draft, ale jeśli przejdzie, to może zmienić sposób, w jaki projektujemy search API. Zamiast hacków z POST do search, będziemy mieli proper semantic method.

**Kluczowe punkty:**
- Safe i idempotent method z możliwością request body
- Rozwiązuje problemy z complex search queries
- Accept-Query header dla deklaracji wsparcia
- Wciąż w fazie draft w IETF

**Link:** [link](https://www.ietf.org/archive/id/draft-ietf-httpbis-safe-method-w-body-05.html)

## TanStack Router TypeScript Performance

Christopher Horobin z TanStack opisuje milestone w TypeScript performance dla TanStack Router. Problem był taki, że gdy masz dużo route definitions z complex types z zewnętrznych bibliotek jak zod, to TypeScript language service zaczynał się dławić.

Główny bottleneck był w tym, że za każdym razem, gdy language service natrafiał na Link component, musiał type-checkować całe route tree od początku. W aplikacji z 400 route definitions to oznaczało ogromną ścianę w TypeScript trace.

Rozwiązanie polega na tym, żeby language service infer'ował tylko z route definition, do której Link nawiguje, zamiast crawlować całe route tree. To brzmi oczywiste, ale code-based route trees polegają na inference do zbudowania całego drzewa, więc to nie było trywialne do zaimplementowania.

To pokazuje, jak ważna jest TypeScript performance w nowoczesnych bibliotekach. Nie wystarczy, że kod działa - musi też zapewniać dobry developer experience w edytorze.

**Kluczowe punkty:**
- Problem z language service type-checkującym całe route tree
- Optymalizacja do infer'owania tylko target route
- Znaczące poprawy w editor experience
- Ważność TypeScript performance w DX

**Link:** [link](https://tanstack.com/blog/tanstack-router-typescript-performance)