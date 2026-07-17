<template>
  <div ref="el" :class="['fade-in', visible ? 'visible' : '']" :style="{ transitionDelay: `${delay}ms` }">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{ delay?: number }>(), { delay: 0 })
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
</script>
