---
title: "Cotygodniowy radar konkurencji w Claude Cowork i ChatGPT Work"
excerpt: "Tutorial z The AI Break o agencie, który co poniedziałek porównuje strony konkurencji z zapisanym stanem bazowym i przysyła krótki raport."
publishedAt: "2026-11-04"
slug: "radar-konkurencji-claude-cowork-chatgpt-work"
hashtags: "#theaibreak #ai #agents #workflow #productivity #automation #generated #pl"
source_pattern: "The AI Break"
---

## Tutorial: cotygodniowy radar konkurencji z agentem AI

**TLDR:** Newsletter pokazuje, jak w Claude Cowork albo ChatGPT Work zbudować agenta, który co poniedziałek odwiedza strony kilku konkurentów, porównuje je z zapisanym wcześniej stanem i pisze zwięzły raport. Pomysł jest rozsądny, ale cała jego wartość zależy od jakości pierwszego zrzutu stanu.

**Summary:** Punktem wyjścia jest scenka, którą każdy zna. Konkurent zmienił cennik trzy tygodnie temu, a ty dowiadujesz się o tym od klienta na rozmowie. Autorzy proponują, żeby badanie konkurencji przestało być jednorazowym slajdem, a stało się małym cotygodniowym nawykiem, którego nie robisz sam. Całość składa się z kilku kroków. Najpierw wybierasz od trzech do pięciu konkurentów i konkretne strony, które warto obserwować, czyli cennik, stronę główną, listę zmian w produkcie, blog, ofertę pracy i jedną stronę z opiniami. Potem agent zapisuje stan bazowy, a kolejne uruchomienia porównują się z nim.

Najciekawsza jest konstrukcja, nie same prompty. Agent musi gdzieś trzymać stan między uruchomieniami, więc autorzy każą założyć pusty dokument w Google Docs albo stronę w Notion i podłączyć odpowiedni konektor. Cotygodniowe zadanie otwiera ten dokument, odwiedza wszystkie adresy jeszcze raz, porównuje stare z nowym, pisze raport do dwustu pięćdziesięciu słów i na koniec nadpisuje stan bazowy dzisiejszym zrzutem. Raport ma stały układ. Są w nim wielkie ruchy z jednozdaniowym "co to znaczy dla nas", rzeczy warte odnotowania, lista konkurentów bez zmian i jeden pomysł na ten tydzień.

W promptach pojawiają się rozsądne zabezpieczenia. Agent ma zapisywać tylko to, co faktycznie widzi na stronie, bez zgadywania. Jeśli strona się nie ładuje albo blokuje dostęp, ma wpisać, że nie mógł jej odczytać, i iść dalej. Ceny i nagłówki ma cytować dosłownie. Autorzy radzą też, żeby przed zaplanowaniem zadania uruchomić je ręcznie raz czy dwa i sprawdzić, czy łapie prawdziwe zmiany, a nie drobne przeróbki sformułowań. Zadanie planuje się w zakładce Schedule w aplikacji Claude albo w trybie Work w aplikacji ChatGPT.

**Key takeaways:**

- Radar składa się z listy obserwowanych stron, zrzutu bazowego, cotygodniowego raportu i harmonogramu.
- Stan między uruchomieniami trzeba trzymać w zewnętrznym dokumencie, bo agent sam go nie pamięta.
- Przed zaplanowaniem warto sprawdzić ręcznie dwie strony z cennikiem i uruchomić raport próbnie, żeby uciąć szum.

**Why do I care:** To historia głównie dla biznesu i produktu, nie dla frontendowca, ale wzorzec jest przenośny. Agent z zewnętrznym stanem i porównaniem z poprzednim zrzutem to dokładnie ta sama idea, której używasz do monitorowania zmian w dokumentacji zależności czy w changelogach bibliotek. Autor omija jedną rzecz. Nadpisywanie stanu bazowego po każdym uruchomieniu oznacza, że jeśli jedno uruchomienie źle odczyta stronę, błąd przejdzie do kolejnego tygodnia i nikt tego nie zauważy. Wersjonowanie zrzutów kosztuje pięć minut i ratuje przed takim cichym dryfem.

**Link:** [Tutorial: Spy on Your Competitors Every Monday (Set It Once, Get a Weekly Report)](https://theaibreak.substack.com/p/tutorial-spy-on-your-competitors)
