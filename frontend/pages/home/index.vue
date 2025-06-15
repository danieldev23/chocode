<template>
  <HomeJobs :jobs="jobs" :is-loading="isLoading" :title="title" />
  <!-- <HomeBanner /> -->
</template>

<script setup lang="ts">
setupSeoFromSettingObject({
  title:
    "ChoCode – Dev giỏi khỏi lo, job chất khỏi tìm, nền tảng chuẩn cho dân IT chính hiệu!",
  description:
    "ChoCode là nền tảng freelance dành riêng cho dân IT chính hiệu – nơi Dev giỏi không còn lo thiếu việc, khách hàng dễ dàng tìm được lập trình viên chất lượng. Dù bạn là freelancer đang săn job hay doanh nghiệp cần thuê Dev, ChoCode đều có giải pháp phù hợp!",
});
const title = `🔥
        Việc làm HOT nhất!`;
const {
  data: jobs,
  pending: isLoading,
  error,
} = await useAsyncData(
  "jobs",
  () =>
    jobPostingService
      .jobPostControllerFindAll()
      .then((res) => (res as any).data.data || []),
  { server: true }
);
</script>
