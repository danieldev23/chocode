<script setup lang="ts"></script>

<template>
  <MoleculesHeader />
  <main>
    <div class="w-full bg-gray-50">
      <!-- Main Content -->
      <main class="pt-16 bg-gray-50 overflow-hidden">
        <!-- Ads Banner -->

        <div
          class="mx-4 md:mx-16 lg:mx-32 xl:mx-[19.6rem] mt-4 md:mt-16 lg:mt-5"
        >
          <!-- Banner -->
          <div
            v-if="showHotNews"
            class="rounded-lg bg-white p-4 shadow-sm max-w-full my-3"
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
          <img src="~/assets/images/header/banner.gif" class="rounded-md" />
          <div class="bg-primary-gradient  py-6 px-4 my-6 rounded-md">
            <!-- Main Title -->
            <div class="text-center mb-2">
              <h1 class="text-white text-2xl md:text-3xl font-medium">
                Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn quốc.
              </h1>
            </div>

            <!-- Subtitle -->
            <div class="text-center mb-6">
              <p class="text-white text-sm md:text-base">
                Tiếp cận <span class="font-bold">40,000+</span> tin tuyển dụng
                việc làm mới ngày từ hàng nghìn doanh nghiệp uy tín tại Việt Nam
              </p>
            </div>

            <!-- Search Bar -->
            <div class="max-w-5xl mx-auto ">
              <div
                class="flex flex-col md:flex-row items-stretch gap-2 border border-primary lg:rounded-full overflow-hidden shadow-sm bg-white"
              >
                <!-- Job Category Input -->
                <div
                  class="relative flex-1 w-full border-b md:border-b-0 md:border-r border-gray-300"
                >
                  <div class="flex items-center h-full px-3 py-2.5">
                    <List class="text-gray-400 mr-2 flex-shrink-0 w-5 h-5" />
                    <el-select
                      v-model="state.jobCategory"
                      placeholder="Danh mục Nghề"
                      class="flex-1 !border-none !shadow-none w-full"
                      popper-class="!rounded-xl"
                    >
                      <el-option value="it" label="IT" />
                      <el-option value="marketing" label="Marketing" />
                      <el-option value="sales" label="Sales" />
                      <el-option value="design" label="Design" />
                    </el-select>
                    <button
                      v-if="state.jobCategory"
                      @click="state.jobCategory = ''"
                      class="text-gray-400 hover:text-gray-600 flex-shrink-0"
                    >
                      <X class="w-4 h-4 ml-2" />
                    </button>
                    <ChevronDown
                      class="text-gray-400 w-4 h-4 flex-shrink-0 ml-1"
                    />
                  </div>
                </div>

                <!-- Search Input -->
                <div
                  class="relative flex-1 w-full border-b md:border-b-0 md:border-r border-gray-300"
                >
                  <div class="flex items-center h-full px-3 py-2.5">
                    <Search class="text-gray-400 mr-2 flex-shrink-0 w-5 h-5" />
                    <el-input
                      v-model="input"
                      placeholder="Website, Javascript, Php,..."
                      class="flex-1 border focus:border-primary !shadow-none "
                    />
                    <button
                      v-if="input"
                      @click="input = ''"
                      class="text-gray-400 hover:text-gray-600 flex-shrink-0"
                    >
                      <X class="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <!-- Location Input -->
                <div
                  class="relative flex-1 w-full border-b md:border-b-0 md:border-r border-gray-300"
                >
                  <div class="flex items-center h-full px-3 py-2.5">
                    <MapPin class="text-gray-400 mr-2 flex-shrink-0 w-5 h-5" />
                    <el-select
                      v-model="state.location"
                      placeholder="Địa điểm"
                      class="flex-1 !border-none !shadow-none w-full"
                      popper-class="!rounded-xl"
                    >
                      <el-option value="hanoi" label="Hà Nội" />
                      <el-option value="danang" label="Đà Nẵng" />
                      <el-option value="hcm" label="TP. Hồ Chí Minh" />
                      <el-option value="cantho" label="Cần Thơ" />
                    </el-select>
                    <button
                      v-if="state.location"
                      @click="state.location = ''"
                      class="text-gray-400 hover:text-gray-600 flex-shrink-0"
                    >
                      <X class="w-4 h-4 ml-2" />
                    </button>
                    <ChevronDown
                      class="text-gray-400 w-4 h-4 flex-shrink-0 ml-1"
                    />
                  </div>
                </div>

                <!-- Search Button -->
                <div class="w-full md:w-auto pl-2 pr-4 py-2">
                  <el-button
                    type="primary"
                    class="w-full h-full pl-6 py-2.5 rounded-md flex pr-16 items-center justify-center bg-primary hover:bg-primary text-white"
                    @click="handleSearch"
                  >
                    <Search class="w-5 h-5 mr-2" />
                    <span>Tìm kiếm</span>
                  </el-button>
                </div>
              </div>
            </div>
          </div>
          <slot />
        </div>
        <div class="w-full bg-white mb-3">
          <div
            class="mx-4 md:mx-16 lg:mx-32 xl:mx-[19.6rem] mt-4 md:mt-16 lg:mt-5"
          >
            <div class="flex gap-x-14">
              <div class="mt-6">
                <div class="my-6">
                  <div class="flex items-center gap-x-10">
                    <div class="flex items-center">
                      <CircleCheckBig class="w-5 h-5 mr-1 text-green-500" />
                      <span>Đăng ký miễn phí</span>
                    </div>
                    <div class="flex items-center">
                      <ShieldCheck class="w-5 h-5 mr-1 text-primary" />
                      <span>Thanh toán an toàn</span>
                    </div>
                  </div>
                </div>
                <div class="my-8">
                  <h1 class="text-4xl font-bold">
                    <span class="text-gray-700">SĂN</span>
                    <span class="text-orange-500"> JOB </span>
                    <span class="text-gray-700">XỊN</span>
                  </h1>
                  <h2 class="text-3xl font-bold mt-2">
                    <span class="text-gray-700">TÌM</span>
                    <span class="text-primary"> DEV </span>
                    <span class="text-gray-700">GIỎI, CHỈ CÓ TẠI</span>
                  </h2>
                  <h2 class="text-3xl font-bold text-primary">CHOCODE.COM</h2>
                </div>

                <!-- Tagline -->
                <div class="my-4">
                  <p class="text-gray-600">
                    "Cơ hội trong tay, bắt đầu ngay hôm nay!"
                  </p>
                </div>

                <!-- CTA Buttons -->
                <div class="flex gap-4 my-6">
                  <button
                    class="bg-primary-gradient text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
                  >
                    Tôi muốn tìm việc
                  </button>
                  <button
                    class="bg-white text-primary border border-primary-gradient px-6 py-2 rounded-full hover:bg-blue-50 transition"
                  >
                    Bạn muốn tìm Developer xịn?
                  </button>
                </div>
              </div>
              <div>
                <img
                  src="~/assets/images/home/working-guy.png"
                  class="w-[36rem] image-bounce p-12"
                />
              </div>
            </div>

            <!-- Role Cards -->
          </div>
        </div>
        <div>
          <!-- Media Coverage Section -->
          <div>
            <HomeMediacoverage
              class="mx-4 md:mx-16 lg:mx-32 xl:mx-[19.6rem] rounded-md"
            />
          </div>
        </div>
        <div class="parttern2">
          <div
            class="mx-4 md:mx-16 lg:mx-32 xl:mx-[19.6rem] mt-4 md:mt-16 lg:mt-5"
          >
            <!-- Header with customer rating label -->
            <div
              class="bg-purple-50 text-purple-700 py-2 px-4 rounded-md inline-block mb-6"
            >
              <span class="text-sm font-medium">Đánh giá từ khách hàng</span>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Left Column -->
              <div class="space-y-6">
                <h1 class="text-4xl font-bold text-gray-800">
                  25k+ Doanh Nghiệp
                </h1>
                <p class="text-gray-600">
                  Đặt niềm tin vào sử dụng dịch vụ máy chủ tại InterData
                </p>

                <div class="flex items-start space-x-16 mt-12">
                  <!-- Users Stat -->
                  <div class="text-center">
                    <img
                      src="~/assets/images/home/users.png"
                      class="w-12 h-10 text-blue-600 mx-auto mt-[0.3rem]"
                    />
                    <div class="mt-4">
                      <h3 class="text-3xl font-bold text-gray-800">30K+</h3>
                      <p class="text-sm text-gray-500 mt-1">Người dùng</p>
                    </div>
                  </div>

                  <!-- Rating Stat -->
                  <div class="text-center">
                    <img
                      src="~/assets/images/home/message3d.png"
                      class="w-12 h-12 mx-auto"
                    />
                    <div class="mt-4">
                      <h3 class="text-3xl font-bold text-gray-800">4.9/5</h3>
                      <div class="flex justify-center mt-1">
                        <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- CTA Button -->
                <button
                  class="bg-primary-gradient hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full mt-12 transition"
                >
                  Trải Nghiệm Ngay!
                </button>
              </div>

              <!-- Right Column - Testimonials -->
              <div class="space-y-6">
                <!-- Testimonial 1 -->
                <div
                  class="bg-white rounded-lg p-6 shadow-sm relative overflow-hidden"
                >
                  <!-- Background Pattern -->
                  <div class="absolute right-0 bottom-0 opacity-10">
                    <div
                      class="w-32 h-32 border-t-2 border-r-2 border-gray-200 -mb-8 -mr-8"
                    ></div>
                  </div>

                  <!-- Rating Stars -->
                  <div class="flex mb-4">
                    <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </div>

                  <div class="flex">
                    <!-- Profile Image -->
                    <img
                      src="https://interdata.vn/assets/peoples/trumvps.jpeg"
                      alt="Mr. Phu Hai Nguyen"
                      class="w-[6rem] h-[6rem] rounded-full object-contain mr-4"
                    />

                    <!-- Testimonial Content -->
                    <div>
                      <p class="text-gray-700 text-sm mb-3">
                        "Tôi đã tìm kiếm một nền tảng giúp tôi kết nối với những
                        freelancer IT chất lượng cao, và nền tảng này đã mang
                        đến trải nghiệm tuyệt vời. Hệ thống đấu thầu minh bạch,
                        quy trình làm việc rõ ràng, giúp tôi nhanh chóng tìm
                        được lập trình viên phù hợp cho dự án của mình. Đây chắc
                        chắn là nơi tôi sẽ tiếp tục sử dụng lâu dài."
                      </p>
                      <div class="text-gray-800 font-semibold">
                        MR.PHU HAI NGUYEN / CEO
                        <span class="text-primary">TRUMPVS</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Testimonial 2 -->
                <div
                  class="bg-white rounded-lg p-6 shadow-sm relative overflow-hidden"
                >
                  <!-- Background Pattern -->
                  <div class="absolute right-0 bottom-0 opacity-10">
                    <div
                      class="w-32 h-32 border-t-2 border-r-2 border-gray-200 -mb-8 -mr-8"
                    ></div>
                  </div>

                  <!-- Rating Stars -->
                  <div class="flex mb-4">
                    <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </div>

                  <div class="flex">
                    <!-- Profile Image -->
                    <img
                      src="~/assets/images/home/huy.jpeg"
                      alt="Mr. Huy Dang"
                      class="w-[6rem] h-[6rem] rounded-full object-cover mr-4"
                    />

                    <!-- Testimonial Content -->
                    <div>
                      <p class="text-gray-700 text-sm mb-3">
                        "Nền tảng này thực sự xuất sắc! Tôi đã thuê nhiều
                        freelancer IT và tất cả đều chuyên nghiệp, làm việc
                        nhanh chóng và hiệu quả. Đặc biệt, tôi rất ấn tượng với
                        hệ thống đánh giá và bảo đảm chất lượng, giúp tôi yên
                        tâm khi làm việc từ xa. Rất đáng để trải nghiệm!"
                      </p>
                      <div class="text-gray-800 font-semibold">
                        Anh Đặng Quốc Huy / Founder
                        <span class="text-primary">ChoCode.Com</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Testimonial 3 -->
                <div
                  class="bg-white rounded-lg p-6 shadow-sm relative overflow-hidden"
                >
                  <!-- Background Pattern -->
                  <div class="absolute right-0 bottom-0 opacity-10">
                    <div
                      class="w-32 h-32 border-t-2 border-r-2 border-gray-200 -mb-8 -mr-8"
                    ></div>
                  </div>

                  <!-- Rating Stars -->
                  <div class="flex mb-4">
                    <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </div>

                  <div class="flex">
                    <!-- Profile Image -->
                    <img
                      src="https://interdata.vn/assets/peoples/xvps.jpg"
                      alt="Mr. Duc Luong"
                      class="w-[6rem] h-[6rem] rounded-full object-cover mr-4"
                    />

                    <!-- Testimonial Content -->
                    <div>
                      <p class="text-gray-700 text-sm mb-3">
                        "Là một freelancer IT, tôi luôn tìm kiếm cơ hội hợp tác
                        với những khách hàng uy tín. Nhờ nền tảng này, tôi đã có
                        thể tiếp cận nhiều dự án chất lượng, đảm bảo nguồn thu
                        nhập ổn định. Hệ thống đấu thầu và thanh toán minh bạch
                        giúp tôi làm việc một cách an tâm và chuyên nghiệp."
                      </p>
                      <div class="text-gray-800 font-semibold">
                        Anh Lương Đức /
                        <span class="text-primary"
                          >Freelancer Fullstack Developer</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="company">
          <div
            class="mx-4 md:mx-16 lg:mx-32 xl:mx-[19.6rem] mt-6 md:mt-16 lg:my-8"
          >
            <h1 class="text-3xl font-bold text-gray-800 mb-8 mt-16">
              Đáp ứng mọi nhu cầu khắt khe của Doanh nghiệp
            </h1>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Service Card 1 -->
              <div
                class="bg-white rounded-lg shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md"
              >
                <div class="flex items-start justify-between mb-4">
                  <h2 class="text-xl font-medium text-gray-800">
                    Phát triển Công nghệ & Phần mềm
                  </h2>
                  <span class="text-sm text-primary font-medium">01</span>
                </div>
                <div class="mb-4">
                  <div
                    class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center"
                  >
                    <img
                      src="~/assets/images/home/target.png"
                      class="w-10 h-10"
                    />
                  </div>
                </div>
                <p class="text-gray-600">
                  Nền tảng kết nối freelancer IT với khách hàng, giúp doanh
                  nghiệp tìm kiếm lập trình viên chất lượng cao để phát triển
                  phần mềm, ứng dụng web và mobile.
                </p>
              </div>

              <!-- Service Card 2 -->
              <div
                class="bg-white rounded-lg shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md"
              >
                <div class="flex items-start justify-between mb-4">
                  <h2 class="text-xl font-medium text-gray-800">
                    Xây dựng giải pháp bảo mật
                  </h2>
                  <span class="text-sm text-primary font-medium">02</span>
                </div>
                <div class="mb-4">
                  <div
                    class="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center"
                  >
                    <img
                      src="~/assets/images/home/security.png"
                      class="text-primary w-10 h-10"
                    />
                  </div>
                </div>
                <p class="text-gray-600">
                  Cung cấp dịch vụ bảo mật cho website, ứng dụng và hệ thống
                  doanh nghiệp, đảm bảo an toàn dữ liệu với các chuyên gia bảo
                  mật hàng đầu từ cộng đồng freelancer.
                </p>
              </div>

              <!-- Service Card 3 -->
              <div
                class="bg-white rounded-lg shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md"
              >
                <div class="flex items-start justify-between mb-4">
                  <h2 class="text-xl font-medium text-gray-800">
                    Giải pháp triển khai hệ thống
                  </h2>
                  <span class="text-sm text-primary font-medium">03</span>
                </div>
                <div class="mb-4">
                  <div
                    class="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center"
                  >
                    <img
                      src="~/assets/images/home/upload.png"
                      class="w-10 h-10"
                    />
                  </div>
                </div>
                <p class="text-gray-600">
                  Hỗ trợ xây dựng hạ tầng Cloud, triển khai hệ thống lưu trữ dữ
                  liệu và tối ưu hiệu suất với các chuyên gia DevOps có kinh
                  nghiệm.
                </p>
              </div>

              <!-- Service Card 4 -->
              <div
                class="bg-white rounded-lg shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md"
              >
                <div class="flex items-start justify-between mb-4">
                  <h2 class="text-xl font-medium text-gray-800">
                    Thuê lập trình viên chuyên nghiệp
                  </h2>
                  <span class="text-sm text-primary font-medium">04</span>
                </div>
                <div class="mb-4">
                  <div
                    class="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center"
                  >
                    <img src="~/assets/images/home/dev.png" class="w-14 h-14" />
                  </div>
                </div>
                <p class="text-gray-600">
                  Kết nối với hàng ngàn lập trình viên giỏi trong nhiều lĩnh
                  vực: Backend, Frontend, Mobile, AI, Blockchain... phù hợp với
                  mọi quy mô dự án.
                </p>
              </div>

              <!-- Service Card 5 -->
              <div
                class="bg-white rounded-lg shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md"
              >
                <div class="flex items-start justify-between mb-4">
                  <h2 class="text-xl font-medium text-gray-800">
                    Hỗ trợ quản lý hệ thống
                  </h2>
                  <span class="text-sm text-primary font-medium">05</span>
                </div>
                <div class="mb-4">
                  <div
                    class="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center"
                  >
                    <img
                      src="~/assets/images/home/cloud.png"
                      class="w-10 h-10"
                    />
                  </div>
                </div>
                <p class="text-gray-600">
                  Tìm kiếm freelancer giúp doanh nghiệp quản lý, bảo trì hệ
                  thống CNTT, tối ưu hiệu suất và đảm bảo hoạt động ổn định.
                </p>
              </div>

              <!-- Service Card 6 -->
              <div
                class="bg-white rounded-lg shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md"
              >
                <div class="flex items-start justify-between mb-4">
                  <h2 class="text-xl font-medium text-gray-800">
                    Thiết kế & lập trình web
                  </h2>
                  <span class="text-sm text-primary font-medium">06</span>
                </div>
                <div class="mb-4">
                  <div
                    class="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center"
                  >
                    <img src="~/assets/images/home/web.png" class="w-10 h-10" />
                  </div>
                </div>
                <p class="text-gray-600">
                  Đội ngũ freelancer chuyên nghiệp giúp bạn xây dựng website từ
                  đơn giản đến phức tạp, tối ưu trải nghiệm người dùng và chuẩn
                  SEO.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </main>
  <div class="bg-white">
    <MoleculesFooter />
  </div>
</template>
<script setup lang="ts">
import {
  Search,
  CircleCheckBig,
  ShieldCheck,
  List,
  MapPin,
  X,
} from "lucide-vue-next";
const input = ref("");
const showHotNews = ref(true);
interface SearchState {
  jobCategory: string;
  location: string;
}

const state = reactive<SearchState>({
  jobCategory: "it",
  location: "danang",
});

const handleSearch = () => {
  console.log("Searching for:", state.jobCategory, state.location);
  // Add your search logic here
};
</script>

<style scoped>
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
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100px;
  z-index: 2;
  pointer-events: none;
}

/* .marquee-container::before {
  left: 0;
  background: linear-gradient(to right, white, transparent);
}

.marquee-container::after {
  right: 0;
  background: linear-gradient(to left, white, transparent);
} */
@keyframes floatAnimation {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.image-bounce {
  animation: floatAnimation 3s ease-in-out infinite;
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
.company {
  background-size: contain;
  background-image: url(~/assets/images/home/parttern.png);
  background-position: center center;
  /* background-repeat: no-repeat; */
}
.parttern2 {
  background-size: 30%;
  background-image: url(~/assets/images/home/parttern2.png);
  background-position: left center;
  background-repeat: no-repeat;
}
</style>
