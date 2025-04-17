<template>
  <button
    class="bg-secondary-gradient hover:bg-blue-700 text-white px-4 py-2 md:px-5 md:py-3 rounded-lg flex items-center shadow-md transition-colors text-sm md:text-base"
    @click="showPopup()"
  >
    <span>Đặt câu hỏi?</span>
    <MessageSquarePlus class="h-4 w-4 md:h-5 md:w-5 ml-1 md:ml-2" />
  </button>

  <el-dialog
    v-model="dialogVisible"
    title="Đặt câu hỏi?"
    :width="dialogWidth"
    :fullscreen="isMobile"
    :before-close="handleClose"
    custom-class="forum-dialog"
    :top="isMobile ? '0' : '15vh'"
  >
    <div class="space-y-4 md:space-y-6">
      <div class="mb-2 md:mb-4">
        <small class="text-gray-500"
          >Các trường có dấu <span class="text-red-500">*</span> là bắt
          buộc</small
        >
      </div>

      <div class="space-y-1 md:space-y-2">
        <label class="font-medium text-gray-700 text-sm md:text-base"
          >Tiêu đề câu hỏi <span class="text-red-500">*</span></label
        >
        <el-input
          v-model="question.title"
          placeholder="Nhập tiêu đề câu hỏi"
          maxlength="150"
          show-word-limit
          size="default"
        />
      </div>

      <div class="space-y-1 md:space-y-2">
        <label class="font-medium text-gray-700 text-sm md:text-base"
          >Chi tiết <span class="text-red-500">*</span></label
        >
        <el-input
          v-model="question.content"
          type="textarea"
          :rows="isMobile ? 4 : 6"
          placeholder="Mô tả chi tiết câu hỏi"
          maxlength="5000"
          show-word-limit
        />
        <div class="text-xs md:text-sm text-gray-500">
          (Vui lòng không đặt câu hỏi cho trợ giúp hoặc nội dung vi phạm các
          tiêu chuẩn của cộng đồng)
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div class="space-y-1 md:space-y-2">
          <label class="font-medium text-gray-700 text-sm md:text-base"
            >Chủ đề <span class="text-red-500">*</span></label
          >
          <el-select
            v-model="question.topic"
            placeholder="Chọn chủ đề"
            class="w-full"
            size="default"
          >
            <el-option
              v-for="topic in topics"
              :key="topic"
              :label="topic"
              :value="topic"
            />
          </el-select>
        </div>

        <div class="space-y-1 md:space-y-2">
          <label class="font-medium text-gray-700 text-sm md:text-base"
            >Mức độ</label
          >
          <el-select
            v-model="question.level"
            placeholder="Chọn level"
            class="w-full"
            size="default"
          >
            <el-option
              v-for="level in difficultyLevels"
              :key="level"
              :label="level"
              :value="level"
            />
          </el-select>
        </div>
      </div>

      <div class="space-y-1 md:space-y-2">
        <label class="font-medium text-gray-700 text-sm md:text-base"
          >Danh mục</label
        >
        <el-select
          v-model="question.category"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Thêm các tag liên quan (e.g: javascript, react, docker)"
          class="w-full"
          size="default"
          :collapse-tags="isMobile"
          :max-collapse-tags="1"
        >
          <el-option
            v-for="tag in popularTags"
            :key="tag"
            :label="tag"
            :value="tag"
          />
        </el-select>
      </div>

      <div class="flex flex-wrap items-center gap-3 md:gap-4">
        <!-- Use button elements instead of potentially nested a tags -->
        <button
          type="button"
          class="flex items-center text-blue-600 hover:text-blue-800 text-sm md:text-base"
          @click="addCode"
        >
          <Code class="h-4 w-4 md:h-5 md:w-5 mr-1" />
          <span>Add Code</span>
        </button>

        <button
          type="button"
          class="flex items-center text-blue-600 hover:text-blue-800 text-sm md:text-base"
          @click="addImage"
        >
          <ImageIcon class="h-4 w-4 md:h-5 md:w-5 mr-1" />
          <span>Add Image</span>
        </button>

        <button
          type="button"
          class="flex items-center text-blue-600 hover:text-blue-800 text-sm md:text-base"
          @click="addLink"
        >
          <Link class="h-4 w-4 md:h-5 md:w-5 mr-1" />
          <span>Add Link</span>
        </button>
      </div>
    </div>

    <template #footer>
      <div
        class="flex flex-col md:flex-row md:justify-between md:items-center gap-3"
      >
        <div class="flex items-center">
          <el-tooltip content="Hướng dẫn và quy tắc diễn đàn">
            <button
              type="button"
              class="cursor-pointer"
              @click="showGuidelines"
            >
              <HelpCircle class="h-5 w-5 text-gray-500 hover:text-gray-700" />
            </button>
          </el-tooltip>
        </div>
        <div class="flex space-x-3 w-full md:w-auto justify-end">
          <el-button @click="dialogVisible = false" size="default"
            >Hủy</el-button
          >
          <el-button
            type="primary"
            @click="submitQuestion"
            :disabled="!isValid"
            size="default"
          >
            Đăng câu hỏi
          </el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import {
  MessageSquarePlus,
  Code,
  ImageIcon,
  Link,
  HelpCircle,
} from "lucide-vue-next";
const token = useCookie("auth.token");
const currentUser = await useCurrentUser();
const { status } = useAuth();
let dialogVisible = ref(false);

