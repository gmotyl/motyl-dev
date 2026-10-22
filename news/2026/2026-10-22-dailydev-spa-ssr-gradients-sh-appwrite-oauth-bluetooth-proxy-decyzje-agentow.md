---
title: "SPA kontra SSR, gradienty WebGPU, nowi dostawcy OAuth w Appwrite, proxy Bluetooth i czego program potrzebuje, żeby decydować"
excerpt: "Wybór między SPA, renderowaniem serwerowym i wyspami, animowane gradienty dla Reacta, sześciu nowych dostawców OAuth2 w Appwrite, ESP32 jako proxy Bluetooth i pięć zdolności, których agent potrzebuje od API."
publishedAt: "2026-10-22"
slug: "dailydev-spa-ssr-gradients-sh-appwrite-oauth-bluetooth-proxy-decyzje-agentow"
hashtags: "#dailydev #frontend #webdev #react #astro #ssr #performance #appwrite #oauth #agents #architecture #generated #pl"
source_pattern: "daily.dev"
---

## SPA kontra renderowanie po stronie serwera, czyli co właściwie robi użytkownik

**TLDR:** Wybór między aplikacją jednostronicową, SSR i wyspami zależy od tego, co użytkownik robi na stronie, a nie od etykiety architektury. Renderowanie i routing to dwie osobne decyzje i można je łączyć.

**Summary:** Autor zaczyna od rozdzielenia dwóch rzeczy, które zwykle wrzucamy do jednego worka. Renderowanie odpowiada na pytanie, kto produkuje HTML. Routing odpowiada na pytanie, jak nawigacja zmienia widok. Można więc mieć renderowanie na serwerze, hydrację i router po stronie klienta jednocześnie, i to jest całkiem zwyczajny układ.

Dla stron z treścią naturalnym punktem startu jest HTML wysłany z serwera. Astro i jego wyspy dokładają JavaScript tylko tam, gdzie jest potrzebny, na przykład w kalkulatorze albo filtrze. Pełna SPA zaczyna się opłacać wtedy, gdy stan musi przetrwać nawigację. Autor podaje przykład edytora audio, w którym nie chcemy zgubić niezapisanego projektu, pozycji odtwarzania i układu paneli. Kiedy wyspy zaczynają się ze sobą intensywnie koordynować, na przykład filtr steruje paskiem bocznym, edytorem i kilkoma dialogami, to znak, że potrzebujesz wspólnego stanu aplikacji.

Ciekawy jest wątek przeglądarkowy. Paint holding w Chrome i międzydokumentowe view transitions pozwalają animować przejścia między osobnymi stronami bez routera po stronie klienta. Żadna z tych funkcji nie zachowa jednak stanu JavaScript z poprzedniej strony ani nie sprawi, że wolny serwer odpowie szybko. Do tego dochodzi SEO. Google renderuje strony w osobnym etapie, a inne boty często nie wykonują JavaScriptu wcale, więc główna treść produktu powinna być w pierwszym HTML.

**Key takeaways:**
- Renderowanie i routing to osobne decyzje.
- Wyspy pasują do treści z lokalnymi fragmentami interakcji, SPA do pracy, w której stan musi przetrwać nawigację.
- View transitions między dokumentami zastępują część powodów, dla których sięgano po router klienta.

**Why do I care:** Ten wybór wciąż zapada na podstawie mody, a nie pytania "co użytkownik tu robi". Brakuje mi w tekście liczb, bo "policz żądania, na które czeka użytkownik" jest dobrą radą, ale bez pomiarów to tylko hasło. Mimo to lista pytań kontrolnych nadaje się na slajd przed każdą przebudową frontendu.

