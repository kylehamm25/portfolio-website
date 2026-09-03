<template>
  <section class="hero">
    <div class="shell">
      <TerminalWindow path="kyle@portfolio ~" body-padding="0" movable>
        <TerminalHero :auto-command="autoCommand" @spawn="spawnWindow" />
      </TerminalWindow>

      <!-- extra windows opened via the `new` command — fully removed (not
           ghosted) on close, since the same command reopens one anytime.
           Positioned absolutely, cascaded slightly from the top of .shell
           (the original window's top edge) so a spawned window always
           lands at the same vertical level as the original and stays in
           view, instead of stacking below the fold like a normal flex item. -->
      <div
        v-for="(win, i) in extraWindows"
        :key="win.id"
        class="extra-window"
        :style="{ top: `${i * 28}px`, left: `${i * 28}px` }"
      >
        <TerminalWindow
          :path="`kyle@portfolio ~ (${win.id})`"
          body-padding="0"
          movable
          @close="removeWindow(win.id)"
        >
          <TerminalHero @spawn="spawnWindow" />
        </TerminalWindow>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import TerminalWindow from '@/components/TerminalWindow.vue'
import TerminalHero from '@/components/TerminalHero.vue'

const route = useRoute()

// deep links to /project/:id no longer open a tab — there isn't one anymore
// — they just queue the matching `cat` command to run right after the boot
// sequence, so the shared link still lands on the right printed output
const autoCommand = computed(() => {
  const id = route.params.id
  if (route.name === 'project-detail' && id) return `cat projects/${id}`
  return undefined
})

// typing `new` in any terminal spawns another independent, draggable one
let nextWinId = 2
const extraWindows = ref<{ id: number }[]>([])

function spawnWindow() {
  extraWindows.value.push({ id: nextWinId++ })
}

function removeWindow(id: number) {
  extraWindows.value = extraWindows.value.filter((w) => w.id !== id)
}
</script>

<style scoped>
.shell {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--sp-6);
  width: 100%;
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 var(--sp-8);
}

/* extra windows opened via `new` — taken out of flow so they don't push
   the page taller, and anchored to .shell's top edge (same as the
   original window) rather than appended below it */
.extra-window {
  position: absolute;
  right: var(--sp-8);
  left: var(--sp-8);
  z-index: 50;
}

.hero {
  display: flex;
  align-items: center;
  min-height: 100svh;
  padding: var(--sp-8) 0;
}

@media (max-width: 640px) {
  .shell { padding: 0 var(--sp-4); }
}
</style>
