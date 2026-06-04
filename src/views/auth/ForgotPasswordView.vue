<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { ForgotPasswordSchema } from '@/schemas/auth'
import { useForm } from '@tanstack/vue-form'
import { ref } from 'vue'
import TextField from '@/components/forms/TextField.vue'
import { Button } from '@/components/ui/button'
import { Loader2, MailCheck } from 'lucide-vue-next'

const isSubmitted = ref(false)
const submitError = ref<string | null>()
const { requestPasswordReset } = useAuth()

const form = useForm({
  defaultValues: {
    email: '',
  },
  validators: {
    onBlur: ForgotPasswordSchema,
  },
  onSubmit: async ({ value }) => {
    submitError.value = null
    try {
      await requestPasswordReset({
        email: value.email,
      })
      isSubmitted.value = true
    } catch (error: any) {
      submitError.value = error.message ?? 'An error occurred. Please try again.'
    }
  },
})
</script>
<template>
  <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    <div class="flex flex-col space-y-2 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">Forgot password?</h1>
      <p class="text-sm text-muted-foreground">
        Enter your email address and we'll send you a recovery link.
      </p>
    </div>

    <div v-if="isSubmitted" class="rounded-md bg-muted p-4 text-center space-y-3 border">
      <MailCheck class="mx-auto h-8 w-8 text-primary" />
      <p class="text-sm font-medium">
        If an account exists, check your email for a password reset link.
      </p>
      <router-link to="/auth/login" class="text-xs text-primary hover:underline block mt-2">
        Back to log in
      </router-link>
    </div>

    <div v-else class="grid gap-6">
      <div
        v-if="submitError"
        class="p-3 text-sm rounded-md bg-destructive/10 text-destructive border border-destructive/20"
      >
        {{ submitError }}
      </div>

      <form class="space-y-4" @submit.prevent.stop="form.handleSubmit()">
        <TextField
          :form="form"
          name="email"
          label="Email address"
          type="email"
          placeholder="name@example.com"
          autocomplete="email"
        />

        <form.Subscribe>
          <template #default="{ canSubmit, isSubmitting }">
            <Button type="submit" class="w-full" :disabled="!canSubmit || isSubmitting">
              <Loader2 v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
              {{ isSubmitting ? 'Sending link…' : 'Send reset link' }}
            </Button>
          </template>
        </form.Subscribe>
      </form>

      <p class="text-center text-xs text-muted-foreground">
        Remember your password?
        <router-link to="/auth/login" class="font-medium text-primary hover:underline">
          Log in
        </router-link>
      </p>
    </div>
  </div>
</template>
