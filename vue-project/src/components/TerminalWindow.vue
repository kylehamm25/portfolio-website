<template>
  <div
    v-show="!closed"
    ref="rootEl"
    :class="['term', { 'term-maximized': maximized, 'term-movable': movable }]"
  >
    <div class="term-bar">
      <span class="term-title">
        <svg class="term-icon" width="13" height="13" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="2" width="14" height="12" rx="1" stroke="currentColor" stroke-width="1.2" />
          <path d="M3.2 5.4l2.3 2.1-2.3 2.1M7 9.6h3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span v-if="path" class="term-path">{{ path }}</span>
      </span>
      <span class="term-controls">
        <button
          type="button"
          class="win-btn win-min"
          :class="{ 'is-active': collapsed && !maximized }"
          :aria-label="collapsed && !maximized ? 'Restore window' : 'Minimize window'"
          @click="toggleMinimize"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" stroke-width="1" />
          </svg>
        </button>
        <button
          type="button"
          class="win-btn win-max"
          :aria-label="maximized ? 'Restore down' : 'Maximize window'"
          @click="toggleMaximize"
        >
          <svg v-if="!maximized" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <rect x="1.5" y="1.5" width="7" height="7" stroke="currentColor" stroke-width="1" fill="none" />
          </svg>
          <svg v-else width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <rect x="1" y="2.5" width="6" height="6" stroke="currentColor" stroke-width="1" fill="none" />
            <path d="M3 2.5V1h6v6H7.5" stroke="currentColor" stroke-width="1" fill="none" />
          </svg>
        </button>
        <button
          type="button"
          class="win-btn win-close"
          aria-label="Close window"
          @click="close"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" stroke-width="1.1" />
            <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" stroke-width="1.1" />
          </svg>
        </button>
      </span>
    </div>

    <div class="term-collapse" :class="{ 'is-collapsed': collapsed && !maximized }">
      <div class="term-collapse-inner">
        <div class="term-body" :style="{ padding: bodyPadding }">
          <slot />
        </div>
      </div>
    </div>

    <svg
      v-if="movable && !maximized && !(collapsed)"
      class="resize-grip"
      width="11"
      height="11"
      viewBox="0 0 11 11"
      aria-hidden="true"
    >
      <circle cx="9" cy="2" r="1" /><circle cx="9" cy="6" r="1" /><circle cx="9" cy="9" r="1" />
      <circle cx="5" cy="9" r="1" /><circle cx="2" cy="9" r="1" />
    </svg>
  </div>

  <div v-if="maximized" class="term-backdrop" @click="toggleMaximize" />

  <button v-if="closed" type="button" class="term-ghost" @click="reopen">
    <svg class="term-icon" width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1" y="2" width="14" height="12" rx="1" stroke="currentColor" stroke-width="1.2" />
    </svg>
    <span v-if="path" class="ghost-path">{{ path }}</span>
  </button>
</template>

<script lang="ts">
// Shared across every TerminalWindow instance on the page: several cards can
// be maximized independently, so scroll lock must be reference-counted
// rather than each instance stomping on the others' state.
let lockCount = 0
function lockBodyScroll() {
  lockCount += 1
  if (lockCount === 1) document.body.style.overflow = 'hidden'
}
function unlockBodyScroll() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) document.body.style.overflow = ''
}
</script>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import interact from 'interactjs'
import type { Interactable } from '@interactjs/types'

const props = withDefaults(defineProps<{
  /** shown right-aligned in the title bar, e.g. "~/projects/salon-t" */
  path?: string
  bodyPadding?: string
  /** drag by the title bar, resize from the edges — opt-in per instance */
  movable?: boolean
}>(), {
  path: '',
  bodyPadding: '1.5rem',
  movable: false,
})

const emit = defineEmits<{ close: [] }>()

const rootEl = ref<HTMLElement | null>(null)
const collapsed = ref(false)
const maximized = ref(false)
const closed = ref(false)

function toggleMinimize() {
  maximized.value = false
  collapsed.value = !collapsed.value
}

function toggleMaximize() {
  maximized.value = !maximized.value
  if (maximized.value) collapsed.value = false
}

function close() {
  maximized.value = false
  closed.value = true
  // lets a parent that spawned this window on demand (e.g. the `new`
  // terminal command) drop it entirely instead of leaving a reopenable
  // ghost behind; instances that don't listen just keep the ghost
  emit('close')
}

function reopen() {
  closed.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && maximized.value) toggleMaximize()
}

watch(maximized, (isMax) => {
  if (isMax) {
    lockBodyScroll()
    window.addEventListener('keydown', onKeydown)
  } else {
    unlockBodyScroll()
    window.removeEventListener('keydown', onKeydown)
  }
})

/* ═══════════════════════════════════════════════════════════
   Drag + resize (movable prop only)
   ═══════════════════════════════════════════════════════════ */

let interactable: Interactable | null = null
let dragX = 0
let dragY = 0

function applyTransform(el: HTMLElement) {
  el.style.transform = `translate(${dragX}px, ${dragY}px)`
}

