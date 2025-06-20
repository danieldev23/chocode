<template>
  <div class="space-y-8">
    <HomeJobs :jobs="jobs" :is-loading="isLoading" :title="title" />
    <HomeTopDevelopers
      :developers="topDevelopers"
      :is-loading="isLoadingDevelopers"
      :title="topDevelopersTitle"
    />
    <!-- <HomeBanner /> -->
  </div>
</template>

<script setup lang="ts">
setupSeoFromSettingObject({
  title:
    "ChoCode – Dev giỏi khỏi lo, job chất khỏi tìm, nền tảng chuẩn cho dân IT chính hiệu!",
  description:
    "ChoCode là nền tảng freelance dành riêng cho dân IT chính hiệu – nơi Dev giỏi không còn lo thiếu việc, khách hàng dễ dàng tìm được lập trình viên chất lượng. Dù bạn là freelancer đang săn job hay doanh nghiệp cần thuê Dev, ChoCode đều có giải pháp phù hợp!",
});

const title = `🔥 Việc làm HOT nhất!`;
const topDevelopersTitle = `👑 Developer uy tín nhất!`;

const jobs = ref([])
const isLoading = ref(false)
const error = ref(null)

const topDevelopers = ref([])
const isLoadingDevelopers = ref(false)
const developersError = ref(null)

// Gọi API khi component mounted
onMounted(() => {
  // Fetch jobs
  isLoading.value = true
  jobPostingService.jobPostControllerFindAll()
    .then((res) => {
      jobs.value = (res as any).data.data || []
    })
    .catch((err) => {
      error.value = err
    })
    .finally(() => {
      isLoading.value = false
    })

  // Fetch top developers
  isLoadingDevelopers.value = true
  userService.userControllerFindAll()
    .then((res) => {
      topDevelopers.value = res.data;
      console.log(topDevelopers.value);
    })
    .catch((err) => {
      developersError.value = err
    })
    .finally(() => {
      isLoadingDevelopers.value = false
    })
})
</script>
