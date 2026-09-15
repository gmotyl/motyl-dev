---
title: "Expo bez Maca, powrót rynku webdev, Zod 4.6 i spór o destylację modeli"
excerpt: "Expo pozwala testować iOS bez Maca, dane CompTIA pokazują odbicie rynku pracy dla developerów, Zod 4.6 przyspiesza walidację nawet 35 razy, a Anthropic oskarża Alibabę o masową destylację Claude'a."
publishedAt: "2026-09-15"
slug: "expo-eas-simulator-webdev-rynek-zod-4-6-destylacja-modeli"
hashtags: "#dailydev #frontend #reactnative #zod #ai #generated #pl"
source_pattern: "daily.dev"
---

## Expo streamuje symulator iOS do przeglądarki, Mac przestaje być wymagany

**TLDR:** Expo wypuściło EAS Simulator, symulator iOS (i emulator Androida) hostowany w chmurze i streamowany do zakładki przeglądarki. Testowanie aplikacji iOS działa teraz z Windowsa czy Linuxa, łącznie z Fast Refresh, bez fizycznego Maca w zasięgu ręki.

**Summary:** EAS Build kompiluje aplikację na infrastrukturze Maców należącej do Expo, a build deweloperski łączy się z Metro przez tunel (`EXPO_UNSTABLE_TUNNEL_V2=1 npx expo start --tunnel` razem z `eas simulator:start`), co daje Fast Refresh w przeglądarce nawet z Windowsa na ARM albo z WSL-a. Panel narzędzi w przeglądarce ma sekcję Camera, która wstrzykuje symulowany feed przez standardowe API AVFoundation, domyślnie animowany wzorzec testowy albo przesłane zdjęcie czy wideo. Sesje da się udostępniać znajomym przez link, a pełny replay nagrywa się jako dowód do PR-a, więc reviewer nie musi wierzyć na słowo, że "u mnie działa".

Ciekawszy wątek to sterowanie symulatorem przez agenty AI. Skill `eas-simulator` instaluje się do Claude Code, Cursora albo Codexa, a agent poprzez `agent-device` albo Argenta buduje aplikację, odpala sesję w chmurze, klika przez ekrany i zwraca screenshoty razem z replayem do przeglądu. Wstrzykiwanie kamery na razie zostaje po stronie przeglądarki i nie jest dostępne dla agentów. Na dziś to limitowany preview z listą oczekujących, nie ogólnodostępna funkcja.

**Key takeaways:**
- EAS Simulator usuwa twardy wymóg posiadania Maca do pracy nad iOS, łącznie z Fast Refresh z Windowsa czy Linuxa.
- Wstrzykiwanie kamery działa z każdą biblioteką korzystającą ze standardowego AVFoundation, bez przepisywania kodu pod testy.
- Skill do Claude Code, Cursora i Codexa pozwala agentowi samodzielnie budować, uruchamiać i weryfikować zmiany na symulatorze, zwracając replay jako dowód.

**Why do I care:** Zespoły React Native bez Maców w zespole frontendowym istniały już wcześniej, tylko musiały polegać na współdzielonym CI albo drogim sprzęcie. Ciekawsze niż sam streaming jest to, że Expo od razu projektuje to pod agentowe workflow, replay sesji jako dowód w PR-ze to dokładnie ten typ artefaktu, którego brakowało przy agentowym QA. Jeśli robicie coś w React Native, warto zapisać się na listę oczekujących, zanim funkcja wyjdzie z bety i zrobi się o niej głośno.

