import { z } from "zod"

export const createBlogSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title required" })
    .max(30, { message: "Title cannot be more than 30 characters long." })
    .trim(),
  content: z.string().min(1, { message: "Body required" }),
})
