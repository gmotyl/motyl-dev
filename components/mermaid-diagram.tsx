'use client'

import { useEffect, useRef, useState } from 'react'
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

let idCounter = 0

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
    const m = t.match(/translate\(([\d.]+),\s*([\d.]+)\)/)
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
    l.style.opacity = '0.5'
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

  // Signal arrows — solid vs dotted
  const solidColor = '#3b82f6'
  const dottedColor = '#f59e0b'
  el.querySelectorAll<SVGLineElement>('line.messageLine0').forEach((l) => { l.style.stroke = solidColor })
  el.querySelectorAll<SVGLineElement>('line.messageLine1').forEach((l) => { l.style.stroke = dottedColor })
  // Paths
  el.querySelectorAll<SVGPathElement>('path').forEach((p) => {
    const s = p.getAttribute('stroke')
    if (s === 'black' || s === '#000000' || s === '#000') p.setAttribute('stroke', solidColor)
    const f = p.getAttribute('fill')
    if (f === 'black' || f === '#000000' || f === '#000') p.setAttribute('fill', solidColor)
  })
  // Marker arrowheads
  el.querySelectorAll<SVGElement>('marker path, marker circle').forEach((m) => {
    const s = m.getAttribute('stroke')
    if (!s || s === 'black' || s === '#000000') (m as HTMLElement).style.stroke = solidColor
    const f = m.getAttribute('fill')
    if (!f || f === 'black' || f === '#000000') (m as HTMLElement).style.fill = solidColor
  })
  // Clone markers for dotted lines
  el.querySelectorAll<SVGLineElement>('line.messageLine1').forEach((line) => {
    const markerUrl = line.getAttribute('marker-end')
    if (!markerUrl) return
    const id = markerUrl.replace(/^url\(#|\)$/g, '')
    const orig = el.querySelector(`#${CSS.escape(id)}`)
    if (!orig) return
    const cloneId = id + '-dotted'
    if (el.querySelector(`#${CSS.escape(cloneId)}`)) {
      line.setAttribute('marker-end', `url(#${cloneId})`)
      return
    }
    const clone = orig.cloneNode(true) as SVGMarkerElement
    clone.id = cloneId
    clone.querySelectorAll('path, circle').forEach((c) => {
      ;(c as HTMLElement).style.fill = dottedColor
      ;(c as HTMLElement).style.stroke = dottedColor
    })
    orig.parentNode!.appendChild(clone)
    line.setAttribute('marker-end', `url(#${cloneId})`)
  })
}

export function MermaidDiagram({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const idRef = useRef(`mermaid-${Date.now()}-${idCounter++}`)

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
