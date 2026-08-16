---
title: "Code review się zmienił, kontrakt jeszcze nie"
excerpt: "Pisanie kodu przestało być rzadkim zasobem, a review wciąż działa jak kiedyś. Kilo pokazuje, że pytanie \"czy to zadziała\" trzeba zamienić na \"czy tego nie pożałujemy\"."
publishedAt: "2026-08-04"
slug: "code-review-zmienil-sie-kontrakt-tez-musi"
hashtags: "#kilo #codereview #ai #pullrequest #generated #pl"
source_pattern: "Kilo"
---

## Code review się zmienił, kontrakt jeszcze nie

**TLDR:** Agenci AI produkują kod szybciej, niż seniorzy są w stanie go zweryfikować, więc bottleneck przesunął się z pisania na rozumienie. Kilo argumentuje, że review musi przestać być polowaniem na literówki i zacząć być oceną, czy wybrane rozwiązanie w ogóle powinno powstać. To zmiana tego, kto za co odpowiada w cyklu pull requesta, nie kosmetyczna korekta procesu.

**Summary:**
Kod przestał być rzadkim zasobem. Kiedyś developer pisał zmianę godzinami, teraz agent potrafi wygenerować feature, dopisać testy i otworzyć PR bez większego ludzkiego wkładu w implementację. Wolumen zmian trafiających do review rośnie, liczba seniorów zdolnych to ocenić nie rośnie proporcjonalnie. Autor artykułu nazywa to jasno: wąskim gardłem nie jest już pisanie kodu, jest jego weryfikacja. Problem w tym, że większość zespołów wciąż traktuje review tak, jakby nic się nie zmieniło.

Niektóre firmy poszły dalej i na własnych monorepo zrobiły ludzki review opcjonalny. Auto-approver czyta diff, klasyfikuje ryzyko i zatwierdza część PR-ów bez udziału człowieka. Brzmi ekstremalnie i faktycznie jest, ale ciekawsze jest to, że ludzie nie zniknęli, tylko przesunęli się w inne miejsce systemu. Nadal potrzebne są kontrole bezpieczeństwa, CODEOWNERS dla wrażliwych ścieżek, wykrywanie nieaktualnych zatwierdzeń i kultura, w której inżynierowie realnie odpowiadają za to, co trafia do maina. Zmieniło się pytanie, jakie zadaje sobie zespół. Nie "czy każda linia kodu musi przejść przez człowieka", ale "które zmiany faktycznie wymagają ludzkiego osądu".

Stary model review to była głównie detekcja defektów: brakujący edge case, dziurawy test, dziwna abstrakcja. Modele radzą sobie z tym całkiem dobrze, czasem nawet za dobrze, wyłapując drobiazgi, które nie mają realnego znaczenia. Kilo proponuje inną definicję celu review: autor ma przekonać reviewera, że wybrane rozwiązanie jest optymalnym rozwiązaniem danego problemu. To przesuwa odpowiedzialność autora z "wysłałem kod" na "wysłałem kod i wyjaśniłem, czemu akurat taki". Ma to jeszcze większe znaczenie przy kodzie generowanym przez AI, bo taki kod może wyglądać sensownie, trzymać się lokalnych konwencji i przechodzić testy, bez tego, żeby ktokolwiek naprawdę rozumiał, czy dane podejście ma sens w szerszym kontekście systemu.

Najbardziej trafne pytanie z całego tekstu brzmi: dobry senior nie pyta tylko "czy to zadziała", pyta "czy tego nie pożałujemy". Bo kod, który jest wystarczająco dobry, żeby go zmergować, ale niewystarczająco dobry, żeby go potem utrzymywać i za niego odpowiadać, to dokładnie ten scenariusz, w którym zespoły wpadają w kłopoty. Reviewerzy zaczynają przeglądać diff po łebkach, autorzy zakładają, że zielone testy oznaczają gotową zmianę, presja na tempo robi swoje i rubber stamping staje się drogą najmniejszego oporu. To nie jest problem jakości kodu, to jest problem modelu operacyjnego całego zespołu.

Z tego wynika konkretny wniosek dla opisu PR-a. Otwarcie pull requesta nie powinno znaczyć "napisałem kod, sprawdź go", powinno znaczyć "uważam, że to jest właściwe rozwiązanie, a tu są na to dowody". Opis ma odpowiadać na pytania o problem, wybrane podejście, rozważane alternatywy, ryzykowne miejsca i sposób testowania. Review też powinien być rozbity na poziomy ryzyka: rutynowe zmiany idą przez automatyzację i pierwszy przegląd od AI, zmiany architektoniczne wymagają wolniejszego ludzkiego spojrzenia, a obszary takie jak billing, autoryzacja, migracje czy bezpieczeństwo dostają najgłębszy poziom uwagi. Autor odpowiada za intencję, reviewer za osąd, narzędzia dają leverage. Kiedy te role są jasno rozdzielone, cały proces zaczyna działać lepiej, nawet przy większym wolumenie kodu.

**Key takeaways:**
- Wąskie gardło przesunęło się z pisania kodu na rozumienie, czy dana zmiana w ogóle powinna powstać, więc review nie może dłużej polegać na wyłapywaniu literówek i brakujących null checków.
- Definicja review się zmienia: autor ma przekonać reviewera, że jego rozwiązanie jest optymalne, a nie tylko dostarczyć działający diff.
- Review powinien być rozbity na poziomy ryzyka, od automatyzacji dla zmian rutynowych do głębokiego ludzkiego przeglądu przy billingu, autoryzacji czy migracjach.

**Why do I care:** Z perspektywy kogoś, kto ogarnia architekturę frontendu, to jest dokładnie ten problem, który widzę na własnych PR-ach od jakiegoś czasu. Kod wygenerowany przez agenta przechodzi lintery, przechodzi testy jednostkowe, wygląda znajomo, bo trzyma się konwencji z reszty repo, i właśnie to jest pułapka, bo "wygląda dobrze" przestało znaczyć "jest dobre dla systemu". Sam zauważam, że łatwiej jest teraz zmergować coś, co dodaje kolejny wzorzec zarządzania stanem albo kolejną zależność, niż to zauważyć na pierwszy rzut oka, bo diff jest czysty i mały. Praktyczny wniosek jest prosty: warto w zespole na serio wymagać opisu PR-a, który tłumaczy decyzję, nie tylko zmianę, i rozdzielić review na poziomy ryzyka, bo traktowanie każdej linijki kodu z taką samą uwagą, jaką miało sens pięć lat temu, dzisiaj po prostu nie skaluje się do wolumenu, jaki generują agenci.

**Link:** [Code Review Has Changed. The Contract Needs to Change Too.](https://blog.kilo.ai/p/code-review-has-changed-the-contract)
