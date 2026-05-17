import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,

  /**
   * Automates window viewport scrolling on navigation changes.
   */
  scrollBehavior(to, _from, savedPosition) {
    // 1. If the user clicked the browser "Back" or "Forward" button, restore their exact position
    if (savedPosition) {
      return savedPosition
    }

    // 2. If the destination route contains an anchor hash (e.g., /projects/1#settings), smooth-scroll to it
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }

    // 3. For all standard page-to-page transitions, instantly reset the scroll position back to the top-left
    return { top: 0, left: 0 }
  },
})
