---
title: "Caveman: plugin do Claude Code, który uczy AI mówić mniej i robić więcej"
excerpt: "Caveman to plugin do Claude Code, który redukuje verbose odpowiedzi modelu o 75% tokenów, odsłaniając przy okazji głębszy problem z tym, jak AI coding assistants zostały zaprojektowane."
publishedAt: "2026-06-29"
slug: "caveman-plugin-claude-code-oszczednosc-tokenow-ai-verbosity"
hashtags: "#aifordev #ai #devtools #productivity #agents #generated #pl"
source_pattern: "AIForDev"
---

## Caveman: plugin, który uczy Claude Code mówić po ludzku, czyli krótko

**TLDR:** Caveman to plugin do Claude Code autorstwa Juliusa Brussee, który kompresuje odpowiedzi modelu do telegramowego minimum. Działa przez sześć poziomów intensywności, od lekkiego uciszenia po ekstremalną kompresję. Artykuł jest ciekawy nie dlatego, że plugin jest genialny, ale dlatego, że w ogóle istnieje potrzeba jego tworzenia.

**Summary:**

Ktoś wrzucił na Reddit post z tytułem "Nauczyłem Claude'a gadać jak jaskiniowiec, żeby zużywać 75% mniej tokenów" i dostał 10 tysięcy upvote'ów. Połowa komentujących śmiała się. Druga połowa już instalowała. Ja też zainstalowałem. I po kilku tygodniach codziennego używania mam mieszane uczucia. Nie wobec samego pluginu, bo działa. Moje mieszane uczucia dotyczą tego, że w ogóle trzeba było go napisać.

Caveman robi jedną rzecz: zmusza Claude'a do pomijania całej werbalnej otoczki wokół odpowiedzi. Zero "Świetne pytanie, chętnie wyjaśnię". Zero długich wstępów, w których model opisuje, co zaraz zrobi, zamiast po prostu to zrobić. Kod naprawdę jest identyczny, bo model nadal myśli tak samo. Zmienia się tylko to, ile z tego myślenia jest potem narrowane na głos. Autor pluginu, Julius Brussee, ujął to celnie: "Brain still big. Mouth small." Mózg nadal duży. Usta małe. Instalacja sprowadza się do dwóch poleceń w terminalu i restartu Claude Code.

Plugin ma sześć trybów, od "lite" usuwającego tylko grzeczności przy pełnej gramatyce, przez domyślny tryb skróconych zdań bez rodzajników, aż po "ultra" z ciężkimi skrótami do głębokich sesji skupienia. Jest też "wenyan", bazujący na wzorcach klasycznej chińskiej kompresji, co autor sam opisuje jako "przede wszystkim ciekawostkę", ale i tak Twórcę pluginu szanuję za to, że to w ogóle zbadał. Caveman inteligentnie wyczuwa kontekst: jeśli zadajesz pytania w stylu "dlaczego" albo "wytłumacz", automatycznie wraca do pełnej prozy, bo wykrywa intencję eksploracyjną. Można też dodać instrukcje do globalnego CLAUDE.md i te same reguły zadziałają w Cursor, Cline czy Copilot.

Tu jednak zaczyna się część, którą autor artykułu starannie omija. Zadaje retoryczne pytanie "dlaczego domyślny tryb AI coding assistants to tyle gadania?", a potem odpowiada, że to artefakt trenowania. Modele uczą się z ludzkiego pisania, a ludzie używają słów, żeby pokazać swoją pracę. To prawda, ale niepełna. Prawdziwy powód jest prozaiczny: modele były oceniane przez ludzi, którzy wolą dłuższe, bardziej uprzejme odpowiedzi, bo tak wyglądają "dobre" odpowiedzi w kontekście customer service i tutoriali. Optymalizacja pod RLHF poszła w kierunku "użytkownik jest zadowolony z odpowiedzi" zamiast "użytkownik szybko skończył zadanie". To są dwa bardzo różne cele. Caveman jest symptomem tego, że deweloperzy mają inne potrzeby niż "typowy użytkownik", dla którego te modele były tunowane.

Jest też aspekt, o którym artykuł nie wspomina wcale: koszty. 75% mniej tokenów to przy intensywnym użyciu nie jest żart. Jeśli używasz Claude Code przez kilka godzin dziennie na dużym projekcie, to przy miesięcznym rozrachunku liczby mogą być naprawdę znaczące. Autor pisze o tym jako o wydajności, ale to też po prostu oszczędność pieniędzy. I fakt, że musisz instalować zewnętrzny plugin, żeby nie płacić za słowa, których nie chciałeś, jest sam w sobie dość wymowny.

**Key takeaways:**
- Caveman redukuje werbalną otoczkę Claude'a bez wpływu na jakość rozumowania, bo model nadal "myśli" tak samo
- Plugin działa przez sześć poziomów kompresji i inteligentnie wykrywa, kiedy wróć do pełnej prozy
- Verbosity AI coding assistants to nie feature, lecz efekt uboczny RLHF tunowanego pod satysfakcję, nie produktywność dewelopera
- Ten sam efekt można osiągnąć przez CLAUDE.md i zadziała w Cursor, Cline, Copilot bez dedykowanego pluginu
- 75% mniej tokenów to przy intensywnym użyciu realna oszczędność finansowa, nie tylko lepsza ergonomia

**Why do I care:**

Jako senior frontend developer i architect pracuję z AI coding assistants codziennie, na dużych bazach kodu. Jeden z moich największych frustrations przez ostatni rok to nie jakość odpowiedzi, ale proporcja sygnału do szumu. Czytam długi akapit wstępu, żeby dowiedzieć się, że model rozumie mój problem. Potem czytam długi akapit zakończenia, żeby dowiedzieć się, że problem został rozwiązany. Pomiędzy jest fix. Caveman usuwa te dwie warstwy i to robi znaczącą różnicę przy szybkim debugowaniu. Co mnie jednak irytuje, to że autor artykułu stawia Cavemana jako przebłysk przyszłości, podczas gdy to powinno być domyślne zachowanie narzędzia dla deweloperów od samego początku. Osobny plugin na to, żeby narzędzie programistyczne zachowywało się jak narzędzie programistyczne, a nie asystent help desk, to patologia, nie innowacja.

**Link:** [The Complete Guide to Caveman](https://aifordevelopers.substack.com/p/the-complete-guide-to-caveman)
