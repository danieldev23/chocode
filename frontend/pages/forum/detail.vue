<template>
  <div class="w-full flex-1">
    <ForumSearch />

    <div
      class="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6"
    >
      <!-- Breadcrumb -->
      <nav class="flex mb-6" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <NuxtLink
              to="/"
              class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Trang chủ
            </NuxtLink>
          </li>
          <li>
            <div class="flex items-center">
              <ChevronRight class="w-4 h-4 text-gray-400" />
              <NuxtLink
                to="/thao-luan"
                class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2"
              >
                Thảo luận
              </NuxtLink>
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <ChevronRight class="w-4 h-4 text-gray-400" />
              <span
                class="ml-1 text-sm font-medium text-gray-500 md:ml-2 truncate max-w-xs"
              >
                {{ postDetail.title }}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <!-- Main Post -->
      <article class="border border-gray-200 rounded-lg overflow-hidden">
        <!-- Post Header -->
        <div class="bg-gray-50 px-4 sm:px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="relative">
                <img
                  :src="postDetail.user?.avatar"
                  :alt="postDetail.user?.fullName"
                  class="w-10 h-10 rounded-full object-cover"
                />
                <div
                  v-if="postDetail.user?.online"
                  class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"
                ></div>
              </div>

              <div>
                <NuxtLink
                  :to="`/trang-ca-nhan/${postDetail.user?.username}`"
                  class="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {{ postDetail.user?.fullName }}
                </NuxtLink>
                <div class="flex items-center text-sm text-gray-500">
                  <Clock class="w-3 h-3 mr-1" />
                  {{ formatRelativeTime(String(postDetail.createdAt)) }}
                </div>
              </div>
            </div>

            <div class="flex items-center space-x-2">
              <span
                class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-md"
              >
                {{ postDetail.category?.title }}
              </span>
              <span
                class="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-md"
              >
                {{ postDetail.level }}
              </span>
            </div>
          </div>
        </div>

        <!-- Post Content -->
        <div class="px-4 sm:px-6 py-6">
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            {{ postDetail.title }}
          </h1>

          <div
            class="prose prose-sm sm:prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap mb-6"
          >
            {{ postDetail.content }}
          </div>

          <!-- Post Image -->
          <div v-if="postDetail.image" class="mb-6">
            <img
              :src="postDetail.image"
              alt="Post image"
              class="w-full rounded-lg border border-gray-200"
            />
          </div>

          <!-- Post Stats -->
          <div
            class="flex items-center justify-between pt-4 border-t border-gray-200"
          >
            <div class="flex items-center space-x-6">
              <button
                class="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
              >
                <ThumbsUp class="w-5 h-5" />
                <span class="font-medium">20</span>
              </button>

              <div class="flex items-center space-x-2 text-gray-600">
                <MessageCircle class="w-5 h-5" />
                <span class="font-medium">{{ totalComments }} bình luận</span>
              </div>
            </div>

            <div class="flex items-center space-x-2">
              <button
                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Share class="w-4 h-4" />
              </button>
              <button
                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Bookmark class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </article>

      <!-- Comment Input -->
      <div class="mt-8 bg-gray-50 rounded-lg border border-gray-200 p-4 sm:p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Thêm bình luận</h3>

        <div class="flex space-x-3">
          <img
            :src="currentUser?.avatar"
            :alt="currentUser?.fullName"
            class="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
          />

          <div class="flex-1">
            <textarea
              v-model="newComment"
              placeholder="Viết bình luận của bạn..."
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
            />

            <div class="flex items-center justify-between mt-3">
              <div class="flex items-center space-x-3">
                <div class="relative">
                  <button
                    @click="showEmojiPicker = !showEmojiPicker"
                    class="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    <Smile class="w-5 h-5" />
                  </button>

                  <!-- Emoji Picker -->
                  <div
                    v-if="showEmojiPicker"
                    ref="emojiPickerShow"
                    class="absolute bottom-12 left-0 z-50 shadow-lg rounded-xl overflow-hidden"
                  >
                    <emoji-picker @emoji-click="onEmojiClick" class="light" />
                  </div>
                </div>

                <button
                  class="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <ImageIcon class="w-5 h-5" />
                </button>
              </div>

              <button
                @click="commentPost"
                :disabled="!newComment.trim()"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Gửi bình luận
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Comments Section -->
      <div class="mt-8">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">
            Bình luận ({{ totalComments }})
          </h3>

          <select
            class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="popular">Phổ biến</option>
          </select>
        </div>

        <div class="space-y-4">
          <ForumComment
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
            :post-user-id="postDetail.user?.id || 0"
            :level="0"
            @reply="handleReply"
            @like="handleLike"
          />
        </div>

        <!-- Empty State -->
        <div
          v-if="!comments || comments.length === 0"
          class="text-center py-12"
        >
          <MessageCircle class="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 class="text-lg font-medium text-gray-900 mb-1">
            Chưa có bình luận
          </h3>
          <p class="text-gray-500">
            Hãy là người đầu tiên bình luận về bài viết này!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Clock,
  ThumbsUp,
  MessageCircle,
  Smile,
  ImageIcon,
  Share,
  Bookmark,
  ChevronRight,
} from "lucide-vue-next";
import type { PostCreateResponseDto } from "~/auto_api";
import { onClickOutside } from "@vueuse/core";

