<template>
  <div ref="scroller" class="term-scroll" @click="focusInput">
    <!-- ── rendered history ─────────────────────────────── -->
    <div v-for="(line, i) in lines" :key="i" class="line">
      <template v-if="line.kind === 'cmd'">
        <p class="l-cmd">
          <span class="ps">
            <span class="ps-user">{{ PROMPT_USER }}</span><span class="ps-punct">:</span><span class="ps-path">{{ line.path }}</span><span class="ps-punct">$</span>
          </span>
          <span class="cmd-name">{{ splitCommand(line.text).name }}</span>{{ splitCommand(line.text).rest }}
        </p>
      </template>

      <div v-else-if="line.kind === 'banner'" class="l-banner" role="img" aria-label="Kyle Hammond">
        <div v-for="(row, ri) in BANNER_ROWS" :key="ri" class="banner-row">
          <span v-for="(on, ci) in row" :key="ci" :class="['px', { on }]" />
        </div>
      </div>

      <ul v-else-if="line.kind === 'links'" class="l-links">
        <li v-for="s in line.items" :key="s.label">
          <a :href="s.href" class="link-u" target="_blank" rel="noopener noreferrer">{{ s.label }}</a>
        </li>
      </ul>

      <ul v-else-if="line.kind === 'list'" class="l-list">
        <li v-for="it in line.items" :key="it.name">
          <span class="l-name">{{ it.name }}</span>
        </li>
      </ul>

      <div v-else-if="line.kind === 'chips'" class="l-chips">
        <span class="l-chips-label">{{ line.label }}</span>
        <span class="l-chips-text">{{ line.items.join(' · ') }}</span>
      </div>

      <!-- education card -->
      <div v-else-if="line.kind === 'edu'" class="l-entry">
        <div class="entry-title">{{ EDUCATION.degree }}</div>
        <div class="entry-meta">
          <span class="accent">{{ EDUCATION.school }}</span> — {{ EDUCATION.location }}
          <span class="entry-meta-sep">·</span>{{ EDUCATION.period }}
        </div>
        <div class="l-chips">
          <span class="l-chips-label">Coursework</span>
          <span class="l-chips-text">{{ EDUCATION.coursework.join(' · ') }}</span>
        </div>
      </div>

      <!-- plain bullet list (used by case-study detail output) -->
      <ul v-else-if="line.kind === 'bullets'" class="bullets">
        <li v-for="(d, j) in line.items" :key="j">
          <span class="caret">›</span><span>{{ d }}</span>
        </li>
      </ul>

      <!-- screenshot, cat'd inline like the file it's a preview of -->
      <a
        v-else-if="line.kind === 'shot'"
        :href="line.src"
        target="_blank"
        rel="noopener noreferrer"
        :class="['l-shot', { narrow: line.narrow }]"
      >
        <img :src="line.src" :alt="line.alt" loading="lazy" />
      </a>

      <dl v-else-if="line.kind === 'help'" class="l-help">
        <template v-for="row in line.rows" :key="row[0]">
          <dt>{{ row[0] }}</dt>
          <dd>— {{ row[1] }}</dd>
        </template>
      </dl>

      <p v-else-if="line.kind === 'blank'" class="l-blank">&nbsp;</p>

      <p v-else :class="['l-text', line.tone ? `tone-${line.tone}` : '']">{{ line.text }}</p>
    </div>

    <!-- ── command currently being typed by the boot script ── -->
    <p v-if="typing !== null" class="l-cmd">
      <span class="ps">
        <span class="ps-user">{{ PROMPT_USER }}</span><span class="ps-punct">:</span><span class="ps-path">{{ promptPath }}</span><span class="ps-punct">$</span>
      </span>
      <span class="cmd-name">{{ splitCommand(typing).name }}</span>{{ splitCommand(typing).rest }}<span class="cursor" />
    </p>

    <!-- ── live prompt ──────────────────────────────────── -->
    <form v-if="!booting" class="prompt" @submit.prevent="submit">
      <span class="ps">
        <span class="ps-user">{{ PROMPT_USER }}</span><span class="ps-punct">:</span><span class="ps-path">{{ promptPath }}</span><span class="ps-punct">$</span>
      </span>
      <input
        ref="inputEl"
        v-model="draft"
        class="prompt-input"
        type="text"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        aria-label="Terminal command input"
        @keydown.up.prevent="history(-1)"
        @keydown.down.prevent="history(1)"
        @keydown.tab.prevent="complete"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import {
  BANNER, PROFILE, SOCIALS, PROJECTS, SKILL_GROUPS, EDUCATION, PROJECT_DETAILS,
} from '@/data/portfolio'

