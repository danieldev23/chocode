<template>
  <div class="min-h-screen bg-gray-25 pt-20 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Hero Section -->
      <div
        class="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8 mb-8"
      >
        <div class="text-center max-w-4xl mx-auto">
          <div class="flex items-center justify-center mb-6">
            <div
              class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4"
            >
              <AwardIcon class="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Bảng xếp hạng Developer
              </h1>
              <p class="text-lg text-gray-600">
                Khám phá những developer xuất sắc trong cộng đồng ChoCode
              </p>
            </div>
          </div>

          <div class="flex flex-wrap justify-center gap-4 mb-8">
            <div
              class="flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <AwardIcon class="w-5 h-5 text-blue-600 mr-2" />
              <span class="text-blue-700 font-medium">Top Performers</span>
            </div>
            <div
              class="flex items-center px-4 py-2 bg-purple-50 border border-purple-200 rounded-lg"
            >
              <UsersIcon class="w-5 h-5 text-purple-600 mr-2" />
              <span class="text-purple-700 font-medium">Community Leaders</span>
            </div>
            <div
              class="flex items-center px-4 py-2 bg-pink-50 border border-pink-200 rounded-lg"
            >
              <StarIcon class="w-5 h-5 text-pink-600 mr-2" />
              <span class="text-pink-700 font-medium">Rising Stars</span>
            </div>
          </div>

          <button
            @click="showNewUserDialog = true"
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center mx-auto"
          >
            <UserPlusIcon class="w-5 h-5 mr-2" />
            Đề cử Developer
          </button>
        </div>
      </div>

      <!-- Search and Filters -->
      <div
        class="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Search -->
          <div class="relative">
            <Search
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            />
            <input
              v-model="searchQuery"
              placeholder="Tìm kiếm developer..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Tag Filter -->
          <select
            v-model="filterTag"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tất cả tags</option>
            <option v-for="tag in uniqueTags" :key="tag" :value="tag">
              {{ tag }}
            </option>
          </select>

          <!-- Sort By -->
          <select
            v-model="sortBy"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="score">Sắp xếp theo điểm</option>
            <option value="solutions">Sắp xếp theo số bài giải</option>
            <option value="achievements">Sắp xếp theo thành tích</option>
            <option value="rankChange">Sắp xếp theo thay đổi hạng</option>
          </select>

          <!-- Sort Order -->
          <select
            v-model="sortOrder"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="desc">Cao nhất trước</option>
            <option value="asc">Thấp nhất trước</option>
          </select>
        </div>

        <!-- Active Filters -->
        <div v-if="hasActiveFilters" class="mt-4 flex flex-wrap gap-2">
          <div
            v-if="searchQuery"
            class="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm flex items-center"
          >
            Tìm kiếm: {{ searchQuery }}
            <button @click="searchQuery = ''" class="ml-2 hover:text-blue-900">
              <X class="w-4 h-4" />
            </button>
          </div>
          <div
            v-if="filterTag"
            class="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm flex items-center"
          >
            Tag: {{ filterTag }}
            <button @click="filterTag = ''" class="ml-2 hover:text-purple-900">
              <X class="w-4 h-4" />
            </button>
          </div>
          <button
            @click="clearFilters"
            class="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition-colors"
          >
            Xóa tất cả
          </button>
        </div>
      </div>

      <!-- Top 3 Rankings -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          v-for="(developer, index) in topThreeDevelopers"
          :key="developer.id"
          class="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center relative overflow-hidden"
          :class="{
            'ring-2 ring-yellow-400': index === 0,
            'ring-2 ring-gray-400': index === 1,
            'ring-2 ring-orange-400': index === 2,
          }"
        >
          <!-- Rank Badge -->
          <div
            class="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
            :class="{
              'bg-yellow-500': index === 0,
              'bg-gray-500': index === 1,
              'bg-orange-500': index === 2,
            }"
          >
            {{ index + 1 }}
          </div>

          <!-- Avatar -->
          <div class="relative mx-auto mb-4">
            <img
              :src="developer.avatar || 'https://via.placeholder.com/96'"
              :alt="developer.fullName"
              class="w-20 h-20 rounded-full object-cover border-4 mx-auto"
              :class="{
                'border-yellow-400': index === 0,
                'border-gray-400': index === 1,
                'border-orange-400': index === 2,
              }"
            />
            <div
              v-if="index === 0"
              class="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center"
            >
              <Crown class="w-4 h-4 text-white" />
            </div>
          </div>

          <!-- Developer Info -->
          <h3 class="text-lg font-bold text-gray-900 mb-1">
            {{ developer.fullName }}
          </h3>
          <p class="text-gray-600 text-sm mb-3">@{{ developer.username }}</p>

          <!-- Score -->
          <div class="mb-4">
            <p class="text-3xl font-bold text-gray-900 mb-1">
              {{ developer.score || "0" }}
            </p>
            <p class="text-gray-500 text-sm">điểm</p>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap justify-center gap-1 mb-4">
            <span
              v-for="tag in (developer.tags || ['Frontend']).slice(0, 2)"
              :key="tag"
              class="px-2 py-1 text-xs rounded-md bg-blue-100 text-blue-700"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <p class="font-semibold text-gray-900">
                {{ developer.solutions || 0 }}
              </p>
              <p class="text-gray-500">Bài giải</p>
            </div>
            <div>
              <p class="font-semibold text-gray-900">
                {{ developer.achievements || 0 }}
              </p>
              <p class="text-gray-500">Thành tích</p>
            </div>
            <div>
              <p
                class="font-semibold"
                :class="{
                  'text-green-600': (developer.rankChange || 0) > 0,
                  'text-red-600': (developer.rankChange || 0) < 0,
                  'text-gray-600': (developer.rankChange || 0) === 0,
                }"
              >
                {{ (developer.rankChange || 0) > 0 ? "+" : ""
                }}{{ developer.rankChange || 0 }}
              </p>
              <p class="text-gray-500">Thay đổi</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Developer List -->
      <div
        class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
      >
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Tất cả Developers</h2>
        </div>

        <div class="divide-y divide-gray-200">
          <div
            v-for="(developer, index) in paginatedDevelopers"
            :key="developer.id"
            class="p-6 hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <!-- Rank -->
                <div class="text-2xl font-bold text-gray-400 w-8 text-center">
                  {{ index + 4 }}
                </div>

                <!-- Avatar -->
                <div class="relative">
                  <img
                    :src="developer.avatar || 'https://via.placeholder.com/64'"
                    :alt="developer.fullName"
                    class="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div
                    v-if="developer.active"
                    class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"
                  ></div>
                </div>

                <!-- Developer Info -->
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900">
                    {{ developer.fullName }}
                  </h3>
                  <p class="text-gray-600">@{{ developer.username }}</p>

                  <!-- Bio -->
                  <p
                    v-if="developer.bio"
                    class="text-sm text-gray-500 mt-1 line-clamp-1"
                  >
                    {{ developer.bio }}
                  </p>

                  <!-- Tags -->
                  <div class="flex flex-wrap gap-2 mt-2">
                    <span
                      v-for="tag in (developer.tags || ['Developer']).slice(
                        0,
                        3
                      )"
                      :key="tag"
                      class="px-2 py-1 text-xs rounded-md bg-blue-100 text-blue-700"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Stats -->
              <div class="text-right">
                <p class="text-2xl font-bold text-gray-900">
                  {{ developer.score || "0" }}
                </p>
                <p class="text-sm text-gray-500">điểm</p>

                <div
                  class="flex items-center justify-end space-x-4 mt-2 text-sm"
                >
                  <div class="flex items-center text-gray-600">
                    <Code class="w-4 h-4 mr-1" />
                    <span>{{ developer.solutions || 0 }}</span>
                  </div>
                  <div class="flex items-center text-gray-600">
                    <StarIcon class="w-4 h-4 mr-1" />
                    <span>{{ developer.achievements || 0 }}</span>
                  </div>
                  <div
                    class="flex items-center"
                    :class="{
                      'text-green-600': (developer.rankChange || 0) > 0,
                      'text-red-600': (developer.rankChange || 0) < 0,
                      'text-gray-600': (developer.rankChange || 0) === 0,
                    }"
                  >
                    <TrendingUp class="w-4 h-4 mr-1" />
                    <span>
                      {{ (developer.rankChange || 0) > 0 ? "+" : ""
                      }}{{ developer.rankChange || 0 }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="px-6 py-4 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-700">
              Hiển thị {{ (currentPage - 1) * pageSize + 1 }} đến
              {{ Math.min(currentPage * pageSize, remainingDevelopers.length) }}
              trong tổng số {{ remainingDevelopers.length }} developers
            </p>
            <div class="flex space-x-2">
              <button
                @click="currentPage > 1 && currentPage--"
                :disabled="currentPage === 1"
                class="px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trước
              </button>
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

        <!-- No Results -->
        <div
          v-if="filteredAndSortedDevelopers.length === 0"
          class="text-center py-12"
        >
          <UserX class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-semibold text-gray-700 mb-2">
            Không tìm thấy developer
          </h3>
          <p class="text-gray-500 mb-4">
            Thử thay đổi tiêu chí tìm kiếm hoặc bộ lọc
          </p>
          <button
            @click="clearFilters"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Xóa bộ lọc
          </button>
        </div>
      </div>
    </div>

    <!-- New User Dialog -->
    <el-dialog
      v-model="showNewUserDialog"
      title="Đề cử Developer"
      width="500px"
      class="evergreen-dialog"
    >
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Tên Developer
          </label>
          <input
            type="text"
            v-model="newUser.name"
            placeholder="Nhập tên developer"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            v-model="newUser.username"
            placeholder="Nhập username"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <el-select
            v-model="newUser.tags"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="Chọn hoặc tạo tags"
            class="w-full"
          >
            <el-option
              v-for="tag in availableTags"
              :key="tag"
              :label="tag"
              :value="tag"
            />
          </el-select>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <el-button @click="showNewUserDialog = false">Hủy</el-button>
          <el-button type="primary" @click="submitNewUser">Gửi đề cử</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  AwardIcon,
  UsersIcon,
  StarIcon,
  UserPlusIcon,
  Search,
  Code,
  TrendingUp,
  Crown,
  UserX,
  X,
} from "lucide-vue-next";

