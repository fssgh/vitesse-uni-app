<script setup lang="ts">
const toast = useToast()
const notify = useNotify()

function showPrimary() {
  notify.primary('主要通知')
}
function showSuccess() {
  toast.success('成功提示')
}
const PREFIX = import.meta.env.APP_STORAGE_PREFIX
</script>

<template>
  <AppLogos />
  <InputEntry />
  <nut-button type="primary">
    {{ PREFIX }}主要按钮
  </nut-button>
  <nut-cell title="Success 成功提示" is-link @click="showSuccess" />
  <nut-cell title="主要通知" is-link @click="showPrimary" />
</template>

<style></style>

<route type="home" lang="json">
{}
</route>
