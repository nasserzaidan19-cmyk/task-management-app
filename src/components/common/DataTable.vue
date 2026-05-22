<script setup lang="ts" generic="T extends Record<string, any>">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

export interface ColumnDef<T> {
  key: string
  label: string
  width?: string
  align?: 'left' | 'center' | 'right'
}

withDefaults(
  defineProps<{
    columns: ColumnDef<T>[]
    rows: T[]
    rowKey?: keyof T
    loading?: boolean
    skeletonRows?: number
    onRowClick?: (row: T) => void
  }>(),
  {
    rowKey: 'id' as any,
    loading: false,
    skeletonRows: 5,
  }
)

const alignClass = (align?: string) =>
  ({
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  })[align ?? 'left']
</script>
<template>
  <div class="relative w-full overflow-auto rounded-md border">
    <Table>
      <TableHeader class="sticky top-0 z-10 bg-background shadow-[0_1px_0_0_hsl(var(--border))]">
        <TableRow>
          <TableHead
            v-for="col in columns"
            :key="col.key"
            :class="[col.width, alignClass(col.align)]"
          >
            {{ col.label }}
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <!-- Loading skeletons -->
        <template v-if="loading">
          <TableRow v-for="i in skeletonRows" :key="i">
            <TableCell v-for="col in columns" :key="col.key">
              <Skeleton class="h-4 w-full" />
            </TableCell>
          </TableRow>
        </template>

        <!-- Empty state -->
        <template v-else-if="rows.length === 0">
          <TableRow>
            <TableCell :colspan="columns.length" class="h-32 text-center text-muted-foreground">
              No results found.
            </TableCell>
          </TableRow>
        </template>

        <!-- Data rows -->
        <template v-else>
          <TableRow
            v-for="row in rows"
            :key="String(row[rowKey])"
            :class="[onRowClick && 'cursor-pointer']"
            @click="onRowClick?.(row)"
          >
            <TableCell
              v-for="col in columns"
              :key="col.key"
              :class="[col.width, alignClass(col.align)]"
            >
              <slot :name="col.key" :row="row" :value="row[col.key]">
                {{ row[col.key] }}
              </slot>
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>
