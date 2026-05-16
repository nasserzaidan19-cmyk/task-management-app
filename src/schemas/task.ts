import { z } from 'zod'

const TaskStatus = z.enum(['todo', 'in_progress', 'done']).default('todo')

const TaskPriority = z.enum(['low', 'medium', 'high']).default('medium')

export const TaskSchema = z.object({
  id: z.string().uuid(),
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title must be at most 255 characters long'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(2000, 'Description must be at most 2000 characters long'),
  projectId: z.string().uuid(),
  assigneeId: z.string().uuid().nullable(),
  status: TaskStatus,
  priority: TaskPriority,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const CreateTaskSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const UpdateTaskSchema = TaskSchema.partial().omit({
  id: true,
  projectId: true,
  createdAt: true,
  updatedAt: true,
})

//RELATIONSHIP assignUser SCHEMAS
export const assignUserToTaskSchema = z.object({
  userId: z.string().uuid('Invalid UUID format'),
})

//types

export type Task = z.infer<typeof TaskSchema>
export type CreateTaskInput = z.infer<typeof CreateTaskSchema>
export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>
