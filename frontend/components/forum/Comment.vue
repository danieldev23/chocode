<!-- CommentItem.vue -->
<template>
  <div
    class="bg-white rounded-md"
    :class="{
      'ml-4 sm:ml-8': level > 0,
      'ml-2 sm:ml-4': level > 2,
    }"
    :style="{ marginLeft: level > 0 ? `${Math.min(level * 20, 60)}px` : '0' }"
  >
    <div class="p-3 sm:p-4">
      <!-- Comment Header -->
      <div class="flex items-center justify-between">
        <div class="flex gap-2 sm:gap-3 mb-2">
          <img
            :src="comment.user.avatar"
            :alt="comment.user.fullName"
            class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
          />
          <div class="flex-1 min-w-0">
            <div class="flex flex-col">
              <NuxtLink
                :to="`/trang-ca-nhan/${comment.user.username}`"
                class="font-medium text-sm sm:text-base text-gray-900 truncate flex items-center hover:text-primary"
              >
                {{ comment.user.fullName }}
                <div v-if="comment.user.id === props.postUserId" class="inline-flex items-center text-xs text-gray-500 p-1 border-primary "><PencilLine class="w-4 h-4 ml-2 mr-1 items-center"/>Tác giả</div>
              </NuxtLink>
              <span class="text-xs text-gray-500 flex items-center">
                <Clock class="w-3 h-3 mr-1" />
                {{ formatTimestamp(comment.createdAt) }}
              </span>
            </div>
          </div>
        </div>

        <button
          class="mb-8"
          v-if="currentUser?.id === comment.user.id"
          @click="deleteComment(Number(comment.id), comment.comment)"
        >
          <Trash class="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <!-- Comment Content -->
      <div class="mb-3 ml-10 sm:ml-13 px-3">
        <p class="text-sm sm:text-base text-gray-800 leading-relaxed">
          {{ comment.comment }}
        </p>
      </div>

      <!-- Comment Actions -->
      <div class="flex items-center gap-4 sm:gap-6 ml-10 sm:ml-13 text-sm px-3">
        <button
          @click="toggleLike"
          class="flex items-center gap-1 hover:text-red-500 transition-colors"
          :class="{ 'text-red-500': isLiked, 'text-gray-500': !isLiked }"
        >
          <ThumbsUp class="w-4 h-4" :class="{ 'fill-current': isLiked }" />
          <span>{{ likesCount }}</span>
        </button>

        <button
          v-if="level < maxLevel"
          @click="toggleReply"
          class="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors"
        >
          <MessageCircle class="w-4 h-4" />
          <span class="hidden sm:inline">Trả lời</span>
          <span class="sm:hidden">Reply</span>
        </button>

        <!-- Show replies toggle for mobile -->
        <button
          v-if="comment.replies && comment.replies.length > 0"
          @click="toggleShowReplies"
          class="sm:hidden flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors"
        >
          <ChevronDown
            class="w-4 h-4 transition-transform"
            :class="{ 'rotate-180': !showReplies }"
          />
          <span
            >{{ comment.replies.length }}
            {{ comment.replies.length > 1 ? "replies" : "reply" }}</span
          >
        </button>
      </div>

      <!-- Reply Input -->
      <div v-if="showReplyInput" class="mt-4 ml-10 sm:ml-13">
        <div class="flex gap-2">
          <img
            :src="currentUser?.avatar"
            alt="current user"
            class="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0"
          />
          <div class="flex-1">
            <el-input
              v-model="replyContent"
              type="textarea"
              :placeholder="`Trả lời ${comment.user.fullName}...`"
              :rows="2"
              class="mb-2"
              size="small"
            />
            <div class="flex justify-end gap-2">
              <el-button size="small" @click="cancelReply"> Hủy </el-button>
              <el-button
                type="primary"
                size="small"
                @click="submitReply"
                :disabled="!replyContent.trim()"
              >
                Gửi
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Nested Replies -->
    <div
      v-if="comment.replies && comment.replies.length > 0"
      v-show="showReplies || !isMobile"
      class="space-y-2 pb-2"
    >
      <CommentItem
        v-for="reply in comment.replies"
        :key="reply.id"
        :comment="reply"
        :level="level + 1"
        :max-level="maxLevel"
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
  ThumbsUp,
  MessageCircle,
  ChevronDown,
  Trash,
  PencilLine
} from "lucide-vue-next";
import { NuxtLink } from "#components";

// Define component name for recursion
defineOptions({
  name: "CommentItem",
});

interface User {
  id: number;
  fullName: string;
  username: string;
  avatar: string;
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
  ElMessageBox.confirm(`Bạn chắc chắn muốn xoá "${comment}"?`, "Warning", {
    confirmButtonText: "Xoá",
    cancelButtonText: "Huỷ",
    type: "warning",
  })
    .then(() => {
      const data = commentService.commentControllerDelete(
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
      if (!data)
        ElMessage({
          type: "error",
          message: "Xoá bình luận không thành công!",
        });
      ElMessage({
        type: "success",
        message: "Xoá bình luận thành công!",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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
:deep(.el-textarea__inner) {
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  resize: none;
  font-size: 0.875rem;
}

:deep(.el-textarea__inner:focus) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

:deep(.el-button--primary) {
  background: linear-gradient(to right, #0072ff, #00c6ff);
  border: none;
}

:deep(.el-button--small) {
  padding: 5px 12px;
  font-size: 0.75rem;
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
</style>
