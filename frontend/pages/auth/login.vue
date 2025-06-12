<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <NuxtLink to="/">
        <img
          src="~/assets/images/header/logo.png"
          alt="logo home fqa"
          class="mx-auto h-12 w-auto"
        />
      </NuxtLink>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Đăng nhập vào tài khoản
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Hoặc
        <NuxtLink
          to="/auth/dang-ky"
          class="font-medium text-primary hover:text-primary-dark"
        >
          đăng ký tài khoản mới
        </NuxtLink>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
        <el-form
          ref="loginFormRef"
          :model="form"
          :rule="rules"
          label-position="top"
          @submit.prevent="loginBtn"
          class="space-y-6"
        >
          <!-- Email -->
          <el-form-item label="Email" prop="email">
            <el-input
              v-model="form.email"
              placeholder="Nhập email của bạn"
              :prefix-icon="Mail"
              class="h-11 rounded-md"
            />
          </el-form-item>

          <!-- Password -->
          <el-form-item label="Mật khẩu" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="Nhập mật khẩu"
              :prefix-icon="Lock"
              show-password
              class="h-11 rounded-md"
            />
          </el-form-item>

          <!-- Remember & Forgot -->
          <div class="flex items-center justify-between">
            <el-checkbox class="text-gray-600"> Ghi nhớ đăng nhập </el-checkbox>
            <el-link type="primary" class="text-sm font-medium">
              Quên mật khẩu?
            </el-link>
          </div>

          <!-- Submit Button -->
          <el-form-item>
            <el-button
              type="primary"
              native-type="submit"
              :loading="loading"
              class="w-full h-12 text-base rounded-md bg-primary flex items-center justify-center"
            >
              <span v-if="loading">
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
              <span v-else>Đăng nhập</span>
            </el-button>
          </el-form-item>
        </el-form>

        <!-- Google Login Button -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500"
                >Hoặc đăng nhập với</span
              >
            </div>
          </div>

          <div class="mt-6">
            <button
              @click="loginWithGoogle"
              class="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <img
                class="w-5 h-5 mr-2"
                src="@/assets/images/header/google.png"
                alt="Google"
              />
              <span>Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Đăng nhập Chocode.com",
});

import { Mail, Lock } from "lucide-vue-next";

const loginFormRef = ref(null);
const loading = ref(false);
const config = useRuntimeConfig();
const BASE_API_URL = config.public.BASE_API_URL;
const form = ref({
  email: "",
  password: "",
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

const { signIn } = useAuth();

const loginBtn = async () => {
  if (!form.value) return;

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

const loginWithGoogle = () => {
  window.location.href = `${BASE_API_URL}/auth/google`;
};
</script>

<style scoped>
/* custom styles here (none yet) */
</style>
