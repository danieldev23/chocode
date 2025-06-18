<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mt-6 mb-3">
      <h1 class="text-xl font-semibold text-gray-800 flex items-center">
        {{ title }}
      </h1>
      <NuxtLink
        class="text-primary text-base font-medium hover:text-primary transition flex items-center"
        to="/xep-hang"
      >
        Xem thêm
        <ArrowRight class="w-4 h-4 ml-1" />
      </NuxtLink>
    </div>

    <!-- Skeleton Loading -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <el-skeleton :rows="4" animated class="w-full" />
      <el-skeleton :rows="4" animated class="w-full" />
      <el-skeleton :rows="4" animated class="w-full" />
    </div>

    <!-- Top Developers List -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-if="developers.length === 0"
        class="text-center text-gray-500 py-2 col-span-full"
      >
        <SearchX class="w-8 h-8 mx-auto text-gray-400 mb-2" />
        Hiện tại chưa có developer nào.
      </div>

      <div
        v-for="developer in developers"
        :key="developer.id"
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition duration-300"
      >
        <!-- Developer Header -->
        <div class="flex items-center mb-4">
          <div class="relative">
            <NuxtImg
              :src="developer.avatar"
              loading="lazy"
              class="w-16 h-16 rounded-full object-cover border-2 border-primary"
              alt="Avatar"
            />
            <div
              class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold"
            >
              {{ developer.rank }}
            </div>
          </div>
          <div class="ml-4">
            <NuxtLink
              :to="`/trang-ca-nhan/${developer.username}`"
              class="text-base font-semibold cursor-pointer hover:text-primary"
            >
              {{ developer.fullName }}
            </NuxtLink>
            <div class="text-sm text-gray-600 mt-1">
              <div class="flex items-center">
                <Star class="w-4 h-4 mr-1 text-yellow-400" />
                {{ developer.score }} điểm
              </div>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-2 mb-4">
          <div class="text-center p-2 bg-gray-50 rounded-lg">
            <div class="text-sm text-gray-600">Giải quyết</div>
            <div class="text-lg font-semibold text-primary">
              {{ developer.solutions }}
            </div>
          </div>
          <div class="text-center p-2 bg-gray-50 rounded-lg">
            <div class="text-sm text-gray-600">Thành tích</div>
            <div class="text-lg font-semibold text-primary">
              {{ developer.achievements }}
            </div>
          </div>
          <div class="text-center p-2 bg-gray-50 rounded-lg">
            <div class="text-sm text-gray-600">Đánh giá</div>
            <div class="text-lg font-semibold text-primary">
              {{ developer.rating }}/5
            </div>
          </div>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="tag in developer.tags"
            :key="tag"
            class="bg-blue-50 text-primary text-xs font-medium px-2.5 py-1 rounded-full"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Actions -->
        <div class="flex justify-between items-center">
          <NuxtLink
            :to="`/trang-ca-nhan/${developer.username}`"
            class="bg-primary text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-blue-700 transition duration-150 flex items-center"
          >
            Xem profile
            <User class="w-4 h-4 ml-1" />
          </NuxtLink>
          <button
            @click="contactDeveloper(developer.id)"
            class="text-gray-600 hover:text-primary p-2 rounded-full transition duration-150"
            aria-label="Liên hệ"
          >
            <MessageSquare class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import {
  User,
  Star,
  ArrowRight,
  SearchX,
  MessageSquare,
} from "lucide-vue-next";

// Props
const props = defineProps<{
  developers: any[];
  isLoading: boolean;
  title: string;
}>();

const { status } = useAuth();

const contactDeveloper = (developerId: number) => {
  if (status.value === "unauthenticated") {
    ElMessage({
      message: "Bạn cần đăng nhập để liên hệ với developer!",
      type: "warning",
      duration: 3000,
      showClose: true,
    });
    return navigateTo("/trang-chu");
  }
  // Handle contact logic here
  console.log("Contact developer:", developerId);
};
</script>

<style scoped>
.el-skeleton {
  --el-skeleton-color: #f4f4f5;
  --el-skeleton-to-color: #e9e9eb;
}
</style>
