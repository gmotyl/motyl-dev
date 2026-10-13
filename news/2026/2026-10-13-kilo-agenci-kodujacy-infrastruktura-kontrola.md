---
title: "Kilo: gdy agenci kodujący stają się infrastrukturą, trzeba mieć nad nimi kontrolę"
excerpt: "Po sprzedaży technologii Augment firmie Harness autor Kilo przekonuje, że przy agentach kodujących liczy się otwartość i przenośność konfiguracji."
publishedAt: "2026-10-12"
slug: "kilo-agenci-kodujacy-infrastruktura-kontrola"
hashtags: "#kilo #ai #agents #devtools #open-source #generated #pl"
source_pattern: "Kilo"
---

## Agenci kodujący jako infrastruktura i kontrola po stronie zespołu

**TLDR:** Augment sprzedał Harness technologie Cosmos, Auggie CLI i Code Context Engine. Autor z Kilo na tej podstawie argumentuje, że im głębiej agent wrasta w proces, tym ważniejsza jest możliwość zmiany modelu i narzędzia bez utraty włożonej pracy.

**Summary:** Punktem wyjścia jest ogłoszenie Augmenta, że jego produkty i zespół trafiają do Harness, bo w szerszej platformie dotrą do większej liczby klientów. Autor widzi w tym sygnał kierunku rynku: agenci biorą na siebie więcej pracy, więc łączą się z coraz większą liczbą systemów wokół. To zwiększa wartość integracji, ale też znaczenie kontroli.

Opisuje typową drogę zespołu. Najpierw prosi się narzędzie o wyjaśnienie funkcji, potem dodaje instrukcje zespołu, łączy z trackerem zadań, konfiguruje środowisko testów i uczy, jak wygląda dobry pull request. Część tej inwestycji leży w repozytorium, część w konfiguracji, a część może leżeć w usłudze dostawcy. Zmiana agenta wymaga wtedy ustalenia, ile z tej pracy da się zabrać.

Autor chwali Harness za deklarację, że klienci mogą dalej używać preferowanych narzędzi, i zaleca sprawdzać tę obietnicę w praktyce. Kilo przedstawia jako otwarte, wielodostawcowe, z własnymi kluczami i modelami lokalnymi. Radzi też prosty test: przepuść jeden prawdziwy proces przez agenta, a potem zmień model, instrukcję, sprawdź wywołane narzędzia i ustal, gdzie leży konfiguracja.

**Key takeaways:**
- Wybór agenta kodującego to wybór zależności w procesie wytwarzania, a nie rozszerzenia do autouzupełniania.
- Warto wiedzieć, gdzie żyją instrukcje i co zapamiętują integracje.
- Test przenośności: zmień model i zobacz, co zostaje.

**Why do I care:** Rada jest sensowna, ale autor sprzedaje własny produkt i traktuje otwartość jako samo dobro. Pomija koszt: własne klucze, modele i konfiguracja to też praca operacyjna, a hostowane usługi Kilo mają własne zależności, o których sam mówi tylko ogólnie. Dla architekta praktyczny wniosek jest jeden. Trzymajcie instrukcje agenta w repozytorium, w formacie niezależnym od dostawcy, i traktujcie to jak kod.

**Link:** [As coding agents become infrastructure, builders need more control](https://blog.kilo.ai/p/as-coding-agents-become-infrastructure)
