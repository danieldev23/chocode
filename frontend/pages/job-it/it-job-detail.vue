<!-- pages/job/[id].vue -->
<template>
  <div class="min-h-screen bg-gray-25 pt-20 pb-8">
    <div class="mx-auto ">
      <!-- Breadcrumb -->
      <nav
        class="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6"
        aria-label="Breadcrumb"
      >
        <ol class="flex items-center space-x-2 text-sm">
          <li>
            <NuxtLink
              to="/"
              class="text-gray-600 hover:text-primary transition-colors"
            >
              Trang chủ
            </NuxtLink>
          </li>
          <ChevronRight class="w-4 h-4 text-gray-400" />
          <li>
            <NuxtLink
              to="/job-it"
              class="text-gray-600 hover:text-primary transition-colors"
            >
              Việc làm IT
            </NuxtLink>
          </li>
          <ChevronRight class="w-4 h-4 text-gray-400" />
          <li class="text-gray-900 font-medium truncate max-w-xs">
            {{ job.title }}
          </li>
        </ol>
      </nav>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - Job Details -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Job Header Card -->
          <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <!-- Hot Job Badge -->
            <div v-if="job.isHot === '1'" class="mb-4">
              <span
                class="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full"
              >
                <Flame class="w-4 h-4 mr-1.5" />
                Hot Job
              </span>
            </div>

            <!-- Job Title -->
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              {{ job.title }}
            </h1>

            <!-- Company Info -->
            <div class="flex items-center mb-6 pb-6 border-b border-gray-200">
              <div class="relative mr-4">
                <img
                  :src="job.companyLogo || defaultLogo"
                  :alt="job.companyName"
                  class="w-16 h-16 object-contain border border-gray-200 rounded-lg p-2 bg-white"
                />
              </div>
              <div>
                <h2 class="text-xl font-semibold text-gray-900 mb-1">
                  {{ job.companyName }}
                </h2>
                <div class="flex items-center text-gray-600">
                  <MapPin class="w-4 h-4 mr-1" />
                  <span>{{ job.city }}, {{ job.state }}</span>
                </div>
              </div>
            </div>

            <!-- Job Meta Information -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="flex items-start space-x-3">
                <div
                  class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <BriefcaseIcon class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    Loại hình công việc
                  </p>
                  <p class="text-gray-600">{{ getJobType(job.type) }}</p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div
                  class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <DollarSignIcon class="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Mức lương</p>
                  <p class="text-gray-600">{{ job.salary }}</p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div
                  class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <CalendarIcon class="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Ngày đăng</p>
                  <p class="text-gray-600">{{ job.dateCreated }}</p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div
                  class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <Users class="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    Số lượng tuyển
                  </p>
                  <p class="text-gray-600">
                    {{ job.openingsAvailable }} vị trí
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Job Description Card -->
          <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div class="flex items-center mb-6">
              <div
                class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3"
              >
                <FileTextIcon class="w-5 h-5 text-primary" />
              </div>
              <h2 class="text-xl font-semibold text-gray-900">
                Mô tả công việc
              </h2>
            </div>

            <div
              class="job-description prose prose-gray max-w-none"
              v-html="formatDescription(job.description)"
            ></div>
          </div>
        </div>

        <!-- Right Column - Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Application Card -->
          <div
            class="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sticky top-6"
          >
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Ứng tuyển ngay
            </h3>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-700">Còn lại:</span>
                <span class="font-semibold text-blue-700">
                  {{ job.openingsAvailable }} vị trí
                </span>
              </div>
              <div class="flex items-center justify-between text-sm mt-1">
                <span class="text-gray-700">Đã ứng tuyển:</span>
                <span class="font-semibold text-gray-900">
                  {{ job.submitted }} người
                </span>
              </div>
            </div>

            <div class="space-y-3">
              <button
                class="w-full bg-primary hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                <Send class="w-4 h-4 mr-2" />
                Ứng tuyển ngay
              </button>

              <a
                :href="job.jddownload"
                target="_blank"
                class="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                <Download class="w-4 h-4 mr-2" />
                Tải JD
              </a>
            </div>
          </div>

          <!-- Company Info Card -->
          <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Thông tin công ty
            </h3>

            <div class="text-center mb-6">
              <img
                :src="job.companyLogo || defaultLogo"
                :alt="job.companyName"
                class="w-20 h-20 object-contain border border-gray-200 rounded-lg mx-auto mb-3 p-2 bg-white"
              />
              <h4 class="font-semibold text-gray-900">{{ job.companyName }}</h4>
            </div>

            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <MapPin class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p class="text-sm font-medium text-gray-900">Địa điểm</p>
                  <p class="text-gray-600">{{ job.city }}, {{ job.state }}</p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <BriefcaseIcon
                  class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                />
                <div>
                  <p class="text-sm font-medium text-gray-900">Lĩnh vực</p>
                  <p class="text-gray-600">{{ job.jobCategory }}</p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <TagIcon class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p class="text-sm font-medium text-gray-900">Trạng thái</p>
                  <p class="text-gray-600">{{ job.status }}</p>
                </div>
              </div>
            </div>

            <button
              class="w-full mt-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Xem thông tin công ty
            </button>
          </div>

          <!-- Additional Info Card -->
          <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Thông tin thêm
            </h3>

            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <ClockIcon class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p class="text-sm font-medium text-gray-900">Ngày đăng</p>
                  <p class="text-gray-600">{{ job.dateCreated }}</p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <RefreshCwIcon
                  class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                />
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    Cập nhật lần cuối
                  </p>
                  <p class="text-gray-600">{{ job.dateModified }}</p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <Calendar class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p class="text-sm font-medium text-gray-900">Đăng cách đây</p>
                  <p class="text-gray-600">{{ job.daysOld }} ngày</p>
                </div>
              </div>

              <div class="pt-4 border-t border-gray-200">
                <p class="text-sm font-medium text-gray-900 mb-3">
                  Chia sẻ việc làm
                </p>
                <div class="flex space-x-3">
                  <a
                    :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      currentUrl
                    )}`"
                    target="_blank"
                    class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <img
                      src="@/assets/images/it-job/facebook.png"
                      class="w-4 h-4"
                      alt="Facebook"
                    />
                  </a>
                  <a
                    href="#"
                    class="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                  >
                    <img
                      src="@/assets/images/it-job/x.png"
                      class="w-4 h-4"
                      alt="X"
                    />
                  </a>
                  <a
                    href="#"
                    class="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors"
                  >
                    <img
                      src="@/assets/images/it-job/linkedln.png"
                      class="w-4 h-4"
                      alt="LinkedIn"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Jobs Section -->
      <div class="mt-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Việc làm liên quan</h2>
          <NuxtLink
            to="/job-it"
            class="text-primary hover:text-blue-800 font-medium flex items-center transition-colors"
          >
            Xem tất cả
            <ChevronRight class="w-4 h-4 ml-1" />
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(relatedJob, index) in relatedJobs"
            :key="index"
            class="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <!-- Job Card Header -->
            <div class="relative bg-gradient-to-r from-blue-50 to-blue-100 p-4">
              <div class="flex items-center justify-between">
                <img
                  :src="relatedJob.companyLogo || defaultLogo"
                  :alt="relatedJob.companyName"
                  class="h-12 w-12 object-contain bg-white rounded-lg p-2 border border-gray-200"
                />
                <div v-if="relatedJob.isHot === '1'">
                  <span
                    class="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full"
                  >
                    <Flame class="w-3 h-3 mr-1" />
                    Hot
                  </span>
                </div>
              </div>
            </div>

            <!-- Job Card Body -->
            <div class="p-6">
              <NuxtLink
                :to="`/chi-tiet-job/${relatedJob.jobOrderID}-${relatedJob.title
                  .replace(/\s+/g, '-')
                  .replace(/\+/g, '')
                  .replace(/-+/g, '-')}`"
                class="text-lg font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2 mb-3"
              >
                {{ relatedJob.title }}
              </NuxtLink>

              <div class="space-y-2 mb-4">
                <div class="flex items-center text-gray-600">
                  <Building2 class="w-4 h-4 mr-2 flex-shrink-0" />
                  <span class="truncate">{{ relatedJob.companyName }}</span>
                </div>

                <div class="flex items-center text-gray-600">
                  <MapPin class="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{{ relatedJob.city }}, {{ relatedJob.state }}</span>
                </div>

                <div class="flex items-center text-gray-600">
                  <DollarSignIcon class="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{{ relatedJob.salary }}</span>
                </div>
              </div>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-md"
                >
                  {{ getJobType(relatedJob.type) }}
                </span>
                <span
                  class="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-md"
                >
                  {{ relatedJob.jobCategory }}
                </span>
                <span
                  class="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md flex items-center"
                >
                  <ClockIcon class="w-3 h-3 mr-1" />
                  {{ relatedJob.daysOld }} ngày
                </span>
              </div>

              <!-- Action Button -->
              <NuxtLink
                :to="`/chi-tiet-job/${relatedJob.jobOrderID}-${relatedJob.title
                  .replace(/\s+/g, '-')
                  .replace(/\+/g, '')
                  .replace(/-+/g, '-')}`"
                class="w-full bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                Xem chi tiết
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ChevronRight,
  MapPin,
  BriefcaseIcon,
  ClockIcon,
  CalendarIcon,
  FileTextIcon,
  DollarSignIcon,
  Users,
  TagIcon,
  RefreshCwIcon,
  Download,
  Send,
  Flame,
  Share2,
  Calendar,
  Building2,
} from "lucide-vue-next";
import defaultLogo from "@/assets/images/header/logo.png";

const route = useRoute();
const url = useRequestURL();
const currentUrl = url.href;

// Fetch job data
const payload = { job_id: route.params.slug };
const job = ref({});
const relatedJobs = ref([]);

try {
  const response = await $fetch(
    "https://dtalent.dev/eng/apis/index.php?m=job_detail",
    {
      method: "POST",
      body: new URLSearchParams(payload),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  job.value = response.data.job_detail;
  relatedJobs.value = response.data.related_jobs;
} catch (error) {
  console.error("Error fetching job data:", error);
}

// SEO Meta
useSeoMeta({
  title: `${job.value.title} - ${job.value.companyName} | ChoCode Jobs`,
  description: `Ứng tuyển ngay vị trí ${job.value.title} tại ${job.value.companyName}. Mức lương: ${job.value.salary}. Địa điểm: ${job.value.city}, ${job.value.state}`,
});

function getJobType(type) {
  const types = {
    FTR: "Full Time Remote",
    FTO: "Full Time On-site",
    PTR: "Part Time Remote",
    PTO: "Part Time On-site",
    C: "Contract",
  };
  return types[type] || type;
}

function formatDescription(description) {
  return description;
}
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

/* Job description styling */
.job-description {
  @apply text-gray-700 leading-relaxed;
}

.job-description p {
  @apply mb-4;
}

.job-description strong {
  @apply font-semibold text-gray-900;
}

.job-description ul,
.job-description ol {
  @apply ml-6 mb-4;
}

.job-description ul {
  @apply list-disc;
}

.job-description ol {
  @apply list-decimal;
}

.job-description h1,
.job-description h2,
.job-description h3 {
  @apply font-bold mb-3 mt-6 text-gray-900;
}

.job-description h1 {
  @apply text-xl;
}

.job-description h2 {
  @apply text-lg;
}

.job-description h3 {
  @apply text-base;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .grid {
    gap: 1rem;
  }
}
</style>