const route = useRoute();
const token = useCookie("auth.token");
const postDetail = ref({} as PostCreateResponseDto);
const currentUser = await useCurrentUser();

// Fetch post data
const data = await postService.postControllerGetPostDetail(
  String(route.params.slug)
);
postDetail.value = data.data;

// SEO Meta
useSeoMeta({
  title: postDetail.value.title + " - Thảo luận",
  description: postDetail.value.content.substring(0, 160) + "...",
});

const totalComments = countComments(postDetail.value.comments);
const comments = postDetail.value?.comments;
const newComment = ref("");
const showEmojiPicker = ref(false);
const emojiPickerShow = ref<HTMLElement | null>(null);

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

// Count total comments including replies
function countComments(comments: any): number {
  let count = 0;
  for (const comment of comments) {
    count += 1;
    if (comment.replies && comment.replies.length > 0) {
      count += countComments(comment.replies);
    }
  }
  return count;
}

// Emoji picker handlers
const onEmojiClick = (event: any) => {
  const emoji = event.detail.unicode;
  newComment.value += emoji;
};

onClickOutside(emojiPickerShow, () => {
  showEmojiPicker.value = false;
});

// Comment submission
const commentPost = async () => {
  if (!newComment.value.trim()) return;

  const payload = {
    userId: currentUser.value?.id || 0,
    postId: postDetail.value.id,
    comment: newComment.value,
    parentId: null,
  };

  try {
    const data = await commentService.commentControllerCreate(payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!data) {
      ElMessage.error("Bình luận không thành công!");
      return;
    }

    ElMessage.success("Bình luận thành công!");
    newComment.value = "";

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error("Lỗi khi gửi bình luận:", error);
    ElMessage.error("Đã có lỗi xảy ra khi gửi bình luận.");
  }
};

// Handle reply submission
const handleReply = async (reply: { commentId: number; content: string }) => {
  const payload = {
    userId: currentUser.value?.id || 0,
    postId: postDetail.value.id,
    comment: reply.content,
    parentId: reply.commentId,
  };

  try {
    const data = await commentService.commentControllerCreate(payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!data) {
      ElMessage.error("Trả lời không thành công!");
      return;
    }

    ElMessage.success("Trả lời thành công!");

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error("Lỗi khi trả lời:", error);
    ElMessage.error("Đã có lỗi xảy ra khi trả lời.");
  }
};

// Handle like
const handleLike = (commentId: string) => {
  console.log("Like comment:", commentId);
  // Implement like functionality
};
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
textarea:focus,
select:focus,
button:focus-visible {
  outline: none;
}

/* Prose styling for post content */
.prose {
  line-height: 1.7;
}

.prose p {
  margin-bottom: 1rem;
}

/* Ensure proper text wrapping */
.whitespace-pre-wrap {
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .prose {
    font-size: 14px;
  }
}
</style>
