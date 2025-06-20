<template>
  <div class="my-6 bg-gray-25">
    <div class="w-full mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900 mb-2">
          Đăng dự án mới
        </h1>
        <p class="text-gray-600">
          Tạo dự án và tìm kiếm freelancer phù hợp cho công việc của bạn
        </p>
      </div>

      <!-- AI Assistant Card -->
      <div
        class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 shadow-sm mb-6"
      >
        <div class="p-6">
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div
                class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                🤖 AI Gợi ý thông minh
              </h3>
              <p class="text-gray-600 mb-4">
                Mô tả ý tưởng dự án của bạn, AI sẽ giúp tạo mô tả chi tiết và
                gợi ý công nghệ phù hợp
              </p>

              <!-- AI Input -->
              <div class="space-y-3">
                <el-input
                  v-model="aiPrompt"
                  type="textarea"
                  :rows="3"
                  placeholder="Ví dụ: Tôi muốn tạo một website bán hàng online cho shop thời trang..."
                  class="ai-input"
                  :disabled="aiLoading"
                />
                <div class="flex gap-3">
                  <button
                    @click="getAISuggestion"
                    :disabled="!aiPrompt.trim() || aiLoading"
                    class="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <div
                      v-if="aiLoading"
                      class="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"
                    ></div>
                    <svg
                      v-else
                      class="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                    {{ aiLoading ? "Đang tạo..." : "Tạo gợi ý" }}
                  </button>
                  <button
                    v-if="aiSuggestion"
                    @click="applyAISuggestion"
                    class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center"
                  >
                    <svg
                      class="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Áp dụng gợi ý
                  </button>
                </div>
              </div>

              <!-- AI Response -->
              <div
                v-if="aiSuggestion"
                class="mt-4 p-4 bg-white rounded-lg border border-gray-200"
              >
                <h4 class="font-semibold text-gray-900 mb-2">
                  🎯 Gợi ý từ AI:
                </h4>
                <div
                  class="prose prose-sm max-w-none"
                  v-html="aiSuggestion"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div class="p-6 sm:p-8">
          <el-form
            ref="formRef"
            :model="form"
            label-position="top"
            :rules="rules"
            class="evergreen-form"
          >
            <!-- Project Title -->
            <div class="mb-6">
              <el-form-item label="Tiêu đề dự án" prop="title">
                <el-input
                  v-model="form.title"
                  placeholder="Ví dụ: Phát triển website thương mại điện tử"
                  class="evergreen-input"
                  size="large"
                />
              </el-form-item>
            </div>

            <!-- Budget -->
            <div class="mb-6">
              <el-form-item label="Ngân sách (VNĐ)" prop="salary">
                <div class="grid grid-cols-2 gap-4">
                  <el-input
                    v-model="form.salary.min"
                    placeholder="Từ"
                    class="evergreen-input"
                    size="large"
                    @input="formatSalaryInput('min')"
                  >
                    <template #suffix>
                      <span class="text-gray-500 text-sm">VNĐ</span>
                    </template>
                  </el-input>
                  <el-input
                    v-model="form.salary.max"
                    placeholder="Đến"
                    class="evergreen-input"
                    size="large"
                    @input="formatSalaryInput('max')"
                  >
                    <template #suffix>
                      <span class="text-gray-500 text-sm">VNĐ</span>
                    </template>
                  </el-input>
                </div>
              </el-form-item>
            </div>

            <!-- Location and Deadline -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <el-form-item label="Địa điểm làm việc" prop="location">
                <el-select
                  v-model="form.location"
                  multiple
                  filterable
                  placeholder="Chọn địa điểm"
                  class="w-full evergreen-select"
                  size="large"
                  popper-class="evergreen-popper"
                >
                  <el-option
                    v-for="location in locations"
                    :key="location"
                    :label="location"
                    :value="location"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="Hạn nộp hồ sơ" prop="deadline">
                <el-date-picker
                  v-model="form.deadline"
                  type="date"
                  placeholder="Chọn ngày"
                  format="DD/MM/YYYY"
                  value-format="DD/MM/YYYY"
                  class="w-full evergreen-date"
                  size="large"
                />
              </el-form-item>
            </div>

            <!-- Categories -->
            <div class="mb-6">
              <el-form-item label="Lĩnh vực" prop="tags">
                <div class="space-y-3">
                  <div v-if="form.tags.length > 0" class="flex flex-wrap gap-2">
                    <span
                      v-for="tag in form.tags"
                      :key="tag"
                      class="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-md"
                    >
                      {{ tag }}
                      <button
                        @click="handleTagClose(tag)"
                        class="ml-2 text-blue-500 hover:text-blue-700"
                      >
                        <X class="w-3 h-3" />
                      </button>
                    </span>
                  </div>

                  <el-select
                    v-if="tagInputVisible"
                    ref="tagSelectRef"
                    v-model="tagInputValue"
                    multiple
                    filterable
                    placeholder="Chọn lĩnh vực"
                    @change="handleTagConfirm"
                    @blur="tagInputVisible = false"
                    class="w-full evergreen-select"
                    size="large"
                    popper-class="evergreen-popper"
                  >
                    <el-option
                      v-for="tag in availableTags"
                      :key="tag"
                      :label="tag"
                      :value="tag"
                    />
                  </el-select>

                  <button
                    v-else
                    @click="showTagInput"
                    class="inline-flex items-center px-3 py-2 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    <Plus class="w-4 h-4 mr-2" />
                    Thêm lĩnh vực
                  </button>
                </div>
              </el-form-item>
            </div>

            <!-- Technologies -->
            <div class="mb-6">
              <el-form-item label="Công nghệ yêu cầu" prop="technologies">
                <div class="space-y-3">
                  <div
                    v-if="form.technologies.length > 0"
                    class="flex flex-wrap gap-2"
                  >
                    <span
                      v-for="tech in form.technologies"
                      :key="tech"
                      class="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-md"
                    >
                      {{ tech }}
                      <button
                        @click="handleTechClose(tech)"
                        class="ml-2 text-green-500 hover:text-green-700"
                      >
                        <X class="w-3 h-3" />
                      </button>
                    </span>
                  </div>

                  <el-select
                    v-if="techInputVisible"
                    ref="techSelectRef"
                    v-model="techInputValue"
                    multiple
                    filterable
                    placeholder="Chọn công nghệ"
                    @change="handleTechConfirm"
                    @blur="techInputVisible = false"
                    class="w-full evergreen-select"
                    size="large"
                    popper-class="evergreen-popper"
                  >
                    <el-option
                      v-for="tech in availableTechs"
                      :key="tech"
                      :label="tech"
                      :value="tech"
                    />
                  </el-select>

                  <button
                    v-else
                    @click="showTechInput"
                    class="inline-flex items-center px-3 py-2 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    <Plus class="w-4 h-4 mr-2" />
                    Thêm công nghệ
                  </button>
                </div>
              </el-form-item>
            </div>

            <!-- Job Description -->
            <div class="mb-6">
              <el-form-item
                label="Mô tả dự án"
                class="w-full"
                prop="jobDescription"
              >
                <div class="border w-full border-gray-300 rounded-lg">
                  <client-only>
                    <Editor
                      v-model="form.jobDescription"
                      :init="getTinyMCEConfig()"
                      :tinymce-script-src="getTinyMCEScriptSrc()"
                    />
                  </client-only>
                </div>
              </el-form-item>
            </div>

            <!-- Project Image -->
            <div class="mb-8">
              <el-form-item label="Ảnh minh họa (tùy chọn)" prop="image">
                <div class="w-full">
                  <el-upload
                    class="evergreen-upload w-full"
                    drag
                    name="file"
                    action="https://api-chodev.dangquochuy/api/upload/image"
                    :headers="uploadHeaders"
                    :on-success="handleUploadSuccess"
                    :before-upload="beforeUpload"
                    :limit="1"
                  >
                    <div v-if="!form.image" class="py-12 px-6 text-center">
                      <div
                        class="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center"
                      >
                        <Upload class="w-6 h-6 text-gray-400" />
                      </div>
                      <div class="text-gray-600 mb-2">
                        Kéo thả ảnh vào đây hoặc
                        <span class="text-primary font-medium"
                          >click để chọn file</span
                        >
                      </div>
                      <div class="text-sm text-gray-500">
                        PNG, JPG, GIF tối đa 5MB
                      </div>
                    </div>
                    <div v-else class="flex items-center justify-center p-4">
                      <div class="relative">
                        <img :src="form.image" class="max-h-32 rounded-lg" />
                        <button
                          @click.stop="form.image = ''"
                          class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X class="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </el-upload>
                </div>
              </el-form-item>
            </div>

            <!-- Form Actions -->
            <div
              class="flex flex-col sm:flex-row gap-3 sm:justify-between pt-6 border-t border-gray-200"
            >
              <button
                @click="resetForm"
                :disabled="loading"
                class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
              >
                Làm mới
              </button>

              <div class="flex gap-3">
                <button
                  @click="saveDraft"
                  :disabled="loading"
                  class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                >
                  Lưu nháp
                </button>
                <button
                  @click="submitForm"
                  :disabled="loading"
                  class="px-6 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <div
                    v-if="loading"
                    class="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"
                  ></div>
                  {{ loading ? "Đang đăng..." : "Đăng dự án" }}
                </button>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from "vue";
