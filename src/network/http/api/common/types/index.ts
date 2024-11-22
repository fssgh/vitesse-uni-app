/**
 * API 统一响应体类型
 */
export interface ResponseDataType<T = unknown> {
  data: T // 响应体数据类型
  msg: string
  status: number
}
