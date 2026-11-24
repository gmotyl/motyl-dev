---
title: "Trzech dostawców AI przechwytywało prompty, a agent od wsparcia klienta w trzech krokach"
excerpt: "Dragos wykrył trzech pośredników AI kradnących prompty i klucze AWS, a The AI Break pokazuje, jak zbudować agenta obsługującego maile klientów."
publishedAt: "2026-11-23"
slug: "ai-break-trzech-dostawcow-ai-kradnie-prompty-agent-wsparcia"
hashtags: "#theaibreak #ai #security #llm #agents #claude #generated #pl"
source_pattern: "The AI Break"
---

## Trzech dostawców AI przechwytywało prompty i klucze

**TLDR:** Firma Dragos wysłała około dwóch milionów testowych promptów z fałszywymi hasłami przez różnych dostawców modeli. Co najmniej trzech z nich kradło dane, a OpenRouter wyrzucił ich wszystkich.

**Summary:** Badacze z Dragos zrobili prosty eksperyment. Wysłali przez usługi pośredniczące w dostępie do modeli około dwóch milionów promptów zawierających sfabrykowane hasła i klucze. Potem czekali, czy ktoś ich użyje. Użył. Co najmniej trzech dostawców czytało ruch i wykorzystało skradzione dane, a kilkaset wykradzionych kluczy AWS posłużyło do dziesiątek tysięcy wywołań. OpenRouter usunął wszystkich trzech z platformy.

Autorzy newslettera wyciągają z tego wniosek praktyczny: tanie tokeny mają ukrytą cenę. Jeśli twoje narzędzia przepuszczają dane klientów albo klucze API przez taniego reselera, ktoś po drodze mógł to przeczytać. Dla wszystkiego, co zawiera dane wrażliwe, zalecają łączenie się bezpośrednio z dużymi laboratoriami. Sami uruchamiają swoich osiem agentów prosto na Claude właśnie z tego powodu.

W tym samym wydaniu są krótkie wzmianki o potwierdzonym przez matematyków dowodzie hipotezy Riemanna wspomaganym przez Claude, o otwartym modelu kodującym Inkling 2 Mini od Thinking Machines, który ma uruchamiać się na Macu, oraz o ograniczeniach zrzutów ekranu w Signal. To migawki bez głębi, więc traktuję je jako sygnały, nie jako analizę.

Brakuje mi tu jednej rzeczy. Newsletter mówi "idź bezpośrednio do laboratorium", ale nie pyta, ile zespołów w ogóle wie, którędy płynie ich ruch. Problemem rzadko jest sam wybór dostawcy. Częściej to brak inwentarza tego, co do jakiego modelu trafia.

**Key takeaways:**
- Dragos potwierdził, że część pośredników AI aktywnie wykorzystuje przechwycone dane, w tym klucze AWS.
- OpenRouter usunął trzech dostawców po ujawnieniu sprawy.
- Dane klientów i sekrety lepiej wysyłać bezpośrednio do dużych laboratoriów niż przez tanich resellerów.

**Why do I care:** To jest przede wszystkim historia o bezpieczeństwie łańcucha dostaw, ale dotyka frontendowca bardziej, niż się wydaje. Każdy, kto wpina w aplikację bramkę do modeli dla oszczędności, powinien zapytać, co jest w promptach: logi, tokeny, dane użytkowników. Ja bym dodał do przeglądu architektury punkt "którędy płyną prompty", obok CORS-a i trzymania sekretów. Tanio kończy się tam, gdzie zaczyna się wyciek.

**Link:** [3 AI Providers Caught Stealing Your Prompts](https://theaibreak.substack.com/p/3-ai-providers-caught-stealing-your)

## Agent obsługujący klientów w Claude Project

**TLDR:** Wydanie zawiera darmowy pierwszy krok tutoriala o agencie, który czyta maile wsparcia, szkicuje odpowiedzi z własnych notatek i eskaluje sprawy wściekłe, prawne albo finansowe do człowieka.

**Summary:** Pierwszy krok jest prosty. Wklejasz brief z tutoriala jako instrukcje projektu, bo to opis stanowiska agenta. Potem otwierasz folder wysłanych wiadomości i wyciągasz dziesięć najczęściej zadawanych pytań razem z odpowiedziami, których już udzielasz. To będą notatki pomocy. Kroki dwa i trzy dotyczą kontekstu i codziennej rutyny, a krok czwarty, harmonogram działający przez cały dzień, jest dostępny tylko w wersji PRO.

Ciekawsza jest sekcja zza kulis. Autorzy prowadzą ośmiu agentów, którzy w zeszłym tygodniu wykonali 621 akcji. Agent od komentarzy na Substacku zaczął nagle generować identyczne, dziwne komentarze. Naprawa polegała na tym, że komentarz to teraz jedno lub dwa ciepłe zdania, nazwa własna może się pojawić najwyżej w co trzecim, a kod blokuje frazy otwierające i wszystko powyżej 200 znaków. Wniosek: agent powtarza to, co zadziałało ostatnio, więc nawyk trzeba zablokować w konfiguracji, nie tylko w instrukcji.

Druga lekcja pochodzi z pytania czytelnika. Odrzucenie szkicu bez powodu niczego agenta nie uczy. U autorów każda odmowa ma uzasadnienie, które agent zapisuje w swoim pliku reguł z datą i czyta przed każdym uruchomieniem.

Pominąłem sponsorowany blok o Persado oraz kampanię Black Friday, bo to reklamy.

**Key takeaways:**
- Dobre notatki pomocy zaczynają się od dziesięciu najczęstszych pytań z folderu wysłanych.
- Zakazy zachowań agenta powinny siedzieć w kodzie, nie tylko w prompcie.
- Odrzucenie szkicu z uzasadnieniem zapisanym w pliku reguł naprawia błąd raz, a nie co poniedziałek.

**Why do I care:** Dla architekta to praktyczny wzorzec: instrukcje to miękka warstwa, a twarde ograniczenia należą do kodu. Widzę to samo w projektach, gdzie ktoś prosi model w prompcie o niepisanie czegoś, a potem się dziwi. Warto też zauważyć, co autorzy pomijają: nie mówią nic o tym, jak mierzą jakość odpowiedzi poza własnym wrażeniem.

**Link:** [The AI Break, wydanie z 23 listopada](https://theaibreak.substack.com/p/3-ai-providers-caught-stealing-your)
