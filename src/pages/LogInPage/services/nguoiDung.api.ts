import api from '@/shared/services/api'
import type { nguoiDungType } from './nguoiDung.type'

export const nguoiDungApi = {
  logIn: (payload: nguoiDungType) =>
    api.post('/auth/signin', payload),
}