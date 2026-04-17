'use client'

import { useEffect, useId, useRef, useState } from 'react'
import mermaid from 'mermaid'

let mermaidInitialized = false

function initMermaid() {
  if (mermaidInitialized) return
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: {
      primaryColor: '#1a3a3a',
      primaryTextColor: '#e4e4e7',
      primaryBorderColor: '#2dd4bf50',
      lineColor: '#71717a',
      secondaryColor: '#1e293b',
      tertiaryColor: '#18181b',
      background: '#18181b',
      mainBkg: '#1a3a3a',
      nodeBorder: '#2dd4bf50',
      clusterBkg: '#0f1d2e',
      clusterBorder: '#1e3a5f',
      titleColor: '#e4e4e7',
      edgeLabelBackground: '#1e1e22',
      textColor: '#e4e4e7',
      actorBkg: '#172554',
      actorBorder: '#1d4ed8',
      actorTextColor: '#e4e4e7',
      actorLineColor: '#52525b',
      signalColor: '#e4e4e7',
      signalTextColor: '#e4e4e7',
      labelBoxBkgColor: '#27272a',
      labelBoxBorderColor: '#52525b',
      labelTextColor: '#e4e4e7',
      loopTextColor: '#a1a1aa',
      activationBorderColor: '#52525b',
      activationBkgColor: '#3f3f46',
      sequenceNumberColor: '#18181b',
      noteBkgColor: '#3f3f46',
      noteBorderColor: '#52525b',
      noteTextColor: '#e4e4e7',
    },
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    flowchart: { curve: 'basis', padding: 16 },
    sequence: { mirrorActors: false },
  })
  mermaidInitialized = true
}

function fixAmbiguousLabels(src: string): string {
  return src.replace(/\[([/\\])([^\]]*[^/\\])\]/g, '["$1$2"]')
}

