---
title: "HackerNoon: operator Kubernetes dla federacji tożsamości, 26 trików CSS, skille dla agentów i workflow z Claude Code"
excerpt: "Pięć tekstów: Myceliam łączący Kubernetes z AWS i GCP, przegląd trików CSS, zestaw 49 skilli dla agentów, dwudniowa przebudowa strony z Claude Code i pięć lekcji o AI w cyklu wytwarzania oprogramowania."
publishedAt: "2026-11-10"
slug: "hackernoon-myceliam-css-skille-claude-code-ai-sdlc"
hashtags: "#hackernoon #kubernetes #aws #gcp #security #css #agents #claude-code #devops #generated #pl"
source_pattern: "HackerNoon"
---

## Myceliam: operator Kubernetes dla Workload Identity Federation

**TLDR:** Autor zbudował operator w Go, który z etykiet na ServiceAccount tworzy zaufanie między klastrem, dostawcą tożsamości i chmurami AWS oraz GCP. Pody dostają krótkotrwałe poświadczenia zamiast statycznych kluczy w Secretach.

**Summary:** Punkt wyjścia jest znajomy. W większości klastrów leży gdzieś klucz AWS albo plik JSON konta usługi GCP, którego nikt nie rotował. Federacja tożsamości rozwiązuje to od lat, ale konfiguracja jest żmudna. Trzeba zarejestrować issuera w IAM, napisać trust policy dopasowaną do jednego workloadu, założyć pulę i providera w GCP oraz posprzątać to wszystko po usunięciu workloadu. Terraform słabo tu pasuje, bo ServiceAccounty tworzą zespoły aplikacyjne w czasie wdrożenia, a dryf, na przykład ręczna edycja polityki w konsoli, dzieje się poza pipeline'em.

Operator mapuje obiekty Kubernetes na obiekty w Keycloak, Auth0, AWS i GCP wyłącznie po nazwach, więc nie potrzebuje bazy danych. Interfejs jest mały, to etykiety i trzy CRD. Co istotne, namespace trzeba najpierw dopisać do listy dozwolonych, a prawo zapisu tego jednego obiektu jest prawdziwą granicą bezpieczeństwa. Operator rejestruje zaufanie, ale nigdy nie nadaje uprawnień. Reconcile co trzysta sekund cofa ręczne zmiany.

Najwięcej wartości mają opisane pułapki. Gdy token ma claim azp, AWS sprawdza ClientIDList względem azp, a nie aud, i zwraca ogólny błąd bez wskazówki. Token z wieloma audiencjami bez azp jest odrzucany. Claimy dodane przez akcję Auth0 nie są widoczne w warunkach polityki AWS, więc trzeba je przekazać jako session tagi, i trzeba pamiętać o uprawnieniu sts:TagSession. Do tego dochodzi błąd autora, w którym porównanie reflect.DeepEqual między typami string i any powodowało przepisywanie każdej polityki przy każdym reconcile. Do rzeczy nierozwiązanych autor zalicza brak czyszczenia starych statementów, co kiedyś uderzy w limit rozmiaru trust policy.

**Key takeaways:**
- Operator rejestruje zaufanie, a nie uprawnienia, dzięki czemu jego promień rażenia jest mały.
- Okresowy reconcile naprawia dryf, którego Kubernetes nie zgłasza zdarzeniem.
- Przy debugowaniu AWS najpierw zdekoduj token, dopiero potem czytaj polityki.

**Why do I care:** Jeśli utrzymujesz platformę, ta lista pułapek AWS i GCP oszczędzi ci dni. Autor pomija tylko jedno, czyli co się stanie, gdy sam operator ma zostać skompromitowany, bo jego poświadczenia mogą tworzyć role w każdym koncie.

