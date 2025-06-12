// ForumSearch.vue
<template>
  <div class="mx-auto mb-4 w-full py-0 px-0 rounded-lg">
    <div class="flex flex-col sm:flex-row items-stretch gap-2">
      <div class="flex-1 w-full">
        <el-input
          v-model="localQuery"
          placeholder="Tìm kiếm..."
          class="minimal-search h-full focus:text-secondary rounded-md"
          clearable
          @input="updateQuery"
          @keyup.enter="$emit('search', localQuery)"
        >
          <template #prefix>
            <span class="text-gray-400 flex items-center hidden sm:flex">
              <Search class="h-4 w-4" />
            </span>
          </template>
        </el-input>
      </div>

      <button
        class="bg-secondary-gradient text-white font-medium px-4 sm:px-6 py-2 sm:py-0 rounded-lg transition-all duration-200 text-sm sm:text-base flex items-center justify-center whitespace-nowrap min-h-[42px] w-full sm:w-auto"
        @click="$emit('search', localQuery)"
      >
        <Search class="w-4 h-4 sm:hidden mr-2" />
        <span class="hidden sm:inline">Tìm kiếm</span>
        <span class="sm:hidden">Tìm kiếm</span>
        <Search class="ml-2 w-4 h-4 hidden sm:block" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Search } from "lucide-vue-next";

const props = defineProps({
  query: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:query", "search"]);

// Tạo biến local để theo dõi giá trị input
const localQuery = ref(props.query);

// Cập nhật khi props thay đổi
watch(
  () => props.query,
  (newValue) => {
    localQuery.value = newValue;
  }
);

// Emit sự kiện khi giá trị thay đổi
const updateQuery = () => {
  emit("update:query", localQuery.value);
};
</script>

<style scoped>
.minimal-search {
  height: 100%;
}

.minimal-search :deep(.el-input__wrapper) {
  background-color: white;
  border-radius: 6px;
  box-shadow: none;
  border: 1px solid #f0f0f0;
  height: 100%;
  min-height: 42px;
}

.minimal-search :deep(.el-input__inner) {
  color: #6b7280;
  font-size: 0.95rem;
  height: 100%;
  min-height: 40px;
}

.minimal-search :deep(.el-input__inner)::placeholder {
  color: #9ca3af;
}

.minimal-search :deep(.el-input__prefix) {
  margin-right: 0.25rem;
}

/* Remove focus ring */
.minimal-search :deep(.el-input__wrapper.is-focus) {
  box-shadow: none;
  border-color: #e5e7eb;
}

/* Clear button styling */
.minimal-search :deep(.el-input__suffix) {
  color: #9ca3af;
}

/* Responsive button styling */
button {
  min-height: 42px;
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .minimal-search :deep(.el-input__inner) {
    font-size: 16px; /* Prevents zoom on iOS */
  }

  button {
    font-size: 0.875rem;
  }
}

/* Hide prefix icon on very small screens */
@media (max-width: 480px) {
  .minimal-search :deep(.el-input__prefix) {
    display: none;
  }
}
</style>
