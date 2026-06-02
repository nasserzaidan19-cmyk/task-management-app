<script setup lang="ts">
import { SidebarTrigger } from '@/components/ui/sidebar'
import { computed } from 'vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import LoadingSkeleton from '@/components/common/LoadingSkeleton.vue'

import { useRoute } from 'vue-router'
import ThemeToggle from '../common/ThemeToggle.vue'
import UserMenu from '../common/UserMenu.vue'
import { useAuth } from '@/composables/useAuth.ts'

const { user, isPending } = useAuth()
const route = useRoute()
const userName = computed(() => user.value?.name || 'user')

// Generates a breadcrumb array computed dynamically from the active matching routes
const breadcrumbs = computed(() => {
  const matched = route.matched.filter((r) => r.meta && r.meta.title)
  return matched.map((r) => ({
    name: r.meta.title as string,
    path: r.path,
    // Safely parse routing parameters if visiting a dynamic path like /projects/:id
    to: r.path.includes(':id') ? route.path : r.path,
  }))
})
</script>
<template>
  <header
    class="flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border bg-sidebar px-4 text-sidebar-foreground md:px-6"
  >
    <!-- Left Header Actions: Toggle-->
    <div class="flex items-center gap-4">
      <SidebarTrigger />
      <div class="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
      <Breadcrumb>
        <BreadcrumbList v-for="crumb in breadcrumbs" :key="crumb.path">
          <BreadcrumbItem>
            <BreadcrumbLink :href="crumb.to"> {{ crumb.name }} </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>
    </div>

    <div class="flex items-center gap-4">
      <!-- Theme Mode Toggle Button Switcher -->

      <ThemeToggle />

      <div class="h-4 w-[1px] bg-slate-200 dark:bg-slate-800"></div>
      <LoadingSkeleton v-if="isPending" variant="list" :rows="1" />

      <div v-if="!isPending" class="flex items-center gap-2">
        <UserMenu />
        <span
          class="text-sm font-medium hidden md:inline-block text-slate-700 dark:text-slate-300 select-none"
        >
          {{ userName }}
        </span>
      </div>
    </div>
  </header>
</template>
