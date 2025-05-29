<template>
  <el-dialog
    v-model="dialogPaymentSuccess"
    title=""
    width="450"
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
          @click="closeDialog"
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
            '--color': ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][
              Math.floor(Math.random() * 5)
            ],
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
              +{{ formatCurrency(creditAmount) }}
            </span>
            <span class="text-lg text-gray-500 ml-2">VNĐ</span>
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
      <!-- <div
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
              {{ formatCurrency(displayBalance) }}
              CP
            </span>
          </div>
        </div>

        Balance increase indicator
        <div class="mt-2 flex items-center justify-end space-x-1">
          <ArrowUpRight class="w-3 h-3 text-green-500" />
          <span class="text-xs text-green-600 font-medium">
            +{{ creditPoints }}
            CP
          </span>
        </div>
      </div> -->

      <!-- Transaction Details -->
      <div class="bg-gray-50 rounded-lg p-4 mb-4">
        <h4 class="text-sm font-semibold text-gray-800 mb-3">
          Chi tiết giao dịch
        </h4>
        <div class="space-y-2 text-xs">
          <div class="flex justify-between">
            <span class="text-gray-600">Mã giao dịch:</span>
            <div class="flex items-center space-x-1">
              <span class="font-mono text-gray-800">{{
                transactionRef
              }}</span>
              <Copy
                class="w-3 h-3 text-gray-500 cursor-pointer hover:text-gray-700"
                @click="copyTransactionId"
              />
            </div>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Thời gian:</span>
            <span class="text-gray-800">{{
              transactionTime
            }}</span>
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
              Code Point đã được cộng vào tài khoản của bạn. Bạn có thể sử dụng
              ngay để mua các dịch vụ trên hệ thống.
            </p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-2">
        <button
          @click="closeDialog"
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
</template>

<script setup lang="ts">
import { Coins, CheckCircle, X, ArrowUpRight, Copy } from "lucide-vue-next";
import { useSocketPayment } from "@/composables/useSocketPayment";


// Composables
const { paymentData } = useSocketPayment();
const currentUser = useCurrentUser();
const token = useCookie("auth.token");

// Reactive state
const dialogPaymentSuccess = ref(false);
const showConfetti = ref(false);
const animateAmount = ref(false);
const isLoading = ref(false);

// Computed properties
const creditAmount = computed(() => {
  const amount = paymentData.value?.credit_amount;
  return amount && !isNaN(Number(amount)) ? Number(amount) : 0;
});

const creditPoints = computed(() => {
  return Math.round(creditAmount.value / 1000);
});


const transactionRef = computed(() => {
  return paymentData.value?.ref_no || 'N/A';
});

const transactionTime = computed(() => {
  return paymentData.value?.transaction_date || new Date().toLocaleString('vi-VN');
});

// Methods
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN").format(amount);
};


const showNotification = (data: any): void => {
  if (!data) return;

  ElNotification({
    title: `💰 Giao dịch từ ${data.username || 'Unknown'}`,
    message: `${formatCurrency(Number(data.credit_amount || 0))} ${data.currency || 'VNĐ'} - ${data.description || 'Nạp tiền thành công'}`,
    type: "success",
    position: "bottom-left",
    duration: 6000,
  });
};

const startAnimations = (): void => {
  showConfetti.value = true;
  
  // Delay amount animation for better UX
  setTimeout(() => {
    animateAmount.value = true;
  }, 500);
};

const resetAnimations = (): void => {
  showConfetti.value = false;
  animateAmount.value = false;
};

const copyTransactionId = async (): Promise<void> => {
  if (!transactionRef.value || transactionRef.value === 'N/A') {
    ElMessage.warning('Không có mã giao dịch để sao chép');
    return;
  }

  try {
    await navigator.clipboard.writeText(transactionRef.value);
    ElMessage.success('Đã sao chép mã giao dịch');
  } catch (error) {
    console.error('Copy failed:', error);
    ElMessage.error('Không thể sao chép mã giao dịch');
  }
};

const closeDialog = (): void => {
  dialogPaymentSuccess.value = false;
};

const viewHistory = (): void => {
  closeDialog();
  navigateTo("/history");
};

// Watchers
watch(dialogPaymentSuccess, (newVal) => {
  if (newVal) {
    startAnimations();
  } else {
    resetAnimations();
  }
});

watch(paymentData, async (newVal) => {
  if (!newVal) return;

  try {
    
    // Show dialog
    dialogPaymentSuccess.value = true;
    
    // Show notification
    showNotification(newVal);
  } catch (error) {
    console.error('Error handling payment data:', error);
    ElMessage.error('Có lỗi xảy ra khi xử lý giao dịch');
  }
}, { deep: true });

</script>

<style scoped>
.payment-success-dialog :deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
}

.payment-success-dialog :deep(.el-dialog__header) {
  padding: 16px 0 8px 0;
  margin: 0;
}

.payment-success-dialog :deep(.el-dialog__body) {
  padding: 0;
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