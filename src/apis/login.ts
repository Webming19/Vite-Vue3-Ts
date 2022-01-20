import http from '@/utils/http/axios/index';

interface loginReaType {
  result:{
    accessToken: string
    username: string
    realName: string
  }
}

export default (params:any) => {
  return http.post<loginReaType>('/oauth/login', params)
}