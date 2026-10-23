---
title: "Dlaczego moc obliczeniowa AI ma kształt prostokąta, czyli rozmowa z szefem Modal"
excerpt: "Erik Bernhardsson tłumaczy, skąd bierze się wzrost Modal, dlaczego kontrakty na GPU nie pasują do rzeczywistego popytu i jak sandboksy dla agentów stały się trzecią częścią przychodów."
publishedAt: "2026-10-22"
slug: "latent-space-modal-why-ai-compute-comes-in-rectangles"
hashtags: "#latent #ai #infrastructure #agents #cloud #startup #llm #generated #pl"
source_pattern: "Latent.Space"
---

## Why AI Compute Comes in Rectangles, Erik Bernhardsson, Modal CEO

**TLDR:** Modal przekroczył miliard dolarów rocznych przychodów i zebrał 750 milionów dolarów w rundzie D przy wycenie 16 miliardów. Szef firmy tłumaczy, dlaczego tradycyjne kontrakty na GPU nie pasują do tego, jak naprawdę zmienia się popyt.

**Summary:** Punktem wyjścia jest obraz prostokąta. Typowy kontrakt na moc obliczeniową daje klientowi stałą liczbę GPU na stały czas, więc wykres pojemności w czasie jest prostokątem. Prawdziwe obciążenie rośnie, skacze i spada w ciągu dnia. Kupienie na szczyt oznacza płacenie za bezczynny sprzęt, kupienie mniej oznacza utratę popytu. Według opisu Modal zakłada coś w rodzaju transformacji czasu trwania. Zbiera popyt tysięcy klientów, zabezpiecza pojemność pod spodem i pozwala każdemu używać tyle, ile potrzebuje, kiedy potrzebuje.

Jest też ryzyko po drugiej stronie. Jeśli dostawca zamknie pojemność po dzisiejszych cenach, a ceny GPU potem spadną, zostaje z drogą podażą. Bernhardsson nie spodziewa się szybkiego załamania, ale uważa, że trzeba to brać pod uwagę przy budowie firmy. Drugi ważny wątek to sandboksy. Modal wprowadził je, gdy założyciele zauważyli, że modele generują kod i ktoś będzie musiał go uruchamiać. Początkowe zainteresowanie było tak małe, że rozważano zamknięcie produktu. Potem przyszły agenty kodujące, agenty w tle i uczenie przez wzmacnianie, a sandboksy stanowią dziś mniej więcej jedną trzecią przychodów. Firma uruchomiła blisko trzy miliardy sandboksów.

W tle jest technika, która sprawia, że elastyczność działa, czyli bufor dostępnych GPU, własny system plików, punkty kontrolne procesów i migawki pamięci GPU, które skracają uruchomienie kolejnej repliki modelu. Rozmowa dotyka też alternatyw dla NVIDII, inżynierów wdrożeniowych i, co mnie zaciekawiło, opcjonalnych przeglądów kodu w firmie.

Muszę zaznaczyć, że czytałem tylko wstęp i spis treści wpisu, a nie pełną transkrypcję trwającą ponad godzinę, więc o szczegółach, takich jak argumenty za opcjonalnym przeglądem kodu, nic pewnego nie powiem. Z samego wstępu widać też, że to materiał przychylny, bo wywiad robiony jest z okazji dużej rundy finansowania i autorzy nie zadają trudnych pytań o marże ani o koncentrację klientów.

**Key takeaways:**
- Kontrakty na GPU mają kształt prostokąta, a popyt nie.
- Modal agreguje popyt wielu klientów i oferuje małe, elastyczne porcje mocy.
- Sandboksy dla agentów to około jedna trzecia przychodów firmy.
- Spadek cen GPU to ryzyko dla dostawcy, który zamknął drogą pojemność.

**Why do I care:** Dla architekta ważna jest lekcja, że koszt agenta to w dużej mierze czas uruchomienia środowiska. Jeśli budujemy produkt, w którym agent tworzy środowisko, uruchamia kod i próbuje ponownie, to opóźnienie startu staje się częścią doświadczenia użytkownika. Przy ocenie dostawców pytałbym o to wprost, zanim spojrzę na cenę za godzinę GPU.

**Link:** [Why AI Compute Comes in Rectangles, Erik Bernhardsson, Modal CEO](https://swyx.substack.com/p/modal-d)
