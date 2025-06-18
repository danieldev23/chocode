<template>
  <div class="min-h-screen bg-gray-25 pt-2 pb-8">
    <div>
      <!-- Breadcrumb -->
      <nav class="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2 text-sm">
          <li>
            <NuxtLink to="/" class="text-gray-600 hover:text-primary transition-colors">
              Trang chủ
            </NuxtLink>
          </li>
          <ChevronRight class="w-4 h-4 text-gray-400" />
          <li>
            <NuxtLink to="/job-post" class="text-gray-600 hover:text-primary transition-colors">
              Việc làm Freelance
            </NuxtLink>
          </li>
          <ChevronRight class="w-4 h-4 text-gray-400" />
          <li class="text-gray-900 font-medium truncate max-w-xs">
            {{ jobDetail?.title }}
          </li>
        </ol>
      </nav>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column (Job Details) -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Job Main Info Card -->
          <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              {{ jobDetail?.title }}
            </h1>

            <!-- Job Meta Information Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign class="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Ngân sách</p>
                  <p class="text-gray-600">
                    {{ formatCurrency(jobDetail?.salaryMin) }} - {{ formatCurrency(jobDetail?.salaryMax) }}
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Địa điểm</p>
                  <p class="text-gray-600">Toàn Quốc</p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award class="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Kinh nghiệm</p>
                  <p class="text-gray-600">1 năm</p>
                </div>
              </div>
            </div>

            <!-- Deadline Info -->
            <div class="flex items-center mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <Clock class="w-5 h-5 text-orange-600 mr-3" />
              <span class="text-orange-800 font-medium">
                Hạn nộp hồ sơ: {{ formatDeadline(jobDetail?.deadline) }}
              </span>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-3">
              <button
                @click="handleApplyClick"
                :loading="loading"
                :disabled="formatDeadline(jobDetail?.deadline) === 'Đã hết hạn'"
                class="flex-1 bg-primary hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <Send class="w-4 h-4 mr-2" />
                {{ loading ? 'Đang xử lý...' : 'Ứng tuyển ngay' }}
              </button>
              
              <button
                @click="save"
                :disabled="formatDeadline(jobDetail?.deadline) === 'Đã hết hạn'"
                class="flex-1 sm:flex-initial bg-white hover:bg-gray-50 disabled:bg-gray-100 border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <Bookmark class="w-4 h-4 mr-2" />
                Lưu tin
              </button>
            </div>
          </div>

          <!-- Job Details Card -->
          <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div class="flex items-center mb-6">
              <div class="w-1 h-6 bg-primary mr-3 rounded-full"></div>
              <h2 class="text-xl font-semibold text-gray-900">Chi tiết tin tuyển dụng</h2>
            </div>

            <!-- Project Images -->
            <div v-if="jobDetail?.image" class="mb-6">
              <img
                :src="jobDetail?.image || CompanyImage"
                alt="Project image"
                class="w-full max-w-md rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                @click="centerDialogVisible = true"
              />
            </div>

            <!-- Job Description -->
            <div class="job-description prose prose-gray max-w-none" v-html="jobDetail?.jobDescription"></div>
          </div>
        </div>

        <!-- Right Column (Company & Info) -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Company Card -->
          <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div class="text-center mb-6">
              <img
                :src="jobDetail?.user?.avatar"
                :alt="jobDetail?.user?.fullName"
                class="w-20 h-20 rounded-full object-cover mx-auto border-4 border-blue-100 mb-3"
              />
              <NuxtLink
                :to="`/trang-ca-nhan/${jobDetail?.user?.username}`"
                class="text-lg font-semibold text-gray-900 hover:text-primary transition-colors"
              >
                {{ jobDetail?.user?.fullName }}
              </NuxtLink>
            </div>

            <div class="space-y-4 mb-6">
              <h3 class="font-semibold text-gray-900">Thông tin dự án</h3>
              
              <div class="flex items-start space-x-3">
                <IdCard class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p class="text-sm font-medium text-gray-900">ID Dự án</p>
                  <p class="text-gray-600">{{ jobDetail?.id }}</p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <CalendarCheck class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p class="text-sm font-medium text-gray-900">Ngày đăng</p>
                  <p class="text-gray-600">
                    {{ jobDetail?.createdAt ? formatPostDate(jobDetail.createdAt.toString()) : "Đang tải" }}
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <MapPin class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p class="text-sm font-medium text-gray-900">Đến từ</p>
                  <p class="text-gray-600">Đà Nẵng</p>
                </div>
              </div>
            </div>

            <NuxtLink
              :to="`/trang-ca-nhan/${jobDetail?.user?.username}`"
              class="w-full bg-primary hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <ExternalLink class="w-4 h-4 mr-2" />
              Ghé thăm trang cá nhân
            </NuxtLink>
          </div>

          <!-- General Information Card -->
          <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Thông tin chung</h3>

            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <UserCheck class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Cấp bậc</p>
                  <p class="text-gray-600">Nhân viên</p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <GraduationCap class="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Học vấn</p>
                  <p class="text-gray-600">Trung cấp trở lên</p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users class="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Số lượng tuyển</p>
                  <p class="text-gray-600">3 người</p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock class="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Hình thức làm việc</p>
                  <p class="text-gray-600">Làm online</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Related Jobs Category Card -->
          <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Danh mục nghề liên quan</h3>
            
            <div class="flex flex-wrap gap-2">
              <span class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                Kinh doanh/Bán hàng
              </span>
              <span class="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                Bất động sản/Xây dựng
              </span>
              <span class="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                Sales Bất động sản
              </span>
              <span class="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
                Kinh doanh nội thất
              </span>
            </div>
          </div>

          <!-- Location Card -->
          <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Khu vực</h3>
            
            <div class="flex flex-wrap gap-2">
              <span class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                Đà Nẵng
              </span>
              <span class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                Cẩm Lệ
              </span>
            </div>
          </div>

          <!-- Suggested Jobs Card -->
          <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Gợi ý việc làm phù hợp</h3>
            
            <div class="border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div class="flex items-start space-x-3 p-4">
                <img
                  src="https://cdn-new.topcv.vn/unsafe/150x/https://static.topcv.vn/company_logos/Ub1FnI8OO8XFJrryvrVSD0vq9gQ3gb7x_1723602274____24eb1708168fa261fc0535d74dddcaa2.jpg"
                  alt="Company logo"
                  class="w-12 h-12 rounded-lg object-cover border border-gray-200"
                />
                <div class="flex-1 min-w-0">
                  <NuxtLink class="text-sm font-medium text-gray-900 hover:text-primary transition-colors line-clamp-1">
                    Senior NodeJS Developer
                  </NuxtLink>
                  <NuxtLink class="text-xs text-gray-600 hover:text-primary transition-colors">
                    CHOCODE SOFTWARE CO,. LTD
                  </NuxtLink>
                </div>
              </div>
              
              <div class="px-4 pb-4 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                    Thỏa thuận
                  </span>
                  <span class="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                    Đà Nẵng
                  </span>
                </div>
                
                <button
                  @click="save"
                  class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Heart class="w-4 h-4 text-gray-500 hover:text-red-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Application Modal -->
      <div v-if="dialogVisible" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="closeDialog"></div>

          <div class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900">{{ modalState.title }}</h3>
            </div>

            <div class="bg-white px-6 py-6">
              <!-- Loading State -->
              <div v-if="modalState.status === 'loading'" class="text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <div class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p class="text-gray-600">Đang kiểm tra số dư...</p>
              </div>

              <!-- Success State -->
              <div v-else-if="modalState.status === 'success'" class="text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle class="w-8 h-8 text-green-600" />
                </div>
                
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Đủ điều kiện nhận job này!</h3>
                
                <div class="bg-gray-50 rounded-lg p-4 mb-6">
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600">Số dư tài khoản:</span>
                    <span class="font-semibold text-gray-900">{{ userBalance }} CP</span>
                  </div>
                </div>

                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h4 class="font-medium text-blue-900 mb-3">Thông tin khách hàng</h4>
                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                      <span class="text-blue-700">Họ tên:</span>
                      <span class="text-blue-900 font-medium">{{ jobDetail?.user?.fullName }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-blue-700">Email:</span>
                      <span class="text-blue-900 font-medium">contact@chocode.dev</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-blue-700">SĐT:</span>
                      <span class="text-blue-900 font-medium">0349 845 3984</span>
                    </div>
                  </div>
                </div>

                <button
                  @click="confirmApply"
                  class="w-full bg-primary hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Xác nhận ứng tuyển
                </button>
              </div>

              <!-- Error State -->
              <div v-else-if="modalState.status === 'error'" class="text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <AlertCircle class="w-8 h-8 text-red-600" />
                </div>
                
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Không đủ số dư</h3>
                
                <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                      <span class="text-red-700">Số dư hiện tại:</span>
                      <span class="font-semibold text-red-900">{{ userBalance }} CP</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-red-700">Số dư cần thiết:</span>
                      <span class="font-semibold text-red-900">6 CP</span>
                    </div>
                  </div>
                </div>

                <div class="space-y-3">
                  <button
                    @click="goToRecharge"
                    class="w-full bg-primary hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Nạp tiền ngay
                  </button>
                  <button
                    @click="closeDialog"
                    class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Image Modal -->
      <div v-if="centerDialogVisible" class="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-90" @click="centerDialogVisible = false">
        <div class="flex items-center justify-center min-h-screen p-4">
          <img
            :src="jobDetail?.image || CompanyImage"
            alt="Project image"
            class="max-w-full max-h-full rounded-lg"
            @click.stop
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronRight,
  DollarSign,
  MapPin,
  Award,
  Clock,
  Send,
  Bookmark,
  Users,
  ExternalLink,
  UserCheck,
  GraduationCap,
  Heart,
  IdCard,
  CalendarCheck,
  CheckCircle,
  AlertCircle,
} from "lucide-vue-next";

