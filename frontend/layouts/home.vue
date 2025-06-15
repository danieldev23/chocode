<template>
  <MoleculesHeader />
  <main>
    <div class="w-full min-h-screen">
      <main class="pt-16">
        <div class="mx-4 md:mx-16 lg:mx-32 xl:mx-[12rem]">
          <!-- Modern Hero Banner with Glassmorphism Effect -->
          <div
            class="relative overflow-hidden rounded-2xl mt-6 mb-8 shadow-2xl"
          >
            <img
              src="~/assets/images/header/banner.avif"
              srcset="
                ~/assets/images/header/banner.avif  600w,
                ~/assets/images/header/banner.avif  900w,
                ~/assets/images/header/banner.avif 1200w
              "
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
              class="w-full h-[32rem] object-cover transition-transform duration-[6000ms] hover:scale-105"
              loading="lazy"
              fetchpriority="high"
              alt="IT Freelance Platform Vietnam"
            />
            <!-- Gradient Overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent"
            ></div>
            <!-- Content Overlay -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center px-6 max-w-4xl">
                <div
                  class="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6"
                >
                  <span class="text-white text-sm font-medium"
                    >🚀 #1 IT Freelance Platform</span
                  >
                </div>
                <h1
                  class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-wide"
                >
                  Kết nối với
                  <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500"
                  >
                    các dự án IT
                  </span>
                  <br />
                  <span class="block mt-2"> hàng đầu tại Việt Nam </span>
                </h1>
                <p
                  class="text-xl md:text-2xl text-blue-100 mb-6 font-light sm:text-nowrap text-wrap"
                >
                  Tiếp cận
                  <span class="font-bold text-cyan-300">40,000+</span> cơ hội
                  freelance công nghệ từ các startup và doanh nghiệp
                </p>
              </div>
            </div>

            <!-- Custom Pagination -->
            <div
              class="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10"
            >
              <div class="flex space-x-2">
                <div
                  v-for="n in slides.length"
                  :key="n"
                  class="w-3 h-3 rounded-full backdrop-blur-sm border border-white/30 transition-all duration-300 hover:bg-white/80"
                ></div>
              </div>
            </div>
          </div>

          <!-- Ultra Modern Search Section -->
          <section class="relative -mt-32 z-20 mb-16">
            <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
              <!-- Premium Search Card -->
              <div class="relative overflow-hidden">
                <!-- Background with mesh gradient -->
                <div
                  class="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/50 backdrop-blur-3xl rounded-3xl"
                ></div>
                <div
                  class="absolute inset-0 bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
                ></div>

                <!-- Floating elements decoration -->
                <div
                  class="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-xl"
                ></div>
                <div
                  class="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-xl"
                ></div>

                <div class="relative p-8 lg:p-12">
                  <!-- Header Section -->
                  <div class="text-center mb-12">
                    <div
                      class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-200/50 mb-6"
                    >
                      <div
                        class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"
                      ></div>
                      <span class="text-sm font-medium text-blue-700"
                        >🔥 Hot Jobs Available</span
                      >
                    </div>
                    <h2
                      class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4"
                    >
                      Khám phá cơ hội freelance IT và tìm Dev chất lượng cho dự
                      án của bạn
                    </h2>
                    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                      Kết nối với
                      <span class="font-bold text-blue-600">40,000+</span> dự án
                      freelance từ các startup & doanh nghiệp hàng đầu
                    </p>
                  </div>

                  <!-- Revolutionary Search Form -->
                  <form @submit.prevent="handleSearch" role="search">
                    <!-- Main Search Row -->
                    <div class="relative mb-8">
                      <div
                        class="flex flex-col lg:flex-row bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-gray-100/50 overflow-hidden"
                      >
                        <!-- Job Category -->
                        <div class="flex-1 relative group">
                          <div class="absolute top-3 left-4 z-10">
                            <div class="flex items-center">
                              <div
                                class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors"
                              >
                                <List class="w-5 h-5 text-blue-600" />
                              </div>
                            </div>
                          </div>
                          <div class="pl-16 pr-4 py-4">
                            <label
                              class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1"
                              >Danh mục</label
                            >
                            <el-select
                              v-model="state.jobCategory"
                              placeholder="Chọn lĩnh vực IT"
                              clearable
                              class="w-full premium-select"
                              popper-class="premium-popper"
                              size="large"
                            >
                              <el-option
                                v-for="item in jobCategories"
                                :key="item"
                                :label="item"
                                :value="item"
                              />
                            </el-select>
                          </div>
                          <div
                            class="absolute inset-y-0 right-0 w-px bg-gray-100"
                          ></div>
                        </div>

                        <!-- Keywords Search -->
                        <div class="flex-1 relative group">
                          <div class="absolute top-3 left-4 z-10">
                            <div
                              class="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors"
                            >
                              <Search class="w-5 h-5 text-green-600" />
                            </div>
                          </div>
                          <div class="pl-16 pr-4 py-4">
                            <label
                              class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1"
                              >Kỹ năng</label
                            >
                            <el-input
                              v-model="input"
                              clearable
                              placeholder="React, Vue.js, Laravel, Python..."
                              class=""
                              size="large"
                            />
                          </div>
                          <div
                            class="absolute inset-y-0 right-0 w-px bg-gray-100"
                          ></div>
                        </div>

                        <!-- Location -->
                        <div class="flex-1 relative group">
                          <div class="absolute top-3 left-4 z-10">
                            <div
                              class="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center group-hover:bg-purple-100 transition-colors"
                            >
                              <MapPin class="w-5 h-5 text-purple-600" />
                            </div>
                          </div>
                          <div class="pl-16 pr-4 py-4">
                            <label
                              class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1"
                              >Địa điểm</label
                            >
                            <el-select
                              v-model="state.location"
                              placeholder="Remote / Onsite"
                              clearable
                              class="w-full premium-select"
                              popper-class="premium-popper"
                              size="large"
                            >
                              <el-option
                                v-for="location in locations"
                                :value="location"
                                :label="location"
                              />
                            </el-select>
                          </div>
                        </div>

                        <!-- Premium Search Button -->
                        <div class="lg:w-auto w-full p-3">
                          <button
                            type="submit"
                            class="w-full lg:w-auto px-8 py-4 bg-secondary-gradient text-white font-bold rounded-xl transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center group relative overflow-hidden"
                          >
                            <div
                              class="absolute inset-0 bg-secondary-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            ></div>
                            <Search
                              class="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300"
                            />
                            <span class="relative z-10">Tìm ngay</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <!-- Trending Tags -->
                    <div class="flex flex-wrap items-center gap-3 mb-8">
                      <span
                        class="text-sm font-medium text-gray-600 flex items-center"
                      >
                        <span
                          class="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"
                        ></span>
                        Trending:
                      </span>
                      <div class="flex flex-wrap gap-2">
                        <button
                          v-for="(tag, index) in quickTags"
                          :key="tag"
                          type="button"
                          @click="selectQuickTag(tag)"
                          class="px-4 py-2 text-sm font-medium bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-indigo-50 text-gray-700 hover:text-blue-700 rounded-xl border border-gray-200/50 hover:border-blue-200 transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5"
                          :class="`animate-fade-in-up delay-${index * 100}`"
                        >
                          #{{ tag }}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <!-- Premium Stats Grid -->
              <div class="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div
                  class="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  ></div>
                  <div class="relative">
                    <div
                      class="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    >
                      <span class="text-2xl">💼</span>
                    </div>
                    <div class="text-3xl font-bold text-blue-600 mb-1">
                      40K+
                    </div>
                    <div class="text-gray-600 font-medium">Dự án active</div>
                  </div>
                </div>

                <div
                  class="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  ></div>
                  <div class="relative">
                    <div
                      class="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    >
                      <span class="text-2xl">👨‍💻</span>
                    </div>
                    <div class="text-3xl font-bold text-green-500 mb-1">
                      25K+
                    </div>
                    <div class="text-gray-600 font-medium">IT Freelancer</div>
                  </div>
                </div>

                <div
                  class="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  ></div>
                  <div class="relative">
                    <div
                      class="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    >
                      <span class="text-2xl">🏢</span>
                    </div>
                    <div class="text-3xl font-bold text-purple-600 mb-1">
                      12K+
                    </div>
                    <div class="text-gray-600 font-medium">Công ty tin cậy</div>
                  </div>
                </div>

                <div
                  class="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  ></div>
                  <div class="relative">
                    <div
                      class="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    >
                      <span class="text-2xl">⭐</span>
                    </div>
                    <div class="text-3xl font-bold text-orange-400 mb-1">
                      98%
                    </div>
                    <div class="text-gray-600 font-medium">Hài lòng</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Content Slot -->
          <slot />
        </div>
      </main>
    </div>
  </main>

  <!-- Modern Footer -->
  <div class="bg-white">
    <MoleculesFooter />
  </div>
