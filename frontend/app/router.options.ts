import type { RouterConfig } from "nuxt/schema";

export default <RouterConfig>{
  routes: () => {
    return [
      {
        name: "home",
        path: "/",
        alias: ["/trang-chu"], 
        component: () => import("~/pages/home.vue").then((r) => r.default || r),
      },
    ];
  },
};
