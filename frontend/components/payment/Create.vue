<template>
  <div>
    <!-- Banking Dialog -->
    <el-dialog
      v-model="dialogBanking"
      title=""
      width="500"
      :show-close="false"
      class="banking-dialog"
    >
      <!-- Custom Header -->
      <template #header>
        <div class="flex items-center justify-between px-4 pb-0">
          <div class="flex items-center space-x-2">
            <div
              class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-4 h-4 text-white"
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
              <h3 class="text-lg font-bold text-gray-800">Nạp Code Point</h3>
              <p class="text-xs text-gray-500">Chuyển khoản nhanh chóng</p>
            </div>
          </div>
          <button
            @click="dialogBanking = false"
            class="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <svg
              class="w-3 h-3 text-gray-500"
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
      <div class="p-4 pt-2">
        <!-- QR Code Section -->
        <div class="relative mb-4">
          <div
            class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100 border-dashed"
          >
            <div class="flex flex-col items-center space-y-3">
              <!-- QR Code Container -->
              <div class="relative">
                <div
                  class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl blur opacity-20"
                ></div>
                <div
                  class="relative bg-white rounded-xl shadow-lg border-2 border-white"
                >
                  <img
                    alt="Banking QR"
                    :src="`https://api.vietqr.io/image/970422-09999838622222-1d7x779.jpg?accountName=DANG%20QUOC%20HUY&addInfo=CHOCODE_${currentUser?.username}`"
                    class="w-36 h-36 object-contain rounded-lg"
                  />
                </div>
              </div>

              <!-- Bank Info -->
              <div class="text-center space-y-1">
                <p class="text-xs text-gray-30 font-bold">
                  STK: 09999838622222
                </p>
                <p class="text-xs font-medium text-gray-800">DANG QUOC HUY</p>
                <h4 class="font-medium text-gray-800 text-sm">
                  Nội dung chuyển khoản:
                </h4>
                <div
                  class="bg-gray-50 rounded-lg p-2 font-mono text-xs border-2 border-dashed border-gray-200 flex items-center justify-center gap-x-2"
                >
                  <span class="text-primary font-bold" ref="codeRef"
                    >CHOCODE_{{ currentUser?.username }}</span
                  >
                  <Copy class="w-3 h-3 cursor-pointer" @click="handleCopy" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Current Balance & Exchange Rate -->
        <div class="space-y-3 mb-4">
          <!-- Current Balance -->
          <div
            class="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 border border-purple-200"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <div
                  class="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-3 h-3 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    ></path>
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-800"
                  >Số dư hiện tại</span
                >
              </div>
              <span class="text-lg font-bold text-purple-600"
                >{{ currentBalance || 0 }} CP</span
              >
            </div>
          </div>

          <!-- Exchange Rate -->
          <div
            class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <div
                  class="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-3 h-3 text-green-600"
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
                <span class="text-sm font-medium text-gray-800"
                  >Tỷ giá quy đổi</span
                >
              </div>
              <div class="flex items-center space-x-1">
                <span class="text-lg font-bold text-green-500">1 CP</span>
                <span class="text-gray-400 text-xs">=</span>
                <span class="text-lg font-bold text-[#F97316]">1.000đ</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Support Info -->
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div class="flex items-start space-x-2">
            <div
              class="w-4 h-4 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
            >
              <svg
                class="w-2 h-2 text-yellow-600"
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
            <div class="text-xs text-yellow-800">
              <p class="font-medium mb-1">Lưu ý quan trọng:</p>
              <ul class="space-y-0.5 text-xs">
                <li>• Chuyển khoản sai nội dung sẽ không được cộng điểm</li>
                <li>• Thời gian xử lý: 1-5 phút sau khi chuyển khoản</li>
                <li>• Liên hệ hỗ trợ nếu có vấn đề</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- Payment Success Dialog -->
    <el-dialog
      v-model="dialogPaymentSuccess"
      title=""
      width="500"
      :show-close="false"
      class="payment-success-dialog"
      :close-on-click-modal="false"
      align-center
    >
      <!-- Custom Header -->
      <template #header>
        <div class="flex items-center justify-between px-4 pb-0">
          <div class="flex items-center space-x-2">
            <div
              class="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center animate-pulse"
            >
              <CheckCircle class="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-800">
                Nạp Code Point Thành Công
              </h3>
              <p class="text-xs text-gray-500">Giao dịch hoàn tất</p>
            </div>
          </div>
          <button
            @click="closeSuccessDialog"
            class="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X class="w-3 h-3 text-gray-500" />
          </button>
        </div>
      </template>

      <!-- Dialog Body -->
      <div class="p-4 pt-2 relative overflow-hidden">
        <!-- Confetti Animation -->
        <div v-if="showConfetti" class="confetti-container">
          <div
            v-for="i in 30"
            :key="i"
            class="confetti"
            :style="{
              '--delay': Math.random() * 2 + 's',
              '--x': Math.random() * 100 + '%',
              '--color': [
                '#3B82F6',
                '#10B981',
                '#F59E0B',
                '#EF4444',
                '#8B5CF6',
              ][Math.floor(Math.random() * 5)],
            }"
          ></div>
        </div>

        <!-- Success Icon with Animation -->
        <div class="flex justify-center mb-6">
          <div class="relative">
            <div class="success-circle">
              <CheckCircle class="w-16 h-16 text-green-500 animate-bounce" />
            </div>
            <div class="success-ring"></div>
            <div class="success-ring-2"></div>
          </div>
        </div>

        <!-- Amount Animation -->
        <div class="text-center mb-6">
          <div class="mb-2">
            <span class="text-sm text-gray-600">Số tiền đã nạp</span>
          </div>
          <div class="relative">
            <div
              class="amount-display"
              :class="{ 'animate-amount': animateAmount }"
            >
              <span
                class="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent"
              >
                +{{ formatCurrency(addedAmount) }}
              </span>
              <span class="text-lg text-gray-500 ml-2">CP</span>
            </div>
            <!-- Flying money effect -->
            <div v-if="animateAmount" class="money-particles">
              <Coins
                v-for="i in 8"
                :key="i"
                class="money-particle"
                :style="{
                  '--delay': i * 0.1 + 's',
                  '--angle': i * 45 + 'deg',
                }"
              />
            </div>
          </div>
        </div>

        <!-- Balance Update Animation -->
        <div
          class="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 mb-4 border border-green-200"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div
                class="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center"
              >
                <Coins class="w-4 h-4 text-white" />
              </div>
              <span class="text-sm font-medium text-gray-800">Số dư mới</span>
            </div>
            <div
              class="balance-counter"
              :class="{ 'animate-counter': animateAmount }"
            >
              <span class="text-2xl font-bold text-green-600">
                {{ formatCurrency(newBalance) }} CP
              </span>
            </div>
          </div>

          <!-- Balance increase indicator -->
          <div class="mt-2 flex items-center justify-end space-x-1">
            <ArrowUpRight class="w-3 h-3 text-green-500" />
            <span class="text-xs text-green-600 font-medium">
              +{{ formatCurrency(addedAmount) }} CP
            </span>
          </div>
        </div>

        <!-- Transaction Details -->
        <div class="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 class="text-sm font-semibold text-gray-800 mb-3">
            Chi tiết giao dịch
          </h4>
          <div class="space-y-2 text-xs">
            <div class="flex justify-between">
              <span class="text-gray-600">Mã giao dịch:</span>
              <div class="flex items-center space-x-1">
                <span class="font-mono text-gray-800">{{ transactionId }}</span>
                <Copy
                  class="w-3 h-3 text-gray-500 cursor-pointer hover:text-gray-700"
                  @click="copyTransactionId"
                />
              </div>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Thời gian:</span>
              <span class="text-gray-800">{{ formatTime(new Date()) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Phương thức:</span>
              <span class="text-gray-800">Chuyển khoản ngân hàng</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Trạng thái:</span>
              <div class="flex items-center space-x-1">
                <div
                  class="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                ></div>
                <span class="text-green-600 font-medium">Thành công</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Success Message -->
        <div
          class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3 mb-4"
        >
          <div class="flex items-start space-x-2">
            <CheckCircle class="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <div class="text-xs text-green-800">
              <p class="font-medium mb-1">Chúc mừng!</p>
              <p>
                Code Point đã được cộng vào tài khoản của bạn. Bạn có thể sử
                dụng ngay để mua các dịch vụ trên hệ thống.
              </p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex space-x-2">
          <button
            @click="closeSuccessDialog"
            class="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-4 rounded-lg font-medium text-sm hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105"
          >
            Hoàn tất
          </button>
          <button
            @click="viewHistory"
            class="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
          >
            Xem lịch sử
          </button>
        </div>
      </div>
    </el-dialog>

    <!-- Test Buttons -->
    <div class="p-4 space-x-2">
      <button
        @click="dialogBanking = true"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Mở Dialog Banking
      </button>
      <button
        @click="showPaymentSuccess"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Test Payment Success
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Copy, CheckCircle, X, Coins, ArrowUpRight } from "lucide-vue-next";

// Banking Dialog State
const dialogBanking = ref(false);
const currentUser = ref({ username: "testuser" });
const currentBalance = ref(12500);

// Payment Success Dialog State
const dialogPaymentSuccess = ref(false);
const showConfetti = ref(false);
const animateAmount = ref(false);
const addedAmount = ref(50000);
const transactionId = ref("TXN202405280001");

const newBalance = computed(() => currentBalance.value + addedAmount.value);

// Watch for success dialog opening to trigger animations
watch(dialogPaymentSuccess, (newVal) => {
  if (newVal) {
    showConfetti.value = true;
    setTimeout(() => {
      animateAmount.value = true;
    }, 1000);
  } else {
    showConfetti.value = false;
    animateAmount.value = false;
  }
});

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN").format(amount);
};

