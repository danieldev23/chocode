<template>
  <div class="w-full py-0 px-0">
    <div class="flex flex-col sm:flex-row items-stretch gap-3">
      <div class="flex-1 w-full">
        <div class="relative">
          <input
            v-model="localQuery"
            type="text"
            placeholder="Tìm kiếm bài viết, câu hỏi..."
            class="w-full px-4 py-3 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
            @input="updateQuery"
            @keyup.enter="$emit('search', localQuery)"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search class="h-4 w-4 text-gray-400" />
          </div>
          <button
            v-if="localQuery"
            @click="clearSearch"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <X class="h-4 w-4" />
          </button>
        </div>
      </div>

      <button
        @click="$emit('search', localQuery)"
        class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors text-sm flex items-center justify-center whitespace-nowrap min-h-[48px] w-full sm:w-auto shadow-sm"
      >
        <Search class="w-4 h-4 sm:mr-2" />
        <span class="hidden sm:inline">Tìm kiếm</span>
      </button>
    </div>

    <!-- Quick Filters -->
    <div class="flex flex-wrap gap-2 mt-3">
      <button
        v-for="filter in quickFilters"
        :key="filter"
        @click="applyQuickFilter(filter)"
        class="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
      >
        {{ filter }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Search, X } from "lucide-vue-next";

const props = defineProps({
  query: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:query", "search"]);

// Local reactive query
const localQuery = ref(props.query);

// Quick filter options
const quickFilters = [
  "JavaScript",
  "Vue.js",
  "React",
  "Node.js",
  "Python",
  "PHP",
  "Docker",
  "AWS"
];

// Watch for props changes
watch(
  () => props.query,
  (newValue) => {
    localQuery.value = newValue;
  }
);

// Emit query updates
const updateQuery = () => {
  emit("update:query", localQuery.value);
};

// Clear search
const clearSearch = () => {
  localQuery.value = "";
  updateQuery();
  emit("search", "");
};

// Apply quick filter
const applyQuickFilter = (filter: string) => {
  localQuery.value = filter;
  updateQuery();
  emit("search", filter);
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
button:focus-visible {
  outline: none;
}

/* Mobile optimizations */
@media (max-width: 640px) {
  input {
    font-size: 16px; /* Prevents zoom on iOS */
  }
  
  button {
    min-height: 48px; /* Better touch targets */
  }
}

/* Ensure proper input styling */
input::placeholder {
  color: #9ca3af;
}

input::-webkit-search-cancel-button {
  display: none;
}
</style>