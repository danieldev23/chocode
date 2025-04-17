

<template>
  <MoleculesHeader />
  <main>
    <div class="w-full bg-gray-50">
      <main class="pt-16 bg-gray-50">
        <div class="mx-4 md:mx-16 lg:mx-32 xl:mx-[12rem] mt-4 md:mt-8">
          <!-- Hot News Banner - Conditionally rendered -->
         
        
          <img
  src="~/assets/images/header/banner2.webp"
  srcset="
    ~/assets/images/header/banner2.webp 600w,
    ~/assets/images/header/banner2.webp 900w,
    ~/assets/images/header/banner2.webp 1200w
  "
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
  class="w-full h-auto rounded-md"
  loading="lazy"
  fetchpriority="high"
  width="1200"
  height="400"
  alt="CodeMarket - Nền tảng tìm việc làm IT, Marketing và Sales hàng đầu Việt Nam"
/>


          
          <!-- Search Section with semantic HTML -->
          <section class="bg-primary-gradient py-6 px-4 my-6 rounded-md" aria-label="Tìm kiếm việc làm">
            <div class="text-center mb-2">
              <h1 class="text-white text-xl md:text-2xl font-medium">
                Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn quốc.
              </h1>
            </div>

            <div class="text-center mb-6">
              <p class="text-white text-sm md:text-base">
                Tiếp cận <span class="font-bold">40,000+</span> tin tuyển dụng
                việc làm mới ngày từ hàng nghìn doanh nghiệp uy tín tại Việt Nam
              </p>
            </div>

            <!-- Improved Search Bar with proper labeling -->
            <div class="max-w-5xl mx-auto">
  <form 
    @submit.prevent="handleSearch"
    class="flex flex-col md:flex-row items-stretch border border-primary rounded-md overflow-hidden shadow-lg bg-white transition-all hover:shadow-xl"
    role="search"
    aria-label="Tìm kiếm việc làm"
  >
    <!-- Job Category Select -->
    <div class="relative flex-1 w-full border-b md:border-b-0 md:border-r border-gray-200 group hover:bg-gray-50 transition-colors">
      <label for="job-category" class="sr-only">Danh mục Nghề</label>
      <div class="flex items-center h-full px-4 py-3">
        <List class="text-primary mr-3 flex-shrink-0 w-5 h-5" aria-hidden="true" />
        <el-select
          id="job-category"
          v-model="state.jobCategory"
          placeholder="Danh mục Nghề"
          class="flex-1 !border-none !shadow-none w-full !text-gray-700"
          popper-class="!rounded-md !shadow-lg"
        >
          <el-option value="it" label="IT" />
          <el-option value="marketing" label="Marketing" />
          <el-option value="sales" label="Sales" />
          <el-option value="design" label="Design" />
        </el-select>
      
      </div>
    </div>

    <!-- Search Input - Được điều chỉnh để giống với các dropdown -->
    <div class="relative flex-1 w-full border-b md:border-b-0 md:border-r border-gray-200 group hover:bg-gray-50 transition-colors">
      <label for="search-keywords" class="sr-only">Từ khóa tìm kiếm</label>
      <div class="flex items-center h-full px-4 py-3">
        <Search class="text-primary mr-3 flex-shrink-0 w-5 h-5" aria-hidden="true" />
        <el-input
          id="search-keywords"
          v-model="input"
          placeholder="Website, Javascript, Php,..."
          class="flex-1 !border-none !shadow-none !text-gray-700"
        />
        <button
          v-if="input"
          @click="input = ''"
          class="text-gray-400 hover:text-primary flex-shrink-0 transition-colors ml-2"
          aria-label="Xóa từ khóa tìm kiếm"
          type="button"
        >
          <X class="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>

    <!-- Location Select -->
    <div class="relative flex-1 w-full border-b md:border-b-0 md:border-r border-gray-200 group hover:bg-gray-50 transition-colors">
      <label for="location-select" class="sr-only">Địa điểm</label>
      <div class="flex items-center h-full px-4 py-3">
        <MapPin class="text-primary mr-3 flex-shrink-0 w-5 h-5" aria-hidden="true" />
        <el-select
          id="location-select"
          v-model="state.location"
          placeholder="Địa điểm"
          class="flex-1 !border-none !shadow-none w-full !text-gray-700"
          popper-class="!rounded-md !shadow-lg"
        >
          <el-option value="hanoi" label="Hà Nội" />
          <el-option value="danang" label="Đà Nẵng" />
          <el-option value="hcm" label="TP. Hồ Chí Minh" />
          <el-option value="cantho" label="Cần Thơ" />
        </el-select>
        
      </div>
    </div>

    <!-- Search Button -->
    <div class="md:flex-shrink-0 p-3">
      <button
        type="submit"
        class="w-full px-4 py-2 rounded-full md:rounded-full flex items-center justify-center bg-primary-gradient hover:bg-primary-dark transition-all text-white font-medium"
      >
        <Search class="w-5 h-5 mr-2" aria-hidden="true" />
        <span>Tìm kiếm</span>
      </button>
    </div>
  </form>