// Rendered as a CSS grid of fixed-size boxes rather than raw monospace text:
// the ▮ glyph isn't in every font at the same advance width as a space, so
// text-flow alignment silently drifts a column or two per row. A grid cell
// has an explicit width regardless of what the glyph itself measures.
const BANNER_ROWS = BANNER.split('\n').map((row) => [...row].map((ch) => ch !== ' '))

type Line =
  | { kind: 'cmd'; text: string; path: string }
  | { kind: 'banner' }
  | { kind: 'links'; items: { label: string; href: string }[] }
  | { kind: 'list'; items: { name: string; desc: string }[] }
  | { kind: 'chips'; label: string; items: string[] }
  | { kind: 'edu' }
  | { kind: 'bullets'; items: string[] }
  | { kind: 'shot'; src: string; alt: string; narrow?: boolean }
  | { kind: 'help'; rows: [string, string][] }
  | { kind: 'blank' }
  | { kind: 'text'; text: string; tone?: 'muted' | 'error' | 'green' }

const props = defineProps<{
  /** run automatically once boot finishes — used for deep links like /project/:id */
  autoCommand?: string
}>()

const emit = defineEmits<{ spawn: [] }>()

const lines = ref<Line[]>([])
const typing = ref<string | null>(null)
const booting = ref(true)
const draft = ref('')
const inputEl = ref<HTMLInputElement | null>(null)
const scroller = ref<HTMLElement | null>(null)

// current directory — `cd` moves it silently (like a real shell), and a
// bare `cat <id>` resolves against it so you don't have to keep typing
// `projects/` once you're already there
const cwd = ref<'home' | 'projects' | 'skills' | 'education' | 'contact'>('home')
const promptPath = computed(() => (cwd.value === 'home' ? '~' : `~/${cwd.value}`))
const PROMPT_USER = 'kyle@portfolio'

// colors the command name (first word) apart from its arguments, the way
// syntax-highlighting shells (fish, zsh-syntax-highlighting) do
function splitCommand(text: string | null): { name: string; rest: string } {
  if (!text) return { name: '', rest: '' }
  const idx = text.indexOf(' ')
  return idx === -1 ? { name: text, rest: '' } : { name: text.slice(0, idx), rest: text.slice(idx) }
}

const past: string[] = []
let histIdx = -1
let cancelled = false

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

/* ═══════════════════════════════════════════════════════════
   Output builders
   ═══════════════════════════════════════════════════════════ */

const whoamiOut = (): Line[] => [
  { kind: 'banner' },
  { kind: 'text', text: PROFILE.role },
  { kind: 'text', text: PROFILE.location },
  { kind: 'text', text: PROFILE.stack.join(' · ') },
]

const socialsOut = (): Line[] => [{ kind: 'links', items: SOCIALS }]

// `ls projects` — name + tagline only (real `ls` doesn't dump file
// contents either; that's what `cat` is for). The nudge toward `cat <id>`
// only shows up once, in the boot sequence — see BOOT_PROJECTS_HINT.
const projectsBrief = (): Line[] => [
  { kind: 'list', items: PROJECTS.map((p) => ({ name: p.title, desc: p.tagline })) },
]

const skillsOut = (): Line[] =>
  SKILL_GROUPS.map((g) => ({ kind: 'chips', label: g.label, items: g.items }) as Line)

const eduOut = (): Line[] => [{ kind: 'edu' }]

const contactOut = (): Line[] => [
  { kind: 'text', text: `Reach me at ${PROFILE.email}`, tone: 'green' },
  { kind: 'links', items: SOCIALS },
]

