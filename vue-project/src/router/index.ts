import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

// Both routes render the same view: Home.vue is the single tabbed
// terminal, and it reads the route itself to decide which tab is active.
// Using one component instance across routes (rather than lazy-loaded
// per-route components) means switching to /project/:id doesn't remount
// the terminal or replay its boot animation.
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/project/:id', name: 'project-detail', component: Home },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
