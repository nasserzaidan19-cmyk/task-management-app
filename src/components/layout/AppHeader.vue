<script setup lang="ts">
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Sun, Moon } from 'lucide-vue-next'
import { computed } from 'vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useRoute } from 'vue-router'
import { inject } from 'vue'

interface ThemeContext {
  isDark: boolean
  toggleTheme: () => void
}

const route = useRoute()

// --- Theme Management Logic ---
const theme = inject<ThemeContext>('tms-global-theme')
if (!theme) {
  throw new Error('Global theme context not provided')
}
const { isDark, toggleTheme } = theme

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
      <Button variant="ghost" size="icon" @click="toggleTheme" title="Toggle Theme">
        <Sun v-if="isDark" class="h-5 w-5 text-amber-500 transition-all" />
        <Moon v-else class="h-5 w-5 text-slate-700 transition-all" />
        <span class="sr-only">Toggle Theme Mode</span>
      </Button>

      <div class="h-4 w-[1px] bg-slate-200 dark:bg-slate-800"></div>

      <div class="flex items-center gap-2">
        <div
          class="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 flex items-center justify-center cursor-pointer hover:opacity-85 transition-opacity"
        >
          <User class="h-4 w-4 text-slate-500 dark:text-slate-400" />
        </div>
        <span
          class="text-sm font-medium hidden md:inline-block text-slate-700 dark:text-slate-300 select-none"
        >
          User Profile
        </span>
      </div>
    </div>
  </header>
</template>
