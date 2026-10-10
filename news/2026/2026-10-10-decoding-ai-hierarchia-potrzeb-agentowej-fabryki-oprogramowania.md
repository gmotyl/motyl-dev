---
title: "Hierarchia potrzeb agentowej fabryki oprogramowania"
excerpt: "Hugo i Eleanor opisują cztery warstwy, od których zależy fabryka oprogramowania prowadzona przez agentów, oraz dwie praktyki, specyfikację i weryfikację."
publishedAt: "2026-10-10"
slug: "decoding-ai-hierarchia-potrzeb-agentowej-fabryki-oprogramowania"
hashtags: "#decodingai #ai #agents #workflow #architecture #devtools #generated #pl"
source_pattern: "Decoding AI"
---

## Hierarchia potrzeb agentowej fabryki oprogramowania

**TLDR:** Fabryka oprogramowania to połączenie autonomicznego i asynchronicznego wykonania pracy przez agentów. Autorzy proponują cztery warstwy zależności: harness, personalizację, automatyzację i ciągłe uczenie się. Artykuł jest też reklamą kursu autorów.

**Summary:** Tekst pierwotnie ukazał się w newsletterze Vanishing Gradients, a w Decoding AI wydrukowano go za zgodą autorów. Wstęp Paula Iusztina jasno mówi, że to promocja kursu o budowie agentowej fabryki, z kodem zniżkowym dla społeczności. Dalej zaczyna się właściwy tekst. Przykłady fabryk to Minions ze Stripe, które zamieniają zgłoszenia w kandydackie pull requesty, Inspect z Ramp i Warp Factories. Autorzy pytają, czy masz dość pilnowania Codexa, Claude Code czy OpenClaw, i odpowiadają, że fabryka pozwala uzgodnić wynik, dać systemowi kontekst i uprawnienia, a potem wrócić do rezultatu, który można sprawdzić, z dowodami weryfikacji albo z konkretnym powodem, dla którego praca stanęła.

Definicja jest zwięzła. Autonomiczność oznacza, że agent sam wybiera kroki do uzgodnionego celu. Asynchroniczność oznacza, że praca toczy się bez twojej uwagi. Samo zaplanowane zadanie nie jest fabryką, tak samo jak interaktywna sesja z agentem. Przykładem w całym tekście jest tracker faktur: aplikacja tworzy faktury z szablonu, śledzi ich status, zachowuje dane po restarcie i pokazuje dowody, że sumy są poprawne. Autorzy zauważają, że agent może też pomagać w obsłudze tego, co zbudował, na przykład przygotowywać monity, a część zachowań lepiej zapisać w kodzie, część zostawić agentowi.

Cztery warstwy to harness, czyli narzędzia, miejsce na pliki, wykonanie i informacja zwrotna, personalizacja, czyli reguły, materiały referencyjne, umiejętności i uprawnienia, automatyzacja, czyli harmonogramy lub zdarzenia uruchamiające pracę, oraz ciągłe uczenie się z udanych i nieudanych przebiegów. Przez wszystkie warstwy przechodzą dwie praktyki: specyfikacja i weryfikacja. Zabawna anegdota: Eleanor kazała agentowi napisać testy, a ten napisał testy dla README. Przeczytałem tylko pierwszą część artykułu, więc nie opisuję szczegółów warstwy automatyzacji i uczenia się.

**Key takeaways:**
- Fabryka to autonomiczność plus asynchroniczność, nie sam harmonogram.
- Pierwszą fabrykę można zacząć od jednego agenta i prostej automatyzacji.
- Uprawnienia i sandboxing trzeba egzekwować technicznie, instrukcje tekstowe tego nie zrobią.

**Why do I care:** Dla architekta wartościowy jest model zależności: nie ma sensu budować automatyzacji bez harnessa, który potrafi zweryfikować wynik. Słabość tekstu jest oczywista. To materiał promujący kurs, więc nie ma w nim ani jednego opisu fabryki, która zawiodła kosztownie, a dowodów jakości jest mało. Pomija też to, kto odpowiada za wynik, gdy człowiek jedynie "ocenia dowody". Mimo to checklista warstw przydaje się przy ocenie własnych procesów.

**Link:** [The Agentic Software Factory Hierarchy of Needs](https://www.decodingai.com/p/the-agentic-software-factory-hierarchy)
