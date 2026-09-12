---
title: "HackerNoon: jak wygrać hackathon dzięki Claude'owi i trzy granice bezpieczeństwa dla HTML-a pisanego przez AI"
excerpt: "Zwycięzca firmowego hackathonu tłumaczy, że o wygranej zdecydowała wizja i Claude Code, a inżynier bezpieczeństwa rozkłada na czynniki pierwsze, jak hostować niezaufany, generowany przez AI HTML bez wpuszczania go do własnej aplikacji."
publishedAt: "2026-09-12"
slug: "hackernoon-hackathon-ai-coding-security-boundaries-ai-html"
hashtags: "#HackerNoon #ai #security #agents #architecture #generated #pl"
source_pattern: "HackerNoon"
---

## 4 sposoby na wygranie hackathonu (żaden z nich to nie pisanie kodu)

**TLDR:** Tudor Evans z Speechmatics opisuje, jak wygrał firmowy hackathon aplikacją do dyktowania na macOS i twierdzi, że o zwycięstwie zdecydowały wizja produktu, odważne wybory technologiczne umożliwione przez Claude'a oraz umiejętność zaprezentowania efektu, a nie sama umiejętność programowania.

**Summary:** Autor zaczyna od żartobliwego wyznania: zaczął projekt tydzień przed startem hackathonu i przez cały poprzedni tydzień publicznie zapowiadał wygraną, więc jedyną alternatywą było dowieźć. Ale najciekawszy wątek dotyczy tego, jak bardzo asystent kodujący zmienia kalkulację ryzyka przy wyborze technologii. Evans chciał zbudować aplikację w Go, bo tego języka używają w Speechmatics, co naturalnie wykluczyło Electrona na rzecz mniej popularnego Wails, odpowiednika Tauri, ale dla ekosystemu Go. Normalnie taka decyzja architektoniczna byłaby długo rozważana, bo wybór niesprawdzonej technologii to ryzyko utknięcia w połowie tygodnia. Ale skoro cały kod i tak pisał głównie Claude, a przepisanie architektury od zera zajmowało godziny, a nie dni, ryzyko wyboru czegoś nietypowego spadło praktycznie do zera. To właśnie ta zmiana kalkulacji pozwoliła mu zejść ze 100 MB zużycia pamięci zamiast typowego dla Electrona jednego gigabajta.

Druga część tekstu to explicite przyznanie, kto naprawdę napisał kod: "niemal cały kod napisał Claude", a autor pełnił rolę superwizora, często do drugiej w nocy szeptem wydając kolejne instrukcje. Ostatni, czwarty punkt, prezentacja, dotyczy czegoś, czego żaden model językowy nie zrobi za nas: entuzjazmu i umiejętności sprzedania produktu publiczności, wzmocnionej tu żartem o wykorzystaniu prawniczki firmowej jako "dowodu społecznego" podczas dema.

**Key takeaways:**
- Wybór niesprawdzonej technologii (Wails zamiast Electrona) stał się bezpieczny, bo asystent AI mógł przepisać architekturę w godziny, nie dni.
- Wyraźne przyznanie: "niemal cały kod napisał Claude", autor pełnił rolę architekta i superwizora.
- Prezentacja i entuzjazm liczą się tyle samo co sam produkt, to jedyny element, którego AI nie zastąpi.

**Why do I care:** Ten tekst dobrze pokazuje, jak zmienia się kalkulacja ryzyka architektonicznego, kiedy koszt przepisania kodu spada niemal do zera. Decyzje, które kiedyś ważyłbym tygodniami, dziś mogę testować empirycznie w ciągu popołudnia. To nie jest argument za brakiem przemyślenia, tylko za tym, że eksperymentowanie z architekturą stało się tańsze, więc warto rewidować własne nawyki dotyczące "bezpiecznych" wyborów technologicznych.

