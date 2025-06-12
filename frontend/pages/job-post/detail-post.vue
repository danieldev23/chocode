<template>
  <div class="min-h-screen my-4">
    <!-- Navigation Breadcrumb -->
    <div class="border-primary-500 mb-2">
      <div class="container mx-auto py-3">
        <div class="flex flex-wrap items-center text-sm text-primary">
          <div class="flex items-center mr-2 mb-1">
            <NuxtLink to="/" class="hover:underline">Trang chủ</NuxtLink>
            <ChevronRight class="w-4 h-4 mx-1" />
          </div>
          <div class="flex items-center mr-2 mb-1">
            <NuxtLink
              to="/tim-viec-lam-nhan-vien-kinh-doanh"
              class="hover:underline"
              >Việc làm Freelance</NuxtLink
            >
            <ChevronRight class="w-4 h-4 mx-1" />
          </div>
          <div class="mb-1">
            <span class="text-gray-600 break-words">{{
              jobDetail?.title
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Dialog -->

    <el-dialog
      v-model="dialogOverflowVisible"
      title="Tips"
      width="500"
      draggable
      overflow
    >
      <span>It's a overflow draggable Dialog</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogOverflowVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogOverflowVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- Main Content -->
    <div class="container">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column (Job Details) -->
        <div class="lg:col-span-2">
          <!-- Job Main Info Card -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 class="text-2xl font-bold text-gray-800 mb-6">
              {{ jobDetail?.title }}
            </h1>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div class="flex items-center">
                <div
                  class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3"
                >
                  <DollarSign class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div class="text-gray-500 text-sm">Ngân sách</div>
                  <div class="font-semibold">
                    {{ formatCurrency(jobDetail?.salaryMin) }} -
                    {{ formatCurrency(jobDetail?.salaryMax) }}
                  </div>
                </div>
              </div>

              <div class="flex items-center">
                <div
                  class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3"
                >
                  <MapPin class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div class="text-gray-500 text-sm">Địa điểm</div>
                  <div class="font-semibold">Toàn Quốc</div>
                </div>
              </div>

              <div class="flex items-center">
                <div
                  class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3"
                >
                  <Award class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div class="text-gray-500 text-sm">Kinh nghiệm</div>
                  <div class="font-semibold">1 năm</div>
                </div>
              </div>
            </div>

            <div class="flex items-center mb-6">
              <Clock class="w-5 h-5 text-gray-500 mr-2" />
              <span class="text-gray-600"
                >Hạn nộp hồ sơ: {{ formatDeadline(jobDetail?.deadline) }}</span
              >
            </div>

            <div class="flex space-x-3">
              <el-button
                type="primary"
                class="w-full flex justify-center items-center bg-primary"
                @click="handleApplyClick"
                :loading="loading"
                :disabled="formatDeadline(jobDetail?.deadline) === 'Đã hết hạn'"
              >
                <Send class="w-4 h-4 mr-2" />
                Ứng tuyển ngay
              </el-button>
              <el-tooltip content="Lưu" placement="top" effect="light">
                <el-button
                  @click="save"
                  class="w-full md:w-auto flex items-center border bg-white text-black"
                  :disabled="
                    formatDeadline(jobDetail?.deadline) === 'Đã hết hạn'
                  "
                >
                  <Bookmark class="w-4 h-4 mr-2" />
                  Lưu tin
                </el-button>
              </el-tooltip>
            </div>

            <!-- Balance Check Modal -->
            <el-dialog
              v-model="dialogVisible"
              :title="modalState.title"
              width="440px"
              :close-on-click-modal="false"
              :show-close="modalState.showClose"
              class="modern-dialog"
            >
              <!-- Loading State -->
              <div
                v-if="modalState.status === 'loading'"
                class="status-container"
              >
                <div class="loading-animation">
                  <el-progress
                    type="circle"
                    :percentage="loadingProgress"
                    :stroke-width="6"
                    :width="110"
                    :color="'#0089FF'"
                  />
                </div>
                <p class="status-text">Đang kiểm tra số dư...</p>
              </div>

              <!-- Success State -->
              <div
                v-else-if="modalState.status === 'success'"
                class="status-container"
              >
                <div class="status-icon success">
                  <CheckCircle class="icon" />
                </div>

                <h3 class="status-title success-title">
                  Đủ điều kiện nhận job này!
                </h3>

                <div class="balance-info">
                  <span>Số dư tài khoản:</span>
                  <div class="balance-value">
                    {{ userBalance }}
                    <el-tooltip
                      placement="top"
                      content="<strong>Code Points (CP)</strong><br>Là đơn vị tiền tệ tại <em>Chocode</em><br>1 CP = 1.000 VNĐ"
                      raw-content
                    >
                      <span class="cp-label">CP</span>
                    </el-tooltip>
                  </div>
                </div>

                <div class="user-info-card">
                  <h4 class="section-title">Thông tin khách hàng</h4>
                  <div class="user-info-row">
                    <span class="label">Họ tên:</span>
                    <span class="value">{{ jobDetail?.user?.fullName }}</span>
                  </div>
                  <div class="user-info-row">
                    <span class="label">Email:</span>
                    <span class="value">huydq.@gmail.com</span>
                  </div>
                  <div class="user-info-row">
                    <span class="label">SĐT:</span>
                    <span class="value">03498453984980</span>
                  </div>
                </div>

                <button
                  class="action-button confirm bg-primary"
                  @click="confirmApply"
                >
                  Xác nhận ứng tuyển
                </button>
              </div>

              <!-- Error State -->
              <div
                v-else-if="modalState.status === 'error'"
                class="status-container"
              >
                <div class="status-icon error">
                  <AlertCircle class="icon" />
                </div>

                <h3 class="status-title error-title">Không đủ số dư</h3>

                <div class="balance-comparison">
                  <div class="balance-row">
                    <span>Số dư hiện tại:</span>
                    <span class="value">{{ userBalance }} CP</span>
                  </div>
                  <div class="balance-row required">
                    <span>Số dư cần thiết:</span>
                    <span class="value">6 CP</span>
                  </div>
                </div>

                <div class="action-buttons">
                  <button
                    class="action-button recharge bg-secondary-gradient"
                    @click="goToRecharge"
                  >
                    Nạp tiền ngay
                  </button>
                  <button class="action-button cancel" @click="closeDialog">
                    Đóng
                  </button>
                </div>
              </div>
            </el-dialog>
          </div>

          <!-- Job Details Card -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <div class="w-1 h-6 bg-primary mr-3"></div>
              Chi tiết tin tuyển dụng
            </h2>

            <!-- <div class="flex flex-wrap gap-2 mb-6">
              <el-tag v-for="(id, tag) in jobDetail?.tags" size="large">{{ tag.name }}</el-tag>
              
            </div> -->

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <img
                :src="jobDetail?.image || CompanyImage"
                alt="Company image"
                class="rounded-md w-full cursor-pointer"
                @click="centerDialogVisible = true"
              />
              <el-dialog v-model="centerDialogVisible" fullscreen align-center>
                <img
                  :src="jobDetail?.image || CompanyImage"
                  alt="Company image"
                  class="rounded-md w-full"
                />
              </el-dialog>
              <!-- <div class="relative rounded-lg overflow-hidden">
                <img src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/employer_medias/bead6bd6028cf85ab6b2f76f88759de9-67ca5114134ea.jpg" alt="Additional photo" class="rounded-lg">
                <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-xl">
                  +1
                </div>
              </div> -->
            </div>

            <!-- <div class="mb-6">
              <h3 class="text-lg font-bold mb-3">Mô tả công việc</h3>
              <ul class="space-y-2 list-inside text-gray-700">
                <li class="flex">
                  <span class="mr-2">-</span>
                  <span>Đánh giá và phân tích nhu cầu của khách hàng</span>
                </li>
                <li class="flex">
                  <span class="mr-2">-</span>
                  <span>Tư vấn sản phẩm Thiết kế - Xây dựng - Nội Thất</span>
                </li>
                <li class="flex">
                  <span class="mr-2">-</span>
                  <span>Đàm phán và ký hợp đồng</span>
                </li>
                <li class="flex">
                  <span class="mr-2">-</span>
                  <span>Duy trì các khách hàng tiềm năng.</span>
                </li>
              </ul>
            </div> -->
            <div
              class="mb-6 text-base"
              v-html="jobDetail?.jobDescription"
            ></div>
            <!-- <div>
              <h3 class="text-lg font-bold mb-3">Yêu cầu ứng viên</h3>
              <ul class="space-y-2 list-inside text-gray-700">
                <li class="flex">
                  <span class="mr-2">•</span>
                  <span>Có kinh nghiệm trong lĩnh vực thiết kế, xây dựng.</span>
                </li>
                <li class="flex">
                  <span class="mr-2">•</span>
                  <span>Đam mê tư vấn, bán hàng.</span>
                </li>
                <li class="flex">
                  <span class="mr-2">•</span>
                  <span
                    >Kỹ năng giao tiếp, thuyết trình, thuyết phục tốt. (Sẽ được
                    đào tạo thêm).</span
                  >
                </li>
              </ul>
            </div> -->
          </div>
        </div>

        <!-- Right Column (Company Info) -->
        <div class="lg:col-span-1">
          <!-- Company Card -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div class="flex flex-col items-center mb-6">
              <img
                :src="`${jobDetail?.user?.avatar}`"
                alt="UY VU Logo"
                class="w-20 h-20 mb-3 rounded-full border-primary border"
              />
              <NuxtLink
                :to="`/trang-ca-nhan/${jobDetail?.user?.username}`"
                class="text-lg font-bold text-center"
              >
                {{ jobDetail?.user?.fullName }}
              </NuxtLink>
            </div>

            <div class="space-y-4">
              <h3 class="font-semibold">Thông tin dự án</h3>
              <div class="flex">
                <IdCard class="w-5 h-5 text-gray-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <div class="text-gray-500 text-sm">ID Dự án:</div>
                  <div>{{ jobDetail?.id }}</div>
                </div>
              </div>

              <div class="flex">
                <CalendarCheck
                  class="w-5 h-5 text-gray-500 mr-3 flex-shrink-0 mt-1"
                />
                <div>
                  <div class="text-gray-500 text-sm">Ngày đăng:</div>
                  <div>
                    {{
                      jobDetail?.createdAt
                        ? formatPostDate(jobDetail.createdAt.toString())
                        : "Đang tải"
                    }}
                  </div>
                </div>
              </div>

              <div class="flex">
                <MapPin class="w-5 h-5 text-gray-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <div class="text-gray-500 text-sm">Đến từ:</div>
                  <div>Đà Nẵng</div>
                </div>
              </div>
            </div>

            <div class="mt-6">
              <NuxtLink
                :to="`/trang-ca-nhan/${jobDetail?.user?.username}`"
                class="w-full flex items-center justify-center bg-primary text-white rounded-[3px] py-[5px]"
              >
                <ExternalLink class="w-4 h-4 mr-2" />
                Ghé thăm trang cá nhân
              </NuxtLink>
            </div>
          </div>

          <!-- General Information Card -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 class="text-lg font-bold mb-4">Thông tin chung</h3>

            <div class="space-y-4">
              <div class="flex">
                <div
                  class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3"
                >
                  <UserCheck class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div class="text-gray-500 text-sm">Cấp bậc</div>
                  <div class="font-medium">Nhân viên</div>
                </div>
              </div>

              <div class="flex">
                <div
                  class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3"
                >
                  <GraduationCap class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div class="text-gray-500 text-sm">Học vấn</div>
                  <div class="font-medium">Trung cấp trở lên</div>
                </div>
              </div>

              <div class="flex">
                <div
                  class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3"
                >
                  <Users class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div class="text-gray-500 text-sm">Số lượng tuyển</div>
                  <div class="font-medium">3 người</div>
                </div>
              </div>

              <div class="flex">
                <div
                  class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3"
                >
                  <Clock class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div class="text-gray-500 text-sm">Hình thức làm việc</div>
                  <div class="font-medium">Làm online</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Related Jobs Category Card -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 class="text-lg font-bold mb-4">Danh mục Nghề liên quan</h3>

            <div class="flex flex-wrap gap-2">
              <el-tag size="large">Kinh doanh/Bán hàng</el-tag>
              <el-tag size="large">Bất động sản/Xây dựng</el-tag>
              <el-tag size="large">Sales Bất động sản/Xây dựng</el-tag>
              <el-tag size="large">Kinh doanh nội thất</el-tag>
            </div>
          </div>

          <!-- Location Card -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 class="text-lg font-bold mb-4">Khu vực</h3>

            <div class="flex flex-wrap gap-2">
              <el-tag size="large">Đà Nẵng</el-tag>
              <el-tag size="large">Cẩm Lệ</el-tag>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-bold mb-4">Gợi ý việc làm phù hợp</h3>
            <el-popover
              placement="left"
              width="550"
              trigger="hover"
              teleported
              class="custom-popover"
            >
              <template #reference>
                <div class="border border-gray-200 rounded-md">
                  <div class="flex justify-start gap-2 p-2">
                    <NuxtLink to="">
                      <img
                        src="https://cdn-new.topcv.vn/unsafe/150x/https://static.topcv.vn/company_logos/Ub1FnI8OO8XFJrryvrVSD0vq9gQ3gb7x_1723602274____24eb1708168fa261fc0535d74dddcaa2.jpg"
                        class="w-20 h-20 border border-gray-100 cursor-pointer rounded-full"
                      />
                    </NuxtLink>
                    <div class="flex flex-col">
                      <NuxtLink class="text-sm cursor-pointer mb-1"
                        >Senior NodeJS</NuxtLink
                      >
                      <NuxtLink class="text-xs text-gray-custom cursor-pointer"
                        >CHOCODE SOFTWARE CO,. LTD</NuxtLink
                      >
                    </div>
                  </div>
                  <div class="p-2 flex items-center justify-between">
                    <div class="flex items-center text-xs gap-x-2 font-thin">
                      <NuxtLink
                        class="rounded-full bg-gray-100 py-1 px-3 cursor-pointer"
                        >Thoả thuận</NuxtLink
                      >
                      <NuxtLink
                        class="rounded-full bg-gray-100 py-1 px-3 cursor-pointer"
                        >Đà Nẵng</NuxtLink
                      >
                    </div>
                    <el-tooltip content="Lưu" placement="top" effect="light">
                      <Heart
                        @click="save"
                        class="w-5 h-5 hover:text-red-500 cursor-pointer"
                      />
                    </el-tooltip>
                  </div>
                </div>
              </template>

              <!-- Nội dung popover -->
              <JobBoxDetail />
            </el-popover>
          </div>
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
  Briefcase,
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
const { status } = useAuth();
const dialogVisible = ref(false);
const loading = ref(false);
const loadingProgress = ref(0);
const userBalance = ref<number>(0);
const dialogOverflowVisible = ref(false);
import type { JobPostingResponseDtoUpdate } from "~/interfaces/job.interface";
import type { AxiosResponse } from "axios";
interface UserBalanceResponse {
  ballance: number;
}
const centerDialogVisible = ref(false);
// Modal state management
const modalState = reactive({
  status: "loading", // 'loading', 'success', 'error'
  title: "Kiểm tra số dư",
  showClose: false,
});
const currentUser = await useCurrentUser();
const token = useCookie("auth.token");
// Progress bar animation
const animateLoading = () => {
  loadingProgress.value = 0;
  const interval = setInterval(() => {
    loadingProgress.value += 10;
    if (loadingProgress.value >= 100) {
      clearInterval(interval);
    }
  }, 150);
};

// Handle apply click
const handleApplyClick = async () => {
  loading.value = true;
  if (status.value === "unauthenticated") {
    ElMessage.warning("Bạn cần phải đăng nhập để nhận job này!");
    loading.value = false;
  } else {
    try {
      dialogVisible.value = true;
      modalState.status = "loading";
      modalState.title = "Kiểm tra số dư";
      modalState.showClose = false;

      // Animate loading
      animateLoading();

      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = await userService.userControllerGetBallance(
        currentUser.value?.username as string,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );
      userBalance.value = (
        response.data as unknown as { balance: number }
      ).balance;

      // Wait a bit before showing result
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
  }
};

// Confirm application submission
const confirmApply = async () => {
  try {
    // Here you would call your API to submit the application
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
  // In a real app, you would use router.push or navigateTo
  console.log("Navigating to recharge page");
  // navigateTo('/payment/recharge');
  ElMessage({
    message: "Chuyển hướng đến trang nạp tiền",
    type: "info",
  });
};

// Close dialog
const closeDialog = () => {
  dialogVisible.value = false;
};

const save = () => {
  if (status.value === "unauthenticated") {
    ElMessage.warning("Bạn cần phải đăng nhập để lưu job này!");
    loading.value = false;
  } else {
    ElNotification({
      title: "Thành công",
      message: "Lưu việc làm thành công",
      type: "success",
    });
  }
};
const route = useRoute();
const slug = route.params.slug as string;
const jobDetail = ref<JobPostingResponseDtoUpdate | undefined>(undefined);

const response = await jobPostingService.jobPostControllerFindOne(slug);
jobDetail.value = response.data as JobPostingResponseDtoUpdate;
watchEffect(() => {
  if (!jobDetail.value) return;

  useSeoMeta({
    title: `${jobDetail.value.title} | Việc làm IT`,
    description:
      jobDetail.value.jobDescription?.slice(0, 150) || "Mô tả việc làm",
    ogTitle: jobDetail.value.title,
    ogDescription: jobDetail.value.jobDescription?.slice(0, 150),
    ogImage: "https://yourdomain.com/default-image.jpg",
    ogUrl: `https://yourdomain.com/viec-lam/${slug}`,
    twitterCard: "summary_large_image",
  });
});
const formatCurrency = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return "0 đ";
  return new Intl.NumberFormat("vi-VN").format(value * 1) + " đ";
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

const toProfile = (username: string) => {
  navigateTo(`/trang-ca-nhan/${username}`);
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

<style>
.modern-dialog :deep(.el-dialog__header) {
  padding: 16px 20px;
  border-bottom: 1px solid #eaeaea;
  margin-right: 0;
}

.modern-dialog :deep(.el-dialog__body) {
  padding: 0;
}

.modern-dialog :deep(.el-dialog__title) {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.status-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 24px;
}

.loading-animation {
  margin-bottom: 20px;
}

.status-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.status-icon.success {
  background-color: rgba(0, 200, 83, 0.1);
}

.status-icon.error {
  background-color: rgba(255, 71, 87, 0.1);
}

.icon {
  width: 40px;
  height: 40px;
}

.status-icon.success .icon {
  color: #00c853;
}

.status-icon.error .icon {
  color: #ff4757;
}

.status-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

.status-text {
  font-size: 16px;
  color: #666;
}

.balance-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  margin-bottom: 24px;
}

.balance-value {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #333;
}

.cp-label {
  color: #0089ff;
  margin-left: 4px;
  cursor: help;
}

.user-info-card {
  width: 100%;
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
}

.section-title {
  color: #0089ff;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
}

.user-info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.user-info-row:last-child {
  margin-bottom: 0;
}

.label {
  color: #666;
}

.value {
  font-weight: 500;
  color: #333;
}

.balance-comparison {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.balance-row {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}

.balance-row.required .value {
  color: #ff4757;
  font-weight: 600;
}

.action-buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-button {
  width: 100%;
  height: 48px;
  border-radius: 100rem;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.action-button.confirm {
  color: white;
}

.action-button.confirm:hover {
  background-color: #0072d6;
}

.action-button.recharge {
  color: white;
}

.action-button.recharge:hover {
  background-color: #0072d6;
}

.action-button.cancel {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  color: #666;
}

.action-button.cancel:hover {
  background-color: #eaeaea;
}
.el-button--success {
  background-color: #10b981;
}
@media (max-width: 768px) {
  .custom-popover {
    width: 90% !important;
    max-width: 320px !important;
  }
}
button.el-button.w-full.md\:w-auto.flex.items-center.border.bg-white.text-black.el-tooltip__trigger.el-tooltip__trigger {
  color: #333;
}
.el-button.custom-color {
  color: black;
  align-items: center;
  display: inline-flex;
}
button.el-button.flex.items-center.border-none.bg-transparent.el-tooltip__trigger.el-tooltip__trigger {
  border: none;
  color: #ff7979;
  padding: 0;
  margin-bottom: 1px;
}
button.el-button.flex.items-center.border-none.bg-transparent.el-tooltip__trigger.el-tooltip__trigger:hover {
  background: transparent;
}
</style>
