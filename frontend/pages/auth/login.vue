<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- Logo -->
      <div class="flex justify-center">
        <NuxtLink to="/" class="group">
          <div class="relative">
            <img
              src="~/assets/images/header/logo.png"
              alt="ChoCode Logo"
              class="h-12 w-auto transition-transform duration-200 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-blue-500/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </div>
        </NuxtLink>
      </div>

      <!-- Header Text -->
      <div class="mt-8 text-center">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Chào mừng trở lại
        </h1>
        <p class="mt-3 text-base text-gray-600 leading-relaxed">
          Đăng nhập để tiếp tục hành trình học tập của bạn
        </p>
        <div
          class="mt-4 flex items-center justify-center space-x-1 text-sm text-gray-500"
        >
          <span>Chưa có tài khoản?</span>
          <NuxtLink
            to="/auth/dang-ky"
            class="font-semibold text-primary hover:text-blue-500 transition-colors duration-200 underline-offset-2 hover:underline"
          >
            Đăng ký ngay
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Login Form Card -->
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        class="bg-white/80 backdrop-blur-sm shadow-xl shadow-gray-900/5 rounded-2xl border border-gray-200/50 overflow-hidden"
      >
        <div class="px-6 py-8 sm:px-8">
          <form @submit.prevent="loginBtn" class="space-y-6">
            <!-- Email Field -->
            <div class="space-y-2">
              <label
                for="email"
                class="block text-sm font-medium text-gray-700"
              >
                Địa chỉ email
              </label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <Mail class="h-5 w-5 text-base" />
                </div>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  autocomplete="email"
                  required
                  placeholder="your@email.com"
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                  :class="
                    emailError
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : ''
                  "
                />
              </div>
              <p
                v-if="emailError"
                class="text-sm text-red-600 flex items-center mt-1"
              >
                <AlertCircle class="h-4 w-4 mr-1" />
                {{ emailError }}
              </p>
            </div>

            <!-- Password Field -->
            <div class="space-y-2">
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <Lock class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  required
                  placeholder="Nhập mật khẩu của bạn"
                  class="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                  :class="
                    passwordError
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : ''
                  "
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Eye v-if="!showPassword" class="h-5 w-5" />
                  <EyeOff v-else class="h-5 w-5" />
                </button>
              </div>
              <p
                v-if="passwordError"
                class="text-sm text-red-600 flex items-center mt-1"
              >
                <AlertCircle class="h-4 w-4 mr-1" />
                {{ passwordError }}
              </p>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between">
              <label class="flex items-center">
                <input
                  v-model="rememberMe"
                  type="checkbox"
                  class="h-4 w-4 text-primary focus:ring-blue-500 border-gray-300 rounded transition-colors"
                />
                <span class="ml-2 text-sm text-gray-600"
                  >Ghi nhớ đăng nhập</span
                >
              </label>
              <NuxtLink
                to="/auth/forgot-password"
                class="text-sm font-medium text-primary hover:text-blue-500 transition-colors duration-200"
              >
                Quên mật khẩu?
              </NuxtLink>
            </div>

            <!-- Login Button -->
            <button
              type="submit"
              :disabled="loading || !isFormValid"
              class="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-primary to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              <span v-if="loading" class="flex items-center">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Đang đăng nhập...
              </span>
              <span v-else class="flex items-center">
                <LogIn
                  class="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform duration-200"
                />
                Đăng nhập
              </span>
            </button>
          </form>

          <!-- Divider -->
          <div class="mt-8">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-4 bg-white text-gray-500 font-medium"
                  >Hoặc tiếp tục với</span
                >
              </div>
            </div>
          </div>

          <!-- Google Login -->
          <div class="mt-6">
            <button
              @click="loginWithGoogle"
              type="button"
              class="group w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white/80 backdrop-blur-sm text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <img
                class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200"
                src="@/assets/images/header/google.png"
                alt="Google"
              />
              Đăng nhập với Google
            </button>
          </div>
        </div>

        <!-- Footer -->
        <div
          class="px-6 py-4 bg-gray-50/50 border-t border-gray-200/50 text-center"
        >
          <p class="text-xs text-gray-500">
            Bằng việc đăng nhập, bạn đồng ý với
            <NuxtLink
              to="/terms"
              class="text-primary hover:text-blue-500 font-medium"
            >
              Điều khoản dịch vụ
            </NuxtLink>
            và
            <NuxtLink
              to="/privacy"
              class="text-primary hover:text-blue-500 font-medium"
            >
              Chính sách bảo mật
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from "lucide-vue-next";

useSeoMeta({
  title: "Đăng nhập - ChoCode",
  description:
    "Đăng nhập vào tài khoản ChoCode để tiếp tục hành trình học lập trình của bạn",
});

const loading = ref(false);
const showPassword = ref(false);
const rememberMe = ref(false);
const emailError = ref("");
const passwordError = ref("");

const config = useRuntimeConfig();
const BASE_API_URL = config.public.BASE_API_URL;

const form = ref({
  email: "",
  password: "",
});

// Form validation
const isFormValid = computed(() => {
  return (
    form.value.email && form.value.password && form.value.password.length >= 6
  );
});

// Validate email
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "Vui lòng nhập email";
  }
  if (!emailRegex.test(email)) {
    return "Email không hợp lệ";
  }
  return "";
};

// Validate password
const validatePassword = (password: string) => {
  if (!password) {
    return "Vui lòng nhập mật khẩu";
  }
  if (password.length < 6) {
    return "Mật khẩu phải có ít nhất 6 ký tự";
  }
  return "";
};

// Watch for form changes to validate
watch(
  () => form.value.email,
  (newEmail) => {
    emailError.value = validateEmail(newEmail);
  }
);

watch(
  () => form.value.password,
  (newPassword) => {
    passwordError.value = validatePassword(newPassword);
  }
);

const { signIn } = useAuth();

const loginBtn = async () => {
  // Validate form
  emailError.value = validateEmail(form.value.email);
  passwordError.value = validatePassword(form.value.password);

  if (emailError.value || passwordError.value) {
    return;
  }

  loading.value = true;

  try {
    const payload = {
      email: form.value.email,
      password: form.value.password,
    };

    const res = await authService.authControllerLogin(payload);
    if (res.data) {
      await signIn(payload);
      ElNotification({
        title: "Đăng nhập thành công!",
        message: `Chào mừng ${
          res.data.user?.fullName || "bạn"
        } trở lại ChoCode`,
        type: "success",
        duration: 4000,
      });
      reloadNuxtApp();
    }
  } catch (error: any) {
    console.error(error);
    const errorMessage =
      error.response?.data?.message ||
      "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!";
    ElNotification({
      title: "Đăng nhập thất bại",
      message: errorMessage,
      type: "error",
      duration: 5000,
    });
  } finally {
    loading.value = false;
  }
};

const loginWithGoogle = () => {
  window.location.href = `${BASE_API_URL}/auth/google`;
};
</script>

<style scoped>
/* Custom focus styles */
input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Custom checkbox styles */
input[type="checkbox"]:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z'/%3e%3c/svg%3e");
}
</style>
