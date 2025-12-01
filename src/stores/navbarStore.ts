import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { navbarMenu } from '@config'

export const useNavbar = defineStore('navbarStore', () => {
  const menus = reactive<{ page: string; active: boolean }[]>(
    navbarMenu.map((item, index) => ({
      page: item,
      active: index === 0 ? true : false,
    })),
  )

  const currActiveIndex = ref<number>(0)
  const isExpanded = ref<boolean>(false)

  function toogleNavbar() {
    isExpanded.value = !isExpanded.value
  }

  function closeNavbar() {
    isExpanded.value = false
  }

  function updateActiveNavbar(index: number) {
    const current = menus[currActiveIndex.value]

    if (!current) return

    current.active = false
    currActiveIndex.value = index

    const newCurrent = menus[currActiveIndex.value]

    if (!newCurrent) return

    newCurrent.active = true
  }

  return {
    menus,
    isExpanded,
    toogleNavbar,
    updateActiveNavbar,
    closeNavbar,
  }
})
