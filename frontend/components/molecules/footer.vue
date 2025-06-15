<!-- pages/index.vue -->
<template>
  <div class="mx-4 md:mx-16 lg:mx-32 xl:mx-[12rem] mt-4 md:mt-8 flex flex-col">
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
                <NuxtLink
                  to="/ve-chung-toi"
                  class="text-gray-700 hover:text-primary text-sm"
                >
                  Về chúng tôi
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/tham-gia"
                  class="text-gray-700 hover:text-primary text-sm"
                >
                  Tham gia vào đội của chúng tôi
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/lien-he"
                  class="text-gray-700 hover:text-primary text-sm"
                >
                  Liên hệ với chúng tôi
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/blog"
                  class="text-gray-700 hover:text-primary text-sm"
                >
                  Blog
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/chinh-sach-bao-mat"
                  class="text-gray-700 hover:text-primary text-sm"
                >
                  Chính sách bảo mật
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/dieu-khoan"
                  class="text-gray-700 hover:text-primary text-sm"
                >
                  Điều khoản dịch vụ
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/cookie"
                  class="text-gray-700 hover:text-primary text-sm"
                >
                  Cài đặt Cookie
                </NuxtLink>
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
                <NuxtLink
                  to="/tro-giup"
                  class="text-gray-700 hover:text-primary text-sm"
                >
                  Trung tâm trợ giúp
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/cach-hoat-dong"
                  class="text-gray-700 hover:text-primary text-sm"
                >
                  Cách hoạt động
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/ke-hoach-thanh-vien"
                  class="text-gray-700 hover:text-primary text-sm"
                >
                  Kế hoạch thành viên
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/diem-nhan"
                  class="text-gray-700 hover:text-primary text-sm"
                >
                  Điểm nhấn
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/sitemap"
                  class="text-gray-700 hover:text-primary text-sm"
                >
                  Sitemap
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Third Column - Freelance Jobs Section -->
          <div class="space-y-6">
            <div>
              <div class="border-b pb-2 mb-4">
                <h2 class="text-xl font-bold text-primary">
                  Tìm job freelance
                </h2>
              </div>
              <ul class="space-y-3">
                <li>
                  <NuxtLink
                    to="/freelance/python"
                    class="text-gray-700 hover:text-primary text-sm"
                  >
                    Python
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/freelance/csharp"
                    class="text-gray-700 hover:text-primary text-sm"
                  >
                    C#
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/freelance/nodejs-mongodb"
                    class="text-gray-700 hover:text-primary text-sm"
                  >
                    Nodejs, MongoDB
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/freelance/php-laravel"
                    class="text-gray-700 hover:text-primary text-sm"
                  >
                    Php, Laravel
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/freelance/web"
                    class="text-gray-700 hover:text-primary text-sm"
                  >
                    Web Development
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/freelance/mobile"
                    class="text-gray-700 hover:text-primary text-sm"
                  >
                    Ứng dụng di động
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/freelance/react-vue"
                    class="text-gray-700 hover:text-primary text-sm"
                  >
                    ReactJs, VueJS
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/freelance/html-css-js"
                    class="text-gray-700 hover:text-primary text-sm"
                  >
                    HTML, CSS, Javascript
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>

          <!-- Fourth Column - Find Developer Section -->
          <div>
            <div class="border-b pb-2 mb-4">
              <h2 class="text-xl font-bold text-primary">
                Tìm Developer (Khách hàng)
              </h2>
            </div>
            <ul class="space-y-3">
              <li>
                <NuxtLink
                  to="/tim-dev/nodejs"
                  class="text-gray-700 hover:text-primary text-sm"
                >
                  Nodejs Developer
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/tim-dev/csharp"
                  class="text-gray-700 hover:text-primary text-sm"
                >
                  C# Developer
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/tim-dev/web"
                  class="text-gray-700 hover:text-primary text-sm"
                >
                  Web Developer
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/tim-dev/mobile"
                  class="text-gray-700 hover:text-primary text-sm"
                >
                  Mobile App Developer
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/tim-dev/desktop"
                  class="text-gray-700 hover:text-primary text-sm"
                >
                  Desktop App Developer
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/tim-dev/tools-mmo"
                  class="text-gray-700 hover:text-primary text-sm"
                >
                  Tools MMO
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/tim-dev/react"
                  class="text-gray-700 hover:text-primary text-sm"
                >
                  ReactJs Developer
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/tim-dev/laravel"
                  class="text-gray-700 hover:text-primary text-sm"
                >
                  Laravel Developer
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p class="text-center text-sm text-gray-custom">
        © 2025 -
        <NuxtLink class="text-primary" to="/">CodeMarket.Com</NuxtLink> Co, Ltd.
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
  <!-- <div
    v-if="showPopup"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-center mx-4"
    >
      <h2 class="text-xl font-semibold text-gray-800 mb-4">
        Vui lòng cập nhật vai trò của bạn
      </h2>
      <p class="text-gray-600 mb-6">
        Hệ thống chưa có thông tin vai trò của bạn. Hãy cập nhật để tiếp tục.
      </p>
      <button
        @click="confirmRoleUpdate"
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition"
      >
        Tôi đã hiểu
      </button>
    </div>
  </div> -->
</template>

<script setup lang="ts">
// import nuxtStorage from 'nuxt-storage';

// const showPopup = ref(false)

// onMounted(() => {
//   const role = nuxtStorage.localStorage.getData('updatedRole')
  
//   // Nếu chưa có hoặc giá trị không phải "done" => hiện popup
//   if (!role || role !== 'done') {
//     showPopup.value = true
//   }
// })

// const confirmRoleUpdate = () => {
//   // Giả sử người dùng đã cập nhật role thành công, lưu vào localStorage
//   nuxtStorage.localStorage.setData('updatedRole', 'done')
//   showPopup.value = false
// }
const mobileMenuOpen = ref(false);
</script>
