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
      {
        name: "post",
        path: "/bai-dang/:slug",
        alias: ["/post/:slug"],
        component: () => import("~/pages/post.vue").then((r) => r.default || r),
      },
      {
        name: "forum",
        path: "/thao-luan",
        alias: ["/forum"],
        component: () =>
          import("~/pages/forum.vue").then((r) => r.default || r),
        meta: {
          layout: "forum",
        },
      },
      {
        name: "marketplace",
        path: "/mua-ban",
        alias: ["/marketplace"],
        component: () =>
          import("~/pages/market-place.vue").then((r) => r.default || r),
      },
      {
        name: "profile",
        path: "/trang-ca-nhan/:username",
        alias: ["/profile/:username"],
        component: () =>
          import("~/pages/profile.vue").then((r) => r.default || r),
        meta: {
          layout: "user",
        },
      },
    ];
  },
};
