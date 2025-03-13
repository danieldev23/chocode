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
      {
        name: "code-market",
        path: "/mua-ban-source",
        alias: ["/code-market"],
        component: () =>
          import("~/pages/code.vue").then((r) => r.default || r),
        meta: {
          layout: "market-place",
        },
      },
      {
        name: "post-job-detail",
        path: "/viec-freelance",
        alias: ["/post-job-detail"],
        component: () => import("~/pages/detail-post.vue").then((r) => r.default || r),
        meta: {
          layout: "post-job"
        }
      }
    ];
  },
};
