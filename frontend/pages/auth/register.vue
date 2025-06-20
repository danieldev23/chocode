<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 mt-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-lg">
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
          Tạo tài khoản mới
        </h1>
        <p class="mt-3 text-base text-gray-600 leading-relaxed">
          Tham gia cộng đồng ChoCode để bắt đầu hành trình lập trình
        </p>
        <div
          class="mt-4 flex items-center justify-center space-x-1 text-sm text-gray-500"
        >
          <span>Đã có tài khoản?</span>
          <NuxtLink
            to="/auth/dang-nhap"
            class="font-semibold text-primary hover:text-blue-500 transition-colors duration-200 underline-offset-2 hover:underline"
          >
            Đăng nhập ngay
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Register Form Card -->
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
      <div
        class="bg-white/80 backdrop-blur-sm shadow-xl shadow-gray-900/5 rounded-2xl border border-gray-200/50 overflow-hidden"
      >
        <div class="px-6 py-8 sm:px-8">
          <form @submit.prevent="registerBtn" class="space-y-6">
            <!-- Full Name Field -->
            <div class="space-y-2">
              <label
                for="fullName"
                class="block text-sm font-medium text-gray-700"
              >
                Họ và tên
              </label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <User class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  v-model="formReg.fullName"
                  type="text"
                  autocomplete="name"
                  required
                  placeholder="Nguyễn Văn A"
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                  :class="
                    fullNameError
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : ''
                  "
                />
              </div>
              <p
                v-if="fullNameError"
                class="text-sm text-red-600 flex items-center mt-1"
              >
                <AlertCircle class="h-4 w-4 mr-1" />
                {{ fullNameError }}
              </p>
            </div>

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
                  <Mail class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  v-model="formReg.email"
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
                  v-model="formReg.password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="new-password"
                  required
                  placeholder="Tối thiểu 6 ký tự"
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
              <!-- Password strength indicator -->
              <div v-if="formReg.password" class="mt-2">
                <div class="flex items-center space-x-2">
                  <div class="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      class="h-2 rounded-full transition-all duration-300"
                      :class="passwordStrengthClass"
                      :style="{ width: passwordStrengthWidth }"
                    ></div>
                  </div>
                  <span
                    class="text-xs font-medium"
                    :class="passwordStrengthTextClass"
                  >
                    {{ passwordStrengthText }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Role Selection -->
            <div class="space-y-3">
              <label class="block text-sm font-medium text-gray-700">
                Bạn là ai?
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  class="relative flex items-center p-4 border rounded-xl cursor-pointer hover:bg-blue-50/50 transition-all duration-200"
                  :class="
                    formReg.roleId === 1
                      ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-500 ring-opacity-20'
                      : 'border-gray-300'
                  "
                >
                  <input
                    v-model="formReg.roleId"
                    type="radio"
                    :value="1"
                    class="sr-only"
                  />
                  <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0">
                      <div
                        class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"
                      >
                        <User class="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">
                        Lập trình viên
                      </div>
                      <div class="text-xs text-gray-500">
                        Học lập trình, tham gia forum
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="formReg.roleId === 1"
                    class="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                  >
                    <Check class="h-3 w-3 text-white" />
                  </div>
                </label>

                <label
                  class="relative flex items-center p-4 border rounded-xl cursor-pointer hover:bg-green-50/50 transition-all duration-200"
                  :class="
                    formReg.roleId === 2
                      ? 'border-green-500 bg-green-50/50 ring-2 ring-green-500 ring-opacity-20'
                      : 'border-gray-300'
                  "
                >
                  <input
                    v-model="formReg.roleId"
                    type="radio"
                    :value="2"
                    class="sr-only"
                  />
                  <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0">
                      <div
                        class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"
                      >
                        <BriefcaseBusiness class="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">
                        Nhà tuyển dụng
                      </div>
                      <div class="text-xs text-gray-500">
                        Đăng tin tuyển dụng, tìm ứng viên
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="formReg.roleId === 2"
                    class="absolute top-2 right-2 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center"
                  >
                    <Check class="h-3 w-3 text-white" />
                  </div>
                </label>
              </div>
            </div>

            <!-- Terms Agreement -->
            <div class="space-y-3">
              <label class="flex items-start space-x-3">
                <input
                  v-model="agreeToTerms"
                  type="checkbox"
                  class="mt-1 h-4 w-4 text-primary focus:ring-blue-500 border-gray-300 rounded transition-colors"
                />
                <span class="text-sm text-gray-600 leading-relaxed">
                  Tôi đồng ý với
                  <NuxtLink
                    to="/terms"
                    class="font-medium text-primary hover:text-blue-500 underline-offset-2 hover:underline"
                  >
                    Điều khoản dịch vụ
                  </NuxtLink>
                  và
                  <NuxtLink
                    to="/privacy"
                    class="font-medium text-primary hover:text-blue-500 underline-offset-2 hover:underline"
                  >
                    Chính sách bảo mật
                  </NuxtLink>
                  của ChoCode
                </span>
              </label>
            </div>

            <!-- Register Button -->
            <button
              type="submit"
              :disabled="loading || !isFormValid || !agreeToTerms"
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
                Đang tạo tài khoản...
              </span>
              <span v-else class="flex items-center">
                <UserPlus
                  class="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform duration-200"
                />
                Tạo tài khoản
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

          <!-- Google Register -->
          <div class="mt-6">
            <button
              @click="registerWithGoogle"
              type="button"
              class="group w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white/80 backdrop-blur-sm text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <img
                class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200"
                src="@/assets/images/header/google.png"
                alt="Google"
              />
              Đăng ký với Google
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  AlertCircle,
  BriefcaseBusiness,
  Check,
} from "lucide-vue-next";

