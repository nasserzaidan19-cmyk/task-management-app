<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

const isDev = import.meta.env.DEV
</script>

<template>
  <RouterView></RouterView>
  <VueQueryDevtools v-if="isDev" :initial-is-open="false" position="bottom" />
</template>
<!-- -->
