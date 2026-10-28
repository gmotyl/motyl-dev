---
title: "Bytes #533: TypeScript 7.1 czyta dziwne pliki, Redact od TanStack, JPEG XL kontra AVIF"
excerpt: "TypeScript 7.1 beta dodaje content mappers do sprawdzania typów w plikach innych niż TS, a obok są TanStack Redact, porównanie JPEG XL z AVIF i Firefox 159."
publishedAt: "2026-10-28"
slug: "bytes-533-typescript-7-1-content-mappers-tanstack-redact-jpeg-xl"
hashtags: "#uidev #frontend #typescript #react #performance #css #webdev #generated #pl"
source_pattern: "ui.dev"
---

## TypeScript 7.1 beta: content mappers

**TLDR:** TypeScript 7.1 beta wprowadza content mappers, wtyczki, które uczą kompilator tłumaczyć dowolny typ pliku na wirtualny plik TypeScript. Dzięki temu sprawdzanie typów działa w plikach takich jak SQL czy HTML bez własnego narzędzia.

**Summary:** Przez lata JavaScript wciskano do każdego możliwego formatu, stąd jsx, mdx, astro, svelte i vue. Przy przejściu na TypeScript pojawił się problem. Żeby sprawdzić typy w takich plikach, trzeba było opakować kompilator, jak robi vue-tsc, albo zbudować serwer języka na @volar/typescript.

Content mapper rejestruje się w tsconfig i podaje rozszerzenia, które obsługuje. Uruchamia się go przez tsc z flagą runExternalCode. Mapper zamienia pasujące pliki na wirtualne pliki TypeScript z odwołaniami do źródła. TypeScript sprawdza typy wirtualnych plików i raportuje błędy w oryginalnych miejscach dzięki mapowaniu zakresów. To samo mapowanie daje uzupełnianie, podpowiedzi po najechaniu i przejście do definicji. Na tym działa też inferencja typów dla plików sql w narzędziu Reylo.

Autorzy newslettera żartują, że to kryzys wieku średniego TypeScriptu: pokuta za grzechy przeszłości, tylko może kilka lat za późno. Sam fakt, że oficjalny mechanizm w końcu istnieje, jest jednak sensowny.

**Key takeaways:**
- Content mapper tłumaczy dowolny plik na wirtualny plik TypeScript.
- Mapowanie zakresów pozwala raportować błędy w oryginalnym pliku.
- Reylo używa tego do typowania plików sql.

**Why do I care:** Dla autorów frameworków to duża zmiana, bo mogą porzucić własne opakowania kompilatora. Dla zwykłych zespołów to na razie beta i niewiele zmienia, ale typowane pliki sql lub szablony bez dodatkowego narzędzia kuszą. Zobaczymy, ile wtedy zostanie z Volara.

**Link:** [Announcing TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/)

## Cool Bits: TanStack Redact, JPEG XL kontra AVIF, Firefox 159 i inne

**TLDR:** Krótka lista nowości. Najciekawsze to Redact od TanStack, porównanie formatów obrazów Jake'a Archibalda i Firefox 159 z animacjami sterowanymi przewijaniem.

**Summary:** Tanner Linsley wydał Redact, mniejszą, synchroniczną wersję Reacta dla tych, którzy cierpią na bundle phobię. Jeff Lindsay zrobił webframe, narzędzie do uruchamiania z wiersza poleceń skryptów zależnych od przeglądarki. Jake Archibald w swoim wpisie tłumaczy, kiedy używać JPEG XL zamiast AVIF.

Firefox 159 oznacza, że scroll-driven animations działają we wszystkich głównych przeglądarkach. Remix 3.1 łata problemy po premierze. Vercel Labs pokazało wterm, emulator terminala renderujący DOM, dzięki czemu zaznaczanie tekstu naprawdę działa. Z ciekawostek: Shu Ding skompilował interfejs dashboardu do jednej funkcji matematycznej, a tsts to kolejny fork kompilatora TypeScript, tym razem uruchamiany w systemie typów TypeScript.

Zadanie na koniec brzmi: dlaczego buildSearchUrl zwraca tylko jeden tag. Odpowiedź to użycie set zamiast append w URLSearchParams, bo set nadpisuje poprzednią wartość klucza.

**Key takeaways:**
- Scroll-driven animations są już we wszystkich głównych przeglądarkach.
- Redact to mniejsza, synchroniczna wersja Reacta.
- URLSearchParams set nadpisuje wartości, append je dodaje.

**Why do I care:** Pominąłem sponsorowane pozycje. Dla mnie wiadomością jest Firefox 159, bo można w końcu przestać pisać polyfille do animacji przewijania. Redact traktuję jako eksperyment, a nie opcję do produkcji, dopóki nie zobaczę ekosystemu.

**Link:** [Bytes #533 - TypeScript Can Read Your Weird Files](https://bytes.dev/archives/533)