useSeoMeta({
  title: "Đăng ký tài khoản - ChoCode",
  description:
    "Tạo tài khoản ChoCode để tham gia cộng đồng lập trình viên Việt Nam",
});

const loading = ref(false);
const showPassword = ref(false);
const agreeToTerms = ref(false);
const fullNameError = ref("");
const emailError = ref("");
const passwordError = ref("");

const config = useRuntimeConfig();
const BASE_API_URL = config.public.BASE_API_URL;

const formReg = ref({
  fullName: "",
  email: "",
  password: "",
  roleId: 1,
});

// Form validation
const isFormValid = computed(() => {
  return (
    formReg.value.fullName &&
    formReg.value.email &&
    formReg.value.password &&
    formReg.value.password.length >= 6 &&
    !fullNameError.value &&
    !emailError.value &&
    !passwordError.value
  );
});

// Password strength calculation
const passwordStrength = computed(() => {
  const password = formReg.value.password;
  if (!password) return 0;

  let strength = 0;
  if (password.length >= 6) strength += 1;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  return strength;
});

const passwordStrengthClass = computed(() => {
  const strength = passwordStrength.value;
  if (strength <= 2) return "bg-red-500";
  if (strength <= 3) return "bg-yellow-500";
  return "bg-green-500";
});

const passwordStrengthWidth = computed(() => {
  return `${(passwordStrength.value / 5) * 100}%`;
});

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value;
  if (strength <= 2) return "Yếu";
  if (strength <= 3) return "Trung bình";
  return "Mạnh";
});

const passwordStrengthTextClass = computed(() => {
  const strength = passwordStrength.value;
  if (strength <= 2) return "text-red-600";
  if (strength <= 3) return "text-yellow-600";
  return "text-green-600";
});

// Validation functions
const validateFullName = (name: string) => {
  if (!name) return "Vui lòng nhập họ tên";
  if (name.length < 2) return "Họ tên phải có ít nhất 2 ký tự";
  return "";
};

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Vui lòng nhập email";
  if (!emailRegex.test(email)) return "Email không hợp lệ";
  return "";
};

const validatePassword = (password: string) => {
  if (!password) return "Vui lòng nhập mật khẩu";
  if (password.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự";
  return "";
};

// Watch for form changes
watch(
  () => formReg.value.fullName,
  (newName) => {
    fullNameError.value = validateFullName(newName);
  }
);

watch(
  () => formReg.value.email,
  (newEmail) => {
    emailError.value = validateEmail(newEmail);
  }
);

watch(
  () => formReg.value.password,
  (newPassword) => {
    passwordError.value = validatePassword(newPassword);
  }
);

const registerBtn = async () => {
  // Validate all fields
  fullNameError.value = validateFullName(formReg.value.fullName);
  emailError.value = validateEmail(formReg.value.email);
  passwordError.value = validatePassword(formReg.value.password);

  if (fullNameError.value || emailError.value || passwordError.value) {
    return;
  }

  if (!agreeToTerms.value) {
    ElNotification({
      title: "Vui lòng đồng ý với điều khoản",
      message:
        "Bạn cần đồng ý với điều khoản dịch vụ và chính sách bảo mật để tiếp tục",
      type: "warning",
      duration: 4000,
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
        title: "Đăng ký thành công!",
        message: `Chào mừng ${formReg.value.fullName} đến với ChoCode! Bạn có thể đăng nhập ngay bây giờ.`,
        type: "success",
        duration: 5000,
      });
      navigateTo("/auth/dang-nhap");
    }
  } catch (error: any) {
    console.error(error);
    const errorMessage =
      error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại!";
    ElNotification({
      title: "Đăng ký thất bại",
      message: errorMessage,
      type: "error",
      duration: 5000,
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
/* Custom focus styles */
input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Custom checkbox styles */
input[type="checkbox"]:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z'/%3e%3c/svg%3e");
}

/* Custom radio styles */
input[type="radio"]:checked + div {
  border-color: theme("colors.blue.500");
}
</style>