function patchSvgDarkTheme(el: HTMLDivElement) {
  // --- Flowchart: color nodes by subgraph cluster ---
  const clusterPalette = [
    { fill: '#1a2a2a', stroke: '#0e7490', clusterBg: '#0c1f1f', clusterBorder: '#164e63' },
    { fill: '#2a1a1a', stroke: '#dc2626', clusterBg: '#1c0f0f', clusterBorder: '#7f1d1d' },
    { fill: '#1a2a1a', stroke: '#16a34a', clusterBg: '#0f1c0f', clusterBorder: '#14532d' },
    { fill: '#172554', stroke: '#1d4ed8', clusterBg: '#0f1730', clusterBorder: '#1e3a5f' },
    { fill: '#271a2a', stroke: '#9333ea', clusterBg: '#1a0f1f', clusterBorder: '#4c1d95' },
    { fill: '#2a2a1a', stroke: '#ca8a04', clusterBg: '#1c1c0f', clusterBorder: '#713f12' },
  ]
  const neutralNode = { fill: '#1a3a3a', stroke: '#2dd4bf80' }
  const clusters = el.querySelectorAll('.cluster')
  const clusterMap = new Map<string, number>()
  clusters.forEach((c, i) => {
    clusterMap.set(c.id, i)
    const rect = c.querySelector('rect')
    if (rect) {
      const p = clusterPalette[i % clusterPalette.length]
      ;(rect as HTMLElement).style.fill = p.clusterBg
      ;(rect as HTMLElement).style.stroke = p.clusterBorder
    }
  })
  el.querySelectorAll('.node').forEach((n) => {
    const shape = n.querySelector('rect, polygon') as SVGElement | null
    if (!shape) return
    const t = n.getAttribute('transform') || ''
    const m = t.match(/translate\(([-\d.eE]+)[,\s]+([-\d.eE]+)\)/)
    if (!m) { shape.style.fill = neutralNode.fill; shape.style.stroke = neutralNode.stroke; return }
    const nx = +m[1], ny = +m[2]
    let matched = false
    clusters.forEach((c) => {
      const cr = c.querySelector('rect')
      if (!cr) return
      const cx = +cr.getAttribute('x')!, cy = +cr.getAttribute('y')!
      const cw = +cr.getAttribute('width')!, ch = +cr.getAttribute('height')!
      if (nx > cx && nx < cx + cw && ny > cy && ny < cy + ch) {
        const p = clusterPalette[clusterMap.get(c.id)! % clusterPalette.length]
        shape.style.fill = p.fill
        shape.style.stroke = p.stroke
        matched = true
      }
    })
    if (!matched) { shape.style.fill = neutralNode.fill; shape.style.stroke = neutralNode.stroke }
  })

  // --- Sequence diagram sections ---
  const sectionPalette = [
    { fill: '#1c0f0f', stroke: '#7f1d1d' },
    { fill: '#0f1c0f', stroke: '#14532d' },
    { fill: '#0f1730', stroke: '#1e3a5f' },
    { fill: '#1a0f1f', stroke: '#4c1d95' },
    { fill: '#1c1c0f', stroke: '#713f12' },
    { fill: '#0c1f1f', stroke: '#164e63' },
  ]
  const sectionRects = Array.from(el.querySelectorAll<SVGRectElement>('rect.rect'))
  sectionRects.sort((a, b) => +(a.getAttribute('y') || 0) - +(b.getAttribute('y') || 0))
  sectionRects.forEach((r, i) => {
    const p = sectionPalette[i % sectionPalette.length]
    r.style.fill = p.fill
    r.style.stroke = p.stroke
  })

  // --- Sequence diagram actors ---
  const actorPalette = [
    { fill: '#2a1a1a', stroke: '#b45309', line: '#78350f' },
    { fill: '#1a2a1a', stroke: '#15803d', line: '#14532d' },
    { fill: '#172554', stroke: '#1d4ed8', line: '#1e3a5f' },
    { fill: '#1a2a2a', stroke: '#0e7490', line: '#164e63' },
    { fill: '#271a2a', stroke: '#7c3aed', line: '#4c1d95' },
    { fill: '#2a1a24', stroke: '#be185d', line: '#831843' },
    { fill: '#1a2420', stroke: '#059669', line: '#064e3b' },
    { fill: '#2a2a1a', stroke: '#a16207', line: '#713f12' },
  ]
  const actorRects = el.querySelectorAll<SVGRectElement>('rect.actor')
  const actorLines = el.querySelectorAll<SVGLineElement>("line[class*='actor-line']")
  const actorCount = actorLines.length
  actorRects.forEach((r, i) => {
    const p = actorPalette[(i % actorCount) % actorPalette.length]
    r.style.fill = p.fill
    r.style.stroke = p.stroke
  })
  actorLines.forEach((l, i) => {
    const p = actorPalette[i % actorPalette.length]
    l.style.stroke = p.stroke
    l.style.opacity = '0.6'
    l.style.strokeWidth = '1.5'
  })

  // Notes
  el.querySelectorAll<SVGRectElement>('rect.note').forEach((r) => {
    r.setAttribute('fill', '#1a3a3a')
    r.setAttribute('stroke', '#2dd4bf50')
  })
  // Text
  el.querySelectorAll<SVGTextElement>('text').forEach((t) => {
    t.setAttribute('fill', '#e4e4e7')
  })
  el.querySelectorAll<SVGTextElement>('.noteText').forEach((t) => {
    t.setAttribute('fill', '#a1a1aa')
  })
  // Lines
  el.querySelectorAll<SVGLineElement>('line').forEach((l) => {
    if (l.getAttribute('stroke') !== 'none') l.setAttribute('stroke', '#52525b')
  })
  // Activation bars
  el.querySelectorAll<SVGRectElement>('rect.activation0, rect.activation1, rect.activation2').forEach((r) => {
    const rx = parseFloat(r.getAttribute('x') || '0') + parseFloat(r.getAttribute('width') || '0') / 2
    let closest = 0, minDist = Infinity
    actorLines.forEach((l, i) => {
      const d = Math.abs(parseFloat(l.getAttribute('x1') || '0') - rx)
      if (d < minDist) { minDist = d; closest = i }
    })
    const p = actorPalette[closest % actorPalette.length]
    r.setAttribute('fill', p.line)
    r.setAttribute('stroke', p.stroke)
  })

  // Signal arrows — color by source actor
  const actorXPositions: number[] = []
  actorLines.forEach((l) => {
    actorXPositions.push(parseFloat(l.getAttribute('x1') || '0'))
  })
  const findSourceActor = (x: number): number => {
    let closest = 0, minDist = Infinity
    actorXPositions.forEach((ax, i) => {
      const d = Math.abs(ax - x)
      if (d < minDist) { minDist = d; closest = i }
    })
    return closest
  }
  const brightenColor = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgb(${Math.round(r + (255 - r) * 0.4)}, ${Math.round(g + (255 - g) * 0.4)}, ${Math.round(b + (255 - b) * 0.4)})`
  }
  // Helper: get or create a marker clone for a given color
  const markerCache = new Map<string, string>()
  const recolorMarker = (line: SVGLineElement, attr: string, color: string): void => {
    const markerUrl = line.getAttribute(attr)
    if (!markerUrl) return
    const mid = markerUrl.replace(/^url\(#|\)$/g, '')
    const cacheKey = `${mid}-${color.replace(/[^a-zA-Z0-9]/g, '')}`
    if (markerCache.has(cacheKey)) {
      line.setAttribute(attr, `url(#${markerCache.get(cacheKey)})`)
      return
    }
    const orig = el.querySelector(`#${CSS.escape(mid)}`)
    if (!orig) return
    const clone = orig.cloneNode(true) as SVGMarkerElement
    clone.id = cacheKey
    clone.querySelectorAll('path, circle, polygon, line').forEach((c) => {
      ;(c as HTMLElement).style.setProperty('fill', color, 'important')
      ;(c as HTMLElement).style.setProperty('stroke', color, 'important')
    })
    orig.parentNode!.appendChild(clone)
    markerCache.set(cacheKey, cacheKey)
    line.setAttribute(attr, `url(#${cacheKey})`)
  }
  const colorLineMarkers = (line: SVGLineElement, color: string): void => {
    recolorMarker(line, 'marker-end', color)
    recolorMarker(line, 'marker-start', color)
  }
  // Solid message lines — source actor color
  el.querySelectorAll<SVGLineElement>('line.messageLine0').forEach((l) => {
    const x1 = parseFloat(l.getAttribute('x1') || '0')
    const srcIdx = findSourceActor(x1)
    const p = actorPalette[srcIdx % actorPalette.length]
    l.style.stroke = p.stroke
    colorLineMarkers(l, p.stroke)
  })
  // Dotted message lines — brightened source actor color
  el.querySelectorAll<SVGLineElement>('line.messageLine1').forEach((l) => {
    const x1 = parseFloat(l.getAttribute('x1') || '0')
    const srcIdx = findSourceActor(x1)
    const p = actorPalette[srcIdx % actorPalette.length]
    const bright = brightenColor(p.stroke)
    l.style.stroke = bright
    colorLineMarkers(l, bright)
  })
  // Paths — fallback for non-sequence diagrams
  const fallbackColor = '#3b82f6'
  const isSequenceDiagram = actorLines.length > 0
  el.querySelectorAll<SVGPathElement>('path').forEach((p) => {
    if (isSequenceDiagram && p.closest('marker')) return
    const s = p.getAttribute('stroke')
    if (s === 'black' || s === '#000000' || s === '#000') p.setAttribute('stroke', fallbackColor)
    const f = p.getAttribute('fill')
    if (f === 'black' || f === '#000000' || f === '#000') p.setAttribute('fill', fallbackColor)
  })
  if (!isSequenceDiagram) {
    el.querySelectorAll<SVGElement>('marker path, marker circle').forEach((m) => {
      const s = m.getAttribute('stroke')
      if (!s || s === 'black' || s === '#000000') (m as HTMLElement).style.stroke = fallbackColor
      const f = m.getAttribute('fill')
      if (!f || f === 'black' || f === '#000000') (m as HTMLElement).style.fill = fallbackColor
    })
  }
}

export function MermaidDiagram({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const id = useId()
  const idRef = useRef(`mermaid-${id.replace(/:/g, '')}`)

  useEffect(() => {
    if (!containerRef.current) return
    initMermaid()

    let cancelled = false

    mermaid
      .render(idRef.current, fixAmbiguousLabels(chart))
      .then(({ svg }) => {
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg
          patchSvgDarkTheme(containerRef.current)
          setError(null)
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || 'Failed to render diagram')
      })

    return () => { cancelled = true }
  }, [chart])

  if (error) {
    return (
      <div className="rounded border border-red-800 bg-red-950/30 p-4 text-sm text-red-400">
        <p className="mb-2 font-medium">Diagram render error</p>
        <pre className="whitespace-pre-wrap text-xs">{error}</pre>
      </div>
    )
  }

  return <div ref={containerRef} className="my-6 flex justify-center [&_svg]:max-w-full" />
}