import { ElMessage } from "element-plus";
import { Upload, Plus, X } from "lucide-vue-next";
import Editor from "@tinymce/tinymce-vue";
import type { FormInstance, FormRules } from "element-plus";
import { availableTags } from "@/types/tags";

// SEO Meta
useSeoMeta({
  title: "Đăng dự án - Chocode",
});

// Type definitions
interface SalaryRange {
  min: string | number;
  max: string | number;
}

interface JobForm {
  title: string;
  salary: SalaryRange;
  location: string | string[];
  deadline: string;
  tags: string[];
  technologies: string[];
  jobDescription: string;
  requirements?: string;
  image?: string;
}

// AI State
const aiPrompt = ref("");
const aiSuggestion = ref("");
const aiLoading = ref(false);

// Form data
const form = reactive<JobForm>({
  title: "",
  salary: {
    min: "",
    max: "",
  },
  location: [],
  deadline: "",
  tags: [],
  technologies: [],
  jobDescription: "",
  requirements: "",
  image: "",
});

const locations = [
  "Remote",
  "Toàn Quốc",
  "Hà Nội",
  "TP Hồ Chí Minh",
  "Đà Nẵng",
  "Cần Thơ",
  "Hải Phòng",
  "Bình Dương",
  "Đồng Nai",
  "An Giang",
  "Bà Rịa - Vũng Tàu",
  "Bạc Liêu",
  "Bắc Giang",
  "Bắc Kạn",
  "Bắc Ninh",
  "Bến Tre",
  "Bình Định",
  "Bình Phước",
  "Bình Thuận",
  "Cà Mau",
  "Cao Bằng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Tĩnh",
  "Hải Dương",
  "Hậu Giang",
  "Hòa Bình",
  "Hưng Yên",
  "Khánh Hòa",
  "Kiên Giang",
  "Kon Tum",
  "Lai Châu",
  "Lạng Sơn",
  "Lào Cai",
  "Lâm Đồng",
  "Long An",
  "Nam Định",
  "Nghệ An",
  "Ninh Bình",
  "Ninh Thuận",
  "Phú Thọ",
  "Phú Yên",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Quảng Trị",
  "Sóc Trăng",
  "Sơn La",
  "Tây Ninh",
  "Thái Bình",
  "Thái Nguyên",
  "Thanh Hóa",
  "Thừa Thiên Huế",
  "Tiền Giang",
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái",
];

