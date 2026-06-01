import type { NavigationGuard } from 'vue-router'
import { authClient } from '@/lib/auth-client'

export const requireAuth: NavigationGuard = async (to) => {
  const { data } = await authClient.getSession()
  if (!data) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
}

export const redirectIfAuthed: NavigationGuard = async () => {
  const { data } = await authClient.getSession()
  if (data) return { name: 'dashboard' }
}
