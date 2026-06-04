import { z } from 'zod'

export const LoginSchema = z.object({
  email: z
    .string()
    .email('Invalid email format')
    .min(8, 'Email must be at least 8 characters long')
    .max(255, 'Email must be at most 255 characters long'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(255, 'Password must be at most 255 characters long'),
})

export const RegisterSchema = LoginSchema.extend({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be at most 100 characters long'),

  confirmPassword: z
    .string()
    .min(6, 'Confirm Password must be at least 6 characters long')
    .max(255, 'Confirm Password must be at most 255 characters long'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type Login = z.infer<typeof LoginSchema>
export type RegisterUser = z.infer<typeof RegisterSchema>
export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>
export type ResetPassword = z.infer<typeof ResetPasswordSchema>
