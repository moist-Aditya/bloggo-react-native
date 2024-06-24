import { z } from "zod"

export const createBlogSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title required" })
    .max(100, { message: "Title cannot be more than 100 characters long." })
    .trim(),
  content: z.string().min(1, { message: "Body required" }),
})
