import { z } from 'zod'

const ProjectStatus = z.enum(['active', 'archived', 'completed']).default('active')
export const ProjectSchema = z.object({
  id: z.string().uuid(),
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title must be at most 255 characters long'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(2000, 'Description must be at most 2000 characters long'),
  ownerId: z.string().uuid(),
  status: ProjectStatus,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const CreateProjectSchema = ProjectSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const UpdateProjectSchema = ProjectSchema.partial().omit({
  id: true,
  ownerId: true,
  createdAt: true,
  updatedAt: true,
})

export type Project = z.infer<typeof ProjectSchema>
export type CreateProjectInput = z.infer<typeof CreateProjectSchema>
export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>
