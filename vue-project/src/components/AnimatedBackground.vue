<template>
  <canvas ref="canvas" class="animated-bg" aria-hidden="true" />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let animId: number

// ── Blob definitions ──────────────────────────────────────────────────────────
// Each blob has two independent sine-wave frequencies per axis (sx/sy * 1.7 etc.)
// to produce natural Lissajous-style drift instead of a mechanical loop.

const BLOBS = [
  { bx: 0.15, by: 0.30, r: 0.42, rgb: '108,99,255', alpha: 0.10, sx: 0.000055, sy: 0.000043, px: 0.00, py: 1.30 },
  { bx: 0.78, by: 0.58, r: 0.34, rgb: '150,70,255', alpha: 0.09, sx: 0.000047, sy: 0.000061, px: 2.10, py: 0.80 },
  { bx: 0.50, by: 0.88, r: 0.30, rgb: '50,170,255', alpha: 0.08, sx: 0.000063, sy: 0.000039, px: 4.50, py: 3.20 },
  { bx: 0.88, by: 0.12, r: 0.25, rgb: '190,70,200', alpha: 0.08, sx: 0.000051, sy: 0.000057, px: 1.30, py: 5.10 },
  { bx: 0.28, by: 0.72, r: 0.22, rgb: '108,99,255', alpha: 0.07, sx: 0.000041, sy: 0.000053, px: 3.70, py: 2.60 },
]

// ── Particle definitions ──────────────────────────────────────────────────────

const PARTICLES = Array.from({ length: 55 }, () => ({
  x:      Math.random(),
  y:      Math.random(),
  size:   Math.random() * 1.6 + 0.4,
  baseOp: Math.random() * 0.35 + 0.08,
  vx:     (Math.random() - 0.5) * 0.000055,
  vy:     (Math.random() - 0.5) * 0.000055,
  phase:  Math.random() * Math.PI * 2,
  freq:   Math.random() * 0.0008 + 0.0014,
}))

onMounted(() => {
  const el = canvas.value!

  // alpha: true — canvas is transparent; CSS body background shows through.
  // Never fill the canvas with a solid color — that causes the flicker.
  const ctx = el.getContext('2d', { alpha: true })!

  // ── Offscreen grid canvas ─────────────────────────────────────────────────
  // Built once (and on resize) so each frame is a single drawImage() blit
  // instead of 25+ individual stroke calls.

  const gridCanvas = document.createElement('canvas')
  const gridCtx = gridCanvas.getContext('2d')!

  function buildGrid() {
    gridCanvas.width  = el.width
    gridCanvas.height = el.height
    const W = el.width, H = el.height
    gridCtx.clearRect(0, 0, W, H)
    gridCtx.strokeStyle = 'rgba(108,99,255,0.055)'
    gridCtx.lineWidth = 0.5
    for (let i = 0; i <= 16; i++) {
      const x = (i / 16) * W
      gridCtx.beginPath(); gridCtx.moveTo(x, 0); gridCtx.lineTo(x, H); gridCtx.stroke()
    }
    for (let j = 0; j <= 11; j++) {
      const y = (j / 11) * H
      gridCtx.beginPath(); gridCtx.moveTo(0, y); gridCtx.lineTo(W, y); gridCtx.stroke()
    }
  }

  // ── Resize handler ────────────────────────────────────────────────────────

  function resize() {
    el.width  = window.innerWidth
    el.height = window.innerHeight
    buildGrid()
  }
  resize()
  window.addEventListener('resize', resize, { passive: true })

  // ── Per-frame draw ────────────────────────────────────────────────────────

  function frame(t: number) {
    const W = el.width, H = el.height

    // Full clear — leaves canvas transparent so CSS body bg shows through
    ctx.clearRect(0, 0, W, H)

    // Grid (pre-rendered offscreen blit)
    ctx.drawImage(gridCanvas, 0, 0)

    // Aurora blobs — 'screen' blending adds colours together like light,
    // giving the warm indigo/violet overlap without going white.
    ctx.globalCompositeOperation = 'screen'
    for (const b of BLOBS) {
      const ox = Math.sin(t * b.sx + b.px) * 0.09
               + Math.sin(t * b.sx * 1.7 + b.px + 1.1) * 0.04
      const oy = Math.cos(t * b.sy + b.py) * 0.07
               + Math.cos(t * b.sy * 1.4 + b.py + 2.3) * 0.04
      const cx = (b.bx + ox) * W
      const cy = (b.by + oy) * H
      const radius = b.r * Math.min(W, H)
      const alpha  = b.alpha + 0.025 * Math.sin(t * b.sx * 4.5 + b.px)

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
      g.addColorStop(0,    `rgba(${b.rgb},${alpha})`)
      g.addColorStop(0.35, `rgba(${b.rgb},${alpha * 0.38})`)
      g.addColorStop(0.70, `rgba(${b.rgb},${alpha * 0.08})`)
      g.addColorStop(1,    `rgba(${b.rgb},0)`)

      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalCompositeOperation = 'source-over'

    // Floating particles
    for (const p of PARTICLES) {
      const twinkle = 0.5 + 0.5 * Math.sin(t * p.freq + p.phase)
      const op = p.baseOp * twinkle
      const px = ((p.x + p.vx * t) % 1 + 1) % 1
      const py = ((p.y + p.vy * t) % 1 + 1) % 1
      ctx.beginPath()
      ctx.arc(px * W, py * H, p.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(190,182,255,${op})`
      ctx.fill()
    }

    animId = requestAnimationFrame(frame)
  }

  animId = requestAnimationFrame(frame)

  onBeforeUnmount(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', resize)
  })
})
</script>

<style scoped>
.animated-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  display: block;
}
</style>