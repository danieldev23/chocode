<!-- components/MediaCoverage.vue -->
<template>
  <section
    class="bg-gradient-to-br gradient text-white py-16 relative overflow-hidden"
  >
    <!-- Background pattern/dots overlay -->
    <div
      class="absolute inset-0 bg-cover bg-center opacity-10 shape-img"
      
    ></div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Section Title -->
      <h2 class="text-2xl font-bold text-center mb-16">
        Báo Chí Nói Về Chúng Tôi
      </h2>

      <!-- Media Logos Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        <div
          v-for="(logo, index) in mediaLogos"
          :key="index"
          class="bg-white rounded-lg p-4 flex items-center justify-center h-24 shadow-lg"
        >
          <img :src="logo.src" :alt="logo.name" class="max-h-12 max-w-full" />
        </div>
      </div>

      <!-- Trust Statistics and Info -->
      <div class="grid md:grid-cols-2 gap-10 mb-16">
        <!-- Left Column - Stats -->
        <div class="space-y-8">
          <h3 class="text-3xl font-bold">30.000+ Doanh Nghiệp Tin Tưởng</h3>
          <h4 class="text-2xl font-bold">Nền tảng Freelancer IT Hàng Đầu</h4>
          <p class="text-xl font-semibold">SLA Uptime 99.9%</p>
        </div>

        <!-- Right Column - Description -->
        <div class="space-y-6">
          <p class="text-md">
            Chuyển đổi số bằng cách kết nối doanh nghiệp với freelancer IT chất
            lượng cao, giúp tối ưu chi phí, rút ngắn thời gian phát triển và đẩy
            mạnh hiệu suất kinh doanh.
          </p>

          <p class="text-md">
            Nền tảng freelancer IT này sử dụng hệ thống công nghệ hiện đại, cho
            phép khách hàng dễ dàng đăng dự án, lựa chọn freelancer phù hợp và
            theo dõi tiến độ làm việc trong thời gian thực. Hệ thống đấu thầu
            minh bạch giúp doanh nghiệp có nhiều lựa chọn, linh hoạt mở rộng quy
            mô đội ngũ mà không gặp rủi ro về nhân sự.
          </p>

          <p class="text-md">
            Tối ưu chi phí – Chọn đúng người – Hoàn thành dự án nhanh chóng. <br />
            Hệ thống thanh toán an toàn giúp đảm bảo quyền lợi của cả khách
            hàng lẫn freelancer, giảm thiểu rủi ro trong quá trình hợp tác. <br /> 
            Hỗ trợ kết nối freelancer trên toàn cầu với hệ thống đánh giá chuyên
            sâu, giúp tìm được lập trình viên, designer, chuyên gia DevOps...
            phù hợp với nhu cầu.
          </p>
        </div>
      </div>

      <!-- Stats Counters -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div class="stats-item">
          <div class="text-4xl font-bold mb-2">3+</div>
          <div class="text-lg">Quốc gia & khu vực</div>
        </div>

        <div class="stats-item">
          <div class="text-4xl font-bold mb-2">8K+</div>
          <div class="text-lg">Khách hàng thân thiết</div>
        </div>

        <div class="stats-item">
          <div class="text-4xl font-bold mb-2">6+</div>
          <div class="text-lg">Datacenter trên toàn cầu</div>
        </div>

        <div class="stats-item">
          <div class="text-4xl font-bold mb-2">2+</div>
          <div class="text-lg">Chi nhánh ở Việt Nam</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const mediaLogos = [
  { name: "VTV", src: "https://interdata.vn/assets/partners/vtv.jpg" },
  {
    name: "VnExpress",
    src: "https://interdata.vn/assets/partners/vnexpress.svg",
  },
  { name: "Dan Tri", src: "https://interdata.vn/assets/partners/dantri.svg" },
  { name: "CafeBiz", src: "https://interdata.vn/assets/partners/cafef.svg" },
  {
    name: "Thanh Nien",
    src: "https://interdata.vn/assets/partners/thanhnien.svg",
  },
  { name: "VTV24h", src: "https://interdata.vn/assets/partners/24hcomvn.svg" },
  { name: "VTC News", src: "https://interdata.vn/assets/partners/vtcnews.png" },
  {
    name: "Vietnamnet",
    src: "https://interdata.vn/assets/partners/logo-bao-vietnamnet.png",
  },
];
</script>

<style scoped>
.stats-item {
  transition: transform 0.3s ease;
}

.stats-item:hover {
  transform: translateY(-5px);
}
.gradient {
  background: #00c6ff; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #0072ff, #00c6ff);
  background: linear-gradient(to right, #0072ff, #00c6ff);
}
.shape-img {
  background-position: center right;
  background-image: url(~/assets/images/home/num_shap.png);
}
</style>
