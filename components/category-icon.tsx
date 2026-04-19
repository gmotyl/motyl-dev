'use client'

import { getContentCategory } from '@/lib/og'

interface CategoryIconProps {
  hashtags?: string[]
  category?: string
  className?: string
}

function Sparkle({ cx, cy, r, opacity = 1 }: { cx: number; cy: number; r: number; opacity?: number }) {
  const p = 0.2
  return (
    <path
      d={`M${cx},${cy - r} C${cx + p * r},${cy - p * r} ${cx + p * r},${cy - p * r} ${cx + r},${cy} C${cx + p * r},${cy + p * r} ${cx + p * r},${cy + p * r} ${cx},${cy + r} C${cx - p * r},${cy + p * r} ${cx - p * r},${cy + p * r} ${cx - r},${cy} C${cx - p * r},${cy - p * r} ${cx - p * r},${cy - p * r} ${cx},${cy - r} Z`}
      fill="#a78bfa"
      fillOpacity={opacity}
    />
  )
}

function AiIcon() {
  const cx = 200; const cy = 104; const cs = 100
  const x0 = cx - cs / 2; const y0 = cy - cs / 2

  const traces: [number, number, number, number, number, number][] = [
    [cx - 22, y0,      cx - 22, y0 - 28, cx - 22, y0 - 28],
    [cx,      y0,      cx,      y0 - 40, cx - 36, y0 - 40],
    [cx + 22, y0,      cx + 22, y0 - 28, cx + 22, y0 - 28],
    [cx - 22, y0 + cs, cx - 22, y0 + cs + 28, cx - 22, y0 + cs + 28],
    [cx,      y0 + cs, cx,      y0 + cs + 40, cx + 34, y0 + cs + 40],
    [cx + 22, y0 + cs, cx + 22, y0 + cs + 28, cx + 22, y0 + cs + 28],
    [x0, cy - 22, x0 - 36, cy - 22, x0 - 36, cy - 22],
    [x0, cy,      x0 - 48, cy,      x0 - 48, cy + 24],
    [x0, cy + 22, x0 - 36, cy + 22, x0 - 36, cy + 22],
    [x0 + cs, cy - 22, x0 + cs + 36, cy - 22, x0 + cs + 36, cy - 22],
    [x0 + cs, cy,      x0 + cs + 48, cy,      x0 + cs + 48, cy + 24],
    [x0 + cs, cy + 22, x0 + cs + 36, cy + 22, x0 + cs + 36, cy + 22],
  ]

  return (
    <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="ai-bg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#1e0b4a" />
          <stop offset="100%" stopColor="#07030f" />
        </radialGradient>
        <radialGradient id="ai-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
        <filter id="sparkle-glow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <rect width="400" height="220" fill="url(#ai-bg)" />
      <circle cx={cx} cy={cy} r="130" fill="url(#ai-glow)" />

      {/* Circuit traces */}
      {traces.map(([x1, y1, mx, my, x2, y2], i) => (
        <g key={i}>
          <polyline points={`${x1},${y1} ${mx},${my} ${x2},${y2}`} stroke="#8B5CF6" strokeWidth="1.5" fill="none" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={x2} cy={y2} r="3.5" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeOpacity="0.5" />
          <circle cx={x2} cy={y2} r="1.5" fill="#8B5CF6" fillOpacity="0.5" />
        </g>
      ))}

      {/* Chip body */}
      <rect x={x0} y={y0} width={cs} height={cs} rx="8" fill="#0f0520" stroke="#8B5CF6" strokeWidth="1.5" />
      {[-22, 0, 22].map((offset) => (
        <g key={offset}>
          <rect x={cx + offset - 4} y={y0 - 5} width="8" height="5" rx="1" fill="#8B5CF6" fillOpacity="0.55" />
          <rect x={cx + offset - 4} y={y0 + cs} width="8" height="5" rx="1" fill="#8B5CF6" fillOpacity="0.55" />
          <rect x={x0 - 5} y={cy + offset - 4} width="5" height="8" rx="1" fill="#8B5CF6" fillOpacity="0.55" />
          <rect x={x0 + cs} y={cy + offset - 4} width="5" height="8" rx="1" fill="#8B5CF6" fillOpacity="0.55" />
        </g>
      ))}
      {/* Inner border */}
      <rect x={x0 + 10} y={y0 + 10} width={cs - 20} height={cs - 20} rx="4" fill="none" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.3" />

      {/* Sparkles INSIDE chip */}
      <g filter="url(#sparkle-glow)">
        <Sparkle cx={cx - 6} cy={cy + 4} r={28} opacity={0.95} />
      </g>
      <Sparkle cx={cx + 24} cy={cy - 18} r={13} opacity={0.75} />

      <text x="200" y="212" textAnchor="middle" fill="#8B5CF6" fontSize="11" fontFamily="monospace" fillOpacity="0.5" letterSpacing="3">AI &amp; AGENTS</text>
    </svg>
  )
}

function FrontendIcon() {
  return (
    <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="fe-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0c1a2e" />
          <stop offset="100%" stopColor="#0a1628" />
        </linearGradient>
        <linearGradient id="fe-code" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="url(#fe-bg)" />
      {/* Browser frame */}
      <rect x="80" y="24" width="240" height="170" rx="8" stroke="#334155" strokeWidth="1.5" fill="#0f1c30" />
      <rect x="80" y="24" width="240" height="32" rx="8" fill="#1e2d45" />
      <rect x="80" y="44" width="240" height="12" fill="#1e2d45" />
      {/* Traffic dots */}
      <circle cx="100" cy="40" r="5" fill="#ef4444" fillOpacity="0.7" />
      <circle cx="116" cy="40" r="5" fill="#f59e0b" fillOpacity="0.7" />
      <circle cx="132" cy="40" r="5" fill="#22c55e" fillOpacity="0.7" />
      {/* URL bar */}
      <rect x="148" y="33" width="130" height="14" rx="3" fill="#0a1422" />
      <text x="213" y="44" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">motyl.dev</text>
      {/* Code lines */}
      <text x="104" y="80" fill="#60a5fa" fontSize="13" fontFamily="monospace" fontWeight="bold">&lt;</text>
      <text x="114" y="80" fill="#a78bfa" fontSize="13" fontFamily="monospace" fontWeight="bold">div</text>
      <text x="148" y="80" fill="#60a5fa" fontSize="13" fontFamily="monospace" fontWeight="bold">&gt;</text>
      <rect x="104" y="88" width="60" height="6" rx="2" fill="#334155" />
      <rect x="104" y="100" width="90" height="6" rx="2" fill="#334155" />
      <text x="104" y="118" fill="#60a5fa" fontSize="13" fontFamily="monospace" fontWeight="bold">&lt;/</text>
      <text x="124" y="118" fill="#a78bfa" fontSize="13" fontFamily="monospace" fontWeight="bold">div</text>
      <text x="158" y="118" fill="#60a5fa" fontSize="13" fontFamily="monospace" fontWeight="bold">&gt;</text>
      {/* Big glowing </> center-right */}
      <text x="260" y="148" textAnchor="middle" fill="url(#fe-code)" fontSize="48" fontFamily="monospace" fontWeight="bold" fillOpacity="0.9">&lt;/&gt;</text>
      <text x="200" y="208" textAnchor="middle" fill="#60a5fa" fontSize="11" fontFamily="monospace" fillOpacity="0.4" letterSpacing="3">FRONTEND</text>
    </svg>
  )
}

function ArchitectureIcon() {
  return (
    <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="arch-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0a1628" />
          <stop offset="100%" stopColor="#0d1f1a" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="url(#arch-bg)" />
      {/* Grid lines */}
      {[50, 100, 150, 200, 250, 300, 350].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="220" stroke="#1e3a2a" strokeWidth="0.5" />
      ))}
      {[40, 80, 120, 160, 200].map((y) => (
        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#1e3a2a" strokeWidth="0.5" />
      ))}
      {/* 3 server boxes */}
      <rect x="120" y="22" width="160" height="42" rx="6" fill="#0f2318" stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="140" cy="43" r="5" fill="#22c55e" fillOpacity="0.7" />
      <circle cx="156" cy="43" r="5" fill="#22c55e" fillOpacity="0.4" />
      <rect x="170" y="37" width="90" height="6" rx="2" fill="#22c55e" fillOpacity="0.2" />
      <rect x="170" y="49" width="60" height="4" rx="2" fill="#22c55e" fillOpacity="0.15" />

      <rect x="120" y="88" width="160" height="42" rx="6" fill="#0f2318" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.5" />
      <circle cx="140" cy="109" r="5" fill="#10b981" fillOpacity="0.7" />
      <circle cx="156" cy="109" r="5" fill="#10b981" fillOpacity="0.4" />
      <rect x="170" y="103" width="75" height="6" rx="2" fill="#10b981" fillOpacity="0.2" />
      <rect x="170" y="115" width="50" height="4" rx="2" fill="#10b981" fillOpacity="0.15" />

      <rect x="120" y="154" width="160" height="42" rx="6" fill="#0f2318" stroke="#34d399" strokeWidth="1.5" strokeOpacity="0.4" />
      <circle cx="140" cy="175" r="5" fill="#34d399" fillOpacity="0.6" />
      <circle cx="156" cy="175" r="5" fill="#34d399" fillOpacity="0.3" />
      <rect x="170" y="169" width="80" height="6" rx="2" fill="#34d399" fillOpacity="0.2" />
      <rect x="170" y="181" width="55" height="4" rx="2" fill="#34d399" fillOpacity="0.15" />

      {/* Connecting lines */}
      <line x1="200" y1="64" x2="200" y2="88" stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="4 3" />
      <line x1="200" y1="130" x2="200" y2="154" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="4 3" />
      <text x="200" y="213" textAnchor="middle" fill="#22c55e" fontSize="11" fontFamily="monospace" fillOpacity="0.4" letterSpacing="3">ARCHITECTURE</text>
    </svg>
  )
}

