<script setup lang="ts">
import { Label } from '@/components/ui/label'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '@/components/ui/tags-input'

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
        <Label :for="name">{{ label }}</Label>
        <p v-if="description" class="text-xs text-muted-foreground">
          {{ description }}
        </p>
        <TagsInput
          :model-value="field.state.value ?? []"
          @update:model-value="(val) => field.handleChange(val)"
          @blur="field.handleBlur"
          :disabled="disabled"
        >
          <TagsInputItem v-for="tag in field.state.value ?? []" :key="tag" :value="tag">
            <TagsInputItemText />
            <TagsInputItemDelete />
          </TagsInputItem>
          <TagsInputInput
            :id="name"
            :placeholder="placeholder ?? 'Add tag...'"
            :autocomplete="autocomplete"
          />
        </TagsInput>
        <p v-if="field.state.meta.errors.length" class="text-sm text-destructive">
          {{ field.state.meta.errors[0]?.message ?? field.state.meta.errors[0] }}
        </p>
      </div>
    </template>
  </component>
</template>
