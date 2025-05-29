<template>
  <div>
    <!-- Trigger Button -->
    <el-button 
      type="primary" 
      @click="dialogVisible = true"
      class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
    >
      <DollarSign class="w-4 h-4 mr-2" />
      Nạp Code Point
    </el-button>

    <!-- Main Dialog -->
    <el-dialog
      v-model="dialogVisible"
      title=""
      width="520px"
      :show-close="false"
      class="money-transfer-dialog"
      :class="{ 'success-mode': transferSuccess }"
    >
      <!-- Custom Header -->
      <template #header>
        <div class="flex items-center justify-between px-6 pb-0">
          <div class="flex items-center space-x-3">
            <div class="relative">
              <div 
                class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                :class="{ 'animate-pulse': transferSuccess }"
              >
                <DollarSign v-if="!transferSuccess" class="w-6 h-6 text-white" />
                <CheckCircle v-else class="w-6 h-6 text-white animate-bounce" />
              </div>
              <div 
                v-if="transferSuccess" 
                class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center animate-ping"
              >
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-800 transition-all duration-300">
                {{ transferSuccess ? 'Chuyển Khoản Thành Công!' : 'Nạp Code Point' }}
              </h3>
              <p class="text-sm text-gray-500">
                {{ transferSuccess ? 'Điểm đã được cộng vào tài khoản' : 'Chuyển khoản nhanh chóng & an toàn' }}
              </p>
            </div>
          </div>
          <button
            @click="closeDialog"
            class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <X class="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </template>

      <!-- Dialog Body -->
      <div class="p-6 pt-4">
        <!-- Success Animation Overlay -->
        <div 
          v-if="showSuccessAnimation"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20"
        >
          <div class="success-animation">
            <div class="money-rain">
              <div v-for="i in 20" :key="i" class="money-bill" :style="{ 
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 2 + 's',
                animationDuration: (2 + Math.random() * 2) + 's'
              }">
                <Banknote class="w-6 h-6 text-green-500" />
              </div>
            </div>
            <div class="success-checkmark">
              <CheckCircle class="w-20 h-20 text-green-500 animate-bounce" />
              <div class="ripple-effect"></div>
            </div>
          </div>
        </div>

        <!-- QR Code Section -->
        <div class="relative mb-6" v-if="!transferSuccess">
          <div class="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-dashed border-blue-200 relative overflow-hidden">
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-10">
              <div class="absolute top-4 left-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <div class="absolute top-8 right-8 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style="animation-delay: 0.5s"></div>
              <div class="absolute bottom-6 left-8 w-2 h-2 bg-pink-400 rounded-full animate-pulse" style="animation-delay: 1s"></div>
            </div>
            
            <div class="flex flex-col items-center space-y-4 relative z-10">
              <!-- QR Code Container -->
              <div class="relative group">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity animate-pulse"></div>
                <div class="relative bg-white rounded-2xl shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-300">
                  <img
                    alt="Banking QR"
                    :src="`https://api.vietqr.io/image/970422-09999838622222-1d7x779.jpg?accountName=DANG%20QUOC%20HUY&addInfo=CHOCODE_${username}`"
                    class="w-44 h-44 object-contain rounded-xl"
                  />
                  <!-- Floating Icons -->
                  <div class="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <Sparkles class="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>

              <!-- Bank Info -->
              <div class="text-center space-y-3">
                <div class="space-y-1">
                  <p class="text-sm text-gray-600 font-semibold">STK: 09999838622222</p>
                  <p class="text-base font-bold text-gray-800">DANG QUOC HUY</p>
                  <div class="flex items-center justify-center space-x-1">
                    <Shield class="w-4 h-4 text-green-500" />
                    <span class="text-xs text-green-600 font-medium">Tài khoản đã xác thực</span>
                  </div>
                </div>
                
                <div class="space-y-2">
                  <h4 class="font-semibold text-gray-800 text-sm flex items-center justify-center space-x-1">
                    <Info class="w-4 h-4" />
                    <span>Nội dung chuyển khoản:</span>
                  </h4>
                  <div class="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-3 border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
                    <div class="flex items-center justify-center gap-x-3">
                      <span class="text-blue-600 font-bold font-mono text-sm">CHOCODE_{{ username }}</span>
                      <button
                        @click="handleCopy"
                        class="p-1 rounded-lg hover:bg-blue-100 transition-colors group"
                        :class="{ 'bg-green-100': copied }"
                      >
                        <Copy v-if="!copied" class="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                        <CheckCircle v-else class="w-4 h-4 text-green-600 animate-bounce" />
                      </button>
                    </div>
                    <p v-if="copied" class="text-xs text-green-600 mt-1 animate-fade-in">Đã sao chép!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Success State -->
        <div v-if="transferSuccess" class="mb-6">
          <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-green-100 to-emerald-100 opacity-30 animate-wave"></div>
            <div class="text-center space-y-4 relative z-10">
              <div class="relative">
                <CheckCircle class="w-16 h-16 text-green-500 mx-auto animate-bounce" />
                <div class="absolute inset-0 rounded-full bg-green-200 animate-ping opacity-30"></div>
              </div>
              <div>
                <h3 class="text-xl font-bold text-green-800 mb-2">Chuyển khoản thành công!</h3>
                <p class="text-green-600">Số điểm đã được cộng vào tài khoản của bạn</p>
              </div>
              <div class="bg-white rounded-xl p-4 shadow-inner">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Số tiền đã chuyển:</span>
                  <span class="font-bold text-green-600 text-lg">{{ formatCurrency(transferAmount) }}</span>
                </div>
                <div class="flex items-center justify-between mt-2">
                  <span class="text-gray-600">Điểm nhận được:</span>
                  <span class="font-bold text-blue-600 text-lg">{{ transferAmount / 1000 }} CP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Balance & Exchange Rate -->
        <div class="grid grid-cols-1 gap-4 mb-6" v-if="!transferSuccess">
          <!-- Current Balance -->
          <div class="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200 hover:shadow-lg transition-all duration-300 group">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield class="w-4 h-4 text-white" />
                </div>
                <span class="text-sm font-semibold text-gray-800">Số dư hiện tại</span>
              </div>
              <div class="text-right">
                <span class="text-xl font-bold text-purple-600 block">{{ currentBalance.toLocaleString() }} CP</span>
                <span class="text-xs text-gray-500">≈ {{ formatCurrency(currentBalance * 1000) }}</span>
              </div>
            </div>
          </div>

          <!-- Exchange Rate -->
          <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 hover:shadow-lg transition-all duration-300 group">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp class="w-4 h-4 text-white" />
                </div>
                <span class="text-sm font-semibold text-gray-800">Tỷ giá quy đổi</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-lg font-bold text-green-600">1 CP</span>
                <ArrowRight class="w-4 h-4 text-gray-400" />
                <span class="text-lg font-bold text-orange-500">1.000đ</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Support Info -->
        <div class="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300" v-if="!transferSuccess">
          <div class="flex items-start space-x-3">
            <div class="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info class="w-3 h-3 text-yellow-600" />
            </div>
            <div class="text-sm text-yellow-800">
              <p class="font-semibold mb-2">Lưu ý quan trọng:</p>
              <ul class="space-y-1 text-sm">
                <li class="flex items-start space-x-2">
                  <span class="text-yellow-500 mt-1">•</span>
                  <span>Chuyển khoản sai nội dung sẽ không được cộng điểm</span>
                </li>
                <li class="flex items-start space-x-2">
                  <span class="text-yellow-500 mt-1">•</span>
                  <span>Thời gian xử lý: 1-5 phút sau khi chuyển khoản</span>
                </li>
                <li class="flex items-start space-x-2">
                  <span class="text-yellow-500 mt-1">•</span>
                  <span>Liên hệ hỗ trợ nếu có vấn đề phát sinh</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex space-x-3 mt-6" v-if="!transferSuccess">
          <el-button 
            @click="simulateTransfer" 
            type="primary" 
            class="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-none h-12"
          >
            <Sparkles class="w-4 h-4 mr-2" />
            Demo Chuyển Khoản
          </el-button>
          <el-button 
            @click="closeDialog" 
            class="px-6 h-12"
          >
            Đóng
          </el-button>
        </div>

        <div class="flex justify-center mt-6" v-else>
          <el-button 
            @click="closeDialog" 
            type="primary" 
            class="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-none px-8 h-12"
          >
            <CheckCircle class="w-4 h-4 mr-2" />
            Hoàn thành
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { 
  X, 
  DollarSign, 
  Copy, 
  CheckCircle, 
  Shield, 
  TrendingUp, 
  Info,
  ArrowRight,
  Sparkles,
  Banknote
} from 'lucide-vue-next'

