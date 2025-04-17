<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="flex flex-col items-center max-w-md w-full">
      <!-- Logo -->
      <img
        src="~/assets/images/header/logo.png"
        alt="logo home fqa"
        class="h-12 w-auto mb-8"
      />

      <!-- Loading Card -->
      <div
        class="bg-white shadow-lg rounded-lg p-8 w-full flex flex-col items-center justify-center"
      >
        <!-- Spinner Animation -->
        <div class="relative flex justify-center items-center mb-6">
          <div
            class="absolute animate-spin rounded-full h-16 w-16 border-b-2 border-primary"
          ></div>
          <div
            class="absolute animate-ping h-10 w-10 rounded-full bg-primary opacity-20"
          ></div>
          <div class="rounded-full h-8 w-8 bg-primary"></div>
        </div>

        <!-- Loading Text -->
        <h2 class="mt-4 text-center text-2xl font-semibold text-gray-900">
          Đang xử lý đăng nhập
        </h2>

        <p class="mt-2 text-center text-gray-600">
          Vui lòng đợi trong giây lát...
        </p>

        <!-- Progress Bar -->
        <div class="w-full bg-gray-200 rounded-full h-1.5 mt-6 overflow-hidden">
          <div class="bg-primary h-1.5 rounded-full animate-progress"></div>
        </div>
      </div>

      <!-- Additional info -->
      <p class="mt-6 text-center text-sm text-gray-500">
        Đang kết nối với hệ thống. Bạn sẽ được chuyển hướng trong giây lát.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";

const router = useRouter();
const token = useCookie("auth.token", {
  maxAge: 30 * 24 * 60 * 60,
  sameSite: "lax",
});

const isLoading = ref(true);
const errorMessage = ref("");
const config = useRuntimeConfig();
const BASE_API_URL = config.public.BASE_API_URL;
const getToken = async () => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/auth/token`, {
      withCredentials: true,
    });

    if (data?.accessToken) {
      token.value = data?.accessToken;
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else {
      errorMessage.value = "Không tìm thấy token xác thực";
      setTimeout(() => {
        router.push("/auth/dang-nhap");
      }, 2000);
    }
  } catch (err) {
    console.error("Error getting token:", err);
    errorMessage.value = "Có lỗi xảy ra khi xác thực";
    setTimeout(() => {
      router.push("/auth/dang-nhap");
    }, 2000);
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  }
};

onMounted(() => {
  getToken();
});
</script>

<style scoped>
@keyframes progress {
  0% {
    width: 5%;
  }
  100% {
    width: 90%;
  }
}

.animate-progress {
  animation: progress 3s ease-in-out infinite;
}

/* Custom animation for the spinner */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