// State
const showNewUserDialog = ref(false);
const searchQuery = ref("");
const filterTag = ref("");
const sortBy = ref("score");
const sortOrder = ref("desc");
const currentPage = ref(1);
const pageSize = ref(10);

// Transform existing developers data to match new structure
const developers = ref([
  {
    id: 1,
    username: "305955602",
    fullName: "Huy Đặng Quốc",
    active: true,
    score: "20000",
    level: null,
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocIPZmtqHKB3G1sXJIeblWjNN0m-QTPxD9AeNJgd31oAGjE6AA8=s96-c",
    bio: null,
    tags: ["Frontend", "React"],
    solutions: 45,
    achievements: 12,
    rankChange: 2,
    rank: 1,
    created_at: "2025-05-21T16:04:43.381Z",
    updated_at: "2025-05-25T18:17:32.854Z",
  },
  // Transform other developers similarly
  ...Array.from({ length: 9 }, (_, i) => ({
    id: i + 2,
    username: `developer${i + 2}`,
    fullName: `Developer ${i + 2}`,
    active: true,
    score: `${Math.floor(Math.random() * 15000) + 1000}`,
    level: null,
    avatar: `https://via.placeholder.com/96?text=Dev${i + 2}`,
    bio: `Passionate developer with expertise in modern technologies`,
    tags: ["Frontend", "Backend", "Full Stack"][Math.floor(Math.random() * 3)]
      ? ["Frontend", "React"]
      : ["Backend", "Node.js"],
    solutions: Math.floor(Math.random() * 50) + 5,
    achievements: Math.floor(Math.random() * 20) + 1,
    rankChange: Math.floor(Math.random() * 10) - 5,
    rank: i + 2,
    created_at: "2025-05-21T16:04:43.381Z",
    updated_at: "2025-05-25T18:17:32.854Z",
  })),
]);