**Link:** [4 Ways to Win a Hackathon (None of Them Is Writing Code)](https://hackernoon.com/4-ways-to-win-a-hackathon-none-of-them-is-writing-code)

## Trzy granice bezpieczeństwa dla hostowania niezaufanego HTML-a generowanego przez AI

**TLDR:** Inżynier opisuje, jak zaprojektował hosting dla samodzielnych, interaktywnych plików HTML wysyłanych klientom, z założeniem, że autor pliku, człowiek albo model, nigdy nie jest zaufany. Zamiast jednego zabezpieczenia, system opiera się na trzech niezależnych granicach: tożsamości, pochodzenia i możliwości.

**Summary:** Produkt pozwala małemu zespołowi administratorów publikować samodzielne dokumenty HTML: interaktywne raporty, prototypy, dashboardy. Problem w tym, że wgrany plik HTML to program, uruchamiający JavaScript z uprawnieniami strony, na której się znajduje, a platforma trzyma poufne dane klientów. "To nasz własny plik, więc mu ufamy" nie jest modelem bezpieczeństwa, a sanityzacja, która usuwa skrypty, zabija samą funkcję. Kluczowy scenariusz ryzyka to prompt injection: ktoś wgrywa dokument z tekstem adresowanym do modelu, model później pisze artefakt HTML i wykonuje te ukryte instrukcje, a wynikowy JavaScript uruchamia się w przeglądarce starszego pracownika klienta, zalogowanego na firmowym laptopie. Nikt w tym łańcuchu nie robi niczego nietypowego, co czyni ten scenariusz realnym zagrożeniem, mimo niskiego prawdopodobieństwa.

Zespół przyjął jedną zasadę: nic powyżej przeglądarki nie jest zaufane, ani uploader, ani prompt, ani architektura agenta, ani własny krok QA. Trzy granice broniące systemu to: tożsamość (kto może otworzyć ten link), pochodzenie (gdzie kod się wykonuje) i możliwości (do czego może dotrzeć po uruchomieniu), a każda z nich jest wymuszana innym mechanizmem, więc złamanie jednej nie otwiera pozostałych. Link współdzielony trafia na osobną domenę zarejestrowaną tylko na potrzeby niezaufanej treści (nie subdomenę, bo subdomena wciąż dzieli "site" z aplikacją w oczach przeglądarki), a sam HTML trafia tam bez własnego, dostępnego publicznie URL-a, przez uścisk dłoni `postMessage` między aplikacją a "shimem", żeby link nigdy nie stał się przekazywalnym poświadczeniem dostępu. Trzecia granica to Content-Security-Policy zaczynająca się od `default-src 'none'`, gdzie `connect-src 'none'` samo w sobie blokuje fetch, WebSocket i pół tuzina innych kanałów wycieku danych naraz.

Zespół przetestował całość przeciwko ponad 40 wektorom eksfiltracji na czterech silnikach przeglądarek i zablokował wszystkie poza trzema kanałami poza zasięgiem CSP (WebRTC, preconnect, dns-prefetch), które i tak nie dają dostępu do danych aplikacji, jedynie do adresu IP przeglądarki ofiary. Po drodze wyszły też dwa praktyczne problemy: firmowe filtry sieciowe blokujące zupełnie nową domenę oraz Slack generujący podgląd linku, który uderzał w ekran logowania zamiast w treść.

**Key takeaways:**
- Trzy niezależne granice, tożsamość, pochodzenie, możliwości, z których każda jest wymuszana innym mechanizmem, więc złamanie jednej nie otwiera pozostałych.
- Druga, osobna domena (nie subdomena) jest konieczna, bo przeglądarki traktują subdomeny jako ten sam "site" z tą samą izolacją procesu.
- CSP zaczynająca się od `default-src 'none'` i `connect-src 'none'` blokuje niemal wszystkie kanały eksfiltracji jedną dyrektywą.

**Why do I care:** To jeden z niewielu tekstów, który realnie tłumaczy różnicę między "sandboxowaniem" jako sloganem a sandboxowaniem jako inżynierią. Rozbicie problemu na trzy niezależne mechanizmy zamiast jednego wielkiego zabezpieczenia to dokładnie ten poziom rygoru, którego brakuje w większości wdrożeń "agent generuje i renderuje HTML". Dla architekta odpowiedzialnego za bezpieczeństwo produktów z generowaną przez AI treścią to gotowa checklista rzeczy do sprawdzenia, zanim ktoś zapyta "czy to bezpieczne", a nie po tym, jak ktoś już zapyta.

**Link:** [Three Security Boundaries for Hosting Untrusted, AI-Generated HTML](https://hackernoon.com/three-security-boundaries-for-hosting-untrusted-ai-generated-html)
