<script setup lang="ts">
import type { Component } from 'vue'

withDefaults(
  defineProps<{
    icon?: Component
    title: string
    description?: string
  }>(),
  {}
)
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center">
    <!-- Icon -->
    <div
      v-if="icon || $slots.icon"
      class="flex items-center justify-center w-14 h-14 rounded-full bg-muted text-muted-foreground"
    >
      <slot name="icon">
        <component :is="icon" class="w-6 h-6" />
      </slot>
    </div>

    <!-- Text -->
    <div class="flex flex-col gap-1.5 max-w-sm">
      <h3 class="text-base font-semibold text-foreground">{{ title }}</h3>
      <p v-if="description" class="text-sm text-muted-foreground leading-relaxed">
        {{ description }}
      </p>
    </div>

    <div v-if="$slots.action" class="mt-1">
      <slot name="action" />
    </div>
  </div>
</template>
