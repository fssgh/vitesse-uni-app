import type { NotifyOptions } from 'nutui-uniapp'

const notify = useNotify()

/**
 * 一般通知
 * @param msg
 */
export function showInfo(msg: string, options?: NotifyOptions) {
  notify.primary(msg, options)
}
/**
 * 成功通知
 * @param msg
 */
export function showSuccess(msg: string, options?: NotifyOptions) {
  notify.success(msg, options)
}
/**
 * 危险通知
 * @param msg
 */
export function showDanger(msg: string, options?: NotifyOptions) {
  notify.danger(msg, options)
}
/**
 * 警告通知
 * @param msg
 */
export function showWarning(msg: string, options?: NotifyOptions) {
  notify.warning(msg, options)
}
/**
 * 关闭通知
 * @param msg
 */
export function hide() {
  notify.hide()
}
