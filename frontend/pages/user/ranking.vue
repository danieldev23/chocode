<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
  >
    <!-- Hero Section with Animated Background -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0">
        <div
          class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 mix-blend-overlay"
        ></div>
        <div
          class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"
        ></div>
        <div
          class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"
        ></div>
      </div>
      <div class="relative container mx-auto px-4 py-20">
        <div class="max-w-4xl mx-auto text-center">
          <h1
            class="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-gradient"
          >
            Code Masters
          </h1>
          <p class="text-xl md:text-2xl text-gray-300 mb-8">
            Discover the elite developers shaping our community's future
          </p>
          <div class="flex flex-wrap justify-center gap-4 mb-12">
            <span
              class="px-6 py-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center backdrop-blur-sm hover:bg-blue-500/20 transition-all duration-300"
            >
              <AwardIcon class="mr-2 h-5 w-5" /> Top Performers
            </span>
            <span
              class="px-6 py-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center backdrop-blur-sm hover:bg-purple-500/20 transition-all duration-300"
            >
              <UsersIcon class="mr-2 h-5 w-5" /> Community Leaders
            </span>
            <span
              class="px-6 py-3 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center backdrop-blur-sm hover:bg-pink-500/20 transition-all duration-300"
            >
              <StarIcon class="mr-2 h-5 w-5" /> Rising Stars
            </span>
          </div>
          <button
            @click="showNewUserDialog = true"
            class="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-white shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300"
          >
            <div
              class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
            <div class="relative flex items-center">
              <UserPlusIcon class="mr-2 h-5 w-5" /> Nominate a Developer
            </div>
          </button>
        </div>
      </div>
    </section>

    <!-- Advanced Search and Filters -->
    <section class="container mx-auto px-4 -mt-8 mb-8">
      <div
        class="bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-700/50"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Search -->
          <div class="relative">
            <input
              v-model="searchQuery"
              placeholder="Search developers..."
              class="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <SearchIcon
              class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            />
          </div>

          <!-- Tag Filter -->
          <div class="relative">
            <select
              v-model="filterTag"
              class="w-full px-4 py-2 rounded-xl bg-gray-900/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Tags</option>
              <option v-for="tag in uniqueTags" :key="tag" :value="tag">
                {{ tag }}
              </option>
            </select>
          </div>

          <!-- Sort By -->
          <div class="relative">
            <select
              v-model="sortBy"
              class="w-full px-4 py-2 rounded-xl bg-gray-900/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="score">Sort by Score</option>
              <option value="solutions">Sort by Solutions</option>
              <option value="achievements">Sort by Achievements</option>
              <option value="rankChange">Sort by Rank Change</option>
            </select>
          </div>

          <!-- Sort Order -->
          <div class="relative">
            <select
              v-model="sortOrder"
              class="w-full px-4 py-2 rounded-xl bg-gray-900/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="desc">Highest First</option>
              <option value="asc">Lowest First</option>
            </select>
          </div>
        </div>

        <!-- Active Filters -->
        <div v-if="hasActiveFilters" class="mt-4 flex flex-wrap gap-2">
          <div
            v-if="searchQuery"
            class="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm flex items-center"
          >
            Search: {{ searchQuery }}
            <button @click="searchQuery = ''" class="ml-2 hover:text-blue-300">
              <XIcon class="h-4 w-4" />
            </button>
          </div>
          <div
            v-if="filterTag"
            class="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm flex items-center"
          >
            Tag: {{ filterTag }}
            <button @click="filterTag = ''" class="ml-2 hover:text-purple-300">
              <XIcon class="h-4 w-4" />
            </button>
          </div>
          <button
            @click="clearFilters"
            class="px-3 py-1 rounded-full bg-gray-700/50 text-gray-300 text-sm hover:bg-gray-700/70 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
    </section>

    <!-- Developer List -->
    <section class="container mx-auto px-4 pb-20">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="developer in filteredAndSortedDevelopers"
          :key="developer.id"
          class="group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
        >
          <div class="flex items-center gap-4">
            <div class="relative">
              <img
                :src="developer.avatar || 'https://via.placeholder.com/64'"
                :alt="developer.fullName"
                class="w-16 h-16 rounded-full object-cover border-2 border-gray-700 group-hover:border-blue-500/50 transition-colors"
              />
              <div
                class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold"
              >
                {{ developer.rank }}
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-semibold text-white truncate">
                {{ developer.fullName }}
              </h3>
              <p class="text-sm text-gray-400">{{ developer.username }}</p>
              <div class="flex flex-wrap gap-2 mt-2">
                <span
                  v-for="tag in developer.tags"
                  :key="tag"
                  class="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-white">{{ developer.score }}</p>
              <p class="text-sm text-gray-400">points</p>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-700/50">
            <div class="flex justify-between items-center text-sm">
              <div class="flex items-center gap-2">
                <CodeIcon class="w-4 h-4 text-green-400" />
                <span class="text-gray-300"
                  >{{ developer.solutions }} solutions</span
                >
              </div>
              <div class="flex items-center gap-2">
                <StarIcon class="w-4 h-4 text-yellow-400" />
                <span class="text-gray-300"
                  >{{ developer.achievements }} achievements</span
                >
              </div>
              <div
                class="flex items-center gap-2"
                :class="{
                  'text-green-400': developer.rankChange > 0,
                  'text-red-400': developer.rankChange < 0,
                  'text-gray-400': developer.rankChange === 0,
                }"
              >
                <TrendingUpIcon class="w-4 h-4" />
                <span
                  >{{ developer.rankChange > 0 ? "+" : ""
                  }}{{ developer.rankChange }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div
        v-if="filteredAndSortedDevelopers.length === 0"
        class="text-center py-12"
      >
        <div class="text-gray-400 text-lg mb-4">No developers found</div>
        <button
          @click="clearFilters"
          class="px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </section>

    <!-- New User Dialog -->
    <el-dialog
      v-model="showNewUserDialog"
      title="Nominate a Developer"
      width="500px"
      class="ranking-dialog"
    >
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1"
            >Developer Name</label
          >
          <input
            type="text"
            v-model="newUser.name"
            class="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1"
            >Username</label
          >
          <input
            type="text"
            v-model="newUser.username"
            class="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1"
            >Tags</label
          >
          <el-select
            v-model="newUser.tags"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="Select or create tags"
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
        <div class="flex justify-end gap-3">
          <el-button @click="showNewUserDialog = false">Cancel</el-button>
          <el-button type="primary" @click="submitNewUser">Submit</el-button>
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
  SearchIcon,
  CodeIcon,
  TrendingUpIcon,
  CrownIcon,
  XIcon,
} from "lucide-vue-next";

