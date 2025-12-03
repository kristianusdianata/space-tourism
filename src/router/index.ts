import { navbarMenu } from '@config'
import { useLoading } from '@store'
import { HomeView } from '@views'
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = []

function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

async function pageLoader(menu: string) {
  const store = useLoading()
  store.reset()
  store.startLoading()

  try {
    const module = await import('@views')
    return module[`${capitalize(menu)}View` as keyof typeof module]
  } catch {
    store.stopLoading()
    store.error()
    store.failed()
  } finally {
    store.stopLoading()
    store.clearError()
    store.success()
  }
}

for (const menu of navbarMenu) {
  routes.push({
    path: menu === 'home' ? '/' : `/${menu}`,
    name: menu,
    component: menu === 'home' ? HomeView : () => pageLoader(menu),
    meta: { bodyClass: `bg-${menu}` },
  })
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (from.meta.bodyClass) {
    document.body.classList.remove(from.meta.bodyClass as string)
  }

  if (to.meta.bodyClass) {
    document.body.classList.add(to.meta.bodyClass as string)
  }

  next()
})

export default router
