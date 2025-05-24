// ForumSearch.vue
<template>
  <div class="max-w-5xl mx-auto w-full py-3 px-0 rounded-lg">
    <div class="flex items-stretch gap-2">
      <div class="relative flex-grow">
        <el-input
          v-model="localQuery"
          placeholder="Tìm kiếm..."
          class="minimal-search h-full"
          clearable
          @input="updateQuery"
        >
          <template #prefix>
            <span class="text-gray-400 flex items-center">
              <lucide-search class="h-4 w-4" />
            </span>
          </template>
        </el-input>
      </div>

      <button
        class="bg-secondary-gradient text-white font-medium px-6 rounded-lg transition-all duration-200 text-base flex items-center justify-center whitespace-nowrap"
        @click="$emit('search', localQuery)"
      >
        Tìm kiếm
        <Search width="22" height="22" class="ml-2"/>
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
}

.minimal-search :deep(.el-input__inner) {
  color: #6b7280;
  font-size: 0.95rem;
  height: 100%;
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

/* Button style to match input height */
button {
  height: 42px; /* Match height to Input */
}

span.el-input__prefix {
    display: none;
}
</style>
