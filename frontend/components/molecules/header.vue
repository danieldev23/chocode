<template>
  <div>
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 h-12 bg-white shadow-md z-50">
      <div
        class="relative h-12 flex items-center mx-auto w-[1326px] justify-between px-4"
      >
        <NuxtLink to="/" class="shrink-0 h-10 cursor-pointer">
          <img
            src="~/assets/images/header/logo.png"
            alt="logo home fqa"
            class="h-10 w-30 object-contain"
          />
        </NuxtLink>

        <nav class="flex items-center gap-8 text-sm">
          <NuxtLink
            to=""
            class="flex items-center hover:text-primary transition-colors cursor-pointer"
          >
            <MessageSquare class="w-5 h-5 mr-1.5" />
            Thảo luận
          </NuxtLink>
          <NuxtLink
            to=""
            class="flex items-center hover:text-primary transition-colors cursor-pointer"
          >
            <Store class="w-5 h-5 mr-1.5" />
            Mua bán
          </NuxtLink>
          <NuxtLink
            to=""
            class="flex items-center hover:text-primary transition-colors cursor-pointer"
          >
            <BriefcaseBusiness class="w-5 h-5 mr-1.5" />
            Tìm việc
          </NuxtLink>
          <NuxtLink
            to=""
            class="flex items-center hover:text-primary transition-colors cursor-pointer"
          >
            <User class="w-5 h-5 mr-1.5" />
            Thuê Freelancer
          </NuxtLink>

          <div v-if="currentUser" class="relative">
            <el-dropdown>
              <span class="flex items-center cursor-pointer">
                Tài khoản
                <el-icon class="ml-1"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>Thông tin tài khoản</el-dropdown-item>
                  <el-dropdown-item>Đăng xuất</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <el-button v-else type="primary" @click="centerDialogVisible = true">
            Đăng nhập
          </el-button>
        </nav>
      </div>
    </header>
    <!-- Login Dialog -->
    <el-dialog
      v-model="centerDialogVisible"
      title="Đăng nhập"
      width="500px"
      align-center
    >
      <template #default>
        <div class="p-4">
          <!-- Add login form content here -->
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-4">
          <el-button @click="centerDialogVisible = false">Hủy</el-button>
          <el-button
            type="primary"
            class="bg-primary"
            @click="centerDialogVisible = false"
          >
            Đăng nhập
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { MessageSquare, Store, BriefcaseBusiness, User } from "lucide-vue-next";
import { ArrowDown } from "@element-plus/icons-vue";

const currentUser = ref(false);
const centerDialogVisible = ref(false);
const searchQuery = ref("");
const showHotNews = ref(true);

const menuItems = [
  { name: "Tất cả", icon: "🔄", path: "/" },
  { name: "JavaScript", icon: "🟨", path: "/javascript" },
  { name: "Python", icon: "🐍", path: "/python" },
  { name: "Java", icon: "☕", path: "/java" },
  { name: "React", icon: "⚛️", path: "/react" },
  { name: "PHP", icon: "🐘", path: "/php" },
  { name: "Go", icon: "🔵", path: "/golang" },
  { name: "Ruby", icon: "💎", path: "/ruby" },
  { name: "Swift", icon: "🕊️", path: "/swift" },
  { name: "TypeScript", icon: "📘", path: "/typescript" },
  { name: "C++", icon: "⚡", path: "/cpp" },
  { name: "Rust", icon: "🦀", path: "/rust" },
  { name: "Kotlin", icon: "🎯", path: "/kotlin" },
  { name: "Vue", icon: "💚", path: "/vue" },
  { name: "Angular", icon: "🔺", path: "/angular" },
];
</script>
