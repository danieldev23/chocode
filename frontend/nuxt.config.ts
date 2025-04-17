// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/'
      ],
      ignore: ['/code'] 
    }
  },
  vite: {
    server: {
      fs: {
        allow: [
          '..',
          './', // always allow root
          '/Users/macbook/Documents/Projects/node_modules' // <-- allow this path
        ]
      }
    },
    optimizeDeps: {
      include: ['axios'] // <-- help Vite resolve axios
    }
  },
  build: {
    transpile: ['@tinymce/tinymce-vue']
  },
  compatibilityDate: "2024-11-01",
  css: ["~/assets/css/main.css"],
  image: {
    dir: 'assets/images'
  },
  modules: [
    "@element-plus/nuxt",
    '@pinia/nuxt',
    "@sidebase/nuxt-auth",
    "@nuxt/image",
  ],
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      BASE_API_URL: process.env.API_BASE || 'http://localhost:3001/api',
    }
  },
  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    originEnvKey: "AUTH_ORIGIN",
    baseURL: "http://localhost:3001/api/auth",
    provider: {
      type: "local",
      endpoints: {
        signIn: { path: "/login", method: "post" },
        signOut: false,
        signUp: { path: "/register", method: "post" },
        getSession: {
          path: "me",
          method: "get",
        },
      },
      pages: {
        login: "/",
      },

      token: {
        maxAgeInSeconds: 30 * 24 * 60 * 60,
        type: "Bearer",
        headerName: "Authorization",
        signInResponseTokenPointer: "/accessToken",
      },
      session: {
        dataResponsePointer: "/",
        dataType: {
          id: "number",
          username: "string",
          fullName: "string",
          role: "string",
          active: "string",
          email: "string",
          avatar: "string",
          bio: "string",
        },
      },
    },
    globalAppMiddleware: false,
    sessionRefresh: {
      enablePeriodically: false,
      enableOnWindowFocus: false,
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});