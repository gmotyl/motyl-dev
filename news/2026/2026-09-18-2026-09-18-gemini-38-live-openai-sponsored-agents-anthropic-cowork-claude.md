---
title: "Gemini 3.8 Live mówi w 97 językach, OpenAI testuje reklamy z agentami, Anthropic scala Cowork z Claude"
excerpt: "Digest The AI Break: Google pokazuje głosowy model Gemini 3.8 Live rozumujący w trakcie mówienia, OpenAI wpuszcza sponsorowanych agentów do reklam w ChatGPT, a Anthropic i Meta poszerzają swoje aplikacje o nowe funkcje i subskrypcje."
publishedAt: "2026-09-18"
slug: "2026-09-18-gemini-38-live-openai-sponsored-agents-anthropic-cowork-claude"
hashtags: "#theaibreak #ai #gemini #openai #anthropic #generated #pl"
source_pattern: "The AI Break"
---

## Gemini 3.8 Live: Google pokazuje model głosowy, który rozumuje w 97 językach i myśli w trakcie mówienia

**TLDR:** Google wypuściło Gemini 3.8 Live, model głosowy przełączający się między 97 językami w obrębie jednej rozmowy, oraz wariant Extended Thinking, który rozumuje na bieżąco, zamiast dopiero przed odpowiedzią. Digest podaje te informacje w formie jednozdaniowej zajawki, bez szczegółów technicznych ani benchmarków.

**Summary:** Przełączanie języka w środku rozmowy to funkcja, której większość dotychczasowych asystentów głosowych po prostu nie miała, zwykle trzeba było zamknąć sesję i wybrać język ręcznie z listy. Jeśli Gemini 3.8 Live faktycznie robi to płynnie przy 97 językach, to zdejmuje z aplikacji cały osobny etap wykrywania i przełączania locale, który dziś zwykle trzeba budować ręcznie wokół silnika mowy.

Ciekawszy jest wariant Extended Thinking, bo rozumowanie w trakcie mówienia to inny problem inżynierski niż rozumowanie przed odpowiedzią. Klasyczny model najpierw generuje ciąg myślenia po cichu, a dopiero potem produkuje mowę, co dodaje zauważalne opóźnienie. Model, który rozumuje na bieżąco, musi jakoś godzić strumień audio z ciągłym dopracowywaniem odpowiedzi, nie psując przy tym płynności wypowiedzi. Google nie podało w tym materiale, jak dokładnie to działa pod maską, więc trudno ocenić, czy to faktyczna zmiana architektury, czy raczej sprytne planowanie kolejności generowania tokenów.

Digest ogranicza się do jednego zdania na temat premiery, bez linków do benchmarków ani porównania z konkurencją, głównie z Advanced Voice Mode od OpenAI. Przy tak lakonicznym opisie warto traktować zapowiedź jako kierunek rozwoju, a nie gotowy, zweryfikowany produkt.

**Key takeaways:**
- Gemini 3.8 Live przełącza się między 97 językami w obrębie jednej rozmowy, bez ręcznego wyboru locale.
- Wariant Extended Thinking rozumuje na bieżąco, w trakcie generowania mowy, a nie dopiero przed odpowiedzią.
- Digest nie podaje benchmarków ani szczegółów architektury, więc ocena jakości czeka na niezależne testy.

**Why do I care:** Jeśli budujecie produkt głosowy dla rynku wielojęzycznego, jeden model obsługujący płynne przełączanie języka zamiast osobnego pipeline'u detekcji locale i routingu do wielu silników TTS/STT to realna redukcja złożoności systemu. Zanim jednak ktoś zacznie tym zastępować istniejącą infrastrukturę produkcyjną, warto poczekać na niezależne testy dokładności rozpoznawania mowy w mniej popularnych językach, marketingowa liczba 97 nic nie mówi o jakości na przykład dla języka polskiego czy suahili.

