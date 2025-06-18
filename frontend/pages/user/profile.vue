<template>
  <!-- Main Content Area -->
  <div class="w-full bg-gray-25 pt-12">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div class="animate-pulse">
            <!-- Header skeleton -->
            <div class="h-48 bg-gray-200 rounded-lg mb-6"></div>
            <div class="flex items-center space-x-4 mb-6">
              <div class="w-24 h-24 bg-gray-200 rounded-lg"></div>
              <div class="space-y-2 flex-1">
                <div class="h-6 bg-gray-200 rounded w-1/3"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <!-- Content skeleton -->
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div class="space-y-4">
                <div class="h-32 bg-gray-200 rounded-lg"></div>
                <div class="h-40 bg-gray-200 rounded-lg"></div>
              </div>
              <div class="lg:col-span-2">
                <div class="h-64 bg-gray-200 rounded-lg"></div>
              </div>
              <div class="space-y-4">
                <div class="h-32 bg-gray-200 rounded-lg"></div>
                <div class="h-40 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template v-else>
      <!-- Edit Profile Dialog -->
      <el-dialog
        v-model="dialogVisible"
        title="Chỉnh sửa thông tin"
        width="500px"
        :before-close="handleClose"
        class="evergreen-dialog"
      >
        <el-form :model="userForm" label-position="top" class="evergreen-form">
          <el-form-item label="Username">
            <el-input
              v-model="userForm.username"
              disabled
              class="evergreen-input"
            />
          </el-form-item>

          <el-form-item label="Họ và tên">
            <el-input v-model="userForm.fullName" class="evergreen-input" />
          </el-form-item>

          <el-form-item label="Giới thiệu">
            <el-input
              type="textarea"
              v-model="userForm.bio"
              rows="3"
              placeholder="Viết vài dòng giới thiệu về bản thân..."
              class="evergreen-input"
            />
          </el-form-item>

          <el-form-item label="Địa chỉ">
            <el-input
              v-model="userForm.address"
              placeholder="Thành phố, quốc gia"
              class="evergreen-input"
            />
          </el-form-item>

          <el-form-item label="Công việc">
            <el-input
              v-model="userForm.job"
              placeholder="Chức vụ hiện tại"
              class="evergreen-input"
            />
          </el-form-item>
        </el-form>

        <template #footer>
          <div class="flex justify-end space-x-3">
            <button
              @click="dialogVisible = false"
              class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              @click="submitForm"
              :disabled="loading"
              class="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Lưu thay đổi
            </button>
          </div>
        </template>
      </el-dialog>

      <div class="mx-auto ">
        <!-- Profile Header Card -->
        <div
          class="bg-white rounded-lg border border-gray-200 shadow-sm mb-8 overflow-hidden"
        >
          <!-- Cover Background -->
          <div
            class="h-32 sm:h-40 bg-gradient-to-r from-blue-500 to-primary relative"
          >
            <div class="absolute inset-0 bg-black bg-opacity-10"></div>

            <!-- Quick Stats (moved to header) -->
            <div class="absolute bottom-4 right-4 flex space-x-3">
              <div
                class="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-3 py-2 text-white"
              >
                <div class="text-lg font-semibold">
                  {{ userData?.score || 0 }}
                </div>
                <div class="text-xs opacity-90">Điểm số</div>
              </div>
              <div
                class="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-3 py-2 text-white"
              >
                <div class="text-lg font-semibold">
                  {{ userData?.jobPostings?.length || 0 }}
                </div>
                <div class="text-xs opacity-90">Dự án</div>
              </div>
            </div>
          </div>

          <!-- Profile Info -->
          <div class="px-6 py-6">
            <div
              class="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <!-- Avatar -->
              <div class="relative">
                <div
                  class="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-4 border-white shadow-lg -mt-16 sm:-mt-20"
                >
                  <img
                    :src="userData?.avatar || DefaultAvatar"
                    alt="Profile"
                    class="w-full h-full object-cover"
                  />
                </div>

                <!-- Status Badge -->
                <div
                  class="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                >
                  <div
                    class="px-2 py-1 text-xs font-medium rounded-full text-white shadow-sm"
                    :class="{
                      'bg-green-500': userStatus?.isUserOnline,
                      'bg-yellow-500':
                        !userStatus?.isUserOnline && userStatus?.lastActive,
                      'bg-gray-400':
                        !userStatus?.isUserOnline && !userStatus?.lastActive,
                    }"
                  >
                    <div class="flex items-center space-x-1">
                      <div
                        class="w-1.5 h-1.5 rounded-full bg-white"
                        :class="{ 'animate-pulse': userStatus?.isUserOnline }"
                      ></div>
                      <span>
                        {{ userStatus?.isUserOnline ? "Online" : "Offline" }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- User Info -->
              <div class="flex-1 min-w-0">
                <div
                  class="flex flex-col sm:flex-row sm:items-start sm:justify-between"
                >
                  <div>
                    <div class="flex items-center space-x-3 mb-2">
                      <h1
                        class="text-xl sm:text-2xl font-semibold text-gray-900"
                      >
                        {{ userData?.fullName }}
                      </h1>
                      <span
                        class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium"
                        :class="
                          userData?.roleId === 1
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        "
                      >
                        {{ userData?.roleId === 1 ? "Client" : "Developer" }}
                      </span>
                    </div>

                    <div
                      class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3"
                    >
                      <span class="flex items-center">
                        <IdCard class="w-4 h-4 mr-1" />
                        @{{ userData?.username }}
                      </span>
                      <span class="flex items-center">
                        <Calendar class="w-4 h-4 mr-1" />
                        Tham gia {{ formatDate(userData?.created_at) }}
                      </span>
                      <span class="flex items-center">
                        <Users class="w-4 h-4 mr-1" />
                        {{ userData?.connections || 0 }} kết nối
                      </span>
                    </div>

                    <p
                      v-if="userData?.bio"
                      class="text-gray-600 text-sm leading-relaxed max-w-md"
                    >
                      {{ userData.bio }}
                    </p>
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex items-center space-x-3 mt-4 sm:mt-0">
                    <button
                      v-if="
                        currentUser &&
                        userData.username !== currentUser.username
                      "
                      @click="openChat"
                      class="inline-flex items-center px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      <MessageCircle class="w-4 h-4 mr-2" />
                      Nhắn tin
                    </button>

                    <button
                      v-if="
                        currentUser &&
                        userData.username !== currentUser.username
                      "
                      class="inline-flex items-center px-3 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      <UserPlus class="w-4 h-4 mr-2" />
                      Kết nối
                    </button>

                    <button
                      v-if="
                        currentUser &&
                        userData.username === currentUser.username
                      "
                      @click="dialogVisible = true"
                      class="inline-flex items-center px-3 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      <SquarePen class="w-4 h-4 mr-2" />
                      Chỉnh sửa
                    </button>

                    <el-dropdown trigger="click">
                      <button
                        class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <MoreHorizontal class="w-4 h-4" />
                      </button>
                      <template #dropdown>
                        <el-dropdown-menu class="evergreen-dropdown">
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
        </div>

        <!-- Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <!-- Left Sidebar -->
          <div class="space-y-6">
            <!-- About Card -->
            <div
              class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
            >
              <h3
                class="text-lg font-semibold text-gray-900 mb-4 flex items-center"
              >
                <UserCircle class="w-5 h-5 text-primary mr-2" />
                Thông tin cá nhân
              </h3>
              <div class="space-y-4">
                <div
                  v-if="userData?.address"
                  class="flex items-start space-x-3"
                >
                  <MapPin class="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  
                  <span class="text-gray-700 text-sm">{{
                    userData.address
                  }}</span>
                </div>
                <div v-if="userData?.job" class="flex items-start space-x-3">
                  <Briefcase
                    class="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0"
                  />
                  <span class="text-gray-700 text-sm">{{ userData.job }}</span>
                </div>
                <div v-if="userData?.level" class="flex items-start space-x-3">
                  <GraduationCap
                    class="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0"
                  />
                  <span class="text-gray-700 text-sm">{{
                    userData.level
                  }}</span>
                </div>
                <div
                  v-if="
                    !userData?.address && !userData?.job && !userData?.level
                  "
                  class="text-center py-4"
                >
                  <Info class="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p class="text-gray-500 text-sm">Chưa có thông tin</p>
                </div>
              </div>
            </div>

            <!-- Stats Card -->
            <div
              class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
            >
              <h3
                class="text-lg font-semibold text-gray-900 mb-4 flex items-center"
              >
                <BarChart3 class="w-5 h-5 text-primary mr-2" />
                Thống kê
              </h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"
                    >
                      <Trophy class="w-4 h-4 text-primary" />
                    </div>
                    <span class="text-gray-700 text-sm">Điểm số</span>
                  </div>
                  <span class="font-semibold text-gray-900">{{
                    userData?.score || 0
                  }}</span>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center"
                    >
                      <Briefcase class="w-4 h-4 text-green-600" />
                    </div>
                    <span class="text-gray-700 text-sm">Dự án</span>
                  </div>
                  <span class="font-semibold text-gray-900">{{
                    userData?.jobPostings?.length || 0
                  }}</span>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center"
                    >
                      <Star class="w-4 h-4 text-yellow-600" />
                    </div>
                    <span class="text-gray-700 text-sm">Đánh giá</span>
                  </div>
                  <span class="font-semibold text-gray-900">{{
                    userData?.feelings?.length || 0
                  }}</span>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center"
                    >
                      <Shield class="w-4 h-4 text-purple-600" />
                    </div>
                    <span class="text-gray-700 text-sm">Uy tín</span>
                  </div>
                  <span class="font-semibold text-gray-900">98%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Main Content -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg border border-gray-200 shadow-sm">
              <el-tabs v-model="activeTab" class="evergreen-tabs">
                <el-tab-pane label="Dự án" name="projects">
                  <div class="p-6">
                    <div
                      v-if="
                        userData?.jobPostings && userData.jobPostings.length > 0
                      "
                      class="space-y-6"
                    >
                      <div
                        v-for="job in userData.jobPostings"
                        :key="job.id"
                        class="border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all"
                      >
                        <div class="flex space-x-4">
                          <div
                            class="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0"
                          >
                            <img
                              v-if="job.image"
                              :src="job.image"
                              alt="Project"
                              class="w-full h-full object-cover"
                            />
                            <div
                              v-else
                              class="w-full h-full flex items-center justify-center"
                            >
                              <Briefcase class="w-6 h-6 text-gray-400" />
                            </div>
                          </div>

                          <div class="flex-1 min-w-0">
                            <NuxtLink
                              :to="`/viec-freelance/${job.slug}`"
                              class="text-lg font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2"
                            >
                              {{ job.title }}
                            </NuxtLink>

                            <div class="flex flex-wrap gap-2 mt-2 mb-3">
                              <span
                                class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md"
                              >
                                <MapPin class="w-3 h-3 mr-1" />
                                {{ job.location }}
                              </span>
                              <span
                                class="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md"
                              >
                                <Banknote class="w-3 h-3 mr-1" />
                                {{ job.salaryMin }}-{{ job.salaryMax }} triệu
                              </span>
                              <span
                                class="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-md"
                              >
                                <Clock class="w-3 h-3 mr-1" />
                                {{ formatDate(job.deadline) }}
                              </span>
                            </div>

                            <p
                              class="text-gray-600 text-sm line-clamp-2"
                              v-html="truncateHTML(job.jobDescription, 100)"
                            ></p>

                            <div class="flex justify-end mt-3">
                              <NuxtLink
                                :to="`/viec-freelance/${job.slug}`"
                                class="text-primary hover:text-blue-700 text-sm font-medium"
                              >
                                Xem chi tiết →
                              </NuxtLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-else class="text-center py-12">
                      <Briefcase class="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <h3 class="text-lg font-medium text-gray-900 mb-1">
                        Chưa có dự án
                      </h3>
                      <p class="text-gray-500">
                        Người dùng này chưa đăng dự án nào.
                      </p>
                    </div>
                  </div>
                </el-tab-pane>

                <el-tab-pane label="Bài viết" name="posts">
                  <div class="p-6">
                    <div
                      v-if="userData?.posts && userData.posts.length > 0"
                      class="space-y-6"
                    >
                      <div
                        v-for="post in userData.posts"
                        :key="post.id"
                        class="border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all"
                      >
                        <div class="flex space-x-4">
                          <div
                            class="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0"
                          >
                            <img
                              v-if="post.image"
                              :src="post.image"
                              alt="Post"
                              class="w-full h-full object-cover"
                            />
                            <div
                              v-else
                              class="w-full h-full flex items-center justify-center"
                            >
                              <FileText class="w-6 h-6 text-gray-400" />
                            </div>
                          </div>

                          <div class="flex-1 min-w-0">
                            <NuxtLink
                              :to="`/bai-viet/${post.slug}`"
                              class="text-lg font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2"
                            >
                              {{ post.title }}
                            </NuxtLink>

                            <div class="flex flex-wrap gap-2 mt-2 mb-3">
                              <span
                                class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md"
                              >
                                <Hash class="w-3 h-3 mr-1" />
                                {{ post.topic }}
                              </span>
                              <span
                                class="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-md"
                              >
                                <GraduationCap class="w-3 h-3 mr-1" />
                                {{ post.level }}
                              </span>
                              <span
                                class="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                              >
                                <Clock class="w-3 h-3 mr-1" />
                                {{ formatDate(post.createdAt) }}
                              </span>
                            </div>

                            <p
                              class="text-gray-600 text-sm line-clamp-2"
                              v-html="truncateHTML(post.content, 100)"
                            ></p>

                            <div class="flex justify-end mt-3">
                              <NuxtLink
                                :to="`/bai-viet/${post.slug}`"
                                class="text-primary hover:text-blue-700 text-sm font-medium"
                              >
                                Xem chi tiết →
                              </NuxtLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-else class="text-center py-12">
                      <FileText class="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <h3 class="text-lg font-medium text-gray-900 mb-1">
                        Chưa có bài viết
                      </h3>
                      <p class="text-gray-500">
                        Người dùng này chưa đăng bài viết nào.
                      </p>
                    </div>
                  </div>
                </el-tab-pane>

                <el-tab-pane label="Hoạt động" name="activities">
                  <div class="p-6">
                    <div class="text-center py-12">
                      <Activity class="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <h3 class="text-lg font-medium text-gray-900 mb-1">
                        Chưa có hoạt động
                      </h3>
                      <p class="text-gray-500">
                        Lịch sử hoạt động sẽ được hiển thị tại đây.
                      </p>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>

          <!-- Right Sidebar -->
          <div class="space-y-6">
            <!-- Similar Profiles -->
            <div
              class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
            >
              <h3
                class="text-lg font-semibold text-gray-900 mb-4 flex items-center"
              >
                <Users class="w-5 h-5 text-primary mr-2" />
                Người dùng tương tự
              </h3>
              <div class="text-center py-6">
                <Users class="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p class="text-gray-500 text-sm">Chưa có gợi ý</p>
              </div>
            </div>

            <!-- Recommended Projects -->
            <div
              class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
            >
              <h3
                class="text-lg font-semibold text-gray-900 mb-4 flex items-center"
              >
                <Lightbulb class="w-5 h-5 text-primary mr-2" />
                Dự án đề xuất
              </h3>
              <div class="space-y-3">
                <div
                  class="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                >
                  <h4 class="font-medium text-gray-900 text-sm mb-1">
                    Thiết kế UI/UX cho ứng dụng
                  </h4>
                  <div
                    class="flex items-center justify-between text-xs text-gray-500"
                  >
                    <span>4-6 triệu</span>
                    <span>Remote</span>
                  </div>
                </div>
                <div
                  class="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                >
                  <h4 class="font-medium text-gray-900 text-sm mb-1">
                    Phát triển website WordPress
                  </h4>
                  <div
                    class="flex items-center justify-between text-xs text-gray-500"
                  >
                    <span>5-8 triệu</span>
                    <span>Hà Nội</span>
                  </div>
                </div>
                <div class="text-center pt-2">
                  <button
                    class="text-primary hover:text-blue-700 text-sm font-medium"
                  >
                    Xem thêm →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Chat Component -->
    <Chat
      v-if="showChat"
      :username="currentUser?.username"
      :avatar="currentUser?.avatar"
      :name="currentUser?.fullName"
      :recipient-id="userData?.id"
      :recipient-name="userData?.fullName"
      :recipient-avatar="userData?.avatar"
      @close="closeChat"
    />
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
  SquarePen,
} from "lucide-vue-next";
import DefaultAvatar from "@/assets/images/header/default-avatar.png";
import { useUserOnlineStore } from "~/store/userOnline";
import Chat from "~/components/forum/Chat.vue";

