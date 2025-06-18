<template>
  <div class="min-h-screen bg-gray-25 pt-20 pb-8">
    <div class="mx-[1rem] md:mx-16 lg:mx-32 xl:mx-[12.5rem]">
      <!-- Hero Section -->
      <div
        class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-8"
      >
        <div
          class="relative bg-gradient-to-r from-primary to-blue-800 px-6 py-12 sm:px-12 sm:py-16"
        >
          <div class="absolute inset-0 bg-blue-900 opacity-10"></div>
          <div class="relative text-center text-white">
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Code Market Hub
            </h1>
            <p class="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Khám phá các dự án source code chất lượng cao, website và đồ án
              học tập
            </p>

            <div class="max-w-2xl mx-auto">
              <div class="relative">
                <Search
                  class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300"
                />
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Tìm kiếm dự án, source code, công nghệ..."
                  class="w-full pl-12 pr-4 py-4 bg-white bg-opacity-20 border border-blue-300 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div
        class="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <select
            v-model="categoryFilter"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tất cả loại dự án</option>
            <option value="website">Website Templates</option>
            <option value="academic">Đồ án học tập</option>
            <option value="scripts">Scripts & Tools</option>
            <option value="mobile">Mobile Apps</option>
            <option value="backend">APIs & Backend</option>
          </select>

          <select
            v-model="techFilter"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tất cả công nghệ</option>
            <option value="php">PHP</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="react">React</option>
            <option value="vue">Vue.js</option>
          </select>

          <select
            v-model="priceFilter"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tất cả mức giá</option>
            <option value="under_500">Dưới 500k</option>
            <option value="500_1m">500k - 1M</option>
            <option value="1m_2m">1M - 2M</option>
            <option value="over_2m">Trên 2M</option>
          </select>

          <select
            v-model="sortBy"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="newest">Mới nhất</option>
            <option value="popular">Phổ biến nhất</option>
            <option value="price_asc">Giá: Thấp đến Cao</option>
            <option value="price_desc">Giá: Cao đến Thấp</option>
          </select>
        </div>
      </div>

      <!-- Stats Bar -->
      <div class="flex items-center justify-between mb-6">
        <p class="text-gray-600">
          Tìm thấy
          <span class="font-semibold text-gray-900">{{
            filteredProjects.length
          }}</span>
          dự án
        </p>
        <div class="flex items-center space-x-2">
          <button
            @click="viewMode = 'grid'"
            class="p-2 rounded-lg transition-colors"
            :class="
              viewMode === 'grid'
                ? 'bg-blue-100 text-primary'
                : 'text-gray-400 hover:text-gray-600'
            "
          >
            <Grid3x3 class="w-5 h-5" />
          </button>
          <button
            @click="viewMode = 'list'"
            class="p-2 rounded-lg transition-colors"
            :class="
              viewMode === 'list'
                ? 'bg-blue-100 text-primary'
                : 'text-gray-400 hover:text-gray-600'
            "
          >
            <List class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Project Grid/List -->
      <div
        v-if="viewMode === 'grid'"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        >
          <!-- Project Preview -->
          <div class="relative h-48">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            >
              <div class="absolute bottom-3 left-3 right-3">
                <div class="flex flex-wrap gap-1 mb-2">
                  <span
                    v-for="tech in project.technologies"
                    :key="tech"
                    class="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Hot Badge -->
            <div v-if="project.isHot" class="absolute top-3 right-3">
              <span
                class="inline-flex items-center px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full"
              >
                <Flame class="w-3 h-3 mr-1" />
                Hot
              </span>
            </div>
          </div>

          <!-- Project Content -->
          <div class="p-6">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <h3
                  class="text-lg font-semibold text-gray-900 line-clamp-2 mb-1"
                >
                  {{ project.title }}
                </h3>
                <p class="text-sm text-gray-600">{{ project.type }}</p>
              </div>
              <div class="text-right ml-3">
                <span class="text-xl font-bold text-primary">
                  {{ formatPrice(project.price) }}
                </span>
              </div>
            </div>

            <p class="text-gray-600 text-sm mb-4 line-clamp-2">
              {{ project.description }}
            </p>

            <!-- Project Stats -->
            <div
              class="flex items-center justify-between text-sm text-gray-500 mb-4"
            >
              <div class="flex items-center space-x-4">
                <div class="flex items-center">
                  <Download class="w-4 h-4 mr-1" />
                  <span>{{ project.downloads }}+</span>
                </div>
                <div class="flex items-center">
                  <Star class="w-4 h-4 mr-1 text-yellow-400" />
                  <span>{{ project.rating }}</span>
                  <span class="ml-1">({{ project.reviews }})</span>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-2">
              <button
                @click="viewProject(project)"
                class="flex-1 bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Xem chi tiết
              </button>
              <button
                @click="previewDemo(project)"
                class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ExternalLink class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- List View -->
      <div v-else class="space-y-4 mb-8">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6"
        >
          <div class="flex flex-col sm:flex-row gap-6">
            <!-- Project Image -->
            <div
              class="relative w-full sm:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0"
            >
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover"
              />
              <div v-if="project.isHot" class="absolute top-2 right-2">
                <span
                  class="inline-flex items-center px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full"
                >
                  <Flame class="w-3 h-3 mr-1" />
                  Hot
                </span>
              </div>
            </div>

            <!-- Project Info -->
            <div class="flex-1">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-1">
                    {{ project.title }}
                  </h3>
                  <p class="text-gray-600">{{ project.type }}</p>
                </div>
                <div class="text-right">
                  <span class="text-2xl font-bold text-primary">
                    {{ formatPrice(project.price) }}
                  </span>
                </div>
              </div>

              <p class="text-gray-600 mb-4">{{ project.description }}</p>

              <!-- Technologies -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Stats and Actions -->
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <div class="flex items-center">
                    <Download class="w-4 h-4 mr-1" />
                    <span>{{ project.downloads }}+ downloads</span>
                  </div>
                  <div class="flex items-center">
                    <Star class="w-4 h-4 mr-1 text-yellow-400" />
                    <span
                      >{{ project.rating }} ({{
                        project.reviews
                      }}
                      reviews)</span
                    >
                  </div>
                </div>

                <div class="flex gap-2">
                  <button
                    @click="previewDemo(project)"
                    class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <ExternalLink class="w-4 h-4 mr-2" />
                    Demo
                  </button>
                  <button
                    @click="viewProject(project)"
                    class="px-6 py-2 bg-primary hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div class="text-center">
        <button
          @click="loadMore"
          class="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Tải thêm dự án
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  Search,
  Download,
  Star,
  ExternalLink,
  Flame,
  Grid3x3,
  List,
} from "lucide-vue-next";

