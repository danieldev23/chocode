<template>
  <div>
    <!-- Header -->
    <header
      class="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50"
    >
      <div
        class="relative h-full flex items-center justify-between mx-[1rem] md:mx-16 lg:mx-32 xl:mx-[12.5rem]"
      >
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="shrink-0 h-8 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img
            src="~/assets/images/header/logo.png"
            loading="lazy"
            alt="Chocode logo"
            class="h-8 w-auto object-contain"
          />
        </NuxtLink>

        <!-- Navigation -->
        <nav class="hidden lg:flex items-center gap-8 text-sm text-gray-600">
          <NuxtLink
            v-for="(item, index) in navItems"
            :key="index"
            :to="item.to"
            class="flex items-center hover:text-gray-900 transition-colors cursor-pointer font-medium py-2 px-3 rounded-md hover:bg-gray-50"
          >
            <component :is="item.icon" class="w-4 h-4 mr-2" />
            {{ item.label }}
          </NuxtLink>
          <!-- Chat global  -->
          <ForumChat />
          <!-- Notification -->
          <div class="relative" v-if="currentUser">
            <button
              @click="navigateTo('/thong-bao')"
              class="relative flex items-center hover:text-gray-900 transition-colors font-medium py-2 px-3 rounded-md hover:bg-gray-50"
              :class="visible ? 'text-gray-900 bg-gray-50' : ''"
            >
              <Bell class="w-4 h-4 mr-2" />
              Thông báo
              <div
                v-if="unreadCount > 0"
                class="absolute top-1 right-1 bg-red-500 text-white text-xs font-medium min-w-[16px] h-4 rounded-full flex items-center justify-center px-1"
              >
                {{ unreadCount }}
              </div>
            </button>
          </div>

          <!-- Post Job Button -->
          <NuxtLink
            v-if="currentUser"
            class="inline-flex items-center px-3 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            to="/dang-bai"
          >
            Đăng bài
          </NuxtLink>

          <!-- User Menu -->
          <div v-if="currentUser" class="relative">
            <el-dropdown trigger="hover" placement="bottom-end">
              <button
                class="flex items-center cursor-pointer hover:bg-gray-50 transition-colors py-2 px-3 rounded-md"
              >
                <div class="relative mr-2">
                  <UserAvatar :avatar="currentUser.avatar" class="w-8 h-8" />
                  <!-- Online indicator -->
                  <div
                    class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"
                  ></div>
                </div>
                <span class="font-medium text-gray-900 text-sm">{{
                  currentUser.fullName
                }}</span>
                <el-icon class="ml-1 text-gray-400 text-sm"
                  ><arrow-down
                /></el-icon>
              </button>
              <template #dropdown>
                <el-dropdown-menu class="evergreen-dropdown">
                  <el-dropdown-item class="!p-0">
                    <NuxtLink
                      class="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      :to="{
                        name: 'profile',
                        params: { username: currentUser?.username },
                      }"
                    >
                      <User class="w-4 h-4 mr-2 text-gray-500" />
                      Thông tin tài khoản
                    </NuxtLink>
                  </el-dropdown-item>

                  <el-dropdown-item class="!p-0">
                    <button
                      class="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      @click="dialogBanking = !dialogBanking"
                    >
                      <HandCoins class="w-4 h-4 mr-2 text-gray-500" />
                      Nạp coin
                    </button>
                  </el-dropdown-item>

                  <el-dropdown-item class="!p-0">
                    <NuxtLink
                      class="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      :to="{ name: 'transaction-history' }"
                    >
                      <History class="w-4 h-4 mr-2 text-gray-500" />
                      Lịch sử giao dịch
                    </NuxtLink>
                  </el-dropdown-item>

                  <div class="border-t border-gray-100 my-1"></div>

                  <el-dropdown-item class="!p-0">
                    <button
                      class="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      @click="logout"
                    >
                      <Lock class="w-4 h-4 mr-2 text-gray-500" />
                      Đăng xuất
                    </button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>

          <!-- Login Button -->
          <button
            v-else
            type="button"
            class="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            @click="toLogin"
          >
            Đăng nhập
          </button>
        </nav>

        <!-- Mobile Controls -->
        <div class="flex items-center space-x-3 lg:hidden">
          <button
            v-if="!currentUser"
            type="button"
            class="inline-flex items-center px-3 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            @click="toLogin"
          >
            Đăng nhập
          </button>

          <button
            @click="menuOpen = !menuOpen"
            class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          >
            <Menu class="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Menu Overlay -->
    <div
      v-if="menuOpen"
      class="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
      @click="menuOpen = false"
    ></div>

    <!-- Banking Dialog -->
    <el-dialog
      v-model="dialogBanking"
      :show-close="false"
      width="420"
      class="evergreen-dialog"
      :close-on-click-modal="false"
    >
      <template #header>
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200"
        >
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"
            >
              <CreditCard class="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">
                Nạp Code Point
              </h3>
              <p class="text-sm text-gray-500">Chuyển khoản ngân hàng</p>
            </div>
          </div>
          <button
            @click="dialogBanking = false"
            class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </template>

      <div class="p-6 space-y-6">
        <!-- QR Code Section -->
        <div class="text-center">
          <div
            class="inline-block p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <img
              :src="`https://api.vietqr.io/image/970422-09999838622222-1d7x779.jpg?accountName=DANG%20QUOC%20HUY&addInfo=CHOCODE_${currentUser?.username}`"
              alt="Banking QR"
              class="w-32 h-32 object-contain"
            />
          </div>
        </div>

        <!-- Bank Info -->
        <div class="bg-gray-50 rounded-lg p-4 space-y-3">
          <div class="flex items-center space-x-2">
            <Building class="w-4 h-4 text-gray-500" />
            <span class="font-medium text-gray-900">MB Bank</span>
          </div>

          <div class="grid grid-cols-1 gap-2 text-sm">
            <div>
              <span class="text-gray-500">Số tài khoản:</span>
              <span class="font-medium text-gray-900 ml-2">09999838622222</span>
            </div>
            <div>
              <span class="text-gray-500">Chủ tài khoản:</span>
              <span class="font-medium text-gray-900 ml-2">DANG QUOC HUY</span>
            </div>
          </div>
        </div>

        <!-- Transfer Content -->
        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-700">
            Nội dung chuyển khoản
          </label>
          <div class="flex items-center space-x-2">
            <div
              class="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md"
            >
              <span class="font-mono text-sm font-medium text-gray-900">
                CHOCODE_{{ currentUser?.username }}
              </span>
            </div>
            <button
              @click="handleCopy"
              class="p-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors"
              :class="{ 'bg-green-500 hover:bg-green-600': copied }"
            >
              <Copy class="w-4 h-4" />
            </button>
          </div>
          <p class="text-xs text-gray-500 flex items-center">
            <Lightbulb class="w-3 h-3 mr-1" />
            Vui lòng chuyển khoản đúng nội dung để được cộng điểm tự động
          </p>
        </div>

        <!-- Exchange Rate -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <TrendingUp class="w-4 h-4 text-primary" />
              <span class="text-sm font-medium text-blue-900"
                >Tỷ giá quy đổi</span
              >
            </div>
            <div class="text-sm font-medium text-blue-900">
              1 CP = 1.000 VNĐ
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- Payment Success Dialog -->
    <PaymentSuccess />

    <!-- Mobile Menu -->
    <aside
      class="fixed top-0 left-0 bottom-0 w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 lg:hidden border-r border-gray-200"
      :class="menuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Mobile Header -->
      <div
        class="p-4 flex justify-between items-center border-b border-gray-200"
      >
        <NuxtLink to="/" class="h-8" @click="menuOpen = false">
          <img
            src="~/assets/images/header/logo.png"
            alt="Chocode logo"
            class="h-8 w-auto object-contain"
          />
        </NuxtLink>
        <button
          @click="menuOpen = false"
          class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <div class="py-4">
        <!-- User Profile (Mobile) -->
        <div v-if="currentUser" class="px-4 py-3 border-b border-gray-200">
          <div class="flex items-center mb-4">
            <div class="relative">
              <UserAvatar :avatar="currentUser.avatar" class="w-10 h-10" />
              <div
                class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"
              ></div>
            </div>
            <div class="ml-3">
              <div class="font-medium text-gray-900">
                {{ currentUser.fullName }}
              </div>
              <div class="text-sm text-gray-500">
                @{{ currentUser.username }}
              </div>
            </div>
          </div>

          <div class="space-y-1">
            <NuxtLink
              :to="{
                name: 'profile',
                params: { username: currentUser?.username },
              }"
              class="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              @click="menuOpen = false"
            >
              <User class="w-4 h-4 mr-2 text-gray-500" />
              Thông tin tài khoản
            </NuxtLink>

            <button
              class="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              @click="
                dialogBanking = !dialogBanking;
                menuOpen = false;
              "
            >
              <HandCoins class="w-4 h-4 mr-2 text-gray-500" />
              Nạp coin
            </button>

            <NuxtLink
              class="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              :to="{ name: 'transaction-history' }"
              @click="menuOpen = false"
            >
              <History class="w-4 h-4 mr-2 text-gray-500" />
              Lịch sử giao dịch
            </NuxtLink>

            <button
              class="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              @click="logout"
            >
              <Lock class="w-4 h-4 mr-2 text-gray-500" />
              Đăng xuất
            </button>
          </div>
        </div>

        <!-- Navigation Links (Mobile) -->
        <nav class="px-4 py-2 space-y-1">
          <NuxtLink
            v-for="(item, index) in navItems"
            :key="index"
            :to="item.to"
            class="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            @click="menuOpen = false"
          >
            <component :is="item.icon" class="w-4 h-4 mr-2 text-gray-500" />
            {{ item.label }}
          </NuxtLink>

          <button
            v-if="currentUser"
            class="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            @click="
              navigateTo('/thong-bao');
              menuOpen = false;
            "
          >
            <Bell class="w-4 h-4 mr-2 text-gray-500" />
            Thông báo
            <div
              v-if="unreadCount > 0"
              class="ml-auto bg-red-500 text-white text-xs font-medium min-w-[16px] h-4 rounded-full flex items-center justify-center px-1"
            >
              {{ unreadCount }}
            </div>
          </button>
        </nav>

        <!-- Mobile Actions -->
        <div class="px-4 pt-4 space-y-3 border-t border-gray-200 mt-4">
          <NuxtLink
            v-if="currentUser"
            class="block w-full bg-primary text-white text-center py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
            to="/dang-bai"
            @click="menuOpen = false"
          >
            Đăng bài
          </NuxtLink>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import {
  MessageSquare,
  User,
  Laptop,
  HandCoins,
  Lock,
  Copy,
  Bell,
  Menu,
  Sparkles,
  CreditCard,
  X,
  TrendingUp,
  ArrowRight,
  Building,
  QrCode,
  Lightbulb,
  History,
} from "lucide-vue-next";
import { ArrowDown } from "@element-plus/icons-vue";
import { useUserOnlineStore } from "~/store/userOnline";
import { onMounted, onUnmounted } from "vue";

