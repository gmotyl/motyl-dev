---
title: "HackerNoon: nieudany deployment nie oznacza, że infrastruktura się wycofała"
excerpt: "Dlaczego czerwony pipeline nie jest dowodem na rollback, jak ślepy retry po nieudanym wdrożeniu potrafi pogorszyć stan infrastruktury, i pięć zasad, które warto wpisać w kontrakt każdego runtime'a do orkiestracji."
publishedAt: "2026-09-10"
slug: "hackernoon-deployment-failed-resources-still-running"
hashtags: "#HackerNoon #devops #infrastructure #architecture #cicd #kubernetes #generated #pl"
source_pattern: "HackerNoon"
---

## Deployment się nie udał, a zasoby wciąż działają

**TLDR:** Nieudany deployment, w którym pipeline pokazuje czerwone, a konsola dostawcy chmury pokazuje wciąż aktywne zasoby, to nie sprzeczność, tylko dwa prawdziwe fakty naraz. Artykuł argumentuje, że kod wyjścia procesu opisuje wynik jednego polecenia, a nie kompletny stan wielu zdalnych systemów po jego zakończeniu, i proponuje pięć zasad budowania runtime'ów do orkiestracji, które honorują tę różnicę.

**Summary:** Przepływy infrastrukturalne pokazują operatorowi jedną akcję, ale pod spodem wykonują wiele osobnych wywołań: utworzenie sieci, rezerwację adresu, utworzenie maszyny wirtualnej, oczekiwanie na dostęp, konfigurację systemu operacyjnego, uruchomienie sond zdrowia. Te wywołania nie stają się jedną atomową transakcją tylko dlatego, że rozpoczęło je jedno polecenie, więc jeśli czwarty krok zawiedzie, pierwsze trzy mogą pozostać ukończone. Ślepy retry po takiej awarii bywa jeszcze gorszy niż brak reakcji: jeśli dostawca przyjął żądanie utworzenia zasobu, ale odpowiedź zgubiła się przy zerwanym połączeniu, ponowne wywołanie może utworzyć duplikat, zwrócić konflikt nazwy albo podpiąć kolejne kroki do niewłaściwego obiektu. Idempotencja pomaga, ale nie mówi orkiestratorowi, które wcześniejsze kroki się zakończyły, które kolejne nigdy się nie zaczęły, ani czy zasób w stanie błędu powinien zostać wznowiony, czy usunięty; do tego potrzebny jest trwały rekord operacji.

Centralna rada artykułu brzmi: zapisz przejście stanu, zanim zacznie się mutacja u dostawcy. Po udanej walidacji runtime powinien zapisać nieterminalny znacznik w rodzaju "running", z tożsamością operacji, celem, rozwiązanymi danymi wejściowymi i znacznikiem czasu, i dopiero wtedy rozpocząć wywołanie u dostawcy. Jeśli sam zapis stanu się nie powiedzie, wywołanie do dostawcy nie powinno w ogóle wystartować, nawet jeśli oznacza to zablokowany deployment z powodu lokalnego problemu z dyskiem, bo alternatywa, zmiana infrastruktury bez trwałego zapisu, że w ogóle się zaczęła, jest gorsza. Ta sama logika dotyczy niszczenia zasobów: stan błędu musi pozostać kwalifikowalny do inspekcji i usunięcia u dostawcy, bo pomijanie wszystkiego, co nie jest oznaczone jako "ok", ominie właśnie te zasoby, które najbardziej wymagają sprzątnięcia po nieudanym apply. Kubernetes rozwiązuje podobny problem finalizatorami: żądanie usunięcia przenosi obiekt w stan "terminating", ale obiekt pozostaje, dopóki wymagane sprzątanie się nie zakończy, zamiast traktować samo żądanie API jako dowód, że zasobu już nie ma.

**Key takeaways:**
- Kod wyjścia procesu opisuje wynik jednego polecenia, nie kompletny stan wielu zdalnych systemów po jego zakończeniu.
- Runtime powinien zapisać nieterminalny stan przed rozpoczęciem mutacji u dostawcy, a nie mutować, gdy sam zapis stanu się nie powiedzie.
- Niszczenie zasobu powinno kończyć się dopiero po potwierdzonej nieobecności, a nie po samym wysłaniu żądania usunięcia, na wzór finalizatorów w Kubernetesie.

**Why do I care:** Jeśli utrzymujecie własną automatyzację infrastruktury albo pipeline CI/CD z wieloetapowym provisioningiem, te pięć zasad to konkretna checklista do sprawdzenia, zanim padnie pytanie "dlaczego po czerwonym pipeline w chmurze wciąż płacimy za maszynę". Warto szczególnie zapamiętać rozróżnienie między "nie zdążyło się wykonać" a "zawiodło" w grafie zależności, bo mylenie tych dwóch stanów prowadzi do automatyzacji, która powtarza już wykonaną pracę albo próbuje sondy zdrowia, zanim maszyna w ogóle osiągnęła stabilny stan.

**Link:** [The Deployment Failed. The Resources Are Still Running.](https://hackernoon.com/the-deployment-failed-the-resources-are-still-running)