// Form validation rules
const rules = reactive<FormRules>({
  title: [
    {
      required: true,
      message: "Vui lòng nhập tiêu đề dự án",
      trigger: "blur",
    },
  ],
  "salary.min": [
    {
      required: true,
      message: "Vui lòng nhập mức lương tối thiểu",
      trigger: "blur",
    },
  ],
  "salary.max": [
    {
      required: true,
      message: "Vui lòng nhập mức lương tối đa",
      trigger: "blur",
    },
  ],
  location: [
    { required: true, message: "Vui lòng chọn địa điểm", trigger: "change" },
  ],
  deadline: [
    {
      required: true,
      message: "Vui lòng chọn hạn nộp hồ sơ",
      trigger: "change",
    },
  ],
  jobDescription: [
    {
      required: true,
      message: "Vui lòng nhập mô tả dự án",
      trigger: "blur",
    },
  ],
});

// Tag input
const tagInputVisible = ref(false);
const tagInputValue = ref<string[]>([]);
const tagSelectRef = ref<HTMLElement | null>(null);

// Tech input
const techInputVisible = ref(false);
const techInputValue = ref<string[]>([]);
const techSelectRef = ref<HTMLElement | null>(null);

const availableTechs = [
  // Frontend
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Vue.js",
  "Angular",
  "Svelte",
  "Next.js",
  "Nuxt.js",
  "Tailwind CSS",
  "Bootstrap",
  "SASS",
  "SCSS",
  "Element Plus",
  "Ant Design",

  // Backend
  "Node.js",
  "Express",
  "NestJS",
  "PHP",
  "Laravel",
  "Python",
  "Django",
  "Flask",
  "Ruby",
  "Ruby on Rails",
  "Java",
  "Spring Boot",
  "Go",
  "ASP.NET",
  "C#",

  // Databases
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "SQLite",
  "Redis",
  "Firebase",
  "Firestore",
  "ElasticSearch",

  // DevOps & Tools
  "Docker",
  "Kubernetes",
  "Git",
  "GitHub Actions",
  "Jenkins",
  "AWS",
  "Azure",
  "Google Cloud",
  "Vercel",
  "Netlify",
  "DigitalOcean",

  // Mobile & Others
  "Flutter",
  "React Native",
  "Ionic",
  "GraphQL",
  "REST API",
  "WebSocket",
  "JWT",
  "OAuth2",
  "Prisma",
  "Figma",
];

