---
title: "TechTiff: tajne słowo kodowe i automatyzacja wiadomości w iOS 27"
excerpt: "Jak skonfigurować Skróty tak, żeby zgubiony iPhone po SMS-ie z hasłem odesłał swoją lokalizację i zdjęcia z obu aparatów."
publishedAt: "2026-10-31"
slug: "techtiff-iphone-automatyzacja-wiadomosci-ios-27-slowo-kodowe"
hashtags: "#TechTiff #mobile #security #ios #automation #generated #pl"
source_pattern: "TechTiff"
---

## Naucz iPhone'a tajnego słowa kodowego

**TLDR:** W iOS 27 automatyzacje siedzą wewnątrz skrótu. Można ustawić skrót, który po wiadomości od zaufanej osoby z hasłem odeśle lokalizację i zdjęcia z obu aparatów zgubionego telefonu.

**Summary:** Skróty, czyli wbudowana aplikacja do automatyzacji, mogą reagować na przychodzące wiadomości. W iOS 27 trigger dodaje się z poziomu samego skrótu, przez Edycję, Automatyzację i wybór Wiadomości. Wszystkie listy skrótów z automatyzacją widać w bibliotece, w zakładce Automatyzacja. Filtry mogą dotyczyć nadawcy albo tekstu zawartego w wiadomości, a skrót uruchamia się dopiero, gdy pasują wszystkie naraz.

Autorka proponuje skrót kontrolny. Zaufana osoba, na przykład partner, rodzic albo drugie własne urządzenie, wysyła hasło, a telefon pobiera aktualną lokalizację, robi zdjęcie tylnym i przednim aparatem i odsyła wszystko nadawcy. Hasło ma być losowe, mieszanką liter i cyfr, i traktowane jak hasło do konta. Skrót można zbudować opisem w naturalnym języku, co działa na iPhone 15 Pro i nowszych, albo ręcznie w edytorze. Ręczna wersja wymaga wyłączenia potwierdzania przed uruchomieniem, wyłączenia podglądu aparatu przy robieniu zdjęcia oraz zezwolenia na uruchamianie przy zablokowanym telefonie.

Ten sam mechanizm obsłuży inne rzeczy, jak przypomnienia z wiadomości po godzinach albo włączanie świateł po SMS-ie "wracam do domu". Tekst zawiera też ostrzeżenie. Taką automatyzację buduje się wyłącznie na własnym urządzeniu za zgodą, a każdemu, kto znajdzie nieznany skrót na swoim telefonie, radzi przejrzeć listę i usunąć to, czego sam nie dodał, oraz podaje numer krajowej infolinii dla ofiar przemocy domowej w USA.

**Key takeaways:**
- Automatyzacje w iOS 27 są częścią skrótu, a nie osobną zakładką.
- Filtr nadawcy i słowa kodowego działa razem, oba muszą pasować.
- Skrót ma działać przy zablokowanym telefonie i bez potwierdzenia.
- Nieznany skrót na telefonie to powód do sprawdzenia, czy nikt nie ma do niego dostępu.

**Why do I care:** To temat poboczny dla frontendowca, ale ciekawy jako przykład, jak niskim kosztem powstaje zdalnie wyzwalane polecenie na telefonie. Autorka słusznie dodaje wątek nadużyć. Dla mnie wniosek jest taki, że hasło w SMS-ie to słabe uwierzytelnianie i nadaje się do scenariusza zgubionego telefonu, ale nie do niczego, co dotyka pieniędzy czy danych.

**Link:** [Automate Text Messages on iPhone in iOS 27](https://techtiff.substack.com/p/iphone-text-message-automation)
