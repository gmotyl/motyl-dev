---
title: "AI jako mnożnik ludzkich zamiarów, i prawdziwy koszt niesprawdzonego kodu z agentów"
excerpt: "Dwa teksty z HackerNoon: esej o tym, że AI nie jest ani dobre, ani złe, tylko wzmacnia systemy incentywów, w które je wpiszemy, oraz twarda kalkulacja biznesowa pokazująca, ile naprawdę kosztuje brak przeglądu kodu generowanego przez agentów."
publishedAt: "2026-09-29"
slug: "hackernoon-ai-mnoznik-koszt-code-review"
hashtags: "#HackerNoon #ai #agents #architecture #code-review #engineering #generated #pl"
source_pattern: "HackerNoon"
---

## AI to mnożnik siły. Pytanie brzmi: co mnożymy?

**TLDR:** Autor odrzuca ramę "AI dobre kontra AI złe" i przekonuje, że sztuczna inteligencja jest przede wszystkim mnożnikiem istniejących już incentywów — w firmie nastawionej na wzrost przyspieszy wzrost, w systemie nastawionym na inwigilację przyspieszy inwigilację. Prawdziwe pytanie to nie czym AI jest, tylko co świadomie postanowimy nią wzmacniać.

**Summary:** Punktem wyjścia jest obserwacja, że AI wyrwało się z bańki technologicznej i wsiąknęło w codzienne życie ludzi, którzy nie obchodzi ich liczba tokenów ani rozmiar okna kontekstu, tylko to, że robot potrafi złożyć pranie albo dziecko potrafi w dziesięć sekund wygenerować odpowiedź do zadania domowego. Razem z tą magią przychodzi jednak fizyczna infrastruktura data center, która budzi coraz większy opór lokalnych społeczności, więc nastroje wahają się między entuzjazmem a apokalipsą co kilka minut.

Autor punktuje pokusę dzielenia świata na drużyny — OpenAI kontra Anthropic, Ameryka kontra Chiny, open source kontra zamknięte modele, akceleracjoniści kontra doomerzy — jako fałszywą pewność, która przesłania ciekawsze pytanie. Jego zdaniem AI samo w sobie nie jest ani dobre, ani złe, tylko multiplikuje incentywy systemu, w który zostanie wpięte: model zoptymalizowany pod przychody z reklam będzie działał inaczej niż ten sam model użyty przez naukowca albo nauczyciela. Inteligencja ma znaczenie, harness ma znaczenie, ale to, w co ten harness wycelujemy, może mieć jeszcze większe znaczenie.

Z tej obserwacji wyprowadza zestaw osobistych zasad: automatyzować to, co bezduszne i powtarzalne, zanim zastąpi się tym, co nadaje pracy sens; nie oddawać AI własnego osądu, ciekawości i gustu; unikać myślenia zerojedynkowego przy optymalizacji, tak żeby zyskiwał nie tylko użytkownik, ale i szersza społeczność oraz środowisko; używać AI do kwestionowania przestarzałych systemów zamiast tylko przyspieszać istniejącą maszynę; i przede wszystkim świadomie ustalić własne zasady, zanim zrobi to za nas sama maszyna.

**Key takeaways:**
- AI nie jest z natury dobre ani złe — wzmacnia incentywy systemu, w który zostanie wpięte.
- Podział na drużyny (OpenAI kontra Anthropic, otwarte kontra zamknięte modele) daje złudną pewność, ale przesłania ważniejsze pytanie o to, co faktycznie multiplikujemy.
- Zamiast pytać, co AI zrobi z nami, autor proponuje pytać, co my zrobimy z AI.
- Kluczowe zasady: automatyzować bezduszną pracę, nie oddawać własnego osądu, unikać optymalizacji zerojedynkowej i świadomie ustalać zasady zanim zrobi to maszyna.

**Why do I care:** Dla architekta czy tech leada to przypomnienie, że decyzje o tym, gdzie i jak wpinamy agentów w system, są decyzjami o wartościach, nie tylko o wydajności. Zespół, który mierzy sukces agenta wyłącznie liczbą scalonych PR-ów, dostanie dokładnie to, co zmierzy — więcej scalonych PR-ów, niekoniecznie lepszy produkt czy zdrowszy zespół. To dobry argument, żeby przy wdrażaniu agentów w firmie najpierw ustalić, jakie zachowania i metryki faktycznie chcemy wzmocnić, zanim zoptymalizujemy pod te, które akurat najłatwiej policzyć.

