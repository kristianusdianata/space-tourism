import { defineStore } from 'pinia'
import { ref } from 'vue'

interface ArgTypes<T extends unknown[]> {
  storeId: string
  listItems: T
}

export function useHero<T extends unknown[]>(args: ArgTypes<T>) {
  const { storeId, listItems } = args

  return defineStore(storeId, () => {
    const items = listItems as T
    const prevActiveIndex = ref<number>(0)
    const currActiveIndex = ref<number>(0)
    const startAnimation = ref<boolean>(false)

    function updateActiveIndex(index: number) {
      prevActiveIndex.value = currActiveIndex.value
      currActiveIndex.value = index
      startAnimation.value = true
    }

    function stopAnimation() {
      startAnimation.value = false
    }

    return {
      items,
      currActiveIndex,
      prevActiveIndex,
      startAnimation,
      updateActiveIndex,
      stopAnimation,
    }
  })
}
