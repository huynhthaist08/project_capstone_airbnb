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
      
      // Token nằm ở response.data.content.token
      const token = response.data?.content?.token
      const user = response.data?.content?.user
      
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
      console.error('Full error object:', error)
      
      const message = error.response?.data?.message || error.message || 'Đăng nhập thất bại'
      toast.error(message)
    },
  })

  return mutation
}


