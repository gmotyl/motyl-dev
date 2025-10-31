---
title: "Mitmproxy 11: HTTP/3, rozszerzone DNS i implikacje dla inżynierów sieci"
excerpt: "Mitmproxy 11 dodaje pełne wsparcie dla HTTP/3, znaczące ulepszenia DNS i mechanizmy obchodzenia ECH — ważne zmiany dla osób zajmujących się bezpieczeństwem, testowaniem i inżynierią ruchu sieciowego."
publishedAt: "2024-10-06"
slug: "mitmproxy-11-http3-dns-implications"
hashtags: "#generated #pl #architecture #ai #security #devops #webdev #frontend #performance #web-performance #mitmproxy #http3"
---

## Mitmproxy 11 Released: Full HTTP/3 Support and DNS Enhancements
**TLDR:** Mitmproxy 11 wprowadza pełne wsparcie dla HTTP/3 w trybach transparent i reverse proxy oraz znacznie rozszerza obsługę DNS dzięki bibliotece Hickory (Rust). Dodano też mechanizmy upraszczające pracę z Encrypted Client Hello (ECH), ale decyzje projektowe niosą za sobą istotne kompromisy dotyczące prywatności i złożoności operacyjnej.

**Summary:**
Wydanie mitmproxy 11 to krok w kierunku lepszej zgodności z współczesnym stosem sieciowym: proxy potrafi teraz prowadzić pełne sesje HTTP/3 zarówno w trybie transparentnym, jak i reverse proxy. To ważne dla testów i analizy ruchu w środowiskach, gdzie klienci coraz częściej korzystają z QUIC i HTTP/3. Nawet jeśli backendy aplikacyjne nie obsługują HTTP/3, zmodernizowany kanał klient→proxy może poprawić niezawodność i odporność połączenia po stronie użytkownika.

Najistotniejsza technicznie zmiana to migracja części obsługi DNS do biblioteki Hickory napisanej w Rust, co umożliwia rozpoznawanie szerszego zestawu zapytań DNS, w tym rekordów HTTPS (używanych do sygnalizowania obsługi HTTP/3). Dodatkowo dorzucono DNS-over-TCP, opcję ustawienia własnych serwerów DNS oraz mechanizm pomijania systemowego pliku hosts. Te funkcje nie tylko zwiększają wszechstronność narzędzia, ale też pozwalają na bardziej deterministyczne środowiska testowe przy niestandardowej konfiguracji sieci.

Kolejnym kontrowersyjnym elementem jest obsługa Encrypted Client Hello (ECH). ECH ma za zadanie chronić prywatność domeny w fazie TLS handshake, ale jednocześnie uniemożliwia proxy wygenerowanie trafnych certyfikatów do inspekcji ruchu. Mitmproxy 11 rozwiązuje to pragmatycznie przez usuwanie kluczy ECH z rekordów HTTPS, co przywraca widoczność domeny i pozwala na przejmowanie połączeń. To praktyczne, ale stanowi świadome obniżenie poziomu prywatności klienta w imię funkcjonalności narzędzia.

Autor artykułu opisuje te zmiany głównie od strony implementacyjnej i użyteczności. Jednak dobrze byłoby zobaczyć głębszą dyskusję o konsekwencjach: jak takie zachowania wpływają na zaufanie użytkowników, zgodność z regulacjami prywatności czy relacje producentów przeglądarek i operatorów sieci. Również koszty utrzymania komponentów Rust w projekcie Python/Go (jeżeli są powiązane) oraz ich wpływ na ścieżkę budowania i testowania nie zostały omówione.

Dla architektów i zespołów: mitmproxy 11 otwiera możliwości testowania zachowań HTTP/3 w realnych warunkach klienckich bez wymuszania zmian na backendach. To użyteczne przy sprawdzaniu wydajności, obsługi migracji protokołu i troubleshootingu. Niemniej zespoły powinny ocenić politykę prywatności i zasady inspekcji ruchu — szczególnie w środowiskach produkcyjnych, gdzie obcięcie ECH może być nieakceptowalne. Warto też przemyśleć procesy CI/CD tak, aby budowanie i testowanie narzędzia z zależnością do Hickory (Rust) nie wprowadzało dodatkowego cyklu utrzymania.

Co autor unika lub pomija:
- Słaba eksploracja konsekwencji prywatności i zgodności prawnej wynikających z usuwania ECH.
- Brak szczegółów o wpływie integracji Hickory (Rust) na cykl wydawniczy, testy i dystrybucję pakietów mitmproxy.
- Niewystarczająca analiza tego, kiedy reverse proxy rzeczywiście daje wymierne korzyści przy braku HTTP/3 po stronie serwera — komentarz społeczności pada, ale nie rozbija tego na metryki czy konkretny koszt/korzyść.

**Key takeaways:**
- Mitmproxy 11 dodaje pełne wsparcie dla HTTP/3, co poprawia jakość połączeń klient→proxy nawet bez zmian na backendzie.
- Nowa obsługa DNS (Hickory) rozszerza zakres zapytań, dodaje DNS-over-TCP i większą konfigurowalność zachowania DNS.
- Rozwiązanie problemu ECH polegające na usuwaniu kluczy przywraca funkcjonalność inspekcji, ale robi to kosztem prywatności użytkowników.

**Tradeoffs:**
- Gain: możliwość inspekcji i generowania certyfikatów mimo ECH — but sacrifice: zmniejszona prywatność i potencjalne niezgodności z politykami prywatności.
- Decision to support HTTP/3 at the proxy layer means improved client experience but at the cost of added protocol complexity and operational burden (obsługa QUIC, NAT traversal, diagnostyka).

**Link:** [Mitmproxy 11 Released: Full HTTP/3 Support and DNS Enhancements](https://www.infoq.com/news/2024/10/mitmproxy-11/)

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by gpt-5-mini LLM. While we strive for accuracy, please verify critical information independently.