const searchQuery = ref("");
const categoryFilter = ref("");
const techFilter = ref("");
const priceFilter = ref("");
const sortBy = ref("newest");
const viewMode = ref("grid");

const projects = ref([
  {
    id: 1,
    title: "E-commerce Website with Admin Dashboard",
    type: "Website Template",
    price: 1500000,
    technologies: ["PHP", "MySQL", "Bootstrap"],
    downloads: 234,
    rating: 4.5,
    reviews: 48,
    description:
      "Complete e-commerce solution with inventory management, order processing, and customer management.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    isHot: true,
  },
  {
    id: 2,
    title: "Student Management System",
    type: "Academic Project",
    price: 850000,
    technologies: ["Python", "Django", "PostgreSQL"],
    downloads: 156,
    rating: 4.7,
    reviews: 32,
    description:
      "Comprehensive student management system with attendance, grades, and course management.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    isHot: false,
  },
  {
    id: 3,
    title: "Real Estate Portal",
    type: "Website Template",
    price: 2000000,
    technologies: ["Laravel", "Vue.js", "MySQL"],
    downloads: 189,
    rating: 4.8,
    reviews: 56,
    description:
      "Feature-rich real estate website with property listing, search, and agent management.",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d",
    isHot: true,
  },
  {
    id: 4,
    title: "Hospital Management System",
    type: "Academic Project",
    price: 1800000,
    technologies: ["Java", "Spring Boot", "React"],
    downloads: 145,
    rating: 4.6,
    reviews: 38,
    description:
      "Complete HMS with patient records, appointment scheduling, and billing system.",
    image: "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2",
    isHot: false,
  },
  {
    id: 5,
    title: "Learning Management System",
    type: "Website Template",
    price: 1200000,
    technologies: ["Node.js", "React", "MongoDB"],
    downloads: 278,
    rating: 4.4,
    reviews: 62,
    description:
      "Modern LMS with course creation, student progress tracking, and assessment tools.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    isHot: true,
  },
  {
    id: 6,
    title: "Inventory Management System",
    type: "Scripts & Tools",
    price: 950000,
    technologies: ["PHP", "CodeIgniter", "MySQL"],
    downloads: 198,
    rating: 4.3,
    reviews: 45,
    description:
      "Complete inventory system with barcode scanning, stock alerts, and reporting.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    isHot: false,
  },
]);

const filteredProjects = computed(() => {
  let result = [...projects.value];

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(query))
    );
  }

  if (categoryFilter.value) {
    result = result.filter((project) =>
      project.type.toLowerCase().includes(categoryFilter.value)
    );
  }

  if (techFilter.value) {
    result = result.filter((project) =>
      project.technologies.some(
        (tech) => tech.toLowerCase() === techFilter.value
      )
    );
  }

  if (priceFilter.value) {
    switch (priceFilter.value) {
      case "under_500":
        result = result.filter((project) => project.price < 500000);
        break;
      case "500_1m":
        result = result.filter(
          (project) => project.price >= 500000 && project.price < 1000000
        );
        break;
      case "1m_2m":
        result = result.filter(
          (project) => project.price >= 1000000 && project.price < 2000000
        );
        break;
      case "over_2m":
        result = result.filter((project) => project.price >= 2000000);
        break;
    }
  }

  switch (sortBy.value) {
    case "popular":
      result.sort((a, b) => b.downloads - a.downloads);
      break;
    case "price_asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      result.sort((a, b) => b.price - a.price);
      break;
    default:
      result.sort((a, b) => b.id - a.id);
  }

  return result;
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const viewProject = (project) => {
  console.log("Viewing project:", project);
};

const previewDemo = (project) => {
  console.log("Opening demo for:", project);
};

const loadMore = () => {
  console.log("Loading more projects...");
};
</script>

<style scoped>
.search-dark .el-input__wrapper {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: none !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.search-dark .el-input__wrapper:hover {
  border-color: rgba(255, 255, 255, 0.3);
}

.search-dark .el-input__inner {
  color: white;
}

.search-dark .el-input__inner::placeholder {
  color: rgba(255, 255, 255, 0.7);
}
</style>
