<template>
  <div>
    <!-- Search Section with semantic HTML -->
    <section
      class="bg-primary-gradient py-6 px-4 my-6 rounded-md"
      aria-label="Tìm kiếm việc làm"
    >
      <div class="text-center mb-2">
        <h1 class="text-white text-xl md:text-3xl font-medium">
          Kết nối với dự án IT Freelance hot nhất thị trường
        </h1>
      </div>

      <div class="text-center mb-6">
        <p class="text-white text-sm md:text-base">
          Tiếp cận <span class="font-bold">40,000+</span> cơ hội freelance công
          nghệ mới mỗi ngày từ các startup và doanh nghiệp hàng đầu Việt Nam
        </p>
      </div>

      <!-- Improved Search Bar with proper labeling -->
      <div class="max-w-5xl mx-auto">
        <form
          @submit.prevent="handleSearch"
          class="flex flex-col md:flex-row items-stretch border border-primary rounded-md overflow-hidden shadow-lg bg-white transition-all hover:shadow-xl"
          role="search"
          aria-label="Tìm kiếm việc làm"
        >
          <!-- Job Category Select -->
          <div
            class="relative flex-1 w-full border-b md:border-b-0 md:border-r border-gray-200 group hover:bg-gray-50 transition-colors"
          >
            <label for="job-category" class="sr-only">Danh mục Nghề</label>
            <div class="flex items-center h-full px-4 py-3">
              <List
                class="text-primary mr-3 flex-shrink-0 w-5 h-5"
                aria-hidden="true"
              />
              <el-select
                id="job-category"
                v-model="state.jobCategory"
                placeholder="Danh mục Nghề"
                clearable
                class="flex-1 !border-none !shadow-none w-full !text-gray-700"
                popper-class="!rounded-md !shadow-lg"
              >
                <el-option
                  v-for="item in jobCategories"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </div>
          </div>

          <!-- Search Input - Được điều chỉnh để giống với các dropdown -->
          <div
            class="relative flex-1 w-full border-b md:border-b-0 md:border-r border-gray-200 group hover:bg-gray-50 transition-colors"
          >
            <label for="search-keywords" class="sr-only"
              >Từ khóa tìm kiếm</label
            >
            <div class="flex items-center h-full px-4 py-3">
              <Search
                class="text-primary mr-3 flex-shrink-0 w-5 h-5"
                aria-hidden="true"
              />
              <el-input
                id="search-keywords"
                v-model="input"
                placeholder="Website, Javascript, Php,..."
                class="flex-1 !border-none !shadow-none !text-gray-700 bg-transparent"
              />
              <button
                v-if="input"
                @click="input = ''"
                class="text-gray-400 hover:text-primary flex-shrink-0 transition-colors ml-2"
                aria-label="Xóa từ khóa tìm kiếm"
                type="button"
              >
                <X class="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <!-- Location Select -->
          <div
            class="relative flex-1 w-full border-b md:border-b-0 md:border-r border-gray-200 group hover:bg-gray-50 transition-colors"
          >
            <label for="location-select" class="sr-only">Địa điểm</label>
            <div class="flex items-center h-full px-4 py-3">
              <MapPin
                class="text-primary mr-3 flex-shrink-0 w-5 h-5"
                aria-hidden="true"
              />
              <el-select
                id="location-select"
                v-model="state.location"
                placeholder="Địa điểm"
                clearable
                class="flex-1 !border-none !shadow-none w-full !text-gray-700"
                popper-class="!rounded-md !shadow-lg"
              >
                <el-option
                  v-for="location in locations"
                  :value="location"
                  :label="location"
                />
              </el-select>
            </div>
          </div>

          <!-- Search Button -->
          <div class="md:flex-shrink-0 p-3">
            <button
              type="submit"
              class="w-full px-4 py-2 rounded-full md:rounded-full flex items-center justify-center bg-primary-gradient hover:bg-primary-dark transition-all text-white font-medium"
            >
              <Search class="w-5 h-5 mr-2" aria-hidden="true" />
              <span>Tìm kiếm</span>
            </button>
          </div>
        </form>
      </div>
    </section>
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
            class="bg-primary-gradient text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-blue-700 transition duration-150 flex items-center"
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
import { locations } from "@/types/locations";
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

// Search state with default values
const state = reactive({
  q: "",
  jobCategory: "",
  location: "",
});

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
