---
title: "Strona internetowa przyszłości składa się sama dla każdego odwiedzającego"
excerpt: "Adobe eksperymentuje z 'agentic site', czyli stroną, która w czasie rzeczywistym buduje spersonalizowaną treść dla każdego użytkownika na podstawie jego intencji."
publishedAt: "2026-07-03"
slug: "strona-internetowa-przyszlosci-sklada-sie-sama"
hashtags: "#AINews #ai #webdev #personalization #Adobe #agenticweb #WebMCP #A2A #generated #pl"
source_pattern: "AINews"
---

## Strona internetowa przyszłości składa się sama dla każdego odwiedzającego

**TLDR:** Adobe Principal Scientist Carlos Sanchez zademonstrował na konferencji AI Engineer World's Fair koncepcję "agentic site", czyli strony, która w czasie rzeczywistym składa się na nowo dla każdego odwiedzającego na podstawie jego intencji. Koszt wygenerowania jednej strony to dziś jeden do dwóch centów, a latencja ma nie przekraczać dwóch sekund. Adobe szuka pierwszych klientów chętnych do eksperymentów.

**Summary:**

Personalizacja stron internetowych to temat stary jak internet komercyjny. Przez lata oznaczała jedno: wybór spośród skończonego zestawu wariantów. Retailer rekomenduje produkt na podstawie historii zakupów, system dzieli użytkowników na segmenty, i to w zasadzie tyle. Carlos Sanchez, Principal Scientist w Adobe, idzie w zupełnie innym kierunku.

Na AI Engineer World's Fair w San Francisco Sanchez zaprezentował to, co Adobe nazywa "agentic site". Chodzi o stronę internetową, która interpretuje intencję odwiedzającego, sięga po istniejące materiały firmy i składa spersonalizowaną stronę w czasie rzeczywistym. Adobe nazywa to podejście "audience of one", bo zamiast segmentów mamy dosłownie jedną osobę, dla której treść jest budowana od nowa.

Konkretny przykład z prezentacji: osoba zainteresowana kempingiem trafia na stronę o ekspresach do kawy. System grupuje sygnały z zachowania użytkownika i zapytań wyszukiwania w kategorię intencji, czyli eksploruje, bada czy szykuje się do zakupu, i na tej podstawie LLM składa stronę zoptymalizowaną pod kątem parzenia kawy na świeżym powietrzu. Dobór produktów, treści i układ strony zmienia się pod konkretnego użytkownika.

To nie jest generowanie treści z niczego. Gruntowym korpusem pozostają istniejące materiały firmy, a LLM je dobiera i układa. To ważne rozróżnienie, bo eliminuje ryzyko halucynacji na poziomie faktów produktowych.

Dwa parametry techniczne, które Sanchez wymienił wprost: latencja poniżej dwóch sekund i koszt wygenerowania jednej strony na poziomie jednego do dwóch centów. Sanchez przyznaje, że to będzie tanieć. Adobe nie wdrożyło jeszcze tego rozwiązania na produkcyjnych stronach klientów, ale szuka organizacji gotowych eksperymentować. Oczywistym pierwszym krokiem jest e-commerce, bo personalizację można połączyć bezpośrednio ze współczynnikiem konwersji.

Ciekawszy wątek pojawia się, gdy weźmiemy pod uwagę, że przyszłe strony nie będą obsługiwać wyłącznie ludzkich odwiedzających. Gdy osobiste agenty AI staną się bardziej sprawne, użytkownik może delegować zakupy lub badania produktów w całości. Agent przybywa na stronę z bogatszym profilem preferencji, niż jakakolwiek strona mogłaby wywnioskować z cookies. Część transakcji agent obsłuży autonomicznie, przy innych użytkownik będzie chciał sam zobaczyć produkt i podjąć decyzję.

Tu wchodzą technologie takie jak WebMCP, które pozwalają stronie wystawić ustrukturyzowane narzędzia dostępne dla agenta. A2A, czyli agent-to-agent, to z kolei opcja, w której agenty w ogóle nie przechodzą przez wizualny interfejs strony. Sanchez nie ma gotowej odpowiedzi, czy przyszłość to dwie oddzielne wersje strony, jeden system z dwiema warstwami, czy coś jeszcze innego. Ale "agentic targeting" uważa za pewnik.

Sam Sanchez jest szczery co do niepewności: łatwo jest coś zbudować z AI, trudniej wiedzieć co budować. Adobe buduje i szuka klientów.

**Key takeaways:**
- Adobe eksperymentuje z "agentic site", stroną składaną w czasie rzeczywistym pod intencję konkretnego użytkownika przy pomocy LLM
- Gruntowym korpusem są istniejące materiały firmy, nie generowana treść z niczego
- Koszt jednej wygenerowanej strony to około 1-2 centy, latencja ma być poniżej 2 sekund
- Adobe nie wdrożyło rozwiązania produkcyjnie, szuka klientów chętnych do eksperymentów
- Strony będą musiały obsługiwać zarówno ludzkich odwiedzających, jak i agenty AI
- WebMCP i protokoły A2A to technologie umożliwiające agentom dostęp do treści bez przechodzenia przez wizualny interfejs
- Nikt, włącznie z Adobe, nie wie jeszcze, jaki model docelowy się przyjmie

**Why do I care:**

Z perspektywy frontendowca to brzmi ekscytująco i niepokojąco jednocześnie. Ekscytująco, bo koncepcja strony jako systemu zarządzającego treścią i interfejsem zamiast statycznego zbioru stron to sensowna architektoniczna odpowiedź na heterogeniczność użytkowników. Niepokojąco, bo nakłada ogromne wymagania na warstwę frontendową: jak testować stronę, która dla każdego wygląda inaczej? Jak zapewnić dostępność, kiedy struktura DOM jest generowana dynamicznie przez LLM? Jak debugować błędy wizualne? Koszt jednego do dwóch centów za stronę może brzmieć mało, ale przy milionach odsłon szybko robi się z tego poważna pozycja w budżecie. WebMCP i A2A to natomiast rzeczy, które jako frontendowiec powinienem śledzić, bo moment, gdy agenty staną się głównymi "użytkownikami" stron internetowych, zmieni fundamentalnie to, co w ogóle budujemy i dla kogo.

**Link:** [The website of the future may assemble itself for every visitor](https://www.latent.space/p/the-website-of-the-future?publication_id=1084089&post_id=204745876&isFreemail=true&triedRedirect=true)
