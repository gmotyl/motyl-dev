---
title: "daily.dev: Linux w WebAssembly, Expo brownfield, RemotionUI i animowane ikony React"
excerpt: "Jądro Linuksa skompilowane do WebAssembly, nowy pakiet expo-brownfield oraz dwie biblioteki dla Reacta: komponenty ruchu do Remotion i animowane ikony."
publishedAt: "2026-11-23"
slug: "daily-dev-unkernel-expo-brownfield-remotionui-animateicons"
hashtags: "#dailydev #frontend #webassembly #react-native #expo #react #animation #generated #pl"
source_pattern: "daily.dev"
---

## unkernel: prawdziwe jądro Linuksa w jednym module WebAssembly

**TLDR:** Projekt unkernel kompiluje jądro Linuksa do pojedynczego modułu WebAssembly z pełnym MMU. System startuje do powłoki w niespełna sekundę i uruchamia niezmodyfikowane binaria aarch64.

Pomysł jest prosty do opisania i trudny do zrobienia. Zamiast emulować cały komputer, autor skompilował samo jądro do WebAssembly i dołożył obsługę pamięci wirtualnej. Programy użytkownika działają bez zmian jako binaria aarch64, więc pakiety z Alpine czy Debiana uruchamiają się tak, jak są. Jądro dochodzi do procesu init w około 70 milisekund.

Liczby są ciekawe. Sekwencja fork, exit i wait zajmuje około 60 mikrosekund, natywnie to 70, a w QEMU 1,2 milisekundy. Do tego dochodzi kompilator JIT, który gorący kod użytkownika tłumaczy w locie na wasm. Pętla w powłoce przyspiesza dzięki niemu 1,6 raza, a sortowanie 2,3 raza względem samego interpretera. Projekt ma licencję GPL-2.0 i MIT, stoi za nim Pooya Parsa, a sponsoruje go Vercel.

Warto zapytać, czego opis nie mówi. Nie ma tu słowa o izolacji bezpieczeństwa względem przeglądarki, o obsłudze sieci i systemu plików w realnych obciążeniach ani o tym, ile pamięci zjada taka instancja. Benchmark fork-exit-wait jest też mikrotestem, który niewiele mówi o typowej pracy.

**Key takeaways:**
- Prawdziwe jądro Linuksa działa jako jeden moduł wasm z pełnym MMU.
- Start do powłoki zajmuje poniżej sekundy, do init około 70 ms.
- JIT do wasm daje 1,6 raza szybszą pętlę powłoki i 2,3 raza szybsze sortowanie.

**Why do I care:** Dla frontendowca to przede wszystkim sygnał, że przeglądarka coraz poważniej nadaje się na środowisko uruchomieniowe dla całych systemów. Widzę tu zastosowania w piaskownicach dla agentów AI, edytorach w przeglądarce i szybkich środowiskach do nauki. Zanim zbudujesz na tym produkt, sprawdź model bezpieczeństwa i koszt pamięci, bo na razie to imponujące demo z dobrymi liczbami.