// Form reference and state
const formRef = ref<FormInstance>();
const loading = ref(false);
const token = useCookie("auth.token");

// Utility functions
const formatSalaryInput = (type: "min" | "max") => {
  const value = form.salary[type];
  if (typeof value === "string") {
    // Remove non-numeric characters and format with thousands separator
    const numericValue = value.replace(/\D/g, "");
    form.salary[type] = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
};

// Methods
const showTagInput = () => {
  tagInputVisible.value = true;
  nextTick(() => {
    if (tagSelectRef.value) {
      (tagSelectRef.value as any).focus();
    }
  });
};

const handleTagClose = (tag: string) => {
  form.tags = form.tags.filter((t) => t !== tag);
};

const handleTagConfirm = () => {
  if (tagInputValue.value.length > 0) {
    tagInputValue.value.forEach((tag) => {
      if (!form.tags.includes(tag)) {
        form.tags.push(tag);
      }
    });
  }
  tagInputVisible.value = false;
  tagInputValue.value = [];
};

const showTechInput = () => {
  techInputVisible.value = true;
  nextTick(() => {
    if (techSelectRef.value) {
      (techSelectRef.value as any).focus();
    }
  });
};

const handleTechClose = (tech: string) => {
  form.technologies = form.technologies.filter((t) => t !== tech);
};

const handleTechConfirm = () => {
  if (techInputValue.value.length > 0) {
    techInputValue.value.forEach((tech) => {
      if (!form.technologies.includes(tech)) {
        form.technologies.push(tech);
      }
    });
  }
  techInputVisible.value = false;
  techInputValue.value = [];
};

const uploadHeaders = () => ({
  Authorization: token.value ? `Bearer ${token.value}` : "",
});

const handleUploadSuccess = (response: any) => {
  form.image = response.url || response.data?.url;
  ElMessage.success("Tải ảnh lên thành công");
};

const beforeUpload = (file: File) => {
  const isImage = file.type.startsWith("image/");
  const isLt5M = file.size / 1024 / 1024 < 5;

  if (!isImage) {
    ElMessage.error("Chỉ có thể tải lên file ảnh!");
    return false;
  }
  if (!isLt5M) {
    ElMessage.error("Kích thước ảnh không được vượt quá 5MB!");
    return false;
  }
  return true;
};

const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields();
    form.image = "";
  }
};

const saveDraft = () => {
  ElMessage.success("Đã lưu nháp");
};

