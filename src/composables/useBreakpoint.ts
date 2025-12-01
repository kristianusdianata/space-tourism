import { ref, onMounted, onUnmounted, computed } from 'vue'

export function useBreakpoint() {
  const screenWidth = ref<number>(window.innerWidth)

  const onResize = () => {
    screenWidth.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('resize', onResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })

  const isSmallAndUp = computed(() => screenWidth.value >= 576)
  const isMediumAndUp = computed(() => screenWidth.value >= 768)
  const isLargeAndUp = computed(() => screenWidth.value >= 992)
  const isExtraLargeAndUp = computed(() => screenWidth.value >= 1200)

  return {
    screenWidth,
    isSmallAndUp,
    isMediumAndUp,
    isLargeAndUp,
    isExtraLargeAndUp,
  }
}