onMounted(() => {
  if (!props.movable || !rootEl.value) return

  interactable = interact(rootEl.value)
    .draggable({
      allowFrom: '.term-bar',
      ignoreFrom: '.term-controls',
      listeners: {
        move(event) {
          dragX += event.dx
          dragY += event.dy
          applyTransform(event.target)
        },
      },
    })
    .resizable({
      edges: { left: true, right: true, bottom: true, top: false },
      modifiers: [
        interact.modifiers.restrictSize({ min: { width: 360, height: 220 } }),
      ],
      listeners: {
        move(event) {
          // resizing from the left edge shifts the origin, so fold that
          // into the same translate used for dragging
          dragX += event.deltaRect.left
          dragY += event.deltaRect.top
          Object.assign(event.target.style, {
            width: `${event.rect.width}px`,
            height: `${event.rect.height}px`,
          })
          applyTransform(event.target)
        },
      },
    })

  // dragging/resizing while maximized would fight the fixed-position
  // overlay CSS, and the transform is force-reset to none while maximized
  // anyway (see .term-maximized), so just suspend the gesture recognizers
  watch(maximized, (isMax) => {
    interactable?.draggable({ enabled: !isMax })
    interactable?.resizable({ enabled: !isMax })
  })
})

onBeforeUnmount(() => {
  if (maximized.value) unlockBodyScroll()
  window.removeEventListener('keydown', onKeydown)
  interactable?.unset()
})
</script>

<style scoped>
.term {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--panel);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  overflow: hidden;
  transition: border-color 0.22s var(--ease-out), transform 0.22s var(--ease-out);
}

/* ── drag + resize (movable prop) ─────────────────────── */
.term-movable {
  position: relative;
  z-index: 40;
  touch-action: none;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  /* transform now drives live drag/resize positioning every pointermove —
     the base .term transition would lag it behind the cursor */
  transition: border-color 0.22s var(--ease-out);
}

.term-movable .term-bar { cursor: move; }

.resize-grip {
  position: absolute;
  right: 3px;
  bottom: 3px;
  color: var(--text-muted);
  pointer-events: none;
}
.resize-grip circle { fill: currentColor; }

.term-maximized {
  position: fixed;
  inset: 5vh 6vw;
  z-index: 200;
  max-width: none;
  /* a prior manual resize leaves inline width/height/transform on the
     element — inset alone should govern size+position while maximized */
  width: auto !important;
  height: auto !important;
  transform: none !important;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
}

.term-maximized .term-collapse,
.term-maximized .term-collapse-inner,
.term-maximized .term-body { height: 100%; }
.term-maximized .term-collapse-inner { overflow-y: auto; }

.term-backdrop {
  position: fixed;
  inset: 0;
  z-index: 190;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

.term-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-4);
  padding: 0 0 0 var(--sp-3);
  border-bottom: 1px solid var(--border);
  background: var(--panel-head);
  flex-shrink: 0;
}

.term-title {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  min-width: 0;
}

.term-icon { color: var(--green); flex-shrink: 0; opacity: 0.85; }

.term-path {
  font-size: var(--text-xs);
  color: var(--text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ── Windows-style window controls ───────────────────── */
.term-controls { display: flex; align-items: stretch; flex-shrink: 0; }

.win-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 26px;
  border: none;
  background: none;
  color: var(--text-muted);
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
}

.win-min:hover,
.win-max:hover { background: var(--green-faint); color: var(--text-primary); }
.win-min.is-active { color: var(--green); }

.win-close:hover { background: #e81123; color: #fff; }

/* ── minimize collapse (CSS-only auto-height animation) ──
   flex-basis:auto (not the flex:1 shorthand's 0%) keeps this hugging its
   own content when .term has no explicit height (the common case) — with
   basis:0 it collapses to nothing, since an auto-height ancestor has no
   free space to grow an empty-basis item into. It still grows to fill
   real free space when a caller *does* give .term a fixed/min height. */
.term-collapse {
  display: grid;
  grid-template-rows: 1fr;
  flex: 1 1 auto;
  min-height: 0;
  transition: grid-template-rows 0.24s var(--ease-out);
}
.term-collapse.is-collapsed { grid-template-rows: 0fr; flex: 0 0 auto; }
.term-collapse-inner {
  overflow: hidden;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.term-body {
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

/* ── closed placeholder ───────────────────────────────── */
.term-ghost {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  width: 100%;
  padding: var(--sp-3) var(--sp-4);
  border: 1px dashed var(--border);
  border-radius: var(--radius);
  background: none;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  cursor: pointer;
  transition: border-color 0.18s, color 0.18s;
}
.term-ghost:hover { border-color: var(--border-hover); color: var(--green); }
.ghost-path { color: var(--text-secondary); }
.ghost-hint { opacity: 0.75; }

@media (max-width: 640px) {
  .term-body { padding: var(--sp-4) !important; }
  .term-maximized { inset: 2.5vh 3vw; }
}

@media (prefers-reduced-motion: reduce) {
  .term-collapse { transition: none; }
}
</style>