function detailBlocksOut(blocks: (typeof PROJECT_DETAILS)[string]['blocks']): Line[] {
  const out: Line[] = []
  blocks.forEach((b, i) => {
    out.push({ kind: 'text', text: b.title, tone: 'green' })
    if (b.image) out.push({ kind: 'shot', src: b.image, alt: b.alt ?? b.title })
    out.push({ kind: 'bullets', items: b.items })
    if (i < blocks.length - 1) out.push({ kind: 'blank' })
  })
  return out
}

function projectDetailOut(id: string): Line[] {
  const proj = PROJECTS.find((p) => p.id === id)
  const detail = PROJECT_DETAILS[id]
  if (!proj || !detail) return [{ kind: 'text', text: `cat: projects/${id}: No such file or directory`, tone: 'error' }]

  const out: Line[] = [
    { kind: 'text', text: `${proj.title} — full breakdown`, tone: 'green' },
    { kind: 'blank' },
    { kind: 'text', text: 'Problem Statement', tone: 'green' },
    { kind: 'text', text: detail.problem, tone: 'muted' },
    { kind: 'bullets', items: detail.problemDetail },
    { kind: 'blank' },
    ...detailBlocksOut(detail.blocks),
  ]
  const links: { label: string; href: string }[] = []
  if (proj.website) links.push({ label: 'open website ↗', href: proj.website })
  if (proj.review) links.push({ label: 'view on GitHub ↗', href: proj.review })
  if (links.length) {
    out.push({ kind: 'blank' })
    out.push({ kind: 'links', items: links })
  }
  return out
}

const HELP_ROWS: [string, string][] = [
  ['whoami', 'who am I?'],
  ['ls socials', 'list social links'],
  ['ls projects', 'list projects'],
  ['ls skills', 'list skills'],
  ['ls education', 'list education'],
  ['cat projects/<id>', 'full case study'],
  ['cd <section>', 'change directory'],
  ['cat <id>', 'full case study (after cd projects)'],
  ['contact', 'get in touch'],
  ['new', 'open another terminal window'],
  ['clear', 'clear terminal'],
  ['help', 'show this message'],
]

const SECTIONS = ['home', 'projects', 'skills', 'education', 'contact']

/* ═══════════════════════════════════════════════════════════
   Boot sequence
   ═══════════════════════════════════════════════════════════ */

// run through `execute()` (not pre-built Line arrays) so `cd projects`
// actually moves the shell there and the following `ls` reads that same
// state — the user lands already standing in ~/projects, prompt and all
const BOOT_COMMANDS = ['whoami', 'cd projects', 'ls']
// shown once, right after the boot sequence's own `ls` — not on every
// later `ls`/`ls projects`, which would repeat itself
const BOOT_PROJECTS_HINT: Line = { kind: 'text', text: 'Run "cat <id>" for the full case study.', tone: 'muted' }
const BOOT_OUTRO: Line = { kind: 'text', text: 'Type "help" for available commands.', tone: 'muted' }

async function typeCmd(text: string) {
  typing.value = ''
  for (const ch of text) {
    if (cancelled) return
    typing.value += ch
    await sleep(16 + Math.random() * 22)
  }
  await sleep(110)
}

async function boot() {
  if (reduced) {
    for (const cmd of BOOT_COMMANDS) {
      const path = promptPath.value
      lines.value.push({ kind: 'cmd', text: cmd, path })
      lines.value.push(...execute(cmd))
    }
    lines.value.push(BOOT_PROJECTS_HINT)
    lines.value.push(BOOT_OUTRO)
    typing.value = null
    booting.value = false
    if (props.autoCommand) await runCommand(props.autoCommand)
    return
  }

  await sleep(220)
  for (const cmd of BOOT_COMMANDS) {
    if (cancelled) return
    await typeCmd(cmd)
    if (cancelled) return
    const path = promptPath.value
    lines.value.push({ kind: 'cmd', text: cmd, path })
    typing.value = null
    await sleep(70)
    for (const l of execute(cmd)) {
      if (cancelled) return
      lines.value.push(l)
      await scrollDown()
      await sleep(45)
    }
    await sleep(150)
  }
  lines.value.push(BOOT_PROJECTS_HINT)
  lines.value.push(BOOT_OUTRO)
  typing.value = null
  booting.value = false
  await nextTick()
  scrollDown()

  if (props.autoCommand) await runCommand(props.autoCommand)
}

