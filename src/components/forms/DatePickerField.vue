<script setup lang="ts">
import { ref } from 'vue'
import { CalendarIcon } from 'lucide-vue-next'
import { getLocalTimeZone, parseDate } from '@internationalized/date'
import type { DateValue } from '@internationalized/date'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

defineProps<{
  name: string
  label: string
  form: any
  placeholder?: string
  autocomplete?: string
  description?: string
  disabled?: boolean
}>()

const open = ref(false)

// field.state.value is a string like "2024-01-15"; convert to/from DateValue
function toDateValue(val: string | undefined): DateValue | undefined {
  if (!val) return undefined
  try {
    return parseDate(val)
  } catch {
    return undefined
  }
}

function fromDateValue(val: DateValue): string {
  return val.toString() // returns "YYYY-MM-DD"
}

function formatDisplay(val: string | undefined): string {
  if (!val) return 'Pick a date'
  try {
    return parseDate(val).toDate(getLocalTimeZone()).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return 'Pick a date'
  }
}
</script>

<template>
  <component :is="form.Field" :name="name">
    <template #default="{ field }">
      <div class="flex flex-col gap-1.5">
        <Label :for="name">{{ label }}</Label>
        <p v-if="description" class="text-xs text-muted-foreground">
          {{ description }}
        </p>
        <Popover v-model:open="open">
          <PopoverTrigger as-child>
            <Button
              :id="name"
              variant="outline"
              :disabled="disabled"
              :autocomplete="autocomplete"
              :class="
                cn(
                  'w-full justify-start text-left font-normal',
                  !field.state.value && 'text-muted-foreground'
                )
              "
              @blur="field.handleBlur"
            >
              <CalendarIcon class="mr-2 h-4 w-4" />
              {{ formatDisplay(field.state.value) }}
            </Button>
          </PopoverTrigger>
          <PopoverContent v-if="!disabled" class="w-auto p-0" align="start">
            <Calendar
              :model-value="toDateValue(field.state.value)"
              @update:model-value="
                (val) => {
                  if (val) {
                    field.handleChange(fromDateValue(val))
                    open = false
                  }
                }
              "
            />
          </PopoverContent>
        </Popover>
        <p v-if="field.state.meta.errors.length" class="text-sm text-destructive">
          {{ field.state.meta.errors[0]?.message ?? field.state.meta.errors[0] }}
        </p>
      </div>
    </template>
  </component>
</template>
