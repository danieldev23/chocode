<!-- pages/index.vue -->
<template>
  <div class="mx-4 md:mx-16 lg:mx-32 xl:mx-[19.6rem] flex flex-col">
    <main class="flex-grow">
      <div class="container mx-auto py-8">
        <!-- Main section with all categories -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- First Column -->
          <div class="space-y-6">
            <div class="border-b pb-2 mb-4">
              <h2 class="text-xl font-bold text-primary">Chúng tôi là ai?</h2>
            </div>
            <ul class="space-y-3">
              <li>
                <NuxtLink to="/about" class="text-gray-700 hover:text-primary"
                  >Về chúng tôi</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/participate"
                  class="text-gray-700 hover:text-primary"
                  >Tham gia vào đội của chúng tôi</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/contact" class="text-gray-700 hover:text-primary"
                  >Liên hệ với chúng tôi</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/blog" class="text-gray-700 hover:text-primary"
                  >Blog</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/privacy" class="text-gray-700 hover:text-primary"
                  >Chính sách bảo mật</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/terms" class="text-gray-700 hover:text-primary"
                  >Điều khoản dịch vụ</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/cookies" class="text-gray-700 hover:text-primary"
                  >Cài đặt Cookie</NuxtLink
                >
              </li>
            </ul>
          </div>

          <!-- Second Column -->
          <div class="space-y-6">
            <div class="border-b pb-2 mb-4">
              <h2 class="text-xl font-bold text-primary">Tài nguyên</h2>
            </div>
            <ul class="space-y-3">
              <li>
                <NuxtLink to="/support" class="text-gray-700 hover:text-primary"
                  >Trung tâm trợ giúp</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/how-it-works"
                  class="text-gray-700 hover:text-primary"
                  >Cách hoạt động</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/development-plan"
                  class="text-gray-700 hover:text-primary"
                  >Kế hoạch thành viên</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/reviews" class="text-gray-700 hover:text-primary"
                  >Điểm nhấn</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/sitemap" class="text-gray-700 hover:text-primary"
                  >Sitemap</NuxtLink
                >
              </li>
            </ul>
          </div>

          <!-- Third Column - Split in two sections -->
          <div class="space-y-6">
            <!-- Freelance Jobs Section -->
            <div>
              <div class="border-b pb-2 mb-4">
                <h2 class="text-xl font-bold text-primary t">
                  Tìm job freelance
                </h2>
              </div>
              <ul class="space-y-3">
                <li>
                  <NuxtLink
                    to="/jobs/python"
                    class="text-gray-700 hover:text-primary"
                    >Python</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/jobs/csharp"
                    class="text-gray-700 hover:text-primary"
                    >C#</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/jobs/nodejs-mongodb"
                    class="text-gray-700 hover:text-primary"
                    >Nodejs, MongoDB</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/jobs/php-laravel"
                    class="text-gray-700 hover:text-primary"
                    >Php, Laravel</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/jobs/web-development"
                    class="text-gray-700 hover:text-primary"
                    >Web Development</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/jobs/mobile-apps"
                    class="text-gray-700 hover:text-primary"
                    >Ứng dụng di động</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/jobs/reactjs-vuejs"
                    class="text-gray-700 hover:text-primary"
                    >ReactJs, VueJS</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/jobs/html-css-javascript"
                    class="text-gray-700 hover:text-primary"
                    >HTML, CSS, Javascript</NuxtLink
                  >
                </li>
              </ul>
            </div>

            <!-- Find Developer Section -->
          </div>

          <div>
            <div class="border-b pb-2 mb-4">
              <h2 class="text-xl font-bold text-primary">
                Tìm Developer (Khách hàng)
              </h2>
            </div>
            <ul class="space-y-3">
              <li>
                <NuxtLink
                  to="/find/nodejs-developer"
                  class="text-gray-700 hover:text-primary"
                  >Nodejs Developer</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/find/csharp-developer"
                  class="text-gray-700 hover:text-primary"
                  >C# Developer</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/find/web-developer"
                  class="text-gray-700 hover:text-primary"
                  >Web Developer</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/find/mobile-app-developer"
                  class="text-gray-700 hover:text-primary"
                  >Mobile App Developer</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/find/desktop-app-developer"
                  class="text-gray-700 hover:text-primary"
                  >Desktop App Developer</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/find/tools-mmo"
                  class="text-gray-700 hover:text-primary"
                  >Tools MMO</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/find/reactjs-developer"
                  class="text-gray-700 hover:text-primary"
                  >ReactJs Developer</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/find/laravel-developer"
                  class="text-gray-700 hover:text-primary"
                  >Laravel Developer</NuxtLink
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p class="text-center text-sm text-gray-custom">
        © 2025 - <a class="text-primary" href="/">CodeMarket.Com </a> Co, Ltd.
        All Rights Reserved.
      </p>
    </main>

    <!-- Mobile menu -->
    <div
      v-if="mobileMenuOpen"
      class="md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-50"
    >
      <div class="bg-white h-full w-64 shadow-lg p-4">
        <div class="flex justify-between items-center mb-6">
          <img src="~/assets/images/header/logo.svg" class="h-8" />
          <button @click="mobileMenuOpen = false" class="text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const mobileMenuOpen = ref(false);
</script>
