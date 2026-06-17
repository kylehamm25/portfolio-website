<template>
  <AnimatedBackground />

  <!-- Nav -->
  <div class="nav-wrapper">
  <AppCardNoBorder borderRadius="0px" :class="['nav', 'nav-scrolled']">
    <div class="nav-links">
      <a href="#projects">Projects</a>
      <a href="#skills">Skills</a>
      <a href="#experience">Experience</a>
      <a href="#education">Education</a>
      <a href="#contact">Contact</a>
    </div>
  </AppCardNoBorder>
</div>

  <main>
    <!-- Hero -->
    <section class="hero">
      <div class="hero-content">
        <p class="hero-eyebrow">
          <span class="section-label">Open to full-time opportunities</span>
        </p>
        <h1 class="hero-headline">
          Kyle Hammond
          <span class="cursor" :style="{ opacity: tick ? 1 : 0 }">_</span>
        </h1>
        <p class="hero-sub">
          Computer Science graduate building full-stack applications
          with modern cloud infrastructure. Experienced in React, AWS,
          and database-driven platforms used by real businesses.
        </p>

        <div class="hero-meta">
          <a href="mailto:kylehamm25@gmail.com" class="meta-link">kylehamm25@gmail.com</a>
          <span class="sep">·</span>
          <a href="https://github.com/kylehamm25" target="_blank" rel="noopener noreferrer" class="meta-link">GitHub</a>
          <span class="sep">·</span>
          <a href="https://linkedin.com/in/kyle-hammond" target="_blank" rel="noopener noreferrer" class="meta-link">LinkedIn</a>
        </div>
      </div>
      <div class="hero-grid-accent" aria-hidden="true">
        <span v-for="i in 120" :key="i" class="grid-dot" />
      </div>
    </section>

    <!-- Experience -->
    <section class="section" id="experience">
      <FadeIn>
        <div class="section-header">
          <span class="section-label">Experience</span>
        </div>
      </FadeIn>
      <div class="timeline">
        <FadeIn
          v-for="(job, i) in EXPERIENCE"
          :key="job.company"
          :delay="i * 80"
        >
          <AppCardNoBorder class="timeline-item">
            <div class="timeline-left">
              <span class="timeline-period">{{ job.period }}</span>
            </div>
            <div class="timeline-line">
            </div>
            <div class="timeline-right">
              <p class="timeline-role">{{ job.role }}</p>
              <p class="timeline-company">{{ job.company }} — {{ job.location }}</p>
              <ul class="detail-list" style="margin-top: var(--sp-3)">
                <li
                  v-for="(d, j) in job.details"
                  :key="j"
                  class="timeline-detail detail-item"
                >
                  <span class="detail-bullet">▸</span> {{ d }}
                </li>
              </ul>
            </div>
          </AppCardNoBorder>
        </FadeIn>
      </div>
    </section>

    <!-- Projects -->
    <section class="section" id="projects">
      <FadeIn>
        <div class="section-header">
          <span class="section-label">Projects</span>
        </div>
      </FadeIn>
      <div class="project-details-section" style="margin-top: var(--sp-12)">
        <FadeIn
          v-for="(proj, i) in PROJECT_DETAILS"
          :key="proj.title"
          :delay="i * 80"
        >
          <AppCardNoBorder class="project-detail-card">
            <h3 class="project-title" style="margin-bottom: var(--sp-2)">{{ proj.title }}</h3>
            <p class="project-subtitle">{{ proj.subtitle }}</p>
            <ul class="detail-list">
              <li v-for="(d, j) in proj.details" :key="j" class="detail-item">
                <span class="detail-bullet">▸</span> {{ d }}
              </li>
            </ul>
          </AppCardNoBorder>
        </FadeIn>
      </div>
    </section>

    <!-- Skills -->
    <section class="section" id="skills">
      <FadeIn>
        <div class="section-header">
          <span class="section-label">Skills</span>
        </div>
      </FadeIn>
      <div class="skills-grid">
        <FadeIn
          v-for="(group, i) in SKILL_GROUPS"
          :key="group.label"
          :delay="i * 70"
        >
          <AppCardNoBorder height="100%" class="skill-group">
            <h3 class="skill-label">{{ group.label }}</h3>
            <ul class="skill-list">
              <li v-for="item in group.items" :key="item" class="skill-item">
                <span class="skill-bullet">▸</span> {{ item }}
              </li>
            </ul>
          </AppCardNoBorder>
        </FadeIn>
      </div>
    </section>

    <!-- Education -->
    <section class="section" id="education">
      <FadeIn>
        <div class="section-header">
          <span class="section-label">Education</span>
        </div>
      </FadeIn>
      <FadeIn>
        <AppCardNoBorder class="timeline-item">
          <div class="timeline-left">
            <span class="timeline-period">Aug. 2021 — May 2026</span>
          </div>
          <div class="timeline-line">
          </div>
          <div class="timeline-right">
            <p class="timeline-role">Bachelor of Science in Computer Science</p>
            <p class="timeline-company">University of Maryland, Baltimore County — Baltimore, MD</p>
            <p class="timeline-detail" style="margin-top: var(--sp-3)">
              <span style="color: var(--text-primary)">Relevant Coursework:</span>
              Data Structures, Algorithms, Operating Systems, Computer Networks, Software Engineering,
              Artificial Intelligence, Machine Learning
            </p>
          </div>
        </AppCardNoBorder>
      </FadeIn>
    </section>

    <!-- Contact -->
    <section class="section section-contact" id="contact">
      <FadeIn>
        <div class="section-header">
          <span class="section-label">Contact</span>
        </div>
        <AppCardNoBorder height="200px" borderRadius="28px" class="contact-inner">
          <h2 class="contact-title">Let's connect.</h2>
          <div class="hero-cta">
            <a href="mailto:kylehamm25@gmail.com" class="btn-primary btn-large">
              kylehamm25@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/kyle-hammond"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-ghost btn-large"
            >
              LinkedIn
            </a>
          </div>
        </AppCardNoBorder>
      </FadeIn>
    </section>
  </main>
