<template>
  <div class="min-h-screen bg-gray-25 pt-20 pb-8">
    <div class="">
      <!-- Header -->
      <div
        class="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8"
      >
        <div
          class="flex flex-col lg:flex-row lg:items-center lg:justify-between"
        >
          <div class="mb-6 lg:mb-0">
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Lịch sử giao dịch
            </h1>
            <p class="text-gray-600">
              Quản lý và theo dõi các giao dịch của bạn
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-3">
            <button
              @click="refreshData"
              class="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <RefreshCcw class="w-4 h-4 mr-2" />
              Làm mới
            </button>
            <button
              class="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Download class="w-4 h-4 mr-2" />
              Xuất Excel
            </button>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium mb-1">
                Số tiền đã nạp
              </p>
              <p class="text-2xl font-bold text-gray-900">
                {{ formatCurrency(totalIncome) }}
              </p>
              <p class="text-green-600 text-sm font-medium mt-1">
                +12.5% so với tháng trước
              </p>
            </div>
            <div
              class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"
            >
              <TrendingUp class="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium mb-1">Số giao dịch</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ transactions.length }}
              </p>
              <p class="text-primary text-sm font-medium mt-1">Tổng cộng</p>
            </div>
            <div
              class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"
            >
              <FileText class="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium mb-1">
                Giao dịch hôm nay
              </p>
              <p class="text-2xl font-bold text-gray-900">
                {{ todayTransactions }}
              </p>
              <p class="text-purple-600 text-sm font-medium mt-1">Trong ngày</p>
            </div>
            <div
              class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"
            >
              <Calendar class="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <!-- Filter Section -->
      <div
        class="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8"
      >
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Bộ lọc</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Khoảng thời gian</label
            >
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              clearable
              range-separator="đến"
              start-placeholder="Từ ngày"
              end-placeholder="Đến ngày"
              class="w-full"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Số tiền</label
            >
            <select
              v-model="selectedAmount"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tất cả</option>
              <option value="low">Dưới 10,000 VND</option>
              <option value="medium">10,000 - 50,000 VND</option>
              <option value="high">Trên 50,000 VND</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Tìm kiếm</label
            >
            <div class="relative">
              <Search
                class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              />
              <input
                v-model="searchText"
                placeholder="Tìm kiếm mã giao dịch..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div class="flex items-end">
            <button
              @click="handleFilter"
              class="w-full bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <Filter class="w-4 h-4 mr-2" />
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>

      <!-- Transaction Table -->
      <div
        class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
      >
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">
            Danh sách giao dịch
          </h2>
        </div>

        <!-- Mobile View -->
        <div class="block lg:hidden">
          <div class="divide-y divide-gray-200">
            <div
              v-for="(transaction, index) in paginatedTransactions"
              :key="transaction.id"
              class="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
              @click="showTransactionDetail(transaction)"
            >
              <!-- Header -->
              <div class="flex justify-between items-start mb-4">
                <div>
                  <p class="font-semibold text-gray-900">
                    Giao dịch #{{ transaction.id }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ formatDate(transaction.transactionDate) }}
                  </p>
                </div>
                <div class="flex space-x-2">
                  <button
                    @click.stop="showTransactionDetail(transaction)"
                    class="w-8 h-8 bg-blue-100 text-primary rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors"
                  >
                    <Eye class="w-4 h-4" />
                  </button>
                  <button
                    @click.stop="downloadTransaction(transaction)"
                    class="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center hover:bg-green-200 transition-colors"
                  >
                    <Download class="w-4 h-4" />
                  </button>
                </div>
              </div>

              <!-- Amount -->
              <div class="mb-3">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold"
                  :class="
                    Number(transaction.creditAmount) > 0
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  "
                >
                  {{
                    formatCurrency(
                      transaction.creditAmount || transaction.debitAmount
                    )
                  }}
                </span>
                <span
                  class="ml-2 inline-flex items-center px-2 py-1 rounded-md text-xs font-medium"
                  :class="
                    Number(transaction.creditAmount) > 0
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  "
                >
                  {{ Number(transaction.creditAmount) > 0 ? "Thu" : "Chi" }}
                </span>
              </div>

              <!-- Description -->
              <p class="text-gray-700 text-sm mb-3 line-clamp-2">
                {{ transaction.description }}
              </p>

              <!-- Reference -->
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500">Mã tham chiếu:</span>
                <span class="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                  {{ transaction.refNo }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop View -->
        <div class="hidden lg:block overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ngày giao dịch
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Số tiền
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Loại
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Mô tả
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Mã tham chiếu
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="transaction in paginatedTransactions"
                :key="transaction.id"
                class="hover:bg-gray-50 cursor-pointer transition-colors"
                @click="showTransactionDetail(transaction)"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  #{{ transaction.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div class="flex items-center">
                    <Calendar class="w-4 h-4 text-gray-400 mr-2" />
                    {{ formatDate(transaction.transactionDate) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="
                      Number(transaction.creditAmount) > 0
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    "
                  >
                    {{
                      formatCurrency(
                        transaction.creditAmount || transaction.debitAmount
                      )
                    }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="
                      Number(transaction.creditAmount) > 0
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    "
                  >
                    {{ Number(transaction.creditAmount) > 0 ? "Thu" : "Chi" }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900 max-w-xs">
                  <div class="truncate" :title="transaction.description">
                    {{ transaction.description }}
                  </div>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500"
                >
                  <span class="bg-gray-100 px-2 py-1 rounded">
                    {{ transaction.refNo }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click.stop="showTransactionDetail(transaction)"
                      class="w-8 h-8 bg-blue-100 text-primary rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors"
                      title="Xem chi tiết"
                    >
                      <Eye class="w-4 h-4" />
                    </button>
                    <button
                      @click.stop="downloadTransaction(transaction)"
                      class="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center hover:bg-green-200 transition-colors"
                      title="Tải xuống"
                    >
                      <Download class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredTransactions.length === 0" class="text-center py-12">
          <FileText class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-semibold text-gray-700 mb-2">
            Không có giao dịch
          </h3>
          <p class="text-gray-500">Chưa có giao dịch nào được thực hiện</p>
        </div>

        <!-- Pagination -->
        <div
          v-if="filteredTransactions.length > 0"
          class="px-6 py-4 border-t border-gray-200"
        >
          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-700">
              Hiển thị {{ (currentPage - 1) * pageSize + 1 }} đến
              {{
                Math.min(currentPage * pageSize, filteredTransactions.length)
              }}
              trong tổng số {{ filteredTransactions.length }} giao dịch
            </p>
            <div class="flex space-x-2">
              <button
                @click="currentPage > 1 && currentPage--"
                :disabled="currentPage === 1"
                class="px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trước
              </button>
              <span class="px-3 py-2 text-sm text-gray-700">
                {{ currentPage }} / {{ totalPages }}
              </span>
              <button
                @click="currentPage < totalPages && currentPage++"
                :disabled="currentPage === totalPages"
                class="px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sau
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction Detail Modal -->
    <el-dialog
      v-model="showDetailModal"
      title="Chi tiết giao dịch"
      width="600px"
      class="evergreen-dialog"
    >
      <div v-if="selectedTransaction" class="space-y-6">
        <!-- Transaction Header -->
        <div
          class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-gray-900">
              Giao dịch #{{ selectedTransaction.id }}
            </h3>
            <span
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold"
              :class="
                Number(selectedTransaction.creditAmount) > 0
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              "
            >
              {{
                Number(selectedTransaction.creditAmount) > 0
                  ? "THU NHẬP"
                  : "CHI TIÊU"
              }}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium text-gray-600">Số tiền</label>
              <p class="text-2xl font-bold text-gray-900">
                {{
                  formatCurrency(
                    selectedTransaction.creditAmount ||
                      selectedTransaction.debitAmount
                  )
                }}
              </p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-600"
                >Ngày giao dịch</label
              >
              <p class="text-lg font-semibold text-gray-900">
                {{ formatDateTime(selectedTransaction.transactionDate) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Transaction Details -->
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gray-50 rounded-lg p-4">
              <label class="text-sm font-medium text-gray-600 block mb-1"
                >Tên tài khoản</label
              >
              <p class="text-gray-900 font-medium">
                {{ selectedTransaction.username }}
              </p>
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
              <label class="text-sm font-medium text-gray-600 block mb-1"
                >Tiền tệ</label
              >
              <p class="text-gray-900 font-medium">
                {{ selectedTransaction.currency }}
              </p>
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
              <label class="text-sm font-medium text-gray-600 block mb-1"
                >Ngày đăng</label
              >
              <p class="text-gray-900 font-medium">
                {{ formatDateTime(selectedTransaction.postingDate) }}
              </p>
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
              <label class="text-sm font-medium text-gray-600 block mb-1"
                >Thời gian tạo</label
              >
              <p class="text-gray-900 font-medium">
                {{ formatDateTime(selectedTransaction.created) }}
              </p>
            </div>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <label class="text-sm font-medium text-gray-600 block mb-2"
              >Mã tham chiếu</label
            >
            <div class="flex items-center space-x-2">
              <span
                class="font-mono bg-white px-3 py-1 rounded border text-gray-900"
              >
                {{ selectedTransaction.refNo }}
              </span>
              <button
                @click="copyToClipboard(selectedTransaction.refNo)"
                class="px-3 py-1 bg-primary text-white rounded hover:bg-blue-700 transition-colors text-sm"
              >
                <Copy class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <label class="text-sm font-medium text-gray-600 block mb-2"
              >Mô tả</label
            >
            <p class="text-gray-900">{{ selectedTransaction.description }}</p>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <button
            @click="handleCloseModal"
            class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Đóng
          </button>
          <button
            @click="printTransaction"
            class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Printer class="w-4 h-4 mr-2" />
            In
          </button>
          <button
            @click="downloadTransaction(selectedTransaction)"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <Download class="w-4 h-4 mr-2" />
            Tải về
          </button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  RefreshCcw,
  TrendingUp,
  FileText,
  Calendar,
  Search,
  Filter,
  Eye,
  Download,
  Copy,
  Printer,
} from "lucide-vue-next";

// Types
interface Transaction {
  id: number;
  username: string;
  postingDate: string;
  transactionDate: string;
  creditAmount: string;
  debitAmount: string;
  currency: string;
  description: string;
  refNo: string;
  created: string;
}

// Data
const transactions = ref<Transaction[]>([]);
const loading = ref(false);
const showDetailModal = ref(false);
const selectedTransaction = ref<Transaction | null>(null);
const token = useCookie("auth.token");

// Filter states
const dateRange = ref<[Date, Date] | null>(null);
const selectedAmount = ref("");
const searchText = ref("");

// Pagination
const currentPage = ref(1);
const pageSize = ref(10);

// Computed properties
const totalIncome = computed(() => {
  return transactions.value.reduce((sum, transaction) => {
    return sum + parseInt(transaction.creditAmount || "0");
  }, 0);
});

const todayTransactions = computed(() => {
  const today = new Date().toDateString();
  return transactions.value.filter((transaction) => {
    const transactionDate = new Date(
      transaction.transactionDate
    ).toDateString();
    return transactionDate === today;
  }).length;
});

const filteredTransactions = computed(() => {
  let filtered = [...transactions.value];

  // Filter by date range
  if (dateRange.value) {
    const [startDate, endDate] = dateRange.value;
    filtered = filtered.filter((transaction) => {
      const transactionDate = new Date(transaction.transactionDate);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  }

  // Filter by amount
  if (selectedAmount.value) {
    filtered = filtered.filter((transaction) => {
      const amount = parseInt(
        transaction.creditAmount || transaction.debitAmount
      );
      switch (selectedAmount.value) {
        case "low":
          return amount < 10000;
        case "medium":
          return amount >= 10000 && amount <= 50000;
        case "high":
          return amount > 50000;
        default:
          return true;
      }
    });
  }

  // Filter by search text
  if (searchText.value) {
    const search = searchText.value.toLowerCase();
    filtered = filtered.filter(
      (transaction) =>
        transaction.refNo.toLowerCase().includes(search) ||
        transaction.description.toLowerCase().includes(search)
    );
  }

  return filtered;
});

const totalPages = computed(() => {
  return Math.ceil(filteredTransactions.value.length / pageSize.value);
});

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredTransactions.value.slice(start, end);
});

// Methods
const formatCurrency = (amount: string | number) => {
  const num = typeof amount === "string" ? parseInt(amount) : amount;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(num);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("vi-VN");
};

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString("vi-VN");
};

const showTransactionDetail = (transaction: Transaction) => {
  selectedTransaction.value = transaction;
  showDetailModal.value = true;
};

const handleCloseModal = () => {
  showDetailModal.value = false;
  selectedTransaction.value = null;
};

const handleFilter = () => {
  currentPage.value = 1;
  ElMessage.success("Đã áp dụng bộ lọc");
};

const refreshData = async () => {
  loading.value = true;
  try {
    const data = await userService.userControllerGetTransactionHistory({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });
    transactions.value = data.data;
    ElMessage.success("Đã làm mới dữ liệu");
  } catch (error) {
    ElMessage.error("Có lỗi xảy ra khi làm mới dữ liệu");
  } finally {
    loading.value = false;
  }
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    ElMessage.success("Đã sao chép vào clipboard");
  } catch (error) {
    ElMessage.error("Không thể sao chép");
  }
};

const printTransaction = () => {
  ElMessage.info("Chức năng in đang được phát triển");
};

const downloadTransaction = (transaction: Transaction) => {
  ElMessage.success(`Đang tải xuống giao dịch #${transaction.id}`);
};

// Lifecycle
onMounted(async () => {
  try {
    const data = await userService.userControllerGetTransactionHistory({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });
    transactions.value = data.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
});

// SEO Meta
useSeoMeta({
  title: "Lịch sử giao dịch - ChoCode",
  description: "Quản lý và theo dõi lịch sử giao dịch của bạn trên ChoCode",
});
</script>

<style scoped>
/* Custom background */
.bg-gray-25 {
  background-color: #fafafa;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform,
    box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Focus styles */
input:focus,
select:focus,
button:focus-visible {
  outline: none;
}

/* Dialog customization */
:deep(.evergreen-dialog) {
  border-radius: 0.75rem;
  overflow: hidden;
}

:deep(.evergreen-dialog .el-dialog__header) {
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  padding: 1.5rem;
}

:deep(.evergreen-dialog .el-dialog__title) {
  font-weight: 600;
  color: #1f2937;
}

:deep(.evergreen-dialog .el-dialog__body) {
  padding: 1.5rem;
}

:deep(.evergreen-dialog .el-dialog__footer) {
  background-color: #f8fafc;
  border-top: 1px solid #e2e8f0;
  padding: 1rem 1.5rem;
}

/* Custom scrollbar */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Element Plus Date Picker styling */
:deep(.el-date-editor) {
  width: 100%;
}

:deep(.el-date-editor .el-input__wrapper) {
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
}

:deep(.el-date-editor .el-input__wrapper.is-focus) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid-cols-3 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .grid-cols-4 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
