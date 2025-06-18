<template>
  <MoleculesHeader />
  <main
    class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50"
  >
    <div class="relative">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          class="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float"
        ></div>
        <div
          class="absolute top-1/4 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float-delayed"
        ></div>
        <div
          class="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-float-slow"
        ></div>
      </div>

      <!-- Main Content -->
      <div class="relative pt-16">
        <!-- Hero Section -->
        <section class="relative py-20 overflow-hidden">
          <div class="container mx-auto px-4">
            <div class="max-w-7xl mx-auto">
              <!-- Hero Content -->
              <div class="text-center mb-16">
                <div
                  class="inline-flex items-center px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/20 mb-8 animate-fade-in-up"
                >
                  <span class="text-blue-600 font-semibold text-lg"
                    >🚀 Nền tảng Freelance IT #1 Việt Nam</span
                  >
                </div>
                <h1
                  class="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in-up-delayed"
                >
                  <span
                    class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600"
                  >
                    Kết nối tài năng
                  </span>
                  <br />
                  <span class="text-gray-900">với cơ hội</span>
                </h1>
                <p
                  class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 animate-fade-in-up-delayed"
                >
                  Khám phá hơn
                  <span class="font-bold text-blue-600">40,000+</span> cơ hội
                  freelance từ các startup và doanh nghiệp hàng đầu
                </p>
              </div>

              <!-- Search Section -->
              <div class="relative max-w-5xl mx-auto">
                <div
                  class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"
                ></div>
                <div
                  class="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
                >
                  <form @submit.prevent="handleSearch" class="space-y-6">
                    <!-- Search Inputs -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <!-- Category -->
                      <div class="relative group">
                        <div
                          class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                        ></div>
                        <div class="relative bg-white rounded-xl p-4">
                          <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                            >Lĩnh vực</label
                          >
                          <el-select
                            v-model="state.jobCategory"
                            placeholder="Chọn lĩnh vực"
                            class="w-full premium-select"
                            popper-class="premium-popper"
                          >
                            <el-option
                              v-for="item in jobCategories"
                              :key="item"
                              :label="item"
                              :value="item"
                            />
                          </el-select>
                        </div>
                      </div>

                      <!-- Skills -->
                      <div class="relative group">
                        <div
                          class="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                        ></div>
                        <div class="relative bg-white rounded-xl p-4">
                          <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                            >Kỹ năng</label
                          >
                          <el-input
                            v-model="input"
                            placeholder="React, Vue.js, Laravel..."
                            class="premium-input border"
                          />
                        </div>
                      </div>

                      <!-- Location -->
                      <div class="relative group">
                        <div
                          class="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                        ></div>
                        <div class="relative bg-white rounded-xl p-4">
                          <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                            >Địa điểm</label
                          >
                          <el-select
                            v-model="state.location"
                            placeholder="Remote / Onsite"
                            class="w-full premium-select font-[16px]"
                            popper-class="premium-popper"
                          >
                            <el-option
                              v-for="location in locations"
                              :value="location"
                              :label="location"
                            />
                          </el-select>
                        </div>
                      </div>
                    </div>

                    <!-- Search Button -->
                    <div class="flex justify-center">
                      <button
                        type="submit"
                        class="relative group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30"
                      >
                        <div
                          class="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        ></div>
                        <span class="relative flex items-center">
                          <Search class="w-5 h-5 mr-2" />
                          Tìm kiếm ngay
                        </span>
                      </button>
                    </div>
                  </form>

                  <!-- Trending Tags -->
                  <div class="mt-8">
                    <div class="flex items-center gap-3 mb-4">
                      <span class="text-sm font-medium text-gray-600"
                        >Trending:</span
                      >
                      <div class="flex flex-wrap gap-2">
                        <button
                          v-for="(tag, index) in quickTags"
                          :key="tag"
                          @click="selectQuickTag(tag)"
                          class="px-4 py-2 text-sm font-medium bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-xl border border-gray-200 hover:border-blue-200 transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5"
                          :class="`animate-fade-in-up delay-${index * 100}`"
                        >
                          #{{ tag }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Stats Section -->
        <section class="py-20">
          <div class="container mx-auto px-4">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
              <!-- Projects -->
              <div class="relative group">
                <div
                  class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                ></div>
                <div class="relative bg-white rounded-2xl p-8">
                  <div
                    class="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  >
                    <span class="text-2xl">💼</span>
                  </div>
                  <div class="text-4xl font-bold text-blue-600 mb-2">40K+</div>
                  <div class="text-gray-600 font-medium">Dự án active</div>
                </div>
              </div>

              <!-- Freelancers -->
              <div class="relative group">
                <div
                  class="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                ></div>
                <div class="relative bg-white rounded-2xl p-8">
                  <div
                    class="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  >
                    <span class="text-2xl">👨‍💻</span>
                  </div>
                  <div class="text-4xl font-bold text-purple-600 mb-2">
                    25K+
                  </div>
                  <div class="text-gray-600 font-medium">IT Freelancer</div>
                </div>
              </div>

              <!-- Companies -->
              <div class="relative group">
                <div
                  class="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                ></div>
                <div class="relative bg-white rounded-2xl p-8">
                  <div
                    class="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  >
                    <span class="text-2xl">🏢</span>
                  </div>
                  <div class="text-4xl font-bold text-pink-600 mb-2">12K+</div>
                  <div class="text-gray-600 font-medium">Công ty tin cậy</div>
                </div>
              </div>

              <!-- Satisfaction -->
              <div class="relative group">
                <div
                  class="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                ></div>
                <div class="relative bg-white rounded-2xl p-8">
                  <div
                    class="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  >
                    <span class="text-2xl">⭐</span>
                  </div>
                  <div class="text-4xl font-bold text-red-600 mb-2">98%</div>
                  <div class="text-gray-600 font-medium">Hài lòng</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Content Slot -->
        <div class="container mx-auto px-4">
          <slot />
        </div>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <div class="bg-white">
    <MoleculesFooter />
  </div>
