<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useForm } from '@tanstack/vue-form'
import { useQueryClient } from '@tanstack/vue-query'
import { LoginSchema } from '@/schemas/auth'
import { ref } from 'vue'
import { authClient } from '@/lib/auth-client'
import TextField from '@/components/forms/TextField.vue'
import PasswordField from '@/components/forms/PasswordField.vue'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-vue-next'
import { useDeleteTag, useTagsQuery } from '@/composables/queries/useTags'

const router = useRouter()
const route = useRoute()
const queryClient = useQueryClient()
const submitError = ref<string | null>()
const form = useForm({
  defaultValues: {
    email: '',
    password: '',
  },
  validators: { onBlur: LoginSchema },
  onSubmit: async ({ value }) => {
    submitError.value = null
    const { error } = await authClient.signIn.email({
      email: value.email,
      password: value.password,
    })
    if (error) {
      submitError.value = error.message ?? 'Invalid credentials'
      return
    }
    await queryClient.invalidateQueries()
    // will add a toast
    const redirect = (route.query.redirect as string) || '/dashboard'
    router.push(redirect)
  },
})

const test = useTagsQuery()
const deleteTag = useDeleteTag()
deleteTag.mutate('36ff626a-a12e-4c2f-90eb-8f3d33487d10')
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
      <TextField :form="form" name="email" label="Email" type="email" autocomplete="email" />
      <PasswordField
        :form="form"
        name="password"
        label="Password"
        autocomplete="current-password"
      />
      <div class="flex justify-end">
        <router-link
          to="/auth/forgot-password"
          class="text-xs font-medium text-primary hover:underline"
        >
          Forgot password?
        </router-link>
      </div>
      <form.Subscribe>
        <template #default="{ canSubmit, isSubmitting }">
          <Button type="submit" class="w-full" :disabled="!canSubmit || isSubmitting">
            <Loader2 v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
            {{ isSubmitting ? 'Signing in…' : 'Sign in' }}
          </Button>
        </template>
      </form.Subscribe>

      <p class="text-center text-sm text-muted-foreground">
        Don't have an account?
        <router-link to="/auth/signup" class="font-medium text-primary hover:underline">
          Sign up
        </router-link>
      </p>
    </form>
  </div>
</template>