</template>

<script setup lang="ts">
import AppCard from './components/AppCard.vue';
import AppCardMove from './components/AppCardMove.vue';
import AppCardNoBorder from './components/AppCardNoBorder.vue';
import AnimatedBackground from './components/AnimatedBackground.vue';
import { ref, onMounted, onBeforeUnmount, defineComponent, h, onUnmounted } from 'vue'

// ── Data ──────────────────────────────────────────────────────────────────────

const SKILL_GROUPS = [
  { label: 'Languages',     items: ['Java', 'Python', 'JavaScript', 'C++', 'SQL', 'TypeScript'] },
  { label: 'Frontend',      items: ['React', 'React Native', 'Next.js', 'Expo', 'Vercel'] },
  { label: 'Backend',       items: ['Node.js', 'REST APIs', 'AWS Lambda', 'API Gateway', 'OAuth 2.0'] },
  { label: 'Databases',     items: ['PostgreSQL', 'DynamoDB', 'Supabase'] },
  { label: 'Cloud & Tools', items: ['AWS', 'Vercel', 'Git', 'GitHub'] },
]

const EXPERIENCE = [
  {
    role: 'Full-Stack Software Developer (Contract)',
    company: 'Salon T',
    location: 'Gaithersburg, MD',
    period: 'Jan. 2026 — Present',
    details: [
      'Sole developer of a full salon management platform (Next.js, AWS Lambda, DynamoDB) supporting daily operations for a multi-employee business, handling hundreds of bookings monthly',
      'Eliminated double-booking across all staff calendars by building a real-time scheduling engine with automated conflict detection, processing hundreds of appointments monthly',
      'Automated payroll reporting for 10+ employees, aggregating revenue, tips, and product sales, applying commission calculations, and generating bi-weekly CSV exports',
      'Designed DynamoDB schemas and REST APIs to reliably manage thousands of records across appointments, customers, payroll, and inventory',
      'Built an OAuth2-secured admin dashboard with RBAC, enabling owners and staff to manage schedules, bulk operations, and multi-employee bookings through a purpose-built interface',
    ],
  },
]

