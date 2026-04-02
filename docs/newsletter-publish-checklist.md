# Newsletter Publication Checklist

Workflow do publikacji każdego wydania newslettera motyl.dev.

---

## Faza 1 — Przygotowanie treści

- [ ] Zebranie linków źródłowych
- [ ] Uruchom `/generate-news` → wygenerowanie draftu newslettera
- [ ] Manualna edycja: headline, lead, komentarze do linków
- [ ] Sprawdź, że treść jest gotowa i zaakceptowana

---

## Faza 2 — Obrazek okładkowy

- [ ] Uruchom `/image-prompt` → Claude generuje prompt do NanoBanana (EN, abstract, dark bg, 16:9)
- [ ] Wygeneruj obrazek w NanoBanana (nanobanana.com) używając wygenerowanego promptu
- [ ] Pobierz obrazek `.webp` lokalnie
- [ ] Uruchom `/publish-image <ścieżka>` → optymalizacja + upload do Cloudflare R2 + URL wstawiony do frontmatter `image:`

---

## Faza 3 — Publikacja

- [ ] Sprawdź frontmatter artykułu (tytuł, slug, data, `image:` URL)
- [ ] `git push` → Vercel automatycznie deployuje
- [ ] Sprawdź podgląd na motyl.dev
- [ ] Wyślij email do audience (Resend / panel newslettera)

---

## Faza 4 — Content Repurposing

- [ ] Uruchom `/repurpose` → Claude generuje content atoms z newslettera:
  - Hook (LinkedIn/Bluesky)
  - Key insight
  - Framework/lista
  - Cytat do zdjęcia
  - CTA (call to action)
- [ ] Posty natywne dla: **LinkedIn**, **Bluesky**, **Twitter/X**
- [ ] *(opcjonalnie)* Instagram caption + opis do TikTok
- [ ] Zatwierdź i opublikuj posty (ręcznie lub przez Postiz gdy gotowy)

---

## Komendy reference

| Komenda | Co robi |
|---|---|
| `/generate-news` | Generuje draft newslettera z linków |
| `/image-prompt [N]` | Prompt do NanoBanana na podstawie treści |
| `/publish-image <path>` | Optimize → R2 upload → URL do frontmatter |
| `/repurpose [N]` | Content atoms → posty social media |

---

## Zmienne środowiskowe (`.env`)

```
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_API_TOKEN=
R2_BUCKET_NAME=motyl-dev-img
CDN_BASE_URL=https://img.motyl.dev
```
