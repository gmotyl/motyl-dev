---
title: "Visual intelligence w Black Forest Labs, czyli dlaczego FLUX 3 uczy się z obrazu, wideo i dźwięku"
excerpt: "Rozmowa z Andreasem Blattmannem i Dustinem Podellem o FLUX 3, Kontext, treningu na wideo i dźwięku oraz o tym, po co laboratorium obrazów zajmuje się modelami świata."
publishedAt: "2026-11-16"
slug: "visual-intelligence-black-forest-labs-flux-3"
hashtags: "#latentspace #ai #ml #llm #flux #generated #pl"
source_pattern: "Latent Space"
---

## Building Visual Intelligence, Andreas Blattmann i Dustin Podell z Black Forest Labs

**TLDR:** Black Forest Labs trenuje FLUX 3 jednocześnie na obrazach, wideo i dźwięku, bo każdy z tych sygnałów mówi o świecie coś innego. Rozmowa tłumaczy, dlaczego studio znane z generowania obrazów przechodzi do wideo i modeli świata.

**Summary:** Andreas Blattmann współtworzył Latent Diffusion, a Dustin Podell prowadził FLUX Kontext i był głównym autorem SDXL. Obaj zaczynali w Stability AI, a po jego rozpadzie założyli BFL. Blattmann wyjaśnia, co rozumie przez wizualną inteligencję, na przykładzie rzucanej piłki. Ręka zaczyna się poruszać, zanim piłka do niej doleci, choć nie umiemy zapisać jej trajektorii. Zdjęcie pokazuje, gdzie jest piłka, wideo pokazuje, jak tam dotarła, a dźwięk uderzenia mówi, kiedy się zderzyła, nawet jeśli kamera tego nie złapała.

Wątek ruchu kamery jest ciekawy. Jeśli kamera okrąża osobę, model w pewnym momencie musi pokazać tył jej głowy. Według Blattmanna zwykłe wideo zawiera dużo dowodów o wyglądzie obiektów z innych stron. Nie rozstrzyga to, czy model rozumie fizykę, ale jest lepszym testem niż sprawdzenie, czy pojedyncza klatka wygląda wiarygodnie. Dobry przykład inżynierski jest pod koniec. Jeśli wyostrzysz każdą klatkę osobno, każda będzie świetna, a po odtworzeniu detale zaczną migotać. Dlatego upscaler wideo BFL wywodzi się z tego samego rdzenia co FLUX 3.

Pada też pytanie, czy autoregresja przejmuje generowanie obrazów. Blattmann oddaje rację drugiej stronie. Model autoregresyjny uczy się ze wszystkich tokenów przykładu naraz, a w dyfuzji długi proces próbkowania da się wydestylować do kilku kroków. Co się liczy bardziej, zależy od tego, czy płacisz za trening, czy czekasz na wynik.

Historia Kontextu jest przyjemna. Podell podejrzewał, że model, który umie narysować psa w kapeluszu, wie coś o tym, gdzie kapelusze się zakłada. Z kolegą zebrał mały zbiór zdjęć z opisanymi relacjami, a kilkugodzinny trening nauczył model nakładać logo na koszulkę. To było surowe, ale wystarczyło na najbliższy offsite, a potem zespół spędził miesiące nad danymi i modelem. Najciekawsza historia użytkowników dotyczy starych, zniszczonych zdjęć rodzinnych, które ludzie odnawiali i pokazywali rodzinom. Podell przyznaje, że nie przewidział takiego zastosowania.

Czego brakuje w tej relacji? To jest podsumowanie newslettera, a nie sama rozmowa, więc nie ma konkretnych liczb o jakości FLUX 3 ani o kosztach treningu. Nie wiemy, czy zysk z dźwięku i wideo jest duży, czy tylko dobrze brzmi.

**Key takeaways:**
- FLUX 3 trenuje się na obrazie, wideo i dźwięku jednocześnie.
- Ruch kamery to lepszy test rozumienia niż pojedyncza klatka.
- Spójność czasowa liczy się także wtedy, gdy ktoś prosi tylko o wyższą rozdzielczość.
- Wybór między autoregresją a dyfuzją zależy od tego, czy bolą koszty treningu, czy czas generowania.

**Why do I care:** To nie jest temat o Reakcie, ale generowane obrazy i wideo coraz częściej lądują w interfejsach, które budujemy. Historia o migotaniu po klatkowym wyostrzaniu to dobre przypomnienie, że wynik wygląda dobrze w testach pojedynczych klatek, a gorzej w odtwarzaniu. Przy integracji tych modeli w produkcie warto testować na ruchu, nie na zrzutach ekranu.

**Link:** [Building Visual Intelligence, Andreas Blattmann i Dustin Podell](https://lspace.beehiiv.com/p/building-visual-intelligence-andreas-blattmann-dustin-podell-black-forest-labs)
