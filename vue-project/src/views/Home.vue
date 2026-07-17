<template>
  <!-- Hero -->
  <section class="hero">
    <div class="hero-content">
      <h1 class="hero-headline">
        Kyle Hammond
        <span class="cursor" :style="{ opacity: tick ? 1 : 0 }">_</span>
      </h1>
      <p class="hero-sub">
        Computer Science graduate from the University of Maryland, Baltimore County. I'm passionate about full-stack development, cloud technologies, and solving problems real-world problems with software.
      </p>

      <div class="hero-meta">
        <a href="mailto:kylehamm25@gmail.com" class="meta-link">kylehamm25@gmail.com</a>
        <span class="sep">·</span>
        <a href="https://github.com/kylehamm25" target="_blank" rel="noopener noreferrer" class="meta-link">GitHub</a>
        <span class="sep">·</span>
        <a href="https://www.linkedin.com/in/kyle-hammond-85902b395/" target="_blank" rel="noopener noreferrer" class="meta-link">LinkedIn</a>
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
    <div class="project-details-section" style="margin-top: var(--sp-12)">
      <FadeIn
        v-for="(job, i) in EXPERIENCE"
        :key="job.company"
        :delay="i * 80"
      >
        <AppCardNoBorder marginBottom class="project-detail-card">
          <h3 class="project-title" style="margin-bottom: var(--sp-2)">{{ job.role }}</h3>
          <p class="project-subtitle">{{ job.company }} — {{ job.location }}</p>
          <div class="timeline-left">
            <span class="timeline-period">{{ job.period }}</span>
          </div>
          <ul class="detail-list">
            <li v-for="(d, j) in job.details" :key="j" class="detail-item">
              <span class="detail-bullet">▸</span> {{ d }}
            </li>
          </ul>
          <div class="project-actions">
            <router-link v-if="job.id" :to="`/experience/${job.id}`" class="project-review-link">More Info</router-link>
            <a v-if="job.website" :href="job.website" target="_blank" rel="noopener noreferrer" class="project-review-link">Website</a>            
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
        <AppCardNoBorder marginBottom class="project-detail-card">
          <h3 class="project-title" style="margin-bottom: var(--sp-2)">{{ proj.title }}</h3>
          <p class="project-subtitle">{{ proj.subtitle }}</p>
          <div class="timeline-left">
            <span class="timeline-period">{{ proj.period }}</span>
          </div>
          <ul class="detail-list">
            <li v-for="(d, j) in proj.details" :key="j" class="detail-item">
              <span class="detail-bullet">▸</span> {{ d }}
            </li>
          </ul>
          <div class="project-actions">
            <router-link v-if="proj.id" :to="`/project/${proj.id}`" class="project-review-link">More Info</router-link>
            <a v-else-if="proj.review" :href="proj.review" target="_blank" rel="noopener noreferrer" class="project-review-link">More Info</a>
          </div>
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
        <div class="timeline-left">
          <span class="timeline-period">Aug. 2021 — May 2026</span>
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
            href="https://www.linkedin.com/in/kyle-hammond-85902b395/"
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
</template>

<script setup lang="ts">
import AppCardNoBorder from '@/components/AppCardNoBorder.vue'
import FadeIn from '@/components/FadeIn.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const EXPERIENCE = [
  {
    id: 'salon-t',
    role: 'Full-Stack Software Developer (Contract)',
    company: 'Salon T',
    location: 'Gaithersburg, MD',
    period: 'Jan. 2026 — Present',
    website: 'https://www.beautysalont.com',
    details: [
      'Sole developer of a full salon management platform (Next.js, AWS Lambda, DynamoDB) supporting daily operations for a multi-employee business, handling hundreds of bookings monthly',
      'Eliminated double-booking across all staff calendars by building a real-time scheduling engine with automated conflict detection, processing hundreds of appointments monthly',
      'Automated payroll reporting for 10+ employees, aggregating revenue, tips, and product sales, applying commission calculations, and generating bi-weekly CSV exports',
      'Designed DynamoDB schemas and REST APIs to reliably manage thousands of records across appointments, customers, payroll, and inventory',
      'Built an OAuth2-secured admin dashboard with RBAC, enabling owners and staff to manage schedules, bulk operations, and multi-employee bookings through a purpose-built interface',
    ],
  },
]

