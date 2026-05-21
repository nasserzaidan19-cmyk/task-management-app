<script setup lang="ts">
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

defineProps<{
  name: string
  label: string
  form: any
  rows?: number
  placeholder?: string
  autocomplete?: string
  description?: string
  disabled?: boolean
}>()
</script>

<template>
  <component :is="form.Field" :name="name">
    <template #default="{ field }">
      <div class="flex flex-col gap-1.5">
        <Label :for="name">{{ label }}</Label>
        <p v-if="description" class="text-xs text-muted-foreground">
          {{ description }}
        </p>
        <Textarea
          :id="name"
          :name="field.name"
          :model-value="field.state.value"
          :rows="rows ?? 4"
          :placeholder="placeholder"
          :autocomplete="autocomplete"
          :disabled="disabled"
          @blur="field.handleBlur"
          @input="(e: Event) => field.handleChange((e.target as HTMLTextAreaElement).value)"
        />
        <p v-if="field.state.meta.errors.length" class="text-sm text-destructive">
          {{ field.state.meta.errors[0]?.message ?? field.state.meta.errors[0] }}
        </p>
      </div>
    </template>
  </component>
</template>
