<template>
  <HomeJobs :jobs="jobsSearch || []" :is-loading="isLoading" :title="title" />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { JobPostingResponseDtoUpdate } from "~/interfaces/job.interface";

// Route & Params
const route = useRoute();

// Loading & Result
const isLoading = ref(false);
const jobsSearch = ref<JobPostingResponseDtoUpdate[] | null>(null);
const errorMessage = ref("");
const title = ref("");
// Hàm fetch data để có thể tái sử dụng
const fetchJobs = async () => {
  try {
    isLoading.value = true;
    const q = (route.query.q as string) || "";
    const category = (route.query["danh-muc"] as string) || "";
    const location = (route.query["dia-diem"] as string) || "";

    const response = await jobPostingService.jobPostControllerSeacrhByCategory(
      q as string,
      category as string,
      location as string
    );

    console.log("Searching for:", q, category, location);
    if ((response as any).data.data.length) {
      title.value = `🔍 Tìm thấy ${
        (response as any).data.data.length
      } việc làm phù hợp`;
    } else {
      title.value = `😟 Không tìm thấy việc làm nào!`;
    }
    jobsSearch.value = (response as any).data.data || [];
    console.log(response);
  } catch (error: any) {
    console.error("Lỗi khi tìm kiếm việc làm:", error);
    errorMessage.value = error.message || "Có lỗi xảy ra khi tìm kiếm việc làm";
    jobsSearch.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Gọi API khi component được mount lần đầu
onMounted(fetchJobs);

// Theo dõi sự thay đổi của query params
watch(
  () => route.query,
  () => {
    fetchJobs();
  },
  { deep: true }
);
</script>
