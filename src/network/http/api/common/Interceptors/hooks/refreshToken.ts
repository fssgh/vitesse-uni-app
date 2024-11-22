import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import type { ResponseDataType } from '../../types'
import { UserAuthApi } from '../../../auth'
import ApiInstance from '../../apiHttp'

const MAX_ERROR_COUNT = 5
let currentCount = 0
const queue: ((t: string) => any)[] = []
let isRefresh = false

const storageLoginUserKey = 'loginUserInfo'

export default async function refreshToken(error: AxiosError<ResponseDataType>) {
  const logout = () => {
    showDanger('身份过期，请重新登录')
    uni.reLaunch({
      url: `/pages/login`,
    })
    // 清空数据
    storage.local.remove(storageLoginUserKey)
    return Promise.reject(error)
  }
  if (error.config?.url?.includes('refresh')) {
    logout()
  }
  const refresh = storage.local.get('refresh') ?? null
  const { config = {} as InternalAxiosRequestConfig<unknown> } = error
  if (!refresh) {
    logout()
  }
  if (!isRefresh) {
    isRefresh = true
    if (currentCount > MAX_ERROR_COUNT) {
      logout()
    }
    currentCount += 1

    try {
      const { data } = await UserAuthApi.refreshToken(refresh)
      const access = toValue(data)?.data.access || ''
      storage.local.set(storageLoginUserKey, access)
      currentCount = 0
      // 重新请求
      queue.forEach(cb => cb(access))
      return ApiInstance.request(error.config as InternalAxiosRequestConfig<any>)
    }
    catch {
      showDanger('请重新登录')
      storage.local.remove(storageLoginUserKey)
      uni.reLaunch({
        url: `/pages/login`,
      })
      return Promise.reject(error)
    }
    finally {
      isRefresh = false
    }
  }
  else {
    return new Promise((resolve) => {
      // 缓存网络请求，等token刷新后直接执行
      queue.push((newToken: string) => {
        Reflect.set(config.headers!, 'authorization', newToken)
        resolve(ApiInstance.request<ResponseDataType<any>>(config))
      })
    })
  }
}
