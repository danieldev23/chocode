<template>
  <div class="">
    <!-- Main Content -->
    <main class="pt-16 min-h-screen bg-gray-50">
      <!-- Ad Banner -->
      <img
        src="~/assets/images/header/banner.png"
        class="ads-banner bg-gray-200 mx-auto text-center my-8 rounded-lg 2xl:"
      />
      <!-- <span class="text-4xl font-bold text-white">ADS</span> -->

      <div class="flex gap-6 mx-auto w-[1326px] px-4">
        <!-- Sidebar -->
        <aside class="w-64 shrink-0">
          <div class="bg-white p-4 shadow-sm rounded-lg">
            <div class="mb-4 rounded-lg bg-blue-50 p-2">
              <div class="flex items-center text-primary">
                <span class="mr-2 text-lg">📋</span>
                <span class="font-medium">ChoCode.Com</span>
              </div>
            </div>

            <nav class="space-y-2">
              <NuxtLink
                v-for="(item, index) in menuItems"
                :key="index"
                :to="item.path"
                class="flex items-center p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-blue-50 transition-colors"
              >
                <span class="mr-3 text-lg">{{ item.icon }}</span>
                <span>{{ item.name }}</span>
              </NuxtLink>
            </nav>
          </div>
        </aside>

        <!-- Content -->
        <div class="flex-1">
          <div class="flex items-center mb-6">
            <div class="relative flex-1">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Tìm kiếm..."
                class="w-full h-11 rounded-lg border border-gray-200 pl-4 pr-10 focus:outline-none focus:border-primary"
              />
              <span class="absolute right-3 top-2.5 text-gray-400">🔍</span>
            </div>
            <button
              class="ml-4 h-11 px-8 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Tìm kiếm
            </button>
          </div>

          <div
            v-if="showHotNews"
            class="mb-3 rounded-lg bg-white p-4 shadow-sm"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="flex flex-row">
                  <span class="mr-2 text-primary">🔥</span>
                  <span class="font-medium mr-4 text-nowrap">Tin hot:</span>
                </div>
                <marquee
                  class="marquee-tag mx-auto cursor-pointer hover:text-primary"
                  
                  >[HOT] Thử nghiệm ra mắt tính năng Chat mới trên
                  <span class="text-primary">CodeMarket.com</span>, mang đến
                  trải nghiệm giao tiếp trực tiếp giữa freelancer và khách hàng,
                  giúp kết nối nhanh chóng và hiệu quả hơn.</marquee
                >
              </div>
              <button
                @click="showHotNews = false"
                class="text-gray-400 hover:text-gray-600 rounded-full"
              >
                ✕
              </button>
            </div>
          </div>

          <div class="rounded-lg bg-white p-8 shadow-md mb-3">
            <div class="flex items-center justify-between">
              <div class="max-w-xl">
                <h1 class="text-3xl font-bold mb-4">
                  Nền tảng dành tìm việc Freelance IT
                </h1>
                <p class="text-gray-600 mb-8">
                  <b class="text-primary">CodeMarket</b> là nền tảng giúp
                  freelancer và khách hàng dễ dàng kết nối, tìm kiếm cơ hội hợp
                  tác và xây dựng mối quan hệ lâu dài, uy tín.
                </p>
                <NuxtLink
                  class="inline-block px-8 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  Đặt câu hỏi ngay
                </NuxtLink>
              </div>
              <img
                src="~/assets/images/header/work.svg"
                alt="Work illustration"
                class="w-96 h-64 object-cover rounded-lg"
              />
            </div>
          </div>
          <div class="bg-transparent flex space-x-2 mb-3">
            <NuxtLink to="" class="cursor-pointer">
              <img
                src="~/assets/images/header/banner-welcome.png"
                alt="Work illustration"
                class="rounded-lg h-[8rem]"
            /></NuxtLink>
            <NuxtLink to="" class="cursor-pointer">
              <img
                src="~/assets/images/header/banner-comingsoon.png"
                alt="Work illustration"
                class="rounded-lg h-[8rem]"
            /></NuxtLink>
            <NuxtLink to="" class="cursor-pointer">
              <img
                src="~/assets/images/header/banner-ai.png"
                alt="Work illustration"
                class="rounded-lg h-[8rem]"
            /></NuxtLink>
            <NuxtLink to="" class="cursor-pointer">
              <img
                src="~/assets/images/header/it-forum.png"
                alt="Work illustration"
                class="rounded-lg h-[8rem]"
            /></NuxtLink>
          </div>
          <div>
            <h3 class="text-center text-2xl font-semibold mb-3">
              Các công việc được quan tâm nhất
            </h3>
            <div class="space-y-4">
              <div
                v-for="job in jobs"
                :key="job.id"
                class="border rounded-lg p-6 bg-white shadow-sm"
              >
                <NuxtLink
                  :to="job.link"
                  class="text-primary hover:underline font-semibold text-lg mb-2 block"
                >
                  {{ job.title }}
                </NuxtLink>

                <div class="text-gray-600 mb-3">{{ job.author }}</div>

                <div
                  class="flex justify-between items-center text-sm text-gray-500 mb-4"
                >
                  <span
                    >{{ job.location }} | {{ job.category }} |
                    {{ job.budget }}</span
                  >
                  <span>{{ job.deadline }}</span>
                </div>

                <p class="text-gray-700 mb-4">
                  {{ job.description }}
                  <NuxtLink
                    :to="job.detailsLink"
                    class="text-primary hover:underline ml-1 font-medium"
                  >
                    Xem thêm
                  </NuxtLink>
                </p>

                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(skill, index) in job.skills"
                    :key="index"
                    :class="[
                      'px-3 py-1 rounded-md text-sm',
                      index === 0
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600',
                    ]"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { MessageSquare, Store, BriefcaseBusiness, User } from "lucide-vue-next";
