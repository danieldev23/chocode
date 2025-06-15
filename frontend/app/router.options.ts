import type { RouterConfig } from "nuxt/schema";
import auth from "~/middleware/auth";

export default <RouterConfig>{
  routes: () => {
    return [
      {
        path: "/:pathMatch(.*)*",
        name: "custom-404",
        component: () => import("~/pages/404.vue").then((r) => r.default || r),
      },
      {
        name: "home",
        path: "/",
        alias: ["/trang-chu", "/home"],
        component: () =>
          import("~/pages/home/index.vue").then((r) => r.default || r),
        meta: {
          layout: "home",
        },
      },
      {
        name: "ranking",
        path: "/xep-hang",
        alias: ["/ranking"],
        component: () =>
          import("~/pages/user/ranking.vue").then((r) => r.default || r),
        meta: {},
      },
      {
        name: "search",
        path: "/tim-kiem-viec-lam",
        alias: ["/find-job-freelance"],
        component: () =>
          import("~/pages/home/job-search.vue").then((r) => r.default || r),
        meta: {
          layout: "home",
        },
      },
      {
        name: "about-us",
        path: "/ve-chung-toi",
        alias: ["/about-us"],
        component: () =>
          import("~/pages/about-us.vue").then((r) => r.default || r),
      },
      {
        name: "post",
        path: "/dang-bai/",
        alias: ["/post/"],
        component: () =>
          import("~/pages/job-post/post.vue").then((r) => r.default || r),
        meta: {
          layout: "post-job",
          auth: true,
          middleware: auth,
        },
      },
      {
        name: "forum",
        path: "/thao-luan",
        alias: ["/forum"],
        component: () =>
          import("~/pages/forum/forum.vue").then((r) => r.default || r),
        meta: {
          layout: "forum",
          // auth: true,
          // middleware: auth,
        },
      },
      {
        name: "forum-category",
        path: "/thao-luan/:category",
        alias: ["/forum/:category"],
        component: () =>
          import("~/pages/forum/category.vue").then((r) => r.default || r),
        meta: {
          layout: "forum",
          auth: true,
          middleware: auth,
        },
      },
      {
        name: "forum-detail",
        path: "/thao-luan/bai-dang/:slug",
        alias: ["/forum/post/:slug"],
        component: () =>
          import("~/pages/forum/detail.vue").then((r) => r.default || r),
        meta: {
          layout: "forum",
        },
      },
      // {
      //   name: "marketplace",
      //   path: "/mua-ban",
      //   alias: ["/marketplace"],
      //   component: () =>
      //     import("~/pages/market-place.vue").then((r) => r.default || r),
      // },
      {
        name: "profile",
        path: "/trang-ca-nhan/:username",
        alias: ["/profile/:username"],
        component: () =>
          import("~/pages/user/profile.vue").then((r) => r.default || r),
        meta: {
          layout: "user",
        },
      },
      {
        name: "code-market",
        path: "/mua-ban-source",
        alias: ["/code-market"],
        component: () => import("~/pages/code.vue").then((r) => r.default || r),
        meta: {
          layout: "market-place",
        },
      },
      {
        name: "post-job-detail",
        path: "/viec-freelance/:slug",
        alias: ["/post-job-detail/:slug"],
        component: () =>
          import("~/pages/job-post/detail-post.vue").then(
            (r) => r.default || r
          ),
        meta: {
          layout: "post-job",
        },
      },
      {
        name: "it-job",
        path: "/viec-lam-it",
        alias: "/job-it",
        component: () =>
          import("~/pages/job-it/it-job.vue").then((r) => r.default || r),
        meta: {
          layout: "post-job",
        },
      },
      {
        name: "it-job-detail",
        path: "/chi-tiet-job/:slug",
        component: () =>
          import("~/pages/job-it/it-job-detail.vue").then(
            (r) => r.default || r
          ),
        meta: {
          layout: "post-job",
        },
      },
      {
        name: "notification",
        path: "/thong-bao",
        alias: ["/notifications"],
        component: () =>
          import("~/pages/notification.vue").then((r) => r.default || r),
        meta: {
          auth: true,
          middleware: "auth",
        },
      },
      {
        name: "auth-google",
        path: "/auth/callback",
        component: () =>
          import("~/pages/auth/callback.vue").then((r) => r.default || r),
        meta: {
          layout: "auth",
        },
      },
      {
        name: "auth/login",
        path: "/auth/dang-nhap",
        alias: ["/auth/login"],
        component: () =>
          import("~/pages/auth/login.vue").then((r) => r.default || r),
        meta: {
          layout: "auth",
        },
      },
      {
        name: "auth/register",
        path: "/auth/dang-ky",
        alias: ["/auth/register"],
        component: () =>
          import("~/pages/auth/register.vue").then((r) => r.default || r),
        meta: {
          layout: "auth",
        },
      },
      {
        name: "ranking/developers",
        path: "/xep-hang/developer",
        alias: ["/ranking/developers"],
        component: () =>
          import("~/pages/ranking/ranking.vue").then((r) => r.default || r),
      },
      {
        name: "transaction-history",
        path: "/lich-su-giao-dich",
        alias: ["/transaction-history"],
        component: () =>
          import("~/pages/user/transaction-history.vue").then(
            (r) => r.default || r
          ),
        meta: {
          layout: "post-job",
          auth: true,
          middleware: "auth",
        },
      },
    ];
  },
};
