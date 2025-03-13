<template>
  <MoleculesHeader />
  <main>
    <div class="">
      <!-- Main Content -->
      <main class="pt-16 min-h-screen bg-gray-50">
        <!-- Story -->
        <div class="story flex mx-auto py-4 overflow-auto mb-6 bg-white">
          <!-- Story items -->
          <div
            v-for="(story, index) in stories"
            :key="index"
            class="flex-shrink-0 overflow-auto"
          >
            <div class="flex flex-col items-center space-y-1">
              <div
                class="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-0.5 cursor-pointer hover:scale-105 transition-transform"
              >
                <div class="w-full h-full rounded-full p-0.5 bg-white">
                  <img
                    :src="story.avatar"
                    :alt="story.username"
                    class="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <span
                class="text-xs text-gray-600 truncate w-20 text-center px-2"
                >{{ story.username }}</span
              >
            </div>
          </div>
        </div>
        <!--  Story  -->

        <div class="flex gap-6 mx-auto w-[1326px] px-4">
          <!-- Sidebar -->
          <MoleculesSidebar />

          <!-- Content -->
          <div class="flex-1">
            <div class="flex items-center mb-6">
              <div class="relative flex-1">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Tìm kiếm..."
                  class="w-full h-11 rounded-lg border border-gray-200 pl-4 pr-10 focus:outline-none focus:border-primary"
                />
                <span class="absolute right-3 top-2.5 text-gray-400">🔍</span>
              </div>
              <button
                class="ml-4 h-11 px-8 rounded-lg bg-primary-gradient text-white hover:bg-primary-gradient/90 transition-colors"
              >
                Tìm kiếm
              </button>
            </div>
            <slot />
          </div>
        </div>
      </main>
    </div>
  </main>
  <MoleculesFooter />
</template>
<script setup lang="ts">
import { Plus } from "lucide-vue-next";
const searchQuery = ref("");

interface Story {
  username: string;
  avatar: string;
}

// Mock data với random user avatars
const stories = ref<Story[]>([
  {
    username: "hoangduong-l...",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    username: "nutaro_2007",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    username: "Cuong Nb",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    username: "Bảo Sài Gòn",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    username: "Vũ Minh Kiên",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    username: "Lee Chau",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    username: "Jimmii Nam",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    username: "Cuong Nb",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    username: "T.NC",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    username: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    username: "Sophie Tran",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    username: "Mike_London",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    username: "Amy_LuvsCode",
    avatar: "https://randomuser.me/api/portraits/women/13.jpg",
  },
  {
    username: "Tommy Nguyen",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
  },
  {
    username: "Lily Thao",
    avatar: "https://randomuser.me/api/portraits/women/15.jpg",
  },
  {
    username: "DevGuy123",
    avatar: "https://randomuser.me/api/portraits/men/16.jpg",
  },
  {
    username: "Ella Pham",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
  },
  {
    username: "John_DevOps",
    avatar: "https://randomuser.me/api/portraits/men/18.jpg",
  },
  {
    username: "Mila-Coder",
    avatar: "https://randomuser.me/api/portraits/women/19.jpg",
  },
  {
    username: "Kevin Smith",
    avatar: "https://randomuser.me/api/portraits/men/20.jpg",
  },
]);
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