</template>

<script setup lang="ts">
import { List, Search, MapPin } from "lucide-vue-next";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper/modules";
import { availableTags } from "~/types/tags";
import { locations } from "@/types/locations";

// Enhanced slides with better images
const slides = [
  "/images/header/banner2.avif",
  "/images/header/banner3.avif",
  "/images/header/banner2.avif",
];

const input = ref("");
const jobCategories = availableTags;

// Quick search tags
const quickTags = [
  "React",
  "Node.js",
  "Python",
  "Laravel",
  "Vue.js",
  "Mobile App",
];

// Search state
const state = reactive({
  q: "",
  jobCategory: "",
  location: "",
});

const router = useRouter();

// Enhanced search handler
const handleSearch = () => {
  const params = new URLSearchParams();

  if (input.value) params.append("q", input.value);
  if (state.jobCategory) params.append("danh-muc", state.jobCategory);
  if (state.location) params.append("dia-diem", state.location);

  router.push(`/tim-kiem-viec-lam?${params.toString()}`);
};

// Quick tag selection
const selectQuickTag = (tag: string) => {
  input.value = tag;
  handleSearch();
};
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) rotate(2deg);
  }
  50% {
    transform: translateY(-10px) rotate(-1deg);
  }
  75% {
    transform: translateY(-30px) rotate(1deg);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg) scale(1);
  }
  33% {
    transform: translateY(-25px) rotate(-2deg) scale(1.1);
  }
  66% {
    transform: translateY(-15px) rotate(1deg) scale(0.9);
  }
}

