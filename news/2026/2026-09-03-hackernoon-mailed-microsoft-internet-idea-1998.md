---
title: "List do Microsoftu z 1998 roku, czyli jak wpadłem na push-indexing dwadzieścia lat za wcześnie"
excerpt: "HackerNoon: osobista historia sysadmina z rosyjskiej Wielikije Łuki, który jako dwudziestolatek wysłał Microsoftowi pomysł na powiadamianie wyszukiwarek o zmianach na stronie zamiast ich crawlowania, i dostał grzeczną odmowę."
publishedAt: "2026-09-02"
slug: "hackernoon-mailed-microsoft-internet-idea-1998"
hashtags: "#HackerNoon #webdev #history #search #generated #pl"
source_pattern: "HackerNoon"
---

## List do Microsoftu z 1998 roku, czyli jak wpadłem na push-indexing dwadzieścia lat za wcześnie

**TLDR:** Andrey, dziś programista i sysadmin w rosyjskim Wielikije Łuki, opowiada, jak w 1998 roku jako student wpadł na pomysł, żeby strony same powiadamiały wyszukiwarki o zmianach, zamiast czekać, aż crawler je odwiedzi. Napisał list do Microsoftu, dostał odmowę, próbował z inwestorami i z Yandeksem, a projekt nigdy nie powstał. Dwadzieścia osiem lat później ten sam mechanizm działa jako WebSub i IndexNow.

**Summary:** Historia zaczyna się od znaleziska: sortując stare papiery, autor natrafia na list z Redmond z 1998 roku, pięć linijek grzecznej odmowy od Microsoftu na propozycję, której treści dziś nie ma jak udowodnić, bo zachował się tylko sam list zwrotny. Cofa się do końca lat 90., kiedy internet liczył sobie dopiero 2,4 miliona witryn, wyszukiwarki takie jak Yahoo, Lycos czy raczkujący wtedy Yandex indeksowały strony przez crawlery, a on, student ekonomii z małego miasteczka, zaczął się zastanawiać, dlaczego to w ogóle działa w ten sposób. Uznał, że model, w którym wyszukiwarka bezustannie odwiedza strony, żeby sprawdzić, czy coś się zmieniło, jest kolosalnym marnotrawstwem zasobów, porównywalnym do listonosza chodzącego codziennie od drzwi do drzwi i pytającego, czy ktoś ma coś do wysłania, zamiast czekać, aż ludzie sami przyniosą list na pocztę.

Techniczna strona pomysłu była prosta w założeniu: program monitorujący system plików serwera wykrywałby zmiany w katalogu, mapował zmieniony plik na URL i przygotowywał jego treść do wysłania, wcześniej wyciągając tekst, nagłówki i linki oraz kompresując wszystko. Po testach z funkcjami Windows FindFirstChangeNotification i ReadDirectoryChangesW autor zdecydował się na sterownik oparty o Driver Development Kit, bo Windows był jedynym środowiskiem, które naprawdę znał. Latem 1998 roku wysłał opis tej koncepcji na fizyczny adres Microsoftu i w październiku dostał odpowiedź: propozycja jest interesująca, ale nie pasuje do bieżących potrzeb biznesowych firmy.

Zamiast się poddać, autor zaczął szukać inwestorów i znalazł dwóch prywatnych finansistów, z którymi założył firmę o nazwie Grabit. Dostał pierwszy tysiąc dolarów przez Western Union, wydał go na bibliotekę kompresji i programistę, po czym cały projekt rozbił się o odmowę wizy amerykańskiej, spowodowaną nieopatrznym fragmentem korespondencji sugerującym, że planuje zostać w Stanach. Kolejne próby, najpierw z raczkującym wtedy Yandeksem, potem z dużym rosyjskim dostawcą internetu, kończyły się odpowiednio podejrzeniem o budowanie narzędzia do kradzieży danych i uprzejmym, ale niezobowiązującym "ciekawy pomysł, planujemy coś podobnego".

Dwadzieścia osiem lat później, przeglądając te same papiery, autor odkrywa, że jego pomysł doczekał się w międzyczasie nazwy i wdrożenia: Google zrobił to jako PubSubHubbub, dziś znane jako WebSub, a Microsoft z Yandeksem uruchomili w 2021 roku protokół IndexNow, który Cloudflare wbudował bezpośrednio w swoją platformę. Autor nie twierdzi, że świat odkrył jego pomysł na nowo dzięki niemu, tylko że koncepcja była słuszna, po prostu przyszła piętnaście czy dwadzieścia lat za wcześnie, zanim świat był gotowy ją przyjąć.

**Key takeaways:**
- W 1998 roku autor zaprojektował mechanizm powiadamiania wyszukiwarek o zmianach na stronie zamiast crawlowania, dziś znany jako push indexing.
- Microsoft, Yandex i lokalny dostawca internetu kolejno odrzucili propozycję, jedna próba upadła też przez odmowę wizy do USA.
- Ten sam mechanizm powstał później jako Google PubSubHubbub/WebSub oraz protokół IndexNow od Microsoftu i Yandeksa, wdrożony też przez Cloudflare.

**Why do I care:** To nie jest tekst techniczny w sensie kodu, tylko przypomnienie, że architektura push zamiast pull, którą dziś traktujemy jako oczywistość w webhookach, edge computingu i powiadomieniach real-time, kiedyś była na tyle niekonwencjonalnym pomysłem, że firma pokroju Microsoftu nie potrafiła jej rozpoznać. Warto to trzymać w pamięci, kiedy własny zespół odrzuca pomysł juniora jako "nie pasuje do obecnej architektury", bo czasem różnica między złym pomysłem a dobrym pomysłem złożonym w złym momencie jest trudna do odróżnienia z pozycji decydenta.

**Link:** [I Mailed Microsoft an Internet Idea in 1998. Here's What Happened](https://hackernoon.com/i-mailed-microsoft-an-internet-idea-in-1998-heres-what-happened)
