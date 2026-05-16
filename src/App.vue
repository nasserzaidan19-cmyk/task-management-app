<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import HelloWorld from './components/HelloWorld.vue'

const isDev = import.meta.env.DEV
</script>

<template>
  <HelloWorld />
  <VueQueryDevtools v-if="isDev" :initial-is-open="false" position="bottom" />
</template>
<!-- -->