**Link:** [You don't need a Mac to develop iOS apps anymore — Expo blog](https://daily.dev/posts/ZzQwAVqQs)

## Rynek pracy dla webdeveloperów wraca do formy, ale nierówno

**TLDR:** Po fali ponad 152 tysięcy zwolnień w branży tech w 2024 roku i spadku zatrudniania absolwentów o 25%, dane CompTIA pokazują odbicie: liczba ofert pracy dla developerów wzrosła od początku roku o 32,3%, a bezrobocie w tech spadło do 3,5%.

**Summary:** Narracja "webdev umarł" karmiła się realnymi liczbami z 2024 roku, do tego doszły narzędzia AI do kodowania, platformy no-code i zmęczenie kolejnym frameworkiem do nauki. Świeższe dane CompTIA pokazują inny obrazek: oferty pracy dla software developerów rosną, bezrobocie w sektorze spada, a inżynierowie stanowią teraz 55% nowych zatrudnień w największych firmach tech, wobec 46% w 2019 roku. Krajobraz frameworków też się uspokoił, Next.js i podobne defaulty ograniczyły dylemat "czego się uczyć", który wcześniej dokładał się do ogólnego zmęczenia.

Gorzej wygląda to dla świeżych absolwentów. Tylko 20% ofert pracy szuka kogoś z 0-3 latami doświadczenia, wobec 28% szukających 4-7 lat. Rynek odbija, ale premiuje doświadczonych generalistów full-stack, którzy potrafią pracować z narzędziami AI, nie osoby wchodzące dopiero do zawodu.

**Key takeaways:**
- Oferty pracy dla developerów wzrosły o 32,3% od początku roku, bezrobocie w tech spadło do 3,5% według CompTIA.
- Inżynierowie stanowią 55% nowych zatrudnień w największych firmach tech w 2025 roku, wobec 46% w 2019.
- Nowi absolwenci nadal mają pod górkę, tylko 20% ofert celuje w kogoś z 0-3 latami doświadczenia.

**Why do I care:** Jeśli od dwóch lat słyszycie w zespole "po co nam junior, jak agent napisze kod szybciej", te liczby są dobrym kontrargumentem, tylko trzeba go czytać ostrożnie. Rynek rośnie dla doświadczonych ludzi, którzy potrafią pracować z AI, nie dla wszystkich. Dla liderów zespołów to sygnał, żeby inwestować w seniorów umiejących ogarnąć agentowe workflow, a dla juniorów, że droga do pierwszej pracy zostaje trudniejsza niż przed 2024 rokiem, niezależnie od ogólnego odbicia rynku.

**Link:** [is web dev finally back on it's feet??](https://daily.dev/posts/hsSp9jc9T)

## Zod 4.6 przyspiesza walidację i sprząta po awaryjnej łatce 4.5

**TLDR:** Zod 4.6 dodaje metodę `.validate()`, sprawdzającą poprawność danych bez budowania obiektu `ZodError`, nawet 35 razy szybszą niż `.safeParse().success` na skompilowanym schemacie. Do tego kilka realnych poprawek wydajności i kilka drobnych, ale łamiących zmian.

**Summary:** Poza `.validate()` nowa wersja dokłada `.properties()` do `z.instanceof()` dla walidacji instancji klas w miejscu, sześć nowo egzekwowanych słów kluczowych JSON Schema w `fromJSONSchema()`, `z.iban()` z walidacją sumy kontrolnej mod-97, lokalizację tadżycką oraz `z.withParser()` dla środowisk, gdzie Content Security Policy blokuje `new Function`. Na wydajności najwięcej dają: około 3 razy szybsza ścieżka `require` w CommonJS, około 50 razy szybsze odrzucanie błędnych URL-i dzięki `URL.canParse()` w `z.url()`, oraz poprawka wycieku pamięci przy schematach rekurencyjnych, naprawiająca regresję z wersji 4.5, która potrafiła zapchać pamięć.

Kilka zmian formalnie łamie kompatybilność, mimo że wyglądają na drobne poprawki błędów. Mapy błędów uruchamiają się teraz leniwie przy pierwszym odczycie `.error`, `z.emoji()` odrzuca stringi złożone wyłącznie z komponentów, numeryczne enumy w `.options` nie zawierają już odwrotnych mapowań, wzorce base64 zmieniły się, żeby zapobiec przepełnieniu regexa, wzorzec e-mail stracił lookaheady, a łańcuchowane sprawdzenia JSON Schema przestały się wzajemnie nadpisywać.

**Key takeaways:**
- `.validate()` daje szybką ścieżkę walidacji bez kosztu budowania pełnego `ZodError`, do 35 razy szybszą od `.safeParse().success`.
- Poprawka wycieku pamięci przy schematach rekurencyjnych naprawia regresję z 4.5, która realnie powodowała OOM na produkcji.
- Kilka poprawek błędów formalnie łamie kompatybilność, warto przejrzeć changelog przed aktualizacją, nie tylko wgrać `pnpm up zod`.

**Why do I care:** Zod stał się na tyle standardowym elementem stosu TypeScript, że regresja pamięciowa w 4.5 realnie bolała produkcyjne serwisy, a ta łatka to w praktyce sprzątanie po awaryjnej sytuacji. `.validate()` warto rozważyć wszędzie tam, gdzie dziś woła się `.safeParse().success` tylko po to, żeby sprawdzić poprawność bez wyciągania szczegółów błędu, w hot pathach różnica 35x nie jest kosmetyczna.

**Link:** [Zod 4.6](https://daily.dev/posts/acKjp85fC)

## Destylacja modeli AI trafiła na sądową szarą strefę

**TLDR:** Destylacja modeli, czyli trenowanie mniejszego "ucznia" na wyjściach większego "nauczyciela", to standardowa praktyka od czasów Hintona. W 2026 roku zamieniła się w pole bitwy prawnej: Anthropic oskarżył Alibabę o wykorzystanie 25 tysięcy fałszywych kont do wyciągnięcia niemal 29 milionów rozmów z Claude'a w 44 dni.

**Summary:** Klasyczna destylacja Hintona uczyła mniejszy model na złagodzonych rozkładach prawdopodobieństwa większego modelu przez skalowanie temperaturą, to, co Hinton nazwał "ciemną wiedzą". Przy dzisiejszych LLM-ach dominuje inne podejście, destylacja na danych syntetycznych, gdzie nauczyciel generuje tekst, na przykład łańcuchy rozumowania czy kod, a uczeń douczany jest na tych danych. Meta jawnie licencjonowała Llamę 3.1 405B do tego celu, więc sama praktyka nie budzi kontrowersji.

Kontrowersyjna robi się skala i zgoda. OpenAI oskarżyło DeepSeeka, Anthropic oskarżył Qwena od Alibaby, twierdząc, że ten uruchomił około 25 tysięcy fałszywych kont, które w czerwcu 2026 roku w ciągu 44 dni wygenerowały 28,8 miliona wymian z Claude'em, co Anthropic nazywa największą znaną nieautoryzowaną kampanią destylacji przeciwko swoim modelom. Alibaba zaprzeczyła, żaden niezależny audyt ani wyrok sądu nie potwierdził na razie żadnej ze stron. Do tego dochodzi spekulacja wokół kosztu treningu DeepSeeka V3, SemiAnalysis szacuje całkowitą inwestycję DeepSeeka na około 1,3 miliarda dolarów, znacznie powyżej podawanych 5,6 miliona dolarów samego kosztu obliczeniowego z technicznego raportu, co sugeruje, że część efektywności mogła pochodzić właśnie z destylacji cudzych modeli, choć to pozostaje niepotwierdzone.

**Key takeaways:**
- Destylacja na danych syntetycznych, nie klasyczne dopasowanie logitów, to dziś dominujące podejście przy LLM-ach.
- Anthropic oskarża Qwena o 25 tysięcy fałszywych kont i 28,8 miliona wymian z Claude'em w 44 dni, bez potwierdzenia niezależnym audytem.
- Napięcie między udostępnianiem modelu przez API a ochroną go przed replikacją zostaje nierozwiązane, bo żadna ze stron nie ma interesu w transparentności.

**Why do I care:** Jako ktoś budujący produkty na cudzych API warto śledzić te spory nie dla sensacji, tylko dlatego że kończą się zwykle zaostrzeniem warunków użytkowania i limitów API, które dotykają też uczciwych integratorów. Jeśli wasz produkt intensywnie odpytuje jeden model, żeby trenować czy ewaluować inny, to dokładnie ten wzorzec, który teraz trafia pod lupę dostawców.

**Link:** [A Gentle Introduction to Model Distillation](https://daily.dev/posts/MzqZy6IAJ)
