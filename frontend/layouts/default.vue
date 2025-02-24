<script setup lang="ts"></script>

<template>
  <MoleculesHeader />
  <main>
    <div class="w-full">
      <!-- Main Content -->
      <main class="pt-16 bg-gray-50">
        <!-- Ads Banner -->
        <img
          src="~/assets/images/header/banner.gif"
          class="ads-banner bg-gray-200 w-[95%] lg:w-[67%] lg:mx-auto mx-4 my-4 lg:my-8 rounded-md"
        />

        <div class="lg:flex lg:w-[70%] gap-6 mx-auto w-full px-4">
          <!-- Sidebar -->
          <MoleculesSidebar />

          <!-- Content -->
          <div class="flex-1 lg:w-[65%]">
            <div class="flex items-center mb-6">
              <div class="relative flex-1">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Tìm kiếm..."
                  class="w-full h-11 rounded-lg border border-gray-200 pl-4 pr-10 focus:outline-none focus:border-primary"
                />
                <span class="absolute right-3 top-2.5 text-gray-400"><Search class="text-gray-400" /></span>
              </div>
              <button
                class="ml-4 h-11 px-8 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                Tìm kiếm
              </button>
            </div>
            <slot />
          </div>
        </div>
      </main>
    </div>
  </main>
  <MoleculesFooter />
</template>
<script>
import { Search } from 'lucide-vue-next';
const searchQuery = ref("");
</script>