const SKILL_GROUPS = [
  { label: 'Languages',     items: ['Java', 'Python', 'JavaScript', 'C++', 'SQL', 'TypeScript'] },
  { label: 'Frontend',      items: ['React', 'React Native', 'Next.js', 'Expo', 'Vercel'] },
  { label: 'Backend',       items: ['Node.js', 'REST APIs', 'AWS Lambda', 'API Gateway', 'OAuth 2.0'] },
  { label: 'Databases',     items: ['PostgreSQL', 'DynamoDB', 'Supabase'] },
  { label: 'Cloud & Tools', items: ['AWS', 'Vercel', 'Git', 'GitHub'] },
]

const PROJECT_DETAILS = [
  {
    id: 'inventory-system',
    title: 'Industry-Sponsored Inventory System',
    subtitle: 'React Native, TypeScript, Supabase',
    period: 'Jan. 2026 – May 2026',
    details: [
      'Delivered a production mobile app (React Native) for an HVAC/MEP contractor, giving field and warehouse teams real-time visibility into material inventory across multiple locations',
      'Designed role-based workflows for material requests, inventory transfers, delivery confirmation, and approval management',
      'Cut manual data entry by integrating Gemini OCR to parse packing slips and purchase orders directly into structured inventory records',
      'Built a Supabase/PostgreSQL backend handling real-time sync, auth, and full-text search across thousands of inventory records at multiple sites',
    ],
  },

  {
    title: 'eBay Data Analysis & Automation',
    subtitle: 'Python, Chrome Extension, eBay APIs',
    period: 'June 2023 – Present',
    review: 'https://github.com/kylehamm25/ebaypricer',
    details: [
      'Wrote a Python script that pulls sold orders from the Trading API, combines them with fee data from the Finances API, and formats the data into an Excel sheet for profit tracking',
      'Built a pricing model that checks the Browse API for current competitive prices and automatically adjusts my listing prices, allowing for market price accuracy and visibility over 100s of listings',
      'Built a Chrome extension (Manifest V3) that pre-fills eBay listing forms, cutting listing creation time by an estimated 80%',
    ],
  },
]

const tick = ref(true)
let tickTimer: ReturnType<typeof setInterval>
onMounted(() => { tickTimer = setInterval(() => { tick.value = !tick.value }, 530) })
onBeforeUnmount(() => clearInterval(tickTimer))
</script>

<style>
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

.hero-content {
  position: relative;
  max-width: var(--max-w);
  margin: 0 auto;
  width: 100%;
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

.hero-sub {
  max-width: 560px;
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: 1.7;
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

.hero-cta {
  display: flex;
  gap: var(--sp-4);
  flex-wrap: nowrap;
  margin-bottom: var(--sp-8);
}

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
  width: 100%;
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
  margin-bottom: var(--sp-2);
}

.project-actions {
  display: flex;
  gap: var(--sp-4);
  margin-top: var(--sp-4);
}

.project-review-link {
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  transition: color 0.2s;
}
.project-review-link:hover { color: var(--indigo); }

/* ─────────────────────────────────────────────
   DETAIL LIST
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
  gap: var(--sp-6);
}

.skills-grid > * {
  height: 100%;
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
   RESPONSIVE
───────────────────────────────────────────── */
@media (max-width: 768px) {
  .hero { padding: calc(var(--nav-h) + var(--sp-8)) var(--sp-4) var(--sp-16); }
  .hero-grid-accent { display: none; }
  .section { padding: var(--sp-16) var(--sp-4); }
  .timeline-item { grid-template-columns: 1fr; gap: var(--sp-2); }
  .timeline-left { order: 2; }
  .timeline-line { display: none; }
  .contact-inner { padding: var(--sp-8) var(--sp-6); }
}
</style>
