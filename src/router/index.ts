import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { redirectIfAuthed, requireAuth } from './guards'
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0, left: 0 }
  },
})
const AUTH_ONLY_ROUTES = new Set(['login', 'signup', 'forgot-password'])

router.beforeEach(async (to) => {
  if (AUTH_ONLY_ROUTES.has(to.name as string)) {
    return redirectIfAuthed(to, router.currentRoute.value, () => {})
  }
  if (to.meta.requiresAuth) {
    return requireAuth(to, router.currentRoute.value, () => {})
  }
})