import { ArrowDown } from "@element-plus/icons-vue";

const currentUser = ref(false);
const centerDialogVisible = ref(false);
const searchQuery = ref("");
const showHotNews = ref(true);
const jobs = ref([
  {
    id: 1,
    title:
      "[Tuyển Freelancer] Phát triển Website Thuê Sách Trực Tuyến (Custom Code)",
    author: "Ninh Phan Trí",
    location: "TP. Hồ Chí Minh",
    category: "Lập trình web",
    budget: "30.000.000 đ - 50.000.000 đ",
    deadline: "Hạn nhận hồ sơ: 16 giờ 56 phút",
    description:
      "Tôi đang tìm kiếm một freelancer chuyên nghiệp để phát triển website dịch vụ thuê sách trực tuyến dựa trên mô hình kinh doanh đã có. Website cần được thiết kế tùy chỉnh để đáp ứng các yêu cầu đặc thù...",
    skills: [
      "Xây dựng website thương mại điện tử",
      "CSS",
      "HTML",
      "Java",
      "Javascript",
      "MongoDB",
      "MySQL",
      "Node.js",
      "Laravel",
      "PostgreSQL",
    ],
    link: "/",
    detailsLink: "/details",
  },
  {
    id: 2,
    title: "Làm web theo mẫu trên mạng",
    author: "Hoàng Trung Nam",
    location: "TP. Hồ Chí Minh",
    category: "Lập trình web",
    budget: "5.000.000 đ - 15.000.000 đ",
    deadline: "Hạn nhận hồ sơ: 22 ngày 10 giờ",
    description:
      "Làm web theo mẫu trên mạng tương tự với website: https://credent.net/...",
    skills: ["Phát triển ứng dụng web", ".NET"],
    link: "/",
    detailsLink: "/details",
  },
]);

const menuItems = [
  { name: "Tất cả", icon: "🔄", path: "/" },
  { name: "JavaScript", icon: "🟨", path: "/javascript" },
  { name: "Python", icon: "🐍", path: "/python" },
  { name: "Java", icon: "☕", path: "/java" },
  { name: "React", icon: "⚛️", path: "/react" },
  { name: "PHP", icon: "🐘", path: "/php" },
  { name: "Go", icon: "🔵", path: "/golang" },
  { name: "Ruby", icon: "💎", path: "/ruby" },
  { name: "Swift", icon: "🕊️", path: "/swift" },
  { name: "TypeScript", icon: "📘", path: "/typescript" },
  { name: "C++", icon: "⚡", path: "/cpp" },
  { name: "Rust", icon: "🦀", path: "/rust" },
  { name: "Kotlin", icon: "🎯", path: "/kotlin" },
  { name: "Vue", icon: "💚", path: "/vue" },
  { name: "Angular", icon: "🔺", path: "/angular" },
];
</script>
