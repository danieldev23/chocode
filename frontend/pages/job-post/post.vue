<template>
  <div class="my-6">
    <div class="bg-white rounded-md shadow-md p-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">
        Đăng bài tìm kiếm developer
      </h1>

      <el-form ref="formRef" :model="form" label-position="top" :rules="rules">
        <!-- Tiêu đề tuyển dụng -->
        <el-form-item label="Tiêu đề tuyển dụng" prop="title" class="my-2">
          <el-input
            v-model="form.title"
            clearable
            placeholder="Ví dụ: Viết phần mềm quản lý khách sạn"
          />
        </el-form-item>

        <!-- Thông tin chung -->
        <div>
          <el-form-item
            label="Ngân sách (VNĐ)"
            prop="salary"
            class="font-medium text-gray-700"
          >
            <div class="flex items-center gap-4">
              <el-input
                v-model="form.salary.min"
                type="text"
                placeholder="Từ"
                class="w-full rounded-lg"
                :min="0"
              />
              <span class="text-gray-500">-</span>
              <el-input
                v-model="form.salary.max"
                type="text"
                placeholder="Đến"
                class="w-full rounded-lg"
                :min="form.salary.min || 0"
              />
              <span class="text-gray-500">VNĐ</span>
            </div>
          </el-form-item>
        </div>

        <el-form-item label="Địa điểm" prop="location">
          <el-select
            multiple
            filterable
            remote
            reserve-keyword
            v-model="form.location"
            placeholder="Chọn địa điểm"
            class="w-full"
          >
            <el-option
              v-for="(location, index) in locations"
              :key="index"
              :label="location"
              :value="location"
            />
          </el-select>
        </el-form-item>

        <!-- Hạn nộp hồ sơ -->
        <el-form-item label="Hạn nộp hồ sơ" prop="deadline">
          <el-date-picker
            v-model="form.deadline"
            type="date"
            placeholder="Chọn ngày"
            format="DD/MM/YYYY"
            value-format="DD/MM/YYYY"
            class="w-full"
          />
        </el-form-item>

        <!-- Chuyên môn -->
        <el-form-item label="Chuyên môn" prop="tags">
          <el-tag
            v-for="tag in form.tags"
            :key="tag"
            closable
            @close="handleTagClose(tag)"
            class="mr-2 mb-2"
          >
            {{ tag }}
          </el-tag>
          <el-select
            multiple
            filterable
            remote
            reserve-keyword
            v-if="tagInputVisible"
            ref="tagSelectRef"
            v-model="tagInputValue"
            placeholder="Thêm chuyên môn"
            @change="handleTagConfirm"
            @blur="tagInputVisible = false"
            class="w-48"
          >
            <el-option
              v-for="tag in availableTags"
              :key="tag"
              :label="tag"
              :value="tag"
            />
          </el-select>
          <el-button v-else class="button-new-tag" @click="showTagInput"
            >+ Thêm chuyên môn</el-button
          >
        </el-form-item>

        <!-- Công nghệ -->
        <el-form-item label="Công nghệ" prop="technologies">
          <el-tag
            v-for="tech in form.technologies"
            :key="tech"
            closable
            @close="handleTechClose(tech)"
            class="mr-2 mb-2"
            type="success"
          >
            {{ tech }}
          </el-tag>
          <el-select
            multiple
            filterable
            remote
            reserve-keyword
            v-if="techInputVisible"
            ref="techSelectRef"
            v-model="techInputValue"
            placeholder="Thêm công nghệ"
            @change="handleTechConfirm"
            @blur="techInputVisible = false"
            class="w-48"
          >
            <el-option
              v-for="tech in availableTechs"
              :key="tech"
              :label="tech"
              :value="tech"
            />
          </el-select>
          <el-button v-else class="button-new-tag" @click="showTechInput"
            >+ Thêm công nghệ</el-button
          >
        </el-form-item>

        <!-- Mô tả công việc -->

        <el-form-item prop="jobDescription" label="Mô tả công việc">
          <client-only>
            <Editor
              v-model="form.jobDescription"
              :init="getTinyMCEConfig()"
              :tinymce-script-src="getTinyMCEScriptSrc()"
            />
          </client-only>
        </el-form-item>

        <!-- Ảnh minh họa -->
        <el-form-item label="Ảnh minh họa" prop="image" class="w-full">
          <el-upload
            class="upload-demo w-full"
            drag
            name="file"
            action="http://localhost:3001/api/upload/image"
            :headers="uploadHeaders"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
            :limit="1"
          >
            <div v-if="!form.image" class="p-8">
              <el-icon class="text-3xl"><Upload /></el-icon>
              <div class="mt-2">
                Kéo thả file hoặc <em>click để tải lên</em>
              </div>
            </div>
            <div v-else class="flex items-center justify-center p-2">
              <img :src="form.image" class="max-h-40" />
            </div>
          </el-upload>
        </el-form-item>

        <!-- Buttons -->
        <div class="flex justify-between mt-6">
          <el-button
            @click="resetForm"
            :disabled="loading"
            class="bg-secondary-gradient text-white reset"
            >Nhập lại</el-button
          >
          <div>
            <el-button
              @click="saveDraft"
              class="mr-2 bg-white text-black"
              :disabled="loading"
              >Lưu tin</el-button
            >
            <el-button
              class="bg-primary-gradient submit-btn"
              @click="submitForm"
              :loading="loading"
            >
              {{ loading ? "Đang đăng tin..." : "Đăng tuyển ngay" }}
            </el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from "vue";
