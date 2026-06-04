<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForm } from '@tanstack/vue-form'
import { ResetPasswordSchema } from '@/schemas/auth'
import { authClient } from '@/lib/auth-client'
import PasswordField from '@/components/forms/PasswordField.vue'
import { Button } from '@/components/ui/button'
import { Loader2, XCircle } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const token = ref<string | null>(null)
const isTokenInvalid = ref(false)
const submitError = ref<string | null>(null)

onMounted(() => {
  // 🎯 Technical Requirement: Read token from query string
  const queryToken = route.query.token as string
  if (!queryToken) {
    isTokenInvalid.value = true
  } else {
    token.value = queryToken
  }
})

const form = useForm({
  defaultValues: {
    password: '',
    confirmPassword: '',
  },
  validators: { onBlur: ResetPasswordSchema },
  onSubmit: async ({ value }) => {
    if (!token.value) {
      isTokenInvalid.value = true
      return
    }

    submitError.value = null

    const { error } = await authClient.resetPassword({
      newPassword: value.password,
      token: token.value,
    })

    if (error) {
      if (error.code === 'INVALID_TOKEN' || error.code === 'EXPIRED_TOKEN') {
        isTokenInvalid.value = true
      } else {
        submitError.value = error.message ?? 'Failed to reset password.'
      }
      return
    }

    console.log('Password reset successful')

    router.push('/dashboard')
  },
})
</script>

<template>
  <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    <div class="flex flex-col space-y-2 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">Reset password</h1>
      <p class="text-sm text-muted-foreground">Choose a new strong password for your account.</p>
    </div>

    <div
      v-if="isTokenInvalid"
      class="rounded-md bg-destructive/5 border border-destructive/20 p-4 text-center space-y-4"
    >
      <XCircle class="mx-auto h-8 w-8 text-destructive" />
      <div class="space-y-1">
        <h3 class="text-sm font-semibold text-destructive">Invalid or Expired Link</h3>
        <p class="text-xs text-muted-foreground">
          This password reset link has expired or is invalid for security reasons.
        </p>
      </div>
      <Button as-child variant="outline" size="sm" class="w-full">
        <router-link to="/auth/forgot-password"> Request a new link </router-link>
      </Button>
    </div>

    <div v-else class="grid gap-6">
      <div
        v-if="submitError"
        class="p-3 text-sm rounded-md bg-destructive/10 text-destructive border border-destructive/20"
      >
        {{ submitError }}
      </div>

      <form class="space-y-4" @submit.prevent.stop="form.handleSubmit()">
        <PasswordField
          :form="form"
          name="password"
          label="New Password"
          autocomplete="new-password"
        />

        <PasswordField
          :form="form"
          name="confirmPassword"
          label="Confirm New Password"
          autocomplete="new-password"
        />

        <form.Subscribe>
          <template #default="{ canSubmit, isSubmitting }">
            <Button type="submit" class="w-full" :disabled="!canSubmit || isSubmitting">
              <Loader2 v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
              {{ isSubmitting ? 'Resetting password…' : 'Reset password' }}
            </Button>
          </template>
        </form.Subscribe>
      </form>
    </div>
  </div>
</template>
