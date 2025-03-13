<template>
  <div>
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50">
      <div
        class="relative h-full flex items-center max-w-[1326px] justify-between mx-4 md:mx-16 lg:mx-32 xl:mx-[19.6rem]"
      >
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="shrink-0 h-10 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <img
            src="~/assets/images/header/logo.png"
            alt="logo home fqa"
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
              to=""
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
            type="primary"
            class="!h-9 !px-5 !font-medium !text-sm"
            @click="centerDialogVisible = true"
          >
            Đăng nhập
          </el-button>
        </nav>
        <div class="flex items-center space-x-2 lg:hidden mr-[-0.4rem]">
          <el-button
            v-if="!currentUser"
            type="primary"
            class="!h-9 !px-5 !font-medium !text-sm"
            @click="centerDialogVisible = true"
          >
            Đăng nhập
          </el-button>

          <button @click="menuOpen = !menuOpen" class="">
            <Menu />
          </button>
        </div>
      </div>
    </header>
    <!-- Login Dialog -->
    <el-dialog v-model="centerDialogVisible" width="w-auto" align-center>
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        class="items-center flex justify-between"
      >
        <el-tab-pane label="ĐĂNG NHẬP" name="first">
          <div class="flex items-center justify-center bg-gray-50">
            <el-card class="w-[22rem] shadow-lg">
              <template #header>
                <h2 class="text-2xl font-bold text-center text-gray-900">
                  Đăng nhập
                </h2>
              </template>

              <el-form
                ref="formRef"
                :model="form"
                label-position="top"
                @submit.prevent="loginBtn"
                class="space-y-6"
              >
                <!-- Email -->
                <el-form-item label="Email" prop="email" class="mb-4">
                  <el-input
                    v-model="form.email"
                    placeholder="Nhập email của bạn"
                    :prefix-icon="User"
                    class="h-10"
                  />
                </el-form-item>

                <!-- Password -->
                <el-form-item label="Mật khẩu" prop="password" class="mb-6">
                  <el-input
                    v-model="form.password"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    :prefix-icon="Lock"
                    show-password
                    class="h-10"
                  />
                </el-form-item>

                <!-- Remember & Forgot -->
                <div class="flex items-center justify-between mb-6">
                  <el-checkbox class="text-gray-600">
                    Ghi nhớ đăng nhập
                  </el-checkbox>
                  <el-link type="primary" class="text-sm">
                    Quên mật khẩu?
                  </el-link>
                </div>

                <!-- Submit Button -->
                <el-form-item>
                  <el-button
                    type="primary"
                    native-type="submit"
                    :loading="loading"
                    class="w-full h-11 text-base"
                  >
                    {{ loading ? "Đang đăng nhập..." : "Đăng nhập" }}
                  </el-button>
                </el-form-item>

                <!-- Register Link -->
                <div class="text-center text-sm text-gray-600">
                  Chưa có tài khoản?
                  <el-link type="primary" @tab-click="handleClick"
                    >Đăng ký ngay</el-link
                  >
                </div>
              </el-form>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="ĐĂNG KÝ" name="second"
          ><div class="flex items-center justify-center bg-gray-50">
            <el-card class="w-[22rem] shadow-lg">
              <template #header>
                <h2 class="text-2xl font-bold text-center text-gray-900">
                  Đăng ký
                </h2>
              </template>

              <el-form
                ref="formRef"
                :model="formReg"
                label-position="top"
                @submit.prevent="registerBtn"
                class="space-y-6"
              >
                <!-- Full name  -->
                <el-form-item label="Họ tên" prop="fullName" class="mb-4">
                  <el-input
                    v-model="formReg.fullName"
                    placeholder="Nhập họ tên của bạn"
                    :prefix-icon="User"
                    class="h-10"
                  />
                </el-form-item>
                <!-- Email -->
                <el-form-item label="Email" prop="email" class="mb-4">
                  <el-input
                    v-model="formReg.email"
                    placeholder="Nhập email của bạn"
                    :prefix-icon="User"
                    class="h-10"
                  />
                </el-form-item>

                <!-- Password -->
                <el-form-item label="Mật khẩu" prop="password" class="mb-6">
                  <el-input
                    v-model="formReg.password"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    :prefix-icon="Lock"
                    show-password
                    class="h-10"
                  />
                </el-form-item>

                <el-form-item label="Bạn là ai?" class="mb-6">
                  <el-radio-group
                    v-model="formReg.roleId"
                    class="flex space-x-3 items-center justify-between mx-auto"
                  >
                    <el-radio-button :value="1" size="large"
                      >Developer</el-radio-button
                    >
                    <el-radio-button :value="2" size="large"
                      >Khách hàng</el-radio-button
                    >
                  </el-radio-group>
                </el-form-item>

                <!-- Remember & Forgot -->
                <div class="flex items-center justify-between mb-6">
                  <el-checkbox class="text-gray-600">
                    Ghi nhớ đăng nhập
                  </el-checkbox>
                  <el-link type="primary" class="text-sm">
                    Quên mật khẩu?
                  </el-link>
                </div>

                <!-- Submit Button -->
                <el-form-item>
                  <el-button
                    type="primary"
                    native-type="submit"
                    :loading="loading"
                    class="w-full h-11 text-base"
                  >
                    {{ loading ? "Đang đăng ký..." : "Đăng ký" }}
                  </el-button>
                </el-form-item>

                <!-- Register Link -->
                <div class="text-center text-sm text-gray-600">
                  Chưa có tài khoản?
                  <el-link type="primary">Đăng ký ngay</el-link>
                </div>
              </el-form>
            </el-card>
          </div></el-tab-pane
        >
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: "/" },
});

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
} from "lucide-vue-next";
import { ArrowDown } from "@element-plus/icons-vue";
import type { TabsPaneContext } from "element-plus";
const activeName = ref("first");
const formRef = ref(null);
const loading = ref(false);
const form = ref({
  email: "",
  password: "",
});
const formReg = ref({
  fullName: "",
  email: "",
  password: "",
  roleId: 0,
});
const rules = {
  email: [
    { required: true, message: "Vui lòng nhập email", trigger: "blur" },
    { type: "email", message: "Email không hợp lệ", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Vui lòng nhập mật khẩu", trigger: "blur" },
    { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự", trigger: "blur" },
  ],
};

const menuOpen = ref(false);

const { signIn, signOut, getSession } = useAuth();
const token = useCookie("auth.token");

const currentUser = await getSession();
const loginBtn = async () => {
  if (!form.value) return;

  try {
    const payload = {
      email: form.value.email,
      password: form.value.password,
    };
    const res = await authService.authControllerLogin(payload);
    if (res.data) {
      console.log(res.data);
      await signIn(payload);
      ElNotification({
        title: "Thành công",
        message: "Đăng nhập thành công!",
        type: "success",
      });
      reloadNuxtApp();
    }
  } catch (error) {
    console.error(error);
    ElNotification({
      title: "Lỗi",
      message: "Đăng nhập thất bại. Vui lòng thử lại!",
      type: "error",
    });
  } finally {
    loading.value = false;
  }
};

const registerBtn = async () => {
  if (!formReg.value) return;
  const payload = {
    fullName: formReg.value.fullName,
    email: formReg.value.email,
    password: formReg.value.password,
    roleId: formReg.value.roleId,
  };

  try {
    const res = await authService.authControllerRegister(payload);
    if (res.data) {
      ElNotification({
        title: "Thành công",
        message: "Đăng ký thành công!",
        type: "success",
      });
    }
  } catch (error) {
    console.error(error);
    ElNotification({
      title: "Lỗi",
      message: "Đăng ký thất bại. Vui lòng thử lại!",
      type: "error",
    });
  }
};

const logout = async () => {
  ElMessageBox.confirm("Chắc chắn muốn đăng xuất tài khoản ?", "Xác nhận", {
    confirmButtonText: "Đăng xuất",
    cancelButtonText: "Hủy",
    type: "warning",
  }).then(async () => {
    token.value = null;
    ElNotification({
      type: "success",
      message: "Đăng xuất thành công",
    });
  });
};
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
const centerDialogVisible = ref(false);
const searchQuery = ref("");
const showHotNews = ref(true);

const navItems = [
  { label: "Tìm việc", icon: BriefcaseBusiness, to: "" },
  { label: "Thuê Freelancer", icon: User, to: "" },
  { label: "Mua bán", icon: Store, to: "/mua-ban" },
  { label: "Thảo luận", icon: MessageSquare, to: "/thao-luan" },
];

import { ref } from "vue";
import { useNuxtApp } from "#app";

const { $socket } = useNuxtApp();
const userIdToCheck = ref("");
const isUserOnline = ref(null);

// $socket.emit('message', 'Xin chao');

const visible = ref(false);
const currentTab = ref("all");
const unreadCount = ref(3);

// Mock notifications data
const notifications = ref([
  {
    id: 1,
    sender: "Nguyễn Văn A",
    content: "đã thích bài viết của bạn",
    type: "like",
    time: new Date().getTime() - 1000 * 60 * 5,
    read: false,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    link: "/posts/1", // Link đến bài viết
  },
  {
    id: 2,
    sender: "Trần Thị B",
    content: "đã bình luận về bài viết của bạn",
    type: "comment",
    time: new Date().getTime() - 1000 * 60 * 30,
    read: true,
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    link: "/posts/2",
  },
  {
    id: 3,
    sender: "Lê Văn C",
    content: "đã chia sẻ bài viết của bạn",
    type: "share",
    time: new Date().getTime() - 1000 * 60 * 60 * 2,
    read: false,
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    link: "/posts/3",
  },
]);

const filteredNotifications = computed(() => {
  return notifications.value.filter(
    (notification) =>
      currentTab.value === "all" ||
      (currentTab.value === "unread" && !notification.read)
  );
});

const getNotificationTypeClass = (type: string) => {
  const classes: { [key in "like" | "comment" | "share"]: string } = {
    like: "bg-red-500",
    comment: "bg-primary-gradient",
    share: "bg-green-500",
  };
  return "bg-gray-500";
};

// Function to get icon based on notification type
const getNotificationIcon = (type: string) => {
  const icons: { [key in "like" | "comment" | "share"]: any } = {
    like: ThumbsUp,
    comment: MessageSquare,
    share: Share2,
  };
  return Bell;
};

const formatTime = (timestamp: any) => {
  const minutes = Math.floor((new Date().getTime() - timestamp) / (1000 * 60));
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  return new Date(timestamp).toLocaleDateString();
};

const handleShow = () => {};

const handleMarkAsRead = (command: any) => {
  if (command === "all") {
    notifications.value = notifications.value.map((notification) => ({
      ...notification,
      read: true,
    }));
    unreadCount.value = 0;
  }
};
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
</style>
