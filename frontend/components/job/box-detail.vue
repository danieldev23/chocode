<template>
  <div class="job-card max-w-xl border border-gray-200 rounded-lg shadow-sm p-4 bg-white">
    <!-- Header with logo and title -->
    <div class="flex gap-4 mb-4">
      <!-- Company Logo -->
      <div class="w-24 h-24 flex-shrink-0 border border-gray-200 rounded-md flex items-center justify-center bg-white p-2">
        <img src="https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/cong-ty-tnhh-xay-dung-quang-cao-kien-tre-5d81eb8401358.jpg" alt="VietCeramics Logo" class="max-w-full max-h-full object-contain" />
      </div>
      
      <!-- Job Title and Company Info -->
      <div class="flex flex-col">
        <h2 class="text-lg font-semibold text-gray-800">Nhân Viên Kinh Doanh Đại Lý</h2>
        <p class="text-sm text-gray-600 mt-1">CÔNG TY CỔ PHẦN QUỐC TẾ GỐM SỨ VIỆT (VIETCERAMICS)</p>
        <div class="mt-2">
          <span class="text-primary font-medium">7.5 - 10 triệu</span>
        </div>
      </div>
    </div>
    
    <!-- Job Details -->
    <div class="flex items-center gap-6 mb-4 text-sm text-gray-500">
      <div class="flex items-center">
        <MapPin class="w-4 h-4 mr-1.5 text-gray-400" />
        <span>Đà Nẵng</span>
      </div>
      <div class="flex items-center">
        <Calendar class="w-4 h-4 mr-1.5 text-gray-400" />
        <span>1 năm</span>
      </div>
      <div class="flex items-center">
        <Clock class="w-4 h-4 mr-1.5 text-gray-400" />
        <span>Còn 11 ngày</span>
      </div>
    </div>
    
    <!-- Job Description -->
    <div class="mb-4">
      <div class="border-l-4 border-primary pl-3 mb-3">
        <h3 class="text-base font-medium text-gray-800">Mô tả công việc</h3>
      </div>
      
      <p class="text-sm text-gray-700 mb-3">
        Thăm hỏi các đại lý trên khu vực được phân công. Thiết lập, duy trì mối quan hệ đại lý trên địa bàn: Nắm bắt tâm lý, nhu cầu đại lý.
      </p>
      
      <ul class="space-y-2 text-sm text-gray-700">
        <li class="flex items-start">
          <span class="mr-2">-</span>
          <span>Thực hiện các hoạt động hỗ trợ bán hàng tại đại lý: Dán poster, trưng bày gạch, Training sản phẩm...</span>
        </li>
        <li class="flex items-start">
          <span class="mr-2">-</span>
          <span>Quản lý quá trình bán hàng, tư vấn, chốt đơn đại lý theo chỉ tiêu đơn hàng, doanh thu tháng/quý/năm</span>
        </li>
        <li class="flex items-start">
          <span class="mr-2">-</span>
          <span>Thực hiện đúng, đủ những chính sách, chương trình hỗ trợ bán hàng của Công ty đến với đại lý</span>
        </li>
        <li class="flex items-start">
          <span class="mr-2">-</span>
          <span>Lập kế hoạch làm việc rõ ràng và hoàn tất báo cáo đầy đủ, đúng hạn</span>
        </li>
      </ul>
    </div>
    
    <!-- Action Buttons -->
    <div class="flex gap-3">
      <el-button 
        type="success" 
        class="flex-1 !bg-white !text-primary !border-primary hover:!bg-green-50"
      >
        Ứng tuyển
      </el-button>
      <el-button 
        type="success" 
        class="flex-1 !bg-primary !text-white !border-primary hover:!bg-green-600"
      >
        Xem chi tiết
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { MapPin, Calendar, Clock } from 'lucide-vue-next';
</script>

<style scoped>
.job-card {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>