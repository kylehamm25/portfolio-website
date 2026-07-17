import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ExperienceDetail from '@/views/ExperienceDetail.vue'
import ProjectDetail from '@/views/ProjectDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/experience/:id',
      name: 'experience-detail',
      component: ExperienceDetail,
      props: true,
    },
    {
      path: '/project/:id',
      name: 'project-detail',
      component: ProjectDetail,
      props: true,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

export default router
