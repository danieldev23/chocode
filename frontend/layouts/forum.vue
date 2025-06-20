<template>
  <MoleculesHeader />
  <main>
    <div class="min-h-screen bg-gray-25 pt-20 pb-6">
      <div class="mx-[1rem] md:mx-16 lg:mx-32 xl:mx-[12.5rem] mt-4 md:mt-8">
        <div class="flex flex-col lg:flex-row gap-6">
          <!-- Sidebar -->
          <ForumSideBar :categories="categories" />

          <!-- Main Content -->
          <div class="flex-1 min-w-0">
            <slot />
          </div>

          <!-- Right Sidebar -->
          <div class="w-full lg:w-80 shrink-0 space-y-6">
            <!-- App Download Card -->
            <div
              class="bg-white rounded-lg border border-gray-200 shadow-sm p-6"
            >
              <div class="flex items-center mb-4">
                <div
                  class="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mr-3"
                >
                  <span class="font-bold text-lg">CC</span>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">Tải APP ChoCode</h3>
                  <p class="text-gray-600 text-sm">
                    Hỏi & đáp IT mọi lúc mọi nơi
                  </p>
                </div>
              </div>

              <div class="flex space-x-2">
                <button
                  class="flex-1 bg-gray-900 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  App Store
                </button>
                <button
                  class="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Play Store
                </button>
              </div>
            </div>

            <!-- Top Contributors Card -->
            <div
              class="bg-white rounded-lg border border-gray-200 shadow-sm p-6"
            >
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold text-gray-900">Thành viên hăng hái</h3>
                <select
                  v-model="timeFilter"
                  class="text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="week">Tuần này</option>
                  <option value="month">Tháng này</option>
                  <option value="all">Tất cả</option>
                </select>
              </div>

              <div class="space-y-4">
                <div
                  v-for="(user, index) in displayUsers"
                  :key="user.id"
                  class="flex items-center"
                >
                  <div class="relative mr-3">
                    <img
                      :src="
                        user.avatar ||
                        '/assets/images/header/default-avatar.png'
                      "
                      :alt="user.fullName"
                      class="w-10 h-10 rounded-full object-cover"
                    />
                    <div
                      v-if="index < 3"
                      class="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      :class="{
                        'bg-yellow-500': index === 0,
                        'bg-gray-400': index === 1,
                        'bg-orange-400': index === 2,
                      }"
                    >
                      {{ index + 1 }}
                    </div>
                  </div>

                  <div class="flex-1 min-w-0">
                    <p class="font-medium text-gray-900 truncate">
                      {{ user.fullName }}
                    </p>
                    <div class="flex items-center text-sm text-gray-500">
                      <Trophy class="w-3 h-3 mr-1" />
                      {{ user.score || 0 }} điểm
                    </div>
                  </div>
                </div>

                <!-- Static fallback data -->
                <template v-if="!users || users.length === 0">
                  <div class="flex items-center">
                    <div class="relative mr-3">
                      <img
                        src="/assets/images/header/default-avatar.png"
                        alt="User"
                        class="w-10 h-10 rounded-full object-cover"
                      />
                      <div
                        class="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      >
                        1
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-medium text-gray-900">
                        朱志鑫🌟ZZX_1911💛
                      </p>
                      <div class="flex items-center text-sm text-gray-500">
                        <Trophy class="w-3 h-3 mr-1" />
                        4,610 điểm
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center">
                    <div class="relative mr-3">
                      <img
                        src="/assets/images/header/default-avatar.png"
                        alt="User"
                        class="w-10 h-10 rounded-full object-cover"
                      />
                      <div
                        class="absolute -top-1 -right-1 w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      >
                        2
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-medium text-gray-900">
                        Nguyễn Lê Thủy Dương
                      </p>
                      <div class="flex items-center text-sm text-gray-500">
                        <Trophy class="w-3 h-3 mr-1" />
                        2,310 điểm
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center">
                    <div class="relative mr-3">
                      <img
                        src="/assets/images/header/default-avatar.png"
                        alt="User"
                        class="w-10 h-10 rounded-full object-cover"
                      />
                      <div
                        class="absolute -top-1 -right-1 w-5 h-5 bg-orange-400 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      >
                        3
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-medium text-gray-900">🔥8A_k11🔥</p>
                      <div class="flex items-center text-sm text-gray-500">
                        <Trophy class="w-3 h-3 mr-1" />
                        2,160 điểm
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <!-- Quick Stats Card -->
            <div
              class="bg-white rounded-lg border border-gray-200 shadow-sm p-6"
            >
              <h3 class="font-semibold text-gray-900 mb-4">Thống kê nhanh</h3>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div
                      class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3"
                    >
                      <MessageSquare class="w-4 h-4 text-primary" />
                    </div>
                    <span class="text-gray-700 text-sm">Câu hỏi hôm nay</span>
                  </div>
                  <span class="font-semibold text-gray-900">47</span>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div
                      class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3"
                    >
                      <Users class="w-4 h-4 text-green-600" />
                    </div>
                    <span class="text-gray-700 text-sm">Thành viên online</span>
                  </div>
                  <span class="font-semibold text-gray-900">234</span>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div
                      class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3"
                    >
                      <CheckCircle class="w-4 h-4 text-orange-600" />
                    </div>
                    <span class="text-gray-700 text-sm"
                      >Câu trả lời hôm nay</span
                    >
                  </div>
                  <span class="font-semibold text-gray-900">156</span>
                </div>
              </div>
            </div>

            <!-- Advertisement Banner -->
            <div
              class="bg-white rounded-lg border border-gray-200 shadow-sm p-4"
            >
              <h4 class="text-sm font-medium text-gray-500 mb-3 text-center">
                Quảng cáo
              </h4>
              <div class="relative">
                <img
                  src="/assets/images/sidebar/sidebar-banner.gif"
                  alt="Advertisement"
                  class="w-full rounded-lg"
                  loading="lazy"
                />
                <div class="absolute top-2 right-2">
                  <button
                    class="w-6 h-6 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center text-xs hover:bg-opacity-70"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <div class="bg-white">
    <MoleculesFooter />
  </div>
</template>

<script setup lang="ts">
import { Trophy, MessageSquare, Users, CheckCircle } from "lucide-vue-next";
import type { AllUsersResponse } from "~/auto_api";
import { useCategoryStore } from "~/store/category";

const users = ref<AllUsersResponse[]>([]);
const categoryStore = useCategoryStore();
const timeFilter = ref("week");

// Fetch categories
await useAsyncData("categories", async () => {
  await categoryStore.fetchCategories();
});

// Fetch top users
const getTopUsers = async () => {
  try {
    const response = await userService.userControllerFindAll();
    users.value = response.data || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    users.value = [];
  }
};

// Computed property for displaying users
const displayUsers = computed(() => {
  return (users.value || [])
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 5);
});

onMounted(() => {
  getTopUsers();
});

const { categories } = storeToRefs(categoryStore);
</script>

<style scoped>
/* Custom background */
.bg-gray-25 {
  background-color: #fafafa;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform,
    box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Focus styles */
select:focus,
button:focus-visible {
  outline: none;
}

/* Scrollbar hiding */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .space-y-6 > * + * {
    margin-top: 1rem;
  }
}
</style>
