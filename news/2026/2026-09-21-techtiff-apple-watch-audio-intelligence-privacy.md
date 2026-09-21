---
title: "TechTiff: Apple Watch uczy się słuchać rozmów, i co to oznacza dla prywatności osób obok"
excerpt: "Audio Intelligence, Live Rewind i Siri Recap zmieniają Apple Watch z urządzenia pracującego na twoich danych w mikrofon nasłuchujący otoczenia, z prywatnością zaprojektowaną wokół użytkownika, ale nie wokół osób, które rozmawiają obok."
publishedAt: "2026-09-21"
slug: "techtiff-apple-watch-audio-intelligence-privacy"
hashtags: "#TechTiff #ai #security #mobile #generated #pl"
source_pattern: "TechTiff"
---

## Twój Apple Watch uczy się notować rozmowy

**TLDR:** Nowa funkcja Audio Intelligence w Apple Watch Series 12 i Ultra 4 rozpoznaje muzykę i dźwięki otoczenia, a planowane na betę pod koniec 2026 roku Live Rewind i Siri Recap odtwarzają ostatnie 15 sekund mowy jako tekst albo streszczają całą rozmowę. Przetwarzanie odbywa się głównie lokalnie i w Private Cloud Compute, ale system nasłuchuje też osoby, które nigdy nie zgodziły się na nagrywanie.

**Summary:** Audio Intelligence przesuwa Apple Intelligence poza dane już zapisane w telefonie, wiadomości, zdjęcia, notatki, w stronę fizycznego otoczenia użytkownika. Na Watchu Series 12 i Ultra 4 przetwarzanie dźwięku zaczyna się w osobnym, chronionym obszarze chipu S11, dźwięk zostaje tam krótko przetworzony bez tworzenia zapisanego nagrania. Rozpoznawanie muzyki działa przez sygnaturę akustyczną wysyłaną do Shazam zamiast surowego audio, a rozpoznawanie dźwięków jak alarmy czy dzwonek do drzwi odbywa się w całości lokalnie na zegarku, nawet bez sparowanego telefonu w zasięgu.

Live Rewind idzie o krok dalej: dwukrotne naciśnięcie Digital Crown przywołuje tekst ostatnich 15 sekund mowy, czyli zdanie, które ktoś przegapił podczas wykładu czy rozmowy. Zegarek trzyma dźwięk tymczasowo w chronionym sprzęcie, szyfruje go i wysyła do sparowanego iPhone'a do dalszego przetwarzania, a jeśli tekst nie zostanie zapisany ani przekazany do Siri, znika automatycznie około 30 sekund po przygaśnięciu ekranu. Aktywacja Live Rewind zawsze odtwarza dźwięk sygnalizujący i pokazuje pełnoekranową animację, nawet w trybie cichym czy przy podłączonych słuchawkach, co jest jedynym mechanizmem informującym osobę mówiącą, że jej słowa zostały właśnie odtworzone.

Siri Recap idzie jeszcze dalej: po włączeniu nagrywa całą rozmowę, szyfruje audio i wysyła je do chronionej części sparowanego iPhone'a, który zamienia mowę na tekst, skraca go i przekazuje do Private Cloud Compute, gdzie powstaje tytuł, streszczenie i kluczowe punkty rozmowy. Funkcja nie przypisuje wypowiedzi do konkretnych rozmówców, ale imiona wspomniane w rozmowie mogą i tak trafić do streszczenia. Recap znika po siedmiu dniach, chyba że zostanie zapisany, a zapisane wersje synchronizują się między urządzeniami z szyfrowaniem end-to-end pod warunkiem włączonego uwierzytelniania dwuskładnikowego iCloud.

Całość wpisuje się w architekturę Apple Intelligence: proste zadania przetwarza model lokalny na telefonie, a bardziej złożone trafiają zaszyfrowane do Private Cloud Compute, którego oprogramowanie mogą audytować niezależni badacze, a urządzenie weryfikuje przed wysłaniem żądania. Raport Apple Intelligence Report w ustawieniach pozwala wyeksportować pełną listę żądań wysłanych do Private Cloud Compute, co daje realny wgląd w to, co faktycznie opuściło telefon.

**Key takeaways:**
- Live Rewind odtwarza ostatnie 15 sekund mowy jako tekst i zawsze sygnalizuje aktywację dźwiękiem, nawet w trybie cichym, ale nie gwarantuje, że osoba mówiąca to zauważyła czy zrozumiała
- Siri Recap nagrywa i streszcza całe rozmowy, nie przypisując wypowiedzi do rozmówców, ale mogące zawierać ich imiona, i znika po siedmiu dniach, jeśli nie zostanie zapisany
- Apple Intelligence Report w ustawieniach prywatności eksportuje pełną listę żądań wysłanych do Private Cloud Compute, co daje konkretny sposób sprawdzenia, jakie dane faktycznie opuściły urządzenie

**Why do I care:** To dobry przykład tego, jak projekt prywatności skupiony wyłącznie na właścicielu urządzenia zostawia lukę wokół osób trzecich, które nigdy nie zgodziły się na przetwarzanie ich głosu. Dla zespołów budujących produkty z mikrofonem, kamerą czy dowolnym czujnikiem otoczenia to konkretny wzorzec do skopiowania: lokalne przetwarzanie tam, gdzie to możliwe, jasny sygnał aktywacji słyszalny dla wszystkich w pomieszczeniu, i krótki, domyślny czas życia danych, zamiast polegania wyłącznie na regulaminie, którego i tak nikt obok nie czytał.

**Link:** [Your Apple Watch Is Learning to Take Notes](https://techtiff.substack.com/p/apple-watch-ai-privacy)
