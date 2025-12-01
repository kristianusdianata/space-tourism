import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { HomeView } from '@views'
import { navbarMenu } from '@config'

const routes: RouteRecordRaw[] = []

function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

for (const menu of navbarMenu) {
  const path = menu === 'home' ? '/' : `/${menu}`
  const name = menu

  const module = await import('@views')
  const component =
    menu === 'home' ? HomeView : module[`${capitalize(menu)}View` as keyof typeof module]

  const meta = { bodyClass: `bg-${menu}` }

  routes.push({
    path: path,
    name: name,
    component,
    meta,
  })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