**Link:** [Building a Kubernetes Operator for Workload Identity Federation Across AWS and GCP](https://hackernoon.com/building-a-kubernetes-operator-for-workload-identity-federation-across-aws-and-gcp)

## 26 trików CSS do nowoczesnego frontendu

**TLDR:** Zbiór krótkich technik opartych na czystym CSS, od efektu pisania i modali przez :target, po :has(), clamp() i aspect-ratio.

**Summary:** Lista jest długa, więc wspomnę o tym, co się naprawdę przydaje. Efekt maszyny do pisania robi się animacją szerokości w krokach, a płynne przewijanie to jedna właściwość scroll-behavior. Modal bez JavaScriptu działa dzięki pseudoklasie :target, czyli pokazuje się, gdy hash w adresie pasuje do jego identyfikatora. Tooltip można zbudować z attr(), tak że tekst leży w atrybucie HTML, a jedna reguła stylizuje wszystkie.

Z nowszych rzeczy autor wymienia :has() jako selektor rodzica, aspect-ratio zamiast starej sztuczki z padding-top, accent-color do natywnych kontrolek i clamp() do płynnej typografii. Jest też gradientowa ramka z zaokrąglonymi rogami, zrobiona przez dwa tła na padding-box i border-box. Tekst ma jedną wadę. Modal oparty na :target psuje historię przeglądarki i fokus, a o dostępności prawie nie ma słowa.

**Key takeaways:**
- Wiele wzorców, które kiedyś wymagały JavaScriptu, działa dziś w samym CSS.
- :has(), aspect-ratio i clamp() mają wsparcie we wszystkich nowoczesnych przeglądarkach.
- Modal na :target wymaga dodatkowej troski o dostępność.

**Why do I care:** To ściąga do przejrzenia z zespołem, a nie do skopiowania. Zanim wciągniesz bibliotekę do prostego tooltipu czy sticky nagłówka, sprawdź, czy sam CSS nie załatwi sprawy.

**Link:** [26 CSS Tips and Tricks for Modern Web Development](https://hackernoon.com/26-css-tips-and-tricks-for-modern-web-development)

## Awesome Agent Skills: 49 skilli dla programowania z AI

**TLDR:** Kolekcja czterdziestu dziewięciu procedur w formacie SKILL.md obejmuje code review, debugowanie, testy, architekturę, bezpieczeństwo i dokumentację. Nacisk jest na raporty z dowodami, a nie na sam kod.

**Summary:** Skille nie mają skryptów, to Markdown, który korzysta z narzędzi agenta. Ich trzy założenia to ustalenia poparte kodem lub wynikiem polecenia, rozdzielenie badania od naprawiania i jawne wskazanie, czego nie sprawdzono. Zamiast prośby "sprawdź wszystko" agent dostaje procedurę z oczekiwanym wynikiem, na przykład listą luk w testach albo audytem tego, co obiecuje README.

Autor porównuje zestaw ze znanymi kolekcjami, jak Superpowers, Matt Pocock, Addy Osmani czy Trail of Bits, i uczciwie przyznaje, że nie ma testu porównawczego pokazującego, że jego zestaw naprawia więcej błędów. To rzadkie i warte pochwały. Zachęca, by wypróbować jeden skill na znajomym kodzie i ocenić, czy znalazł prawdziwy problem, czy dał dowód i ile kosztował kontekstu.

**Key takeaways:**
- Skille uzupełniają AGENTS.md, bo dają metodę do konkretnego zadania, a nie stałe reguły.
- Wartość leży w raportach z dowodami i jawnych ograniczeniach.
- Brak dowodu przewagi nad innymi kolekcjami, więc ocena wymaga własnego testu.

**Why do I care:** Zamiast instalować czterdzieści dziewięć skilli, wybierz dwa do swojego powtarzalnego zadania i zmierz, ile tokenów zjadają. Kolekcja im większa, tym większy koszt wyboru.

**Link:** [Awesome Agent Skills: 49 Skills for Better AI-Assisted Coding](https://hackernoon.com/awesome-agent-skills-49-skills-for-better-ai-assisted-coding)

## Przebudowa strony w dwa dni z Claude Code

**TLDR:** Autor w dwa dni przebudował stronę na Next.js 16, przepisał dwieście dwadzieścia osiem wpisów pod dane o słowach kluczowych i utrzymał zero zepsutych adresów. Wniosek jest taki, że koszt pisania kodu spadł, a koszt decydowania, co zbudować, nie.

**Summary:** Liczby są imponujące, trzydzieści dwa tysiące linii, pięćset czterdzieści trzy testy, sto commitów i jedenaście PR-ów. Autor sam jednak mówi, że linie kodu to słaba miara, i opisuje, co liczy zamiast tego. Chodzi o testy sprawdzające zachowanie, to, czy każdy wcześniej zaindeksowany adres zwraca 200, mniejszą powierzchnię do utrzymania i zrozumiałe decyzje w diffie.

Praktyczne zasady są konkretne. Ograniczenia zapisuje się przed pierwszym promptem, testy są kontraktem, a każdy złapany błąd agenta zamienia się w nowy test. Merge'e są małe, żeby dało się je przejrzeć, audyty to pętla, w której człowiek decyduje, które ustalenia są prawdziwe. Najlepszą historią jest usunięcie publicznego API JSON, które agent chętnie zbudował z wersjonowaniem i testami, a które nie dawało żadnej wartości, więc po usunięciu liczba stron statycznych spadła z 1093 do 596. Agent mógł to zbudować, ale nie mógł powiedzieć, że nie warto.

Nie wszystko tu przekonuje. Badanie z użyciem 313 zapytań za 4,37 dolara dało wnioski o słowach kluczowych, ale ruch z wyszukiwarki nie jest mierzony po zmianie, więc nie wiemy, czy przepisanie dwustu dwudziestu ośmiu wpisów cokolwiek dało.

**Key takeaways:**
- Ograniczenia zapisane tam, gdzie agent je czyta, to najtańsza ochrona.
- Każdy błąd agenta powinien kończyć się nowym testem.
- Najcenniejszą zmianą bywa usunięcie kodu, którego nikt nie potrzebuje.

**Why do I care:** To dobry opis pracy, w której człowiek jest recenzentem i redaktorem. Zapisz sobie pytanie "czy to w ogóle powinno istnieć" przed pytaniem "czy agent to zbuduje".

**Link:** [My Claude Code Workflow: Lessons From Rebuilding a Website in Two Days](https://hackernoon.com/my-claude-code-workflow-lessons-from-rebuilding-a-website-in-two-days)

## AI-SDLC: pięć lekcji dla zespołów DevSecFinOps

**TLDR:** Przy wdrażaniu AI w korporacyjnym cyklu wytwarzania największymi problemami są dług poznawczy, nieprzewidywalne koszty tokenów, topologia agentów, bezpieczeństwo oparte na hookach i przesunięcie rygoru w stronę projektowania.

**Summary:** Autor zaczyna od długu poznawczego. Agent wrzuca setki linii, testy przechodzą, programista klika approve, bo śledzenie logiki męczy. Z czasem powstaje zespół kruchych ekspertów. Ich zespół zmienił przeglądy tak, że trzeba ręcznie prześledzić logikę i zapisać architektoniczne "dlaczego", inaczej PR nie przechodzi.

Drugi wątek to FinOps. Wieloagentowe zadanie może zużyć tysiąc razy więcej tokenów niż zwykły czat, więc zużycie tokenów jest dla nich metryką pierwszego rzędu, z budżetami i twardymi limitami. Trzeci to topologia, gdzie hub-and-spoke dławi się na centralnym mózgu, peer-to-peer robi hałas, a drzewo hierarchiczne okazało się według autora najlepsze. Czwarty to zamiana bram fazowych na żywe hooki w bramce AI, czyli hooki wejścia, wyjścia i przed wywołaniem narzędzia, plus automatyczne SBOM w CI. Piąty to odróżnienie odciążenia poznawczego od zlecania myślenia.

Tekst jest w dużej mierze zbiorem deklaracji. Zdanie "tree topology hits the sweet spot" nie ma żadnych liczb ani opisu porównania, więc traktuję je jako doświadczenie jednego zespołu, a nie wynik.

**Key takeaways:**
- Przegląd kodu musi wymuszać zrozumienie logiki, a nie tylko zatwierdzanie.
- Zużycie tokenów warto traktować jak metrykę produkcyjną z limitami.
- Walidacja ma działać na żywo, w hookach, a nie w bramce przed wydaniem.

**Why do I care:** Dla architekta to najlepiej brzmi punkt o długu poznawczym, bo jest mierzalny w czasie incydentu. Jeśli ktoś w zespole nie umie wyjaśnić, dlaczego kod działa, to ten kod nie jest jego.

**Link:** [Architecting AI-SDLC: Five Lessons For DevSecFinOps Teams](https://hackernoon.com/architecting-ai-sdlc-five-lessons-for-devsecfinops-teams)
