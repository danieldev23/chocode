<template>
  <!-- Main Content Area -->
  <div class="mx-auto w-full">
    <!-- Hero Section -->
    <div class="relative bg-white">
      <!-- Cover Image -->
      <div
        class="h-[200px] sm:h-[240px] md:h-[260px] lg:h-[280px] w-full bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden"
      >
        <div
          class="absolute inset-0 bg-[url('/images/profile/cover1.avif')] bg-cover bg-center opacity-40"
        ></div>
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
        ></div>

        <!-- Profile Quick Stats -->
        <div
          class="absolute bottom-4 right-4 sm:right-6 lg:right-8 flex gap-2 sm:gap-4 lg:gap-6"
        >
          <div
            class="px-2 sm:px-3 lg:px-4 py-2 bg-black/30 backdrop-blur-lg rounded-lg text-white"
          >
            <div class="text-lg sm:text-xl lg:text-2xl font-bold">1,220</div>
            <div class="text-xs sm:text-sm opacity-80">Điểm số</div>
          </div>
          <div
            class="px-2 sm:px-3 lg:px-4 py-2 bg-black/30 backdrop-blur-lg rounded-lg text-white"
          >
            <div class="text-lg sm:text-xl lg:text-2xl font-bold">15</div>
            <div class="text-xs sm:text-sm opacity-80">Đã giúp đỡ</div>
          </div>
          <div
            class="px-2 sm:px-3 lg:px-4 py-2 bg-black/30 backdrop-blur-lg rounded-lg text-white"
          >
            <div class="text-lg sm:text-xl lg:text-2xl font-bold">3</div>
            <div class="text-xs sm:text-sm opacity-80">Đánh giá</div>
          </div>
        </div>
      </div>

      <!-- Profile Header -->
      <div
        class="px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-18 lg:-mt-20 pb-4 sm:pb-5 lg:pb-6 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 lg:gap-8"
      >
        <!-- Avatar -->
        <div class="relative">
          <div
            class="w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl"
          >
            <NuxtImg
              :src="user?.avatar || '/header/default-avatar.png'"
              alt="Profile"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="absolute -bottom-3 left-1/2 -translate-x-1/2">
            <div
              class="px-2 sm:px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs sm:text-sm font-medium rounded-full shadow-lg"
            >
              Online
            </div>
          </div>
        </div>

        <!-- Profile Info -->
        <div class="flex-1 pb-2 sm:pb-3 lg:pb-4">
          <div
            class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0"
          >
            <div>
              <div class="flex items-center gap-2 sm:gap-3 mb-2">
                <h1 class="text-xl sm:text-2xl font-bold text-gray-900">
                  {{ user?.fullName }}
                </h1>
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  Admin
                </span>
              </div>
              <div
                class="flex flex-wrap items-center gap-3 sm:gap-6 text-gray-500 text-xs sm:text-sm"
              >
                <span class="flex items-center gap-1">
                  <IdCard class="w-4 h-4" />
                  ID: {{ user?.username }}
                </span>
                <span class="flex items-center gap-1">
                  <Contact class="w-4 h-4" />
                  {{ profile.friendCount }}
                </span>
                <span class="flex items-center gap-1">
                  <Clock class="w-4 h-4" />
                  {{
                    user?.created_at
                      ? new Date(user.created_at).toLocaleDateString("vi-VN")
                      : "Chưa có dữ liệu"
                  }}
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-2 sm:gap-3">
              <button
                class="px-3 sm:px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Icon name="ph:user-plus" class="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                class="px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Icon
                  name="ph:chat-circle-text"
                  class="w-4 h-4 sm:w-5 sm:h-5"
                />
              </button>
              <button
                class="px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                •••
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Grid -->
    <div
      class="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 lg:gap-6"
    >
      <!-- Left Sidebar -->
      <div class="md:col-span-3 space-y-4 sm:space-y-5 lg:space-y-6">
        <!-- About Card -->
        <div class="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm">
          <h3 class="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            Thông tin
          </h3>
          <div class="space-y-3 sm:space-y-4">
            <div
              class="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-600"
            >
              <MapPinHouse class="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Hà Nội, Việt Nam</span>
            </div>
            <div
              class="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-600"
            >
              <School class="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Đại học FPT</span>
            </div>
            <div
              class="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-600"
            >
              <BriefcaseBusiness class="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Software Engineer</span>
            </div>
          </div>
        </div>

        <!-- Stats Card -->
        <div class="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm">
          <h3 class="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            Thống kê
          </h3>
          <div class="space-y-3 sm:space-y-4">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="flex items-center justify-between"
            >
              <div class="flex items-center gap-2 sm:gap-3">
                <div
                  :class="[
                    stat.iconColor,
                    'p-1.5 sm:p-2 rounded-lg bg-gray-50',
                  ]"
                >
                  <ListStartIcon class="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span class="text-sm sm:text-base text-gray-600">{{
                  stat.label
                }}</span>
              </div>
              <span class="text-sm sm:text-base font-semibold">{{
                stat.value
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="md:col-span-6">
        <!-- Navigation Tabs -->
        <div class="bg-white rounded-xl mb-4 sm:mb-5 lg:mb-6 shadow-sm">
          <div class="flex">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              class="flex-1 py-3 sm:py-4 text-sm sm:text-base text-center font-medium relative"
              :class="[
                activeTab === index
                  ? 'text-primary'
                  : 'text-gray-500 hover:text-gray-900',
              ]"
              @click="activeTab = index"
            >
              {{ tab }}
              <div
                v-if="activeTab === index"
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              ></div>
            </button>
          </div>
        </div>

        <!-- Content Area -->
        <div
          class="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm min-h-[400px] sm:min-h-[450px] lg:min-h-[500px]"
        >
          <div v-if="activeTab === 0">
            <div class="text-center text-gray-500 py-8 sm:py-10 lg:py-12">
              Chưa có bài viết nào
            </div>
          </div>
          <div v-else-if="activeTab === 1">
            <div class="text-center text-gray-500 py-8 sm:py-10 lg:py-12">
              Chưa có bạn bè
            </div>
          </div>
          <div v-else>
            <div class="text-center text-gray-500 py-8 sm:py-10 lg:py-12">
              Chưa có hoạt động nào
            </div>
          </div>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="md:col-span-3 space-y-4 sm:space-y-5 lg:space-y-6">
        <!-- Level Card -->
        <div class="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm">
          <div class="flex items-center justify-between mb-3 sm:mb-4">
            <h3 class="text-base sm:text-lg font-semibold">Cấp độ</h3>
            <span
              class="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium"
            >
              {{ profile.rank }}
            </span>
          </div>
          <div class="space-y-2 sm:space-y-3">
            <div class="flex justify-between text-xs sm:text-sm">
              <span class="text-gray-600">Tiến độ</span>
              <span class="font-medium">450/1000 XP</span>
            </div>
            <div class="h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full w-[45%] bg-primary rounded-full"></div>
            </div>
          </div>
        </div>

        <!-- Achievements Card -->
        <div class="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm">
          <h3 class="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            Thành tích
          </h3>
          <div class="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
            <div
              v-for="i in 6"
              :key="i"
              class="aspect-square rounded-xl bg-gray-100 flex items-center justify-center"
            >
              <Icon
                name="ph:lock-simple"
                class="w-5 h-5 sm:w-6 sm:h-6 text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  MapPinHouse,
  School,
  BriefcaseBusiness,
  ListStartIcon,
  IdCard,
  Contact,
  Clock,
} from "lucide-vue-next";

