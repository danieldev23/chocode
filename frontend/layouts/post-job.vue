<template>
  <MoleculesHeader />
    <div class="w-full bg-gray-50">
      <!-- Main Content -->
      <main class="pt-16 bg-gray-50 overflow-hidden">
        <!-- Ads Banner -->

        <div
          class="mx-4 md:mx-16 lg:mx-32 xl:mx-[19.6rem] mt-4 md:mt-16 lg:mt-5"
        >
          <img src="~/assets/images/header/banner.gif" class="rounded-md" />
          <slot />
        </div>

      </main>
     <div class="bg-white">
    <MoleculesFooter />
  </div>
  </div>
</template>
<script setup lang="ts">
import { Search, CircleCheckBig, ShieldCheck } from "lucide-vue-next";
const searchQuery = ref("");
</script>