**Link:** [☕🤖 Google's New Gemini Voice Model Speaks 97 Languages!](https://theaibreak.substack.com/p/googles-new-gemini-voice-model-speaks)

## OpenAI testuje sponsorowanych agentów w reklamach ChatGPT

**TLDR:** OpenAI uruchomiło test funkcji Sponsored Agents, w której kliknięcie reklamy w ChatGPT otwiera czat z agentem danej marki, wraz z nowymi integracjami z HubSpot i Shopify.

**Summary:** Reklama, która po kliknięciu przechodzi w rozmowę z agentem firmy, to inny model niż baner prowadzący na stronę docelową. Użytkownik zostaje w interfejsie czatu, a agent marki może odpowiadać na pytania o produkt, sprawdzać dostępność czy prowadzić przez proces zakupu, korzystając z podłączonych systemów, na przykład CRM w HubSpot albo sklepu w Shopify. To przesuwa ChatGPT bliżej roli platformy handlowej, nie tylko asystenta.

Nie wiadomo z digestu, jak OpenAI oznacza takiego agenta jako sponsorowanego względem zwykłej rozmowy z asystentem, ani czy dane z takiej interakcji trafiają z powrotem do marki. To pytania, na które odpowiedź pojawi się dopiero przy szerszym wdrożeniu, na razie mamy tylko zapowiedź testu.

**Key takeaways:**
- Sponsored Agents: kliknięcie reklamy w ChatGPT otwiera czat z agentem marki, nie stronę docelową.
- Nowe integracje z HubSpot i Shopify pozwalają agentowi marki działać na realnych danych CRM i sklepu.
- OpenAI nie ujawniło, jak oznacza taką rozmowę jako sponsorowaną wobec zwykłego czatu z asystentem.

**Why do I care:** Dla kogoś budującego integracje z API OpenAI to sygnał, że warstwa reklamowa i warstwa asystenta zaczynają się przenikać w tym samym oknie czatu. Jeśli wasz produkt osadza ChatGPT lub podobny model w interfejsie klienta, warto już teraz zastanowić się, jak oddzielicie odpowiedzi neutralne od tych sponsorowanych, zanim regulator zrobi to za was.

**Link:** [☕🤖 Google's New Gemini Voice Model Speaks 97 Languages!](https://theaibreak.substack.com/p/googles-new-gemini-voice-model-speaks)

## Anthropic wciąga Cowork do głównej aplikacji Claude, dorzuca Claude Docs i Slides

**TLDR:** Anthropic zamknęło Cowork jako osobny produkt i przeniosło jego funkcje do głównej aplikacji Claude, jednocześnie uruchamiając Claude Docs i Claude Slides, na razie tylko dla planów Pro i Max.

**Summary:** Cowork miał być odpowiedzią Anthropic na potrzebę współpracy zespołowej wokół Claude, ale zamiast rozwijać go jako osobny produkt, firma po prostu wchłonęła go do głównej aplikacji. To krótsza droga niż utrzymywanie dwóch równoległych interfejsów, ale też sygnał, że Cowork sam w sobie nie zebrał wystarczającej trakcji, żeby zasłużyć na oddzielny byt.

Claude Docs i Claude Slides idą w stronę, którą już przetarł Microsoft z Copilotem w Office i Google z funkcjami AI w Workspace: dokument i prezentacja tworzone bezpośrednio w rozmowie z modelem, bez eksportu do osobnego edytora. Ograniczenie wydania do planów Pro i Max to standardowy sposób Anthropic na testowanie nowych funkcji na płacących użytkownikach, zanim trafią szerzej.

**Key takeaways:**
- Cowork przestaje istnieć jako osobny produkt i trafia do głównej aplikacji Claude.
- Nowe funkcje: Claude Docs i Claude Slides, tworzenie dokumentów i prezentacji wprost w rozmowie z modelem.
- Wdrożenie na start ograniczone do planów Pro i Max.

**Why do I care:** Konsolidacja narzędzi biurowych wewnątrz aplikacji czatowych to trend, który warto obserwować pod kątem formatu wyjściowego, jeśli Claude Docs eksportuje coś zamkniętego zamiast standardowego .docx czy Google Docs, to kolejny mały ogródek zamknięty, do którego trzeba będzie budować osobne integracje.

**Link:** [☕🤖 Google's New Gemini Voice Model Speaks 97 Languages!](https://theaibreak.substack.com/p/googles-new-gemini-voice-model-speaks)

## Meta One: subskrypcja od 2,99 dolara za generowanie obrazów i wideo AI

**TLDR:** Meta uruchomiła subskrypcję Meta One od 2,99 dolara miesięcznie, która odblokowuje generowanie obrazów i wideo przez AI oraz narzędzia dla twórców w aplikacjach Meta.

**Summary:** Cena poniżej trzech dolarów miesięcznie jest wyraźnie niższa niż standardowe plany Midjourney czy Runway, co sugeruje, że Meta traktuje generowanie mediów bardziej jako dodatek do istniejącej bazy użytkowników Instagrama i Facebooka niż osobny produkt premium. Dla twórców obecnych już w ekosystemie Meta to prostszy próg wejścia niż zakładanie konta w zewnętrznym narzędziu i eksportowanie plików z powrotem do aplikacji.

**Key takeaways:**
- Meta One: subskrypcja od 2,99 dolara miesięcznie.
- Obejmuje generowanie obrazów i wideo AI oraz narzędzia dla twórców.
- Działa w obrębie istniejących aplikacji Meta, bez eksportu do zewnętrznych narzędzi.

**Why do I care:** Cena tego rzędu to sygnał, że generowanie obrazu i wideo przestaje być usługą premium, a staje się funkcją dodawaną do każdej platformy z wystarczająco dużą bazą użytkowników. Firmy budujące własne narzędzia do generowania mediów jako główny produkt będą musiały konkurować integracją z konkretnym, wąskim workflow, na przykład montażem wideo pod konkretną platformę reklamową, bo na samej jakości generowania długo już nie pociągną.

**Link:** [☕🤖 Google's New Gemini Voice Model Speaks 97 Languages!](https://theaibreak.substack.com/p/googles-new-gemini-voice-model-speaks)

## Zuckerberg odcina się od wezwań do spowolnienia rozwoju AI

**TLDR:** Zuckerberg zdystansował Metę od apeli o skoordynowane spowolnienie rozwoju AI, twierdząc, że presja rynkowa sama pcha laboratoria w stronę bezpieczniejszych i lepiej dopasowanych modeli.

**Summary:** To stanowisko idzie pod prąd względem innych głosów w branży, które w ostatnich tygodniach wzywały do zwolnienia tempa rozwoju modeli frontierowych. Argument Zuckerberga jest prosty: konkurencja o użytkowników i klientów wymusza bezpieczeństwo i dopasowanie sama z siebie, więc dodatkowa koordynacja czy regulacja nie jest potrzebna. To wygodna teza dla firmy, której model biznesowy opiera się na jak najszybszym wdrażaniu nowych funkcji AI do miliardów kont.

**Key takeaways:**
- Zuckerberg nie popiera wezwań do skoordynowanego spowolnienia rozwoju AI.
- Argumentuje, że konkurencja rynkowa sama wymusza bezpieczeństwo i dopasowanie modeli.
- Stanowisko kontrastuje z apelami innych liderów branży o zwolnienie tempa.

**Why do I care:** Teza "rynek sam się wyreguluje" warto skonfrontować z konkretnymi decyzjami Mety w sprawie bezpieczeństwa jej modeli, a nie tylko z deklaracją prasową. Jeśli integrujecie produkty Mety w swoim stacku, to dobry moment, żeby sprawdzić, jakie realne mechanizmy kontroli i moderacji stoją za tym argumentem, zamiast przyjmować go na słowo.

**Link:** [☕🤖 Google's New Gemini Voice Model Speaks 97 Languages!](https://theaibreak.substack.com/p/googles-new-gemini-voice-model-speaks)
