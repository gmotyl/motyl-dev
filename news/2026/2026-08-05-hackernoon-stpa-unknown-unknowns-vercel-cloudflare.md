---
title: "HackerNoon: STPA na nieznane nieznane i ucieczka z Vercela na Cloudflare"
excerpt: "Dwa wątki z tego numeru HackerNoon: dlaczego klasyczna analiza ryzyka nie łapie awarii wynikających z interakcji komponentów, i jak HackerNoon poukładał swoją platformę, przy okazji migrując z Vercela na Cloudflare Pages."
publishedAt: "2026-08-05"
slug: "hackernoon-stpa-unknown-unknowns-vercel-cloudflare"
hashtags: "#HackerNoon #architecture #sre #devtools #cloudflare #generated #pl"
source_pattern: "HackerNoon"
---

## STPA, czyli jak znaleźć awarię, której jeszcze nie miałeś

**TLDR:** Artykuł tłumaczy Systems-Theoretic Process Analysis, metodę analizy ryzyka wywodzącą się z lotnictwa i energetyki jądrowej, którą coraz częściej stosuje się do systemów rozproszonych. Zamiast pytać "co może się zepsuć", STPA pyta "jakie działanie kontrolne, mimo że wykonane poprawnie, może doprowadzić do straty". To różnica, która ma znaczenie w momencie, gdy żaden pojedynczy komponent nie jest zepsuty, a system i tak wchodzi w kaskadową awarię.

**Summary:** Tekst zaczyna od obserwacji, którą każdy, kto siedział na dyżurze SRE, znał już wcześniej, tylko nie miał na to nazwy. Najbardziej bolesne awarie rzadko mają jednego winowajcę. Retry potęguje obciążenie, autoscaler podejmuje decyzję na podstawie nieświeżych metryk, dwa mechanizmy automatyzacji optymalizują lokalnie i zaczynają się nawzajem podbijać w produkcji. Dashboardy pokazują zielone światła, a system i tak dryfuje w stronę katastrofy. Klasyczny postmortem w takiej sytuacji jest bezradny, bo szuka jednego zdarzenia źródłowego, a go tam po prostu nie ma.

STPA proponuje inne spojrzenie: system to nie zbiór komponentów, które mogą się zepsuć, ale sieć pętli kontrolnych. Kontroler wydaje działanie kontrolne wobec kontrolowanego procesu, na podstawie sygnału zwrotnego z sensorów. Autoscaler, pipeline CI/CD, człowiek klikający rollback na dashboardzie, agent AI wybierający kolejny tool call, to wszystko są kontrolery w tym sensie. I dla każdego istotnego działania kontrolnego STPA sprawdza cztery sposoby, w jakie może stać się niebezpieczne: nie zostało wykonane, gdy było potrzebne, zostało wykonane, gdy nie powinno, zostało wykonane w złym momencie albo w złej kolejności, albo trwało za długo lub zostało przerwane za wcześnie. Żadna z tych sytuacji nie wymaga, żeby autoscaler był zepsuty. Może działać zgodnie ze specyfikacją od początku do końca i mimo to doprowadzić do przeciążenia.

Najciekawsza część tekstu dotyczy momentu, w którym warto tę analizę robić, czyli zanim kod powstanie. Autor pokazuje przykład platformy deploymentowej, w której niebezpiecznym działaniem kontrolnym jest promowanie builda przed zakończeniem walidacji canary. Z tej jednej obserwacji wynika konkretne wymaganie architektoniczne: system nie może promować builda, dopóki sygnały walidacyjne nie są kompletne i świeże. To nie jest test jednostkowy dopisany po fakcie, to jest ograniczenie zapisane w projekcie, zanim ktokolwiek zdążył się o niego przekonać na produkcji. Autor łączy to również z agentami AI, gdzie te same wzorce awarii, brakująca obserwacja prowadząca do halucynacji wewnętrznego modelu systemu, błędne wywołanie narzędzia prowadzące do nieodwracalnej akcji, spóźniony feedback prowadzący do kaskady, zaczynają wyglądać identycznie jak w klasycznej automatyzacji infrastruktury.

Na koniec dostajemy praktyczny przepis, który da się zrobić na tablicy bez certyfikatu i warsztatu: narysować kontroler, kontrolowany proces, działania i sygnały zwrotne, a potem przejść przez pięć pytań o niedopuszczalne straty, pętle kontrolne, dostępne działania, zależny od nich feedback i sposoby, w jakie te działania mogą zawieść.

**Key takeaways:**
- STPA patrzy na system jako sieć pętli kontrolnych, nie jako zbiór komponentów, które mogą się zepsuć.
- Dla każdego działania kontrolnego sprawdza cztery tryby awarii: brak działania, niepotrzebne działanie, złe wyczucie czasu, złe czas trwania.
- Metodę da się zastosować przed napisaniem kodu, na etapie architektury, co jest dużo tańsze niż łapanie tego w produkcji.
- Ten sam wzorzec pasuje do agentów AI: brakująca obserwacja, błędne wywołanie narzędzia, spóźniony feedback, dryf pamięci.
- Start jest tani: kartka, kontroler, kontrolowany proces, pięć pytań.

