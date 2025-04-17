<template>
  <div class="w-full bg-white my-6">
    <div class="mx-4 md:mx-16 lg:mx-32 xl:mx-[12rem] mt-4 md:mt-16 lg:mt-10">
      <div class="flex flex-col md:flex-row gap-6 md:gap-14 pt-[3rem]">
        <!-- Left Section -->
        <div class="mt-6 flex-1 px-16 py-14">
          <!-- Features -->
          <div class="my-6">
            <div
              class="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10"
            >
              <div class="flex items-center">
                <CircleCheckBig class="w-5 h-5 mr-1 text-green-500" />
                <span class="text-sm md:text-base">Đăng ký miễn phí</span>
              </div>
              <div class="flex items-center">
                <ShieldCheck class="w-5 h-5 mr-1 text-primary" />
                <span class="text-sm md:text-base">Thanh toán an toàn</span>
              </div>
            </div>
          </div>

          <!-- Headline -->
          <div class="my-6 md:my-8">
            <h1
              class="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight"
            >
              <span class="text-gray-700">SĂN</span>
              <span class="text-transparent bg-secondary-gradient bg-clip-text">
                JOB
              </span>
              <span class="text-gray-700">XỊN</span>
            </h1>
            <h2 class="text-xl md:text-2xl lg:text-3xl font-bold mt-2">
              <span class="text-gray-700">TÌM</span>
              <span class="text-transparent bg-primary-gradient bg-clip-text">
                DEV
              </span>
              <span class="text-gray-700">GIỎI, CHỈ CÓ TẠI</span>
            </h2>
            <h2 class="text-xl md:text-2xl lg:text-3xl font-bold text-primary">
              CHOCODE.COM
            </h2>
          </div>

          <!-- Tagline -->
          <div class="my-4">
            <p class="text-gray-600 text-sm md:text-base">
              "Cơ hội trong tay, bắt đầu ngay hôm nay!"
            </p>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 my-6">
            <button
              class="bg-primary-gradient text-white px-4 py-2 md:px-6 md:py-2 rounded-full hover:bg-primary transition text-sm md:text-base"
            >
              Tôi muốn tìm việc
            </button>
            <button
              class="bg-white text-primary border border-primary px-4 py-2 md:px-6 md:py-2 rounded-full hover:bg-blue-50 transition text-sm md:text-base"
            >
              Bạn muốn tìm Developer xịn?
            </button>
          </div>
        </div>

        <!-- Right Section (Image) -->
        <div class="flex justify-center md:flex-none">
          <img
            src="~/assets/images/home/working-guy.png"
            class="w-full max-w-[20rem] md:max-w-[24rem] lg:max-w-[36rem] image-bounce p-4 md:p-12"
            alt="Working Guy"
          />
        </div>
      </div>
    </div>
  </div>
  <div>
    <!-- Media Coverage Section -->
    <div>
      <HomeMediacoverage
        class="mx-4 md:mx-16 lg:mx-32 xl:mx-[12rem] rounded-md"
      />
    </div>
  </div>
  <div class="parttern2">
    <div class="mx-4 md:mx-16 lg:mx-32 xl:mx-[12rem] mt-4 md:mt-16 lg:mt-5">
      <!-- Header with customer rating label -->
      <div
        class="bg-purple-50 text-purple-700 py-2 px-4 rounded-md inline-block mb-6"
      >
        <span class="text-sm font-medium">Đánh giá từ khách hàng</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Column -->
        <div class="space-y-6">
          <h1 class="text-4xl font-bold text-gray-800">25k+ Doanh Nghiệp</h1>
          <p class="text-gray-600">
            Đặt niềm tin vào sử dụng dịch vụ máy chủ tại InterData
          </p>

          <div class="flex items-start space-x-16 mt-12">
            <!-- Users Stat -->
            <div class="text-center">
              <img
                src="~/assets/images/home/users.png"
                class="w-12 h-10 text-primary mx-auto mt-[0.3rem]"
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
                  freelancer IT chất lượng cao, và nền tảng này đã mang đến trải
                  nghiệm tuyệt vời. Hệ thống đấu thầu minh bạch, quy trình làm
                  việc rõ ràng, giúp tôi nhanh chóng tìm được lập trình viên phù
                  hợp cho dự án của mình. Đây chắc chắn là nơi tôi sẽ tiếp tục
                  sử dụng lâu dài."
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
                  "Nền tảng này thực sự xuất sắc! Tôi đã thuê nhiều freelancer
                  IT và tất cả đều chuyên nghiệp, làm việc nhanh chóng và hiệu
                  quả. Đặc biệt, tôi rất ấn tượng với hệ thống đánh giá và bảo
                  đảm chất lượng, giúp tôi yên tâm khi làm việc từ xa. Rất đáng
                  để trải nghiệm!"
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
                  "Là một freelancer IT, tôi luôn tìm kiếm cơ hội hợp tác với
                  những khách hàng uy tín. Nhờ nền tảng này, tôi đã có thể tiếp
                  cận nhiều dự án chất lượng, đảm bảo nguồn thu nhập ổn định. Hệ
                  thống đấu thầu và thanh toán minh bạch giúp tôi làm việc một
                  cách an tâm và chuyên nghiệp."
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
    <div class="mx-4 md:mx-16 lg:mx-32 xl:mx-[12rem] mt-6 md:mt-16 lg:my-8">
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
              <img src="~/assets/images/home/target.png" class="w-10 h-10" />
            </div>
          </div>
          <p class="text-gray-600">
            Nền tảng kết nối freelancer IT với khách hàng, giúp doanh nghiệp tìm
            kiếm lập trình viên chất lượng cao để phát triển phần mềm, ứng dụng
            web và mobile.
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
            Cung cấp dịch vụ bảo mật cho website, ứng dụng và hệ thống doanh
            nghiệp, đảm bảo an toàn dữ liệu với các chuyên gia bảo mật hàng đầu
            từ cộng đồng freelancer.
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
              <img src="~/assets/images/home/upload.png" class="w-10 h-10" />
            </div>
          </div>
          <p class="text-gray-600">
            Hỗ trợ xây dựng hạ tầng Cloud, triển khai hệ thống lưu trữ dữ liệu
            và tối ưu hiệu suất với các chuyên gia DevOps có kinh nghiệm.
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
            Kết nối với hàng ngàn lập trình viên giỏi trong nhiều lĩnh vực:
            Backend, Frontend, Mobile, AI, Blockchain... phù hợp với mọi quy mô
            dự án.
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
              <img src="~/assets/images/home/cloud.png" class="w-10 h-10" />
            </div>
          </div>
          <p class="text-gray-600">
            Tìm kiếm freelancer giúp doanh nghiệp quản lý, bảo trì hệ thống
            CNTT, tối ưu hiệu suất và đảm bảo hoạt động ổn định.
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
            Đội ngũ freelancer chuyên nghiệp giúp bạn xây dựng website từ đơn
            giản đến phức tạp, tối ưu trải nghiệm người dùng và chuẩn SEO.
          </p>
        </div>
      </div>
    </div>
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
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Làm mượt chuyển động */
.swiper-slide img {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

/* Thêm hiệu ứng cho nút điều hướng */
.swiper-button-next,
.swiper-button-prev {
  width: 1rem;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}
.swiper-button-prev-custom,
.swiper-button-next-custom {
  position: absolute;
  top: 50%;
  width: 25px; /* Giảm kích thước chiều rộng */
  height: 25px; /* Giảm kích thước chiều cao */
  margin-top: -12.5px;
  z-index: 10;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper-button-prev-custom {
  left: 10px;
}

.swiper-button-next-custom {
  right: 10px;
}
.swiper-button-next:hover,
.swiper-button-prev:hover {
  opacity: 1;
}
</style>
