---
title: "Co nowego w ECMAScript 2026, DDD we frontendzie i semantyczny HTML"
excerpt: "Przegląd najciekawszych artykułów z daily.dev: nowości w ES2026, Domain-Driven Design w architekturze frontendowej oraz dlaczego semantyczny HTML to fundament solidnych interfejsów."
publishedAt: "2026-07-10"
slug: "ecmascript-2026-ddd-frontend-semantyczny-html"
hashtags: "#dailydev #frontend #webdev #javascript #ecmascript #architecture #html #accessibility #generated #pl"
source_pattern: "daily.dev"
---

## Co nowego w ECMAScript 2026

**TLDR:** 30 czerwca 2026 Ecma International zatwierdziło specyfikację ECMAScript 2026. Nowe funkcje obejmują m.in. Array.fromAsync, Error.isError, Math.sumPrecise, wbudowaną konwersję Base64 dla Uint8Array, łączenie iteratorów oraz kilka innych użytecznych ulepszeń.

**Summary:** Autor bloga pawelgrzybek.com — który od lat śledzi kolejne edycje specyfikacji — tym razem podsumowuje finalne wydanie ES2026 z charakterystyczną dla siebie dokładnością. Przyznaje przy okazji, że pisze teraz więcej w Go niż w JavaScript, choć nie z powodu samego języka, a raczej zmęczenia ekosystemem. Trudno mu odmówić racji — JavaScript jako język jest całkiem solidny, to wokół niego narosło sporo zbędnego hałasu.

Nowości w ES2026 są praktyczne i długo wyczekiwane. Array.fromAsync wypełnia brakującą lukę, bo od dawna mieliśmy Array.from dla synchronicznych generatorów, ale asynchroniczne iteratory wymagały ręcznego użycia pętli for await. Teraz to już historia. Error.isError to bezpieczniejsza alternatywa dla instanceof Error — wygodna szczególnie gdy pracujemy z kodem przechodzącym przez granice ramek lub VMów, gdzie instanceof potrafi zawieść w niespodziewany sposób.

Math.sumPrecise rozwiązuje realny problem z precyzją liczb zmiennoprzecinkowych. Przykład z artykułu jest bardzo wymowny: zsumowanie trzech wartości przez reduce daje zero, a Math.sumPrecise zwraca poprawny wynik. Konwersja Uint8Array do i z Base64 to kolejna rzecz, którą dotychczas realizowaliśmy przez zewnętrzne biblioteki lub własnoręcznie pisane funkcje.

Iterator.concat pozwala łączyć iteratory bez pisania własnego generatora, a JSON.parse uzyskuje dostęp do oryginalnego tekstu źródłowego w callbacku reviver. Ten ostatni feature pozwala poprawnie deserializować duże liczby całkowite jako BigInt bez straty precyzji — problem, który każdy kto kiedyś pracował z dużymi ID z bazy danych zna aż za dobrze. Na koniec metoda getOrInsert na Map i WeakMap eliminuje powtarzalny wzorzec "sprawdź czy istnieje, jeśli nie to dodaj".

**Key takeaways:**
- Array.fromAsync umożliwia tworzenie tablic z asynchronicznych iteratorów bez pętli for await
- Error.isError to bezpieczniejsza weryfikacja błędów niż instanceof
- Math.sumPrecise eliminuje problemy z precyzją przy sumowaniu liczb zmiennoprzecinkowych
- Uint8Array dostaje wbudowane metody do Base64 i hex — koniec z zewnętrznymi bibliotekami
- JSON.parse z dostępem do źródłowego tekstu rozwiązuje problem dużych liczb i BigInt

**Why do I care:** Każda z tych zmian usuwa jakiś boilerplate lub naprawia realny problem, z którym spotykamy się w codziennej pracy. Nie ma tu rewolucji — jest solidna, inkrementalna poprawa ergonomii języka. Warto zaktualizować wiedzę, bo te funkcje zaczną pojawiać się w codebases wcześniej niż się spodziewamy.

