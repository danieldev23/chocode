<template>
  <p class="text-3xl font-bold text-center mb-3 text-primary">Sắp ra mắt</p>
  <div class="bg-transparent flex space-x-2 mb-3">
    <NuxtLink to="" class="cursor-pointer">
      <img
        src="~/assets/images/header/banner-welcome.png"
        alt="Work illustration"
        class="rounded-lg h-[7rem] object-cover"
    /></NuxtLink>
    <NuxtLink to="" class="cursor-pointer">
      <img
        src="~/assets/images/header/banner-comingsoon.png"
        alt="Work illustration"
        class="rounded-lg h-[7rem]"
    /></NuxtLink>
    <NuxtLink to="" class="cursor-pointer">
      <img
        src="~/assets/images/header/banner-ai.png"
        alt="Work illustration"
        class="rounded-lg h-[7rem]"
    /></NuxtLink>
    <NuxtLink to="" class="cursor-pointer">
      <img
        src="~/assets/images/header/it-forum.png"
        alt="Work illustration"
        class="rounded-lg h-[7rem]"
    /></NuxtLink>
  </div>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-center"
    >
      <h3 class="text-2xl font-bold text-primary mb-1">{{ stat.value }}</h3>
      <p class="text-gray-600 text-sm">{{ stat.label }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const stats = [
  {
    value: "10K+",
    label: "Thành viên tích cực",
  },
  {
    value: "5K+",
    label: "Dự án đã hoàn thành",
  },
  {
    value: "500+",
    label: "Khóa học chất lượng",
  },
  {
    value: "98%",
    label: "Khách hàng hài lòng",
  },
];
</script>
