import { z } from 'zod'

export const emailSchema = z
  .string()
  .email('Invalid email format')
  .max(255, 'Email must be at most 255 characters long')

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Name is required').max(255, 'Name must be at most 255 characters long'),
  email: emailSchema,
  createdAt: z.coerce.date(),
})

export const UpdateUserSchema = UserSchema.partial().omit({ id: true, createdAt: true })

export type User = z.infer<typeof UserSchema>
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>
