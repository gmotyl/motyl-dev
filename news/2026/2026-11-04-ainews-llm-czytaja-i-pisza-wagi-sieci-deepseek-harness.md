---
title: "AINews: LLM-y czytają i piszą wagi sieci, DeepSeek publikuje harness super-agenta"
excerpt: "Praca współautorowana przez Alexa Zhanga pokazuje, że mądry model potrafi edytować wagi głupszego. DeepSeek otwiera prototyp harnessu z jedną długo żyjącą sesją routera."
publishedAt: "2026-11-04"
slug: "ainews-llm-czytaja-i-pisza-wagi-sieci-deepseek-harness"
hashtags: "#latent #ainews #ai #llm #agents #ml #open-source #generated #pl"
source_pattern: "Latent Space"
---

## LLM-y czytają i piszą wagi sieci

**TLDR:** Nowa praca pokazuje, że wystarczająco inteligentny model potrafi bezpośrednio czytać i edytować wagi mniejszego modelu, bez pisania kodu treningowego.

**Summary:** Redakcja zestawia to z autoresearch Karpathy'ego sprzed ośmiu miesięcy, gdzie model sam trenował inny model, ale przez zwykły proces z PyTorchem, krzywymi strat i kernelami. Tu model patrzy wprost na wagi. Opisano trzy rzeczy. Wnioskowanie, co robi mała sieć, jednorazowa naprawa błędów na podstawie nieudanych śladów, a także poprawa w około 50 krokach i napisanie wag od zera w jednym strzale, co pobiło niektóre modele trenowane niezależnie. Redakcja przyznaje, że to wciąż gry i polityki RL, a niezależna reprodukcja już się pojawiła.

**Key takeaways:**
- Model edytuje wagi mniejszego modelu bez klasycznego treningu.
- Działa na prostych zadaniach, jak gry i polityki RL.
- Pojawiła się niezależna reprodukcja.

**Why do I care:** To dla mnie bardziej ciekawostka badawcza niż coś na plan sprintu. Warto jednak to znać, bo ta sama redakcja łączy to z lękami o rekurencyjne samodoskonalenie.

**Link:** [LLMs can read & write neural network weights](https://www.latent.space/)

## DeepSeek Harness

**TLDR:** DeepSeek opublikował artykuł projektowy i repozytorium prototypu super-agenta. Jedna długo żyjąca sesja routera rozmawia z ludźmi, a izolowani pracownicy wykonują zadania równolegle.

**Summary:** W teście DeepSeeka p95 czasu zakończenia spadł z 29,5 do 15,7 minuty względem pojedynczej sesji z subagentami. Recenzent Tianyi mówi, że Super oznacza warstwę nad agentem, nie wyższą inteligencję, a kluczowy kompromis to ciągłość między zadaniami kontra przepustowość. Brakuje pamięci między sesjami i prototyp sprawdzono tylko w małym zaufanym środowisku. W numerze jest też benchmark GDPx z SemiAnalysis, 206 zadań w 11 dziedzinach, w którym najlepszy wynik to 12 procent dla Opusa 5.5, a Carbon ma 10,9 procent przy czterokrotnie niższym koszcie.

**Key takeaways:**
- Router plus izolowani pracownicy skrócił p95 z 29,5 do 15,7 minuty.
- Prototyp nie ma pamięci międzysesyjnej i jest sprawdzony tylko wewnętrznie.
- Najlepszy wynik w GDPx to 12 procent.

**Why do I care:** Wynik pochodzi z własnego testu DeepSeeka, bez niezależnej weryfikacji, i porównuje się z jedną konkretną konfiguracją. Architektura z długo żyjącym routerem jest jednak czytelna i warto ją porównać z własnymi orkiestratorami.

**Link:** [AINews, 31 października - 2 listopada](https://www.latent.space/)
