---
title: "Prywatność i RODO w architekturze zdarzeniowej"
excerpt: "Oskar Dudycz przekonuje, że RODO wymusza przemyślane zarządzanie danymi, a w Event-Driven Architecture da się to pogodzić z niezmiennymi zdarzeniami."
publishedAt: "2026-10-26"
slug: "oskardudycz-prywatnosc-rodo-architektura-zdarzeniowa"
hashtags: "#architecture-weekly #architecture #security #backend #generated #pl"
source_pattern: "OskarDudycz"
---

## Prywatność i RODO w Event-Driven Architecture

**TLDR:** Autor uważa, że RODO jest dla nas dobre, nawet jeśli oznacza więcej pracy. Architektura zdarzeniowa wydaje się z nim kolidować, ale da się to rozwiązać, a czasem nawet uprościć.

**Summary:** Oskar zaczyna od uwagi, że przy masowym zbieraniu internetu przez modele językowe zapomnieliśmy, o co tak naprawdę będziemy walczyć: o prywatność. Przypomina znane powiedzenie, że jeśli produkt jest darmowy, to produktem są użytkownicy. Problem nie zaczął się od LLM, bo te same kłopoty mieliśmy wcześniej.

Jego stanowisko jest nietypowe w branży: regulacje takie jak RODO są po naszej stronie. Zmuszają do przemyślenia z góry zasad zarządzania danymi, czyli jakie dane trzymamy, po co, czy wszystkie są potrzebne i jak długo je przechowujemy.

Konflikt z architekturą zdarzeniową ma dwa źródła. Po pierwsze, zdarzenia, takie jak wiadomości między usługami, mają pozostawać niezmienne, a to ściera się z prawem do bycia zapomnianym. Po drugie, EDA stawia na integrację i luźne powiązania, co koliduje z zasadą udostępniania tylko tego, co konieczne. Autor twierdzi, że mimo to jest to wykonalne. Newsletter zawiera tylko zapowiedź i listę materiałów, więc konkretnych technik, takich jak szyfrowanie z kluczem usuwanym na żądanie, tu nie ma i trzeba je szukać w linkowanych tekstach.

**Key takeaways:**
- RODO wymusza pytania o to, jakie dane trzymamy, po co i jak długo.
- Niezmienne zdarzenia konfliktują z prawem do bycia zapomnianym.
- Wymiana danych między usługami musi być ograniczona do tego, co niezbędne.

**Why do I care:** Dla architekta to przypomnienie, że decyzja o tym, co trafia do zdarzenia, zapada na etapie projektu, a nie przy pierwszym wniosku o usunięcie danych. Sam newsletter jest jednak zapowiedzią: praktyczna wartość leży w dwóch linkowanych artykułach i nagraniu.

**Link:** [GDPR for busy developers](https://substack.com/redirect/d119ccf8-30a3-4960-a5df-24b9433e948a?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)

**Link:** [How to deal with privacy and GDPR in Event-Driven systems](https://substack.com/redirect/93a9a418-6d9f-46b8-96e1-5ee18dccb9fd?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)
