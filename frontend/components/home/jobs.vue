<template>
  <div>
    <!-- Search Section with semantic HTML -->

    <!-- Header-->
    <div class="flex justify-between items-center mt-6 mb-3">
      <h1 class="text-xl font-semibold text-gray-800 flex items-center">
        {{ title }}
      </h1>
      <NuxtLink
        class="text-primary text-base font-medium hover:text-primary transition flex items-center"
        to="/viec-lam-freelance"
      >
        Xem thêm
        <ArrowRight class="w-4 h-4 ml-1" />
      </NuxtLink>
    </div>

    <!-- Skeleton Loading -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <el-skeleton :rows="6" animated class="w-full" />
      <el-skeleton :rows="6" animated class="w-full" />
    </div>

    <!-- Job List or Empty State -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-if="jobs.length === 0"
        class="text-center text-gray-500 py-2 col-span-full"
      >
        <SearchX class="w-8 h-8 mx-auto text-gray-400 mb-2" />
        Hiện tại chưa có việc làm nào.
      </div>

      <div
        v-for="job in jobs"
        :key="job.id"
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition duration-300 mb-0"
      >
        <!-- Job Header -->
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
        >
          <div class="flex items-center mb-3 sm:mb-0">
            <NuxtImg
              :src="job.user?.avatar"
              loading="lazy"
              class="w-16 h-16 rounded-full object-cover mr-4"
              alt="Avatar"
            />
            <div>
              <NuxtLink
                :to="`/viec-freelance/${job.slug}`"
                class="text-base font-semibold cursor-pointer line-clamp-1 hover:underline hover:text-primary"
              >
                {{ job.title || "Chưa có tiêu đề" }}
              </NuxtLink>
              <div
                class="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm text-gray-600 mt-1"
              >
                <NuxtLink
                  :to="`/trang-ca-nhan/${job.user?.username || 'unknown'}`"
                  class="flex items-center"
                >
                  <User class="w-4 h-4 mr-1 text-gray-500" />
                  {{ job.user?.fullName || job.userId || "Không xác định" }}
                </NuxtLink>
                <div class="flex items-center">
                  <MapPin class="w-4 h-4 mr-1 text-gray-500" />
                  {{ job.location || "Remote" }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Salary and Deadline -->
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
        >
          <div class="text-primary font-medium text-base mb-2 sm:mb-0">
            <DollarSign class="w-4 h-4 inline mr-1" />
            {{ formatCurrency(job.salaryMin) }} -
            {{ formatCurrency(job.salaryMax) }}
          </div>
          <div class="text-gray-600 text-sm">
            <Calendar class="w-4 h-4 inline mr-1" />
            Hạn nhận hồ sơ: {{ formatDeadline(job.deadline) }}
          </div>
        </div>

        <!-- Tags and Technologies -->
        <div class="flex flex-wrap gap-2 mb-4">
          <NuxtLink
            v-if="job.tags?.length"
            class="bg-blue-100 text-primary text-xs font-medium px-2.5 py-1 rounded-full"
            :to="`/tim-kiem-viec-lam?danh-muc=${job.tags[0]}`"
          >
            {{ job.tags[0] }}
          </NuxtLink>
          <NuxtLink
            v-for="(tech, index) in job.technologies"
            :key="index"
            class="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full"
            :to="`/tim-kiem-viec-lam?q=${tech}`"
          >
            {{ tech }}
          </NuxtLink>
        </div>

        <!-- Actions -->
        <div class="flex justify-between items-center">
          <button
            @click="applyForJob(job.id, job.title)"
            class="bg-primary text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-blue-700 transition duration-150 flex items-center"
          >
            Nhận job ngay!
            <Send class="w-4 h-4 ml-1" />
          </button>
          <button
            @click="saveJob(job.id)"
            class="text-red-500 hover:text-red-600 p-2 rounded-full transition duration-150"
            aria-label="Lưu công việc'"
          >
            <Heart class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-6">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        background
        layout="prev, pager, next"
        :total="totalItems"
        class="items-center"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElSkeleton, ElNotification } from "element-plus";
import {
  User,
  MapPin,
  DollarSign,
  Calendar,
  Flame,
  ArrowRight,
  SearchX,
  Send,
  Search,
  List,
  X,
  ChevronDown,
  Heart,
} from "lucide-vue-next";
import { availableTags } from "@/types/tags";
import type { JobPostingResponseDtoUpdate } from "~/interfaces/job.interface";
const router = useRouter();
defineProps<{
  jobs: JobPostingResponseDtoUpdate[];
  isLoading: boolean;
  title: string;
}>();

const input = ref("");
const jobCategories = availableTags;
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(100);

// Search state with default values
const state = reactive({
  q: "",
  jobCategory: "",
  location: "",
});

function handlePageChange(page: number) {
  currentPage.value = page;
  fetchData();
}

function fetchData() {
  // Gọi API hoặc xử lý data tương ứng page hiện tại
  console.log("Fetching page", currentPage.value);
}
// Search handler with analytics tracking
const handleSearch = () => {
  const params = new URLSearchParams();

  if (input.value) {
    params.append("q", input.value);
  }
  if (state.jobCategory) params.append("danh-muc", state.jobCategory);
  if (state.location) params.append("dia-diem", state.location);

  router.push(`/tim-kiem-viec-lam?${params.toString()}`);

  // Search logic implementation would go here
};

const { status } = useAuth();
const formatCurrency = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return "0 đ";
  return new Intl.NumberFormat("vi-VN").format(value * 1) + " đ";
};

const formatDeadline = (deadline: Date | string | null | undefined): string => {
  if (!deadline) return "Không có hạn";
  const date = new Date(deadline);
  if (isNaN(date.getTime())) return "Không xác định";
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const applyForJob = (jobId: number, jobTitle: string) => {
  if (status.value === "unauthenticated") {
    ElMessage({
      message: "Bạn cần đăng nhập để apply job!",
      type: "warning",
      duration: 3000,
      showClose: true,
    });
    return navigateTo("/trang-chu");
  }
  ElMessageBox.confirm(`Bạn chắc chắc muốn apply job ${jobTitle}`, {
    confirmButtonText: "Chắc chắn",
    cancelButtonText: "Huỷ",
    type: "warning",
  });
};

const saveJob = (jobId: number) => {
  if (status.value === "unauthenticated") {
    ElMessage({
      message: "Bạn cần đăng nhập để lưu job này!",
      type: "warning",
      duration: 3000,
      showClose: true,
    });
    return navigateTo("/trang-chu");
  }
  ElNotification({
    title: "Thành công",
    message: "Lưu việc làm thành công",
    type: "success",
  });
  console.log("Job saved:", jobId);
};
</script>

<style>
.hero-section {
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(0, 105, 148, 1) 15.6%,
    rgba(0, 163, 217, 1) 51.9%,
    rgba(0, 194, 226, 1) 81%
  );
}
</style>