@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-40px) rotate(3deg);
  }
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
  }
}

@keyframes gradient-shift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes gradient-pulse {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes gradient-text {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up-delayed {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes progress {
  from {
    width: 0%;
  }
  to {
    width: 25%;
  }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 10s ease-in-out infinite;
  animation-delay: -2s;
}

.animate-float-slow {
  animation: float-slow 12s ease-in-out infinite;
  animation-delay: -4s;
}

.animate-twinkle {
  animation: twinkle 4s ease-in-out infinite;
}

.animate-spin-very-slow {
  animation: spin 30s linear infinite;
}

.animate-gradient-shift {
  animation: gradient-shift 8s ease-in-out infinite;
  background-size: 200% 200%;
}

.animate-gradient-pulse {
  animation: gradient-pulse 4s ease-in-out infinite;
}

.animate-gradient-text {
  animation: gradient-text 3s ease-in-out infinite;
  background-size: 200% 200%;
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out 0.2s both;
}

.animate-fade-in-up-delayed {
  animation: fade-in-up-delayed 1s ease-out 0.6s both;
}

.animate-slide-up {
  animation: slide-up 1s ease-out 0.8s both;
}

.animate-progress {
  animation: progress 3s ease-out infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
/* Modern glassmorphism styles */
.hero-swiper {
  border-radius: 1rem;
  overflow: hidden;
}

/* Premium Element UI styles */
:deep(.premium-select .el-input__wrapper) {
  box-shadow: none !important;
  border: none !important;
  border-radius: 0 !important;
  padding: 0 !important;
  background: transparent !important;
  transition: all 0.3s ease;
}

:deep(.premium-input .el-input__wrapper) {
  box-shadow: none !important;
  border: none !important;
  border-radius: 0 !important;
  padding: 0 !important;
  background: transparent !important;
  transition: all 0.3s ease;
}

:deep(.premium-select .el-input__inner),
:deep(.premium-input .el-input__inner) {
  color: #111827 !important;
  font-size: 1rem !important;
  font-weight: 600 !important;
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
  height: auto !important;
  line-height: 1.5 !important;
}

:deep(.premium-select .el-input__inner::placeholder),
:deep(.premium-input .el-input__inner::placeholder) {
  color: #9ca3af !important;
  font-weight: 500 !important;
}

/* Premium dropdown styles */
:deep(.premium-popper) {
  border-radius: 1rem !important;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  padding: 0.5rem !important;
  backdrop-filter: blur(16px) !important;
  background: rgba(255, 255, 255, 0.95) !important;
}

:deep(.premium-popper .el-select-dropdown__item) {
  padding: 0.875rem 1.25rem;
  border-radius: 0.75rem;
  margin: 0.125rem 0;
  font-weight: 600;
  transition: all 0.3s ease;
  color: #374151;
}

:deep(.premium-popper .el-select-dropdown__item:hover) {
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  color: #1f2937;
  transform: translateX(4px);
}

:deep(.premium-popper .el-select-dropdown__item.selected) {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #1e40af;
  font-weight: 700;
}

/* Remove select arrow */
:deep(.el-select .el-input .el-select__caret) {
  display: none;
}

/* Swiper enhancements */
:deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
  opacity: 1;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background: white;
  transform: scale(1.2);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  :deep(.modern-select .el-input__wrapper),
  :deep(.modern-input .el-input__wrapper) {
    padding: 0.625rem 0.875rem 0.625rem 2.5rem;
  }
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

/* Hover effects for stats */
.stats-item:hover {
  transform: translateY(-2px);
  transition: transform 0.3s ease;
}
</style>
