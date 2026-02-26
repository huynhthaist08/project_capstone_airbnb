import { z } from "zod"

export const updateProfileSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().nullable(),
  birthday: z.string(), // ❗ bỏ nullable
  gender: z.boolean(),
})
export type UpdateProfileFormType = z.infer<typeof updateProfileSchema>