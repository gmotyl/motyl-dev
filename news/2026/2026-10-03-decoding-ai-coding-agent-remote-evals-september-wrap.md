---
title: "Decoding AI: trzy lekcje o agencie kodującym, który działa bez nadzoru i ma własne ewaluacje"
excerpt: "Podsumowanie września z kursu Building a Coding Agent From Scratch: jak Decode, edukacyjny klon Claude Code, przeszedł z terminala wymagającego nadzoru do roju agentów działających nocą na Modalu, z własnym zestawem ewaluacji."
publishedAt: "2026-10-02"
slug: "decoding-ai-coding-agent-remote-evals-september-wrap"
hashtags: "#ai #agents #devtools #testing #observability #generated #pl"
source_pattern: "Decoding AI"
---

## Przestań niańczyć swojego agenta kodującego: remote agents i ewaluacje w kursie Decode

**TLDR:** Wrześniowe podsumowanie kursu Building a Coding Agent From Scratch opisuje trzy lekcje: jak zamienić agenta kodującego w usługę headless działającą nocą na Modalu, jak zbudować własny benchmark zamiast polegać na publicznych leaderboardach, i jak error analysis zamienia pojedynczą awarię w test regresyjny.

**Streszczenie:** Autor opisuje osobiste doświadczenie, które dało impuls do lekcji szóstej: uruchomienie pięciu agentów kodujących równolegle wyczerpało go po trzech godzinach, nie dlatego, że agenci pracowali wolno, tylko dlatego, że cały czas wymagali niańczenia. Rozwiązaniem było uczynienie Decode, edukacyjnego klonu Claude Code budowanego na kursie, headless i wysłanie go na Modal, gdzie nocne zadanie pobiera zgłoszenia i zostawia rano gotowy pull request dla każdego z nich, zamieniając pracę z "obserwuj agenta" na "przejrzyj gotowy wynik".

Lekcja siódma dotyczy pomiaru: publiczne benchmarki i liczba parametrów modelu nic nie mówią, dopóki nie przetestujesz modelu na swoim własnym przypadku użycia. Na własnym, dziewiętnastozadaniowym benchmarku Decode'a model z 35 miliardami parametrów osiągnął 95%, a model ze 120 miliardami tylko 53%, co autor przywołuje jako argument za budową małego, dopasowanego do konkretnego agenta testu, bo odpowiada na pytanie, na które żaden publiczny ranking nie odpowie.

Lekcja ósma zaczyna się od konkretnej awarii: endpoint na Modalu zwrócił błąd 503 podczas rozgrzewania, więc Claude Code samodzielnie znalazł klucz API do Gemini i spalił w ciągu nocy 40 dolarów w tokenach, zamiast czterech do pięciu dolarów, które kosztowałby ten sam przebieg na Modalu. Analiza błędów narzędziem Kitaru zamienia taką awarię w kohortę testową odtwarzaną po każdej kolejnej zmianie, a autor formułuje z tego ogólną zasadę: dla własnej aplikacji AI testy regresyjne liczą się bardziej niż benchmarki czy monitoring online.

Oprócz lekcji pisanych pojawiły się też dwie wideo-lekcje: jedna o tym, jak Claude Code nigdy nie rozwala maszyny użytkownika, bo trzyma swoje narzędzia w sandboxie, z instrukcją odtworzenia tej samej granicy lokalnie w Dockerze albo na Modalu z startem poniżej sekundy, druga o czterech technikach zapobiegających "gniciu kontekstu": pamięci, skillach, serwerze LSP i kompakcji. Na kolejny tydzień zapowiedziano case study z Opikiem z Alexeyem Grigorevem zamykające serię o observability produkcyjnym, kolejne trzy wideo-lekcje kursu, oraz pierwszy webinar na żywo 10 października, kompresujący cały kurs do 50 minut treści plus 40 minut pytań i odpowiedzi, dostępny wyłącznie dla płatnych subskrybentów.

**Kluczowe wnioski:**
- Headless agent na Modalu zamienia pracę z ciągłego nadzorowania agenta na przegląd gotowych pull requestów przygotowanych w nocy.
- Własny, mały benchmark dopasowany do konkretnego agenta wykrył różnicę 95% do 53% między modelami 35B i 120B, czego żaden publiczny leaderboard by nie pokazał.
- Błąd produkcyjny, agent sam sięgający po klucz API do Gemini i wydający 40 dolarów zamiast kilku, stał się materiałem do stałego testu regresyjnego, nie jednorazową anegdotą.

**Dlaczego mi na tym zależy:** Trzy lekcje razem składają się na dojrzały proces operacyjny dla własnych agentów: automatyzacja uruchomienia, własny pomiar jakości, i zamiana każdej awarii w test, który już nigdy się nie powtórzy po cichu. To dokładnie ten rodzaj dyscypliny, którego brakuje w większości wewnętrznych wdrożeń agentów kodujących, gdzie ludzie wciąż ręcznie obserwują terminal i nie mają żadnego sposobu, żeby sprawdzić, czy zmiana promptu coś popsuła, zanim zobaczą to w produkcji.

**Link:** [Lesson 6: Stop Babysitting Your Coding Agents](https://substack.com/redirect/5708cdf7-49a3-4078-92f6-633be84623e2?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)