const PROJECT_DETAILS = [
  {
    title: 'Industry-Sponsored Inventory System',
    subtitle: 'React Native, TypeScript, Supabase — Jan. 2026 – May 2026',
    details: [
      'Delivered a production mobile app (React Native) for an HVAC/MEP contractor, giving field and warehouse teams real-time visibility into material inventory across multiple locations',
      'Designed role-based workflows for material requests, inventory transfers, delivery confirmation, and approval management',
      'Cut manual data entry by integrating Gemini OCR to parse packing slips and purchase orders directly into structured inventory records',
      'Built a Supabase/PostgreSQL backend handling real-time sync, auth, and full-text search across thousands of inventory records at multiple sites',
    ],
  },
]

// ── Nav scroll ────────────────────────────────────────────────────────────────

const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 40 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

// ── Hero cursor blink ─────────────────────────────────────────────────────────

const tick = ref(true)
let tickTimer: ReturnType<typeof setInterval>
onMounted(() => { tickTimer = setInterval(() => { tick.value = !tick.value }, 530) })
onBeforeUnmount(() => clearInterval(tickTimer))

// ── Misc ──────────────────────────────────────────────────────────────────────

const currentYear = new Date().getFullYear()
</script>

<!-- ─────────────────────────────────────────────────────────────────────────
     FadeIn component
──────────────────────────────────────────────────────────────────────────── -->
<script lang="ts">
export const FadeIn = defineComponent({
  name: 'FadeIn',
  props: {
    delay: { type: Number, default: 0 },
  },
  setup(props, { slots }) {
    const el = ref<HTMLDivElement | null>(null)
    const visible = ref(false)
    let obs: IntersectionObserver | null = null

    onMounted(() => {
      obs = new IntersectionObserver(
        ([entry]) => { if (entry?.isIntersecting) visible.value = true },
        { threshold: 0.15 },
      )
      if (el.value) obs.observe(el.value)
    })

    onUnmounted(() => obs?.disconnect())

    return () =>
      h(
        'div',
        {
          ref: el,
          class: ['fade-in', visible.value ? 'visible' : ''],
          style: { transitionDelay: `${props.delay}ms` },
        },
        slots.default?.(),
      )
  },
})

export default {}
</script>

<style>
/* ─────────────────────────────────────────────
   TOKENS
───────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500&display=swap');

:root {
  --bg:              #09090f;
  --bg-card:         #0f0f1a;
  --bg-card-hover:   #141428;
  --surface:         #1a1a2e;
  --border:          rgba(120, 120, 220, 0.12);
  --border-hover:    rgba(120, 120, 220, 0.32);

  --indigo:          #6c63ff;
  --indigo-dim:      rgba(108, 99, 255, 0.15);
  --indigo-glow:     rgba(108, 99, 255, 0.35);

  --text-primary:    #e8e8f4;
  --text-secondary:  #8888aa;
  --text-muted:      #4a4a66;

  --font-display:    'DM Serif Display', Georgia, serif;
  --font-mono:       'JetBrains Mono', 'Fira Code', monospace;
  --font-body:       'Inter', system-ui, sans-serif;

  --text-xs:   0.72rem;
  --text-sm:   0.85rem;
  --text-base: 1rem;
  --text-lg:   1.18rem;
  --text-xl:   1.5rem;
  --text-2xl:  2rem;
  --text-3xl:  2.8rem;
  --text-4xl:  4rem;
  --text-5xl:  5.5rem;

  --sp-1:  0.25rem;
  --sp-2:  0.5rem;
  --sp-3:  0.75rem;
  --sp-4:  1rem;
  --sp-6:  1.5rem;
  --sp-8:  2rem;
  --sp-12: 3rem;
  --sp-16: 4rem;
  --sp-24: 6rem;

  --radius:    8px;
  --radius-lg: 14px;
  --max-w:     1100px;
  --nav-h:     64px;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}

/* ─────────────────────────────────────────────
   RESET & BASE
───────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body { min-height: 100%; }

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

a { color: inherit; text-decoration: none; -webkit-tap-highlight-color: transparent; }
a:focus-visible { outline: none; }
::selection { background: transparent; }

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  height: var(--nav-h);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--sp-12);
  padding: 0 var(--sp-8);
  transition: background 0.3s, border-bottom 0.3s, backdrop-filter 0.3s;
}

.nav-scrolled {
  background: rgba(9, 9, 15, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.nav-logo {
  font-family: var(--font-mono);
  font-size: var(--text-xl);
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.nav-links {
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: var(--sp-8);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.nav-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.nav-links a { transition: color 0.2s; }
.nav-links a:hover { color: var(--text-primary); }

.nav-cta {
  color: var(--indigo) !important;
  border: 1px solid rgba(108, 99, 255, 0.4);
  padding: var(--sp-2) var(--sp-4);
  border-radius: var(--radius);
  transition: background 0.2s, border-color 0.2s !important;
}

.nav-cta:hover {
  background: var(--indigo-dim);
  border-color: var(--indigo) !important;
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding: calc(var(--nav-h) + var(--sp-16)) var(--sp-8) var(--sp-24);
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: -20%; left: -10%;
  width: 70%; height: 80%;
  pointer-events: none;
  /* Reduced opacity slightly — the AnimatedBackground provides the glow now */
}

