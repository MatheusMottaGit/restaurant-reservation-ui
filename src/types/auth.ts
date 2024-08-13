import { z } from "zod"

export const registerSchema = z.object({
  name: z.string({ message: "Name field is required." }),
  email: z
    .string()
    .email({ message: "E-mail field is required." }),
  password: z
    .string({ message: "Password field is required." })
    .min(8, { message: "Password field must have at least 8 characters." })
    .max(10, { message: "Password field must have at most 10 characters." }),
})

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "E-mail field is required." }),
  password: z
    .string({ message: "Password field is required." })
    .min(8, { message: "Password field must have at least 8 characters." })
    .max(10, { message: "Password field must have at most 10 characters." }),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