function CodingIcon() {
  return (
    <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="code-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0a0a0a" />
          <stop offset="100%" stopColor="#1a0a2e" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="url(#code-bg)" />
      {/* Terminal chrome */}
      <rect x="40" y="16" width="320" height="188" rx="10" fill="#111" stroke="#2a2a2a" strokeWidth="1.5" />
      <rect x="40" y="16" width="320" height="36" rx="10" fill="#1c1c1c" />
      <rect x="40" y="40" width="320" height="12" fill="#1c1c1c" />
      <circle cx="64" cy="34" r="6" fill="#ef4444" fillOpacity="0.8" />
      <circle cx="82" cy="34" r="6" fill="#f59e0b" fillOpacity="0.8" />
      <circle cx="100" cy="34" r="6" fill="#22c55e" fillOpacity="0.8" />
      <text x="200" y="37" textAnchor="middle" fill="#4b5563" fontSize="9" fontFamily="monospace">bash — 80×24</text>
      {/* Code content */}
      <text x="60" y="78" fill="#6b7280" fontSize="12" fontFamily="monospace">$</text>
      <text x="74" y="78" fill="#e2e8f0" fontSize="12" fontFamily="monospace">pnpm dev</text>
      <text x="60" y="98" fill="#22c55e" fontSize="11" fontFamily="monospace">▶ ready on localhost:3000</text>
      <text x="60" y="118" fill="#6b7280" fontSize="12" fontFamily="monospace">$</text>
      <text x="74" y="118" fill="#a78bfa" fontSize="12" fontFamily="monospace">git commit -m </text>
      <text x="220" y="118" fill="#86efac" fontSize="12" fontFamily="monospace">"feat: og images"</text>
      <text x="60" y="138" fill="#6b7280" fontSize="12" fontFamily="monospace">$</text>
      <text x="74" y="138" fill="#e2e8f0" fontSize="12" fontFamily="monospace">npx tsc --noEmit</text>
      <text x="60" y="158" fill="#22c55e" fontSize="11" fontFamily="monospace">✓ 0 errors</text>
      {/* Blinking cursor */}
      <rect x="60" y="166" width="8" height="14" rx="1" fill="#8B5CF6" fillOpacity="0.9" />
      <text x="200" y="213" textAnchor="middle" fill="#a78bfa" fontSize="11" fontFamily="monospace" fillOpacity="0.4" letterSpacing="3">CODING</text>
    </svg>
  )
}

