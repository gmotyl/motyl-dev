---
title: "Kod, którego nikt nie czyta: co zastępuje przegląd linia po linii"
excerpt: "Addy Osmani wraca do rady sprzed dwóch lat — czytaj każdą linię kodu z AI — i mówi, że dziś powiedziałby to inaczej. Problemem nie jest to, że nikt nie czyta kodu, tylko że nic nie zastąpiło czytania jako źródła zaufania. Tekst pokazuje, co faktycznie musi je zastąpić."
publishedAt: "2026-09-29"
slug: "addyosmani-kod-ktorego-nikt-nie-czyta"
hashtags: "#AddyOsmani #ai #code-review #architecture #engineering #testing #generated #pl"
source_pattern: "Addy Osmani"
---

## Kod, którego nikt nie czyta

**TLDR:** Dwa lata temu Addy Osmani radził czytać każdą linię kodu wygenerowanego przez AI. Dziś twierdzi coś innego: przegląd linia po linii odchodzi dla większości kodu, i to w porządku, pod jednym warunkiem — musi to zastąpić coś równie skutecznego w budowaniu zaufania, a nie nic.

**Summary:** Punktem wyjścia są dwa viralowe teksty z tego samego tygodnia. Thorsten Ball opublikował listę szesnastu przekonań o przyszłości inżynierii oprogramowania, z których pierwsze brzmi "przegląd kodu umrze". Kilka dni później inżynier dwa tygodnie po starcie w dużej firmie opisał, jak spędza dni na wciskaniu enter na kodzie, którego nikt nie czyta — post zobaczyło ponad osiem milionów osób. Autor nie widzi w tych tekstach sprzeczności, tylko dwie strony tego samego zjawiska: jeden opisuje cel, drugi to, co się dzieje, gdy firma jedzie do tego celu bez budowania drogi.

Kluczowe rozróżnienie, jakie proponuje autor, brzmi: czytanie kodu linia po linii odchodzi dla dużej części kodu, ale przegląd — w sensie decyzji, co trafia na produkcję, i odpowiedzialności za tę decyzję — nie odchodzi nigdzie. Dowodem na to, że automatyczny przegląd potrafi realnie działać, jest doświadczenie Anthropic: zautomatyzowany recenzent Claude działa na niemal każdym PR-ze, inżynierowie oznaczają mniej niż 1% jego uwag jako błędne, a odsetek PR-ów z merytorycznym komentarzem z przeglądu wzrósł z 16% do 54% od momentu wdrożenia. W retrospektywnej analizie automatyczny przegląd każdej zmiany złapałby około jednej trzeciej błędów stojących za wcześniejszymi incydentami na claude.ai, zanim trafiły na produkcję.

Autor przywołuje też badanie Microsoftu z 2013 roku, w którym deweloperzy pytani, po co robią przegląd kodu, odpowiadali "żeby znaleźć błędy" — ale spośród 570 przeanalizowanych komentarzy z przeglądów tylko 14% dotyczyło faktycznie defektów. Reszta to nauczanie, dzielenie się kontekstem, sugerowanie lepszych podejść i pilnowanie norm zespołu. To właśnie ta część znika najciszej, gdy firma przestaje czytać diffy: junior uczył się kiedyś, jak myśli senior, właśnie z takich komentarzy, a teraz to wszystko trzeba świadomie zapisać w skillach agenta, bo inaczej agent nigdy tego nie usłyszy.

Historia zespołu z wciskaniem entera pokazuje, według autora, co się dzieje, gdy firma robi tę transformację w złej kolejności: zamiast przenieść zaufanie z diffu na mechanizmy kontrolne, po prostu przestała czytać diffy i wstawiła prędkość tam, gdzie wcześniej było zaufanie. To decyzja narzucona odgórnie, nie oddolnie przez deweloperów, którzy sami uznali narzędzie za pomocne — a ta różnica ma znaczenie, bo przegląd kodu robił też inną robotę: uczył, informował o zmianach, pozwalał zespołowi utrzymać własną poprzeczkę jakości. Kazać zespołowi przestać czytać to nie tylko usunąć kontrolę defektów — to powiedzieć mu, że poprzeczka nie jest już jego.

Autor kończy zestawem konkretnych rad dla kogoś, kto właśnie znalazł się w takiej sytuacji: naprawdę zrozumieć, co się buduje, zanim agent czegokolwiek dotknie; stosować test "czy potrafię to wytłumaczyć" zamiast testu "czy przeczytałem każdą linię"; być szczerym w opisie PR-a co do tego, czego się nie sprawdziło; i świadomie trzymać własne umiejętności koderskie w formie, bo jak pokazują badania Anthropic, nadzorowanie Claude wymaga dokładnie tych samych kompetencji, które zanikają, gdy się z nich nie korzysta.

**Key takeaways:**
- Przegląd linia po linii odchodzi dla dużej części kodu, ale sam przegląd — decyzja i odpowiedzialność za to, co trafia na produkcję — pozostaje w rękach człowieka.
- U Anthropic automatyczny recenzent Claude działa na niemal każdym PR-ze z mniej niż 1% błędnie oznaczonych uwag i złapałby około jednej trzeciej błędów za wcześniejszymi incydentami produkcyjnymi.
- Tylko 14% komentarzy z ludzkich przeglądów kodu dotyczy faktycznie błędów — reszta to nauczanie i utrzymywanie norm zespołu, co znika najciszej, gdy firma przestaje czytać diffy.
- Zespoły, które przestają czytać kod bez budowania w zamian mechanizmów zaufania, płacą tę cenę później, przy większych i droższych incydentach.

**Why do I care:** To jeden z rzadkich tekstów, który nie sprowadza tematu do "AI zabije code review" ani do "zawsze czytaj każdą linię", tylko pokazuje, że pytanie brzmi, co konkretnie zastępuje czytanie jako źródło zaufania w danym kontekście. Statystyka 14% komentarzy dotyczących błędów jest dla mnie kluczowa — pokazuje, że jeśli zredukujemy przegląd kodu wyłącznie do wyłapywania defektów przez automat, stracimy całą tę drugą, cichą funkcję przeglądu: onboarding juniorów i utrzymanie wspólnych norm zespołu. Dla architektów i tech leadów to konkretna wskazówka projektowa dla własnych procesów: jeśli wdrażacie automatyczny code review, świadomie zaprojektujcie osobny mechanizm na mentoring i przekazywanie kontekstu, bo automat go za was nie zrobi.

**Link:** [The Code Nobody Reads](https://addyo.substack.com/p/the-code-nobody-reads?publication_id=2115638&post_id=217348406&isFreemail=true&triedRedirect=true)
