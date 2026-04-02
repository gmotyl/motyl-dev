# Plan: Content Pipeline — motyl.dev

**Branch:** `feature/content-pipeline`
**Status:** Planowanie — nic nie zaimplementowane

---

## Full Flow: Newsletter → Content Repurposing

```
1. Przygotowanie newslettera z linków (jak teraz)
2. Manualna edycja przez Grega (headline, tekst)
3. Claude generuje prompt do NanoBanana (na podstawie treści)
4. Greg generuje obrazek w NanoBanana
5. /publish-image → pnpm image:optimize → upload R2 → URL do .md
6. Publish na motyl.dev
7. Send email do audience
        ↓
8. /repurpose [N] → content atoms → posty na platformy
9. Opcjonalnie: Postiz scheduler do zaplanowania postów
```

---

## Blok 1: `/image-prompt [N]`

**Plik:** `commands/image-prompt.md`

**Opis:** Generuje gotowy prompt do NanoBanana na podstawie treści newslettera (lub artykułu).

**Wejście:**
- Opcjonalny numer issue newslettera `[N]` — jeśli brak, bierze najnowszy plik `.md` z `content/newsletter/`

**Wyjście:**
- Gotowy prompt w języku angielskim (NanoBanana działa lepiej po angielsku)
- Styl: abstract/conceptual, zgodny z identyfikacją wizualną motyl.dev
- Proporcje: sugerowane do hero image newslettera

---

## Blok 2: `/publish-image <path>`

**Plik:** `commands/publish-image.md`

**Opis:** Optymalizuje obrazek i uploaduje do Cloudflare R2, wstawia URL do frontmatter artykułu.

**Flow:**
1. Autodetekcja artykułu — najnowszy `.md` w `articles/` jako kandydat
2. Wyświetla: "Czy to właściwy artykuł? [Y/n lub podaj slug]"
3. `pnpm image:optimize` — kompresja obrazka
4. `wrangler r2 object put` — upload do Cloudflare R2
5. URL: `https://cdn.motyl.dev/blog/[slug].[ext]`
6. Automatyczny wpis URL do frontmatter: pole `image:`

**Wymaga:**
- Cloudflare API key (Greg poda później)
- `wrangler` CLI (`pnpm add -D wrangler` lub globalnie)
- Konfiguracja bucketu R2 w `wrangler.toml`

**Struktura pliku:** `public/images/blog/[slug].[ext]`

---

## Blok 3: `/repurpose [N]`

**Plik:** `commands/repurpose.md`

**Opis:** Rozkłada newsletter na "content atoms" i generuje natywne posty dla każdej platformy.

**Filozofia: "Tuna Principle"**
Nie skracasz — rozkładasz na atomy i rekomponujesz natywnie dla każdej platformy.

**Content Atoms** (wyciągane z newslettera):
- Hook (pierwsze zdanie które zatrzymuje scroll)
- Central Insight (1 myśl, którą chcesz żeby zapamiętali)
- Framework/Lista (jeśli jest)
- Cytat/Statystyka (najbardziej shareowalna)
- CTA (co chcesz żeby zrobili)

**Platformy:**

| Platforma | Format | Długość | Styl |
|---|---|---|---|
| LinkedIn | Post narracyjny | 1200-1500 znaków | Personal insight + data |
| Bluesky | Thread 5-7 postów | 300 znaków/post | Conversational, hooky |
| Twitter/X | Thread 5-7 tweetów | 280 znaków/tweet | Punchy, listy |
| Instagram | Caption + hashtagi | 300 znaków | Visual storytelling |
| TikTok | Script (hook+body+CTA) | ~60 sek (~150 słów) | Energetyczny, narracyjny |

**Wyjście:** Gotowe posty w osobnych sekcjach, gotowe do skopiowania lub wklejenia do Postiz.

---

## Blok 4: Postiz (opcjonalnie, osobny setup)

**Co to:** Self-hosted social media scheduler (17+ platform, open source MIT)
**Repo:** https://github.com/gitroomhq/postiz-app
**Hosting:** NAS Foundation1 (Docker)

**Rola w pipeline:**
- Zamiast ręcznego postowania — wkleja posty z `/repurpose` do Postiz
- Postiz scheduluje na optymalny czas dla każdej platformy
- Dashboard do zarządzania contentem

**Status:** Do osobnego planowania — wymaga Docker setup na NAS

---

## Kolejność implementacji

1. `/image-prompt` — najprostsze, tylko generowanie tekstu
2. `/publish-image` — wymaga Cloudflare API key od Grega + wrangler setup
3. `/repurpose` — najbardziej rozbudowane, ale niezależne od infrastruktury
4. Postiz — osobny projekt, Docker na NAS

---

## Otwarte pytania

- [ ] Cloudflare API key — Greg poda później
- [ ] Nazwa bucketu R2 i base URL CDN (np. `cdn.motyl.dev`)
- [ ] Czy Instagram i TikTok obsługuje Postiz? (tak, według docs)
- [ ] Czy /repurpose generuje od razu wszystkie platformy czy pytać które?
