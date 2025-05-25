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
                name: 'notification',
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
          <NuxtLink
            v-if="currentUser"
            class="bg-primary-gradient text-white py-1 px-2 rounded-[3px]"
            to="/dang-bai"
          >
            Đăng bài
          </NuxtLink>
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
                      <User class="w-5 h-5 mr-2" />
                      Thông tin tài khoản
                    </NuxtLink>
                  </el-dropdown-item>
                  <el-dropdown-item
                    class="!flex !items-center"
                    @click="showBankingModal"
                  >
                    <HandCoins class="w-5 h-5 mr-2" />
                    Nạp coin
                  </el-dropdown-item>
                  <el-dropdown-item class="!flex !items-center" @click="logout">
                    <Lock class="w-5 h-5 mr-2" />
                    Đăng xuất
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>

          <!-- Login Button -->
          <NuxtLink
            v-else
            class="!h-9 !px-5 !font-medium !text-sm bg-primary-gradient text-white"
            to="/auth/login"
          >
            Đăng nhập
          </NuxtLink>
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
    <!-- Dialog banking  -->
    <el-dialog
      v-model="dialogBanking"
      title=""
      width="500"
      :show-close="false"
      class="banking-dialog"
    >
      <!-- Custom Header -->
      <template #header>
        <div class="flex items-center justify-between px-6 pb-0">
          <div class="flex items-center space-x-3">
            <div
              class="w-12 h-12 bg-primary-gradient rounded-xl flex items-center justify-center shadow-lg"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                ></path>
              </svg>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-800">Chuyển khoản</h3>
              <p class="text-sm text-gray-500">Nạp Code Point dễ dàng</p>
            </div>
          </div>
          <button
            @click="dialogBanking = false"
            class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <svg
              class="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </template>

      <!-- Dialog Body -->
      <div class="p-6 pt-2">
        <!-- QR Code Section -->
        <div class="relative mb-8">
          <div
            class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100 border-dashed"
          >
            <div class="flex flex-col items-center space-y-4">
              <!-- QR Code Container -->
              <div class="relative">
                <div
                  class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-20"
                ></div>
                <div
                  class="relative bg-white rounded-2xl shadow-xl border-2 border-white"
                >
                  <img
                    alt="Banking QR"
                    :src="`https://api.vietqr.io/image/970422-09999838622222-1d7x779.jpg?accountName=DANG%20QUOC%20HUY&addInfo=CHOCODE_${currentUser?.username}`"
                    class="w-49 h-49 object-contain rounded-xl"
                  />
                </div>
              </div>

              <!-- Bank Info -->
              <div class="text-center space-y-2">
                <div class="flex items-center justify-center space-x-2">
                  <img
                    class="w-12 h-5"
                    src="~/assets/images/header/mbbank_logo.png"
                  />
                  <span class="font-semibold text-gray-700">MB Bank</span>
                </div>
                <p class="text-sm text-gray-600">STK: 09999838622222</p>
                <p class="text-sm font-medium text-gray-800">DANG QUOC HUY</p>
                <h4 class="font-semibold text-gray-800 mb-1">
                  Nội dung chuyển khoản:
                </h4>
                <div
                  class="bg-gray-50 rounded-lg p-3 font-mono text-sm border-2 border-dashed border-gray-200 flex items-center justify-center gap-x-4"
                >
                  <span class="text-primary font-bold" ref="codeRef"
                    >CHOCODE_{{ currentUser?.username }}</span
                  >
                  <Copy class="w-4 h-4 cursor-pointer" @click="handleCopy" />
                </div>
                <p class="text-xs text-gray-500 mt-2">
                  💡 Vui lòng chuyển khoản đúng nội dung để được cộng điểm tự
                  động
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Transfer Info -->
        <div class="space-y-4 mb-6">
          <!-- Exchange Rate -->
          <div
            class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200"
          >
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  ></path>
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-gray-800">Tỷ giá quy đổi</h4>
                <div class="flex items-center space-x-2 mt-1">
                  <span class="text-2xl font-bold text-green-500">1 CP</span>
                  <span class="text-gray-400">=</span>
                  <span class="text-2xl font-bold text-[#F97316]"
                    >1.000 VNĐ</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Support Info -->
        <div class="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div class="flex items-start space-x-3">
            <div
              class="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
            >
              <svg
                class="w-4 h-4 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div class="text-sm text-yellow-800">
              <p class="font-medium mb-1">Lưu ý quan trọng:</p>
              <ul class="space-y-1 text-xs">
                <li>• Chuyển khoản sai nội dung sẽ không được cộng điểm</li>
                <li>• Thời gian xử lý: 1-5 phút sau khi chuyển khoản</li>
                <li>• Liên hệ hỗ trợ nếu có vấn đề</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- Mobile Menu -->
    <aside
      class="fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 lg:hidden"
      :class="menuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div
        class="p-4 flex justify-between items-center border-b border-gray-200"
      >
        <NuxtLink to="/" class="h-10" @click="menuOpen = false">
          <img
            src="~/assets/images/header/logo.png"
            alt="Chocode logo"
            class="h-10 w-auto object-contain"
          />
        </NuxtLink>
        <button
          @click="menuOpen = false"
          class="text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div class="py-4">
        <!-- User Profile (Mobile) -->
        <div v-if="currentUser" class="px-4 py-3 border-b border-gray-200">
          <div class="flex items-center mb-3">
            <UserAvatar :avatar="currentUser.avatar" />
            <span class="ml-2 font-medium text-gray-800">{{
              currentUser.fullName
            }}</span>
          </div>
          <div class="flex flex-col space-y-4">
            <NuxtLink
              :to="{
                name: 'profile',
                params: { username: currentUser?.username },
              }"
              class="flex items-center text-gray-600 hover:text-primary text-sm"
              @click="menuOpen = false"
            >
              <User class="w-5 h-5 mr-2" />
              Thông tin tài khoản
            </NuxtLink>
            <button
              class="flex items-center text-gray-600 hover:text-primary text-sm"
              @click="logout"
            >
              <HandCoins class="w-5 h-5 mr-2" />
              Nạp coin
            </button>
            <button
              class="flex items-center text-gray-600 hover:text-primary text-sm"
              @click="logout"
            >
              <Lock class="w-5 h-5 mr-2" />
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
            class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-primary"
            @click="menuOpen = false"
          >
            <component :is="item.icon" class="w-5 h-5 mr-3" />
            {{ item.label }}
          </NuxtLink>

          <div class="px-4 py-3" v-if="currentUser">
            <NuxtLink
              :to="{
                name: 'notification',
              }"
              class="flex items-center text-gray-600 hover:text-primary"
              @click.prevent="
                visible = !visible;
                menuOpen = false;
              "
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

          <div class="px-4 pt-4">
            <NuxtLink
              class="w-full bg-primary-gradient text-white py-2 px-4 rounded font-medium"
              to="/dang-bai"
            >
              Đăng bài
            </NuxtLink>
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
  HandCoins,
  Lock,
  Copy,
  Bell,
  Menu,
  Laptop,
} from "lucide-vue-next";

import { ArrowDown } from "@element-plus/icons-vue";
const menuOpen = ref(false);
const dialogBanking = ref(false);
const toLogin = () => {
  navigateTo("/auth/login");
};
const codeRef = ref('It is demo');

function handleCopy() {
  const text = codeRef.value.innerText;
  navigator.clipboard
    .writeText(text)
    .then(() => {
      ElMessage.success("Đã copy nội dung chuyển khoản thành công!");
    })
    .catch(() => {
      ElMessage.error("Copy thất bại!");
    });
}
const token = useCookie("auth.token");
const serverToken = useCookie("access_token");
const currentUser = await useCurrentUser();
const showBankingModal = () => {
  dialogBanking.value = !dialogBanking.value;
};
onMounted(() => {
  const handleResize = () => {
    if (window.innerWidth >= 1024 && menuOpen.value) {
      menuOpen.value = false;
    }
  };

  window.addEventListener("resize", handleResize);

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
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
