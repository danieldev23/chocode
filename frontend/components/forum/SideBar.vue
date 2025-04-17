<template>
  <div class="w-full md:w-64 shrink-0">
    <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
      <NuxtLink
        to="/thao-luan"
        class="flex items-center justify-between mb-4 rounded-lg"
        :class="{ 'bg-blue-50': isActive('/thao-luan') }"
      >
        <div
          class="rounded-lg px-3 py-2"
          :class="{ 'bg-blue-50': isActive('/thao-luan') }"
        >
          <Grid
            class="h-5 w-5 inline"
            :class="{
              'text-primary': isActive('/thao-luan'),
              'text-gray-600': !isActive('/thao-luan'),
            }"
          />
          <span
            class="font-bold ml-2"
            :class="{
              'text-primary': isActive('/thao-luan'),
              'text-gray-700': !isActive('/thao-luan'),
            }"
            >Tất cả</span
          >
        </div>
      </NuxtLink>

      <div class="space-y-3">
        <NuxtLink
          v-for="(item, id) in visibleCategories"
          :to="`/thao-luan/${item.slug}`"
          :key="id"
          class="flex items-center p-2 rounded-lg cursor-pointer"
          :class="{
            'bg-blue-50': isActive('/thao-luan/' + item.slug),
            'hover:bg-gray-100': !isActive('/thao-luan/' + item.slug),
          }"
        >
          <img
            loading="lazy"
            :src="item.icon"
            :alt="item.title"
            class="h-5 w-5 mr-3"
            :class="{
              'text-primary': isActive('/thao-luan/' + item.slug),
              'text-gray-600': !isActive('/thao-luan/' + item.slug),
            }"
          />
          <span
            class="font-medium"
            :class="{
              'text-primary': isActive('/thao-luan/' + item.slug),
              'text-gray-700': !isActive('/thao-luan/' + item.slug),
            }"
          >
            {{ item.title }}
          </span>
        </NuxtLink>
      </div>

      <!-- Nút "Xem thêm"
      <div v-if="categories.length > 6" class="text-center mt-3">
        <button
          class="text-blue-500 text-sm hover:underline"
          @click="showAll = !showAll"
        >
          {{ showAll ? "Thu gọn" : "Xem thêm" }}
        </button>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { Grid } from "lucide-vue-next";
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
// Hiển thị tối đa 6 category nếu chưa mở rộng
const visibleCategories = computed(() => {
  return showAll.value ? categories : categories.slice(0, 14);
});
</script>
