<script lang="ts" setup>
import { useLoading } from '@store'

const store = useLoading()
</script>

<template>
  <div class="loading-wrapper" v-if="store.isLoading">
    <div class="spinner"></div>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@style/utils/index' as *;
@use '@style/typography' as *;

.loading-wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.15);
  z-index: 9999;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #ddd;
  border-top-color: #4f46e5;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