const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const handleCopy = async () => {
  try {
    const textToCopy = `CHOCODE_${currentUser.value?.username}`;
    await navigator.clipboard.writeText(textToCopy);
    console.log("Code copied to clipboard");
  } catch (err) {
    console.error("Failed to copy code");
  }
};

const copyTransactionId = async () => {
  try {
    await navigator.clipboard.writeText(transactionId.value);
    console.log("Transaction ID copied to clipboard");
  } catch (err) {
    console.error("Failed to copy transaction ID");
  }
};

const closeSuccessDialog = () => {
  dialogPaymentSuccess.value = false;
};

const viewHistory = () => {
  closeSuccessDialog();
  // Navigate to transaction history page
  console.log("Navigate to history page");
};

const showPaymentSuccess = () => {
  dialogBanking.value = false;
  setTimeout(() => {
    dialogPaymentSuccess.value = true;
  }, 300);
};
</script>

<style scoped>
.banking-dialog :deep(.el-dialog),
.payment-success-dialog :deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
}

.banking-dialog :deep(.el-dialog__header),
.payment-success-dialog :deep(.el-dialog__header) {
  padding: 16px 0 8px 0;
  margin: 0;
}

.banking-dialog :deep(.el-dialog__body),
.payment-success-dialog :deep(.el-dialog__body) {
  padding: 0;
}

