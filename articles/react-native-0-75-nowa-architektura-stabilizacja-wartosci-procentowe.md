---
title: "React Native 0.75 wprowadza stabilizację nowej architektury i wsparcie dla wartości procentowych"
excerpt: "Przegląd najważniejszych zmian w React Native 0.75, w tym stabilizacja nowej architektury, wsparcie dla wartości procentowych w układzie i zalecenia dotyczące używania frameworków."
publishedAt: "2024-12-19"
slug: "react-native-0-75-nowa-architektura-stabilizacja-wartosci-procentowe"
hashtags: "#generated #pl #react-native #mobile #architecture #yoga #layout #expo #framework #performance"
---

## React Native 0.75 - Stabilizacja Nowej Architektury i wsparcie dla wartości procentowych

**TLDR:** React Native 0.75 wprowadza kluczowe poprawki stabilności dla Nowej Architektury, wsparcie dla wartości procentowych w układzie dzięki Yoga 3.1, oraz zalecenia używania frameworków jak Expo. To krok milowy w kierunku długo oczekiwanej stabilnej wersji 1.0.

**Summary:**

React Native 0.75 to wydanie, które można nazwać "wydaniem między wydaniami" - przygotowuje grunt pod przyszłe przełomowe zmiany. Najważniejszą nowością są znaczące poprawki stabilności dla Nowej Architektury, która reprezentuje kompletne przepisanie wewnętrznych mechanizmów React Native. Ta architektura ma rozwiązać długoletnie problemy platformy, w tym interoperabilność z synchronicznymi API natywnych platform oraz umożliwić korzystanie z funkcji współbieżności React.

Wprowadzenie Yoga 3.1 jako silnika układu to kolejny znaczący krok naprzód. Teraz deweloperzy mogą używać wartości procentowych w właściwościach gap, columnGap i rowGap, co znacznie ułatwia tworzenie responsywnych układów. Podobnie, transformacje translate również obsługują wartości procentowe, co daje większą elastyczność w pozycjonowaniu elementów względem ich własnych wymiarów.

Istotną zmianą strategiczną jest wycofanie polecenia react-native init do końca roku, co ma zachęcić deweloperów do używania Expo jako zalecanego sposobu rozpoczynania projektów. To odzwierciedla rosnące znaczenie frameworków w ekosystemie React Native i dążenie do standaryzacji developer experience.

Dla architektów i zespołów programistycznych to wydanie sygnalizuje, że czas na poważne rozważenie migracji do Nowej Architektury. Choć nadal nie jest to wersja 1.0, stabilizacja sprawia, że ryzyko adopcji znacznie maleje, a korzyści z nowoczesnych funkcji React stają się dostępne w projektach mobilnych. Zespoły powinny zacząć planować migrację, szczególnie jeśli chcą korzystać z nowych funkcji układu.

**Key takeaways:**
- Nowa Architektura React Native jest prawie stabilna dzięki kluczowym poprawkom błędów
- Yoga 3.1 wprowadza wsparcie dla wartości procentowych w gap i transform
- Auto-linking jest teraz 6.5x szybszy na Androidzie i 1.5x szybszy na iOS z Expo
- React Native init zostanie wycofane, Expo staje się zalecanym frameworkiem

**Tradeoffs:**
- Nowe funkcje układu są dostępne tylko w Nowej Architekturze
- Migracja wymaga sprawdzenia kompatybilności bibliotek zewnętrznych
- Wycofanie react-native init może wymagać zmiany workflow dla niektórych zespołów