useSocketNotification();

const menuOpen = ref(false);
const dialogBanking = ref(false);
const qrAnimated = ref(false);
const copied = ref(false);
const visible = ref(false);
const unreadCount = ref(3);

const token = useCookie("auth.token");
const serverToken = useCookie("access_token");

const currentUser = await useCurrentUser();
const userOnlineStore = useUserOnlineStore();
const { $socket } = useNuxtApp();

// User data for socket
const user = {
  userId: currentUser.value?.id,
  name: currentUser.value?.fullName,
  username: currentUser.value?.username,
  avatar: currentUser.value?.avatar,
};

// Copy mã chuyển khoản
function handleCopy() {
  const text = `CHOCODE_${currentUser.value?.username}`;
  navigator.clipboard
    .writeText(text)
    .then(() => ElMessage.success("Đã copy nội dung chuyển khoản thành công!"))
    .catch(() => ElMessage.error("Copy thất bại!"));
}

// Redirect to login
const toLogin = () => navigateTo("/auth/login");

// Toggle bank modal
const toggleBankingModal = () => {
  dialogBanking.value = !dialogBanking.value;
};

// Logout
const logout = async () => {
  const confirmed = await ElMessageBox.confirm(
    "Chắc chắn muốn đăng xuất tài khoản ?",
    "Xác nhận",
    {
      confirmButtonText: "Đăng xuất",
      cancelButtonText: "Hủy",
      type: "warning",
    }
  ).catch(() => false);

  if (!confirmed) return;

  token.value = null;
  serverToken.value = null;

  ElNotification({ type: "success", message: "Đăng xuất thành công" });

  setTimeout(() => window.location.reload(), 1500);
};

