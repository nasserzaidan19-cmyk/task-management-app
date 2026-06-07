<script setup lang="ts">
import SignupForm from '@/components/features/auth/SignupForm.vue'
import OAuthButtons from '@/components/features/auth/OAuthButtons.vue'
</script>
<template>
  <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    <div class="flex flex-col space-y-2 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
      <p class="text-sm text-muted-foreground">Get started with your tracking space today.</p>
    </div>

    <OAuthButtons />

    <SignupForm />
  </div>
</template>
