<template>
  <div>
    <!-- Header -->
    <!-- Chat  -->
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
            class="bg-primary text-white py-1 px-2 rounded-[3px]"
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
                <div class="relative mr-2">
                  <UserAvatar :avatar="currentUser.avatar" />
                  <!-- Dấu tròn xanh online -->
                  <div
                    class="absolute -bottom-1 right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full shadow-sm"
                  ></div>
                </div>
                <span class="font-medium">{{ currentUser.fullName }}</span>
                <
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
                    @click="dialogBanking = !dialogBanking"
                  >
                    <HandCoins class="w-5 h-5 mr-2" />
                    Nạp coin
                  </el-dropdown-item>

                  <el-dropdown-item>
                    <NuxtLink
                      class="flex"
                      :to="{
                        name: 'transaction-history',
                      }"
                    >
                      <History class="w-5 h-5 mr-2" />
                      Lịch sử giao dịch
                    </NuxtLink>
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
          <el-button
            v-else
            type="primary"
            class="!h-9 !px-5 !font-medium !text-sm bg-primary text-white"
            @click="toLogin"
          >
            Đăng nhập
          </el-button>
        </nav>
        <div class="flex items-center space-x-2 lg:hidden mr-[-0.4rem]">
          <el-button
            v-if="!currentUser"
            type="primary"
            class="!h-9 !px-5 !font-medium !text-sm bg-primary text-white"
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
      :show-close="false"
      width="450"
      class="banking-dialog overflow-hidden"
      :close-on-click-modal="false"
    >
      <!-- Header -->
      <template #header>
        <div class="relative overflow-hidden">
          <div
            class="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-pink-500 opacity-90"
          ></div>
          <div
            class="relative flex items-center justify-between p-4 text-white"
          >
            <div class="flex items-center space-x-3">
              <div class="relative">
                <div
                  class="absolute inset-0 bg-white rounded-xl blur opacity-20 animate-pulse"
                ></div>
                <div
                  class="relative w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <CreditCard
                    class="w-5 h-5 text-white animate-bounce"
                    style="animation-delay: 0.5s"
                  />
                </div>
              </div>
              <div>
                <h3 class="text-base font-bold mb-0.5 animate-fade-in">
                  Chuyển khoản
                </h3>
                <p
                  class="text-white/80 text-xs animate-fade-in"
                  style="animation-delay: 0.2s"
                >
                  <Sparkles class="w-3 h-3 inline mr-1" />
                  Nạp Code Point siêu nhanh
                </p>
              </div>
            </div>
            <button
              @click="dialogBanking = false"
              class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/30"
            >
              <X class="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </template>

      <!-- Body -->
      <div class="p-4 bg-gradient-to-b from-gray-50 to-white">
        <!-- QR -->
        <div class="mb-4">
          <div class="relative group">
            <div
              class="absolute -inset-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"
            ></div>
            <div
              class="relative bg-white rounded-2xl p-4 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500"
            >
              <div class="flex flex-col items-center space-y-4">
                <div class="relative group cursor-pointer">
                  <div
                    class="absolute -inset-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                  ></div>
                  <div
                    class="absolute -inset-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-2xl opacity-20 animate-spin-slow"
                  ></div>

                  <div
                    class="relative bg-white rounded-xl shadow-2xl border-4 border-white transform group-hover:scale-105 transition-all duration-300"
                    :class="{ 'animate-pulse': qrAnimated }"
                  >
                    <img
                      :src="`https://api.vietqr.io/image/970422-09999838622222-1d7x779.jpg?accountName=DANG%20QUOC%20HUY&addInfo=CHOCODE_${currentUser?.username}`"
                      alt="Banking QR"
                      class="w-40 h-40 object-contain rounded-lg"
                    />
                    <div
                      class="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 rounded-lg"
                    ></div>
                  </div>

                  <div
                    class="absolute -top-1.5 -right-1.5 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-bounce"
                  >
                    <QrCode class="w-3 h-3 text-white" />
                  </div>
                </div>

                <!-- Bank Info -->
                <div class="text-center space-y-2 w-full">
                  <div class="flex items-center justify-center space-x-2 mb-2">
                    <div
                      class="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow"
                    >
                      <Building class="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span class="font-bold text-base text-gray-800"
                        >MB Bank</span
                      >
                      <p class="text-xs text-gray-500">
                        Ngân hàng TMCP Quân đội
                      </p>
                    </div>
                  </div>

                  <div
                    class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 border border-blue-100"
                  >
                    <div class="grid grid-cols-2 gap-3 text-xs">
                      <div class="text-center">
                        <p class="text-gray-500 mb-0.5">Số tài khoản</p>
                        <p class="font-bold text-gray-800 text-sm">
                          09999838622222
                        </p>
                      </div>
                      <div class="text-center">
                        <p class="text-gray-500 mb-0.5">Chủ tài khoản</p>
                        <p class="font-bold text-gray-800 text-sm">
                          DANG QUOC HUY
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Transfer Content -->
                  <div>
                    <h4
                      class="font-bold text-sm text-gray-800 mb-2 flex items-center justify-center"
                    >
                      <MessageSquare class="w-4 h-4 mr-1 text-blue-500" />
                      Nội dung chuyển khoản
                    </h4>

                    <div class="relative">
                      <div
                        class="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-3 border-2 border-dashed border-blue-200 hover:border-blue-300 transition-colors duration-300"
                      >
                        <div class="flex items-center justify-between">
                          <span
                            class="font-mono text-sm font-bold text-primary flex-1 text-center"
                          >
                            CHOCODE_{{ currentUser?.username }}
                          </span>
                          <button
                            @click="handleCopy"
                            class="ml-2 p-1.5 rounded-lg bg-blue-400 hover:bg-primary text-white transition-all duration-300 hover:scale-110 shadow"
                            :class="{
                              'bg-green-500 hover:bg-green-600': copied,
                            }"
                          >
                            <Copy class="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div
                        v-if="copied"
                        class="absolute -top-1 -right-1 animate-ping"
                      >
                        <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                    </div>

                    <div
                      class="mt-2 flex items-center justify-center text-[10px] text-gray-500"
                    >
                      <Lightbulb class="w-3 h-3 mr-1 text-yellow-500" />
                      Vui lòng chuyển khoản đúng nội dung để được cộng điểm tự
                      động
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tỷ giá -->
        <div class="mb-4">
          <div
            class="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 rounded-xl p-4 text-white shadow hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01]"
          >
            <div class="flex items-center flex-col justify-between">
              <div class="flex items-center gap-x-3 mb-3">
                <div
                  class="w-9 h-9 bg-white/20 backdrop-blur-sm rounded flex items-center justify-center"
                >
                  <TrendingUp class="w-4 h-4 text-white animate-pulse" />
                </div>
                <div>
                  <h4 class="font-bold text-sm mb-0.5">Tỷ giá quy đổi</h4>
                  <p class="text-white text-md">Cập nhật theo thời gian thực</p>
                </div>
              </div>

              <div class="text-right text-sm">
                <div class="flex items-center justify-between">
                  <div class="text-center flex items-center">
                    <div class="text-lg font-bold">1 CP (CodePoint)</div>
                  </div>

                  <ArrowRight class="w-4 h-4 text-white" />

                  <div class="text-center flex items-center">
                    <div class="text-lg font-bold text-yellow-200">
                      1.000 VNĐ
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- Dialog payment success  -->
    <PaymentSuccess />
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
            <div class="relative">
              <UserAvatar :avatar="currentUser.avatar" />
              <!-- Dấu tròn xanh online -->
              <div
                class="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-md"
              >
                <div
                  class="w-full h-full bg-emerald-400 rounded-full animate-pulse"
                ></div>
              </div>
            </div>
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

            <NuxtLink
              class="flex items-center text-gray-600 hover:text-primary text-sm"
              :to="{
                name: 'transaction-history',
              }"
            >
              <History class="w-5 h-5 mr-2" />
              Lịch sử giao dịch
            </NuxtLink>

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
              type="primary"
              class="w-full !h-9 !font-medium !text-sm bg-primary text-white"
              @click="toLogin"
            >
              Đăng nhập
            </el-button>
          </div>

          <div class="px-4 pt-4" v-if="currentUser">
            <NuxtLink
              class="w-full bg-primary text-white py-2 px-4 rounded font-medium"
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
button.el-button.\!h-9.\!px-5.\!font-medium.\!text-sm.bg-primary.text-white {
  color: white;
}
button.el-button.w-full.\!h-9.\!font-medium.\!text-sm.bg-primary.text-white {
  color: white;
}

/* Add these styles for smooth mobile menu animation */
body {
  overflow-x: hidden;
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

/* Hover effects */
.group:hover .animate-bounce {
  animation-duration: 0.5s;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  :deep(.el-dialog) {
    width: 95% !important;
    margin: 20px auto !important;
  }
}
</style>
