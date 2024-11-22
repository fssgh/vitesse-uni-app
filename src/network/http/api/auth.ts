import type { ResponseDataType } from './common/types'
import commonApi from './common/apiHttp'

export namespace UserAuthApi {
  // 刷新令牌api 返回值 数据类型
  export interface RefreshResultType {
    refresh?: string
    access: string
  }

  // 刷新令牌
  export function refreshToken(refresh: string) {
    // return commonApi.post<ResponseDataType<RefreshResultType>>('/token/refresh', { refresh })
    return commonApi.post<ResponseDataType<RefreshResultType>>('/posts', { refresh })
  }
}
