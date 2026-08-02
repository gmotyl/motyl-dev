---
title: "Redesign, który psuje to, co już działało"
excerpt: "YouTube przeniósł Subskrypcje, Atlassian przeniósł Status w Jira. Oba testy wypadły dobrze, a mimo to regularni użytkownicy zwolnili. To pokazuje, czego zwykły test użyteczności nie mierzy."
publishedAt: "2026-07-29"
slug: "redesign-ktory-spowalnia-doswiadczonych-uzytkownikow"
hashtags: "#unicornclub #ux #product #design #frontend #architecture #generated #pl"
---

## Kiedy redesign psuje to, co już działało

**TLDR:** YouTube przeniósł Subskrypcje z dolnej nawigacji do zakładki w Home, Atlassian przeniósł kontrolkę Status w widoku zadania Jira. W obu przypadkach nic się nie zepsuło i testy użyteczności wypadły dobrze, a mimo to codzienni użytkownicy zaczęli pracować wolniej. Artykuł pokazuje, że standardowy test "czy user wykona zadanie" nie mierzy kosztu utraty automatyzmu.

**Summary:** Punktem wyjścia jest drobna zmiana w YouTube: Subskrypcje, które od lat siedziały w dolnym pasku nawigacji, przeniesiono do zakładki wewnątrz Home. Kciuk autora nadal odruchowo szukał starego miejsca, mimo że wszystko techniczne działało tak samo. To dobrze pokazuje różnicę między "produkt działa" a "produkt działa tak samo szybko dla kogoś, kto już go zna". Redesign zamienił Subskrypcje z osobnego, głównego miejsca w produkcie w filtr wewnątrz Home, co brzmi jak kosmetyka, a w praktyce zmienia model mentalny, jaki użytkownik zbudował sobie przez lata.

Dużo ciekawszy i dużo droższy jest przypadek Atlassiana. W 2025 roku przenieśli kontrolkę Status na ekranie zadania w Jira, uzasadniając to tym, że ważna akcja powinna być łatwiej dostępna, a ekran czystszy. Wczesne testy wypadły pozytywnie, więc zespół miał dane, które uzasadniały wdrożenie zmiany na produkcji. Potem zderzyli się z ludźmi, którzy w Jirze pracują cały dzień. Zaczęły się skargi na więcej scrollowania, trudniejsze odnajdywanie statusu i wolniejszą pracę, szczególnie w dużych organizacjach i przy bardziej złożonych zadaniach. Atlassian ostatecznie wycofał zmianę i opublikował post-incident review, co samo w sobie jest w tej historii najciekawszym elementem, bo firma potraktowała spowolnienie doświadczonych użytkowników jako realny incydent, a nie jako "ludzie nie lubią zmian".

To, co mnie w tej historii najbardziej przekonuje, to że autor nie próbuje robić z Atlassiana winowajcy. Pozytywne wyniki testów nie były sfałszowane, nowe miejsce prawdopodobnie faktycznie było czytelniejsze dla części osób, zwłaszcza nowych. Problem w tym, że testowano ogólną zmianę układu, a nie konkretnie nowe położenie kontrolki Status, i próbka nie odzwierciedlała dobrze wzorców użycia w dużych organizacjach ani bardziej złożonych typów zadań. Obie rzeczy są więc prawdziwe naraz: dla części ludzi nowy layout był lepszy, a regularni użytkownicy stracili kawałek produktu, o którym wcześniej nie musieli myśleć. Standardowy test kompletności zadania kompletnie tego nie łapie, bo mierzy "czy user dojdzie do celu", a nie "ile razy po drodze się zawaha".

Propozycja z artykułu jest prosta i konkretna: jeśli zmieniasz ekran, z którego ludzie korzystają codziennie, testuj to na osobach, które już znają obecny produkt, dając im powtarzalne zadanie zamiast oprowadzania po nowym layoucie. Warto patrzeć na złe kliknięcie, cofnięcie scrolla, moment wahania podczas skanowania ekranu, albo zdanie zaczynające się od "normalnie to po prostu...". Osoba testowana może ukończyć zadanie i nawet powiedzieć, że ekran wygląda czyściej, co wcale nie znaczy, że zachowałeś sposób, w jaki z niego korzystała. Autor słusznie dodaje, że czasem ten koszt jest wart poniesienia, bo stare layouty bywają bałaganiarskie, a jakiś element rzeczywiście potrafi siedzieć w głupim miejscu. Chodzi o to, żeby korzyść była warta tego, że każesz regularnym użytkownikom na nowo uczyć się fragmentu produktu, a nie o to, żeby nigdy nic nie ruszać.

**Key takeaways:**
- Redesign może "przejść" test użyteczności i jednocześnie realnie spowolnić ludzi, którzy znają produkt na pamięć
- Testowanie ogólnej zmiany layoutu nie jest tym samym co testowanie konkretnego elementu, który przenosisz
- Próbka testowa musi odzwierciedlać najcięższe przypadki użycia, nie tylko przeciętnego nowego użytkownika
- Sygnały do obserwowania to złe kliknięcia, cofanie scrolla, wahanie i zdania typu "normalnie to..."
- Atlassian wprowadził kolejny redesign jako beta włączaną przez admina, z możliwością powrotu do klasycznego widoku, co daje przestrzeń na wyłapanie szkód, jakich pierwsze testy nie pokazały

**Why do I care:** Dla mnie to jest właściwie opis problemu, który regularnie widzę przy refaktorach UI w aplikacjach enterprise: zespół testuje nowy interfejs na kilku nowych osobach albo na sobie, wyniki wyglądają świetnie, a potem okazuje się, że ludzie robiący tę samą operację pięćdziesiąt razy dziennie nagle tracą tempo. To bezpośrednio dotyczy tego, jak planujemy testy A/B i user testing przy redesignach paneli administracyjnych czy narzędzi wewnętrznych, gdzie użytkownik power-user jest normą, a nie wyjątkiem. Warto też zwrócić uwagę na wzorzec z Atlassiana: opt-in beta plus łatwy powrót do starego widoku to rozwiązanie architektoniczne, które każdy zespół budujący duże narzędzia B2B powinien mieć w zanadrzu zamiast twardego przełącznika na cały ruch.

**Link:** [When a redesign makes familiar work slower](https://unicornclub.dev/issues/2026-07-29-when-a-redesign-makes-familiar-work-slower/)
