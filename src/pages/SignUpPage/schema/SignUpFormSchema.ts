import { z } from 'zod'

export const signUpSchema = z.object({
  name: z.string().min(1, 'Họ tên không được rỗng'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
  phone: z.string().min(9, 'Số điện thoại không hợp lệ'),
  birthday: z.string().optional(),
  gender: z.boolean().optional(),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Mật khẩu không khớp',
});

export type SignUpFormType = z.infer<typeof signUpSchema>;


