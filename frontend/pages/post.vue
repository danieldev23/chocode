<template>
  <el-breadcrumb separator="/" class="bg-white py-3 rounded-md px-4 mb-6">
    <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
    <el-breadcrumb-item>
      <a href="/">Bài đăng</a>
    </el-breadcrumb-item>
    <el-breadcrumb-item>Danh mục</el-breadcrumb-item>
    <el-breadcrumb-item>Tìm Freelancer</el-breadcrumb-item>
  </el-breadcrumb>

  <div class="bg-white rounded-md mt-3">
    <div class="px-4 py-2">
      <h2 class="text-2xl mb-6 lg:text-primary sm:text-red-300 font-semibold">
        Nhập liệu nội dung website
      </h2>
      <div
        class="border-2 border-dotted rounded-lg border-green-400 p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <!-- Header -->
        <div class="mb-4 border-b pb-2 flex items-center justify-between">
          <h3
            class="text-lg font-semibold text-green-600 flex items-center gap-2"
          >
            <img src="~/assets/images/post/info.png" class="w-6 h-6" />
            THÔNG TIN DỰ ÁN
          </h3>
          <button class="bg-primary-gradient text-white p-2 rounded-md">
            Apply ngay!
          </button>
        </div>

        <!-- Content Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- ID Dự án -->
          <div class="flex items-center gap-2 text-gray-700">
            <img
              src="~/assets/images/post/id.png"
              class="w-5 h-5 text-green-500"
            />
            <span class="font-medium">ID dự án:</span>
            <span>4983943</span>
          </div>

          <!-- Ngày đăng -->
          <div class="flex items-center gap-2 text-gray-700">
            <img
              src="~/assets/images/post/date.png"
              class="w-5 h-5 text-green-500"
            />
            <span class="font-medium">Ngày đăng:</span>
            <span>14/01/2025</span>
          </div>

          <!-- Địa điểm -->
          <div class="flex items-center gap-2 text-gray-700">
            <img
              src="~/assets/images/post/place.png"
              class="w-5 h-5 text-green-500"
            />
            <span class="font-medium">Địa điểm:</span>
            <span>Toàn quốc</span>
          </div>

          <!-- Ngân sách -->
          <div class="flex items-center gap-2 text-gray-700">
            <img
              src="~/assets/images/post/budget.png"
              class="w-5 h-5 text-green-500"
            />
            <span class="font-medium">Ngân sách:</span>
            <span>2.000.000 VNĐ</span>
          </div>

          <!-- Hình thức làm việc -->
          <div class="flex items-center gap-2 text-gray-700">
            <img
              src="~/assets/images/post/form.png"
              class="w-5 h-5 text-green-500"
            />
            <span class="font-medium">Hình thức làm việc:</span>
            <span>Online</span>
          </div>

          <!-- Hình thức trả lương -->
          <div class="flex items-center gap-2 text-gray-700">
            <img
              src="~/assets/images/post/mode.png"
              class="w-5 h-5 text-green-500"
            />
            <span class="font-medium">Hình thức trả lương:</span>
            <span>Trả theo dự án</span>
          </div>
        </div>
        <div class="mt-8 w-full">
          <div class="mb-6 flex items-center gap-2">
            <img
              src="~/assets/images/post/des.png"
              class="w-6 h-6 text-green-500"
            />
            <h3 class="text-xl font-semibold text-primary">Mô tả dự án</h3>
          </div>

          <div class="bg-gray-50 rounded-lg p-6 border border-gray-200 w-full">
            <!-- Tabs mô tả -->
            <el-tabs class="custom-tabs w-full" stretch>
              <el-tab-pane label="Chi tiết công việc">
                <div class="prose w-full max-w-full">
                  <div
                    v-html="description"
                    class="description-content w-full"
                  ></div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="Yêu cầu ứng viên">
                <div class="prose w-full max-w-full">
                  <ul class="space-y-2 w-full">
                    <li class="flex items-center gap-2">
                      <Icon
                        name="material-symbols:check-circle-outline"
                        class="w-5 h-5 text-green-500 flex-shrink-0"
                      />
                      Có kinh nghiệm nhập liệu và xử lý nội dung
                    </li>
                    <li class="flex items-center gap-2">
                      <Icon
                        name="material-symbols:check-circle-outline"
                        class="w-5 h-5 text-green-500 flex-shrink-0"
                      />
                      Tốc độ đánh máy nhanh, chính xác
                    </li>
                    <li class="flex items-center gap-2">
                      <Icon
                        name="material-symbols:check-circle-outline"
                        class="w-5 h-5 text-green-500 flex-shrink-0"
                      />
                      Cẩn thận, tỉ mỉ trong công việc
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
      <!-- <span class="text-base flex items-center "
        ><Clock class="w-4 h-4 mr-1" /> Ngày đăng: 16/01/2025</span
      > -->
      <!-- <p v-html="description" class="mt-3"></p> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const description =
  "<p><strong>I. KIẾN THỨC CƠ BẢN:</strong></p> <p>1. Kh&aacute;i niệm:<br>&nbsp; &nbsp;a) Số nguy&ecirc;n tố:<br>&nbsp; &nbsp;- L&agrave; số tự nhi&ecirc;n lớn hơn 1<br>&nbsp; &nbsp;- Chỉ c&oacute; đ&uacute;ng hai ước số l&agrave; 1 v&agrave; ch&iacute;nh n&oacute;<br>&nbsp; &nbsp;V&iacute; dụ: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29,...</p> <p>&nbsp; &nbsp;b) Hợp số:<br>&nbsp; &nbsp;- L&agrave; số tự nhi&ecirc;n lớn hơn 1<br>&nbsp; &nbsp;- C&oacute; nhiều hơn hai ước số<br>&nbsp; &nbsp;V&iacute; dụ: 4, 6, 8, 9, 10, 12, 14, 15, 16,...</p> <p>2. C&aacute;c t&iacute;nh chất:<br>&nbsp; &nbsp;a) Số nguy&ecirc;n tố:<br>&nbsp; &nbsp;- 2 l&agrave; số nguy&ecirc;n tố chẵn duy nhất<br>&nbsp; &nbsp;- C&aacute;c số nguy&ecirc;n tố từ 3 trở đi đều l&agrave; số lẻ<br>&nbsp; &nbsp;- Mọi số nguy&ecirc;n tố đều l&agrave; số kh&ocirc;ng ho&agrave;n thiện</p> <p>&nbsp; &nbsp;b) Hợp số:<br>&nbsp; &nbsp;- L&agrave; t&iacute;ch của c&aacute;c số nguy&ecirc;n tố<br>&nbsp; &nbsp;- C&oacute; thể ph&acirc;n t&iacute;ch th&agrave;nh thừa số nguy&ecirc;n tố<br>&nbsp; &nbsp;- C&oacute; thể l&agrave; số chẵn hoặc số lẻ</p> <p><strong>II. PHƯƠNG PH&Aacute;P NHẬN BIẾT:</strong></p> <p>1. C&aacute;ch nhận biết số nguy&ecirc;n tố:<br>&nbsp; &nbsp;a) Phương ph&aacute;p liệt k&ecirc; ước:<br>&nbsp; &nbsp;- Liệt k&ecirc; tất cả c&aacute;c ước của số đang x&eacute;t<br>&nbsp; &nbsp;- Nếu số đ&oacute; chỉ c&oacute; 2 ước l&agrave; 1 v&agrave; ch&iacute;nh n&oacute; &rarr; Số nguy&ecirc;n tố</p> <p>&nbsp; &nbsp;b) Phương ph&aacute;p s&agrave;ng Eratosthenes:<br>&nbsp; &nbsp;- Viết c&aacute;c số từ 2 đến n<br>&nbsp; &nbsp;- Gạch bỏ c&aacute;c bội của 2 (trừ 2)<br>&nbsp; &nbsp;- Gạch bỏ c&aacute;c bội của 3 (trừ 3)<br>&nbsp; &nbsp;- Tiếp tục với c&aacute;c số c&ograve;n lại<br>&nbsp; &nbsp;- C&aacute;c số c&ograve;n lại l&agrave; số nguy&ecirc;n tố</p> <p>2. C&aacute;ch nhận biết hợp số:<br>&nbsp; &nbsp;- Kiểm tra xem số đ&oacute; c&oacute; chia hết cho số n&agrave;o kh&aacute;c ngo&agrave;i 1 v&agrave; ch&iacute;nh n&oacute; kh&ocirc;ng<br>&nbsp; &nbsp;- Nếu c&oacute; &rarr; Hợp số</p> <p><strong>III. PH&Acirc;N T&Iacute;CH THỪA SỐ NGUY&Ecirc;N TỐ:</strong></p> <p>1. Quy tắc ph&acirc;n t&iacute;ch:<br>&nbsp; &nbsp;- Chia li&ecirc;n tiếp cho c&aacute;c số nguy&ecirc;n tố từ nhỏ đến lớn<br>&nbsp; &nbsp;- Dừng lại khi thương bằng 1</p> <p>2. Dạng ph&acirc;n t&iacute;ch:<br>&nbsp; &nbsp;N = p₁ᵃ &times; p₂ᵇ &times; p₃ᶜ &times; ...<br>&nbsp; &nbsp;Trong đ&oacute;:<br>&nbsp; &nbsp;- p₁, p₂, p₃,... l&agrave; c&aacute;c số nguy&ecirc;n tố<br>&nbsp; &nbsp;- a, b, c,... l&agrave; c&aacute;c số tự nhi&ecirc;n</p> <p><strong>IV. ỨNG DỤNG:</strong></p> <p>1. T&igrave;m ước v&agrave; bội chung:<br>&nbsp; &nbsp;- ƯCLN: Lấy c&aacute;c thừa số nguy&ecirc;n tố chung với số mũ nhỏ nhất<br>&nbsp; &nbsp;- BCNN: Lấy c&aacute;c thừa số nguy&ecirc;n tố với số mũ lớn nhất</p> <p>2. R&uacute;t gọn ph&acirc;n số:<br>&nbsp; &nbsp;- Ph&acirc;n t&iacute;ch tử v&agrave; mẫu ra thừa số nguy&ecirc;n tố<br>&nbsp; &nbsp;- Tối giản c&aacute;c thừa số chung</p> <p><strong>V. B&Agrave;I TẬP MẪU:</strong></p> <p>1. Kiểm tra số nguy&ecirc;n tố:<br>B&agrave;i to&aacute;n: Kiểm tra 17 c&oacute; phải l&agrave; số nguy&ecirc;n tố kh&ocirc;ng?<br>Giải:<br>- Liệt k&ecirc; ước của 17: 1 v&agrave; 17<br>- V&igrave; 17 chỉ c&oacute; 2 ước &rarr; 17 l&agrave; số nguy&ecirc;n tố</p> <p>2. Ph&acirc;n t&iacute;ch thừa số nguy&ecirc;n tố:<br>B&agrave;i to&aacute;n: Ph&acirc;n t&iacute;ch 60 th&agrave;nh thừa số nguy&ecirc;n tố<br>Giải:<br>60 = 2 &times; 30<br>30 = 2 &times; 15<br>15 = 3 &times; 5<br>Vậy: 60 = 2&sup2; &times; 3 &times; 5</p> <p>3. T&igrave;m ƯCLN v&agrave; BCNN:<br>B&agrave;i to&aacute;n: T&igrave;m ƯCLN v&agrave; BCNN của 24 v&agrave; 36<br>Giải:<br>24 = 2&sup3; &times; 3<br>36 = 2&sup2; &times; 3&sup2;<br>ƯCLN = 2&sup2; &times; 3 = 12<br>BCNN = 2&sup3; &times; 3&sup2; = 72</p> <p><strong>VI. MỞ RỘNG:</strong></p> <p>1. Số nguy&ecirc;n tố sinh đ&ocirc;i:<br>- L&agrave; cặp số nguy&ecirc;n tố hơn k&eacute;m nhau 2 đơn vị<br>- V&iacute; dụ: (3,5), (5,7), (11,13), (17,19)</p> <p>2. Định l&yacute; cơ bản về số học:<br>- Mọi số tự nhi&ecirc;n lớn hơn 1 đều c&oacute; thể ph&acirc;n t&iacute;ch th&agrave;nh t&iacute;ch c&aacute;c thừa số nguy&ecirc;n tố<br>- C&aacute;ch ph&acirc;n t&iacute;ch l&agrave; duy nhất (kh&ocirc;ng kể thứ tự c&aacute;c thừa số)</p> <p><strong>VII. MỘT SỐ LƯU &Yacute;:</strong></p> <p>1. Khi kiểm tra số nguy&ecirc;n tố:<br>- Chỉ cần kiểm tra đến căn bậc hai của số đ&oacute;<br>- Nếu kh&ocirc;ng c&oacute; số n&agrave;o chia hết &rarr; Số nguy&ecirc;n tố</p> <p>2. Khi ph&acirc;n t&iacute;ch thừa số nguy&ecirc;n tố:<br>- Lu&ocirc;n chia cho số nguy&ecirc;n tố nhỏ nhất c&oacute; thể<br>- Ghi số mũ gọn g&agrave;ng<br>- Kiểm tra lại bằng c&aacute;ch nh&acirc;n c&aacute;c thừa số</p> <p>3. Trong t&iacute;nh to&aacute;n:<br>- Số 1 kh&ocirc;ng phải l&agrave; số nguy&ecirc;n tố<br>- Số 2 l&agrave; số nguy&ecirc;n tố chẵn duy nhất<br>- Mọi số chẵn lớn hơn 2 đều l&agrave; hợp số</p>";
</script>
<style scoped>
div#tab-0,
div#tab-1 {
  font-size: 15px;
}
</style>