// Safe window size handling for SSR
const windowWidth = ref(0);

// Initialize with sensible defaults to prevent SSR issues
const isMobile = computed(() => windowWidth.value < 768);
const dialogWidth = computed(() => {
  if (windowWidth.value < 640) return "95%";
  if (windowWidth.value < 768) return "85%";
  if (windowWidth.value < 1024) return "650px";
  return "750px";
});

// Update windowWidth in client-side only
onMounted(() => {
  // Set initial value
  windowWidth.value = window.innerWidth;

  // Add event listener for resize
  const handleResize = () => {
    windowWidth.value = window.innerWidth;
  };

  window.addEventListener("resize", handleResize);

  // Clean up
  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });
});

const question = ref({
  title: "",
  content: "",
  topic: "",
  level: "",
  category: [],
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

  // Here you would submit the question to your backend
  const payload = {
    ...question.value,
    userId: currentUser.value?.id || 0,
    image: "",
  };
  const data = await postService.postControllerCreate(payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  });
  if(data.data) {
    setTimeout(() => {
    ElMessage.success("Câu hỏi của bạn đã được đăng thành công!");
    dialogVisible.value = false;
    resetForm();
    window.location.reload();
  }, 1000);
  }
  else {
    ElMessage.error("Câu hỏi của bạn chưa được đăng! :(")
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
};

// Add handlers for the action buttons
const addCode = () => {
  // Insert code placeholder or open code editor
  question.value.content += "\n\n```\n// Your code here\n```";
  ElMessage.info("Đã thêm khung code");
};

const addImage = () => {
  // Handle image upload or insertion
  ElMessage.info("Tính năng tải lên ảnh đang được phát triển");
};

const addLink = () => {
  // Insert link placeholder or prompt for URL
  question.value.content += "\n\n[Tiêu đề liên kết](url)";
  ElMessage.info("Đã thêm cú pháp liên kết");
};

const showGuidelines = () => {
  ElMessageBox.alert(
    "Các quy tắc diễn đàn:\n" +
      "- Hãy tôn trọng các thành viên khác\n" +
      "- Tìm kiếm trước khi đặt câu hỏi\n" +
      "- Cung cấp đầy đủ thông tin chi tiết\n" +
      "- Không spam hoặc đăng nội dung quảng cáo\n" +
      "- Sử dụng định dạng phù hợp cho mã nguồn",
    "Hướng dẫn Diễn đàn",
    {
      confirmButtonText: "Đã hiểu",
    }
  );
};
</script>

<style>
.forum-dialog .el-dialog__header {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 12px;
  margin-bottom: 4px;
}

.forum-dialog .el-dialog__footer {
  border-top: 1px solid #e5e7eb;
  padding-top: 12px;
  margin-top: 8px;
}

.forum-dialog .el-dialog__title {
  font-weight: 600;
  font-size: 1.1rem;
  color: #374151;
}

@media (min-width: 768px) {
  .forum-dialog .el-dialog__title {
    font-size: 1.25rem;
  }

  .forum-dialog .el-dialog__header {
    padding-bottom: 16px;
  }

  .forum-dialog .el-dialog__footer {
    padding-top: 16px;
  }
}

/* Handle mobile fullscreen dialog */
@media (max-width: 767px) {
  .forum-dialog.el-dialog__wrapper .el-dialog.is-fullscreen {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
  }

  .forum-dialog.el-dialog__wrapper .el-dialog.is-fullscreen .el-dialog__body {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
  }
}
</style>
