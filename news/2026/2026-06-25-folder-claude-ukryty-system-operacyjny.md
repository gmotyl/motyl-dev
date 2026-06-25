---
title: "Folder .claude - ukryty system operacyjny Claude Code"
excerpt: "Jak prawidłowo skonfigurować foldery .claude i pliki CLAUDE.md, żeby Claude Code działał zgodnie z naszymi oczekiwaniami w każdym projekcie."
publishedAt: "2026-06-24"
slug: "folder-claude-ukryty-system-operacyjny"
hashtags: "#neokim #claudeCode #aitools #devtools #generated #pl"
source_pattern: "NeoKim"
---

## Folder .claude - ukryty system operacyjny Claude Code

**TLDR:** Claude Code przy starcie sesji czyta folder `.claude`, który zawiera instrukcje, uprawnienia i gotowe komendy. Bez odpowiedniej konfiguracji tego folderu, narzędzie pyta o pozwolenie na rzeczy, które już raz zatwierdziliśmy, i nie pamięta niczego między sesjami. Dobrze skonfigurowany `.claude` sprawia, że Claude wchodzi w każdy projekt już znając zasady.

Przez pierwsze miesiące używania Claude Code w codziennej pracy zupełnie ignorowałem folder `.claude`. Kopiowałem te same instrukcje przy każdej nowej sesji, Claude pytał o pozwolenie na rzeczy, które tydzień wcześniej już zatwierdziłem, a przy otwarciu nowego projektu narzędzie nie wiedziało absolutnie nic. To była strata czasu, którą można było łatwo wyeliminować.

Folder `.claude` to nie jakiś opcjonalny dodatek - to rdzeń konfiguracji całego narzędzia. Przy starcie sesji Claude czyta ten folder jako pierwszy, zanim jeszcze wpisze się jakiekolwiek polecenie. Wewnątrz znajdziemy trzy kategorie plików: instrukcje, uprawnienia i wielokrotnego użytku komendy.

Istotne jest rozróżnienie między dwoma lokalizacjami tego folderu. `~/.claude/` w katalogu domowym to konfiguracja globalna, która obowiązuje we wszystkich sesjach Claude Code niezależnie od projektu. `.claude/` w katalogu projektu to konfiguracja lokalna, widoczna tylko przy pracy w tym konkretnym repozytorium. Claude ładuje najpierw globalną, potem projektową - lokalne ustawienia nadpisują globalne tam, gdzie wystąpią konflikty. To elegancki model warstwowy, który pozwala mieć spójne preferencje osobiste i jednocześnie specyficzne reguły dla każdego projektu.

Osobną kwestią jest plik `CLAUDE.md`, który nie trafia do folderu `.claude/`, lecz leży w głównym katalogu projektu. To nie jest dokumentacja dla ludzi - to instrukcje dla Claude'a. Różnica jest fundamentalna. Regularne README tłumaczy co projekt robi i jak go zainstalować. `CLAUDE.md` mówi Claude'owi jak ma się zachowywać: jakich konwencji przestrzegać, czego nie ruszać bez pytania, jakie pliki są generowane automatycznie i gdzie leżą konfiguracje bazy danych. Claude ładuje pliki `CLAUDE.md` w kolejności: globalny, projektowy, a następnie wszystkie w podfolderach, w których aktualnie pracujemy. Wszystkie się nakładają - każdy dodaje więcej instrukcji, nie zastępując poprzednich.

Ważna obserwacja: dłuższy `CLAUDE.md` wcale nie znaczy lepszy. Instrukcje konkurują o uwagę - te na końcu długiego pliku Claude łatwiej ignoruje niż te na początku. 200-liniowy plik często jest po prostu głośnym szumem. Sprawdzian jest prosty: jeśli usunięcie linii nie zmieni zachowania Claude'a, tę linię można skreślić. Warto też pamiętać, że importowane pliki przez `@` nadal liczą się do limitu kontekstu - podział na pliki poprawia organizację, ale nie zmniejsza zużycia kontekstu.

**Key takeaways:**
- Folder `.claude/` istnieje w dwóch miejscach: globalnym (`~/.claude/`) i projektowym (`.claude/` w repozytorium) - Claude ładuje je warstwowo
- `CLAUDE.md` to instrukcje behawioralne dla Claude'a, nie dokumentacja projektu - należy zapisywać w nim reguły niewidoczne w kodzie
- Do repozytorium commitujemy `settings.json`, `commands/` i `rules/`, ale nie `settings.local.json` który zawiera ścieżki specyficzne dla danej maszyny
- Krótki, konkretny `CLAUDE.md` działa lepiej niż obszerny - instrukcje na końcu długiego pliku mają mniejszą siłę oddziaływania
- Folder `.claude/rules/` pozwala podzielić duży `CLAUDE.md` na tematyczne pliki, które Claude automatycznie wczytuje przy starcie sesji

**Why do I care:** To coś, co powinna skonfigurować każda osoba korzystająca z Claude Code w trybie profesjonalnym. Bez tego narzędzie zachowuje się jak pracownik, który pierwszego dnia w pracy nie dostał żadnego briefingu - pyta o wszystko, nie zna historii projektu i zapomina ustalenia z poprzedniego dnia. Przygotowanie sensownego `.claude` z regułami projektu i wrzucenie go do repozytorium to inwestycja, która zwraca się przy każdym kolejnym `git clone` przez każdego członka zespołu. Zamiast tłumaczyć Claude'owi od zera przy każdej sesji, narzędzie wchodzi w kontekst projektu zanim jeszcze napiszemy pierwsze pytanie.

**Link:** [You Won't Use Claude The Same Way After Understanding This Folder](https://newsletter.systemdesign.one/p/claude-folder?publication_id=1511845&post_id=198302827&isFreemail=true&triedRedirect=true)
