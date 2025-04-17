<!-- components/JobListing.vue -->
<template>
  <div class="bg-gray-50 min-h-screen mt-6">
    <!-- Header Section -->
    <header class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-6">
        <div class="flex justify-between items-center">
          <h1 class="text-xl font-bold text-primary">Việc làm IT xịn nhất!</h1>
          <div class="flex items-center gap-2">
            <el-input
              v-model="searchQuery"
              placeholder="Search jobs..."
              class="w-64"
              prefix-icon="el-icon-search"
            >
              <template #prefix>
                <Search class="w-5 h-5 text-gray-400" />
              </template>
            </el-input>
            <el-button type="primary" class="flex items-center gap-1">
              <Filter class="w-4 h-4" />
              Filter
            </el-button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto py-8">
      <!-- Filter Section -->
      <div class="bg-white rounded-lg shadow p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <el-select
            v-model="filters.location"
            placeholder="Địa điểm"
            clearable
          >
            <el-option label="Đà Nẵng" value="Đà Nẵng" />
            <el-option label="Hà Nội" value="Hà Nội" />
            <el-option label="Hồ Chí Minh" value="Hồ Chí Minh" />
          </el-select>
          <el-select
            v-model="filters.jobCategory"
            placeholder="Danh mục"
            clearable
          >
            <el-option
              label="Software Engineering"
              value="Software Engineering"
            />
            <el-option label="QA/Testing" value="QA/Testing" />
            <el-option label="DevOps" value="DevOps" />
          </el-select>
          <el-select
            v-model="filters.jobType"
            placeholder="Nghề nghiệp"
            clearable
          >
            <el-option label="Full Time" value="FT" />
            <el-option label="Part Time" value="PT" />
            <el-option label="Contract" value="CON" />
          </el-select>
          <el-select v-model="sortBy" placeholder="Sort By" clearable>
            <el-option label="Mới nhất" value="newest" />
            <el-option label="Lương cao" value="highestSalary" />
            <el-option label="Tên công ty" value="companyName" />
          </el-select>
        </div>
      </div>

      <!-- Job Count -->
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-xl font-semibold text-gray-800 flex items-center">
          <Flame class="w-5 h-5 text-red-500 mr-2" />
          {{ jobs.length }} việc làm HOT nhất!
        </h1>
        <el-switch
          v-model="showHotJobsOnly"
          active-text="Hot Jobs Only"
          inactive-text=""
          class="ml-2"
        />
      </div>

      <!-- Jobs Grid -->
      <div
        v-if="loading"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="n in 6"
          :key="n"
          class="bg-white rounded-lg shadow overflow-hidden border border-gray-100"
        >
          <!-- Card Header Skeleton -->
          <div class="relative">
            <div class="bg-gray-200 px-4 py-8">
              <el-skeleton-item
                variant="circle"
                style="
                  width: 40px;
                  height: 40px;
                  position: absolute;
                  top: 16px;
                  right: 16px;
                "
              />
              <div class="flex">
                <el-skeleton-item
                  variant="p"
                  style="width: 60px; height: 22px; margin-right: 8px"
                />
                <el-skeleton-item
                  variant="p"
                  style="width: 100px; height: 22px"
                />
              </div>
            </div>
          </div>

          <!-- Content Skeleton -->
          <div class="p-5">
            <el-skeleton animated :rows="3" />

            <div class="flex mt-4">
              <el-skeleton-item
                variant="text"
                style="width: 60px; height: 22px; margin-right: 8px"
              />
              <el-skeleton-item
                variant="text"
                style="width: 80px; height: 22px"
              />
            </div>

            <div
              class="border-t border-gray-100 pt-4 mt-4 flex justify-between items-center"
            >
              <el-skeleton-item variant="text" style="width: 120px" />
              <el-skeleton-item
                variant="button"
                style="width: 90px; height: 32px"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="jobs.length === 0" class="text-center py-12">
        <FileSearch class="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 class="text-xl font-semibold text-gray-700">No jobs found</h3>
        <p class="text-gray-500 mt-2">
          Try changing your search or filter criteria
        </p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="job in filteredJobs"
          :key="job.jobOrderID"
          class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
        >
          <!-- Job Card Header -->
          <div class="relative">
            <!-- Company Logo -->
            <div
              class="absolute top-4 right-4 bg-white rounded-full p-2 shadow"
            >
              <el-image
                :src="job.companyLogo"
                :alt="job.companyName"
                class="w-10 h-10 object-contain rounded-full"
                fit="cover"
              >
                <template #error>
                  <div
                    class="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full text-gray-500"
                  >
                    <Building2 class="w-6 h-6" />
                  </div>
                </template>
              </el-image>
            </div>

            <!-- Job Status Badge -->
            <div class="bg-primary-gradient px-4 py-3">
              <span
                v-if="job.isHot === '1'"
                class="inline-flex items-center bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mr-2"
              >
                <Flame class="w-3 h-3 mr-1" />
                Hot
              </span>
              <span
                class="inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
              >
                <Clock class="w-3 h-3 mr-1" />
                {{ job.daysOld }} days ago
              </span>
            </div>
          </div>

          <!-- Job Content -->
          <div class="p-5">
            <div class="mb-4">
              <NuxtLink
                :to="`/chi-tiet-job/${job.jobOrderID}-${job.title
                  .replace(/\s+/g, '-')
                  .replace(/\+/g, '')
                  .replace(/-+/g, '-')}`"
                class="text-xl font-semibold text-gray-800 mb-1"
                >{{ job.title }}</NuxtLink
              >
              <p class="text-gray-600 flex items-center">
                <Building2 class="w-4 h-4 mr-1" />
                {{ job.companyName }}
              </p>
            </div>

            <div class="flex items-center text-gray-500 text-sm mb-4">
              <div class="flex items-center mr-4">
                <MapPin class="w-4 h-4 mr-1" />
                {{ job.city }}, {{ job.state }}
              </div>
              <div class="flex items-center">
                <Briefcase class="w-4 h-4 mr-1" />
                {{ job.type === "FT" ? "Full Time" : job.type }}
              </div>
            </div>

            <div class="flex items-center text-sm mb-4">
              <span class="bg-blue-50 text-primary px-2 py-1 rounded mr-2">
                {{ job.jobCategory }}
              </span>
              <span
                v-if="job.salary"
                class="bg-green-50 text-green-700 px-2 py-1 rounded"
              >
                {{ job.salary }}
              </span>
            </div>

            <div
              class="border-t border-gray-100 pt-4 mt-4 flex justify-between items-center"
            >
              <span class="text-xs text-gray-500">
                Posted on {{ formatDate(job.dateCreated) }}
              </span>
              <el-button type="primary" size="small" class="flex items-center">
                <ArrowRight class="w-4 h-4" />
                Apply Now
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="mt-8 flex justify-center">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="totalJobs"
          layout="prev, pager, next"
          @current-change="handlePageChange"
        />
      </div>

      <!-- full job  -->
            <!-- Job Count -->
            <div class="flex justify-between items-center mb-4">
        <h1 class="text-xl font-semibold text-gray-800 flex items-center">
          <Flame class="w-5 h-5 text-red-500 mr-2" />
          Tất cả việc làm
        </h1>
        <!-- <el-switch
          v-model="showHotJobsOnly"
          active-text="Hot Jobs Only"
          inactive-text=""
          class="ml-2"
        /> -->
      </div>

      <!-- Jobs Grid -->
      <div
        v-if="loading"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="n in 12"
          :key="n"
          class="bg-white rounded-lg shadow overflow-hidden border border-gray-100"
        >
          <!-- Card Header Skeleton -->
          <div class="relative">
            <div class="bg-gray-200 px-4 py-8">
              <el-skeleton-item
                variant="circle"
                style="
                  width: 40px;
                  height: 40px;
                  position: absolute;
                  top: 16px;
                  right: 16px;
                "
              />
              <div class="flex">
                <el-skeleton-item
                  variant="p"
                  style="width: 60px; height: 22px; margin-right: 8px"
                />
                <el-skeleton-item
                  variant="p"
                  style="width: 100px; height: 22px"
                />
              </div>
            </div>
          </div>

          <!-- Content Skeleton -->
          <div class="p-5">
            <el-skeleton animated :rows="3" />

            <div class="flex mt-4">
              <el-skeleton-item
                variant="text"
                style="width: 60px; height: 22px; margin-right: 8px"
              />
              <el-skeleton-item
                variant="text"
                style="width: 80px; height: 22px"
              />
            </div>

            <div
              class="border-t border-gray-100 pt-4 mt-4 flex justify-between items-center"
            >
              <el-skeleton-item variant="text" style="width: 120px" />
              <el-skeleton-item
                variant="button"
                style="width: 90px; height: 32px"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="fullJob.length === 0" class="text-center py-12">
        <FileSearch class="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 class="text-xl font-semibold text-gray-700">No jobs found</h3>
        <p class="text-gray-500 mt-2">
          Try changing your search or filter criteria
        </p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div
    v-for="(job, index) in fullJob.filter(job => job.jobCategory === 'Software Engineering').slice((currentPage-1) * 9, currentPage * 9)"
    :key="job.jobOrderID"
    class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
  >
    <!-- Job Card Header -->
    <div class="relative">
      <!-- Company Logo -->
      <div
        class="absolute top-4 right-4 bg-white rounded-full p-2 shadow"
      >
        <el-image
          :src="job.companyLogo || defaultLogo"
          :alt="job.companyName"
          class="w-10 h-10 object-contain rounded-full"
          fit="cover"
        >
          <template #error>
            <div
              class="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full text-gray-500"
            >
              <Building2 class="w-6 h-6" />
            </div>
          </template>
        </el-image>
      </div>

      <!-- Job Status Badge -->
      <div class="bg-primary-gradient px-4 py-3">
        <span
          v-if="job.isHot === '1'"
          class="inline-flex items-center bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mr-2"
        >
          <Flame class="w-3 h-3 mr-1" />
          Hot
        </span>
        <span
          class="inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
        >
          <Clock class="w-3 h-3 mr-1" />
          {{ job.daysOld }} days ago
        </span>
      </div>
    </div>

    <!-- Job Content -->
    <div class="p-5">
      <div class="mb-4">
        <NuxtLink
          :to="`/chi-tiet-job/${job.jobOrderID}-${job.title
            .replace(/\s+/g, '-')
            .replace(/\+/g, '')
            .replace(/-+/g, '-')}`"
          class="text-xl font-semibold text-gray-800 mb-1"
          >{{ job.title }}</NuxtLink
        >
        <p class="text-gray-600 flex items-center">
          <Building2 class="w-4 h-4 mr-1" />
          {{ job.companyName }}
        </p>
      </div>

      <div class="flex items-center text-gray-500 text-sm mb-4">
        <div class="flex items-center mr-4">
          <MapPin class="w-4 h-4 mr-1" />
          {{ job.city }}, {{ job.state }}
        </div>
        <div class="flex items-center">
          <Briefcase class="w-4 h-4 mr-1" />
          {{ job.type === "FT" ? "Full Time" : job.type }}
        </div>
      </div>

      <div class="flex items-center text-sm mb-4">
        <span class="bg-blue-50 text-primary px-2 py-1 rounded mr-2">
          {{ job.jobCategory }}
        </span>
        <span
          v-if="job.salary"
          class="bg-green-50 text-green-700 px-2 py-1 rounded"
        >
          {{ job.salary }}
        </span>
      </div>

      <div
        class="border-t border-gray-100 pt-4 mt-4 flex justify-between items-center"
      >
        <span class="text-xs text-gray-500">
          Posted on {{ formatDate(job.dateCreated) }}
        </span>
        <el-button
          type="primary"
          size="small"
          class="flex items-center"
        >
          <ArrowRight class="w-4 h-4" />
          Apply Now
        </el-button>
      </div>
    </div>
  </div>
</div>

<!-- Pagination -->
<div class="mt-8 flex justify-center">
  <el-pagination
    v-model:current-page="currentPage"
    :page-size="12"
    :total="fullJob.filter(job => job.jobCategory === 'Software Engineering').length"
    layout="prev, pager, next"
    @current-change="handlePageChange"
  />
</div>
    </main>
  </div>
</template>

<script setup>
useSeoMeta({
  title:
    "Việc làm IT hot nhất, chất nhất, xịn nhất được tổng hợp từ các nền tảng top CV, topdev!",
});
import { ref, computed, onMounted } from "vue";
import axios from "axios";
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

const searchQuery = ref("");
const filters = ref({
  location: "",
  jobCategory: "",
  jobType: "",
});
const sortBy = ref("newest");
const showHotJobsOnly = ref(false);
const currentPage = ref(1);
const pageSize = ref(9);
const totalJobs = ref(0);
const loading = ref(true);
const jobs = ref([]);
const fullJob = ref([]);
import defaultLogo from '@/assets/images/header/logo.png';


// Fetch jobs from API
const fetchJobs = async () => {
  try {
    loading.value = true;

    // In a real application, you would fetch from your API
    const response = await axios.get("https://dtalent.dev/eng/apis/index.php");
    const hotJobs = response.data.data.hotjobs;
    jobs.value = hotJobs;
    totalJobs.value = jobs.value.length;
    fullJob.value = response.data.data.fulljobs;
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
  } finally {
    loading.value = false;
  }
};

// Format date from MM-DD-YY to readable format
const formatDate = (dateString) => {
  if (!dateString) return "";

  const [month, day, year] = dateString.split("-");
  return `${month}/${day}/20${year}`;
};

// Filtered and sorted jobs
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
    filtered = filtered.filter(
      (job) => job.jobCategory === filters.value.jobCategory
    );
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
    // This is a simplistic approach; in a real app, you'd need to parse the salary data properly
    filtered.sort((a, b) => {
      const salaryA = a.salary ? parseInt(a.salary.match(/\d+/)?.[0] || 0) : 0;
      const salaryB = b.salary ? parseInt(b.salary.match(/\d+/)?.[0] || 0) : 0;
      return salaryB - salaryA;
    });
  } else if (sortBy.value === "companyName") {
    filtered.sort((a, b) => a.companyName.localeCompare(b.companyName));
  }

  // Pagination (in a real app, this might be handled server-side)
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filtered.slice(start, end);
});

const handlePageChange = (page) => {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  fetchJobs();
});
</script>
