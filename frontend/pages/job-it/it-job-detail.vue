<!-- pages/job/[id].vue -->
<template>
  <div class="bg-gray-50 min-h-screen pb-12 mt-6">
    <!-- Header với breadcrumb -->
    <div class="bg-white shadow-sm rounded-sm">
      <div class="w-full px-6 py-4">
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <NuxtLink to="/" class="hover:text-primary">Trang chủ</NuxtLink>
          <ChevronRight class="w-4 h-4" />
          <NuxtLink to="/job-it" class="hover:text-primary">Việc làm</NuxtLink>
          <ChevronRight class="w-4 h-4" />
          <span class="text-gray-900 font-medium">{{ job.title }}</span>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="w-full my-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Job details - left column -->
        <div class="lg:col-span-2">
          <!-- Job header -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div v-if="job.isHot === '1'" class="mb-4 flex items-center">
              <span
                class="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium flex items-center"
              >
                <Flame class="w-3 h-3 mr-1" /> Hot Job
              </span>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 mb-4">
              {{ job.title }}
            </h1>
            <div class="flex items-center mb-6">
              <img
                :src="job.companyLogo || defaultLogo"
                :alt="job.companyName"
                class="w-16 h-16 object-contain border border-gray-200 rounded mr-4"
              />
              <div>
                <h2 class="text-lg font-medium text-gray-900">
                  {{ job.companyName }}
                </h2>
                <div class="flex items-center text-gray-500 mt-1">
                  <MapPin class="w-4 h-4 mr-1" />
                  <span>{{ job.city }}, {{ job.state }}</span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
              <div class="flex items-start gap-2">
                <BriefcaseIcon class="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p class="text-sm text-gray-500">Loại hình công việc</p>
                  <p class="font-medium">{{ getJobType(job.type) }}</p>
                </div>
              </div>
              <div class="flex items-start gap-2">
                <CalendarIcon class="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p class="text-sm text-gray-500">Ngày đăng</p>
                  <p class="font-medium">{{ job.dateCreated }}</p>
                </div>
              </div>
              <div class="flex items-start gap-2">
                <DollarSignIcon class="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p class="text-sm text-gray-500">Mức lương</p>
                  <p class="font-medium">{{ job.salary }}</p>
                </div>
              </div>
              <div class="flex items-start gap-2">
                <Users class="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p class="text-sm text-gray-500">Số lượng cần tuyển</p>
                  <p class="font-medium">{{ job.openingsAvailable }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Job description -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div class="flex items-center mb-4">
              <FileTextIcon class="w-5 h-5 text-primary mr-2" />
              <h2 class="text-xl font-semibold">Mô tả công việc</h2>
            </div>
            <div
              class="job-description"
              v-html="formatDescription(job.description)"
            ></div>
          </div>

          
        </div>

        <!-- Right sidebar with company info and application -->
        <div class="lg:col-span-1">
          <!-- Application box -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6 sticky top-4">
            <h3 class="text-lg font-semibold mb-4">Ứng tuyển ngay</h3>
            <p class="text-sm text-gray-500 mb-4">
              Còn {{ job.openingsAvailable }} vị trí. Đã có
              {{ job.submitted }} người ứng tuyển.
            </p>
            <div class="flex flex-col items-center">
              <el-button
                type="primary"
                class="w-full mb-4 flex items-center justify-center bg-primary-gradient"
              >
                <Send class="w-4 h-4 mr-2" />
                Ứng tuyển ngay
              </el-button>
              <el-button
                class="w-full flex items-center justify-center bg-secondary-gradient mr-3 text-white"
              >
                <Download class="w-6 h-6 mr-2" />
                <a :href="job.jddownload" target="_blank" class="w-full"
                  >Tải JD</a
                >
              </el-button>
            </div>
          </div>

          <!-- Company info -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 class="text-lg font-semibold mb-4">Thông tin công ty</h3>
            <div class="flex justify-center mb-4">
              <img
                :src="job.companyLogo || defaultLogo"
                :alt="job.companyName"
                class="w-24 h-24 object-contain border border-gray-200 rounded"
              />
            </div>
            <h4 class="text-center font-medium text-lg mb-4">
              {{ job.companyName }}
            </h4>
            <div class="flex flex-col gap-3">
              <div class="flex items-start gap-2">
                <MapPin class="w-5 h-5 text-primary mt-0.5" />
                <span>{{ job.city }}, {{ job.state }}</span>
              </div>
              <div class="flex items-start gap-2">
                <BriefcaseIcon class="w-5 h-5 text-primary mt-0.5" />
                <span>{{ job.jobCategory }}</span>
              </div>
              <div class="flex items-start gap-2">
                <TagIcon class="w-5 h-5 text-primary mt-0.5" />
                <span>{{ job.status }}</span>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t">
              <el-button size="default" class="w-full mt-2 bg-primary-gradient">
                Xem thông tin công ty
              </el-button>
            </div>
          </div>

          <!-- Job metadata -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold mb-4">Thông tin thêm</h3>
            <div class="flex flex-col gap-3">
              <div class="flex items-start gap-2">
                <ClockIcon class="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p class="text-sm text-gray-500">Ngày đăng</p>
                  <p>{{ job.dateCreated }}</p>
                </div>
              </div>
              <div class="flex items-start gap-2">
                <RefreshCwIcon class="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p class="text-sm text-gray-500">Cập nhật gần nhất</p>
                  <p>{{ job.dateModified }}</p>
                </div>
              </div>
              <div class="flex items-start gap-2">
                <Calendar class="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p class="text-sm text-gray-500">Thời gian đăng</p>
                  <p>{{ job.daysOld }} ngày trước</p>
                </div>
              </div>
              <div class="flex items-start gap-2">
                <Share2 class="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p class="text-sm text-gray-500">Chia sẻ việc làm này</p>
                  <div class="flex mt-2 gap-5">
                    <a
                      :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`"
                      target="blank__"
                    >
                      <img
                        src="@/assets/images/it-job/facebook.png"
                        class="w-6 h-6"
                      />
                    </a>
                    <a>
                      <img src="@/assets/images/it-job/x.png" class="w-6 h-6" />
                    </a>
                    <a>
                      <img
                        src="@/assets/images/it-job/linkedln.png"
                        class="w-6 h-6"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Jobs Section -->
      <div class="mt-10">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-900">Việc làm liên quan</h2>
          <NuxtLink
            to="/jobs"
            class="text-primary flex items-center hover:text-blue-800"
          >
            Xem tất cả <ChevronRight class="w-4 h-4 ml-1" />
          </NuxtLink>
        </div>

        <!-- Related Jobs Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(relatedJob, index) in relatedJobs"
            :key="index"
            class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            <!-- Job Card Header -->
            <div class="relative">
              <div
                class="h-24 bg-blue-50 flex items-center justify-center px-4"
              >
                <img
                  src="@/assets/images/header/logo.png"
                  :alt="relatedJob.companyName"
                  class="h-16 max-w-full object-contain"
                />
              </div>
              <div
                v-if="relatedJob.isHot === '1'"
                class="absolute top-2 right-2"
              >
                <span
                  class="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium flex items-center"
                >
                  <Flame class="w-3 h-3 mr-1" /> Hot Job
                </span>
              </div>
            </div>

            <!-- Job Card Body -->
            <div class="p-4">
              <NuxtLink
                :to="`/chi-tiet-job/${relatedJob.jobOrderID}-${relatedJob.title
                  .replace(/\s+/g, '-')
                  .replace(/\+/g, '')
                  .replace(/-+/g, '-')}`"
                class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary hover:underline"
                >{{ relatedJob.title }}</NuxtLink
              >
              <div class="flex items-center text-gray-700 mb-2">
                <Building2 class="w-4 h-4 mr-2 text-gray-500" />
                <span class="line-clamp-1">{{ relatedJob.companyName }}</span>
              </div>
              <div class="flex items-center text-gray-700 mb-2">
                <MapPin class="w-4 h-4 mr-2 text-gray-500" />
                <span>{{ relatedJob.city }}, {{ relatedJob.state }}</span>
              </div>
              <div class="flex items-center text-gray-700 mb-4">
                <DollarSignIcon class="w-4 h-4 mr-2 text-gray-500" />
                <span>{{ relatedJob.salary }}</span>
              </div>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  class="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                >
                  {{ getJobType(relatedJob.type) }}
                </span>
                <span
                  class="bg-green-50 text-green-700 px-2 py-1 rounded text-xs"
                >
                  {{ relatedJob.jobCategory }}
                </span>
                <span
                  class="bg-gray-50 text-gray-700 px-2 py-1 rounded text-xs flex items-center"
                >
                  <ClockIcon class="w-3 h-3 mr-1" />
                  {{ relatedJob.daysOld }} ngày trước
                </span>
              </div>

              <!-- Action Button -->
              <NuxtLink
                :to="`/chi-tiet-job/${relatedJob.jobOrderID}-${relatedJob.title
                  .replace(/\s+/g, '-')
                  .replace(/\+/g, '')
                  .replace(/-+/g, '-')}`"
                class="block mt-2"
              >
                <el-button type="primary" class="w-full"
                  >Xem chi tiết</el-button
                >
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
  Facebook,
  Linkedin,
  Mail,
  Share2,
  Calendar,
} from "lucide-vue-next";
import defaultLogo from '@/assets/images/header/logo.png'
const route = useRoute();
const url = useRequestURL(); // từ Nuxt 3
const currentUrl = url.href;
import axios from "axios";
const payload = {
  job_id: route.params.slug,
};
const job = ref([]);
const relatedJobs = ref([]);
const response = await axios.post(
  "https://dtalent.dev/eng/apis/index.php?m=job_detail",
  new URLSearchParams(payload),
  {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }
);

job.value = response.data.data.job_detail;
relatedJobs.value = response.data.data.related_jobs;
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
  // In a production environment, you might want to sanitize the HTML
  return description;
}
</script>

<style>
button.el-button.w-full.flex.items-center.justify-center.bg-secondary-gradient.mr-3.text-white {
    color: white;
}
.job-description {
  @apply text-gray-700 leading-relaxed;
}

.job-description p {
  @apply mb-4;
}

.job-description strong {
  @apply font-semibold;
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
  @apply font-bold mb-2 mt-4;
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
</style>
