<template>
  <div class="my-4">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg font-semibold text-gray-900">
        {{ title }}
      </h2>
      <NuxtLink
        class="text-primary text-sm font-medium hover:text-blue-700 transition-colors flex items-center"
        to="/viec-lam-freelance"
      >
        Xem thêm
        <ArrowRight class="w-4 h-4 ml-1" />
      </NuxtLink>
    </div>

    <!-- Skeleton Loading -->
    <div v-if="isLoading" class="space-y-4">
      <div
        v-for="i in 3"
        :key="i"
        class="bg-white rounded-lg border border-gray-200 p-6"
      >
        <div class="animate-pulse">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
            <div class="space-y-2 flex-1">
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div class="space-y-3">
            <div class="h-3 bg-gray-200 rounded"></div>
            <div class="h-3 bg-gray-200 rounded w-2/3"></div>
            <div class="flex space-x-2">
              <div class="h-6 bg-gray-200 rounded-full w-16"></div>
              <div class="h-6 bg-gray-200 rounded-full w-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Job List -->
    <div
      v-else-if="paginatedJobs.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <article
        v-for="job in paginatedJobs"
        :key="job.id"
        class="bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
      >
        <!-- Job Header -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-start space-x-3 flex-1 min-w-0">
            <NuxtImg
              :src="job.user?.avatar"
              loading="lazy"
              class="w-10 h-10 rounded-full object-cover shrink-0"
              alt="Avatar"
            />
            <div class="min-w-0 flex-1">
              <NuxtLink
                :to="`/viec-freelance/${job.slug}`"
                class="font-medium text-gray-900 hover:text-primary transition-colors line-clamp-2 leading-snug"
              >
                {{ job.title || "Chưa có tiêu đề" }}
              </NuxtLink>
              <div class="flex items-center space-x-4 mt-1">
                <NuxtLink
                  :to="`/trang-ca-nhan/${job.user?.username || 'unknown'}`"
                  class="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {{ job.user?.fullName || job.userId || "Không xác định" }}
                </NuxtLink>
                <span class="text-sm text-gray-500 flex items-center">
                  <MapPin class="w-3 h-3 mr-1" />
                  {{ job.location || "Remote" }}
                </span>
              </div>
            </div>
          </div>

          <button
            @click="saveJob(job.id)"
            class="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-50 rounded-md transition-colors shrink-0"
            aria-label="Lưu công việc"
          >
            <Heart class="w-4 h-4" />
          </button>
        </div>

        <!-- Job Details -->
        <div class="space-y-3">
          <!-- Salary and Deadline -->
          <div class="flex flex-wrap items-center gap-4 text-sm">
            <div class="font-medium text-gray-900">
              {{ formatCurrency(job.salaryMin) }} -
              {{ formatCurrency(job.salaryMax) }}
            </div>
            <div class="text-gray-600 flex items-center">
              <Calendar class="w-4 h-4 mr-1" />
              {{ formatDeadline(job.deadline) }}
            </div>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2">
            <NuxtLink
              v-if="job.tags?.length"
              class="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md hover:bg-blue-100 transition-colors"
              :to="`/tim-kiem-viec-lam?danh-muc=${job.tags[0]}`"
            >
              {{ job.tags[0] }}
            </NuxtLink>
            <NuxtLink
              v-for="(tech, index) in job.technologies?.slice(0, 3)"
              :key="index"
              class="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-200 transition-colors"
              :to="`/tim-kiem-viec-lam?q=${tech}`"
            >
              {{ tech }}
            </NuxtLink>
            <span
              v-if="job.technologies && job.technologies.length > 3"
              class="inline-flex items-center px-2.5 py-1 text-gray-500 text-xs"
            >
              +{{ job.technologies.length - 3 }} thêm
            </span>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between pt-2">
            <button
              @click="applyForJob(job.id, job.title)"
              class="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Ứng tuyển ngay
              <Send class="w-4 h-4 ml-1.5" />
            </button>

            <span class="text-xs text-gray-500">
              {{ getTimeAgo(job.createdAt) }}
            </span>
          </div>
        </div>
      </article>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div
        class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center"
      >
        <SearchX class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        Chưa có việc làm nào
      </h3>
      <p class="text-gray-500 max-w-sm mx-auto">
        Hiện tại chưa có việc làm phù hợp. Hãy thử tìm kiếm với từ khóa khác
        hoặc quay lại sau.
      </p>
    </div>

    <!-- Pagination -->
    <div v-if="jobs.length > 0" class="flex justify-center mt-8">
      <div class="evergreen-pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[6, 12, 18, 24]"
          background
          layout="total, sizes, prev, pager, next"
          :total="jobs.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ElSkeleton,
  ElNotification,
  ElMessage,
  ElMessageBox,
} from "element-plus";
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

// Props
const props = defineProps<{
  jobs: JobPostingResponseDtoUpdate[];
  isLoading: boolean;
  title: string;
}>();

