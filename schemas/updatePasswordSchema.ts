import { z } from "zod"

const updatePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters" }),
    newPassword1: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters" }),
    newPassword2: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters" }),
  })
  .refine((data) => data.newPassword1 === data.newPassword2, {
    path: ["newPassword2"],
    message: "New passwords must match",
  })
  .refine((data) => data.oldPassword !== data.newPassword1, {
    path: ["newPassword1"],
    message: "New password cannot be the same as old",
  })

export default updatePasswordSchema
