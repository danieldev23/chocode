<template>
  <div class="space-y-6 mb-16">
    <!-- Hero Video Banner -->
    <div class="relative w-full rounded-lg overflow-hidden group">
      <video
        class="rounded-md shadow-md w-full h-[400px] object-cover transform transition-transform duration-700 group-hover:scale-105"
        src="~/assets/videos/banner-video.mp4"
        autoplay
        muted
        loop
        playsinline
      ></video>
      
      Gradient Overlay
      <div class="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50"></div>
      
      <!-- Text Content -->
      <div class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <h1 class="text-2xl md:text-4xl font-bold text-white mb-4 tracking-wide">
          Chào mừng đến với nền tảng CodeMarket
        </h1>
        <p class="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
          Khám phá, chia sẻ và phát triển cùng cộng đồng lập trình viên hàng đầu
        </p>
        <div class="mt-8 flex gap-4">
          <el-button type="primary" size="large" class="!font-semibold">
            Khám phá ngay
          </el-button>
          <el-button type="default" size="large" class="!font-semibold !text-black !border-white text-base">
            Tìm hiểu thêm
          </el-button>
        </div>
      </div>
    </div>

    <!-- CSS Marquee Section -->
    <div class="marquee-container">
      <div class="marquee-content">
        <!-- First set of items -->
        <div class="flex space-x-4">
          <NuxtLink 
           
            class="group cursor-pointer flex-shrink-0 relative overflow-hidden rounded-lg"
          >
            <img
              src="~/assets/images/home/marketplace.jpeg"
              alt="banner.alt"
              class="h-[8rem] w-auto object-cover transform transition-all duration-300 group-hover:scale-105"
            />
            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span class="text-white font-medium text-sm">{{ 2323 }}</span>
            </div>
          </NuxtLink>
          <NuxtLink 
           
           class="group cursor-pointer flex-shrink-0 relative overflow-hidden rounded-lg"
         >
           <img
             src="~/assets/images/home/marketplace.jpeg"
             alt="banner.alt"
             class="h-[8rem] w-auto object-cover transform transition-all duration-300 group-hover:scale-105"
           />
           <!-- Hover Overlay -->
           <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
             <span class="text-white font-medium text-sm">{{ 2323 }}</span>
           </div>
         </NuxtLink>
         <NuxtLink 
           
           class="group cursor-pointer flex-shrink-0 relative overflow-hidden rounded-lg"
         >
           <img
             src="~/assets/images/home/marketplace.jpeg"
             alt="banner.alt"
             class="h-[8rem] w-auto object-cover transform transition-all duration-300 group-hover:scale-105"
           />
           <!-- Hover Overlay -->
           <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
             <span class="text-white font-medium text-sm">{{ 2323 }}</span>
           </div>
         </NuxtLink>
         <NuxtLink 
           
           class="group cursor-pointer flex-shrink-0 relative overflow-hidden rounded-lg"
         >
           <img
             src="~/assets/images/home/marketplace.jpeg"
             alt="banner.alt"
             class="h-[8rem] w-auto object-cover transform transition-all duration-300 group-hover:scale-105"
           />
           <!-- Hover Overlay -->
           <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
             <span class="text-white font-medium text-sm">{{ 2323 }}</span>
           </div>
         </NuxtLink>
         <NuxtLink 
           
           class="group cursor-pointer flex-shrink-0 relative overflow-hidden rounded-lg"
         >
           <img
             src="~/assets/images/home/marketplace.jpeg"
             alt="banner.alt"
             class="h-[8rem] w-auto object-cover transform transition-all duration-300 group-hover:scale-105"
           />
           <!-- Hover Overlay -->
           <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
             <span class="text-white font-medium text-sm">{{ 2323 }}</span>
           </div>
         </NuxtLink>
        </div>

  
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
const banners = [
  {
    id: 1,
    image: '~/assets/images/header/banner-welcome.png',
    alt: 'Welcome Banner',
    link: '',
    title: 'Chào mừng bạn đến với CodeMarket'
  },
  {
    id: 2,
    image: '~/assets/images/header/banner-comingsoon.png',
    alt: 'Coming Soon Banner',
    link: '',
    title: 'Tính năng mới sắp ra mắt'
  },
  {
    id: 3,
    image: '~/assets/images/header/banner-ai.png',
    alt: 'AI Banner',
    link: '',
    title: 'Khám phá AI Studio'
  },
  {
    id: 4,
    image: '~/assets/images/header/it-forum.png',
    alt: 'IT Forum Banner',
    link: '',
    title: 'Diễn đàn công nghệ'
  },
  {
    id: 5,
    image: '~/assets/images/home/marketplace.jpeg',
    alt: 'Marketplace Banner',
    link: '',
    title: 'Khám phá Marketplace'
  },
  {
    id: 6,
    image: '~/assets/images/header/community.png',
    alt: 'Community Banner',
    link: '',
    title: 'Cộng đồng lập trình viên'
  }
];


</script>

<style scoped>
/* Marquee Container */
.marquee-container {
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 1rem 0;
}

/* Gradient masks for smooth edges */
.marquee-container::before,
.marquee-container::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100px;
  z-index: 2;
  pointer-events: none;
}

.marquee-container::before {
  left: 0;
  background: linear-gradient(to right, white, transparent);
}

.marquee-container::after {
  right: 0;
  background: linear-gradient(to left, white, transparent);
}

/* Marquee Content and Animation */
.marquee-content {
  display: flex;
  animation: scroll 40s linear infinite;
}

/* Pause animation on hover */
.marquee-container:hover .marquee-content {
  animation-play-state: paused;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Optional: Add animation for stats */
@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-item {
  animation: countUp 0.8s ease-out forwards;
}
</style>