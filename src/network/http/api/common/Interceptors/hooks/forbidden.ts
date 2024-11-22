export default function forbidden() {
  // 根据业务逻辑，执行对应处理（暂时不适用）
  // 需求：账号权限发生改变，触发403 退出到登录页
  showWarning('账号权限改变，请重新登录')
  storage.local.remove('')
  uni.reLaunch({
    url: `/pages/login`,
  })
}
