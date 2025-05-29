<template>
  <!-- Main Content Area -->
  <div class="w-full mx-auto bg-gray-50 min-h-screen mt-14">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <el-skeleton style="width: 100%" animated>
        <template #template>
          <div class="flex flex-col gap-4">
            <el-skeleton-item variant="p" style="height: 240px" />
            <div class="flex gap-4">
              <el-skeleton-item variant="image" style="width: 120px; height: 120px" />
              <div class="flex-1">
                <el-skeleton-item variant="h3" style="width: 50%" />
                <el-skeleton-item variant="text" style="margin-top: 16px; width: 80%" />
              </div>
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>

    <template v-else>
      <!-- Hero Section -->
      <div class="relative bg-white shadow-sm rounded-md">
        <!-- Cover Image -->
        <div
          class="h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] w-full relative overflow-hidden rounded-t-md"
        >
          <div
            class="absolute inset-0 bg-[url('/images/header/banner.gif')] bg-cover bg-center"
          ></div>
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
          ></div>

          <!-- Profile Quick Stats -->
          <div class="absolute bottom-6 right-6 flex flex-wrap gap-3">
            <div
              class="px-3 py-2 bg-black/30 backdrop-blur-lg rounded-md text-white"
            >
              <div class="text-lg sm:text-xl font-bold">{{ userData?.score || 0 }}</div>
              <div class="text-xs opacity-80">Điểm số</div>
            </div>
            <div
              class="px-3 py-2 bg-black/30 backdrop-blur-lg rounded-md text-white"
            >
              <div class="text-lg sm:text-xl font-bold">
                {{ userData?.jobPostings?.length || 0 }}
              </div>
              <div class="text-xs opacity-80">Dự án</div>
            </div>
            <div
              class="px-3 py-2 bg-black/30 backdrop-blur-lg rounded-md text-white"
            >
              <div class="text-lg sm:text-xl font-bold">
                {{ userData?.feelings?.length || 0 }}
              </div>
              <div class="text-xs opacity-80">Đánh giá</div>
            </div>
          </div>
        </div>

        <!-- Profile Header -->
        <div
          class="px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 pb-6 flex flex-col sm:flex-row sm:items-end gap-6"
        >
          <!-- Avatar -->
          <div class="relative flex justify-center sm:justify-start">
            <div
              class="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-md overflow-hidden ring-4 ring-white shadow-lg"
            >
              <img
                :src="userData?.avatar || DefaultAvatar"
                alt="Profile"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="absolute -bottom-3 left-1/2 -translate-x-1/2">
              <div
                class="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium rounded-full shadow-md"
              >
                {{ userData?.active ? "Online" : "Offline" }}
              </div>
            </div>
          </div>

          <!-- Profile Info -->
          <div class="flex-1 text-center sm:text-left mt-4 sm:mt-0">
            <div
              class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
            >
              <div>
                <div class="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                  <h1 class="text-2xl font-bold text-gray-900">
                    {{ userData?.fullName }}
                  </h1>
                  <span
                    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mx-auto sm:mx-0"
                    :class="
                      userData?.roleId === 1
                        ? 'bg-blue-100 text-primary'
                        : 'bg-green-100 text-[#2acb2c]'
                    "
                  >
                    {{ userData?.roleId === 1 ? "User" : "Dev" }}
                  </span>
                </div>
                <div
                  class="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-gray-500 text-sm"
                >
                  <span class="flex items-center gap-1">
                    <IdCard class="w-4 h-4" />
                    ID: {{ userData?.username }}
                  </span>
                  <span class="flex items-center gap-1">
                    <Users class="w-4 h-4" />
                    {{ userData?.connections || 0 }} kết nối
                  </span>
                  <span class="flex items-center gap-1">
                    <Calendar class="w-4 h-4" />
                    {{ formatDate(userData?.created_at) }}
                  </span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center justify-center sm:justify-end gap-2 sm:gap-3 mt-4 sm:mt-0">
                <el-button type="primary" class="flex items-center gap-1" size="small" :size="isMobile ? 'small' : 'default'">
                  <UserPlus class="w-4 h-4 mr-1 mb-[2px]" />
                  <span>Kết nối</span>
                </el-button>
                <el-button class="flex items-center gap-1" size="small" :size="isMobile ? 'small' : 'default'">
                  <MessageCircle class="w-4 h-4 mr-1" />
                  <span>Nhắn tin</span>
                </el-button>
                <el-dropdown trigger="click">
                  <el-button size="small" :size="isMobile ? 'small' : 'default'">
                    <MoreHorizontal class="w-4 h-4" />
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>Báo cáo</el-dropdown-item>
                      <el-dropdown-item>Chặn</el-dropdown-item>
                      <el-dropdown-item>Chia sẻ</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="py-6 px-4 sm:px-0 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Left Sidebar -->
        <div class="lg:col-span-3 space-y-6">
          <!-- About Card -->
          <div class="bg-white rounded-md p-5 shadow-sm">
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <UserCircle class="w-5 h-5 text-blue-500" />
              Thông tin
            </h3>
            <div class="space-y-4">
              <div class="flex items-start gap-3 text-gray-600">
                <MapPin class="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span>{{ userData?.address || "Chưa cập nhật địa chỉ" }}</span>
              </div>
              <div class="flex items-start gap-3 text-gray-600">
                <Briefcase class="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span>{{ userData?.job || "Chưa cập nhật công việc" }}</span>
              </div>
              <div class="flex items-start gap-3 text-gray-600">
                <GraduationCap class="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span>{{ userData?.level || "Chưa cập nhật học vấn" }}</span>
              </div>
              <div class="flex items-start gap-3 text-gray-600">
                <Info class="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span>{{ userData?.bio || "Chưa có giới thiệu" }}</span>
              </div>
            </div>
          </div>

          <!-- Stats Card -->
          <div class="bg-white rounded-md p-5 shadow-sm">
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 class="w-5 h-5 text-blue-500" />
              Thống kê
            </h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="p-2 rounded-md bg-blue-50 text-blue-500">
                    <Trophy class="w-5 h-5" />
                  </div>
                  <span class="text-gray-600">Điểm số</span>
                </div>
                <span class="font-semibold">{{ userData?.score || 0 }}</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="p-2 rounded-md bg-green-50 text-green-500">
                    <Briefcase class="w-5 h-5" />
                  </div>
                  <span class="text-gray-600">Dự án</span>
                </div>
                <span class="font-semibold">{{
                  userData?.jobPostings?.length || 0
                }}</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="p-2 rounded-md bg-yellow-50 text-yellow-500">
                    <Star class="w-5 h-5" />
                  </div>
                  <span class="text-gray-600">Đánh giá</span>
                </div>
                <span class="font-semibold">{{
                  userData?.feelings?.length || 0
                }}</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="p-2 rounded-md bg-rose-50 text-rose-500">
                    <Heart class="w-5 h-5" />
                  </div>
                  <span class="text-gray-600">Đã giúp đỡ</span>
                </div>
                <span class="font-semibold">0</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="p-2 rounded-md bg-purple-50 text-purple-500">
                    <Shield class="w-5 h-5" />
                  </div>
                  <span class="text-gray-600">Độ uy tín</span>
                </div>
                <span class="font-semibold">0</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="lg:col-span-6">
          <el-tabs v-model="activeTab" class="bg-white rounded-md shadow-sm p-4 sm:p-5">
            <el-tab-pane label="Dự án" name="projects">
              <div
                v-if="userData?.jobPostings && userData.jobPostings.length > 0"
                class="space-y-6"
              >
                <div
                  v-for="job in userData.jobPostings"
                  :key="job.id"
                  class="border border-gray-200 rounded-md p-4 sm:p-5 hover:shadow-md transition-shadow"
                >
                  <div class="flex flex-col sm:flex-row items-start gap-4">
                    <div
                      v-if="job.image"
                      class="w-full sm:w-20 h-40 sm:h-20 rounded-md overflow-hidden flex-shrink-0"
                    >
                      <img
                        :src="job.image"
                        alt="Job image"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      v-else
                      class="w-full sm:w-20 h-40 sm:h-20 rounded-md overflow-hidden bg-gray-200 flex items-center justify-center flex-shrink-0"
                    >
                      <img
                        class="w-20 h-20 text-gray-400 object-cover"
                        src="~/assets/images/header/logo.png"
                      />
                    </div>
                    <div class="flex-1">
                      <NuxtLink
                        :to="`/viec-freelance/${job.slug}`"
                        class="text-lg font-semibold mb-2 hover:text-primary hover:underline"
                        >{{ job.title }}</NuxtLink
                      >
                      <div class="flex flex-wrap gap-2 mb-3">
                        <span
                          class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-primary"
                        >
                          <MapPin class="w-3 h-3 mr-1" />
                          {{ job.location }}
                        </span>
                        <span
                          class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-[#2acb2c]"
                        >
                          <Banknote class="w-3 h-3 mr-1" />
                          {{ job.salaryMin }}-{{ job.salaryMax }} triệu
                        </span>
                        <span
                          class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-100 text-[#FF7979]"
                        >
                          <Clock class="w-3 h-3 mr-1" />
                          Hạn: {{ formatDate(job.deadline) }}
                        </span>
                      </div>
                      <div
                        class="text-sm text-gray-600"
                        v-html="truncateHTML(job.jobDescription, 100)"
                      ></div>
                      <div class="flex justify-end mt-3">
                        <NuxtLink
                          :to="`/viec-freelance/${job.slug}`"
                          class="bg-primary-gradient px-3 py-2 text-[12px] text-white rounded-[4px]"
                          >Xem chi tiết</NuxtLink
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="py-10 text-center text-gray-500">
                <Briefcase class="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Chưa có dự án nào</p>
              </div>
            </el-tab-pane>

            <el-tab-pane label="Bài viết" name="posts">
              <div
                v-if="userData?.posts && userData.posts.length > 0"
                class="space-y-6"
              >
                <div
                  v-for="post in userData.posts"
                  :key="post.id"
                  class="border border-gray-200 rounded-md p-4 sm:p-5 hover:shadow-md transition-shadow"
                >
                  <div class="flex flex-col sm:flex-row items-start gap-4">
                    <div
                      v-if="post.image"
                      class="w-full sm:w-20 h-40 sm:h-20 rounded-md overflow-hidden flex-shrink-0"
                    >
                      <img
                        :src="post.image"
                        alt="Post image"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      v-else
                      class="w-full sm:w-20 h-40 sm:h-20 rounded-md overflow-hidden bg-gray-200 flex items-center justify-center flex-shrink-0"
                    >
                      <img
                        class="w-20 h-20 text-gray-400 object-cover"
                        src="~/assets/images/header/logo.png"
                      />
                    </div>
                    <div class="flex-1">
                      <NuxtLink
                        :to="`/bai-viet/${post.slug}`"
                        class="text-lg font-semibold mb-2 hover:text-primary hover:underline"
                        >{{ post.title }}</NuxtLink
                      >
                      <div class="flex flex-wrap gap-2 mb-3">
                        <span
                          class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-primary"
                        >
                          <Hash class="w-3 h-3 mr-1" />
                          {{ post.topic }}
                        </span>
                        <span
                          class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-[#2acb2c]"
                        >
                          <GraduationCap class="w-3 h-3 mr-1" />
                          {{ post.level }}
                        </span>
                        <span
                          class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-100 text-[#FF7979]"
                        >
                          <Clock class="w-3 h-3 mr-1" />
                          {{ formatDate(post.createdAt) }}
                        </span>
                      </div>
                      <div
                        class="text-sm text-gray-600"
                        v-html="truncateHTML(post.content, 100)"
                      ></div>
                      <div class="flex justify-end mt-3">
                        <NuxtLink
                          :to="`/bai-viet/${post.slug}`"
                          class="bg-primary-gradient px-3 py-2 text-[12px] text-white rounded-[4px]"
                          >Xem chi tiết</NuxtLink
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="py-10 text-center text-gray-500">
                <FileText class="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Chưa có bài viết nào</p>
              </div>
            </el-tab-pane>

            <el-tab-pane label="Hoạt động" name="activities">
              <div class="py-10 text-center text-gray-500">
                <Activity class="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Chưa có hoạt động nào</p>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

        <!-- Right Sidebar -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Recent Connections -->
          <div class="bg-white rounded-md p-5 shadow-sm">
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users class="w-5 h-5 text-blue-500" />
              Kết nối gần đây
            </h3>
            <div class="text-center py-8 text-gray-500">
              <Users class="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Chưa có kết nối nào</p>
              <el-button class="mt-4" size="small">Tìm người dùng</el-button>
            </div>
          </div>

          <!-- Recommended Projects -->
          <div class="bg-white rounded-md p-5 shadow-sm">
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lightbulb class="w-5 h-5 text-blue-500" />
              Dự án đề xuất
            </h3>
            <div class="space-y-4">
              <div
                class="border border-gray-100 rounded-md p-3 hover:bg-gray-50 transition-colors"
              >
                <h4 class="font-medium mb-1">
                  Thiết kế UI/UX cho ứng dụng di động
                </h4>
                <div
                  class="flex items-center justify-between text-sm text-gray-500"
                >
                  <span>4-6 triệu</span>
                  <span>Hà Nội</span>
                </div>
              </div>
              <div
                class="border border-gray-100 rounded-md p-3 hover:bg-gray-50 transition-colors"
              >
                <h4 class="font-medium mb-1">Phát triển website WordPress</h4>
                <div
                  class="flex items-center justify-between text-sm text-gray-500"
                >
                  <span>5-8 triệu</span>
                  <span>Làm từ xa</span>
                </div>
              </div>
              <div class="text-center mt-4">
                <el-button type="text" size="small">Xem thêm</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import {
  UserCircle,
  MapPin,
  Briefcase,
  GraduationCap,
  Info,
  BarChart3,
  Trophy,
  Star,
  Heart,
  Shield,
  Users,
  Calendar,
  MessageCircle,
  MoreHorizontal,
  UserPlus,
  Lightbulb,
  FileText,
  Activity,
  Banknote,
  Clock,
  IdCard,
  Hash,
} from "lucide-vue-next";
import { ElNotification } from "element-plus";
import DefaultAvatar from "@/assets/images/header/default-avatar.png";
import { ref, onMounted, watch, computed } from "vue";

const route = useRoute();
const userData = ref(null);
const activeTab = ref("posts"); // Changed default to posts since the user has posts
const loading = ref(true);

// Check if mobile
const isMobile = computed(() => {
  if (process.client) {
    return window.innerWidth < 640;
  }
  return false;
});

// Add window resize listener for mobile detection
onMounted(() => {
  if (process.client) {
    window.addEventListener('resize', handleResize);
  }
});

// Handle window resize
const handleResize = () => {
  // You can add additional responsive logic here if needed
};

// Clean up event listener
onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('resize', handleResize);
  }
});

// Fetch user data from API
onMounted(async () => {
  try {
    loading.value = true;
    const response = await userService.userControllerFindOne(
      route.params.username
    );
    userData.value = response.data;
    
    // Switch to posts tab if user has posts but no job postings
    if (userData.value?.posts?.length > 0 && 
        (!userData.value?.jobPostings || userData.value?.jobPostings.length === 0)) {
      activeTab.value = "posts";
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    ElNotification({
      type: "error",
      message: "Không thể tải thông tin người dùng",
      duration: 3000,
    });
  } finally {
    loading.value = false;
  }
});

watch(userData, (newData) => {
  if (newData) {
    useSeoMeta({
      title: `Trang cá nhân của ${newData.fullName || newData.username}`,
      ogTitle: `Trang cá nhân ${newData.fullName || newData.username}`,
      description: `Thông tin chi tiết của ${
        newData.fullName || newData.username
      }`,
    });
  }
});

// Format date function
const formatDate = (dateString) => {
  if (!dateString) return "Chưa có dữ liệu";

  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Truncate HTML content
const truncateHTML = (html, length) => {
  if (!html) return "";

  if (process.client) {
    // Create a temporary div to parse HTML in browser
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    
    // Get text content
    const text = tempDiv.textContent || tempDiv.innerText || "";
    
    // Truncate text
    if (text.length <= length) return html;
    return text.substring(0, length) + "...";
  } else {
    // Server-side fallback
    if (html.length <= length) return html;
    return html.substring(0, length) + "...";
  }
};
</script>

<style scoped>
:deep(.el-tabs__nav-wrap::after) {
  display: none;
}

:deep(.el-tabs__item) {
  font-weight: 500;
}

:deep(.el-tabs__item.is-active) {
  color: #3b82f6;
}

:deep(.el-tabs__active-bar) {
  background-color: #3b82f6;
}

@media (max-width: 640px) {
  :deep(.el-tabs__item) {
    padding: 0 12px;
    font-size: 14px;
  }
}
</style>