**Link:** [React Native 0.75 - Support for Percentage Values in Layout, New Architecture Stabilization](https://reactnative.dev/blog/2024/08/12/release-0.75)

## Przejście z Neovim na Zed - ewolucja narzędzi deweloperskich

**TLDR:** Deweloper opisuje swoją podróż od Atom przez VSCode, Vim, Neovim aż do Zed, motywowaną problemami z wydajnością i stabilnością w dużych bazach kodów. Zed oferuje szybkość terminala z nowoczesnymi funkcjami IDE.

**Summary:**

Historia przejścia między edytorami tekstu to fascynująca opowieść o ewolucji narzędzi deweloperskich i potrzebach programistów. Autor rozpoczął od Atom, przeszedł przez VSCode, ale problemy z wydajnością na starszym sprzęcie doprowadziły go do Vim i następnie Neovim. Przez lata Neovim był jego głównym narzędziem, oferując niesamowitą produktywność dzięki skrótom klawiszowym i możliwościom konfiguracji.

Jednak z czasem pojawiły się problemy typowe dla wysoce konfigurowalnych narzędzi. Każda aktualizacja pluginów mogła zepsuć całą konfigurację, wymagając czasochłonnych napraw zamiast skupienia się na właściwej pracy. W dużych bazach kodów Neovim zaczął wykazywać problemy z wydajnością - zawieszanie się, zamrażanie ekranu, co drastycznie wpływało na produktywność.

Zed pojawił się jako rozwiązanie łączące zalety terminala z nowoczesnymi funkcjami IDE. Oferuje natywną wydajność, wbudowane funkcje współpracy, inteligentne dopełnianie kodu i intuicyjny interfejs bez konieczności skomplikowanej konfiguracji. To editor napisany w Rust, co gwarantuje szybkość i stabilność, szczególnie ważne w dużych projektach.

Dla architektów i zespołów ta historia ilustruje ważny trend w narzędziach deweloperskich - odchodzenie od wysoce konfigurowalnych rozwiązań na rzecz narzędzi, które działają dobrze "out of the box". Zespoły mogą oszczędzić znaczące ilości czasu, rezygnując z utrzymywania skomplikowanych konfiguracji edytorów na rzecz narzędzi, które oferują dobrą wydajność i funkcjonalność bez dodatkowego nakładu pracy.

**Key takeaways:**
- Problemy z wydajnością Neovim w dużych bazach kodów motywują do szukania alternatyw
- Zed łączy szybkość terminala z nowoczesnymi funkcjami IDE
- Czas poświęcony na konfigurację narzędzi może być lepiej wykorzystany na właściwą pracę
- Natywne edytory napisane w Rust oferują lepszą wydajność niż rozwiązania Electron

**Tradeoffs:**
- Utrata głębokiej personalizacji dostępnej w Neovim
- Konieczność nauki nowego interfejsu i skrótów klawiszowych
- Zed jest młodszym projektem z mniejszym ekosystemem pluginów

**Link:** [Leaving Neovim for Zed](https://stevedylan.dev/posts/leaving-neovim-for-zed/)

## Czcionka z wbudowanym podświetlaniem składni - innowacyjne podejście do hand-coded websites

**TLDR:** Deweloper stworzył czcionkę z wbudowanym podświetlaniem składni używając funkcji OpenType, eliminując potrzebę JavaScript i zewnętrznych bibliotek w ręcznie kodowanych stronach internetowych. To proste, szybkie rozwiązanie dla blogów programistycznych.

**Summary:**

Projekt ten powstał z frustracji związanej z tworzeniem ręcznie kodowanych stron internetowych, gdzie podświetlanie składni kodu wymaga zwykle skomplikowanych bibliotek JavaScript jak Prism czy highlight.js. Te rozwiązania analizują kod, dzielą go na części, opakowują w tagi HTML z odpowiednimi stylami i wstrzykują z powrotem do strony, co dodaje złożoności i zwiększa rozmiar strony.

Innowacyjne podejście polega na wykorzystaniu funkcji OpenType, konkretnie tabeli COLR do tworzenia kolorowych glifów oraz kontekstualnych alternatyw do identyfikacji i zastępowania składni kodu. Autor zmodyfikował open source'ową czcionkę Monaspace Krypton, dodając kolorowe wersje każdego znaku i implementując logikę rozpoznawania wzorców HTML, CSS i JavaScript.

Rezultat to czcionka, która automatycznie podświetla składnię bez potrzeby JavaScript, zewnętrznych bibliotek czy dodatkowych tagów HTML. Kod pozostaje czystym tekstem, a kolory pochodzą bezpośrednio z czcionki. Instalacja jest tak prosta jak użycie dowolnej niestandardowej czcionki - wystarczy deklaracja @font-face i przypisanie do elementów code.

To rozwiązanie ma szczególne znaczenie dla architektów informacji i zespołów tworzących dokumentację techniczną. Umożliwia tworzenie czystego, szybkiego HTML bez JavaScript, co jest idealne dla statycznych stron, dokumentacji API czy blogów technicznych. Eliminuje zależności zewnętrzne i upraszcza deployment, jednocześnie zapewniając czytelne podświetlanie kodu.

**Key takeaways:**
- OpenType może być wykorzystane do implementacji podświetlania składni bez JavaScript
- Rozwiązanie działa z czystym HTML, wystarczą elementy pre i code
- Instalacja tak prosta jak używanie dowolnej niestandardowej czcionki
- Idealne dla hand-coded websites i statycznej dokumentacji

**Tradeoffs:**
- Ograniczona elastywność w porównaniu z pełnymi bibliotekami syntax highlighting
- Wsparcie tylko dla podstawowych wzorców HTML, CSS i JavaScript
- Wymaga wsparcia dla funkcji OpenType w przeglądarce
- Większy rozmiar pliku czcionki z powodu dodatkowych glifów

**Link:** [Font with Built-In Syntax Highlighting](https://blog.glyphdrawing.club/font-with-built-in-syntax-highlighting/)