const newUser = ref({
  name: "",
  username: "",
  tags: [],
});

const availableTags = [
  "Frontend",
  "Backend",
  "Full Stack",
  "React",
  "Vue",
  "Angular",
  "Node.js",
  "Python",
  "Java",
  "DevOps",
  "Mobile",
  "AI/ML",
  "Blockchain",
];

// Computed
const uniqueTags = computed(() => {
  const tags = new Set();
  developers.value.forEach((dev) => {
    if (dev.tags) {
      dev.tags.forEach((tag) => tags.add(tag));
    }
  });
  return Array.from(tags);
});

const hasActiveFilters = computed(() => {
  return searchQuery.value || filterTag.value;
});

const filteredAndSortedDevelopers = computed(() => {
  let filtered = [...developers.value];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (dev) =>
        dev.fullName.toLowerCase().includes(query) ||
        dev.username.toLowerCase().includes(query) ||
        (dev.tags && dev.tags.some((tag) => tag.toLowerCase().includes(query)))
    );
  }

  // Apply tag filter
  if (filterTag.value) {
    filtered = filtered.filter(
      (dev) => dev.tags && dev.tags.includes(filterTag.value)
    );
  }

  // Apply sorting
  filtered = [...filtered].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy.value) {
      case "score":
        aValue = parseInt(a.score || "0");
        bValue = parseInt(b.score || "0");
        break;
      case "solutions":
        aValue = a.solutions || 0;
        bValue = b.solutions || 0;
        break;
      case "achievements":
        aValue = a.achievements || 0;
        bValue = b.achievements || 0;
        break;
      case "rankChange":
        aValue = a.rankChange || 0;
        bValue = b.rankChange || 0;
        break;
      default:
        aValue = parseInt(a.score || "0");
        bValue = parseInt(b.score || "0");
    }

    if (sortOrder.value === "asc") {
      return aValue - bValue;
    }
    return bValue - aValue;
  });

  return filtered;
});

