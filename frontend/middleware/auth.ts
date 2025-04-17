export default defineNuxtRouteMiddleware((to, from) => {
  const { status } = useAuth();
  if (status.value === "unauthenticated" && to.meta.auth) {
    ElMessage({
      message: "Bạn cần đăng nhập để truy cập trang này!",
      type: "warning",
      duration: 3000,
      showClose: true,
    });
    return navigateTo("/");
  }
});
