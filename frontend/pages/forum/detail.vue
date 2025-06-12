<template>
  <div class="w-full flex-1">
    <ForumSearch />
    <div class="bg-white w-full h-auto p-2 sm:p-4">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item>
          <NuxtLink href="/thao-luan">Thảo luận</NuxtLink>
        </el-breadcrumb-item>
        <el-breadcrumb-item
          ><NuxtLink :to="`/thao-luan/bai-dang/${postDetail.slug}`">{{
            postDetail.title
          }}</NuxtLink></el-breadcrumb-item
        >
      </el-breadcrumb>

      <!-- Main Post -->
      <div class="w-full mt-4 border border-xs rounded-md">
        <div class="flex items-center justify-between">
          <div class="flex gap-2 p-2 sm:p-3">
            <img
              :src="postDetail.user.avatar"
              alt="default avatar"
              class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
            />
            <div class="flex flex-col gap-y-1 min-w-0">
              <NuxtLink
                :to="`/trang-ca-nhan/${postDetail.user.username}`"
                class="text-sm font-medium hover:text-primary cursor-pointer truncate"
                >{{ postDetail.user.fullName }}</NuxtLink
              >
              <span class="text-xs inline-flex text-gray-600 items-center"
                ><Clock class="w-3 h-3 sm:w-4 sm:h-4 mr-1" />{{
                  formatRelativeTime(String(postDetail.createdAt))
                }}</span
              >
            </div>
          </div>
        </div>

        <div class="p-2 sm:p-3 mt-1 text-sm sm:text-base">
          <h4>{{ postDetail.title }}</h4>
          <span class="block">
            {{ postDetail.content }}
          </span>
          <span class="text-secondary mt-6 te"
            >#{{ postDetail.category.title }}</span
          >
          <img
            src="~/assets/images/header/banner2.gif"
            alt=""
            class="mt-3 w-full h-auto rounded"
          />
        </div>

        <div class="p-2 sm:p-3 flex gap-x-4 sm:gap-x-10 text-sm sm:text-base">
          <span class="inline-flex items-center">
            <ThumbsUp
              class="w-4 h-4 sm:w-5 sm:h-5 mr-1 cursor-pointer hover:text-red-400"
            />
            20
          </span>
          <span class="inline-flex items-center">
            <MessageCircle
              class="w-4 h-4 sm:w-5 sm:h-5 mr-1 cursor-pointer hover:text-red-400"
            />
            <span class="hidden sm:inline">{{ totalComments }} bình luận</span>
            <span class="sm:hidden">{{ totalComments }}</span>
          </span>
        </div>

        <div class="mt-4 space-y-4">
          <!-- Comment Input -->
          <div class="bg-white rounded-md p-3 sm:p-4">
            <div class="flex gap-2">
              <img
                :src="currentUser.avatar"
                alt="current user"
                class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
              />
              <div class="flex-1">
                <el-input
                  v-model="newComment"
                  type="textarea"
                  :autosize="{ minRows: 4 }"
                  placeholder="Viết bình luận..."
                  class="mb-2"
                />

                <div class="flex justify-between items-center">
                  <div
                    ref="emojiPickerShow"
                    v-if="showEmojiPicker"
                    class="absolute bottom-[-20rem] right-50 z-50 shadow-lg rounded-xl overflow-hidden"
                  >
                    <emoji-picker @emoji-click="onEmojiClick" class="light" />
                  </div>
                  <div class="flex gap-2 text-gray-500">
                    <button @click="showEmojiPicker = !showEmojiPicker">
                      <Smile
                        class="w-5 h-5 cursor-pointer hover:text-primary"
                      />
                    </button>
                    <Image class="w-5 h-5 cursor-pointer hover:text-primary" />
                  </div>
                  <el-button
                    type="primary"
                    size="small"
                    @click="commentPost"
                    class="bg-primary"
                  >
                    Gửi
                  </el-button>
                </div>
              </div>
            </div>
          </div>

          <!-- Comments List -->
          <div class="space-y-3">
            <ForumComment
              v-for="comment in comments"
              :key="comment.id"
              :comment="comment"
              :postUserId="postDetail.user.id"
              :level="0"
              @reply="handleReply"
              @like="handleLike"
            />
          </div>
        </div>
      </div>

      <!-- Comment Section -->
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
  Image,
  ArrowRight,
} from "lucide-vue-next";
import type { PostCreateResponseDto } from "~/auto_api";
import { onClickOutside } from "@vueuse/core";
const route = useRoute();
const token = useCookie("auth.token");
const postDetail = ref({} as PostCreateResponseDto);
const currentUser = await useCurrentUser();
const data = await postService.postControllerGetPostDetail(
  String(route.params.slug)
);
postDetail.value = data.data;
const totalComments = countComments(postDetail.value.comments);
console.log(data.data);
const newComment = ref("");
const showEmojiPicker = ref(false);
const emojiPickerShow = ref<HTMLElement | null>(null);
const onEmojiClick = (event: any) => {
  const emoji = event.detail.unicode;
  newComment.value += emoji;
};
onClickOutside(emojiPickerShow, (event) => {
  showEmojiPicker.value = !showEmojiPicker.value;
});
const comments = postDetail.value?.comments;

const commentPost = async () => {
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
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (error) {
    console.error("Lỗi khi gửi bình luận:", error);
    ElMessage.error("Đã có lỗi xảy ra khi gửi bình luận.");
  }
};
function countComments(comments: any) {
  let count = 0;

  for (const comment of comments) {
    count += 1;
    if (comment.replies && comment.replies.length > 0) {
      count += countComments(comment.replies);
    }
  }

  return count;
}

const postComment = async (payload: {
  userId: number;
  postId: number;
  comment: string;
  parentId: number | null;
}) => {
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
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (error) {
    console.error("Lỗi khi gửi bình luận:", error);
    ElMessage.error("Đã có lỗi xảy ra khi gửi bình luận.");
  }
};

const handleReply = async (reply: { commentId: number; content: string }) => {
  const payload = {
    userId: currentUser.value.id,
    postId: postDetail.value.id,
    comment: reply.content,
    parentId: reply.commentId,
  };

  await postComment(payload);

  console.log("Reply to:", reply.commentId, "Content:", reply.content);
};

const handleLike = (commentId: string) => {
  console.log("Like comment:", commentId);
};
</script>

<style scoped>
:deep(.el-textarea__inner) {
  border-radius: 8px;
  /* border: 0.1px solid #efefef; */
  resize: none;
}

:deep(.el-textarea__inner:focus) {
  border-color: #3b82f6;
  /* box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); */
}
</style>
