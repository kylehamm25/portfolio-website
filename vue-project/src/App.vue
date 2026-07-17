<template>
  <AnimatedBackground />

  <!-- Nav -->
  <div class="nav-wrapper">
    <AppCardNoBorder borderRadius="0px" :class="['nav', { 'nav-scrolled': scrolled }]">
      <div class="nav-links">
        <a href="#" @click.prevent="scrollTo('experience')">Experience</a>
        <a href="#" @click.prevent="scrollTo('projects')">Projects</a>
        <a href="#" @click.prevent="scrollTo('skills')">Skills</a>
        <a href="#" @click.prevent="scrollTo('education')">Education</a>
        <a href="#" @click.prevent="scrollTo('contact')">Contact</a>
        <ThemeToggle />
      </div>
    </AppCardNoBorder>
  </div>

  <router-view />
</template>

<script setup lang="ts">
import AppCardNoBorder from '@/components/AppCardNoBorder.vue'
import AnimatedBackground from '@/components/AnimatedBackground.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 40 }
onMounted(() => {
  history.scrollRestoration = 'manual'
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const scrollTo = (id: string) => {
  if (router.currentRoute.value.name === 'home') {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  } else {
    router.push({ path: '/', hash: `#${id}` })
  }
}
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

  --card-bg: rgba(255, 255, 255, 0.01);
  --card-bg-hover: rgba(108, 99, 255, 0.1);
  --card-bg-move: rgba(255, 255, 255, 0.06);
  --card-bg-move-hover: rgba(108, 99, 255, 0.2);
  --card-filter: drop-shadow(-8px -10px 46px #0000005f);
  --card-backdrop-filter: brightness(1.1) blur(2px) url(#displacementFilter);
  --card-box-shadow: inset 0 0 8px 1px rgba(90, 90, 90, 0.1);
  --card-before-shadow-webkit: inset 2px 2px 0px -2px rgba(255, 255, 255, 0.7), inset 0 0 3px 1px rgba(255, 255, 255, 0.7);
  --card-before-shadow: inset 6px 6px 0px -6px rgba(255, 255, 255, 0.2), inset 0 0 8px 1px rgba(255, 255, 255, 0.4);
  --nav-scrolled-bg: rgba(9, 9, 15, 0.8);
  --nav-backdrop-filter: blur(12px);
  --animated-bg-display: block;
  filter: grayscale(1);
}

[data-theme="light"] {
  --bg: #f8f9fa;
  --bg-card: #ffffff;
  --bg-card-hover: #f0f0f5;
  --surface: #e8e8f0;
  --border: rgba(0, 0, 0, 0.08);
  --border-hover: rgba(0, 0, 0, 0.15);
  --text-primary: #1a1a2e;
  --text-secondary: #555577;
  --text-muted: #9999aa;
  --card-bg: #ffffff;
  --card-bg-hover: #f5f5ff;
  --card-bg-move: #ffffff;
  --card-bg-move-hover: #f5f5ff;
  --card-filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.06));
  --card-backdrop-filter: none;
  --card-box-shadow: none;
  --card-before-shadow-webkit: none;
  --card-before-shadow: none;
  --nav-scrolled-bg: rgba(248, 249, 250, 0.95);
  --nav-backdrop-filter: none;
  --animated-bg-display: none;
  filter: none;
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
  transition: background 0.3s ease, color 0.3s ease;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
  background: var(--nav-scrolled-bg);
  backdrop-filter: var(--nav-backdrop-filter);
  -webkit-backdrop-filter: var(--nav-backdrop-filter);
  border-bottom: 1px solid var(--border);
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

.nav-links a { transition: color 0.2s; cursor: pointer; }
.nav-links a:hover { color: var(--text-primary); }

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
}

@media (prefers-reduced-motion: reduce) {
  .fade-in { opacity: 1; transform: none; transition: none; }
}
</style>