.hero-content {
  position: relative;
  /* Removed z-index: 2 — it was creating a stacking context that cut off
     AppCard backdrop-filter from reaching the canvas behind it */
  max-width: var(--max-w);
  margin: 0 auto;
  width: 100%;
}

.hero-eyebrow {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  margin-bottom: var(--sp-6);
}

.dot {
  display: inline-block;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #3ddc84;
  box-shadow: 0 0 8px rgba(61, 220, 132, 0.7);
  animation: pulse-dot 2.5s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

.hero-headline {
  font-family: var(--font-display);
  font-size: clamp(var(--text-3xl), 8vw, var(--text-5xl));
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: var(--sp-6);
}

.cursor {
  color: var(--indigo);
  transition: opacity 0.05s;
  font-family: var(--font-mono);
}

.accent { color: var(--indigo); }

.hero-sub {
  max-width: 560px;
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: var(--sp-8);
}

.hero-cta {
  display: flex;
  gap: var(--sp-4);
  flex-wrap: nowrap;
  margin-bottom: var(--sp-8);
}

.hero-meta {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--text-muted);
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: var(--sp-2);
}

.sep { color: var(--text-muted); }

.meta-link { color: var(--text-secondary); transition: color 0.2s; }
.meta-link:hover { color: var(--indigo); }

.hero-grid-accent {
  position: absolute;
  right: 0; top: 0; bottom: 0;
  width: 50%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 28px;
  padding: 60px;
  pointer-events: none;
  z-index: 1;
  opacity: 0.35;
  mask-image: linear-gradient(to left, transparent 0%, rgba(0,0,0,0.8) 60%, transparent 100%);
}

.grid-dot {
  width: 3px; height: 3px;
  border-radius: 50%;
  background: var(--indigo);
  opacity: 0.5;
}

/* ─────────────────────────────────────────────
   SECTIONS
───────────────────────────────────────────── */
.section {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: var(--sp-24) var(--sp-8);
}

.section-header { margin-bottom: var(--sp-12); }

.section-label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--indigo);
  display: block;
  margin-bottom: var(--sp-3);
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 4vw, var(--text-3xl));
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1.1;
}

/* ─────────────────────────────────────────────
   PROJECT CARDS
───────────────────────────────────────────── */
.project-detail-card {
  padding: var(--sp-8);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  margin-bottom: var(--sp-4);
}

.project-title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1.25;
}

.project-subtitle {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--indigo);
  margin-bottom: var(--sp-6);
}

/* ─────────────────────────────────────────────
   SHARED DETAIL LIST (projects + experience)
───────────────────────────────────────────── */
.detail-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

