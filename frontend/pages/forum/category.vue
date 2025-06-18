<template>
  <!-- Main Content -->
  <div class="flex-1">
    <!-- Hero Section -->
    <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
      <div class="flex flex-col lg:flex-row items-center justify-between">
        <div class="mb-6 lg:mb-0 lg:w-2/3">
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Thảo luận về {{ category[0].toUpperCase() + category.slice(1) }}
          </h1>
          <p class="text-gray-600 mb-6">
            ChoCode là nơi kết nối, giao lưu, chia sẻ kiến thức IT
          </p>
          <ForumAskQuestion />
        </div>
        <div class="lg:w-1/3">
          <img
            src="/assets/images/home/working.jpg"
            alt="Q&A Platform"
            class="w-full rounded-lg"
            loading="lazy"
          />
        </div>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="w-full sm:w-64">
          <select
            v-model="selectedClass"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="all">Tất cả cấp độ</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="filter in statusFilters"
            :key="filter.value"
            @click="selectedStatus = filter.value"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            :class="
              selectedStatus === filter.value
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            "
          >
            {{ filter.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="text-gray-600 mb-4 text-sm">
      1,023,426 câu hỏi trong chủ đề này
    </div>

    <!-- Questions List -->
    <div class="space-y-4">
      <article
        v-for="question in mockQuestions"
        :key="question.id"
        class="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow"
      >
        <!-- Question Header -->
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4"
        >
          <div class="flex items-center mb-3 sm:mb-0">
            <div class="relative mr-3">
              <img
                :src="question.avatar"
                :alt="question.author"
                class="w-10 h-10 rounded-full object-cover"
              />
              <div
                class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs text-white font-bold"
                :class="
                  question.level === 'Beginner'
                    ? 'bg-green-500'
                    : question.level === 'Intermediate'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                "
              >
                {{
                  question.level === "Beginner"
                    ? "B"
                    : question.level === "Intermediate"
                    ? "I"
                    : "A"
                }}
              </div>
            </div>

            <div>
              <h3 class="font-semibold text-gray-900">{{ question.author }}</h3>
              <div class="flex items-center text-sm text-gray-500">
                <Clock class="w-3 h-3 mr-1" />
                {{ question.timestamp }}
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <span
              class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-md"
            >
              {{ question.technology }}
            </span>
            <span
              class="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-md"
            >
              {{ question.level }}
            </span>

            <div class="flex items-center space-x-1">
              <button
                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Bookmark class="w-4 h-4" />
              </button>
              <button
                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Share class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Question Content -->
        <div class="mb-4">
          <h2
            class="text-lg font-semibold text-gray-900 mb-2 hover:text-primary cursor-pointer"
          >
            {{ question.title }}
          </h2>
          <p
            v-if="question.excerpt"
            class="text-gray-600 text-sm leading-relaxed"
          >
            {{ question.excerpt }}
          </p>
        </div>

        <!-- Question Actions -->
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200"
        >
          <div class="flex items-center space-x-4 mb-3 sm:mb-0">
            <button
              class="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
            >
              <ThumbsUp class="w-4 h-4" />
              <span class="text-sm font-medium">{{ question.likes }}</span>
            </button>

            <button
              class="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
            >
              <MessageSquare class="w-4 h-4" />
              <span class="text-sm font-medium"
                >{{ question.answers }} trả lời</span
              >
            </button>

            <div class="flex items-center space-x-2 text-gray-500">
              <Eye class="w-4 h-4" />
              <span class="text-sm">{{ question.views }} lượt xem</span>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <!-- Answer Preview -->
            <div
              v-if="question.latestAnswer"
              class="flex items-center space-x-2"
            >
              <img
                :src="question.latestAnswer.avatar"
                :alt="question.latestAnswer.author"
                class="w-6 h-6 rounded-full object-cover"
              />
              <span class="text-xs text-gray-500">
                Trả lời bởi {{ question.latestAnswer.author }}
              </span>
            </div>

            <!-- Best Answer Badge -->
            <div
              v-if="question.hasBestAnswer"
              class="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-md"
            >
              <CheckCircle class="w-3 h-3 mr-1" />
              Đã giải quyết
            </div>

            <button
              class="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium"
            >
              Trả lời
            </button>
          </div>
        </div>
      </article>
    </div>

    <!-- Load More -->
    <div class="mt-8 text-center">
      <button
        class="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
      >
        Tải thêm câu hỏi
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Clock,
  Bookmark,
  Share,
  ThumbsUp,
  MessageSquare,
  Eye,
  CheckCircle,
} from "lucide-vue-next";

const route = useRoute();
const category = route.params.category;
const selectedClass = ref("all");
const selectedStatus = ref("all");

const statusFilters = [
  { label: "Tất cả", value: "all" },
  { label: "Đã trả lời", value: "answered" },
  { label: "Chưa trả lời", value: "unanswered" },
  { label: "Đã giải quyết", value: "solved" },
];

// Mock data for demonstration
const mockQuestions = ref([
  {
    id: 1,
    title: "Cứu tuiiiiiiiii - Lỗi không thể import React component",
    excerpt:
      "Mình đang gặp lỗi khi import React component, ai có thể giúp mình khắc phục được không?",
    author: "Phạm Quốc Việt",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    timestamp: "vài giây trước",
    technology: "NodeJS",
    level: "Beginner",
    likes: 0,
    answers: 0,
    views: 15,
    hasBestAnswer: false,
    latestAnswer: null,
  },
  {
    id: 2,
    title: "Cho mình hỏi JWT là gì ạ?",
    excerpt:
      "Mình mới học về authentication và không hiểu JWT hoạt động như thế nào. Ai có thể giải thích chi tiết được không?",
    author: "Nguyễn Quang Kính",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    timestamp: "1 phút trước",
    technology: "NestJS",
    level: "Beginner",
    likes: 2,
    answers: 3,
    views: 48,
    hasBestAnswer: false,
    latestAnswer: {
      author: "Trần Văn A",
      avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    },
  },
  {
    id: 3,
    title: "Zustand là gì vậy mn?",
    excerpt:
      "Mình nghe nhiều người nhắc đến Zustand cho state management trong React. So với Redux thì nó có ưu điểm gì?",
    author: "Nguyễn Thanh Triều",
    avatar: "https://randomuser.me/api/portraits/men/18.jpg",
    timestamp: "5 phút trước",
    technology: "NextJS",
    level: "Intermediate",
    likes: 5,
    answers: 7,
    views: 124,
    hasBestAnswer: true,
    latestAnswer: {
      author: "Lê Thị B",
      avatar: "https://randomuser.me/api/portraits/women/25.jpg",
    },
  },
  {
    id: 4,
    title: "Cách tối ưu performance cho ứng dụng React lớn",
    excerpt:
      "Ứng dụng React của mình đang chạy chậm khi có nhiều component. Các bạn có kinh nghiệm tối ưu không?",
    author: "Mỹ Giang",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    timestamp: "10 phút trước",
    technology: "React",
    level: "Advanced",
    likes: 12,
    answers: 5,
    views: 256,
    hasBestAnswer: true,
    latestAnswer: {
      author: "Hoàng Văn C",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    },
  },
]);

// SEO Meta
useSeoMeta({
  title: `Thảo luận về ${category} - ChoCode`,
  description: `Tham gia thảo luận và hỏi đáp về ${category} cùng cộng đồng developers Việt Nam`,
});
</script>

<style scoped>
/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform,
    box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Focus styles */
select:focus,
button:focus-visible {
  outline: none;
}

/* Hover effects */
article:hover {
  transform: translateY(-1px);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .space-y-4 > * + * {
    margin-top: 1rem;
  }
}
</style>
