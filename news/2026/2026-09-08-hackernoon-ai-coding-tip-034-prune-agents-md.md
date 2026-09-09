---
title: "HackerNoon: dlaczego trzeba czyścić AGENTS.md tak samo regularnie jak własny kod"
excerpt: "Trzydziesta czwarta część serii AI Coding Tip pokazuje, że pliki AGENTS.md i skille rosną w nieskończoność, bo nikt nie chce usuwać reguły, która kiedyś zadziałała, i proponuje konkretny harmonogram audytu zamiast wiary, że więcej reguł znaczy więcej bezpieczeństwa."
publishedAt: "2026-09-08"
slug: "hackernoon-ai-coding-tip-034-prune-agents-md"
hashtags: "#hackernoon #ai #agents #devtools #claude-code #generated #pl"
source_pattern: "HackerNoon"
---

## AGENTS.md rośnie tylko w jedną stronę, jeśli nikt go nie pielęgnuje

**TLDR:** Każda reguła dodana do AGENTS.md po błędzie agenta zostaje tam na zawsze, nawet jeśli model, który ją sprowokował, już dawno nie istnieje. Autor proponuje regularny audyt, dzielenie pliku na modularne skille i kodowanie krytycznych zasad jako testy zamiast prozy, którą model może zignorować.

**Summary:** Mechanizm jest prosty i znany każdemu, kto choć raz prowadził projekt z asystentem kodującym: agent robi coś źle, dopisujemy regułę, która ma to zablokować, i nigdy jej nie usuwamy, nawet tej sprzed dwóch generacji modelu, która przestała mieć znaczenie w tydzień po dodaniu. Po pół roku plik ma tysiąc linii, z czego połowa łata problemy, których zeszłoroczny model już nie ma, a mimo to cały ten balast jest wczytywany w każdej sesji, jak text-file god object znający każdy błąd, jaki ktokolwiek kiedykolwiek popełnił. Dane przywołane w artykule są konkretne: czerwcowe badanie znalazło wyciek reguł lintera w 62 procentach popularnych repozytoriów, przesyt kontekstu w 42 procentach, a martwe skille, o których nikt nie pamięta, w 35 procentach, mimo że rekomendowany rozmiar pliku to około 200 linii.

Najciekawszy fragment dotyczy tego, dlaczego nikt nie usuwa reguł mimo oczywistego kosztu: usunięcie reguły, która teoretycznie działa, wydaje się ryzykowniejsze niż trzymanie bezużytecznej, a nikogo jeszcze nie awansowano za skasowanie ośmiu linii, których nikt nie czyta. Personalizowane skille zbudowane na historii jednego developera radzą sobie mniej więcej tak samo jak generyczny skill pożyczony od kogoś obcego, więc spersonalizowana preferencja często jest po prostu balastem przebranym za customizację, chyba że dana preferencja faktycznie powtarza się w podobnych zadaniach. Dowód nie jest tylko teoretyczny: Anthropic usunęło ponad 80 procent systemowego prompta Claude Code dla najnowszej generacji modeli bez mierzalnej straty w wewnętrznych testach kodowania, co oznacza, że większość tamtych instrukcji była martwym ciężarem, z którego model dawno wyrósł.

Praktyczna metoda audytu jest konkretna: dla każdej reguły w AGENTS.md sprawdzić, czy zadziałała w ciągu ostatniego miesiąca, a jeśli nie pamiętasz, kiedy ostatnio miała znaczenie, usunąć ją. Zanim faktycznie skasujesz regułę, warto przetestować usunięcie: poprosić agenta o wykonanie zadania z pominięciem lokalnych skilli i instrukcji, na samym modelu i harnessie, i jeśli wynik się broni, reguła nie ciągnęła swojego ciężaru. To, co przetrwa audyt, warto podzielić na modularne skille ładowane tylko wtedy, gdy są potrzebne, albo na zagnieżdżone pliki AGENTS.md dla różnych folderów, a reguły, które muszą obowiązywać zawsze bez wyjątków, lepiej zakodować jako test, hook albo ustawienie uprawnień niż zostawić jako prozę, którą model może zapomnieć.

**Key takeaways:**
- Reguły w AGENTS.md rosną tylko w jedną stronę, bo usunięcie wydaje się ryzykowniejsze niż trzymanie bezużytecznej reguły.
- Czerwcowe badanie: 62% repozytoriów miało wyciek reguł lintera, 42% przesyt kontekstu, 35% martwe skille, mimo rekomendowanego limitu ok. 200 linii.
- Anthropic usunęło ponad 80% systemowego prompta Claude Code bez mierzalnej straty jakości w wewnętrznych testach.
- Praktyczny audyt: sprawdź, czy reguła zadziałała w ostatnim miesiącu; jeśli nie pamiętasz kiedy, usuń ją i przetestuj usunięcie na modelu bez skilli.
- Krytyczne reguły bez wyjątków warto kodować jako test, hook albo uprawnienie, nie zostawiać jako prozę do zapomnienia przez model.

**Why do I care:** Warto potraktować własny AGENTS.md dokładnie tak jak inny kod, który się refaktoryzuje z premedytacją, a nie tylko dopisuje, i zaplanować cykliczny audyt po każdej większej aktualizacji modelu, bo część reguł najprawdopodobniej stała się bezużyteczna z dnia na dzień. Osobiście widzę to jako rozszerzenie starej zasady o długu technicznym na warstwę promptów: dług w AGENTS.md jest równie realny jak dług w kodzie, tylko trudniej go zauważyć, bo nie rzuca błędem kompilacji, tylko cicho zjada budżet kontekstu w każdej sesji.

**Link:** [AI Coding Tip 034 - Stop Hoarding Rules in Your AGENTS.md](https://hackernoon.com/ai-coding-tip-034-stop-hoarding-rules-in-your-agentsmd)