/* ═══════════════════════════════════════════════════════════
   Command execution
   ═══════════════════════════════════════════════════════════ */

function execute(raw: string): Line[] {
  const cmd = raw.trim().replace(/\s+/g, ' ')
  const lower = cmd.toLowerCase()

  if (!cmd) return []

  if (lower === 'help') return [{ kind: 'help', rows: HELP_ROWS }]
  if (lower === 'clear') { lines.value = []; return [] }
  if (lower === 'whoami') return whoamiOut()

  if (lower === 'ls' || lower === 'ls -la' || lower === 'ls -l') {
    // bare `ls` lists whatever directory you're currently in, same as a
    // real shell — not always the top-level sections
    if (cwd.value === 'projects') return projectsBrief()
    if (cwd.value === 'skills') return skillsOut()
    if (cwd.value === 'education') return eduOut()
    if (cwd.value === 'contact') return contactOut()
    return [{ kind: 'text', text: SECTIONS.join('/   ') + '/', tone: 'green' }]
  }

  if (lower === 'ls socials' || lower === 'ls social') return socialsOut()
  if (lower === 'ls projects' || lower === 'ls project') return projectsBrief()
  if (lower === 'ls skills' || lower === 'ls skill') return skillsOut()
  if (lower === 'ls education') return eduOut()

  if (lower.startsWith('cat ')) {
    const argRaw = cmd.slice(4).trim()
    const arg = argRaw.toLowerCase()

    // explicit path form — works no matter what directory you're in
    const pathMatch = arg.match(/^(?:~\/)?projects?\/([a-z0-9-]+)\/?$/)
    if (pathMatch) {
      const [, id] = pathMatch
      return projectDetailOut(id!)
    }

    // bare id — resolved against the current directory, so once you've
    // `cd`ed into projects you don't have to keep typing it
    if (/^[a-z0-9-]+$/.test(arg) && cwd.value === 'projects') {
      return projectDetailOut(arg)
    }

    return [{ kind: 'text', text: `cat: ${argRaw}: No such file or directory`, tone: 'error' }]
  }

  if (lower.startsWith('cd ')) {
    const target = lower.slice(3).replace(/^[.~/]+|\/+$/g, '') || 'home'
    if (!SECTIONS.includes(target)) return [{ kind: 'text', text: `cd: no such section: ${target}`, tone: 'error' }]
    cwd.value = target as typeof cwd.value
    return []
  }

  if (lower === 'contact' || lower === 'email') return contactOut()

  if (lower === 'new' || lower === 'newterm' || lower === 'new terminal' || lower === 'open terminal') {
    emit('spawn')
    return [{ kind: 'text', text: 'opening a new terminal window...', tone: 'green' }]
  }

  if (lower.startsWith('open ')) {
    const key = lower.slice(5).trim()
    const hit = SOCIALS.find((s) => s.label === key)
    if (hit) {
      window.open(hit.href, '_blank', 'noopener,noreferrer')
      return [{ kind: 'text', text: `opening ${key}...`, tone: 'muted' }]
    }
    return [{ kind: 'text', text: `open: unknown target: ${key}`, tone: 'error' }]
  }

  if (lower === 'pwd')
    return [{ kind: 'text', text: cwd.value === 'home' ? '/home/kyle' : `/home/kyle/${cwd.value}` }]
  if (lower === 'date') return [{ kind: 'text', text: new Date().toString() }]
  if (lower === 'uname' || lower === 'uname -a')
    return [{ kind: 'text', text: 'portfolio 1.0.0 vue/vite x86_64 GNU/Linux' }]

  if (lower.startsWith('echo ')) return [{ kind: 'text', text: cmd.slice(5) }]

  if (lower.startsWith('sudo'))
    return [{ kind: 'text', text: 'kyle is not in the sudoers file. This incident will be reported.', tone: 'error' }]

  if (lower === 'exit' || lower === 'logout')
    return [{ kind: 'text', text: 'There is no exit. Only more scrolling.', tone: 'muted' }]

  if (lower === 'rm -rf /' || lower === 'rm -rf /*')
    return [{ kind: 'text', text: 'Nice try. Permission denied.', tone: 'error' }]

  if (lower === 'coffee' || lower === 'make coffee')
    return [{ kind: 'text', text: "418 I'm a teapot", tone: 'muted' }]

  return [
    { kind: 'text', text: `command not found: ${cmd}`, tone: 'error' },
    { kind: 'text', text: 'Type "help" for available commands.', tone: 'muted' },
  ]
}