**Why do I care:** Frontendowcy zwykle traktują to jako problem SRE i infrastruktury, ale coraz więcej z tych pętli kontrolnych żyje dziś w naszym kodzie po stronie klienta i w warstwie orkiestracji. Optymistyczne UI, retry z backoffem w kliencie HTTP, cache invalidation sterowany przez kilka niezależnych źródeł prawdy, agent w przeglądarce podejmujący decyzje na podstawie stanu, który już jest nieaktualny, to są dokładnie te same pętle, tylko bliżej użytkownika. Podoba mi się, że autor nie sprzedaje STPA jako srebrnej kuli, tylko jako język do zadawania pytań, których w code review i architektonicznych review zwyczajnie nie zadajemy, bo pytamy "co się zepsuje", a nie "co się stanie, jeśli poprawne działanie wykona się w złym momencie". Następny raz, gdy będę projektował warstwę synchronizacji stanu albo agentowy workflow, ukradnę te cztery pytania.

**Link:** [How STPA Helps Find Unknown Unknowns Before They Cost You Millions](https://hackernoon.com/how-stpa-helps-find-unknown-unknowns-before-they-cost-you-millions)

## Porządki na HackerNoon: kategorie, hackathon i ucieczka z Vercela

**TLDR:** HackerNoon ogłasza produktowy update platformy: hackathon Decentralize AI z pulą ponad 51 tysięcy dolarów, redukcję kategorii z 22 do 6, nową sekcję "Published Recently" na stronie głównej i przebudowany hub biznesowy. W tle, jako jedna linijka wśród wielu, jest informacja, która dla mnie jest najważniejsza w całym tekście: migracja z Vercela na Cloudflare Pages przez OpenNext, głównie z powodu kosztów serverless i bandwidth.

**Summary:** Większość tego tekstu to typowy newsletter produktowy, więc nie będę udawał, że każda sekcja zasługuje na głęboką analizę. Hackathon Decentralize AI to kolejna odsłona wyścigu o zdecentralizowaną infrastrukturę AI, z pulą podzieloną na dwie rundy i ciekawym haczykiem, zwycięzca grand prize dostaje na własność domenę i kod hackathonu. Redukcja kategorii z 22 do 6 to zwykłe UX housekeeping, które prawdopodobnie i tak powinno się wydarzyć rok wcześniej, ale dobrze, że w końcu się wydarzyło. Redesign strony głównej z nawigacją do sekcji jednym kliknięciem i sticky elementami przy scrollu to standardowa robota nad retencją czytelnika.

Ciekawszy fragment, chowany pod koniec tekstu jako drobna wzmianka, mówi, że HackerNoon zmigrował swoją aplikację Next.js z Vercela na Cloudflare Pages, korzystając z OpenNext jako mostu między frameworkiem a edge network Cloudflare. Powód podany wprost: koszty serverless i bandwidth na Vercelu rosły do punktu, w którym przestały się kalkulować. To nie jest odosobniony przypadek, w ostatnim czasie coraz więcej zespołów z ruchem na poziomie milionów odsłon dochodzi do tego samego wniosku. Vercel jest fantastyczny na start i dla mniejszych projektów, model cenowy oparty na liczbie wywołań funkcji i transferze zaczyna jednak boleć, kiedy ruch przestaje być mały.

OpenNext w tym kontekście robi dokładnie to, co powinien robić dobry adapter, ukrywa różnice między środowiskiem uruchomieniowym Vercela a resztą świata, tak żeby Next.js mógł działać gdziekolwiek jest sens biznesowy, żeby działał. To jest ważny sygnał dla każdego, kto wybiera framework pod presją "będzie tak, jak robi to Vercel", bo Vercel i Next.js są formalnie odrębnymi firmami produktowymi, nawet jeśli w praktyce Next.js jest pisany przez zespół Vercela i to widać w domyślnych ścieżkach optymalizacji.

**Key takeaways:**
- HackerNoon uruchamia hackathon Decentralize AI z pulą ponad 51 tysięcy dolarów, w dwóch rundach do lutego 2027.
- Kategorie na stronie spadły z 22 do 6, co ułatwia nawigację i subskrypcje tematyczne.
- Aplikacja Next.js została przeniesiona z Vercela na Cloudflare Pages za pomocą OpenNext, z powodu kosztów serverless i bandwidth.
- OpenNext działa jako otwartoźródłowy most, pozwalając funkcjom frameworka działać na edge network Cloudflare.
- Migracja miała, według autorów, obniżyć koszty bez utraty wydajności.

**Why do I care:** Ten jeden fragment o migracji jest dla mnie ważniejszy niż cała reszta newslettera produktowego razem wzięta. Coraz więcej zespołów traktuje "Next.js plus Vercel" jako pakiet nierozdzielny, a to po prostu nieprawda, i HackerNoon to udowadnia na własnym ruchu w skali milionów czytelników miesięcznie. Jeśli projektujesz architekturę frontendu pod długoterminowy koszt, a nie tylko pod wygodę deploya w piątek wieczorem, warto już na starcie sprawdzić, czy framework, który wybierasz, ma realną drogę ucieczki od jednego dostawcy. OpenNext taką drogę daje dla Next.js, i to jest dokładnie ten rodzaj decyzji architektonicznej, którą łatwo zignorować, kiedy projekt jest mały, a bardzo trudno naprawić, kiedy rachunek za serverless zaczyna przypominać czynsz za biuro.

**Link:** [Decentralize AI, Tech Categories, Fresh Business Hub, and More: Inside the New HackerNoon Upgrades](https://hackernoon.com/decentralize-ai-tech-categories-fresh-business-hub-and-more-inside-the-new-hackernoon-upgrades)
