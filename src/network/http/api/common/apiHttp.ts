import CommonApi, { type ApiConfig } from '../../axiosHttp'
import {
  requestInterceptor,
  requestInterceptorErr,
  responseInterceptor,
  responseInterceptorErr,
} from './Interceptors'

const option: ApiConfig = {
  cfg: {
    baseURL: import.meta.env.APP_API_BASEURL, // Api 网址
    timeout: 30000, // 请求超时
  },
  interceptor: {
    responseInterceptor,
    requestInterceptorErr,
    requestInterceptor,
    responseInterceptorErr,
  },
}

export default new CommonApi(option)
