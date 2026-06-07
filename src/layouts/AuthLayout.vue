<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
</script>

<template>
  <div
    class="flex min-h-screen w-screen items-center justify-center bg-sidebar px-4 py-12 text-sidebar-foreground transition-colors duration-300 sm:px-6 lg:px-8"
  >
    <Card
      class="w-full max-w-md border-sidebar-border bg-sidebar text-sidebar-foreground shadow-md dark:bg-slate-900/50 backdrop-blur-sm"
    >
      <!-- Card Header holding application branding elements -->
      <CardHeader class="space-y-1 text-center select-none">
        <CardTitle class="text-2xl font-bold tracking-tight text-sidebar-foreground">
          TMS Portal
        </CardTitle>
        <CardDescription class="text-xs text-sidebar-foreground/60">
          Task Management System Infrastructure
        </CardDescription>
      </CardHeader>

      <!-- Card Content viewport where child routes (Login, Signup Forms) mount -->
      <CardContent class="w-full">
        <RouterView />
      </CardContent>
    </Card>
  </div>
</template>
