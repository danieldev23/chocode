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
        Tạo tài khoản mới
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Hoặc
        <NuxtLink
          to="/auth/dang-nhap"
          class="font-medium text-primary hover:text-primary-dark"
        >
          đăng nhập nếu đã có tài khoản
        </NuxtLink>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
      <div class="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
        <el-form
          ref="registerFormRef"
          :model="formReg"
          :rule="regRules"
          label-position="top"
          @submit.prevent="registerBtn"
          class="space-y-6"
        >
          <!-- Full Name -->
          <el-form-item label="Họ tên" prop="fullName">
            <el-input
              v-model="formReg.fullName"
              placeholder="Nhập họ tên của bạn"
              :prefix-icon="User"
              class="h-11 rounded-md"
            />
          </el-form-item>

          <!-- Email -->
          <el-form-item label="Email" prop="email">
            <el-input
              v-model="formReg.email"
              placeholder="Nhập email của bạn"
              :prefix-icon="Mail"
              class="h-11 rounded-md"
            />
          </el-form-item>

          <!-- Password -->
          <el-form-item label="Mật khẩu" prop="password">
            <el-input
              v-model="formReg.password"
              type="password"
              placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
              :prefix-icon="Lock"
              show-password
              class="h-11 rounded-md"
            />
          </el-form-item>

          <!-- Role Selection -->
          <el-form-item label="Vai trò" prop="roleId">
            <el-radio-group
              v-model="formReg.roleId"
              class="flex flex-wrap gap-x-4 gap-y-6 items-center"
            >
              <el-radio-button :label="1" class="flex-grow">
                <div class="flex items-center justify-center">
                  <User class="w-4 h-4 mr-2" />
                  <span>Người dùng</span>
                </div>
              </el-radio-button>
              <el-radio-button :label="2" class="flex-grow">
                <div class="flex items-center justify-center">
                  <BriefcaseBusiness class="w-4 h-4 mr-2" />
                  <span>Nhà tuyển dụng</span>
                </div>
              </el-radio-button>
            </el-radio-group>
          </el-form-item>

          <!-- Terms and Conditions -->
          <el-form-item>
            <el-checkbox v-model="agreeToTerms" class="text-gray-600">
              Tôi đồng ý với
              <el-link type="primary" class="text-sm font-medium">
                điều khoản dịch vụ
              </el-link>
              và
              <el-link type="primary" class="text-sm font-medium">
                chính sách bảo mật
              </el-link>
            </el-checkbox>
          </el-form-item>

          <!-- Submit Button -->
          <el-form-item>
            <el-button
              type="primary"
              native-type="submit"
              :loading="loading"
              :disabled="!agreeToTerms"
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
                Đang đăng ký...
              </span>
              <span v-else>Đăng ký</span>
            </el-button>
          </el-form-item>
        </el-form>

        <!-- Google Registration Button -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Hoặc đăng ký với</span>
            </div>
          </div>

          <div class="mt-6">
            <button
              @click="registerWithGoogle"
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
  title: "Đăng ký tài khoản Chocode.com",
});

import { User, Mail, Lock, BriefcaseBusiness } from "lucide-vue-next";

const registerFormRef = ref(null);
const loading = ref(false);
const agreeToTerms = ref(false);
const config = useRuntimeConfig();
const BASE_API_URL = config.public.BASE_API_URL;
const formReg = ref({
  fullName: "",
  email: "",
  password: "",
  roleId: 1,
});

const regRules = {
  fullName: [
    { required: true, message: "Vui lòng nhập họ tên", trigger: "blur" },
    { min: 2, message: "Họ tên phải có ít nhất 2 ký tự", trigger: "blur" },
  ],
  email: [
    { required: true, message: "Vui lòng nhập email", trigger: "blur" },
    { type: "email", message: "Email không hợp lệ", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Vui lòng nhập mật khẩu", trigger: "blur" },
    { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự", trigger: "blur" },
  ],
  roleId: [
    { required: true, message: "Vui lòng chọn vai trò", trigger: "change" },
  ],
};

const registerBtn = async () => {
  if (!formReg.value) return;
  if (!agreeToTerms.value) {
    ElNotification({
      title: "Lưu ý",
      message: "Vui lòng đồng ý với điều khoản dịch vụ và chính sách bảo mật",
      type: "warning",
    });
    return;
  }

  loading.value = true;

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
        message: "Đăng ký thành công! Bạn có thể đăng nhập ngay.",
        type: "success",
      });
      // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
      navigateTo("/dang-nhap");
    }
  } catch (error) {
    console.error(error);
    ElNotification({
      title: "Lỗi",
      message: "Đăng ký thất bại. Vui lòng thử lại!",
      type: "error",
    });
  } finally {
    loading.value = false;
  }
};

const registerWithGoogle = () => {
  window.location.href = `${BASE_API_URL}/auth/google`;
};
</script>

<style scoped>
/* Custom styles */
</style>