// State
const showNewUserDialog = ref(false);
const searchQuery = ref("");
const filterTag = ref("");
const sortBy = ref("score");
const sortOrder = ref("desc");

// Mock data - Replace with actual API calls
const developers = ref([
  {
    id: 1,
    username: "305955602",
    fullName: "Huy Đặng Quốc",
    active: true,
    score: "20.000",
    level: null,
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocIPZmtqHKB3G1sXJIeblWjNN0m-QTPxD9AeNJgd31oAGjE6AA8=s96-c",
    bio: null,
    created_at: "2025-05-21T16:04:43.381Z",
    updated_at: "2025-05-25T18:17:32.854Z",
  },
  {
    id: 5,
    username: "441884169",
    fullName: "Đặng Quốc Huy",
    active: true,
    score: null,
    level: null,
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocJ2tsNly6pKGxhoXGZQXlO2OiA-JkPFVh8avFFMyFYgKCoTkA_a=s96-c",
    bio: "Là 1 thằng Coder thích code mọi thứ trên đời 🐧",
    created_at: "2025-05-24T06:16:44.530Z",
    updated_at: "2025-06-16T15:14:23.850Z",
  },
  {
    id: 6,
    username: "420314974056174",
    fullName: "Đặng Quốc Huy",
    active: true,
    score: null,
    level: null,
    avatar: null,
    bio: null,
    created_at: "2025-05-24T21:00:00.736Z",
    updated_at: "2025-05-24T21:00:00.736Z",
  },
  {
    id: 7,
    username: "382729337",
    fullName: "Đặng Quốc Huy",
    active: true,
    score: null,
    level: null,
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocL-ZcyFDa3dySGN3Cr-CLyGrONcIs12kT8Ue21WT7iJxVSZTRaV=s96-c",
    bio: null,
    created_at: "2025-05-25T17:47:16.937Z",
    updated_at: "2025-05-26T17:01:00.753Z",
  },
  {
    id: 8,
    username: "574038891",
    fullName: "Đặng Quốc Huy",
    active: true,
    score: null,
    level: null,
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocK8fgrE5ODLQkq_sYZfXz38gyIPRY39u8U18nTD15adiS_Qzem8=s96-c",
    bio: null,
    created_at: "2025-06-07T08:45:36.645Z",
    updated_at: "2025-06-07T08:45:36.645Z",
  },
  {
    id: 9,
    username: "517497901",
    fullName: "Huy Hacker",
    active: true,
    score: null,
    level: null,
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocIJObxTJqC60Byg3jxoa8wDgk-PhrgxK8600RbZfrXsZWrfT7M=s96-c",
    bio: null,
    created_at: "2025-06-07T10:31:42.951Z",
    updated_at: "2025-06-07T10:31:42.951Z",
  },
  {
    id: 10,
    username: "537985618",
    fullName: "Thu Hiền",
    active: true,
    score: null,
    level: null,
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocLwtcsyNh9wB5_MQTa70SDxFqGe-qhLQ73QJznjMyYIq3_nBQ=s96-c",
    bio: null,
    created_at: "2025-06-13T15:11:32.076Z",
    updated_at: "2025-06-13T15:11:32.076Z",
  },
  {
    id: 11,
    username: "978397161",
    fullName: "Thanh Sương",
    active: true,
    score: null,
    level: null,
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocJlKDX4TkwF6yym7on7WDdeMwTmpn2-l_-cgXvMbsD2X6Qrbg=s96-c",
    bio: null,
    created_at: "2025-06-13T15:16:03.775Z",
    updated_at: "2025-06-13T15:16:03.775Z",
  },
  {
    id: 12,
    username: "836528259",
    fullName: "Quyet Chien",
    active: true,
    score: null,
    level: null,
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocKJ0rOUogT9dSK6FYJzDJCQAj8ExlO8uF2eIhn_4DCuh_nYzA=s96-c",
    bio: null,
    created_at: "2025-06-13T15:20:26.940Z",
    updated_at: "2025-06-13T15:20:26.940Z",
  },
  {
    id: 13,
    username: "40255802",
    fullName: "ngoc Hieu",
    active: true,
    score: null,
    level: null,
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocKEmLQy1lkQXuBqR6r4shvirypS4D-7lZtR9FRGXM0Ywk9i9w=s96-c",
    bio: null,
    created_at: "2025-06-13T15:26:03.589Z",
    updated_at: "2025-06-15T07:35:15.239Z",
  },
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
  "Mobile",
  "DevOps",
  "AI/ML",
  "Blockchain",
];

// Computed
const hasActiveFilters = computed(() => {
  return searchQuery.value || filterTag.value;
});

const filteredAndSortedDevelopers = computed(() => {
  let filtered = developers.value;

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (dev) =>
        dev.fullName.toLowerCase().includes(query) ||
        dev.username.toLowerCase().includes(query) ||
        dev.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  // Apply tag filter
  if (filterTag.value) {
    filtered = filtered.filter((dev) => dev.tags.includes(filterTag.value));
  }

  // Apply sorting
  filtered = [...filtered].sort((a, b) => {
    const aValue = a[sortBy.value];
    const bValue = b[sortBy.value];

    if (sortOrder.value === "asc") {
      return aValue - bValue;
    }
    return bValue - aValue;
  });

  return filtered;
});

// Methods
const clearFilters = () => {
  searchQuery.value = "";
  filterTag.value = "";
  sortBy.value = "score";
  sortOrder.value = "desc";
};

const submitNewUser = () => {
  // Add API call here
  showNewUserDialog.value = false;
  newUser.value = {
    name: "",
    username: "",
    tags: [],
  };
};
</script>

<style scoped>
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

:deep(.ranking-dialog) {
  @apply bg-gray-900 border border-gray-700 rounded-2xl;
}

:deep(.ranking-dialog .el-dialog__header) {
  @apply border-b border-gray-700 p-4;
}

:deep(.ranking-dialog .el-dialog__title) {
  @apply text-white text-lg font-semibold;
}

:deep(.ranking-dialog .el-dialog__body) {
  @apply p-6;
}

:deep(.ranking-dialog .el-dialog__footer) {
  @apply border-t border-gray-700 p-4;
}

:deep(.ranking-dialog .el-select) {
  @apply w-full;
}

:deep(.ranking-dialog .el-select .el-input__wrapper) {
  @apply bg-gray-800 border-gray-700;
}

:deep(.ranking-dialog .el-select .el-input__inner) {
  @apply text-white;
}

:deep(.ranking-dialog .el-tag) {
  @apply bg-blue-500/10 border-blue-500/20 text-blue-400;
}
</style>
