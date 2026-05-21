<script setup lang="ts">
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

defineProps<{
  name: string
  label: string
  form: any
  options: { value: string; label: string }[]
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
        <Select
          :model-value="field.state.value"
          @update:model-value="(val) => field.handleChange(val)"
          :disabled="disabled"
        >
          <SelectTrigger :id="name" @blur="field.handleBlur" :autocomplete="autocomplete">
            <SelectValue :placeholder="placeholder ?? 'Select an option'" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="opt in options" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </SelectItem>
          </SelectContent>
        </Select>
        <p v-if="field.state.meta.errors.length" class="text-sm text-destructive">
          {{ field.state.meta.errors[0]?.message ?? field.state.meta.errors[0] }}
        </p>
      </div>
    </template>
  </component>
</template>