import CompanyImage from "/images/header/banner2.gif";

// Reactive state
const { status } = useAuth();
const dialogVisible = ref(false);
const loading = ref(false);
const userBalance = ref<number>(0);
const centerDialogVisible = ref(false);

// Modal state management
const modalState = reactive({
  status: "loading", // 'loading', 'success', 'error'
  title: "Kiểm tra số dư",
  showClose: false,
});

const currentUser = await useCurrentUser();
const token = useCookie("auth.token");

// Handle apply click
const handleApplyClick = async () => {
  loading.value = true;
  
  if (status.value === "unauthenticated") {
    ElMessage.warning("Bạn cần phải đăng nhập để nhận job này!");
    loading.value = false;
    return;
  }

  try {
    dialogVisible.value = true;
    modalState.status = "loading";
    modalState.title = "Kiểm tra số dư";
    modalState.showClose = false;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const response = await userService.userControllerGetBallance(
      currentUser.value?.username as string,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    
    userBalance.value = (response.data as unknown as { balance: number }).balance;

    await new Promise((resolve) => setTimeout(resolve, 300));

    if (userBalance.value >= 6) {
      modalState.status = "success";
      modalState.title = "Kết quả kiểm tra";
      modalState.showClose = true;
    } else {
      modalState.status = "error";
      modalState.title = "Kết quả kiểm tra";
      modalState.showClose = true;
    }
  } catch (error) {
    console.error("Error checking balance:", error);
    modalState.status = "error";
    modalState.title = "Lỗi kiểm tra";
    modalState.showClose = true;
  } finally {
    loading.value = false;
  }
};

// Confirm application submission
const confirmApply = async () => {
  try {
    ElMessage({
      message: "Ứng tuyển thành công!",
      type: "success",
    });
    dialogVisible.value = false;
  } catch (error) {
    console.error("Error submitting application:", error);
    ElMessage({
      message: "Có lỗi xảy ra khi ứng tuyển. Vui lòng thử lại.",
      type: "error",
    });
  }
};

// Navigate to recharge page
const goToRecharge = () => {
  ElMessage({
    message: "Chuyển hướng đến trang nạp tiền",
    type: "info",
  });
};

// Close dialog
const closeDialog = () => {
  dialogVisible.value = false;
};

// Save job
const save = () => {
  if (status.value === "unauthenticated") {
    ElMessage.warning("Bạn cần phải đăng nhập để lưu job này!");
    return;
  }
  
  ElNotification({
    title: "Thành công",
    message: "Lưu việc làm thành công",
    type: "success",
  });
};

// Get job details
const route = useRoute();
const slug = route.params.slug as string;
const jobDetail = ref<JobPostingResponseDtoUpdate | undefined>(undefined);

const response = await jobPostingService.jobPostControllerFindOne(slug);
jobDetail.value = response.data as JobPostingResponseDtoUpdate;

// SEO Meta
watchEffect(() => {
  if (!jobDetail.value) return;

  useSeoMeta({
    title: `${jobDetail.value.title} | Việc làm Freelance - ChoCode`,
    description: jobDetail.value.jobDescription?.slice(0, 150) || "Cơ hội việc làm freelance tuyệt vời tại ChoCode",
    ogTitle: jobDetail.value.title,
    ogDescription: jobDetail.value.jobDescription?.slice(0, 150),
    ogImage: jobDetail.value.image || "https://chocode.dev/default-job-image.jpg",
    ogUrl: `https://chocode.dev/job-post/${slug}`,
    twitterCard: "summary_large_image",
  });
});

// Helper functions
const formatCurrency = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return "0 đ";
  return new Intl.NumberFormat("vi-VN").format(value) + " đ";
};

