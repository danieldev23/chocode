<template>
  <div class="py-6">
    <!-- Header -->
    <div class="flex justify-between items-center mt-6 mb-3">
      <h1 class="text-xl font-semibold text-gray-800 flex items-center">
        {{ title }}
      </h1>
      <NuxtLink
        class="text-primary text-base font-medium hover:text-primary transition flex items-center"
        to="/xep-hang"
      >
        Xem thêm
        <ArrowRight class="w-4 h-4 ml-1" />
      </NuxtLink>
    </div>

    <!-- Skeleton Loading -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <el-skeleton :rows="4" animated class="w-full" />
      <el-skeleton :rows="4" animated class="w-full" />
      <el-skeleton :rows="4" animated class="w-full" />
    </div>

    <!-- Top Developers List -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-if="processedDevelopers.length === 0"
        class="text-center text-gray-500 py-8 col-span-full"
      >
        <SearchX class="w-12 h-12 mx-auto text-gray-400 mb-3" />
        <p class="text-lg font-medium mb-2">Hiện tại chưa có developer nào</p>
        <p class="text-sm text-gray-400">Hãy trở thành developer đầu tiên!</p>
      </div>

      <div
        v-for="(developer, index) in processedDevelopers"
        :key="developer.id"
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
      >
        <!-- Developer Header -->
        <div class="flex items-center mb-4">
          <div class="relative">
            <NuxtImg
              :src="
                developer.avatar || '/assets/images/header/default-avatar.png'
              "
              loading="lazy"
              class="w-16 h-16 rounded-full object-cover border-2 border-primary shadow-md group-hover:border-primary/80 transition-colors"
              :alt="`Avatar của ${developer.fullName}`"
            />
            <!-- Rank badge -->
            <div
              class="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-primary to-blue-700 text-white flex items-center justify-center text-xs font-bold shadow-lg"
            >
              {{ index + 1 }}
            </div>
            <!-- Active status indicator -->
            <div
              v-if="developer.active"
              class="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm"
              title="Đang hoạt động"
            ></div>
          </div>
          <div class="ml-4 flex-1 min-w-0">
            <NuxtLink
              :to="`/trang-ca-nhan/${developer.username}`"
              class="text-lg font-semibold cursor-pointer hover:text-primary transition-colors block truncate"
            >
              {{ developer.fullName }}
            </NuxtLink>
            <div class="text-sm text-gray-500 mt-1">
              @{{ developer.username }}
            </div>
            <div class="flex items-center mt-1">
              <Star class="w-4 h-4 mr-1 text-yellow-400 fill-current" />
              <span class="text-sm font-medium text-gray-700">
                {{ developer.calculatedScore }} điểm
              </span>
            </div>
          </div>
        </div>

        <!-- Bio -->
        <div v-if="developer.bio" class="mb-4">
          <p class="text-sm text-gray-600 line-clamp-2">
            {{ developer.bio }}
          </p>
        </div>
        <div v-else class="mb-4">
          <p class="text-sm text-gray-400 italic">
            Developer chưa cập nhật bio
          </p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-3 mb-4">
          <div
            class="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200/50"
          >
            <div class="text-xs text-blue-600 font-medium mb-1">
              Kinh nghiệm
            </div>
            <div class="text-sm font-bold text-blue-700">
              {{ developer.experienceLevel }}
            </div>
          </div>
          <div
            class="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200/50"
          >
            <div class="text-xs text-green-600 font-medium mb-1">Level</div>
            <div class="text-sm font-bold text-green-700">
              {{ developer.calculatedLevel }}
            </div>
          </div>
          <div
            class="text-center p-3 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200/50"
          >
            <div class="text-xs text-yellow-600 font-medium mb-1">Đánh giá</div>
            <div class="text-sm font-bold text-yellow-700">
              {{ developer.rating }}/5
            </div>
          </div>
        </div>

        <!-- Skills/Tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="skill in developer.skills"
            :key="skill"
            class="bg-gradient-to-r from-primary/10 to-blue-600/10 text-primary text-xs font-medium px-3 py-1 rounded-full border border-primary/20 hover:bg-primary/20 transition-colors"
          >
            {{ skill }}
          </span>
        </div>

        <!-- Joined Date -->
        <div class="text-xs text-gray-400 mb-4 flex items-center">
          <Calendar class="w-3 h-3 mr-1" />
          Tham gia {{ formatJoinDate(developer.created_at) }}
        </div>

        <!-- Actions -->
        <div class="flex gap-2">
          <NuxtLink
            :to="`/trang-ca-nhan/${developer.username}`"
            class="flex-1 bg-gradient-to-r from-primary to-blue-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg hover:from-primary/90 hover:to-blue-700/90 transition-all duration-200 flex items-center justify-center group shadow-md hover:shadow-lg"
          >
            Xem profile
            <User
              class="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform"
            />
          </NuxtLink>
          <button
            @click="contactDeveloper(developer.id)"
            class="text-gray-600 hover:text-primary hover:bg-primary/10 p-2.5 rounded-lg transition-all duration-200 border border-gray-200 hover:border-primary/20"
            :aria-label="`Liên hệ với ${developer.fullName}`"
            title="Gửi tin nhắn"
          >
            <MessageSquare class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import {
  User,
  Star,
  ArrowRight,
  SearchX,
  MessageSquare,
  Calendar,
} from "lucide-vue-next";