// shared by both the live prompt and the inline [cat details]-style action
// buttons, so clicking one prints exactly as if the command had been typed
async function runCommand(cmd: string) {
  const path = promptPath.value
  const out = execute(cmd)
  lines.value.push({ kind: 'cmd', text: cmd, path })
  lines.value.push(...out)
  if (out.length) lines.value.push({ kind: 'blank' })
  await nextTick()
  scrollDown()
}

async function submit() {
  const cmd = draft.value
  draft.value = ''
  histIdx = -1

  const trimmed = cmd.trim()
  if (trimmed) past.push(cmd)

  if (trimmed.toLowerCase() === 'clear') { execute(cmd); return }
  await runCommand(cmd)
}

/* ═══════════════════════════════════════════════════════════
   Input affordances
   ═══════════════════════════════════════════════════════════ */

function history(dir: -1 | 1) {
  if (!past.length) return
  if (histIdx === -1) histIdx = past.length
  histIdx = Math.min(past.length, Math.max(0, histIdx + dir))
  draft.value = histIdx === past.length ? '' : past[histIdx]!
}

// once you've `cd`ed into projects, complete to the short `cat <id>` form
// (what actually resolves from there) rather than the full path — matching
// the same shortcut `execute()` already accepts
function completions(): string[] {
  const catCompletions = Object.keys(PROJECT_DETAILS).map(
    (id) => (cwd.value === 'projects' ? `cat ${id}` : `cat projects/${id}`),
  )
  return [
    'help', 'whoami', 'clear', 'contact', 'new',
    'ls socials', 'ls projects', 'ls skills', 'ls education',
    ...SECTIONS.map((s) => `cd ${s}`),
    ...SOCIALS.map((s) => `open ${s.label}`),
    ...catCompletions,
  ]
}

// `cat <partial>` completes against project ids from whatever directory
// you're in, whether you typed the bare id or a `projects/` path to it —
// the result always resolves (bare form only works once you're already
// cd'ed into projects; everywhere else it fills in the full path)
function catCompletion(cur: string): string | null {
  const match = cur.match(/^cat\s+(?:(?:~\/)?projects?\/)?([a-z0-9-]*)$/)
  if (!match) return null
  const idPrefix = match[1]!
  const id = Object.keys(PROJECT_DETAILS).find((k) => k.startsWith(idPrefix))
  if (!id) return null
  return cwd.value === 'projects' ? `cat ${id}` : `cat projects/${id}`
}

function complete() {
  const cur = draft.value.trim().toLowerCase()
  if (!cur) return
  const hit = catCompletion(cur) ?? completions().find((c) => c.startsWith(cur))
  if (hit) draft.value = hit
}

function focusInput() {
  if (window.getSelection()?.toString()) return // don't steal focus mid-copy
  inputEl.value?.focus({ preventScroll: true })
}

async function scrollDown() {
  await nextTick()
  const el = scroller.value
  if (el) el.scrollTop = el.scrollHeight
}

onMounted(boot)
onBeforeUnmount(() => { cancelled = true })
</script>

<style scoped>
.term-scroll {
  min-height: min(66vh, 560px);
  max-height: 76vh;
  overflow-y: auto;
  padding: var(--sp-6) var(--sp-8);
  cursor: text;
  font-size: var(--text-sm);
  line-height: 1.9;
}

.line { min-width: 0; }

.ps { margin-right: var(--sp-2); white-space: nowrap; font-weight: 700; }
.ps-user { color: var(--green); }
.ps-path { color: var(--text-primary); }
.ps-punct { color: var(--text-muted); }
.accent { color: var(--green); }
.cmd-name { color: var(--cmd-accent); }

.l-cmd {
  color: var(--text-primary);
  font-weight: 700;
  margin-top: var(--sp-6);
}
.line:first-child .l-cmd { margin-top: 0; }

