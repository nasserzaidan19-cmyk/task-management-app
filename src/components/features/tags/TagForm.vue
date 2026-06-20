<script setup lang="ts">
import { useCreateTag } from '@/composables/queries/useTags'
import { Button } from '@/components/ui/button'
import { Loader2, Plus } from 'lucide-vue-next'
import { Label } from '@/components/ui/label'
import { useForm } from '@tanstack/vue-form'
import TextField from '@/components/forms/TextField.vue'
import { CreateTagSchema } from '@/schemas/tag'

const { mutateAsync, isPending } = useCreateTag()

const form = useForm({
  defaultValues: {
    name: '',
    color: '#3b82f6',
  },
  validators: { onBlur: CreateTagSchema },
  onSubmit: async ({ value }) => {
    try {
      await mutateAsync({
        name: value.name.trim(),
        color: value.color,
      })
      form.reset()
    } catch (error) {
      console.error('Faild to create tag', error)
    }
  },
})
</script>
<template>
  <form
    @submit.prevent="form.handleSubmit"
    class="flex flex-wrap items-start gap-2 p-4 border rounded-xl bg-card max-w-xl"
  >
    <div class="flex-1 min-w-[200px]">
      <TextField
        name="name"
        label="Tag name"
        :form="form"
        placeholder="Tag name (e.g., Frontend, Bug)"
        class="text-amber-900"
        :disabled="isPending"
      />
    </div>

    <form.Field name="color" v-slot="{ field }">
      <div class="flex flex-col gap-1.5 justify-between">
        <Label :for="field.name">Color</Label>
        <input
          :id="field.name"
          :value="field.state.value"
          @input="(e: any) => field.handleChange(e.target.value)"
          type="color"
          class="h-10 w-9 cursor-pointer bg-transparent p-0"
        />
      </div>
    </form.Field>

    <Button type="submit" :disabled="isPending" class="mt-5 ml-4">
      <Loader2 v-if="isPending" class="mr-2 h-4 w-4 animate-spin" />
      <Plus v-else class="mr-2 h-4 w-4" />
      Add Tag
    </Button>
  </form>
</template>
