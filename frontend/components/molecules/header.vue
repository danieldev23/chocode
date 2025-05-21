<template>
  <div>
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50">
      <div
        class="relative h-full flex items-center justify-between mx-4 md:mx-16 lg:mx-32 xl:mx-[12rem]"
      >
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="shrink-0 h-10 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <img
            src="~/assets/images/header/logo.png"
            loading="lazy"
            alt="Chocode logo"
            class="h-10 w-auto object-contain"
          />
        </NuxtLink>

        <!-- Navigation -->
        <nav
          class="hidden sm:hidden md:hidden lg:flex items-center gap-8 text-[15px] text-gray-600"
        >
          <NuxtLink
            v-for="(item, index) in navItems"
            :key="index"
            :to="item.to"
            class="flex items-center hover:text-primary transition-colors cursor-pointer font-medium py-2"
          >
            <component :is="item.icon" class="w-[18px] h-[18px] mr-2" />
            {{ item.label }}
          </NuxtLink>
          <div class="relative" v-if="currentUser">
            <NuxtLink
              :to="{
                name: 'notification'
              }"
              class="relative flex items-center hover:text-primary transition-colors cursor-pointer font-medium py-2"
              @click.prevent="visible = !visible"
            >
              <Bell
                class="w-[18px] h-[18px] mr-2 transition-colors"
                :class="visible ? 'text-primary' : ''"
              />
              Thông báo
              <div
                v-if="unreadCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] font-medium min-w-[16px] h-4 rounded-full flex items-center justify-center px-1"
              >
                {{ unreadCount }}
              </div>
            </NuxtLink>

            <!-- Notification Popover -->
          </div>
          <button
            v-if="currentUser?.role === 'user'"
            class="bg-primary-gradient text-white py-1 px-2 rounded-[3px]"
            @click="navigateTo('/dang-bai')"
          >
            Đăng bài
          </button>
          <!-- User Menu -->
          <div v-if="currentUser" class="relative ml-2">
            <el-dropdown trigger="hover">
              <span
                class="flex items-center cursor-pointer hover:text-primary outline-none transition-colors"
              >
                <UserAvatar :avatar="currentUser.avatar" />
                <span class="font-medium">{{ currentUser.fullName }}</span>
                <el-icon class="ml-1 text-gray-400"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item class="!flex !items-center p-0 m-0">
                    <NuxtLink
                      class="flex"
                      :to="{
                        name: 'profile',
                        params: { username: currentUser?.username },
                      }"
                    >
                      <User class="w-4 h-4 mr-2" />
                      Thông tin tài khoản
                    </NuxtLink>
                  </el-dropdown-item>
                  <el-dropdown-item class="!flex !items-center" @click="logout">
                    <Lock class="w-4 h-4 mr-2" />
                    Đăng xuất
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>

          <!-- Login Button -->
          <el-button
            v-else
            class="!h-9 !px-5 !font-medium !text-sm bg-primary-gradient text-white"
            @click="navigateTo('auth/dang-nhap')"
          >
            Đăng nhập
          </el-button>
        </nav>
        <div class="flex items-center space-x-2 lg:hidden mr-[-0.4rem]">
          <el-button
            v-if="!currentUser"
            class="!h-9 !px-5 !font-medium !text-sm bg-primary-gradient text-white"
            @click="toLogin"
          >
            Đăng nhập
          </el-button>

          <button @click="menuOpen = !menuOpen" class="mr-1">
            <Menu />
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Menu Overlay -->
    <div 
      v-if="menuOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      @click="menuOpen = false"
    ></div>

    <!-- Mobile Menu -->
    <aside 
      class="fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 lg:hidden"
      :class="menuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="p-4 flex justify-between items-center border-b border-gray-200">
        <NuxtLink to="/" class="h-10" @click="menuOpen = false">
          <img
            src="~/assets/images/header/logo.png"
            alt="Chocode logo"
            class="h-10 w-auto object-contain"
          />
        </NuxtLink>
        <button @click="menuOpen = false" class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="py-4">
        <!-- User Profile (Mobile) -->
        <div v-if="currentUser" class="px-4 py-3 border-b border-gray-200">
          <div class="flex items-center mb-3">
            <UserAvatar :avatar="currentUser.avatar" />
            <span class="ml-2 font-medium text-gray-800">{{ currentUser.fullName }}</span>
          </div>
          <div class="flex flex-col space-y-2">
            <NuxtLink
              :to="{
                name: 'profile',
                params: { username: currentUser?.username },
              }"
              class="flex items-center text-gray-600 hover:text-primary text-sm"
              @click="menuOpen = false"
            >
              <User class="w-[18px] h-[18px] mr-2" />
              Thông tin tài khoản
            </NuxtLink>
            <button
              class="flex items-center text-gray-600 hover:text-primary text-sm"
              @click="logout"
            >
              <Lock class="w-[18px] h-[18px] mr-2" />
              Đăng xuất
            </button>
          </div>
        </div>

        <!-- Navigation Links (Mobile) -->
        <nav class="mt-4">
          <NuxtLink
            v-for="(item, index) in navItems"
            :key="index"
            :to="item.to"
            class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary"
            @click="menuOpen = false"
          >
            <component :is="item.icon" class="w-5 h-5 mr-3" />
            {{ item.label }}
          </NuxtLink>
          
          <div class="px-4 py-3" v-if="currentUser">
            <NuxtLink
            :to="{
                name: 'notification'
              }"
              class="flex items-center text-gray-600 hover:text-primary"
              @click.prevent="visible = !visible; menuOpen = false"
            >
              <Bell class="w-5 h-5 mr-3" />
              Thông báo
              <div
                v-if="unreadCount > 0"
                class="ml-2 bg-red-500 text-white text-xs font-medium min-w-[16px] h-4 rounded-full flex items-center justify-center px-1"
              >
                {{ unreadCount }}
              </div>
            </NuxtLink>
          </div>
          
          <div class="px-4 pt-4" v-if="!currentUser">
            <el-button
              class="w-full !h-9 !font-medium !text-sm bg-primary-gradient text-white"
              @click="toLogin"
            >
              Đăng nhập
            </el-button>
          </div>
          
          <div class="px-4 pt-4" v-if="currentUser?.role === 'user'">
            <button
              class="w-full bg-primary-gradient text-white py-2 px-4 rounded font-medium"
              @click="navigateTo('/dang-bai'); menuOpen = false"
            >
              Đăng bài
            </button>
          </div>
        </nav>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">

