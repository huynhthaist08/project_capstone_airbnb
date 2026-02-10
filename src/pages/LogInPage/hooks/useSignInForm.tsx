import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

import { nguoiDungApi } from '../services/nguoiDung.api'
import type { SignInFormType } from '../schema'
import { setCredentials } from '@/store/auth.slice'
import { PUBLIC_PATH } from '@/routes/path'

export const useSignInForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const mutation = useMutation({
    mutationFn: (payload: SignInFormType ) => {
      return nguoiDungApi.logIn(payload)
    },
    onSuccess: (response) => {
      console.log('Login success response:', response.data)
      console.log('Full response:', response)
      
      // CyberSoft API response format
      const token = response.data?.content?.token || response.data?.token
      const user = response.data?.content?.user || response.data?.user
      
      if (!token) {
        console.error('NO TOKEN FOUND IN RESPONSE!')
        toast.error('Lỗi: API không trả về token')
        return
      }
      
      // Redux action handles both state update and localStorage saving
      dispatch(setCredentials({ token, user }))
      
      toast.success('Đăng nhập thành công!')
      navigate(PUBLIC_PATH.HOME)
    },
    onError: (error: any) => {
      console.error('Login error:', error)
      console.error('Error response:', error.response?.data)
      
      // CyberSoft API error format: { statusCode, message, content }
      const message = error.response?.data?.message || 
                      error.response?.data?.content ||
                      error.message || 
                      'Đăng nhập thất bại'
      
      toast.error(message)
    },
  })

  return mutation
}