const formatDeadline = (deadline: Date | string | null | undefined): string => {
  if (!deadline) return "Không có hạn";
  const target = new Date(deadline);
  if (isNaN(target.getTime())) return "Không xác định";

  const now = new Date();
  const diffMs = target.getTime() - now.getTime();

  if (diffMs <= 0) return "Đã hết hạn";

  const diffSec = Math.floor(diffMs / 1000);
  const days = Math.floor(diffSec / (60 * 60 * 24));
  const hours = Math.floor((diffSec % (60 * 60 * 24)) / (60 * 60));

  let result = "Chỉ còn ";
  if (days > 0) result += `${days} ngày `;
  if (hours > 0 || days === 0) result += `${hours} giờ`;

  return result.trim();
};

const formatPostDate = (date: string) => {
  return new Date(date)
    .toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(" ", ", ");
};
</script>

<style scoped>
/* Custom background */
.bg-gray-25 {
  background-color: #fafafa;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Line clamp utility */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Job description styling */
.job-description {
  @apply text-gray-700 leading-relaxed;
}

.job-description :deep(p) {
  @apply mb-4;
}

.job-description :deep(strong) {
  @apply font-semibold text-gray-900;
}

.job-description :deep(ul),
.job-description :deep(ol) {
  @apply ml-6 mb-4;
}

.job-description :deep(ul) {
  @apply list-disc;
}

.job-description :deep(ol) {
  @apply list-decimal;
}

.job-description :deep(h1),
.job-description :deep(h2),
.job-description :deep(h3) {
  @apply font-bold mb-3 mt-6 text-gray-900;
}

.job-description :deep(h1) {
  @apply text-xl;
}

.job-description :deep(h2) {
  @apply text-lg;
}

.job-description :deep(h3) {
  @apply text-base;
}

/* Focus styles */
button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .grid {
    gap: 1rem;
  }
}
</style>