**Link:** [SPA vs server-side rendering: which should you choose?](https://daily.dev/posts/uMWwJmuNl)

## gradients.sh, animowane gradienty dla Reacta na WebGPU

**TLDR:** Biblioteka animowanych teł gradientowych renderowanych na GPU przez WebGPU, z awaryjnym WebGL. Darmowe komponenty instaluje się przez CLI shadcn, a wersja Pro kosztuje jednorazowo 179 dolarów dla pierwszych 50 kupujących.

**Summary:** To przede wszystkim oferta produktowa, więc warto ją czytać z odpowiednim dystansem. Biblioteka dostarcza 33 komponenty i 207 presetów, a wersja Pro dodaje efekty interaktywne, szklane i ditheringowe. Eksport obejmuje PNG do 16K oraz wideo MP4 w 6K i 4K60, a licencja pozwala na pracę komercyjną dla klientów. Po pierwszych 50 licencjach cena rośnie do 249 dolarów.

Technicznie najciekawsze jest to, że tło liczone na GPU nie obciąża głównego wątku. Autor nie mówi jednak nic o zużyciu baterii na telefonach ani o tym, jak biblioteka zachowuje się przy włączonym prefers-reduced-motion. A to są pytania, od których zależy, czy takie tło trafi na stronę produkcyjną.

**Key takeaways:**
- 33 komponenty i 207 presetów, darmowa część przez CLI shadcn.
- Licencja lifetime za 179 dolarów, potem 249.
- Brak informacji o kosztach energii i dostępności.

**Why do I care:** Dla frontendowca to raczej ciekawostka niż decyzja architektoniczna. Animowane tło w hero sekcji kusi, ale każdy kosztowny efekt trzeba policzyć w budżecie wydajności i zabezpieczyć wariantem bez ruchu.

**Link:** [gradients.sh: animated gradient backgrounds for React](https://daily.dev/posts/0M1nzfcv8)

## Sześciu nowych dostawców OAuth2 w Appwrite Auth

**TLDR:** Appwrite Auth obsługuje logowanie przez Hugging Face, Resend, Cloudflare, TikTok, Kakao i Webflow. Używa się tych samych wywołań API co dla starszych dostawców, zmienia się tylko wartość identyfikatora dostawcy.

**Summary:** Dla Cloudflare i Resend Appwrite obsługuje PKCE. Tokeny odświeżają się dla wszystkich nowych dostawców poza Webflow. TikTok i Resend nie udostępniają adresu e-mail, więc użytkownicy z tych źródeł powstają bez niego. To szczegół, który łatwo przeoczyć, a potem zdziwić się, że nie da się wysłać maila z potwierdzeniem.

Wszystko działa już w Appwrite Cloud. Instancje samodzielnie hostowane dostaną te funkcje w wersjach 2.0, 2.1 i 2.4. Przykłady w ogłoszeniu używają node-appwrite 29.4.0 i Web SDK 28.3.0.

**Key takeaways:**
- Nowi dostawcy to Hugging Face, Resend, Cloudflare, TikTok, Kakao i Webflow.
- Brak e-maila w TikTok i Resend wymaga innej strategii identyfikacji użytkownika.
- Self-hosting dostaje funkcję z opóźnieniem, w trzech liniach wersji.

**Why do I care:** Logowanie przez Cloudflare albo Hugging Face ma sens dla narzędzi deweloperskich, gdzie użytkownicy i tak mają te konta. Ale konto bez adresu e-mail łamie założenia wielu systemów, więc to trzeba zaprojektować przed włączeniem dostawcy, nie po.

**Link:** [Six new OAuth2 providers just landed in Appwrite Auth](https://daily.dev/posts/Oe0K3TbaP)

## Proxy Bluetooth na ESP32 dla Home Assistanta

**TLDR:** Tanie płytki ESP32 z firmwarem ESPHome rozszerzają zasięg Bluetooth Low Energy w domu. Wszystko działa lokalnie, a czujniki oszczędzają baterię.

**Summary:** Urządzenia BLE mają zwykle zasięg 10 do 20 metrów, więc w większym domu jedna karta Bluetooth nie wystarczy. Zamiast kupować adapter dalekiego zasięgu, wgrywa się gotowy firmware proxy na kilka ESP32 i rozmieszcza je po pomieszczeniach. Potem dodaje się je do Home Assistanta i konfiguruje plik YAML.

Zaleta jest prosta. Dane krążą tylko w sieci lokalnej, więc sterowanie jest szybsze i prywatniejsze. Czujnik wysyła ogłoszenie do najbliższego proxy i wraca do uśpienia, więc nie utrzymuje aktywnego połączenia, co wydłuża życie baterii. Gęsta sieć proxy daje też dokładniejsze punkty wykrywania obecności do automatyzacji.

**Key takeaways:**
- ESP32 plus gotowy firmware ESPHome wystarczy.
- Nie potrzeba internetu ani chmury.
- Bliskie proxy oznacza mniej retransmisji i dłuższą pracę baterii.

**Why do I care:** To jest materiał poza głównym nurtem frontendu, ale dobrze pokazuje architekturę, którą lubię. Wiele tanich węzłów na brzegu, jeden lokalny koordynator i zero zależności od cudzej chmury.

**Link:** [Bluetooth proxies are the most magical, simple tech to deploy in your smart home](https://daily.dev/posts/9UPFcaDOF)

## Czego program potrzebuje, żeby zdecydować, co zrobić dalej

**TLDR:** Kin Lane, za Mikiem Amundsenem, przekłada autonomię agentów na pięć zdolności i trzy klocki, czyli fakty, relacje i możliwości. Wniosek jest taki, że inżynierię kontekstu powinien robić dostawca API, a nie tylko autor agenta.

**Summary:** Pytanie z tytułu przesuwa uwagę z tego, co agent ma zrobić, na to, czego potrzebuje, żeby w ogóle zdecydować. Lane wymienia pięć rzeczy. Program musi się umiejscowić, ocenić, co jest istotne dla celu, zdecydować o kolejnym kroku, rozpoznać sukces i wiedzieć, kiedy przestać. Każdą z nich wiąże z artefaktami, które katalog APIs.io już śledzi, jak profile dostawców, kontrakty OpenAPI, przepływy Arazzo, schematy, limity i zasady dostępu dla agentów.

Trzy klocki drugiej tezy to fakty, relacje i możliwości. Fakty to kontrakty i kształty danych, które zamieniają założenia w rzeczy sprawdzalne. Relacje to grafy integracji i powiązania między dostawcami. Możliwości to modele zdolności biznesowych, narzędzia MCP i operacje wraz z regułami dostępu. Najmocniejszy argument jest taki, że opis środowiska w prompcie działa dla jednego agenta w jednej aplikacji, a jawny opis zrobiony raz może czytać każdy program.

Czego tu brakuje? Autor sam prowadzi katalog API, więc teza, że to dostawca ma odrobić pracę, jest mu wygodna. Nie ma też słowa o tym, kto zapłaci za utrzymanie tych opisów i co się dzieje, gdy kontrakt zmieni się szybciej niż dokumentacja.

**Key takeaways:**
- Pięć zdolności to sytuowanie się, ocena istotności, decyzja, rozpoznanie sukcesu i wiedza, kiedy przestać.
- Fakty, relacje i możliwości odpowiadają kontraktom, grafom integracji i modelom zdolności.
- Limity, semantyka błędów i zasady dostępu wyznaczają moment, w którym agent ma się zatrzymać.

**Why do I care:** Jeśli projektujesz API, z którego będą korzystać agenci, pomyśl o limitach, odwracalności operacji i miejscach wymagających zgody człowieka jako o części kontraktu. To jest pożyteczne niezależnie od tego, czy kupujesz katalog Lane'a.

**Link:** [What A Program Needs In Order To Decide](https://daily.dev/posts/HpN5lPubC)