function ProductivityIcon() {
  return (
    <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="prod-bg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#1c1209" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </radialGradient>
        <radialGradient id="bolt-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bolt-fill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="url(#prod-bg)" />
      <circle cx="200" cy="100" r="100" fill="url(#bolt-glow)" />
      {/* Rings */}
      <circle cx="200" cy="100" r="80" stroke="#f59e0b" strokeWidth="0.5" fill="none" strokeOpacity="0.12" />
      <circle cx="200" cy="100" r="60" stroke="#f59e0b" strokeWidth="0.5" fill="none" strokeOpacity="0.1" />
      {/* Lightning bolt */}
      <path
        d="M215 18 L170 105 H196 L185 190 L240 95 H212 Z"
        fill="url(#bolt-fill)"
        stroke="#fbbf24"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Particles */}
      {[[50, 40], [340, 60], [60, 160], [350, 150], [100, 200], [310, 195]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="#f59e0b" fillOpacity="0.3" />
      ))}
      <text x="200" y="213" textAnchor="middle" fill="#f59e0b" fontSize="11" fontFamily="monospace" fillOpacity="0.4" letterSpacing="3">PRODUCTIVITY</text>
    </svg>
  )
}

function ToolsIcon() {
  return (
    <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="tools-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f1218" />
          <stop offset="100%" stopColor="#14101e" />
        </linearGradient>
        <radialGradient id="tools-glow" cx="50%" cy="45%" r="40%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="220" fill="url(#tools-bg)" />
      <circle cx="200" cy="100" r="110" fill="url(#tools-glow)" />
      {/* Wrench + screwdriver from SVG reference */}
      <g transform="translate(150, 48) scale(1.2)">
        <path d="M66.958,54.602c-1.821-1.821-4.786-1.821-6.608,0l-0.066,0.066l-1.298-1.298l12.849-12.848c6.649,2.043,13.76,0.297,18.692-4.635c4.337-4.337,6.27-10.528,5.17-16.56c-0.067-0.366-0.331-0.665-0.686-0.775c-0.354-0.111-0.741-0.015-1.005,0.248l-8.954,8.953l-11.038-1.767l-1.767-11.038L81.2,5.994c0.263-0.263,0.358-0.65,0.248-1.005s-0.409-0.619-0.775-0.686c-6.031-1.098-12.223,0.833-16.56,5.17c-4.932,4.932-6.679,12.042-4.635,18.692L46.63,41.015L19.821,14.206c-0.101-0.101-0.223-0.179-0.356-0.229l-6.717-2.516c-0.368-0.137-0.781-0.048-1.058,0.229c-0.277,0.277-0.367,0.691-0.229,1.058l2.516,6.717c0.05,0.134,0.128,0.255,0.229,0.356L41.015,46.63L28.166,59.478c-6.65-2.044-13.761-0.296-18.692,4.635c-4.338,4.337-6.271,10.528-5.171,16.56c0.067,0.366,0.331,0.665,0.686,0.775c0.355,0.112,0.742,0.016,1.005-0.248l8.954-8.953l11.038,1.767l1.767,11.038L18.8,94.006c-0.263,0.263-0.358,0.65-0.248,1.005s0.409,0.619,0.775,0.686C20.442,95.9,21.563,96,22.676,96c4.909,0,9.676-1.938,13.211-5.474c4.932-4.931,6.679-12.042,4.635-18.692L53.37,58.985l1.298,1.298l-0.066,0.066c-1.822,1.822-1.822,4.786,0,6.608L78.84,91.195c0.906,0.906,2.096,1.358,3.288,1.358c1.197,0,2.396-0.457,3.309-1.37l5.748-5.748c1.822-1.822,1.827-4.781,0.011-6.596L66.958,54.602z" fill="#8B5CF6" fillOpacity="0.85" />
      </g>
      {/* Dots */}
      {[[60, 35], [345, 40], [55, 175], [350, 170]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="#8B5CF6" fillOpacity="0.25" />
      ))}
      <text x="200" y="213" textAnchor="middle" fill="#8B5CF6" fontSize="11" fontFamily="monospace" fillOpacity="0.4" letterSpacing="3">TOOLS</text>
    </svg>
  )
}

