# TTS Library Comparison Analysis

## Libraries Comparison

### 1. edge-tts-universal

- **GitHub:** https://github.com/travisvn/edge-tts-universal
- **NPM:** `edge-tts-universal`
- **Stars:** ~50 stars
- **Last Updated:** 2024
- **Bundle Size:** ~15-20KB (minified + gzipped)
- **Dependencies:** None (pure JS)
- **Maintenance:** Active but small community

**Pros:**

- Pure JavaScript, works in browser
- No external dependencies
- Direct Microsoft TTS API access
- Streaming support

**Cons:**

- Small community
- Less battle-tested
- Limited documentation

---

### 2. edge-tts (Python wrapper via WASM)

- **GitHub:** https://github.com/rany2/edge-tts
- **Stars:** ~5,000+ stars
- **Bundle Size:** Not applicable (Python)
- **Maintenance:** Very active

**Pros:**

- Most popular edge-tts library
- Very active maintenance
- Well documented

**Cons:**

- Python-based, requires server
- Not suitable for browser
- Would need API route (current problem)

---

### 3. speak-tts

- **GitHub:** https://github.com/marcinkowskidawid/speak-tts
- **NPM:** `speak-tts`
- **Stars:** ~300 stars
- **Bundle Size:** ~5KB
- **Last Updated:** 2023
- **Maintenance:** Low activity

**Pros:**

- Lightweight
- Browser SpeechSynthesis wrapper
- Simple API

**Cons:**

- Uses browser SpeechSynthesis (not Edge voices)
- Limited voice quality
- Not Edge TTS

---

### 4. @aspect-dev/edge-tts

- **NPM:** `@aspect-dev/edge-tts`
- **Bundle Size:** ~10KB
- **Last Updated:** 2024
- **Maintenance:** Active

**Pros:**

- TypeScript native
- Browser compatible
- Smaller bundle

**Cons:**

- Less popular
- Limited documentation

---

### 5. Direct Microsoft Speech SDK

- **NPM:** `microsoft-cognitiveservices-speech-sdk`
- **Stars:** Official Microsoft library
- **Bundle Size:** ~500KB+ (heavy!)
- **Maintenance:** Very active (Microsoft)

**Pros:**

- Official Microsoft library
- Best support and documentation
- All features supported

**Cons:**

- Very heavy bundle size
- Requires Azure subscription
- API key needed
- Overkill for simple TTS

---

## Performance Impact Analysis

### Bundle Size Comparison

| Library              | Minified | Gzipped | Impact        |
| -------------------- | -------- | ------- | ------------- |
| edge-tts-universal   | ~45KB    | ~15KB   | Low           |
| @aspect-dev/edge-tts | ~30KB    | ~10KB   | Very Low      |
| speak-tts            | ~15KB    | ~5KB    | Minimal       |
| Microsoft Speech SDK | ~1.5MB   | ~500KB  | High          |
| Current solution     | 0KB      | 0KB     | None (server) |

### Runtime Performance

| Metric           | edge-tts-universal  | Current API        |
| ---------------- | ------------------- | ------------------ |
| Initial load     | +15KB download      | 0KB                |
| First audio      | ~500ms              | ~2-5s (cold start) |
| Subsequent audio | ~200ms              | ~500ms-2s          |
| Server load      | None                | High               |
| Network requests | Direct to Microsoft | Via Vercel         |

### Lazy Loading Strategy

```typescript
// Dynamic import for TTS module
const loadTTS = async () => {
  const { EdgeTTS } = await import('edge-tts-universal')
  return new EdgeTTS()
}
```

This reduces initial bundle impact to **0KB** - only loads when user clicks "Read Aloud".

---

## Recommendation

### Best Option: `edge-tts-universal` with Lazy Loading

**Why:**

1. **Acceptable bundle size** - 15KB gzipped is reasonable
2. **No server dependency** - Solves Vercel deployment issues
3. **Good voice quality** - Same as Edge browser
4. **No API keys** - Uses public Microsoft endpoints
5. **Lazy loadable** - Zero impact until used

### Alternative: Custom Implementation

If bundle size is critical, we can implement a minimal version:

```typescript
// Minimal Edge TTS client (~3KB)
class MinimalEdgeTTS {
  private readonly WSS_URL =
    'wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1'

  async synthesize(text: string, voice: string): Promise<ArrayBuffer> {
    // Direct WebSocket connection to Microsoft
    // ~50 lines of code
  }
}
```

This would be the **lightest possible solution** (~3KB) but requires more development effort.

---

## Implementation Recommendation

### Option A: edge-tts-universal (Recommended)

- **Effort:** Low
- **Risk:** Low
- **Bundle Impact:** 15KB (lazy loaded = 0 initial)

### Option B: Custom Minimal Implementation

- **Effort:** Medium
- **Risk:** Medium (maintenance burden)
- **Bundle Impact:** 3KB (lazy loaded = 0 initial)

### Option C: Keep Server-Side with Different Provider

- **Effort:** High
- **Risk:** High (still have timeout issues)
- **Bundle Impact:** 0KB

---

## Decision Matrix

| Criteria             | edge-tts-universal | Custom     | Server-side |
| -------------------- | ------------------ | ---------- | ----------- |
| Bundle size          | ⭐⭐⭐⭐           | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐  |
| Development effort   | ⭐⭐⭐⭐⭐         | ⭐⭐⭐     | ⭐⭐        |
| Maintenance burden   | ⭐⭐⭐⭐           | ⭐⭐       | ⭐⭐⭐      |
| Vercel compatibility | ⭐⭐⭐⭐⭐         | ⭐⭐⭐⭐⭐ | ⭐          |
| Voice quality        | ⭐⭐⭐⭐⭐         | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐  |
| Reliability          | ⭐⭐⭐⭐           | ⭐⭐⭐     | ⭐⭐        |

**Winner: edge-tts-universal with lazy loading**

---

## Performance Mitigation Strategies

### 1. Lazy Loading

```typescript
// Only load TTS library when user interacts
const ttsModule = await import('edge-tts-universal')
```

### 2. Audio Buffering

Keep existing chunking and prefetch logic from current `useTTS` hook.

### 3. Service Worker Caching

Cache generated audio blobs in service worker for repeat listens.

### 4. Progressive Enhancement

Show UI immediately, load TTS in background.

---

## Next Steps

1. **Test edge-tts-universal** in development
2. **Measure actual bundle size** impact
3. **Implement lazy loading**
4. **Test on mobile devices**
5. **Monitor performance** in production