const userOnlineStore = useUserOnlineStore();
const route = useRoute();
const userData = ref(null);
const activeTab = ref("projects");
const loading = ref(true);
const dialogVisible = ref(false);
const token = useCookie("auth.token");
const currentUser = await useCurrentUser();
const showChat = ref(false);

const userForm = ref({
  id: 5,
  username: "441884169",
  fullName: "Huy Dev",
  active: true,
  bio: null,
  address: null,
  job: null,
});

// Computed properties
const userStatus = computed(() => {
  if (!userData.value) return null;
  return userOnlineStore.users.find((u) => u.userId == userData.value.id);
});

// Methods
const submitForm = async () => {
  try {
    const payload = {
      fullName: userForm.value.fullName,
      bio: userForm.value.bio,
      address: userForm.value.address,
      job: userForm.value.job,
    };

    await userService.userControllerUpdateUserInfo(payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    userData.value = { ...userData.value, ...userForm.value };
    ElMessage({
      type: "success",
      message: "Cập nhật thông tin thành công!",
    });
    dialogVisible.value = false;
  } catch (error) {
    console.error("Update failed:", error);
    ElMessage({
      type: "error",
      message: "Cập nhật thất bại. Vui lòng thử lại.",
    });
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "Chưa có dữ liệu";
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const truncateHTML = (html, length) => {
  if (!html) return "";

  if (process.client) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    if (text.length <= length) return html;
    return text.substring(0, length) + "...";
  } else {
    if (html.length <= length) return html;
    return html.substring(0, length) + "...";
  }
};

const openChat = () => {
  if (!currentUser.value || !userData.value) return;
  showChat.value = true;
};

const closeChat = () => {
  showChat.value = false;
};

const handleClose = () => {
  dialogVisible.value = false;
};

// Lifecycle
onMounted(async () => {
  try {
    loading.value = true;
    const response = await userService.userControllerFindOne(
      route.params.username
    );
    userData.value = response.data;

    Object.assign(userForm.value, {
      id: userData.value.id,
      username: userData.value.username,
      fullName: userData.value.fullName,
      active: userData.value.active,
      bio: userData.value.bio,
      address: userData.value.address,
      job: userData.value.job,
    });

    if (
      userData.value?.posts?.length > 0 &&
      (!userData.value?.jobPostings || userData.value?.jobPostings.length === 0)
    ) {
      activeTab.value = "posts";
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    ElMessage({
      type: "error",
      message: "Không thể tải thông tin người dùng",
      duration: 3000,
    });
  } finally {
    loading.value = false;
  }
});

// Watch for userData changes and update SEO
watch(userData, (newData) => {
  if (newData) {
    setupSeoFromSettingObject({
      title: `Trang cá nhân của ${newData.fullName || newData.username}`,
      description: `Thông tin chi tiết của ${
        newData.fullName || newData.username
      }`,
    });
  }
});
</script>

<style scoped>
/* Custom background */
.bg-gray-25 {
  background-color: #fafafa;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Evergreen Form Styles */
:deep(.evergreen-form .el-form-item__label) {
  color: #374151 !important;
  font-weight: 500 !important;
  font-size: 14px !important;
  margin-bottom: 6px !important;
}

/* Evergreen Input Styles */
:deep(.evergreen-input .el-input__wrapper) {
  box-shadow: none !important;
  border: 1px solid #d1d5db !important;
  border-radius: 8px !important;
  background: white !important;
  padding: 0 12px !important;
  transition: border-color 0.2s ease !important;
}

:deep(.evergreen-input .el-input__wrapper:hover) {
  border-color: #9ca3af !important;
}

:deep(.evergreen-input .el-input__wrapper.is-focus) {
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
}

/* Evergreen Dialog */
:deep(.evergreen-dialog) {
  border-radius: 12px !important;
}

:deep(.evergreen-dialog .el-dialog__header) {
  padding: 24px 24px 0 !important;
  border-bottom: 1px solid #f3f4f6 !important;
}

:deep(.evergreen-dialog .el-dialog__body) {
  padding: 24px !important;
}

/* Evergreen Tabs */
:deep(.evergreen-tabs .el-tabs__nav-wrap::after) {
  display: none !important;
}

:deep(.evergreen-tabs .el-tabs__item) {
  font-weight: 500 !important;
  color: #6b7280 !important;
  padding: 0 24px !important;
}

:deep(.evergreen-tabs .el-tabs__item.is-active) {
  color: #3b82f6 !important;
}

:deep(.evergreen-tabs .el-tabs__active-bar) {
  background-color: #3b82f6 !important;
}

:deep(.evergreen-tabs .el-tabs__content) {
  padding: 0 !important;
}

/* Evergreen Dropdown */
:deep(.evergreen-dropdown) {
  border-radius: 8px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  border: 1px solid #e5e7eb !important;
  padding: 4px !important;
}

:deep(.evergreen-dropdown .el-dropdown-menu__item) {
  padding: 8px 12px !important;
  border-radius: 4px !important;
  margin: 2px 0 !important;
  transition: all 0.15s ease !important;
}

:deep(.evergreen-dropdown .el-dropdown-menu__item:hover) {
  background: #f3f4f6 !important;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform,
    box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Focus styles for accessibility */
button:focus-visible,
a:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