**Link:** [What's new in ECMAScript 2026](https://pawelgrzybek.com/whats-new-in-ecmascript-2026)

---

## Architektura frontendu z Domain-Driven Design

**TLDR:** Autor opisuje jak zastosował Domain-Driven Design przy budowie aplikacji SaaS dla inżynierów od obciążeń wybuchowych. DDD pomogło w organizacji kodu, komunikacji między zespołem technicznym a ekspertami domenowymi i wypracowaniu wspólnego języka.

**Summary:** Artykuł jest bardzo osobisty — to historia konkretnego projektu, nie suchy opis teorii. Autor pracował nad aplikacją obliczającą obciążenia wybuchowe, gdzie musiał zrozumieć fizykę i matematykę dziedziny, nie będąc z niej specjalistą. DDD okazało się rozwiązaniem nie tylko problemu komunikacji, ale też problemu struktury folderów w projekcie frontendowym — i tu mnie zaskoczył, bo to zupełnie inny kąt spojrzenia na tę metodologię.

Punkt wyjścia jest doskonały: Atomic Design Brada Frosta świetnie opisuje odpowiedzialność komponentów, ale kiedy przekłada się to na strukturę folderów, mamy setki plików posortowanych alfabetycznie, gdzie kolejność i położenie nic nie mówią o celu. Autor szukał sposobu, żeby struktura katalogów działała jak namespace — i właśnie model z DDD dał mu ten mechanizm. Gdy patrzy na folder "blast", widzi agregat. Gdy widzi folder "calculation/services", wie, że to serwis domenowy zaimplementowany jako React custom hook.

To co mnie szczególnie przekonuje to historia ubiquitous language. Autor opisuje moment, kiedy zdał sobie sprawę, że technical i non-technical członkowie zespołu rozmawiają ze sobą bez tłumaczenia pojęć. To rzadkie i naprawdę wartościowe osiągnięcie. Zazwyczaj developerzy mówią po swojemu, a eksperci dziedzinowi po swojemu, a integracja odbywa się przy tablicy przez marnowanie godzin na "co miałeś na myśli?".

Autor uczciwie przyznaje, że DDD nie jest dla małych projektów i prostych UI. Ale zaznacza coś ważnego: nawet małe projekty mogą skorzystać z iteracyjnego dochodzenia do modelu i wspólnego słownika. Na koniec pojawia się interesujące odwołanie do rozdziału "Supple Design" z książki Evansa, który promuje pure functions i podejście funkcyjne — i autor słusznie zauważa, że wiele z naszych nowoczesnych narzędzi i wzorców React już stosuje te zasady, tylko pod inną nazwą.

**Key takeaways:**
- Struktura folderów może działać jak namespace domenowy — to silniejszy sygnał niż sama nazwa pliku
- Ubiquitous language to klucz do efektywnej współpracy między developerami a ekspertami dziedzinowymi
- DDD building blocks (entity, value object, service, aggregate) mają naturalne odpowiedniki we frontendzie
- React custom hooks dobrze nadają się jako serwisy domenowe — są composable, expressywne, bez własnego stanu
- DDD nie jest dla prostych projektów, ale iteracyjne modelowanie i wspólny słownik — tak

**Why do I care:** DDD na frontendzie brzmi jak overengineering do momentu, gdy pracujesz przy złożonym projekcie, gdzie folder structure mówi "components/Header/Header.tsx" zamiast "checkout/shipping/AddressForm". Artykuł pokazuje realną korzyść z myślenia domenowego przy organizacji kodu — i to bez wdrażania całego ciężkiego aparatu konceptualnego z książki Evansa.

**Link:** [Front-End Architecture with Domain-Driven Design](https://techhub.iodigital.com/articles/front-end-architecture-with-domain-driven-design)

---

## O semantycznym webie — i o tym, dlaczego div nigdy nie będzie przyciskiem

**TLDR:** Karl Koch przekonuje, że semantyczny HTML to nie accessibility chore, a infrastruktura interfejsu. Budowanie interaktywnych elementów na divach zamiast natywnych elementów prowadzi do płacenia "czynszu za gorszy przycisk".

**Summary:** Artykuł trafia w ból, który zna każdy kto review'ował frontend napisany przez kogoś zbyt ufającego komponentowym abstrakcjom. Autor zaczyna od konkretnego przykładu: div ze stylami buttona i onClick. Wygląda dobrze, działa z myszą. Ale nie jest focusowalny, nie reaguje na spację ani enter, nie da się go wyłączyć, nie zgłasza swojej roli technologii asystującej, nie bierze udziału w formularzu. I tak zaczyna się łatanie: role="button", tabIndex, aria-disabled, onKeyDown — i nagle mamy kilkanaście linii kodu, które próbują odtworzyć to, co natywny button robi domyślnie.

Autor nazywa to trafnie: "nie zaprojektowaliśmy lepszego przycisku — zaczęliśmy płacić czynsz za gorszy". To zdanie powinno wisieć w każdym biurze gdzie projektuje się component library. Problem nie jest estetyczny — semantyczny HTML nie oznacza akceptacji domyślnych stylów przeglądarki. Oznacza akceptację kontraktu interakcji przed pomalowaniem go na własny sposób. Możesz button ostylować jak chcesz — ale dostajesz za darmo: tab order, enter i spację, rola i stan disabled, obsługę formularzy, konwencje platformy.

Szczególnie podoba mi się sekcja o details/summary vs kontrolowanego stanu. Wiele aplikacji React implementuje accordion przez useState i animowane show/hide, choć w wielu przypadkach natywny details/summary wystarczyłby w zupełności. Autor nie mówi "zawsze używaj natywnego HTML" — mówi "wyczerpaj najpierw natywny kontrakt". Jeśli potrzebujesz animowanej wysokości, koordynacji wielu paneli, custom keyboard behavior — owszem, weź kontrolę. Ale nie rób tego bo domyślne style są brzydkie.

Na koniec pada mocny argument o trwałości. Systemy wizualne się zmieniają — border-radii rosną i maleją, trendy się kręcą. Warstwa semantyczna trwa dłużej, bo opisuje co interfejs jest, nie jak wygląda. Komponent zbudowany na natywnych elementach przeżyje redesign znacznie łatwiej niż ten, który koduje swoją własną, prywatną wersję "klikalnej rzeczy".

**Key takeaways:**
- Natywny button to nie ograniczenie stylistyczne, to kontrakt interakcji — focusowalność, klawiatura, rola, disabled, formularze
- Budowanie interaktywnych elementów na divach to płacenie czynszu za gorszy button
- details/summary obsługuje wiele przypadków accordionowych bez żadnego JavaScript
- ARIA powinno rozszerzać możliwości HTML, nie naprawiać złego markupu
- Semantyka przeżywa redesigny — opisuje co interfejs jest, nie jak wygląda

**Why do I care:** Jako ktoś robiący code review od lat: ten problem jest wszechobecny. Biblioteki komponentów pełne są divów grających rolę buttonów, spanów grających rolę linków. Artykuł Koch'a jest świetnym materiałem do linku w PR review albo jako punkt wyjścia do dyskusji w zespole o tym, kiedy warto sięgać po custom primitives. Krótki, konkretny, z interaktywnym przykładem na żywo — polecam.

**Link:** [On the semantic web](https://karlkoch.me/writing/on-the-semantic-web)
