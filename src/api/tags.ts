import type { Paginated } from '@/types/api'
import { apiFetch } from './client'
import type { Tag, CreateTagInput, UpdateTagInput } from '@/schemas/tag'

export const tagsApi = {
  async list(): Promise<Paginated<Tag>> {
    return apiFetch<Paginated<Tag>>('/tags')
  },
  async create(input: CreateTagInput): Promise<Tag> {
    return apiFetch('/tags', {
      method: 'POST',
      body: JSON.stringify(input),
    })
  },
  async update({ id, ...input }: UpdateTagInput): Promise<Tag> {
    return apiFetch(`/tags/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(input),
    })
  },
  async remove(id: string): Promise<{ success: boolean }> {
    return apiFetch(`/tags/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({}),
    })
  },
}