.bg-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Confetti Animation */
.confetti-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.confetti {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--color);
  border-radius: 2px;
  left: var(--x);
  animation: confetti-fall 3s linear var(--delay) forwards;
}

@keyframes confetti-fall {
  0% {
    top: -10px;
    transform: rotate(0deg);
    opacity: 1;
  }
  100% {
    top: 100%;
    transform: rotate(720deg);
    opacity: 0;
  }
}

/* Success Icon Animation */
.success-circle {
  position: relative;
  z-index: 3;
}

.success-ring,
.success-ring-2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #10b981;
  border-radius: 50%;
  opacity: 0;
}

.success-ring {
  width: 80px;
  height: 80px;
  animation: ripple 1.5s ease-out infinite;
}

.success-ring-2 {
  width: 100px;
  height: 100px;
  animation: ripple 1.5s ease-out 0.3s infinite;
}

@keyframes ripple {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.8;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}

/* Amount Animation */
.amount-display {
  position: relative;
  display: inline-block;
  transition: all 0.5s ease;
}

.animate-amount {
  animation: amount-pop 0.8s ease-out;
}

@keyframes amount-pop {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Money Particles */
.money-particles {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.money-particle {
  position: absolute;
  width: 16px;
  height: 16px;
  color: #f59e0b;
  animation: money-fly 1.5s ease-out var(--delay) forwards;
  transform-origin: center;
}

@keyframes money-fly {
  0% {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-60px)
      scale(0.5);
    opacity: 0;
  }
}

/* Balance Counter Animation */
.balance-counter {
  transition: all 0.3s ease;
}

.animate-counter {
  animation: counter-bounce 0.6s ease-out;
}

@keyframes counter-bounce {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
    color: #10b981;
  }
  100% {
    transform: scale(1);
  }
}

/* Pulse animations */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  40%,
  43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>
