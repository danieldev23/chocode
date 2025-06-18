<template>
  <div class="w-full md:w-64 shrink-0">
    <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6">
      <!-- All Categories Link -->
      <NuxtLink
        to="/thao-luan"
        class="flex items-center justify-between mb-4 p-3 rounded-lg transition-colors"
        :class="{ 
          'bg-blue-50 border border-blue-200': isActive('/thao-luan'),
          'hover:bg-gray-50': !isActive('/thao-luan')
        }"
      >
        <div class="flex items-center">
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
            :class="{
              'bg-blue-100': isActive('/thao-luan'),
              'bg-gray-100': !isActive('/thao-luan'),
            }"
          >
            <Grid
              class="h-4 w-4"
              :class="{
                'text-blue-600': isActive('/thao-luan'),
                'text-gray-600': !isActive('/thao-luan'),
              }"
            />
          </div>
          <span
            class="font-semibold text-sm"
            :class="{
              'text-blue-700': isActive('/thao-luan'),
              'text-gray-700': !isActive('/thao-luan'),
            }"
          >
            Tất cả chủ đề
          </span>
        </div>
      </NuxtLink>

      <!-- Categories List -->
      <div class="space-y-1">
        <NuxtLink
          v-for="(item, id) in visibleCategories"
          :to="`/thao-luan/${item.slug}`"
          :key="id"
          class="flex items-center p-3 rounded-lg cursor-pointer transition-colors"
          :class="{
            'bg-blue-50 border border-blue-200': isActive('/thao-luan/' + item.slug),
            'hover:bg-gray-50': !isActive('/thao-luan/' + item.slug),
          }"
        >
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center mr-3 flex-shrink-0"
            :class="{
              'bg-blue-100': isActive('/thao-luan/' + item.slug),
              'bg-gray-100': !isActive('/thao-luan/' + item.slug),
            }"
          >
            <img
              loading="lazy"
              :src="item.icon"
              :alt="item.title"
              class="h-4 w-4 object-contain"
            />
          </div>
          <span
            class="font-medium text-sm truncate"
            :class="{
              'text-blue-700': isActive('/thao-luan/' + item.slug),
              'text-gray-700': !isActive('/thao-luan/' + item.slug),
            }"
          >
            {{ item.title }}
          </span>
        </NuxtLink>
      </div>

      <!-- Expand/Collapse Button -->
      <div v-if="categories.length > 6" class="mt-4 pt-3 border-t border-gray-200">
        <button
          @click="showAll = !showAll"
          class="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <ChevronDown 
            class="w-4 h-4 mr-1 transition-transform"
            :class="{ 'rotate-180': showAll }"
          />
          {{ showAll ? "Thu gọn" : "Xem thêm" }}
        </button>
      </div>
    </div>

    <!-- Quick Stats Card -->
    <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
      <h3 class="font-semibold text-gray-900 text-sm mb-3">Thống kê</h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
              <MessageSquare class="w-3 h-3 text-blue-600" />
            </div>
            <span class="text-gray-600 text-xs">Bài viết</span>
          </div>
          <span class="font-semibold text-gray-900 text-xs">1,234</span>
        </div>
        
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-2">
              <Users class="w-3 h-3 text-green-600" />
            </div>
            <span class="text-gray-600 text-xs">Thành viên</span>
          </div>
          <span class="font-semibold text-gray-900 text-xs">567</span>
        </div>
        
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center mr-2">
              <Eye class="w-3 h-3 text-orange-600" />
            </div>
            <span class="text-gray-600 text-xs">Lượt xem</span>
          </div>
          <span class="font-semibold text-gray-900 text-xs">12.5k</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { Grid, ChevronDown, MessageSquare, Users, Eye } from "lucide-vue-next";
import { ref, computed } from "vue";

const props = defineProps<{
  categories: ICategory[];
}>();

interface ICategory {
  id: number;
  title: string;
  slug: string;
  icon: string;
}

const route = useRoute();
const showAll = ref(false);

const isActive = (path: string) => {
  return (
    route.path === path ||
    (path === "/thao-luan" && route.path === "/thao-luan") ||
    (route.path.startsWith("/thao-luan/") &&
      path.includes(route.params.slug as string))
  );
};

const categories = props.categories;

// Show max 6 categories if not expanded
const visibleCategories = computed(() => {
  return showAll.value ? categories : categories.slice(0, 6);
});
</script>

<style scoped>
/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Focus styles for accessibility */
a:focus-visible,
button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Ensure proper truncation */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>