function VideoIcon() {
  return (
    <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="vid-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a0606" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
        <radialGradient id="vid-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="220" fill="url(#vid-bg)" />
      <circle cx="200" cy="100" r="110" fill="url(#vid-glow)" />
      {/* Rounded red play button */}
      <rect x="130" y="44" width="140" height="104" rx="22" fill="#ef4444" />
      <rect x="130" y="44" width="140" height="104" rx="22" fill="#b91c1c" fillOpacity="0.35" />
      {/* Play triangle */}
      <path d="M188 76 L188 116 L224 96 Z" fill="#ffffff" />
      {/* Film sprocket dots */}
      {[36, 60, 84, 108, 132, 156].map((y) => (
        <g key={y}>
          <rect x="56" y={y} width="10" height="10" rx="1.5" fill="#ef4444" fillOpacity="0.35" />
          <rect x="334" y={y} width="10" height="10" rx="1.5" fill="#ef4444" fillOpacity="0.35" />
        </g>
      ))}
      <text x="200" y="213" textAnchor="middle" fill="#ef4444" fontSize="11" fontFamily="monospace" fillOpacity="0.5" letterSpacing="3">VIDEO</text>
    </svg>
  )
}

function PodcastIcon() {
  return (
    <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="pod-bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#1a0a2e" />
          <stop offset="100%" stopColor="#07030f" />
        </radialGradient>
        <radialGradient id="pod-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f472b6" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mic-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#be185d" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="url(#pod-bg)" />
      <circle cx="200" cy="100" r="110" fill="url(#pod-glow)" />
      {/* Mic capsule */}
      <rect x="178" y="34" width="44" height="80" rx="22" fill="url(#mic-body)" stroke="#fbcfe8" strokeWidth="1.2" strokeOpacity="0.6" />
      {/* Capsule grill lines */}
      {[50, 62, 74, 86, 98].map((y) => (
        <line key={y} x1="186" y1={y} x2="214" y2={y} stroke="#fbcfe8" strokeWidth="1" strokeOpacity="0.45" />
      ))}
      {/* Mic arc yoke */}
      <path d="M160 96 C160 130, 240 130, 240 96" stroke="#f472b6" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Stand */}
      <line x1="200" y1="118" x2="200" y2="160" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
      <rect x="176" y="158" width="48" height="6" rx="3" fill="#f472b6" />
      {/* Sound waves */}
      {[
        [120, 60, 140, 100, 120, 140],
        [100, 48, 124, 100, 100, 152],
        [280, 60, 260, 100, 280, 140],
        [300, 48, 276, 100, 300, 152],
      ].map(([x1, y1, x2, y2, x3, y3], i) => (
        <path
          key={i}
          d={`M${x1} ${y1} Q${x2} ${y2} ${x3} ${y3}`}
          stroke="#f472b6"
          strokeWidth="1.5"
          fill="none"
          strokeOpacity={0.55 - i * 0.1}
          strokeLinecap="round"
        />
      ))}
      <text x="200" y="213" textAnchor="middle" fill="#f472b6" fontSize="11" fontFamily="monospace" fillOpacity="0.5" letterSpacing="3">PODCAST</text>
    </svg>
  )
}

