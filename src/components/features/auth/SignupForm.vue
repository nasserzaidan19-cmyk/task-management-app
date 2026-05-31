<script setup lang="ts">
import PasswordField from '@/components/forms/PasswordField.vue'
import TextField from '@/components/forms/TextField.vue'
import { useForm } from '@tanstack/vue-form'
import { RegisterSchema } from '@/schemas/auth'
import Button from '@/components/ui/button/Button.vue'
import { Loader2 } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'
import { authClient } from '@/lib/auth-client'
import { ref } from 'vue'

const router = useRouter()
const route = useRoute()
const submitError = ref<string | null>()
const form = useForm({
  defaultValues: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  validators: {
    onBlur: RegisterSchema,
  },
  onSubmit: async ({ value }) => {
    submitError.value = null
    const { error } = await authClient.signUp.email({
      email: value.email,
      password: value.password,
      name: value.name,
    })
    if (error) {
      submitError.value = error.message ?? 'Invalid credentials'
      console.log(error)
      return
    }
    const redirect = (route.query.redirect as string) || '/dashboard'
    router.push(redirect)
  },
})
</script>
<template>
  <div class="space-y-4">
    <div
      v-if="submitError"
      class="p-3 text-sm font-medium rounded-md bg-destructive/10 text-destructive border border-destructive/20 text-center"
    >
      {{ submitError }}
    </div>
    <form class="space-y-4" @submit.prevent.stop="form.handleSubmit()">
      <TextField :form="form" name="name" label="User Name" type="text" autocomplete="user-name" />
      <TextField :form="form" name="email" label="Email" type="email" autocomplete="email" />
      <PasswordField :form="form" name="password" label="Password" autocomplete="password" />
      <PasswordField
        :form="form"
        name="confirmPassword"
        label="Confirm Password"
        autocomplete="confirm-password"
      />
      <form.Subscribe>
        <template #default="{ canSubmit, isSubmitting }">
          <Button type="submit" class="w-full" :disabled="!canSubmit || isSubmitting">
            <Loader2 v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
            {{ isSubmitting ? 'Signing in…' : 'Sign in' }}
          </Button>
        </template>
      </form.Subscribe>
      <p class="text-center text-sm text-muted-foreground">
        Already have an account?
        <router-link to="/auth/login" class="font-medium text-primary hover:underline">
          Log in
        </router-link>
      </p>
    </form>
  </div>
</template>
