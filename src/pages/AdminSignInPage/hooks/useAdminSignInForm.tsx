/**
 * useAdminSignInForm: Hook đăng nhập admin — reuse schema từ SignInPage
 * Khác biệt: Check user.role === "ADMIN", nếu không → hiện lỗi
 */
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

import type { SignInFormType } from '@/pages/SignInPage/schema'
import { setCredentials } from '@/store/auth.slice'
import { PRIVATE_PATH } from '@/routes/path'
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
      console.error('Error response:', error?.response?.data)

      const message = error?.response?.data?.message ||
                      error?.response?.data?.content ||
                      error.message ||
                      'Đăng nhập thất bại'

      toast.error(message)
    },
  })

  return mutation
}
