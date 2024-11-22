import type { AxiosError } from 'axios'
import type { ResponseDataType } from '../types/index'
import forbidden from './hooks/forbidden'
import refreshToken from './hooks/refreshToken'

export default (error: AxiosError<ResponseDataType>) => {
  const statusCode = error.response?.status
  switch (statusCode) {
    case 400:
      showDanger('请求错误')
      return Promise.reject(error)
    case 401:
      showDanger('身份过期，请重新登录')
      // 一些操作，例如：刷新令牌，如令牌刷新失败时退出到登录页面
      return refreshToken(error)
    case 403:
      // return forbidden()
      showDanger('无权访问')
      return Promise.reject(error)
    case 404:
      showDanger('请求出错')
      return Promise.reject(error)
    case 408:
      showDanger('请求超时，请重试')
      return Promise.reject(error)
    case 500:
      showDanger('系统异常，请联系管理员')
      return Promise.reject(error)
    case 501:
      showDanger('服务未实现')
      return Promise.reject(error)
    case 502:
      showDanger('网络错误')
      return Promise.reject(error)
    case 503:
      showDanger('服务不可用')
      return Promise.reject(error)
    case 504:
      showDanger('网络超时，请重试')
      return Promise.reject(error)
    case 505:
      showDanger('HTTP版本不受支持')
      return Promise.reject(error)
    default:
      showDanger(`系统异常，请联系管理员 - ${statusCode}`)
      return Promise.reject(error)
  }
}