onMounted(() => {
  if ($socket && currentUser.value?.id) {
    // Emit online khi vào trang
    $socket.emit("online-user", {
      userId: currentUser.value.id,
      username: currentUser.value.username,
      avatar: currentUser.value.avatar,
    });

    // Lắng nghe trạng thái thay đổi
    $socket.on("user-status-changed", (data) => {
      // data: { userId, username, online, lastActive }
      userOnlineStore.updateUserStatus({
        userId: data.userId,
        username: data.username,
        isUserOnline: data.online,
        lastActive: data.lastActive,
      });
    });

    // Lấy danh sách online ban đầu
    $socket.emit("get-online-users", {}, (users: any[]) => {
      // users: [{ userId, username, online, lastActive }]
      userOnlineStore.setOnlineUsers(
        users.map((u) => ({
          userId: u.userId,
          username: u.username,
          isUserOnline: u.online,
          lastActive: u.lastActive,
        }))
      );
    });
  }

  // Tự động đóng menu khi resize
  const handleResize = () => {
    if (window.innerWidth >= 1024 && menuOpen.value) {
      menuOpen.value = false;
    }
  };
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  if ($socket) {
    $socket.off("user-status-changed");
  }

  // Tự động đóng menu khi resize
  const handleResize = () => {
    if (window.innerWidth >= 1024 && menuOpen.value) {
      menuOpen.value = false;
    }
  };
  window.removeEventListener("resize", handleResize);
});

