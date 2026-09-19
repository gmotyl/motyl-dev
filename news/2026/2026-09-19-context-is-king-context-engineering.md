---
title: "Context is King: jak prompt engineering przerodził się w context engineering"
excerpt: "Lepsze modele LLM potrzebują mniej sprytnych sztuczek w promptach, ale otwierają zadania, do których żaden prompt wcześniej nie sięgał."
publishedAt: "2026-09-19"
slug: "context-is-king-context-engineering"
hashtags: "#AI #LLM #promptengineering #contextengineering #agenticAI #generated #pl"
source_pattern: "HackerNoon"
---

## Context is King: jak prompt engineering przerodził się w context engineering

**TLDR:** Autor artykułu na HackerNoon, thavash, opisuje drogę od prompt engineeringu z 2023 roku do dzisiejszego context engineeringu, w którym o jakości odpowiedzi modelu decyduje cały dostarczony mu kontekst: system message, pliki SKILL.md i sposób, w jaki agenci przekazują sobie zadania.

**Summary:** W 2023 roku prompt engineering polegał na uczeniu się sztuczek: few-shot prompting, role prompting, wymuszanie formatu JSON, chain-of-thought, meta-prompting. Autor przypomina, że model nie wykonuje poleceń jak program, tylko generuje kontynuację tekstu zgodną z tym, czego nauczył się na danych treningowych. Prompt aktywuje wzorce w wagach sieci, nie wydaje jej rozkazów, i dlatego to, co działa dobrze z jednym modelem, z innym może się posypać. Badania takie jak "Language Models are Few-Shot Learners" czy praca Wei i innych o chain-of-thought pokazały, że te techniki realnie zmieniają zachowanie modelu, a nie są tylko wiarą użytkowników we własną skuteczność.

Z czasem system prompt zaczął pękać pod własnym ciężarem. Zespoły ładowały do niego wszystko: standardy kodowania, schematy baz danych, zasady eskalacji. Do końca 2024 roku ujawniły się trzy powtarzalne problemy: zapychanie okna kontekstu tysiącami linijek reguł, degradacja skuteczności przy pięćdziesięciu konkurujących ze sobą zasadach i brak przenośności promptów między projektami. Odpowiedzią stały się pliki SKILL.md: instrukcje, które agent wczytuje tylko wtedy, gdy zadanie faktycznie tego wymaga, zamiast trzymać cały podręcznik w pamięci przy każdym zapytaniu. Anthropic nazywa to naturalnym rozwinięciem prompt engineeringu, choć autor słusznie zauważa, że nie oznacza to śmierci promptowania, tylko przesunięcie części pracy w inne miejsce.

Modele rozumujące zmieniły rachunek jeszcze raz. Chain-of-thought, kiedyś technikę, o którą trzeba było wyraźnie poprosić, wiele modeli wykonuje teraz domyślnie, a badanie Wharton Generative AI Labs pokazuje, że jawne instrukcje CoT dają im już tylko marginalny zysk. To, czego modele nie nauczyły się same, to specyfikacja zadania: cel, ograniczenia i definicja tego, co ma znaczyć "dobrze". Bez niej model reasoningowy po prostu z większą pewnością siebie trafia w złą odpowiedź. Do tego dochodzi wrażliwość na prompt: badania cytowane w artykule pokazują, że sama zmiana wielkości liter czy interpunkcji potrafi zmienić wynik, a nikt jeszcze w pełni nie rozumie, dlaczego.

W systemach agentowych stawka rośnie. Agent-orkiestrator deleguje zadania agentom roboczym, a niejasność w jego komunikacie staje się faktycznym promptem dla agenta, który go wykonuje. Ustrukturyzowane formaty, takie jak JSON, ograniczają błędną interpretację lepiej niż swobodna proza, ale nie eliminują największego zagrożenia: prompt injection, który w architekturze wieloagentowej rozchodzi się między agentami jak robak, zarażając cały pipeline z jednego skompromitowanego dokumentu. Autor stawia tezę, że to nie jest błąd do załatania, tylko konsekwencja budowania systemów, w których język naturalny jest jednocześnie interfejsem i warstwą wykonawczą, dopóki ktoś nie wymyśli odpowiednika przygotowanych zapytań SQL dla promptów.

**Key takeaways:**
- Prompt engineering nie zniknął, stał się jednym z elementów szerszego context engineeringu.
- System prompt przeciążony regułami traci skuteczność: zjada okno kontekstu, rozmywa priorytety i nie przenosi się między projektami.
- Pliki SKILL.md ładują instrukcje tylko wtedy, gdy są potrzebne, zamiast trzymać cały podręcznik w każdym zapytaniu.
- Modele rozumujące same wykonują chain-of-thought, ale nadal wymagają od człowieka jasnej specyfikacji zadania i kryteriów sukcesu.
- W systemach wieloagentowych niejasna delegacja w promptcie orkiestratora staje się realnym promptem agenta roboczego, a prompt injection potrafi propagować się między agentami jak robak.

**Why do I care:** Jako ktoś, kto projektuje systemy oparte na agentach, najbardziej zgadzam się z jedną obserwacją z artykułu: rosnąca moc modelu nie zmniejsza znaczenia dobrej specyfikacji, tylko podnosi cenę jej braku. Widziałem to samo w praktyce przy przechodzeniu z jednego, rozdętego system promptu na architekturę z osobnymi rolami i skoncentrowanym kontekstem na agenta, mniej reguł na wejściu, mniej sprzecznych instrukcji, łatwiejsze debugowanie. Ostrzeżenie o prompt injection jako "robaku" w pipeline'ach wieloagentowych też trafia w sedno: jeśli agent A czyta niezaufany dokument i przekazuje wniosek do agenta B bez żadnej granicy zaufania, budujesz sobie lukę bezpieczeństwa, a nie funkcję. Do tego trzeba projektować od pierwszego dnia, nie doklejać na końcu.

**Link:** [Context is King: Long Live Context Engineering](https://hackernoon.com/context-is-king-long-live-context-engineering)
