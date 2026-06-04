<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { RouterView, useRouter } from 'vue-router'
import { useTheme } from './composables/useTheme'
import { onMounted, onUnmounted, provide } from 'vue'
import { queryClient } from './lib/queryClient'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'

const isDev = import.meta.env.DEV
const router = useRouter()

const themeEngine = useTheme()

provide('tms-global-theme', themeEngine)

function handleSessionExpiry() {
  queryClient.clear()

  // we need to add a toast here in the future
  const currentPath = router.currentRoute.value.fullPath
  router.push({
    path: '/auth/login',
    query: {
      redirect: currentPath,
    },
  })
}
onMounted(() => {
  window.addEventListener('auth:expired', handleSessionExpiry)
})

onUnmounted(() => {
  // Clean up global listeners when component unmounts
  window.removeEventListener('auth:expired', handleSessionExpiry)
})
</script>

<template>
  <ConfirmDialog />
  <RouterView></RouterView>
  <VueQueryDevtools v-if="isDev" :initial-is-open="false" position="bottom" />
</template>
<!-- -->
