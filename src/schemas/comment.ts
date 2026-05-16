import { z } from 'zod'

export const CommentSchema = z.object({
  id: z.string(),
  content: z
    .string()
    .min(1, 'Content is required')
    .max(2000, 'Content must be at most 2000 characters long'),
  taskId: z.string().uuid(),
  authorId: z.string().uuid(),
  createdAt: z.coerce.date(),
})

export const CreateCommentSchema = CommentSchema.omit({ id: true, createdAt: true })

export const UpdateCommentSchema = CommentSchema.pick({ content: true })

export type Comment = z.infer<typeof CommentSchema>
export type CreateCommentInput = z.infer<typeof CreateCommentSchema>
export type UpdateCommentInput = z.infer<typeof UpdateCommentSchema>
