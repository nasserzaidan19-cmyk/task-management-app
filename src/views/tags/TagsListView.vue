<script setup lang="ts">
import LoadingSkeleton from '@/components/common/LoadingSkeleton.vue'
import TagBadge from '@/components/features/tags/TagBadge.vue'
import TagForm from '@/components/features/tags/TagForm.vue'
import Separator from '@/components/ui/separator/Separator.vue'
import { useDeleteTag, useTagsQuery } from '@/composables/queries/useTags.ts'
import { useConfirmDialog } from '@/composables/useConfirm'

const { data: tags, isLoading, isError } = useTagsQuery()
const deleteTagMutation = useDeleteTag()

const { confirm } = useConfirmDialog()
async function handleDeleteTag(id: string) {
  const confirmed = await confirm({
    title: 'Are you absolutely certain?',
    description:
      'This action cannot be undone. This tag will be permanently deleted and removed from all associated tasks and projects.',
    confirmText: 'Delete Tag',
    cancelText: 'Cancel',
    variant: 'destructive',
  })
  if (!confirmed) return

  try {
    await deleteTagMutation.mutateAsync(id)
  } catch (error) {
    console.error('Failed to delete tag:', error)
  }
}
</script>
<template>
  <div class="container mx-auto py-8 max-w-5xl space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Tag Management</h1>
      <p class="text-muted-foreground text-sm">
        Create, edit, and organize system-wide task identifiers.
      </p>
    </div>

    <TagForm />

    <Separator />
    <div v-if="isLoading">
      <LoadingSkeleton />
    </div>

    <div
      v-else-if="isError"
      class="p-4 border text-destructive bg-destructive/5 rounded-lg text-sm"
    >
      Failed to load your tags array workspace.
    </div>

    <div
      v-else-if="!tags?.data || tags?.data.length === 0"
      class="text-center py-12 border border-dashed rounded-xl"
    >
      <p class="text-sm text-muted-foreground">No tags built yet.</p>
    </div>
    <div v-else class="flex flex-col gap-4">
      <TagBadge v-for="tag in tags?.data" :key="tag.id" :tag="tag" @delete="handleDeleteTag" />
    </div>
  </div>
</template>
