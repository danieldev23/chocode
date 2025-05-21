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
              ~/assets/images/header/banner2.webp  600w,
              ~/assets/images/header/banner2.webp  900w,
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
import { Search, List, MapPin, X, ChevronDown } from "lucide-vue-next";

// Import only needed Swiper modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// Define constants and reactive variables
const modules = [Pagination, Navigation, Autoplay];
// Preload and optimize banner images
const bannerImages = ref([
  "/images/header/banner3.png", // Converted to WebP format
]);
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
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
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
    /* background-color: #1f2937; */
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
