<template>
  <main class="page">
    <router-view />
  </main>
</template>

<style>
/* ═════════════════════════════════════════════════════════
   TOKENS — terminal palette
   ═════════════════════════════════════════════════════════ */
:root {
  --bg:            #000000;
  --bg-deep:       #000000;
  --panel:         rgba(20, 20, 20, 0.55);
  --panel-solid:   #121212;
  --panel-head:    rgba(255, 255, 255, 0.045);

  --green:         #e8e8e8;
  --green-dim:     #7a7a7a;
  --green-faint:   rgba(255, 255, 255, 0.1);
  --green-glow:    rgba(255, 255, 255, 0.3);

  --cmd-accent:    #64d8e0;

  --text-primary:   #d4d4d4;
  --text-secondary: #a0a0a0;
  --text-muted:     #6b6b6b;

  --border:       rgba(255, 255, 255, 0.12);
  --border-hover: rgba(255, 255, 255, 0.3);

  --dot-red:    #ff5f57;
  --dot-yellow: #febc2e;
  --dot-green:  #28c840;

  --font-mono:    'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  --font-display: 'Syne', 'JetBrains Mono', sans-serif;

  --text-xs:   0.72rem;
  --text-sm:   0.82rem;
  --text-base: 0.92rem;
  --text-lg:   1.05rem;
  --text-xl:   1.35rem;
  --text-2xl:  2rem;
  --text-3xl:  3rem;

  --sp-1:  0.25rem;  --sp-2:  0.5rem;   --sp-3:  0.75rem;
  --sp-4:  1rem;     --sp-6:  1.5rem;   --sp-8:  2rem;
  --sp-12: 3rem;     --sp-16: 4rem;     --sp-24: 6rem;

  --radius:    6px;
  --radius-lg: 10px;
  --max-w:     980px;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}

[data-theme="light"] {
  --bg:          #f3f3f2;
  --bg-deep:     #e5e5e3;
  --panel:       rgba(255, 255, 255, 0.72);
  --panel-solid: #ffffff;
  --panel-head:  rgba(0, 0, 0, 0.04);

  --green:       #262626;
  --green-dim:   #7d7d7d;
  --green-faint: rgba(0, 0, 0, 0.07);
  --green-glow:  rgba(0, 0, 0, 0.22);

  --cmd-accent:  #0f7a86;

  --text-primary:   #1e1e1e;
  --text-secondary: #565656;
  --text-muted:     #7d7d7d;

  --border:       rgba(0, 0, 0, 0.14);
  --border-hover: rgba(0, 0, 0, 0.32);
}

/* ═════════════════════════════════════════════════════════
   RESET & BASE
   ═════════════════════════════════════════════════════════ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  min-height: 100vh;
  background: var(--bg);
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-size: var(--text-base);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  transition: background 0.3s ease, color 0.3s ease;
}

#app { display: flex; flex-direction: column; min-height: 100vh; }

a { color: inherit; text-decoration: none; -webkit-tap-highlight-color: transparent; }

::selection { background: var(--green-faint); color: var(--green); }

::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: var(--bg-deep); }
::-webkit-scrollbar-thumb { background: var(--green-faint); border-radius: 6px; }
::-webkit-scrollbar-thumb:hover { background: var(--border-hover); }

.page {
  position: relative;
  z-index: 2;
  flex: 1;
}

/* ═════════════════════════════════════════════════════════
   SHARED PRIMITIVES
   ═════════════════════════════════════════════════════════ */
.display-title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(2.25rem, 7vw, 4.25rem);
  line-height: 0.95;
  letter-spacing: -0.03em;
  color: var(--text-primary);
}

.comment { color: var(--text-muted); font-size: var(--text-sm); }
.comment::before { content: '// '; opacity: 0.7; }

.chip {
  display: inline-block;
  padding: 3px var(--sp-3);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: var(--text-xs);
  color: var(--text-secondary);
  background: var(--panel);
  transition: border-color 0.18s, color 0.18s;
}
.chip:hover { border-color: var(--border-hover); color: var(--green); }

.btn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-2) var(--sp-4);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--panel);
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: border-color 0.18s, color 0.18s, background 0.18s;
}
.btn:hover { border-color: var(--border-hover); color: var(--green); background: var(--green-faint); }

.btn-solid { border-color: var(--green); color: var(--green); background: var(--green-faint); }
.btn-solid:hover { background: var(--green); color: var(--bg); }

.link-u {
  color: var(--text-secondary);
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 3px;
  transition: color 0.18s;
}
.link-u:hover { color: var(--green); }

/* ═════════════════════════════════════════════════════════
   FADE-IN
   ═════════════════════════════════════════════════════════ */
.fade-in {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out);
}
.fade-in.visible { opacity: 1; transform: none; }

/* ═════════════════════════════════════════════════════════
   RESPONSIVE
   ═════════════════════════════════════════════════════════ */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .fade-in { opacity: 1; transform: none; transition: none; }
}
</style>
