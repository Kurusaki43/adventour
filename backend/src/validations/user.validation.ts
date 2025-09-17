import { ROLES } from '@interfaces/user.interface'
import z from 'zod'

// Shared validation rules
const emailValidation = z
  .string({ required_error: 'Email is required' })
  .email('Invalid email.')
const passwordValidation = z
  .string({ required_error: 'Password is required' })
  .min(8, 'Password should at least 8 characters.')

// Register schema
export const registerSchema = z
  .object({
    name: z.string().min(1, 'Name is a reuired field.'),
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: z.string({
      required_error: 'Confirm-Password is required'
    })
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  })

export type RegisterData = Omit<
  z.infer<typeof registerSchema>,
  'confirmPassword'
>

// Login schema
export const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation
})

export type LoginData = z.infer<typeof loginSchema>

export const forgotPasswordSchema = z.object({
  email: emailValidation
})

export const resetPasswordSchema = z
  .object({
    password: passwordValidation,
    confirmPassword: z.string({
      required_error: 'Confirm-Password is required'
    })
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  })

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must not exceed 50 characters')
    .optional(),
  email: emailValidation.optional(),
  avatar: z
    .string()
    .regex(
      /\.(jpg|jpeg|png|gif)$/,
      'Avatar must be a valid image file (jpg, jpeg, png, or gif)'
    )
    .optional()
})

export type UpdateProfileData = z.infer<typeof updateProfileSchema>

export const createUserSchema = z
  .object({
    name: z.string().min(1, 'Name is a reuired field.'),
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: z.string({
      required_error: 'Confirm-Password is required'
    }),
    role: z.enum([ROLES.ADMIN, ROLES.CLIENT, ROLES.GUIDE, ROLES.LEADGUIDE]),
    avatar: z.custom<File | undefined>().optional(),
    isVerified: z.coerce.boolean().optional()
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  })
