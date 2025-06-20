export default defineNuxtConfig({
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ["/"],
    },
  },
  vite: {
    server: {
      fs: {
        allow: ["..", "./", "/Users/macbook/Documents/Projects/node_modules"],
      },
    },
    optimizeDeps: {
      include: ["axios"],
    },
  },
  build: {
    transpile: ["@tinymce/tinymce-vue"],
  },
  compatibilityDate: "2024-11-01",
  css: ["~/assets/css/main.css"],
  image: {
    dir: "assets/images",
  },
  modules: [
    "@element-plus/nuxt",
    "@pinia/nuxt",
    "@sidebase/nuxt-auth",
    "@nuxt/image",
    "nuxt-socket-io",
  ],
  io: {
    sockets: [
      {
        name: "main",
        url: process.env.SOCKET_URL,
      },
    ],
  },
  devtools: { enabled: false },
  runtimeConfig: {
    geminiApiKey: process.env.GEMINI_API_KEY,
    AUTH_ORIGIN: process.env.AUTH_ORIGIN,
    public: {
      BASE_API_URL: process.env.API_BASE,
    },
  },
  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    originEnvKey: "AUTH_ORIGIN",
    baseURL: `${process.env.API_BASE}/auth`,
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