const submitForm = async () => {
  if (!formRef.value) return;

  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true;

      try {
        const formatDate = (dateString: string) => {
          if (!dateString) return "";
          try {
            if (dateString.includes("/")) {
              const [day, month, year] = dateString.split("/");
              return `${year}-${month}-${day}`;
            }
            return dateString;
          } catch (e) {
            console.error("Error formatting date:", e);
            return dateString;
          }
        };

        const locationValue =
          typeof form.location === "string" ? [form.location] : form.location;

        const jobPostingData = {
          title: form.title,
          salary: {
            min: formatSalary(String(form.salary.min)),
            max: formatSalary(String(form.salary.max)),
          },
          location: locationValue.toString(),
          deadline: formatDate(form.deadline),
          jobDescription: form.jobDescription,
          tags: form.tags,
          technologies: form.technologies,
          image: form.image || "",
          status: "published",
        };

        const response = await jobPostingService.jobPostControllerCreate(
          jobPostingData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.value}`,
            },
          }
        );

        if (response.status === 201) {
          ElMessage({
            message: "Đăng dự án thành công!",
            type: "success",
          });
          setTimeout(() => {
            navigateTo("/");
          }, 1500);
        }
      } catch (error: any) {
        console.error("Error posting job:", error);
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Đã xảy ra lỗi khi đăng dự án!";
        ElMessage.error("Lỗi: " + errorMessage);
      } finally {
        loading.value = false;
      }
    } else {
      ElMessage.error("Vui lòng kiểm tra lại thông tin");
      return false;
    }
  });
};

const formatSalary = (value: string | number) => {
  if (typeof value === "string") {
    return parseInt(value.replace(/\./g, ""));
  }
  return value;
};

// AI Methods
const getAISuggestion = async () => {
  if (!aiPrompt.value.trim()) return;

  aiLoading.value = true;

  try {
    const response = await $fetch("/api/ai/suggestion", {
      method: "POST",
      body: {
        prompt: aiPrompt.value,
      },
    });

    // Format the suggestion for display
    aiSuggestion.value = `
      <div class="space-y-4">
        <div>
          <h5 class="font-semibold text-gray-900">📝 Tiêu đề:</h5>
          <p class="text-gray-700">${response.title}</p>
        </div>
        
        <div>
          <h5 class="font-semibold text-gray-900">💰 Ngân sách đề xuất:</h5>
          <p class="text-gray-700">${formatCurrency(
            response.estimatedBudget.min
          )} - ${formatCurrency(response.estimatedBudget.max)} VNĐ</p>
        </div>
        
        <div>
          <h5 class="font-semibold text-gray-900">🏷️ Lĩnh vực:</h5>
          <div class="flex flex-wrap gap-1 mt-1">
            ${response.suggestedTags
              .map(
                (tag) =>
                  `<span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">${tag}</span>`
              )
              .join("")}
          </div>
        </div>
        
        <div>
          <h5 class="font-semibold text-gray-900">⚙️ Công nghệ đề xuất:</h5>
          <div class="flex flex-wrap gap-1 mt-1">
            ${response.suggestedTechnologies
              .map(
                (tech) =>
                  `<span class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">${tech}</span>`
              )
              .join("")}
          </div>
        </div>
        
        <div>
          <h5 class="font-semibold text-gray-900">📋 Mô tả chi tiết:</h5>
          <div class="text-gray-700 prose prose-sm max-w-none">${
            response.description
          }</div>
        </div>
      </div>
    `;

    // Store suggestion for applying
    window.currentAISuggestion = response;
  } catch (error) {
    console.error("Error getting AI suggestion:", error);
    ElMessage.error("Lỗi khi gọi AI. Vui lòng thử lại!");
  } finally {
    aiLoading.value = false;
  }
};

const applyAISuggestion = () => {
  const suggestion = window.currentAISuggestion;
  if (!suggestion) return;

  // Apply AI suggestions to form
  form.title = suggestion.title;
  form.jobDescription = suggestion.description;
  form.salary.min = formatCurrency(suggestion.estimatedBudget.min);
  form.salary.max = formatCurrency(suggestion.estimatedBudget.max);

  // Add suggested tags (only if they exist in availableTags)
  suggestion.suggestedTags.forEach((tag) => {
    if (availableTags.includes(tag) && !form.tags.includes(tag)) {
      form.tags.push(tag);
    }
  });

  // Add suggested technologies (only if they exist in availableTechs)
  suggestion.suggestedTechnologies.forEach((tech) => {
    if (availableTechs.includes(tech) && !form.technologies.includes(tech)) {
      form.technologies.push(tech);
    }
  });

  ElMessage.success("Đã áp dụng gợi ý từ AI thành công!");

  // Clear AI data
  aiPrompt.value = "";
  aiSuggestion.value = "";
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN").format(amount);
};

// Initialize form
onMounted(() => {
  if (!form.deadline) {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    form.deadline = `${day}/${month}/${year}`;
  }

  if (Array.isArray(form.location) && form.location.length === 0) {
    form.location = ["Remote"];
  }
});
</script>

<style scoped>
/* Custom gray background */
.bg-gray-25 {
  background-color: #fafafa;
}

/* Evergreen Form Styles */
:deep(.evergreen-form .el-form-item__label) {
  color: #374151 !important;
  font-weight: 500 !important;
  font-size: 14px !important;
  margin-bottom: 6px !important;
}

/* Evergreen Input Styles */
:deep(.evergreen-input .el-input__wrapper) {
  box-shadow: none !important;
  border: 1px solid #d1d5db !important;
  border-radius: 8px !important;
  background: white !important;
  padding: 0 12px !important;
  transition: border-color 0.2s ease !important;
}

:deep(.evergreen-input .el-input__wrapper:hover) {
  border-color: #9ca3af !important;
}

:deep(.evergreen-input .el-input__wrapper.is-focus) {
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
}

:deep(.evergreen-input .el-input__inner) {
  color: #111827 !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  height: 40px !important;
  line-height: 40px !important;
}

/* Evergreen Select Styles */
:deep(.evergreen-select .el-input__wrapper) {
  box-shadow: none !important;
  border: 1px solid #d1d5db !important;
  border-radius: 8px !important;
  background: white !important;
  padding: 0 12px !important;
  transition: border-color 0.2s ease !important;
}

:deep(.evergreen-select .el-input__wrapper:hover) {
  border-color: #9ca3af !important;
}

:deep(.evergreen-select .el-input__wrapper.is-focus) {
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
}

/* Evergreen Date Picker */
:deep(.evergreen-date .el-input__wrapper) {
  box-shadow: none !important;
  border: 1px solid #d1d5db !important;
  border-radius: 8px !important;
  background: white !important;
  padding: 0 12px !important;
  transition: border-color 0.2s ease !important;
}

/* Evergreen Upload */
:deep(.evergreen-upload .el-upload-dragger) {
  border: 2px dashed #d1d5db !important;
  border-radius: 8px !important;
  background: #fafafa !important;
  transition: all 0.2s ease !important;
}

:deep(.evergreen-upload .el-upload-dragger:hover) {
  border-color: #3b82f6 !important;
  background: #f8faff !important;
}

/* Evergreen Popper */
:deep(.evergreen-popper) {
  border-radius: 8px !important;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
  border: 1px solid #e5e7eb !important;
  padding: 4px !important;
  background: white !important;
}

:deep(.evergreen-popper .el-select-dropdown__item) {
  padding: 8px 12px !important;
  border-radius: 4px !important;
  margin: 2px 0 !important;
  font-weight: 400 !important;
  font-size: 14px !important;
  transition: all 0.15s ease !important;
  color: #374151 !important;
}

:deep(.evergreen-popper .el-select-dropdown__item:hover) {
  background: #f3f4f6 !important;
  color: #111827 !important;
}

:deep(.evergreen-popper .el-select-dropdown__item.selected) {
  background: #eff6ff !important;
  color: #1d4ed8 !important;
  font-weight: 500 !important;
}

/* Animations and transitions */
* {
  transition-property: color, background-color, border-color, transform,
    box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Focus styles for accessibility */
button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* AI Input Styles */
:deep(.ai-input .el-textarea__inner) {
  border: 1px solid #d1d5db !important;
  border-radius: 8px !important;
  background: white !important;
  transition: border-color 0.2s ease !important;
  font-size: 14px !important;
  resize: none !important;
}

:deep(.ai-input .el-textarea__inner:focus) {
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
}

/* Custom prose styles for AI suggestions */
.prose h5 {
  margin-top: 0 !important;
  margin-bottom: 0.5rem !important;
}

.prose p {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
</style>
