<template>
  <div class="min-h-screen my-4">
    <!-- Navigation Breadcrumb -->
    <div class="border-primary-500 mb-2">
      <div class="container mx-auto py-3">
        <div class="flex items-center text-sm text-primary">
          <NuxtLink to="/" class="hover:underline">Trang chủ</NuxtLink>
          <ChevronRight class="w-4 h-4 mx-1" />
          <NuxtLink to="/tim-viec-lam-nhan-vien-kinh-doanh" class="hover:underline">Tìm việc làm Nhân Viên Kinh Doanh</NuxtLink>
          <ChevronRight class="w-4 h-4 mx-1" />
          <span class="text-gray-600">Viêt phần mềm quản lý khách sạn
          </span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column (Job Details) -->
        <div class="lg:col-span-2">
          <!-- Job Main Info Card -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 class="text-2xl font-bold text-gray-800 mb-6">
              Viêt phần mềm quản lý khách sạn

            </h1>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                  <DollarSign class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div class="text-gray-500 text-sm">Ngân sách</div>
                  <div class="font-semibold">40 - 60 triệu</div>
                </div>
              </div>
              
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                  <MapPin class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div class="text-gray-500 text-sm">Địa điểm</div>
                  <div class="font-semibold">Toàn Quốc</div>
                </div>
              </div>
              
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                  <Award class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div class="text-gray-500 text-sm">Kinh nghiệm</div>
                  <div class="font-semibold">1 năm</div>
                </div>
              </div>
            </div>
            
            <div class="flex items-center mb-6">
              <Clock class="w-5 h-5 text-gray-500 mr-2" />
              <span class="text-gray-600">Hạn nộp hồ sơ: 29/03/2025</span>
            </div>

            <div class="flex space-x-3">
              <el-button type="primary" class="w-full flex justify-center items-center">
                <Send class="w-4 h-4 mr-2" />
                Ứng tuyển ngay
              </el-button>
              <el-tooltip content="Lưu" placement="top" effect="light">
                <el-button @click="save" class="w-full md:w-auto flex items-center border">
                <Bookmark class="w-4 h-4 mr-2" />
                Lưu tin
              </el-button>
                </el-tooltip>
             
            </div>
          </div>

          <!-- Job Details Card -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <div class="w-1 h-6 bg-primary mr-3"></div>
              Chi tiết tin tuyển dụng
            </h2>

            <div class="flex flex-wrap gap-2 mb-6">
              <el-tag size="large">Chuyên môn Kinh doanh nội thất</el-tag>
              <el-tag size="large">B2B</el-tag>
              <el-tag size="large">B2C</el-tag>
              <el-tag size="large">Xây dựng</el-tag>
              <el-tag size="large">Thiết kế / Kiến trúc</el-tag>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <img src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/employer_medias/6196817452a1c5d6d0288554130f91d8-67ca511318c5d.jpg" alt="Company image" class="rounded-md w-full">
              <!-- <div class="relative rounded-lg overflow-hidden">
                <img src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/employer_medias/bead6bd6028cf85ab6b2f76f88759de9-67ca5114134ea.jpg" alt="Additional photo" class="rounded-lg">
                <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-xl">
                  +1
                </div>
              </div> -->
            </div>

            <div class="mb-6">
              <h3 class="text-lg font-bold mb-3">Mô tả công việc</h3>
              <ul class="space-y-2 list-inside text-gray-700">
                <li class="flex">
                  <span class="mr-2">-</span>
                  <span>Đánh giá và phân tích nhu cầu của khách hàng</span>
                </li>
                <li class="flex">
                  <span class="mr-2">-</span>
                  <span>Tư vấn sản phẩm Thiết kế - Xây dựng - Nội Thất</span>
                </li>
                <li class="flex">
                  <span class="mr-2">-</span>
                  <span>Đàm phán và ký hợp đồng</span>
                </li>
                <li class="flex">
                  <span class="mr-2">-</span>
                  <span>Duy trì các khách hàng tiềm năng.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-bold mb-3">Yêu cầu ứng viên</h3>
              <ul class="space-y-2 list-inside text-gray-700">
                <li class="flex">
                  <span class="mr-2">•</span>
                  <span>Có kinh nghiệm trong lĩnh vực thiết kế, xây dựng.</span>
                </li>
                <li class="flex">
                  <span class="mr-2">•</span>
                  <span>Đam mê tư vấn, bán hàng.</span>
                </li>
                <li class="flex">
                  <span class="mr-2">•</span>
                  <span>Kỹ năng giao tiếp, thuyết trình, thuyết phục tốt. (Sẽ được đào tạo thêm).</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Right Column (Company Info) -->
        <div class="lg:col-span-1">
          <!-- Company Card -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div class="flex flex-col items-center mb-6">
              <img src="https://cdn-new.topcv.vn/unsafe/80x/https://static.topcv.vn/company_logos/cong-ty-tnhh-thiet-ke-va-xay-dung-uy-vu-f0e952c1dd9751fff44f14f4f3759b20-67bd1b8eb096a.jpg" alt="UY VU Logo" class="w-20 h-20 mb-3">
              <h3 class="text-lg font-bold text-center">CÔNG TY TNHH THIẾT KẾ VÀ XÂY DỰNG UY VŨ</h3>
            </div>

            <div class="space-y-4">
              <div class="flex">
                <Users class="w-5 h-5 text-gray-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <div class="text-gray-500 text-sm">Quy mô:</div>
                  <div>10-24 nhân viên</div>
                </div>
              </div>

              <div class="flex">
                <Briefcase class="w-5 h-5 text-gray-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <div class="text-gray-500 text-sm">Lĩnh vực:</div>
                  <div>Thiết kế / kiến trúc</div>
                </div>
              </div>

              <div class="flex">
                <MapPin class="w-5 h-5 text-gray-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <div class="text-gray-500 text-sm">Đến từ:</div>
                  <div>Đà Nẵng</div>
                </div>
              </div>
            </div>

            <div class="mt-6">
              <el-button type="primary" class="w-full flex items-center justify-center">
                <ExternalLink class="w-4 h-4 mr-2" />
                Ghé thăm trang cá nhân
              </el-button>
            </div>
          </div>

          <!-- General Information Card -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 class="text-lg font-bold mb-4">Thông tin chung</h3>
            
            <div class="space-y-4">
              <div class="flex">
                <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                  <UserCheck class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div class="text-gray-500 text-sm">Cấp bậc</div>
                  <div class="font-medium">Nhân viên</div>
                </div>
              </div>
              
              <div class="flex">
                <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                  <GraduationCap class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div class="text-gray-500 text-sm">Học vấn</div>
                  <div class="font-medium">Trung cấp trở lên</div>
                </div>
              </div>
              
              <div class="flex">
                <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                  <Users class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div class="text-gray-500 text-sm">Số lượng tuyển</div>
                  <div class="font-medium">3 người</div>
                </div>
              </div>
              
              <div class="flex">
                <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                  <Clock class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div class="text-gray-500 text-sm">Hình thức làm việc</div>
                  <div class="font-medium">Làm online</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Related Jobs Category Card -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 class="text-lg font-bold mb-4">Danh mục Nghề liên quan</h3>
            
            <div class="flex flex-wrap gap-2">
              <el-tag size="large">Kinh doanh/Bán hàng</el-tag>
              <el-tag size="large">Bất động sản/Xây dựng</el-tag>
              <el-tag size="large">Sales Bất động sản/Xây dựng</el-tag>
              <el-tag size="large">Kinh doanh nội thất</el-tag>
            </div>
          </div>

          <!-- Location Card -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 class="text-lg font-bold mb-4">Khu vực</h3>
            
            <div class="flex flex-wrap gap-2">
              <el-tag size="large">Đà Nẵng</el-tag>
              <el-tag size="large">Cẩm Lệ</el-tag>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-bold mb-4">Gợi ý việc làm phù hợp</h3>
            <el-popover 
    placement="left"
    width="550"
    trigger="hover"
    teleported
    class="custom-popover"
  >
    <template #reference>
      <div class="border border-gray-200 rounded-md">
        <div class="flex justify-start gap-2 p-2">
          <NuxtLink to="">
            <img 
              src="https://cdn-new.topcv.vn/unsafe/150x/https://static.topcv.vn/company_logos/Ub1FnI8OO8XFJrryvrVSD0vq9gQ3gb7x_1723602274____24eb1708168fa261fc0535d74dddcaa2.jpg" 
              class="w-20 h-20 border border-gray-100 cursor-pointer rounded-md"
            />
          </NuxtLink>
          <div class="flex flex-col">
            <NuxtLink class="text-sm cursor-pointer mb-1">Senior NodeJS</NuxtLink>
            <NuxtLink class="text-xs text-gray-custom cursor-pointer">CHOCODE SOFTWARE CO,. LTD</NuxtLink>
          </div>
        </div>
        <div class="p-2 flex items-center justify-between">
          <div class="flex items-center text-xs gap-x-2 font-thin">
            <NuxtLink class="rounded-full bg-gray-100 py-1 px-3 cursor-pointer">Thoả thuận</NuxtLink>
            <NuxtLink class="rounded-full bg-gray-100 py-1 px-3 cursor-pointer">Đà Nẵng</NuxtLink>
          </div>
          <el-tooltip content="Lưu" placement="top" effect="light">
            <Heart @click="save" class="w-5 h-5 hover:text-red-500 cursor-pointer"/>
          </el-tooltip>
        </div>
      </div>
    </template>

    <!-- Nội dung popover -->
    <JobBoxDetail />
  </el-popover>

            
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ChevronRight, DollarSign, MapPin, Award, Clock, Send, Bookmark, 
  Users, Briefcase, ExternalLink, UserCheck, GraduationCap, Heart } from 'lucide-vue-next';
  const save = () => {
    ElNotification({
      title: 'Thành công',
      message: 'Lưu việc làm thành công',
      type: 'success',
    })
  }

</script>

<style>
.el-button--success {
  background-color: #10b981;
}
@media (max-width: 768px) {
  .custom-popover {
    width: 90% !important; /* Giới hạn tối đa 90% màn hình */
    max-width: 320px !important; /* Giới hạn tối đa */
  }
}
</style>