<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { RouterView } from 'vue-router'
import { useTheme } from './composables/useTheme'
import { provide } from 'vue'

const isDev = import.meta.env.DEV

const themeEngine = useTheme()

provide('tms-global-theme', themeEngine)
</script>

<template>
  <RouterView></RouterView>
  <VueQueryDevtools v-if="isDev" :initial-is-open="false" position="bottom" />
</template>
<!-- -->
