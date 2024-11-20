/**
 * @Description: 本地存储
 */
const PREFIX = import.meta.env.APP_STORAGE_PREFIX

const storage = {
  local: {
    has: (key: string) => {
      return !!uni.getStorageSync(`${PREFIX}${key}`)
    },
    get: (key: string) => {
      return uni.getStorageSync(`${PREFIX}${key}`)
    },
    set: (key: string, value: any) => {
      uni.setStorageSync(`${PREFIX}${key}`, value)
    },
    remove: (key: string) => {
      uni.removeStorageSync(`${PREFIX}${key}`)
    },
    clear: () => {
      uni.clearStorageSync()
    },
  },
}

export default storage
