<template>
  <!-- Main Content -->
  <div class="flex-1">
    <ForumSearch :query="search" />

    <!-- Hero Section -->
    <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
      <div class="flex flex-col lg:flex-row items-center justify-between">
        <div class="mb-6 lg:mb-0 lg:w-2/3">
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Nền tảng Hỏi & Đáp IT - ChoCode
          </h1>
          <p class="text-gray-600 mb-6">
            ChoCode là nơi kết nối, giao lưu, chia sẻ kiến thức IT
          </p>
          <ForumAskQuestion />
        </div>

        <div class="lg:w-1/3">
          <img
            loading="lazy"
            src="/assets/images/home/working.jpg"
            alt="Q&A Platform"
            class="w-full rounded-lg"
          />
        </div>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="w-full sm:w-64">
          <select
            v-model="selectedClass"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="all">Tất cả cấp độ</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="filter in statusFilters"
            :key="filter.value"
            @click="selectedStatus = filter.value"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            :class="
              selectedStatus === filter.value
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            "
          >
            {{ filter.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="text-gray-600 mb-4 text-sm">{{ totalPost.data }} câu hỏi</div>

    <!-- Questions List -->
    <div class="space-y-4">
      <article
        v-for="post in posts"
        :key="post.id"
        class="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6 hover:shadow-md transition-all hover:-translate-y-0.5"
      >
        <!-- Post Header -->
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4"
        >
          <div class="flex items-center mb-3 sm:mb-0">
            <div class="relative mr-3">
              <img
                loading="lazy"
                :src="post.user?.avatar || DefaultAvatarUser"
                :alt="`Avatar ${post.user?.fullName}`"
                class="w-10 h-10 rounded-full object-cover"
              />
              <div
                class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs text-white font-bold"
                :class="
                  post.level === 'Beginner'
                    ? 'bg-green-500'
                    : post.level === 'Intermediate'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                "
              >
                {{
                  post.level === "Beginner"
                    ? "B"
                    : post.level === "Intermediate"
                    ? "I"
                    : "A"
                }}
              </div>
            </div>

            <div>
              <NuxtLink
                :to="`/trang-ca-nhan/${post.user?.username}`"
                class="font-semibold text-gray-900 hover:text-primary transition-colors"
              >
                {{ post.user?.fullName }}
              </NuxtLink>
              <div class="flex items-center text-sm text-gray-500">
                <Clock class="w-3 h-3 mr-1" />
                {{ formatRelativeTime(post.createdAt.toString()) }}
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <NuxtLink
              :to="`/thao-luan/${post.category?.slug}`"
              class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-md hover:bg-blue-200 transition-colors"
            >
              {{ post.category?.title }}
            </NuxtLink>
            <span
              class="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-md"
            >
              {{ post.level }}
            </span>

            <div class="flex items-center space-x-1">
              <button
                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ImageIcon class="w-4 h-4" />
              </button>
              <button
                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Bookmark class="w-4 h-4" />
              </button>
              <button
                v-if="post.user && post.user.id === currentUser?.id"
                @click="deletePost(post.title, post.id, post.user.id)"
                class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Post Content -->
        <div class="mb-4">
          <NuxtLink
            :to="`/thao-luan/bai-dang/${post.slug}`"
            class="text-lg font-semibold text-gray-900 hover:text-primary cursor-pointer transition-colors line-clamp-2"
          >
            {{ post.title }}
          </NuxtLink>

          <p
            v-if="post.content"
            class="text-gray-600 text-sm mt-2 line-clamp-2"
          >
            {{ post.content.substring(0, 150) }}...
          </p>
        </div>

        <!-- Post Actions -->
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200"
        >
          <div class="flex items-center space-x-4 mb-3 sm:mb-0">
            <button
              class="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
            >
              <ThumbsUp class="w-4 h-4" />
              <span class="text-sm font-medium">{{
                post.feelings?.length || 0
              }}</span>
            </button>

            <div class="flex items-center space-x-2 text-gray-600">
              <MessageSquare class="w-4 h-4" />
              <span class="text-sm font-medium"
                >{{ post.comments?.length || 0 }} bình luận</span
              >
            </div>

            <div class="flex items-center space-x-2 text-gray-500">
              <Eye class="w-4 h-4" />
              <span class="text-sm">{{ post.views || 0 }} lượt xem</span>
            </div>
          </div>

          <NuxtLink
            :to="`/thao-luan/bai-dang/${post.slug}`"
            class="inline-flex items-center px-4 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium justify-center"
          >
            Xem chi tiết
          </NuxtLink>
        </div>
      </article>
    </div>

    <!-- Load More -->
    <div class="mt-8 text-center">
      <button
        @click="loadMorePosts"
        :disabled="loading"
        class="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
      >
        <div v-if="loading" class="flex items-center justify-center">
          <div
            class="w-4 h-4 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin mr-2"
          ></div>
          Đang tải...
        </div>
        <span v-else>Tải thêm câu hỏi</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ImageIcon,
  Bookmark,
  ThumbsUp,
  MessageSquare,
  Eye,
  Trash,
  Clock,
} from "lucide-vue-next";
import DefaultAvatarUser from "/assets/images/header/default-avatar.png";
import type { PostCreateResponseDto } from "~/auto_api";

const currentUser = await useCurrentUser();
const token = useCookie("auth.token");
const posts = ref<PostCreateResponseDto[] | null>(null);
const selectedClass = ref("all");
const selectedStatus = ref("all");
const search = ref("");
const loading = ref(false);

// Status filters
const statusFilters = [
  { label: "Tất cả", value: "all" },
  { label: "Đã trả lời", value: "answered" },
  { label: "Chưa trả lời", value: "unanswered" },
];

// Fetch initial data
const [postsResponse, totalPost] = await Promise.all([
  postService.postControllerFindAll(10, 0),
  postService.postControllerCount(),
]);

posts.value = postsResponse.data.reverse();

// Format relative time in Vietnamese
function formatRelativeTime(timestamp: string): string {
  const now = new Date();
  const past = new Date(timestamp);

  if (isNaN(past.getTime())) {
    return "Không xác định";
  }

  const diffMs = now.getTime() - past.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) {
    return "Vừa xong";
  } else if (diffMins < 60) {
    return `${diffMins} phút trước`;
  } else if (diffHours < 24) {
    return `${diffHours} giờ trước`;
  } else if (diffDays < 7) {
    return `${diffDays} ngày trước`;
  } else {
    return past.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
}

// Delete post function
const deletePost = (question: string, id: number, userId: number) => {
  ElMessageBox.confirm(
    `Bạn có chắc chắn muốn xoá bài đăng "${question}"?`,
    "Xác nhận xoá",
    {
      confirmButtonText: "Xoá",
      cancelButtonText: "Hủy",
      type: "warning",
    }
  )
    .then(async () => {
      try {
        await postService.postControllerRemove(
          { id, userId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.value}`,
            },
          }
        );

        ElMessage.success("Xoá bài đăng thành công!");

        // Remove from local state
        if (posts.value) {
          posts.value = posts.value.filter((post) => post.id !== id);
        }
      } catch (error) {
        ElMessage.error("Xoá bài đăng không thành công!");
      }
    })
    .catch(() => {
      ElMessage.info("Đã hủy xoá bài đăng");
    });
};

// Load more posts
const loadMorePosts = async () => {
  if (loading.value || !posts.value) return;

  loading.value = true;

  try {
    const response = await postService.postControllerFindAll(
      10,
      posts.value.length
    );
    if (response.data && response.data.length > 0) {
      posts.value.push(...response.data);
    } else {
      ElMessage.info("Không còn bài viết nào để tải");
    }
  } catch (error) {
    ElMessage.error("Có lỗi xảy ra khi tải thêm bài viết");
  } finally {
    loading.value = false;
  }
};

// SEO Meta
useSeoMeta({
  title: "Thảo luận - Hỏi đáp IT - ChoCode",
  description:
    "Tham gia thảo luận và hỏi đáp về lập trình, công nghệ với cộng đồng developers Việt Nam",
});
</script>

<style scoped>
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

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Hover effects */
article:hover {
  transform: translateY(-2px);
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
  .space-y-4 > * + * {
    margin-top: 1rem;
  }
}
</style>