import {
  MessageSquare,
  Store,
  BriefcaseBusiness,
  User,
  Lock,
  Bell,
  ThumbsUp,
  Share2,
  Menu,
  Mail,
  Chrome,
  Laptop,
} from "lucide-vue-next";

import { ArrowDown } from "@element-plus/icons-vue";
const menuOpen = ref(false);
const toLogin = () => {
  navigateTo("/auth/dang-nhap");
};

const token = useCookie("auth.token");
const serverToken = useCookie("access_token");
const currentUser = await useCurrentUser();

onMounted(() => {
  const handleResize = () => {
    if (window.innerWidth >= 1024 && menuOpen.value) {
      menuOpen.value = false;
    }
  };
  
  window.addEventListener('resize', handleResize);
  
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });
});

const logout = async () => {
  ElMessageBox.confirm("Chắc chắn muốn đăng xuất tài khoản ?", "Xác nhận", {
    confirmButtonText: "Đăng xuất",
    cancelButtonText: "Hủy",
    type: "warning",
  }).then(async () => {
    token.value = null;
    serverToken.value = null;
    ElNotification({
      type: "success",
      message: "Đăng xuất thành công",
    });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  });
};

const navItems = [
  { label: "Tìm việc", icon: BriefcaseBusiness, to: "/tim-viec" },
  { label: "Việc làm IT", icon: Laptop, to: "/viec-lam-it" },
  { label: "Thuê Freelancer", icon: User, to: "/dang-bai" },
  { label: "Mua bán", icon: Store, to: "/mua-ban" },
  { label: "Thảo luận", icon: MessageSquare, to: "/thao-luan" },
];

const visible = ref(false);
const unreadCount = ref(3);
</script>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
div#el-id-1024-0 {
  left: 80rem;
  top: 4rem;
}

.el-radio-button__inner {
  padding: 4px 16px !important;
  font-size: 14px !important;
}

div#el-id-1024-13 {
  z-index: 2013;
  position: absolute;
  left: 80rem;
  top: 4rem;
  width: 380px;
}

.border-gray-300 {
  border-color: #e2e8f0;
}
button.el-button.\!h-9.\!px-5.\!font-medium.\!text-sm.bg-primary-gradient.text-white {
  color: white;
}
button.el-button.w-full.\!h-9.\!font-medium.\!text-sm.bg-primary-gradient.text-white {
    color: white;
}


/* Add these styles for smooth mobile menu animation */
body {
  overflow-x: hidden;
}
</style>