/* ── block-letter banner ──────────────────────────────────
   Rendered as a grid of fixed-size boxes rather than text, so alignment
   can't drift if a font substitutes a different width for the ▮ glyph. */
.l-banner {
  --banner-px:  clamp(4px, 1vw, 9px);
  --banner-gap: clamp(1px, 0.18vw, 2px);
  display: flex;
  flex-direction: column;
  gap: var(--banner-gap);
  margin: var(--sp-4) 0 var(--sp-6);
  overflow-x: auto;
  padding-bottom: 2px;
}

.banner-row { display: flex; gap: var(--banner-gap); }

.px {
  width: var(--banner-px);
  height: var(--banner-px);
  flex-shrink: 0;
  border-radius: 1px;
  background: transparent;
}

.px.on {
  background: var(--green);
  box-shadow: 0 0 6px var(--green-glow);
}

/* ── link list ────────────────────────────────────────── */
.l-links { list-style: none; padding-left: var(--sp-4); }

/* ── item list ────────────────────────────────────────── */
.l-list { list-style: none; padding-left: var(--sp-4); display: flex; flex-direction: column; gap: var(--sp-1); }
.l-name { color: var(--text-primary); font-weight: 700; }

/* ── skills / coursework (plain key/value output, like the STACK row
   in whoami) ─────────────────────────────────────────── */
.l-chips {
  display: flex;
  gap: var(--sp-4);
  padding-left: var(--sp-4);
  margin-bottom: var(--sp-2);
  flex-wrap: wrap;
}
.l-chips-label {
  color: var(--green);
  font-size: var(--text-xs);
  font-weight: 700;
  min-width: 96px;
}
.l-chips-text { color: var(--text-primary); }

/* ── education entry ─────────────────────────────────── */
.entry-title {
  font-family: var(--font-mono);
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.4;
}

.entry-meta {
  font-size: var(--text-xs);
  color: var(--text-muted);
  letter-spacing: 0.02em;
  margin-bottom: var(--sp-3);
}
.entry-meta-sep { margin: 0 var(--sp-2); opacity: 0.6; }

/* ── bullet list (entry details + case-study output) ─────── */
.bullets { list-style: none; display: flex; flex-direction: column; gap: var(--sp-2); padding-left: var(--sp-4); }
.bullets li {
  display: flex;
  gap: var(--sp-2);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.7;
}
.bullets .caret { color: var(--green); }

/* ── screenshot ───────────────────────────────────────── */
.l-shot {
  display: block;
  margin: var(--sp-2) 0 var(--sp-3) var(--sp-4);
  max-width: 320px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--bg-deep);
}
.l-shot img { display: block; width: 100%; height: auto; transition: opacity 0.2s; }
.l-shot:hover img { opacity: 0.86; }
.l-shot.narrow { max-width: 200px; }

/* ── help table ───────────────────────────────────────── */
.l-help {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0 var(--sp-6);
  padding-left: var(--sp-4);
}
.l-help dt { color: var(--green); }
.l-help dd { color: var(--text-muted); }

/* ── plain text ───────────────────────────────────────── */
.l-text { color: var(--text-primary); }
.tone-muted { color: var(--text-muted); font-style: italic; }
.tone-error { color: #ff6b6b; }
.tone-green { color: var(--green); font-weight: 700; letter-spacing: 0.06em; }

.l-blank { height: var(--sp-6); }

/* ── prompt ───────────────────────────────────────────── */
.prompt {
  display: flex;
  align-items: center;
  margin-top: var(--sp-4);
}

.prompt-input {
  flex: 1;
  min-width: 0;
  background: none;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  caret-color: var(--green);
  padding: 0;
}

.cursor {
  display: inline-block;
  width: 8px;
  height: 1em;
  background: var(--green);
  vertical-align: text-bottom;
  margin-left: 2px;
  animation: blink 1s steps(1) infinite;
}

@keyframes blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }

@media (max-width: 640px) {
  .term-scroll { padding: var(--sp-4); }
  .l-chips { flex-direction: column; gap: var(--sp-2); }
  .l-shot { margin-left: 0; max-width: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .cursor { animation: none; }
}
</style>
