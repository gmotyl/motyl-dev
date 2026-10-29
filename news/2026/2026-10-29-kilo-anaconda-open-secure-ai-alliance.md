---
title: "Anaconda i Kilo dołączają do Open Secure AI Alliance"
excerpt: "Firma stojąca za Kilo wchodzi do sojuszu założonego przez NVIDIA i prowadzonego przez Linux Foundation, żeby zabezpieczać agentów kodujących."
publishedAt: "2026-10-29"
slug: "kilo-anaconda-open-secure-ai-alliance"
hashtags: "#kilo #ai #agents #security #open-source #devtools #generated #pl"
source_pattern: "Kilo"
---

## Anaconda i Kilo dołączają do Open Secure AI Alliance

**TLDR:** Anaconda, firma stojąca za Kilo, dołączyła do sojuszu założonego przez NVIDIA i prowadzonego przez Linux Foundation. Cel to otwarte narzędzia do zabezpieczania agentów AI.

**Summary:** Tekst zaczyna się od sceny, którą każdy zna. Prosisz agenta o poprawkę błędu, a ten w kilka minut czyta pliki, instaluje zależność, uruchamia polecenia i wywołuje narzędzie przez MCP. Za jedną prośbą stoi więc spory zakres uprawnień. Dlatego Anaconda wchodzi do sojuszu, w którym są też NVIDIA, Microsoft, Amazon, Cloudflare i Red Hat.

Anaconda wymienia trzy priorytety. Pierwszy to testowanie całego przepływu pracy agenta, tak żeby wyłapać awarie rozłożone na kilka decyzji, na przykład gdy pobrany dokument zmienia plan agenta i wywołuje niezamierzoną akcję. Drugi to zabezpieczanie połączeń, czyli skanowanie, weryfikowanie i kontrola dostępu do narzędzi i serwerów MCP. Trzeci to wykazywanie, że zabezpieczenia działają, przez zapisywanie decyzji agenta i raportowanie incydentów.

Od strony produktu Kilo pozwala w wersji desktopowej tworzyć środowiska conda z zweryfikowanymi pakietami, a przez AI Artifacts dostać pakiety i modele z informacją o pochodzeniu i podatnościach. Uprawnienia narzędzi pozwalają zezwolić, wymagać zatwierdzenia albo zablokować akcję. Modele NVIDIA Nemotron są dostępne w Kilo, a platforma Anaconda z Enkrypt AI testuje, jak można zmanipulować agenta przed wydaniem.

**Key takeaways:**
- Sojusz ma standaryzować testy przepływów agenta, kontrolę narzędzi MCP i dowody działania zabezpieczeń.
- Kilo oferuje zatwierdzanie uprawnień narzędzi i pakiety z informacją o pochodzeniu.
- Modele z otwartymi wagami można uruchamiać na własnej infrastrukturze.

**Why do I care:** To przede wszystkim komunikat produktowy i pozycjonowanie, a nie nowa technologia. Tekst nie podaje żadnych liczb ani konkretnych wyników testów, a o tym, jak faktycznie wygląda zatwierdzanie uprawnień w codziennej pracy, nie ma ani słowa. Dla zespołów, które wpuszczają agentów do repozytoriów, praktyczny wniosek jest jednak prosty. Przejrzyj uprawnienia narzędzi i serwery MCP, zanim dojdzie do pierwszego incydentu.

**Link:** [Anaconda and Kilo Join the Open Secure AI Alliance](https://blog.kilo.ai/p/anaconda-and-kilo-join-the-open-secure)
