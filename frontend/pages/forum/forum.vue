<template>
  <!-- Main Content -->
  <div class="flex-1">
    <ForumSearch :query="search" />
    <!-- <ForumChat
      :username="currentUser?.username || ''"
      :name="currentUser?.fullName || 'Default User'"
      :avatar="currentUser?.avatar || ''"
    /> -->
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

    <div class="text-gray-500 mb-4">{{ totalPost.data }} câu hỏi</div>

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
                >{{ post.user?.fullName }}
              </NuxtLink>
              <div class="text-gray-500 text-sm">
                {{ formatRelativeTime(post.createdAt.toString()) }}
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-gray-700">
              <NuxtLink :to="`/thao-luan/${post.category?.slug}`">{{
                post.category.title
              }}</NuxtLink>
              • {{ post.level }}
            </span>
            <button>
              <Image class="h-5 w-5 text-gray-500" />
            </button>
            <button>
              <Bookmark class="h-5 w-5 text-gray-500" />
            </button>
            <button
              v-if="post.user && post.user.id === currentUser?.id"
              @click="deletePost(post.title, post.id, post.user.id)"
            >
              <Trash class="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div class="mb-3"><NuxtLink :to="`/thao-luan/bai-dang/${post.slug}`" class="hover:text-primary cursor-pointer">
          {{ post.title }}
        </NuxtLink></div>

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
import {
  Image,
  Bookmark,
  Search,
  ThumbsUp,
  ThumbsDown,
  Trash,
} from "lucide-vue-next";
import DefaultAvatarUser from "~/assets/images/header/default-avatar.png";
import type { PostCreateResponseDto } from "~/auto_api";
const currentUser = await useCurrentUser();
const user = {
  username: currentUser.value?.username,
  name: currentUser.value?.fullName,
  avatar: currentUser.value?.avatar,
};
const token = useCookie("auth.token");
const posts = ref<PostCreateResponseDto[] | null>(null);
const selectedClass = ref("all");
const search = ref();
const [postsResponse, totalPost] = await Promise.all([
  postService.postControllerFindAll(4, 0),
  postService.postControllerCount(),
]);

function formatRelativeTime(timestamp: string): string {
  const now = new Date();
  const past = new Date(timestamp);

  // Make sure the date is valid
  if (isNaN(past.getTime())) {
    throw new Error("Invalid date format");
  }

  const diffMs = now.getTime() - past.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSecs < 60) {
    return `${diffSecs} giây trước`;
  } else if (diffMins < 60) {
    return `${diffMins} phút trước`;
  } else if (diffHours < 24) {
    return `${diffHours} giờ trước`;
  } else if (diffDays < 30) {
    return `${diffDays} ngày trước`;
  } else if (diffMonths < 12) {
    return `${diffMonths} tháng trước`;
  } else {
    return `${diffYears} năm trước`;
  }
}

const deletePost = (question: string, id: number, userId: number) => {
  ElMessageBox.confirm(`Bạn muốn xoá bài đăng ${question}`, "Bạn muốn xoá", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(() => {
      postService
        .postControllerRemove(
          {
            id,
            userId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.value}`,
            },
          }
        )
        .then((data) => {
          ElMessage({
            type: "success",
            message: "Xoá bài đăng thành công!",
          });
          window.location.reload();
        })
        .catch(() => {
          ElMessage({
            type: "error",
            message: "Xoá bài đăng không thành công!",
          });
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Huỷ xoá bài đăng!",
      });
    });
};
posts.value = postsResponse.data.reverse();
</script>
