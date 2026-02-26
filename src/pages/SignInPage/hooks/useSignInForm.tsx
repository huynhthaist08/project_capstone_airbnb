/**
 * useSignInForm: hook đăng nhập — gọi API signin (nguoiDungApi.logIn), khi thành công dispatch setCredentials (Redux + localStorage) rồi chuyển về trang chủ, toast thông báo.
 */
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

import type { SignInFormType } from '../schema'
import { setCredentials } from '@/store/auth.slice'
import { PUBLIC_PATH } from '@/routes/path'
import { useAuth } from '@/context/AuthContext'

export const useSignInForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { login } = useAuth()

  const mutation = useMutation({
    // Dùng AuthContext.login để luôn đồng bộ token/user và tránh trùng logic parse response.
    mutationFn: (payload: SignInFormType ) => {
      return login(payload.email, payload.password)
    },
    onSuccess: ({ token, user }) => {
      // Đồng bộ Redux store với thông tin đã lưu trong AuthContext
      dispatch(setCredentials({ token, user }))

      toast.success('Đăng nhập thành công!')
      navigate(PUBLIC_PATH.HOME)
    },
    onError: (error: any) => {
      console.error('Login error:', error)
      console.error('Error response:', error?.response?.data)

      // CyberSoft API error format: { statusCode, message, content }
      const message = error?.response?.data?.message ||
                      error?.response?.data?.content ||
                      error.message ||
                      'Đăng nhập thất bại'

      toast.error(message)
    },
  })

  return mutation
}