const topThreeDevelopers = computed(() => {
  return filteredAndSortedDevelopers.value.slice(0, 3);
});

const remainingDevelopers = computed(() => {
  return filteredAndSortedDevelopers.value.slice(3);
});

const totalPages = computed(() => {
  return Math.ceil(remainingDevelopers.value.length / pageSize.value);
});

const paginatedDevelopers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return remainingDevelopers.value.slice(start, end);
});

// Methods
const clearFilters = () => {
  searchQuery.value = "";
  filterTag.value = "";
  sortBy.value = "score";
  sortOrder.value = "desc";
  currentPage.value = 1;
};

const submitNewUser = () => {
  if (!newUser.value.name || !newUser.value.username) {
    ElMessage.warning("Vui lòng điền đầy đủ thông tin");
    return;
  }

  ElMessage.success("Đã gửi đề cử thành công!");
  showNewUserDialog.value = false;
  newUser.value = {
    name: "",
    username: "",
    tags: [],
  };
};

// SEO Meta
useSeoMeta({
  title: "Bảng xếp hạng Developer - ChoCode",
  description:
    "Khám phá những developer xuất sắc nhất trong cộng đồng ChoCode. Xem bảng xếp hạng, thành tích và đóng góp của các thành viên.",
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
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
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

/* Element Plus Select styling */
:deep(.el-select) {
  width: 100%;
}

:deep(.el-select .el-input__wrapper) {
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
}

:deep(.el-select .el-input__wrapper.is-focus) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

:deep(.el-tag) {
  background-color: #dbeafe;
  border-color: #93c5fd;
  color: #1d4ed8;
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
