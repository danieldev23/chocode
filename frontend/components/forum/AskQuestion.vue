<template>
  <button
    class="bg-primary hover:bg-blue-700 text-white px-4 py-2 md:px-5 md:py-3 rounded-lg flex items-center shadow-sm transition-colors text-sm md:text-base font-medium"
    @click="showPopup()"
  >
    <span>Đặt câu hỏi</span>
    <MessageSquarePlus class="h-4 w-4 md:h-5 md:w-5 ml-2" />
  </button>

  <el-dialog
    v-model="dialogVisible"
    title="Đặt câu hỏi mới"
    :width="dialogWidth"
    :fullscreen="isMobile"
    :before-close="handleClose"
    custom-class="evergreen-dialog"
    :top="isMobile ? '0' : '10vh'"
  >
    <div class="space-y-6">
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div class="flex items-start">
          <Info class="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p class="text-sm text-blue-800 font-medium mb-1">
              Hướng dẫn đặt câu hỏi hiệu quả
            </p>
            <p class="text-xs text-blue-700">
              Hãy tìm kiếm trước khi đặt câu hỏi và cung cấp thông tin chi tiết
              để nhận được câu trả lời tốt nhất.
            </p>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Tiêu đề câu hỏi <span class="text-red-500">*</span>
          </label>
          <input
            v-model="question.title"
            type="text"
            placeholder="Ví dụ: Làm thế nào để sử dụng Vue 3 Composition API?"
            maxlength="150"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <div class="text-xs text-gray-500 mt-1">
            {{ question.title.length }}/150 ký tự
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Chi tiết câu hỏi <span class="text-red-500">*</span>
          </label>
          <textarea
            v-model="question.content"
            :rows="isMobile ? 6 : 8"
            placeholder="Mô tả chi tiết vấn đề bạn đang gặp phải, những gì bạn đã thử và kết quả mong muốn..."
            maxlength="5000"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
          />
          <div class="text-xs text-gray-500 mt-1">
            {{ question.content.length }}/5000 ký tự
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Chủ đề <span class="text-red-500">*</span>
            </label>
            <select
              v-model="question.topic"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="" disabled>Chọn chủ đề</option>
              <option v-for="topic in topics" :key="topic" :value="topic">
                {{ topic }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Mức độ khó
            </label>
            <select
              v-model="question.level"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="" disabled>Chọn mức độ</option>
              <option
                v-for="level in difficultyLevels"
                :key="level"
                :value="level"
              >
                {{ level }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Thẻ (Tags)
          </label>
          <div class="space-y-3">
            <div
              v-if="question.category.length > 0"
              class="flex flex-wrap gap-2"
            >
              <span
                v-for="tag in question.category"
                :key="tag"
                class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
              >
                {{ tag }}
                <button
                  @click="removeTag(tag)"
                  class="ml-2 text-blue-500 hover:text-blue-700"
                >
                  <X class="w-3 h-3" />
                </button>
              </span>
            </div>

            <div class="relative">
              <input
                v-model="newTag"
                type="text"
                placeholder="Thêm thẻ (javascript, react, vue...)"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                @keyup.enter="addTag"
                @keyup.comma="addTag"
              />
              <div class="text-xs text-gray-500 mt-1">
                Nhấn Enter hoặc dấu phẩy để thêm thẻ
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              <button
                v-for="tag in popularTags.slice(0, 8)"
                :key="tag"
                @click="addPopularTag(tag)"
                class="px-2 py-1 text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                {{ tag }}
              </button>
            </div>
          </div>
        </div>

        <div class="border border-gray-200 rounded-lg p-4">
          <h4 class="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Code class="w-4 h-4 mr-2" />
            Thêm nội dung
          </h4>
          <div class="flex flex-wrap gap-3">
            <button
              type="button"
              @click="addCode"
              class="flex items-center px-3 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              <Code class="h-4 w-4 mr-2" />
              Thêm code
            </button>

            <button
              type="button"
              @click="addImage"
              class="flex items-center px-3 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              <ImageIcon class="h-4 w-4 mr-2" />
              Thêm ảnh
            </button>

            <button
              type="button"
              @click="addLink"
              class="flex items-center px-3 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              <Link class="h-4 w-4 mr-2" />
              Thêm liên kết
            </button>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex flex-col sm:flex-row justify-between items-center gap-3">
        <button
          type="button"
          @click="showGuidelines"
          class="flex items-center text-gray-500 hover:text-gray-700 text-sm"
        >
          <HelpCircle class="h-4 w-4 mr-1" />
          Quy tắc diễn đàn
        </button>

        <div class="flex space-x-3 w-full sm:w-auto">
          <button
            @click="dialogVisible = false"
            class="flex-1 sm:flex-none px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Hủy
          </button>
          <button
            @click="submitQuestion"
            :disabled="!isValid"
            class="flex-1 sm:flex-none px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Đăng câu hỏi
          </button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  MessageSquarePlus,
  Code,
  ImageIcon,
  Link,
  HelpCircle,
  Info,
  X,
} from "lucide-vue-next";

const token = useCookie("auth.token");
const currentUser = await useCurrentUser();
const { status } = useAuth();
let dialogVisible = ref(false);
const newTag = ref("");

// Safe window size handling for SSR
const windowWidth = ref(0);

// Initialize with sensible defaults to prevent SSR issues
const isMobile = computed(() => windowWidth.value < 768);
const dialogWidth = computed(() => {
  if (windowWidth.value < 640) return "95%";
  if (windowWidth.value < 768) return "90%";
  if (windowWidth.value < 1024) return "650px";
  return "750px";
});

// Update windowWidth in client-side only
onMounted(() => {
  windowWidth.value = window.innerWidth;

  const handleResize = () => {
    windowWidth.value = window.innerWidth;
  };

  window.addEventListener("resize", handleResize);

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });
});

