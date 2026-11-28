---
title: "Decoding AI: jak zrobić długo działającego agenta odpornego na awarie na przykładzie CodeClimb"
excerpt: "Paul Iusztin pokazuje w wideo, jak uodpornić nocnego agenta kodującego CodeClimb na awarie, wyczerpany budżet i wyciek poświadczeń."
publishedAt: "2026-11-27"
slug: "decoding-ai-agent-odporny-na-awarie-codeclimb"
hashtags: "#decodingai #ai #agents #architecture #workflow #generated #pl"
source_pattern: "Decoding AI"
---

## Co sprawia, że agent AI jest odporny na awarie?

**TLDR:** Paul Iusztin buduje CodeClimb, nocny agent kodujący, który ma działać około 12 godzin. W wideo przerabia go w pięciu krokach na wersję trwałą i bezpieczną. Sam mail zawiera tylko zapowiedź, więc pięciu wzorców w nim nie ma.

**Summary:** Punkt wyjścia jest bardzo praktyczny. Chcesz zostawić agenta z kodem na całą noc, ale nie chcesz, żeby spalił budżet w dążeniu do celu za wszelką cenę, nie chcesz oddawać mu swoich poświadczeń i nie chcesz stracić kilku godzin pracy, bo o piątej rano padł internet.

CodeClimb to nocne przeszukiwanie kodu sterowane ewaluacjami, zainspirowane projektem autoresearch Andreja Karpathy'ego. Agent prowadzi go przez implementację algorytmów AI na własnych danych, na przykład GraphRAG. Autor opowiada, jak sam nie wiedział, ile kosztuje jeden przebieg, więc doładowywał OpenRouter po dziesięć dolarów. Po sześciu godzinach kredyty się skończyły, a przebieg zginął w połowie tury razem z całą pracą i zużytymi tokenami.

Newsletter nie opisuje samych pięciu kroków. Podtytuł mówi tylko o pięciu wzorcach projektowych agentów, a reszta jest w filmie na YouTube. Z tego, co widać w mailu, chodzi o trzy rodzaje problemów: koszt, bezpieczeństwo i trwałość stanu po awarii.

**Key takeaways:**
- Długie przebiegi agentów wymagają twardego limitu kosztu, a nie ręcznego doładowywania konta.
- Awaria w środku tury nie powinna kasować dotychczasowej pracy.
- Agent nie powinien mieć bezpośredniego dostępu do poświadczeń.

**Why do I care:** Autor słusznie uderza w to, o czym rzadko mówi się w demach: agent działający godzinami to problem inżynierii niezawodności, a nie promptów. Brakuje tu jednak konkretów, bo z samego maila nie wiadomo, jak wyglądają te pięć kroków ani ile kosztuje trwałość, więc ocenę trzeba odłożyć do obejrzenia wideo. Warto sprawdzić, czy wasz agent przeżyje restart procesu, zanim zostawicie go na noc.

**Link:** [What Makes an AI Agent Indestructible?](https://www.decodingai.com)
