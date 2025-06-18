<template>
  <div class="min-h-screen bg-gray-25 pt-2 pb-8">
    <div class="">
      <!-- Header Section -->
      <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
        <div class="flex flex-col lg:flex-row items-center justify-between">
          <div class="mb-6 lg:mb-0 lg:w-2/3">
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Việc làm IT xịn nhất!
            </h1>
            <p class="text-gray-600 mb-6">
              Khám phá hàng nghìn cơ hội việc làm IT hấp dẫn từ các công ty hàng đầu
            </p>
            
            <!-- Search and Filter Bar -->
            <div class="flex flex-col sm:flex-row gap-3">
              <div class="flex-1 relative">
                <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Tìm kiếm công việc, công ty..."
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button class="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center">
                <Filter class="w-4 h-4 mr-2" />
                Bộ lọc
              </button>
            </div>
          </div>

          <div class="lg:w-1/3">
            <img
              src="/assets/images/home/working.jpg"
              alt="IT Jobs"
              class="w-full rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <!-- Filter Section -->
      <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <select
            v-model="filters.location"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tất cả địa điểm</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
          </select>

          <select
            v-model="filters.jobCategory"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tất cả danh mục</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="QA/Testing">QA/Testing</option>
            <option value="DevOps">DevOps</option>
          </select>

          <select
            v-model="filters.jobType"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tất cả loại hình</option>
            <option value="FT">Full Time</option>
            <option value="PT">Part Time</option>
            <option value="CON">Contract</option>
          </select>

          <select
            v-model="sortBy"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="newest">Mới nhất</option>
            <option value="highestSalary">Lương cao nhất</option>
            <option value="companyName">Tên công ty</option>
          </select>
        </div>
      </div>

      <!-- Hot Jobs Section -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-900 flex items-center mb-4 sm:mb-0">
            <Flame class="w-5 h-5 text-red-500 mr-2" />
            {{ jobs.length }} việc làm HOT nhất!
          </h2>
          
          <div class="flex items-center">
            <label class="flex items-center cursor-pointer">
              <input
                v-model="showHotJobsOnly"
                type="checkbox"
                class="sr-only"
              />
              <div class="relative">
                <div class="block w-14 h-8 bg-gray-200 rounded-full transition-colors" :class="{ 'bg-primary': showHotJobsOnly }"></div>
                <div class="absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform" :class="{ 'transform translate-x-6': showHotJobsOnly }"></div>
              </div>
              <span class="ml-3 text-sm font-medium text-gray-700">Chỉ Hot Jobs</span>
            </label>
          </div>
        </div>

        <!-- Hot Jobs Grid -->
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="n in 6"
            :key="n"
            class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden animate-pulse"
          >
            <div class="bg-gray-200 h-20"></div>
            <div class="p-6">
              <div class="space-y-3">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                <div class="h-4 bg-gray-200 rounded w-2/3"></div>
                <div class="h-8 bg-gray-200 rounded w-full mt-4"></div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="filteredJobs.length === 0" class="text-center py-12">
          <FileSearch class="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy việc làm</h3>
          <p class="text-gray-500">Thử thay đổi tiêu chí tìm kiếm hoặc bộ lọc</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="job in filteredJobs"
            :key="job.jobOrderID"
            class="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <!-- Job Card Header -->
            <div class="relative bg-gradient-to-r from-blue-50 to-blue-100 p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <span v-if="job.isHot === '1'" class="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                    <Flame class="w-3 h-3 mr-1" />
                    Hot
                  </span>
                  <span class="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    <Clock class="w-3 h-3 mr-1" />
                    {{ job.daysOld }} ngày trước
                  </span>
                </div>
                
                <div class="w-12 h-12 bg-white rounded-lg border border-gray-200 p-2 flex items-center justify-center">
                  <img
                    :src="job.companyLogo || defaultLogo"
                    :alt="job.companyName"
                    class="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            <!-- Job Card Body -->
            <div class="p-6">
              <div class="mb-4">
                <NuxtLink
                  :to="`/chi-tiet-job/${job.jobOrderID}-${job.title
                    .replace(/\s+/g, '-')
                    .replace(/\+/g, '')
                    .replace(/-+/g, '-')}`"
                  class="text-lg font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2 mb-2"
                >
                  {{ job.title }}
                </NuxtLink>
                
                <div class="flex items-center text-gray-600 mb-2">
                  <Building2 class="w-4 h-4 mr-2 flex-shrink-0" />
                  <span class="truncate">{{ job.companyName }}</span>
                </div>
              </div>

              <div class="space-y-2 mb-4">
                <div class="flex items-center text-gray-500 text-sm">
                  <MapPin class="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{{ job.city }}, {{ job.state }}</span>
                </div>
                
                <div class="flex items-center text-gray-500 text-sm">
                  <Briefcase class="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{{ getJobType(job.type) }}</span>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 mb-4">
                <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-md">
                  {{ job.jobCategory }}
                </span>
                <span v-if="job.salary" class="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-md">
                  {{ job.salary }}
                </span>
              </div>

              <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                <span class="text-xs text-gray-500">
                  {{ formatDate(job.dateCreated) }}
                </span>
                <NuxtLink
                  :to="`/chi-tiet-job/${job.jobOrderID}-${job.title
                    .replace(/\s+/g, '-')
                    .replace(/\+/g, '')
                    .replace(/-+/g, '-')}`"
                  class="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                >
                  <ArrowRight class="w-4 h-4 mr-1" />
                  Ứng tuyển
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination for Hot Jobs -->
        <div class="mt-8 flex justify-center">
          <nav class="flex items-center space-x-2">
            <button
              @click="currentPage > 1 && (currentPage--)"
              :disabled="currentPage === 1"
              class="px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Trước
            </button>
            
            <span class="px-4 py-2 text-sm text-gray-700">
              Trang {{ currentPage }} / {{ Math.ceil(totalJobs / pageSize) }}
            </span>
            
            <button
              @click="currentPage < Math.ceil(totalJobs / pageSize) && (currentPage++)"
              :disabled="currentPage === Math.ceil(totalJobs / pageSize)"
              class="px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sau
            </button>
          </nav>
        </div>
      </div>

      <!-- All Jobs Section -->
      <div>
        <h2 class="text-xl font-bold text-gray-900 flex items-center mb-6">
          <Briefcase class="w-5 h-5 text-blue-500 mr-2" />
          Tất cả việc làm
        </h2>

        <!-- All Jobs Grid -->
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="n in 12"
            :key="n"
            class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden animate-pulse"
          >
            <div class="bg-gray-200 h-20"></div>
            <div class="p-6">
              <div class="space-y-3">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                <div class="h-4 bg-gray-200 rounded w-2/3"></div>
                <div class="h-8 bg-gray-200 rounded w-full mt-4"></div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="filteredFullJobs.length === 0" class="text-center py-12">
          <FileSearch class="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy việc làm</h3>
          <p class="text-gray-500">Thử thay đổi tiêu chí tìm kiếm hoặc bộ lọc</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="job in filteredFullJobs"
            :key="job.jobOrderID"
            class="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <!-- Job Card Header -->
            <div class="relative bg-gradient-to-r from-gray-50 to-gray-100 p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <span v-if="job.isHot === '1'" class="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                    <Flame class="w-3 h-3 mr-1" />
                    Hot
                  </span>
                  <span class="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    <Clock class="w-3 h-3 mr-1" />
                    {{ job.daysOld }} ngày trước
                  </span>
                </div>
                
                <div class="w-12 h-12 bg-white rounded-lg border border-gray-200 p-2 flex items-center justify-center">
                  <img
                    :src="job.companyLogo || defaultLogo"
                    :alt="job.companyName"
                    class="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            <!-- Job Card Body -->
            <div class="p-6">
              <div class="mb-4">
                <NuxtLink
                  :to="`/chi-tiet-job/${job.jobOrderID}-${job.title
                    .replace(/\s+/g, '-')
                    .replace(/\+/g, '')
                    .replace(/-+/g, '-')}`"
                  class="text-lg font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2 mb-2"
                >
                  {{ job.title }}
                </NuxtLink>
                
                <div class="flex items-center text-gray-600 mb-2">
                  <Building2 class="w-4 h-4 mr-2 flex-shrink-0" />
                  <span class="truncate">{{ job.companyName }}</span>
                </div>
              </div>

              <div class="space-y-2 mb-4">
                <div class="flex items-center text-gray-500 text-sm">
                  <MapPin class="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{{ job.city }}, {{ job.state }}</span>
                </div>
                
                <div class="flex items-center text-gray-500 text-sm">
                  <Briefcase class="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{{ getJobType(job.type) }}</span>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 mb-4">
                <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-md">
                  {{ job.jobCategory }}
                </span>
                <span v-if="job.salary" class="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-md">
                  {{ job.salary }}
                </span>
              </div>

              <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                <span class="text-xs text-gray-500">
                  {{ formatDate(job.dateCreated) }}
                </span>
                <NuxtLink
                  :to="`/chi-tiet-job/${job.jobOrderID}-${job.title
                    .replace(/\s+/g, '-')
                    .replace(/\+/g, '')
                    .replace(/-+/g, '-')}`"
                  class="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                >
                  <ArrowRight class="w-4 h-4 mr-1" />
                  Ứng tuyển
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination for All Jobs -->
        <div class="mt-8 flex justify-center">
          <nav class="flex items-center space-x-2">
            <button
              @click="fullJobCurrentPage > 1 && (fullJobCurrentPage--)"
              :disabled="fullJobCurrentPage === 1"
              class="px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Trước
            </button>
            
            <span class="px-4 py-2 text-sm text-gray-700">
              Trang {{ fullJobCurrentPage }} / {{ Math.ceil(filteredSoftwareJobs.length / 9) }}
            </span>
            
            <button
              @click="fullJobCurrentPage < Math.ceil(filteredSoftwareJobs.length / 9) && (fullJobCurrentPage++)"
              :disabled="fullJobCurrentPage === Math.ceil(filteredSoftwareJobs.length / 9)"
              class="px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sau
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  Search,
  Filter,
  Building2,
  MapPin,
  Briefcase,
  ArrowRight,
  Flame,
  Clock,
  FileSearch,
} from "lucide-vue-next";
import defaultLogo from "@/assets/images/header/logo.png";

// SEO Meta
useSeoMeta({
  title: "Việc làm IT hot nhất, chất nhất, xịn nhất được tổng hợp từ các nền tảng top CV, topdev!",
  description: "Khám phá hàng nghìn cơ hội việc làm IT từ các công ty hàng đầu. Tìm kiếm và ứng tuyển ngay hôm nay!",
});

// Reactive data
const searchQuery = ref("");
const filters = ref({
  location: "",
  jobCategory: "",
  jobType: "",
});
const sortBy = ref("newest");
const showHotJobsOnly = ref(false);
const currentPage = ref(1);
const fullJobCurrentPage = ref(1);
const pageSize = ref(9);
const totalJobs = ref(0);
const loading = ref(true);
const jobs = ref([]);
const fullJob = ref([]);

// Job type mapping
const getJobType = (type) => {
  const types = {
    FT: "Full Time",
    PT: "Part Time",
    CON: "Contract",
    FTR: "Full Time Remote",
    FTO: "Full Time On-site",
    PTR: "Part Time Remote",
    PTO: "Part Time On-site",
  };
  return types[type] || type;
};

// Format date
const formatDate = (dateString) => {
  if (!dateString) return "";
  const [month, day, year] = dateString.split("-");
  return `${month}/${day}/20${year}`;
};

// Computed properties
const filteredJobs = computed(() => {
  let filtered = [...jobs.value];

  // Apply search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.companyName.toLowerCase().includes(query) ||
        job.jobCategory.toLowerCase().includes(query)
    );
  }

  // Apply filters
  if (filters.value.location) {
    filtered = filtered.filter((job) => job.city === filters.value.location);
  }

  if (filters.value.jobCategory) {
    filtered = filtered.filter((job) => job.jobCategory === filters.value.jobCategory);
  }

  if (filters.value.jobType) {
    filtered = filtered.filter((job) => job.type === filters.value.jobType);
  }

  // Apply hot jobs filter
  if (showHotJobsOnly.value) {
    filtered = filtered.filter((job) => job.isHot === "1");
  }

  // Apply sorting
  if (sortBy.value === "newest") {
    filtered.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
  } else if (sortBy.value === "highestSalary") {
    filtered.sort((a, b) => {
      const salaryA = a.salary ? parseInt(a.salary.match(/\d+/)?.[0] || 0) : 0;
      const salaryB = b.salary ? parseInt(b.salary.match(/\d+/)?.[0] || 0) : 0;
      return salaryB - salaryA;
    });
  } else if (sortBy.value === "companyName") {
    filtered.sort((a, b) => a.companyName.localeCompare(b.companyName));
  }

  // Pagination
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filtered.slice(start, end);
});

const filteredSoftwareJobs = computed(() => {
  return fullJob.value.filter((job) => job.jobCategory === "Software Engineering");
});

const filteredFullJobs = computed(() => {
  const start = (fullJobCurrentPage.value - 1) * 9;
  const end = start + 9;
  return filteredSoftwareJobs.value.slice(start, end);
});

// Fetch jobs from API
const fetchJobs = async () => {
  try {
    loading.value = true;
    const response = await $fetch("https://dtalent.dev/eng/apis/index.php");
    
    const hotJobs = response.data.hotjobs || [];
    const allJobs = response.data.fulljobs || [];
    
    jobs.value = hotJobs;
    fullJob.value = allJobs;
    totalJobs.value = hotJobs.length;
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
  } finally {
    loading.value = false;
  }
};

const handlePageChange = (page) => {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  fetchJobs();
});
</script>

<style scoped>
/* Custom background */
.bg-gray-25 {
  background-color: #fafafa;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, box-shadow;
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

/* Loading animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Focus styles */
input:focus,
select:focus,
button:focus-visible {
  outline: none;
}

/* Custom toggle switch styling */
input[type="checkbox"]:checked + div {
  background-color: #2563eb;
}

input[type="checkbox"]:checked + div > div {
  transform: translateX(1.5rem);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .grid {
    gap: 1rem;
  }
}
</style>