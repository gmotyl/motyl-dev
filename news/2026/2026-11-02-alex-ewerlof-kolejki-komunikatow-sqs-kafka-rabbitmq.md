---
title: "Kolejki komunikatów: po co istnieją, jak działają i kiedy ich nie używać"
excerpt: "Alex Ewerlöf wyjaśnia kolejki komunikatów na przykładzie aplikacji do zdjęć, z potwierdzeniami, gwarancjami dostarczenia, partycjami, DLQ oraz porównaniem Kafki, SQS i RabbitMQ."
publishedAt: "2026-11-02"
slug: "alex-ewerlof-kolejki-komunikatow-sqs-kafka-rabbitmq"
hashtags: "#AlexEwerlöf #architecture #backend #aws #devops #performance #generated #pl"
source_pattern: "AlexEwerlöf"
---

## Kolejki komunikatów w projektowaniu systemów

**TLDR:** Kolejka to bufor między producentem a konsumentem. Daje szybkie odpowiedzi, izolację awarii i wygładzanie skoków ruchu, ale ma swoje pułapki.

**Summary:** Autor zaczyna od aplikacji do udostępniania zdjęć. Po wgraniu zdjęcia trzeba je przeskalować, sprawdzić moderacją i rozesłać powiadomienia. Jeśli serwer robi to wszystko sekwencyjnie, użytkownik czeka, jeden krok awarii wywraca całość, a różne zadania mają różne wymagania sprzętowe. Moderacja może potrzebować GPU, skalowanie więcej RAM-u. Skok ruchu po wyróżnieniu w sklepie z aplikacjami robi resztę. Kolejka zmienia ten obraz. Serwer zapisuje plik, wrzuca komunikat do kolejki i od razu odpowiada, a wyspecjalizowane usługi pobierają pracę we własnym tempie.

Kluczowe są trzy mechanizmy. Potwierdzenia, bo kolejka usuwa komunikat dopiero po ACK od konsumenta, a jeśli worker padnie w połowie, komunikat wraca do innego. Zapobieganie duplikatom, które SQS rozwiązuje oknem niewidoczności, RabbitMQ oznaczeniem komunikatu jako niepotwierdzonego, a Kafka przypisaniem jednej partycji do jednego konsumenta w grupie. I gwarancje dostarczenia. Domyślne to co najmniej raz, a przy niej duplikaty są możliwe, więc operacje muszą być idempotentne. Aktualizacja nazwy użytkownika jest, naliczenie opłaty nie jest. Najwyżej raz może zgubić dane. Dokładnie raz w praktyce to co najmniej raz plus idempotentny konsument.

Skalowanie idzie przez partycje i grupy konsumentów. Nie da się mieć więcej konsumentów niż partycji w jednej grupie, a klucz partycji działa jak klucz shardowania. Daje kolejność, ale może dawać też gorącą partycję. Autor podaje dobry przykład, że partycjonowanie aplikacji do przejazdów po mieście skrzywdzi małe miasta i przeciąży duże. Gdy producenci wyprzedzają konsumentów, pomagają autoskalowanie, back pressure i alerty na głębokość kolejki. Zatrute komunikaty trafiają po limicie prób do kolejki martwych listów, na której też trzeba mieć alerty. Kolejka sama jest pojedynczym punktem awarii, więc Kafka replikuje dane i trzyma je przez ustalony czas, co pozwala odtworzyć komunikaty po naprawie błędu.

Wybór produktu opisany jest krótko. Kafka dla dużej przepustowości, trwałości i odtwarzania, SQS jako proste zarządzane rozwiązanie w AWS, z wariantem FIFO o niższej przepustowości, RabbitMQ do złożonego routingu. Ostrzeżenie dotyczy ścieżek z wymaganiem opóźnienia poniżej pół sekundy. Dodanie kolejki prawie na pewno je złamie.

**Key takeaways:**
- Kolejka daje szybką odpowiedź, izolację awarii i bufor na skoki ruchu.
- Domyślne dostarczanie to co najmniej raz, więc konsument musi być idempotentny.
- Liczba konsumentów w grupie nie przekracza liczby partycji.
- Alerty na głębokość kolejki i na DLQ są obowiązkowe.
- Kolejka nie pasuje do ścieżek z twardym limitem opóźnienia.

**Why do I care:** Dla frontendowca to ważne tam, gdzie interfejs pokazuje stan zadania, które przeszło przez kolejkę. Odpowiedź "wgrano" nie znaczy "przetworzono", więc UI potrzebuje stanu pośredniego i sposobu na obsługę duplikatów. Autor pomija koszt operacyjny i debugowanie, czyli śledzenie jednego komunikatu przez kilka usług. Bez korelacji identyfikatorów kolejka zamienia awarie w zagadki.

**Link:** [Message Queues](https://blog.alexewerlof.com/p/message-queues)
