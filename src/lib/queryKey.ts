import type { ListParams } from '@/types/api'

export const queryKeys = {
  usersKeys: {
    all: ['users'] as const,
    me: () => [...queryKeys.usersKeys.all, 'me'] as const,
    list: (params: ListParams) => [...queryKeys.usersKeys.all, 'list', params] as const,
    detail: (id: string) => [...queryKeys.usersKeys.all, 'detail', id] as const,
  },
  projectsKeys: {
    all: ['projects'] as const,
    list: (params: ListParams) => [...queryKeys.projectsKeys.all, 'list', params] as const,
    detail: (id: string) => [...queryKeys.projectsKeys.all, 'detail', id] as const,
  },
  tasksKeys: {
    all: ['tasks'] as const,
    list: (params: ListParams) => [...queryKeys.tasksKeys.all, 'list', params] as const,
    detail: (id: string) => [...queryKeys.tasksKeys.all, 'detail', id] as const,
    comments: (taskId: string) => [...queryKeys.tasksKeys.detail(taskId), 'comments'] as const,
  },
  tagsKeys: {
    all: ['tags'] as const,
    list: () => [...queryKeys.tagsKeys.all, 'list'] as const,
  },
} as const