**Link:** [AI Is a Force Multiplier: What Are We Multiplying?](https://hackernoon.com/ai-is-a-force-multiplier-what-are-we-multiplying)

## Ile naprawdę kosztuje brak przeglądu kodu z AI

**TLDR:** Narzędzia AI zwiększyły wydajność produkcji kodu o 25–35%, ale ten sam raport pokazuje, że rachunek za tę prędkość przychodzi później: w incydentach produkcyjnych, poprawkach i czasie seniorów spędzonym na debugowaniu kodu, którego nie napisali. Tekst pokazuje, jak zbudować twardy biznesowy argument za przeglądem kodu generowanego przez AI.

**Summary:** Punktem wyjścia jest przykład współdzielonego narzędzia zmodyfikowanego przez agenta AI bez widoczności na sześć innych usług, które od niego zależą. Zmiana przechodzi testy, PR zostaje zaakceptowany, a dwa dni później usługa poniżej zaczyna się zachowywać nieprawidłowo na produkcji, a senior spędza półtora dnia na wytropieniu przyczyny w commicie, który wyglądał czysto. Autor argumentuje, że narzędzia AI rozwiązały problem generowania kodu, ale problem weryfikacji — upewnienia się, że kod jest bezpieczny do wysłania na produkcję — pozostaje w dużej mierze nierozwiązany, i to właśnie tam kumulują się koszty.

Dane z raportu State of Code pokazują skalę zjawiska: 42% czasu deweloperów idzie na naprawianie błędów i długu technicznego zamiast na nowe funkcje, 35% projektów spóźnia się z powodu poprawek związanych z jakością, a 67% zespołów zgłasza większe trudności z utrzymaniem jakości kodu odkąd AI weszło do powszechnego użycia. Czas przeglądu rośnie o 91% w zespołach z wysoką adopcją AI bez odpowiadającego wzrostu zdolności przeglądowej, co strukturalnie prowadzi nie do wolniejszego, tylko do płytszego przeglądu. Do tego dochodzi trzykrotny wzrost podatności bezpieczeństwa w kodzie współtworzonym przez AI, bo modele powielają wzorce z danych treningowych, łącznie z tymi niebezpiecznymi.

Autor proponuje trzyetapowy sposób budowania uzasadnienia budżetowego: najpierw zmierzyć bazowy koszt problemu (czas cyklu PR-a, odsetek defektów wykrywanych dopiero na produkcji, czas seniorów na debugowaniu), potem przełożyć to na model kosztowy z użyciem powszechnie cytowanego mnożnika 10–100x kosztu naprawy błędu znalezionego na produkcji względem błędu złapanego na etapie PR-a, a na koniec zdefiniować, jak wygląda sukces po 90 dniach — malejący odsetek defektów uciekających na produkcję, stabilny lub malejący czas cyklu PR-a i rosnący odsetek akceptowanych komentarzy z automatycznego przeglądu. Konkretny przykład: zespół 50 deweloperów otwierających po cztery PR-y tygodniowo, odzyskujący jedną godzinę na PR-a, to około 800 godzin dewelopera miesięcznie — liczba, która robi wrażenie w rozmowie budżetowej.

**Key takeaways:**
- Wydajność generowania kodu poszła w górę o 25–35%, ale koszt tej prędkości ujawnia się później, w incydentach i długu technicznym.
- Czas przeglądu rośnie o 91% w zespołach z wysoką adopcją AI, bez odpowiadającego wzrostu zdolności przeglądowej — to problem strukturalny, nie ludzki.
- Podatności bezpieczeństwa w kodzie współtworzonym przez AI rosną trzykrotnie, bo modele powielają niebezpieczne wzorce z danych treningowych.
- Business case dla przeglądu AI opiera się na trzech krokach: zmierzyć koszt bazowy, zastosować mnożnik 10–100x kosztu błędu na produkcji, i zdefiniować metryki sukcesu po 90 dniach.

**Why do I care:** To dokładnie ten sam argument, który powtarzam zespołom próbującym mierzyć powodzenie adopcji AI samą liczbą wygenerowanych linii albo scalonych PR-ów — to metryki górnej części lejka, które nic nie mówią o tym, co dzieje się z kodem po scaleniu. Konkretna liczba: 91% wzrostu czasu przeglądu bez wzrostu zdolności przeglądowej to dokładnie to zjawisko, które w praktyce widziałem w zespołach — kolejka PR-ów puchnie, a jakość przeglądu spada, bo ludzie fizycznie nie nadążają. Dla architektów to mocny argument, żeby traktować warstwę weryfikacji (niezależną od modelu, który wygenerował kod) jako inwestycję infrastrukturalną, nie opcjonalny dodatek.

**Link:** [The Business Case for AI Code Review: Costs, ROI, and How to Measure Impact](https://hackernoon.com/the-business-case-for-ai-code-review-costs-roi-and-how-to-measure-impact)
