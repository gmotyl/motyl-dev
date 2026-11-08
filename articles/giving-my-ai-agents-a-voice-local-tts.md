---
title: 'Giving My AI Agents a Voice: From Edge Read-Aloud to Local Voice Cloning'
excerpt: 'My agents now read their answers and article summaries out loud. Here is how I went from robotic Edge voices, through paid cloud TTS, to free, high-quality local voices running on my own GPU and streamed to my phone.'
publishedAt: '2026-11-08'
slug: 'giving-my-ai-agents-a-voice-local-tts'
hashtags: '#AI #TTS #ClaudeCode #SelfHosted #Pavilio #VoiceCloning'
image: 'https://img.motyl.dev/blog/giving-my-ai-agents-a-voice-local-tts.webp'
---

So much has happened lately. I've made so many changes to my blog that instead of trying to catch up, I'll simply start from the end. The latest thing I added, both to my blog and to [Pavilio](https://github.com/gmotyl/pavilio), my UI for AI agents, is TTS: text-to-speech.

On the blog, TTS isn't available to everyone. It lives in an admin section where my agents leave summaries after researching the best articles of the week for me. The summaries let me skip reading everything that might not be interesting before I get to the actual articles. And I don't even have to read the summaries anymore, because I can just listen to the agent say them.

In Pavilio, [Claude Code](https://www.anthropic.com/claude-code) or [Codex](https://github.com/openai/codex) talks to you all the time: an answer, a finished task, and so on. That's where I use TTS too, so the agent's reply is read out loud to me. It makes it easier to stay focused, and it puts less strain on my eyes, which, as we all know, need to be looked after.

## Starting with Edge's read-aloud voices

At first I used the TTS engine built into [Microsoft Edge](https://www.microsoft.com/edge), the "Read aloud" option. The voices are fairly robotic, but I still used them for a while through an unofficial API. There are libraries, such as [edge-tts](https://github.com/rany2/edge-tts), that connect to Microsoft's service by pretending to be the Edge browser, and let you turn any text into speech. That's fine as long as it isn't commercial use, and since I use Edge for browsing anyway, I decided it was fair to use that API. I wired it into a special hook that Pavilio installs for agents, did the same on my blog, and enjoyed a voice reading out agent replies and article summaries.

I even wrote a dedicated library, [anytts](https://github.com/gmotyl/anytts), which unified the API for me and helped me avoid duplicating code across both repositories. The shared part simply went into the library.

## Paid cloud engines and cascading fallback

I also experimented with paid services, and the library gives me one common API no matter which TTS engine runs underneath. Among the ones I used were the best of them, obviously [ElevenLabs](https://elevenlabs.io), but also [Speechify](https://speechify.com) and [Cartesia](https://cartesia.ai), which all have free monthly limits. My library can cascade between engines: when the limit on one runs out, it switches to another engine to keep reading the messages. On top of that, in Pavilio each project can have its own voice, which makes switching between contexts easier.

But cloud services like these are paid and fairly expensive. My use isn't commercial, in the sense that I don't sell the voice and it isn't a service for anyone but me. When I ran the numbers, even a $50 monthly API plan wouldn't cover what I need. So it stopped making sense.

## Going local with OmniVoice

So I started looking for other options. I work both on a laptop with an NVIDIA card and on a MacBook, and I wanted something that would work on both. But NVIDIA has very good support for local AI engines, so I focused on it first. I installed [OmniVoice](https://github.com/k2-fsa/OmniVoice) locally, added a server compatible with my anytts library, and it turned out the voices it generates are very good. It also supports voice cloning, so you can clone a voice from, say, samples on YouTube. I cloned my wife's and my son's voices, plus a few others, including my own. The result is free, high-quality TTS comparable to ElevenLabs. Sure, the expressiveness is a bit less refined, but for reading AI replies I don't expect great acting, and these voices are much, much better, noticeably better, than the robotic ones from Microsoft.

## Kokoro on the MacBook

When I tried OmniVoice on my MacBook, it was too slow, even though it's an M4, hardly an old chip and pretty fast. I'd have waited so long for the audio that I could have read the text three times by then. That made no sense. So on the Mac I went for a faster option: Pavilio also supports [Kokoro](https://huggingface.co/hexgrad/Kokoro-82M), which is very fast in English. Unfortunately it doesn't support my native Polish, so I have to remember to always talk to the agent in English on the MacBook. In return, the replies come back very quickly and the voices are good enough. That gives me mobility: I don't have to carry my NVIDIA server around to have my agent's replies read aloud.

## How I use it on motyl.dev

I have [Tailscale](https://tailscale.com) installed on my phone, and on the machine with the NVIDIA card running OmniVoice. My admin page, where the article summaries wait for review, connects over the tailnet to the server that generates the audio and sends it securely to my phone. The interface is built so that even while driving I can listen to the summaries like a radio show or a podcast: skip to the next one, and flag the ones I want to hear in full, or whose original articles I want to read in full and later recommend in the next newsletter issue.

Have you read the latest issue? Subscribe below.

#newsletter-cta('Curated AI picks, weekly', 'Get the articles my agents and I found worth your time, hand-picked every week and delivered straight to your inbox.')