// Pagination state
const currentPage = ref(1);
const pageSize = ref(6);
const input = ref("");
const jobCategories = availableTags;

// Search state
const state = reactive({
  q: "",
  jobCategory: "",
  location: "",
});

// Computed property for paginated jobs
const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return props.jobs.slice(start, end);
});

// Pagination handlers
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  currentPage.value = 1;
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Utility functions
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

const getTimeAgo = (date: Date | string | null | undefined): string => {
  if (!date) return "";
  const now = new Date();
  const past = new Date(date);
  const diffInMs = now.getTime() - past.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Hôm nay";
  if (diffInDays === 1) return "Hôm qua";
  if (diffInDays < 7) return `${diffInDays} ngày trước`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} tuần trước`;
  return `${Math.floor(diffInDays / 30)} tháng trước`;
};

const applyForJob = (jobId: number, jobTitle: string) => {
  if (status.value === "unauthenticated") {
    ElMessage({
      message: "Bạn cần đăng nhập để ứng tuyển!",
      type: "warning",
      duration: 3000,
      showClose: true,
    });
    return navigateTo("/dang-nhap");
  }

  ElMessageBox.confirm(
    `Bạn có chắc chắn muốn ứng tuyển công việc "${jobTitle}"?`,
    "Xác nhận ứng tuyển",
    {
      confirmButtonText: "Ứng tuyển",
      cancelButtonText: "Hủy",
      type: "info",
    }
  )
    .then(() => {
      ElNotification({
        title: "Thành công",
        message: "Ứng tuyển thành công!",
        type: "success",
      });
    })
    .catch(() => {
      // User cancelled
    });
};

const saveJob = (jobId: number) => {
  if (status.value === "unauthenticated") {
    ElMessage({
      message: "Bạn cần đăng nhập để lưu công việc!",
      type: "warning",
      duration: 3000,
      showClose: true,
    });
    return navigateTo("/dang-nhap");
  }

  ElNotification({
    title: "Đã lưu",
    message: "Công việc đã được lưu vào danh sách yêu thích",
    type: "success",
  });
};

// Watch for jobs change and reset pagination
watch(
  () => props.jobs,
  (newJobs) => {
    if (
      newJobs.length > 0 &&
      currentPage.value > Math.ceil(newJobs.length / pageSize.value)
    ) {
      currentPage.value = 1;
    }
  }
);
</script>

<style scoped>
/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Evergreen Pagination Styles */
:deep(.evergreen-pagination) {
  --el-pagination-font-size: 14px;
  --el-pagination-bg-color: white;
  --el-pagination-text-color: #374151;
  --el-pagination-border-radius: 6px;
  --el-pagination-button-color: #6b7280;
  --el-pagination-button-width: 32px;
  --el-pagination-button-height: 32px;
  --el-pagination-item-gap: 4px;
  --el-pagination-hover-color: #f3f4f6;
  --el-color-primary: #3b82f6;
}

:deep(.evergreen-pagination .el-pagination) {
  gap: 8px;
}

:deep(.evergreen-pagination .el-pagination__total) {
  color: #6b7280;
  font-weight: 400;
}

:deep(.evergreen-pagination .el-pagination__sizes .el-select) {
  --el-select-input-focus-border-color: #3b82f6;
}

:deep(.evergreen-pagination .el-pagination__sizes .el-input__wrapper) {
  box-shadow: none !important;
  border: 1px solid #d1d5db !important;
  border-radius: 6px !important;
  padding: 0 8px !important;
}

:deep(.evergreen-pagination .el-pager li) {
  border-radius: 6px !important;
  border: 1px solid #e5e7eb !important;
  background: white !important;
  color: #374151 !important;
  font-weight: 400 !important;
  margin: 0 2px !important;
}

:deep(.evergreen-pagination .el-pager li:hover) {
  background: #f3f4f6 !important;
  border-color: #d1d5db !important;
}

:deep(.evergreen-pagination .el-pager li.is-active) {
  background: #3b82f6 !important;
  border-color: #3b82f6 !important;
  color: white !important;
  font-weight: 500 !important;
}

:deep(.evergreen-pagination .btn-prev, .evergreen-pagination .btn-next) {
  border-radius: 6px !important;
  border: 1px solid #e5e7eb !important;
  background: white !important;
  color: #374151 !important;
  font-weight: 400 !important;
  margin: 0 2px !important;
}

:deep(
    .evergreen-pagination .btn-prev:hover,
    .evergreen-pagination .btn-next:hover
  ) {
  background: #f3f4f6 !important;
  border-color: #d1d5db !important;
}

:deep(
    .evergreen-pagination .btn-prev:disabled,
    .evergreen-pagination .btn-next:disabled
  ) {
  background: #f9fafb !important;
  border-color: #e5e7eb !important;
  color: #d1d5db !important;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform,
    box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Accessibility improvements */
article:focus-within {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

button:focus-visible,
a:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
