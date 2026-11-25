---
title: "Inngest kontra LangChain: ten sam długotrwały agent zbudowany dwa razy"
excerpt: "Porównanie dwóch podejść do trwałości agentów na przykładzie CodeClimb: architektura, kroki, punkty kontrolne i wdrożenie."
publishedAt: "2026-11-24"
slug: "decoding-ai-inngest-vs-langchain-dlugotrwaly-agent"
hashtags: "#decoding-ai #ai #agents #architecture #typescript #devtools #generated #pl"
source_pattern: "Decoding AI"
---

## Inngest kontra LangChain: ten sam agent zbudowany dwa razy

**TLDR:** Autor zbudował agenta CodeClimb w obu ekosystemach, by porównać, jak radzą sobie z trwałością po awarii. Inngest oddziela serwer stanu od workera, a LangChain trzyma wszystko na jednym węźle z Postgresem i Redisem.

**Summary:** Punkt wyjścia to realna obawa: co, jeśli agent pracuje sześć godzin, a po 30 sekundach braku internetu pada i trzeba zacząć od zera, a zdalny sandbox dalej zużywa kredyty. CodeClimb to pętla, w której agent kodujący Pi pisze algorytm GraphRAG na podstawie specyfikacji i zbioru treningowego, potem etap oceny liczy F1 i MRR na zbiorze deweloperskim, a wyniki wracają jako informacja zwrotna wraz z historią hipotez. Pętla kończy się po osiągnięciu progu, przekroczeniu limitów kosztu lub rund albo po wypłaszczeniu. Najlepsza noc to 26 rund w 11,8 godziny za 74,63 dolara. Barierki są twarde: 2,50 dolara i 30 minut na eksperyment oraz 120 dolarów na noc, sprawdzane przed każdym wywołaniem modelu.

W wersji Inngest są dwa komponenty: długo żyjący worker wykonujący kod i serwer Inngest trzymający stan, planujący kroki i wyzwalający worker, który może działać w chmurze lub u siebie. Aplikacja ma sześć funkcji i cztery zdarzenia, a funkcja nadrzędna wywołuje potomne dla eksperymentu i ewaluatora. Każdy krok opakowuje logikę niedeterministyczną lub z efektami ubocznymi, więc powtórka daje te same wyniki. Wejścia i wyjścia trzeba trzymać małe, bo przechodzą przez sieć, dlatego cały eksperyment i cała ewaluacja to po jednym kroku, ograniczonym do 50 minut przy limicie godziny. Serwer wykrywa martwego workera w około dwie minuty, a przy braku kredytów oczekiwanie na zdarzenie wstrzymuje noc nawet na trzy dni bez zajmowania workera. Zdarzenia dają elastyczność, ale grozi plątanina trudna do śledzenia, a ślady trwają tylko siedem dni w planie Pro.

W LangChain trwałość zapewnia LangGraph, a wdrożenie LangSmith i jego Agent Server. Wszystko działa na jednym węźle: harmonogram i kod, a stan siedzi w Postgresie, kolejka w Redisie. Autor nie lubi Graph API i użył Functional API: punkt wejścia z zadaniami, każde z zapisanymi wejściem i wyjściem, ponowieniami i wznawianiem, powtarzanymi według nazwy i kolejności wywołań, nie według danych. Daje to wygodne wdrożenie i wbudowaną obserwowalność, ale mniej swobody w architekturze.

Warto zauważyć, że Inngest jest sponsorem tekstu, a autor oferuje trzy miesiące darmowego planu Pro. Deklaruje niezależne opinie, ale w wersji z Inngest zdradza więcej szczegółów i entuzjazmu. Pominięto Temporala, Restate i DBOS jako opcje, choć autor to przyznaje.

**Key takeaways:**
- Trwałość w agentach długich zadań oszczędza tokeny i pieniądze po awarii.
- Inngest rozdziela worker i serwer stanu, LangChain trzyma wszystko na jednym węźle.
- Kroki powinny być małe w danych, a cały eksperyment może być jednym krokiem.
- Barierki kosztów muszą działać poza agentem.

**Why do I care:** Wybór między tymi narzędziami to w gruncie rzeczy wybór między elastycznością a gotowym wdrożeniem. Zanim zaczniesz, odpowiedz na pytania z listy autora: gdzie stoi kod, co jest jednym krokiem i kto zwalnia sandboxy po awarii. Uważaj na sponsorowany charakter tekstu.

**Link:** [Inngest vs. LangChain: I Built the Same Long-Running Agent Twice](https://www.decodingai.com)
