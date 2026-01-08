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
    "@pinia/nuxt",
    "@nuxt/image",
  ],
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
    },
  },
  routeRules: {
    "/": { prerender: true },
    "/crew": { prerender: true },
    "/crew/**": { swr: 60 * 60 * 24 * 365 },
    "/destinations": { prerender: true },
    "/destinations/**": { swr: 60 * 60 * 24 * 365 },
    "/technology": { prerender: true },
    "/technology/**": { swr: 60 * 60 * 24 * 365 },
  },
});
