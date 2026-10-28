---
title: "Decoding AI: cztery decyzje, które utwardzają harness agenta"
excerpt: "Tejas Kumar o tym, kto decyduje o zakończeniu zadania, kto trzyma klucze, kto zatrzymuje agenta i jak znajdować przyczynę nieudanego przebiegu."
publishedAt: "2026-10-28"
slug: "decoding-ai-cztery-decyzje-harness-agenta"
hashtags: "#decodingai #ai #agents #security #testing #architecture #generated #pl"
source_pattern: "Decoding AI"
---

## 4 kluczowe decyzje przy utwardzaniu harnessu agenta

**TLDR:** Gdy pętla agenta już działa, wracają cztery pytania o to, kto co posiada: kto uznaje zadanie za skończone, kto trzyma klucze, kto mówi stop i kto odpowiada za błąd. Autor odpowiada, że pierwsze trzy należą do harnessu w kodzie, a model tylko proponuje.

**Summary:** Tejas Kumar pokazał kiedyś na konferencji, jak oprzeć agenta na GPT-3.5 Turbo, żeby oddał głos na artykuł na Hacker News, bez zmiany promptu. Od tamtej pory dwie rzeczy wyszły na jaw. Deweloper naprawił błąd, przez który agent oddawał dwa głosy zamiast jednego, a przy ponownej lekturze autor zobaczył, że harness dałby się namówić do wpisania hasła na stronie, która nie jest Hacker News.

Pierwsza decyzja dotyczy ukończenia. Deklaracja modelu to twierdzenie. Harness sprawdza świat przed i po, z miejsca niedostępnego do zapisu dla agenta. Weryfikator oparty na śladzie pytał "czy kliknięto upvote", a zadanie pytało "czy dokładnie właściwy artykuł dostał głos i nic więcej". Weryfikator napisany z zadania zatrzymuje ten przebieg. Autor radzi robić migawkę "przed" raz na zadanie, nie na próbę, a weryfikatorowi dać cztery odpowiedzi: gotowe, ponów, stop i nie wiem.

Druga decyzja to klucze. Hasło trzymane w zmiennych środowiskowych nie trafia do promptu, ale harness nadal potrafił wpisać je na złej stronie, bo wykrywał logowanie przez szukanie słowa login w adresie. Poprawki to logowanie przed startem przebiegu przez zapisany stan przeglądarki, parsowanie adresu i porównanie origin oraz węższe narzędzie hn_open zamiast dowolnej nawigacji. Autor cytuje regułę, że po przyjęciu niezaufanego wejścia agent musi być ograniczony tak, żeby to wejście nie mogło wywołać istotnych akcji.

Trzecia decyzja to ograniczenia. Budżety kończą przebieg, a polityki odrzucają jedną akcję i zwracają odmowę jako wynik narzędzia. W demo budżet maxMessages 50 nigdy nie mógł zadziałać, bo pętla przycinała kontekst do 20 wiadomości przed sprawdzeniem. Przycinanie mogło też zgubić wiadomość asystenta, zostawiając wynik narzędzia, który API OpenAI odrzuca. Autor radzi testować każdy guardrail przez prawdziwą pętlę.

Czwarta decyzja to rozliczalność. Najpierw znajdź pierwszy błędny krok, nie ostatni. Zobacz dokładnie, co model widział, więc zapisuj całe żądania, a nie tylko liczbę wiadomości. Zapytaj, czy ostrożny człowiek z tym kontekstem zrobiłby lepiej. Jeśli kontekst był zły, to błąd harnessu. Jeśli dobry, powtórz krok 10 lub 20 razy na swoim i mocniejszym modelu. Autor przyznaje też, że nie wie, jak zweryfikować wyniki, gdy świat nie ma wiarygodnego źródła prawdy, np. przy streszczeniach.

**Key takeaways:**
- Harness decyduje o zakończeniu na podstawie stanu świata przed i po.
- Sekrety trzymaj w harnessie i przypinaj miejsca ich użycia przez parsowanie adresów.
- Budżety kończą przebieg, polityki odrzucają akcję. Każdy guardrail ma test, który go uruchamia.
- Przy awarii szukaj pierwszego błędnego kroku i odtwarzaj go.

**Why do I care:** To jedna z uczciwszych publikacji o agentach, bo autor opisuje błędy we własnym kodzie, w tym guardrail, który nigdy nie mógł zadziałać. Dla zespołów budujących agentów wniosek jest praktyczny: weryfikator pisz z zadania, nie ze śladu. Brakuje mi odpowiedzi na pytanie, kto pisze weryfikator, gdy agent sam buduje harness.

**Link:** [4 Key Decisions to Solidify Your Harness](https://www.decodingai.com/p/4-key-decisions-to-solidify-your?publication_id=1526003&post_id=219063871&action=share&triggerShare=true&isFreemail=true&triedRedirect=true)
