<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'

withDefaults(
  defineProps<{
    variant?: 'list' | 'card' | 'table' | 'kanban'
    rows?: number
    columns?: number
    cards?: number
  }>(),
  {
    variant: 'list',
    rows: 5,
    columns: 4,
    cards: 3,
  }
)
</script>

<template>
  <!-- LIST -->
  <div v-if="variant === 'list'" class="flex flex-col gap-3">
    <div v-for="i in rows" :key="i" class="flex items-center gap-3 p-3 rounded-lg border bg-card">
      <Skeleton class="h-9 w-9 rounded-full shrink-0" />
      <div class="flex flex-col gap-1.5 flex-1">
        <Skeleton class="h-4" :style="`width: ${55 + (i % 3) * 15}%`" />
        <Skeleton class="h-3 w-2/5" />
      </div>
      <Skeleton class="h-6 w-16 rounded-full shrink-0" />
    </div>
  </div>

  <!--  CARD GRID -->
  <div v-else-if="variant === 'card'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <div v-for="i in cards" :key="i" class="flex flex-col gap-3 p-4 rounded-xl border bg-card">
      <div class="flex items-start justify-between">
        <Skeleton class="h-5 w-3/5" />
        <Skeleton class="h-5 w-14 rounded-full" />
      </div>
      <Skeleton class="h-3 w-full" />
      <Skeleton class="h-3 w-4/5" />
      <Skeleton class="h-3 w-3/5" />
      <div class="flex items-center justify-between pt-1">
        <div class="flex -space-x-2">
          <Skeleton v-for="j in 3" :key="j" class="h-7 w-7 rounded-full ring-2 ring-background" />
        </div>
        <Skeleton class="h-3 w-16" />
      </div>
    </div>
  </div>

  <!--  TABLE  -->
  <div v-else-if="variant === 'table'" class="rounded-md border overflow-hidden">
    <!-- Header -->
    <div class="flex gap-4 px-4 py-3 bg-muted/50 border-b">
      <Skeleton v-for="c in columns" :key="c" class="h-4" :style="`flex: ${c === 1 ? 2 : 1}`" />
    </div>
    <!-- Rows -->
    <div v-for="i in rows" :key="i" class="flex gap-4 px-4 py-3 border-b last:border-0">
      <Skeleton
        v-for="c in columns"
        :key="c"
        class="h-4"
        :style="`flex: ${c === 1 ? 2 : 1}; width: ${70 + ((i + c) % 25)}%`"
      />
    </div>
  </div>

  <!--  KANBAN  -->
  <div v-else-if="variant === 'kanban'" class="flex gap-4 overflow-x-auto">
    <div v-for="col in cards" :key="col" class="flex flex-col gap-3 w-64 shrink-0">
      <!-- Column header -->
      <div class="flex items-center gap-2">
        <Skeleton class="h-4 w-24" />
        <Skeleton class="h-5 w-6 rounded-full" />
      </div>
      <!-- Cards -->
      <div v-for="i in rows" :key="i" class="flex flex-col gap-2.5 p-3 rounded-lg border bg-card">
        <Skeleton class="h-4" :style="`width: ${60 + ((i * col) % 35)}%`" />
        <Skeleton class="h-3 w-full" />
        <Skeleton class="h-3 w-3/4" />
        <div class="flex items-center justify-between pt-0.5">
          <Skeleton class="h-5 w-14 rounded-full" />
          <Skeleton class="h-6 w-6 rounded-full" />
        </div>
      </div>
    </div>
  </div>
</template>
