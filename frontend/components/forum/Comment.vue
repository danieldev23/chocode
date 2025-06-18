<template>
  <div
    class="bg-white rounded-lg border border-gray-200"
    :class="{
      'ml-4 sm:ml-8': level > 0,
      'ml-2 sm:ml-4': level > 2,
    }"
    :style="{ marginLeft: level > 0 ? `${Math.min(level * 20, 60)}px` : '0' }"
  >
    <div class="p-3 sm:p-4">
      <!-- Comment Header -->
      <div class="flex items-start justify-between">
        <div class="flex gap-2 sm:gap-3 mb-2 flex-1">
          <div class="relative flex-shrink-0">
            <img
              :src="comment.user.avatar"
              :alt="comment.user.fullName"
              class="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
            />
            <div
              v-if="comment.user.online"
              class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"
            ></div>
          </div>
          
          <div class="flex-1 min-w-0">
            <div class="flex items-center flex-wrap gap-2 mb-1">
              <NuxtLink
                :to="`/trang-ca-nhan/${comment.user.username}`"
                class="font-medium text-sm sm:text-base text-gray-900 hover:text-blue-600 transition-colors"
              >
                {{ comment.user.fullName }}
              </NuxtLink>
              
              <span
                v-if="comment.user.id === props.postUserId"
                class="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-md"
              >
                <PencilLine class="w-3 h-3 mr-1" />
                Tác giả
              </span>
            </div>
            
            <div class="flex items-center text-xs text-gray-500">
              <Clock class="w-3 h-3 mr-1" />
              <span>{{ formatTimestamp(comment.createdAt) }}</span>
            </div>
          </div>
        </div>

        <button
          v-if="currentUser?.id === comment.user.id"
          @click="deleteComment(Number(comment.id), comment.comment)"
          class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors flex-shrink-0"
        >
          <Trash class="w-4 h-4" />
        </button>
      </div>

      <!-- Comment Content -->
      <div class="ml-10 sm:ml-13 mb-3">
        <p class="text-sm sm:text-base text-gray-800 leading-relaxed whitespace-pre-wrap">
          {{ comment.comment }}
        </p>
      </div>

      <!-- Comment Actions -->
      <div class="flex items-center gap-4 sm:gap-6 ml-10 sm:ml-13 text-sm">
        <button
          @click="toggleLike"
          class="flex items-center gap-1.5 hover:text-red-500 transition-colors rounded-md px-2 py-1 hover:bg-red-50"
          :class="{ 'text-red-500': isLiked, 'text-gray-500': !isLiked }"
        >
          <Heart class="w-4 h-4" :class="{ 'fill-current': isLiked }" />
          <span class="font-medium">{{ likesCount }}</span>
        </button>

        <button
          v-if="level < maxLevel"
          @click="toggleReply"
          class="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 transition-colors rounded-md px-2 py-1 hover:bg-blue-50"
        >
          <MessageCircle class="w-4 h-4" />
          <span class="hidden sm:inline font-medium">Trả lời</span>
          <span class="sm:hidden font-medium">Reply</span>
        </button>

        <!-- Show replies toggle for mobile -->
        <button
          v-if="comment.replies && comment.replies.length > 0"
          @click="toggleShowReplies"
          class="sm:hidden flex items-center gap-1.5 text-gray-500 hover:text-blue-500 transition-colors rounded-md px-2 py-1 hover:bg-blue-50"
        >
          <ChevronDown
            class="w-4 h-4 transition-transform"
            :class="{ 'rotate-180': !showReplies }"
          />
          <span class="font-medium">
            {{ comment.replies.length }}
            {{ comment.replies.length > 1 ? "replies" : "reply" }}
          </span>
        </button>
      </div>

      <!-- Reply Input -->
      <div v-if="showReplyInput" class="mt-4 ml-10 sm:ml-13 bg-gray-50 rounded-lg p-3">
        <div class="flex gap-3">
          <img
            :src="currentUser?.avatar"
            alt="current user"
            class="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0 object-cover"
          />
          <div class="flex-1">
            <div class="mb-3">
              <textarea
                v-model="replyContent"
                :placeholder="`Trả lời ${comment.user.fullName}...`"
                rows="2"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>
            <div class="flex justify-end gap-2">
              <button
                @click="cancelReply"
                class="px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Hủy
              </button>
              <button
                @click="submitReply"
                :disabled="!replyContent.trim()"
                class="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Nested Replies -->
    <div
      v-if="comment.replies && comment.replies.length > 0"
      v-show="showReplies || !isMobile"
      class="space-y-2 pb-2 border-t border-gray-100"
    >
      <CommentItem
        v-for="reply in comment.replies"
        :key="reply.id"
        :comment="reply"
        :level="level + 1"
        :max-level="maxLevel"
        :post-user-id="props.postUserId"
        @reply="handleNestedReply"
        @like="handleNestedLike"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Clock,
  Heart,
  MessageCircle,
  ChevronDown,
  Trash,
  PencilLine,
} from "lucide-vue-next";
import { NuxtLink } from "#components";
import { ElMessage, ElMessageBox } from "element-plus";