</template>

<script setup lang="ts">
import { Search } from "lucide-vue-next";
import { availableTags } from "~/types/tags";
import { locations } from "@/types/locations";

const input = ref("");
const jobCategories = availableTags;

// Quick search tags
const quickTags = [
  "React",
  "Node.js",
  "Python",
  "Laravel",
  "Vue.js",
  "Mobile App",
];

// Search state
const state = reactive({
  q: "",
  jobCategory: "",
  location: "",
});

const router = useRouter();

// Enhanced search handler
const handleSearch = () => {
  const params = new URLSearchParams();

  if (input.value) params.append("q", input.value);
  if (state.jobCategory) params.append("danh-muc", state.jobCategory);
  if (state.location) params.append("dia-diem", state.location);

  router.push(`/tim-kiem-viec-lam?${params.toString()}`);
};

// Quick tag selection
const selectQuickTag = (tag: string) => {
  input.value = tag;
  handleSearch();
};
</script>

<style scoped>

/* Animations */
@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(10px, -10px) rotate(2deg);
  }
  50% {
    transform: translate(-5px, 5px) rotate(-1deg);
  }
  75% {
    transform: translate(-10px, -5px) rotate(1deg);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(-10px, 10px) rotate(-2deg);
  }
  50% {
    transform: translate(5px, -5px) rotate(1deg);
  }
  75% {
    transform: translate(10px, 5px) rotate(-1deg);
  }
}

@keyframes float-slow {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(0, -20px) rotate(3deg);
  }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 10s ease-in-out infinite;
  animation-delay: -2s;
}

.animate-float-slow {
  animation: float-slow 12s ease-in-out infinite;
  animation-delay: -4s;
}

/* Premium Element UI styles */
:deep(.premium-select .el-input__wrapper) {
  box-shadow: none !important;
  border: none !important;
  background: transparent !important;
}

:deep(.premium-input .el-input__wrapper) {
  box-shadow: none !important;
  border: none !important;
  background: transparent !important;
}

:deep(.premium-select .el-input__inner),
:deep(.premium-input .el-input__inner) {
  color: #111827 !important;
  font-size: 15px !important;
  font-weight: 200 !important;
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
  height: auto !important;
  line-height: 1.5 !important;
}

:deep(.premium-popper) {
  border-radius: 1rem !important;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  padding: 0.5rem !important;
  backdrop-filter: blur(16px) !important;
  background: rgba(255, 255, 255, 0.95) !important;
}

:deep(.premium-popper .el-select-dropdown__item) {
  padding: 0.875rem 1.25rem;
  border-radius: 0.75rem;
  margin: 0.125rem 0;
  font-weight: 600;
  transition: all 0.3s ease;
  color: #374151;
}

:deep(.premium-popper .el-select-dropdown__item:hover) {
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  color: #1f2937;
  transform: translateX(4px);
}

:deep(.premium-popper .el-select-dropdown__item.selected) {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #1e40af;
  font-weight: 700;
}

/* Remove select arrow */
:deep(.el-select .el-input .el-select__caret) {
  display: none;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

.animate-fade-in-up-delayed {
  animation: fadeInUp 0.6s ease-out 0.3s forwards;
  opacity: 0;
}
</style>