</div>
          </section>
          <slot />
        </div>
      </main>
    </div>
  </main>
  <div class="bg-white">
    <MoleculesFooter />
  </div>
</template>
<script setup lang="ts">


// Import only what's needed
import {
  Search,
  List,
  MapPin,
  X,
  ChevronDown
} from "lucide-vue-next";

// Import only needed Swiper modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// Define constants and reactive variables
const modules = [Pagination, Navigation, Autoplay];
// Preload and optimize banner images
const bannerImages = ref([
  "/images/header/banner3.png", // Converted to WebP format
]);
const input = ref("");
const showHotNews = ref(true);

// Search state with default values
const state = reactive({
  jobCategory: "",
  location: ""
});

// Search handler with analytics tracking
const handleSearch = () => {
  console.log("Searching for:", state.jobCategory, state.location);
  
  // Track search event for analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: input.value,
      job_category: state.jobCategory,
      location: state.location
    });
  }
  
  // Search logic implementation would go here
};

// Lazy-load components
const MoleculesHeader = defineAsyncComponent(() => 
  import('@/components/molecules/Header.vue')
);
const MoleculesFooter = defineAsyncComponent(() => 
  import('@/components/molecules/Footer.vue')
);
</script>
<style scoped>
/* Reset styles for element components */
:deep(.el-input__wrapper) {
  box-shadow: none !important;
  padding: 0 !important;
}

:deep(.el-input__inner) {
  color: #374151;
  background-color: #fff;
  font-size: 14px;
}

:deep(.el-select .el-input .el-select__caret) {
  background-color: transparent !important;
  display: none;
}

:deep(.el-button) {
  font-weight: 500;
  border: none;
}

:deep(.el-select-dropdown__item) {
  padding: 12px 20px;
}

/* Improved CSS Animation for News Scroller with reduced motion preference */
.news-scroller {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.news-text {
  display: inline-block;
  white-space: nowrap;
  animation: scroll-text 20s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .news-text {
    animation: none;
    white-space: normal;
  }
}

@keyframes scroll-text {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

/* Optimized Swiper Styles with hardware acceleration */
.swiper {
  width: 100%;
  height: 100%;
  will-change: transform;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateZ(0);
}

/* Improved navigation button styles with better contrast */
.swiper-button-prev-custom,
.swiper-button-next-custom {
  position: absolute;
  top: 50%;
  width: 32px;
  height: 32px;
  margin-top: -16px;
  z-index: 10;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s ease;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.swiper-button-prev-custom {
  left: 10px;
}

.swiper-button-next-custom {
  right: 10px;
}

.swiper-button-prev-custom:hover,
.swiper-button-next-custom:hover {
  opacity: 1;
}

.swiper-button-prev-custom:focus,
.swiper-button-next-custom:focus {
  outline: 2px solid var(--primary-color);
  opacity: 1;
}

/* Add support for dark mode */
@media (prefers-color-scheme: dark) {
  :deep(.el-input__inner) {
    color: #e5e7eb;
    background-color: #1f2937;
  }
  
  .swiper-button-prev-custom,
  .swiper-button-next-custom {
    background-color: rgba(31, 41, 55, 0.8);
  }
}

/* Add transition for better UX */
.bg-primary-dark {
  background-color: var(--primary-dark-color, #0d47a1);
}

/* Add CSS variables for theme colors */
:root {
  --primary-color: #1e88e5;
  --primary-dark-color: #0d47a1;
}
</style>