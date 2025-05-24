<template>
  <MoleculesHeader />
  <main>
    <div class="min-h-screen mt-20 mb-6">
      <div
        class="mx-4 md:mx-16 lg:mx-32 xl:mx-48 mt-4 md:mt-8 flex flex-col md:flex-row gap-6"
      >
        <!-- Sidebar -->
        <ForumSideBar :categories="categories" />
        <slot />

        <!-- Right Sidebar -->
        <div class="w-full md:w-80 shrink-0 space-y-6">
          <!-- App Download -->
          <div class="bg-white rounded-lg shadow-sm p-4">
            <div class="flex items-center mb-3">
              <div class="bg-blue-500 text-white p-2 rounded-lg mr-3">
                <span class="font-bold">FQA</span>
              </div>
              <div>
                <div class="font-bold">Tải APP ChoCode</div>
                <div class="text-gray-600 text-sm">Hỏi & đáp IT</div>
              </div>
            </div>
          </div>

          <!-- Top Contributors -->
          <div class="bg-white rounded-lg shadow-sm p-4">
            <h3 class="font-bold text-lg mb-3">Thành viên hăng hái</h3>
            <div class="mb-3">
              <el-select
                v-model="timeFilter"
                placeholder="Thời gian"
                class="w-full"
              >
                <el-option label="Trong tuần" value="week"></el-option>
                <el-option label="Trong tháng" value="month"></el-option>
                <el-option label="Tất cả" value="all"></el-option>
              </el-select>
            </div>

            <div class="space-y-4">
              <div
                v-for="user in users"
                :key="user.id"
                class="flex items-center"
              >
                <img
                  :src="
                    user.avatar ||
                    '~/assets/images/header/default-avatar.png'
                  "
                  :alt="user.fullName"
                  class="w-10 h-10 rounded-full"
                />
                <div class="ml-3 flex-1">
                  <div class="font-medium">{{ user.fullName }}</div>
                  <div class="text-gray-600 text-sm">
                    {{ user.score || 0 }} Điểm
                  </div>
                </div>
              </div>

              <!-- Fallback static data if no users -->
              <template v-if="!users || users.length === 0">
                <div class="flex items-center">
                  <img
                    src="~/assets/images/header/default-avatar.png"
                    alt="User"
                    class="w-10 h-10 rounded-full"
                  />
                  <div class="ml-3 flex-1">
                    <div class="font-medium">朱志鑫🌟ZZX_1911💛</div>
                    <div class="text-gray-600 text-sm">4,610 Điểm</div>
                  </div>
                </div>
                <div class="flex items-center">
                  <img
                    src="~/assets/images/header/default-avatar.png"
                    alt="User"
                    class="w-10 h-10 rounded-full"
                  />
                  <div class="ml-3 flex-1">
                    <div class="font-medium">Nguyễn Lê Thủy Dương</div>
                    <div class="text-gray-600 text-sm">2,310 Điểm</div>
                  </div>
                </div>
                <div class="flex items-center">
                  <img
                    src="~/assets/images/header/default-avatar.png"
                    alt="User"
                    class="w-10 h-10 rounded-full"
                  />
                  <div class="ml-3 flex-1">
                    <div class="font-medium">🔥8A_k11🔥</div>
                    <div class="text-gray-600 text-sm">2,160 Điểm</div>
                  </div>
                </div>
              </template>
            </div>
          </div>

          <!-- Advertisement -->
          <div class="rounded-md border shadow-lg text-center">
            <img
              src="~/assets/images/sidebar/sidebar-banner.gif"
              alt="Advertisement"
              class="w-full rounded-lg"
            />
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
import type { AllUsersResponse } from "~/auto_api";
import { useCategoryStore } from "~/store/category";

const users = ref<AllUsersResponse[]>([]);
const categoryStore = useCategoryStore();

await useAsyncData("categories", async () => {
  await categoryStore.fetchCategories();
});

const getTopUsers = async () => {
  try {
    const response = await userService.userControllerFindAll();
    users.value = response.data || [];
    console.table(users.value);
  } catch (error) {
    console.error("Error fetching users:", error);
    users.value = [];
  }
};

onMounted(() => {
  getTopUsers();
});

const { categories } = storeToRefs(categoryStore);
const timeFilter = ref("week");
</script>

<style>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
