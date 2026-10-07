---
title: "Trip Twin: skill do Claude'a, który planuje wyjazd dokładnie pod twój styl podróżowania"
excerpt: "The AI Break pokazuje krok po kroku, jak zbudować Trip Twin, skill do Claude'a łączący profil podróżnika, wnioski z poprzednich wyjazdów i tryb planowania na miejscu, żeby skrócić research przed wyjazdem z kilku godzin do kilkunastu minut."
publishedAt: "2026-10-07"
slug: "theaibreak-trip-twin-claude-skill-planowanie-podrozy"
hashtags: "#theaibreak #ai #claude #skills #generated #pl"
source_pattern: "The AI Break"
---

## Trip Twin: skill, który pamięta, jak lubisz podróżować

**TLDR:** Tutorial prowadzi przez budowę Trip Twin, skilla do Claude'a składającego się z profilu podróżnika, pliku z wnioskami z najlepszych i najgorszych dotychczasowych wyjazdów oraz właściwego skilla planującego trasę, budżet, pakowanie i reagującego na zmiany w trakcie podróży. Cały proces konfiguracji ma zająć około 30 minut, a każdy kolejny wyjazd ma dostawać pierwszy szkic planu w około 10 minut.

**Summary:** Punkt wyjścia jest znajomy każdemu, kto kiedykolwiek planował wyjazd: trzydzieści otwartych kart w przeglądarce, trzy sprzeczne ze sobą wpisy na blogach podróżniczych i plan dnia, który każe przemierzać miasto w cztery strony zamiast rozsądnie pogrupować atrakcje według dzielnic. Standardowe pytanie do dowolnego AI o plan na dany kierunek zwraca ten sam top-10 listę, jaką dostanie każdy inny użytkownik, bez żadnej wiedzy o tym, że akurat ty nienawidzisz wczesnych pobudek albo że twoje dzieci nie wytrzymują więcej niż dwóch zaplanowanych atrakcji dziennie.

Rozwiązaniem jest trzyczęściowa struktura. Pierwszy element to Traveler Profile, budowany przez wywiad eleven pytań zadawanych jedno po drugim: kto zwykle podróżuje z tobą, z jakiego miasta wylatujesz, jaki masz styl budżetowy (z konkretnym rozbiciem na to, na co chętnie wydajesz, a czego nigdy nie zapłacisz), ile zaplanowanych aktywności dziennie jeszcze się mieści w "fajne", czy jesteś rannym ptaszkiem, jaki typ zakwaterowania preferujesz, co najbardziej cię kręci (jedzenie, historia, natura, muzea, nocne życie), ograniczenia dietetyczne i alergie, preferowany sposób przemieszczania się, potrzeby związane z mobilnością i zdrowiem, oraz rzeczy, które natychmiast rujnują ci wyjazd, jak tłumy czy długie przejazdy. Wynikiem jest zwięzły blok poniżej 250 słów gotowy do wklejenia w kolejnych krokach.

Drugi element, Travel Lessons, wyciąga wzorce z dwóch do czterech najlepszych i dwóch do czterech najgorszych dotychczasowych wyjazdów, identyfikując trzy wspólne cechy udanych podróży, trzy błędy planowania stojące za nieudanymi, oraz przekuwając to na sześć do ośmiu konkretnych reguł planowania zapisanych jako instrukcje zaczynające się od czasownika, na przykład "ogranicz zmianę hotelu do raz na tydzień". Dopiero na tej podstawie powstaje właściwy skill, trip-twin, z pięcioma trybami: wyborem kierunku, planowaniem dni pogrupowanych według dzielnic zamiast losowej trasy, budżetowaniem, pakowaniem dopasowanym do pogody i składu grupy, oraz trybem "na miejscu" reagującym na sytuacje w rodzaju "pada deszcz, dzieciaki mają dość, co teraz".

Autorka dorzuca też szósty element, Post-Trip Debrief, zamykający pętlę: każdy kolejny wyjazd aktualizuje Travel Lessons o nowe obserwacje, więc skill z czasem staje się coraz trafniejszy, zamiast zaczynać od zera za każdym razem. Cały materiał jest dostarczony jako gotowe do skopiowania prompty, które użytkownik wkleja bezpośrednio w rozmowę z Claude'em, co w praktyce oznacza brak potrzeby pisania czegokolwiek od zera.

**Key takeaways:**
- Trip Twin składa się z trzech warstw: Traveler Profile, Travel Lessons z poprzednich wyjazdów, i właściwy skill z pięcioma trybami planowania
- Wywiad budujący profil podróżnika zadaje jedenaście pytań jedno po drugim, z dopytywaniem przy niejasnych odpowiedziach
- Travel Lessons wyciąga trzy wspólne cechy udanych wyjazdów i trzy błędy ze złych, przekuwając je na sześć do ośmiu reguł planowania
- Konfiguracja zajmuje około 30 minut jednorazowo, każdy kolejny wyjazd dostaje pierwszy szkic planu w około 10 minut

**Why do I care:** To dobry, konkretny przykład na to, jak "pamięć" w agentowym AI realnie wygląda w praktyce bez żadnej magii technicznej: zwykłe pliki tekstowe z profilem i wnioskami, które skill czyta przy każdym uruchomieniu. Dla kogoś budującego własne narzędzia agentowe w pracy to wzorzec warty skopiowania bezpośrednio, bo ten sam schemat (profil plus wnioski z historii plus skill operacyjny) działa równie dobrze dla onboardingu klienta, playbooków wsparcia technicznego czy dowolnego innego zadania, gdzie kontekst z przeszłości realnie poprawia jakość odpowiedzi.

**Link:** [Tutorial: Build a Trip Planner Claude Skill (Your Travel Style, Remembered)](https://theaibreak.substack.com/p/tutorial-build-a-trip-planner-claude)