const question = ref({
  title: "",
  content: "",
  topic: "",
  level: "",
  category: [] as string[],
});

const topics = [
  "Web Development",
  "Mobile Development",
  "DevOps",
  "Data Science",
  "Machine Learning",
  "Cloud Computing",
  "Database",
  "Networking",
  "Security",
  "UI/UX",
  "Game Development",
  "Blockchain",
  "IoT",
];

const difficultyLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

const popularTags = [
  "javascript",
  "python",
  "java",
  "react",
  "vue",
  "angular",
  "node.js",
  "docker",
  "kubernetes",
  "aws",
  "azure",
  "mongodb",
  "sql",
  "typescript",
  "html",
  "css",
  "git",
  "php",
  "linux",
  "c#",
  "flutter",
];

const isValid = computed(() => {
  return (
    question.value.title.trim() !== "" &&
    question.value.content.trim() !== "" &&
    question.value.topic !== ""
  );
});

const showPopup = () => {
  if (status.value === "unauthenticated") {
    ElMessage({
      message: "Vui lòng đăng nhập để thảo luận!",
      type: "warning",
    });
  } else {
    dialogVisible.value = true;
  }
};

const handleClose = (done: () => void) => {
  if (question.value.title || question.value.content) {
    ElMessageBox.confirm("Bạn có chắc chắn muốn hủy câu hỏi?")
      .then(() => {
        done();
        resetForm();
      })
      .catch(() => {
        /* Ignore cancel */
      });
  } else {
    done();
  }
};

const submitQuestion = async () => {
  if (!isValid.value) {
    ElMessage.error("Vui lòng điền đầy đủ thông tin bắt buộc");
    return;
  }

  const payload = {
    ...question.value,
    userId: currentUser.value?.id || 0,
    image: "",
  };

  try {
    const data = await postService.postControllerCreate(payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (data.data) {
      ElMessage.success("Câu hỏi của bạn đã được đăng thành công!");
      dialogVisible.value = false;
      resetForm();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      ElMessage.error("Câu hỏi của bạn chưa được đăng!");
    }
  } catch (error) {
    ElMessage.error("Đã xảy ra lỗi khi đăng câu hỏi");
  }
};

const resetForm = () => {
  question.value = {
    title: "",
    content: "",
    topic: "",
    level: "",
    category: [],
  };
  newTag.value = "";
};

const addTag = () => {
  const tag = newTag.value.trim().replace(",", "").toLowerCase();
  if (
    tag &&
    !question.value.category.includes(tag) &&
    question.value.category.length < 5
  ) {
    question.value.category.push(tag);
    newTag.value = "";
  }
};

const addPopularTag = (tag: string) => {
  if (
    !question.value.category.includes(tag) &&
    question.value.category.length < 5
  ) {
    question.value.category.push(tag);
  }
};

const removeTag = (tag: string) => {
  question.value.category = question.value.category.filter((t) => t !== tag);
};

// Add handlers for the action buttons
const addCode = () => {
  question.value.content += "\n\n```\n// Your code here\n```\n\n";
  ElMessage.info("Đã thêm khung code");
};

const addImage = () => {
  question.value.content += "\n\n![Mô tả ảnh](url-to-image)\n\n";
  ElMessage.info("Đã thêm cú pháp ảnh");
};

const addLink = () => {
  question.value.content += "\n\n[Tiêu đề liên kết](url)\n\n";
  ElMessage.info("Đã thêm cú pháp liên kết");
};

const showGuidelines = () => {
  ElMessageBox.alert(
    "Quy tắc diễn đàn:\n\n" +
      "• Tôn trọng các thành viên khác\n" +
      "• Tìm kiếm trước khi đặt câu hỏi\n" +
      "• Cung cấp thông tin chi tiết và rõ ràng\n" +
      "• Không spam hoặc đăng nội dung quảng cáo\n" +
      "• Sử dụng định dạng phù hợp cho mã nguồn\n" +
      "• Thêm thẻ (tags) liên quan để dễ tìm kiếm",
    "Quy tắc Diễn đàn",
    {
      confirmButtonText: "Đã hiểu",
    }
  );
};
</script>

<style scoped>
/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Focus styles for accessibility */
input:focus,
textarea:focus,
select:focus,
button:focus-visible {
  outline: none;
}

/* Ensure proper text wrapping */
textarea {
  resize: none;
}

/* Mobile optimizations */
@media (max-width: 767px) {
  input,
  textarea,
  select {
    font-size: 16px; /* Prevents zoom on iOS */
  }
}

/* Custom dialog styling */
:deep(.evergreen-dialog) {
  border-radius: 12px;
}

:deep(.evergreen-dialog .el-dialog__header) {
  padding: 24px 24px 0;
  border-bottom: 1px solid #e5e7eb;
}

:deep(.evergreen-dialog .el-dialog__body) {
  padding: 24px;
}

:deep(.evergreen-dialog .el-dialog__footer) {
  padding: 0 24px 24px;
  border-top: 1px solid #e5e7eb;
}

:deep(.evergreen-dialog .el-dialog__title) {
  font-weight: 600;
  font-size: 1.125rem;
  color: #374151;
}

/* Handle mobile fullscreen dialog */
@media (max-width: 767px) {
  :deep(.evergreen-dialog.el-dialog__wrapper .el-dialog.is-fullscreen) {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
  }

  :deep(
      .evergreen-dialog.el-dialog__wrapper
        .el-dialog.is-fullscreen
        .el-dialog__body
    ) {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
  }
}
</style>
