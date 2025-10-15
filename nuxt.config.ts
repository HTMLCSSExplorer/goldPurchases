// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: false,
  devtools: { enabled: false },

  css: ['~~/app/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    haramKey: process.env.haramKey,
    haramHost: process.env.haramHost,

    public: {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
      haramUrl: process.env.haramUrl,
    },
  },

  modules: ['@nuxt/eslint', '@nuxt/ui', '@vueuse/nuxt'],
});