// Define component name for recursion
defineOptions({
  name: "CommentItem",
});

interface User {
  id: number;
  fullName: string;
  username: string;
  avatar: string;
  online?: boolean;
}

interface Comment {
  id: number;
  comment: string;
  createdAt: string;
  user: User;
  feelings: any[];
  replies: Comment[];
}

interface Props {
  comment: Comment;
  level?: number;
  maxLevel?: number;
  postUserId: number;
}

const props = withDefaults(defineProps<Props>(), {
  level: 0,
  maxLevel: 3,
  postUserId: 0,
});

const emit = defineEmits<{
  reply: [{ commentId: number; content: string }];
  like: [commentId: number];
}>();

// Local state
const showReplyInput = ref(false);
const showReplies = ref(true);
const replyContent = ref("");
const isLiked = ref(false);
const likesCount = ref(props.comment.feelings?.length || 0);
const currentUser = await useCurrentUser();
const token = useCookie("auth.token");

// Check if device is mobile
const isMobile = computed(() => {
  if (typeof window !== "undefined") {
    return window.innerWidth < 640;
  }
  return false;
});

// Format timestamp to Vietnamese format
const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) {
    return "Vừa xong";
  } else if (diffMins < 60) {
    return `${diffMins} phút trước`;
  } else if (diffHours < 24) {
    return `${diffHours} giờ trước`;
  } else if (diffDays < 7) {
    return `${diffDays} ngày trước`;
  } else {
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
};

const toggleLike = () => {
  emit("like", props.comment.id);
  // Update local state (in real app, this would be handled by parent)
  isLiked.value = !isLiked.value;
  likesCount.value += isLiked.value ? 1 : -1;
};

const deleteComment = (id: number, comment: string) => {
  ElMessageBox.confirm(`Bạn chắc chắn muốn xoá "${comment}"?`, "Xác nhận", {
    confirmButtonText: "Xoá",
    cancelButtonText: "Huỷ",
    type: "warning",
  })
    .then(async () => {
      try {
        const data = await commentService.commentControllerDelete(
          {
            id: id,
            userId: currentUser.value?.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.value}`,
            },
          }
        );
        
        ElMessage({
          type: "success",
          message: "Xoá bình luận thành công!",
        });
        
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        ElMessage({
          type: "error",
          message: "Xoá bình luận không thành công!",
        });
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Huỷ xoá",
      });
    });
};

const toggleReply = () => {
  if (props.level >= props.maxLevel) return;
  showReplyInput.value = !showReplyInput.value;
  if (showReplyInput.value) {
    replyContent.value = "";
  }
};

const toggleShowReplies = () => {
  showReplies.value = !showReplies.value;
};

const submitReply = () => {
  if (replyContent.value.trim()) {
    emit("reply", {
      commentId: props.comment.id,
      content: replyContent.value,
    });
    replyContent.value = "";
    showReplyInput.value = false;
  }
};

const cancelReply = () => {
  replyContent.value = "";
  showReplyInput.value = false;
};

// Handle nested events
const handleNestedReply = (payload: { commentId: number; content: string }) => {
  emit("reply", payload);
};

const handleNestedLike = (commentId: number) => {
  emit("like", commentId);
};
</script>

<style scoped>
/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Focus styles for accessibility */
button:focus-visible,
textarea:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Custom indentation for deeply nested comments */
@media (max-width: 640px) {
  .ml-10 {
    margin-left: 2rem;
  }

  .ml-13 {
    margin-left: 2rem;
  }
}

@media (min-width: 640px) {
  .ml-13 {
    margin-left: 3.25rem;
  }
}

/* Ensure proper text wrapping */
.whitespace-pre-wrap {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>