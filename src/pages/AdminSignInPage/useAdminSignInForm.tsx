/**
 * Logic xử lý login + check role
 * useAdminSignInForm: hook đăng nhập admin — gọi API signin, khi thành công check role ADMIN
 * nếu đúng redirect đến /admin, ngược lại báo lỗi "Không phải admin"
 */
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

import type { SignInFormType } from '@/pages/SignInPage/schema'
import { setCredentials } from '@/store/auth.slice'
import { PRIVATE_PATH, PUBLIC_PATH } from '@/routes/path'
import { useAuth } from '@/context/AuthContext'

export const useAdminSignInForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { login } = useAuth()

  const mutation = useMutation({
    mutationFn: (payload: SignInFormType) => {
      return login(payload.email, payload.password)
    },
    onSuccess: ({ token, user }) => {
      // Kiểm tra xem có phải admin không
      if (user.role !== 'ADMIN') {
        toast.error('Tài khoản này không có quyền admin')
        return
      }

      // Đồng bộ Redux store
      dispatch(setCredentials({ token, user }))

      toast.success('Đăng nhập admin thành công!')
      navigate(PRIVATE_PATH.ADMIN)
    },
    onError: (error: any) => {
      console.error('Admin login error:', error)

      const message = error?.response?.data?.message ||
                      error?.response?.data?.content ||
                      error.message ||
                      'Đăng nhập thất bại'

      toast.error(message)
    },
  })

  return mutation
}
