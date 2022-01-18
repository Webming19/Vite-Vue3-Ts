import http from '@/utils/http/axios/index';

interface loginReaType {
  msg: string
  code: string
  data:{
    result:{
      accessToken:string
      username: string
      realName: string
    }
  }
  result:any
}

export default (params:any) => {
  return http.post<loginReaType>('/oauth/login', params)
}