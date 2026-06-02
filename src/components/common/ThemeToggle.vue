<script setup lang="ts">
import Button from '../ui/button/Button.vue'
import { Sun, Moon } from 'lucide-vue-next'

import { inject } from 'vue'

interface ThemeContext {
  isDark: boolean
  toggleTheme: () => void
}
const theme = inject<ThemeContext>('tms-global-theme')
if (!theme) {
  throw new Error('Global theme context not provided')
}
const { isDark, toggleTheme } = theme
</script>
<template>
  <Button variant="ghost" size="icon" @click="toggleTheme" title="Toggle Theme">
    <Sun v-if="isDark" class="h-5 w-5 text-amber-500 transition-all" />
    <Moon v-else class="h-5 w-5 text-slate-700 transition-all" />
    <span class="sr-only">Toggle Theme Mode</span>
  </Button>
</template>
