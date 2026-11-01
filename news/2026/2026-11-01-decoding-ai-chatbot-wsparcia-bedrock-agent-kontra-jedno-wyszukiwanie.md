---
title: "Chatbot wsparcia na Amazon Bedrock: jedno szerokie wyszukiwanie kontra agent"
excerpt: "Marcelo Acosta porównuje dwie wersje chatbota RAG dla sklepu outdoorowego i pokazuje, że agent z dodatkowymi wyszukiwaniami nie wygrał z jednym szerszym zapytaniem."
publishedAt: "2026-11-01"
slug: "decoding-ai-chatbot-wsparcia-bedrock-agent-kontra-jedno-wyszukiwanie"
hashtags: "#decodingai #ai #llm #agents #aws #architecture #testing #generated #pl"
source_pattern: "Decoding AI"
---

## Chatbot wsparcia na Amazon Bedrock

**TLDR:** Autor zbudował dwie wersje chatbota RAG na Bedrock i przetestował je na 24 pytaniach klientów. Pojedyncze wyszukiwanie z dziewięcioma fragmentami dało więcej poprawnych odpowiedzi niż agent, kosztowało mniej i odpowiadało szybciej.

**Summary:** Scenariusz jest prosty: klient chce zwrócić jeden przedmiot z zestawu prezentowego, chatbot obiecuje zwrot pieniędzy, ale pomija okno zwrotu dla prezentów, choć reguła leży w dokumentach. Autor sprawdza dwa pomysły. Szersze pierwsze wyszukiwanie albo agent, który rozpozna, czego brakuje, i poszuka jeszcze raz. Baza to 24 artykuły polityki sklepu, około 29 KB, w S3, pocięte przez Bedrock Knowledge Bases na fragmenty po około 200 tokenów, z embeddingami Titan i wektorami w S3 Vectors. Odpowiedzi pisze GLM 5.

Test objął 24 pytania: osiem prostych, osiem łączących kilka polityk i osiem takich, na które dokumenty nie zawierają odpowiedzi. Pięć wariantów dało 120 odpowiedzi, które oceniał model według reguł napisanych przed uruchomieniem, a kod sprawdzał cytowania, koszty i czasy. Agent kosztował o 23 procent więcej niż wyszukiwanie z dziewięcioma fragmentami, trwał o 72 procent dłużej i dał dwie poprawne odpowiedzi mniej. Podanie modelowi wszystkich dokumentów dało ten sam wynik co dziewięć fragmentów, ale prawie trzy razy drożej.

Najciekawsze są błędy. Przy okresie próbnym butów agent znalazł regułę o odbiorze w sklepie, ale w odpowiedzi podał dwie możliwe daty startu i stwierdził, że nie wie, która obowiązuje. Przy zwrocie za buty za 120 dolarów plus 6 za dostawę trzy fragmenty dały poprawne 113, a warianty z większą ilością tekstu odjęły dostawę drugi raz i wyszło 107. Autor podejrzewa, że powtórzona reguła o niezwracanej dostawie zachęciła model do dodatkowego odejmowania. To hipoteza, którą sam proponuje sprawdzić. Dziesięć z 25 dodatkowych wyszukiwań agenta poszło na pytania, na które dokumentów nie było, więc nic nie dały.

**Key takeaways:**
- Gdy odpowiedź jest błędna, najpierw sprawdź, czy polityka była we fragmentach. Jeśli nie, napraw wyszukiwanie. Jeśli była, napraw sposób użycia.
- Agent ma sens, gdy kolejne zapytanie zależy od poprzedniego wyniku, na przykład w śledzeniu usterki przez kolejne dokumenty.
- Obliczenia kwot lepiej wynieść do usługi albo wymusić rozbicie na składniki.

**Why do I care:** To dobra korekta dla modnego odruchu "dodajmy agenta". Mnie przekonuje rozdzielenie błędów wyszukiwania od błędów interpretacji, bo to bezpośrednio mówi, gdzie inwestować. Słabsze strony: 24 pytania i jeden model to mała próba, autor nie powtarzał przebiegów, a odpowiedzi oceniał inny model, co sam przyznaje. Wniosku "agent przegrywa" nie uogólniałbym, tylko traktowałbym go jako wynik dla tego zbioru dokumentów. Pominięty zostaje też temat kosztu utrzymania i aktualności polityk.

**Link:** [Building a Support Chatbot on Amazon Bedrock](https://www.decodingai.com/p/agentic-rag-vs-single-search-amazon-bedrock)
