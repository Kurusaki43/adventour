import z from "zod";

// Shared validation rules
const emailValidation = z
  .string({ error: "Email is required" })
  .email("Invalid email");
const passwordValidation = z
  .string({ error: "Password is required" })
  .min(8, "Password should at least 8 characters");

// Login schema
export const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export type LoginData = z.infer<typeof loginSchema>;

// Sign up schema
export const signUpSchema = z
  .object({
    name: z.string().min(1, "Name is a reuired field."),
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: z.string({
      error: "Confirm-Password is required",
    }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignUpData = z.infer<typeof signUpSchema>;

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: emailValidation,
});
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

// Reset password schema
export const resetPasswordSchema = z
  .object({
    password: passwordValidation,
    confirmPassword: z.string({
      error: "Confirm-Password is required",
    }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
