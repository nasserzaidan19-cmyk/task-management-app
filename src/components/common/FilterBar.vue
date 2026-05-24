<script setup lang="ts">
import { ref, watch } from 'vue'
import { Search, X } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    debounce?: number
  }>(),
  {
    modelValue: '',
    placeholder: 'Search…',
    debounce: 350,
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const raw = ref(props.modelValue)
let timer: ReturnType<typeof setTimeout>

watch(
  () => props.modelValue,
  (val) => {
    if (val !== raw.value) raw.value = val
  }
)

function onInput(e: Event) {
  raw.value = (e.target as HTMLInputElement).value
  clearTimeout(timer)
  timer = setTimeout(() => {
    emit('update:modelValue', raw.value)
  }, props.debounce)
}

function clear() {
  raw.value = ''
  clearTimeout(timer)
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
    <div class="relative flex-1 max-w-sm">
      <Search
        class="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
      />
      <Input :model-value="raw" @input="onInput" :placeholder="placeholder" class="pl-8 pr-8 h-9" />
      <Button
        v-if="raw"
        variant="ghost"
        size="icon"
        class="absolute right-0 top-0 h-full w-8 text-muted-foreground hover:text-foreground hover:bg-transparent"
        @click="clear"
        aria-label="Clear search"
      >
        <X class="h-3.5 w-3.5" />
      </Button>
    </div>

    <div v-if="$slots.filters" class="flex flex-wrap items-center gap-2">
      <slot name="filters" />
    </div>
  </div>
</template>
