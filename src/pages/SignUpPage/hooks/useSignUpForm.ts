import { useMutation } from '@tanstack/react-query'
import { nguoiDungApi } from '../services'
import { toast } from 'sonner'
import type { SignUpFormType } from '../schema'

export const useMutaRegister = () => {
  return useMutation({
    mutationFn: (payload: Omit<SignUpFormType, 'confirmPassword'>) => {
      // 7 fields: id, name, email, password, phone, birthday, gender
      const apiPayload = {
        id: 0,
        name: payload.name?.trim(),
        email: payload.email?.trim(),
        password: payload.password?.trim(),
        phone: payload.phone?.trim(),
        birthday: payload.birthday || '',
        gender: payload.gender !== undefined ? payload.gender : undefined
      }
      
      // Validate required fields
      if (!apiPayload.name || !apiPayload.email || !apiPayload.password || !apiPayload.phone) {
        throw new Error('Vui lòng điền đầy đủ thông tin')
      }
      
      console.log('Sending payload:', apiPayload)
      return nguoiDungApi.register(apiPayload as any)
    },
    onSuccess: (data) => {
      console.log('register successfully', data)
      toast.success('Đăng ký thành công!')
    },
    onError: (error: any) => {
      console.error('Register error:', error)
      console.error('Error response:', error?.response?.data)
      
      const errorMsg = error?.response?.data?.content || error?.message || 'Đăng ký thất bại'
      
      // Check if email already exists
      if (errorMsg.toLowerCase().includes('email') || errorMsg.toLowerCase().includes('tồn tại')) {
        toast.error('❌ Email này đã được đăng ký. Vui lòng sử dụng email khác.')
      } else {
        toast.error(errorMsg)
      }
    }
  })
}