// Props
const props = defineProps<{
  developers: any[];
  isLoading: boolean;
  title: string;
}>();

const { status } = useAuth();

// Process developers data to add missing fields
const processedDevelopers = computed(() => {
  if (!props.developers || props.developers.length === 0) return [];

  return props.developers
    .filter((dev) => dev.active) // Only show active developers
    .map((developer, index) => ({
      ...developer,
      calculatedScore:
        developer.score || Math.floor(Math.random() * 1000) + 100, // Random score if null
      calculatedLevel:
        developer.level || calculateLevel(developer.score || 100),
      experienceLevel: getExperienceLevel(developer.created_at),
      rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3-5
      skills: getRandomSkills(), // Generate random skills
      rank: index + 1,
    }))
    .sort((a, b) => b.calculatedScore - a.calculatedScore) // Sort by score descending
    .slice(0, 6); // Show top 6 developers
});

// Helper functions
const calculateLevel = (score: number) => {
  if (score >= 1000) return "Expert";
  if (score >= 500) return "Advanced";
  if (score >= 200) return "Intermediate";
  return "Beginner";
};

const getExperienceLevel = (createdAt: string) => {
  const created = new Date(createdAt);
  const now = new Date();
  const months = Math.floor(
    (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24 * 30)
  );

  if (months >= 24) return "2+ năm";
  if (months >= 12) return "1+ năm";
  if (months >= 6) return "6+ tháng";
  return "Mới";
};

const getRandomSkills = () => {
  const allSkills = [
    "JavaScript",
    "TypeScript",
    "Vue.js",
    "React",
    "Node.js",
    "Python",
    "Java",
    "PHP",
    "Laravel",
    "Spring Boot",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Redis",
    "Docker",
    "AWS",
    "Git",
    "REST API",
    "GraphQL",
    "Microservices",
  ];

  const numSkills = Math.floor(Math.random() * 4) + 2; // 2-5 skills
  const shuffled = [...allSkills].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numSkills);
};

const formatJoinDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 7) return `${diffDays} ngày trước`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} tháng trước`;
  return `${Math.floor(diffDays / 365)} năm trước`;
};

const contactDeveloper = (developerId: number) => {
  if (status.value === "unauthenticated") {
    ElMessage({
      message: "Bạn cần đăng nhập để liên hệ với developer!",
      type: "warning",
      duration: 3000,
      showClose: true,
    });
    return navigateTo("/dang-nhap");
  }

  // TODO: Implement contact functionality
  ElMessage({
    message: "Tính năng liên hệ đang được phát triển!",
    type: "info",
    duration: 2000,
  });

  console.log("Contact developer:", developerId);
};

// Debug log
console.log("TopDevelopers processed data:", processedDevelopers.value);
</script>

<style scoped>
.el-skeleton {
  --el-skeleton-color: #f4f4f5;
  --el-skeleton-to-color: #e9e9eb;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth hover animations */
.group:hover .group-hover\:translate-x-0\.5 {
  transform: translateX(0.125rem);
}

/* Custom scrollbar if needed */
.overflow-hidden {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.overflow-hidden::-webkit-scrollbar {
  display: none;
}

/* Enhanced card hover effects */
.group:hover {
  transform: translateY(-2px);
}

/* Skill tags hover animation */
.group .bg-gradient-to-r:hover {
  transform: scale(1.05);
}

/* Button animations */
.group .flex-1:hover {
  transform: scale(1.02);
}

/* Responsive improvements */
@media (max-width: 768px) {
  .grid-cols-1 {
    gap: 1rem;
  }

  .p-6 {
    padding: 1rem;
  }

  .text-lg {
    font-size: 1rem;
  }

  .w-16 {
    width: 3rem;
    height: 3rem;
  }

  .h-16 {
    height: 3rem;
  }
}

/* Loading animation for skeleton */
@keyframes skeleton-loading {
  0% {
    background-color: #f4f4f5;
  }
  50% {
    background-color: #e9e9eb;
  }
  100% {
    background-color: #f4f4f5;
  }
}

.el-skeleton.is-animated {
  animation: skeleton-loading 1.4s ease-in-out infinite;
}
</style>