**Link:** [GitHub - pithings/unkernel](https://daily.dev/posts/IfmDp5QW3)

## Nie potrzebujesz przepisywać aplikacji: nowa historia Expo dla brownfield

**TLDR:** Pakiet expo-brownfield ułatwia dodanie React Native do istniejących aplikacji natywnych na iOS i Androida. SDK 55 wprowadza tryb izolowany, w którym kod React Native staje się zwykłą natywną biblioteką.

Od Expo SDK 54 nie trzeba już przebudowywać struktury katalogów, żeby osadzić ekrany React Native obok natywnych. Zespół przeszedł też przez wszystkie pakiety Expo i naprawił ich zgodność z aplikacjami brownfield. Wcześniej wybierało się między ekosystemem Expo a integracją z istniejącym kodem natywnym, teraz ten kompromis zniknął.

Największa zmiana przychodzi z SDK 55. Obok trybu zintegrowanego, w którym kod React Native leży w repozytorium aplikacji natywnej, pojawił się tryb izolowany. React Native żyje wtedy w osobnym repozytorium, a komenda budująca pakuje go do natywnej biblioteki. Inżynierowie natywni dodają ją jak każdą zewnętrzną zależność i nie muszą instalować Node, yarna ani Metro. Osobne zespoły zachowują własny rytm wydań.

Część rutynowej konfiguracji przejmuje umiejętność dla agenta, wystarczy polecić mu dodanie Expo do aplikacji. Zespół Expo postawił sobie cel integracji React Native w stu otwartoźródłowych aplikacjach natywnych. Autor nie wspomina za to o narzucie na rozmiar aplikacji, o kosztach utrzymania dwóch łańcuchów narzędzi ani o tym, jak wygląda debugowanie na granicy dwóch światów.

**Key takeaways:**
- expo-brownfield działa bez przebudowy katalogów od SDK 54.
- Tryb izolowany z SDK 55 pakuje React Native jako natywną bibliotekę.
- Natywni inżynierowie nie muszą ruszać Node ani Metro.

**Why do I care:** Jeśli pracujesz w firmie z dużą aplikacją natywną, to najtańsza droga do współdzielenia ekranów z webem i React Native bez wielkiego przepisywania. Tryb izolowany rozwiązuje też problem polityczny, bo zespół natywny nie musi uczyć się całego stosu JavaScript. Zrób najpierw mały pilotaż na jednym ekranie i zmierz rozmiar paczki oraz czas startu.

**Link:** [You Don’t Need a Rewrite: Expo’s New Brownfield React Native Story](https://daily.dev/posts/58dLgMHDI)

## RemotionUI: 217 komponentów ruchu, które kopiujesz do repozytorium

**TLDR:** RemotionUI to biblioteka 217 komponentów animacji dla kompozycji wideo w Remotion. Kod instaluje się przez CLI jako źródło w twoim repo, bez zależności uruchomieniowej.

Model jest podobny do shadcn. Dodajesz komponent komendą, a jego kod ląduje u ciebie i możesz go dowolnie zmieniać. Praca składa się z trzech kroków w terminalu: inicjalizacja projektu, dodanie kompozycji i eksport do MP4, bez edytora wideo. Strona pokazuje klatki jako prawdziwą kompozycję uruchomioną w przeglądarce, a przesuwając kursor, przewijasz animację.

Dla zespołów, które generują wideo z kodu, na przykład materiały produktowe, podsumowania czy filmy z danymi, to oszczędza sporo czasu. Z opisu nie wynika jednak, jak komponenty zachowują się przy dłuższych filmach, jaka jest jakość dokumentacji ani kto utrzymuje projekt.

**Key takeaways:**
- 217 komponentów ruchu dla Remotion.
- Kod kopiowany do repozytorium, bez runtime'owej zależności.
- Trzy kroki CLI od inicjalizacji do pliku MP4.

**Why do I care:** To raczej narzędzie dla twórców wideo z kodu niż codzienna praca frontendowa, ale podejście z własnością źródeł jest dobrym wzorcem. Przy wideo generowanym automatycznie, na przykład przez agenta, gotowe komponenty ruchu skracają drogę do sensownego efektu.

**Link:** [RemotionUI – Production-ready motion for Remotion](https://daily.dev/posts/df4ozGGXT)

## 542 darmowe animowane ikony React

**TLDR:** AnimateIcons to 542 otwartoźródłowe, animowane ikony SVG dla Reacta zbudowane na Lucide i Motion. Animacje na poziomie ścieżek włączają się po najechaniu, fokusie albo z kodu.

Biblioteka łączy dwa systemy, zestaw ikon Lucide i framework animacji Motion. Ikony da się tree-shakować, działają z komponentami serwerowymi Reacta i respektują ustawienie ograniczonego ruchu w systemie. Instaluje się je przez npm albo przez CLI shadcn.

Dobrze, że dbają o dostępność i rozmiar paczki, bo animowane ikony łatwo zepsuć obiema rzeczami naraz. Nie wiadomo natomiast, ile kosztuje w runtime setka animowanych ikon na jednej stronie ani jak zachowują się na słabych urządzeniach.

**Key takeaways:**
- 542 ikony oparte na Lucide i Motion.
- Zgodność z tree-shakingiem, RSC i reduced motion.
- Instalacja przez npm albo shadcn CLI.

**Why do I care:** To drobiazg, który poprawia wrażenie interfejsu małym kosztem. Użyj go oszczędnie, w miejscach, gdzie animacja niesie informację, jak stan zapisu czy przełączenie, i zmierz wpływ na wydajność przed wdrożeniem na szeroką skalę.

**Link:** [542+ Free Animated React Icons](https://daily.dev/posts/3CT9N6Osh)
