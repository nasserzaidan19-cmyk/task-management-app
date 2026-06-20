import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { tagsApi } from '@/api/tags'
import { queryKeys } from '@/lib/queryKey'
import { useAuth } from '../useAuth'
import type { Tag, CreateTagInput, UpdateTagInput } from '@/schemas/tag'
import type { Paginated } from '@/types/api'

const { tagsKeys } = queryKeys

export function useTagsQuery() {
  return useQuery({
    queryKey: [tagsKeys.all],
    queryFn: () => tagsApi.list(),
    staleTime: 5 * 60_000,
  })
}

export function useCreateTag() {
  const queryClient = useQueryClient()
  const { isAuthenticated } = useAuth()

  return useMutation({
    mutationFn: async (newTag: CreateTagInput) => {
      if (!isAuthenticated.value) throw new Error('User must be authenticated to create a tag')
      return tagsApi.create(newTag)
    },
    onMutate: async (newTag) => {
      await queryClient.cancelQueries({ queryKey: [tagsKeys.all] })
      const previousTags = queryClient.getQueryData<Paginated<Tag>>([tagsKeys.all])
      if (previousTags) {
        queryClient.setQueryData<Tag[]>(
          [tagsKeys.all],
          [
            ...previousTags.data,
            {
              ...newTag,
              id: 'temp-id-' + Date.now(), // temporary client-side unique id
            },
          ]
        )
      }
      return { previousTags }
    },
    onError: (err, _newTag, context) => {
      if (context?.previousTags) {
        queryClient.setQueryData([tagsKeys.all], context.previousTags)
      }
      console.error(err.message)

      //we will add toast
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [tagsKeys.all] })
    },
  })
}

export function useUpdateTag() {
  const queryClient = useQueryClient()
  const { isAuthenticated } = useAuth()
  return useMutation({
    mutationFn: async (updatedTag: UpdateTagInput) => {
      if (!isAuthenticated.value) throw new Error('Unauthorized action')
      return tagsApi.update(updatedTag)
    },
    onMutate: async (updatedTag) => {
      await queryClient.cancelQueries({ queryKey: tagsKeys.all })
      const previousTags = queryClient.getQueryData<Tag[]>(tagsKeys.all)
      if (previousTags) {
        queryClient.setQueryData<Tag[]>(
          tagsKeys.all,
          previousTags.map((tag) => (tag.id === updatedTag.id ? { ...tag, ...updatedTag } : tag))
        )
      }
      return { previousTags }
    },
    onError: (err, _updatedTag, context) => {
      if (context?.previousTags) {
        queryClient.setQueryData(tagsKeys.all, context.previousTags)
      }
      console.error(err)
      //we will add toast
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [tagsKeys.all] })
    },
  })
}

export function useDeleteTag() {
  const queryClint = useQueryClient()
  const { isAuthenticated } = useAuth()
  return useMutation({
    mutationFn: async (id: string) => {
      if (!isAuthenticated.value) throw new Error('Unauthorized action')
      return tagsApi.remove(id)
    },
    onMutate: async (id) => {
      await queryClint.cancelQueries({ queryKey: tagsKeys.all })
      const previousTags = queryClint.getQueryData<Tag[]>(tagsKeys.all)
      if (previousTags) {
        queryClint.setQueryData<Tag[]>(
          tagsKeys.all,
          previousTags.filter((tag) => tag.id !== id)
        )
      }
      return { previousTags }
    },
    onError: (err, _id, context) => {
      if (context?.previousTags) {
        queryClint.setQueryData(tagsKeys.all, context.previousTags)
      }
      console.error(err)
      //we will add toast
    },
    onSettled: () => {
      queryClint.invalidateQueries({ queryKey: [tagsKeys.all] })
    },
  })
}
