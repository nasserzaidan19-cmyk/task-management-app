<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

defineProps<{
  name: string
  label: string
  form: any
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
        <div class="flex items-center gap-2">
          <Checkbox
            :id="name"
            :model-value="field.state.value"
            @update:model-value="(val) => field.handleChange(val)"
            @blur="field.handleBlur"
            :disabled="disabled"
          />
          <div class="grid gap-1.5 leading-none">
            <Label
              :for="name"
              class="cursor-pointer font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {{ label }}
            </Label>

            <p v-if="description" class="text-xs text-muted-foreground">
              {{ description }}
            </p>
          </div>
        </div>
        <p v-if="field.state.meta.errors.length" class="text-sm text-destructive">
          {{ field.state.meta.errors[0]?.message ?? field.state.meta.errors[0] }}
        </p>
      </div>
    </template>
  </component>
</template>