function GeneralIcon() {
  return (
    <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="gen-bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#0d1f33" />
          <stop offset="100%" stopColor="#060a10" />
        </radialGradient>
        <radialGradient id="globe-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="220" fill="url(#gen-bg)" />
      <circle cx="200" cy="105" r="90" fill="url(#globe-glow)" />
      <circle cx="200" cy="105" r="72" stroke="#38bdf8" strokeWidth="1.5" fill="none" strokeOpacity="0.5" />
      {/* Latitude lines */}
      <ellipse cx="200" cy="105" rx="72" ry="22" stroke="#38bdf8" strokeWidth="1" fill="none" strokeOpacity="0.3" />
      <ellipse cx="200" cy="105" rx="72" ry="44" stroke="#38bdf8" strokeWidth="1" fill="none" strokeOpacity="0.25" />
      <line x1="128" y1="105" x2="272" y2="105" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="134" y1="75" x2="266" y2="75" stroke="#38bdf8" strokeWidth="0.75" strokeOpacity="0.2" />
      <line x1="134" y1="135" x2="266" y2="135" stroke="#38bdf8" strokeWidth="0.75" strokeOpacity="0.2" />
      {/* Longitude */}
      <ellipse cx="200" cy="105" rx="28" ry="72" stroke="#38bdf8" strokeWidth="1" fill="none" strokeOpacity="0.3" />
      <line x1="200" y1="33" x2="200" y2="177" stroke="#38bdf8" strokeWidth="0.75" strokeOpacity="0.2" />
      {/* Dot marker */}
      <circle cx="222" cy="92" r="4" fill="#38bdf8" fillOpacity="0.8" />
      <circle cx="222" cy="92" r="8" stroke="#38bdf8" strokeWidth="1" fill="none" strokeOpacity="0.4" />
      {/* Stars */}
      {[[50, 30], [340, 25], [30, 170], [365, 80], [70, 200]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="#38bdf8" fillOpacity="0.4" />
      ))}
      <text x="200" y="213" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace" fillOpacity="0.4" letterSpacing="3">GENERAL</text>
    </svg>
  )
}

function MiniAiIcon() {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="48" height="48" rx="8" fill="#1e0b4a" />
      <path d="M24,8 C25,22 25,22 40,24 C25,25 25,25 24,40 C23,25 23,25 8,24 C23,22 23,22 24,8 Z" fill="#a78bfa" fillOpacity="0.9" />
    </svg>
  )
}

function MiniFrontendIcon() {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="48" height="48" rx="8" fill="#0c1a2e" />
      <text x="24" y="30" textAnchor="middle" fill="#60a5fa" fontSize="20" fontFamily="monospace" fontWeight="bold">&lt;/&gt;</text>
    </svg>
  )
}

