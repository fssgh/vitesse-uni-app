/**
 * 封装 axios
 */
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import type { ResponseDataType } from './api/common/types'
import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter'
import axios from 'axios'

export interface Interceptor {
  requestInterceptor: (res: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorErr?: (error: any) => any
  responseInterceptor: (res: AxiosResponse) => AxiosResponse
  responseInterceptorErr?: (error: any) => any
}

export interface ApiConfig {
  cfg: AxiosRequestConfig
  interceptor: Interceptor
}

export default class ApiAxiosHttp {
  instance: AxiosInstance

  config: AxiosRequestConfig

  interceptor: Interceptor

  constructor(option: ApiConfig) {
    this.config = option.cfg
    this.interceptor = option.interceptor
    // 配置全局参数
    this.instance = axios.create({ ...this.config, adapter: createUniAppAxiosAdapter() }) // 设置 uniapp Axios 适配器
    // 拦截器
    // 配置请求拦截器
    this.instance.interceptors.request.use(
      this.interceptor.requestInterceptor,
      this.interceptor?.requestInterceptorErr,
    )
    // 配置响应拦截器
    this.instance.interceptors.response.use(
      this.interceptor.responseInterceptor,
      this.interceptor?.responseInterceptorErr,
    )
  }

  // 加入泛型限定，返回数据类型为T，请求的数据类型为D
  async request<T, D = any>(config: AxiosRequestConfig<D>): Promise<ResponseDataType<T>> {
    return this.instance.request<ResponseDataType<T>, ResponseDataType<T>, D>(config)
  }

  async get<T, D = any>(url: string, params?: D, config?: AxiosRequestConfig<D>): Promise<ResponseDataType<T>> {
    return this.instance.get<ResponseDataType<T>, ResponseDataType<T>, D>(url, { ...config, params })
  }

  async delete<T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<ResponseDataType<T>> {
    return this.instance.delete<ResponseDataType<T>, ResponseDataType<T>, D>(url, config)
  }

  async head<T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<ResponseDataType<T>> {
    return this.instance.head<ResponseDataType<T>, ResponseDataType<T>, D>(url, config)
  }

  async options<T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<ResponseDataType<T>> {
    return this.instance.options<ResponseDataType<T>, ResponseDataType<T>, D>(url, config)
  }

  async post<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<ResponseDataType<T>> {
    return this.instance.post<ResponseDataType<T>, ResponseDataType<T>, D>(url, data, config)
  }

  async put<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<ResponseDataType<T>> {
    return this.instance.put<ResponseDataType<T>, ResponseDataType<T>, D>(url, data, config)
  }

  async patch<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<ResponseDataType<T>> {
    return this.instance.patch<ResponseDataType<T>, ResponseDataType<T>, D>(url, data, config)
  }
}
