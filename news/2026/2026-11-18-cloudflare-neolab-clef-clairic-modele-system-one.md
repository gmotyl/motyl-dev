---
title: "Cloudflare ogłasza się neolabem: modele Clef i Clairic oraz wpływ Jeva"
excerpt: "Cloudflare buduje własne modele system one, bo nie chce wysyłać każdego zapytania do dużego LLM-a."
publishedAt: "2026-11-17"
slug: "cloudflare-neolab-clef-clairic-modele-system-one"
hashtags: "#latent #ai #llm #cloudflare #edge #architecture #performance #generated #pl"
source_pattern: "Latent Space"
---

## Cloudflare dołącza do Jevolution i nazywa siebie neolabem

**TLDR:** Michelle Chen, odpowiedzialna za platformę AI w Cloudflare, ogłosiła na AI Engineer Code Summit, że firma staje się neolabem. Pierwsze dwa własne modele to Clef i Clairic, oba z rodziny system one.

**Summary:** Clef to model decyzyjny wprost inspirowany modelem Jev od TypeSafe AI. Chen przyznaje otwarcie, że zbudowanie Clefa zajęło zespołowi dwa tygodnie, podczas gdy TypeSafe pracowało nad Jevem dwa lata, i podkreśla, że cała zasługa wymyślenia tej kategorii należy do nich. Jev był dla Cloudflare "wschodnim wiatrem", który zmienił podejście do modeli: skoro nie trzeba wysyłać każdego zapytania do LLM-a, część można obsłużyć małym, szybkim modelem w milisekundach.

Clairic to już autorski pomysł, nazwany modelem ekstrakcji. Bierze nieustrukturyzowane dane i w jednym przebiegu wyciąga, wylicza, szacuje lub prognozuje wartości z konkretnym typem. Motywacja jest prosta. LLM-y są autoregresyjne, więc zdarza im się halucynować i zwracać zepsuty JSON. Na przykładzie faktury: numer zamówienia jest tuż przed oczami, a duży model potrafi się wahać, czy to trzy, cztery czy pięć.

Termin neolab ukuła rok temu Stephanie Palazzolo z The Information, a Deedy Das z Menlo Ventures prowadzi ich listę. Definicja zakłada startupy bez dużych przychodów, które wydają fortunę na trenowanie własnych modeli. Cloudflare jest spółką publiczną, która właśnie przekroczyła 3 mld dolarów rocznego przychodu, więc pasuje do tego słabo. Chen tłumaczy jednak, że to naturalna ścieżka od infrastruktury przez moc obliczeniową i storage po hostowanie modeli open weight, aż do własnych. Zapowiada też większe modele, w tym reasoningowe, ale oparte na post-trainingu istniejących wag, a nie na trenowaniu od zera. Jednym z powodów jest ograniczenie ryzyka: zamknięte modele takie jak Jev nie dają się uruchomić u siebie, a modele z Chin mogą trafić pod regulacje.

**Key takeaways:**
- Clef to model decyzyjny w stylu Jeva, Clairic to nowa klasa modeli ekstrakcji.
- Cel to wyższa szybkość i niższy koszt przez odciążenie dużych LLM-ów.
- Cloudflare skupi się na post-trainingu, a nie na pretrainingu.
- Własne modele mają zmniejszyć zależność od cudzych licencji i regulacji.

**Why do I care:** Jako architekt widzę tu wzorzec, który warto skopiować nawet bez własnych modeli: warstwa routingu, która wysyła proste zadania typu ekstrakcja albo klasyfikacja do małego modelu. To ogranicza koszt i opóźnienia, a poprawność typów daje bonus. Brakuje w tej historii twardych liczb jakości Clairica względem zwykłego LLM-a z wymuszonym schematem, bo to jest główne pytanie przy decyzji o wdrożeniu.

**Link:** [Cloudflare Joins the Jevolution and Labels Itself a Neolab](https://lspace.beehiiv.com/p/cloudflare)