// Reactive variables
const dialogVisible = ref(false)
const transferSuccess = ref(false)
const showSuccessAnimation = ref(false)
const currentBalance = ref(150000)
const username = ref('user123')
const copied = ref(false)
const transferAmount = ref(50000)

// Methods
const handleCopy = () => {
  navigator.clipboard.writeText(`CHOCODE_${username.value}`)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

const simulateTransfer = async () => {
  // Show success animation
  showSuccessAnimation.value = true
  
  // Hide animation after 3 seconds and show success state
  setTimeout(() => {
    showSuccessAnimation.value = false
    transferSuccess.value = true
    currentBalance.value += Math.floor(transferAmount.value / 1000)
  }, 3000)
}

const closeDialog = () => {
  dialogVisible.value = false
  // Reset states after dialog closes
  setTimeout(() => {
    transferSuccess.value = false
    showSuccessAnimation.value = false
  }, 300)
}
</script>

<style scoped>
/* Custom Dialog Styles */
:deep(.money-transfer-dialog) {
  --el-dialog-border-radius: 20px;
  border-radius: 20px;
  overflow: hidden;
}

:deep(.money-transfer-dialog .el-dialog__header) {
  padding: 20px 0 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

:deep(.money-transfer-dialog .el-dialog__body) {
  padding: 0;
}

/* Success Animation Styles */
.success-animation {
  position: relative;
  z-index: 100;
}

.money-rain {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}

.money-bill {
  position: absolute;
  top: -50px;
  animation: fall linear infinite;
}

@keyframes fall {
  to {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

.success-checkmark {
  position: relative;
  z-index: 101;
}

.ripple-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  background: rgba(34, 197, 94, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: ripple 2s infinite;
}

@keyframes ripple {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    width: 200px;
    height: 200px;
    opacity: 0;
  }
}

/* Wave Animation */
@keyframes wave {
  0%, 100% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
}

.animate-wave {
  animation: wave 3s ease-in-out infinite;
}

/* Fade In Animation */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

/* Hover Effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Pulse Animation for Success Mode */
.success-mode :deep(.el-dialog__header) {
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
}

/* Custom Button Styles */
:deep(.el-button--primary) {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border: none;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
}

:deep(.el-button--primary:hover) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}

/* Responsive Design */
@media (max-width: 640px) {
  :deep(.money-transfer-dialog) {
    width: 95vw !important;
    margin: 20px auto;
  }
}
</style>