function MiniArchitectureIcon() {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="48" height="48" rx="8" fill="#0a1628" />
      {[12, 22, 32].map((y) => (
        <g key={y}>
          <rect x="10" y={y} width="28" height="8" rx="2" fill="#0f2318" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.6" />
          <circle cx="16" cy={y + 4} r="2" fill="#22c55e" fillOpacity="0.7" />
        </g>
      ))}
    </svg>
  )
}

function MiniCodingIcon() {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="48" height="48" rx="8" fill="#0a0a0a" />
      <text x="10" y="28" fill="#6b7280" fontSize="14" fontFamily="monospace">$</text>
      <rect x="20" y="21" width="6" height="10" rx="1" fill="#8B5CF6" fillOpacity="0.9" />
    </svg>
  )
}

function MiniProductivityIcon() {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="48" height="48" rx="8" fill="#1c1209" />
      <path d="M28 6 L18 24 H25 L20 42 L32 22 H24 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" strokeLinejoin="round" />
    </svg>
  )
}

function MiniToolsIcon() {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="48" height="48" rx="8" fill="#0f1218" />
      {/* Wrench */}
      <path d="M14 34 L26 22" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.9" />
      <path d="M26 22 C24 17 27 12 32 12 L29 17 L30 20 L33 21 L36 16 C36 22 31 25 26 22Z" fill="#8B5CF6" fillOpacity="0.8" />
      <rect x="11" y="31" width="6" height="6" rx="1" transform="rotate(-45 14 34)" fill="#8B5CF6" fillOpacity="0.6" />
    </svg>
  )
}

function MiniVideoIcon() {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="48" height="48" rx="8" fill="#1a0606" />
      <rect x="10" y="14" width="28" height="20" rx="5" fill="#ef4444" />
      <path d="M21 20 L21 28 L29 24 Z" fill="#ffffff" />
    </svg>
  )
}

function MiniPodcastIcon() {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="48" height="48" rx="8" fill="#1a0a2e" />
      <rect x="19" y="10" width="10" height="18" rx="5" fill="#f472b6" />
      <path d="M15 24 C15 32, 33 32, 33 24" stroke="#f472b6" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <line x1="24" y1="30" x2="24" y2="38" stroke="#f472b6" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="18" y="37" width="12" height="2.5" rx="1" fill="#f472b6" />
    </svg>
  )
}

function MiniGeneralIcon() {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="48" height="48" rx="8" fill="#0d1f33" />
      <circle cx="24" cy="24" r="14" stroke="#38bdf8" strokeWidth="1.5" fill="none" strokeOpacity="0.5" />
      <ellipse cx="24" cy="24" rx="14" ry="5" stroke="#38bdf8" strokeWidth="0.75" fill="none" strokeOpacity="0.3" />
      <ellipse cx="24" cy="24" rx="6" ry="14" stroke="#38bdf8" strokeWidth="0.75" fill="none" strokeOpacity="0.3" />
    </svg>
  )
}

const iconMap: Record<string, React.ReactNode> = {
  ai: <AiIcon />,
  frontend: <FrontendIcon />,
  architecture: <ArchitectureIcon />,
  coding: <CodingIcon />,
  productivity: <ProductivityIcon />,
  tools: <ToolsIcon />,
  video: <VideoIcon />,
  podcast: <PodcastIcon />,
  general: <GeneralIcon />,
}

const miniIconMap: Record<string, React.ReactNode> = {
  ai: <MiniAiIcon />,
  frontend: <MiniFrontendIcon />,
  architecture: <MiniArchitectureIcon />,
  coding: <MiniCodingIcon />,
  productivity: <MiniProductivityIcon />,
  tools: <MiniToolsIcon />,
  video: <MiniVideoIcon />,
  podcast: <MiniPodcastIcon />,
  general: <MiniGeneralIcon />,
}

export function CategoryIcon({ hashtags, category: catProp, className }: CategoryIconProps) {
  const category = catProp ?? getContentCategory(hashtags ?? [])
  return (
    <div className={className}>
      {iconMap[category] ?? iconMap.general}
    </div>
  )
}

export function CategoryIconMini({ hashtags, category: catProp, className }: CategoryIconProps) {
  const category = catProp ?? getContentCategory(hashtags ?? [])
  return (
    <div className={className}>
      {miniIconMap[category] ?? miniIconMap.general}
    </div>
  )
}

