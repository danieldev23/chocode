<template>
  <!-- Main Content -->
  <div class="flex-1">
    <!-- Hero Section -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div class="flex flex-col md:flex-row items-center justify-between">
        <div class="mb-6 md:mb-0 md:w-2/3">
          <h1 class="text-3xl font-bold mb-3">
            Nền tảng Hỏi & Đáp IT - ChoCode
          </h1>
          <p class="text-gray-600 mb-4">
            ChoCode là nơi kết nối, giao lưu, chia sẻ kiến thức IT
          </p>

          <ForumAskQuestion />
        </div>

        <div class="md:w-1/3">
          <img
            loading="lazy"
            src="~/assets/images/home/working.jpg"
            alt="Q&A Platform"
            class="w-full"
          />
        </div>
      </div>
    </div>

    <!-- Filters Section -->
    <div
      class="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4"
    >
      <div class="w-full sm:w-64">
        <el-select
          v-model="selectedClass"
          placeholder="Chọn lớp:"
          class="w-full"
        >
          <el-option label="Tất cả" value="all"></el-option>
          <el-option label="Lớp 1" value="1"></el-option>
          <el-option label="Lớp 2" value="2"></el-option>
          <!-- Add more options as needed -->
        </el-select>
      </div>
      <div class="flex flex-wrap gap-2">
        <button class="bg-gray-800 text-white px-4 py-2 rounded-lg">
          Tất cả
        </button>
        <button class="bg-white text-gray-700 px-4 py-2 rounded-lg border">
          Đã trả lời
        </button>
        <button class="bg-white text-gray-700 px-4 py-2 rounded-lg border">
          Chưa có câu trả lời
        </button>
      </div>
    </div>

    <div class="text-gray-500 mb-4">1,023,426 câu hỏi</div>

    <!-- Questions List -->
    <div class="space-y-4">
      <!-- Question 1 -->
      <div
        class="bg-white rounded-lg shadow-sm p-4"
        v-for="post in posts"
        :key="post.id"
      >
        <div class="flex flex-col sm:flex-row sm:justify-between mb-2">
          <div class="flex items-center mb-2 sm:mb-0">
            <div class="relative">
              <img
                loading="lazy"
                :src="post.user?.avatar || DefaultAvatarUser"
                :alt="`Avatar ${post.user?.fullName}`"
                class="w-10 h-10 rounded-full"
              />
              <div
                class="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full w-4 h-4 flex items-center justify-center text-xs text-white"
              >
                1
              </div>
            </div>
            <div class="ml-3">
              <NuxtLink
                :to="`/trang-ca-nhan/${post.user?.username}`"
                class="font-medium"
                >{{ post.user?.fullName }}</NuxtLink
              >
              <div class="text-gray-500 text-sm">
                {{ formatRelativeTime(post.createdAt.toString()) }}
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-gray-700"
              ><NuxtLink :to="`/thao-luan/${post.category?.slug}`">{{
                post.category.title
              }}</NuxtLink>
              • {{ post.level }}</span
            >
            <button>
              <Image class="h-5 w-5 text-gray-500" />
            </button>
            <button>
              <Bookmark class="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div class="mb-3">{{ post.title }}</div>

        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="flex items-center space-x-3 mb-2 sm:mb-0">
            <button class="flex items-center text-gray-500">
              <ThumbsUp class="h-5 w-5 mr-1" />
              <span>0</span>
            </button>
            <button class="flex items-center text-gray-500">
              <ThumbsDown class="h-5 w-5" />
            </button>
          </div>
          <button
            class="border border-orange-500 text-orange-500 px-4 py-1 rounded-full w-full sm:w-auto"
          >
            Trả lời
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Grid,
  ChevronRight,
  Image,
  Bookmark,
  ThumbsUp,
  ThumbsDown,
} from "lucide-vue-next";
import DefaultAvatarUser from '~/assets/images/header/default-avatar.png';
import type { PostCreateResponseDto } from "~/auto_api";
const posts = ref<PostCreateResponseDto[] | null>(null);
const response = await postService.postControllerFindAll(10, 4);
posts.value = response.data.reverse();
const totalPost = await postService.postControllerCount();
console.log(totalPost);
const selectedClass = ref("all");
</script>
