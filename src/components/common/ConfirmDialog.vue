<script setup lang="ts">
import { useConfirmDialog } from '@/composables/useConfirm'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const { state, handleConfirm, handleCancel } = useConfirmDialog()
</script>

<template>
  <Dialog :open="state.open" @update:open="(v) => !v && handleCancel()">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ state.title }}</DialogTitle>
        <DialogDescription v-if="state.description">
          {{ state.description }}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" @click="handleCancel">
          {{ state.cancelText ?? 'Cancel' }}
        </Button>
        <Button
          :variant="state.variant === 'destructive' ? 'destructive' : 'default'"
          @click="handleConfirm"
        >
          {{ state.confirmText ?? 'Confirm' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
