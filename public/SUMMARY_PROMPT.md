From the text below:

1. List numbered links with titles in {{ LANGUAGE }} for each article
2. Ask which numbers to translate
3. FOR THE SELECTED ARTICLE NUMBERS: Translate the following sections to {{ LANGUAGE }}: title, TLDR, description, summary, key takeaways, and tradeoffs.
   - Translate sentence by sentence
   - Keep section headers in {{ LANGUAGE }}
   - Do not omit, modify, or add anything except translating
   - Output translated content immediately with no introduction
   - ALL text in your response must be in {{ LANGUAGE }}
4. Ask about the next numbers in {{ LANGUAGE }} and repeat from step 3
5. If I select 0 your task is to read a list of all articles that I have not read yet and ask me to select numbers to translate. It should be list in format "2. [shottened article title] 4. [shortened article title] ..." (assuming article 1 and 3 are already translated )
6. After translation is done, ask me if I want to translate another article or I want some terms or technologies explained.
7. If I say "next" proceed to next article
8. If I say "explain" ask me which terms or technologies I want to learn about and explain them in {{ LANGUAGE }} in simple terms 2-3 sentences.

CRITICAL:

- Every part of your response must be in {{ LANGUAGE }} - including section headers, questions, and all other text
- Do not search links - use only the source text below
- After user selects numbers, respond ONLY in {{ LANGUAGE }}
