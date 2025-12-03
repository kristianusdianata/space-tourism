import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoading = defineStore('loadingStore', () => {
  const isLoading = ref<boolean>(false)
  const isError = ref<boolean>(false)
  const isSuccess = ref<boolean>(true)

  function startLoading() {
    isLoading.value = true
  }

  function stopLoading() {
    isLoading.value = false
  }

  function success() {
    isSuccess.value = true
  }

  function failed() {
    isSuccess.value = false
  }

  function error() {
    isError.value = true
  }

  function clearError() {
    isError.value = false
  }

  function reset() {
    isLoading.value = false
    isSuccess.value = true
    isError.value = false
  }

  return {
    isLoading,
    isError,
    isSuccess,
    startLoading,
    stopLoading,
    success,
    failed,
    error,
    clearError,
    reset,
  }
})
