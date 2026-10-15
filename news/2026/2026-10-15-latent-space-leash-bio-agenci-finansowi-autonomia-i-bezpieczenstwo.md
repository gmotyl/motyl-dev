---
title: "Latent.Space: Leash Bio i pętla laboratorium-model oraz autonomia agentów finansowych na AIE NY"
excerpt: "Rozmowa o danych DEL i środowisku Minos dla agentów naukowych oraz relacja z konferencji o kontrolach, które pozwalają agentom działać szybko i bezpiecznie."
publishedAt: "2026-10-15"
slug: "latent-space-leash-bio-agenci-finansowi-autonomia-i-bezpieczenstwo"
hashtags: "#latent #ai #agents #ml #security #generated #pl"
source_pattern: "Latent.Space"
---

## Lab-in-the-Loop z Leash Bio

**TLDR:** Ian Quigley z Leash Bio opowiada o danych z bibliotek kodowanych DNA, o tym, dlaczego modele chemiczne bywają oszukiwane, i o nowym środowisku Minos do naukowego rozumowania agentów.

**Summary:** Leash specjalizuje się w bibliotekach DEL, które dają ogromne ilości danych o interakcjach białek z małymi cząsteczkami. Znane z trudności metody opanowali przez dziesiątki kodów kreskowych na każdej cząsteczce, co wychwytuje białka wiążące DNA zamiast leku, i przez rygor epistemiczny. Konkurs Kaggle, z około czterema miliardami pomiarów i dwoma tysiącami zespołów, pokazał, że nikt nie pobił losowości na niewidzianej bibliotece chemicznej.

Prowadzący opisują też efekt Mądrego Hansa w ChEMBL: model potrafi odgadnąć chemika z budowy cząsteczki, a "kto to zrobił" przewiduje aktywność tak samo dobrze jak struktura. Model Hermes, trenowany tylko na danych Leash, dorównuje Boltz na publicznych benchmarkach. Pod koniec Ian zapowiada Minos, piaskownicę dla agentów, w której dane z ostatnich lat tworzą dziesiątki tysięcy symulacji lab-in-the-loop do uczenia przez wzmacnianie. Agenci szukają najlepszych wiązań wśród 6,5 miliona cząsteczek przy budżecie stu prób.

**Key takeaways:**
- Dane jakościowe i rygor zbierania ważą więcej niż rozmiar modelu.
- Modele chemiczne mogą uczyć się "autora", a nie fizyki.
- Minos udostępnia preprint, blog i otwarty zbiór danych.

**Why do I care:** To najbardziej "biologiczny" materiał w tym zestawie, więc dla frontendowca ma wartość głównie jako wzorzec: weryfikowalne środowisko plus tanie symulacje to przepis na trening agentów. Opis pochodzi ze wstępu do odcinka, więc szczegóły techniczne trzeba sprawdzić w podkaście.

**Link:** [Lab-in-the-Loop at Compute Speed — Ian Quigley, Leash Bio](https://www.latent.space/p/lab-in-the-loop-at-compute-speed)

## Przekraczanie progu: autonomia i bezpieczeństwo agentów finansowych

**TLDR:** Na konferencji AI Engineer w Nowym Jorku OpenAI, Anthropic, Two Sigma i Bloomberg zgodnie mówiły, że bezpieczna autonomia zależy od miejsca kontroli i osądu człowieka, a nie od liczby ograniczeń.

**Summary:** Joseph Kim z OpenAI mówił o "progu użyteczności", czyli punkcie, w którym model jest wystarczająco zdolny i niezawodny, by oszczędzać czas. Przewiduje, że w 2027 branża finansowa mniej polegać będzie na Excelu i PowerPoincie, a agenci będą robić generowanie pomysłów inwestycyjnych i handel. Moment udziału człowieka traktuje jako decyzję produktową.

John Feminella z Two Sigma krytykował zmęczenie zatwierdzaniem i opisał komponowalne kontrole. Jedną jest klasyfikator trybu automatycznego, który kieruje do człowieka tylko najważniejsze żądania, a reguły deterministyczne obsługują jasne przypadki. Anthropic przedstawił warstwę zaufania w trzech krokach: tożsamość i uprawnienia agenta, piaskownica i zatwierdzanie przed działaniem, a także sprawdzanie, czy agent nadal działa po zmianie zmiennych. Agent od rozbieżności w zleceniach ma jedynie proponować poprawki. Andrey Rybka z Bloomberga wymienił zakresowe tożsamości, kontrolę wywołań narzędzi, ograniczenie ruchu wychodzącego, ślady audytowe, budżety i wyłączniki. W jego przykładzie agent potraktował recenzję produktu jak polecenie zakupu. Jego zasada: kontrole deterministyczne poza modelem.

**Key takeaways:**
- Klasyfikatory dla niejasnych przypadków, reguły dla jasnych.
- Agent proponuje, człowiek zatwierdza zmiany w danych.
- Kontrole powinny być poza modelem i zawsze logowane.

**Why do I care:** Cytat o hamulcach w samochodzie dobrze podsumowuje temat. Zwróć uwagę, że relacja jest z sesji sponsorowanej i zawiera wypowiedzi firm sprzedających te rozwiązania, więc brakuje danych o skuteczności kontroli.

**Link:** [Crossing the Threshold: How OpenAI and Anthropic Approach Autonomy and Safety in Financial Agents](https://www.latent.space/p/crossing-the-threshold)
