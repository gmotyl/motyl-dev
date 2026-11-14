---
title: 'Kto sprawdza pracę agenta?'
excerpt: 'Decoding AI zbiera materiały o harnessach, ewaluacji i regresyjnych testach, które pozwalają oceniać wyniki agentów programistycznych.'
publishedAt: '2026-11-12'
slug: 'who-checks-the-agent-2026-11-12'
hashtags: '#decodingai #ai #agents'
---

## TLDR

Po zbudowaniu harnessu pojawia się następne pytanie: jak sprawdzić pracę agenta? Wydanie Decoding AI wskazuje na benchmarki zadań, testy regresyjne z rzeczywistych błędów i kontrolę nad równoległymi zmianami.

## Harness wpływa na wynik

Newsletter przytacza przykład LangChain, gdzie zmiana harnessu przy tym samym modelu podniosła wynik na Terminal-Bench z 53% do 67%. Taki wynik pokazuje, że model nie działa w próżni: narzędzia, pętla sterująca i sposób podawania kontekstu mają wpływ na wykonanie zadania.

Wydanie opisuje również agentów uruchamianych bez interfejsu, na przykład z cron lub webhooka, którzy otwierają osobne branche. To wymaga jasnych granic między zadaniami, żeby równoległe procesy nie nadpisywały sobie zmian.

## Ewaluacja jako część pracy

W benchmarku opisanym w jednym z materiałów model 35B wykonał poprawnie 95% z 19 zadań, podczas gdy model 120B osiągnął 53%. Mała próbka nie uzasadnia ogólnego rankingu, ale dobrze pokazuje, że większy model nie zawsze jest lepszym wyborem dla konkretnego zestawu zadań.

Inny tekst proponuje zamieniać błędy agenta w regresyjne testy. Zapisane sesje można pogrupować według rodzaju awarii, a następnie odtworzyć z tymi samymi wynikami narzędzi. Dzięki temu poprawka harnessu może być oceniona na znanych przypadkach.

**Link:** [Decoding AI: Who Checks the Agent?](https://substack.com/)

## Dlaczego mnie to obchodzi

Agent, którego wynik sprawdzamy dopiero po wdrożeniu, jest kosztownym eksperymentem. Benchmarki powinny odzwierciedlać prawdziwe zadania, a błędy powinny wracać do zestawu testowego. Wtedy zmiana modelu lub harnessu ma mierzalne konsekwencje.