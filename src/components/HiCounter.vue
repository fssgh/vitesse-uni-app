<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const { count, inc, dec } = useCount()
const counter = useCounterStore()
counter.count++
// 自动补全！ ✨
counter.$patch({ count: counter.count + 1 })
// 或使用 action 代替
counter.increment()
</script>

<template>
  <view inline-flex m="y-3">
    <view class="btn" @click="dec()">
      <text i-carbon-subtract />
    </view>
    <view font="mono" w="15" m-auto inline-block>
      {{ count }}
    </view>
    <view class="btn" @click="inc()">
      <text i-carbon-add />
    </view>
    <!-- 直接从 store 中访问 state -->
    <div>Current Count: {{ counter.count }}</div>
  </view>
</template>

<style>
.btn {
  --at-apply: w-8 h-8 flex items-center justify-center rounded-full bg-teal-600 text-white cursor-pointer
}
</style>
