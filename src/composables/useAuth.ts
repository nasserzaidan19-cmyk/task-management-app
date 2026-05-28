import { computed } from 'vue'
import { signIn, useSession, signOut } from '@/lib/auth-client'

export function useAuth() {
  const sessionState = useSession()

  const user = computed(() => sessionState.value?.data?.user ?? null)

  const session = computed(() => sessionState.value?.data?.session ?? null)

  const isAuthenticated = computed(() => !!sessionState.value?.data)

  const isPending = computed(() => sessionState.value?.isPending ?? false)

  return {
    user,
    session,
    isAuthenticated,
    isPending,
    signIn,
    signOut,
  }
}
