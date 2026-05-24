import { ref } from 'vue'

export interface ConfirmOptions {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive'
}

interface DialogState extends ConfirmOptions {
  open: boolean
  resolve: (value: boolean) => void
}

const state = ref<DialogState>({
  open: false,
  title: '',
  resolve: () => {},
})

export function useConfirmDialog() {
  function confirm(options: ConfirmOptions): Promise<boolean> {
    return new Promise((resolve) => {
      state.value = {
        ...options,
        open: true,
        resolve,
      }
    })
  }
  function handleConfirm() {
    state.value.open = false
    state.value.resolve(true)
  }

  function handleCancel() {
    state.value.open = false
    state.value.resolve(false)
  }
  return { confirm, state, handleConfirm, handleCancel }
}
