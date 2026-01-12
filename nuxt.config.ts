import { useData } from "./app/composables";

const { menus } = useData();

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Space Tourism",
      htmlAttrs: {
        lang: "en",
      },
    },
    pageTransition: {
      name: "slide",
      mode: "out-in",
    },
  },
  nitro: {
    preset: "vercel",
  },
  css: ["@/assets/main.scss"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  experimental: {
    defaults: {
      nuxtLink: {
        prefetch: true,
        prefetchOn: { visibility: true },
      },
    },
  },
  modules: [
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Bellefair: [400],
          Barlow: [400],
          "Barlow Condensed": [400, 700],
        },
        display: "swap",
        preload: true,
      },
    ],
    "@nuxt/image",
  ],
  routeRules: Object.fromEntries(
    menus
      .flatMap((menu) => menu.routes)
      .map((path) => [path, { prerender: true }])
  ),
});
