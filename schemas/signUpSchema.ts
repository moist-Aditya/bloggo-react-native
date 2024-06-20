import { z } from "zod"

const usernameRegex = /^[a-zA-Z0-9_]+$/ // Allows only letters, numbers, and underscores

const signUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .regex(usernameRegex, {
      message: "Only letters, numbers, and underscores allowed",
    }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
})

export default signUpSchema
