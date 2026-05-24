<script setup lang="ts">
import { useConfirmDialog } from '@/composables/useConfirm'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const { state, handleConfirm, handleCancel } = useConfirmDialog()
</script>

<template>
  <AlertDialog :open="state.open" @update:open="(v) => !v && handleCancel()">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ state.title }}</AlertDialogTitle>
        <AlertDialogDescription v-if="state.description">
          {{ state.description }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="handleCancel">
          {{ state.cancelText ?? 'Cancel' }}
        </AlertDialogCancel>
        <AlertDialogAction
          :class="
            cn(state.variant === 'destructive' ? buttonVariants({ variant: 'destructive' }) : '')
          "
          @click="handleConfirm"
        >
          {{ state.confirmText ?? 'Confirm' }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
