<script setup lang="ts">
import LoginForm from '@/components/features/auth/LoginForm.vue'
import OAuthButtons from '@/components/features/auth/OAuthButtons.vue'
</script>
<template>
  <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    <div class="flex flex-col space-y-2 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">Welcome back</h1>
      <p class="text-sm text-muted-foreground">Enter your details to open your account.</p>
    </div>

    <OAuthButtons />

    <LoginForm />
  </div>
</template>