import { ElMessage } from "element-plus";
import { Upload } from "@element-plus/icons-vue";
import Editor from "@tinymce/tinymce-vue";
import type { FormInstance, FormRules } from "element-plus";
import { availableTags } from "@/types/tags";
// SEO Meta
useSeoMeta({
  title: "Đăng dự án - Chợ Code",
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
  "Toàn Quốc",
  "An Giang",
  "Bà Rịa - Vũng Tàu",
  "Bạc Liêu",
  "Bắc Giang",
  "Bắc Kạn",
  "Bắc Ninh",
  "Bến Tre",
  "Bình Dương",
  "Bình Định",
  "Bình Phước",
  "Bình Thuận",
  "Cà Mau",
  "Cao Bằng",
  "Cần Thơ",
  "Đà Nẵng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Nội",
  "Hà Tĩnh",
  "Hải Dương",
  "Hải Phòng",
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
  "TP Hồ Chí Minh",
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
      message: "Vui lòng nhập tiêu đề tuyển dụng",
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
      message: "Vui lòng nhập mô tả công việc",
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
  "SASS",
  "SCSS",
  "Tailwind CSS",
  "Bootstrap",
  "Vue.js",
  "Nuxt2",
  "Nuxt3",
  "React",
  "Next.js",
  "Angular",
  "Svelte",
  "Element Plus",
  "TinyMCE",
  "Quill.js",
  "TypeScript",
  "JavaScript",

  // Backend
  "Node.js",
  "Express",
  "NestJS",
  "HapiJS",
  "KoaJS",
  "Fastify",
  "PHP",
  "Laravel",
  "Symfony",
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
  "C++",

  // Databases
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "SQLite",
  "MariaDB",
  "Redis",
  "Firebase Realtime DB",
  "Firestore",
  "Cassandra",
  "ElasticSearch",

  // DevOps & Tools
  "Docker",
  "Kubernetes",
  "Nginx",
  "Apache",
  "Git",
  "GitHub Actions",
  "Jenkins",
  "CI/CD",
  "Shell Script",
  "Linux",
  "Ubuntu",
  "AWS",
  "Azure",
  "Google Cloud",
  "Vercel",
  "Netlify",
  "DigitalOcean",

  // Testing
  "Jest",
  "Mocha",
  "Chai",
  "Cypress",
  "Playwright",
  "Selenium",

  // Mobile & Desktop
  "Flutter",
  "React Native",
  "Ionic",
  "Capacitor",
  "Electron",

  // Others
  "Prisma",
  "GraphQL",
  "REST API",
  "WebSocket",
  "gRPC",
  "JWT",
  "OAuth2",
  "OpenAPI",
  "Swagger",
  "Figma",
  "Postman",
  "Zod",
  "Yup",
];

// Form reference
const formRef = ref<FormInstance>();
const loading = ref(false);
const token = useCookie("auth.token");

// Methods
const showTagInput = () => {
  tagInputVisible.value = true;
  nextTick(() => {
    if (tagSelectRef.value) {
      // Use as any to bypass TypeScript errors with Element Plus components
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
      // Use as any to bypass TypeScript errors with Element Plus components
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

const uploadHeaders = () => {
  return {
    Authorization: token.value ? `Bearer ${token.value}` : "",
  };
};

const handleUploadSuccess = (response: any) => {
  form.image = response.url || response.data?.url;
  ElMessage.success("Tải ảnh lên thành công");
};

const beforeUpload = (file: File) => {
  const isImage = file.type.startsWith("image/");

  if (!isImage) {
    ElMessage.error("Chỉ có thể tải lên file ảnh!");
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
  ElMessage.success("Đã lưu tin tuyển dụng");
};

const submitForm = async () => {
  if (!formRef.value) return;

  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true;

      try {
        // Fix date format issue: ensure we're passing correctly formatted date
        const formatDate = (dateString: string) => {
          if (!dateString) return "";

          try {
            if (dateString.includes("/")) {
              const [day, month, year] = dateString.split("/");
              // Return ISO-like format or your API expected format
              return `${year}-${month}-${day}`; // Changed to YYYY-MM-DD format
            }
            return dateString;
          } catch (e) {
            console.error("Error formatting date:", e);
            return dateString;
          }
        };

        // Convert location to array if it's a string
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

        // Use the correct method name from your job posting service
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
          setTimeout(() => {
            ElMessage({
              message: "Đăng job thành công!",
              type: "success",
            });
            // Navigate to jobs page after successful submission
            navigateTo("/");
          }, 2000);
        }
      } catch (error: any) {
        console.error("Error posting job:", error);

        // Display more detailed error message
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Đã xảy ra lỗi khi đăng tin!";
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
// Initialize date if empty
onMounted(() => {
  if (!form.deadline) {
    // Set default deadline to 30 days from now
    const date = new Date();
    date.setDate(date.getDate() + 30);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    form.deadline = `${day}/${month}/${year}`;
  }

  // Set default location if empty
  if (Array.isArray(form.location) && form.location.length === 0) {
    form.location = ["Toàn Quốc"];
  }
});
</script>

<style scoped>
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
button.el-button.mr-2.bg-white.text-black {
  color: #333;
}
button.el-button.button-new-tag {
  color: #333;
}
button.el-button.bg-secondary-gradient.text-white.reset {
  color: white;
}
button.el-button.bg-primary-gradient.submit-btn {
  color: white;
}
</style>