// Menu navigation
const navItems = [
  { label: "Việc làm IT", icon: Laptop, to: "/viec-lam-it" },
  { label: "Thuê Freelancer", icon: User, to: "/dang-bai" },
  { label: "Thảo luận", icon: MessageSquare, to: "/thao-luan" },
];
</script>

<style scoped>
/* Evergreen Dropdown Styles */
:deep(.evergreen-dropdown) {
  border-radius: 8px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  border: 1px solid #e5e7eb !important;
  padding: 4px !important;
  background: white !important;
}

:deep(.evergreen-dropdown .el-dropdown-menu__item) {
  padding: 0 !important;
  margin: 0 !important;
  border-radius: 4px !important;
}

:deep(.evergreen-dropdown .el-dropdown-menu__item:hover) {
  background: transparent !important;
}

/* Evergreen Dialog Styles */
:deep(.evergreen-dialog) {
  border-radius: 12px !important;
  overflow: hidden !important;
}

:deep(.evergreen-dialog .el-dialog__header) {
  padding: 0 !important;
  margin: 0 !important;
}

:deep(.evergreen-dialog .el-dialog__body) {
  padding: 0 !important;
}

/* Remove default Element Plus styles */
:deep(.el-dropdown-menu) {
  min-width: 200px !important;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Focus styles for accessibility */
button:focus-visible,
a:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
