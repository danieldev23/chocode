<template>
  <div class="w-auto mx-auto bg-white rounded-lg shadow">
    <!-- Create Post Section -->
    <div class="p-4 border-b">
      <div class="flex items-center space-x-4">
        <img
          :src="currentUser?.avatar || DefaultAvatarUser"
          alt="User Avatar"
          class="w-10 h-10 rounded-full"
        />
        <el-input
          v-model="postText"
          placeholder="Bạn đang nghĩ gì thế?"
          class="flex-1"
        />
        <el-button type="primary" class="ml-2">Đăng bài</el-button>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center mt-4 space-x-6">
        <button class="flex items-center text-gray-600 hover:text-gray-800">
          <ImageIcon class="w-5 h-5 mr-2" />
          <span class="text-sm">Image/Video</span>
        </button>
        <button class="flex items-center text-gray-600 hover:text-gray-800">
          <PaperclipIcon class="w-5 h-5 mr-2" />
          <span class="text-sm">Attachment</span>
        </button>
        <button class="flex items-center text-gray-600 hover:text-gray-800">
          <VideoIcon class="w-5 h-5 mr-2" />
          <span class="text-sm">Live</span>
        </button>
        <button class="flex items-center text-gray-600 hover:text-gray-800">
          <HashtagIcon class="w-5 h-5 mr-2" />
          <span class="text-sm">Hashtag</span>
        </button>
        <button class="flex items-center text-gray-600 hover:text-gray-800">
          <AtSignIcon class="w-5 h-5 mr-2" />
          <span class="text-sm">Mention</span>
        </button>
      </div>
    </div>
  </div>
  <!-- Post -->
  <div>
    <!-- Posts -->
    <div
      v-for="(post, index) in posts"
      :key="index"
      class="p-4 mt-5 bg-white rounded-lg shadow"
    >
      <!-- Post Header -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <img
            :src="post.avatar"
            alt="User avatar"
            class="w-10 h-10 rounded-full"
          />
          <div>
            <h3 class="font-medium">{{ post.username }}</h3>
            <p class="text-sm text-gray-500">{{ post.timestamp }}</p>
          </div>
        </div>
        <el-dropdown>
          <MoreVertical
            class="w-5 h-5 text-gray-500 cursor-pointer outline-none"
          />
          <template #dropdown>
            <el-dropdown-menu class="outline-none">
              <el-dropdown-item>Edit</el-dropdown-item>
              <el-dropdown-item>Delete</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <p class="mb-2">122387236872876</p>

      <!-- Post Images -->
      <div class="grid grid-cols-2 gap-2 mb-4">
        <img
          v-for="(image, idx) in post.images"
          :key="idx"
          :src="image"
          class="w-full rounded-lg object-cover aspect-square cursor-pointer"
          @click="openDialog(image)"
        />
      </div>

      <!-- Post Actions -->
      <div class="flex items-center space-x-6">
        <button class="flex items-center text-gray-600 hover:text-gray-800">
          <HeartIcon class="w-5 h-5 mr-1" />
          <span class="text-sm">30 Like</span>
        </button>
        <button class="flex items-center text-gray-600 hover:text-gray-800">
          <MessageCircleIcon class="w-5 h-5 mr-1" />
          <span class="text-sm">12 Comment</span>
        </button>
        <button class="flex items-center text-gray-600 hover:text-gray-800">
          <ShareIcon class="w-5 h-5 mr-1" />
          <span class="text-sm">5 Share</span>
        </button>
        <button
          class="flex items-center text-gray-600 hover:text-gray-800 ml-auto"
        >
          <BookmarkIcon class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Dialog -->
    <el-dialog
      v-model="centerDialogVisible"
      width="700px"
      align-center
      class="rounded-lg overflow-hidden bg-transparent"
    >
      <img
        :src="selectedImage"
        class="w-full rounded-lg object-cover aspect-square"
        @click="closeDialog"
      />
    </el-dialog>
  </div>
  <!-- Post -->
</template>

<script setup lang="ts">
import {
  ImageIcon,
  PaperclipIcon,
  VideoIcon,
  AtSignIcon,
  HeartIcon,
  MessageCircleIcon,
  ShareIcon,
  BookmarkIcon,
  MoreVertical,
} from "lucide-vue-next";
const { getSession } = useAuth();
import DefaultAvatarUser from "~/assets/images/header/default-avatar.png";
const currentUser = await getSession();
const postText = ref("");
const centerDialogVisible = ref(false);
const selectedImage = ref<string | undefined>(undefined);
const posts = [
  {
    username: "Cameron Williamson",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    timestamp: "14 Aug at 4:23 PM",
    images: [
      "https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1536148935331-408321065b18?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    username: "Jane Doe",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    timestamp: "15 Aug at 10:12 AM",
    images: [
      "https://images.unsplash.com/photo-1580894908361-967195033215?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1580894896813-652ff5aa8146?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
];

const openDialog = (image: string) => {
  selectedImage.value = image;
  centerDialogVisible.value = true;
};

const closeDialog = () => {
  centerDialogVisible.value = false;
};
</script>

<style>
/* Override Element Plus input styles */
.el-input__wrapper {
  background-color: #f3f4f6 !important;
  box-shadow: none !important;
  padding: 8px 12px !important;
  border-radius: 0.5rem !important;
}

.el-input__wrapper:hover {
  background-color: #e5e7eb !important;
}
.el-dialog.is-align-center.rounded-lg.overflow-hidden.bg-transparent {
  background: transparent;
}
</style>
