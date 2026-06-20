<script setup lang="ts">
import TextField from '@/components/forms/TextField.vue'
import Button from '@/components/ui/button/Button.vue'
import { Item, ItemActions, ItemContent, ItemTitle } from '@/components/ui/item'
import Label from '@/components/ui/label/Label.vue'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useUpdateTag } from '@/composables/queries/useTags'
import { UpdateTagInputSchema, type Tag } from '@/schemas/tag'
import { useForm } from '@tanstack/vue-form'
import { Trash2, Pencil, Loader2 } from 'lucide-vue-next'

const props = defineProps<{
  tag: Tag
}>()
defineEmits<{
  (e: 'delete', id: string): void
}>()

const { mutateAsync, isPending } = useUpdateTag()

const editForm = useForm({
  defaultValues: {
    updatedTagName: props.tag.name,
    updatedTagColor: props.tag.color,
  },
  validators: {
    onBlur: UpdateTagInputSchema,
  },
  onSubmit: async ({ value }) => {
    console.log('sumbeting')
    if (!value.updatedTagName.trim()) return
    try {
      await mutateAsync({
        id: props.tag.id,
        name: value.updatedTagName.trim(),
        color: value.updatedTagColor,
      })
    } catch (error) {
      console.error(error)
    }
  },
})
</script>
<template>
  <Item variant="outline">
    <ItemContent>
      <ItemTitle>
        <span
          class="h-4 w-4 rounded-full border shadow-inner"
          :style="{ backgroundColor: props.tag?.color || '123456' }"
        />
        {{ props.tag.name }}
      </ItemTitle>
    </ItemContent>
    <ItemActions>
      <Popover>
        <PopoverTrigger as-child>
          <Button
            variant="ghost"
            size="icon"
            class="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <Pencil class="h-3.5 w-3.5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-80">
          <div class="grid gap-4">
            <div class="space-y-2">
              <h4 class="font-medium leading-none">Update Tag</h4>
            </div>
            <form class="grid gap-2" @submit.prevent="editForm.handleSubmit">
              <TextField :form="editForm" label="Name" name="updatedTagName" />
              <div class="mt-2">
                <editForm.Field name="updatedTagColor" v-slot="{ field }">
                  <Label :for="field.name">Color</Label>
                  <input
                    :id="field.name"
                    :value="field.state.value"
                    type="color"
                    @input="(e: any) => field.handleChange(e.target.value)"
                    class="w-full h-12 mt-1 cursor-pointer"
                  />
                </editForm.Field>
              </div>
              <Button type="submit" :disabled="isPending" class="h-9 mt-2 cursor-pointer">
                <Loader2 v-if="isPending" class="mr-2 h-4 w-4 animate-spin" />
                Edit tag
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
      <Button
        variant="ghost"
        size="icon"
        class="h-8 w-8 text-muted-foreground hover:text-destructive"
        :disabled="isPending"
        @click="$emit('delete', tag.id)"
      >
        <Trash2 class="h-3.5 w-3.5" />
      </Button>
    </ItemActions>
  </Item>
</template>