.detail-item {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.7;
  padding-left: var(--sp-4);
  position: relative;
}

.detail-bullet {
  position: absolute;
  left: 0;
  color: var(--indigo);
}

/* ─────────────────────────────────────────────
   SKILLS
───────────────────────────────────────────── */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-auto-rows: 1fr;
  gap: var(--sp-6);
}

.skill-group {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  height: 100%;
}

.skill-label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--indigo);
  margin-bottom: var(--sp-4);
}

.skill-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
  flex: 1;
}

.skill-item {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: var(--sp-2);
}

.skill-bullet { color: var(--indigo); font-size: 0.65rem; }

/* ─────────────────────────────────────────────
   TIMELINE / EXPERIENCE
───────────────────────────────────────────── */
.timeline { display: flex; flex-direction: column; gap: 0; }

.timeline-item {
  display: grid;
  grid-template-columns: 160px 32px 1fr;
  gap: 0 var(--sp-4);
  padding: var(--sp-6) 0;
  border-top: 1px solid var(--border);
}

.timeline-item:last-child { border-bottom: 1px solid var(--border); }

#education .timeline-item {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.timeline-left { padding-top: 4px; }

.timeline-period {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

.timeline-line {
  display: flex;
  justify-content: center;
  padding-top: 6px;
  position: relative;
}

.timeline-line::before {
  content: '';
  position: absolute;
  top: 18px; bottom: -24px;
  left: 50%;
  width: 1px;
  background: var(--border);
  transform: translateX(-50%);
}

.timeline-item:last-child .timeline-line::before { display: none; }

.timeline-node {
  width: 9px; height: 9px;
  border-radius: 50%;
  background: var(--indigo);
  box-shadow: 0 0 10px var(--indigo-glow);
  flex-shrink: 0;
}

.timeline-role {
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.timeline-company {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--indigo);
  margin-bottom: var(--sp-3);
}

.timeline-detail {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.65;
}

/* ─────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────── */
.section-contact { padding-bottom: var(--sp-24); }

.contact-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--sp-4);

  padding: var(--sp-8) var(--sp-12);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
}

.contact-inner::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 10% 50%, rgba(108,99,255,0.09) 0%, transparent 60%);
  pointer-events: none;
}

.contact-title {
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 5vw, var(--text-3xl));
  font-weight: 400;
  line-height: 1.1;
  color: var(--text-primary);
  position: relative;
  margin-bottom: var(--sp-6);
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
.footer {
  width: 100%;
  padding: var(--sp-8);
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--text-muted);
}

.footer-inner {
  width: 100%;
  max-width: var(--max-w);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-links { display: flex; gap: var(--sp-6); }
.footer-links a { transition: color 0.2s; }
.footer-links a:hover { color: var(--text-secondary); }

/* ─────────────────────────────────────────────
   FADE-IN ANIMATION
───────────────────────────────────────────── */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.55s var(--ease-out), transform 0.55s var(--ease-out);
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ─────────────────────────────────────────────
   RESPONSIVE
───────────────────────────────────────────── */
@media (max-width: 768px) {
  .nav { padding: 0 var(--sp-4); }
  .nav-links { gap: var(--sp-4); }
  .nav-links a:not(.nav-cta) { display: none; }

  .hero { padding: calc(var(--nav-h) + var(--sp-8)) var(--sp-4) var(--sp-16); }
  .hero-grid-accent { display: none; }

  .section { padding: var(--sp-16) var(--sp-4); }

  .timeline-item { grid-template-columns: 1fr; gap: var(--sp-2); }
  .timeline-left { order: 2; }
  .timeline-line { display: none; }

  .contact-inner { padding: var(--sp-8) var(--sp-6); }

  .footer-inner {
    flex-direction: column;
    gap: var(--sp-4);
    text-align: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fade-in { opacity: 1; transform: none; transition: none; }
  .dot { animation: none; }
  .cursor { opacity: 1 !important; }
  .btn-primary:hover { transform: none; }
}
</style>