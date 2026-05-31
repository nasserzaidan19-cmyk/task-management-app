<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
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

const visible = ref(false)
</script>

<template>
  <component :is="form.Field" :name="name">
    <template #default="{ field }">
      <div class="flex flex-col gap-1.5">
        <Label :for="name">{{ label }}</Label>
        <p v-if="description" class="text-xs text-muted-foreground">
          {{ description }}
        </p>
        <div>
          <Input
            :id="name"
            :type="visible ? 'text' : 'password'"
            :name="field.name"
            :model-value="field.state.value"
            :placeholder="placeholder"
            :autocomplete="autocomplete"
            :disabled="disabled"
            @blur="field.handleBlur"
            @input="(e: Event) => field.handleChange((e.target as HTMLInputElement).value)"
          />
        </div>
        <p
          v-if="field.state.meta.errors.length && field.state.meta.isTouched"
          class="text-sm text-destructive"
        >
          {{ field.state.meta.errors[0]?.message ?? field.state.meta.errors[0] }}
        </p>
      </div>
    </template>
  </component>
</template>