const route = useRoute();

interface User {
  id: number;
  username: string;
  fullName: string;
  active: boolean;
  bio: string;
  avatar: string;
  roleId: number;
  created_at: string;
}
definePageMeta({
  ssr: true
});
defineProps({
  avatar: {
    type: String,
    default: "",
  },
  size: {
    type: Number,
    default: 32,
  },
});

const user = ref<User | null>(null);

const initData = async () => {
  try {
    const res = await userService.userControllerFindOne(
      String(route.params.username)
    );
    user.value = res.data ?? null;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu user:", error);
  }
};

await initData();

const profile = {
  name: "Gia Khánh Phạm",
  userId: "5156817",
  friendCount: "0 bạn bè",
  joinDate: "Thành viên từ 30-11-2023",
  rank: "Hạt giống !",
};

const stats = [
  {
    icon: "ph:medal-fill",
    iconColor: "text-amber-500",
    label: "Điểm số",
    value: "1,220",
  },
  {
    icon: "ph:thumbs-up-fill",
    iconColor: "text-blue-500",
    label: "Lượt thích",
    value: "2",
  },
  {
    icon: "ph:star-fill",
    iconColor: "text-yellow-500",
    label: "Đánh giá",
    value: "3",
  },
  {
    icon: "ph:hand-heart-fill",
    iconColor: "text-rose-500",
    label: "Đã giúp đỡ",
    value: "15",
  },
  {
    icon: "ph:shield-check-fill",
    iconColor: "text-emerald-500",
    label: "Độ uy tín",
    value: "0",
  },
];

const tabs = ["Tường cá nhân", "Bạn bè", "Nhật ký hoạt động"];
const activeTab = ref(0);
</script>
