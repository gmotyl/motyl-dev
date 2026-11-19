---
title: "Refactoring: dla nas AI w końcu działa, czyli boty jako szefowie obszarów w projekcie Tolaria"
excerpt: "Luca Rossi opisuje, jak mały zespół Tolaria zbudował strukturę botów: szefów sztabu, menedżerów obszarów i botów produktowych, które razem podnoszą jakość bez dokładania pracy ludziom."
publishedAt: "2026-11-18"
slug: "refactoring-ai-w-koncu-dziala-boty-menedzerowie-tolaria"
hashtags: "#refactoring #ai #agents #productivity #teams #workflow #open-source #generated #pl"
source_pattern: "🌀 Refactoring"
---

## Dla nas AI w końcu działa

**TLDR:** W miesięcznym podsumowaniu pracy z AI autor twierdzi, że po raz pierwszy agenci realnie podnieśli poziom pracy małego zespołu. Pomogła im struktura trzech rodzajów botów obok ludzi.

**Summary:** Najważniejsza wiadomość miesiąca nie jest funkcją produktu. Zespół pracujący nad Tolarią uznał, że AI zaczęło dostarczać wartość: robią więcej, na wyższym poziomie jakości, bez zwiększania obciążenia żadnego człowieka. Wcześniej autor nie mógł tego powiedzieć o żadnym narzędziu AI. Efektem ubocznym jest dużo własnego oprogramowania, od narzędzi wewnętrznych po samą Tolarię i grę, o której jest bonus na końcu.

Całość trzyma się na trzech rodzajach botów i ludziach. Każdy w zespole ma bota typu chief of staff. Każdy obszar biznesowy, który zasługuje na ciągłą opiekę, ma bota menedżera obszaru. Oprogramowanie, które budują, ma boty produktowe. Nad tym stoją ludzcy właściciele obszarów. Autor opisuje osiem wzorców współpracy w trzech grupach. Pierwsza to zarządzanie obszarami: szkice robi się do wszystkiego, każdy ma swojego szefa sztabu, a obszary mają menedżerów. Druga to boty budujące własne narzędzia: własne narzędzia jako powierzchnia współpracy, boty PM, które je budują, i pętla zwrotna między obszarami a PM-ami. Trzecia to wiedza, która ma przeżyć boty: wspólna baza w Tolarii i cotygodniowe retrospektywy prowadzone przez bota-biografa.

Autor wymienia też narzędzia, które dają mu niemal pełny spokój o to, że nie patrzy już w kod: CodeScene z progiem 10/10 jako bramką, Codacy z Verity do przeglądów w pętli agenta, Unblocked do szukania kontekstu oraz CircleCI, które skróciło CI z 15 do poniżej 4 minut. Część z nich to partnerzy projektu, więc trzeba to czytać z tą świadomością. Na koniec zapowiada wersję webową Tolarii i grę z otwartym światem, w której każda postać to AI.

Czego tu brakuje? Twierdzenie, że nikt nie patrzy w kod, opiera się na bramkach jakości, ale nie ma żadnych liczb o tym, ile defektów mimo to przechodzi. Nie ma też słowa o koszcie tokenów dla całej armii botów i o tym, co się dzieje, gdy boty się mylą wzajemnie. Zespół jest mały i wąski, więc skalowanie tego wzorca na większą organizację to osobne pytanie.

**Key takeaways:**
- Rola bota przypisana do obszaru, a nie do zadania, daje ciągłość pracy.
- Szkice robione przez boty skracają drogę do decyzji człowieka.
- Wiedza zapisana we wspólnej bazie i retrospektywy sprawiają, że wiedza przeżywa konkretne boty.

**Why do I care:** Struktura właściciel plus bot menedżer obszaru jest łatwa do skopiowania w zespole frontendowym, na przykład dla design systemu czy dokumentacji. Spróbowałbym tego na jednym obszarze, zanim uwierzę w całość. Mierzalne bramki jakości w CI są tu częścią, która sprawdzi się u każdego.

**Link:** [For us, AI is finally delivering](https://refactoring.fm/p/for-us-ai-is-finally-delivering)
