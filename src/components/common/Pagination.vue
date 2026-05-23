<script setup lang="ts">
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next'
import Button from '../ui/button/Button.vue'
import Select from '../ui/select/Select.vue'
import SelectContent from '../ui/select/SelectContent.vue'
import SelectItem from '../ui/select/SelectItem.vue'
import SelectTrigger from '../ui/select/SelectTrigger.vue'
import SelectValue from '../ui/select/SelectValue.vue'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    page: number
    pageSize: number
    total: number
    totalPages: number
    hasPrevious: boolean
    hasNext: boolean
    pageSizeOptions?: number[]
    siblingCount?: number
  }>(),
  {
    pageSizeOptions: () => [10, 25, 50, 100],
    siblingCount: 1,
  }
)

const emit = defineEmits<{
  'update:page': [page: number]
  'update:pageSize': [size: number]
}>()

const from = computed(() => Math.min((props.page - 1) * props.pageSize + 1, props.total))
const to = computed(() => Math.min(props.page * props.pageSize, props.total))

const pageNumbers = computed<(number | '...')[]>(() => {
  const total = props.totalPages
  const current = props.page
  const delta = props.siblingCount

  const range: number[] = []
  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i)
  }

  const pages: (number | '...')[] = [1]

  if (range[0] > 2) pages.push('...')
  pages.push(...range)
  if (range[range.length - 1] < total - 1) pages.push('...')
  if (total > 1) pages.push(total)

  return pages
})

function go(p: number) {
  if (p < 1 || p > props.totalPages || p === props.page) return
  emit('update:page', p)
}
</script>
<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <p class="text-sm text-muted-foreground">
      <template v-if="total === 0">No results</template>
      <template v-else>
        Showing <span class="font-medium text-foreground"> {{ from }}–{{ to }}</span> of
        <span class="font-medium text-foreground">{{ total }}</span> results
      </template>
    </p>

    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <Select
          :model-value="String(pageSize)"
          @update:model-value="
            (val) => {
              emit('update:pageSize', Number(val))
              emit('update:page', 1)
            }
          "
        >
          <SelectTrigger class="h-8 w-16">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="opt in pageSizeOptions" :key="opt" :value="String(opt)">
              {{ opt }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <dev class="flex items-center gap-1">
        <!-- first page button -->
        <Button
          variant="outline"
          :disabled="!hasPrevious"
          size="icon"
          class="h-8 w-8"
          @click="go(1)"
          aria-label="First page"
        >
          <ChevronsLeft class="h-4 w-4" />
        </Button>
        <!-- prev button -->
        <Button
          variant="outline"
          size="icon"
          class="h-8 w-8"
          aria-label="Previous page"
          @click="go(page - 1)"
          :disabled="!hasPrevious"
        >
          <ChevronLeft class="h-4 w-4" />
        </Button>
        <template v-for="(p, i) in pageNumbers" :key="i">
          <span v-if="p === '...'" class="px-1 text-muted-foreground select-none">...</span>
          <Button
            v-else
            :variant="p === page ? 'default' : 'outline'"
            class="h-8 w-8"
            size="icon"
            @click="go(p)"
            :aria-current="p === page ? 'page' : undefined"
          >
            {{ p }}
          </Button>
        </template>
        <Button
          variant="outline"
          size="icon"
          class="h-8 w-8"
          :disabled="!hasNext"
          @click="go(page + 1)"
          aria-label="Next page"
        >
          <ChevronRight class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          class="h-8 w-8"
          :disabled="!hasNext"
          @click="go(totalPages)"
          aria-label="Last page"
        >
          <ChevronsRight class="h-4 w-4" />
        </Button>
      </dev>
    </div>
  </div>
</template>
