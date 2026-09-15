---
title: "Chcieliśmy być Netflixem, teraz kopiujemy OpenAI i Anthropic, tylko czy to to samo?"
excerpt: "Oskar Dudycz porównuje erę kopiowania praktyk Netflixa z erą, w której narzędzia LLM narzucają nam sposób pracy bez pokazania uzasadnienia, i pyta, co zostaje z inżynierskiego myślenia, gdy oddajemy je harnessowi vendora."
publishedAt: "2026-09-15"
slug: "chcielismy-byc-netflixem-openai-anthropic-harness-inzynierskie-myslenie"
hashtags: "#oskardudycz #ai #architecture #genai #generated #pl"
source_pattern: "OskarDudycz"
---

## Chcieliśmy być Netflixem, teraz kopiujemy narzędzia OpenAI i Anthropic

**TLDR:** Przez lata branża kopiowała praktyki wielkiej techniki, Netflix, Google, Spotify, publikujące blogi o swoich rozwiązaniach, które dało się przeczytać, ocenić i odrzucić. Dudycz zauważa, że narzędzia LLM działają inaczej, praktyka jest wbudowana w produkt, a uzasadnienie zostaje ukryte u vendora, którego przychód zależy od tego, jak bardzo z tego narzędzia korzystamy.

**Summary:** Blog post Netflixa czy Google'a był argumentem, dało się go przeczytać, zgodzić się, odrzucić albo powiedzieć zespołowi "to nie nasza skala". Rodziło to dyskusje, czasem bunt, czasem dojrzałość, ale zawsze pytanie "dlaczego", nawet jeśli wiele osób i tak kopiowało bezrefleksyjnie. Autor przyznaje, że ślepe kopiowanie praktyk wielkiej techniki dawało też realne szkody, przeinżynierowanie, nadmierne zatrudnienie, skomplikowaną infrastrukturę (Kubernetes jako przykład), dziwne praktyki rekrutacyjne w stylu LeetCode. Miało też dobrą stronę, komodytyzacja chmury pozwoliła firmom bez wewnętrznych kompetencji budować bezpieczniejsze produkty, a problemy skali wielkiej techniki zostawiły po sobie dojrzały open source.

Teraz pytanie brzmi, czy chcemy, żeby nasze procesy wyglądały jak procesy OpenAI czy Anthropic. Problem w tym, że dostajemy nie sposób pracy tych firm, tylko ich wyobrażenie o tym, jak my, przeciętni inżynierowie, powinniśmy pracować. Harness vendora ma własny system prompt, definicje narzędzi, decyduje co trafia do kontekstu, a czego nie, kiedy agent uznaje zadanie za skończone. To nie jest zoptymalizowane pod nasze podejście, musimy dopasować się do niego, żeby czerpać korzyści, podobnie jak z frameworkiem aplikacyjnym, tylko że idiomów tym razem nikt nam nie pokazuje.

Dudycz nie udaje, że ma gotowe rozwiązanie. Sam opisuje swój warsztat pracy z LLM-ami, formułowanie pytań bez podpowiadania odpowiedzi, streszczanie do specyfikacji, na której pracuje, wykonywanie pracy pod jego kierunkiem i przeglądem. Żaden zautomatyzowany, wieloagentowy workflow nie zadziałał u niego w sposób, któremu ufa. Konkluzja jest prosta i osobista, nie powinniśmy outsourcować myślenia, bo to jest właśnie rola inżyniera, a jeśli ją stracimy, zawód rzeczywiście jest skończony.

**Key takeaways:**
- Blog post wielkiej techniki był argumentem do przeczytania i oceny, LLM tooling daje gotową praktykę bez pokazania uzasadnienia stojącego za nią.
- Harness vendora ma własny system prompt i decyduje, co trafia do kontekstu, więc trzeba dopasować się do jego wizji pracy, żeby coś z niego wynieść, dokładnie jak przy frameworku aplikacyjnym.
- Autor nie znalazł zautomatyzowanego, wieloagentowego workflow, któremu ufałby w codziennej pracy, sam formułuje pytania, streszcza do specyfikacji i pracuje pod własnym kierunkiem z przeglądem.

**Why do I care:** To rzadki głos, który nie sprzedaje ani hype'u, ani paniki, tylko konkretne pytanie o architekturę władzy nad decyzjami inżynierskimi. Warto się zatrzymać przy porównaniu z blogiem Netflixa, bo dobrze pokazuje różnicę, kiedyś mogliście przeczytać cudzy powód i się z nim nie zgodzić, dziś dostajecie gotową ścieżkę bez dostępu do przesłanek. Jeśli zespół coraz częściej akceptuje sugestie agenta bez pytania "dlaczego akurat tak", to sygnał, żeby świadomie wprowadzić moment przeglądu, zanim decyzje architektoniczne zaczną się podejmować same.

**Link:** [We all wanted to be Netflix, who do we want to be next?](https://www.architecture-weekly.com/p/we-all-wanted-to-be-netflix-who-do)
