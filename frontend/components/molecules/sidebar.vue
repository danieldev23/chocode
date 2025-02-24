<template>
  <!-- Sidebar -->
  <aside class="hidden lg:block w-64 shrink-0">
    <div class="px-4 rounded-lg">
      <div class="mb-6 rounded-lg bg-blue-50 p-2">
        <div class="flex items-center text-primary">
          <img
            src="~/assets/images/category/platform.png"
            class="w-5 h-5 mr-2 rounded-sm"
          />
          <span class="font-medium sm:text-red-400 md:text-green-400 lg:text-yellow-400 xl:text-pink-400 2xl:text-violet-400">ChoCode.Com</span>
        </div>
      </div>

      <div class="bg-white rounded-lg">
        <nav class="space-y-2 bg-white mb-2">
          <NuxtLink
            v-for="(item, id) in menuItems"
            :key="id"
            
            class="flex items-center p-2 text-gray-600 hover:text-primary hover:bg-blue-50 transition-colors"
          >
            <img
              v-if="item.icon"
              :src="`/_nuxt/assets/images/category/${item.icon}`"
              class="w-5 h-5 mr-2 rounded-sm"
            />
            <span>{{ item.title }}</span>
          </NuxtLink>
        </nav>

        <img src="~/assets/images/sidebar/sidebar-banner.gif" class="px-2 py-3" />
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import type { CategoryAllResponse } from "~/auto_api";
import { categoryService } from "~/utils/api.utils";
const menuItems = ref();
onMounted(async () => {
  try {
    const { data } = await categoryService.categoryControllerFindAll();
    menuItems.value = data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
});
</script>
