---
title: "Ludzki osąd nie znika z fabryki softwaru. Przenosi się gdzie indziej"
excerpt: "Addy Osmani opisuje, czym jest software factory, kiedy w ogóle jej potrzebujesz, i dlaczego weryfikacja, nie generowanie kodu, pochłania większość uwagi w systemie, gdzie agenty piszą coraz więcej, a Ty wciąż odpowiadasz za to, co trafia na produkcję."
publishedAt: "2026-08-22"
slug: "addy-osmani-software-factory-human-judgment-relocates"
hashtags: "#AddyOsmani #ai #agents #softwareengineering #architecture #devops #generated #pl"
source_pattern: "Addy Osmani"
---

## Ludzki osąd nie znika z fabryki softwaru, tylko się przenosi

**TLDR:** Software factory to powtarzalna pętla wokół pracy programistycznej, ale nawet w pełni zautomatyzowanej wersji kod wystarczająco dobry, żeby wypuścić, wciąż potrzebuje ludzkiego smaku i własności. Autor tłumaczy, kiedy naprawdę potrzebujesz fabryki, a kiedy zwykły harness typu Claude Code wystarczy.

**Summary:** Punktem wyjścia jest szczera obserwacja: w wielu przypadkach dobry harness (Claude Code albo Codex), dobre specyfikacje z wbudowaną weryfikacją i ograniczeniami, wystarczają, nawet jeśli rzucisz w to całą paczkę issues z GitHuba naraz. Fabryka staje się przydatna dopiero wtedy, gdy potrzebujesz kolejki zdarzeń (triggery ze Slacka, issues z GitHuba, Linear, backlog), która uruchamia pracę w izolowanym środowisku chmurowym, z jawnym ludzkim nadzorem nad triage, implementacją i testowaniem. Przykład, który Osmani przytacza od Warp: każde nowe zgłoszenie trafia do jednego z czterech stanów, gotowe-do-implementacji, gotowe-do-specyfikacji, potrzebuje-informacji, czekaj-z-implementacją, a etykieta jest jednocześnie kolejką, blokadą i miejscem, gdzie człowiek może zaparkować coś bez trwałej odmowy.

Weryfikacja pochłania większość czasu odpowiedzialnej fabryki, i to tutaj Osmani jest najbardziej konkretny. Testy trzeba mieć prawdziwe, nie podsumowania, ale trzeba budżetować je jak budżet wydajności: szybkie sprawdzenia (linting, type checking) uruchamiasz wcześnie, cięższe (pełna suita testów, mutation testing, testy przeglądarkowe, skanery bezpieczeństwa) bliżej draft PR-a. W jego własnym eksperymencie z aplikacją do filmów, wyszukiwarka bez odrzuceń zajęła 7 minut, a funkcja ulubionych, z dwoma odrzuceniami i ludzką decyzją w środku, zajęła 56 minut, ten sam factory. Sortowanie wyników na "success", "flawed", "blocked", "manual", wzorem Vercela, nic nie mówi o koszcie, dlatego warto parować taksonomię z timingiem na etap, inaczej wiesz, że przebieg wrócił jako "flawed", ale nie wiesz, ile cię to kosztowało, żeby się o tym dowiedzieć.

Osmani dzieli się też osobistą wpadką: dodał funkcję ulubionych, testy przeszły, zmergował, a kilka dni później wrócił do kodu, żeby coś poprawić, i nie potrafił wytłumaczyć, jak ta funkcja działa, mimo że to był jego własny commit w jego własnym repo. Zrozumienie nie nadążało za tempem generowanego kodu. Nazywa to długiem komprehensji, i twierdzi, że przy równoległej pracy z wieloma agentami naraz ten problem się mnoży, bo tworzysz kilka mentalnych modeli, które stygną, gdy pracujesz gdzie indziej. Radzi prosić agenta, żeby zapisywał informacje o swojej trajektorii i lekcjach z podejścia do problemu, żeby dało się do tego wrócić później, zamiast liczyć na pamięć albo przewijanie skompaktowanej sesji czatu.

Cała reszta artykułu spina się w jedną zasadę: procent kodu fizycznie wpisanego przez ludzi może drastycznie spaść, ale własność ludzka nie musi spadać razem z nim. Ktoś wciąż wybiera problem, architekturę, poprzeczkę jakości, decyduje, którym sygnałom weryfikacji ufać, i decyduje, kiedy dowodów jest wystarczająco, żeby wypuścić. Kiedy system zawiedzie, "agent to napisał" nie jest wytłumaczeniem.

**Key takeaways:**
- Software factory ma sens dopiero przy zdarzeniowej kolejce pracy z jawnym nadzorem, nie przy zwykłym harnessie typu Claude Code czy Codex.
- Weryfikację warto budżetować jak performance budget: szybkie sprawdzenia wcześnie, ciężkie testy bliżej draft PR-a.
- Sam wynik ("success", "flawed", "blocked", "manual") nic nie mówi o koszcie, potrzebny jest timing na każdy etap.
- Dług komprehensji rośnie wraz z liczbą równoległych sesji agentów, bo mentalne modele stygną, gdy nie jesteś przy nich obecny.

**Why do I care:** To jest jeden z niewielu tekstów o software factory, który uczciwie przyznaje, że nie każdy projekt jej potrzebuje, i który daje konkretną, mierzalną radę zamiast ogólników o "budowaniu z agentami". Dług komprehensji to realne ryzyko, które widziałem u siebie: łatwo zmergować coś, co "testy pokazują jako działające", i stracić zdolność wytłumaczenia tego kodu koledze z zespołu tydzień później. Rada, żeby agent zapisywał trajektorię i uzasadnienie decyzji, jest banalnie prosta, ale w praktyce rzadko robiona, a rozwiązuje dokładnie ten problem, że kod przechowuje decyzję, ale nie przechowuje, dlaczego ją podjęto.

**Link:** [Human judgment doesn't leave the software factory. It relocates.](https://addyo.substack.com/p/human-judgment-doesnt-leave-the-software)
