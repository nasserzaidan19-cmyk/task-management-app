import { z } from 'zod'

const hexColorSchema = z
  .string()
  .regex(/^#[0-9A-F]{6}$/i, 'Color must be a valid hex code (e.g., #FF5733)')

export const TagSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Name is required').max(255, 'Name must be at most 255 characters long'),
  color: hexColorSchema,
})

export const CreateTagSchema = TagSchema.omit({ id: true })

export const UpdateTagSchema = z.object({
  id: z.string().uuid().readonly(),
  name: z
    .string()
    .min(1, 'Name is required')
    .max(255, 'Name must be at most 255 characters long')
    .optional(),
  color: hexColorSchema.optional(),
})

//RELATIONSHIP tag SCHEMAS
export const addTagToProjectSchema = z.object({
  tagId: z.string().uuid('Invalid UUID format'),
})

//types
export type Tag = z.infer<typeof TagSchema>
export type CreateTagInput = z.infer<typeof CreateTagSchema>
export type UpdateTagInput = z.infer<typeof UpdateTagSchema>
