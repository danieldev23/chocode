<template>
    <MoleculesHeader />
    <main class="min-h-screen bg-gray-25">
      <div class="relative">
        <!-- Main Content -->
        <div class="relative pt-16">
          <!-- Hero Section -->
          <section class="relative py-24">
            <div class="container mx-auto px-6">
              <div class="max-w-6xl mx-auto">
                <!-- Hero Content -->
                <div class="text-center mb-20">
                  <div
                    class="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6"
                  >
                    <span class="text-primary font-medium text-sm"
                      >🚀 Nền tảng Freelance IT #1 Việt Nam</span
                    >
                  </div>
                  <h1
                    class="text-4xl md:text-6xl font-semibold mb-6 leading-tight text-gray-900"
                  >
                    Kết nối tài năng
                    <br />
                    <span class="text-primary">với cơ hội</span>
                  </h1>
                  <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
                    Khám phá hơn
                    <span class="font-semibold text-gray-900">40,000+</span> cơ
                    hội freelance từ các startup và doanh nghiệp hàng đầu
                  </p>
                </div>
  
                <!-- Search Section -->
                <div class="max-w-4xl mx-auto">
                  <div
                    class="bg-white rounded-xl p-8 shadow-sm border border-gray-200"
                  >
                    <form @submit.prevent="handleSearch" class="space-y-6">
                      <!-- Search Inputs -->
                      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <!-- Category -->
                        <div class="space-y-2">
                          <label class="block text-sm font-medium text-gray-700">
                            Lĩnh vực
                          </label>
                          <div class="relative">
                            <el-select
                              v-model="state.jobCategory"
                              placeholder="Chọn lĩnh vực"
                              class="w-full evergreen-select"
                              popper-class="evergreen-popper"
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
                        <div class="space-y-2">
                          <label class="block text-sm font-medium text-gray-700">
                            Kỹ năng
                          </label>
                          <el-input
                            v-model="input"
                            placeholder="React, Vue.js, Laravel..."
                            class="evergreen-input"
                          />
                        </div>
  
                        <!-- Location -->
                        <div class="space-y-2">
                          <label class="block text-sm font-medium text-gray-700">
                            Địa điểm
                          </label>
                          <el-select
                            v-model="state.location"
                            placeholder="Remote / Onsite"
                            class="w-full evergreen-select"
                            popper-class="evergreen-popper"
                          >
                            <el-option
                              v-for="location in locations"
                              :value="location"
                              :label="location"
                            />
                          </el-select>
                        </div>
                      </div>
  
                      <!-- Search Button -->
                      <div class="flex justify-center pt-4">
                        <button
                          type="submit"
                          class="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                        >
                          <Search class="w-4 h-4 mr-2" />
                          Tìm kiếm ngay
                        </button>
                      </div>
                    </form>
  
                    <!-- Trending Tags -->
                    <div class="mt-8 pt-6 border-t border-gray-100">
                      <div class="flex items-center gap-3 mb-3">
                        <span class="text-sm font-medium text-gray-500"
                          >Trending:</span
                        >
                      </div>
                      <div class="flex flex-wrap gap-2">
                        <button
                          v-for="tag in quickTags"
                          :key="tag"
                          @click="selectQuickTag(tag)"
                          class="px-3 py-1.5 text-sm font-medium bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-md border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                        >
                          #{{ tag }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
  
          <!-- Content Slot -->
          <div class="container mx-auto px-6">
            <slot />
          </div>
        </div>
      </div>
    </main>
  
    <!-- Footer -->
    <div class="bg-white border-t border-gray-200">
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
  /* Evergreen Element UI styles */
  :deep(.evergreen-select .el-input__wrapper) {
    box-shadow: none !important;
    border: 1px solid #d1d5db !important;
    border-radius: 0.5rem !important;
    background: white !important;
    padding: 0 12px !important;
    min-height: 40px !important;
    transition: border-color 0.2s ease !important;
  }
  
  :deep(.evergreen-select .el-input__wrapper:hover) {
    border-color: #9ca3af !important;
  }
  
  :deep(.evergreen-select .el-input__wrapper.is-focus) {
    border-color: #3b82f6 !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
  }
  
  :deep(.evergreen-input .el-input__wrapper) {
    box-shadow: none !important;
    border: 1px solid #d1d5db !important;
    border-radius: 0.5rem !important;
    background: white !important;
    padding: 0 12px !important;
    min-height: 40px !important;
    transition: border-color 0.2s ease !important;
  }
  
  :deep(.evergreen-input .el-input__wrapper:hover) {
    border-color: #9ca3af !important;
  }
  
  :deep(.evergreen-input .el-input__wrapper.is-focus) {
    border-color: #3b82f6 !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
  }
  
  :deep(.evergreen-select .el-input__inner),
  :deep(.evergreen-input .el-input__inner) {
    color: #111827 !important;
    font-size: 14px !important;
    font-weight: 400 !important;
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
    height: auto !important;
    line-height: 1.5 !important;
  }
  
  :deep(.evergreen-select .el-input__inner::placeholder),
  :deep(.evergreen-input .el-input__inner::placeholder) {
    color: #9ca3af !important;
  }
  
  :deep(.evergreen-popper) {
    border-radius: 0.5rem !important;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
    border: 1px solid #e5e7eb !important;
    padding: 4px !important;
    background: white !important;
  }
  
  :deep(.evergreen-popper .el-select-dropdown__item) {
    padding: 8px 12px;
    border-radius: 0.25rem;
    margin: 2px 0;
    font-weight: 400;
    font-size: 14px;
    transition: all 0.15s ease;
    color: #374151;
  }
  
  :deep(.evergreen-popper .el-select-dropdown__item:hover) {
    background: #f3f4f6;
    color: #111827;
  }
  
  :deep(.evergreen-popper .el-select-dropdown__item.selected) {
    background: #eff6ff;
    color: #1d4ed8;
    font-weight: 500;
  }
  
  /* Remove select arrow and add custom one */
  :deep(.el-select .el-input .el-select__caret) {
    color: #6b7280 !important;
    font-size: 14px !important;
  }
  
  /* Custom gray-25 background */
  .bg-gray-25 {
    background-color: #fafafa;
  }
  </style>
  