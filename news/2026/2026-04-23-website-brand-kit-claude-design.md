---
title: "How I Turned My Website Into a Brand Kit for Claude Design"
excerpt: "Autor zbudował skill który automatycznie ekstrakcie brand assets z strony www do użycia w Claude Design — kolory, fonty, voice i komponenty."
publishedAt: "2026-04-23"
slug: "website-brand-kit-claude-design"
hashtags: "#ai #claude #design-system #branding #generated #pl"
source_pattern: "Substac"
---

## How I Turned My Website Into a Brand Kit for Claude Design

**TLDR:** Autor zbudował skill "Design System Builder" który ekstrakcie brand assets z dowolnej strony www — kolory, fonty, gradienty, spacing, voice — i generuje folder gotowy do wgrania do Claude Design. Zamiast budować brand kit ręcznie, wystarczy wskazać URL i skill zrobi resztę.

**Summary:** Problem jest znajomy dla wielu osób pracujących z AI: LinkedIn carousele nie pasują do strony www, pitch deck ma inny accent color, wszystko jest "trochę nie tak". Autor zauważył tę niespójność za każdym razem, ale ciągle przegrywało to z następnym deadline'm. Potem pojawiło się Claude Design z featurem który pozwala uploadować brand assets raz i każdy kolejny projekt dziedziczy je automatycznie. Problem: nadal trzeba zbudować ten folder. Większość z nas nie ma Figma ani zorganizowanego codebase — ale każdy ma stronę www z podjętymi decyzjami brandowymi. Skill działa w dwóch trybach: jeśli masz stronę — ekstrakcie z niej wszystko widoczne (kolory, fonty, gradienty, spacing, logo w rozdzielczości), jeśli nie masz — przeprowadza wywiad, pyta o marki które podobają się wizualnie i buduje palette z ich palet. Oba pathy produkują ten sam output: folder z brand.json jako single source of truth, szablony dla LinkedIn, Instagram, slide decks, i hard rules które Claude musi respektować. Kluczowa zasada: "always use X, never Y" zamiast "usually use X".

**Key takeaways:**
- Brand extraction działa przez Claude for Chrome dla wizualiów i Tavily dla copy
- brand.json to single source of truth — zmień jeden kolor i aktualizuje się wszędzie
- Bez strony www skill przeprowadza wywiad i buduje brand z preferencji użytkownika
- Lokalne fonty zamiast external sources — unikasz silent break'ów

**Why do I care:** Jako frontend developer, widzę tu potencjał ale też realistyczne ograniczenia. Pomysł jest dobry: zamiast ręcznie dokumentować brand, extraction z działającej strony. Ale autor sam przyznaje że to nie jest "one-shot process" — potrzebujesz kilku iteracji żeby wszystko zadziałało. Dla mojego teamu to narzędzie mogłoby być useful przy onboardingu nowych projektów, ale nie widzę żeby zastąpiło prawdziwy design system. Co ciekawe, skill dodaje voice rules — nie tylko wizualne ale też copy patterns. To jest element którego wielu design systems brakuje: brand to nie tylko kolory, to też jak firma pisze. Na koniec, ograniczenie które mnie najbardziej martwi: "sites with inconsistent design produce inconsistent extractions". Jeśli twoja strona ewoluowała przez lata i homepage nie pasuje do about page — skill to wyłapie i brand.json będzie niespójny. Musisz to czyścić ręcznie.

**Link:** [How I Turned My Website Into a Brand Kit for Claude Design](https://aimaker.substack.com/p/claude-design-brand-system-skill-guide?publication_id=4443372&post_id=194991786&isFreemail=true&triedRedirect=true)