<template>
  <HomeJobs :jobs="jobs" :is-loading="isLoading" />
  <!-- <HomeBanner /> -->
</template>

<script setup lang="ts">
useSeoMeta({
  title: "ChoCode.com - Nền tảng việc làm Freelance cho Developer",
  description:
    "ChoCode.com là nền tảng kết nối Freelancer với người thuê, giúp Developer tìm việc dễ dàng và người thuê tìm Freelancer uy tín. Đăng ký ngay để tham gia cộng đồng công nghệ hàng đầu!",
  ogTitle: "ChoCode.com - Freelance Platform for Developers",
  ogDescription:
    "Kết nối Freelancer với khách hàng nhanh chóng, đáng tin cậy. Nền tảng hàng đầu giúp Developer kiếm việc làm và phát triển sự nghiệp.",
  ogImage: "https://choCode.com/assets/og-image.png",
  ogUrl: "https://choCode.com",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: "ChoCode.com - Nền tảng việc làm Freelance cho Developer",
  twitterDescription:
    "Tìm việc làm Freelancer hoặc thuê Developer uy tín chỉ với vài cú click tại ChoCode.com!",
  twitterImage: "https://choCode.com/assets/twitter-image.png",
});
const {
  data: jobs,
  pending: isLoading,
  error,
} = await useAsyncData("jobs", () =>
  jobPostingService
    .jobPostControllerFindAll()
    .then((res) => (res as any).data.data || []),
    { server: true}
);
</script>
