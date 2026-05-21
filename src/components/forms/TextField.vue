<script setup lang="ts">
import Input from '../ui/input/Input.vue'
import Label from '../ui/label/Label.vue'
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
      <div class="field">
        <Label :for="name">{{ label }}</Label>
        <p v-if="description" class="text-xs text-muted-foreground">
          {{ description }}
        </p>
        <Input
          :id="name"
          type="text"
          :name="field.name"
          :model-value="field.state.value"
          :placeholder="placeholder"
          :autocomplete="autocomplete"
          :disabled="disabled"
          @blur="field.handleBlur"
          @input="(e: Event) => field.handleChange((e.target as HTMLInputElement).value)"
        />
        <span v-if="field.state.meta.errors.length" class="field-error">
          {{ field.state.meta.errors[0]?.message ?? field.state.meta.errors[0] }}
        </span>
      </div>
    </template>
  </component>
</template>
