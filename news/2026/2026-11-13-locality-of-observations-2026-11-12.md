---
title: 'Lokalność obserwacji w systemach zdarzeniowych'
excerpt: 'Oskar Dudycz pokazuje, jak podejmować decyzje na podstawie tego, co system już zaobserwował, bez odtwarzania pełnej kolejności zdarzeń.'
publishedAt: '2026-11-12'
slug: 'locality-of-observations-2026-11-12'
hashtags: '#OskarDudycz #eventdriven #architecture'
---

## TLDR

W systemie rozproszonym zdarzenia docierają w różnej kolejności, a pełna wiedza o świecie jest nieosiągalna. Moduł powinien podejmować decyzje na podstawie lokalnie dostępnych obserwacji i jawnych warunków, które musi spełnić.

## Nie zawsze trzeba znać kolejność

Autor używa przykładu zapisów na warsztat. Zgłoszenia przychodzą formularzem, wiadomościami prywatnymi i e-mailem. Nie ma potrzeby ustalać, które dotarło pierwsze, jeśli decyzja zależy tylko od tego, czy osiągnięto minimalną liczbę uczestników i czy pozostały miejsca.

Podobnie w obsłudze zamówienia kolejny krok może czekać, aż system zaobserwuje zarówno autoryzację płatności, jak i gotowość produktów do wysyłki. Nie trzeba znać dokładnej kolejności tych zdarzeń, jeśli żadne z nich samo nie uruchamia wysyłki.

Takie podejście upraszcza model i ogranicza wyścigi. Decydent zbiera obserwacje we własnym tempie, a reguły opisują warunki decyzji zamiast próbować odtworzyć idealną chronologię.

**Link:** [The power of locality of observations](https://event-driven.io/en/light-and-dark-side-of-eda-workshop/)

## Dlaczego mnie to obchodzi

W architekturze zdarzeniowej kuszące jest dopisywanie logiki, która porządkuje każde zdarzenie globalnie. Często wystarczy określić, jakie fakty są potrzebne do podjęcia decyzji. Mniej synchronizacji oznacza mniej miejsc, w których system może się zakleszczyć.