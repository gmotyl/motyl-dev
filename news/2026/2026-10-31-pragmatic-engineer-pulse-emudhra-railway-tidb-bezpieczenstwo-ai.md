---
title: "The Pulse: eMudhra, Railway, TiDB i czas na przemyślenie bezpieczeństwa oprogramowania w erze AI"
excerpt: "Gergely Orosz o tygodniu pełnym incydentów, w którym klucz prywatny CA okazał się liczbą 4, a atakujący dostali do ręki agentów."
publishedAt: "2026-10-31"
slug: "pragmatic-engineer-pulse-emudhra-railway-tidb-bezpieczenstwo-ai"
hashtags: "#pragmaticengineer #security #ai #agents #devops #nodejs #php #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Czas przemyśleć bezpieczeństwo oprogramowania przez AI

**TLDR:** W ciągu kilku dni wyciekły klucze pośredniego urzędu certyfikacji eMudhra, Railway ujawniło sekrety klientów, a PingCAP przez miesiąc nie wiedział o włamaniu. Autor uważa, że AI przechyla równowagę na korzyść atakujących i że trzeba zmienić podejście do łatania, monitoringu i kosztów bezpieczeństwa.

**Summary:** Najbardziej absurdalny incydent dotyczy eMudhry, pośredniego urzędu certyfikacji. Okazało się, że osiem jej kluczy prywatnych, mających mieć 384 bity, to w praktyce małe liczby. Jeden z nich to po prostu 4, inne to 56, 66, 115, 156, 230 i 237. Firma tłumaczy to błędem w skrypcie ceremonii generowania kluczy. Powstała druga, słabsza para kluczy, a ze względu na podobne etykiety to ona została użyta do podpisania żądania certyfikatu. Certyfikaty powstały 30 kwietnia 2025 roku, a błąd wyszedł na jaw po osiemnastu miesiącach. Chrome sprawdza, czy zostawić pozostałe certyfikaty eMudhry w swoim magazynie zaufanych. Spółka, notowana na giełdzie w Indiach, straciła w dwa dni około 40 procent wartości.

Drugi wątek to PHP. Badacze znaleźli krytyczną lukę dzięki GPT-5.6 Sol w ramach inicjatywy Patch the Planet, a poprawka została wydana. Problem w tym, że sama łatka pokazuje atakującym, gdzie uderzać, a około 70 procent stron działa na PHP. Prób wykorzystania luki było mnóstwo jeszcze zanim ją ogłoszono. Amazon zanotował pierwszą próbę w honeypocie 17 października, cztery dni przed publikacją. Cloudflare widział miliony prób w kilka godzin po wydaniu poprawki.

Railway wyciekły zaszyfrowane zmienne środowiskowe klientów, a część została odszyfrowana. Firma wstrzymała wszystkie deploye, co stworzyło pułapkę. Rotacja kluczy bez redeployu psuje aplikację, a bez rotacji klucz może być w rękach atakującego. Trwało to około dwudziestu godzin. PingCAP, dostawca zarządzanego TiDB, miał atakującego w systemach kontrolnych od 9 września do 7 października, a ujawnienie przyszło dopiero w tym tygodniu. Do sieci trafiło 10 TB danych klientów.

Orosz wylicza, co się zmienia. Ręczne śledzenie łatek co tydzień staje się tak samo nieodpowiedzialne jak zwlekanie z nimi miesiącami. Trzeba zakładać użycie luk zero-day i traktować automatyczny monitoring jako obowiązek. Obrońcy będą musieli używać AI, a bezpieczeństwo zrobi się droższe, bo ciągle działający agenci i inżynierowie "AI-native" kosztują. W dodatku od pierwotnej publikacji doszły kolejne luki, między innymi w bibliotece Brotli, w Pillow i kolejna w PHP.

**Key takeaways:**
- Klucze eMudhry były krótkimi liczbami, a błąd żył osiemnaście miesięcy bez wykrycia.
- Łatka open source ujawnia lukę, a agenci AI automatyzują jej wykorzystanie.
- Wstrzymanie deployów po wycieku sekretów utrudnia ich rotację.
- Brak monitoringu dostępu pozwolił atakującemu działać w PingCAP przez miesiąc.

**Why do I care:** Dla mnie najważniejsze są dwie rzeczy. Po pierwsze, skoro luka od ujawnienia do masowych prób zajmuje godziny, okno na ręczne łatanie przestaje istnieć i trzeba mieć automatykę aktualizacji z możliwością szybkiego cofnięcia. Po drugie, sekrety w zmiennych środowiskowych u zewnętrznego dostawcy trzeba umieć rotować bez jego udziału, bo właśnie Railway pokazało, że czasem się nie da. Autor słusznie pisze o kosztach, ale pomija to, że małe zespoły nie stać na "AI-native" zespół bezpieczeństwa. Dla nich realny plan to mniej zależności, krótkie życie sekretów i monitoring od pierwszego dnia.

**Link:** [The Pulse: Time to rethink software security because of AI?](https://newsletter.pragmaticengineer.com/p/the-pulse-time-to-rethink-software)
